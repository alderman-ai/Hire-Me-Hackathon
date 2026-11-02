# S-D9 Legibility analyzer: executable spec

Status: running on this spec since 14:51; methodology revised after the L-01 synthesis at 15:20; spec-draft gate with Alex · Row: S-D9 — Legibility analyzer · Folder: `legibility\` · Session: `s-d9-legibility`

This spec keeps the site telling the story of the build without Alex having to ask. Every 30 minutes, the session reads what the rig has filed and what has changed in the project. It picks what a follower or an Addvery stakeholder should see, writes it as a post, and asks `website` to put it on the site. It also cuts clips from the rig recordings for any spec that asks. Two of those clips feed deliverables: the D3 GetSales live run, and the D10 Canva design video. Its work shows in the site's live feed, newest on top, and in the feed's `status` post, which is the deliverables view. It also shows, through the specs it cuts clips for, in the D3 and D10 sections, and in the stakeholder sections once those are live.

The session has run since 13:48 on the interim brief in its CLAUDE.md, and P1 to P3 are live. This spec adopts that brief and adds four things: the clip requests, role tags, a two-hour floor, and a check against duplicates. Alex: "done = that I just build and work, and the website gets additions ... I don't want to micromanage it."

## 1. Operator preflight (P3)

**No preflight intake.** Alex asked not to micromanage this spec, and the interim brief and the archive settle everything else. Its one decision used to be a question: does he watch the GetSales clip before it goes on the site? It's now the deliverable gate this spec already runs when the clip is cut (§7 step 5), with the cautious default: the clip doesn't go live until he approves it, and if he's away it waits for the morning. This was decided on his 14:38 instruction to remove blockers (§9).

**Launch gate: met.** The session is already running. `orchestration` sends `s-d9-legibility` one line: `Read SPEC.md in your folder: it is now your job and wins where it differs from the interim brief. Keep the 30-minute loop running.`

**Operator scenes.** None on camera.
- **The clip review.** It may need him for about 5 minutes, with the recording paused. That happens once the session holding the GetSales outreach is filed. Alex moved the outreach to Addvery's six to "by 15:30" (his answer at 14:30): a connection request or message from his own profile, not a 17:00 on-camera run.
- **Off camera.** A clip needs the rig to have been recording during the outreach, and the session to be filed. /process runs only when Alex types it (DI-1 Q1.7). If the session isn't filed an hour after its /stop, this session pokes him once.

**Runtime questions** go to the desk as asker `S-D9`, with ids from `S-D9-Q1` onwards, one at a time. They should be rare: "Don't ask Alex for routine calls." After 15 minutes waiting, send `POKE S-D9: waiting on you for <what>`. Before 18:00 Prague, keep waiting. From 18:00, decide and log the decision in §9.

## 2. Spec contract

| Item | S-D9's answer |
| --- | --- |
| 1. Its place | Row S-D9 — Legibility analyzer. It claims four items:<br>• DoD-13: the D3 live-run clip, with S-D3.<br>• DoD-19: the site kept getting clearer through build requests, with S-D8.<br>• DoD-20: every filed session reviewed, and posts at least every two hours while sessions are being filed. `posted.md` is the evidence.<br>• DoD-22: nothing published shows secrets, the Apify proposal or Alex's own GetSales outbound, with S-D8.<br>It also serves two items. DoD-18: moments sorted by stakeholder role. DoD-21: the clips for the D10 video. |
| 2. Its neighbours | It depends on the rig's filed sessions (`rig`, `..\OBS\`) and on the website session (S-D8, `website`). It runs in parallel with every spec. It cuts clips for S-D3 (`s-d3-getsales`) and S-D10 (`s-d10-canva-video`). S-D1 (`s-d1-scraping`) passes on Alex's answer about naming Apify. It feeds S-D8 through build requests. |
| 3. Operator preflight | §1: none needed. Its one decision is the clip gate. |
| 4. Decision log | §9. |
| 5. Forking gates | §8. |
| 6. Working directory | `legibility\`, session `s-d9-legibility`. The reading list is §3. |

## 3. Routing and resources

Paths are relative to `legibility\`. Step 1 of the run (§7) confirms each resource is reachable, and turns anything ambiguous into a desk question. Inputs that other specs will produce later are named in the steps that use them.

- `..\CHARTER.md`: the parent context. Read it with the Read tool, and never edit it.
- `..\SESSIONS.md`: the roster. Message sessions only by these names, and edit only this session's row.
- `..\GIT.md`: the shared working tree. Commit only `legibility\`, with path-limited commits.
- `..\answer-desk\ASKING.md`: the desk format, gate approvals, TASK lines, the poke and the 18:00 rule.
- `..\answer-desk\qa\S-D9.md`: this spec's questions and answers. The desk creates it with the first question; skip it until then.
- `..\Operator tasks\Archive\INDEX.md`: Alex's earlier answers. DI-1 Q1.9 gives the stakeholder roles and says sorting clips "is the assistants job". DI-1 Q1.7 says /process runs only when he types it. DI-1 Q1.10 sets 3 seconds of clip padding.
- `CLAUDE.md`: the interim brief, which this spec adopts. This spec wins where they differ. The changes CLAUDE.md needs are listed below.
- `SPEC.md`: this file. `HANDOFF.md`: the state after a fork, if it exists.
- `posted.md`: every post, the "Sessions covered (DoD-20)" table for S01 onwards, and everything left out on purpose. It is the evidence for DoD-20.
- `checks.md`: one line per check.
- `do-not-post.md`: Alex's takedowns, in his words.
- `posts\`: the posts, `P1` onwards.
- `..\research\DIRECTORY.md`: the index of research reports. `..\research\lists\L-01-parent.md`: S1's parent list. Read only; S1 owns it.
- Research findings: S2 adds a line here for each report when S1 sends FINDINGS for L-01.
- **L-01 findings** (S1's parent research, approved by Alex as OT-01; added by S2 as C07): for this spec, read the synthesis first, then R1, R3 (what never to post), W3, W1.
  - `..\research\global\L-01-synthesis.md`: S1's synthesis of the parent research: the strongest findings, recommendations per spec, and 24 one-line questions for Alex, each naming the spec it blocks. Start here: take this spec's section, and fold the questions that name it into your next gate. Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-R1-legibility.md`: making the work legible: outcome first, a short demo, a 3 to 4 step how-it-works; what reads as a toy or as noise; AI labels. Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-R2-gtm-engineer-hiring.md`: what a GTM engineer is hired to show, which deliverables fit it best, and the gaps none of them shows. Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-R3-personal-data.md`: personal data on a public site: GDPR, LinkedIn's terms, what the live run needs, and the safe, risky and keep-off table for stakeholder sections (section 7). Not legal advice. Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-R4-format-reception.md`: whether a site aimed at one employer lands: replies versus hires, when it turns creepy or self-indulgent, and the one small ask. Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-W1-wildcard-executed.md`: whether a dozen background sessions can run through the day and night: usage limits, Windows Update restarts, idle stops. Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-W2-wildcard-delivered.md`: what the six actually get from the alert: the link, the preview card, click timing, and the morning hand-over checklist (C7). Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-W3-wildcard-received.md`: whether AI-made work reads as skill or as a shortcut: the penalty bites on personal lines, not on the machinery. Options for Alex, not decisions. Read only; S1 owns it.
