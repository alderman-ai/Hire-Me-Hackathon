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
- **After the deadline,** decide, log it in your spec's decision log (charter P5), and send `WITHDRAW <id>`. Don't stop work to wait.
- **The record:** every question you ask and its answer are kept in `answer-desk\qa\<asker>.md` at the repo root. Put that file in your reading list.
