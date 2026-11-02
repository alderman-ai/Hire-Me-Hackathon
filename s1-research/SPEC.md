# S1 Research: executable spec

Status: draft, waiting on preflight answers · Row: S1 — Research (meta) · Folder: `s1-research\` · Session: `research` (both as proposed; S0's directory plan confirms them)

This spec sets how research is chosen, sized, run, stored and indexed. It does not choose topics, depths or budgets. Alex does, through the preflight below, because the charter's research reading list says: "do not attempt to do this without the operator in the loop -- he will override and micromanage the research part." Anything Alex tells the research session directly overrides this spec and every default in it.

## 1. Operator preflight (P3)

All four questions go out at once, one ASK message each, to `answer-desk` in the `answer-desk\ASKING.md` format. Recordings needed: none. No research task runs before S1-Q1 is answered, except as S1-Q4 allows.

| ID | Question | Critical | Default if unanswered | Answer |
| --- | --- | --- | --- | --- |
| S1-Q1 | Which topics go on the reading list, at which tier, with which research details? | yes | Nothing is researched. Machinery only; the list is re-sent under a new id in Alex's next block. | — |
| S1-Q2 | What may research spend, and in what unit? | no | No deep run starts. Light and standard topics run as approved. | — |
| S1-Q3 | Which Addvery research is S1's (shared, done once) and which stays with S-D2? | no | S1 owns brand capture; S-D2 keeps company and stakeholder research. | — |
| S1-Q4 | Charter conflict: may research start on a default when Alex is away (P5 against the reading-list rule)? | no | No. Nothing unapproved starts. | — |

After this round, S1 interrupts Alex only for something critical (P5). Topic requests that arrive later from other specs reach him batched, in one non-critical ASK (section 6). The full ASK text goes out in the meta-spec round; answers are recorded in the table above as `A S1-Qn`.

## 2. Place, neighbours and folder (spec contract items 1, 2 and 6)

- **Place.** Row S1 of the spec outline. It claims the DoD items in section 9, which are placeholders until S2 writes the project-level definition of done.
- **Depends on** S0. **Runs in parallel with** S2.
- **Feeds** S-D1, S-D2 and S-D4 directly (spec outline), and every spec that reads findings through the research reading list. If S1-Q3 gives S1 brand capture, it also feeds S-D6, S-D7 and S-D8.
- **Works with S2.** S1 never edits the charter or another folder (GIT.md, ownership). When an index row is added or changes, S1 messages the S2 session (name per S0's plan), whose skills update the charter's research reading list and the readers' CLAUDE.md lists.
- **One session, one role (P2).** `research` orchestrates and reviews; it does not research itself (P7). Each worker session runs exactly one task.

Folder tree:

```
s1-research\
  CLAUDE.md                 written by S0; contents below
  SPEC.md                   this file
  HANDOFF.md                written at each fork (section 10)
  tasks\T-<nn>-<slug>.md    one per topic (section 5)
  findings\INDEX.md         the index (section 6)
  findings\<slug>.md        one per topic
