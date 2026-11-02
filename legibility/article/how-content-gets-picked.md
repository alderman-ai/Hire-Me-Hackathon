---
title: "How content gets picked"
slug: "how-content-gets-picked"
description: "An agent read my recordings every 30 minutes and picked what my hackathon site showed. Here's what it looks for, what it leaves out, and how a post gets made."
author: "Alex Alderman"
date: "2026-11-02"
status: "near-final"
kind: "showcase"
deliverable: "d9"
cover:
  kicker: "From recordings to posts"
  subtitle: "I set the rules; an agent reads every recording, picks the moments and logs what it leaves out."
  accent: "gets picked"
tags: ["gtm-engineering", "content-ops", "ai-agents"]
reading_minutes: 6
---
<!-- Drafted by s-d9-legibility from legibility\SPEC.md (sections 7 and 9), posted.md, clip-index.md, checks.md, local\article\arc-backstage.md (section 3) and the rig transcripts S04, S07 and S10 (segments.jsonl). PENDING0001 = c-s04-legibility-born (S04, 7:16 to 8:41); PENDING0002 = c-s07-done-means-additions (S07, 5:03 to 6:02). -->

On 2 November I recorded myself for most of the day while I directed Claude Code sessions to build demos for a job application, in public. Nobody following along was going to watch hours of that, so one session got a single job: watch it for them. It read what my recording rig had filed and what had changed in the project, picked what a follower should see, and asked the session that builds the site to post it.

I set the rules; an agent applies them every 30 minutes. It's also a GTM demo in its own right, for any team sitting on hours of recorded calls.

> [!summary]
> - Every 30 minutes an agent reads new recordings and project changes, then decides what deserves a post.
> - I set the rules, and it writes down a reason for everything it leaves out.
> - Ten updates to the site went live between 13:50 and 18:25, and none was refused.
> - The same loop could turn a team's recorded calls into posts and clips.

## I asked for it before it existed

At 12:22, while listing the day's deliverables on camera, I split one off from the website: a separate analyzer that takes each processed recording, finds the most valuable content and tells the site session what to add. One session builds the site. This one decides what goes on it.

> [!video] PENDING0001
> 12:22: the legibility analyzer is born, while I list the deliverables

At 13:41 I said what done looks like: I keep building, and the site keeps getting additions. The session started at 13:46, before its spec existed, and its first post was live at 13:50.

> [!quote]
> I wanted to proactively keep updating the website to show as much as possible to people following along without me explicitly saying so.
> Alex Alderman, on camera during the hackathon, 2 Nov 2026

[Alex: how it felt to see posts you never asked for]

## What it does every half hour

Each check reads any new recording the rig has filed: the transcript of what I said and the Claude Code logs from that stretch. A subagent reads each new recording and returns candidate moments with quotes, times and role tags, and the main session picks. Then it looks at what changed in the project and at the titles already on the site, so nothing goes up twice. If nothing changed, it logs the check and stops.

> [!diagram] flow
> One pass of the loop, from my recording to the site
> 1. Record and file: the rig films me and files a transcript per session
> 2. Review: read new recordings and project changes every 30 minutes
> 3. Classify: give each moment a class, a score and the roles it speaks to
> 4. Leave out: drop what the rules forbid, and log the reason
> 5. Write: a plain post, my words quoted with session and time
> 6. Build: the site session builds it and replies BUILT

A floor keeps the site fresh: during the build, once 100 minutes pass without a post, a status refresh goes out, so no gap reaches two hours. The longest gap of the day was 85 minutes, while the site was being reskinned.

## What counts as worth showing

It looks for status updates, incidents and recoveries, decisions and their reasons, plans being launched, demos working for the first time, and milestones. It prefers moments that show judgment, or something that broke and how it was handled. My 13:20 accident, when I closed every background session with one click, was on the site by 13:55, recovery included. The bar I set:

> [!quote]
> Basically, anyone checking in every hour or two, the website should be more and more clear about what's going on.
> Alex Alderman, on camera during the hackathon, 2 Nov 2026

It also indexed 109 clip-worthy moments from the first eleven recordings. Each has one of five classes (`demo`, `insight`, `low point`, `turning point` or `humour`), a score from 1 to 5 and its Prague time. Eighteen scored a 5.

Every moment on the site also gets role tags: RevOps, CSO, CMO, CEO, CTO, CAIO (chief AI officer) or COO. Roles only, never people, so each leader can be offered what speaks to their job.

## What it leaves out, and why

Since the 16:44 reset (more below), three things never go out: secrets, a private proposal and my own outbound. Anything I take down joins them, in my words, for good.

> [!video] PENDING0002
> 13:41: what done means, and how I take down what overshares

Everything else is taste. The left-out log held 26 entries by the evening, each with its reason. Some are plain editing: my swearing and complaints about an app stayed off as "not useful to followers, and a bad look in a job application." Some are judgment: a good line about approvals stayed out because another post made the point more strongly.

When the rules changed mid-day, the agent re-judged its old cautions. Before the reset, research about the company's people was off limits; after it, public sources were fine. It still left out a stretch about a real person at the company, logged as taste: "the work over the people." When it's unsure, it leaves the thing out and says why.

## One example: the reset, live 41 minutes later

At 16:44 I stopped every session that was only waiting on me, and we rewrote the rules. That recording, S10, was filed at 17:02, and at 17:20 a subagent read it, with every quote checked against the transcript's timestamps. The build request went at 17:22. At 17:25 two posts were live, one on the reset and one on the lesson I'd drawn at 16:58, plus a status update.

The first quoted me:

> [!quote]
> There's too much stuff that's paused on me and I read through it and it's dumb.
> Alex Alderman, on camera during the hackathon, 2 Nov 2026

Six entries from that recording went into the left-out log instead, from garbled reading aloud to a line that touched one of the three exclusions.

> [!video] FMYWlkGWdeY
> 16:58: the line that was on the site 27 minutes later

From my words on camera to a post on the site took 41 minutes, and I didn't have to ask.

## The same loop on your calls

I built this for one day of my own footage. Swap in a sales team's recorded calls, demos and webinars, and the steps carry over:

1. **Record and file:** if your calls are already recorded and transcribed, this step is done.
2. **Review:** an agent reads what's new, every 30 minutes or once a night.
3. **Classify:** your own classes, such as a customer describing the problem in their words, or an objection handled well.
4. **Leave out:** your hard exclusions, written once. Yours might be customer names, pricing or anything under NDA.
5. **Write and build:** posts, clips for sales enablement, and role tags so each leader sees what fits their job.

What makes it safe to leave running is the rules and the log: I could see why each thing stayed off without watching the footage.

[Alex: your closing ask to a team with recorded calls]
