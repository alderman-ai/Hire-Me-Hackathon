# scraping: status
As of 19:59, 2 Nov (Prague), written from the folder's own records after the 19:4x crash.

## Where it fits in the plan

This folder holds two deliverables, run by one session, `s-d1-scraping`:
- **D1, Scraping research demo** (row S-D1): the /d1 page that presents Alex's own Apify scraping of Addvery.
- **D12, Agent view** (row S-D12, added as C17 at 18:43): a generator that builds an unlisted pure-Markdown track and /llms.txt from the site's content files.
- It also built the **LinkedIn wall data** for /about. That's part of D8's About-me section, and this folder claims no DoD item for it.

| DoD | What it asks | State | Evidence |
| --- | --- | --- | --- |
| DoD-8 | A legible demo of Apify scraping and research on the live site, in Addvery's brand | Met | /d1 returns 200 (19:5x). BUILT S-D1-B1, website 983449a (18:02). Alex approved it with changes in OT-12 (17:14). Screen care passed at 18:03 (SPEC §9). |
| DoD-9 | The research output exists in a form other specs read, and is on their reading lists | Met | The OUTPUT line was sent at 15:35 and applied by `orchestration` as C08 (17427ac). `getsales\SPEC.md` names Alex's files (lines 79 to 82). Checked by the session at 15:40. |
| DoD-25 | An agent-readable Markdown track, generated from the site's content, reachable from a person/agent toggle and from /llms.txt | Not met | The generator is built (994adcb, 86741e7) and reran clean at 19:5x (77 files). But /llms.txt and every /agent/*.md tested return 404. The live site has no toggle. /d12 is a placeholder ("Being built", as of 18:45). `website\HANDOFF.md` lists the D12 work as "not started". |
| DoD-22 | Nothing published shows secrets, the Apify proposal or Alex's own outbound | Respected, not claimed (S-D8 and S-D9 claim it) | /d1 screen care passed at 18:03. The generator's safety scan was clean at 19:5x. |

