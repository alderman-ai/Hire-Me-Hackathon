# S1 handoff

State as of 17:22 Prague, 2 Nov, written by the second `s1-research` session (00877038). It isn't a fork yet: it keeps this file current, so a successor or a session recovery starts from here. Read CLAUDE.md, then SPEC.md (sections 5 and 8 changed this afternoon), then this file, then DIRECTORY.md.

## Where S1 stands

**No research is running or queued.** `orchestration`'s RESTART (17:13) says: after L-03, start no new research unless Alex asks for it. Alex's reset rules (`..\answer-desk\ASKING.md`, top, 17:00) also apply: no research list goes to him as a gate, easy calls are S1's own (decide, log in SPEC.md section 8), and there's no 18:00 cut-off ("We're working all night").

| List | State |
| --- | --- |
| L-01 parent | Done 15:05. On every reader's reading list (C07). |
| L-02 scraping | Parked: Alex runs the scraping himself. |
| L-03 blog | Done 17:21. 10 reports and the synthesis in `global\`, indexed. FINDINGS sent to `orchestration [51e560]` at 17:22. Reader: S-D5 only (S-D4 retired 16:48). |
| L-04 GetSales, L-06 website | Withdrawn 17:03 (OT-03 withdrawn unticked); never run. S-D3 and `website` told, both old and new sessions. |
| L-05 brand assets | Done 16:45. 7 reports and the synthesis in `global\`, indexed. FINDINGS sent; going through propagate as C11, with S-D5 added as a reader for R1. S-D6, S-D7, S-D10 told. |

## Open items

- **Desk:** no question open; the next id is S1-Q7. No TASK lines open. Don't poke: rule 7 pokes only when work is blocked.
- **Replies:** none outstanding. `s-d5-blog-articles` (session 5b465de8) confirmed the L-03 synthesis at 17:23; findings 1 and 3 go into its dictation 2 prompts and its build request S-D5-B1.
- **Monitors:** none running. The gate-watch script is in the job's temp folder and isn't needed: no gates are open.

## Answers applied this session

- OT-09 (L-05): ticked with changes; applied (R1 narrowed to one cloned repo; R4 gained a leader's-personal-brand sub-question). The Ivana direction went to `orchestration` and S-D7, settled there as local only.
- OT-04 (L-03): unticked, changes applied (R5 the blog skill, R6 and R7 the two articles' research bases). The copywriting-skill rule, two articles not three, and the visuals went to `orchestration`, S-D4 and S-D5.
- Alex's feedback-section rule (desk, 16:36): an approval includes whatever he wrote in its feedback. Recorded in SPEC.md section 5.

## Decisions (also in SPEC.md section 8)

- 16:32: L-05 ran on OT-09 ticked with changes, with no second freeze.
- 16:36: L-03 ran on OT-04 unticked, from his note's own "start researching".

## How to run a list again (only if Alex asks)

- One `general-purpose` subagent per item, all in one message in the background, briefed from BRIEFS.md (item verbatim, DoD ids, exact report path, "item k of n", a 15-minute target, the shared rules). Wildcards get the other items verbatim and the other two lenses.
- Review each report as it lands (headings, citations, inference marked, no secrets); tick it with the `tick.py` pattern (Python with raw strings, never `sed` on Windows paths); commit report and list together; send time-critical findings to the reader straight away.
- Then the synthesis, DIRECTORY entries plus the reverse index, close the list, `FINDINGS` to `orchestration`, and tell each reader.
- Reports took about 5 to 8 minutes each this afternoon; a synthesis about 5.

## Rules learned this session

- Sessions hand off often. Before messaging, check ListAgents: when two rows share a name, use the newest `[ref]`. `orchestration` is `[51e560]` since 16:44.
- `orchestration` edits `research\` files (archive paths, CLAUDE.md reading item 10) and says so afterwards. Re-read a file before editing it.
- Long inline Python in a Bash heredoc can fail to parse; write the script to the job's temp folder and run it with `python -I`.

## Forking gates from here

- G3 (shortly before 18:00) no longer has its reason, since Alex works through the night and nothing is queued; fork only at G4 (half context; 34% at 16:47) or if `orchestration` asks.
- How: rewrite this file, commit, launch from `research\` with `claude --bg -n s1-research "Read CLAUDE.md, then HANDOFF.md. You are now the active S1 session."`, update S1's row in `..\SESSIONS.md` (commit it alone with `[roster]`), then stop the old session by its exact id. Don't fork while research subagents are running.
