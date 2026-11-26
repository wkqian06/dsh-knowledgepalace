import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { createBindingActions, lookupSessionBinding, revisionArgs, PROJECTS_CACHE_TTL_MS, LIBRARY_CONFIGS } from '../index.js';
import { sessionBindingSchema } from '../session-bindings.js';

function memoryDomain(entries = []) {
  const rows = new Map(entries);
  const table = { get: key => rows.get(key), entries: () => rows.entries(), put: async (key, value) => { rows.set(key, structuredClone(value)); }, delete: async key => rows.delete(key) };
  return { rows, domain: { table: name => { assert.equal(name, 'session_bindings'); return table; } } };
}

test('lookupSessionBinding resolves private and demo namespaces and returns null when absent', async () => {
  assert.ok(Object.hasOwn(LIBRARY_CONFIGS, 'demo'));
  const { domain } = memoryDomain([
    ['k1', { projectId: 'alpha', tabId: 'research', sessionId: 's-private' }],
    ['k2', { projectId: 'library-demo~alpha', tabId: 'writing@introduction~u1', sessionId: 's-demo' }],
    ['k3', { projectId: '__library__', tabId: 'library', sessionId: 's-library' }],
    ['k4', { projectId: 'library-demo~__library__', tabId: 'library', sessionId: 's-demo-library' }],
  ]);
  assert.deepEqual(await lookupSessionBinding(domain, 's-private'), { library: 'private', projectId: 'alpha', tabId: 'research' });
  assert.deepEqual(await lookupSessionBinding(domain, 's-demo'), { library: 'demo', projectId: 'alpha', tabId: 'writing@introduction~u1' });
  assert.deepEqual(await lookupSessionBinding(domain, 's-library'), { library: 'private', projectId: '__library__', tabId: 'library' });
  assert.deepEqual(await lookupSessionBinding(domain, 's-demo-library'), { library: 'demo', projectId: '__library__', tabId: 'library' });
  assert.equal(await lookupSessionBinding(domain, 'missing'), null);
  assert.equal(await lookupSessionBinding(Promise.resolve(domain), 's-demo').then(row => row.library), 'demo');
  for (const bad of ['', ' s-private', 's-private\n', 'x'.repeat(1025), undefined, 42, null]) {
    await assert.rejects(lookupSessionBinding(domain, bad), /invalid session id/);
  }
  const corrupt = memoryDomain([['k', { projectId: 'alpha', tabId: 't', sessionId: 's', extra: true }]]).domain;
  await assert.rejects(lookupSessionBinding(corrupt, 's'));
  await assert.rejects(lookupSessionBinding(undefined, 's'), /storage domain unavailable/);
});

test('revisionArgs accepts only kebab-case slug/section and rNNN.md revisions', () => {
  const args = revisionArgs({ slug: 'alpha-paper', section: 'introduction', revision: 'r012.md' });
  assert.match(args[0], /^--config=/);
  assert.deepEqual(args.slice(1), ['read-revision', 'alpha-paper', 'introduction', 'r012.md']);
  const valid = { slug: 'alpha', section: 'intro', revision: 'r001.md' };
  for (const slug of ['Alpha', '../alpha', '-alpha', 'alpha--x', '', undefined, 7]) assert.throws(() => revisionArgs({ ...valid, slug }), /invalid project or section/);
  for (const section of ['Intro', 'intro/x', '..', 'intro-', '', undefined]) assert.throws(() => revisionArgs({ ...valid, section }), /invalid project or section/);
  for (const revision of ['r1.md', 'r0001.md', '../r001.md', 'r001.md\n', 'r001.txt', 'R001.md', '', undefined]) assert.throws(() => revisionArgs({ ...valid, revision }), /invalid revision/);
  assert.throws(() => revisionArgs(), /invalid project or section/);
});

