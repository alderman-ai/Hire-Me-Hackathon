# S-D10 Canva design video: executable spec

Status: running since 16:41 (launched by `orchestration`). Restarted 17:13 under Alex's reset rules (`..\answer-desk\ASKING.md`): no intake; the scene is filmed tonight. Since Alex's Q10.9 answer (17:23) he builds one LinkedIn graphic himself from S-D6's asset pack. The session also runs the Comfy brand-motion brainstorm (D11, Q10.11). `SCENE.md` re-planned for the pack; the brainstorm draft is with a subagent; then forking gate F0 · Row: S-D10 — Canva design video · Folder: `canva-video\` · Session: `s-d10-canva-video`

This spec produces a recording of Alex designing in Canva near the end of the day. During a recorded rig session he builds a LinkedIn post or short carousel from S-D6's Addvery templates, using S-D7's copy. It's aimed at Addvery's marketing side (the CMO first), and it shows two things: the templates hold up in a person's hands, and Alex can do the design work himself, not only automate it. The video goes on YouTube, unlisted, and onto the site as a D10 section. The scene is most of the work; the session's job is to prepare it, get the clip, cut it safely and hand it to the site.

## 1. Operator preflight (P3)

**No intake (reset, 17:13).** The held intake (Appendix A) was dropped at `orchestration`'s RESTART. Its three questions are settled:

| Question | Settled | Source |
| --- | --- | --- |
| 1. When, and what he designs | Tonight, once S-D6's asset pack is ready: he builds one LinkedIn graphic himself, from the pack made out of his pixel-perfect branded assets repo, following one of its mockups. S2-Q1 (17:30 or the morning) was withdrawn | `orchestration` RESTART, 17:13: "Alex is working all night"; Alex's Q10.9 answer, 17:23: "Give me all the assets I need to build it myself" |
| 2. Verify the channel, or under 15 minutes | Up to 15 minutes; no channel verification | Alex's Q10.9 (a), in `..\Operator tasks\Archive\Decide - everything left that needs you.md` |
| 3. Screen or webcam | A screen recording, with Canva's private panels off camera; the webcam as a small inset in one corner (§9) | Alex's Q10.9; `orchestration`'s reading of his 17:23 answer: "Alex builds the design himself on camera" |

If `orchestration` relays a different Q10.9 answer, only methodology step 3 and the brief's "What this is" change.

**Operator scene.** Alex designing in Canva tonight, whenever suits him once the templates are in Canva: about 5 minutes of off-camera setup, then at most 15 minutes of footage, so about 20 minutes in all. It happens during a recorded rig session: if he's between sessions, he types `/start`. When `READY S-D6` arrives, the session forks (F0) and the successor sends him the scene brief as a Claude Doc: what to design, the two spoken cues, and the screen-care checklist.

**Off camera.**
- With the recording paused (`/pause`), open the S-D6 design by its link, which the scene brief says where to find, then resume. Canva's home page and project list may show other clients' work. The full off-camera list is `SCENE.md` Step 1 (14 items, about 5 minutes).
- After the scene, the clip waits until he ends that rig session with `/stop` and types `/process`, as usual (DI-1 Q1.7: /process runs only when he types it). Nothing here asks him to change that.

**Runtime questions.** Under the reset rules, easy calls are this session's: decide and log them in §9. Only a real blocker goes to the desk, as asker `S-D10`, ids `S-D10-Q1` onwards, one at a time (`..\answer-desk\ASKING.md`). Poke only when the work is blocked, at most every 30 minutes, then decide and log. There's no 18:00 cut-off any more.

## 2. Spec contract