**Depends on:**
- S1's research list L-01 (R1 shaped the page order).
- S-D2, Alex's own research in `Addvery Research\`: his scraping summary, and the site-safe boards from `addvery-research`.
- S-D8 (`website`): it builds /d1 and /about, and it will serve the agent view. Its `content\` files are the generator's input.
- `orch-site-map`: where the toggle goes.

**Feeds:**
- S-D8: the /d1 content, the wall data and the agent track.
- S-D3, S-D6, S-D7 and S-D8: Alex's research files on their reading lists, through the OUTPUT line (DoD-9).
- S-D9: the rule that the site may name Apify.

## What it was trying to do

S-D1 runs no actors of its own. Alex scraped Addvery himself, and this folder turned his summary into the site's scraping page. His words: "this spec or this demo can pull from that research" (A6.5). The page puts the result first, then the steps, then a folded "show me how", because research L-01 R1 found that a tool-first page reads as a toy. At 17:14 Alex reshaped it: "This should be basically one page, framed. Imagine if every pitch started with a briefing like this ... put the actual artifacts that were created first as a carousel with that headline." At about 18:1x he asked for a wall of 20 to 40 of his own LinkedIn posts for About me. At about 18:30 he asked for D12: "a toggle that says, 'I want to view this as a person,' or 'I want my agentic LLM to view this.' ... unlisted pages that are just in Markdown for agents, with no buttons on them."

## What's been made

| Item | Where | State |
| --- | --- | --- |
| D1 scraping page, with the four-board carousel | https://hire-me-hackathon.vercel.app/d1 (website 983449a) | live |
| D1 page content, as approved | `scraping\site\d1.md` (SHA-256 1a16011be7b0) | done |
| D1 draft, byte-identical to `site\d1.md` | `scraping\draft\d1.md` (git-ignored) | done |
| D1 section frame (structure and wording, no Addvery material) | `scraping\site\frame.md` | done |
| Carousel boards: 4 PNG renders at 2x, 1.1 MB | `scraping\site\carousel\` (tracked). Served as 13 WebP sizes from `website\public\d1\` | done |
| Summary request to `addvery-research` (S-D1-R1), completed agent-to-agent | `scraping\Agent request - scraping summary for the site.md` | done (summary ready at 16:26) |
| Summary check script (prints FOUND or MISSING only) | `scraping\check_summary.py` | done |
| LinkedIn wall data: 34 posts, verbatim, with collapsed openings | `scraping\site\linkedin-wall\wall.json` | done |
| Wall images: 16 JPG, 1.4 MB | `scraping\site\linkedin-wall\img\` (tracked) | done |
| Wall builder | `scraping\build_wall.py` | done |
| Wall working files: the raw scrape (94 posts), picks, meta and run log (6 files) | `scraping\draft\wall\` (git-ignored) | done |
| The wall on the site | https://hire-me-hackathon.vercel.app/about (website 9906723) | live |
| Apify run for the wall | `harvestapi/linkedin-profile-posts`: 1 run, 94 items, $0.188, 6.6 s | done |
| Agent view generator (standard-library Python, 1,798 lines) | `scraping\agent-view\generate.py` | done |
| Generator README, with instructions for serving it | `scraping\agent-view\README.md` | done |
| Agent view output: 77 files (llms.txt, index, navigate, about, about/linkedin, privacy, 12 demo pages, 2 demos, 5 docs, 39 feed posts, 7 /for files, 6 tracks) | `scraping\agent-view\out\` (git-ignored), regenerated at 19:5x | done locally, not served |
| /llms.txt and /agent/** on the site | https://hire-me-hackathon.vercel.app/llms.txt (404) | planned only |
| Person/agent toggle | Not built. No placement is recorded in `site-map\DECISIONS.md` | planned only |
| D12 demo page | https://hire-me-hackathon.vercel.app/d12 (copy in `website\content\build.json` and `deliverables.json`) | live, placeholder |
| Spec with decision log (S-D1, plus the S-D12 section) | `scraping\SPEC.md` | done (its status line is stale) |
| Handoff note at F2 | `scraping\HANDOFF.md` (committed 19:12) | done |
| Folder scaffolding: CLAUDE.md, .gitignore, .claude\settings.json | `scraping\` | done |
| Decision intake DI-6, and gates OT-06 (superseded) and OT-12 | `Operator tasks\Archive\Decide - how the scraping demo should work.md`, `Approve - the scraping demo plan.md`, `Approve - what the scraping demo section shows.md` | done (archived) |
| Desk record: S-D1-Q1, answered at 14:58 | `answer-desk\qa\S-D1.md` | done |

There are 41 files in total outside `agent-view\out\` (33 tracked), and 20 of them are media: 4 PNG and 16 JPG.

## How far along

About 80%. D1 and the wall are live and checked. D12's generator is built and reruns clean, but nothing is served yet and there is no toggle. That's the fifth that's left. Done means DoD-25 is met:
- /llms.txt and /agent/** are served as Markdown, from a fresh generator run at deploy time.
- A person/agent toggle is on the site.
- The DoD-22 scan has been rerun on the served files.
- DONE S-D12 is logged in SPEC §9.

DoD-8 and DoD-9 are already met.

## What's left for Alex

1. **Toggle: placement and design** (attended design). With an assistant, decide where the person/agent toggle sits and how it looks. His own words were "I want to view this as a person" and "I want my agentic LLM to view this", but /d12 says "let my LLM view this". The work happens in `website\app\`, and the URL-to-file mapping it needs is in `scraping\agent-view\README.md`. About 15 to 20 min.
2. **D12 copy** (attended copy). Go through two pieces of text with an assistant. First, the /d12 page, which is still a placeholder ("The switch and the Markdown track land here when they're built"); it lives in `website\content\build.json` and `deliverables.json`. Second, the agent view's own framing text, which a subagent wrote unattended: the llms.txt intro, `agent\index.md` and `agent\navigate.md`, about 1,500 words in all. The source is in `scraping\agent-view\generate.py`, and the rendered files are in `scraping\agent-view\out\`. About 20 min.
3. **Left-out LinkedIn posts** (quick, optional). Name any of the three posts left off the wall that should go back on: 14 May, 19 Oct or 27 Oct. Then an assistant edits `scraping\draft\wall\picks.json`. About 2 min.
4. **GitHub mirror** (quick). Yes or no on a mirror of the agent track in a GitHub repo. The charter says it comes "only if the operator asks". About 1 min.
5. **Wall images in the public repo** (quick). Yes or no on keeping the 16 wall images tracked in `scraping\site\linkedin-wall\img\`. Website keeps its own copies out of the repo (`website\.gitignore`, `public/about/`). About 1 min.
6. **Named boards** (quick, optional). Yes or no on named versions of the four carousel boards on /d1. They show roles only now, and SPEC §9 at 17:23 says "named versions only if Alex asks". About 1 min.

## What's left for an assistant

1. **Serve the agent view.**
   - Run `python -I scraping\agent-view\generate.py --out <clean dir>` from the repo root.
   - Copy `llms.txt` to `website\public\` and `agent\` to `website\public\agent\`, and git-ignore both.
   - Set the headers: `text/markdown` on /agent/*.md, `text/plain` on /llms.txt, and `X-Robots-Tag: noindex`.
   - Add both to the clean-export list, then deploy.
   - Do this once the copy in `content\time-paths.json` is final.
   - Described in `scraping\agent-view\README.md` ("How website should serve it") and `website\HANDOFF.md` ("D12 agent view").
2. **Check it live.** /llms.txt returns 200 as text, at least five /agent/*.md links resolve, and there's no HTML. Rerun the DoD-22 scan on the served files; note that `sk-` false-matches LinkedIn slugs. Described in `scraping\HANDOFF.md`, "Your next steps", step 1.
3. **Wire the toggle and close D12.** Once Alex has settled item 1:
   - Wire the toggle to the URL-to-file table in the README.
   - Update the /d12 status line.
   - Log DONE S-D12 in SPEC §9, inserting the row before the `## S-D12` heading.
   - Described in `scraping\HANDOFF.md`, step 1.
