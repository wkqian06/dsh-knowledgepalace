import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
const cwd = path.resolve('/project');
import { createSessionBindings, SessionBindingPersistenceError, sessionBindingTableSpec } from './session-bindings.js';

function fixture() {
  const records = new Map(); let count = 0, fail = false;
  const table = { get: key => records.get(key), entries: () => records.entries(), put: async (key, value) => { if (fail) throw new Error('write failed'); records.set(key, structuredClone(value)); }, delete: async key => records.delete(key) };
  const domain = { table: name => { assert.equal(name, 'session_bindings'); return table; } };
  const requests = [];
  const sessionController = { create: async request => { requests.push(request); await new Promise(resolve => setImmediate(resolve)); return { sessionId: `session-${++count}` }; }, list: async () => ({ items: Array.from({ length: count }, (_, i) => ({ sessionId: `session-${i + 1}`, cwd })) }) };
  const build = () => createSessionBindings({ domain, sessionController, projectExists: async id => id === 'project', resolveCwd: async () => cwd });
  return { records, domain, build, requests, sessionController, setFail: value => { fail = value; } };
}
const click = tabId => ({ projectId: 'project', tabId, confirmed: true });
// openOnClick marks newly created bindings with the response-only created flag.
const plain = ({ created, ...binding }) => binding;

test('same tab serializes across store instances, distinct tabs get distinct new sessions', async () => {
  const f = fixture(), a = f.build(), b = f.build();
  const [x, y, z] = await Promise.all([a.openOnClick(click('one')), b.openOnClick(click('one')), b.openOnClick(click('two'))]);
  assert.equal(x.created, true); assert.equal('created' in y, false); assert.equal(z.created, true);
  assert.deepEqual(plain(x), y); assert.notEqual(x.sessionId, z.sessionId);
  assert.deepEqual(f.requests, [{ cwd }, { cwd }]);
  assert.deepEqual(await f.build().get({ projectId: 'project', tabId: 'one' }), { ...y, status: 'available' });
  assert.deepEqual(sessionBindingTableSpec.valueSchema.parse(y), y);
  assert.equal(sessionBindingTableSpec.valueSchema.safeParse(x).success, false);
});

test('openOnClick reports created only for a newly created session', async () => {
  const f = fixture(), store = f.build();
  const first = await store.openOnClick(click('writing@intro'));
  assert.deepEqual(first, { projectId: 'project', tabId: 'writing@intro', sessionId: 'session-1', created: true });
  const again = await store.openOnClick(click('writing@intro'));
  assert.deepEqual(again, { projectId: 'project', tabId: 'writing@intro', sessionId: 'session-1' });
  assert.equal([...f.records.values()].some(row => 'created' in row), false);
  assert.equal(f.requests.length, 1);
});

test('list rows carry response-only running and updatedAt from visible sessions', async () => {
  const f = fixture(), store = f.build();
  const a = await store.openOnClick(click('research')), b = await store.openOnClick(click('research~2')), c = await store.openOnClick(click('research~3'));
  f.sessionController.list = async () => ({ items: [{ sessionId: a.sessionId, cwd, running: true, updatedAt: 1700000000000 }, { sessionId: b.sessionId, cwd, running: 'yes', updatedAt: '2026-01-01' }] });
  assert.deepEqual(await store.list({ projectId: 'project', tabId: 'research' }), [
    { ...plain(a), status: 'available', running: true, updatedAt: 1700000000000 },
    { ...plain(b), status: 'available', running: false },
    { ...plain(c), status: 'not-visible', running: false },
  ]);
  for (const row of f.records.values()) assert.deepEqual(Object.keys(row).sort(), ['projectId', 'sessionId', 'tabId']);
});

