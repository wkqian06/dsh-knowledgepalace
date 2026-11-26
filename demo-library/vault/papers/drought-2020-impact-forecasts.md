---
slug: drought-2020-impact-forecasts
title: "Skill of large-scale seasonal drought impact forecasts"
authors: ["Sutanto, S. J.", "van der Weert, M.", "Blauhut, V.", "Van Lanen, H. A. J."]
year: 2020
venue: "Natural Hazards and Earth System Sciences"
journal_if: n/a (not assessed)
citations: 44
citations_date: 2026-11
weight: low (OpenAlex citations 44; bibliographic context only)
publication_status: peer-reviewed
source: "10.5194/nhess-20-1595-2020"
local: "fulltext/drought-2020-impact-forecasts.pdf"
added: 2026-11-08
read_depth: full
source_coverage: full-text
domain: [drought-research]
task: []
pattern: []
function: []
method: []
metric: []
failure-mode: []
gaps: []
---

# Skill of large-scale seasonal drought impact forecasts

## Summary

该研究回答"能否把干旱危害的季节预报转成干旱影响预报"，即用机器学习影响函数把 SPI、SPEI、SRI 等危害指数映射为影响发生概率（LIO）。方法上以 EDII 的 1990–2017 年德国县级（NUTS-1）影响记录训练逻辑回归（LR）与随机森林（RF），再用 EFAS/LISFLOOD 与 ECMWF SEAS4 的 2002–2010 年回报（预见期 215 天、15 个集合成员）驱动，并在 5 种空间聚合与影响部门组合（case 1–5）下用 BSS 与 ROC 评分。主要发现：水文干旱指数 SRI 的回报技巧高于 SPI 与 SPEI；对回报数据的评估中 RF 在长预见期仍保有技巧而 LR 全部失效（短期 LR 约 0.74、RF 约 0.85）；空间分辨率更高、部门合并更少的 case 4–5 技巧最高，可靠预见期约 3–4 个月。核心边界是影响数据的可用性：报告影响月份少于 20 的地区（HH、HB、ST、TH、SL）无法建立影响函数；观测记录仅 28 年（低于 30 年建议），且长累积期指数会人为抬高危害评分。

## Claims

- C1 [drought-research]: "The forecasting skill of drought impacts using machine learning greatly depends on the availability of impact data." — Abstract / p.1595 [PDF page 1]
- C2 [drought-research]: "the skill of seasonal drought impact forecasts using the RF and LR approaches for different combinations of spatial aggregations and impact categories" — §1 Introduction [¶5] / p.2
- C3 [drought-research]: "For cases 2 and 5, all 15 individual impacted sectors were tested to forecast drought impacts" — §2.1 The EDII database [¶5] / p.4
- C4 [drought-research]: "Re-forecasts of meteorological and hydrological variables have a lead time (LT) of 215 d (circa 7 months) and consist of 15 ensemble members" — §2.2 Hydro-meteorological dataset [¶2] / p.4
- C5 [drought-research]: "The AUC has a range from 0 to 1, with a perfect score of 1. AUC = 0.5 is as good as flipping a coin" — §2.5 Forecasting skill score [¶3] / p.6
- C6 [drought-research]: "The predictive power of the model is assessed by comparing it with observed impacts from the last 2 years (2016 to 2017, split-sampling technique)" — §3.2 Skill of drought impact forecasts using observed data [¶1] / p.6
- C7 [drought-research]: "the skill much improves for longer accumulation periods, i.e., SPI-12, with BSS values around 0.7 for 1-month LT" — §3.1 Skill of drought hazard forecasts [¶2] / p.6
- C8 [drought-research]: "drought index, SRI-x, predicts drought better than the meteorological drought indices, for example SPI-x and SPEI-x" — §3.1 Skill of drought hazard forecasts [¶2] / p.6
- C9 [drought-research]: "score for LR (ROC = 0.53) is substantially lower than RF (ROC = 0.7)" — §3.2 Skill of drought impact forecasts using observed data [¶2] / p.6
- C10 [drought-research]: "The skill of drought impact forecasts using LR for short LTs (cases 3–5) varies around 0.74, while the skill using RF fluctuates around 0.85" — §3.3 Skill of drought impact forecasts using re-forecast data [¶2] / p.7
- C11 [drought-research]: "for drought impact models evaluated using re-forecast data, RF shows better performance, denoted by higher ROC scores" — §4 Discussion [¶2] / p.8
- C12 [drought-research]: "In our study, we could only use 28 years of observational record (proxy) from 1990 to 2017" — §4 Discussion [¶1] / p.8
- C13 [drought-research]: "Drought impact functions could not be developed in HH, HB, ST, Thüringen (TH), and Saarland (SL) or any case because there are fewer than 20 months with reported impacts" — §4 Discussion [¶5] / p.9
- C14 [drought-research]: "The BSS is also sensitive to rare events, such as extreme wet and dry conditions" — §4 Discussion [¶6] / p.10
- C15 [drought-research]: "Longer accumulation periods consist of a longer series of observation data relative to the lead time, which is a caveat for forecasting skill assessment" — §5 Conclusions [¶2] / p.11
- C16 [drought-research]: "For the former cases, drought impacts can be predicted up to 3–4 months ahead with considerable skill" — §5 Conclusions [¶3] / p.11
- C17 [drought-research]: "This is a reason that we are in favor of lumping impact data into several impact groups (case 4)" — §5 Conclusions [¶4] / p.11

