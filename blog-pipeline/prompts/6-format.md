---
stage: 6
name: format
version: v0
reads: "{DIR}\\5-edit.md, {FORMAT}, the numbers from the running session"
writes: "{DIR}\\post.md"
---

# Stage 6: format

You turn the edited post into the one post file the site renders, exactly as `{FORMAT}` (the post format) defines it. You change the body's words only where the format requires it (a pull-quote block, a heading level). Everything else is layout and metadata.

## Inputs

- `{DIR}\5-edit.md`: the edited post and its header block (title, promise, words, markers).
- `{FORMAT}`: the post format: the front matter fields, the body rules, and the exact syntax for pull quotes, callouts and `[Alex: ...]` markers. Read it in full first; where this prompt and the format disagree, the format wins.
- **The numbers**, handed to you by the running session in the hand-off message: minutes talked, words spoken (the dictation's word count), the rig session id if there is one, the dictation's date and time, and the pipeline version. Words drafted is the body word count of `post.md`, which you count with `python -I blog-pipeline\scripts\counts.py {DIR}\post.md` after writing it.

## What to do

1. **Front matter**, every field the format requires, in its order:
   - the title from the header block; the slug from it per the format's rule;
   - a meta description of the length the format sets, built from the promise and the thesis, in plain words, no clickbait;
   - `status: draft` (the scan stage sets `near-final` when it passes, never you);
   - `made.stages` as `["clean", "extract", "outline", "draft", "edit", "format", "scan"]` and `made.checks` as `["edit", "scan"]`, unless the hand-off message names others;
   - the typographic cover: a short kicker, the subtitle (the promise), and an accent word from the title if one stands out;
   - tags, reading minutes, and the "how this post was made" numbers. Leave the share of words Alex changed empty, as the format says.
2. **Pull quotes:** pick one to three sentences from the body that stand alone and sound like him (his own phrases first). Use the format's pull-quote syntax and placement rule (§3.2: in the section that holds its sentence or the next one, never directly before or after the paragraph it quotes, never in the lede or last), and keep the sentence in the body too, word for word. Add a key-points box (§3.3) only if three to five of his claims stand out as the post's spine.
3. **Headings and body:** apply the format's body rules (no H1, `##` sections, the list and table limits, no raw HTML, no images). Fix only what breaks a rule.
4. **Markers:** keep every `[Alex: ...]` marker exactly as written. They are his last 10% and the preview shows them highlighted.
5. **Check:** run `python -I blog-pipeline\scripts\counts.py {DIR}\post.md`, put that number in `made.words_drafted`, and recompute `reading_minutes` (words / 230, rounded up). Then run `python -I blog-pipeline\scripts\validate.py {DIR}\post.md`, which checks the format's §6 checklist, and fix every `F` line it prints (layout only: move a pull quote, shorten the description, split a long paragraph). Rerun until it exits 0. Report its `W` lines in your return.

## Output: `{DIR}\post.md`

The post file, nothing else in it.

## Return

```
STAGE 6 DONE {ID}: {DIR}\post.md, slug <slug>, <words> words, <q> pull quotes, <m> markers, checklist <pass | list of failures>
```
