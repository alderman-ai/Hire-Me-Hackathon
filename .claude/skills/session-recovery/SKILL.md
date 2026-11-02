---
name: session-recovery
description: Bring the hackathon's background sessions back after they die, whether from an accidental delete in agent view, a power cut, a reboot or a crash. Resumes every roster session in SESSIONS.md under its official name with its full history, tells each one what happened and where it stopped, reopens the answer desk window, and reports to Alex what was lost. Use when Alex says the sessions died, were deleted or ended, the power went out, or types /session-recovery.
argument-hint: [what happened and when, e.g. "power cut around 14:05"]
---

# Session recovery

Brings every roster session back as its own background session, under its official name and with its full history, and tells Alex how bad it was. First run: 2 Nov, after Alex deleted all background sessions from agent view at 13:20 Prague. Nothing was lost, and all sessions were back in 9 minutes.

What happened, per Alex: $ARGUMENTS

The repo root is `C:\Users\alder\Desktop\Hire me hackaton`. This skill's files are in `.claude\skills\session-recovery\` there:
- `inventory.py`: read-only. Shows who's dead, where each session stopped, and what survived.
- `resume.ps1`: relaunches one session safely.

## Rules

- **The roster is the source of truth.** Resume every row of the *Running* table in `SESSIONS.md` that isn't marked Temporary. Use exactly its roster name and start it from its roster folder, because sessions message each other by those names. Never launch a name that's already live; `resume.ps1` refuses to.
- **Report, don't resume:**
  - Temporary rows.
  - Transcripts that aren't on the roster. That includes whatever Alex was deleting, and sessions that finished and were dropped from the roster.
  - Older transcripts of a roster name that were superseded by a handoff.

  Alex can ask for any of them back.
- **Resume, don't restart.** `claude --bg --resume <id>` keeps the session's ID and full history. Launch fresh under the roster name only when there's no transcript.
- **Don't touch what's working.** Never restart OBS, the rig controller, the recorders, sync loops, collectors or dev servers yourself, and never run /start, /pause or /stop. Tell each owner the facts in its notice, and let it act in its own session.
- **Prague time, always.** Transcripts are in UTC, and git and the PC clock are in local time. Talk to Alex in Prague time with UTC in brackets, for example 13:20 Prague (12:20 UTC). Prague is UTC+1 in winter (CET) and UTC+2 in summer (CEST). The inventory converts times for you. Don't trust Git Bash's `date` zone label; on 2 Nov it said CEST in November.
- **Don't trust file times.** A delete touched every transcript at the moment of the incident. Use "last acted" from the inventory, which comes from the timestamps inside the transcript.
- **Talk to Alex in this chat.** The desk may be down during a recovery, so don't route questions through it. Where a sensible default exists, take it and note it in the report.
- **Git:** follow `GIT.md`. The only file this skill edits is `SESSIONS.md`, and only the Notes cells of the rows it relaunched.

## Steps

### 1. Inventory

```bash
python -I "C:/Users/alder/Desktop/Hire me hackaton/.claude/skills/session-recovery/inventory.py" 24
```

The number is how many hours of transcripts to scan. Read every section:
- **ROSTER:** each row is LIVE (leave it alone), DEAD (resume it) or temporary. For each dead session it shows when it last acted, whether it was idle or cut off mid-turn, its last prompt, its last words, its uncommitted files, and whether it ran a `/loop` or cron.
- **NOT ON THE ROSTER:** for the report only.
- **SUGGESTED RESUME ORDER:** the order and the exact `-Folder` and `-SessionId` values.
- **NON-CLAUDE PROCESSES:** what survived, and which session owns each process.
- **RECORDING:** the latest `session.json`. "STALE" means the record says recording but nothing is updating it.
- **GIT:** the branch, a leftover `index.lock`, unpushed commits.
- **ANSWER DESK WINDOWS:** which desk windows are attached and which are dead.

For any session that was cut off mid-turn, see exactly where it stopped:

```bash
python -I "C:/Users/alder/Desktop/Hire me hackaton/.claude/skills/session-recovery/inventory.py" --tail <session-id> 10
```

Then check whether its last step actually landed: `git log -3 -- <folder>` and `git status -- <folder>`.

### 2. Stop only for these

- **`.git\index.lock` exists and no git process is running:** it's stale, from a power cut. `GIT.md` forbids deleting it, so ask Alex before removing it.
- **The branch isn't `main`:** tell Alex and stop. Don't fix it yourself.

Everything else goes ahead without asking.

### 3. Write one notice per session

Save each notice as a plain text file in `$CLAUDE_JOB_DIR\tmp`, for example `notice-rig.txt`. Each notice is the shared preamble, then a `YOUR STATE` part written from the inventory. Keep notices factual and short, and leave out double quotes; the launcher swaps any that slip in.

**Preamble.** Fill in the brackets:

> RECOVERY NOTICE. At [HH:MM] Prague time ([HH:MM] UTC) [what happened, e.g. Alex accidentally deleted every background session in this project from agent view / the power went out]. You have been resumed with your full history under your original session ID. Transcript timestamps are UTC; Prague is UTC+[1 or 2], so use Prague time with Alex. Your old job folder is gone, so any background tasks or Monitors you had are gone; crons may have survived. Also resumed, under their roster names: [names]. Not resumed: [names and why]. [Recording: still running and untouched / stopped at about HH:MM, see rig]. Report problems to orchestration as usual.

