# L-03 W2 Wildcard: can it be delivered?

**Question (verbatim):** When a finished blog post is carried to a reader (as a link in a LinkedIn message, a LinkedIn post, or anywhere else that unfurls a link), what does that reader see before they click? What's the smallest build that makes every post arrive as its own finished card (its own title, image and URL), drawn the way Alex asked for the LinkedIn imagery, "a template in the background and then the generative AI text on top"? And does any route carry a post to Addvery's six stakeholders at all?

2026-11-02 · session s1-research subagent · item 8 of 9 on list L-03 · serves DoD-15 ("published on the site"), DoD-14 ("good-looking"), DoD-19 · readers: S-D4, S-D5 (and `website`, through their BUILD requests)

Lens: W2, "can it be delivered?" Once a post is written, does it reach the people it's for, in a form that reads as finished?

---

## (a) Gap analysis

### What the other items cover

| Item | Covers | Doesn't cover (in this lens) |
| --- | --- | --- |
| R1 Transcript to draft | Staged or one-pass drafting; keeping Alex's voice; what the last 10% leaves him | Anything after the post file exists |
| R2 Claude Design | Whether Claude Design or a site template builds the post's look; how designs leave the app | What the post looks like *off* the site: the link card in a message or feed |
| R3 Capture | Wispr Flow and the rig transcript; the cleanup step | Nothing downstream |
| R4 What a finished B2B post looks like | Structure, length, visuals, cover image, "SEO basics" on the page | How the post travels: the share card, the route to a reader, the order in which a share gets scraped |
| R5 Best skill to write blogs with | Which copywriting skill to switch on | Nothing about delivery |
| R6 Research base for article 1 | The managed-service and AI-skill-slider argument | Nothing about delivery |
| W1 Can it be executed? | Whether the pipeline can run in time | What happens after a post is live |
| W3 Will it be received? | How readers react to the post | The step before that: whether it reaches them and how it looks when it does |
| L-01 W2 (parent, done) | The 15:30 GetSales alert: the homepage link, its card, click timing, failure modes, the hand-over checklist | Per-post links; the blog; LinkedIn imagery for posts |
| L-05 R4 (brand assets, done) | LinkedIn post formats for S-D7's demo, including vendor data that link posts reach less | Carrying the *blog* to readers; the card a post link unfurls into |

### Everything left open in this lens

From the charter, both blog specs, `POST-FORMAT.md`, the website spec and code, and a live probe (all read-only):

