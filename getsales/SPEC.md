# S-D3 GetSales outbound demo: executable spec

Status: draft; preflight DI-7 waiting on Alex · Row: S-D3 — GetSales outbound demo · Folder: `getsales\` · Session: `s-d3-getsales`

This spec builds D3. It sets up ten ICPs in GetSales, each with a drip sequence, and a classifier that routes each lead to the right automation. Then it runs the whole pipeline live on the six stakeholders, through Alex's own sender profile, on camera: Sales Navigator, CSV export, enrichment from D2, a computed first-message variable, import into GetSales. It's for the Addvery stakeholders reading the site, as proof that he can build and run outbound end to end. On the site it becomes a D3 section showing the ten ICPs and their sequences, the classifier at work on a fictional sample, the pipeline, and a clip of the live run that S-D9 cuts from the rig recordings.

## 1. Operator preflight (P3)

The preflight is decision intake DI-7 (`..\Operator tasks\DI-7 S-D3 GetSales preflight.md`).

| DI-7 question | Question | Default (from 18:00 Prague) |
| --- | --- | --- |
| 1 | What are the ten ICPs, and which automation do the six go to? | A: the ten are Addvery's own buyers, and the six go to an eleventh flow, the job application |
| 2 | Where does the demo live in GetSales, so your own outbound stays off screen? | B: your existing team, every demo object prefixed `D3 demo`, and GetSales shown on camera only on a single demo flow's page |
| 3 | How does the Sales Navigator search become a CSV on your account? | C: no new automation on your LinkedIn; a Sales Navigator lead list on camera, and the session writes the six-row CSV |
| 4 | What does the live run send, and what's the second message? | Nothing sends on a default. Steps A are built unsent, with the recommended second message, for the morning |
| 5 | Does Ivana still get a view-only GetSales account, or does the D3 video replace it? | A: the video replaces it, and no invite is sent |
| 6 | The live-run slot and the road to it | The live run moves to the morning cleanup session, and nothing sends |

**Launch gate.** The session launches once DI-7 is answered and its answers are applied. From 18:00 Prague an unanswered question takes its default, logged in §9. **Nothing sends on a default, ever.** From 18:00, anything that would send waits for the morning cleanup session.

**Operator scenes.** One scene: the live run, proposed for 17:00–17:30 (question 6). On camera, Alex opens the Sales Navigator search for the six and exports it, watches each stage run, and says yes to the import and to the start. He also reviews two gate tasks, timed for the gaps between his dictations: the spec draft at about 15:35–15:50, and pre-send at about 16:10–16:20.

**Off camera, with the rig paused.**
- Log into Sales Navigator and GetSales in his browser before the slot.
- If question 2 is A: create the demo team and attach his sender (the session first tells him through the desk what that costs).
- No keys are needed, because the GetSales connector authenticates through claude.ai.

**Runtime questions** go to `answer-desk` as asker `S-D3`, ids `S-D3-Q1` onwards, one at a time (`..\answer-desk\ASKING.md`). After 15 minutes waiting on Alex for anything, send `POKE S-D3: waiting on you for <what>`, and poke again every 15 minutes. Before 18:00, keep waiting and keep working on whatever doesn't depend on the answer. From 18:00, decide on the default and log it in §9.

## 2. Spec contract

| Item | S-D3's answer |
| --- | --- |
| 1. Its place | Row S-D3. Claims DoD-12, and DoD-13 with S-D9, which cuts the clip. Respects DoD-22. Reads DoD-9 (S-D1's output) and DoD-10 (Alex's six stakeholders). Serves DoD-19 through its site section. |
| 2. Its neighbours | **Depends on:** S-D2, which is Alex's own: the six confirmed, plus enrichment, in `..\Addvery Research\`. Also S1 (L-04, L-01, and L-02 R3), S-D1's output (optional, §9), the rig recordings, and S-D9 for the clip. **Runs in parallel with** S-D1, S-D4 to S-D8 and S-D10. **Feeds** S-D8 (the D3 section, through `website`) and S-D9 (the stage times of the live run). |
| 3. Operator preflight | §1 (DI-7) |
| 4. Decision log | §9 |
| 5. Forking gates | §8 |
| 6. Working directory | `getsales\`; its reading list is §3 |

## 3. Routing and resources

Paths are relative to `getsales\`. Step 1 of the run confirms that every resource is reachable, and turns anything ambiguous into a desk question.

- `..\CHARTER.md`: the parent context. Read only, never edit.
- `..\SESSIONS.md`: the roster. Message sessions only by these names. Edit only S-D3's own row.
- `..\GIT.md`: shared working-tree rules. Commit only `getsales\`, path-limited.
- `..\answer-desk\ASKING.md`: the desk format, gates, the poke and the 18:00 rule. `..\answer-desk\qa\S-D3.md`: S-D3's Q&A record, which exists once the first question has been asked.
- `..\Operator tasks\Archive\INDEX.md`: Alex's earlier answers, plus DI-7 once it's archived. Never re-ask what they settle.
- `SPEC.md` (this file), and `HANDOFF.md` if it exists.
- `..\orchestration\DOD-DRAFT.md`: the signed-off project DoD, until it's in the charter. Read only.
- `..\orchestration\_templates\Gate approval template.md` and `..\orchestration\check_gate.py`: the gate tasks and their 5-minute check.
- `..\research\DIRECTORY.md`: the index of every report. `..\research\lists\L-04-getsales.md`, `..\research\lists\L-01-parent.md` and R3 of `..\research\lists\L-02-scraping.md` (the scraped-data output contract): S1's lists. Read only.
- Research findings: S2 adds a line here for each report when S1 sends FINDINGS for L-04, L-01 and L-02 R3.
- `..\Addvery Research\`: Alex's own folder, holding the six stakeholders (DoD-10) and the enrichment. Read it from the local disk only, never from GitHub. Never edit it, and never copy or quote anything from it into a tracked file. It may not be ready yet; until it is, everything runs on the fictional sample (§6).
- S-D1's output (DoD-9): the files `..\scraping\SPEC.md` names. Read only.
- `..\legibility\CLAUDE.md` (S-D9's brief until its SPEC.md exists): how S-D9 picks moments and what it never posts. `..\OBS\rig\RUNBOOK.md`: how the rig records, files and cuts clips. `..\website\CLAUDE.md`: what the site shows and how videos get there. All read only.
- **The GetSales connector** (claude.ai GetSales MCP). Call `get_guide` before creating flows, importing leads or writing messages. Every data call runs against the one team that question 2 names. A preview that returns a `commit_token` is for Alex: it's shown to him and waits for his explicit yes, through a gate task or live on camera (§7), never in this session's own chat. **Never list or search Alex's flows, leads, contacts or inbox,** and never run analytics on anything except the demo flows, read by id. Every tool result lands in the rig's filed Claude Code logs, which S-D9 reads.
- **Sales Navigator:** Alex's own account, in his browser. On camera, only ever the search or lead-list page.
- `.gitignore` in this folder (S-D3's own), covering `live\` and `.env*`. It's written before anything goes into `live\`.

```
getsales\
  CLAUDE.md            written by S0
  SPEC.md              this file
  HANDOFF.md           at each fork (§8)
  .gitignore           live\ and .env*
  icps\ICP-01.md ...   the ten ICPs, each with its sequence
  classifier\          rules, prompt, the fictional sample and its routing result
  pipeline\            the stage scripts: export, enrich, classify, compute, import file
  live\                git-ignored: the six's CSV, enrichment, computed messages, pre-send full text
  live-run.md          wall-clock time of each live stage, for S-D9 (no names)
  site\                content for BUILD requests