test('list isolates per-section writing tabs from legacy writing tabs', async () => {
  const f = fixture(), store = f.build();
  const ids = {};
  for (const tabId of ['writing', 'writing~x', 'writing@intro', 'writing@intro~u1', 'writing@intro-2', 'writing@intro-2~u2', 'writing@introduction']) ids[tabId] = (await store.openOnClick(click(tabId))).sessionId;
  const tabsOf = async tabId => (await store.list({ projectId: 'project', tabId })).map(row => row.tabId).sort();
  assert.deepEqual(await tabsOf('writing@intro'), ['writing@intro', 'writing@intro~u1']);
  assert.deepEqual(await tabsOf('writing'), ['writing', 'writing~x']);
  assert.deepEqual(await tabsOf('writing@intro-2'), ['writing@intro-2', 'writing@intro-2~u2']);
  assert.deepEqual(await tabsOf('writing@introduction'), ['writing@introduction']);
  assert.deepEqual((await store.list({ projectId: 'project', tabId: 'writing@intro' })).map(row => row.sessionId), [ids['writing@intro'], ids['writing@intro~u1']]);
});

test('list keeps legacy bindings and multiple sessions isolated by project and tab', async () => {
  const f = fixture(), store = f.build();
  const legacy = await store.openOnClick(click('research'));
  const second = await store.openOnClick(click('research~123'));
  await store.openOnClick(click('research-other~123'));
  assert.deepEqual((await store.list({ projectId: 'project', tabId: 'research' })).map(x => x.sessionId), [legacy.sessionId, second.sessionId]);
  await assert.rejects(store.list({ projectId: 'missing', tabId: 'research' }), /unknown project/);
});

test('recover one failed new session while preserving existing siblings', async () => {
  const f = fixture(), store = f.build();
  const existing = await store.openOnClick(click('research'));
  f.setFail(true); let error;
  try { await store.openOnClick(click('research~new')); } catch (reason) { error = reason; }
  assert.ok(error instanceof SessionBindingPersistenceError);
  assert.equal(error.binding.tabId, 'research~new');
  f.setFail(false);
  await store.recover({ ...error.binding, confirmed: true });
  assert.deepEqual((await store.list({ projectId: 'project', tabId: 'research' })).map(row => row.sessionId), [existing.sessionId, error.binding.sessionId]);
  assert.equal(f.requests.length, 2);
});

test('persisted session bindings recover with a fresh storage handle and controller', async () => {
  const f = fixture();
  const existing = plain(await f.build().openOnClick(click('research~saved')));
  const saved = structuredClone([...f.records]);
  const records = new Map(saved);
  const domain = { table: () => ({ get: key => records.get(key), entries: () => records.entries(), put: async (key, value) => records.set(key, value), delete: async key => records.delete(key) }) };
  let creations = 0;
  const controller = { list: async () => ({ items: [{ sessionId: existing.sessionId, cwd }] }), create: async () => { creations++; throw new Error('must not create'); } };
  const store = createSessionBindings({ domain, sessionController: controller, projectExists: async () => true, resolveCwd: async () => cwd });
  assert.deepEqual(await store.list({ projectId: 'project', tabId: 'research' }), [{ ...existing, status: 'available', running: false }]);
  assert.deepEqual(await store.openOnClick(click('research~saved')), existing);
  assert.equal(creations, 0);
});

test('creation requires explicit confirmation and a known project', async () => {
  const f = fixture(), store = f.build();
  await assert.rejects(store.openOnClick({ projectId: 'project', tabId: 'x' }));
  await assert.rejects(store.openOnClick({ projectId: 'missing', tabId: 'x', confirmed: true }));
  assert.equal(f.requests.length, 0);
});

test('failed persistence returns session identity and blocks duplicate until recovery', async () => {
  const f = fixture(), store = f.build(); f.setFail(true);
  let error; try { await store.openOnClick(click('one')); } catch (e) { error = e; }
  assert.ok(error instanceof SessionBindingPersistenceError);
  assert.deepEqual(error.binding, { projectId: 'project', tabId: 'one', sessionId: 'session-1' });
  await assert.rejects(f.build().openOnClick(click('one')), e => e instanceof SessionBindingPersistenceError && e.binding.sessionId === 'session-1');
  assert.equal(f.requests.length, 1);
  f.setFail(false);
  await store.recover({ ...error.binding, confirmed: true });
  assert.deepEqual(await store.openOnClick(click('one')), error.binding);
});

