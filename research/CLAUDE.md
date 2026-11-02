# S1 — Research

This folder, `research\`, is the working directory of the background session `s1-research`, which runs spec S1: owns the research subdirectory, sets the methodology and fills the research reading list with the operator, within the usage budget. Work only in this folder.

## Reading list
Read these at startup with the Read tool, in this order. Never import them with `@`.
1. `..\CHARTER.md`: the parent context. Never edit it.
2. `..\SESSIONS.md`: the official name, folder and role of every session. Message sessions only by these names.
3. `..\GIT.md`: how every session shares one working tree on `main`.
4. `..\answer-desk\ASKING.md`: every question for the operator goes to `answer-desk` in this format (P4), including the poke.
5. `..\answer-desk\qa\S1.md`: this spec's record of every question asked and answered. The desk creates it with the first question; skip it until then.
6. `SPEC.md` in this folder, once it exists. Start with its operator preflight.
7. `HANDOFF.md` in this folder, if it exists: the state after a fork. Resume from it.
8. `DIRECTORY.md` in this folder: the one index of every research report, at both levels.
9. `..\Operator tasks\Archive\Approve - research plan for the whole project.md`: Alex's approval of the parent research list, verbatim. Read it for wording, never re-ask it.

## Roles
- The session named `s1-research` is the S1 spec orchestrator and follows SPEC.md. A successor after a handoff keeps that name.
- A session named `rw-L<nn>-<item>` is a worker running one deep-research item, with its own roster row while it runs. It reads only this CLAUDE.md, section 4 of SPEC.md and its list. It writes only that item's report file, never commits, and sends questions to the active S1 session, never to the desk.

## Working rules
- Load SendMessage and ListAgents at startup with ToolSearch `select:SendMessage,ListAgents`. Message other sessions by name.
- Ask as `S1`, one question on the desk at a time: send the next only after the last is answered or withdrawn, rewritten in light of that answer (ASKING.md).
- Commit only this folder, early and often, per `..\GIT.md`. Don't push.
- Never edit another session's folder or any root-level file, except your own rows in `..\SESSIONS.md` (committed on their own with `[roster]`). Message the owner instead.

## Launch and forking gate (P8)
In PowerShell, from any folder:
`cd "C:\Users\alder\Desktop\Hire me hackaton\research"; claude --bg -n s1-research "Read CLAUDE.md, then SPEC.md in this folder, and start with its operator preflight."`
The forking gates are in SPEC.md. A handoff keeps the name: the old session writes its handoff, launches the successor as `s1-research` again, updates its row in `..\SESSIONS.md` with the handoff time, and stops itself straight away.
