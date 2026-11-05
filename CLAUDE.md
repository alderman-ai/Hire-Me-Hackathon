This project is called hire me hackaton. It's about 12 hours of total work, recorded via obs, with the end result an entire website showing a demonstration of my entire skillset as a gtm engineer built live. It will be built by a combination of executable specs, and parallel work between the operator and several assistants.

## Context monitoring: disabled

This switch is either `active` or `disabled`. Only Alex changes it. When he does, change that one word and the line under the list.

- **At the start of every session, before anything else,** tell Alex in one line: "Context monitoring: disabled. Confirm?" (or "active"), then get on with his request without waiting. Silence counts as a yes: if he ignores the line or moves on to his next prompt, the switch stays where it is. Change it only when he says to.
- **Active:** read `orchestration\CONTEXT-WATCH.md` in full and carry out everything in it, starting with its cron.
- **Disabled:** create no cron and run no context watch. Leave other sessions' context alone unless Alex asks.

Set to disabled by Alex on 5 Nov at about 10:05 ("right now, I don't need you to be watching context. I just need to have a one-on-one session with you").

## Charter

The charter below is the parent context for the whole project. It is never executed, and no session edits it except through S2's skills. `CHARTER.md` is the source of truth.

@CHARTER.md

## This session coordinates

The root session is the parent session, named `orchestration`. It coordinates and doesn't build. It may edit and commit any session's files directly, without asking that session, and tells the owner afterwards (Alex, 2 Nov).

**Since 2 Nov 18:56 it's the master orchestrator, and Alex doesn't talk to it** (his words: "too much is happening in one orchestration session ... there's a lot of semantic directions going and it's hurting our results"). It handles the other sessions only: handoffs, context, the roster and the charter (S2). Three sub-orchestrators take the rest, and Alex talks to each one directly in its own chat:
- `orch-site-map`, in `site-map\`: the site's layout and structure, and the scope map
- `orch-alex-prep`, in `alex-prep\`: everything that needs Alex, and `Open tasks.md`
- `orch-briefing`, in `briefing\` (renamed from `briefing` at 18:59): monitors everything and answers "what should I do next?"

**Since 19:58: the course change** (Alex, after the crash). Only six sessions run: this one, the three sub-orchestrators, `website` and `rig`. Every other session is paused (`SESSIONS.md`, "Paused"). Design and copy happen only with Alex attending, one item at a time, from the finish list in the root `STATUS.md`. With `watcher` paused, this session commits and pushes. Canva is off for every session (`orchestration\canva_guard.py`, `orchestration\CANVA-ON`).

**Standing order (Alex, 4 Nov): alert Alex whenever `/for/ceo` gets a visit** (the CEO's page; he emailed it to him on 4 Nov). Every orchestration session keeps this watch running and tells Alex in chat, or with a push notification when he's away. How to watch, and its limits, are in `orchestration\HANDOFF.md`, "Standing order: visits to /for/ceo".

It is also the S2 project orchestrator: there is no separate S2 session (DI-4, 2 Nov). It stays at the root, runs `orchestration\SPEC.md` itself once S0 is done, and keeps its own file tree in `orchestration\`. Root files that only this session uses live in `orchestration\`: `_templates\` moved to `orchestration\_templates\` (S0-Q1, 13:43). `website\`, `OBS\` and every other working folder stay where they are.

Reading list for this session as S2, after the charter: `answer-desk\qa\S2.md`, `orchestration\SPEC.md`, `Operator tasks\Archive\DI-4 S2 Orchestrator preflight.md` (Alex's S2 preflight answers, verbatim), `orchestration\HANDOFF.md` if it exists, then the newest records in `orchestration\changes\`. Two background sessions own the work:

- `website`, in `website\`, adds everything to the Vercel site. Its instructions are in `website\CLAUDE.md`.
- `rig`, in `OBS\`, runs the OBS recording and its /start, /pause, /stop and /process skills. Its instructions are in `OBS\CLAUDE.md`.

Each loads only its own CLAUDE.md, and this session doesn't load theirs. `claudeMdExcludes` in each folder's `.claude\settings.json` enforces that. Message them by name with SendMessage. To start one, `cd` to its folder and run `claude --bg -n website "<prompt>"` or `claude --bg -n rig "<prompt>"`. Agent view opened at the root can't start sessions in a subfolder.

The rig messages `website` after each /start, /pause and /stop, so the site's clock follows the recording. Sessions are numbered S01, S02, S03 and so on, with no fixed total.

Every spec and role gets its own sibling folder at the root (charter: standing decisions). These shared rules apply to every session, and each folder's CLAUDE.md names them in its reading list, because the children don't load this file:

- `GIT.md`: how all sessions share one working tree on `main` without clobbering each other. The `watcher` session pushes hourly.
- `answer-desk\ASKING.md`: every question for Alex goes to the `answer-desk` session in that format, never into a session's own chat (charter P4).
- `SESSIONS.md`: the roster of official session names, folders and roles. Sessions message each other only by these names, and whoever launches, renames, forks or stops a session updates its row in the same step.
- `Operator tasks\Archive\INDEX.md`: the catalog of every answered intake and operator task; read it before asking Alex something he may already have answered.

Every working folder loads only its own CLAUDE.md (Alex, 2 Nov). When a top-level folder is added, run `python orchestration\sync_claude_excludes.py` from the root; this root session's `*/**` pattern already excludes every child.

All work goes straight on `main`. No separate branches.

**`Addvery Research\` is git-ignored** (Alex, 2 Nov), so its research never reaches the public repo. That applies to that one folder only. Don't ignore, skip or hide anything else because it mentions Addvery: the charter, specs, the website and every other folder stay tracked as normal.
