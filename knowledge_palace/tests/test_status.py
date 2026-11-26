"""Library status reads live counts, index freshness, INDEX parity and missing
cached sources without writing anything."""

import json
import shutil
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

from knowledge_palace.graph.builder import write_index
from knowledge_palace.graph.status import library_status
from knowledge_palace.tools.config_resolver import resolve_roots

MINI = Path(__file__).resolve().parent / "fixtures" / "vault-mini"


class TestLibraryStatus(unittest.TestCase):
    def setUp(self):
        temp = tempfile.TemporaryDirectory()
        self.addCleanup(temp.cleanup)
        root = Path(temp.name)
        shutil.copytree(MINI, root / "vault")
        for name in ("state", "source", "workspace"):
            (root / name).mkdir()
        (root / ".palace.toml").write_text(
            'vault_dir = "vault"\nstate_dir = "state"\nsource_dir = "source"\nworkspace_dir = "workspace"\n',
            encoding="utf-8")
        self.roots = resolve_roots(str(root / ".palace.toml"))

    def test_live_counts(self):
        status = library_status(self.roots)
        self.assertEqual(status["counts"]["papers"], 3)
        self.assertEqual(status["counts"]["gaps"], 2)
        self.assertEqual(status["counts"]["bridges"], 1)
        self.assertEqual(status["counts"]["briefs"], 1)
        self.assertEqual(status["parity"]["papers"]["missing_rows"], [])

    def test_index_state_read_only(self):
        self.assertEqual(library_status(self.roots)["index"]["status"], "absent")
        self.assertEqual(list(self.roots["state_dir"].iterdir()), [])
        write_index(self.roots["vault_dir"], self.roots["state_dir"])
        self.assertEqual(library_status(self.roots)["index"]["status"], "fresh")

    def test_cli_status_rebuild_and_status_in_isolated_roots(self):
        config = str(self.roots['workspace_dir'].parent / '.palace.toml')
        def run(module, *args):
            result = subprocess.run([sys.executable, '-m', module, '--config', config, *args], capture_output=True, text=True, encoding='utf-8')
            self.assertEqual(result.returncode, 0, result.stderr)
            return result.stdout
        self.assertEqual(json.loads(run('knowledge_palace.graph.status'))['index']['status'], 'absent')
        run('knowledge_palace.graph.builder', '--rebuild')
        self.assertEqual(json.loads(run('knowledge_palace.graph.status'))['index']['status'], 'fresh')
        search = json.loads(run('knowledge_palace.graph.search', '--limit=10', '--', 'echo'))
        self.assertGreater(search['total'], 0)
        network = json.loads(run('knowledge_palace.graph.network', '--max-nodes=2', '--max-links=3'))
        self.assertLessEqual(len(network['nodes']), 2)
        self.assertLessEqual(len(network['links']), 3)

    def test_parity_and_missing_sources(self):
        index = self.roots["vault_dir"] / "papers" / "INDEX.md"
        index.write_text("\n".join(line for line in index.read_text(encoding="utf-8").splitlines()
                                   if not line.startswith("| beta-2021-foxtrot")) + "\n", encoding="utf-8")
        cached = self.roots["source_dir"] / "fulltext" / "alpha-2020-echo.pdf"
        cached.parent.mkdir()
        cached.write_bytes(b"%PDF-1.4")
        status = library_status(self.roots)
        self.assertEqual(status["parity"]["papers"]["missing_rows"], ["beta-2021-foxtrot"])
        self.assertEqual(status["missing_sources"], ["beta-2021-foxtrot", "gamma-2022-bridge"])


if __name__ == "__main__":
    unittest.main()
