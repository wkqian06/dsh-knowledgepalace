import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { decodeJson, runRaw, serial } from '../python.js';
import { buildQuestionPrompt, candidateSearchArgs, graphArgs, ledgerItems, neighborhoodArgs, networkArgs, searchArgs, parseCommandLine, researchArgs, requireWorkspaceWriteConfirmation, withGraphLock, graphVersion, guardedGraphSave, prepareVisualizationGraph, withLibrary, libraryConfig, libraryForSession } from '../index.js';

test('library configuration remains isolated across concurrent asynchronous operations', async () => {
  assert.throws(() => libraryConfig('../private'), /unknown library/);
  const [a, b] = await Promise.all(['private', 'demo'].map(id => withLibrary(id, async () => {
    await new Promise(resolve => setImmediate(resolve));
    return graphArgs({ operation: 'list_hierarchies' })[0];
  })));
  assert.equal(a, `--config=${libraryConfig('private')}`);
  assert.equal(b, `--config=${libraryConfig('demo')}`);
  assert.notEqual(a, b);
  assert.equal(graphArgs({ operation: 'list_hierarchies' })[0], a);
});

test('session library routing rejects ambiguous identities', () => {
  const rows = [{ sessionId: 'one', projectId: 'library-demo~demo-paper' }, { sessionId: 'two', projectId: 'demo-paper' }];
  assert.equal(libraryForSession(rows, 'one'), 'demo');
  assert.equal(libraryForSession(rows, 'two'), 'private');
  assert.equal(libraryForSession(rows, 'other'), 'private');
  assert.throws(() => libraryForSession([...rows, { sessionId: 'one', projectId: 'demo-paper' }], 'one'), /ambiguous/);
});

test('graph save refuses stale graph and written baselines', async () => {
  let value = { graph: { title: 'one' }, written: { title: 'old' } };
  const original = graphVersion(value);
  const read = async () => ({ ...value, version: graphVersion(value) });
  await assert.rejects(guardedGraphSave('x', '', read, () => {}), /version required/);
  await guardedGraphSave('x', original, read, async () => { value = { ...value, graph: { title: 'two' } }; });
  await assert.rejects(guardedGraphSave('x', original, read, () => { throw new Error('must not write'); }), /conflict/);
  const current = graphVersion(value);
  value = { ...value, written: { title: 'changed' } };
  await assert.rejects(guardedGraphSave('x', current, read, () => { throw new Error('must not write'); }), /conflict/);
});

test('graph writes serialize per project and section after failures', async () => {
  let current = 'base';
  const save = (value) => withGraphLock('project:section', async () => {
    if (current !== 'base') throw new Error('conflict');
    await new Promise(resolve => setImmediate(resolve));
    current = value;
  });
  const results = await Promise.allSettled([save('one'), save('two')]);
  assert.deepEqual(results.map(row => row.status), ['fulfilled', 'rejected']);
  assert.equal(current, 'one');
  await withGraphLock('project:section', () => { current = 'three'; });
  assert.equal(current, 'three');
});

const clientSource = () => fs.readFileSync(new URL('../client.js', import.meta.url), 'utf8');
const between = (source, start, end) => { const from = source.indexOf(start); assert.ok(from >= 0, `missing ${start}`); const to = source.indexOf(end, from + start.length); assert.ok(to > from, `missing ${end}`); return source.slice(from, to); };

