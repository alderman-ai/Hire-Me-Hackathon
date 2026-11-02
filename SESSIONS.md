# Session roster

The official name of every session in this project. Sessions message each other by these names with SendMessage, so use them exactly as written here. A name that isn't on this list isn't a session to rely on.

Read this file at startup, and again before you message a session you haven't messaged yet.

## Rules

- **Launch a session only under its roster name:** `cd` into its folder, then `claude --bg -n <name> "<prompt>"`.
- **Keep the roster current.** Whoever launches, renames, forks or stops a session updates its row in the same step and commits this file on its own, path-limited (`git commit -m "[roster] ..." -- SESSIONS.md`). This is the one root file every session may edit, and only its own rows.
- **A handoff keeps the name** (charter P8). The fresh session takes over under the same name, so nobody's address changes. Note the handoff time in its row.
- **Folder names carry no spec prefix; session names may** (Alex, DI-2 Q2.1). The table below is the link between a spec, its folder and its session.
- **Adding a working folder:** create its `CLAUDE.md`, add its row here, then run `python orchestration\sync_claude_excludes.py` from the repo root. That gives the new folder its `.claude\settings.json`, so its session loads only its own CLAUDE.md, and adds the new folder to every sister's exclusions. The root already excludes every child.

## Running

| Session | Folder it starts in | Role | Notes |
| --- | --- | --- | --- |
| `orchestration` | repo root | Parent session: owns the dependency map, launches spec sessions, and runs S2 (`orchestration\SPEC.md`). Its own files live in `orchestration\`. | Handed over to a fresh session (edd8f64b) at 14:48 Prague on 2 Nov, at forking gate F2. |
| `website` | `website\` | The Vercel site (S-D8). | |
| `rig` | `OBS\` | The OBS recording rig: /start, /pause, /stop, /process. | |
| `answer-desk` | `answer-desk\` | Every question for Alex, one at a time; the poke. | |
| `watcher` | `watcher\` | Hourly git sweep and push. | |
| `briefing` | `briefing\` | Alex's own status session: where everything stands, where he's the blocker, how close to done. Answers from the collector's snapshots and asks no one. Not in the charter. | Launched 2 Nov. |
| `s-d9-legibility` | `legibility\` | S-D9 Legibility analyzer: finds what's worth showing followers in the filed rig sessions and the project, and sends `website` build requests. Runs on `legibility\SPEC.md` since 14:51 (the interim brief is background). | Started early on Alex's instruction, 2 Nov. Checks every 30 minutes. |
| `s1-research` | `research\` | S1 Research: sets the research method and fills the research reading list with Alex, within the usage budget. | Launched by `orchestration` after S0, 2 Nov. |
| `wave2-specs` | repo root | Temporary: writes the wave-2 specs (S-D1, S-D3 to S-D10), gets each one's preflight intake answered, and hands each to `orchestration` for launch. Then stops. | Started by `orchestration`, 2 Nov 14:00. |
| `s-d1-scraping` | `scraping\` | S-D1 Scraping research demo: presents Alex's own scraping and research on the site, behind his gate on what the section shows. | Launched by `orchestration`, 2 Nov, after its preflight (DI-6) was answered. |
| `addvery-research` | `Addvery Research\` | Alex's own Addvery research session: the company, its six key people and its brand capture. He works with it directly; it has no spec. The folder is git-ignored. | Launched by `orchestration` at Alex's request, 2 Nov. |
| `s-d3-getsales` | `getsales\` | S-D3 GetSales outbound demo: the alert to the six from Alex's sender profile behind his pre-send gate, then the ICP workflows demo. Waits silently for his six in `Addvery Research\`. | Launched by `orchestration`, 2 Nov 15:00, for the alert groundwork; its spec's launch gate was met by DI-6. |

## Planned

| Session | Folder it starts in | Spec | When |
| --- | --- | --- | --- |
| none | `orchestration\` | S2 Project orchestrator | Run by `orchestration` after S0. There's no separate S2 session (DI-4). |
| `s-d4-blog-pipeline` | `blog-pipeline\` | S-D4 Blog pipeline | Wave 2, after S1. |
| `s-d5-blog-articles` | `blog-articles\` | S-D5 Three blog articles | After S-D4. |
| `s-d6-canva-templates` | `canva-templates\` | S-D6 Canva LinkedIn templates | Wave 2, once Alex's brand capture is in `Addvery Research\`. |
| `s-d7-linkedin-content` | `linkedin-content\` | S-D7 LinkedIn content creation demo | Wave 2, once Alex's brand capture is in `Addvery Research\`. |
| `s-d10-canva-video` | `canva-video\` | S-D10 Canva design video | After S-D6, near the end of the day. |

## Finished

Spec sessions that have done their job and stopped. Their rows stay, so every spec row keeps a roster row.

| Session | Folder it started in | Spec | Finished |
| --- | --- | --- | --- |
| `s0-bootstrap` | `bootstrap\` | S0 Bootstrap | Done and stopped on 2 Nov; all 10 steps ticked, check passed. |

## Not sessions

- `Addvery Research\`: Alex's own folder, with no spec, now worked through the `addvery-research` session (Running). It's git-ignored, so read it from the local disk.
- `Operator tasks\` and `orchestration\_templates\`: files, not sessions.
