---
slug: vegetation-2022-soil-moisture
title: "Widespread increasing vegetation sensitivity to soil moisture"
authors: ["Li, W.", "Migliavacca, M.", "Forkel, M.", "Denissen, J. M. C.", "Reichstein, M.", "Yang, H.", "Duveiller, G.", "Weber, U.", "Orth, R."]
year: 2022
venue: "Nature Communications"
journal_if: n/a (not assessed)
citations: 460
citations_date: 2026-11
weight: high (OpenAlex citations 460; bibliographic context only)
publication_status: peer-reviewed
source: "10.1038/s41467-022-31667-9"
local: "fulltext/vegetation-2022-soil-moisture.pdf"
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

# Widespread increasing vegetation sensitivity to soil moisture

## Summary

论文回答 1982–2017 年全球植被（以叶面积指数 LAI 表征）对土壤水分可用性的敏感性是否发生长期变化、以及敏感热点区在哪。方法上用随机森林加 SHAP 可解释机器学习，在去趋势、去季节的异常序列上估计 LAI 对近地表与亚表层土壤水分的“总体敏感性”，再用 3 年块数据估计敏感性趋势，并与 9 个 TRENDY 陆面模式对照。结果显示观测的亚表层土壤水分敏感性在全球平均显著上升（p<0.01），约 30% 研究区上升、约 15% 下降，最强上升出现在总体敏感性高且降水明显减少的区域。归因分析表明降水趋势与总体敏感性是主控因子，土壤水分趋势、能量相关变量与植被组成影响次之。模式未能再现该上升趋势，作者归因于模式对总体敏感性空间格局与量级的刻画不准。边界在于观测端存在 LAI 产品反演、土壤水分再分析（亚表层无直接卫星同化）与 AVHRR 仪器伪趋势三类不确定性，Fig. 1 结果未做场显著性检验，且模式间分歧较大。

## Claims

- C1 [drought-research]: "We show that LAI sensitivity to soil moisture significantly increases in many semi-arid and arid regions." — Abstract / p.1 [PDF page 1]
- C2 [drought-research]: "Yet, it remains unclear how climate change has affected the sensitivity of global vegetation to soil water availability, and if there are potential hotspot regions with high vegetation sensitivity to soil moisture where vegetation is particularly vulnerable to changes in soil moisture availability." — §Introduction [¶1] / p.2
- C3 [drought-research]: "the Shapley Additive Explanations (SHAP) method in random forest modeling to estimate the sensitivity of LAI to soil moisture" — §Introduction [¶3] / p.2
- C4 [drought-research]: "We find significantly increasing trends (p < 0.01) for observed LAI sensitivity to sub-surface soil moisture after averaging global results (Fig. 3a)." — §Increasing LAI sensitivity to soil moisture [¶1] / p.4
- C5 [drought-research]: "LAI sensitivity increases in ~30% of the study area and mainly occurs in central and southern North America, central Eurasia, India, Australia, eastern Africa, central and eastern South America" — §Increasing LAI sensitivity to soil moisture [¶1] / p.4
- C6 [drought-research]: "By contrast, there is no trend in LAI sensitivity to sub-surface soil moisture in TRENDY model simulations after averaging global results (Fig. 3a)." — §Increasing LAI sensitivity to soil moisture [¶1] / p.5
- C7 [drought-research]: "We find that the observed spatial trend patterns are strongly related to (i) overall LAI sensitivity to sub-surface soil moisture and (ii) inter-annual precipitation trends" — §Attribution of trends of LAI sensitivity to soil moisture [¶1] / p.5
- C8 [drought-research]: "Soil moisture trends also play a role, even though they are less prominent than precipitation trends." — §Attribution of trends of LAI sensitivity to soil moisture [¶1] / p.5
- C9 [drought-research]: "The role of overall LAI sensitivity in determining sensitivity trends in models is less clear than in the observations, suggesting that this key deficiency is behind the reason for the poor modeled trends in LAI sensitivity" — §Attribution of trends of LAI sensitivity to soil moisture [¶2] / p.5
- C10 [drought-research]: "uncertainties in the soil moisture reanalysis products which rely on modeling assumptions, can be more pronounced for sub-surface soil moisture, as this layer does not have direct satellite data" — §Attribution of trends of LAI sensitivity to soil moisture [¶3] / p.5
- C11 [drought-research]: "Land surface models fail to capture the increasing LAI sensitivity to soil moisture, related to an inaccurate representation of overall LAI sensitivity in terms of spatial patterns and magnitude." — §Conclusion [¶1] / p.6
- C12 [drought-research]: "Overall, the detected increasing vegetation sensitivity to soil moisture reflects enhanced ecosystem vulnerability to soil dryness." — §Conclusion [¶1] / p.6
- C13 [drought-research]: "To note that the results are a descriptive measure, as the field significance is not tested." — §Fig. 1 caption / p.3
- C14 [drought-research]: "We use five satellite-based LAI products that cover the period 1982-2017." — §Methods: Observation-based data [¶1] / p.6
- C15 [drought-research]: "where we use layer 1 (0-7 cm depth) as near-surface soil moisture and the weighted mean of layers 2 (7-28 cm) and 3 (28-100 cm) as sub-surface soil moisture." — §Methods: Observation-based data [¶3] / p.6
- C16 [drought-research]: "we simulate monthly LAI and multi-layer soil moisture during 1982-2017 using 9 models from the TRENDY v7." — §Methods: Model data [¶1] / p.6
- C17 [drought-research]: "We note that the rather low threshold (OOB R2 > 0) is selected because of a typically significantly decreased model performance" — §Methods: Overall sensitivity [¶3] / p.7
- C18 [drought-research]: "All observational and LSMs data are aggregated to monthly temporal resolution, and 0.5°x0.5˚ spatial resolution, including that a few models are upscaled regarding spatial resolutions." — §Methods: Data pre-processing [¶1] / p.7
- C19 [drought-research]: "we present combined impacts from the top two important variables which are precipitation trends and overall sensitivity" — §Methods: Attribution analysis [¶1] / p.7
- C20 [drought-research]: "The global study area is defined by the total vegetation cover (sum of tree and non-tree cover) ≥ 5% using 1982 -2016 averages" — §Methods: Auxiliary data [¶1] / p.7
- C21 [drought-research]: "Grid cells with negative overall sensitivity or non-significant (p > =0.1) results are defined as non-soil-moisture controlled regions, meaning that energy-related variables such as radiation could dominantly control vegetation growth, and the detected dependence on water is likely due to confounding effects." — §Methods: Trends of sensitivity [¶1] / p.7

