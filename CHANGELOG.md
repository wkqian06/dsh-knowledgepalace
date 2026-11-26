# Changelog

## 0.2.0

First public release.

- DSH sidebar panel: Explore, Ask, Collect papers, Writing, Maintain (English / 简体中文).
- `/palace` command and `palace_*` agent tools; bounded evidence retrieval.
- 3D hierarchical knowledge-graph explorer with citation arrows, year opacity and domain-focus hops.
- Writing projects with argument graphs and append-only revisions.
- Cross-domain **bridge cards** (formerly "transfer cards"): `bridges/`, `from` / `to` / `via`, bridge candidates in `ask`, `brief bridges`.
- `/palace ask` and `updates` now return the workflow contract so the model reasons and phrases the retrieval topic itself.
- Built-in demo library: 70 papers in two domains (50 on drought research, 20 on atmospheric circulation) with 604 anchored Claims, so cross-domain bridge candidates show up in `ask`; 121 citation edges (7 across the two domains) from cached OpenAlex reference lists. Cards and abstract records only — no full texts.
- `PALACE_CONFIG` and `PALACE_PYTHON` environment variables; Python discovery no longer assumes a fixed path, and a `.palace.toml` saved with a UTF-8 BOM is accepted.
- Subagents consolidated to four definitions (`extractor`, `stylist`, `auditor`, `reviewer`); `palace_agent` takes those roles, and the remaining advice lives in the skills.
- A newly created library reads as empty instead of failing: a missing `concepts.md` or `domains.md` is reported as an empty registry.
- Two demo videos (English and 简体中文) recorded in the real interface.
