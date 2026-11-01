# Rig notes

Running log for the capture rig. Measured facts and decisions go here as each spec task finishes. For current status and next steps, read `HANDOFF.md`.

## Task 1: machine inventory (1 Nov 2026)

### Monitors

| Windows name | Model | Resolution | Refresh | Position | Scale | Role |
| --- | --- | --- | --- | --- | --- | --- |
| DISPLAY1 | Samsung S24F350 | 1920x1080 | 60 Hz | (-1920,1814) | 125% | **Main, on camera.** Leftmost, webcam on top (Alex, 1 Nov 2026) |
| DISPLAY2 | AOC U2790B | 3840x2160 | 60 Hz | (0,0) | 250% | Windows primary, off camera |
| DISPLAY3 | Samsung LF24T35 | 1920x1080 | 60 Hz | (3419,2160) | 100% | Off camera |

The main monitor isn't the Windows primary, so OBS must target DISPLAY1 explicitly. Windows notifications appear on the primary, off camera. The R8 voice alert covers that.

### Compute

| Item | Value |
| --- | --- |
| GPU | NVIDIA GeForce RTX 3060, 12,288 MiB VRAM (the 12 GB card) |
| Driver | 610.88 |
| CPU | AMD Ryzen 5 3600, 6 cores, 12 threads |
| RAM | 31.9 GB usable, 4 x 8 GB at 2666 MHz |
| VRAM in use at idle | 2,297 MiB |
| RAM free when measured | 18.8 GB |
| Page file | `C:\pagefile.sys`, system managed, 5,632 MB allocated |
| Power plan | AMD Ryzen Balanced |

### Storage

| Drive | Disk | Type | Free | Size |
| --- | --- | --- | --- | --- |
| C: | WD WDS500G3X0C | NVMe SSD | 32.6 GB | 464.5 GB |
| D: "2TB Hardrive" | Seagate ST2000DM008 | SATA hard disk, 7200 rpm, SMR | 1,158.6 GB | 1,863 GB |

`D:\OBS Outputs` already exists.

### Audio and video devices

Exact ffmpeg dshow names:

| Name | Type | Use |
| --- | --- | --- |
| `Mic In (Elgato Wave:3)` | audio | **The Wave:3, direct. Use this one in OBS and the ffmpeg backup.** |
| `Wave Link MicrophoneFX (Elgato Wave:3)` | audio | Wave Link route, not used |
| `Wave Link Stream (Elgato Wave:3)` | audio | Wave Link route, not used |
| `Wave Link Monitor (Elgato Wave:3)` | audio | Wave Link route, not used |
| `Mikrofon (BRIO 4K Stream Edition)` | audio | Webcam mic, not used |
| `BRIO 4K Stream Edition` | video | Webcam, connected |
| `OBS Virtual Camera` | none | Left by the existing OBS install |

### Claude Code logs

