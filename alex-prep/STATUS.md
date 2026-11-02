# alex-prep: status
As of 20:03, 2 Nov (Prague), written from the folder's own records after the 19:4x crash.

## Where it fits in the plan

- **Role, not a deliverable.** `orch-alex-prep` was a sub-orchestrator. Alex set it up at about 18:56 to fill every box that needs him. It isn't in the charter, and its roster row says so (`SESSIONS.md`). It ran from 18:56 until the crash at about 19:45. Its last commit was at 19:08, and the last record of it is the 19:09 briefing snapshot.
- **What it serves.** Charter P3 and P4, and the "Operator scenes to shoot today" in the Run order. In DoD terms:
  - DoD-12 and DoD-13: the two GetSales recordings (D3)
  - DoD-15: the last 10% of each article (D5)
  - DoD-16 and DoD-17: the brand sign-offs (D6, D7)
  - DoD-18: the six stakeholder page reviews (D8)
  - DoD-20 and DoD-24: the clip grading and the day-one story (D9)
  - DoD-21: the Canva video (D10)
  - DoD-23: the Comfy pick (D11)
  - DoD-22: screen care on every recording
- **Who it worked with.**
  - `s-d3-getsales`, `s-d9-legibility`, `s-d10-canva-video`, `s-d6-canva-templates`, `s-d7-linkedin-content`, `s-d5-blog-articles`, `s1-research`, `website`, `rig` and `answer-desk`
  - `orch-site-map` sent it `BLUE` lines
  - `orch-briefing` read its ranked "Waiting on you" list

## What it was trying to do

Alex gave it the job in these words: "The one that kind of fills in those boxes, right? You're going to be the one that's going to help prep me for setting up the video for GitSales." For each item it was to get the scene brief ready, say what stays off screen, list the exact steps and rig commands, say who does what afterwards, and then put it in front of him one at a time. It also owned his tracker, `Open tasks.md`, under his rule "if I ask you to do something and it doesn't show up there, you missed it somehow". Its first job was his 18:55 request for the clip grading: "find me a surface area where I could rapid-fire grade them, look at them real quick, give a no, maybe, or yes, and then have the top 30 go to Notion, where I can put notes in." It was then to work through his waiting items, most valuable first. The deadline was the morning: the six pages had to be approved before he sends the connection notes ahead of tomorrow's meeting with Ivana.

## What's been made

