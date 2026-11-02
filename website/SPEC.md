# S-D8 Website: executable spec

Status: ready for its non-Addvery parts; the Addvery look is live (16:29); the six stakeholder pages wait for intake DI-9, released 16:46 · Row: S-D8 — Website · Folder: `website\` · Session: `website`

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
- **Part 2 is held.** It covers everything that needs his Addvery research: the Addvery branding, the six stakeholder sections, and anything drawn from `..\Addvery Research\`. It waits for decision intake DI-9 (`..\Operator tasks\Decide - the six stakeholder pages on the site.md`, released at 16:46 into the slot DI-7 freed; question 1 was answered by Alex directly).
  - That intake stays unreleased until his Addvery research lands. Then `wave2-specs` or `orchestration` releases it.
  - Once it's answered and its answers are applied to this file, `orchestration` sends `website`: `S-D8 part 2: the branding and stakeholder intake is answered and applied in SPEC.md; run §7 from step 7.`
  - From 18:00 Prague, any of its questions still unanswered takes its default, logged in §9.

| DI-9 question | Question | Default |
| --- | --- | --- |
| 1 | Addvery branding: when, and from what | **Answered by Alex directly at about 15:30** (§9): the site is cloned as closely as possible from Addvery's own website (design, branding, logos, icons, structure and motion), and the words stay his. Whoever releases the intake drops QXX.1 and renumbers nothing. |
| 2 | What each stakeholder section shows, and how public it is | Named and role-led: the person's name and public title, a note on what the project means for that role, and the demos and moments for that role, under the content rule in §7. Public only after that person has had notice. No photo, and nothing about them beyond name and title. |
| 3 | What drawn from `..\Addvery Research\` may be committed to the public repo | Nothing. The brand values and the section text sit in the git-ignored `local\` folder, which still deploys. |
| 4 | When he reviews the stakeholder sections | As soon as the draft is ready. About 10 minutes, with the recording paused. |
| 5 | Who writes the note in each section (L-01 Q6, Q24) | The agents draft two lines per person, and he rewrites each in his own words at the review. All six get one framing unless he says otherwise. |
| 6 | What the site leads with (L-01 Q7, Q9) | The systems demos first (GetSales, scraping, the clip-to-site analyser), with the content work after them as his own hand. |
| 7 | What happens to the sections on a no (L-01 Q16) | Any person's objection takes their section down at once. On a no from Addvery, the six come down and the rest stays as his public portfolio. |

The site's structure isn't asked: part 1 needs it now, and it follows Alex's 14:00 ask for a live feed (§9).

**Operator scenes.** Part 1 has none. Part 2 has one, off camera by default: approving what the six stakeholder sections show before they go live. It takes about 10 minutes, once the draft is ready (timetable: "when the six are confirmed"). DI-9 question 4 sets the slot, and whether the recording is paused.

Nothing else needs him. The Vercel and YouTube sign-ins already work, so there are no new keys or logins. YouTube caps each upload at 15 minutes until he verifies his channel. This spec doesn't ask about that; if another spec's preflight gets his answer, the upload flow follows it.

**Runtime questions** go to the desk under the asker name `website`, not `S-D8`, because the session's record is `..\answer-desk\qa\website.md`. Ids run from `website-Q4` onwards, since website-Q1 to website-Q3 are already used, and go one at a time. After 15 minutes, poke with `POKE website: waiting on you for <what>`, and poke again every 15 minutes. Before 18:00 Prague, keep waiting. From 18:00, decide on the default and log it in §9.

## 2. Spec contract

| Item | S-D8's answer |
| --- | --- |
| 1. Its place | Row S-D8 — Website. It claims three items:<br>• DoD-18: six stakeholder sections, in Addvery's branding, matching DoD-10's list.<br>• DoD-19: a deliverables view, kept getting clearer without Alex asking. Shared with S-D9.<br>• DoD-22: nothing published shows secrets, the Apify proposal or his own GetSales outbound. Shared with S-D9.<br>It serves DoD-8 (S-D1), DoD-13 (S-D3 and S-D9), DoD-15 (S-D5), DoD-17 (S-D7) and DoD-21 (S-D10) by hosting their site parts when they ask. It serves DoD-6 through the deliverables view. It reads DoD-10 and DoD-11 from `..\Addvery Research\`. |
| 2. Its neighbours | It depends on S0 (done), on S-D2 (Alex's own: the six and the brand capture) and on S-D9's requests. It runs in parallel with every wave-2 spec. It takes build requests from S-D1, S-D3, S-D4, S-D5, S-D7, S-D9 and S-D10, notices from S2 (`orchestration`) and clock lines from `rig`. S-D1 passes on Alex's answer about naming Apify. S-D3's rules set the D3 clip's blur. It feeds nothing downstream: the site is where the work shows. |
| 3. Operator preflight | §1 (DI-9). |
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
- `..\Operator tasks\Archive\Approve - the plan for the website.md`: Alex's answers to the website's plan and its definition of done (approved on its defaults at 17:03, on his instruction to clear his plate), verbatim. Read them for wording, never re-ask them.
- `..\Operator tasks\Archive\Approve - research for the GetSales demo and website.md`: Alex's answers to the GetSales and website research lists (withdrawn unticked at 17:03: research is done, so neither list runs), verbatim. Read them for wording, never re-ask them.
- `CLAUDE.md`: the session's standing duties (clock, video, deploys, Hobby limits). This spec extends it and never overrides it. The changes it needs are listed below.
- `SPEC.md`: this file. `HANDOFF.md`: the state after a fork, if it exists.
- `DECISIONS.md`: decisions taken before this spec. New ones go in §9.
- `..\research\DIRECTORY.md`: the index of research reports. `..\research\lists\L-01-parent.md`: S1's parent list. Read only; S1 owns it.
- Research findings: S2 adds a line here for each report when S1 sends FINDINGS for L-01 and the S-D8 list.
- **L-01 findings** (S1's parent research, approved by Alex as OT-01; added by S2 as C07): for this spec, read the synthesis first, then all seven, above all R3 section 7, R4, W2 (preview card, hand-over checklist C7), R1.
  - `..\research\global\L-01-synthesis.md`: S1's synthesis of the parent research: the strongest findings, recommendations per spec, and 24 one-line questions for Alex, each naming the spec it blocks. Start here: take this spec's section, and fold the questions that name it into your next gate. Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-R1-legibility.md`: making the work legible: outcome first, a short demo, a 3 to 4 step how-it-works; what reads as a toy or as noise; AI labels. Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-R2-gtm-engineer-hiring.md`: what a GTM engineer is hired to show, which deliverables fit it best, and the gaps none of them shows. Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-R3-personal-data.md`: personal data on a public site: GDPR, LinkedIn's terms, what the live run needs, and the safe, risky and keep-off table for stakeholder sections (section 7). Not legal advice. Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-R4-format-reception.md`: whether a site aimed at one employer lands: replies versus hires, when it turns creepy or self-indulgent, and the one small ask. Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-W1-wildcard-executed.md`: whether a dozen background sessions can run through the day and night: usage limits, Windows Update restarts, idle stops. Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-W2-wildcard-delivered.md`: what the six actually get from the alert: the link, the preview card, click timing, and the morning hand-over checklist (C7). Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-W3-wildcard-received.md`: whether AI-made work reads as skill or as a shortcut: the penalty bites on personal lines, not on the machinery. Options for Alex, not decisions. Read only; S1 owns it.
