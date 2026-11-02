# S-D4 Blog pipeline: executable spec

Status: ready for groundwork (part 1); the rest waits for preflight DI-8, with Alex, low priority · Row: S-D4 — Blog pipeline · Folder: `blog-pipeline\` · Session: `s-d4-blog-pipeline`

S-D4 builds the pipeline that turns about 15 minutes of Alex talking into a good-looking, near-final blog post, with only the last 10% left to him (DoD-14). It's proved once, on one test dictation that Alex accepts as near-final. The pipeline is a runbook with its prompts and a few scripts, which S-D5 then runs on its three articles. On the site it shows up as the blog: a post page in the site's Addvery look, built by `website`, with a "How this post was made" box on every post, and D4's entry on the deliverables view.

## 1. Operator preflight (P3)

The preflight is decision intake DI-8 (`..\Operator tasks\Decide - how the blog pipeline should work.md`).

| DI-8 question | Question | Default |
| --- | --- | --- |
| 1 | Where the post's look is built: a template in the site, Claude Design today, or the template now and Claude Design in the morning | The site template (A) |
| 2 | Where the dictation lands: Wispr Flow into a dictation task with the rig as backup, or the rig transcript only | Wispr Flow into the task, rig as backup (A) |
| 3 | Charter conflict: does the test dictation count as S-D5's article 1? | It counts (A) |
| 4 | The test dictation scene: slot and topic | 15:15–15:35, topic 1; the morning cleanup session if still empty at 18:00 |
| 5 | If research runs late: may the test post be drafted before L-03's findings land? | Draft without waiting; findings revise it before the near-final review (A) |

**Launch gate, in two parts** (Alex, 14:38: "i'm swamped we need to remove blockers ... d1-8 is low priority").
- **Part 1, now: groundwork that needs nothing from him.** The session launches before DI-8 is answered and builds what every answer needs: the draft method, the prompts, the scripts, the post format, the `dictations\` folder (operator scenes, above), and its research request (§6). It sends no BUILD request and writes no operator task for Alex yet.
- **Part 2, once DI-8 is answered and applied:** the dictation task, the site template's BUILD request (question 1), the test post and the near-final gate. The session owns DI-8: it watches the file every 300 seconds with the Monitor tool, applies each answer here, sets its Intake State to Answered, commits, then sends `answer-desk` `TASK DONE S-D4: Decide - how the blog pipeline should work.md` and `orchestration` `ARCHIVE Decide - how the blog pipeline should work.md: readers S-D4, S-D5`. No pokes for DI-8 while it's open (Alex, 14:38). From 18:00 Prague an unanswered question takes its default, logged in §9.

**Operator scenes.**
- **The test dictation**, about 15 minutes of talking on camera, proposed for 15:15–15:35 (question 4). It's shot before the pipeline exists (P3, the movie-actor rule): a dictation is raw input, and drafting comes later. If the session isn't running yet at his slot, he dictates into a new note in `blog-pipeline\dictations\` and the session picks it up.
- **The near-final review**, about 10 minutes, in his first gap after the post is ready (16:10–16:20, 16:40–16:45 or 17:00–17:30, which the GetSales change freed). It's a gate (§7, step 9), not a scene.
- **Claude Design**, about 20 minutes, only if question 1 is B, at the time he names.

**Off camera.** Nothing: no keys, no new logins. If the preview link asks for a Vercel login, it's the one his browser already has.

**Runtime questions** go to the desk as asker `S-D4`, ids `S-D4-Q1` onwards, one at a time (`..\answer-desk\ASKING.md`). After 15 minutes waiting on Alex for anything, send `answer-desk` `POKE S-D4: waiting on you for <what>`, and again every 15 minutes. Before 18:00 Prague, keep waiting and keep doing anything that doesn't depend on the answer. From 18:00, decide on the default and log it (§9).

## 2. Spec contract

| Item | S-D4's answer |
| --- | --- |
| 1. Its place | Row S-D4 — Blog pipeline (deliverable D4). Claims DoD-14. Serves DoD-15 (S-D5's posts run through it, and the test post may be article 1) and DoD-19 (D4's entry on the deliverables view). Serves DoD-22 (everything it hands the site passes the scan). Reads the L-03 and L-01 findings. |
| 2. Its neighbours | Depends on S1 (L-03, L-01). Uses `website` (S-D8) for every site change. Runs in parallel with S-D1, S-D3, S-D6, S-D7 and S-D9. Feeds S-D5 (the runbook, and possibly article 1), S-D8 (build requests) and S-D9 (the dictation's clock times, as a clip candidate). |
| 3. Operator preflight | §1 (DI-8). |
| 4. Decision log | §9. |
| 5. Forking gates | §8. |
| 6. Working directory | `blog-pipeline\`; its reading list is §3. |

## 3. Routing and resources

Paths are relative to `blog-pipeline\`. Step 1 of the run confirms every resource is reachable and turns anything ambiguous into a desk question.

- `..\CHARTER.md`: the parent context. Read only, never edit.
- `..\SESSIONS.md`: the roster. Message sessions only by these names; edit only S-D4's own row.
- `..\GIT.md`: the shared-tree rules. Commit only `blog-pipeline\` and S-D4's own operator tasks, path-limited.
- `..\answer-desk\ASKING.md`: the desk format, TASK lines, gate approvals, the poke and the 18:00 rule.
- `..\answer-desk\qa\S-D4.md`: S-D4's own Q&A record, once the desk creates it.
- `..\Operator tasks\Archive\INDEX.md`: Alex's earlier answers; never re-ask them. DI-1 settles two things S-D4 leans on: dictation is Wispr Flow, and `/process` runs only when he types it.
- `..\Operator tasks\Decide - how the blog pipeline should work.md` (in `..\Operator tasks\Archive\` once filed): this spec's preflight answers, verbatim.
- `SPEC.md`: this file. `HANDOFF.md`: the state after a fork, if it exists.
- `..\research\DIRECTORY.md`: the index of every research report. Read only.
- `..\research\lists\L-03-blog.md` and `..\research\lists\L-01-parent.md`: S1's lists for this spec. Read only; S1 owns them.
- `..\Operator tasks\Archive\Approve - research for the blog pipeline.md`: Alex's answer on the blog research list (OT-04), verbatim, with his long note: the copywriting-skill rule, two articles and their topics, and visuals for them. Read it for wording, never re-ask it.
- **L-01 findings** (S1's parent research, approved by Alex as OT-01; added by S2 as C07): for this spec, read the synthesis first, then R1, W3, R2.
  - `..\research\global\L-01-synthesis.md`: S1's synthesis of the parent research: the strongest findings, recommendations per spec, and 24 one-line questions for Alex, each naming the spec it blocks. Start here: take this spec's section, and fold the questions that name it into your next gate. Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-R1-legibility.md`: making the work legible: outcome first, a short demo, a 3 to 4 step how-it-works; what reads as a toy or as noise; AI labels. Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-R2-gtm-engineer-hiring.md`: what a GTM engineer is hired to show, which deliverables fit it best, and the gaps none of them shows. Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-R3-personal-data.md`: personal data on a public site: GDPR, LinkedIn's terms, what the live run needs, and the safe, risky and keep-off table for stakeholder sections (section 7). Not legal advice. Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-R4-format-reception.md`: whether a site aimed at one employer lands: replies versus hires, when it turns creepy or self-indulgent, and the one small ask. Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-W1-wildcard-executed.md`: whether a dozen background sessions can run through the day and night: usage limits, Windows Update restarts, idle stops. Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-W2-wildcard-delivered.md`: what the six actually get from the alert: the link, the preview card, click timing, and the morning hand-over checklist (C7). Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-W3-wildcard-received.md`: whether AI-made work reads as skill or as a shortcut: the penalty bites on personal lines, not on the machinery. Options for Alex, not decisions. Read only; S1 owns it.
