import { createHash } from 'node:crypto';
import path from 'node:path';
import { z } from 'zod';

const id = z.string().min(1).max(1024).refine(v => v.trim() === v, 'identity must not have surrounding whitespace');
export const sessionBindingSchema = z.strictObject({ projectId: id, tabId: id, sessionId: id });
// Add this table to a caller-owned storageDomain.open spec (version/migration is
// the integrator's responsibility); never write files into project directories.
export const sessionBindingTableSpec = { valueSchema: sessionBindingSchema };
const targetSchema = z.strictObject({ projectId: id, tabId: id });
const clickSchema = z.strictObject({ projectId: id, tabId: id, confirmed: z.literal(true) });
const recoverySchema = z.strictObject({ projectId: id, tabId: id, sessionId: id, confirmed: z.literal(true) });
const unlinkSchema = z.strictObject({ projectId: id, tabId: id, expectedSessionId: id, confirmed: z.literal(true) });
const locks = new WeakMap();
const pending = new WeakMap();
const keyOf = ({ projectId, tabId }) => createHash('sha256').update(JSON.stringify([projectId, tabId])).digest('hex');
function serialize(domain, fn) {
  const result = (locks.get(domain) ?? Promise.resolve()).catch(() => {}).then(fn);
  locks.set(domain, result);
  result.finally(() => { if (locks.get(domain) === result) locks.delete(domain); }).catch(() => {});
  return result;
}
function pendingOf(domain) {
  let map = pending.get(domain);
  if (!map) { map = new Map(); pending.set(domain, map); }
  return map;
}
export class SessionBindingUnavailableError extends Error {
  constructor(binding, status) {
    super(`Session ${binding.sessionId} is ${status}; binding retained. Explicitly unlink before creating a replacement.`);
    this.name = 'SessionBindingUnavailableError';
    this.binding = { ...binding };
    this.status = status;
  }
}
export class SessionBindingPersistenceError extends Error {
  constructor(binding, cause) {
    super(`Session ${binding.sessionId} was created but its binding could not be persisted; recover this exact session before retrying`, { cause });
    this.name = 'SessionBindingPersistenceError';
    this.binding = { ...binding };
  }
}
/**
 * One store per domain is recommended. All callers sharing the same domain
 * handle serialize inside this module. This is NOT a cross-process lock or a
 * transaction with session creation. A failed put returns the created ID in a
 * SessionBindingPersistenceError and blocks another create for that target in
 * this process. The caller must display/log that ID outside this storage and
 * offer explicit recovery. A crash before the ID is reported is unrecoverable
 * through this API alone. A failed put may also have committed: recovery checks.
 * projectExists must authoritatively verify the project, without private files.
 */
