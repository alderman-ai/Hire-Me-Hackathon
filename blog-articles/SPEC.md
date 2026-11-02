# S-D5 Two blog articles: executable spec

Status: running since the RESTART (17:13); dictation 1 on the desk at 17:30, no intake (dropped, §9) · Row: S-D5 — Two blog articles · Folder: `blog-articles\` · Session: `s-d5-blog-articles`

**Two articles, not three** (Alex, OT-04 note, about 16:40: "we'll do two articles"). C10 is applied: the charter's D5 and DoD-15 say two (§9). Both topics are his, verbatim in §1a, and he asked for visuals to go with them (§7a).

S-D5 produces two blog posts, each from about 15 minutes of Alex's dictation, drafted by the blog pipeline's stages (`..\blog-pipeline\`, S-D5's own since S-D4 retired), finished by Alex (his last 10%, in a Claude Doc) and published on the site (DoD-15). They're written for Addvery's audience, in Alex's voice and under his name. On the site they're the blog at `/blog`: one page per post in the template S-D5 asks `website` for (BUILD S-D5-B1), each with its "How this post was made" box.

## 1. Operator preflight (P3)

**No intake** (dropped at the RESTART, 17:13, §9). Under Alex's reset rules (`..\answer-desk\ASKING.md`, 17:00), easy calls are this session's, decided and logged in §9; his only sign-off is the last 10% of each post. His reset intake (`..\Operator tasks\Archive\Decide - everything left that needs you.md`) already told him: "the two blog dictations (ready now)" and "each blog post's draft, in a Doc, for your last 10%".

**Operator scenes.**
- **Two dictations**, about 15 minutes each, on camera. Each is a Claude Doc with the topic, the decided landing and ask, eight talking prompts and a "Dictate below this line" heading. He dictates into it with Wispr Flow and comments "done". The desk alerts him with a `TASK s-d5-blog-articles: blog dictation <n> is ready to record: <link> ...` line.
- **The last 10% of each post**, about 10 minutes each, in a Claude Doc holding the near-final draft. His comment on it is the sign-off; the post then goes live.

### 1a. Alex's decisions in his OT-04 note (verbatim, 2 Nov about 16:40)

Source: `..\Operator tasks\Archive\Approve - research for the blog pipeline.md`, the changes box. Never re-ask these.

- **Count.** "we'll do two articles."
- **Article 1.** "One is about how there's no such thing as building something like an AI workflow as a product. It's always a managed service because the models always change. / Add to it that every company is going to have to decide what level of AI skill they want their company to have. Do they want to be able to just use workflows other people build? Do they want to be able to maintain them themselves or to build them themselves? You can imagine a sliding scale that's vertical: at the bottom is the training and at the top is the external building. They're going to have to find out where on the slider they are because they're either going to need to get trained how to do it themselves or they're going to have to bring in someone external or hire someone external. Still they're going to need to compensate someone else for whatever they build with the training to actually use it."
- **Article 2.** "The second article will be about how, basically, GTM engineers are the solution to the biggest social question of the AI era. A lot of companies are saying that AI is not a way for them to fire half their company. For AI to save a company any money there has to be some return on that investment. If it's not lowering their labor costs then it has to be increasing their revenue. / That means GTM engineers who focus AI on their pipeline are actually the ones that are helping companies keep their promise: that AI is a way to do more business and have their whole team grow together, rather than replace half their team. GTM engineers have a really crucial role to play in this AI transformation and you use that as a base. We'll fill in more of the details later."
- **Visuals.** "you can draft some LinkedIn imagery or whatever. While you do that you can do some mockups of what the LinkedIn content might use. Use whatever frontend code or any kind of design choices they've scraped from LinkedIn content. Take that and then we can create it the same way we did the Appify one, where there's a template in the background and then the generative AI text on top." And: "You can go ahead and do some workshopping on what the visual assets that go with them might look like. We can also create something in Comfy. There's a Comfy UI repo on desktop that knows how to build things. Make a spec for all that or plan in the spec for all that."
- **Copywriting.** "Do not do any copywriting without identifying which skill you need to turn on, telling the orchestrator to turn it on for you. Do not do any copywriting without a copywriting skill."
- **No more article questions now.** "I really don't want to talk any more about articles right now."

**Off camera.** Nothing.

**Runtime questions** go to the desk as asker `S-D5`, ids `S-D5-Q1` onwards, one at a time (`..\answer-desk\ASKING.md`), and only for a real blocker (reset rule 1). Pokes only while work is blocked on him, at most every 30 minutes: `POKE S-D5: waiting on you for <what>` (reset rule 7). No 18:00 cut-off (reset rule 8).

## 2. Spec contract

| Item | S-D5's answer |
| --- | --- |
| 1. Its place | Row S-D5 — Three blog articles (deliverable D5). Claims DoD-15. Serves DoD-14 (each post's changed-words share shows what the last 10% was) and DoD-19 (the blog grows on the site through the day). Serves DoD-22 (every post passes the scan before it's published). Reads the L-03 and L-01 findings. |
| 2. Its neighbours | Depends on S1 (L-03 findings). Owns S-D4's retired kit in `..\blog-pipeline\`. Uses `website` (S-D8) for the post template and to publish. Runs in parallel with S-D1, S-D3, S-D6, S-D7 and S-D9. Feeds S-D8 (the posts) and S-D9 (each dictation's clock times, as clip candidates). |
| 3. Operator preflight | §1 (DI-XX). |
| 4. Decision log | §9. |
| 5. Forking gates | §8. |
| 6. Working directory | `blog-articles\`; its reading list is §3. |

## 3. Routing and resources

Paths are relative to `blog-articles\`. Step 1 of the run confirms every resource is reachable and turns anything ambiguous into a desk question.

- `..\CHARTER.md`: the parent context. Read only, never edit.
- `..\SESSIONS.md`: the roster. Message sessions only by these names; edit only S-D5's own row.
- `..\GIT.md`: the shared-tree rules. Commit only `blog-articles\` and S-D5's own operator tasks, path-limited.
- `..\answer-desk\ASKING.md`: the desk format, TASK lines, the poke, and Alex's reset rules at the top (17:00), which override older text here.
- `..\answer-desk\qa\S-D5.md`: S-D5's own Q&A record, once the desk creates it.
- `..\Operator tasks\Archive\INDEX.md`: Alex's earlier answers; never re-ask them. DI-1: dictation is Wispr Flow, and `/process` runs only when he types it.
- `..\Operator tasks\Archive\Decide - everything left that needs you.md`: Alex's answers to the intake for everything left (DI-10, 17:23), verbatim; for this spec, Q10.10 (the GTM demos section as a list of blog-style entries). Read them for wording, never re-ask them.
- `..\Operator tasks\Decide - your three blog posts, topics and timing.md` (in `..\Operator tasks\Archive\` once filed): this spec's preflight answers, verbatim.
- `..\Operator tasks\Archive\Decide - how the blog pipeline should work.md`: S-D4's preflight intake (DI-8), read only, for its answers on counting the test dictation (question 3), its topic (question 4) and how dictations land (question 2).
- `SPEC.md`: this file. `HANDOFF.md`: the state after a fork, if it exists.
- `..\research\DIRECTORY.md`: the index of every research report. Read only.
- `..\research\lists\L-03-blog.md` (S-D4's list, with S-D5 offered merged) and `..\research\lists\L-01-parent.md`. Read only; S1 owns them.
- Research findings: S2 adds a line here for each report when S1 sends FINDINGS for L-03 and L-01.
- `..\Operator tasks\Archive\Approve - research for the blog pipeline.md`: Alex's answer on the blog research list (OT-04), verbatim, with his long note: the copywriting-skill rule, two articles and their topics, and visuals for them. Read it for wording, never re-ask it. Its decisions are in §1a.
- **L-03 findings** (blog research; S-D5 is a reader). Read only; S1 owns them. Options for Alex, not decisions.
  - `..\research\global\L-03-R6-article-1-base.md`: the research base for article 1 (facts, sources, counterarguments, no copy). "Models always change" is strongly backed; "no such thing as a product" is the weakest part; the slider only partly fits existing frameworks. Feeds `briefs\A-01-base.md`.
  - `..\research\global\L-03-W3-wildcard-received.md`: how article 1's argument reads from a job applicant, and what raises its credibility (part (c), C1 to C8). Applies to article 2 as well.
  - `..\research\global\L-03-R5-blog-writing-skill.md`: the copywriting skill to use. `marketing:content-creation` is on (SKILL ON from `orchestration`, 16:47); `humanizer` is Alex's call, for tomorrow.
  - `..\research\global\L-03-R1-transcript-to-draft.md`: reuse Alex's spoken words, trace every claim to the transcript.
  - `..\research\global\L-03-R4-finished-b2b-post.md`: informative visuals over decorative ones, one diagram, a link-preview image; behind POST-FORMAT v1.1.
  - `..\research\global\L-03-R7-article-2-base.md`: article 2's research base (accepted 17:16). Feeds `briefs\A-02-base.md`. Being written from R7 and the synthesis (17:25); it lands with the next commit, and `briefs\A-02-outline.md` stands until then.
  - `..\research\global\L-03-synthesis.md`: S1's synthesis of all ten L-03 reports, written for S-D5 alone (about 17:35). Start with "Tonight, in five lines"; its recommendations 1 to 26 and the calls in "(b)" are logged in §9.
- **Visuals resources** (§7a), read only:
  - `..\research\global\L-05-R1-pixel-perfect-demo.md`: Alex's earlier Apify demo, the "backdrop plus slot map, AI text on top" method, its render flags and traps.
  - `..\canva-templates\BUILD-SHEET.md`: S-D6's Addvery grid, type scale and colour roles, by role name only.
  - `..\canva-templates\local\` (git-ignored): S-D6's brand tokens, fonts and render pattern, provisional until Alex's brand sign-off. Linked by relative path from `local\visuals\`, never copied into a tracked file.
  - `C:\Users\alder\Desktop\Comfy UI\`: Alex's ComfyUI repo, for optional generated backdrops. Its own CLAUDE.md and BOUNDARIES.md govern any run; S-D5 never edits it.
- **L-03 findings, the rest** (FINDINGS L-03, 17:20; added by S2 as C13). The block above holds the synthesis, R6, R7, W3, R1, R5 and R4; read in that emphasis order, synthesis first, then R6 and R7, W3, R1, R5. These four complete the list. Read only; S1 owns them. Options for Alex, not decisions; under his reset rules the easy calls in them are yours, decided and logged.
  - `..\research\global\L-03-W2-wildcard-delivered.md`: what a shared post link shows before the click: today every sub-page previews as the homepage, so each post needs its own preview tags (its own URL and title) and a card image from its cover text on a fixed background; LinkedIn caches a preview for about a week, so the tags must be right before any link is shared.
  - `..\research\global\L-03-R3-capture.md`: capture: 15 minutes fits Wispr Flow's 20-minute cap, but dictate in two or three pieces so no text is lost; light cleanup only, with a glossary file and every fix logged; the rig transcript is raw and exists only after /stop then /process.
  - `..\research\global\L-03-R2-claude-design.md`: the Claude design app: a post template built into the site is the only repeatable route (/blog/[slug] is close to a copy of /docs/[slug]); Claude Design fits at most as a one-off design pass.
  - `..\research\global\L-03-W1-wildcard-executed.md`: can two articles come from Alex's dictations, and the least he must do: two dictations, about 34 minutes of his time, with the drafting after. Written before the 16:47 reset and S-D4's retirement; the 18:00 cut-off no longer applies.
- **L-01 findings** (S1's parent research, approved by Alex as OT-01; added by S2 as C07): for this spec, read the synthesis first, then R1, W3, R2.
  - `..\research\global\L-01-synthesis.md`: S1's synthesis of the parent research: the strongest findings, recommendations per spec, and 24 one-line questions for Alex, each naming the spec it blocks. Start here: take this spec's section, and fold the questions that name it into your next gate. Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-R1-legibility.md`: making the work legible: outcome first, a short demo, a 3 to 4 step how-it-works; what reads as a toy or as noise; AI labels. Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-R2-gtm-engineer-hiring.md`: what a GTM engineer is hired to show, which deliverables fit it best, and the gaps none of them shows. Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-R3-personal-data.md`: personal data on a public site: GDPR, LinkedIn's terms, what the live run needs, and the safe, risky and keep-off table for stakeholder sections (section 7). Not legal advice. Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-R4-format-reception.md`: whether a site aimed at one employer lands: replies versus hires, when it turns creepy or self-indulgent, and the one small ask. Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-W1-wildcard-executed.md`: whether a dozen background sessions can run through the day and night: usage limits, Windows Update restarts, idle stops. Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-W2-wildcard-delivered.md`: what the six actually get from the alert: the link, the preview card, click timing, and the morning hand-over checklist (C7). Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-W3-wildcard-received.md`: whether AI-made work reads as skill or as a shortcut: the penalty bites on personal lines, not on the machinery. Options for Alex, not decisions. Read only; S1 owns it.
