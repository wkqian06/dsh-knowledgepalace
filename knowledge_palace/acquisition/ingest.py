"""Ingest commands: acquire a paper's source into the Source Cache, and save
reviewed paper cards through the save_paper write boundary.

``acquire`` tries the local file, Zotero and open-access channels in order,
writes a per-page text companion for a PDF, and promotes identity-verified
material into ``<source>/fulltext/``. ``save`` saves a batch of cards and, with
``--index``, prepares the graph index once after the batch. Network lookups
need ``--live`` (explicit network authorization).
"""

import argparse
import json
import os
import sys
from pathlib import Path

import pypdfium2

from ..graph.builder import ensure_index
from ..metadata.cache import BibliographicCache, RateLimiter
from ..metadata.providers import live_transport
from ..tools.config_resolver import resolve_roots
from ..workspace.project import SLUG
from .providers import (LocalFileProvider, OpenAccessProvider, ZoteroReadOnlyProvider,
                        acquire_via, stage_bytes)
from .receipt import claim_eligible, new_request, resolve_identity
from .transaction import promote, save_paper

TEXT_TOOL = "pypdfium2 (per page)"
# ponytail: fewer letters than this per page on average means no usable text
# layer (a scanned PDF); tune here if born-digital slides get flagged.
MIN_LETTERS_PER_PAGE = 100


def pdf_page_texts(pdf_path):
    """Text of every page in PDF page order (the index, not the printed page)."""
    with pypdfium2.PdfDocument(str(pdf_path)) as document:
        return [document[index].get_textpage().get_text_range() for index in range(len(document))]


def companion_text(pages):
    """The Source Cache text companion: a TOOL header, then one marker per PDF page."""
    lines = ["TOOL: %s" % TEXT_TOOL, ""]
    for number, text in enumerate(pages, start=1):
        lines.append("===== [PDF page %d] =====" % number)
        lines.append(text.replace("\r\n", "\n").replace("\r", "\n").strip())
    return "\n".join(lines) + "\n"


def needs_ocr(pages):
    letters = sum(char.isalnum() for page in pages for char in page)
    return not pages or letters < MIN_LETTERS_PER_PAGE * len(pages)


def acquire_source(request, providers, state_dir, source_dir):
    """Acquire → text companion → promotion of verified material.

    An acquired PDF without text gets a per-page companion, and its identity is
    checked again on the first page, where the DOI footer and the arXiv margin
    stamp sit. Returns the receipt plus ``promoted`` (None while identity is not
    verified; ``next_action`` then says what would resolve it).
    """
    receipt = acquire_via(providers, request, state_dir)
    if receipt["acquisition_status"] != "acquired" or receipt.get("quarantined"):
        return dict(receipt, promoted=None, claim_eligible=False)
    if receipt["text_status"] == "not_attempted" and receipt["staged_path"].endswith(".pdf"):
        staged = Path(state_dir) / receipt["staged_path"]
        pages = pdf_page_texts(staged)
        if needs_ocr(pages):
            receipt["text_status"] = "needs_ocr"
        else:
            text = companion_text(pages)
            receipt["staged_text_path"], _ = stage_bytes(state_dir, staged.stem + ".txt", text.encode("utf-8"))
            receipt["text_status"] = "ready"
            if receipt["identity_status"] == "unverified":
                receipt["identity_status"], receipt["identity_evidence"] = resolve_identity(
                    receipt["request"], None, pages[0])
    if receipt["text_status"] == "not_attempted":
        receipt["next_action"] = ("%s returned neither a PDF nor text (often a landing or challenge page): "
                                  "read it with web_fetch, or download the PDF with curl -L -o <slug>.pdf and "
                                  "acquire it with --path" % receipt.get("locator"))
        return dict(receipt, promoted=None, claim_eligible=False)
    if receipt["identity_status"] != "verified":
        check = ("the PDF has no text layer" if receipt["text_status"] == "needs_ocr"
                 else "check the staged text")
        receipt["next_action"] = ("identity unverified (%s): confirm this is the requested paper, then "
                                  "rerun with --confirm-identity '<who confirmed, how>'" % check)
        return dict(receipt, promoted=None, claim_eligible=False)
    receipt["next_action"] = ("scanned PDF: preserved, but no text for Claims; OCR it or supply a "
                              ".txt companion" if receipt["text_status"] == "needs_ocr" else None)
    promoted = promote(receipt, state_dir, source_dir)
    return dict(receipt, promoted=promoted, claim_eligible=claim_eligible(receipt))


