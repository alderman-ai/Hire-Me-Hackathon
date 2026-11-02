# L-03 R4: What a finished B2B post looks like

> "What a finished B2B post looks like. What structure, length and visuals make a B2B agency's blog post look finished and get read in 2026 (headings, pull quotes, diagrams, cover image, SEO basics)? What's the smallest template that delivers that?"

- 2026-11-02
- session s1-research subagent
- item 4 of 9 on list L-03
- Serves: DoD-14 ("good-looking"), DoD-15 (the posts live on the site). Readers: S-D4 blog pipeline, S-D5 blog articles.

---

## Method

- **When:** all searches and fetches ran on 2 Nov 2026, in one sitting of about 15 minutes. Not a deep item.
- **Tools:** WebSearch and WebFetch. Two pages refused the fetch (403): MarketingProfs' write-up of Orbit Media's 2025 survey and Edelman's 2025 press page. For those I used search-result summaries and say so.
- **What I searched:** blog length and format benchmarks (Orbit Media's annual blogger survey, Medium's 2013 Data Lab); reading behaviour (NN/g eyetracking on scanning patterns, the inverted pyramid, images); body-text typography (Baymard, Butterick's Practical Typography, WCAG); pull-quote accessibility (W3C DPUB-ARIA list, DAISY, design-system docs); Google's own guidance (helpful content's "Who, How, and Why", AI-content post, AI features, title links, Article structured data); link-preview images (LinkedIn's specs via third-party guides, Next.js `opengraph-image`); B2B readership (Edelman-LinkedIn thought leadership reports, CMI).
- **Also read, read-only:** `blog-pipeline\SPEC.md` and `blog-pipeline\POST-FORMAT.md` (v1), so every finding can say whether it changes the planned format.
- **How strong the sources are,** strongest first: Google's own Search Central docs (first-party platform guidance); NN/g eyetracking research; typography references (Baymard, Butterick, WCAG); framework docs (Next.js); vendor surveys (Orbit Media is a web agency surveying ~1,000 bloggers on self-reported results; Edelman-LinkedIn is an agency plus a platform that sells B2B ads); vendor SEO blogs on AI Overviews (weakest; untraceable numbers).
- **Conventions:** every substantive claim has a link. **(inference)** marks my own reasoning. **(search summary)** marks a figure I saw only in a search summary and couldn't fetch. **(vendor data)** marks figures from a party that sells the thing measured, or from self-reported surveys.
- **Scope:** nothing about Addvery. I didn't open `Addvery Research\`, the Apify proposal, the private repo or any GetSales data.

---

## Verdict

1. **Yes, there's a converged answer, and the v1 post format already holds most of it.** A post looks finished and gets read when: the point comes first (lede plus a key-points box), the headings carry the argument so a scanner can read only them, the body is roughly 900 to 1,400 words at a readable measure (about 45 to 90 characters a line, 15 to 25px), visuals carry information rather than decorate, and the byline says who wrote it and how. Google says it has no preferred word count and no special requirements for AI Overviews; it asks for bylines and, where readers would expect it, a disclosure of how automation was used. That last point backs the "How this post was made" box directly.
2. **The planned format has four gaps:**
   - **No link-preview image.** The typographic cover exists only in HTML, so a shared link shows no image.
   - **Pull quotes are read twice by screen readers** unless the template hides them.
   - **No visual can carry an idea.** Images are banned and there's no diagram block, yet article 1's argument is literally a vertical scale.
   - **The key-points box is optional.** The evidence favours it on by default.

   Each gap is small and costs a template rule or one file, not a pipeline stage. **(inference)**
3. **The traps are mostly about evidence quality.** Every length and visuals figure is a self-reported, correlational vendor survey. The "how to get cited by AI Overviews" numbers are untraceable vendor claims, and Google says no special optimisation is needed. SEO is hygiene here, not strategy: these posts reach their readers by link from the site, not from search. **(inference)**

---

## Evidence, by part of the question

Each part answers: (1) is there a converged answer; (2) if not, the traps; (3) what would change the planned approach (`POST-FORMAT.md` v1).

### A. Structure and headings

**(1) Converged: yes.**
- NN/g's eyetracking work names four scanning patterns and calls the **layer-cake pattern** (eyes on headings and subheadings, then into the section they want) "by far the most effective way in which users can scan pages". It warns that "most users will read very little from a wall of text", and its advice is "meaningful subheadings", bulleted lists and visually distinct keywords ([NN/g, Pernice, 25 Aug 2019](https://www.nngroup.com/articles/text-scanning-patterns-eyetracking/)).
- NN/g's **inverted pyramid** puts the conclusion first, and "the first sentence of every paragraph should be the most important", so a reader who stops anywhere still leaves with the point ([NN/g, Schade, 11 Feb 2018](https://www.nngroup.com/articles/inverted-pyramid/)).
- Practitioner B2B guides converge on the same thing for AI search: lead with the answer, use clear sections ([eesel AI](https://www.eesel.ai/blog/b2b-blog-writing), [Weidert](https://www.weidert.com/blog/what-is-a-blog-post); practitioner opinion).

**(2) Traps.**
- **Label headings** ("Background", "The problem") break the layer-cake pattern: a scanner reading only the headings learns nothing. NN/g's word is "meaningful". **(inference from NN/g)**
- **Answer-first is easy to fake with a generic intro.** The lede has to state the actual claim. That's the Outline and Draft prompts' job, not the template's. **(inference)**
- **Vendor numbers on "AI citations":** one blog says 44.2% of ChatGPT citations come from the first 30% of a page, another claims 71% versus 23% for answer-first. Neither gives a method ([search summary](https://www.texta.ai/blog/ai-overviews-content-structure-2026), [search summary](https://blckalpaca.at/en/knowledge-base/seo-geo/on-page-seo/heading-hierarchy-28x-more-ai-citations-with-correct-structure)). Don't cite them on the site.

**(3) What would change the plan.**
- v1 already has a lede, a key-points box (optional), 4 to 6 `##` sections and 1 to 4 sentence paragraphs.
- **Change 1:** make the key-points box the default (3 to 4 bullets) rather than optional.
- **Change 2:** add a heading rule to the Outline prompt: each `##` states the section's point, or the question the reader is asking. Not a label.
- Both are Alex's call (Recommendations, options 2 and 3).

### B. Length

**(1) Converged: a band, not a number.**
- Orbit Media's survey puts the average blog post at **1,312 words in 2026** (1,042 respondents), down from a 2023 peak of 1,427 ([Orbit Media, 2026 survey page](https://www.orbitmedia.com/blog/blogging-statistics/); vendor data, self-reported). For 2025 it was **1,333 words** (808 respondents, Aug 2025), with only 9% publishing over 2,000 words ([MarketingProfs, 2025](https://www.marketingprofs.com/charts/2025/53736/blogging-benchmarks-2025-word-count-frequency-study-orbit-media); search summary, fetch refused).
- Medium's 2013 Data Lab found total reading time per post peaks at about **7 minutes**, roughly 1,600 words. Its own authors warn "there is enormous variance" ([Eugene Wei on Medium's data, 2013](https://www.eugenewei.com/blog/2013/12/9/optimal-blog-post-lengths); platform data, 13 years old).
- Google, asked whether it has a preferred word count: "(No, we don't.)" ([Google Search Central, helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)).

**(2) Traps.**
- **Longer looks better in the surveys, but it's correlation.** In 2025, 39% of bloggers writing 2,000+ words reported strong results against a 21% benchmark ([search summary](https://www.marketingprofs.com/charts/2025/53736/blogging-benchmarks-2025-word-count-frequency-study-orbit-media)). That's self-reported and confounded: teams that write long also do more of everything else. Orbit's own 2026 page says marketers using six or more strategies report 39% strong results, against 4% for those using one or none ([Orbit Media](https://www.orbitmedia.com/blog/blogging-statistics/)).
- **Padding a 15-minute dictation to 2,000 words** means inventing content, which is exactly what the pipeline's Edit stage forbids. **(inference)**

**(3) What would change the plan.** Nothing. v1's 900 to 1,400 words sits on the 2025–26 average. It's also what a dictation of about 2,100 spoken words (the sample's figure) can honestly fill. Reading time at 230 words a minute gives 4 to 7 minutes.

### C. Readable measure and type

**(1) Converged: yes, within ranges.**
- **Line length:** Baymard puts it at 50 to 75 characters ([Baymard](https://baymard.com/blog/line-length-readability)); Butterick at 45 to 90 ([Practical Typography](https://practicaltypography.com/summary-of-key-rules.html)); WCAG 1.4.8 caps it at 80 ([via Baymard](https://baymard.com/blog/line-length-readability)).
- **Size and spacing:** web body text of 15 to 25px, line spacing 120 to 145% ([Butterick](https://practicaltypography.com/summary-of-key-rules.html)).

**(2) Traps.**
- The site's 720px feed column at 17px runs near 85 characters, which v1 already flags.
- Line height: v1's 1.6 sits above Butterick's 145%, but within common web practice and above WCAG 1.4.8's 1.5 floor. Not a problem. **(inference)**

**(3) What would change the plan.** Nothing. v1's `max-width: 68ch`, 18px, line-height about 1.6 sits inside every range above.

### D. Pull quotes

**(1) Converged on how, not on whether.**
- **On whether:** I found no reading-behaviour evidence that pull quotes raise reading. They're an editorial convention that makes a long page look designed ([UMN Folwell typography guide](https://folwell.umn.edu/typography/pull-quotes-and-block-quotes)).
- **On how, accessibility:** because a pull quote repeats body text, design systems hide it from screen readers with `aria-hidden="true"` so it isn't read twice. REI's Cedar quote component does this ([Cedar](https://cedar.rei.com/components/quote)), as does the W3C DPUB-ARIA discussion ([W3C list, 2016](https://lists.w3.org/Archives/Public/public-dpub-aria/2016Nov/0005.html)). The planned ARIA role for repeated content isn't shipped ([DAISY KB](https://kb.daisy.org/publishing/docs/html/dpub-aria/doc-pullquote.html)).

**(2) Traps.**
- **Read twice by screen readers** if not hidden.
- **Next to its own sentence, it looks like a bug.** v1 already forbids that.
- **Too many quotes look like padding.** v1 caps them at 1 to 3, one per section. **(inference)**

**(3) What would change the plan.** One template rule for `website`: render each `[!pull]` with `aria-hidden="true"`, and as an `aside` or `figure` rather than a `blockquote`, since it isn't quoting anyone else. **(inference on the element choice)**

### E. Visuals: diagrams and images

**(1) Converged: informative visuals help; decorative ones are ignored.**
- NN/g's eyetracking: "big feel-good images that are purely decorative" are "completely ignored", and users ignore stock photos of generic people. Images that carry relevant information get scrutinised ([NN/g, "Not All Images Are the Same"](https://www.nngroup.com/articles/photos-as-web-content/)).
- Orbit Media: bloggers using **2 to 3 visuals per post** are the most likely to report strong results ([Orbit Media](https://www.orbitmedia.com/blog/blogging-statistics/); vendor data, correlational; the exact percentages are only in a chart image, and the year isn't stated).
- Google's AI features guidance: "supporting your textual content with high-quality images and videos, when applicable" ([Google](https://developers.google.com/search/docs/appearance/ai-features)).

**(2) Traps.**
- **A generated hero image per post** adds a step and a review, and NN/g says decorative imagery is ignored anyway. v1's typographic cover is defensible on that evidence.
- **A diagram drawn as an image file** needs a design pass each time, and its text isn't searchable or accessible. A diagram the template draws from structured text avoids both. **(inference)**

**(3) What would change the plan.**
- v1 bans images and has no diagram block, so a post has **zero** information-carrying visuals.
- Article 1's argument (Alex's OT-04 note: a vertical sliding scale from training at the bottom to external building at the top) is a natural single diagram. **(inference)**
- **The option:** a `[!diagram]` callout holding an ordered list of 3 to 6 short labels, each with an optional one-line note. The template draws it in the site's look as a vertical scale or a step flow. No image tool, no per-post design step.
- This is Alex's call against the logged decision "no generated images" (SPEC §9). It doesn't break that decision, since nothing is generated as an image (Recommendations, option 4).

### F. Cover image and the link preview

**(1) Converged: the cover can be typographic, but the shared link needs an `og:image`.**
- LinkedIn's link-preview spec: at least **1200 × 627 px**, a 1.91:1 ratio, at most 5 MB, an absolute HTTPS URL. Images under 401px wide show as a thumbnail ([Kinsta](https://kinsta.com/blog/linkedin-debugger/), [Postiz](https://postiz.com/blog/image-size-for-linkedin-posts); third-party guides citing LinkedIn's help page, which I didn't reach). 1200 × 630 is the common cross-platform default and displays essentially the same ([Krumzi](https://www.krumzi.com/blog/og-image-size-cheat-sheet-1200x630)).
- **LinkedIn caches previews.** Changing the image after a link is first shared needs a Post Inspector refresh ([Kinsta](https://kinsta.com/blog/linkedin-debugger/)).
- **The cost is one file in the site.** Next.js generates a per-post `og:image` from code through `opengraph-image.tsx` in a dynamic route (`app/.../[slug]/opengraph-image.tsx`, `ImageResponse` from `next/og`, 1200 × 630 in the docs' example), statically at build time by default ([Next.js docs, updated 2026-07-09](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image)).

**(2) Traps.**
- **No `og:image` means a bare text card**, or the site's default image, when the post is shared. That's the first impression in a LinkedIn feed. **(inference)**
- **The cache:** the image has to be right before the first share.
- **Router assumption:** I haven't checked whether the site uses the App Router, which this file convention needs. **(inference; `website` knows)**

**(3) What would change the plan.**
- v1 sets only the OG description.
- **Add:** a BUILD line to `website` for a per-post `og:image` drawn from the same `cover` fields (kicker, title, accent, the site's colours) at 1200 × 630. No new front-matter field is needed (Recommendations, option 1).

### G. SEO basics and the byline

**(1) Converged: yes, and it's short.**
- **Title:** descriptive, concise, unique per page. Google sets no length limit and truncates to device width ([Google, title links](https://developers.google.com/search/docs/appearance/title-link)).
- **Meta description, slug, single H1, internal links, crawlable text** are the standard basics. Google lists internal links, page experience, textual content and "structured data [that] matches the visible text". It also says "there are no additional requirements to appear in AI Overviews or AI Mode, nor other special optimizations necessary" and "no special schema.org structured data that you need to add" ([Google, AI features](https://developers.google.com/search/docs/appearance/ai-features)).
- **Article structured data** has "no required properties". The recommended ones are `headline`, `author` (name, url), `datePublished`, `dateModified` and `image`, with images at 16:9, 4:3 and 1:1 and at least 50K pixels ([Google, Article](https://developers.google.com/search/docs/appearance/structured-data/article)).
- **Byline and "how it was made":** Google "strongly encourage[s] adding accurate authorship information, such as bylines", with "background about them and the areas they write about". On the "How" it asks: "Is the use of automation, including AI-generation, self-evident to visitors through disclosures or in other ways?" and "Are you providing background about how automation or AI-generation was used?" It adds "consider adding these when it would be reasonably expected" ([Google, helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)). It warns that "giving AI an author byline is probably not the best way" to disclose ([Google Search Central blog, 8 Feb 2023](https://developers.google.com/search/blog/2023/02/google-search-and-ai-content)).

**(2) Traps.**
- **Cover title and H1:** if the template renders the cover title as styled text and a second heading elsewhere, the page gets zero or two H1s. The cover title should be the page's only `<h1>`. **(inference; v1 already bans `#` in the body)**
- **Structured data that doesn't match the page** (another headline, another date) goes against Google's own advice above.
- **Previews must stay `noindex`.** v1 already does this.
- **Keyword-first writing:** Orbit's 2026 data shows marketers who always do keyword research and those who never do converge at about 23% strong results ([Orbit Media](https://www.orbitmedia.com/blog/blogging-statistics/); vendor data). For three posts read by link, SEO is hygiene. **(inference)**

**(3) What would change the plan.**
- The "How this post was made" box and the "Alex Alderman" byline are what Google's "Who, How, and Why" asks for. Keep both.
- **Optional, small:** an Article JSON-LD block drawn from the front matter (`headline` = title, `author` = Alex with a URL, `datePublished`, `dateModified`, `image` = the og image), plus a canonical URL.
- **Author box:** give it one line of background and a link, since Google asks for "background about them". v1 says the template adds the author bio.

### H. "Get read" by B2B readers

**(1) Partly converged.**
- About half of B2B decision-makers spend an hour or more a week on thought leadership: 52% in 2024 by one summary, 54% by another ([Edelman-LinkedIn 2024 report PDF](https://www.edelman.com/sites/g/files/aatuss191/files/2024-02/_2024%20Edelman-LinkedIn%20B2B%20Thought%20Leadership%20Impact%20Report%20Final.pdf); search summary). One aggregator puts it at 64% in 2025 ([shno.co](https://www.shno.co/marketing-statistics/thought-leadership-statistics); search summary).
- Only about 15% rated what they read as very good or excellent in 2024 (same PDF; search summary).
- All of it is vendor data: Edelman is an agency and LinkedIn sells B2B ads.

**(2) Trap.** What makes a post get read is mostly its substance (a specific, earned point of view), which is R1's and R6's territory, not the template's. The template can only make it look finished and easy to scan. **(inference)**

**(3) What would change the plan.** Nothing in the template. It argues for keeping the Edit stage's "every claim traces to the dictation" rule and the `[Alex: ...]` markers for a real number or example.

---

## Evidence gaps

- **No causal evidence** for any post element in B2B. Length and visuals data are self-reported, correlational vendor surveys. Orbit's per-element percentages (the 2–3 visuals finding) are only in chart images I couldn't read.
- **Orbit's 2025 figures** (1,333 words, 808 respondents, 39% versus 21%) come from search summaries. MarketingProfs refused the fetch. The "strong results" benchmarks also differ by year (21% in 2025 by summary, 13.9% in 2026), so cross-year comparisons are shaky.
- **Pull quotes:** no evidence either way that they raise reading. Only convention and accessibility guidance.
- **AI Overviews and LLM citations:** no independent study found. Only vendor claims, plus Google's statement that nothing special is needed.
- **Edelman-LinkedIn** primary pages refused the fetch (403). The figures are search summaries and conflict between sources (52% or 54% for 2024).
- **LinkedIn's own help page** for link-preview specs wasn't reached. 1200 × 627 comes from third-party guides citing it.
- **No exemplar teardown.** I didn't survey real B2B agency blogs for a side-by-side of their post anatomy. That would take a deeper pass.
- **The site's router** (App Router or not) isn't checked. It decides whether the `opengraph-image` file convention applies as-is.

---

## Recommendations (options for Alex; every call is his)

The v1 format already matches the converged answer on structure, length, measure, byline and disclosure. The options below are the deltas, cheapest first. Each says what it costs and what happens if he says no.

1. **A per-post link-preview image from the typographic cover.** One file in the site, built from the existing `cover` fields at 1200 × 630.
   - *For:* every LinkedIn or Slack share of a post shows a branded card. LinkedIn caches the first one, so it should exist before the first share.
   - *If no:* shared links show a text card or the site's default image.
   - Owner: `website`, via an S-D4 BUILD line.
2. **Key-points box on by default** (3 to 4 bullets, each under 20 words) instead of optional.
   - *For:* inverted pyramid and scanning evidence (NN/g).
   - *If no:* the lede carries the point alone.
   - Owner: S-D4's Format prompt and `POST-FORMAT.md`.
3. **A heading rule in the Outline prompt:** each `##` states its section's point, or the reader's question. Not a label.
   - *For:* the layer-cake pattern (NN/g).
   - *If no:* headings depend on the draft.
   - Owner: S-D4's prompts. No template change.
4. **One optional `[!diagram]` block**, drawn by the template from an ordered list (3 to 6 labels), at most one per post.
   - *For:* informative visuals get attention and decorative ones don't (NN/g); "2–3 visuals" correlates with self-reported results (Orbit, vendor data); article 1's vertical scale is a diagram already.
   - *Against:* one more callout type for `website` to build, and a rule for the Outline stage on when to use it.
   - *If no:* posts stay text-only, which v1's "no generated images" decision already accepts.
5. **Pull quotes hidden from screen readers** (`aria-hidden="true"`) and rendered as an aside.
   - *For:* standard design-system practice.
   - *If no:* screen-reader users hear each quote twice.
   - Owner: `website`. A one-line note in `POST-FORMAT.md` §5.
6. **Article JSON-LD and a canonical URL**, drawn from front matter that already exists, matching the visible text.
   - *For:* Google's recommended properties, and the author link supports "Who".
   - *If no:* no visible difference. Lowest priority.

Not recommended for change: the 900 to 1,400 word band, the 68ch / 18px measure, the typographic cover, the "How this post was made" box (Google's "How" guidance supports it as it stands), and the "Alex Alderman" byline (Google advises against AI bylines).

---

## The smallest template (blocks, with rough word counts)

What a reader sees, in order:

1. **Cover** (typographic, the page's only H1): kicker 1–4 words; title up to about 12 words; subtitle (the one-line promise) up to 20 words. About 30 words.
2. **Byline line:** author · date · reading time. About 8 words.
3. **Lede:** 1–3 short paragraphs stating the problem, who has it and the post's claim, answer first. 80–150 words.
4. **Key points box:** 3–4 bullets, each one sentence under 20 words. 50–80 words.
5. **Sections:** 4–5 `##` sections, each heading stating its point, each opening with its main sentence. 150–250 words each, 650–1,000 in all. Inside them:
   - 1–2 **pull quotes**, 8–30 words each, repeating a body sentence, hidden from screen readers.
   - 0–1 **diagram** (if option 4): 3–6 labels plus a one-line caption, about 20–50 words.
6. **Closing section:** what to do on Monday, plus the closing ask (often an `[Alex: ...]` note). 60–120 words.
7. **Author box:** name, one line of background, one link. 20–40 words.
8. **"How this post was made" box:** the two sentences, the four-step flow and the details line, as v1 §4 defines them. 60–80 words.

Body total: about 900–1,400 words, which is a 4 to 7 minute read.

What the page carries out of sight (no words for the reader): a `<title>`; a meta description (140–160 characters); a canonical URL; Open Graph title and description; an `og:image` drawn from the cover at 1200 × 630 (option 1); Article JSON-LD (option 6); and `noindex` on every non-published status.

---

## Sources

- Google Search Central, "Creating helpful, reliable, people-first content" (Who, How, and Why; word count): https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google Search Central blog, "Google Search's guidance about AI-generated content", 8 Feb 2023: https://developers.google.com/search/blog/2023/02/google-search-and-ai-content
- Google Search Central, "AI features and your website": https://developers.google.com/search/docs/appearance/ai-features
- Google Search Central, "Influencing your title links": https://developers.google.com/search/docs/appearance/title-link
- Google Search Central, "Article structured data": https://developers.google.com/search/docs/appearance/structured-data/article
- NN/g, Kara Pernice, "Text Scanning Patterns: Eyetracking Evidence", 25 Aug 2019: https://www.nngroup.com/articles/text-scanning-patterns-eyetracking/
- NN/g, Amy Schade, "Inverted Pyramid: Writing for Comprehension", 11 Feb 2018: https://www.nngroup.com/articles/inverted-pyramid/
- NN/g, "Not All Images Are the Same" (photos as web content): https://www.nngroup.com/articles/photos-as-web-content/
- Orbit Media, annual blogger survey, 2026 results (vendor data): https://www.orbitmedia.com/blog/blogging-statistics/
- MarketingProfs, Orbit Media 2025 benchmarks (search summary; fetch refused): https://www.marketingprofs.com/charts/2025/53736/blogging-benchmarks-2025-word-count-frequency-study-orbit-media
- Eugene Wei on Medium's Data Lab, "Optimal blog post lengths", Dec 2013: https://www.eugenewei.com/blog/2013/12/9/optimal-blog-post-lengths
- Baymard Institute, line length and readability: https://baymard.com/blog/line-length-readability
- Matthew Butterick, Practical Typography, summary of key rules: https://practicaltypography.com/summary-of-key-rules.html
- UMN Folwell, "Pull Quotes and Block Quotes": https://folwell.umn.edu/typography/pull-quotes-and-block-quotes
- REI Cedar design system, quote component: https://cedar.rei.com/components/quote
- W3C public-dpub-aria list, pull quotes and duplicated content, Nov 2016: https://lists.w3.org/Archives/Public/public-dpub-aria/2016Nov/0005.html
- DAISY Knowledge Base, doc-pullquote: https://kb.daisy.org/publishing/docs/html/dpub-aria/doc-pullquote.html
- Next.js docs, `opengraph-image` and `twitter-image`, updated 2026-07-09: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
- Kinsta, LinkedIn Post Inspector and preview specs (third party): https://kinsta.com/blog/linkedin-debugger/
- Postiz, LinkedIn image sizes (third party): https://postiz.com/blog/image-size-for-linkedin-posts
- Krumzi, OG image size cheat sheet (third party): https://www.krumzi.com/blog/og-image-size-cheat-sheet-1200x630
- Edelman-LinkedIn 2024 B2B Thought Leadership Impact Report, PDF (vendor data; search summary): https://www.edelman.com/sites/g/files/aatuss191/files/2024-02/_2024%20Edelman-LinkedIn%20B2B%20Thought%20Leadership%20Impact%20Report%20Final.pdf
- shno.co, thought leadership statistics (aggregator; 2025 figure): https://www.shno.co/marketing-statistics/thought-leadership-statistics
- eesel AI, B2B blog writing guide (practitioner opinion): https://www.eesel.ai/blog/b2b-blog-writing
- Weidert, B2B blogging best practices (practitioner opinion): https://www.weidert.com/blog/what-is-a-blog-post
- texta.ai and blckalpaca.at, AI Overviews structure claims (vendor; untraceable numbers, cited only as a trap): https://www.texta.ai/blog/ai-overviews-content-structure-2026 · https://blckalpaca.at/en/knowledge-base/seo-geo/on-page-seo/heading-hierarchy-28x-more-ai-citations-with-correct-structure
