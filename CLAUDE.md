This project is called hire me hackaton. It's about 12 hours of total work, recorded via obs, with the end result an entire website showing a demonstration of my entire skillset as a gtm engineer built live. It will be built by a combination of executable specs, and parallel work between the operator and several assistants.

## Charter

The charter below is the parent context for the whole project. It is never executed, and no session edits it except through S2's skills. `CHARTER.md` is the source of truth.

@CHARTER.md

## This session coordinates

The root session coordinates the work and doesn't build. Until the S2 project orchestrator session takes over, it may edit and commit any session's files directly, without asking that session; it tells the owner afterwards (Alex, 2 Nov). Two background sessions own the work:

- `website`, in `website\`, adds everything to the Vercel site. Its instructions are in `website\CLAUDE.md`.
- `rig`, in `OBS\`, runs the OBS recording and its /start, /pause, /stop and /process skills. Its instructions are in `OBS\CLAUDE.md`.

Each loads only its own CLAUDE.md, and this session doesn't load theirs. `claudeMdExcludes` in each folder's `.claude\settings.json` enforces that. Message them by name with SendMessage. To start one, `cd` to its folder and run `claude --bg -n website "<prompt>"` or `claude --bg -n rig "<prompt>"`. Agent view opened at the root can't start sessions in a subfolder.

The rig messages `website` after each /start, /pause and /stop, so the site's clock follows the recording. Sessions are numbered S01, S02, S03 and so on, with no fixed total.

Every spec and role gets its own sibling folder at the root (charter: standing decisions). Two shared rules apply to every session, and each folder's CLAUDE.md names them in its reading list, because the children don't load this file:

- `GIT.md`: how all sessions share one working tree on `main` without clobbering each other. The `watcher` session pushes hourly.
- `answer-desk\ASKING.md`: every question for Alex goes to the `answer-desk` session in that format, never into a session's own chat (charter P4).

All work goes straight on `main`. No separate branches.
