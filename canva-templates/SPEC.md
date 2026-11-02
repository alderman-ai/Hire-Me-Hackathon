# S-D6 Canva LinkedIn templates: executable spec

Status: draft; preflight DI-XX waiting on Alex · Row: S-D6 — Canva LinkedIn templates · Folder: `canva-templates\` · Session: `s-d6-canva-templates`

This spec builds a set of LinkedIn visual templates in Canva, in Addvery's brand. It redoes Alex's earlier pixel-perfect branded-assets demo for Addvery. It's aimed at Addvery's marketing side first (the CMO) and shows that a GTM engineer can give a brand team locked, on-brand templates that anyone can fill in, not one-off images. The templates show up on the site as a D6 section of exported previews, and S-D10 films Alex designing with them.

## 1. Operator preflight (P3)

The intake is DI-XX: `..\Operator tasks\Decide - how the Canva templates get made.md`.

| Question (DI-XX) | Question | Default |
| --- | --- | --- |
| 1 | How the session gets into Canva: the Canva connector with Claude in Chrome as fallback, Claude in Chrome only, the Canva Connect API, or Alex by hand | Build the templates as pixel-perfect files ready to import into Canva; the Canva work and the sign-off wait for the morning cleanup session |
| 2 | Which Canva account and plan, and what the session may create in it | His main account, plan unknown: the session checks the plan read-only and uses only what it has |
| 3 | When the visual part of his brand capture lands, and what to do until then | Wait for it, building layouts in neutral placeholders meanwhile; the sign-off moves with it |
| 4 | The brand sign-off slot, and whether the build may start on the draft methodology if research is late | The sign-off stays open for the morning cleanup session |

**Launch gate.** The session launches once DI-XX is answered and its answers are applied. From 18:00 Prague, an unanswered question takes its default, logged in §9.

**Operator scene.** The brand sign-off, proposed for 16:45–17:00, on camera, together with S-D7's sign-off (question 4). It takes about 10 minutes. It stays there although the GetSales live run moved to before 15:30 (Alex, 14:30): research and about 45 minutes of building come first. S-D10's Canva recording follows at 17:15. Alex reviews a gate-approval operator task that embeds the exported templates, so Canva needn't be open on camera.

**Off camera, with the recording paused.** Only the route question 1 picks applies:
- Connector: add Canva under Connectors in his Claude settings and sign in, before the session launches, so its tools load.
- Claude in Chrome: allow it on canva.com, and keep that Chrome window on the 4K monitor, which isn't recorded.
- Connect API: paste the integration's credentials into `canva-templates\.env` (git-ignored).

**Runtime questions** go to the desk as asker `S-D6`, ids `S-D6-Q1` onwards, one at a time (`..\answer-desk\ASKING.md`). After 15 minutes waiting on Alex for anything, send `POKE S-D6: waiting on you for <what>`, and again every 15 minutes. Before 18:00 Prague, keep waiting and do whatever doesn't depend on the answer. From 18:00, decide on the default and log it in §9.

## 2. Spec contract

| Item | S-D6's answer |
| --- | --- |
| 1. Its place | Row S-D6. Claims DoD-16. Reads DoD-11 (Alex's brand capture). Serves DoD-21 (S-D10 designs with these templates), DoD-19 (the site's D6 section) and DoD-22 (nothing it publishes leaks). It claims none of those three. |
| 2. Its neighbours | Depends on the Addvery brand capture (which S-D6 reads: DoD-11, Alex's own, in `..\Addvery Research\`), S1's research (L-05, L-01) and Canva access (question 1). Runs in parallel with S-D7 (`s-d7-linkedin-content`; shared sign-off slot) and the rest of wave 2. Feeds S-D10 (`s-d10-canva-video`) and the site, through `website`. |
| 3. Operator preflight | §1 (DI-XX). |
| 4. Decision log | §9. |
| 5. Forking gates | §8. |
| 6. Working directory | `canva-templates\`. Reading list §3, which matches its CLAUDE.md. |

## 3. Routing and resources

Paths are relative to `canva-templates\`.

- `..\CHARTER.md`: the parent context. Read only, never edit.
- `..\SESSIONS.md`: the roster. Read it at startup and before messaging a session for the first time. Edit only S-D6's own row.
- `..\GIT.md`: shared working-tree rules. Commit only this folder, path-limited.
- `..\answer-desk\ASKING.md`: the desk format, gate approvals, TASK and ARCHIVE lines, the poke, the 18:00 rule.
- `..\answer-desk\qa\S-D6.md`: this spec's desk record. The desk creates it with the first question.
- `..\Operator tasks\Archive\INDEX.md`: Alex's answered intakes, verbatim. DI-XX joins it once archived. Never re-ask what they settle.
- `SPEC.md`: this file.
- `HANDOFF.md`, if it exists: state after a fork.
- `..\research\DIRECTORY.md`: S1's index of every report.
- Research findings: S2 adds a line here for each report when S1 sends FINDINGS for L-05 and L-01.
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
- `..\Addvery Research\`: Alex's brand capture (S-D6 reads DoD-11). S-D6 needs its visual part: logo, colours, fonts, image style. Local disk only, read only, never from GitHub. Nothing from it is copied or quoted into a tracked file. It may not be ready yet (question 3).
  - Files in it, as Alex's research session listed them at 15:33 (relayed by S-D1 as an OUTPUT line; added by S2 as C08). Read from disk only, never edit, never copy into a tracked file. A file marked expected doesn't exist yet: check for it, don't wait on it.
    - `..\Addvery Research\Brand capture.md` (expected): Addvery's voice and visual identity, Alex's own brand capture.
- Alex's earlier public repos `pixel-perfect-branded-assets-demo`, its twin `automated-branded-assets-demo`, `apify-speaker-linkedin-teasers-demo` and `canva-slide-layouts`: read through L-05's R1 report. Use `gh`, read only, only for a detail the report lacks.
- Canva, by the route question 1 picks: the Canva connector's tools (load them with ToolSearch), Claude in Chrome (load its skill first, work in a new tab, window on the 4K monitor), or the Connect API with credentials in this folder's git-ignored env file (Outputs). Never list, search, open or change a design the session didn't create.

Step 1 of the run confirms every resource is reachable and turns anything ambiguous into a desk question. Inputs other specs produce later are named in the steps that use them: S-D7's posts (run step 7).

**Outputs.** What this spec creates, in `canva-templates\` unless named otherwise:
- `HANDOFF.md`: written at each fork (§8).
- `BUILD-SHEET.md`: the template set, sizes, grid, type scale and layouts, by role, never by value.
- `exports\`: PNG (and PDF for the carousel) previews of each template, committed. S-D10 and the site read them.
- `site\d6.md`: content for the site's D6 section.
- `local\`: git-ignored; brand values, Canva links, scratch.
- `.env`: git-ignored; only for the Connect API route.
- `.gitignore`: covers `.env` and `local/`.
- In Canva: one folder of Addvery templates, and one brand kit if the plan has room.
- In `..\Operator tasks\`: the two gate tasks, `Approve - the plan for the Canva templates.md` and `Approve - the LinkedIn templates in Canva.md`.

## 4. Problem and scope

**The problem.** A brand team needs LinkedIn visuals that stay on brand when anyone fills them in, without a designer each time. Alex's earlier demo did this pixel-perfect for another brand. This redoes it in Canva, for Addvery, in a few hours. The templates must look right at LinkedIn's sizes and survive export and upload.

**In scope.**
- About five LinkedIn templates, for example a single-image post, a square post, a document carousel, a quote card and an event teaser. The final set and sizes come from research and are fixed at the spec-draft gate.
- One Canva folder for them, with Addvery's brand applied, through a brand kit if the plan has room.
- Brand elements locked where Canva allows; text and image slots left editable.
- A build sheet, checked exports, the D6 section on the site, and the link S-D10 designs from.

**Out of scope.**
- Researching Addvery's brand. That's Alex's own work (DI-3 Q3.3).
- Posting anything to LinkedIn, automation sending, or connecting anyone else's LinkedIn account (charter Scope).
- Real data: no real person's name, photo or quote in a template (charter Scope).
- Any other design in Alex's Canva account.
- The LinkedIn copy (S-D7) and the Canva video (S-D10).

## 5. Definition of done

| Criterion | Traces to |
| --- | --- |
| About five LinkedIn templates, at the sizes the build sheet sets, exist in one Canva folder in Addvery's brand, built from Alex's capture | DoD-16 (reads DoD-11) |
| Each is pixel-perfect: exact dimensions, the build sheet's grid and margins, brand fonts with no substitution, clean PNG and PDF exports; brand elements locked where the plan allows | DoD-16 |
| Alex's brand sign-off is recorded: the sign-off gate task is approved and archived | DoD-16 |
| S-D10 has the link to the template it designs with, by 17:05 | serves DoD-21 |
| The site's D6 section shows the exports and how they were made (`BUILT S-D6-B1` received) | serves DoD-19 |
| Nothing committed or published shows another client's Canva design, a Canva login, a secret, or brand values copied from the capture | serves DoD-22 |

## 6. Research step

At launch, the session sends `s1-research` exactly one line:

`RESEARCH S-D6: L-05 (offered merged with S-D7 and S-D10) plus L-01, Canva's current features and Alex's earlier demos decide the build route and the pixel-perfect checks (R1 first), needed by 15:45`

Approving the list is S1's gate, not this session's.

**Goes ahead while research runs:** step 1's checks; a read-only probe of Canva access (the plan, brand-kit room, no design listing); the Canva folder; reading the capture once it lands; the build sheet's skeleton (template roles, slots); placeholder layouts.

**Waits for FINDINGS:** the final sizes (R2), the build method (R1: what the earlier demo did and found hard), the pixel-perfect traps (R3), and whether to use a brand kit or brand templates.

**If research is late** for the 16:45 sign-off, question 4 decides. Under A, if the findings aren't in by 16:00, the session builds on the draft methodology below, waiting only for R1. It applies later findings after the sign-off as changes Alex sees, and the gate task says which choices weren't yet backed by research. Under B, it waits, and the sign-off slips.

## 7. Methodology and steps

**Draft methodology.** The session confirms or revises it once the synthesis lands, then runs the coherency check.
1. **Build sheet first.** From R1 and R2: the template set, each size, a grid with margins and safe zones for LinkedIn's crop, a type scale, and brand roles (primary, accent, logo placement). It's written by role, never by value.
2. **Brand into Canva.** The capture's logo, colours and fonts go into a brand kit if the plan has room, or are applied per template. If a brand font isn't in Canva and the capture has no font file, use the closest Canva font and say so at the sign-off. Brand values live only in Canva and `local\`.
3. **Build.** R1 decides the path: built in Canva's editor directly, or code-first (pixel-perfect files rendered from the build sheet, then imported into Canva), whichever the earlier demo shows holds up. The route from question 1 carries it out.
4. **Lock and name.** Lock the logo, grid and colour blocks where the plan allows. Leave text and image slots editable. Name each `Addvery · LinkedIn · <type> · <size>`.
5. **Fill and export.** Fill each with sample copy: S-D7's posts if they're ready, otherwise neutral copy in no one's name. Export PNG, and PDF for the carousel, to `exports\`.
6. **Check.** A subagent that didn't build them checks every export against the build sheet: pixel dimensions, margins, font rendering, colour roles, and legibility at phone feed width. Fix and re-export.

**Coherency check:** "if we execute this methodology, will that DoD be satisfied?" Templates in Canva in the brand: steps 2 to 4. Pixel-perfect: steps 1 and 6. Sign-off: run step 9. S-D10's link: run step 8. The site: run step 10. Screen care: the rules below and run step 11. Run it again after the synthesis; any gap becomes a change before the spec-draft gate.

**How a gate runs** (`..\answer-desk\ASKING.md`, Alex's readability rule of 2 Nov). Freeze the document into `..\Operator tasks\Approve - <what, in plain words>.md`, written from the gate approval template. Each gate's plain name is in its step below. The next free OT number (check `Operator tasks\` and `Operator tasks\Archive\` just before writing) goes in the front matter only. The file opens with `## What this is`: in plain words, with no codes (no spec, DoD or OT ids, no session names), what the templates are for in the job application, what he's approving, what happens next, what's waiting on it, about how long it takes him, and the deadline. The frozen document follows, copied in whole. Commit that file first, on its own and path-limited, so the snapshot names a commit. Send `answer-desk` `TASK S-D6: <plain file name> is waiting on you: <what it decides and unblocks>`. While blocked, wait with the Monitor tool running `python -I orchestration\check_gate.py "Operator tasks\<plain file name>"` from the repo root every 300 seconds until it exits 0. Poke after 15 minutes. On `CHANGES`, apply them, refresh the snapshot and wait again. Then send `TASK DONE S-D6: <plain file name>` to `answer-desk` and `ARCHIVE <plain file name>: readers <spec ids>` to `orchestration`.

