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
| `orchestration` | repo root | Parent session: owns the dependency map, launches spec sessions, and runs S2 (`orchestration\SPEC.md`). Its own files live in `orchestration\`. | Handed over to a fresh session (edd8f64b) at 14:44 Prague on 2 Nov, at forking gate F2; then to ab58b0bf at 16:44 (F2, with F1 and F3 merged in). ab58b0bf stopped and removed edd8f64b at 16:45; one `orchestration` row left. Then to cc2ff5a3 at 18:47 (F2, context); cc2ff5a3 stopped and removed ab58b0bf at 18:49; one `orchestration` row left. |
| `website` | `website\` | The Vercel site (S-D8). | Runs S-D8 (SPEC.md) since 14:50. Handed off to a fresh session (b25f14b0) at 14:53 (gate F3), then to 54c2d301 at 17:27 (orchestration's RESTART). |
| `rig` | `OBS\` | The OBS recording rig: /start, /pause, /stop, /process. | |
| `answer-desk` | `answer-desk\` | Every question for Alex, one at a time; the poke. | |
| `watcher` | `watcher\` | Hourly git sweep and push. | |
| `briefing` | `briefing\` | Alex's own status session: where everything stands, where he's the blocker, how close to done. Answers from the collector's snapshots and asks no one. Not in the charter. | Launched 2 Nov. |
| `s-d9-legibility` | `legibility\` | S-D9 Legibility analyzer: finds what's worth showing followers in the filed rig sessions and the project, and sends `website` build requests. Runs on `legibility\SPEC.md` since 14:51 (the interim brief is background). | Started early on Alex's instruction, 2 Nov. Checks every 30 minutes. Handed over at 17:16 (G3); successor 3020a577 took over under the same name. |
| `s1-research` | `research\` | S1 Research: sets the research method and fills the research reading list with Alex, within the usage budget. | Launched by `orchestration` after S0, 2 Nov. Handoff at 15:00 (forking gate G2, L-01 done): successor is session 00877038; state in `research\HANDOFF.md`. |
| `s-d1-scraping` | `scraping\` | S-D1 Scraping research demo: presents Alex's own scraping and research on the site, now approved with changes (OT-12): a carousel of his research artifacts first. Also runs S-D12 Agent view (C17): the generator that builds the site's agent track (unlisted Markdown pages and /llms.txt) from its content files, for `website`'s person/agent toggle. | Launched by `orchestration`, 2 Nov, after its preflight (DI-6) was answered. Handoff 17:18 (F2): fresh session bbc4d635 took over from e6e29a15; state in `scraping\HANDOFF.md`. |
| `addvery-research` | `Addvery Research\` | Alex's own Addvery research session: the company, its six key people and its brand capture. He works with it directly; it has no spec. The folder is git-ignored. | Launched by `orchestration` at Alex's request, 2 Nov. |
| `s-d3-getsales` | `getsales\` | S-D3 GetSales outbound demo: the 36 ICP × EN/CS/DE × tactic workflows in a GetSales folder apart from Alex's own (never started, no leads), and two blog-style demo entries (A10.7, C14): a 3-minute walkthrough (classification tools, the 36, the one variable) and a short capture of leads classified into ICPs. Alex sends the alert to the six himself. | Launched by `orchestration`, 2 Nov 14:49. Handed over to a fresh session (baa79b2c) at 17:17 Prague on 2 Nov, at forking gate G3; then to 2a7fc2a1 at 17:47 (gate G3: 36 built, both demos ready to record). 2a7fc2a1 stopped and removed baa79b2c on taking over; one `s-d3-getsales` row left. |
| `s-d6-canva-templates` | `canva-templates\` | S-D6 Canva LinkedIn templates: part 1 done (five templates built as exact-size files, checked). Now the brand sign-off in a Claude Doc, the templates into Canva through Chrome, the link to `s-d10-canva-video`, and the site request. | Launched by `orchestration`, 2 Nov 15:48, on SPEC READY (session e692a845). Handed off at RESTART, 17:17 (forking gate F3): successor is session a841934d; state in `canva-templates\HANDOFF.md`. Handed off again at F3, about 18:02: successor is session 335b2144; orchestration stopped and removed a841934d. |
| `s-d7-linkedin-content` | `linkedin-content\` | S-D7 LinkedIn content creation demo: five posts in Addvery's voice, blind-judged (all Great 21/21); now the Claude Doc for Alex's brand sign-off, the demo files and the site request. The held intake was decided as easy calls under the 17:00 reset rules. | Launched by `orchestration`, 2 Nov 15:48, on SPEC READY (session 6a355ef8). Handed off at 17:15 (forking gate F3): successor is session 9e96773b; state in `linkedin-content\HANDOFF.md`. |
| `s-d5-blog-articles` | `blog-articles\` | S-D5 Blog articles: two articles (C10), their briefs and visuals, drafts in Claude Docs where Alex does his last 10%, published through `website`. Owns `blog-pipeline\` since S-D4 retired. | Launched by `orchestration`, 2 Nov 16:41 (session 1bffb92f). Handoff at 17:16 on the RESTART (fresh session to load `frontend-design` and the Claude Docs connector): successor is session 5b465de8; state in `blog-articles\HANDOFF.md`. |
| `s-d10-canva-video` | `canva-video\` | S-D10 Canva design video: Alex builds the quote card in Canva on camera tonight, from S-D6's asset pack; the scene brief goes to him as a Claude Doc once `READY S-D6` arrives. Also runs S-D11 Brand motion demo with Comfy (C15): the ideas Doc, then the chosen animation and the one-minute video on the site. | Launched by `orchestration`, 2 Nov 16:39 (session acc0550f). Handed off at 17:34 (forking gate F0, for the Claude Docs connector): successor is session da2b38ac; state in `canva-video\HANDOFF.md`. |

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
