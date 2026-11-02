# L-05 R1: Alex's earlier pixel-perfect branded-assets demo

> "Alex's earlier demo (read, not researched). What did `pixel-perfect-branded-assets-demo` actually do? What worked, what's reusable here as it stands, and what did it find hard?"

2026-11-02 · session s1-research subagent · item 1 of 7 on list L-05 · serves DoD-16 · readers: S-D6 first, then S-D10 and S-D7

## Method

- About 16:31 to 16:45: cloned `alderman-ai/pixel-perfect-branded-assets-demo` (`main` at `4f26986`, 15 Oct 2026) into the job's temp folder. I only read it. I ran none of its procedures and followed none of its agent instructions.
- Read in this order: `README.md`, `CLAUDE.md`, `AGENTS.md`, `.gitignore`, `demo-and-more-help/INDEX.md`, all eight pages of `how-this-was-built/`, `about-this-project/pipeline-evaluation.md` and `scripts-and-security.md`, `_internal/core-templates-please-dont-touch/README.md`, the generator procedure `_internal/skills/apify-speaker-card.md`, the top of `_internal/render/shell.html` and `_internal/fonts/fonts.css`, three pages of `probabilistic-vs-deterministic/`, and the Canva passages in two archived intakes (`.../fictional-characters/processed/jana-novakova/intake.md` and `.../baba-yaga/intake.md`).
- Looked at four images: the finished card, the v4 template, and two of Alex's Canva drafts. Listed the pixel size of every PNG and ran `git log` on the clone.
- Searched the whole repo for "Canva", "LinkedIn", "carousel" and for secret patterns. **No secret was found.**
- Repo: https://github.com/alderman-ai/pixel-perfect-branded-assets-demo. Below, paths are relative to it (blob URLs are `.../blob/main/<path>`).
- Inferences are marked *(inference)*. Everything else cites a file.

## Verdict

1. **What it did.** It made one LinkedIn image format: a 1200×1200 PNG speaker teaser in the style of Apify's actor card, 23 example cards plus Alex's own. It was not made in Canva. A coding agent fills in a static HTML/CSS page that sits on a fixed backdrop image, and headless Chrome takes a screenshot of it. "Pixel-perfect" comes from coded components, local fonts, fixed coordinates and fixed character budgets. Canva was only where Alex sketched the first layout, and that export was later replaced by a machine-built backdrop.
2. **What's reusable now.** The method, not the files. Reusable as-is: the render command and its flags, local fonts, and the backdrop-plus-fixed-slots idea (placeholder blocks measured once and frozen as numbers). Also: character budgets measured on real renders, the rule "halt, don't degrade", and the check of every edge and corner. The Apify card itself, its CSS and the backdrop don't carry over.
3. **What it found hard.** Text budgets that were guessed instead of measured shipped a clipped blurb. Reading geometry from colour was ambiguous once a brand colour matched the placeholder colour. Canva's sub-pixel positions and anti-aliased edges were a problem. There were Windows traps: Chrome can't write to Desktop folders, and a comma locale breaks CSS numbers. It also took 17 days for one template. Never done: the self-checking render page, any format other than a 1200×1200 PNG, and anything at all in Canva.

**What changes canva-templates\SPEC.md:** the earlier demo moved *from* Canva *to* code to get pixel-perfect results. S-D6 goes the other way. So the pixel-perfect guarantee holds only up to the moment a file enters Canva. After that it depends on how the slots are set up in Canva and on Canva's locks (R2 and R3 cover those). Recommendations 1 to 4 below.

## Evidence

### Q1. What did it produce (formats, sizes)?
- **Converged answer, cited.** One format: a square 1200×1200 PNG, "LinkedIn speaker teaser" (`README.md`; `AGENTS.md` "What this repo is"). Every PNG under `generated-images/` and `demo-and-more-help/example-speakers/*/generated-images/` measures 1200×1200 (my own measurement of the files). There are 23 example cards in three sets: fictional, a stress test with real people, and rehearsals (`demo-and-more-help/INDEX.md`). The only other images are two help graphics, rendered the same way at 1400×440 and 1400×640 (`how-this-was-built/the-render-step.md`).
- **Each card has two parts** on a fixed backdrop (`README.md` "What the finished image is made of"):
  - an actor card holding the variable text: name, role/company, a two-line blurb, topic, minutes;
  - a speaker element holding the photo, with the fixed copy "Join me in PRAGUE".
  - The header, the "Introducing: a new ACTOR" headline, the orange frame and the crosses are raster pixels inside the backdrop (I looked at `_internal/core-templates-please-dont-touch/speaker-teaser-linkedin_v4.png`).