**Run steps.** Commit after every finished step, path-limited: `git commit -m "[canva-templates] <message>" -- canva-templates/...`.
1. Read the reading list, and `HANDOFF.md` if it exists. Confirm every resource is reachable. Create `.gitignore` (`.env`, `local/`) and `local\`. Apply DI-XX's answers. Commit.
2. Send the RESEARCH line (§6). Probe Canva access read-only through the chosen route. If it fails, ask `S-D6-Q1`.
3. Groundwork, delegated (P7): a subagent drafts the build sheet skeleton. When the capture lands, the session reads its visual part from the local disk and writes the values to `local\brand.md`. Commit.
4. When the synthesis lands, or at the question 4 cutoff: confirm or revise the methodology, run the coherency check, and finish `BUILD-SHEET.md`. Commit.
5. **Gate: spec draft.** Freeze the whole SPEC.md (problem, scope, its own DoD, the research verdicts, the methodology) into `Approve - the plan for the Canva templates.md`, as above, with a five-line plain summary first. Under question 4's A, the build goes ahead on the frozen methodology while the gate is open, and changes from the gate are applied to the templates they touch. From 18:00, an open spec-draft gate means proceed on the checked methodology and log it.
6. Build, delegated (P1, P7). The session sets up the brand kit itself, then hands one subagent each template or pair, with `BUILD-SHEET.md`, `local\brand.md`, the route's tool notes and the screen-care rules. Commit the build notes.
7. Fill, export and check (methodology steps 5 and 6), with a separate checking subagent. The sample copy is S-D7's posts, read only from `..\linkedin-content\demo\posts.md` once S-D7's `COPY S-D7` message says they exist; otherwise neutral copy. Commit `exports\`.
8. Send `s-d10-canva-video` `READY S-D6: templates in Canva, folder <name>, link <link>; for the scene, use <template>`. Send it by 17:05 at the latest, ahead of the 17:15 recording. If the templates aren't done by then, send what exists and say so.
9. **Gate: brand sign-off** (DoD-16), in the question 4 slot. `Approve - the LinkedIn templates in Canva.md` embeds every export (linked from `..\canva-templates\exports\`), the build sheet and the check results, with no Canva link. Tell `s-d7-linkedin-content` when its TASK line is sent, so both arrive together. Wait as above. On `CHANGES`, fix, re-export and refresh. Then `TASK DONE S-D6: Approve - the LinkedIn templates in Canva.md`, and `ARCHIVE Approve - the LinkedIn templates in Canva.md: readers S-D6, S-D10`. From 18:00, an open sign-off stays open for the morning cleanup session while the rest carries on.
10. **Site request.** Write `site\d6.md`: the exports and a three-line note on how they were made. Send `website`: `BUILD S-D6-B1: add a D6 section, LinkedIn templates in Canva, in the deliverables area: a gallery of the template previews and a short how-it-was-made note. Content: canva-templates\site\d6.md. Source: S-D6's own templates in Canva, signed off by Alex in Approve - the LinkedIn templates in Canva.md; nothing from Addvery Research.` Wait for `BUILT S-D6-B1` or `REFUSED S-D6-B1` before any next request.
11. A subagent checks every committed file and export for other designs, logins, links to Alex's account, secrets and brand values copied from the capture. Fix and commit.
12. When §5 is met, send `orchestration` `DONE S-D6: <templates in Canva, their brand sign-off approved, BUILT S-D6-B1>`.

