"""Ingest acquisition: PDF text companions in the Source Cache convention,
scanned-PDF detection, mechanical identity from the text head, and promotion
only for verified material."""

import shutil
import tempfile
import unittest
from pathlib import Path

from knowledge_palace.acquisition.ingest import (acquire_source, companion_text, needs_ocr,
                                                 pdf_page_texts, save_cards)
from knowledge_palace.acquisition.providers import LocalFileProvider, OpenAccessProvider
from knowledge_palace.acquisition.receipt import new_request
from knowledge_palace.metadata.cache import BibliographicCache
from knowledge_palace.tests.test_acquisition_providers import OPENALEX_WITH_OA, RoutedStub

DOI = "10.99999/fixture.alpha2020"
MINI = Path(__file__).resolve().parent / "fixtures" / "vault-mini"
BODY = "Echo cancellation improves by delta under reverberation in every tested room. " * 3


def minimal_pdf(pages):
    """A born-digital PDF with Helvetica text, each paragraph ("\\n") wrapped at 70
    characters; built by hand so the tests need no PDF writer (Source Cache PDFs
    are git-ignored)."""
    objects = ["<< /Type /Catalog /Pages 2 0 R >>", None,
               "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"]
    kids = []
    for text in pages:
        lines = [paragraph[start:start + 70] for paragraph in text.split("\n")
                 for start in range(0, max(len(paragraph), 1), 70)]
        stream = "BT /F1 6 Tf 8 TL 40 780 Td %s ET" % " T* ".join("(%s) Tj" % line for line in lines)
        objects.append("<< /Length %d >>\nstream\n%s\nendstream" % (len(stream), stream))
        objects.append("<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents %d 0 R "
                       "/Resources << /Font << /F1 3 0 R >> >> >>" % len(objects))
        kids.append("%d 0 R" % len(objects))
    objects[1] = "<< /Type /Pages /Kids [%s] /Count %d >>" % (" ".join(kids), len(kids))
    data = b"%PDF-1.4\n"
    offsets = []
    for number, body in enumerate(objects, start=1):
        offsets.append(len(data))
        data += ("%d 0 obj\n%s\nendobj\n" % (number, body)).encode("latin-1")
    xref = len(data)
    data += ("xref\n0 %d\n0000000000 65535 f \n" % (len(objects) + 1)).encode("ascii")
    data += "".join("%010d 00000 n \n" % offset for offset in offsets).encode("ascii")
    data += ("trailer\n<< /Size %d /Root 1 0 R >>\nstartxref\n%d\n%%%%EOF\n"
             % (len(objects) + 1, xref)).encode("ascii")
    return data


class IngestCase(unittest.TestCase):
    def setUp(self):
        temp = tempfile.TemporaryDirectory()
        self.addCleanup(temp.cleanup)
        self.root = Path(temp.name)
        self.state = self.root / "state"
        self.source = self.root / "source"
        self.state.mkdir()
        self.source.mkdir()

    def pdf(self, name, pages):
        path = self.root / name
        path.write_bytes(minimal_pdf(pages))
        return path

    def acquire(self, path, **request):
        return acquire_source(new_request(local_path=path, **request), [LocalFileProvider()],
                              self.state, self.source)


class TestTextCompanion(IngestCase):
    def test_page_markers(self):
        pages = pdf_page_texts(self.pdf("two.pdf", ["First page " + BODY, "Second page " + BODY]))
        self.assertEqual(len(pages), 2)
        text = companion_text(pages)
        self.assertTrue(text.startswith("TOOL: pypdfium2 (per page)\n"))
        self.assertLess(text.index("===== [PDF page 1] ====="), text.index("First page"))
        self.assertLess(text.index("===== [PDF page 2] ====="), text.index("Second page"))

    def test_textless_pdf_needs_ocr(self):
        self.assertTrue(needs_ocr(pdf_page_texts(self.pdf("scan.pdf", [""]))))
        self.assertTrue(needs_ocr([]))
        self.assertFalse(needs_ocr([BODY * 2]))


