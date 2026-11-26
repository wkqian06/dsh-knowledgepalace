# KnowledgePalace · DESIGN.md

> 设计契约（提案）。KnowledgePalace 的界面、静态 Viewer、导出页面与后续原型都读这一份；
> 新组件先在这里找到 token 与规则，再写代码。它不是品牌手册，而是一份「让 10,968 条 Claim
> 仍然可读」的工程约束。
>
> 生产插件实现时，颜色与字体优先映射到 DSH 的 `--dsw-alias-*` token；本文的纸感色板是
> 独立 Viewer/原型的默认值，也是插件主题的基准。

## Visual Theme & Atmosphere

**Research folio（研究手稿）**：暖纸底色、墨色文字、低饱和的领域色、宋体标题、系统无衬线正文、等宽 ID。
目标是「可以连续读两小时」，不是「第一眼惊艳」。图谱是纸上的星图，不是霓虹屏幕。
克制的 chrome、充足的留白、清晰的层级；只有一个强调色。

关键词：paper, ink, quiet, editorial, evidence-first, long-reading。
避免：dark neon, glassmorphism, gradient hero, AI dashboard tile, emoji icon。

## Color Palette & Roles

### Light（默认）

| Token | Value | Role |
|---|---|---|
| `--bg` | `#F5F1E8` | 页面底色（暖纸） |
| `--surface` | `#FCFAF4` | 卡片 / 面板 / dock |
| `--surface-2` | `#EFEADF` | 选中段、segmented 底 |
| `--surface-3` | `#E8E2D5` | 头像、弱强调底 |
| `--ink` | `#1E2420` | 主文字（近黑，略暖） |
| `--muted` | `#6D756E` | 次文字、说明 |
| `--faint` | `#98A097` | 元数据、锚点 |
| `--line` | `#DCD5C6` | 1px 分隔线 |
| `--line-2` | `#C8C0AF` | 控件边框、hover |
| `--accent` | `#A94E2B` | 陶土：主按钮、当前选中、关键强调 |
| `--accent-2` | `#8C3F21` | accent hover |
| `--accent-ink` | `#FFF9F3` | accent 上的文字 |
| `--teal` | `#2F6B5C` | 证据 / 成功 / 索引健康 |
| `--amber` | `#A97A24` | 警告 / provisional |
| `--danger` | `#9E3B2E` | 错误 |

### Dark（夜间阅读）

| Token | Value |
|---|---|
| `--bg` | `#151916` |
| `--surface` | `#1B201C` |
| `--surface-2` | `#242A24` |
| `--ink` | `#E9E4D7` |
| `--muted` | `#A3ABA2` |
| `--line` | `#333B33` |
| `--accent` | `#DB8A62` |

暗色不是反色：保留纸感，降低对比，领域色提亮约 24%。

### Domain palette（8）

| 领域 | Light | Dark |
|---|---|---|
| 强对流 | `#B4532A` | `#C47958` |
| 机器学习天气预报 | `#3F6E9E` | `#6B8EB0` |
| 降水 | `#4F8A86` | `#77A39E` |
| 生成与表征学习 | `#7A5C8E` | `#9880A4` |
| 时间序列 | `#55606E` | `#7C838B` |
| 陆气耦合 | `#8A5A4A` | `#A47F70` |
| 地球科学因果 | `#A67C2E` | `#B9995B` |
| 地球科学智能体 | `#6E7F3E` | `#8F9B67` |

规则：

- 领域色只用于「领域身份」：图上节点、领域标签的点、领域 chip 的点。
- 强调色（陶土）只用于「当前动作/当前选中」，一屏最多 2 次。
- 不用紫蓝渐变、不用 `#6366f1` / indigo、不用发光。

## Typography Rules

| Role | Stack | Size / line-height |
|---|---|---|
| Display（页面标题、论文标题） | Iowan Old Style, Palatino Linotype, Songti SC, Noto Serif CJK SC, Georgia, serif | 26–32 / 1.15 |
| Section / card title | 同上 | 18–22 / 1.3 |
| UI body | system-ui, -apple-system, Segoe UI, PingFang SC, Microsoft YaHei | 12–14 / 1.55 |
| Reading（正文、引文） | serif stack | 13–15 / 1.7–1.85 |
| Meta / anchor / count | SFMono-Regular, Consolas, monospace | 9.5–11 / 1.4 |
| Kicker | system sans, uppercase, 10px, letter-spacing .16em | 10 / 1.4 |

规则：

- 不使用 10px 以下正文；元数据最小 9.5px。
- 中文标题不用斜体；强调用字重或颜色，不用 synthetic italic。
- 一页最多 3 种字重（400/500/600）。
- ID、Claim 号、锚点、年份计数一律 mono。

## Component Stylings

### Buttons

- 高度 34；圆角 8；1px 边框；surface 底；hover surface-2。
- Primary：accent 底 + accent-ink 字；一屏最多 1 个。
- Ghost：无边框、muted 字；用于「返回 / 关闭 / 次动作」。
- Small：28 高，11.5px；只用于卡片内。
- 所有按钮 `white-space: nowrap`；不换行。

### Chips

- 25–27 高；999 圆角；1px line；muted 字。
- 领域 chip 带 6px 圆点；选中时边框 ink、底色 bg。
- 不用彩色填充 chip（除领域点）。

