# S-D7 LinkedIn content creation demo: executable spec

Status: draft; preflight DI-XX waiting on Alex · Row: S-D7 — LinkedIn content creation demo · Folder: `linkedin-content\` · Session: `s-d7-linkedin-content`

This spec builds a demo of LinkedIn content written in Addvery's voice. It applies the method of Alex's own brand capture repo to his capture of Addvery, then writes and scores a handful of posts. It's aimed at Addvery's marketing side and leadership (the CMO and CEO first): posts that sound like Addvery, next to a generic AI post on the same topic, and how they were made. It lives on the site as a D7 section. Nothing is ever posted to LinkedIn.

## 1. Operator preflight (P3)

The intake is DI-XX: `..\Operator tasks\Decide - how the LinkedIn content demo works.md`.

| Question (DI-XX) | Question | Default |
| --- | --- | --- |
| 1 | Which of his repos the demo is built on: `brand-voice-capture-demo-linkedin`, `subjective-taste-capture-demo`, both, or another | Both, taking whichever parts fit, named at the spec-draft gate |
| 2 | When the voice part of his brand capture lands, and what to do until then | Wait for it, building the pipeline and the baseline meanwhile; the sign-off moves with it |
| 3 | What the site may show from his brand capture | The posts and a general description of the method only; nothing from the capture |
| 4 | The brand sign-off slot, and whether writing may start on the draft methodology if research is late | The sign-off stays open for the morning cleanup session |

**Launch gate.** The session launches once DI-XX is answered and its answers are applied. From 18:00 Prague, an unanswered question takes its default, logged in §9.

**Operator scene.** The brand sign-off, proposed for 16:45–17:00, on camera, together with S-D6's sign-off (question 4). It takes about 10 minutes. It stays there although the GetSales live run moved to before 15:30 (Alex, 14:30): research and about 45 minutes of writing come first. Alex reviews a gate-approval operator task holding the posts, the baseline and the scores.

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
- `..\orchestration\_templates\Gate approval template.md` and `..\orchestration\check_gate.py`: the gate task and its 5-minute check, run from the repo root.
- `..\Addvery Research\`: Alex's brand capture (S-D7 reads DoD-11). S-D7 needs its voice part. Local disk only, read only, never from GitHub. Nothing from it is copied or quoted into a tracked file, beyond what question 3 allows. It may not be ready yet (question 2).
- Alex's public repos `brand-voice-capture-demo-linkedin` and `subjective-taste-capture-demo` (question 1 says which): read through L-05's R1 report. Use `gh`, read only, only for a detail the report lacks.
- `C:\Users\alder\Desktop\Atlas OS\Projects\PROJ_Client Demo\Research\`: Alex's earlier research on rubric extraction, outside the repo, local disk only (checked: it exists). Read through L-05's R4 report, which reads it first; never copy from it into a tracked file.

Step 1 of the run confirms every resource is reachable and turns anything ambiguous into a desk question. Inputs other specs produce later are named in the steps that use them: S-D6's template previews (run step 8).

**Outputs.** What this spec creates, in `linkedin-content\` unless named otherwise:
- `HANDOFF.md`: written at each fork (§8).
- `PIPELINE.md`: how posts are written and scored: the method, the prompts, the bar.
- `demo\posts.md`: the signed-off posts, with format and score. S-D6 and S-D10 may read it.
- `demo\baseline.md`: the generic post on the same topic, scored the same way.
- `demo\method.md`: how it was made, for the site.
- `demo\voice.md`: only if question 3 allows; a fresh summary of the voice.
- `local\`: git-ignored; the rubric, drafts, judge notes.
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
| Nothing was posted or sent anywhere; no real person is named; nothing from the capture is published beyond what question 3 allows | serves DoD-22; the charter's Scope |

## 6. Research step

At launch, the session sends `s1-research` exactly one line:

`RESEARCH S-D7: L-05 (offered merged with S-D6 and S-D10) plus L-01, Alex's brand capture repos and the current state of writing LinkedIn posts in a brand's voice decide the pipeline and the scoring bar (R1 and R4 first), needed by 15:45`

Approving the list is S1's gate, not this session's.

**Goes ahead while research runs:** step 1's checks; the pipeline's skeleton (writer and judge subagents, output files); the baseline post, which needs no capture; reading the capture once it lands.

**Waits for FINDINGS:** the method itself (R1: what the repos do and how they score), the formats LinkedIn rewards now (R4), and the scoring bar.

**If research is late** for the 16:45 sign-off, question 4 decides. Under A, if the findings aren't in by 16:00, the session writes on the draft methodology below, waiting only for R1, applies later findings after the sign-off as changes Alex sees, and says in the gate task which choices weren't yet backed by research. Under B, it waits, and the sign-off slips.

## 7. Methodology and steps

**Draft methodology.** The session confirms or revises it once the synthesis lands, then runs the coherency check.
1. **Method from the repo.** From R1: how the repo captures a voice (traits, word lists, examples, anti-patterns) and how it scores a draft. Write it into `PIPELINE.md`, with the scoring bar.
2. **Rubric.** Apply that method to the voice part of Alex's capture. The rubric goes in `local\rubric.md`, never in a tracked file. If question 3 allows, also write a fresh summary of the voice, in the session's own words, to `demo\voice.md` for the sign-off.
3. **Topics.** Pick about five topics from the themes in the capture. No real people, no clients.
4. **Write.** One writer subagent per post, handed the rubric, the topic and the format notes from R4.
5. **Judge.** A separate subagent scores each post against the rubric and names each miss. Rewrite and re-score until it passes the bar, at most three rounds. Keep the scores for the demo.
6. **Baseline.** One post on one of the same topics from a plain prompt with no rubric, scored by the same judge. The gap between the two is the demo.
7. **Demo content.** `demo\posts.md`, `demo\baseline.md`, `demo\method.md`, and `demo\voice.md` if allowed.

**Coherency check:** "if we execute this methodology, will that DoD be satisfied?" Rubric: steps 1 and 2. Scored posts and baseline: steps 3 to 6. Sign-off: run step 7. The site: run step 8. Nothing posted, nothing leaked: the rules below and run step 9. Run it again after the synthesis; any gap becomes a change before the spec-draft gate.

**How a gate runs** (`..\answer-desk\ASKING.md`, Alex's readability rule of 2 Nov). Freeze the document into `..\Operator tasks\Approve - <what, in plain words>.md`, written from the gate approval template. Each gate's plain name is in its step below. The next free OT number (check `Operator tasks\` and `Operator tasks\Archive\` just before writing) goes in the front matter only. The file opens with `## What this is`: in plain words, with no codes (no spec, DoD or OT ids, no session names), what the posts demo is for in the job application, what he's approving, what happens next, what's waiting on it, about how long it takes him, and the deadline. The frozen document follows, copied in whole. Commit that file first, on its own and path-limited, so the snapshot names a commit. Send `answer-desk` `TASK S-D7: <plain file name> is waiting on you: <what it decides and unblocks>`. While blocked, wait with the Monitor tool running `python -I orchestration\check_gate.py "Operator tasks\<plain file name>"` from the repo root every 300 seconds until it exits 0. Poke after 15 minutes. On `CHANGES`, apply them, refresh the snapshot and wait again. Then send `TASK DONE S-D7: <plain file name>` to `answer-desk` and `ARCHIVE <plain file name>: readers <spec ids>` to `orchestration`.

