# Website session

This session owns the website, and nothing else. Every change to the site goes through here. Every spec asks for site work with `BUILD <spec id>-B<n>` (SPEC.md §7).

- **Not my job:** the capture rig (`..\OBS\rig`), its skills, and its handoff. Don't edit anything under `..\OBS`. Reading rig output for the site is fine.
- **Live site:** https://hire-me-hackathon.vercel.app. Vercel project `hire-me-hackathon`, team `alex-alderman-s-projects` (Hobby plan). Deployed with the Vercel CLI from this folder, not through git.
- **Team:** this is the background session named `website`, and it runs spec S-D8 (`SPEC.md`). The forking gates are in SPEC.md §8. The `rig` session (in `..\OBS`) runs the recording, and the root session (repo root) coordinates. Reply to whoever messages you at its `from` address.
- **Clock messages from the rig:** after each /start, /pause and /stop, `rig` sends one line, such as "S02 recording", "S02 paused", "S02 resumed" or "S02 stopped". When one arrives, check that the sync loop is alive and restart it hidden if not (see The countdown). Then run `python scripts\clock_sync.py --once` so the clock changes now, and reply to `rig` with one line saying what `status.json` now shows.
- **Sessions are numbered in order with no total.** Never show or say "of 6".
- **Repo:** public, all work on `main`. Commit your own folder after every finished step, per `..\GIT.md`; don't push, the watcher does.
- Before your first commit, read `..\GIT.md`; it's how all sessions share one working tree.
- **Questions for Alex:** every one goes to the `answer-desk` session in the format in `..\answer-desk\ASKING.md`, never into your own chat (charter P4). Your asker name is `website`.
- **Reading list:** `..\CHARTER.md` first, the parent context (read it with the Read tool, never edit it), then `SPEC.md` (the S-D8 spec) and `HANDOFF.md` if it exists, then `..\GIT.md`, `..\answer-desk\ASKING.md`, `..\Operator tasks\Archive\INDEX.md` (Alex's earlier answers) and `..\research\DIRECTORY.md` (the research index), then `..\answer-desk\qa\website.md`, every question you've asked Alex and his answers.
- Addvery input: `..\Addvery Research\`, the operator's own folder. It is git-ignored, so read it from the local disk, never from GitHub, and never edit it.
- **Session roster:** `..\SESSIONS.md`, the official name of every session. Message sessions only by those names.
- **Build requests from every spec:** each spec sends `BUILD <spec id>-B<n>: ...` with the content in its own folder. `s-d9-legibility`, for one, finds what's worth showing followers and puts the content in `..\legibility\posts\`. Treat each request as Alex's standing request (2 Nov: keep the site updated "without me explicitly saying so"). Build it, check it locally, deploy, and reply `BUILT <spec id>-B<n>: <what changed>`, or `REFUSED <spec id>-B<n>: <why>`. SPEC.md §7 has the format, the id mapping and the refusal grounds, which include the charter's risk rule (secrets, the Apify proposal, Alex's own GetSales outbound) and research from `..\Addvery Research\`. Legibility posts never draw on that folder. The stakeholder sections you build from it yourself (S-D8) are a separate job and follow Alex's say on what goes live (SPEC.md §7 step 8). On `REMOVE <spec id>-B<n>`, take it down and deploy. If Alex says something on the site overshares, take it down at once and tell its asker.
- **Deploy:** `vercel deploy --prod --yes` from this folder, after checking the change locally (`npx next dev -p 3100`). `.vercelignore` keeps `.env*`, `.clock` and `scripts` out of the upload. In Git Bash, set `MSYS_NO_PATHCONV=1` before `vercel api /...`, or the path gets mangled.
- **Secrets:** `.env.local` holds the Blob token. Never print it.

## What the site shows

A live feed, newest on top (Alex, 2 Nov: "like a live feed where new posts go on top"). From the top: the title "The Hire Me Hackathon Begins", the countdown of the 12 hours of recording left, a "start here" box (link to the S02 explainer post, and the charter and specs), then the feed.

- **Feed:** `content\feed.json`, rendered by `app\feed.tsx`, sorted by each post's `at` (newest first). A post has `id`, `at` (`2026-11-02T14:15`), `kind` (Status, Update, Milestone, Insight, Session, Explainer), optional `session`, `title` and `blocks`: `p`, `list`, `quote` (with `source`, optional `href` and `note`), `highlight` (boxed, nested blocks), `video` (`session`, `start` seconds), `summary` (the S02 summary in `content\summary.json`), `status-board`, `doc-link`. Legibility posts become feed posts; a new post just gets a later `at`.
- **Status board:** `content\build.json` ("What's being built today"), shown in the feed post with id `status`. On a status update, change `build.json`'s `as_of` and move that post's `at` to the same time, so it rises to the top.
- **Charter and specs:** `/docs/<slug>`, from `content\docs\`. Copy them in with `python scripts\sync_docs.py`, which redacts private details (the Apify proposal, Alex's own GetSales outbound, who the live run targets, names of people at the company) and refuses to write if a deny-listed term survives. Rerun it before a deploy when the charter or a spec changes. The unredacted originals are in the public GitHub repo anyway; the site doesn't link to them.

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

**The site shows the webcam, not the screen share.** That's Alex's call, made on 2 Nov. There's no featured video. The only screen recordings allowed on the site are the D3 live-run clip (DoD-13 needs it), the Canva design video (DoD-21 needs it), and a screen cut for the D10 video, only if Alex picks it in S-D10's intake.

- Once a session is filed, its webcam files sit in `D:\OBS Outputs\Uploaded\Sxx_webcam\`, listed in that session's `..\OBS\Processed\Sxx_*\manifest.json` (`webcam_folder` and `webcam`). The screen recording is `D:\OBS Outputs\Uploaded\Sxx.mp4`.
- After each session is filed, upload its webcam with `..\OBS\rig\.venv\Scripts\python.exe scripts\upload_webcam.py Sxx <scratch dir>`. It repackages the MKV to MP4 without re-encoding, uploads it unlisted through the rig's own uploader and sign-in (`..\OBS\rig\.env`), waits for YouTube to finish processing, and writes the id to `content\videos.json`. Rerunning it for a session that's already online does nothing.
- Videos appear as `video` blocks in feed posts: the S02 explainer (from 62 s, just after "hey Claude, starting now", with its summary under it) and the S06 update. A post's YouTube id comes from `content\videos.json` at build time, so after an upload, add the block and redeploy. The sync also publishes `content\videos.json` in `status.json`; the page no longer reads it. It never uses the rig's own `youtube_id` in `index.json`, because that's the screen recording. The rig's YouTube upload is off anyway (`UPLOAD_TO_YOUTUBE = False`).
- YouTube caps unverified channels at 15 minutes. Until Alex switches on long uploads at https://www.youtube.com/verify, any session longer than that won't upload.
- Lip sync in the webcam file (Wave:3 audio on BRIO video) is fine: Alex checked S02 on the live site on 2 Nov.
