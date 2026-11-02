---
title: "AI workflows are always a managed service"
summary: "An AI workflow is never a product: the models always change, so someone has to keep it running, and every company has to pick its spot on the slider."
read_minutes: 5
sources:
  - "blog-articles/drafts/A-01/post.md (near-final, voice-passed)"
  - "blog-articles/local/sources/A-01.md (his compiled words, rig S01-S11)"
  - "scraping/site/linkedin-wall/wall.json (his post of 28 May 2026, agent hype)"
grade: "Good"
failed_ids: "LEN-27, SRC-36"
attempts: 3
attempt_used: 3
alex_markers: 5
run_log: ".claude/skills/alex-voice/local/runs/2026-11-02-02-managed-service/log.md (git-ignored)"
status: "voice pass, not published"
note: "Sabbatical is 'about nine months' as he said in S02; the library flags a nine-or-six conflict elsewhere. The slider quote now uses his written-note wording, attributed 'in his notes'."
---
There's no such thing as building an AI workflow as a product. **It's always a managed service, because the models always change.**

The first half of my 12-hour hackathon proved it before I'd built anything. By 10:49 I was about two hours behind, because my background sessions (the AI agents that keep working on their own while I do something else) wouldn't launch. Anthropic had released something like 30 updates to Claude Code in two days, and there were bugs everywhere. It was driving me crazy.

Add to that: every company is going to have to decide what level of AI skill it wants to have. That's the second half of this article, and it's the half that costs money.

For context, I spent those 12 hours building on camera to show what's possible with what people are starting to call a GTM engineer. Before that I'd spent about nine months on an AI sabbatical, doing nothing but building in Claude Code. I'm finally ready to apply what I've learned at a real company.

> [!summary]
> - An AI workflow is never a product. The models always change, so it's always a managed service.
> - After the first build, someone has to make it work better, make it cheaper and teach people to use it.
> - When something breaks, fix it, then save the fix as a skill so the next fix is instant.
> - Every company has to find its spot on the slider: train its own people, or bring someone in.

## The models change under you, and so do your habits

When I build with AI, I give it everything it needs in a pretty complex document. I spent six months building my own methodology for that. For the hackathon I set it aside and tried what you get out of the box, which was honestly a really good test. Maybe the advantage of having my own methodology is no longer relevant. We'll see.

I still thought my way was a little bit better. By half past twelve I said it out loud on camera: "It's so dumb. I spent six months building my own methodology and now I'm doing this." By the end of the day, [Alex: did your own method still beat the out-of-the-box features].

The tools didn't sit still for the test either. Some new features in Claude Design make a few of the things I do worse quality but a better user experience. I think the quality is still good enough. Ask me again next month.

> [!quote]
> That's one thing that's really important in AI, is you really kind of get stuck in your ways.
> Alex Alderman, on camera during the hackathon, 2 Nov 2026

I've used AI daily since back when a context window (how much the model can hold in mind at once) was really small. You had to put in a markdown file and download it at the end. It reminds me of floppy disks: put it in, take it out. I still have almost superstitions from that time, and my sense of how big a context window is stays too small. You get habits, especially if you build your own tooling, and this build broke all of them.

That's one person's setup. Inside a company, [Alex: one company workflow that a model or tool update broke, and what fixing it took].

## Built once, then upgraded forever

Say I build you a workflow in the first month and it works. You might ask: okay, why do we even need you after that? Because we need to make it work better. We need to make it cheaper. And we're going to need to teach people how to use it.

It's not free, right? It costs tokens, which is what you pay the model for every chunk of text it reads and writes. Here's the life of one workflow:

1. Build an MVP: the smallest version that works.
2. Expect it to start on the expensive side.
3. Make it more token efficient.
4. Train people how to use it.
5. Constantly upgrade it.

It starts expensive because a 12-hour build under that much time pressure is never going to be the most efficient one. Keeping one running costs [Alex: what one workflow costs to keep running each month, in tokens or hours].

The good news is that the expensive part comes first. My 12 hours on camera were it.

> [!quote]
> What would it look like if all of this was already automated? Because I'm building it now on camera, but once it's built, it's built.
> Alex Alderman, on camera during the hackathon, 2 Nov 2026

A lot of what I built that day is skills (saved procedures an agent can run again) and workflows, and they carry over. If I did the same thing for a new company tomorrow, the time would be cut in half, and so would the stress.

## When something breaks, keep the fix

Early in the afternoon I tried to end one background session I didn't need anymore. I ended all of them, including the ones running my recording. Live, on camera: "That's awesome. That is a disaster. Okay. Breathe. Water."

The agents brought every session back. The fix was perfect, so I asked them to keep it.

> [!quote]
> Please go ahead and codify that as a skill so that if I need to use it again, it's an instant fix.
> Alex Alderman, on camera during the hackathon, 2 Nov 2026

Now it's a recovery skill, ready for next time. About an hour later I made my main session responsible for every other session's context too, so nothing sits there rotting without someone fixing it.

It didn't all hold. By five o'clock there were too many things at once, and I hadn't noticed I was blocking a bunch of things. That wasn't great.

**That's a managed service at the scale of one person:** something breaks, you fix it, you save the fix, and that never stops.

## Find your company on the slider

Which leaves every company with a choice about its level of AI skill. Do you want to just use workflows other people build, maintain them yourself, or build them yourself?

> [!quote]
> You can imagine a sliding scale that's vertical: at the bottom is the training and at the top is the external building.
> Alex Alderman, in his notes, 2 Nov 2026

> [!diagram] scale
> Where a company sits on the slider of AI skill
> 1. External building: bring in or hire someone external
> 2. Build: build your own workflows
> 3. Maintain: keep the workflows others build running
> 4. Training: learn to use what other people build

Every company is going to have to find out where it sits. [Alex: check the diagram's order for use, maintain and build between training and external building] You can tell which rung you're on from [Alex: two or three signs that tell a company which rung it is on].

Either your people get trained to do it themselves, or you bring in or hire someone external. **Even then, you still need the training,** because somebody has to actually use what the outsider builds.

Building live that day, I found it kind of refreshing to realize what that training is really for. The progress of learning AI isn't the cluster of markdown files on your computer. It's clarity about how all this stuff works, and the ability to share that clarity with the assistant.

## Someone has to keep it running

You have people on your team, I guarantee it, already playing with Claude Code and building agentic workflows. I wanted to show what happens when you have someone who's really good at that.

> [!quote]
> It's not like any software that you've ever used before. It's like a mindset, it's like a language, you get lots of gut feelings and stuff.
> Alex Alderman, on camera during the hackathon, 2 Nov 2026

What I still need to learn is how this runs in a real company, with a real CRM and real IT restrictions. That's the part I want, and I think there's a real win-win in it.

Whichever rung a company picks, **someone has to keep its workflows running and build what comes next.** I think that's going to be one of the most in-demand jobs of the next five, ten years.

So find your spot on the slider, and name the person who keeps your workflows running. Ideally before the next 30 updates.
