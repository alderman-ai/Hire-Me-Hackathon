---
name: archive-intake
description: Archive an answered decision intake (DI) or operator task (OT) - move it into Operator tasks\Archive\, mark it Archived, catalog it in Operator tasks\Archive\INDEX.md, fix every path that pointed at it, and put it on the reading list of every spec or session that needs it. Use when an intake or operator task is answered and its owning session has applied the answers (or they need no action), on an `ARCHIVE <file name>: readers <...>` message, and as a sweep at every S2 change run. Runs only in the orchestration session at the repo root; anywhere else it stops.
argument-hint: <file name> [readers <spec ids or session names>] | sweep
---

# archive-intake

Spec: `orchestration\SPEC.md`. Request: $ARGUMENTS

## The lifecycle
- **Decision intake** (`Intake State`): Pool → Waiting on operator → Answered → Archived.
- **Operator task** (`Task State`): Open → Done → Archived.

What each state means:
- **Pool:** drafted, not yet in front of Alex.
- **Waiting on operator / Open:** the owner has sent the desk `TASK <asker>: <file name> is waiting on you: ...` (`answer-desk\ASKING.md`).
- **Answered / Done:** Alex said "DI-<n> is ready" or "OT-<nn> done". The owner sets the state and sends `TASK DONE <asker>: <file name>`.
- **Archived:** this skill, once the owner has applied his answers and sent `orchestration` the line `ARCHIVE <file name>: readers <spec ids or session names>`.

