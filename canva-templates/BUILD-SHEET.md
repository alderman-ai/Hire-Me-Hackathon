# Build sheet: five Addvery LinkedIn image templates (S-D6), built code-first as HTML rendered to PNG/PDF, then brought into Canva
Written by role only: every colour, type, shape and logo role is named as in the git-ignored `local\brand.md`, which holds the values; no brand value appears in this file.
Sizes, safe zones and crops are draft until the research (L-05) lands: change §1 first, since every table below is written against it.

## 1. Template set and canvas sizes (the single place to change a size)

| ID | Name in Canva | Canvas (px) | Ratio | Margin side / top / bottom | B (bottom content edge) | Columns | Export slug |
| --- | --- | --- | --- | --- | --- | --- | --- |
| T1 | `Addvery · LinkedIn · Single-image post · 1080×1350` | 1080×1350 | 4:5 | 96 / 96 / 102 | 1248 | 12 × 52, gutter 24, step 76 | `post` |
| T2 | `Addvery · LinkedIn · Insight card · 1080×1080` | 1080×1080 | 1:1 | 96 / 96 / 96 | 984 | 12 × 52, gutter 24, step 76 | `stat` |
| T3 | `Addvery · LinkedIn · Quote card · 1080×1080` | 1080×1080 | 1:1 | 96 / 96 / 96 | 984 | 12 × 52, gutter 24, step 76 | `quote` |
| T4 | `Addvery · LinkedIn · Document carousel · 1080×1350` | 1080×1350, 6 pages | 4:5 | 96 / 96 / 174 (clear band) | 1176 | 12 × 52, gutter 24, step 76 | `carousel` |
| T5 | `Addvery · LinkedIn · Event teaser · 1200×627` | 1200×627 | 1.91:1 | 96 / 72 / 75 | 552 | 12 × 62, gutter 24, step 86 | `event` |

