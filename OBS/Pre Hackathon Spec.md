# Hackathon Capture Rig: Executable Spec

## 1. Goal and context

Build a capture rig on this Windows PC that records all 12 hours of a solo GTM-engineering hackathon in timed sessions. It files each session's video, audio, transcript and markers, so on hackathon day Alex only has to start each session.

**The hackathon (context only, not built by this spec).** One person spends 12 hours showing every core GTM engineer skill, and the work is built into a website along the way. The site ends with a page for each stakeholder (RevOps, Sales, Marketing, CEO and others), each with its own supercut video and copy taken from the day's recordings.

**Why the capture matters.** The recordings are the raw material for everything after the build. Alex thinks out loud and dictates into Claude Code all day, so the audio carries the story. Transcripts drive the copywriting and timestamps drive the video edits, so the demos show the thinking, not just someone looking at a terminal.

**The core rule: every quote leads back to its video.** About 12 hours of raw video is captured, even the dull parts, and 30–60 minutes of clips are pulled from it based only on the transcripts. If a transcript shows a good 5-minute explanation for heads of sales at H+02:30, a later search must find it, name the session video it's in, and give the exact start and end with a few seconds of padding to trim. Every session video is uploaded to YouTube as unlisted, so each quote also has a link that opens at that second.

**Zero learning curve for Alex.** The hackathon takes Alex's full focus, and Alex has never used OBS or audio mixing software. Everything here runs in the background. Each choice is either very easy for Alex, or something Claude Code sets up and runs entirely by itself without Alex needing to know how it works. On the day, Alex runs everything by typing four commands into a separate OBS Claude Code session left open in the background: /start, /pause, /stop and /process.

**What this spec builds.** Everything that has to be running before hour 0: OBS installed and tuned, the session loop with its warnings, crash protection, and the post-session pipeline. The pipeline pulls transcripts, ties every line to its video time, uploads the session video, and files everything away.

**Instructions for Claude Code**

- Work through section 5 in order. Each task ends with a done-check, and the next task waits until it passes.
- Steps marked **\[Human\]** need Alex at the machine. Group them and ask for them together so Alex does as little as possible.
- Before relying on any OBS, plugin or library behavior, check it against the installed version with `--help`, the docs or a test run. Versions here were current on 1 Nov 2026.
- If an open question in section 7 blocks a task, use its stated default and log the choice in `rig\RIG_NOTES.md`.

## 2. Scope and non-goals

**In scope**

