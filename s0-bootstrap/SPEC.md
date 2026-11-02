# S0 — Bootstrap: executable spec

Spec S0 (meta, deliverable M0) · runs in `s0-bootstrap\` as the session `s0-bootstrap` · parent context: `..\CHARTER.md`

S0 turns the charter into a project where every other spec can launch in parallel (P1). It creates one folder per spec and role at the project root, and gives each a CLAUDE.md with its reading list, a `.claude\settings.json` and a documented launch command. It adopts what already exists. It writes no wave-2 spec, researches nothing, launches no spec session (the orchestration session does that) and never edits CHARTER.md.

## Operator preflight (P3)

S0 needs one thing from the operator: approval of the directory plan below. The charter says: "One approval of the directory plan before anything is written." One existing folder needs a second answer. Both are in decision intake DI-2, `..\Operator tasks\DI-2 S0 Bootstrap preflight.md`, which the operator answers in Obsidian; they are not sent to the answer desk.

| Id | Question | Default if unanswered (P5) | Status |
| --- | --- | --- | --- |
| Q2.1 (DI-2) | Approve the directory plan below? | Approve as shown | draft |
| Q2.2 (DI-2) | Which spec owns `Addvery Research\`, and may S0 rename it to `s-d2-addvery`? | S-D2's folder under its current name, session `addvery-research`; S1's, still unrenamed, if Q3.3 in DI-3 gives the Addvery research to S1 | draft |

**Launch gate.** The S0 session isn't launched until the operator says "DI-2 is ready". From then on, an empty fence means the default named in that question.

### Directory plan

Rule: a folder's name is its session's name, lowercase and hyphenated, so ListAgents, the watcher and every launch command find a session by its folder. Adopted folders keep their names and their owners' files.

| Spec or role | Folder | Session | New or adopted |
| --- | --- | --- | --- |
| S0 Bootstrap | `s0-bootstrap\` | `s0-bootstrap` | new (holds this spec) |
| S1 Research | `s1-research\` | `s1-research` | new |
| S2 Project orchestrator | `s2-orchestrator\` | `s2-orchestrator` | new |
| S-D1 Scraping research demo | `s-d1-scraping\` | `s-d1-scraping` | new |
| S-D2 Company and stakeholder research | `s-d2-addvery\` | `s-d2-addvery` | adopted from `Addvery Research\`, pending Q2.2 |
| S-D3 GetSales outbound demo | `s-d3-getsales\` | `s-d3-getsales` | new |
| S-D4 Blog pipeline | `s-d4-blog-pipeline\` | `s-d4-blog-pipeline` | new |
| S-D5 Three blog articles | `s-d5-blog-articles\` | `s-d5-blog-articles` | new |
| S-D6 Canva LinkedIn templates | `s-d6-canva-templates\` | `s-d6-canva-templates` | new |
| S-D7 LinkedIn content creation demo | `s-d7-linkedin-content\` | `s-d7-linkedin-content` | new |
| S-D8 Website | `website\` | `website` | adopted, unchanged |
| S-D9 Legibility analyzer | `s-d9-legibility\` | `s-d9-legibility` | new |
| S-D10 Canva design video | `s-d10-canva-video\` | `s-d10-canva-video` | new |
| Answer desk | `answer-desk\` | `answer-desk` | adopted, unchanged |
| Orchestration session | repo root, or `s2-orchestrator\` | `orchestration` | adopted; pending S2's question: stay at the root, or move into S2's folder. S0 creates nothing for it either way. |
| Capture rig (a role, not a spec) | `OBS\` | `rig` | adopted, unchanged |
| Git watcher (not in the charter) | `watcher\` | `watcher` | adopted, unchanged |

Notes on the plan:

- If the S1 or S2 spec already sits in a folder with another name when S0 runs, S0 adopts that folder and its name.
- `Operator tasks\`, `_templates\` and `.obsidian\` are not session folders. S0 leaves them alone.
- Brand capture feeds S-D6 and S-D7 but has no row in the spec outline, so it gets no folder until the charter's open question on its owner is settled.
- Reading lists of adopted folders, as of 2 Nov: `website` and `rig` name `..\GIT.md` but not `..\CHARTER.md` or `..\answer-desk\ASKING.md`, so S0 asks those two sessions to add them. `answer-desk` (asking format first, then part of the charter) and `watcher` (git rules only) keep their narrower lists on purpose. Approving Q2.1 approves these two exceptions to the charter's "a reading list that starts with this charter".

## Spec contract

1. **Its place.** Row S0 of the spec outline. It claims five definition-of-done items, one per output in the charter's S0 parameters. All are placeholders until S2 writes the project definition of done and assigns real ids:
   - DoD-S0-a (to be assigned by S2): a working directory for every spec and role.
   - DoD-S0-b (to be assigned by S2): a CLAUDE.md in each, with a reading list that starts with the charter.
   - DoD-S0-c (to be assigned by S2): Git setup and commit conventions every session follows.
   - DoD-S0-d (to be assigned by S2): the answer desk ported and running.
   - DoD-S0-e (to be assigned by S2): a documented launch for every spec session, which can then message the answer desk and the others.
2. **Its neighbours.** Depends on: the charter handed to Claude Code (done). The charter runs S0 alone; in practice `website`, `rig`, `answer-desk`, `watcher` and `orchestration` already run, and S0 works around them without touching their folders. Unblocks: S1 and S2, in parallel, then every wave-2 spec as its inputs arrive. S0 runs inside today's operator window (P6), because its one approval needs him.
3. **Operator preflight (P3).** Above: Q2.1 and Q2.2, in DI-2.
4. **Decision log (P5).** Below.
5. **Forking gates (P8).** Below.
6. **Its working directory.** `s0-bootstrap\`. Reading list, in order: `..\CHARTER.md`, `..\GIT.md`, `..\answer-desk\ASKING.md`, then this SPEC.md. Read `..\answer-desk\CLAUDE.md` before step 9.

## Launching S0

Before launch, the orchestration session writes `s0-bootstrap\.claude\settings.json` and `s0-bootstrap\CLAUDE.md` from the templates below (role: "scaffolds every working directory"), then runs in PowerShell:

```powershell
cd "C:\Users\alder\Desktop\Hire me hackaton\s0-bootstrap"; claude --bg -n s0-bootstrap "Read CLAUDE.md, then SPEC.md in this folder, and run the spec from its first unticked step."
```

The settings file keeps the root CLAUDE.md, which holds the orchestration session's instructions, out of S0's context.

## What S0 does, in order

Tick each step in this file when it's done and commit this folder per `..\GIT.md` (P1). The ticks are the handoff state at a forking gate.

1. [ ] **Start.** Load SendMessage and ListAgents with ToolSearch `select:SendMessage,ListAgents`. Check that `answer-desk` and `orchestration` are running; if the desk isn't, tell `orchestration` and wait for it (step 9 needs it). Read the answers to Q2.1 and Q2.2 from DI-2's fences, `..\Operator tasks\DI-2 S0 Bootstrap preflight.md`. Send nothing to the desk.
2. [ ] **Audit, read-only.** Run `claude agents --json` and note every session's name and working directory. Confirm which planned folders exist, whether a session runs in `Addvery Research\`, and the reading lists of the adopted folders. Write nothing yet.
3. [ ] **Apply Q2.1.** Apply the answer, or the default if its fence is empty, and log any default.
4. [ ] **Create the new folders.** Delegate to one subagent (P7): for each `new` row, the folder, its `CLAUDE.md` and its `.claude\settings.json`, from the templates below. S-D9's reading list also gets `..\OBS\rig\RUNBOOK.md`. No SPEC.md and no other files.
5. [ ] **Adopt `Addvery Research\`** per Q2.2. If a session runs in it, message that session instead of acting. Otherwise rename it if the answer says so (it's untracked, so a plain folder rename; if Windows refuses because the folder is in use, keep the name and log it), add the settings file, and put the template's header and reading list above the operator's text, which stays word for word.
6. [ ] **Ask adopted owners for their reading lists.** One message each to `website` and `rig`: add `..\CHARTER.md` first and `..\answer-desk\ASKING.md` to your CLAUDE.md reading list, without `@` imports, then commit. Don't wait for the replies.
7. [ ] **Commit the scaffolds.** S0 owns a new folder's scaffold until that folder's session first launches. Stage with `git add -- <folder>/...` for each folder from steps 4 and 5, check `git diff --cached --name-only`, then make one commit: `git commit -m "[s0-bootstrap] Scaffold spec folders" -- <those folders>`. Never commit another session's folder.
8. [ ] **Check every folder.** A fresh subagent compares each folder from steps 4 and 5 with the templates: settings identical, the first three reading-list lines present and in order, no `@` imports, and a launch line whose folder and session match the plan. S0 fixes any miss and commits again.
9. [ ] **Live probe.** Launch a short-lived session `s0-probe` in `s-d10-canva-video\`, the last spec to run, so nothing collides with it: `claude --bg -n s0-probe "Probe for S0. Read CLAUDE.md. Send answer-desk one question in the ASKING.md format with id S0-Q3, titled Probe, saying it is an automatic check and needs no answer. When the desk replies S0-Q3 queued, send WITHDRAW S0-Q3. Then tell s0-bootstrap in one line your working directory, item 1 of your reading list and the desk reply. Do nothing else."` Confirm its working directory with `claude agents --json`, then stop it.
10. [ ] **Hand over.** Send `orchestration` one message: S0 is done, the folders are ready, the launch pattern below, any defaults taken (see the decision log), and that S1 and S2 can launch. Commit this folder. S0 ends here.

## Templates

`.claude\settings.json`, identical in every new folder:

```json
{
  "claudeMdExcludes": [
    "**/Hire me hackaton/CLAUDE.md"
  ],
  "worktree": {
    "bgIsolation": "none",
    "baseRef": "head"
  }
}
```

`CLAUDE.md`, with `<spec>`, `<name>`, `<folder>` and `<role>` filled from the plan and the charter's spec outline:

```markdown
# <spec> — <name>

