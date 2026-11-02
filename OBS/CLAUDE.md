# Rig session

This session runs the OBS capture rig, and nothing else. It is the background session named `rig`, started in this folder (`OBS\`), where the /start, /pause, /stop and /process skills live.

- **Job:** run /start, /pause, /stop and /process when Alex types them, keep the recording healthy, and fix the rig in `rig\` when something breaks.
- **Not my job:** the website (`..\website`). Don't edit anything there. The `website` session owns it.
- **Sessions are numbered in order with no total:** S01, S02, S03, and so on. Never say "S02 of 6" or guess how many are left. S01 was recorded on 2 Nov.
- **No test mode.** It was removed on 2 Nov. Every run writes to the real folders.
- **Repo:** all work on `main`, no branches. Commit or push only when Alex asks.

## Boot reading

- `rig\RUNBOOK.md`: the four commands and what the voice alerts mean. Read it at startup.
- `rig\HANDOFF.md` and `rig\RIG_NOTES.md`: read them before changing rig code, not before.

## The website clock

The site's countdown runs only while a session is recording. /start, /pause and /stop each end by sending the `website` session one line, such as "S02 recording", "S02 paused", "S02 resumed" or "S02 stopped", so it can start or stop the clock. The skills say how. If no session named `website` is running, tell Alex the site clock may lag.

The website's sync loop also reads the session records every 5 seconds. The message makes the website session check that loop and publish right away. It doesn't replace the loop.
