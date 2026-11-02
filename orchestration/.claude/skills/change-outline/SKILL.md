---
name: change-outline
description: Add, merge or split a row of the charter's spec outline, or make a row operator-owned (as C01 does for S-D2), and carry it to every dependent place - Depends on cells, run order, DoD claims, resource lines, folders and roster rows - previewed through the answer desk and written by propagate. Use when Alex asks for an outline change, directly or through an S2 REQUEST that quotes his answer, or when S2's own outline check finds a gap. Runs only in the orchestration session at the repo root; anywhere else it stops.
argument-hint: [--root <project root>] add | merge | split | operator-owned <rows and details>
---

# change-outline

Spec: `orchestration\SPEC.md`, sections 3 to 5. Request: $ARGUMENTS

## 0. Guard
1. Run `python -I "C:\Users\alder\Desktop\Hire me hackaton\orchestration\propagate_check.py" --guard`: always the repo's own copy, even in a dry run. `GUARD OK` means go on. On `GUARD UNKNOWN`, run in PowerShell `$a = (claude agents --json | Out-String | ConvertFrom-Json) | Where-Object { $_.sessionId -eq $env:CLAUDE_CODE_SESSION_ID }; "$($a.name) | $($a.cwd)"`, which must print exactly `orchestration | C:\Users\alder\Desktop\Hire me hackaton`. On `GUARD STOP` or any other output: write nothing and reply "change-outline runs only in the `orchestration` session at the repo root. Send `S2 REQUEST <your session>: <change> (approved: A <id>: <answer>)` to `orchestration`." Then stop.
2. Check the request is one S2 accepts (SPEC section 4): from Alex, an `S2 REQUEST` quoting his answer, or S2's own outline check. Otherwise reply "Take it to the answer desk first." and stop. Overnight, a request without his answer is filed in `changes\` as `held`.

## Parameters
- **Root:** `--root <path>`; default `C:\Users\alder\Desktop\Hire me hackaton`. Every path below is under the root.
- **Dry run:** any other root. Write only under that root. Send no ASK, poke or message, commit nothing, launch or stop nothing: write each into the change record as `would send <session>: <text>`, `would commit: <command>`, `would launch: <command>`. A scratch root's last folder must be named `Hire me hackaton` (the sync script builds its patterns from that name).
- **Inputs,** by operation. Take each from Alex's words; where they don't settle one, propose a value and show it in the preview.
  - *add:* as `add-deliverable` (name, outline, depends on, needs Alex for, DoD items), with no new deliverable, plus the id: an unused id, shown in the preview. The id he accepts is final.
  - *merge:* the rows and the surviving id.
  - *split:* the row; the new rows; where each DoD item, dependency and resource line goes; which part keeps the existing folder and session (default: `a`).
  - *operator-owned:* the row; Alex's folder; what else moves there with it; the answer ids that approve it.