This folder is the working directory of the background session `<folder>`, which runs spec <spec>: <role>. Work only in this folder.

## Reading list
Read these at startup with the Read tool, in this order. Never import them with `@`.
1. `..\CHARTER.md`: the parent context. Never edit it.
2. `..\GIT.md`: how every session shares one working tree on `main`.
3. `..\answer-desk\ASKING.md`: every question for the operator goes to `answer-desk` in this format (P4).
4. `SPEC.md` in this folder, once it exists. Start with its operator preflight.
5. Research findings for this spec: none yet. Links are added here when the research reading list is filled.

## Working rules
- Load SendMessage and ListAgents at startup with ToolSearch `select:SendMessage,ListAgents`. Message other sessions by name.
- Commit only this folder, early and often, per `..\GIT.md`. Don't push.
- Never edit another session's folder or any root-level file. Message its owner instead.

## Launch and forking gate (P8)
In PowerShell, from any folder:
`cd "C:\Users\alder\Desktop\Hire me hackaton\<folder>"; claude --bg -n <folder> "Read CLAUDE.md, then SPEC.md in this folder, and start with its operator preflight."`
The forking gates are in SPEC.md. A successor session takes the next name (`<folder>-2`) and is announced to `orchestration` and `answer-desk`.
```

Launch prompts never contain double quotes, because Windows PowerShell 5.1 strips them.

## Definition of done

S0 is done when any spec session can be launched from its own directory, reads its CLAUDE.md, and gets a question through to the answer desk (charter). Each criterion traces to a placeholder item that S2 replaces with a real id.

| Criterion | DoD item |
| --- | --- |
| Every row of the directory plan exists under its approved name, and no adopted folder was overwritten | DoD-S0-a (to be assigned by S2) |
| Every new folder, and `Addvery Research\` or its renamed successor, has a CLAUDE.md that passes the step 8 check and the standard settings file | DoD-S0-b (to be assigned by S2) |
| `website` and `rig` have been asked to add the charter and ASKING.md to their reading lists | DoD-S0-b (to be assigned by S2) |
| `..\GIT.md` is adopted as the convention, and every S0 commit is path-limited, on `main` and unpushed | DoD-S0-c (to be assigned by S2) |
| S0's preflight answers were read from DI-2 and applied | DoD-S0-a (to be assigned by S2) |
| `s0-probe`, launched from a new folder, reported that folder as its working directory, `..\CHARTER.md` as reading-list item 1, and `S0-Q3 queued` from the desk | DoD-S0-d and DoD-S0-e (to be assigned by S2) |
| Every new folder's CLAUDE.md holds its launch command, and `orchestration` has the handover message | DoD-S0-e (to be assigned by S2) |

## Decision log (P5)

When the operator doesn't answer within 15 minutes, S0 decides and records it here. Start each decision with the time and the question id it settles, if any.

| Decision | Justification | Why it's the right call | Blast radius if it changes |
| --- | --- | --- | --- |

## Forking gates (P8)

S0 is short and should end before it needs a fork. It has two gates.

- **Mid-run gate.** If S0's context passes about 60% before step 10, or the session dies, a fresh session takes over. The old one first ticks and commits this file. The successor launches from this folder:
  `cd "C:\Users\alder\Desktop\Hire me hackaton\s0-bootstrap"; claude --bg -n s0-bootstrap-2 "Take over S0. Read CLAUDE.md, then SPEC.md, and continue at the first unticked step."`
  It tells `orchestration` it is now the active S0 session, and tells `answer-desk` to send answers to any open S0 question to it. Then the old session is stopped.
- **End gate.** At step 10, S0 hands over to `orchestration` and stops. Each new folder then belongs to the session launched in it.
