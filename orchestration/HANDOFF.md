# Orchestration handover

Written 2 Nov, 14:45 Prague, by the outgoing `orchestration` session (id `bb3afedd`) at forking gate F2: its context was well past half full after running all day. Read this, then `orchestration\SPEC.md` (you run it: you are the parent session and the S2 project orchestrator). Times are Prague (UTC+1).

## Who's running (11 sessions, `SESSIONS.md` matches)

`orchestration` (you, root) · `answer-desk` (questions to Alex, his window) · `briefing` (his status session) · `addvery-research` (Alex's own Addvery work, git-ignored folder, launched 14:4x) · `rig` (OBS recording) · `website` (Vercel site) · `s-d9-legibility` (posts to the site from the recordings) · `s1-research` (research) · `s-d1-scraping` (first wave-2 demo, launched 14:3x, waiting on Alex's Addvery summary) · `wave2-specs` (temporary: writing the wave-2 specs) · `watcher` (hourly sweep and push).
Removed at Alex's request at 14:4x to declutter agent view: the old briefing copy, `briefing-build`, `meta-specs`, `s0-bootstrap` (done; in the roster's Finished table) and `accidental-session-kill-recovery`.

## Alex right now

He is swamped and focused on his Addvery research. His words at 14:38: "let's just approve ot1 -- i'm swamped we need to remove blockers ... di6 is done. di7 is waiting on addvery research which is where my focus needs to be right now. d1-8 is low priority". So: interrupt him as little as possible, no pokes for low-priority items, prefer work that needs nothing from him. His window ends at 18:00. Before 18:00 a passed deadline means poke (only for things that truly block); from 18:00 it means decide and log (P5).

How he wants to be reached (all in `answer-desk\ASKING.md`): he reads only the answer desk and Obsidian, never a session's chat. Every approval is a gate-approval operator task (`Approve - ...`, template in `orchestration\_templates\`), every preflight a decision intake (`Decide - ...`), with a plain-language "What this is" section and no internal codes; a TASK line to the desk; the blocked session checks every 5 minutes with `orchestration\check_gate.py`. Answered files get archived (`archive-intake` skill) into `Operator tasks\Archive\` with `INDEX.md`.

## S2 state (orchestration\SPEC.md)

- Skills built, committed, dry-run on scratch copies: `propagate`, `change-dod`, `add-deliverable`, `change-outline`, `archive-intake` in `orchestration\.claude\skills\`; `propagate_check.py` and `check_gate.py` in `orchestration\`. Still to verify live (S2 DoD): that these skills load in the root session (read a file in `orchestration\` and look for `/orchestration:*` skills; else `/add-dir orchestration`), and that a same-name handoff works (this one is the test: record the result).
- DoD: DoD-1 to DoD-22 signed off by Alex in DI-5 (DoD-4 softened), written into the charter as C03. No placeholders left.
- **OT-02 open:** `Operator tasks\Approve - Addvery research is yours, reading lists per demo.md` covers C01 (S-D2 becomes operator-owned, plus the DoD rule "claimed by a spec or operator-owned row") and C02 (reading-list pointer). Alex hasn't ticked it. It no longer gates wave 2 (see decision below), so: re-arm a silent 5-minute watch (Monitor running `check_gate.py` every 300 s, no pokes), and when it reads APPROVED, apply C01 and C02 through `propagate`, then run `propagate_check.py`, then sign off the outline in the charter.
- **C01 record has an uncommitted edit by wave2-specs' S-D3 writer**, marking S-D3's held line DELIVERED. Review it: when C01 applies, its held lines should replace the existing `..\Addvery Research\` resource lines in getsales, canva-templates, linkedin-content and website SPEC.md, not sit beside them. Keep or revert the edit accordingly.
- **C04 queued** (preview queue in SPEC.md): DoD-22 counts showing the Apify proposal or Alex's outbound, not mentioning it (Alex, website-Q3 "a", 14:25). Goes out as the next gate approval after OT-02, low priority.
- Consistency check: remaining gaps are S-D2 (C01 closes it), C01 held lines, and resource-list slips in wave-2 drafts (wave2-specs told the convention: only existing inputs in Routing and resources, outputs listed separately, absolute paths outside the repo).

## To do next (in this order)

1. **Log the decision** in SPEC.md section 9: "2 Nov 14:40: wave 2 starts spec by spec as each spec's preflight is answered, not after the outline sign-off. Justification: Alex 14:38, 'we need to remove blockers'; OT-02 only rewords the plan, and his DI answers already settled its substance. Why right: no demo depends on C01 or C02. Blast radius: the outline is signed off after the first demos start; no files at risk."
2. **Two archive requests**, run `archive-intake`: `Approve - research plan for the whole project.md` (readers S1, S2; Alex approved 14:38) and `Decide - how the scraping demo should work.md` (readers S-D1, S-D3).
3. **Accepted rules to write down:** (a) gate template note: a git-ignored draft may be embedded in a gate file with an Obsidian embed, and it must not change while the gate is open; (b) SPEC.md sections 4 and 5: accept `OUTPUT <spec id> ready: <paths>; readers: <spec ids>`, handled like FINDINGS (propagate adds resource lines to the reader specs; S-D1's outputs feed S-D3, DoD-9).
4. **SPEC READY handling** (from wave2-specs): S-D8 is ready for its non-Addvery parts (deliverables view, BUILD format, blog route, previews; stakeholder parts held): tell `website` its `SPEC.md` is final and to run those parts. S-D9 is ready without an intake: tell `s-d9-legibility` to switch from the interim brief to its `SPEC.md`. Launch any other spec on SPEC READY with the launch line from its CLAUDE.md, verify its cwd, and move its roster row to Running.
5. **Held:** DI-7 (GetSales, cut to 3 questions) waits on Alex's Addvery research, no pokes. DI-8 (blog pipeline) is low priority, no pokes. S-D6, S-D7, S-D10 and the S-D8 stakeholder parts wait on the Addvery research. S-D5 waits behind S-D4.
6. **S1:** seven research subagents started 14:40 on the parent list; FINDINGS expected around 16:00 (reports in `research\global\`). On FINDINGS, `propagate` adds resource lines to the reader specs.
7. **Gap to close:** the briefing collector and the website's clock_sync loop don't survive a reboot or logoff, and `/session-recovery` doesn't restart them yet. Add that to the session-recovery skill (commands are in `briefing\CLAUDE.md` and `website\CLAUDE.md`).
8. **Forking gates:** F1 when the outline is signed off and C01/C02 applied. F3 shortly before 18:00, so the overnight session starts clean.

## Rules learned the hard way

- PowerShell 5.1: parse `claude agents --json` into a variable first, then pipe the variable; never pipe ConvertFrom-Json straight into a filter that feeds `claude stop` or `rm` (it matched every session once). Stop or remove only by exact id.
- No double quotes inside a prompt passed to `claude` from PowerShell 5.1: they get stripped and cut the prompt.
- Bash heredocs on this machine collapse doubled backslashes. Write scripts with the Write tool, or build backslashes with `chr(92)`.
- Sessions refuse to edit their own instructions because a peer asked. Orchestration edits any folder directly (Alex's standing rule; GIT.md) and tells the owner afterwards.
- Before acting on a peer's claim about Alex's wishes, check his own words: the desk's `qa\` files, the archived intakes, or his message in the peer's transcript.
- Commit path-limited, and check `git diff --cached --name-only` first; other sessions stage files in the same tree.
