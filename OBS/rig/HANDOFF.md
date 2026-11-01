# Capture rig handoff

Written on the evening of 1 Nov 2026 for a fresh Claude Code session. **The hackathon is tomorrow, 2 Nov 2026**, so the goal is a rig that's proven and clean tonight.

Read these too:

- `OBS\Pre Hackathon Spec.md`: the executable spec.
- `OBS\rig\RIG_NOTES.md`: every measurement and decision. Its "Spec changes from DI-1" section **overrides the spec**.
- `Operator tasks\DI-1 Capture rig decisions.md`: Alex's answers, in his words.

## How to work with Alex

- **No scope creep.** He rejected a livestream design as scope creep, even after writing "if possible" in DI-1. Build what's in the spec and the notes, and don't add features.
- **If you need him to talk, say so plainly,** with exact steps and when to start. He said this directly.
- **Warn him before the webcam or recording turns on, or before a voice alert plays.** Give the length and say where the footage goes.
- **Don't look at his screen.** Measure capture brightness instead of viewing a screenshot. Don't quote what the mic picks up in the room. Other people's voices get recorded.
- **He dictates with Wispr Flow.** Expect slips, like "/stop" written where "/start" is meant.
- **Group the things you need from him** into one ask, and keep them short.
- **Commit or push only when he asks.** The repo is public: https://github.com/alderman-ai/Hire-Me-Hackathon
- **Never print secrets.** `rig\.env` holds the OBS password, and will hold the YouTube tokens.

## Where things stand

| Spec task | Status |
| --- | --- |
| 1. Inventory | Passed |
| 2. Tools | Passed. OBS 33.0.0. |
| 3. OBS profile | Passed |
| 4. Load test | Passed, but on a nearly still screen. Task 12 must measure real work. |
| 5. Audio | Passed. +6 dB mic boost saved in OBS. Expected peaks are calculated, not yet recorded. |
| 6. Controller and skills | Passed through `claude -p`. Typing them interactively is still unproven. |
| 7. Crash drill | Passed |
| 8. /process | Everything except upload is tested. The read-aloud check is still to do. |
| 9. YouTube | Code written. **Waiting on Alex's Google setup.** |
| 10. find_clip | Passed, using a fake YouTube id. A real `?t=` link is still to check. |
| 11. Preflight | Built, and passes. **The failure cases aren't tested:** websocket off, mic unplugged. |
| 12. Dress rehearsal | Not started |
| 13. Runbook | Drafted in `rig\RUNBOOK.md`. Update it after Task 12. |

