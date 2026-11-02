# Session roster

The official name of every session in this project. Sessions message each other by these names with SendMessage, so use them exactly as written here. A name that isn't on this list isn't a session to rely on.

Read this file at startup, and again before you message a session you haven't messaged yet.

## Rules

- **Launch a session only under its roster name:** `cd` into its folder, then `claude --bg -n <name> "<prompt>"`.
- **Keep the roster current.** Whoever launches, renames, forks or stops a session updates its row in the same step and commits this file on its own, path-limited (`git commit -m "[roster] ..." -- SESSIONS.md`). This is the one root file every session may edit, and only its own rows.
- **A handoff keeps the name** (charter P8). The fresh session takes over under the same name, so nobody's address changes. Note the handoff time in its row.
- **One session per roster name, always: the old one is ended for good** (Alex, 2 Nov: "the only things that exist are the sessions with the canonical names in the registry ... I should just always see a session there with plenty of context"). Every handoff runs these steps, in order, and the orchestration session checks them:
  1. The outgoing session writes its handoff note (what's in flight, what's next) where its spec says.
  2. Launch the successor from the same folder under the same name, with a prompt that tells it to read that note and its CLAUDE.md: `claude --bg -n <name> "<prompt>"`.
  3. Confirm the successor is live: `claude agents --json` shows a `background` row with that name, the new id, and the right folder.
  4. End the old one by its exact id: `claude stop <old id>`, then `claude rm <old id>`. `rm` takes it out of agent view and keeps its transcript on disk, so nothing is lost. A stopped session left in agent view is a trap: opening it resumes it, and two sessions answer to one name.
  5. Check that exactly one session carries the name (`claude agents --json --all`), then put the new id and the handoff time in its row, and commit the roster.
  A session can't remove itself once it has stopped, so whoever launches the successor (normally `orchestration`) runs step 4. Temporary sessions (forks, builders) are stopped and removed the same way when their job ends, and their rows are deleted.
- **Folder names carry no spec prefix; session names may** (Alex, DI-2 Q2.1). The table below is the link between a spec, its folder and its session.
- **Adding a working folder:** create its `CLAUDE.md`, add its row here, then run `python orchestration\sync_claude_excludes.py` from the repo root. That gives the new folder its `.claude\settings.json`, so its session loads only its own CLAUDE.md, and adds the new folder to every sister's exclusions. The root already excludes every child.

## Running

