# Assembly brief: what goes on which page

Written by `orchestration` at 20:47 on 2 Nov, for the strategist agents and their judge. Alex asked for it at about 20:38: "multiple agents say, 'Okay this is the goal of the site. Which of these, from this list of a hundred pieces, should be stacked together for each page? What pages make sense to be together?'"

## Read first

1. `RULES.md` at the repo root: what the site is for, and the ten rules. They win over everything else here.
2. `orchestration\local\ALEX-WANTS.md`: Alex's words tonight, verbatim, with the wants numbered W1 onwards. It also holds the context on the people the site is for; read it before placing anything on a personal page.
3. The content library, in `C:\Users\alder\.claude\jobs\e41f29c0\tmp\sync\library\`:
   - `written.json` / `written.md`: the written and demo pieces.
   - `video.json` / `video.md`: session videos, clips, clip moments and image sets.
   - `skills.json` / `skills.md`: the reusable skills and tools built today.
4. Alex's spoken wants and his best moments: `C:\Users\alder\.claude\jobs\e41f29c0\tmp\sync\spoken\SPOKEN-WANTS.md` and `NUGGETS.md`.
5. What's live today, page by page: `C:\Users\alder\.claude\jobs\e41f29c0\tmp\sync\live\INVENTORY.md`.
6. The audit of everything he asked for today, and what got lost: `C:\Users\alder\.claude\jobs\e41f29c0\tmp\sync\asks\AUDIT.md`.
7. Clip grades, if any exist yet: `legibility\grading\grades.jsonl` (G great, Y yes, M maybe, N no; a later line for an id replaces an earlier one, and `undo` removes the last). Alex is grading now. Treat every Great as a must-use clip-article. Where grades are missing, use the library's `clip_article` flags.

## The situation

- The site is https://hire-me-hackathon.vercel.app (Next.js in `website\`, content files in `website\content\`).
- Tomorrow morning Alex sends each of the six a short note linking to their own page. He meets Ivana at 4 pm Tuesday.
- The build happens tonight with Alex awake. The `website` session builds and deploys. Assume it can do about four hours of careful work. Prefer reusing what exists (the feed, the entry template, /about, /for and its six pages) over new page types.

## What each strategist produces

One proposal, as `proposal-<letter>.md` in `orchestration\assembly\`:
1. **The pitch in one paragraph:** what a visitor from Addvery should believe after five minutes.
2. **The site map:** each page with its route, who it's for, and its job in one line; the menu.
3. **Each page as an ordered stack of blocks.** Each block names the library ids it uses. Say which blocks exist already and which must be made.
4. **"Recommended for you":** a default carousel and one per person (six), each 4 to 6 pieces, with one line on why each piece is there for that person.
5. **The ICP filtering proof:** how the site shows Alex filtering ICPs, the most important capability. Say what exists and what's missing (a recording, a demo run).
6. **The reusable skills:** where and how the skills catalog shows up.
7. **What comes off the live site** (the countdown, the frozen status boards, the placeholder demo pages, the demo reading lists).
8. **The finish list for tonight,** ranked: which pieces must be finished, by whom (Alex, or Claude with the `alex-voice` skill), and roughly how long. Keep Alex's own time under 2.5 hours in total.

## The visit (Alex, about 20:48)

"really put some thought into how everything should go: the UI, the UX, what's a smooth experience for everyone coming in and spending somewhere between 10 and 60 minutes going through it." So every proposal also gives:
- **The journey** for a visitor with 10, 20 and 60 minutes: what they see first, where they go next, where they can stop satisfied. A person from the six arrives from Alex's note on their own page; a forwarded colleague arrives cold on the home page.
- **The UI:** the layout of each page type (home, a personal page, an article, a clip-article, the skills catalog, the walls), in words plus a simple ASCII or Mermaid sketch, and the components each reuses.
- **Smoothness:** how a visitor always knows where they are, what's next, and how to get back to their recommended pieces.

**Skills to load first** (Skill tool): `frontend-design:frontend-design` for the UI and page structure, and `design:user-research` for the journeys of the six. If one doesn't resolve, say so and carry on. The judge also loads `design:design-critique`. Nobody writes final copy here: where words are needed, describe them, because copy goes through `alex-voice` later.

## Stances

Each strategist takes one stance, then argues it well:
- **A, the pitch first.** The selling point leads: "imagine your conversion rate if this is how you reached everyone in your CRM". The proof sits underneath.
- **B, the proof first.** Capability by capability, ICP filtering first, each one a short article with a clip on top, plus the reusable skills.
- **C, the person first.** A personal website made for them: Alex's thinking (the articles from his rants and lessons), who he is, with the work woven through.

## The judge

Reads the three proposals against `RULES.md`, `ALEX-WANTS.md` and the library, then writes `orchestration\assembly\VERDICT.md`: a ranking with reasons, then one merged recommendation that takes the best of each, in the same eight-part shape. It flags any place where a proposal breaks a rule or ignores a want, and any piece it places that doesn't exist.
