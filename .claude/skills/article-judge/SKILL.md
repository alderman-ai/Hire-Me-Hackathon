---
name: article-judge
description: The gate every article passes before it ships. Defines what a good article is, checks a draft against its source dictation with Jev (TypeSafe's classifier, so the judge is not the same kind of model that wrote it), fixes what fails, and runs one final editor's judgment. Use after dictate-article and alex-voice, before an article goes to website. "judge the article", "is this a good article", "/article-judge".
---

# article-judge

Alex, 3 Nov: "find a way to objectively say what an article is supposed to be, what a good article is supposed to be ... use Jev or any other classification to say 'Is this a good article?' If it's not a good article make it a good article."

Why Jev: a Claude grader judging Claude's writing passes nearly everything (Alex: "fuzzy assistant grading criteria judged by same class of model = 100% pass rate and unusable results"). Jev answers narrow typed questions with probabilities; code applies the thresholds; Claude only rewrites.

## What a good article is

A reader who has never met Alex finishes it able to (1) say its one point in a sentence, (2) believe it, because the proof comes from his own work, and (3) act on it. Every paragraph moves that point forward. **Emphasis follows the source:** what he spent time on gets space; what he said in passing stays in passing, or goes.

## What makes it bad (each is checkable)

| Id | Failure | Test |
| --- | --- | --- |
| B1 | **Spotlight inflation.** A passing remark in the dictation becomes its own paragraph. | Paragraph's weight vs the source's weight on the same thing. |
| B2 | **The writer's homework in the text.** Material that exists because the writer had to check or clarify something for itself: documentation quotes, outside citations, definitions, hedges, "to be precise" asides he never offered. | Is it in the source? If not, and he didn't ask for it, it goes. |
| B3 | **Cuttable.** The point survives without the paragraph. | Delete test. |
| B4 | **Generic.** The paragraph could sit unchanged in anyone's article on the topic. | No detail from his own work. |
| B5 | **No single point,** or two points competing. | Can the point be said in one sentence from the text alone? |
| B6 | **Answer-stacking.** Sections read as separate answers to questions, not steps in one argument. | Does each section hand off to the next? |
| B7 | **Repetition.** The same point made twice. | |
| B8 | **Unsupported.** A claim with no example, number or story behind it. | |
| B9 | **Site rules broken:** an ask aimed at the reader, a "demo" label, a grade, anything from NDA'd work (RULES.md 11, 12). | Mechanical scan, not Jev. |

## How to run it

1. **Inputs:** the article as Markdown, and the source: his topic dictation and his answers to the round-2 questions, verbatim, as one text file. Without the source, B1 and B2 can't be judged: get it first. **Leave out his replies to the writer's own fact-checks** ("is this what you meant?" "yes"): a confirmation isn't emphasis, and counting it is exactly how a throwaway line gets its spotlight.
2. **Judge:** `python -I -X utf8 .claude\skills\article-judge\judge.py <article.md> <source.txt> <out.json> --recorder-off-confirmed`. Only when the rig isn't recording. It prints a per-paragraph flag table and the article-level verdict, never the key. Cost is fractions of a cent.
3. **Fix** (an Opus subagent that hasn't seen the judge's wording): for each flagged paragraph, cut it, shrink it to the weight it has in the source, or replace it with his own words from the source. Never add new material to fix a flag. New sentences go through `alex-voice`.
4. **Re-judge.** Up to 2 fix rounds. A paragraph still flagged after round 2 is cut.
5. **Final judgment pass** (one fresh Opus subagent, reading only the final article, its source and this section above): "Is this a good article by the definition? If not, which one paragraph is the problem?" One answer, no rewrite. If it names a paragraph, fix that one and stop.
6. **Log** the flags, fixes and final verdict in the article's draft folder (`judge-log.md`). Never show grades or verdicts on the site.

## Thresholds (in judge.py)

A paragraph is flagged when Jev's probability is at least 0.6 on B1, B2 or B3, or at least 0.7 on B4. The article passes when no paragraph is flagged and B5, B6 and B8 pass at the article level (B7 is reported but advisory: Jev counts a thesis restated in the intro and close as repetition). Calibrated on article 1's skills section (2 paragraphs, B1 and B2), which must be flagged.