## Study profile

- subjects: C3, C12
- method: C4, C5
- comparator: C9, C10
- outcomes: C7, C8, C11, C16
- limitations: C13, C14

## Argument

| Role | Claim | Paraphrase | Attribution | Scope |
|---|---|---|---|---|
| problem | C2 | 现有干旱早期预警只给危害指数预报，能否用影响函数把危害转成有一定预见期的干旱影响概率预报尚不清楚 | author | 德国，季节尺度（≤7 个月） |
| advance | C4 | 用 ECMWF SEAS4 驱动 LISFLOOD 的 215 天回报（15 个集合成员）作为预报输入，与观测驱动的同时段数据对照 | author | 2002–2010 回报，1990–2017 观测 |
| advance | C11 | 对回报数据评估时 RF 的判别能力高于 LR，且长预见期 LR 全部无技巧而 RF 仍保有技巧 | author | case 1–5，德国 NUTS-1 |
| advance | C16 | 空间分辨率更高、部门合并更少的 case 4–5，可在 3–4 个月预见期上给出可用技巧 | author | case 4–5，2002–2010 回报 |
| remaining | C15 | 长累积期指数的技巧被同期观测比例抬高，属评估口径问题而非纯预报能力 | author | 所有指数与累积期 |

## Conditions

| Dimension | Value | Evidence |
|---|---|---|
| 影响数据 | EDII 逐月二元影响序列（0 无影响 / 1 有影响），德国全国与 NUTS-1 县级，1990–2017 年；报告影响少于 20 个月的地区被排除 | C13 |
| 案例设计 | case 1–2 为全国尺度，case 3–5 为 NUTS-1；case 2 与 case 5 使用全部 15 个影响部门，case 1 与 case 3 全部合并，case 4 合并为 4 组 | C3 |
| 预报系统与预见期 | EFAS（LISFLOOD 产流）加 ECMWF SEAS4 季节回报，预见期 215 天（约 7 个月），15 个集合成员 | C4 |
| 危害指数 | SPI-x、SPEI-x、SRI-x，累积期 1、3、6、12 个月；长累积期技巧更高，SPI-12 在 1 个月预见期 BSS 约 0.7 | C7 |
| 验证设计 | 用 1990–2015 观测训练，以 2016–2017 观测做分割样本检验；另用 1990–2017 全样本训练后对 2002–2010 回报评估 | C6 |
| 评分指标 | BSS 与 ROC/AUC；AUC 取值 0–1，0.5 相当于抛硬币 | C5 |

## Analysis evidence

