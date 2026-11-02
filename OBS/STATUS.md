# OBS: status
As of 20:04, 2 Nov (Prague), written from the folder's own records after the 19:4x crash.

## Where it fits in the plan

- The rig isn't a charter deliverable. It records the footage that D3 (the GetSales demos), D9 (the legibility analyzer and the day-one story) and D10 (the Canva design video) are built from.
- **DoD items its recordings serve:** DoD-13 (two GetSales entries, clipped from rig recordings), DoD-20 (every processed rig session reviewed and posted), DoD-21 (the Canva recording on the site) and DoD-24 (the day-one story with clips). It also feeds DoD-19 through D9's build requests. DoD-22 applies to every video that leaves the rig.
- **It depends on:** the left monitor (DISPLAY1, the only one recorded), the Wave:3 mic, the BRIO webcam, OBS 33 on the `Hackathon` profile, the D: drive, the GPU (NVENC encoding and Whisper transcription), and the YouTube sign-in in `rig\.env`.
- **What depends on it:**
  - `s-d9-legibility`: transcripts, `segments.jsonl`, `find_clip` and clips.
  - `website`: its clock reads the session records every 5 seconds, and it uploads each filed session's webcam through the rig's uploader.
  - `s-d3-getsales` and `s-d10-canva-video`: their demo clips.
  - `orch-alex-prep`: preps Alex for each recording.
- **Charter risk:** the biggest risk is something sensitive in a recording that gets published. Assume anything on the left monitor can be published. Keep the Apify proposal and Alex's own GetSales outbound off it.

## What it was trying to do

The rig records the hackathon day in numbered sessions, so that every quote leads back to a moment in a video. Alex runs it by typing four commands in the `rig` session: /start, /pause, /stop and /process. Each session records the left monitor, a separate webcam file and a backup of the mic. /process transcribes the session on the GPU, aligns the webcam, copies the project's Claude Code logs and files it all in `Processed\`. The legibility analyzer and the website take their quotes, clips and videos from there. The rig's own YouTube upload of the screen recording was switched off on 2 Nov, and the site shows the webcam instead.

## What's been made

