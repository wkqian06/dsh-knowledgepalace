# 快速上手

[English](getting-started.md) · [简体中文](getting-started.zh-CN.md)

本指南带你在大约十分钟内，从零开始搭建一个可用的**私人知识库**。如果只想先看看效果，可以直接跳到[演示库教程](tutorial-demo-library.zh-CN.md)——无需任何配置。

## 1. 环境要求

| 需要 | 原因 |
|---|---|
| DeepSeek Harness（Web UI） | 插件会添加侧边栏面板、`/palace` 命令和 `palace_*` 工具。开发并测试于 `0.2.2-rc.3`。 |
| Node.js `^22.19` 或 `>=24` | DSH 本身已要求。 |
| **Python 3.12 或更新版本** | 机械核心（图索引、检索、写作工作区、viewer）是纯标准库 Python。 |
| `pypdfium2` *（可选）* | 仅用于入库 PDF 全文：`pip install pypdfium2`。 |

检查 Python：

```bash
python --version        # must print 3.12 or newer
```

如果默认的 `python` 版本过旧，请安装 3.12+，并用 `PALACE_PYTHON` 让插件指向它（见[配置](configuration.zh-CN.md)）。

## 2. 安装插件

- **DSH Plugin Manager** → 搜索 `dsh-knowledgepalace`（插件市场上架后即可搜到）→ *Install*。安装新的插件包后会立即生效，无需重启。
- **或从源码检出安装**：在该文件夹中运行 `npm install`，然后在 Plugin Manager 中安装本地目录并选中它。

此时 DSH 侧边栏应出现 **知识宫殿**。打开它，在 *选择知识库* 中选择 *演示库（干旱文献）*，确认图谱能够加载。若能加载，说明插件和 Python 都工作正常。

## 3. 创建私人知识库

一个知识库由四个文件夹加一个四行的配置文件组成。它们可以放在插件文件夹**之外**的任何位置；建议放在你自己的同步目录或版本控制目录中。KnowledgePalace 绝不会对它们运行 Git。

| 文件夹 | 存放内容 | 可重建？ |
|---|---|---|
| `vault/` | 论文卡片、概念、研究空白、治理决策 | 否——这是你的知识 |
| `sources/` | 卡片所引用的全文 / 来源文件 | 否——原始证据 |
| `workspace/` | 你的稿件、笔记、已保存的章节与修订 | 否——你的工作成果 |
| `state/` | 图索引、草稿、缓存 | **是**——派生状态 |

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
[IO.File]::WriteAllText("$p\.palace.toml", $cfg)   # 不写 BOM，见下方说明
```

> Windows PowerShell 5.1 的 `Set-Content -Encoding utf8` 会写入 BOM。插件会忽略它，但 `[IO.File]::WriteAllText` 写出的是纯 ASCII，与上面示例的假设一致。

相对路径以配置文件自身所在的文件夹为基准；绝对路径同样可用。四个根目录必须已存在且互不相同。

## 4. 告诉插件知识库在哪里

在**启动 DSH 的进程**的环境中设置 `PALACE_CONFIG`，然后重启 DSH：

```bash
export PALACE_CONFIG=~/palace/.palace.toml            # macOS / Linux
```
```powershell
setx PALACE_CONFIG "$HOME\palace\.palace.toml"          # Windows (then restart DSH)
```

> 替代做法：把同样的 `.palace.toml` 放到插件文件夹中。这样也可行，但插件升级可能会替换该文件夹——环境变量更稳妥。

在终端中以插件文件夹作为工作目录进行验证：

```bash
python -m knowledge_palace.tools.config_resolver --config ~/palace/.palace.toml
```

它会打印四个已解析的根目录。在 DSH 中运行 `/palace status`：新建的知识库会显示 `papers: 0`、索引状态 `absent`（可重建），以及两条提示——`concepts.md` 与 `domains.md` 尚不存在。这是预期的：第一次入库会写入它们，第一次检索会建立索引。

## 5. 填充知识库

在**私人知识库**中打开一个 DSH 会话并输入：

```
/palace init "soil moisture drought forecasting" 20
```

智能体会检索元数据提供方（这是网络调用，仅因你的请求而发起），展示候选论文，并在你选定后将其入库（ingest）为卡片。`expand`、`ingest` 等其他路由见[命令](commands.zh-CN.md)，卡片包含的内容见[概念](concepts.zh-CN.md)。

已经有 PDF？把它们放在任何可读取的位置，然后运行 `/palace ingest <path-to-pdf>`。（PDF 文本提取需要 `pypdfium2`。）

## 6. 接下来做什么

- 浏览结果：侧边栏 → *探索* → *打开全局关系图*。
- 提出有依据的问题：`/palace ask <question>` 或 *提问* 标签页。
- 基于证据写作：在 *写作* 标签页新建论文项目，或使用 `/palace write <project> introduction`。
- 保持知识库健康：`/palace status`、`/palace audit`、`/palace govern`。
