"""Collection commands: provider search for ``init``, bounded citation expansion
for ``expand``.

Network lookups need ``--live`` (explicit network authorization); without it
every lookup is served from the Bibliographic Cache and a miss is reported.
Only Derived State is written, except ``record --write``, which saves the
confirmed run record into ``<vault>/expansions/``.
"""

import argparse
import json
import os
import sys
from datetime import date
from pathlib import Path

from ..acquisition.transaction import write_text
from ..graph.identity import load_vault_identity
from ..metadata.cache import BibliographicCache, RateLimiter
from ..metadata.providers import ADAPTERS, PROVIDERS, ProviderError, live_transport
from ..tools.config_resolver import resolve_roots
from ..workspace.project import SLUG
from .candidates import build_hit_index, candidate_key, vault_hit
from .engine import apply_decisions, execute, review_batch
from .record import build_record
from .run import CHECKPOINT_FILENAME, EXPANSION_DIRNAME, ExpansionRun

RECORD_FIELDS = ("title", "year", "venue", "citations", "oa_url")


def search_candidates(providers, query, limit, vault_identity):
    """Search each provider, merge records that share an identity key and mark
    records the library already holds. A failing provider becomes a warning so
    the other providers' results stay usable."""
    hit_index = build_hit_index(vault_identity)
    merged = {}
    warnings = []
    for provider in providers:
        try:
            records = provider.search(query, limit=limit)
        except ProviderError as err:
            warnings.append(str(err))
            continue
        for record in records:
            key = candidate_key(record)
            if key is None:
                warnings.append("%s returned an unidentifiable record" % provider.name)
                continue
            entry = merged.setdefault(key, {"key": key, "ids": {}, "providers": [], "in_library": None})
            for kind, value in (record.get("ids") or {}).items():
                if value:
                    entry["ids"].setdefault(kind, value)
            for field in RECORD_FIELDS:
                if entry.get(field) is None:
                    entry[field] = record.get(field)
            entry["providers"].append(provider.name)
            entry["in_library"] = entry["in_library"] or vault_hit(record, hit_index)
    return {"query": query, "results": list(merged.values()), "warnings": warnings}


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    # ---- Request ----
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--config", help="path to .palace.toml (default: nearest ancestor, then Framework root)")
    commands = parser.add_subparsers(dest="command", required=True)
    search = commands.add_parser("search", help="candidate papers for a topic query")
    search.add_argument("query")
    search.add_argument("--provider", action="append", choices=PROVIDERS,
                        help="repeatable; default openalex")
    search.add_argument("--limit", type=int, default=10)
    start = commands.add_parser("expand", help="start a bounded citation expansion from library papers")
    start.add_argument("--run", required=True, help="new run id, e.g. run-<topic>")
    start.add_argument("--scope", required=True, help="domain, topic, paper or gap the decisions serve")
    start.add_argument("--seed", action="append", required=True, help="library paper slug (repeatable)")
    start.add_argument("--depth", type=int, default=2)
    start.add_argument("--max-new", type=int, default=20)
    commands.add_parser("review", help="print a run's candidate batch").add_argument("--run", required=True)
    resume = commands.add_parser("resume", help="continue an interrupted run")
    resume.add_argument("--run", required=True)
    parser.set_defaults(live=False, mailto=None)  # review, decide and record stay offline
    for network in (search, start, resume):
        network.add_argument("--live", action="store_true", help="allow network lookups")
        network.add_argument("--mailto", default=os.environ.get("PALACE_MAILTO"))
    decide = commands.add_parser("decide", help="record scope-bound decisions from a JSON file")
    decide.add_argument("--run", required=True)
    decide.add_argument("decisions", help='JSON list: [{"key", "decision", "reason", "exploratory"}]')
    decide.add_argument("--decided-via", default="auto")
    record = commands.add_parser("record", help="render the run record; --write saves it to the Vault")
    record.add_argument("--run", required=True)
    record.add_argument("--started", default=date.today().isoformat())
    record.add_argument("--write", action="store_true")
    args = parser.parse_args()

    # ---- Roots and providers ----
    if args.command in ("expand", "resume") and not args.live:
        parser.error("%s needs --live: a cache-only run marks its seeds expanded without results" % args.command)
    roots = resolve_roots(args.config)
    fetch = live_transport() if args.live else None
    cache = BibliographicCache(roots["state_dir"])
    limiter = RateLimiter()
    identity = load_vault_identity(roots["vault_dir"])

    # ---- Command ----
    if args.command == "search":
        providers = [ADAPTERS[name](fetch=fetch, cache=cache, limiter=limiter, mailto=args.mailto)
                     for name in args.provider or ["openalex"]]
        result = search_candidates(providers, args.query, args.limit, identity)
    else:
        openalex = ADAPTERS["openalex"](fetch=fetch, cache=cache, limiter=limiter, mailto=args.mailto)
        checkpoint = Path(roots["state_dir"]) / EXPANSION_DIRNAME / args.run / CHECKPOINT_FILENAME
        if args.command == "expand":
            if not SLUG.match(args.run):
                parser.error("--run must be ASCII kebab-case, e.g. run-echo-2026")
            if checkpoint.is_file():
                parser.error("run %s already exists; use review, resume or decide" % args.run)
            run = ExpansionRun(args.run, args.scope, args.seed, depth=args.depth, max_new=args.max_new)
            execute(run, openalex, identity, roots["state_dir"])
        else:
            run = ExpansionRun.resume(roots["state_dir"], args.run)
        if args.command == "resume":
            execute(run, openalex, identity, roots["state_dir"])
        if args.command == "decide":
            apply_decisions(run, json.loads(Path(args.decisions).read_text(encoding="utf-8")),
                            decided_via=args.decided_via)
            run.checkpoint(roots["state_dir"])
        if args.command == "record":
            text = build_record(run, args.started)
            result = {"run": run.run_id, "record": text}
            if args.write:
                target = Path(roots["vault_dir"]) / "expansions" / (run.run_id + ".md")
                write_text(target, text)
                result = {"run": run.run_id, "written": str(target)}
        else:
            result = dict(review_batch(run), warnings=run.warnings)
    print(json.dumps(result, ensure_ascii=False, indent=2))
