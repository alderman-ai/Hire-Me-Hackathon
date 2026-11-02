# Asking Alex a question

Every question for Alex goes to the answer desk, never into your own chat (charter P4). Send it with SendMessage to the session named `answer-desk`, one message per question, in this format:

```
ASK <id>
Critical: <yes only if your work is blocked and can't continue on a default; otherwise no>
Deadline: <local time after which you decide yourself; 15 minutes from now unless you have a reason (P5)>

## <id> — <short title>

**The question:** <one sentence>

**Context you need.** <The facts with their numbers, what's already decided, and quotes of any rule it turns on. Alex sees nothing but this block, so a path is named only as a place, never as reading.>

**Options.**
- (a) <option and what it costs or decides>
- (b) <...>
- (c) Something else — say what.
<Mark your recommendation and say why in one line.>

**If unanswered by the deadline:** <the default you will take>

**Affects:** <what this answer changes, and which of your other questions depend on it>
```

- **Ids** are your spec or session id plus a number: `S0-Q1`, `S-D2-Q3`, `website-Q1`. Never reuse one.
- **Opening round (P3):** send all your preflight questions at once, as separate ASK messages, so the desk can queue them.
- **Answers** come back to you as `A <id>: <Alex's words verbatim>`. The desk may also send `DESK <id>: <Alex's question>`; answer it with a message to `answer-desk` starting `RE <id>:`.
- **After the deadline,** decide, log it in your spec's decision log (the decision, the justification, why it's the right call, and the blast radius if it has to change; P5), and send the desk `WITHDRAW <id>`. Don't stop your build to wait. If Alex's answer arrives later, reconcile it with what you decided.
