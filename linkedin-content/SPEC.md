# S-D7 LinkedIn content creation demo: executable spec

Status: ready for groundwork (part 1); the rest waits for its held intake (DI-XX, Appendix A) · Row: S-D7 — LinkedIn content creation demo · Folder: `linkedin-content\` · Session: `s-d7-linkedin-content`

This spec builds a demo of LinkedIn content written in Addvery's voice. It applies the method of Alex's own brand capture repo to his capture of Addvery, then writes and scores a handful of posts. It's aimed at Addvery's marketing side and leadership (the CMO and CEO first): posts that sound like Addvery, next to a generic AI post on the same topic, and how they were made. It lives on the site as a D7 section. Nothing is ever posted to LinkedIn.

## 1. Operator preflight (P3)

The intake is DI-XX: `..\Operator tasks\Decide - how the LinkedIn content demo works.md`, held in Appendix A until `orchestration` says go.

| Question (DI-XX) | Question | Default |
| --- | --- | --- |
| 1 | Which of his repos the demo is built on: `brand-voice-capture-demo-linkedin`, `subjective-taste-capture-demo`, both, or another | Both, taking whichever parts fit, named at the spec-draft gate |
| 2 | What the site may show from his brand capture | The posts and a general description of the method only; nothing from the capture |
| 3 | The brand sign-off slot, and whether the final posts may go ahead on the draft methodology if research is late | The sign-off stays open for the morning cleanup session |

**Launch gate, in two parts** (Alex, 14:38: "i'm swamped we need to remove blockers"; his brand capture landed at 15:40).
- **Part 1, now: groundwork that needs nothing from him.** The session launches before DI-XX is released and builds on the capture alone: the voice rules from the capture, the writing and scoring set-up, the baseline post and draft posts, all scored. It works from both repos, question 1's recommended reading; if Alex picks one, the set-up drops what came from the other. Nothing is published, and nothing goes into a tracked file before the sign-off: the rubric and the drafts stay in `local\` (git-ignored). No BUILD request and no operator task for Alex. It also sends its research request (§6).
- **Part 2, once DI-XX is answered and applied:** question 1's repo choice applied, what the site may show (question 2), the spec-draft gate, the brand sign-off in the question 3 slot, and the site request. If part 2 starts after 16:15, the spec draft goes to Alex inside the brand sign-off task, not as a task of its own, so he gets one task instead of two.
- **The session owns DI-XX.** It releases it from Appendix A when `orchestration` says go (`orchestration` knows when Alex is free and how many intakes are open). Then it watches the file every 300 seconds with the Monitor tool, applies each answer here, sets its Intake State to Answered, commits, and sends `answer-desk` `TASK DONE S-D7: Decide - how the LinkedIn content demo works.md` and `orchestration` `ARCHIVE Decide - how the LinkedIn content demo works.md: readers S-D7`. No pokes for DI-XX while it's open (Alex, 14:38). From 18:00 Prague an unanswered question takes its default, logged in §9.

**Operator scene.** The brand sign-off, proposed for 16:45–17:00, on camera, together with S-D6's sign-off (question 3). It takes about 10 minutes. The capture has an "Open for Alex" section of points he hasn't settled: the sign-off is where he settles them (run step 10). It stays there although the GetSales live run moved to before 15:30 (Alex, 14:30): research and about 45 minutes of writing come first. Alex reviews a gate-approval operator task holding the posts, the baseline and the scores.

**Off camera.** Nothing. The demo needs no keys, logins or connectors.

**Runtime questions** go to the desk as asker `S-D7`, ids `S-D7-Q1` onwards, one at a time (`..\answer-desk\ASKING.md`). After 15 minutes waiting on Alex for anything, send `POKE S-D7: waiting on you for <what>`, and again every 15 minutes. Before 18:00 Prague, keep waiting and do whatever doesn't depend on the answer. From 18:00, decide on the default and log it in §9.

## 2. Spec contract

| Item | S-D7's answer |
| --- | --- |
| 1. Its place | Row S-D7. Claims DoD-17. Reads DoD-11 (Alex's brand capture). Serves DoD-19 (the site's D7 section) and DoD-22 (nothing it publishes leaks). It claims neither. |
| 2. Its neighbours | Depends on the Addvery brand capture (which S-D7 reads: DoD-11, Alex's own, in `..\Addvery Research\`) and S1's research (L-05, L-01). Runs in parallel with S-D6 (`s-d6-canva-templates`; shared sign-off slot) and the rest of wave 2. Feeds the site, through `website`. Offers its posts to S-D6 and S-D10 (`s-d10-canva-video`) as sample copy, with no dependency either way. |
| 3. Operator preflight | §1 (DI-XX). |
| 4. Decision log | §9. |
| 5. Forking gates | §8. |
| 6. Working directory | `linkedin-content\`. Reading list §3, which matches its CLAUDE.md. |

## 3. Routing and resources

Paths are relative to `linkedin-content\`.

- `..\CHARTER.md`: the parent context. Read only, never edit.
- `..\SESSIONS.md`: the roster. Read it at startup and before messaging a session for the first time. Edit only S-D7's own row.
- `..\GIT.md`: shared working-tree rules. Commit only this folder, path-limited.
- `..\answer-desk\ASKING.md`: the desk format, gate approvals, TASK and ARCHIVE lines, the poke, the 18:00 rule.
- `..\answer-desk\qa\S-D7.md`: this spec's desk record. The desk creates it with the first question.
- `..\Operator tasks\Archive\INDEX.md`: Alex's answered intakes, verbatim. DI-XX joins it once archived. Never re-ask what they settle.
- `SPEC.md`: this file.
- `HANDOFF.md`, if it exists: state after a fork.
- `..\research\DIRECTORY.md`: S1's index of every report.
- Research findings: S2 adds a line here for each report when S1 sends FINDINGS for L-05 and L-01.
- `..\Operator tasks\Archive\Approve - Canva and LinkedIn demo research.md`: Alex's answer on the Canva and LinkedIn research list (OT-09), verbatim, with his change note. Read it for wording, never re-ask it.
- **L-01 findings** (S1's parent research, approved by Alex as OT-01; added by S2 as C07): for this spec, read the synthesis first, then R1 (AI labels), W3, R2 (Canva matched no GTM job post).
  - `..\research\global\L-01-synthesis.md`: S1's synthesis of the parent research: the strongest findings, recommendations per spec, and 24 one-line questions for Alex, each naming the spec it blocks. Start here: take this spec's section, and fold the questions that name it into your next gate. Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-R1-legibility.md`: making the work legible: outcome first, a short demo, a 3 to 4 step how-it-works; what reads as a toy or as noise; AI labels. Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-R2-gtm-engineer-hiring.md`: what a GTM engineer is hired to show, which deliverables fit it best, and the gaps none of them shows. Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-R3-personal-data.md`: personal data on a public site: GDPR, LinkedIn's terms, what the live run needs, and the safe, risky and keep-off table for stakeholder sections (section 7). Not legal advice. Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-R4-format-reception.md`: whether a site aimed at one employer lands: replies versus hires, when it turns creepy or self-indulgent, and the one small ask. Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-W1-wildcard-executed.md`: whether a dozen background sessions can run through the day and night: usage limits, Windows Update restarts, idle stops. Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-W2-wildcard-delivered.md`: what the six actually get from the alert: the link, the preview card, click timing, and the morning hand-over checklist (C7). Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-W3-wildcard-received.md`: whether AI-made work reads as skill or as a shortcut: the penalty bites on personal lines, not on the machinery. Options for Alex, not decisions. Read only; S1 owns it.
