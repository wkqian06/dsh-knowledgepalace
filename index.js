import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { createHash } from 'node:crypto';
import { AsyncLocalStorage } from 'node:async_hooks';
import { CONFIG, ROOT, processError, resetPython, runJson, runModule, resolvePython, runRaw } from './python.js';
import { createSessionBindings, sessionBindingSchema, sessionBindingTableSpec, SessionBindingPersistenceError, SessionBindingUnavailableError } from './session-bindings.js';

export const name = 'dsh-knowledgepalace';
export const inject = ['tools', 'commands', 'systemPrompt', 'subprocess', 'storageDomain', 'sessionController'];
export const sessionBindingsDomainSpec = { name: 'knowledge_palace_session_bindings', version: 1, tables: { session_bindings: sessionBindingTableSpec } };

let subprocessService;
const subprocess = () => {
  if (!subprocessService) throw new Error('DSH subprocess service is unavailable');
  return subprocessService;
};

const MAX_BODY = 7 * 1024 * 1024;
const RESEARCH_VIEWS = ['progress', 'ask', 'updates', 'resolve', 'bridges', 'novelty', 'assess', 'partition', 'source'];
const LEDGER_STATES = new Set(['pending', 'doing', 'done', 'failed']);
const GRAPH_OPS = ['list_hierarchies', 'list_levels', 'query_level', 'query_context', 'get_content'];
const ROUTES = {
  init: 'palace-collection', expand: 'palace-collection', ingest: 'palace-ingest',
  ask: 'palace-discussion', brief: 'palace-discussion', discover: 'palace-discussion', idea: 'palace-discussion',
  research: 'palace-maintenance', write: 'palace-writing', polish: 'palace-writing', feasibility: 'palace-feasibility', draft: 'palace-writing',
  updates: 'palace-maintenance', status: 'palace-maintenance', audit: 'palace-maintenance', govern: 'palace-maintenance', refresh: 'palace-maintenance', domain: 'palace-maintenance', style: 'palace-maintenance', viewer: 'palace-maintenance', wiki: 'palace-maintenance',
};
const clip = (value, limit = 50000) => value.length > limit ? `${value.slice(0, limit)}\n[… truncated ${value.length - limit} characters]` : value;
const errorText = (error) => error instanceof Error ? error.message : String(error);
const libraryContext = new AsyncLocalStorage();
export const LIBRARY_CONFIGS = Object.freeze({ private: CONFIG, demo: path.join(ROOT, 'demo-library', '.palace.toml') });
export function libraryConfig(id = 'private') {
  if (!Object.hasOwn(LIBRARY_CONFIGS, id)) throw new Error('unknown library');
  return LIBRARY_CONFIGS[id];
}
const currentConfig = () => libraryContext.getStore()?.config || CONFIG;
export function libraryAvailability() {
  return Object.fromEntries(Object.entries(LIBRARY_CONFIGS).map(([id, config]) => [id, { configured: existsSync(config), config }]));
}
export class LibraryNotConfiguredError extends Error {
  constructor(config) {
    super(`The Private library is not set up yet: no .palace.toml at ${config}. Create the four library folders and a .palace.toml (docs/getting-started.md), or set PALACE_CONFIG to an existing one, then restart DSH. The Demo library works without setup.`);
    this.code = 'library-not-configured';
    this.statusCode = 409;
  }
}
// Library-touching entry points call this first: a missing config fails with guidance, not a Python traceback.
export const configuredConfig = () => {
  const config = currentConfig();
  if (!existsSync(config)) throw new LibraryNotConfiguredError(config);
  return config;
};
export function withLibrary(id, operation) { return libraryContext.run({ id, config: libraryConfig(id) }, operation); }
export async function libraryForAgent(agent, domain, controller, demoRoot) {
  if (!agent?.id) return 'private';
  const rows = Array.from(domain.table('session_bindings').entries(), ([, row]) => row);
  const library = libraryForSession(rows, agent.id);
  const result = await controller.list({}, new AbortController().signal);
  if (!Array.isArray(result?.items)) throw new Error('cannot verify session library');
  const session = result.items.find(item => item.sessionId === agent.id);
  if (!session || typeof session.cwd !== 'string') throw new Error('cannot verify session working directory');
  const root = await fs.realpath(demoRoot), cwd = await fs.realpath(session.cwd);
  const relative = path.relative(root, cwd);
  const cwdLibrary = !relative || (!relative.startsWith('..' + path.sep) && relative !== '..' && !path.isAbsolute(relative)) ? 'demo' : 'private';
  if (rows.some(row => row.sessionId === agent.id) && library !== cwdLibrary) throw new Error('session library binding conflicts with working directory');
  return cwdLibrary;
}
export function libraryForSession(rows, sessionId) {
  if (!sessionId) return 'private';
  const matches = rows.filter(row => row.sessionId === sessionId);
  if (matches.length > 1) throw new Error('ambiguous session library binding');
  if (!matches.length) return 'private';
  if (typeof matches[0].projectId !== 'string') throw new Error('invalid session library binding');
  return matches[0].projectId.startsWith('library-demo~') ? 'demo' : 'private';
}
const configArgs = () => [`--config=${currentConfig()}`];

async function ensureGraph() {
  const checked = await runModule(subprocess(), 'knowledge_palace.graph.builder', [...configArgs(), '--check-fast'], { timeoutMs: 120000 });
  if (checked.code === 0) return;
  if (checked.code !== 1) throw processError('knowledge_palace.graph.builder --check-fast', checked);
  const rebuilt = await runModule(subprocess(), 'knowledge_palace.graph.builder', [...configArgs(), '--rebuild'], { timeoutMs: 180000 });
  if (rebuilt.code !== 0) throw processError('knowledge_palace.graph.builder --rebuild', rebuilt);
}

function pushFlag(args, name, value) {
  if (value !== undefined && value !== null && value !== '') args.push(`${name}=${String(value)}`);
}

