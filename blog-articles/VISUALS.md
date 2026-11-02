# LinkedIn companion images for the two blog posts

Six images, three per post, to go with the posts on LinkedIn. They are Alex Alderman's posts in Addvery's look: the byline is "Alex Alderman" and no Addvery logo or symbol appears on any image. They are local mockups. Nothing is published, uploaded or put into Canva. The images and everything that holds a brand value live in `local/visuals/` (git-ignored). This file describes them using role names only.

- **A-01**: an AI workflow is always a managed service, plus the AI skill slider.
- **A-02**: GTM engineers and the AI promise.

Readers: Alex's LinkedIn audience, the same people Addvery writes for.

## Formats

| Format | Size | What it is |
| --- | --- | --- |
| `post` | 1080×1350 (4:5) | Single-image teaser. LinkedIn's feed shows 4:5 uncropped. |
| `link` | 1200×630 (1.91:1) | A mock of the post's link-preview card. The site generates the real one. |
| `diagram-scale` (A-01) | 1080×1350 | The AI skill slider: training at the bottom, then use, maintain and build, with external building at the top. The order is Alex's and is fixed. |
| `diagram-flow` (A-02) | 1080×1350 | AI spend leads to payback, then forks: cutting labor cost is the dead end, growing revenue continues to GTM engineers and then the whole team growing. |

**Margins.** The 1080×1350 images keep 96 px on every side. The link card uses 64 px at the top, left and right and 96 px at the bottom. The reasons:
- LinkedIn and Facebook show a 1.91:1 image uncropped, with only small rounded corners.
- X crops link cards to 2:1, which takes about 15 px off the top and the bottom, and it lays a domain or title label over the bottom-left corner.
- The common centre-safe advice is the middle 1080×600.

64 px clears all of that, and the extra bottom margin keeps the byline above X's label. The old 96 px all round wasted a strip that no platform crops.

## Slots and measured budgets

A budget is the most characters that fit, measured on real renders. A text over budget is rejected and must be rewritten shorter. It is never trimmed or shrunk. The "step" column gives size/line-height in px on the canvas.

**post**

| Slot | Step, role | Lines | Budget |
| --- | --- | --- | --- |
| KICKER | eyebrow 32/32, display face, capitals, body text | 1 | 39 |
| HEADLINE | 88/96 display face, primary text, one gradient-lead phrase | 4 | 80 |
| SUPPORT | 40/48 body face, body text | 3 | 110 |
| BYLINE | 36/40 display face, primary text | 1 | 23 |
| READ (optional) | 32/40 body face, body text | 1 | 21 |

**link**

| Slot | Step, role | Lines | Budget |
| --- | --- | --- | --- |
| KICKER | eyebrow 36/40 | 1 | 31 |
| HEADLINE | 72/80 display face, one gradient-lead phrase | 3 | 64 |
| BYLINE | 36/40 display face | 1 | 32 |

**diagram-scale** (A-01)

| Slot | Step, role | Lines | Budget |
| --- | --- | --- | --- |
| KICKER | eyebrow 32/32 | 1 | 39 |
| TITLE | 72/80 display face, one gradient-lead phrase | 2 | 49 |
| AXIS_TOP, AXIS_BOTTOM | eyebrow 32/32 | 1 | 26 |
| RUNG1–4_LABEL (1 is the bottom rung) | 40/48 display face, on a dark row card | 1 | 39 |
| RUNG1–4_NOTE | 32/40 body face, body text | 1 | 50 |
| FOOTNOTE | 40/48 display face, primary text | 1 | 47 |
| BYLINE, READ | as in `post` | 1 | 23, 21 |

**diagram-flow** (A-02)

| Slot | Step, role | Lines | Budget |
| --- | --- | --- | --- |
| KICKER | eyebrow 32/32 | 1 | 39 |
| TITLE | 72/80 display face, one gradient-lead phrase | 2 | 49 |
| STEP1, STEP2, STEP4 | 40/48 display face, row card (STEP4 has a gradient-lead border) | 1 | 43 |
| NOT_TAKEN_LABEL / NOTE | 40/48 struck, dashed card / 32/40 body face | 1 | 14 / 19 |
| TAKEN_LABEL / NOTE | 40/48, gradient-lead border / 32/40 body face | 1 | 18 / 22 |
| STEP5 | 40/48 primary text on the button gradient fill | 1 | 43 (keep it under about 30, see the review) |
| BYLINE, READ | as in `post` | 1 | 23, 21 |

## The text on each image

The **bold** phrase is the one gradient-lead highlight on that image. This text can also serve as each image's alt text on LinkedIn.

**A-01**
- post: "AI workflows" / "An AI workflow is always a **managed service**" / "The models keep changing, so someone has to keep it running. Decide how much of that your own team can do." / "Alex Alderman" / "Read it on the blog"
- link: "Blog · AI workflows" / "An AI workflow is always a **managed service**" / "Alex Alderman"
- diagram: "AI workflows" / "Where is your company on the **AI skill slider**?" / top: "External building" / "Bring in a builder: Hire or bring in someone external" / "Build them yourselves: Your team builds its own workflows" / "Maintain them yourselves: Keep them working as the models change" / "Use what others build: Your team runs workflows built elsewhere" / bottom: "Training" / "Either way, you pay a trainer or a builder." / "Alex Alderman" / "Read it on the blog"

