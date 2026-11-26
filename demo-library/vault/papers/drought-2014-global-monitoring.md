---
slug: drought-2014-global-monitoring
title: "Global integrated drought monitoring and prediction system"
authors: ["Hao, Z.", "AghaKouchak, A.", "Nakhjiri, N.", "Farahmand, A."]
year: 2014
venue: "Scientific Data"
journal_if: n/a (not assessed)
citations: 821
citations_date: 2026-11
weight: high (OpenAlex citations 821; bibliographic context only)
publication_status: peer-reviewed
source: "10.1038/sdata.2014.1"
local: "fulltext/drought-2014-global-monitoring.pdf"
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

# Global integrated drought monitoring and prediction system

## Summary

本文介绍全球综合干旱监测与预测系统（GIDMaPS）的数据集，回答在全球尺度上如何用多指标同时给出气象干旱与农业干旱的监测信息和季节概率预测。系统以 MERRA-Land、NLDAS、GLDAS 与 GDCDR 的降水、土壤水分数据为输入，用非参数经验概率构造 SPI、SSI 与 MSDI，并以 ESP 式集合（把历史年份当作未来情景）生成 1–6 个月提前期的干旱发生概率。作者用 2010 年亚马逊与俄罗斯、2011 年德州—墨西哥与东非以及 2012 年美国干旱的个例对比，说明 2 个月提前期可识别 D1/D2 级别干旱，而 4 个月提前期只有 MSDI 仍给出 D2 信号。边界在于：验证以图面视觉个例对比为主，未报告定量技巧评分；数据为月尺度、0.125°–1° 分辨率；作者明确其定位是动态季节模式的补充而非替代。

## Claims

- C1 [drought-research]: "GIDMaPS includes a near real-time monitoring component and a seasonal probabilistic prediction module." — Abstract / p.1 [PDF page 1]
- C2 [drought-research]: "The presented data sets would be instrumental in reducing drought impacts especially in developing countries." — §Abstract / p.1
- C3 [drought-research]: "Nearly 1 million people perished in East Africa in the mid-eighties because of a major drought that led to a widespread famine." — §Background & Summary / p.2
- C4 [drought-research]: "In recent years, several research and operational drought monitoring models have been developed." — §Background & Summary / p.2
- C5 [drought-research]: "However, drought warning and prediction systems are still the least developed systems among other natural disasters primarily because of the complex processes involved in drought onset and development" — §Background & Summary / p.2
- C6 [drought-research]: "The aforementioned models, however, do not provide probabilistic forecasts of drought condition for risk assessment" — §Background & Summary / p.2
- C7 [drought-research]: "While droughts originate from a deficit in precipitation, an effective drought monitoring and prediction system should integrate multiple drought-related variables" — §Background & Summary / p.2
- C8 [drought-research]: "GIDMaPS integrates precipitation and soil moisture data from model simulations and remote sensing observations" — §Methods / p.2
- C9 [drought-research]: "Table 1 summarizes the input data sets, their spatial resolutions, and providers." — §Methods / p.2
- C10 [drought-research]: "SPI and SSI are indicators of meteorological and agricultural drought, respectively." — §Methods / p.2
- C11 [drought-research]: "In other words, instead of fitting a parametric distribution function, the probabilities of observed precipitation and soil moisture are computed empirically." — §Methods / p.2
- C12 [drought-research]: "This approach assumes that historical data from any location are possible scenarios for the future." — §Methods / p.3
- C13 [drought-research]: "Basically, in this approach, an n-year climatology (historical observations) leads to an n-member ensemble." — §Methods / p.4
- C14 [drought-research]: "GIDMaPS uses the ensemble median as a measure of drought severity." — §Methods / p.4
- C15 [drought-research]: "Having an ensemble of predictions, GIDMaPS offers the probability of drought occurrence for any given drought threshold." — §Methods / p.4
- C16 [drought-research]: "GIDMaPS's data records are standardized drought indices in which a negative (positive) value indicates a relatively dry (wet) spell." — §Data Records / p.5
- C17 [drought-research]: "GIDMaPS data sets are available to the public through an unrestricted repository" — §Data Records / p.5
- C18 [drought-research]: "The prediction data sets provide 1 to 6 month lead forecasts based on the indices shown in Table 3, and from the last monitoring data available." — §Data Records / p.5
- C19 [drought-research]: "The system runs on a daily basis and updates the data record upon availability of new input data sets" — §Data Records / p.5
- C20 [drought-research]: "For events shown in Figure 2, the 2 month lead drought predictions are presented in Figure 3." — §Technical Validation / p.5
- C21 [drought-research]: "The results indicate that the regions where drought is predicted with high probability in Figure 3 are consistent with the observed droughts shown in Figure 2" — §Technical Validation / p.6
- C22 [drought-research]: "The 2 month lead predictions identify the upcoming drought at both D1 and D2 severity levels." — §Technical Validation / p.6
- C23 [drought-research]: "While the 4 month lead predictions show signals of the U.S. summer 2012 drought at the D1 level, only MSDI indicates the possibility of a D2 (or stronger) drought with 4 month lead time" — §Technical Validation / p.6
- C24 [drought-research]: "It is stressed that the dynamical weather and climate models initiated in April/May 2012 did not indicate a significant drought coming up in August 2012" — §Technical Validation / p.6
- C25 [drought-research]: "The figure indicates that in the peak time, around 20% of global land areas were in severe to exceptional drought, a record drought the likes of which has not been experienced since." — §Usage Notes / p.6
- C26 [drought-research]: "Seasonal prediction of drought conditions can provide resource managers with valuable information for decision making and disaster preparedness." — §Usage Notes / p.8
- C27 [drought-research]: "Finally, dynamic models that provide global seasonal drought forecasts exhibit very high uncertainty and low seasonal prediction skill" — §Usage Notes / p.8
- C28 [drought-research]: "We stress the purpose of GIDMaPS is not to replace the currently available dynamic models." — §Usage Notes / p.8
- C29 [drought-research]: "These data sets provide a static representation of the data at the time of publication, as a complement to the periodically updating data distribution system" — §Data Records / p.5