**Screen care (every step).** Assume anything on screen can be published. Canva goes on the recorded left monitor only as the Addvery folder or one template, opened by link. Claude in Chrome works on the 4K monitor. The session never lists or searches Alex's designs. No Canva links or brand values go in tracked files. Credentials go only in `.env`, entered with the recording paused. Never open the Apify proposal or Alex's own GetSales outbound.

## 8. Forking gates (P8)

| Gate | When |
| --- | --- |
| F1 | The brand sign-off is approved and S-D10 has its link. The build is done; the site and the final check remain. |
| F2 | Shortly before 18:00 Prague (about 17:50), so the overnight session starts clean (P6). |
| F3 | Context about half full, whatever else is happening. |

**How it forks.**
1. Write `HANDOFF.md`: the state of each template and of the build sheet; open questions and gates with their times; pokes in progress; BUILD requests awaiting a reply; decisions since the last fork. Commit it.
2. From `canva-templates\`, launch the successor under the same name: `claude --bg -n s-d6-canva-templates "Read CLAUDE.md, then HANDOFF.md. You are now the active S-D6 session."`
3. Update S-D6's row in `..\SESSIONS.md` with the handoff time, and commit it on its own: `git commit -m "[roster] ..." -- SESSIONS.md`.
4. Announce the handoff to `s-d7-linkedin-content`, `s-d10-canva-video`, `website`, `s1-research`, `orchestration`, and `answer-desk` if a question or task is open.
5. The old session stops itself with `claude stop` and its own exact id.

## 9. Decision log (P5)

Before 18:00 Prague, a passed deadline means poke, not decide. From 18:00, decide on the default, log it here, and send `WITHDRAW <id>` for a desk question. Start each decision with the time and the question id.

| Decision | Justification | Why it's the right call | Blast radius if changed |
| --- | --- | --- | --- |
| 2 Nov, drafting (wave2-specs): about five templates, the final set and sizes fixed at the spec-draft gate. | The charter names no number. Five covers the common LinkedIn formats in the time before 16:45. | Enough to show a system, not a one-off; small enough to build and check in about 45 minutes. | More or fewer templates changes the build time and the sign-off contents only. |
| 2 Nov, drafting (wave2-specs): the templates also go on the site as a D6 section, though DoD-16 doesn't require it. | The charter's outcome brings demos "together on that one site", and DoD-19, which S-D6 serves, asks the site to show every deliverable. | Templates that exist only in Alex's Canva account are invisible to Addvery. | Dropping it removes one BUILD request and the D6 section. |
| 2 Nov, drafting (wave2-specs): brand values (hex codes, font names) and Canva links stay out of tracked files; tracked files name brand roles only. | The brief: never copy `Addvery Research\` into a tracked file, and the repo is public. Canva links point into Alex's account. | It keeps the capture and Alex's account out of the public repo. The exports still show the brand, which is the deliverable. | Relaxing it lets the build sheet carry values; nothing else changes. |
| 2 Nov, drafting (wave2-specs): the sign-off gate embeds the exports, so Alex reviews them in Obsidian, not in Canva. | His Canva account may show other clients' designs, and the sign-off is on camera. | The review is complete without opening Canva on screen. | None beyond the gate file's contents. |
| 2 Nov, drafting (wave2-specs): sample copy is S-D7's posts when ready, otherwise neutral copy in no one's name; no real person appears. | Charter Scope: no real data through the demos. | Keeps the templates publishable and the specs independent (P1). | Swapping the copy later is a re-export. |
| 2 Nov, drafting (wave2-specs): if a brand font isn't in Canva and the capture has no font file, the closest Canva font is used and flagged at the sign-off. | Uploading a licensed font Alex doesn't hold isn't the session's call. | It keeps the build moving and puts the trade-off in front of Alex at the sign-off. | One font swap across the templates if he supplies the file. |

## Appendix A. Held preflight intake

This spec's preflight intake is drafted but not yet in front of Alex (Alex, 14:38: "i'm swamped we need to remove blockers"; orchestration: at most two wave-2 preflight intakes open at once, none new while he's on his Addvery research). **Release it when** Alex's Addvery research has a brand capture in `..\Addvery Research\` (DoD-11), or Alex says he's done with that research for now, whichever comes first. Whoever releases it (`wave2-specs` while it runs, then this spec's session if it's running, otherwise `orchestration`): take the next free DI number from the `Intake id:` lines in `..\Operator tasks\` and `..\Operator tasks\Archive\`, replace `XX` in the forms `DI-XX`, `QXX.`, `AXX.` and `a-XX-` with it, and save the text below as `..\Operator tasks\Decide - how the Canva templates get made.md`. Recheck any times in it against the clock first. Commit it path-limited, put the DI number into §1 and the status line, and send `answer-desk` `TASK S-D6: Decide - how the Canva templates get made.md is waiting on you: <what it decides and unblocks>`.

~~~~markdown
---
System Primitive: Intake file
Intake State: Waiting on operator
Intake id: DI-XX
Created: 2026-11-02
Build goals: []
---

<!-- File name: "Decide - how the Canva templates get made.md" -->

# Decide: how the Canva templates get made

## What this is

The site you're building today is a personalised job application to Addvery, made live during a 12-hour recorded hackathon. One part of it is a set of about five LinkedIn image templates in Canva, in Addvery's brand (logo, colours, fonts). It's a redo of your earlier pixel-perfect branded-assets demo, this time for Addvery. It shows Addvery's marketing side that you can give a brand team locked, on-brand templates anyone can fill in, rather than one-off images. The templates get their own section on the site, and near the end of the day you design with them on camera for the Canva design video.

You're asked four things: how the assistant gets into your Canva account, which account and plan it uses, when the visual part of your Addvery brand capture will be ready, and when you sign the templates off. Once you answer, the assistant that builds the templates starts. Nothing has started yet, and it's waiting on this.

It needs you on camera once, for about 10 minutes: the brand sign-off, proposed for 16:45–17:00, together with the sign-off of the LinkedIn posts demo. This intake takes you about 5 minutes. Answer by 15:15 if you can: research comes first, and the templates need about 45 minutes of building before the sign-off.

This intake holds 4 decisions. Each carries its own context, so you can answer them in any order. An empty fence means not answered. The spec draft is at `canva-templates\SPEC.md` for reference, but you needn't read it. Say "DI-XX is ready" when you're done.

# QXX.1 How the assistant gets into Canva

The assistant builds the templates in your Canva account. No Canva connector is attached to this project's assistants today, so it has no way in yet. Every route below works on your logged-in account, which may hold other clients' designs. Whichever you pick, the assistant never lists, searches, opens or changes a design it didn't create. The charter's screen rule applies: "assume anything on screen can be published".

Your options:

- **A. The Canva connector, with Claude in Chrome as the fallback.** You add Canva once under Connectors in your Claude settings and sign in to Canva, with the recording paused: about 2 minutes (estimate). It then reaches every assistant started after that, the way the GetSales and Vercel connectors do now. It works in the background, so nothing shows on screen. How fine its layout control is, the research for the three brand demos checks. For anything it can't do, such as locking elements, the assistant uses Claude in Chrome as in B.
- **B. Claude in Chrome only.** The assistant drives your real, logged-in Chrome in its own tab, so it can do anything you can do in Canva's editor. It's slower and more brittle than a connector. You allow it on canva.com once, and that Chrome window has to sit on your 4K monitor, which isn't recorded, because Canva's home page shows your recent designs.
- **C. The Canva Connect API.** You create a developer integration in Canva's developer portal and paste its credentials into a git-ignored file in the templates folder, with the recording paused: about 15 to 20 minutes (estimate). Some of its template features (brand templates, autofill) may need Canva Enterprise; research checks.
- **D. You build them by hand** from a build sheet the assistant writes: sizes, grid, fonts and layouts. About 45 to 60 minutes of your time (estimate). The charter treats your time as the project's main bottleneck.
- **E. Something else.** Say what.

I recommend A. It costs you about 2 minutes, runs off screen, and the Chrome fallback covers whatever the connector can't do. Connect it before the assistant starts, so its tools load.

If the fence is empty: before 18:00 Prague the session keeps waiting and pokes you every 15 minutes; from 18:00 it takes a stopgap and logs it: it builds the templates as pixel-perfect files ready to import into Canva, and the Canva work and your brand sign-off wait for the morning cleanup session.

This answer decides how every template is built, what you do off camera, and whether the 16:45 sign-off can hold.

Write A, B, C, D, or E and what you want instead.

## AXX.1

`<operator_answer>`
```a-XX-1

