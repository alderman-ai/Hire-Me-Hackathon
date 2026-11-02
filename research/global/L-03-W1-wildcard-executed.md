# L-03 W1 Wildcard, can it be executed? Two articles from Alex's dictations, against the 18:00 clock

- **Question:** At 16:38 Prague nothing has been dictated, the blog pipeline's intake (DI-8) is unanswered and not poked, and the articles session isn't launched. Can the two articles still be produced from Alex's dictations, with the sessions, skills and tools this project has? What is the least Alex has to do before he leaves at about 18:00 so the night isn't wasted, what stalls without anyone noticing, and does Alex's rule "no copywriting without a copywriting skill" actually work inside the pipeline's subagent stages?
- **Date:** 2026-11-02 (written 16:38–16:55 Prague; the state it describes may have moved on since)
- **By:** session s1-research subagent
- **List:** L-03 blog, item 7 of 9 (W1 wildcard)
- **Readers:** S-D4 (blog-pipeline), S-D5 (blog-articles); `orchestration` for the relay items in C3 and C4
- **Status:** every recommendation is an option for Alex, not a decision.

## (a) Gap analysis

### What the other items cover

| Item | Covers | Lens |
| --- | --- | --- |
| R1 | Method: transcript to post in Alex's voice, staged or one pass, avoiding generic drafts, what "the last 10%" leaves | Quality of the draft |
| R2 | Claude Design: what it can do for a long post, how output leaves it, against a site template | Where the look is built |
| R3 | Capture quality: Wispr Flow and the rig transcript on 15 minutes of unscripted speech, and the cleanup step | Input quality |
| R4 | What a finished B2B post looks like, and the smallest template | Output quality |
| R5 | Which copywriting skill to turn on (Alex's rule) | Which tool |
| R6 | Evidence for article 1 (AI workflows as a managed service; the vertical skill slider) | Content of article 1 |
| W2 | Can it be delivered? | Getting the posts to readers |
| W3 | Will it be received? | How readers take them |
| L-01-W1 (done) | Whether a dozen background sessions survive the day and the night: usage limits, idle stops, Windows Update | The platform overnight |

### Left open by all of them

1. **The clock.** Every item assumes the dictations happen. None checks whether they can happen, when, or what the pipeline's own rules let it do before 18:00.
2. **What stalls without anyone noticing.** DI-8 isn't poked (Alex, 14:38), and part 2 of S-D4 waits on it, so nothing moves and nothing complains.
3. **The copywriting-skill rule, mechanically.** R5 picks a skill. Nobody checks how a skill gets "turned on" for a fresh subagent stage, or whether it needs anything from `orchestration` or from Alex after he leaves.
4. **The second article's topic.** Alex added it to OT-04 after L-03 was written (the list still says "The second article's topic isn't given yet"). R6 covers only article 1. Article 2 has no research base on the list.
5. **Visual assets in ComfyUI** (Alex's new ask in the same note): whether Comfy can run unattended tonight, and how it squares with S-D4's logged "no generated images" decision.
6. **The website session's queue.** One `website` session takes BUILD requests one at a time from at least six specs. The blog template (S-D4-B1) isn't built or sent yet.
7. **Topic defaults.** If nobody answers, DI-8 and S-D5's held intake both default to their own topic lists, not Alex's two topics.
8. **Two articles against DoD-15's three.** This is already relayed to `orchestration` by L-03, and it isn't a research question.

### Ranked shortlist

1. **The clock and the silent stall (items 1, 2, 7).** This decides whether any article exists tomorrow morning. Nobody else covers it, it's fully inside the "can it be executed" lens, and it can be answered from local state plus measured timings.
2. **The skill rule's mechanics (item 3).** It sits on the overnight path: if drafting waits for a skill that nobody can switch on after 18:00, the night is lost even with dictations in hand.
3. **Comfy visuals overnight (item 5).** It's a new ask with no spec yet. Its feasibility depends on decisions that haven't been made (whether posts get generated images at all).
4. **The website queue (item 6).** It's real, but partly covered by L-01-W1's survival question, and the template can be built overnight with no Alex input.
5. **Article 2's research base (item 4).** This is a list gap for S1 to fill, not an execution question. It's flagged in C3.

**Picked:** 1, with 2 folded in because it's on the same critical path. **Passed over:** 3, because it needs its own spec and a decision on images first, and 4, which is mostly L-01-W1 again. 5 and 8 are relays, not research.

## (b) Research

### Method

- **Local, read-only:** `CHARTER.md`; `research\lists\L-03-blog.md`; `blog-pipeline\SPEC.md`, `PIPELINE.md`, `dictations\README.md`, `scripts\check_done.py` (usage lines only), `prompts\` (searched for "skill"); `blog-articles\SPEC.md`; `SESSIONS.md`; the DI-8 file (answer fences only); `git diff` of `Operator tasks\Approve - research for the blog pipeline.md` (Alex's OT-04 note, uncommitted); `OBS\Processed\index.json` (session times) and each session's `segments.jsonl` (word counts and topic-keyword counts only, no text printed); `website\SPEC.md` and `website\app\` (blog route present or not); `research\global\L-01-W1-wildcard-executed.md` and the header of `L-05-W1`; `~/.claude/settings.json` (only the `enabledPlugins` and `skillOverrides` fields); the marketing plugin's `draft-content` SKILL.md front matter.
- **Web:** Claude Code's subagents and skills documentation.
- **Not done:** I didn't message any session, so whether S-D4 is watching `dictations\` right now is unverified. I opened no operator task other than DI-8 and OT-04, and none of the GetSales or Addvery files. I didn't check whether the other open operator tasks are already answered.

### Verdict

- **Two articles finished by Alex and live before 18:00: not executable.** One article needs about 55 minutes of wall time from "go" to a near-final review, plus about 35 minutes of Alex's own time. The articles session isn't running, and he has about 80 minutes left alongside the Canva recording and other open tasks.
- **What still is executable today: the dictations.** The one input only Alex can give is the 15 minutes of talking per article. Drafting (about 25 minutes per post), the template, the previews and the review files can all run overnight without him, and his review and finish move to the morning. If the dictations don't happen today, the night produces only a template, and the morning carries the whole chain.
- **As things stand, nothing will happen before 18:00.** The dictation task, the template request and every other part-2 step wait on DI-8, which isn't poked. At 18:00 its defaults move the test dictation to the morning, on a topic from its own list ("topic 1", the movie-actor rule), not on Alex's managed-service topic.
- **A zero-decision route already exists.** Alex can dictate into a new note in `blog-pipeline\dictations\`, and the README says the session picks it up. It covers one article cleanly. The second needs `orchestration` to let S-D4 draft it or to launch S-D5.
- **The skill rule works mechanically and needs nothing from Alex.** The marketing plugin's skills are already enabled for every session. A stage subagent uses one only if its prompt tells it to, and today no stage prompt does. It's a prompt line, not a settings change, and it must land before 18:00 so the overnight run doesn't wait on a confirmation.

### Evidence

**B1. Where things stand at 16:38** (local reads, 16:37–16:40)

| Fact | Evidence |
| --- | --- |
| Time is 16:38 CET; Alex leaves about 18:00 | `Get-Date` on the machine; the task brief |
| No dictation exists | `blog-pipeline\dictations\` holds only `README.md` |
| DI-8 has five empty answer fences, state "Waiting on operator" | `Operator tasks\Decide - how the blog pipeline should work.md` |
| Part 2 (dictation task, template BUILD, test post) waits on DI-8, with no pokes for DI-8 | `blog-pipeline\SPEC.md` §1, "Launch gate, in two parts"; "No pokes for DI-8 while it's open (Alex, 14:38)" |
| The test dictation slot (15:15–15:35) passed without one. Rig session S09 (15:17–15:43) holds no article-topic words | `OBS\Processed\index.json`; keyword counts in B4 |
| The runbook, prompts v0.1 and scripts exist, rehearsed once on a rig transcript | `blog-pipeline\PIPELINE.md`, versions table |
| No blog route on the site; S-D4-B1 not sent | `website\app\` has no `blog` folder; S-D4-B1 appears only in specs and plans |
| S-D5 isn't launched; its intake is held until DI-8 is answered | `SESSIONS.md` "Planned"; `blog-articles\SPEC.md` Appendix A |
| Alex's two topics are in OT-04's changes fence, uncommitted. Article 2 ("GTM engineers ... keep their promise that AI is a way to do more business") was added after L-03 recorded "The second article's topic isn't given yet" | `git diff` of `Operator tasks\Approve - research for the blog pipeline.md`; `research\lists\L-03-blog.md` line 4 |
| Alex: "I really don't want to talk any more about articles right now" | Same OT-04 note |

**B2. What stalls without anyone noticing**

- **The no-poke rule plus the part-2 gate means silence until 18:00.** S-D4's spec: "From 18:00 Prague an unanswered question takes its default." Before then, no dictation task is written and no BUILD is sent ("It sends no BUILD request and writes no operator task for Alex yet", §1).
- **The 18:00 defaults move the work to the morning, on the wrong topic.** DI-8 question 4's default is "15:15–15:35, topic 1; the morning cleanup session if still empty at 18:00". Topic 1 on DI-8's list is the movie-actor rule. Alex's OT-04 topics aren't in DI-8, and S-D4 reads DI-8, not OT-04 (§3 reading list). *Inference:* unless someone relays them, the morning dictation task gets the wrong topic.
- **S-D5 can't start without DI-8 either.** Its intake is released "when the blog pipeline's own intake ... is answered" (Appendix A). Its question 1 default takes "the first proposals the test didn't take, in list order", which again aren't Alex's topics.
- **A fork lands on the dictation window.** S-D4's F1 fork is "shortly before 18:00 Prague (about 17:50)". A dictation that ends around 17:45 would be captured during a handoff. *Inference:* that's survivable, because `HANDOFF.md` records state, but it's the worst moment for one.

**B3. The clock, per article**

Stage timings are from S-D4's rehearsal on a 13-minute, 2,040-word rig transcript (`PIPELINE.md` §2): clean 2.6, extract 4.5, outline 3.9, draft 3.7, edit 4.5, format 2.0, scan 2.2. That's 23.4 minutes in sequence; the runbook rounds it to about 25.

| Step | Wall minutes | Alex minutes | Source |
| --- | --- | --- | --- |
| Dictation task written (stage 0 talking prompts, commit, desk line) | ~5 | 0 | *Inference* from SPEC §7 step 3 |
| Open the task and dictate | ~17 | ~17 | SPEC §1 ("about 15 minutes ... plus a couple of minutes") |
| Capture and scan (scripts) | ~2 | 0 | `PIPELINE.md` §1 |
| Stages 1–7 | ~25 | 0 | `PIPELINE.md` §2, measured |
| Preview deploy (needs B1 built first; B1 can be built during the dictation) | ~5+ | 0 | *Inference*; B1's build time is unknown |
| Near-final gate file and desk line | ~3 | 0 | *Inference* |
| Near-final review | ~10 | ~10 | SPEC §1 |
| Finish task (the last 10%), needs S-D5 running and an accepted version | ~10 | ~10 | `blog-articles\SPEC.md` §1, §7 step 7 |
| Publish (BUILD, deploy, check) | 5–10 | 0 | `blog-articles\SPEC.md` Appendix A, question 4 |

- **One article, start to live:** about 80–90 minutes of wall time and about 37 Alex-minutes, if every step starts the moment the last one ends. Starting at 16:50, that's after 18:00, before counting the Canva recording (17:15 in L-05-W1, 17:30 in S-D5's timetable) or the other open items.
- **Two articles:** about 74 Alex-minutes (2 × 17 dictating, 10 reviewing, 2 × 10 finishing) out of about 80 left. Nine other files sit in `Operator tasks\` outside `Archive\` (whether each is already answered wasn't checked).
- **The dictations alone:** about 34 Alex-minutes for two, and they're the only step nobody else can do (charter P3, the movie-actor rule).
- *Inference:* the hackathon's 12 hours end at about 22:25–22:45 tonight (rig H+00:00:00 is 10:25; the charter at 11:43 says "about 11 hours are left"). Posts finished in the morning fall after that, which the charter already plans for ("A cleanup session follows tomorrow morning").

**B4. Is there already enough of Alex's spoken words to draft from?** No.

- **Rig transcripts S01–S09** (about 21,400 words in all): no session mentions "managed service", "product" in the workflow sense, "slider" or "scale". S02 to S05 mention "GTM engineer" one or two times each. Counted with regexes over `segments.jsonl`; no text was printed.
- **Alex's OT-04 note** is 542 words of dictated prose across both topics, about 3.5 minutes of speech at the rehearsal's rate (2,040 words in 13 minutes is about 157 words a minute).
- *Inference:* a 900–1,400-word post under the pipeline's "no claim that isn't in the dictation" rule (`prompts\3-outline`, SPEC §7 stage 3) can't be built from a third of a page. The note works as talking prompts or as extra source material if Alex says it counts, not as a dictation.

**B5. The zero-decision route: the fallback note**

- `blog-pipeline\dictations\README.md`: "If there's no dictation task waiting for you at your slot, dictate here instead: make a new note in this folder ..., put the cursor in it, start Wispr Flow and talk. Nothing else is needed. The blog pipeline session checks this folder every five minutes, and once the note stops growing it picks it up and starts drafting."
- `check_done.py --also-dir blog-pipeline\dictations` exits 0 with `FALLBACK <path>` on a fresh note (script usage lines).
- **Limits:** the SPEC wires that watch into run step 4, which comes after the dictation task (part 2). Whether S-D4 is watching the folder now, in part 1, is unverified. S-D4's runbook names only `T-01`, and drafting the other articles is S-D5's job (SPEC §9, first decision). So a second note would sit undrafted unless `orchestration` lets S-D4 run the runbook on it too, or launches S-D5.
- **The note has no prompts.** Alex would talk from memory of his OT-04 note. *Inference:* that's workable for someone who just wrote 542 words on the topics, but the five-prompt structure (SPEC §7 stage 0) is what keeps a dictation in post order.

**B6. Does "no copywriting without a copywriting skill" work inside the stages?**

- **The skills are already on.** User settings enable `marketing@synced: true`, and `skillOverrides` turns off only six demo-speaker skills. This subagent, started inside a background session in `research\`, lists `marketing:content-creation` and `marketing:draft-content` among its available skills (observed). The `draft-content` front matter has no `disable-model-invocation`, so a model can invoke it and it can be preloaded.
- **A stage subagent doesn't get a skill unless told.** "Each subagent starts with a fresh, isolated context window. It doesn't see your conversation history, the skills you've already invoked ..." and "Built-in agents don't preload skills." Without a `skills` field, "the subagent can still discover and invoke project, user, and plugin skills through the Skill tool during execution" ([Subagents](https://code.claude.com/docs/en/sub-agents)). Background subagents run with a smaller tool set, but it includes `Skill` (same page, as read by the fetch).
- **The runbook today never names a skill.** The stage message is "Read blog-pipeline\prompts\<n>-<stage>.md and follow it exactly ... Return the prompt's "Return" block and nothing else" (`PIPELINE.md` §2), and no file in `prompts\` mentions a skill (grep). *Inference:* a subagent told to "follow it exactly" won't reach for an unmentioned skill, so as written, the drafting stages would break Alex's rule silently.
- **Two ways to make it hold:**
  - One line in prompts 3, 4 and 5 (outline, draft, edit): "First invoke the Skill tool with `<skill>`." This uses the S-D4 session's own folder and needs nobody else.
  - A custom stage agent in `.claude\agents\` with `skills: [<skill>]`, where "the full skill content is injected into the subagent's context at startup" (same page). Root `.claude\` is a root path, so that one is `orchestration`'s to add.
- **Where a new skill can come from without a restart.** Skills under `~/.claude/skills/` or a project `.claude/skills/` are "picked up ... within the current session, without a restart" ([Skills](https://code.claude.com/docs/en/skills)). This subagent, started in `research\`, sees the root's `answer-desk` and `session-recovery` skills (observed), so a skill at the root reaches every spec session. A new **plugin** is different: an install can need `/reload-plugins` (same page). *Inference:* that's awkward in a background session with nobody attached, so if R5 picks a skill that isn't installed yet, installing it after 18:00 is the risky way.
- **Possible friction, flagged for R5, not judged here:** `draft-content` describes itself as producing "channel-specific formatting and SEO recommendations" and "headline or subject line options". The pipeline's edit stage strips anything not traceable to the dictation. *Inference:* if the skill sits on the draft stage, its additions may be cut by stage 5 or trip stage 5's checks.

**B7. Overnight: what can run without him**

- **Can run with no Alex input, once there's a dictation:** capture, all seven stages (two posts in parallel is about 25 minutes), the template BUILD (it doesn't depend on a dictation; under DI-8's defaults it goes out at 18:00 anyway), a preview deploy, the near-final gate file, and the finish-task file for article 2, held until he accepts the test post (S-D5 §7 step 7).
- **Can't run without him:** the near-final acceptance (DoD-14) and the finish of each post (DoD-15: "finished by the operator").
- **The rig backup needs him before he leaves:** "`/process` runs only when Alex types it" (DI-1, via SPEC §3). The runbook says don't wait for it (`PIPELINE.md` §1), so it's a backup, not a blocker.
- **L-01-W1's overnight risks apply to S-D4 too:** a background session that hits the usage limit "stops mid-task and stays stopped" unless the retry watchdog is set, an idle, unattached session is stopped after about an hour, and Windows may restart between 03:00 and 09:00 (`research\global\L-01-W1-wildcard-executed.md`, lines 69–70 and 140). *Inference:* the blog's overnight load (about 14 stage subagents, two BUILDs) is small next to the other specs, so the risk is the session not being alive, not the cost.

### Evidence gaps

- I didn't confirm whether S-D4 is watching `dictations\` now. The README says it is, but the SPEC wires the watch into a part-2 step.
- B1's build time on `website` is unknown, and so is the queue ahead of it.
- Stage timings come from one rehearsal on a 13-minute transcript. A 15-minute dictation, or a second draft running in parallel, may be slower.
- Alex's real remaining schedule (the exact time of the Canva recording, which open tasks are already answered) wasn't checked.
- Whether general-purpose subagents in background sessions really invoke a skill when told to was read from docs (and from what the fetch summarised), not tested with a run.
- Whether `orchestration` already plans to relay the second topic or launch S-D5 isn't known. I sent no messages.

## (c) Recommendations

Every call below is Alex's. "Assistant" items need no decision from him, only a go-ahead from whoever owns the file.

**C1. Choose how much dictating happens today (Alex).**

| Option | Alex today | Tonight | Morning (Alex) | Evidence |
| --- | --- | --- | --- | --- |
| A. Both dictations before 18:00 | ~34 min, e.g. back to back in a free half-hour | Both drafts, template, preview, gate file, finish file | ~30 min: review the test post, finish two | B3, B7 |
| B. Article 1 today, article 2 tomorrow | ~17 min | Draft 1, template, preview, gate file | ~45 min plus ~25 min of drafting wait | B3 |
| C. Both tomorrow | 0 | Template only | ~64 min, plus ~25 min of drafting wait before any review | B2, B3 |

A uses the night best (P3, P6). C is what happens by default if nothing changes before 18:00 (B2).

**C2. Unblock with the smallest input (Alex, then S-D4).**
- **Option 1, three short DI-8 answers:** question 1 "A", question 3 "counts", question 4 "now, on the managed-service topic". S-D4 can then write the task and send B1. The rest can take its defaults.
- **Option 2, no DI-8 at all:** dictate into a new note in `blog-pipeline\dictations\` (B5), with the OT-04 note open as his prompt sheet. It needs S-D4 to be watching (unverified), and gives no talking prompts.
- **Option 3, a desk question from S-D4** that waives the no-poke rule for DI-8 just this once, since the rule's premise ("low priority", 14:38) predates the slots running out. That's Alex's rule to waive, not S-D4's.

**C3. Put his two topics where the sessions read them (assistant, relay; S1's to send).**
- Article 2's topic (AI has to grow revenue rather than cut staff, and that's the GTM engineer's role) reached no list or spec. L-03 still says it isn't given.
- S-D4's DI-8 default topic and S-D5's default list both predate OT-04.
- Options: S1 sends `orchestration` the second topic for S-D4 and S-D5, and decides whether article 2 gets a research item like R6 (an R7). *Inference:* without the relay, tonight's work runs on the wrong topics.

**C4. Make the skill rule hold overnight (assistant; the skill choice comes from R5).**
- Once R5 names the skill, S-D4 adds one line to prompts 3, 4 and 5 to invoke it, logged in §9. Or `orchestration` adds a stage agent with `skills:` under the root `.claude\agents\`.
- Either way, `orchestration` confirms "turned on" before about 17:45, so no overnight stage waits on a message.
- Prefer a skill that's already enabled (the marketing pair) or one placed in a skills folder, which loads without a restart, over a new plugin install after 18:00 (B6).

**C5. Second article's drafting path (Alex or `orchestration`).**
- Options: launch S-D5 tonight on its defaults with Alex's topics swapped in, or let S-D4 run its runbook on the second dictation and hand it over, as it already may for article 1.
- The first keeps P2's one-role rule. The second is faster tonight (B5).

**C6. Before he leaves (Alex, about 2 minutes, optional).**
- Type `/stop` then `/process` in the rig after the last dictation if he wants the transcript backup available overnight (B7).
- The overnight-survival fixes in L-01-W1 (watchdog, active hours) cover the blog too. They're already in `Do - get the computer ready for tonight.md`, going by its name; the file wasn't opened.

**C7. Not recommended without his say-so: shorter dictations.**
- Two 7-minute dictations (about 1,100 words each) would halve his time.
- *Inference:* they'd push the drafts towards the bottom of the 900–1,400-word range or towards invention, against the "no claim that isn't in the dictation" rule.
- They'd also change DoD-14 and DoD-15's "15-minute" wording, which is S2's to change.

## Sources

Local (read-only):
- `C:\Users\alder\Desktop\Hire me hackaton\CHARTER.md` (P3, P6, Context and outcome, DoD-14, DoD-15)
- `C:\Users\alder\Desktop\Hire me hackaton\research\lists\L-03-blog.md`
- `C:\Users\alder\Desktop\Hire me hackaton\blog-pipeline\SPEC.md` (§1, §3, §7, §8, §9)
- `C:\Users\alder\Desktop\Hire me hackaton\blog-pipeline\PIPELINE.md` (stage timings, stage message, rig backup)
- `C:\Users\alder\Desktop\Hire me hackaton\blog-pipeline\dictations\README.md`
- `C:\Users\alder\Desktop\Hire me hackaton\blog-pipeline\scripts\check_done.py` (usage lines)
- `C:\Users\alder\Desktop\Hire me hackaton\blog-pipeline\prompts\` (searched for "skill": no hits)
- `C:\Users\alder\Desktop\Hire me hackaton\blog-articles\SPEC.md` (§1, §7, Appendix A)
- `C:\Users\alder\Desktop\Hire me hackaton\SESSIONS.md`
- `C:\Users\alder\Desktop\Hire me hackaton\Operator tasks\Decide - how the blog pipeline should work.md` (answer fences)
- `C:\Users\alder\Desktop\Hire me hackaton\Operator tasks\Approve - research for the blog pipeline.md` (working-tree diff of the OT-04 changes fence)
- `C:\Users\alder\Desktop\Hire me hackaton\OBS\Processed\index.json` and `S01`–`S09` `segments.jsonl` (times, word and keyword counts only)
- `C:\Users\alder\Desktop\Hire me hackaton\website\SPEC.md`, `website\app\` (directory listing)
- `C:\Users\alder\Desktop\Hire me hackaton\research\global\L-01-W1-wildcard-executed.md`; header of `L-05-W1-wildcard-executed.md`
- `C:\Users\alder\.claude\settings.json` (`enabledPlugins` and `skillOverrides` only)
- `C:\Users\alder\.claude\plugins\cache\knowledge-work-plugins\marketing\1.2.0\skills\draft-content\SKILL.md` (front matter)

Web:
- Claude Code docs, Subagents (skills inheritance, the `skills` field, built-in agents not preloading, Skill tool access, background subagent tools, nesting): https://code.claude.com/docs/en/sub-agents
- Claude Code docs, Skills (plugin skills, live pickup without restart, `/reload-plugins`, `disable-model-invocation`, `skillOverrides`, `context: fork`): https://code.claude.com/docs/en/skills
- Claude Code docs, Agent view (idle stop after about an hour), as quoted in L-01-W1: https://code.claude.com/docs/en/agent-view
