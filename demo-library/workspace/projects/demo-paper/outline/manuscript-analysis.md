# Manuscript analysis — demo-paper, Introduction

## Framing

Drought damage is carried along a chain — meteorological deficit, soil-moisture state, vegetation, yield and
carbon exchange — and the literature has advanced link by link rather than as a chain. The Introduction argues
that monitoring and prediction are mature for the deficit and thin for the impact state, and that impact is
thresholded in place, in time and in onset speed.

## Motivation

The library covers every link of that chain: indices and global monitoring systems, seasonal and
statistical/ML prediction, crop, vegetation and forest impact studies, and the flash-drought definition
debate. The material is therefore sufficient for a review-style opening and not sufficient for any statement
about results.

## Design of this section

No Results material exists for this project. The section is written as a review-style opening with the
default Introduction shape from the writing contract: general, particular, general, closing on the open
question. Nothing is asserted about the authors' own results, data or methods; the final sentence reserves
the article's question without claiming an answer.

## Section decisions

- The Introduction carries the chain framing and lands on the impact-anticipation gap.
- Definitions of individual indices and of the drought types are left to Methods.
- No roadmap of later sections: Nature style states the question, and there is no result to state with it.

## Style

- Nature: six paragraphs, about 510 words, no headings inside the section, no first-person plural, numbered
  citations.
- Recorded conflict: the project sets `citation_style: apa`; the author asked for Nature style, so the
  numbered citation system is used throughout and the reference list follows Nature. The author's request
  prevails over the project default.
- Citations are written `[n]` in the markdown draft and become superscript numerals at typesetting.

## Evidence ceilings

- Most works were read at abstract level; every statement is held to what the recorded Claim states.
- Metadata-only works were not used for content: `flash-2020-prediction-challenge`,
  `vegetation-2019-extreme-drought`, `forest-2024-satellite-mortality`, `crops-2024-concurrent-drought`,
  `drought-2018-soil-moisture-perspective`, `drought-2019-statistical-forecast-review`,
  `forest-2015-global-change-chapter`, `cape-2018-drought-attribution`, `drought-2020-hydrological-forecast`.
- One disagreement is named as open — whether flash droughts have become the new normal — and belongs to the
  Discussion for its full treatment.
- The demonstration library carries a notice that its records are synthetic; every citation must be checked
  against the published article before submission.

## Paragraph analysis — rebuilt from r003 (post-hoc; the text was not changed)

Source: `sections/introduction/r003.md`, six paragraphs, citations as `[n]` (no `<sup>` tags). Graph page:
`outline/graph-introduction.html` (written baseline = this graph). Between paragraphs the page uses `supports`/`infers`
for **advances** and `associates` for **parallel**.

| ¶ | Point | Role | Opening → Landing | Citations in text |
|---|---|---|---|---|
| 1 | Damage travels along a chain and is governed by the water state, not the rainfall anomaly | opening | "Drought is classified by the system it reaches…" → "The quantity that governs impact is therefore the water state…" | 1, 2, 3 |
| 2 | Monitoring is most complete for the deficit, least for the impact state | middle | "Monitoring has been organized around the deficit." → "…least complete where the impact is decided." | 4,5, 6, 7 |
| 3 | A deficit forecast is not a damage forecast | middle | "Forecasting has taken a parallel path." → "A forecast of the deficit is therefore not a forecast of the damage." | 8,9, 10, 11, 12 |
| 4 | Impact depends on when/where the deficit lands; thresholds are regional | middle | "Damage depends on when and where the deficit lands…" → "…thresholds that must be located region by region." | 13, 14, 15, 16, 17 |
| 5 | Onset speed is a second dimension; the flash-drought definition is unsettled | middle | "Onset speed adds a second dimension…" → "Whether flash drought has become the 'new normal' remains unresolved…" | 18, 19, 20, 21 |
| 6 | The open question is anticipation | closing | "What remains unresolved is not detection but anticipation." → "…the question this article takes up." | 4,5,10; 13–16; 19,20 (re-cited) |

Within-paragraph node chains (a = opening … last = landing; evidence = existing citation numbers, 待补 = none in the text):

- ¶1: a drought classified by system [1] —defines→ b damage transmitted along the chain [1]; c 2018 European response varies with climatic water balance [2] —qualifies→ b; d SPEI adds the demand term [3] —supports→ c; b —infers→ e water state governs impact (待补); c, d —supports→ e.
- ¶2: a monitoring organized around the deficit (待补) —defines→ b global systems [4,5]; c in-situ limits [6], d satellite limits [7] —qualifies→ b; b —infers→ e landing (待补); c, d —supports→ e.
- ¶3: a forecasting parallel path (待补) —defines→ b method broadening [8,9] —associates→ c decadal soil-moisture predictability [10]; d human water use [11], e impact-record dependence [12] —qualifies→ c; c —infers→ f landing (待补); d, e —supports→ f.
- ¶4: a when/where (待补) —associates→ b growth stages [13] —associates→ c leaf-area sensitivity [14] (d regional threshold variation [15] —qualifies→ c) —associates→ e forest thresholds [16] —associates→ f global aggregates conceal [17] —infers→ g landing (待补); d, e —supports→ g.
- ¶5: a second dimension (待补) —associates→ b research growth [18] —opposes→ c definitional split [19] —infers→ d definition-dependent estimates [20] —infers→ e "new normal" open [21].
- ¶6: a anticipation, not detection (待补) —infers→ e linking would turn a deficit into an expected loss (待补); b water states [4,5,10], c thresholds [13–16] —supports→ e; d onset speeds [19,20] —qualifies→ e; e —infers→ f the connection is missing; the article's question (待补).

Paragraph relations: ¶1→¶2 advance (¶1's landing, water state vs. deficit, is what ¶2 measures monitoring against); ¶2→¶3
parallel (the text says "a parallel path"); ¶3→¶4 advance (damage is picked up from ¶3's landing); ¶4→¶5 parallel ("a second
dimension to the same problem"); ¶5→¶6 advance into the closing, and ¶6 also draws on ¶2–¶4.

### Findings (input for the review step; the text is unchanged)

- Chains complete: every paragraph has an opening and a landing joined by a path; no broken chain in the rebuilt graph.
- Landings without a citation of their own (inferences, marked 待补): ¶1, ¶2, ¶3, ¶4 and ¶6 (two nodes). Openings of ¶2–¶6 are uncited assertions (待补).
- No paragraph is without citations. ¶6 only re-cites earlier sources.
- ¶4: "when" rests on a single source [13]; the chain is an enumeration, so its relations are mostly `associates`.
- ¶4/¶5: the "when" of ¶4 and the "onset speed" of ¶5 overlap; parallel vs. advance is arguable.
- ¶6 opens on "detection", a term ¶2 never states, and "anticipation" is not defined before it is used.
- ¶3: the Yellow River case [11] concerns the hydrological-meteorological link, only indirectly deficit-vs-damage.
- Citation system: the text uses numbered `[n]` (Nature) against the project default `apa`; the author's decision above stands, so the page records numbers.

### Open items for the author

- Decide whether the 待补 openings and landings need their own sources or are accepted as synthesis.
- Decide whether ¶5 stays parallel to ¶4 or becomes an advance.
- Decide whether ¶6 should introduce "detection" and "anticipation" earlier (e.g. at the ¶2 landing).
