---
title: "Who writes the LinkedIn posts for your outreach accounts?"
slug: "who-writes-the-linkedin-posts-for-your-outreach-accounts"
description: "Outreach accounts have to post, and nobody owns their content. Here's the pre-AI way I ran by hand, and the post-AI way, with marketing's rules in the pipeline."
author: "Alex Alderman"
date: "2026-11-03"
status: "near-final"
kind: "article"
deliverable: "d5"
cover:
  kicker: "Content distribution"
  subtitle: "A small rotated pool before AI, and marketing's rules built into the pipeline after it."
  accent: "outreach accounts"
tags: ["linkedin", "content-ops", "outbound"]
reading_minutes: 5
made:
  minutes_talked: 15
  words_spoken: 1887
  words_drafted: 1100
  share_changed_by_alex: null
  dictated: "2026-11-03T12:39"
  rig_session: "S20"
  pipeline: "dictate-article v1"
  stages: ["questions", "draft", "voice", "judge", "fix", "final read", "scan"]
  checks: ["voice", "judge", "final read", "scan"]
---
<!-- Dictated in two rounds on 3 Nov: round 1 (about 4 minutes, sent 12:43, not filmed; its length is estimated from 507 words at round 2's pace) and round 2 (13:01 to 13:12, rig session S20). Concept only: every figure is recreated with made-up data, to the specs in blog-articles/local/drafts/A-03/visual-specs.md. -->

One of the advantages of having a GTM (go-to-market) engineer is that they solve a problem almost nobody owns: who's going to write all the LinkedIn content for the people doing outreach? There's a pre-AI way and a post-AI way. I ran the first one by hand, out of an Excel sheet. I'm building the second.

> [!summary]
> - You can't run outreach from an inactive account: people assume, mostly correctly, that you're just automating messages.
> - Salespeople should not be writing LinkedIn content, and marketing doesn't have it in its budget.
> - A small pool of posts, rotated on two rules, keeps every account active, and no one notices the repeats.
> - With AI, marketing's rules move from a sign-off at the end into the pipeline itself.

## Your outreach accounts have to post

If you're sending outreach through LinkedIn, you can't do it from an empty or inactive account. People will assume, mostly correctly, that you're just automating messages.

So you post. Not to become an influencer, and not for reach or inbound.

You send someone a connection request. They visit your profile. They see you've posted weekly for the last couple of months, and they're cool.

**It's a person. It's not just a bot.**

So these accounts need content. That's where it falls apart.

## Nobody owns it: the zone of plausible deniability

LinkedIn content for salespeople lives in a horrible realm somewhere between sales and marketing. Back when I did cross-departmental consulting, I called it **the zone of plausible deniability**.

Sales thinks it's marketing's job, so sales doesn't do it. Marketing thinks it's sales' job, so marketing doesn't do it. No one has it in their budget.

I sold LinkedIn-related services for a lot of years, and sometimes the missing content is the whole reason a company doesn't do LinkedIn outreach at all. Which is insane. I'm biased after years of frustration, but **salespeople should not be writing LinkedIn content.** There are very few good solutions besides having someone who owns it.

## The pre-AI way: a small pool, rotated

Just because AI exists doesn't mean your company's not in the pre-AI world. The future is here, it's just not evenly distributed.

Say you have 20 accounts and you want all of them posting weekly. That doesn't mean 20 new posts a week. You need 40 to 100 posts a year, total, depending on what the company wants to pay, how comfortable you are with repeats, and how much your accounts overlap in who they target.

It runs on two rules:

1. **How often can one account post the same post?** Say once every six months.
2. **How many accounts can post the same thing in the same week?** None, or two at most, and never on the same day.

Everything else falls out of those. Post weekly and repeat every six months, and 25 posts can keep six accounts going all year. If all 20 accounts target the same industry, 25 posts for everyone is probably fine.

Not a single person will notice the repeats. I promise. Seasoned professional here in this field: no one cares, no one's going to check.

People think, "Oh my gosh, I cannot post the same thing twice in six months." No one read it the first time. Even if they did, can you think of a single post you read six months ago by a person you've never met? Of course not.

Back then I tracked all of it by hand in an Excel sheet: who posted what, and when. The content side doesn't really break. It broke when I asked everyone to post it themselves. Once I managed the posting tool for them, everything went out on time.

> [!figure] /demos-assets/who-writes-the-linkedin-posts-for-your-outreach-accounts/tracker-by-hand.png
> A hand-kept spreadsheet: six accounts by eight weeks, a post ID in each cell, colour fills marking posted, chased and missed posts. Made-up data.
> The old way: one sheet, filled in and chased by hand. Recreated, with made-up data.

It also breaks if they really want to be in the approval process. There's usually about three months where they say they do, and they don't approve a single thing on time.

Then you say, "Sorry, you're no longer in the approval process." They didn't read the email saying they're out, so everything's fine. Easy peasy.

## The post-AI way: the rules move into the pipeline

With AI, that's pretty simple to set up. That Excel sheet was a lot of work. Now tracking and scheduling are trivial, especially when you connect an agent to your sending platform through MCP (how an AI agent plugs into other tools).

> [!figure] /demos-assets/who-writes-the-linkedin-posts-for-your-outreach-accounts/tracker-by-agent.png
> The same grid as scheduled chips, week 26 repeating week 1, and three rule checks passing. Made-up data.
> The same pool, scheduled by an agent that checks the rules every week. Recreated, with made-up data.

> [!diagram] flow
> The agent keeps the schedule and hands it to your sending platform
> 1. Post pool: 25 posts, written once
> 2. The rules: how often an account repeats, how many share a week
> 3. Agent: builds the schedule and checks every rule
> 4. MCP: plugs the agent into your sending platform
> 5. Sending platform: posts on each account on its day

From there, it depends on how you want to spend your GTM engineer's time. One route is the same small pool, minus the busywork. The other is a tool salespeople make their own posts with.

The approach I'm working on moves marketing governance from a sign-off at the end into the pipeline itself. Marketing builds the rules (brand unity and stuff like that) into Claude skills or a wrapper on top of them. Sales picks from dropdowns: which ICP they're targeting, thought leadership or something else, or a personal post outside the brand guidelines. Which is totally fine: it's their account.

Nothing marketing wouldn't approve gets spit out, so nobody needs to hear "Sorry, you're no longer in the approval process." To get there, you lean into the deterministic side of the skill set, code that checks a rule the same way every time, not just prose commands. **You put in real guardrails that people can't just ask nicely and get what they want.**

> [!figure] /demos-assets/who-writes-the-linkedin-posts-for-your-outreach-accounts/governance-in-the-pipeline.png
> Two flows: before, posts wait in a queue for marketing's sign-off; now, sales picks from dropdowns and the rules are checked in code.
> The approval didn't go away. It moved into the pipeline. An illustration.

That's all text so far. For visuals, I have a [pixel-perfect branded pipeline working on my GitHub](https://github.com/alderman-ai/pixel-perfect-branded-assets-demo).

## So who writes it?

Not the salespeople. And not nobody, which is what the zone of plausible deniability gets you. It's going to be solved by people like me: someone who owns the pool, the schedule and the rules.
