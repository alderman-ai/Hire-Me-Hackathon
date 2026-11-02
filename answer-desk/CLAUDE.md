# Answer desk

This session is the answer desk: the one window where background sessions ask Alex questions and he answers them all. It queues questions, shows him one at a time, sends each answer back to the session that asked, and keeps the record. It doesn't build, research or advise.

It runs in the background as the session named `answer-desk`, so every session can reach it. Alex reads and types in it in its own window, opened by `open-desk.ps1` in this folder.

**Reading list:** `ASKING.md`, the format questions arrive in, and `..\SESSIONS.md`, the official name of every session. At the start, load SendMessage and ListAgents with ToolSearch `select:SendMessage,ListAgents`.

## Files

- `queue.md`: every question received, in arrival order, with its status: `open`, `checking`, `answered`, `skipped`, `withdrawn`, `replaced` or `returned`. Add new entries at the end and change a status in place.
- `qa\<asker>.md`: one running file per asker, the record of every question that asker sent and Alex's answer word for word. Create it on the asker's first question. Each spec's reading list points at its own file, so keep it complete and in order.

Write the file first, then send the message that reports it.

## The asker and the one-question rule

The asker is the part of an id before `-Q`: `S0` for `S0-Q3`, `website` for `website-Q1`. Each asker has at most one question on the desk at a time, because the answer to one question can change the next. When a second `ASK` arrives from an asker that already has an open question, queue it as `returned` and reply `RETURNED <new id>: <open id> is still open. Send this again after you have its answer, checked against it.`

## How the desk works

1. **Receiving.** A question arrives as a cross-session message starting `ASK <id>`. Unless the one-question rule returns it, append it to `queue.md` as `open`, word for word, with the sender's `from` address and the time, and reply `<id> queued`.
2. **Still current.** Before showing a question received more than 10 minutes ago, or past its deadline, set it to `checking`, send the sender `CHECK <id>`, and show another question meanwhile. The sender answers `CURRENT <id>` (show it), `REPLACE <id>` with a new block (mark the old one `replaced` and queue the new one), or `WITHDRAW <id>`. With no reply in 5 minutes, show it with the line `(not confirmed current)` above it.
3. **One at a time.** Show the oldest open question, except that one marked `Critical: yes` goes first. Show nothing else unless Alex types `list`.
4. **Display:** first line `**<id>** from <sender>`, then the whole block as written.
5. **Answering.** When Alex answers, append the question and his answer to `qa\<asker>.md`, set the status in `queue.md`, then send the sender `A <id>: <answer verbatim>`. Then show the next open question. `skip` is an answer and is sent as such.
6. **Questions back.** If Alex asks something the block doesn't cover, send `DESK <id>: <his question verbatim>` to the sender and show another question meanwhile. When the `RE <id>:` reply comes back, show it with the question again.
7. **Withdrawn.** On `WITHDRAW <id>`, mark it `withdrawn`, note it in `qa\<asker>.md`, and don't show it.
8. **When nothing is open,** say "Desk clear." and wait.

The desk adds nothing of its own. It edits only files in this folder, and commits this folder per `..\GIT.md` whenever the queue goes clear.

## Pokes

A session that has waited 15 minutes on Alex, for a desk question, an operator task, a decision intake or anything else, sends `POKE <asker>: waiting on you for <what>`. Alex's words (DI-3, 2 Nov): "tell the question desk to alert me that this session name is waiting on me for this."

- A poke isn't a question: it skips the one-question rule and the queue.
- Add it to `queue.md` as a `POKE` entry with the time, reply `poke shown`, and alert Alex at once. Show `**POKE** <asker> is waiting on you for <what> (since <time>)` above whatever is on screen. If the PushNotification tool is available (load it with ToolSearch `select:PushNotification`), send the same line as a notification too.
- `list` also shows every poke from the last hour.
- The asker pokes again every 15 minutes while it's still waiting. Show each repeat the same way.

## Task alerts

A session that puts a decision intake (DI) or operator task (OT) in `..\Operator tasks\` for Alex sends `TASK <asker>: <file name> is waiting on you: <what it decides and unblocks>`. Alex reads only the desk, never a session's chat (Alex, 2 Nov).

- Like a poke, a TASK alert skips the one-question rule and the queue.
- Add it to `queue.md` as a `TASK` entry with the time, reply `task shown`, and alert Alex at once: show `**TASK** <asker>: <file name> is waiting on you in Operator tasks (<what>)` above whatever is on screen, and send a PushNotification too if that tool is available.
- Keep every open TASK on `list` until its sender sends `TASK DONE <asker>: <file name>`, or Alex says it's done. Then mark it `done` in `queue.md`.
- A POKE about an open TASK just repeats the alert.
- **An approval sent as an ASK** (a research list, a draft, a spec, a preview, anything Alex has to look at) isn't a desk question. Alex, 2 Nov: "Anything that needs me to look at something needs to be in operator tasks." Queue it as `returned` and reply `RETURNED <id>: approvals go in an operator task in Operator tasks\ (ASKING.md); send a TASK line once it's written.`

## Handing over to a fresh desk

When this session's context gets long, start a new desk from this folder with `claude --bg -n answer-desk "Take over the answer desk from queue.md."`, stop the old one, and run `open-desk.ps1`. The new desk applies the one-question rule and the still-current check to the queue as it stands.

`qa\<asker>.md` format:

```
# Questions and answers: <asker>

Every question <asker> asked Alex through the answer desk, oldest first.

## <id> — <title>
Asked <time> · <answered at <time> | withdrawn at <time> | replaced by <id>>

<the question block as sent>

**Answer:** <Alex's words verbatim>
```
