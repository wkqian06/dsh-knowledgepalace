import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { createBindingActions, sessionBindingsDomainSpec, ownerActionRejection, libraryForAgent } from '../index.js';

test('storage unit and table names meet DSH backend naming rules', () => {
  const valid = /^[a-z][a-z0-9_]*$/;
  assert.match(sessionBindingsDomainSpec.name, valid);
  for (const name of Object.keys(sessionBindingsDomainSpec.tables)) assert.match(name, valid);
});

test('action route admits only authenticated owner peers', () => {
  const req = { headers: {} };
  assert.equal(ownerActionRejection({ admit: () => ({ peer: { principal: { kind: 'owner' } } }) }, req), undefined);
  assert.equal(ownerActionRejection({ admit: () => ({ peer: { principal: { kind: 'api' } } }) }, req), 403);
  assert.equal(ownerActionRejection({ admit: () => ({ rejection: 401 }) }, req), 401);
  assert.equal(ownerActionRejection({ admit: () => ({}) }, req), 403);
});

async function fixture(t) {
  const root = await fs.realpath(await fs.mkdtemp(path.join(os.tmpdir(), 'kp-binding-test-')));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  await fs.mkdir(path.join(root, 'projects', 'alpha'), { recursive: true });
  const rows = new Map(), calls = [];
  const table = { get: k => rows.get(k), entries: () => rows.entries(), put: async (k, v) => { rows.set(k, v); } };
  const domain = { table: name => { assert.equal(name, 'session_bindings'); return table; } };
  const controller = { create: async request => { calls.push(request); return { sessionId: `new-${calls.length}` }; }, list: async () => ({ items: [{ sessionId: 'existing', cwd: path.join(root, 'projects', 'alpha') }, { sessionId: 'wrong', cwd: root }, { sessionId: 'no-cwd' }, { sessionId: 'child', origin: 'subagent' }] }) };
  const store = createBindingActions({ domain, sessionController: controller, listProjects: async () => ({ projects: [{ slug: 'alpha' }] }), workspaceRoot: async () => root, libraryRoot: root });
  return { root, calls, store };
}

test('unbound demo session is routed by its real cwd and unknown cwd fails closed', async t => {
  const root = await fs.realpath(await fs.mkdtemp(path.join(os.tmpdir(), 'kp-agent-route-')));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const demo = path.join(root, 'demo'), sibling = path.join(root, 'demo-other');
  await fs.mkdir(path.join(demo, 'projects', 'alpha'), { recursive: true });
  await fs.mkdir(sibling);
  const domain = { table: () => ({ entries: () => [][Symbol.iterator]() }) };
  const controller = { list: async () => ({ items: [{ sessionId: 'demo', cwd: path.join(demo, 'projects', 'alpha') }, { sessionId: 'private', cwd: sibling }, { sessionId: 'unknown' }] }) };
  assert.equal(await libraryForAgent({ id: 'demo' }, domain, controller, demo), 'demo');
  assert.equal(await libraryForAgent({ id: 'private' }, domain, controller, demo), 'private');
  await assert.rejects(libraryForAgent({ id: 'unknown' }, domain, controller, demo), /cannot verify/);
  await assert.rejects(libraryForAgent({ id: 'missing' }, domain, controller, demo), /cannot verify/);
  const conflicting = { table: () => ({ entries: () => [['key', { sessionId: 'private', projectId: 'library-demo~alpha' }]][Symbol.iterator]() }) };
  await assert.rejects(libraryForAgent({ id: 'private' }, conflicting, controller, demo), /conflicts/);
});