## Study profile

- subjects: C5
- method: C3, C16
- comparator: C6, C11
- outcomes: C4, C7, C12
- limitations: C10, C13, C21

## Argument

| Role | Claim | Paraphrase | Attribution | Scope |
|---|---|---|---|---|
| problem | C2 | 气候变化是否已改变全球植被对土壤水分的敏感性、敏感热点区在哪，此前不清楚 | author | 全球陆地，1982–2017，观测与模式对照前的问题设定 |
| advance | C4 | 观测的亚表层土壤水分敏感性在全球平均呈显著上升趋势（p<0.01） | author | 观测集合均值，1982–2017，亚表层土壤水分 |
| advance | C5 | 约 30% 研究区敏感性上升，集中于北美中部与南部、欧亚中部、印度、澳大利亚、东非与南美中东部 | author | 观测集合，格点趋势，亚表层 |
| advance | C7 | 敏感性趋势的空间格局主要由总体敏感性与年际降水趋势解释 | author | 观测，亚表层，SHAP 归因分组 |
| advance | C11 | 陆面模式未能再现该上升趋势，源于对总体敏感性空间格局与量级的刻画偏差 | author | TRENDY v7 模式集合，全球 |
| remaining | C9 | 模式中总体敏感性对趋势的作用弱于观测，说明模式端机制仍不清楚 | author | 模式网格，归因分析，与观测对照 |

## Conditions

| Dimension | Value | Evidence |
|---|---|---|
| 植被数据 | 5 个长时序卫星 LAI 产品（GIMMS3g、LTDR、GLASS、GLOBMAP、GEOV2-AVHRR），覆盖 1982–2017 | C14 |
| 土壤水分数据 | ERA5-Land 再分析：第 1 层（0–7 cm）作近地表，第 2、3 层加权（7–28、28–100 cm）作亚表层 | C15 |
| 时空分辨率 | 统一聚合到月度、0.5°x0.5° 网格 | C18 |
| 研究区界定 | 总植被覆盖（乔木+非乔木）≥5%（1982–2016 均值），且排除灌溉与无植被区 | C20 |
| 敏感性定义 | 随机森林 + SHAP 依赖关系上 Theil-sen 回归斜率，即“总体敏感性” | C3 |
| 模式对照 | TRENDY v7 的 9 个陆面模式（ISAM、LPX-Bern、CLM5.0、JSBACH、JULES、ORCHIDEE-CNP、LPJ-GUESS、VISIT、CABLE-POP），Scenario 3，CRU-JRA 共同强迫 | C16 |
| 模式性能筛选 | 剔除 OOB R² ≤ 0 的格点；作者说明该阈值偏低是为保留足够样本 | C17 |
| 分析对象限制 | 仅保留总体敏感性为正且显著的土壤水分控制区，以抑制能量变量的混杂 | C21 |
| 显著性口径 | 格点双尾检验 p<0.01（Theil-sen / Mann-Kendall）；但 Fig. 1 未做场显著性检验 | C4 |
| 归因变量 | 以降水趋势与总体敏感性为前两位重要变量，分组展示趋势 | C19 |

