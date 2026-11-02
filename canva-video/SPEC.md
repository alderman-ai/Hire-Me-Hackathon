# S-D10 Canva design video: executable spec

Status: draft; preflight DI-XX waiting on Alex · Row: S-D10 — Canva design video · Folder: `canva-video\` · Session: `s-d10-canva-video`

This spec produces a recording of Alex designing in Canva near the end of the day. During a recorded rig session he builds a LinkedIn post or short carousel from S-D6's Addvery templates, using S-D7's copy. It's aimed at Addvery's marketing side (the CMO first), and it shows two things: the templates hold up in a person's hands, and Alex can do the design work himself, not only automate it. The video goes on YouTube, unlisted, and onto the site as a D10 section. The scene is most of the work; the session's job is to prepare it, get the clip, cut it safely and hand it to the site.

## 1. Operator preflight (P3)

The intake is DI-XX (`..\Operator tasks\DI-XX S-D10 Canva video preflight.md`).

| Question (DI-XX) | Question | Default |
| --- | --- | --- |
| 1 | When he designs on camera, and for how long: 17:30–17:55 with at most 15 minutes of footage, longer after verifying his YouTube channel, or another time | The scene moves to the morning cleanup session, at most 15 minutes |
| 2 | What the video shows: the screen with a webcam inset, the screen only, or the webcam only (his standing call for the site) | The webcam-only cut with a still of the finished design goes live; a screen-with-inset cut is left ready for the morning |

**Launch gate.** The session launches once DI-XX is answered and its answers are applied. From 18:00 Prague, an unanswered question takes its default, logged in §9.

**Operator scene.** Alex designing in Canva, proposed for 17:30–17:55, at most 15 minutes of footage (question 1). It happens during a recorded rig session: if he's between sessions at 17:30, he types `/start`. At about 17:15 the session sends him a one-page scene brief as an operator task: what to design, the two spoken cues, and the screen-care checklist.

**Off camera.**
- With the recording paused (`/pause`), open the S-D6 design by its link, which the scene brief says where to find, then resume. Canva's home page and project list may show other clients' work.
- Only under question 1's B: verify his YouTube channel for long uploads at https://www.youtube.com/verify before 17:30.
- After the scene, the clip waits until he ends that rig session with `/stop` and types `/process`, as usual (DI-1 Q1.7: /process runs only when he types it). Nothing here asks him to change that.

**Runtime questions** go to the desk as asker `S-D10`, ids `S-D10-Q1` onwards, one at a time (`..\answer-desk\ASKING.md`). After 15 minutes waiting on Alex for anything, send `POKE S-D10: waiting on you for <what>`, and again every 15 minutes. Before 18:00 Prague, keep waiting and do whatever doesn't depend on the answer. From 18:00, decide on the default and log it in §9.

## 2. Spec contract

| Item | S-D10's answer |
| --- | --- |
| 1. Its place | Row S-D10. Claims DoD-21. Reads DoD-16 (S-D6's templates) and, optionally, DoD-17 (S-D7's posts as copy). Serves DoD-22 (nothing it publishes leaks). It claims none of those three. |
| 2. Its neighbours | Depends on S-D6 (`s-d6-canva-templates`: templates in Canva and their link), the rig recordings (`rig`), S-D9 (`s-d9-legibility`) for the clip, and S-D8 (`website`) for the upload and the site. Runs in parallel with all of wave 2; its scene is the last of the day. Feeds the site. |
| 3. Operator preflight | §1 (DI-XX). |
| 4. Decision log | §9. |
| 5. Forking gates | §8. |
| 6. Working directory | `canva-video\`. Reading list §3, which matches its CLAUDE.md. |

## 3. Routing and resources

Paths are relative to `canva-video\`.

- `..\CHARTER.md`: the parent context. Read only, never edit.
- `..\SESSIONS.md`: the roster. Read it at startup and before messaging a session for the first time. Edit only S-D10's own row.
- `..\GIT.md`: shared working-tree rules. Commit only this folder, path-limited.
- `..\answer-desk\ASKING.md`: the desk format, operator tasks, TASK and ARCHIVE lines, the poke, the 18:00 rule.
- `..\answer-desk\qa\S-D10.md`: this spec's desk record. The desk creates it with the first question.
- `..\Operator tasks\Archive\INDEX.md`: Alex's answered intakes, verbatim. DI-XX joins it once archived. Never re-ask what they settle (DI-1 covers the rig: separate webcam file, typed /process, main YouTube channel).
- `SPEC.md`: this file.
- `HANDOFF.md`, if it exists: state after a fork.
- `..\research\DIRECTORY.md`: S1's index of every report.
- Research findings: S2 adds a line here for each report when S1 sends FINDINGS for L-05 and L-01.
- `..\orchestration\_templates\Operator task template.md`: the form of the scene brief.
- `..\OBS\rig\RUNBOOK.md`: how the rig records and files sessions. Read only.
- `..\OBS\Processed\index.json`: the rig's list of filed sessions. It shows which session holds the scene; each filed session's manifest beside it names its screen and webcam files. Read only; the folder is `rig`'s.
- ffmpeg, local: for the cut and the webcam inset. Step 1 checks it's installed.

Step 1 of the run confirms every resource is reachable and turns anything ambiguous into a desk question. Inputs other specs produce later are named in the steps that use them: S-D6's templates and link (run step 3), S-D7's posts (run step 3), the clips from S-D9 (run step 6).

**Outputs.** What this spec creates, in `canva-video\` unless named otherwise:
- `HANDOFF.md`: written at each fork (§8).
- `SCENE.md`: the scene brief, as frozen into the operator task.
- `site\d10.md`: content for the site's D10 section.
- `local\`: git-ignored; the design link.
- `out\`: git-ignored; the cut and its stills. Video files are never committed.
- `.gitignore`: covers `out/` and `local/`.
- In `..\Operator tasks\`: the scene brief operator task.

## 4. Problem and scope

**The problem.** The other demos show automation. This one shows Alex doing the craft, with templates S-D6 built, in a video short enough to watch. Three things stand in the way. His Canva account may show other clients' designs on screen. The site's standing rule is to show the webcam, not the screen, but a design video needs the screen. And YouTube caps unverified channels at 15 minutes.

**In scope.** The scene brief; the clip request to S-D9; the cut, in the form question 2 picks; the screen-care check; the site request.

**Out of scope.** Building the templates (S-D6). Writing the copy (S-D7). Running the rig (`rig`). Cutting clips from the recordings (S-D9). Uploading and embedding (`website`). Anything posted to LinkedIn (charter Scope).

## 5. Definition of done

| Criterion | Traces to |
| --- | --- |
| The scene was recorded during a rig session near the end of the day, in the question 1 slot, with both spoken cues | DoD-21 |
| The cut is in the form question 2 picked, and at most 15 minutes long unless question 1 picked a verified channel | DoD-21 |
| The cut passed the screen-care check before upload: no other client's design, no Canva home or project list, no secret, no Apify proposal, none of Alex's own GetSales outbound | serves DoD-22 |
| The video is on YouTube, unlisted, through `website`'s upload flow, and live in the site's D10 section (`BUILT S-D10-B1` received) | DoD-21 |

## 6. Research step

At launch, the session sends `s1-research` exactly one line:

`RESEARCH S-D10: L-05 (offered merged with S-D6 and S-D7) plus L-01, Canva export settings and what makes a short design video legible shape the scene brief, needed by 17:00`

Approving the list is S1's gate, not this session's.

**Goes ahead while research runs:** everything except the Canva details of the scene brief: step 1's checks, the brief's skeleton, the clip request, and the ffmpeg recipe for each form in question 2.

**Waits for FINDINGS:** the export settings in the brief (R2, R3), and anything W1 to W3 say about the video landing.

**If research is late,** the scene brief goes out at 17:15 on the draft. The scene doesn't move for research; later findings only change the cut.

## 7. Methodology and steps

**Draft methodology.** The session confirms or revises it once the synthesis lands, then runs the coherency check.
1. **Scene brief** (`SCENE.md`). What he designs: by default, one LinkedIn post or short carousel from S-D6's templates, with one of S-D7's posts as the copy, then an export. Where the design link is (`..\canva-video\local\link.md`, git-ignored). The two cues to say aloud: "Canva design starts now" and "Canva design done". The screen-care checklist: open only that design, by link, with the recording paused; don't open Canva's home, projects or other brand kits; close other tabs; anything else goes on the 4K monitor. At most 15 minutes, unless question 1 says otherwise.
2. **The clip.** Once the session holding the scene is filed, ask S-D9 for the screen and webcam clips between the two cues.
3. **The cut,** by question 2. A: the screen full frame with the webcam as a small inset in one corner. B: the screen only. C: the webcam only, with a still of the finished design beside it on the site. Over the length cap, trim the slow stretches (waiting, exporting) and keep the order. Made with ffmpeg into `out\`.
4. **Screen-care check.** A subagent that didn't make the cut looks at a frame at every scene change and at least every 5 seconds, against the checklist in §5. Anything found is blurred or cut, then checked again.
5. **Site.** `site\d10.md`: a title, two lines on what the viewer sees, and a still of the finished design taken from the cut.

**Coherency check:** "if we execute this methodology, will that DoD be satisfied?" Scene with cues: methodology step 1, run steps 4 and 5. Form and length: methodology step 3, run step 7. Screen care: methodology steps 1 and 4, run step 8. Live on the site: methodology step 5, run step 9. Run it again after the synthesis. The methodology has no gate approval (§9); a finding that changes what Alex does on camera becomes a desk question.

**Run steps.** Commit after every finished step, path-limited: `git commit -m "[canva-video] <message>" -- canva-video/...`. Video files are never committed.
1. Read the reading list, and `HANDOFF.md` if it exists. Confirm every resource is reachable, ffmpeg included. Create `.gitignore` (`out/`, `local/`), `out\` and `local\`. Apply DI-XX's answers. Commit.
2. Send the RESEARCH line (§6). Send `s-d9-legibility` a heads-up: `S-D10 will ask for one clip after the 17:30 Canva scene, by the cues Canva design starts now and Canva design done.` Draft `SCENE.md` and the ffmpeg recipes. Commit.
3. Wait, with the Monitor tool, until `READY S-D6` arrives or 17:05, whichever is first. Put the design link from `READY S-D6` in `local\link.md`, and look at S-D6's previews in `..\canva-templates\exports\` (read only) to pick the template for the brief. Take the copy from S-D7's posts in `..\linkedin-content\demo\posts.md` (read only) once `COPY S-D7` says they exist; otherwise the brief names placeholder copy. If S-D6 isn't ready by 17:05, the brief switches to its fallback: a LinkedIn post on a blank canvas in Addvery's brand. Log it in §9.
4. **The scene brief.** At about 17:15, write `..\Operator tasks\OT-<nn> S-D10 Canva design scene.md` from the operator task template, with `SCENE.md` copied in and the next free OT number (check `Operator tasks\` and `Operator tasks\Archive\` just before writing). Commit that file on its own, path-limited, and send `answer-desk` `TASK S-D10: <file name> is waiting on you: the Canva design scene at 17:30, what to design and the two cues`. Poke after 15 minutes if 17:30 passes with no sign of the scene.
5. **The scene.** At the end of the slot, send `TASK DONE S-D10: <file name>`, then `ARCHIVE <file name>: readers S-D10` to `orchestration`. Note the wall-clock times of the scene in `HANDOFF.md`. Take forking gate F1.
6. Wait, with the Monitor tool checking `..\OBS\Processed\index.json` every 300 seconds, until the session holding the scene is filed. Then send `s-d9-legibility` `CLIP S-D10-C1: session S<nn>, from the cue Canva design starts now to the cue Canva design done, screen and webcam clips. For: the D10 video.` Wait for its reply naming the clip files, which the rig's clip finder writes to `..\OBS\Processed\clips\` (read only). If a cue can't be found, give it the wall-clock times instead.
7. Make the cut (methodology step 3), delegated to a subagent handed the clip paths, the recipe and the length cap. It writes only to `out\`.
8. Screen-care check (methodology step 4), by a different subagent. Fix and check again until clean. Write `site\d10.md`. Commit.
9. **Site request.** Send `website`: `BUILD S-D10-B1: upload canva-video\out\d10.mp4 to YouTube, unlisted, through your upload flow, and add a D10 section, Designing in Canva, in the deliverables area, with the video and a still of the finished design. Content: canva-video\site\d10.md. Source: Alex designing in Canva, cut from rig session S<nn>, checked for screen care; <the form question 2 picked>.` Wait for `BUILT S-D10-B1` or `REFUSED S-D10-B1`. Under question 2's default, a second request swaps in the A cut once Alex says so.
10. When §5 is met, send `orchestration` `DONE S-D10: <D10 video live on the site, BUILT S-D10-B1, YouTube id>`.

**Screen care (every step).** Assume anything on screen can be published. The session never opens Canva itself. Design links stay in `local\`. Video goes on YouTube only, never Vercel or the repo. Nothing in the cut may show another client's design, a secret, the Apify proposal or Alex's own GetSales outbound.

## 8. Forking gates (P8)

| Gate | When |
| --- | --- |
| F1 | Right after the scene ends (about 17:55–18:00). It's also the fork before 18:00 Prague, so the overnight session starts clean (P6) with only the clip, the cut and the site left. |
| F2 | Context about half full, whatever else is happening. |

**How it forks.**
1. Write `HANDOFF.md`: whether the scene happened and its wall-clock times; the rig session it's in; the CLIP request and its state; open questions and tasks with their times; pokes in progress; decisions since the last fork. Commit it.
2. From `canva-video\`, launch the successor under the same name: `claude --bg -n s-d10-canva-video "Read CLAUDE.md, then HANDOFF.md. You are now the active S-D10 session."`
3. Update S-D10's row in `..\SESSIONS.md` with the handoff time, and commit it on its own: `git commit -m "[roster] ..." -- SESSIONS.md`.
4. Announce the handoff to `s-d9-legibility`, `website`, `s-d6-canva-templates`, `s1-research`, `orchestration`, and `answer-desk` if a question or task is open.
5. The old session stops itself with `claude stop` and its own exact id.

## 9. Decision log (P5)

Before 18:00 Prague, a passed deadline means poke, not decide. From 18:00, decide on the default, log it here, and send `WITHDRAW <id>` for a desk question. Start each decision with the time and the question id.

| Decision | Justification | Why it's the right call | Blast radius if changed |
| --- | --- | --- | --- |
| 2 Nov, drafting (wave2-specs): S-D10 has no gate approval, not even a spec draft. DI-XX is where Alex shapes it, and a finding that changes his scene becomes a desk question. | DoD-21 needs no sign-off, and the brief keeps Alex's gate count low (P4). | The methodology is short and fixed by his two answers; a gate would cost him a review for little. | Adding a spec-draft gate means one more operator task before 17:15. |
| 2 Nov, drafting (wave2-specs): he designs one LinkedIn post or short carousel from S-D6's templates with S-D7's copy. If S-D6 isn't ready by 17:05, a post on a blank canvas in Addvery's brand. | The charter says only "designing in Canva"; D10 depends on D6. | It ties three deliverables together on screen and fits in 15 minutes. | Alex can change it in question 1 or on the day; only `SCENE.md` changes. |
| 2 Nov, drafting (wave2-specs): two spoken cues mark the scene's start and end, so S-D9 cuts by quote. | The rig's clip finder works from "the quote you remember" (`..\OBS\rig\RUNBOOK.md`). Alex refused marker hotkeys (DI-1 Q1.9). | Two sentences cost him nothing and make the cut exact. | Without them, S-D9 cuts by wall-clock times, a little less exactly. |
| 2 Nov, drafting (wave2-specs): the request to S-D9 uses `CLIP S-D10-C1: ...` and expects a reply naming the clip files. | S-D9's interim brief defines no clip request. | One plain line S-D9 can act on. | If S-D9 sets its own format, only run steps 2 and 6 change. |
| 2 Nov, drafting (wave2-specs): S-D10 makes the cut itself with ffmpeg; video files stay in `out\`, git-ignored, and go only to YouTube. | Clips come from S-D9 and uploads from `website`; the inset and the trim are this spec's own work. Video is never hosted on Vercel. | It keeps each session to its role (P2) and the repo free of video. | If `website` would rather composite, run step 7 moves there. |
| 2 Nov, drafting (wave2-specs): the screen-care check looks at a frame at every scene change and at least every 5 seconds. | His Canva account may show other clients' designs, and anything published must pass DoD-22, which S-D10 serves. | Dense enough to catch a panel opening, cheap enough to run on a 15-minute cut. | A closer check costs only subagent time. |
| 2 Nov, drafting (wave2-specs): the scene brief goes to Alex as a plain operator task at about 17:15, not as a desk question. | It's something he reads and acts on, not a decision (ASKING.md: other operator tasks use the operator task template). | It keeps his one-question desk free for decisions. | None beyond how the brief reaches him. |