test('same project and tab remain separate across library namespaces', async t => {
  const root = await fs.realpath(await fs.mkdtemp(path.join(os.tmpdir(), 'kp-libraries-')));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const a = path.join(root, 'private'), b = path.join(root, 'demo');
  for (const dir of [a, b]) await fs.mkdir(path.join(dir, 'projects', 'alpha'), { recursive: true });
  const rows = new Map(), calls = [];
  const table = { get: key => rows.get(key), entries: () => rows.entries(), put: async (key, value) => rows.set(key, value), delete: async key => rows.delete(key) };
  const domain = { table: () => table };
  const controller = { create: async ({ cwd }) => { calls.push(cwd); return { sessionId: `s${calls.length}` }; }, list: async () => ({ items: calls.map((cwd, i) => ({ sessionId: `s${i + 1}`, cwd })) }) };
  const create = (dir, bindingNamespace) => createBindingActions({ domain, sessionController: controller, listProjects: async () => ({ projects: [{ slug: 'alpha' }] }), workspaceRoot: async () => dir, libraryRoot: dir, bindingNamespace });
  const privateStore = create(a, ''), demoStore = create(b, 'library-demo~');
  const input = { projectId: 'alpha', tabId: 'research', confirmed: true };
  const first = await privateStore.openOnClick(input), second = await demoStore.openOnClick(input);
  assert.notEqual(first.sessionId, second.sessionId);
  assert.deepEqual(calls, [path.join(a, 'projects', 'alpha'), path.join(b, 'projects', 'alpha')]);
  assert.equal((await privateStore.list(inputWithoutConfirmation(input)))[0].sessionId, first.sessionId);
  assert.equal((await demoStore.list(inputWithoutConfirmation(input)))[0].sessionId, second.sessionId);
  await demoStore.unlink({ projectId: 'alpha', tabId: 'research', expectedSessionId: second.sessionId, confirmed: true });
  assert.deepEqual(await demoStore.list(inputWithoutConfirmation(input)), []);
  assert.equal(await libraryForAgent({ id: second.sessionId }, domain, controller, b), 'demo');
});

function inputWithoutConfirmation({ projectId, tabId }) { return { projectId, tabId }; }

test('project discovery and server-side cwd gate creation', async t => {
  const { root, calls, store } = await fixture(t);
  assert.equal(sessionBindingsDomainSpec.tables.session_bindings.valueSchema.safeParse({ projectId: 'alpha', tabId: 't', sessionId: 's' }).success, true);
  assert.equal(await store.get({ projectId: 'alpha', tabId: 't' }), undefined);
  await assert.rejects(store.openOnClick({ projectId: 'missing', tabId: 't', confirmed: true }), /unknown project/);
  await assert.rejects(store.openOnClick({ projectId: 'alpha', tabId: 't', confirmed: true, cwd: root }));
  assert.equal(calls.length, 0);
  await store.openOnClick({ projectId: 'alpha', tabId: 't', confirmed: true });
  assert.deepEqual(calls, [{ cwd: path.join(root, 'projects', 'alpha') }]);
  await store.openOnClick({ projectId: '__library__', tabId: 't', confirmed: true });
  assert.deepEqual(calls[1], { cwd: root });
});

test('list-based recovery verifies ordinary visible sessions without creating', async t => {
  const { calls, store } = await fixture(t);
  await assert.rejects(store.recover({ projectId: 'alpha', tabId: 't', sessionId: 'missing', confirmed: true }), /not-visible/);
  await assert.rejects(store.recover({ projectId: 'alpha', tabId: 't', sessionId: 'child', confirmed: true }), /not-ordinary/);
  await assert.rejects(store.recover({ projectId: 'alpha', tabId: 't', sessionId: 'wrong', confirmed: true }), /cwd-mismatch/);
  await assert.rejects(store.recover({ projectId: 'alpha', tabId: 't', sessionId: 'no-cwd', confirmed: true }), /cwd-unverified/);
  assert.equal((await store.recover({ projectId: 'alpha', tabId: 't', sessionId: 'existing', confirmed: true })).sessionId, 'existing');
  assert.equal(calls.length, 0);
});

test('project directory missing cannot create a session', async t => {
  const { root, calls, store } = await fixture(t);
  await fs.rm(path.join(root, 'projects', 'alpha'), { recursive: true });
  await assert.rejects(store.openOnClick({ projectId: 'alpha', tabId: 't', confirmed: true }));
  assert.equal(calls.length, 0);
});
