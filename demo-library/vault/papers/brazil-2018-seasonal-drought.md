---
slug: brazil-2018-seasonal-drought
title: "Seasonal drought prediction for semiarid northeastern Brazil: verification of six hydro-meteorological forecast products"
authors: ["Delgado, J. M.", "Voss, S.", "Bürger, G.", "Vormoor, K.", "Murawski, A.", "Pereira, J. M. R.", "Martins, E.", "Vasconcelos Júnior, F.", "Francke, T."]
year: 2018
venue: "Hydrology and Earth System Sciences"
journal_if: n/a (not assessed)
citations: 20
citations_date: 2026-11
weight: low (OpenAlex citations 20; bibliographic context only)
publication_status: peer-reviewed
source: "10.5194/hess-22-5041-2018"
local: "fulltext/brazil-2018-seasonal-drought.pdf"
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

# Seasonal drought prediction for semiarid northeastern Brazil

## Summary

论文评估巴西东北部半干旱区 Ceará 州 Jaguaribe 流域的季节干旱预报技巧：以 FUNCEME（ECHAM4.6、持续海温）与 ECMWF S4 两套 GCM 的 1981–2014 回报为基础，配合经验分位数映射（EQM）、扩展降尺度（XDS）与天气型分类（WP）三种统计处理，1 月发布、预报 1–6 月，并用 SPI/SPEI、SWSI 与区域水库蓄水比例构建气象与水文干旱指数。水文干旱指数由多元线性回归拟合观测得到，验证采用 RMSE、BSS 与 ROCSS，以气候态为参照。结果显示月降水与 SPI1 等短尺度指数几乎没有技巧（雨季关键月 3 月为技巧低谷），但多模式集合在事件判别（SPEI1 的 ROCSS 约 0.5）与水库蓄水（VM2）上具有技巧，后者 BSS 在 Orós、Castanhão 与 lower Jaguaribe 分别为 0.66、0.52、0.71，且随预见期下降。作者强调该水文技巧很可能因水库系统的长记忆以及用实测 12 月蓄水初始化而被夸大，并提出耦合过程式水文模型以改进入库流量预测。边界在于验证对象是回报而非实时业务预报，且仅限单一流域、月尺度聚合与 30 百分位阈值定义的事件。

## Claims

- C1 [drought-research]: "The tested forecasting products showed similar performance in the analyzed metrics." — Abstract / p.5041 [PDF page 1]
- C2 [drought-research]: "Can we forecast hydrological droughts in Ceará based on these seasonal meteorological forecasts?" — §1 Introduction / p.2
- C3 [drought-research]: "Annual precipitation amounts to 755 mm, of which about 90 % falls in the months January to June." — §2.2 Study area / p.3
- C4 [drought-research]: "The dynamical seasonal forecast models were provided by FUNCEME and ECMWF in the form of hindcasts for the period 1981 to 2014." — §2.3 Seasonal forecast models / p.3
- C5 [drought-research]: "The operational and hindcast versions have 20 ensemble members and are run on initial sea surface temperature (SST) anomalies that persisted during the forecasting period (8 months)." — §2.3 Seasonal forecast models / p.3
- C6 [drought-research]: "The forecasting products obtained from the combinations of GCMs and downscaling will be named after their components: XDS:ECHAM, XDS:ECMWF, EQM:ECHAM, EQM:ECMWF, WP:ECHAM, and WP:ECMWF." — §2.4 Downscaling of GCM output / p.4
- C7 [drought-research]: "The forecast is generated at the beginning of January for the period from January until June." — §2.5 Drought quantification using drought indices / p.4
- C8 [drought-research]: "the event considered for the meteorological drought indices in use in this work is “dry spells of moderate to extreme magnitude”" — §2.5 Drought quantification using drought indices / p.5
- C9 [drought-research]: "The threshold for defining HDI drought events was based on the 30th percentile of the series of observed monthly HDIs." — §2.5 Drought quantification using drought indices / p.5
- C10 [drought-research]: "Forecasts of hydrological drought indices were obtained by searching and fitting a multivariate regression model to observations of hydrological drought indices and reservoir volume changes." — §2.6 Regression of hydrological drought indices / p.5
- C11 [drought-research]: "Three metrics were employed: the root mean square error (RMSE), the relative operating characteristic skill score (ROCSS) and the Brier skill score (BSS)" — §2.7 Forecast verification / p.5
- C12 [drought-research]: "the best results in terms of RMSE are comparable to the climatology, meaning that there is limited skill in forecasting monthly precipitation" — §3.1 Forecasting precipitation / p.6
- C13 [drought-research]: "The only exception is the forecast for April, where the multi-model ensemble shows limited skill in the three regions considered." — §3.1 Forecasting precipitation / p.6
- C14 [drought-research]: "the RMSE of SPI1 and SPEI1 generally does not differ from that of the climatology and is greatest for ECHAM and EQM" — §3.2 Forecasting meteorological drought indices / p.7
- C15 [drought-research]: "In particular the March forecast shows no skill in most models, March being a key contributing month in the rainy season." — §3.2 Forecasting meteorological drought indices / p.8
- C16 [drought-research]: "The multi-model ensemble skill shown by the grey line is generally close to the upper envelope formed by that of the individual models." — §3.2 Forecasting meteorological drought indices / p.10
- C17 [drought-research]: "The forecast of the three HDIs shows notable differences between downscaling techniques EQM/XDS and the WP classification (Fig. 10)." — §3.3 Forecasting hydrological drought indices / p.10
- C18 [drought-research]: "Here, all products show reasonable performance for most regions, but a decreasing skill with increasing lead time." — §3.3 Forecasting hydrological drought indices / p.11
- C19 [drought-research]: "Another important observation is that WPs do not display skill in forecasting HDI events as shown in Fig. 11." — §3.3 Forecasting hydrological drought indices / p.11
- C20 [drought-research]: "The best skill obtained by the multi-model ensemble was forecasting drought events related to reservoir storage in the lower Jaguaribe region." — §3.4 Multi-model ensemble forecast / p.12
- C21 [drought-research]: "The skill of the hydrological drought forecast, namely the relative reservoir storage VM2, was 0.66, 0.52 and 0.71 for the regions of Orós, Castanhão and lower Jaguaribe" — §4 Conclusions / p.13
- C22 [drought-research]: "the long memory of the reservoir system and the use of observed reservoir volume to define the conditions prior to each forecast" — §4 Conclusions / p.13
- C23 [drought-research]: "Improvements are expected by coupling a process-based hydrological model to the seasonal forecasting system." — §4 Conclusions / p.13

