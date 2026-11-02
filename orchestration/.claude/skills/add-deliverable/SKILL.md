---
name: add-deliverable
description: Add a new deliverable to the hackathon charter in one step - the next free D id and the Scope count, its S-D outline row, run order and operator scenes, at least one DoD item, a new working folder with its CLAUDE.md, roster row and excludes sync - previewed through the answer desk and written by propagate. Use when Alex asks for a new deliverable, directly or through an S2 REQUEST that quotes his answer. Runs only in the orchestration session at the repo root; anywhere else it stops.
argument-hint: [--root <project root>] <name>: <what it is>; wave; depends on; needs Alex for; DoD items
---

# add-deliverable

Spec: `orchestration\SPEC.md`, sections 3 to 5. Request: $ARGUMENTS

## 0. Guard
1. Run `python -I "C:\Users\alder\Desktop\Hire me hackaton\orchestration\propagate_check.py" --guard`: always the repo's own copy, even in a dry run. `GUARD OK` means go on. On `GUARD UNKNOWN`, run in PowerShell `$a = (claude agents --json | Out-String | ConvertFrom-Json) | Where-Object { $_.sessionId -eq $env:CLAUDE_CODE_SESSION_ID }; "$($a.name) | $($a.cwd)"`, which must print exactly `orchestration | C:\Users\alder\Desktop\Hire me hackaton`. On `GUARD STOP` or any other output: write nothing and reply "add-deliverable runs only in the `orchestration` session at the repo root. Send `S2 REQUEST <your session>: <change> (approved: A <id>: <answer>)` to `orchestration`." Then stop.
2. Check the request is one S2 accepts (SPEC section 4): from Alex himself, or an `S2 REQUEST` quoting his answer. Otherwise reply "Take it to the answer desk first." and stop. Overnight, a request without his answer is filed in `changes\` as `held` and stops there.

## Parameters
- **Root:** `--root <path>`; default `C:\Users\alder\Desktop\Hire me hackaton`. Every path below is under the root.
- **Dry run:** any other root. Write only under that root. Send no ASK, poke or message, make no commit and launch nothing: write each one into the change record as `would send <session>: <text>`, `would commit: <command>` or `would launch: <command>`. A scratch root's last folder must be named `Hire me hackaton`, because the sync script builds its patterns from that name.
- **Inputs:** name; one line on what it is; wave; what it depends on; what it needs from Alex; the DoD items it serves, new or existing. Take each from Alex's words. Where his words don't settle one, propose a value and show it in the preview; never decide it silently.

## 1. Plan
Read `CHARTER.md`, `SESSIONS.md`, the "Templates" section of `bootstrap\SPEC.md`, `scraping\CLAUDE.md` (a filled example) and the newest records in `orchestration\changes\`. Then work out:
- **Ids.** Change id: the next free `C<nn>` in `orchestration\changes\`, counting drafts, held and dropped records. Deliverable id: the highest `D<n>` ever used (charter and change records, retired ones included) plus one; a meta deliverable takes the next `M<n>` and spec `S<n>` instead. Spec `S-D<n>`, asker `S-D<n>`, session `s-d<n>-<slug>`, folder `<slug>\`: lowercase, hyphens, no spec prefix (DI-2 Q2.1), and not an existing folder.
- **Places,** each with its exact text before and after:
  1. "Deliverables": a new row at the end of its wave's table, and the count in the intro sentence ("ten client-facing deliverables").
  2. "Scope": the count in its first sentence and the "**In:**" line (`D1 to D<n>`).
  3. "Spec outline": the intro's "S-D1 to S-D<n> for D1 to D<n>", and a new row after the last S-D row: `| S-D<n> — <name> | <outline> | <depends on> | <needs the operator for> |`.
  4. "Run order": a bullet under step 4 saying what feeds it and what it feeds (step 3 only if others consume it first). If it needs Alex, add his scene to "Operator scenes to shoot today".
  5. DoD: at least one item the new row claims. Call `change-dod` as part of this change: its places join this change record under the same C number, and it sends no preview of its own. It knows whether the DoD is still `orchestration\DOD-DRAFT.md` or already in the charter.
  6. `<slug>\CLAUDE.md`, from S0's CLAUDE.md template, filled like `scraping\CLAUDE.md`: `<spec>` is `S-D<n>`, `<role>` is the outline cell with a lowercase start and no final full stop. Add line 8 only where it applies: the Addvery line from `bootstrap\SPEC.md` if the work reads Addvery input; `..\OBS\rig\RUNBOOK.md` if it reads rig output. The launch prompt holds no double quotes.
  7. `SESSIONS.md`, "Planned": `| s-d<n>-<slug> | `<slug>\` | S-D<n> <name> | <wave, and what it waits for> |`.
  8. Excludes sync: run `python "<root>\orchestration\sync_claude_excludes.py" --check` and list the settings files the real run will write (every sister's, plus the new folder's).
  9. Notices: to `s1-research`, `S2 C<nn>: new spec S-D<n> <name>, folder <slug>\, session s-d<n>-<slug> (not launched yet). Research for it is asked for through you: give it a research list, or add it to the readers of a topic you already have.` To `website`, `S2 C<nn>: new deliverable D<n> <name> is in the charter. Show it in the site's deliverables view.`
