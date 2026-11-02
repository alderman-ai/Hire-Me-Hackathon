# Blog post format

Post format v1.5, 2 Nov 2026 (v1.5: figures, `[!figure]`, and the `made` box required only for articles; v1.4: block quotes of Alex's own recorded words, `[!quote]`, and pull quotes optional, from Alex at about 18:15: "pull lots of quotes ... the way people insert block quotes"; v1.3: video clips inline between sections, `[!video]`, for the site's shared entries; v1.2: the site's shared entry fields `kind`, `deliverable`, `video` and `poster`, titles at most 64 characters and kickers at most 28, from `website`'s BUILT S-D5-B1; v1.1: key points on by default, a diagram block, pull quotes hidden from screen readers, a per-post link-preview image; from the blog research, L-03 R4) · Owner: S-D5 (`blog-pipeline\`, since S-D4 retired) · Used by: the pipeline's Format and Scan stages, S-D5's publish step, and `website`, which builds the template from it

Every blog post is one Markdown file: a block of front matter that says what the post is, then the post itself in plain Markdown with four small additions: pull quotes, a key-points box, an optional diagram and notes left for Alex. The pipeline writes the file, Alex finishes it, and the site renders it as it is. This document is the contract between them. A file that passes the checklist in §6 must render; anything this document doesn't define is a validation failure, not something to guess at. The posts are Alex Alderman's, in his name and voice. The site styles them in its own look, but they are never written as a company's posts.

## 1. The file

- One `.md` file per post, UTF-8 without a BOM, LF line endings (CRLF is tolerated and normalised).
- Line 1 is `---`, then the YAML front matter, then a line `---`, then the body. Nothing comes before the first `---`.
- The site takes the slug from the front matter, never from the file name.

| Who writes it | Path | Status |
| --- | --- | --- |
| S-D4's pipeline (the test run) | `blog-pipeline\drafts\<id>\post.md`, `<id>` = `T-01`, ... | `draft`, then `near-final` |
| S-D5's pipeline runs | `blog-articles\drafts\A-0<n>\post.md` | `draft`, then `near-final` |
| S-D5's finished posts | `blog-articles\posts\<nn>-<slug>.md` | `published` |
| The site (suggested; `website` decides) | `website\content\blog\<slug>.md` | as copied in |
| The template's test file | `blog-pipeline\samples\sample-post.md` | `sample` |

**Who sets what.**
- The Format stage writes every field, with `status: "draft"`, `date` set to the dictation's date and `share_changed_by_alex: null`.
- When the Scan stage passes, it sets `status: "near-final"` and changes nothing else. This is the version Alex reviews on a preview, and the one the changed share is measured against.
- The publish step (S-D5) sets `status: "published"`, sets `date` to the publish day, fills `share_changed_by_alex`, and recomputes `reading_minutes` from the final body. It refuses to publish while any `[Alex: ...]` note is left (§3.4).

## 2. Front matter

```yaml
---
title: "How to run a fifteen-minute weekly review"
slug: "how-to-run-a-fifteen-minute-weekly-review"
description: "A weekly review only lasts if it fits a bad week. Here is a fifteen-minute version: one card of questions, a timer, and three things for next week."
author: "Alex Alderman"
date: "2026-11-02"
status: "near-final"
kind: "article"
deliverable: "d5"
cover:
  kicker: "Everyday systems"
  title_lines: ["How to run a fifteen-minute", "weekly review"]
  subtitle: "One card of questions, one timer and three choices for the week ahead."
  accent: "fifteen-minute"
tags: ["habits", "planning"]
reading_minutes: 5
made:
  minutes_talked: 15
  words_spoken: 2140
  words_drafted: 1093
  share_changed_by_alex: null
  dictated: "2026-11-02T15:15"
  rig_session: "S08"
  pipeline: "blog pipeline v1"
  stages: ["clean", "extract", "outline", "draft", "edit", "format", "scan"]
  checks: ["edit", "scan"]
---
```

**YAML rules.** Keys in exactly this order. Two-space indent. Every string double-quoted (this keeps dates as strings, which YAML parsers otherwise turn into Date objects), lists in `[...]` flow style, numbers and `null` bare. No comments and no other keys. Pull quotes are not a field: they live in the body.

| Field | Type | Req. | Rule |
| --- | --- | --- | --- |
| `title` | string | yes | Plain text, sentence case, at most 64 characters (the site's link-preview image fails its build when a title needs four lines), no end period, no Markdown, no note for Alex. |
| `slug` | string | yes | From the title: lowercase, accents to ASCII, `&` to `and`, apostrophes dropped, every other run of characters outside `a-z0-9` becomes `-`, ends trimmed. Over 60 characters, cut at the last `-` before character 61. Must match `^[a-z0-9]+(-[a-z0-9]+)*$`, be unique on the site, and never change once published. |
| `description` | string | yes | The meta description: 140 to 160 characters (counted after YAML parsing), one or two plain sentences ending in a period, no Markdown, no note for Alex, not a copy of `cover.subtitle`. |
| `author` | string | yes | Always exactly `Alex Alderman`. |
| `date` | string | yes | `YYYY-MM-DD`. The dictation's date until the publish step sets the publish day. |
| `status` | string | yes | One of `draft` (the Format stage wrote it; the scan hasn't passed), `near-final` (the scan passed; what Alex reviews), `published` (set only by the publish step), `sample` (a template test file, never published). |
| `kind` | string | no | The site's entry kind: `article` (the default, and every blog post from a dictation), `video` or `showcase` (a piece built from existing work rather than a dictation; it may leave out `made`). The site keeps one template for every entry in its GTM demos section (`/demos`). |
| `deliverable` | string | no | The project deliverable the entry belongs to, `d1` to `d11`; the site links it at the end and shows it in the index row. Blog posts use `d5`. |
| `video.youtube_id`, `video.start` | map | no | Only for `kind: "video"`, where it's required: the 11-character YouTube id and an optional start in seconds. Never on a blog post. |
| `poster` | string | no | An image path under the site's `public\` or an https URL. Video entries default to the YouTube thumbnail; blog posts leave it out. |
| `cover.kicker` | string | yes | The cover's eyebrow line: 1 to 4 words, at most 28 characters, no end punctuation. The site's preview image prefixes it with "GTM demos · " when that fits. |
| `cover.title_lines` | list of strings | no | Manual line breaks for the cover title, 2 to 4 lines. Joined with single spaces they must equal `title` exactly. Leave the key out to let the renderer balance the lines. |
| `cover.subtitle` | string | yes | The one-line promise from the Outline stage: one sentence, at most 120 characters, ending in a period. |
| `cover.accent` | string | no | A word or phrase that occurs exactly once in `title` (case-sensitive) and inside a single `title_lines` entry. The cover sets it in the site's accent colour. |
| `tags` | list of strings | yes | 1 to 3 tags, lowercase, kebab-case. |
| `reading_minutes` | integer | yes | Body words (rule below) divided by 230, rounded up, at least 1. |
| `made.minutes_talked` | integer | yes | The dictation's length in whole minutes, rounded to the nearest, from Wispr Flow's or the rig's times. |
| `made.words_spoken` | integer | yes | Words in the raw dictation (`dictations\<id>.md`, the dictated text only). |
| `made.words_drafted` | integer | yes | Body words of the post as the pipeline finished it. Never changed after the Format stage. |
| `made.share_changed_by_alex` | integer or null | yes | `null` until Alex's finished version exists, then the whole percent (0 to 100) of drafted words he changed, from the changed-share script in `scripts\`. |
| `made.dictated` | string | yes | When the dictation started, Prague local time, `YYYY-MM-DDTHH:MM`. |
| `made.rig_session` | string or null | yes, may be null | The rig session that filmed the dictation (`S` and two digits, such as `S08`), so a visitor can find the video; `null` if none. |
| `made.pipeline` | string | yes | `blog pipeline v<n>`: the `PIPELINE.md` version that ran. |
| `made.stages` | list of strings | yes | Every stage in the order it ran, lowercase, 1 to 3 words each, as `PIPELINE.md` names them. |
| `made.checks` | list of strings | yes | The stages from `stages` that check the work rather than write it, in the same order, at least one. In the draft method: `edit` (traces every claim to the dictation) and `scan` (secrets and names). `PIPELINE.md` marks them. |

**Word count.** One rule for `reading_minutes`, `words_spoken`, `words_drafted` and the changed share: split on whitespace and count the tokens that contain at least one letter or digit. For a post, count the body only, after removing HTML comments, link URLs (keep the link text), the tags `[!pull]`, `[!summary]` and `[!diagram]` with its kind word (`scale` or `flow`), list numbers such as `1.`, and pull-quote blocks (they repeat body text). Notes for Alex and the diagram's caption and labels count.

## 3. The body

### 3.1 Structure

In this order:
1. Optional HTML comment lines, only directly after the front matter. They are never rendered.
2. **The lede:** 1 to 3 paragraphs before the first heading. No heading above it: the title comes from the front matter.
3. The **key-points box** (§3.3), directly before the first `##`. On by default: leave it out only when the post has no three claims that stand alone.
4. **4 to 6 sections**, each starting with `## Heading` and its first paragraph. A section may hold up to two `### Sub-heading`s, only after its first paragraph, and the post may hold one **diagram** (§3.5) inside a section. Nothing deeper.
5. The last section ends the post. No sign-off, author bio or "How this post was made" text: the template adds those.

**Headings.** Plain text, sentence case, at most 60 characters, unique in the post. No links, emphasis or notes for Alex.

**Paragraphs.** 1 to 4 sentences each, separated by one blank line.

**Allowed.** Paragraphs; `##` and `###` headings; bulleted lists with `-` and numbered lists with `1.`, `2.`, `3.` (no nesting, one blank line before and after); GFM tables with a header row and at most 4 columns; `*italic*` and `**bold**` (asterisks only); inline links `[text](https://...)` or site links `[text](/blog/...)`, with descriptive text, never "here"; inline `code` and fenced code blocks with a language tag; the callouts and notes in §3.2 to §3.4.

**Not allowed.** `#` (H1) and `####` or deeper; underlined (setext) headings; images of any kind; raw HTML except comments; plain blockquotes (every blockquote is a callout); horizontal rules; footnotes; task lists; strikethrough; reference-style links; bare URLs.

The callouts use the GitHub alert form, so they degrade gracefully: Obsidian, where Alex edits, shows them as callouts, and GitHub or any plain Markdown viewer shows a quote with a `[!pull]` line on top.

### 3.2 Pull quote

```markdown
> [!pull]
> A review that needs an hour loses to almost anything else you could do with that hour.
```

- The first line is exactly `> [!pull]`, lowercase, nothing else on it. Then one line `> ` plus the quote: one paragraph, 8 to 30 words, plain text (no links, no notes for Alex, no emphasis).
- It repeats one or two whole consecutive sentences from a body paragraph, word for word. Checked after removing `*` emphasis, straightening curly quotes and collapsing whitespace.
- 0 to 3 per post (optional since v1.4, when block quotes carry his voice), at most one per section. No attribution: the post is Alex's.
- Placement: between two blocks, inside the section that holds its sentence or the next one, never directly before or after the paragraph it quotes, never in the lede, never as the post's last block.

### 3.7 Block quote: Alex's own words (0 to 5)

```markdown
> [!quote]
> The models always change, so somebody has to keep the thing running.
> Alex Alderman, on camera during the hackathon, 2 Nov 2026
```

- The first line is exactly `> [!quote]`. The second is the quotation: one paragraph of 8 to 60 words that Alex said aloud on the recordings or typed himself, word for word as the cleaned source has it (fillers such as "um" and "like" removed, nothing reworded). No quotation marks, links, emphasis or notes for Alex.
- The third and last line is the attribution: `Alex Alderman, ` then where and when, at most 80 characters, no end period: "on camera during the hackathon, 2 Nov 2026", "in a message to his AI agents, 2 Nov 2026", "in his notes, 2 Nov 2026".
- Unlike a pull quote it adds words rather than repeating them: the quoted line isn't also in the prose next to it. The template sets it as a real `blockquote` with its attribution as a caption, larger than body text and read by screen readers.
- 0 to 5 per post, at most two per section, never the post's last block. One may sit in the lede, after its first paragraph.
- Pick lines that carry a point better in his own voice than in prose: a vivid claim, a turn of phrase, a hard-won lesson. Never a line that names a client, a private number or anything the scan keeps off.

### 3.8 Figure (0 to 8)

```markdown
> [!figure] /demos-assets/how-taste-gets-captured/silhouettes-pair-1.svg
> Two post shapes side by side: A has a short hook and air below it, B is a wall of full-width lines
> Pair 1: the eye picks A before reading a word
```

- The first line is `> [!figure] ` and the image's site path: `/demos-assets/<slug>/<file>`, a `.svg`, `.png` or `.webp`. Until publishing, the file sits in `blog-articles\posts\assets\<slug>\<file>`; the publish request asks `website` to copy that folder to `website\public\demos-assets\<slug>\`.
- The second line is the alt text: what the image shows, 10 to 160 characters, plain text. Required.
- An optional third line is the caption shown under it, at most 140 characters.
- 0 to 8 per entry, never the entry's last block. Use one only where a picture shows something words can't; a diagram from text (§3.5) comes first where it can do the job.

### 3.3 Key-points box (on by default, at most one)

```markdown
> [!summary]
> - A weekly review only survives if it is short enough to do on a bad week.
> - Keep the questions on one card, so you never decide what to look at.
```

- The first line is exactly `> [!summary]`. Then 3 to 5 bulleted lines (3 or 4 is best), each one sentence of at most 20 words. Nothing else inside.
- It sits directly before the first `##`. The template titles it "Key points".

### 3.4 Notes for Alex: `[Alex: ...]`

```markdown
My longest early attempt lasted [Alex: how many weeks your first try lasted] before it stopped.
```

- Exactly `[Alex: `, then a short plain-text instruction, then `]`, all on one line. No `[` or `]` inside, no Markdown inside, and never followed directly by `(` or `[`, which would make it a link. Pattern: `\[Alex: [^\[\]\n]+\]`. Any other text starting `[Alex` is malformed.
- The Edit stage leaves one wherever only Alex can add something: a number, a real example, the closing ask. Usually 2 to 5 per post. They are his last 10%.
- Inline in a paragraph, list item or table cell. A note may be a whole paragraph on its own when the whole paragraph is his to write, such as the closing ask. Never in the front matter, a heading, a pull quote, the key-points box or link text.
- **Rendering.** In `draft`, `near-final` and `sample` posts, each note renders as `<mark class="alex-marker">` with "Alex:" in bold, clearly highlighted (§5), and a banner above the post says, for example, "Near-final draft · not published · 3 notes for Alex".
- **Published posts contain none.** The publish step blocks: it refuses to set `status: "published"` while one remains, and never strips them, since stripping would leave a hole where Alex had something to add. As a backstop, the site build fails on a `published` post with a note.

### 3.5 Diagram (optional, at most one)

```markdown
> [!diagram] scale
> Where a company sits on the AI-skill scale
> 1. Build: you design and build your own workflows
> 2. Maintain: you keep others' workflows running as models change
> 3. Use: you run workflows other people built
```

- The first line is exactly `> [!diagram] scale` or `> [!diagram] flow`. `scale` draws the items as a vertical scale, item 1 at the top; `flow` draws them as steps in order, left to right on wide screens.
- The second line is the caption: one plain sentence or phrase, at most 100 characters, no end period needed.
- Then 3 to 6 numbered items, `> 1.` onwards, each `Label` or `Label: note`: a label of 1 to 4 words, an optional note of at most 15 words. Plain text only: no links, emphasis or notes for Alex.
- It draws an idea Alex actually gave (his scale, his steps, his order), never a decoration. Place it between two blocks inside a section, never in the lede and never as the post's last block.
- The template draws it in the site's look from this text, so there's no image and no design step, and its words stay searchable and readable by screen readers.

### 3.6 Video clip (optional, any number)

```markdown
> [!video] AbCdEfGhIjK 754 812
> The first workflow runs on camera
```

- The first line is `> [!video]`, a space, the 11-character YouTube id, then optionally the start second and, after it, the end second: `> [!video] <id>`, `> [!video] <id> <start>` or `> [!video] <id> <start> <end>`, whole seconds, end after start.
- The second line is the caption: one plain sentence or phrase, at most 100 characters, no end period needed. It names what the clip shows; the template also uses it as the player's accessible title.
- Place a clip between two blocks, never in the lede. Any number per entry: a long-form entry can run text, clip, text, clip. A blog post from a dictation normally has none.
- The template embeds it in the site's look as a 16:9 privacy-enhanced YouTube player (`youtube-nocookie.com`), loaded only when it scrolls into view, starting and stopping at the given seconds, with the caption under it.
- Only clips from the project's own published recordings; nothing that shows a secret, the Apify proposal or Alex's own outbound (the scan rules).

## 4. The "How this post was made" box

The template draws it from `made`, after the body and before any footer, under the heading "How this post was made".

**The rule.** The box says that Alex directed the work and that the words are his. It never reads as a bare "AI-generated" label: no "AI-generated", "written by AI" or "made with AI" badge, and no robot or sparkle icon. It shows the work as a pipeline with checks, and the numbers make the case.

**1. Two sentences.**

> Alex talked this post through for {minutes_talked} minutes ({words_spoken} words). The blog pipeline drafted it from his dictation in his words, in {stage count} checked stages ({words_drafted} words); Alex edited and approved it, changing {share_changed_by_alex}% of the words.

While `share_changed_by_alex` is `null`, leave out everything from the semicolon on, and end the second sentence with a period after the closing parenthesis.

**2. The pipeline, as a short visible list** in four steps, always in this order:

1. **Input:** Alex's dictation, {minutes_talked} minutes, {words_spoken} words
2. **Prompts:** the entries of `stages` that aren't in `checks`, in order, joined with " → "
3. **Checks:** the entries of `checks`, in order, joined with " → "
4. **Output:** this post, {words_drafted} words

Stage names show as written, with a capital first letter.

**3. A details line** in smaller type: `Dictated {2 Nov 2026, 15:15} Prague time · {pipeline} · Filmed in session {rig_session}`. Leave out the last part when `rig_session` is `null`. When the site has that session's video, `website` may link the session id to it.

**Formatting.** Numbers of 1,000 and up take a comma (2,140). The stage count is the length of `stages`, as a word from one to nine ("seven") and in digits from 10. Use "1 minute" in the singular.

**Example, finished** (the sample's numbers, share 9):
> Alex talked this post through for 15 minutes (2,140 words). The blog pipeline drafted it from his dictation in his words, in seven checked stages (1,093 words); Alex edited and approved it, changing 9% of the words.
>
> Input: Alex's dictation, 15 minutes, 2,140 words · Prompts: Clean → Extract → Outline → Draft → Format · Checks: Edit → Scan · Output: this post, 1,093 words

**Example, near-final:** "... in seven checked stages (1,093 words)."

## 5. Rendering notes for the template

`website` decides the details; these are the requirements.

- **Match the site.** Today the site is a mid-grey page (`--bg` #808080) in near-black ink (`--ink` #111), system sans-serif type (system-ui, Segoe UI, Roboto) with monospace only for figures, and one accent: the deep red `--live` (#b3001b) of the live dot and status badges. Boxes are 2px ink borders over a light translucent fill (`.start-here`, `.post-highlight`), rules are 1px translucent black, and a `.pull-quote` style already exists (4px ink left rule, 19 to 22px semibold). Build on the CSS variables, so the brand pass in `website`'s SPEC.md §7 restyles the blog with the rest of the site.
- **Contrast.** The red accent on the grey page is under 2:1, so set the cover, accented text and highlights on a light panel (white or near-white, about 7:1 for the red). Never red text straight on #808080.
- **Cover.** Typographic, no image: the kicker small and uppercase with letter-spacing (like `.post-kind`), the title large and bold with tight tracking (`text-wrap: balance`, or `title_lines` as given), the `accent` phrase in the accent colour, the subtitle below it, then the byline.
- **Byline.** "Alex Alderman · 2 Nov 2026 · 5 min read", from `author`, `date` and `reading_minutes`.
- **Measure.** Body text at about 65 to 72 characters a line (`max-width: 68ch`, 18px, line-height about 1.6). The site's 720px feed column at 17px runs nearer 85, too wide for a long read.
- **Heading rhythm.** `##` clearly larger with generous space above (the `.doc h2` and `.doc h3` sizes are a fair start), `###` one step down. Lists, tables and code follow the `.doc` styles.
- **Pull quotes.** Larger than body text (about 24 to 28px) and set apart with space and the ink rule; they may hang wider than the text column on wide screens. No attribution line. Render each as an `aside` (not a `blockquote`, since it quotes no one else) with `aria-hidden="true"`, so screen readers don't read the sentence twice.
- **Diagram.** Drawn in HTML and CSS from the §3.5 text, in the site's look: `scale` as a vertical bar with the items stacked from top to bottom, `flow` as numbered steps with arrows that stack on phones. The caption sits under it. Real text, not an image.
- **Key points.** The `.post-highlight` box, titled "Key points".
- **Notes for Alex.** Ink text on a light accent-tinted fill with an accent border, impossible to miss when Alex scrolls the preview.
- **The made box.** Its own panel after the body; the four steps run as a horizontal flow on wide screens and stack on phones.
- **Index.** `/blog` lists `published` posts newest first by `date` (ties by `title`): title as the link, `cover.subtitle`, date and reading time.
- **Preview only.** A post with any status but `published` never appears on the production index or at a production URL. Previews and production deploy from the same folder, so the status check is what keeps unfinished posts off production: render them only when `VERCEL_ENV` isn't `production` (preview deployments and `next dev`), with the banner from §3.4 and `noindex`.
- **Metadata.** `<title>` from `title`, meta and Open Graph description from `description`, a canonical URL, and Article structured data (JSON-LD: headline, author Alex Alderman, date).
- **Link-preview image.** A per-post `og:image` at 1200 × 630, generated by the site from the `cover` fields (kicker, title or `title_lines`, the accent phrase, the site's colours), for example with Next.js `opengraph-image.tsx` in the post route. No new front-matter field and no image file per post: a post shared on LinkedIn then shows its cover instead of a bare link.
- **Parsing.** `marked` already renders the docs pages. Read the front matter with a YAML parser, find the callouts as blockquotes whose first line is `[!pull]`, `[!summary]` or `[!diagram] <kind>`, and the notes with an inline rule on the §3.4 pattern.

## 6. Validation checklist

A script or a stage checks every post against this list. **F** fails the file; **W** is a warning to report.

1. **F** UTF-8, front matter opens on line 1 and closes with `---`, and parses as YAML.
2. **F** Every required key present, in order, with the right type; no unknown keys; `cover.title_lines` and `cover.accent` may be absent.
3. **F** `author` is `Alex Alderman`; `status` is one of the four values.
4. **F** `slug` matches `^[a-z0-9]+(-[a-z0-9]+)*$` and is at most 60 characters.
5. **F** `description` is 140 to 160 characters; `title` at most 70; `cover.kicker` at most 32; `cover.subtitle` at most 120. None holds a note for Alex or Markdown.
6. **F** `date` is a real `YYYY-MM-DD` date; `made.dictated` is `YYYY-MM-DDTHH:MM`.
7. **F** `cover.title_lines`, if present, joins with single spaces to `title`; `cover.accent`, if present, occurs once in `title` and inside one line.
8. **F** `tags` holds 1 to 3 lowercase kebab-case strings.
9. **F** `reading_minutes` equals body words / 230, rounded up, at least 1.
10. **F** `made` numbers are whole and at least 1; `share_changed_by_alex` is `null` for `draft` and `near-final`, a whole number 0 to 100 for `published`; `rig_session` is `null` or matches `^S\d{2}$`; `stages` is non-empty; `checks` is a non-empty subset of `stages` in the same order.
11. **F** For `draft`, `near-final` and `sample`, `words_drafted` equals the body word count.
12. **F** No `#` heading and no heading deeper than `###` outside code blocks; no setext headings; every `###` sits inside a `##` section after its first paragraph.
13. **F** 4 to 6 `##` sections, and at least one lede paragraph before the first.
14. **F** No raw HTML but comments; no images (`![`); no bare URLs, reference links, footnotes, task lists, strikethrough or horizontal rules.
15. **F** Every blockquote opens with `[!pull]`, `[!summary]` or `[!diagram] scale|flow`. 1 to 3 pull quotes, at most one per section, none in the lede, none as the last block, none directly next to the paragraph it quotes. At most one key-points box, directly before the first `##`, holding 3 to 5 bullets. At most one diagram, inside a section and not its last block, with a caption of at most 100 characters and 3 to 6 numbered items, each a 1-to-4-word label with an optional note of at most 15 words, no links, emphasis or notes for Alex.
16. **F** Every pull quote's text occurs word for word in the body outside pull quotes (after the normalising in §3.2), and holds no note, link or emphasis.
17. **F** Every `[Alex` is a well-formed note; none sits in the front matter, a heading, a callout or link text.
18. **F** `status: "published"` and any note for Alex: never.
19. **W** A paragraph over 4 sentences; a pull quote outside 8 to 30 words; more than 5 notes for Alex; a link that isn't `https://` or site-relative.
20. **W** Body words outside 900 to 1,400 (the Draft stage's target).
21. **W** No key-points box (it's on by default, §3.3).