- `..\OBS\Processed\index.json`: every filed session. Each session's folder holds `..\OBS\Processed\S*\segments.jsonl` (the transcript), `..\OBS\Processed\S*\claude-code\` (that session's Claude Code logs) and `..\OBS\Processed\S*\manifest.json`. All read only, because `rig` owns `..\OBS\`. The Claude Code logs carry S-D3's GetSales tool output, so read them under the never-post rules in §7.
- `..\OBS\rig\RUNBOOK.md`: how the rig records and files sessions. Read only.
- `D:\OBS Outputs\Uploaded\`: the screen recordings, `S<nn>.mp4`, and the webcam folders, `S<nn>_webcam\`. Read only. ffmpeg cuts clips from them.
- `..\website\content\feed.json`: the live feed. Its titles show what's already posted, including the Insight posts that `website` wrote itself. The post with id `status` is the deliverables view. Read only.
- `..\website\content\videos.json`: YouTube ids, for linking to a moment. Read only.
- `..\website\CLAUDE.md` and `..\website\SPEC.md`: how the site works. §7 of the spec has the build request format. Read only.
- `..\getsales\SPEC.md` (S-D3) and `..\canva-video\SPEC.md` (S-D10): the clips they ask for and their rules. Read only the lines about clips.
- Project state: each folder's `SPEC.md`, the file names and states in `..\Operator tasks\`, and `git log`.
- `..\orchestration\_templates\Gate approval template.md` and `..\orchestration\check_gate.py`: the gate task and its 5-minute check.
- Tools:
  - SendMessage and ListAgents, loaded at startup with ToolSearch `select:SendMessage,ListAgents`;
  - Monitor;
  - `/loop 30m`, which runs as a cron job, `d3d4dcf3` at the time of drafting;
  - ffmpeg;
  - read-only git.

**Outputs** (created by this spec):
- new posts in `posts\`;
- new rows in `posted.md` and `checks.md`;
- the clips in a new git-ignored `clips\` folder, since video never goes in git;
- `legibility\.gitignore`;
- `HANDOFF.md`;
- gate tasks in `..\Operator tasks\`;
- this session's row in `..\SESSIONS.md`.

**Never opened:** `..\Addvery Research\`, S-D3's git-ignored `..\getsales\live\`, `.env` files, and the Apify proposal.

**CLAUDE.md changes this spec needs.** `orchestration` makes them; this session edits no CLAUDE.md.
1. The opening says "Until `SPEC.md` is written, the interim brief below is the job." Change it to: SPEC.md is the job, the interim brief is background, and SPEC.md wins where they differ.
2. Reading list:
   - item 7 becomes `..\research\DIRECTORY.md` and L-01;
   - add `HANDOFF.md`, `..\Operator tasks\Archive\INDEX.md` and `..\website\content\feed.json`;
   - add `..\website\SPEC.md` §7 to item 9.
3. "How to send a post", step 2: post `P<n>` is sent as `BUILD S-D9-B<n>`. "Takedowns": `REMOVE S-D9-B<n>`.
4. "Never post": add the six stakeholders' names, S-D3's GetSales output in the Claude Code logs, and Apify's name until S-D1 passes on Alex's answer.
5. Add short pointers to SPEC.md §7 for clip requests (`CLIP`), role tags, the duplicate check and the two-hour floor.

## 4. Problem and scope

**Problem.** Alex works for more than 10 hours today, and nobody following along, Addvery included, will watch hours of video. Without someone picking the moments, the site shows only what Alex remembers to ask for. DoD-20 needs every filed session reviewed, with a post at least every two hours while sessions are being filed. DoD-13 and the D10 video need clips cut from the rig recordings.

**In scope:**
- reading every filed session and every project change;
- writing posts and sending build requests;
- the statuses in the deliverables view;
- role tags;
- takedowns;
- cutting clips for any spec that asks with `CLIP`, including the D3 live-run clip with its gate;
- this spec's share of DoD-22.

**Out of scope:**
- building the site (S-D8);
- running /process, or anything else on the rig (`rig` and Alex);
- uploading video, which goes through `website`'s upload flow;
- placing a requested clip on the site, which the asking spec does with its own build request;
- the stakeholder sections themselves (S-D8);
- anything from `..\Addvery Research\` or `..\getsales\live\`;
- screen footage in its own posts, because the site shows the webcam (Alex, 2 Nov);
- real data, except the D3 live run (charter, Scope).

## 5. Definition of done

| Criterion | Traces to |
| --- | --- |
| Every session filed in `..\OBS\Processed\index.json` has a row in `posted.md`'s "Sessions covered" table. The row names the post that carries the session's best moments, or says why none does. | DoD-20 |
| Between the first session's filing and the last's, no gap between consecutive posts' "Live at" times in `posted.md` is over two hours. | DoD-20 |
| Every post went to `website` as a build request. `posted.md` records its BUILT, or its REFUSED with the reason. While sessions were being filed, the `status` post was refreshed at least every two hours. No post repeats one already in the feed. | DoD-19 |
| The D3 live-run clip is cut from the rig recording and shows each pipeline stage: Sales Navigator, the CSV export, the enrichment from D2, the computed first-message variable, the import into GetSales, and the send: a connection request or message from his own profile. The six are blurred unless Alex lifted the blur at S-D3's pre-send gate. Alex approved the clip at its gate, and it was handed to S-D3 with `CLIPPED`. | DoD-13 (with S-D3, whose build request places it) |
| Every `CLIP` request got `CLIPPED` or `NO CLIP`, with the reason. | serves DoD-21; DoD-13 |
| Each post's moments carry role tags in `posted.md`, from the roles RevOps, CSO, CMO, CEO, CTO, CAIO and COO (DI-1 Q1.9). Once the stakeholder sections are live, moments for each role were offered to them by build request. | DoD-19; serves DoD-18 |
| At each forking gate, a check of every post and clip finds nothing that the never-post rules or `do-not-post.md` forbid. Every takedown Alex asked for was removed, and added to `do-not-post.md` in his words. | DoD-22 |

## 6. Research step

At launch, the session sends `s1-research` one line: `RESEARCH S-D9: L-01 only, no list of its own (R1 on legibility shapes what it posts, R3 on personal data what it leaves out; it is already a reader), needed by 16:30`.

The spec needs no list of its own. Its job is choosing material under rules Alex has already set. L-01's R1 (making the work legible), R3 (personal data) and R4 (whether the format lands) cover what a list of its own would ask.

All the groundwork goes ahead while research runs, and the loop never waits for research. When FINDINGS land, the session revises what it looks for and its never-post rules. It then runs the coherency check, and sends the spec-draft gate.

## 7. Methodology and steps

**Methodology, revised at 15:20 after the L-01 synthesis** (`..\research\global\L-01-synthesis.md`, section "S-D9 Legibility analyzer", recommendations 9.1 to 9.7). The synthesis settles the one conflict that touched this spec, R1's "a raw build log is noise" against the live feed, in this spec's favour: it reads S-D9 as the curator. The curated, dated feed stays, and the rules below keep it curated.

**Coherency check** ("if we execute this methodology, will that DoD be satisfied?"):
- **DoD-20.** The 30-minute check reads every filed session. The "Sessions covered" table records each one, and the 100-minute floor keeps gaps under two hours. Yes.
- **DoD-19.** Every post goes as a build request, and the floor refreshes the `status` post. Yes, provided `website` keeps answering. The 30-minute resend rule covers a silent `website`.
- **DoD-13.** It depends on two things outside this spec: the rig recording the outreach, and Alex typing /process. The `NO CLIP` path and the one poke cover both. Yes on S-D9's side.
- **DoD-22.** The never-post list now includes R3's keep-off items, the clip frame check covers 9.4, and a publish check runs at every fork. Yes.
- **DoD-18 (served).** Role tags are kept in `posted.md` from P1 on. Yes, once the sections exist.

- **The 30-minute check** (from the interim brief).
  - Check `..\OBS\Processed\index.json`, and read any newly filed sessions, oldest first.
  - Look at what changed in the project since the last commit seen: specs, the roster, operator task states, the clock.
  - Read the titles in `..\website\content\feed.json`, so nothing already posted goes up twice. That includes `website`'s own Insight posts.
  - Post what a follower should know.
  - If nothing changed, log the check in `checks.md` and end the turn.
- **What to look for** (from the interim brief):
  - status sessions;
  - incidents and recoveries;
  - decisions, and why they were made;
  - specs being written, approved or launched;
  - a demo working for the first time;
  - milestones on the clock.

  Prefer Alex's own words, quoted with the session and time, and linked to the video moment where there is one. Use the feed's kinds: Status, Update, Milestone, Insight, Session and Explainer.
- **How posts read** (L-01 synthesis).
  - **Curated, not raw (9.1).** Each post is a dated "what changed" item in plain words that a reader can scan. Done items come first, with a link to the section where there is one. Never post raw clips, long unedited footage or a commit stream.
  - **Judgment first (9.2).** Prefer moments that show Alex's judgment (a choice, a cut, a check), and moments that show what broke and how it was handled.
  - **Alex directs and decides, the agents carry out (9.3, Q18).** New posts put the decision in Alex's hands and the execution in the agents'. Never write "the agents take over". Past posts keep their titles. This is the research default until Alex answers Q18; `website` owns the site-level framing, and this spec follows its answer.
  - **Show the orchestration layer as skill (conflict 5, Q8).** Posts about the sessions, the answer desk and this loop stay, worded around outcomes, not tool names. If Alex answers Q8 differently through `website` or S2, follow that.
  - **No invented numbers (X.4).** Every number is counted from a source (a commit, a file, a transcript), or labelled as an estimate.
  - **Say what the AI did.** When a post was drafted by this session from Alex's words, the feed can say so. The relational text, anything addressed to the six, is never this session's to write.
- **The two-hour floor** (DoD-20). While sessions are being filed, post a status refresh once 100 minutes have passed since the last post, even if nothing new was filed. It updates the `status` post, which moves back to the top, and adds the latest moment worth showing.
- **Role tags** (DI-1 Q1.9). Tag each moment in `posted.md` with the roles it speaks to: roles only, never people. Once `website` sends the six roles, offer each section its moments in one build request per batch.
- **Never post.** This keeps the interim brief's list and adds to it:
  - secrets, tokens, keys, passwords or account ids;
  - anything about the Apify proposal or Alex's own GetSales outbound;
  - Apify's name, until S-D1 passes on Alex's answer to its DI-6 question 3;
  - anything from `..\Addvery Research\`, or research about Addvery's people, until Alex says so;
  - the six stakeholders' names, and anything from S-D3's GetSales output in the filed Claude Code logs;
  - about the six (R3, section 8 and its keep-off table): their reactions to the outreach (acceptances, replies, the inbox), photos or avatars, verbatim LinkedIn posts or profile screenshots, career history, and any personality or "buyer type" profiling;
  - personal or health matters, or anything about people other than Alex;
  - anything on `do-not-post.md`;
  - screen footage in its own posts.

  When unsure, leave it out and log why under "Left out" in `posted.md`.
- **Posts and build requests.**
  - Write post `P<n>` in `posts\P<n>.md`: a headline, the text, quotes with their session and time, the video moment and the role tags.
  - Send `BUILD S-D9-B<n>: <what, where>. Content: legibility\posts\P<n>.md. Source: <Sxx at mm:ss, a commit or a spec>.`
  - Send one request at a time, and wait for BUILT or REFUSED. Batch small items.
  - If no reply comes within 30 minutes, check that `website` is alive with ListAgents and resend once. If there's still nothing, tell `orchestration`.
  - On REFUSED, fix the post and resend once, or log it under "Left out".
- **Takedowns.** Send `REMOVE S-D9-B<n>`, and add the topic to `do-not-post.md` in Alex's words.
- **How any spec asks for a clip.**
  - The request is one message: `CLIP <spec id>-C<n>: <session, cues or wall-clock times>, <what it must show>, <redaction rules>. For: <use>.`
  - The redaction rules are optional. Without them, the never-post rules and a frame check apply.
  - S-D10's `CLIP S-D10-C1: session S<nn>, from the cue Canva design starts now to the cue Canva design done, screen and webcam clips. For: the D10 video.` is valid as written.
  - S-D3's line is `S-D3 live run: stage times for the DoD-13 clip in getsales\live-run.md; show <what the pre-send gate approved> of the six, blur the rest.` It counts as `CLIP S-D3-C1`.
  - Once the session is filed, find the cues from its transcript, or use the times given.
  - Cut with ffmpeg from the recordings in `D:\OBS Outputs\Uploaded\`, with 3 seconds of padding (DI-1 Q1.10), into `clips\`.
  - Check one frame every 2 seconds for anything the never-post rules forbid beyond what the request allows, and cut around it. That includes the six people's names, avatars and LinkedIn profiles, GetSales lead lists, acceptances, replies and the inbox (9.4).
  - Reply `CLIPPED <id>: <clip paths or YouTube id>`, or `NO CLIP <id>: <why>`.
  - The asking spec places the clip on the site with its own build request.
- **The D3 clip** (DoD-13), as `CLIP S-D3-C1`.
  - Read the stage times from `..\getsales\live-run.md` once S-D3 has written it. It holds times, no names. If it's missing, find the stages from that session's transcript and Claude Code logs, and keep the blur.
  - Cut one short piece per stage from the screen recording.
  - Blur every region where one of the six shows, as S-D3's line says, using boxes found from sampled frames. A stage that can't be blurred reliably becomes a blurred still or a caption card.
  - Caption each stage, and join the pieces into `clips\d3-live-run.mp4`, to the synthesis's clip spec (3.6):
    - 2 minutes or less, or about 60 seconds plus a longer cut;
    - the end state in the first seconds;
    - one labelled chapter per stage;
    - captions for sound-off viewing;
    - waiting cut out, but nothing sped up;
    - each cut disclosed on screen ("cut for length");
    - tight crops.
  - Never show acceptances, replies or the inbox (3.7). How the six are hidden (blur, a dummy lead alongside, or the stages only) is Alex's Q4, which S-D3 owns through its pre-send gate. Until S-D3 says otherwise, blur.
  - Run the gate (step 5). Then reply `CLIPPED S-D3-C1: legibility\clips\d3-live-run.mp4`. S-D3 sends `BUILD S-D3-B2` to place it.

**Steps.**
1. **Start.**
   - Read the reading list, and confirm each resource is reachable: `index.json` and `feed.json` read, ffmpeg runs, `website` is alive, and Monitor loads.
   - Update this session's row in `..\SESSIONS.md` to "runs on SPEC.md since <time>", in a path-limited `[roster]` commit.
   - Add `clips/` to `legibility\.gitignore`, and commit.
2. Send the RESEARCH line (§6).
3. Keep the 30-minute loop running throughout, as above. Log each check in `checks.md`, and commit after each post or check line.
4. **Delegate (P7, P1).** Hand each newly filed session to a subagent, together with its `segments.jsonl`, its `claude-code\` folder, its `manifest.json`, `do-not-post.md`, the feed's titles, the never-post rules and the role list. The subagent returns candidate moments with quotes, times and role tags, never names or GetSales output. The session picks the moments and writes the post. Sessions filed at the same time run in parallel.
5. **Clip requests, and the D3 clip gate (DoD-13).**
   - Answer each `CLIP` as above, in the order the requests arrive.
   - For S-D3-C1: if the session holding the outreach (due by 15:30) isn't filed an hour after its /stop, poke once: `POKE S-D9: waiting on you for /process of <Sxx>, the GetSales outreach, so its clip can be cut`. If the rig wasn't recording during the outreach, reply `NO CLIP S-D3-C1: the outreach isn't in any recording`.
   - Cut and check the clip.
   - Write `..\Operator tasks\Approve - the GetSales outreach clip.md` from the gate template.
     - Its OT id goes in the front matter only: use the next free OT number, and check `..\Operator tasks\` and its `Archive\` just before writing.
     - It opens with `## What this is`, in plain words with no codes: what the site is, what the clip shows, that it goes on the site only once he ticks, that it takes about 5 minutes with the recording paused, and that if he's away it waits for the morning.
   - Under "What's being approved", it puts a five-line plain summary first: the stages with their times, whether the blur stands, the length, and what was cut out.
   - Then it embeds the clip with `![[legibility/clips/d3-live-run.mp4]]`. The Obsidian vault is the repo root, so it plays in place, and the video never enters the repo. It names no one. `Snapshot of` names the clip and its SHA-256, not a commit.
   - Commit the task file first, path-limited. Then send `answer-desk` the line `TASK S-D9: Approve - the GetSales outreach clip.md is waiting on you: the GetSales outreach clip, before it goes on the site`.
   - Wait with Monitor, running `python -I orchestration\check_gate.py "Operator tasks\Approve - the GetSales outreach clip.md"` from the repo root every 300 seconds, until it exits 0. Poke after 15 minutes, and every 15 minutes after that.
   - On CHANGES, recut the clip, refresh the snapshot and wait again.
   - On APPROVED, send:
     - `CLIPPED S-D3-C1` to `s-d3-getsales`;
     - `TASK DONE S-D9: Approve - the GetSales outreach clip.md` to `answer-desk`;
     - `ARCHIVE Approve - the GetSales outreach clip.md: readers S-D9, S-D3` to `orchestration`.
   - It never goes live on a default. From 18:00, an open task stays open for the morning cleanup session.
