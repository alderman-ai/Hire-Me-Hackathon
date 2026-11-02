# S-D1 and S-D12 handoff: 2 Nov, about 19:05 Prague

From the second `s-d1-scraping` session, which took over at 17:18. It hands off at fork gate F2 because its context is past half full. Read this, then `CLAUDE.md`'s reading list. Since 17:00, the reset rules at the top of `..\answer-desk\ASKING.md` override older rules in SPEC.md: easy calls are yours, so decide, log it in §9 and carry on; pokes only when blocked; no 18:00 cut-off. Copy needs a copy skill (`marketing:draft-content` is on). Design needs `design:design-critique` and `design:accessibility-review`. `frontend-design` isn't loadable here, so `website` applies it.

## Routing (18:56)
- `orchestration` is the master: handoffs, the roster, the charter. **OUTPUT and DONE lines go to it.** Alex no longer talks to it.
- `orch-site-map` (`site-map\`) owns the site's layout and decides where things sit, the agent toggle included.
- `orch-alex-prep` (`alex-prep\`) handles everything that needs Alex. Questions still go to `answer-desk`.
- `website` builds. It's handing off to a fresh session of the same name around 19:00.

## Where everything stands

| Job | State |
| --- | --- |
| **S-D1, the /d1 page** | **Done.** Live at https://hire-me-hackathon.vercel.app/d1 (BUILT S-D1-B1, website 983449a). It has Alex's headline, a carousel of addvery-research's four site-safe boards (`site\carousel\`), then the approved page. Screen care passed at 18:03. DONE sent. OT-12 and DI-10 are archived. It belongs in the site's background research section (DI-10 Q10.10), and `website` and `orch-site-map` place it. |
| **The LinkedIn wall** (Alex, about 18:1x) | **Done and live** at /about (website 9906723), checked at 18:5x. 34 of his posts, from one Apify run ($0.188; about $1.43 of the $10 cap in all). Data: `site\linkedin-wall\wall.json` plus `img\`, built by `build_wall.py` from git-ignored `draft\wall\`. I dropped the 14 May post (an f-word) and told `orchestration`. Re-adding a post means editing `draft\wall\picks.json` and rerunning `build_wall.py`. |
| **S-D12, the agent view** (DoD-25; the SPEC section at the end) | **Generator handed over.** `agent-view\generate.py` and `README.md` (994adcb). The output `agent-view\out\` is git-ignored: `website` runs the generator before each deploy and serves `/llms.txt` plus `/agent/**`. `OUTPUT S-D1: agent view ready` went to `website`, `orchestration` and `orch-site-map` at about 19:00. **Waiting:** BUILT from `website`'s successor. |

## Your next steps
1. **On BUILT for the agent view:** check it live. `/llms.txt` returns 200 as text/markdown. Five or more `/agent/*.md` links resolve. No HTML. Rerun the DoD-22 scan on the served files (no secrets, no "proposal" near "Apify", no `hi-apify`, no `console.apify`). Note that `sk-` false-matches LinkedIn URL slugs such as "task-swipe". Check the toggle sits where `orch-site-map` put it. Then send `orchestration` `DONE S-D12: agent view live (/llms.txt and /agent/, generated from website\content\; DoD-25)`, and log it in §9 (insert rows before the `## S-D12` heading, not at the end of the file).
2. If `website` reports a generator failure (the scan exits non-zero, or a new content type breaks it), fix `generate.py` and commit it path-limited.
3. Otherwise stay idle with no polling. `orchestration` messages you if Alex comments, or if the research section is restructured. Otherwise the job closes in the morning cleanup.

## Rules worth knowing
- Never open the private `hi-apify` repo, the Apify proposal or the Apify Console. The Apify CLI is logged in through the Windows keyring, so `apify call` and `apify datasets get-items` work with no token. Never run anything that prints the token.
- `..\Addvery Research\` is read-only. Its `for-site\` exports are the site-safe versions. `orchestration` ruled the carousel PNGs may be tracked in `site\carousel\`.
- Commits are path-limited to `scraping/`. Check `git diff --cached --name-only` first. Don't push.