## Analysis evidence

| Claim | Analysis / figure | What it supports | Boundary |
|---|---|---|---|
| C4 | Fig. 3a：1982–2017 全球平均 3 年块灵敏度时间序列及趋势斜率 | 观测集合的亚表层敏感性显著上升，模式集合无趋势 | 全球陆地平均；3 年块；Mann-Kendall 检验；集合四分位区间 |
| C5 | Fig. 3b：亚表层灵敏度趋势空间图与区域面积占比插图 | 上升约 30%、下降约 15% 的空间格局 | 观测集合均值；格点 p<0.1；排除灌溉与无植被区 |
| C6 | Fig. 3a/3c：模式集合的趋势曲线与空间图 | 模式无全球趋势，且区域增减面积相当、模式间离散大 | TRENDY v7 集合；Scenario 3 |
| C7 | Fig. 4a：按降水趋势 × 总体敏感性分组的趋势中位数（并标注格点数） | 最强上升出现在“高总体敏感性 + 降水下降”组 | 观测集合均值；分组基于 SHAP 归因的前两位变量 |
| C11 | Figs. 1–3：总体敏感性空间格局、响应函数与趋势的观测-模式对比 | 模式在格局、量级与非线性响应上系统性偏离观测 | 9 模式集合；近地表与亚表层分别对比 |

## Limitations & gaps

- 观测端三类不确定性（作者自述）：LAI 产品反演与对绿度/生产力的代表性、土壤水分再分析依赖建模假设（亚表层尤甚，见 C10）、AVHRR 长期序列的仪器伪趋势。
- Fig. 1 的敏感性结果为描述性统计，未做场显著性检验（C13），故“显著”仅指格点层面。
- 总体敏感性由线性回归斜率定义，作者明确指出其不能代表格点内 LAI 与土壤水分的完整非线性交互（阅读者归纳，§Methods: Overall sensitivity）。
- 5 个 LAI 产品中 GLASS 的长期趋势方向与其他产品分歧，是主要结果稳健性的唯一例外；作者将其归因于该产品在 MODIS 之前时段的已知偏差（§Methods: Observation-based data，本卡未单列 Claim）。
- 模式间分歧大，土壤-植被过程、根剖面、水势、土壤层数与深度处理以及土壤水分约束对碳分配/物候/光合的表述均不同，因此模式失配难以归因到单一机制（p.3、p.5 段落；阅读者归纳）。
- 亚表层土壤水分趋势的观测不确定性高于降水趋势，这被作者用来说明为何土壤水分趋势的作用弱于降水趋势（C8）。
- 卡片层面：概念注册表目前只有 domain 根 slug，尚无 gap 卡，故 frontmatter `gaps` 保持为空。

## Reading notes

- 2026-11-08: 为“全球植被对土壤水分的敏感性是否随干旱化增强、热点在哪”的问题通读全文（9 页 PDF 文本，含 Methods、Data/Code availability 与参考文献）。本轮新增 20 条 Claim，覆盖问题设定、RF+SHAP 方法、全球趋势与区域格局、归因、模式失配、不确定性/边界与数据质量控制条件；原有 C1 保留原样。仍未读：补充材料（Supplementary Figs 1–15、Table 1）与图 1–4 的图形本身，图形相关判断均据图注与正文描述。
- 2026-11-08: 值得追读的参考文献：Li et al. 2021（ref. 5，多层土壤水分下重访全球植被控制）与 Jiao et al. 2021（ref. 8，近三十年水分限制增强）是本卡“总体敏感性”与“敏感性上升”论断的直接前身；Gampe et al. 2021（ref. 10）提供暖干旱影响北半球生态系统生产力的证据；Konings et al. 2017（ref. 11）解释草地生产力对干旱的敏感性受气孔与木质部调控，可用于理解作者对草本/灌木区强敏感性的解释。
