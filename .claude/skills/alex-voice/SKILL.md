---
name: alex-voice
description: The required copywriting skill for anything a reader will see in Alex's voice -- blog articles, clip-article summaries, page copy, short notes to people he knows. Takes source material (a transcript excerpt, a clip transcript, an existing draft) plus a brief (who it's for, what it's for, length), keeps his own phrasings, and runs a write > mechanical check > fresh-grader > retry loop against his web and article rubric (up to 3 attempts, 5 on request), logging every grade with the grader's written findings. Use whenever a session writes or rewrites site copy or a note, "write the blog post", "summarise this clip", "rewrite this paragraph", "draft the note to ...", "make this sound like Alex". Not for LinkedIn posts.
---

# alex-voice -- write it the way Alex talks

**Rule of the project: no copy reaches a reader without this skill.** Alex's complaint about the copy
so far was that none of it sounds like him, although there are hours of transcripts of how he talks. This
skill fixes that two ways: it writes **from his own words** (the source), and it doesn't let a draft out
until a **fresh grader** with his rubric has passed it.

Lineage: a port of Alex's own Write Great Post skill (LinkedIn only) to web and article copy. Same loop,
same writer/grader split, same IDs-only feedback; a new rubric (`rubric.md`, web-1.1) that keeps every
voice rule of his LinkedIn rubric v2.1 and drops its hook and fold rules.

## Files (everything below is relative to this skill's folder, `<skill>`)

| File | Who reads it |
|---|---|
| `writing-view.md` | **The writer. The only part of the rubric the writer reads.** Derived from `rubric.md` §C. |
| `rubric.md` | Nobody during a run. The grading view (§B) goes to the grader by script. Edit it, then re-run `scripts/extract-writing-view.ps1`. |
| `grader-template.md` | The assembler script. Four slots: grading view, brief, source, draft. |
| `scripts/preflight.py` | Mechanical check of every countable rule. No model call. |
| `scripts/assemble-payload.ps1` | Fills the template, writes the payload file, prints its SHA-256. |
| `scripts/validate-citations.ps1` (+ `lib-rubric.ps1`) | Checks every criterion the grader cites exists and is quoted exactly. |
| `scripts/append-assessment.ps1` | Appends the grader's full written findings to the run log. The only reader of the assessment. |
| `local/` | **Git-ignored.** Every run's files and logs. The repo is public: drafts name real people, so they never leave `local/`. |

## Inputs: the brief and the source

Ask for anything missing before writing; never invent a brief.

**Brief** (write it to `brief.md` in the run folder):

```
kind: page | article | clip-summary | note
surface: site | message
for: <the reader, e.g. "Addvery's six hiring stakeholders"; for a note, the person and the real history>
purpose: <what the copy must do>
length: <target words>
context: <what sits around it on the page, if anything; not to be rewritten>
keep: <lines that must survive verbatim, if any>
```

**Source** (write it to `source.md`): his own words first, under a `## His words` heading -- the
transcript excerpt (`OBS\Processed\<session>\transcript\<session>.md`, with its timestamps), the clip
transcript, his typed lines. An existing draft that isn't his goes under `## Existing draft (not his
words)`. Excerpt, don't dump: up to about 8,000 characters, the passages that carry the point. If there
is truly nothing in his words, say so in the brief; SRC-36 then passes vacuously and the copy will sound
less like him.

## The loop

Exit on the first of: the grade is `Great`, or the attempt counter reaches the cap (**3 by default, 5 when
the requester asks**). Never run "one more" and never restart the loop under another name.

**Setup, once per run.** Make `<skill>/local/runs/<yyyy-mm-dd>-<nn>-<slug>/` (call it `<run>`) and write
`brief.md` and `source.md` into it. Create `<run>/log.md` with the brief at the top.

Per attempt `i`:

1. **Write** `<run>/attempt-<i>.md` -- the copy only, nothing else (no notes, no byline). Read
   `<skill>/writing-view.md`, the brief and the source, and nothing from the rubric. Mine the source
   first: mark his best lines, then write the one point, then the draft. From attempt 2, carry in only
   the failed criterion **IDs** (read them against the writing view) and your own earlier drafts.
   If this session has already read `rubric.md` or an assessment, hand the writing to a fresh subagent
   that gets only those three files, the failed IDs and its earlier drafts.
2. **Pre-flight** (no grader call):
   `python -I <skill>/scripts/preflight.py --draft <run>/attempt-<i>.md --surface <surface> --kind <kind> --source <run>/source.md --target-words <n>`
   Exit 1: fix the cited IDs and re-run. Pre-flight rewrites don't count as attempts (cap them at 5).
3. **Log before grading**: append `## Attempt <i>` and the draft to `<run>/log.md`.
4. **Assemble** (PowerShell tool):
   `& "<skill>/scripts/assemble-payload.ps1" -DraftFile <run>/attempt-<i>.md -BriefFile <run>/brief.md -SourceFile <run>/source.md -OutFile <run>/payload-<i>.md`
