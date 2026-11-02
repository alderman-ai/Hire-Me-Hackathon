# S2 Project orchestrator: executable spec

Status: DI-4 answered; runs once S0 is done · Row: S2 — Project orchestrator (meta) · Files: `orchestration\` · Session: `orchestration`, the parent session at the repo root. There is no separate S2 session (DI-4 Q4.1).

S2 owns the skills that keep the charter, and everything built from it, consistent as the project changes. It also writes the project definition of done, gives the final sign-off on it, and signs off the spec outline as fully decomposed (charter: "Definition of done", "Spec outline"). The orchestration session runs this spec itself. It builds nothing client-facing and never decides research content.

## 1. Operator preflight (P3)

The charter's spec outline says S2 needs the operator for "nothing beyond review". The preflight was decision intake DI-4 (`Operator tasks\Archive\DI-4 S2 Orchestrator preflight.md`), answered in Obsidian. Recordings needed: none.

**Launch gate: met.** The operator said "DI-4 is ready". From then on, an empty or unaddressed part of a question takes that question's default and is logged in section 9. There's no session to launch: `orchestration` runs this spec once S0 has handed over (charter, "Run order").

| ID | Question | Answer (verbatim in DI-4) |
| --- | --- | --- |
| Q4.1 | Where does the orchestration session live? | Stays at the root. `orchestration` is the parent session and runs S2 itself. Its own file tree is `orchestration\`, including root files only it uses, such as the templates. `OBS\`, `website\` and every other working folder stay where they are. |
| Q4.2 | Four readings of unclear charter passages | Reading 1 replaced: "Reading lists go into the executable specs", modelled on his Knowledge Work Executable Spec repo (section 5). Readings 2 to 4 weren't addressed, so they take the default, accepted (section 9). |

**Related answers from other intakes.** Folders carry no spec prefix, while session names may keep spec ids (DI-2 Q2.1). `Addvery Research\` is the operator's own git-ignored folder, with no spec, covering the old S-D2 row and brand capture: "the orchestrator needs that information. It needs to get it from the local machine not the GitHub repo" (DI-2 Q2.2, DI-3 Q3.3). The poke rule in section 4 comes from DI-3 Q3.4.

The sign-off of the project definition of done gets its own intake once S2 has written the draft (section 10). After that, the operator sees only previews of charter changes that he, or an answer of his, asked for (section 4).

## 2. Spec contract

| Item | S2's answer |
| --- | --- |
| 1. Its place | Row S2, deliverable M2. Claims `DoD-S2-a` (a charter change takes one step and shows in every dependent place), `DoD-S2-b` (the project DoD exists, every item traced to a deliverable and claimed by a row), `DoD-S2-c` (the spec outline is signed off before wave 2 starts). Placeholders, like S0's and S1's, until S2 writes the DoD (section 6). |
| 2. Its neighbours | Depends on S0. Runs in parallel with S1 (`s1-research`, in `research\`). Feeds every spec (DoD ids, resource lines) and the start of wave 2 (the outline sign-off). Takes requests from the operator, from `s1-research`, and from any spec orchestrator that holds an answer of his. |
| 3. Operator preflight | Section 1 (DI-4), and the DoD sign-off intake in section 10. |
| 4. Decision log | Section 9. |
| 5. Forking gates | Section 8. |
| 6. Working directory | The session runs at the repo root; its files are in `orchestration\`. Its reading list is section 3. |

## 3. Working directory, routing and run plan

```
orchestration\                  the parent session's own files (the session itself runs at the root)
  SPEC.md                       this file, with the preview queue and the decision log
  HANDOFF.md                    written at each fork (section 8)
  DOD-DRAFT.md                  the project DoD until it is signed off
  changes\C<nn>-<slug>.md       one record per charter change (section 4)
  .claude\skills\<name>\SKILL.md  the four skills (section 5)
