# S0 — Bootstrap: executable spec

Spec S0 (meta, deliverable M0) · runs in `bootstrap\` as the session `s0-bootstrap` · parent context: `..\CHARTER.md`

S0 turns the charter into a project where every other spec can launch in parallel (P1). It creates one folder per spec and role at the project root, and gives each a CLAUDE.md with its reading list, a `.claude\settings.json` and a documented launch command. It adopts what already exists. It writes no wave-2 spec, researches nothing, launches no spec session (the orchestration session does that), moves no root file itself, and never edits CHARTER.md.

## Operator preflight (P3)

S0's preflight was decision intake DI-2, `..\Operator tasks\DI-2 S0 Bootstrap preflight.md`, answered by the operator in Obsidian. **Launch gate met:** he said "DI-2 is ready" on 2 Nov.

| Id | Question | His answer, applied below |
| --- | --- | --- |
| Q2.1 (DI-2) | Approve the directory plan? | Approved, with no spec number in any folder name: "Take out all of the prefixes, like the S0, SD1, whatever, from the folder name." Session names may keep the spec id. |
| Q2.2 (DI-2) | Who owns `Addvery Research\`? | "I own this subdirectory." No spec, no S0 session, git-ignored. With Q3.3 in DI-3, it covers S-D2 and brand capture. |

S0 has one runtime question, S0-Q1, through the answer desk: approval of the root moves that DI-4 Q4.1 asks for (step 3). The preflight batch never goes to the desk; rolling questions like S0-Q1 do.

### Folder-to-session table

Folder names carry no spec number, so a renumbered or reshaped spec never forces a rename (Q2.1); each spec names its folder in its own header. Session names keep the spec id. Because the two now differ, sessions find each other through the roster, `..\SESSIONS.md`, which every session reads. This table is S0's plan; S0 writes its rows into the roster as it creates each folder (step 5), so `orchestration`, which owns `..\GIT.md` and the watcher, can use the roster for ownership and the hourly sweep.

| Spec or role | Folder | Session | Asker | Status |
| --- | --- | --- | --- | --- |
| S0 Bootstrap | `bootstrap\` | `s0-bootstrap` | `S0` | exists, holds this spec |
| S1 Research | `research\` | `s1-research` | `S1` | exists, holds S1's spec; S0 adds CLAUDE.md and settings |
| S2 Project orchestrator | `orchestration\` (its files) | `orchestration`, which runs from the repo root; no separate S2 session | `S2` | exists, holds S2's spec; S0 writes nothing there (notes) |
| S-D1 Scraping research demo | `scraping\` | `s-d1-scraping` | `S-D1` | new |
| S-D2 Company and stakeholder research | none from S0 | none | — | operator-owned: Alex runs it himself in `Addvery Research\` |
| S-D3 GetSales outbound demo | `getsales\` | `s-d3-getsales` | `S-D3` | new |
| S-D4 Blog pipeline | `blog-pipeline\` | `s-d4-blog-pipeline` | `S-D4` | new |
| S-D5 Three blog articles | `blog-articles\` | `s-d5-blog-articles` | `S-D5` | new |
| S-D6 Canva LinkedIn templates | `canva-templates\` | `s-d6-canva-templates` | `S-D6` | new |
| S-D7 LinkedIn content creation demo | `linkedin-content\` | `s-d7-linkedin-content` | `S-D7` | new |
| S-D8 Website | `website\` | `website` | `website` | adopted, unchanged |
| S-D9 Legibility analyzer | `legibility\` | `s-d9-legibility` | `S-D9` | new |
| S-D10 Canva design video | `canva-video\` | `s-d10-canva-video` | `S-D10` | new |
| Answer desk | `answer-desk\` | `answer-desk` | — | adopted, unchanged |
| Capture rig (a role) | `OBS\` | `rig` | `rig` | adopted, unchanged |
| Git watcher (a role) | `watcher\` | `watcher` | `watcher` | adopted, unchanged |
| Addvery research and brand capture | `Addvery Research\` | none | — | Alex's own, git-ignored; S0 never touches it |

Notes on the table:

- If a planned folder already exists when S0 runs, S0 adopts it under its name.
- **Each folder loads only its own CLAUDE.md,** never the root's or a sister's. S0 never hand-writes `.claude\settings.json`: `python orchestration\sync_claude_excludes.py`, run from the repo root, writes it for every folder that holds a CLAUDE.md, and adds each new folder to every sister's exclusions. The root's settings already exclude every child.
- **`orchestration\`.** The orchestration session starts at the root and reads the root CLAUDE.md, and the root settings exclude every child CLAUDE.md, so a CLAUDE.md in `orchestration\` would never load. S0 writes none, so the script gives that folder no settings either. It sends `orchestration` the reading-list lines S2's spec asks for, to add to the root CLAUDE.md (step 6).
- **`Addvery Research\`** is git-ignored, so every reader takes it from the local disk, `C:\Users\alder\Desktop\Hire me hackaton\Addvery Research\`, never from GitHub. S-D3 and the website take their Addvery input from it, and S-D6 and S-D7 their brand capture. S0 adds that line to `getsales\`, `canva-templates\` and `linkedin-content\`, and asks `website` to add it.
- **Reading lists of adopted folders,** as of 2 Nov: `website` and `rig` name `..\GIT.md` but not `..\CHARTER.md` or `..\answer-desk\ASKING.md`, so S0 asks those two sessions to add them. `answer-desk` (asking format first, then part of the charter) and `watcher` (git rules only) keep their narrower lists; Q2.1 approved these two exceptions.

### Root moves (DI-4 Q4.1)

The operator: the orchestration session stays at the root, and root files that only orchestration uses live in `orchestration\`. Moves are hard to undo and he dislikes renames once things are pushed, so nothing moves until he approves this table through S0-Q1. As re-checked by the step 2 audit at 13:41 on 2 Nov:

| Now at the root | Moves to | References to update |
| --- | --- | --- |
| `_templates\`: Decision intake template.md, Operator task template.md, Operator inbox.base | `orchestration\_templates\`, folder name unchanged | `orchestration\SPEC.md` line 50 ("in `_templates\` until S0's move table puts it in `orchestration\`"); root `CLAUDE.md` line 13 (says `_templates\` moves once approved); `SESSIONS.md` line 39 ("`Operator tasks\` and `_templates\`: files, not sessions"); the `_templates` exclusions in every folder's `.claude\settings.json`, which a rerun of the sync script drops; the notes in this spec. All are `orchestration`'s files except this spec and the settings, which the script writes. |

- **Stays at the root:** `CHARTER.md`, `GIT.md`, `CLAUDE.md`, `SESSIONS.md`, `.gitignore`, `.claude\` (the orchestration session's settings and skills, read where it starts), `.obsidian\`, and `Operator tasks\` (the inbox view lists that folder by path).
- **Never moves:** the working folders `OBS\`, `website\`, `answer-desk\`, `watcher\`, `Addvery Research\` and every folder in the table above.
- **The inbox view keeps working.** Its filters name `Operator tasks` from the vault root, and its one `_templates` filter is `Operator tasks/_templates`, a different path, so the move doesn't touch it. He opens it from the new place.
- **Obsidian check:** no file in `.obsidian\` names `_templates`, not even `workspace.json` any more. The Templates plugin has no template folder set (there's no `templates.json`). Answered intakes that mention `_templates`, such as DI-2, are records and aren't updated.

## Spec contract

1. **Its place.** Row S0 of the spec outline. It claims five definition-of-done items, one per output in the charter's S0 parameters. All are placeholders until S2 writes the project definition of done and assigns real ids:
   - DoD-S0-a (to be assigned by S2): a working directory for every spec and role.
   - DoD-S0-b (to be assigned by S2): a CLAUDE.md in each, with a reading list that starts with the charter.
   - DoD-S0-c (to be assigned by S2): Git setup and commit conventions every session follows.
   - DoD-S0-d (to be assigned by S2): the answer desk ported and running.
   - DoD-S0-e (to be assigned by S2): a documented launch for every spec session, which can then message the answer desk and the others.
2. **Its neighbours.** Depends on: the charter handed to Claude Code (done). The charter runs S0 alone; in practice `website`, `rig`, `answer-desk`, `watcher` and `orchestration` already run, and S0 works around them without touching their folders. Unblocks: S1 (`s1-research`) and S2 (run by `orchestration`), in parallel, then every wave-2 spec as its inputs arrive. S-D2 is no longer a spec session; the operator runs it himself. S0 runs inside today's operator window (P6).
3. **Operator preflight (P3).** Above: Q2.1 and Q2.2 in DI-2, answered; S0-Q1 at runtime.
4. **Decision log (P5).** Below, with the poke rule.
5. **Forking gates (P8).** Below.
6. **Its working directory.** `bootstrap\`. Reading list, in order: `..\CHARTER.md`, `..\SESSIONS.md`, `..\GIT.md`, `..\answer-desk\ASKING.md`, `..\answer-desk\qa\S0.md` (once the desk has created it), then this SPEC.md. Read `..\answer-desk\CLAUDE.md` before step 3.

## Launching S0

The orchestration session writes `bootstrap\CLAUDE.md` from the template below, runs `python orchestration\sync_claude_excludes.py` from the repo root for its settings, moves the `s0-bootstrap` row of `SESSIONS.md` to Running, then runs in PowerShell:

```powershell
cd "C:\Users\alder\Desktop\Hire me hackaton\bootstrap"; claude --bg -n s0-bootstrap "Read CLAUDE.md, then SPEC.md in this folder, and run the spec from its first unticked step."
```

The settings file keeps the root CLAUDE.md, which holds the orchestration session's instructions, and every sister's CLAUDE.md out of S0's context.

## What S0 does, in order

Tick each step in this file when it's done and commit this folder per `..\GIT.md` (P1). The ticks are the handoff state at a forking gate.

1. [x] **Start.** Load SendMessage and ListAgents with ToolSearch `select:SendMessage,ListAgents`. Check that `answer-desk` and `orchestration` are running; if the desk isn't, tell `orchestration` and wait for it. DI-2's answers are already applied in this spec.
2. [x] **Audit, read-only.** Run `claude agents --json` and note every session's name and working directory. Check which planned folders exist, whether a session already runs in `research\` or any new folder, the reading lists of the adopted folders, the root's top-level entries, and every reference to a path in the move table, in tracked text files and in `.obsidian\` (skip `node_modules`, `.venv`, `.next` and `.git`). Write nothing yet.
3. [x] **Ask S0-Q1, the root moves.** Update the move table from the audit and send it to `answer-desk` as S0-Q1 in the ASKING.md format, complete with what stays and why. Options: (a) move as shown, (b) move with changes he names, (c) move nothing. Recommend (a). Deadline: the later of 18:00 Prague time and 15 minutes after sending. Default, after the deadline only: (c). Don't wait; go on with step 4 (see waiting on the operator, below).
4. [ ] **Write the CLAUDE.md files.** Delegate to one subagent (P7). For each `new` row: the folder and its `CLAUDE.md` from the template below. Extra lines: `legibility\` gets `..\OBS\rig\RUNBOOK.md`; `getsales\`, `canva-templates\` and `linkedin-content\` get the Addvery line. For `research\`, and any folder that already holds a spec naming its own CLAUDE.md lines: the template's lines 1 to 6, then the spec's further lines in its order instead of line 7, plus any role lines it names (for `research\`, section 2 of its SPEC.md). If a session already runs in a folder, send it the text instead of writing it. No SPEC.md, no settings file and no other files.
5. [ ] **Settings and roster, in the same step.** From the repo root, run `python orchestration\sync_claude_excludes.py`. It writes each new folder's `.claude\settings.json` and adds the new folders to every sister's exclusions. Then, in `..\SESSIONS.md`, replace the Planned row "one per wave-2 spec" with one row per new folder (session, folder, spec, when), update the `s1-research` row if needed, and commit the roster on its own: `git commit -m "[roster] Add the wave-2 sessions" -- SESSIONS.md`.
6. [ ] **Send what S0 can't write itself.** Only what the audit found missing; don't wait for replies.
   - `website`: add `..\CHARTER.md` first, then `..\SESSIONS.md`, `..\answer-desk\ASKING.md`, `..\answer-desk\qa\website.md` and the Addvery line, without `@` imports, then commit.
   - `rig`: add `..\CHARTER.md` first, then `..\SESSIONS.md`, `..\answer-desk\ASKING.md` and `..\answer-desk\qa\rig.md`, then commit.
   - `orchestration`: for the root CLAUDE.md, `SESSIONS.md` and the S2 lines from section 3 of `orchestration\SPEC.md`, as root paths: `answer-desk\qa\S2.md`, `orchestration\SPEC.md`, `orchestration\HANDOFF.md` if it exists, then the newest records in `orchestration\changes\`. Also list every sister's settings file the script changed in step 5, since S0 can't commit those.
7. [ ] **Commit the scaffolds.** A folder whose session hasn't started yet belongs to the session that created it (GIT.md). Stage with `git add -- <folder>/...` for each folder from step 4, plus `bootstrap/.claude/settings.json`, check `git diff --cached --name-only`, then make one commit: `git commit -m "[bootstrap] Scaffold spec folders" -- <those paths>`. Never commit another session's folder.
8. [ ] **Check every folder.** A fresh subagent compares each folder from step 4 with the template: the first six reading-list lines present and in order, with `..\SESSIONS.md` second and the folder's own asker in line 5; no `@` imports; a launch line whose folder and session match the roster. Then `python orchestration\sync_claude_excludes.py --check` must report no changes. S0 fixes any miss and commits again. If a new folder's settings lack the `worktree` block the adopted folders have, tell `orchestration`, which owns the script; don't hand-write it.
9. [ ] **Hand the moves to `orchestration`,** once S0-Q1 is answered, or decided after 18:00 (below). Root files are its own, so it makes the moves, then reruns the script so no folder still excludes `_templates`. Under (a) or (b), send it the approved table and the references to update, then update this spec's own mention of `_templates\`. Under (c), log it and send nothing.
10. [ ] **Hand over.** Send `orchestration` one message: S0 is done, the new sessions are in `..\SESSIONS.md`, the launch pattern below, any defaults taken (see the decision log), and that S1 can launch. Commit this folder. S0 ends here.

## Templates

**Settings.** No template: S0 never hand-writes `.claude\settings.json`. Step 5's script writes it from each folder's CLAUDE.md, so every folder loads only its own CLAUDE.md, never the root's or a sister's.

`CLAUDE.md`, with `<spec>`, `<name>` and `<role>` from the charter's spec outline, `<folder>`, `<session>` and `<asker>` from the folder-to-session table:

```markdown
# <spec> — <name>