- `..\orchestration\_templates\Gate approval template.md` and `..\orchestration\check_gate.py`: the gate task and its 5-minute check, run from the repo root.
- `..\Addvery Research\`: Alex's brand capture (S-D7 reads DoD-11). S-D7 needs its voice part. Local disk only, read only, never from GitHub. Nothing from it is copied or quoted into a tracked file, beyond what question 2 allows. The capture landed at 15:40; read only the headings you need. Its "Open for Alex" section lists points he hasn't settled: part 1 takes a reading of each, and the sign-off puts them to him by heading only.
  - Files in it, as Alex's research session listed them at 15:33 (relayed by S-D1 as an OUTPUT line; added by S2 as C08). Read from disk only, never edit, never copy into a tracked file. A file marked expected doesn't exist yet: check for it, don't wait on it.
    - `..\Addvery Research\Brand capture.md`: Addvery's voice and visual identity, Alex's own brand capture. Still a draft: his review is pending, so treat it as provisional.
    - `..\Addvery Research\brand\raw\logo.png`: Addvery's logo, as Alex's research saved it. Never committed to a tracked file.
    - `..\website\local\addvery\brand\BRAND.md`, `..\website\local\addvery\brand\tokens.css` and `..\website\public\addvery\` (24 files: logos, favicons, 10 icons, glows): the website session's brand kit, read from Addvery's public site (OUTPUT S-D8; added by S2 as C09). Each value carries its source URL and a confidence note; the tokens file holds the CSS variables (--av-*). Fonts: the two free families are exact, and free stand-ins cover the commercial heading face and the body face (names in BRAND.md, never in tracked files). It agrees with Alex's brand capture, which comes first where they differ. Git-ignored, local only: read it, never copy it into a tracked file.
    - `..\Addvery Research\linkedin-posts\`: Addvery's company and growth-lead LinkedIn posts, with translations: the company's voice in practice. Read for voice only; never repost or quote them on the site.
- Alex's public repos `brand-voice-capture-demo-linkedin` and `subjective-taste-capture-demo` (question 1 says which): read through L-05's R1 report. Use `gh`, read only, only for a detail the report lacks.
- `C:\Users\alder\Desktop\Atlas OS\Projects\PROJ_Client Demo\Research\`: Alex's earlier research on rubric extraction, outside the repo, local disk only (checked: it exists). Read through L-05's R4 report, which reads it first; never copy from it into a tracked file.

Step 1 of the run confirms every resource is reachable and turns anything ambiguous into a desk question. Inputs other specs produce later are named in the steps that use them: S-D6's template previews (run step 11).

**Outputs.** What this spec creates, in `linkedin-content\` unless named otherwise:
- `HANDOFF.md`: written at each fork (§8).
- `PIPELINE.md`: how posts are written and scored: the method, the prompts, the bar.
- `demo\posts.md`: the signed-off posts, with format and score, copied from `local\drafts\` once the sign-off is approved. S-D6 and S-D10 may read it.
- `demo\baseline.md`: the generic post on the same topic, scored the same way.
- `demo\method.md`: how it was made, for the site.
- `demo\voice.md`: only if question 2 allows; a fresh summary of the voice.
- `local\`: git-ignored; the rubric (`local\rubric.md`), draft posts and baseline before the sign-off (`local\drafts\`), judge notes.
- `.gitignore`: covers `local/`.
- In `..\Operator tasks\`: the two gate tasks, `Approve - the plan for the LinkedIn posts demo.md` and `Approve - the LinkedIn posts in the Addvery voice.md`.

## 4. Problem and scope

**The problem.** AI-written LinkedIn posts sound like every other AI-written post. A brand team wants posts that sound like the brand, and a way to check that they do. Alex's brand capture repo has a method for this. The demo applies it to Addvery and makes the difference visible to someone who reads the site for a minute.

**In scope.**
- A voice rubric built from Alex's capture with his repo's method (question 1).
- About five posts in Addvery's company voice, in at least two LinkedIn formats (for example a text post and the copy for a document carousel), each scored against the rubric.
- One generic baseline post on the same topic as one of them, scored the same way, for contrast.
- The D7 section on the site, through `website`.

**Out of scope.**
- Researching Addvery's voice. That's Alex's own work (DI-3 Q3.3).
- Posting to LinkedIn, automation sending, or connecting anyone else's LinkedIn account (charter Scope). The session never opens LinkedIn at all.
- Real data: no post names a real person, including the six stakeholders, or a client (charter Scope).
- Writing in any individual's personal voice.
- The visual templates (S-D6) and the Canva video (S-D10).

## 5. Definition of done

| Criterion | Traces to |
| --- | --- |
| A voice rubric, built with the method of Alex's brand capture repo (question 1) from his capture, exists in `local\` | DoD-17 (reads DoD-11) |
| About five posts in Addvery's voice, in at least two formats, each scored against the rubric by a judge that didn't write it and passing the bar in `PIPELINE.md`, plus the scored baseline | DoD-17 |
| Alex's brand sign-off is recorded: the sign-off gate task is approved and archived | DoD-17 |
| The site's D7 section shows the posts, the baseline contrast and how they were made (`BUILT S-D7-B1` received) | DoD-17; serves DoD-19 |
| Nothing was posted or sent anywhere; no real person is named; nothing from the capture is published beyond what question 2 allows | serves DoD-22; the charter's Scope |

## 6. Research step

At launch, the session sends `s1-research` exactly one line:

`RESEARCH S-D7: L-05 (offered merged with S-D6 and S-D10) plus L-01, Alex's brand capture repos and the current state of writing LinkedIn posts in a brand's voice decide the pipeline and the scoring bar (R1 and R4 first), needed by 16:15`

Approving the list is S1's gate, not this session's.

**Goes ahead while research runs:** all of part 1 (§1): step 1's checks, reading the capture, the voice rules, the writing and scoring set-up on the draft method, the baseline and the draft posts.

**Waits for FINDINGS:** the method itself (R1: what the repos do and how they score), the formats LinkedIn rewards now (R4), and the scoring bar. Part 1's drafts are revised and re-scored when they land.

**If research is late** for the 16:45 sign-off, question 3 decides. Under A, if the findings aren't in by 16:00, the session writes on the draft methodology below, waiting only for R1, applies later findings after the sign-off as changes Alex sees, and says in the gate task which choices weren't yet backed by research. Under B, it waits, and the sign-off slips.

## 7. Methodology and steps

**Draft methodology.** The session confirms or revises it once the synthesis lands, then runs the coherency check.
1. **Method from the repo.** From R1: how the repo captures a voice (traits, word lists, examples, anti-patterns) and how it scores a draft. Write it into `PIPELINE.md`, with the scoring bar.
2. **Rubric.** Apply that method to the voice part of Alex's capture. The rubric goes in `local\rubric.md`, never in a tracked file. If question 2 allows, also write a fresh summary of the voice, in the session's own words, for the sign-off; it goes to `demo\voice.md` once approved.
3. **Topics.** Pick about five topics from the themes in the capture. No real people, no clients.
4. **Write.** One writer subagent per post, handed the rubric, the topic and the format notes from R4.
5. **Judge.** A separate subagent scores each post against the rubric and names each miss. Rewrite and re-score until it passes the bar, at most three rounds. Keep the scores for the demo.
6. **Baseline.** One post on one of the same topics from a plain prompt with no rubric, scored by the same judge. The gap between the two is the demo.
7. **Demo content.** Drafts in `local\drafts\` until the sign-off; then `demo\posts.md`, `demo\baseline.md`, `demo\method.md`, and `demo\voice.md` if allowed.

**Coherency check:** "if we execute this methodology, will that DoD be satisfied?" Rubric: steps 1 and 2. Scored posts and baseline: steps 3 to 6. Sign-off: run step 10. The site: run step 11. Nothing posted, nothing leaked: the rules below and run step 12. Run it again after the synthesis; any gap becomes a change before the spec-draft gate.

**How a gate runs** (`..\answer-desk\ASKING.md`, Alex's readability rule of 2 Nov). Freeze the document into `..\Operator tasks\Approve - <what, in plain words>.md`, written from the gate approval template. Each gate's plain name is in its step below. The next free OT number (check `Operator tasks\` and `Operator tasks\Archive\` just before writing) goes in the front matter only. The file opens with `## What this is`: in plain words, with no codes (no spec, DoD or OT ids, no session names), what the posts demo is for in the job application, what he's approving, what happens next, what's waiting on it, about how long it takes him, and the deadline. The frozen document follows, copied in whole. Commit that file first, on its own and path-limited, so the snapshot names a commit. Send `answer-desk` `TASK S-D7: <plain file name> is waiting on you: <what it decides and unblocks>`. While blocked, wait with the Monitor tool running `python -I orchestration\check_gate.py "Operator tasks\<plain file name>"` from the repo root every 300 seconds until it exits 0. Poke after 15 minutes. On `CHANGES`, apply them, refresh the snapshot and wait again. Then send `TASK DONE S-D7: <plain file name>` to `answer-desk` and `ARCHIVE <plain file name>: readers <spec ids>` to `orchestration`.