1. **The per-post link card.** `POST-FORMAT.md` §5 asks only for "`<title>` from `title`, meta and Open Graph description from `description`." Nothing sets a post's own `og:title`, `og:url` or `og:image`. The site layout sets all three site-wide.
2. **LinkedIn imagery for posts.** Alex asked for imagery made "the same way we did the Apify one" (L-03's Approved-by line). It's relayed as build work, but nothing says what image a *shared post* carries. S-D4's decision log says "no generated images; each post gets a typographic cover", and the cover is CSS, not an image file.
3. **Sharing before the card is right.** A link card is scraped once and cached. Near-final posts render only off production, so a post's production URL is a 404 until it's published.
4. **The route to the six.** S-D5 puts "Promoting the posts" out of scope. S-D7 is a content demo. The only planned channel to the six is the GetSales alert (L-01 W2).
5. **Finding the blog on the site.** S-D4-B1: `/blog` is "not linked from the page until the first post is live". Each demo page "is announced by a feed post"; the blog has no such rule.
6. **LinkedIn feed reach for link posts.** Mostly covered by L-05 R4.
7. **Search.** No sitemap and no robots file; how long indexing takes.
8. **Attribution on the card.** The posts are Alex's, not Addvery's (decision logs of S-D4 and S-D5). The site uses Addvery's favicon and look.
9. **Mobile and in-app reading.** Partly covered by L-01 W2 (the in-app browser) and R4 (the template).
10. **Durability of post URLs.** Covered: the slug "never change[s] once published" (`POST-FORMAT.md` §2).

### Ranked shortlist

Ranked by: does it change whether a post reaches a reader and reads as finished; how likely it is to go wrong; whether anyone covers it; how soon it bites.

1. **The per-post card, its image and the share timing** (1, 2, 3, 8). A share goes wrong on every channel at once (message, feed, chat apps). Nobody owns it. It bites at the first share and then sticks in the cache. It also answers Alex's imagery ask.
2. **The route to the six, and finding posts on the site** (4, 5). It decides whether the six meet a post at all. It's mostly a set of decisions, not research, so it rides along.
3. **Search** (7). Cheap to fix, but too slow to matter for six people in two days.
4. **Feed reach** (6). L-05 R4 covers it; cited here, not redone.

### Why I picked this question, and what I passed over

I picked item 1 with items 4 and 5 folded in. The probe found a concrete defect: every sub-page on the live site already unfurls as the homepage. The blog template (S-D4-B1) is about to be built, and the format as written would carry that defect into every post. It's also the one point where Alex's LinkedIn imagery request and the blog meet: the image a post shows when its link is shared.

Passed over:
- Feed reach: L-05 R4 has it.
- Search: a short note and one option in (c).
- Mobile reading: R4 and L-01 W2.
- URL durability: settled by the format.

---

## (b) Research

### Method

- **When:** 2 Nov 2026, about 16:30 to 16:50 Prague.
- **Local reads, read-only:** `CHARTER.md`, `research\lists\L-03-blog.md`, `research\SPEC.md` §4, `research\DIRECTORY.md`, `research\global\L-01-W2-wildcard-delivered.md`, and the headers and relevant sections of `L-05-R1`, `L-05-R2` §5 and `L-05-R4`. Also `blog-pipeline\SPEC.md`, `blog-pipeline\POST-FORMAT.md`, `blog-articles\SPEC.md`, `website\CLAUDE.md`, parts of `website\SPEC.md`, `website\app\layout.tsx`, the `generateMetadata` of `app\docs\[slug]\page.tsx` and `app\[demo]\page.tsx`, and `app\opengraph-image.alt.txt`. The Next.js docs shipped in `website\node_modules\next\dist\docs\` (Next `^16.4.3`): `generate-metadata.md` (Merging), `opengraph-image.md`, `image-response.md`.
- **Live probe:** unauthenticated `curl` GETs at 16:38 of `https://hire-me-hackathon.vercel.app/`, `/d4`, `/docs/charter`, `/blog`, `/sitemap.xml`, `/robots.txt` and `/opengraph-image.png`, plus `curl -I` for headers. Only `<head>` tags and headers were read. No Vercel MCP, GetSales or LinkedIn calls, and no logins.
- **Web (WebSearch, WebFetch):** LinkedIn Help 46687; the Open Graph protocol (ogp.me); Facebook's sharing docs on `og:url`; Google Search Central on recrawling; Vercel on preview indexing; link-penalty studies (Ordinal, with van der Blom and LinkPost as cited there); third-party Post Inspector guides.
- **Not opened:** `Addvery Research\`, the Apify proposal, `hi-apify`, anything in GetSales, and the alert's text.
- **Limits:** LinkedIn documents almost nothing about how it builds and caches cards. Most claims about caching and `og:url` come from third parties or from Facebook's analogous docs, and they're flagged where used.

### Verdict

1. **As the site stands, a shared post link would arrive dressed as the homepage.** Every sub-page probed (`/d4`, `/docs/charter`) unfurls as `og:title` "The Hire Me Hackathon", `og:url` the homepage, the one site image, and the site description (live probe, 16:38). The pages' own titles and descriptions never reach the card. The cause is Next.js inheritance: the layout's `openGraph` object passes whole to any page that doesn't set its own (local Next docs). `POST-FORMAT.md` asks the post template only for `<title>` and the OG description. Built literally, a post page would either inherit the homepage card or, by setting a partial `openGraph`, wipe the inherited title and URL. Both readings are inference from the docs.
2. **`og:url` makes this worse than a generic card.** The Open Graph protocol defines `og:url` as "the canonical URL of your object that will be used as its permanent ID in the graph" ([ogp.me](https://ogp.me/)). Facebook treats "all links that specify the same canonical URL ... as the same resource" ([Facebook docs](https://developers.facebook.com/docs/sharing/webmasters/getting-started/versioned-link/)). *Inference:* LinkedIn may treat all three posts as the homepage, in title, URL and counts. One paste of `/d4` into Post Inspector settles it today (C7).
3. **The fix is small, and it is the imagery Alex asked for.** Each post page needs its own full `openGraph`: `article` type, its own absolute URL, title, description, date, author. A generated `opengraph-image.tsx` beside the post route can draw a fixed backdrop (the template) and set the cover fields the format already has (kicker, title lines, accent, subtitle, byline) in fixed slots. That's the Apify method from L-05 R1 (a backdrop, text in measured slots, a render), done by Next.js at build time. It keeps S-D4's "no generated images" decision, because the card is typographic. Limits: flexbox only, a 500 KB bundle including fonts and the backdrop, and `ttf`, `otf` or `woff` fonts (local `image-response.md`). LinkedIn asks for at least 1200×627 at 1.91:1 ([LinkedIn Help 46687](https://www.linkedin.com/help/linkedin/answer/46687)).
4. **A wrong card sticks, so the order of operations matters.** LinkedIn builds the card from the tags and caches it, reportedly for up to about a week (third-party; L-01 W2 B3). A post's production URL is a 404 until it's published. That 404 page carries the homepage tags (live probe). Preview URLs are noindexed and may sit behind Vercel's login wall. Any post link shared before publish, or before its tags are right, can keep the wrong card in that thread (inference).
5. **Nothing carries a post to the six, and the site doesn't point to the blog yet.** Promotion is out of S-D5's scope. The only planned channel to the six is the alert sequence (L-01 W2), with about 1.6 of the six expected to accept. `/blog` isn't linked from the home page until the first post is live, and no rule gives a post a feed entry. LinkedIn's feed and Google are weak carriers for six people in two days. Link posts reach less in most vendor data (L-05 R4; Ordinal), and Google crawling takes "a few days to a few weeks" ([Google](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)). Direct links decide whether a post reaches them: the site's own pages, a message, the hand-over. That makes the per-post card the thing to get right.

**The answer to "can it be delivered?"** Yes, technically, and the fixes are small. As planned, though, a post shared anywhere would show up as the hackathon homepage card, and no route takes a post to the six. Both need settling before the first post link leaves the site.

### Evidence

#### B1. What a shared link to a page on this site unfurls into today

**Live probe, 16:38 Prague** (`<head>` tags only):

| Route | `<title>` | `og:title` | `og:url` | `og:image` |
| --- | --- | --- | --- | --- |
| `/` | Hire Me Hackathon | The Hire Me Hackathon | `https://hire-me-hackathon.vercel.app` | `/opengraph-image.png` (1200×630) |
| `/d4` | Blog pipeline · Hire Me Hackathon | **The Hire Me Hackathon** | **the homepage** | **the same image** |
| `/docs/charter` | Project charter · Hire Me Hackathon | **The Hire Me Hackathon** | **the homepage** | **the same image** |
| `/blog` | 404 | The Hire Me Hackathon | the homepage | the same image |

- `/d4`'s own `meta description` ("15 minutes of Alex talking turns into a near-finished blog post...") differs from its `og:description`, which is the site's.
- `/sitemap.xml` and `/robots.txt` return 404. Production sends no `X-Robots-Tag`, so indexing is allowed by default.
- The site image is 218,818 bytes, well under LinkedIn's 5 MB.

**The cause, in code and docs.**
- `website\app\layout.tsx` sets `openGraph: { type: "website", url: SITE, siteName, title: "The Hire Me Hackathon", description }` and a matching `twitter` block.
- The demo and doc pages' `generateMetadata` return only `title` (and `description` for demos). They never set `openGraph`.
- The local Next.js docs (`generate-metadata.md`, "Merging"): metadata is "shallowly merged", and nested fields like `openGraph` "defined in an earlier segment are **overwritten** by the last segment to define them". Their example: a page that sets only `title` outputs `<title>About</title>` but `og:title` "Acme", because "All `openGraph` fields from `app/layout.js` are **inherited**." The probe matches this exactly.

**What the post template is asked to do.** `POST-FORMAT.md` §5: "**Metadata.** `<title>` from `title`, meta and Open Graph description from `description`." There's no per-post `og:title`, `og:url`, `og:image`, `og:type` or published date.

*Inference:* there are two ways B1 could be built literally, and both fail.
- **(a) Description only.** The page sets `description` without `openGraph`. It inherits the homepage card in full, as `/d4` does.
- **(b) A partial `openGraph`.** The page sets `openGraph: { description }`. Under the docs' replace rule, the layout's `og:title`, `og:url` and `og:type` vanish from the post. LinkedIn then "falls back to whatever else it can find" (third-party guides, below). Whether the root file-based image still applies in (b) isn't settled by the docs I read. A probe after the build would show it.

#### B2. Why `og:url` matters most

- **The protocol:** `og:url` is "The canonical URL of your object that will be used as its permanent ID in the graph" ([ogp.me](https://ogp.me/)).
- **Facebook**, the protocol's origin, documents the consequence: "All links that specify the same canonical URL are treated as the same resource" for metadata and metrics. It also follows an `og:url` chain to its final URL ([Facebook sharing docs](https://developers.facebook.com/docs/sharing/webmasters/getting-started/versioned-link/)).
- **LinkedIn** lists `og:title`, `og:url`, `og:image` and `og:description` as tags that "must exist" ([LinkedIn Help 46687](https://www.linkedin.com/help/linkedin/answer/46687), "last updated 3 years ago"). It says nothing on how it treats a mismatched `og:url`.
- **Third-party guides:** "og:url indicates the canonical URL of the page being shared", and LinkedIn "will replace the URL that your participants share ... with the Canonical URL, if there is one" ([GrowSurf](https://support.growsurf.com/article/273-can-i-enable-linkedin-as-a-social-sharing-option), about share buttons). One troubleshooting guide lists "og:url pointing elsewhere" as a cause of a wrong-page preview ([link.boo](https://link.boo/guides/linkedin-link-preview-not-showing)). None is a LinkedIn source.
- *Inference:* a post whose `og:url` is the homepage risks a card that names the hackathon instead of the post, and possibly a card that links or counts to the homepage. Pasting the live `/d4` URL into LinkedIn's Post Inspector settles it in a minute (C7). It needs Alex's LinkedIn session.

#### B3. What a per-post card needs, and how the Apify method maps onto it

**LinkedIn's image rules** ([Help 46687](https://www.linkedin.com/help/linkedin/answer/46687)):
- Minimum 1200×627 px, ratio 1.91:1, at most 5 MB.
- "Images less than 401 pixels wide display as a thumbnail image."
- An image in a protected directory may not be pulled at all.

**The tooling the site already has** (local Next.js docs):
- **The file convention.** An `opengraph-image.tsx` in a route segment generates that segment's card. It gets the dynamic route `params`, can export `alt`, `size` and `contentType`, and by default is "statically optimized (generated at build time and cached)" (`opengraph-image.md`).
- **The renderer.** `ImageResponse` uses "@vercel/og, Satori, and Resvg to convert HTML and CSS into PNG". It supports "flexbox and absolute positioning, custom fonts, text wrapping, centering, and nested images" (`image-response.md`).
- **The limits** (same file):
  - "Only flexbox and a subset of CSS properties are supported. Advanced layouts (e.g. `display: grid`) will not work."
  - "Maximum bundle size of `500KB`", including "fonts, images, and any other assets".
  - "Only `ttf`, `otf`, and `woff` font formats are supported."
- *Inference:* the site loads Inter Tight and Inter through `next/font/google` (`layout.tsx`). Those can't be handed to Satori as they are, so the card needs its own `ttf` or `otf` files, which count toward the 500 KB.

**How Alex's "Apify" method maps onto it** (L-05 R1 verdict):
- The earlier demo was "a static HTML/CSS page that sits on a fixed backdrop image", screenshotted by headless Chrome. "Pixel-perfect" came from "fixed coordinates and fixed character budgets", "measured on real renders", with the rule "halt, don't degrade".

| Apify demo (L-05 R1) | Per-post card |
| --- | --- |
| Fixed backdrop image | A backdrop PNG in the site's look, kept small for the 500 KB budget |
| Text in measured slots | The front matter the format already defines: `cover.kicker` (≤32 characters), `title` and `cover.title_lines` (≤70), `cover.accent`, `cover.subtitle` (≤120), and the byline from `author`, `date` and `reading_minutes` (`POST-FORMAT.md` §2, §5) |
| Headless Chrome screenshot | `ImageResponse` at build time, one PNG per published post |
| "Halt, don't degrade" | The build fails if a title overflows its slot at the chosen size, rather than shrinking or clipping it (inference: the format's limits are character counts, not measured widths, so they still need checking on real renders, L-05 R1's lesson) |

- **It keeps S-D4's decisions.** "No generated images; each post gets a typographic cover" holds, because this is the cover's type on a template, not an image model. "Generative AI text" in Alex's note is the post's own AI-drafted, Alex-finished title and subtitle.
- **One template, two places.** The on-page cover and the shared card show the same words. *Inference:* the reader who clicks lands on what the card promised.

**Attribution on the card.**
- Both blog specs decide the posts are Alex's, "not written as Addvery's own posts". The site uses Addvery's symbol as its favicon (`layout.tsx`).
- *Inference:* a card that reads as Addvery's content, with Addvery's mark and no name, could look like it speaks for the company. Alex's name on the card (the byline is already a cover field) keeps the decision visible where the post travels.

#### B4. Timing: a card is scraped once and kept

- **What the posts look like before publish.** Near-final posts render "only when `VERCEL_ENV` isn't `production`", with `noindex` (`POST-FORMAT.md` §5). Until a post is published, its production URL `/blog/<slug>` is a 404. The 404 page carries the homepage tags (probe of `/blog`).
- **Preview URLs.** Vercel adds `X-Robots-Tag: noindex` to every preview deployment automatically, and noindex "isn't access control" ([Vercel KB](https://vercel.com/kb/guide/are-vercel-preview-deployment-indexed-by-search-engines)). Standard Deployment Protection puts non-production URLs behind a Vercel login (L-01 W2 B5). LinkedIn may not pull an image from a protected location (Help 46687).
- **Caching.**
  - Third-party guides: LinkedIn "builds the preview from your page's og tags, then caches it", and Post Inspector forces a re-scrape (search summaries of [Kinsta](https://kinsta.com/blog/linkedin-debugger/) and [Expandi](https://expandi.io/blog/linkedin-post-inspector/)).
  - Wix: "it can take up to a week for the new information to appear in LinkedIn shares" ([Wix](https://support.wix.com/en/article/updating-the-share-image-on-linkedin)).
  - L-01 W2 B3 found the same claims (about 7 days; a refresh affects only new shares). None of this is LinkedIn's own documentation.
- *Inference:* a post link pasted into a message or post before it's live, or before its tags are right, can keep the homepage card or a bare one in that thread. Each post's URL is new, so its *first* scrape is the one that counts.

#### B5. Routes from a live post to a reader

**Which routes exist** (local specs):

| Route | Status | Source |
| --- | --- | --- |
| The site: `/blog` and the feed | `/blog` "not linked from the page until the first post is live". S-D5's publish BUILD says "publish ... and list it on /blog", and nothing about the feed or the "start here" box. Each demo page "is announced by a feed post"; the blog has no such rule. | `blog-pipeline\SPEC.md` §7 step 3; `blog-articles\SPEC.md` §7 step 8; `website\SPEC.md` (Structure) |
| The six's own pages | "Six links go in the 'start here' box once those pages are live" (part 2, Alex's gate) | `website\SPEC.md` (Structure) |
| The GetSales alert sequence | The only planned channel to the six. About 1.6 of 6 expected to accept; most clicks within 24 hours; C-level replies about two weeks later. Its text is off-limits to this report. | L-01 W2 B1, B2 |
| Alex's own LinkedIn | Not planned. "Promoting the posts" is out of S-D5's scope, and S-D7 is a content demo in Addvery's voice. The charter allows Alex's own account and rules out automated sending and anyone else's account. | `blog-articles\SPEC.md` §4; `CHARTER.md` Scope |
| Search | No sitemap, no robots file (probe). Google: "Crawling can take anywhere from a few days to a few weeks"; a sitemap "is an important way for Google to discover URLs" ([Google Search Central](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)) | probe; Google |

**LinkedIn feed reach for link posts** (vendor data; L-05 R4 has the fuller table):
- Ordinal: a median 26.5% less reach for posts with links. Company pages take "a real penalty"; personal profiles show "almost none".
- Ordinal also cites van der Blom (18.8% for one link, April 2025, since revised) and LinkPost (448 against 705 median impressions, 36%) ([Ordinal](https://www.tryordinal.com/blog/linkedin-link-penalty-study)).
- DSMN8 (personal profiles): text posts averaged 775 impressions against 149 for link posts (cited in L-05 R4).
- LinkedIn "has never confirmed" a link penalty (Ordinal), and no study separates the URL from the card.
- *Inference:* a feed post on Alex's profile reaches his network and its reshares, not the six specifically, unless they follow or connect with him. For a six-person audience, reach matters less than whether a link put directly in front of them unfurls correctly.

**Messages.** No source documents how LinkedIn draws cards in direct messages. One third-party note says LinkedIn "automatically generates a preview" for a link sent in a DM (WebSearch summary, no primary source). *Inference:* it uses the same tags and cache, so B1 to B4 apply there too.

#### B6. Evidence gaps

- **What LinkedIn does with a sub-page whose `og:url` is the homepage.** No LinkedIn source covers it. Facebook's docs and third-party guides suggest it's treated as the homepage. One Post Inspector paste of `/d4` settles it, and that needs Alex's LinkedIn session.
- **Whether a partial `openGraph` on a post keeps the root file-based image** (B1, reading b). The docs I read don't say. A probe after the build does.
- **LinkedIn's cache length and DM card behaviour.** Third-party only.
- **Satori with these fonts and this backdrop under 500 KB.** Not tested; it's build work.
- **Whether the six would see a post from Alex's own feed.** That depends on their connection to him, which isn't knowable here and belongs to Alex's own outbound.
- **The link-penalty numbers.** Vendor data, observational, disagreeing; LinkedIn hasn't confirmed any of it.
- **How `website` will actually implement B1's metadata.** Not built yet. The finding is about the format as written plus the site's current inheritance.

---

## (c) Recommendations

Evidence plus options. **Every call here is Alex's.** Tags follow the synthesis: assistant-actionable, operator decision, verify first. The owners named are the sessions whose specs cover the ground: S-D4 owns `POST-FORMAT.md` and the B1 request, `website` builds, and S-D5 publishes. This report doesn't message them; routing goes through S1 and S2.

**C1. A full card for each post.** *(Assistant-actionable for S-D4, as a line in `POST-FORMAT.md` §5 and its B1 request; B1, B2)*
- The post page sets its own complete `openGraph`, not a partial one:
  - `type: "article"`;
  - its own absolute `url` (`https://<site>/blog/<slug>`);
  - `title`, `description`, `publishedTime` (from `date`), `authors: ["Alex Alderman"]`;
  - its image (C2);
  - a matching `twitter` block.
- Options:
  - **A.** As above.
  - **B.** As above, plus the same fix on the demo and doc pages (`website`'s call; it would make `/d1` to `/d10` shareable too).
  - **C.** Leave it, and accept that every post unfurls as the homepage.

**C2. The card image: Alex's "template in the background, text on top".** *(Operator decision on the option; build is assistant-actionable for `website`; B3)*
- **Option A: a generated card per post.**
  - What it is: `app/blog/[slug]/opengraph-image.tsx` draws a fixed backdrop and sets the cover fields in fixed slots, 1200×630, at build time.
  - Fonts: `ttf` or `otf` files of its own.
  - Slots: measured on real renders, so a too-long title fails the build rather than clipping (L-05 R1).
  - Byline: Alex's name on the card.
  - It needs no step per post and matches the on-page cover.
- **Option B: a static PNG per post from the Canva templates** (S-D6). It's closer to the LinkedIn-imagery work, but adds a manual export and a file per post. The card and the page cover could drift.
- **Option C: the site-wide image for every post**, with only the title and description per post (C1). It's the cheapest; every card then looks the same.
- **Optional, any option:** a square or 4:5 variant of the same template (sizes in L-05 R2 §5), for Alex's own image posts if he shares a post natively (C5 D).

**C3. A share check before any post link leaves the site.** *(Verify first; fits S-D5 §7 step 8, after "open the live URL and check it matches the file"; B4)*
- Once `BUILT` and live, run three checks:
  - The `<head>` of the production URL shows the post's own `og:title`, `og:url` and `og:image` (a curl, as in B1).
  - The URL loads logged out, on a phone if possible.
  - Optionally, Post Inspector on the exact URL (Alex's session).
- Rule of thumb, for every session and for Alex: never paste a `/blog/<slug>` link, or a preview URL, anywhere before that check. Options: adopt it as written, fold it into DoD-15's check (S2), or skip it.

**C4. Make each post findable from the page the six land on.** *(Assistant-actionable for S-D5's publish BUILD wording; B5)*
- Options:
  - **A.** Each publish BUILD also asks for a feed post ("New post: <title>", its subtitle and link), as demo pages get, and a `/blog` link in the header or "start here" box once the first post is live.
  - **B.** Only the `/blog` link.
  - **C.** As planned: listed on `/blog` only.

**C5. A route that carries a post to the six.** *(Operator decision; B5)*
- **A. Passive.** The site only (C4). No message mentions the posts.
- **B. From their own pages.** A stakeholder section links the post most relevant to that person's role. Write about the role, not the person, per L-01 R3 and R4.
- **C. In the hand-over message.** L-01 W2 C6's "it's finished" note also names the posts. That's in Alex's own outbound sequence, so it's his to word.
- **D. Alex shares each post by hand on his own LinkedIn.** The charter allows it (his own account, nothing automated). The link goes in the body or a comment, per L-05 R4's data. It reaches his network rather than the six specifically.
- Any route that puts a link in front of them depends on C1 to C3 first.

**C6. Search basics.** *(Assistant-actionable for `website`; low priority; B5)*
- An `app/sitemap.ts` listing the published posts, and an `app/robots.ts`. The post page's canonical equals its `og:url`. Non-published posts stay `noindex`, as `POST-FORMAT.md` already says.
- Options: add them with B1, add them in the morning cleanup, or skip. Google takes days to weeks either way, so this serves visitors after the hand-over, not the six this week.

**C7. One paste that settles B2.** *(Verify first; Alex's, about 1 minute, needs his LinkedIn session)*
- Paste `https://hire-me-hackathon.vercel.app/d4` into LinkedIn's Post Inspector:
  - If it shows "The Hire Me Hackathon" or the homepage URL, the inheritance in B1 is confirmed on LinkedIn, and C1 B (fixing the demo pages too) matters for every demo link already planned.
  - If it shows the D4 page correctly, B2 is weaker than inferred, though C1 still applies to the posts.
- Options: run it, or skip it and do C1 anyway.

---

## Sources

**Local, read-only**
- `CHARTER.md`; `research\lists\L-03-blog.md`; `research\SPEC.md` §4; `research\DIRECTORY.md`
- `research\global\L-01-W2-wildcard-delivered.md`; `research\global\L-05-R1-pixel-perfect-demo.md` (verdict); `research\global\L-05-R2-canva-capabilities.md` §5; `research\global\L-05-R4-brand-voice-posts.md` (format and link findings)
- `blog-pipeline\SPEC.md`; `blog-pipeline\POST-FORMAT.md`; `blog-articles\SPEC.md`
- `website\CLAUDE.md`; `website\SPEC.md` (Structure; how specs ask for site work); `website\app\layout.tsx`; `website\app\docs\[slug]\page.tsx` and `website\app\[demo]\page.tsx` (`generateMetadata`); `website\app\opengraph-image.alt.txt`
- Next.js docs shipped with the site (Next `^16.4.3`), `website\node_modules\next\dist\docs\01-app\03-api-reference\`: `04-functions/generate-metadata.md` (Merging), `03-file-conventions/01-metadata/opengraph-image.md`, `04-functions/image-response.md`

**Live probe**
- `https://hire-me-hackathon.vercel.app/`, `/d4`, `/docs/charter`, `/blog`, `/sitemap.xml`, `/robots.txt`, `/opengraph-image.png`: unauthenticated GET and HEAD, 2 Nov 2026, 16:38 Prague; `<head>` tags and headers only

**Open Graph and link cards**
- LinkedIn Help, Make your website shareable on LinkedIn (46687): https://www.linkedin.com/help/linkedin/answer/46687
- The Open Graph protocol: https://ogp.me/
- Facebook for Developers, sharing: canonical URLs and `og:url`: https://developers.facebook.com/docs/sharing/webmasters/getting-started/versioned-link/
- GrowSurf, LinkedIn and canonical URLs: https://support.growsurf.com/article/273-can-i-enable-linkedin-as-a-social-sharing-option
- link.boo, LinkedIn link preview not showing: https://link.boo/guides/linkedin-link-preview-not-showing
- Kinsta, LinkedIn debugger (Post Inspector): https://kinsta.com/blog/linkedin-debugger/
- Expandi, LinkedIn Post Inspector: https://expandi.io/blog/linkedin-post-inspector/
- Wix, updating the share image on LinkedIn: https://support.wix.com/en/article/updating-the-share-image-on-linkedin

**Vercel and Google**
- Vercel KB, are preview deployments indexed by search engines: https://vercel.com/kb/guide/are-vercel-preview-deployment-indexed-by-search-engines
- Google Search Central, ask Google to recrawl your URLs: https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl

**LinkedIn reach (vendor data)**
- Ordinal, LinkedIn link penalty study (cites van der Blom and LinkPost): https://www.tryordinal.com/blog/linkedin-link-penalty-study
- DSMN8 and Socialinsider figures as cited in L-05 R4: https://dsmn8.com/blog/whats-working-on-linkedin-in-2026-report-key-findings/ and https://www.socialinsider.io/social-media-benchmarks/linkedin