## Study profile

- subjects: C16, C18
- method: C8, C11, C12, C13
- outcomes: C21, C22, C23, C25
- limitations: C27, C28

## Argument

| Role | Claim | Paraphrase | Attribution | Scope |
|---|---|---|---|---|
| problem | C5 | Drought warning and prediction trail other natural-hazard systems because drought onset and development involve complex processes. | author | Global status of drought early warning, as of 2014 |
| problem | C6 | Existing global drought products are descriptive maps and briefings and do not deliver probabilistic forecasts usable for risk assessment. | author | Other global drought monitors (GIEWS, HEWS, UCL, SPEI monitor, GDP) |
| advance | C7 | A capable global system must integrate multiple drought-related variables rather than precipitation alone. | author | Design principle for monitoring and prediction |
| advance | C13 | Sampling an n-year climatology as an n-member ensemble turns seasonal drought forecasting into a probabilistic, threshold-queryable product. | author | Statistical (ESP-type) prediction at any location with a climatology |
| advance | C15 | Drought occurrence probability can be reported for any chosen standardized-index threshold, not only a single fixed level. | author | Any standardized index (SPI, SSI, MSDI) and threshold |
| advance | C21 | Predicted high-probability regions coincide with observed major droughts, supporting the system's event-capture claim. | author | 2-month lead; 2010 Amazon/Russia and 2011 Texas-Mexico/East Africa |
| remaining | C23 | At 4-month lead the D1 signal weakens and only the multivariate index still flags a possible D2 drought. | author | 4-month lead, August 2012 US drought, threshold D2 |
| remaining | C27 | Dynamically based global seasonal drought forecasts still carry very high uncertainty and low skill. | author | Cited seasonal forecast literature (refs 52–54) |
| remaining | C28 | GIDMaPS is positioned as a complementary statistical source, not a replacement for dynamic models. | author | Positioning of the statistical approach |

## Conditions

