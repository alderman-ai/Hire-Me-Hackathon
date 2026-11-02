---
title: "How to refine AI slop into AI ops"
slug: "how-to-refine-ai-slop-into-ai-ops"
description: "Taste in writing is judgment, and a style guide can't hold it. Here's how I capture it for AI content ops, from a post's shape to the two emojis in its hook."
author: "Alex Alderman"
date: "2026-11-02"
status: "near-final"
kind: "showcase"
deliverable: "d7"
cover:
  kicker: "Subjective taste capture"
  subtitle: "How I capture writing taste for AI content ops, from the shape of a whole post down to its first two characters."
  accent: "AI ops"
tags: ["brand-voice", "content-ops", "linkedin"]
reading_minutes: 6
---
<!-- Showcase adapted from Alex's taste-capture demo (alderman-ai/subjective-taste-capture-demo, MIT) into the site's Addvery look. Figures: posts/assets/how-to-refine-ai-slop-into-ai-ops/; working files: local/taste/. -->

Here's a real LinkedIn hook of mine, with its first two characters swapped for question marks.

> [!figure] /demos-assets/how-to-refine-ai-slop-into-ai-ops/road-to-hell-post.png
> Alex's LinkedIn hook with its first two characters hidden: the road to hell is paved with good intentions, and the road to a useless KB is 70% accuracy
> The hook as posted, with its two opening emojis hidden

Three emoji pairs could fill the gap. Which one would you ship? Keep your answer: I'll go through all three at the end, with my reasoning.

> [!figure] /demos-assets/how-to-refine-ai-slop-into-ai-ops/road-to-hell-options.png
> Three answer cards: A is a car then fire, B is fire then a car, C is a motorway then fire
> The three candidates. One ships.

> [!quote]
> Not a prompt. Not a style guide gathering dust. Taste gets captured the way it actually exists, as judgment, through different vectors of refinement.
> Alex Alderman, in his taste-capture demo, 2026

Here are four of those vectors. The first one doesn't need a single word.

> [!summary]
> - Taste is judgment, so I capture it through vectors of refinement, not a prompt or a style guide.
> - Shape: redact every word, and your eye still knows which post belongs to your brand.
> - Craft: a full rewrite, with its reasoning attached, holds what no style guide has managed to hold.
> - Hook-first: most hard-fail disqualifiers happen in the hook, so I build the hook first, separately.
> - Rendering: the last mile of taste is smaller than a word.

## Judge the silhouette

Every word redacted. Text becomes grey bars, bold becomes violet, emojis become dots. What's left is the post's shape, and your eye already knows which one belongs to your brand.

It's the squint test, made mechanical. Here are three pairs. Pick a side before you read the caption under each one.

> [!figure] /demos-assets/how-to-refine-ai-slop-into-ai-ops/silhouettes-pair-1.svg
> Two redacted post shapes: A is a dense block of long lines from the first word, B has a short hook, blank lines and short lines marked with emoji dots
> Pair 1: B ships. Its hook has room and its body has air; A is one dense block from the first line.

> [!figure] /demos-assets/how-to-refine-ai-slop-into-ai-ops/silhouettes-pair-2.svg
> Two redacted post shapes: A breaks its hook into short lines, B's bold first line runs past the edge and leaves one word alone on line two
> Pair 2: A ships. Its hook lines break on purpose; in B the bold runs past the wrap and strands one word.

> [!figure] /demos-assets/how-to-refine-ai-slop-into-ai-ops/silhouettes-pair-3.svg
> Two redacted post shapes: A has bold and emoji on almost every line with three emojis in the hook, B uses bold twice and emoji twice
> Pair 3: B ships. Bold and emoji are rationed; A spends its emphasis budget everywhere, three emojis in the hook.

In the interactive version of this demo, every tap gets logged as a signal: hook balance, density relief, line wrap, deliberate break, emphasis budget. It's sub-second, with zero words read. Your tap is the data.

## One post, before and after

The second vector is the grunt work. It means taking agentic output and rewriting it entirely, with extensive notes on every call I make.

