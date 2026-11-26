---
name: palace-maintenance
description: Maintain and inspect the KnowledgePalace library and project records. Use for /palace status, updates, research <project>, audit, govern, refresh, domain add|list, style ingest|status|crystallize, viewer export and wiki export.
---
# Maintain the library

Status reads the configured stores and reports current counts, missing sources or
index state without changing authoritative content. Govern handles concrete issues
such as duplicate concepts, stale metadata, uncurated cards or pending syntheses.
Audit reads the affected evidence and reports actionable findings without a quota.
Every change these tasks propose reaches the Vault only through one packaged
confirmation; rejection changes nothing.

## Status

The status command (read-only) reports roots, live counts, index
freshness, papers/gaps INDEX parity, cards whose cached source is missing,
identity confirmations, parse errors and unresolved references (orphan tags
included). Report it; do not repair anything during status.

## Research notes and evidence updates

`research <project>` reads the project context and updates the
project's `research.md` when the user asks to retain discussion. Record
definitions, judgments, constraints and next steps. Synthesis rows declare
Claim/Gap dependencies; Observations point to registered user materials. User
results remain separate from literature Claims. Manuscript analysis lives in
`outline/manuscript-analysis.md` and is also returned in project context.
Feasibility decisions use the existing research notes, not another registry.

`updates` lists the judgments awaiting review, one row per judgment. Review them
node by node: `updates` with a node ID (or an ID prefix such as `gap:`) as the
topic gives those entries with their dependencies and the nodes and edges that
changed. When the view's note says rows were left out, narrow the prefix until
every row has been seen. After reviewing evidence and making any needed
authorized edits, record the decision with the resolve command.
Recording a decision does not edit the scientific text. Later evidence changes
can reopen it.

Updates and govern divide maintenance by scope. Each ingest reviews, through
`updates`, the entries its batch opened (palace-ingest). Govern decides what
needs the whole library: concept promotions, orphan and deprecated tags, recurring
unregistered terms, domain partition, gap rows that paper cards declare and gap
cards lack, and Gap status moves, which follow the counting rules and a
palace-auditor review (below). Govern also takes the queue entries no ingest
reviewed. Project entries are the user's research decisions under both routes.

## Audit and govern

Both use an independent audit: call `palace_agent` with role `auditor` and run
the returned task in a read-only DSH subagent, naming the absolute paths of the material, the cards it cites, their
cached source texts (the card's `local:` under the Source Cache), `PALACE.md`,
`knowledge_palace/protocol/EVIDENCE.md`, `concepts.md` and the Vault root. Without delegation, run the
same checks here under `knowledge_palace/agents/palace-auditor.md` and report them
as a same-session check.

- `audit [<card>...]`: the auditor checks verbatim anchors, orphan tags,
  `source_type` and [C]/[S]/[H] boundaries and only reports; fixes go through the
  normal confirm-then-write path.
- `govern`: scan the triggers in `PALACE.md` (concept promotions, provisional
  re-derivations, recurring unregistered terms, orphan tags, deprecated slugs)
  with grep; attach a `grep -l` impact list to each proposal. The partition
  command gives the domain partition input. Each Gap status move goes to the
  auditor with the gap card and the cited paper cards before it is proposed.
  Govern does not fetch and does not write before confirmation; confirmed
  decisions append to `governance/decisions.md`.

## Refresh

The refresh command refreshes bibliographic data (cache-first without `--live`).
Results land in
Derived State and proposal reports; card updates come back as proposals for
confirmation. `--dryrun-weights` previews weight bands.

## Domains and style library

- `domain list`: read `domains.md`. `domain add <name>`: propose a `domains.md`
  row and the initial concept rows in `concepts.md`, reusing the shared axes
  first (seed from one or two review papers through palace-ingest when useful);
  write after confirmation.
- `style ingest|status|crystallize` studies how papers are written, never what
  they claim. Feature cards live in `styles/bank/`, profiles in
  `styles/profiles/`; the templates `knowledge_palace/templates/style-bank-entry.md`
  and `style-profile.md` fix their format, the seven dimensions, support counts,
  maturity and the conflict log. `liked_aspects` and `user_note` come from the
  user verbatim; when absent, ask instead of guessing. `ingest` reads the paper or
  its card and venue and drafts a feature card. `status` reports, per profile, its
  rules, their support and what blocks crystallization. `crystallize` drafts a
  profile whose every rule cites the feature cards it rests on; support counts
  come only from those cards, and contradictions go to the conflict log. You
  propose which profiles a feature card feeds; the user confirms it. A project
  may instead select external journal or language profiles by absolute path:
  read them in place, keep their source and the user's preferences, and do not
  copy them into a second authority or declare a profile from an empty
  selection.
- Style reading through a subagent: for `style ingest` over several papers, call
  `palace_agent` with role `stylist`, one paper per task, and run the returned
  tasks in parallel read-only DSH subagents. Name in each task the absolute paths of
  the cached text (or the paper card when no text is cached), this skill file,
  `knowledge_palace/templates/style-bank-entry.md`, the existing profile names,
  the venue, and the user's `liked_aspects` and `user_note` when given. This
  context then receives the feature card drafts instead of the papers; you
  review them, settle the proposed profiles with the user and write the cards.
  Without delegation, read each paper here under the same rules. `status` and
  `crystallize` read across the whole bank and stay in this session.

## Exports

Exports prepare the current index and read through GraphQueryPort.
- `viewer export [<path>]` writes one self-contained offline HTML file (never
  inside the four roots). On a library of more than a few dozen papers use
  `--lean`: the page then carries the full text of paper, gap and bridge cards
  and the graph, without a copy of the concept registry per concept.
- `wiki export [<dir>]`
  updates only marked generated Obsidian hubs; user notes stay authoritative.

## Commands

Run from the Framework root.

- Status: `python -m knowledge_palace.graph.status`
- Project context: `python -m knowledge_palace.workspace.cli context <slug>`
- Judgments awaiting review: `palace_research` with `view: "updates"`, and with
  `topic` set to a node ID or ID prefix for those entries in detail. The whole
  queue with its event and review history:
  `python -m knowledge_palace.interaction.research updates --full`.
- Record a review decision:
  `python -m knowledge_palace.interaction.research resolve "<node>" --entry "<entry>" --decision retain|revise|withdraw --note "<reason>"`
- Domain partition input: `python -m knowledge_palace.interaction.research partition`
- Refresh:
  `python -m knowledge_palace.metadata.refresh --kind citations|metadata|impact [--scope all|<slug>|domain:<slug>] --live`
- Viewer export: `python -m knowledge_palace.viewer.cli [--lean] [<output.html>]`
- Wiki export: `python -m knowledge_palace.viewer.obsidian [<dir>]`
- Index after Gap-only or registry edits: `python -m knowledge_palace.graph.builder --rebuild`
