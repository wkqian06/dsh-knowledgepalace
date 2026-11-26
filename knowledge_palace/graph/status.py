"""Library status for ``/palace status``: live counts, index freshness, INDEX
parity and cards whose cached source is missing.

Read-only: it never writes the index or any root. Counts come from the Vault
files themselves, never from a cached number.
"""

import argparse
import json
import re
import sys
from pathlib import Path

from ..tools.config_resolver import resolve_roots
from .builder import build_payload, check
from .identity import load_vault_identity

INDEX_ROW = re.compile(r"^\|\s*([a-z0-9]+(?:-[a-z0-9]+)*)\s*\|")


def index_rows(index_path):
    """Slugs listed in a papers/ or gaps/ INDEX.md table (header rows never match)."""
    if not index_path.is_file():
        return set()
    return {match.group(1) for match in map(INDEX_ROW.match, index_path.read_text(encoding="utf-8").splitlines())
            if match}


def library_status(roots):
    vault = Path(roots["vault_dir"])
    identity = load_vault_identity(vault)
    report = build_payload(vault)["identity_report"]
    freshness, detail = check(vault, roots["state_dir"])
    parity = {}
    for kind in ("papers", "gaps"):
        files = {path.stem for path in (vault / kind).glob("*.md") if path.name != "INDEX.md"}
        listed = index_rows(vault / kind / "INDEX.md")
        parity[kind] = {"files": len(files), "index_rows": len(listed),
                        "missing_rows": sorted(files - listed), "orphan_rows": sorted(listed - files)}
    return {
        "roots": {key: value.as_posix() for key, value in roots.items()},
        "counts": {"papers": report["works"], "claims": report["claims"], "gaps": report["gaps"],
                   "bridges": report["bridges"], "briefs": report["briefs"],
                   "style_cards": len(list((vault / "styles" / "bank").glob("*.md"))),
                   "style_profiles": len(list((vault / "styles" / "profiles").glob("*.md"))),
                   "concepts": len(identity["registry"]), "domains": len(identity["domains"])},
        "index": {"status": freshness, "detail": detail},
        "parity": parity,
        "missing_sources": sorted(slug for slug, work in identity["works"].items() if work["local"]
                                  and not (Path(roots["source_dir"]) / work["local"]).is_file()),
        "confirmations": report["confirmations"],
        "parse_errors": report["parse_errors"],
        "unresolved_refs": report["unresolved_refs"],
    }


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--config", help="path to .palace.toml (default: nearest ancestor, then Framework root)")
    args = parser.parse_args()
    print(json.dumps(library_status(resolve_roots(args.config)), ensure_ascii=False, indent=2))
