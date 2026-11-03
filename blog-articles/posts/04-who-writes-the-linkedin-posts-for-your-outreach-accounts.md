---
title: "Who writes the LinkedIn posts for your outreach accounts?"
slug: "who-writes-the-linkedin-posts-for-your-outreach-accounts"
description: "Every LinkedIn account your team sends outreach from posts every week, on brand, without your salespeople writing a word of it."
author: "Alex Alderman"
date: "2026-11-03"
status: "near-final"
kind: "article"
deliverable: "d5"
group: "Content"
cover:
  kicker: "Content"
  subtitle: "Far fewer posts than you think, two rules for rotating them, and marketing's rules built into the tool."
  accent: "outreach accounts"
tags: ["linkedin", "content-ops", "outbound"]
reading_minutes: 5
made:
  minutes_talked: 15
  words_spoken: 1887
  words_drafted: 983
  share_changed_by_alex: null
  dictated: "2026-11-03T12:39"
  rig_session: "S20"
  pipeline: "dictate-article v1"
  stages: ["questions", "draft", "voice", "judge", "fix", "final read", "scan"]
  checks: ["voice", "judge", "final read", "scan"]
---
<!-- Regenerated 3 Nov against the editor brief. Dictated in two rounds: round 1 (about 4 minutes, sent 12:43, not filmed; its length is estimated from 507 words at round 2's pace) and round 2 (13:01 to 13:12, rig session S20). Concept only: every figure is recreated with made-up data, to the specs in blog-articles/local/drafts/A-03/visual-specs.md. -->

You send someone a connection request. They click through to your profile, and there's nothing there. No posts, or nothing for months. They assume, mostly correctly, that you're just automating messages.

Now the other version. They click through and see you've posted every week for the last couple of months, and they're cool.

**It's a person. It's not just a bot.** That's the whole job of those posts: not to become an influencer, and not for reach.

That's one of the things I do as a GTM engineer. I keep every account your team sends outreach from posting every week, on brand, without your salespeople writing a word of it.

## Nobody owns these posts

LinkedIn content for salespeople lives in a horrible realm somewhere between sales and marketing. Back when I did cross-departmental consulting, I called it **the zone of plausible deniability**.

Sales thinks it's marketing's job, so sales doesn't do it. Marketing thinks it's sales' job, so marketing doesn't do it. No one has it in their budget.

I sold LinkedIn-related services for a lot of years, and sometimes the missing content is the whole reason a company doesn't do LinkedIn outreach at all. Which is insane. I'm biased after years of frustration, but **salespeople should not be writing LinkedIn content.** And marketing doesn't want to write it for them either.

## You need far fewer posts than you think

Say you have 20 accounts and you want all of them posting weekly. That doesn't mean 20 new posts a week. It means 40 to 100 posts a year in total, depending on what you want to pay, how comfortable you are with repeats, and how much your accounts overlap in who they target.

The whole thing runs on two rules. How often can one account post the same thing? Say once every six months.

And how many accounts can post the same thing in the same week? None, or two at most, and never on the same day.

Everything else falls out of those. Post weekly, repeat every six months, and 25 posts keep six accounts going all year. If all 20 accounts sell to the same industry, 25 posts for everyone is probably fine.

And not a single person will notice the repeats. I promise. Seasoned professional here: no one cares, and no one's going to check.

No one read it the first time. Can you think of a single post you read six months ago by a person you've never met? Of course not.

## I used to run it by hand

Back then I tracked all of it in an Excel sheet: who posted what, and when. It was a lot of work.

> [!figure] /demos-assets/who-writes-the-linkedin-posts-for-your-outreach-accounts/tracker-by-hand.png
> A hand-kept spreadsheet: six accounts by eight weeks, a post ID in each cell, colour fills marking posted, chased and missed posts. Made-up data.
> The old way, kept by hand: yellow is a post I had to chase, red is one that never went out. Recreated, with made-up data.

The content side never really broke. It broke when I asked everyone to post it themselves. Once I just ran the posting tool for them, everything went out on time.

It also breaks when people really want to be in the approval process. There's usually about three months where they say they do, and they don't approve a single thing on time. Then you say, "Sorry, you're no longer in the approval process." They didn't read the email telling them, so everything's fine.

## Now the schedule runs itself

With AI, the spreadsheet part is trivial. An AI agent connects straight to whatever platform your team sends from, keeps the schedule, checks both rules every week, and queues each post on each account's day. Nobody chases anybody.

> [!figure] /demos-assets/who-writes-the-linkedin-posts-for-your-outreach-accounts/tracker-by-agent.png
> The same grid as scheduled chips, week 26 repeating week 1, and three rule checks passing. Made-up data.
> Same pool, kept by an agent: P01 comes back to Account 1 after 25 weeks, and all three rule checks pass. Made-up data.

Just because AI exists doesn't mean your company's not in the pre-AI world. The future is here, it's just not evenly distributed.

## Or sales writes its own, inside marketing's rules

The other route is a tool your salespeople make their own posts with. This is the approach I'm working on, and it moves marketing's sign-off from the end of the process into the tool itself.

Marketing sets the rules once: brand unity and stuff like that. Sales picks from a few dropdowns: who they're targeting, what kind of post it is, or a personal post outside the brand guidelines. Which is totally fine. It's their account.

The tool won't put out anything marketing wouldn't approve, because the rules are checked in code, the same way every time, not just written down as instructions. **You put in real guardrails that people can't just ask nicely and get what they want.** So nobody has to hear "Sorry, you're no longer in the approval process." That's all text so far; for the visuals that go with the posts, I have a [working setup on my GitHub that makes pixel-perfect branded visuals](https://github.com/alderman-ai/pixel-perfect-branded-assets-demo).

> [!figure] /demos-assets/who-writes-the-linkedin-posts-for-your-outreach-accounts/governance-in-the-pipeline.png
> Two flows: before, posts wait in a queue for marketing's sign-off; now, sales picks from dropdowns and the rules are checked in code.
> Top row: posts pile up waiting for sign-off. Bottom row: marketing's rules live in the tool and get checked in code. An illustration.

## So who writes it?

Not the salespeople. And not nobody, which is what the zone of plausible deniability gets you. It's going to be solved by people like me: someone who owns the posts, the schedule and the rules.

And when a post comes back round in six months? No one read it the first time.
