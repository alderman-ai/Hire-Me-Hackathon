---
System Primitive: Operator task
Task type: Gate approval
Task id: OT-12
Task State: Open
Gate: S-D1 D1 section sign-off (folds in OT-06, the spec-draft gate, which was still open)
Requested by: s-d1-scraping
Snapshot of: scraping\draft\d1.md (git-ignored) at SHA-256 ba90188843d5
Unblocks: the site's scraping page going live (BUILD S-D1-B1 to the website session)
Created: 2026-11-02 16:38 Prague
---

# Approve: what the scraping page on the site shows

## What this is

**About 5 minutes: read the page below and tick, or write changes. This one task covers everything for the scraping page. You can skip "Approve - the scraping demo plan": ticking here approves that plan too, with the defaults described below. If you've already answered it, that answer stands.**

**What this part of the project is.** One of the site's demos shows web scraping and research on Apify. Your research session scraped Addvery and wrote a summary of the outputs, and this session turned that summary into one short page. This is the whole page, exactly as it would go live.

**What you're asked.** Read the page (it's embedded below and takes about a minute), then tick to publish it as it stands. Or write changes in the feedback section at the bottom. If you tick and also write something there, both apply: the page goes live with your changes made.

**What happens once you answer.** The page is copied into the public repo and sent to the website session to build, in Addvery's look, as its own page linked from demo 1 in "What's being built today". That takes about 30 minutes. Nothing from your Addvery research folder reaches the repo or the site before you tick.

**What's waiting on it.** The scraping demo's last step: the page on the live site.

**Deadline.** 18:00 Prague, to go live today. If it's still open at 18:00, it stays open for tomorrow morning's cleanup session, and nothing goes on the site.

## In five lines

1. The result comes first: one line on what was read and what it cost, then three findings about Addvery at company level, each with the kind of source it came from (its website or the press).
2. Three steps on how it worked. They say truthfully that agents read the website, the register and the press directly, and that the Apify scrapers read YouTube and public LinkedIn pages.
3. A folded "Show me how" part, with the Apify scrapers named and linked, their results, time and cost, the totals against your $10 cap, the cleaning, and what broke and how it was handled.
4. No person is named. No LinkedIn data is shown, only that LinkedIn was read and why. Nothing is near the Apify proposal, and there's no raw data.
5. Two closing lines in your voice: that this is part of your application, and that you directed the work.

## Points to check, each with what's in the page now

- **LinkedIn, the most sensitive line.** The page has one combined row naming the three LinkedIn scrapers, with their total results, time and cost. It says, by role and with no names, whose public pages they read, and that the results were used only to choose whom to write to. A fresh agent reading the page cold flagged that an itemised version, one row per scraper with what each read, could feel creepy to Addvery's staff, so it's combined. To change it, write "LinkedIn: itemise" for one row per scraper, or "LinkedIn: hide" to drop the LinkedIn row (the totals then cover only the YouTube scrapers, and the page says LinkedIn research was done for the outreach demo).
- **The title.** It's "What scraping public sources told me about Addvery". To switch, write "title 2" for "How I researched Addvery before writing to you".
- **Your two closing lines** are written in your voice. Rewrite them in the feedback section if they aren't how you'd say it.
- **The plan's other choices, with their defaults applied:**
  - No new Apify run. Write "crawl: yes" to have your research session crawl Addvery's website on Apify for cents; the page then gains one row and you see that change before it goes live.
  - No line naming Clay, because nothing was merged into one record.
  - No video.
- **Left out:** the line on the separate labelling model your research session used. It isn't an Apify scraper, and naming the company behind it is your call. Write "labelling: add" to put one line back in the folded part.
- **Before it went to you:** a fresh agent that knew nothing about the project read the page cold. It got the point, the findings and the next step. Its problems are fixed: unclear authorship, jargon, a total that looked double-counted, and a line that seemed to contradict "no personal data". That's a stand-in for a test with real readers, not the test itself.

## What's being approved

The page exactly as it stands, at SHA-256 `ba90188843d5`. It lives in `scraping\draft\d1.md`, which the repo ignores, so it never enters the public repo before you approve it. The notes in angle brackets are layout hints for the website; they don't show on the page.

![[scraping/draft/d1.md]]

## Approval

- [ ] I approve

Tick the box to approve as it stands. If something has to change first, leave the box empty and write what to change below. If you tick and also write below, both apply. Either way, the requesting session checks this file every 5 minutes while it's blocked.

`<operator_answer>`
```ot-12-changes

```
`</operator_answer>`
