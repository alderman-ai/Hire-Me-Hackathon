---
title: "Teaching a machine to sound like me"
slug: "teaching-a-machine-to-sound-like-me"
description: "Almost every word on this site is written by AI, and every word is supposed to sound like me. Getting there took about 2,500 of my LinkedIn posts, a lot of refining, and a skill built around one problem: an AI is a terrible judge of its own writing."
author: "Alex Alderman"
date: "2026-11-02"
status: "published"
kind: "showcase"
library_id: "art-teaching-a-machine-to-sound-like-me"
group: "How the day went"
cover:
  kicker: "How the day went"
  subtitle: "Almost every word on this site is written by AI, and every word is supposed to sound like me."
  accent: "a machine"
tags: ["copywriting", "process"]
reading_minutes: 4
---
Almost every word on this site is written by AI, and every word is supposed to sound like me. Getting there took about 2,500 of my LinkedIn posts, a lot of refining, and one problem I'd already called out in July: an AI is a terrible judge of its own writing.

## Day 1: my own site talked about me like a stranger

On Day 1 the agents writing the copy turned out what I called, at 20:29, "this weird mix of super formal and really awkward, and that's not me." Third person, too. My own job application used my full name, like I wasn't in the room.

What stung was that the fix was sitting right there. "You have so many transcripts of how I talk. None of it sounds like me. I hate that."

I've been copywriting for a long time, and my rule for this build was clear: no copywriting "without an actual skill enabled please, for the love of God." A skill is a reusable set of instructions an AI agent follows. By 21:01 that evening mine was built, checked against my own posts and running. It's called alex-voice, nothing a visitor reads gets written without it, and it's run more than 40 times.

## About 2,500 posts, refined in stages

My brand voice started from a LinkedIn corpus of **about 2,500 posts**, and it's gone through many refinement stages since. First came a grading rubric, the list of rules a draft gets judged against, built from my own grades: posts I graded with notes, then 60 graded blind, with my rewrites and critiques. Then a skill for writing my LinkedIn posts against it. In October I admitted that yes, it would be AI, "But I have too much pride for slop, so I guess we're going to have to build it right."

alex-voice is the web version. 13 rules carried over, 4 LinkedIn-only ones got dropped, and 14 new ones came from a voice guide built on my messages and recordings, from my 34 original LinkedIn posts of May to October 2026, and from my complaints about the site copy. 27 rules, each with an ID.

## My AI loves its own writing

Opus is the AI model I run most of my work on. In July I wrote that "opus judges opus like the obama award meme", as in Obama giving Obama a medal. Ask an AI agent to grade its own draft and you get the same ceremony every time.

That's the major obstacle, and the skill is built around it. **The writer never grades itself.** Every run starts from my words, then:

1. The writer, an AI agent, gets the rules phrased as instructions, a brief and my words. Never the rubric itself.
2. A script checks every countable rule with no AI call: em dashes, length, my name in the third person. A fail goes straight back.
3. A grader, a separate AI agent whose only job is to judge, reads the full rubric (about 18,000 characters), the brief, my words and the draft. It's brand new every attempt, with no history of the writing session, and the writer never talks to it.
4. The writer gets back **only the IDs of the failed rules**, never the grader's reasoning.

That last step matters most. As the skill puts it: "Grader prose teaches the writer what the judge likes to hear; the IDs tell it what to fix." Up to three attempts, then it stops. It never runs "one more". Every grade gets logged with the grader's findings, so I tune the rubric from evidence (because I do evals like a grown up).

> [!figure] /demos-assets/teaching-a-machine-to-sound-like-me/writer-grader-split.png
> the writer/grader split, drawn as a diagram: my words and a brief go to the writer; a script checks every countable rule; a fresh grader with the full rubric

## First, it graded me

Before trusting the grader with anyone's copy, I pointed it at mine. Five of my own posts, graded blind: the grader wasn't told they were mine. If it called my writing unpublishable, the rubric was broken. It didn't. The two that fell short failed on length, which is honestly my own most-repeated complaint. One of them calls itself "rambling" in its own text.

Fair.

Three rules still got loosened for flagging my real writing. The closer rule, for one, failed my deadpan "TL;DR someone broke my workflow and it's frustrating lol".

> [!figure] /demos-assets/teaching-a-machine-to-sound-like-me/check-on-own-posts.png
> the check on my own writing: five of my own posts graded blind, the rules each one failed, and the three rules loosened afterwards

## Fenced in, not gone

None of that makes the bias disappear. On the LinkedIn rubric, machine graders gave ten Greats where I gave three. A machine pass means a draft clears every rule, not that I'd call it great. So **my own read is the final test**. I wrote in October that "this is just software and mistakes are a skill issue". If a bad line ships, that's on me.

## About 20% of the time it used to

The number I actually track is my own time. Proofreading machine-written text in my voice takes me **about 20% of the time it used to**. That's the success metric.

## What I build for salespeople

Outreach has my Day 1 problem: it reads like nobody in particular wrote it. As I wrote in August, "It's ... HARD ... to set up efficient content ops pipelines that match your brand voice and brand manual 1:1."

So that's what I do. I help salespeople who do outreach build the same thing for themselves, from their own posts and their call or dictation transcripts, **so their outreach sounds like them**. It doesn't replace the rep. It puts the rep's own voice on every message in the pipeline.

On Day 1 I typed what this site is for: "Imagine your conversion rate if this is how you reached out to everyone in your CRM." That only works if it sounds like you. Just don't let the writer hand itself the medal.