```

## 4. Problem and scope

**The problem.** A hiring manager has to see, in one short clip and one section of the site, that Alex can design outbound for a real market and run it end to end. That means ICPs that differ, sequences that don't read as one template with the names swapped, routing that's visibly right, and a live run on real people that sends exactly what he approved.

**In scope:**
- Ten ICPs and ten drip sequences, built in GetSales and never started, except where the live run uses one.
- The classifier, tested on a fictional sample with every route exercised, and visible in GetSales.
- The pipeline scripts, with a dry run on the six.
- The live run on the six, on camera, through his own sender.
- The stage times for S-D9's clip.
- The D3 section on the site.

**Out of scope (charter Scope):**
- Real data through the demo, except the live run on the six.
- Any automation sending, except that live run.
- Anyone else's LinkedIn account.
- Listing or showing Alex's own GetSales outbound.
- Researching Addvery, which is Alex's own (DI-3 Q3.3).
- Cutting the clip, which is S-D9's.
- Hosting video, which goes through `website`'s upload flow to YouTube, unlisted.

## 5. Definition of done

| # | Criterion | Traces to |
| --- | --- | --- |
| 1 | Ten ICPs, each with a drip sequence, are in `icps\` and were approved by Alex at the spec-draft gate. | DoD-12 |
| 2 | GetSales shows the ten flows, each holding its approved sequence, under the team question 2 names. None is started except for the live run's leads. | DoD-12 |
| 3 | The classifier is set up so GetSales shows each lead's route, and every one of its routes was exercised on the fictional sample, offline. | DoD-12 |
| 4 | Only the six real leads were ever enrolled. A final read of the demo flows, by id, shows no send outside the live run. | DoD-12, DoD-22 |
| 5 | The pipeline ran live, on camera, in the agreed slot: Sales Navigator, CSV export, enrichment from D2, computed first-message variable, import, then start for the six through Alex's sender. The pre-send gate was approved first, and what sent matches it word for word. | DoD-13 |
| 6 | `live-run.md` gives the rig session and time of every stage. S-D9's clip from it shows each stage and is live in the D3 section. | DoD-13 (with S-D9) |
| 7 | No tracked file, site page or clip shows a secret, Alex's own outbound, or more of the six than he approved (§9). The six's data stays in `live\`. | DoD-22 |

## 6. Research step

At launch, send `s1-research` exactly one line: `RESEARCH S-D3: L-04, plus L-01 and S-D3 as a reader of L-02 R3, the ten ICPs, the classifier and the 17:00 live run are built on them, needed by 15:30`. Approving the list is S1's gate, not this session's.

**Groundwork that goes ahead while research runs**, since none of it depends on findings:
- `.gitignore`, the folder tree, and the pipeline scripts, run end to end on a fictional sample of about 20 leads.
- Drafts of the ten ICPs and sequences, from the charter, question 1's answer and `..\Addvery Research\` once it's ready.
- A skeleton of the site section.

No GetSales write happens before the spec-draft gate.

**What waits for FINDINGS:**
- The final methodology.
- How the classifier shows in GetSales (L-04 R1, R3).
- The export method, if question 3 is A (R1, R2).
- The rules for the computed variable (R4).
- The final shape of the sequences (R3).
- What of the six is safe to publish (L-01 R3).

**If findings are late,** question 6 decides. Under its option A, the spec-draft gate goes to Alex at 15:35 with the research verdicts marked pending (DI-5: he may soften research rules when time is short), and anything a later finding changes is fixed before the pre-send gate.

## 7. Methodology and steps

**Draft methodology.** The session confirms or revises it once the synthesis lands.

1. **One script and one output file per stage,** so every stage can be pointed at on camera:
   1. **Search:** the Sales Navigator search or list, which Alex runs.
   2. **CSV export:** the method question 3 chose.
   3. **Enrichment:** join on profile URL with the six's notes in `..\Addvery Research\` and S-D1's output, in L-02 R3's contract.
   4. **Classifier:** the route.
   5. **Computed first-message variable:** one researched line per lead, written by a subagent under R4's rules.
   6. **Import:** a CSV with custom fields mapped to template variables, each lead into its routed flow, per the `import_leads` guide.
   7. **Start:** the six only.
2. **ICPs.** Each ICP is a card: who, the trigger signals, the pain, the angle. Each has its own sequence (steps, delays, messages with variables, per the `write_message` guide), with a distinct angle so the ten don't read as one template.
3. **Classifier.** Rules on enriched fields, with an LLM tie-break where the rules don't decide (R3 may change this). It writes a route and a reason. In GetSales, the route shows as a custom field on each lead and as the flow it sits in, plus a router flow that branches on that field if GetSales supports one.
4. **Build.** Flows are named `D3 demo · ICP-01` and so on, and created unstarted.
5. **Dry run.** The six go through every stage up to import, and the connector's message preview renders the six messages. During the live run, every stage re-runs on camera. What sends is the approved text, shown beside the fresh computation (§9).

**Coherency check.** If we execute this methodology, will the DoD be satisfied? Run it against §5 after the synthesis, and again before the spec-draft gate. Any criterion the methodology doesn't reach gets fixed first.

**Steps.** Commit after every finished step, path-limited: `git commit -m "[getsales] <message>" -- getsales/...`, after `git diff --cached --name-only` shows nothing outside `getsales\` and nothing in `live\`.

1. Read §3 and confirm every resource. Load SendMessage and Monitor. Apply DI-7's answers to §1 and §9. Write `.gitignore`. Commit.
2. Send the RESEARCH line (§6).
3. **Groundwork, delegated in parallel (P7, P1).** Each subagent is handed only the files it needs:
   - (a) ICP and sequence drafts: the charter, question 1's answer, and `..\Addvery Research\` read from disk, with nothing from it written verbatim.
   - (b) The pipeline scripts and the fictional sample.
   - (c) The classifier, and its routing result on the sample.
   - (d) The site content skeleton.

   Commit each.
4. **Spec-draft gate.** Run when FINDINGS land, or at 15:35 under question 6's option A. Revise the methodology, run the coherency check, and finish this file. Then freeze the whole SPEC.md, plus the ten ICP files, into `..\Operator tasks\OT-<nn> Gate approval S-D3 spec draft.md` from the template. Use the next free OT number, checking `Operator tasks\` and `Archive\` just before writing. Commit that file alone, path-limited, then send `answer-desk` `TASK S-D3: <file name> is waiting on you: the ten ICPs, their sequences and S-D3's DoD; unblocks the GetSales build`. Wait with Monitor, running `python -I orchestration\check_gate.py "Operator tasks\<file>"` from the repo root every 300 seconds until it exits 0. Poke after 15 minutes. On `CHANGES`, apply them, refresh the snapshot and wait again. Then send `TASK DONE S-D3: <file name>` to `answer-desk`, and `ARCHIVE <file name>: readers S-D3` to `orchestration`.
5. **Build previews and dry run.**
   - Call `get_guide` for `create_flow` and `write_message`, then prepare the preview of each of the ten flows (and the router, if there is one) without committing.
   - Once DoD-10 is confirmed, dry-run the six. Their files go in `live\`.
6. **Pre-send gate.**
   - Write one gate task, `OT-<nn> Gate approval S-D3 pre-send.md`. It holds every flow preview, and the six final messages with names and personal details replaced by role labels.
   - The exact text goes in `live\pre-send.md`, which the task names as a place.
   - The task also says what the clip will show of the six (§9).
   - It follows the same commit, TASK line, Monitor check, poke and TASK DONE/ARCHIVE routine as step 4.
7. **Commit the build after APPROVED.** Commit the approved previews. If a token has expired, re-preview and commit only if the new preview matches the approved one word for word; otherwise it goes back to Alex. Verify the ten flows by reading them by id only.
8. **Go/no-go at 16:40.** Go needs four things: the six confirmed, the flows built, the dry run passed, and the pre-send gate approved. On a no-go, tell `answer-desk` in one ASK what's missing and move the live run to the morning cleanup session (§8).
9. **The live run, 17:00–17:30 (or question 6's slot).**
   - At 16:55, send one ASK: ready to start?
   - Alex opens this session in the foreground from agent view. He runs the Sales Navigator search and the export.
   - The session runs enrichment, the classifier and the compute on screen, showing each line beside its approved text.
   - It shows the import preview. Alex says yes on camera, and the session commits it. The same goes for the start.
   - The session writes each stage's wall-clock time into `live-run.md`.
10. **The clip.** Send `s-d9-legibility` one message: `S-D3 live run: stage times for the DoD-13 clip in getsales\live-run.md; show <what the pre-send gate approved> of the six, blur the rest.` S-D9 cuts it once the rig session is processed and replies with the clip's path.
11. **Site requests**, one at a time, to `website`:
    - `BUILD S-D3-B1: a D3 section with the ten ICPs and sequences, the classifier on the fictional sample, and the pipeline. Content: getsales\site\section.md. Source: icps\, classifier\.`
    - Once S-D9's clip exists, `BUILD S-D3-B2: the live-run clip in the D3 section, uploaded to YouTube unlisted through your upload flow. Content: getsales\site\clip.md. Source: S-D9's clip of the live run.`

    Wait for `BUILT` or `REFUSED` before sending the next.