- Positions in §6 are px from the canvas top-left. A y written `B−n` is anchored to the bottom content edge (resolved value in brackets). If a canvas changes, top-anchored y values hold, `B−n` values move with B, and the flexible slot (T1 image, T4 body) absorbs the difference.
- Code-first build: one HTML file per template (T4: one file, six page sections), sized by CSS custom properties `--w --h --m --b`; each brand role is a CSS custom property with the role's exact name (`--bg-base`, `--text-body-dark`, `--accent-gradient` ...), defined once in a git-ignored stylesheet in `local\`. Fonts load by `@font-face` from `local\fonts\`; the render waits for `document.fonts.ready` and fails if any face isn't loaded. Output goes to `local\import\`.

## 2. Grid and safe zones

**One system on every canvas:** 8px baseline unit, 12 columns, 24px gutter, 96px side margins.
- Column start: `x = 96 + (n−1) × step`. Spans on 1080 canvases: 2 = 128, 3 = 204, 4 = 280, 6 = 432, 8 = 584, 10 = 736, 11 = 812, 12 = 888. On 1200: 8 = 664, 12 = 1008.
- Every y, block height, gap and line-height is a multiple of 8. Exceptions: 1px hairlines, the 4px progress bar, text optically centred on the logo, and canvas heights 1350 and 627 (not multiples of 8: the remainder goes to the bottom margin).
- **Optical alignment at display sizes.** At the `display` and `display-num` steps the font's left side bearing is wide enough to see (about 13px at 240px), so the text box shifts left by the measured bearing and the glyph's visible edge sits on the margin, in line with the accent bar and eyebrow. Check 3 measures the visible edge for these two steps.
- Standard gaps: 32 between stacked text slots, 96 between groups, 32 from the accent bar to the eyebrow.

| Canvas | Safe zone rule |
| --- | --- |
| All | Nothing must-read outside the content box (inside the margins). Only the background, the T5 gradient panel and bleeds may cross it. |
| 1080×1350 (T1) | The mobile feed shows 4:5 portrait in full. Desktop may show tall images smaller or cropped (R2 confirms); keep the headline in the top half so it survives a centred square crop (y 135–1215). |
| 1080×1080 (T2, T3) | Shown in full on mobile and desktop. Margins only. |
| 1080×1350 (T4) | The document viewer overlays its controls (page indicator, full screen) at the bottom: the clear band y ≥ 1176 holds background only. Desktop prev/next arrows sit over the side edges at mid-height, inside the 96px margins. Page 1 is the feed thumbnail, so the cover must stand alone. |
| 1200×627 (T5) | As a link-share image, LinkedIn scales it to the card width and may trim edges; compact surfaces show a small thumbnail. Text stays inside 96 side / 72 top-bottom margins; the title is the only must-read at thumbnail size. |

## 3. Type scale

Font roles: `font-display` (headlines), `font-label` (labels, eyebrows), `font-body` (body and UI). Phone size = canvas px ÷ 2.77 (a 1080px canvas shows about 390pt wide).

| Step | Font role | px | Weight | Line-height px (×) | Tracking | Case | ≈ pt on phone | Used in |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| display | `font-display` | 240 | 600 | 240 (1.00) | −2% | — | 87 | T2 number |
| display-num | `font-display` | 160 | 600 | 160 (1.00) | −2% | — | 58 | T4 point numbers |
| headline-xl | `font-display` | 88 | 600 | 96 (1.09) | −2% | Sentence | 32 | T1 headline, T2 claim, T4 cover and closing |
| headline | `font-display` | 64 | 600 | 72 (1.125) | −2% | Sentence | 23 | T4 page titles |
| quote | `font-display` | 56 | 600 | 64 (1.14) | −2% | Sentence | 20 | T3 quote |
| value | `font-display` | 48 | 600 | 56 (1.17) | −2% | — | 17 | T4 chart values |
| subhead | `font-body` | 40 | 500 | 48 (1.20) | −1% | Sentence | 14.4 | T1 support, T2 context, T3 name, T4 subtitle |
| body | `font-body` | 36 | 400 | 48 (1.33) | 0 | Sentence | 13 | T4 body and list |
| cta | `font-body` | 36 | 500 | 40 (1.11) | 0 | Sentence | 13 | CTA pill labels |
| body-sm | `font-body` | 32 | 400 | 40 (1.25) | 0 | Sentence | 11.6 | T3 role, T4 bar labels |
| label | `font-label` | 28 | 500 | 32 (1.14) | +8% | UPPERCASE | 10.1 | Eyebrows, swipe cue |
| caption | `font-body` | 28 | 400 | 40 (1.43) | 0 | Sentence | 10.1 | Source lines, page counter, footer caption |

**T5 overrides** (1200 wide, ÷ 3.08): headline 64/72 (20.8pt), subhead 40/48 (13pt), body 36/48 (11.7pt), cta 36/40 (11.7pt), label 32/40 +8% (10.4pt).

**Minimum sizes.** Body text a reader needs is never below **32px** on a 1080 canvas: 32 ÷ 2.77 ≈ 11.6pt, just above 11pt, the smallest size Apple's interface guidelines treat as legible without zoom. Default body is 36px (≈ 13pt). The absolute floor is **28px** (≈ 10.1pt), allowed only for eyebrows (uppercase and tracked, so they read larger), source lines, footer captions and the page counter. On T5 the body minimum is 36px and the floor 32px, since it shrinks more (÷ 3.08).

Canva entry: line spacing = line-height ÷ px; letter spacing −2% = −20, −1% = −10, +8% = 80. Numbers use tabular figures where the font role allows.

## 4. Colour roles

| Element | T1 | T2 | T3 | T4 | T5 |
| --- | --- | --- | --- | --- | --- |
| Background | `bg-base` | `bg-base` | `bg-base` | `bg-base` | `bg-base` + gradient panel in `accent-gradient` (angled variant) |
| Headline / title / quote | `text-primary-dark` | claim: `text-primary-dark` | `text-primary-dark` | `text-primary-dark` | `text-primary-dark` |
| Big number / point numbers | — | `accent-gradient` | — | `accent-gradient` | — |
| Key-word highlight | `accent-gradient` | claim only | `accent-gradient` | `accent-gradient` | `accent-gradient` |
| Eyebrow | `text-body-dark` | `text-body-dark` | — | `text-body-dark` | `text-body-dark` |
| Supporting / body | `text-body-dark` | context: `text-primary-dark` | — | `text-body-dark` | date `text-primary-dark`, format `text-body-dark` |
| Attribution | — | — | name `text-primary-dark`, role `text-body-dark` | — | — |
| Caption / source / counter | `text-body-dark` | `text-body-dark` | — | `text-body-dark` | — |
| Accent bar / mark | `accent-gradient` bar | `accent-gradient` bar | `accent-gradient` mark | `accent-gradient` bar (cover, closing) | — |
| CTA pill | — | — | — | fill `accent-gradient` (angled variant), label `text-primary-dark` | same as T4 |
| Hairlines | `glass-line` | `glass-line` | `glass-line` | — | — |
| Progress | — | — | — | track `glass-line-strong`, fill `accent-gradient` | — |
| Small marks | — | — | — | list markers `accent-solid`, swipe arrow `accent-gradient` | — |
| Chart bars | — | — | — | highlight `accent-gradient`, others `glass-line-strong`, `radius-sm` | — |
| Image slot | `glass-fill`, `glass-line` border, `radius-card`; `overlay` only if text ever sits on a photo | — | — | — | — |
| Logo | `logo-white` on `bg-base` | same | same | same | `logo-white` on the gradient panel |

Rules: the gradient never touches body, caption or label text. One key-word highlight per canvas or page, at most three consecutive words, only on steps of 56px or more. `accent-solid` only where a gradient can't render cleanly (marks under 24px, thin rules). Not used in part 1 (dark mood only): `bg-deep`, `surface-light`, `text-body-light`, `text-primary-light`, `tint-1`, `tint-2`.

**Contrast** (WCAG 2.x, computed from the local values):

| Pair | Ratio | Target | Status |
| --- | --- | --- | --- |
| `text-body-dark` on `bg-base` (body text) | 9.6:1 | 7:1 (AAA body), above the 4.5:1 AA minimum, to survive feed compression and small display | Meets |
| `text-primary-dark` on `bg-base` | 18.3:1 | 7:1 | Meets |
| `text-body-dark` on `glass-fill` over `bg-base` | 8.3:1 | 7:1 | Meets |
| `accent-gradient` text on `bg-base` | 3.1:1 (violet end) to 5.1:1 (magenta end) | 3:1, large text only | Meets at ≥ 56px only |
| `accent-solid` marks on `bg-base` | 3.2:1 | 3:1 non-text | Meets |
| `text-primary-dark` on `accent-gradient` (angled variant, CTA) | 5.8:1 violet, ≈ 5.3:1 label centre, 3.6:1 magenta end | 3:1, label ≥ 24px canvas size | Meets |
| `glass-line-strong` bars on `bg-base` | 1.9:1 | decorative: every bar also carries its value as text | Meets by labelling |

Canva fallback: if Canva can't fill text with a gradient (R1/R3 check), highlights and numbers take `accent-solid` (3.2:1, still ≥ 3:1 at ≥ 56px).

## 5. Shared rules

- **Logo** `logo-white`, aspect 3.70:1, never stretched or recoloured, only on `bg-base` or the gradient. Sizes: S 148×40, M 178×48, L 266×72. Clear space ≥ half the logo height on every side.
- **Stacks.** Positions are given at maximum lines. In HTML the top stack flows with the gaps of §2, so shorter copy leaves space below the stack; bottom-anchored footers never move. In Canva a filler may nudge a stacked slot up, snapping to the 8px grid.
- **Radii:** image slot `radius-card`, chart bars `radius-sm`, CTA `radius-pill`, list markers 50%.
- **Max characters** assume about 0.55 em average glyph width for `font-display` and 0.5 em for `font-body`. The builder confirms them with a stress render (§9, check 9) and tightens any limit that overflows.
- **People.** No real person's name, photo or quote. The image slot sample is an abstract diagram. Attribution is a placeholder.

## 6. Layouts

Lock: **L** locked in full; **P** position-locked, content editable; **O** owner-only (§7). Highlighted words are in bold.

### T1 Single-image post, 1080×1350

| # | Slot | Roles | x | y | w × h | Align | Max | Lock | Sample copy |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Background | `bg-base` | 0 | 0 | 1080×1350 | — | — | L | — |
| 2 | Accent bar | `accent-gradient` | 96 | 96 | 128×8 | left | — | L | — |
| 3 | Eyebrow | label, `text-body-dark` | 96 | 136 | 888×32 | left | 1 line, 32 ch | P | GTM ENGINEERING NOTES |
| 4 | Headline | headline-xl, `text-primary-dark` | 96 | 200 | 888×288 | left, top | 3 lines, 48 ch (stress-tested; 54 ran to 4 lines in 10%) | P | Your CRM is not the problem. Your **handoffs** are. |
| 5 | Supporting line | subhead, `text-body-dark` | 96 | 520 | 736×144 | left, top | 3 lines, 100 ch | P | Three places leads stall between marketing, sales and success, and how to spot each one in a week. |
| 6 | Image slot (optional) | `glass-fill`, `glass-line`, `radius-card` | 96 | 696 | 888×432 | fill, centre crop | — | P (replace only) | Abstract three-node workflow diagram, `glass-line-strong` strokes, one `accent-gradient` node |
| 7 | Hairline | `glass-line` | 96 | B−88 (1160) | 888×1 | — | — | L | — |
| 8 | Logo | `logo-white` M | 96 | B−48 (1200) | 178×48 | left | — | L | — |
| 9 | Footer caption | caption, `text-body-dark` | 400 | 1204 (centred on logo) | 584×40 | right | 1 line, 38 ch | P | Full breakdown in the comments |

Without an image, delete slot 6; the space stays `bg-base`.

### T2 Insight / stat card, 1080×1080

| # | Slot | Roles | x | y | w × h | Align | Max | Lock | Sample copy |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Background | `bg-base` | 0 | 0 | 1080×1080 | — | — | L | — |
| 2 | Accent bar | `accent-gradient` | 96 | 96 | 128×8 | left | — | L | — |
| 3 | Eyebrow | label, `text-body-dark` | 96 | 136 | 888×32 | left | 1 line, 32 ch | P | PIPELINE HYGIENE |
| 4a | Big number | display, `accent-gradient` | 96 | 264 | 888×240 | left | 1 line, 5 ch | P | 38% |
| 4b | or Short claim | headline-xl, `text-primary-dark` | 96 | 264 | 888×192 | left, top | 2 lines, 28 ch (stress-tested: 36 ran to 3 lines in 10% of samples) | P | Clean data, then **models**. |
| 5 | Context line | subhead, `text-primary-dark` | 96 | 536 (with 4b: 488) | 736×144 | left, top | 3 lines, 100 ch | P | of open deals in a sample CRM had no next step logged in the last 30 days. |
| 6 | Source line | caption, `text-body-dark` | 96 | B−216 (768) | 736×80 | left, top | 2 lines, 90 ch | P | Illustrative figure for this template, not client or survey data. |
| 7 | Hairline | `glass-line` | 96 | B−96 (888) | 888×1 | — | — | L | — |
| 8 | Logo | `logo-white` M | 96 | B−48 (936) | 178×48 | left | — | L | — |

Use 4a or 4b, never both. A number always has a source line; a sample number always says "Illustrative".

### T3 Quote card, 1080×1080

| # | Slot | Roles | x | y | w × h | Align | Max | Lock | Sample copy |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Background | `bg-base` | 0 | 0 | 1080×1080 | — | — | L | — |
| 2 | Accent mark | `accent-gradient`, vector opening quote mark (not a font glyph) | 96 | 96 | 112×88 | left | — | L | — |
| 3 | Quote | quote, `text-primary-dark` | 96 | 232 | 888×384 | left, top | 6 lines, 150 ch | P | The fastest go-to-market teams don't add more tools. They **remove the steps** between the tools they already have. |
| 4 | Name | subhead, `text-primary-dark` | 96 | B−240 (744) | 888×48 | left | 1 line, 32 ch | P | Name Surname |
| 5 | Role | body-sm, `text-body-dark` | 96 | B−192 (792) | 888×40 | left | 1 line, 48 ch | P | Role, Company |
| 6 | Hairline | `glass-line` | 96 | B−96 (888) | 888×1 | — | — | L | — |
| 7 | Logo | `logo-white` M | 96 | B−48 (936) | 178×48 | left | — | L | — |

### T4 Document carousel, 1080×1350 per page, 6 pages, one PDF

Sample: p1 cover, p2–p3 numbered points, p4 list, p5 bar chart, p6 closing. Add or drop content pages as needed (3–10 pages); the owner updates the counter and progress (§7).

**Chrome on every page**

| # | Slot | Roles | x | y | w × h | Align | Max | Lock | Sample |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| C1 | Background | `bg-base` | 0 | 0 | 1080×1350 | — | — | L | — |
| C2 | Logo | `logo-white` S | 96 | 96 | 148×40 | left | — | L | — |
| C3 | Page counter | caption, `text-body-dark`, tabular figures | 856 | 96 | 128×40 | right | `nn / NN` | O | 02 / 06 |
| C4 | Progress track | `glass-line-strong` | 96 | 168 | 888×4 | — | — | L | — |
| C5 | Progress fill | `accent-gradient` | 96 | 168 | (888 × page ÷ pages)×4 = 148 per page at 6 | left | — | O | p2 = 296 |
| C6 | Clear band | background only | 0 | 1176 | 1080×174 | — | nothing placed | L | — |

**p1 Cover**

| # | Slot | Roles | x | y | w × h | Max | Lock | Sample copy |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Accent bar | `accent-gradient` | 96 | 296 | 128×8 | — | L | — |
| 2 | Eyebrow | label, `text-body-dark` | 96 | 336 | 888×32 | 1 line, 32 ch | P | PLAYBOOK |
| 3 | Title | headline-xl, `text-primary-dark` | 96 | 400 | 888×384 | 4 lines, 64 ch | P | Three checks before you **automate** outbound |
| 4 | Subtitle | subhead, `text-body-dark` | 96 | 816 | 736×96 | 2 lines, 70 ch | P | A short guide for revenue teams starting AI-assisted prospecting. |
| 5 | Swipe cue | label `text-primary-dark` + arrow 48×24 `accent-gradient`, gap 16, right-aligned | 780 | B−48 (1128) | 204×48 | fixed | L | SWIPE → |

**p2–p3 Numbered point**

| # | Slot | Roles | x | y | w × h | Max | Lock | Sample copy (p2 / p3) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Point number | display-num, `accent-gradient` | 96 | 232 | 280×160 | 2 ch | P | 01 / 02 |
| 2 | Point title | headline, `text-primary-dark` | 96 | 424 | 888×216 | 3 lines, 75 ch | P | Map the data you already have / Write the rules before the prompts |
| 3 | Body | body, `text-body-dark` | 96 | 672 | 736×384 | 8 lines, 320 ch | P | p2: Before you add a tool, list every field your team uses to qualify an account: where it comes from, who updates it and how often. Gaps here turn into wrong messages later, sent at scale. p3: Decide which accounts qualify, what a good first message says and when a person steps in. Keep it to one page the whole team can read. A model follows rules well; it can't invent them for you. |

**p4 List**

| # | Slot | Roles | x | y | w × h | Max | Lock | Sample copy |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Point number | display-num, `accent-gradient` | 96 | 232 | 280×160 | 2 ch | P | 03 |
| 2 | Title | headline, `text-primary-dark` | 96 | 424 | 888×144 | 2 lines, 50 ch | P | Start with a small, measured test |
| 3 | Markers ×4 | `accent-solid`, 16×16 circle | 96 | item y + 16 | 16×16 | — | L | — |
| 4 | Items ×4 (hanging indent) | body, `text-body-dark` | 144 | 616 / 744 / 872 / 1000 | 840×96 each | 4 items, 2 lines and 90 ch each | P | Pick one segment of 100 to 200 accounts · Fix one success metric before you start · Read every message in the first week · Scale only what beats your manual baseline |

**p5 Bar chart (2–3 horizontal bars, axis at zero, no gridlines)**

| # | Slot | Roles | x | y | w × h | Max | Lock | Sample copy |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Title | headline, `text-primary-dark` | 96 | 232 | 888×144 | 2 lines, 50 ch | P | Where a manual prospecting week goes |
| 2 | Bar labels | body-sm, `text-body-dark` | 96 | 440 / 608 / 776 | 736×40 | 1 line, 36 ch | P | Account research · Writing first messages · CRM updates and admin |
| 3 | Bars | first `accent-gradient`, others `glass-line-strong`, `radius-sm` | 96 | label y + 56 | (736 × value ÷ max)×56 | 2–3 bars | O | 46 / 32 / 22 |
| 4 | Values | value, `text-primary-dark` | bar end + 24 | label y + 56 | ≤ 128×56 | 4 ch | P | 46% · 32% · 22% |
| 5 | Source line | caption, `text-body-dark` | 96 | B−120 (1056) | 736×80 | 2 lines, 90 ch | P | Illustrative split for this template, not measured data. |

**p6 Closing / CTA**

| # | Slot | Roles | x | y | w × h | Max | Lock | Sample copy |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Accent bar | `accent-gradient` | 96 | 296 | 128×8 | — | L | — |
| 2 | Title | headline-xl, `text-primary-dark` | 96 | 336 | 888×288 | 3 lines, 54 ch | P | Want the one-page **checklist**? |
| 3 | Body | body, `text-body-dark` | 96 | 656 | 736×144 | 3 lines, 120 ch | P | Comment "checklist" below and we'll share the one-page version of this guide. |
| 4 | CTA pill | fill `accent-gradient` (angled variant), `radius-pill`; label cta, `text-primary-dark`, centred | 96 | 832 | auto 280–584 × 88, padding 48 side | 1 line, 24 ch | P (label) | Get the checklist |
| 5 | Caption | caption, `text-body-dark` | 96 | 952 | 736×40 | 1 line, 48 ch | P | Follow for more GTM engineering notes |

### T5 Event / webinar teaser, 1200×627

| # | Slot | Roles | x | y | w × h | Align | Max | Lock | Sample copy |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Background | `bg-base` | 0 | 0 | 1200×627 | — | — | L | — |
| 2 | Gradient panel | `accent-gradient` (angled variant), bleeds top, right, bottom | 870 | 0 | 330×627 | — | — | L | — |
| 3 | Logo | `logo-white` M, on the panel | 926 | 72 | 178×48 | right edge on 1104 | — | L | — |
| 4 | Eyebrow | label (T5), `text-body-dark` | 96 | 72 | 664×40 | left | 1 line, 24 ch | P | LIVE WEBINAR |
| 5 | Title | headline (T5), `text-primary-dark` | 96 | 136 | 664×144 | left, top | 2 lines, 32 ch | P | From CRM chaos to **clean pipeline** |
| 6 | Date and time | subhead, `text-primary-dark` | 96 | 312 | 664×48 | left | 1 line, 30 ch | P | Thu 3 Dec · 15:00 CET |
| 7 | Format line | body, `text-body-dark` | 96 | 368 | 664×48 | left | 1 line, 36 ch | P | Online · 45 min · Free to join |
| 8 | CTA pill | fill `accent-gradient` (angled variant), `radius-pill`; label cta, `text-primary-dark` | 96 | B−72 (480) | auto 240–400 × 72, padding 40 side | label centred | 1 line, 16 ch | P (label) | Save your seat |

The sample date and event are fictional.

## 7. Locked vs editable in Canva

| Level | Canva setting (R1/R3 confirm availability on the plan) | Elements |
| --- | --- | --- |
| Locked (L) | Lock | Backgrounds, accent bars, T3 accent mark, T5 gradient panel, hairlines, logos, T4 progress track, list markers, swipe cue, clear band |
| Editable (P) | Lock position only: text and image content editable, position fixed | Every text slot, the T1 image slot (replace image only), CTA pill labels, chart values and labels |
| Owner-only (O) | Locked; the template owner unlocks and edits | T4 page counter and progress fill (when pages are added or removed); p5 bar lengths, unless R1 finds Canva's native chart element can take them, in which case fillers edit the chart's data table |

## 8. Export spec

| Item | Spec |
| --- | --- |
| PNG | Exact canvas px at 1× (device scale factor 1; Canva size ×1), sRGB, 8-bit RGB, no alpha (flattened on `bg-base`), no transparent background |
| Carousel PDF | 6 pages, each page = canvas: 1080×1350 px (810×1012.5 pt), no bleed, no crop marks, fonts embedded and subset, text live (not outlined), `printBackground` on, zero page margin |
| File names | `addvery-linkedin-<type>-<w>x<h>.png`: `addvery-linkedin-post-1080x1350.png`, `-stat-1080x1080`, `-quote-1080x1080`, `-event-1200x627`; carousel `addvery-linkedin-carousel-1080x1350-p1.png` to `-p6.png` plus `addvery-linkedin-carousel-1080x1350.pdf` |
| Where | `local\exports\` until the brand sign-off, then copied to `exports\`. Stress renders (max-length copy) go to `local\exports\stress\` and are never shipped |

## 9. Checks a reviewer runs on every export

| # | Check | How | Pass |
| --- | --- | --- | --- |
| 1 | Exact dimensions | Read the PNG header; read the PDF page boxes and page count | Matches §1 exactly; PDF has 6 pages at 810×1012.5 pt |
| 2 | Colour space and scale | PNG chunks; render settings | sRGB, no alpha, 1× |
| 3 | Margins on the grid | Overlay a grid PNG (margins, 12 columns, 8px baseline) at 50% | Every block edge on a margin or column line, every y on the baseline, except §2's listed exceptions |
| 4 | No font substitution | HTML: every face loaded before capture; PDF: font list shows only the three font roles, all embedded; Canva: no missing-font warning | No fallback face anywhere |
| 5 | Colour roles | Sample flat fills and compare with the local values | Every element uses its §4 role; no gradient on body, caption or label text |
| 6 | Contrast | Compute each text/background pair | Body ≥ 7:1; gradient text only at ≥ 56px; CTA label ≥ 3:1 at its worst point |
| 7 | Legibility at phone width | Downscale to 390px wide, view at 100% on a phone or a 390px browser window | Every text slot readable without zoom; no text below §3's floors |
| 8 | Safe zones | Overlay the §2 safe-zone mask | Nothing must-read outside the content box; T4 band y ≥ 1176 empty; T5 text inside 96 / 72 |
| 9 | Max lines | Render each template with max-length stress copy | No slot exceeds its max lines; no overflow, clipping or collision; no single-word last line in a headline |
| 10 | Logo | Measure the placed logo | Aspect 3.70:1 (±1px), `logo-white`, on `bg-base` or the gradient, §5 size and clear space |
| 11 | Content | Read every slot | No real person's name, photo or quote; every stat or chart number says "Illustrative" in its source line |
| 12 | Names | File and template names | Match §1 and §8 |
| 13 | Public repo | Search every tracked file this spec touches | No colour values, font family names or Canva links |