```

**Routing and resources.** S2's reading list, in the form section 5 gives every spec. Paths are from the repo root. Step 1 of the run plan confirms each one is reachable.
- `CHARTER.md`: the source of truth, already imported by the root CLAUDE.md. Changed only through S2's skills.
- `GIT.md`: the shared-tree rules, including the orchestration session's right to edit any folder and tell the owner afterwards.
- `SESSIONS.md`: the roster of official session names. Read it at startup and before messaging a session for the first time.
- `answer-desk\ASKING.md`: the desk format, one question per asker at a time, and the poke rule. `answer-desk\qa\S2.md`: S2's own Q&A record (asker `S2`).
- `Operator tasks\Archive\DI-4 S2 Orchestrator preflight.md`, plus DI-2 and DI-3: the operator's answers, verbatim. Read them for wording, never re-ask them.
- `Operator tasks\Archive\DI-5 S2 DoD sign-off.md`: the operator's DoD sign-off, verbatim (soften DoD-4). Read it for wording, never re-ask it.
- The decision intake template, in `orchestration\_templates\`: the form of the DoD intake.
- `bootstrap\SPEC.md`: S0's folder templates, used by `add-deliverable`. `research\SPEC.md`: S1's `FINDINGS` message and its findings index.
- `orchestration\HANDOFF.md` and the newest `orchestration\changes\` records: state after a fork.
- `C:\Users\alder\Desktop\Hire me hackaton\Addvery Research\`: the operator's own folder, local only and git-ignored. Read it from the local disk, never from GitHub. S2 never writes or checks it.
- https://code.claude.com/docs/en/skills: where skills load (section 5).

**Run plan.**
1. Start once S0 has handed over. Read the routing list and confirm each resource is reachable, as the reference spec's pre-flight does.
2. Delegate (P7). One subagent builds `propagate` and `change-dod`, another builds `add-deliverable` and `change-outline`, both from sections 4 and 5. Meanwhile the session drafts the DoD itself (section 6), against the outline as C01 leaves it.
3. Within 30 minutes of starting, write the DoD sign-off intake (section 10).
4. Once `change-outline` and `propagate` pass their dry run, run the queued changes C01 and C02 (section 4).
5. On the intake's answer, or its default under the poke rule (section 4): sign the DoD off, write it into the charter with `change-dod`, swap the placeholder ids, and run `propagate check`.
6. When the check is clean, sign off the outline (section 6). This lets wave 2 start, and the remaining skills don't have to be finished for it.
7. Dry-run every skill against a scratch copy of the tree outside the repo (under `%TEMP%`, so no second charter copy sits in the project). Take forking gate F1, then serve change requests until the morning cleanup session. Commit after every finished step (P1).

**Who writes where (`GIT.md`).**
- **`CHARTER.md`:** only through S2's skills; no other session edits it. Commit only that path: `git commit -m "[orchestration] C<nn>: <change>" -- CHARTER.md`. The Claude app copy of the charter stays a snapshot (charter, "Risks").
- **`SESSIONS.md`:** S2 edits only the rows its changes add or change, and commits the file on its own: `git commit -m "[roster] C<nn>: <change>" -- SESSIONS.md`.
- **Every other folder:** `propagate` writes the file itself, commits it with a path-limited commit (`-- <folder>/<file>`), and tells the owner afterwards in one line: `S2 changed <file> for C<nn>: <what>.`
- **A new working folder:** create its CLAUDE.md, add its roster row, then run `python orchestration\sync_claude_excludes.py` from the repo root, so the new folder loads only its own CLAUDE.md and every sister excludes it. Commit the settings files it writes, path-limited.
- **Never:** `Addvery Research\`. Anything that needs its contents reads the local disk, and no link to it points at GitHub.

## 4. How every change runs

**What S2 accepts.** S2 changes the charter only on a request from:
1. the operator himself;
2. a session that quotes the operator's answer approving it, as `S2 REQUEST <session>: <change> (approved: A <id>: <answer>)`, sent to `orchestration`;
3. `s1-research` (S1), for resource lines: its `FINDINGS <list id> ready: <paths in research\>; readers: <spec ids>` messages, whose research lists already carry the operator's approval;
4. S2's own DoD and outline work under the charter's mandate.

Anything else gets one reply: "Take it to the answer desk first." A spec never edits the charter, and a conflict goes to the desk (charter, spec contract). Overnight (P6), a request without an operator answer is filed in `changes\` as `held`, and the morning cleanup session takes it to him. The asking session carries on with its own logged decision (P5), so nothing halts.

**Waiting on the operator (P5, with the poke rule).** It applies to every preview, intake and other wait on him (`answer-desk\ASKING.md`). After 15 minutes, send `answer-desk` the line `POKE S2: waiting on you for <what>`, and poke again every 15 minutes while still waiting. Before 18:00 Prague he is at the computer, so a passed deadline means keep waiting, not decide; meanwhile do everything that doesn't depend on the answer. From 18:00, a passed deadline means decide on the default, log it in section 9, and send `WITHDRAW <id>` for a desk question.

**The five steps.** Every skill runs them; steps 3 to 5 always go through `propagate`.
1. **Plan.** First run the `archive-intake` sweep, so every answered intake or operator task is archived and on its readers' reading lists. Then work out every edit from the table below. Write the change record `changes\C<nn>-<slug>.md`: the request, who asked, the approval, and for each place the text before and after.
2. **Preview.** A preview is an approval gate, so it's an operator task, not a desk question (Alex, 2 Nov: "Anything that needs me to look at something needs to be in operator tasks"). Every preview first joins the preview queue below. When no S2 preview task is open, write one gate-approval operator task in `Operator tasks\` from `orchestration\_templates\Gate approval template.md`, under the next free `OT-<nn>` id, with the change record frozen into it, covering every change then waiting in the queue, rewritten in light of the last answer: each change in one line, its charter lines before and after, every other place it touches, and options (a) apply all, (b) apply all except the C numbers named, or with the changes named, (c) drop all. Then send `answer-desk` `TASK S2: <file name> is waiting on you: <the C numbers and what they change>`, then check it every 5 minutes with `orchestration\check_gate.py` while blocked, as `answer-desk\ASKING.md` says, and send `TASK DONE S2: <file name>` once he has answered. Resource lines from S1, and mechanical follow-ons of a change already previewed (placeholder swaps, broken references), skip this step so Alex isn't flooded (P4). The poke rule applies while it waits.
3. **Apply.** On (a), (b), or the default under the poke rule: `propagate` writes every place as "Who writes where" (section 3) sets it. A request that reaches preview was already approved by the operator in substance, which is why the default applies it.
4. **Verify.** Read every place back and list any miss in the change record.
5. **Log.** If applied on the default, log it in section 9. A later answer is applied as a new change. Then send the next ASK if the queue isn't empty.

**Preview queue.** Changes planned but not yet on the desk, oldest first. A change leaves this table when it goes out in an ASK.

| Change | Asked by, with approval | Planned at | One-line summary |
| --- | --- | --- | --- |

C01 and C02 went out together as `Operator tasks\OT-02 Gate approval S2 charter changes C01 C02.md` (2 Nov); their records are in `changes\`.

**Dependent places.**

| Place | Where | Who writes it |
| --- | --- | --- |
| Deliverables and the scope count | charter: "Deliverables", "Scope" | S2 |
| Spec outline, run order, operator scenes | charter: "Spec outline", "Run order" | S2 |
| Definition of done | charter: "Definition of done" | S2 |
| Research reading list | charter: "Research reading list", a pointer once C02 applies | S2 |
| Open questions | charter: "Risks and open questions" (tick the box, note the answer) | S2 |
| Specs' reading lists | each SPEC.md, its "Routing and resources" section | S2; the owner is told afterwards |
| Specs' DoD links | each SPEC.md: its place and its own definition of done | S2; the owner is told afterwards |
| CLAUDE.md boot lines | each folder's CLAUDE.md: only the shared lines (charter, `GIT.md`, `ASKING.md`, its own qa file, its SPEC.md), when one of those files moves or a new one is added | S2; the owner is told afterwards |
| Session roster | `SESSIONS.md`: adding or splitting a spec row adds or changes its roster row | S2, `[roster]` commit |
| A new spec's folder | a new folder at the root, from S0's folder templates; then `python orchestration\sync_claude_excludes.py` from the root, which updates every sister's `.claude\settings.json` | S2 creates it and launches its session under its roster name |
| The site's deliverables view (D8) | `website\` | `website`, on a one-line notice from S2 |
| Not a dependent place | `Addvery Research\` | the operator only |

## 5. The skills

**Where they live: `orchestration\.claude\skills\`.** The Claude Code docs (https://code.claude.com/docs/en/skills, "Load skills in monorepos and subdirectories") say a session loads project skills "from `.claude/skills/` in the directory where you start it and in every parent directory up to the repository root". Skills in a folder below the start folder "don't load at startup. They load the first time Claude reads or edits a file in that subdirectory", or sooner with `/add-dir`. So the root's `.claude\skills\` would reach every session below the root, every spec session included, and S2's skills don't go there. In `orchestration\`, they load for the root session as soon as it reads this spec (run plan, step 1), under the names `/orchestration:<name>`. If they don't appear, run `/add-dir orchestration`. A session started in another folder doesn't load them: the docs name only the start folder, its parents and the folders below it. As a second guard, each skill's first step checks that it runs in the session named `orchestration`, started at the repo root. Anywhere else it stops and tells the caller to send `S2 REQUEST` to `orchestration` (charter: "A spec never edits the charter").

**Reading lists (DI-4 Q4.2).** Modelled on the operator's `alderman-ai/knowledge-work-executable-spec-research` repo (stage 06, "Routing and resources" and its pre-flight check):
- Every executable spec carries its own reading list in a "Routing and resources" section: each resource as a path or URL, with one line on what it is and how to treat it.
- A spec's pre-flight confirms every resource is reachable before work starts, and turns anything ambiguous in it into a preflight question.
- Research findings enter as resources. On `FINDINGS <list id> ready: <paths in research\>; readers: <spec ids>` (the format in `research\SPEC.md`), `propagate` adds a resource line for each path to each reader spec named in `readers`. Reports never move: they stay in `research\`, in `research\global\` for parent-level research and `research\<spec folder>\` for a spec's own (S1-Q5: "Just store it locally"). A spec not written yet gets the line when its SPEC.md appears; until then the line is held in the change record, and check mode lists it.
- Subagents read nothing they weren't handed: a spec orchestrator passes the resources a task needs in its dispatch prompt (reference spec, "M1 · Fan-out contract").
- The charter holds only a pointer to this (C02).

Each skill takes the project root as a parameter (default: the repo root), so its dry run can point at the scratch copy.

**`add-deliverable`.** Adds a deliverable ("nothing else unless M2 adds it", charter: "Scope").
- *Trigger:* the operator asks for one, directly or through an answer of his.
- *Inputs:* name; one line on what it is; wave; what it depends on; what it needs from the operator; the DoD items it serves, new or existing.
- *Updates:* the next free D id in "Deliverables" and the count in "Scope"; a new S-D row in the outline; "Run order", and the operator scenes if he is needed; at least one DoD item the new row claims (calls `change-dod`); the new folder (no spec prefix, DI-2 Q2.1) with its CLAUDE.md, its roster row in `SESSIONS.md`, and the excludes sync (section 3), launched when its inputs are ready; a message to `s1-research` naming the new spec, so research is asked for through it; a notice to `website`.
- *Preview:* section 4, step 2, naming the new ids.

**`change-dod`.** Adds or changes a definition-of-done item.
- *Trigger:* the operator; a spec that finds a gap, through the desk; `add-deliverable`; `change-outline`; S2's own draft.
- *Inputs:* to add, the item, how it's checked, the deliverables it traces to, the rows that claim it. To change, the id and the new wording or claims. To drop, the id and why.
- *Rules:* ids are never renumbered or reused, like principle numbers. A dropped item stays, marked `retired`, so no link breaks. Every live item traces to a deliverable and is claimed by a row.
- *Updates:* the charter's "Definition of done"; each claiming spec's place and own definition of done; the outline, if an item would be left unclaimed (the preview flags it, and the change isn't applied that way).
- *Preview:* each item before and after, with its claimants.

**`change-outline`.** Adds, merges or splits a spec outline row, or makes one operator-owned (C01).
- *Trigger:* the operator; a spec orchestrator whose spec is too big (P7) or overlaps another, through the desk; S2's own outline check.
- *Inputs:* add, as `add-deliverable` but with no new deliverable. Merge, the rows and the surviving id. Split, the row, the new rows, and where each DoD item, dependency and resource line goes.
- *Updates:* the rows; every "Depends on" cell that names an old id; "Run order"; DoD claims, so each item stays claimed; resource lines in the affected specs; folders (a split gets a new one, with its roster row and the excludes sync; a merge keeps both, and the retired spec's session stops at its next forking gate); the affected roster rows; a one-line notice afterwards to the owner of every affected spec.
- *Rules:* never deletes a folder or file. A running spec changes shape only at its next forking gate (P8). Split rows keep their id plus a letter (S-D3a, S-D3b); a row with no deliverable of its own gets the id shown in its preview.
- *Preview:* old and new rows side by side.

**`propagate`.** The engine the other three call, and the only one that writes.
- *Trigger:* the other skills; a `FINDINGS` message from `s1-research`; an answered charter open question; a hand edit to `CHARTER.md` (S2 diffs the file against its last change record).
- *Inputs:* what changed, before and after.
- *Does:* walks the dependent-places table, writes every place, commits path-limited, runs the excludes sync if the change created a working folder, tells each owner afterwards, and verifies (section 4, steps 3 to 5).
- *Check mode:* reports without writing. Every live DoD item is claimed; every spec row has a roster row and a folder with a CLAUDE.md, and once written a SPEC.md whose resources exist; `python orchestration\sync_claude_excludes.py --check` reports nothing to change; every DoD id cited anywhere exists; every "Depends on" names a real row. Operator-owned rows, and everything in `Addvery Research\`, are skipped. Runs before each sign-off and at each forking gate.

## 6. The project definition of done

- **Who.** S2 writes it, the operator reviews it (the intake in section 10), and S2 gives the final sign-off (charter: "Definition of done").
- **Drafting.** From the charter alone. Each of M0 to M2 and D1 to D10 gets one to three items. Each item is an outcome someone who wasn't there could check tomorrow morning, for example "the live site has a section for each of the six stakeholders from D2", never an instruction for how to build. Each row: id, item, how it's checked, deliverables it traces to, claiming rows. D2's items are claimed by the operator-owned S-D2 row once C01 applies.
- **Charter rules.** Ids DoD-1, DoD-2 and so on; every item traces to at least one deliverable; every spec's own definition of done links to items by id; the outline is complete only when every item is claimed.
- **Sign-off.** On the intake's answer, or its default under the poke rule: write it into the charter with `change-dod`, then swap every placeholder (`DoD-S0-a`, `DoD-S1-a`, `DoD-S2-a` ...) for its real id through `propagate`, keeping the placeholder map in the change record.
- **Outline sign-off.** When `propagate check` is clean, S2 marks the spec outline in the charter `Signed off by S2, <time>`, and the orchestration session may start wave 2. A gap the check finds is fixed first with `change-dod` or `change-outline`.
- **Later changes** go only through `change-dod`.

## 7. Definition of done

| Criterion | Traces to |
| --- | --- |
| A new deliverable can be added in one step and every dependent place shows it (charter, S2 "Done when"): one operator instruction, then `propagate check` reports clean | DoD-S2-a (to be assigned by S2) |
| The four skills sit in `orchestration\.claude\skills\`, load in the root session, refuse to run in any other session, and each dry run updates every place it should in the table in section 4 | DoD-S2-a |
| C01 and C02 are applied, and every change has a change record; every change applied on a default has a decision-log row | DoD-S2-a |
| The project DoD is in the charter as DoD-1 onwards, every item traced to a deliverable, reviewed by the operator or signed off on its default | DoD-S2-b |
| Every live DoD item is claimed by at least one outline row, and no spec still cites a placeholder | DoD-S2-b |
| The outline is marked signed off in the charter before wave 2 starts | DoD-S2-c |

## 8. Forking gates (P8)

| Gate | When | What happens |
| --- | --- | --- |
| F1, build done | The DoD and outline are signed off, C01 and C02 are applied, and all four skills pass their dry run | Fork as below, so the session that serves change requests starts without the build in its context. |
| F2, context | Context about half full, or ten change records since the last fork | Fork as below. |
| F3, window closes | Shortly before the operator window ends (P6) | Fork as below, so the overnight session starts with a clean record. |

**How it forks.** Finish the current change. Write `orchestration\HANDOFF.md`: open changes and misses, the S2-Q on the desk and its deadline, pokes in progress, open intakes, held requests, and decisions since the last fork (the preview queue is already in this file). Add whatever else the root CLAUDE.md asks the parent session to hand over. Commit. From the repo root, launch the fresh session under the same name, as `SESSIONS.md` requires ("A handoff keeps the name"): `claude --bg -n orchestration "Read orchestration\HANDOFF.md, then orchestration\SPEC.md. You are now the orchestration session."` Wait for its reply, note the handoff time in its roster row, then stop.

**Announcement.** The fresh session sends `HANDOFF orchestration, <time>: a fresh session has taken over under the same name. Re-send anything for orchestration or S2 that got no reply since <time>.` to `answer-desk` (with the S2-Q id on the desk, if any), `s1-research`, `watcher`, and every running session on the roster.

## 9. Decision log (P5)

When a default is taken (a passed deadline after 18:00 Prague, or an empty or unaddressed part of an intake), the orchestration session logs it here. Start each decision with the time and the question id it closes.

| Decision | Justification | Why it's the right call | Blast radius if changed |
| --- | --- | --- | --- |
| 2 Nov, DI-4 Q4.2, reading 2: S0 and S1 cite placeholder DoD ids (DoD-S0-a, DoD-S1-a ...), which S2 swaps for DoD-1 onwards at sign-off. | His answer addressed reading lists only. DI-4 is marked ready, so the unaddressed readings take the question's default, A (accepted). | Spec contract item 1 needs DoD ids in every spec, but S0 ran before the DoD existed. Placeholders meet both rules without holding up S0 or S1. | The DoD tables in the S0 and S1 specs. Another id scheme means one `propagate` pass. |
| 2 Nov, DI-4 Q4.2, reading 3: S2 is "in place" once the DoD is signed off and every item is claimed by an outline row; the skills are finished while wave 2 starts. | As above: unaddressed, so the default (accepted). | S-D1 and S-D2 come first in wave 2 because others consume them, and they need DoD ids, not charter-change skills. | Only when wave 2 starts. Waiting for the skills delays S-D1 by about the length of their dry runs; no files change. |
| 2 Nov, DI-4 Q4.2, reading 4: a split row keeps its id plus a letter (S-D3a, S-D3b); a row with no deliverable of its own gets the id shown in its preview. | As above: unaddressed, so the default (accepted). | It keeps every row traceable to its deliverable, as "Spec IDs mirror deliverable IDs" intends. | None until a row is split. A rename later touches the outline, "Depends on" cells and one folder name. |
| 2 Nov: the skills go in `orchestration\.claude\skills\`, not the root's `.claude\skills\`. | The Claude Code docs (section 5): root skills load in every session below the root, and nested ones load in the root session once it reads a file in that folder. DI-4 Q4.1 puts the parent's own file tree in `orchestration\`. | It keeps the charter-changing skills out of every other session, as "A spec never edits the charter" asks, and puts them where the operator put the parent's files. | If they fail to load, move the four skill folders to the root's `.claude\skills\`, where the guard step still stops other sessions. Only this spec changes. |

## 10. The DoD sign-off intake

S2 writes it once `DOD-DRAFT.md` exists, as the next free decision intake (`DI-<n>`) in `Operator tasks\`, following the decision intake template exactly, with `Intake State: Waiting on operator`. It holds one question, `Q<n>.1 Sign off the project definition of done`, with everything needed to answer it:
- the charter's rules, quoted: every item gets an id (DoD-1, DoD-2 ...) and traces to at least one deliverable; every spec's own definition of done links to items by id; "the spec outline is complete only when every item is claimed by at least one spec"; S2 "gives the final sign-off on it";
- that wave 2 starts once it's signed off and every item is claimed, and that ids never change or get reused (a dropped item is marked retired);
- the whole draft as a table: id, item, how it's checked, deliverables it traces to, claiming rows;
- the options: A, sign off as written; B, sign off with changes (the ids, and what to change, add or drop); C, something else. Recommend A unless an item is wrong, since any item can still be changed later in one step through `change-dod`;
- the default if the fence is empty: S2 signs off as written and logs it, and a later answer is applied as a change. While it waits, the poke rule (section 4) applies: `POKE S2: waiting on you for DI-<n>, the DoD sign-off`;
- the ask: "Write A, or B followed by the ids and your changes, or C and what you want instead."