5. **Grade** with one fresh subagent: the Agent tool, `subagent_type: general-purpose`, `model: opus`,
   prompt exactly as in "Grader dispatch" below. One dispatch per attempt. The writer never grades itself
   and never edits the draft between logging and dispatch.
6. **Check the return shape**: exactly `grade: <Unpublishable|Good|Great>` and `failed_ids: <IDs or
   none>`. Malformed: re-dispatch the same attempt once; a second malformed return is a halt.
7. **Validate citations** (PowerShell):
   `& "<skill>/scripts/validate-citations.ps1" -AssessmentFile <run>/assessment-<i>.md -RubricFile <skill>/rubric.md -FailuresFile <run>/citation-failures.md -Label "attempt <i>"`
   Exit 1 is a **halt**: the grader quoted a criterion from memory or cited one that doesn't exist.
8. **Keep the findings**: `& "<skill>/scripts/append-assessment.ps1" -AssessmentFile <run>/assessment-<i>.md -LogFile <run>/log.md -Attempt <i>`
9. `Great`: stop. Otherwise carry the failed IDs into attempt `i+1`.

**IDs only cross the line.** The writer never opens `assessment-*.md` and never reads the assessment
sections of `log.md`. Grader prose teaches the writer what the judge likes to hear; the IDs tell it what
to fix. Read an ID against `writing-view.md`, never by asking the grader.

### Grader dispatch (the prompt, verbatim, with the two paths filled)

> You are a fresh-context grader for the alex-voice skill. Read exactly one file, `<run>/payload-<i>.md`,
> and nothing else. It holds a rubric's grading view, a brief, source material and one piece of copy. Grade
> the copy exactly as the payload's Output section instructs: written findings, then grade, then
> failed_criteria, each failed criterion cited as `[ID] "verbatim Statement text"` copied from the payload.
> Save that assessment to `<run>/assessment-<i>.md`. Your returned message must then contain ONLY two
> lines: `grade: <Unpublishable|Good|Great>` and `failed_ids: <comma-separated IDs or none>` -- no
> findings, no criterion text.

**Never ask the grader for its "reasoning", "chain of thought" or "thinking", or to write it out
verbatim.** The API's safeguards read that as reasoning extraction and stop the response (this happened
in calibration: 5 of 7 dispatches stopped, tagged `reasoning_extraction`). Ask for written findings: the
same content, framed as the deliverable it is.

## When the loop ends

- **Deliver** the latest `Great`, or, at the cap, the best attempt (highest grade, latest among ties),
  with its grade, the failed IDs if any, the attempt count and the log path. Say plainly when the best
  is only `Good`; never ship an `Unpublishable` attempt as finished copy.
- The log is the deliverable for Alex: it shows which rule drove each grade, so he can tune the rubric
  from evidence. It never claims a pass rate.
- Copy the final text to wherever it's going yourself. The skill doesn't touch site files.

## Halts -- stop and report, don't improvise

- `writing-view.md` is missing or older than `rubric.md`: re-run `scripts/extract-writing-view.ps1` first;
  if it halts, the rubric is defective.
- No brief, or no reader or purpose in it.
- A second malformed grader return, or a citation-validation failure (exit 1).

## Cost

One grader call per graded attempt: **1 to 3 per piece by default** (up to 5 on request), plus one more
only if a grader return comes back malformed. Pre-flight failures cost nothing. Each grader call reads
about 18,000 characters of grading view plus the brief, source and draft (roughly 6,000 to 10,000 input
tokens). Calibration (`rubric.md` §E) is a one-off and is not part of a run.

## Notes

- **Notes to people he knows** (kind `note`, surface `message`): the brief must state the real history
  ("in touch for four years, met for breakfast three times"); KNOW-40 holds the note to it. Keep these
  runs in `local/`, always.
- **Third person** is a disqualifier on his site (THRD-30): the site is him talking.
- **LinkedIn posts** are out of scope: their hook and fold rules are not in this rubric. Use Alex's
  Write Great Post skill for those.
- **Changing the rubric**: edit `rubric.md` only (never `writing-view.md`), keep IDs stable and never reuse
  one, re-run `scripts/extract-writing-view.ps1`, and if you add or change a countable rule, change
  `scripts/preflight.py` and re-run it over his posts (`rubric.md` §E) so it fires on none of them.
