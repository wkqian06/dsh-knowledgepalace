"""Collection search: provider records merged by identity, library hits marked,
provider failures kept as warnings, query text encoded into one parameter."""

import json
import unittest
from pathlib import Path

from knowledge_palace.expansion.collect import search_candidates
from knowledge_palace.graph.identity import load_vault_identity
from knowledge_palace.metadata.providers import CrossrefProvider, OpenAlexProvider
from knowledge_palace.tests.test_acquisition_providers import RoutedStub

FIXTURES = Path(__file__).resolve().parent / "fixtures"
MINI = FIXTURES / "vault-mini"


def payload(name):
    return json.loads((FIXTURES / "providers" / name).read_text(encoding="utf-8"))


def body(document):
    return json.dumps(document).encode("utf-8")


class TestSearchCandidates(unittest.TestCase):
    def setUp(self):
        self.identity = load_vault_identity(MINI)
        works = [payload("openalex-work.json"), payload("openalex-citing.json")["results"][0]]
        self.openalex_stub = RoutedStub({"api.openalex.org": body({"results": works})})
        self.openalex = OpenAlexProvider(fetch=self.openalex_stub)
        items = {"message": {"items": [payload("crossref-work.json")["message"]]}}
        self.crossref = CrossrefProvider(fetch=RoutedStub({"api.crossref.org": body(items)}))

    def test_merge_and_library_hit(self):
        result = search_candidates([self.openalex, self.crossref], "echo cancellation", 10, self.identity)
        by_key = {row["key"]: row for row in result["results"]}
        alpha = by_key["doi:10.99999/fixture.alpha2020"]
        self.assertEqual(alpha["providers"], ["openalex", "crossref"])
        self.assertEqual(alpha["in_library"], "alpha-2020-echo")
        self.assertEqual(alpha["ids"]["openalex"], "W1234567")
        self.assertIsNone(by_key["openalex:w9"]["in_library"])
        self.assertEqual(result["warnings"], [])

    def test_candidate_identity_and_source_survive_selection_payload(self):
        result = search_candidates([self.openalex], 'echo', 10, self.identity)
        selected = next(row for row in result['results'] if row['in_library'] == 'alpha-2020-echo')
        restored = json.loads(json.dumps(selected, ensure_ascii=False))
        self.assertEqual(restored['ids']['doi'], '10.99999/fixture.alpha2020')
        self.assertEqual(restored['ids']['openalex'], 'W1234567')
        self.assertEqual(restored['in_library'], 'alpha-2020-echo')
        self.assertEqual(restored['providers'], ['openalex'])
        self.assertIn('oa_url', restored)

    def test_provider_failure_warns(self):
        broken = CrossrefProvider(fetch=RoutedStub({"api.crossref.org": OSError("offline")}))
        result = search_candidates([broken, self.openalex], "echo", 10, self.identity)
        self.assertEqual(len(result["results"]), 2)
        self.assertTrue(result["warnings"][0].startswith("crossref.search"))

    def test_query_encoded(self):
        search_candidates([self.openalex], "echo & noise 回声", 5, self.identity)
        self.assertIn("search=echo+%26+noise+%E5%9B%9E%E5%A3%B0&per-page=5", self.openalex_stub.calls[0])


if __name__ == "__main__":
    unittest.main()
