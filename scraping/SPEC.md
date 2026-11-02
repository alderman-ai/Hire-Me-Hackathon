# S-D1 Scraping research demo: executable spec

Status: draft; preflight DI-6 waiting on Alex · Row: S-D1 — Scraping research demo · Folder: `scraping\` · Session: `s-d1-scraping`

This spec builds a small, legible demo of scraping and research on the Apify API: a few ready-made actors run through the public API on tiny inputs, an LLM step turns what they fetched into structured research with a source on every field, and a run ledger shows what each run cost. It is for two audiences. Visitors to the site see it as the D1 section, in Addvery's brand, through the `website` session. Other specs use its output: S-D3 reads its output contract for the enrichment step before import into GetSales, and Alex's own Addvery research may use its scrapers (charter: S-D2 "may use S-D1's scrapers"). It comes first in wave 2 because others consume its output.

## 1. Operator preflight (P3)

The preflight is decision intake DI-6 (`..\Operator tasks\DI-6 S-D1 Scraping preflight.md`).

| DI-6 question | Question | Default |
| --- | --- | --- |
| 1 | Apify account, plan, how the token arrives, and the spend cap | A (Alex puts the token in `.env` himself while the recording is paused), $5 cap; no real runs until the token is there |
| 2 | What the demo scrapes, given the charter's Scope ("Out: real data running through the demos") | C: a scraping sandbox site plus a synthetic sample, which needs no charter change |
| 3 | May the public site name Apify? | C: not named anywhere on the site |
| 4 | Who makes the six stakeholders' enrichment for the S-D3 live run | A: Alex's own research, in the shape S-D1 publishes; S-D1 holds no personal data |
| 5 | Earlier Apify tooling of Alex's to reuse | A: none; build from Apify's public docs |

**Launch gate.** The session launches once DI-6 is answered and its answers are applied. From 18:00 Prague an unanswered question takes its default, logged in §9.

**Operator scenes.** None on camera. Off camera: about 2 minutes, any time, with the recording paused, to put the Apify token in `scraping\.env` (DI-6 question 1; timetable slot "any time, 2 minutes, recording paused"). If the token is already in the file when the session starts, there's nothing more. If not, the session writes an operator task for it (§7, step 4).

**Runtime questions** go to `answer-desk` as asker `S-D1`, ids `S-D1-Q1` onwards, one at a time (`..\answer-desk\ASKING.md`). After 15 minutes waiting on Alex for anything, send `POKE S-D1: waiting on you for <what>`, and again every 15 minutes. Before 18:00 Prague, keep waiting and do everything that doesn't depend on the answer. From 18:00, decide on the default, log it in §9 and send `WITHDRAW <id>`.

## 2. Spec contract

| Item | S-D1's answer |
| --- | --- |
| 1. Its place | Row S-D1, deliverable D1. Claims DoD-8 (a legible Apify scraping and research demo on the live site, in Addvery's brand) and DoD-9 (its research output exists in a form other specs read, and is on their reading lists). Respects DoD-22 (claimed by S-D8 and S-D9): nothing it publishes shows a secret, the Apify proposal or Alex's own GetSales outbound. Uses DoD-11 (Alex's brand capture) only through the site's branding. |
| 2. Its neighbours | Depends on S1 (lists L-02 and L-01). Runs in parallel with S-D4, S-D6, S-D7, S-D8, S-D9 and Alex's own Addvery research. Feeds S-D3 (the output contract, the synthetic sample, the company data), Alex's research (the runner), S-D8 (the D1 section, through `BUILD`) and S-D9 (which may point followers at it). |
| 3. Operator preflight | §1 (DI-6). |
| 4. Decision log | §9. |
| 5. Forking gates | §8. |
| 6. Working directory | `scraping\`, with the reading list in §3. Its `CLAUDE.md` (written by S0) points here. |

## 3. Routing and resources

Paths are relative to `scraping\`. Step 1 of the run confirms every resource is reachable and turns anything ambiguous into a desk question.

- `..\CHARTER.md`: the parent context. Read only; never edit.
- `..\SESSIONS.md`: the roster. Message sessions only by these names. Edit only S-D1's own row, committed on its own with `[roster]`.
- `..\GIT.md`: the shared working tree rules. Commit only `scraping\`, path-limited.
- `..\answer-desk\ASKING.md`: the desk format, gate approvals, TASK lines, the poke, the 18:00 rule.
- `..\answer-desk\qa\S-D1.md`: S-D1's question record. The desk creates it with the first question.
- `..\Operator tasks\Archive\INDEX.md`: Alex's earlier answers, verbatim, and DI-6 once archived. Never re-ask what they settle.
- The charter's "Definition of done" (in `..\CHARTER.md`, written in by S2 as change C03): the signed-off project DoD. Read DoD-8, DoD-9 and DoD-22.
- `..\orchestration\_templates\Gate approval template.md`, `..\orchestration\_templates\Operator task template.md` and `..\orchestration\check_gate.py`: the forms for Alex's tasks, and the 5-minute gate check.
- `SPEC.md`: this file. `HANDOFF.md`, if it exists: state after a fork.
- `..\research\DIRECTORY.md`: the index of every research report. `..\research\lists\L-02-scraping.md` (this spec's list) and `..\research\lists\L-01-parent.md`: S1's lists, read only. L-02's R3 is the output contract research that S-D3 reads too.
- Research findings: S2 adds a line here for each report when S1 sends FINDINGS for L-01 and L-02.
- Apify's public docs, read only: the API reference at https://docs.apify.com/api/v2, the platform docs at https://docs.apify.com, and the Store at https://apify.com/store. The API is the only way S-D1 talks to Apify. No Apify connector is attached to this project.
- `..\getsales\SPEC.md`: S-D3's spec, read only, for the fields its enrichment step and first-message variable need. Questions go to `s-d3-getsales`.
- `..\legibility\posted.md`: S-D9's log, read only. Its "Left out" table kept the scraping tool's name off the site at 13:50 (DI-6 question 3 settles it).
- `..\Addvery Research\`: Alex's own folder, git-ignored. S-D1 doesn't need to read it, and never edits it or copies anything from it into a tracked file. Under DI-6 question 4's default, its only link is that Alex's research may call S-D1's runner (`output\README.md`). Until his research is ready, S-D1 works on its own target and the synthetic sample.
- Never opened, by the session or any subagent: the Apify proposal, Alex's private `hi-apify` repo, Alex's own GetSales outbound, and the Apify Console in a browser.

**Outputs** (files S-D1 creates; none exist yet, so they aren't resources):
- The token file, `APIFY_TOKEN=...`, in the folder's git-ignored env file (`.env`, covered by the root ignore rule and by S-D1's own ignore file). Read only by the runner. Never printed, opened on screen, pasted into chat, put on a command line or committed.
- Raw scraped data in the git-ignored data folder, local only. Never committed, never quoted into a tracked file.
- Everything else in the tree below.

Folder tree:

```
scraping\
  CLAUDE.md              written by S0
  SPEC.md                this file
  HANDOFF.md             written at each fork (§8)
  .gitignore             .env and data/, so nothing secret or raw is ever tracked
  .env                   the token (git-ignored)
  runner\                scripts that start actor runs through the API and collect their datasets; check_token.py
  actors.md              the actors chosen, their inputs, and what a run costs
  runs\LEDGER.md         every run: time, actor, input in one line, run id, cost in USD, item count; no token, no scraped content
  data\                  raw datasets (git-ignored)
  output\SCHEMA.md       the output contract: fields, sources, formats, and which fields feed S-D3's first-message variable
  output\sample\         synthetic records in the schema, clearly fictional, for S-D3's dry run
  output\README.md       how another session, or Alex, runs the runner from its own folder
  site\d1.md             the D1 section's content for `website`
