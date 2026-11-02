# Blog pipeline runbook

**v1, 2 Nov 2026, ~19:30 · run by S-D5 on the two articles (compiled-source mode, see Versions).** v0, ~15:15, was the first draft. Written from the planned stages before the test dictation. v1 replaces it once the test post has gone through every stage; each version is announced to the three-articles session as `PIPELINE S-D4 v<n>: blog-pipeline\PIPELINE.md at <commit>; <accepted | not yet accepted>`.

What it does: about 15 minutes of Alex talking (Wispr Flow) in, one near-final post file out, in the format of `POST-FORMAT.md`, with only his last 10% left as `[Alex: ...]` notes. Every stage is a fresh subagent with one prompt from `prompts\` and only its input files. **Nobody edits between stages:** when a stage's output is wrong, fix its prompt, bump the prompt's version, and rerun that stage and every one after it.

All commands run from the repo root, `C:\Users\alder\Desktop\Hire me hackaton`. Paths below use the test post's names; for another post, swap `T-01`, the task file and the folders (the three articles use `blog-articles\dictations\A-0<n>.md` and `blog-articles\drafts\A-0<n>\`).

## 0. Before the dictation

1. **Talking prompts.** Hand stage 0 (`prompts\0-talking-prompts.md`) the topic; paste its block into the dictation task.
2. **The dictation task.** An operator task in `Operator tasks\`, named `Do - <what it's about>.md`, from `orchestration\_templates\Operator task template.md` with the next free OT id in its front matter. In this order: `## What this is` (plain words, no codes), `## What to talk about` (the prompts), `## When you're done` with `- [ ] Done`, and `## Dictate below this line` as the last heading. Scan it, commit it, send `answer-desk` the `TASK` line.
3. **Wait** with the Monitor tool, every 300 seconds:
   `python -I blog-pipeline\scripts\check_done.py "Operator tasks\Do - your test dictation for the blog.md" --also-dir blog-pipeline\dictations`
   Exit 0 (`DONE` or `FALLBACK <path>`) means go. Poke the desk 15 minutes after the slot ends if it's still open.

## 1. Capture

```powershell
python -I blog-pipeline\scripts\join.py "Operator tasks\Do - your test dictation for the blog.md" blog-pipeline\dictations\T-01.md --task
# or, for a fallback note:  python -I blog-pipeline\scripts\join.py blog-pipeline\dictations\<note>.md blog-pipeline\dictations\T-01.md
python -I blog-pipeline\scripts\scan.py blog-pipeline\dictations\T-01.md
```

A scan hit in the dictation: replace it with `[removed: <category>]`, note the words around it for the clip session, rescan. Then commit the dictation, send `TASK DONE` and `ARCHIVE` for the task, and tell `s-d9-legibility` the dictation's clock times and rig session.

**The rig backup, once the session is processed** (`OBS\Processed\index.json` lists it; `/process` runs only when Alex types it):

```powershell
python -I blog-pipeline\scripts\find_in_rig.py --start 15:15 --end 15:35 --out blog-pipeline\drafts\T-01\rig.txt
python -I blog-pipeline\scripts\find_in_rig.py --start 15:15 --end 15:35 --against blog-pipeline\dictations\T-01.md > blog-pipeline\drafts\T-01\gaps.txt
```

Scan `rig.txt` before any stage reads it (`scan.py`), like the dictation. If the rig is the only source (no Wispr Flow text), use `rig.txt` as `{DICTATION}` and say so in stage 1's hand-off. Its `WINDOW` line gives the session id and the minutes spoken, for the "How this post was made" box. If the rig hasn't processed the session yet, don't wait: draft without `rig.txt` and `gaps.txt`, take minutes talked from the slot (or words spoken / 150, rounded), and rerun stage 1 onward later only if `--against` then shows real gaps.

## 2. Stages

Hand each stage to a fresh general-purpose subagent with exactly this message (see `prompts\README.md`), and nothing else from your own context:

```
You are stage <n> of the blog pipeline. Read blog-pipeline\prompts\<n>-<stage>.md and follow it exactly.
{ID} = T-01   {DICTATION} = blog-pipeline\dictations\T-01.md   {DIR} = blog-pipeline\drafts\T-01   {FORMAT} = blog-pipeline\POST-FORMAT.md   {TOPIC} = <topic>   {SKILL} = marketing:content-creation
Work from the repo root C:\Users\alder\Desktop\Hire me hackaton. Write only the files the prompt names. Don't commit.
Return the prompt's "Return" block and nothing else.
```

| # | Stage | Writes | Check before the next stage |
| --- | --- | --- | --- |
| 1 | clean | `1-clean.md` | `words_out` is 85–100% of `words_in` |
| 2 | extract | `2-extract.md` | every quote is in `1-clean.md` verbatim; the K list is complete |
| 3 | outline | `3-outline.md` | 4–6 sections; every section cites C or S ids |
| 4 | draft | `4-draft.md` | 900–1,400 words; most P phrases used; no banned words |
| 5 | edit | `5-edit.md`, `5-edit-notes.md` | every claim traced; 3–6 `[Alex: ...]` notes |
| 6 | format | `post.md` | `validate.py` exits 0 |
| 7 | scan | `7-scan.md`; `post.md` set to `near-final` | `scan.py` exits 0 on everything |