test('recovery rejects session already assigned to another tab and conflicting binding', async () => {
  const f = fixture(), store = f.build(), existing = plain(await store.openOnClick(click('one')));
  await assert.rejects(store.recover({ ...existing, tabId: 'two', confirmed: true }), /already bound/);
  await assert.rejects(store.recover({ ...existing, sessionId: 'other', confirmed: true }), /already bound/);
});

test('missing session retains binding until explicitly unlinked, then separate click recreates', async () => {
  const f = fixture(), store = f.build(), existing = plain(await store.openOnClick(click('one')));
  f.sessionController.list = async () => ({ items: [] });
  assert.deepEqual(await store.get({ projectId: 'project', tabId: 'one' }), { ...existing, status: 'not-visible' });
  await assert.rejects(store.openOnClick(click('one')), e => e.status === 'not-visible' && e.binding.sessionId === existing.sessionId);
  await assert.rejects(store.unlink({ projectId: 'project', tabId: 'one', expectedSessionId: 'wrong', confirmed: true }), /binding changed/);
  await assert.rejects(store.unlink({ projectId: 'project', tabId: 'one', expectedSessionId: existing.sessionId }), /confirmed/);
  assert.deepEqual(await store.unlink({ projectId: 'project', tabId: 'one', expectedSessionId: existing.sessionId, confirmed: true }), { ...existing, unlinked: true });
  assert.equal(f.requests.length, 1);
  assert.notEqual((await store.openOnClick(click('one'))).sessionId, existing.sessionId);
});

test('list failure fails closed and leaves binding unchanged', async () => {
  const f = fixture(), store = f.build(), existing = await store.openOnClick(click('one'));
  f.sessionController.list = async () => { throw new Error('offline'); };
  await assert.rejects(store.get({ projectId: 'project', tabId: 'one' }), /offline/);
  await assert.rejects(store.openOnClick(click('one')), /offline/);
  assert.equal(f.requests.length, 1); assert.equal([...f.records.values()][0].sessionId, existing.sessionId);
});

test('recovery refuses invisible and non-ordinary sessions without creating replacements', async () => {
  const f = fixture(), store = f.build(), existing = plain(await store.openOnClick(click('research')));
  await store.unlink({ projectId: 'project', tabId: 'research', expectedSessionId: existing.sessionId, confirmed: true });
  for (const [items, expected] of [[[], 'not-visible'], [[{ sessionId: existing.sessionId, cwd, origin: 'subagent' }], 'not-ordinary'], [[{ sessionId: existing.sessionId, cwd, formatStatus: 'migration-required' }], 'migration-required']]) {
    f.sessionController.list = async () => ({ items });
    await assert.rejects(store.recover({ ...existing, confirmed: true }), error => error.status === expected);
    assert.equal(f.requests.length, 1);
    assert.equal(f.records.size, 0);
  }
});

test('reopening refuses sessions with wrong or unverifiable project directory', async () => {
  const f = fixture(), store = f.build(), existing = await store.openOnClick(click('research'));
  for (const [sessionCwd, expected] of [[path.resolve('/different'), 'cwd-mismatch'], [undefined, 'cwd-unverified']]) {
    f.sessionController.list = async () => ({ items: [{ sessionId: existing.sessionId, cwd: sessionCwd }] });
    assert.equal((await store.get({ projectId: 'project', tabId: 'research' })).status, expected);
    await assert.rejects(store.openOnClick(click('research')), error => error.status === expected);
    assert.equal(f.requests.length, 1);
  }
});

test('storage put that commits then rejects is detected on next call', async () => {
  const f = fixture(), original = f.domain.table('session_bindings').put;
  f.domain.table('session_bindings').put = async (key, value) => { await original(key, value); throw new Error('ambiguous'); };
  const store = f.build(); let caught;
  try { await store.openOnClick(click('one')); } catch (e) { caught = e; }
  assert.ok(caught instanceof SessionBindingPersistenceError);
  assert.deepEqual(await store.openOnClick(click('one')), caught.binding);
  assert.equal(f.requests.length, 1);
});
