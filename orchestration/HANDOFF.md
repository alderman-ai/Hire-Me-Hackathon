# Orchestration handover

Written 2 Nov, 20:11 Prague, by the outgoing `orchestration` session (id `cc2ff5a3`), at 365k tokens: inside the 300k to 400k band Alex set at 20:12, and after his request for a full refresh following the crash. Read this, then the root `STATUS.md`, then `orchestration\SPEC.md` (sections 4, 8 and 9), then `Open tasks.md` at the repo root. Take every time from the clock (`Get-Date`); never guess one. The 18:47 handover this replaces is in git history (`git show 6ef70ea:orchestration/HANDOFF.md`).

## First, in this order

1. Wait until `claude agents --json --all` shows your row live. Then run `claude stop cc2ff5a3` and `claude rm cc2ff5a3`, and check that exactly one `orchestration` row is left. Put your id and the time in the `orchestration` row of `SESSIONS.md`, and commit it on its own (`[roster]`).
2. **rig:** at 20:10 it was asked for a refresh, and at 20:13 that was cancelled under Alex's new rule (below). Leave it be.
3. Send the HANDOFF announcement (SPEC section 8) to the five live sessions only: `rig`, `website`, `orch-site-map`, `orch-alex-prep` and `orch-briefing`. Every other session is paused, so don't message it.
4. Re-create the context-watch cron with CronCreate: cron `13,43 * * * *`, recurring. Use the prompt in SPEC section 8, run as `python -I orchestration\context_check.py --warn 35 --watch 30`. **Alex, 20:12: refresh a session only when it's over about 300k to 400k tokens, gently, at its next natural stop. Never on a timer, never under 300k, and never all at once.** Make three more changes:
   - **Skip every session in `SESSIONS.md`'s "Paused" table.** Never resume one unless Alex asks: its STOPPED flag is expected.
   - Instead of the scope map, check that the clock loop is alive (`website\.clock\sync.pid`).
   - Run `git push` when `main` is ahead of `origin/main`, because `watcher` is paused.

## The course change (Alex, 19:58 and 20:0x)

- **Why.** At 19:4x the PC crashed: about 20 Canva editor tabs plus the OBS recording maxed out the CPU and GPU. Alex: "we're getting to the point where we're doing a lot of unattended graphic design, which, in my experience, is just not a real thing. Same thing with unattended copywriting." Also: "I don't really want to have each session working in parallel ... I'm hoping that most things are 70% to 80% done and we just systematically go through them and finish them off."
- **Six sessions run** (Alex: "I mostly just want the main orchestration session, the three sub-orchestration sessions, website, and rig for now"):

  | Session | Id | Job |
  | --- | --- | --- |
  | `orchestration` | you | The master: sessions, context, roster, charter (S2), commit and push. Alex doesn't talk to it. |
  | `orch-alex-prep` | 759cb6b8 | Runs the finish list with him, item by item, attended. It edits the paused folders' files itself, sends `website` the builds, and keeps `Open tasks.md`. |
  | `orch-site-map` | 5a971503 | Layout and the scope map. It first brings the map in line with the live site, then settles the D12 toggle with him. |
  | `orch-briefing` | 8bc2476e | "What should I do next?", answered from the root `STATUS.md`. |
  | `website` | 2d36e96a | Builds and deploys. It first fixes its HANDOFF's /about deploy steps. |
  | `rig` | 1a1ba6cb, refresh pending | Recording. |

  Everything else is paused: `SESSIONS.md` has the table, with each one's full session id to resume it. Their rows are out of agent view. Alex: "everything else can pause because I don't think the work they're doing is going to survive much contact with my editing."
- **The legibility pass is done.** Each of the twelve working folders has a `STATUS.md` (written by subagents from its own records, 20:00 to 20:08), and the root `STATUS.md` indexes them, with the finish list in order. That list is the plan now.
- **Canva is off for every session.** The two Canva MCP connectors ("claude.ai Canva", "plugin:marketing:canva") were already disabled for this project in `~\.claude.json`. The Chrome route is blocked by `orchestration\canva_guard.py`, a PreToolUse hook in every folder's `.claude\settings.json` (0d9115e). To switch Canva on for one folder, put its name in `orchestration\CANVA-ON` ("We can play them one by one"). Delete the file to switch it off. Don't do this without his word.
- **The clock.** The crash killed `website`'s clock loop. `cc2ff5a3` restarted it hidden at 20:02 (pid 28388), and `website` owns it again. `rig` sends its clock lines to `website`.

## Done this session (18:47 to 20:11)

- The 18:47 handoff steps; the split into three sub-orchestrators (18:56 to 18:59, `briefing` became `orch-briefing`); five peer handoffs closed (s-d9, s-d7, s1, s-d5, s-d6).
- C19: the agent view's output went on `website\SPEC.md`'s reading list, and the "[redacted]" agent copy was overruled (SPEC section 9).
- After the crash: everything committed and pushed (19:50).
- The legibility pass, the pauses, the Canva guard, the four fresh sessions, and the course-change block at the top of each live session's CLAUDE.md and in the root CLAUDE.md. Pushed at 20:09.
- **Privacy scrub (1f763a6).** The research notes and two handoffs had located a third party's personal details, and other exposures, in the public history of Alex's two old repos (`cb6-prayer-project`, `Factor-AI`). The current files now say only that a clean-up decision is his. **Git history in this repo and in those repos is untouched. Rewriting either is his call.** Don't reintroduce the details in any tracked file.

## Open, for you

- **Charter, DoD-15** still says "from a 15-minute dictation", but the articles were written from his recorded words. It needs one `change-dod` run, worded from his own instruction (the two-posts change, C10), when an S2 change runs next. Also, the open question "What is D3's second custom message?" is unanswered, and the "Addvery"/"GetSales" spelling question was ticked by a hand edit (9c1afbd).
- **Doc comments reach nobody,** because the sessions that made the Docs are paused. The live sessions read a Doc when Alex says he's done with it. This is in each live CLAUDE.md.
- **Found in the pass** (the end of the root `STATUS.md`): the clip upload stopped at 11 of 13; /privacy is live but was never approved; the scope map contradicts the live site; and the scene sheet's step 10 is wrong. These belong to the live sessions, so only watch that they're picked up.
- **Alex's quick calls** live in `Open tasks.md` and the finish list's item 11, and are `orch-alex-prep`'s to raise, not yours.

## Rules learned the hard way

- The Bash tool collapses doubled backslashes inside heredocs and commands. `\a`, `\b`, `\f` and `\v` then turn into control characters. Build Windows paths with `chr(92)` in Python, and check written files for control characters afterwards.
- A literal `%` in a Python `%`-format string breaks it. Concatenate instead.
- Peers' clock times often run ahead. Take times from `Get-Date`, or from the git commit time.
- Over-caution is the failure Alex hates most ("it needs to stop freezing me"). But a third party's personal data is not public material: keep it out of tracked files.