```
`</operator_answer>`

# QXX.2 Which Canva account, and what the assistant may create in it

The templates go in one Canva account. Brand kits, custom font uploads and brand templates may need a paid plan (Pro, Teams or Enterprise); research checks which features your plan has. If your plan has room for only one brand kit and it holds your own brand, the assistant leaves it alone and applies Addvery's colours and fonts to each template instead. The Canva design video is filmed in the same account at about 17:15, so whatever the editor shows can end up on camera.

What the assistant would create: one folder for the Addvery templates, the templates in it, and one brand kit for Addvery if the plan has room. It never edits, moves or deletes anything else.

Your options:

- **A. Your main account.** No setup. Write your plan (Free, Pro, Teams or Enterprise), or "don't know", and the assistant checks it read-only. On camera, you open only the Addvery folder or template, by its link.
- **B. A separate account or team just for the hackathon.** No other client's work can ever show on camera. It takes you a few minutes to set up, and a free account may lack brand kits and font uploads, so it may need a paid trial. You'd sign it into the route from the question before.
- **C. Something else.** Say what.

I recommend A. It costs you nothing now, and the assistant's rules plus opening by link keep other designs off screen. Pick B if your Canva home page is full of client work you'd rather not risk.

If the fence is empty: before 18:00 Prague the session keeps waiting and pokes you every 15 minutes; from 18:00 it takes A with the plan unknown, checks the plan read-only, uses only what the plan has, and logs it.

This answer decides where the templates live, whether they use a brand kit, and what the Canva design video might show.

Write A and your plan, B and which account or team, or C and what you want instead.

## AXX.2

`<operator_answer>`
```a-XX-2

