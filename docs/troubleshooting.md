# Troubleshooting

[English](troubleshooting.md) · [简体中文](troubleshooting.zh-CN.md)

| Symptom | Cause | Fix |
|---|---|---|
| *"Python 3.12+ was not found. Set PALACE_PYTHON…"* | No interpreter ≥ 3.12 discovered | Install Python 3.12+, set `PALACE_PYTHON` to its full path, restart DSH. Discovery order: `PALACE_PYTHON` → `<plugin>/.venv` → `python`/`python3`. |
| *"The Private library is not set up yet: no .palace.toml at …"* | No private config yet. On a fresh install the panel opens the Demo library automatically; this message appears only when you pick *Private library* | Create the four folders and `.palace.toml` ([getting-started](getting-started.md#3-create-your-private-library)), set `PALACE_CONFIG`, restart DSH. The Demo library works without it. |
| *"resolved root is not an existing directory"* | A folder named in `.palace.toml` doesn't exist | Create it; paths are relative to the config file, not the shell. |
| *"… and … resolve to the same directory"* | Two keys point to one folder | Use four distinct folders. |
| *"…:N: value must be exactly one double-quoted string, got: …"* | The config uses full TOML features (single quotes, inline comments, arrays) | Keep exactly four `key = "value"` lines; comments only on their own lines. |
| Environment variable seems ignored | DSH was started before it was set | Set it in the environment that launches DSH (on Windows, `setx` then restart), then restart DSH. |
| `/palace status` lists `missing_sources` | A card's `local:` file is absent from `source_dir` | Put the source file back or correct the card's `local:` path. In the demo library the 19 full-text cards are listed on purpose: it ships cards, not full texts. |
| Index shows *stale* | Vault changed since the last build | Run `palace_rebuild_index` (or *Maintain → Rebuild derived index*). The index is derived and safe to rebuild. |
| `/palace status` notes *"concepts.md: not found"* and *"domains.md: not found"* | The library is new and has no registry yet | Expected. The first ingest writes both; the first retrieval builds the index. |
| PDF ingest fails with `No module named pypdfium2` | Optional dependency missing | `pip install pypdfium2` into the interpreter DSH uses. |
| Graph panel is empty / *"Graph page is empty"* | Index not built yet, or library has no papers | Check `/palace status`; rebuild the index; ingest papers. |
| *"Failed to load graph"* | Python failed or timed out | Run `python -m knowledge_palace.graph.status --config <your .palace.toml>` in the plugin folder to see the real error. |
| Network commands do nothing | Collection works offline unless `--live` is authorized | Ask the agent explicitly to search online; see [configuration](configuration.md#network-use). |
| Session in the panel says *"session library binding conflicts with working directory"* | A session bound to one library is running in the other's folder | Unlink the session (*Session actions → Unlink*) and start a new one from the intended library. |
| Cannot open the web action endpoint remotely | Actions require an authenticated owner connection | Use the URL printed by `dsh web` from the owning machine. |

## Collecting diagnostics

```bash
python -m knowledge_palace.tools.config_resolver --config <config>   # roots resolve?
python -m knowledge_palace.graph.status --config <config>            # counts, index, missing sources
python -m knowledge_palace.graph.builder --config <config> --check   # full index verification
```

Run them from the plugin folder with Python 3.12+.

## Reporting a bug

Include: DSH version, plugin version (`package.json`), OS, Python version, the exact error text, and the output of `graph.status` with private paths removed.
