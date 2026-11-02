# legibility: status
As of 20:03, 2 Nov (Prague), written from the folder's own records after the 19:4x crash.

## Where it fits in the plan

**Deliverable:** D9, the legibility analyzer (spec row S-D9, session `s-d9-legibility`, now down). D9 also covers the long-form "day one" story. This folder also holds the "How content gets picked" entry (a d9 showcase) and the clip-grading work, which started at 18:56.

**DoD items it claims:**

| DoD | What it asks, in one line | State | Evidence |
| --- | --- | --- | --- |
| DoD-13 (with S-D3) | Both GetSales demo entries are on the site, each a video clipped from the rig with a transcript summary. | not met | Alex hasn't recorded either demo yet. `CLIP S-D3-C1` and `S-D3-C2` are still open (HANDOFF.md). No clip has been cut. |
| DoD-19 (with S-D8) | The site shows every deliverable and its status, and kept getting clearer through build requests, not only when Alex asked. | met on its check, stalled since 18:25 | The feed's `status` post is the deliverables view (last `at` 18:45 in `website\content\feed.json`). In `posted.md`, P1 to P10 were each sent as a build request and BUILT. No S-D9 build has gone out since P10 at 18:25. |
| DoD-20 | Every filed rig session was reviewed, with a post at least every two hours while sessions were being filed. | partly | `posted.md` "Sessions covered" runs from S01 to S11. S12 (17:34 to 18:19), S13 (18:25 to 18:52) and S14 (19:01 to 19:09) are filed in `OBS\Processed\index.json` and not covered. The longest gap so far is 85 minutes (P5 at 15:14 to P6 at 16:39). The last post went live at 18:25, so the two-hour limit passes at 20:25. |
| DoD-22 (with S-D8) | Nothing published shows secrets, the Apify proposal, or Alex's own GetSales outbound outside the demo folder. | partly | All 15 batch clips passed a frame check (964175f, da0a0f4), and so did the 4 day-one clips (43f5acd, 90 frames). `do-not-post.md` is empty: no takedowns. But the publish check that SPEC §7 step 8 calls for at each fork is not logged anywhere in `checks.md`. |
| DoD-24 | A long-form day-one story, built from the transcripts with clips between its sections, is live in the GTM demos list. | not met | `article\day-one.md` is near-final and validated (0 fail, 0 warn), and it's in its Doc. It's waiting on Alex's two notes. No BUILD has been sent, and it isn't in `website\content\demos\`. |

It also serves two items: DoD-18 (role tags per moment in `posted.md`, for the stakeholder pages) and DoD-21 (`CLIP S-D10-C1` for the Canva video, still open).

**Depends on:**
- the rig's filed sessions (`OBS\Processed\`, owned by `rig`);
- `website` (S-D8), for every build and every YouTube upload;
- Alex, for the article notes, the grades and the screen-clip call;
- `s-d3-getsales` and `s-d10-canva-video`, whose recordings its clips come from;
- `orch-alex-prep`, for the Notion step.

**What depends on it:**
- S-D8 gets the feed posts and two /demos entries from it.
- S-D3 needs its clips for DoD-13, and S-D10 needs one for DoD-21.
- The stakeholder pages take the role-tagged moments (DoD-18).

## What it was trying to do

It kept the site telling the story of the build without Alex having to ask. Every 30 minutes it read what the rig had filed and what had changed in the project. It picked what a follower or an Addvery stakeholder should see, wrote it as a post, and asked `website` to put it up. Alex: "done = that I just build and work, and the website gets additions ... I want it to proactively keep updating the website to show as much as possible to people following along without me explicitly saying so."

It also cut clips for any spec that asked, and turned the day's transcripts into a long-form day-one story with clips between its sections. From 18:56 it was building a blind grading page for every indexed moment. Alex: "a surface area where I could rapid-fire grade them ... then have the top 30 go to Notion". His grades would then train a clip rubric and test it blind, and that would become the substance of "How content gets picked".

## What's been made

| Item | Where | State |
| --- | --- | --- |
| P1 "What's being built today" (the `status` post, the deliverables view) | `posts\P1.md`; feed id `status` | live (13:50, website e07e790) |
| P2 "The story so far" (S01 to S06 timeline, the 13:20 deletion and recovery) | `posts\P2.md`; feed ids s01 to s06 | live (13:55, 0f7cc51) |
| P3 two milestones (definition of done, first research lists) | `posts\P3.md` | live (14:20) |
| P4 S07 control room, API keys off camera, every demo has a plan | `posts\P4.md` | live (14:55, 9314fec) |
| P5 the research is in; agents hand over | `posts\P5.md` | live (15:14, 52bdee5) |
| P6 S09's three calls; Alex's research lands | `posts\P6.md` | live (16:39, dd61531) |
| P7 every demo has an agent; three calls | `posts\P7.md` | live (16:49, 9a86a97) |
| P8 the 16:44 reset; "the bottleneck is always human" | `posts\P8.md` | live (17:25, 4107ed0) |
| P9 the site's shape; the 36 workflows built | `posts\P9.md` | live (17:46, 3306478) |
| P10 "The day so far" (first summary post, carousel) | `posts\P10.md`; feed id `day-so-far` | live (18:25, e07350a) |
| P11, from S12 and S13 | not written | planned only |
| The live feed | https://hire-me-hackathon.vercel.app (feed home) | live |
| Feed Doc "Feed posts from the build" (drafts from P8 on) | https://claude.ai/artifact/CZvgGu1jYK2jQGYuZqFSNL | done (rev 18 at 19:00) |
| `posted.md`: posts, sessions covered, role tags, left out | `legibility\posted.md` | half-done (stops at S11) |
| `checks.md`: one line per check | `legibility\checks.md` | done to 19:00 (40 lines) |
| `do-not-post.md`: takedowns | `legibility\do-not-post.md` | done (empty, none asked) |
| Clip index, S01 to S11: 109 rows (106 S-ids plus day1-2, day1-3, day1-5), classed, scored, timed | `legibility\clip-index.md` (0421158) | done for S01 to S11 |
| S12 and S13 index notes | `legibility\local\clip-index\S12.md`, `S13.md` (git-ignored) | draft (not in `clip-index.md`) |
| S14 (19:01 to 19:09) | nothing | not read |
| 4 day-one clips (movie actor, too much at once, closed every session, bottleneck) | `legibility\clips\` (git-ignored); YouTube 6Ynpp621fmY, pyFHE1JHMV8, S2NTaJHUmTM, FMYWlkGWdeY | done (uploaded unlisted) |
| 11 batch webcam clips (c-s03-noon-low-leverage to c-s10-halt, plus day1-5-bottleneck-human-v2) | `legibility\clips\`; ids in `website\content\clips.json` | done (uploaded unlisted, not yet on any page) |
| 2 batch webcam clips: day1-2-too-much-at-once-v2, c-s08-same-thing-tomorrow | `legibility\clips\` | half-done (cut and checked; the crash cut the upload short) |
| 2 screen cuts, held: c-s05-deletion-live, c-s07-answer-desk | `legibility\clips\` | done (cut and checked), held for Alex |
| `clips\` folder total | 19 mp4, 151 MB (175 MB with frame folders and contact sheets) | done |
| Clip transcripts, one per clip | `legibility\clip-transcripts\` (19 files) | done |
| Day-one story, "Day one: what broke, what worked and what I'd keep" (1,418 words, 6 clips) | `legibility\article\day-one.md`; Doc https://claude.ai/artifact/Qs2nBb9ienSKxRe7nthJ3c | draft (near-final, validated; 2 notes for Alex) |
| "How content gets picked" (1,352 words) | `legibility\article\how-content-gets-picked.md` (486e9d8) | draft (near-final, validated; 2 notes for Alex; BUILD held for the rubric) |
| "How content gets picked" review artifact | none yet | planned only |
| Grading page: blind, Y/M/N, notes, undo, 1x to 2x, a "/pause the rig" card before the screen moments | `legibility\grading\index.html` (510d3df) | done (API tested at 19:11) |
| Grading server: localhost:8765, append-only `grades.jsonl`, sends only order, id, time, group and clip | `legibility\grading\server.py` | done |
| Grading launcher | `legibility\grading\launch.ps1` | done |
| Grading set: 127 moments (114 webcam, then 13 screen; S01 to S12) | `legibility\grading\moments.json` (tracked) | done |
| Grading clips: 480p, exact index range, no padding | `legibility\grading\clips\` (git-ignored), 126 files, 156 MB | half-done (S09-h2 failed to cut) |
| Alex's grades | `legibility\grading\grades.jsonl` | planned only (file doesn't exist: no grades yet) |
| Top 30 for Notion | `legibility\grading\make_top.py` writes `top.json` | done (tool), not run |
| Seeded 30% hold-out, made before any rubric | `legibility\grading\split.py` writes `split.json` | done (tool), not run |
| Grades replay helper | `legibility\grading\grades_lib.py` | done |
| Test grades and cut log | `legibility\grading\_test_grades.jsonl`, `_cut.log` | done |
| Top 30 in Notion with Alex's notes | Notion (orch-alex-prep's step) | planned only |
| Clip rubric, induced from his grades and tested blind | to follow `..\linkedin-content\demo\method.md` | planned only |
| Clip cutter: webcam or screen, 3 s pad, frames every 2 s, transcript, blur | `legibility\tools\cut_clip.py` | done |
| Batch cutter with contact sheets | `legibility\tools\cut_batch.py` | done |
| Grading-set builder | `legibility\tools\cut_grading.py` | done |
| `CLIP S-D3-C1` and `S-D3-C2` (GetSales demos 1 and 2) | waits on Alex's recordings | planned only |
| `CLIP S-D10-C1` (the Canva scene) | waits on Alex's recording | planned only |
| Spec, decision log, handoff, folder rules | `legibility\SPEC.md`, `HANDOFF.md`, `CLAUDE.md` | done |

## How far along

About 60%. The feed (P1 to P10), the clip index and the cuts for S01 to S11 are done. Both long-form entries are near-final, and the grading page is built. But DoD-19 is the only claimed item met. S12 to S14 aren't covered, nobody has graded yet, and the rubric and the D3 and D10 clips haven't started.

**"Done" here means:**
- every filed session has a row in `posted.md`, with no gap between posts over two hours;
- the day-one story and "How content gets picked" are live in /demos, with their clips;
- the rubric demo has run on Alex's grades;
- the two GetSales clips and the Canva clip are cut and handed over;
- a publish check is logged in `checks.md`.

## What's left for Alex

1. **Finish the day-one story** (attended copy). It needs two notes in the Doc: your proudest afternoon moment, and a closing line. Then comment. https://claude.ai/artifact/Qs2nBb9ienSKxRe7nthJ3c. About 10 minutes (an estimate; the records give none). This unlocks DoD-24.
2. **Write the feed post for S12 to S14, P11** (attended copy), in the feed Doc https://claude.ai/artifact/CZvgGu1jYK2jQGYuZqFSNL. The S12 moment about hosting the company's podcast was left for you to decide. About 10 to 15 minutes (an estimate). DoD-20's two-hour limit passes at 20:25.
3. **Say yes or no to the two screen clips** (quick, about 10 seconds, in chat). `legibility\clips\c-s05-deletion-live.mp4` has a swear at 8.8 to 9.4 s: bleep or keep. `legibility\clips\c-s07-answer-desk.mp4` has an optional blur of a local pipe id at 7.5 to 8.5 s and 17.5 to 20.5 s.
4. **Grade the clip moments** (recording: the records say the grading session goes on the rig as demo footage). Start it with `& "C:\Users\alder\Desktop\Hire me hackaton\legibility\grading\launch.ps1"`, which opens http://127.0.0.1:8765/.
   - The keys are Y, M and N; T for a note, U to undo, S for speed.
   - The 114 webcam moments come first. A card then asks you to type /pause on the rig before the 13 screen moments.
   - S09-h2 has no clip yet: press K to skip it.
   - About 35 to 45 minutes at 2x (Open tasks' estimate, made for 124 moments; the set now has 127).
5. **Notion** (quick, then attended copy). Approve the Notion sign-in once, about 1 minute. Then add your notes to the top 30. The records give no time for the notes.
6. **Finish "How content gets picked"** (attended copy). Two notes: how it felt to see posts you never asked for, and your closing ask to a team with recorded calls. Then review the rendered entry once the rubric results are in. It's in `legibility\article\how-content-gets-picked.md`, with no Doc yet. About 10 minutes (an estimate).

Not this folder's tasks, but its clips wait on them: the two GetSales recordings (`getsales\`) and the Canva recording (`canva-video\`).

## What's left for an assistant

1. **Cut the one missing grading clip** before Alex grades: `python -I legibility\tools\cut_grading.py --only S09-h2`. `grading\_cut.log` logs the failure with no reason.
2. **Finish the clip upload.** `website` uploads #12 `day1-2-too-much-at-once-v2` and #13 `c-s08-same-thing-tomorrow`. The steps are in `website\HANDOFF.md` ("S-D9 clip batch"), and the tool is `website\scripts\upload_clip.py`. The batch script lived in a session's temp folder, so it may be gone.
3. **Record the clip ids in `clip-index.md`:**
   - status `cut`, with its id, for the 11 in `website\content\clips.json`;
   - add `c-s08-same-thing-tomorrow` to "In this batch";
   - mark S07, S09 and S10 as on YouTube (`website\content\videos.json` now has their ids).
   This is described in HANDOFF.md, "The clip index and the batch".
4. **Swap the clip ids into the articles,** then update the Doc's links and run `blog-pipeline\scripts\validate.py` again. This is described in HANDOFF.md.
   - In `how-content-gets-picked.md`: `PENDING0001` becomes d4vSBeoVRg4, `PENDING0002` becomes idojGfe0sJQ, and `FMYWlkGWdeY` becomes 0_OKP-0C6Xk.
   - In `day-one.md`: `FMYWlkGWdeY` becomes 0_OKP-0C6Xk now. `pyFHE1JHMV8` and `MyYnFOQCagc 240 277` change once #12 and #13 are uploaded.
5. **Bring S12 to S14 into the records.**
   - Fold the S12 and S13 notes from `local\clip-index\` into `clip-index.md`, in its public wording.
   - Have a subagent read S14.
   - Add all three sessions to "Sessions covered" in `posted.md`.
   This is described in HANDOFF.md ("Where things stand") and SPEC §7 step 4.
6. **Update the counts in "How content gets picked"** ("the first eleven recordings", "109 clip-worthy moments") once S12 onwards are indexed (HANDOFF.md).
7. **Run the rubric demo after Alex has graded,** following `..\linkedin-content\demo\method.md`. No tool for the rubric or the judge exists yet. This is described in the `split.py` docstring and HANDOFF.md ("Added at 18:58").
   - Run `python -I legibility\grading\make_top.py` to get `top.json` for Notion.
   - Run `python -I legibility\grading\split.py`, and commit `split.json` before any rubric exists.
   - Induce the rubric from the train side, and have a blind judge score the hold-out.
8. **Publish the day-one story after Alex's notes.** Read the Doc back into `day-one.md`, validate it, and build the /demos entry (HANDOFF.md, "The day-one story").
9. **Get "How content gets picked" to the site:** a rendered review artifact (load `artifact-design` first), then the build (HANDOFF.md).
10. **Run the DoD-22 publish check** from SPEC §7 step 8: re-read every live post and clip against the never-post rules, and log the check in `checks.md`.
11. **Cut `CLIP S-D3-C1`, `S-D3-C2` and `S-D10-C1`** once Alex records and the sessions are filed. Use `python -I legibility\tools\cut_clip.py <Sxx> <start> <end> <name> [--pad 3] [--screen] [--blur FROM:TO]`, with a transcript in `clip-transcripts\` and a frame check (for S-D3, nothing outside the demo folder). This is described in HANDOFF.md, "Open clip requests".

## Open questions and risks

- **The session is down.** Its 30-minute loop (cron c3fb0f89) died with it, so there have been no checks since 19:00. `website\content\deliverables.json` still tells visitors D9 is "already running".
- **DoD-20's floor.** The last post went live at 18:25, and three sessions are uncovered. Unless a post goes live by 20:25, the gap passes two hours. It's unclear whether the floor still applies once nothing is filing.
- **Copy rule change.** The 17:25 decision in SPEC §9 ("nothing waits on Alex") lets feed posts go out unattended. Since 19:58, copy happens with him, so P11 onwards waits on him.
- **The upload was half-done at the crash.** 11 of the 13 webcam clips landed in `website\content\clips.json`, which `website` committed at 19:50 as work in progress. The ids were never sent back here, and `clip-index.md` still says `to cut`.
- **The grading page is ready, but the records disagree.** The page, server and clips were built by 19:12 and tested at 19:11. `Open tasks.md` still says "NOT READY YET (about 19:45)", and it's unclear whether Alex was told. The page expects the rig to record and Alex to type /pause before the screen moments. The `rig` session is down too, so it's unclear who runs /pause.
- **The grading clips weren't checked one by one.** The records show only 4 spot stills (`grading\_check\`, git-ignored). The clips play the exact index range with no padding. The index's inward hard edges are what keep excluded words off the recording.
- **The moment counts disagree:**
  - "106" in `Open tasks.md` and HANDOFF;
  - 109 rows in `clip-index.md` (106 S-ids plus 3 day1 rows), also "109" in "How content gets picked";
  - "124" for the grading set in SPEC §9 and `Open tasks.md`;
  - 127 in `moments.json` and `_cut.log` (109 plus S12's 18).
- **The batch list disagrees.** HANDOFF says 15 clips were cut. The "In this batch" list in `clip-index.md` names 14 and leaves out `c-s08-same-thing-tomorrow`.
- **The YouTube notes are stale.** `clip-index.md` says S07, S09 and S10 are not on YouTube, but `website\content\videos.json` now has full webcam videos for S07, S09, S10 and S12.
- **Doc comments may be unseen.** Comments reach the session that made the Doc, and that session is down. The bookmarks at 19:00 were article rev 12 and feed rev 18. It's unclear whether Alex has commented since.
- **"How content gets picked" waits on the rubric.** Its build is held for the rubric results (HANDOFF.md, 18:58), so it can't go live until Alex grades and the rubric runs. The Notion step was `orch-alex-prep`'s, and that session is down.
- **The SPEC contradicts itself.** §1 and parts of §7 still describe the old D3 live-run clip and its gates. The 17:13 reset rules at the top of §7 and the decisions in §9 override them.
- **S12's notes are now public.** `moments.json` is tracked, so S12's 18 rows from the git-ignored notes are public. A keyword scan found only hard-edge notes, such as "Hard end: outreach follows". Nothing that DoD-22 bars is shown.
- **Some times ran ahead of the clock.** The HANDOFF title says "19:0x", but its commit is at 18:56. This file uses commit times where they differ.

## Sources

- `legibility\`: `CLAUDE.md`, `SPEC.md` (with §9), `HANDOFF.md`, `posted.md`, `checks.md` (last 15 lines), `do-not-post.md`, `clip-index.md`, `.gitignore`.
- `legibility\article\`: `day-one.md`, `how-content-gets-picked.md` (front matter, notes, clip slots).
- `legibility\grading\`: `index.html` (skimmed), `server.py`, `make_top.py`, `split.py`, `launch.ps1`, `grades_lib.py`, `moments.json`, `_cut.log`, `_test_grades.jsonl`, plus counts of `clips\` and `_check\`. `grades.jsonl` is absent.
- `legibility\tools\`: the headers of `cut_clip.py`, `cut_batch.py` and `cut_grading.py`.
- `legibility\posts\`, `legibility\clips\` and `legibility\clip-transcripts\`: file counts and sizes.
- `CHARTER.md`: the D9 row; DoD-13, 19, 20, 22 and 24; the spec outline; the run order.
- `OBS\Processed\index.json`: S01 to S14 filed.
- `website\content\`: `feed.json`, `clips.json`, `videos.json`, `deliverables.json` (the d9 row). Also `website\HANDOFF.md` (the clip batch).
- `Open tasks.md`: status only.
- Commits:
  - the latest five: 510d3df (19:50), 0c11635 (19:01), 126c8b3 (18:57), 1c31a91 (18:56), f4cd016 (18:55);
  - others: 486e9d8, da0a0f4, 964175f, 0421158, 43f5acd, e3e8b9f;
  - and `git log --oneline -60 -- legibility`.