export function createSessionBindings({ domain, sessionController, projectExists, resolveCwd }) {
  if (typeof projectExists !== 'function') throw new Error('projectExists is required');
  async function resolve() {
    const d = await (typeof domain === 'function' ? domain() : domain);
    if (!d || typeof d.table !== 'function') throw new Error('storage domain unavailable');
    return d;
  }
  async function checkProject(projectId) {
    if (!await projectExists(projectId)) throw new Error(`unknown project '${projectId}'`);
  }
  function read(t, target) {
    const result = t.get(keyOf(target));
    if (result === undefined) return undefined;
    const binding = sessionBindingSchema.parse(result);
    if (binding.projectId !== target.projectId || binding.tabId !== target.tabId) throw new Error('binding key mismatch');
    return binding;
  }
  function ensureUnique(t, binding) {
    for (const [key, raw] of t.entries()) {
      const other = sessionBindingSchema.parse(raw);
      if (key !== keyOf(binding) && other.sessionId === binding.sessionId) throw new Error('session is already bound to another tab');
    }
  }
  async function listVisibleSessions() {
    if (typeof sessionController?.list !== 'function') throw new Error('sessionController.list unavailable');
    const result = await sessionController.list({}, new AbortController().signal);
    if (!Array.isArray(result?.items)) throw new Error('session list unavailable');
    return result.items;
  }
  async function sessionStatus(binding, items) {
    const sessions = items ?? await listVisibleSessions();
    const session = sessions.find(item => item.sessionId === binding.sessionId);
    if (!session) return 'not-visible';
    if (session.origin === 'subagent' || session.parentSessionId) return 'not-ordinary';
    if (session.formatStatus === 'migration-required') return 'migration-required';
    if (typeof resolveCwd !== 'function') throw new Error('project directory resolver unavailable');
    const expectedCwd = await resolveCwd(binding.projectId);
    if (typeof session.cwd !== 'string' || !path.isAbsolute(session.cwd) || typeof expectedCwd !== 'string' || !path.isAbsolute(expectedCwd)) return 'cwd-unverified';
    const comparable = value => process.platform === 'win32' ? path.normalize(value).toLowerCase() : path.normalize(value);
    return comparable(session.cwd) === comparable(expectedCwd) ? 'available' : 'cwd-mismatch';
  }
  return {
    async list(input) {
      const target = targetSchema.parse(input), d = await resolve();
      return serialize(d, async () => {
        await checkProject(target.projectId);
        const prefix = `${target.tabId}~`;
        const bindings = Array.from(d.table('session_bindings').entries(), ([, raw]) => sessionBindingSchema.parse(raw))
          .filter(row => row.projectId === target.projectId && (row.tabId === target.tabId || row.tabId.startsWith(prefix)));
        const result = [];
        const sessions = bindings.length ? await listVisibleSessions() : [];
        for (const row of bindings) {
          // Response-only activity fields; the stored binding schema is unchanged.
          const visible = sessions.find(item => item.sessionId === row.sessionId);
          const entry = { ...row, status: await sessionStatus(row, sessions), running: visible?.running === true };
          if (typeof visible?.updatedAt === 'number' && Number.isFinite(visible.updatedAt)) entry.updatedAt = visible.updatedAt;
          result.push(entry);
        }
        return result;
      });
    },
    async get(input) {
      const target = targetSchema.parse(input), d = await resolve();
      return serialize(d, async () => {
        await checkProject(target.projectId);
        const binding = read(d.table('session_bindings'), target);
        return binding ? { ...binding, status: await sessionStatus(binding) } : undefined;
      });
    },
    // Call ONLY from the explicit user-click handler, never during rendering or startup.
    async openOnClick(input) {
      const args = clickSchema.parse(input), target = { projectId: args.projectId, tabId: args.tabId }, d = await resolve();
      return serialize(d, async () => {
        await checkProject(target.projectId);
        const t = d.table('session_bindings'), key = keyOf(target), existing = read(t, target), outstanding = pendingOf(d).get(key);
        if (existing) {
          if (outstanding && outstanding.sessionId !== existing.sessionId) throw new Error('binding conflicts with an unrecorded created session');
          const status = await sessionStatus(existing);
          if (status !== 'available') throw new SessionBindingUnavailableError(existing, status);
          pendingOf(d).delete(key);
          return existing;
        }
        if (outstanding) throw new SessionBindingPersistenceError(outstanding, new Error('recovery required'));
        if (typeof sessionController?.create !== 'function') throw new Error('sessionController unavailable');
        // Never pass sessionId: it requests reuse of a named blank.
        if (typeof resolveCwd !== 'function') throw new Error('project directory resolver unavailable');
        const cwd = await resolveCwd(target.projectId);
        if (typeof cwd !== 'string' || !cwd) throw new Error('project directory unavailable');
        const created = await sessionController.create({ cwd });
        const binding = sessionBindingSchema.parse({ ...target, sessionId: created.sessionId });
        pendingOf(d).set(key, binding);
        try { ensureUnique(t, binding); await t.put(key, binding); }
        catch (cause) { throw new SessionBindingPersistenceError(binding, cause); }
        pendingOf(d).delete(key);
        // created is response-only: strip it before passing a binding back to recover/unlink.
        return { ...binding, created: true };
      });
    },
    // Explicitly remove only the mapping, never the native Session. Caller must
    // show and confirm the exact expected ID; new creation is a separate click.
    async unlink(input) {
      const args = unlinkSchema.parse(input), d = await resolve();
      return serialize(d, async () => {
        await checkProject(args.projectId);
        const t = d.table('session_bindings'), key = keyOf(args), existing = read(t, args), outstanding = pendingOf(d).get(key);
        if (outstanding) throw new SessionBindingPersistenceError(outstanding, new Error('recover pending session first'));
        if (!existing) throw new Error('binding does not exist');
        if (existing.sessionId !== args.expectedSessionId) throw new Error('binding changed; refresh and confirm the current session ID');
        if (!await t.delete(key)) throw new Error('binding was not deleted');
        return { ...existing, unlinked: true };
      });
    },
    // Explicit human-directed recovery of a previously reported session ID.
    async recover(input) {
      const args = recoverySchema.parse(input), binding = { projectId: args.projectId, tabId: args.tabId, sessionId: args.sessionId }, d = await resolve();
      return serialize(d, async () => {
        await checkProject(binding.projectId);
        const t = d.table('session_bindings'), key = keyOf(binding), existing = read(t, binding), outstanding = pendingOf(d).get(key);
        if (existing && existing.sessionId !== binding.sessionId) throw new Error('target is already bound to another session');
        if (outstanding && outstanding.sessionId !== binding.sessionId) throw new Error('recovery session differs from the created session');
        const status = await sessionStatus(binding);
        if (status !== 'available') throw new SessionBindingUnavailableError(binding, status);
        ensureUnique(t, binding);
        if (!existing) await t.put(key, binding);
        pendingOf(d).delete(key);
        return { ...binding };
      });
    },
  };
}
