---
name: palace-writing
description: Draft, outline, revise or polish scholarly text with KnowledgePalace evidence. Use for /palace write <project|materials> [section], /palace polish <text|file|project>, /palace draft intro <topic>, and project writing workspaces (create project, register materials, save revisions, argument-graph pages).
---
# Draft, revise or polish scholarly text

`write <project|materials> [section]` creates prose, develops an outline or makes
substantive revisions. `draft intro <topic>` invokes this same workflow for an
introduction. `polish <text|file|project>` improves an existing passage while
preserving the intended scientific case. Neither requires a collection or a new
project when the needed material is already supplied.

## Shared preparation

The author supplies three things, each of which may be brief: the framing of the
article (what it argues), its motivation (why the work is needed) and its design
(what was done). With these the workflow drafts in one pass. Read them from the
request and the project materials first; ask, once and together, only for
whichever is missing.

Complete or reuse the [manuscript analysis](manuscript-analysis.md) before either
task. Select relevant literature and actual user results. Adopted outside papers
go through palace-ingest. Drafting uses the selected evidence and analysis; new
evidence needs return to the reading flow rather than untracked citations.

Project mode reads its brief, analysis, materials, sections and chosen style.
Direct mode reads the supplied document and surrounding context without creating
a project or requiring `.palace.toml`. Use generic scientific prose unless a
venue/style is specified. Keep numbers, methods, conditions and source identities
faithful. Missing Results material permits a marked outline or planned analysis,
never completed results. Availability of material alone does not prove its claims.

## Plan

The text is written from the argument graph in the manuscript analysis. The graph
comes before the text and guides it: short nodes joined by labelled links, one
node per paragraph at the section level and a chain from opening to landing
inside each paragraph. It is kept light and is never the article in other words.
Build it from the author's framing, motivation and design. Do not stop to have
it approved: it is delivered with the text.

Read the graph before writing. Every link has to hold between its two nodes, and
each chain has to run unbroken from its opening to its landing.

When the author supplies a new revision of the section, rebuild the argument
graph from its paragraphs before any further writing (see
[manuscript-analysis](manuscript-analysis.md)); the text is not assumed to be
written against an old graph.

What a section argues, and what it leaves to another section, is decided for
each manuscript and recorded in its analysis. Such a decision never becomes a
writing rule, and a correction from the author is recorded as one or the other.

## Write

Follow the graph. Allocate methods/supporting details according to their role,
and calibrate conclusions to the actual observations and design. Use ordinary
citations from verified sources. When the text needs a node or a link the graph
lacks, change the graph first and the text after it.

## Writing rules

These rules bind write and polish, and the review reports against them by
number. "Generally" marks the usual case, which a manuscript may leave for a
reason its analysis states.

Section

1. An Introduction generally runs general, particular, general: an opening
   paragraph on the broad topic, middle paragraphs that advance or stand
   parallel, and a closing part of one or two paragraphs on this paper's own
   work, which distils the scientific question and says which questions the
   paper answers. Whether the closing part also states what was found, and
   whether it lays out the structure of the article, follows the selected
   journal style: some venues expect the findings stated there, others a
   roadmap of the sections. With no style selected, it gives the structure of
   the article and leaves the findings to the Results.
2. Paragraphs stand in a planned relation. An advancing paragraph starts from
   the landing of the one before; parallel paragraphs generally need not.

Paragraph

3. One point per paragraph, which a reader can state after one reading.
4. The opening and the landing are fixed first. The landing closes the paragraph
   with the conclusion the reader takes away, and the section decides what that
   conclusion is: in an Introduction, generally the gap or difficulty reached;
   in Results, the finding the paragraph establishes; in a Discussion, the
   consequence or limit it draws. A Methods paragraph that describes a
   procedure may end on its last step. A paragraph never trails off on an
   example.
5. A paragraph generally opens on its topic, stated positively: what its
   subject is or offers.

Between sentences

6. Adjacent sentences connect, and the reader supplies no step. The later
   sentence picks up something the earlier one stated. Each item of a parallel
   series (an enumeration, or cases treated alike) picks up the sentence that
   introduced the series, and the items stand parallel to one another. A
   paragraph does not return to a subject it has left. A connective never
   stands in for a missing step. A new subject never enters in a trailing
   clause.
7. The argument graph is laid out before the text, and the text follows it.

Sentences

8. A sentence reads in one pass, with its subject near the front and no long
   phrase before it.
9. The sentence fits the thought. Two clauses share a sentence when the
   relation between them (a cause, a contrast, a condition) is what the sentence
   says. Clause stacking fails, and so does a run of one-clause sentences whose
   relations are left unstated.

Literature

10. Sources are never piled: no semicolons, comma series or numbered runs that
    string together the findings of several studies.
11. Sources that together support one statement are cited together at that
    statement, which goes no higher than EVIDENCE.md allows for them.
12. Where a general statement needs particulars, it is illustrated briefly with
    the one or two strongest sources. Often the finding alone is enough; the
    setting is named only where the finding would otherwise read as wider than
    the study.
13. A relevant source is not left out because it fails to support the
    statement. A disagreement between sources is itself an open question and is
    named as one; its full discussion belongs in the Discussion.