| Item | S-D10's answer |
| --- | --- |
| 1. Its place | Row S-D10. Claims DoD-21. Reads DoD-16 (S-D6's templates) and, optionally, DoD-17 (S-D7's posts as copy). Serves DoD-22 (nothing it publishes leaks). It claims none of those three. |
| 2. Its neighbours | Depends on S-D6 (`s-d6-canva-templates`: templates in Canva and their link), the rig recordings (`rig`), S-D9 (`s-d9-legibility`) for the clip, and S-D8 (`website`) for the upload and the site. Runs in parallel with all of wave 2; its scene is the last of the day. Feeds the site. |
| 3. Operator preflight | §1 (no intake since the 17:13 reset; the scene brief is his one task). |
| 4. Decision log | §9. |
| 5. Forking gates | §8. |
| 6. Working directory | `canva-video\`. Reading list §3, which matches its CLAUDE.md. |

## 3. Routing and resources

Paths are relative to `canva-video\`.

- `..\CHARTER.md`: the parent context. Read only, never edit.
- `..\SESSIONS.md`: the roster. Read it at startup and before messaging a session for the first time. Edit only S-D10's own row.
- `..\GIT.md`: shared working-tree rules. Commit only this folder, path-limited.
- `..\answer-desk\ASKING.md`: the desk format, operator tasks and their plain file names, TASK and ARCHIVE lines, the poke, and Alex's reset rules at the top (17:00), which override the rest.
- `..\answer-desk\qa\S-D10.md`: this spec's desk record. The desk creates it with the first question.
- `..\Operator tasks\Archive\INDEX.md`: Alex's answered intakes, verbatim. This spec's held intake was dropped, not archived (§1). Never re-ask what they settle (DI-1 covers the rig: separate webcam file, typed /process, main YouTube channel).
- `SPEC.md`: this file.
- `HANDOFF.md`, if it exists: state after a fork.
- `..\research\DIRECTORY.md`: S1's index of every report.
- Research findings: S2 adds a line here for each report when S1 sends FINDINGS for L-05 and L-01.
- `..\Operator tasks\Archive\Approve - Canva and LinkedIn demo research.md`: Alex's answer on the Canva and LinkedIn research list (OT-09), verbatim, with his change note. Read it for wording, never re-ask it.
- **L-05 findings** (S1's Canva and LinkedIn research, approved by Alex as OT-09; added by S2 as C11): for this spec, read the synthesis first, then R2, R3, W1, W2. Read only; S1 owns them. Options for Alex, not decisions; under his reset rules the easy calls in them are yours, decided and logged.
  - `..\research\global\L-05-synthesis.md`: S1's synthesis: five lines for the next 30 minutes, convergences, conflicts with the 2-to-5-minute probe that settles each, recommendations per spec, and 12 one-line questions, each naming the spec it blocks. Start here.
  - `..\research\global\L-05-R2-canva-capabilities.md`: what Canva can do now: autofill on Pro and Teams since 21 Sep 2026, brand templates on any paid plan; the connector creates, imports from a URL, resizes, fills and exports, but can't lock elements, upload fonts or edit a brand kit; current LinkedIn sizes.
  - `..\research\global\L-05-R3-pixel-perfect-canva.md`: pixel-perfect in Canva: full locks on brand elements and position-only locks on slots, binding only in Brand Templates; fixed art as locked PNG or SVG, editable text as native Canva text; PNG and carousel-PDF export rules, and a 17-item checklist for the export checker.
  - `..\research\global\L-05-W1-wildcard-executed.md`: how the templates get from local files into Canva: the connector can't carry local files or set locks, Chrome is the only agent route that can (untested), so a 2-minute test import of the smallest template comes first.
  - `..\research\global\L-05-W2-wildcard-delivered.md`: what Addvery's people can actually open and use: pictures as planned; a template can't leave Alex's account whole, and only a template link (paid plan) gives an outsider a fillable copy; the scene's screen care must add Canva's Uploads, Projects and Brand panels.
- **L-01 findings** (S1's parent research, approved by Alex as OT-01; added by S2 as C07): for this spec, read the synthesis first, then R1 (AI labels), W3, R2 (Canva matched no GTM job post).
  - `..\research\global\L-01-synthesis.md`: S1's synthesis of the parent research: the strongest findings, recommendations per spec, and 24 one-line questions for Alex, each naming the spec it blocks. Start here: take this spec's section, and fold the questions that name it into your next gate. Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-R1-legibility.md`: making the work legible: outcome first, a short demo, a 3 to 4 step how-it-works; what reads as a toy or as noise; AI labels. Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-R2-gtm-engineer-hiring.md`: what a GTM engineer is hired to show, which deliverables fit it best, and the gaps none of them shows. Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-R3-personal-data.md`: personal data on a public site: GDPR, LinkedIn's terms, what the live run needs, and the safe, risky and keep-off table for stakeholder sections (section 7). Not legal advice. Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-R4-format-reception.md`: whether a site aimed at one employer lands: replies versus hires, when it turns creepy or self-indulgent, and the one small ask. Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-W1-wildcard-executed.md`: whether a dozen background sessions can run through the day and night: usage limits, Windows Update restarts, idle stops. Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-W2-wildcard-delivered.md`: what the six actually get from the alert: the link, the preview card, click timing, and the morning hand-over checklist (C7). Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-W3-wildcard-received.md`: whether AI-made work reads as skill or as a shortcut: the penalty bites on personal lines, not on the machinery. Options for Alex, not decisions. Read only; S1 owns it.
- `..\orchestration\_templates\Operator task template.md`: the shape `SCENE.md` follows; since the reset, the brief itself goes in a Claude Doc (run step 4).
- `..\Operator tasks\Archive\Decide - everything left that needs you.md`, Q10.9: Alex's answer on how the video is filmed. Read only.
- `..\Operator tasks\Archive\Decide - everything left that needs you.md`: Alex's answers to the intake for everything left (DI-10, 17:23), verbatim; for this spec, Q10.9 and Q10.11 (the brand motion demo with Comfy, D11, run by this session). Read them for wording, never re-ask them.
- `..\OBS\rig\RUNBOOK.md`: how the rig records and files sessions. Read only.
- `..\OBS\Processed\index.json`: the rig's list of filed sessions. It shows which session holds the scene; each filed session's manifest beside it names its screen and webcam files. Read only; the folder is `rig`'s.
- ffmpeg, local: for the cut and the webcam inset. Step 1 checks it's installed.

Step 1 of the run confirms every resource is reachable and turns anything ambiguous into a desk question. Inputs other specs produce later are named in the steps that use them: S-D6's templates and link (run step 3), S-D7's posts (run step 3), the clip paths in S-D9's reply (run step 6).

