# S2 Project orchestrator: executable spec

Status: draft, waiting on DI-4 · Row: S2 — Project orchestrator (meta) · Folder: `s2-orchestrator\` · Session: `s2-orchestrator` (as in S0's folder plan, Q2.1 in DI-2)

S2 owns the skills that keep the charter, and everything built from it, consistent as the project changes. It also writes the project definition of done, gives the final sign-off on it, and signs off the spec outline as fully decomposed (charter: "Definition of done", "Spec outline"). It builds nothing client-facing and never decides research content.

## 1. Operator preflight (P3)

The charter's spec outline says S2 needs the operator for "nothing beyond review", so the round is small. Both preflight questions are in decision intake DI-4, `..\Operator tasks\DI-4 S2 Orchestrator preflight.md`, which the operator answers in Obsidian. They don't go to the answer desk. Recordings needed: none.

**Launch gate.** The S2 session isn't launched until the operator says "DI-4 is ready". From then on, an empty fence means that question's default, and S2 logs it in section 9.

| ID | Question | Default if the fence is empty | Answer |
| --- | --- | --- | --- |
| Q4.1 | Where does the orchestration session live: at the root with S2's skills in the root skills folder (A), or in `s2-orchestrator\` (B)? | B. Skills are built in `s2-orchestrator\` either way. | — |
| Q4.2 | Does the operator accept S2's reading of four unclear charter passages (reading list, placeholder DoD ids, "S2 in place", split-row ids)? | A, accept all four. | — |

The sign-off of the project definition of done gets its own intake later, once the S2 session has written the draft (section 10). After that, the operator sees only previews of charter changes that he, or an answer of his, asked for (section 4). Answers are copied into the table above from the `A4.k` fences.

## 2. Spec contract

| Item | S2's answer |
| --- | --- |
| 1. Its place | Row S2, deliverable M2. Claims `DoD-S2-a` (a charter change takes one step and shows in every dependent place), `DoD-S2-b` (the project DoD exists, every item traced to a deliverable and claimed by a row), `DoD-S2-c` (the spec outline is signed off before wave 2 starts). Placeholders, like S0's and S1's, until S2 writes the DoD (section 6). |
| 2. Its neighbours | Depends on S0. Runs in parallel with S1. Feeds every spec (DoD ids, reading-list lines) and the orchestration session (the outline sign-off that starts wave 2). Takes requests from the operator, from S1 (`s1-research`), and from any spec orchestrator that holds an answer of his. |
| 3. Operator preflight | Section 1 (DI-4), and the DoD sign-off intake in section 10. |
| 4. Decision log | Section 9. |
| 5. Forking gates | Section 8. |
| 6. Working directory | Section 3. |

## 3. Working directory and run plan

`s2-orchestrator\`, launched from that folder: `claude --bg -n s2-orchestrator "Read CLAUDE.md, then run SPEC.md from section 3."`

The CLAUDE.md that S0 writes for this folder must hold this reading list, in order: `..\CHARTER.md`, `..\GIT.md`, `..\answer-desk\ASKING.md`, `..\answer-desk\qa\S2.md` (S2's running Q&A record, kept by the desk), `SPEC.md`, `HANDOFF.md` if it exists, then the newest records in `changes\`.

```
s2-orchestrator\
  CLAUDE.md                     written by S0
  SPEC.md                       this file, with the decision log
  HANDOFF.md                    written at each fork (section 8)
  DOD-DRAFT.md                  the project DoD until it is signed off
  changes\C<nn>-<slug>.md       one record per charter change (section 4)
  .claude\skills\<name>\SKILL.md  the four skills (section 5); moved at F1 if Q4.1 is A
