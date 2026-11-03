# The full LinkedIn wall

2 Nov 2026, about 20:55. `wall-full.json` holds every post Alex wrote in the scrape (94), newest first, with every image saved locally in `img\`. It replaces the 34-post `wall.json` once `website` switches over. Nothing is deployed or committed yet.

## Counts

| | |
| --- | --- |
| Posts | 94 (31 Oct back to 4 May 2026): May 31, Jun 9, Jul 4, Aug 15, Sep 8, Oct 27 |
| Kept | 94. Alex, 20:45: "I want everything in there. All of them. Some of them are edgy, that's fine. I have personality." |
| Held for Alex | 0. The 17 edgy posts are kept, so there's no `EDGY-REVIEW.md`. |
| With images | 53 posts, 92 files, 14.3 MB: 52 photos and screenshots, 31 document pages (3 PDF carousels, every page), 5 link-card previews, 3 images from Alex's own older posts that he quotes, and 1 video cover |
| Image missing | 0 (three suspects checked, below) |
| Quote posts | 11. Each one carries his own text, so all are in. Plain reposts were never scraped. |

On the old wall, 12 of the 34 posts showed images. With all media fetched, 16 of those same 34 have images (45 files).

## Where the 94 posts came from

One Apify run on 2 Nov at 18:07 (run log `..\..\draft\wall\log-posts.txt`, settings `..\..\draft\wall\in-posts.json`):
- actor: `harvestapi/linkedin-profile-posts`, cookie-free, with no login
- profile: `linkedin.com/in/alex-the-ai-instructor`
- window: the last 6 months, up to 250 posts, quote posts in, reposts out
- result: 94 posts, which is everything in that window (the actor reported "Posts found 94"), at a cost of $0.188

The raw dataset is `..\..\draft\wall\posts-raw.json`, which is git-ignored.

## How 60 posts were dropped

1. **The picking subagent dropped 59.** It ran in the scraping session at about 18:1x on Alex's brief: "make a carousel of as many insightful posts. Avoid the super edgy ones ... as many as 20 to 40 of them". It was told to pick about 30, so it picked 35 and excluded 59:
   - 31 as thin
   - 17 as edgy
   - 10 as duplicates
   - 1 as awkward (the 17 Oct inbound-outbound "honeypot")

   It read the text in `posts-compact.json`, which flags images but doesn't contain them, so it judged every post by its text alone. **20 of the 31 "thin" posts are image posts**, for example "rude", "ai is fun" and "If you can read the attached image, this is a cry for help", which are mostly the AI screenshots Alex was missing. 10 of the 17 edgy posts also have images.
2. **The S-D1 reviewer dropped 1** (the 14 May "Operator error feedback" post) for one uncensored f-word, because the wall faces Addvery leadership. That left 34.
3. `picks.json` saved only the counts, not which post went where. The per-post lists were recovered from the subagent's helper script in its session transcript (scraping session `bbc4d635`, subagent `a7febf7c0711cf86f`). Each post's `dropped_reason` comes from those lists, with the subagent's own note added where it left one.

**Why the wall showed so few images.** `build_wall.py` downloaded only `postImages` and video covers. For the 2 PDF carousels it kept (27 pages), it noted only the title. It also skipped link-card previews and the posts Alex quotes. `build_wall_full.py` fetches all of them, including every page of a carousel through LinkedIn's page manifest, not just the 3 cover pages in the scrape.

## The record

The record has the same fields as `wall.json`: `id`, `date`, `url`, `text` (verbatim), `collapsed`, `has_more`, `images`, `document`, `video`, `reactions`, `comments` and `why`. These are added:

- `images`: every file, as `img/<post id>-<n>.<ext>`, each with `width`, `height` and `kind` (`image`, `document-page`, `video-cover`, `link-preview` or `quoted`). Files are numbered in this order: photos, then document pages, then the video cover, then the link preview, then quoted images.
- `kept`: `true` on all 94.
- `dropped_reason`: why the post was left off `wall.json`, or `null` for the 34 it kept. It's for the build, not for display, and the same goes for `why`.
- `quote_of`: for a quote post. When Alex quotes himself, this holds his older post's text and its images, or `in_wall: true` when that post is already among the 94. When he quotes someone else, it holds only the URL, with the author's name only when the author is a company (Claude, Anthropic, Black Forest Labs). Other people's text, names and media aren't copied.
- `link`: the article card's title, site and URL.
- `poll`: the question and options, without votes.
- `image_missing`: `null` on all 94.

## Image missing: none found

Three posts read as if they had a picture the scrape didn't return:
- 24 Aug, the captcha post: "this change 🔻"
- 4 Sep: "Meta: ... 1.3"
- 25 Sep: "/context ... 172 tools"

I sent one guest request to each public post page, with no login and no Apify. All three serve LinkedIn's generic text-only `og:image`. Two control posts that do have images serve their own image there. So the three are text-only on LinkedIn, and nothing is missing.

If Alex remembers one of them having a picture, these are the ways to get it:
- free: open the post and save the image by hand
- paid: run an Apify post-detail scraper on that one URL, which costs cents (check the actor's Store price first)

Nothing was run.

## What the scrape can't see: posts before 4 May

The 6-month window cuts off at 4 May. Alex has older posts: three of the posts he quotes date from 31 Mar, 19 Apr and 24 Apr, and their text and images are carried in `quote_of`.

To get all of his older posts, rerun the same actor without the 6-month limit, with `maxPosts` set above his total. Tonight's run worked out to about $2 per 1,000 posts, so a few hundred older posts would cost well under $1. Not run (no paid actors without Alex).

## The image check (DoD-22)

I looked at all 76 images that weren't on the old wall's 18:2x check. I found no keys or tokens, nothing from GetSales outbound and nothing about the Apify proposal. Every image is from Alex's own public posts.

The only secret-shaped string in the JSON is a joke inside a post ("<Bearer token protocol>").

These are judgment calls, not blockers. Alex said all posts go in:
- **17 Sep** (`7506308973780721664`, "See you guys in a few hours"): Apify's own promo for its AI marketing meetup, with Alex as a speaker. It's public, but it's Apify, and the screen-care rule keeps anything near the proposal off the site.
- **31 Oct** (`7522341978378874880`, Halloween): two photos of his child in costume, with the face covered by his thumb.
- **17 Oct** (`7517294736366538752`, the "honeypot", which was dropped as awkward): a redacted email in which he pitches his outbound services, and a prompt about data vendors (Apollo, Listkit, Clay).
- **13 Oct** (`7515830862135853058`): another company's careers page for a Prague "Gen AI Consultant" role, captioned "lol!".
- **14 May** (`7460673722161618945`): the f-word appears in the screenshot as well as the text.

## For `website`

- Read `scraping\site\linkedin-wall\wall-full.json` and copy `img\` the way `scripts\about_assets.py` does now. Hide `why` and `dropped_reason`.
- The 16 date-prefixed files in `img\` (`2026-…-<id>-<n>.jpg`) serve only `wall.json`. Once the site reads `wall-full.json`, they can go.
- The images are now 14.3 MB in total (15.7 MB with the old 16). STATUS item 5 still asks Alex whether wall images stay tracked in the public repo.

## Rebuild

`python -I scraping\build_wall_full.py` reads `draft\wall\posts-raw.json`, `picks.json` and `meta.json`, and writes `wall-full.json`. It never downloads a file twice.

LinkedIn's links in the scrape expire between 9 and 19 Nov. After that, a rerun still works from the files already in `img\`, but it can't fetch anything new.
