# 故障排查

[English](troubleshooting.md) · [简体中文](troubleshooting.zh-CN.md)

| 症状 | 原因 | 解决办法 |
|---|---|---|
| *"Python 3.12+ was not found. Set PALACE_PYTHON…"*（未找到 Python 3.12+） | 未发现 ≥ 3.12 的解释器 | 安装 Python 3.12+，把 `PALACE_PYTHON` 设为其完整路径，重启 DSH。发现顺序：`PALACE_PYTHON` → `<plugin>/.venv` → `python`/`python3`。 |
| *"The Private library is not set up yet: no .palace.toml at …"*（私人知识库尚未设置） | 尚未创建私人知识库配置。全新安装时面板会自动打开演示库；只有手动选择 *私人知识库* 时才会出现这条提示 | 创建四个文件夹和 `.palace.toml`（[快速上手](getting-started.zh-CN.md#3-创建私人知识库)），设置 `PALACE_CONFIG`，重启 DSH。演示库无需它即可使用。 |
| *"resolved root is not an existing directory"*（解析出的根目录不是已存在的目录） | `.palace.toml` 中指定的某个文件夹不存在 | 创建它；路径相对于配置文件，而不是 shell。 |
| *"… and … resolve to the same directory"*（两者解析为同一目录） | 两个键指向同一个文件夹 | 使用四个互不相同的文件夹。 |
| *"…:N: value must be exactly one double-quoted string, got: …"*（值必须恰好是一个双引号字符串） | 配置用了完整 TOML 特性（单引号、行内注释、数组） | 只保留恰好四行 `key = "value"`；注释只能单独占一行。 |
| 环境变量似乎被忽略 | DSH 在设置变量之前就已启动 | 在启动 DSH 的环境中设置（Windows 上用 `setx` 然后重启），再重启 DSH。 |
| `/palace status` 列出 `missing_sources` | 某张卡片的 `local:` 文件不在 `source_dir` 中 | 补回来源文件或修正卡片的 `local:` 路径。演示库里那 19 张全文卡片会被列出，这是有意为之：演示库只带卡片，不带全文。 |
| 索引显示 *stale*（过期） | 自上次构建以来 Vault 已变化 | 运行 `palace_rebuild_index`（或 *维护 → 重建派生索引*）。索引是派生的，可放心重建。 |
| `/palace status` 提示 *"concepts.md: not found"* 与 *"domains.md: not found"* | 知识库是新建的，还没有注册表 | 属预期。第一次入库会写入这两个文件，第一次检索会建立索引。 |
| PDF 入库失败，提示 `No module named pypdfium2` | 缺少可选依赖 | 在 DSH 所用的解释器中执行 `pip install pypdfium2`。 |
| 图谱面板为空 / *"图谱页面为空"*（英文界面为 *"Graph page is empty"*） | 索引尚未构建，或知识库中没有论文 | 检查 `/palace status`；重建索引；入库论文。 |
| *"图谱加载失败"*（英文界面为 *"Failed to load graph"*） | Python 失败或超时 | 在插件文件夹中运行 `python -m knowledge_palace.graph.status --config <your .palace.toml>` 查看真正的错误。 |
| 网络命令没有任何反应 | 除非授权 `--live`，否则收集功能离线工作 | 明确要求智能体联网检索；参见[配置](configuration.zh-CN.md#网络使用)。 |
| 面板中的会话提示 *"session library binding conflicts with working directory"*（会话的知识库绑定与工作目录冲突） | 绑定到某个知识库的会话运行在另一个知识库的文件夹中 | 解除该会话的关联（*会话操作 → 解除关联*），并从目标知识库新建会话。 |
| 无法远程打开 web 操作端点 | 操作需要经认证的所有者连接 | 在所属机器上使用 `dsh web` 打印的 URL。 |

## 收集诊断信息

```bash
python -m knowledge_palace.tools.config_resolver --config <config>   # roots resolve?
python -m knowledge_palace.graph.status --config <config>            # counts, index, missing sources
python -m knowledge_palace.graph.builder --config <config> --check   # full index verification
```

请在插件文件夹中使用 Python 3.12+ 运行它们。

## 报告 bug

请附上：DSH 版本、插件版本（`package.json`）、操作系统、Python 版本、完整的错误文本，以及去除私人路径后的 `graph.status` 输出。
