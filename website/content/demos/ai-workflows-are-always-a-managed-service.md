---
title: "AI workflows are always a managed service"
slug: "ai-workflows-are-always-a-managed-service"
description: "An AI workflow is never a product but always a managed service, and every company sits somewhere on a slider between the vendor building and its own people learning, so pick the spot knowingly."
author: "Alex Alderman"
date: "2026-11-03"
status: "published"
kind: "showcase"
library_id: "art-managed-service"
group: "How the day went"
cover:
  kicker: "How the day went"
  subtitle: "An AI workflow is never a product but always a managed service"
  accent: "managed service"
tags: ["managed-service", "adoption"]
reading_minutes: 4
---
A lot of AI marketing goes like this: "We'll build you this workflow. You pay us, we build it, transaction over, and it works like software."

That's a lie. **An AI workflow is never a product. It's always a managed service.** The only real choice is how much of that service is someone building for you, and how much is your own people learning.

> [!summary]
> - An AI workflow is never a product. It's always a managed service.
> - Nothing holds for 3 to 6 months, and even if it did, people are the bottleneck.
> - Every company picks a spot between building and teaching. Pick it knowingly.

## Nothing stays the same for six months

The models change, use cases change, file systems change, IT settings change. Take skills (saved procedures an agent can run again). Plenty of the ones I wrote earlier were long, because they never had to worry about being skimmed. Now they don't fully work the way they're supposed to.

Anthropic's [skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) warn that with nested references, Claude "might use commands such as `head -100` to preview content rather than reading entire files." Their advice is to keep a skill's main file under 500 lines. So what matters has to sit near the top.

It doesn't take a change that big to break a workflow. During my 12-hour hackathon on 2 Nov, my background sessions wouldn't launch, and I was about two hours behind by 10:49. Anthropic had shipped something like 30 updates to Claude Code in two days.

And the model is only one side of it. Your ICP may change. A new law can turn something that was fine yesterday into a violation.

> [!quote]
> The fact that anything would be the same in 3 to 6 months is something that you should seriously question.
> Alex Alderman, in his dictation, 3 Nov 2026

## The bottleneck is always people

I've worked in software adoption, and the bottleneck is never the software. It's people, people, people.

Say I build something for your sales team. They have to type one thing, remember to type it, and be willing to go where they type it. That's already a bar to clear, and that's with a single slash command, the easiest a workflow can be.

The AI marketers say it's wizard magic with no skill gap. Okay, cool, bro, but there is one. It's not a 4-hour SAP course, and I don't know who those 3-hour AI fluency courses are for, but it's not for learning AI.

Teaching AI is so little about AI. Most people aren't super interested in change, aren't excited about AI, and aren't excited about work radically changing.

> [!quote]
> To make it engaging and get people willing to learn something new is like 2% AI and 98% teaching.
> Alex Alderman, in his dictation, 3 Nov 2026

That's where my teaching background comes in handy.

> [!figure] /demos-assets/ai-workflows-are-always-a-managed-service/slash-command.png
> one slash command typed into Claude Code, a whole workflow behind a single line

## Pick your spot on the slider

Picture a slider between building and teaching. At the bottom, the vendor does most of the building. Slide up, and the vendor builds less while your company learns more.

At the low end, someone builds it and teaches your people to use it. On a retainer with someone like me, I fix the pipeline when it changes, train new people as they come and refresh the training when needed.

Slide up, and a company says: no ongoing costs, just teach us how to fix it. That's possible. But fixing it is a lot more complicated than people think, so a lot of that retainer cost just moves into training.

> [!diagram] scale
> The build-teach slider: higher up, the vendor builds less and your company learns more
> 1. Zero building: the vendor only teaches, and your team builds it all
> 2. Build: build it together, or the vendor gets it running so it runs while you learn
> 3. Use and maintain: the vendor builds it and teaches your team to use and fix it
> 4. Use: the vendor builds it, trains your team, and maintains it or says honestly it could break
> 5. Zero teaching: the vendor builds and nobody learns, which is the pitch, and it doesn't work

> [!figure] /demos-assets/ai-workflows-are-always-a-managed-service/build-teach-slider.png
> the slider as a vertical bar, vendor building at the bottom, company learning at the top, the rungs in between, with the zero-teaching end marked

## Never make the contractor the line manager

Wherever you land, one job stays yours. People resist change, and any change to how a company works needs management and line managers.

> [!quote]
> If you're ever in a position where you're trying to make an external vendor a line manager to your people, you've done something wrong.
> Alex Alderman, in his dictation, 3 Nov 2026

Transformation needs the whole company: leadership bought in, and the change built into hiring and performance reviews. If you're not there yet, that's fine. But a contractor acting as line manager won't work, and the contractor probably won't enjoy it much either.

> [!figure] /demos-assets/ai-workflows-are-always-a-managed-service/who-owns-the-change.png
> who owns the change: leadership and line managers above the team, the vendor beside it, building and teaching

## The one honest exception

You can pay for a 2-month solution: I won't fix it, it should work for a month or two, and that's priced in. That's probably a pretty interesting business model right now. It still isn't software that just works. It's just honest about when it stops.

## Harder than they'll tell you

So before anyone builds you a workflow, choose your spot on the slider, and ask the builder two things: who fixes it when something changes, and how much teaching your team needs to actually use it.

I've been on an AI sabbatical for 9 months, in Claude Code 40 to 50 hours a week. Not everyone needs that much. But it's harder than you think, and harder than the AI marketers will tell you.

And yes, you can totally trust me on this, because I'm an AI marketer. Wink, wink.