**Outputs.** What this spec creates, in `canva-video\` unless named otherwise:
- `HANDOFF.md`: written at each fork (§8).
- `SCENE.md`: the scene brief, as frozen into the operator task.
- `site\d10.md`: content for the site's D10 section.
- `local\`: git-ignored; the design link.
- `out\`: git-ignored; the cut and its stills. Video files are never committed.
- `.gitignore`: covers `out/` and `local/`.
- A Claude Doc holding the scene brief, made by the F0 successor through `anthropic-skills:docs`. Its link goes in `local\doc.md` and in the TASK line, never in a tracked file.

## 4. Problem and scope

**The problem.** The other demos show automation. This one shows Alex doing the craft, with templates S-D6 built, in a video short enough to watch. Three things stand in the way. His Canva account may show other clients' designs on screen. The site's standing rule is to show the webcam, not the screen, but a design video needs the screen. And YouTube caps unverified channels at 15 minutes.

**In scope.** The scene brief; the Comfy brand-motion brainstorm (D11, Alex's Q10.11: a Claude Doc of 6 to 10 ideas he picks from and runs himself, by hand; §7, brainstorm steps); the clip request to S-D9; the cut, a screen recording with a webcam inset, at most 15 minutes; the screen-care check; the site request.

**Out of scope.** Building the templates (S-D6). Writing the copy (S-D7). Running the rig (`rig`). Cutting clips from the recordings (S-D9). Uploading and embedding (`website`). Anything posted to LinkedIn (charter Scope).

## 5. Definition of done

| Criterion | Traces to |
| --- | --- |
| The scene was recorded during a rig session tonight, Alex building one graphic from S-D6's asset pack, with both spoken cues | DoD-21 |
| The cut is a screen recording with a small webcam inset (Alex's Q10.9), at most 15 minutes long | DoD-21 |
| The cut passed the screen-care check before upload: no other client's design, no Canva home or project list, no Projects, Uploads or Brand panel in the editor, no brand kit of another client, no Share panel access list, no file picker or save dialog, no secret, no Apify proposal, none of Alex's own GetSales outbound | serves DoD-22 |
| The video is on YouTube, unlisted, through `website`'s upload flow, and live in the site's D10 section (`BUILT S-D10-B1` received) | DoD-21 |

## 6. Research step

At launch, the session sends `s1-research` exactly one line:

`RESEARCH S-D10: L-05 (offered merged with S-D6 and S-D7) plus L-01, Canva export settings and what makes a short design video legible shape the scene brief, needed by 16:45`

Approving the list is S1's gate, not this session's.

**Done by 16:50.** L-05 (all seven reports and its synthesis) and L-01 were already written when the session launched. They're applied in `SCENE.md` and §9, so the RESEARCH line was never sent.

**Goes ahead while research runs:** everything except the Canva details of the scene brief: step 1's checks, the brief's skeleton, the clip request, and the ffmpeg recipe for the cut.

**Waits for FINDINGS:** the export settings in the brief (R2, R3), and anything W1 to W3 say about the video landing.

**If research is late,** the scene brief goes out on the draft. The scene doesn't move for research; later findings only change the cut.

## 7. Methodology and steps

**Draft methodology.** The session confirms or revises it once the synthesis lands, then runs the coherency check.
1. **Scene brief** (`SCENE.md`). What he designs (Alex's Q10.9 answer, 17:23): one LinkedIn graphic he builds himself in a fresh Canva design from S-D6's asset pack, following one of its one-page mockups, then an export. With the recording paused, the pack's images go onto page 2 of the design as a parts tray, so the Uploads panel stays shut on camera. The two cues to say aloud: "Canva design starts now" and "Canva design done". The screen-care checklist: open only that design, by link, with the recording paused; don't open Canva's home, projects or other brand kits; close other tabs; anything else goes on the 4K monitor. In the editor, stay out of the Projects, Uploads and Brand panels, the Share panel and any file picker; use only the images already placed, and pause to add one (L-05-W1 C6, L-05-W2 C5). `SCENE.md` holds the full list: off camera (Step 1) and on camera (Step 2). At most 15 minutes, unless question 2 says verify.
2. **The clip.** Once the session holding the scene is filed, ask S-D9 for the screen and webcam clips between the two cues.
3. **The cut:** the screen full frame, with the webcam as a small inset in one corner (Alex's Q10.9 (a); inset by §9). Over 15 minutes, trim the slow stretches (waiting, exporting) and keep the order. Made with ffmpeg into `out\`. It's design work (reset rule 5). Invoke `frontend-design` before placing the inset; if the session doesn't list it, ask `orchestration` to switch it on. Before upload, run `design:design-critique` and `design:accessibility-review` on the cut and the still.
4. **Screen-care check.** A subagent that didn't make the cut looks at a frame at every scene change and at least every 5 seconds, against the checklist in §5. It looks hardest at the moments a panel opens on the left of the editor, at the colour and font pickers, at the export, and at any time Alex notes in the brief's Step 4. Anything found is blurred or cut, then checked again.
5. **Site.** `site\d10.md`: a title, two lines on what the viewer sees, and a still of the finished design taken from the cut. That's copywriting: before writing it, send `orchestration` `SKILL s-d10-canva-video: design:ux-copy for the D10 section's title and two lines`, wait for `SKILL ON`, then invoke it (ASKING.md). A subagent that writes it gets the skill named in its prompt.

**Coherency check:** "if we execute this methodology, will that DoD be satisfied?" Scene with cues: methodology step 1, run steps 4 and 5. Form and length: methodology step 3, run step 7. Screen care: methodology steps 1 and 4, run step 8. Live on the site: methodology step 5, run step 9. Run it again after the synthesis. The methodology has no gate approval (§9); a finding that changes what Alex does on camera becomes a desk question.

