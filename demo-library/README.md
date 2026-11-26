# Demo library · 演示库

**English** — A ready-to-use sample library with two domains: **drought research** (`drought-research`, 50 papers: monitoring and indices, causes and attribution, forecasting, ecological/agricultural impacts) and **atmospheric circulation** (`atmospheric-circulation`, 20 papers: Hadley cell, blocking, planetary waves, modes of variability, moisture transport, teleconnections). 70 real, DOI-verified papers and 604 anchored Claims in total. Five circulation papers carry both domains, and a few drought Claims are tagged with shared patterns, so the graph and `ask` show the fields meeting.

**中文** — 开箱即用的两领域示例库：**干旱研究**（`drought-research`，50 篇：监测与指标、成因与归因、预测、生态与农业影响）与**大气环流**（`atmospheric-circulation`，20 篇：哈得来环流、阻塞、行星波、变率模态、水汽输送、遥相关）。共 70 篇经 DOI 核验的真实文献、604 条带锚点的论点（Claim）。其中 5 篇环流论文同时带有两个领域标签，少量干旱 Claim 绑定了共享模式，因此图谱与 `ask` 能体现两个领域的交汇。

## Layout · 目录

| Path | English | 中文 |
|---|---|---|
| `vault/papers/` | Paper cards: `source` is the real DOI, `local` points to a source file | 论文卡片：`source` 为真实 DOI，`local` 指向来源文件 |
| `vault/concepts.md`, `domains.md` | Concept and domain registries | 概念与领域注册表 |
| `sources/fulltext/` | Short abstract records only (see below) | 仅简短的摘要记录（见下） |
| `state/bibliographic-cache/` | Cached OpenAlex records; their reference lists draw the citation edges (121, 7 across domains) | 缓存的 OpenAlex 记录；其参考文献列表生成引用边（121 条，其中 7 条跨领域） |
| `state/graph-index/` | Derived graph index (rebuildable) | 派生图索引（可重建） |
| `workspace/projects/demo-paper/` | **Synthetic** writing project that only shows revision history | **合成**写作项目，仅用于展示修订历史 |
| `.palace.toml` | Library config (relative paths) | 库配置（相对路径） |

## Important limits · 使用限制

- **Cards, not papers.** No PDFs or full texts are included. 19 drought cards were read from full texts that are not shipped, so `/palace status` lists them under `missing_sources`; the 20 atmospheric-circulation cards and the remaining drought cards are abstract- or metadata-level, with short abstract records included. Reading depth is per card: see `read_depth` and `source_coverage`. Verify quotes against the original paper before citing.
  **只带卡片，不带论文。** 不包含任何 PDF 或全文。19 张干旱卡片读自未随附的全文，因此 `/palace status` 会在 `missing_sources` 中列出它们；20 张大气环流卡片及其余干旱卡片为摘要级或元数据级，随附简短的摘要记录。每张卡片的阅读深度以 `read_depth` 与 `source_coverage` 为准；引用前请对照原文核对引文。
- Citation counts (`citations`) are bibliographic context at ingest time, not a measure of research quality. 书目引用数仅为入库时的书目上下文，不代表研究质量。
- Metadata-only cards contain no scientific Claims; do not infer conclusions from their titles. 仅元数据级卡片不含科学论点，不得据标题推断结论。
- `demo-paper` is synthetic text. `demo-paper` 的正文为合成文本，不是真实研究。
- This library is separate from any private library; nothing is copied between them. 本库与私人知识库互相独立，不会在两者之间复制数据。