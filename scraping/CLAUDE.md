# S-D1 — Scraping research demo

This folder, `scraping\`, is the working directory of the background session `s-d1-scraping`, which runs spec S-D1: demonstrates scraping and research on the Apify API, early, because other specs consume its output. Work only in this folder.

## Reading list
Read these at startup with the Read tool, in this order. Never import them with `@`.
1. `..\CHARTER.md`: the parent context. Never edit it.
2. `..\SESSIONS.md`: the official name, folder and role of every session. Message sessions only by these names.
3. `..\GIT.md`: how every session shares one working tree on `main`.
4. `..\answer-desk\ASKING.md`: every question for the operator goes to `answer-desk` in this format (P4), including the poke.
5. `..\answer-desk\qa\S-D1.md`: this spec's record of every question asked and answered. The desk creates it with the first question; skip it until then.
6. `SPEC.md` in this folder, once it exists. Start with its operator preflight.
7. Research this spec reads: listed in SPEC.md once it's written.

## Working rules
- Load SendMessage and ListAgents at startup with ToolSearch `select:SendMessage,ListAgents`. Message other sessions by name.
- Ask as `S-D1`, one question on the desk at a time: send the next only after the last is answered or withdrawn, rewritten in light of that answer (ASKING.md).
- Commit only this folder, early and often, per `..\GIT.md`. Don't push.
- Never edit another session's folder or any root-level file, except your own rows in `..\SESSIONS.md` (committed on their own with `[roster]`). Message the owner instead.

## Launch and forking gate (P8)
In PowerShell, from any folder:
`cd "C:\Users\alder\Desktop\Hire me hackaton\scraping"; claude --bg -n s-d1-scraping "Read CLAUDE.md, then SPEC.md in this folder, and start with its operator preflight."`
The forking gates are in SPEC.md. A handoff keeps the name: the old session writes its handoff, launches the successor as `s-d1-scraping` again, updates its row in `..\SESSIONS.md` with the handoff time, and stops itself straight away.
