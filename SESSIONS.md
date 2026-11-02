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
| `orchestration` | repo root | Parent session: owns the dependency map, launches spec sessions, and runs S2 (`orchestration\SPEC.md`). Its own files live in `orchestration\`. | |
| `website` | `website\` | The Vercel site (S-D8). | |
| `rig` | `OBS\` | The OBS recording rig: /start, /pause, /stop, /process. | |
| `answer-desk` | `answer-desk\` | Every question for Alex, one at a time; the poke. | |
| `watcher` | `watcher\` | Hourly git sweep and push. | |
| `accidental-session-kill-recovery` | `OBS\` | Temporary: Alex's recovery session from 13:20 on 2 Nov. | |
| `briefing` | `briefing\` | Alex's own status session: where everything stands, where he's the blocker, how close to done. Answers from the collector's snapshots and asks no one. Not in the charter. | Launched 2 Nov. |
| `s-d9-legibility` | `legibility\` | S-D9 Legibility analyzer: finds what's worth showing followers in the filed rig sessions and the project, and sends `website` build requests. Runs on an interim brief until its spec exists. | Started early on Alex's instruction, 2 Nov. Checks every 30 minutes. |
| `s1-research` | `research\` | S1 Research: sets the research method and fills the research reading list with Alex, within the usage budget. | Launched by `orchestration` after S0, 2 Nov. |

## Planned

| Session | Folder it starts in | Spec | When |
| --- | --- | --- | --- |
| none | `orchestration\` | S2 Project orchestrator | Run by `orchestration` after S0. There's no separate S2 session (DI-4). |
| `s-d1-scraping` | `scraping\` | S-D1 Scraping research demo | Wave 2, first, because others consume its output. After S1. |
| `s-d3-getsales` | `getsales\` | S-D3 GetSales outbound demo | Wave 2, once Alex's Addvery research (the six stakeholders) is in `Addvery Research\`. Needs the rig recordings, and S-D9 for the clip. |
| `s-d4-blog-pipeline` | `blog-pipeline\` | S-D4 Blog pipeline | Wave 2, after S1. |
| `s-d5-blog-articles` | `blog-articles\` | S-D5 Three blog articles | After S-D4. |
| `s-d6-canva-templates` | `canva-templates\` | S-D6 Canva LinkedIn templates | Wave 2, once Alex's brand capture is in `Addvery Research\`. |
| `s-d7-linkedin-content` | `linkedin-content\` | S-D7 LinkedIn content creation demo | Wave 2, once Alex's brand capture is in `Addvery Research\`. |
| `s-d10-canva-video` | `canva-video\` | S-D10 Canva design video | After S-D6, near the end of the day. |

## Not sessions

- `Addvery Research\`: Alex's own folder, worked one-on-one, with no spec. It's git-ignored, so read it from the local disk. It has no roster name unless Alex starts a session there.
- `Operator tasks\` and `orchestration\_templates\`: files, not sessions.
