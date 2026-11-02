---
stage: 1
name: clean
version: v0
reads: "{DICTATION}; optional {DIR}\\rig.txt and {DIR}\\gaps.txt"
writes: "{DIR}\\1-clean.md"
---

# Stage 1: clean

You turn Alex's raw dictation into a clean transcript **that is still his words**. You are not editing, summarising or improving. Every later stage trusts that this file is what he said.

## Inputs

- `{DICTATION}`: what Wispr Flow typed while he talked for about 15 minutes. It has already been joined from its pieces by `scripts\join.py`. Read its front matter for the word count.
- `{DIR}\rig.txt`, if it exists: the capture rig's own transcript of the same minutes (a separate speech-to-text of the recording).
- `{DIR}\gaps.txt`, if it exists: the stretches of the rig transcript that the dictation seems to be missing (from `scripts\find_in_rig.py --against`), one `GAP [time] text` line each.

## What to do

1. **Fix plain mis-hearings** only: a word that is clearly a transcription error for a similar-sounding word, given the context (e.g. "get sales" for "GetSales", "cloud code" for "Claude Code", "whisper flow" for "Wispr Flow", "API" heard as "a PI"). Keep a list.
2. **Fill gaps from the rig.** For each line in `gaps.txt` that is real speech missing from the dictation (not a duplicate, not off-topic chatter to someone else, not an aside to the recording rig such as "hey Claude"), insert the rig's words at the right place, and mark the insertion `⟦rig: ... ⟧` so the next stage can see it. If there's no `gaps.txt`, skip this.
3. **Paragraphs.** Break into paragraphs where he changes thought. Don't reorder anything.
4. **Remove only pure noise:** false starts that he immediately restarts ("we, we, so we built"), repeated filler ("um", "uh", "you know" when it carries nothing), and asides that aren't part of the talk ("hang on", "let me check the screen", talking to the rig). Keep every hedge, joke, aside to the reader, and turn of phrase. If in doubt, keep it.
5. **Punctuation:** fix it so the sentences read, without merging or splitting his sentences more than the punctuation needs.

## Never

- Never add a word he didn't say (except mis-hearing fixes and `⟦rig: ⟧` insertions).
- Never "improve" grammar into formal English. His spoken rhythm is the voice the post keeps.
- Never drop a claim, a number, an example or a story, even a half-finished one.

## Output: `{DIR}\1-clean.md`

```
---
id: {ID}
stage: 1-clean
prompt: v0
from: {DICTATION}
words_in: <words in the dictation body>
words_out: <words in this file's body>
---

<the clean transcript, in paragraphs>

<!-- fixes
- "<heard>" -> "<meant>" (n times)
- rig insertions: <n>, at <times>
- removed as noise: <one-line summary, e.g. "14 fillers, 3 false starts, 2 asides to the rig">
-->
```

`words_out` should normally be 85 to 100% of `words_in`. If it's below 85%, you've cut too much: put things back.

## Return

```
STAGE 1 DONE {ID}: {DIR}\1-clean.md, <words_in> -> <words_out> words, <k> mis-hearings fixed, <r> rig insertions
```