- `..\blog-pipeline\SPEC.md`: S-D4's spec, for its five talking prompts, the pipeline files it will produce, and its `PIPELINE` and `HANDOVER` messages. Read only.
- `..\orchestration\_templates\Operator task template.md`: the form of the dictation and finish tasks. `..\orchestration\_templates\Gate approval template.md` and `..\orchestration\check_gate.py`: only if a spec-draft gate is needed (§7). Read only. Every operator task S-D5 writes follows Alex's readability rule (2 Nov, in `..\answer-desk\ASKING.md`): a plain file name, `Approve - ...` for a gate and `Do - ...` for anything else; its OT id in the front matter only; a `## What this is` section first; no codes in the text.
- `..\OBS\Processed\index.json` and `..\OBS\Processed\Sxx_*\segments.jsonl`: filed sessions and transcripts, the backup source for a dictation. Read only.
- `..\website\CLAUDE.md`: how the site is built and deployed. Read only; publishing is a BUILD request to `website`.
- Tools: general-purpose subagents, SendMessage and Monitor (load SendMessage, ListAgents and Monitor with ToolSearch at startup).
- Not read: `..\Addvery Research\`. Topics come from Alex.

**The blog kit in `..\blog-pipeline\`** (S-D4's, S-D5's since the RESTART): the runbook `PIPELINE.md`, `POST-FORMAT.md`, the stage prompts, the sample post and the scripts. S-D5 runs them and edits them directly when a stage's output is wrong (fix the prompt, bump its version, rerun from that stage), committing as `[blog-pipeline] ...`.

**Outputs.** What S-D5 creates, in `blog-articles\`. Its operator tasks go in `..\Operator tasks\` (§7).

```
blog-articles\
  CLAUDE.md, SPEC.md, HANDOFF.md, .gitignore (ignores local\)
  TOPICS.md              the two articles: topic, angle, slot, and whether article 1 came from S-D4
  briefs\A-01-base.md    article 1's research-backed base: thesis, skeleton, facts he can say, objections, talking prompts
  briefs\A-02-outline.md article 2's outline, from his note (its base follows when L-03 R7 lands)
  VISUALS.md             the visuals plan and method, brand roles by name only (§7a)
  local\visuals\         git-ignored: backdrops, templates, slot maps, AI text, renders, ComfyUI backdrops
  dictations\A-0<n>.md   each dictation, as Wispr Flow typed it
  drafts\A-0<n>\         the pipeline's stage outputs and post.md, per runbook version
  posts\<nn>-<slug>.md   the finished posts: the site's content
  PUBLISHED.md           per post: URL, BUILT time, runbook version, share of words Alex changed