```

**Run plan.**
1. Read the reading list and DI-4, which is ready by launch (section 1). Copy its answers into section 1. For an empty fence, take that question's default and log it (P5).
2. Delegate (P7). One subagent builds `propagate` and `change-dod`; another builds `add-deliverable` and `change-outline`. Both work from sections 4 and 5. Meanwhile the session drafts the DoD itself (section 6).
3. Within 30 minutes of launch, write the DoD sign-off intake (section 10) and tell `orchestration` it's waiting on the operator.
4. When the intake is answered, or 15 minutes after it was written with no answer (P5): sign the DoD off, write it into the charter with `change-dod` (if the skill isn't ready, write it by hand and log that), swap the placeholder ids, then run `propagate check`.
5. When the check is clean, sign off the outline (section 6). This is what lets wave 2 start; the skills don't have to be finished for it.
6. Dry-run all four skills against a scratch copy of the tree outside the repo (under `%TEMP%`, so no second charter copy sits in the project). Then take forking gate F1.
7. From then on, serve change requests until the morning cleanup session. Commit after every finished step (P1, `..\GIT.md`).

**Who writes where (`..\GIT.md`, ownership).**
- **`CHARTER.md`:** S2 changes it through its skills, before F1 as well as after; no other session edits it. S2 commits only that path (`git commit -m "[s2-orchestrator] C<nn>: <change>" -- CHARTER.md`) and tells `orchestration`, which owns the root files, in one line afterwards. S2 updates only the file; the Claude app copy of the charter stays a snapshot (charter, "Risks").
- **S2's own files:** its folder, any new spec folder it creates (its own until that folder's session starts), and its intake files in `..\Operator tasks\`.
- **Files in other sessions' folders, before F1:** S2 hands each edit to `orchestration` as `S2 EDIT C<nn>: in <file>, <edit>`. The orchestration session applies it directly, tells the owner afterwards, and replies `DONE C<nn>`.
- **After F1:** the direct-edit right passes to S2 (under Q4.1 B; under A it stays with `orchestration`, which then runs the skills). `propagate` writes every dependent file itself, commits each with a path-limited commit (`-- <folder>/<file>`), and tells each owner afterwards in one line: `S2 changed <file> for C<nn>: <what>.`

## 4. How every change runs

**What S2 accepts.** S2 changes the charter only on a request from:
1. the operator himself;
2. a session that quotes the operator's answer approving it, as `S2 REQUEST <session>: <change> (approved: A <id>: <answer>)`;
3. S1 (`s1-research`), for reading-list lines: its `FINDINGS T-<nn> ready: <path>` messages, whose tasks already carry the operator's approval;
4. S2's own DoD and outline work under the charter's mandate.

Anything else gets one reply: "Take it to the answer desk first." A spec never edits the charter, and a conflict goes to the desk (charter, spec contract). Overnight (P6), a request without an operator answer is filed in `changes\` as `held`, and the morning cleanup session takes it to him. The asking session carries on with its own logged decision (P5), so nothing halts.

**The five steps.** Every skill runs them; steps 3 to 5 always go through `propagate`.
1. **Plan.** Work out every edit from the table below. Write the change record `changes\C<nn>-<slug>.md`: the request, who asked, the approval, and for each place the text before and after.
2. **Preview.** S2 may have only one question on the desk at a time (`..\answer-desk\ASKING.md`), so every preview first joins the preview queue below. When the desk holds no S2 question, S2 sends `answer-desk` one ASK under the next free S2-Q id (from S2-Q1; the preflight used DI-4's ids), Critical `no`, a 15-minute deadline. It covers every change then waiting in the queue, rewritten in light of the last answer: each change in one line, its charter lines before and after, every other place it touches, and options (a) apply all, (b) apply all except the C numbers named, or with the changes named, (c) drop all. Reading-list lines from S1, and mechanical follow-ons of a change already previewed (placeholder swaps, broken references), skip this step so the desk isn't flooded (P4). If a change on the desk goes stale, S2 sends `REPLACE <id>` with a new block, or `WITHDRAW <id>`. A `CHECK <id>` from the desk gets `CURRENT`, `REPLACE` or `WITHDRAW` at once.
3. **Apply.** On (a), (b) or the deadline: `propagate` writes the charter and S2's own files, and every other dependent file as "Who writes where" (section 3) sets it: handed to `orchestration` before F1, written directly after it. A request that reaches preview was already approved by the operator in substance, which is why the deadline applies it.
4. **Verify.** Read every place back. Before F1, a handoff with no `DONE` from `orchestration` after 15 minutes gets one reminder, then stays listed as open in the record.
5. **Log.** If applied on the deadline, log it in section 9 and send the desk `WITHDRAW <id>`. A later answer is applied as a new change. Then send the next ASK if the queue isn't empty.

**Preview queue.** Changes planned but not yet on the desk, oldest first. A change leaves this table when it goes out in an ASK.

| Change | Asked by, with approval | Planned at | One-line summary |
| --- | --- | --- | --- |

**Dependent places.**

| Place | Where | Who writes it |
| --- | --- | --- |
| Deliverables and the scope count | charter: "Deliverables", "Scope" | S2 |
| Spec outline, run order, operator scenes | charter: "Spec outline", "Run order" | S2 |
| Definition of done | charter: "Definition of done" | S2 |
| Research reading list | charter: "Research reading list" | S2, with content from S1 only |
| Open questions | charter: "Risks and open questions" (tick the box, note the answer) | S2 |
| CLAUDE.md reading lists | each sibling folder's CLAUDE.md | before F1, `orchestration` on S2's handoff; after F1, S2. The owner is told afterwards |
| Specs' DoD links | each SPEC.md: its place and its own definition of done | before F1, `orchestration` on S2's handoff; after F1, S2. The owner is told afterwards |
| A new spec's folder | a new sibling folder, from S0's folder templates | S2 creates it; the orchestration session launches it |
| The site's deliverables view (D8) | `website\` | `website`, on a one-line notice from S2 |

## 5. The skills

Each skill takes the project root as a parameter (default `..`), so its dry run can point at the scratch copy.

**`add-deliverable`.** Adds a deliverable ("nothing else unless M2 adds it", charter: "Scope").
- *Trigger:* the operator asks for one, directly or through an answer of his.
- *Inputs:* name; one line on what it is; wave; what it depends on; what it needs from the operator; the DoD items it serves, new or existing.
- *Updates:* the next free D id in "Deliverables" and the count in "Scope"; a new S-D row in the outline; "Run order", and the operator scenes if he is needed; at least one DoD item the new row claims (calls `change-dod`); a reading-list line `S-D<n>: pending S1`, plus a message to `s1-research`; the new folder with its CLAUDE.md and settings file, plus a message to `orchestration` that it's ready to launch; a notice to `website`.
- *Preview:* section 4, step 2, naming the new ids.

**`change-dod`.** Adds or changes a definition-of-done item.
- *Trigger:* the operator; a spec that finds a gap, through the desk; `add-deliverable`; `change-outline`; S2's own draft.
- *Inputs:* to add, the item, how it's checked, the deliverables it traces to, the rows that claim it. To change, the id and the new wording or claims. To drop, the id and why.
- *Rules:* ids are never renumbered or reused, like principle numbers. A dropped item stays, marked `retired`, so no link breaks. Every live item traces to a deliverable and is claimed by a row.
- *Updates:* the charter's "Definition of done"; each claiming spec's place and own definition of done; the outline, if an item would be left unclaimed (the preview flags it, and the change isn't applied that way).
- *Preview:* each item before and after, with its claimants.

**`change-outline`.** Adds, merges or splits a spec outline row.
- *Trigger:* the operator; a spec orchestrator whose spec is too big (P7) or overlaps another, through the desk; S2's own outline check.
- *Inputs:* add, as `add-deliverable` but with no new deliverable. Merge, the rows and the surviving id. Split, the row, the new rows, and where each DoD item, dependency and reading-list line goes.
- *Updates:* the rows; every "Depends on" cell that names an old id; "Run order"; DoD claims, so each item stays claimed; reading-list lines; folders (a split gets a new one; a merge keeps both, and the retired spec's session stops at its next forking gate); a one-line notice afterwards to the owner of every affected spec, and to `orchestration`, which launches and stops sessions.
- *Rules:* never deletes a folder or file. A running spec changes shape only at its next forking gate (P8). Split rows keep their id plus a letter (S-D3a, S-D3b); a row with no deliverable of its own gets the id shown in its preview (subject to Q4.2).
- *Preview:* old and new rows side by side.

**`propagate`.** The engine the other three call, and the only one that writes.
- *Trigger:* the other skills; a `FINDINGS` message from `s1-research`; an answered charter open question; a hand edit to `CHARTER.md` (S2 diffs the file against its last change record).
- *Inputs:* what changed in the charter, before and after.
- *Does:* walks the dependent-places table, writes every place (other folders through `orchestration` before F1, itself after), tells each owner afterwards, and verifies (section 4, steps 3 to 5).
- *Check mode:* reports without writing. Every live DoD item is claimed; every row has a folder whose CLAUDE.md list starts with `..\CHARTER.md`; every DoD id cited anywhere exists; every "Depends on" names a real row; every reading-list line points at a real file. Runs before each sign-off and at each forking gate.

## 6. The project definition of done

- **Who.** S2 writes it, the operator reviews it (the intake in section 10), and S2 gives the final sign-off (charter: "Definition of done").
- **Drafting.** From the charter alone. Each of M0 to M2 and D1 to D10 gets one to three items. Each item is an outcome someone who wasn't there could check tomorrow morning, for example "the live site has a section for each of the six stakeholders from D2", never an instruction for how to build. Each row: id, item, how it's checked, deliverables it traces to, claiming rows.
- **Charter rules.** Ids DoD-1, DoD-2 and so on; every item traces to at least one deliverable; every spec's own definition of done links to items by id; the outline is complete only when every item is claimed.
- **Sign-off.** On the intake's answer, or its default (run plan, step 4): write it into the charter with `change-dod`, then swap every placeholder (`DoD-S0-a`, `DoD-S1-a`, `DoD-S2-a` ...) for its real id through `propagate`, keeping the placeholder map in the change record.
- **Outline sign-off.** When `propagate check` is clean, S2 marks the spec outline in the charter `Signed off by S2, <time>` and tells `orchestration`: "Outline signed off: wave 2 may start." A gap found by the check is fixed first with `change-dod` or `change-outline`.
- **Later changes** go only through `change-dod`.

## 7. Definition of done

| Criterion | Traces to |
| --- | --- |
| A new deliverable can be added in one step and every dependent place shows it (charter, S2 "Done when"): one operator instruction, then `propagate check` reports clean | DoD-S2-a (to be assigned by S2) |
| The four skills exist in the home Q4.1 chose, and each dry run updates every place it should in the table in section 4 | DoD-S2-a |
| Every change has a change record, and every change applied without an answer has a decision-log row | DoD-S2-a |
| The project DoD is in the charter as DoD-1 onwards, every item traced to a deliverable, reviewed by the operator or signed off on its default | DoD-S2-b |
| Every live DoD item is claimed by at least one outline row, and no spec still cites a placeholder | DoD-S2-b |
| The outline is marked signed off in the charter, and `orchestration` has been told that wave 2 may start | DoD-S2-c |

## 8. Forking gates (P8)

| Gate | When | What happens |
| --- | --- | --- |
| F1, build done | The DoD and outline are signed off and all four skills pass their dry run | If Q4.1 is B: the orchestration session hands off to a fresh one started in `s2-orchestrator\`. The orchestration part of the root CLAUDE.md moves into this folder's CLAUDE.md. The new session keeps the name `orchestration`, which GIT.md and the watcher use, so the old one stops just before it starts. If A: the skills move into the root's `.claude\skills\`, and `orchestration` runs them from there. Either way, the `s2-orchestrator` session then stops. |
| F2, context | Context about half full, or ten change records since the last fork | Finish the current change. Write `HANDOFF.md`: open changes and handoffs to `orchestration` without `DONE`, the S2-Q on the desk and its deadline (the preview queue is already in this file), open intakes, held requests, decisions since the last fork. Commit. Launch `claude --bg -n s2-orchestrator-<n+1> "Read CLAUDE.md, then HANDOFF.md. You are now the active S2 session."`, wait for its reply, then stop. After F1 under B, this is the orchestration session's own gate. |
| F3, window closes | Shortly before the operator window ends (P6) | Run F2, so the overnight session starts with a clean record. |

**Announcement.** At every gate, the new session sends `ACTIVE S2: <old> -> <new>. Send S2 REQUEST, FINDINGS and DONE messages, and answers to S2-Q*, to <new>.` to `answer-desk` (with the S2-Q id on the desk, if any), `orchestration`, `s1-research`, `watcher`, and every running spec session.

## 9. Decision log (P5)

When the operator hasn't answered by the deadline, or has left an intake fence empty, the active S2 session decides and logs it here. For a desk preview it also sends the desk `WITHDRAW <id>`. Start each decision with the time and the question id it closes.

| Decision | Justification | Why it's the right call | Blast radius if changed |
| --- | --- | --- | --- |

## 10. The DoD sign-off intake

The S2 session writes it once `DOD-DRAFT.md` exists, as the next free decision intake (`DI-<n>`) in `..\Operator tasks\`, following `..\_templates\Decision intake template.md` exactly, with `Intake State: Waiting on operator`. It holds one question, `Q<n>.1 Sign off the project definition of done`, and everything needed to answer it there:
- the charter's rules, quoted: every item gets an id (DoD-1, DoD-2 ...) and traces to at least one deliverable; every spec's own definition of done links to items by id; "the spec outline is complete only when every item is claimed by at least one spec"; S2 "gives the final sign-off on it";
- that wave 2 starts once it's signed off and every item is claimed, and that ids never change or get reused (a dropped item is marked retired);
- the whole draft as a table: id, item, how it's checked, deliverables it traces to, claiming rows;
- the options: A, sign off as written; B, sign off with changes (the ids, and what to change, add or drop); C, something else. Recommend A unless an item is wrong, since any item can still be changed later in one step through `change-dod`;
- the default if the fence is empty: S2 signs off as written and logs it, and a later answer is applied as a change;
- the ask: "Write A, or B followed by the ids and your changes, or C and what you want instead."
