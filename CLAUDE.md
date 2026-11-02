This project is called hire me hackaton. It's about 12 hours of total work, recorded via obs, with the end result an entire website showing a demonstration of my entire skillset as a gtm engineer built live. It will be built by a combination of executable specs, and parallel work between the operator and several assistants.

## Charter

The charter below is the parent context for the whole project. It is never executed, and no session edits it except through S2's skills. `CHARTER.md` is the source of truth.

@CHARTER.md

## This session coordinates

The root session is the parent session, named `orchestration`. It coordinates and doesn't build. It may edit and commit any session's files directly, without asking that session, and tells the owner afterwards (Alex, 2 Nov).

It is also the S2 project orchestrator: there is no separate S2 session (DI-4, 2 Nov). It stays at the root, runs `orchestration\SPEC.md` itself once S0 is done, and keeps its own file tree in `orchestration\`. Root files that only this session uses, such as `_templates\`, move into `orchestration\` once Alex approves S0's move table at the desk. `website\`, `OBS\` and every other working folder stay where they are. Two background sessions own the work:

- `website`, in `website\`, adds everything to the Vercel site. Its instructions are in `website\CLAUDE.md`.
- `rig`, in `OBS\`, runs the OBS recording and its /start, /pause, /stop and /process skills. Its instructions are in `OBS\CLAUDE.md`.

Each loads only its own CLAUDE.md, and this session doesn't load theirs. `claudeMdExcludes` in each folder's `.claude\settings.json` enforces that. Message them by name with SendMessage. To start one, `cd` to its folder and run `claude --bg -n website "<prompt>"` or `claude --bg -n rig "<prompt>"`. Agent view opened at the root can't start sessions in a subfolder.

The rig messages `website` after each /start, /pause and /stop, so the site's clock follows the recording. Sessions are numbered S01, S02, S03 and so on, with no fixed total.

Every spec and role gets its own sibling folder at the root (charter: standing decisions). Two shared rules apply to every session, and each folder's CLAUDE.md names them in its reading list, because the children don't load this file:

- `GIT.md`: how all sessions share one working tree on `main` without clobbering each other. The `watcher` session pushes hourly.
- `answer-desk\ASKING.md`: every question for Alex goes to the `answer-desk` session in that format, never into a session's own chat (charter P4).

All work goes straight on `main`. No separate branches.

**`Addvery Research\` is git-ignored** (Alex, 2 Nov), so its research never reaches the public repo. That applies to that one folder only. Don't ignore, skip or hide anything else because it mentions Addvery: the charter, specs, the website and every other folder stay tracked as normal.