```

## 4. Problem and scope

**The problem.** D5 is three real posts that show the pipeline works more than once, on topics Addvery's audience reads, finished by Alex and live on the site. Each costs him about 15 minutes of talking and 10 of finishing, and his time is the bottleneck (P3), so everything else is done for him: the topic brief, the task to dictate into, the draft, the checks and the publishing.

**In scope.**
- `TOPICS.md` and a talking brief per article: article 1's base from L-03 R6, article 2's outline from Alex's note (and its base from R7).
- The visuals workshop (§7a): local mockups of each article's LinkedIn imagery, backdrop plus AI text on top, optionally with ComfyUI backdrops. Nothing published until Alex says.
- The dictation tasks, and capturing each dictation.
- Running S-D4's runbook on each dictation, and taking over article 1 from S-D4 if Alex counts the test.
- One finish task per post, and publishing each through `website` with its changed-words share.

**Out of scope.**
- Changing the pipeline or the template: S-D4's (requests go as `PIPELINE FIX S-D5`).
- Research into Addvery's audience: Alex's own, in `..\Addvery Research\`.
- Promoting the posts; LinkedIn content is S-D7.
- The charter's Scope binds: no real data through the demos except the D3 live run, no automation sending, no one else's LinkedIn account. S-D5 touches none of them.

## 5. Definition of done

Written before research and methodology. Two, not three, throughout this table (Alex, OT-04; charter change C10 pending in `orchestration`).

| Criterion | Traces to |
| --- | --- |
| Two topics fixed by Alex are in `TOPICS.md` (done: his OT-04 note, §1a) | DoD-15 |
| Two dictations of about 15 minutes each were captured, one of them S-D4's test if Alex counted it | DoD-15 |
| Each was drafted by S-D4's runbook at an accepted version, with no hand edits by this session | DoD-15 |
| Alex finished each post in its finish task (`Done` ticked), and the share of words he changed is recorded in `PUBLISHED.md` and on the post | DoD-15; serves DoD-14 |
| Both are live at `/blog/<slug>` and listed on `/blog`, each with a `BUILT` reply from `website` and a check of the live page | DoD-15 |
| Every post passed the scan before its BUILD: no secrets, nothing of the Apify proposal or Alex's own GetSales outbound, nothing from `Addvery Research\`, no `[Alex: ...]` marker left | DoD-22 (served) |

## 6. Research step

At launch the session sends `s1-research` exactly one line:

`RESEARCH S-D5: L-03 (offered merged with S-D4) plus L-01, its posts run through S-D4's pipeline and L-03 sets what a finished post looks like, needed by 16:30`

Approving the list is S1's gate, not this session's.