- Research findings: S2 adds a line here for each report when S1 sends FINDINGS for L-03 and L-01.
- `..\orchestration\_templates\Operator task template.md` and `..\orchestration\_templates\Gate approval template.md`: the forms of the dictation task and the two gates. `..\orchestration\check_gate.py`: the 5-minute gate check, run from the repo root. Read only. Every operator task S-D4 writes follows Alex's readability rule (2 Nov, in `..\answer-desk\ASKING.md`): a plain file name, `Approve - ...` for a gate and `Do - ...` for anything else; its OT id in the front matter only; a `## What this is` section first; no codes in the text.
- `..\OBS\rig\RUNBOOK.md`: how the rig records and files sessions. Read only.
- `..\OBS\Processed\index.json` and `..\OBS\Processed\Sxx_*\segments.jsonl`: the filed sessions and their transcripts, the backup source for a dictation. Read only; never run the rig's scripts.
- `..\website\CLAUDE.md`: how the site is built and deployed. Read only; every site change is a BUILD request to `website`.
- Wispr Flow: Alex's dictation app. The session never drives it.
- Tools: general-purpose subagents, SendMessage and Monitor (load SendMessage, ListAgents and Monitor with ToolSearch at startup).
- Not read: `..\Addvery Research\`. The template takes the site's existing Addvery look from `website`, and topics come from Alex.

**Outputs.** What S-D4 creates, in `blog-pipeline\` unless named otherwise. Its operator tasks go in `..\Operator tasks\` (§7). The runbook, the post format, the prompts and the scripts are S-D5's inputs too, announced to it in §7, steps 7 and 9.

```
blog-pipeline\
  CLAUDE.md, SPEC.md, HANDOFF.md
  PIPELINE.md              the runbook S-D5 follows: stages, prompts, checks, the BUILD form; v1, v2 ...
  POST-FORMAT.md           the post file the site's template renders: front matter and Markdown rules
  prompts\<n>-<stage>.md   one prompt per stage
  scripts\                 join, find a dictation in a rig transcript, word counts and changed share, the scan, check_done.py
  samples\sample-post.md   a neutral post to build the template against; never published
  dictations\T-01.md       the test dictation, as Wispr Flow typed it
  drafts\T-01\             each stage's output, and post.md
  SITE.md                  D4's entry for the deliverables view
