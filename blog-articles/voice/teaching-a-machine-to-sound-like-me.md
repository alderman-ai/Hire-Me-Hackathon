---
title: "Teaching a machine to sound like me"
summary: "Every word on this site is supposed to sound like me. On Day 1, none of it did. How my voice went from about 2,500 LinkedIn posts to a rubric, a script and a grader the writer never hears from."
read_minutes: 4
sources:
  - ".claude/skills/alex-voice/SKILL.md, rubric.md (§A basis, THRD-30 and its Day 1 exemplar, §E calibration, §F lineage) and writing-view.md"
  - "Write Great Post, his LinkedIn skill (Desktop/Alderman OS (superceded)/.claude/skills/write-great-post/SKILL.md; lineage only)"
  - "orchestration/local/ALEX-WANTS.md W11, W12, W23 (his 20:29 and 20:39 lines, 2 Nov), W88 (his ask, 3 Nov), plus his 10:2x correction via orchestration: a starting corpus of about 2,500 posts, refined in many stages (git-ignored)"
  - "OBS/Processed/S10 and S13 transcripts (his spoken lines on copywriting skills and the rubric, 2 Nov)"
  - "scraping/site/linkedin-wall/wall-full.json (his posts of 14 May, 2 Aug, 16 Aug, 7 Oct and 12 Oct 2026)"
  - "git log (the skill committed at 21:01 on 2 Nov) and .claude/skills/alex-voice/local/runs/ (the run count only, git-ignored)"
grade: "Great"
failed_ids: "none"
attempts: 1
attempt_used: 1
alex_markers: 0
fact_markers: 0
run_log: ".claude/skills/alex-voice/local/runs/2026-11-03-04-alex-voice/log.md (git-ignored)"
status: "voice pass, not published"
orchestration_edit: "3 Nov: opener 'Every word' changed to 'Almost every word' for accuracy (the LinkedIn wall is his own posts); no other change"
note: "Great on attempt 1 (fresh grader, citations validated). Two figure slots, for the site's image team: THRD-30 with the Day 1 line, and the calibration table. The summary above is put together from the body's own lines and wasn't graded on its own. One line to check: the opener says 'Every word on this site is written by AI', but the LinkedIn wall on /about is his own posts. Names no one but Alex; quotes no run-log draft."
---
Almost every word on this site is written by AI, and every word is supposed to sound like me. On Day 1, none of it did.

## Day 1: my own site talked about me like a stranger

The agents writing the copy produced this weird mix of super formal and really awkward. Third person, homework-style reading lists. A real line from the live site: "What Alex Alderman would build for Addvery's growth team, and what he'd need from you to make it real." My own job application, talking about me like I'm not in the room.

At 20:29 I typed: "The tone of reaching out to people is just so weird and unnatural ... and that's not me." What stung was that hours of transcripts of how I talk were sitting right there. "None of it sounds like me. I hate that."

By 21:01 the fix was built, calibrated on my own posts and running. It's a skill called alex-voice (a skill is a reusable set of instructions an AI agent follows), and since then nothing a visitor reads gets written without it. More than 40 runs so far.

## It started with about 2,500 LinkedIn posts

My brand voice started from a LinkedIn corpus of **about 2,500 posts**, and it's gone through many refinement stages since. First, a grading rubric (the list of rules a draft gets graded against), built from my own grades: posts I graded with notes, then 60 graded blind, with my rewrites and critiques. Then Write Great Post, my skill for writing LinkedIn posts against it. Back in October I wrote that yes, it would be AI, "But I have too much pride for slop, so I guess we're going to have to build it right."

The web port, alex-voice, came on Day 1's evening. 13 rules carried over (sounding like one specific person, earning the length). 4 LinkedIn-only ones got dropped. 14 new ones came from a voice guide built on my messages and recordings, from my 34 original LinkedIn posts of May to October 2026 (they set every countable limit, so none of them fires on my own writing), and from my complaints about the site copy. 27 rules, each with an ID. THRD-30 is the one that killed that Day 1 line: never my own name in the third person on my own site.

[figure: one rule from the rubric, THRD-30, with the real Day 1 line from the live site it was written against and the fix | .claude/skills/alex-voice/rubric.md (THRD-30)]

## The writer never hears what the judge thinks

Every run starts from my words: a transcript excerpt, a clip transcript or lines I typed. Then:

1. The writer, an AI agent, sees the rules phrased as instructions, the brief and my words. Never the grading rubric itself.
2. A script checks every countable rule with no AI call: em dashes, length, my name in the third person, whether at least four of my own words survived in a row. A fail goes straight back and costs no grading.
3. A fresh grader (a separate AI agent whose only job is to judge, new every attempt) reads the full rubric, about 18,000 characters, and grades the draft Unpublishable, Good or Great.
4. The writer gets back **only the IDs of the failed rules**, never the grader's reasoning.

That last step is the trick. As the skill puts it: "Grader prose teaches the writer what the judge likes to hear; the IDs tell it what to fix." Up to three attempts: it stops at the first Great or at the cap, and never runs "one more". Every grade gets logged, so I tune the rubric from evidence.

## First it graded me

Five of my own posts, picked before any grading, graded blind: the grader wasn't told they were mine. Three Great, two Good. The two Goods failed on length, which is honestly my own most-repeated complaint. One calls itself "rambling" in its own text.

Fair.

Three rules got loosened for flagging my real writing. The closer rule failed my deadpan "TL;DR someone broke my workflow and it's frustrating lol". A rubric that grades me as slop is a broken rubric.

[figure: the calibration table: five of my own posts graded blind, three Great and two Good, with the rules each one failed | .claude/skills/alex-voice/rubric.md (section E.1)]

## A machine Great is generous

Honest caveat: it's a directional instrument, not a validated one. Five posts show whether the rubric mistakes me for slop, not where my Good ends and my Great begins. On the LinkedIn rubric, machine graders gave ten Greats where I gave three. A machine Great means "clears every rule", not "I'd call it great". **My own redline is the real test.** (Yes, this article went through the same loop.)

## What I build for salespeople

Outreach has my Day 1 problem: it reads like nobody in particular wrote it. And as I wrote in August, "It's ... HARD ... to set up efficient content ops pipelines that match your brand voice and brand manual 1:1."

So that's what I do. I help salespeople who do outreach build the same thing for themselves, from their own posts and their call or dictation transcripts, **so their outreach sounds like them**. It doesn't replace the rep. It puts the rep's own voice on every message in the pipeline.

On Day 1 I typed what this site is for: "Imagine your conversion rate if this is how you reached out to everyone in your CRM." That only works if it sounds like you. It took me until 21:01 on Day 1.
