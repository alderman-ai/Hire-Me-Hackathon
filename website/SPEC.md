# S-D8 Website: executable spec

Status: ready for its non-Addvery parts; Addvery-dependent parts wait for intake DI-XX, held until Alex's Addvery research lands · Row: S-D8 — Website · Folder: `website\` · Session: `website`

This spec runs the live site, https://hire-me-hackathon.vercel.app. The site is the project's one outcome: a site in Addvery's branding that works as Alex's outreach job application, with a section for each of Addvery's six key stakeholders. Its readers are those six and anyone following the build.

The `website` session already runs the site under its CLAUDE.md. Since Alex asked at about 14:00 ("like a live feed where new posts go on top"), the home page has been a live feed: the countdown, a "start here" box, then posts newest first. This spec makes that work formal and adds four things:

- the structure as the demos arrive;
- the Addvery branding;
- the six stakeholder sections;
- one request format that every spec uses to ask for site work.

Nothing goes on the site except through this session.

## 1. Operator preflight (P3)

**A launch gate in two parts.** This follows orchestration's call on Alex's instruction at 14:38: "i'm swamped we need to remove blockers". The session is already running. Its CLAUDE.md work (the clock, the feed, webcam uploads, S-D9's build requests) carries on throughout.

- **Part 1 is ready now.** It covers everything that doesn't need Alex's Addvery research:
  - the live feed, and the deliverables view (its `status` post);
  - the `BUILD` request format;
  - the blog route;
  - preview deployments;
  - the video pages fed by S-D9's clips;
  - the publish check.

  It needs nothing from Alex. `orchestration` sends `website` one line: `Read SPEC.md in your folder: you are now the S-D8 spec orchestrator. Run part 1 now (§7 steps 1 to 6); the Addvery parts wait for its intake. Everything in your CLAUDE.md carries on.`
- **Part 2 is held.** It covers everything that needs his Addvery research: the Addvery branding, the six stakeholder sections, and anything drawn from `..\Addvery Research\`. It waits for decision intake DI-XX (`..\Operator tasks\Decide - branding and stakeholder pages on the site.md`).
  - That intake stays unreleased until his Addvery research lands. Then `wave2-specs` or `orchestration` releases it.
  - Once it's answered and its answers are applied to this file, `orchestration` sends `website`: `S-D8 part 2: the branding and stakeholder intake is answered and applied in SPEC.md; run §7 from step 7.`
  - From 18:00 Prague, any of its questions still unanswered takes its default, logged in §9.

| DI-XX question | Question | Default |
| --- | --- | --- |
| 1 | Addvery branding: when, and from what | Visual identity only, from his brand capture, applied in one pass. The words stay in his voice. |
| 2 | What each stakeholder section shows | Role-led: the person's name and public title, a note from him on what the project means for that role, and the demos and moments for that role. No photo, and nothing about them beyond name and title. |
| 3 | What drawn from `..\Addvery Research\` may be committed to the public repo | Nothing. The brand values and the section text sit in the git-ignored `local\` folder, which still deploys. |
| 4 | When he reviews the stakeholder sections | As soon as the draft is ready. About 10 minutes, with the recording paused. |

The site's structure isn't asked: part 1 needs it now, and it follows Alex's 14:00 ask for a live feed (§9).

**Operator scenes.** Part 1 has none. Part 2 has one, off camera by default: approving what the six stakeholder sections show before they go live. It takes about 10 minutes, once the draft is ready (timetable: "when the six are confirmed"). DI-XX question 4 sets the slot, and whether the recording is paused.

Nothing else needs him. The Vercel and YouTube sign-ins already work, so there are no new keys or logins. YouTube caps each upload at 15 minutes until he verifies his channel. This spec doesn't ask about that; if another spec's preflight gets his answer, the upload flow follows it.

**Runtime questions** go to the desk under the asker name `website`, not `S-D8`, because the session's record is `..\answer-desk\qa\website.md`. Ids run from `website-Q4` onwards, since website-Q1 to website-Q3 are already used, and go one at a time. After 15 minutes, poke with `POKE website: waiting on you for <what>`, and poke again every 15 minutes. Before 18:00 Prague, keep waiting. From 18:00, decide on the default and log it in §9.

## 2. Spec contract

| Item | S-D8's answer |
| --- | --- |
| 1. Its place | Row S-D8 — Website. It claims three items:<br>• DoD-18: six stakeholder sections, in Addvery's branding, matching DoD-10's list.<br>• DoD-19: a deliverables view, kept getting clearer without Alex asking. Shared with S-D9.<br>• DoD-22: nothing published shows secrets, the Apify proposal or his own GetSales outbound. Shared with S-D9.<br>It serves DoD-8 (S-D1), DoD-13 (S-D3 and S-D9), DoD-15 (S-D5), DoD-17 (S-D7) and DoD-21 (S-D10) by hosting their site parts when they ask. It serves DoD-6 through the deliverables view. It reads DoD-10 and DoD-11 from `..\Addvery Research\`. |
| 2. Its neighbours | It depends on S0 (done), on S-D2 (Alex's own: the six and the brand capture) and on S-D9's requests. It runs in parallel with every wave-2 spec. It takes build requests from S-D1, S-D3, S-D4, S-D5, S-D7, S-D9 and S-D10, notices from S2 (`orchestration`) and clock lines from `rig`. S-D1 passes on Alex's answer about naming Apify. S-D3's rules set the D3 clip's blur. It feeds nothing downstream: the site is where the work shows. |
| 3. Operator preflight | §1 (DI-XX). |
| 4. Decision log | §9. |
| 5. Forking gates | §8. |
| 6. Working directory | `website\`, session `website`. The reading list is §3. |

## 3. Routing and resources

Paths are relative to `website\`. Step 1 of the run (§7) confirms each resource is reachable, and turns anything ambiguous into a desk question. Inputs that other specs produce later are named in the steps that use them.

- `..\CHARTER.md`: the parent context. Read it with the Read tool and never edit it.
- `..\SESSIONS.md`: the roster. Message sessions only by these names, and edit only `website`'s row.
- `..\GIT.md`: the shared working tree. Commit only `website\`, path-limited.
- `..\answer-desk\ASKING.md`: the desk format, gate approvals, TASK lines, the poke and the 18:00 rule.
- `..\answer-desk\qa\website.md`: every question this session has asked Alex, with his answers.
- `..\Operator tasks\Archive\INDEX.md`: Alex's earlier answers. Never ask again what they settle.
- `CLAUDE.md`: the session's standing duties (clock, video, deploys, Hobby limits). This spec extends it and never overrides it. The changes it needs are listed below.
- `SPEC.md`: this file. `HANDOFF.md`: the state after a fork, if it exists.
- `DECISIONS.md`: decisions taken before this spec. New ones go in §9.
- `..\research\DIRECTORY.md`: the index of research reports. `..\research\lists\L-01-parent.md`: S1's parent list. Read only; S1 owns it.
- Research findings: S2 adds a line here for each report when S1 sends FINDINGS for L-01 and the S-D8 list.
- `..\Addvery Research\`: Alex's own folder, git-ignored. Read it from the local disk only, never from GitHub, and never edit it. Nothing from it goes into a tracked file beyond what DI-XX question 3 allows. His confirmed six (DoD-10) and brand capture (DoD-11) land here when he's done (§7).
- `content\feed.json`: the feed, newest first. Its post kinds are Status, Update, Milestone, Insight, Session and Explainer. The post with id `status` is the deliverables view, and a status update moves it back to the top.
- `content\docs\` and `scripts\sync_docs.py`: the "start here" box's copies of the charter and the S0 to S2 specs. The script redacts them and refuses to write if a deny-listed term survives.
- `content\videos.json`: YouTube ids for the session videos.
- `app\`: the site's pages.
- `scripts\clock_sync.py` and `scripts\upload_webcam.py`: the clock, and the YouTube upload flow (unlisted, through the rig's sign-in).
- `.env.local`: the Blob token. Never print it.
- `..\OBS\hackathon_clock.json` and `..\OBS\Processed\index.json`: the rig's state, for the clock and webcam uploads. Read only, because `rig` owns `..\OBS\`. Each filed session's manifest is `..\OBS\Processed\S*\manifest.json`.
- `D:\OBS Outputs\Uploaded\`: the recordings. Read only. Never host video on Vercel or Blob.
- `..\legibility\posts\` and `..\legibility\do-not-post.md`: S-D9's post content and Alex's takedown list. Read only.
- The specs that send build requests. Read only the lines about site work:
  - `..\legibility\SPEC.md`
  - `..\scraping\SPEC.md`
  - `..\getsales\SPEC.md`: the D3 clip blurs the six by default
  - `..\blog-pipeline\SPEC.md`
  - `..\blog-articles\SPEC.md`
  - `..\linkedin-content\SPEC.md`
  - `..\canva-video\SPEC.md`
- `..\orchestration\_templates\Gate approval template.md` and `..\orchestration\check_gate.py`: the gate task and its 5-minute check.
- Tools:
  - the Vercel CLI from this folder: `vercel deploy --prod --yes` for production, and `vercel deploy` for a preview;
  - the Vercel MCP, for read-only checks;
  - `npx next dev -p 3100`, for local checks.
- https://hire-me-hackathon.vercel.app: the live site.

**Outputs** (created by this spec):
- `builds.md`: every build request and its reply.
- `checks.md`: the publish checks.
- `HANDOFF.md`.
- A git-ignored `local\` folder: `brand.css`, `stakeholders.json`, and `stakeholders-draft.md` for the gate's embed. It's used wherever question 3 keeps material out of the repo, and `local/` is added to `.gitignore`.
- New pages under `app\`, and posts in `content\feed.json`.
- Gate tasks in `..\Operator tasks\`, each named `Approve - <what, in plain words>.md`: "Approve - what the six stakeholder pages show" and "Approve - the plan for the website".
- `website`'s row in `..\SESSIONS.md`.

**CLAUDE.md changes this spec needs.** `orchestration` makes them; this session edits no CLAUDE.md.
1. Reading list: add `SPEC.md` and `HANDOFF.md` after the charter, then `..\GIT.md`, `..\answer-desk\ASKING.md`, `..\Operator tasks\Archive\INDEX.md` and `..\research\DIRECTORY.md`.
2. Team: the session runs spec S-D8 (`SPEC.md`).
3. Replace "Alex brings over specs from other sessions when there's site work to do" with: every spec asks for site work with `BUILD <spec id>-B<n>` (SPEC.md §7).
4. "Build requests from `s-d9-legibility`": make the rule apply to every spec, and point to SPEC.md §7 for the format, the id mapping and the refusal grounds. Point the stakeholder sentence to SPEC.md §7 step 8.
5. Video: the featured video is gone. The site uses webcam footage, except for three screen recordings:
   - the D3 live-run clip, which DoD-13 needs;
   - the Canva design video, which DoD-21 needs;
   - a screen cut for the D10 video, only if Alex picks it in S-D10's intake.
6. "What the site shows": now the countdown, the "start here" box and the feed. Also add "The forking gates are in SPEC.md §8."

## 4. Problem and scope

**Problem.** The site is where Addvery sees the work. Today it shows the build in public: a countdown, a "start here" box (the S02 explainer, plus the charter and the S0 to S2 specs, redacted), and a live feed of status, milestones, session moments and insights. The deliverables view is the feed's `status` post.

It isn't an application to Addvery yet. It has no Addvery branding, no stakeholder sections, and no room for the demos that other specs deliver today. Those specs and S2 need one way to ask for site work, and one session that decides what goes live.

**In scope.**
- The site's structure as it grows: feed and pages (§9).
- Addvery's branding on every page, from Alex's brand capture (DoD-11).
- Six stakeholder sections from his confirmed list (DoD-10). They go live only after he approves what they show.
- The deliverables view, kept current from S-D9's posts and S2's notices.
- Building every `BUILD` request, or refusing it on the grounds in §7. That covers the blog, preview deployments, and the uploads of the videos askers name.
- Everything CLAUDE.md already does: the clock, the feed and the deploys.
- The publish check for the site and for `website\` (DoD-22).

**Out of scope.**
- Building the demos. Each spec builds its own content in its own folder, and this session puts it on the site.
- Research about Addvery, which is Alex's own (DI-3 Q3.3).
- Real data on the site, except two things: what the D3 live run on the six stakeholders shows (charter, Scope), and the six sections he approves.
- Sending anything, and anyone else's LinkedIn account (charter, Scope).
- Paid Vercel features (the site is on the Hobby plan), video on Vercel or Blob, and any other folder's files.

## 5. Definition of done

| Criterion | Traces to |
| --- | --- |
| The live site has six stakeholder sections, one for each person on Alex's confirmed list in `..\Addvery Research\`. Each shows only what his gate approval allowed. | DoD-18 |
| Every page of the site is in Addvery's visual identity, taken from his brand capture or as DI-XX question 1 decides. | DoD-18; reads DoD-11 |
| The deliverables view lists M0 to M2 and D1 to D10, each with a current status. A deliverable that S2 adds shows there within one build. | DoD-19; serves DoD-6 |
| `builds.md` lists every build request with its asker, what changed, and BUILT or REFUSED. The site's git history has a commit for each BUILT. Together they show the additions came from requests, not only from Alex. | DoD-19 |
| Every request from S-D1, S-D3, S-D4, S-D5, S-D7, S-D9 and S-D10 got BUILT or REFUSED, so their site parts are live: the D1 demo, the D3 clip, the blog with its three posts, the D7 demo and the Canva video. | serves DoD-8, DoD-13, DoD-15, DoD-17, DoD-21 |
| `checks.md` holds a publish check of the live site, every video it embeds, and `website\` in the repo. It runs at each forking gate and once more before the morning. It finds no secret, nothing on the Apify proposal or his own GetSales outbound, and nothing from `..\Addvery Research\` in a tracked file beyond what DI-XX question 3 allows. | DoD-22 |

## 6. Research step

At launch the session sends `s1-research` one line: `RESEARCH S-D8: a new S-D8 list (none drafted yet), plus L-01, for the site's structure, the stakeholder sections and the brand pass, needed by 16:30`. Approving the list is S1's gate. S1 may judge that L-01 already covers S-D8, through R1 (making the work legible), R3 (personal data on a public site) and R4 (whether the format lands), and just add S-D8 to its readers.

**Goes ahead while research runs:**
- everything in CLAUDE.md;
- all of part 1: the build requests, and the structure, which is cheap to change;
- in part 2, the brand pass, which depends on Alex's capture and the intake, not on research.

**Waits for FINDINGS.** The stakeholder sections go live only once L-01's R3 has landed, or once Alex has seen at the gate that it hasn't. If R3 isn't in when the six are confirmed, the session builds the draft anyway, and the gate task says R3 is still out. Alex decides (DI-5: he may soften the research rules when time is short).

The spec-draft gate (§7 step 6) goes out once L-01's synthesis lands, and blocks nothing in part 1. If the S-D8 list hasn't run by 17:00, the session sends the spec draft on L-01 alone, and says so in the task.

## 7. Methodology and steps

**Draft methodology.** The session confirms or revises it once the synthesis lands. It then runs the coherency check: "if we execute this methodology, will that DoD be satisfied?"

- **Structure** (part 1: feed and pages, §9).
  - The home page stays as Alex asked: the countdown, the "start here" box, then the feed, newest first.
  - Each demo gets its own page once it has content (`/d1` and so on). The page is announced by a feed post and linked from the `status` post.
  - Each video a spec places, such as the D3 clip or the Canva video, gets its own page, built from the asker's BUILD with the clip S-D9 cut.
  - The blog lives at `/blog`, with a page for each post (S-D4-B1).
  - In part 2, each stakeholder gets a page. Six links go in the "start here" box once those pages are live.
  - Pages read from content files, so a build request changes content rather than code wherever it can.
  - Once a wave-2 spec's spec-draft gate is approved, the session may add its page to the spec pages through `scripts\sync_docs.py` and its deny-list.
- **Brand pass** (part 2, question 1).
  - Every 30 minutes, the session checks `..\Addvery Research\` for the brand capture.
  - When the capture is there, the session reads its visual identity: colours, type, logo use and spacing. It applies them to every page in one pass as design tokens, checks the result locally and deploys.
  - The words stay in Alex's voice.
  - The pass has no gate of its own. Alex sees it live and can ask for a change through the desk.
  - The site carries one plain line saying it's Alex's job application, not Addvery's own site.
  - If question 3 keeps brand values out of the repo, the tokens sit in `local\brand.css`, which is git-ignored and still deploys.
  - Every section added later is built in the brand. Until the capture lands, the site keeps its current look.
- **Stakeholder sections** (part 2, questions 2, 3 and 4).
  - The same 30-minute check looks for the six marked confirmed (DoD-10).
  - When they are, the session builds the six sections to question 2's answer, on the local preview only. The content sits in the git-ignored `local\stakeholders.json`, with the same text written out for review in `local\stakeholders-draft.md`, unless question 3 allows it in the repo.
  - The sections never show the live run's messages or anything from `..\getsales\live\`. That folder is S-D3's git-ignored folder, and this session never reads it.
  - The sections also never show anything Alex marks private, or anything on `..\legibility\do-not-post.md`.
  - They go live only on his approval at the gate (step 8), never on a default.
  - Once they're live, the session sends `s-d9-legibility` the six roles, never the names, so moments sorted by role can be added.
- **Deliverables view.** This is the feed's `status` post. It lists M0 to M2 and D1 to D10, each with a status. S-D9's posts and the specs' own build requests refresh it. A notice from `orchestration` about a new or changed deliverable is built like a request, and the reply is `BUILT C<nn>: <what changed>`.
- **Publish check** (DoD-22).
  - Fetch every page of the live site and look for:
    - secret patterns;
    - the Apify proposal;
    - Alex's GetSales outbound;
    - Apify's name, until S-D1 passes on his go-ahead.
  - Confirm every embedded video is webcam footage or one of the allowed screen recordings (§3, CLAUDE.md change 5). The D3 clip must show the six blurred, unless Alex lifted the blur at S-D3's pre-send gate.
  - Scan the tracked tree read-only with `git grep -l` for key and token patterns. Print file names only, never what matched.
  - Log the result in `checks.md`.
  - A hit in another folder goes to its owner and to `orchestration`. A hit on the site comes down at once.

**How every spec asks for site work.** This extends CLAUDE.md's rule for S-D9 to every spec.
- **The request.** A spec asks with one message: `BUILD <spec id>-B<n>: <what to add or change, and where on the page>. Content: <folder>\<file>. Source: <what it shows>.` The content lives in the asker's own folder.
- **The reply.** The session builds the change, checks it locally (`npx next dev -p 3100`) and deploys. It commits `[website] BUILD <spec id>-B<n>: <what changed>`, logs the request in `builds.md`, and replies `BUILT <spec id>-B<n>: <what changed>`. If it can't build it, it replies `REFUSED <spec id>-B<n>: <why>`.
- **One at a time.** Each asker sends one request and waits for the reply before the next. The session works requests in arrival order across askers. During the operator window it aims to reply within 30 minutes.
- **Kinds of request it accepts**, besides content and sections:
  - a blog: a `/blog` index and post pages (S-D4-B1);
  - a preview deployment, not production, with its URL in the reply (`vercel deploy`), so Alex can review something before it goes live;
  - an upload to YouTube, unlisted, through this session's upload flow (`scripts\upload_webcam.py`, extended to take any video file a request names).
- **Clips** cut from the rig recordings come from S-D9 (`s-d9-legibility`), which the asker asks with `CLIP` (S-D9's spec). The asker then sends the BUILD that places the clip. For example, S-D3 sends `S-D3-B2` for the D3 clip.
- **Grounds for REFUSED:**
  - anything the risk rule forbids: secrets, the Apify proposal, Alex's own GetSales outbound;
  - material from `..\Addvery Research\`, except the approved stakeholder sections and any request that quotes Alex's answer allowing it (as S-D7's requests built on his brand capture will);
  - anything from `..\getsales\live\`, or the six stakeholders' names anywhere but the approved sections;
  - anything on `..\legibility\do-not-post.md`;
  - naming Apify before S-D1 passes on Alex's answer to its DI-6 question 3;
  - a screen recording other than those §3 allows;
  - content outside the asker's own folder;
  - a video that would be hosted on Vercel or Blob.

  A refusal says what to change, so the asker can resend.
- **Removals.** `REMOVE <spec id>-B<n>` takes an addition down and deploys. If Alex says something overshares, take it down at once and tell its asker.
- **Ids.** S-D9's earlier ids, `P1` to `P3`, count as `S-D9-B1` to `S-D9-B3`. From now on, its post `P<n>` is sent as `S-D9-B<n>`. Additions the session makes on its own initiative, such as Insight posts, are logged in `builds.md` with the asker `website`.

**Steps.**
1. Read the reading list and confirm each resource is reachable:
   - the clock loop is alive;
   - the Vercel CLI deploys, both production and preview;
   - the local preview runs;
   - a file in the git-ignored `local\` reaches the deploy upload, so `.vercelignore` doesn't drop it.

   Turn anything ambiguous into a desk question. Update `website`'s row in `..\SESSIONS.md` to "runs S-D8 (SPEC.md) since <time>", in a `[roster]` commit, path-limited. Create `builds.md`, backfilled with three groups of entries:
   - S-D9-B1 to S-D9-B3, built at 13:50, 13:55 and 14:20;
   - Alex's direct requests, such as the 14:00 live feed;
   - the session's own Insight posts.

   Create `checks.md`. Commit.
2. Send the RESEARCH line (§6).
3. Build the part 1 structure: keep the `status` post current, and add each demo page, video page and the blog route as its request arrives. Delegate page work to a subagent, handing it `app\`, `content\`, this section and the request (P7). Check locally, deploy and commit.
4. Serve build requests throughout, as described above, with one commit per BUILT. That includes preview deployments and YouTube uploads.
5. **Post-research.** When FINDINGS land, revise the methodology and run the coherency check. Send any post-research questions to the desk, one at a time.
6. **Spec-draft gate.** This blocks nothing in part 1.
   - Freeze this whole SPEC.md into `..\Operator tasks\Approve - the plan for the website.md`: the problem, the scope, its own DoD, the research verdicts and the methodology.
     - The file opens with `## What this is` in plain words, with no codes.
     - Its OT id goes in the front matter only: use the next free OT number, and check `..\Operator tasks\` and its `Archive\` just before writing.
   - Commit it first, path-limited. Then send `answer-desk` the line `TASK website: Approve - the plan for the website.md is waiting on you: the website's plan and its definition of done`.
   - Wait with Monitor, running `python -I orchestration\check_gate.py "Operator tasks\Approve - the plan for the website.md"` from the repo root every 300 seconds, until it exits 0. Poke after 15 minutes, and every 15 minutes after that.
   - On CHANGES, apply them, refresh the snapshot and wait again. Then send `TASK DONE website: Approve - the plan for the website.md` to `answer-desk`, and `ARCHIVE Approve - the plan for the website.md: readers website` to `orchestration`.
   - Alex approves the spec's own DoD here. From 18:00, if the gate is still open, proceed on the coherency-checked methodology and log that in §9.
7. **Part 2 starts** on `orchestration`'s part 2 line. Start the 30-minute check of `..\Addvery Research\`, with Monitor or `/loop 30m`.
   - When the brand capture is there, run the brand pass through a subagent, handing it the capture's visual-identity part and `local\brand.css` (P7). Check, deploy and commit.
   - When the six are confirmed, go to step 8.
8. **Stakeholder gate (DoD-18).**
   - Build the six sections on the local preview.
   - Write `..\Operator tasks\Approve - what the six stakeholder pages show.md` from the gate template. Its OT id goes in the front matter only, as in step 6.
   - It opens with `## What this is`, in plain words with no codes: what the site is, what the six pages are for, what goes live once he ticks, that nothing goes live before that, that it takes about 10 minutes, and the 18:00 rule.
   - Under "What's being approved", it puts a five-line plain summary first. It covers the section structure, the six roles, what each section shows and leaves out, whether the personal-data research has landed, and the local preview's address.
   - Then it embeds the whole draft with `![[website/local/stakeholders-draft.md]]`. The Obsidian vault is the repo root, so Alex reads the draft in place, and the people's details never enter the tracked file. `Snapshot of` names that draft and its SHA-256, not a commit.
   - Commit the task file first, path-limited. Then send `answer-desk` the line `TASK website: Approve - what the six stakeholder pages show.md is waiting on you: what the six stakeholder sections show before they go live`.
   - Keep the preview running. Wait with Monitor, running `python -I orchestration\check_gate.py "Operator tasks\Approve - what the six stakeholder pages show.md"` from the repo root every 300 seconds, until it exits 0. Poke after 15 minutes, and every 15 minutes after that.
   - On CHANGES, apply them, refresh the draft and its hash, and wait again.
   - On APPROVED, deploy and commit: the code always, the content only as question 3 allows. Send `TASK DONE website: Approve - what the six stakeholder pages show.md` to `answer-desk`, and `ARCHIVE Approve - what the six stakeholder pages show.md: readers website` to `orchestration`.
   - From 18:00, an open task stays open for the morning cleanup session, and the sections stay off the live site.
9. Run the publish check at every forking gate, and once more after the night's last build. Log it in `checks.md` and commit.
10. Screen care, throughout: assume anything on screen can be published. Never show `.env.local`, the Blob token, or Vercel's token or account pages. Start background processes hidden. If question 4 says so, open the stakeholder preview only while the recording is paused.
11. Commit after every finished step, path-limited: `git commit -m "[website] <message>" -- website/...`. Don't push.
12. When §5 is met, send `orchestration` the line `DONE S-D8: <evidence, one line>`, for example `DONE S-D8: six stakeholder sections live (approved by Alex), site in Addvery's brand, builds.md shows <n> BUILT, publish check clean at <time>`. Then keep serving build requests until the morning cleanup session.

## 8. Forking gates (P8)

| Gate | When |
| --- | --- |
| F1 | The stakeholder sections are live, so DoD-18 is met. |
| F2 | Shortly before 18:00 Prague (about 17:50), so the overnight session starts clean (P6). |
| F3 | Context is about half full, whatever else is happening. |

**How it forks.**
1. Finish the build in hand. Write `HANDOFF.md` and commit it. It holds:
   - the state of the site and of each gate task, with times;
   - the build queue, and any request in flight;
   - the `website-Q` open on the desk, with when it was sent and the last poke;
   - the clock loop's pid, and whether the stakeholder preview must keep running;
   - every decision since the last fork.
2. From `website\`, launch the successor under the same name: `claude --bg -n website "Read CLAUDE.md, then HANDOFF.md. You are now the active S-D8 session."`
3. Update `website`'s row in `..\SESSIONS.md` with the handoff time, in a `[roster]` commit, path-limited.
4. Send this to `rig`, `s-d9-legibility` and every asker with a request open, and to `answer-desk` if a question is on the desk: `HANDOFF website, <time>: a fresh session has taken over under the same name. Re-send anything that got no reply since <time>.`
5. The old session stops itself with `claude stop <its own session id>`. The clock loop is a separate process, so it keeps running.

## 9. Decision log (P5)

Before 18:00 Prague, a passed deadline means poke, not decide. From 18:00, the active session decides on the default, logs it here and sends `WITHDRAW <id>` for a desk question. Each decision starts with the time and the question id it closes.

| Decision | Justification | Why it's the right call | Blast radius if changed |
| --- | --- | --- | --- |
| 2 Nov, drafting (wave2-specs): the asker stays `website`, with runtime ids from `website-Q4`, not `S-D8`. | The session's desk record is `answer-desk\qa\website.md`, which already holds website-Q1 to website-Q3. | One asker keeps one record, and nobody's address changes. | Only the asker name. A switch would split the record. |
| 2 Nov, drafting (wave2-specs): every spec uses one request format, `BUILD <spec id>-B<n>`. S-D9's `P1` to `P3` count as `S-D9-B1` to `S-D9-B3`. | Seven specs and S2 will ask for site work, and `BUILD <id>` doesn't say who asked. | It keeps S-D9's format, and `builds.md` traces every addition to its asker (DoD-19). | `builds.md`, and one line in the legibility CLAUDE.md. |
| 2 Nov, drafting (wave2-specs): refusal grounds are added beyond CLAUDE.md's two:<br>• from the brief: content outside the asker's folder, and video on Vercel or Blob;<br>• from S-D3: `getsales\live\`, and the six's names;<br>• from S-D1: Apify's name before his DI-6 answer;<br>• from his webcam-only call: unapproved screen recordings.<br>Requests that quote his answer get an exception to the `Addvery Research\` rule. | The neighbouring specs set these rules for their own material. S-D7 needs a way to show brand-capture work he allowed. | They keep the site within its neighbours' privacy rules, and his own answers can still override. | One CLAUDE.md line. A refused asker resends with the fix. The Apify ground lapses once S-D1 passes on a yes. |
| 2 Nov, drafting (wave2-specs): preview deployments are an accepted request, and the reply carries the URL. | S-D4 has Alex review the test post before anything goes live. | Nothing unfinished reaches the live site. | One more kind of deploy. Previews may ask for his Vercel login. |
| 2 Nov, drafting (wave2-specs): the brand pass ships without a gate of its own. | DoD-18 asks for the branding, not for a sign-off. The brand sign-offs belong to S-D6 and S-D7. | It keeps his gate count low (P4), and he sees the result live. | One more gate task, if he wants one. |
| 2 Nov, drafting (wave2-specs): once the site is in Addvery's branding, it says plainly that it's Alex's job application, not Addvery's own site. | A site in another company's branding could pass for theirs. | The charter frames it as an outreach job application from him. | One line in the layout. |
| 2 Nov, drafting (wave2-specs): the stakeholder gate embeds the git-ignored draft with `![[website/local/stakeholders-draft.md]]` under "What's being approved", after a five-line plain summary. `Snapshot of` holds the draft's SHA-256, not a commit. | Alex's readability rule wants everything in front of him. `Operator tasks\` is tracked and the repo is public, and the Obsidian vault is the repo root. | He reads the whole draft in place, and the six never enter the repo. | One task's layout. If question 3 allows the text in the repo, copy it in and use a commit as usual. |
| 2 Nov, wave2-specs, on Alex's 14:38 instruction to remove blockers: a launch gate in two parts. Part 1, everything that doesn't need his Addvery research, runs now. Part 2, the branding and the six sections, waits for its intake, which is held until his research lands. | Alex: "i'm swamped we need to remove blockers". His focus is his Addvery research. | Most of the site's work never needed him, so it shouldn't wait on him. | The order of steps only. Nothing in part 2 goes live without his answers. |
| 2 Nov, wave2-specs: the structure is decided, not asked. The feed stays the home page, and demos, videos, the blog and, in part 2, the stakeholders get their own pages. | Part 1 needs a structure now. Alex asked for the feed at 14:00. The intake is held, and he's swamped. | It keeps his feed and gives every demo a stable link. | If he wants a stakeholders-first home page later, only the top of the home page changes. |
| 2 Nov, drafting (wave2-specs): the stakeholder sections never go live on a default, even after 18:00. | They name six real people, and CLAUDE.md says they "follow Alex's say on what goes live". | The brief keeps any sign-off the DoD requires open for the morning session. | DoD-18 may close in the morning. |
| 2 Nov, drafting (wave2-specs): the repo scan prints file names only, and new decisions go here, with `DECISIONS.md` kept as history. | The user's rule is never to print secrets. The spec contract puts the decision log in the spec. | It finds files without exposing secrets, and keeps one log from now on. | None. |
| 2 Nov, drafting (wave2-specs): the session asks S1 for its own list, though L-01 may cover most of it. | S1 hasn't drafted an S-D8 list, and the brief has every spec ask. | S1 decides whether a list is worth the usage. | One list more or less. |