Only this skill moves a file into `Operator tasks\Archive\`, and nothing moves back out. An archived file holds Alex's answers verbatim: it is read for wording and never re-asked, and its body is never edited.

## 0. Guard
Run `python -I "C:\Users\alder\Desktop\Hire me hackaton\orchestration\propagate_check.py" --guard`. `GUARD OK` means go on. On `GUARD UNKNOWN`, run in PowerShell `$a = (claude agents --json | Out-String | ConvertFrom-Json) | Where-Object { $_.sessionId -eq $env:CLAUDE_CODE_SESSION_ID }; "$($a.name) | $($a.cwd)"`, which must print exactly `orchestration | C:\Users\alder\Desktop\Hire me hackaton`. On `GUARD STOP` or anything else: write nothing and reply "archive-intake runs only in the `orchestration` session. Send `orchestration` the line `ARCHIVE <file name>: readers <spec ids or session names>`." Then stop.

## 1. Which files
- **`ARCHIVE <file name>: readers <...>`:** that one file, with those readers.
- **`sweep`:** every `*.md` directly in `Operator tasks\` whose frontmatter says `Intake State: Answered` or `Task State: Done`, plus every gate approval (`Task type: Gate approval`) for which `python -I orchestration\check_gate.py "<file>"` prints `APPROVED` or `APPROVED+CHANGES`. Run it at the start of every S2 change run (any skill in `orchestration\SPEC.md` section 5), and whenever asked. A swept file takes as readers its asker plus every spec or CLAUDE.md that already cites it (`git grep -n -F "<file name>"`). The sweep also adds any reader line marked `(held)` in `INDEX.md` whose SPEC.md now exists (step 6).

## 2. Confirm it's applied
1. The state is `Answered` or `Done`. A gate approval still marked `Open` counts once `check_gate.py` prints `APPROVED`, or prints `APPROVED+CHANGES` or `CHANGES` and its asker (`Requested by:`) has applied the changes (a tick approves the feedback box too: Alex, 2 Nov 16:36); set its `Task State: Done` before step 3. Never archive anything else in `Pool`, `Waiting on operator` or `Open`.
2. The owning session has applied the answers, or they need no action. Proof is any one of: its `ARCHIVE` line; its SPEC.md preflight table or decision log recording the answers; a commit that applies them (`git log --oneline -S "<id>"`); answers that only confirm a default.
3. If there's no proof, don't archive it. Send the owner `ARCHIVE? <file name>: once you've applied Alex's answers, send me ARCHIVE <file name>: readers <spec ids or session names>`, and go on with the next file.

## 3. Move and mark
1. `git mv "Operator tasks/<file name>" "Operator tasks/Archive/<file name>"`, keeping the name. Create `Operator tasks\Archive\` first if it's missing.
2. In the frontmatter, set `Intake State: Archived` (or `Task State: Archived`) and add `Archived: <YYYY-MM-DD>` on the line after `Created:`. Change nothing else in the file.
3. An operator task with a `Moves to:` line: its result file belongs at that path. Check it's there, and name the path in its Decisions cell. The task file itself still goes to the archive.

## 4. Catalog
In `Operator tasks\Archive\INDEX.md`:
1. Add a row to the main table, in id order: `| <id> | <title> | <asker> | <YYYY-MM-DD> | <decisions> | <readers> |`.
   - **Title:** the file name without its id and `.md`.
   - **Answered:** the date of the commit that recorded his answer: `git log --format=%ad --date=short -S "Intake State: Answered" -- "<old path>"`, or `-S "[x] I approve"` for a gate approval. Today's date if there's none.
   - **Decisions:** one line per question, joined with `<br>`: the question id (`Q<n>.<k>`, or `OT-<nn>` for a task) and the gist of Alex's final answer in plain words. Where he superseded an answer, give the final one. Never a secret, and nothing from `Addvery Research\`'s contents.
   - **Readers:** each spec id or session name, with the file that carries its reading-list line in brackets.
2. Add each question id to the "By topic" table under its topic. Add a topic row only when none fits.

## 5. Fix references
Run `git grep -n -F "<file name>" -- . ":!Addvery Research" ":!answer-desk/queue.md" ":!answer-desk/qa" ":!Operator tasks/Archive"`. In every hit that is a path to the old place, insert `Archive\` after `Operator tasks\`, keeping the hit's own separator and relative prefix (`..\Operator tasks\Archive\<file name>`). Change no other wording. Never touch the historical records: `answer-desk\queue.md`, `answer-desk\qa\`, `OBS\Processed\` and `briefing\data\`, nor `Addvery Research\`.

## 6. Reading lists
For each reader, unless the file already cites the archived path after step 5:
- **A spec with a SPEC.md:** add a line to its "Routing and resources" section: `` - `Operator tasks\Archive\<file name>`: Alex's answers to <what it decided>, verbatim. Read them for wording, never re-ask them. ``
- **A session without a SPEC.md:** the same line in its CLAUDE.md reading list (or boot reading), with the folder's `..\` prefix.
- **The orchestration session:** the S2 reading list in the root `CLAUDE.md`, or the routing list in `orchestration\SPEC.md`.
- **A spec not written yet:** write `<spec id> (held)` in the Readers cell. The next sweep adds the line once its SPEC.md exists.

## 7. Commit
1. Run `git diff --cached --name-only`. Every path must be one this run touched.
2. If a file you edited also holds someone else's uncommitted lines (`git diff <file>` shows lines this run didn't write), stage only your own hunks: write them to a patch and run `git apply --cached`. Then commit with no pathspec, after checking `git diff --cached --name-only` again.
3. Otherwise commit path-limited, naming the old and the new path of each moved file: `git commit -m "[orchestration] Archive <ids>: <what>" -- "Operator tasks/<file name>" "Operator tasks/Archive/<file name>" "Operator tasks/Archive/INDEX.md" <each edited file>`.
4. End the message with the session's attribution lines. Don't push: the watcher does.

## 8. Tell the readers
Send each reader session, and the asker if it isn't a reader, one line by its `SESSIONS.md` name: `S2 archived <id>: it's now Operator tasks\Archive\<file name>, catalogued in Operator tasks\Archive\INDEX.md. <file> <what changed>.` A planned session that isn't running gets nothing, because the line is already in its files.

## Never
- Edit an archived file's body, or move a file out of `Archive\`.
- Archive a file Alex hasn't answered.
- Write in `Addvery Research\`, `answer-desk\queue.md`, `answer-desk\qa\` or `OBS\Processed\`.
- Run `git checkout`, `switch`, `stash`, `reset`, `clean` or `rebase` (`GIT.md`).