test('project existence checks reuse a short-lived cache and refetch on a miss', async () => {
  const { domain } = memoryDomain();
  let clock = 1_000_000, calls = 0, projects = [{ slug: 'alpha' }], fail = false;
  const listProjects = async () => { calls++; if (fail) throw new Error('discovery offline'); return { projects: projects.map(project => ({ ...project })) }; };
  const store = createBindingActions({ domain, sessionController: { list: async () => ({ items: [] }) }, listProjects, workspaceRoot: async () => os.tmpdir(), now: () => clock });
  const target = projectId => ({ projectId, tabId: 'research' });

  for (let i = 0; i < 3; i++) assert.deepEqual(await store.list(target('alpha')), []);
  assert.equal(calls, 1, 'repeated checks within the TTL use one discovery result');

  await assert.rejects(store.list(target('beta')), /unknown project 'beta'/);
  assert.equal(calls, 2, 'a cached miss forces exactly one fresh fetch');

  projects = [{ slug: 'alpha' }, { slug: 'beta' }];
  assert.deepEqual(await store.list(target('beta')), []);
  assert.equal(calls, 3, 'a project created after caching is found by the forced refetch');
  await store.list(target('beta')); await store.list(target('alpha'));
  assert.equal(calls, 3);

  clock += PROJECTS_CACHE_TTL_MS - 1;
  await store.list(target('alpha'));
  assert.equal(calls, 3);
  clock += 1;
  await store.list(target('alpha'));
  assert.equal(calls, 4, 'expired cache is refreshed');

  store.invalidateProjects();
  await store.list(target('alpha'));
  assert.equal(calls, 5, 'invalidateProjects forces a refetch');

  await store.list({ projectId: '__library__', tabId: 'library' });
  await assert.rejects(store.list(target('Not-A-Slug')), /unknown project/);
  assert.equal(calls, 5, 'library and malformed ids do not run discovery');

  store.invalidateProjects(); fail = true;
  await assert.rejects(store.list(target('alpha')), /discovery offline/);
  fail = false;
  await store.list(target('alpha'));
  assert.equal(calls, 7, 'failed discovery is not cached');

  const broken = createBindingActions({ domain, sessionController: {}, listProjects: async () => ({}), workspaceRoot: async () => os.tmpdir() });
  await assert.rejects(broken.list(target('alpha')), /project discovery unavailable/);
});

async function workspaceFixture(t) {
  const root = await fs.realpath(await fs.mkdtemp(path.join(os.tmpdir(), 'kp-backend-actions-')));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  await fs.mkdir(path.join(root, 'projects', 'alpha'), { recursive: true });
  const { rows, domain } = memoryDomain();
  const cwd = path.join(root, 'projects', 'alpha');
  const items = [], created = [];
  const sessionController = { create: async request => { created.push(request); const sessionId = `s${created.length}`; items.push({ sessionId, cwd: request.cwd }); return { sessionId }; }, list: async () => ({ items: items.map(item => ({ ...item })) }) };
  const build = bindingNamespace => createBindingActions({ domain: Promise.resolve(domain), sessionController, listProjects: async () => ({ projects: [{ slug: 'alpha' }] }), workspaceRoot: async () => root, libraryRoot: root, bindingNamespace });
  return { root, cwd, rows, items, created, build };
}

test('binding actions report created only for new sessions and list running/updatedAt', async t => {
  const f = await workspaceFixture(t);
  const demo = f.build('library-demo~'), priv = f.build('');
  const first = await demo.openOnClick({ projectId: 'alpha', tabId: 'writing@introduction', confirmed: true });
  assert.deepEqual(first, { projectId: 'alpha', tabId: 'writing@introduction', sessionId: 's1', created: true });
  assert.deepEqual(await demo.openOnClick({ projectId: 'alpha', tabId: 'writing@introduction', confirmed: true }), { projectId: 'alpha', tabId: 'writing@introduction', sessionId: 's1' });
  const second = await demo.openOnClick({ projectId: 'alpha', tabId: 'writing@introduction~u1', confirmed: true });
  assert.equal(second.created, true);
  const legacy = await priv.openOnClick({ projectId: 'alpha', tabId: 'writing', confirmed: true });
  assert.equal(f.created.length, 3);
  for (const raw of f.rows.values()) assert.deepEqual(sessionBindingSchema.parse(raw), raw);

  f.items[0].running = true; f.items[0].updatedAt = 1_764_000_000_000;
  f.items[1].updatedAt = 1_764_000_000_500;
  assert.deepEqual(await demo.list({ projectId: 'alpha', tabId: 'writing@introduction' }), [
    { projectId: 'alpha', tabId: 'writing@introduction', sessionId: 's1', status: 'available', running: true, updatedAt: 1_764_000_000_000 },
    { projectId: 'alpha', tabId: 'writing@introduction~u1', sessionId: 's2', status: 'available', running: false, updatedAt: 1_764_000_000_500 },
  ]);
  assert.deepEqual(await demo.list({ projectId: 'alpha', tabId: 'writing' }), []);
  assert.deepEqual(await priv.list({ projectId: 'alpha', tabId: 'writing@introduction' }), []);
  f.items.splice(2, 1);
  assert.deepEqual(await priv.list({ projectId: 'alpha', tabId: 'writing' }), [{ projectId: 'alpha', tabId: 'writing', sessionId: legacy.sessionId, status: 'not-visible', running: false }]);

  assert.deepEqual(await demo.lookupSession('s2'), { library: 'demo', projectId: 'alpha', tabId: 'writing@introduction~u1' });
  assert.deepEqual(await priv.lookupSession('s3'), { library: 'private', projectId: 'alpha', tabId: 'writing' });
  assert.equal(await priv.lookupSession('s404'), null);
  await assert.rejects(priv.lookupSession(''), /invalid session id/);
});