- **Change record:** write `orchestration\changes\C<nn>-<slug>.md` with `Status: planned`: the request, who asked, the approval quoted verbatim, the new ids, then every place above as `### <n>. <file>, <section>` with fenced `Before:` and `After:` blocks, then the notices and the commits. A new file's Before is `(does not exist)`. Model it on `C01-sd2-operator-owned.md`.

The change record and the preview queue row are S2's own bookkeeping and are written directly. Every other write goes through `propagate` (step 3).

## 2. Preview (SPEC section 4, step 2)
1. Add a row to the preview queue in `orchestration\SPEC.md`, section 4: change, asked by with approval, planned at, a one-line summary naming the new ids.
2. If `answer-desk\queue.md` shows an `S2-Q<n>` entry that is open or checking, stop here: this change goes out with the next ASK. S2 has one question on the desk at a time.
3. Otherwise send `answer-desk` one ASK, in the `answer-desk\ASKING.md` format, under the next free S2-Q id (the highest S2-Q in `answer-desk\queue.md`, `answer-desk\qa\S2.md` and `orchestration\changes\`, plus one; the first is S2-Q1). Critical: no. Deadline: 15 minutes from now. It covers every change in the queue, rewritten in light of the last answer: each change in one line, its charter lines before and after, every other place it touches, the new ids. Options: (a) apply all; (b) apply all except the C numbers named, or with the changes named; (c) drop all. Recommend (a): Alex already approved each change in substance. Default if unanswered: (a).
4. Remove the sent rows from the queue table and set each record's status to `on the desk (S2-Q<n>)`.
5. Wait with the poke rule: after 15 minutes send `POKE S2: waiting on you for S2-Q<n>, the preview of <C numbers>`, and again every 15 minutes. Before 18:00 Prague keep waiting and do other work. From 18:00 take (a), log it (step 5) and send `WITHDRAW S2-Q<n>`. Answer a `CHECK S2-Q<n>` at once with `CURRENT`, `REPLACE` plus a new block, or `WITHDRAW`. A queued change that can't wait goes in by `REPLACE`, never a second ASK.
6. On (c), set the records to `dropped` and stop. On (b), edit the records as he said and go on, leaving out the C numbers he named (`dropped`).

## 3. Apply
Call `propagate` with the root and the change record. It writes every place as section 3, "Who writes where", sets it: `CHARTER.md` alone (`[orchestration] C<nn>: add D<n> <name>`), the new folder's CLAUDE.md, the roster row (`[roster] C<nn>: ...`, on its own), then the excludes sync and its settings files, path-limited; then it sends the notices and tells each owner afterwards. The order matters: CLAUDE.md, then roster row, then sync.

## 4. Verify
Read every place back from disk and compare it with the After text. Run `propagate` in check mode (`python -I "<root>\orchestration\propagate_check.py" --root "<root>"`) and compare it with a run before the change: a new gap is a miss. List any miss in the record under `## Verify`, fix it as a mechanical follow-on (no new preview), and set `Status: applied <time>`, or `applied on default <time>`.

## 5. Log
If it was applied on the default, add a row to section 9 of `orchestration\SPEC.md`: the time and S2-Q id, the decision, the justification, why it's right, the blast radius. A later answer from Alex is applied as a new change. If the preview queue isn't empty, send the next ASK (step 2.3).

## 6. Launch when its inputs are ready
Not before: when every row in its "Depends on" has delivered what it needs, and Alex is around for anything in its preflight. Run the launch line from its CLAUDE.md, move its roster row from Planned to Running in the same step, and commit `SESSIONS.md` on its own with `[roster]`.

## Never
Write in `Addvery Research\`; reuse or renumber an id; delete a folder or file; edit the charter outside `propagate`.
