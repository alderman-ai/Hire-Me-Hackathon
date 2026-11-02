# S1 Research: executable spec

Status: ready to launch after S0 (DI-3 answered; launch gate met) · Row: S1 — Research (meta) · Folder: `research\` · Session: `s1-research`

This spec sets how research is chosen, run, stored and indexed. Alex decides what gets researched. Every research list goes to him before it runs, because the charter's research reading list says "do not attempt to do this without the operator in the loop", and DI-3 Q3.4 says "all this research part is the part that should involve me." Anything Alex tells the research session directly overrides this spec.

**Where the method comes from.** DI-3 asked for it to follow Alex's own earlier work, so it draws on two sources:
- **The spec lifecycle** in `alderman-ai/knowledge-work-executable-spec-research`: the DoD is written before the methodology, and a coherency check runs between them.
- **The research section of his Client Demo charter**, with its research directory and wildcard report. These are on local disk only, in `Desktop\Atlas OS\Projects\PROJ_Client Demo\` and `Desktop\Atlas OS\Isolated methodology review\`. They're in his `atlas-os` repo but haven't been pushed to GitHub.

The public repo has no research section of its own.

## 1. Operator preflight (P3)

The preflight was decision intake DI-3 (`Operator tasks\DI-3 S1 Research preflight.md`), which Alex answered in Obsidian. **Launch gate: met.** He said "DI-3 is ready" on 2 Nov, and S1 launches after S0, per the run order. Recordings needed: none.

| DI-3 | What Alex decided | Applied in |
| --- | --- | --- |
| Q3.1 (S1-Q1) | Research comes before methodology: "if there's an easy answer, an obvious answer, or a converged-upon answer, we're using it. If not, we at least know traps and gotchas." Findings are stored at the parent or child level and go on the reading list of every spec that needs them. Every research list carries three wildcards. | sections 4 to 6 |
| Q3.2 (S1-Q2) | No budget number. Each run is scoped to the size of the Client Demo research, "a list of questions", using the tools available here. | section 4 |
| Q3.3 (S1-Q3) | All Addvery research (company, stakeholders, brand capture) is Alex's own, done one-on-one in `..\Addvery Research\`, which is git-ignored. No spec covers it, and S1 has no Addvery topics. The brand-capture ownership question is dropped. | sections 2, 4 |
| Q3.4 (S1-Q4) | Research is part of the preflight and always involves Alex. It never runs on a default. He's at the computer until at least 18:00 Prague. | sections 1, 8 |

**Questions at runtime** go to the answer desk, one at a time (`..\answer-desk\ASKING.md`). Ids continue from S1-Q5.
- **S1-Q5, the first question: answered 13:59, "Just store it locally."** Read as option C: every report stays in `research\`, split into `global\` and per-spec subfolders, and nothing moves to other folders (section 6). The reading was put to Alex inside S1-Q6, with the alternative "keep research off GitHub" offered.
- **Then one question per research list,** to approve it (section 5).

**Waiting on Alex.** After 15 minutes waiting on him for anything (a desk question, an operator task or a decision intake), S1 sends `answer-desk` the line `POKE <asker>: waiting on you for <what>` (`answer-desk\ASKING.md`; S1's asker is `S1`). It sends the poke again every 15 minutes while it's still waiting. Before 18:00 Prague, it keeps waiting and works on anything that doesn't depend on the answer, such as drafting the next list or indexing. From 18:00, non-research decisions follow P5 (section 8). Research still waits for Alex.

## 2. Place, neighbours and folder (spec contract items 1, 2 and 6)

- **Place.** Row S1 of the spec outline. It claims the DoD items in section 9, which stay placeholders until S2 assigns real ids.
- **Depends on** S0. **Runs in parallel with** S2.
- **Feeds** every wave-2 spec. Each one gets a research list before its methodology is written: S-D1 and S-D4 first (spec outline), then the rest. S-D2 is out of scope, because Addvery research is Alex's own (Q3.3). A spec that needs Addvery material reads it from local disk in `..\Addvery Research\`, never from GitHub.
- **Works with S2.** S1 never edits the charter or another folder (GIT.md). The one root file it edits is `..\SESSIONS.md`, and only its own rows. Every report stays in `research\` (S1-Q5). S2, which the `orchestration` session runs, writes the reading-list lines pointing at them in each spec that needs them (DI-4 Q4.2: "Reading lists go into the executable specs").
- **One session, one role (P2).** `s1-research` drafts lists, dispatches research and reviews it; it doesn't research anything itself (P7).

Folder tree:

```
research\
  CLAUDE.md                  written by S0; reading list below
  SPEC.md                    this file
  HANDOFF.md                 written at each fork (section 10)
  DIRECTORY.md               the one index of every report, at both levels (section 6)
  BRIEFS.md                  the briefs handed to research subagents
  lists\L-<nn>-<scope>.md    one research list per spec or merged group (section 5)
  global\<report>.md         parent-level reports: research two or more specs need (S1-Q5)
  <spec folder>\<report>.md  child-level reports, e.g. scraping\, blog-pipeline\ (S1-Q5)
