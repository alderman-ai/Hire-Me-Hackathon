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
| `orchestration` | repo root | Parent session: owns the dependency map, launches spec sessions, and runs S2 (`orchestration\SPEC.md`). Its own files live in `orchestration\`. | Handed over to a fresh session (edd8f64b) at 14:44 Prague on 2 Nov, at forking gate F2; then to ab58b0bf at 16:44 (F2, with F1 and F3 merged in). The fresh session removes edd8f64b. |
| `website` | `website\` | The Vercel site (S-D8). | Runs S-D8 (SPEC.md) since 14:50. Handed off to a fresh session (b25f14b0) at 14:53 (gate F3). |
| `rig` | `OBS\` | The OBS recording rig: /start, /pause, /stop, /process. | |
| `answer-desk` | `answer-desk\` | Every question for Alex, one at a time; the poke. | |
| `watcher` | `watcher\` | Hourly git sweep and push. | |
| `briefing` | `briefing\` | Alex's own status session: where everything stands, where he's the blocker, how close to done. Answers from the collector's snapshots and asks no one. Not in the charter. | Launched 2 Nov. |
| `s-d9-legibility` | `legibility\` | S-D9 Legibility analyzer: finds what's worth showing followers in the filed rig sessions and the project, and sends `website` build requests. Runs on `legibility\SPEC.md` since 14:51 (the interim brief is background). | Started early on Alex's instruction, 2 Nov. Checks every 30 minutes. |
| `s1-research` | `research\` | S1 Research: sets the research method and fills the research reading list with Alex, within the usage budget. | Launched by `orchestration` after S0, 2 Nov. Handoff at 15:00 (forking gate G2, L-01 done): successor is session 00877038; state in `research\HANDOFF.md`. |
| `s-d1-scraping` | `scraping\` | S-D1 Scraping research demo: presents Alex's own scraping and research on the site, behind his gate on what the section shows. | Launched by `orchestration`, 2 Nov, after its preflight (DI-6) was answered. |
| `addvery-research` | `Addvery Research\` | Alex's own Addvery research session: the company, its six key people and its brand capture. He works with it directly; it has no spec. The folder is git-ignored. | Launched by `orchestration` at Alex's request, 2 Nov. |
| `s-d3-getsales` | `getsales\` | S-D3 GetSales outbound demo: the alert to the six from Alex's sender profile behind his pre-send gate, then the ICP workflows demo. Waits silently for his six in `Addvery Research\`. | Launched by `orchestration`, 2 Nov 14:49, for the alert groundwork; its spec's launch gate was met by DI-6. |
| `s-d4-blog-pipeline` | `blog-pipeline\` | S-D4 Blog pipeline: turns 15 minutes of Alex's dictation into a near-final blog post. Part 1 (method, prompts, scripts, post format) runs now; part 2 waits for its own intake, which it watches with no pokes. | Launched by `orchestration`, 2 Nov 14:52, on SPEC READY. |
| `s-d6-canva-templates` | `canva-templates\` | S-D6 Canva LinkedIn templates: part 1 groundwork on Alex's brand capture (template grid and branded layouts as files ready to import, no Canva login). Its intake stays held in its SPEC.md Appendix A until `orchestration` says go. | Launched by `orchestration`, 2 Nov 15:48, on SPEC READY (session e692a845). |
| `s-d7-linkedin-content` | `linkedin-content\` | S-D7 LinkedIn content creation demo: part 1 voice rules, writing and scoring set-up and draft posts, nothing published. Its intake stays held in its SPEC.md Appendix A until `orchestration` says go. | Launched by `orchestration`, 2 Nov 15:48, on SPEC READY (session 6a355ef8). |
| `s-d5-blog-articles` | `blog-articles\` | S-D5 Blog articles: two articles, not three (Alex's note in the blog research approval, 16:40), their base and their visuals, groundwork only; its intake stays held and no article questions go to Alex. | Launched by `orchestration`, 2 Nov 16:41 (session 1bffb92f). |
| `s-d10-canva-video` | `canva-video\` | S-D10 Canva design video: groundwork only (scene brief, off-camera screen-care list with Canva's side panels); filming waits on Alex's answer to S2-Q1, today 17:30 or tomorrow morning. | Launched by `orchestration`, 2 Nov 16:39 (session acc0550f). |

## Planned

| Session | Folder it starts in | Spec | When |
| --- | --- | --- | --- |
| none | `orchestration\` | S2 Project orchestrator | Run by `orchestration` after S0. There's no separate S2 session (DI-4). |

## Finished

Spec sessions that have done their job and stopped. Their rows stay, so every spec row keeps a roster row.

| Session | Folder it started in | Spec | Finished |
| --- | --- | --- | --- |
| `s0-bootstrap` | `bootstrap\` | S0 Bootstrap | Done and stopped on 2 Nov; all 10 steps ticked, check passed. |

## Not sessions

- `Addvery Research\`: Alex's own folder, with no spec, now worked through the `addvery-research` session (Running). It's git-ignored, so read it from the local disk.
- `Operator tasks\` and `orchestration\_templates\`: files, not sessions.
