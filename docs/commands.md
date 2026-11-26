# Command reference

[English](commands.md) · [简体中文](commands.zh-CN.md)

`/palace <command> [args]` and a plain-language request take the same route. Each command is handled by one skill under `knowledge_palace/skills/`. Read-only views (`status`, `ask`, `updates`) run directly; workflow commands open a DSH-ready prompt with the contract the agent must follow.

## Agent commands

| Command | What it does | Skill |
|---|---|---|
| `/palace init <topic> [n]` | Build or extend a topic collection; selected papers are ingested | collection |
| `/palace expand <target>` | Follow references / related work from a paper or an evidence hole | collection |
| `/palace ingest [<paths\|dois\|arxiv ids\|slugs>…]` | Read and create/update paper cards | ingest |
| `/palace ask <question>` | Explanation, comparison, continuing discussion | discussion |
| `/palace brief onboard [<domain>]` | Background, prerequisites, a reading route | discussion |
| `/palace brief map <concept>` | Definition, distinctions, connections | discussion |
| `/palace brief progress <topic>` | Problem evolution, advances, disputes, open questions | discussion |
| `/palace brief gaps [<domain>]` | Current gaps, conditions, evidence coverage | discussion |
| `/palace brief ideas [<domain>]` | Candidate questions from available evidence | discussion |
| `/palace brief bridges [<a> <b>]` | Bridge cards by status, plus shared concepts and corridors between two domains | discussion |
| `/palace discover [<target>]` | Investigate cross-domain bridge candidates | discussion |
| `/palace idea refine <text\|file>` | Develop an idea, contribution, validation direction | discussion |
| `/palace research <project>` | Maintain project questions, decisions, constraints, observations | maintenance |
| `/palace write <project\|materials> [<section>]` | Draft, outline or substantially revise prose | writing |
| `/palace polish <text\|file\|project>` | Improve supplied text after understanding the manuscript | writing |
| `/palace feasibility <idea\|file\|project>` | Can the design answer the question and be executed? | feasibility |
| `/palace draft intro <topic>` | Alias of `write` for an introduction | writing |
| `/palace updates` · `updates resolve <node> <entry>` | Review judgments awaiting re-check after evidence changed | maintenance |
| `/palace status` | Counts, index freshness, missing sources | maintenance |
| `/palace audit [<card>…]` | Check cards against source evidence | maintenance |
| `/palace govern` | Propose maintenance (concept promotion, aliases, domain partition). Read-only until you approve | maintenance |
| `/palace refresh <impact\|citations\|metadata> [<scope>]` | Refresh bibliographic information | maintenance |
| `/palace domain add <name>` · `domain list` | Register / list domains | maintenance |
| `/palace style ingest\|status\|crystallize` | Maintain style examples and profiles | maintenance |
| `/palace viewer export [<path>]` | Export a read-only offline HTML view | maintenance |
| `/palace wiki export [<dir>]` | Export generated Obsidian hubs | maintenance |

## Agent tools

Available to the agent once the plugin is active:

| Tool | Purpose |
|---|---|
| `palace_route` | Load the exact workflow contract for a command |
| `palace_status` | Roots, counts, index freshness |
| `palace_research` | Bounded evidence retrieval (`ask`, `progress`, `updates`, `resolve`, `bridges`, `novelty`, `assess`, `partition`, `source`) |
| `palace_get_content` | Read one graph node's canonical content by ID |
| `palace_graph` | Navigate hierarchies, levels, context, children, siblings, relations |
| `palace_rebuild_index` | Rebuild the derived graph index |
| `palace_updates_resolve` | Record a reviewed semantic-update decision |
| `palace_workspace` | Writing-project operations (`create`, `context`, `brief`, `material`, `revise`, `replace`, `graph`) |
| `palace_ledger` | Progress list for multi-item tasks; survives context compaction |
| `palace_agent` | Assemble a read-only task for one subagent (`extractor`, `stylist`, `auditor`, `reviewer`) |

## Mechanical commands

Run from the plugin folder with `python -m <module>`. Every module takes `--config <path>`; `--live` authorizes network access for that call.

| Module | Commands | Prints | Writes |
|---|---|---|---|
| `knowledge_palace.tools.config_resolver` | print the four roots (`--check` validates) | text | nothing |
| `knowledge_palace.graph.status` | library status | JSON | nothing |
| `knowledge_palace.graph.builder` | `--rebuild` · `--check` · `--check-fast` · `--fingerprint` | text | derived index |
| `knowledge_palace.graph.port` | `list_hierarchies` · `list_levels` · `query_level` · `query_context` · `get_content` | JSON | nothing |
| `knowledge_palace.interaction.research` | `ask` · `progress` · `updates` · `resolve` · `bridges` · `novelty` · `assess` · `partition` · `source` | JSON / Markdown | index preparation; `resolve` records a decision |
| `knowledge_palace.expansion.collect` | `search` · `expand` · `review` · `resume` · `decide` · `record` | JSON | derived state |
| `knowledge_palace.acquisition.ingest` | `acquire` · `save [--index]` | JSON | source cache, paper cards |
| `knowledge_palace.workspace.cli` | `create` · `context` · `brief` · `material` · `revise` · `replace` · `graph` · `styles` · `set-style` | JSON | workspace files, argument-graph page |
| `knowledge_palace.metadata.refresh` | `--kind citations\|metadata\|impact` | text | derived snapshots |
| `knowledge_palace.viewer.cli` | `[--lean] [<output.html>]` | text | one HTML file outside the four roots |
| `knowledge_palace.viewer.obsidian` | `[<dir>]` | text | generated wiki hubs |

Authoritative source: [`knowledge_palace/protocol/COMMANDS.md`](../knowledge_palace/protocol/COMMANDS.md).