**Run steps.** Commit after every finished step, path-limited: `git commit -m "[linkedin-content] <message>" -- linkedin-content/...`.
1. Read the reading list, and `HANDOFF.md` if it exists. Confirm every resource is reachable. Create `.gitignore` (`local/`) and `local\`. Apply DI-XX's answers. Commit.
2. Send the RESEARCH line (§6). Meanwhile, delegate (P7) the groundwork: one subagent sets up the pipeline skeleton and writes the baseline. When the capture lands, the session reads its voice part from the local disk. Commit.
3. When the synthesis lands, or at the question 4 cutoff: confirm or revise the methodology, run the coherency check, and finish `PIPELINE.md`. Commit.
4. **Gate: spec draft.** Freeze the whole SPEC.md (problem, scope, its own DoD, the research verdicts, the methodology) into `Approve - the plan for the LinkedIn posts demo.md`, as above, with a five-line plain summary first. Under question 4's A, writing goes ahead on the frozen methodology while the gate is open, and changes from the gate are applied to the posts they touch. From 18:00, an open spec-draft gate means proceed on the checked methodology and log it.
5. Write and judge, delegated (P1, P7): writer subagents in parallel, one per post, then a judge subagent that wrote none of them, each handed only the rubric, `PIPELINE.md` and its own inputs. Commit `demo\`.
6. Send `s-d6-canva-templates` and `s-d10-canva-video` `COPY S-D7: posts in ..\linkedin-content\demo\posts.md (<draft or signed off>); free to use as sample copy`.
7. **Gate: brand sign-off** (DoD-17), in the question 4 slot. `Approve - the LinkedIn posts in the Addvery voice.md` holds the posts, the baseline, the scores, `demo\method.md`, and `demo\voice.md` if question 3 allows it. Tell `s-d6-canva-templates` when its TASK line is sent, so both arrive together. Wait as above. On `CHANGES`, rewrite, re-score and refresh. Then `TASK DONE S-D7: Approve - the LinkedIn posts in the Addvery voice.md`, and `ARCHIVE Approve - the LinkedIn posts in the Addvery voice.md: readers S-D7`. From 18:00, an open sign-off stays open for the morning cleanup session while the rest carries on.
8. **Site request.** If S-D6's previews exist by then, in `..\canva-templates\exports\` (read only), say in the request which post pairs with which template. Send `website`: `BUILD S-D7-B1: add a D7 section, LinkedIn content in Addvery's voice, in the deliverables area: the posts as LinkedIn-style cards with their scores, the generic baseline beside one of them, and a short how-it-was-made panel. Content: linkedin-content\demo\. Source: posts written by S-D7 in Addvery's voice and signed off by Alex in Approve - the LinkedIn posts in the Addvery voice.md; <question 3's answer, quoted, if it allows the voice summary>; no research from Addvery Research.` Wait for `BUILT S-D7-B1` or `REFUSED S-D7-B1` before any next request.
9. A subagent checks every committed file for text copied from the capture, real names, links to Alex's accounts and secrets. Fix and commit.
10. When §5 is met, send `orchestration` `DONE S-D7: <posts and baseline on the site, their brand sign-off approved, BUILT S-D7-B1>`.

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
| 2 Nov, drafting (wave2-specs): the rubric stays in `local\`, git-ignored; only question 3 can put a voice summary on the site. | The brief: nothing from `Addvery Research\` goes into a tracked file. The website session refuses builds that publish that research. | It keeps Alex's capture out of the public repo while the posts still show it working. | Allowing a summary adds one file and one line in the BUILD request. |
| 2 Nov, drafting (wave2-specs): the posts are offered to S-D6 and S-D10 as sample copy, with no dependency. | Copy and visuals together make a complete LinkedIn post. | It links the three demos without one waiting on another (P1). | None: either spec can ignore the offer. |

## Appendix A. Held preflight intake

This spec's preflight intake is drafted but not yet in front of Alex (Alex, 14:38: "i'm swamped we need to remove blockers"; orchestration: at most two wave-2 preflight intakes open at once, none new while he's on his Addvery research). **Release it when** Alex's Addvery research has a brand capture in `..\Addvery Research\` (DoD-11), or Alex says he's done with that research for now, whichever comes first. Whoever releases it (`wave2-specs` while it runs, then this spec's session if it's running, otherwise `orchestration`): take the next free DI number from the `Intake id:` lines in `..\Operator tasks\` and `..\Operator tasks\Archive\`, replace `XX` in the forms `DI-XX`, `QXX.`, `AXX.` and `a-XX-` with it, and save the text below as `..\Operator tasks\Decide - how the LinkedIn content demo works.md`. Recheck any times in it against the clock first. Commit it path-limited, put the DI number into §1 and the status line, and send `answer-desk` `TASK S-D7: Decide - how the LinkedIn content demo works.md is waiting on you: <what it decides and unblocks>`.

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

You're asked four things: which of your repos it's built on, when the voice part of your Addvery brand capture will be ready, what the site may show from that capture, and when you sign the posts off. Once you answer, the assistant that writes the posts starts. Nothing has started yet, and it's waiting on this.

It needs you on camera once, for about 10 minutes: the brand sign-off, proposed for 16:45–17:00, together with the sign-off of the Canva templates. This intake takes you about 5 minutes. Answer by 15:15 if you can: research comes first, and the posts need about 45 minutes of writing and scoring before the sign-off.

This intake holds 4 decisions. Each carries its own context, so you can answer them in any order. An empty fence means not answered. The spec draft is at `linkedin-content\SPEC.md` for reference, but you needn't read it. Say "DI-XX is ready" when you're done.

# QXX.1 Which of your repos the demo is built on

The charter says this demo "References the operator's subjective brand capture repo on GitHub", and the project's definition of done says it is "built on the operator's brand capture repo". Two of your public repos fit that description: `brand-voice-capture-demo-linkedin` and `subjective-taste-capture-demo`. The research for the three brand demos reads both before anything is built, so the assistant learns what each does first. The demo on the site will say which repo it's built with.

Your options:

- **A.** `brand-voice-capture-demo-linkedin`.
- **B.** `subjective-taste-capture-demo`.
- **C. Both,** taking whichever parts fit, for example the voice rules from one and the scoring from the other. You see what it took from each when the plan comes to you for approval.
- **D. Another repo.** Name it.

I recommend C, because both names match the charter's words, and it commits to nothing before research has read them. If you meant one of them, A or B saves a step.

If the fence is empty: before 18:00 Prague the session keeps waiting and pokes you every 15 minutes; from 18:00 it takes C and logs it.

This answer decides the method the posts are written and scored with, and what the site credits.

Write A, B, C, or D and the repo.

## AXX.1

`<operator_answer>`
```a-XX-1

