---
title: "My AI sabbatical: why spec writing is copywriting 2.0"
slug: "ai-portfolio"
description: "A former copywriter who can't write Python explains the method he built for AI agents: questions first, every call logged, a public repo under each claim."
author: "Alex Alderman"
date: "2026-11-02"
status: "draft"
kind: "showcase"
cover:
  kicker: "AI portfolio"
  subtitle: "What my AI sabbatical taught me about writing specs agents can run, with the public repo under each claim."
  accent: "copywriting 2.0"
tags: ["executable-specs", "ai-agents", "portfolio"]
reading_minutes: 10
---

Spec writing is copywriting 2.0. I used to be a copywriter, and the job I care about now is the same job with a different reader: write a document clear enough that an AI agent can do the work from it, with my judgment already inside.

> [!quote]
> The progress of learning AI is not the files you have in your computer. It's the clarity of understanding of how all this stuff works and how it works best ... so it's not the cluster of Markdown files on your computer, it's clarity.
> Alex Alderman, on camera during the hackathon, 2 Nov 2026

That idea runs through my AI sabbatical: [Alex: nine months, as on camera, or six, as elsewhere? Add an hours figure if you want one; none is sourced] of nothing but building in Claude Code, to learn the GTM engineer job from a marketing background.

The method I built along the way became my passion project. Here's how it grew, with the proof under each step, including the parts that didn't work.

> [!summary]
> - I write executable specs: documents an AI agent fills in and runs, with my judgment applied before work starts.
> - The agent asks its questions inside the spec first, then logs every solo call with what reversing it breaks.
> - I can't write Python, so my scripts get plain-English Markdown twins I can read and test.

## The first full run on a real brief

My first full run on a real brief was in late July: a bilingual fundraising campaign for a Prague church's new building, with an email, a brochure and a landing page. [Alex: call this non-commercial? The repo doesn't say either way] I wrote one spec, and Claude produced the whole campaign in one unattended overnight run, "a single shot dynamic workflow with no human in the loop," as the spec puts it.

So the judgment had to go in first. A pre-flight pass caught a dead deploy token, an unconnected design tool and seven ambiguities. I answered eight questions up front, and the agent logged 12 judgment calls of its own, flagging the one it couldn't settle for me.

**Proof:** cb6-prayer-project: the spec. Intent, answers, logged calls and the definition of done in one document. [Alex: CB6 repo link held until you decide on the repo's clean-up. Link it, or keep it unlinked?]

The checks did their job. The spec had the agent test skill-guided copy against a plain prompt chain, and the plain chain lost because it "fabricated a deductibility inducement and two fund-handling claims." The final copy says US gifts aren't tax-deductible, per the research.

**Proof:** cb6-prayer-project: the US tax research. What the final copy follows, after the invented tax claim was thrown out.

The published review doesn't go easy: no money path, no failure ceiling on the loops, requirements buried in prose, and then an independent agent's attack on the review itself. Its last word keeps me honest: "Nothing was sent; the primary (US) audience still has no giving mechanism."

**Proof:** cb6-prayer-project: the methodology review. Praise, criticism and an independent meta-critique, in the open.

So there's no outcome to claim. The campaign was never sent or measured. (I've improved in verification methods and token efficiency since.)

## Four days in a sandbox

In mid-August I gave myself four days in a practice repo and one hard rule: "Most of all, I should be forced to solve problems with minimal reliance on prose." Anything that broke had to be fixed with a mechanism that enforces itself instead of another paragraph. I themed it on Factorio, the factory game, where launching the rocket stood for my real goal: a pipeline that turns an idea into executable specs.

The lesson that stuck came on day three, when I stopped building forward and wrote: "Ok, let's work backwards. dod is human moves ore from crate to ship. Let's write that first."

I wrote out the whole path to it, including a jam I planned on purpose, and a note to myself: "I'm not learning a scripting language but I will make the verification deterministic, not prose." Honestly, that definition of done was never achieved. No ore moved, and the repo records the demo's own check failing one of its rules.