**Not sent (16:45):** S1 already runs L-03 with S-D5 as a reader, on Alex's OT-04 note, and added R6 (article 1's base) and R7 (article 2's base) for this spec. It sends each report as it's reviewed (R6 arrived 16:52), so the line would only duplicate it.

**Goes ahead meanwhile:** `TOPICS.md`, the dictation tasks, and capturing the dictations. None of them depends on findings.

**Waits for FINDINGS:** the check that S-D5 needs nothing beyond S-D4's runbook (§7, gates). The findings reach the drafts mostly through S-D4's runbook, which S-D4 revises on them.

**If findings are late,** nothing here waits on them: the dictations go ahead, and drafting follows whatever runbook version S-D4 announces. S-D4's preflight (its question 5) decides whether S-D4 drafts before its findings land.

**Since the RESTART (17:13):** L-03 is complete. R6 (16:52) and R7 (17:16) are accepted, and the synthesis landed at about 17:35 (§3). L-01's findings stay on the reading list. Nothing waits on research any more.

## 7. Methodology and steps

**Draft methodology**, confirmed once L-03's synthesis lands. S-D5's drafting is S-D4's accepted runbook, run twice. Around it sit four steps of its own:
- **Brief.** Per article, its base in `briefs\` (article 1 from L-03 R6, article 2 from Alex's note and then R7): the thesis in his words, a section skeleton that maps onto POST-FORMAT, facts he can choose to say aloud, the strongest objections for him to answer, and the extra talking prompts. The dictation task carries S-D4's stage-0 talking prompts plus those extras. A base is a brief, not a draft: the pipeline adds no claim he doesn't say.
- **Copywriting skill** (Alex's rule, §1a). Any step that writes text a reader outside the project will see sends `orchestration` `SKILL S-D5: <skill> for <what>` first and waits for `SKILL ON`, then names the skill in every subagent prompt that writes copy, with the pipeline's no-invented-claims rule winning where they conflict. On: `marketing:content-creation` (16:47) for both bases, both outlines and the mockups' text. The pipeline's own stages use S-D4's `{SKILL}`.
- **Capture.** As S-D4 does it: Wispr Flow into a dictation task, the rig as backup (S-D4's preflight, question 2).
- **Finish.** The post goes to Alex as an operator task with the post copied in. He edits it in place and ticks `Done`.
- **Publish.** The edited post is copied back, measured against the pipeline's draft, scanned, and published through `website`.

**Gates.** S-D5's own DoD maps one-to-one onto DoD-15, which Alex signed off in DI-5, and its drafting is S-D4's runbook, which Alex approves at S-D4's gates. So S-D5 has a spec-draft gate only if its methodology must differ from S-D4's accepted runbook (a stage added, dropped or changed). Then it freezes this SPEC.md into `..\Operator tasks\Approve - how the three blog posts get made.md` from the gate template (`## What this is` and summary in plain words), commits it, sends `TASK S-D5: Approve - how the three blog posts get made.md is waiting on you: a change to how your blog posts are drafted`, waits with Monitor running `python -I orchestration\check_gate.py "Operator tasks\Approve - how the three blog posts get made.md"` from the repo root every 300 seconds, pokes after 15 minutes, applies any `CHANGES`, and then sends `TASK DONE S-D5: Approve - how the three blog posts get made.md` and `ARCHIVE Approve - how the three blog posts get made.md: readers S-D5`. Finishing isn't a gate: it's Alex's own edit.

**Coherency check:** "If we execute this methodology, will DoD-15 be satisfied?" Criterion by criterion against §5: topics (step 2, done by Alex in §1a), two dictations (steps 3 to 5), drafted at an accepted version with no hand edits (step 6), finished by Alex with the share recorded (steps 7, 8), live and checked (step 8), scanned (step 8). A criterion with no step is a gap, fixed before drafting.

**Run steps since the RESTART (17:13).** These replace steps 2 to 9 below wherever they differ; the old steps are kept for their detail on scans and the BUILD wording.

1. **Brief.** `briefs\A-01-base.md` and `briefs\A-02-base.md` (from R7 and the synthesis).
2. **Dictation Doc** per article, via `anthropic-skills:docs`: what this is, the topic in his words with the narrower claim offered, the decided landing and ask, stage 0's five prompts plus the brief's extras, the strongest facts only, and `## Dictate below this line` last. Send `answer-desk` `TASK s-d5-blog-articles: blog dictation <n> is ready to record: <link> ...`. Alex comments "done" on the Doc.
3. **Capture.** Read the Doc back from the heading down into `dictations\A-0<n>.md`, run `scan.py`, commit, tell `s-d9-legibility` the clock times. While waiting, check the Doc every 5 minutes (synthesis rec 8); the rig transcript is a backup, not a wait.
4. **Draft.** Run stages 1 to 7 from `..\blog-pipeline\prompts\` (`PIPELINE.md` §2), one fresh subagent per stage, `{SKILL}` = `marketing:content-creation`, output in `drafts\A-0<n>\`. After stage 5, one fresh cold-read subagent under `marketing:brand-review`, briefed as a sceptical agency leader, marks but changes nothing (rec 15).
5. **Finish Doc.** Load the copy skill, then `anthropic-skills:docs`. One Doc per post: a short block on top (two or three title and opening options, the `[Alex: ...]` markers, the cold-read marks, what the post page will show), then the post. Send `TASK s-d5-blog-articles: blog post <n> is ready for your last 10%: <link>`. His comment on the Doc is the sign-off.
6. **Publish.** Read the final text back into `posts\<nn>-<slug>.md`, compute the share of words changed with `counts.py --changed`, run `validate.py` and `scan.py`, commit, then `BUILD S-D5-B<n>` to `website`. After `BUILT`, curl the page head (its own `og:title`, `og:url`, `og:image`) before the link goes anywhere (rec 24). Log it in `PUBLISHED.md`.
7. **Done.** Both live: `DONE S-D5: two posts live at <URLs>` to `orchestration`, roster row to Finished, stop.

**Run steps.** Commit after every finished step, path-limited: `git commit -m "[blog-articles] <message>" -- blog-articles/...`, and S-D5's operator tasks with `-- "Operator tasks/<file>"`.

1. Read §3 and confirm each resource is reachable. Resume from `HANDOFF.md` if it exists. Anything ambiguous becomes `S-D5-Q1`.
2. Apply DI-XX's answers to §1 and §9, read S-D4's answers, and write `TOPICS.md`: each article's topic, angle, slot, and whether article 1 comes from S-D4. Send the RESEARCH line (§6).
3. **Dictation tasks.** At least 20 minutes before each slot, write `..\Operator tasks\Do - dictate blog post <n>.md` from the Operator task template, with the next free OT number in its front matter (check `Operator tasks\` and `Archive\` just before writing): `## What this is` in plain words, then the slot, the topic and angle, the five talking prompts, a "Dictate below this line" section and a `- [ ] Done` box. Commit it and send `answer-desk` `TASK S-D5: Do - dictate blog post <n>.md is waiting on you: your 15-minute dictation for blog post <n> at <slot> on <topic>`.
4. **Capture.** Wait with Monitor, running `python -I blog-pipeline\scripts\check_done.py "Operator tasks\Do - dictate blog post <n>.md"` from the repo root every 300 seconds (S-D4's script in `..\blog-pipeline\scripts\`, run, never edited; if it isn't there yet, ask `s-d4-blog-pipeline` for it and check the box by reading the file meanwhile). Poke 15 minutes after the slot ends if `Done` isn't ticked. Once it is: copy the text into `dictations\A-0<n>.md`, run S-D4's scan, commit, send `TASK DONE S-D5: Do - dictate blog post <n>.md` to `answer-desk` and `ARCHIVE Do - dictate blog post <n>.md: readers S-D5` to `orchestration`. Tell `s-d9-legibility` the dictation's clock times and rig session, as a clip candidate.
5. **Article 1 from S-D4,** if the test counts. On `HANDOVER S-D4 T-01: ...`, copy the post into `drafts\A-01\post.md` and its dictation into `dictations\A-01.md`. Commit.
6. **Draft.** On each `PIPELINE S-D4 v<n>: ...`, check `..\blog-pipeline\PIPELINE.md` at that version against this methodology (the gate rule above), then draft every captured article not yet drafted on v<n>, in parallel (P1): one chain of subagents per article, each stage handed only its prompt from `..\blog-pipeline\prompts\` and its inputs (P7), output in `drafts\A-0<n>\`. No hand edits: a bad output goes to `s-d4-blog-pipeline` as `PIPELINE FIX S-D5: <what>`. A newer version redrafts every draft not yet sent to Alex. Commit.
7. **Finish tasks.** Only once S-D4 has announced an accepted version, so Alex never polishes a draft the pipeline is about to change. For each draft on that version, write `..\Operator tasks\Do - finish blog post <n>.md` from the Operator task template (OT id in the front matter only, `## What this is` first): what to do in three lines, the title and description to check, the `[Alex: ...]` markers listed, the whole post under "Edit the post here", and a `- [ ] Done` box with the line "Ticking Done means finished" plus what happens next per question 4. Commit it and send `TASK S-D5: Do - finish blog post <n>.md is waiting on you: your last 10% on blog post <n>, <title>`. Wait with Monitor running `python -I blog-pipeline\scripts\check_done.py "Operator tasks\Do - finish blog post <n>.md"` every 300 seconds. Poke after 15 minutes, but only inside the times question 3 gives him; outside them, wait without poking, and the morning cleanup session takes it up.
8. **Publish.** When `Done` is ticked: copy his edited post into `posts\<nn>-<slug>.md` with its front matter per `..\blog-pipeline\POST-FORMAT.md`; compute the share of words he changed against `drafts\A-0<n>\post.md` with S-D4's script in `..\blog-pipeline\scripts\`, and put it in the front matter; run the scan (DoD-22, nothing from `Addvery Research\`, no `[Alex: ...]` marker left). A hit in his own edit goes to the desk as an `S-D5-Q` before anything is published. Commit, send `TASK DONE S-D5: Do - finish blog post <n>.md` and `ARCHIVE Do - finish blog post <n>.md: readers S-D5`. Then, as question 4 says (each at once, or all three together): `BUILD S-D5-B<n>: publish article <n> at /blog/<slug> and list it on /blog. Content: blog-articles\posts\<file>. Source: Alex's 15-minute dictation on <topic>, drafted by the S-D4 pipeline v<n>, finished by him (<share>% of words changed).` On `BUILT`, open the live URL and check it matches the file. Log it in `PUBLISHED.md` and commit.
9. **Done.** When all three are live, send `orchestration` `DONE S-D5: three posts live at <three URLs>`, and tell `s-d4-blog-pipeline`. Move S-D5's roster row to Finished (`[roster]` commit, path-limited) and stop.

**Site requests** go one at a time as `BUILD S-D5-B<n>: ...`, numbered in the order sent. Wait for `BUILT S-D5-B<n>` or `REFUSED S-D5-B<n>` before sending the next. The post template is S-D4's request; if it isn't built yet, S-D5 waits for it.

**Screen care.** The dictation tasks are on camera, and that's the point. Never open the Apify proposal or Alex's own GetSales outbound. If he says something in a dictation that mustn't be published, the scan cuts it from the post, and S-D5 tells `s-d9-legibility` the clock time so that stretch stays off the site.

## 7a. Visuals plan (Alex, OT-04)

Alex asked for visuals to go with the two articles: LinkedIn imagery made "the same way we did the Appify one, where there's a template in the background and then the generative AI text on top", in the design choices captured from Addvery's LinkedIn, and optionally something in ComfyUI. Everything here is a **local mockup**: nothing is published, uploaded or put into Canva until Alex says so, at a time the held intake sets.

**Three layers per article,** each with one owner:

| Visual | What it is | Made by | Where |
| --- | --- | --- | --- |
| In-post diagram | Article 1: the AI-skill slider as a `[!diagram] scale` (external building at the top, training at the bottom). Article 2: a `[!diagram] flow` from AI spend to revenue growth, the labour-cost road not taken. Drawn by the site template from text, so no image. | The pipeline's Format stage, from the brief's diagram block | POST-FORMAT v1.1 §3.5 (S-D4's) |
| Link-preview card | The 1200×630 image a shared link shows, generated by the site from the post's `cover` fields | `website` (S-D4's template request) | POST-FORMAT v1.1 §5 |
| LinkedIn companion images | Per article: a 1080×1350 single-image teaser, a 1200×630 card mock and a 1080×1350 diagram card. A backdrop (the template in the background: base colour, glow, fixed chrome) plus coded text slots with measured character budgets, filled by AI-written text (the "generative AI text on top") | S-D5, in `local\visuals\` | §7a below |

**Method** (L-05 R1, Alex's Apify demo): one backdrop per canvas; a slot map per format (x, y, w, h, type step, colour role, measured character budget); the text in a separate content file per article, written under `marketing:content-creation` from Alex's words only; headless Chrome renders; every render checked for size, loaded fonts and each slot's edges and corners; text that doesn't fit is rewritten, never trimmed. Brand values come from S-D6's provisional tokens in `..\canva-templates\local\` (Addvery's look, from Alex's brand capture), linked, never copied into a tracked file, so Alex's brand sign-off restyles both. No Addvery logo: the posts are Alex's, in Addvery's look (§9).

**ComfyUI, optional** (not run as of 16:58: needs a work order inside his Comfy UI repo, §9). Text-free abstract backdrops per article (article 1 a rising scale of light, article 2 a widening stream), dark where text sits, run by Alex's ComfyUI repo's own rules, at most six generations, and only if it runs without a login or payment. They swap in as the backdrop layer. Prompts, model, seeds and cost go in `local\visuals\backdrops\comfy\prompts.md`.

**Tracked vs local.** `VISUALS.md` (tracked) holds the plan, the formats, the slot names and budgets by role name, the text used, and how to re-render. Everything holding a brand value, and every image, stays in `local\visuals\` (git-ignored), since it derives from Alex's own Addvery research.

**What happens next, later.** When Alex is ready to talk about articles: he looks at the contact sheet, picks a backdrop (coded or ComfyUI), and says whether the images go to S-D6 (Canva), S-D7 (LinkedIn posts) or the site. The text on them is redone from the finished post once he has done his last 10%, so the images never say more than the post.

## 8. Forking gates (P8)

| Gate | When |
| --- | --- |
| F1 | Retired at the RESTART: there's no 18:00 cut-off any more (reset rule 8). |
| F2 | The session's context is about half full, whatever else is happening. |

How it forks:
1. Write `HANDOFF.md`: each article's state (topic, dictation, draft version, finish task, published), open questions and tasks with their times, pokes sent, BUILDs awaiting a reply, and decisions since the last fork. Commit it.
2. From `blog-articles\`, launch the successor under the same name: `claude --bg -n s-d5-blog-articles "Read CLAUDE.md, then HANDOFF.md. You are now the active S-D5 session."`
3. Update S-D5's row in `..\SESSIONS.md` with the handoff time and commit it on its own: `git commit -m "[roster] ..." -- SESSIONS.md`.
4. Announce it to `website`, `answer-desk` and `s1-research` (`s-d4-blog-pipeline` has stopped): `HANDOFF s-d5-blog-articles, <time>: a fresh session has taken over under the same name. Re-send anything that got no reply since <time>.`
5. The old session stops itself with `claude stop` and its own exact id.

## 9. Decision log (P5)

Since the RESTART, easy calls are decided here at once (reset rule 1); a passed deadline on a real blocker means one poke, then decide and log (reset rule 8). Start each decision with the time and the question id.

| Decision | Justification | Why it's the right call | Blast radius if changed |
| --- | --- | --- | --- |
| 2 Nov, drafting (wave2-specs): no spec-draft gate unless the methodology differs from S-D4's accepted runbook. | S-D5's DoD maps one-to-one onto DoD-15 (signed off, DI-5), and its drafting method is approved at S-D4's gates. | It keeps Alex's gate count low (P4) without skipping an approval of anything new. | One gate added if Alex wants to see S-D5's spec anyway. |
| 2 Nov, drafting (wave2-specs): Alex's last 10% is an operator task with the post copied in and a `Done` box, not a gate approval. | Alex: "Anything that needs me to look at something needs to be in operator tasks"; finishing is his edit, not an approval. | He edits where he already works, and the session knows the moment he's done. | Steps 7 and 8. |
| 2 Nov, drafting (wave2-specs): drafts start on each runbook version as it's announced, but go to Alex only once a version is accepted. | Drafting costs no operator time; polishing a draft that then changes would waste his. | It keeps drafts ready for his first gap without risking his effort. | Repeated subagent work only. |
| 2 Nov, drafting (wave2-specs): posts carry Alex's name and voice, written for Addvery's audience; they aren't written as Addvery's own posts. | The site is his job application; writing as Addvery would put words in a real company's mouth. | It shows the skill without impersonating anyone. | The byline in each post's front matter. |
| 2 Nov, drafting (wave2-specs): topics are proposed from Alex's own expertise and today's build; no Addvery research is read. | Addvery research is his own (DI-3 Q3.3), and nothing from `Addvery Research\` may reach a tracked file. | He picks or swaps; nothing leaks from his folder. | `TOPICS.md` and the dictation tasks. |
| 2 Nov, drafting (wave2-specs): each post shows the share of words Alex changed. | It turns "the last 10%" (DoD-14, which S-D5 serves) into a number a visitor can see. | It's honest evidence, whatever the number turns out to be. | The front matter and S-D4's template box. |
| 2 Nov, drafting (wave2-specs): finish-task pokes go out only inside the times Alex picks in DI-XX question 3. | A poke during a recorded scene or overnight helps no one. | It respects P4 and P5 without letting tasks go quiet in his window. | Step 7 only. |
| 2 Nov 16:50 (OT-04): **two articles, not three**, ahead of the charter. | Alex: "we'll do two articles." `orchestration` queued C10 to change the row and DoD-15. | It's his explicit call. Working to three until the charter catches up would spend a dictation he said he won't give. | §5, §7, Appendix A. If C10 is refused, one more topic and dictation come back through the intake. |
| 2 Nov 16:50 (OT-04): **both topics are Alex's, verbatim** (§1a); the intake's topics question is dropped. | He gave both in his note; ASKING.md says never re-ask what's answered. | It saves him a question while he's asked for none. | Appendix A loses question 1; `TOPICS.md`. |
| 2 Nov 16:50 (orchestration's launch brief): **groundwork now, intake held, no article questions to Alex.** The bases, outline and visual mockups run now; dictations and his last 10% wait for the intake. | Alex: "I really don't want to talk any more about articles right now." | P3 and P4: everything not needing him gets done first, so his later 30 minutes buy two finished posts. | Steps 3 to 8 start later; nothing built now is lost. |
| 2 Nov 16:50 (OT-04): **a brief is a base, not a draft.** Facts from R6 and R7 go in the brief as things Alex can choose to say aloud, never into a post. | The pipeline adds no claim he didn't say (S-D4's runbook; L-03 R1). | It keeps every published claim his and traceable, while giving him the evidence to talk from. | `briefs\` only. |
| 2 Nov 16:50 (OT-04): **visuals in three layers** (in-post diagram, site link card, LinkedIn companion images), and only the third is S-D5's to build. | POST-FORMAT v1.1 already has the diagram and the site-made link card (S-D4, from L-03 R4). | No duplicate work with S-D4 or `website`; S-D5 builds only what nobody else owns. | §7a; a format added later is one more template. |
| 2 Nov 16:50 (OT-04): **companion images use Addvery's look from S-D6's provisional tokens, with no Addvery logo, byline Alex.** Mockups and brand values stay in git-ignored `local\`. | Alex: "Use whatever ... design choices they've scraped from LinkedIn content." The posts are his, not Addvery's (decision above). The values derive from his own Addvery research. | Same look as the site and the Canva templates, without putting words in Addvery's mouth or leaking his research into git. | Re-render after the brand sign-off; adding a logo is one slot. |
| 2 Nov 16:50 (OT-04): **no spec-draft gate for the visuals or the bases.** | Neither changes how posts are drafted (the gate rule, §7); both are local groundwork Alex sees later. | It keeps him free of gates while he's asked for no article questions. | One gate if he wants to approve the visuals plan before anything is published. |
| 2 Nov 16:50 (OT-04): **ComfyUI optional, capped:** at most six generations, only without a login or payment, run by his repo's own rules. | Alex: "We can also create something in Comfy." It costs credits and the coded backdrop already works without it. | It tries his tool without spending or logging in on his behalf. | `local\visuals\backdrops\comfy\` only. |
| 2 Nov 16:58: **ComfyUI not run.** The trial stopped before generating: his repo runs everything on Comfy Cloud (signed in), and its rules make any job a work order logged inside that repo (provenance ledger, run README, runs index, KB step), which S-D5 may not edit. No credits spent. | `Comfy UI\BOUNDARIES.md` and `comfy.yaml`, read by the trial helper. | Running it from here would break his repo's own rules. | Options for Alex later: a session inside the Comfy UI repo runs it as a work order (about 13 to 20 credits for 4 to 6 images, under its 75-credit no-ask limit; its fixed 896×1152 size means the 1200×630 crops come from portrait); or he adds an exemption to BOUNDARIES.md. The coded backdrop stands meanwhile. |
| 2 Nov 16:58 (S-D4, relaying Alex in DI-8 question 1: "Anything about blog pipelines is dead. The only deliverable is blogs."): **S-D4 is retired; the blogs are entirely S-D5's.** No test dictation, no article 1 handover, no template request will come from S-D4. Its runbook v0, prompts, POST-FORMAT v1.1, sample and scripts are S-D5's to use as tooling, copied into `blog-articles\` (GIT.md keeps S-D5 out of `blog-pipeline\`). The site's blog template request becomes `BUILD S-D5-B1` (text in `..\blog-pipeline\PIPELINE.md` §4, plus preview tags and the og:image). | Alex's DI-8 answer; S-D4's hand-off message. | The deliverable is the blogs, so the session that owns them owns the tooling and the template. | §3 inputs, §7 steps 5 and 6 (no handover; S-D5 runs the stages itself), §8 announcements (no `s-d4-blog-pipeline`). Re-planned after the 16:47 HOLD lifts; nothing changed yet. |
| 2 Nov 17:13 (orchestration, RESTART): **the held intake is dropped**; no intake goes to Alex. Its questions are decided below or answered by his reset intake ("the two blog dictations (ready now)"; "each blog post's draft, in a Doc, for your last 10%"). | Alex's reset rules, 17:00: "If things are an easy judgment please clear the plate for me." | His only blog sign-off is the last 10% (reset rule 2); everything else here is an easy call. | Appendix A; §1. An intake comes back only if he asks for one. |
| 2 Nov 17:13 (orchestration): **C10 is applied**: the charter's D5 and DoD-15 say two posts. | The change `orchestration` queued at 16:50. | Closes the 16:50 row's open end. | None. |
| 2 Nov 17:13 (orchestration): **`..\blog-pipeline\` is S-D5's, used and edited in place**; `s-d4-blog-pipeline` has stopped. This replaces the 16:58 row's "copied into `blog-articles\`". A bad stage output means S-D5 fixes the prompt, bumps its version and reruns. | S-D4 is retired (DI-8); orchestration may hand folders over (GIT.md). | One copy of the kit, owned by the session that uses it. | Commits under `[blog-pipeline]`; §3, §7, §8. |
| 2 Nov 17:13 (orchestration; reset rule 4): **drafts go in a Claude Doc**, one per post, and Alex's comment on it is the sign-off. The final text is read back into `posts\`, and the share of words he changed is computed against `drafts\A-0n\post.md` and shown on the post. Replaces the finish operator tasks of old steps 7 and 8. | Alex: "writen work shoudl be done there, it's a good last mile editing surface". | He edits where he already reviews written work, and the comment reaches this session. | Old steps 7 and 8; the "Run steps since the RESTART" list in §7. |
| 2 Nov 17:13 (orchestration; reset intake): **no ComfyUI run, coded visuals only; `humanizer` waits for the morning.** | Alex's reset intake: "Blog visuals are coded, with no paid Comfy run. The humanizer plugin waits for later." | His call. | §7a's ComfyUI line; `local\visuals\backdrops\comfy\` stays empty. |
| 2 Nov 17:20 (reset rule 6): **the visuals take the website's Addvery kit** (`website\local\addvery\brand\`), linked by relative path, not S-D6's canva-templates tokens. Re-skin under `frontend-design`, then `design:design-critique` and `design:accessibility-review`; `VISUALS.md` carries role names only. | Reset rules 5 and 6: one brand source, and no design work without a design skill. | One look across the site, the posts and the images. | `local\visuals\` only, plus `VISUALS.md`. |
| 2 Nov 17:20 (W3 C4; orchestration's recommendation; L-03 synthesis (b)): **both articles land on someone inside who can maintain and extend what's built**, not on an outside vendor. | It fits a job application, and it's the rung the evidence backs best ("someone always has to maintain it"). | An outside-builder ending reads as a vendor pitch; a neutral one wastes the application. | Each dictation Doc's "Already decided" list and its prompt 8; he can override aloud or in a comment. |
| 2 Nov 17:20 (W3 C5 C; synthesis (b)): **his interest is named once, plainly, in the opening; no ask at the end**, in both posts. The site's own ask carries the pitch. | Saying it first defuses "a GTM engineer selling GTM engineers" (A-02's objection 3). | A closing ask on a thought piece reads as a sales page. | The dictation Docs; the edit stage's notes. |
| 2 Nov 17:20 (synthesis conflict 3): **the slider keeps Alex's order**: training at the bottom, external building at the top. The dictation Doc notes that published frameworks put in-house building on top and invites one sentence on why his differs. | It's his diagram, and the pipeline adds nothing he didn't say. | He decides the framing aloud; the research point is in front of him. | The in-post diagram, the diagram card in `local\visuals\`. |
| 2 Nov 17:22: **each dictation lands in a Claude Doc**, not an operator task file: topic, decided landing, prompts, facts and a "Dictate below this line" heading; Alex comments "done". Capture tips from L-03 R3 are on the page (two or three Wispr stretches of 5 to 7 minutes; Alt+Shift+Z or History to recover). | Reset rule 4 and his reset intake ("coming to you as links, with no files to fill in"); the comment reaches this session without a file watch. DI-8 question 2 (where dictations land) was never answered. | One surface for his writing and talking; no Obsidian file to find. | If Wispr Flow can't type into the Doc, he pastes from anywhere, or the rig transcript is the source (`PIPELINE.md` §1). A task file takes two minutes to write. |
| 2 Nov 17:30: **dictation 1 first** (its base was ready); dictation 2 once `briefs\A-02-base.md` is refreshed from R7 and the synthesis. | P3: shoot his scenes first; article 1's base needed nothing new. | His next free minutes go to a ready dictation, not a half-ready one. | Order only. |
| 2 Nov 17:38 (L-03 synthesis): **its 13 calls in "(b)" are taken on its defaults**: the narrower claim offered next to his strong one; only the strongest facts in front of him (R6 facts 1 to 3 and 5; the Menlo and BCG figures left off dictation 1's page); IBM against Klarna offered for article 2's lead, flagged as one CEO's word; the EU AI Act only if he says it, in the July 2026 wording; the share of words changed shown as measured; two or three title and opening options in each finish Doc; one cold read per post under `marketing:brand-review`; companion images local until a post is live; search basics in the morning. | S1's synthesis, written for S-D5 alone; every call is assistant-actionable. | Easy calls under reset rule 1, each with an evidence trail. | Per call; each is one edit to a Doc, a prompt or a brief. |
| 2 Nov 17:50 (synthesis (a); orchestration, 17:48): **its two questions for Alex are decided, not asked.** Q1, how the posts reach Addvery's six: through the stakeholder pages and his own alert, nothing extra from this session. Q2, the optional LinkedIn Post Inspector check: skipped; the curl of each post's page head after `BUILT` (rec 24) checks its own og:title, og:url and og:image instead. | Reset rule 1: easy calls are this session's; orchestration named both defaults. | Nothing waits on Alex for them, and his screen stays on the dictations. | Q1: a share on his own LinkedIn is his to add any time. Q2: if a card unfurls wrong after a share, LinkedIn's cache needs Post Inspector then. |
| 2 Nov 17:55 (Alex, DI-10 Q10.10 at 17:23, via orchestration): **the blog template is the site's shared content-entry template**: one index of entries, some with a video and some purely written, the two articles next to the GetSales demo videos, the branded assets and the LinkedIn grading rubric. BUILD S-D5-B1 was amended to say so; `website` owns the route and the entry schema, and S-D5 adds any new field to `POST-FORMAT.md` so the posts validate. Also Q10.5: the site is prep for Alex's meeting with Ivana tomorrow, so article 1 aims to be near-final in its Doc before then. | Alex's own answer: "Some of them will have a video and some of them will just be purely written." | One template for every entry keeps the site consistent and saves `website` a second build. | `POST-FORMAT.md` §2 (new optional fields), the publish BUILD wording (route), PUBLISHED.md URLs. |
| 2 Nov 18:20 (reset rule 5): **the visuals were made under the `frontend-design` skill read from its SKILL.md file**, because the skill doesn't resolve by name in this folder (plugin enabled in `.claude\settings.json`, not in the session's skill list). `design:design-critique` and `design:accessibility-review` did load and ran; their fixes are in `VISUALS.md`. Reported to `orchestration`, which installed the plugin per project at about 17:45 (00c57cf): a fresh session lists it as `frontend-design:frontend-design`, so the next handoff loads it by name; until then the fallback stands, logged each time. Open point kept for the redo from the finished posts: the two teasers leave their lower part as empty glow. | The rule asks for the skill's guidance before design work; the file is that guidance. | Work didn't stop on a loader problem, and the gap is reported so it gets fixed for every session. | A re-run once the skill loads by name; `local\visuals\` only. |

## Appendix A. Held preflight intake (dropped)

Dropped at the RESTART, 17:13 (`orchestration`; §9): no intake goes to Alex. The held draft (topics, slots, finish times, go-live) is in git history at `b77b869`; every question in it is now decided in §9 or answered by Alex's reset intake.