| Item | Where | State |
| --- | --- | --- |
| Clip-grading brief, sent to `s-d9-legibility` | `legibility\checks.md` (19:00 row), `legibility\SPEC.md` §9 (19:00 row) | Sent and taken up by 19:00. Legibility built the page in `legibility\grading\`, committed in 510d3df at 19:50 after the crash. `moments.json` holds 127 moments; the records say 124. `_cut.log`: 126 cut, 1 failed (S09-h2, a screen moment). There are 3 test grades and no real ones. |
| Five clip-grading calls | `alex-prep\DECISIONS.md` (commit ba0e9bc, 18:58; the rows say 19:00 because the clock ran ahead) | Done. The screen moments go last, behind a card telling Alex to `/pause` the rig. The moments play blind, in index order. Notion gets every Yes, then Maybes by score, up to 30. S12 is included. A 30% hold-out is committed before any rubric is induced. |
| Scene card, GetSales demos 1 and 2 | `alex-prep\scenes\getsales-demos.md` (c423d66 19:02, 5c34c13 19:08) | Ready. It covers what stays off screen, the four tabs in order, the beat timings (hold still for 3 to 4 seconds at beat 3), the terminal setup for demo 2, the rig steps and what happens after. Its rig step 1 ("S14 since 19:01") is stale since the crash. |
| Review sign-off protocol, agreed with `website` | `website\HANDOFF.md` ("agreed with orch-alex-prep, ~19:05") | Agreed: it relays "APPROVED <slug>" or "EDITED <slug>"; then `website` sets `landing.approved: true` and deploys. No page had been approved by the crash. |
| "Waiting on you", ranked | `..\Open tasks.md` (git-ignored) | Re-ranked into 24 rows. Its last update was 19:01. The rows tied to its own work: #2 Notion sign-in, #3 the six reviews with three facts, #4 and #5 the GetSales recordings, #12 the clip grading ("NOT READY YET (about 19:45)"), #16 the screen clips. It also added two "In progress" rows for the clip grading and one "Done, maybe not seen" row for the split. Which other rows it moved is unclear: the file is git-ignored, so there's no history. |
| Canva video and Comfy hand-off | `canva-video\HANDOFF.md` (18:58) | `s-d10-canva-video` confirmed it had both Doc links, and knew what it needed back: "filming now", the report and the Comfy pick. |
| Tracking of the three blog-articles items | `blog-articles\HANDOFF.md` ("orch-alex-prep tracks all three for Alex (sent 18:58)") | Tracking only. Nothing was closed. |
| Tracking of the AI portfolio review | `research\HANDOFF.md` | Tracking only. Nothing was closed. |
| Status at 19:09 | `briefing\data\latest.md` | "done/idle: site entries built for both demos; demo 1 card tip added". The "site entries" are `s-d3-getsales`'s pre-built entries. |
| Notion connector and the top-30 database | — | Not set up. The sign-in waits on Alex (#2). |
| Scene card for the clip-grading video | — | Not written. Its CLAUDE.md asked for it: "Prep that scene". |
| `alex-prep\HANDOFF.md` | — | None. |

## How far along

About 20%. It prepped the two GetSales recordings, and it got the clip-grading page built through `s-d9-legibility`. But none of the 24 items waiting on Alex was closed before the crash.

## What's left for Alex

These are the "Waiting on you" rows of `Open tasks.md` in its order (most valuable first), with private details left out. Since the crash, items 1 and 2 matter less: there's no overnight plan to work back from, and Notion only matters at the end of the clip grading.

1. **Give the time of tomorrow's meeting with Ivana** (quick), in chat. About 10 seconds.
2. **Approve the Notion sign-in once** (quick), for the clip grading's top 30. Sign up free in the same flow if he has no account. The old link died with the session, so an assistant has to open a new one. About 1 minute.
3. **Review the six stakeholder pages, Ivana's first** (attended copy). Each one is the real page as it will look live, and each sign-off puts that page live. Three facts also need confirming: "nine months doing nothing but building with Claude Code" (Štěpán), "freelanced for ten years" (Lukáš), and "came up through B2B marketing" (David). 3 to 5 minutes a page, so about 20 to 30 minutes in all. **This must be done before the morning.** The pages:
   - Ivana: https://claude.ai/artifact/TCk45ox4gttBgNiyYVRA7r
   - Štěpán: https://claude.ai/artifact/EWewUdWbqYurU99uH3zM77
   - Pavel: https://claude.ai/artifact/Y542BkTDNhC4fYNVxeMnwn
   - Lukáš: https://claude.ai/artifact/Uey12LMZ8mTNW2QNHiShx6
   - Miloš: https://claude.ai/artifact/2zQSocRf8xTBxx291oQd3h
   - David: https://claude.ai/artifact/PX2aWLB8ws6QfAGDf3GGmi
4. **Record GetSales demo 1** (recording): classification tools, the 36 workflows and the one variable. About 3 minutes on camera. Setup is in `alex-prep\scenes\getsales-demos.md`; the beats are in https://claude.ai/artifact/83CBecbQdNyH3NZi2MLYDq. Demos 1 and 2 take about 10 minutes together.
5. **Record GetSales demo 2** (recording): the terminal run that sorts twelve leads into ICPs. About 1 minute. Its beats are in https://claude.ai/artifact/XipRZaxFuESjKrTW3qoKmB, with the same card.
6. **Article 1, "AI workflows are always a managed service": the last 10%** (attended copy). Five bold notes, then the comment "approved", on https://claude.ai/artifact/6dbQjnECpGbtQw54cHhJMp. About 10 minutes.
7. **Article 2, "If AI won't replace half your team, put it in your pipeline": the last 10%** (attended copy). Five bold notes, then "approved", on https://claude.ai/artifact/17rFReWZZesyLe94msLskk. About 10 minutes.
8. **LinkedIn posts brand sign-off** (attended copy): five posts and two carousels, already live as a demo entry. Edit in place, then comment "approve" on https://claude.ai/artifact/A8cmvTCoTfMwd9CQz8u7kj. About 10 minutes.
9. **Canva templates brand sign-off** (attended design). Comment on https://claude.ai/artifact/CFuMcU2Qpxfp1ciRVhJoxX. The records don't give a time.
10. **Record the Canva design video** (recording): one Addvery quote card. About 5 minutes of setup with the rig paused, then 10 to 12 minutes on camera. Follow the brief at https://claude.ai/artifact/PDEnN7CTEGG94QVXkWohCW: comment "filming now" when you start, and a one-line report when you're done.
11. **Pick the Comfy brand-motion ideas** (quick). Comment two numbers on https://claude.ai/artifact/SWcsiYUQpJUkZ18mQA2sWj: one 5-second idea (1 to 4) and one one-minute idea (5 to 7). The recommendation is "1 and 5". About 1 minute.
12. **Grade the clip moments: yes, maybe or no** (recording), then notes on the top 30 in Notion. It's filmed on the rig as demo footage, with the screen moments last, after a `/pause`. About 35 to 45 minutes at 2x. `Open tasks.md` still says "NOT READY YET", but the page now exists on disk (`legibility\grading\launch.ps1` starts it).
13. **Review the AI portfolio story** (attended copy). Five yellow marks only he can settle; comment on https://claude.ai/artifact/McVKMTRVxsW3qa3kFq1Z6J. About 10 minutes.
14. **The day-one story: the last 10%** (attended copy). Two notes, his proudest afternoon moment and a closing line, on https://claude.ai/artifact/Qs2nBb9ienSKxRe7nthJ3c. The records don't give a time.
15. **Review the taste-capture article, "How to refine AI slop into AI ops"** (attended copy). Comment on the rendered page, https://claude.ai/artifact/PkSgwgetjps3sVoNST26ma. The records don't give a time.
16. **Decide whether screen clips may go public after a frame check** (quick): yes or no, about 10 seconds. Two are cut and held. One, `c-s05-deletion-live`, has a swear at about 9 seconds: bleep it or keep it. The other, `c-s07-answer-desk`, is clean.
17. **His two old public repos, outside this project** (quick): "quick fixes", "rewrite both" or "leave them". The details are in `orchestration\HANDOFF.md`, "Alex's open calls".
18. **The scope map** (quick): look and comment any time, at https://claude.ai/artifact/QUtWfgRq4Bcyko4PQNkkVF. See `site-map\STATUS.md`.
19. Optional: re-add any of the three left-out LinkedIn posts (14 May, 19 Oct, 27 Oct) (quick). Name them in chat.
20. Optional: delete the stray private artifact, a half-edited copy of landing page 1, at https://claude.ai/artifact/AW6Ld5n5CKuBHBX7JR3tj2 (quick). Say "delete it".
21. Optional: make a Canva Brand Kit for Addvery's exact fonts (quick): Canva, Brand, Create new Brand Kit.
22. Optional: delete "TEST control 14m30s" in YouTube Studio (quick).
23. Optional: check that Windows Update is paused (quick): Settings, Windows Update.
24. **Tomorrow morning: send the six connection notes by hand** (quick), once the six pages are approved. The texts are in `Open tasks.md`, which is private. A few minutes.
25. From the scene card, optional and off camera: fix one German typo in one demo workflow (quick), about 10 seconds. "Folienätzen" should be "Foliensätzen" in follow-up 1 of "Demo · Consumer lending · DE · problem". The exact place is in `alex-prep\scenes\getsales-demos.md`.

## What's left for an assistant

1. **Get the rig ready before any recording.** The `rig` session died, and `/start`, `/pause` and `/stop` are its skills. Open a Claude Code session in `OBS\`, check what OBS is doing now, and correct rig step 1 of the scene card. It assumes S14 has been running since 19:01.
2. **Before GetSales demo 1, set up the four tabs as the card says.** The README goes at "The path of one lead". The demo folder needs its sidebar collapsed, so no other folder or flow name shows. Then the top workflow's builder, and `sample.csv` scrolled to the `custom_message_1` column. For demo 2, a fresh terminal.
3. **Carry each page sign-off to the live site.** Follow `website`'s protocol (`website\HANDOFF.md`). For an edited page, read the edits back with `website\scripts\review\apply_review_edits.py`. Then set that page's `landing.approved: true`, deploy, and check the page is live.
4. **Get the grading page ready.** Start it with `legibility\grading\launch.ps1`. Re-cut or drop the failed moment S09-h2. Find out why `moments.json` has 127 moments when the records say 124.
5. **Write the clip-grading scene card:** what's on screen, the `/pause` before the screen moments, the rig steps, and what happens after.
6. **After the grading:**
   - Run the 30% hold-out split (`legibility\grading\split.py`) and commit it before any rubric is induced.
   - Build the top 30 (`legibility\grading\make_top.py`).
   - Once Alex approves the sign-in, set up the Notion connector (`mcp__plugin_marketing_notion__authenticate`). Create the database with the columns listed in `alex-prep\CLAUDE.md`, and embed each YouTube moment by its time.
   - The rubric run, induced then blind-judged, follows `linkedin-content\demo\method.md`.
7. **Relay each answer to where it's used.** The screen-clips answer goes to `legibility\`: cut with `tools\cut_clip.py --blur`, or bleep, as he says. The Comfy pick and the Canva "filming now" go to `canva-video\`.
8. **After the GetSales recordings:** cut CLIP S-D3-C1 and S-D3-C2 with their transcripts (`legibility\HANDOFF.md`, "Open clip requests"). Frame-check that nothing outside the demo folder shows. Put the video ids into the pre-built entries. The transcript summaries are copy, so they wait for an attended pass.

## Open questions and risks

- **The records stop at 19:09.** There's no `HANDOFF.md`. What it did between 19:09 and the crash is unclear, including whether Alex saw the GetSales card or the six review links in its chat.
- **The six pages are time-critical.** None of them is approved. They have to be live before the morning connection notes, and the `website` session that deploys each approval is down.
- **The meeting time with Ivana is still unknown.** He was asked twice before 18:56, and it was on his list again.
- **Notion:** no sign-in, and it's unknown whether he has an account. Sessions from S13 on aren't on YouTube yet, so their moments can't be embedded.
- **The grading page runs on this PC only.** It plays local cuts through a local server. It shows 127 moments, not the 124 in the decision log, and one screen cut failed.
- **DoD-22 on the grading video.** The rig records his screen while he grades. The 13 screen moments sit behind a `/pause` card. If he doesn't pause, unchecked screen moments end up on the recording. Separately, the two held screen clips need his call: the swear in one, and an optional blur of a local id in the other (`legibility\HANDOFF.md`).
- **The rig state after the crash is unknown.** The card's rig steps assume S14 is still recording.
- **The copy rule changed at 19:58.** The GetSales transcript summaries, the day-one story's edits and the "How content gets picked" entry were planned as unattended copy. They now need Alex in the loop.
- **`Open tasks.md` is stale in places.** Its "In progress" and "Before the crash" rows describe sessions that are now down. Since 19:58 `orchestration` keeps the file again, not this folder.
- **Open privacy call outside the project:** his two old public repos (item 17).

## Sources

- `alex-prep\CLAUDE.md`, `alex-prep\DECISIONS.md`, `alex-prep\scenes\getsales-demos.md`
- `Open tasks.md` (git-ignored; the connection notes, the repo details and other private items aren't copied)
- `legibility\HANDOFF.md`, `legibility\checks.md` (19:00 row), `legibility\SPEC.md` §9 (19:00 row), `legibility\grading\` (`_cut.log`, `moments.json`, `launch.ps1`, `_test_grades.jsonl`)
- `website\HANDOFF.md`, `canva-video\HANDOFF.md`, `blog-articles\HANDOFF.md`, `research\HANDOFF.md`, `briefing\data\latest.md` (19:09 snapshot), `briefing\data\events.md`
- `CHARTER.md` (Deliverables, Definition of done, Run order), `SESSIONS.md`
- Commits: 5c34c13 (19:08), c423d66 (19:02), ba0e9bc (18:58), 1131191 (19:00), cde2dd8 (18:55), 510d3df (19:50), 3980fcd (19:02); `git log --oneline -30 -- site-map alex-prep "Operator tasks"`