export function graphArgs(body) {
  const operation = body.operation;
  if (!GRAPH_OPS.includes(operation)) throw new Error(`unknown graph operation '${operation}'`);
  if (['list_levels', 'query_level'].includes(operation) && !body.hierarchy_id) throw new Error(`hierarchy_id is required for ${operation}`);
  if (operation === 'query_level' && !Number.isInteger(body.level)) throw new Error('integer level is required for query_level');
  if (['query_context', 'get_content'].includes(operation) && !body.node_id) throw new Error(`node_id is required for ${operation}`);
  const flags = [...configArgs()];
  pushFlag(flags, '--entry-parent', body.entry_parent);
  pushFlag(flags, '--cursor', body.cursor);
  pushFlag(flags, '--children-cursor', body.children_cursor);
  pushFlag(flags, '--edges-cursor', body.edges_cursor);
  if (body.limit) pushFlag(flags, '--limit', Math.max(1, Math.min(500, Number(body.limit))));
  const targets = [operation];
  if (operation === 'list_levels') targets.push(String(body.hierarchy_id));
  if (operation === 'query_level') targets.push(String(body.hierarchy_id), String(body.level));
  if (operation === 'query_context' || operation === 'get_content') targets.push(String(body.node_id));
  return [...flags, '--', ...targets];
}

async function graph(body) {
  const args = graphArgs(body);
  await ensureGraph();
  return runJson(subprocess(), 'knowledge_palace.graph.port', args);
}

export function networkArgs(body = {}) {
  const maxNodes = Math.max(50, Math.min(5000, Number(body.max_nodes) || 500));
  const maxLinks = Math.max(100, Math.min(50000, Number(body.max_links) || 3000));
  return [...configArgs(), `--max-nodes=${maxNodes}`, `--max-links=${maxLinks}`];
}

export function candidateSearchArgs(body = {}) {
  if (typeof body.query !== 'string' || !body.query.trim() || body.query.length > 500) throw new Error('query must contain 1–500 characters');
  const limit = body.limit === undefined ? 10 : body.limit;
  if (!Number.isInteger(limit) || limit < 1 || limit > 30) throw new Error('limit must be between 1 and 30');
  if (body.live !== undefined && typeof body.live !== 'boolean') throw new Error('live must be boolean');
  return [...configArgs(), 'search', `--limit=${limit}`, ...(body.live ? ['--live'] : []), '--', body.query.trim()];
}

export function searchArgs(body = {}) {
  if (typeof body.query !== 'string' || !body.query.trim()) throw new Error('query is required');
  const limit = body.limit === undefined ? 50 : body.limit;
  if (!Number.isInteger(limit)) throw new Error('limit must be an integer');
  return [...configArgs(), `--limit=${Math.max(1, Math.min(100, limit))}`, '--', body.query.trim()];
}

export function neighborhoodArgs(body) {
  if (!body.node_id || !String(body.node_id).trim()) throw new Error('node_id is required for neighborhood');
  const args = [...configArgs()];
  if (body.max_nodes !== undefined) {
    const value = Number(body.max_nodes);
    if (!Number.isInteger(value)) throw new Error('max_nodes must be an integer');
    pushFlag(args, '--max-nodes', Math.max(1, Math.min(5000, value)));
  }
  if (body.citations === true) args.push('--citations');
  return [...args, '--', String(body.node_id)];
}

async function neighborhood(body) {
  const args = neighborhoodArgs(body);
  await ensureGraph();
  return runJson(subprocess(), 'knowledge_palace.graph.neighborhood', args, { timeoutMs: 120000 });
}

export function researchArgs(body) {
  if (!RESEARCH_VIEWS.includes(body.view)) throw new Error(`unknown research view '${body.view}'`);
  const args = [...configArgs(), '--json'];
  for (const value of body.alternatives || []) pushFlag(args, '--alternative', value);
  pushFlag(args, '--project', body.project);
  pushFlag(args, '--entry', body.entry);
  pushFlag(args, '--decision', body.decision);
  pushFlag(args, '--note', body.note);
  pushFlag(args, '--domain-b', body.domain_b);
  pushFlag(args, '--file', body.file);
  if (body.budget) pushFlag(args, '--budget', Math.max(4000, Math.min(100000, Number(body.budget))));
  if (body.offset !== undefined && body.offset !== null) { const value = Number(body.offset); if (!Number.isInteger(value) || value < 0) throw new Error('offset must be a non-negative integer'); pushFlag(args, '--offset', value); }
  if (body.axis !== undefined) { if (!['pattern', 'function', 'failure-mode', 'bridge'].includes(body.axis)) throw new Error('axis must be pattern, function, failure-mode or bridge'); pushFlag(args, '--axis', body.axis); }
  if (body.full) args.push('--full');
  args.push('--', body.view);
  if (body.topic) args.push(String(body.topic));
  return args;
}

async function research(body) {
  const result = await runModule(subprocess(), 'knowledge_palace.interaction.research', researchArgs(body), { timeoutMs: 180000 });
  try { return JSON.parse(result.stdout); }
  catch {
    if (result.code !== 0) throw processError('knowledge_palace.interaction.research', result);
    return { text: clip(result.stdout) };
  }
}

async function status() {
  const [python, result] = await Promise.all([
    resolvePython(subprocess()),
    runModule(subprocess(), 'knowledge_palace.graph.status', configArgs(), { timeoutMs: 120000 }),
  ]);
  let value;
  try { value = JSON.parse(result.stdout); } catch { value = { text: result.stdout.trim() }; }
  return { ...value, python, framework: ROOT, config: currentConfig() };
}

const graphLocks = new Map();
export function withGraphLock(key, operation) {
  const previous = graphLocks.get(key) || Promise.resolve();
  const result = previous.catch(() => {}).then(operation);
  graphLocks.set(key, result);
  result.finally(() => { if (graphLocks.get(key) === result) graphLocks.delete(key); }).catch(() => {});
  return result;
}
export const graphVersion = (value) => createHash('sha256').update(JSON.stringify([value.graph, value.written])).digest('hex');
export async function guardedGraphSave(key, expectedVersion, readCurrent, writeNext) {
  if (!/^[a-f0-9]{64}$/.test(expectedVersion || '')) throw new Error('graph version required; reload before saving');
  return withGraphLock(key, async () => {
    const current = await readCurrent();
    if (current.version !== expectedVersion) throw new Error('argument graph conflict: graph changed; reload before saving');
    return writeNext();
  });
}