Nothing since the first commit (`6bd2f1f`) has been committed. That covers all of `OBS\rig\`, `Operator tasks\`, the spec notice and the `.gitignore` changes. `git status` confirms `.env`, `.venv`, `models` and `run` are ignored.

## The machine right now

- OBS is running in the tray, which is normal after /stop. No ffmpeg, controller or process worker is running.
- C: has 99.6 GB free and D: has 1,243.8 GB free.
- The real areas are untouched, so tomorrow starts at S01: `D:\OBS Outputs\To process` is empty, and `OBS\Live`, `OBS\Processed`, `D:\OBS Outputs\Uploaded` and `OBS\hackathon_clock.json` don't exist yet.
- Test data sits in `D:\OBS Outputs\_test`, `OBS\_test` and `OBS\rig\run\test`.

## What to do next

### 1. Google setup (waiting on Alex)

Alex was given these steps. He'll reply "google done" once `client_secret.json` is in `OBS\rig\`. He must use the Google account that owns his main YouTube channel.

1. [Create a project](https://console.cloud.google.com/projectcreate) named `Hackathon rig`, then select it.
2. [Enable the YouTube Data API](https://console.cloud.google.com/apis/library/youtube.googleapis.com).
3. [Auth overview](https://console.cloud.google.com/auth/overview): Get started, app name `Hackathon rig`, his email, audience External.
4. [Audience](https://console.cloud.google.com/auth/audience): add that same Google account as a test user.
5. [Clients](https://console.cloud.google.com/auth/clients): create a Desktop app client and download the JSON.
6. Save it as exactly `client_secret.json` in `OBS\rig\`.

Then run `..\.venv\Scripts\python.exe youtube_setup.py` from `rig\scripts`. A browser opens. Warn him first that he'll see "Google hasn't verified this app", and that he should click Advanced, then Go to Hackathon rig, then Allow. The script prints the channel name, so confirm it's the right channel.

### 2. Read-aloud session (needs Alex's voice)

This one session proves most of what's left: real upload, YouTube's duration check, a real `?t=` link, Task 8's transcript check, webcam alignment on speech, and his voice through the whole chain.

From `rig\scripts`, with `$env:RIG_TEST = '1'` set:

1. Tell Alex what's coming, with the text to read below, and warn him the webcam comes on.
2. `..\.venv\Scripts\python.exe rig.py start`. The session will be S05, because S01 to S04 are already filed in test mode.
3. He reads the text aloud in his normal voice.
4. `..\.venv\Scripts\python.exe rig.py stop`
5. `..\.venv\Scripts\python.exe rig.py process`. **Don't set `RIG_SKIP_UPLOAD`.**
6. When it finishes, read `rig\run\test\process_report.md`.

Text for him to read:

> This is a read aloud test for the capture rig. A good recording keeps every word and every timestamp, so a later search can find the exact moment in the video. The marketing team wants a clear story, the sales team wants proof, and the chief executive wants the number that matters. If this transcript matches the script closely, the graphics card is doing the work and the pipeline can move on to the next task without any help from the operator.

Then check:

- The video is unlisted on his channel, its id is in the manifest, and a `find_clip` link opens at the right second.
- Track 2 peaks land between -20 and -10 dB, which confirms the calculated figures.
- Webcam files show `aligned: true` in the manifest.
- The transcript closely matches the text. **Score it with `autojunk=False`.**
- `find_clip --cut` on 5 sentences gives clips that hold each whole sentence.

This creates a real unlisted video, so tell him it's there and that he can delete it in YouTube Studio. The upload scopes can't delete it.

### 3. Preflight failure cases

Both of these need a one-line ask to Alex, or a safe way to simulate them:

- With the websocket off, it must fail clearly.
- With the Wave:3 unplugged, it must fail clearly.

### 4. Dress rehearsal (Task 12, Alex's decision)

The spec says 60 minutes of real work, with Comfy Cloud open in Chrome. With the hackathon tomorrow, offer him a shorter one. It still needs to cover:

- Typing all four commands in a real interactive Claude Code session started in `OBS\rig\`.
- Real screen activity, to measure the true bitrate and whether NVENC holds up. It ran around 65% and peaked at 94% on a still screen. If frames drop, lower the webcam to 720p first.
- Confirming the control session's log folder ends in `-OBS-rig`, so R17 leaves it out.
- Closing that Claude window mid-session, and confirming recording continues.

Update section 6's checks as listed in the notes. The marker, warning, end alert and on-time stop checks no longer apply.

### 5. Clean up before tomorrow

**Do this last, and confirm no session or worker is running first.**

- Delete `D:\OBS Outputs\_test`, `OBS\_test` and `OBS\rig\run\test`.
- Confirm the real areas are still empty, so the first real /start gives S01.
- Update `RUNBOOK.md`, and record the final state in `RIG_NOTES.md`.

## What Alex decided (DI-1)

- **Main monitor:** the leftmost, a Samsung S24F350 at 1920x1080 with the webcam on top. No 4K. The Windows primary is a different monitor.
- **Webcam:** a separate file. Local only, never uploaded.
- **Livestream:** no. Record only.
- **Sessions:** no set length. He ends them himself at about 1 to 1.5 hours. No auto-stop and no warnings. /pause stops the elapsed count. 12 hours is a rough figure, and he also said 12 to 16.
- **Hotkeys:** none. Sorting clips and messaging by stakeholder is assistant work.
- **Stakeholders:** RevOps, CSO, CMO, CEO, CTO, CAIO, COO.
- **Other answers:** main YouTube channel, /process only when typed, keep local video, 3-second padding.
- **ComfyUI:** runs on Comfy Cloud through Chrome, so this GPU carries no ComfyUI load.
- **Path of Exile:** removed at his request. The small settings folders remain.

## How the rig works

| File in `rig\scripts\` | Job |
| --- | --- |
| `rig.py` | The command behind all four skills. `--skill` always exits 0. |
| `controller.py` | Detached. Owns a session: pause, watchdog, `session.json`. |
| `recorders.py` | The two ffmpeg recorders: audio backup and webcam. |
| `process.py` | Detached /process worker. Steps are recorded, so reruns are safe. |
| `clock.py` | Maps video, wall-clock and hackathon time from spans and real file lengths. |
| `upload.py`, `youtube_setup.py` | YouTube upload, verification and one-time sign-in. |
| `find_clip.py` | Quote to link and clip. |
| `preflight.py` | Checks run before each session. |
| `obs_client.py`, `rig_state.py` | Shared OBS helpers, paths and session records. |
| `setup_obs.py` | Rebuilds the OBS profile. Safe to rerun, with OBS closed. |
| `load_test.py`, `audio_test.py`, `test_whisper.py` | Task 4, 5 and 2 tests. |

`rig\tests\` holds the crash drill and the session and skill trials. They run in test mode.

**Test mode:** `RIG_TEST=1` sends everything to `_test` folders. `RIG_SKIP_UPLOAD=1` skips the upload steps, and works only in test mode.

**Traps that have already cost time** (details in `RIG_NOTES.md`):

- OBS 33 has no `--disable-shutdown-check`. It shows a crash dialog if `run_*` files remain in `%APPDATA%\obs-studio\.sentinel`, and `obs_client.launch` clears them.
- ffmpeg can't open `Wave:3` by name because of the colon, so use `obs_client.mic_dshow()`.
- The BRIO needs `-pix_fmt nv12` for NVENC.
- PyAV must stay at 17.1.0 for faster-whisper 1.2.1.
- Disconnect the websocket before closing OBS, and wait past code 207 after launch.
- Anything the background processes spawn needs `CREATE_NO_WINDOW`, or a console flashes on camera.
- FLACs and crash-cut files store no length, so decode them to measure.
- Don't add a Whisper vocabulary hint. It invents text on silence.
