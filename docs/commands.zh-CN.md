# 命令参考

[English](commands.md) · [简体中文](commands.zh-CN.md)

`/palace <command> [args]` 与自然语言请求走同一套路由。每条命令由 `knowledge_palace/skills/` 下的一个 skill 处理。只读视图（`status`、`ask`、`updates`）直接运行；工作流命令会打开一份 DSH 就绪的提示，其中包含智能体必须遵循的契约。

## 智能体命令

| 命令 | 作用 | Skill |
|---|---|---|
| `/palace init <topic> [n]` | 构建或扩展某个主题的文献集合；选中的论文会被入库（ingest） | collection |
| `/palace expand <target>` | 从一篇论文或一处证据缺口出发，沿参考文献 / 相关工作扩展 | collection |
| `/palace ingest [<paths\|dois\|arxiv ids\|slugs>…]` | 阅读并创建/更新论文卡片 | ingest |
| `/palace ask <question>` | 解释、比较、延续讨论 | discussion |
| `/palace brief onboard [<domain>]` | 背景、前置知识、阅读路线 | discussion |
| `/palace brief map <concept>` | 定义、区分与关联 | discussion |
| `/palace brief progress <topic>` | 问题演进、进展、争议、未解问题 | discussion |
| `/palace brief gaps [<domain>]` | 当前研究空白、条件、证据覆盖 | discussion |
| `/palace brief ideas [<domain>]` | 基于现有证据的候选问题 | discussion |
| `/palace brief bridges [<a> <b>]` | 按状态列出桥接卡，以及两个领域之间的共享概念与通路 | discussion |
| `/palace discover [<target>]` | 调研跨领域桥接候选 | discussion |
| `/palace idea refine <text\|file>` | 打磨想法、贡献与验证方向 | discussion |
| `/palace research <project>` | 维护项目的问题、决策、约束与观察 | maintenance |
| `/palace write <project\|materials> [<section>]` | 起草、列提纲或大幅修改文稿 | writing |
| `/palace polish <text\|file\|project>` | 在理解稿件后改进所提供的文本 | writing |
| `/palace feasibility <idea\|file\|project>` | 该设计能否回答问题并得以执行？ | feasibility |
| `/palace draft intro <topic>` | `write` 用于撰写引言时的别名 | writing |
| `/palace updates` · `updates resolve <node> <entry>` | 复核证据变化后等待重新检查的判断 | maintenance |
| `/palace status` | 计数、索引新鲜度、缺失来源 | maintenance |
| `/palace audit [<card>…]` | 对照来源证据检查卡片 | maintenance |
| `/palace govern` | 提出维护提案（概念晋升、别名、领域分区）。在你批准之前保持只读 | maintenance |
| `/palace refresh <impact\|citations\|metadata> [<scope>]` | 刷新文献信息 | maintenance |
| `/palace domain add <name>` · `domain list` | 注册 / 列出领域 | maintenance |
| `/palace style ingest\|status\|crystallize` | 维护风格示例与风格档案 | maintenance |
| `/palace viewer export [<path>]` | 导出只读离线 HTML 视图 | maintenance |
| `/palace wiki export [<dir>]` | 导出生成的 Obsidian hub | maintenance |

## 智能体工具

插件启用后，智能体即可使用：

| 工具 | 用途 |
|---|---|
| `palace_route` | 加载某条命令的确切工作流契约 |
| `palace_status` | 根目录、计数、索引新鲜度 |
| `palace_research` | 有界证据检索（`ask`、`progress`、`updates`、`resolve`、`bridges`、`novelty`、`assess`、`partition`、`source`） |
| `palace_get_content` | 按 ID 读取单个图节点的规范内容 |
| `palace_graph` | 浏览层级、层、上下文、子节点、同级节点、关系 |
| `palace_rebuild_index` | 重建派生图索引 |
| `palace_updates_resolve` | 记录一次经复核的语义更新决策 |
| `palace_workspace` | 写作项目操作（`create`、`context`、`brief`、`material`、`revise`、`replace`、`graph`） |
| `palace_ledger` | 多项任务的进度列表；上下文压缩后仍可恢复 |
| `palace_agent` | 为一个子代理（`extractor`、`stylist`、`auditor`、`reviewer`）组装只读任务 |

## 机械命令

在插件文件夹中用 `python -m <module>` 运行。每个模块都接受 `--config <path>`；`--live` 授权该次调用访问网络。

| 模块 | 命令 | 输出 | 写入 |
|---|---|---|---|
| `knowledge_palace.tools.config_resolver` | 打印四个根目录（`--check` 进行校验） | 文本 | 无 |
| `knowledge_palace.graph.status` | 知识库状态 | JSON | 无 |
| `knowledge_palace.graph.builder` | `--rebuild` · `--check` · `--check-fast` · `--fingerprint` | 文本 | 派生索引 |
| `knowledge_palace.graph.port` | `list_hierarchies` · `list_levels` · `query_level` · `query_context` · `get_content` | JSON | 无 |
| `knowledge_palace.interaction.research` | `ask` · `progress` · `updates` · `resolve` · `bridges` · `novelty` · `assess` · `partition` · `source` | JSON / Markdown | 准备索引；`resolve` 会记录一项决策 |
| `knowledge_palace.expansion.collect` | `search` · `expand` · `review` · `resume` · `decide` · `record` | JSON | 派生状态 |
| `knowledge_palace.acquisition.ingest` | `acquire` · `save [--index]` | JSON | 来源缓存、论文卡片 |
| `knowledge_palace.workspace.cli` | `create` · `context` · `brief` · `material` · `revise` · `replace` · `graph` · `styles` · `set-style` | JSON | 工作区文件、论证图页面 |
| `knowledge_palace.metadata.refresh` | `--kind citations\|metadata\|impact` | 文本 | 派生快照 |
| `knowledge_palace.viewer.cli` | `[--lean] [<output.html>]` | 文本 | 四个根目录之外的一个 HTML 文件 |
| `knowledge_palace.viewer.obsidian` | `[<dir>]` | 文本 | 生成的 wiki hub |

权威来源：[`knowledge_palace/protocol/COMMANDS.md`](../knowledge_palace/protocol/COMMANDS.md)。