```
`</operator_answer>`

# QXX.3 When the visual part of your brand capture lands

The templates are built from the visual part of your Addvery brand capture: logo files, colours, fonts and image style. The capture is yours, in the Addvery Research folder, worked one-on-one. Earlier today, asked who researches Addvery, you said: "I'm on this. I'm going to be doing it in the subdirectory Addvery Research." The assistant reads it from the local disk only and never copies it into the public repo. The project's definition of done expects the capture to be in that folder and named as the source by both brand demos, these templates and the LinkedIn posts.

For the 16:45 sign-off, the assistant needs the visual part by about 16:00: building, exporting and checking about five templates takes about 45 minutes (estimate). Until it lands, the assistant builds the grids and layouts in neutral placeholders and swaps the brand in later.

Your options:

- **A. It will be there by a time you name.** If that's after 16:00, the sign-off moves by the same amount, or covers fewer templates first, and the assistant says which.
- **B. A stopgap for the visuals only.** The assistant takes Addvery's logo, colours and fonts from Addvery's public website, for the templates alone, and swaps in your capture when it lands. That bends your call that Addvery research is yours, so it happens only on your say-so.
- **C. Wait.** The build waits for your capture, whenever it lands, and the sign-off moves with it, to the morning cleanup session if need be.

I recommend A with a time, because your capture is the source the definition of done names. If 16:00 isn't realistic, B keeps the 16:45 slot.

If the fence is empty: before 18:00 Prague the session keeps waiting and pokes you every 15 minutes; from 18:00 it takes C, keeps building in placeholders, and logs it.

This answer decides when the brand goes into the templates and whether the 16:45 slot holds. The LinkedIn posts demo asks the same about the voice part of your capture.

Write A and the time, B or C.

## AXX.3

`<operator_answer>`
```a-XX-3