**Run steps.** Commit after every finished step, path-limited: `git commit -m "[linkedin-content] <message>" -- linkedin-content/...`.

*Part 1, now (§1).*
1. Read the reading list, and `HANDOFF.md` if it exists. Confirm every resource is reachable. Create `.gitignore` (`local/`) and `local\`. Commit.
2. Send the RESEARCH line (§6).
3. Read the voice part of the capture from the local disk, headings first. Build the voice rubric with the method of both repos (methodology steps 1 and 2) into `local\rubric.md`, and list the capture's open points, by heading, in `local\open-points.md` with the reading the rubric takes for each. Nothing from it goes into a tracked file. Commit `PIPELINE.md` only.
4. Delegated (P1, P7): one subagent writes the baseline; writer subagents in parallel draft about five posts, one each; a judge subagent that wrote none of them scores every draft and the baseline. Each is handed only the rubric, `PIPELINE.md` and its own inputs, and writes to `local\drafts\`.
5. Send `s-d6-canva-templates` and `s-d10-canva-video` `COPY S-D7: draft posts in ..\linkedin-content\local\drafts\posts.md, not signed off; free to use as sample copy, read only`.
6. When the synthesis lands, or at the question 3 cutoff: confirm or revise the methodology, run the coherency check, finish `PIPELINE.md`, and rewrite and re-score the drafts. Commit `PIPELINE.md`.
7. When `orchestration` says go, release DI-XX from Appendix A, as its header says, and watch it (§1). Keep improving the drafts while it's open.

*Part 2, once DI-XX is answered and applied.*
8. Apply DI-XX's answers here and in `local\`: question 1's repo choice to the rubric and `PIPELINE.md`, question 2's limit to the demo content. Re-score if the rubric changed. Commit.
9. **Gate: spec draft.** Freeze the whole SPEC.md (problem, scope, its own DoD, the research verdicts, the methodology) into `Approve - the plan for the LinkedIn posts demo.md`, as above, with a five-line plain summary first. If part 2 started after 16:15, fold it into the brand sign-off task instead (§1). Under question 3's A, the final posts go ahead on the frozen methodology while the gate is open, and changes from the gate are applied to the posts they touch. From 18:00, an open spec-draft gate means proceed on the checked methodology and log it.
10. **Gate: brand sign-off** (DoD-17), in the question 3 slot. `Approve - the LinkedIn posts in the Addvery voice.md` holds the posts, the baseline, the scores, the method, and the voice summary if question 2 allows it. It lists the capture's open points by heading only, with the reading the posts took, never their text, so Alex settles them here. Tell `s-d6-canva-templates` when its TASK line is sent, so both arrive together. Wait as above. On `CHANGES`, rewrite, re-score and refresh. On approval, copy the posts, baseline, method and any voice summary into `demo\` and commit; send `COPY S-D7` again with `..\linkedin-content\demo\posts.md`, signed off. Then `TASK DONE S-D7: Approve - the LinkedIn posts in the Addvery voice.md`, and `ARCHIVE Approve - the LinkedIn posts in the Addvery voice.md: readers S-D7`. From 18:00, an open sign-off stays open for the morning cleanup session while the rest carries on.
11. **Site request.** If S-D6's previews exist by then, in `..\canva-templates\exports\` (read only), say in the request which post pairs with which template. Send `website`: `BUILD S-D7-B1: add a D7 section, LinkedIn content in Addvery's voice, in the deliverables area: the posts as LinkedIn-style cards with their scores, the generic baseline beside one of them, and a short how-it-was-made panel. Content: linkedin-content\demo\. Source: posts written by S-D7 in Addvery's voice and signed off by Alex in Approve - the LinkedIn posts in the Addvery voice.md; <question 2's answer, quoted, if it allows the voice summary>; no research from Addvery Research.` Wait for `BUILT S-D7-B1` or `REFUSED S-D7-B1` before any next request.
12. A subagent checks every committed file for text copied from the capture, real names, links to Alex's accounts and secrets. Fix and commit.
13. When §5 is met, send `orchestration` `DONE S-D7: <posts and baseline on the site, their brand sign-off approved, BUILT S-D7-B1>`.

