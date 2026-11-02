# S1 handoff

Written by the first `s1-research` session at 15:00 Prague, 2 Nov, at forking gate G2 (L-01's synthesis is in DIRECTORY.md). You are now the active S1 session, under the same name. Read CLAUDE.md, then SPEC.md in full (it has been updated all afternoon: sections 1, 3, 5, 6, 7, 8 and 9), then this file, then DIRECTORY.md.

## State of every list

| List | State | What you do next |
| --- | --- | --- |
| L-01 parent (every wave-2 spec) | **Done** 15:00. 7 reports and the synthesis in `research\global\`, all accepted and indexed. FINDINGS sent to `orchestration`; every running reader told. | Nothing. Answer reader questions from DIRECTORY.md. |
| L-02 scraping (S-D1) | **Parked.** `s-d1-scraping` declined it: Alex runs the scraping himself. | Nothing, unless Alex asks for it. Don't push it to him. |
| L-03 blog (S-D4, S-D5) | **With Alex**: `Operator tasks\Approve - research for the blog pipeline.md` (OT-04), created 14:57, TASK line sent, desk said "task shown". Framed as non-blocking: the blog spec drafts first and revises (DI-8 Q5). | Watch the gate (below). On APPROVED, run it into `research\global\` (it's parent level: two readers). |
| L-04 GetSales (S-D3) and L-06 website (S-D8) | **With Alex, one gate**: `Operator tasks\Approve - research for the GetSales demo and website.md` (OT-03), created 14:54, TASK line sent, "task shown". Both requesters want findings by 16:30. L-04 has only R1 and R4 left (A6.4 dropped R2 and R3). L-06 has R1 to R3. | Watch the gate. On APPROVED, run both at once: L-04 into `research\getsales\`, L-06 into `research\website\`. That's 5 items plus 6 wildcards, then 2 syntheses. |
| L-05 brand assets (S-D6, S-D7, S-D10) | **Draft**, not requested yet. | Wait for a `RESEARCH` request. |
| S-D9 | Asked for L-01 only, no list of its own. | Nothing. |

## Open gates and pokes

- No desk question is open. S1's last ASK was S1-Q6, answered at 14:06. The next free id is **S1-Q7**.
- OT-03 is open since 14:54, with no poke yet. The first poke is due at about **15:09**.
- OT-04 is open since 14:57, with no poke yet. The first poke is due at about **15:12**.
- Poke both together in one line if they're both still open: `POKE S1: waiting on you for <file names>`.
- **Re-arm the watch at once.** My Monitor tasks die with me. Run `python -I orchestration\check_gate.py "<file>"` from the repo root every 300 seconds with Monitor. It exits 0 on APPROVED or CHANGES and 1 while OPEN.
- **When a gate closes:**
  1. On CHANGES, apply them to the list, commit, refreeze the snapshot in the gate file and its hash, and wait again.
  2. Set the list's `Approved by` line and its Status to running.
  3. Run the list (BRIEFS.md; see "How I ran L-01" below).
  4. Send `answer-desk` `TASK DONE S1: <file name>`.
  5. Send `orchestration` `ARCHIVE <file name>: readers <spec ids>`.

## Queue behind the gates

Empty. No `RESEARCH` request is waiting. If one arrives, the drafts are in `lists\`. A topic L-01 already covers gets the reader added, not a new item.

## Answers not yet applied

None. Every Alex answer so far (S1-Q5, S1-Q6, OT-01) is applied in SPEC.md and the lists.

## Decisions since launch (also in SPEC.md section 8)

- **14:41, forking gate G1 deferred to G2.** L-01's subagents report to the session that launched them, so I forked only after the synthesis.
- **Not logged as decisions, because they follow rules:**
  - L-03 got its own gate, OT-04, because OT-03 had already been shown to Alex.
  - L-04 and L-06 share one gate (OT-03), because Alex is swamped ("we need to remove blockers") and both are due at 16:30.
  - L-02 was parked without being put to Alex.
  - The 24 post-research questions in the L-01 synthesis were **not** sent to Alex. Each spec session folds its own into its next gate; `orchestration` was told.

## How I ran L-01 (repeat it)

- **Briefs:** one `general-purpose` subagent per item, all started in one message in the background, briefed from `BRIEFS.md`. Each brief carries:
  - the item verbatim;
  - the DoD ids it serves (real ones now: DoD-1 to DoD-22 in `..\orchestration\DOD-DRAFT.md`);
  - the exact report path;
  - "item k of n";
  - a 40-minute target;
  - the shared rules.
- **Wildcards** get the other items verbatim and the other two lenses.
- **Review:** headings (header, method, verdict, evidence, gaps, recommendations as options, sources), the count of links, and that inference is marked.
- **When each report is accepted:** tick it on the list with its path and commit the report together with the list.
- **After the last report:** launch the synthesis brief, write DIRECTORY.md entries (verdicts, governs, read-this-when, caveats) and the reverse index, close the list, send `orchestration` the FINDINGS line naming every reader, then tell each running reader session what to read first.
- **Time-critical findings:** relay them to the owning session before the synthesis, marked as reviewed with the synthesis to follow. I did this for the 15:30 alert.
- **Timing:** reports took about 9 to 12 minutes, and the synthesis about 7.

## Rules learned the hard way

- **Gate files follow Alex's legibility rule** (SPEC.md section 5):
  - a plain name with its meaning in the first 35 characters;
  - a "What this is" section first, with the reading time, the deadline and what ticking starts;
  - no codes in the body;
  - ids in the front matter only.
- **`orchestration` has two refs after its 14:44 handoff.** Address the local one as `orchestration [fe6fa8]` if the bare name is ambiguous. `website` handed off at 14:53 under the same name.
- **Paths:** don't use `sed` on lines containing Windows paths, because it eats backslashes. Use Python with raw strings (`r"..."`), or Edit.
- **Committing:** gate files in `..\Operator tasks\` are committed on their own, path-limited, with the `[research]` prefix. `orchestration` (S2) may edit `research\` and tells you afterwards (it did, for the DoD ids and the archive paths).
- **Alex's state:** he reads only the desk, and he's swamped. Keep each gate to one tick and a 2 to 3 minute read.

## Your forking gates from here

- G3: shortly before 18:00, or when Alex says he's leaving.
- G4: half your context.

Fork the same way:
1. Write HANDOFF.md and commit.
2. Launch from `research\`: `claude --bg -n s1-research "Read CLAUDE.md, then HANDOFF.md. You are now the active S1 session."`
3. Update S1's row in `..\SESSIONS.md` with the handoff time, and commit it on its own with `[roster]`.
4. Stop the old session by its exact id.

Don't fork while research subagents are running; they report to the session that launched them.