- Location: `%USERPROFILE%\.claude\projects\<project-slug>\<session-id>.jsonl`
- Hackathon project slug: `C--Users-alder-Desktop-Hire-me-hackaton`
- The OBS control session, once run from `OBS\rig\`, should get its own slug ending in `-OBS-rig`. R17 excludes it. Confirm the slug when the first session runs there.
- 78 project folders exist, using about 4.7 GB in total.

### Software already present

| Tool | State |
| --- | --- |
| OBS Studio | 32.1.1 at `C:\Program Files\obs-studio`. **Needs upgrading to 33.x.** An existing profile `Untitled` is left alone. |
| ffmpeg | 9.0.2, installed for this user with winget during Task 1 |
| Python | 3.14.4 is the default. Task 2 checks whether faster-whisper's dependencies have 3.14 builds and uses a separate environment if not. |
| uv | Installed |
| Dictation | Wispr Flow, seen running |
| Wave Link | Devices are installed. Only `ElgatoLLMService` was running. |
| ComfyUI | `C:\Users\alder\Desktop\Comfy UI`, not running when measured |

### Network

- Ethernet, 1 Gbps link.
- Upload: 42 MB/s (about 336 Mbps), from one 100 MB burst to Cloudflare. YouTube ingest may be slower.

## Task 2: tools (1 Nov 2026)

| Tool | Version | Check |
| --- | --- | --- |
| ffmpeg, ffprobe | 9.0.2 | Prints version |
| Python | 3.12.14 in `OBS\rig\.venv` | Prints version. Chosen over the system 3.14 for wider package support. |
| faster-whisper | 1.2.1, CTranslate2 4.8.4 | Transcribed a 28.2 s clip on CUDA with float16 and the `small` model: 100% word match, 16.4x real time, about 670 MiB of VRAM |
| CUDA libraries | cuBLAS 12.9.2.10, cuDNN 9.27.0.42 | Installed from PyPI, not Purfview's bundle. `scripts\cuda_env.py` puts them on the DLL path. |
| obsws-python | 1.8.1 | Imports. Tested against OBS in Task 3. |
| BurntToast | 1.1.0 | Imports |
| Text to speech | System.Speech, voices David and Zira | Listed |
| OBS Studio | 33.0.0 | File version read from `obs64.exe` after the upgrade |

- **PyAV is pinned to 17.1.0.** PyAV 19.0.2 removed the `metadata_errors` argument that faster-whisper 1.2.1 passes, so transcription crashes on it. `requirements.txt` holds every pinned version. Don't upgrade `av` without rerunning `scripts\test_whisper.py`.
- **The OBS installer refuses to run while another app has its files open** (installer exit code 6). Any app that lists cameras loads `obs-virtualcam-module64.dll`. On 1 Nov 2026 that was Claude, Loom, Slack, Wispr Flow and Chrome's camera service. Those apps load it again as soon as they reopen, so any later OBS upgrade needs them all closed at once. The Windows Restart Manager lists every holder, including ones a normal process scan can't see.

## Task 3: OBS profile (1 Nov 2026)

`scripts\setup_obs.py` builds everything and is safe to rerun. OBS creates its own profile and scene collection over the websocket. Only `recordEncoder.json` is written directly, because the websocket can't set encoder options. The existing `Untitled` profile is untouched.

| Setting | Value |
| --- | --- |
| Profile and scene collection | `Hackathon`, one scene `Main`, one input `Main monitor` on the Samsung S24F350 |
| Video | 1920x1080 canvas and output, 30 fps. The spec sets no frame rate, so this is the lighter choice. |
| Output | Advanced, Hybrid MP4, tracks 1 to 3, split every 15 minutes |
| Encoder | `obs_nvenc_h264_tex`, CQP 21, preset p5, 2-second keyframes |
| Record path | `D:/OBS Outputs/To process`, changed per session by /start |
| Websocket | On, port 4455, password in `rig\.env` (gitignored) |

**Proof:** a 75-second test with the split set to 1 minute gave two files of 60.0 s and 14.8 s, H.264 at 1920x1080 and 30 fps, keyframes exactly 2 seconds apart, three audio tracks, and 0 of 2,250 frames skipped. The first file was 17.8 MB for 60 seconds, about 1 GB per hour, but that was a nearly still screen. Task 4 measures real work.

**OBS 33 facts for later tasks:**

- `--disable-shutdown-check` no longer exists in OBS 33. `--startrecording`, `--safe-mode`, `--only-bundled-plugins`, `--disable-updater` and `--disable-missing-files-check` do. **Task 7 must test what OBS does on relaunch after a crash**, because a recovery prompt would stall the watchdog with nobody there to answer it.
- OBS accepts websocket connections before it can answer requests, and replies with code 207 until it has loaded. `obs_client.wait_for_websocket` waits past this. The same code appears during a scene collection change.
- OBS must be launched from `bin\64bit`.
- Disconnect the websocket client before closing OBS. Otherwise OBS waits about 28 seconds on the open connection.
- OBS replies to profile and collection requests before applying them, so poll for the change.
- `--help` prints nothing to stdout on Windows. Flags were read from the `obs64.exe` strings.

## Task 4: recording load (1 Nov 2026)

**Decision:** record the main monitor in OBS, and the webcam in a separate ffmpeg process. No second monitor.

| Option | For | Against | Outcome |
| --- | --- | --- | --- |
| OBS screen plus ffmpeg webcam | No third-party code inside OBS. An OBS crash doesn't stop the webcam. Same tool as the audio backup. | A third process to watch. Webcam alignment needs an audio track in the file. | **Chosen and measured** |
| Source Record plugin | One process, one clock | Third-party plugin in OBS 33. An OBS crash takes both recordings. | Not tested |
| Second monitor | More footage | Alex's work is on the main monitor, and the webcam is already the one extra load | Dropped |

**Measured over 10 minutes, screen plus webcam:**

| Measure | Result |
| --- | --- |
| Render skipped | 0 of 18,021 (R3 limit: under 1%) |
| Encoder skipped | 0 of 18,017 |
| NVENC | Median 65%, 90th percentile 80%, peak 94% |
| GPU 3D | Mean 14%, peak 40% |
| VRAM | Peak 2,845 of 12,288 MiB |
| Whole-machine CPU | Mean 9%, peak 23% |
| OBS | 30 fps throughout, 0.3 ms render time, under 300 MB of memory |
| Webcam | 2.06 GB per hour, 10.0 minutes, no buffer warnings |
| Screen | 0.24 GB per hour |

**These numbers are a light case.** The main monitor was nearly still, and Comfy Cloud wasn't open. The 1-minute test in Task 3 ran at about 1 GB per hour, and real work will run higher. Treat 0.24 GB per hour as a floor, not a planning figure. Task 12 measures real work.

**NVENC is the tightest margin.** Two 1080p30 encodes hold it near 65%. A 2-minute rerun with the webcam on preset p2 gave a median of 67%, a peak of 85% and 2.72 GB per hour, so the webcam preset isn't what drives it, and the webcam stayed on p4. If Task 12 shows skipped frames, lower the webcam to 720p first (R27).

The webcam needs `-pix_fmt nv12`. The BRIO's MJPEG decodes to 4:2:2, which `h264_nvenc` refuses. `scripts\load_test.py` reruns this test.

## Task 5: audio (1 Nov 2026)

Set up and read back from OBS: `Wave3 mic` on `Mic In (Elgato Wave:3)` on tracks 1 and 2, and `Desktop audio` on the default output on tracks 1 and 3. Track 1 is the mix.

| Check | Result |
| --- | --- |
| Alex's speech, no boost | Peaks -18.7 and -20.6 dB, the quiet end of the -20 to -10 target |
| Mic boost | OBS gain filter `Mic boost` at +6 dB, saved and read back after a restart |
| Boost measured against the raw FLAC | +6.1 dB. With the filter off, track 2 is within 0.1 dB of the raw signal. |
| Expected peaks with the boost | About -12.6 and -14.5 dB. Calculated, not recorded. Task 12 confirms on real speech. |
| Desktop audio | Track 3 peaked at -35.7 dB on a spoken test phrase |
| Sharing the mic | OBS, the ffmpeg backup and Wispr Flow ran at once. Alex's dictation arrived intact, and track 2's transcript matched it. |
| Backup | 6 FLAC files, 52.0 s, all decode cleanly |

- The mic is at the quiet end with the Wave:3's knob where it is. If the knob moves, the +6 dB boost no longer applies, so leave it alone.
- Comparing track 2 with the raw FLAC at the same moment is the reliable way to measure gain. Room noise alone shifts by several dB between samples.
- `scripts\audio_test.py` reruns the talk test. It adjusts gain only if the first pass is out of range.

- **The Wave:3 is the mic on every recording. The colon only changes how ffmpeg addresses it.** ffmpeg's dshow input splits on colons and has no escape, so it can't take `Wave:3` as a name (retested 1 Nov 2026 with `\:`, `\\:` and quotes, all rejected). ffmpeg added alternative device names for exactly this case, so `obs_client.mic_dshow()` looks up the Wave:3's device ID each time, because the ID can change with the USB port. OBS takes the mic through WASAPI, and the colon never touched it.
- **The Wave:3 reports 44.1 kHz stereo** in dshow, despite being one mic.
- **FLAC segments carry no stored length.** ffmpeg's segment writer leaves it out, so `ffprobe` reports N/A. They decode normally. Measure them by decoding.

## Task 6: controller and skills (1 Nov 2026)

`scripts\rig.py` is the command behind each skill. `scripts\controller.py` runs detached and owns the session. `scripts\rig_state.py` holds paths and the session record. `scripts\recorders.py` runs the two ffmpeg recorders.

- **Spans:** session.json logs each unbroken stretch of recording. Pauses and crash gaps are the spaces between spans, and /process turns spans into the three-clock map.
- **Test mode:** `RIG_TEST=1` sends everything to `D:\OBS Outputs\_test` and `OBS\_test`, so trials can't take the real S01. **Delete both before hackathon day.**
- **Skills:** run with `shell: powershell`, a relative path so the rig's spaces don't matter, and `--skill`, which always exits 0, because a failing skill command is aborted and Alex would lose the message. The docs don't define `PowerShell(...)` in `allowed-tools`, but it worked with no prompt.
- **Proof:** all four skills ran through separate `claude -p` processes. Recording kept going with no Claude process attached. Interactive typing is confirmed in Task 12.
- **After /stop, OBS stays open in the tray**, so the next /start takes about 4 seconds.
- **The session's first 3 seconds have no webcam,** because the BRIO takes that long to deliver its first frame.

## Task 7: crash drill (1 Nov 2026)

| Killed | Back after | Gap logged |
| --- | --- | --- |
| `obs64.exe` | 7.3 s from detection, no dialog | 12.1 s |
| Backup ffmpeg | 5.0 s | 10.0 s |
| Webcam ffmpeg | 5.0 s | 10.0 s |

Every file written before a kill plays. A killed MKV or FLAC has no stored length and a cut-off tail, and a killed MP4 has a cut-off last audio frame. All of them decode, so measure lengths by decoding. Logged gaps are upper limits, because they start from the last good watchdog check.

**The first drill failed, and this matters:** after a kill, OBS 33 stops on a "Crash Detected" dialog and never finishes loading, so the watchdog stalled and recording stayed down. OBS leaves an empty `run_*` file in `%APPDATA%\obs-studio\.sentinel` and deletes it on a clean exit, and a leftover file triggers the dialog. `obs_client.launch` now clears those files first. Separately, an OBS that's running but won't answer within 15 seconds is killed and replaced, which covers any dialog nobody knows about yet.

Also fixed: a stuck OBS blocked recovery of the recorders, /stop failed on a dead connection, and background checks would have flashed a console window on camera every 10 seconds.

## Task 8: /process (1 Nov 2026, upload still to test)

`rig.py process` launches `scripts\process.py` detached and returns at once, so a long upload can't tie up the control session. A voice says when it's done, and the report is in `run\live\process_report.md`. This also covers "the upload carries on in the background": uploads drop to 10 MB/s while a session records.

**Model:** `large-v3-turbo`, float16, chosen on a 169-second clip of Windows text-to-speech written straight to a file. It never went through the mic, so these scores say nothing yet about Alex's voice. The rehearsal rechecks this.

| Model | Speed | Word match | VRAM added |
| --- | --- | --- | --- |
| `large-v3-turbo` | 29.0x | 96.8% | About 2,100 MiB |
| `large-v3` | 4.2x, under the 5x needed | 88.0% | About 3,900 MiB |

**Settings:** no vocabulary hint, `hallucination_silence_threshold=2.0` and `condition_on_previous_text=False`. The hint produced invented text on silence, repeating `CTO, CAIO, COO...`, which would pollute clip search. On 23 seconds of near-silence these settings leave 2 stray words, and known speech still matches at 99% of words. The cost is that jargon like CAIO may be spelled wrongly.

**Scoring warning:** `difflib` on text repeated six times gives wildly low scores (33%), because small drift makes it latch onto the wrong copy. Score each copy separately.

**Tested without YouTube on four sessions, including crashes and pauses:** join, mic track, transcript files, Claude Code logs, webcam alignment, move, manifest, `segments.jsonl`, both index files. `To process` and `Live` ended empty, and a second /process changed 0 files.

**Still unproven:**

- Upload and the YouTube duration check, which need the Google sign-in.
- Webcam alignment on real speech. It now works on a quiet room, because the webcam file carries the Wave:3 (see below).
- Transcript accuracy on Alex's own voice through the whole pipeline.

**Change from R28:** webcam files aren't joined. Each is kept as recorded, with its wall-clock start in the manifest, because a joined file would need its own map for pauses. `find_clip` cuts across files.

The mic picks up other voices in the room, and they end up in the unlisted video too.

## Task 9: YouTube (1 Nov 2026, waiting on Alex)

`scripts\upload.py` and `scripts\youtube_setup.py` are written. Tokens go in `rig\.env`. With the Google app in "testing" mode, the sign-in lasts about 7 days. That covers the hackathon, but later uploads need `youtube_setup.py` run again.

The first two sign-ins reached an account with no YouTube channel. `youtube_setup.py` used to exit 0 and print nothing in that case. It now reports it and exits 1, and it asks Google to show the account picker every time. The third sign-in reached the channel Alex Alderman.

`status.longUploadsStatus` read `eligible` on 1 Nov 2026. Google's docs say the owner must first enable long uploads at youtube.com/verify, and `allowed` is the value that means it's done.

## Task 10: find_clip (1 Nov 2026)

`scripts\find_clip.py` found 5 of 5 quotes within a second, each with a deliberately wrong word in it. Tested: padded points, a cut clip of 7.40 s for 7.38 s wanted, a webcam clip stitched across two files, the cross-session refusal, and the deleted-video fallback. Links were tested with a fake id, so the real `?t=` link still needs checking after Task 9. The test sessions held only 91 transcribed words, none of them Alex reading, so this pass is thin until the rehearsal repeats it on real speech.

## Task 11: preflight (1 Nov 2026)

`scripts\preflight.py` checks OBS, the Wave:3, the webcam, D: and C:, and reports VRAM.

| Case | How it was tested | Result |
| --- | --- | --- |
| Websocket off | `server_enabled` really off in OBS, then preflight and a real `rig.py start` | Blocked, with `BLOCKED: OBS isn't reachable over the websocket`. No session number used, no folders left. |
| Wave:3 unplugged | Simulated with a device name that doesn't exist, against a live OBS | Blocked, with `BLOCKED: the Wave:3 isn't connected` |
| Everything present | Live | Passes |

Reading the code before that test showed `/start` wouldn't reach preflight with the websocket off. `ensure_obs` raised, the controller died, the voice said "The rig controller has failed", and a session number was lost. `Controller.start` now catches that, so preflight reports it.

## Wave:3 on every recording (1 Nov 2026)

Alex's question: why would one video source use a different audio input? It shouldn't. The webcam file took the BRIO's mic only as a sync guide, a choice made for R28 before the colon came up. The file now records the Wave:3, and `find_clip` keeps that audio in webcam clips. It used to cut them with `-an`, so they were silent.

Measured on S05, 43 s with one pause, in a quiet room:

| Check | Result |
| --- | --- |
| OBS track 2 against the backup FLAC | 0.999 |
| Webcam audio against OBS track 2 | 0.905 |
| Webcam files aligned | 2 of 2, scores 0.897 and 0.874. With the BRIO mic: 0.59 at best, and most files failed. |
| Position spot checks, independent of the alignment step | 6 of 7 windows landed within 2 ms. The other was a 2-second window on near-silence (score 0.48). The 5, 8 and 10 s windows at that spot landed within 2 ms at 0.945 to 0.996. |

**The cost:** a Wave:3 failure now also stops the webcam until it's back. That's accepted, because losing the Wave:3 is already the worse failure. **Lip sync in the webcam file isn't measured.** Audio can't show it, so Alex checks one clip after the rehearsal.

**Alignment bug fixed.** A webcam file starts just before OBS resumes and ends just after OBS stops, so it's slightly longer than the matching video. That put the right match outside the search range, which is why files after a pause kept failing. Matching now skips `ALIGN_TRIM`, 3 seconds at each end of the file, and subtracts it back from the result. Files of 8 seconds or less stay at nearest-second alignment.

## What the tests actually heard (audit, 1 Nov 2026)

Alex was right that tests needed sound and didn't ask for it.

| Test | It needed | It used |
| --- | --- | --- |
| Task 2 Whisper check | Speech | Windows text-to-speech written to a file, never through the mic |
| Task 8 model choice | Speech | The same, repeated six times |
| Task 5 talk test | Alex's voice | **Alex's voice, about 45 s, asked for properly.** Peaks with the boost are still calculated, not recorded. |
| Task 5 desktop audio | A sound on track 3 | A text-to-speech phrase through the speakers |
| Tasks 6 to 8 trial sessions | Speech for the transcript and webcam alignment | Nothing asked for. S01 and S02 hold 0 words, S03 and S04 hold 91. |
| Task 10 `find_clip` | Sentences from a real transcript | Those same 91 words |

The rehearsal is the first real test of Alex's voice through the whole chain. Its read-aloud covers every row above except desktop audio.

## Task 13: runbook

`RUNBOOK.md` is drafted. Update it after Task 12.

## Risks found

- **C: was nearly full, now fixed.** It had 32.6 GB free and has 97.7 GB free after DI-1 Q1.1. A full system drive would take down OBS, ComfyUI and possibly Windows, and the page file grows on C: exactly when memory runs short, so preflight still gets a C: check beyond R13: warn under 20 GB free, block /start under 10 GB.
- **D: is an SMR hard disk, not an SSD.** A steady 1080p recording is a light load, but this is unmeasured. The join step in /process writes a second copy of a whole session to the same disk, so if the next session starts during a join, both compete for one drive head. Test this in Task 8 and delay the join if it causes dropped frames.

### What's using C: (scan on 1 Nov 2026)

| Folder | Size |
| --- | --- |
| `C:\Users\alder\AppData` | 122.0 GB (not broken down further) |
| `C:\Program Files (x86)\Grinding Gear Games` | 68.6 GB (removed, see the decisions log) |
| `C:\Users\alder\OneDrive` | 61.6 GB (some may be cloud-only placeholders) |
| `C:\Windows` | 49.4 GB |
| `C:\Users\alder\Desktop` | 44.4 GB |
| `C:\Program Files (x86)\Steam` | 23.4 GB |
| `C:\ProgramData\TechSmith` | 19.0 GB |

## Spec changes from DI-1 (1 Nov 2026)

Alex's answers change the spec. Where this section and the spec disagree, this section wins.

| Spec item | Change |
| --- | --- |
| R1 | Record DISPLAY1 only, at 1920x1080. |
| Task 4 | No second-monitor test. One 10-minute run measures the screen recording and webcam file together, which also covers screen-only. If R3 fails, lower the webcam resolution. |
| ComfyUI, all sections | Confirmed by Alex on 1 Nov 2026: ComfyUI runs on Comfy Cloud through Chrome, not on this GPU. Wherever the spec says "with ComfyUI running", read "with Comfy Cloud open in Chrome". ComfyUI filling VRAM and RAM is no longer a risk, so the spec's memory-pressure constraint and the ComfyUI items in Tasks 4, 11 and 12 fall away. R14 stays: no GPU transcription during a recording, because it would compete with NVENC. |
| R7, R8, R9 | Removed. No default length, 5-minute warning, end alert or automatic stop. Alex ends every session with /stop, and /start takes no minutes. Sessions run about 60 to 90 minutes, and nothing enforces that. |
| R10 | Stays. The next session waits for /start. |
| Session timer (Q11) | Stays only as an elapsed count in `session.json`. It stops during /pause, and nothing acts on it. |
| R11, Task 6 hotkeys | Removed, along with `markers.jsonl`, OBS chapters, and the markers in R18, R22, R23 and the folder layout. Alex won't press anything to tag a moment. |
| Task 6 done-check | Run /start, /pause twice and /stop. There's no timed stop to test. |
| Task 12, section 6 | Drop the marker, warning, end alert and on-time stop checks. Add checks for R27 to R29. |
| R13 | "Hours left" no longer means anything, because 12 hours is a rough figure and not a cutoff. Preflight checks D: for 16 hours of screen and webcam at the measured bitrate plus 20%. It also checks C:: warn under 20 GB free, block /start under 10 GB. |
| Stakeholders | RevOps, CSO, CMO, CEO, CTO, CAIO, COO. Finding and sorting clips and messaging by stakeholder is assistant work from the transcripts. The rig supplies `segments.jsonl` and `find-clip`. |

### New requirements

**Webcam (Q1.2, answer C)**

- **R27.** The BRIO records to its own file for each session, on D:, at 1080p30 unless Task 4 shows it needs less.
- **R28.** The webcam file shares the R20 timeline and gets its own watchdog check. /process records its offset in the manifest. The Wave:3 is recorded into that file, which aligns it exactly against the mic track.
- **R29.** Webcam video stays local and isn't uploaded. `find-clip --cut` also cuts the matching webcam clip.

## YouTube check (1 Nov 2026)

The `videos.insert` docs (updated 15 Oct 2026) say videos from unverified API projects "are not restricted to private viewing mode", and the quota is 100 calls per day at 1 unit each. The plan stands. Task 9's first test upload confirms it in practice.

## Decisions log

Open questions go through `Operator tasks\DI-1 Capture rig decisions.md`. Any left unanswered when a task needs them use the spec's default, logged here.

- **DI-1 Q1.1 (C: space):** Alex chose A on 1 Nov 2026 and widened it to all related tools. Removed Path of Exile, Awakened PoE Trade, Chaos Recipe Enhancer, Poe Lurker and the game's caches. C: went from 32.6 GB to 97.7 GB free. Kept: the Path of Exile 2 stub (0.6 GB with its cache), `OneDrive\Documents\My Games\Path of Exile` (settings, filters, sounds) and the tools' small settings folders.
- **Q1 (D: drive):** settled by inventory. Hard disk, 1,158.6 GB free.
- **Q4 (main monitor):** decided by Alex on 1 Nov 2026. The leftmost monitor (DISPLAY1), 1920x1080, with the webcam on top. "No need for 4k." This overrides the spec's default of the Windows primary. Estimated size is about 6 GB per hour, 72 GB for 12 hours, until Task 4 measures it.
- **Q7 (dictation tool):** Wispr Flow, seen running. Task 5 tests that it shares the mic.
- **Q8 (GPU and RAM):** settled by inventory. 12 GB card, 32 GB RAM.
- **Q3 (webcam, DI-1 Q1.2):** separate webcam file. See R27 to R29.
- **Q9 (channel, DI-1 Q1.3):** main channel.
- **Q6 (session length, DI-1 Q1.4):** no set length. Alex controls every session's end, at about 1 to 1.5 hours, and "none of the timing needs to be strict or perfect".
- **Q2 (streaming, DI-1 Q1.5):** record only. OBS records locally, as the spec says. Alex ruled out livestreaming on 1 Nov 2026 as scope creep.
- **Q11 (pause, DI-1 Q1.6):** /pause pauses the session timer. 12 hours is a rough estimate, not a hard cutoff.
- **Q12 (/process, DI-1 Q1.7):** only when typed.
- **Q10 (local video, DI-1 Q1.8):** keep.
- **Q5 (hotkeys, DI-1 Q1.9):** no hotkeys at all. Stakeholders are RevOps, CSO, CMO, CEO, CTO, CAIO and COO.
- **Q13 (padding, DI-1 Q1.10):** 3 seconds by default, changeable later.