**Screen care (every step).** Assume anything on screen can be published. The session never opens LinkedIn, Alex's or anyone's. The capture is read from disk and never shown or quoted in a tracked file. Never open the Apify proposal or Alex's own GetSales outbound.

## 8. Forking gates (P8)

| Gate | When |
| --- | --- |
| F1 | The brand sign-off is approved. The writing is done; the site and the final check remain. |
| F2 | Shortly before 18:00 Prague (about 17:50), so the overnight session starts clean (P6). |
| F3 | Context about half full, whatever else is happening. |

**How it forks.**
1. Write `HANDOFF.md`: the state of each post and its score; open questions and gates with their times; pokes in progress; BUILD requests awaiting a reply; decisions since the last fork. Commit it.
2. From `linkedin-content\`, launch the successor under the same name: `claude --bg -n s-d7-linkedin-content "Read CLAUDE.md, then HANDOFF.md. You are now the active S-D7 session."`
3. Update S-D7's row in `..\SESSIONS.md` with the handoff time, and commit it on its own: `git commit -m "[roster] ..." -- SESSIONS.md`.
4. Announce the handoff to `s-d6-canva-templates`, `s-d10-canva-video`, `website`, `s1-research`, `orchestration`, and `answer-desk` if a question or task is open.
5. The old session stops itself with `claude stop` and its own exact id.

## 9. Decision log (P5)

Before 18:00 Prague, a passed deadline means poke, not decide. From 18:00, decide on the default, log it here, and send `WITHDRAW <id>` for a desk question. Start each decision with the time and the question id.

| Decision | Justification | Why it's the right call | Blast radius if changed |
| --- | --- | --- | --- |
| 2 Nov, drafting (wave2-specs): the posts are in Addvery's company voice, not any named person's, and the site labels them as a demo. | The charter says "Addvery's voice". Writing as a real person on a public site reads as impersonation. | It shows the skill without putting words in anyone's mouth. | A personal-voice variant would need its own capture and Alex's say. |
| 2 Nov, drafting (wave2-specs): the demo is static (posts written in advance), with no live generator on the site. | A live generator needs an API key on Vercel and a public endpoint anyone can call. | Legibility matters more than function (charter), and static pages cost nothing to run. | Adding a live generator later means a key, a rate limit and a website change. |
| 2 Nov, drafting (wave2-specs): about five posts in at least two formats, plus one generic baseline for contrast. | Five fit the time before 16:45; the baseline is what makes the difference visible. | A visitor sees the gap in seconds. | More posts adds writing time only. |
| 2 Nov, drafting (wave2-specs): writer and judge are separate subagents, with at most three rewrite rounds. | A writer marking its own work is weak evidence. | The scores on the site mean something. | None beyond the pipeline's time. |
| 2 Nov, drafting (wave2-specs): the rubric stays in `local\`, git-ignored; only question 2 can put a voice summary on the site. | The brief: nothing from `Addvery Research\` goes into a tracked file. The website session refuses builds that publish that research. | It keeps Alex's capture out of the public repo while the posts still show it working. | Allowing a summary adds one file and one line in the BUILD request. |
| 2 Nov, drafting (wave2-specs): the posts are offered to S-D6 and S-D10 as sample copy, with no dependency. | Copy and visuals together make a complete LinkedIn post. | It links the three demos without one waiting on another (P1). | None: either spec can ignore the offer. |
| 2 Nov 15:45 (wave2-specs): the launch gate splits in two. Part 1 starts now on the capture alone: voice rules, the writing and scoring set-up, the baseline and draft posts, on both repos, with nothing published or committed from the drafts before the sign-off. Part 2 waits for DI-XX, which this session releases on `orchestration`'s go, watches without pokes, and archives. The intake's question on when the capture lands is dropped; the capture's open points go to Alex at the sign-off. | Alex, 14:38: "i'm swamped we need to remove blockers". His brand capture landed at 15:40 (`..\Addvery Research\Brand capture.md`). `orchestration` allows no new intake while he's on his Addvery research. | Everything that needs only the capture gets written and scored while he's busy, so his answers shape the finished demo instead of starting it. He settles the open points once, with the posts in front of him. | If he picks one repo, or changes what the site may show, the rubric and drafts are revised and re-scored; nothing is on the site or in the repo before part 2. |
| 2 Nov 16:00 (S-D7, part 1): the rubric's brand layer is constructed from the capture's voice section (four brand disqualifiers, seven brand-voice criteria), on top of the floor criteria carried verbatim from Alex's public rubric v2.1. Four tiers (Unpostable, Postable, Good, Great), 21 criteria. Alex's own voice criteria are dropped under his repo's voice-authority rule. | Alex's method induces criteria from graded posts; no graded Addvery posts exist, and research (L-05) is still at his gate. Both repos carry the same rubric, so "both" costs nothing until question 1 is answered. | It follows his method where it can (two views, floor plus voice layer, disqualifiers first, arithmetic checks, a naive baseline) and says plainly where it can't (no validation numbers). | If R1 or Alex changes the method, the rubric is revised in `local\` and the posts re-scored; nothing is published yet. |
| 2 Nov 16:00 (S-D7, part 1): readings where the capture is silent: English posts, Addvery's company page as "we", at most one bold phrase, no or few hashtags, illustrative numbers never framed as a client result. Listed in `local\open-points.md` for the sign-off. | The site is in English; the decision log already rules out a named person's voice; the charter rules out real data. | Each is the cautious reading, and each is cheap to change at the sign-off. | One post redone per changed reading; a Czech version would need a Czech judging pass. |
| 2 Nov 16:00 (S-D7, part 1): the baseline is written by the same model from a plain one-line prompt, with no rubric, and the judge scores all six posts blind, relabelled and shuffled. | Alex's repo used zero-skill baselines and blind judges, bodies only. | The only difference between the baseline and the posts is the rubric, so the score gap is the rubric's doing, not a weaker model's. | None beyond re-running the judge. |
| 2 Nov 16:13 (S-D7, part 1): rubric v0.2 adds collection rules: across the set, no two asides, openers, click lines or closers share a phrase or a construction. Round 2 assigns each post its own. | The blind judge found every round-1 writer had reused the rubric's own examples ("we know how that sounds", "Here's what…", a Monday task). | A set that repeats itself reads as a template, which is the thing the demo argues against. It's also a story the demo can tell: the judge caught the writers copying the rubric. | None; round 2 is re-judged blind. |
| 2 Nov 16:28 (S-D7, part 1): round 3, the last allowed, is a set-level edit pass made by this session from one plan (each post's opener, click-line device, aside and closing frame assigned so none share a construction), plus the judge's line fixes. It's not a fresh writer pass. Rubric v0.3 moves the closer rule from the writing view into the grading view. | Round 2's standalone misses were single lines, and its set failure came from this session's own assignments (four click lines all "the N things we do first"). Writers re-improvising would risk new collisions in the last round. | The judge is still a fresh blind subagent that wrote nothing, so the scores stay independent; only who typed the line edits changes. | The method page says so; a post still below Good after round 3 is dropped, per the bar. |
| 2 Nov 16:40 (S-D7, on `orchestration`'s instruction): Alex's research-gate note (16:32) asked for the LinkedIn demo for one named Addvery leader, "like a possible branding strategy but that's lower priority", and ended "just run. Go, go, go". Option (a) is taken without a desk question: the company-voice set stays the public LinkedIn section; a personal-brand part for that leader (a short strategy plus two sample posts, labelled as a proposal drafted with AI under Alex's direction, never posted) is built in `local\` only, and held from the site and from every tracked file, her name included. Whether any of it reaches her stakeholder section goes to Alex in one line inside the brand sign-off or the held intake, whichever goes first. | He asked for it, called it lower priority, and asked not to be slowed down. The company set is near-final, and the site's rules hold named content until the person has had notice. | It gives him the direction he asked for without putting words in a real person's mouth on a public page before he and she have seen it (L-01 R3, R4, W3). | If he wants it public, it goes to her stakeholder section through `website`, after notice; if he wants the whole demo switched to her, the company set becomes the secondary part. |
| 2 Nov 16:40 (`orchestration`): the 16:45 sign-off slot is dropped. The brand sign-off goes out once Alex has ticked the GetSales pre-send gate, as one gate with the Canva templates if both are ready. This session tells `orchestration` when it's ready and waits for the go. | Alex is on another gate, and two intakes are open. | One brand review instead of two, when he has the attention for it. | The sign-off may land after 18:00; then it stays open for the morning cleanup session (question 3's default). |
| 2 Nov 17:15 (S-D7, under Alex's reset rules of 17:00 and `orchestration`'s RESTART): the held intake (Appendix A) is never released. Its questions and L-05's Q8 to Q11 are decided here as easy calls. (1) The site credits `brand-voice-capture-demo-linkedin`; the method came from its pages, and it carries the same rubric as its earlier twin. (2) The site may show the posts, their scores, the fair baseline and a five-rule voice summary written fresh in the session's words (public sources, reset rule 3), with no quotes. (3) Scores read as rule adherence, "meets 21 of 21 voice rules, 0 AI tells", with one line that this shows rule-following, not proof it sounds like Addvery (L-05 R4). (4) The calibration against real company posts stays local, and the site never contrasts the posts with Addvery's own (L-05 W3). (5) The posts keep the leaders' register (short sentences, one dry aside), stay in English, and are framed as a tool Addvery's team would keep. (6) The personal-brand part stays private, lowest priority (Alex's intake Q10.8 default, relayed by `orchestration`). The brand sign-off is Alex's comment on a Claude Doc, not a gate file; the gate draft in `local\signoff\` is superseded. | Alex, 17:00: "If things are an easy judgment please clear the plate for me. We can just make edits later." No plan approvals go to him; public sources may be published. | Every call is reversible on his Doc comment, and each is the reading the research supports. | (1) one credit line; (2) drop the voice-summary panel; (3) the score label; (5) re-score at most; (6) none until he asks. |
| 2 Nov 17:20 (S-D7, successor session 9e96773b): the sign-off Doc holds each post as an exact text block (what would be pasted to LinkedIn), each carousel's slide text as an editable block with its images above it, and the private calibration result, marked as never on the site. The carousel images live in `demo\slides\`, git-ignored, and the site reads them from disk. `demo\method.md` names the repo without a link and leaves out the calibration and the formal-page comparison. | The slides carry Addvery's logo and brand assets, which the website keeps git-ignored (`website\.gitignore`: `public/addvery/`, `local/`). Decision (4) at 17:15 keeps the site from contrasting the posts with Addvery's own. | Exact text blocks make Alex's edits read back into the repo without guessing at line breaks. The images reach the site without putting brand assets in the public repo. | Committing the images means deleting one `.gitignore` line; a link to the repo is one line in `method.md`. |

## Appendix A. Held preflight intake

This spec's preflight intake is drafted but not yet in front of Alex (Alex, 14:38: "i'm swamped we need to remove blockers"; orchestration: at most two wave-2 preflight intakes open at once, none new while he's on his Addvery research). **Release it when `orchestration` says go**: it knows when Alex is free and how many intakes are open. This spec's session releases it (`orchestration` does, if the session isn't running): take the next free DI number from the `Intake id:` lines in `..\Operator tasks\` and `..\Operator tasks\Archive\`, replace `XX` in the forms `DI-XX`, `QXX.`, `AXX.` and `a-XX-` with it, and save the text below as `..\Operator tasks\Decide - how the LinkedIn content demo works.md`. Recheck any times in it against the clock first. Commit it path-limited, put the DI number into §1 and the status line, and send `answer-desk` `TASK S-D7: Decide - how the LinkedIn content demo works.md is waiting on you: <what it decides and unblocks>`.

~~~~markdown
---
System Primitive: Intake file
Intake State: Waiting on operator
Intake id: DI-XX
Created: 2026-11-02
Build goals: []
---

<!-- File name: "Decide - how the LinkedIn content demo works.md" -->

# Decide: how the LinkedIn content demo works

## What this is

The site you're building today is a personalised job application to Addvery, made live during a 12-hour recorded hackathon. One part of it is a demo of LinkedIn posts written in Addvery's voice. About five posts are shown next to a generic AI-written post on the same topic, with a short panel on how they were made. It's built on the method from your own public brand capture repo, applied to your capture of Addvery. It shows Addvery's marketing side and leadership that you can make AI writing sound like their brand, and prove it with scores. Nothing is ever posted to LinkedIn; the demo lives on the site.

Your Addvery brand capture is done, so the assistant has already started on everything that needs nothing from you: it has turned the voice part of your capture into voice rules, using both of your brand capture repos for now, and is writing and scoring draft posts and the generic post. Nothing is on the site or in the public repo yet.

You're asked three things: which of your repos it's built on, what the site may show from your capture, and when you sign the posts off. Your answers shape the finished demo, its section on the site and the sign-off. Your capture lists some points you haven't settled yet; the posts take one reading of each, and you settle them at the sign-off, with the posts in front of you.

It needs you on camera once, for about 10 minutes: the brand sign-off, proposed for 16:45–17:00, together with the sign-off of the Canva templates. This intake takes you about 3 minutes. Answer as soon as you can, so the posts are final before the sign-off.

This intake holds 3 decisions. Each carries its own context, so you can answer them in any order. An empty fence means not answered. The spec draft is at `linkedin-content\SPEC.md` for reference, but you needn't read it. Say "DI-XX is ready" when you're done.

# QXX.1 Which of your repos the demo is built on

The charter says this demo "References the operator's subjective brand capture repo on GitHub", and the project's definition of done says it is "built on the operator's brand capture repo". Two of your public repos fit that description: `brand-voice-capture-demo-linkedin` and `subjective-taste-capture-demo`. The research for the three brand demos reads both. Until you answer, the assistant drafts with both, so nothing waits on this. The demo on the site will say which repo it's built with.

Your options:

- **A.** `brand-voice-capture-demo-linkedin`.
- **B.** `subjective-taste-capture-demo`.
- **C. Both,** taking whichever parts fit, for example the voice rules from one and the scoring from the other. You see what it took from each when the plan comes to you for approval.
- **D. Another repo.** Name it.

I recommend C, because both names match the charter's words, and it commits to nothing before research has read them. If you meant one of them, A or B saves a step.

If the fence is empty: before 18:00 Prague the session keeps waiting, without poking you; from 18:00 it takes C and logs it.

This answer decides the method the posts are written and scored with, and what the site credits.

Write A, B, C, or D and the repo.

## AXX.1

`<operator_answer>`
```a-XX-1