- **The machine draft, competent:** The QA step everyone skips **isn't before you publish**. It's two weeks after. The ten-minute audit that found four problems in one client's pipeline ⤵️
- **My rewrite, on-brand:** 🔎 Agentic workflows **having QA loops are no longer "nice to have"**. In 2026 they're non-negotiable. But not all QA is created equal. Here's how to go from intermediate to advanced 👇

Every place where judgment intervened carries an editor's note. Three of them:

- **On the bold.** Word order rewritten so every bolded string can stand alone as a clause. Skimmers never read the unbolded remainder.
- **On the emoji.** ⤵️ was swapped for 👇 so the hook's two emojis don't color-match. Contrast and harmony beat uniformity, almost every time.
- **On a dialogue scene in the draft.** The me/them scene is one rare instrument, not a default move. It was being generated far above my real usage rate, so its weight was turned down.

This is the part of taste no style guide has ever managed to hold. Even accepted copy carries its critique.

## My hook-first approach

You're an agency owner, so I won't give you Hooks 101. But for automated content ops it matters that most of the hard-fail, binary, "no way can we post this" disqualifiers happen in the hook. So I build the hook first, separately, to not fill your pipeline with dead bodies.

Take the draft's hook above. The critique had two points. Its lines sit right at the wrap threshold, with no buffer, and the unicode bold LinkedIn needs renders wider. And it's 100% ambiguous about who should click, because lots of fields have QA.

### The curiosity catalogue

The refined hook is my rewrite above. Four phrases in it are marked, and each one is a different ICP, already leaning in. One hook, four reasons to click:

- **having QA loops:** Wait... what does QA loop even mean?
- **no longer "nice to have":** Does that mean this is common practice? Uh oh.
- **But not all QA is created equal:** We have QA loops, I think. Is there a better way?
- **intermediate to advanced:** I think we're advanced. Let me make sure...

### The click-bait guard

A hook-first pipeline has one structural risk: click-bait. The hook sets up an expected payoff, and the body must deliver it, or the flywheel breaks.

> [!diagram] flow
> The flywheel every hook has to protect
> 1. Curiosity
> 2. Click
> 3. Payoff
> 4. Satisfaction
> 5. Click next time

The curiosity catalogue is the contract. Every reason someone might click is written down before the body exists, so the body is written to pay each one off.

## Two emojis, three decisions

Back to the road to hell. The last mile of taste is smaller than a word, and that hook's first two characters took three decisions.

> [!quote]
> A machine optimizes for semantic correctness. A human optimizes for what the eye resolves at skim speed.
> Alex Alderman, in his taste-capture demo, 2026

**C, 🛣️🔥, is the agent's pick.** It's semantically perfect: literally "road to fire". But 🛣️ doesn't render as a road at human skim speed, and it's almost never used, so it reads as noise. Correct, and wrong.

**A, 🚗🔥, is so close.** A car is instantly a road, cleaner and faster than the road emoji itself. For an agent, the road to hell is linear: road first, hell second.

But look at how the car renders: it points left. Car first means driving away from the fire. The road to hell just reversed.

**B, 🔥🚗, ships.** Fire on the left, the left-facing car driving into it. Rendering, direction and meaning all agree, at skim speed, with zero reading.

None of this is in any style guide. All of it was in my head, until it was extracted.

## Every vector feeds the rubric

Only once the body is written does the full grading rubric run. Yes, sometimes posts still fail here! But then the model gets told why, the post gets rewritten or critiqued, and with every update the rubric earns more of your trust.

The rubric grades on four levels: unpostable, postable, good and great. Most clients are perfectly fine with postable. For a marketing agency, good is the floor. Some pieces of the earlier stages are public in [my taste-capture repo on GitHub](https://github.com/alderman-ai/subjective-taste-capture-demo).

Press play, get posts, approve posts, schedule them, plot escape. (Oh, sorry. That's your future agentic content pipeline, not you.)

No more choosing AI efficiency vs brand voice. Now, you get both.
