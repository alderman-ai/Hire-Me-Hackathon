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
| `s0-bootstrap` | `bootstrap\` | S0 Bootstrap: rolls out the sister folders, their CLAUDE.md files and roster rows. | Launched 13:39 Prague on 2 Nov. |
| `accidental-session-kill-recovery` | `OBS\` | Temporary: Alex's recovery session from 13:20 on 2 Nov. | |

## Planned

| Session | Folder it starts in | Spec | When |
| --- | --- | --- | --- |
| `s1-research` | `research\` | S1 Research | After S0. |
| none | `orchestration\` | S2 Project orchestrator | Run by `orchestration` after S0. There's no separate S2 session (DI-4). |
| one per wave-2 spec | one folder each | S-D1, S-D3 to S-D10 | S0 adds a row for each when it creates the folders. |

## Not sessions

- `Addvery Research\`: Alex's own folder, worked one-on-one, with no spec. It's git-ignored, so read it from the local disk. It has no roster name unless Alex starts a session there.
- `Operator tasks\` and `_templates\`: files, not sessions.
