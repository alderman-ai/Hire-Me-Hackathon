---
title: "AI workflows are always a managed service"
slug: "ai-workflows-are-always-a-managed-service"
description: "An AI workflow is never a product. The models always change, so it's always a managed service, and every company has to choose its level of AI skill."
author: "Alex Alderman"
date: "2026-11-02"
status: "near-final"
kind: "article"
deliverable: "d5"
cover:
  kicker: "The models always change"
  title_lines: ["AI workflows are always", "a managed service"]
  subtitle: "The models always change, so every AI workflow needs someone to run it, and every company has to choose who."
  accent: "managed service"
tags: ["ai-workflows", "gtm-engineering", "ai-adoption"]
reading_minutes: 7
made:
  minutes_talked: 29
  words_spoken: 4400
  words_drafted: 1468
  share_changed_by_alex: null
  dictated: "2026-11-02T10:31"
  rig_session: "S03"
  pipeline: "blog pipeline v1"
  stages: ["compile", "clean", "extract", "outline", "draft", "edit", "cold read", "format", "scan"]
  checks: ["edit", "cold read", "scan"]
---

At the start of my 12-hour hackathon build, I was already about two hours behind. My background sessions wouldn't launch, Anthropic had released about 30 updates to Claude Code in the last two days, and there were bugs everywhere. It was driving me crazy.

That morning was a small version of what I believe about this work. There's no such thing as building something like an AI workflow as a product. It's always a managed service, because the models always change. Add to that: every company is going to have to decide what level of AI skill it wants to have.

I spent those 12 hours building on camera to show what's possible with what people are starting to call a GTM engineer. Before that, I'd spent about nine months on an AI sabbatical, doing nothing but building in Claude Code, and I'm finally ready to apply what I've learned at real companies.

> [!summary]
> - An AI workflow is never a product: it's always a managed service, because the models always change.
> - After the first build, someone has to make it work better, make it cheaper and teach people to use it.
> - When something breaks, fix it, then codify the fix as a skill so the next fix is instant.
> - Every company has to find its place on the slider: train its people, or bring in or hire someone external.

## The models and tools change under you

When I build with AI, I give it all the information it needs in a pretty complex document, and I spent six months building my own methodology for this. For the hackathon I set it aside and used the app's new features out of the box. It was a really good test: maybe the advantage I had, having my own methodology, is no longer relevant.

I still thought my method was a little bit better than what you get out of the box. Two hours in, I said on camera: "It's so dumb. I spent six months building my own methodology and now I'm doing this." By the end of the day, [Alex: did your own method still beat the out-of-the-box features].

The features keep moving too. Some new ones in Claude Design make some of the things I do a worse quality but a better user experience, and I think the quality is still good enough. Until Fable 5.5 comes out, Opus 5.5 is my go-to model for anything complicated.

> [!quote]
> That's one thing that's really important in AI, is you really kind of get stuck in your ways.
> Alex Alderman, on camera during the hackathon, 2 Nov 2026

I've used AI daily for years, since back when context windows were really small and you had to put in a markdown file and download it at the end. It reminds me of floppy disks, where you had to put it in and take it out. I still have almost superstitions from that time, and my idea of how big a context window is stays too small. You get in habits, especially if you build your own tooling, and this build was breaking all the habits.

All of that is one person's setup. Inside a company, [Alex: one company workflow that a model or tool update broke, and what fixing it took].

## Built once, then constantly upgraded

A workflow that works still isn't free: it's going to cost tokens. After the first month of building, we need to make it work better. We need to make it cheaper. And we're going to need to teach people how to use it.

Over its life, one workflow goes through these steps:

1. Build out an MVP of something that works.
2. Expect it to start on the more expensive side.
3. Make it more token efficient.
4. Train people how to use it.
5. Constantly upgrade it.

It starts expensive because in a 12-hour, very time-pressure build, it's not going to be the most efficient. Keeping one workflow running costs [Alex: what one workflow costs to keep running each month, in tokens or hours].

The upside is that AI work is front-loaded: my 12-hour build was the costly part.

> [!quote]
> What would it look like if all of this was already automated? Because I'm building it now on camera, but once it's built, it's built.
> Alex Alderman, on camera during the hackathon, 2 Nov 2026

A lot of what I built that day is skills and workflows, and they carry over. If I did the same thing for a new company tomorrow, the time would be cut in half, and the stress would be cut in half.

## When something breaks, codify the fix

Early in the afternoon, I tried to end one background session I didn't need anymore and ended all of them, including the ones that handle the recording. On camera, I said: "That's awesome. That is a disaster. Okay. Breathe. Water."

The agents got it all working again, and the fix was perfect, so I asked them to keep it.

> [!quote]
> Please go ahead and codify that as a skill so that if I need to use it again, it's an instant fix.
> Alex Alderman, on camera during the hackathon, 2 Nov 2026

That became a background session recovery skill for the next time the power goes out. About an hour later, I put the main session in charge of every other session's context too, so that nothing is rotting in context without it being fixed.

Once enough of my judgment calls were codified, a lot of the work ran without me. A decision desk pinged me whenever a session had a question, and one session pulled anything blocked on me into a markdown file I edit in Obsidian.

It didn't all hold. By five o'clock there were too many things at once, the desk got overloaded, and I hadn't realized I was blocking a bunch of things. That wasn't great, but the concept is cool.

That's a managed service at the scale of one person: something breaks, you fix it, you codify the fix, and that never stops.

## Find out where your company sits on the slider

All of this leaves every company with a choice about its level of AI skill: to just use workflows other people build, to maintain them itself, or to build them itself.

> [!quote]
> So you can imagine a sliding scale that's vertical, and so on the bottom is the training and on top is the external building.
> Alex Alderman, on camera during the hackathon, 2 Nov 2026

> [!diagram] scale
> Where a company sits on the slider of AI skill
> 1. External building: bring in or hire someone external
> 2. Build: build your own workflows
> 3. Maintain: keep the workflows others build running
> 4. Training: learn to use what other people build

Each company is going to have to find out where on the slider it is. [Alex: check the diagram's order for use, maintain and build between training and external building]

Either its people get trained how to do it themselves, or it brings in or hires someone external. Even then, it's going to need training to actually use what someone else builds. You can tell which rung you're on from [Alex: two or three signs that tell a company which rung it is on].

Building from scratch that day, I found it refreshing to realize what training is for. The progress of learning AI is the clarity of understanding how all this stuff works, and how it works best. So it's not the cluster of markdown files on your computer, it's clarity. Then comes the ability to clearly share that clarity with the assistant.

## Someone who keeps it running and builds what's next

You have people on your team, I guarantee it, already playing with Claude Code and building agentic workflows. I wanted to show what happens when you have someone who's really good at that.

> [!quote]
> It's not like any software that you've ever used before. It's like a mindset, it's like a language, you get lots of gut feelings and stuff.
> Alex Alderman, on camera during the hackathon, 2 Nov 2026

Now I need to know how to build this in real companies, with a real CRM, with real IT restrictions.

One thing surprised me on build day: I didn't really need to micromanage. The agents talking to each other worked really well, and I need to build what comes next off of that.

Whichever rung a company picks, someone has to keep its workflows running and build what comes next on top of them. I think that's going to be one of the most in-demand positions over the next five, ten years.

So on Monday, find out where on the slider your company sits. Then name the person who will keep your workflows running as the models change: someone you train, or someone you bring in or hire.
