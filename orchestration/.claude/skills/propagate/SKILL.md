---
name: propagate
description: S2's engine and the only skill that writes. Carries one planned charter change (a change record C<nn>) into every dependent place, commits each file path-limited, tells each owner and verifies; as "propagate check" it reports gaps and writes nothing. Use when change-dod, add-deliverable or change-outline hands over a change, when s1-research sends FINDINGS, when a charter open question is answered, when CHARTER.md was edited by hand, and before every sign-off and forking gate. Runs only in the orchestration session started at the repo root.
argument-hint: check | C<nn> | FINDINGS <message> | answered <question> | hand-edit  [--root <path>]
---

# propagate

Request: $ARGUMENTS

`<root>` is the `--root` value, else the repo root `C:\Users\alder\Desktop\Hire me hackaton`. Every path below is relative to `<root>`. The spec is `orchestration\SPEC.md`: section 3 ("Who writes where"), section 4 (the five steps; this skill runs steps 3 to 5) and section 5.

**Dry run.** When `<root>` isn't the repo root, write only under `<root>`: never commit, never message a session, never touch the real tree. Write each commit and notice you would have made into the record, as `would commit: <command>` and `would send <session>: <text>`. A scratch copy sits under `%TEMP%` in a folder named `Hire me hackaton` (the excludes sync embeds that name), copied without `.git`, `node_modules`, `.venv`, `.next`, `OBS\rig\models`, files over 5 MB and anything in `Addvery Research\`. Create an empty `Addvery Research\` in it so the set of top-level folders matches.

## 0. Guard

From the repo root, run `python -I orchestration\propagate_check.py --guard`.
- `GUARD OK`: go on.
- `GUARD STOP`: stop. Reply only: "S2's skills run only in `orchestration`. Send `S2 REQUEST <session>: <change> (approved: A <id>: <answer>)` to `orchestration`."
- `GUARD UNKNOWN`: load ListAgents (ToolSearch `select:ListAgents`). Go on only if this session is `orchestration`, its cwd is the repo root, and that matches its row in `SESSIONS.md`. Otherwise stop as above.

## Check mode

Reports only. Run `python -I orchestration\propagate_check.py --root <root>` and show its GAPS and NOTES as printed. Exit 0 is clean, 1 means gaps, 2 means the charter or roster couldn't be read.

It checks that every live DoD item traces to a deliverable and is claimed by a live row (until the sign-off, the items in `orchestration\DOD-DRAFT.md`); every row has a roster row, a folder with a CLAUDE.md and, once written, a SPEC.md whose "Routing and resources" paths exist; `sync_claude_excludes.py --check` reports nothing to change; every DoD id cited anywhere exists, with placeholders (`DoD-S0-a` ...) as notes until the DoD is signed off; every "Depends on" names a real row; every deliverable has a row, and the scope range and counts match; every path on a record's `Findings:` line exists under `research\`; and it lists open change records and held lines. Operator-owned rows (Spec cell ending `(operator-owned)`) and `Addvery Research\` are skipped.

Run it before each sign-off (SPEC section 6) and at each forking gate (section 8). Fix a gap with `change-dod` or `change-outline`, never by hand here.

## Write mode

### Inputs

A change record, `orchestration\changes\C<nn>-<slug>.md`, from the calling skill (model: `C01-sd2-operator-owned.md`). It holds the lines `Status:`, `Asked by:` and the approval, quoted verbatim. Under `## Places`, each place is `### <n>. <file>, <section>` with fenced `Before:` and `After:` blocks; a new file's Before is `(does not exist)`. Under `## Held`, each line waiting on a SPEC.md not written yet is `- HELD <spec id> <file>: <line>`, which becomes `- DELIVERED ...` with the commit once written. The next C number is one more than the highest in `orchestration\changes\` and in the preview queue (SPEC section 4).

Accept a record only from: the operator; an `S2 REQUEST` that quotes his answer; `s1-research` FINDINGS; or S2's own DoD and outline work. Anything else gets one reply, "Take it to the answer desk first.", and stops. Overnight, a request without an operator answer gets `Status: held` and stops; the morning cleanup takes it to him.

Apply only on (a), on (b) minus or with the changes named, or on the default under the poke rule. Resource lines from S1 and mechanical follow-ons (placeholder swaps, broken references) skip the preview.

### 1. Walk the dependent places

