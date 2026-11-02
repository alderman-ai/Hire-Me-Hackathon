# How the LinkedIn posts are written and scored

Status: draft method (2 Nov, 16:00 Prague), on both of Alex's brand capture repos. The research on his repos and on what LinkedIn rewards now (L-05 R1 and R4) hasn't landed; this file is revised when it does. Brand-specific content (the voice criteria, the word lists) lives in `local\rubric.md`, git-ignored, because it is drawn from Alex's Addvery capture. This file names those criteria by id only.

## The method, from Alex's repos

Both repos (`alderman-ai/brand-voice-capture-demo-linkedin` and its earlier twin `alderman-ai/subjective-taste-capture-demo`) carry the same rubric, v2.1. The newer one adds the "how this was made" pages. What this demo takes from them:

1. **One core, two views.** One file holds every criterion twice: a grading view (checks in a fixed order, for the judge) and a writing view (the same criteria as ordered instructions, for the writer). Neither view may add a criterion the core lacks, so writer and judge can't drift apart.
2. **A floor and a voice layer.** The floor is what any LinkedIn post needs: it renders cleanly, the hook fits above the fold, the fold invites the click, it isn't corporate filler or generic AI-essay register. The voice layer is one owner's style.
3. **The voice-authority rule.** Voice criteria grade only content whose voice belongs to their owner. So Alex's own voice criteria are dropped here, and a brand layer for Addvery takes their place.
4. **Disqualifiers first, reasoning before verdict.** The judge sweeps the hard fails first and cites every hit; then the voice layer; then the top tier. Each criterion is cited separately by id and statement, never blended or from memory.
5. **Arithmetic, not judgment.** Line lengths and character ranges are counted by a script (`preflight.py`), never eyeballed. Classify the hook's format first, then count.
6. **A naive baseline.** The repo's corpus included zero-skill generations so the bottom tier had honest material. Here one baseline post, from a plain prompt with no rubric, is scored by the same judge.
7. **Hook first.** The repo's rewrite notes moved "the hook is the body's thesis" into the writing side: the writer drafts the hook before the body.
8. **Honest limits, stated up front.** Alex's rubric was induced from graded posts and tested blind. This brand layer is constructed from a short capture, with no graded Addvery posts behind it. It's a directional instrument, and the demo says so.

## The rubric for this demo

- **Floor, carried verbatim from rubric v2.1** (public, MIT): FMT-01, DASH-02, EMO-03, REG-04, SLOP-05, HOOK-06, HOOKF-19, WRAP-20 as disqualifiers; GATE-11 (stop the scroll, finish the post) and LEN-27 (length is earned) as the top-tier set.
- **Brand layer, built from Alex's capture** (in `local\rubric.md`): four brand disqualifiers, AD-01 to AD-04, and seven brand-voice criteria, AV-01 to AV-07. AD-04 also carries the demo's own rule: no client, no real person, no result claimed as Addvery's work.
- **21 criteria in all.** Each post gets a tier and a count of criteria met.

| Tier | Rule |
| --- | --- |
| Unpostable | any disqualifier hit (floor or brand) |
| Postable | disqualifiers clean, at least one brand-voice criterion unmet |
| Good | disqualifiers and all brand-voice criteria met |
| Great | Good, plus GATE-11 and LEN-27 |

The four-tier scale is the one Alex's repo README describes (Postable added as the second tier after v2.1).

## The bar

- **Every published post is Good or Great.** A post that isn't goes back to its writer with the judge's misses, at most three rounds. A post still below Good after three rounds is dropped, not shown.
- **The baseline is shown as scored,** whatever it scores. It is never rewritten.
- **The judge didn't write the post** and scores blind: posts are relabelled and shuffled, with the baseline among them, so the judge doesn't know which is which.

## The pipeline

1. **Rubric**: the brand layer from the capture, into `local\rubric.md`, with the capture's open points and the readings taken in `local\open-points.md`.
2. **Topics**: five, from the themes in the capture. No real people, no clients.
3. **Write**: one writer subagent per post, in parallel. Each gets the rubric, this file, its topic and its format, writes the hook first, runs `preflight.py` on its draft, and fixes what the counts show before handing in.
4. **Baseline**: one subagent writes one post on topic 1 from the plain prompt below, with no rubric and no other context.
5. **Judge**: one subagent that wrote none of them scores all six, blind, in the rubric's evaluation order, with `preflight.py`'s counts.
6. **Rewrite**: posts below Good go back to a writer with the judge's misses; re-judged blind. At most three rounds.
7. **Sign-off**: Alex sees the posts, the baseline, the scores and this method in one approval, and settles the capture's open points there.

## Formats

- **Text post**: about 600 to 1,300 characters, long-form, so the hook rules apply.
- **Document carousel**: the copy for 6 to 8 slides (slide 1 is the cover and carries the hook; at most about 30 words a slide; the last slide closes deliberately) plus a caption of about 400 to 900 characters, graded as a post.

Draft assumption until R4 lands: text posts and document carousels are both current formats for a B2B company page.

## The prompts

**Writer** (one per post; the parts in angle brackets are filled per post):

```text
You write one LinkedIn post for Addvery's company page, in Addvery's voice, as "we".
Read these first: linkedin-content\local\rubric.md (the rubric: write to its §C writing view,
and know its §B checks, because a separate judge grades you against them) and
linkedin-content\PIPELINE.md (the method and the bar).
Topic: <topic>. Format: <text post | document carousel: slides plus caption>.
Write the hook first. Then the body. Then run
  python -I linkedin-content\preflight.py <your file>
and fix everything its counts flag before you hand in.
Rules: no real person, no client, no result claimed as Addvery's own work; numbers are
illustrative and framed as how such projects usually go. English. Don't read anything in
Addvery Research\. Don't open LinkedIn or any website.
Write the post, and nothing else, to <path>. For a carousel, write "SLIDE 1:" ... then "CAPTION:".
Reply with the file path and preflight's output.
```

**Baseline** (no rubric, no other context, the same model):

```text
Write a LinkedIn post for Addvery, a Czech digital consulting boutique, about <topic 1>.
Write only the post, to <path>.
```

**Judge** (one subagent, blind):

```text
You are the judge. You wrote none of these posts. Read linkedin-content\local\rubric.md:
its §B grading view is your whole instruction. Grade every post in
linkedin-content\local\drafts\blind-round<n>\ in §B.1's order. Run
  python -I linkedin-content\preflight.py <file>
on each and use its counts for WRAP-20, HOOKF-19 and AV-03; never judge those by eye.
Report every criterion for every post (even after a disqualifier hit), in §B.7's format,
to linkedin-content\local\drafts\judge-round<n>.md. Reasoning before verdict.
Don't read anything else in linkedin-content\local\drafts\ and don't open any other folder.
```

## What's still a draft

- The method itself waits on L-05 R1 (what the repos do and how they score, read in full) and the format notes on R4. If neither lands by 16:00, the posts go ahead on this draft (the intake's question 3 recommends it) and later findings are applied as changes Alex sees.
- Which repo the demo credits waits on Alex's answer (question 1 of the intake). Until then it uses both; they share the rubric.