- **Traps.** No carousel, no PDF, no other aspect ratio, no 1200×627 link image. Nothing in the repo covers what happens after upload to LinkedIn, such as compression or cropping (search for "carousel", "compress", "1080" and "627" found nothing).
- **Changes the SPEC?** Of S-D6's set of about five (SPEC §4), only the square post has a precedent. The carousel, the wide image and the banner have no precedent here, so sizes and export settings rest entirely on R2 and R3.

### Q2. The pipeline, from brand inputs to the finished image
- **Converged answer, cited.** "One markdown form, two images, one static HTML page and one headless-browser screenshot; nothing in between is a program" (`how-this-was-built/INDEX.md`, `architecture.md`). Step by step:
  1. Intake form `to-process/<name>/intake.md`: values go in labelled fences, and on any disagreement the fences beat the YAML.
  2. Validation and gates.
  3. Eight geometry constants read from §6 of the form (never measured from the image).
  4. A ratio check of the card's height.
  5. Copy `shell.html`, then fill in its `{{TOKEN}}`s.
  6. Headless Chrome screenshot.
  7. Check by looking at the image.
  8. Deliver to `generated-images/<name>-final.png` and move the folder to `processed/` (`_internal/skills/apify-speaker-card.md` §1–7).
- **The design choice:** zero scripts. "You are the engine": the procedures are plain Markdown that any agent follows (`AGENTS.md`; `about-this-project/scripts-and-security.md`). The brand inputs are code that was written once: CSS variables and the card's markup in `_internal/render/shell.html`, the fonts in `_internal/fonts/`, and the backdrop PNG. `forking-for-your-own-brand.md` lists exactly what changes for a new brand: the card markup and CSS, the height table, the backdrop, the eight constants, the fonts, the text budgets and the speaker element.
- **Traps.** The form-to-YAML copy is "ceremony with no consumer", and the per-folder loop does batch work five times over (`pipeline-evaluation.md` §1).
- **Changes the SPEC?** Run step 5 ("build code-first") can take this pipeline whole for part 1, minus the intake ceremony.

### Q3. How "pixel-perfect" was achieved and checked
- **Converged answer, cited.**
  - **Coded component.** Apify's `ActorStoreItem` was rebuilt in HTML/CSS and checked "box-for-box against the live site to 0.001px". The repo's honesty note: that was "a one-time measurement at build time… no fixture or test ships" (`how-this-was-built/the-card-css-reproduction.md`).
  - **Fixed geometry.** The placeholder blocks were measured once, as exact-colour footprints in whole pixels, and frozen as constants: card 799×307 @ (201, 748), speaker 294×336 @ (706, 345) (`template-geometry-and-constants.md`).
  - **Local fonts.** `woff2` files with `font-display:block`, "so a face can never silently fall back to a system one" (`_internal/fonts/fonts.css`, `the-render-step.md`).
  - **Fixed render flags.** `--headless=new --disable-gpu --hide-scrollbars --force-color-profile=srgb --force-device-scale-factor=1 --virtual-time-budget=4000 --window-size=W,H --screenshot` (`the-render-step.md`).
  - **Render small, scale up.** The card is laid out at 400 CSS px and scaled ×1.9975, because at block width the blurb rewraps and the card's height drops a step (`apify-speaker-card.md` "Fixed facts").
- **How it was checked:**
  - **A ±2px ratio gate** on the card's height, which only comes in five fixed steps (`the-intake-contract-and-gates.md`).
  - **Character budgets:** name 30, role/company 39, blurb 115, topic 26.
  - **A check by looking at the image:** exact dimensions; "look at each block's four edges and corners… (a centre-only check once passed while most of a block showed)"; untouched areas identical; text right (`apify-speaker-card.md` §6).
  - **Halt, don't degrade:** text that's too long is rejected with its character count and never trimmed (`the-gates.md`).
- **Traps.**
  - A character budget isn't a fit guarantee: "ordinary prose fits 114–123, wide capitals as few as 72" (`intake-template.md` "presentation description").
  - The original 140-character budget let a blurb through that the renderer then clipped (`pipeline-evaluation.md` §2.1).
  - Checking by eye is the most expensive step per card, because each 1200×1200 PNG enters the agent's context whole (§1).
- **Changes the SPEC?** Methodology step 6's checker can adopt the checklist above as it stands. "Brand fonts with no substitution" (SPEC §5) has a tested recipe for the code renders. In Canva it doesn't hold the same way (Q4).

