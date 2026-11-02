# S-D1 Scraping research demo: executable spec

Status: running since 14:39 (steps 1 to 4 done; waiting on Alex's summary through S-D1-R1, and on L-01 around 16:00) · Row: S-D1 — Scraping research demo · Folder: `scraping\` · Session: `s-d1-scraping`

S-D1 is the demo layer for D1. Alex does all the scraping on the Apify API himself, one-on-one in `..\Addvery Research\`, and writes a summary of its outputs there (DI-6 A6.2, A6.5). S-D1 runs no actors, calls no API and holds no token. Once his summary exists, it turns it into the site's D1 section: a short story a visitor follows without explanation, naming Apify (A6.3). Alex approves the draft section first, then `website` builds it. S-D1 also tells `orchestration` which of his output files other specs read, S-D3 first (DoD-9).

## 1. Operator preflight (P3)

The preflight was decision intake DI-6 (`..\Operator tasks\Archive\Decide - how the scraping demo should work.md`). **Launch gate: met.** Alex answered it on 2 Nov, and the answers are applied below and in §9.

| DI-6 question | Question | Alex's answer | Applied |
| --- | --- | --- | --- |
| 1 | Apify account, token and spend cap | A6.1: "$10 cap and we can move everything over now because we're currently not recording" | $10 is the cap on his own Apify spend. S-D1 needs no token and spends nothing. |
| 2 | What the demo scrapes | A6.2: Addvery, scraped by him one-on-one in `Addvery Research\`: "it is a demonstration of scraping and we'll do some kind of summary of all of the outputs. That, again, I'll manage one-on-one." | S-D1 scrapes nothing. The D1 section presents his summary. |
| 3 | May the public site name Apify? | A6.3: "yes" | Option A: the D1 section names Apify and the actors he used. S-D1 tells `s-d9-legibility`. |
| 4 | The six stakeholders' enrichment | A6.4, applied to S-D3: GetSales does no scraping and uses what's already scraped in `Addvery Research\`. | S-D1 publishes no schema or sample. Its `OUTPUT` line names his files for S-D3. |
| 5 | Earlier Apify tooling to reuse | A6.5: "I really don't think this D1 needs any Apify actors or Apify API. It's all going to be happening in the Addvery research subdirectory and this spec or this demo can pull from that research" | No runner, no actors, no token. L-02 isn't needed by S-D1. |

**Operator scenes.** None, on camera or off. What S-D1 needs from Alex: one desk question at launch (where his summary will be, §7 step 4), and one gate approval of the draft section, about 5 to 10 minutes.

**Runtime questions** go to `answer-desk` as asker `S-D1`, ids `S-D1-Q1` onwards, one at a time (`..\answer-desk\ASKING.md`). After 15 minutes waiting on Alex for anything, send `POKE S-D1: waiting on you for <what>`, and again every 15 minutes. Before 18:00 Prague, keep waiting and do everything that doesn't depend on the answer. From 18:00, decide on the default, log it in §9 and send `WITHDRAW <id>`.

## 2. Spec contract

| Item | S-D1's answer |
| --- | --- |
| 1. Its place | Row S-D1, deliverable D1. Claims DoD-8 (a legible Apify scraping and research demo on the live site, in Addvery's brand) and DoD-9 (its research output exists in a form other specs read, and is on their reading lists). Respects DoD-22 (claimed by S-D8 and S-D9). |
| 2. Its neighbours | Depends on S1 (list L-01) and on Alex's own scraping and summary in `..\Addvery Research\` (the operator-owned S-D2 row). Runs in parallel with S-D3 to S-D9. Feeds S-D8 (the D1 section, through `BUILD`), S-D3 and any other reader (the `OUTPUT` line naming his files), and S-D9 (the rule on the tool's name). |
| 3. Operator preflight | §1 (DI-6). |
| 4. Decision log | §9. |
| 5. Forking gates | §8. |
| 6. Working directory | `scraping\`, with the reading list in §3. Its `CLAUDE.md` (written by S0) points here. |

## 3. Routing and resources

Paths are relative to `scraping\`. Step 1 of the run confirms every resource is reachable and turns anything ambiguous into a desk question.

- `..\CHARTER.md`: the parent context, including the signed-off "Definition of done" (change C03). Read DoD-8, DoD-9 and DoD-22. Read only; never edit.
- `..\SESSIONS.md`: the roster. Message sessions only by these names. Edit only S-D1's own row, committed on its own with `[roster]`.
- `..\GIT.md`: the shared working tree rules. Commit only `scraping\`, path-limited.
- `..\answer-desk\ASKING.md`: the desk format, gate approvals, TASK lines, the poke, the 18:00 rule.
- `..\answer-desk\qa\S-D1.md`: S-D1's question record. The desk creates it with the first question.
- `..\Operator tasks\Archive\INDEX.md`: Alex's earlier answers, verbatim, and DI-6 once archived. Never re-ask what they settle.
- `..\orchestration\_templates\Gate approval template.md` and `..\orchestration\check_gate.py`: the gate form and its 5-minute check.
- `SPEC.md`: this file. `HANDOFF.md`, if it exists: state after a fork.
- `..\research\DIRECTORY.md`: the index of every research report. `..\research\lists\L-01-parent.md`: S1's parent list, read only. Its R1, on making the work legible, shapes the D1 section.
- Research findings: S2 adds a line here for each report when S1 sends FINDINGS for L-01.
- `..\Addvery Research\`: Alex's own folder, git-ignored. S-D1 reads his summary of the scraping and the output files it names, from the local disk only, never from GitHub. It never edits the folder. Nothing from it goes into a tracked file before Alex approves the D1 section, and afterwards only what the approved section shows. Until the summary exists, S-D1 builds the section's frame.
- `..\getsales\SPEC.md`: S-D3's spec, read only, to see which of Alex's files its pipeline reads. Questions go to `s-d3-getsales`.
- `..\legibility\posted.md`: S-D9's log, read only. Its "Left out" table kept the tool's name off the site at 13:50; A6.3 lifts that for the name.
- Apify's public docs and Store, read only, at https://docs.apify.com and https://apify.com/store: only to name and link the actors Alex's summary lists.
- Never opened, by the session or any subagent: the Apify proposal, Alex's private `hi-apify` repo, Alex's own GetSales outbound, and the Apify Console.

**Outputs** (files S-D1 creates; none exist yet, so they aren't resources):
- A folder ignore file with `draft/`, so nothing drawn from Alex's folder is tracked before he approves it.
- A summary check script that prints only `FOUND` or `MISSING` for the path Alex gives, never the file's contents.
- The section's frame, the draft section (git-ignored) and, after approval, the published section, as in the tree below.

```
scraping\
  CLAUDE.md            written by S0
  SPEC.md              this file
  HANDOFF.md           written at each fork (§8)
  .gitignore           draft/
  check_summary.py     FOUND or MISSING, exit 0 or 1; honours the summary's "Status:" line
  Agent request - scraping summary for the site.md
                       S-D1-R1: what the summary must hold, for the session working in Addvery Research (S-D1-Q1)
  site\frame.md        the D1 section's structure and wording, with no Addvery material
  draft\d1.md          the full draft, drawn from his summary (git-ignored)
  site\d1.md           the approved section, committed only after his approval
```

## 4. Problem and scope

**The problem.** Alex's scraping of Addvery is real work done outside any spec. A visitor needs to see it as a demo in under a minute: what he scraped, with what, what came out, and how it feeds the outbound demo. Other specs need to know which of his files to read. The source folder is git-ignored out of courtesy to the client, the repo is public, and the Apify proposal must never show.

**In scope.**
- The D1 section's frame, then its full draft from Alex's summary.
- The gate where Alex approves the draft, and the `BUILD` request to `website`, quoting that approval.
- The `OUTPUT` line naming his output files for their readers (DoD-9).
- Telling `s-d9-legibility` that the site may name Apify (A6.3).

**Out of scope.**
- Any scraping, Apify run, API call or token (A6.5).
- The summary itself, and everything else in his Addvery research (A6.2; DI-3 Q3.3).
- S-D3's enrichment, messages and campaign (A6.4).
- The six stakeholders and the brand capture (S-D2, his own).
- Hosting video.
- The charter's Scope binds S-D1: it adds no real data of its own and sends nothing. What the section shows from his research is Alex's to approve.

## 5. Definition of done

Written before research and methodology. Each criterion traces to a project DoD item.

| Criterion | Traces to |
| --- | --- |
| The live site has a D1 section (`BUILT S-D1-B1`) that a visitor follows without explanation: what Alex scraped and why, what ran on the Apify API (named, A6.3), what came out, and how it feeds the outbound demo. | DoD-8 |
| The section uses the site's Addvery branding, as `website` builds it. | DoD-8 |
| Alex approved the draft section in a gate task before the `BUILD`, and the `BUILD` quotes that approval. | DoD-8 |
| The output files of his research that other specs read are named in an `OUTPUT` line to `orchestration`, and S-D3's SPEC.md names them in its "Routing and resources". | DoD-9 |
| No tracked file holds material from `..\Addvery Research\` before his approval, and nothing published shows the Apify proposal. | DoD-22 (respected, not claimed) |

## 6. Research step

At launch the session sends `s1-research` exactly one line:

`RESEARCH S-D1: L-01 only (L-02 isn't needed by S-D1, because Alex runs all the scraping himself in Addvery Research; offer L-02 to him for his own work if useful), L-01 R1 on legibility shapes the D1 section, needed by 16:00`

Approving the list is S1's gate, not this session's. L-01 is already with Alex as `..\Operator tasks\Archive\Approve - research plan for the whole project.md`.

**Groundwork while research runs:** the folder tree, `.gitignore` and its check, `check_summary.py`, the frame's structure, the desk question, the `OUTPUT` line, and the note to `s-d9-legibility`.

**Waits for FINDINGS:** the frame's final layout and wording (L-01 R1). **Waits for Alex's summary:** the draft's content.

**If research is late.** If L-01 hasn't landed by 16:30, the spec-draft gate goes to Alex with its verdicts marked pending, and the frame stands on the groundwork (DI-5: he may soften the research rules when time is short).

## 7. Methodology and steps

**Draft methodology.** The session confirms or revises it once L-01's synthesis lands.

1. **Frame.** Three steps a visitor reads in under a minute: the question (what Alex wanted to know about Addvery, and why), the run (the Apify actors and API, named, with counts, time and cost where his summary gives them), and the result (the summary's key outputs at company level, and the arrow into the outbound demo). The site shows a stored result, never a live run.
2. **Fill.** A subagent, handed only the frame, the summary's path and the screen-care rules, drafts `draft\d1.md` from his summary. It names no person (Alex can add names at the gate), shows nothing of the proposal, and cites his summary as its source.
3. **Approve.** The whole draft goes to Alex as a gate task. Nothing reaches the site or a tracked file before he approves it.
4. **Publish.** The approved draft becomes `site\d1.md`, and the `BUILD` quotes the approval.

**Coherency check.** Once revised: "if we execute this methodology, will that DoD be satisfied?" Each criterion in §5 is checked against the step that produces it. A gap is fixed in the methodology, never by loosening the DoD.

**Steps.**

1. Read the reading list and confirm each resource is reachable. Load SendMessage. Check that DI-6's answers are applied in §1 and §9.
2. Send the `RESEARCH` line (§6). Send `s-d9-legibility` one line: `S-D1: Alex answered DI-6 Q6.3 "yes": the site may name Apify. Anything from near the proposal stays out.`
3. Groundwork. Write `.gitignore` (`draft/`) and confirm with `git check-ignore -v draft\d1.md` before any draft exists. Write `check_summary.py` and `site\frame.md`. Commit.
4. Ask `S-D1-Q1`: where will his summary of the scraping outputs be (a file in `Addvery Research\`), roughly when, and which of his output files S-D3 and other specs should read? Default from 18:00: no summary, so the section stays open for the morning cleanup session, logged in §9.
5. On the answer, send `orchestration` `OUTPUT S-D1 ready: <his output files in ..\Addvery Research\, names only>; readers: S-D3`, adding any other reader he names, so S2 adds the resource lines as it does for FINDINGS. Tell `s-d3-getsales` in one line. Then wait for the summary with Monitor, running `python -I check_summary.py "<path>"` from `scraping\` every 300 seconds until it exits 0. Poke only 15 minutes after the time he gave has passed.
6. **Gate: spec draft.** On FINDINGS for L-01, confirm or revise the methodology and run the coherency check. Commit SPEC.md, then freeze it into `..\Operator tasks\Approve - the scraping demo plan.md` from the gate approval template. Its OT id (the next free one: check `Operator tasks\` and `Operator tasks\Archive\` just before writing) goes in the front matter only. It opens with `## What this is`, in plain words with no codes: the scraping section of the site, what this plan covers, what approving it unblocks. Commit that file path-limited and send `answer-desk` `TASK S-D1: Approve - the scraping demo plan.md is waiting on you: S-D1's DoD and methodology; unblocks the D1 section`. Wait with Monitor, running `python -I orchestration\check_gate.py "Operator tasks\Approve - the scraping demo plan.md"` from the repo root every 300 seconds until it exits 0. Poke after 15 minutes. On `CHANGES`, apply them, refresh the snapshot and wait again. Then send `TASK DONE S-D1: Approve - the scraping demo plan.md` to `answer-desk` and `ARCHIVE Approve - the scraping demo plan.md: readers S-D1` to `orchestration`. If the draft section (step 7) is ready by then, it goes in the same task as step 8 describes, so Alex sees one gate, not two (P4). From 18:00, an open spec-draft gate means proceed on the coherency-checked methodology and log it.
7. Draft, delegated (P7). Once the summary is found, a subagent writes `draft\d1.md` (methodology, step 2). Review it against §5 and the screen-care rules.
8. **Gate: D1 section sign-off.** Write `..\Operator tasks\Approve - what the scraping demo section shows.md` from the template, with its OT id in the front matter only and a plain-words `## What this is` first. The draft is drawn from his git-ignored folder and operator tasks are tracked, so this task doesn't copy it in. Instead it names `scraping\draft\d1.md` (git-ignored) and its SHA-256 (first 12 characters) in `Snapshot of`, with a five-line summary that names no person and quotes nothing from his folder. Under "What's being approved" it embeds the draft with the Obsidian embed `![[scraping/draft/d1.md]]`: the vault is the repo root, so Alex reads the whole draft in place, and it never enters the public repo. Commit the task path-limited, send `TASK S-D1: Approve - what the scraping demo section shows.md is waiting on you: the whole D1 section draft; unblocks the site's D1 section`, and wait with Monitor, running `python -I orchestration\check_gate.py "Operator tasks\Approve - what the scraping demo section shows.md"` every 300 seconds, as in step 6. Poke after 15 minutes. On `CHANGES`, edit the draft, record its new hash, and wait again. Then send `TASK DONE S-D1: Approve - what the scraping demo section shows.md` and `ARCHIVE Approve - what the scraping demo section shows.md: readers S-D1`. From 18:00, an open sign-off stays open for the morning cleanup session, and nothing goes on the site.
9. Publish. Copy the approved draft to `site\d1.md` and commit it. Send `website` `BUILD S-D1-B1: add the D1 section, linked from demo 1 in the deliverables view, as a three-step story (the question, the run, the result). Content: scraping\site\d1.md. Source: Alex's summary of his Apify scraping of Addvery. Approved: Approve - what the scraping demo section shows.md, ticked by Alex at <time>.` Wait for `BUILT S-D1-B1` or `REFUSED S-D1-B1`. On `REFUSED`, fix what it names and send `S-D1-B2`. One request at a time.
10. Screen care before DONE. `git status --ignored -- scraping` shows `draft\` as ignored. `site\d1.md` matches the approved draft exactly. Before every commit, `git diff --cached --name-only` lists only `scraping/` paths, and never `draft/`.
11. Close. When §5 is met, send `orchestration` `DONE S-D1: D1 section live (BUILT S-D1-B1, approved in Approve - what the scraping demo section shows.md); Alex's research outputs named for S-D3 (OUTPUT line)`. Stay up to answer readers' questions until `orchestration` says stop, then move S-D1's row to Finished in `..\SESSIONS.md` (`[roster]` commit) and stop.

Commits are path-limited, after every finished step: `git commit -m "[scraping] <message>" -- scraping/...`. Don't push; the watcher does.

## 8. Forking gates (P8)

| Gate | When |
| --- | --- |
| F1, window closes | 17:45 Prague, shortly before 18:00, so overnight starts clean (P6). |
| F2, context | The context is about half full, whatever else is happening. |

**How it forks.**
1. Write `HANDOFF.md`: the state of each step, the summary's path and whether it was found, the open desk question with the time it was sent and the last poke, open gates with their times and the draft's hash, the `BUILD` request in flight, and decisions since the last fork. Commit it.
2. From `scraping\`, launch the successor under the same name: `claude --bg -n s-d1-scraping "Read CLAUDE.md, then HANDOFF.md. You are now the active S-D1 session."`
3. Update S-D1's row in `..\SESSIONS.md` with the handoff time, and commit it on its own: `git commit -m "[roster] s-d1-scraping handoff <time>" -- SESSIONS.md`.
4. Announce it in one line to `orchestration`, `answer-desk` (with the open `S-D1-Q` id, if any), `s1-research`, `website` and `s-d3-getsales`: `HANDOFF s-d1-scraping, <time>: a fresh session has taken over under the same name.`
5. The old session stops itself with `claude stop` and its own exact id.

## 9. Decision log (P5)

Before 18:00 Prague, a passed deadline means poke, not decide. From 18:00, decide on the default, log it here, and send `WITHDRAW <id>` for a desk question. Start each decision with the time and the question id.

| Decision | Justification | Why it's the right call | Blast radius if changed |
| --- | --- | --- | --- |
| 2 Nov, A6.1 applied (wave2-specs): the $10 cap is Alex's cap on his own Apify spend. S-D1 spends nothing and needs no token. Moving the credentials is his, in his own folder. | A6.5 takes all Apify work out of S-D1, so A6.1's cap and credential move apply to his scraping. | No token in `scraping\` means no secret to guard there. | None for S-D1. |
| 2 Nov, A6.2 applied (wave2-specs): S-D1 scrapes nothing. The D1 section presents Alex's own scraping of Addvery, through his summary. | A6.2: "I'm going to scrape Addvery ... That is separate. No spec is going to manage that." | The demo is his real work, and S-D1 only makes it legible. The intake's Scope question becomes his call, made at the section gate. | If he wants S-D1 to scrape after all, the runner and token come back: a new spec draft. |
| 2 Nov, A6.3 applied (wave2-specs): option A. The section names Apify and the actors he used, and S-D9 is told. | A6.3: "yes". | The charter and DoD-8 name it, and the risk is the proposal, not the name. | One edit to the section and one `BUILD`. |
| 2 Nov, A6.4 applied (wave2-specs): no output schema or synthetic sample from S-D1. S-D3 reads his folder directly, and S-D1's `OUTPUT` line names the files. | A6.4 (applied to S-D3): GetSales uses "any information already scraped". | It leaves one source of truth for the enrichment: his folder. | S-D3's reading list only. |
| 2 Nov, A6.5 applied (wave2-specs): no runner, no actors, no API calls, no token, and L-02 isn't requested. "The scraping thing" in A6.5 is read as his Addvery scraping. | A6.5: "this spec or this demo can pull from that research". The same answer says "It's all going to be happening in the Addvery research subdirectory". | It matches the rest of his answer and DI-3 Q3.3. | If he meant `scraping\`, his scraping moves here: a new spec draft and a git-ignored data folder. |
| 2 Nov, drafting (wave2-specs): the section gate task names the git-ignored draft and its hash instead of copying the draft in. | Operator tasks are tracked and the repo is public. Nothing from `Addvery Research\` goes into a tracked file before he approves it. | The approval still covers one fixed version, nothing leaks before he has seen it, and the Obsidian embed keeps the whole draft in front of him (his readability rule). | One step (8). If S2 prefers the copy-in, the task is committed only after he ticks it. |
| 2 Nov, drafting (wave2-specs): his output files reach S-D3's reading list through an `OUTPUT S-D1 ready: <paths>; readers: <spec ids>` line to `orchestration`, shaped like S1's `FINDINGS`. | DoD-9 needs them on readers' reading lists, and S2 writes specs' reading lists. | It uses S2's resource-line path and keeps the dependency map in one place. | If S2 prefers otherwise, `s-d3-getsales` adds the lines itself. Only step 5 changes. |
| 2 Nov, drafting (wave2-specs): while the summary is outstanding, poke only 15 minutes after the time Alex gave, not every 15 minutes from the start. | He is doing that work himself, one-on-one. | It keeps the desk quiet while he works (P4). | None. |
| 2 Nov 14:58, S-D1-Q1 applied: the summary goes at `..\Addvery Research\Scraping summary.md` (option a). As he asked, S-D1 wrote a request in decision-intake style, completed agent-to-agent: `Agent request - scraping summary for the site.md` (S-D1-R1), in `scraping\`. | A S-D1-Q1: "a, but have the scraping demo create a md file telling the addvery research session what it needs, basically in the decision intake style from templates, but make sure it's clear that it will be completed agent-to-agent". | The request sits in S-D1's own folder, because S-D1 never writes in his folder. It's tracked but holds no Addvery material, and its answers go only into his git-ignored summary. Questions come back by message to `s-d1-scraping`, not through the desk. | If he wants it inside `Addvery Research\`, one file moves and nothing else changes. |
| 2 Nov 15:00, S-D1-Q1 follow-on: the `OUTPUT` line (step 5) waits for the summary's part N5, its list of files the other demos read, because Alex named no files in Q1 and handed that to his research session. It's sent as soon as N5 is filled, even while the rest of the summary is still draft. | DoD-9 needs the files named, and only his research session knows them. | It keeps one source for the names, and an early N5 unblocks readers before the page is done. | Step 5's timing only. |
| 2 Nov 15:00, S-D1-Q1 follow-on: Alex gave no time, so the summary's `Ready by:` line sets it. Poke once at 16:30 if the summary file still doesn't exist, then 15 minutes after its `Ready by:` time, then every 15 minutes. The request asks for it by 17:00, so the section gate fits before 18:00. | Step 5: "Poke only 15 minutes after the time he gave has passed." Without a time, 16:30 matches §6's late-research point. | It keeps the desk quiet while he and his session work (P4), but still catches a request that never reached that session. | None. |
| 2 Nov 15:00: `check_summary.py` reports `FOUND` only when the summary's `Status:` line says ready and the file is 2 minutes unchanged, or after 15 unchanged minutes when it has no `Status:` line. It still prints one word and never the contents. | A file that merely exists may be half-written. The request asks for the status line. | No draft starts on a partial summary, and a forgotten status line can't block it forever. | None. |