- `..\Addvery Research\`: Alex's own folder, git-ignored. Read it from the local disk only, never from GitHub, and never edit it. Nothing from it goes into a tracked file beyond what DI-9 question 3 allows. His confirmed six (DoD-10) and brand capture (DoD-11) land here when he's done (§7).
  - Files in it, as Alex's research session listed them at 15:33 (relayed by S-D1 as an OUTPUT line; added by S2 as C08). Read from disk only, never edit, never copy into a tracked file. A file marked expected doesn't exist yet: check for it, don't wait on it.
    - `..\Addvery Research\GetSales six.json` (Alex confirmed the six at 15:55): the six stakeholders, with a `confirmed_by_alex` flag. Only the six marked confirmed go anywhere near the site, and only as far as his gate on the stakeholder pages allows.
    - `..\Addvery Research\Brand capture.md`: Addvery's voice and visual identity, Alex's own brand capture. Still a draft: his review is pending, so treat it as provisional.
    - `..\Addvery Research\brand\raw\logo.png`: Addvery's logo, as Alex's research saved it. Never committed to a tracked file.
    - `..\Addvery Research\Org diagrams for the website.json`: Addvery's org by function and seniority, plus signals, as counts only, with no names. For the company research page (/d2); `addvery-research` sends that build request itself.
    - Alex's private briefing on the six: the files that part N5 of `..\Addvery Research\Scraping summary.md` lists as his decision-maker profiles and per-person notes. Read them for the stakeholder sections only once Alex has approved what those sections show; nothing from them is quoted, and their names stay out of tracked files.
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
| Every page of the site is in Addvery's visual identity, taken from his brand capture or as DI-9 question 1 decides. | DoD-18; reads DoD-11 |
| The deliverables view lists M0 to M2 and D1 to D10, each with a current status. A deliverable that S2 adds shows there within one build. | DoD-19; serves DoD-6 |
| `builds.md` lists every build request with its asker, what changed, and BUILT or REFUSED. The site's git history has a commit for each BUILT. Together they show the additions came from requests, not only from Alex. | DoD-19 |
| Every request from S-D1, S-D3, S-D4, S-D5, S-D7, S-D9 and S-D10 got BUILT or REFUSED, so their site parts are live: the D1 demo, the D3 clip, the blog with its three posts, the D7 demo and the Canva video. | serves DoD-8, DoD-13, DoD-15, DoD-17, DoD-21 |
| `checks.md` holds a publish check of the live site, every video it embeds, and `website\` in the repo. It runs at each forking gate and once more before the morning. It finds no secret, nothing on the Apify proposal or his own GetSales outbound, and nothing from `..\Addvery Research\` in a tracked file beyond what DI-9 question 3 allows. | DoD-22 |

## 6. Research step

At launch the session sends `s1-research` one line: `RESEARCH S-D8: a new S-D8 list (none drafted yet), plus L-01, for the site's structure, the stakeholder sections and the brand pass, needed by 16:30`. Approving the list is S1's gate. S1 may judge that L-01 already covers S-D8, through R1 (making the work legible), R3 (personal data on a public site) and R4 (whether the format lands), and just add S-D8 to its readers.

**Goes ahead while research runs:**
- everything in CLAUDE.md;
- all of part 1: the build requests, and the structure, which is cheap to change;
- in part 2, the brand pass, which depends on Alex's capture and the intake, not on research.