## 1. Plan
Read `CHARTER.md`, `SESSIONS.md`, every SPEC.md and CLAUDE.md that names an affected id, `bootstrap\SPEC.md` (folder table and templates), `orchestration\DOD-DRAFT.md` while the DoD is unsigned, and the newest `orchestration\changes\` records. Find every place by searching for each affected id (`S-D3`, and `S-D3 ` inside cells) and for the work it names (such as "brand capture"). Then write each place's exact text before and after:
- **Every operation:** the rows; every "Depends on" cell naming an old id or moved work; "Run order" and the operator scenes; DoD claims, through `change-dod` as part of this change (its places join this record under the same C number, with no preview of its own), so every live item stays claimed; resource lines in each affected spec's "Routing and resources"; affected roster rows; any open question in "Risks and open questions" the change settles (tick it, note the answer and its ids); a one-line notice to the owner of every affected spec, `S2 C<nn>: <what changed for you>`.
- **add:** a new row after the last row of its kind; a new folder (no spec prefix) with its CLAUDE.md, Planned roster row and excludes sync, exactly as `add-deliverable` steps 1.6 to 1.9 describe, including the message to `s1-research`.
- **merge:** the surviving row's cells cover both rows. The retired row stays in the table with `Merged into <id> (C<nn>).` as its outline and `—` in its other cells, so its id is never reused and no link breaks. "Depends on" cells naming the retired id name the survivor. Both folders stay. The retired session's roster row notes `Retired by C<nn>, merged into <id>: stops at its next forking gate`.
- **split:** the row gives way to rows with its id plus a letter (S-D3a, S-D3b), each with its own cells. "Depends on" cells naming the old id name the part they need. The part named keeps the folder and session (its roster row takes the new spec id); every other part gets a new folder, CLAUDE.md, Planned roster row and sync, as in *add*.
- **operator-owned:** the row keeps its id, and its Spec cell ends `(operator-owned)`. Its outline cell says it is the operator's own, in `<folder>\`, local and git-ignored, with no spec or session, citing the answer ids. "Depends on" cells that named work moved into it name the row and the folder. "Run order" and the scenes say Alex does it himself. Each reader spec gets a resource line with the absolute local path, one line on what it holds, and "read it from the local disk, never from GitHub, never edit it". The S-D row of S0's folder table (`bootstrap\SPEC.md`) says no folder, no session. Its DoD items stay claimed by the row, marked operator-owned.
- **A spec with no SPEC.md yet:** hold its resource lines in the record under `## Held`, one per line as `- HELD <spec id> <file>: <resource line>`, the form check mode reads. They are written when its SPEC.md appears, and the line then becomes `- DELIVERED ...`.
- **Marker words:** check mode counts a row as operator-owned, or retired, if "operator-owned", "retired" or "merged into" appears anywhere in it. Put those words only in the row they describe. Any other row says "the operator's own" or names the surviving id.
- **A running spec** (Running in `SESSIONS.md`): the charter and roster change at apply, but its own SPEC.md, CLAUDE.md and session change only at its next forking gate (P8). Mark those places `held until <session>'s next forking gate`, and plan the notice `S2 C<nn> changes your spec: <what>. Finish your current work; at your next forking gate put this in your handoff, so your successor starts in the new shape. S2 writes your files when your roster row shows the handoff.`
- **Change record:** `orchestration\changes\C<nn>-<slug>.md`, `Status: planned`, as in `add-deliverable` step 1. A queued change (like C01) keeps its C number.

The change record and the preview queue row are written directly. Every other write goes through `propagate`.

## 2. Preview
Exactly as `add-deliverable` step 2: the queue row in `orchestration\SPEC.md` section 4, one S2 question on the desk at a time, the ASK covering the whole queue, the poke rule, and (a), (b), (c). This change shows its old and new rows side by side:

| Old row | New row |
| --- | --- |
| `<full old row>` | `<full new row>` |

then every other place in one line each, and any DoD item the change would leave unclaimed. Such a change isn't applied that way: the preview offers the fix (`change-dod` or a different split) instead.

## 3. Apply
Call `propagate` with the root and the change record. It writes every place that isn't held, as section 3 "Who writes where" sets it: `CHARTER.md` alone (`[orchestration] C<nn>: <change>`), `SESSIONS.md` alone (`[roster] C<nn>: <change>`), each other file path-limited; a new folder in the order CLAUDE.md, roster row, excludes sync; then the notices.

## 4. Verify
Read every place back and compare it with its After text. Run `propagate` in check mode (`python -I "<root>\orchestration\propagate_check.py" --root "<root>"`) and compare it with a run before the change: a new gap is a miss. List misses under `## Verify` and fix them as mechanical follow-ons (no new preview). Set `Status: applied <time>` (or `applied on default <time>`), with the held places listed.

## 5. Log and follow through
- Applied on the default: a row in section 9 of `orchestration\SPEC.md` (time and S2-Q id, decision, justification, why it's right, blast radius). Then send the next ASK if the queue isn't empty.
- When a held spec's roster row shows its handoff time, or its SPEC.md appears, apply its held places through `propagate` as a mechanical follow-on and tick them in the record.
- A split's new folders launch when their inputs are ready, as `add-deliverable` step 6.

## Rules
- Never delete a folder or a file. Retired rows and sessions are marked, never removed.
- Ids are never renumbered or reused. Split rows keep the id plus a letter; a row with no deliverable of its own gets the id shown in its preview.
- A running spec changes shape only at its next forking gate (P8).
- Never write in, make a folder for, or start a session in an operator-owned folder such as `Addvery Research\`. `propagate` check skips operator-owned rows.