**Run steps.** Commit after every finished step, path-limited: `git commit -m "[canva-video] <message>" -- canva-video/...`. Video files are never committed.
1. Read the reading list, and `HANDOFF.md` if it exists. Confirm every resource is reachable, ffmpeg included. Create `.gitignore` (`out/`, `local/`), `out\` and `local\`. Commit. (`.gitignore` done at 16:45; the intake was dropped at the 17:13 reset, and §1 holds the settled answers.)
2. Send `s-d9-legibility` a heads-up: `S-D10 will ask for one clip after the Canva scene tonight, once the templates are in Canva, by the cues Canva design starts now and Canva design done.` Draft `SCENE.md` and the ffmpeg recipes. Commit.
3. Wait, with no polling, until `READY S-D6` says the asset pack is ready (Alex's Q10.9 answer, 17:23). Fill `SCENE.md`'s pack placeholders from it: the folder, its contents, the mockup and sheet files, the size. Pick a one-page mockup unless S-D6 recommends one. Take the copy from the mockup if the pack carries it, otherwise from S-D7's posts in `..\linkedin-content\demo\posts.md` (read only) once `COPY S-D7` says they exist. Otherwise use placeholder copy, written only after `marketing:draft-content` is invoked (switched on at 17:13). If no pack comes tonight, the brief's blank-canvas fallback applies; log it in §9. Forking gate F0 comes first (§8), so a fresh session with the Docs connector does this step.
4. **The scene brief (F0's successor).** Fill `SCENE.md`'s placeholders. Load `anthropic-skills:docs` (switched on at 17:13) and follow its guide before any Docs call. Put the brief in a Claude Doc: everything from `## What this is` down to "When you are done", in plain words with no codes (no spec, DoD or OT ids, no session names). Save the Doc's link in `local\doc.md`. Then send `answer-desk` `TASK s-d10-canva-video: the Canva video is ready to record: <Doc link>, about 20 minutes with the off-camera list`. Alex's comment on the Doc is his report (the brief's Step 4) and reaches this session. No pokes unless the work is blocked (reset rule 7).
5. **The scene.** When Alex's comment on the Doc says the scene is done, or the rig files a session holding both cues, send `answer-desk` `TASK DONE s-d10-canva-video: the Canva video`. Tell `s-d6-canva-templates` it can use Claude in Chrome again. Note the scene's wall-clock times in `HANDOFF.md`. Take forking gate F1.
6. Wait, with the Monitor tool checking `..\OBS\Processed\index.json` every 300 seconds, until the session holding the scene is filed. Then send `s-d9-legibility` `CLIP S-D10-C1: session S<nn>, from the cue Canva design starts now to the cue Canva design done, screen and webcam clips. For: the D10 video.` S-D9 answers `CLIPPED S-D10-C1: <paths or YouTube id>` or `NO CLIP S-D10-C1: <why>`. Use the clip paths in S-D9's reply (S-D9 cuts into its own git-ignored folder), read only. On `NO CLIP`, send `CLIP S-D10-C2` with the scene's wall-clock times instead of the cues.
7. Make the cut (methodology step 3), delegated to a subagent handed the clip paths, the recipe and the length cap. It writes only to `out\`.
8. Screen-care check (methodology step 4), by a different subagent. Fix and check again until clean. Write `site\d10.md`. Commit.
9. **Site request.** Send `website`: `BUILD S-D10-B1: upload canva-video\out\d10.mp4 to YouTube, unlisted, through your upload flow, and add a D10 section, titled as in site\d10.md, in the deliverables area, with the video and a still of the finished design. Content: canva-video\site\d10.md. Source: Alex designing in Canva, cut from rig session S<nn>, checked for screen care; a screen recording with a webcam inset.` Wait for `BUILT S-D10-B1` or `REFUSED S-D10-B1`.
10. When §5 is met, send `orchestration` `DONE S-D10: <D10 video live on the site, BUILT S-D10-B1, YouTube id>`.

**Brainstorm and the rest of D11:** the S-D11 section at the end of this spec.

**Screen care (every step).** Assume anything on screen can be published. The session never opens Canva itself. Design links stay in `local\`. Video goes on YouTube only, never Vercel or the repo. Nothing in the cut may show another client's design, a secret, the Apify proposal or Alex's own GetSales outbound.

## 8. Forking gates (P8)

| Gate | When |
| --- | --- |
| F0 | When the brainstorm draft `comfy-motion\IDEAS.md` is in (moved forward from `READY S-D6` at 17:26, because both Docs need the Claude Docs connector, which this session lacks). The successor makes the brainstorm Doc first, then waits for `READY S-D6` and runs run step 3 onwards. |
| F1 | Right after the scene ends, so the next session starts clean (P6), with only the clip, the cut and the site left. |
| F2 | Context about half full, whatever else is happening. |

**How it forks.**
1. Write `HANDOFF.md`: whether the scene happened and its wall-clock times; the rig session it's in; the CLIP request and its state; open questions and tasks with their times; pokes in progress; decisions since the last fork. Commit it.
2. From `canva-video\`, launch the successor under the same name: `claude --bg -n s-d10-canva-video "Read CLAUDE.md, then HANDOFF.md. You are now the active S-D10 session."`
3. Update S-D10's row in `..\SESSIONS.md` with the handoff time, and commit it on its own: `git commit -m "[roster] ..." -- SESSIONS.md`.
4. Send `orchestration` `HANDOFF s-d10-canva-video, <time>` (its 17:13 instruction), and announce the handoff to `s-d9-legibility`, `s-d6-canva-templates`, `website`, and `answer-desk` if a question or task is open.
5. `orchestration` stops and removes the old id (`..\SESSIONS.md`, handoff step 4). The old session starts nothing more.

## 9. Decision log (P5)

Since the 17:13 reset (`..\answer-desk\ASKING.md`, Alex's reset rules), easy calls are this session's: decide, log here, carry on. On a real blocker, poke once, then decide and log, and send `WITHDRAW <id>` for a desk question. There's no 18:00 cut-off. Start each decision with the time and the question id, if any.

| Decision | Justification | Why it's the right call | Blast radius if changed |
| --- | --- | --- | --- |
| 2 Nov, drafting (wave2-specs): S-D10 has no gate approval, not even a spec draft. DI-XX is where Alex shapes it, and a finding that changes his scene becomes a desk question. | DoD-21 needs no sign-off, and the brief keeps Alex's gate count low (P4). | The methodology is short and fixed by his three answers; a gate would cost him a review for little. | Adding a spec-draft gate means one more operator task before 17:05. |
| 2 Nov, drafting (wave2-specs): the proposed slot moves from 17:30–17:55 to 17:15–17:40, into the time the GetSales run freed. | Alex moved the GetSales run to before 15:30 (14:30). The brand sign-off can't move earlier: research and about 45 minutes of building come first. | Fifteen minutes after the sign-off for template fixes, and 20 minutes before 18:00 for a retake, `/stop` and `/process`. | Back to 17:30–17:55 shifts the brief, the heads-up and F1 by 15 minutes; question 1 offers it. |
| 2 Nov, drafting (wave2-specs): he designs one LinkedIn post or short carousel from S-D6's templates with S-D7's copy. If S-D6 isn't ready by 17:05, a post on a blank canvas in Addvery's brand. | The charter says only "designing in Canva"; D10 depends on D6. | It ties three deliverables together on screen and fits in 15 minutes. | Alex can change it in question 1 or on the day; only `SCENE.md` changes. |
| 2 Nov, drafting (wave2-specs): two spoken cues mark the scene's start and end, so S-D9 cuts by quote. | The rig's clip finder works from "the quote you remember" (`..\OBS\rig\RUNBOOK.md`). Alex refused marker hotkeys (DI-1 Q1.9). | Two sentences cost him nothing and make the cut exact. | Without them, S-D9 cuts by wall-clock times, a little less exactly. |
| 2 Nov, drafting (wave2-specs): the clip request follows S-D9's spec: `CLIP S-D10-C1: ...`, answered `CLIPPED` with the paths or `NO CLIP` with why; the clip paths come from S-D9's reply. | S-D9 cuts into its own git-ignored folder and names the paths in its reply. | One plain line in the format S-D9 already reads. | If S-D9 changes its format, only run steps 2 and 6 change. |
| 2 Nov, drafting (wave2-specs): S-D10 makes the cut itself with ffmpeg; video files stay in `out\`, git-ignored, and go only to YouTube. | Clips come from S-D9 and uploads from `website`; the inset and the trim are this spec's own work. Video is never hosted on Vercel. | It keeps each session to its role (P2) and the repo free of video. | If `website` would rather composite, run step 7 moves there. |
| 2 Nov, drafting (wave2-specs): the screen-care check looks at a frame at every scene change and at least every 5 seconds. | His Canva account may show other clients' designs, and anything published must pass DoD-22, which S-D10 serves. | Dense enough to catch a panel opening, cheap enough to run on a 15-minute cut. | A closer check costs only subagent time. |
| 2 Nov, drafting (wave2-specs): the scene brief goes to Alex as a plain operator task, `Do - film yourself designing in Canva.md`, at about 17:05, not as a desk question. | It's something he reads and acts on, not a decision (ASKING.md: other operator tasks use the operator task template). | It keeps his one-question desk free for decisions. | None beyond how the brief reaches him. |
| 2 Nov 16:45, groundwork: `SCENE.md` is the whole operator-task body, written now with placeholders (slot, template, link, copy, export line, OT number), so run step 4 only fills them and adds the front matter. Its draft notes stay behind. | Orchestration launched the session for groundwork only, and the slot waits on S2-Q1 (17:30 today or tomorrow morning). At 17:30 the task must be out by 17:20. | Filling placeholders takes minutes, so the slot answer can't make the brief late. | Changing the brief's shape later costs a rewrite of one local file. |
| 2 Nov 16:45, groundwork: the editor's Projects, Uploads and Brand panels, the Share panel, the profile menu and any file picker go on the on-camera "stay out" list. Images come only from the template, and Alex pauses to add one. | L-05-W1 C6 and L-05-W2 C5 (the panels list account-wide content); L-05-R3 Q8 (the Share panel lists who has access). | It closes the gaps the research found in the earlier list, at no cost to the scene. | A looser list leans on the frame check alone, which can only blur or cut after the fact. |
| 2 Nov 16:45, groundwork: Step 1 adds off-camera checks the research doesn't cover, marked in the draft notes as inference to check on the day: Do not disturb, Chrome's download list cleared and its save dialog off, own Canva team, brand-kit selectors in the colour, font and Text panels, the design title, Download in the File menu, `F11` full screen, no clipboard history. | Each one is a place where another client's name, a file name or the design link can reach the recorded monitor. The session never opens Canva, so none is checked live. | About 5 minutes of Alex's time, paused, against a published video that can't be unpublished from caches. | Dropping an item leaves it to the frame check; adding one costs him seconds. |
| 2 Nov 16:45, groundwork: on a retake, Alex says the start cue again, and the cut runs from the last start cue to "Canva design done". | The clip finder cuts by quote, and a retake repeats the start line. | One rule, nothing to remember beyond the two lines. | If S-D9 can only find the first cue, run step 6's CLIP line names the last one by time. |
| 2 Nov 16:45, groundwork: if the templates aren't in Canva by the slot, the preferred fallback is building one template on camera from its backdrop (uploaded with the recording paused); a blank canvas is the last resort. | S-D6 now builds each template as a locked backdrop plus native Canva text (its methodology step 3), and L-05-W1 C2 option B makes the build itself the scene. | It films real design work with the same files S-D6 uses, and keeps the Uploads panel off camera. | Only `SCENE.md` changes; S-D6's route is untouched. |
| 2 Nov 16:45, groundwork: no lines are scripted for Alex beyond the two cues, and any placeholder copy or site copy waits for a copywriting skill through `orchestration`. | Alex's rule at about 16:40: no copywriting without a copywriting skill (ASKING.md). What he says on camera reaches viewers. | It keeps the session inside the rule and keeps his voice his own. | None: the brief already works without a script. |
| 2 Nov 17:20, reset: the held intake is dropped and S2-Q1 withdrawn. The scene is tonight, once the templates are in Canva, and the video is a screen recording of Alex customising one of the five templates, up to 15 minutes, with Canva's private panels off camera. | `orchestration` RESTART, 17:13, on Alex's reset rules and his Q10.9 (a). | It's Alex's own answer, or his intake's default. | A different Q10.9 answer changes methodology step 3 and the brief's opening only. |
| 2 Nov 17:20, reset: the screen recording carries a small webcam inset in one corner. | Q10.9 (a) says "a screen recording" and doesn't rule an inset in or out. Every other video on the site shows his face, and the rig keeps the webcam as a separate file. An easy call (reset rule 1). | It keeps his face in the one video that shows his hands, at the cost of a corner of the frame. | The inset is a single ffmpeg overlay, dropped in one step if he says so. |
| 2 Nov 17:20, reset: the brief goes to Alex as a Claude Doc, not an operator task file. It goes from a fresh session (F0) once `READY S-D6` arrives, and his comment on the Doc is his report. | Reset rule 4 (written work in Claude Docs) and `orchestration`'s 17:13 instruction. This session has no Docs connector. | The fork costs one launch, and the Doc is where he reads and comments anyway. | If the Docs connector fails, fall back to the operator task file in `..\Operator tasks\`, which the brief's structure already fits. |
| 2 Nov 17:20, reset: the screen-care list stays as written, although public sources are now fine (reset rule 3). | `orchestration`'s decision keeps "Canva's private panels off camera". Other clients' designs and uploads aren't public sources, and the list asks Alex nothing: it's about 5 minutes of setup. | It protects third parties at no cost to his focus. | Trimming it leaves more to the frame check. |
| 2 Nov 17:20, reset: the cut counts as design work, so `frontend-design` before the inset and `design:design-critique` plus `design:accessibility-review` before upload (reset rule 5). | Rule 5 covers "any page, template, visual". | It costs minutes and catches a badly placed inset or an unreadable still. | None. |
| 2 Nov 17:30, C11 (L-05 synthesis questions that name S-D10, decided under reset rule 1). **Q1** (Canva plan): S-D10 doesn't need the answer. The brief's off-camera Step 1 item 10 opens the export settings once, and an upgrade prompt there means keep the defaults on camera. S-D6's part of Q1 stays S-D6's. **Q2** (route into Canva): S-D6 is doing a test import and then the five itself (its 17:22 message), so the scene fills a template already in Canva. The build-from-backdrop variant applies only if `READY S-D6` reports none. **Q4** (screen with webcam inset): settled by Alex's Q10.9 (a) plus the inset row above. **Q5** (who gets the brief out): this session, through F0 and a Claude Doc (`orchestration`, 17:13). | Each is either settled by Alex or `orchestration`, or answerable inside the brief without him (reset rule 1). Q3 and Q6 to Q12 don't name S-D10. | No question reaches Alex for the video. | Q1: if the plan turns out Free, only the export settings on camera change. Q2: if S-D6 can't get templates in, the brief switches variant (`SCENE.md` draft notes). |
| 2 Nov 17:26, DI-10 Q10.9 (Alex, 17:23, relayed by `orchestration`): the scene changes from filling a template in Canva to Alex building one graphic himself from S-D6's asset pack, following one of its mockups. This supersedes the 17:30 Q2 line. `SCENE.md` is rewritten for it. | His words: "Give me all the assets I need to build it myself". `orchestration`'s reading: "Plan the scene around that pack." | It's his answer. Building it himself is the stronger proof of craft the video exists for. | Only `SCENE.md` changes. The clip, the cut and the site steps are untouched. |
| 2 Nov 17:26, Q10.9: with the recording paused, the pack's images go onto page 2 of a fresh design as a parts tray. On camera he builds page 1 from them, then deletes page 2 before the export. | Building from assets would otherwise mean the Uploads panel on camera, which lists uploads from across his account (L-05-W2 B4, C5). | It keeps the panel shut, and moving parts across reads as building on screen. | If Canva's drag-and-drop behaves differently on the day, he pauses to add each part. That's slower, but nothing leaks. |
| 2 Nov 17:26, Q10.9: he builds a one-page mockup (a single-image or square post, or a quote card), not the carousel, unless S-D6 recommends otherwise. | A build from parts takes longer than filling slots, and the cap is 15 minutes. | It fits the cap with room for a retake. | A carousel means trimming more in the cut, or two scenes. |
| 2 Nov 17:26, DI-10 Q10.11 (`orchestration`, 17:23): this session runs the Comfy brand-motion brainstorm (D11). A subagent drafts `comfy-motion\IDEAS.md` from read-only references, with no generation and no credits. The F0 successor puts it in a Claude Doc. | Assigned by `orchestration`. Reading the Gauss and Comfy folders is context-heavy, so a subagent keeps this session's context for the video (P7). | Alex asked for brainstorming only. He runs Comfy himself and picks from the Doc. | If `orchestration` moves D11 to its own session, `comfy-motion\` moves with it, and nothing else here changes. |
| 2 Nov 17:26: forking gate F0 moves forward from `READY S-D6` to "the brainstorm draft is in". | Both the brainstorm Doc and the scene brief Doc need the Claude Docs connector, which this session lacks, and the brainstorm is ready first. | One fork serves both Docs, and Alex gets the ideas without waiting on the pack. | None. The successor waits for `READY S-D6` exactly as this session would have. |
| 2 Nov 17:32, from S-D6's pack details: the scene is the quote card, 1080 × 1080, built in the mockup's order. He adds text boxes with `T` and the hairline with `L`, so the Elements panel stays shut. Inter with the sheet's letter-spacing; PNG High 1x. | S-D6, 17:31: only Inter of the brand's faces is in Canva's library, and Canva text takes linear gradients. The Elements panel's recently-used row can show other work (inference). | One page fits 15 minutes, and the shortcuts cost nothing. | If the shortcuts differ on the day, he pauses to add the line. |
| 2 Nov 17:32: the brief's "no real person in the design" line is replaced by "use the pack's copy as given". The quote card has a name-and-role box. | Reset rule 3: public sources are fine, and the copy is S-D6's and S-D7's to write. L-01 synthesis 6.5 was an option, not a rule. | It keeps the brief out of other sessions' copy decisions. | If Alex wants no name on it, only the quote card's copy changes. |
| 2 Nov 17:32: S-D6 gets `SCENE START` when Alex comments "filming now" on the brief Doc (a new Step 1 item), and `SCENE DONE` on his Step 4 comment. | S-D6 needs Chrome until the scene (17:31), and Alex's Doc comments reach this session (reset rule 4). | One comment, about 5 seconds of his time, keeps a Claude-driven Chrome out of the take. | If a comment arrives late, the frame check is the backstop for a stray tab. |
| 2 Nov 17:32, C15: the S-D11 section is planned (B1 to B7). The ideas go in a Claude Doc. His pick, his own Comfy work, then a frame check and design review, `site\d11.md` through `design:ux-copy`, and `BUILD S-D11-B1`. This session generates nothing and spends no credits. | S2's C15 asks for the plan and a log. Alex: "I just need some brainstorming ... pretty manual". | It leaves the making to him and the checking and publishing to the sessions that do that already. | If he wants generation done for him, B4 grows into a build under `C:\Users\alder\Desktop\Comfy UI\`'s own rules, with a credit estimate first. |

## Appendix A. Held preflight intake (dropped at the 17:13 reset)

**Dropped, never released.** `orchestration`'s RESTART at 17:13 settled its questions (§1), and no intakes go to Alex under the reset rules. It's kept for the record only. Don't release it.

This spec's preflight intake is drafted but not yet in front of Alex (Alex, 14:38: "i'm swamped we need to remove blockers"; orchestration: at most two wave-2 preflight intakes open at once, none new while he's on his Addvery research). **Release it when** the Canva templates intake (Decide - how the Canva templates get made.md) is answered, because the recording films the templates. Whoever releases it (`wave2-specs` while it runs, then this spec's session if it's running, otherwise `orchestration`): take the next free DI number from the `Intake id:` lines in `..\Operator tasks\` and `..\Operator tasks\Archive\`, replace `XX` in the forms `DI-XX`, `QXX.`, `AXX.` and `a-XX-` with it, and save the text below as `..\Operator tasks\Decide - when and how to film the Canva video.md`. Recheck any times in it against the clock first. Commit it path-limited, put the DI number into §1 and the status line, and send `answer-desk` `TASK S-D10: Decide - when and how to film the Canva video.md is waiting on you: <what it decides and unblocks>`.

~~~~markdown
---
System Primitive: Intake file
Intake State: Waiting on operator
Intake id: DI-XX
Created: 2026-11-02
Build goals: []
---

<!-- File name: "Decide - when and how to film the Canva video.md" -->

# Decide: when and how to film the Canva video

## What this is

The site you're building today is a personalised job application to Addvery, made live during a 12-hour recorded hackathon. One part of it is a short video of you designing in Canva, filmed near the end of the day. You build a LinkedIn post or short carousel from the Addvery templates made earlier today, using copy from the LinkedIn posts demo. It shows Addvery's marketing side that you can do the design work yourself, not only automate it, and that the templates hold up in a person's hands. The video goes on YouTube, unlisted, and gets its own section on the site.

You're asked three things: when you film it and what you design, whether you verify your YouTube channel for videos over 15 minutes or keep this one under 15, and whether the video shows your screen or your webcam. Once you answer, the assistant that prepares the scene starts. It writes you a one-page scene brief, then waits for the templates.

It needs you on camera once: the design scene itself, proposed for 17:15–17:40, at most 15 minutes of footage unless you verify the channel. This intake takes you about 3 minutes. Answer by 16:45 if you can, so the scene brief is ready by 17:05; if you choose to verify the channel, do it before 17:15.

This intake holds 3 decisions. Each carries its own context, so you can answer them in any order. An empty fence means not answered. The spec draft is at `canva-video\SPEC.md` for reference, but you needn't read it. Say "DI-XX is ready" when you're done.

# QXX.1 When you design in Canva on camera, and what

The charter's line for this video is "A recording of the operator designing in Canva, done near the end", and the project's definition of done wants it "on the site". It needs the Addvery templates in Canva first. Those are due for your brand sign-off at 16:45–17:00.

The proposed scene: during a recorded rig session (type `/start` if you're between sessions), you build one LinkedIn post or short carousel from the templates, using one of the LinkedIn posts as the copy, and export it. You say "Canva design starts now" at the start and "Canva design done" at the end, so the clip can be cut by those words. At about 17:05 the assistant sends you the one-page scene brief as a task in Operator tasks, with where to find the design link and a screen-care checklist. Your Canva account may show other clients' work, so you open the design by its link with the recording paused, and stay out of Canva's home page and project list on camera. After the scene, the clip waits until you `/stop` that session and type `/process`, as you do now.

The timetable changed at 14:30: you moved the GetSales live run to before 15:30, which freed 17:00–17:30.

Your options:

- **A. 17:15–17:40.** It leaves 15 minutes after the sign-off to fix the templates, and 17:40–18:00 for a retake and for `/stop` and `/process` before you leave.
- **B. 17:30–17:55,** the earlier proposal. More time to fix the templates, but almost no time for a retake before 18:00.
- **C. Another time, or something else to design.** Write the time, and what you'd rather design if not the above.

I recommend A. It uses the time the GetSales move freed and still leaves room to reshoot before you leave.

If the fence is empty: before 18:00 Prague the session keeps waiting and pokes you every 15 minutes; from 18:00 it moves the scene to the morning cleanup session and logs it.

This answer sets when you're on camera for the video and what you design.

Write A, B, or C and the time or what to design.

## AXX.1

`<operator_answer>`
```a-XX-1

