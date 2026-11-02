---
title: "Day one: what broke, what worked and what I'd keep"
summary: "I directed about 15 AI sessions for a day to build a job application live. What broke at 13:20, why I stopped everything at 16:44, and what I'd keep."
read_minutes: 6
sources:
  - "legibility/article/day-one.md (near-final, voice-passed; clip ids unchanged)"
  - "legibility/local/article/arc-rig.md (his verbatim quotes, S01-S11)"
  - "legibility/local/article/arc-backstage.md (times and counts from the build logs)"
grade: "Good"
failed_ids: "LEN-27, SPOK-35"
attempts: 3
attempt_used: 2
alex_markers: 2
run_log: ".claude/skills/alex-voice/local/runs/2026-11-02-05-day-one/log.md (git-ignored)"
status: "voice pass, not published"
note: "Attempt 2 is delivered: attempt 3 graded Unpublishable on FACT-37. Clip ids still need the final swap from website/content/clips.json, as the library says."
---
On 2 November I applied for a job by building the work live. For one day I recorded myself directing about 15 Claude Code sessions, each with one job, while they built demos for Addvery, the company I was applying to, and a public site showed anyone following along what was happening. I'd spent six months building my own way of working with AI. That day I left most of it in the drawer, to see if it still gave me an edge.

Honestly, it's kind of cheating: I know how to build all of this because I've built it before. But I was literally building it from scratch, on camera, for the first time. The agent that watches my recordings drafted this story from what I said on camera, and I finished it.

> [!summary]
> - A morning of writing before any agent ran paid for itself all afternoon.
> - At 13:20 I closed every session by accident. They were back within nine minutes.
> - The bottleneck is always human: plan more up front, approve less along the way.

## A morning of writing before the agents started

Before I handed anything to the agents, I spent the morning writing. The result was a charter: the goal, the ten demos and the rules every agent would follow. One job per session. One window where every question for me waits in line, one at a time. And if I don't answer within 15 minutes, the agent decides and writes down why.

> [!video] 6Ynpp621fmY
> The movie-actor rule: everything that needs me happens first

The rule I leaned on most is the movie-actor rule. A film flies its most expensive actor out and shoots all his scenes first, even out of story order, because his time costs the most. So anything that needs me (a recording, a judgment call, a list of questions) gets scheduled first. Once I've answered, the rest runs without me.

It felt slow. Right before noon the work felt really low leverage, and nothing was running yet. But I've worked with AI long enough to know what a sloppy start costs.

> [!quote]
> Mistakes cascade and they just snowball, and you really want to take the time to get it right, because time is no longer the bottleneck, because you can have 20 agents running side by side.
> Alex Alderman, on camera during the hackathon, 2 Nov 2026

## I changed too many things at once

Then I made it harder on myself. I'd never recorded myself before or built a website live with people watching, and I'd left my own harness (the tooling I normally wrap around the AI) behind for the desktop app I don't normally use. Insanity, insanity.

> [!video] pyFHE1JHMV8
> 12:56: too many new things at once

I also had a bad feeling about how the charter had started. In AI, when you get that feeling, it's almost always worth starting over. I decided it wasn't bad enough, and I didn't have time anyway.

Some of it worked straight away. Three agents wrote the tooling plans in parallel, and I loved that one-question window. But by 13:17 I was asking my own agents to bring me back to earth. I'd lost track of what was waiting on me.

## 13:20: I closed every session

Three minutes later came the worst moment of the day. I tried to close one background session I didn't need any more, and closed all seven that were running in that folder, including the one that runs my recording rig.

> [!video] S2NTaJHUmTM
> 13:21, a minute after I closed every session

My first words: "That's awesome. That is a disaster. Okay. Breathe. Water." Then I asked for every one of them back, and waited.

> [!quote]
> I'm gonna be patient. Hopefully it can spin up all the sessions that we're working and just resume, and this is just a 15 minute setback and not an hour and a half setback. AI is so fun.
> Alex Alderman, on camera during the hackathon, 2 Nov 2026

It wasn't even 15 minutes. Each session came back under its own name, with its full history and a note on where it had stopped: the first seven minutes after the click, the last two minutes later. About 90 seconds of work was lost, because every session saves as it goes.

Whatever the agents did was perfect, so I asked them to codify it as a skill (a saved procedure they can run again), so the next time is an instant fix. It was done eight minutes later.

## The plan starts paying for itself

The afternoon is where that morning of writing paid off. A finish line of 22 items, each one something a person could check, was signed off at 14:02. Seven research agents worked in parallel and reported back in 21 minutes. By 16:42 every demo had an agent on it. [Alex: the moment in the afternoon you were proudest of, in a sentence or two]

> [!quote]
> I'm really glad I made that decision earlier to take the extra time to put a really good charter document together, because that allows the assistants to work pretty competently without me.
> Alex Alderman, on camera during the hackathon, 2 Nov 2026

At one point an agent made a call without checking with me first. My reaction, on camera: "Oh, you're making decisions, are you? I told you to make decisions. That's fine." That's the charter working.

> [!video] MyYnFOQCagc 240 277
> Back from lunch: I could run this again tomorrow for a new company

Most of what got built is skills and workflows. I could do the same thing tomorrow for a new company, and the time would be cut in half. So would the stress. (I normally don't have this much adrenaline.)

## Everything waited on me, so I stopped everything

The same plan had a flaw I didn't see until it hurt: every plan asked for my approval. By 16:28 some things had been waiting on me for an hour and a half. "That's dumb," I said on camera. "Fine." In the hour before the stop, the question window logged 19 reminders.

At 16:44 I called it. Everything was a little bit off the rails, so I told my coordinating session to halt everything that was only waiting. It paused 15 sessions in 39 seconds.

Then we changed the rules:

- Easy calls belong to the agents, as long as they write down why.
- Plans no longer need my approval.
- Nobody stops to ask me about public information.

> [!quote]
> Please unstuck everything. If things are an easy judgment, please clear the plate for me. We can just make edits later.
> Alex Alderman, on camera during the hackathon, 2 Nov 2026

> [!video] FMYWlkGWdeY
> 16:58: the lesson, fourteen minutes after I stopped everything

At 16:58 I said the lesson out loud: **the bottleneck is always, always, always human.** I should have spent the day until two o'clock just writing exactly what I wanted for each thing, instead of getting asked every five minutes. I was drowning in requests.

The sessions restarted at 17:13. In the next half hour, what reached me changed. Instead of reminders, I got eight things only I can do: three sign-offs, four recordings and one choice.

## What I'd keep

This isn't how I'd work every day. It's a little, little, little too much. But it had hackathon energy, and it broke a lot of my habits.

> [!video] iXr-pKhseB8 124 166
> What worked, what overloaded, and what I'd build on next

Here's what I'd keep:

1. **Write the guiding documents first,** and better than feels necessary. I'd give mine a B plus. Maybe a B minus.
2. **Let the agents make the easy calls,** with a written reason for each one.
3. **Keep my sign-off for what needs my judgment,** not for every plan.

> [!quote]
> You can get a little bit more leverage if you really take the time to write good guiding documents.
> Alex Alderman, on camera during the hackathon, 2 Nov 2026

At 10:28 that morning I'd said that if I got 75% done, it would still be pretty good. [Alex: your closing line: what day two is for, or what you'd tell someone trying this on their own team]