```

## 4. Problem and scope

**The problem.** The site has to show, so that a visitor follows it without explanation, that Alex can turn the open web into usable account research with Apify. Legibility matters more than function (charter, "Deliverables"). The same work has to leave something other specs can use: S-D3 enriches leads and computes a first-message variable before import into GetSales, and Alex's own Addvery research may run the same scrapers. All of it happens on a public repo and on camera, next to a proposal that must never be shown.

**In scope.**
- Choosing two or three Apify Store actors that need no login or cookies, from L-02's findings.
- A runner that drives them through the public API, with every run logged and kept under Alex's spend cap.
- One demo run on the target DI-6 question 2 picks, on tiny inputs, with its raw data kept local.
- The research step: raw pages and results into structured research, a source URL and fetch time on every field.
- The output contract, a synthetic sample in it, and a how-to for reusing the runner.
- The D1 section's content and its build request to `website`.
- Telling `orchestration` where the output is, so it reaches its readers' reading lists (DoD-9).

**Out of scope.**
- Real data beyond what DI-6 question 2 allows. The charter's Scope binds: no real data through the demos except the D3 live run on six stakeholders; no automation sending except that live run; no one else's LinkedIn account. S-D1 sends nothing.
- Scraping people, unless DI-6 question 4 says otherwise. Under its default, S-D1 holds no personal data at all.
- Any actor that needs a login, cookies or Alex's LinkedIn session.
- Sales Navigator, the CSV export and the GetSales import (S-D3).
- Alex's Addvery research, the six stakeholders and the brand capture (S-D2, his own; DI-3 Q3.3).
- Hosting video. The D1 section shows run artifacts, not footage.

## 5. Definition of done

Written before research and methodology. Each criterion traces to a project DoD item.

| Criterion | Traces to |
| --- | --- |
| The live site has a D1 section (`BUILT S-D1-B1`) that shows, in order, what was asked, what ran (actors, time, cost, items), what came out, and how it feeds the outbound demo, so a visitor follows it without explanation. | DoD-8 |
| The section uses the site's Addvery branding, as `website` builds it. | DoD-8 |
| The demo ran on the real Apify API: `runs\LEDGER.md` shows each run's id, cost and item count, with the total inside Alex's cap. | DoD-8 |
| `output\SCHEMA.md`, `output\sample\` and the demo dataset exist, and S-D3's SPEC.md names them in its "Routing and resources" (through the `OUTPUT` line to `orchestration`). | DoD-9 |
| `output\README.md` lets another folder run the scrapers without reading this spec. | DoD-9 |
| No tracked file in `scraping\` holds the token or raw scraped data, and the D1 section names no person. | DoD-22 (respected, not claimed) |

## 6. Research step

At launch the session sends `s1-research` exactly one line:

`RESEARCH S-D1: L-02, plus L-01, the actor choice, the run pattern and the output contract S-D3 needs before its 17:00 live run, needed by 15:45`

Approving the list is S1's gate, not this session's. S-D1 is already a reader of L-01, which is with Alex as OT-01.

**Groundwork that goes ahead while research runs** (none of it depends on findings): the folder tree, `scraping\.gitignore` and its check, the empty `.env` and `runner\check_token.py`, the token task, a token check against the API, the ledger's header, a draft `output\SCHEMA.md` (v0) from what S-D3's pipeline needs, and a synthetic sample in it.

**What waits for FINDINGS:** the actor choice, the runner's run pattern, the schema's final fields, every real run, and the D1 section's content (L-01 R1 is on legibility).

**If research is late.** S-D3's live run is proposed for 17:00, and S-D1's contract must reach it by 16:30. If FINDINGS for L-02 haven't landed by 16:00, the session sends the spec-draft gate anyway, with the research verdicts marked pending and the methodology built on its groundwork. Alex decides in that gate whether to build without findings (DI-5: he may soften the research rules when time is short). The schema goes to S-D3 as a draft either way.

## 7. Methodology and steps

**Draft methodology.** The session confirms or revises it once the L-02 synthesis lands.

1. **Actors.** Two or three Store actors with no login: one for the target's own web pages, one for public listings such as job posts or search results, and one for news if it's cheap. Each is chosen on L-02 R1's cost and reliability verdicts and recorded in `actors.md`.
2. **Runner.** One script per pattern L-02 R2 recommends: start a run through the API, wait for it, pull its dataset into `data\`, and write the ledger line. Inputs are tiny (L-02 R4). Before each run it checks the ledger total against the cap. It reads the token from `.env` and never prints it.
3. **Research step.** A subagent turns the raw dataset into the schema's records. Every field carries its source URL and fetch time, and a field with no source is left empty, never guessed (L-02 R3).
4. **Contract.** `output\SCHEMA.md` covers company fields and person fields, the CSV columns S-D3 joins on, and which fields feed the first-message variable. Person fields exist so Alex's research can fill them in his own folder (DI-6 question 4); S-D1 fills only company fields.
5. **Sample.** Six fictional records in the schema (`Sample Person 1`, `example.com` domains), so S-D3 can dry-run without real data.
6. **The D1 section.** Three steps a visitor reads in under a minute: the question, the run (actors, time, cost, items, taken from the ledger), and the result (the structured research with its sources, and the arrow into the outbound demo). The site shows a stored run, never a live one, so it can't fail on screen.

**Coherency check.** Once revised: "if we execute this methodology, will that DoD be satisfied?" Each criterion in §5 is checked against the step that produces it. A gap is fixed in the methodology, never by loosening the DoD.

**Steps.**

1. Read the reading list and confirm each resource is reachable. Load SendMessage. Check that DI-6's answers are applied in §1 and §9.
2. Send the `RESEARCH` line (§6).
3. Groundwork. Write `scraping\.gitignore` (`.env`, `data/`) and confirm with `git check-ignore -v .env data\x` before anything else lands. Create `.env` holding only `APIFY_TOKEN=`. Write `runner\check_token.py`, which prints only `TOKEN SET` or `TOKEN EMPTY` and exits 0 or 1. Write the ledger header, SCHEMA v0 and the sample. Commit.
4. Token. If `check_token.py` says empty, write `..\Operator tasks\OT-<nn> S-D1 Apify token.md` from the operator task template (the next free OT number: check `Operator tasks\` and `Operator tasks\Archive\` just before writing): pause the recording, open `scraping\.env`, paste the token after `APIFY_TOKEN=`, save, resume. Commit it path-limited, then send `answer-desk` `TASK S-D1: <file name> is waiting on you: the Apify token, 2 minutes with the recording paused; unblocks every real run`. Wait with Monitor, running `python -I runner\check_token.py` every 300 seconds; poke after 15 minutes. Once set, make one API call that prints only named fields (HTTP status, plan, this month's usage in USD), never the whole response. Then `TASK DONE S-D1` and `ARCHIVE <file name>: readers S-D1`. Under DI-6 question 5's option B, read Alex's earlier tooling meanwhile, for method only.
5. On FINDINGS for L-02 (and L-01), confirm or revise the methodology above. Send any post-research questions to the desk, one at a time. Run the coherency check. Commit.
6. **Gate: spec draft.** Commit SPEC.md, then freeze the whole of it into `..\Operator tasks\OT-<nn> Gate approval S-D1 spec draft.md` from the gate approval template (next free OT number, checked just before writing), with a five-line summary first. Commit that file path-limited, so the snapshot names a commit. Send `answer-desk` `TASK S-D1: <file name> is waiting on you: S-D1's DoD, research verdicts and methodology; unblocks the real runs and the D1 section`. Wait with Monitor, running `python -I orchestration\check_gate.py "Operator tasks\<file>"` from the repo root every 300 seconds until it exits 0. Poke after 15 minutes. Meanwhile, send `s-d3-getsales` the draft schema and the sample, marked draft. On `CHANGES`, apply them, refresh the snapshot and wait again. Then send `TASK DONE S-D1: <file name>` to `answer-desk` and `ARCHIVE <file name>: readers S-D1` to `orchestration`. From 18:00, an open gate means proceed on the coherency-checked methodology and log it in §9.
7. Build, delegated (P7, P1). One subagent builds the runner; one writes the research step; one drafts `site\d1.md`. Each is handed only the files it needs: this spec, `actors.md`, the relevant reports, and for the research step `output\SCHEMA.md` and the dataset path. Then run the demo on the DI-6 question 2 target, on tiny inputs, logging each run. A run that would pass the cap doesn't start: it becomes a desk question. Commit after each finished piece.
8. Freeze the contract by 16:30: SCHEMA v1, the sample, the dataset path and `output\README.md`. Send `orchestration` `OUTPUT S-D1 ready: <paths in scraping\>; readers: S-D3`, so S2 adds the resource lines as it does for FINDINGS, and tell `s-d3-getsales` in one line. Commit.
9. Site request. Send `website` `BUILD S-D1-B1: add the D1 section, linked from demo 1 in the deliverables view, as a three-step story (the question, the run, the result). Content: scraping\site\d1.md. Source: runs\LEDGER.md and the structured research.` Wait for `BUILT S-D1-B1` or `REFUSED S-D1-B1`. On `REFUSED`, fix what it names and send `S-D1-B2`. One request at a time.
10. Screen care check before DONE. `git grep -n apify_api_ -- scraping` finds nothing; `git status --ignored -- scraping` shows `.env` and `data\` as ignored; `site\d1.md` names no person and doesn't mention the proposal. Before every commit along the way, `git diff --cached --name-only` lists only `scraping/` paths and never `.env` or `data/`.
11. Close. When §5 is met, send `orchestration` `DONE S-D1: D1 section live (BUILT S-D1-B1), <n> runs for $<total> in runs\LEDGER.md, output contract in output\SCHEMA.md named by S-D3`. Stay up to answer readers' questions until `orchestration` says stop, then move S-D1's row to Finished in `..\SESSIONS.md` (`[roster]` commit) and stop.

Commits are path-limited, after every finished step: `git commit -m "[scraping] <message>" -- scraping/...`. Don't push; the watcher does.

## 8. Forking gates (P8)

| Gate | When |
| --- | --- |
| F1, methodology locked | The spec-draft gate is approved, if the context is more than a third full. The build then starts clean. |
| F2, window closes | 17:45 Prague, shortly before 18:00, so overnight starts clean (P6). |
| F3, context | The context is about half full, whatever else is happening. |

**How it forks.**
1. Write `HANDOFF.md`: the state of each step and run, the ledger total against the cap, the open desk question with the time it was sent and the last poke, open operator tasks and gates with their times, the `BUILD` request in flight, and decisions since the last fork. Commit it.
2. From `scraping\`, launch the successor under the same name: `claude --bg -n s-d1-scraping "Read CLAUDE.md, then HANDOFF.md. You are now the active S-D1 session."`
3. Update S-D1's row in `..\SESSIONS.md` with the handoff time, and commit it on its own: `git commit -m "[roster] s-d1-scraping handoff <time>" -- SESSIONS.md`.
4. Announce it in one line to `orchestration`, `answer-desk` (with the open `S-D1-Q` id, if any), `s1-research`, `website` and `s-d3-getsales`: `HANDOFF s-d1-scraping, <time>: a fresh session has taken over under the same name.`
5. The old session stops itself with `claude stop` and its own exact id.

## 9. Decision log (P5)

Before 18:00 Prague, a passed deadline means poke, not decide. From 18:00, decide on the default, log it here, and send `WITHDRAW <id>` for a desk question. Start each decision with the time and the question id.

| Decision | Justification | Why it's the right call | Blast radius if changed |
| --- | --- | --- | --- |
| 2 Nov, drafting (wave2-specs): no on-camera scene. The D1 section is built from run artifacts (the ledger, the structured research), not footage. | The charter's outline asks of Alex only "Screen care around the recent proposal", and the timetable says S-D1 needs no scene. | It spends none of Alex's camera time (P3, P6), and a stored run can't fail on screen. | Small. A scene takes one timetable slot, and a clip from S-D9 one more `BUILD`. |
| 2 Nov, drafting (wave2-specs): only actors that need no login or cookies. Alex's LinkedIn session is never handed to Apify. | Scope rules out connecting anyone else's LinkedIn account, and a scraper running on Alex's own session puts his account at risk. | The demo shows the capability without risking an account or needing anyone's credentials but the Apify token. | Fewer LinkedIn sources in the demo. Allowing one is a change to `actors.md` and a new desk question. |
| 2 Nov, drafting (wave2-specs): raw scraped data stays in `scraping\data\`, git-ignored by `scraping\.gitignore`. Only the schema, the sample, the ledger and the curated D1 content are tracked. | The repo is public. Alex kept his own Addvery research out of it although it's public information (DI-2 Q2.2: "it's also going to be ignored just so we're not posting"). | The same courtesy for whatever S-D1 scrapes, and a nested ignore file needs no root change. | None for readers on this computer. Tracking the data later is one commit. |
| 2 Nov, drafting (wave2-specs): the token lives only in `scraping\.env`. The runner reads it; checks print only `TOKEN SET` or `TOKEN EMPTY`, and API checks print named fields only. The session never opens the Apify Console. | The charter's risk rule: anything on screen can be published, and no secrets on screen or in tracked files. | The token never reaches a transcript, the screen or the repo. | None. |
| 2 Nov, drafting (wave2-specs): the output reaches S-D3's reading list through an `OUTPUT S-D1 ready: <paths>; readers: S-D3` line to `orchestration`, shaped like S1's `FINDINGS`. | DoD-9 needs the output on readers' reading lists, and S2 writes specs' reading lists. S2's accepted requests name `FINDINGS` but not a spec's own output. | It uses S2's existing resource-line path and keeps the dependency map in one place. | If S2 prefers otherwise, `s-d3-getsales` adds the line to its own SPEC.md. Only step 8 changes. |
| 2 Nov, drafting (wave2-specs): no deliverable sign-off gate. The spec-draft gate shows Alex exactly what the D1 section will contain. | DoD-8 and DoD-9 don't require his sign-off, and the brief keeps his gate count low (P4). | One gate covers the DoD, the research verdicts and the content plan. | If he wants to see the section before it goes live, one more gate before step 9, about 5 minutes of his time. |
| 2 Nov, drafting (wave2-specs): research is needed by 15:45, and the contract is frozen by 16:30. | S-D3's live run is proposed for 17:00 and needs the schema and the sample for its dry run first. | It leaves S-D3 30 minutes to dry-run on the sample. | If the live run moves, both times move with it. |