### Cards

- surface 底；1px line；12 圆角；16 内边距；无阴影。
- 卡片套卡片不超过 1 层；嵌套用 `inner` 而不是第二张卡。
- 列表行用 1px 分隔线，不用卡片堆叠。

### Claim block

- 左侧 2px line-2 竖线；padding-left 11。
- 头部：Claim ID（mono, accent）+ 锚点（mono, faint）。
- 引文：serif 13/1.6，保留原文；不翻译。
- 条件：11px muted，单独一行。
- 不把 Claim 做成按钮；按钮只做「定位/提问/写入」。

### Evidence card

- 论文标题 + 年份/venue + 2 条引文 + 条件。
- 引文前用 `C2` mono chip。
- 不做「评分/星级/影响力」徽章。

### Dock

- 宽 378；surface；左侧 1px line；头部 52；tabs segmented。
- 证据 / 助手两个 tab；不出现第三个 tab。
- 空态：一个图标、一句「证据在这里展开」、一个示例按钮。

### Palette

- 居中 620×70vh；surface；14 圆角；阴影仅此处。
- 输入 14px；分组 9.5px mono；条目 44 高；选中 surface-2 + 左侧 2px accent。
- 底部键盘提示。

### Timeline

- 高约 90；surface 卡片；直方图 30 高；两个 9px 手柄；年份刻度 9.5px mono。
- 选区 accent 12% 填充；范围外柱 line-2。
- 双击重置；「全部」按钮。

## Layout Principles

- 外层：rail 78 + frame；topbar 60；stage 剩余。
- 桌面：rail 78 / 主区 / dock 378。
- ≤1180：dock 变 overlay，默认关闭；≤860：rail 只留图标，研究左栏隐藏。
- 内容最大宽度：研究 780；写作 760；维护 980。
- 间距：4 / 8 / 12 / 16 / 24 / 32 / 48；组内 8–12，组间 24–32。
- 12 列网格只用于页面级分栏；组件内部不用网格装饰。
- 一屏只允许一个主滚动区（页面或 dock，不同时）。

## Depth & Elevation

- 平面：默认。
- 浮层（popover / palette / modal）：`0 18px 50px rgba(30,36,32,.14)`，仅此一级。
- 卡片 hover：不抬升，只改边框颜色。
- 不用玻璃拟态、不用多层阴影、不用内阴影。

## Motion

- 120–180ms；`ease-out`；只用于出现/消失/选中。
- 画布不播放布局动画；重排由用户显式触发。
- 不使用循环动画、呼吸灯、粒子。
- `prefers-reduced-motion: reduce` → 全部 0ms。

## Do's and Don'ts

✅ 让留白承担层级；用 1px 线和间距分组。
✅ 一个屏幕一个主动作；其他动作 ghost/small。
✅ 先显示 Claim，再显示摘要。
✅ 用「论文 / 概念 / 空白 / 桥接」四个词，不用 "node"。
✅ 领域色只表示领域；强调色只表示当前动作。
✅ 图表里一句话说明编码；不写长图例。
✅ 暗色保留纸感，不做纯黑。

❌ 不用紫蓝渐变 / indigo / 霓虹。
❌ 不用 emoji 当图标。
❌ 不用「圆角卡片 + 左侧彩条」的 AI dashboard 套路。
❌ 不在一个屏幕放 3 个以上强调色。
❌ 不用 8 个布局滑杆；最多 3 个高级参数。
❌ 不用位置/深度暗示证据强度。
❌ 不在读操作上弹确认。
❌ 不把摘要当证据；不伪造 Claim。

## Accessibility

- 对比：正文 ≥ 4.5:1；大标题 ≥ 3:1；muted 文字只用于元数据，不用于正文。
- 点击目标 ≥ 24×24；主要按钮 34 高。
- 键盘：Tab 顺序、`:focus-visible` 2px accent、⌘K、Esc、↑↓/↵。
- Canvas：`aria-label` + 可访问的节点列表/搜索结果替代。
- 不用颜色单独传达状态；配文字或形状。
- 表单错误在字段旁，`aria-describedby`。
- 动效遵循 reduced-motion。

## Agent Prompt Guide

当 agent 为 KnowledgePalace 生成或修改界面时：

1. 先读本文件；token 不可发明新的 hex。
2. 默认使用纸感浅色；暗色是同一 token 的第二套值。
3. 一个屏幕最多 1 个 primary button、2 次 accent。
4. 信息层级：标题 → 一句说明 → 主内容 → 次要动作；不要反过来。
5. 图谱默认 2D；4 个镜头；3 个高级参数；不新增滑杆。
6. 证据一律结构化：Claim ID + 引文 + 条件 + 锚点；保留原文。
7. 新增入口先问「它属于哪个家」；不属于四个家就不加。
8. 任何 29 个 `/palace` 命令都必须能在 ⌘K 中被搜到。
9. 写入必须「变更包 + 一次确认」；读操作不确认。
10. 完成后用五维 critique 自评：哲学 / 层级 / 细节 / 功能 / 创新；给出 Keep / Fix / Quick wins。

---

*本文件是提案。它不修改 `dsh-knowledgepalace` 的生产策略；生效前需要仓库所有者确认。*