def save_cards(card_paths, vault_dir, source_dir):
    """save_paper for each card; a refused card is reported and the rest still save."""
    saved, failed = [], []
    for card in card_paths:
        text = Path(card).read_text(encoding="utf-8")
        try:
            saved.append(save_paper(vault_dir, text, source_dir))
        except ValueError as err:  # save_paper's typed refusal (risk_controls.md)
            failed.append({"card": str(card), "error": str(err)})
    return {"saved": saved, "failed": failed}


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    # ---- Request ----
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--config", help="path to .palace.toml (default: nearest ancestor, then Framework root)")
    commands = parser.add_subparsers(dest="command", required=True)
    acquire = commands.add_parser("acquire", help="fetch or stage a paper source and promote it")
    acquire.add_argument("--slug", required=True, help="paper card slug, e.g. smith-2024-topic")
    acquire.add_argument("--doi")
    acquire.add_argument("--arxiv")
    acquire.add_argument("--path", help="local PDF or text file (a sibling .txt is used as its text)")
    acquire.add_argument("--title")
    acquire.add_argument("--confirm-identity", metavar="PROVENANCE",
                         help="record a user confirmation that these bytes are this paper")
    acquire.add_argument("--live", action="store_true", help="allow Zotero/open-access downloads")
    acquire.add_argument("--mailto", default=os.environ.get("PALACE_MAILTO"))
    save = commands.add_parser("save", help="save reviewed paper cards")
    save.add_argument("cards", nargs="+", help="card draft files (paper template)")
    save.add_argument("--index", action="store_true", help="prepare the graph index after the batch")
    args = parser.parse_args()
    roots = resolve_roots(args.config)

    # ---- Acquire ----
    if args.command == "acquire":
        if not (args.doi or args.arxiv or args.path):
            parser.error("acquire needs --doi, --arxiv or --path")
        if not SLUG.match(args.slug):
            parser.error("--slug must be ASCII kebab-case, e.g. smith-2024-topic")
        request = new_request(
            work_slug=args.slug,
            ids={kind: value for kind, value in (("doi", args.doi), ("arxiv", args.arxiv)) if value},
            title=args.title,
            local_path=Path(args.path).resolve() if args.path else None,
            user_confirmed_identity=bool(args.confirm_identity),
            confirmation_provenance=args.confirm_identity,
        )
        fetch = live_transport() if args.live else None
        providers = [
            LocalFileProvider(),
            ZoteroReadOnlyProvider(fetch, os.environ.get("ZOTERO_API_KEY"), os.environ.get("ZOTERO_USER_ID")),
            OpenAccessProvider(fetch, BibliographicCache(roots["state_dir"]), RateLimiter(), args.mailto),
        ]
        result = acquire_source(request, providers, roots["state_dir"], roots["source_dir"])
        files = [entry["local"] for entry in (result["promoted"] or {}).get("files", [])]
        result["local"] = next((local for local in files if not local.endswith(".txt")), files[0] if files else None)
        text_path = next((Path(roots["source_dir"]) / local for local in files if local.endswith(".txt")), None)
        if text_path is None and result.get("staged_text_path"):
            text_path = Path(roots["state_dir"]) / result["staged_text_path"]
        result["text"] = str(text_path) if text_path else None
        print(json.dumps(result, ensure_ascii=False, indent=2))
        sys.exit(0 if result["promoted"] else 1)

    # ---- Save ----
    report = save_cards(args.cards, roots["vault_dir"], roots["source_dir"])
    if args.index and report["saved"]:
        document = ensure_index(roots["vault_dir"], roots["state_dir"], roots["workspace_dir"])
        identity = document["payload"]["identity_report"]
        report["index"] = {"snapshot": document["snapshot"]["snapshot_id"],
                           "papers": identity["works"], "claims": identity["claims"], "gaps": identity["gaps"],
                           "confirmations": identity["confirmations"], "parse_errors": identity["parse_errors"],
                           "unresolved_refs": identity["unresolved_refs"]}
        report["next"] = "python -m knowledge_palace.interaction.research updates"
    print(json.dumps(report, ensure_ascii=False, indent=2))
    sys.exit(1 if report["failed"] else 0)
