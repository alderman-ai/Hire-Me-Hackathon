# Stage prompts (v0)

One prompt per stage of the blog pipeline. Each stage runs in a **fresh subagent** that gets only its prompt and its input files, and nobody edits between stages: when a stage's output is wrong, fix its prompt and rerun the stage, so the pipeline itself makes the post.

Status: **v0**, drafted from the methodology in `blog-pipeline\SPEC.md` §7 before the blog research (L-03) lands. Revised once its synthesis is in; each revision bumps the version line in every prompt it touches and gets logged below.

| Stage | Prompt | Reads | Writes |
| --- | --- | --- | --- |
| 0 | `0-talking-prompts.md` | the topic | five talking prompts for the dictation task |
| 1 | `1-clean.md` | `{DICTATION}`, optional `{DIR}\rig.txt`, `{DIR}\gaps.txt` | `{DIR}\1-clean.md` |
| 2 | `2-extract.md` | `{DIR}\1-clean.md` | `{DIR}\2-extract.md` |
| 3 | `3-outline.md` | `{DIR}\2-extract.md`, `{DIR}\1-clean.md` | `{DIR}\3-outline.md` |
| 4 | `4-draft.md` | `{DIR}\3-outline.md`, `{DIR}\2-extract.md`, `{DIR}\1-clean.md` | `{DIR}\4-draft.md` |
| 5 | `5-edit.md` | `{DIR}\4-draft.md`, `{DIR}\1-clean.md` | `{DIR}\5-edit.md`, `{DIR}\5-edit-notes.md` |
| 6 | `6-format.md` | `{DIR}\5-edit.md`, `{FORMAT}`, the numbers | `{DIR}\post.md` |
| 7 | `7-scan.md` | `{DIR}\post.md`, `{DICTATION}`, every stage file | `{DIR}\7-scan.md`; fixes `post.md` |

## The variables

The session running the pipeline fills these in when it hands a stage to a subagent. Paths are from the repo root, `C:\Users\alder\Desktop\Hire me hackaton`.

- `{ID}`: the post's id, e.g. `T-01`.
- `{DICTATION}`: the dictation file, e.g. `blog-pipeline\dictations\T-01.md`.
- `{DIR}`: the post's working folder, e.g. `blog-pipeline\drafts\T-01`.
- `{FORMAT}`: `blog-pipeline\POST-FORMAT.md`.
- `{TOPIC}`: the topic as Alex gave it.
- `{SKILL}`: the copywriting skill stages 3 to 6 load before they write (Alex, 2 Nov: "Do not do any copywriting without a copywriting skill"). Since 2 Nov, ~16:43: `marketing:content-creation` for every stage, confirmed on by `orchestration` (`SKILL ON`), picked from the blog research (L-03 R5). An editor that matches Alex's voice sample (`humanizer`) for the edit stage waits for Alex's say in the morning.

## The hand-off message

Every stage gets the same short message, and nothing else from the running session's context:

```
You are stage <n> of the blog pipeline. Read blog-pipeline\prompts\<n>-<stage>.md and follow it exactly.
{ID} = ...   {DICTATION} = ...   {DIR} = ...   {FORMAT} = ...   {TOPIC} = ...   {SKILL} = ...
Work from the repo root C:\Users\alder\Desktop\Hire me hackaton. Write only the files the prompt names. Don't commit.
Return the prompt's "Return" block and nothing else.
```

## Change log

| Version | When | What changed | Why |
| --- | --- | --- | --- |
| v0 | 2 Nov, ~15:00 | First draft of stages 0 to 7 | SPEC §7 methodology, before research |
| v0 (6, 7) | 2 Nov, ~15:10 | Format stage follows `POST-FORMAT.md` v1 (stages and checks lists, pull-quote placement, `validate.py`); scan stage sets `near-final` when it passes; edit stage: ideas, not verdicts, on a real company's market | The post format landed; L-01 synthesis rec 4.5 |
| v0.1 (1, 4, 5) | 2 Nov, ~15:45 | Clean: fix mis-hearings only when near-certain. Draft and edit: written, not transcribed (cut "et cetera", "whatever", "yeah" and other speech scaffolding; at most two "So" openers; asides to the camera rewritten), and events of the day in the past tense | Rehearsal on a 13-minute rig transcript (not committed): every check passed, but the post still read as transcribed speech |
| v0.2 (3, 4, 5, 6) | 2 Nov, ~16:38 | Each loads the copywriting skill `{SKILL}` before writing, and stops if there's none | Alex in his note on the blog research approval: "Do not do any copywriting without a copywriting skill" |
| v0.1–v0.3 (0, 1, 3, 5, 6) | 2 Nov, ~16:44 | Talking prompts: the strongest objection and a concession (prompt 3). Clean: `glossary.md`, unclear stretches marked, a rig-as-main-source mode, unpunctuated rig text. Outline: two alternative openings for Alex's review. Edit: an optional voice pass with a sample-matching editor, unclear text to notes. Format: key points on by default, a diagram only from his own scale or steps. Stages 3 to 6 never stop to ask | The blog research: R3 (capture), R1 (transcript to draft), R4 (finished post), W3 (reception) |
