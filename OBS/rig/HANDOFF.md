# Capture rig handoff

## Handover: only the rehearsal is left

Everything else is built. Alex runs the rehearsal on the morning of 2 Nov, before the first real session, using section 2 of "What to do next". It also proves what's still untested: his voice through the whole chain, the first real upload, and typing the commands in a live session.

- **Before it:** Alex verifies his phone at https://www.youtube.com/verify. Long uploads still read `eligible`.
- **After it:** run the section 2 checks and the section 3 cleanup. Alex then opens a new terminal for the real S01.

## Background

Written on the evening of 1 Nov 2026 for a fresh Claude Code session. **The hackathon is 2 Nov 2026, and Alex runs the rehearsal that morning**, before the first real session. The rig has to be proven and clean by then. Allow about 45 minutes for the rehearsal, its upload and the cleanup (an estimate, because YouTube's processing time is unmeasured).

Read these too:

- `OBS\Pre Hackathon Spec.md`: the executable spec.
- `OBS\rig\RIG_NOTES.md`: every measurement and decision. Its "Spec changes from DI-1" section **overrides the spec**.
- `Operator tasks\DI-1 Capture rig decisions.md`: Alex's answers, in his words.

## How to work with Alex

- **No scope creep.** He rejected a livestream design as scope creep, even after writing "if possible" in DI-1. Build what's in the spec and the notes, and don't add features.
- **If you need him to talk, say so plainly,** with exact steps and when to start. He said this directly.
- **Any test that depends on sound needs his real voice, so ask for it.** Text-to-speech and silent sessions stood in for it through most of the build, and they don't count as a pass.
- **The Wave:3 is the mic on every recording.** He'll treat anything that looks like a substitute for it as a serious fault.
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
| 5. Audio | Passed. The Wave:3 feeds OBS, the backup and the webcam file. +6 dB mic boost saved in OBS. Expected peaks are calculated, not yet recorded. |
| 6. Controller and skills | Passed through `claude -p`. Typing them interactively is still unproven. |
| 7. Crash drill | Passed |
| 8. /process | Everything except upload is tested, but only on a quiet room. The read-aloud check is still to do. |
| 9. YouTube | Signed in to the channel Alex Alderman. **Alex must enable long uploads.** No real upload has run yet. |
| 10. find_clip | Passed on only 91 test words and a fake YouTube id. Repeat on real speech with a real `?t=` link. |
| 11. Preflight | Passed. Websocket off was tested for real, mic unplugged was simulated. |
| 12. Dress rehearsal | Not started. It now also carries the read-aloud. |
| 13. Runbook | Drafted in `rig\RUNBOOK.md`. Update it after Task 12. |

All of this work is committed, pushed and on `main`, which is checked out. There are no other branches, and all work goes straight on `main`. `.env`, `client_secret.json`, `.venv`, `models` and `run` are gitignored.

## The machine right now

- OBS is running in the tray, which is normal after /stop. No ffmpeg, controller or process worker is running.
- C: has about 100 GB free and D: about 1,244 GB free.
- The real areas are untouched, so tomorrow starts at S01: `D:\OBS Outputs\To process` is empty, and `OBS\Live`, `OBS\Processed`, `D:\OBS Outputs\Uploaded` and `OBS\hackathon_clock.json` don't exist yet.
- Test data sits in `D:\OBS Outputs\_test`, `OBS\_test` and `OBS\rig\run\test`.

## What to do next

### 1. Google setup (waiting on Alex)

**State on 1 Nov:** the sign-in is done. Tokens are in `rig\.env`, and uploads go to the channel Alex Alderman. **One step is left:** `status.longUploadsStatus` reads `eligible`, which means Alex must switch on long uploads at https://www.youtube.com/verify. Until it reads `allowed`, assume sessions over 15 minutes won't upload. Read it again after the rehearsal with `channels.list(part="status", mine=True)`.

`youtube_setup.py` always shows the account picker, and exits 1 if the account has no channel.

These steps are done, and are kept in case the sign-in has to be rebuilt. Use the Google account that owns the channel.

1. [Create a project](https://console.cloud.google.com/projectcreate) named `Hackathon rig`, then select it.
2. [Enable the YouTube Data API](https://console.cloud.google.com/apis/library/youtube.googleapis.com).
3. [Auth overview](https://console.cloud.google.com/auth/overview): Get started, app name `Hackathon rig`, his email, audience External.
4. [Audience](https://console.cloud.google.com/auth/audience): add that same Google account as a test user.
5. [Clients](https://console.cloud.google.com/auth/clients): create a Desktop app client and download the JSON.
6. Save it as exactly `client_secret.json` in `OBS\rig\`.

Then run `..\.venv\Scripts\python.exe youtube_setup.py` from `rig\scripts`. A browser opens. Warn him first that he'll see "Google hasn't verified this app", and that he should click Advanced, then Go to Hackathon rig, then Allow. The script prints the channel name, so confirm it's the right channel.

### 2. Rehearsal with read-aloud (Task 12, needs Alex)

One 15-minute session replaces the separate read-aloud and rehearsal, so he only has to do this once. The spec says 60 minutes, and he can ask for that instead. It will be S06, because S01 to S05 are already filed in test mode. Section 6 of the spec is already updated.

He runs this himself, in a new terminal:

```powershell
cd "C:\Users\alder\Desktop\Hire me hackaton\OBS\rig"
$env:RIG_TEST = '1'
claude
```

1. Open Comfy Cloud in Chrome, and keep work on the left monitor.
2. Type `/start`, and wait for "S06 is recording".
3. Read the text below aloud in his normal voice.
4. Work normally for about 15 minutes, talking and dictating as usual.
5. Type `/pause`, wait a few seconds, then type `/pause` again.
6. Close that Claude window, then open a new one with the same three lines.
7. Type `/stop`, then `/process`. A voice says when it's finished.

If Google isn't set up yet, /process stops before the upload and the voice says "finished with problems". Running `/process` again after the Google step picks up from there, so the rehearsal doesn't need repeating. The `find_clip` checks below have to wait for that, because a session is filed only after its upload.

Text for him to read:

> This is a read aloud test for the capture rig. A good recording keeps every word and every timestamp, so a later search can find the exact moment in the video. The marketing team wants a clear story, the sales team wants proof, and the chief executive wants the number that matters. If this transcript matches the script closely, the graphics card is doing the work and the pipeline can move on to the next task without any help from the operator.

Then check, from `rig\run\test\process_report.md`, the manifest and the media:

- The video is unlisted on his channel, its id is in the manifest, and a `find_clip` link opens at the right second.
- Track 2 peaks land between -20 and -10 dB on the read-aloud, which confirms the calculated figures.
- Track 2, the backup FLAC and the webcam audio all correlate, as in the S05 check in the notes.
- Webcam files show `aligned: true` in the manifest.
- The transcript closely matches the text. **Score it with `autojunk=False`.**
- `find_clip --cut` on 5 sentences gives clips that hold each whole sentence, and webcam clips that have audio.
- Real bitrate, from the session's files. Set `PLAN_GB_PER_HOUR` in `preflight.py` from it.
- Skipped frames, from the OBS log's lines at recording stop. NVENC ran around 65% and peaked at 94% on a still screen. If frames drop, lower the webcam to 720p first.
- The control session's log folder ends in `-OBS-rig`, so R17 leaves it out.
- Closing the window didn't stop the recording: no gap in the manifest around that moment.
- A second `/process` changes nothing.

Then ask Alex to open one webcam clip and say whether his mouth matches the sound. Lip sync is the one thing using the Wave:3 in that file could affect, and audio can't measure it. If it's off, measure the offset and fix it in the webcam file. Don't go back to the BRIO mic without asking him.

This creates a real unlisted video of his screen and room, so tell him it's there and that he can delete it in YouTube Studio. The upload scopes can't delete it.

### 3. Clean up before the first real session

**Do this last, and confirm no session or worker is running first.**

- Tell Alex to close the rehearsal terminal and open a new one. With `RIG_TEST` set, /start records into the `_test` folders, and after this cleanup it would even say S01. `/start` prints a `TEST MODE` line in that case.
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
- ffmpeg has to open the Wave:3 by device ID, because of the colon in its name. Always use `obs_client.mic_dshow()`.
- Webcam files run slightly longer than the matching video at both ends, so alignment matches on the file's middle (`ALIGN_TRIM`).
- The BRIO needs `-pix_fmt nv12` for NVENC.
- PyAV must stay at 17.1.0 for faster-whisper 1.2.1.
- Disconnect the websocket before closing OBS, and wait past code 207 after launch.
- Anything the background processes spawn needs `CREATE_NO_WINDOW`, or a console flashes on camera.
- FLACs and crash-cut files store no length, so decode them to measure.
- Don't add a Whisper vocabulary hint. It invents text on silence.