```

## 4. Problem and scope

**The problem.** Alex knows his subjects but has no time to write. Fifteen minutes of talking holds enough for a post, but a raw transcript isn't one, and a generic LLM rewrite loses his voice and reads like everyone else's. D4 needs a repeatable path from talk to a post that looks finished on the site and needs only his last 10%: a sharper line here, a fact only he knows there.

**In scope.**
- Capture: Wispr Flow text from a dictation task, with the rig transcript as backup.
- The drafting stages, each a prompt run by a subagent, plus the scripts and the DoD-22 scan.
- The post format, and the post template on the site, through `website`.
- One test dictation drafted end to end, and Alex's near-final acceptance.
- The runbook S-D5 runs, and D4's entry on the deliverables view.

**Out of scope.**
- The three articles, their topics and Alex's last 10% on them: S-D5.
- Publishing a post: S-D5 does that, through `website`. S-D4 asks only for a preview deployment.
- Anything from `..\Addvery Research\`, and LinkedIn content (S-D7).
- The charter's Scope binds: no real data through the demos except the D3 live run, no automation sending, no one else's LinkedIn account. S-D4 touches none of them.

## 5. Definition of done

Written before research and methodology.

| Criterion | Traces to |
| --- | --- |
| `PIPELINE.md`, its prompts and scripts take one dictation file to one post file in the format of `POST-FORMAT.md`, and S-D5 can run them without S-D4 | DoD-14 |
| The site has a post template in its Addvery look (typographic cover, headings, pull quotes, a readable measure, a "How this post was made" box), with a `BUILT` reply from `website` on record | DoD-14 ("good-looking") |
| One test dictation of about 15 minutes went through every stage with no hand edits between stages | DoD-14 |
| Alex accepted the test post as near-final: `Approve - the blog post the pipeline made.md` is ticked | DoD-14 |
| D4's entry on the deliverables view says what the pipeline does and links the blog | DoD-19 (served) |
| The dictation, every draft and every BUILD passed the scan: no secrets, nothing of the Apify proposal or Alex's own GetSales outbound | DoD-22 (served) |

## 6. Research step

At launch the session sends `s1-research` exactly one line:

`RESEARCH S-D4: L-03 plus L-01, the pipeline's stages and the post's look depend on them and the test dictation is in by 15:35, needed by 16:00`

Approving L-03 is S1's gate, not this session's.

**Goes ahead meanwhile:** the dictation task, `POST-FORMAT.md` and the sample post, the template request to `website` (its basics don't depend on findings), the scripts, and prompt drafts labelled v0.

**Waits for FINDINGS:** the confirmed methodology, its coherency check and the spec-draft gate, plus any template refinement R4 calls for.

**If findings are late.** The test dictation doesn't depend on research, so it's shot on time. The near-final review does, and DI-8 question 5 decides. Under A (the default), the session drafts the test post on the v0 prompts once the dictation is in, and reruns it on the revised method when findings land, before Alex's review if the rerun is ready in time. Under B, nothing is drafted before L-03's synthesis lands. Under C, the method is confirmed on L-01 alone.

## 7. Methodology and steps

**Draft methodology**, confirmed or revised once L-03's synthesis lands. Each stage is one subagent, handed only its prompt and its input files (P7). Nobody edits between stages: when a stage's output is wrong, its prompt is fixed and the stage reruns, so the pipeline itself makes the post.

0. **Talking prompts.** For a topic, five prompts written into the dictation task: the problem in one sentence and who has it; a story where he saw it (no client names); what most people get wrong; what he does instead, step by step; what the reader should do on Monday.
1. **Clean.** Join Wispr Flow's pieces, fix plain mis-hearings, keep his words. A gap is filled from the rig transcript of the same minutes.
2. **Extract.** His claims, stories, examples, and the phrases worth keeping word for word.
3. **Outline.** A title, a one-line promise, four to six sections in his order. No claim that isn't in the dictation.
4. **Draft.** The post from the outline and the extracts, in his voice, about 900 to 1,400 words, his phrases kept.
5. **Edit.** A fresh subagent cuts generic phrasing, checks that every claim traces to the dictation, and leaves `[Alex: ...]` markers where only he can add something (a number, an example, the closing ask). Those markers are his last 10%.
6. **Format.** Front matter per `POST-FORMAT.md`, a meta description, the slug, pull quotes, and the numbers for the "How this post was made" box: minutes talked, words spoken, words drafted.
7. **Scan.** The DoD-22 scan (secrets, the Apify proposal, Alex's own GetSales outbound) and a check for names that shouldn't be published. A hit is cut and logged. Nothing is committed before the scan passes.

**Where the look is built** follows DI-8 question 1. Under A, `website` builds the post template from `POST-FORMAT.md`. Under B, Alex designs the look in Claude Design in the scene he names, and `website` brings it in (the Vercel connector lists a Claude Design import tool, which `website` runs) or rebuilds it as the template, whichever R2's findings favour. Under C, A now, and a Claude Design pass in the morning cleanup session.

**Coherency check:** "If we execute this methodology, will DoD-14 be satisfied?" Run it once the synthesis is applied, criterion by criterion against §5: the runbook and format (steps 3, 7), the template (step 3), one dictation end to end with no hand edits (steps 4, 6), Alex's acceptance (step 9), D4's entry (step 10), the scan (stage 7, every commit). A criterion with no step is a gap, fixed before the spec-draft gate.

**Run steps.** Commit after every finished step, path-limited: `git commit -m "[blog-pipeline] <message>" -- blog-pipeline/...`, and S-D4's operator tasks with `-- "Operator tasks/<file>"`.

1. Read §3 and confirm each resource is reachable. Resume from `HANDOFF.md` if it exists. Anything ambiguous becomes `S-D4-Q1`.
2. Apply DI-8's answers to §1 and §9. Send the RESEARCH line (§6). Under question 3 A, send `orchestration` `S2 REQUEST s-d4-blog-pipeline: the charter's operator scenes count the S-D4 test dictation as S-D5's article 1 (approved: DI-8 question 3: <his answer>)`.
3. **Groundwork, in parallel (P1).**
   - The session writes the dictation task `..\Operator tasks\Do - your test dictation for the blog.md` from the Operator task template, with the next free OT number in its front matter (check `Operator tasks\` and `Archive\` just before writing): `## What this is` in plain words, then the slot, the topic, the five talking prompts, a "Dictate below this line" section, and a `- [ ] Done` box. Commit it, then send `answer-desk` `TASK S-D4: Do - your test dictation for the blog.md is waiting on you: your 15-minute test dictation at <slot> on <topic>; it feeds the blog pipeline`.
   - A subagent writes `POST-FORMAT.md` and `samples\sample-post.md`, handed §4, §5, this methodology and `..\website\CLAUDE.md`.
   - A subagent writes `scripts\` (join; find a dictation in `segments.jsonl`; word counts and the share of words changed between two files; the scan; `check_done.py`, which exits 0 once a task's `Done` box is ticked and 1 until then), handed this methodology and the paths in §3. S-D5 runs these too, from 15:50, so they come first.
   - The session drafts `prompts\` v0 from this methodology.
   - Once `POST-FORMAT.md` exists, under question 1 A or C: `BUILD S-D4-B1: add a blog: a /blog index and a /blog/<slug> post page in the site's look, rendering post files as POST-FORMAT.md describes, with a "How this post was made" box; not linked from the page until the first post is live. Content: blog-pipeline\POST-FORMAT.md and blog-pipeline\samples\sample-post.md. Source: the D4 blog pipeline.`
