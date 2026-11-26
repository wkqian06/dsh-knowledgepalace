---
slug: hazaymeh-2016-drought-review
title: "Remote sensing of agricultural drought monitoring: A state of art review"
authors: ["Hazaymeh, K.", "Hassan, Q. K."]
year: 2016
venue: "AIMS Environmental Science"
journal_if: n/a (not assessed)
citations: 115
citations_date: 2026-11
weight: low (bibliographic context only; not assessed)
publication_status: peer-reviewed
source: "10.3934/environsci.2016.4.604"
local: "fulltext/hazaymeh-2016-drought-review.pdf"
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

# Remote sensing of agricultural drought monitoring: A state of art review

## Summary

这篇综述要回答的问题是：在原位站点只能代表点位、难以刻画大范围空间格局的前提下，如何借助遥感以及遥感与原位数据的协同来监测农业干旱。作者把已有指标分为六类——原位、光学遥感、热红外遥感、微波遥感、组合遥感、以及原位与遥感的协同——并逐类梳理输入变量、代表指标、优点和局限，用六张对照表汇总。核心判断是：指标的有效性高度依赖地表与植被条件，裸土指标适用于裸地、植被指标适用于中高密度植被，因此单靠任何一类指标都无法在稀疏植被为主的半干旱区给出可靠监测。分辨率上的结构性矛盾更关键：被动微波空间分辨率粗（10–20 km），主动微波时间分辨率差（约一个月），热红外指标多限于裸地或稀疏冠层，而田间尺度监测同时需要约 30 m 的空间分辨率与每周级的时间分辨率。作者由此把多源数据融合、缺值填补、一致历史数据集、干旱预报系统、新传感器集成和标准化验证列为六大待解挑战。边界：本文是叙述性综述，未报告检索与纳入标准，也未在统一数据上比较各指标的定量精度。

## Claims

- C1 [drought-research]: "The in-situ indices can provide accurate results at the point of measurements; however, unable to provide spatial dynamics over large area." — Abstract / p.604 [PDF page 1]
- C2 [drought-research]: "during the growing seasons over the period 1980–2003 in United States of America, drought accounted for $144 billion (41.2%) of the estimated $349 billion total cost of all weather-related disasters" — §Importance of monitoring agricultural drought / p.3
- C3 [drought-research]: "the World Meteorological Organization (WMO) recommends that all national meteorological, agricultural and hydrological services should use SPI for monitoring drought [36] due to its simplicity and flexibility to monitor drought" — §In-situ based agricultural drought monitoring methods / p.6
- C4 [drought-research]: "these techniques often generate different outcomes despite using the same set of input variables [39]." — §In-situ based agricultural drought monitoring methods / p.6
- C5 [drought-research]: "The soil drought monitoring indices were found to be more applicable over bare soil surfaces than vegetated surfaces." — §Optical remote sensing methods / p.7
- C6 [drought-research]: "semi-arid areas are described as sparse vegetated areas [51]; therefore, neither vegetation drought indices nor soil drought indices solely can provide accurate monitoring of drought in these regions" — §Optical remote sensing methods / p.7
- C7 [drought-research]: "It was found that Ts-based methods were better indicators over sparse canopies or bare lands than vegetative lands." — §4.2 Thermal remote sensing methods / p.10
- C8 [drought-research]: "though passive microwave has solid physical basis for water content retrieval and high temporal resolution, it has different major challenges including spatial resolution (i.e., 10–20 km)" — §Microwave remote sensing methods / p.10
- C9 [drought-research]: "although active microwave sensors are having the capability to provide higher spatial resolution (i.e., ~tens of meters), they have a poor temporal resolution (i.e., ~one month)." — §Microwave remote sensing methods / p.11
- C10 [drought-research]: "as the triangular and trapezoidal shapes are empirically determined based on an image at a specific date, they may be hardly compared to other dates [102]." — §Combined remote sensing-based methods / p.13
- C11 [drought-research]: "remote sensing-based indices are unable to discriminate vegetation stress caused by sources other than drought [117]." — §Synergy between remote sensing and in-situ based methods / p.17
- C12 [drought-research]: "for the practical monitoring of agricultural drought at field scale, both high spatial and high temporal data are required due to the small size of agricultural fields and the rapid changes in plants during the growing season" — §Conclusion / p.17

## Argument

| Role | Claim | Paraphrase | Attribution | Scope |
|---|---|---|---|---|
| problem | C1 | In-situ agricultural drought indices are accurate at measurement points but cannot describe spatial dynamics over large areas, which is why remote sensing is needed. | author | Global review of agricultural drought monitoring methods; the question is stated for large-area and field-scale monitoring, not for a single site. |
| advance | C12 | The review catalogues six method families and concludes that field-scale agricultural drought monitoring needs both high spatial (about 30 m) and high temporal (weekly) data simultaneously, a combination no single operational platform supplies, so multi-sensor fusion is the way forward. | author | Narrative literature synthesis of the pre-2016 state of the art; no new experiment, dataset or validation is contributed. |

## Conditions