**Waits for FINDINGS.** The stakeholder sections go live only once L-01's R3 has landed, or once Alex has seen at the gate that it hasn't. If R3 isn't in when the six are confirmed, the session builds the draft anyway, and the gate task says R3 is still out. Alex decides (DI-5: he may soften the research rules when time is short).

The spec-draft gate (§7 step 6) goes out once L-01's synthesis lands, and blocks nothing in part 1. If the S-D8 list hasn't run by 17:00, the session sends the spec draft on L-01 alone, and says so in the task.

**Findings (15:05).** L-01 landed at about 15:00, R3 included, so the stakeholder sections no longer wait on research, only on Alex. S1 kept a separate S-D8 list, L-06, which waits on Alex's gate "Approve - research for the GetSales demo and website" (OT-03). The spec-draft gate goes out on L-01 alone and says so. If L-06 reports later, step 5 runs again for its findings. The synthesis's S-D8 section (recommendations 8.1 to 8.16) and its questions that name S-D8 are routed like this:
- **Done before the revision:** 8.1, the preview card (S-D3-B3). 8.2, the notice page `/privacy` (S-D3-B3 and B4). Analytics went on at Alex's direct request at 15:00 (website-Q4), aggregate only, which answers Q17 and 8.10.
- **Taken into the method below:** 8.3 (the demo page template), 8.4 and 8.5 (the stakeholder content rule and publication order), 8.9 (the deliverables view), 8.13 (the hand-over checklist), 8.15 (no errors or TODO in public) and X.4 (numbers carry a source).
- **Asked elsewhere, and the site follows the answer:** Q8 and Q18 (whether the site shows the orchestration layer, and how it frames AI) are on S-D9's gate "Approve - the plan for the site's build updates" (OT-05). Q11 and Q12 (what tonight's visitors see, and which URL the alert carries) are on S-D3's pre-send gate.
- **Added to the part 2 intake (Appendix A):** Q2 and Q24 (named or role-titled sections, how public, one framing or weighted), Q6 (who writes each note), Q7 and Q9 (what the site leads with, and for which employer type), and Q16 (what happens to the sections on a no, and whether the site doubles as his portfolio).
- **Decided on a default, changeable at the spec-draft gate (§9):** Q15 (stay on Hobby and keep service-selling language off the site), Q20 (the "not affiliated with Addvery" line, which the spec already plans and `/privacy` already carries) and Q23 (no cold read by outsiders unless Alex names readers).

## 7. Methodology and steps

**Methodology, revised at 15:05 on L-01's findings (§6).** The draft was confirmed and extended. The revisions are marked "(L-01)", and the coherency check is at the end of this section.

