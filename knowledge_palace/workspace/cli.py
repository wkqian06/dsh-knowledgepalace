"""Project workspace commands for write, polish, feasibility and research notes.

``create`` materializes a project skeleton; ``context`` prints what the writing
workflow reads (project, brief, materials, notes, analysis, style profiles);
``brief`` validates ``outline/brief.json``; ``material`` registers a user
material; ``revise`` saves a section as its next append-only revision;
``replace`` swaps one unique passage in a section's latest revision and saves
the result as a new revision; ``graph`` writes, reads back or settles a
section's argument-graph page ``outline/graph-<section>.html``.
"""

import argparse
import json
import sys
from pathlib import Path

from ..tools.config_resolver import resolve_roots
from ..acquisition.transaction import write_text
from .argument_graph import changed_paragraphs, paragraphs, read_view, render_view
from .brief import validate_brief
from .discovery import _directory, _file
from .material import MATERIAL_KINDS, new_material, register_material
from .project import KINDS, SLUG, create_project, new_project
from .research_helpers import project_context
from .revision import latest, save_revision
from .style import list_style_profiles, set_project_style
from .writing import replace_passage

if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    # ---- Request ----
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--config", help="path to .palace.toml (default: nearest ancestor, then Framework root)")
    commands = parser.add_subparsers(dest="command", required=True)
    create = commands.add_parser("create", help="new project skeleton")
    create.add_argument("slug")
    create.add_argument("--kind", choices=KINDS, default="paper")
    create.add_argument("--audience", required=True)
    create.add_argument("--venue", default="")
    create.add_argument("--language", default="en")
    create.add_argument("--length", default="")
    create.add_argument("--citation-style", default="apa")
    create.add_argument("--style-profile", default="")
    for name, text in (("context", "project context as JSON"), ("brief", "validate outline/brief.json")):
        commands.add_parser(name, help=text).add_argument("slug")
    material = commands.add_parser("material", help="register a project material")
    material.add_argument("slug")
    material.add_argument("--id", required=True, help="material id without the 'material:' prefix")
    material.add_argument("--path", required=True, help="project-relative file path")
    material.add_argument("--kind", required=True, choices=MATERIAL_KINDS)
    material.add_argument("--note", default="")
    revise = commands.add_parser("revise", help="save a section file as the next revision")
    revise.add_argument("slug")
    revise.add_argument("section")
    revise.add_argument("--file", required=True)
    replace = commands.add_parser("replace", help="replace one unique passage in a section")
    replace.add_argument("slug")
    replace.add_argument("section")
    replace.add_argument("--original", required=True, help="file holding the exact passage")
    replace.add_argument("--revised", required=True, help="file holding its replacement")
    graph = commands.add_parser("graph", help="write, read back or settle a section's argument-graph page")
    graph.add_argument("slug")
    graph.add_argument("section")
    graph.add_argument("--file", help="graph JSON to write the page from")
    graph.add_argument("--written", action="store_true",
                       help="record that the text now follows the page's graph")
    graph.add_argument("--native", action="store_true",
                       help="return the graph and written baseline for the native DSH editor")
    graph.add_argument("--preserve-written", action="store_true",
                       help="when replacing the graph, retain the page's written baseline")
    commands.add_parser("styles", help="list style profiles in the library bank")
    set_style = commands.add_parser("set-style", help="record a project's style profiles")
    set_style.add_argument("slug")
    set_style.add_argument("--profile", required=True,
                           help="semicolon-separated profile names; empty clears the field")
    args = parser.parse_args()
    if args.command != "styles" and not SLUG.match(args.slug):
        parser.error("slug %r must be ASCII kebab-case" % args.slug)
    if args.command in ("revise", "replace", "graph") and not SLUG.match(args.section):
        parser.error("section %r must be ASCII kebab-case" % args.section)
    roots = resolve_roots(args.config)
    project_dir = None if args.command == "styles" else Path(roots["workspace_dir"]) / "projects" / args.slug
    if args.command not in ("create", "styles") and not (project_dir / "project.yaml").is_file():
        parser.error("no project %r in %s; create it first" % (args.slug, roots["workspace_dir"]))

    # ---- Command ----
    if args.command == "create":
        project = new_project(args.slug, args.kind, args.audience, venue=args.venue,
                              language=args.language, length=args.length,
                              citation_style=args.citation_style, style_profile=args.style_profile)
        result = {"project": str(create_project(roots["workspace_dir"], project))}
    elif args.command == "context":
        result = project_context(roots["workspace_dir"], args.slug, roots["vault_dir"])
    elif args.command == "styles":
        result = list_style_profiles(roots["vault_dir"])
    elif args.command == "set-style":
        result = set_project_style(roots["workspace_dir"], roots["vault_dir"], args.slug, args.profile)
    elif args.command == "brief":
        brief = json.loads((project_dir / "outline" / "brief.json").read_text(encoding="utf-8"))
        result = {"brief": str(project_dir / "outline" / "brief.json"), "errors": validate_brief(brief)}
    elif args.command == "material":
        registry = register_material(project_dir, new_material(args.id, args.path, args.kind, args.note))
        result = {"registered": "material:" + args.id, "registry": str(registry)}
    elif args.command == "revise":
        text = Path(args.file).read_text(encoding="utf-8")
        result = {"revision": str(save_revision(project_dir, args.section, text))}
    elif args.command == "graph":
        projects = Path(roots["workspace_dir"]) / "projects"
        outline = project_dir / "outline"
        page = outline / ("graph-%s.html" % args.section)
        if not _directory(projects) or not _directory(project_dir) or not _file(project_dir / "project.yaml") or not _directory(outline):
            parser.error("graph project and outline must be regular workspace directories")
        if (page.exists() or page.is_symlink()) and not _file(page):
            parser.error("graph page must be a regular non-symlink file")
        prior_written = None
        if args.file and args.preserve_written and page.is_file():
            _, prior_written = read_view(page.read_text(encoding="utf-8"))
        if args.file:
            graph = json.loads(Path(args.file).read_text(encoding="utf-8"))
        else:
            graph, written = read_view(page.read_text(encoding="utf-8"))
        if args.file or args.written:
            written = graph if args.written or prior_written is None else prior_written
        # Build the complete derived output before touching the existing page.
        paragraph_view = paragraphs(graph)
        changes = changed_paragraphs(graph, written)
        rendered = render_view(graph, written) if args.file or args.written else None
        if rendered is not None:
            write_text(page, rendered)
        result = {"page": str(page), "paragraphs": paragraph_view,
                  "changes": changes}
        if args.native:
            result.update({"graph": graph, "written": written})
    else:
        base = latest(project_dir, args.section)
        if base is None:
            parser.error("section %r has no revision to polish" % args.section)
        document = (project_dir / "sections" / args.section / base).read_text(encoding="utf-8")
        revised = replace_passage(document, Path(args.original).read_text(encoding="utf-8"),
                                  Path(args.revised).read_text(encoding="utf-8"))
        result = {"base": base, "revision": str(save_revision(project_dir, args.section, revised))}
    print(json.dumps(result, ensure_ascii=False, indent=2))
    sys.exit(1 if result.get("errors") else 0)
