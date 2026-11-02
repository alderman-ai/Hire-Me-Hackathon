# getsales: status
As of 20:00, 2 Nov (Prague), written from the folder's own records after the 19:4x crash.

## Where it fits in the plan

**Deliverable:** D3, GetSales outbound demo. **Spec row:** S-D3. **Session:** `s-d3-getsales` (last instance 2a7fc2a1), dead since the crash.

| DoD item | What it asks | Status | Evidence |
| --- | --- | --- | --- |
| DoD-12 | 36 workflows (4 ICPs × EN, CS, DE × 3 tactics) in a GetSales folder apart from Alex's own, each opening with a custom first message, nothing sending, no classifier trained | **Met** | `ids.md`: all 36 were created 17:27 to 17:34 in "Hackathon demo · Addvery". Each was read back by id: off, no leads, message 1 = `{{custom_message_1}}` (commit 8840749). The folder screenshot from 19:08 shows six of them, all off, every count 0. One typo is left in #23 (see below). Not re-checked live since then. |
| DoD-13 | Both demo entries are on the site, each a video clipped from the rig with a transcript summary below | **Not met** (the prep is ready) | Neither demo has been recorded: S14 (19:01 to 19:09) isn't a demo, and nothing ties S15 (opened 19:56) to them. No clip, no YouTube id, no BUILD sent. Both entries are pre-built as drafts in `site\` (ffe2951, 18:48). |
| DoD-22 | Nothing published shows secrets, the Apify proposal, or Alex's own GetSales outbound outside the demo folder | **Met so far.** Recheck when the clips are cut. | `live\` is git-ignored, and there's no `.env` or key. Every figure was screen-checked twice (SPEC §9, 19:00 and 19:08). `python -I alert\pipeline.py scan` at 20:00: 40 tracked files, hits in `HANDOFF.md` and `SPEC.md` only. Both hits are the first name the charter already uses, which DoD-22 doesn't cover. |

**Depends on:**
- S-D2, Alex's own research: the ICPs come from Addvery's public site, and the six from his own list.
- The OBS rig, for the two recordings.
- S-D9 (`s-d9-legibility`), to cut the clips.
- S-D8 (`website`), to build the entries.

S1's L-04 was withdrawn, and L-01 was read.

**Feeds:**
- S-D8: the `/d3` page and two `/demos` entries. Stakeholder reading lists on the site already include GetSales items (website `builds.md`, 18:41).
- S-D9: the clips, and the "workflows built" feed post.
- S-D12: the agent view is generated from the site's content, so it picks up the entries once they're built.

## What it was trying to do

