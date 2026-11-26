"""Material registration keeps ids unique, paths inside the project and the
never-a-Claim flag intact."""

import json
import tempfile
import unittest
from pathlib import Path

from knowledge_palace.workspace.material import new_material, register_material


class TestRegisterMaterial(unittest.TestCase):
    def setUp(self):
        temp = tempfile.TemporaryDirectory()
        self.addCleanup(temp.cleanup)
        self.project = Path(temp.name) / "project"
        (self.project / "materials").mkdir(parents=True)
        (self.project / "materials" / "draft.md").write_text("draft", encoding="utf-8")
        (Path(temp.name) / "outside.md").write_text("outside", encoding="utf-8")

    def test_register_and_duplicate(self):
        registry = register_material(self.project, new_material("draft-1", "materials/draft.md", "draft"))
        rows = json.loads(registry.read_text(encoding="utf-8"))
        self.assertEqual(rows[0]["id"], "material:draft-1")
        self.assertIs(rows[0]["vault_claim_eligible"], False)
        with self.assertRaisesRegex(ValueError, "already registered"):
            register_material(self.project, new_material("draft-1", "materials/draft.md", "draft"))

    def test_bad_paths_refused(self):
        absolute = str((self.project / "materials" / "draft.md").resolve())
        for path in ("materials/absent.md", "../outside.md", str(self.project.parent / "outside.md"), absolute):
            with self.assertRaises(ValueError, msg=path):
                register_material(self.project, new_material("x", path, "data"))
        self.assertFalse((self.project / "materials" / "materials.json").exists())


if __name__ == "__main__":
    unittest.main()