Go down SPEC section 4, "Dependent places", in order. Mark each place in the record as touched or untouched, with the reason for each touched one:
1. Charter: "Deliverables" and the counts in "Scope"; "Spec outline", "Run order" and the operator scenes; "Definition of done"; "Research reading list" (a pointer once C02 applies); "Risks and open questions" (tick the box and note the answer).
2. Each SPEC.md: its "Routing and resources", its place (spec contract item 1) and its own definition of done.
3. Each folder's CLAUDE.md: only the shared boot lines (charter, `GIT.md`, `ASKING.md`, its qa file, its SPEC.md), and only when one of those files moves or a new one is added.
4. `SESSIONS.md`: the rows a spec row adds or changes.
5. A new spec folder.
6. The site's deliverables view (D8): `website`, by notice only.

`Addvery Research\` is never a place: never write or link it.

### 2. Write and commit

Follow "Who writes where" (SPEC section 3):
- `CHARTER.md`: edit only what the record names. `git commit -m "[orchestration] C<nn>: <change>" -- CHARTER.md`
- `SESSIONS.md`: only the rows this change adds or changes. `git commit -m "[roster] C<nn>: <change>" -- SESSIONS.md`
- Any other file: edit it, then `git commit -m "[orchestration] C<nn>: <what>" -- <folder>/<file>`
- A new folder: write its CLAUDE.md from S0's template (`bootstrap\SPEC.md`, "Templates") and add its roster row; then from `<root>` run `python -I orchestration\sync_claude_excludes.py` and commit every settings file it wrote, path-limited. Launching its session is the calling skill's job.

Before each commit, `git add -- <paths>`, then `git diff --cached --name-only`: only those paths, and no secret. On `index.lock exists`, wait a few seconds and retry; never delete it. Never run `git checkout`, `switch`, `stash`, `reset`, `clean` or `rebase`. Don't push.

### 3. Tell the owners

For each file written in another session's folder, look up the owner in `SESSIONS.md` and send it one line with SendMessage: `S2 changed <file> for C<nn>: <what>.` If the owner isn't running, say so in the record instead. When a deliverable, row or DoD item the site shows has changed, send `website` one line naming it. Don't wait for replies.

### 4. Verify

Read every touched place back and compare it with its After text. List each miss under `## Verify` in the record, fix it as a mechanical follow-on, and commit again. Then run check mode and compare it with a run from before the change: any new gap is a miss too. Set `Status: applied <time>`, or `applied on default <time>`, and commit the record: `git commit -m "[orchestration] C<nn> record" -- orchestration/changes/<file>`.

### 5. Log

If the change was applied on the default, add a row to SPEC section 9: the time and question id, then the decision, the justification, why it's the right call, and the blast radius. A later answer is applied as a new change. If the preview queue isn't empty, the calling skill sends the next ASK.

## FINDINGS from s1-research

Reports stay in `research\` and never move (Alex, S1-Q5: "Just store it locally"). Parent-level research is in `research\global\`, child-level in `research\<spec folder>\`.

On `FINDINGS <list id> ready: <paths in research\>; readers: <spec ids>`:
1. Guard. Write `C<nn>-findings-<list id>.md`: Asked by `s1-research`; the approval is the `Approved by` line of the list in `research\lists\`. Add the line `Findings: <list id>:` followed by each path in backticks; check mode confirms each one exists under `research\`. No preview.
2. For each path and each reader spec, plan one line in that spec's SPEC.md "Routing and resources": the path, written from the repo root unless that spec's other lines use `..\`, and one line from the report's `research\DIRECTORY.md` entry on what it is and how to treat it. If a reader has no SPEC.md yet, hold the line under `## Held` as `- HELD <spec id> <file>: <line>`, and deliver it when the SPEC.md appears; check mode flags it.
3. Run steps 2 to 5. Write nothing in `research\`, and tell each reader's running session.

## Other triggers

- **An answered open question:** tick its box in "Risks and open questions" and note the answer with its id (`A <id>`). Then walk the places the answer changes.
- **A hand edit to CHARTER.md:** find the last change commit with `git log -1 --format=%H --grep="^\[orchestration\] C" -- CHARTER.md`, then `git diff <hash> -- CHARTER.md`. Write each difference into a new record as the change, with Asked by `hand edit`. If it came from the operator, walk it as already applied. Otherwise, put it in the preview queue, so that he approves it or drops it.