```

The CLAUDE.md that S0 writes for this folder must hold this reading list, in order: `..\CHARTER.md`, `..\SESSIONS.md` (the roster of official session names), `..\GIT.md`, `..\answer-desk\ASKING.md`, `..\answer-desk\qa\S1.md` (S1's running Q&A record at the desk), `SPEC.md`, `HANDOFF.md` if it exists, `DIRECTORY.md`. It must also hold two role lines:
- The session named `s1-research` is the S1 spec orchestrator and follows this spec. A successor after a handoff keeps that name.
- A session named `rw-L<nn>-<item>` is a worker running one deep-research item, with its own roster row while it runs. It reads only CLAUDE.md, section 4 and its list. It writes only that item's report file, never commits, and sends questions to the active S1 session, never to the desk.

## 3. How the session runs

1. Read the reading list. If `HANDOFF.md` exists, resume from it.
2. Apply DI-3's answers as recorded in section 1, and build the empty `lists\` and `DIRECTORY.md`. Commit (P1, GIT.md).
3. Send S1-Q5 (section 1). While it's open, draft the first research lists (section 7).
4. Put each drafted list to Alex as its own desk question. A list runs only after he approves it, and its `Approved by` line carries his answer id.
5. Run an approved list's items in parallel, one subagent per item (P1). An item Alex marks for deep research runs as the deep-research skill in a worker session, launched from `research\` with `claude --bg -n rw-L<nn>-<item> "Read CLAUDE.md, then lists\L-<nn>-<scope>.md. Do only item <item>."` In the same step, S1 adds the worker's row to `..\SESSIONS.md` and commits that file on its own, path-limited: `git commit -m "[roster] ..." -- SESSIONS.md`. When the worker stops, S1 updates its row the same way.
6. Review each report against section 4. Accept it, or send it back once with the gap named. Tick its box and commit.
7. When every item is ticked, run the synthesis, write the directory entries and commit. Then send `orchestration`, which runs S2, `FINDINGS <list id> ready: <report paths in research\>; readers: <spec ids>`, and tell each reader's session that's running.
8. Approved lists that need nothing more from Alex may keep running overnight (P6).

## 4. Methodology

**Where research sits.** Each spec runs in this order, and S1 owns only step 3:
1. The problem and scope.
2. The DoD. Each item states an outcome and names the evidence that proves it, written before any method is chosen.
3. Research.
4. Post-research questions to Alex.
5. A methodology written to satisfy the fixed DoD.
6. A coherency check: "if we execute this Methodology, will that DoD be satisfied?"
7. Execution.

**What a research list is.** One list per spec, or per group of specs Alex merges. It is drafted from the spec's problem, scope and DoD. Where the spec's own DoD doesn't exist yet, it's drafted from the charter row and the project DoD items the spec claims, and the list says so. Its size follows the Client Demo research:
- **About four regular items.** Each is one to four plain questions, written verbatim into the list. Each asks:
  - Is there an easy, obvious or converged answer for this step from problem to DoD? Cite it.
  - If not, what are the traps and gotchas?
  - What would change the planned approach?

  Each names the DoD item or items it serves. One the session can't tie to a DoD item is flagged to Alex in the approval question.
- **Exactly three wildcards.** Each is told every other item on the list, including the other wildcards' lenses, and reads the spec and the charter. It then researches "the biggest open question NOT being researched" within its lens. The lenses come from the Client Demo wildcard's own finding that its list never asked whether the project can be "executed, delivered, or received":
  - W1: can it be executed?
  - W2: can it be delivered?
  - W3: will it be received?

  Alex can change the lenses when he approves the list. Each wildcard report has three parts: (a) a gap analysis, covering what the other items cover, everything left open, a ranked shortlist, and why it picked its question and what it passed over; (b) research on that question; (c) recommendations.
- **One synthesis,** after every item is done. A subagent reads every report on the list and finds the convergences and cross-document insights. It adjudicates conflicts and tags each recommendation as assistant-actionable, operator decision or verify first. It also lists what the research didn't settle. Those open points become the spec's post-research questions.

**What a report looks like.** One Markdown file per item:
- **Header:** the question verbatim, then the date, session and "item k of n".
- **Method:** what was searched and when. Every substantive claim is cited, and inference is marked as inference.
- **Body:** the verdict up front, then the evidence.
- **Evidence gaps:** what it couldn't establish, stated plainly.
- **Recommendations:** "evidence plus options". Every call in them is Alex's.
- **Sources.**

For scale, the earlier reports ran about 275 to 480 lines for literature research, about 100 for a live probe of a connected tool, and about 300 for the synthesis.

**Tools.** These were seen in the meta-spec session on 2 Nov; S1 checks its own set at launch.
- WebSearch and WebFetch, or the `web-fetch` agent where a session lacks WebFetch.
- Subagents (general-purpose for research, Explore for sweeps of local files).
- The deep-research skill, only where Alex marks an item for it.
- `gh`, read-only, for Alex's own repos.
- Claude in Chrome, only for pages that need his logged-in browser, and with his go-ahead.
- Read-only live probes of connected tools (the GetSales and Vercel MCPs). No Apify connector is attached; Apify comes from its public docs.

**Rules for every item.**
- Screen care: assume anything on screen can be published. Never open the Apify proposal or Alex's own GetSales outbound. No real data beyond the charter's scope.
- `..\Addvery Research\` is read from disk only where an approved item needs it. Nothing from it is copied into a tracked file.
- Each topic is researched once. A second spec that needs it is added to the readers, not given a new item.

## 5. Research list format

`research\lists\L-<nn>-<scope>.md`, ticked as reports land:

```
# L-<nn> Research list: <spec ids>
Status: draft | on the desk (S1-Q<n>) | approved | running | synthesised | done
Approved by: A S1-Q<n> | Alex, direct
Level: child (<spec folder>\research\) | parent (orchestration\research\)
Readers: <spec ids>      Drawn from: <problem, scope, DoD ids>
- [ ] R1 <questions, verbatim as approved> · serves <DoD ids> · tools: <...> · deep: no | yes
- [ ] R2 … R4 (about four in all)
- [ ] W1 Wildcard: can it be executed?
- [ ] W2 Wildcard: can it be delivered?
- [ ] W3 Wildcard: will it be received?
<!-- after every item above is ticked -->
- [ ] Synthesis: cross-document insights and recommendations for the methodology
- [ ] DIRECTORY.md entries for every report above
```

The approval question shows Alex the whole list and offers three options: approve it, edit it, or merge or skip it.

## 6. Findings store and index

- **Storage (S1-Q5, Alex: "Just store it locally"):** every report lives in `research\` and never moves.
  - **Parent level** is research that two or more specs need, or that shapes the project as a whole. It goes in `research\global\`.
  - **Child level** is research only one spec needs. It goes in `research\<spec folder>\`, for example `research\scraping\`.
  - Subagents write each report straight to that path. A report counts only once S1 has reviewed it and ticked its box. S2 adds each accepted report to the reading list of every spec in its readers. GIT.md is unchanged.
- **The index.** `research\DIRECTORY.md` is the one place to look, covering both levels and written for retrieval, as in the Client Demo directory. Each report gets an entry with its verdicts, what it governs (specs and DoD ids), "read this when…" and its caveats. A reverse index lists the reports by spec.
- **Precedence** goes at the foot of the directory:
  1. The synthesis adjudicates between reports.
  2. A live probe outranks literature on a tool's behaviour, within what it tested.
  3. Otherwise the disagreement is live and goes to Alex.
  4. Alex's directives outrank everything.
- **Overrides.** A finding Alex overrides is edited in place, marked `Overridden by Alex, <time>`, and its readers are told.
- **New requests.** A session asks for research with a message to the active S1 session: `RESEARCH <spec id>: <topic>, <why>, <needed by>`. If the topic exists, S1 adds the spec to its readers. If not, it's queued for that spec's next list. Nothing new runs before Alex approves it.
- **One question on the desk at a time** (`answer-desk\ASKING.md`). S1 never sends a second ASK while one is open. Lists, topic requests and worker questions that arrive meanwhile wait in the queue. The next ASK goes out only once the open one is answered or withdrawn. It is rewritten in light of that answer and folds in everything queued. If something queued can't wait, S1 sends `REPLACE <id>` with a block that folds it in, never a new ASK.

## 7. Priority order

1. S1-Q5, the storage reading.
2. A parent-level list, if Alex wants one: research that shapes how every spec goes from problem to DoD.
3. S-D1's list, because its output feeds several specs. Then S-D4's, which also waits on S1.
4. The rest in run order: S-D3, S-D6 and S-D7 (offered as one merged list), S-D5 (may merge with S-D4), S-D8, S-D9, S-D10 (may merge with S-D6).

Alex's order wins. Approved lists run in parallel (P1).

## 8. Decision log (P5)

Research never runs on a default (DI-3 Q3.4): an unapproved list waits for Alex, even overnight. Before 18:00 Prague, a passed deadline on any question means poke, not decide. From 18:00, a non-research question past its deadline is decided by the active S1 session, which logs it here and sends `WITHDRAW <id>`, freeing S1's one desk slot. If Alex's answer arrives later, the session reconciles and logs that too. Start each Decision with the time and the ASK id it closes.

| Decision | Justification | Why it's the right call | Blast radius if changed |
| --- | --- | --- | --- |

## 9. Definition of done

S2 assigns the real ids; these are placeholders. The charter's done line for S1 is "every topic agreed with the operator has findings at its chosen depth, linked from the reading list". Following DI-4 Q4.2, that reading list is each spec's own.

| Criterion | Traces to |
| --- | --- |
| Alex has confirmed the storage reading (S1-Q5) | DoD-S1-a (to be assigned by S2) |
| Every wave-2 spec has a research list that Alex approved, merged or skipped before its methodology was written | DoD-S1-b (to be assigned by S2) |
| Every approved list has a report for each item (about four regular items and exactly three wildcards) plus a synthesis | DoD-S1-c (to be assigned by S2) |
| Every report sits at its level and has a DIRECTORY.md entry | DoD-S1-d (to be assigned by S2) |
| Every report is on the reading list of each spec that needs it (through S2) | DoD-S1-e (to be assigned by S2) |
| No research ran without Alex's approval, and the decision log shows no research decided by default | DoD-S1-f (to be assigned by S2) |

## 10. Forking gates (P8)

The active session forks at the first of these:

| Gate | When |
| --- | --- |
| G1 | S1-Q5 is answered and the first list is approved. |
| G2 | The first list's synthesis is in DIRECTORY.md. |
| G3 | Shortly before 18:00 Prague, or when Alex says he's leaving, so the overnight queue starts clean (P6). |
| G4 | The session's context is about half full, whatever else is happening. |

How it forks (unless S0 sets a project-wide format; then use that):

1. Write `HANDOFF.md`, then commit the folder (GIT.md). It holds:
   - the state of each list and the running workers;
   - the open ASK id with the time it was sent and the last poke;
   - the queue waiting behind it;
   - answers not yet applied;
   - decisions since the last fork.
2. From `research\`, launch the successor under the same name: `claude --bg -n s1-research "Read CLAUDE.md, then HANDOFF.md. You are now the active S1 session."` A handoff keeps the name (`..\SESSIONS.md`), so nobody's address changes.
3. Update S1's row in `..\SESSIONS.md` with the handoff time, and commit it on its own: `git commit -m "[roster] ..." -- SESSIONS.md`. That row is the announcement.
4. The old session stops itself straight away. The successor takes over the open ASK as it stands, and sends nothing new until that ASK is answered or withdrawn.
