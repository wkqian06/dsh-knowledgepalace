# Getting started

[English](getting-started.md) · [简体中文](getting-started.zh-CN.md)

This guide takes you from nothing to a working **Private library** in about ten minutes. If you only want to look around, skip to the [demo-library tutorial](tutorial-demo-library.md) — it needs no setup.

## 1. Requirements

| Needed | Why |
|---|---|
| DeepSeek Harness (Web UI) | The plugin adds a sidebar panel, the `/palace` command and the `palace_*` tools. Developed and tested on `0.2.2-rc.5`. |
| Node.js `^22.19` or `>=24` | Already required by DSH. |
| **Python 3.12 or newer** | The mechanical core (graph index, retrieval, writing workspace, viewer) is standard-library Python. |
| `pypdfium2` *(optional)* | Only for ingesting PDF full texts: `pip install pypdfium2`. |

Check Python:

```bash
python --version        # must print 3.12 or newer
```

If your default `python` is older, install 3.12+ and point the plugin at it with `PALACE_PYTHON` (see [configuration](configuration.md)).

## 2. Install the plugin

- **DSH Plugin Manager** → search `dsh-knowledgepalace` (once the plugin market lists it) → *Install*. Installing a new bundle activates it without a restart.
- **Or from a checkout**: `npm install` in the folder, then in Plugin Manager install a local directory and select it.

You should now see **KnowledgePalace** in the DSH sidebar. Open it, choose *Demo library (drought papers)* from *Choose library*, and confirm the graph loads. If it does, the plugin and Python are working.

## 3. Create your private library

A library is four folders plus a four-line config file. They can live anywhere **outside** the plugin folder; keeping them in a synced or version-controlled location of your own is recommended. KnowledgePalace never runs Git against them.

| Folder | Holds | Rebuildable? |
|---|---|---|
| `vault/` | paper cards, concepts, gaps, governance decisions | No — this is your knowledge |
| `sources/` | full texts / source files the cards cite | No — original evidence |
| `workspace/` | your manuscripts, notes, saved sections and revisions | No — your work |
| `state/` | graph index, drafts, caches | **Yes** — derived |

**macOS / Linux**

```bash
mkdir -p ~/palace/{vault,state,sources,workspace}
printf '%s\n' 'vault_dir = "vault"' 'state_dir = "state"' 'source_dir = "sources"' 'workspace_dir = "workspace"' > ~/palace/.palace.toml
```

**Windows (PowerShell)**

```powershell
$p = "$HOME\palace"
'vault','state','sources','workspace' | ForEach-Object { New-Item -ItemType Directory "$p\$_" -Force | Out-Null }
$cfg = "vault_dir = `"vault`"`nstate_dir = `"state`"`nsource_dir = `"sources`"`nworkspace_dir = `"workspace`"`n"
[IO.File]::WriteAllText("$p\.palace.toml", $cfg)   # no BOM; see the note below
```

> Windows PowerShell 5.1 writes a byte-order mark with `Set-Content -Encoding utf8`. The plugin ignores one, but `[IO.File]::WriteAllText` keeps the file plain ASCII, which is what the examples above assume.

Relative values resolve against the config file's own folder; absolute paths also work. The four roots must exist and be distinct.

## 4. Tell the plugin where the library is

Set `PALACE_CONFIG` in the environment **of the process that starts DSH**, then restart DSH:

```bash
export PALACE_CONFIG=~/palace/.palace.toml            # macOS / Linux
```
```powershell
setx PALACE_CONFIG "$HOME\palace\.palace.toml"          # Windows (then restart DSH)
```

> Alternative: place the same `.palace.toml` in the plugin's folder. This works, but a plugin upgrade can replace that folder — the environment variable is safer.

Verify from a terminal, using the plugin folder as the working directory:

```bash
python -m knowledge_palace.tools.config_resolver --config ~/palace/.palace.toml
```

It prints the four resolved roots. In DSH, run `/palace status`: a new library reports `papers: 0`, an index state of `absent` (rebuildable) and two notes that `concepts.md` and `domains.md` do not exist yet. That is expected — the first ingest writes them, and the first retrieval builds the index.

## 5. Fill it

Open a DSH session in the **Private library** and ask:

```
/palace init "soil moisture drought forecasting" 20
```

The agent searches metadata providers (this is a network call, made only because you asked), shows candidates, and — after you select — ingests them into cards. See [commands](commands.md) for `expand`, `ingest` and the other routes, and [concepts](concepts.md) for what a card contains.

Already have PDFs? Put them anywhere readable and run `/palace ingest <path-to-pdf>`. (PDF text extraction needs `pypdfium2`.)

## 6. Where next

- Explore the result: sidebar → *Explore* → *Open Global graph*.
- Ask grounded questions: `/palace ask <question>` or the *Ask* tab.
- Write with evidence: create a paper project in the *Writing* tab, or `/palace write <project> introduction`.
- Keep it healthy: `/palace status`, `/palace audit`, `/palace govern`.
