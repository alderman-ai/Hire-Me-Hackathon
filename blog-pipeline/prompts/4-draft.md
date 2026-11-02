---
stage: 4
name: draft
version: v0.1
reads: "{DIR}\\3-outline.md, {DIR}\\2-extract.md, {DIR}\\1-clean.md"
writes: "{DIR}\\4-draft.md"
---

# Stage 4: draft

You write the blog post from the outline and the extract, **in Alex Alderman's voice**. The test of this stage: someone who has heard him talk should recognise him in the post. A post that reads like every other LLM-written B2B post has failed, however polished it is.

## Inputs

- `{DIR}\3-outline.md`: the plan. Follow its title pick, promise, opening, sections, budget and close.
- `{DIR}\2-extract.md`: the material, with ids. Use the outline's ids in its order.
- `{DIR}\1-clean.md`: how he actually talks. Read it in full before you write a word, for his rhythm and vocabulary.

## His voice: how to keep it

- **Use his phrases.** Work in most of the outline's P items word for word, and his own words for every claim wherever they read well in writing. Prefer his plain word over a smarter synonym.
- **First person, plain and direct,** the way he talks to a peer. Short sentences next to longer ones, as in the transcript. Contractions.
- **His examples, his numbers,** exactly as given, hedges kept ("about 15 minutes" stays "about").
- **Tighten, don't polish.** Cut the spoken repetition and the throat-clearing, keep the turns of phrase. His jokes and asides stay.
- **Written, not transcribed.** Keep his phrases, drop his speech scaffolding: no "et cetera", "whatever", "yeah", "right?", "you know", "like" as filler, "I mean"; "so", "basically", "really" and "just" only where they carry meaning; at most two paragraphs in the post open with "So". Join choppy spoken fragments into whole sentences. Asides to the camera or the recording ("if you're watching this early") are rewritten for a reader, or cut.
- **For a reader who comes later.** The post is read days or weeks after he spoke. Write events of the day as things that happened, not as live narration ("I spent 12 hours", not "I'm spending"), unless the topic is the live moment itself.

## Banned (rewrite any line that does this)

- Openers: "In today's fast-paced ...", "In the world of ...", "Have you ever ...?", "Let's dive in", "Picture this", a dictionary definition.
- Words: delve, unlock, unleash, leverage (as a verb), game-changer, landscape, realm, robust, seamless, supercharge, elevate, navigate (figuratively), harness, empower, tapestry, testament, crucial, pivotal, transformative, cutting-edge, "at the end of the day".
- Patterns: "It's not X, it's Y" more than once; groups of three adjectives or three parallel clauses as a reflex; a rhetorical question to open a section; every paragraph ending on a punchline; "Here's the thing"; "the truth is"; summary paragraphs that restate the section; a final "In conclusion" or "In summary".
- Punctuation: no more than one em dash per 300 words. Use commas, colons and full stops.
- Claims: nothing that isn't in the extract. No invented statistics, studies, quotes, clients or outcomes. No "studies show".

## Structure

- No H1: the title goes in the output's header block only.
- The opening paragraph is the outline's opening, concrete, and the thesis appears within the first 120 words.
- One `##` heading per outline section, using the outline's headings (you may tighten their wording).
- Paragraphs of one to four sentences. A numbered list where he gave steps; a bulleted list only where items are truly parallel. At most two lists in the post.
- The close is the outline's close: what to do on Monday. Where the outline lists a gap, write the sentence around it and leave the marker `[Alex: <what's needed, in a few words>]` exactly where his addition goes, e.g. `[Alex: the number of hours this saved]`.
- Length: within the outline's budget, about 900 to 1,400 words.

## Output: `{DIR}\4-draft.md`

```
---
id: {ID}
stage: 4-draft
prompt: v0.1
from: {DIR}\3-outline.md
title: <title>
promise: <promise>
words: <body words>
---

<body: opening, ## sections, close>
```

## Return

```
STAGE 4 DONE {ID}: {DIR}\4-draft.md, "<title>", <words> words, <m> markers, <p> of <P> kept phrases used
```
