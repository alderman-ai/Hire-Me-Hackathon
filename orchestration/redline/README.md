# Redline extractor

Alex redlines the live site by scrolling through it and talking, with the OBS rig recording the screen and his mic. `redline_extract.py` turns that recording into a list of his comments, each paired with the frames of what was on screen while he said it. Stage 2 (agents, not script) works out what each comment refers to and merges everything into one redline list.

## Time base

The rig transcribes the session video's own mic track (`OBS\rig\scripts\process.py`, `Job.audio`), so transcript times are screen-video times with no offset. The webcam's +2.38 s offset doesn't apply. On S17, the screen switches to the Claude usage page at 221.87 s, as he says "challenge is managing usage". A /pause cuts the video without leaving a gap, and the manifest's `clock_map` lists those cuts. Pause-based splitting never runs a comment across a cut, and no frame is taken from the other side of one. Crash-gap lines recovered from the backup audio (`<id>_backup.json`) become comments with no frames (`no_video: true`).

## CLI

```
python orchestration\redline\redline_extract.py --session OBS\Processed\<folder> [--out orchestration\local\redline\<id>] [--banana auto|on|off]
```

The default output is `orchestration\local\redline\<session id>\`, which is git-ignored. The script needs ffmpeg on PATH and nothing outside the standard library. Other flags: `--pause 1.2` (the silence that ends a comment), `--min-words 3`, `--max-seconds 30` (longer pause-based comments split at their longest gap), `--outside-seconds 20`, `--lead 1.5`, `--step 1.5`, `--max-frames 4`, `--width 1280`, `--offset 0` (seconds added to transcript times), `--video` and `--transcript` (overrides). It takes about 30 s on a 9-minute session.

`python orchestration\redline\test_redline.py` runs the synthetic checks: markers injected into S17's words at known times, and a fake 60 s /pause.

## Splitting

**Pause mode** (no markers heard, or `--banana off`): break on silences over 1.2 s, sentence ends and /pause cuts; merge fragments under 3 words into the nearer neighbour; split anything over 30 s at its longest gap. Frames start 1.5 s before the comment, then come every 1.5 s through its end. Near-duplicates are dropped (under 0.5% of a 96x54 thumbnail changed, so a cursor move doesn't count), and the least-changed frames go first until at most 4 remain.

**Banana mode** (on by default when the markers are heard): Alex says **"banana"** once he's landed on the thing and **"cucumber"** when he's done with it. Both match fuzzily: banana within edit distance 1 (bananas, "Banana."), cucumber within 2 (cucumbers, kukumber, "cu cumber" split in two). Both words are stripped from the text.

| `kind` | When | Text | Frames |
| --- | --- | --- | --- |
| `pair` | banana ... cucumber | the words in between | banana +1.0 s (`anchor_frame`), +0.0 s, +2.0 s, and one just before the cucumber, each kept only if it differs |
| `no_cucumber` | banana ... next banana | up to the next banana, cut at about 20 s; the rest becomes `outside_pair` | as for a pair, with the last word in place of the cucumber |
| `no_banana` | a cucumber with no banana | from the previous marker or the last pause before the cucumber, whichever is later | pause-mode frames |
| `outside_pair` | talk outside any pair lasting over 20 s | pause-based split | pause-mode frames |

Shorter talk outside any pair isn't made into comments. It's listed under `skipped_outside` in `meta.json` and at the bottom of `index.html`.

## Outputs

- `comments.json`: `[{id, start, end, text, frames: [relative paths], frame_times, kind, wall_start}]`. Banana mode adds `anchor_frame` (null if there is none), `banana_at`, `cucumber_at`, and `no_cucumber` / `no_banana` / `outside_pair: true` where they apply.
- `frames/c001_1.jpg` and so on: 1280 px JPGs.
- `index.html`: the contact sheet, with each comment's text next to its frames and the anchor outlined.
- `meta.json`: the session, the video, the mode, the parameters and `skipped_outside`.

The frames show whatever was on screen. They stay local and are never published (DoD-22).

## Stage 2: agents read the frames

Paste this into an orchestrating session, filling in `<dir>`:

```text
Stage 2 of the redline. Input: <dir>\comments.json (the frames are in <dir>\frames\; the
contact sheet is <dir>\index.html). Don't edit any website file; this produces a list only.

1. Read comments.json. For each comment, spawn a subagent with the brief below. Run
   several in parallel. Give each one its comment's JSON plus the text of the comments
   either side of it, for context.
2. Subagent brief: "Alex is redlining his live website out loud while scrolling. Here is one
   of his comments, with the frames of the screen while he said it. Open every frame with
   the Read tool. If anchor_frame is set, it's the main frame: he said 'banana' as he
   landed on the thing he means. Use the cursor position, the address bar and his words
   to find what he's talking about. Write <dir>\stage2\<id>.json:
   {id, is_redline, page_url, section, element, words, change, kind, confidence,
   needs_alex, continues}
   - is_redline: false if it isn't feedback on the site (chat, thinking aloud, logistics).
     outside_pair and no_banana comments are often false; check them for a forgotten banana.
   - page_url: from the address bar. If no frame shows it, take it from the neighbouring
     comments and lower confidence.
   - section: the page section (hero, stakeholder cards, footer...); element: the exact
     thing (a heading, a button, a video, a paragraph), quoting its on-screen text.
   - words: his words verbatim, from the comment text.
   - change: the change he wants, in one imperative sentence.
   - kind: copy | layout | remove | add | video.
   - confidence: high | medium | low.
   - needs_alex: true if the change is ambiguous, a judgment call, or the element isn't
     identifiable from the frames.
   - continues: the id of the earlier comment this one continues (no_cucumber tails,
     outside_pair right after a pair), or null."
3. When all are back, merge into <dir>\redline.md and <dir>\redline.json: drop
   is_redline=false, fold each `continues` into its parent, merge comments on the same
   element, and group by page (pages in the order he visited them, items in time order).
   Each item: element, change, kind, his words, the comment ids and the anchor frame path.
   Put a "Needs Alex" list at the top with every needs_alex or low-confidence item.
```
