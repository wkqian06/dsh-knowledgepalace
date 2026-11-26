import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.dirname(fileURLToPath(import.meta.url));
// The private library config. Defaults to <plugin>/.palace.toml; override with PALACE_CONFIG.
export const CONFIG = process.env.PALACE_CONFIG ? path.resolve(process.env.PALACE_CONFIG) : path.join(ROOT, '.palace.toml');
export const DEFAULT_MAX_BYTES = 64 * 1024 * 1024;

function candidates() {
  // Order: explicit override, a venv bundled next to the plugin, then the system interpreter.
  const explicit = process.env.PALACE_PYTHON;
  const bundled = process.platform === 'win32'
    ? path.join(ROOT, '.venv', 'Scripts', 'python.exe')
    : path.join(ROOT, '.venv', 'bin', 'python');
  return [explicit, bundled, process.platform === 'win32' ? 'python' : 'python3'].filter(Boolean);
}

export function processError(module, result) {
  const detail = (result.stderr || result.stdout || `Python exited ${result.code}`).trim();
  const error = new Error(`${module}: ${detail}`);
  error.code = result.code;
  error.stdout = result.stdout;
  error.stderr = result.stderr;
  return error;
}

export function decodeJson(module, result) {
  try { return JSON.parse(result.stdout); }
  catch {
    if (result.code !== 0) throw processError(module, result);
    throw new Error(`Expected JSON from ${module}: ${result.stdout.slice(0, 500)}`);
  }
}

function collectedText(reader, label) {
  const output = reader?.readFrom(0);
  if (!output) return '';
  if (output.lossy) {
    const suffix = output.spillPath ? `; complete output: ${output.spillPath}` : '';
    throw new Error(`${label} exceeded the in-memory collection limit${suffix}`);
  }
  return output.text;
}

export async function runRaw(subprocess, executable, args, options = {}) {
  if (!subprocess) throw new Error('DSH subprocess service is unavailable');
  const { timeoutMs = 120000, maxBytes = DEFAULT_MAX_BYTES, signal } = options;
  const controller = new AbortController();
  let timeout;
  const abort = () => controller.abort(signal?.reason);
  signal?.addEventListener('abort', abort, { once: true });
  if (signal?.aborted) abort();
  timeout = setTimeout(() => controller.abort(new Error(`Python operation timed out after ${timeoutMs}ms`)), timeoutMs);
  try {
    const resolved = await subprocess.resolveExecutable(executable, undefined, controller.signal);
    const handle = subprocess.spawn({
      argv: [resolved, ...args],
      cwd: ROOT,
      env: { PYTHONUTF8: '1', PYTHONIOENCODING: 'utf-8', PYTHONPATH: ROOT },
      stdio: {
        stdin: 'ignore',
        stdout: { maxBytes },
        stderr: { maxBytes },
      },
      graceMs: 5000,
      signal: controller.signal,
    });
    let outcome;
    try {
      outcome = await handle.done;
    } catch (error) {
      if (controller.signal.aborted) {
        if (signal?.aborted) throw new Error('Python operation cancelled', { cause: error });
        throw new Error(`Python operation timed out after ${timeoutMs}ms`, { cause: error });
      }
      throw error;
    } finally {
      if (controller.signal.aborted) {
        try { handle.terminate(); } catch {}
        await handle.waitForExit().catch(() => {});
      }
    }
    if (controller.signal.aborted) {
      if (signal?.aborted) throw new Error('Python operation cancelled');
      throw new Error(`Python operation timed out after ${timeoutMs}ms`);
    }
    return {
      stdout: collectedText(handle.collected.stdout, 'Python stdout'),
      stderr: collectedText(handle.collected.stderr, 'Python stderr'),
      code: outcome.exitCode ?? -1,
      signal: outcome.signal,
    };
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener('abort', abort);
  }
}

let selected;
export function resetPython() { selected = undefined; }
export async function resolvePython(subprocess) {
  if (selected) return selected;
  for (const executable of candidates()) {
    try {
      const result = await runRaw(subprocess, executable, ['-c', 'import sys; print(f"{sys.version_info.major}.{sys.version_info.minor}")'], { timeoutMs: 5000, maxBytes: 1000 });
      if (result.code === 0) {
        const [major, minor] = result.stdout.trim().split('.').map(Number);
        if (major > 3 || (major === 3 && minor >= 12)) {
          selected = executable;
          return selected;
        }
      }
    } catch {}
  }
  throw new Error('Python 3.12+ was not found. Set PALACE_PYTHON to a usable interpreter.');
}

let runTail = Promise.resolve();
export function serial(task) {
  const next = runTail.then(task, task);
  runTail = next.catch(() => {});
  return next;
}

export async function runModule(subprocess, module, args = [], options = {}) {
  return serial(async () => {
    const executable = await resolvePython(subprocess);
    return runRaw(subprocess, executable, ['-m', module, ...args], options);
  });
}

export async function runJson(subprocess, module, args = [], options = {}) {
  return decodeJson(module, await runModule(subprocess, module, args, options));
}