```
`</operator_answer>`

# QXX.2 When the voice part of your brand capture lands

The posts are written from the voice part of your Addvery brand capture: how Addvery writes, the words it uses and avoids, how its posts are built. The capture is yours, in the Addvery Research folder, worked one-on-one. Earlier today, asked who researches Addvery, you said: "I'm on this. I'm going to be doing it in the subdirectory Addvery Research." The assistant reads it from the local disk only and never copies it into the public repo.

For the 16:45 sign-off, the assistant needs the voice part by about 16:00: turning it into voice rules, writing about five posts and scoring each takes about 45 minutes (estimate). Until it lands, the assistant builds everything that doesn't need your capture: the writing and scoring set-up, and the generic post the demo contrasts against.

Your options:

- **A. It will be there by a time you name.** If that's after 16:00, the sign-off moves by the same amount, or covers fewer posts first, and the assistant says which.
- **B. A stopgap.** The assistant builds a voice sample from Addvery's public website and blog copy (never LinkedIn), for the demo alone, and swaps in your capture when it lands. That bends your call that Addvery research is yours, so it happens only on your say-so.
- **C. Wait.** The posts wait for your capture, whenever it lands, and the sign-off moves with it, to the morning cleanup session if need be.

I recommend A with a time, because the project's definition of done names your capture as the source for both brand demos, these posts and the Canva templates. If 16:00 isn't realistic, B keeps the 16:45 slot.

If the fence is empty: before 18:00 Prague the session keeps waiting and pokes you every 15 minutes; from 18:00 it takes C, keeps building what doesn't need the capture, and logs it.

This answer decides when the posts can be written and whether the 16:45 slot holds. The Canva templates intake asks the same about the visual part of your capture.

Write A and the time, B or C.

## AXX.2

`<operator_answer>`
```a-XX-2