- OBS Studio installed and set up to record the main monitor and the Elgato Wave:3, tuned for an RTX 3060 while ComfyUI is running. Task 4 tests whether a second monitor is worth recording. Three monitors are ruled out.
- A separate OBS Claude Code session with four commands (/start, /pause, /stop, /process), so Alex runs the rig by typing instead of learning OBS.
- Crash protection: a crash-recoverable recording format, short auto-split files, a separate audio-only backup, and a watchdog that restarts recording if OBS dies.
- The session loop: 60–90 minute sessions, a 5-minute warning, and an automatic stop at the end. The next session starts only when Alex types /start.
- Live markers (optional): hotkeys that drop a timestamped highlight or stakeholder tag.
- The storage flow: raw video records to `D:\OBS Outputs\To process\`. /process sends each session video to YouTube and files the non-video remnants in `C:\Users\alder\Desktop\Hire me hackaton\OBS\Processed\`.
- The /process pipeline: join the split files into one session video, transcribe its mic track with word timestamps, collect that session's Claude Code logs, upload to YouTube, and file everything with a manifest and a running index.
- Traceability: one clock across video, transcript, markers and logs, so any line of transcript maps to an exact second of a session video.
- A quote-to-clip finder: give it a quote, get the session, a YouTube link at that second, and padded in and out points, plus a local clip on request.
- A preflight check and a full dress rehearsal before hackathon day.

**Out of scope (the hackathon itself)**

- The website, the stakeholder pages and the copywriting.
- Choosing which moments go in each supercut, and editing the supercuts. The rig only supplies searchable transcripts and exact, padded clips.
- Livestreaming. OBS records locally only (see section 7).
- The GTM work itself.

## 3. Environment and constraints

| Item | Value | Notes |
| --- | --- | --- |
| OS | Windows (x64) | Confirmed on the linked desktop. Use PowerShell for system tasks and Python for the scripts. |
| GPU | NVIDIA RTX 3060 | Record with NVENC. Whether it's the 8 GB or 12 GB card is unknown, and ComfyUI shares that memory. |
| System RAM | Unknown | Alex expects memory to be tight. Record it in Task 1. |
| Monitors | 3, but only the main one is recorded | Alex keeps on-camera work on the main monitor. The other two are off camera. Task 4 tests whether a second recorded monitor is worth it. |
| Microphone | Elgato Wave:3 (USB) | Capture it directly in OBS. No Wave Link or mixing software for Alex to learn. |
| Recorder | OBS Studio 33.0 (latest stable, released 23 Oct 2026) | Install with winget or the official installer. Alex never has to open it. |
| Control | A separate Claude Code session in `C:\Users\alder\Desktop\Hire me hackaton\OBS\rig\` | Project skills in `.claude\skills\<name>\SKILL.md` run as `/<name>`. Setting `disable-model-invocation: true` means only Alex can trigger them. |
| OBS link | obs-websocket, built into OBS (default port 4455) | Claude Code turns it on and keeps the password in `rig\.env`. |
| Storage | Video only: `D:\OBS Outputs\`. Everything else: `C:\Users\alder\Desktop\Hire me hackaton\OBS\` | D: holds only raw and uploaded video. Both paths contain spaces, so every script must quote them. |
| Transcription | faster-whisper on CUDA | Needs cuBLAS and cuDNN 9 for CUDA 12. For Windows, the project points to Purfview's whisper-standalone-win for those libraries. |
| Video hosting | YouTube, unlisted, via YouTube Data API v3 | Uploads have their own quota bucket of 100 per day, at 1 unit each (docs checked 1 Nov 2026). Videos over 15 minutes need a phone-verified account. |
| Also running all day | Claude Code with dictation, ComfyUI, design tools, browsers | These compete for GPU, RAM, disk and upload bandwidth. |

**Constraints**

- **Memory pressure is the main risk.** ComfyUI can fill both VRAM and RAM. A crash in OBS or Windows must lose no more than a few minutes. Transcription never runs on the GPU while a session is recording.
- **Crash-safe format.** Record to Hybrid MP4 (OBS 30.2 and later). The file stays recoverable if writing stops partway, and it opens as a normal MP4 once finished. Chapter markers inside the file are lost in a crash, so every marker also goes to a sidecar file.
- **Fallback format.** If Hybrid MP4 misbehaves in testing, record to MKV and remux it to MP4 after each session.
- **Keep Alex's time minimal.** Alex won't learn OBS, Wave Link or any audio software. Claude Code configures everything by script (OBS profile and scene files, the websocket, audio routing) and never asks Alex to open a settings screen. Alex's steps are limited to approving installs, one Google sign-in, turning a physical knob if asked, and the rehearsal. If an option needs Alex to understand or watch it, choose a simpler option.
- **Loom is not the backup.** A second screen recorder doubles the encoding load. The backup is a lightweight, separate audio recorder, because the audio is the part that can't be recreated.

**Folder layout.** D: holds only video files. Everything else lives on C: under `C:\Users\alder\Desktop\Hire me hackaton\OBS\` (this is referred to as `OBS\` below). Both paths contain spaces, so every script must quote them.

```
D:\OBS Outputs\                       # video only
  To process\
    S01_YYYY-MM-DD_HHMM\              # OBS split files (Hybrid MP4), then the joined S01.mp4
  Uploaded\                           # session videos confirmed on YouTube, kept until Alex says to delete them (Q10)
    S01.mp4