4. **The dictation.** Wait with Monitor, running `python -I blog-pipeline\scripts\check_done.py "Operator tasks\Do - your test dictation for the blog.md"` from the repo root every 300 seconds. Poke 15 minutes after the slot ends if `Done` isn't ticked. Once it is (or a fallback note appears in `dictations\`): copy the text into `dictations\T-01.md`, scan it, commit, send `TASK DONE S-D4: Do - your test dictation for the blog.md` to `answer-desk` and `ARCHIVE Do - your test dictation for the blog.md: readers S-D4` to `orchestration`. Tell `s-d9-legibility` the dictation's clock times and rig session, as a clip candidate.
5. **Findings and the spec-draft gate.** When the findings lines appear in §3, read the synthesis and the reports, revise the method and the prompts, and run the coherency check. Post-research questions go to the desk one at a time. The L-01 synthesis's operator decisions for this spec (its recommendations 4.1, a plain line on each post saying it was drafted with AI from his dictation and edited and approved by him; 4.3, D4 presented as a pipeline with checks; 4.4, topics about the GTM work itself) go into this gate as its open choices, each with a default, not onto the desk; none of its 24 questions names S-D4. Then freeze this SPEC.md into `..\Operator tasks\Approve - how every blog post gets drafted.md` from the gate template, its `## What this is` and summary in plain words, commit it, and send `TASK S-D4: Approve - how every blog post gets drafted.md is waiting on you: the blog pipeline's method, scope and finish line; approving it fixes how every blog post is drafted`. While blocked, wait with Monitor running `python -I orchestration\check_gate.py "Operator tasks\Approve - how every blog post gets drafted.md"` from the repo root every 300 seconds until it exits 0, and poke after 15 minutes. On `CHANGES`, apply them, refresh the snapshot and wait again. Then send `TASK DONE S-D4: Approve - how every blog post gets drafted.md` to `answer-desk` and `ARCHIVE Approve - how every blog post gets drafted.md: readers S-D4, S-D5` to `orchestration`. Drafting doesn't wait on this gate: it publishes nothing and uses none of Alex's time.
6. **Draft the test post.** Once the dictation is in (and as question 5 says), run stages 1 to 7 on `dictations\T-01.md`, output in `drafts\T-01\`. Commit.
7. **Runbook.** Write `PIPELINE.md` from the stages as they ran, and send `s-d5-blog-articles` `PIPELINE S-D4 v1: blog-pipeline\PIPELINE.md at <commit>; not yet accepted`. Every later version is announced the same way.
8. **Preview.** Once B1 is built: `BUILD S-D4-B<n>: deploy a preview, not production, with the test post at /blog/<slug>, and reply with its URL. Content: blog-pipeline\drafts\T-01\post.md. Source: the test dictation through the pipeline.`
9. **Near-final gate (DoD-14).** Freeze the post into `..\Operator tasks\Approve - the blog post the pipeline made.md` from the gate template: `## What this is` in plain words, a five-line summary, the preview URL, the post in full, the numbers, and the `[Alex: ...]` markers left for him. Ticking `I approve` means "near-final: only the last 10% is left"; it publishes nothing. Commit it, send `TASK S-D4: Approve - the blog post the pipeline made.md is waiting on you: is the test blog post near-final? Accepting it proves the pipeline and frees your three blog posts`, and wait with Monitor running `python -I orchestration\check_gate.py "Operator tasks\Approve - the blog post the pipeline made.md"` every 300 seconds, poking after 15 minutes. On `CHANGES`, fix the prompts or the template (a new runbook version), rerun the post, refresh the snapshot and wait again. Then send `TASK DONE S-D4: Approve - the blog post the pipeline made.md` and `ARCHIVE Approve - the blog post the pipeline made.md: readers S-D4, S-D5`, and tell `s-d5-blog-articles` `PIPELINE S-D4 v<n>: blog-pipeline\PIPELINE.md at <commit>; accepted in Approve - the blog post the pipeline made.md`. If the test counts as article 1, add `HANDOVER S-D4 T-01: blog-pipeline\drafts\T-01\post.md is article 1, accepted in Approve - the blog post the pipeline made.md`.
10. **D4's entry.** `BUILD S-D4-B<n>: on the deliverables view, D4's entry: what the pipeline does in three lines, accepted <time>, and a link to /blog. Content: blog-pipeline\SITE.md. Source: the accepted pipeline.`
11. **Done.** Send `orchestration` `DONE S-D4: test dictation T-01 became a post Alex accepted as near-final in Approve - the blog post the pipeline made.md; runbook blog-pipeline\PIPELINE.md v<n>`. Then stay, idle, to take `PIPELINE FIX S-D5: <what>` from `s-d5-blog-articles`, answering each with a new runbook version. When S-D5 reports done, move S-D4's roster row to Finished (`[roster]` commit, path-limited) and stop.

**Approval plus feedback** (Alex at the desk, 16:36: "Even if I approve something that doesn't include what I mentioned in the feedback section, it's approved along with whatever's in the feedback section"). On every gate, `APPROVED` from `check_gate.py` isn't the end: read the file's changes fence too, and apply whatever he wrote there as part of the approval. On DI-8, read the whole file, not only the answer fences.

**Site requests** go one at a time as `BUILD S-D4-B<n>: ...`, numbered in the order sent. Wait for `BUILT S-D4-B<n>` or `REFUSED S-D4-B<n>` before sending the next.

**Screen care.** The dictation task is on camera, and that's the point. Never open the Apify proposal or Alex's own GetSales outbound. If he says something in a dictation that mustn't be published, the scan cuts it from the post, and S-D4 tells `s-d9-legibility` the clock time so that stretch stays off the site.

## 8. Forking gates (P8)

| Gate | When |
| --- | --- |
| F1 | Shortly before 18:00 Prague (about 17:50), so the overnight starts clean (P6). An open near-final gate stays open for the morning cleanup session. |
| F2 | The session's context is about half full, whatever else is happening. |

How it forks:
1. Write `HANDOFF.md`: the state of each step, the runbook version, open questions and gates with their times, pokes sent, BUILDs awaiting a reply, and decisions since the last fork. Commit it.
2. From `blog-pipeline\`, launch the successor under the same name: `claude --bg -n s-d4-blog-pipeline "Read CLAUDE.md, then HANDOFF.md. You are now the active S-D4 session."`
3. Update S-D4's row in `..\SESSIONS.md` with the handoff time and commit it on its own: `git commit -m "[roster] ..." -- SESSIONS.md`.
4. Announce it to `s-d5-blog-articles`, `website`, `answer-desk` and `s1-research`: `HANDOFF s-d4-blog-pipeline, <time>: a fresh session has taken over under the same name. Re-send anything that got no reply since <time>.`
5. The old session stops itself with `claude stop` and its own exact id.

## 9. Decision log (P5)

Before 18:00 Prague, a passed deadline means poke, not decide. From 18:00, decide on the default, log it here, and send `WITHDRAW <id>` for a desk question. Start each decision with the time and the question id.

| Decision | Justification | Why it's the right call | Blast radius if changed |
| --- | --- | --- | --- |
| 2 Nov, drafting (wave2-specs): the pipeline is a runbook with prompts and scripts that S-D5 runs in its own session; S-D4 doesn't draft S-D5's posts. | P2 (one session, one role); GIT.md (each session writes only its own folder). | S-D5's posts stay in its folder, and running the runbook from a second session proves it's reusable, which is DoD-14's point. | S-D5's §7. If S-D4 drafted for S-D5, the posts would move folders. |
| 2 Nov, drafting (wave2-specs): Alex dictates into an operator task (topic, prompts, `Done` box), not a free note. | Alex: "Anything that needs me to look at something needs to be in operator tasks"; the desk alerts him to it. | One file holds the brief and the dictation, and the session knows the moment he's done. | Steps 3 and 4. A plain note in `dictations\` still works as the fallback. |
| 2 Nov, drafting (wave2-specs): raw dictations and drafts are committed to the public repo, after the scan. | The words are spoken on camera anyway, and the raw-to-post comparison is what makes D4 legible. | It shows the pipeline's input beside its output. | Removing a pushed file from history needs a rewrite GIT.md forbids, so the scan runs before every commit. |
| 2 Nov, drafting (wave2-specs): posts carry Alex's name and voice, styled in the site's Addvery look; they aren't written as Addvery's own posts. | The site is his job application; writing as Addvery would put words in a real company's mouth. | It shows the skill without impersonating anyone. | The `author` field in `POST-FORMAT.md` and the template's byline. |
| 2 Nov, drafting (wave2-specs): no generated images; each post gets a typographic cover. | Time: an image tool adds a step and a review per post. | A clean typographic cover looks finished and costs nothing per post. | A `cover` field in `POST-FORMAT.md`, and the template. |
| 2 Nov, drafting (wave2-specs): Alex reviews the test post on a Vercel preview deployment, not production. | DoD-14's "good-looking" is judged as the post renders; what goes live is S-D5's call. | Nothing unfinished reaches the live site. | One BUILD request. If `website` won't deploy previews, it sends a screenshot from its local check instead. |
| 2 Nov, drafting (wave2-specs): each post's "How this post was made" box shows minutes talked, words spoken, words drafted and, from S-D5, the share of words Alex changed. | Otherwise "the last 10%" is only a claim. | A visitor can check it without explanation (serves DoD-19). | `POST-FORMAT.md`, the template, and S-D5's publish step. |
| 2 Nov, drafting (wave2-specs): the test post is drafted while the spec-draft gate is open, and rerun if Alex changes the method. | Drafting uses none of his time and publishes nothing; waiting would push his review out of today's gaps. | It keeps the review inside his window (P6). | Repeated subagent work only. |
| 2 Nov 15:02 (wave2-specs, on Alex's 14:38 "remove blockers" and "low priority"): the launch gate is split; the session launches for groundwork before DI-8 is answered, owns DI-8 itself, and doesn't poke for it. | Alex is on his Addvery research and called this intake low priority; nothing in part 1 depends on his answers. | The pipeline gets built in parallel (P1) without taking any of his attention (P4). | Part 1 work only. If question 1 comes back B (Claude Design), the post format stays and only the template step changes. |
| 2 Nov 15:05 (s-d4-blog-pipeline, on `orchestration`'s C07 note "fold the synthesis questions that name S-D4 into your intake or next gate"): the L-01 synthesis's three operator decisions for S-D4 (4.1, 4.3, 4.4) go into the spec-draft gate (step 5), not into DI-8. Meanwhile the v0 format already frames the "How this post was made" box as Alex directing it, in his words (s1-research: W3 over R1), and the edit prompt carries 4.5 ("ideas, not a verdict") as an assistant-actionable rule. | Alex is swamped and called DI-8 low priority (14:38); none of the synthesis's 24 questions names S-D4; none of the three blocks part 1 or the test dictation. | It keeps his DI-8 to five questions and puts the framing choices where he reviews the method anyway. | The spec-draft gate grows by three choices. If he wants them sooner, they become desk questions; under 4.1 or 4.3 only the box wording and D4's site entry change. |
| 2 Nov 16:50 (s-d4-blog-pipeline, on Alex's note in the blog research approval, relayed verbatim by `s1-research`: "Do not do any copywriting without identifying which skill you need to turn on, telling the orchestrator to turn it on for you. Do not do any copywriting without a copywriting skill."): the outline, draft, edit and format stages (prompts v0.2) load a copywriting skill `{SKILL}` before writing and stop without one. The skill is the one L-03 R5 names; S-D4 then asks `orchestration` to turn it on. Until then only stages 1 and 2 run. The same note's "we'll do two articles" and first-article topic aren't S-D4's to settle; they bear on DI-8 questions 3 and 4 and on S-D5. | It's his rule, verbatim. R5 is researching exactly which skill, due about 17:00. | Naming the skill from R5 rather than guessing keeps one request to `orchestration`, and nothing is drafted before the dictation anyway. | Stages 3 to 6 wait for the skill. If R5 is late, S-D4 names the best installed candidate (the marketing plugin's draft-content or content-creation skill) itself and logs it here. |
| 2 Nov 17:00 (s-d4-blog-pipeline, on L-03 R5): the copywriting skill is `marketing:content-creation` for stages 3 to 6, confirmed on by `orchestration` (`SKILL ON`, ~17:00). `humanizer` (a voice-matching editor, R5 option B) was asked for the edit stage; `orchestration` didn't install it (a third-party plugin changes what runs in every session, and R5 leaves it to Alex), so it goes to him in the morning hand-over. Not `marketing:draft-content`: it stops to ask for six inputs and would stall unattended. Stages 3 to 6 never stop to ask. | R5: no skill is built for transcript to post; content-creation is on today and doesn't stall; the prompts' voice and claim rules rank above any skill's advice (R1). | It meets Alex's rule today with nothing installed, and the rule set that keeps his voice stays in the prompts. | The skill named in each hand-off. If Alex approves `humanizer`, only the edit stage's `{SKILL}` and its voice pass change. |