4. **Fix stale records.**
   - The `s-d1-scraping` row in `SESSIONS.md` still names bbc4d635 as active and calls D1 "approved with changes". The session died in the crash.
   - The status line at the top of `scraping\SPEC.md` still says "waiting on his summary".
   - The D12 row in `Open tasks.md` (kept by `orch-alex-prep`) still says "Generator being built".
5. **Accessibility review of /d1.** Run `design:accessibility-review` on the live /d1 if it wasn't run. SPEC §9 at 17:23 says it "runs on the built page", but the step-10 row at 18:03 records only screen care and a 390 px check.
6. **Re-add posts, if Alex names any (item 3).** Edit `scraping\draft\wall\picks.json` and rerun `build_wall.py`. Then rerun website's `scripts\about_assets.py` and deploy. Described in `scraping\HANDOFF.md` (the wall row) and `website\HANDOFF.md` (/about).

## Open questions and risks

- **DoD-25 is not met, and nothing is served.** Both sessions that would have finished it, `s-d1-scraping` and `website`, died in the crash.
- **The handoff was half-done at the crash.** `scraping\HANDOFF.md`, committed at 19:12, says the session was handing off at F2. The roster row still names bbc4d635, from the 17:18 handoff, and was never updated. The records don't show whether a successor was launched or announced, so that's unclear.
- **No one has decided where the toggle goes.** `website\HANDOFF.md` says to ask `orch-site-map`. `site-map\DECISIONS.md` has no entry.
- **The toggle's wording conflicts.** The charter and Alex say "I want my agentic LLM to view this". The live /d12 page says "let my LLM view this".
- **The tracks carry placeholder copy.** They mirror `website\content\time-paths.json` item for item. Website committed that file at 19:50 as work in progress, with placeholder intro copy (`website\HANDOFF.md`), so today's agent tracks carry the same copy. Regenerate the track once that copy is final. The generator's phrase checks fail the run on purpose if the site's wording drifts from the route files.
- **The redaction ruling is confirmed.** At 19:10, `orchestration` overruled the "[redacted]" swap (C19, ed0faab). It was applied in 86741e7 at 19:12, and `REDACTIONS` in `generate.py` is now empty. The 19:5x run reported no redactions and a clean scan. The agent copies of the docs carry the live docs' words, which DoD-22 allows for the charter and specs.
- **The wall images are handled two ways.** They're tracked in `scraping\`, while website git-ignores its copies as "kept out of the public repo". It's unclear which is intended. Every image was checked at 18:2x: no keys, no outbound, no proposal.
- **`wall.json` is public.** It's tracked and carries an internal "why" note for each post. The site doesn't show the notes, and as read they're harmless.
- **/d1 isn't in a Research section yet.** Alex placed it in the background research section (DI-10 Q10.10). The live menu has no Research section; `website\HANDOFF.md` lists it only as the "Menu target".
- **Some records are stale.** The SPEC status line, the roster row, the Open tasks row, and /d12's "As of 18:45" are all out of date.
- **Some times disagree.** HANDOFF.md says "about 19:05", but its commit is at 19:12. The SPEC's "19:0x" generator run matches commit 994adcb at 19:08. Word counts differ slightly: 51,650 at 19:0x and 51,683 at 19:5x, because the content changed in between.
- **Spend:** about $1.43 of Alex's $10 Apify cap (HANDOFF.md): $1.24 on the D1 scraping and $0.188 on the wall run.

## Sources

- Files:
  - In `scraping\`: `CLAUDE.md`, `SPEC.md` (§1 to §9 and the S-D12 section), `HANDOFF.md`, `agent-view\README.md`, `agent-view\generate.py` (header, `REDACTIONS`, `main`), `.gitignore`, `.claude\settings.json`, `site\frame.md` and `site\d1.md` (heads), `Agent request - scraping summary for the site.md` (status lines), `site\linkedin-wall\wall.json`, and `draft\wall\meta.json` and `picks.json` (counts only).
  - Elsewhere: `CHARTER.md`, `SESSIONS.md` (row 36), `website\HANDOFF.md`, `website\SPEC.md` (line 101), `website\.gitignore`, `getsales\SPEC.md` (routing), `site-map\DECISIONS.md` and `site-map\CLAUDE.md`, `orchestration\HANDOFF.md`, `orchestration\SPEC.md` (C17 and C19 rows), `answer-desk\qa\S-D1.md`, and `Open tasks.md` (status only).
- Commits: 2b35b3c, 0285a23 to 86741e7 (`git log -- scraping`, 36 commits), 983449a, 9906723, ed0faab, d6b4131 and e3e8b9f.
- Live checks at 19:5x:
  - 200: /d1, /d12 and /about.
  - 404: /llms.txt, /agent/index.md, /agent/d1.md, /agent/navigate.md, /agent/tracks/5-min.md and /agent/about/linkedin.md.
  - The home page shows no toggle.
- Generator run at 19:5x, `python -I scraping\agent-view\generate.py` into its own `out\`: exit 0, 77 files, 51,683 words. It held back the six /for landings (not approved) and three sample demo entries. Links, routes and the HTML and safety checks were clean.
