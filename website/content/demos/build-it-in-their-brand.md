---
title: "Build it in their brand"
slug: "build-it-in-their-brand"
description: "Outreach built in the prospect's own brand proves at a glance it wasn't sent to everyone, and since a company's website hands over most of its brand guide, an agent can pull it in about an hour."
author: "Alex Alderman"
date: "2026-11-02"
status: "published"
kind: "showcase"
library_id: "art-build-it-in-their-brand"
group: "How the day went"
cover:
  kicker: "How the day went"
  subtitle: "Nobody mass-sends a page in your brand with your colleagues' names on it."
  accent: "their brand"
tags: ["branding", "personalisation"]
reading_minutes: 4
---
Nobody mass-sends a page in your brand with your colleagues' names on it.

This site is built in Addvery's own colors, type and motion, with a personal page for each of six people there. It's in your branding, not mine, for a reason.

**I build outreach in the prospect's own brand, so they can see it wasn't sent to everyone before they read a word.** And it's cheap now, because every company already publishes most of its brand guide. It's called their website.

## Shotgun blasting used to be the right call

Before AI, outreach was a trade between personalization and volume. You could do heavy research, but that took so long you kept it to your key accounts. Or you shotgun blasted everyone. Most people ended up in the middle or with the shotgun, and at the time the shotgun was actually correct.

People always knew which one they were getting. A first name in line one proves nothing. Time spent on you specifically was the costly signal. What's new is that you don't have to pick anymore. Once it's automated, it looks costly, and it isn't.

## Your website hands over most of your brand guide

Your website sends every visitor's browser your colors, fonts, spacing, buttons and images. That's not the brand PDF. **That's the brand in action, 90%+ of the guide, and an AI agent can copy it.**

At about 15:30 on build day, I told the AI building this site to make it "as cloned as possible to the Addvery website", copied from the site itself, not guessed.

It went through 7 of addvery.com's pages at four screen sizes, from desktop down to phone, and wrote down the exact look of everything on screen, down to the 1,129 animation triggers.

The new look was done at 16:30. About an hour. Out came 225 lines of brand rules: the blacks, the violet-to-orchid gradient, text sizes for every screen, the spacing, the 10-pixel rounded corners, and the way images rotate in as you scroll, to the degree. (-20, -10 and +8. No really.)

> [!figure] /demos-assets/build-it-in-their-brand/addvery-brand-tokens.png
> Addvery's colors, gradients and fonts, as pulled from addvery.com

The rough edge is fonts. Two of Addvery's fonts are free, so they're exact. The headline font is licensed, so a free lookalike stands in, at maybe 80 to 85% of the look. That's the gap in the last 10%, and like staff photos and client logos, you shouldn't take it anyway.

## The design is locked, the AI writes the words

I worked the method out on [an earlier project](https://github.com/alderman-ai/pixel-perfect-branded-assets-demo), built over 17 days for the AI Marketing Meetup Apify hosted in Prague on 17 September. It ran live in front of about 200 marketers: LinkedIn speaker cards in Apify's brand, with no brand kit and no design files... asked for.

The background is one fixed image with two colored blocks marking where things go. The card in the big block is Apify's own card from their website, rebuilt from its code and checked against the live site to 0.001 pixels.

> [!figure] /demos-assets/build-it-in-their-brand/backdrop-and-finished-card.png
> The empty background with its two placeholder blocks, beside the finished card

**The design never changes. The AI only gets the words**, and each one is counted before it goes on the card: 30 characters for the name, 39 for role and company, 26 for the topic, 115 for the blurb.

> [!figure] /demos-assets/build-it-in-their-brand/card-field-mapping.png
> What the AI writes, where it lands, and its character limit

Over the limit, the run stops instead of trimming, because a silent fix ships looking almost right and nobody notices until it's public. And the limits are measured, not guessed: at 140 characters, a test card shipped cut off mid-sentence at 116 while a 128-character blurb fit fine. 115 is the longest that actually fits.

## What this does for your outreach

Once the design is locked, the next card costs a filled-in form and one look to check it. Pull a company's brand once, and every stakeholder gets their own words in a layout that never moves. At the meetup rehearsal, four cards for the same speaker came back with four different blurbs and topics, and one identical layout. **Different words for every person, the same brand to the pixel.**

Everyone's blasting out AI: low quality, high volume. The space is for work so good they think you spent three days building it just for them, when an agent ran in the background for a couple of hours.

I can't do it to 30 companies a day. Yet. What I built is reusable, so a new company would take half the time.

Imagine your conversion rate if this is how you reached out to everyone in your CRM.

The first one took me 17 days. This site's look took about an hour.