async function workspace(body) {
  if (body.command === 'graph-save') {
    if (typeof body.slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(body.slug) || typeof body.section !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(body.section)) throw new Error('invalid project or section');
    const key = JSON.stringify([currentConfig(), body.slug, body.section]);
    return guardedGraphSave(key, body.expectedVersion,
      () => workspace({ command: 'graph', slug: body.slug, section: body.section, native: true }),
      () => workspace({ ...body, command: 'graph-save-internal' }));
  }
  if (body.command === 'graph-init') {
    if (typeof body.slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(body.slug) || typeof body.section !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(body.section)) throw new Error('invalid project or section');
    const read = () => workspace({ command: 'graph', slug: body.slug, section: body.section, native: true });
    const existing = await read().catch(() => null);
    if (existing) return existing;
    const temporary = await fs.mkdtemp(path.join(os.tmpdir(), 'dsh-kp-graph-init-'));
    const input = path.join(temporary, 'graph.json');
    const graph = { title: `论证图 · ${body.section}`, paragraphs: [{ id: 'p1', role: 'middle', point: '' }], nodes: [], edges: [] };
    try {
      await fs.writeFile(input, JSON.stringify(graph), { encoding: 'utf8', flag: 'wx', mode: 0o600 });
      await workspace({ command: 'graph', slug: body.slug, section: body.section, file: input });
    } finally {
      await fs.unlink(input).catch(() => {});
      await fs.rmdir(temporary).catch(() => {});
    }
    return read();
  }
  const allowed = ['create', 'context', 'brief', 'material', 'revise', 'replace', 'graph', 'graph-save-internal'];
  if (!allowed.includes(body.command)) throw new Error(`unknown workspace command '${body.command}'`);
  let temporary;
  if (body.command === 'graph-save-internal') {
    if (!body.graph || typeof body.graph !== 'object' || Array.isArray(body.graph)) throw new Error('graph is required');
    temporary = await fs.mkdtemp(path.join(os.tmpdir(), 'dsh-kp-graph-'));
    const input = path.join(temporary, 'graph.json');
    try { await fs.writeFile(input, JSON.stringify(body.graph), { encoding: 'utf8', flag: 'wx', mode: 0o600 }); }
    catch (error) { await fs.rmdir(temporary).catch(() => {}); throw error; }
    body = { ...body, command: 'graph', file: input, preserve_written: true };
  }
  const args = [...configArgs(), body.command];
  if (body.slug) args.push(String(body.slug));
  if (['revise', 'replace', 'graph'].includes(body.command) && body.section) args.push(String(body.section));
  for (const [key, flag] of Object.entries({ kind: '--kind', audience: '--audience', venue: '--venue', language: '--language', length: '--length', citation_style: '--citation-style', style_profile: '--style-profile', id: '--id', file: '--file', path: '--path', note: '--note', original: '--original', revised: '--revised' })) pushFlag(args, flag, body[key]);
  if (body.written) args.push('--written');
  if (body.native) args.push('--native');
  if (body.preserve_written) args.push('--preserve-written');
  try {
    const result = await runJson(subprocess(), 'knowledge_palace.workspace.cli', args, { timeoutMs: 180000 });
    if (body.command === 'graph' && body.native && result.graph && result.written) result.version = graphVersion(result);
    return result;
  } finally {
    if (temporary) { await fs.unlink(path.join(temporary, 'graph.json')).catch(() => {}); await fs.rmdir(temporary).catch(() => {}); }
  }
}

