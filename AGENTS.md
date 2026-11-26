# KnowledgePalace — Agent Contract (DSH)

Evidence-backed paper collection, reading, discussion, writing and experiment
planning, run by the DSH agent. Task instructions are the palace-* skills under
knowledge_palace/skills/; the command table is knowledge_palace/protocol/COMMANDS.md.
Load the requested skill only.

## Command routing

- init / expand → palace-collection → selected papers use palace-ingest.
- ingest (including deeper reading of existing papers) → palace-ingest.
- ask, brief views, discover, idea refine → palace-discussion.
- write / polish / draft intro → palace-writing (with its manuscript analysis).
- feasibility → palace-feasibility.
- status, updates, research, audit, govern, refresh, domain, style, viewer and
  wiki → palace-maintenance.

`/palace <command> [args]` and natural-language requests use the same routes;
`palace_route` returns the skill contract for a command (status and rebuild return
their result directly). There are no separate collect, read or discuss commands. draft intro is write's
introduction route. Direct writing/polishing/feasibility tasks do not require a
new project.

## Storage and evidence

Before writing to the library or a project, read protocol/PROTOCOL.md for the
shared storage and write rules. Resolve .palace.toml
only when library/project access is needed: vault_dir, state_dir, source_dir,
workspace_dir are relative to the configuration file, not CWD. Python helper:
knowledge_palace.tools.config_resolver. Full papers stay in Source Cache; cards
contain anchored evidence. Graph Index is derived and rebuildable.

Read protocol/EVIDENCE.md when handling Claims, conditions, relations and current
syntheses. Keep original Claim IDs, quotes and anchors. Corrections append. Store
user results as project materials, not published Claims. Citation/venue metrics
are context; scientific judgments follow evidence, design and conditions.

Every selected/adopted outside paper is ingested. Abstract/metadata-only cards state
their limits and never invent full-text findings. A completed reading updates its
paper card. Save via acquisition.transaction.save_paper and prepare the index after
the batch. Historical project-source references remain readable.

## Execution and authorization

The main agent chooses and composes skills, audits important evidence and
performs authorized writes. Existing explicit task authorization persists; do not
ask the user to reselect papers or reapprove the same scope. Resolve only material
ambiguities. Unrequested saved discussions and project creation need user intent.
A confirmation is a chat turn: present the packaged change, then stop and wait for
the user's reply.

Four subagent definitions under knowledge_palace/agents/ take over one step each:
`extractor` (read one paper and draft its card), `stylist` (read one paper for its
style), `auditor` (check material against its sources) and `reviewer` (review a
draft section). They are optional, not a mandatory sequence; the main agent may
do any of these steps itself. The `palace_agent` tool assembles the read-only
task for one of them, to be run by a DSH subagent: give it resolved absolute
paths and a bounded reading scope. A subagent returns a draft or findings and
NEVER writes, edits, or creates files.

Collection, acquisition and user-requested external research can use network tools
within their task scope: the collection and acquisition commands with `--live`,
`web_fetch` for pages and JSON APIs, and `curl -L -o` for downloads. Refresh owns
metadata refresh only. Govern does not fetch or edit automatically. Never install
a service or external skill merely to run an internal workflow.

## Mechanical core

Library retrieval is the `palace_research` tool: `view: "ask"` returns a bounded
reading plan (candidate cards with paths, a few verbatim Claims per work, gap
syntheses, relations); the cards hold the rest. Its other views are progress,
updates, resolve (records a reviewed update decision), bridges, novelty, assess,
partition and source. `palace_graph` walks the Graph Index (hierarchies, levels,
a node's context) and `palace_get_content` reads one node's evidence;
`palace_status` reports roots and index freshness; `palace_workspace` manages an
authorized writing project; and `palace_rebuild_index` rebuilds the derived index. A task with several items
(papers to ingest, sections to write) keeps its list in `palace_ledger`, which is
handed back after context compaction.

Other mechanical steps go through the commands in COMMANDS.md ("Mechanical
commands"), run from the Framework root as `python -m knowledge_palace.<module>`;
`python` is the plugin's own `.venv` (Python 3.12+; `python.js` explains how DSH
finds it). Write long inputs (card drafts, decisions, section text) to files and
pass the paths. Quote paths that contain spaces.

Reuse existing metadata, acquisition, identity, retrieval, graph, revision and export
code. Keep checks at actual parsing/write boundaries: identity, evidence references,
source preservation, correct destinations and recoverable state. Avoid new validator
scripts, internal repeated sanity checks, scores or state machines for prose tasks.

GraphQueryPort remains a five-operation read-only interface; see
knowledge_palace/protocol/GRAPH_QUERY_PORT.md. Index preparation is separate from
query evaluation. Scientific truth is evaluated from sources, not schema success.

## Git

All Git writes are user-only. Do not stage, commit, push, change branches, configure
Git or create worktrees. No Git commands target private roots. Framework inspection
may use read-only Git commands. Complete workspace edits and leave Git to the user.