6. **Post-research.** When FINDINGS land, revise the methodology and run the coherency check. Send any post-research question to the desk, one at a time.
7. **Spec-draft gate.**
   - Freeze this whole SPEC.md into `..\Operator tasks\Approve - the plan for the site's build updates.md`. It opens with `## What this is` in plain words, with its OT id in the front matter only.
   - Handle it the same way as the clip gate, with this file name in every line:
     - commit, then send `TASK S-D9: Approve - the plan for the site's build updates.md is waiting on you: how the site's build updates are chosen, and their definition of done`;
     - run `check_gate.py` on it every 300 seconds, poke after 15 minutes, and apply any CHANGES;
     - then send `TASK DONE S-D9: Approve - the plan for the site's build updates.md` and `ARCHIVE Approve - the plan for the site's build updates.md: readers S-D9`.
   - Alex approves the spec's own DoD here.
   - The loop keeps running, because nothing waits on this gate. From 18:00, proceed and log that in §9.
8. **Publish check (DoD-22).** At each forking gate, re-read every live post and clip against the never-post rules and `do-not-post.md`. Send `REMOVE` for any miss, and log the check in `checks.md`.
9. **Screen care.** Work in the background. Never open what §3 lists as never opened. Read frames taken from clips as files, and never open them in a window on the recorded monitor.
10. **Overnight (P6).** The loop keeps running and posts project changes. No desk questions go out: decide and log instead. Takedowns from Alex wait for the morning.
11. **Commits.** Commit after every finished step, path-limited: `git commit -m "[legibility] <message>" -- legibility/...`. Don't push.
12. **Done.** When §5 is met, send `orchestration` the line `DONE S-D9: <evidence, one line>`, for example `DONE S-D9: posted.md covers S01 to S<nn>, no gap over two hours, D3 clip approved and handed to S-D3`. Then keep the loop running until the morning cleanup session.

