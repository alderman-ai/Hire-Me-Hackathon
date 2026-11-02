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

## The hand-off message

Every stage gets the same short message, and nothing else from the running session's context:

```
You are stage <n> of the blog pipeline. Read blog-pipeline\prompts\<n>-<stage>.md and follow it exactly.
{ID} = ...   {DICTATION} = ...   {DIR} = ...   {FORMAT} = ...   {TOPIC} = ...
Work from the repo root C:\Users\alder\Desktop\Hire me hackaton. Write only the files the prompt names. Don't commit.
Return the prompt's "Return" block and nothing else.
```

## Change log

| Version | When | What changed | Why |
| --- | --- | --- | --- |
| v0 | 2 Nov, ~15:00 | First draft of stages 0 to 7 | SPEC §7 methodology, before research |