export function parseCommandLine(rawInput = '') {
  const tokens = String(rawInput).trim().match(/(?:[^\s"]+|"[^"]*")+/g)?.map((value) => value.startsWith('"') ? value.slice(1, -1) : value) || [];
  const command = tokens.shift() || 'status';
  return { command, args: tokens, text: tokens.join(' ') };
}

async function commandRoute(rawInput) {
  const parsed = parseCommandLine(rawInput);
  if (!ROUTES[parsed.command] && parsed.command !== 'rebuild') throw new Error(`unknown /palace command '${parsed.command}'`);
  if (parsed.command === 'status') { configuredConfig(); return { direct: await status() }; }
  if (parsed.command === 'rebuild') return { direct: await invoke('rebuild') };
  if (parsed.command === 'ask' && !parsed.text) throw new Error('/palace ask requires a question');
  // ask and updates return their contract like every other command. The
  // contract holds the rules for answering and for reviewing updates, and has the model phrase the
  // retrieval topic (English key terms, alternatives) before it calls palace_research.
  const skill = ROUTES[parsed.command];
  const contractPath = path.join(ROOT, 'knowledge_palace', 'skills', skill, 'SKILL.md');
  const contract = await fs.readFile(contractPath, 'utf8');
  return {
    route: skill,
    command: `/palace ${[parsed.command, ...parsed.args].join(' ')}`,
    requires_model: true,
    contract,
    instruction: 'Follow this KnowledgePalace skill contract in a DSH session. Use native palace tools for evidence and storage. Any library/project write still requires explicit user intent and confirmation.',
  };
}

export function ledgerItems(body = {}) {
  if (!Array.isArray(body.items)) throw new Error('items must be an array');
  return body.items.map((item, index) => {
    if (!item || typeof item !== 'object' || Array.isArray(item)) throw new Error(`items[${index}] must be an object`);
    const id = String(item.id || '').trim();
    if (!id) throw new Error(`items[${index}].id is required`);
    if (!LEDGER_STATES.has(item.status)) throw new Error(`items[${index}].status must be pending, doing, done, or failed`);
    const normalized = { id: id.slice(0, 500), status: item.status };
    if (item.note !== undefined && String(item.note).trim()) normalized.note = String(item.note).trim().replace(/[\r\n]+/g, ' ').slice(0, 2000);
    return normalized;
  });
}

function ledgerText(items) {
  return items.length ? items.map((item) => `- [${item.status}] ${item.id}${item.note ? ` — ${item.note}` : ''}`).join('\n') : 'Ledger cleared.';
}

export const SPECIALIST_ROLES = Object.freeze(['extractor', 'stylist', 'auditor', 'reviewer']);

async function specialist(body) {
  const role = String(body.role || '').replace(/^palace-/, '');
  if (!SPECIALIST_ROLES.includes(role)) throw new Error(`role must be one of: ${SPECIALIST_ROLES.join(', ')}`);
  const file = path.join(ROOT, 'knowledge_palace', 'agents', `palace-${role}.md`);
  const contract = await fs.readFile(file, 'utf8');
  return {
    role,
    task: String(body.task || ''),
    contract,
    instruction: 'Run this bounded task in a read-only DSH subagent with the definition above, passing every file it needs as an absolute path: it does not see this conversation and cannot call palace_* tools. It returns a draft or findings; the main agent reviews them and owns all writes. Without delegation, do the step in this session under the same definition and report an audit or review as a same-session check.',
  };
}

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const PROJECTS_CACHE_TTL_MS = 10000;

// Resolve which library, project and tab a native Session is bound to. Every
// non-private library stores its rows under the `library-<id>~` namespace.
export async function lookupSessionBinding(domain, sessionId) {
  if (typeof sessionId !== 'string' || !sessionId || sessionId.length > 1024 || sessionId.trim() !== sessionId) throw new Error('invalid session id');
  const d = await domain;
  if (!d || typeof d.table !== 'function') throw new Error('storage domain unavailable');
  for (const [, raw] of d.table('session_bindings').entries()) {
    const row = sessionBindingSchema.parse(raw);
    if (row.sessionId !== sessionId) continue;
    for (const id of Object.keys(LIBRARY_CONFIGS)) {
      if (id === 'private') continue;
      const prefix = `library-${id}~`;
      if (row.projectId.startsWith(prefix)) return { library: id, projectId: row.projectId.slice(prefix.length), tabId: row.tabId };
    }
    return { library: 'private', projectId: row.projectId, tabId: row.tabId };
  }
  return null;
}

export function createBindingActions({ domain, sessionController, listProjects, workspaceRoot, libraryRoot = ROOT, bindingNamespace = '', now = Date.now }) {
  // Project discovery spawns Python; reuse one result briefly. A miss in a cached
  // result forces one fresh fetch because agent sessions may create projects.
  let projectsCache;
  function fetchProjects() {
    const entry = { at: now(), promise: Promise.resolve().then(() => listProjects()).then(result => {
      if (!Array.isArray(result?.projects)) throw new Error('project discovery unavailable');
      return result.projects;
    }) };
    projectsCache = entry;
    entry.promise.catch(() => { if (projectsCache === entry) projectsCache = undefined; });
    return entry.promise;
  }
  async function projectExists(projectId) {
    if (projectId === '__library__') return true;
    if (!SLUG_PATTERN.test(projectId)) return false;
    const has = projects => projects.some(project => project.slug === projectId);
    const cached = projectsCache && now() - projectsCache.at < PROJECTS_CACHE_TTL_MS ? projectsCache.promise : undefined;
    if (cached) {
      let projects;
      try { projects = await cached; } catch { projects = undefined; }
      if (projects && has(projects)) return true;
    }
    return has(await fetchProjects());
  }
  async function resolveCwd(projectId) {
    if (projectId === '__library__') return fs.realpath(libraryRoot);
    const root = await fs.realpath(await workspaceRoot());
    const projects = path.join(root, 'projects');
    const project = path.join(projects, projectId);
    const projectStat = await fs.lstat(project);
    const projectsStat = await fs.lstat(projects);
    if (!projectsStat.isDirectory() || projectsStat.isSymbolicLink() || !projectStat.isDirectory() || projectStat.isSymbolicLink()) throw new Error('project directory is not a regular directory');
    const actualProjects = await fs.realpath(projects), actual = await fs.realpath(project);
    if (actualProjects !== projects || actual !== project) throw new Error('project directory resolves outside workspace');
    return actual;
  }
  const store = createSessionBindings({ domain, sessionController, projectExists: id => projectExists(bindingNamespace ? id.slice(bindingNamespace.length) : id), resolveCwd: id => resolveCwd(bindingNamespace ? id.slice(bindingNamespace.length) : id) });
  const encode = input => ({ ...input, projectId: bindingNamespace + input.projectId });
  const decode = row => row && ({ ...row, projectId: bindingNamespace ? row.projectId.slice(bindingNamespace.length) : row.projectId });
  const call = async fn => { try { return await fn(); } catch (error) { if (error.binding) error.binding = decode(error.binding); throw error; } };
  return {
    list: async input => (await store.list(encode(input))).map(decode),
    get: async input => decode(await store.get(encode(input))),
    openOnClick: input => call(async () => decode(await store.openOnClick(encode(input)))),
    recover: input => call(async () => decode(await store.recover(encode(input)))),
    unlink: async input => decode(await store.unlink(encode(input))),
    lookupSession: async sessionId => lookupSessionBinding(await (typeof domain === 'function' ? domain() : domain), sessionId),
    invalidateProjects: () => { projectsCache = undefined; },
  };
}

export function revisionArgs(body = {}) {
  if (typeof body.slug !== 'string' || !SLUG_PATTERN.test(body.slug) || typeof body.section !== 'string' || !SLUG_PATTERN.test(body.section)) throw new Error('invalid project or section');
  if (typeof body.revision !== 'string' || !/^r\d{3}\.md$/.test(body.revision)) throw new Error('invalid revision');
  return [...configArgs(), 'read-revision', body.slug, body.section, body.revision];
}

async function resolveWorkspaceRoot() {
  const executable = await resolvePython(subprocess());
  const code = 'import json,sys; from knowledge_palace.tools.config_resolver import resolve_roots; print(json.dumps(str(resolve_roots(sys.argv[1])["workspace_dir"])))';
  const result = await runRaw(subprocess(), executable, ['-c', code, configuredConfig()]);
  if (result.code !== 0) throw processError('workspace root resolution', result);
  const root = JSON.parse(result.stdout);
  if (typeof root !== 'string' || !path.isAbsolute(root)) throw new Error('invalid workspace root');
  return root;
}

// This custom HTTP route does not apply Gateway resource roles; require the
// authenticated owner for every action, including private project reads.
export function ownerActionRejection(connection, request) {
  const admission = connection.admit(request);
  if (admission.rejection !== undefined) return admission.rejection;
  return admission.peer?.principal?.kind === 'owner' ? undefined : 403;
}

export function requireWorkspaceWriteConfirmation(body) {
  const writing = ['create', 'material', 'revise', 'replace', 'graph-save', 'graph-init'].includes(body.command) || (body.command === 'graph' && (body.file || body.written));
  if (writing && body.confirmed !== true) throw new Error('explicit workspace write confirmation required');
}

export function prepareVisualizationGraph(overview, full, limit) {
  if (overview.snapshot?.snapshot_id !== full.snapshot?.snapshot_id) throw new Error('Graph snapshot changed while loading; retry visualization');
  const selected = new Set(overview.nodes.map((node) => node.id));
  const links = [...overview.links];
  const ids = new Set(links.map((edge) => edge.id));
  const degree = new Map(overview.nodes.map((node) => [node.id, 0]));
  for (const edge of links) { degree.set(edge.from, (degree.get(edge.from) || 0) + 1); degree.set(edge.to, (degree.get(edge.to) || 0) + 1); }
  for (const edge of full.edges) {
    if (edge.kind !== 'cites' || !selected.has(edge.from) || !selected.has(edge.to) || ids.has(edge.id)) continue;
    links.push(edge); ids.add(edge.id); degree.set(edge.from, degree.get(edge.from) + 1); degree.set(edge.to, degree.get(edge.to) + 1);
  }
  const incident = new Map();
  for (const edge of full.edges) {
    if (!selected.has(edge.from) || !selected.has(edge.to) || edge.kind === 'cites') continue;
    for (const id of [edge.from, edge.to]) { if (!incident.has(id)) incident.set(id, []); incident.get(id).push(edge); }
  }
  let representativeEdgesAdded = 0;
  for (const id of [...selected].sort()) {
    if (degree.get(id)) continue;
    const edge = (incident.get(id) || []).find((item) => !ids.has(item.id));
    if (edge) { links.push(edge); ids.add(edge.id); degree.set(edge.from, degree.get(edge.from) + 1); degree.set(edge.to, degree.get(edge.to) + 1); representativeEdgesAdded++; }
  }
  return { ...overview, links, requestedLimit: limit, representativeEdgesAdded };
}

async function visualizationDocument(body) {
  const limit = Math.max(250, Math.min(5000, Number(body.max_nodes) || 500));
  await ensureGraph();
  const overview = await runJson(subprocess(), 'knowledge_palace.graph.network', networkArgs({ max_nodes: limit, max_links: 50000 }), { timeoutMs: 120000 });
  const full = await runJson(subprocess(), 'knowledge_palace.graph.visualization', configArgs(), { timeoutMs: 120000 });
  const graph = prepareVisualizationGraph(overview, full, limit);
  const citation = { works: Object.fromEntries(Object.entries(full.nodes).filter(([, node]) => node.kind === 'work')), edges: full.edges.filter((edge) => edge.kind === 'cites').map((edge) => [edge.from, edge.to]) };
  const escapeJson = (value) => JSON.stringify(value).replaceAll('<', '\\u003c').replaceAll('>', '\\u003e').replaceAll('&', '\\u0026');
  const template = await fs.readFile(path.join(ROOT, 'graph-visualization.html'), 'utf8');
  return { html: template.replace('__GRAPH_DATA__', escapeJson(graph)).replace('__FULL_DATA__', escapeJson(full)).replace('__CITATION_DATA__', escapeJson(citation)), snapshot: full.snapshot, nodeCount: graph.nodes.length };
}

async function invoke(action, body = {}, bindings) {
  if (action === 'libraries') return libraryAvailability();
  configuredConfig();
  switch (action) {
    case 'status': return status();
    case 'research': {
      if (body.view !== 'ask') throw new Error('browser research only supports the ask view');
      if (typeof body.topic !== 'string' || !body.topic.trim() || body.topic.length > 2000) throw new Error('research question must contain 1–2000 characters');
      if (body.project !== undefined && (typeof body.project !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(body.project))) throw new Error('invalid research project');
      return research({ view: 'ask', topic: body.topic.trim(), project: body.project, budget: 12000 });
    }
    case 'graph': return graph(body);
    case 'content': return graph({ ...body, operation: 'get_content' });
    case 'network': {
      await ensureGraph();
      return runJson(subprocess(), 'knowledge_palace.graph.network', networkArgs(body), { timeoutMs: 120000 });
    }
    case 'visualization': return visualizationDocument(body);
    case 'neighborhood': return neighborhood(body);
    case 'candidateSearch': return runJson(subprocess(), 'knowledge_palace.expansion.collect', candidateSearchArgs(body), { timeoutMs: 120000 });
    case 'search': {
      const args = searchArgs(body);
      await ensureGraph();
      return runJson(subprocess(), 'knowledge_palace.graph.search', args, { timeoutMs: 120000 });
    }
    case 'rebuild': {
      const result = await runModule(subprocess(), 'knowledge_palace.graph.builder', [...configArgs(), '--rebuild'], { timeoutMs: 180000 });
      if (result.code !== 0) throw processError('knowledge_palace.graph.builder --rebuild', result);
      return { text: result.stdout.trim() };
    }
    case 'projects': return runJson(subprocess(), 'knowledge_palace.workspace.discovery', [...configArgs(), 'list']);
    case 'project': {
      if (typeof body.slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(body.slug)) throw new Error('slug must be ASCII kebab-case');
      return runJson(subprocess(), 'knowledge_palace.workspace.discovery', [...configArgs(), 'details', body.slug]);
    }
    case 'styles':
      return runJson(subprocess(), 'knowledge_palace.workspace.cli', [...configArgs(), 'styles'], { timeoutMs: 120000 });
    case 'graphSummary': {
      const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
      if (typeof body.slug !== 'string' || !slugPattern.test(body.slug) || typeof body.section !== 'string' || !slugPattern.test(body.section)) throw new Error('invalid project or section');
      return runJson(subprocess(), 'knowledge_palace.workspace.discovery', [...configArgs(), 'graph-summary', body.slug, body.section], { timeoutMs: 120000 });
    }
    case 'setStyle': {
      if (body.confirmed !== true) throw new Error('explicit style update confirmation required');
      if (typeof body.slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(body.slug)) throw new Error('invalid project');
      if (typeof body.profile !== 'string' || body.profile.length > 2000 || /[\r\n\x00]/.test(body.profile)) throw new Error('invalid style profile');
      return runJson(subprocess(), 'knowledge_palace.workspace.cli', [...configArgs(), 'set-style', body.slug, `--profile=${body.profile}`], { timeoutMs: 120000 });
    }
    case 'createSection': {
      if (body.confirmed !== true) throw new Error('explicit section creation confirmation required');
      const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
      if (typeof body.slug !== 'string' || !slugPattern.test(body.slug) || typeof body.section !== 'string' || !slugPattern.test(body.section)) throw new Error('invalid project or section');
      return runJson(subprocess(), 'knowledge_palace.workspace.discovery', [...configArgs(), 'create-section', body.slug, body.section]);
    }
    case 'saveSection': {
      if (body.confirmed !== true) throw new Error('explicit save confirmation required');
      const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
      if (typeof body.slug !== 'string' || !slugPattern.test(body.slug) || typeof body.section !== 'string' || !slugPattern.test(body.section)) throw new Error('invalid project or section');
      if (typeof body.text !== 'string' || Buffer.byteLength(body.text, 'utf8') > 1024 * 1024) throw new Error('text exceeds editor limit');
      if (body.expected !== null && (typeof body.expected !== 'string' || !/^r\d{3}\.md$/.test(body.expected))) throw new Error('invalid expected revision');
      const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'dsh-kp-section-'));
      const tempFile = path.join(tempDir, 'text.txt');
      try {
        await fs.writeFile(tempFile, body.text, { encoding: 'utf8', flag: 'wx', mode: 0o600 });
        return await runJson(subprocess(), 'knowledge_palace.workspace.discovery', [...configArgs(), 'save-section', body.slug, body.section, `--expected=${body.expected ?? 'NONE'}`, `--file=${tempFile}`]);
      } finally { await fs.unlink(tempFile).catch(() => {}); await fs.rmdir(tempDir).catch(() => {}); }
    }
    case 'sessionBindingList': return bindings.list({ projectId: body.projectId, tabId: body.tabId });
    case 'sessionBindingGet': return (await bindings.get({ projectId: body.projectId, tabId: body.tabId })) ?? null;
    case 'sessionBindingOpen': {
      if ('cwd' in body || 'workspaceId' in body || 'agentPreset' in body) throw new Error('client session location and preset are not accepted');
      return bindings.openOnClick({ projectId: body.projectId, tabId: body.tabId, confirmed: body.confirmed });
    }
    case 'sessionBindingRecover': return bindings.recover({ projectId: body.projectId, tabId: body.tabId, sessionId: body.sessionId, confirmed: body.confirmed });
    case 'sessionBindingUnlink': return bindings.unlink({ projectId: body.projectId, tabId: body.tabId, expectedSessionId: body.expectedSessionId, confirmed: body.confirmed });
    case 'sessionBindingLookup': return bindings.lookupSession(body.sessionId);
    case 'revision': return runJson(subprocess(), 'knowledge_palace.workspace.discovery', revisionArgs(body));
    case 'workspace': {
      if (body.command === 'graph-save-internal') throw new Error('invalid workspace command');
      requireWorkspaceWriteConfirmation(body);
      const result = await workspace(body);
      if (body.command === 'create') bindings?.invalidateProjects?.();
      return result;
    }
    case 'updatesResolve': return research({ ...body, view: 'resolve' });
    case 'agent': return specialist(body);
    case 'questionPrompt': return buildQuestionPrompt(body);
    case 'commandRoute': return commandRoute(body.rawInput);
    default: throw new Error(`unknown action '${action}'`);
  }
}