12. **Close.**
    - Read the demo flows by id: only the six are enrolled.
    - Check the tracked files in `getsales\` against the names in `live\`, without printing either: none may appear.
    - When §5 is met, send `orchestration` `DONE S-D3: ten flows and classifier in GetSales, live run on the six at <time>, clip live in the D3 section`.

**Screen care, throughout.**
- Anything on screen can be published.
- GetSales is opened on camera only on a demo flow's page: never the flow list, leads, contacts or inbox (under question 2's option B, never at all outside that page).
- No secret ever appears on screen or in a tracked file.
- Logins happen with the rig paused.

## 8. Forking gates (P8)

| Gate | When |
| --- | --- |
| G1 | At the go/no-go (16:40), if the context is more than a third full, so that the live run starts clean |
| G2 | Shortly before 18:00 Prague, after the live run or its move to the morning (P6) |
| G3 | When the context is about half full, whatever else is happening |

**How it forks.**
1. Write `HANDOFF.md` and commit it. It holds:
   - the state of each step;
   - the open gate tasks and desk question, with their times, and the pokes in progress;
   - the GetSales team and the demo flow ids;
   - whether the live run happened;
   - the pending BUILDs;
   - the decisions since the last fork.
2. From `getsales\`, launch `claude --bg -n s-d3-getsales "Read CLAUDE.md, then HANDOFF.md. You are now the active S-D3 session."`
3. Update S-D3's row in `..\SESSIONS.md` with the handoff time, and commit it with `[roster]`, path-limited.
4. Tell `answer-desk`, `s-d9-legibility` and `website`.
5. Stop with `claude stop` and the old session's own exact id.

## 9. Decision log (P5)

Before 18:00 Prague, a passed deadline means poke, not decide. From 18:00, decide on the default, log it here, and send `WITHDRAW <id>` for a desk question. Nothing sends on a default at any hour. Start each decision with the time and the question id.

| Decision | Justification | Why it's the right call | Blast radius if changed |
| --- | --- | --- | --- |
| 2 Nov, drafting (wave2-specs): groundwork runs in parallel with research; nothing is written to GetSales before the spec-draft gate. | The brief allows groundwork that doesn't depend on findings, and the live slot is at 17:00. | It saves about an hour before the slot (P3), and nothing it builds touches the outside world. | Drafts that findings contradict get rewritten, inside `getsales\` only. |
| 2 Nov, drafting (wave2-specs): only the six real leads ever enter GetSales. The classifier is shown on a fictional sample, offline. | Scope: no real data except the live run. A fictional lead in a started flow would be a send attempt. | It meets DoD-12's "no send outside the live run" by construction. | Showing the classifier inside GetSales on more leads would need Alex's say on fictional imports. |
| 2 Nov, drafting (wave2-specs): the six's data stays in git-ignored `live\`, and tracked files use role labels. The pre-send gate's tracked copy is redacted, with the exact text in `live\pre-send.md`. | Operator tasks are tracked and the repo is public. `Addvery Research\` is git-ignored out of courtesy to the client. | It keeps personal data about six real people out of the public repo (DoD-22, L-01 R3). | Alex reads one local file at the pre-send gate. Un-redacting is one edit. |
| 2 Nov, drafting (wave2-specs): the public clip blurs the six's names, photos and personal lines unless Alex says otherwise at the pre-send gate. | S-D9's brief: never post research about Addvery's people until Alex says so. | Blurring is the safe side, and the pre-send gate is where he can lift it. | Recutting the clip with S-D9. |
| 2 Nov, drafting (wave2-specs): the flow previews are batched into the pre-send gate. The import and the start are confirmed by Alex live, on camera, in this session's foreground: the one time it takes an answer in its own chat. | The connector's previews need his explicit yes. P4 keeps the gate count low, and he's in the session for the scene. | Two gate tasks instead of a dozen, and the human approval before send becomes part of the clip. | Separate gates per preview would add about ten tasks for Alex. |
| 2 Nov, drafting (wave2-specs): the live run sends the approved text. The compute stage re-runs on camera and is shown beside it, and any difference goes to Alex on camera. | Model output isn't deterministic, and the six messages must be approved before anything sends. | Every stage still runs live, and nothing unapproved sends. | None outside this spec. |
| 2 Nov, drafting (wave2-specs): "GetSales" is the right spelling; the attached connector is GetSales. Logged, not asked. `orchestration` is told, for the charter's open question. | The connector's name settles that half. The "Addvery" half is Alex's. | It saves a question (P4). | None. |
| 2 Nov, drafting (wave2-specs): no GetSales API key and no `.env`. Six leads don't need the bulk route. | The connector authenticates through claude.ai. | Fewer secrets to keep off screen. | A key, if ever needed, goes in git-ignored `.env`, entered with the rig paused. |
| 2 Nov, drafting (wave2-specs): S-D1's output is optional for the live run. If it isn't in by the dry run, enrichment uses Alex's notes alone, and that's logged. | The charter names enrichment "from D2", and S-D1 runs in parallel. | It keeps the 17:00 slot from hanging on a second spec. | The first-message line has less to draw on. |
| 2 Nov, drafting (wave2-specs): S-D9 cuts the clip from `live-run.md`, and S-D3 sends the BUILD that places it. | DoD-13 is claimed by both. One owner per site section avoids duplicate requests. | S-D9 stays the one that cuts, and S-D3 keeps the D3 section together. | If S-D9 prefers to send its own BUILD, S-D3 drops B2. |