## 8. Forking gates (P8)

| Gate | When |
| --- | --- |
| G1 | The D3 clip has been handed to S-D3 (DoD-13 on S-D9's side). |
| G2 | Shortly before 18:00 Prague (about 17:50), so the overnight session starts clean (P6). |
| G3 | Context is about half full. The 30-minute loop fills context steadily, so expect this every few hours. |

**How it forks.**
1. Finish the check in hand. Write `HANDOFF.md` and commit it. It holds:
   - first, an instruction to the successor to start `/loop 30m` before anything else;
   - the old loop's cron job id;
   - the last line of `checks.md`, the last post, and any build request in flight;
   - open `CLIP` requests;
   - the state of each gate task, with times;
   - pokes, and the `S-D9-Q` open on the desk;
   - decisions since the last fork.
2. From `legibility\`, launch the successor under the same name: `claude --bg -n s-d9-legibility "Read CLAUDE.md, then HANDOFF.md. You are now the active S-D9 session."`
3. Update this session's row in `..\SESSIONS.md` with the handoff time, in a path-limited `[roster]` commit.
4. Send the handoff notice to `website`, to every spec with an open `CLIP`, and to `answer-desk` if a question is on the desk: `HANDOFF s-d9-legibility, <time>: a fresh session has taken over under the same name. Re-send anything that got no reply since <time>.`
5. Delete its own cron job (`d3d4dcf3`, or whatever id it has by then), so only the successor's loop runs. Then stop with `claude stop <its own session id>`.

## 9. Decision log (P5)

Before 18:00 Prague, a passed deadline means poke, not decide. From 18:00, the active session decides on the default, logs it here, and sends `WITHDRAW <id>` for a desk question. Start each decision with the time and the question id it closes.

| Decision | Justification | Why it's the right call | Blast radius if changed |
| --- | --- | --- | --- |
| 2 Nov 15:20, s-d9-legibility, after the L-01 synthesis: no desk question from S-D9 for Q4, Q8 or Q18. Q4 belongs to S-D3's pre-send gate (blur until told otherwise). Q8 and Q18 are site-level, so `website` (S-D8) is the asker, and this spec follows its answer. Meanwhile posts use the research defaults: show the orchestration layer as skill, and frame new posts as Alex directs and decides, the agents carry out. | Each question names two or three specs. Asking from each would put the same question in front of Alex two or three times, and he said "i'm swamped we need to remove blockers". | One asker per question protects his focus (P4). The defaults are what the research recommends, and they only shape wording. | Rewording future posts, and retitling past ones only if he asks. Nothing structural. |
| 2 Nov 15:20, s-d9-legibility: the clip frame check stays at one frame every 2 seconds (9.7 suggests a longer interval overnight). | The only clip in sight, D3, is about 2 minutes, so about 60 frames. | The cost is small, and the clip carries the most risk. | One interval, if overnight clips get long. |
| 2 Nov, wave2-specs, on Alex's 14:38 instruction to remove blockers: no preflight intake. Its one question, whether he watches the GetSales clip before it goes live, is the clip gate (§7 step 5), with the cautious default: the clip doesn't go live until he approves, and waits for the morning if he's away. | Alex: "i'm swamped we need to remove blockers". He also said "I don't want to micromanage it". The interim brief and DI-1 settle everything else. | It removes an intake from his queue, and keeps the one check on the only clip with other people and his own account in it. | If he says he doesn't need to see it, the gate is dropped, and the clip is handed over after the frame check. |
| 2 Nov, wave2-specs: the clip gate embeds the clip with `![[legibility/clips/d3-live-run.mp4]]`, after a five-line plain summary. `Snapshot of` keeps its SHA-256. | His readability rule wants everything in front of him. The Obsidian vault is the repo root, and video never goes in git. | He watches it in place, and nothing reaches the repo. | One task's layout. An unlisted YouTube link works instead, if the embed won't play. |
| 2 Nov, wave2-specs: the GetSales outreach is "by 15:30", a connection request or message from his own profile (his answer at 14:30). It's no longer a 17:00 on-camera run. If the rig wasn't recording during it, the reply is `NO CLIP`. | That timetable change comes from the GetSales spec's session, through wave2-specs. | The clip can only show what the rig recorded. | DoD-13's clip, if the outreach wasn't recorded. S-D3 then decides what the site shows instead. |
| 2 Nov, drafting (wave2-specs): post `P<n>` goes out as `BUILD S-D9-B<n>`, and the file names stay `P<n>`. | S-D8's spec puts every spec on one format. P1 to P3 are already live. | `posted.md` stays continuous, and `website` can trace every request. | One CLAUDE.md line, and the message form. |
| 2 Nov, drafting (wave2-specs): one clip request format for every spec, `CLIP <spec id>-C<n>`, answered with `CLIPPED` or `NO CLIP`. S-D10's line is valid as written, and S-D3's line counts as `S-D3-C1`. | Two specs need clips, and the interim brief defined no request. | One plain line, one reply, one queue. | The two neighbour specs' wording, if S-D9 changes the format. |
| 2 Nov, drafting (wave2-specs): the asking spec places its clip on the site. S-D9 hands over the file. | S-D3 sends `BUILD S-D3-B2` for the D3 clip, and S-D10 builds its own video. | One owner per site section, so there are no duplicate requests. | If S-D3 prefers it, S-D9 sends the BUILD instead. |
| 2 Nov, drafting (wave2-specs): clips are cut with ffmpeg into `clips\`, not with `find_clip.py --cut`. | `--cut` writes into `..\OBS\Processed\clips\`, the rig's folder (GIT.md), and blurring and captions need ffmpeg anyway. | Each folder stays with its owner. The `CLIPPED` reply names the real paths. | S-D10's spec says the clip finder writes to `..\OBS\Processed\clips\`; that line should say "the paths in S-D9's reply". |
| 2 Nov, drafting (wave2-specs): no research list of its own, only L-01. | L-01's R1, R3 and R4 cover legibility, personal data and how the site is received. | It keeps S1's budget for the specs that build. | S1 can still draft a list if L-01's wildcards find a gap. |
| 2 Nov, drafting (wave2-specs): its own posts use webcam only. Screen footage appears only in clips that a spec's DoD needs. | Alex's 2 Nov call: the site shows the webcam, not the screen share. DoD-13 and DoD-21 need the screen. | Screen footage is where secrets and the outbound live. | If he wants screen clips of demos in posts, add a frame check per post. |
| 2 Nov, drafting (wave2-specs): moments are tagged by role, never by person. The floor triggers at 100 minutes. | DI-1 Q1.9 gives the roles. DoD-20 caps gaps at two hours. | The stakeholder sections get material without naming anyone, and the floor leaves one check's margin. | Retagging, or one threshold. |
| 2 Nov, drafting (wave2-specs): one poke only, for the live-run session's /process. | Alex chooses when to process (DI-1 Q1.7), and only DoD-13 waits on it. | It respects his GPU call without nagging. | More pokes, if he wants them. |
| 2 Nov, drafting (wave2-specs): the six are blurred unless S-D3 reports that Alex lifted the blur. The gate's snapshot is the clip's SHA-256. | S-D3 sets the blur by default at its pre-send gate. Video never goes in git, and `Operator tasks\` is tracked. | It keeps one rule for the six across both specs, and freezes exactly what he approves. | A recut takes about 15 minutes. One snapshot line. |
| 2 Nov, drafting (wave2-specs): a handoff deletes the old cron job (`d3d4dcf3` at drafting) before stopping, and the successor starts its own `/loop 30m`. | The loop is a cron job in the session that set it. | Exactly one loop runs, so nothing posts twice. | None. |