export function buildQuestionPrompt(body) {
  const scope = body.scope || {};
  const question = String(body.question || '').trim();
  if (!question) throw new Error('question is required');
  if (question.length > 8000) throw new Error('question is too long');
  if (scope.type === 'level' && !Number.isInteger(scope.level)) throw new Error('level scope requires an integer level');
  if (scope.type === 'path' && (!Array.isArray(scope.path) || !scope.path.length)) throw new Error('path scope requires a non-empty path');
  if (scope.type === 'node' && !scope.node_id) throw new Error('node scope requires node_id');
  if (scope.type === 'relation' && !scope.edge_id) throw new Error('relation scope requires edge_id');
  const clean = (value) => String(value).replace(/[\r\n]+/g, ' ').slice(0, 2048);
  const refs = Array.isArray(body.claim_refs) ? body.claim_refs.filter(Boolean).slice(0, 100).map(clean) : [];
  const lines = [
    `KnowledgePalace hierarchical question: ${question}`,
    `Scope: ${scope.type || 'hierarchy'}`,
    scope.hierarchy_id && `Hierarchy: ${clean(scope.hierarchy_id)}`,
    scope.level !== undefined && `Level: ${scope.level}`,
    scope.node_id && `Node: ${clean(scope.node_id)}`,
    scope.entry_parent && `Entry parent: ${clean(scope.entry_parent)}`,
    Array.isArray(scope.path) && scope.path.length && `Path: ${scope.path.slice(0, 100).map(clean).join(' > ')}`,
    scope.edge_id && `Relation: ${clean(scope.edge_id)}`,
    scope.filters && `Visible filters: ${JSON.stringify(scope.filters)}`,
    refs.length && `Claim references: ${refs.join(', ')}`,
    scope.type === 'node' && 'The selected node is the motivation and retrieval seed, not an evidence boundary. Expand beyond it to relevant parents, children, semantic relations, citations, Claims, gaps, and other works across KnowledgePalace whenever they help answer the question. Keep the synthesis centered on why the expanded evidence matters for the seed node. Do not limit the answer to the node content unless the user explicitly asks for node-only evidence.',
    scope.type === 'relation' && 'Treat the selected relation as the retrieval seed, not an evidence boundary. Expand to evidence on both endpoints, their relevant context, citations, Claims, and competing explanations.',
    scope.type === 'path' && 'Treat the browsing path as the motivating thread, not an evidence boundary. Expand to relevant evidence elsewhere in KnowledgePalace and return the synthesis to that thread.',
    'Use palace_research and palace_get_content to ground the answer. Distinguish facts from inference and cite stable Claim IDs and anchors.',
  ];
  return { prompt: lines.filter(Boolean).join('\n') };
}