```
`</operator_answer>`

# QXX.3 What the site may show from your brand capture

The posts are new writing, not your capture. But the demo reads best when it shows its work: the voice rules the posts were written to, next to the posts that meet them. The charter puts it as "legibility matters more than function".

Your capture sits in the Addvery Research folder, which you keep out of the public repo. Earlier today you said of that folder: "it'll be getting ignored from the public repo". The website assistant's rules have it refuse any build that "would publish research from" that folder, so it needs your answer here before it shows anything drawn from the capture.

Your options:

- **A. The posts only,** plus a general description of the method (capture, voice rules, writing, scoring). Nothing from your folder is published.
- **B. The posts, plus a short summary of the voice:** about five traits, freshly written in the assistant's own words, with no quotes from your capture. You see the exact words at the brand sign-off before anything goes live, and the build request quotes your answer here.
- **C. The posts, plus quoted excerpts from your capture.**
- **D. Something else.** Say what.

I recommend B. It shows the work, which is what makes the demo legible, and you approve every word at the sign-off.

If the fence is empty: before 18:00 Prague the session keeps waiting and pokes you every 15 minutes; from 18:00 it takes A and logs it.

This answer decides what the demo's section on the site shows, and what goes into the public repo.

Write A, B, C, or D and what you want instead.

## AXX.3

`<operator_answer>`
```a-XX-3