```
`</operator_answer>`

# QXX.2 Verify your YouTube channel, or keep the video under 15 minutes

YouTube caps unverified channels at 15 minutes. The website assistant's notes say that until you switch on long uploads at https://www.youtube.com/verify, any longer video won't upload. The videos go on your main channel, the one you picked for every upload.

That cap isn't only this video's problem. The site's videos of your work sessions run 1 to 1.5 hours each, so unless you've already verified, none of them can upload either. Verifying takes a phone number and a few minutes (estimate), off camera, with the recording paused. No other part of the project asks you this.

Your options:

- **A. Verify the channel before 17:15.** This video can run longer than 15 minutes if the scene does, and every session video can upload too.
- **B. Keep this video under 15 minutes.** Nothing to do now. The cut trims the slow stretches (waiting, exporting) to fit. Session videos stay capped until you verify.
- **C. Something else.** Say what.

I recommend A. It's a few minutes off camera, and it lifts the cap for every video on the site, not just this one.

If the fence is empty: before 18:00 Prague the session keeps waiting and pokes you every 15 minutes; from 18:00 it takes B, keeps the video under 15 minutes, and logs it.

This answer decides how long this video can be, and whether the site's session videos can upload at all.

Write A, B, or C and what you want instead.

## AXX.2

`<operator_answer>`
```a-XX-2