| Claim | Analysis / figure | What it supports | Boundary |
|---|---|---|---|
| C7 | Fig. 2（SPI/SPEI/SRI 各累积期对 7 个月预见期的 BSS 与 ROC，2002–2010 中位数） | 累积期越长、预见期越短，危害预报技巧越高；SPI-12 在 1 个月预见期 BSS 约 0.7 | 仅德国，15 个集合成员的中位数 |
| C8 | Fig. 2 中 SRI 与 SPI/SPEI 的对比 | 同一累积期下 SRI 技巧高于气象指数，归因于水文系统的记忆 | 依赖 LISFLOOD 模拟径流（NSE 中位数 0.57） |
| C9 | Fig. 3（5 个 case 的 ROC 箱线图，验证期 2016–2017） | case 1 中 LR 判别力（0.53）明显低于 RF（0.7）；其他 case 两法相近 | 验证期仅 2 年，影响函数数量受报告数限制 |
| C10 | Fig. 4（短期 1–3 月与长期 4–7 月预见期的 ROC 箱线图） | 短期技巧 LR 约 0.74、RF 约 0.85；长预见期 LR 全部无技巧、RF 仍有技巧 | 以中位数概括，逐 case 分散度较大（LR 尤甚） |
| C16 | Fig. 4 与 Fig. 5（case 4–5 的 ROC/BSS 随预见期变化） | case 4–5 的 RF 影响函数在 3–4 个月预见期内仍保持可用技巧 | 作者未给出"considerable skill"的数值门槛；case 5 可建函数数受限 |
| C13 | Fig. S4（各 NUTS-1 地区报告影响月数）与 Fig. 5 | 少于 20 个月报告的地区无法建立影响函数；合并部门（case 4）可在 SH 等数据稀疏区建模 | 补充材料图，未在正文逐值核对 |

## Limitations & gaps

- 观测记录仅 28 年（1990–2017），低于标准化指数建议的 30 年；作者认为缺少 1988–1989 年影响不大，但极端事件缺失会使指数分布尾部参数有偏（C12）。
- 长累积期指数的技巧被"观测段相对预见期更长"这一口径人为抬高，BSS 评分因此不能直接读作纯预报能力（C15）。
- BSS 对稀有事件（极端干湿）敏感、需要大样本才稳定；ROC 虽对偏差不敏感，却忽略概率可靠性与拟合优度（C14）。
- 影响数据可用性是硬约束：HH、HB、ST、TH、SL 在任一种 case 下都无法建模（报告月数 <20）（C13）。
- case 5 技巧最高但可建立的影响函数更少，作者因此在业务化上更倾向 case 4 的部门合并方案（C17）——技巧与覆盖面之间存在取舍。
- 作者自述：LR 与 RF 使用了不同数量的预测因子（LR 经显著性、共线性与 AIC 逐步筛选，RF 用全部预测因子），两者技巧差异因此混入了预测因子数的差异；RF 也未做交叉验证，仅用 OOB 与 caret 变量重要性（§2.4、§4）。
- 影响函数只预测影响"发生与否"（二元），未预测影响强度；影响记录本身来自文献、媒体与问卷，报告强度随年份上升，年份被作为预测因子以吸收该趋势（§2.4）。

## Reading notes

- 2026-11-08: 全文精读（PDF 第 1–14 页；第 12–14 页为参考文献）。此前仅有摘要级 Claim C1，本次保留其原文与锚点，新增危害预报、影响函数、验证与局限四类 Claim（C2–C17）。段序（¶）依正文段落起首推断，原文分页处有跨页连续句，个别 ¶ 计数为近似值。
- 2026-11-08: 阅读时的解释性判断（非 Claim）：摘要称"随机森林判别力更高"，但这一优势在分割样本检验中只对 case 1 明显（C9），在对回报数据的评估中才对所有 LT 显现（C11）；因此"RF 优于 LR"主要是长预见期与全样本训练下的结论，且与两法预测因子数不同有关。
- 2026-11-08: 未核对的内容：Fig. 2–5 与补充材料 Fig. S1–S4 的具体数值只能从图中读取，本卡数字均引自正文叙述；BSS 气候态阈值 −0.5 与指数分布（gamma / 三参数 log-logistic）细节在 §2.3、§2.5，未单列 Claim。
- 2026-11-08: 待跟进：Sutanto et al. (2019b, Nat. Commun. 10, 4945) 是本文的直接前作（仅 RF、部门合并），可对照本文 LR/RF 与 case 设计的增量；Bachmair et al. (2017, NHESS 17, 1947) 提供影响函数方法的原始设定；Stahl et al. (2016, NHESS 16, 801) 是 EDII 数据库的权威描述，用于判断影响记录的选择偏差。
