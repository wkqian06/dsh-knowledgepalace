window.__ModuleLoader__.load({
  id: 'dsh-knowledgepalace',
  factory(require) {
    const React = require('react');
    const { useEffect, useLayoutEffect, useMemo, useRef, useState } = React;
    const h = React.createElement;

    // UI language: Chinese source strings are the keys; KP_EN maps them to English.
    // Task prompts sent to agent sessions stay in their source language.
    const LANG_KEY = 'kp.lang';
    let KP_LANG = 'zh';
    try { KP_LANG = window.localStorage.getItem(LANG_KEY) === 'en' ? 'en' : 'zh'; } catch { /* storage unavailable */ }
    /*__KP_EN_BEGIN__*/const KP_EN = {" · 不可用":" · Unavailable"," · 受限概览":" · Limited overview"," · 运行中":" · Running"," 联网查询 OpenAlex（点击检索会发送主题；结果可能写入可重建的元数据缓存）。取消勾选则只查缓存。":" Query OpenAlex online (searching sends the topic; results may be written to a rebuildable metadata cache). Uncheck to search the cache only.","+ 章节":"+ Section","AGU 家族":"AGU family","AMS 家族":"AMS family","Claim 引文保留原文、条件与锚点；原文折叠在“查看原文”。":"Claim citations keep the original text, conditions, and anchors; the original is collapsed under “View original”.","Evidence / Claim 引用":"Evidence / Claim citations","Nature 系列":"Nature portfolio","brief 是 view，不是证据；点一张卡，任务会填入右侧研究会话的输入框，可修改后发送。":"A brief is a view, not evidence. Click a card to fill its task into the Research session composer on the right; edit it before sending.","expand：以 {0} 为根":"expand: rooted at {0}","{0} nodes · {1} parent links · 历史邻域并集":"{0} nodes · {1} parent links · union of history neighborhoods","{0} · {1} · 阅读深度：{2} · Claims 总数：{3}":"{0} · {1} · Reading depth: {2} · Total Claims: {3}","{0} · 尚未创建":"{0} · Not created yet","{0} · 最新":"{0} · Latest","{0} · 空闲":"{0} · Idle","{0} → 你的草稿":"{0} → Your draft","{0} → 当前草稿":"{0} → Current draft","{0} 个节点":"{0} nodes","{0} 个节点待补":"{0} nodes pending evidence","{0} 个节点未归属":"{0} nodes unassigned","{0} 个节点未标证据":"{0} nodes without evidence","{0} 关系":"{0} relations","{0} 分钟前":"{0} min ago","{0} 天前":"{0} days ago","{0} 小时前":"{0} hours ago","{0} 段 · {1} 论点 · {2} 关系":"{0} paragraphs · {1} points · {2} relations","{0} 段图已改":"Graph changed ({0} paragraphs)","{0} 的邻域受限：返回 {1}/{2} 个节点。":"Neighborhood of {0} is limited: returned {1}/{2} nodes.","{0} 节点":"{0} nodes","{0}会话":"{0} session","{0}知识宫殿 · {1} · {2}{3}":"{0}KnowledgePalace · {1} · {2}{3}","{0}（第一版）":"{0} (first version)","{0}；请记录会话 ID：{1}":"{0}; please note the session ID: {1}","← 后退":"← Back","⌘K 命令":"⌘K Commands","① 分析这一节":"① Analyze this section","① 段落分析":"① Paragraph analysis","② 按图取证":"② Gather evidence by graph","③ 按图写":"③ Write from graph","④ 检查并保存":"④ Check and save","「{0}」这一轮已结束，状态已自动刷新。":"The “{0}” round has finished; status refreshed automatically.","一个自包含离线 HTML":"A self-contained offline HTML file","下方输入框里已有未发送的内容。":"The composer below already has unsent content.","不可用：{0}":"Unavailable: {0}","不需要":"Not needed","与上一版相同。":"Same as the previous version.","与当前草稿对比":"Compare with current draft","丢弃":"Discard","两个版本内容相同。":"Both versions are identical.","两跳邻域超过安全上限：显示 {0}/{1} 个节点。":"Two-hop neighborhood exceeds the safety limit: showing {0}/{1} nodes.","中心节点 {0} 未能纳入，已达到节点上限。":"Center node {0} could not be included; node limit reached.","为每个节点挂 Claim；没有证据的节点在图上标「待补」，不编造。":"Attach Claims to each node; nodes without evidence are marked “pending evidence” on the graph, never fabricated.","仅处理前 {0}/{1} 个已勾选节点（中心节点上限 20）。":"Processing only the first {0}/{1} checked nodes (center node limit: 20).","仅显示勾选节点的父子与引用两跳并集":"Show only the union of hierarchy and citation two-hop neighborhoods of checked nodes","仍然继续":"Continue anyway","从当前论文往外找":"Search outward from the current paper","问题如何演进：进展、争议与剩余问题":"How the problem evolved: advances, disputes and open questions","从证据缺口生成可验证问题":"Generate testable questions from evidence gaps","从领域背景到 5 篇必读，按依赖排序":"From domain background to 5 must-reads, ordered by dependency","以此版本新建修订 {0}":"Create revision {0} from this version","任务已填入下方输入框：可以修改，确认后回车发送。":"Task filled into the composer below: edit it, then press Enter to send.","会以 /palace write 路由到写作流程，并填入右侧写作会话的输入框；新建项目或元数据任务也可在这里说明。":"Routed to the writing workflow via /palace write and filled into the Writing session composer on the right; you can also describe new-project or metadata tasks here.","会话 ID":"Session ID","会话 {0} 不可用：{1}":"Session {0} unavailable: {1}","会话不可用":"Session unavailable","会话不可用：{0}":"Session unavailable: {0}","会话保存了新修订 {0}，编辑器里还有你没保存的修改。":"The session saved a new revision {0}, and the editor still has your unsaved changes.","会话列表读取失败，任务没有填入。请点「重试加载会话」后再操作。":"Failed to load the session list; the task was not filled in. Click “Retry loading sessions” first.","会话列表读取失败：{0}。请重试，确认状态前不会新建会话。":"Failed to load the session list: {0}. Please retry; no new session will be created until the status is confirmed.","会话可能已更新论证图：保存或点「重新载入」后查看":"The session may have updated the argument graph: save or click “Reload” to view","会话已停下，但还没写入修订或论证图，可能在等你在右侧确认。":"The session has stopped but has not written a revision or argument graph yet; it may be waiting for your confirmation on the right.","会话已创建但绑定没有保存：{0}":"Session created, but the binding was not saved: {0}","会话已创建，但没能改名：{0}":"Session created, but renaming failed: {0}","会话操作":"Session actions","会话无法打开":"Session cannot be opened","会话没有就绪，任务没有填入。处理好会话后点「重新填入」。":"The session is not ready; the task was not filled in. Resolve the session, then click “Fill in again”.","会话输入框已关闭，任务放在这里，可修改后直接发送。":"The session composer is closed; the task is here—edit it and send directly.","会话输入框正在提交上一条消息，暂时不能编辑；任务放在这里，可修改后直接发送。":"The session composer is still submitting the previous message and cannot be edited; the task is here—edit it and send directly.","会话输入框没有在 8 秒内就绪；任务放在这里，可修改后直接发送。":"The session composer was not ready within 8 seconds; the task is here—edit it and send directly.","会话输入框没有接受这段任务；任务放在这里，可修改后直接发送。":"The session composer did not accept the task; the task is here—edit it and send directly.","会话运行中{0}":"Session running{0}","你的草稿 → {0}":"Your draft → {0}","保存中…":"Saving…","保存为新修订（追加 {0}）":"Save as new revision (append {0})","保存冲突：其他编辑已产生新修订。草稿仍保留在本机，可先「对比最新修订」再合并。\n{0}":"Save conflict: another edit created a new revision. Your draft is kept locally; use “Compare with latest revision” before merging.\n{0}","保存更改":"Save changes","保留原内容":"Keep original content","修订历史 · {0}":"Revision history · {0}","候选检索后确认身份、阅读深度与写入":"Search candidates, then confirm identity, reading depth, and write","健康":"Healthy","先保存再{0}":"Save first, then {0}","先做 ②":"Do ② first","先分析行文逻辑与语言风格，生成论证图；这一步不写正文。":"First analyze the reasoning flow and language style to build the argument graph; this step writes no prose.","先图后文；四步各自只做一件事":"Graph first, then text; each of the four steps does one thing","先在全局关系图、搜索或浏览历史中选中一个节点。":"First select a node in the Global graph, search, or Browsing history.","先在探索中选中一篇论文":"Select a paper in Explore first","先选择项目和章节":"Select a project and section first","先问，再读；证据留在手边。":"Ask first, then read; keep evidence at hand.","入门路线":"Getting started","全局关系图":"Global graph","共享概念与跨领域可追溯路径":"Shared concepts and traceable cross-domain paths","关系":"Relations","关系（点击后以该关系为范围提问）":"Relations (click to ask with that relation as scope)","关联此会话":"Link this session","关联空白":"Related research gaps","关闭":"Close","关闭对比":"Close comparison","其他写作任务":"Other writing tasks","写":"W","写作":"Writing","写作 · {0}":"Writing · {0}","写作以项目为单位；先在顶栏选择项目，或新建一个论文项目。":"Writing is organized by project; select a project in the top bar first, or create a new paper project.","写作流程":"Writing workflow","写作风格已改为「{0}」；只更新了 project.yaml 的 style_profile，正文没有改动。":"Writing style changed to “{0}”; only style_profile in project.yaml was updated, the text is unchanged.","分层提问":"Scoped question","分析记录 · 行文逻辑与语言风格":"Analysis notes · Reasoning flow and language style","刚刚":"Just now","创建":"Create","创建空白论证图":"Create blank argument graph","创建项目":"Create project","删除关系":"Delete relation","删除段落":"Delete paragraph","删除论点":"Delete point","刷新":"Refresh","刷新图状态":"Refresh graph status","刷新引用":"Refresh citations","前进 →":"Forward →","加宽":"Widen","加载证据失败：{0}":"Failed to load evidence: {0}","助手":"Assistant","助手 · 运行中":"Assistant · Running","勾选 {0}":"Check {0}","卡片：{0}":"Card: {0}","去探索选择":"Select in Explore","发送到会话":"Send to session","发送失败":"Send failed","发送未确认：{0}。可以重试（会沿用同一请求 ID，不会重复发送）。":"Send not confirmed: {0}. You can retry (the same request ID is reused, so it won't be sent twice).","取消":"Cancel","另有 {0} 个节点未载入。":"{0} more nodes not loaded.","只做这一步":"Run this step only","只更新标记过的 hub":"Update marked hubs only","只读检查优先；写入先给变更包，再确认。":"Read-only checks first; writes start with a change package, then confirmation.","合并结果的连接受限或端点未显示（至少 {0} 次省略；连接上限 3000）。":"Connections in the merged result are limited or have hidden endpoints (at least {0} omissions; connection limit 3000).","合并结果达到 500 节点上限，部分节点未显示（至少 {0} 次省略）。":"Merged result reached the 500-node limit; some nodes are hidden (at least {0} omissions).","命令":"Commands","命令面板":"Command palette","回到知识宫殿":"Back to KnowledgePalace","回到知识宫殿 · {0}":"Back to KnowledgePalace · {0}","回到知识宫殿中这个会话所属的功能":"Return to the KnowledgePalace function this session belongs to","图":"E","图 {0} 段 · {1} 节点":"Graph: {0} paragraphs · {1} nodes","图谱加载失败：{0}":"Failed to load graph: {0}","图谱页面为空":"Graph page is empty","在 DSH 中打开":"Open in DSH","在 DSH 主视图打开这个会话":"Open this session in the DSH main view","在全局关系图、搜索或研究结果里点一个节点，Claim、引文与锚点会进入这里。":"Click a node in the Global graph, search, or Research results; its Claims, citations, and anchors appear here.","在图中定位":"Locate in graph","在证据中打开":"Open in Evidence","填入写作会话":"Fill in Writing session","填入研究会话":"Fill in Research session","填写信息后点「创建项目」；已有项目不会被覆盖。":"Fill in the details and click “Create project”; existing projects will not be overwritten.","处理中…":"Processing…","子节点":"Children","子节点 · +1":"Children · +1","孙节点 · +2":"Grandchildren · +2","它引用的（来源） · -1":"Sources it cites · -1","定义、区分与常见混淆":"Definitions, distinctions, and common confusions","审计卡片":"Audit cards","对比":"Compare","对比最新修订":"Compare with latest revision","导出 Obsidian Wiki":"Export Obsidian Wiki","导出只读 Viewer":"Export read-only Viewer","尚无会话":"No sessions yet","尚无修订":"No revisions yet","层级":"Hierarchy","层级与历史 · 全库搜索":"Hierarchy & history · Library-wide search","层级与历史 · 搜索":"Hierarchy & history · Search","层级两跳（父子关系）":"Two-hop hierarchy (parent–child)","层级用于确定提问范围；选中节点所在的层会自动识别。":"The hierarchy sets the question scope; the level of the selected node is detected automatically.","层级结构":"Hierarchy structure","已保存":"Saved","已保存为 {0}（追加式修订，旧版本保留）":"Saved as {0} (append-only revision; older versions are kept)","已保留输入框原内容；新任务放在这里，可修改后直接发送。":"Kept the composer's existing content; the new task is here—edit it and send directly.","已创建论文项目 {0}":"Created paper project {0}","已勾选 {0} 个节点，结果显示在「父子两跳」。":"{0} nodes checked; results are shown in “Two-hop hierarchy”.","已在库：{0}":"Already in library: {0}","已把「{0}」填入右侧输入框，可以修改，回车发送。":"Filled “{0}” into the composer on the right; edit it and press Enter to send.","已用 {0} 的内容新建修订 {1}":"Created revision {1} from the content of {0}","已载入最新修订，你刚才的草稿还留着。":"Latest revision loaded; your previous draft is still kept.","已选：{0}":"Selected: {0}","年份未知":"Year unknown","库状态与索引":"Library status & index","应用风格":"Apply style","开始对话":"Start conversation","引用两跳（知识流：来源 → 本文 → 后续工作）":"Two-hop citations (knowledge flow: sources → this paper → follow-up work)","引用它的 · +1":"Citing it · +1","引用它的论文又被谁引用 · +2":"Works citing those · +2","引用格式":"Citation style","当前 DSH 版本不支持直接跳转会话；请从左侧会话列表打开。":"This DSH version does not support jumping to sessions directly; open it from the session list on the left.","当前会话不可用（{0}）。可在右侧「…」里新建会话或解除关联。":"Current session unavailable ({0}). Use “…” on the right to create a new session or unlink it.","当前版本不支持内嵌原生会话。":"This version does not support embedded native sessions.","当前节点 · 0":"Current node · 0","当前选择用于确定问题动机和检索起点，不限制回答的证据范围；会话会继续扩展到父子节点、关系、引用、Claims 与其他工作。":"The current selection sets the question's motivation and search starting point, without limiting the answer's evidence scope; the session will continue into parent and child nodes, relations, citations, Claims, and other work.","待发送任务（可编辑）":"Pending task (editable)","待复核":"Awaiting review","待审更新":"Updates awaiting review","待恢复的会话 ID":"Session ID to restore","恢复刚才的草稿":"Restore previous draft","恢复草稿":"Restore draft","或继续使用项目级写作会话：":"Or continue with the project-level writing session:","打开会话失败：{0}":"Failed to open session: {0}","打开全局关系图":"Open Global graph","打开卡片":"Open card","打开论文项目":"Open paper project","打开论证图画布":"Open argument graph canvas","扩展知识库的两个入口":"Two ways to expand the library","找到 {0} 个节点{1}":"Found {0} nodes{1}","把它们拖进某个段落":"Drag them into a paragraph","把导入任务填入研究会话":"Fill import task into Research session","拖到另一张卡片以建立关系":"Drag onto another card to create a relation","拖动调整宽度；双击恢复默认宽度":"Drag to resize; double-click to reset width","按会话 ID 恢复关联":"Restore link by session ID","按自然段拆解已有正文，重建论证图；不改正文。":"Split existing text by paragraph and rebuild the argument graph; the text is unchanged.","按风格润色":"Polish by style","探索":"Explore","描述写作任务…":"Describe the writing task…","提问":"Ask","提问范围":"Question scope","搜索命令":"Search commands","搜索命令、brief 或维护动作…":"Search commands, briefs, or maintenance actions…","搜索失败：{0}":"Search failed: {0}","搜索整个知识库的节点":"Search nodes across the library","搜索整个索引，不受全局概览的节点上限限制；选择结果后可手动切换到父子两跳。":"Searches the entire index, not limited by the global overview's node cap; after selecting a result, you can switch to Two-hop hierarchy manually.","搜索整个索引；浏览历史与两跳并集":"Search the entire index; Browsing history and two-hop union","搜索知识库节点":"Search library nodes","收文献":"Collect papers","收文献 / 导入":"Collect papers / Import","收起":"Collapse","收起右栏":"Collapse right panel","收起层级与历史":"Collapse hierarchy & history","改名失败":"Rename failed","放弃草稿":"Discard draft","文献候选检索":"Paper candidate search","新建会话":"New session","新建论文项目":"New paper project","新建项目":"New project","新章节标识":"New section id","新章节标识，如 introduction":"New section id, e.g. introduction","无":"none","无标题":"Untitled","无论证图":"No argument graph","无证据引用":"No evidence cited","显式联网；先落缓存与提案":"Explicit network use; cache and proposals first","显示有界检索上下文而非最终结论；证据应保留原始 Claim ID、引文与锚点。索引过期时可能先更新派生索引。":"Shows bounded retrieval context, not a final conclusion; evidence keeps the original Claim IDs, quotes and anchors. A stale index may be refreshed first.","替换为新任务":"Replace with new task","最后一遍只改表达，不改科学内容；用于 ④ 之后。":"Final pass changes wording only, never the science; use after ④.","最新 {0}":"Latest {0}","最新修订 {0}":"Latest revision {0}","有修订且证据挂齐":"Has revisions and full evidence","有未保存修改（已暂存在本机）。写作会话只读取磁盘上的 rNNN；点下一步时会先保存为新修订。":"Unsaved changes (kept on this device). Writing sessions read only rNNN on disk; the next step saves a new revision first.","有界检索：候选、Claim、缺口":"Bounded retrieval: candidates, Claims, gaps","有节点待补证据":"Some nodes await evidence","期刊":"Journal","期刊或会议（可选）":"Journal or venue (optional)","未保存":"Unsaved","未匹配到库内记录":"No match in the library","未归属":"Unassigned","未归属论点":"Unassigned points","未知":"unknown","未记录":"not recorded","未选择时按通用学术散文写。":"Without a selection, writing uses general academic prose.","本地没有此检索的缓存；可勾选联网查询后重试。":"No local cache for this search; enable online lookup and retry.","本机有一份基于 {0} 的未保存草稿，磁盘最新为 {1}。":"This device has an unsaved draft based on {0}; the latest on disk is {1}.","条件 · {0}":"Conditions · {0}","来源未知":"Unknown source","来源的来源 · -2":"Sources of sources · -2","来自库 styles/profiles；应用后只改 project.yaml 的 style_profile。增删改在 ⌘K 的「注册领域 / 风格库」。":"From the library's styles/profiles; applying changes only style_profile in project.yaml. Add or edit profiles via ⌘K → \"Domains / style library\".","查找文献候选":"Find paper candidates","查看原文":"View source text","查看完整检索上下文（含关系、缺口和未读依赖）":"View full retrieval context (relations, gaps, unread dependencies)","查看差异":"View diff","查看更新":"View updates","查看状态详情和缺失来源":"View status details and missing sources","标签：{0}":"Tags: {0}","检查库状态":"Check library status","检索中…":"Searching…","检索候选":"Search candidates","检索只返回元数据候选，不代表已获取全文或完成入库；采用后仍需在会话中确认身份、阅读深度和写入。":"Search returns metadata candidates only; it does not fetch full text or import. Identity, reading depth and writes are confirmed in the session.","检索知识库证据":"Search library evidence","检索证据":"Search evidence","概念地图":"Concept map","概念晋升、别名、领域分区提案":"Concept promotion, aliases, domain partition proposals","正在加载两跳邻域…":"Loading two-hop neighborhood…","正在加载历史节点邻域…":"Loading neighborhoods of history nodes…","正在加载实时图谱及引用缓存…":"Loading live graph and citation cache…","正在打开会话…":"Opening session…","正在搜索…":"Searching…","正在读取会话…":"Reading sessions…","正在载入卡片…":"Loading card…","正文":"Text","正文 {0} 段":"Text: {0} paragraphs","正文修订比论证图新：论证图可能已过期，建议重新做段落分析或在画布中核对。":"The text revision is newer than the argument graph; the graph may be outdated. Re-run paragraph analysis or check it in the canvas.","正文已保存":"Text saved","正文比图新":"Text newer than graph","正文比图新 · 建议段落分析":"Text newer than graph · run paragraph analysis","段 {0}":"¶ {0}","段 {0} {1}":"¶ {0} {1}","段落分析会用正文重建论证图，覆盖 outline/graph-{0}.html 的现有论点与关系；正文不变。":"Paragraph analysis rebuilds the argument graph from the text and overwrites the points and relations in outline/graph-{0}.html; the text is unchanged.","段落要点":"Paragraph point","段落顺序已改":"Paragraph order changed","每段一个节点，只用节点上已挂的 Claim；写作规则 1–16。":"One node per paragraph, using only the Claims attached to it; writing rules 1–16.","没有候选结果；缓存模式下可能是缓存未命中。":"No candidates; in cache-only mode this may be a cache miss.","没有匹配的命令。试试「空白」「速览」或「导出」。":"No matching commands. Try \"gap\", \"brief\" or \"export\".","没有匹配的节点。":"No matching nodes.","没有取到这篇论文的引用两跳。":"No citation two-hop data for this paper.","没有节点。":"No nodes.","没能写入会话输入框（{0}）；任务放在这里，可修改后直接发送。":"Could not write to the session composer ({0}); the task is here — edit it and send directly.","注册领域 / 风格库":"Domains / style library","浏览历史":"Browsing history","浏览路径":"Browsing path","清空":"Clear","清空全部浏览历史（包括第 1 条），保留当前选中的节点":"Clear all browsing history (including item 1); keep the current selection","清除":"Clear","满意版星图：领域、论文、空白与引用":"Preferred star map: domains, papers, gaps and citations","演示库 · ":"Demo library · ","演示库（干旱文献）":"Demo library (drought papers)","演示库：引用前请核对卡片与来源":"Demo library: verify cards and sources before citing","点击后任务会填入右侧本章节会话的输入框；可以修改，确认后回车发送。":"Clicking fills the task into this section's session composer on the right; edit it, then press Enter to send.","点节点在右侧看证据；选中节点不会自动切换视图":"Click a node to see evidence on the right; selecting a node does not switch views","父子两跳":"Two-hop hierarchy","父节点 / 可选入口":"Parents / entry points","父节点 · -1":"Parents · -1","状态、审计与治理提案是只读的；重建索引只更新派生状态。":"Status, audit and governance proposals are read-only; rebuilding the index only updates derived state.","状态检查只读取知识库。重建仅更新可重建索引，不更改文献卡片。":"Status checks only read the library. Rebuild only updates the rebuildable index, never paper cards.","独立审阅；逐条规则报告；最多两轮修订，保存为新的 rNNN。":"Independent review; rule-by-rule report; at most two revision rounds, saved as a new rNNN.","生成提问并填入会话":"Generate question and fill in","目标读者":"Target audience","看会话":"View session","知识宫殿":"KnowledgePalace","知识宫殿主导航":"KnowledgePalace navigation","知识宫殿全局关系图":"KnowledgePalace global graph","知识宫殿渲染失败":"KnowledgePalace failed to render","知识库":"Library","知识库状态与派生索引":"Library status and derived index","知识库（未绑定项目）":"Library (no project)","知道了":"Got it","研究":"Research","研究主题或论文标题":"Research topic or paper title","研究问题或主题":"Research question or topic","确认解除":"Confirm unlink","确认重建派生索引":"Confirm index rebuild","磁盘 {0} → 本机草稿":"Disk {0} → local draft","祖父母 · -2":"Grandparents · -2","私人知识库":"Private library","空白":"blank","空闲":"Idle","章节":"Section","章节、修订与论证图":"Sections, revisions and argument graphs","章节标识须为英文小写字母、数字和短横线。":"Section ids use lowercase letters, digits and hyphens.","章节正文编辑器":"Section text editor","章节论证图":"Section argument graph","索引：{0} · 文献：{1} · Claims：{2} · 缺失来源：{3} · 未解析引用：{4}":"Index: {0} · Papers: {1} · Claims: {2} · Missing sources: {3} · Unresolved refs: {4}","继续，覆盖论证图":"Continue and overwrite graph","维":"M","维护":"Maintain","维护原则":"Maintenance principles","编辑":"Edit","缺哪条曲线、在什么条件下":"Which curve is missing, under which conditions","节点":"Node","范围":"Scope","覆盖：{0} · 候选文献：{1} · 未读依赖：{2}":"Coverage: {0} · Candidate papers: {1} · Unread dependencies: {2}","解除关联":"Unlink","解除当前功能与会话 {0} 的关联？原会话不会被删除。":"Unlink this function from session {0}? The session itself is not deleted.","计数、索引新鲜度、缺失来源":"Counts, index freshness, missing sources","让助手检查":"Ask the assistant to check","论点":"Point","论点短语":"Point phrase","论证图有改动":"Argument graph changed","论证图有未保存修改，关闭将丢弃。继续吗？":"The argument graph has unsaved changes that will be discarded on close. Continue?","论证图有未保存修改，切换工作区将丢弃这些修改。继续吗？":"The argument graph has unsaved changes that will be discarded when switching workspaces. Continue?","论证图有未保存修改，切换知识库将丢弃这些修改。继续吗？":"The argument graph has unsaved changes that will be discarded when switching libraries. Continue?","论证图有未保存修改，切换章节将丢弃这些修改。继续吗？":"The argument graph has unsaved changes that will be discarded when switching sections. Continue?","论证图有未保存修改，切换项目将丢弃这些修改。继续吗？":"The argument graph has unsaved changes that will be discarded when switching projects. Continue?","论证图未生成":"No argument graph yet","论证图画布 · {0} / {1}":"Argument graph canvas · {0} / {1}","论证图画布会盖住正文区域，右侧会话仍然可见；段落、论点与关系属于这一节。":"The canvas covers the text area; the session on the right stays visible. Paragraphs, points and relations belong to this section.","论证图还有 {0} 个节点没有证据或标了「待补」，继续按图写会把它们写成没有引用的断言。":"{0} nodes in the argument graph have no evidence or are marked pending; writing from the graph now would state them without citations.","证据":"Evidence","证据 {0}":"Evidence {0}","证据与助手":"Evidence & assistant","证据依赖变化时，判断会重新打开；保留、修订、撤回都需要写理由。":"When evidence dependencies change, judgments reopen; retain, revise or withdraw each need a reason.","证据变化后需要复核的判断":"Judgments to re-check after evidence changes","证据在这里展开":"Evidence opens here","证据已挂齐":"All evidence attached","证据检索问题":"Evidence search question","证据空白":"Evidence gaps","该列节点已被过滤。":"Nodes in this column are filtered out.","该节点不在当前加载的图中{0}，可切到「父子两跳」查看。":"This node is not in the loaded graph{0}; switch to \"Two-hop hierarchy\" to see it.","该项目还没有章节。用「+ 章节」创建一个，再开始 ① 分析。":"This project has no sections yet. Create one with \"+ Section\", then start ① analysis.","语言":"Language","请勾选上面的历史节点。":"Tick history nodes above.","请在「层级与历史」里勾选历史节点。":"Tick history nodes in \"Hierarchy & history\".","请填写英文小写短横线项目标识、目标读者和引用格式。":"Fill in a lowercase-hyphen project id, target audience and citation style.","读取会话…":"Reading sessions…","读取论证图…":"Loading argument graph…","读取修订…":"Reading revision…","读取风格库…":"Reading style library…","读者 {0}":"Audience {0}","载入 {0}":"Load {0}","载入于 {0}":"Loaded at {0}","输入节点名称、别名或 ID…":"Node name, alias or ID…","输入问题，例如：这类方法在什么条件下失效？":"Ask a question, e.g. under which conditions does this method fail?","过滤当前两跳节点…":"Filter two-hop nodes…","运行中":"Running","运行治理":"Run governance","还原宽度":"Reset width","还没有论点。用右上角「＋论点」创建第一个；拖动卡片左右移动会改变它在段落里的顺序，拖到别的段落区域会改归属，从卡片右侧圆点拖到另一张卡片即可建立关系。":"No points yet. Use \"+ Point\" at top right to create one; drag a card left or right to reorder it within a paragraph, drag it to another paragraph to move it, and drag from a card's right dot to another card to link them.","还没有论证图。点 ① 分析让写作会话生成，或先创建一个空白页面手动搭图。":"No argument graph yet. Run ① analysis to let the writing session build it, or create a blank page and build it by hand.","这个功能还没有会话。点下面的按钮创建；之后各个按钮的任务都会填进这里的输入框。":"This function has no session yet. Create one below; tasks from the buttons will then be filled into its composer.","这个章节还没有写作会话；点下一步会自动创建，并把任务填进右侧输入框。":"This section has no writing session yet; the next step creates one and fills the task into the composer on the right.","追加到后面":"Append to existing","追加式修订，旧版本保留 · {0}/1048576 字节":"Append-only revisions; old versions kept · {0}/1048576 bytes","追加时原内容会变成纯文本，里面的引用标签会转成普通文字。":"Appending turns the existing text into plain text; reference chips in it become plain words.","选择会话…":"Choose session…","选择功能会话":"Choose function session","选择层级结构":"Choose hierarchy","选择左侧修订，查看它与上一版的差异。":"Choose a revision on the left to see its diff against the previous one.","选择知识库":"Choose library","选择节点后会记在这里；历史只是浏览顺序，不代表祖先路径。":"Selected nodes are recorded here; history is browsing order, not an ancestor path.","选择项目":"Choose project","选择风格":"Choose style","选题候选":"Topic ideas","通用学术":"General academic","速览 · 8 种":"Briefs · 8 kinds","速览：{0}":"Brief: {0}","邻域加载失败：{0}":"Neighborhood failed to load: {0}","重建会更新派生图谱索引（不修改文献卡片），完成后探索页会重新载入。":"Rebuild updates the derived graph index (paper cards untouched); Explore reloads afterwards.","重建派生索引":"Rebuild derived index","重新填入":"Fill in again","重新载入":"Reload","重新载入会丢弃未保存修改，继续吗？":"Reloading discards unsaved changes. Continue?","重试":"Retry","重试加载会话":"Retry loading sessions","重试打开会话":"Retry opening session","锚点、孤儿标签、证据边界":"Anchors, orphan tags, evidence boundaries","锚点：{0}":"Anchor: {0}","问":"R","问一个问题":"Ask a question","问助手":"Ask assistant","问题、决策、约束与观察":"Questions, decisions, constraints and observations","问题进展":"Problem progress","页面更新于 {0} · {1} 段 · {2} 论点 · {3} 关系":"Page updated {0} · {1} paragraphs · {2} points · {3} relations","项目元数据载入中…":"Loading project metadata…","项目字段不能包含换行。":"Project fields cannot contain line breaks.","项目标识（英文小写与短横线）":"Project id (lowercase and hyphens)","项目研究笔记":"Project research notes","项目级会话 {0} · {1}":"Project session {0} · {1}","项目级写作会话（旧）":"Project writing session (legacy)","领域桥接":"Domain bridges","风格":"Style","风格已更新：建议重跑 ① 的分析规则，或至少重跑 ④ 的检查。":"Style updated: re-run the rules in ① analysis, or at least the ④ check.","风格库没有档案。可在维护会话里创建 profile。":"The style library has no profiles. Create one in a maintenance session.","高亮已显示的节点…":"Highlight shown nodes…","（{0} 个节点）":" ({0} nodes)","（空论点）":"(empty point)","＋段落":"+ Paragraph","＋论点":"+ Point","，显示前 {0} 个；请输入更具体的关键词":"; showing the first {0} — try a more specific query"};/*__KP_EN_END__*/
    // Prompts sent to the model follow the panel language; UI strings go through tr().
    const lp = (zh, en) => (KP_LANG === 'en' ? en : zh);
    const tr = (text) => (KP_LANG === 'en' && Object.prototype.hasOwnProperty.call(KP_EN, text) ? KP_EN[text] : text);
    const trf = (template, values) => tr(template).replace(/\{(\d+)\}/g, (_, index) => String(values[Number(index)] ?? ''));
    const langListeners = new Set();
    function setLanguage(lang) {
      KP_LANG = lang === 'en' ? 'en' : 'zh';
      try { window.localStorage.setItem(LANG_KEY, KP_LANG); } catch { /* storage unavailable */ }
      for (const listener of [...langListeners]) listener(KP_LANG);
    }
    function useLanguage() {
      const [lang, setLang] = useState(KP_LANG);
      useEffect(() => { langListeners.add(setLang); return () => { langListeners.delete(setLang); }; }, []);
      return lang;
    }

    const CSS = `
      .kp-root{height:100%;display:flex;flex-direction:column;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);font:13px/1.45 system-ui,sans-serif}.kp-head{display:flex;align-items:center;gap:12px;padding:12px 16px;border-bottom:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1)}.kp-head strong{font-size:16px}.kp-head span{color:var(--dsw-alias-label-secondary)}.kp-head .grow{flex:1}.kp-grid{display:grid;grid-template-columns:minmax(210px,24%) minmax(380px,1fr) minmax(280px,32%);min-height:0;flex:1}.kp-pane{min-width:0;overflow:auto;border-right:1px solid var(--dsw-alias-border-l1);padding:14px}.kp-pane:last-child{border-right:0}.kp-card{background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);border-radius:10px;padding:12px;margin-bottom:10px}.kp-row{display:flex;gap:8px;align-items:center;flex-wrap:wrap}.kp-button,.kp-select,.kp-input,.kp-textarea{border:1px solid var(--dsw-alias-border-l2);border-radius:7px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);padding:7px 9px}.kp-button{cursor:pointer}.kp-button.primary{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);border-color:var(--dsw-alias-brand-primary);box-shadow:inset 0 0 0 1px var(--dsw-alias-brand-primary)}.kp-button.active{outline:2px solid var(--dsw-alias-brand-primary)}.kp-button:disabled{opacity:1;cursor:default;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-2);border-color:var(--dsw-alias-border-l1);box-shadow:none}.kp-select,.kp-input{max-width:100%}.kp-input{flex:1;min-width:100px}.kp-textarea{box-sizing:border-box;width:100%;min-height:90px;resize:vertical}.kp-level{margin:12px 0}.kp-level h3{margin:0 0 6px;color:var(--dsw-alias-label-secondary);font-size:12px}.kp-nodes{display:flex;gap:7px;overflow:auto;padding-bottom:5px}.kp-node{flex:0 0 150px;text-align:left}.kp-pill{display:inline-block;border:1px solid var(--dsw-alias-border-l2);border-radius:99px;padding:2px 7px;color:var(--dsw-alias-label-secondary)}.kp-title{font-weight:650;overflow:hidden;text-overflow:ellipsis}.kp-muted{color:var(--dsw-alias-label-secondary)}.kp-error{color:var(--dsw-alias-state-error-primary);white-space:pre-wrap}.kp-content{white-space:pre-wrap;max-height:44vh;overflow:auto}.kp-path{display:block;width:100%;margin-top:6px;text-align:left}.kp-edge{display:block;width:100%;margin-top:6px;text-align:left}.kp-status{display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--dsw-alias-state-success-primary)}.kp-network{position:relative;height:calc(100% - 44px);min-height:420px;border:1px solid var(--dsw-alias-border-l1);border-radius:10px;overflow:hidden;background:var(--dsw-alias-bg-layer-1)}.kp-network canvas{display:block;width:100%;height:100%;cursor:grab}.kp-network canvas.dragging{cursor:grabbing}.kp-nettools{position:absolute;left:10px;top:10px;right:10px;display:flex;gap:6px;align-items:center;flex-wrap:wrap;z-index:2;pointer-events:none}.kp-nettools>*{pointer-events:auto}.kp-chip{border:0;border-radius:99px;color:#fff;padding:4px 8px;cursor:pointer;font-size:11px}.kp-chip.off{opacity:.28}.kp-netmeta{position:absolute;left:10px;bottom:8px;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-1);padding:3px 7px;border-radius:6px}.kp-tabs{display:flex;gap:6px;margin-bottom:10px}
      .kp-graph-layout{position:relative;display:flex;flex:1;min-height:0;overflow:hidden}.kp-graph-layout>.kp-graph-main{flex:1;min-width:0;border:0}.kp-graph-layout>.kp-graph-side{position:absolute;z-index:5;top:0;bottom:0;width:min(360px,85%);background:var(--dsw-alias-bg-base);box-shadow:0 4px 20px #0005}.kp-graph-layout>.kp-graph-side.left{left:0}.kp-graph-layout>.kp-graph-side.right{right:0}.kp-graph-layout>.kp-graph-side.closed{display:none}.kp-graph-tools{display:flex;gap:8px;align-items:center;flex-wrap:wrap;padding:6px 14px}
      .kp-visual-shell{height:calc(100vh - 200px);min-height:500px}.kp-graph-extras{padding:14px;display:grid;gap:8px}.kp-graph-extras>details{border:1px solid var(--dsw-alias-border-l1);border-radius:8px;padding:10px}.kp-graph-extras summary{cursor:pointer;font-weight:600}
      .kp-arg{min-width:720px}.kp-argpreview{display:block;width:100%;border-radius:10px;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);margin:8px 0 12px}.kp-argbar{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:10px}.kp-paragraph{position:relative}.kp-paragraph.changed{border-color:var(--dsw-alias-state-warn-primary)}.kp-argnodes{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:8px;margin-top:8px}.kp-argnode{border:1px solid var(--dsw-alias-border-l2);border-radius:8px;padding:8px;background:var(--dsw-alias-bg-layer-2)}.kp-argnode textarea{min-height:54px}.kp-argedges{display:grid;gap:6px}.kp-argedge{display:grid;grid-template-columns:1fr auto 1fr auto;gap:6px;align-items:center}.kp-local{min-width:900px}.kp-localstage{position:relative}.kp-tree-edges{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none;z-index:1}.kp-tree-edges path{fill:none;stroke:var(--dsw-alias-border-l2);stroke-width:1.5}.kp-columns{position:relative;z-index:2}.kp-localtools{display:flex;align-items:center;gap:7px;margin-bottom:10px;flex-wrap:wrap}.kp-columns{display:grid;grid-template-columns:repeat(5,minmax(160px,1fr));gap:10px;align-items:start}.kp-column{min-width:0;border:1px solid var(--dsw-alias-border-l1);border-radius:10px;background:var(--dsw-alias-bg-layer-1);padding:8px}.kp-column>h3{margin:0 0 8px;font-size:12px;color:var(--dsw-alias-label-secondary)}.kp-kind{margin:8px 0}.kp-kindhead{display:flex;align-items:center;gap:6px;font-size:11px;color:var(--dsw-alias-label-secondary);margin-bottom:5px}.kp-dot{width:8px;height:8px;border-radius:50%;display:inline-block}.kp-localnode{display:block;width:100%;text-align:left;margin:4px 0;white-space:normal}.kp-localnode small{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.kp-warning{color:var(--dsw-alias-state-warn-primary)}
    `;

    const SHELL_CSS = `
.kp-shell{position:relative;height:100%;display:flex;min-height:0;overflow:hidden;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);font:13px/1.5 system-ui,sans-serif}
.kp-rail{width:76px;flex:none;border-right:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);display:flex;flex-direction:column;align-items:stretch;padding:14px 8px;gap:4px;z-index:4}
.kp-rail-brand{display:flex;align-items:center;justify-content:center;gap:6px;height:34px;margin-bottom:10px;color:var(--dsw-alias-brand-primary)}
.kp-rail-brand span{font:600 10px/1 ui-monospace,monospace;letter-spacing:.06em;color:var(--dsw-alias-label-secondary)}
.kp-rail-btn{height:50px;border-radius:9px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;color:var(--dsw-alias-label-secondary);border:1px solid transparent}
.kp-rail-btn:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
.kp-rail-btn.active{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);border-color:var(--dsw-alias-border-l1)}
.kp-rail-glyph{font:600 16px/1 Georgia,serif}
.kp-rail-btn small{font-size:10px;letter-spacing:.04em}
.kp-rail-spacer{flex:1}
.kp-frame{flex:1;min-width:0;display:flex;flex-direction:column;min-height:0}
.kp-topbar{height:56px;flex:none;display:flex;align-items:center;gap:8px;padding:0 14px;border-bottom:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1)}
.kp-brand{display:flex;align-items:center;gap:8px;min-width:0;margin-right:4px}
.kp-brand strong{font:500 16px/1.2 Georgia,"Songti SC",serif;white-space:nowrap}
.kp-brand span{font-size:10px;color:var(--dsw-alias-label-secondary);white-space:nowrap}
.kp-topbar .grow{flex:1}
.kp-topbar .kp-select{max-width:170px}
.kp-iconbtn{height:30px;border-radius:7px;padding:0 9px;display:inline-flex;align-items:center;gap:5px;color:var(--dsw-alias-label-secondary);border:1px solid transparent;font-size:11.5px}
.kp-iconbtn:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
.kp-body{flex:1 1 0;min-height:0;display:grid;grid-template-columns:minmax(0,1fr) auto;position:relative;overflow:hidden}
.kp-main{min-width:0;min-height:0;position:relative;overflow:hidden;display:flex;flex-direction:column}
.kp-home{flex:1;min-height:0;height:auto;overflow:auto;padding:20px 24px 40px}
.kp-explore-home{flex:1;min-height:0;padding:0;overflow:hidden;display:flex;flex-direction:column}
.kp-home-head{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;margin-bottom:16px;flex-wrap:wrap}
.kp-home h1{font:500 26px/1.15 Georgia,"Songti SC",serif;margin:0 0 4px;letter-spacing:-.01em}
.kp-home .kp-lede{color:var(--dsw-alias-label-secondary);font-size:12px;margin:0}
.kp-subtabs{display:inline-flex;gap:2px;border:1px solid var(--dsw-alias-border-l1);border-radius:9px;padding:3px;background:var(--dsw-alias-bg-layer-1)}
.kp-subtabs button{height:27px;border-radius:6px;padding:0 10px;font-size:11.5px;color:var(--dsw-alias-label-secondary)}
.kp-subtabs button.on{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
.kp-brief-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:10px}
.kp-brief-card{text-align:left;border:1px solid var(--dsw-alias-border-l1);border-radius:10px;background:var(--dsw-alias-bg-layer-1);padding:12px;display:flex;flex-direction:column;gap:4px;min-height:84px}
.kp-brief-card:hover{border-color:var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2)}
.kp-brief-card strong{font-size:12.5px;font-weight:600}
.kp-brief-card span{font-size:11px;color:var(--dsw-alias-label-secondary);line-height:1.5}
.kp-dock{width:360px;flex:none;border-left:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);display:flex;flex-direction:column;min-height:0;z-index:5}
.kp-dock.closed{display:none}
.kp-dock-head{height:44px;flex:none;display:flex;align-items:center;gap:6px;padding:0 10px;border-bottom:1px solid var(--dsw-alias-border-l1)}
.kp-dock-head strong{font-size:12px;font-weight:600}
.kp-dock-head .grow{flex:1}
.kp-dock-body{flex:1;min-height:0;overflow:auto;padding:12px}
.kp-dock-tab{height:26px;padding:0 9px;border-radius:6px;font-size:11px;color:var(--dsw-alias-label-secondary)}
.kp-dock-tab.on{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
.kp-dock .kp-card{margin-bottom:10px}
.kp-evidence-head h2{font:500 17px/1.3 Georgia,"Songti SC",serif;margin:4px 0 4px}
.kp-evidence-meta{font:10px ui-monospace,monospace;color:var(--dsw-alias-label-secondary);word-break:break-all}
.kp-evidence-text{white-space:pre-wrap;overflow-wrap:anywhere;font:12px/1.65 ui-monospace,monospace;max-height:320px;overflow:auto;background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l1);border-radius:8px;padding:10px;margin:8px 0}
.kp-ev-summary{font:12.5px/1.7 Georgia,"Songti SC",serif;color:#D7E0EC;margin:6px 0 10px}
.kp-ev-conditions{margin:4px 0 10px}
.kp-ev-condition{padding:6px 0;border-bottom:1px solid var(--dsw-alias-border-l1)}
.kp-ev-condition b{display:inline-block;min-width:88px;font-size:10.5px;color:#B9C8DA;font-weight:600}
.kp-ev-condition span{font-size:11px;color:#D2DEEB;line-height:1.55}
.kp-ev-condition small{display:block;margin-top:2px;font:9px ui-monospace,monospace;color:#7F91A8}
.kp-ev-claims{margin-top:4px}
.kp-ev-claim{border-left:2px solid rgba(180,196,216,.22);padding-left:10px;margin:9px 0}
.kp-ev-claimhead{display:flex;align-items:baseline;gap:8px}
.kp-ev-claimhead b{font:10px ui-monospace,monospace;color:#F0A177;font-weight:600}
.kp-ev-claimhead span{font:9px ui-monospace,monospace;color:#7F91A8}
.kp-ev-claim blockquote{margin:3px 0 0;font:12.5px/1.6 Georgia,"Songti SC",serif;color:#DCE5F1}
.kp-ev-claim small{display:block;margin-top:3px;font-size:9.5px;color:#8FA1B8;line-height:1.5}
.kp-ev-gaps{margin-top:10px}
.kp-ev-raw{margin-top:10px;border-top:1px solid var(--dsw-alias-border-l1);padding-top:8px}
.kp-ev-raw summary{cursor:pointer;font-size:10.5px;color:#8EA3BA}
.kp-ev-raw .kp-evidence-text{max-height:260px;margin-top:8px}
.kp-evidence-list{display:flex;flex-wrap:wrap;gap:4px;margin:6px 0 10px}
.kp-shell .kp-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;text-align:center;color:var(--dsw-alias-label-secondary);padding:24px}
.kp-shell .kp-empty strong{color:var(--dsw-alias-label-primary);font:500 16px/1.3 Georgia,"Songti SC",serif;margin-bottom:4px}
.kp-palette-scrim{position:fixed;inset:0;background:#0007;z-index:90;display:grid;place-items:start center;padding-top:12vh}
.kp-palette{width:min(620px,calc(100vw - 40px));max-height:66vh;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l2);border-radius:12px;box-shadow:0 24px 80px #0007;display:flex;flex-direction:column;overflow:hidden}
.kp-palette input{height:50px;border:0;border-bottom:1px solid var(--dsw-alias-border-l1);background:transparent;padding:0 16px;font-size:14px;color:var(--dsw-alias-label-primary);outline:0}
.kp-palette-list{overflow:auto;padding:6px 8px 10px}
.kp-palette-group{font:9.5px ui-monospace,monospace;letter-spacing:.1em;text-transform:uppercase;color:var(--dsw-alias-label-secondary);padding:10px 8px 4px}
.kp-palette-item{display:flex;flex-direction:column;align-items:flex-start;width:100%;text-align:left;padding:8px 9px;border-radius:7px;gap:1px}
.kp-palette-item:hover{background:var(--dsw-alias-bg-layer-2)}
.kp-palette-item strong{font-size:12.5px;font-weight:500}
.kp-palette-item span{font-size:10.5px;color:var(--dsw-alias-label-secondary)}
.kp-palette-empty{padding:24px;text-align:center;color:var(--dsw-alias-label-secondary);font-size:12px}
@media (max-width:1100px){.kp-dock{position:absolute;right:0;top:0;bottom:0;box-shadow:-16px 0 40px #0005}.kp-brief-grid{grid-template-columns:1fr}}
@media (max-width:820px){.kp-rail{width:58px}.kp-rail-btn small{display:none}.kp-brand span{display:none}.kp-topbar .kp-select{max-width:120px}}
.kp-writehead{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:8px}
.kp-writehead h2{margin:0 0 3px;font:500 22px/1.2 Georgia,"Songti SC",serif}
.kp-writehead p{margin:0}
.kp-stylebtn{display:inline-flex;align-items:center;gap:7px;border:1px solid var(--dsw-alias-border-l2);border-radius:999px;background:var(--dsw-alias-bg-layer-2);padding:5px 11px;font-size:11px;color:var(--dsw-alias-label-secondary);cursor:pointer;max-width:100%}
.kp-stylebtn:hover{border-color:var(--dsw-alias-brand-primary);color:var(--dsw-alias-label-primary)}
.kp-stylebtn strong{color:var(--dsw-alias-label-primary);font-weight:600;font-size:11px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:260px}
.kp-stylebtn small{font:9px ui-monospace,monospace;color:var(--dsw-alias-label-secondary);letter-spacing:.04em}
.kp-stylepanel{border:1px solid var(--dsw-alias-border-l2);border-radius:10px;background:var(--dsw-alias-bg-layer-2);padding:10px 12px;margin:8px 0 10px}
.kp-stylegroup{display:grid;grid-template-columns:44px minmax(0,1fr);gap:8px;align-items:start;padding:6px 0;border-top:1px solid var(--dsw-alias-border-l1)}
.kp-stylegroup:first-of-type{border-top:0;padding-top:2px}
.kp-stylegroup>span{font-size:10.5px;color:var(--dsw-alias-label-secondary);padding-top:5px}
.kp-stylechips{display:flex;flex-wrap:wrap;gap:5px;max-height:210px;overflow:auto;padding-right:2px}
.kp-stylechip{display:flex;flex-direction:column;align-items:flex-start;gap:1px;text-align:left;border:1px solid var(--dsw-alias-border-l1);border-radius:7px;padding:4px 8px;background:var(--dsw-alias-bg-layer-1);font-size:11px;color:var(--dsw-alias-label-secondary);max-width:230px}
.kp-stylechip strong{font-weight:500;color:var(--dsw-alias-label-primary);font-size:11px}
.kp-stylechip small{font-size:9px;color:var(--dsw-alias-label-secondary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%}
.kp-stylechip:hover{border-color:var(--dsw-alias-border-l2)}
.kp-stylechip.on{border-color:var(--dsw-alias-brand-primary);box-shadow:inset 0 0 0 1px var(--dsw-alias-brand-primary)}
.kp-stylefoot{display:flex;align-items:center;gap:8px;flex-wrap:wrap;border-top:1px solid var(--dsw-alias-border-l1);padding-top:9px;margin-top:6px}
.kp-steps{display:flex;align-items:center;gap:4px;flex-wrap:wrap;margin:9px 0}
.kp-step{font-size:10.5px;color:var(--dsw-alias-label-secondary);border:1px solid var(--dsw-alias-border-l1);border-radius:999px;padding:2px 8px;white-space:nowrap}
.kp-step.done{color:var(--dsw-alias-label-primary)}
.kp-step.on{border-color:var(--dsw-alias-brand-primary);color:var(--dsw-alias-label-primary);font-weight:600}
.kp-next{display:flex;align-items:center;gap:12px;border:1px solid var(--dsw-alias-border-l1);border-left:2px solid var(--dsw-alias-brand-primary);border-radius:9px;background:var(--dsw-alias-bg-layer-2);padding:10px 12px;margin:8px 0}
.kp-next>div{flex:1;min-width:0}
.kp-next strong{display:block;font-size:13px;margin-bottom:2px}
.kp-next p{margin:0;font-size:11px;color:var(--dsw-alias-label-secondary);line-height:1.55}
.kp-graphmeta{display:flex;gap:5px;flex-wrap:wrap;margin:5px 0 0}
.kp-graphmeta .kp-pill{font-size:9.5px}
.kp-chip-warn{border-color:var(--dsw-alias-state-warn-primary);color:var(--dsw-alias-state-warn-primary)}
.kp-analysis-text{white-space:pre-wrap;overflow-wrap:anywhere;max-height:260px;overflow:auto;background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l1);border-radius:8px;padding:8px 10px;margin:6px 0 0;font:11px/1.6 ui-monospace,monospace;color:var(--dsw-alias-label-secondary)}
    `;
    function Icon(props) { return h('svg', { viewBox: '0 0 24 24', width: props?.size || 22, height: props?.size || 22, fill: 'none', 'aria-hidden': true }, h('path', { d: 'M3 9 12 3l9 6v11H3V9Z', fill: 'currentColor', opacity: .22 }), h('path', { d: 'M3 9 12 3l9 6M6 10h12M7 14h10M9 18h6', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' })); }
    const LibraryContext = React.createContext('private');
    async function requestLibrary(library, action, body = {}) { const response = await fetch('/knowledge-palace/action', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ action, ...body, library }) }); const data = await response.json(); if (!data.ok) { const error = new Error(data.error || `Request failed (${response.status})`); error.code = data.code; error.recovery = data.recovery; error.bindingStatus = data.bindingStatus; throw error; } if (data.value?.error?.code) throw new Error(data.value.error.message || data.value.error.code); return data.value; }
    const useLibraryApi = () => { const library = React.useContext(LibraryContext); return useMemo(() => (action, body) => requestLibrary(library, action, body), [library]); };
    const pageItems = (page) => Array.isArray(page?.items) ? page.items : Array.isArray(page) ? page : [];
    const uid = (prefix) => `${prefix}${Math.random().toString(36).slice(2, 9)}`;
    const ARG_HEAD = 58, ARG_NODE_W = 260, ARG_NODE_H = 86;
    const ARG_GAP = 84, ARG_LANE_GAP = 30, ARG_CHANNEL = 22, ARG_PAD = 20, ARG_INSET = 16;
    const ARG_LINKS = ['supports', 'opposes', 'infers', 'qualifies', 'defines', 'associates'];
    const STYLE_LABELS = {
      'journal-ams-family': 'AMS 家族', 'journal-agu-family': 'AGU 家族', 'journal-nature-portfolio': 'Nature 系列',
      'journal-copernicus-family': 'Copernicus', 'journal-gmd': 'GMD', 'journal-grl': 'GRL', 'journal-jgr': 'JGR',
      'journal-waf': 'WAF', 'journal-mwr': 'MWR', 'journal-bams': 'BAMS', 'journal-jam': 'JAM', 'journal-jas': 'JAS',
      'journal-jcli': 'J. Climate', 'journal-james': 'JAMES', 'journal-aies': 'AIES', 'journal-rog': 'Rev. Geophys.',
      'journal-nature': 'Nature', 'journal-nature-climate-change': 'Nat. Clim. Change', 'journal-nature-communications': 'Nat. Commun.',
      'journal-nature-geoscience': 'Nat. Geosci.', 'journal-npj': 'npj', 'journal-science-advances': 'Sci. Adv.',
      'journal-scientific-data': 'Sci. Data',
    };
    const styleLabel = (name) => (STYLE_LABELS[name] && tr(STYLE_LABELS[name])) || String(name || '').replace(/^journal-/, '').replace(/^lang-/, '').replace(/-/g, ' ');
    const labelOf = (node) => node?.label || node?.title || node?.name || node?.id || 'Untitled';
    function parseCardRecord(text) {
      const source = String(text || '');
      const section = (name) => {
        const match = source.match(new RegExp('^##\\s+' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*$', 'm'));
        if (!match) return '';
        const rest = source.slice(match.index + match[0].length);
        const end = rest.search(/^##\s+/m);
        return (end >= 0 ? rest.slice(0, end) : rest).trim();
      };
      const front = (source.match(/^---\s*\n([\s\S]*?)\n---\s*\n/) || [])[1] || '';
      const gaps = [...front.matchAll(/"([^"]+)"/g)].map((match) => match[1]).filter((value) => value.startsWith('gap-')).map((value) => value.split(':')[0]);
      const claims = section('Claims').split('\n').map((line) => line.trim()).filter(Boolean).map((line) => {
        const match = line.match(/^- (C\d+)(?:\s*\[([^\]]*)\])?:\s*(.*)$/);
        if (!match) return null;
        let body = match[3].trim(), anchor = '';
        if (body.includes(' — ')) { const split = body.lastIndexOf(' — '); anchor = body.slice(split + 3).trim(); body = body.slice(0, split).trim(); }
        let tags = match[2] || '', quote = body;
        const quoted = body.match(/^"([\s\S]*?)"\s*(?:\[(.*?)\])?\s*$/);
        if (quoted) { quote = quoted[1]; tags = tags || quoted[2] || ''; }
        return { id: match[1], quote: quote.replace(/\s+/g, ' '), tags: tags.trim(), anchor };
      }).filter(Boolean);
      const conditions = section('Conditions').split('\n').map((line) => line.trim()).filter((line) => line.startsWith('|') && !/^\|?\s*:?-{2,}/.test(line)).map((line) => line.split('|').map((cell) => cell.trim()).filter(Boolean)).filter((cells) => cells.length >= 2 && cells[0] !== 'Dimension').map((cells) => ({ dimension: cells[0], value: cells[1], evidence: cells[2] || '' }));
      return { summary: section('Summary').replace(/\s+/g, ' ').trim(), conditions, claims, gaps: [...new Set(gaps)] };
    }

    function ArgumentCanvas({ api, project, section, onClose, onDirtyChange, reloadToken = 0 }) {
      const [data, setData] = useState(null), [message, setMessage] = useState(''), [dirty, setDirty] = useState(false), [saving, setSaving] = useState(false), [externalUpdate, setExternalUpdate] = useState(false);
      const [sel, setSel] = useState(null), [ghost, setGhost] = useState(null), [dragPos, setDragPos] = useState(null), [lastLabel, setLastLabel] = useState('supports'), [loadedAt, setLoadedAt] = useState('');
      const area = useRef(null), canvasRef = useRef(null), drag = useRef(null), dirtyRef = useRef(false);
      const load = async () => { setMessage(''); try { setData(await api('workspace', { command: 'graph', slug: project, section, native: true })); setDirty(false); setExternalUpdate(false); setLoadedAt(new Date().toLocaleTimeString()); } catch (reason) { setMessage(reason.message || String(reason)); } };
      useEffect(() => { load(); }, [project, section]);
      dirtyRef.current = dirty;
      useEffect(() => { onDirtyChange?.(dirty); }, [dirty]);
      useEffect(() => () => onDirtyChange?.(false), []);
      const firstReload = useRef(true);
      useEffect(() => {
        if (firstReload.current) { firstReload.current = false; return; }
        // A writing session finished a turn: reload unless the author has unsaved canvas edits.
        if (dirtyRef.current) setExternalUpdate(true); else load();
      }, [reloadToken]);
      useEffect(() => {
        const refresh = () => { if (!dirtyRef.current && document.visibilityState === 'visible') load(); };
        window.addEventListener('focus', refresh);
        document.addEventListener('visibilitychange', refresh);
        return () => { window.removeEventListener('focus', refresh); document.removeEventListener('visibilitychange', refresh); };
      }, [project, section]);
      const touch = (fn) => { setData((old) => { if (!old) return old; const copy = JSON.parse(JSON.stringify(old)); fn(copy.graph); return copy; }); setDirty(true); };
      const graph = data?.graph || { paragraphs: [], nodes: [], edges: [] };
      const nodeById = new Map(graph.nodes.map((node) => [node.id, node]));
      const paragraphById = new Map(graph.paragraphs.map((p) => [p.id, p]));
      const pitch = ARG_NODE_W + ARG_GAP;

      /* Reading order is the layout: nodes are laid out in array order, so dragging
         a node only changes its place in that order. Nothing here writes x/y back,
         which keeps the exported page and this canvas from disagreeing. */
      const lanes = graph.paragraphs.map((p) => ({ p, nodes: graph.nodes.filter((node) => node.paragraph === p.id) }));
      const loose = graph.nodes.filter((node) => !paragraphById.has(node.paragraph));
      if (loose.length) lanes.push({ p: { id: '__loose__', role: 'middle', point: tr('未归属论点'), loose: true }, nodes: loose });
      const orderOf = new Map();
      lanes.forEach((lane) => lane.nodes.forEach((node, index) => orderOf.set(node.id, index)));
      const laneOrder = new Map(lanes.map((lane, index) => [lane.p.id, index]));

      const meta = new Map();
      for (const edge of graph.edges) {
        const from = nodeById.get(edge.from), to = nodeById.get(edge.to);
        if (from && to) {
          if (from.paragraph === to.paragraph) {
            const span = Math.abs(orderOf.get(to.id) - orderOf.get(from.id));
            meta.set(edge.id, span === 1 && orderOf.get(to.id) > orderOf.get(from.id) ? { kind: 'gutter' } : { kind: 'corridor', lane: from.paragraph, span });
          } else meta.set(edge.id, { kind: 'cross', from: from.paragraph, to: to.paragraph });
        } else if (paragraphById.has(edge.from) && paragraphById.has(edge.to)) meta.set(edge.id, { kind: 'paragraph' });
        else meta.set(edge.id, { kind: 'hidden' });
      }
      const channels = new Map();
      for (const edge of graph.edges) { const item = meta.get(edge.id); if (item?.kind === 'corridor') channels.set(item.lane, (channels.get(item.lane) || 0) + 1); }
      for (const [laneId] of channels) {
        graph.edges.filter((edge) => { const item = meta.get(edge.id); return item?.kind === 'corridor' && item.lane === laneId; })
          .sort((a, b) => meta.get(a.id).span - meta.get(b.id).span)
          .forEach((edge, index) => { meta.get(edge.id).slot = index; });
      }
      /* Several arrows may land on the same card: fan their ports across its
         bottom edge so each head stays visible instead of stacking into one. */
      const landings = new Map();
      for (const edge of graph.edges) {
        if (meta.get(edge.id)?.kind !== 'corridor') continue;
        const list = landings.get(edge.to) || [];
        list.push(edge);
        landings.set(edge.to, list);
      }
      for (const list of landings.values()) {
        list.sort((a, b) => (orderOf.get(a.from) ?? 0) - (orderOf.get(b.from) ?? 0));
        list.forEach((edge, index) => { const item = meta.get(edge.id); item.port = index; item.ports = list.length; });
      }

      /* Each paragraph gets enough height for its own bundle of pass-over arrows;
         the arrows run in channels below the cards instead of behind them. */
      const geo = new Map();
      let cursor = 16;
      for (const lane of lanes) {
        const count = channels.get(lane.p.id) || 0;
        const height = count ? ARG_HEAD + ARG_NODE_H + 30 + (count - 1) * ARG_CHANNEL + 24 : ARG_HEAD + ARG_NODE_H + 46;
        geo.set(lane.p.id, { top: cursor, height, rowTop: cursor + ARG_HEAD });
        cursor += height + ARG_LANE_GAP;
      }
      const height = Math.max(320, cursor - ARG_LANE_GAP + 16);
      const nodeCount = Math.max(1, ...lanes.map((lane) => lane.nodes.length));
      const width = Math.max(1060, ARG_INSET * 2 + ARG_PAD * 2 + nodeCount * pitch - ARG_GAP);
      const headerWidth = Math.min(900, width - ARG_INSET * 2 - 24);
      const canvasWidth = `max(${width}px, 100%)`;
      const canvasHeight = `max(${height}px, calc(100vh - 96px))`;

      const pos = new Map();
      for (const lane of lanes) { const rowTop = geo.get(lane.p.id).rowTop; lane.nodes.forEach((node, index) => pos.set(node.id, { x: ARG_INSET + ARG_PAD + index * pitch, y: rowTop })); }
      if (dragPos && pos.has(dragPos.id)) pos.set(dragPos.id, { x: dragPos.x, y: dragPos.y });

      const at = (event) => { if (!canvasRef.current) return { x: 0, y: 0 }; const box = canvasRef.current.getBoundingClientRect(); return { x: event.clientX - box.left, y: event.clientY - box.top }; };
      const nodeAt = (point) => [...graph.nodes].reverse().find((node) => { const p = pos.get(node.id); return p && point.x >= p.x && point.x <= p.x + ARG_NODE_W && point.y >= p.y && point.y <= p.y + ARG_NODE_H; });
      const start = (event, payload) => { event.preventDefault(); event.stopPropagation(); if (payload.sel) setSel(payload.sel); payload.ox = event.clientX; payload.oy = event.clientY; payload.moved = false; drag.current = payload; event.currentTarget.setPointerCapture?.(event.pointerId); };
      const place = (nodeId, laneId, slot) => {
        touch((g) => {
          const index = g.nodes.findIndex((node) => node.id === nodeId);
          if (index < 0) return;
          const node = g.nodes[index];
          const rest = g.nodes.filter((row) => row.id !== nodeId);
          node.paragraph = laneId;
          const members = rest.filter((row) => row.paragraph === laneId);
          let insertAt = rest.length;
          if (members.length) insertAt = slot >= members.length ? rest.indexOf(members[members.length - 1]) + 1 : rest.indexOf(members[Math.max(0, slot)]);
          rest.splice(insertAt, 0, node);
          g.nodes = rest;
        });
      };
      const move = (event) => {
        const current = drag.current; if (!current) return;
        if (!current.moved && Math.abs(event.clientX - current.ox) + Math.abs(event.clientY - current.oy) > 3) current.moved = true;
        const point = at(event);
        if (current.kind === 'node') setDragPos({ id: current.id, x: Math.max(0, point.x - current.dx), y: Math.max(0, point.y - current.dy) });
        else setGhost({ from: current.from, x: point.x, y: point.y });
      };
      const finish = (event) => {
        const current = drag.current; drag.current = null; setGhost(null); setDragPos(null);
        if (!current) return;
        const point = at(event);
        if (current.kind === 'edge') {
          const target = nodeAt(point);
          if (target && target.id !== current.from) touch((g) => { g.edges.push({ id: uid('e'), from: current.from, to: target.id, label: lastLabel }); });
          return;
        }
        if (!current.moved) return;
        const lane = lanes.find((row) => { const box = geo.get(row.p.id); return !row.p.loose && point.y >= box.top && point.y < box.top + box.height; });
        if (!lane) return;
        const members = lane.nodes.filter((node) => node.id !== current.id);
        const slot = Math.max(0, Math.min(members.length, Math.round((point.x - current.dx - ARG_INSET - ARG_PAD) / pitch)));
        place(current.id, lane.p.id, slot);
      };
      const save = async () => {
        setSaving(true); setMessage('');
        const clean = { ...graph, nodes: graph.nodes.map((node) => ({ id: node.id, text: node.text, evidence: node.evidence, paragraph: node.paragraph })) };
        try { await api('workspace', { command: 'graph-save', slug: project, section, graph: clean, expectedVersion: data.version, confirmed: true }); await load(); }
        catch (reason) { setMessage(reason.message || String(reason)); }
        finally { setSaving(false); }
      };
      const close = () => { if (dirty && !window.confirm(tr('论证图有未保存修改，关闭将丢弃。继续吗？'))) return; onClose(); };
      const selectedNode = sel?.kind === 'node' ? nodeById.get(sel.id) : null;
      const selectedEdge = sel?.kind === 'edge' ? graph.edges.find((edge) => edge.id === sel.id) : null;
      const linkOptions = [...new Set([...ARG_LINKS, ...graph.edges.map((edge) => edge.label).filter(Boolean)])];
      const clamp = (value, low, high) => Math.max(low, Math.min(high, value));
      const boxOf = (id) => { const p = pos.get(id); return p ? { x: p.x, y: p.y, r: p.x + ARG_NODE_W, b: p.y + ARG_NODE_H, cx: p.x + ARG_NODE_W / 2, cy: p.y + ARG_NODE_H / 2 } : null; };

      const gutterPath = (a, b) => {
        const sx = a.r, tx = b.x, bow = -11;
        return { d: `M ${sx} ${a.cy} Q ${(sx + tx) / 2} ${a.cy + bow} ${tx} ${a.cy}`, mx: (sx + tx) / 2, my: a.cy - 20 };
      };
      const corridorPath = (a, b, channel, tx) => {
        const sx = clamp(b.cx, a.x + 16, a.r - 16);
        if (Math.abs(tx - sx) < 4) return { d: `M ${sx} ${a.b} L ${sx} ${b.b}`, mx: sx + 9, my: (a.b + b.b) / 2 };
        const dir = tx > sx ? 1 : -1, radius = 9;
        return { d: `M ${sx} ${a.b} L ${sx} ${channel - radius} Q ${sx} ${channel} ${sx + dir * radius} ${channel} L ${tx - dir * radius} ${channel} Q ${tx} ${channel} ${tx} ${channel - radius} L ${tx} ${b.b}`, mx: (sx + tx) / 2, my: channel - 6 };
      };
      const crossPath = (a, b, fromLane, toLane) => {
        const from = geo.get(fromLane), to = geo.get(toLane);
        if (!from || !to) return null;
        const down = to.top > from.top;
        const gapY = down ? to.top - ARG_LANE_GAP / 2 : from.top - ARG_LANE_GAP / 2;
        const sx = clamp(b.cx, a.x + 16, a.r - 16), sy = down ? a.b : a.y, ty = down ? b.y : b.b;
        if (Math.abs(b.cx - sx) < 4) return { d: `M ${sx} ${sy} L ${sx} ${ty}`, mx: sx + 9, my: (sy + ty) / 2 };
        const dir = b.cx > sx ? 1 : -1, radius = 10;
        const d = down
          ? `M ${sx} ${sy} L ${sx} ${gapY - radius} Q ${sx} ${gapY} ${sx + dir * radius} ${gapY} L ${b.cx - dir * radius} ${gapY} Q ${b.cx} ${gapY} ${b.cx} ${gapY + radius} L ${b.cx} ${ty}`
          : `M ${sx} ${sy} L ${sx} ${gapY + radius} Q ${sx} ${gapY} ${sx + dir * radius} ${gapY} L ${b.cx - dir * radius} ${gapY} Q ${b.cx} ${gapY} ${b.cx} ${gapY - radius} L ${b.cx} ${ty}`;
        return { d, mx: (sx + b.cx) / 2, my: gapY - 6 };
      };
      const paragraphPath = (edge) => {
        const a = laneOrder.get(edge.from), b = laneOrder.get(edge.to);
        if (a == null || b == null || Math.abs(a - b) !== 1) return null;
        const from = geo.get(edge.from), to = geo.get(edge.to);
        const upper = from.top < to.top ? from : to, lower = from.top < to.top ? to : from;
        const gapTop = upper.top + upper.height, gapBottom = lower.top, down = from === upper;
        const startY = down ? gapTop + 3 : gapBottom - 3, endY = down ? gapBottom - 4 : gapTop + 4;
        return { d: `M ${ARG_INSET} ${startY} L ${ARG_INSET} ${endY}`, mx: ARG_INSET + 10, my: (gapTop + gapBottom) / 2 + 4, anchor: 'start' };
      };

      const edgeViews = graph.edges.map((edge) => {
        const item = meta.get(edge.id);
        if (!item || item.kind === 'hidden') return null;
        const a = boxOf(edge.from), b = boxOf(edge.to);
        let route = null;
        if (item.kind === 'gutter' && a && b) route = gutterPath(a, b);
        else if (item.kind === 'corridor' && a && b) {
          const tx = item.ports > 1 ? b.x + 34 + item.port * ((ARG_NODE_W - 68) / (item.ports - 1)) : b.cx;
          route = corridorPath(a, b, geo.get(item.lane).rowTop + ARG_NODE_H + 30 + item.slot * ARG_CHANNEL, tx);
        }
        else if (item.kind === 'cross' && a && b) route = crossPath(a, b, item.from, item.to);
        else if (item.kind === 'paragraph') route = paragraphPath(edge);
        if (!route) return null;
        return { edge, route, on: selectedEdge?.id === edge.id };
      }).filter(Boolean).sort((a, b) => (a.on ? 1 : 0) - (b.on ? 1 : 0));
      const edgeLayer = edgeViews.map(({ edge, route, on }) => h('g', { key: edge.id },
        h('path', { d: route.d, fill: 'none', stroke: 'transparent', strokeWidth: 18, style: { cursor: 'pointer', pointerEvents: 'stroke' }, onClick: (event) => { event.stopPropagation(); setSel({ kind: 'edge', id: edge.id }); } }),
        h('path', { d: route.d, fill: 'none', stroke: on ? 'var(--dsw-alias-brand-primary)' : 'var(--dsw-alias-label-secondary)', strokeWidth: on ? 2.2 : 1.4, opacity: on ? 1 : 0.9, markerEnd: 'url(#kp-arghead)', style: { pointerEvents: 'none' } }),
        h('text', { x: route.mx, y: route.my, textAnchor: route.anchor || 'middle', fontSize: 10.5, fontWeight: on ? 600 : 500, fill: 'var(--dsw-alias-brand-primary)', style: { pointerEvents: 'none', paintOrder: 'stroke', stroke: 'var(--dsw-alias-bg-base)', strokeWidth: 5, strokeLinejoin: 'round' } }, edge.label || '')));
      const ghostRoute = (() => {
        if (!ghost) return null;
        const a = boxOf(ghost.from);
        if (!a) return null;
        const reach = Math.max(40, Math.abs(ghost.x - a.r) / 2);
        return `M ${a.r} ${a.cy} C ${a.r + reach} ${a.cy} ${ghost.x - reach} ${ghost.y} ${ghost.x} ${ghost.y}`;
      })();
      const nodeViews = graph.nodes.map((node) => {
        const p = pos.get(node.id), on = selectedNode?.id === node.id;
        return h('div', { key: node.id, style: { position: 'absolute', left: p.x, top: p.y, width: ARG_NODE_W, zIndex: 3, cursor: 'grab', touchAction: 'none' }, onClick: (event) => { event.stopPropagation(); setSel({ kind: 'node', id: node.id }); }, onPointerDown: (event) => { const point = at(event); start(event, { kind: 'node', id: node.id, dx: point.x - p.x, dy: point.y - p.y, sel: { kind: 'node', id: node.id } }); } },
          h('div', { className: 'kp-card', title: node.text || '', style: { margin: 0, padding: '10px 12px', minHeight: ARG_NODE_H, boxSizing: 'border-box', background: 'var(--dsw-alias-bg-layer-2)', borderColor: on ? 'var(--dsw-alias-brand-primary)' : undefined } },
            h('div', { style: { fontSize: 12.5, lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' } }, node.text || tr('（空论点）')),
            h('div', { className: 'kp-muted', style: { fontSize: 10.5, marginTop: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, node.evidence || tr('无证据引用'))),
          h('div', { title: tr('拖到另一张卡片以建立关系'), style: { position: 'absolute', right: -9, top: ARG_NODE_H / 2 - 9, width: 18, height: 18, borderRadius: '50%', background: 'var(--dsw-alias-brand-primary)', cursor: 'crosshair', zIndex: 4, touchAction: 'none' }, onPointerDown: (event) => start(event, { kind: 'edge', from: node.id, sel: { kind: 'node', id: node.id } }) }));
      });
      const inspector = (selectedNode || selectedEdge) ? h('aside', { style: { width: 300, flex: '0 0 auto', borderLeft: '1px solid var(--dsw-alias-border-l1)', padding: 12, overflow: 'auto' } },
        selectedNode && h(React.Fragment, null,
          h('strong', null, tr('论点')),
          h('textarea', { className: 'kp-textarea', value: selectedNode.text, placeholder: tr('论点短语'), onChange: (event) => touch((g) => { g.nodes.find((node) => node.id === selectedNode.id).text = event.target.value; }) }),
          h('input', { className: 'kp-input', style: { width: '100%', marginTop: 8, boxSizing: 'border-box' }, value: selectedNode.evidence || '', placeholder: tr('Evidence / Claim 引用'), onChange: (event) => touch((g) => { g.nodes.find((node) => node.id === selectedNode.id).evidence = event.target.value; }) }),
          h('select', { className: 'kp-select', style: { width: '100%', marginTop: 8 }, value: selectedNode.paragraph || '', onChange: (event) => touch((g) => { g.nodes.find((node) => node.id === selectedNode.id).paragraph = event.target.value; }) }, graph.paragraphs.map((p, i) => h('option', { key: p.id, value: p.id }, trf("段 {0} {1}", [i + 1, p.point || ''])))),
          h('div', { className: 'kp-row', style: { marginTop: 8 } }, h('button', { className: 'kp-button', onClick: () => { touch((g) => { g.nodes = g.nodes.filter((node) => node.id !== selectedNode.id); g.edges = g.edges.filter((edge) => edge.from !== selectedNode.id && edge.to !== selectedNode.id); }); setSel(null); } }, tr('删除论点')))),
        selectedEdge && h(React.Fragment, null,
          h('strong', null, tr('关系')),
          h('div', { className: 'kp-muted' }, `${selectedEdge.from} → ${selectedEdge.to}`),
          h('select', { className: 'kp-select', style: { width: '100%', marginTop: 8 }, value: selectedEdge.label, onChange: (event) => { setLastLabel(event.target.value); touch((g) => { g.edges.find((edge) => edge.id === selectedEdge.id).label = event.target.value; }); } }, linkOptions.map((label) => h('option', { key: label }, label))),
          h('div', { className: 'kp-row', style: { marginTop: 8 } }, h('button', { className: 'kp-button', onClick: () => { touch((g) => { g.edges = g.edges.filter((edge) => edge.id !== selectedEdge.id); }); setSel(null); } }, tr('删除关系'))))) : null;
      const laneHeader = (lane) => {
        const box = geo.get(lane.p.id);
        if (lane.p.loose) return h('div', { className: 'kp-row', style: { position: 'absolute', left: ARG_INSET + 12, top: box.top + 8, width: headerWidth, zIndex: 5 } }, h('strong', { style: { minWidth: 44 } }, tr('未归属')), h('span', { className: 'kp-muted' }, tr('把它们拖进某个段落')));
        return h('div', { className: 'kp-row', style: { position: 'absolute', left: ARG_INSET + 12, top: box.top + 8, width: headerWidth, zIndex: 5 } },
          h('strong', { style: { minWidth: 44 } }, trf("段 {0}", [laneOrder.get(lane.p.id) + 1])),
          h('select', { className: 'kp-select', value: lane.p.role, onChange: (event) => touch((g) => { g.paragraphs.find((p) => p.id === lane.p.id).role = event.target.value; }) }, ['opening', 'middle', 'closing'].map((role) => h('option', { key: role }, role))),
          h('input', { className: 'kp-input', value: lane.p.point, title: lane.p.point || '', placeholder: tr('段落要点'), onChange: (event) => touch((g) => { g.paragraphs.find((p) => p.id === lane.p.id).point = event.target.value; }) }),
          h('button', { className: 'kp-button', onClick: () => touch((g) => { const ids = new Set(g.nodes.filter((node) => node.paragraph === lane.p.id).map((node) => node.id)); g.paragraphs = g.paragraphs.filter((p) => p.id !== lane.p.id); g.nodes = g.nodes.filter((node) => !ids.has(node.id)); g.edges = g.edges.filter((edge) => edge.from !== lane.p.id && edge.to !== lane.p.id && !ids.has(edge.from) && !ids.has(edge.to)); }) }, tr('删除段落')));
      };
      return h('div', { style: { position: 'absolute', inset: 0, zIndex: 80, background: 'var(--dsw-alias-bg-base)', display: 'flex', flexDirection: 'column' } },
        h('div', { className: 'kp-row', style: { padding: '10px 14px', borderBottom: '1px solid var(--dsw-alias-border-l1)' } },
          h('strong', null, trf("论证图画布 · {0} / {1}", [project, section])),
          h('span', { className: 'kp-muted' }, data ? trf("{0} 段 · {1} 论点 · {2} 关系", [graph.paragraphs.length, graph.nodes.length, graph.edges.length]) : tr('读取论证图…')),
          loadedAt && h('span', { className: 'kp-muted' }, trf("载入于 {0}", [loadedAt])),
          dirty && h('span', { className: 'kp-warning' }, tr('未保存')),
          externalUpdate && h('span', { className: 'kp-warning' }, tr('会话可能已更新论证图：保存或点「重新载入」后查看')),
          h('span', { style: { flex: 1 } }),
          h('button', { className: 'kp-button', disabled: saving, onClick: () => { if (dirty && !window.confirm(tr('重新载入会丢弃未保存修改，继续吗？'))) return; load(); } }, tr('重新载入')),
          h('button', { className: 'kp-button', onClick: () => touch((g) => g.paragraphs.push({ id: uid('p'), role: 'middle', point: '' })) }, tr('＋段落')),
          h('button', { className: 'kp-button', disabled: !lanes.length, onClick: () => { const lane = lanes.find((row) => row.p.id === selectedNode?.paragraph) || lanes.filter((row) => !row.p.loose).slice(-1)[0] || lanes[0]; if (!lane) return; touch((g) => { const last = [...g.nodes].reverse().find((node) => node.paragraph === lane.p.id); const node = { id: uid('n'), text: '', evidence: '', paragraph: lane.p.id }; g.nodes.splice(last ? g.nodes.indexOf(last) + 1 : g.nodes.length, 0, node); }); } }, tr('＋论点')),
          h('button', { className: 'kp-button primary', disabled: !dirty || saving || !data, onClick: save }, saving ? tr('保存中…') : dirty ? tr('保存更改') : tr('已保存')),
          h('button', { className: 'kp-button', onClick: close }, tr('关闭'))),
        message && h('div', { className: 'kp-error', role: 'alert', style: { padding: '6px 14px' } }, message),
        h('div', { style: { flex: 1, minHeight: 0, display: 'flex' } },
          h('div', { ref: area, style: { flex: 1, overflow: 'auto', position: 'relative' }, onPointerMove: move, onPointerUp: finish, onPointerCancel: finish, onClick: () => setSel(null) },
            h('div', { ref: canvasRef, style: { position: 'relative', width: canvasWidth, minHeight: canvasHeight, margin: '14px 0', boxSizing: 'border-box' } },
              data && !graph.nodes.length && h('div', { style: { position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', zIndex: 3, pointerEvents: 'none', textAlign: 'center' } },
                h('div', { className: 'kp-muted', style: { maxWidth: 400, lineHeight: 1.7 } }, tr('还没有论点。用右上角「＋论点」创建第一个；拖动卡片左右移动会改变它在段落里的顺序，拖到别的段落区域会改归属，从卡片右侧圆点拖到另一张卡片即可建立关系。'))),
              lanes.map((lane) => h(React.Fragment, { key: lane.p.id },
                h('div', { style: { position: 'absolute', left: ARG_INSET, right: ARG_INSET, top: geo.get(lane.p.id).top, height: geo.get(lane.p.id).height, borderRadius: 12, background: 'var(--dsw-alias-bg-layer-1)', border: '1px solid var(--dsw-alias-border-l1)', zIndex: 1 } }),
                laneHeader(lane))),
              h('svg', { style: { position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 2 } },
                h('defs', null, h('marker', { id: 'kp-arghead', markerWidth: 9, markerHeight: 9, refX: 7, refY: 3.2, orient: 'auto' }, h('path', { d: 'M0 0 L7 3.2 L0 6.4 Z', fill: 'var(--dsw-alias-brand-primary)' }))),
                edgeLayer,
                ghostRoute && h('path', { d: ghostRoute, fill: 'none', stroke: 'var(--dsw-alias-brand-primary)', strokeWidth: 1.6, strokeDasharray: '5 4', style: { pointerEvents: 'none' } })),
              nodeViews)),
          inspector));
    }

    class PanelErrorBoundary extends React.Component {
      constructor(props) { super(props); this.state = { error: null }; this.reset = () => this.setState({ error: null }); }
      static getDerivedStateFromError(error) { return { error }; }
      componentDidCatch(error) { console.error('KnowledgePalace panel', error); }
      render() {
        if (this.state.error) return h('div', { className: 'kp-shell' }, h('div', { className: 'kp-empty', style: { margin: 'auto' } }, h('strong', null, tr('知识宫殿渲染失败')), h('p', null, this.state.error.message || String(this.state.error)), h('button', { className: 'kp-button', onClick: this.reset }, tr('重试'))));
        return this.props.children;
      }
    }

    const COLORS = { domain: '#5277d4', concept: '#28a883', work: '#8b8fa3', gap: '#d8872f', bridge: '#9a66c7' };
    function GlobalSearch({ onChoose }) {
      const api = useLibraryApi();
      const [query, setQuery] = useState(''), [result, setResult] = useState(null), [state, setState] = useState('idle'), [message, setMessage] = useState('');
      useEffect(() => {
        const text = query.trim(); let active = true;
        if (!text) { setResult(null); setState('idle'); return () => { active = false; }; }
        setResult(null); setState('loading'); setMessage('');
        const timer = setTimeout(() => { api('search', { query: text, limit: 50 }).then((value) => { if (active) { setResult(value); setState('ready'); } }).catch((error) => { if (active) { setMessage(error.message || String(error)); setState('error'); } }); }, 300);
        return () => { active = false; clearTimeout(timer); };
      }, [query]);
      return h('div', { className: 'kp-card' },
        h('strong', null, tr('搜索知识库节点')),
        h('div', { className: 'kp-row' }, h('input', { className: 'kp-input', value: query, onChange: (e) => setQuery(e.target.value), placeholder: tr('输入节点名称、别名或 ID…'), 'aria-label': tr('搜索整个知识库的节点') }), query && h('button', { className: 'kp-button', onClick: () => setQuery('') }, tr('清除'))),
        h('small', { className: 'kp-muted' }, tr('搜索整个索引，不受全局概览的节点上限限制；选择结果后可手动切换到父子两跳。')),
        state === 'loading' && h('p', { className: 'kp-muted', role: 'status' }, tr('正在搜索…')),
        state === 'error' && h('p', { className: 'kp-error', role: 'alert' }, trf("搜索失败：{0}", [message])),
        state === 'ready' && h(React.Fragment, null,
          h('p', { className: 'kp-muted', role: 'status' }, result.total ? trf("找到 {0} 个节点{1}", [result.total, result.total > result.nodes.length ? trf("，显示前 {0} 个；请输入更具体的关键词", [result.nodes.length]) : '']) : tr('没有匹配的节点。')),
          h('div', { style: { maxHeight: 260, overflow: 'auto' } }, result.nodes.map((node) => h('button', { key: node.id, className: 'kp-button kp-localnode', onClick: () => onChoose(node) }, h('span', { className: 'kp-title' }, labelOf(node)), h('small', { className: 'kp-muted' }, `${node.kind} · ${node.id}`))))));
    }

    function NetworkView({ data, selectedId, onChoose, visibleKinds, setVisibleKinds, filtered }) {
      const canvasRef = useRef(null), modelRef = useRef(null), viewRef = useRef({ x: 0, y: 0, k: 1 }), frameRef = useRef(0), dragRef = useRef(null);
      const [query, setQuery] = useState(''), [visibleLinks, setVisibleLinks] = useState({ parent: true, semantic: true, cites: true, similar: true });
      const draw = () => {
        const canvas = canvasRef.current, model = modelRef.current;
        if (!canvas || !model) return;
        const rect = canvas.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
        if (canvas.width !== Math.round(rect.width * dpr) || canvas.height !== Math.round(rect.height * dpr)) { canvas.width = Math.round(rect.width * dpr); canvas.height = Math.round(rect.height * dpr); }
        const g = canvas.getContext('2d'), view = viewRef.current, dark = matchMedia?.('(prefers-color-scheme: dark)').matches;
        g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, canvas.width, canvas.height);
        g.setTransform(view.k * dpr, 0, 0, view.k * dpr, (rect.width / 2 + view.x) * dpr, (rect.height / 2 + view.y) * dpr);
        const shown = (node) => visibleKinds[node.kind] !== false;
        g.lineWidth = 1 / view.k;
        for (const link of model.links) { const family = link.kind === 'parent' ? 'parent' : link.kind === 'cites' ? 'cites' : link.kind === 'similar' ? 'similar' : 'semantic'; if (!visibleLinks[family] || !shown(link.a) || !shown(link.b)) continue; const hot = selectedId && (link.a.id === selectedId || link.b.id === selectedId); g.strokeStyle = dark ? `rgba(210,220,235,${hot ? .62 : .12})` : `rgba(55,65,80,${hot ? .58 : .12})`; g.beginPath(); g.moveTo(link.a.x, link.a.y); g.lineTo(link.b.x, link.b.y); g.stroke(); }
        const q = query.trim().toLowerCase();
        for (const node of model.nodes) { if (!shown(node)) continue; const match = q && (node.label.toLowerCase().includes(q) || node.id.toLowerCase().includes(q)); const r = node.kind === 'domain' ? 8 : node.kind === 'concept' ? 5 : 4; g.globalAlpha = !filtered && selectedId && node.id !== selectedId && !model.adj.get(selectedId)?.has(node.id) ? .18 : 1; g.fillStyle = COLORS[node.kind] || '#8b8fa3'; g.beginPath(); g.arc(node.x, node.y, r, 0, Math.PI * 2); g.fill(); if (node.id === selectedId || match) { g.globalAlpha = 1; g.strokeStyle = match ? '#f2cf3a' : (dark ? '#fff' : '#111'); g.lineWidth = 2 / view.k; g.stroke(); g.fillStyle = dark ? '#eee' : '#222'; g.font = `${12 / view.k}px system-ui`; const text = node.label.length > 46 ? `${node.label.slice(0, 44)}…` : node.label; g.fillText(text, node.x + r + 3 / view.k, node.y + 4 / view.k); } }
        g.globalAlpha = 1;
      };
      useEffect(() => {
        if (!data?.nodes) return;
        const nodes = data.nodes.map((node, i) => ({ ...node, x: Math.cos(i * 2.399) * Math.sqrt(i + 1) * 9, y: Math.sin(i * 2.399) * Math.sqrt(i + 1) * 9, vx: 0, vy: 0 }));
        const byId = new Map(nodes.map((node) => [node.id, node])), adj = new Map(nodes.map((node) => [node.id, new Set()]));
        const links = (data.links || []).map((link) => ({ ...link, a: byId.get(link.from), b: byId.get(link.to) })).filter((link) => link.a && link.b);
        for (const link of links) { adj.get(link.a.id).add(link.b.id); adj.get(link.b.id).add(link.a.id); }
        modelRef.current = { nodes, links, adj, ticks: 180 };
        viewRef.current = { x: 0, y: 0, k: .75 };
        const tick = () => {
          const model = modelRef.current; if (!model) return;
          for (const link of model.links) { const dx = link.b.x - link.a.x, dy = link.b.y - link.a.y, d = Math.hypot(dx, dy) || 1, f = .018 * (d - 54) / d; link.a.vx += dx * f; link.a.vy += dy * f; link.b.vx -= dx * f; link.b.vy -= dy * f; }
          const n = model.nodes.length;
          for (let i = 0; i < n; i++) { const a = model.nodes[i]; for (let s = 1; s <= Math.min(24, n - 1); s++) { const b = model.nodes[(i + s * 97) % n]; if (a === b) continue; let dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy + 4, f = 90 / d2 / Math.sqrt(d2); a.vx += dx * f; a.vy += dy * f; } a.vx = (a.vx - a.x * .00025) * .86; a.vy = (a.vy - a.y * .00025) * .86; a.x += a.vx; a.y += a.vy; }
          model.ticks--; draw(); if (model.ticks > 0) frameRef.current = requestAnimationFrame(tick);
        };
        frameRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frameRef.current);
      }, [data]);
      useEffect(draw, [selectedId, query, visibleKinds, visibleLinks]);
      useEffect(() => { const canvas = canvasRef.current; if (!canvas) return; const ro = new ResizeObserver(draw); ro.observe(canvas); return () => ro.disconnect(); }, []);
      const hit = (event) => { const canvas = canvasRef.current, model = modelRef.current, rect = canvas.getBoundingClientRect(), view = viewRef.current, x = (event.clientX - rect.left - rect.width / 2 - view.x) / view.k, y = (event.clientY - rect.top - rect.height / 2 - view.y) / view.k; let best; for (const node of model?.nodes || []) { if (visibleKinds[node.kind] === false) continue; const d = Math.hypot(node.x - x, node.y - y); if (d < 10 / view.k && (!best || d < best.d)) best = { node, d, x, y }; } return best || { x, y }; };
      const down = (event) => { const found = hit(event); dragRef.current = found.node ? { node: found.node, dx: found.node.x - found.x, dy: found.node.y - found.y, sx: event.clientX, sy: event.clientY } : { pan: true, x: event.clientX - viewRef.current.x, y: event.clientY - viewRef.current.y }; event.currentTarget.classList.add('dragging'); };
      const move = (event) => { const drag = dragRef.current; if (!drag) { const node = hit(event).node; event.currentTarget.title = node ? `${labelOf(node)} · ${node.kind} · ${node.id}` : ''; event.currentTarget.style.cursor = node ? 'pointer' : 'grab'; return; } if (drag.node) { const found = hit(event); drag.node.x = found.x + drag.dx; drag.node.y = found.y + drag.dy; drag.node.vx = drag.node.vy = 0; drag.moved = drag.moved || Math.abs(event.clientX - drag.sx) + Math.abs(event.clientY - drag.sy) > 3; } else { viewRef.current.x = event.clientX - drag.x; viewRef.current.y = event.clientY - drag.y; } draw(); };
      const up = (event) => { const drag = dragRef.current; if (drag?.node && !drag.moved) onChoose(drag.node); dragRef.current = null; event.currentTarget.classList.remove('dragging'); };
      const wheel = (event) => { event.preventDefault(); const canvas = canvasRef.current, rect = canvas.getBoundingClientRect(), view = viewRef.current, factor = event.deltaY < 0 ? 1.15 : 1 / 1.15, next = Math.max(.12, Math.min(7, view.k * factor)), mx = event.clientX - rect.left - rect.width / 2, my = event.clientY - rect.top - rect.height / 2; view.x = mx - (mx - view.x) * next / view.k; view.y = my - (my - view.y) * next / view.k; view.k = next; draw(); };
      return h('div', { className: 'kp-network' }, h('div', { className: 'kp-nettools' }, h('input', { className: 'kp-input', value: query, onChange: (e) => setQuery(e.target.value), placeholder: tr('高亮已显示的节点…') }), Object.keys(COLORS).map((kind) => h('button', { key: kind, className: `kp-chip ${visibleKinds[kind] === false ? 'off' : ''}`, style: { background: COLORS[kind] }, onClick: () => setVisibleKinds((old) => ({ ...old, [kind]: old[kind] === false })) }, kind)), Object.keys(visibleLinks).map((kind) => h('button', { key: kind, className: `kp-button ${visibleLinks[kind] ? 'active' : ''}`, onClick: () => setVisibleLinks((old) => ({ ...old, [kind]: !old[kind] })) }, kind))), h('canvas', { ref: canvasRef, onMouseDown: down, onMouseMove: move, onMouseUp: up, onMouseLeave: up, onWheel: wheel }), h('span', { className: 'kp-netmeta' }, filtered ? trf("{0} nodes · {1} parent links · 历史邻域并集", [data?.nodes?.length || 0, data?.links?.length || 0]) : `${data?.nodes?.length || 0}/${data?.completeness?.total_node_count || data?.nodes?.length || 0} nodes · ${data?.links?.length || 0}/${data?.completeness?.total_link_count ?? data?.links?.length ?? 0} links · selected-work citation coverage ${Math.round((data?.completeness?.citation_metric_coverage || 0) * 100)}%${data?.completeness?.truncated ? tr(' · 受限概览') : ''}`));
    }

    const BAND_LABELS = { grandparents: '祖父母 · -2', parents: '父节点 · -1', center: '当前节点 · 0', children: '子节点 · +1', grandchildren: '孙节点 · +2', sources2: '来源的来源 · -2', sources: '它引用的（来源） · -1', citing: '引用它的 · +1', citing2: '引用它的论文又被谁引用 · +2' };
    function LocalHierarchy({ data, onChoose, visibleKinds, setVisibleKinds, history, historyIndex, onHistory, title, showNav = true }) {
      const [query, setQuery] = useState(''), [paths, setPaths] = useState([]);
      const stageRef = useRef(null), nodeRefs = useRef(new Map());
      const bands = data?.bands || [];
      const kinds = [...new Set(bands.flatMap((band) => pageItems(band).map((node) => node.kind || 'unknown')))];
      const group = (items) => { const out = {}; for (const node of items) (out[node.kind || 'unknown'] ||= []).push(node); return out; };
      const visible = (node) => visibleKinds[node.kind] !== false && (!query.trim() || `${labelOf(node)} ${node.id}`.toLowerCase().includes(query.trim().toLowerCase()));
      useLayoutEffect(() => { const stage = stageRef.current; if (!stage) return; const measure = () => { const box = stage.getBoundingClientRect(); setPaths((data?.links || []).flatMap((edge) => { const from = nodeRefs.current.get(edge.from), to = nodeRefs.current.get(edge.to); if (!from || !to) return []; const a = from.getBoundingClientRect(), b = to.getBoundingClientRect(), x1 = a.right - box.left, y1 = a.top + a.height / 2 - box.top, x2 = b.left - box.left, y2 = b.top + b.height / 2 - box.top, mid = (x1 + x2) / 2; return [{ id: edge.id, d: `M${x1},${y1} C${mid},${y1} ${mid},${y2} ${x2},${y2}` }]; })); }; measure(); const ro = new ResizeObserver(measure); ro.observe(stage); return () => ro.disconnect(); }, [data, query, visibleKinds]);
      return h('div', { className: 'kp-local' },
        title ? h('h3', { style: { margin: '4px 0 8px', fontSize: 13 } }, title) : null,
        h('div', { className: 'kp-localtools' },
          showNav ? h('button', { className: 'kp-button', disabled: historyIndex <= 0, onClick: () => onHistory(historyIndex - 1) }, tr('← 后退')) : null,
          showNav ? h('button', { className: 'kp-button', disabled: historyIndex < 0 || historyIndex >= history.length - 1, onClick: () => onHistory(historyIndex + 1) }, tr('前进 →')) : null,
          h('input', { className: 'kp-input', value: query, onChange: (e) => setQuery(e.target.value), placeholder: tr('过滤当前两跳节点…') }),
          kinds.map((kind) => h('button', { key: kind, className: `kp-chip ${visibleKinds[kind] === false ? 'off' : ''}`, style: { background: COLORS[kind] || 'var(--dsw-alias-state-idle-primary)' }, onClick: () => setVisibleKinds((old) => ({ ...old, [kind]: old[kind] === false })) }, kind))),
        data?.truncated && h('p', { className: 'kp-warning' }, trf("两跳邻域超过安全上限：显示 {0}/{1} 个节点。", [data.returned_nodes, data.total_nodes])),
        (data?.warnings || []).map((text, index) => h('p', { className: 'kp-warning', key: index }, text)),
        h('div', { className: 'kp-localstage', ref: stageRef }, h('svg', { className: 'kp-tree-edges', 'aria-hidden': true }, paths.map((path) => h('path', { key: path.id, d: path.d }))), h('div', { className: 'kp-columns' }, bands.map((band) => {
          const filtered = pageItems(band).filter(visible);
          const grouped = group(filtered);
          return h('section', { className: 'kp-column', key: band.id }, h('h3', null, `${tr(BAND_LABELS[band.id] || band.id)} · ${band.returned}/${band.total}`),
            Object.keys(grouped).sort().map((kind) => h('div', { className: 'kp-kind', key: kind }, h('div', { className: 'kp-kindhead' }, h('i', { className: 'kp-dot', style: { background: COLORS[kind] || 'var(--dsw-alias-state-idle-primary)' } }), `${kind} · ${grouped[kind].length}`), grouped[kind].map((node) => h('button', { className: `kp-button kp-localnode ${node.id === data.center_id ? 'active' : ''}`, key: node.id, ref: (element) => { if (element) nodeRefs.current.set(node.id, element); else nodeRefs.current.delete(node.id); }, onClick: () => onChoose(node) }, h('span', { className: 'kp-title' }, labelOf(node)), h('small', { className: 'kp-muted' }, node.id))))),
            !filtered.length && h('p', { className: 'kp-muted' }, band.total ? tr('该列节点已被过滤。') : tr('没有节点。')), band.omitted > 0 && h('p', { className: 'kp-warning' }, trf("另有 {0} 个节点未载入。", [band.omitted])));
        }))));
    }

    const EXTRA_CSS = `
.kp-dock{position:relative}
.kp-dock-resizer{position:absolute;left:-4px;top:0;bottom:0;width:8px;cursor:col-resize;z-index:6}
.kp-dock-resizer:hover,.kp-dock-resizer.on{background:linear-gradient(90deg,transparent 3px,var(--dsw-alias-brand-primary) 3px,var(--dsw-alias-brand-primary) 5px,transparent 5px)}
.kp-resize-shield{position:fixed;inset:0;z-index:300;cursor:col-resize}
.kp-dock-body.assist{padding:0;display:flex;flex-direction:column;overflow:hidden}
.kp-assist-head{flex:none;display:flex;align-items:center;gap:6px;padding:8px 10px;border-bottom:1px solid var(--dsw-alias-border-l1)}
.kp-assist-head .kp-select{flex:1;min-width:0;max-width:none}
.kp-status-dot{width:8px;height:8px;border-radius:50%;flex:none;display:inline-block;background:var(--dsw-alias-border-l2)}
.kp-status-dot.run{background:var(--dsw-alias-state-success-primary)}
.kp-status-dot.bad{background:var(--dsw-alias-state-warn-primary)}
.kp-assist-menu{flex:none;display:flex;flex-direction:column;gap:6px;padding:8px 10px;border-bottom:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-2)}
.kp-assist-menu>.kp-button{text-align:left}
.kp-assist-menu summary{cursor:pointer;font-size:11.5px;color:var(--dsw-alias-label-secondary)}
.kp-strip{flex:none;margin:8px 10px 0;padding:8px 10px;border:1px solid var(--dsw-alias-border-l1);border-left:2px solid var(--dsw-alias-brand-primary);border-radius:8px;background:var(--dsw-alias-bg-layer-2);font-size:11.5px}
.kp-strip.warn{border-left-color:var(--dsw-alias-state-warn-primary)}
.kp-strip .kp-row{margin-top:6px}
.kp-strip textarea{margin-top:6px;min-height:120px}
.kp-conv{flex:1;min-height:0;display:flex;flex-direction:column;position:relative;overflow:auto}
.kp-assist-empty{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:24px;text-align:center;color:var(--dsw-alias-label-secondary)}
.kp-assist-empty strong{color:var(--dsw-alias-label-primary)}
.kp-explore-layer{position:absolute;inset:0;display:flex;flex-direction:column;background:#080d1a}
.kp-explore-layer.hidden{visibility:hidden;pointer-events:none}
.kp-explore-bar{flex:none;display:flex;align-items:center;gap:8px;padding:7px 12px;border-bottom:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);flex-wrap:wrap}
.kp-explore-bar .grow{flex:1}
.kp-explore-bar .kp-muted{font-size:11px;max-width:420px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.kp-explore-body{flex:1;min-height:0;display:flex;position:relative}
.kp-explore-drawer{width:310px;flex:none;overflow:auto;padding:10px;border-right:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-base)}
.kp-explore-stage{flex:1;min-width:0;min-height:0;position:relative;display:flex;flex-direction:column}
.kp-explore-net{flex:1;min-height:0;display:flex;flex-direction:column}
.kp-explore-net>iframe{flex:1;width:100%;height:100%;border:0;background:#080d1a}
.kp-layers{flex:1;min-height:0;overflow:auto;padding:12px;background:var(--dsw-alias-bg-base)}
.kp-layers .kp-network{height:calc(100% - 10px)}
.kp-history-row{display:flex;align-items:center;gap:6px}
.kp-history-row .kp-path{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.kp-path.active{outline:2px solid var(--dsw-alias-brand-primary)}
.kp-ctx-list{display:flex;flex-wrap:wrap;gap:4px;margin:4px 0 10px}
.kp-ctx-list .kp-button{padding:3px 8px;font-size:11px;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.kp-askcard textarea{min-height:76px;margin:6px 0}
.kp-sections{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin:10px 0 2px}
.kp-section-chip{display:inline-flex;align-items:center;gap:6px;height:28px;padding:0 10px;border:1px solid var(--dsw-alias-border-l1);border-radius:999px;background:var(--dsw-alias-bg-layer-2);font-size:11.5px;color:var(--dsw-alias-label-secondary);cursor:pointer}
.kp-section-chip.on{border-color:var(--dsw-alias-brand-primary);color:var(--dsw-alias-label-primary);box-shadow:inset 0 0 0 1px var(--dsw-alias-brand-primary)}
.kp-section-chip i{width:7px;height:7px;border-radius:50%;background:var(--dsw-alias-border-l2)}
.kp-section-chip i.warn{background:var(--dsw-alias-state-warn-primary)}
.kp-section-chip i.ok{background:var(--dsw-alias-state-success-primary)}
.kp-section-chip small{font:9.5px ui-monospace,monospace;color:var(--dsw-alias-label-secondary)}
.kp-runline{display:flex;align-items:center;gap:8px;font-size:11.5px;color:var(--dsw-alias-label-secondary);margin:6px 0 2px}
.kp-runline span{flex:1;min-width:0}
.kp-diff{max-height:420px;overflow:auto;border:1px solid var(--dsw-alias-border-l1);border-radius:8px;background:var(--dsw-alias-bg-base);padding:8px 10px;margin:8px 0;font:12.5px/1.65 Georgia,"Songti SC",serif}
.kp-diff p{margin:0 0 8px;white-space:pre-wrap;overflow-wrap:anywhere}
.kp-diff p.add{background:rgba(80,170,110,.14);border-left:2px solid var(--dsw-alias-state-success-primary);padding-left:6px}
.kp-diff p.del{background:rgba(210,140,60,.12);border-left:2px solid var(--dsw-alias-state-warn-primary);padding-left:6px;text-decoration:line-through;opacity:.8}
.kp-revs{display:grid;grid-template-columns:150px minmax(0,1fr);gap:10px;align-items:start;margin-top:8px}
.kp-revlist{display:flex;flex-direction:column;gap:4px;max-height:440px;overflow:auto}
.kp-revlist .kp-button{text-align:left;font:11px ui-monospace,monospace}
.kp-inline-confirm{display:flex;align-items:center;gap:8px;flex-wrap:wrap;border:1px solid var(--dsw-alias-state-warn-primary);border-radius:8px;padding:8px 10px;margin:8px 0;font-size:11.5px}
.kp-inline-confirm span{flex:1 1 220px}
.kp-banner{display:flex;align-items:center;gap:8px;flex-wrap:wrap;border:1px solid var(--dsw-alias-border-l2);border-radius:8px;padding:7px 10px;margin:8px 0;font-size:11.5px;background:var(--dsw-alias-bg-layer-2)}
.kp-banner span{flex:1 1 220px}
.kp-notice{margin:8px 14px 0;padding:7px 10px;border:1px solid var(--dsw-alias-border-l1);border-radius:8px;background:var(--dsw-alias-bg-layer-1);font-size:11.5px;display:flex;gap:8px;align-items:center}
.kp-notice .grow{flex:1}
.kp-palette-item:disabled{opacity:.45;cursor:default}
`;

    const storage = {
      get(key, fallback) { try { const raw = window.localStorage.getItem(key); return raw == null ? fallback : JSON.parse(raw); } catch { return fallback; } },
      set(key, value) { try { if (value === undefined) window.localStorage.removeItem(key); else window.localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage unavailable: React state still holds the session's values */ } },
    };
    const UI_KEY = 'kp.ui.v1', INTENT_KEY = 'kp.ui.v1.intent', LIMIT_KEY = 'kp.graph.limit';
    const LIBRARIES = ['private', 'demo'];
    const draftStorageKey = (library, project, section) => `kp.draft.v1.${library}.${project}.${section}`;
    function readUi() { const value = storage.get(UI_KEY, null); return value && typeof value === 'object' && !Array.isArray(value) ? value : {}; }
    function readLibraryUi(library) { const value = readUi().libraries?.[library]; return value && typeof value === 'object' && !Array.isArray(value) ? value : {}; }
    function writeLibraryUi(library, patch) {
      const all = readUi();
      const libraries = all.libraries && typeof all.libraries === 'object' ? all.libraries : {};
      storage.set(UI_KEY, { ...all, libraries: { ...libraries, [library]: { ...(libraries[library] || {}), ...patch } } });
    }
    function writeUiLibrary(library) { storage.set(UI_KEY, { ...readUi(), library }); }
    const TAB_LABELS = { graph: '探索', research: '研究', writing: '写作', maintenance: '维护' };
    const TAB_GLYPHS = { graph: '图', research: '问', writing: '写', maintenance: '维' };
    const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    const NODE_ID_RE = /^[a-z][a-z0-9-]*:[^\s]{1,300}$/i;
    const writingSlot = (section) => `writing@${section}`;
    const slotBase = (tabId) => String(tabId || '').split('~')[0];
    function slotTitle(tabId) {
      const base = slotBase(tabId);
      if (base.startsWith('writing@')) return trf("写作 · {0}", [base.slice(8)]);
      if (base === 'writing') return tr('项目级写作会话（旧）');
      return trf("{0}会话", [tr(TAB_LABELS[base] || base)]);
    }
    function describeBinding(binding) {
      const base = slotBase(binding?.tabId);
      const func = base.startsWith('writing') ? tr('写作') : tr(TAB_LABELS[base] || base);
      const project = binding?.projectId === '__library__' ? tr('知识库') : String(binding?.projectId || '');
      const section = base.startsWith('writing@') ? ` / ${base.slice(8)}` : '';
      return `${binding?.library === 'demo' ? tr('演示库 · ') : ''}${func} · ${project}${section}`;
    }
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    async function waitUntil(check, timeoutMs, stepMs = 50) { const end = Date.now() + timeoutMs; for (;;) { if (check()) return true; if (Date.now() >= end) return false; await sleep(stepMs); } }
    const sameText = (a, b) => String(a ?? '').replace(/\s+/g, ' ').trim() === String(b ?? '').replace(/\s+/g, ' ').trim();
    function relativeTime(ms) {
      if (!Number.isFinite(ms)) return '';
      const diff = Date.now() - ms;
      if (diff < 60000) return tr('刚刚');
      if (diff < 3600000) return trf("{0} 分钟前", [Math.round(diff / 60000)]);
      if (diff < 86400000) return trf("{0} 小时前", [Math.round(diff / 3600000)]);
      return trf("{0} 天前", [Math.round(diff / 86400000)]);
    }
    function nextRevisionName(latest) { const match = String(latest || '').match(/^r(\d{3})\.md$/); return `r${String((match ? Number(match[1]) : 0) + 1).padStart(3, '0')}.md`; }
    function paragraphDiff(before, after) {
      const split = (text) => String(text || '').split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean);
      const a = split(before), b = split(after);
      if (a.length * b.length > 400000) return [...a.map((text) => ({ type: 'del', text })), ...b.map((text) => ({ type: 'add', text }))];
      const table = Array.from({ length: a.length + 1 }, () => new Uint32Array(b.length + 1));
      for (let i = a.length - 1; i >= 0; i--) for (let j = b.length - 1; j >= 0; j--) table[i][j] = a[i] === b[j] ? table[i + 1][j + 1] + 1 : Math.max(table[i + 1][j], table[i][j + 1]);
      const out = [];
      let i = 0, j = 0;
      while (i < a.length && j < b.length) {
        if (a[i] === b[j]) { out.push({ type: 'same', text: a[i] }); i++; j++; }
        else if (table[i + 1][j] >= table[i][j + 1]) { out.push({ type: 'del', text: a[i] }); i++; }
        else { out.push({ type: 'add', text: b[j] }); j++; }
      }
      while (i < a.length) out.push({ type: 'del', text: a[i++] });
      while (j < b.length) out.push({ type: 'add', text: b[j++] });
      return out;
    }
    function DiffView({ before, after, emptyText = tr('两个版本内容相同。') }) {
      const rows = useMemo(() => paragraphDiff(before, after), [before, after]);
      const changed = rows.some((row) => row.type !== 'same');
      return h('div', { className: 'kp-diff' }, changed ? rows.map((row, index) => h('p', { key: index, className: row.type === 'same' ? '' : row.type }, row.text)) : h('p', { className: 'kp-muted' }, emptyText));
    }

    // Composer bridge: each embedded conversation registers the native input actions
    // of its session, so the workbench can place an editable task into that composer.
    const composerRegistry = (() => {
      const entries = new Map(), listeners = new Set();
      const emit = () => { for (const listener of [...listeners]) listener(); };
      const subscribe = (listener) => { listeners.add(listener); return () => { listeners.delete(listener); }; };
      return {
        register(sessionId, entry) {
          entries.set(sessionId, entry); emit();
          return () => { if (entries.get(sessionId) === entry) { entries.delete(sessionId); emit(); } };
        },
        get: (sessionId) => entries.get(sessionId),
        subscribe,
        waitFor(sessionId, timeoutMs) {
          const found = entries.get(sessionId);
          if (found) return Promise.resolve(found);
          return new Promise((resolve) => {
            let timer = null;
            const off = subscribe(() => { const entry = entries.get(sessionId); if (entry) { clearTimeout(timer); off(); resolve(entry); } });
            timer = setTimeout(() => { off(); resolve(null); }, timeoutMs);
          });
        },
      };
    })();

    function ConversationOccurrence({ useSession, useInput, inputActions, renderFactorySlot }) {
      const snapshot = useSession((value) => value);
      const input = typeof useInput === 'function' ? useInput((state) => state) : undefined;
      const inputRef = useRef(input);
      inputRef.current = input;
      const sessionId = snapshot?.sessionId;
      useEffect(() => {
        if (!sessionId || !inputActions || typeof inputActions.setDraft !== 'function') return undefined;
        return composerRegistry.register(sessionId, {
          setDraft: (text) => inputActions.setDraft(text),
          readDraft: () => inputRef.current?.draft,
          readPhase: () => inputRef.current?.phase,
          readQueue: () => (Array.isArray(inputRef.current?.queue) ? inputRef.current.queue.length : 0),
        });
      }, [sessionId, inputActions]);
      const settling = snapshot.openState !== 'open';
      // The native Hero requires DSH Workspace membership and navigates away when picked.
      // These sessions already have a validated project cwd but need not belong to a DSH Workspace.
      const hero = false;
      const phase = settling ? 'settling' : hero ? 'hero' : 'active';
      return renderFactorySlot('conversation.content', { variant: 'embedded', phase, hero });
    }

    function EmbeddedConversation({ sessions, sessionId, SessionProvider, renderSlot }) {
      const [retained, setRetained] = useState(null), [failure, setFailure] = useState(''), [retry, setRetry] = useState(0);
      useEffect(() => {
        setRetained(null); setFailure('');
        if (!sessionId) return undefined;
        let active = true;
        let reference;
        try { reference = sessions.retain(sessionId, { source: 'controllerOperation' }); }
        catch (reason) { setFailure(reason.message || String(reason)); return () => { active = false; }; }
        reference.ready.then((binding) => {
          if (!active) return;
          const state = binding.session.getSnapshot();
          if (state.openState === 'error' || state.removed) setFailure(state.openError?.message || tr('会话无法打开'));
          else setRetained({ reference, sessionId });
        }).catch((reason) => { if (active) setFailure(reason.message || String(reason)); });
        return () => { active = false; reference.release(); };
      }, [sessions, sessionId, retry]);
      if (failure) return h('div', { className: 'kp-assist-empty' }, h('p', { className: 'kp-error', role: 'alert' }, failure), h('button', { className: 'kp-button', onClick: () => setRetry((value) => value + 1) }, tr('重试打开会话')));
      if (!sessionId) return null;
      if (!retained || retained.sessionId !== sessionId) return h('div', { className: 'kp-assist-empty' }, tr('正在打开会话…'));
      if (!SessionProvider || !renderSlot) return h('div', { className: 'kp-assist-empty kp-error' }, tr('当前版本不支持内嵌原生会话。'));
      return h('div', { className: 'kp-conv' }, h(SessionProvider, { session: retained.reference }, renderSlot('kp.session-context', {})));
    }

    function useSessionActivity(sessions, sessionId, onSettled) {
      const [running, setRunning] = useState(false);
      const settledRef = useRef(onSettled);
      settledRef.current = onSettled;
      useEffect(() => {
        setRunning(false);
        if (!sessionId || !sessions) return undefined;
        let active = true, unsubscribe = () => {}, reference, previous = null;
        try { reference = sessions.retain(sessionId, { source: 'controllerOperation' }); }
        catch { return undefined; }
        reference.ready.then((binding) => {
          if (!active) return;
          const read = () => {
            const now = Boolean(binding.session.getSnapshot().running);
            setRunning(now);
            if (previous === true && now === false) settledRef.current?.();
            previous = now;
          };
          read();
          unsubscribe = binding.session.subscribe(read);
        }).catch(() => {});
        return () => { active = false; unsubscribe(); reference.release(); };
      }, [sessions, sessionId]);
      return { running };
    }

    const LIMIT_PRESETS = [250, 500, 750, 1000, 1250, 2000, 3000, 5000];
    function LiveVisualization({ onChoose, revision, focusRequest, onFocusResult, lang = 'zh' }) {
      const api = useLibraryApi();
      const frame = useRef(null), generation = useRef(0), chooseRef = useRef(onChoose), resultRef = useRef(onFocusResult), loadedRef = useRef(false), pendingFocus = useRef(null), suppress = useRef(null), nodeCount = useRef(0);
      const [limit, setLimit] = useState(() => { const saved = Number(storage.get(LIMIT_KEY, 500)); return LIMIT_PRESETS.includes(saved) ? saved : 500; });
      const [retry, setRetry] = useState(0), [page, setPage] = useState(null), [state, setState] = useState('loading'), [message, setMessage] = useState('');
      chooseRef.current = onChoose; resultRef.current = onFocusResult;
      useEffect(() => {
        let live = true;
        const ticket = ++generation.current;
        loadedRef.current = false; setState('loading'); setMessage(''); setPage(null);
        api('visualization', { max_nodes: limit }).then((value) => {
          if (!live || ticket !== generation.current) return;
          if (!value?.html) throw new Error(tr('图谱页面为空'));
          nodeCount.current = value.nodeCount || 0;
          setPage(value); setState('ready');
        }).catch((error) => { if (live && ticket === generation.current) { setMessage(error.message || String(error)); setState('error'); } });
        return () => { live = false; };
      }, [api, limit, revision, retry]);
      const sendFocus = (id) => {
        const target = frame.current?.contentWindow;
        if (!target || !loadedRef.current) { pendingFocus.current = id; return; }
        pendingFocus.current = null;
        // A focused node is reported back as a selection (possibly after the layout settles); do not treat that echo as a new click.
        suppress.current = { id, until: Date.now() + 25000 };
        target.postMessage({ type: 'palace-graph-focus', id }, '*');
      };
      useEffect(() => { if (focusRequest?.id) sendFocus(focusRequest.id); }, [focusRequest]);
      useEffect(() => {
        const receive = (event) => {
          if (!frame.current || event.source !== frame.current.contentWindow || !event.data || typeof event.data !== 'object') return;
          const data = event.data;
          if (data.type === 'palace-graph-limit') {
            if (LIMIT_PRESETS.includes(data.limit)) { storage.set(LIMIT_KEY, data.limit); setLimit(data.limit); }
          } else if (data.type === 'palace-graph-select' && typeof data.id === 'string' && NODE_ID_RE.test(data.id)) {
            const hold = suppress.current;
            if (hold && hold.id === data.id && Date.now() < hold.until) { suppress.current = null; return; }
            const label = typeof data.label === 'string' && data.label.trim() ? data.label.slice(0, 300) : data.id;
            const kind = typeof data.kind === 'string' && data.kind ? data.kind : data.id.split(':')[0];
            chooseRef.current?.({ id: data.id, kind, label }, { source: 'graph' });
          } else if (data.type === 'palace-graph-focus-result' && typeof data.id === 'string') {
            if (data.found !== true && suppress.current?.id === data.id) suppress.current = null;
            resultRef.current?.({ id: data.id, found: data.found === true, nodeCount: nodeCount.current });
          }
        };
        window.addEventListener('message', receive);
        return () => window.removeEventListener('message', receive);
      }, []);
      useEffect(() => { if (loadedRef.current) frame.current?.contentWindow?.postMessage({ type: 'palace-graph-lang', lang }, '*'); }, [lang]);
      const onLoad = () => {
        loadedRef.current = true;
        frame.current?.contentWindow?.postMessage({ type: 'palace-graph-lang', lang }, '*');
        const id = pendingFocus.current;
        if (id) setTimeout(() => sendFocus(id), 300);
      };
      if (state === 'error') return h('div', { className: 'kp-assist-empty' }, h('p', { className: 'kp-error', role: 'alert' }, trf("图谱加载失败：{0}", [message])), h('button', { className: 'kp-button', onClick: () => setRetry((old) => old + 1) }, tr('重试')));
      if (!page) return h('div', { className: 'kp-assist-empty', role: 'status' }, tr('正在加载实时图谱及引用缓存…'));
      return h('iframe', { ref: frame, srcDoc: page.html, sandbox: 'allow-scripts', title: tr('知识宫殿全局关系图'), onLoad });
    }

    function CandidateSearch({ onPrepare }) {
      const api = useLibraryApi(), library = React.useContext(LibraryContext);
      const [query, setQuery] = useState(''), [live, setLive] = useState(library !== 'demo'), [result, setResult] = useState(null), [selected, setSelected] = useState([]), [busy, setBusy] = useState(false), [error, setError] = useState('');
      const search = async () => { if (!query.trim()) return; setBusy(true); setError(''); setResult(null); setSelected([]); try { setResult(await api('candidateSearch', { query: query.trim(), limit: 10, live })); } catch (reason) { setError(reason.message || String(reason)); } finally { setBusy(false); } };
      const rows = result?.results || [];
      return h('div', { className: 'kp-card' }, h('h2', null, tr('查找文献候选')), h('p', { className: 'kp-muted' }, tr('检索只返回元数据候选，不代表已获取全文或完成入库；采用后仍需在会话中确认身份、阅读深度和写入。')), h('div', { className: 'kp-row' }, h('input', { className: 'kp-input', value: query, maxLength: 500, disabled: busy, placeholder: tr('研究主题或论文标题'), onChange: (event) => { setQuery(event.target.value); setResult(null); setSelected([]); setError(''); }, 'aria-label': tr('文献候选检索') }), h('button', { className: 'kp-button', disabled: busy || !query.trim(), onClick: search }, busy ? tr('检索中…') : tr('检索候选'))), h('label', null, h('input', { type: 'checkbox', checked: live, disabled: busy, onChange: (event) => { setLive(event.target.checked); setResult(null); setSelected([]); setError(''); } }), tr(' 联网查询 OpenAlex（点击检索会发送主题；结果可能写入可重建的元数据缓存）。取消勾选则只查缓存。')), error && h('p', { className: 'kp-error', role: 'alert' }, error), (result?.warnings || []).map((warning, i) => h('p', { className: 'kp-warning', key: i }, warning.includes('cache miss on a cache-only run') ? tr('本地没有此检索的缓存；可勾选联网查询后重试。') : warning)), result && !rows.length && h('p', { className: 'kp-muted' }, tr('没有候选结果；缓存模式下可能是缓存未命中。')), rows.map((row, i) => h('label', { key: row.key || i, style: { display: 'block', padding: '8px 0', borderBottom: '1px solid var(--dsw-alias-border-l1)' } }, h('input', { type: 'checkbox', checked: selected.includes(i), onChange: (event) => setSelected((old) => event.target.checked ? [...old, i] : old.filter((value) => value !== i)) }), ' ', h('strong', null, row.title || tr('无标题')), h('div', { className: 'kp-muted' }, `${row.year || tr('年份未知')} · ${row.venue || tr('来源未知')} · ${row.in_library ? trf("已在库：{0}", [typeof row.in_library === 'string' ? row.in_library : JSON.stringify(row.in_library)]) : tr('未匹配到库内记录')}`), h('div', { className: 'kp-muted' }, Object.entries(row.ids || {}).map(([key, value]) => `${key}: ${value}`).join(' · ')))), h('button', { className: 'kp-button', disabled: busy || !selected.length, onClick: () => onPrepare(`${lp('请对以下选定文献执行 KnowledgePalace ingest：先核对身份和来源，说明获取状态和阅读深度；任何库写入前请求确认。', 'Run KnowledgePalace ingest on the selected papers below: verify identity and source first, report acquisition status and reading depth, and ask for confirmation before any library write.')}\n${selected.map((i) => JSON.stringify(rows[i])).join('\n')}`) }, tr('把导入任务填入研究会话')));
    }

    function EvidenceResults({ result, onOpen, onLocate }) {
      if (!result || typeof result !== 'object') return h('pre', null, String(result || ''));
      const works = Object.entries(result.works || {}), candidates = new Map((result.candidates || []).map((item) => [item.node_id, item]));
      return h('div', null, h('p', { className: 'kp-muted' }, trf("覆盖：{0} · 候选文献：{1} · 未读依赖：{2}", [result.coverage || tr('未记录'), works.length, (result.unread_dependencies || []).length])), result.note && h('p', { className: 'kp-muted' }, result.note), works.map(([id, work]) => h('article', { key: id, className: 'kp-card' }, h('strong', null, work.title || id), (onOpen || onLocate) && h('div', { className: 'kp-row', style: { margin: '6px 0' } }, onOpen && h('button', { className: 'kp-button', onClick: () => onOpen({ id, kind: 'work', label: work.title || id }) }, tr('在证据中打开')), onLocate && h('button', { className: 'kp-button', onClick: () => onLocate({ id, kind: 'work', label: work.title || id }) }, tr('在图中定位'))), h('div', { className: 'kp-muted' }, trf("{0} · {1} · 阅读深度：{2} · Claims 总数：{3}", [id, work.year || tr('年份未知'), work.read_depth || tr('未记录'), work.claims_total ?? tr('未知')])), candidates.get(id)?.canonical_ref?.path && h('div', { className: 'kp-muted' }, trf("卡片：{0}", [candidates.get(id).canonical_ref.path])), (work.claims || []).map((claim) => h('blockquote', { key: claim.id, style: { margin: '10px 0', paddingLeft: 10, borderLeft: '2px solid var(--dsw-alias-border-l2)' } }, h('strong', null, `${id.replace(/^work:/, 'claim:')}#${claim.id}`), h('div', { style: { whiteSpace: 'pre-wrap' } }, claim.quote), h('small', { className: 'kp-muted' }, trf("锚点：{0}", [claim.anchor || tr('未记录')])))))), h('details', null, h('summary', null, tr('查看完整检索上下文（含关系、缺口和未读依赖）')), h('pre', { style: { whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', maxHeight: 380, overflow: 'auto' } }, JSON.stringify(result, null, 2))));
    }

    function EvidenceLookup({ project, onPrepare, onOpen, onLocate }) {
      const api = useLibraryApi();
      const [query, setQuery] = useState(''), [result, setResult] = useState(null), [busy, setBusy] = useState(false), [error, setError] = useState('');
      const run = async () => { if (!query.trim()) return; setBusy(true); setError(''); setResult(null); try { setResult(await api('research', { view: 'ask', topic: query.trim(), ...(project === '__library__' ? {} : { project }) })); } catch (reason) { setError(reason.message || String(reason)); } finally { setBusy(false); } };
      return h('div', { className: 'kp-card' }, h('h2', null, tr('检索知识库证据')), h('p', { className: 'kp-muted' }, tr('显示有界检索上下文而非最终结论；证据应保留原始 Claim ID、引文与锚点。索引过期时可能先更新派生索引。')), h('div', { className: 'kp-row' }, h('input', { className: 'kp-input', value: query, disabled: busy, placeholder: tr('研究问题或主题'), 'aria-label': tr('证据检索问题'), onChange: (event) => { setQuery(event.target.value); setResult(null); setError(''); } }), h('button', { className: 'kp-button', disabled: busy || !query.trim(), onClick: run }, busy ? tr('检索中…') : tr('检索证据')), h('button', { className: 'kp-button', disabled: busy || !query.trim(), onClick: () => onPrepare(lp(`请基于 KnowledgePalace 检索并讨论：${query.trim()}。保留 Claim ID、引文与锚点，区分事实与推论。`, `Use KnowledgePalace to retrieve evidence and discuss: ${query.trim()}. Keep Claim IDs, quotes and anchors, and keep facts apart from inference.`)) }, tr('填入研究会话'))), error && h('p', { className: 'kp-error', role: 'alert' }, error), result && h(EvidenceResults, { result, onOpen, onLocate }));
    }

    function Panel({ SessionProvider, renderSlot, onLibraryChange }) {
      const api = useLibraryApi(), library = React.useContext(LibraryContext);
      const lang = useLanguage();
      const savedUi = useMemo(() => readLibraryUi(library), [library]);
      const [tab, setTab] = useState(TAB_LABELS[savedUi.tab] ? savedUi.tab : 'graph');
      const [projects, setProjects] = useState([]), [projectsLoaded, setProjectsLoaded] = useState(false);
      const [project, setProject] = useState(typeof savedUi.project === 'string' && savedUi.project ? savedUi.project : '__library__');
      const [detail, setDetail] = useState(null), [section, setSection] = useState('');
      const [error, setError] = useState(''), [notice, setNotice] = useState(''), [busy, setBusy] = useState(false);
      const [task, setTask] = useState(''), [researchMode, setResearchMode] = useState('ask');
      const [dockOpen, setDockOpen] = useState(savedUi.dockOpen !== false);
      const [dockTab, setDockTab] = useState(savedUi.dockTab === 'evidence' || savedUi.dockTab === 'assistant' ? savedUi.dockTab : 'evidence');
      const [dockWidth, setDockWidth] = useState(Number.isFinite(savedUi.dockWidth) ? Math.max(360, savedUi.dockWidth) : 440);
      const [resizing, setResizing] = useState(false);
      const [paletteOpen, setPaletteOpen] = useState(false), [paletteQuery, setPaletteQuery] = useState('');
      const bodyRef = useRef(null), projectRef = useRef(project), detailRef = useRef(detail);
      projectRef.current = project; detailRef.current = detail;

      // Function sessions
      const [sessionList, setSessionList] = useState([]), [bindingSlot, setBindingSlot] = useState(''), [loadedKey, setLoadedKey] = useState('');
      const [bindingsLoading, setBindingsLoading] = useState(true), [bindingsFailed, setBindingsFailed] = useState(false), [bindingReload, setBindingReload] = useState(0);
      const [recovery, setRecovery] = useState(null), [recoveryId, setRecoveryId] = useState('');
      const [sessionMenu, setSessionMenu] = useState(false), [confirmUnlink, setConfirmUnlink] = useState(false);
      const [intent, setIntent] = useState(null), [fill, setFill] = useState(null), [fallbackText, setFallbackText] = useState('');
      const bindingVersion = useRef(0), submission = useRef(null), onSettledRef = useRef(null);

      // Writing
      const [newSection, setNewSection] = useState(''), [addingSection, setAddingSection] = useState(false);
      const [showArgument, setShowArgument] = useState(false), [graphDirty, setGraphDirty] = useState(false), [canvasReload, setCanvasReload] = useState(0);
      const [showCreate, setShowCreate] = useState(false), [newProject, setNewProject] = useState({ slug: '', audience: '', venue: '', language: 'en', citation_style: 'apa' });
      const [styleProfiles, setStyleProfiles] = useState([]), [stylesLoading, setStylesLoading] = useState(false), [stylesError, setStylesError] = useState('');
      const [styleOpen, setStyleOpen] = useState(false), [styleDraft, setStyleDraft] = useState([]), [styleSaving, setStyleSaving] = useState(false), [styleChanged, setStyleChanged] = useState(false), [styleOverride, setStyleOverride] = useState(null);
      const [liveGraph, setLiveGraph] = useState(null);
      const [draft, setDraft] = useState(''), [draftBase, setDraftBase] = useState(null), [draftDirty, setDraftDirty] = useState(false), [draftOwner, setDraftOwner] = useState(null);
      const [draftConflict, setDraftConflict] = useState(null), [revisionNotice, setRevisionNotice] = useState(null), [draftBackup, setDraftBackup] = useState(null);
      const [editorMode, setEditorMode] = useState('edit'), [compare, setCompare] = useState(null);
      const [historyRev, setHistoryRev] = useState(''), [historyData, setHistoryData] = useState(null), [historyBusy, setHistoryBusy] = useState(false);
      const [stageConfirm, setStageConfirm] = useState(null), [pendingStage, setPendingStage] = useState(null), [activeStage, setActiveStage] = useState(null);
      const graphSummaryGeneration = useRef(0), editorKeyRef = useRef(''), draftBaseRef = useRef(null), draftDirtyRef = useRef(false), draftPending = useRef(null), revisionCache = useRef(new Map());
      draftBaseRef.current = draftBase; draftDirtyRef.current = draftDirty;

      // Maintenance
      const [maintenanceStatus, setMaintenanceStatus] = useState(null), [maintenanceBusy, setMaintenanceBusy] = useState(false), [graphRevision, setGraphRevision] = useState(0), [rebuildArmed, setRebuildArmed] = useState(false);

      // Explore
      const [exploreVisited, setExploreVisited] = useState(tab === 'graph');
      const [exploreView, setExploreView] = useState(savedUi.exploreView === 'layers' ? 'layers' : 'network');
      const [drawerOpen, setDrawerOpen] = useState(savedUi.drawerOpen === true);
      const [graphSelection, setGraphSelection] = useState(null), [neighborhood, setNeighborhood] = useState(null);
      const [hierarchies, setHierarchies] = useState([]), [hierarchyId, setHierarchyId] = useState(''), [levels, setLevels] = useState([]), [hierarchyError, setHierarchyError] = useState('');
      const [path, setPath] = useState([]), [historyIndex, setHistoryIndex] = useState(-1), [checkedHistory, setCheckedHistory] = useState([]), [historyFilter, setHistoryFilter] = useState(false);
      const [historyNetwork, setHistoryNetwork] = useState(null), [historyNetworkState, setHistoryNetworkState] = useState('idle'), [historyNetworkMessage, setHistoryNetworkMessage] = useState('');
      const [visibleKinds, setVisibleKinds] = useState(Object.fromEntries(Object.keys(COLORS).map((key) => [key, true])));
      const [focusRequest, setFocusRequest] = useState(null), [focusMiss, setFocusMiss] = useState('');
      const [question, setQuestion] = useState(''), [scopeType, setScopeType] = useState('node'), [selectedEdge, setSelectedEdge] = useState(null);
      const graphSelectionGeneration = useRef(0), historyRef = useRef({ path: [], index: -1 }), questionRef = useRef(null);

      const current = detail?.sections?.find((row) => row.name === section) || null;
      const bindingTab = tab === 'writing' && project !== '__library__' && section ? writingSlot(section) : tab;
      const bindingKey = `${project}|${bindingTab}`;
      const session = sessionList.find((row) => row.tabId === bindingSlot) || null;
      const sessionAvailable = Boolean(session && (!session.status || session.status === 'available'));
      const activity = useSessionActivity(this.sessions, sessionAvailable ? session.sessionId : null, () => onSettledRef.current?.());

      const rememberSlot = (key, slotId) => { const slots = { ...(readLibraryUi(library).slots || {}) }; slots[key] = slotId; writeLibraryUi(library, { slots }); };
      const flushDraft = () => { const item = draftPending.current; if (item) { storage.set(item.key, item.value); draftPending.current = null; } };

      // ---------- persistence ----------
      useEffect(() => { writeLibraryUi(library, { tab, project, dockOpen, dockTab, dockWidth, exploreView, drawerOpen }); }, [library, tab, project, dockOpen, dockTab, dockWidth, exploreView, drawerOpen]);
      useEffect(() => {
        if (project === '__library__' || !section) return;
        const sections = { ...(readLibraryUi(library).sections || {}) };
        sections[project] = section;
        writeLibraryUi(library, { sections });
      }, [library, project, section]);
      useEffect(() => { if (tab === 'graph') setExploreVisited(true); }, [tab]);
      useEffect(() => { if (!notice) return undefined; const timer = setTimeout(() => setNotice(''), 7000); return () => clearTimeout(timer); }, [notice]);

      // ---------- projects and project detail ----------
      const refreshProjects = () => api('projects').then((value) => { const rows = value.projects || []; setProjects(rows); setProjectsLoaded(true); return rows; }).catch((reason) => { setError(reason.message || String(reason)); return null; });
      useEffect(() => { refreshProjects(); }, []);
      useEffect(() => { if (projectsLoaded && project !== '__library__' && !projects.some((row) => row.slug === project)) setProject('__library__'); }, [projectsLoaded, projects, project]);
      useEffect(() => {
        let active = true;
        setDetail(null); setSection('');
        if (project === '__library__') return () => { active = false; };
        api('project', { slug: project }).then((value) => {
          if (!active) return;
          setDetail(value);
          const names = (value.sections || []).map((row) => row.name);
          const remembered = readLibraryUi(library).sections?.[project];
          setSection(names.includes(remembered) ? remembered : (names[0] || ''));
        }).catch((reason) => { if (active) setError(reason.message || String(reason)); });
        return () => { active = false; };
      }, [project]);
      const reloadProject = async () => {
        const slug = projectRef.current;
        if (slug === '__library__') return null;
        try {
          const value = await api('project', { slug });
          if (projectRef.current !== slug) return null;
          setDetail(value);
          setSection((old) => (value.sections || []).some((row) => row.name === old) ? old : (value.sections?.[0]?.name || ''));
          return value;
        } catch (reason) { setError(reason.message || String(reason)); return null; }
      };
      useEffect(() => { if (tab === 'writing' && detailRef.current) reloadProject(); }, [tab]);
      useEffect(() => {
        if (tab !== 'writing') return undefined;
        let active = true;
        setStylesLoading(true);
        api('styles').then((value) => { if (active) { setStyleProfiles(value.profiles || []); setStylesError(''); } })
          .catch((reason) => { if (active) setStylesError(reason.message || String(reason)); })
          .finally(() => { if (active) setStylesLoading(false); });
        return () => { active = false; };
      }, [tab, api]);
      useEffect(() => { setStyleOpen(false); setStyleChanged(false); setStyleOverride(null); setLiveGraph(null); setActiveStage(null); setStageConfirm(null); setShowArgument(false); }, [project]);
      useEffect(() => { setStageConfirm(null); setLiveGraph(null); }, [section]);
      useEffect(() => {
        let active = true;
        const generation = ++graphSummaryGeneration.current;
        if (tab !== 'writing' || project === '__library__' || !section) return undefined;
        api('graphSummary', { slug: project, section }).then((value) => { if (active && generation === graphSummaryGeneration.current) setLiveGraph(value); })
          .catch((reason) => { if (active && generation === graphSummaryGeneration.current) setLiveGraph({ graph_available: false, graph_summary: { error: reason.message || String(reason) } }); });
        return () => { active = false; };
      }, [tab, project, section, detail, api]);
      const refreshGraph = async () => {
        if (project === '__library__' || !section) return null;
        const generation = ++graphSummaryGeneration.current;
        try {
          const value = await api('graphSummary', { slug: project, section });
          if (generation === graphSummaryGeneration.current) setLiveGraph(value);
          return value;
        } catch (reason) { setError(reason.message || String(reason)); return null; }
      };

      // ---------- function sessions ----------
      useEffect(() => {
        let active = true;
        const version = ++bindingVersion.current;
        setSessionList([]); setBindingSlot(''); setRecovery(null); setBindingsLoading(true); setBindingsFailed(false); setLoadedKey(''); setSessionMenu(false); setConfirmUnlink(false); setFill(null);
        const key = `${project}|${bindingTab}`;
        const requests = [api('sessionBindingList', { projectId: project, tabId: bindingTab })];
        if (bindingTab.startsWith('writing@')) requests.push(api('sessionBindingList', { projectId: project, tabId: 'writing' }).then((rows) => rows.map((row) => ({ ...row, legacy: true }))).catch(() => []));
        Promise.all(requests).then(([rows, legacy = []]) => {
          if (!active || version !== bindingVersion.current) return;
          const all = [...rows, ...legacy];
          setSessionList(all);
          const remembered = readLibraryUi(library).slots?.[key];
          const preferred = all.find((row) => row.tabId === remembered) || rows[0] || null;
          setBindingSlot(preferred?.tabId || '');
          setLoadedKey(key);
        }).catch((reason) => {
          if (!active || version !== bindingVersion.current) return;
          setBindingsFailed(true); setLoadedKey(key);
          setError(trf("会话列表读取失败：{0}。请重试，确认状态前不会新建会话。", [reason.message]));
        }).finally(() => { if (active && version === bindingVersion.current) setBindingsLoading(false); });
        return () => { active = false; };
      }, [project, bindingTab, bindingReload]);

      const sessionTitle = (slotId) => {
        const base = slotBase(slotId);
        const func = base.startsWith('writing') ? tr('写作') : tr(TAB_LABELS[base] || base);
        const sectionName = base.startsWith('writing@') ? base.slice(8) : '';
        return trf("{0}知识宫殿 · {1} · {2}{3}", [library === 'demo' ? '演示库 · ' : '', func, project === '__library__' ? '知识库' : project, sectionName ? ` / ${sectionName}` : '']);
      };
      const renameSession = (sessionId, slotId) => {
        this.sessions.using(sessionId, { source: 'controllerOperation' }, async (reference) => {
          const binding = await reference.ready;
          if (typeof binding.session.rename !== 'function') return;
          const result = await binding.session.rename(sessionTitle(slotId));
          if (result && result.ok === false) throw new Error(result.error?.message || tr('改名失败'));
        }).catch((reason) => setNotice(trf("会话已创建，但没能改名：{0}", [reason?.message || reason])));
      };
      const handleSessionError = (reason) => {
        if (reason?.recovery?.sessionId) {
          setRecovery({ slot: reason.recovery.tabId, sessionId: reason.recovery.sessionId }); setRecoveryId(reason.recovery.sessionId); setSessionMenu(true);
          setError(trf("{0}；请记录会话 ID：{1}", [reason.message, reason.recovery.sessionId]));
          return;
        }
        if (reason?.bindingStatus) { setError(trf("当前会话不可用（{0}）。可在右侧「…」里新建会话或解除关联。", [reason.bindingStatus])); setBindingReload((value) => value + 1); return; }
        setError(reason?.message || String(reason));
      };
      const ensureSession = async (slotId) => {
        const existing = sessionList.find((row) => row.tabId === slotId);
        if (existing && existing.status && existing.status !== 'available') { const failure = new Error(trf("会话不可用：{0}", [existing.status])); failure.bindingStatus = existing.status; throw failure; }
        if (existing) return existing;
        const value = await api('sessionBindingOpen', { confirmed: true, projectId: project, tabId: slotId });
        const row = { projectId: value.projectId, tabId: value.tabId, sessionId: value.sessionId, status: 'available', running: false, updatedAt: Date.now() };
        setSessionList((rows) => rows.some((item) => item.tabId === slotId) ? rows.map((item) => item.tabId === slotId ? { ...item, ...row } : item) : [...rows, row]);
        setBindingSlot(slotId); rememberSlot(bindingKey, slotId);
        if (value.created) renameSession(value.sessionId, slotId);
        return row;
      };
      const startConversation = async () => {
        if (bindingsLoading || bindingsFailed) return;
        setBusy(true); setError('');
        try { await ensureSession(bindingTab); setDockOpen(true); setDockTab('assistant'); }
        catch (reason) { handleSessionError(reason); }
        finally { setBusy(false); }
      };
      const createAnother = async () => {
        if (bindingsLoading || bindingsFailed || recovery) return;
        const slotId = `${bindingTab}~${crypto.randomUUID()}`;
        setBusy(true); setError('');
        try {
          const value = await api('sessionBindingOpen', { confirmed: true, projectId: project, tabId: slotId });
          setSessionList((rows) => [...rows, { projectId: value.projectId, tabId: value.tabId, sessionId: value.sessionId, status: 'available', running: false, updatedAt: Date.now() }]);
          setBindingSlot(slotId); rememberSlot(bindingKey, slotId); setSessionMenu(false); setDockOpen(true); setDockTab('assistant');
          if (value.created) renameSession(value.sessionId, slotId);
        } catch (reason) { if (reason.recovery?.sessionId && !reason.recovery.tabId) reason.recovery.tabId = slotId; handleSessionError(reason); }
        finally { setBusy(false); }
      };
      const recover = async () => {
        setBusy(true); setError('');
        try {
          const value = await api('sessionBindingRecover', { projectId: project, tabId: recovery?.slot || `${bindingTab}~${crypto.randomUUID()}`, sessionId: recoveryId.trim(), confirmed: true });
          const row = { projectId: value.projectId, tabId: value.tabId, sessionId: value.sessionId, status: 'available', running: false };
          setSessionList((rows) => rows.some((item) => item.tabId === row.tabId) ? rows.map((item) => item.tabId === row.tabId ? { ...item, ...row } : item) : [...rows, row]);
          setBindingSlot(row.tabId); rememberSlot(bindingKey, row.tabId); setRecoveryId(''); setRecovery(null); setSessionMenu(false);
        } catch (reason) { setError(reason.message || String(reason)); }
        finally { setBusy(false); }
      };
      const unlink = async () => {
        if (!session?.sessionId) return;
        setBusy(true); setError('');
        try {
          await api('sessionBindingUnlink', { projectId: project, tabId: session.tabId, expectedSessionId: session.sessionId, confirmed: true });
          const remaining = sessionList.filter((row) => row.tabId !== session.tabId);
          setSessionList(remaining);
          const next = remaining.find((row) => !row.legacy) || null;
          setBindingSlot(next?.tabId || ''); rememberSlot(bindingKey, next?.tabId || '');
          setConfirmUnlink(false); setSessionMenu(false); setFill(null);
        } catch (reason) { setError(reason.message || String(reason)); }
        finally { setBusy(false); }
      };
      const openInDsh = () => {
        const id = session?.sessionId;
        if (!id) return;
        if (typeof this.uiWorkspace?.openSession === 'function') {
          try { this.uiWorkspace.openSession(id); return; }
          catch (reason) { setError(trf("打开会话失败：{0}", [reason?.message || String(reason)])); return; }
        }
        setError(tr('当前 DSH 版本不支持直接跳转会话；请从左侧会话列表打开。'));
      };

      // ---------- filling tasks into the session composer ----------
      const applyFill = async (sessionId, text) => {
        const entry = composerRegistry.get(sessionId);
        if (!entry) { setFallbackText(text); setFill({ sessionId, prompt: text, phase: 'fallback', reason: tr('会话输入框已关闭，任务放在这里，可修改后直接发送。') }); return; }
        const phase = entry.readPhase?.();
        if (phase && phase !== 'plain') { setFallbackText(text); setFill({ sessionId, prompt: text, phase: 'fallback', reason: tr('会话输入框正在提交上一条消息，暂时不能编辑；任务放在这里，可修改后直接发送。') }); return; }
        try { entry.setDraft(text); }
        catch (reason) { setFallbackText(text); setFill({ sessionId, prompt: text, phase: 'fallback', reason: trf("没能写入会话输入框（{0}）；任务放在这里，可修改后直接发送。", [reason?.message || reason]) }); return; }
        const verifiable = entry.readDraft?.() !== undefined;
        const ok = !verifiable || await waitUntil(() => sameText(entry.readDraft?.(), text), 1500);
        if (!ok) { setFallbackText(text); setFill({ sessionId, prompt: text, phase: 'fallback', reason: tr('会话输入框没有接受这段任务；任务放在这里，可修改后直接发送。') }); return; }
        setFill({ sessionId, phase: 'filled' });
      };
      const fillComposer = async (sessionId, prompt) => {
        const entry = await composerRegistry.waitFor(sessionId, 8000);
        if (!entry) { setFallbackText(prompt); setFill({ sessionId, prompt, phase: 'fallback', reason: tr('会话输入框没有在 8 秒内就绪；任务放在这里，可修改后直接发送。') }); return; }
        const existing = String(entry.readDraft?.() ?? '').trim();
        if (existing && !sameText(existing, prompt)) { setFill({ sessionId, prompt, phase: 'choose' }); return; }
        await applyFill(sessionId, prompt);
      };
      const runIntent = async (item) => {
        setBusy(true); setError(''); setFill(null);
        try {
          const slotId = item.slot || (sessionList.some((row) => row.tabId === bindingSlot) ? bindingSlot : bindingTab);
          const row = await ensureSession(slotId);
          setDockOpen(true); setDockTab('assistant'); setSessionMenu(false);
          if (item.stage) setActiveStage({ sessionId: row.sessionId, stage: item.stage, label: item.stageLabel || '', baseline: item.baseline || null, phase: 'filled' });
          await fillComposer(row.sessionId, item.prompt);
        } catch (reason) {
          handleSessionError(reason);
          setDockOpen(true); setDockTab('assistant');
          setFallbackText(item.prompt); setFill({ sessionId: null, prompt: item.prompt, tab: item.tab, phase: 'unsent', reason: tr('会话没有就绪，任务没有填入。处理好会话后点「重新填入」。') });
        } finally { setBusy(false); }
      };
      const intentBindingKey = (item) => `${item.project}|${item.tab === 'writing' && item.project !== '__library__' && item.section ? writingSlot(item.section) : item.tab}`;
      useEffect(() => {
        if (!intent) return;
        if (intent.project !== project || Date.now() - intent.at > 20000) { setIntent(null); return; }
        if (intent.tab !== tab || bindingsLoading || loadedKey !== intentBindingKey(intent)) return;
        const item = intent;
        setIntent(null);
        if (bindingsFailed) { setError(tr('会话列表读取失败，任务没有填入。请点「重试加载会话」后再操作。')); return; }
        runIntent(item);
      }, [intent, tab, project, bindingsLoading, bindingsFailed, loadedKey]);
      const sendFallback = async () => {
        const target = fill?.sessionId, text = fallbackText.trim();
        if (!target || !text) return;
        const previous = submission.current;
        setBusy(true); setError('');
        try {
          await this.sessions.using(target, { source: 'controllerOperation' }, async (reference) => {
            const binding = await reference.ready, snapshot = binding.session.getSnapshot();
            if (snapshot.openState === 'error' || snapshot.removed) throw new Error(snapshot.openError?.message || tr('会话不可用'));
            let requestId = previous?.target === target && previous?.text === text ? previous.requestId : undefined;
            if (!requestId) {
              const handle = typeof binding.session.beginSubmission === 'function' ? binding.session.beginSubmission({ mode: 'queue', text, attachments: [] }) : null;
              requestId = handle?.requestId || crypto.randomUUID();
            }
            submission.current = { target, text, requestId };
            const result = await binding.session.prompt([{ type: 'text', text }], 'queue', undefined, requestId);
            if (!result.ok) throw new Error(result.error?.message || tr('发送失败'));
          });
          submission.current = null; setFill(null); setFallbackText('');
        } catch (reason) { setError(trf("发送未确认：{0}。可以重试（会沿用同一请求 ID，不会重复发送）。", [reason.message || reason])); }
        finally { setBusy(false); }
      };

      // ---------- navigation and dispatch ----------
      const goHome = (id) => {
        if (id === tab) return true;
        if (graphDirty && !window.confirm(tr('论证图有未保存修改，切换工作区将丢弃这些修改。继续吗？'))) return false;
        flushDraft();
        setShowArgument(false); setGraphDirty(false);
        setTab(id); setResearchMode('ask'); setPaletteOpen(false); setStageConfirm(null);
        setDockOpen(true); setDockTab(id === 'graph' ? 'evidence' : 'assistant');
        return true;
      };
      const dispatch = (prompt, options = {}) => {
        const targetTab = options.tab || tab;
        if (!goHome(targetTab)) return;
        setError('');
        const text = lang === 'en' && !/Please reply in English\./.test(prompt) ? `${prompt}\n\nPlease reply in English.` : prompt;
        setIntent({ tab: targetTab, project, section: targetTab === 'writing' ? section : '', prompt: text, slot: options.slot, stage: options.stage, stageLabel: options.stageLabel, baseline: options.baseline, at: Date.now() });
      };
      const switchProject = (next) => {
        if (next === project) return;
        if (graphDirty && !window.confirm(tr('论证图有未保存修改，切换项目将丢弃这些修改。继续吗？'))) return;
        flushDraft(); setGraphDirty(false); setTask('');
        setProject(next);
      };
      const switchSection = (name) => {
        if (name === section) return;
        if (graphDirty && !window.confirm(tr('论证图有未保存修改，切换章节将丢弃这些修改。继续吗？'))) return;
        flushDraft(); setGraphDirty(false); setShowArgument(false);
        setSection(name);
      };

      // Return from a DSH conversation: the header action writes an intent and selects this panel.
      const applyIntent = () => {
        const item = storage.get(INTENT_KEY, null);
        if (!item || item.library !== library || typeof item.tabId !== 'string') return;
        storage.set(INTENT_KEY, undefined);
        const base = slotBase(item.tabId);
        const nextTab = base.startsWith('writing') ? 'writing' : TAB_LABELS[base] ? base : 'graph';
        const nextSection = base.startsWith('writing@') ? base.slice(8) : '';
        const nextProject = typeof item.projectId === 'string' && item.projectId ? item.projectId : '__library__';
        rememberSlot(`${nextProject}|${nextSection ? writingSlot(nextSection) : nextTab}`, item.tabId);
        if (nextSection) { const sections = { ...(readLibraryUi(library).sections || {}) }; sections[nextProject] = nextSection; writeLibraryUi(library, { sections }); }
        flushDraft();
        if (nextProject !== projectRef.current) setProject(nextProject);
        else if (nextSection && detailRef.current?.sections?.some((row) => row.name === nextSection)) setSection(nextSection);
        setTab(nextTab); setDockOpen(true); setDockTab('assistant');
      };
      useEffect(() => {
        applyIntent();
        const onIntent = () => applyIntent();
        window.addEventListener('kp:intent', onIntent);
        return () => window.removeEventListener('kp:intent', onIntent);
      }, []);
      useEffect(() => {
        const onKey = (event) => {
          if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setPaletteOpen((value) => !value); }
          else if (event.key === 'Escape') setPaletteOpen(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
      }, []);
      useEffect(() => { if (!graphDirty) return undefined; const warn = (event) => { event.preventDefault(); event.returnValue = ''; }; window.addEventListener('beforeunload', warn); return () => window.removeEventListener('beforeunload', warn); }, [graphDirty]);
      useEffect(() => { const onHide = () => flushDraft(); window.addEventListener('pagehide', onHide); return () => { window.removeEventListener('pagehide', onHide); flushDraft(); }; }, []);

      // ---------- session activity ----------
      useEffect(() => {
        if (!activity.running) return;
        setActiveStage((stageState) => stageState && stageState.sessionId === session?.sessionId && stageState.phase === 'filled' ? { ...stageState, phase: 'running' } : stageState);
        setFill((value) => value?.phase === 'filled' ? null : value);
      }, [activity.running]);
      onSettledRef.current = async () => {
        if (tab === 'maintenance' && maintenanceStatus) api('status').then(setMaintenanceStatus).catch(() => {});
        if (tab !== 'writing' || project === '__library__') return;
        const settledSession = session?.sessionId;
        const value = await reloadProject();
        setCanvasReload((count) => count + 1);
        const row = value?.sections?.find((item) => item.name === section);
        setActiveStage((stageState) => {
          if (!stageState || stageState.sessionId !== settledSession) return stageState;
          if (!row || !stageState.baseline) return { ...stageState, phase: 'done' };
          const changed = (row.latest ?? null) !== stageState.baseline.latest || (row.graph_summary?.updated ?? null) !== stageState.baseline.graphUpdated;
          return { ...stageState, phase: changed ? 'done' : 'waiting' };
        });
      };

      // ---------- editor, drafts and revisions ----------
      useEffect(() => {
        if (!detail) return;
        if (!current) { editorKeyRef.current = ''; setDraft(''); setDraftBase(null); setDraftDirty(false); setDraftOwner(null); setDraftConflict(null); setRevisionNotice(null); return; }
        const key = `${project}|${section}`, latest = current.latest ?? null;
        if (editorKeyRef.current !== key) {
          editorKeyRef.current = key;
          const owner = draftStorageKey(library, project, section);
          setDraftOwner(owner); setRevisionNotice(null); setDraftBackup(null); setCompare(null); setEditorMode('edit'); setHistoryRev(''); setHistoryData(null);
          const stored = storage.get(owner, null);
          if (stored && typeof stored.text === 'string' && stored.text !== (current.content || '')) {
            if ((stored.base ?? null) === latest) { setDraft(stored.text); setDraftBase(latest); setDraftDirty(true); setDraftConflict(null); return; }
            setDraftConflict(stored);
          } else setDraftConflict(null);
          setDraft(current.content || ''); setDraftBase(latest); setDraftDirty(false);
          return;
        }
        if (latest !== draftBaseRef.current) {
          if (!draftDirtyRef.current) { setDraft(current.content || ''); setDraftBase(latest); setRevisionNotice(null); }
          else setRevisionNotice({ revision: latest });
        }
      }, [project, section, detail]);
      useEffect(() => {
        if (!draftOwner || !draftDirty) return undefined;
        draftPending.current = { key: draftOwner, value: { text: draft, base: draftBase, savedAt: Date.now() } };
        const timer = setTimeout(flushDraft, 400);
        return () => clearTimeout(timer);
      }, [draft, draftDirty, draftBase, draftOwner]);
      const clearStoredDraft = () => { draftPending.current = null; if (draftOwner) storage.set(draftOwner, undefined); };
      const applySavedRevision = (text, revision) => setDetail((old) => old && ({ ...old, sections: old.sections.map((row) => row.name === section ? { ...row, content: text, latest: revision, revisions: [...(row.revisions || []).filter((name) => name !== revision), revision] } : row) }));
      const saveDraft = async () => {
        if (!current || !draftDirty) return true;
        setBusy(true); setError('');
        try {
          const text = draft;
          const result = await api('saveSection', { slug: project, section, text, expected: draftBase, confirmed: true });
          clearStoredDraft();
          revisionCache.current.set(`${project}|${section}|${result.revision}`, text);
          setDraftBase(result.revision); setDraftDirty(false); setRevisionNotice(null); setDraftConflict(null);
          applySavedRevision(text, result.revision);
          setNotice(trf("已保存为 {0}（追加式修订，旧版本保留）", [result.revision]));
          refreshGraph();
          return true;
        } catch (reason) {
          const message = reason.message || String(reason);
          setError(message.includes('revision conflict') ? trf("保存冲突：其他编辑已产生新修订。草稿仍保留在本机，可先「对比最新修订」再合并。\n{0}", [message]) : message);
          return false;
        } finally { setBusy(false); }
      };
      const discardDraft = () => { if (!current) return; clearStoredDraft(); setDraft(current.content || ''); setDraftBase(current.latest ?? null); setDraftDirty(false); setRevisionNotice(null); };
      const loadNewRevision = () => {
        if (!current) return;
        setDraftBackup({ text: draft, base: draftBase });
        clearStoredDraft();
        setDraft(current.content || ''); setDraftBase(current.latest ?? null); setDraftDirty(false); setRevisionNotice(null);
      };
      const restoreBackup = () => { if (!draftBackup || !current) return; setDraft(draftBackup.text); setDraftBase(current.latest ?? null); setDraftDirty(true); setDraftBackup(null); };
      const loadRevision = async (revision) => {
        const key = `${project}|${section}|${revision}`;
        if (revisionCache.current.has(key)) return revisionCache.current.get(key);
        const value = await api('revision', { slug: project, section, revision });
        revisionCache.current.set(key, value.content);
        return value.content;
      };
      const openRevision = async (revision) => {
        setHistoryRev(revision); setHistoryBusy(true); setHistoryData(null);
        try {
          const revisions = current?.revisions || [];
          const index = revisions.indexOf(revision);
          const previous = index > 0 ? revisions[index - 1] : null;
          const [text, before] = await Promise.all([loadRevision(revision), previous ? loadRevision(previous) : Promise.resolve('')]);
          setHistoryData({ revision, previous, text, before });
        } catch (reason) { setError(reason.message || String(reason)); }
        finally { setHistoryBusy(false); }
      };
      const restoreRevision = async () => {
        if (!historyData || !current) return;
        setBusy(true); setError('');
        try {
          const text = historyData.text;
          const result = await api('saveSection', { slug: project, section, text, expected: current.latest ?? null, confirmed: true });
          revisionCache.current.set(`${project}|${section}|${result.revision}`, text);
          if (!draftDirty) { setDraft(text); setDraftBase(result.revision); }
          applySavedRevision(text, result.revision);
          setNotice(trf("已用 {0} 的内容新建修订 {1}", [historyData.revision, result.revision]));
          refreshGraph();
        } catch (reason) { setError(reason.message || String(reason)); }
        finally { setBusy(false); }
      };
      const createArgumentGraph = async () => {
        setBusy(true); setError('');
        try { await api('workspace', { command: 'graph-init', slug: project, section, confirmed: true }); await reloadProject(); setShowArgument(true); }
        catch (reason) { setError(reason.message || String(reason)); } finally { setBusy(false); }
      };
      const createSection = async () => {
        const name = newSection.trim();
        if (!SLUG_RE.test(name)) { setError(tr('章节标识须为英文小写字母、数字和短横线。')); return; }
        setBusy(true); setError('');
        try {
          await api('createSection', { slug: project, section: name, confirmed: true });
          setNewSection(''); setAddingSection(false);
          const value = await reloadProject();
          if (value?.sections?.some((row) => row.name === name)) switchSection(name);
        } catch (reason) { setError(reason.message || String(reason)); } finally { setBusy(false); }
      };
      const createPaper = async () => {
        const values = Object.fromEntries(Object.entries(newProject).map(([key, value]) => [key, value.trim()]));
        if (!SLUG_RE.test(values.slug) || !values.audience || !values.citation_style) { setError(tr('请填写英文小写短横线项目标识、目标读者和引用格式。')); return; }
        if (Object.values(values).some((value) => /[\r\n\v\f\x1c-\x1e\u0085\u2028\u2029]/.test(value))) { setError(tr('项目字段不能包含换行。')); return; }
        setBusy(true); setError('');
        try {
          await api('workspace', { command: 'create', kind: 'paper', ...values, confirmed: true });
          setShowCreate(false);
          await refreshProjects();
          flushDraft(); setTask(''); setProject(values.slug); setTab('writing');
          setNotice(trf("已创建论文项目 {0}", [values.slug]));
        } catch (reason) { setError(reason.message || String(reason)); } finally { setBusy(false); }
      };
      const checkMaintenance = async () => { setMaintenanceBusy(true); setError(''); try { setMaintenanceStatus(await api('status')); } catch (reason) { setError(reason.message || String(reason)); } finally { setMaintenanceBusy(false); } };
      const rebuildIndex = async () => { setRebuildArmed(false); setMaintenanceBusy(true); setError(''); try { await api('rebuild', { confirmed: true }); setGraphRevision((value) => value + 1); setMaintenanceStatus(await api('status')); } catch (reason) { setError(reason.message || String(reason)); } finally { setMaintenanceBusy(false); } };

      const styleNames = (() => {
        const value = styleOverride?.slug === project ? styleOverride.profile : (detail?.project?.style_profile || '');
        return String(value).split(';').map((item) => item.trim()).filter(Boolean);
      })();
      const styleText = styleNames.length ? styleNames.map(styleLabel).join(' + ') : tr('通用学术');
      const projectInfo = detail?.project || {};
      const analysisText = detail?.analysis || '';
      const textParagraphs = String(current?.content || '').split(/\n\s*\n/).map((block) => block.trim()).filter((block) => block && !block.startsWith('<!--') && !/^#{1,6}\s/.test(block)).length;
      const infoLine = [projectInfo.kind, projectInfo.audience ? trf("读者 {0}", [projectInfo.audience]) : '', projectInfo.venue, projectInfo.language, projectInfo.citation_style].filter(Boolean).join(' · ');
      const graphInfo = liveGraph ? liveGraph.graph_summary : (current?.graph_summary ?? null);
      const graphAvailable = liveGraph ? Boolean(liveGraph.graph_available) : Boolean(current?.graph_available);
      const graphMeta = graphInfo && !graphInfo.error ? graphInfo : null;
      const graphNodes = graphMeta?.nodes || 0;
      const missingEvidence = graphMeta?.without_evidence || 0;
      const pendingEvidence = graphMeta?.pending_evidence || 0;
      const evidenceGaps = missingEvidence + pendingEvidence;
      const graphRewrite = graphMeta?.rewrite || 0;
      const graphStale = Boolean(graphMeta?.stale);
      const stage = graphStale || !graphAvailable || graphNodes === 0 ? 1 : missingEvidence > 0 ? 2 : (graphRewrite > 0 || !current?.latest) ? 3 : 4;
      const analysisLabel = current?.latest ? tr('① 段落分析') : tr('① 分析这一节');
      const analysisDesc = current?.latest ? tr('按自然段拆解已有正文，重建论证图；不改正文。') : tr('先分析行文逻辑与语言风格，生成论证图；这一步不写正文。');
      const stageActions = [
        { id: 1, label: analysisLabel, desc: analysisDesc, enabled: true },
        { id: 2, label: tr('② 按图取证'), desc: tr('为每个节点挂 Claim；没有证据的节点在图上标「待补」，不编造。'), enabled: graphAvailable && graphNodes > 0 },
        { id: 3, label: tr('③ 按图写'), desc: tr('每段一个节点，只用节点上已挂的 Claim；写作规则 1–16。'), enabled: graphAvailable && graphNodes > 0 },
        { id: 4, label: tr('④ 检查并保存'), desc: tr('独立审阅；逐条规则报告；最多两轮修订，保存为新的 rNNN。'), enabled: Boolean(current?.latest) },
      ];
      const styleLine = lp(`写作风格：${styleNames.length ? styleNames.join('; ') : '未指定（通用学术散文）'}；语言：${projectInfo.language || 'en'}；引用：${projectInfo.citation_style || 'apa'}`, `Style: ${styleNames.length ? styleNames.join('; ') : 'not set (general academic prose)'}; language: ${projectInfo.language || 'en'}; citations: ${projectInfo.citation_style || 'apa'}`);
      const stageCommon = lp(`项目 ${project} · 章节 ${section}。${styleLine}。\n本阶段只做这一件事，不要跳到下一阶段；完成后说明产物、仍待补的节点和需要作者决定的事。`, `Project ${project} · section ${section}. ${styleLine}.\nDo only this stage and do not move on to the next; when done, report what you produced, which nodes still need evidence, and what the author must decide.`);
      const stagePrompts = {
        1: lp(`请执行 /palace write ${project} ${section}。\n阶段 1/4 · 分析：先完成 manuscript analysis（行文逻辑 + 语言风格），再生成或更新论证图 outline/graph-${section}.html 与 outline/manuscript-analysis.md。把所选风格解析成本节 5–8 条可执行规则（句式节奏、措辞与 hedge、语气、venue apparatus）。本阶段不要写正文，也不要保存修订。\n${stageCommon}`, `Run /palace write ${project} ${section}.\nStage 1/4 · Analysis: complete the manuscript analysis (reasoning flow + language style), then create or update the argument graph outline/graph-${section}.html and outline/manuscript-analysis.md. Turn the chosen style into 5–8 actionable rules for this section (sentence rhythm, wording and hedging, tone, venue apparatus). Do not write prose and do not save a revision in this stage.\n${stageCommon}`),
        2: lp(`请执行 /palace write ${project} ${section}。\n阶段 2/4 · 按图取证：读取论证图，为每个节点用 palace_research（view ask, project=${project}）找有界证据并挂 Claim；没有证据的节点在 evidence 字段写「待补」，不要编造。更新图页；不写正文。\n${stageCommon}`, `Run /palace write ${project} ${section}.\nStage 2/4 · Evidence by graph: read the argument graph and, for each node, use palace_research (view ask, project=${project}) to find bounded evidence and attach Claims; for a node without evidence write "pending" in its evidence field and invent nothing. Update the graph page; do not write prose.\n${stageCommon}`),
        3: lp(`请执行 /palace write ${project} ${section}。\n阶段 3/4 · 按图写：用 graph 读回图页，只重写 changes 标出的段落；未改动段落保留现有 rNNN 原文。每段一个节点，只使用节点 evidence 中的 Claim；图缺节点或关系时先改图再改文。遵守 palace-writing 的规则 1–16 与已解析的风格规则，用 workspace revise 保存为新的 rNNN 修订，并用 graph --written 标记正文已按该图写。若 changes 为空，说明无需重写，不要重写整节。\n${stageCommon}`, `Run /palace write ${project} ${section}.\nStage 3/4 · Write from the graph: read the page back with graph and rewrite only the paragraphs that changes marks; keep unchanged paragraphs as they are in the current rNNN. One node per paragraph, using only the Claims in the node's evidence; if the graph lacks a node or relation, change the graph before the text. Follow palace-writing rules 1–16 and the resolved style rules, save a new rNNN revision with workspace revise, and mark the text as following the graph with graph --written. If changes is empty, say no rewrite is needed and do not rewrite the section.\n${stageCommon}`),
        4: lp(`请执行 /palace write ${project} ${section}。\n阶段 4/4 · 检查：作为独立 reviewer 审阅这一节的最新修订；逐段说明要点，并对每对相邻句说明后句承接了什么；按规则 1–16 与风格规则报告问题；最多两轮修订，修订后用 revise 保存；若论证结构未变，再用 graph --written 更新基线。\n${stageCommon}`, `Run /palace write ${project} ${section}.\nStage 4/4 · Check: review the latest revision of this section as an independent reviewer; state each paragraph's point and, for each pair of adjacent sentences, what the second takes up from the first; report problems against rules 1–16 and the style rules; revise at most twice, saving with revise; if the argument structure is unchanged, update the baseline with graph --written.\n${stageCommon}`),
      };
      const polishPrompt = lp(`请执行 /palace polish ${project} ${section}。\n最后一遍 · 按风格润色：读取这一节的最新修订，只改表达（句式、措辞、hedge、衔接），不改数字、条件、引用与科学判断；用 replace 保存为新的 rNNN 修订，保存后用 graph --written 标记正文仍按该图，并说明有实质影响的改动。\n${stageCommon}`, `Run /palace polish ${project} ${section}.\nFinal pass · Polish by style: read the latest revision of this section and change only the expression (sentence form, wording, hedging, transitions), never numbers, conditions, citations or scientific judgments; save a new rNNN revision with replace, mark the text as still following the graph with graph --written, and list any change of substance.\n${stageCommon}`);
      const paragraphPrompt = current?.latest ? lp(`请执行 /palace write ${project} ${section}。\n模式：段落分析 · 从已有正文重建论证图。\n输入：这一节的最新修订 ${current.latest}（以磁盘上的最新 rNNN 为准；编辑器里未保存的文本不算）。\n步骤：1) 按自然段切分正文，逐段给出要点（一句话）、角色（opening/middle/closing）、opening 与 landing、段内节点链与六种关系（supports/opposes/infers/qualifies/defines/associates）、段间 advances 或 parallel，以及该段已有的引用标记（<sup>…</sup> 或 [..]）。2) 把这份段落分析与发现更新进 outline/manuscript-analysis.md 的本节部分（保留作者决定与未决项），再写成 outline/graph-${section}.html：一段一组节点，opening→landing 完整；节点 evidence 填该段已有的引用编号（如 1,4，不带 <sup> 标签），没有引用的写「待补」；不要编造 Claim 或引用。3) 写入图时把 written 基线设为同一张图：正文已按它写，这是事后重建，不是让正文追赶新图。4) 不要改写正文，不要保存修订。最后报告断链、缺 opening/landing 的段落、无引用段落、段间关系不清处，作为 ④ 的输入。\n${stageCommon}`, `Run /palace write ${project} ${section}.\nMode: paragraph analysis · rebuild the argument graph from the existing text.\nInput: the latest revision of this section, ${current.latest} (the newest rNNN on disk counts; unsaved editor text does not).\nSteps: 1) Split the text into paragraphs and give for each its point (one sentence), role (opening/middle/closing), opening and landing, the node chain inside it with the six relations (supports/opposes/infers/qualifies/defines/associates), advances or parallel between paragraphs, and the citation markers it already has (<sup>…</sup> or [..]). 2) Update this section's part of outline/manuscript-analysis.md with this paragraph analysis and its findings (keep author decisions and open items), then write outline/graph-${section}.html: one node group per paragraph with a complete opening→landing; fill each node's evidence with the paragraph's existing citation numbers (e.g. 1,4, without <sup> tags) and write "pending" where there is none; do not invent Claims or citations. 3) When writing the graph, set the written baseline to the same graph: the text already follows it; this is a reconstruction, not a new graph for the text to catch up with. 4) Do not rewrite the text and do not save a revision. Finally report broken chains, paragraphs missing an opening or landing, paragraphs without citations, and unclear relations between paragraphs, as input for ④.\n${stageCommon}`) : stagePrompts[1];
      const toggleStyleProfile = (profile) => setStyleDraft((draft) => {
        if (draft.includes(profile.name)) return draft.filter((name) => name !== profile.name);
        const sameType = new Set(styleProfiles.filter((item) => item.type === profile.type).map((item) => item.name));
        return [...draft.filter((name) => !sameType.has(name)), profile.name];
      });
      const saveStyle = async () => {
        if (project === '__library__') return;
        const next = styleDraft.join(';');
        if (next === styleNames.join(';')) { setStyleOpen(false); return; }
        const to = styleDraft.length ? styleDraft.map(styleLabel).join(' + ') : tr('通用学术');
        setStyleSaving(true); setError('');
        try {
          await api('setStyle', { slug: project, profile: next, confirmed: true });
          setStyleOverride({ slug: project, profile: next });
          setStyleOpen(false);
          setStyleChanged(true);
          setNotice(trf("写作风格已改为「{0}」；只更新了 project.yaml 的 style_profile，正文没有改动。", [to]));
        } catch (reason) { setError(reason.message || String(reason)); }
        finally { setStyleSaving(false); }
      };
      const styleGroup = (type, label) => {
        const rows = styleProfiles.filter((profile) => profile.type === type);
        if (!rows.length) return null;
        return h('div', { className: 'kp-stylegroup', key: type },
          h('span', null, label),
          h('div', { className: 'kp-stylechips' }, rows.map((profile) => h('button', {
            key: profile.name,
            className: `kp-stylechip ${styleDraft.includes(profile.name) ? 'on' : ''}`,
            title: profile.description || profile.alias,
            onClick: () => toggleStyleProfile(profile),
          }, h('strong', null, styleLabel(profile.name)), h('small', null, profile.alias)))));
      };
      const stylePanel = styleOpen ? h('div', { className: 'kp-stylepanel' },
        h('div', { className: 'kp-row' }, h('strong', null, tr('选择风格')), h('span', { className: 'kp-muted' }, tr('来自库 styles/profiles；应用后只改 project.yaml 的 style_profile。增删改在 ⌘K 的「注册领域 / 风格库」。'))),
        stylesLoading ? h('p', { className: 'kp-muted' }, tr('读取风格库…')) : stylesError ? h('p', { className: 'kp-error' }, stylesError) : styleProfiles.length ? h(React.Fragment, null, styleGroup('journal', tr('期刊')), styleGroup('language', tr('语言'))) : h('p', { className: 'kp-muted' }, tr('风格库没有档案。可在维护会话里创建 profile。')),
        h('div', { className: 'kp-stylefoot' },
          h('button', { className: 'kp-button', onClick: () => setStyleDraft([]) }, tr('通用学术')),
          h('span', { className: 'kp-muted' }, tr('未选择时按通用学术散文写。')),
          h('div', { style: { flex: 1 } }),
          h('button', { className: 'kp-button', onClick: () => setStyleOpen(false) }, tr('取消')),
          h('button', { className: 'kp-button primary', disabled: styleSaving || styleDraft.join(';') === styleNames.join(';'), onClick: saveStyle }, styleSaving ? tr('保存中…') : tr('应用风格')))
      ) : null;
      const stageLabelOf = (id) => id === 'polish' ? tr('按风格润色') : (stageActions.find((action) => action.id === id)?.label || '');
      const startStage = (id, options = {}) => {
        if (project === '__library__' || !section || busy) return;
        if (id === 'polish' && !current?.latest) return;
        if (draftDirty) { setStageConfirm(null); saveDraft().then((ok) => { if (ok) setPendingStage({ id, options }); }); return; }
        if (!options.confirmed) {
          if (id === 1 && current?.latest && graphAvailable) { setStageConfirm({ id, kind: 'overwrite' }); return; }
          if (id === 3 && evidenceGaps > 0) { setStageConfirm({ id, kind: 'gaps' }); return; }
        }
        setStageConfirm(null);
        if (id === 1 || id === 4 || id === 'polish') setStyleChanged(false);
        const prompt = id === 'polish' ? polishPrompt : id === 1 ? paragraphPrompt : stagePrompts[id];
        dispatch(prompt, { tab: 'writing', stage: id, stageLabel: stageLabelOf(id), baseline: { latest: current?.latest ?? null, graphUpdated: graphMeta?.updated ?? null } });
      };
      useEffect(() => {
        if (!pendingStage || draftDirty) return;
        const item = pendingStage;
        setPendingStage(null);
        startStage(item.id, item.options);
      }, [pendingStage, draftDirty, detail]);

      const stageState = activeStage && activeStage.sessionId === session?.sessionId ? activeStage : null;
      const runLine = (() => {
        const running = activity.running;
        let text;
        if (!session) text = tr('这个章节还没有写作会话；点下一步会自动创建，并把任务填进右侧输入框。');
        else if (running) text = trf("会话运行中{0}", [stageState ? ` · ${stageLabelOf(stageState.stage)}` : '']);
        else if (stageState?.phase === 'filled') text = trf("已把「{0}」填入右侧输入框，可以修改，回车发送。", [stageLabelOf(stageState.stage)]);
        else if (stageState?.phase === 'waiting') text = tr('会话已停下，但还没写入修订或论证图，可能在等你在右侧确认。');
        else if (stageState?.phase === 'done') text = trf("「{0}」这一轮已结束，状态已自动刷新。", [stageLabelOf(stageState.stage)]);
        else text = trf("{0} · 空闲", [slotTitle(session.tabId)]);
        return h('div', { className: 'kp-runline' },
          h('i', { className: `kp-status-dot ${running ? 'run' : stageState?.phase === 'waiting' ? 'bad' : ''}` }),
          h('span', null, text),
          session ? h('button', { className: 'kp-iconbtn', onClick: () => { setDockOpen(true); setDockTab('assistant'); } }, tr('看会话')) : null);
      })();
      const stageConfirmView = stageConfirm ? h('div', { className: 'kp-inline-confirm', role: 'alert' },
        h('span', null, stageConfirm.kind === 'overwrite' ? trf("段落分析会用正文重建论证图，覆盖 outline/graph-{0}.html 的现有论点与关系；正文不变。", [section]) : trf("论证图还有 {0} 个节点没有证据或标了「待补」，继续按图写会把它们写成没有引用的断言。", [evidenceGaps])),
        h('button', { className: 'kp-button primary', disabled: busy, onClick: () => startStage(stageConfirm.id, { confirmed: true }) }, stageConfirm.kind === 'overwrite' ? tr('继续，覆盖论证图') : tr('仍然继续')),
        stageConfirm.kind === 'gaps' ? h('button', { className: 'kp-button', disabled: busy, onClick: () => startStage(2, { confirmed: true }) }, tr('先做 ②')) : null,
        h('button', { className: 'kp-button', onClick: () => setStageConfirm(null) }, tr('取消'))) : null;
      const nextAction = stageActions[stage - 1];
      const pipeline = current ? h('div', { className: 'kp-card' },
        h('div', { className: 'kp-row' }, h('strong', null, tr('写作流程')), h('span', { className: 'kp-muted' }, tr('先图后文；四步各自只做一件事')), h('div', { style: { flex: 1 } }), h('button', { className: 'kp-button', disabled: busy, onClick: refreshGraph }, tr('刷新图状态'))),
        h('div', { className: 'kp-graphmeta' },
          h('span', { className: 'kp-pill' }, graphAvailable ? trf("图 {0} 段 · {1} 节点", [graphMeta?.paragraphs ?? 0, graphNodes]) : tr('论证图未生成')),
          current.latest ? h('span', { className: 'kp-pill' }, trf("最新 {0}", [current.latest])) : h('span', { className: 'kp-pill kp-chip-warn' }, tr('尚无修订')),
          current.latest && textParagraphs ? h('span', { className: 'kp-pill' }, trf("正文 {0} 段", [textParagraphs])) : null,
          missingEvidence ? h('span', { className: 'kp-pill kp-chip-warn' }, trf("{0} 个节点未标证据", [missingEvidence])) : null,
          pendingEvidence ? h('span', { className: 'kp-pill kp-chip-warn' }, trf("{0} 个节点待补", [pendingEvidence])) : null,
          !missingEvidence && !pendingEvidence && graphNodes ? h('span', { className: 'kp-pill' }, tr('证据已挂齐')) : null,
          graphRewrite ? h('span', { className: 'kp-pill kp-chip-warn' }, trf("{0} 段图已改", [graphRewrite])) : null,
          graphStale ? h('span', { className: 'kp-pill kp-chip-warn' }, tr('正文比图新 · 建议段落分析')) : null,
          graphMeta?.reordered ? h('span', { className: 'kp-pill kp-chip-warn' }, tr('段落顺序已改')) : null,
          graphMeta?.unplaced ? h('span', { className: 'kp-pill kp-chip-warn' }, trf("{0} 个节点未归属", [graphMeta.unplaced])) : null,
          graphInfo?.error ? h('span', { className: 'kp-pill kp-chip-warn' }, graphInfo.error) : null),
        h('div', { className: 'kp-steps' }, stageActions.map((action) => h('span', { key: action.id, className: `kp-step ${stage > action.id ? 'done' : ''} ${stage === action.id ? 'on' : ''}` }, action.label))),
        h('div', { className: 'kp-next' }, h('div', null, h('strong', null, nextAction.label), h('p', null, nextAction.desc)), h('button', { className: 'kp-button primary', disabled: busy, onClick: () => startStage(stage) }, busy ? tr('处理中…') : draftDirty ? trf("先保存再{0}", [nextAction.label]) : nextAction.label)),
        stageConfirmView,
        runLine,
        h('div', { className: 'kp-row' }, h('button', { className: 'kp-button', disabled: busy || !current?.latest, onClick: () => startStage('polish') }, tr('按风格润色')), h('span', { className: 'kp-muted' }, tr('最后一遍只改表达，不改科学内容；用于 ④ 之后。'))),
        analysisText ? h('details', null, h('summary', null, tr('分析记录 · 行文逻辑与语言风格')), h('pre', { className: 'kp-analysis-text' }, analysisText)) : null,
        h('p', { className: 'kp-muted' }, tr('点击后任务会填入右侧本章节会话的输入框；可以修改，确认后回车发送。')),
        styleChanged ? h('p', { className: 'kp-warning' }, tr('风格已更新：建议重跑 ① 的分析规则，或至少重跑 ④ 的检查。')) : null,
        h('details', null, h('summary', null, tr('只做这一步')), h('div', { className: 'kp-row', style: { marginTop: 6 } }, stageActions.map((action) => h('button', { key: action.id, className: 'kp-button', disabled: busy || !action.enabled, onClick: () => startStage(action.id) }, action.label))))
      ) : null;

      const revisions = current?.revisions || [];
      const draftBytes = new TextEncoder().encode(draft).length;
      const editorBanners = h(React.Fragment, null,
        draftConflict ? h('div', { className: 'kp-banner' }, h('span', null, trf("本机有一份基于 {0} 的未保存草稿，磁盘最新为 {1}。", [draftConflict.base || tr('空白'), current?.latest || tr('空白')])),
          h('button', { className: 'kp-button', onClick: () => setCompare({ title: trf("磁盘 {0} → 本机草稿", [current?.latest || tr('空白')]), before: current?.content || '', after: draftConflict.text }) }, tr('对比')),
          h('button', { className: 'kp-button', onClick: () => { setDraft(draftConflict.text); setDraftBase(current?.latest ?? null); setDraftDirty(true); setDraftConflict(null); } }, tr('恢复草稿')),
          h('button', { className: 'kp-button', onClick: () => { clearStoredDraft(); setDraftConflict(null); } }, tr('丢弃'))) : null,
        revisionNotice ? h('div', { className: 'kp-banner' }, h('span', null, trf("会话保存了新修订 {0}，编辑器里还有你没保存的修改。", [revisionNotice.revision])),
          h('button', { className: 'kp-button', onClick: () => setCompare({ title: trf("你的草稿 → {0}", [revisionNotice.revision]), before: draft, after: current?.content || '' }) }, tr('查看差异')),
          h('button', { className: 'kp-button', onClick: loadNewRevision }, trf("载入 {0}", [revisionNotice.revision]))) : null,
        draftBackup ? h('div', { className: 'kp-banner' }, h('span', null, tr('已载入最新修订，你刚才的草稿还留着。')), h('button', { className: 'kp-button', onClick: restoreBackup }, tr('恢复刚才的草稿')), h('button', { className: 'kp-button', onClick: () => setDraftBackup(null) }, tr('不需要'))) : null,
        compare ? h('div', null, h('div', { className: 'kp-row' }, h('strong', null, compare.title), h('div', { style: { flex: 1 } }), h('button', { className: 'kp-button', onClick: () => setCompare(null) }, tr('关闭对比'))), h(DiffView, { before: compare.before, after: compare.after })) : null);
      const editView = h(React.Fragment, null,
        h('textarea', { className: 'kp-textarea', style: { minHeight: 300 }, value: draft, disabled: busy, onChange: (event) => { setDraft(event.target.value); setDraftDirty(true); }, 'aria-label': tr('章节正文编辑器') }),
        h('div', { className: 'kp-row' },
          h('button', { className: 'kp-button primary', disabled: busy || !draftDirty || draftBytes > 1048576, onClick: saveDraft }, draftDirty ? trf("保存为新修订（追加 {0}）", [nextRevisionName(current?.latest)]) : tr('正文已保存')),
          h('span', { className: 'kp-muted' }, trf("追加式修订，旧版本保留 · {0}/1048576 字节", [draftBytes])),
          draftDirty ? h('button', { className: 'kp-button', onClick: () => setCompare({ title: trf("{0} → 你的草稿", [current?.latest || tr('空白')]), before: current?.content || '', after: draft }) }, tr('对比最新修订')) : null,
          draftDirty ? h('button', { className: 'kp-button', onClick: discardDraft }, tr('放弃草稿')) : null),
        draftDirty ? h('p', { className: 'kp-warning' }, tr('有未保存修改（已暂存在本机）。写作会话只读取磁盘上的 rNNN；点下一步时会先保存为新修订。')) : null);
      const historyView = h('div', { className: 'kp-revs' },
        h('div', { className: 'kp-revlist' }, [...revisions].reverse().map((rev) => h('button', { key: rev, className: `kp-button ${rev === historyRev ? 'active' : ''}`, onClick: () => openRevision(rev) }, rev === current?.latest ? trf("{0} · 最新", [rev]) : rev))),
        h('div', null, historyBusy ? h('p', { className: 'kp-muted' }, tr('读取修订…')) : historyData ? h(React.Fragment, null,
          h('div', { className: 'kp-row' },
            h('strong', null, historyData.previous ? `${historyData.previous} → ${historyData.revision}` : trf("{0}（第一版）", [historyData.revision])),
            h('button', { className: 'kp-button', onClick: () => setCompare({ title: trf("{0} → 当前草稿", [historyData.revision]), before: historyData.text, after: draft }) }, tr('与当前草稿对比')),
            historyData.revision !== current?.latest ? h('button', { className: 'kp-button', disabled: busy, onClick: restoreRevision }, trf("以此版本新建修订 {0}", [nextRevisionName(current?.latest)])) : null),
          h(DiffView, { before: historyData.before, after: historyData.text, emptyText: tr('与上一版相同。') })) : h('p', { className: 'kp-muted' }, tr('选择左侧修订，查看它与上一版的差异。'))));
      const editorCard = current ? h('div', { className: 'kp-card' },
        h('div', { className: 'kp-row' },
          h('strong', null, tr('正文')),
          h('div', { className: 'kp-subtabs' },
            h('button', { className: editorMode === 'edit' ? 'on' : '', onClick: () => setEditorMode('edit') }, tr('编辑')),
            h('button', { className: editorMode === 'history' ? 'on' : '', disabled: !revisions.length, onClick: () => { setEditorMode('history'); if (!historyRev && revisions.length) openRevision(revisions[revisions.length - 1]); } }, trf("修订历史 · {0}", [revisions.length]))),
          h('span', { className: 'kp-muted' }, trf("最新修订 {0}", [current.latest || tr('无')]))),
        editorBanners,
        editorMode === 'history' ? historyView : editView) : null;
      const graphCard = current ? h('div', { className: 'kp-card' },
        h('div', { className: 'kp-row' }, h('strong', null, tr('章节论证图')), h('div', { style: { flex: 1 } }), graphAvailable ? h('span', { className: 'kp-pill' }, trf("{0} 节点", [graphNodes])) : null),
        h('p', { className: 'kp-muted' }, graphAvailable ? tr('论证图画布会盖住正文区域，右侧会话仍然可见；段落、论点与关系属于这一节。') : tr('还没有论证图。点 ① 分析让写作会话生成，或先创建一个空白页面手动搭图。')),
        h('div', { className: 'kp-row' }, graphAvailable ? h('button', { className: 'kp-button primary', disabled: busy, onClick: () => setShowArgument(true) }, tr('打开论证图画布')) : h('button', { className: 'kp-button', disabled: busy, onClick: createArgumentGraph }, tr('创建空白论证图')), graphAvailable ? h('span', { className: 'kp-muted' }, `outline/graph-${section}.html`) : null),
        graphAvailable && graphMeta?.updated ? h('p', { className: 'kp-muted' }, trf("页面更新于 {0} · {1} 段 · {2} 论点 · {3} 关系", [new Date(graphMeta.updated * 1000).toLocaleString(), graphMeta.paragraphs ?? 0, graphMeta.nodes ?? 0, graphMeta.edges ?? 0])) : null,
        graphAvailable && graphMeta?.stale ? h('p', { className: 'kp-warning' }, tr('正文修订比论证图新：论证图可能已过期，建议重新做段落分析或在画布中核对。')) : null
      ) : null;
      const taskCard = h('div', { className: 'kp-card' },
        h('strong', null, tr('其他写作任务')),
        h('p', { className: 'kp-muted' }, tr('会以 /palace write 路由到写作流程，并填入右侧写作会话的输入框；新建项目或元数据任务也可在这里说明。')),
        h('textarea', { className: 'kp-textarea', value: task, onChange: (e) => setTask(e.target.value), placeholder: tr('描述写作任务…') }),
        h('button', { className: 'kp-button', disabled: !task.trim() || busy, onClick: () => {
          const text = task.trim();
          const route = project !== '__library__' ? lp(`请执行 /palace write ${project}${section ? ` ${section}` : ''}。严格按写作流程：先分析行文逻辑与论证结构，再按图取证并写作；不要跳过步骤直接给草稿。`, `Run /palace write ${project}${section ? ` ${section}` : ''}. Follow the writing workflow strictly: analyse the reasoning flow and argument structure first, then gather evidence by graph and write; do not skip steps and hand back a draft.`) : lp('请先调用 palace_route 加载 palace-writing 技能，并严格按写作流程执行，不要直接给草稿。', 'First call palace_route to load the palace-writing skill, then follow the writing workflow strictly; do not hand back a draft directly.');
          dispatch(`${route}\n\n${lp('任务', 'Task')}: ${text}`, { tab: 'writing' });
          setTask('');
        } }, tr('填入写作会话')));
      const createForm = showCreate ? h('div', { className: 'kp-card' },
        h('h2', null, tr('新建论文项目')),
        h('p', { className: 'kp-muted' }, tr('填写信息后点「创建项目」；已有项目不会被覆盖。')),
        ...[['slug', tr('项目标识（英文小写与短横线）')], ['audience', tr('目标读者')], ['venue', tr('期刊或会议（可选）')], ['language', tr('语言')], ['citation_style', tr('引用格式')]].map(([key, label]) => h('label', { key, style: { display: 'block', margin: '8px 0' } }, label, h('input', { className: 'kp-input', style: { display: 'block', width: '100%', boxSizing: 'border-box' }, value: newProject[key], disabled: busy, onChange: (event) => setNewProject((value) => ({ ...value, [key]: event.target.value })) }))),
        h('div', { className: 'kp-row' }, h('button', { className: 'kp-button primary', disabled: busy, onClick: createPaper }, tr('创建项目')), h('button', { className: 'kp-button', disabled: busy, onClick: () => setShowCreate(false) }, tr('取消')))) : null;
      const sectionTone = (row) => {
        const meta = row.name === section && liveGraph ? (liveGraph.graph_available ? liveGraph.graph_summary : null) : (row.graph_available ? row.graph_summary : null);
        if (!meta || meta.error) return { tone: '', hint: tr('无论证图') };
        if (meta.stale) return { tone: 'warn', hint: tr('正文比图新') };
        if ((meta.without_evidence || 0) + (meta.pending_evidence || 0) > 0) return { tone: 'warn', hint: tr('有节点待补证据') };
        if (meta.rewrite) return { tone: 'warn', hint: tr('论证图有改动') };
        if (!row.latest) return { tone: 'warn', hint: tr('尚无修订') };
        return { tone: 'ok', hint: tr('有修订且证据挂齐') };
      };
      const sectionBar = h('div', { className: 'kp-sections', role: 'tablist', 'aria-label': tr('章节') },
        (detail?.sections || []).map((row) => { const tone = sectionTone(row); return h('button', { key: row.name, role: 'tab', 'aria-selected': row.name === section, className: `kp-section-chip ${row.name === section ? 'on' : ''}`, title: tone.hint, onClick: () => switchSection(row.name) }, h('i', { className: tone.tone }), row.name, row.latest ? h('small', null, row.latest.replace(/\.md$/, '')) : null); }),
        addingSection ? h('span', { className: 'kp-row' },
          h('input', { className: 'kp-input', autoFocus: true, value: newSection, disabled: busy, placeholder: tr('新章节标识，如 introduction'), 'aria-label': tr('新章节标识'), onChange: (event) => setNewSection(event.target.value), onKeyDown: (event) => { if (event.key === 'Enter') createSection(); else if (event.key === 'Escape') { setAddingSection(false); setNewSection(''); } } }),
          h('button', { className: 'kp-button', disabled: busy || !newSection.trim(), onClick: createSection }, tr('创建')),
          h('button', { className: 'kp-button', onClick: () => { setAddingSection(false); setNewSection(''); } }, tr('取消'))) : h('button', { className: 'kp-section-chip', disabled: busy || !detail, onClick: () => setAddingSection(true) }, tr('+ 章节')));
      const workflow = tab === 'writing' ? h('div', null,
        h('div', { className: 'kp-card' },
          h('div', { className: 'kp-writehead' },
            h('div', null, h('h2', null, project === '__library__' ? tr('写作') : project), h('p', { className: 'kp-muted' }, project === '__library__' ? tr('写作以项目为单位；先在顶栏选择项目，或新建一个论文项目。') : (infoLine || tr('项目元数据载入中…')))),
            project !== '__library__' ? h('button', { className: 'kp-stylebtn', 'aria-expanded': styleOpen, onClick: () => { setStyleDraft(styleNames); setStyleOpen((value) => !value); } }, h('small', null, tr('风格')), h('strong', null, styleText), h('small', null, '▾')) : h('button', { className: 'kp-button', onClick: () => setShowCreate(true) }, tr('新建论文项目'))),
          stylePanel,
          project !== '__library__' ? sectionBar : null,
          project !== '__library__' && detail && !current ? h('p', { className: 'kp-muted' }, tr('该项目还没有章节。用「+ 章节」创建一个，再开始 ① 分析。')) : null),
        createForm,
        project === '__library__' ? taskCard : h(React.Fragment, null, pipeline, editorCard, graphCard, taskCard)
      ) : null;
      const writeHome = h('div', { className: 'kp-home' }, workflow);

      // ---------- explore ----------
      const levelOf = (kind) => levels.find((row) => (row.node_kinds || []).includes(kind))?.level;
      const chooseNode = async (node, options = {}) => {
        if (!node?.id) { setGraphSelection(null); return; }
        const generation = ++graphSelectionGeneration.current;
        const kind = node.kind || String(node.id).split(':')[0];
        const level = Number.isInteger(node.level) ? node.level : levelOf(kind);
        const picked = { ...node, kind, level };
        setGraphSelection({ node: picked, context: null, content: null, parents: [], children: [], edges: [] });
        setNeighborhood(null); setSelectedEdge(null); setFocusMiss('');
        setScopeType((old) => old === 'relation' ? 'node' : old);
        if (!options.keepDock) { setDockOpen(true); setDockTab('evidence'); }
        if (Number.isInteger(options.historyIndex)) {
          historyRef.current = { path: historyRef.current.path, index: options.historyIndex };
          setHistoryIndex(options.historyIndex);
        } else {
          const base = historyRef.current.path.slice(0, historyRef.current.index + 1);
          if (base[base.length - 1]?.id !== picked.id) {
            const next = [...base, { id: picked.id, label: labelOf(picked), kind, level, entry_parent: options.entryParent || null }];
            historyRef.current = { path: next, index: next.length - 1 };
            setPath(next); setHistoryIndex(next.length - 1);
          }
        }
        if (options.source !== 'graph') setFocusRequest({ id: picked.id, n: Date.now() });
        try {
          const [context, content, local] = await Promise.all([
            api('graph', { operation: 'query_context', node_id: picked.id, entry_parent: options.entryParent || undefined, limit: 80 }),
            api('content', { node_id: picked.id }),
            api('neighborhood', { node_id: picked.id, citations: kind === 'work' }).catch(() => null),
          ]);
          if (generation !== graphSelectionGeneration.current) return;
          setGraphSelection({ node: picked, context, content, parents: context?.parents || [], children: pageItems(context?.children), edges: pageItems(context?.edges) });
          setNeighborhood(local);
        } catch (reason) {
          if (generation !== graphSelectionGeneration.current) return;
          setGraphSelection({ node: picked, context: null, content: { content: trf("加载证据失败：{0}", [reason?.message || String(reason)]) }, parents: [], children: [], edges: [] });
        }
      };
      const navigateHistory = (index) => { const item = path[index]; if (item) chooseNode(item, { entryParent: item.entry_parent, historyIndex: index, source: 'history' }); };
      const clearHistory = () => { historyRef.current = { path: [], index: -1 }; setPath([]); setHistoryIndex(-1); setCheckedHistory([]); };
      const onFocusResult = ({ found, nodeCount }) => setFocusMiss(found ? '' : trf("该节点不在当前加载的图中{0}，可切到「父子两跳」查看。", [nodeCount ? trf("（{0} 个节点）", [nodeCount]) : '']));
      useEffect(() => {
        if (!exploreVisited) return undefined;
        let live = true;
        setHierarchyError('');
        api('graph', { operation: 'list_hierarchies' }).then((graph) => {
          if (!live) return;
          const rows = graph.hierarchies || [];
          setHierarchies(rows);
          setHierarchyId((old) => rows.some((row) => row.id === old) ? old : (rows[0]?.id || ''));
        }).catch((reason) => { if (live) setHierarchyError(reason.message || String(reason)); });
        return () => { live = false; };
      }, [exploreVisited, graphRevision]);
      useEffect(() => {
        if (!hierarchyId) { setLevels([]); return undefined; }
        let live = true;
        api('graph', { operation: 'list_levels', hierarchy_id: hierarchyId }).then((value) => { if (live) setLevels(value.levels || []); }).catch((reason) => { if (live) setHierarchyError(reason.message || String(reason)); });
        return () => { live = false; };
      }, [hierarchyId, graphRevision]);
      const checkedKey = JSON.stringify([...new Set(path.filter((row) => checkedHistory.includes(row.id)).map((row) => row.id))]);
      useEffect(() => { setCheckedHistory((old) => old.filter((id) => path.some((row) => row.id === id))); }, [path]);
      useEffect(() => {
        let active = true;
        if (!historyFilter || exploreView !== 'layers') return () => { active = false; };
        const ids = JSON.parse(checkedKey), centers = ids.slice(0, 20);
        setHistoryNetwork(null); setHistoryNetworkMessage('');
        if (!centers.length) { setHistoryNetwork({ nodes: [], links: [] }); setHistoryNetworkState('ready'); return () => { active = false; }; }
        setHistoryNetworkState('loading');
        (async () => {
          const nodes = new Map(), links = new Map(), warnings = [];
          if (ids.length > centers.length) warnings.push(trf("仅处理前 {0}/{1} 个已勾选节点（中心节点上限 20）。", [centers.length, ids.length]));
          let droppedNodes = 0, droppedLinks = 0;
          for (const id of centers) {
            const local = await api('neighborhood', { node_id: id, max_nodes: 500, citations: id.startsWith('work:') });
            if (!active) return;
            if (local.truncated) warnings.push(trf("{0} 的邻域受限：返回 {1}/{2} 个节点。", [id, local.returned_nodes, local.total_nodes]));
            for (const warning of local.warnings || []) warnings.push(`${id}: ${warning}`);
            for (const node of [...(local.bands || [])].sort((a, b) => Math.abs(a.distance) - Math.abs(b.distance)).flatMap(pageItems)) { if (nodes.has(node.id)) continue; if (nodes.size < 500) nodes.set(node.id, node); else droppedNodes++; }
            for (const node of (local.citation?.bands || []).flatMap(pageItems)) { if (nodes.has(node.id)) continue; if (nodes.size < 500) nodes.set(node.id, node); else droppedNodes++; }
            for (const link of [...(local.links || []), ...(local.citation?.links || [])]) { if (links.has(link.id)) continue; if (links.size < 3000) links.set(link.id, link); else droppedLinks++; }
          }
          if (!active) return;
          const keptLinks = [...links.values()].filter((link) => nodes.has(link.from) && nodes.has(link.to));
          if (droppedNodes) warnings.push(trf("合并结果达到 500 节点上限，部分节点未显示（至少 {0} 次省略）。", [droppedNodes]));
          if (droppedLinks || keptLinks.length < links.size) warnings.push(trf("合并结果的连接受限或端点未显示（至少 {0} 次省略；连接上限 3000）。", [droppedLinks + links.size - keptLinks.length]));
          for (const id of centers) if (!nodes.has(id)) warnings.push(trf("中心节点 {0} 未能纳入，已达到节点上限。", [id]));
          setHistoryNetwork({ nodes: [...nodes.values()], links: keptLinks }); setHistoryNetworkMessage(warnings.join(' ')); setHistoryNetworkState('ready');
        })().catch((reason) => { if (active) { setHistoryNetworkState('error'); setHistoryNetworkMessage(reason.message || String(reason)); } });
        return () => { active = false; };
      }, [historyFilter, exploreView, checkedKey, graphRevision]);
      const hierarchy = hierarchies.find((row) => row.id === hierarchyId);
      const drawer = drawerOpen ? h('aside', { className: 'kp-explore-drawer' },
        h(GlobalSearch, { onChoose: (node) => chooseNode(node, { source: 'search' }) }),
        h('div', { className: 'kp-card' },
          h('strong', null, tr('层级结构')),
          hierarchyError ? h('p', { className: 'kp-error' }, hierarchyError) : null,
          hierarchies.length ? h('select', { className: 'kp-select', style: { width: '100%', margin: '6px 0' }, value: hierarchyId, onChange: (event) => setHierarchyId(event.target.value), 'aria-label': tr('选择层级结构') }, hierarchies.map((row) => h('option', { key: row.id, value: row.id }, row.label || row.name || row.id))) : null,
          h('p', { className: 'kp-muted' }, hierarchy?.description || tr('层级用于确定提问范围；选中节点所在的层会自动识别。')),
          levels.length ? h('div', { className: 'kp-ctx-list' }, levels.map((row) => h('span', { key: row.level, className: 'kp-pill' }, `L${row.level} · ${(row.node_kinds || []).join(' / ') || row.label || row.name || ''}`))) : null),
        h('div', { className: 'kp-card' },
          h('div', { className: 'kp-row' }, h('strong', null, tr('浏览历史')), h('span', { style: { flex: 1 } }), h('button', { className: 'kp-button', disabled: !path.length, onClick: clearHistory, title: tr('清空全部浏览历史（包括第 1 条），保留当前选中的节点') }, tr('清空'))),
          path.length ? path.map((row, index) => h('div', { key: `${row.id}-${index}`, className: 'kp-history-row' },
            h('input', { type: 'checkbox', checked: checkedHistory.includes(row.id), 'aria-label': trf("勾选 {0}", [row.label]), onChange: (event) => { const checked = event.target.checked; setCheckedHistory((old) => checked ? [...new Set([...old, row.id])] : old.filter((id) => id !== row.id)); } }),
            h('button', { className: `kp-button kp-path ${index === historyIndex ? 'active' : ''}`, title: row.id, onClick: () => navigateHistory(index) }, `${index + 1}. ${row.label}`))) : h('p', { className: 'kp-muted' }, tr('选择节点后会记在这里；历史只是浏览顺序，不代表祖先路径。')),
          h('label', { className: 'kp-row', style: { marginTop: 8 } }, h('input', { type: 'checkbox', checked: historyFilter, onChange: (event) => { setHistoryFilter(event.target.checked); if (event.target.checked) setExploreView('layers'); } }), tr('仅显示勾选节点的父子与引用两跳并集')),
          historyFilter ? h('p', { className: 'kp-muted' }, checkedHistory.length ? trf("已勾选 {0} 个节点，结果显示在「父子两跳」。", [checkedHistory.length]) : tr('请勾选上面的历史节点。')) : null)) : null;
      const layersView = historyFilter
        ? (historyNetworkState === 'loading' ? h('div', { className: 'kp-assist-empty' }, tr('正在加载历史节点邻域…'))
          : historyNetworkState === 'error' ? h('div', { className: 'kp-assist-empty' }, h('p', { className: 'kp-error' }, trf("邻域加载失败：{0}", [historyNetworkMessage])))
          : h(React.Fragment, null, historyNetworkMessage ? h('p', { className: 'kp-warning', role: 'status' }, historyNetworkMessage) : null, historyNetwork?.nodes?.length ? h(NetworkView, { data: historyNetwork, selectedId: graphSelection?.node?.id, onChoose: (node) => chooseNode(node, { source: 'layers' }), visibleKinds, setVisibleKinds, filtered: true }) : h('div', { className: 'kp-assist-empty' }, tr('请在「层级与历史」里勾选历史节点。'))))
        : neighborhood ? h(React.Fragment, null,
          h(LocalHierarchy, { data: neighborhood, title: tr('层级两跳（父子关系）'), onChoose: (node) => chooseNode(node, { source: 'layers' }), visibleKinds, setVisibleKinds, history: path, historyIndex, onHistory: navigateHistory }),
          neighborhood.citation ? h(LocalHierarchy, { data: neighborhood.citation, title: tr('引用两跳（知识流：来源 → 本文 → 后续工作）'), showNav: false, onChoose: (node) => chooseNode(node, { source: 'layers' }), visibleKinds, setVisibleKinds, history: path, historyIndex, onHistory: navigateHistory }) : (graphSelection?.node?.kind === 'work' ? h('p', { className: 'kp-muted' }, tr('没有取到这篇论文的引用两跳。')) : null))
        : h('div', { className: 'kp-assist-empty' }, graphSelection ? tr('正在加载两跳邻域…') : tr('先在全局关系图、搜索或浏览历史中选中一个节点。'));
      const exploreHome = exploreVisited ? h('div', { className: `kp-explore-layer ${tab === 'graph' ? '' : 'hidden'}`, 'aria-hidden': tab !== 'graph' },
        h('div', { className: 'kp-explore-bar' },
          h('div', { className: 'kp-subtabs' },
            h('button', { className: exploreView === 'network' ? 'on' : '', onClick: () => setExploreView('network') }, tr('全局关系图')),
            h('button', { className: exploreView === 'layers' ? 'on' : '', onClick: () => setExploreView('layers') }, tr('父子两跳'))),
          h('button', { className: 'kp-iconbtn', 'aria-expanded': drawerOpen, onClick: () => setDrawerOpen((value) => !value) }, drawerOpen ? tr('收起层级与历史') : tr('层级与历史 · 搜索')),
          h('div', { className: 'grow' }),
          focusMiss ? h('span', { className: 'kp-warning', style: { fontSize: 11 } }, focusMiss) : null,
          h('span', { className: 'kp-muted' }, graphSelection?.node ? trf("已选：{0}", [labelOf(graphSelection.node)]) : tr('点节点在右侧看证据；选中节点不会自动切换视图'))),
        h('div', { className: 'kp-explore-body' },
          drawer,
          h('div', { className: 'kp-explore-stage' },
            h('div', { className: 'kp-explore-net', style: { display: exploreView === 'network' ? 'flex' : 'none' } }, h(LiveVisualization, { onChoose: chooseNode, revision: graphRevision, focusRequest, onFocusResult, lang })),
            exploreView === 'layers' ? h('div', { className: 'kp-layers' }, layersView) : null))) : null;

      // ---------- research and maintenance ----------
      const briefPrompts = [
        [tr('入门路线'), tr('从领域背景到 5 篇必读，按依赖排序'), lp('请执行 /palace brief onboard，给出背景、前置概念与一条有目的的阅读路线。', 'Run /palace brief onboard: give the background, prerequisite concepts and a purposeful reading route.')],
        [tr('概念地图'), tr('定义、区分与常见混淆'), lp('请执行 /palace brief map，说明概念定义、区别与联系，并保留 Claim ID 与锚点。', 'Run /palace brief map: explain the concept definitions, distinctions and connections, keeping Claim IDs and anchors.')],
        [tr('问题进展'), tr('问题如何演进：进展、争议与剩余问题'), lp('请执行 /palace brief progress，按阶段说明问题演进、进展、争议与剩余问题。', 'Run /palace brief progress: describe by stage how the problem evolved, the advances, the disputes and the open questions.')],
        [tr('证据空白'), tr('缺哪条曲线、在什么条件下'), lp('请执行 /palace brief gaps，列出当前空白、条件与证据覆盖，并区分缺证据与没人做。', 'Run /palace brief gaps: list the current gaps, their conditions and evidence coverage, and separate missing evidence from work nobody has done.')],
        [tr('选题候选'), tr('从证据缺口生成可验证问题'), lp('请执行 /palace brief ideas，从现有证据缺口生成候选问题，并给出最小验证设计。', 'Run /palace brief ideas: generate candidate questions from the current evidence gaps, each with a minimal validation design.')],
        [tr('领域桥接'), tr('共享概念与跨领域可追溯路径'), lp('请执行 /palace brief bridges，列出桥接卡现状，并说明两个领域的共享概念与可追溯路径。', 'Run /palace brief bridges: list the bridge cards by status and explain the shared concepts and traceable paths between the two domains.')],
        [tr('待审更新'), tr('证据变化后需要复核的判断'), lp('请执行 /palace updates，列出待复核判断、变化的依赖与保留/修订/撤回建议。', 'Run /palace updates: list the judgments awaiting review, the dependencies that changed, and a retain/revise/withdraw suggestion for each.')],
      ];
      const briefCards = h('div', { className: 'kp-brief-grid' }, briefPrompts.map(([title, desc, prompt]) => h('button', { key: title, className: 'kp-brief-card', onClick: () => dispatch(prompt, { tab: 'research' }) }, h('strong', null, title), h('span', null, desc))));
      const researchHome = h('div', { className: 'kp-home' },
        h('div', { className: 'kp-home-head' }, h('div', null, h('h1', null, tr('研究')), h('p', { className: 'kp-lede' }, tr('先问，再读；证据留在手边。'))), h('div', { className: 'kp-subtabs' }, h('button', { className: researchMode === 'ask' ? 'on' : '', onClick: () => setResearchMode('ask') }, tr('提问')), h('button', { className: researchMode === 'collect' ? 'on' : '', onClick: () => setResearchMode('collect') }, tr('收文献')))),
        researchMode === 'collect' ? h(CandidateSearch, { onPrepare: (prompt) => dispatch(prompt, { tab: 'research' }) }) : h(EvidenceLookup, { key: project, project, onPrepare: (prompt) => dispatch(prompt, { tab: 'research' }), onOpen: (node) => chooseNode(node, { source: 'research' }), onLocate: (node) => { if (goHome('graph')) chooseNode(node, { source: 'research' }); } }),
        h('div', { className: 'kp-card', style: { marginTop: 12 } }, h('strong', null, tr('速览 · 8 种')), h('p', { className: 'kp-muted' }, tr('brief 是 view，不是证据；点一张卡，任务会填入右侧研究会话的输入框，可修改后发送。')), briefCards),
        h('div', { className: 'kp-card' }, h('strong', null, tr('待复核')), h('p', { className: 'kp-muted' }, tr('证据依赖变化时，判断会重新打开；保留、修订、撤回都需要写理由。')), h('button', { className: 'kp-button', onClick: () => dispatch(lp('请执行 /palace updates，列出待复核判断与变化依赖。', 'Run /palace updates: list the judgments awaiting review and the dependencies that changed.'), { tab: 'research' }) }, tr('查看更新'))));
      const maintenancePanel = h('div', { className: 'kp-card' },
        h('h2', null, tr('知识库状态与派生索引')),
        h('p', { className: 'kp-muted' }, tr('状态检查只读取知识库。重建仅更新可重建索引，不更改文献卡片。')),
        h('div', { className: 'kp-row' },
          h('button', { className: 'kp-button', disabled: maintenanceBusy, onClick: checkMaintenance }, maintenanceBusy ? tr('处理中…') : tr('检查库状态')),
          rebuildArmed
            ? h(React.Fragment, null, h('button', { className: 'kp-button primary', disabled: maintenanceBusy, onClick: rebuildIndex }, tr('确认重建派生索引')), h('button', { className: 'kp-button', onClick: () => setRebuildArmed(false) }, tr('取消')))
            : h('button', { className: 'kp-button', disabled: maintenanceBusy, onClick: () => setRebuildArmed(true) }, tr('重建派生索引'))),
        rebuildArmed ? h('p', { className: 'kp-warning' }, tr('重建会更新派生图谱索引（不修改文献卡片），完成后探索页会重新载入。')) : null,
        maintenanceStatus && h(React.Fragment, null, h('p', null, trf("索引：{0} · 文献：{1} · Claims：{2} · 缺失来源：{3} · 未解析引用：{4}", [maintenanceStatus.index?.status || tr('未知'), maintenanceStatus.counts?.papers ?? tr('未知'), maintenanceStatus.counts?.claims ?? tr('未知'), maintenanceStatus.missing_sources?.length ?? tr('未知'), maintenanceStatus.unresolved_refs?.length ?? tr('未知')])), h('details', null, h('summary', null, tr('查看状态详情和缺失来源')), h('pre', { style: { whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' } }, JSON.stringify(maintenanceStatus, null, 2)))));
      const maintainHome = h('div', { className: 'kp-home' },
        h('div', { className: 'kp-home-head' }, h('div', null, h('h1', null, tr('维护')), h('p', { className: 'kp-lede' }, tr('只读检查优先；写入先给变更包，再确认。'))), h('div', { className: 'kp-subtabs' }, h('button', { className: 'on' }, tr('健康')))),
        maintenancePanel,
        h('div', { className: 'kp-card' }, h('strong', null, tr('维护原则')), h('p', { className: 'kp-muted' }, tr('状态、审计与治理提案是只读的；重建索引只更新派生状态。')), h('button', { className: 'kp-button', onClick: () => dispatch(lp('请执行 /palace status，并解释索引、缺失来源与未解析引用。', 'Run /palace status and explain the index, missing sources and unresolved references.'), { tab: 'maintenance' }) }, tr('让助手检查'))));

      // ---------- evidence dock ----------
      const selection = graphSelection;
      const evidenceNode = selection?.node;
      const evidenceContent = selection?.content;
      const evidenceContext = selection?.context;
      const evidenceRefs = (() => {
        const refs = new Set();
        const add = (value) => { for (const match of String(value || '').matchAll(/claim:[a-z0-9][a-z0-9-]*#C\d+/gi)) refs.add(match[0]); };
        add(evidenceNode?.id); add(evidenceContent?.content);
        for (const edge of pageItems(evidenceContext?.edges)) { add(edge.from); add(edge.to); add(edge.id); }
        return [...refs];
      })();
      const selectedWork = evidenceNode?.kind === 'work' ? evidenceNode : null;
      const scopeOptions = [['node', tr('节点'), Boolean(evidenceNode)], ['path', tr('浏览路径'), path.length > 0], ['level', tr('层级'), Number.isInteger(evidenceNode?.level)], ['relation', tr('关系'), Boolean(selectedEdge)]];
      const askScoped = async () => {
        if (!question.trim() || !evidenceNode) return;
        const type = scopeOptions.find(([value]) => value === scopeType)?.[2] ? scopeType : 'node';
        const scope = {
          type, hierarchy_id: hierarchyId || undefined, level: Number.isInteger(evidenceNode.level) ? evidenceNode.level : undefined,
          node_id: evidenceNode.id, entry_parent: evidenceContext?.entry_parent || undefined, path: path.map((node) => node.id),
          edge_id: type === 'relation' ? selectedEdge?.id : undefined,
          filters: { view: exploreView, visible_kinds: Object.keys(visibleKinds).filter((kind) => visibleKinds[kind] !== false), visible_levels: levels.map((row) => row.level) },
        };
        try { const value = await api('questionPrompt', { question: question.trim(), scope, claim_refs: evidenceRefs }); dispatch(value.prompt, { tab }); setQuestion(''); }
        catch (reason) { setError(reason.message || String(reason)); }
      };
      const askCard = evidenceNode ? h('div', { className: 'kp-card kp-askcard' },
        h('strong', null, tr('分层提问')),
        h('p', { className: 'kp-muted' }, tr('当前选择用于确定问题动机和检索起点，不限制回答的证据范围；会话会继续扩展到父子节点、关系、引用、Claims 与其他工作。')),
        h('div', { className: 'kp-row' },
          h('span', { className: 'kp-muted' }, tr('范围')),
          h('select', { className: 'kp-select', value: scopeType, onChange: (event) => setScopeType(event.target.value), 'aria-label': tr('提问范围') }, scopeOptions.map(([value, label, enabled]) => h('option', { key: value, value, disabled: !enabled }, label))),
          scopeType === 'relation' && selectedEdge ? h('span', { className: 'kp-muted', title: selectedEdge.id }, trf("{0} 关系", [selectedEdge.kind || 'relation'])) : null,
          scopeType === 'path' ? h('span', { className: 'kp-muted' }, trf("{0} 个节点", [path.length])) : null,
          scopeType === 'level' && Number.isInteger(evidenceNode.level) ? h('span', { className: 'kp-muted' }, `L${evidenceNode.level}`) : null),
        h('textarea', { ref: questionRef, className: 'kp-textarea', value: question, onChange: (event) => setQuestion(event.target.value), placeholder: tr('输入问题，例如：这类方法在什么条件下失效？') }),
        h('button', { className: 'kp-button primary', disabled: busy || !question.trim(), onClick: askScoped }, tr('生成提问并填入会话'))) : null;
      const contextParents = pageItems(evidenceContext?.parents), contextChildren = pageItems(evidenceContext?.children), contextEdges = pageItems(evidenceContext?.edges);
      const evidenceBody = evidenceNode ? h('div', { className: 'kp-evidence' },
        h('div', { className: 'kp-evidence-head' }, h('div', { className: 'kp-kicker' }, `${evidenceNode.kind || 'node'}${Number.isInteger(evidenceNode.level) ? ` · L${evidenceNode.level}` : ''}`), h('h2', null, labelOf(evidenceNode)), h('div', { className: 'kp-evidence-meta' }, evidenceNode.id)),
        contextParents.length ? h('div', null, h('p', { className: 'kp-muted' }, tr('父节点 / 可选入口')), h('div', { className: 'kp-ctx-list' }, contextParents.map((node) => h('button', { key: node.id, className: 'kp-button', title: node.id, onClick: () => chooseNode(node, { source: 'context' }) }, labelOf(node))))) : null,
        contextChildren.length ? h('div', null, h('p', { className: 'kp-muted' }, tr('子节点')), h('div', { className: 'kp-ctx-list' }, contextChildren.map((node) => h('button', { key: node.id, className: 'kp-button', title: node.id, onClick: () => chooseNode(node, { entryParent: evidenceNode.id, source: 'context' }) }, labelOf(node))))) : null,
        contextEdges.length ? h('div', null, h('p', { className: 'kp-muted' }, tr('关系（点击后以该关系为范围提问）')), h('div', { className: 'kp-ctx-list' }, contextEdges.map((edge) => h('button', { key: edge.id, className: `kp-button ${selectedEdge?.id === edge.id ? 'active' : ''}`, title: `${edge.from} → ${edge.to}`, onClick: () => { setSelectedEdge(edge); setScopeType('relation'); setQuestion(`请基于关系 ${edge.id} 解释两个节点之间的证据、条件与不确定性。`); setTimeout(() => questionRef.current?.focus(), 0); } }, `${edge.kind || 'relation'} · ${edge.from === evidenceNode.id ? edge.to : edge.from}`)))) : null,
        askCard,
        (() => {
          const parsed = evidenceNode.kind === 'work' && evidenceContent?.content ? parseCardRecord(evidenceContent.content) : null;
          if (!parsed) return evidenceContent ? h('pre', { className: 'kp-evidence-text' }, evidenceContent.content) : h('p', { className: 'kp-muted' }, tr('正在载入卡片…'));
          return h('div', { className: 'kp-ev-structured' },
            parsed.summary ? h('p', { className: 'kp-ev-summary' }, parsed.summary) : null,
            parsed.conditions?.length ? h('div', { className: 'kp-ev-conditions' }, h('p', { className: 'kp-muted' }, trf("条件 · {0}", [parsed.conditions.length])), parsed.conditions.slice(0, 8).map((condition) => h('div', { key: condition.dimension, className: 'kp-ev-condition' }, h('b', null, condition.dimension), h('span', null, condition.value), condition.evidence ? h('small', null, trf("证据 {0}", [condition.evidence])) : null))) : null,
            parsed.claims.length ? h('div', { className: 'kp-ev-claims' }, h('p', { className: 'kp-muted' }, `Claims · ${parsed.claims.length}`), parsed.claims.slice(0, 8).map((claim) => h('div', { key: claim.id, className: 'kp-ev-claim' },
              h('div', { className: 'kp-ev-claimhead' }, h('b', null, claim.id), h('span', null, claim.anchor)),
              h('blockquote', null, claim.quote),
              claim.tags ? h('small', null, trf("标签：{0}", [claim.tags])) : null))) : null,
            parsed.gaps.length ? h('div', { className: 'kp-ev-gaps' }, h('p', { className: 'kp-muted' }, tr('关联空白')), h('div', { className: 'kp-evidence-list' }, parsed.gaps.slice(0, 8).map((gap) => h('span', { key: gap, className: 'kp-pill' }, gap.replace(/^gap-/, '').replace(/-/g, ' '))))) : null,
            h('details', { className: 'kp-ev-raw' }, h('summary', null, tr('查看原文')), h('pre', { className: 'kp-evidence-text' }, evidenceContent.content)));
        })(),
        evidenceRefs.length ? h('div', { className: 'kp-evidence-list' }, evidenceRefs.map((ref) => h('span', { key: ref, className: 'kp-pill' }, ref))) : null,
        h('div', { className: 'kp-row' },
          h('button', { className: 'kp-button primary', onClick: () => { setScopeType('node'); setSelectedEdge(null); setQuestion(`请基于节点 ${evidenceNode.id} 的证据、条件与锚点，说明可引用结论与不确定性。`); setTimeout(() => questionRef.current?.focus(), 0); } }, tr('问助手')),
          h('button', { className: 'kp-button', onClick: () => dispatch(lp(`请打开并解释 ${evidenceNode.id} 的卡片正文与来源。`, `Open ${evidenceNode.id} and explain its card text and source.`), { tab }) }, tr('打开卡片')),
          tab !== 'graph' ? h('button', { className: 'kp-button', onClick: () => { if (goHome('graph')) setFocusRequest({ id: evidenceNode.id, n: Date.now() }); } }, tr('在图中定位')) : null),
        h('p', { className: 'kp-muted', style: { marginTop: 8 } }, tr('Claim 引文保留原文、条件与锚点；原文折叠在“查看原文”。'))) : h('div', { className: 'kp-empty' }, h('strong', null, tr('证据在这里展开')), h('p', null, tr('在全局关系图、搜索或研究结果里点一个节点，Claim、引文与锚点会进入这里。')), h('button', { className: 'kp-button', onClick: () => goHome('graph') }, tr('去探索选择')));

      // ---------- assistant dock ----------
      const legacyRows = sessionList.filter((row) => row.legacy);
      const sessionOptions = (() => {
        const ordinal = new Map();
        return sessionList.map((row) => {
          const base = `${slotBase(row.tabId)}${row.legacy ? ':legacy' : ''}`;
          const count = (ordinal.get(base) || 0) + 1;
          ordinal.set(base, count);
          const status = row.status && row.status !== 'available' ? tr(' · 不可用') : row.running ? tr(' · 运行中') : '';
          return { row, label: `${slotTitle(row.tabId)}${count > 1 ? ` · ${count}` : ''}${status}${row.updatedAt ? ` · ${relativeTime(row.updatedAt)}` : ''}` };
        });
      })();
      const statusTone = !session ? '' : !sessionAvailable ? 'bad' : activity.running ? 'run' : '';
      const assistantHead = h('div', { className: 'kp-assist-head' },
        h('i', { className: `kp-status-dot ${statusTone}`, title: !session ? tr('尚无会话') : !sessionAvailable ? trf("不可用：{0}", [session.status]) : activity.running ? tr('运行中') : tr('空闲') }),
        sessionOptions.length ? h('select', { className: 'kp-select', value: bindingSlot, disabled: busy, 'aria-label': tr('选择功能会话'), onChange: (event) => { setBindingSlot(event.target.value); rememberSlot(bindingKey, event.target.value); setFill(null); } },
          !session ? h('option', { value: '' }, tr('选择会话…')) : null,
          sessionOptions.map(({ row, label }) => h('option', { key: row.tabId, value: row.tabId }, label))) : h('span', { className: 'kp-muted', style: { flex: 1 } }, bindingsLoading ? tr('读取会话…') : trf("{0} · 尚未创建", [slotTitle(bindingTab)])),
        bindingsFailed ? h('button', { className: 'kp-button', disabled: bindingsLoading, onClick: () => setBindingReload((value) => value + 1) }, tr('重试加载会话')) : null,
        h('button', { className: 'kp-iconbtn', 'aria-expanded': sessionMenu, 'aria-label': tr('会话操作'), title: tr('会话操作'), onClick: () => { setSessionMenu((value) => !value); setConfirmUnlink(false); } }, '…'));
      const assistantMenu = sessionMenu ? h('div', { className: 'kp-assist-menu' },
        h('button', { className: 'kp-button', disabled: busy || bindingsLoading || bindingsFailed || !!recovery, onClick: createAnother }, tr('新建会话')),
        session ? h('button', { className: 'kp-button', onClick: openInDsh, title: tr('在 DSH 主视图打开这个会话') }, tr('在 DSH 中打开')) : null,
        session ? (confirmUnlink
          ? h('div', { className: 'kp-inline-confirm' }, h('span', null, trf("解除当前功能与会话 {0} 的关联？原会话不会被删除。", [session.sessionId.slice(-8)])), h('button', { className: 'kp-button primary', disabled: busy, onClick: unlink }, tr('确认解除')), h('button', { className: 'kp-button', onClick: () => setConfirmUnlink(false) }, tr('取消')))
          : h('button', { className: 'kp-button', disabled: busy, onClick: () => setConfirmUnlink(true) }, tr('解除关联'))) : null,
        h('details', { open: Boolean(recovery) },
          h('summary', null, tr('按会话 ID 恢复关联')),
          recovery ? h('p', { className: 'kp-warning' }, trf("会话已创建但绑定没有保存：{0}", [recovery.sessionId])) : null,
          h('div', { className: 'kp-row' }, h('input', { className: 'kp-input', value: recoveryId, onChange: (event) => setRecoveryId(event.target.value), placeholder: tr('会话 ID'), 'aria-label': tr('待恢复的会话 ID') }), h('button', { className: 'kp-button', disabled: busy || bindingsLoading || bindingsFailed || !recoveryId.trim(), onClick: recover }, tr('关联此会话'))))) : null;
      const fillStrip = !fill ? null
        : fill.phase === 'filled' ? h('div', { className: 'kp-strip' }, h('div', { className: 'kp-row', style: { marginTop: 0 } }, h('span', { style: { flex: 1 } }, tr('任务已填入下方输入框：可以修改，确认后回车发送。')), h('button', { className: 'kp-iconbtn', onClick: () => setFill(null) }, tr('知道了'))))
        : fill.phase === 'choose' ? h('div', { className: 'kp-strip warn' }, h('div', null, tr('下方输入框里已有未发送的内容。')),
          h('div', { className: 'kp-row' },
            h('button', { className: 'kp-button primary', onClick: () => applyFill(fill.sessionId, fill.prompt) }, tr('替换为新任务')),
            h('button', { className: 'kp-button', onClick: () => { const existing = String(composerRegistry.get(fill.sessionId)?.readDraft?.() ?? '').trim(); applyFill(fill.sessionId, existing ? `${existing}\n\n${fill.prompt}` : fill.prompt); } }, tr('追加到后面')),
            h('button', { className: 'kp-button', onClick: () => { setFallbackText(fill.prompt); setFill({ ...fill, phase: 'fallback', reason: tr('已保留输入框原内容；新任务放在这里，可修改后直接发送。') }); } }, tr('保留原内容'))),
          h('small', { className: 'kp-muted' }, tr('追加时原内容会变成纯文本，里面的引用标签会转成普通文字。')))
        : h('div', { className: 'kp-strip warn' }, h('div', null, fill.reason),
          h('textarea', { className: 'kp-textarea', value: fallbackText, onChange: (event) => setFallbackText(event.target.value), 'aria-label': tr('待发送任务（可编辑）') }),
          h('div', { className: 'kp-row' },
            fill.phase === 'fallback' ? h('button', { className: 'kp-button primary', disabled: busy || !fallbackText.trim() || !fill.sessionId, onClick: sendFallback }, tr('发送到会话')) : h('button', { className: 'kp-button primary', disabled: busy || !fallbackText.trim(), onClick: () => dispatch(fallbackText, { tab: fill.tab || tab }) }, tr('重新填入')),
            h('button', { className: 'kp-button', onClick: () => { setFill(null); setFallbackText(''); } }, tr('取消'))));
      const assistantBody = !session ? h('div', { className: 'kp-assist-empty' },
          h('strong', null, slotTitle(bindingTab)),
          h('p', null, bindingsLoading ? tr('正在读取会话…') : tr('这个功能还没有会话。点下面的按钮创建；之后各个按钮的任务都会填进这里的输入框。')),
          h('button', { className: 'kp-button primary', disabled: busy || bindingsLoading || bindingsFailed, onClick: startConversation }, tr('开始对话')),
          legacyRows.length ? h('div', null, h('p', { className: 'kp-muted' }, tr('或继续使用项目级写作会话：')), legacyRows.map((row, index) => h('button', { key: row.tabId, className: 'kp-button', style: { margin: 3 }, onClick: () => { setBindingSlot(row.tabId); rememberSlot(bindingKey, row.tabId); } }, trf("项目级会话 {0} · {1}", [index + 1, row.sessionId.slice(-8)])))) : null)
        : !sessionAvailable ? h('div', { className: 'kp-assist-empty' },
          h('p', { className: 'kp-warning' }, trf("会话 {0} 不可用：{1}", [session.sessionId, session.status])),
          h('div', { className: 'kp-row' }, h('button', { className: 'kp-button', disabled: busy, onClick: createAnother }, tr('新建会话')), h('button', { className: 'kp-button', onClick: () => { setSessionMenu(true); setConfirmUnlink(true); } }, tr('解除关联'))))
        : h(EmbeddedConversation, { key: session.sessionId, sessions: this.sessions, sessionId: session.sessionId, SessionProvider, renderSlot });
      const startDockResize = (event) => {
        event.preventDefault();
        const startX = event.clientX, startWidth = dockWidth;
        const max = Math.max(360, Math.round((bodyRef.current?.clientWidth || 1200) * 0.6));
        setResizing(true);
        const move = (moveEvent) => setDockWidth(Math.round(Math.min(max, Math.max(360, startWidth + (startX - moveEvent.clientX)))));
        const up = () => { setResizing(false); window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); };
        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', up);
      };
      const dock = h('aside', { className: `kp-dock ${dockOpen ? '' : 'closed'}`, style: { width: dockWidth, maxWidth: 'calc(100% - 40px)' }, 'aria-label': tr('证据与助手') },
        h('div', { className: `kp-dock-resizer ${resizing ? 'on' : ''}`, title: tr('拖动调整宽度；双击恢复默认宽度'), onPointerDown: startDockResize, onDoubleClick: () => setDockWidth(440) }),
        h('div', { className: 'kp-dock-head' },
          h('button', { className: `kp-dock-tab ${dockTab === 'evidence' ? 'on' : ''}`, onClick: () => setDockTab('evidence') }, tr('证据')),
          h('button', { className: `kp-dock-tab ${dockTab === 'assistant' ? 'on' : ''}`, onClick: () => setDockTab('assistant') }, activity.running ? tr('助手 · 运行中') : tr('助手')),
          h('div', { className: 'grow' }),
          h('button', { className: 'kp-iconbtn', onClick: () => setDockWidth((width) => width < 600 ? Math.max(440, Math.round((bodyRef.current?.clientWidth || 1200) * 0.5)) : 440) }, dockWidth < 600 ? tr('加宽') : tr('还原宽度')),
          h('button', { className: 'kp-iconbtn', onClick: () => setDockOpen(false) }, tr('收起'))),
        dockTab === 'assistant' ? h('div', { className: 'kp-dock-body assist' }, assistantHead, assistantMenu, fillStrip, assistantBody) : h('div', { className: 'kp-dock-body' }, evidenceBody));

      // ---------- command palette ----------
      const commands = [
        { group: tr('探索'), title: tr('打开全局关系图'), hint: tr('满意版星图：领域、论文、空白与引用'), run: () => goHome('graph') },
        { group: tr('探索'), title: tr('层级与历史 · 全库搜索'), hint: tr('搜索整个索引；浏览历史与两跳并集'), run: () => { if (goHome('graph')) setDrawerOpen(true); } },
        { group: tr('研究'), title: tr('问一个问题'), hint: tr('有界检索：候选、Claim、缺口'), run: () => goHome('research') },
        ...briefPrompts.map(([title, desc, prompt]) => ({ group: tr('研究'), title: trf("速览：{0}", [title]), hint: desc, run: () => dispatch(prompt, { tab: 'research' }) })),
        { group: tr('研究'), title: tr('收文献 / 导入'), hint: tr('候选检索后确认身份、阅读深度与写入'), run: () => { if (goHome('research')) setResearchMode('collect'); } },
        { group: tr('研究'), title: tr('从当前论文往外找'), hint: selectedWork ? trf("expand：以 {0} 为根", [selectedWork.id]) : tr('先在探索中选中一篇论文'), disabled: !selectedWork, run: () => dispatch(lp(`请执行 /palace expand ${selectedWork.id}，以这篇论文为根沿引用与相关研究扩展，并说明候选与取舍。`, `Run /palace expand ${selectedWork.id}: expand from this paper along citations and related work, and explain the candidates and the choices.`), { tab: 'research' }) },
        { group: tr('写作'), title: tr('打开论文项目'), hint: tr('章节、修订与论证图'), run: () => goHome('writing') },
        { group: tr('写作'), title: tr('打开论证图画布'), hint: project !== '__library__' && section ? `${project} / ${section}` : tr('先选择项目和章节'), disabled: project === '__library__' || !section, run: () => { if (goHome('writing')) setShowArgument(true); } },
        { group: tr('写作'), title: tr('项目研究笔记'), hint: tr('问题、决策、约束与观察'), run: () => dispatch(lp('请读取项目 research.md 的研究笔记，并总结未决问题。', 'Read the project research notes in research.md and summarise the open questions.'), { tab: 'writing' }) },
        { group: tr('维护'), title: tr('库状态与索引'), hint: tr('计数、索引新鲜度、缺失来源'), run: () => goHome('maintenance') },
        { group: tr('维护'), title: tr('审计卡片'), hint: tr('锚点、孤儿标签、证据边界'), run: () => dispatch(lp('请执行 /palace audit，输出只读报告。', 'Run /palace audit and produce a read-only report.'), { tab: 'maintenance' }) },
        { group: tr('维护'), title: tr('运行治理'), hint: tr('概念晋升、别名、领域分区提案'), run: () => dispatch(lp('请执行 /palace govern，列出提案与影响清单，等待确认。', 'Run /palace govern: list the proposals and their impact, then wait for confirmation.'), { tab: 'maintenance' }) },
        { group: tr('维护'), title: tr('刷新引用'), hint: tr('显式联网；先落缓存与提案'), run: () => dispatch(lp('请解释 /palace refresh 的范围与联网代价，不要自动执行。', 'Explain the scope and network cost of /palace refresh; do not run it.'), { tab: 'maintenance' }) },
        { group: tr('维护'), title: tr('导出只读 Viewer'), hint: tr('一个自包含离线 HTML'), run: () => dispatch(lp('请执行 /palace viewer export，输出单文件离线 HTML。', 'Run /palace viewer export to produce a single offline HTML file.'), { tab: 'maintenance' }) },
        { group: tr('维护'), title: tr('导出 Obsidian Wiki'), hint: tr('只更新标记过的 hub'), run: () => dispatch(lp('请执行 /palace wiki export，只更新标记过的 hub。', 'Run /palace wiki export and update only the marked hubs.'), { tab: 'maintenance' }) },
        { group: tr('维护'), title: tr('注册领域 / 风格库'), hint: tr('扩展知识库的两个入口'), run: () => dispatch(lp('请列出当前领域与风格库状态；注册新领域需要先提案再确认。', 'List the current domains and the style library; registering a new domain needs a proposal and confirmation first.'), { tab: 'maintenance' }) },
      ];
      const paletteQueryText = paletteQuery.trim().toLowerCase();
      const filteredCommands = commands.filter((command) => !paletteQueryText || `${command.title} ${command.hint} ${command.group}`.toLowerCase().includes(paletteQueryText));
      const paletteGroups = [...new Set(filteredCommands.map((command) => command.group))];
      const runCommand = (command) => { if (command.disabled) return; setPaletteOpen(false); command.run(); };
      const palette = paletteOpen ? h('div', { className: 'kp-palette-scrim', onClick: () => setPaletteOpen(false) },
        h('div', { className: 'kp-palette', role: 'dialog', 'aria-modal': 'true', 'aria-label': tr('命令面板'), onClick: (event) => event.stopPropagation() },
          h('input', { autoFocus: true, value: paletteQuery, placeholder: tr('搜索命令、brief 或维护动作…'), 'aria-label': tr('搜索命令'), onChange: (event) => setPaletteQuery(event.target.value), onKeyDown: (event) => { const first = filteredCommands.find((command) => !command.disabled); if (event.key === 'Enter' && first) { event.preventDefault(); runCommand(first); } } }),
          h('div', { className: 'kp-palette-list' }, filteredCommands.length ? paletteGroups.map((group) => h(React.Fragment, { key: group }, h('div', { className: 'kp-palette-group' }, group), filteredCommands.filter((command) => command.group === group).map((command) => h('button', { key: command.title, className: 'kp-palette-item', disabled: Boolean(command.disabled), onClick: () => runCommand(command) }, h('strong', null, command.title), h('span', null, command.hint))))) : h('div', { className: 'kp-palette-empty' }, tr('没有匹配的命令。试试「空白」「速览」或「导出」。'))))) : null;

      // ---------- shell ----------
      const topbar = h('header', { className: 'kp-topbar' },
        h('div', { className: 'kp-brand' }, h(Icon, { size: 22 }), h('strong', null, tr('知识宫殿')), h('span', null, 'RESEARCH WORKSPACE')),
        h('select', { className: 'kp-select', value: library, disabled: busy || maintenanceBusy, 'aria-label': tr('选择知识库'), onChange: (event) => { const next = event.target.value; if (next === library) return; if (graphDirty && !window.confirm(tr('论证图有未保存修改，切换知识库将丢弃这些修改。继续吗？'))) return; flushDraft(); onLibraryChange(next); } }, h('option', { value: 'private' }, tr('私人知识库')), h('option', { value: 'demo' }, tr('演示库（干旱文献）'))),
        library === 'demo' ? h('strong', { className: 'kp-warning', role: 'status' }, tr('演示库：引用前请核对卡片与来源')) : null,
        h('select', { className: 'kp-select', value: project, disabled: busy, onChange: (event) => switchProject(event.target.value), 'aria-label': tr('选择项目') }, h('option', { value: '__library__' }, tr('知识库（未绑定项目）')), projects.map((row) => h('option', { key: row.slug, value: row.slug }, `${row.slug} · ${row.kind}`))),
        h('div', { className: 'grow' }),
        h('div', { className: 'kp-subtabs', role: 'group', 'aria-label': 'Language / 语言' }, h('button', { className: lang === 'zh' ? 'on' : '', 'aria-pressed': lang === 'zh', onClick: () => setLanguage('zh') }, '中'), h('button', { className: lang === 'en' ? 'on' : '', 'aria-pressed': lang === 'en', onClick: () => setLanguage('en') }, 'EN')),
        h('button', { className: 'kp-iconbtn', onClick: () => setPaletteOpen(true) }, tr('⌘K 命令')),
        h('button', { className: 'kp-iconbtn', 'aria-expanded': dockOpen, onClick: () => setDockOpen((value) => !value) }, dockOpen ? tr('收起右栏') : tr('证据与助手')),
        h('button', { className: 'kp-iconbtn', disabled: busy, onClick: () => { refreshProjects(); reloadProject(); refreshGraph(); setBindingReload((value) => value + 1); setCanvasReload((value) => value + 1); } }, tr('刷新')),
        h('button', { className: 'kp-iconbtn', disabled: busy, onClick: () => { if (goHome('writing')) setShowCreate(true); } }, tr('新建项目')));
      const rail = h('aside', { className: 'kp-rail', 'aria-label': tr('知识宫殿主导航') },
        h('div', { className: 'kp-rail-brand' }, h(Icon, { size: 20 }), h('span', null, 'KP')),
        Object.entries(TAB_LABELS).map(([id, label]) => h('button', { key: id, className: `kp-rail-btn ${tab === id ? 'active' : ''}`, 'aria-current': tab === id ? 'page' : undefined, onClick: () => goHome(id) }, h('span', { className: 'kp-rail-glyph' }, tr(TAB_GLYPHS[id] || '·')), h('small', null, tr(label)))),
        h('div', { className: 'kp-rail-spacer' }),
        h('button', { className: 'kp-rail-btn', onClick: () => setPaletteOpen(true) }, h('span', { className: 'kp-rail-glyph' }, '⌘'), h('small', null, tr('命令'))));
      const content = tab === 'research' ? researchHome : tab === 'writing' ? writeHome : tab === 'maintenance' ? maintainHome : null;
      const canvas = tab === 'writing' && showArgument && project !== '__library__' && section ? h(ArgumentCanvas, { project, section, api, reloadToken: canvasReload, onDirtyChange: setGraphDirty, onClose: () => { setShowArgument(false); setGraphDirty(false); } }) : null;
      const frame = h('div', { className: 'kp-frame' }, topbar,
        error ? h('div', { className: 'kp-card kp-error', style: { margin: '8px 14px 0', whiteSpace: 'pre-wrap' }, role: 'alert' }, error, ' ', h('button', { className: 'kp-iconbtn', onClick: () => setError('') }, tr('关闭'))) : null,
        notice ? h('div', { className: 'kp-notice', role: 'status' }, h('span', null, notice), h('div', { className: 'grow' }), h('button', { className: 'kp-iconbtn', onClick: () => setNotice('') }, '×')) : null,
        h('div', { className: 'kp-body', ref: bodyRef }, h('main', { className: 'kp-main' }, exploreHome, content, canvas), dock));
      return h('div', { className: 'kp-shell' }, h('style', null, CSS + SHELL_CSS + EXTRA_CSS), rail, frame, palette, resizing ? h('div', { className: 'kp-resize-shield' }) : null);
    }

    function SessionReturnAction({ useSession }) {
      useLanguage();
      const sessionId = typeof useSession === 'function' ? useSession((snapshot) => snapshot?.sessionId) : undefined;
      const [target, setTarget] = useState(null);
      useEffect(() => {
        let active = true;
        setTarget(null);
        if (!sessionId) return undefined;
        requestLibrary('private', 'sessionBindingLookup', { sessionId }).then((value) => { if (active) setTarget(value || null); }).catch(() => {});
        return () => { active = false; };
      }, [sessionId]);
      if (!target || !LIBRARIES.includes(target.library)) return null;
      return h('button', {
        type: 'button',
        title: tr('回到知识宫殿中这个会话所属的功能'),
        style: { height: 26, padding: '0 9px', borderRadius: 7, border: '1px solid var(--dsw-alias-border-l2)', background: 'var(--dsw-alias-bg-layer-2)', color: 'var(--dsw-alias-label-primary)', fontSize: 11.5, cursor: 'pointer', whiteSpace: 'nowrap' },
        onClick: () => {
          storage.set(INTENT_KEY, { ...target, at: Date.now() });
          window.dispatchEvent(new CustomEvent('kp:intent'));
          try { this.layout?.selectPanel?.('knowledge-palace'); } catch { /* the panel can still be opened from the sidebar */ }
        },
      }, trf("回到知识宫殿 · {0}", [describeBinding(target)]));
    }

    return {
      inject: ['slots', 'layout', 'uiWorkspace', 'sessions'],
      apply(ctx) {
        const BoundPanel = Panel.bind(ctx);
        const BoundReturn = SessionReturnAction.bind(ctx);
        // An explicit choice (saved or from a session intent) wins; without one, open the Private library when it is set up and the Demo library otherwise.
        const initialLibrary = () => { const pending = storage.get(INTENT_KEY, null); const preferred = pending?.library || readUi().library; return LIBRARIES.includes(preferred) ? preferred : null; };
        const SafePanel = (props) => {
          const [library, setLibrary] = useState(initialLibrary);
          useEffect(() => {
            if (library) return undefined;
            let active = true;
            requestLibrary('demo', 'libraries').then((value) => { if (active) setLibrary(value?.private?.configured ? 'private' : 'demo'); }).catch(() => { if (active) setLibrary('private'); });
            return () => { active = false; };
          }, [library]);
          useEffect(() => {
            const onIntent = () => { const pending = storage.get(INTENT_KEY, null); if (pending?.library && pending.library !== library && LIBRARIES.includes(pending.library)) { writeUiLibrary(pending.library); setLibrary(pending.library); } };
            window.addEventListener('kp:intent', onIntent);
            return () => window.removeEventListener('kp:intent', onIntent);
          }, [library]);
          const change = (next) => { writeUiLibrary(next); setLibrary(next); };
          if (!library) return null;
          return h(PanelErrorBoundary, { key: library }, h(LibraryContext.Provider, { value: library }, h(BoundPanel, { ...props, key: library, onLibraryChange: change })));
        };
        ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({ name: 'sidebar.panellist', id: 'knowledge-palace', order: 105, label: tr('知识宫殿') }, Icon));
        ctx.slots.inject('main', () => ctx.slots.register({ name: 'main', key: 'knowledge-palace', children: { 'kp.session-context': { kind: 'single', scope: 'session' } } }, SafePanel));
        ctx.slots.inject('kp.session-context', () => ctx.slots.register({ name: 'kp.session-context' }, ConversationOccurrence));
        ctx.slots.inject('conversation.session.header.actions', () => ctx.slots.register({ name: 'conversation.session.header.actions', id: 'knowledge-palace-return', order: 60, label: tr('回到知识宫殿') }, BoundReturn));
      },
    };
  },
});