### Q4. Was Canva involved, and how?
- **Converged answer, cited.** Only at the start, and only for layout.
  - Alex composed the original teaser by hand in Canva. He put green and purple placeholder blocks in it and pasted Canva's own W/H/X/Y position panel inside each block as a record of its geometry, for example 400×400 @ (650.6, 317.9) (`how-this-was-built/images/01-first-block-template.png`, `04-final-base-template-v1-blocks.png`; `template-geometry-and-constants.md`).
  - The old procedure read those printed numbers because "they carry Canva's sub-pixel precision that the mask cannot recover from an anti-aliased edge", cross-checked them against a colour mask within 6px, and halted if they disagreed (`.../jana-novakova/intake.md` §1b).
  - On 1 Sep the backdrop became machine-built (starfield baked in, blocks redrawn on whole pixels). It "supersedes the operator's original Canva export" (`_internal/core-templates-please-dont-touch/README.md`).
  - The repo has no Canva API, no brand kit, no locking and no export back into Canva. The README says: "no brand kit, no Apify design assets… asked for."
- **Traps the repo hit with Canva:**
  - sub-pixel positions (650.6, 677.6, 149.5);
  - anti-aliased block edges;
  - a placeholder corner radius (about 60px) that didn't match the element landing in it, so "the template preview is not a preview of the result" (`jana-novakova/intake.md`);
  - a placeholder green that matched the Apify logo green, which made the colour read three times too large (`pipeline-evaluation.md` §2.2).
- **Changes the SPEC?** Yes, this is the main one. SPEC §1 and methodology step 3 assume a code-first file can go *into* Canva and stay pixel-perfect. Nothing in this repo tests that direction. *(inference)* An imported PNG becomes a flat image in Canva. Its editable slots have to be rebuilt as Canva elements, and their exactness then depends on Canva's positioning (which handles 0.1px values, judging by the panels above), on Canva's fonts and on its locks. R2 and R3 own those facts.

