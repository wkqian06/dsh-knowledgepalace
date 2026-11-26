# KnowledgePalace Commands

Each command is an agent entrypoint handled by one skill under
`knowledge_palace/skills/`; read that skill and follow it. Only mechanical storage,
retrieval and export operations require Python. No command requires running every
role. Shared rules live in PROTOCOL.md and EVIDENCE.md. Natural-language requests
use the same routes.

| Command | Responsibility | Skill |
|---|---|---|
| `/palace init <topic> [n]` | Build or extend a topic collection; selected papers are ingested | palace-collection |
| `/palace expand <target>` | Follow references/related research from papers or an evidence hole; selected papers are ingested | palace-collection |
| `/palace ingest [<paths|dois|arxiv ids|paper-slugs>...]` | Read and create/update the corresponding paper cards | palace-ingest |
| `/palace ask <question>` | Explanation, comparison and continuing research discussion | palace-discussion |
| `/palace brief onboard [<domain>]` | Background, prerequisite concepts and a purposeful reading route | palace-discussion |
| `/palace brief map <concept>` | Concept definition, distinctions and connections | palace-discussion |
| `/palace brief progress <topic>` | Problem evolution, advances, disputes and remaining questions | palace-discussion |
| `/palace brief gaps [<domain>]` | Current gaps, conditions and evidence coverage | palace-discussion |
| `/palace brief ideas [<domain>]` | Generate candidate questions from the available evidence | palace-discussion |
| `/palace brief bridges [<domain-a> <domain-b>]` | View bridge cards by status, shared concepts and cross-domain connections | palace-discussion |
| `/palace discover [<target>]` | Investigate cross-domain bridge candidates | palace-discussion |
| `/palace idea refine <text|file>` | Develop a user idea, contribution and validation direction | palace-discussion |
| `/palace research <project>` | Maintain project questions, decisions, constraints and observations | palace-maintenance |
| `/palace write <project|materials> [<section>]` | Draft, develop an outline or substantially revise prose | palace-writing |
| `/palace polish <text|file|project>` | Improve supplied text after understanding the manuscript | palace-writing |
| `/palace feasibility <idea|file|project>` | Assess whether a design can answer the question and be executed | palace-feasibility |
| `/palace draft intro <topic>` | Existing spelling for write, introduction section | palace-writing |
| `/palace updates` | View evidence-dependent judgments awaiting review; each ingest reviews those it opened | palace-maintenance |
| `/palace updates resolve <node> <entry>` | Record a completed judgment review | palace-maintenance |
| `/palace status` | Read library counts and operational state | palace-maintenance |
| `/palace audit [<card>...]` | Review knowledge assets against source evidence | palace-maintenance |
| `/palace govern` | Propose library maintenance and related judgment updates, including domain partition | palace-maintenance |
| `/palace refresh <impact|citations|metadata> [<scope>]` | Refresh bibliographic information | palace-maintenance |
| `/palace domain add <name>` | Register a new domain and its initial concepts | palace-maintenance |
| `/palace domain list` | List registered domains | palace-maintenance |
| `/palace style ingest|status|crystallize` | Maintain style examples and profiles | palace-maintenance |
| `/palace viewer export [<output-path>]` | Export a read-only HTML view | palace-maintenance |
| `/palace wiki export [<dir>]` | Export generated Obsidian hubs | palace-maintenance |

## Mechanical commands

Run from the Framework root with `python -m <module>`; every command takes
`--config <path>` (default: the Framework-root `.palace.toml`). `--live`
authorizes network access for that call. The read-only research views (`ask`,
`progress`, `updates`, `bridges`, `novelty`, `source`) are also the
`palace_research` tool, which is how the agent calls them.

| Module | Commands | Prints | Writes |
|---|---|---|---|
| `knowledge_palace.tools.config_resolver` | print the four roots | text | nothing |
| `knowledge_palace.graph.status` | library status | JSON | nothing |
| `knowledge_palace.graph.builder` | `--rebuild` · `--check` (full payload verification) · `--check-fast` (Vault/index freshness; exit 1 when stale) · `--fingerprint` | text | Derived State index |
| `knowledge_palace.graph.port` | `list_hierarchies` · `list_levels` · `query_level` · `query_context` · `get_content` | JSON | nothing |
| `knowledge_palace.interaction.research` | `ask` (bounded reading plan; `--budget <bytes>`, `--full` for the complete context) · `progress` · `updates` (one row per judgment; a node ID or ID prefix as topic lists its entries in detail; `--budget <bytes>`, `--full` for the queue history) · `resolve` · `bridges` · `novelty` · `assess` · `partition` · `source` | JSON; `progress` Markdown | index preparation; `resolve` records a review decision |
| `knowledge_palace.expansion.collect` | `search` · `expand` · `review` · `resume` · `decide` · `record [--write]` | JSON | Derived State; `record --write` saves the run record to the Vault |
| `knowledge_palace.acquisition.ingest` | `acquire` · `save [--index]` | JSON | Source Cache (verified material); Vault paper cards and INDEX |
| `knowledge_palace.workspace.cli` | `create` · `context` · `brief` · `material` · `revise` · `replace` · `graph` · `styles` · `set-style` | JSON | Workspace project files; `graph` writes or settles the argument-graph page |
| `knowledge_palace.metadata.refresh` | `--kind citations|metadata|impact` | text | Derived State snapshots and proposal reports |
| `knowledge_palace.viewer.cli` | `[--lean] [<output.html>]` | text | one HTML file outside the four roots |
| `knowledge_palace.viewer.obsidian` | `[<dir>]` | text | marked generated wiki hubs |

Existing explicit user selection and authorization remain valid. New choices
about ambiguous identity or expanded scope require resolution, not a repeated
approval of the same papers. Network access is task-scoped: collection,
acquisition and requested external research may use providers, `web_fetch` or
downloads. Refresh only owns bibliographic refresh; it is not the only legitimate
network workflow. Govern remains read-only until approved maintenance and does not
silently fetch new literature.