| Session | Folder it starts in | Role | Notes |
| --- | --- | --- | --- |
| `orchestration` | repo root | Master orchestrator: owns the dependency map, launches and hands off every session, watches every session's context (the two sub-orchestrators included), and runs S2 (`orchestration\SPEC.md`). Since about 18:55 on 2 Nov Alex doesn't talk to it: he works with `orch-site-map` and `orch-alex-prep`. Its own files live in `orchestration\`. | Handed over to a fresh session (edd8f64b) at 14:44 Prague on 2 Nov, at forking gate F2; then to ab58b0bf at 16:44 (F2, with F1 and F3 merged in). ab58b0bf stopped and removed edd8f64b at 16:45; one `orchestration` row left. Then to cc2ff5a3 at 18:47 (F2, context); cc2ff5a3 stopped and removed ab58b0bf at 18:49; one `orchestration` row left. Then to e41f29c0 at 20:13 (full refresh after the crash, 365k tokens); e41f29c0 stopped and removed cc2ff5a3 at 20:13; one `orchestration` row left. Then to e0e1d9d2 at 21:52 (context watch: ROT at about 440k tokens); e0e1d9d2 stops and removes e41f29c0. |
| `orch-site-map` | `site-map\` | Sub-orchestrator for the site's layout and structure: owns the scope map (the mockup artifact), decides which piece goes on which page, sends build requests to `website` and copy requests to `s-d7-linkedin-content`, and marks what's missing from Alex in blue for `orch-alex-prep`. Alex talks to it directly. Not in the charter. | Launched by `orchestration`, 2 Nov 18:56, at Alex's request to split orchestration in three (session 56eaaeda). Refreshed after the crash (Alex): fresh session 5a971503 at 20:11; orchestration removed 56eaaeda. |
| `orch-alex-prep` | `alex-prep\` | Sub-orchestrator that fills every box needing Alex: preps him for each recording (GetSales demos 1 and 2, the clip-grading video, the Canva video), sign-off and review; runs the clip grading with `s-d9-legibility`; keeps `Open tasks.md`. Alex talks to it directly. Not in the charter. | Launched by `orchestration`, 2 Nov 18:56, at Alex's request to split orchestration in three (session 23b97210). Refreshed after the crash (Alex): fresh session 759cb6b8 at 20:11; orchestration removed 23b97210. |
| `website` | `website\` | The Vercel site (S-D8). | Runs S-D8 (SPEC.md) since 14:50. Handed off to a fresh session (b25f14b0) at 14:53 (gate F3), then to 54c2d301 at 17:27 (orchestration's RESTART). Refreshed after the crash (Alex): fresh session 2d36e96a at 20:11; orchestration removed 54c2d301. Refreshed at 504k tokens (context watch): fresh session 91fdba88 at 21:49 from website\HANDOFF.md (6c9e08d); orchestration stopped and removed 2d36e96a at 21:48; one `website` row left. |
| `rig` | `OBS\` | The OBS recording rig: /start, /pause, /stop, /process. | |
| `orch-briefing` | `briefing\` | Sub-orchestrator that monitors everything: Alex's status session, and his answer to "what should I do next?" (one clear next action, then two). Answers from the collector's snapshots, `Open tasks.md` and the scope map; messages only `orch-alex-prep`, `orch-site-map` and `orchestration`, when something is missed. Not in the charter. | Launched 2 Nov as `briefing`. Renamed `orch-briefing` at Alex's request (about 18:58) and relaunched as session 4edd3638 at 18:59; orchestration stopped and removed the old `briefing` (3bedb282). Refreshed after the crash (Alex): fresh session 8bc2476e at 20:11; orchestration removed 4edd3638. |

## Paused

Alex, about 20:06 on 2 Nov, after the 19:4x crash: "I mostly just want the main orchestration session, the three sub-orchestration sessions, website, and rig for now. I think everything else can pause because I don't think the work they're doing is going to survive much contact with my editing." These rows are out of agent view. Their transcripts are kept, and each folder's STATUS.md says what's there. Don't message them and don't resume them unless Alex asks; the context watch skips them.

| Session | Folder | Role | Paused |
| --- | --- | --- | --- |
| `answer-desk` | `answer-desk\` | Every question for Alex, one at a time; the poke. | Paused 20:06 on 2 Nov (Alex, after the crash). Last session 8e527d21. Resume from its folder with `claude --resume 8e527d21-4c65-49a6-bda3-0fb22e7f8521 --bg`, or launch fresh from its HANDOFF.md and STATUS.md. |
| `watcher` | `watcher\` | Hourly git sweep and push. | Paused 20:06 on 2 Nov (Alex, after the crash). Last session edd5ef30. Resume from its folder with `claude --resume edd5ef30-114a-4011-981b-3e12146a8b09 --bg`, or launch fresh from its HANDOFF.md and STATUS.md. |
| `s-d9-legibility` | `legibility\` | S-D9 Legibility analyzer: finds what's worth showing followers in the filed rig sessions and the project, and sends `website` build requests. Runs on `legibility\SPEC.md` since 14:51 (the interim brief is background). | Paused 20:06 on 2 Nov (Alex, after the crash). Last session dcde8889. Resume from its folder with `claude --resume dcde8889-5534-4fa9-97ff-b98273307eab --bg`, or launch fresh from its HANDOFF.md and STATUS.md. |
| `s1-research` | `research\` | S1 Research: sets the research method and fills the research reading list with Alex, within the usage budget. | Paused 20:06 on 2 Nov (Alex, after the crash). Last session 054f3f52. Resume from its folder with `claude --resume 054f3f52-9d94-4fe1-934d-971bcc02cfd3 --bg`, or launch fresh from its HANDOFF.md and STATUS.md. |
| `s-d1-scraping` | `scraping\` | S-D1 Scraping research demo: presents Alex's own scraping and research on the site, now approved with changes (OT-12): a carousel of his research artifacts first. Also runs S-D12 Agent view (C17): the generator that builds the site's agent track (unlisted Markdown pages and /llms.txt) from its content files, for `website`'s person/agent toggle. | Paused 20:06 on 2 Nov (Alex, after the crash). Last session bbc4d635. Resume from its folder with `claude --resume bbc4d635-4e09-4e24-92ed-d708f7aa2ed5 --bg`, or launch fresh from its HANDOFF.md and STATUS.md. |
| `addvery-research` | `Addvery Research\` | Alex's own Addvery research session: the company, its six key people and its brand capture. He works with it directly; it has no spec. The folder is git-ignored. | Paused 20:06 on 2 Nov (Alex, after the crash). Last session e0c6cc64. Resume from its folder with `claude --resume e0c6cc64-1039-411a-a7bd-2060fc502e89 --bg`, or launch fresh from its HANDOFF.md and STATUS.md. |
| `s-d3-getsales` | `getsales\` | S-D3 GetSales outbound demo: the 36 ICP × EN/CS/DE × tactic workflows in a GetSales folder apart from Alex's own (never started, no leads), and two blog-style demo entries (A10.7, C14): a 3-minute walkthrough (classification tools, the 36, the one variable) and a short capture of leads classified into ICPs. Alex sends the alert to the six himself. | Paused 20:06 on 2 Nov (Alex, after the crash). Last session 2a7fc2a1. Resume from its folder with `claude --resume 2a7fc2a1-b72a-4692-ab70-b4ff011fcad1 --bg`, or launch fresh from its HANDOFF.md and STATUS.md. |
| `s-d6-canva-templates` | `canva-templates\` | S-D6 Canva LinkedIn templates: part 1 done (five templates built as exact-size files, checked). Now the brand sign-off in a Claude Doc, the templates into Canva through Chrome, the link to `s-d10-canva-video`, and the site request. | Paused 20:06 on 2 Nov (Alex, after the crash). Last session fa39a8c5. Resume from its folder with `claude --resume fa39a8c5-61b1-4ee9-adbc-8be50e0808b5 --bg`, or launch fresh from its HANDOFF.md and STATUS.md. |
| `s-d7-linkedin-content` | `linkedin-content\` | S-D7 LinkedIn content creation demo: the LinkedIn posts entry is live on the site (BUILT S-D7-B1), and Alex's brand sign-off on its Claude Doc is still open. Also the copy writer in Alex's own voice: his voice guide, About-me, the six stakeholder pages, the stakeholder intro, the welcome page and "How this site was built", all handed to `website`. | Paused 20:06 on 2 Nov (Alex, after the crash). Last session 1cb7cbff. Resume from its folder with `claude --resume 1cb7cbff-36ac-4036-abda-f73bee767b5b --bg`, or launch fresh from its HANDOFF.md and STATUS.md. |
| `s-d5-blog-articles` | `blog-articles\` | S-D5 Blog articles: two articles (C10) plus a third entry on Alex's taste-capture method, written from his recorded words, in Claude Docs for his last 10%, published in GTM demos through `website`. Owns `blog-pipeline\` since S-D4 retired. | Paused 20:06 on 2 Nov (Alex, after the crash). Last session 55e56cc0. Resume from its folder with `claude --resume 55e56cc0-6910-469c-aafb-c9ba6c905249 --bg`, or launch fresh from its HANDOFF.md and STATUS.md. |
| `s-d10-canva-video` | `canva-video\` | S-D10 Canva design video: Alex builds the quote card in Canva on camera tonight, from S-D6's asset pack; the scene brief goes to him as a Claude Doc once `READY S-D6` arrives. Also runs S-D11 Brand motion demo with Comfy (C15): the ideas Doc, then the chosen animation and the one-minute video on the site. | Paused 20:06 on 2 Nov (Alex, after the crash). Last session da2b38ac. Resume from its folder with `claude --resume da2b38ac-3466-478b-aaec-ed2ba256d3b8 --bg`, or launch fresh from its HANDOFF.md and STATUS.md. |

## Planned

| Session | Folder it starts in | Spec | When |
| --- | --- | --- | --- |
| none | `orchestration\` | S2 Project orchestrator | Run by `orchestration` after S0. There's no separate S2 session (DI-4). |

## Finished

Spec sessions that have done their job and stopped. Their rows stay, so every spec row keeps a roster row.

| Session | Folder it started in | Spec | Finished |
| --- | --- | --- | --- |
| `s0-bootstrap` | `bootstrap\` | S0 Bootstrap | Done and stopped on 2 Nov; all 10 steps ticked, check passed. |
| `s-d4-blog-pipeline` | `blog-pipeline\` | S-D4 Blog pipeline | Retired by Alex on 2 Nov, about 16:45 (DI-8 question 1: "The only deliverable is blogs"); D4, DoD-14 and the S-D4 row retired in the charter (C12). Part 1's kit (prompts, scripts, post format, runbook) handed to `s-d5-blog-articles`, which now owns `blog-pipeline\`. Stopped 17:15. |

## Not sessions

- `Addvery Research\`: Alex's own folder, with no spec, now worked through the `addvery-research` session (Running). It's git-ignored, so read it from the local disk.
- `Operator tasks\` and `orchestration\_templates\`: files, not sessions.