**No copywriting without a copywriting skill** (Alex, 2 Nov). Stages 3 to 6 (outline, draft, edit, format) load the skill in `{SKILL}` first and stop with `BLOCKED` without one. The skill is `marketing:content-creation`, picked from the blog research (L-03 R5) and confirmed on by `orchestration` (2 Nov, ~16:43). A voice-matching editor (`humanizer`) for the edit stage is Alex's call in the morning; until then the edit stage runs on the same skill.

Stages run one after another (each needs the last one's output). **Timing,** from a rehearsal on a 13-minute rig transcript (2,040 words): clean 2.6 min, extract 4.5, outline 3.9, draft 3.7, edit 4.5, format 2.0, scan 2.2. About 25 minutes from captured dictation to a near-final post, so book Alex's review at least 30 minutes after his dictation ends, plus the preview deploy. The checks are yours, the running session's: read the stage's return line and the file's header; a failed check means fix the prompt and rerun, never hand-edit.

**Stage 6's numbers** go in its hand-off message: minutes talked, words spoken (`counts.py blog-pipeline\dictations\T-01.md`), the rig session id or `null`, the dictation's start (`YYYY-MM-DDTHH:MM`), and `blog pipeline v<n>`.

## 3. Checks, commands

```powershell
python -I blog-pipeline\scripts\counts.py blog-pipeline\drafts\T-01\post.md
python -I blog-pipeline\scripts\validate.py blog-pipeline\drafts\T-01\post.md
python -I blog-pipeline\scripts\scan.py blog-pipeline\dictations\T-01.md "blog-pipeline\drafts\T-01\*.md"
```

Nothing is committed before the scan exits 0. Commit path-limited: `git commit -m "[blog-pipeline] ..." -- blog-pipeline/...`.

## 4. The site

One request at a time to `website`, numbered in order, waiting for `BUILT` or `REFUSED` before the next:

- **Template** (once): `BUILD S-D4-B1: add a blog: a /blog index and a /blog/<slug> post page in the site's look, rendering post files as POST-FORMAT.md describes, with a "How this post was made" box; not linked from the page until the first post is live. Content: blog-pipeline\POST-FORMAT.md and blog-pipeline\samples\sample-post.md. Source: the D4 blog pipeline.`
- **Preview** (each post): `BUILD S-D4-B<n>: deploy a preview, not production, with the test post at /blog/<slug>, and reply with its URL. Content: blog-pipeline\drafts\T-01\post.md. Source: the test dictation through the pipeline.`

The three articles use their own spec id (`BUILD S-D5-B<n>: ...`).

## 5. Alex's review and the last 10%

Freeze the post into a gate approval (`Approve - ...` in `Operator tasks\`, from `orchestration\_templates\Gate approval template.md`): what this is in plain words, a five-line summary, the preview URL, the post in full, the numbers, the list of `[Alex: ...]` notes, and the outline's other two titles and two openings for him to pick from. Optional, his call: a cold read by a subagent playing a sceptical agency leader before his last 10% (blog research W3). Wait on it with `python -I orchestration\check_gate.py "<file>"` every 300 seconds. When it says `APPROVED`, still read the changes fence: whatever Alex wrote there is part of the approval (his rule, 2 Nov 16:36), so apply it before moving on.

Publishing (the three articles' step, not this pipeline's): Alex fills the notes, then

```powershell
python -I blog-pipeline\scripts\counts.py --changed blog-pipeline\drafts\T-01\post.md <his finished file>
```

gives `share_changed_by_alex`; the publish step sets `status: "published"` and the publish date, and `validate.py` must exit 0 (it fails on any note left).

## Versions

| Version | When | Change |
| --- | --- | --- |
| v0 | 2 Nov, ~15:15 | First draft from the planned stages and prompts v0, before any run and before the blog research lands |
| v0 (timing) | 2 Nov, ~15:45 | Stage timings from a rehearsal on a rig transcript; prompts 1, 4 and 5 at v0.1 after it. The rehearsal isn't the test post and isn't committed |
| v1 | 2 Nov, ~19:30 | S-D5 owns the kit (S-D4 retired). Compiled-source mode: on Alex's instruction (about 18:15, "I've given you the transcripts ... pull lots of quotes") a reader subagent compiles his recorded and typed words per post into `blog-articles\local\sources\<id>.md` (git-ignored), which stands in for `{DICTATION}`; stage files run in `blog-articles\local\drafts\<id>\`. Block quotes (POST-FORMAT v1.4) in prompts 4 to 6; a cold read under `marketing:brand-review` after stage 5 writes `5b-coldread.md` and changes nothing. Drafts go to a Claude Doc for his last 10%, not a gate approval. Prompts: 3 v0.4, 4 v0.3, 5 v0.4, 6 v0.4 |
