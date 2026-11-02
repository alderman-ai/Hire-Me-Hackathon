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

## Alex's reset rules (2 Nov, 17:00): these override anything below

Alex stopped every session at about 16:47 because too much was waiting on him: "There's too much stuff that's paused on me. I read through it and it's dumb." These rules came out of that reset, and they apply to every session.

1. **Easy judgment calls are yours.** Decide, log it in your spec's decision log (the decision, why, and the blast radius if it has to change), and carry on. Only a real blocker goes to Alex. In his words: "If things are an easy judgment please clear the plate for me. We can just make edits later."
2. **No plan or spec approvals for Alex any more.** No gate for a spec draft, a research list, a methodology or a charter preview. His only sign-offs are the ones the charter's definition of done names: the six stakeholders confirmed, his brand sign-off on the Canva templates and on the LinkedIn posts, and the last 10% of each blog post. Anything else you'd have gated: decide and log it (rule 1).
3. **Public sources are fine.** Everything that comes from public pages (the company's site, public LinkedIn profiles and posts, podcasts) may be used and published. Alex: "all the sources of information are public information. It needs to stop freezing me every 5 minutes because there's some sensitive detail." The only hard exclusions are the charter's: secrets, the Apify proposal, and his own outbound outside the GetSales demo folder. Never stop to ask him about anything else on privacy grounds.
4. **Written work goes into Claude Docs.** Any text for outside readers (articles, LinkedIn posts, page copy) is drafted in a Claude Doc: load the copywriting skill first (the rule below), then the `anthropic-skills:docs` skill before any Docs call. Alex does his last-mile edits in the Doc, and his comment on it is the sign-off; it reaches the session that made the Doc. The session then reads the final text back into the repo. Alex: "writen work shoudl be done there, it's a good last mile editing surface".
5. **Design work needs a design skill, the same as copy.** Before building any page, template, visual or chart, invoke `frontend-design:frontend-design` (installed per folder in website, blog-articles, canva-templates, canva-video and linkedin-content; a session started before 17:45 that can't resolve it reads the plugin's SKILL.md from `~\.claude\plugins\cache\claude-plugins-officialrontend-design\ea10b213686c\skillsrontend-design\` and follows it, and logs that) for pages and visuals (switched on in `website\`, `blog-articles\`, `canva-templates\`, `canva-video\` and `linkedin-content\`) or `dataviz` for charts. Before it ships, run `design:design-critique` and `design:accessibility-review` on it. A subagent doing design work gets the skill named in its prompt with the instruction to invoke it first. Alex: "Don't let them do copywriting and design work without an actual skill enabled please".
6. **One brand source for every visual:** the website's Addvery kit, taken from Addvery's live site, in `website\local\addvery\brand\` (`BRAND.md`, `tokens.css`; the assets are in `website\public\addvery\`). It's git-ignored, so read it from the local disk. The gradient layer (violet to orchid) leads; the editorial layer (solid amethyst, lavender, plum) is for long-form pages. Body text is Outfit, exactly as Addvery uses it; Inter Tight is the free stand-in for their licensed Neue Haas Grotesk display face. The site already carries these as tokens in `website\app\addvery-tokens.css`: reuse them rather than retyping values.
7. **Pokes only when your work is blocked,** at most every 30 minutes. Nothing that blocks no work is poked.
8. **No 18:00 cut-off.** Alex works through the night ("We're working all night"), so the 18:00 rules below no longer apply. A passed deadline on a real blocker means: poke once (rule 7), then decide and log it (rule 1).

## Rules

- **Ids** are your asker name plus a number: `S0-Q1`, `S-D2-Q3`, `website-Q1`. The asker is the part before `-Q`, one per spec or per folder session. Never reuse an id.
- **One question on the desk per asker at a time.** Send your next question only after you have the answer to the one before, and rewrite it in light of that answer first. If you send one early, the desk returns it.
- **Keep it current.** When a question on the desk goes stale, send `REPLACE <id>` with a new block, or `WITHDRAW <id>`. If the desk sends `CHECK <id>`, reply at once with `CURRENT <id>`, `REPLACE <id>` plus the new block, or `WITHDRAW <id>`.
- **Answers** come back as `A <id>: <Alex's words verbatim>`. The desk may send `DESK <id>: <Alex's question>`; reply to `answer-desk` with `RE <id>: <your answer>`.
- **Every file in `Operator tasks\` must make sense to Alex on its own** (Alex, 2 Nov: "name them more human legible, and include a section at top of doc that really gives me context. no d2 s1 type references, I need all context in front of my eyes without checking other docs"):
  - **Name:** a plain verb, then what it's about in everyday words, with the meaning in the first 35 characters, because Obsidian cuts names off there. `Approve - ` for a gate approval, `Decide - ` for a decision intake, `Do - ` for any other operator task. Examples: `Approve - research plan for the whole project.md`, `Decide - how the scraping demo should work.md`. No ids or codes in the name.
  - **Top section, "What this is":** in plain words, what this part of the project is and what it's for, what he's being asked, what happens once he answers, what's waiting on it, how long it should take him, and the deadline. Everything he needs, so he never opens another file.
  - **No internal codes in the text:** no D2, S1, S-D3, DoD-13, C01, P4 or similar. Say what the thing is ("the company and stakeholder research", "the GetSales outbound demo"). Ids live only in the frontmatter, for the tools. If quoted charter or spec text contains a code, explain it in brackets right there.
- **Approvals are gate-approval operator tasks, not desk questions,** and since the reset only the sign-offs in reset rule 2 reach him (written work is signed off in its Claude Doc instead, rule 4). Alex, 2 Nov: "Anything that needs me to look at something needs to be in operator tasks." Whenever a spec reaches a gate (a research list, a definition of done, a spec draft, a preview of a change, anything he has to approve):
  1. Freeze it at that stage into an operator task in `Operator tasks\`, written from `orchestration\_templates\Gate approval template.md` with the next free `OT-<nn>` id: copy the whole document in as it stands, and name the file `OT-<nn> Gate approval <spec id> <gate>.md`. It carries an `I approve` checkbox and a fence for changes.
  2. Send the TASK line below, so the desk alerts him.
  3. While you're blocked on it, check it every 5 minutes with `python -I orchestration\check_gate.py "<file>"` (from the repo root). It exits 0 on `APPROVED` or `CHANGES` and 1 while `OPEN`. Wait with the Monitor tool running that check every 300 seconds until it exits 0, so waiting costs no tokens; use `/loop 5m` only if Monitor isn't available. Keep doing any work that doesn't depend on the gate.
  4. **Ticked means approved together with the feedback box** (Alex, 2 Nov 16:36: "Make sure that even if I approve something, the feedback section gets considered as well. Even if I approve something that doesn't include what I mentioned in the feedback section, it's approved along with whatever's in the feedback section"). So on `APPROVED`, carry on; on `APPROVED+CHANGES` (ticked, with text in the box), apply the text and carry on, with no second approval; on `CHANGES` (box empty), apply them, update the snapshot, and wait again. Then send TASK DONE and ARCHIVE, as below.
  Keep desk questions for quick decisions that fit in one block. Any other kind of operator task is written from `orchestration\_templates\Operator task template.md`.
- **Every intake or operator task goes through the desk too.** Alex reads only the desk, never a session's chat (Alex, 2 Nov: "If you ever have a decision intake or an operator task for me ... you need to alert me through the question desk"). The moment you put a decision intake (DI) or operator task (OT) in `Operator tasks\` for him, send `answer-desk` the line `TASK <asker>: <file name> is waiting on you: <one line on what it decides and what it unblocks>`. When he has answered it, send `TASK DONE <asker>: <file name>`. A TASK alert doesn't use your one question on the desk.
- **Then have it archived.** Once you've applied Alex's answers, send `orchestration` the line `ARCHIVE <file name>: readers <spec ids or session names>`, naming every spec or session that should read them. `orchestration` moves it into `Operator tasks\Archive\`, catalogs it in `Operator tasks\Archive\INDEX.md` and puts it on each reader's reading list. Read that index before asking Alex something he may already have answered.
- **Poke only when blocked** (reset rule 7). When your work is blocked and you've waited 30 minutes on Alex, send `answer-desk` the line `POKE <asker>: waiting on you for <what>`. The desk alerts him. Poke again at most every 30 minutes while you're still blocked. Keep doing any work that doesn't depend on the answer.
- **Copywriting needs a copywriting skill** (Alex, 2 Nov about 16:40: "Do not do any copywriting without identifying which skill you need to turn on, telling the orchestrator to turn it on for you. Do not do any copywriting without a copywriting skill."). Copywriting is any text a reader outside the project will see: site copy, posts, articles, messages to the six, template text, captions. Before writing any, send `orchestration` the line `SKILL <asker>: <skill name> for <what you're writing>`. Pick from the skills your session lists, for example `marketing:draft-content` or `marketing:content-creation` for posts, articles and messages, `design:ux-copy` for site microcopy, and `marketing:brand-review` to check a draft against the brand voice; the blog research (L-03 R5) will name the best one for articles. Wait for `SKILL ON <asker>: <skill name>`, then invoke it with the Skill tool and write. Copy already written without one gets a pass through the right skill before it ships. A subagent that writes copy must have the skill named in its prompt, with the instruction to invoke it first, or the skill may not load (L-03 R5).
- **Passed deadlines** (reset rule 8, replacing the old 18:00 rule, since Alex works through the night): poke once if your work is blocked, then decide, log it in your spec's decision log (charter P5), send `WITHDRAW <id>`, and don't stop work to wait.
- **The record:** every question you ask and its answer are kept in `answer-desk\qa\<asker>.md` at the repo root. Put that file in your reading list.