class TestAcquireSource(IngestCase):
    def test_doi_verifies_and_promotes(self):
        path = self.pdf("alpha.pdf", ["doi:%s %s" % (DOI, BODY)])
        result = self.acquire(path, work_slug="alpha-2020-echo", ids={"doi": DOI})
        self.assertEqual(result["identity_status"], "verified")
        self.assertEqual(result["text_status"], "ready")
        self.assertTrue(result["claim_eligible"])
        self.assertIsNone(result["next_action"])
        locals_ = sorted(entry["local"] for entry in result["promoted"]["files"])
        self.assertEqual(locals_, ["fulltext/alpha-2020-echo.pdf", "fulltext/alpha-2020-echo.txt"])
        cached = (self.source / "fulltext/alpha-2020-echo.txt").read_text(encoding="utf-8")
        self.assertIn("===== [PDF page 1] =====\ndoi:%s Echo cancellation" % DOI, cached)

    def test_arxiv_stamp_verifies(self):
        # PDFium extracts the rotated margin stamp after a full first page of text.
        path = self.pdf("beta.pdf", [BODY * 20 + "\narXiv:2101.00001v2 [cs.SD] 5 Jan 2021", BODY])
        result = self.acquire(path, work_slug="beta-2021-foxtrot", ids={"arxiv": "2101.00001"})
        self.assertEqual(result["identity_evidence"], "requested arXiv id found in text head")
        self.assertIsNotNone(result["promoted"])

    def test_unverified_needs_confirm(self):
        path = self.pdf("gamma.pdf", [BODY])
        refused = self.acquire(path, work_slug="gamma-2022-bridge", ids={"doi": "10.1/other"})
        self.assertIsNone(refused["promoted"])
        self.assertIn("--confirm-identity", refused["next_action"])
        self.assertFalse((self.source / "fulltext").exists())
        confirmed = self.acquire(path, work_slug="gamma-2022-bridge", ids={"doi": "10.1/other"},
                                 user_confirmed_identity=True, confirmation_provenance="user named the file")
        self.assertEqual(confirmed["promoted"]["status"], "promoted")

    def test_scan_kept_not_eligible(self):
        path = self.pdf("scan.pdf", [""])
        result = self.acquire(path, work_slug="scan-2020-page", ids={"doi": DOI},
                              user_confirmed_identity=True)
        self.assertEqual(result["text_status"], "needs_ocr")
        self.assertFalse(result["claim_eligible"])
        self.assertIn("OCR", result["next_action"])
        self.assertEqual([entry["local"] for entry in result["promoted"]["files"]],
                         ["fulltext/scan-2020-page.pdf"])

    def test_landing_page_not_promoted(self):
        stub = RoutedStub({"/works/doi:": OPENALEX_WITH_OA, "oa.example": b"<html>Just a moment...</html>"})
        request = new_request(work_slug="alpha-2020-echo", ids={"doi": DOI}, user_confirmed_identity=True)
        result = acquire_source(request, [OpenAccessProvider(fetch=stub, cache=BibliographicCache(self.state))],
                                self.state, self.source)
        self.assertIsNone(result["promoted"])
        self.assertIn("neither a PDF nor text", result["next_action"])
        self.assertFalse((self.source / "fulltext").exists())


class TestSaveCards(IngestCase):
    def test_refusal_keeps_batch(self):
        vault = self.root / "vault"
        shutil.copytree(MINI, vault)
        good = vault / "papers" / "alpha-2020-echo.md"
        bad = self.root / "alpha-copy.md"
        bad.write_text(good.read_text(encoding="utf-8").replace(
            "slug: alpha-2020-echo", "slug: alpha-copy"), encoding="utf-8")
        report = save_cards([bad, good], vault, self.source)
        self.assertEqual([row["status"] for row in report["saved"]], ["unchanged"])
        self.assertEqual(report["failed"][0]["card"], str(bad))
        self.assertIn("already exists as alpha-2020-echo", report["failed"][0]["error"])


if __name__ == "__main__":
    unittest.main()
