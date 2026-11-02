# Asking Alex a question

Every question for Alex goes to the answer desk, never into your own chat. Send it with SendMessage to the session named `answer-desk`, one question per message, in this format:

```
ASK <id>
Critical: <yes only if your work is blocked and can't continue on a default; otherwise no>
Deadline: <local time after which you decide yourself; 15 minutes from now unless you have a reason>

## <id> — <short title>

**The question:** <one sentence>

**Context you need.** <Everything Alex needs to decide. He sees nothing but this block.>

**Options.**
- (a) <option and what it costs or decides>
- (b) <...>
- (c) Something else — say what.
<Mark your recommendation and say why in one line.>

**If unanswered by the deadline:** <the default you will take>
```

## Rules

- **Ids** are your asker name plus a number: `S0-Q1`, `S-D2-Q3`, `website-Q1`. The asker is the part before `-Q`, one per spec or per folder session. Never reuse an id.
- **One question on the desk per asker at a time.** Send your next question only after you have the answer to the one before, and rewrite it in light of that answer first. If you send one early, the desk returns it.
- **Keep it current.** When a question on the desk goes stale, send `REPLACE <id>` with a new block, or `WITHDRAW <id>`. If the desk sends `CHECK <id>`, reply at once with `CURRENT <id>`, `REPLACE <id>` plus the new block, or `WITHDRAW <id>`.
- **Answers** come back as `A <id>: <Alex's words verbatim>`. The desk may send `DESK <id>: <Alex's question>`; reply to `answer-desk` with `RE <id>: <your answer>`.
- **Every intake or operator task goes through the desk too.** Alex reads only the desk, never a session's chat (Alex, 2 Nov: "If you ever have a decision intake or an operator task for me ... you need to alert me through the question desk"). The moment you put a decision intake (DI) or operator task (OT) in `Operator tasks\` for him, send `answer-desk` the line `TASK <asker>: <file name> is waiting on you: <one line on what it decides and what it unblocks>`. When he has answered it, send `TASK DONE <asker>: <file name>`. A TASK alert doesn't use your one question on the desk.
- **Poke after 15 minutes.** When you've waited 15 minutes on Alex for anything (a desk question, an operator task, a decision intake), send `answer-desk` the line `POKE <asker>: waiting on you for <what>`. The desk alerts him. Poke again every 15 minutes while you're still waiting. Keep doing any work that doesn't depend on the answer.
- **Before 18:00 Prague, keep waiting.** Alex is at the computer until at least 18:00 (DI-3, 2 Nov: "If it's before 18:00 wall clock, then I'll be here and can handle it"). Until then, a passed deadline means poke, not decide.
- **From 18:00 Prague,** a passed deadline means decide: log it in your spec's decision log (charter P5), send `WITHDRAW <id>`, and don't stop work to wait.
- **The record:** every question you ask and its answer are kept in `answer-desk\qa\<asker>.md` at the repo root. Put that file in your reading list.
