# Agent view

The Hire Me Hackathon site as plain Markdown, for an LLM agent to read: unlisted pages with no buttons and no scripts, plus `/llms.txt`. A visitor pastes the link into their agent, and the agent follows it.

`generate.py` builds the view from the site's own content files each time it runs, so it says what the live site says. The website session adds the person/agent toggle and serves the output; this folder only builds it.

## Run it

From the repo root (it works from any folder):

```text
python -I scraping\agent-view\generate.py [--out DIR]
```

- The default out dir is `scraping\agent-view\out\`.
- It uses the standard library only and needs Python 3.12 or newer.
- It's deterministic: the same content gives the same bytes.
- It wipes and rewrites only its own out dir. It refuses to wipe a folder that holds anything except `llms.txt` and `agent\`, so pointing `--out` at the wrong folder can't delete anything.
- Exit codes: 0 means written, 1 means a check failed and nothing was written, 2 means a content file couldn't be read.

It prints the file count, the total words, what the gates held back and any redactions (none since 19:0x).

## What it writes

The out dir mirrors the site root:

```text
llms.txt                  -> /llms.txt     the map, in the llmstxt.org shape
agent/index.md            -> /agent/index.md
agent/navigate.md            how to move around, and how to answer questions about Alex
agent/about.md               who Alex is, quoted from the site, each quote with its page
agent/about/linkedin.md      his LinkedIn posts, verbatim (only while the /about route exists)
agent/tracks/                5-min.md, 10-min.md, 20-min.md, 60-min.md, start-here.md, INDEX.md
agent/d1.md, d2.md, ...      one per demo page in build.json, with its status
agent/demos/                 the GTM demos list and each published entry
agent/feed/                  the live feed, one file per post
agent/for/                   the stakeholder pages the site's gate lets through
agent/docs/                  the charter and the specs
agent/privacy.md             the privacy notice
agent/more/                  content files the generator doesn't know yet (only when there are some)
```

Every file starts with the site's disclaimer, the absolute URL of its human page and its reading time at 200 words a minute, and ends with links to where to go next. Links between files are relative. Every folder has an `INDEX.md`. The layout copies the navigation pattern of Alex's public repo `pixel-perfect-branded-assets-demo`: a front page that orients the reader, a paste-this-into-your-agent block, the idea in five lines, a "where things are" tree, and a routing `INDEX.md` in every folder.

From a site URL to its file (the rule the toggle can use):

| On the site | In the agent view |
|---|---|
| `/` | `/agent/index.md` |
| `/#post-<id>` | `/agent/feed/<id>.md` |
| `/d<n>` | `/agent/d<n>.md` |
| `/demos`, `/demos/<slug>` | `/agent/demos/INDEX.md`, `/agent/demos/<slug>.md` |
| `/for`, `/for/<slug>` | `/agent/for/INDEX.md`, `/agent/for/<slug>.md` |
| `/docs/<slug>` | `/agent/docs/<slug>.md` |
| `/privacy` | `/agent/privacy.md` |
| `/about` | `/agent/about.md` |

## What it reads

