# How the site gets built

Alex's rules for everything on https://hire-me-hackathon.vercel.app, from what he said on 2 Nov. Every session and every subagent that builds, writes or places anything for the site reads this first. Where an older plan, spec or mockup disagrees, this file wins. Kept by `orchestration`.

**Status: draft, 20:45 on 2 Nov.** Every rule is in Alex's own words or follows from them; it becomes final when he says yes to it.

## What the site is for

Alex, 20:45 on 2 Nov:
- **Past "watch me build in public".** People will look at it after the fact, and they need proof it was built really well.
- **Demonstrations of everything he can do, most importantly filtering ICPs.**
- **The reusable skills:** "it took me 12 hours today but here's all of the skills that we built that are reusable."
- **Thought leadership** drawn from everything he talked about on the recordings.
- **"Almost like a personal website but made just for them."**
- **The selling point:** "Imagine your conversion rate if this is how you reached out to everyone in your CRM. Not only is it possible but the ROI would be unbelievable."

## The rules

1. **The live site is the only version.** No more mockups. Changes go on a private preview link as real pages, and Alex sees them there before they go live.
2. **No writing without the copywriting skill.** Every word a visitor reads is drafted with `alex-voice` (in `.claude\skills\`), from Alex's own transcripts and posts, never written from scratch. Generic marketing skills don't count. Alex does the last 10%.
3. **Talk like a person.** First person, casual and direct. Never stiff or formal, and never "Alex Alderman would..." about himself on his own site.
4. **Articles are the main content.** Demos, lessons and rants become blog posts. A strong clip becomes an entry with the video on top and a summary below.
5. **Recommend articles, never demos.** A "recommended for you" carousel of articles, drawn from one list (the content library), on the home page and on each personal page. No "watch demo 1, 7 and 9", no reading lists of demos, no minute counters.
6. **Show the work.** Screenshots, images and video carry the story: the whole LinkedIn wall with its images, and a wall of videos.
7. **Nothing of Alex's gets filtered out without asking him.** His LinkedIn wall shows every post, edgy ones included (20:45).
8. **One thing in front of Alex at a time, as the real thing.** Never a block of text to review, and never a status mockup.
9. **Easy calls get made for him.** Only taste, and facts about him, go to him.
10. **Public information never stops the work.** What stays off the site: secrets, the Apify proposal, and his own GetSales outbound outside the demo folder (charter, DoD-22).

## The people the site is for

The six at Addvery each have their own page. Some of them know Alex personally, so a page or a note must sound like it's from someone they know, never like a cold pitch. Ask `orchestration` for the context on a person before writing to them.

## Where things are

- **Content library:** every piece of content that exists, listed and described: `orchestration\local\library\` (git-ignored, on this machine). `written.md`, `video.md` and `skills.md` for reading; the `.json` files for looking up ids. `live-site.md` is what's live, page by page.
- **Alex's verbatim wants:** `orchestration\local\ALEX-WANTS.md` (git-ignored, on this machine only).
- **The copywriting skill:** `.claude\skills\alex-voice\` (load it with the Skill tool as `alex-voice`).
