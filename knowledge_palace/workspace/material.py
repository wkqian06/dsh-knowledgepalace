"""ProjectMaterial — user inputs that feed writing, never Vault Claims.

Drafts, data, figures, solicitations, reviewer comments: usable as
writing input, and barred from ever becoming Claim evidence both by flag
(``vault_claim_eligible`` is False from birth; tampering is a validation
error) and by construction (the ``material:`` id prefix is not a legal
evidence-ref prefix anywhere in the brief/assessment validators).
"""

import json
from pathlib import Path

MATERIAL_PREFIX = "material:"
MATERIAL_KINDS = (
    "draft",
    "data",
    "figure",
    "solicitation",
    "reviewer-comments",
    "other",
)


def new_material(material_id, path, kind, note=""):
    return {
        "id": MATERIAL_PREFIX + material_id,
        "path": path,
        "kind": kind,
        "note": note,
        "vault_claim_eligible": False,
    }


def validate_material(material):
    """Return violations; empty means usable as writing input."""
    if not isinstance(material, dict):
        return ["material must be a dict"]
    errors = []
    identifier = str(material.get("id") or "")
    if not identifier.startswith(MATERIAL_PREFIX) or identifier == MATERIAL_PREFIX:
        errors.append("id must carry the %r prefix" % MATERIAL_PREFIX)
    path = str(material.get("path") or "")
    if (
        not path
        or path.startswith(("/", "\\"))
        or ".." in path.replace("\\", "/").split("/")
    ):
        errors.append("path must be a project-relative path")
    if material.get("kind") not in MATERIAL_KINDS:
        errors.append("kind %r not in %s" % (material.get("kind"), list(MATERIAL_KINDS)))
    if material.get("vault_claim_eligible") is not False:
        errors.append("material can never become Vault Claim evidence")
    return errors


def register_material(project_dir, material):
    """Append one material to ``materials/materials.json``; ids stay unique and
    the registered path must point at an existing file inside the project."""
    errors = validate_material(material)
    project = Path(project_dir).resolve()
    relative = Path(str(material.get("path") or ""))
    target = (project / relative).resolve()
    if relative.is_absolute() or not (target.is_file() and target.is_relative_to(project)):
        errors.append("path %r is not a file in the project" % material.get("path"))
    registry = Path(project_dir) / "materials" / "materials.json"
    materials = json.loads(registry.read_text(encoding="utf-8")) if registry.is_file() else []
    if any(row["id"] == material.get("id") for row in materials):
        errors.append("%s is already registered" % material.get("id"))
    if errors:
        raise ValueError("material not registered: " + "; ".join(errors))
    materials.append(material)
    registry.parent.mkdir(parents=True, exist_ok=True)
    registry.write_text(json.dumps(materials, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return registry