```
`</operator_answer>`

# QXX.3 What the video shows: the screen or the webcam

The site shows the webcam, not the screen share: your call earlier today, which holds for every session video. A Canva design video shown as webcam only would show your face, not the design. The rig records the screen and the webcam as separate files (you chose a separate webcam file when you set the rig up), so both exist either way, and the clip finder cuts the screen clip with its matching webcam clip.

Whatever goes up, a check runs first: a frame at every scene change and at least every 5 seconds is checked for other clients' designs, Canva's home page or project list, secrets, the Apify proposal and your own GetSales outbound. Anything found is blurred or cut.

Your options:

- **A. The screen, with your webcam as a small inset in one corner,** for this one video. Every session video stays webcam-only. The assistant makes the inset locally, and the website assistant adds a screen-video upload to its flow.
- **B. The screen only.**
- **C. The webcam only,** as your standing call says, with a still of the finished design beside the video. Cheapest, but viewers don't see the design happen.
- **D. Something else.** Say what.

I recommend A. The definition of done asks for a recording of you designing, and only the screen shows the designing; the inset keeps your face in it, as the rest of the site does.

If the fence is empty: before 18:00 Prague the session keeps waiting and pokes you every 15 minutes; from 18:00 it puts C live, which keeps your standing call, leaves an A cut ready for the morning cleanup session to swap in on your word, and logs it.

This answer decides what the video's section on the site shows, and whether the website assistant adds a screen-video upload.

Write A, B, C, or D and what you want instead.

## AXX.3

`<operator_answer>`
```a-XX-3