function success(text) { return { kind: 'success', text }; }
function failure(text) { return { kind: 'error', text }; }
async function readJsonBody(req) {
  const chunks = []; let bytes = 0;
  for await (const chunk of req) { bytes += chunk.length; if (bytes > MAX_BODY) { const e = new Error('request body is too large'); e.statusCode = 413; throw e; } chunks.push(chunk); }
  if (!chunks.length) return {};
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { throw new Error('invalid JSON body'); }
}

function tool(name, description, properties, required, execute) {
  return { name, description, parameters: { type: 'object', properties, required, additionalProperties: false }, output: { schema: { type: 'object', additionalProperties: true }, render(_args, value) { return [{ type: 'text', text: value?.text || JSON.stringify(value, null, 2) }]; } }, execute };
}

export function apply(ctx) {
  subprocessService = ctx.subprocess;
  const domainPromise = ctx.storageDomain.open(sessionBindingsDomainSpec);
  // Handle rejection immediately while preserving it for action callers.
  domainPromise.catch(() => {});
  const bindingsByLibrary = Object.fromEntries(Object.keys(LIBRARY_CONFIGS).map(id => [id, createBindingActions({
    domain: domainPromise, sessionController: ctx.sessionController,
    listProjects: () => invoke('projects'), workspaceRoot: resolveWorkspaceRoot,
    libraryRoot: id === 'demo' ? path.join(ROOT, 'demo-library') : ROOT,
    bindingNamespace: id === 'private' ? '' : `library-${id}~`,
  })]));
  ctx.effect(() => async () => { const domain = await domainPromise.catch(() => undefined); if (domain) await domain.close(); });
  ctx.effect(() => () => {
    subprocessService = undefined;
    resetPython();
  });
  ctx.effect(() => ctx.systemPrompt.section({
    name: 'knowledge-palace', order: 75,
    text: 'KnowledgePalace is available for evidence-grounded research. For /palace commands or matching natural-language workflows, call palace_route to load the exact workflow contract, then use native palace tools. Retrieve bounded context before conclusions; preserve Claim IDs, quotes and anchors; distinguish fact from inference. Library and project writes require the user’s explicit intent and confirmation. The graph is derived state. Use palace_agent only to prepare a read-only subagent task (paper reading, style reading, source audit, writing review); the main agent owns review and writes.',
  }));

  const registrations = [
    tool('palace_route', 'Load the exact workflow contract for a KnowledgePalace command before carrying it out. status and rebuild return their result directly; every other command returns the responsible skill contract and instructions.', { command: { type: 'string', description: 'Command text without the /palace prefix, for example: write project-alpha introduction.' } }, ['command'], async ({ command }) => commandRoute(command)),
    tool('palace_status', 'Inspect KnowledgePalace roots, index freshness, and runtime availability.', {}, [], async () => status()),
    tool('palace_research', 'Retrieve bounded evidence and research context from KnowledgePalace. A stale derived index may be refreshed before the read. bridges pages its corridors: follow next_offset (or filter by axis) until next_offset is null to see every corridor.', { view: { type: 'string', enum: RESEARCH_VIEWS }, topic: { type: 'string' }, offset: { type: 'integer', minimum: 0, description: 'bridges: start of the detailed page; pass next_offset from the previous result.' }, axis: { type: 'string', enum: ['pattern', 'function', 'failure-mode', 'bridge'], description: 'bridges: keep one corridor type.' }, alternatives: { type: 'array', items: { type: 'string' } }, project: { type: 'string' }, entry: { type: 'string' }, decision: { type: 'string', enum: ['retain', 'revise', 'withdraw'] }, note: { type: 'string' }, domain_b: { type: 'string' }, file: { type: 'string' }, budget: { type: 'integer', minimum: 4000, maximum: 100000 }, full: { type: 'boolean' } }, ['view'], async (args) => research(args)),
    tool('palace_get_content', 'Read one graph node’s canonical evidence content by stable node ID.', { node_id: { type: 'string' } }, ['node_id'], async (args) => graph({ operation: 'get_content', ...args })),
    tool('palace_graph', 'Navigate hierarchies, levels, node context, children, siblings, and relations with independent cursors.', { operation: { type: 'string', enum: GRAPH_OPS }, hierarchy_id: { type: 'string' }, level: { type: 'integer' }, node_id: { type: 'string' }, entry_parent: { type: 'string' }, cursor: { type: 'string' }, children_cursor: { type: 'string' }, edges_cursor: { type: 'string' }, limit: { type: 'integer', minimum: 1, maximum: 500 } }, ['operation'], graph),
    tool('palace_rebuild_index', 'Rebuild the derived Graph Index used by KnowledgePalace queries and the embedded hierarchy viewer.', {}, [], async () => invoke('rebuild')),
    tool('palace_updates_resolve', 'Record a reviewed semantic-update decision; requires node, entry, decision, and note.', { topic: { type: 'string' }, entry: { type: 'string' }, decision: { type: 'string', enum: ['retain', 'revise', 'withdraw'] }, note: { type: 'string' } }, ['topic', 'entry', 'decision', 'note'], async (args) => invoke('updatesResolve', args)),
    tool('palace_workspace', 'Manage an explicitly authorized writing workspace. Revision commands are append-only; materials and generated graph pages use their documented update semantics.', { command: { type: 'string', enum: ['create', 'context', 'brief', 'material', 'revise', 'replace', 'graph'] }, slug: { type: 'string' }, section: { type: 'string' }, audience: { type: 'string' }, kind: { type: 'string' }, venue: { type: 'string' }, language: { type: 'string' }, length: { type: 'string' }, citation_style: { type: 'string' }, style_profile: { type: 'string' }, file: { type: 'string' }, path: { type: 'string' }, id: { type: 'string' }, note: { type: 'string' }, original: { type: 'string' }, revised: { type: 'string' }, written: { type: 'boolean' } }, ['command'], async (args) => workspace(args)),
    tool('palace_ledger', 'Record the complete item list and progress for a multi-item KnowledgePalace task. Replace the previous list on every call; DSH stores each result in the durable session log, so the latest call on a branch restores the batch after resume, fork, or compaction. This tracks progress only and does not prove a library write.', { items: { type: 'array', description: 'Complete replacement list for the current batch.', maxItems: 500, items: { type: 'object', properties: { id: { type: 'string', description: 'Paper slug, DOI, section, or another stable short handle.' }, status: { type: 'string', enum: ['pending', 'doing', 'done', 'failed'] }, note: { type: 'string', description: 'Optional one-line outcome or blocking reason.' } }, required: ['id', 'status'], additionalProperties: false } } }, ['items'], async (args) => { const items = ledgerItems(args); return { text: ledgerText(items), items }; }),
    tool('palace_agent', 'Load one KnowledgePalace subagent definition (paper reading, style reading, source audit or writing review) and assemble a bounded read-only task for a DSH subagent.', { role: { type: 'string', enum: SPECIALIST_ROLES }, task: { type: 'string' } }, ['role', 'task'], specialist),
  ];
  const libraryOfAgent = async agent => {
    if (!agent?.id) return 'private';
    const domain = await domainPromise;
    return libraryForAgent(agent, domain, ctx.sessionController, path.join(ROOT, 'demo-library'));
  };
  // palace_route, palace_ledger and palace_agent read only the plugin itself; every other tool touches the library.
  const LIBRARY_FREE_TOOLS = new Set(['palace_route', 'palace_ledger', 'palace_agent']);
  for (const definition of registrations) {
    const execute = definition.execute;
    const needsLibrary = !LIBRARY_FREE_TOOLS.has(definition.name);
    definition.execute = async (args, exec) => {
      return withLibrary(await libraryOfAgent(exec?.agent), () => { if (needsLibrary) configuredConfig(); return execute(args, exec); });
    };
    ctx.effect(() => ctx.tools.register(definition));
  }

  ctx.effect(() => ctx.commands.register({ name: 'palace', description: 'Route the full KnowledgePalace command surface; read-only views run directly and workflow commands open as a DSH-ready prompt.', input: { hint: 'init | expand | ingest | ask | brief | discover | idea refine | research | write | polish | feasibility | updates | status | audit | govern | refresh | domain | style | viewer | wiki' }, handler: async ({ rawInput, agent }) => { try { const value = await withLibrary(await libraryOfAgent(agent), () => commandRoute(rawInput)); if (value.direct !== undefined) return success(JSON.stringify(value.direct, null, 2)); return success(`${value.instruction}\n\nCommand: ${value.command}\nRoute: ${value.route}\n\n${value.contract}`); } catch (error) { return failure(errorText(error)); } } }));

  ctx.inject(['webServer', 'connection'], (webCtx) => webCtx.effect(() => webCtx.webServer.register({
    kind: 'prefix', path: '/knowledge-palace', handler: async (req, res) => {
      const respond = (statusCode, payload) => { if (!res.writableEnded) { res.writeHead(statusCode, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' }); res.end(JSON.stringify(payload)); } };
      try {
        const rejection = await webCtx.connection.requestRejection(req);
        if (rejection) return respond(rejection, { ok: false, error: rejection === 401 ? 'unauthorized' : 'forbidden' });
        const url = new URL(req.url || '/', 'http://knowledge-palace.local');
        if (url.pathname !== '/knowledge-palace/action') return respond(404, { ok: false, error: 'unknown endpoint' });
        if (req.method !== 'POST') return respond(405, { ok: false, error: 'method not allowed' });
        const denied = ownerActionRejection(webCtx.connection, req);
        if (denied) return respond(denied, { ok: false, error: denied === 401 ? 'unauthorized' : 'owner access required' });
        const body = await readJsonBody(req);
        const allowedActions = new Set(['libraries', 'status', 'graph', 'content', 'network', 'visualization', 'neighborhood', 'search', 'candidateSearch', 'research', 'rebuild', 'questionPrompt', 'workspace', 'projects', 'project', 'styles', 'setStyle', 'graphSummary', 'createSection', 'saveSection', 'sessionBindingList', 'sessionBindingGet', 'sessionBindingOpen', 'sessionBindingRecover', 'sessionBindingUnlink', 'sessionBindingLookup', 'revision']);
        if (!allowedActions.has(body.action)) return respond(403, { ok: false, error: 'action is not available to the browser workbench' });
        if (body.action === 'rebuild' && body.confirmed !== true) throw new Error('explicit index rebuild confirmation required');
        const libraryId = body.library ?? 'private';
        libraryConfig(libraryId);
        return respond(200, { ok: true, value: await withLibrary(libraryId, () => invoke(body.action, body, bindingsByLibrary[libraryId])) });
      } catch (error) { return respond(Number.isInteger(error?.statusCode) ? error.statusCode : 400, { ok: false, error: errorText(error), ...(error instanceof LibraryNotConfiguredError ? { code: error.code } : {}), ...(error instanceof SessionBindingPersistenceError ? { recovery: error.binding } : {}), ...(error instanceof SessionBindingUnavailableError ? { binding: error.binding, bindingStatus: error.status } : {}) }); }
    },
  })));
}