- **Structure** (part 1: feed and pages, §9).
  - The home page stays as Alex asked: the countdown, the "start here" box, then the feed, newest first.
  - Each demo gets its own page once it has content (`/d1` and so on). The page is announced by a feed post and linked from the `status` post.
  - Each video a spec places, such as the D3 clip or the Canva video, gets its own page, built from the asker's BUILD with the clip S-D9 cut.
  - The blog lives at `/blog`, with a page for each post (S-D4-B1).
  - In part 2, each stakeholder gets a page. Six links go in the "start here" box once those pages are live.
  - Pages read from content files, so a build request changes content rather than code wherever it can.
  - (L-01, R1's converged order) Every demo page follows one template, unless its asker's content says otherwise:
    - an outcome line framed around the reader's problem, not the tool;
    - a demo of 2 minutes or less, with the result in the first seconds;
    - a "how it works" in 3 to 4 steps;
    - the detail behind a toggle;
    - a short card: the problem, how it was solved, the result, and what broke.
  - (L-01, W2 C7 item 1) Until the hand-over, the top of the home page stays as Alex asked. At the hand-over it reads as finished: no live countdown and no "Begins", and it says where the six sections are. Intake question 6 sets what leads.
  - (L-01, 8.15 and X.4) Nothing public carries an error, a broken link or a "TODO". Every number has a source, or is labelled as a projection.
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
  - (L-01, R3 §7 and R4 rec 1) **The content rule** is R3's table:
    - **Safe:** the role and what Alex would build for it ("what I'd do for your function"), and company-level facts from Addvery's own public channels.
    - **Risky but acceptable:** the name and current title, with notice first and one-click removal. So is a short, attributed and linked paraphrase of a public professional statement.
    - **Kept off:** photos, verbatim LinkedIn posts or screenshots, career history beyond the current role, contact details, personality or "buyer type" profiles, special-category data, connections-only content, and anything about their reaction to the outreach.
  - Each section carries one line: why it exists, where every fact came from, and "ask and it's removed". It's sourced from company-published material and the role, not LinkedIn.
  - Two editorial checks before the gate (R4 recs 4, 6 and 7):
    - its point is clear in about ten seconds, with one small ask;
    - it would still be useful to its reader if Alex weren't applying, and it doesn't pass verdict on how they run things.
  - (L-01, R3 §4 and rec 1) **Publication order:** no section goes public before its person has had notice, that is, before the alert's first message linking `/privacy` has gone to them. Question 2 can pick unlisted `noindex` pages instead.
  - They go live only on his approval at the gate (step 8), never on a default.
  - Once they're live, the session sends `s-d9-legibility` the six roles, never the names, so moments sorted by role can be added.
- **Deliverables view.** This is the feed's `status` post. It lists M0 to M2 and D1 to D10, each with a status. S-D9's posts and the specs' own build requests refresh it. (L-01, R1 §6 and 8.9) Done items go first, statuses are in plain words, and the not-started rows never read as a wall. A notice from `orchestration` about a new or changed deliverable is built like a request, and the reply is `BUILT C<nn>: <what changed>`.
- **Publish check** (DoD-22).
  - Fetch every page of the live site and look for:
    - secret patterns;
    - the Apify proposal;
    - Alex's GetSales outbound;
    - Apify's name, until S-D1 passes on his go-ahead.
  - Confirm every embedded video is webcam footage or one of the allowed screen recordings (§3, CLAUDE.md change 5). The D3 clip must show the six blurred, unless Alex lifted the blur at S-D3's pre-send gate.
  - Scan the tracked tree read-only with `git grep -l` for key and token patterns. Print file names only, never what matched.
  - (L-01, W2 and 8.15) Check, logged out:
    - the production alias loads, with no Vercel login and no 503;
    - the preview card's `og:image` resolves on the alias;
    - no public page carries an error, a broken link or "TODO";
    - `/privacy` matches its asker's current text.
  - Log the result in `checks.md`.
  - A hit in another folder goes to its owner and to `orchestration`. A hit on the site comes down at once.

- **Hand-over checklist** (L-01, W2 C7). The last publish check before the morning cleanup runs this list and logs it in `checks.md`:
  1. The top of the page reads as finished.
  2. The six sections are live, or the page says plainly why not.
  3. The production alias serves the final deployment, checked logged out on a phone-sized window.
  4. The preview card is right. Post Inspector needs Alex's LinkedIn session, so that check is his or is skipped.
  5. Every embedded video plays logged out.
  6. The last deploy came from the working tree with the git-ignored `local\` files present.
  7. The publish check is clean.
  8. `origin/main` equals local `main` (the watcher's push).
- **Analytics** (Alex, 15:00: "turn on analytics of this site pls"). Vercel Web Analytics, aggregate and cookieless, disclosed on `/privacy`. No per-person tracking links (R4 rec 9, 8.10). Read it with `vercel api /v1/query/web-analytics/visits/count` and the team id, because the Vercel MCP returns "not found" for this team.

**Coherency check (15:05): "if we execute this methodology, will the DoD be satisfied?"**
- **DoD-18:** yes, once Alex's six are confirmed and he approves the draft at the gate. Two things are open. A role-titled answer to question 2 needs S2 to confirm it meets "a section for each of the six" (R3 §7 trap). The gate can't close after 18:00 on a default, so DoD-18 may close in the morning (§9).
- **DoD-19:** yes. `builds.md` already shows additions from S-D9, S-D3 and orchestration as well as Alex, and the deliverables view is kept current.
- **DoD-22:** yes. The publish check covers the site, the videos and `website\`, and now also the card, `/privacy` and logged-out loads. One open point: W2 and R3 read the D3 clip as sitting inside DoD-22's "own GetSales outbound" ban unless it's redacted. S-D3's rules set the blur, and its gate carries the call.
- **Served items** (DoD-8, 13, 15, 17, 21): yes, as far as their askers send BUILDs. Each demo page now follows R1's template.
- No step depends on something no one produces.

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
| 2 Nov 15:00, closes website-Q4: Vercel Web Analytics is on, aggregate and cookieless, with no per-person tracking links. `/privacy` discloses it (S-D3-B4). | Alex, relayed by the previous `website` session: "turn on analytics of this site pls". The synthesis (8.10, R4 rec 9) says aggregate only, disclosed. | It answers whether anyone visits, and it doesn't track the six. | Turning it off takes one CLI command and removing `<Analytics />`. Per-person links would need his explicit say. |
| 2 Nov 15:00, S-D3-B3: the preview card is a static `app\opengraph-image.png` rendered in the site's look, and `metadataBase` is the production alias. `/privacy` is unlinked and `noindex` until Alex ticks S-D3's pre-send gate. | The request asked for a static PNG. LinkedIn caches cards for days, so the card carries no times and no names. W2: never a deployment URL. | The card is the first thing the six see, and it stays true all day. | A new card means replacing one PNG and redeploying. LinkedIn may keep showing the old one for up to about a week. |
| 2 Nov 15:05, step 5: the methodology takes L-01's findings. These are the demo page template (R1), the stakeholder content rule and publication order (R3 §7, R4), the deliverables view ordering (R1 §6), the hand-over checklist (W2 C7), and the publish check's logged-out, card, error and TODO checks. | The research landed at 15:00, and the spec says to revise on FINDINGS. Each item is either assistant-actionable or a default that Alex sees at the spec-draft gate. | It applies the converged findings without spending Alex's time. The calls that are his stay with him (Appendix A). | Text in §7 only. Any item he changes at the gate is one paragraph. |
| 2 Nov 15:05, L-01 Q15 (Hobby plan): stay on Hobby, and keep service-selling language off the site. | W2 C5. The site is a job application, not a service offer, and Pro costs money. Alex is swamped. | It keeps the site within Hobby's non-commercial terms at no cost. | If Vercel pauses the project, the site is down until he upgrades. Moving to Pro is one dashboard step. |
| 2 Nov 15:05, L-01 Q20: no question needed for the "not affiliated with Addvery" line. The brand pass already adds it, and `/privacy` already says it. | It was decided at drafting (the brand-pass row above). | Nobody needs to ask twice. | None. |
| 2 Nov 15:05, L-01 Q23: no cold read by outsiders unless Alex names readers at the spec-draft gate. | Only Alex can pick the readers, and a cold read needs people outside the project. | It costs him nothing unless he wants it. | One hand-over step, if he names readers. |
| 2 Nov 15:05, routing L-01's S-D8 questions. Q8 and Q18 stay with S-D9's OT-05, and Q11 and Q12 with S-D3's pre-send gate. Q2, Q6, Q7, Q9, Q16 and Q24 go into the held intake, which now holds seven questions. | `s-d9-legibility` asked first and asked not to duplicate. S-D3's gate already carries the alert questions. `orchestration` (C07): "the synthesis questions that name S-D8 belong in your part 2 intake". | Each question reaches Alex once, in the file that decides it. | Moving a question means editing one intake. |
| 2 Nov 15:05: the spec-draft gate goes out on L-01 alone. S1's S-D8 list, L-06, waits on Alex's OT-03. | §6: "If the S-D8 list hasn't run by 17:00, the session sends the spec draft on L-01 alone". The gate blocks nothing in part 1, so sending it early costs nothing. | Alex sees the plan while he's still at the computer. | If L-06 changes the method, step 5 runs again and the gate snapshot is refreshed. |
| 2 Nov ~15:30, Alex directly, closes intake question 1: the brand pass starts now, taken from Addvery's own website rather than his brand capture. In his words: "Our website is going to be as cloned as possible to the Addvery website... You can use their branding, their logos, their icons, everything", "all the design, branding, style, and structure is going to come from their website", motions included ("when an image rotates when it becomes in frames"), "If what we have so far doesn't naturally fit in one of their sections, don't try to just create that section". The feed stays the home page, and each deliverable gets its own page. Run as a subagent fan-out: brand kit, frontend and motion, deliverable pages. Then a re-skin. Orchestration holds other requests until 16:30. Disclaimer, on Alex's word just after (verbatim: "I would do it once and only once... above the top menu bar... in red once at the top of the top menu bar and then everything else normal. That's enough disclaimer"): one brief red line above the top menu bar saying it's an unofficial job application by Alex Alderman, not affiliated with Addvery, and no other disclaimers. The menu bar and logo below it work as on their site. On assets he said: "they're public. Fine if you want to do it that way... git ignore it... Don't block anything." The raw scrape (`.addvery-scrape\`) is never committed or deployed. Addvery's own logo, icon and image files (`public\addvery\`) are git-ignored but deploy. The tokens and the site code are committed. | His direct instruction, and the brand pass needed no gate of its own. A site in another company's exact look could pass for theirs, and the decision log already requires the plain "not Addvery's site" line. Intake question 3 (what goes in the public repo) is still open, so the conservative split keeps their copyrighted files and source out of git. | It does what he asked at full fidelity, without misleading anyone about whose site it is. | If he wants their files in the repo, remove one `.gitignore` line and commit. Deploys must come from the working tree (W2 B5.3, hand-over checklist item 6). |
| 2 Nov ~15:50, Appendix A release: Alex's brand capture landed (`Addvery Research\Brand capture.md`), which meets the release rule. The session still holds the intake until his six are confirmed (`GetSales six.json` with `confirmed_by_alex`), or until he says he's done. | Question 1 (branding), the only one the capture bears on, was answered directly at about 15:30. Questions 2 to 7 are all about the six stakeholder pages, which can't be built before the six are confirmed. Alex is co-writing his research live, and orchestration asked for no interruptions until 16:30. | It doesn't take his focus for questions nothing can act on yet (P4). | The intake reaches him when the six land. If he wants it sooner, it's one file and one TASK line. |
| 2 Nov ~16:00, the reskin's motion: desktop follows Addvery's Webflow values exactly (rotate-in from -20°, -10° and +8°, a 100 px slide-up, and 600 to 1000 ms durations). Phones get a lighter version (40 px, rotation capped at 8°) instead of Addvery's no motion below 992 px, and reduced motion gets none. | Alex wants "their motions" and says the site "needs to work on both mobile and PC". Addvery itself switches motion off on phones. | It keeps the feel on phones without hurting readability. | Two values in `app\motion.tsx`. |
| 2 Nov ~16:25, addvery-research-B1 on `/d2`: the growth plan goes in as a short paraphrase attributed to Addvery's Chief Growth Officer's public LinkedIn posts, with no name, no quote and no embed. The site-gap list is reframed as "What Alex would set up first". The AI's per-function "likely doing outreach" rating and the Chief Growth Officer's start date stay off the page. | Alex: the hackathon is addressed to Ivana, who posted the 1B CZK goal, and he replied that he'd help; she answered "let's find out how to make it possible". R3 rates a short, attributed paraphrase of a public professional statement as acceptable. A per-function AI rating of five role-identifiable leaders is the profiling R3 keeps off, and the gap list reads as fixing their business in public unless framed as his plan (R4 rec 7). | It shows Ivana that her own public goal was read and built for, without profiling anyone. | One data file (`local\org-diagrams.json`). Adding either left-off item back is one field. |
| 2 Nov 17:22, RESTART to-do 1: `sync_docs.py` drops every wording redaction and its word deny list. It now refuses to write only when something shaped like a secret (a key or token pattern) appears, printing file and line, never the match. | Alex's reset rule 3 (17:00): public sources are fine, and the only hard exclusions are DoD-22's three. DoD-22 as narrowed (`b5cb6fd`) says the charter and specs may name them; neither holds the proposal's or his outbound's text. | The site's copies now match the repo, and nobody has to add a redaction each time a spec mentions the proposal or a person. | One script. Putting a wording redaction back is one line in it, then a rerun and deploy. |
| 2 Nov 17:40, DI-9 decided by orchestration on Alex's instruction ("If things are an easy judgment please clear the plate for me. We can just make edits later."), defaults taken, and the simpler option wherever a default existed only for sensitivity: Q9.2 (a) named and role-led, live unlinked and `noindex` (Alex sends each link himself, so notice comes with the link). Q9.3 (a) instead of (b): the approved page text is committed (it moves from git-ignored `local\` to the tracked tree when the pages go live). Q9.4: no separate review or paused recording; the review is Alex's edit of the Claude Doc "Six stakeholder pages: text for your edit" (https://claude.ai/artifact/Abm1SeTTDwAEV4qBb55YtY), and his comment is the sign-off. Q9.5 (a) agents draft, he rewrites in the Doc. Q9.6 (a) systems first. Q9.7 (a) on a no, the six come down and the rest stays. The profiles' "likely objections" stay off every page. The /d2 trims stay (the per-function AI outreach rating is profiling; the start date adds nothing). D4's slots are remapped (ceo: 3, 9, 1; growth, cofounder-2 and delivery take demo 5). Ivana's ask now points at their meeting on Tuesday 3 Nov (Q10.5), and "two days ago" is gone. A shared "About me" line takes only what Q10.2 to Q10.4 state (B1-B2 Czech, long-term residence, trade licence, employee or freelance or both). Going live waits on Q10.10, relayed by orchestration (default: live now, unlinked). | Reset rules 1 to 3 (17:00): easy calls are the session's, no plan approvals, public sources fine, and only DoD-22's three exclusions are hard. Q9.3 (b) and Q9.4's paused review existed only to keep the six out of public view. | It clears DI-9 off Alex's plate and leaves him one surface (the Doc) for the words that are his. | A page is one entry in the stakeholders file; taking all six down is one flag and a deploy. Uncommitting the text after it lands needs a history rewrite, which the public repo would still have cached. |

## Appendix A. Held preflight intake

This spec's preflight intake is drafted but not yet in front of Alex (Alex, 14:38: "i'm swamped we need to remove blockers"; orchestration: at most two wave-2 preflight intakes open at once, none new while he's on his Addvery research). **Release it when** Alex's Addvery research has his six confirmed stakeholders (DoD-10) or his brand capture (DoD-11) in `..\Addvery Research\`, or Alex says he's done with that research for now, whichever comes first. Whoever releases it (`wave2-specs` while it runs, then this spec's session if it's running, otherwise `orchestration`): take the next free DI number from the `Intake id:` lines in `..\Operator tasks\` and `..\Operator tasks\Archive\`, replace `XX` in the forms `DI-XX`, `QXX.`, `AXX.` and `a-XX-` with it, and save the text below as `..\Operator tasks\Decide - branding and stakeholder pages on the site.md`. Recheck any times in it against the clock first. Commit it path-limited, put the DI number into §1 and the status line, and send `answer-desk` `TASK S-D8: Decide - branding and stakeholder pages on the site.md is waiting on you: <what it decides and unblocks>`.

~~~~markdown
---
System Primitive: Intake file
Intake State: Waiting on operator
Intake id: DI-XX
Created: 2026-11-02
Build goals: []
---

<!-- File name: "Decide - branding and stakeholder pages on the site.md" -->

# Decide: Addvery's branding and the six stakeholder pages on the site

## What this is

The website is the end result of today's hackathon: a personalised job application to Addvery, built live over a 12-hour recorded session. Right now it's a build-in-public page. It has the countdown, a "start here" box with your explainer video and the project's plan, and a live feed of updates with the newest on top. Two things will turn it into an application to Addvery: Addvery's look, and a page for each of Addvery's six key stakeholders. Both come from your own Addvery research, which is why you're only seeing this now that your research is in.

You're asked seven things: how the branding is applied, what each stakeholder page shows and how public it is, what may go into the public code repository, when you review the six pages, who writes the note on each page, what the site leads with, and what happens to the pages if Addvery says no. The research on personal data and on how this kind of application lands came back at 15:00, and questions 2, 5, 6 and 7 carry what it found.

Once you answer, the website session applies Addvery's look across the site and builds the six pages on a private preview. Nothing about the six people goes live until you've approved it in a separate check of about 10 minutes, and that check happens off camera by default.

The rest of the site doesn't wait on this: the feed, the blog, the demo pages and the videos keep going. Only the branding and the six pages wait. Answering takes about 15 minutes, and nothing here needs you on camera. Please answer before 18:00 Prague; from then, any empty answer takes its default.

This intake holds 7 decisions. Each one carries its own context, so you can answer them in any order. An empty fence means not answered. Say "DI-XX is ready" when you're done.

# QXX.1 Addvery's branding: what to take from your brand capture

The project's charter describes the goal as "one live website, in Addvery's branding, that works as a highly personalized outreach job application". The finish line you signed off this morning says: "The live site, in Addvery's branding, has a section for each of the six stakeholders". Today the site has its own look, not Addvery's. Your brand capture, covering Addvery's voice and visual identity, is in your Addvery Research folder.

Your options:

- **A. Visual identity only.** Colours, type, logo use and spacing go onto every page in one pass, which takes the website session about an hour. The words stay in your voice, because this is your application to them, not their site.
- **B. Visual identity and voice.** The same as A, plus the headings and copy are rewritten in Addvery's voice. The site reads more like their own, but it may read as if Addvery wrote it.
- **C. Something else.** Say what.

I recommend A. An application in their look but in your words reads as you talking to them.

Whichever you pick, the brand pass goes live without its own approval step. You'll see it on the live site and can ask for changes through the question desk. The site will also carry one plain line saying it's your job application, not Addvery's own site.

If the fence is empty: before 18:00 Prague the session keeps waiting and pokes you every 15 minutes; from 18:00 it takes A and logs it.

This answer affects the look of every page, and every section added later.

Write A, B, or C and what you want instead.

## AXX.1

`<operator_answer>`
```a-XX-1

```
`</operator_answer>`

# QXX.2 What each stakeholder page shows, and how public it is

The site gets a page for each of the six stakeholders you confirmed in your Addvery Research folder. The site is public, so anyone with the link can read it, and the six are real people. Yesterday you named the roles, "RevOps, CSO, CMO, CEO, CTO, CAIO, COO", and said "finds and sorting clips and messaging by stakeholder is the assistants job".

The project's research on personal data came back at 15:00. It isn't legal advice. What it found:
- No regulator guidance covers a site with pages about several named employees.
- The safest pages are built around the role, what you'd build for it, and the company's own public material.
- A name and current job title are acceptable if the person has had notice first and can have the page removed in one click.
- Photos, LinkedIn posts or screenshots, career history, contact details and personality profiles stay off.

A second study, on how this kind of application lands, found that "what I'd do for your function" pages with their sources shown read as impressive. Profiles of the person read as creepy.

So whatever you pick, every page carries one line: why it exists, where its facts came from, and "ask and it's removed". Its point should be clear in about ten seconds, with one small ask. You approve each page's actual content before it goes live, and nothing goes live on a default.

Your options:

- **A. Named, role-led, public after notice.** Each page shows:
  - the person's name and public job title;
  - a short note on what this project means for their role;
  - the demos that matter most to that role;
  - moments from the recordings sorted to that role, added as they come in.

  A page goes public only after that person has had the alert's first message, which links the privacy notice. No photo, and nothing about them beyond their name and title.
- **B. Roles only, no names.** Each page is titled by role, for example "For the CMO", with A's content, and no names appear anywhere on the site. It's the lowest risk. Whether it counts as "a section for each of the six" would need the orchestration session to confirm.
- **C. A private page per person.** A's content on an unlisted page per person that search engines don't index, sent only to them, plus a public role-titled version as in B.
- **D. Unlocked on a yes.** A role-titled placeholder for each person that opens into their named page once they say yes to the outreach.
- **E. Something else.** Say what. That includes a person-led page with photos and their priorities, which the research rates as the most personal and the riskiest.

I recommend A. Each page is addressed to its reader by name, which is the point of a personalised application, and it stays inside the research's "acceptable" row: name and title only, notice first, one-click removal.

By default all six pages get the same framing. If some of the six are much more hands-on with AI than others, say so in the fence, and their pages lean on the machinery more.

In every option, the pages never show the messages sent to the six in the GetSales outreach, or how anyone reacted to them. Those stay in a folder that's kept out of the repository, and nothing from it reaches the site. The pages also never show anything you mark private in your folder.

If the fence is empty: before 18:00 Prague the session keeps waiting and pokes you every 15 minutes; from 18:00 it takes A and logs it. The pages still wait for your approval of their content.

This answer affects the six pages, when each goes public, and which recording moments get sorted to them.

Write A, B, C, D, or E and what you want instead.

## AXX.2

`<operator_answer>`
```a-XX-2

```
`</operator_answer>`

# QXX.3 What may go into the public code repository

When you kept your Addvery Research folder out of the repository, you said: "it'll be getting ignored from the public repo so we're not posting, even though it's public information inside". The site draws on that folder in two ways. The branding puts Addvery's colours, fonts and logo into the site's code, and the stakeholder pages put text drawn from your research into the site's content.

This isn't the question you answered at 14:20, about the charter's mentions already in the repository. You said leave those. This one is about new files the site will add.

The site deploys straight from your computer, not from GitHub, so a file can be on the live site without being in the repository. The repository is public, and its history keeps anything ever committed, even after it's deleted. The live site is public either way.

Your options:

- **A. Whatever goes live may be committed.** The brand values go in the code and the approved page text goes in content files. This is the simplest option, and the repository alone can rebuild the site. Your research notes themselves never go in.
- **B. Nothing drawn from your folder is committed.** The brand values and the page text sit in a local folder that's kept out of the repository but still deploys. The repository alone can't rebuild the site in Addvery's look.
- **C. The brand values are committed, the page text is not.** The look is what Addvery shows on its own public site anyway. The text about the six people is the personal part, so it stays local.
- **D. Something else.** Say what.

I recommend C. It keeps the people out of the repository, which is what your answer about the folder was about, without hiding a colour palette.

In every option, the approval file for the six pages shows you the full draft in place, through an embed of a local file, without copying the people's details into the repository.

If the fence is empty: before 18:00 Prague the session keeps waiting and pokes you every 15 minutes; from 18:00 it takes B, the closest to your answer about the folder, and logs it.

This answer affects where the brand and page files live, and what the public repository shows tomorrow.

Write A, B, C, or D and what you want instead.

## AXX.3

`<operator_answer>`
```a-XX-3

```
`</operator_answer>`

# QXX.4 When you review the six stakeholder pages

The website session builds the six pages on a private preview, not on the live site. It then puts an approval file in your Operator tasks folder and alerts you through the question desk. The file shows a short summary first, then the full draft in place. The review takes about 10 minutes.

The charter's risk rule says to "assume anything on screen can be published". The draft may hold things you strike, and the screen recording keeps whatever was on screen.

Your options:

- **A. As soon as the draft is ready, with the recording paused.** Type /pause, review, then type /pause again to resume. About 10 minutes, off camera.
- **B. As soon as the draft is ready, on camera.** The review becomes part of the build story. Nothing about the six gets posted from it, but the raw recording keeps whatever was on screen.
- **C. Together with the brand review at 16:45 to 17:00**, if the draft is ready by then. If not, the same as A.
- **D. Tomorrow morning, with the cleanup session.** The pages stay off the live site until then.
- **E. Something else.** Say what.

I recommend A. A draft about six real people is exactly what the risk rule is about, and 10 paused minutes take nothing away from the build story.

If the fence is empty: before 18:00 Prague the session keeps waiting and pokes you every 15 minutes; from 18:00 it takes A and logs it. From 18:00, a review you haven't done stays open for the morning, and the pages stay off the live site.

This answer affects when the six pages can go live, and whether the review is on camera.

Write A, B, C, D, or E and what you want instead.

## AXX.4

`<operator_answer>`
```a-XX-4

```
`</operator_answer>`

# QXX.5 Who writes the note on each stakeholder page

Each of the six pages has a short note on what this project means for that person's role. The research on how AI-made work is received came back at 15:00. Visible AI use reads as skill in the machinery: the scraping, the routing, the pipeline. It costs trust in personal lines, and that cost survived honest disclosure. These notes are the most personal text on the site.

Your options:

- **A. The agents draft, you rewrite.** The agents draft two lines per person from the role and the company's public material. You rewrite each one in your own words during the 10-minute review, which adds about 10 minutes.
- **B. You write them from scratch.** About 2 minutes each, at the review.
- **C. The agents write them, and you approve them as they are.** This is the fastest, and the research says it's the riskiest for trust.
- **D. Something else.** Say what.

I recommend A. The lines end up in your voice, and you don't start from a blank page.

If the fence is empty: before 18:00 Prague the session keeps waiting and pokes you every 15 minutes; from 18:00 it takes A and logs it. Nothing goes live before your review either way.

This answer affects the six notes, and how long the review takes.

Write A, B, C, or D and what you want instead.

## AXX.5

`<operator_answer>`
```a-XX-5

```
`</operator_answer>`

# QXX.6 What the site leads with

Once the six pages are live, the top of the site becomes the application rather than the build-in-public feed. The research on what a GTM engineer is hired to show found that employers look for someone who builds systems that find accounts, enrich them, personalise outreach and route leads, shown in a short recorded walkthrough. Among today's demos, the strongest fits are the GetSales outbound demo, then the scraping research demo, then the analyser that turns your recordings into site posts. The Canva templates and the Canva video matched no GTM job post, but they're the clearest proof of your own hand and taste. Only you know whether Addvery hires like an agency or an in-house team, and whether the role leans to the pipeline or the data.

Your options:

- **A. Systems first.** The GetSales demo, the scraping demo and the analyser lead. The blog, LinkedIn and Canva work follow, framed as your own hand and as an AI content pipeline.
- **B. All ten demos carry equal weight,** in the order they were planned.
- **C. Something else.** Say what, for example a different lead for an agency.

I recommend A. It puts first what the research says this role is hired for.

If you want the headline tuned, add "agency" or "in-house", and "pipeline" or "data", in the fence.

If the fence is empty: before 18:00 Prague the session keeps waiting and pokes you every 15 minutes; from 18:00 it takes A and logs it.

This answer affects the top of the site and the order of the demo pages.

Write A, B, or C and what you want instead.

## AXX.6

`<operator_answer>`
```a-XX-6

```
`</operator_answer>`

# QXX.7 What happens to the six pages if Addvery says no

The site will carry pages about six real people. Under data protection law, if any of them objects, their page has to come down. That part isn't a choice. The research on this kind of application found that the upside is split between the company it targets and everyone else who sees the work, so it's worth deciding in advance what happens on a no.

Your options:

- **A. On a no, the six come down and the rest stays.** Remove the six pages, and keep the rest of the site as your public portfolio.
- **B. On a no, the pages lose their names.** Each page becomes role-titled ("For the CMO"), and the site stays up as it is.
- **C. On a no, the whole site comes down.**
- **D. Something else.** Say what.

In every option, a single person's request takes their own page down at once.

I recommend A. It respects the six, and keeps the work visible to everyone else.

If the fence is empty: before 18:00 Prague the session keeps waiting and pokes you every 15 minutes; from 18:00 it takes A and logs it.

This answer affects the hand-over, and what the site is after the application.

Write A, B, C, or D and what you want instead.

## AXX.7

`<operator_answer>`
```a-XX-7

```
`</operator_answer>`
~~~~