This folder, `<folder>\`, is the working directory of the background session `<session>`, which runs spec <spec>: <role>. Work only in this folder.

## Reading list
Read these at startup with the Read tool, in this order. Never import them with `@`.
1. `..\CHARTER.md`: the parent context. Never edit it.
2. `..\SESSIONS.md`: the official name, folder and role of every session. Message sessions only by these names.
3. `..\GIT.md`: how every session shares one working tree on `main`.
4. `..\answer-desk\ASKING.md`: every question for the operator goes to `answer-desk` in this format (P4), including the poke.
5. `..\answer-desk\qa\<asker>.md`: this spec's record of every question asked and answered. The desk creates it with the first question; skip it until then.
6. `SPEC.md` in this folder, once it exists. Start with its operator preflight.
7. Research this spec reads: listed in SPEC.md once it's written.

## Working rules
- Load SendMessage and ListAgents at startup with ToolSearch `select:SendMessage,ListAgents`. Message other sessions by name.
- Ask as `<asker>`, one question on the desk at a time: send the next only after the last is answered or withdrawn, rewritten in light of that answer (ASKING.md).
- Commit only this folder, early and often, per `..\GIT.md`. Don't push.
- Never edit another session's folder or any root-level file, except your own rows in `..\SESSIONS.md` (committed on their own with `[roster]`). Message the owner instead.

## Launch and forking gate (P8)
In PowerShell, from any folder:
`cd "C:\Users\alder\Desktop\Hire me hackaton\<folder>"; claude --bg -n <session> "Read CLAUDE.md, then SPEC.md in this folder, and start with its operator preflight."`
The forking gates are in SPEC.md. A handoff keeps the name: the old session writes its handoff, launches the successor as `<session>` again, updates its row in `..\SESSIONS.md` with the handoff time, and stops itself straight away.
```