- `website\content\`: `build.json`, `deliverables.json`, `feed.json`, `summary.json`, `videos.json`, `inventory.json`, `d1.json`, `docs\index.json` and `docs\*.md`, `demos\*.md`, `stakeholders.json`, `linkedin-wall.json` (or else `scraping\site\linkedin-wall\wall.json`, without its `why` notes), `time-paths.json` and `privacy.md`. `clips.json` is known but has no page on the site yet, so nothing renders from it.
- `website\public\`: only the carousel slides' `alt.json` files, for the slide alt text, and checks that the image files it links to exist.
- `website\app\`: route files, read as text. It reads them for the gates and wiring (which routes exist, whether the home page renders the welcome), for `AI_PORTFOLIO_SLUG` and the image alt text in `about\`, and for the few phrases the site renders from code. Each phrase is checked against its file on every run. If the site's wording changes, the run fails instead of quoting words the site no longer says.
- Nothing from `website\local\`, because the stakeholder gate needs nothing from there. Nothing from `Addvery Research\`.

New content files the generator doesn't know get a generic rendering in `agent/more/`, so nothing silently disappears. A file that looks like a draft (front matter `status` other than `published`, notes for Alex, or `approved: false`) is held back instead.

## The gates

The view shows only what a production build of the site shows:

- **Stakeholder pages.** This is a Python twin of `stakeholderGate()` in `app/stakeholders.ts`, run as a production build runs it. There are no pages unless the file's `approved` is exactly `true`. Each page must pass `isPage()` (the required texts, two to four demos and a full ask), and a page with `note_is_draft` is left out. A page that isn't live gets no file and no link. A page's landing (the greeting, the likely questions and the reading list) shows only when its own `landing.approved` is exactly `true`. Each stakeholder track is the page's demos in the page's order, with the reasons the page gives, the reading time per step and a running total.
- **GTM demos entries.** Only entries with `status: "published"` are shown, as in `app/demos/entries.ts`.
- **Time-based tracks.** When `content/time-paths.json` defines paths, the tracks are the site's own, item for item. They're resolved as `app/welcome-data.ts` resolves them: an item missing from the inventory or not live is left out, and `/for/<your-slug>` becomes the chooser of the six pages. Each step gives its time to read here and the site's own count. Only without that file are the tracks built from a priority list in `generate.py`.
- **About.** The LinkedIn wall is emitted only while `app/about/page.tsx` exists, because that's the only place the site shows it. `about.md` quotes only lines the site itself shows, each with its page.
- **AI portfolio.** There's a hook and, for now, no output. The portfolio renders once `AI_PORTFOLIO_SLUG` in `app/about/profile.ts` names a published entry, or once a published `content/ai-portfolio.md` exists.

## The safety scan (DoD-22)

Every output file is checked in memory before anything is written, and the files are scanned again on disk after writing. A failure means a non-zero exit and no output. The run fails on:

- anything shaped like a secret: `apify_api_`, `Bearer` tokens, `sk-` keys, `ghp_` and other GitHub tokens, private key blocks, Vercel blob, Google, AWS and Slack tokens, JWTs, and assigned `api_key=` or `token:` values
- "proposal" within 300 characters of "Apify"
- the private repo's name, checked by its SHA-256 so the name itself isn't in this public folder
- `console.apify.com`
- wording about Alex's own GetSales outbound (for example "his own outbound", or "own GetSales campaigns")

The same pass also fails on any HTML tag outside code, any relative link to a missing file, and any live URL that doesn't match a real route, a confirmed anchor or a file in `public\`.

The site's charter and specs name two of these exclusions, as DoD-22 allows ("the charter and specs may name them"). The agent copies carry the live docs' words exactly, so the track never drifts from what a person sees (orchestration, 2 Nov 19:0x). The "proposal near Apify" and "own outbound" checks therefore skip `agent/docs/`, and every other check runs on every file. If a phrase has to go, remove it from the live docs first (website's `sync_docs.py` deny-list), and the agent copy follows on the next run. Everything is verbatim.

## How website should serve it

- Copy the out dir's contents into `website\public\` before each deploy, so `out\llms.txt` lands at `public\llms.txt` and `out\agent\` at `public\agent\`. Then git-ignore both, like the other generated assets. Next.js serves them as they are: `/llms.txt` at the site root and the pages under `/agent/`. The command:

  ```text
  python -I scraping\agent-view\generate.py; if ($?) { Remove-Item -Recurse -Force website\public\agent -ErrorAction SilentlyContinue; Copy-Item scraping\agent-view\out\llms.txt website\public\; Copy-Item -Recurse scraping\agent-view\out\agent website\public\ }
  ```

  Removing `public\agent\` first means pages that were taken out don't linger.
- Set headers for the `/agent/` prefix: `Content-Type: text/markdown; charset=utf-8` on `/agent/*.md` and `text/plain; charset=utf-8` on `/llms.txt`. Add `X-Robots-Tag: noindex` on `/agent/*` (at least `/agent/for/*`, to match the `/for` pages' noindex).
- The toggle can map any human URL to its agent file with the table above. "Copy the track" can point at `/llms.txt` or `/agent/index.md`.
- Regenerate whenever content changes. The view only stays in step with the site if it's built from the same working tree as the deploy.

A few URLs in the output only resolve once the site is deployed from the working tree they were generated from: `/llms.txt` itself, the welcome's `/#time-<n>` anchors, and new demo or about routes.