**A-02**
- post: "GTM engineering" / "GTM engineers answer the AI era’s biggest **social question**" / "Companies say AI isn’t a way to fire half the team. Then AI has to pay for itself through revenue." / "Alex Alderman" / "Read it on the blog"
- link: "Blog · GTM engineering" / "GTM engineers help companies keep their **AI promise**" / "Alex Alderman"
- diagram: "GTM engineering" / "How AI can pay back and keep the **whole team**" / "Companies spend on AI" / "The spend has to pay back" / dead end: "Cut labor cost: Breaks the promise" / taken: "Grow revenue: Keeps the promise" / "GTM engineers point AI at the pipeline" / "The whole team grows together" / "Alex Alderman" / "Read it on the blog"

All of this text fit the new budgets, so none was rewritten. "Labor" keeps Alex's American spelling.

## Re-render

From the repo root (it works from any folder):

```
node blog-articles\local\visuals\tools\render.mjs
```

- `--measure` re-measures every budget first. Run it after changing type or layout.
- `--stress` also renders each template filled to its budgets, into `out\stress\`.
- `A-01` or `A-02` renders one article only.
- `--comfy <folder>` reads ComfyUI backdrops from another folder (testing only).

The run checks fonts, brand tokens, linked brand assets, every slot's fit and edges, and each image's exact size. It ends with `all clean` or a list of failures. Renders run offline. Text goes in `local\visuals\content\A-0n.json`. The output is in `local\visuals\out\`, including `contact-sheet.png`.

## Where the brand comes from

One source: the website's Addvery kit, [website/local/addvery/brand/](../website/local/addvery/brand/BRAND.md) (BRAND.md and tokens.css), plus its assets in [website/public/addvery/](../website/public/addvery/). Every page links the kit by relative path and uses its roles. Nothing is retyped.

- **Lead look.** The kit's gradient layer: a black canvas, primary text, body text, the violet-to-orchid gradient lead, and the kit's two glow images as the backdrop art.
- **Editorial layer.** Kept for long-form pages and not used here.
- **Faces.** The kit's display face (the free stand-in for Addvery's licensed display face) and its body face (exactly what Addvery uses). They load from local copies for headless renders.
- **Replaced.** The earlier links to the Canva templates' tokens and fonts are gone.

## Review (design critique and accessibility)

Contrast was measured on the rendered pixels, taking the brightest backdrop pixel under each text box. Feed scale was checked at a 390-px-wide phone.

**Fixed**
- The gradient-lead highlight sat on a glow: 2.2:1 on the link card and 2.6:1 on the post at the worst pixel. Both glows now sit away from all text, and the highlight is 3.5:1 or better everywhere (large text needs 3:1).
- The smallest text (eyebrows, axis labels) came to about 10 px on a phone. It is now 32 px on the tall images (36 px on the link card), so the smallest text anywhere is about 11.6 px.
- Diagram titles went up from 64 to 72 px, so the highlight counts as large text on a phone.
- The filled last step used the row gradient, where white text ended near 4.3:1. It now uses the kit's button gradient, the kit's own pairing for white labels: 4.7:1 at the worst pixel under the text.
- A glow ended in a hard horizontal edge above the byline. It now fades out.
- The slider's rung cards and the fork cards were shorter than their text plus padding, so the notes sat on the card border. The cards are taller and the slider is re-spaced.
- The flow connectors and arrowheads were too thin to read at feed scale. They are thicker now.
- Other text measures: primary text 17:1 or more, body text 9.4:1 or more, card notes 8.3:1.

**Left as is**
- The link-card headline is 72 px, about 23 px on a phone, just under the 24-px large-text line. Its highlight starts at the gradient's violet end (3.5:1). A bigger size would cost a headline line, and the gradient lead starts at violet by design.
- If STEP5 runs longer than about 30 characters, its tail reaches the orchid end of the fill, where white drops to about 3.6:1. Today's text stops short of that. Keep the last step short (the kit gives the same advice for its buttons).
- The dashed "road not taken" line is dim on purpose. The strike-through, dashed card and cross carry the same meaning.
- Headlines stay in sentence case. Addvery's homepage forces Title Case, but its newer pages use sentence case, and the words are Alex's.
- With a two-line headline, the link card has an empty band above the byline. The stack stays top-aligned so every card matches.

## Open points for Alex

1. **Which backdrop.** The coded one shown (black plus the kit's glows), or a ComfyUI backdrop. None has been generated yet.
2. **Where the images go.** Canva templates (S-D6), LinkedIn posts (S-D7) or the site.
3. **The text.** It gets redone from each finished post after his last 10%, so the images never say more than the post.
