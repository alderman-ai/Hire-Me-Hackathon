# Website session

This session owns the website, and nothing else. Every change to the site goes through here. Alex brings over specs from other sessions when there's site work to do.

- **Not my job:** the capture rig (`..\OBS\rig`), its skills, and its handoff. Don't edit anything under `..\OBS`. Reading rig output for the site is fine.
- **Live site:** https://hire-me-hackathon.vercel.app. Vercel project `hire-me-hackathon`, team `alex-alderman-s-projects` (Hobby plan). Deployed with the Vercel CLI from this folder, not through git.
- **Team:** this is the background session named `website`. The `rig` session (in `..\OBS`) runs the recording, and the root session (repo root) coordinates. Reply to whoever messages you at its `from` address.
- **Clock messages from the rig:** after each /start, /pause and /stop, `rig` sends one line, such as "S02 recording", "S02 paused", "S02 resumed" or "S02 stopped". When one arrives, check that the sync loop is alive and restart it hidden if not (see The countdown). Then run `python scripts\clock_sync.py --once` so the clock changes now, and reply to `rig` with one line saying what `status.json` now shows.
- **Sessions are numbered in order with no total.** Never show or say "of 6".
- **Repo:** public, all work on `main`. Commit your own folder after every finished step, per `..\GIT.md`; don't push, the watcher does.
- Before your first commit, read `..\GIT.md`; it's how all sessions share one working tree.
- **Questions for Alex:** every one goes to the `answer-desk` session in the format in `..\answer-desk\ASKING.md`, never into your own chat (charter P4). Your asker name is `website`.
- **Reading list:** `..\CHARTER.md` first, the parent context (read it with the Read tool, never edit it), then `..\answer-desk\qa\website.md`, every question you've asked Alex and his answers.
- Addvery input: `..\Addvery Research\`, the operator's own folder. It is git-ignored, so read it from the local disk, never from GitHub, and never edit it.
- **Session roster:** `..\SESSIONS.md`, the official name of every session. Message sessions only by those names.
- **Build requests from `s-d9-legibility`:** that session finds what's worth showing followers and sends `BUILD <id>: ...` with the content in `..\legibility\posts\<id>.md`. Treat each one as Alex's standing request (2 Nov: keep the site updated "without me explicitly saying so"). Build it, check it locally, deploy, and reply `BUILT <id>: <what changed>`. Reply `REFUSED <id>: <why>` only if it would show something the charter's risk rule forbids (secrets, the Apify proposal, Alex's own GetSales outbound) or would publish research from `..\Addvery Research\`. Legibility posts never draw on that folder. The stakeholder sections you build from it yourself (S-D8) are a separate job and follow Alex's say on what goes live. On `REMOVE <id>`, take it down and deploy. If Alex says something on the site overshares, take it down at once and tell `s-d9-legibility`.
- **Deploy:** `vercel deploy --prod --yes` from this folder, after checking the change locally (`npx next dev -p 3100`). `.vercelignore` keeps `.env*`, `.clock` and `scripts` out of the upload. In Git Bash, set `MSYS_NO_PATHCONV=1` before `vercel api /...`, or the path gets mangled.
- **Secrets:** `.env.local` holds the Blob token. Never print it.

## What the site shows

The title "The Hire Me Hackathon Begins", a countdown of the 12 hours of recording left, and the session video.

## The countdown

The budget is 12 hours of recorded time. It runs only while a session is recording, and `/pause` and the time between sessions don't count.

- `scripts\clock_sync.py` reads the rig's session records (read-only) and publishes `status.json` to the Blob store `hire-me-hackathon-clock`. It publishes on every start, pause, resume and stop, and every 10 minutes while recording.
- The page fetches `status.json` every 15 s and ticks the clock in the browser between fetches. Blob caching means a change can take up to about a minute to show.
- If `status.json` says recording but hasn't been refreshed for 25 minutes, the page stops the clock, so a dead sync can't run it down.
- Where the rig keeps its state: `..\OBS\Live\S*\session.json` while a session is live, then `..\OBS\Processed\S*\session.json` once it's filed. `spans` hold each stretch of recording, and an open span (`end: null`) with `state: "recording"` means it's running now. `..\OBS\hackathon_clock.json` is the start of S01. `..\OBS\Processed\index.json` lists filed sessions, their video path and YouTube id.

Run `python scripts\clock_sync.py --once` to publish now, or `--status` to print what it would publish. The loop doesn't survive a reboot or logoff. Check that it's alive at the start of every session (`.clock\sync.pid` and the tail of `.clock\sync.log`), and restart it hidden, because a console window would show up on camera:

```powershell
Start-Process C:\Python314\pythonw.exe -ArgumentList '"C:\Users\alder\Desktop\Hire me hackaton\website\scripts\clock_sync.py"' -WorkingDirectory "C:\Users\alder\Desktop\Hire me hackaton\website" -WindowStyle Hidden
```

A second start exits on its own if a loop is already running. Status URL: https://ijofoogwurqmq704.public.blob.vercel-storage.com/status.json

## Hobby plan limits

Hobby can't buy extra usage. Go over a limit and the service stops until the month resets.

- **Blob, the tightest:** 10,000 simple operations a month (reads of `status.json` that miss the 60 s cache, so about one a minute per region while anyone has the page open), 2,000 advanced operations (each `blob put`, `list` or `copy`; the sync's publishes are about 6 an hour while recording), 10 GB transfer, 1 GB storage. If Blob stops, only the clock dies: the video and summary are built into the page. The page skips its poll while the tab is hidden.
- **Site:** 100 GB Fast Data Transfer and 1M edge requests a month. The page is a few hundred KB.
- **Never host video on Vercel or Blob.** The page embeds YouTube, which serves the video.

## Video

**The site shows the webcam, not the screen share.** That's Alex's call, made on 2 Nov.

- Once a session is filed, its webcam files sit in `D:\OBS Outputs\Uploaded\Sxx_webcam\`, listed in that session's `..\OBS\Processed\Sxx_*\manifest.json` (`webcam_folder` and `webcam`). The screen recording is `D:\OBS Outputs\Uploaded\Sxx.mp4`.
- After each session is filed, upload its webcam with `..\OBS\rig\.venv\Scripts\python.exe scripts\upload_webcam.py Sxx <scratch dir>`. It repackages the MKV to MP4 without re-encoding, uploads it unlisted through the rig's own uploader and sign-in (`..\OBS\rig\.env`), waits for YouTube to finish processing, and writes the id to `content\videos.json`. Rerunning it for a session that's already online does nothing.
- The page features one session, the one `content\summary.json` names (S02, the project explainer, since 2 Nov), with its summary under the video. Its YouTube id comes from `content\videos.json` at build time, so after uploading a featured session, redeploy. A newer upload doesn't replace it. The sync also publishes `content\videos.json` in `status.json`, which the page uses only if the build has no id. It never uses the rig's own `youtube_id` in `index.json`, because that's the screen recording. The rig's YouTube upload is off anyway (`UPLOAD_TO_YOUTUBE = False`).
- YouTube caps unverified channels at 15 minutes. Until Alex switches on long uploads at https://www.youtube.com/verify, any session longer than that won't upload.
- Lip sync in the webcam file (Wave:3 audio on BRIO video) is fine: Alex checked S02 on the live site on 2 Nov.