```

The CLAUDE.md that S0 writes for this folder must hold this reading list, in order: `CHARTER.md`, `GIT.md`, `answer-desk\ASKING.md`, `s1-research\SPEC.md`, `s1-research\HANDOFF.md` if it exists, `s1-research\findings\INDEX.md`. It must also hold two role lines:
- A session named `research` or `research-<n>` is the S1 spec orchestrator and follows this spec.
- A session named `rw-T<nn>` is a worker. It reads only CLAUDE.md, section 4 of this spec and its own task file. It writes only its task's output path, never commits, and sends questions to the active research session, never to the desk.

## 3. How the session runs

1. Read the reading list. If `HANDOFF.md` exists, resume from it.
2. Send any unsent preflight ASKs, all at once (P3). Record each answer in section 1 as it arrives.
3. While waiting, build the machinery only: the `tasks\` and `findings\` folders and an empty `INDEX.md`. Commit (P1, GIT.md).
4. When S1-Q1 is answered, write one task file per approved topic. Its `Approved by` field carries Alex's answer id. No task exists without one, except under S1-Q4's answer.
5. Start tasks in priority order (section 7), as many at once as the budget allows (P1). Subagents run Light and Standard tasks. A worker session runs Deep tasks, and any task long enough to crowd the orchestrator's context (P7). Launch a worker from `s1-research\`: `claude --bg -n rw-T<nn> "Read CLAUDE.md, then tasks\T-<nn>-<slug>.md. Do only that task."`
6. Review each output against its task's questions. Accept it, or send it back once with the gap named. Then index it, commit, and send `FINDINGS T-<nn> ready: <path>` to the S2 session and to each session in its Feeds.
7. Approvals and re-tiering happen in Alex's window. Approved runs that need nothing from him continue overnight (P6).

## 4. Methodology

Three depth tiers. The relative cost is fixed; the actual caps are Alex's (S1-Q2).

| Tier | Runner | Shape of the work | Output | Relative cost |
| --- | --- | --- | --- | --- |
| T1 Light | one subagent | answers the task's questions from a few sources; no fan-out | answer-first brief, about a page | lowest |
| T2 Standard | one subagent, or a worker if long | more sources, claims cross-checked, gaps named | brief plus source list | middle |
| T3 Deep | a worker running a multi-agent deep-research run | splits into sub-questions, fans out, synthesises | full report with answer-first summary | highest by far |

**Budget** (filled in from S1-Q2; blank until then):
- Unit: ___ · Total cap: ___ · Deep runs allowed: ___ · Cap per run, by tier: ___
- Each task file records what it spent. The session stops starting new runs at the cap and asks before going over.

**What earns T3.** This guides the tiers S1 suggests; Alex's tier always wins.
- Two or more specs read it, or it feeds something Addvery will see under Alex's name (stakeholder sections, the S-D3 live run).
- A thin answer would show as a visible error on the published site or in outreach.
- A T2 run left a gap that blocks a spec.
- Not deep: tool how-tos a spec session will read anyway while it builds.

**Rules for every tier.**
- Answer first: each findings file opens with what a reader needs, in five lines or fewer.
- Every claim that matters carries its source and the date it was read. Gaps are named, not papered over.
- Screen care: assume anything on screen can be published. Never open the Apify proposal or Alex's own GetSales outbound. No real data beyond what the charter's scope allows.
- One topic, one task, one findings file. A topic is keyed by its subject, not by the spec that asked for it.

## 5. Task format

One file per topic, `s1-research\tasks\T-<nn>-<slug>.md`:

```
# T-<nn> <topic>
Status: queued | approved | running | review | done | stale
Approved by: <A S1-Qn> | Alex, direct | default under S1-Q4 (logged)
Tier: T1 | T2 | T3        Budget: <from section 4>        Spent: <so far>
Runner: subagent | rw-T<nn>
Feeds: <spec ids that read it>
Questions to answer: <Alex's first, then S1's>
Sources to use / avoid: <from Alex's details>
Out of bounds: <screen-care items; anything Alex excluded>
Output: s1-research\findings\<slug>.md
```

## 6. Findings store and index

- **One place.** Every finding lives in `s1-research\findings\`, one file per topic. Findings that another spec owns (for example S-D2's stakeholder profiles) get a pointer row, so the index stays the one place to look. The charter leaves the storage location to the pass with Alex, so S1-Q1 asks him to confirm this one.
- **The index.** `findings\INDEX.md` is one table: ID | Topic | Tier | Status | Feeds | File | Updated | Approved by.
- **Readers.** Other specs' reading lists point at `s1-research\findings\INDEX.md` and at the files whose Feeds name them. S1 notifies; S2 and the folder owners edit.
- **Overrides.** A finding Alex overrides is edited in place, marked `Overridden by Alex, <time>`, and its readers are told.
- **New requests.** A session asks for research with a message to the active research session: `RESEARCH <spec id>: <topic>, <why>, <needed by>`. If the topic exists, S1 adds the spec to its Feeds. If not, it is queued, and queued topics go to the desk together as one non-critical ASK (P4, P5). Nothing new runs before Alex approves it, except as S1-Q4 allows.

## 7. Priority order

1. What S-D1 (scraping) and S-D2 (Addvery and stakeholders) need to start, because other specs consume their output. Then S-D4, which also waits on S1.
2. Shared topics, read by two or more specs, researched once. Brand capture sits here if S1-Q3 gives it to S1.
3. Everything else, in run order: S-D3, S-D6 and S-D7, S-D5, S-D8.

Within a band, Alex's order wins. Tasks that wait on nothing run in parallel (P1).

## 8. Decision log (P5)

When Alex hasn't answered within the deadline, the active research session decides, logs it here, and sends the desk `WITHDRAW <id>`. If his answer arrives later, it reconciles and logs that too. Start each Decision with the time and the ASK id it closes.

| Decision | Justification | Why it's the right call | Blast radius if changed |
| --- | --- | --- | --- |

## 9. Definition of done

The project-level definition of done doesn't exist yet. S2 writes it and assigns the real ids; these are placeholders. The charter's done line for S1: "every topic agreed with the operator has findings at its chosen depth, linked from the reading list."

| Criterion | Traces to |
| --- | --- |
| Tiers and budget are set from S1-Q2, or the default is logged | DoD-S1-a (to be assigned by S2) |
| Every topic Alex approved has a task file with tier, runner and approval | DoD-S1-b (to be assigned by S2) |
| Every approved topic has findings at its tier, with an index row | DoD-S1-c (to be assigned by S2) |
| Each shared topic appears once in the index, with all its readers in Feeds | DoD-S1-d (to be assigned by S2) |
| Every index row is linked from the charter's research reading list (through S2) and from each reader's CLAUDE.md | DoD-S1-e (to be assigned by S2) |
| Brand capture ownership is settled (S1-Q3) and the charter's open question is closed through S2 | DoD-S1-f (to be assigned by S2) |

## 10. Forking gates (P8)

The active session forks at the first of these:

| Gate | When |
| --- | --- |
| G1 | The preflight answers are in and the task queue is written. |
| G2 | Every band-1 topic (section 7) is indexed. |
| G3 | Shortly before Alex's window closes, so the overnight queue starts clean (P6). |
| G4 | The session's context is about half full, whatever else is happening. |

How it forks (unless S0 sets a project-wide format; then use that):

1. Write `HANDOFF.md`: task states, running workers, open ASK ids and their deadlines, answers not yet applied, decisions since the last fork, and budget spent. Commit the folder (GIT.md).
2. From `s1-research\`, launch the next generation: `claude --bg -n research-<n+1> "Read CLAUDE.md, then HANDOFF.md. You are now the active S1 session."` The first session is `research`; the next is `research-2`.
3. Wait for its reply that it has read the handoff.
4. Announce `ACTIVE S1: <old> -> <new>. Send S1 messages, answers to S1-Q*, FINDINGS replies and RESEARCH requests to <new>.` to `answer-desk`, `orchestration`, the S2 session, every running `rw-` worker, and every session with an open request.
5. The old session stops.
