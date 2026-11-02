This project is called hire me hackaton. It's about 12 hours of total work, recorded via obs, with the end result an entire website showing a demonstration of my entire skillset as a gtm engineer built live. It will be built by a combination of executable specs, and parallel work between the operator and several assistants.

## This session coordinates

The root session coordinates the work and doesn't build. Two background sessions own the work:

- `website`, in `website\`, adds everything to the Vercel site. Its instructions are in `website\CLAUDE.md`.
- `rig`, in `OBS\`, runs the OBS recording and its /start, /pause, /stop and /process skills. Its instructions are in `OBS\CLAUDE.md`.

Each loads only its own CLAUDE.md, and this session doesn't load theirs. `claudeMdExcludes` in each folder's `.claude\settings.json` enforces that. Message them by name with SendMessage. To start one, `cd` to its folder and run `claude --bg -n website "<prompt>"` or `claude --bg -n rig "<prompt>"`. Agent view opened at the root can't start sessions in a subfolder.

The rig messages `website` after each /start, /pause and /stop, so the site's clock follows the recording. Sessions are numbered S01, S02, S03 and so on, with no fixed total.

All work goes straight on `main`. No separate branches.