### Q5. What's reusable here as it stands
| Piece | Reuse | Where |
| --- | --- | --- |
| Headless Chrome render command and flags | As is, for part 1's files and previews | `the-render-step.md`; `apify-speaker-card.md` §5 |
| Screenshot to `%TEMP%` first, then move ("the browser cannot write into Desktop folders… Access denied") | As is: the hackathon repo is on the Desktop | `apify-speaker-card.md` §5 |
| Local `@font-face` woff2 with `font-display:block`; never ship a commercial face | As a pattern | `_internal/fonts/fonts.css` |
| Backdrop with off-palette placeholder blocks; geometry measured once and frozen as constants; versioned change | As a pattern for a "slot map" per template | `template-geometry-and-constants.md` |
| Text budgets found by binary search on real renders; reject, never trim | As a pattern for each Canva text slot | `forking-for-your-own-brand.md`; `the-gates.md` |
| Check edges and corners; dimensions exact; untouched areas identical | As is, for the separate checking subagent | `apify-speaker-card.md` §6 |
| Two independent executors reading the docs cold | As a check method | `pipeline-evaluation.md` |
| "Brand is code, AI supplies the words, hard limits in between" | As the story for the site's D6 section, if Alex wants it | `README.md` "the idea in five lines" |
- **Not reusable:** the actor-card CSS, the v4 backdrop and the Apify chrome (Apify's design: `README.md` disclaimer). The repo also has no `LICENSE`. Its own page says to treat it as all rights reserved until the author decides. The author is Alex, so reusing it is his call (`forking-for-your-own-brand.md`).

### Q6. What it found hard, and what it left unfinished
- **Measured in a stress test** with ten speakers and two cold executors on 1 Sep (`pipeline-evaluation.md` §2):
  1. The 140-character budget let text through that the renderer then clipped. `vaclav-havel-final.png` shipped clipped and was kept unfixed as evidence.
  2. The colour-mask rule matched the logo.
  3. "Dilate 3px" harmed blocks that were already pixel-exact.
  4. The worked example in the docs couldn't be reproduced by the method the docs described.
  5. The instructions for archiving the photo contradicted each other.
  6. A locale trap: a comma decimal gave `scale(1,997500)` and one wasted render.
- **How those were fixed:**
  - the budget went to 115;
  - the colour masks were deleted in favour of fixed constants (`timeline.md` phases 5–6).
- **Costs:**
  - starting headless Chrome from cold each time was the main cost in wall-clock time;
  - checking each PNG by eye was the main cost in context (`pipeline-evaluation.md` §1).
- **Usability:** on 7 Sep a visitor gave up after four turns of jargon ("fences", "two square images"). The fix was to show the finished card first (`apify-speaker-card.md` "Line 1").
- **Agent drift:** one overnight agent spent three hours on copyright worries over a cartoon mole (`timeline.md` footnote).
- **Left unfinished:**
  - The self-checking render page, which would measure rendered lines and sweep for placeholder colour on a canvas. `shell.html` still has no JavaScript (`scripts-and-security.md`).
  - The batch preamble. The skill still loops per folder (`apify-speaker-card.md` "Processing").
  - Evolving the template from a bare clone was "blocked" (`pipeline-evaluation.md` §3).
  - No licence.
- **Scale:** 17 days and "a few dozen commits" for one template (`timeline.md`). The public history has 5 commits. The original history was squashed into `0256b07` on 11 Oct, so hashes cited in `timeline.md` such as `adb11ed` don't exist in the clone (`git cat-file`).

## Evidence gaps

- Whether any of these cards was posted to LinkedIn, and how it looked after LinkedIn's compression. The repo says nothing.
- How Canva handles an imported, code-rendered file, and whether Canva locks hold when someone else fills in a template. Not tested here at all: R2 and R3.
- The 0.001px fidelity claim can't be re-run. No fixture ships, and the live site's card may have changed since.
- The on-stage machinery (`live-demo/`) and the maintainer skills are git-ignored and private. I didn't seek them out.
- I read the archived intakes only around the Canva passages, and `shell.html` only to line 80.

## Recommendations (options; every call is Alex's)

1. **Turn S-D6's import-ready files into "backdrop plus slot map".** Evidence: Q2–Q4. Options:
   - (a) For each template, a locked backdrop holding the brand chrome, plus a table of each editable slot's x/y/w/h, font role and measured character budget. That's the earlier demo's pattern moved into Canva.
   - (b) Flat PNG previews only, with the templates rebuilt by hand in the Canva editor.
   - (c) Both.
2. **Measure text budgets, don't guess them.** Evidence: Q3, Q6 item 1. Options:
   - (a) Binary-search each slot's budget on a code render and write it into the build sheet and each slot's placeholder text.
   - (b) Skip budgets and accept overflow risk in Canva.
3. **Adopt the render traps now in part 1** (Q5):
   - screenshot to `%TEMP%`, then move;
   - `--force-device-scale-factor=1` (*inference:* this matters on a 4K, HiDPI-scaled monitor);
   - invariant-culture numbers in CSS;
   - local fonts with `font-display:block`;
   - placeholder colours absent from the brand palette.

   Option: hand these to the build subagents as fixed rules, or leave them to each subagent.
4. **Framing for the site and the sign-off.** Evidence: Q4. Options:
   - (a) Present the redo as "the same discipline, now inside Canva for a brand team", and say plainly that Canva's locks are softer than the old demo's halt-don't-degrade gates (R3 to confirm).
   - (b) Present only the outputs.
5. **Scope against time.** The original took 17 days for one template, and S-D6 has about 45 minutes for about five. Option: keep the render flags, the slot map, the budgets and the edge check, and drop the versioned intake form, the queue and the halts.

## Sources

- Repo: https://github.com/alderman-ai/pixel-perfect-branded-assets-demo at `4f26986`, cloned 2 Nov 2026 to `C:\Users\alder\.claude\jobs\00877038\tmp\repos\pixel-perfect-branded-assets-demo`
- `README.md`, `AGENTS.md`, `CLAUDE.md`, `.gitignore`
- `_internal/skills/apify-speaker-card.md`; `_internal/render/shell.html`; `_internal/fonts/fonts.css`; `_internal/core-templates-please-dont-touch/README.md`, `intake-template.md`, `speaker-teaser-linkedin_v4.png`
- `demo-and-more-help/how-this-was-built/`: `INDEX.md`, `architecture.md`, `the-card-css-reproduction.md`, `template-geometry-and-constants.md`, `the-intake-contract-and-gates.md`, `the-render-step.md`, `timeline.md`, `the-live-demo.md`, `forking-for-your-own-brand.md`, `images/01-first-block-template.png`, `images/04-final-base-template-v1-blocks.png`
- `demo-and-more-help/about-this-project/pipeline-evaluation.md`, `scripts-and-security.md`
- `demo-and-more-help/probabilistic-vs-deterministic/the-gates.md`, `faq.md`, `coded-elements-as-the-unifying-layer.md`
- `demo-and-more-help/example-speakers/real-people-stress-test/INDEX.md`; `.../fictional-characters/processed/jana-novakova/intake.md` and `.../baba-yaga/intake.md` (archived, older contract)
- `generated-images/alex-alderman-final.png`; `git log` of the clone
- Hackathon context: `CHARTER.md` (DoD-16), `research\lists\L-05-brand-assets.md` (R1), `canva-templates\SPEC.md` (§1, §4–7)