**Recordings.** Screen videos are in `D:\OBS Outputs\Uploaded\Sxx.mp4`, and webcam files in `D:\OBS Outputs\Uploaded\Sxx_webcam\`. No screen recording is on YouTube. "Webcam on YouTube" means the whole session's webcam video, unlisted.

| Item | Where | State |
| --- | --- | --- |
| S01 | `Processed\S01_2026-11-02_1025` | 10:25, 9:01. Filed. Webcam on YouTube: `mbF291oW_yQ` |
| S02 | `Processed\S02_2026-11-02_1106` | 11:06, 13:49. Filed. Webcam on YouTube: `qrBNOsSYGrQ` |
| S03 | `Processed\S03_2026-11-02_1125` | 11:25, 38:43, one pause. Filed. Webcam on YouTube: `M38hI3M3Heo` |
| S04 | `Processed\S04_2026-11-02_1215` | 12:15, 22:45. Filed. Webcam on YouTube: `VaFD-Hm_Phs` |
| S05 | `Processed\S05_2026-11-02_1240` | 12:40, 49:19. Filed. Webcam on YouTube: `EoLyMiV77R0` |
| S06 | `Processed\S06_2026-11-02_1333` | 13:33, 2:07. Filed. Webcam on YouTube: `mxorwucznvE` |
| S07 | `Processed\S07_2026-11-02_1336` | 13:36, 38:20. Filed. Webcam on YouTube: `NULD_WteCRM` |
| S08 | `Processed\S08_2026-11-02_1507` | 15:07, 8:03. Filed. Webcam on YouTube: `MyYnFOQCagc` |
| S09 | `Processed\S09_2026-11-02_1517` | 15:17, 26:00. Filed. Webcam on YouTube: `cNI9EgxHUbk` |
| S10 | `Processed\S10_2026-11-02_1624` | 16:24, 36:20. Filed. Webcam on YouTube: `NyD-epukcWs` |
| S11 | `Processed\S11_2026-11-02_1707` | 17:07, 4:23. Filed. Webcam on YouTube: `iXr-pKhseB8` |
| S12 | `Processed\S12_2026-11-02_1734` | 17:34, 45:46. Filed. Webcam on YouTube: `lo486cSVBcM` |
| S13 | `Processed\S13_2026-11-02_1825` | 18:25, 27:30. Filed at 18:54. Webcam on YouTube: none |
| S14 | `Processed\S14_2026-11-02_1901` | 19:01, 7:55. Filed at 19:11. Webcam on YouTube: none. Its webcam file lost its last ~36 s under full load |
| S15 | `Live\S15_2026-11-02_1956` | 19:56, still recording (healthy at 20:03, no gaps). Not processed. The post-crash planning session |
| Totals, S01 to S14 | `Processed\`, D: | About 5 h 30 min recorded. No crash gaps, and 30 of 30 webcam files aligned. `Processed\` holds 499 files (about 2.2 GB). D: holds about 3.9 GB of screen video and 11 GB of webcam |
| Session index | `Processed\index.json`, `index.md`, `segments.jsonl` | S01 to S14 listed. Every `youtube_id` is null, because those fields are for the screen recording |
| Hackathon clock | `hackathon_clock.json` | Start 10:25:15 (S01's start) |

**Skills, scripts and settings**

| Item | Where | State |
| --- | --- | --- |
| /start, /pause, /stop, /process | `OBS\.claude\skills\` | In use all day. /start, /pause and /stop also message `website`, so its clock follows the recording |
| `rig.py`, `controller.py`, `recorders.py` | `rig\scripts\` | Working. The controller runs detached, and its watchdog restarts OBS or a recorder that dies |
| `process.py` | `rig\scripts\` | Working: 14 sessions filed. `UPLOAD_TO_YOUTUBE = False`. It waits to transcribe while a session records (R14) |
| `clock.py`, `find_clip.py`, `preflight.py`, `obs_client.py`, `rig_state.py` | `rig\scripts\` | Working. Preflight passed for every session |
| `upload.py`, `youtube_setup.py` | `rig\scripts\` | Built. The rig's own upload is off. `website`'s scripts use them for the webcam and clip uploads |
| `setup_obs.py`, `load_test.py`, `audio_test.py`, `test_whisper.py` | `rig\scripts\` | Setup and test tools from 1 Nov |
| OBS profile `Hackathon` | OBS | Left monitor only, 1920x1080 at 30 fps, NVENC CQP 21 preset p5, split every 15 min. Webcam: 1080p30, NVENC p4, 15-min files |
| `RUNBOOK.md`, `HANDOFF.md`, `RIG_NOTES.md` | `rig\` | RUNBOOK is current. HANDOFF is stale (see risks). RIG_NOTES was updated at 20:02 (9af510f) |
| `.env`, `client_secret.json` | `rig\` | Credential, not read |

**Uploads**

| Item | Where | State |
| --- | --- | --- |
| 12 whole webcam videos, S01 to S12 | YouTube, unlisted; ids in `website\content\videos.json` | Done by `website` with `website\scripts\upload_webcam.py`. The last batch landed at 18:57 (27716be). S13 and S14: not uploaded |
| 15 clips | YouTube, unlisted; ids in `website\content\clips.json` | Four day-one clips (35d777c, 18:15), then 11 of the 13-clip batch. Two are missing (see risks) |
| Screen recordings | none | None uploaded. The rig's upload has been off since 10:43 (8173a7e) |
| Test-mode S06 rehearsal | YouTube, unlisted | Uploaded on 2 Nov, before test mode was removed at 11:01 (RIG_NOTES). The records don't say if it was deleted |
| "TEST control 14m30s" | YouTube, private | Not in the rig's records. The rig's sign-in can't delete it, so Alex does that himself (`orchestration\HANDOFF.md`) |

## How far along

**About 70%.** The rig is built and proven over 14 clean sessions. But the four recordings the deliverables need most are still to make: GetSales demos 1 and 2, the Canva design video and the clip-grading capture. S15 is also still open.

**"Done" here means:** every scene the plan needs from the rig is recorded and filed, the last session is stopped and processed, and every filed session's webcam is online for the site.

## What's left for Alex

**Running the rig, simplest form.** Type these in the rig's Claude Code chat (the session in `OBS\`). Keep your work on the left monitor: it's the only one recorded, with the webcam on top.

- `/start`: wait for "Sxx is recording".
- `/pause`: pauses everything. Type it again to resume.
- `/stop`: ends the session. Nothing stops by itself.
- `/process`: in a break, after /stop. It transcribes and files in the background, in about 2 minutes for S13 or S14. Running it twice is safe.
- **If the rig chat is gone:** open a terminal, `cd "C:\Users\alder\Desktop\Hire me hackaton\OBS"`, run `claude`, then type the command. Closing that window doesn't stop a recording.

**To do, most valuable first**

1. **GetSales demo 1** (recording). About 3 min on camera, plus about 5 min of setup off camera. First `/stop` S15, so the setup isn't recorded. Then open the four tabs on the left monitor, `/start`, talk through the beats and `/stop`. The card is `alex-prep\scenes\getsales-demos.md`. It feeds DoD-13.
2. **GetSales demo 2** (recording). About 1 min, in a fresh terminal: `/start`, run the two commands, `/stop`. Same card. It feeds DoD-13.
3. **Canva design video** (recording). About 20 min: 5 min of setup while paused, then 10 to 12 min on camera. The brief is `canva-video\SCENE.md`. It feeds DoD-21. This puts Canva in Chrome and OBS on the machine at the same time, so read the load notes under risks first.
4. **Clip-grading capture** (recording). About 35 to 45 min at 2x: grading the 124 clip moments, recorded on the rig as demo footage. First approve the Notion sign-in (quick, about 1 min). The grading page was committed at 19:50 (510d3df), and `orch-alex-prep` brings it to you. At 19:01 the tracker still marked it "not ready yet".
5. **/process after each /stop** (quick, a few seconds to type). S15 and every demo session need it before anyone can clip them.
6. **Webcam at 720p: yes or no** (quick, 10 seconds). The records name 720p, or decoding the webcam on the GPU, as the next step if the webcam falls behind again. An assistant would make the change between sessions.
7. **Delete "TEST control 14m30s"** in YouTube Studio (quick, about 1 min). While you're there, check whether the test-mode S06 rehearsal video is still up.

## What's left for an assistant

1. **Upload the S13 and S14 webcams** (owner `website`), and each newly filed session's after that: `..\OBS\rig\.venv\Scripts\python.exe scripts\upload_webcam.py Sxx <scratch dir>`, run from `website\`. It writes the id to `website\content\videos.json`. It repackages without re-encoding, so the load is light.
2. **Finish the 13-clip batch** (owner `website`). Upload `day1-2-too-much-at-once-v2.mp4` and `c-s08-same-thing-tomorrow.mp4` with `scripts\upload_clip.py`, send all 13 ids in order to `s-d9-legibility`, and commit `content\clips.json`. The titles are in `website\HANDOFF.md`.
3. **Renumber the GetSales scene card** (owner `orch-alex-prep`). It still says S14 is running and that the demos will be S15 and S16. S15 is now the post-crash planning session.
4. **Bring `rig\HANDOFF.md` and `rig\RUNBOOK.md` up to date** (owner `rig`): the rehearsal is done, the real folders hold S01 to S15, long uploads have read `allowed` since 18:35, and webcam videos go up through `website`.
5. **Record the day's real bitrate** in `RIG_NOTES.md`, and set `PLAN_GB_PER_HOUR` in `preflight.py` from it, as HANDOFF section 2 asks (owner `rig`). The files on D: give about 0.7 GB an hour for the screen and 2.0 GB an hour for the webcam, against the 8 GB an hour planned for both.
6. **If Alex says yes to 720p,** change the webcam's `-video_size` in `rig\scripts\recorders.py` between sessions, and log it in RIG_NOTES (owner `rig`).
7. **Bring `legibility\clip-index.md` up to date** (owner `s-d9-legibility`). It has no S12 to S14 sections. Its S07, S09 and S10 headers still say "not on YouTube", though their webcams have been up since 18:57. For DoD-20, `legibility\posted.md` covers S01 to S11 only, so S12 to S14 still need to be covered.

## Open questions and risks

**S13 is intact, and it wasn't recording at the crash.**
- It ended with /stop at 18:52:46 and was filed at 18:54.
- Its screen file is 316.7 MB for 27:30, about 0.69 GB an hour. That's in line with S12 and S10.
- Both webcam files aligned (scores 0.943 and 0.996), and all six backup audio files exist.
- The record shows no gaps or pauses.

This is judged from sizes and the index only. The video wasn't opened.

**By the rig's records, nothing was recording at 19:4x.** S14 stopped at 19:09:38 and was filed at 19:11:47, and S15 started at 19:56:38. OBS stays open in the tray after /stop, so it was probably running idle, but the records don't say. That doesn't fit an account of the OBS recording adding to the 19:4x load. Unclear.

**The overload began before 19:09.**
- RIG_NOTES (9af510f, 20:02): CPU and GPU ran at 90 to 98% for much of S14.
- OBS held up: 11 of 14,273 frames lagged (0.1%).
- The S14 webcam file lost its last ~36 s. The recorder fell behind, and the backlog in its buffer was thrown away at /stop.
- S14 transcribed at 7x real time, against 16x to 50x for S01 to S13.

**GPU and CPU load: what the records say**

- Only the left monitor is recorded, at 1080p and 30 fps. That was the lighter choice.
- NVENC has the least headroom. Screen plus webcam held it at a median of 65% and a peak of 94% on a nearly still screen (1 Nov). A faster webcam preset didn't help.
- The webcam recorder is the rig's heaviest process, at about half a CPU core, because it decodes MJPEG and converts colour on the CPU. The next steps, made between sessions, are GPU decode for the webcam or 720p (R27). If full load outlasts its buffer, the webcam starts dropping frames mid-session.
- /process never transcribes on the GPU while a session records (R14): it waits for /stop. Transcription adds about 2.1 GB of VRAM.
- Uploads drop to 10 MB/s while a session records.
- OBS stays in the tray after /stop. `controller.py` relaunches OBS at /start if it isn't running, so quitting it from the tray for OBS-off graphical work should be fine. That path isn't in the rig's test notes.
- Elsewhere, legibility's clip cutters encode on the CPU with libx264 (`legibility\tools\cut_grading.py`, `cut_clip.py`), and grading clips were being cut from about 19:00. Whether that added to the crash is unclear.
- Suggestion, not from the records: before the Canva video, close every session that drives Canva through its MCP, and don't cut clips while recording.

**Half-done at the crash**

- The 13-clip upload batch: 11 of 13 ids are in `clips.json`. `day1-2-too-much-at-once-v2` and `c-s08-same-thing-tomorrow` are missing.
- The S13 and S14 webcams aren't on YouTube.
- At 19:00, `s-d9-legibility` had a subagent reading S13 (`legibility\checks.md`). Its handoff covers S01 to S11 and lists S12 as not yet covered. S13 and S14 aren't in the clip index.
- S15 is recording now. Stop it before the GetSales setup, or the setup lands in it.

**Where the records contradict each other**

- `rig\HANDOFF.md` still says only the rehearsal is left, that Task 12 is "not started" and that the real folders are empty. In fact 14 sessions are filed.
- The spec says every session video goes to YouTube unlisted. RIG_NOTES turned that off on 2 Nov (`UPLOAD_TO_YOUTUBE = False`), and `index.json` has no YouTube id for any session.
- The spec's R29 keeps webcam video local. By Alex's call (`website\CLAUDE.md`), the site shows the webcam, and `website` uploads it whole.
- RUNBOOK says upload is off "for now", from when long uploads were blocked. They've read `allowed` since 18:35. Whether to turn screen uploads back on is open. Doing so would put every screen on YouTube, against the site's webcam-only rule and DoD-22 screen care.
- `alex-prep\CLAUDE.md` says the YouTube ids are "in the index". They're in `website\content\videos.json`, and the rig's index holds none.
- The spec's acceptance checklist is all unticked, though the rig has run all day.

**Other open questions**

- Should S15, the post-crash planning session, go on YouTube whole like the others? `website`'s rule uploads every filed session's webcam. Unclear whether that's wanted here.
- /start and /stop message `website`, which went down in the crash, and its 5-second loop runs only while that session is up. Whether the site clock caught S15 is unclear.
- The YouTube sign-in is in Google's testing mode, and lasts about 7 days from 1 Nov.
- `Processed\` holds copies of every project session's Claude Code logs, Addvery Research included. It's git-ignored (`OBS/Processed/` and `OBS/Live/` in `.gitignore`), so it stays out of the public repo. Keep it that way.
- The mic picks up other voices in the room, and those voices are in the uploaded webcam videos.

## Sources

- **This folder:** `OBS\CLAUDE.md`, `OBS\rig\RUNBOOK.md`, `OBS\rig\RIG_NOTES.md`, `OBS\rig\HANDOFF.md`, `OBS\Pre Hackathon Spec.md` (skimmed), `OBS\hackathon_clock.json`, `OBS\.claude\skills\start\SKILL.md`.
- **Records:** `OBS\Processed\index.json` and `index.md`; each session's `manifest.json` and `session.json`; `OBS\Live\S15_2026-11-02_1956\session.json`; `OBS\rig\run\live\process.log` and `process_report.md`. File counts and sizes in `OBS\Processed\`, `OBS\Live\` and `D:\OBS Outputs\`. Keyword counts in the S10 to S14 transcripts.
- **Scripts, read for settings:** `rig\scripts\process.py`, `recorders.py`, `controller.py`, `preflight.py`, `upload.py`.
- **Other folders:** `website\content\videos.json`, `website\content\clips.json`, `website\CLAUDE.md`, `website\HANDOFF.md`, `website\builds.md`, `legibility\clip-index.md` (session headers), `legibility\checks.md`, `legibility\tools\cut_grading.py`, `alex-prep\scenes\getsales-demos.md`, `alex-prep\CLAUDE.md`, `canva-video\SCENE.md`, `orchestration\HANDOFF.md`, `SESSIONS.md`, `CHARTER.md` (run order and risks), `Open tasks.md` (status only, nothing private copied), `.gitignore`.
- **Not read:** `rig\.env` and `rig\client_secret.json` (credentials).
- **Commits:**
  - `git log --oneline -40 -- OBS` and `git log -5 --format='%h %ad %s' --date=format:%H:%M -- OBS`.
  - This folder: 9af510f (20:02, S14 webcam note), 2657a32 (13:47), 5841b7b (12:52), 8ededff (11:01, test mode removed), 8173a7e (10:43, upload off), e767dae (09:47, skills moved).
  - Other folders: 27716be (18:57, webcam backlog), 35d777c (18:15, first clips), 5240c27 (19:00, clip batch), 510d3df (19:50, clip-grading page).