```
`</operator_answer>`

# QXX.4 When you sign off the posts, and what happens if research is late

The project's definition of done needs your brand sign-off: "A demo of LinkedIn content created in Addvery's voice, built on the operator's brand capture repo, has his brand sign-off and is shown on the site." The assistant sends it to you as an approval file in Operator tasks holding the posts, their scores, the generic post and how they were made. You tick "I approve" or write changes: about 10 minutes (estimate).

The proposed slot is 16:45–17:00, on camera, together with the Canva templates sign-off, so you review the brand once for both. It comes after the third blog dictation (16:20–16:40). The GetSales live run has moved to before 15:30, so 17:00–17:15 is free if the review runs over. The slot can't come much earlier, because research and about 45 minutes of writing come first.

The research reads your brand capture repos and checks what's current in writing LinkedIn posts in a brand's voice. It may not be finished by 16:00.

Your options:

- **A. 16:45–17:00, and write on the draft method if research is late.** If the findings aren't in by 16:00, the assistant writes on its draft methodology so the slot holds. It waits only for the reading of your repos. Findings that land later are applied after your sign-off, as changes you see.
- **B. 16:45–17:00, but only on finished research.** If the findings are late, the sign-off slips to 17:40–18:00 or to the morning cleanup session.
- **C. Another time.** Write it.

I recommend A. It keeps your brand review in one sitting with the Canva templates. Signing off the definition of done earlier today, you said the research rules may soften when time is short: "I might soften that and change the research rules especially if we're running low on time."

If you've already answered this in the Canva templates intake, "same as the templates" is enough.

If the fence is empty: before 18:00 Prague the session keeps waiting and pokes you every 15 minutes; from 18:00 it leaves the sign-off open for the morning cleanup session while the rest of the work carries on, and logs it.

This answer sets when you're on camera for the posts, and whether the writing may start before research is complete.

Write A, B, C and the time, or "same as the templates".

## AXX.4

`<operator_answer>`
```a-XX-4

```
`</operator_answer>`
~~~~