The Addvery line, appended to the reading list where step 4 or 6 says so: `Addvery input: ..\Addvery Research\, the operator's own folder. It is git-ignored, so read it from the local disk, never from GitHub, and never edit it.`

Launch prompts never contain double quotes, because Windows PowerShell 5.1 strips them.

## Definition of done

S0 is done when any spec session can be launched from its own directory, reads its CLAUDE.md, and gets a question through to the answer desk (charter). Each criterion traces to a placeholder item that S2 replaces with a real id.

| Criterion | DoD item |
| --- | --- |
| Every row of the folder-to-session table exists under its approved name, no folder name carries a spec number, and no adopted folder was overwritten | DoD-S0-a (to be assigned by S2) |
| S0's preflight answers were read from DI-2 and applied | DoD-S0-a (to be assigned by S2) |
| S0-Q1 was answered and its approved move table handed to `orchestration`, or the default (c) was logged | DoD-S0-a (to be assigned by S2) |
| Every new folder, and `research\`, has a CLAUDE.md that passes the step 8 check | DoD-S0-b (to be assigned by S2) |
| Every folder's settings were regenerated by the script, and `--check` reports no changes | DoD-S0-b (to be assigned by S2) |
| `website`, `rig` and `orchestration` have been sent the reading-list lines of step 6 | DoD-S0-b (to be assigned by S2) |
| `..\GIT.md` is adopted as the convention, and every S0 commit is path-limited, on `main` and unpushed | DoD-S0-c (to be assigned by S2) |
| `S0-Q1 queued` came back from the desk to `s0-bootstrap`, launched from `bootstrap\`, whose CLAUDE.md was built from the template and whose settings came from the script | DoD-S0-d and DoD-S0-e (to be assigned by S2) |
| Every new session has its row in `..\SESSIONS.md`, committed with `[roster]`, and the "one per wave-2 spec" placeholder row is gone | DoD-S0-e (to be assigned by S2) |
| Every new folder's CLAUDE.md holds its launch command, and `orchestration` has the handover message | DoD-S0-e (to be assigned by S2) |

## Decision log (P5)

**Waiting on the operator (P5, with his poke rule from DI-3 Q3.4, as set in `..\answer-desk\ASKING.md`).** When S0 has waited 15 minutes on him for anything (a desk question, an operator task, a decision intake), it sends `answer-desk` the line `POKE S0: waiting on you for <what>`, and repeats it every 15 minutes while it is still waiting. Before 18:00 Prague time, it keeps waiting for that decision and does any work that doesn't depend on the answer. From 18:00, P5 applies: it decides, logs the decision here, and sends `WITHDRAW <id>` for any desk question.

Start each decision with the time and the question id it settles, if any.

| Decision | Justification | Why it's the right call | Blast radius if it changes |
| --- | --- | --- | --- |

## Forking gates (P8)

S0 is short and should end before it needs a fork. It has two gates.

- **Mid-run gate.** If S0's context passes about 60% before step 10, a fresh session takes over under the same name, `s0-bootstrap` (`..\SESSIONS.md`: a handoff keeps the name). The old session writes its handoff by ticking and committing this file, launches the successor from this folder:
  `cd "C:\Users\alder\Desktop\Hire me hackaton\bootstrap"; claude --bg -n s0-bootstrap "Take over S0. Read CLAUDE.md, then SPEC.md, and continue at the first unticked step."`
  then updates the `s0-bootstrap` row of `..\SESSIONS.md` with the handoff time, commits it with `[roster]`, and stops itself straight away. Because the name is unchanged, answers to any open S0 question reach the successor. If the session dies instead, `orchestration` launches the successor the same way.
- **End gate.** At step 10, S0 hands over to `orchestration` and stops. Each new folder then belongs to the session launched in it.