**Proof:** [Factor-AI: the definition of done, worked backwards](https://github.com/alderman-ai/Factor-AI/blob/main/_THE%20SHIP/Distress%20Beacon/Captains%20Log%20Entries/Demos/Demo-001-day-001.md#fully-path-to-dod-articulated). A checkable end state written first, then every step to it, in a timestamped log.

The mechanism was a check that can fail. Whether a piece of ore really came from the right place becomes one route string that has to equal an expected string, so nobody argues about it in prose.

**Proof:** [Factor-AI: "done" as one string](https://github.com/alderman-ai/Factor-AI/blob/main/DEMO_001_Ore-Power/Demo%20Ship/DEMO-001-ORE%20%28correct%20pathing%29.md). Route fields for each hop and the expected check string; it's the hand-written answer, not a passing run.

That repo is not optimized for external legibility, and it looks insane, I know -- but as I see it, those four days inspired the next three to four months of building. [Alex: Factor-AI links limited to the two files you already share; link more, or keep these two?]

## The method: questions first, every call logged

A few days later I ran the method on a real job, building tools that turn my website's pages into editable Markdown and back, and published the whole spec. Most frontier executable-spec research is about code, where tests can check the output; as the README says, "My research is on doing the same with knowledge work."

> [!diagram] flow
> One spec's life cycle, as the repo saves it (the first two saves merged)
> 1. Draft: My problem, scope and resources, by hand
> 2. Pre-flight Q&A: The agent asks; I answer before work starts
> 3. Definition of done: Each box names the evidence that proves it
> 4. Methodology: The how, written to meet that definition
> 5. Coherency check: Will this method meet that definition?
> 6. Completion: Work done, boxes ticked, solo calls logged

The README admits where the habit came from: "Because I used to be a copywriter, it felt oddly normal to spend 3-6 hours manually writing a document on how to execute something." My super rough benchmark is that it works best when I know about 50 to 75% of the "how" at the start. When I know less, my micromanagement makes things worse.

**Proof:** [knowledge-work-executable-spec-research: all seven stages](https://github.com/alderman-ai/knowledge-work-executable-spec-research/tree/main). The same spec at every gate, from a 140-line draft to a 732-line executed record.

### Questions before work

Before any work starts, the agent asks its questions inside the document, each with evidence, lettered options and a recommendation, and I answer in a line. One caught that "single shot" deploying would break the project's own gate on production deploys, so I chose a preview deployment. Another caught that my brief could mean any URL on the internet, which would make "100% deterministic" impossible.

**Proof:** [The pre-flight Q&A](https://github.com/alderman-ai/knowledge-work-executable-spec-research/blob/main/07%20-%20completion.md#pre-flight-qa). Four questions, each ending in a recommendation, with my short answers underneath.

Then the definition of done goes in before the method: 24 boxes, each naming its evidence. The spec's own rule: "Written early, ticked late: a box ticked before execution is a lie."

**Proof:** [The definition of done](https://github.com/alderman-ai/knowledge-work-executable-spec-research/blob/main/07%20-%20completion.md#dod). 24 outcomes tied to named evidence, fixed before the methodology was written.

### Every call, with what reversing it breaks

Every call the agent makes on its own goes in a decision log with its source, its reasoning and a line that starts with "Reverse this and" and says what breaks if I overrule it. One reads: "Reverse this and either 5.3 or 5.2 fails by construction."

**Proof:** [The decision log](https://github.com/alderman-ai/knowledge-work-executable-spec-research/blob/main/07%20-%20completion.md#assistant-decisions). Eleven logged decisions, each with a bold "Reverse this and" line.

I know a large % of this is common practice, but I think the judgment calls surfaced before execution -- and agent decisions logged with what reversing them would affect -- both had a disproportionately positive impact. One caveat: the agent ticked all 24 boxes, but my own "Spec is complete" box is still unticked, and the evidence files aren't in the repo, so the results are as the agent recorded them.

## Showing it live: brand as code, words by AI

In September I took the idea on stage. For a public AI marketing meetup I built a demo where an agent turns a name, a few lines of text and two pictures into a finished, branded LinkedIn speaker card. The README says it ran live in front of roughly 200 marketers.

A language model gives a different answer every time and a brand needs the same result every time, so the layout is written once as code and lands on the same pixel every run. The AI writes the words, and every line has to pass a hard character limit before it touches the layout.

**Proof:** [pixel-perfect-branded-assets-demo: why brand assets need code](https://github.com/alderman-ai/pixel-perfect-branded-assets-demo/blob/main/demo-and-more-help/probabilistic-vs-deterministic/INDEX.md). The idea in ten sentences, with the real character limits.

The repo is built for agents first. Its `CLAUDE.md` is one line pointing to `AGENTS.md`, which calls itself the whole map: a menu, voice rules, a git branch per visitor and the instruction "Do not invent claims beyond what the pages say." There are no scripts; the AI assistant is the engine.

**Proof:** [pixel-perfect-branded-assets-demo: AGENTS.md](https://github.com/alderman-ai/pixel-perfect-branded-assets-demo/blob/main/AGENTS.md). One instruction file any agent follows, and no scripts in the repo.

The repo documents the stage design: five page states deployed ahead of time and promoted on a 20-second loop, and one dictated name fanned out to four parallel agents with a fallback card ready. I ran the whole show from my phone, remote-controlling my machine at home and dictating the commands. The repo doesn't document that part, so you'll have to take my word for it.

**Proof:** [pixel-perfect-branded-assets-demo: the live demo](https://github.com/alderman-ai/pixel-perfect-branded-assets-demo/blob/main/demo-and-more-help/how-this-was-built/the-live-demo.md). Pre-built checkpoints promoted on a timer, and one name fanned out to four builds.

## Building without writing code

I can't read or write Python. I live 50/50 in the terminal and Obsidian, so my scripts get Markdown twins I call operator lenses, which make them visible to my tech stack.

A lens says why its script exists, what it does in plain steps, how to test it and switch it off, and the signs it's working or not. I check behavior, not syntax, and writing one lens found a silent bug: a date filter made the script report zero new rule lines when the real count was eight.

**Proof:** cb6-prayer-project: an operator lens. A plain-English stand-in for one Python check, kept in the church campaign's repo as an example. [Alex: in the CB6 repo, so unlinked under the same hold]

I honestly still don't know the right answer between investing more time in learning to code, or in adapting in ways like this. One of my spiciest takes is that skilled AI practitioners mostly come from three tribes: academics, former devs and marketers.

> [!quote]
> Then you have the former devs who got into AI from coding ... they know how to read code and write code. Turned out that's pretty useful for this kind of stuff ... a little bit less required than them or the academics would believe ... but still more required than the marketers out there think.
> Alex Alderman, on camera during the hackathon, 2 Nov 2026

I'm in the third tribe. We start with a lot of weaknesses, but we bring a very fresh perspective on what's possible.

## What I'm building now

What interests me most now is async human in the loop. As the spec repo's README puts it, "I'm still 'in the loop' as in my judgement is still being applied, it's just happening separately from the execution phase." I'm currently tackling how to lower the friction of clearly and thoroughly clarifying intent.

My rule for it comes from film sets.

> [!quote]
> Think of it like ... the expensive movie actor. They fly him out to the scene, they shoot all of his scenes first, even if it's not in chronological order of the movie, because his time is the most expensive, right?
> Alex Alderman, on camera during the hackathon, 2 Nov 2026

So anything that needs me, whether that's a recording, a judgment call or a list of questions, gets surfaced at the start. Once I've answered, everything else should run without me.

> [!quote]
> Time is no longer the bottleneck because you can have 20 agents running side by side, right? So the bottleneck is focus ... the bottleneck is judgment, discernment. That's why I'm trying to put all the stuff that needs me early on.
> Alex Alderman, on camera during the hackathon, 2 Nov 2026

This site is the current test. It came out of a one-day hackathon I ran on camera: a charter on top holds the definition of done for the whole project, and each piece of work gets its own executable spec, run by one orchestrator session that hands off to sub-agents. One session's only job is turning anything blocked on me into a Markdown file I edit in Obsidian.

Taking the extra time on the charter is what let the assistants work pretty competently without me. The other lesson of the day is that humans have RAM too. Either I offload more to the AI, or I keep the pace down.

Where this goes next is GTM engineering. I'm trying to enter a new field at almost 40, feeling like a weird mix of junior and senior, with everything changing with AI on top. What I want now is to take what I've learned in theory to a real company, point it at a real pipeline and get the satisfaction of making numbers go up.

### How this post was made

An AI agent drafted this post from Alex's public repos, his words on camera and his notes, with a copywriting skill turned on, and checked it against the site's post format. Alex finishes it and signs it off.