## Study profile

- subjects: C3, C4
- method: C5, C6, C7, C8, C9, C10, C11
- comparator: C12, C14
- outcomes: C13, C15, C16, C17, C18, C19, C20, C21
- limitations: C22, C23

## Argument

| Role | Claim | Paraphrase | Attribution | Scope |
|---|---|---|---|---|
| problem | C2 | Whether hydrological droughts in semiarid Ceará can be forecast from seasonal meteorological forecasts | author | Jaguaribe basin, seasonal lead times, water-management purpose |
| advance | C16 | Binding all members of all models into one multi-model product yields skill close to the upper envelope of the individual models | author | January–June hindcast verification, 1981–2014 |
| advance | C20 | Drought events related to reservoir storage in the lower Jaguaribe are the target the multi-model ensemble forecasts best | author | three subcatchments, BSS/ROCSS of the multi-model ensemble |
| advance | C21 | The forecast skill of the reservoir-storage HDI VM2 is 0.66, 0.52 and 0.71 for Orós, Castanhão and lower Jaguaribe | author | BSS of the January–May multi-model ensemble, 1981–2014 hindcasts |
| remaining | C22 | That hydrological skill is likely inflated by reservoir-system memory and by using observed reservoir volume to define pre-forecast conditions | author | attribution of skill, not tested by the paper |
| remaining | C23 | Coupling a process-based hydrological model is expected to improve on the regression-based prediction of reservoir inflow | author | proposed improvement, not demonstrated |

## Conditions

| Dimension | Value | Evidence |
|---|---|---|
| setting | Semiarid Jaguaribe River basin, Ceará, northeastern Brazil; 755 mm mean annual precipitation with about 90 % falling in January–June | C3 |
| data (models) | Dynamical seasonal hindcasts from FUNCEME (ECHAM4.6) and ECMWF, period 1981–2014 | C4 |
| data (ensemble) | FUNCEME operational and hindcast versions with 20 ensemble members, run on initial SST anomalies persisted over an 8-month forecast period | C5 |
| design | Six products from crossing three downscaling/classification methods (XDS, EQM, WP) with the two GCMs | C6 |
| temporal | Forecast issued at the beginning of January for the January–June period | C7 |
| outcome definition (meteorological) | Drought event = "dry spells of moderate to extreme magnitude" in the SPI/SPEI indices | C8 |
| outcome definition (hydrological) | HDI drought event = monthly HDI below the 30th percentile of the observed monthly HDI series | C9 |
| method | Hydrological drought indices forecast by a multivariate linear regression fitted to observed HDIs and reservoir volume changes | C10 |
| evaluation | Skill measured by RMSE, the Brier skill score and the relative operating characteristic skill score | C11 |
| comparator | Climatology as the reference forecast in the RMSE comparisons for precipitation and index forecasts | C12 |

## Analysis evidence