```
`</operator_answer>`

# QXX.2 What the site may show from your brand capture

The posts are new writing, not your capture. But the demo reads best when it shows its work: the voice rules the posts were written to, next to the posts that meet them. The charter puts it as "legibility matters more than function".

Your capture sits in the Addvery Research folder, which you keep out of the public repo. Earlier today you said of that folder: "it'll be getting ignored from the public repo". The website assistant's rules have it refuse any build that "would publish research from" that folder, so it needs your answer here before it shows anything drawn from the capture.

Your options:

- **A. The posts only,** plus a general description of the method (capture, voice rules, writing, scoring). Nothing from your folder is published.
- **B. The posts, plus a short summary of the voice:** about five traits, freshly written in the assistant's own words, with no quotes from your capture. You see the exact words at the brand sign-off before anything goes live, and the build request quotes your answer here.
- **C. The posts, plus quoted excerpts from your capture.**
- **D. Something else.** Say what.

I recommend B. It shows the work, which is what makes the demo legible, and you approve every word at the sign-off.

If the fence is empty: before 18:00 Prague the session keeps waiting, without poking you; from 18:00 it takes A and logs it.

This answer decides what the demo's section on the site shows, and what goes into the public repo.

Write A, B, C, or D and what you want instead.

## AXX.2

`<operator_answer>`
```a-XX-2