1. Build Addvery's outbound in Alex's model: "36 workflows ... 4 main ICPs, 3 different languages (let's say English, Czech, German) ... tactic 1, tactic 2, tactic 3", in a folder he can hide. Each workflow opens with one variable, `custom message 1`, written per lead before import.
2. Explain, without building it, how Jev (TypeSafe's decision model) would route each lead into one workflow: "We're not tooling it up to run. We're not training the classifier agent. We're explaining what all the pieces are".
3. Show it as two blog-style entries, in his words "a video on top and a summary of the transcript at the bottom":
   - Demo 1, about 3 minutes: classification tools, the 36, and the one variable.
   - Demo 2, short: leads classified into ICPs.
4. The first plan, an alert to the six through GetSales, was dropped at 16:44 (A7.1): "I'm going to do this manually. This is not going to happen through automation."
5. Both entries were meant to be live before the meeting with Ivana on 3 Nov.

## What's been made

| Item | Where | State |
| --- | --- | --- |
| GetSales demo folder | "Hackathon demo · Addvery", id in `ids.md` | done |
| 36 demo workflows, all off with no leads | GetSales, "Demo · <ICP> · <LANG> · <tactic>", ids in `ids.md` | done (one typo in #23) |
| Top workflow, opened on camera | "Demo · Retail loyalty · EN · proof" | done |
| Lead custom field `custom_message_1` | GetSales, id in `ids.md` | done |
| Alert flow in GetSales | never created (A7.1) | planned only, retired |
| Workflow ids and read-back record | `getsales\ids.md` | done |
| ICP grid and approach definitions | `icps\grid.md`, `icps\README.md` | done (README's status line is stale) |
| Copy brief | `icps\BRIEF.md` | done |
| Copy for the 4 ICPs, 9 cells each | `icps\retail-loyalty`, `telco-cvm`, `consumer-lending`, `last-mile-logistics` (.md and .json) | done; Czech and German never had a native read |
| All 36 workflow graphs and the builder | `icps\workflows.json`, `icps\build_workflows.py` | done |
| Routing explanation (rules, then Jev, then a person) | `routing\README.md` | done |
| Router script, demo 2's screen | `routing\route.py` (12 of 12 on the sample) | done |
| Fictional 12-lead sample with `custom_message_1` | `routing\sample.csv` | done |
| Alert pipeline and copy (unused since A7.1) | `alert\sequence.md`, `copy.json`, `flow-nodes.json`, `pipeline.py`, `view.py` | done, unused |
| Legitimate-interest balancing test | `alert\balancing-test.md` | draft (still says "through GetSales") |
| Alert stage times, no names | `live-run.md` (to 16:46) | done |
| Local private files: the six's CSV and pipeline view, pre-send drafts, gate copy, request note | `live\` (8 files, git-ignored, this PC only) | done, local only |
| Demo 1 entry, POST-FORMAT v1.5, kind showcase, empty video slot | `site\demo-1.md` | draft |
| Demo 2 entry, same format | `site\demo-2.md` | draft |
| Demo 1 figures: folder, custom field | `site\assets\36-outbound-workflows-and-the-one-variable-behind-them\` (2 PNGs, re-captured 19:08) | done |
| Demo 1 figure: message 1 as the variable | same folder, `message-1-variable.png` (from 18:54) | half-done: placeholder until a still from the recording replaces it |
| Demo 2 figures: router run in three parts, plus the hard cases | `site\assets\sorting-twelve-leads-into-36-workflows-rules-first-then-jev\` (4 PNGs, 18:59) | done |
| Old single-section draft (alert run live) | `site\section.md` | draft, stale (to retire) |
| Privacy notice text | `site\privacy.md`, live as `/privacy` (unlisted, noindex; website B3, B4) | live |
| Site link preview card (asked for by S-D3) | website `app\opengraph-image.png` (B3, B5) | live |
| `/d3` page: description plus "lands here when ready" | https://hire-me-hackathon.vercel.app/d3 (website content) | live |
| Feed post "The outbound demo's 36 workflows are built" | site feed and `/d3` (S-D9-B9) | live |
| Entry words: titles, descriptions, summaries | Claude Doc https://claude.ai/artifact/VHDdVnqYvw43euwRRp5mqC | draft |
| Demo 1 talking points | Claude Doc https://claude.ai/artifact/83CBecbQdNyH3NZi2MLYDq | done |
| Demo 2 talking points | Claude Doc https://claude.ai/artifact/XipRZaxFuESjKrTW3qoKmB | done |
| Copy of all 36, for Alex to skim and edit | Claude Doc https://claude.ai/artifact/Vvapg6BdDS4ToZ2SpaxRH3 | done |
| Scene card for both recordings | `alex-prep\scenes\getsales-demos.md` (orch-alex-prep's) | done (session numbers stale) |
| Desk tasks "demo 1 / demo 2 ready to record" | `answer-desk\queue.md` (17:31, 17:35) | open |
| Rig recordings of the demos | none | planned only |
| YouTube videos | none | planned only |
| Spec, handoff, folder brief | `SPEC.md` (§5 and §9 current), `HANDOFF.md` (17:38), `CLAUDE.md` | done; parts stale |

## How far along

**About 70%.**
- The GetSales build is complete.
- Both entries are pre-built, and 6 of their 7 figures are final.
- What's left is about 10 minutes of recording, then the clip, the summary pass and the build.

"Done" here means both:
- the 36 workflows stay in their folder, off and with no leads (met);
- both entries are live in `/demos`, each with its video and a transcript summary, before the meeting on 3 Nov, with the clips checked against DoD-22.

## What's left for Alex

1. **Record demo 1** (recording). About 3 minutes on camera, plus about 4 minutes of setup with the rig paused.
   - Follow `alex-prep\scenes\getsales-demos.md` and the beats in https://claude.ai/artifact/83CBecbQdNyH3NZi2MLYDq.
   - At about 1:40, hold still on the builder for 3 to 4 seconds. That frame becomes the message 1 figure.
   - Collapse the folder sidebar, so only the demo folder shows.
   - Skip the optional beat on the six.
   - It can run alone with little else open: OBS, the webcam, the rig's Claude Code session, one browser with two GetSales tabs, a Markdown preview and a CSV viewer. No graphics work.
2. **Record demo 2** (recording). About 1 minute on camera, plus 2 minutes of setup.
   - Open a fresh terminal in `getsales\` and run `python -I routing\route.py`.
   - Then `cls` and `python -I routing\route.py L06 L11`.
   - This is the lightest recording on the plan: a terminal and OBS only. Do it in the same sitting as demo 1.
3. **Entry words** (attended copy). About 15 to 20 minutes for both, once the transcripts exist.
   - With an assistant, rewrite each summary against its transcript.
   - Check the titles, descriptions and cover lines. They were drafted unattended at 17:43, in https://claude.ai/artifact/VHDdVnqYvw43euwRRp5mqC, with copies in `site\demo-1.md` and `site\demo-2.md`.
4. **Glance at the cut clips and the message 1 still** (quick). A yes or no each, to confirm none shows his own flows, other folders, leads or inbox.
5. **Fix the typo in workflow #23** (quick). 10 seconds, off camera.
   - Workflow: "Demo · Consumer lending · DE · problem", https://amazing.getsales.io/flow/cff86c0b-0c77-4c51-a03c-d8da83afba70/builder.
   - Follow-up 1 on both branches (nodes #7 and #21) says "Folienätzen". It should be "Foliensätzen".
   - It isn't shown on camera. The local copy is already correct.
6. **Keep or remove `/privacy`** (quick, yes or no). The page was written for the automated alert, and it was meant for his approval at a gate that was withdrawn unticked. It's live and unlisted, and opens with "If you got a LinkedIn message from me about this build".
7. **Close the charter's open question "What is D3's second custom message?"** (quick). The build uses one variable plus fixed follow-ups, so it may be moot. Tell orchestration.
8. **Optional: decide whether the Czech and German copy needs a native read** (quick). Only the workflow names show on camera, and the copy Doc is https://claude.ai/artifact/Vvapg6BdDS4ToZ2SpaxRH3.

## What's left for an assistant

1. **Before recording:** confirm the rig is up after the crash and which session number comes next.
   - S15 sits in `OBS\Live\` at 71 seconds with state "recording".
   - The scene card's S15 and S16 are stale.
   - Described in `alex-prep\scenes\getsales-demos.md`, under "The rig".
2. **After each take:**
   - Process the rig session.
   - Cut each clip to its CLIP spec, and blur the six if their page appears.
   - Frame-check for DoD-22.
   - Get the transcript.
   - Upload unlisted to YouTube through the website's upload flow.

   Described in `HANDOFF.md` "Next" step 2 (the CLIP S-D3-C1 and C2 lines) and `website\CLAUDE.md`. This was `s-d9-legibility`'s and `website`'s work.
3. **Replace `message-1-variable.png`:** take a still from demo 1 at about 1:40, cropped to the title bar and node #6, and screen-check it. Described in the comment at the top of `site\demo-1.md` and in SPEC §9 (19:08).
4. **After Alex's summary pass, update each entry's front matter:**
   - set `kind` to `video`;
   - add `video` (`youtube_id`, `start`);
   - change `status` from `draft`.

   Described in each entry's top comment.
5. **Build:**
   - Copy `site\assets\<slug>\` to `website\public\demos-assets\<slug>\`, and add both entries to the site, demo 1 first in `/demos`.
   - Update `/d3`'s "pending" line in `website\content\deliverables.json`, and the inventory.
   - Deploy, and check that both are live.

   Described in SPEC §9 (19:00 and 19:08) and `HANDOFF.md` step 3. Whether figures get tap-to-zoom on the site is unclear.
6. **Retire `site\section.md`**, which is stale. Described in `HANDOFF.md` step 3.
7. **Check the three Docs** (copy, entry words, talking points) for comments or edits from Alex. Carry any copy edits back into `icps\*.json` and `.md`, then rebuild with `python -I icps\build_workflows.py`. Described in `HANDOFF.md` step 1.
8. **Close:**
   - Read the 36 flows by id from `ids.md`, and check that none is started and none has leads. Never list his flows.
   - Check whether #23's typo is fixed, and update its note in `ids.md`.
   - Rerun `python -I alert\pipeline.py scan`.

   Described in `HANDOFF.md` step 4.
9. **Housekeeping:** bring the stale parts up to date:
   - `SPEC.md`: the status line, §2 (DoD-13 as the alert) and §7;
   - `CLAUDE.md`'s first paragraph (10 ICPs, a classifier, a live run on the six);
   - `icps\README.md` ("skeleton").

   Mark the `s-d3-getsales` row in `SESSIONS.md` as stopped by the crash.

## Open questions and risks

**Deadline**
- **Both entries must be live before the meeting on 3 Nov.** The meeting time isn't recorded yet; `Open tasks.md` still waits on Alex for it.
- **The handoff chain is gone.** The CLIP → CLIPPED → BUILD messages assumed live `s-d9-legibility` and `website` sessions. Every step after recording is now manual.

**Half-done at the crash**
- **Nothing was in flight.** The session went idle at 19:09, waiting on the recordings, and the folder has no uncommitted changes.
- **The message 1 figure:** the re-capture was cut off when the browser tab was closed from outside. Automation in Alex's Chrome was then stopped while he works.

**Two copies of the entry words**
- The Doc was drafted at 17:43 (POST-FORMAT v1.1, kind video). The repo files were pre-built at 18:48 (v1.5, showcase).
- The handoff treats the Doc as the source, read back into the `.md` files. Whether they still match, and whether Alex edited either, is unclear.

**Where the records contradict each other**
- **The typo.** `orchestration\HANDOFF.md` says "demo 1 has one typo he fixes by hand first". The typo is in GetSales workflow #23, not in `demo-1.md`, and it isn't on camera. The scene card and SPEC both call the fix optional.
- **The profile photo.** SPEC §9's 19:00 row says the screenshots show no profile photo. The folder shot re-captured at 19:08 shows Alex's own sender avatar in the Senders column. It's his own photo, so it isn't a DoD-22 issue.
- **Log times.** Some decision-log times run ahead of git:
  - the "17:50" row was committed at 17:43;
  - the "19:00" row was committed at 18:54, after the entries at 18:48.
- **Stale descriptions.** `HANDOFF.md` (17:38) predates the 18:48 to 19:08 work. The SPEC's status line and §2, and `CLAUDE.md`, still describe the alert through GetSales and 10 ICPs.
- **The privacy page and balancing test.** `site\privacy.md` says Alex approves it at the pre-send gate, which was withdrawn unticked. `alert\balancing-test.md` still describes sending through GetSales.
- **A charter edit outside this folder.** The charter's spelling question ("Addvery", "GetSales") is ticked in an uncommitted edit to `CHARTER.md`. SPEC §9 had already logged it.

**Unresolved**
- "What is D3's second custom message?" is still open in the charter.
- The Czech and German copy never had a native read.
- Any change to #23 by API would need Alex's approval on the spot.

**Screen risk**
- Opening GetSales with the folder sidebar expanded would show his other folders.
- The optional six beat (`live\pipeline-view.html`) would need blurring.
- The scene card covers both.

**Load**
- Demo 1 runs OBS, the webcam and a browser together. Keep the other sessions and apps closed while recording.

## Sources

- **This folder:** `getsales\CLAUDE.md`, `SPEC.md` (§1 to §9, decision log to 19:08), `HANDOFF.md`, `ids.md`, `live-run.md`, `.gitignore`, `site\demo-1.md`, `site\demo-2.md`, `site\section.md`, `site\privacy.md`, `routing\README.md`, `icps\README.md`, `icps\grid.md`, the heads of `icps\BRIEF.md`, `alert\sequence.md`, `alert\balancing-test.md`, `alert\pipeline.py` and `routing\sample.csv`, and the three demo 1 figures (viewed).
- **Git:** `git log --oneline -50 -- getsales`, plus times for the last 25 commits. Key commits: fd3031f 19:08, 65bddf9 18:59, 78a8bfb 18:58, 83e0457 18:54, b6a2528 18:54, 7fa6137 18:53, ffe2951 18:48, 797bf58 17:43, 9472886 17:41, 1ce9d07 17:38, 8840749 17:34, 3b76d37 17:25, f280c9c 17:18.
- **Commands run (read-only):** `git status --ignored -- getsales` (clean) and `python -I alert\pipeline.py scan` (counts only).
- **Root and other folders:**
  - `CHARTER.md`: D3, DoD-12, DoD-13, DoD-22, the Spec outline, Run order, operator scenes and open questions; working-copy diff.
  - `Open tasks.md`, for status only: "Waiting on you" rows 1, 4 and 5, and the GetSales lines under "In progress" and "Done, maybe not seen".
  - `SESSIONS.md`, the S-D3 row.
  - `orchestration\HANDOFF.md`.
  - `alex-prep\scenes\getsales-demos.md`.
  - `answer-desk\queue.md`: the S-D3 TASK entries.
  - `website\builds.md`, `website\HANDOFF.md`, `website\content\inventory.json`, `website\content\deliverables.json`.
  - `blog-pipeline\POST-FORMAT.md`, the version line.
  - `OBS\Processed\index.md`, the S14 transcript head, and `OBS\Live\S15_2026-11-02_1956\session.json` (top-level fields only).
  - `briefing\data\events.md`: the getsales lines.
- **Not opened:** GetSales, the browser and the Claude Docs. The state of all three is reported from the records.