| Claim | Analysis / figure | What it supports | Boundary |
|---|---|---|---|
| C12 | Fig. 3, RMSE box plots of monthly precipitation per model and per station (p.6) | The best RMSE is comparable to climatology, so monthly precipitation forecasts carry limited skill | Ensemble spread and station panels; Jan–Jun, 1981–2014 |
| C13 | Fig. 4, BSS of a monthly low-precipitation event (p.6) | Only the April multi-model ensemble shows limited skill; other months have none | BSS near or below zero for most months and stations |
| C14 | Fig. 7, RMSE of forecasted meteorological drought indices (p.9) | SPI1/SPEI1 RMSE does not differ from climatology and is largest for ECHAM and EQM | Box plots over members, three subcatchments, six products |
| C15 | Figs. 8–9, BSS and ROCSS by forecasting month for SPI1/3 and SPEI1/3/6 (p.9–10) | A March minimum in skill recurs across products and index scales | Monthly resolution of the January–June forecast period |
| C16 | Fig. 8 grey line and Table 2 (p.9, p.13) | The multi-model ensemble sits near the upper envelope of the individual models | WP products excluded from the multi-model ensemble |
| C17 | Fig. 10, RMSE of SWSI, VM1 and VM2 (p.11) | WP classification has lower RMSE than EQM/XDS for SWSI and VM1, and the gap shrinks for VM2 | WP uses only discrete MDI values; near-zero MDIs removed from verification |
| C18 | Fig. 11, BSS of HDI drought events (p.11) | Skill is reasonable for most regions but declines with lead time | Event threshold = 30th percentile of observations |
| C19 | Figs. 11–12, BSS and ROCSS panels for WP products (p.11–12) | WP classification shows no skill for HDI events even where VM2 is predictable | Visual reading of box panels; no numeric table for WP |
| C20 | Table 2, BSS of the January–May multi-model ensemble (p.13) | Reservoir storage in the lower Jaguaribe is the best-forecast target (BSS 0.71) | Averaged over regions, WP excluded |
| C21 | Table 2 and §4 (p.13) | Confirms the quantitative VM2 skill of 0.66, 0.52 and 0.71 | In-sample regression; observed December storage as initial condition |
| C22 | Table A1 versus Table 2 (p.13–14) | VM2's higher skill cannot come from a better regression fit: the volume-change regressions have lower R² (0.36, 0.21, 0.38) than the volume regressions (0.64, 0.41, 0.60) | Reader inference from the appendix; no sensitivity experiment isolates the inflation |

## Limitations & gaps

- Authors: the hydrological-drought skill is likely inflated by the long memory of the reservoir system and by using observed reservoir volume to define the pre-forecast conditions (C22).
- Authors: the regression underlying VM2 is a poor predictor of reservoir inflow, so coupling a process-based hydrological model to the seasonal forecasting system is proposed instead (C23).
- Authors: no or little skill remains for monthly precipitation and for short index scales such as SPI1, and the March forecast in the middle of the rainy season is the weakest link (C12, C14, C15).
- Authors: weather-pattern classification does not deliver skill for hydrological drought events, and the multi-model ensemble excludes it because it does not cover all indices (C19).
- Data access: hindcast datasets are released only on request, and FUNCEME observations only through an API, so the verification is not independently reproducible from the paper.
- System-inferred: no split-sample, leave-one-out or cross-validated verification of the HDI regression is reported, so the VM2 skill may combine genuine predictability with in-sample fit.
- System-inferred: all verification is on hindcasts (1981–2014) rather than real-time operational forecasts, and it covers a single semiarid basin with monthly aggregation and 30th-percentile event thresholds, which limits transfer of the skill values.

## Reading notes

- 2026-11-08: Full-text read (16 PDF pages, all sections, appendix, references) after an abstract-only pass; the read added the model chain (two GCMs → three downscaling/classification routes → MDI → HDI regression), the verification design (RMSE/BSS/ROCSS against climatology, 1981–2014, January–June), the quantitative multi-model BSS table, and the authors' own inflation caveat. Remaining unread work is only re-checking figure internals: Figs. 3–12 are point clouds in the text layer, so monthly and per-station values were taken from the surrounding prose and captions rather than measured.
- 2026-11-08: Extraction quality note — the PDF text layer hyphenates across lines with a U+FFFE artifact (e.g. splits inside "forecast" and "predictors"), and Tables 1, 2 and A1 are fragmented into scattered tokens. All quotes on this card avoid artifact-broken words; the regression formulas in Table A1 were read from the printed cells (R² of 0.64/0.36, 0.41/0.21, 0.60/0.38 for volume versus volume change).
- 2026-11-08: References worth following up for the library — Dutra et al. (2013, HESS) for seasonal SPI3 drought forecasts in African basins (ROCSS ≈ 0.6 for the Blue Nile, a direct external benchmark), Trambauer et al. (2015) and Seibert et al. (2017) for hydrological-drought forecast skill in the Limpopo, Murawski et al. (2016) and Philipp et al. (2016) for the SANDRA weather-pattern classification, and Bürger (1996) for expanded downscaling.
- 2026-11-08: Unstated assumptions the method depends on, as reader interpretation — that the AMIP-type initial conditions of ECHAM are an acceptable surrogate for late-December atmosphere (the authors flag this only as a possible explanation for the March skill lag), and that reservoir storage dynamics stay stationary enough over 1981–2014 for a fixed linear regression to represent them.