test('shell exposes four workspaces, a resizable evidence/assistant dock and one palette', () => {
  const source = clientSource();
  assert.match(source, /const TAB_LABELS = \{ graph: '探索', research: '研究', writing: '写作', maintenance: '维护' \}/);
  assert.match(source, /className: 'kp-rail'/);
  assert.match(source, /className: `kp-dock/);
  assert.match(source, /kp-dock-resizer/);
  assert.match(source, /className: 'kp-palette'/);
  assert.match(source, /setPaletteOpen/);
  assert.doesNotMatch(source, /知识宫殿工作台/);
  assert.doesNotMatch(source, /ingest: '文献收集与导入'/);
});

test('explore home embeds the satisfied live visualization with a focus bridge', () => {
  const source = clientSource();
  assert.match(source, /function LiveVisualization\(/);
  assert.match(source, /api\('visualization', \{ max_nodes: limit \}\)/);
  assert.match(source, /palace-graph-select/);
  assert.match(source, /palace-graph-limit/);
  assert.match(source, /type: 'palace-graph-focus', id/);
  assert.match(source, /palace-graph-focus-result/);
  assert.match(source, /event\.source !== frame\.current\.contentWindow/);
  assert.match(source, /sandbox: 'allow-scripts'/);
  assert.doesNotMatch(source, /function ExploreMap\(/);
  assert.doesNotMatch(source, /MAP_CSS/);
  assert.match(source, /function LocalHierarchy\(/);
  assert.match(source, /function GlobalSearch\(/);
  assert.match(source, /function parseCardRecord\(/);
  assert.match(source, /kp-ev-condition/);
});

test('node selection clears stale evidence, records history and requests focus for non-graph sources', () => {
  const choose = between(clientSource(), 'const chooseNode = async', 'const navigateHistory');
  assert.match(choose, /setGraphSelection\(\{ node: picked, context: null, content: null, parents: \[\], children: \[\], edges: \[\] \}\)/);
  assert.match(choose, /setDockTab\('evidence'\)/);
  assert.match(choose, /generation !== graphSelectionGeneration\.current/);
  assert.match(choose, /if \(options\.source !== 'graph'\) setFocusRequest/);
  assert.match(choose, /api\('neighborhood', \{ node_id: picked\.id, citations: kind === 'work' \}\)/);
  assert.match(clientSource(), /title: tr\('引用两跳（知识流：来源 → 本文 → 后续工作）'\)/);
  assert.match(choose, /historyRef\.current = \{ path: next, index: next\.length - 1 \}/);
});

test('layered questions are scoped and filled into the current session composer', () => {
  const ask = between(clientSource(), 'const askScoped = async', 'const askCard');
  assert.match(ask, /api\('questionPrompt', \{ question: question\.trim\(\), scope, claim_refs: evidenceRefs \}\)/);
  assert.match(ask, /dispatch\(value\.prompt, \{ tab \}\)/);
  assert.match(ask, /edge_id: type === 'relation'/);
  assert.match(ask, /path: path\.map/);
});

test('tasks are filled into the native composer after the session list is loaded, never auto-sent', () => {
  const source = clientSource();
  const dispatch = between(source, 'const dispatch = (prompt', 'const switchProject');
  assert.match(dispatch, /setIntent\(\{ tab: targetTab/);
  assert.doesNotMatch(source, /setTimeout\(\(\) => openSessionRef/);
  const effect = between(source, 'const intentBindingKey', 'const sendFallback');
  assert.match(effect, /bindingsLoading \|\| loadedKey !== intentBindingKey\(intent\)/);
  const fill = between(source, 'const applyFill = async', 'const runIntent');
  assert.match(fill, /entry\.setDraft\(text\)/);
  assert.match(fill, /sameText\(entry\.readDraft\?\.\(\), text\)/);
  assert.match(fill, /phase: 'choose'/);
  assert.doesNotMatch(fill, /\.prompt\(\[/);
  assert.match(source, /'替换为新任务'/);
  assert.match(source, /'追加到后面'/);
  assert.match(source, /'保留原内容'/);
  assert.doesNotMatch(source, /readOnly: true, value: pendingPrompt/);
});

test('fallback sending is editable and keeps one request identity across retries', () => {
  const send = between(clientSource(), 'const sendFallback = async', '// ---------- navigation and dispatch');
  assert.match(send, /beginSubmission\(\{ mode: 'queue', text, attachments: \[\] \}\)/);
  assert.match(send, /previous\?\.target === target && previous\?\.text === text \? previous\.requestId/);
  assert.match(clientSource(), /'aria-label': tr\('待发送任务（可编辑）'\)/);
});

test('embedded conversation lives in the dock and registers the native composer', () => {
  const source = clientSource();
  assert.match(source, /renderFactorySlot\('conversation\.content', \{ variant: 'embedded', phase, hero \}\)/);
  assert.match(source, /const hero = false/);
  assert.match(source, /const phase = settling \? 'settling' : hero \? 'hero' : 'active'/);
  assert.match(source, /h\(SessionProvider, \{ session: retained\.reference \}, renderSlot\('kp\.session-context', \{\}\)\)/);
  assert.match(source, /slots\.register\(\{ name: 'kp\.session-context' \}, ConversationOccurrence\)/);
  assert.match(source, /function ConversationOccurrence\(\{ useSession, useInput, inputActions, renderFactorySlot \}\)/);
  assert.match(source, /composerRegistry\.register\(sessionId/);
  assert.match(source, /h\(EmbeddedConversation, \{ key: session\.sessionId/);
});

test('session menu keeps explicit creation, DSH navigation, unlink and recovery', () => {
  const source = clientSource();
  assert.match(source, /setBindingsFailed\(true\)/);
  assert.match(source, /bindingsLoading \|\| bindingsFailed \|\| !!recovery/);
  assert.match(source, /重试加载会话/);
  const open = between(source, 'const openInDsh', '// ---------- filling tasks');
  assert.match(open, /this\.uiWorkspace\?\.openSession/);
  assert.match(source, /'在 DSH 中打开'/);
  assert.match(source, /'确认解除'/);
  assert.match(source, /api\('sessionBindingRecover'/);
});

test('writing sessions are per section, renamed on creation and refreshed when a turn settles', () => {
  const source = clientSource();
  assert.match(source, /const writingSlot = \(section\) => `writing@\$\{section\}`/);
  assert.match(source, /api\('sessionBindingList', \{ projectId: project, tabId: 'writing' \}\)/);
  assert.match(source, /if \(value\.created\) renameSession/);
  assert.match(source, /binding\.session\.rename\(sessionTitle\(slotId\)\)/);
  assert.match(source, /function useSessionActivity\(/);
  assert.match(source, /previous === true && now === false/);
  const settled = between(source, 'onSettledRef.current = async', '// ---------- editor, drafts and revisions');
  assert.match(settled, /reloadProject\(\)/);
  assert.match(settled, /setCanvasReload/);
  assert.match(settled, /phase: changed \? 'done' : 'waiting'/);
});

test('append-only writing writes need no modal dialog while overwrites keep an inline confirmation', () => {
  const source = clientSource();
  assert.doesNotMatch(between(source, 'const saveDraft = async', 'const discardDraft'), /window\.confirm/);
  assert.doesNotMatch(between(source, 'const createSection = async', 'const createPaper'), /window\.confirm/);
  assert.doesNotMatch(between(source, 'const saveStyle = async', 'const styleGroup'), /window\.confirm/);
  assert.match(source, /kind: 'overwrite'/);
  assert.match(source, /'继续，覆盖论证图'/);
  assert.match(source, /'确认重建派生索引'/);
});

test('drafts persist locally and revisions can be compared and restored append-only', () => {
  const source = clientSource();
  assert.match(source, /const draftStorageKey = \(library, project, section\) => `kp\.draft\.v1\.\$\{library\}\.\$\{project\}\.\$\{section\}`/);
  assert.match(source, /setRevisionNotice\(\{ revision: latest \}\)/);
  assert.match(source, /api\('revision', \{ slug: project, section, revision \}\)/);
  assert.match(source, /function paragraphDiff\(/);
  assert.match(between(source, 'const restoreRevision = async', 'const createArgumentGraph'), /expected: current\.latest \?\? null, confirmed: true/);
});

test('argument canvas stays inside the main column and reports dirty state', () => {
  const source = clientSource();
  assert.match(source, /function ArgumentCanvas\(\{ api, project, section, onClose, onDirtyChange, reloadToken = 0 \}\)/);
  assert.match(source, /h\('main', \{ className: 'kp-main' \}, exploreHome, content, canvas\)/);
  assert.match(source, /onDirtyChange: setGraphDirty/);
});

test('return action and UI persistence use namespaced local keys', () => {
  const source = clientSource();
  assert.match(source, /const UI_KEY = 'kp\.ui\.v1', INTENT_KEY = 'kp\.ui\.v1\.intent'/);
  assert.match(source, /requestLibrary\('private', 'sessionBindingLookup', \{ sessionId \}\)/);
  assert.match(source, /name: 'conversation\.session\.header\.actions', id: 'knowledge-palace-return'/);
  assert.match(source, /selectPanel\?\.\('knowledge-palace'\)/);
});

test('expand from the current paper carries the selected work id', () => {
  const source = clientSource();
  assert.match(source, /\/palace expand \$\{selectedWork\.id\}/);
  assert.match(source, /disabled: !selectedWork/);
});

test('plugin registration has its panel boundary and argument constants', () => {
  const source = fs.readFileSync(new URL('../client.js', import.meta.url), 'utf8');
  assert.match(source, /class PanelErrorBoundary/);
  assert.match(source, /const uid =/);
  assert.match(source, /const ARG_HEAD =/);
  assert.match(source, /const ARG_LINKS =/);
});

test('custom writing tasks are routed through palace write', () => {
  const source = fs.readFileSync(new URL('../client.js', import.meta.url), 'utf8');
  const card = source.slice(source.indexOf("const taskCard"), source.indexOf("const workflow ="));
  assert.match(card, /\/palace write \$\{project\}/);
  assert.match(card, /palace_route/);
  assert.match(card, /\$\{lp\('任务', 'Task'\)\}: \$\{text\}/);
});

test('prompts dispatched to the model follow the panel language', () => {
  const source = fs.readFileSync(new URL('../client.js', import.meta.url), 'utf8');
  assert.match(source, /const lp = \(zh, en\) => \(KP_LANG === 'en' \? en : zh\);/);
  assert.doesNotMatch(source, /(dispatch|onPrepare)\((['`])请/);
  assert.match(source, /Use KnowledgePalace to retrieve evidence and discuss: \$\{query\.trim\(\)\}/);
});