| Dimension | Value | Evidence |
|---|---|---|
| Input data sets | Precipitation and soil moisture from MERRA-Land, NLDAS, GLDAS and GDCDR, monthly, at 0.125° to 1° depending on source (Table 1) | C8 |
| Drought indicators | SPI for meteorological drought, SSI for agricultural drought, MSDI as the integrated multi-index (meteorological + agricultural) measure | C10 |
| Index estimation | Nonparametric empirical probabilities (Gringorten plotting position, per Methods) instead of a fitted parametric distribution | C11 |
| Prediction scheme | ESP-type sampling: each historical year supplies one ensemble member scenario for the target month; n-year climatology gives n members | C12 |
| Severity summary | Ensemble median used as the drought severity measure | C14 |
| Hazard definition | Occurrence probability = number of ensemble members below threshold / total members, for any standardized-index threshold (D0–D4 scale in Table 2) | C15 |
| Output records and lead times | Monthly SPI/SSI/MSDI records from 1949/1979/1980 onward depending on input, plus 1–6 month lead probabilistic forecasts (Table 3) | C18 |
| Update cadence | System runs daily and refreshes records when new input data arrive; figshare copy is a static publication snapshot while the distribution site keeps updating | C19 |
| Validation design | Visual comparison of 2-month and 4-month lead probability maps against observed SPI/SSI/MSDI maps for the 2010, 2011 and August 2012 events | C20 |

## Analysis evidence

| Claim | Analysis / figure | What it supports | Boundary |
|---|---|---|---|
| C21 | Figures 2–3 (p.5–6): global SPI, SSI and MSDI monitoring maps for 2010–2011 compared with 2-month lead probability maps | Predicted high-probability areas visually coincide with the 2010 Amazon, 2010 Russia, 2011 Texas-Mexico and 2011 East Africa droughts | Visual map comparison with different scales; MERRA-Land inputs only; no skill metric |
| C22, C23 | Figure 4 (p.6–7): 2- and 4-month lead D1 and D2 probability maps for August 2012 | The 2-month lead captured both severity levels for the US 2012 drought; at 4 months only MSDI retained a D2 signal, with probabilities of about 0.3–0.6 in the central and western US | Single event and single threshold pair; probabilities are not verified against outcomes |
| C25 | Figure 5 (p.7): fraction of global land in D0–D4, from SPI derived from MERRA-Land | About 20% of global land in severe-to-exceptional drought at the late-1990s peak, described as unprecedented in the record | Figure read visually; indicator-specific (SPI from MERRA-Land); no uncertainty bounds given |
| C24 | Comparison stated in the Technical Validation text against dynamical April/May 2012 forecasts | Motivates the value of the statistical seasonal forecasts for the 2012 US drought | Cited external forecast assessment (ref. 42), not an experiment run in this paper |

## Limitations & gaps

- Validation is event-based and visual: C20–C23 compare maps, and no quantitative skill scores, reliability diagrams or ROC-style verification of the probabilistic forecasts are reported. (reader inference from C20, C21)
- The prediction scheme assumes that historical data from any location are possible future scenarios (C12), so the forecasts cannot represent anomalies outside the observed climatology; ensemble spread is climatological rather than physically constrained.
- Long-lead skill is weak: at 4 months only the multivariate index retains a D2 signal (C23), and probability ranges of roughly 0.3–0.6 are hard to act on as a warning.
- The authors concede that dynamic seasonal models have very high uncertainty and low skill (C27) yet still frame GIDMaPS as a complement to them rather than a verified alternative (C28); no head-to-head skill comparison is performed.
- Spatial resolution is coarse and monthly (0.125° to 1° per Table 1, C9), which limits sub-regional and sub-monthly (flash-drought) application; this is a reader inference, not a stated limitation.
- 2012 US drought losses are reported only as context ("over $12 billion"), and the figshare data set is a static publication snapshot (C29) whose periodically updating counterpart lives at a separate distribution site (C17), so current operational status cannot be inferred from this paper.

## Reading notes

- 2026-11-08: 本次为全文阅读（10 页，含 Background & Summary、Methods、Data Records、Technical Validation、Usage Notes、参考文献与 Data Citation），目的是判断该数据集能否作为全球干旱监测/预测的基线证据。新增信息：三指标（SPI/SSI/MSDI）非参数构造、ESP 式 n 年集合与阈值概率、四套输入数据（MERRA-Land、NLDAS、GLDAS、GDCDR）及 1–6 个月提前期。遗留：图 2–6 为图片未逐像素核对，图 5 的 20% 峰值只能按正文表述引用；UCI 数据门户（drought.eng.uci.edu）当前是否仍运行、数据集是否有后续版本，本卡不能确认，需另行查证。
