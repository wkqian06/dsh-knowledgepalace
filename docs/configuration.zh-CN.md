# 配置

[English](configuration.md) · [简体中文](configuration.zh-CN.md)

KnowledgePalace（知识宫殿）没有设置界面：配置只有一个文件，外加两个可选的环境变量。

## `.palace.toml`

恰好四行 `key = "value"`——这是 TOML 的严格子集，无需 TOML 库即可解析。未知或缺失的键、重复键以及非字符串值都会报错，并给出文件名和行号。

```toml
vault_dir = "vault"
state_dir = "state"
source_dir = "sources"
workspace_dir = "workspace"
```

规则（由 `knowledge_palace.tools.config_resolver` 强制执行）：

- 相对路径以**配置文件所在文件夹**为基准，而不是 shell 的工作目录。
- 四个目录必须已存在，且两两不同。
- 它们应位于插件文件夹之外。[`.palace.example.toml`](../.palace.example.toml) 给出了示例写法。
- 绝不会对它们运行任何 Git 操作；版本控制完全由你自己负责。

## 环境变量

| 变量 | 默认值 | 用途 |
|---|---|---|
| `PALACE_CONFIG` | `<plugin folder>/.palace.toml` | **私人知识库**配置文件的路径。 |
| `PALACE_PYTHON` | 自动检测 | 要使用的 Python 3.12+ 解释器。 |

Python 的发现顺序：`PALACE_PYTHON` → `<plugin folder>/.venv`（Windows 上为 `Scripts/python.exe`，其他系统为 `bin/python`）→ `python`（Windows）/ `python3`（其他系统）。第一个报告版本为 3.12 或更新的解释器胜出。若都不满足，工具会报错 *"Python 3.12+ was not found. Set PALACE_PYTHON…"*（未找到 Python 3.12+，请设置 PALACE_PYTHON…）。

请在启动 DSH 的环境中设置变量，然后重启 DSH：

```powershell
setx PALACE_CONFIG "D:\research\palace\.palace.toml"
setx PALACE_PYTHON "C:\Python312\python.exe"
```

## 两个知识库

| 知识库 | 配置 | 说明 |
|---|---|---|
| **私人知识库** | `PALACE_CONFIG` 或 `<plugin>/.palace.toml` | 你的数据。从面板启动的会话会绑定到它。 |
| **演示库** | `<plugin>/demo-library/.palace.toml` | 随插件提供；以只读为主的示例。工作目录位于 `demo-library/` 内的会话会自动路由到它。 |

两者从不共享数据；私人知识库中的任何内容都不会被复制到演示库。

## 网络使用

除你明确运行的命令外，一切都在本地进行：

- 带 `--live` 的收集与采集命令（OpenAlex、Crossref、Semantic Scholar、arXiv、开放获取下载）。
- `/palace refresh …`（仅刷新文献元数据）。
- 你要求智能体使用的任何 web 工具。

导出的 *Viewer* 是单个离线 HTML 文件，不发出任何外部请求。

## 手动运行 Python 核心

在插件文件夹中运行；每个模块都接受 `--config <path>`：

```bash
python -m knowledge_palace.graph.status        --config ~/palace/.palace.toml
python -m knowledge_palace.graph.builder       --config ~/palace/.palace.toml --rebuild
python -m knowledge_palace.interaction.research --config ~/palace/.palace.toml ask "your question"
python -m knowledge_palace.viewer.cli          --config ~/palace/.palace.toml ~/Desktop/palace-viewer.html
```

完整的模块表见[命令](commands.zh-CN.md#机械命令)。
