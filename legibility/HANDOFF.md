# S-D9 handoff — 2 Nov, 19:0x Prague (forking gate G3, context about half full), from session 3020a577

**First, before anything else: start the 30-minute loop.** Run `/loop 30m` with this prompt: "Run the S-D9 30-minute check from legibility\SPEC.md section 7: check ..\OBS\Processed\index.json for sessions filed since the last line of checks.md and read each new one; look at what changed in the project since then (specs, SESSIONS.md, git log, the clock); read the titles in ..\website\content\feed.json so nothing goes up twice; post anything a follower should know (one BUILD S-D9-B<n> at a time, only after the last one is BUILT); log the check in checks.md and commit legibility\. If nothing changed, end the turn straight away." The old loop is cron `ea3b62dc` in session 3020a577; the old session deletes it before stopping.

Then read: `CLAUDE.md`, `SPEC.md` (§7 top block: reset rules, one-sitting rule; §9: newest decisions first), `..\answer-desk\ASKING.md` (reset rules at the top), `posted.md`, the last ten lines of `checks.md`, and this file to the end.

## Where things stand

- **Posts:** P1 to P10 live. P10 "The day so far" (first summary post, `"summary": true`) went live at 18:25 (website e07350a). **Next post due by 20:25** (two-hour floor). Next id: P11, sent as `BUILD S-D9-B11`. Nothing in flight with `website`.
- **Filed sessions covered:** S01 to S11 (posted.md "Sessions covered"). **S12 (17:34 to 18:19) was filed at about 18:47 and is not yet covered.** A subagent read it: its notes are in `local\clip-index\S12.md` (post material ranked, 18 clip-index rows S12-a to S12-r, all webcam, left out). Its top moments: "the story of day one" (17:55; C16 and DoD-24 followed within minutes), "one terminal operation" (17:40), "built for one sitting" (17:48), "making numbers go up" (18:03). D12 Agent view came from a chat request at about 18:30, not from S12. S12-f (hosting the company's podcast) is flagged: it's his pitch, so leave it to him. **P11 comes from it** (invoke `marketing:draft-content` first; draft in the feed Doc; then `posts\P11.md`; then `BUILD S-D9-B11`). Add the S12 row to posted.md's "Sessions covered" and its rows to `clip-index.md`. S13 has been recording since 18:25.
- **YouTube:** website uploaded full webcam videos for S03, S04, S05, S07 and S09 (ids in `..\website\content\videos.json`); S10 and S12 are still uploading. Posts can now link moments in those sessions ("from 2:45 into the video").
- **How posts read now (Alex, 17:5x):** for a reader going through the feed in one sitting: fewer, denser posts, about one build every two hours, and a summary post (`"summary": true` plus a one-sentence `summary_line`) at each milestone. The carousel at the top shows the summaries; s11, s08, s06 and s02 are tagged.
- **Time format (Alex, 18:3x; website's format, 18:24):** Prague time only. Quote sources read "Alex, S04, 12:24" (session plus Prague clock time); written answers "Alex, written answer, 17:23". A video position only as "from 2:45 into the video". Never an offset next to a clock time.
- **Copy:** invoke `marketing:draft-content` before each post. Draft posts in the running Doc "Feed posts from the build" (https://claude.ai/artifact/CZvgGu1jYK2jQGYuZqFSNL, doc 5dad67d6-35e5-4726-bf25-5f0964db0209, body node 0d17f38e-191a), newest on top, then `posts\P<n>.md`, then BUILD. Nothing waits on Alex; his comment becomes an edit build.

## The day-one story (DoD-24) — waiting on Alex's comment

- File: `article\day-one.md` (POST-FORMAT v1.5, `kind: "showcase"`, `deliverable: "d9"`, validated 0 fail, 0 warn).
- Doc for his last 10%: https://claude.ai/artifact/Qs2nBb9ienSKxRe7nthJ3c (doc c13e795a-41ab-4f3a-a48a-80f9a7f6558b, body node 25871391-05a2). TASK sent; the desk showed it at 18:15. Two `[Alex: …]` notes (proudest afternoon moment; closing line).
- **When he comments:** read the Doc back into `article\day-one.md` (his words win; remove the notes he filled), set `status: "published"` only if the format allows for a showcase (check validate.py), validate, then `BUILD S-D9-B<n>` to `website`: a new /demos entry from `legibility\article\day-one.md`. Then `TASK DONE S-D9: the day-one story` to `answer-desk`.
- **Clip swaps pending in the article** (do them when the batch ids come back): `pyFHE1JHMV8` → batch id 12 (`day1-2-too-much-at-once-v2`); `FMYWlkGWdeY` → batch id 11 (`day1-5-bottleneck-human-v2`); `MyYnFOQCagc 240 277` → batch id 13 (`c-s08-same-thing-tomorrow`, no start or end; the old start fell inside a line that stays out). Update the Doc's clip links to match.
- **Poll both Docs for Alex's comments** (orchestration's rule after a handoff, 17:42: comments reach the session that made the Doc, which is the old one). Each check: `read( ref = {"object":"project","id":"<doc id>"} )` once, then read the body with `{"kind":"view","sinceRev":<bookmark>}`, and list comment threads with `query( object = "utterance", container = {"kind":"project","id":"<doc id>"}, payload = {"under":{"object":"node","id":"<body id>"}} )`. Bookmarks at handoff: article Doc rev 12, feed Doc rev 18. Load the docs skill (`anthropic-skills:docs`) and the deferred Docs tools (`read`, `query`, `create`) first.

## The clip index and the batch

- `clip-index.md` (public, committed 0421158): every clip-worthy moment in S01 to S11, classified. Path sent to `orchestration` for Alex's tracker. The partial indexes with private details are in git-ignored `local\clip-index\`.
- **15 clips cut** in `clips\` (git-ignored) from `local\clip-index\cuts.json` with `tools\cut_batch.py`: 12 new, 2 replacements (`day1-2-…-v2`, `day1-5-…-v2`), 1 S08 recut. Two are **screen cuts, held** for Alex's OK (`c-s05-deletion-live`, `c-s07-answer-desk`); his rule is webcam only on the site, and orchestration relays his answer.
- **Frame check: done, all 15 PASS** (~18:55). Flags for Alex, relayed through orchestration: a swear in held `c-s05-deletion-live` at 8.8 to 9.4 s (bleep or keep); an optional blur of a local pipe id in held `c-s07-answer-desk` (7.5 to 8.5 s and 17.5 to 20.5 s).
- **Upload batch: sent** to `website` at ~18:55, the 13 webcam clips in this order: 1 c-s03-noon-low-leverage, 2 c-s04-legibility-born, 3 c-s04-worth-starting-over, 4 c-s07-done-means-additions, 5 c-s07-making-decisions, 6 c-s09-assistant-can-do, 7 c-s10-managed-service, 8 c-s10-gtm-engineers, 9 c-s10-36-workflows, 10 c-s10-halt, 11 day1-5-bottleneck-human-v2, 12 day1-2-too-much-at-once-v2, 13 c-s08-same-thing-tomorrow. `website` handed off at ~19:00; **its successor sends the 13 ids back in that order** after its webcam backlog. Then record each id in `clip-index.md` (status `cut`, id) and swap them into the articles (below).
- **Orchestration** has the index path and the held-screen-cuts question (re-sent at 18:5x after its own 18:47 handoff). Its new session's address: `orchestration` (pipe cc-msg-f5446a9c…).

## "How content gets picked" (orchestration, 18:2x)

- **Written and committed** (486e9d8): `article\how-content-gets-picked.md`, a GTM demos entry (`kind: "showcase"`, `deliverable: "d9"`, POST-FORMAT v1.5), 1,166 words, validator 0 fail 0 warn, lint 0, content-creation then brand-review applied. Every number is sourced (posted.md, clip-index.md, SPEC §7, local\article\arc-backstage.md §3). Two `[Alex: …]` notes. Clip slots to swap when the ids arrive: `PENDING0001` → batch id 2 (c-s04-legibility-born); `PENDING0002` → batch id 4 (c-s07-done-means-additions); `FMYWlkGWdeY` → batch id 11 (day1-5-bottleneck-human-v2). It says "the first eleven recordings": update to twelve once S12 is covered.
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

## Added at 18:58, after the successor launched: orchestration's ROUTING (18:56, Alex)

- **Orchestration is now three sessions.** `orchestration` is the master (handoffs, roster, context, charter); Alex no longer talks to it. `orch-site-map` (`site-map\`) owns the site's layout and the scope map. `orch-alex-prep` (`alex-prep\`) owns everything that needs Alex, and `Open tasks.md`. Send status that matters to Alex to `orch-alex-prep`. Questions still go to `answer-desk`.
- **New work, brief coming from `orch-alex-prep`:** Alex wants to rapid-fire grade the clip index (yes, maybe or no on all 106 moments). Then the top 30 go into Notion with his notes, and his grades are used to induce and blind-test a clip rubric, the way the LinkedIn posts were (`..\linkedin-content\demo\method.md`). That becomes the substance of the "How content gets picked" entry, so hold its BUILD for it. You build the grading page and run the rubric; fan it out to subagents. Hand off under your own name at 50% context.
- **The screen-clips yes or no** (`c-s05-deletion-live`, `c-s07-answer-desk`) now comes from `orch-alex-prep`, not orchestration.
