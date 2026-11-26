# Configuration

[English](configuration.md) · [简体中文](configuration.zh-CN.md)

KnowledgePalace has no settings screen: configuration is one file plus two optional environment variables.

## `.palace.toml`

Exactly four `key = "value"` lines — this is a strict subset of TOML, parsed without a TOML library. Unknown or missing keys, duplicates and non-string values are errors with file and line numbers.

```toml
vault_dir = "vault"
state_dir = "state"
source_dir = "sources"
workspace_dir = "workspace"
```

Rules (enforced by `knowledge_palace.tools.config_resolver`):

- Relative paths resolve against **the config file's folder**, never the shell's working directory.
- All four directories must already exist and be pairwise distinct.
- They should lie outside the plugin folder. [`.palace.example.toml`](../.palace.example.toml) shows the shape.
- No Git operation is ever run against them; version control is entirely yours.

## Environment variables

| Variable | Default | Purpose |
|---|---|---|
| `PALACE_CONFIG` | `<plugin folder>/.palace.toml` | Path of the **Private library** config. |
| `PALACE_PYTHON` | auto-detect | Python 3.12+ interpreter to use. |

Python discovery order: `PALACE_PYTHON` → `<plugin folder>/.venv` (`Scripts/python.exe` on Windows, `bin/python` elsewhere) → `python` (Windows) / `python3` (others). The first one that reports 3.12 or newer wins. If none does, tools fail with *"Python 3.12+ was not found. Set PALACE_PYTHON…"*.

Set variables in the environment that launches DSH, then restart DSH:

```powershell
setx PALACE_CONFIG "D:\research\palace\.palace.toml"
setx PALACE_PYTHON "C:\Python312\python.exe"
```

## The two libraries

| Library | Config | Notes |
|---|---|---|
| **Private library** | `PALACE_CONFIG` or `<plugin>/.palace.toml` | Your data. Sessions started from the panel are bound to it. |
| **Demo library** | `<plugin>/demo-library/.palace.toml` | Ships with the plugin; read-mostly sample. A session whose working directory is inside `demo-library/` is routed to it automatically. |

The two never share data; nothing is copied from the private library into the demo.

## Network use

Everything is local except commands you run explicitly:

- Collection and acquisition commands with `--live` (OpenAlex, Crossref, Semantic Scholar, arXiv, open-access downloads).
- `/palace refresh …` (bibliographic metadata only).
- Whatever web tools you ask the agent to use.

The exported *Viewer* is a single offline HTML file with no outbound requests.

## Running the Python core by hand

Run from the plugin folder; every module accepts `--config <path>`:

```bash
python -m knowledge_palace.graph.status        --config ~/palace/.palace.toml
python -m knowledge_palace.graph.builder       --config ~/palace/.palace.toml --rebuild
python -m knowledge_palace.interaction.research --config ~/palace/.palace.toml ask "your question"
python -m knowledge_palace.viewer.cli          --config ~/palace/.palace.toml ~/Desktop/palace-viewer.html
```

See [commands](commands.md#mechanical-commands) for the full module table.
