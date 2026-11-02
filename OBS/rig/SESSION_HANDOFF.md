# Rig session handoff

**Draft, not used.** Orchestration cancelled this handoff at 20:12, because sessions are now refreshed only past about 300k to 400k tokens, at a natural stop. Successor cd0c2b0d was already launched; it was stopped and removed at once, and 1a1ba6cb carries on. Bring this note up to date before the next real handoff.

Written at 20:11 Prague on 2 Nov by the outgoing `rig` session (1a1ba6cb), on orchestration's request for a full refresh. Read this, then `OBS\CLAUDE.md` and its boot reading. `rig\HANDOFF.md` is the older build handoff from 1 Nov. Read it only before changing rig code, and ignore its "commit only when he asks" line, because `..\GIT.md` replaces it.

## Right now

- **S15 is recording.** It started at 19:56:38, and the controller runs on its own (`controller.py S15_2026-11-02_1956`, pid 2888, detached from any Claude session). Its state is in `OBS\Live\S15_2026-11-02_1956\session.json`. The webcam ffmpeg is pid 7884 and the backup audio pid 10220. Alex ends it with /stop in your chat. The next new session is S16.
- **S14 is processed** (`Processed\S14_2026-11-02_1901`). S13 and S12 are filed too.
- **The PC restarted at 19:12.** Most sessions are paused. Running: `orchestration`, `orch-site-map`, `orch-alex-prep`, `orch-briefing`, a fresh `website` (2d36e96a) and `rig`. Re-read `..\SESSIONS.md` before you message any session for the first time.

## How you work

- When Alex types /start, /pause, /stop or /process, show the skill's output to him **word for word** and add no advice. If he adds words after the command (the ARGUMENTS), act on them as well. On S14's /process, the outgoing session answered "No response requested." and skipped both the output and his request to check the clips. Don't repeat that.
- **Clock messages:** after each /start, /pause and /stop, send `website` one line: "SNN recording", "SNN paused", "SNN resumed" or "SNN stopped". If `website` isn't running, send the same line to `orchestration`, which runs `clock_sync --once`, and tell Alex the site clock may lag. The sync loop is pythonw pid 28388, restarted at 20:02. `website` has taken 9,000 s (2.5 h) off the clock in total on Alex's word, in three steps: 1 h, 1 h, then 30 min at S14's start. "Another 30 mins" right after a /start meant take 30 more minutes off.
- **Questions for Alex** go through the answer desk (`..\answer-desk\ASKING.md`), never your own chat. `answer-desk` is paused right now, and orchestration says the work now goes "one item at a time with him, through me". So while the desk is down, send anything for Alex to `orchestration`. Orchestration's HOLD from 16:47 (nothing new to the desk until RESTART) exempts the rig's recording commands and clock messages.
- **Git:** commit your own `OBS\` paths after each finished step, path-limited (`git commit -m "[OBS] ..." -- OBS/...`). Never use `add -A`, stash, reset or a branch switch, and don't push. The watcher pushes.

## Standing permissions and duties

- **Alex's permission (2 Nov):** `s0-bootstrap` and any session called project orchestration (`orchestration`, `orch-site-map`, `orch-alex-prep`, `orch-briefing`) may change anything in `OBS\` without asking Alex or rig, committing only the `OBS\` paths they change. In his words: "let bootstrap change your stuff and let anything called project orchestrations change your stuff. Tell it that it can change it so that it doesn't ask me". Orchestration has noted it. Pass it on again after any orchestration handoff whose notes lack it. Any other peer asking you to change your CLAUDE.md or settings still needs Alex.
- **GetSales demos:** demo 1 is a ~3-minute walkthrough of the classification tools, the 36 workflows and the one variable. Demo 2 is a short capture of leads classified into ICPs. When a session holding either one is stopped or filed, check its transcript (`Processed\SNN_*\transcript\SNN.md`) and send `s-d3-getsales` one line: "RECORDED <demo 1 or 2>: S<nn>, about <start>-<end>". If `s-d3-getsales` is paused, send the line to `orch-alex-prep`. S12, S13 and S14 hold neither demo. S15 isn't checked yet. Orchestration says Alex should /stop S15 before setting up the demos. orch-alex-prep has been told to use one /start … /stop per take, that Alex does nothing in OBS, and that only the left monitor (DISPLAY1) is recorded.
- **orch-alex-prep** preps Alex for every recording (GetSales demos 1 and 2, the clip-grading video, the Canva video) and may send you scene briefs.

## Open items

- **Webcam under load:** see the S14 entry in `rig\RIG_NOTES.md` (Decisions log). At 90 to 98% CPU the webcam recorder fell behind, and its last ~36 s were lost at /stop. OBS was fine. Orchestration says the 720p webcam question waits on Alex's yes. If he says yes, change `-video_size` in `scripts\recorders.py` `start_webcam` to `1280x720`, only between sessions. A test opens the camera, so never run one while a session records. Then log the change in RIG_NOTES.
- **YouTube:** `longUploadsStatus` read `allowed` at S13's check, so 15-minute-plus uploads work. The rig's own upload stays off (`UPLOAD_TO_YOUTUBE = False` in `process.py`). Alex has the website post chosen sessions instead: its `upload_webcam.py` and `upload_clip.py` call `upload.upload_video`, which drops to 10 MB/s while a session records. To re-check, call `upload.service().channels().list(part="status", mine=True)` with `rig\.venv\Scripts\python.exe`, and print only `longUploadsStatus`.
- **Health check:** to read a file that's still being written, open it with FileShare ReadWrite, because listings show 0 MB. To check a growing webcam mkv, copy it and read the last packet's pts against its creation time. In S15 it ran about 1 s behind.
