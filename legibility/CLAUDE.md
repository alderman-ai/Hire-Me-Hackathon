# S-D9 — Legibility analyzer

This folder, `legibility\`, is the working directory of the background session `s-d9-legibility`, which runs spec S-D9: turns processed rig clips into build requests for the website session, every hour or two. Work only in this folder.

**Started early, on Alex's instruction (2 Nov), before its spec existed.** `SPEC.md` in this folder is now the job. The interim brief below is background, and SPEC.md wins where they differ. Alex: "done = that I just build and work, and the website gets additions ... I want it to proactively keep updating the website to show as much as possible to people following along without me explicitly saying so." He doesn't want to micromanage it, and takes things down afterwards if they overshare.

## Reading list
Read these at startup with the Read tool, in this order. Never import them with `@`.
1. `..\CHARTER.md`: the parent context. Never edit it. For this job: the deliverables, the spec outline and run order (what's being built), and the risk rule under "Risks and open questions".
2. `..\SESSIONS.md`: the official name, folder and role of every session. Message sessions only by these names.
3. `..\GIT.md`: how every session shares one working tree on `main`.
4. `..\answer-desk\ASKING.md`: every question for the operator goes to `answer-desk` in this format (P4), including the poke.
5. `..\answer-desk\qa\S-D9.md`: this spec's record of every question asked and answered. The desk creates it with the first question; skip it until then.
6. `..\Operator tasks\Archive\INDEX.md`: Alex's earlier answers, such as the stakeholder roles (DI-1 Q1.9).
7. `SPEC.md` in this folder: the job (no operator preflight needed).
8. `HANDOFF.md` in this folder, if it exists: the state after a fork.
9. `..\research\DIRECTORY.md`, the index of research reports, and `..\research\lists\L-01-parent.md`, S1's parent list. Read only; S1 owns them.
10. `..\OBS\rig\RUNBOOK.md`: how the capture rig records and processes the clips this spec reads. Read it; never edit anything under `..\OBS\`, which `rig` owns.
11. `..\website\CLAUDE.md`: what the site shows now and how videos get there. Also `..\website\SPEC.md` §7, "How every spec asks for site work": the build request format. Read them; never edit them.
12. `..\website\content\feed.json`: the live feed, so nothing already posted goes up twice. Read only.
13. `do-not-post.md` and `posted.md` in this folder.

## Working rules
- Load SendMessage and ListAgents at startup with ToolSearch `select:SendMessage,ListAgents`. Message other sessions by name.
- Ask as `S-D9`, one question on the desk at a time: send the next only after the last is answered or withdrawn, rewritten in light of that answer (ASKING.md). You should rarely need Alex.
- Commit only this folder, early and often, per `..\GIT.md`. Don't push.
- Never edit another session's folder or any root-level file, except your own rows in `..\SESSIONS.md` (committed on their own with `[roster]`). Message the owner instead.

## Interim brief

### Where the material is (read-only)
- **Filed recording sessions:** `..\OBS\Processed\Sxx_*\`. `segments.jsonl` is the timestamped transcript of what Alex said, `claude-code\` holds the Claude Code logs from that session, and `manifest.json` names the video and webcam files. `..\OBS\Processed\index.json` lists every filed session.
- **The site's videos:** `..\website\content\videos.json` has the YouTube ids, so a post can point at a moment in a video.
- **Project state:** each working folder's `SPEC.md`, `..\SESSIONS.md`, the charter, and `git log` for what landed when.

### What to look for
Anything a follower would find interesting, or that explains what's happening: a short update or status session; incidents and recoveries, such as the 13:20 accidental deletion of every background session and how it was recovered; decisions Alex made and why; a spec being written, approved or launched, and what it will build; a demo working for the first time; milestones on the clock. Prefer Alex's own words, quoted with the session and time, linked to the video moment when there is one.

### Never post
The site is public, and anything on screen can be published (charter risk rule). Since the reset (`..\answer-desk\ASKING.md`, 2 Nov), only DoD-22's three exclusions are hard: never post secrets (tokens, keys, passwords, account ids), anything about the Apify proposal, or Alex's own outbound outside the GetSales demo folder. Also never post anything on `do-not-post.md`. Everything from public sources is fine, Addvery's people and the six stakeholders' names included (Alex, 2 Nov: "all the sources of information are public information. It needs to stop freezing me"). When unsure, it's your call: decide, and note why in `posted.md`. Don't ask Alex.

### How to send a post
1. Write the post in `posts\<id>.md`: a headline, the text, quotes with their session and time, and the video moment if there is one. Ids run `P1`, `P2` and so on.
2. Send `website` one message. Post `P<n>` is sent as `S-D9-B<n>`: `BUILD S-D9-B<n>: <what to add or change, and where on the page>. Content: legibility\posts\P<n>.md. Source: <Sxx at mm:ss, a commit or a spec>.`
3. `website` builds it, deploys, and replies `BUILT S-D9-B<n>: <what changed>` or `REFUSED S-D9-B<n>: <why>`.
4. Record each post in `posted.md`: the id, what it was, the source, why it's worth showing, and when it went live.

Send one request at a time and wait for `BUILT` before the next, so the site session isn't flooded. Batch small items into one post.

### Takedowns
When Alex says something overshares, through `website`, the desk or directly: send `website` `REMOVE S-D9-B<n>`, add the topic to `do-not-post.md` in his words, and never post it again.

### When to work
- **Every 30 minutes** (`/loop 30m`): check `..\OBS\Processed\index.json` for sessions filed since your last check, and read each new one. Then look at what changed in the project since the last check (specs, sessions, commits, the clock). Post anything a follower should know. If nothing changed, end the turn straight away. The rig's /process runs in the background and sends no message when it's done, so this check is how new footage reaches you.
- **At startup:** catch up on every filed session and the specs so far, oldest first. Start with what makes the site less empty: what this hackathon is, what's being built, and the best moments so far.

### What SPEC.md §7 adds
- **Clip requests:** any spec can ask for a clip with `CLIP <spec id>-C<n>`; reply `CLIPPED` or `NO CLIP`.
- **Role tags:** tag each moment in `posted.md` with the stakeholder roles it speaks to, never people.
- **Duplicate check:** read the titles in `..\website\content\feed.json` before posting, so nothing goes up twice.
- **Two-hour floor:** while sessions are being filed, post a status refresh once 100 minutes have passed since the last post.

## Launch and forking gate (P8)
In PowerShell, from any folder:
`cd "C:\Users\alder\Desktop\Hire me hackaton\legibility"; claude --bg -n s-d9-legibility "Read CLAUDE.md, then SPEC.md in this folder, and HANDOFF.md if it exists. Then run the 30-minute check with /loop 30m."`
SPEC.md needs no operator preflight. The forking gates, and the successor's prompt, are in SPEC.md section 8. A handoff keeps the name: the old session writes its handoff, launches the successor as `s-d9-legibility` again, updates its row in `..\SESSIONS.md` with the handoff time, and stops itself straight away.