C:\Users\alder\Desktop\Hire me hackaton\OBS\
  rig\                                # the OBS Claude Code session's project folder
    .claude\skills\
      start\SKILL.md
      pause\SKILL.md
      stop\SKILL.md
      process\SKILL.md
    scripts\                          # controller, watchdog, process, upload, find_clip, preflight
    .env                              # OBS websocket password, YouTube OAuth token
    RIG_NOTES.md
    RUNBOOK.md
  Live\                               # non-video files for sessions not yet processed
    S01_YYYY-MM-DD_HHMM\
      audio-backup\                   # ffmpeg FLAC segments
      markers.jsonl
      session.json                    # start time, pauses, gaps, step status, written live
  Processed\                          # everything the content pipeline needs, no raw video
    S01_YYYY-MM-DD_HHMM\
      transcript\                     # .json (word level), .srt, .md
      audio\                          # mic track (compressed) + backup FLAC, for re-transcribing if needed
      claude-code\                    # Claude Code logs from this time window
      markers.jsonl
      manifest.json                   # three-clock times, pauses, gaps, YouTube id
    clips\                            # padded clips cut by find-clip
    segments.jsonl                    # every segment and marker, all sessions
    index.json                        # every session, its files and YouTube link
    index.md                          # readable version of index.json
```

## 4. Requirements

**Capture**

- **R1.** The main monitor is recorded at native resolution for the whole session, with on-screen text readable at 100%. The other monitors stay off camera unless Task 4 adds a second.
- **R2.** The Wave:3 mic records on its own audio track (track 2) and desktop audio on track 3. Track 1 carries the mix.
- **R3.** Recording uses NVENC. With ComfyUI generating, OBS stats show under 1% skipped or dropped frames over 10 minutes.
- **R4.** Video records as Hybrid MP4 and auto-splits every 15 minutes, so a crash loses at most the split being written.
- **R5.** A separate audio-only recorder (ffmpeg, not OBS) records the Wave:3 to FLAC in 5-minute segments throughout every session.

**Control and the session loop**

Alex controls the rig from a separate Claude Code session left open in the background, with its project folder at `C:\Users\alder\Desktop\Hire me hackaton\OBS\rig\`. It has four skills:

| Command | What it does |
| --- | --- |
| `/start [minutes]` | Runs preflight, creates the session's Live\\ folder on C: and its video folder in `To process\`, starts OBS recording, the backup audio and the session timer, then announces the start. |
| `/pause` | Pauses recording, backup audio and the timer. Typing `/pause` again resumes all three. |
| `/stop` | Ends the session early. Stops recording and backup audio cleanly and closes the session record. |
| `/process` | Processes every finished session in `To process\`: join, transcribe, upload, file into `Processed\`. Safe to run again, because it skips steps already done. |

- **R6.** Each skill only runs scripts, and is marked `disable-model-invocation: true` so it runs only when Alex types it. The timer, warnings, automatic stop and watchdog run in a separate background process launched by /start. Closing or crashing the Claude Code session never stops a recording.
- **R7.** Session length can be set between 60 and 90 minutes. The default is 75.
- **R8.** At 5 minutes before the end, Windows shows a notification and a voice says "Five minutes, start wrapping up." The voice is there so the alert gets through even when a full-screen app hides the notification.
- **R9.** At the end time, the controller stops the session itself, exactly as /stop would. A voice then says "Session over. Take a break, and run process when you're ready."
- **R10.** The next session never starts by itself. It waits for /start. Every pause is logged with its wall-clock start and end.

**Markers**

- **R11.** Hotkeys drop timestamped markers during a session: one general "highlight" plus one per stakeholder (RevOps, Sales, Marketing, CEO). Each marker is written to `markers.jsonl` at once and also added as an OBS chapter marker.

Markers are optional extras. Nothing depends on Alex remembering to press them, because the transcripts alone must be enough to find every clip.

**Resilience**

- **R12.** During a session, a watchdog checks OBS every 10 seconds. If OBS has closed or stopped recording without a /pause or /stop, it sounds an alert, relaunches OBS, resumes recording into the same session folder, and logs the gap. The backup recorder is watched the same way.
- **R13.** Preflight blocks /start if the OBS websocket can't be reached, the Wave:3 isn't detected, or free space on D: won't cover the hours left at the measured bitrate plus 20%.

**The /process pipeline**

- **R14.** The pipeline runs only when Alex types /process, and never asks questions partway through. It won't start GPU transcription while a session is recording. In that case it waits or uses the CPU, and says which. Any problems go into a short report at the end.
- **R15.** The transcript is made from the mic track of the session video itself, so transcript times and video times are identical with no drift to correct. The backup FLAC is used only for a stretch the video is missing. Those segments are marked as coming from the backup and carry no video link.
- **R16.** faster-whisper transcribes with word timestamps and voice-activity filtering. It writes `.json` (word level), `.srt` and `.md` with a timestamp on every paragraph.
- **R17.** Claude Code session logs with activity inside the session window, from the working sessions and not the OBS control session, are copied into `Processed\SNN\claude-code\`.
- **R18.** The pipeline writes `manifest.json` (session id, start and end in all three clocks, pauses, gaps, files with durations, transcript paths, YouTube id), and updates `segments.jsonl`, `index.json` and `index.md`.
- **R19.** Each step records when it finishes in `session.json`. A rerun of /process picks up from the first unfinished step and never repeats an upload.

**Timeline and traceability**

- **R20.** Every moment has three clocks: video time (seconds into the session video), wall-clock time (local, with UTC offset), and hackathon time (`H+hh:mm:ss` from the start of S01). Each session records its exact wall-clock start from the moment OBS reports recording started. Paused stretches advance wall-clock and hackathon time but not video time, and the conversion accounts for them.
- **R21.** /process joins the split files without re-encoding into one session video, `SNN.mp4`. Every pause and crash gap is logged with its video offset and wall-clock span, so converting between the three clocks stays exact.
- **R22.** Every transcript segment and marker from all sessions is in `Processed\segments.jsonl` with: segment id, session id, YouTube video id, local video path, start and end in all three clocks, the text, and word-level timings.
- **R23.** Each session video is uploaded to YouTube as unlisted, with a title like "Hackathon S03 · H+02:15–H+03:40" and markers as chapters in the description. A moment's link is `https://youtu.be/<id>?t=<seconds>`.
- **R24.** `find-clip` takes a quote (exact or close), a search phrase or segment ids. For each match it returns the session, the hackathon time, the YouTube link at the start second, and in and out points snapped to word boundaries with 3 seconds of padding on each side. With `--cut` it writes a frame-accurate clip to `Processed\clips\` from the local copy in `Uploaded\`. If that copy has been deleted, it says so and returns the YouTube link and times.
- **R25.** The clip's in point is no more than 1 second before the quote's first word (before padding), and its out point is after the last word. Clips spanning two sessions are refused with a clear message.
- **R26.** Raw video is kept whole, and nothing is trimmed for being dull. A session's video leaves `To process\` only after YouTube reports processing finished and the uploaded duration matches the local file within 1 second. It then moves to `Uploaded\`, and deleting it there is Alex's call (Q10). The session's live files on C: (markers, backup audio, session record) move from Live\\ into `Processed\`, leaving nothing behind in `To process\`.

## 5. Implementation plan

Work through these in order. Each task ends with a **Done when** check that must pass first.

### Task 1: Inventory the machine

- Record each monitor's resolution, refresh rate and position, the GPU model, VRAM and driver version, system RAM, and free space on each drive.
- List audio devices with `ffmpeg -list_devices true -f dshow -i dummy` and note the exact Wave:3 device name.
- Find where Claude Code stores its session logs on this machine (expected under `%USERPROFILE%\.claude\projects\`).
- **Done when:** `rig\RIG_NOTES.md` lists all of the above.

### Task 2: Install the tools

- Install OBS Studio 33.x, ffmpeg, Python 3.11 or later, faster-whisper with its CUDA 12 libraries, a Python obs-websocket v5 client, and a Windows notification and text-to-speech method (for example the BurntToast PowerShell module plus `System.Speech`).
- **\[Human\]** Approve installer and admin prompts.
- **Done when:** each tool prints its version, and faster-whisper transcribes a 30-second test clip on CUDA.

### Task 3: Set up the OBS profile by script

- With OBS closed, create the profile `Hackathon` and the scene collection `Hackathon` from config files, or set them over the websocket once OBS is running.
- Output mode: Advanced. Recording format: Hybrid MP4. Encoder: NVIDIA NVENC. Automatic file splitting: every 15 minutes. Keyframe interval: 2 seconds, so clips cut cleanly. Recording path: the active session's `video\` folder under `D:\OBS Outputs\To process\`, set by /start.
- Turn on the websocket server with a generated password saved to `rig\.env`.
- **Done when:** OBS opens on the `Hackathon` profile, and `GetRecordStatus` answers over the websocket.

### Task 4: Decide between one and two recorded monitors

The default is the main monitor only. Alex keeps the on-camera work there, and anything private goes on the other monitors. Three monitors are ruled out.

- Research and test whether also recording a second monitor is worth it. Compare main only, main plus a second monitor as its own file (for example with Exeldro's Source Record plugin), and both on one wide canvas.
- Weigh the encoder and GPU load with ComfyUI running, disk use, crash risk, extra sync work (a second file must share the same timeline as R20–R21), editing value, and the risk of something private showing up on camera.
- Run each candidate for 10 minutes while ComfyUI is generating, and log OBS stats (dropped frames, render lag, CPU, GPU) and file size per hour.
- Add a second monitor only if it meets R3 with clear headroom, needs no extra work from Alex, and fits the three-clock timeline without new steps. Otherwise record the main monitor only.
- **\[Human\]** Say which monitor is the main one, and start a typical ComfyUI workflow for the test runs.
- **Done when:** `RIG_NOTES.md` holds the decision, a short pros and cons table, and the measured stats and bitrate.

### Task 5: Set up audio

- In OBS, add the Wave:3 as an Audio Input Capture on track 2 only, desktop audio on track 3, and the mix on track 1. Turn on all three recording tracks.
- **\[Human\]** Talk normally for 30 seconds. Claude Code reads the levels and sets the OBS gain itself so peaks land between −20 and −10 dB. If that isn't enough, it tells Alex which way to turn the mic's own knob, and nothing more.
- Build the backup recorder: ffmpeg with dshow capture of the Wave:3, FLAC, `-f segment -segment_time 300`, with filenames stamped by time.
- Confirm the Wave:3 can feed OBS, ffmpeg and Claude Code dictation at once.
- **Done when:** a test recording has the mic alone on track 2 at the target level, and the backup FLAC segments play.

### Task 6: Build the controller and the four skills

- Set up `C:\Users\alder\Desktop\Hire me hackaton\OBS\rig\` as the OBS Claude Code project. Create the skills `start`, `pause`, `stop` and `process` in `.claude\skills\`. Check the current Claude Code skills docs first.
- Each skill: `disable-model-invocation: true`, `shell: powershell`, and `allowed-tools` pre-approving only its own script, so typing the command runs it with no permission prompts.
- `scripts\controller.py`: started detached by /start (for example `pythonw` through `Start-Process`), so it outlives the Claude Code session. It holds the timer, the warning and end alerts (R8, R9), the automatic stop, and the watchdog (R12), and writes `session.json` as it goes. /pause and /stop reach it through a local socket or a flag file.
- For the watchdog, check the installed OBS for launch flags such as `--startrecording` and `--disable-shutdown-check` before relying on them.
- Optional global marker hotkeys (R11), for example Ctrl+Alt+F1 to F5. Check they don't clash with ComfyUI or the design tools.
- **Done when:** a test session shortened to 3 minutes (warning at 1 minute), driven only by typing /start and /pause twice and then left to stop on its own, meets R6 to R12. A second test ended early with /stop also passes. Closing the Claude Code window mid-session doesn't stop the recording.

### Task 7: Crash drill

- During a test session, kill `obs64.exe`. Then kill the ffmpeg recorder.
- **Done when:** the watchdog brings each one back within 30 seconds, the gap shows in the manifest, and every file written before the kill plays.

### Task 8: Build /process (`scripts\process.py`)

- Meet R14 to R22 and R26. For each finished session in `To process\`: join the splits into the session video, pull its mic track, transcribe, copy the Claude Code logs, upload (Task 9), verify the upload, move the video to `Uploaded\`, move the remnants to `Processed\`, and write the manifest, segments and index.
- Pick the faster-whisper model and precision from a benchmark on this GPU. Prefer the most accurate model that finishes a 75-minute session inside a 15-minute break. Use int8 if VRAM is tight.
- **Done when:** after /process on the Task 6 test sessions, their `To process\` folders are empty, `Uploaded\` holds the videos, `Processed\` holds every file in the layout, and the transcript closely matches a read-aloud test script. Running /process a second time changes nothing.

### Task 9: Set up the YouTube upload (`scripts\upload.py`)

- **\[Human\]** One-time setup with Claude Code guiding each click: create a Google Cloud project, turn on YouTube Data API v3, create a desktop OAuth client, and sign in once with the channel's Google account. Check that the account is phone-verified, since videos over 15 minutes need it.
- Build a resumable upload of `SNN.mp4` as unlisted, meeting R23, called by /process. After uploading, wait until YouTube reports processing finished, then compare its duration with the local file before /process moves the video (R26). If the next session starts first, the upload carries on in the background at a limited bandwidth.
- Re-check the upload quota in the current API docs before relying on it. On 1 Nov 2026 it was 100 uploads per day, enough for about 10 sessions.
- **Done when:** the test session is on YouTube as unlisted, its id is in the manifest, and a `?t=` link opens at the right moment.

### Task 10: Build the quote-to-clip finder (`scripts\find_clip.py`)

- Meet R24 and R25 using `Processed\segments.jsonl`. Close matching must survive small transcription differences (fuzzy match on words).
- Output a short table per match (session, hackathon time, YouTube link, padded in and out points, the matched text) and a JSON version for later tools.
- With `--cut`, re-encode just the clip with ffmpeg from the copy in `Uploaded\`, so it's frame-accurate, named `Processed\clips\SNN_H+hhmmss_<slug>.mp4`.
- **Done when:** for 5 random sentences from the test session transcript, `find-clip` returns the right YouTube second, and each cut clip contains the whole sentence with the padding.

### Task 11: Build preflight (`scripts\preflight.py`)

- Meet R13, and also report RAM and VRAM in use, so Alex can close ComfyUI jobs before starting if needed.
- **Done when:** it fails clearly with the websocket off or the mic unplugged, and passes when everything is ready.

### Task 12: Dress rehearsal

- **\[Human\]** Run one full 60-minute session of realistic work, with ComfyUI running and dictation into Claude Code. Drop at least one marker of each kind.
- **Done when:** every check in section 6 passes.

### Task 13: Write the runbook (`rig\RUNBOOK.md`)

- One page for hackathon day: open the OBS Claude Code session, the four commands and when to type them, what each alert means, what /process reports, and what to do if the watchdog sounds.

## 6. Acceptance criteria

The rig is ready for hackathon day when the dress rehearsal (Task 12) passes every check below.

- [ ] Alex runs every session by typing /start, /pause, /stop and /process in the OBS Claude Code session, and never opens OBS or any audio app.
- [ ] Closing that Claude Code window mid-session doesn't stop the recording.
- [ ] The 5-minute warning and the end alert both fire and can be heard over other audio.
- [ ] Recording stops on time, and the next session waits for /start.
- [ ] /pause pauses and resumes recording, backup audio and the timer together, and the pause shows in the manifest.
- [ ] Every video split plays, and text on the main monitor is readable at 100%.
- [ ] The mic is clean and alone on track 2. The backup FLAC covers the whole session with no gaps.
- [ ] OBS stats show under 1% dropped or skipped frames with ComfyUI running.
- [ ] The crash drill passed: OBS and ffmpeg were each killed and recovered within 30 seconds, with the gap logged.
- [ ] After /process, the session's `To process\` folder is empty. The video is on YouTube as unlisted with a matching duration, the local copy is in `Uploaded\`, and `Processed\` holds the transcript, audio, Claude Code logs, markers and manifest, plus updated `segments.jsonl`, `index.json` and `index.md`.
- [ ] Running /process a second time changes nothing.
- [ ] For 5 random quotes from the rehearsal, `find-clip` gives a YouTube link that opens within 1 second of the quote, and a padded local clip that holds the whole quote.
- [ ] A marker's time lands on the matching moment in the video and the transcript, within 2 seconds.
- [ ] Preflight shows enough free space on D: for 12 hours at the measured bitrate.
- [ ] `rig\RUNBOOK.md` exists, fits on one page, and Alex has read it.

## 7. Open questions

Each question has a default that Claude Code uses if it isn't answered before the task that needs it.

| # | Question | Default | Blocks |
| --- | --- | --- | --- |
| Q1 | Is D: an SSD, and how much free space does it have? | Use `D:\OBS Outputs\` as given. Preflight warns if space is short | Task 1 |
| Q2 | Record only, or also livestream? (The brain dump said "streaming.") | Record only | Task 3 |
| Q3 | Add a webcam or face cam? It would make the supercuts much less screen-only, at some extra GPU load. | No camera | Task 4 |
| Q4 | Which monitor is the main, on-camera one? | The Windows primary display | Task 4 |
| Q5 | Which stakeholders get a marker hotkey besides RevOps, Sales, Marketing and CEO? | Those four plus "highlight" | Task 6 |
| Q6 | Default session length within 60 to 90 minutes? | 75 minutes | Task 6 |
| Q7 | Which tool does Alex use to dictate into Claude Code? It has to share the Wave:3 with OBS and ffmpeg. | Find it during Task 5 | Task 5 |
| Q8 | Is the RTX 3060 the 8 GB or 12 GB card, and how much system RAM is there? | Read it in Task 1 | Task 8 |
| Q9 | Which YouTube channel do the unlisted videos go to? | Alex's main channel | Task 9 |
| Q10 | After a confirmed upload, delete the local session video or keep it in `Uploaded\`? Keeping it lets `find-clip` cut frame-accurate local clips. Deleting frees the disk space. | Keep until Alex says to delete | Task 8 |
| Q11 | Should /pause also pause the session timer, or should the session still end at its planned time? | Pause the timer too | Task 6 |
| Q12 | Should /process run by itself at the end of each session, or only when Alex types it? | Only when Alex types it | Task 8 |
| Q13 | Clip padding: 3 seconds each side, or more? | 3 seconds | Task 10 |

## Sources

- [OBS Knowledge Base: Hybrid MP4 format](https://obsproject.com/kb/hybrid-mp4)
- [OBS Studio releases (33.0)](https://github.com/obsproject/obs-studio/releases)
- [OBS automatic file splitting (shipped in OBS 28)](https://github.com/obsproject/obs-studio/discussions/5078)
- [obs-websocket record requests (StartRecord, StopRecord, SplitRecordFile, CreateRecordChapter)](https://pub.dev/documentation/obs_websocket/5.7.0+3/request/Record-class.html)
- [Elgato: Wave Link and OBS multi-track recording](https://help.elgato.com/hc/en-us/articles/360044696952-Wave-Link-2-OBS-Studio-Multi-Track-Recording)
- [faster-whisper (VRAM benchmarks, Windows CUDA libraries)](https://github.com/SYSTRAN/faster-whisper)
- [YouTube Data API: videos.insert (upload quota, unlisted uploads)](https://developers.google.com/youtube/v3/docs/videos/insert)
- [YouTube Data API overview (quota allocation)](https://developers.google.com/youtube/v3/getting-started)
- [YouTube Help: upload videos longer than 15 minutes](https://support.google.com/youtube/answer/71673?hl=en)
- [Claude Code docs: skills (location, slash commands, frontmatter)](https://code.claude.com/docs/en/skills)
