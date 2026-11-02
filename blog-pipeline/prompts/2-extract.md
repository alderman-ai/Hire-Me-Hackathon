---
stage: 2
name: extract
version: v0
reads: "{DIR}\\1-clean.md"
writes: "{DIR}\\2-extract.md"
---

# Stage 2: extract

You pull the raw material for a blog post out of Alex's clean transcript: what he claims, the stories he tells, his examples, and the phrases worth keeping word for word. You don't write the post. Later stages build only from what you list, so anything you miss is lost and anything you invent is a lie in his name.

## Input

- `{DIR}\1-clean.md`: his clean transcript, in his words. Treat `⟦rig: ... ⟧` passages as his words too.

## What to list

Give every item an id and a quote, so later stages can trace it.

1. **Claims (C1, C2 ...).** Every point he argues or asserts. One line in plain words, then the supporting quote, verbatim, in quotation marks.
2. **Stories (S1 ...).** Every anecdote: who (by role only, never a name), what happened, what it shows. Quote the best two lines verbatim.
3. **Examples and specifics (E1 ...).** Numbers, tools, steps, before-and-after comparisons, anything concrete. Quote them exactly; mark any number he hedged ("about", "maybe") as hedged.
4. **Phrases to keep (P1 ...).** Ten to twenty lines that sound like him and only him: a sharp image, a joke, a plain-spoken verdict, an unusual word. Verbatim. These are the post's voice; the draft must use most of them.
5. **His order.** The sequence his thinking went in, as a numbered list of the ids above. The outline follows it unless it truly doesn't work.
6. **The thesis,** if he stated one: his words, verbatim. If he didn't, write `none stated` and give the strongest candidate from his claims, marked as a candidate.
7. **Gaps (G1 ...).** Where a reader would want something he didn't give: a number, an example, the result of a story, a closing ask. These become `[Alex: ...]` markers later. Don't fill them.
8. **Keep off the post (K1 ...).** Anything that names a client, a company he worked with, a person, a private number, a proposal, his own outreach, a login, a key or a password, or that he flagged as off the record. Quote where it is so the edit and scan stages can make sure it's gone.

## Never

- Never paraphrase inside a quotation. Quotes are copied character for character from `1-clean.md`.
- Never add a claim, example or number that isn't in the transcript.

## Output: `{DIR}\2-extract.md`

```
---
id: {ID}
stage: 2-extract
prompt: v0
from: {DIR}\1-clean.md
---

## Thesis
## Claims
## Stories
## Examples and specifics
## Phrases to keep
## His order
## Gaps
## Keep off the post
```

## Return

```
STAGE 2 DONE {ID}: {DIR}\2-extract.md, <c> claims, <s> stories, <e> examples, <p> phrases, <g> gaps, <k> keep-offs
```