| Dimension | Value | Evidence |
|---|---|---|
| In-situ index configuration reviewed | SPI is the WMO-recommended index, computed at weekly, 10-day, 1, 3, 6, 9, 12, 24 month scales with four drought classes | C3 |
| Surface / vegetation condition for index validity | Soil drought indices are applicable over bare soil rather than vegetated surfaces; vegetation indices the reverse | C5 |
| Semiarid case | Semiarid areas are sparse vegetated, so soil and vegetation optical indices each fail alone | C6 |
| Spatial resolution limit (passive microwave) | 10–20 km | C8 |
| Temporal resolution limit (active microwave) | ~one month | C9 |
| Resolution required for field-scale monitoring | 30 m spatial and weekly temporal, both needed | C12 |

## Analysis evidence

| Claim | Analysis / figure | What it supports | Boundary |
|---|---|---|---|
| C2 | National loss statistics compiled in §2 (US 1980–2003: $144 bn of $349 bn weather-disaster cost; Canada 2001–2002: $3.6 bn; Australia 2006: AUD$3.5 bn; EU €5.3 bn/yr; West Asia cereal shortfalls) | Agricultural drought losses are large enough to justify dedicated monitoring capacity | Figures are secondary, from cited sources, in different currencies and periods; not re-estimated or normalized here |
| C5 | Table 2 (printed pp.611–612) index-by-index pros/cons for PDI, NDVI, MSI, NDWI, VCI, MPDI, NMDI, VSDI | Optical index validity depends on surface type: soil indices for bare soil, vegetation indices for moderate to dense cover | Pros/cons compiled from cited studies; no head-to-head accuracy test performed |
| C7 | Table 3 (printed p.612) plus §4.2 text on CWSI, TCI and NDTI | Thermal indices suit sparse canopy or bare land; TCI was only suitable for homogeneous areas | Qualitative synthesis; per-index validation not reported |
| C8 | Table 4 (printed p.614) and §4.3 text on SMMR, SSM/I, SMOS, SMAP | Passive microwave offers high temporal but coarse spatial resolution | Generic sensor characteristics, not measured in a common experiment |
| C9 | §4.3 comparison of SAR systems (C-, L-, X-band) and NBMI/WI indices | Active microwave offers tens-of-metre spatial resolution but roughly monthly revisit | Same as above; fusion or downscaling is proposed rather than tested |
| C10 | Figure 2 (printed p.615) triangular and trapezoidal Ts–VI scatterplots, and the dry/wet edge discussion | Ts–VI indices rest on empirically fitted dry and wet edges, limiting comparability between dates | Edges fitted per image and date; the figure graphics could not be read numerically from the cached text |
| C12 | §6 comparison of MODIS/AVHRR/SPOT-VEG (250–1000 m, daily) against Landsat/ASTER/SPOT5 (10–120 m, 16–26 days), with passive vs active microwave | Field-scale monitoring requires joint high spatial and high temporal data | Argument from platform specifications; no quantitative skill assessment |

## Limitations & gaps

- Narrative review: no search strategy, inclusion criteria or corpus counts are reported, so coverage and selection bias cannot be judged (system inference).
- Index pros and cons (Tables 2–6) are compiled from the cited literature; the paper runs no common-dataset accuracy comparison, so it cannot be used to rank indices by skill.
- Remote sensing indicators are indirect, derived from reflected or emitted energy, and the authors state in the abstract that results can be relatively less accurate than in-situ outcomes.
- The stated open challenges remain open in the paper's own framing: monitoring small areas, filling data gaps, building consistent historical datasets, developing remote sensing-based forecasting, integrating newly launched sensors, and standard validation protocols (the latter still described as an emerging sub-area).
- Remote sensing indices cannot separate drought stress from other sources of vegetation stress, which is the stated motivation for synergic multi-index approaches; the paper does not test how well the synergic indices recover that discrimination.
- No quantification of data cost, fusion accuracy or operational feasibility, although technical and cost issues are named as the reason no operational system delivers both resolutions (system inference).
- Reading boundary: the index-expression columns of Tables 2–5 are empty or garbled in the cached extraction, so index formulas were not verified.

## Reading notes

- 2026-11-08: Full-text reading to complete the card (read_depth raised from abstract to full; source_coverage stays full-text). Read all 27 PDF pages: body pp.604–622 and references pp.622–630. Added C2–C12 covering the economic-impact background, the in-situ SPI/WMO recommendation and interpolation disagreement, the applicability conditions of optical, thermal and microwave families, the empirical dry/wet edges of Ts–VI indices, the inability of remote sensing to attribute vegetation stress, and the concluding field-scale resolution requirement.
- 2026-11-08: C1 was kept unchanged and re-verified against the cached text. Remaining uncertainties: (i) the heading of §4.2 "Thermal remote sensing methods" is missing from the PDF text extraction (the page sequence jumps from 4.1 to 4.3), so that section name is inferred from the numbering; (ii) the expression columns of Tables 2–5 are largely empty or garbled, so formulas were not checked; (iii) Figure 1 (global 1901–2008 drought severity, soil moisture below the 20th percentile) and Figure 2 (triangular/trapezoidal Ts–VI space) were available only as captions, not as readable graphics; (iv) follow-up candidates: [106] AghaKouchak et al. 2015 (Rev Geophys) review of remote sensing of drought, [122–124] on field-scale monitoring requirements, and the authors' own MODIS/Landsat-8 fusion work [15,16], which the review cites as the fix for the resolution dilemma.
