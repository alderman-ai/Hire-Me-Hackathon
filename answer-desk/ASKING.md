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
- **Every file in `Operator tasks\` must make sense to Alex on its own** (Alex, 2 Nov: "name them more human legible, and include a section at top of doc that really gives me context. no d2 s1 type references, I need all context in front of my eyes without checking other docs"):
  - **Name:** a plain verb, then what it's about in everyday words, with the meaning in the first 35 characters, because Obsidian cuts names off there. `Approve - ` for a gate approval, `Decide - ` for a decision intake, `Do - ` for any other operator task. Examples: `Approve - research plan for the whole project.md`, `Decide - how the scraping demo should work.md`. No ids or codes in the name.
  - **Top section, "What this is":** in plain words, what this part of the project is and what it's for, what he's being asked, what happens once he answers, what's waiting on it, how long it should take him, and the deadline. Everything he needs, so he never opens another file.
  - **No internal codes in the text:** no D2, S1, S-D3, DoD-13, C01, P4 or similar. Say what the thing is ("the company and stakeholder research", "the GetSales outbound demo"). Ids live only in the frontmatter, for the tools. If quoted charter or spec text contains a code, explain it in brackets right there.
- **Approvals are gate-approval operator tasks, not desk questions.** Alex, 2 Nov: "Anything that needs me to look at something needs to be in operator tasks." Whenever a spec reaches a gate (a research list, a definition of done, a spec draft, a preview of a change, anything he has to approve):
  1. Freeze it at that stage into an operator task in `Operator tasks\`, written from `orchestration\_templates\Gate approval template.md` with the next free `OT-<nn>` id: copy the whole document in as it stands, and name the file `OT-<nn> Gate approval <spec id> <gate>.md`. It carries an `I approve` checkbox and a fence for changes.
  2. Send the TASK line below, so the desk alerts him.
  3. While you're blocked on it, check it every 5 minutes with `python -I orchestration\check_gate.py "<file>"` (from the repo root). It exits 0 on `APPROVED` or `CHANGES` and 1 while `OPEN`. Wait with the Monitor tool running that check every 300 seconds until it exits 0, so waiting costs no tokens; use `/loop 5m` only if Monitor isn't available. Keep doing any work that doesn't depend on the gate.
  4. **Ticked means approved together with the feedback box** (Alex, 2 Nov 16:36: "Make sure that even if I approve something, the feedback section gets considered as well. Even if I approve something that doesn't include what I mentioned in the feedback section, it's approved along with whatever's in the feedback section"). So on `APPROVED`, carry on; on `APPROVED+CHANGES` (ticked, with text in the box), apply the text and carry on, with no second approval; on `CHANGES` (box empty), apply them, update the snapshot, and wait again. Then send TASK DONE and ARCHIVE, as below.
  Keep desk questions for quick decisions that fit in one block. Any other kind of operator task is written from `orchestration\_templates\Operator task template.md`.
- **Every intake or operator task goes through the desk too.** Alex reads only the desk, never a session's chat (Alex, 2 Nov: "If you ever have a decision intake or an operator task for me ... you need to alert me through the question desk"). The moment you put a decision intake (DI) or operator task (OT) in `Operator tasks\` for him, send `answer-desk` the line `TASK <asker>: <file name> is waiting on you: <one line on what it decides and what it unblocks>`. When he has answered it, send `TASK DONE <asker>: <file name>`. A TASK alert doesn't use your one question on the desk.
- **Then have it archived.** Once you've applied Alex's answers, send `orchestration` the line `ARCHIVE <file name>: readers <spec ids or session names>`, naming every spec or session that should read them. `orchestration` moves it into `Operator tasks\Archive\`, catalogs it in `Operator tasks\Archive\INDEX.md` and puts it on each reader's reading list. Read that index before asking Alex something he may already have answered.
- **Poke after 15 minutes.** When you've waited 15 minutes on Alex for anything (a desk question, an operator task, a decision intake), send `answer-desk` the line `POKE <asker>: waiting on you for <what>`. The desk alerts him. Poke again every 15 minutes while you're still waiting. Keep doing any work that doesn't depend on the answer.
- **Copywriting needs a copywriting skill** (Alex, 2 Nov about 16:40: "Do not do any copywriting without identifying which skill you need to turn on, telling the orchestrator to turn it on for you. Do not do any copywriting without a copywriting skill."). Copywriting is any text a reader outside the project will see: site copy, posts, articles, messages to the six, template text, captions. Before writing any, send `orchestration` the line `SKILL <asker>: <skill name> for <what you're writing>`. Pick from the skills your session lists, for example `marketing:draft-content` or `marketing:content-creation` for posts, articles and messages, `design:ux-copy` for site microcopy, and `marketing:brand-review` to check a draft against the brand voice; the blog research (L-03 R5) will name the best one for articles. Wait for `SKILL ON <asker>: <skill name>`, then invoke it with the Skill tool and write. Copy already written without one gets a pass through the right skill before it ships.
- **Before 18:00 Prague, keep waiting.** Alex is at the computer until at least 18:00 (DI-3, 2 Nov: "If it's before 18:00 wall clock, then I'll be here and can handle it"). Until then, a passed deadline means poke, not decide.
- **From 18:00 Prague,** a passed deadline means decide: log it in your spec's decision log (charter P5), send `WITHDRAW <id>`, and don't stop work to wait.
- **The record:** every question you ask and its answer are kept in `answer-desk\qa\<asker>.md` at the repo root. Put that file in your reading list.