```
`</operator_answer>`

# QXX.3 When you sign off the posts, and what happens if research is late

The project's definition of done needs your brand sign-off: "A demo of LinkedIn content created in Addvery's voice, built on the operator's brand capture repo, has his brand sign-off and is shown on the site." The assistant sends it to you as an approval file in Operator tasks holding the posts, their scores, the generic post and how they were made. You tick "I approve" or write changes: about 10 minutes (estimate).

The proposed slot is 16:45–17:00, on camera, together with the Canva templates sign-off, so you review the brand once for both. It comes after the third blog dictation (16:20–16:40). The GetSales live run has moved to before 15:30, so 17:00–17:15 is free if the review runs over. The draft posts are already being written and scored.

The research reads your brand capture repos and checks what's current in writing LinkedIn posts in a brand's voice. It may not be finished before the final posts have to be ready.

Your options:

- **A. 16:45–17:00, and go ahead on the draft method if research is late.** If the findings aren't in by 16:00, the assistant finishes the posts on its draft methodology so the slot holds. It waits only for the reading of your repos. Findings that land later are applied after your sign-off, as changes you see.
- **B. 16:45–17:00, but only on finished research.** If the findings are late, the sign-off slips to 17:40–18:00 or to the morning cleanup session.
- **C. Another time.** Write it.

I recommend A. It keeps your brand review in one sitting with the Canva templates. Signing off the definition of done earlier today, you said the research rules may soften when time is short: "I might soften that and change the research rules especially if we're running low on time."

If you've already answered this in the Canva templates intake, "same as the templates" is enough.

If the fence is empty: before 18:00 Prague the session keeps waiting, without poking you; from 18:00 it leaves the sign-off open for the morning cleanup session while the rest of the work carries on, and logs it.

This answer sets when you're on camera for the posts, and whether the final posts may go ahead before research is complete.

Write A, B, C and the time, or "same as the templates".

## AXX.3

`<operator_answer>`
```a-XX-3

```
`</operator_answer>`
~~~~
