import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../graph-visualization.html', import.meta.url), 'utf8');
const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)]
  .filter((match) => !/type="application\/json"/.test(match[0]))
  .map((match) => match[1])
  .join('\n');
const count = (needle) => html.split(needle).length - 1;

test('data placeholders stay present exactly once (index.js replaces only the first occurrence)', () => {
  for (const placeholder of ['__GRAPH_DATA__', '__FULL_DATA__', '__CITATION_DATA__']) {
    assert.equal(count(placeholder), 1, placeholder);
  }
});

test('parent focus bridge only accepts palace-graph-focus messages from the parent window', () => {
  const listener = scripts.match(/window\.addEventListener\('message',\s*(\w+)\s*=>\s*\{([\s\S]*?)\}\);/);
  assert.ok(listener, 'message listener exists');
  const [, eventName, body] = listener;
  assert.match(body, new RegExp(`${eventName}\\.source\\s*!==\\s*parent`));
  assert.match(body, /'palace-graph-focus'/);
  assert.match(body, /typeof msg\.id\s*!==\s*'string'/);
  assert.match(body, /focusIdPattern\.test\(msg\.id\)/);
  assert.match(body, /parent\.postMessage\(\{\s*type:\s*'palace-graph-focus-result',\s*id,\s*found\s*\}/);
  assert.ok(scripts.includes('focusIdPattern=/^[a-z][a-z0-9-]*:[^\\s]{1,300}$/i'), 'id pattern is the agreed one');
  const pattern = /^[a-z][a-z0-9-]*:[^\s]{1,300}$/i;
  assert.ok(pattern.test('work:alpha-2024'));
  assert.ok(!pattern.test('work: alpha'));
  assert.ok(!pattern.test('9work:x'));
});

test('focus reuses the click selection path and guards against re-select loops', () => {
  assert.match(scripts, /function applyFocus\(n\)\{[\s\S]*?details\(n\)[\s\S]*?focusOn\(selected\)\}/);
  assert.match(scripts, /if\(selected&&selected\.id===id\)\{pendingFocus=null;/);
  assert.match(scripts, /onKinds\.add\(n\.kind\)/);
});

test('select message keeps type and id and adds clipped label and kind', () => {
  const select = scripts.match(/parent\.postMessage\(\{type:'palace-graph-select',([^}]*)\}/);
  assert.ok(select, 'select message exists');
  assert.match(select[1], /^id:n\.id,/);
  assert.match(select[1], /label:Array\.from\(String\(n\.label\?\?''\)\)\.slice\(0,300\)\.join\(''\)/);
  assert.match(select[1], /kind:String\(n\.kind\?\?''\)/);
  assert.match(scripts, /type:'palace-graph-limit'/);
});

test('cites edges draw a filled knowledge-flow arrow whose tip is the citing (from) endpoint', () => {
  assert.match(scripts, /b:byId\.get\(e\.to\)/);
  assert.match(scripts, /a:byId\.get\(e\.from\)/);
  assert.match(scripts, /if\(e\.family==='cites'\)citeArrow\(b,a,e\.a,focus,w,h\)/);
  const arrow = scripts.match(/function citeArrow\(tail,tip,tipNode,focus,w,h\)\{([\s\S]*?)\n/);
  assert.ok(arrow, 'citeArrow exists');
  assert.match(arrow[1], /len>=14/);
  assert.match(arrow[1], /nodeRadius\(tipNode\)/);
  assert.match(arrow[1], /ctx\.fillStyle=ctx\.strokeStyle/);
  assert.match(arrow[1], /ctx\.fill\(\)/);
  assert.equal((scripts.match(/citeArrow\(/g) || []).length, 2, 'one definition and one call site');
});

const dictStart = html.indexOf('/*kp-i18n-dict*/');
const dictEnd = html.indexOf('/*kp-i18n-dict-end*/');
const dictionary = dictStart >= 0 && dictEnd > dictStart
  ? JSON.parse(html.slice(dictStart + '/*kp-i18n-dict*/'.length, dictEnd))
  : null;

test('language bridge only accepts palace-graph-lang en|zh messages from the parent window', () => {
  const listeners = [...scripts.matchAll(/window\.addEventListener\('message',\s*(\w+)\s*=>\s*\{([\s\S]*?)\}\);/g)];
  const lang = listeners.find((match) => match[2].includes("'palace-graph-lang'"));
  assert.ok(lang, 'lang listener exists');
  const [, eventName, body] = lang;
  assert.match(body, new RegExp(`${eventName}\\.source\\s*!==\\s*parent`));
  assert.match(body, /msg\.lang!=='en'&&msg\.lang!=='zh'/);
  assert.match(body, /kpSetLang\(msg\.lang\)/);
  assert.ok(listeners[0][2].includes("'palace-graph-focus'"), 'focus listener stays first and unchanged');
  assert.match(scripts, /let kpLang='zh'/, 'default language is the Chinese source text');
  assert.match(scripts, /new MutationObserver\(kpObserve\)/);
  assert.match(scripts, /observe\(document\.documentElement,\{childList:true,subtree:true,characterData:true\}\)/);
});

test('English dictionary covers every Chinese UI string in the page', () => {
  assert.ok(dictionary, 'dictionary block parses as JSON');
  for (const [zh, en] of [['强对流', 'Severe convection'], ['论文', 'Paper'], ['研究空白', 'Research gap'], ['布局计算中', 'Computing layout']]) {
    assert.equal(dictionary[zh], en);
  }
  const keys = Object.keys(dictionary).sort((a, b) => b.length - a.length);
  const re = new RegExp(keys.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g');
  const page = html.slice(0, dictStart) + html.slice(dictEnd);
  const segments = page.split(/[<>'"`{}$\n]/).filter((s) => /[\u3400-\u9fff]/.test(s));
  assert.ok(segments.length > 50);
  const missing = segments.filter((s) => /[\u3400-\u9fff]/.test(s.replace(re, '')));
  assert.deepEqual(missing, []);
});

test('legend explains the citation arrow direction', () => {
  const line = '引用箭头：被引论文 → 引用它的论文（知识流）';
  const start = html.indexOf('<aside class="legend-panel" id="legendPanel">');
  assert.ok(start >= 0, 'legend panel exists');
  const legendPanel = html.slice(start, html.indexOf('</aside>', start));
  assert.ok(legendPanel.includes(line), 'line is inside the legend panel');
  const outsideDictionary = html.slice(0, dictStart) + html.slice(dictEnd);
  assert.equal(outsideDictionary.split(line).length - 1, 1, 'shown once (the i18n dictionary key is not markup)');
});