Wording

14. Claims supply the evidence, never the wording. Findings are restated in the
    manuscript's own words; the verbatim quote belongs to the card. Two short
    quotations are allowed, marked and cited: a term coined or borrowed by a
    source, in quotation marks on first use, and a verdict of a named source
    that the text quotes in order to answer it.
15. The text reads as continuous prose, never as scaffolding. It does not pose a
    question and then announce its answer ("the first question is …" followed
    by "we answer it with …"), announce its own moves instead of making them
    ("two questions follow", "the argument proceeds in three steps") or report
    through people ("the authors claim", "the authors suggest"). A count of the
    things discussed that introduces an enumeration delivered at once in the
    same paragraph ("three conditions must hold: …", "four results stand out.
    First, …") belongs to that enumeration and is allowed. The subject of a
    sentence is the thing studied or the work done, and the citation carries
    the attribution. An abstract or compact phrase ("what X contributes", "the
    effect of Y") is used only when it is common knowledge in the field, is
    defined in the text, or picks up something already stated. Otherwise the
    sentence names the specific thing compared, measured or claimed. Fluency
    never buys vagueness.

Style

16. Where a journal style or a language style is specified, the text follows it
    throughout, in every paragraph and in its apparatus (headings, citations,
    notation, units), not only at the start. Where a profile's rule conflicts
    with a rule above or with a standard the author has stated, the author's
    prevails and the analysis records the conflict.

## Polish

Use the analysis to identify whether the issue is expression, paragraph logic or
the scientific claim. Revise only the requested passage by default. A scientific
change is explained as such; a substantial restructuring belongs to write and
requires the user's scope to include it. Keep unrequested passages unchanged.
The writing rules apply to the revised passage, and rules 1 and 2 only as far as
the requested scope reaches.

Compare the revised passage against the original for numbers, units, terms, citations,
claim strength and boundary conditions. This is a content review, not a token-count
or field-presence test. Return the text and a short explanation of consequential
changes. If the source has a scientific problem, identify it rather than polishing
it into apparent certainty.

## Review and save

Use one focused review and address actual findings; at most two automatic
revisions for a section. The review runs in an independent context: call
`palace_agent` with role `reviewer` and run the returned task in a read-only DSH
subagent, naming the absolute paths of the draft,
for a polish the text before it, the paper cards of the sources the draft cites,
this skill file, the manuscript analysis and the section's argument graph,
neighbouring sections, the brief and any selected style profile. Without delegation,
review here under `knowledge_palace/agents/palace-reviewer.md`, which gives the
order and the severity rules, and treat it as a same-session review. The review is
not a Python state machine and does not need a fixed concern count. Text
rewritten after the review is checked again against the rules before it is
delivered, by reading what each sentence says; a scan for forbidden strings or
punctuation is not that check.

Deliver the text itself, preceded by its argument graph; in a project the graph
is the page `outline/graph-<section>.html` (`graph` below), which the author can
open and edit. The review and the revisions happen before delivery and are not
part of what is delivered: no draft stage is handed over and no account of the
process is attached. State only what the author has to decide or supply. An
author who is not satisfied changes a node or a link, or supplies a new chain;
the graph is updated first and the affected paragraphs are rewritten from it,
while the others keep their text.

Saved project sections become append-only revisions (`revise` / `replace` below)
and earlier revisions stay. Direct tasks return prose or write to the user's
chosen output; never overwrite the source manuscript by default. Keep analysis
notes separate from prose.

## Commands

Project commands (`python -m knowledge_palace.workspace.cli …`, run from the
Framework root):

- `create <slug> --audience "<reader>" [--kind paper|proposal] [--venue …] [--language en] [--citation-style apa] [--style-profile <profile>]`
  creates `projects/<slug>/` in the Workspace (only when the user wants a project).
- `context <slug>` prints the project, `outline/brief.json`, materials, research
  notes, manuscript analysis and style profiles.
- `brief <slug>` validates `outline/brief.json` (the evidence contract a section
  is written from); fix every reported error.
- `material <slug> --id <id> --path <project-relative file> --kind draft|data|figure|solicitation|reviewer-comments|other`
  registers a user material; materials are writing input, never paper Claims.
- `revise <slug> <section> --file <draft.md>` saves the next `rNNN.md` revision.
- `replace <slug> <section> --original <file> --revised <file>` swaps one unique
  passage of the latest revision (polish) and saves it as a new revision.
- `graph <slug> <section> --file <graph.json>` writes the page
  `outline/graph-<section>.html` from a graph (the JSON shape is given at
  the top of `workspace/argument_graph.py`); the current text counts as written from it.
  `graph <slug> <section>` reads the page back: the paragraphs in reading order
  and `changes`, which names the paragraphs the author's edits ask to rewrite or
  drop. After rewriting them, `graph <slug> <section> --written` records that
  the text now follows the page's graph.

Library context for a project: `palace_research` with `view: "ask"`, the topic and
`project: <slug>`. An author-supplied reference resolves Vault-first with
`palace_research`, `view: "source"` and the DOI, arXiv id or title as topic.
A task that covers several sections lists them in
`palace_ledger` first and updates the list as each revision is saved.
