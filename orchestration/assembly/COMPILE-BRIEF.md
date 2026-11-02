# Compilation brief: which pieces combine into which entries

Written by `orchestration` at about 22:05 on 2 Nov, for two compiler agents and their judge. This is step 5b of the handover: the site's structure is settled (`VERDICT.md`), the clip moments have side cards, and now the pieces get combined into the entries a visitor reads.

Alex, 21:23 (W33 to W35 in `ALEX-WANTS.md`):

> Let's not automatically assume that we're going to do 14 or 24 videos just because I think a lot of them are going to be kind of glued back together but we'll see. It's still an open question.
>
> Basically take anything that was a "yes" or a "great" and define it or make it legible, like put a little side card next to it. That way an agent, when it builds, can look at all the content pieces and decide what goes together. It can semantically connect it to other things ...
>
> Yes or great just means it's acceptable and greats win ties over yeses but it doesn't necessarily mean that every single one of them will become content
>
> And I think a lot of content entries will be text interspersed with videos or a video, basically where you have the written and the video version. Or sometimes a great video will just be extracted as text and turned into an article, maybe with the video on top of it, but the text going more in depth than the video. There are lots of different ways for it. We haven't rigidly defined what it will be

## Read first

1. `RULES.md` at the repo root: what the site is for, and the ten rules. They win.
2. `orchestration\local\ALEX-WANTS.md`: his words tonight (W4, W8, W9, W17, W18, W27 to W35 matter most here).
3. `orchestration\assembly\VERDICT.md`: the site's structure. Read 2.2 (site map), 2.3 (the entry template, the capability pieces C1 to C7, the clip-article list it proposed before the cards existed), 2.4 (the seven recommended lists), 2.6 (`/skills`) and the `/videos` rows. Your entries slot into this structure; you don't redesign it.
4. **The side cards:** `legibility\cards\INDEX.md` (the theme vocabulary, every card in one table, and the clusters), `legibility\cards\cards.json` (the same data), and the card files for anything you place. Each card has the gist, his exact words, themes, related pieces, what it could serve as, watch-outs and how well it stands alone.
5. **The written pieces:** `blog-articles\voice\INDEX.md` and the six articles there (drafted in his voice tonight, each with `[Alex: ...]` markers for his last 10%); `legibility\clip-articles\_drafts\` (19 clip summaries written before the cards, graded Good); the library `orchestration\local\library\written.json`, `video.json`, `skills.json` (every id, with a description).
6. `orchestration\local\audit\NUGGETS.md` (his 45 best nuggets, top 15 ranked) and `SPOKEN-WANTS.md`.
7. Grades: `legibility\grading\grades.jsonl` (use `effective_grades()` in `legibility\grading\grades_lib.py`). Greats win ties over Yeses; M and N are out.
8. What `website` can already do: the entry template (`/demos/<slug>`: video on top played from a session video by start and end time, body with `[!quote]`, `[!video]` and `[!figure]` blocks, "Next for you") and the `/videos` wall. A moment needs no cut: it plays by start and end.

## What you produce

One file, `orchestration\assembly\compile-<letter>.md`:

1. **The entries,** ranked by how much they serve the site's goal. For each:
   - a slug and a working title (a description, not copy);
   - its **one point**, in a sentence;
   - its **shape**: an article with clips between its sections; a clip on top with a summary below; a written and a video version; an article that goes deeper than its clip; or another shape you can name;
   - its **pieces, in order:** card ids (moments), library ids, article files; which clip goes on top, which go inline, which quotes;
   - its **group** on `/demos` (How I'd reach your accounts, What I think, How the day went);
   - **who it's for:** which recommended lists it belongs in (default, growth, ceo, cofounder-1, cofounder-2, delivery, bi), and which verdict ids it replaces there (the `m-s02-*` clip-articles and others);
   - **the work left:** copy through `alex-voice` (from which source), Alex's minutes (his last 10%, a fact only he knows), `website` minutes; and the card watch-outs that apply.
2. **Pieces that stand on `/videos` only,** in no entry, with the row each goes in.
3. **Pieces left out,** with one reason each. Not every Yes or Great becomes content (W33).
4. **The recommended lists, updated:** VERDICT 2.4's seven lists with your entry slugs swapped in where an entry now carries a verdict id. Keep each list's logic (2.9: what each person is checking).
5. **Tonight's cut:** which entries are needed by morning, when Alex sends the six their notes, and which can land later. Count the alex-voice runs and Alex's minutes; his time is the scarcest thing (charter P3).

## Rules for the entries

- Proof that it was built really well, and the ICP filtering first (RULES, "What the site is for"). Thought leadership comes from what he said on camera.
- Never "Demo N", minute counters or reading lists of demos (rule 5).
- Nobody writes final copy here. Where words are needed, describe them; copy goes through `alex-voice` afterwards.
- Watch-outs travel with the piece: a screen clip that needs his OK, a line naming another person, swearing, a cut-off start. Never place anything that shows secrets, the Apify proposal, or his own GetSales outbound outside the demo folder (DoD-22).
- Personal context about the six stays out of this file except as a list slug. The file is git-ignored, but write as if it weren't.

## Stances

Each compiler takes one stance and argues it well:
- **X, articles first.** Start from the written pieces (the six articles, the capability pieces C1 to C7). Clips are the evidence inside them. Fewer, deeper entries, each one carrying several moments.
- **Y, clips first.** Start from the cards and their clusters. A strong cluster becomes an entry where the video carries the point and the text gives it depth. More entries, shorter, each one led by his face and voice.

## The judge

Reads this brief, both compilations and the cards, then writes `orchestration\assembly\COMPILED.md`: which compilation wins on what, and the merged list in the same five parts, ready to hand to `alex-voice` writers and to `website`. It checks every id resolves (cards, library, article files), every quote is on its card, and no piece is placed twice as the lead of two entries. It loads `design:design-critique` first.
