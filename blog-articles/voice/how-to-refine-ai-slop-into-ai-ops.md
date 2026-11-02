---
title: "How to refine AI slop into AI ops"
summary: "Taste is judgment, not a style guide. Here's how I capture it for AI content, from a post's silhouette down to its first two emojis."
read_minutes: 5
sources:
  - "blog-articles/posts/03-how-to-refine-ai-slop-into-ai-ops.md (near-final, voice-passed; figures unchanged)"
  - "blog-articles/local/taste/source/refinement-vectors-demo.source.html (his public demo, text and editor's notes)"
  - "scraping/site/linkedin-wall/wall-full.json (his post of 7 Oct 2026, 'too much pride for slop')"
grade: "Good"
failed_ids: "SRC-36"
attempts: 3
attempt_used: 3
alex_markers: 1
run_log: ".claude/skills/alex-voice/local/runs/2026-11-02-04-ai-slop-to-ai-ops/log.md (git-ignored)"
status: "voice pass, not published"
note: "Open for Alex: whether 'AI ops' could be misread as AIOps. Pre-flight flags 9 emojis (EMOJ-43); all are inside the LinkedIn exhibits and the emoji options the piece is about. Summary box dropped for length."
---
Here's a real LinkedIn hook of mine, with its first two characters swapped for question marks.

> [!figure] /demos-assets/how-to-refine-ai-slop-into-ai-ops/road-to-hell-post.png
> A LinkedIn hook of mine with its first two characters hidden: the road to hell is paved with good intentions, and the road to a useless KB is 70% accuracy
> The hook as posted, with its two opening emojis hidden

Three emoji pairs could fill the gap. Which one would you ship? Hold that thought. I'll come back to it at the end.

> [!figure] /demos-assets/how-to-refine-ai-slop-into-ai-ops/road-to-hell-options.png
> Three answer cards: A is a car then fire, B is fire then a car, C is a motorway then fire
> The three candidates. One ships.

> [!quote]
> Not a prompt. Not a style guide gathering dust. Taste gets captured the way it actually exists, as judgment, through different vectors of refinement.
> Alex Alderman, in his taste-capture demo, 2026

I have too much pride for slop, so if AI writes in a brand's name, it has to be built right. **Taste is judgment,** and here are four ways I capture it. The first one doesn't need a single word.

## Judge the silhouette

Every word redacted. Text becomes bars, bold becomes a colored bar, emojis become dots. What's left is the post's shape, and your eye already knows which one belongs to your brand.

It's the squint test, made mechanical. Pick a side in each pair before you read the caption.

> [!figure] /demos-assets/how-to-refine-ai-slop-into-ai-ops/silhouettes-pair-1.svg
> Two redacted post shapes: A is one dense block, B has a short hook, blank lines and emoji dots
> Pair 1: B ships. Room in the hook, air in the body.

> [!figure] /demos-assets/how-to-refine-ai-slop-into-ai-ops/silhouettes-pair-2.svg
> Two redacted post shapes: A breaks its hook into short lines, B's bold line wraps and strands one word
> Pair 2: A ships. Its hook breaks on purpose; B's bold strands a word.

> [!figure] /demos-assets/how-to-refine-ai-slop-into-ai-ops/silhouettes-pair-3.svg
> Two redacted post shapes: A has bold and emoji on almost every line, B uses each twice
> Pair 3: B ships. A spends its emphasis budget everywhere.

In the interactive version, each tap gets logged as a signal, like hook balance or emphasis budget. Zero words read. Your tap is the data.

## One post, before and after

The second vector is the grunt work: rewriting agentic output entirely, with notes on every call I make.

- *The machine draft, competent:* The QA step everyone skips **isn't before you publish**. It's two weeks after. The ten-minute audit that found four problems in one client's pipeline ⤵️
- *My rewrite, on-brand:* 🔎 Agentic workflows **having QA loops are no longer "nice to have"**. In 2026 they're non-negotiable. But not all QA is created equal. Here's how to go from intermediate to advanced 👇

Every place my judgment stepped in gets an editor's note. Three of them:

- *On the bold.* Word order rewritten so every bolded string can stand alone as a clause. Skimmers never read the unbolded rest.
- *On the emoji.* ⤵️ was swapped for 👇 so the hook's two emojis don't color-match. Contrast and harmony beat uniformity, almost every time.
- *On the dialogue.* The me/them scene is one rare instrument, not a default move. It was being generated far above my real usage rate, so its weight got turned down.

My favorite note is on the rewrite's ending: slightly awkward, but its last line pulls the post back to techno-optimism, which is on-brand. Kept, and flagged. **Even accepted copy carries its critique.**

## Build the hook first

You're an agency owner, so I won't give you Hooks 101. But for automated content ops it matters that most of the hard-fail, binary, "no way can we post this" disqualifiers happen in the hook. **So I build the hook first,** separately, to not fill your pipeline with dead bodies.

The machine draft's hook failed two ways. Its lines sit right at the wrap threshold, with no buffer for unicode bold, which renders wider. And it's 100% ambiguous about who should click. Lots of fields have QA.

### The curiosity catalogue

My rewrite above is the refined hook. Four phrases in it each pull in a different ICP (ideal customer profile). One hook, four reasons to click:

- "having QA loops": Wait... what does QA loop even mean?
- "no longer nice to have": Does that mean this is common practice? Uh oh.
- "But not all QA is created equal": We have QA loops, I think. Is there a better way?
- "intermediate to advanced": I think we're advanced. Let me make sure...

### The click-bait guard

A hook-first pipeline has one structural risk: click-bait. The hook sets up a payoff, and the body has to deliver it, or the flywheel breaks.

> [!diagram] flow
> The flywheel every hook has to protect
> 1. Curiosity
> 2. Click
> 3. Payoff
> 4. Satisfaction
> 5. Click next time

The curiosity catalogue is the contract: every reason to click gets written down before the body exists, so the body pays each one off.

## Two emojis, three decisions

Back to the road to hell. The last mile of taste is smaller than a word.

> [!quote]
> A machine optimizes for semantic correctness. A human optimizes for what the eye resolves at skim speed.
> Alex Alderman, in his taste-capture demo, 2026

**C, 🛣️🔥, is the agent's pick.** It's semantically perfect: literally "road to fire". But the motorway emoji doesn't render as a road at skim speed, and it's almost never used, so it reads as noise. Correct, and wrong.

**A, 🚗🔥, is so close.** A car is instantly a road, cleaner and faster than the road emoji itself. But look at how the car renders: it points left. Car first means driving away from the fire. The road to hell just reversed.

**B, 🔥🚗, ships.** Fire on the left, the left-facing car driving into it. Rendering, direction and meaning all agree, at skim speed, with zero reading.

None of this is in any style guide. All of it was in my head, until it was extracted.

## Every vector feeds the rubric

Only once the body is written does the full grading rubric run. Yes, sometimes posts still fail there! Then the model gets told why, the post gets rewritten, and with every update the rubric earns more of your trust.

It grades on four levels: unpostable, postable, good and great. Most clients are perfectly fine with postable. For a marketing agency, good is the floor. Some pieces of the earlier stages are public in [my taste-capture repo on GitHub](https://github.com/alderman-ai/subjective-taste-capture-demo). [Alex: keep or drop the link to the repo]

No more choosing between AI efficiency and brand voice. Now you get both.

Press play, get posts, approve posts, schedule them, plot escape. (Oh, sorry. That's your future agentic content pipeline, not you.)