**YOUR STATE**, by situation:
- **Idle:** say when its last turn ended and that nothing of its own was in flight.
- **Cut off mid-turn:** say what it was doing when it was cut off, what landed (commit hash) and what didn't (uncommitted files, a step not taken). End with "Pick up exactly where you stopped."
- **Ran a `/loop` or cron:** tell it to run CronList first and re-arm the job, with the same schedule and prompt, only if it's missing. On 2 Nov the watcher's cron survived the resume, so blindly re-arming would have doubled it.
- **Had background processes:** name which survived and which died, by PID, from the NON-CLAUDE PROCESSES section, and let it restart what it needs.

**By role:**
- **`orchestration`:** list who's being resumed and who isn't. Ask for a one-line acknowledgement in its own output, and tell it not to message anyone about the notice.
- **`answer-desk`:** say the recovery session is reopening its standalone window right after it starts, so it must not start another desk. Tell it to re-read `queue.md` and carry on with its rules.
- **`rig`:** give the recording facts from the inventory.
  - **If the recording survived:** check its health per the runbook, restart nothing that's working, and send `website` no clock message, because the state didn't change.
  - **If it died** (stale record, dead controller, no OBS): say so plainly. It follows its runbook, sends anything Alex must type (/stop, /start) to him through the answer desk, and tells `website` when the clock state changes.
- **`website`:** say whether its clock sync loop and dev server survived.
- **Any session launched fresh** (no transcript): give it the preamble, then: Read your CLAUDE.md and its reading list, `git log -10 -- <your folder>` and your folder's files, then take up your role from where they leave off.

### 4. Resume, orchestration first

Resume `orchestration` alone first, to prove the method:

```powershell
& "C:\Users\alder\Desktop\Hire me hackaton\.claude\skills\session-recovery\resume.ps1" -Name orchestration -Folder '.' -SessionId <uuid> -PromptFile "$env:CLAUDE_JOB_DIR\tmp\notice-orchestration.txt"
```

Check it with `claude logs <id>`, or with `--tail <id> 2` after a few seconds. You should see the notice and an acknowledgement in a reply that knows its history.

Then resume the rest in one PowerShell call, in the suggested order. Sessions that were cut off mid-turn and will launch or change things go last.
- **No transcript:** use `-Fresh` instead of `-SessionId`.
- **Checking a command first:** `-DryRun` prints it without launching.
- **If the sandbox blocks a launch:** rerun it with `dangerouslyDisableSandbox: true`.

The launcher clears the Claude markers this session would pass to its children, starts each session in its roster folder, and refuses any name that's already live.

### 5. Reopen the answer desk window

Once `answer-desk` is running:

```powershell
& "C:\Users\alder\Desktop\Hire me hackaton\answer-desk\open-desk.ps1" -NewWindow
```

Run the inventory again and check its desk section. The new window should show `attached (<desk id>)`. Windows marked "NOT attached" are dead. Tell Alex to close them, and don't close his windows yourself.

### 6. Note the relaunch in the roster

`SESSIONS.md` says whoever relaunches a session updates its row. In each resumed row's Notes cell, add: `Resumed HH:MM Prague on D Mon after <cause>.` Then:

```bash
git -C "C:/Users/alder/Desktop/Hire me hackaton" diff -- SESSIONS.md
git -C "C:/Users/alder/Desktop/Hire me hackaton" commit -m "[roster] Resume <names> after <cause>" -- SESSIONS.md
```

If the diff shows edits you didn't make, someone else is mid-edit. Wait a minute and check again before committing. Don't push; the watcher does.

### 7. Verify

- Run the inventory again. Every non-temporary roster row should be LIVE.
- Read each session's first reply with `--tail <id> 3`. A session that reacts to the notice wrongly gets one corrective SendMessage, by its roster name.
- Wait for `rig`'s health verdict, and for any session still busy with its notice, without a foreground sleep, which is blocked. Run this with `run_in_background: true`. It waits for the turn that began with the notice to end, then prints the reply:

```bash
python -I "C:/Users/alder/Desktop/Hire me hackaton/.claude/skills/session-recovery/inventory.py" --wait <session-id> 600
```

### 8. Report to Alex

Lead with the verdict: how bad it was, in one or two sentences. Then:
- **What happened:** the time in Prague (UTC) and the cause.
- **What survived on its own:** the recording, sync loops, servers.
- **A table of what was lost:** Session | State at the incident | Loss. Usually the loss is "nothing" or "N seconds of a turn, now redone".
- **Where things stand now:** each session's first reply, in a line.
- **What Alex has to do:** dead desk windows to close, anything rig needs him to type, approvals such as a stale lock. If nothing, say so.
- A `result:` line.

## Lessons from 2 Nov

- **Deleting a group:** deleting a folder group in agent view ends every session in that folder. To remove one session, use `claude rm <id>` or `claude stop <id>` on that ID.
- **Dead sessions:** `claude agents --json` lists only live sessions. A dead session survives only as its transcript, `~/.claude/projects/<encoded folder path>/<session-id>.jsonl`, and that's all `--resume` needs.
- **Blank spares:** agent view can keep a blank spare session alive with no transcript. Ignore it.
- **Job folders:** a resumed session's old job folder is gone, so its background Bash tasks and Monitors died with it. Crons can survive.
- **Launch markers:** a child launched from inside a Claude session inherits that session's markers. `resume.ps1` clears them, using the same list as `open-desk.ps1`.
- **Quotes:** Windows PowerShell 5.1 breaks native arguments that contain double quotes.
- **Power cut or reboot:**
  - The Claude daemon starts by itself with the first `claude --bg`.
  - OBS, the rig controller, the recorders, the clock sync, the collector and the dev server are all down.
  - The latest `session.json` may still say recording.
  - Files on disk survive, but the last seconds before the cut may not.
  - Check for a stale `index.lock` before anyone commits.
