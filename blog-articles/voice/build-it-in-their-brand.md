---
title: "Build it in their brand"
summary: "Nobody mass-sends a page in your brand with your colleagues' names on it. That proof used to be expensive. Now your website hands over 90%+ of your brand guide, and an agent can pull it in about an hour."
read_minutes: 4
sources:
  - "orchestration/local/copy/pixel-perfect-notes.md (the research notes, facts with file paths, git-ignored)"
  - "github.com/alderman-ai/pixel-perfect-branded-assets-demo (public README, demo-and-more-help/ pages, _internal/ render shell, skills and core-templates README)"
  - "OBS/Processed/S09_2026-11-02_1517/transcript/S09.md (H+05:00:10 to H+05:04:34, his re-skin instruction)"
  - "OBS/Processed/S02_2026-11-02_1106/transcript/S02.md (H+00:44:31 to H+00:47:24, personalization vs volume, the costly signal)"
  - "website/app/addvery-tokens.css, website/app/layout.tsx, website/SPEC.md decision log, commit 4a8099f (the re-skin, 2 Nov 16:30)"
  - "website/local/addvery/brand/BRAND.md and frontend/motion.md (how the brand was pulled from addvery.com, git-ignored)"
  - "RULES.md (his 20:45 conversion-rate line) and orchestration/local/ALEX-WANTS.md W84, W89 (git-ignored)"
grade: "Good"
failed_ids: "LEN-27"
attempts: 3
attempt_used: 2
alex_markers: 0
fact_markers: 0
figure_slots: 3
run_log: ".claude/skills/alex-voice/local/runs/2026-11-03-27-own-brand/log.md (git-ignored)"
status: "voice pass, not published"
note: "W89. Grades: Unpublishable (FACT-37: a wrong budget history), Good (LEN-27), Good (LEN-27, GATE-11); attempt 3 delivered under the latest-among-ties rule. Names none of the six and quotes nothing from Addvery Research. Apify appears only as the public meetup host and the brand of the public repo; no proposal, pricing or deal. The word 'demo' appears only inside the repo's URL and a figure path. Figure slots are for the site's team; the field-map path is relative to the repo's demo-and-more-help folder."
orchestration_edit: "3 Nov: orchestration chose attempt 2 (Good, failed only LEN-27) over attempt 3; it keeps Alex's own line and the Krtecek anecdote"
---
Nobody mass-sends a page in your brand with your colleagues' names on it. This site is built in Addvery's own colors, type scale and motion, with a personal page for each of six people there, and that's the whole argument.

**Content in the prospect's own brand is personalization you can see before you read a word.** And it's cheap now, because every company already publishes most of its brand guide. It's called their website.

## The costly signal got cheap

Before AI, outreach was a trade between personalization and volume. You could do heavy research, but that took so long you kept it to your key accounts. Or you shotgun blasted everyone. Most people ended up in the middle or with the shotgun, and at the time the shotgun was actually correct.

People always knew which one they were getting. A first name in line one proves nothing. Time spent on you specifically was the costly signal, and a page in your brand with your people on it shows that at a glance. What changed is what it costs me to make one.

## Your frontend is your brand guide, and it's public

Every website ships its CSS, fonts, colors, spacing, components and images to every visitor's browser. That's not the brand PDF. **That's the brand in action, 90%+ of the guide, and an agent can pull it.**

At about 15:30 on build day, I told the agent running this site to make it "as cloned as possible to the Addvery website" and to "scrape as much of the front end code as you can", and "not just go by training data of how to pull a design system".

Its subagents fetched 7 pages and the site's one stylesheet and parsed every rule. They rendered each page in a headless browser (no window, the agent drives it) at four widths from 1440 down to 390 pixels, scrolled through so the entrance animations finished, read the computed style of every visible element, hovered real elements to diff their styles, and parsed 1,129 animation events out of the site's JavaScript.

The re-skin landed at 16:30. About an hour. Out came 225 lines of brand tokens: the black and #151515 neutrals, the violet-to-orchid gradient, a type scale per screen size, spacing from 4 to 120 pixels, 10-pixel corners, and the rotate-in on images, to the degree. (-20, -10 and +8. No really.)

[figure: Addvery's brand tokens as pulled from addvery.com, shown as color swatches and type specimens | website/app/addvery-tokens.css]

The rough edge is fonts. Two of Addvery's web fonts are open Google Fonts, so they're exact. The headline face is commercial, so Inter Tight stands in, at maybe 80 to 85% of the look. That's the gap in the last 10%, and like staff photos and client logos, you shouldn't take it anyway.

## Code the brand, let the model write the words

I worked the method out on my [pixel-perfect branded assets repo](https://github.com/alderman-ai/pixel-perfect-branded-assets-demo), built over 17 days for the AI Marketing Meetup Apify hosted in Prague on 17 September. It ran live in front of about 200 marketers: LinkedIn speaker cards in Apify's brand, with no brand kit and no design assets... asked for.

A fixed 1200x1200 backdrop holds two colored placeholder blocks. I measured where they sit once and froze it as eight numbers: the slot map. The card in the big block is Apify's own store card, rebuilt from the site's CSS and checked box-for-box against the live site to 0.001 pixels, quirks included, because the quirks make the heights come out right. The fonts are the ones apify.com serves, and even the starfield is their own particle pattern.

[figure: the empty backdrop with its two placeholder blocks, beside the finished card | pixel-perfect repo: _internal/core-templates-please-dont-touch/speaker-teaser-linkedin_v4.png and generated-images/alex-alderman-final.png]

The agent fills 26 placeholders in one HTML page, and the browser takes one screenshot. **The brand is code. The model only gets the words**, each counted before it touches the layout: 30 characters for the name, 39 for role and company, 26 for the topic, 115 for the blurb. Over budget, the run stops. It never trims or stretches, because a silent fix ships looking almost right and nobody notices until it's public.

[figure: the card's field map: what the model writes, where it lands and its character limit | pixel-perfect repo: filling-in-the-form/Actor card field mapping.png]

## What was hard

The blurb budget was 140 characters when a stress test (ten speakers, two agents reading the docs cold) shipped a card clipped mid-sentence. A 116-character blurb clipped while a 128-character one fit: a character count is only a proxy for fit. The budget went 82, 140, 100 and landed on 115, found by binary-searching the longest string that actually renders.

The green placeholder matched the green in Apify's own logo, so reading the block by color came back three times too big. I deleted the color reading and froze the numbers.

And one agent spent three overnight hours worrying about being sued by the Krteček people (the Czech cartoon mole). Which is how I ended up copyright krt-ection claused.

## Why it matters for outreach

Once the brand is code, the next card costs a form fill, a page fill, a screenshot and a look. Pull the brand once per company, and every stakeholder gets their own words in a layout that never moves. At rehearsal, four parallel builds for one name came back with four different blurbs and topics, and one identical layout. **Different words for every person, the same brand to the pixel.**

This site is that, built once, live: almost like a personal website made just for each of them. I can't do it to 30 companies a day. Yet. The skills are reusable, so the next one would take half the time.

Imagine your conversion rate if this is how you reached out to everyone in your CRM.

The first one took me 17 days. This site's skin took about an hour.