```
`</operator_answer>`

# QXX.4 When you sign off the templates, and what happens if research is late

The project's definition of done needs your brand sign-off: "LinkedIn visual asset templates in Canva, in Addvery's brand, have the operator's brand sign-off." The assistant sends it to you as an approval file in Operator tasks holding the exported templates as images, the build sheet and the check results, so you review them without opening Canva on camera. You tick "I approve" or write changes: about 10 minutes (estimate).

The proposed slot is 16:45–17:00, on camera, together with the LinkedIn posts sign-off, so you review the brand once for both. It comes after the third blog dictation (16:20–16:40). The GetSales live run has moved to before 15:30, so the Canva design video, which uses these templates, can follow at 17:15. The slot can't come much earlier, because research and about 45 minutes of building come first.

The research reads your earlier demos and checks what Canva can do today. It may not be finished by 16:00.

Your options:

- **A. 16:45–17:00, and build on the draft method if research is late.** If the findings aren't in by 16:00, the assistant builds on its draft methodology so the slot holds. It waits only for the reading of your earlier demos. Findings that land later are applied after your sign-off, as changes you see.
- **B. 16:45–17:00, but only on finished research.** If the findings are late, the sign-off slips to 17:40–18:00 or to the morning cleanup session, and the Canva design video uses templates you haven't approved.
- **C. Another time.** Write it. Before 17:15 keeps the Canva design video on approved templates.

I recommend A. It keeps your brand review in one sitting with the LinkedIn posts, before the video that uses the templates. Signing off the definition of done earlier today, you said the research rules may soften when time is short: "I might soften that and change the research rules especially if we're running low on time."

If the fence is empty: before 18:00 Prague the session keeps waiting and pokes you every 15 minutes; from 18:00 it leaves the sign-off open for the morning cleanup session while the rest of the work carries on, and logs it.

This answer sets when you're on camera for the templates, and whether the build may start before research is complete. The LinkedIn posts intake asks for the same slot.

Write A, B, or C and the time.

## AXX.4

`<operator_answer>`
```a-XX-4

```
`</operator_answer>`
~~~~