test('index rebuild confirms and sends confirmation', () => {
  const source = fs.readFileSync(new URL('../client.js', import.meta.url), 'utf8');
  assert.equal((source.match(/api\('rebuild', \{ confirmed: true \}\)/g) || []).length, 1);
  assert.doesNotMatch(source, /api\('rebuild'\)/);
});

test('writing workspace exposes the style picker and the staged pipeline', () => {
  const source = fs.readFileSync(new URL('../client.js', import.meta.url), 'utf8');
  assert.match(source, /api\('styles'\)/);
  assert.match(source, /api\('setStyle', \{ slug: project, profile: next, confirmed: true \}\)/);
  assert.match(source, /api\('graphSummary', \{ slug: project, section \}\)/);
  assert.match(source, /className: 'kp-stylebtn'/);
  assert.match(source, /style_profile/);
  assert.match(source, /① 分析这一节/);
  assert.match(source, /① 段落分析/);
  assert.match(source, /paragraphPrompt/);
  assert.match(source, /正文比图新/);
  assert.match(source, /写作会话只读取磁盘上的 rNNN/);
  assert.match(source, /② 按图取证/);
  assert.match(source, /③ 按图写/);
  assert.match(source, /④ 检查并保存/);
  assert.match(source, /const stage = graphStale \|\| !graphAvailable \|\| graphNodes === 0 \? 1/);
  assert.match(source, /enabled: graphAvailable && graphNodes > 0/);
  assert.match(source, /没有证据或标了/);
  assert.match(source, /按风格润色/);
  assert.match(source, /polishPrompt/);
  assert.doesNotMatch(source, /论文项目与章节/);
});

