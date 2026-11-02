# S-D9 handoff — 2 Nov, ~18:50 Prague (forking gate G3), from session 3020a577

**First, before anything else: start the 30-minute loop.** Run `/loop 30m` with this prompt: "Run the S-D9 30-minute check from legibility\SPEC.md section 7: check ..\OBS\Processed\index.json for sessions filed since the last line of checks.md and read each new one; look at what changed in the project since then (specs, SESSIONS.md, git log, the clock); read the titles in ..\website\content\feed.json so nothing goes up twice; post anything a follower should know (one BUILD S-D9-B<n> at a time, only after the last one is BUILT); log the check in checks.md and commit legibility\. If nothing changed, end the turn straight away." The old loop is cron `ea3b62dc` in session 3020a577; the old session deletes it before stopping.

Then read: `CLAUDE.md`, `SPEC.md` (§7 top block: reset rules, one-sitting rule; §9: newest decisions first), `..\answer-desk\ASKING.md` (reset rules at the top), `posted.md`, the last ten lines of `checks.md`, and this file to the end.

## Where things stand

- **Posts:** P1 to P10 live. P10 "The day so far" (first summary post, `"summary": true`) went live at 18:25 (website e07350a). **Next post due by 20:25** (two-hour floor). Next id: P11, sent as `BUILD S-D9-B11`. Nothing in flight with `website`.
- **Filed sessions covered:** S01 to S11 (posted.md "Sessions covered"). S12 has been recording since 17:34; read it when it's filed.
- **How posts read now (Alex, 17:5x):** for a reader going through the feed in one sitting: fewer, denser posts, about one build every two hours, and a summary post (`"summary": true` plus a one-sentence `summary_line`) at each milestone. The carousel at the top shows the summaries; s11, s08, s06 and s02 are tagged.
- **Time format (Alex, 18:3x; website's format, 18:24):** Prague time only. Quote sources read "Alex, S04, 12:24" (session plus Prague clock time); written answers "Alex, written answer, 17:23". A video position only as "from 2:45 into the video". Never an offset next to a clock time.
- **Copy:** invoke `marketing:draft-content` before each post. Draft posts in the running Doc "Feed posts from the build" (https://claude.ai/artifact/CZvgGu1jYK2jQGYuZqFSNL, doc 5dad67d6-35e5-4726-bf25-5f0964db0209, body node 0d17f38e-191a), newest on top, then `posts\P<n>.md`, then BUILD. Nothing waits on Alex; his comment becomes an edit build.

## The day-one story (DoD-24) — waiting on Alex's comment

- File: `article\day-one.md` (POST-FORMAT v1.5, `kind: "showcase"`, `deliverable: "d9"`, validated 0 fail, 0 warn).
- Doc for his last 10%: https://claude.ai/artifact/Qs2nBb9ienSKxRe7nthJ3c (doc c13e795a-41ab-4f3a-a48a-80f9a7f6558b, body node 25871391-05a2). TASK sent; the desk showed it at 18:15. Two `[Alex: …]` notes (proudest afternoon moment; closing line).
- **When he comments:** read the Doc back into `article\day-one.md` (his words win; remove the notes he filled), set `status: "published"` only if the format allows for a showcase (check validate.py), validate, then `BUILD S-D9-B<n>` to `website`: a new /demos entry from `legibility\article\day-one.md`. Then `TASK DONE S-D9: the day-one story` to `answer-desk`.
- **Clip swaps pending in the article** (do them when the batch ids come back): `pyFHE1JHMV8` → id of `day1-2-too-much-at-once-v2`; `FMYWlkGWdeY` → id of `day1-5-bottleneck-human-v2`; `MyYnFOQCagc 240 277` → id of `c-s08-same-thing-tomorrow` (no start or end; the old start fell inside a line that stays out). Update the Doc's clip links to match.

## The clip index and the batch

- `clip-index.md` (public, committed 0421158): every clip-worthy moment in S01 to S11, classified. Path sent to `orchestration` for Alex's tracker. The partial indexes with private details are in git-ignored `local\clip-index\`.
- **15 clips cut** in `clips\` (git-ignored) from `local\clip-index\cuts.json` with `tools\cut_batch.py`: 12 new, 2 replacements (`day1-2-…-v2`, `day1-5-…-v2`), 1 S08 recut. Two are **screen cuts, held** for Alex's OK (`c-s05-deletion-live`, `c-s07-answer-desk`); his rule is webcam only on the site, and orchestration relays his answer.
- **Frame check:** a subagent was checking all 15 at ~18:50. If its result isn't in this file, re-run the check: look at each `clips\<name>_sheet.jpg` (and every frame of the two screen cuts).
- **Upload batch:** send `website` one message with the passing webcam clips (and the screen cuts only once Alex says yes): path, YouTube title (in `cuts.json`), unlisted. Record the ids it sends back in `clip-index.md` (status `cut`, id) and swap them into the article.

## "How content gets picked" (orchestration, 18:2x)

- A GTM demos entry (`kind: "showcase"`, `deliverable: "d9"`), written by a subagent to `article\how-content-gets-picked.md` (POST-FORMAT v1.5). It uses `PENDING0001` (S04, 12:22, "the legibility analyzer is born": clip `c-s04-legibility-born`) and `PENDING0002` (S07, 13:41, "done means additions": clip `c-s07-done-means-additions`); swap in their ids from the batch.
- Then: a **rendered review artifact for Alex** (an Artifact page rendering the entry; load `artifact-design` first), then `BUILD` to `website`. Orchestration's rule (ASKING.md, d9f0998): page copy inside a designed page is reviewed as a rendered artifact; articles stay in Docs.

## Open clip requests

- **CLIP S-D3-C1** (demo 1, about 3 min: classification tools, the "Hackathon demo · Addvery" folder with 36 workflows, the one variable) and **CLIP S-D3-C2** (demo 2: a short terminal capture of leads classified into ICPs). They come from `s-d3-getsales` once Alex has recorded. CLIPPED must carry the transcript for the range (`clip-transcripts\<id>.md`). Frame check: nothing outside the demo folder.
- **CLIP S-D10-C1** (the Canva scene: from the last "Canva design starts now" to "Canva design done", screen plus webcam). The scene is now a quote card from S-D6's asset pack. Comes from `s-d10-canva-video` once the session is filed.
- Tool: `python -I legibility\tools\cut_clip.py <Sxx> <start> <end> <name> [--pad 3] [--screen] [--blur FROM:TO]`.

## Decisions since 17:16 (all in SPEC §9)

- Feed posts drafted in one running Claude Doc; nothing waits on Alex.
- Clip gate dropped (reset rules); never-post narrowed to DoD-22's three plus `do-not-post.md`.
- One-sitting readers: fewer, denser posts, summary flag agreed with `website`.
- Day-one story as a showcase entry, d9; "the scary point" is 13:20, not the 16:47 hold.
- Clips webcam by default; screen cuts held for Alex's OK.

## Gotchas

- **Clocks:** other sessions stamp times up to 12 minutes ahead. Use `date` or commit times.
- **Backslashes:** Python heredocs turn `\a`, `\f`, `\b` and `\c` (via sed) into control characters. Use the Edit tool, `chr(92)`, or a file for any Windows path.
- **Git:** commit only `legibility\`, path-limited. Wait out `index.lock`; never delete it.