```
`</operator_answer>`
~~~~

## S-D11 Brand motion demo with Comfy (run by this session; added by S2 as C15)

Row S-D11, deliverable D11, claims `DoD-23`: the chosen animation of one Addvery LinkedIn graphic (about 5 seconds) and a one-minute brand video, both made with Comfy, are on the site as a GTM demo entry. Depends on S-D6 (the graphics) and on Alex's pick from the ideas Doc. His scenes: picking the ideas, and running the Comfy work himself.

His words (DI-10 A10.11, `..\Operator tasks\Archive\Decide - everything left that needs you.md`): "I just need some brainstorming of what ideas I can do ... a little 5-second animation. Instead of just having a static image on LinkedIn, we can have a light shimmer. We can have the brand getting some kind of 3D texture to it. It kind of builds itself ... And then I want to create a one-minute video similar to the Gauss rocket thing." The reference is `C:\Users\alder\Desktop\Gauss Hero Animation\`, outside the repo; the Comfy skills listed in this session (comfy, comfy-director and the others) are the ones to name. Write the ideas in a Claude Doc (reset rule 4) and plan the rest of this section yourself, logged in your decision log.

### S-D11 plan (this session, 17:32)

**Operator scenes.** (1) Picking one idea for the 5-second post and one for the minute, as a comment on the ideas Doc. (2) Running the Comfy work himself, by hand, whenever suits him. (3) Saying where the finished files are, as another comment on that Doc. Nothing else needs him.

**Definition of done (S-D11).**

| Criterion | Traces to |
| --- | --- |
| Alex picked from a Claude Doc of 6 to 10 ideas covering both asks | DoD-23 |
| The 5-second animation of one Addvery LinkedIn graphic and the one-minute brand video exist, made by Alex with Comfy | DoD-23 |
| Both passed a design review and the screen-care check before upload | DoD-23; serves DoD-22 |
| Both are on YouTube, unlisted, and in the site's D11 entry (`BUILT S-D11-B1` received) | DoD-23 |

**Steps.**
- B1. A subagent drafts `comfy-motion\IDEAS.md` from read-only references: `C:\Users\alder\Desktop\Gauss Hero Animation\`, `C:\Users\alder\Desktop\Comfy UI\` (its own work-order rules, read first), the SKILL.md files of `comfy-director`, `comfy-first-last-storyboarding`, `comfy` and `comfy-relay` (read, not invoked), the website's brand kit (reset rule 6) and S-D6's build sheet. No generation, no credits. **Done 17:30:** 7 ideas (4 for the 5-second post, 3 for the minute), with picks and gaps.
- B2. At forking gate F0, the successor invokes `anthropic-skills:docs`, makes a Claude Doc from `IDEAS.md`, and saves its link in `local\comfy-doc.md`. It sends `answer-desk` `TASK s-d10-canva-video: Comfy brand-motion ideas are ready for you to pick: <Doc link>`. **Done 17:36** (successor da2b38ac): the Doc holds all seven ideas, the picks, the gaps and the sources, in plain words; the TASK line went out and the desk showed it.
- B3. His pick arrives as a comment on the Doc. Record it, verbatim, in `comfy-motion\PICK.md`, tell `orchestration`, and commit.
- B4. If he asks for more help on the picked ideas (a still list, prompts, a beat sheet), write it in `comfy-motion\` and add it to the same Doc. Comfy work runs from `C:\Users\alder\Desktop\Comfy UI\` under its own rules, by Alex. This session runs no `comfy` command, generates nothing and spends no credits.
- B5. When his comment says where the two videos are, a subagent that didn't make them looks at a frame at least every second of the 5-second clip and at least every 5 seconds of the minute. It checks for smeared or invented lettering, a wrong logo, and anything from DoD-22. Then run `design:design-critique` and `design:accessibility-review` on both (reset rule 5). Fixes go back to Alex as a Doc comment. He makes them; this session doesn't regenerate.
- B6. `site\d11.md`: a title and two lines per video, written only after invoking `design:ux-copy`. Send `website` `BUILD S-D11-B1: upload <the two files> to YouTube, unlisted, through your upload flow, and add a D11 entry, titled as in site\d11.md, in the deliverables area, with both videos. Content: canva-video\site\d11.md. Source: Alex, made with Comfy from the Addvery LinkedIn templates.` Wait for `BUILT S-D11-B1` or `REFUSED S-D11-B1`.
- B7. Send `orchestration` `DONE S-D11: <both videos live, BUILT S-D11-B1, YouTube ids>`.

**Files.** `comfy-motion\IDEAS.md` (the draft), `comfy-motion\PICK.md` (his pick), `site\d11.md`, and the Doc's link in `local\comfy-doc.md`. Videos are never committed; they stay where Alex made them until YouTube.

**Forking gates.** S-D11 shares S-D10's gates (§8). A fork's `HANDOFF.md` covers both.