test('style refresh survives project metadata updates without losing the draft', () => {
  const source = fs.readFileSync(new URL('../client.js', import.meta.url), 'utf8');
  assert.match(source, /\[styleOverride, setStyleOverride\]/);
  assert.match(source, /styleOverride\?\.slug === project/);
  assert.match(source, /setStyleOverride\(\{ slug: project, profile: next \}\)/);
  assert.doesNotMatch(source, /api\('setStyle'[\s\S]{0,200}setDetail\(/);
});

test('browser style and graph-summary actions are available and validated', () => {
  const source = fs.readFileSync(new URL('../index.js', import.meta.url), 'utf8');
  assert.match(source, /'styles', 'setStyle', 'graphSummary'/);
  assert.match(source, /explicit style update confirmation required/);
  assert.match(source, /graph-summary/);
});

test('candidate search bounds inputs and only enables network explicitly', () => {
  const cached = candidateSearchArgs({ query: '-topic', limit: 10 });
  assert.deepEqual(cached.slice(-2), ['--', '-topic']);
  assert.ok(!cached.includes('--live'));
  assert.ok(candidateSearchArgs({ query: 'climate', live: true }).includes('--live'));
  assert.throws(() => candidateSearchArgs({ query: '', limit: 10 }));
  assert.throws(() => candidateSearchArgs({ query: 'x', limit: 31 }));
  assert.throws(() => candidateSearchArgs({ query: 'x', live: 'yes' }));
});

test('browser workspace writes require explicit confirmation', () => {
  for (const command of ['create', 'material', 'revise', 'replace', 'graph-save', 'graph-init']) {
    assert.throws(() => requireWorkspaceWriteConfirmation({ command }), /confirmation/);
    assert.doesNotThrow(() => requireWorkspaceWriteConfirmation({ command, confirmed: true }));
  }
  assert.throws(() => requireWorkspaceWriteConfirmation({ command: 'graph', written: true }), /confirmation/);
  assert.throws(() => requireWorkspaceWriteConfirmation({ command: 'graph', file: 'input.json' }), /confirmation/);
  assert.doesNotThrow(() => requireWorkspaceWriteConfirmation({ command: 'graph', native: true }));
});

test('decodeJson preserves semantic exit-one JSON', () => {
  assert.deepEqual(decodeJson('fixture', { code: 1, stdout: '{"errors":["x"]}', stderr: '' }), { errors: ['x'] });
});

test('decodeJson reports non-JSON process failures', () => {
  assert.throws(() => decodeJson('fixture', { code: 2, stdout: '', stderr: 'usage: bad input' }), /usage: bad input/);
});

test('runRaw reports cancellation even when terminated process resolves normally', async () => {
  const controller = new AbortController();
  const service = {
    resolveExecutable: async () => 'python',
    spawn: () => ({
      collected: { stdout: { readFrom: () => ({ text: '', lossy: false }) }, stderr: { readFrom: () => ({ text: '', lossy: false }) } },
      done: new Promise(resolve => { controller.signal.addEventListener('abort', () => resolve({ exitCode: 1 }), { once: true }); setImmediate(() => controller.abort()); }),
      terminate() {}, waitForExit: async () => true,
    }),
  };
  await assert.rejects(runRaw(service, 'python', [], { signal: controller.signal }), /cancelled/);
});

test('runRaw reports timeout when terminated process resolves normally', async () => {
  const service = {
    resolveExecutable: async () => 'python',
    spawn: spec => ({
      collected: { stdout: { readFrom: () => ({ text: '', lossy: false }) }, stderr: { readFrom: () => ({ text: '', lossy: false }) } },
      done: new Promise(resolve => spec.signal.addEventListener('abort', () => resolve({ exitCode: 1 }), { once: true })),
      terminate() {}, waitForExit: async () => true,
    }),
  };
  await assert.rejects(runRaw(service, 'python', [], { timeoutMs: 10 }), /timed out/);
});

test('runRaw uses DSH subprocess collection contract', async () => {
  const calls = [];
  const service = {
    async resolveExecutable(command) { calls.push(['resolve', command]); return `resolved:${command}`; },
    spawn(spec) {
      calls.push(['spawn', spec]);
      return {
        collected: {
          stdout: { readFrom: () => ({ text: '{"ok":true}', nextOffset: 11, lossy: false }) },
          stderr: { readFrom: () => ({ text: '', nextOffset: 0, lossy: false }) },
        },
        done: Promise.resolve({ exitCode: 0, signal: null }),
        terminate() {},
        waitForExit: async () => true,
      };
    },
  };
  const result = await runRaw(service, 'python', ['-V'], { timeoutMs: 1000 });
  assert.equal(result.stdout, '{"ok":true}');
  assert.equal(result.code, 0);
  assert.deepEqual(calls[0], ['resolve', 'python']);
  assert.equal(calls[1][1].argv[0], 'resolved:python');
  assert.equal(calls[1][1].env.PYTHONUTF8, '1');
});

test('runRaw rejects lossy collected output', async () => {
  const service = {
    async resolveExecutable(command) { return command; },
    spawn() { return { collected: { stdout: { readFrom: () => ({ text: 'tail', nextOffset: 99, lossy: true }) }, stderr: { readFrom: () => ({ text: '', nextOffset: 0, lossy: false }) } }, done: Promise.resolve({ exitCode: 0, signal: null }), terminate() {}, waitForExit: async () => true }; },
  };
  await assert.rejects(runRaw(service, 'python', [], { timeoutMs: 1000 }), /collection limit/);
});

test('serial preserves order and continues after rejection', async () => {
  const events = [];
  const first = serial(async () => { events.push('first'); throw new Error('expected'); });
  const second = serial(async () => { events.push('second'); return 2; });
  await assert.rejects(first, /expected/);
  assert.equal(await second, 2);
  assert.deepEqual(events, ['first', 'second']);
});

test('graph argv puts flags before guarded positional targets', () => {
  const args = graphArgs({ operation: 'get_content', node_id: '-claim:test', cursor: '-cursor' });
  assert.ok(args.some((arg) => arg.startsWith('--config=')));
  assert.ok(args.includes('--cursor=-cursor'));
  assert.deepEqual(args.slice(-3), ['--', 'get_content', '-claim:test']);
});

test('graph argv validates required inputs', () => {
  assert.throws(() => graphArgs({ operation: 'query_level', hierarchy_id: 'h' }), /integer level/);
  assert.throws(() => graphArgs({ operation: 'get_content' }), /node_id/);
});

test('network argv supplies bounded overview defaults and clamps requests', () => {
  const defaults = networkArgs({});
  assert.ok(defaults.includes('--max-nodes=500'));
  assert.ok(defaults.includes('--max-links=3000'));
  const bounded = networkArgs({ max_nodes: 50000, max_links: 1 });
  assert.ok(bounded.includes('--max-nodes=5000'));
  assert.ok(bounded.includes('--max-links=100'));
  const ceiling = networkArgs({ max_links: 999999 });
  assert.ok(ceiling.includes('--max-links=50000'));
});

test('search argv validates, bounds and guards the query', () => {
  assert.throws(() => searchArgs({ query: '  ' }), /query is required/);
  assert.throws(() => searchArgs({ query: 'x', limit: 1.5 }), /integer/);
  assert.ok(searchArgs({ query: 'x' }).includes('--limit=50'));
  const args = searchArgs({ query: ' -Node ', limit: 1000 });
  assert.ok(args.includes('--limit=100'));
  assert.deepEqual(args.slice(-2), ['--', '-Node']);
});

test('neighborhood argv validates and guards targets', () => {
  assert.throws(() => neighborhoodArgs({}), /node_id/);
  const args = neighborhoodArgs({ node_id: '-concept:test', max_nodes: 9999 });
  assert.ok(args.includes('--max-nodes=5000'));
  assert.deepEqual(args.slice(-2), ['--', '-concept:test']);
});

test('palace command parser keeps quoted arguments together', () => {
  assert.deepEqual(parseCommandLine('write "project alpha" introduction'), { command: 'write', args: ['project alpha', 'introduction'], text: 'project alpha introduction' });
  assert.deepEqual(parseCommandLine(''), { command: 'status', args: [], text: '' });
});

test('ledger normalizes complete replacement items', () => {
  assert.deepEqual(ledgerItems({ items: [{ id: ' paper-a ', status: 'doing', note: 'line one\nline two' }, { id: 'paper-b', status: 'done' }] }), [
    { id: 'paper-a', status: 'doing', note: 'line one line two' },
    { id: 'paper-b', status: 'done' },
  ]);
  assert.throws(() => ledgerItems({ items: [{ id: 'paper-c', status: 'unknown' }] }), /pending, doing, done, or failed/);
});

test('research argv guards dash-prefixed topics', () => {
  const args = researchArgs({ view: 'ask', topic: '-topic', alternatives: ['-other'], note: '-5 dB' });
  assert.ok(args.includes('--alternative=-other'));
  assert.ok(args.includes('--note=-5 dB'));
  assert.deepEqual(args.slice(-3), ['--', 'ask', '-topic']);
});

test('node question uses selection as retrieval seed, not evidence boundary', () => {
  const { prompt } = buildQuestionPrompt({
    question: 'How does this affect initiation predictability?',
    scope: { type: 'node', hierarchy_id: 'domain-concept-work', node_id: 'concept:cin' },
    claim_refs: ['claim:paper-a#C1'],
  });
  assert.match(prompt, /motivation and retrieval seed, not an evidence boundary/);
  assert.match(prompt, /parents, children, semantic relations, citations, Claims, gaps, and other works/);
  assert.match(prompt, /Do not limit the answer to the node content/);
  assert.match(prompt, /claim:paper-a#C1/);
});

test('live visualization restores citations and representative edges without mutating overview', () => {
  const overview = { snapshot: { snapshot_id: 's' }, nodes: [{ id: 'domain:a' }, { id: 'work:a' }, { id: 'work:b' }, { id: 'concept:c' }], links: [{ id: 'parent|domain:a|work:a', kind: 'parent', from: 'domain:a', to: 'work:a' }] };
  const full = { snapshot: { snapshot_id: 's' }, edges: [{ id: 'cites|work:a|work:b', kind: 'cites', from: 'work:a', to: 'work:b' }, { id: 'tag|work:b|concept:c', kind: 'tag:method', from: 'work:b', to: 'concept:c' }] };
  const graph = prepareVisualizationGraph(overview, full, 500);
  assert.equal(graph.links.length, 3); assert.equal(graph.representativeEdgesAdded, 1); assert.equal(overview.links.length, 1);
  assert.throws(() => prepareVisualizationGraph(overview, { ...full, snapshot: { snapshot_id: 'other' } }, 500), /snapshot changed/);
});

test('UI language toggle translates through tr/trf and persists the choice', () => {
  const source = clientSource();
  assert.match(source, /const LANG_KEY = 'kp\.lang'/);
  assert.match(source, /const tr = \(text\) => \(KP_LANG === 'en'/);
  assert.match(source, /function setLanguage\(lang\)/);
  assert.match(source, /onClick: \(\) => setLanguage\('en'\) \}, 'EN'\)/);
  assert.match(source, /type: 'palace-graph-lang', lang/);
  assert.match(source, /Please reply in English\./);
  const begin = source.indexOf('/*__KP_EN_BEGIN__*/const KP_EN = '), end = source.indexOf(';/*__KP_EN_END__*/');
  assert.ok(begin >= 0 && end > begin, 'dictionary markers present');
  const dictionary = JSON.parse(source.slice(begin + '/*__KP_EN_BEGIN__*/const KP_EN = '.length, end));
  const keys = [...source.matchAll(/\btr\('((?:[^'\\]|\\.)*)'\)/g)].map((match) => match[1].replace(/\\'/g, "'"));
  const missing = keys.filter((key) => /[\u3400-\u9fff]/.test(key) && !(key in dictionary));
  assert.deepEqual([...new Set(missing)], [], 'every tr() key has an English entry');
  for (const [key, value] of Object.entries(dictionary)) for (const slot of key.match(/\{\d+\}/g) || []) assert.ok(value.includes(slot), `${key} keeps ${slot}`);
});
test('bridges paging passes offset and axis and validates them', () => {
  const args = researchArgs({ view: 'bridges', topic: 'severe-convection', domain_b: 'ml-weather-forecasting', offset: 54, axis: 'pattern' });
  assert.ok(args.includes('--offset=54'));
  assert.ok(args.includes('--axis=pattern'));
  assert.deepEqual(args.slice(-2), ['bridges', 'severe-convection']);
  assert.throws(() => researchArgs({ view: 'bridges', topic: 'a', offset: -1 }), /offset/);
  assert.throws(() => researchArgs({ view: 'bridges', topic: 'a', axis: 'concept' }), /axis/);
});