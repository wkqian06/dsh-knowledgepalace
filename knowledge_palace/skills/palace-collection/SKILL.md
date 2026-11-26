---
name: palace-collection
description: Build or extend a KnowledgePalace literature collection. Use for /palace init <topic> [n] and /palace expand <target> — provider search, bounded citation expansion and candidate selection; selected papers continue in palace-ingest.
---
# Build or extend a literature collection

`init <topic> [n]` starts from a topic and can extend an existing collection.
`expand <target>` starts from papers, a question or an identified evidence hole
and follows related work and citations. Both finish selected papers through
palace-ingest. `discover` is cross-domain bridge analysis, not search.

Use the user's research question, inclusion conditions and requested breadth to
choose sources and queries. Search with the commands below, and read pages the
providers do not cover with `web_fetch`; record queries, dates, source availability
and selection reasons. Citation and venue metadata are background, not scientific
quality scores. Avoid fixed quotas of classics/reviews/frontier papers when they
distort the actual question.

Match candidate identities to the library and merge repeated discoveries. When
the user names papers or delegates selection within a clear scope, proceed within
that scope. Otherwise present a bounded candidate selection once. Unselected
records remain in the existing expansion/discovery state; they are not Claims.

For selected library hits, reuse the card and read/update it when new information
is needed. For selected misses, acquire and read available material and create a
card, including explicitly limited cards when only abstracts/metadata are available.
Record unavailable full text and how it limits the requested analysis. List the
selected papers in `palace_ledger` before reading the first one, so the batch
keeps its place across context compaction.

Report selected papers, reused/new cards and source coverage. When collection was
requested by another workflow, return those stable references and resume its
original question. An existing domain never requires a second domain bootstrap.

## Commands

Run from the Framework root. `--live` is this task's network authorization.

- Topic search, merged across providers and matched to the library:
  `python -m knowledge_palace.expansion.collect search "<query>" --live --limit 20`
  (add `--provider crossref`, `--provider semanticscholar` or `--provider arxiv`;
  the default is OpenAlex). Each result carries `key`, `ids`, `in_library` (the
  existing card slug) and `oa_url` (an open-access copy). The arXiv API can refuse
  Python clients with HTTP 406; OpenAlex and Semantic Scholar also index arXiv
  preprints, and `web_fetch` can read
  `https://export.arxiv.org/api/query?search_query=all:<terms>&max_results=20`.
- Citation expansion from library papers (depth ≤ 2, `--max-new` ≤ 50):
  `python -m knowledge_palace.expansion.collect expand --run run-<topic> --scope "<scope>" --seed <paper-slug> [--seed <slug>] [--depth 2] [--max-new 20] --live`.
  It prints the candidate batch. `review --run <id>` prints it again;
  `resume --run <id> --live` continues an interrupted run. The run id is
  kebab-case and names the Vault record.
- Decisions come from the user, or from you within a scope the user delegated.
  Judge each candidate of the printed batch only from its normalized metadata
  (identity, title, abstract, venue, year, citation signal, discovery
  occurrences) against the run's scope; do not fetch full text or call providers
  to decide. Each decision is `selected`, `deferred` or `rejected`, with a
  one-line reason naming the field or occurrence it rests on. A rejection holds
  for this scope only, never as a global blacklist. Mark at most one or two
  exploratory picks per batch (`"exploratory": true`). Vault hits are
  acknowledged, never selected again for ingestion. A metadata-only candidate is
  never a next-hop seed: only ingested works, the user's roots and vault hits
  expand. When the batch exceeds the run budget, rank, cut and report what was
  cut. Write the decisions to a JSON file,
  `[{"key": "<candidate key>", "decision": "selected|deferred|rejected", "reason": "<why>", "exploratory": false}]`,
  and record them: `python -m knowledge_palace.expansion.collect decide --run <id> <decisions.json> --decided-via agent`
  (`user` when the user chose).
- After the packaged confirmation, keep the run record in the Vault:
  `python -m knowledge_palace.expansion.collect record --run <id> --write`.

Selected papers continue in palace-ingest with their DOI or arXiv id.
