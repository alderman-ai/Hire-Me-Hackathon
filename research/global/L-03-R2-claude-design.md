# L-03 R2: The Claude design app

**Question, verbatim as approved:** "The Claude design app. What can Anthropic's Claude Design do today for a good-looking long-form post (layouts, imagery, brand kits)? How does its output leave the app (export, handoff to code, Vercel's Claude Design import)? Is it the right tool, or is a post template built into the Next.js site simpler?"

2 November 2026 · session s1-research subagent · item 2 of 9 on list L-03 (`research\lists\L-03-blog.md`)
Serves: DoD-14 ("good-looking"), DI-8 question 1. Readers: S-D4 blog pipeline, S-D5 blog articles.
Depth: not deep (one pass, about 15 minutes). The evidence on Claude Design and long-form posts in particular is thin: no source I found shows it being used for blog articles. The report says where that matters.

## Method

- On 2 Nov 2026, after L-03 started running (16:40 Prague), in one pass. WebSearch on: the Claude Design launch; its export and handoff options; Vercel's Claude Design import; image generation; blog and long-form use; the standalone site closing; `/design-sync` and Claude Design inside Claude Code.
- Primary sources fetched and read with WebFetch: Anthropic's launch post [1], four Claude Help Center articles [2][3][4][5], Anthropic's June/September update page [6], Vercel's KB guide [7], changelog [8] and MCP tool reference [9].
- The Vercel MCP tool schemas for `import-claude-design-from-url` and `get-design-import-job-status`, loaded with ToolSearch and read as descriptions only [10]. Neither tool was called.
- Third-party guides, given less weight and marked as such: [11][12][13]. Some points come from search snippets only, and those are marked too.
- A read-only look at the site: `website\app\docs\[slug]\page.tsx`, the head of `website\app\article.css`, `website\package.json`, plus the head of `blog-pipeline\POST-FORMAT.md` for the post contract [15].
- Help Center pages show only "Updated this week", with no date, so I treat them as current on 2 Nov 2026. Where I infer rather than cite, the text says **inference**.

## Verdict

1. **Claude Design is a strong tool for one-off visual work, not for publishing a series of posts.** It makes designs, prototypes, one-pagers, landing pages and slides, and it holds a brand design system that it checks its own output against [1][2][6]. No Anthropic source mentions blog posts or long-form articles [1][2][6]. Its only documented image input is uploads: no source documents image generation [2][12].
2. **Nothing it exports lands as `/blog/<slug>` on the existing site.** It exports a .zip, PDF, PPTX, Google Slides or standalone HTML; it sends to partners (Vercel among them) or hands off to Claude Code [2][6]. Vercel's import deploys **one self-contained HTML document** to a **protected** deployment, from a URL that expires in about 10 minutes and a token "supplied separately by Claude" [10]. The send-to-Vercel flow makes a new project with its own URL [7][8]. Getting a design into the Next.js site means rebuilding it as code, through a Claude Code handoff or by hand.
3. **The post template in the site (DI-8 option A) is simpler, and it's the only option that keeps the pipeline repeatable.** The site already renders Markdown articles in Addvery's case-study typography at `/docs/[slug]`, in an 85-line route, with a pull-quote style already in `article.css` [15]. A `/blog/[slug]` route is close to a copy of it. Claude Design fits at most as a one-off design pass on that template (option C), handed to `website` as a reference. It doesn't fit as a per-post step.

## Evidence

### Q1. What can Claude Design do today for a good-looking long-form post (layouts, imagery, brand kits)?

**What it is now.**
- Anthropic Labs launched it on 17 Apr 2026, "powered by our most capable vision model, Claude Opus 4.7", to create "polished visual work like designs, prototypes, slides, one-pagers, and more" [1].
- Since a September 2026 update it "works inside any conversation with Claude, including Claude Code and the Artifacts tab" [6]. The Help Center says the same: it's "available in chat, the Artifacts tab, and Claude Code" [2].
- New designs are created as artifacts, and the standalone site claude.ai/design closes on 14 Dec 2026 [5]. That's after this hackathon, so nothing here is affected.
- Observation from this environment: this session's own Artifact tool lists "designs" and "design systems" among its artifact types. That fits [2][6] (Claude Design reachable from a Claude Code session). I didn't call it.

**Layouts.**
- Anthropic's own examples are landing pages, prototypes, decks, one-pagers and marketing collateral. The Help Center's example prompt is "Build a landing page for our new API product with a hero section, code examples, and pricing" [2].
- It has a canvas editor "with drag, resize, and align layout tools" [6], and it can produce several directions on request ("three directions on a landing page") [6].
- No Anthropic page mentions blog posts, articles or long documents [1][2][6]. Long scrolling pages aren't covered either [2].
- **Inference:** a single long article is well within what it can lay out as HTML. What it doesn't offer is a reusable article *template* that takes new Markdown every time: each design is a project, and each change is another chat.

**Imagery.**
- Anthropic's pages describe uploading images "as reference material" (screenshots, wireframes, inspiration) [2], and "upload images and documents (DOCX, PPTX, XLSX)" [1]. Neither describes image generation.
- A third-party guide (updated 11 Oct 2026) says Anthropic "has not published documentation confirming whether Claude Design generates standalone raster logos", or vector illustrations [12]. Vendor and blog pages, from search snippets only, say Claude has no native image model.
- **Inference:** covers come out typographic or CSS/SVG-shape based, which matches S-D4's logged decision ("no generated images; each post gets a typographic cover", SPEC §9). Claude Design adds nothing on imagery that the site template lacks.

**Brand kits (design systems).**
- Claude Design "builds a design system for your team by reading your codebase and design files", and every later project "uses your colors, typography, and components automatically" [1].
- It "checks its output against your design system and corrects it before you see it" [6].
- Inputs can be a codebase or component library, a deck or document, logos, fonts, Figma files and uploads [3]. From Claude Code, `/design-sync` "reads your tokens and components directly, and works best for product design systems in code" [3].
- Design systems are in beta on Pro, Max, Ultra, Team and Enterprise [3].
- Limits: "a design system import is only as good as its source" [2]; without a design system the output is "functional but generic" [4]; there's "no version history yet", and multi-person editing "may be unreliable" [2].

**(1) Is there a converged answer?** No, not for long-form posts. The converged use of Claude Design is visual one-offs: landing pages, decks, prototypes [1][2][6]. No source shows it used as a blog template or for articles.

**(2) Traps and gotchas.**
- **Usage.** It shares the plan's usage limits with the rest of Claude, including Claude Code [2][6]. "There's no separate Claude Design allowance", and when the limits are hit, Claude Design is unavailable until they reset [2]. A third-party review says one session "used over half a week's Pro allotment" [11] (unverified). That's the same pool the background sessions and overnight build draw on (see L-01-W1).
- **Brand drift.** The site's `article.css` is already "a copy of Addvery's case-study article ... section for section", with values taken from their stylesheet [15]. A Claude Design rendering would be its own interpretation of that. **Inference:** it can only match the site's look as well as the design system it's fed, and the site already has the exact values.
- **Research-preview roughness:** comments that don't show, no version history, lag on large repos [2].
- **Plan names differ between sources:** launch: Pro/Max/Team/Enterprise [1]; Get Started: Free through Enterprise [2]; design systems: Pro, Max, Ultra, Team, Enterprise [3]. Which plan Alex's account is on isn't established here.

**(3) What would change the planned approach.**
- Alex wanting bespoke art direction *per post* (a magazine-feature look that differs post to post) rather than one consistent template.
- Alex wanting Claude Design visible as a demo moment on camera.
- Anthropic shipping image generation in Claude Design. None is documented as of this pass.

### Q2. How does its output leave the app (export, handoff to code, Vercel's import)?

**Export.**
- From the Export button: download as .zip, PDF, PPTX, Google Slides, or standalone HTML [2]. The launch listed "Canva, PDF, PPTX, or standalone HTML files" [1].
- Send-to destinations: Adobe Experience Manager, Adobe for Creativity, Adobe Journey Optimizer, Base44, Canva, Gamma, HubSpot, Hyperframes, Lovable, Miro, Netlify, Replit, v0, Vercel, Wix [2].
- One third-party guide warns that PPTX can differ from the screen, because it's converted from HTML [search snippet, horadecodar.com.br]. Not relevant for a web post.

**Handoff to code.**
- "Claude packages everything into a handoff bundle that you can pass to Claude Code with a single instruction" [1]. It can go to a local coding agent or to Claude Code Web [2].
- From Claude Code, `/design` can "create, edit, and sync design projects, import designs into a codebase, or turn code into a live prototype". Claude Code then continues from existing work "instead of starting over from a screenshot" [6].
- A third-party guide says the bundle carries the component structure as a machine-readable spec, the design tokens, the layout hierarchy and the assets, so Claude Code "writes the code against your actual component library" [11]. Anthropic doesn't publish the bundle's exact format (gap).
- A snippet-only source says the `/design` artboards need Claude Code CLI 2.1.183 or later [search snippet, pasqualepillitteri.it]. Unverified.

**Vercel, three documented routes** [7] (KB published 11 Jun 2026, updated 15 Sep 2026):
1. **Send to Vercel**, from Share > Send to... > Add a destination. Vercel's words: "the finished design on the canvas becomes a live Vercel deployment in a few clicks". It deploys "as a new project in your connected Vercel account" [8].
2. **Vercel Drop:** export a .zip and drop it on vercel.com/drop. "Each drop creates a new project", so a re-drop gives a new URL [7].
3. **Git:** use "Handoff to Claude Code", push to a repository, connect it to Vercel [7]. This is the only route that ends in a codebase.

**The Vercel MCP import tool, read from its live schema [10], never called.**
- `import-claude-design-from-url`: "Import a Claude design into a protected Vercel deployment from an authenticated URL. Accepts a self-contained HTML document up to 30 MiB. Requires protection for generated deployment URLs and project/deployment write access."
- The `url` is a "Direct HTTPS artifact URL on claudeusercontent.com. Expires in about 10 minutes."
- `download_token` is "Required access token supplied separately by Claude".
- "New imports reuse the same per-user project across title changes", and "A project-scoped connection creates a new deployment in that project."
- Creation is asynchronous, so `get-design-import-job-status` returns "processing, done or failed, and the protected deployment URL when done".
- **The live schema and the public docs disagree.** Vercel's docs page [9] says the URL is "Public HTTPS", "Valid for ~1 hour", with no token. The schema loaded today says authenticated, about 10 minutes, token required. The live schema is the one that runs.

**(1) Is there a converged answer?** Yes, for "a design to its own URL": Send to Vercel, or Vercel Drop [7][8]. Yes, for "a design into an existing codebase": hand off to Claude Code, then build it there [1][6][7]. Neither puts a design inside an existing Next.js site as a route by itself.

**(2) Traps and gotchas.**
- **The import isn't a terminal tool for `website`.** It needs a claudeusercontent.com URL plus a download token that Claude supplies, valid for about 10 minutes [10]. **Inference:** it's the back end of Claude Design's "Send to Vercel", driven from inside Claude. A terminal session can't run it on its own from a file. S-D4's SPEC §7 (option B) assumes `website` runs this import tool, and that assumption doesn't hold as written.
- **It deploys a single HTML document, not a site route.** Its output is one self-contained HTML file on a *protected* URL [10]. That page wouldn't have the site's chrome, its `/blog/<slug>` path, the post format, the analytics or the preview card. **Inference:** protection means public visitors can't open it without a bypass, so it can't publish a post.
- **The project-scoped trap.** With a connection scoped to a project, the import "creates a new deployment in that project" [10]. **Inference:** if that project were the live site, the deployment would contain only the imported HTML. It would be protected and not production, but one mistaken promote would replace the site. Keep the import away from the site's project.
- **Drop and Send-to make new projects and URLs every time** [7][8], so links in a feed go stale with each re-export.
- **The Get Started page doesn't list Canva among the send-to destinations,** though the launch post did [1][2]. Not relevant to the blog.

**(3) What would change the planned approach.**
- Anthropic or Vercel adding an import *into an existing project's route* (none is documented).
- `website` deciding to host posts as static HTML under `public\` (possible, but it breaks the post format contract and the per-post pipeline).

### Q3. Is it the right tool, or is a post template in the Next.js site simpler?

**What the site already has** (read-only look) [15]:
- Next.js 16 with React 19, and `marked` as the only Markdown dependency.
- `app\docs\[slug]\page.tsx` (85 lines) reads a `.md` file from `content\docs\` and lexes it with `marked`. It moves the H1 into a dark title band with eyebrows, wraps tables in a scroll box, and renders the body as `<article class="art-rich">`.
- `app\article.css` (1,833 lines) is "a copy of Addvery's case-study article (`study_*`) ... section for section", already styling `blockquote` and a `.post-quote` pull quote (amethyst rule on lilac).
- `blog-pipeline\POST-FORMAT.md` already defines a Markdown post with front matter, pull quotes, a key-points box and `[Alex: ...]` notes.
- **Inference:** a `/blog/[slug]` route is the docs route plus a front-matter parse, a typographic cover band, a key-points box and the "How this post was made" box. That's an afternoon's BUILD, not a design project, and every later post costs zero design time.

**The DI-8 options against the evidence:**

| Criterion | A: site template | B: Claude Design today | C: A now, Claude Design pass in the morning |
| --- | --- | --- | --- |
| Post appears at `/blog/<slug>` on the live site (DoD-15) | Yes, natively | Only after a rebuild as code; no export does it [7][10] | Yes, via A |
| Repeatable with no per-post design step (DoD-14's pipeline) | Yes: Markdown in, page out | No: each post is a design project, unless only the template is designed once | Yes |
| Matches the site's Addvery look | Exact: same `article.css` [15] | An interpretation; only as good as its design-system input [2][3] | Exact, plus optional refinements |
| Alex's time today | None beyond review | About 20 min scene (SPEC §1) plus review | None today |
| Usage pool | Claude Code only | Shared with Claude Code; can be heavy [2][6][11] | A light pass, overnight or morning |
| Imagery | Typographic cover | Same: no documented image generation [2][12] | Same |
| Demo value on camera | Low | Higher (a visible design tool) | Medium (a morning clip) |

**(1) Is there a converged answer?** For a Markdown-driven blog in an existing Next.js site, yes: a dynamic route rendering Markdown files through one template is the standard pattern. The site's `/docs/[slug]` already does it [15] (**inference** that it carries over unchanged). No source recommends Claude Design as a blog's rendering layer.

**(2) Traps and gotchas.**
- **Option B quietly turns the pipeline back into hand-work.** S-D4's own rule is "Nobody edits between stages ... the pipeline itself makes the post" (SPEC §7). A per-post Claude Design step breaks it.
- **Option B's import path doesn't run as SPEC §7 imagines** (Q2, trap 1). Rebuilding the design as the template is the only working route.
- **Option C's morning pass:** if it changes the template after S-D5's posts are live, all three posts re-render. That's fine, but `website` has to re-check them (**inference**).
- **The template itself:** front-matter parsing isn't in the docs route today. `marked` doesn't parse YAML (**inference**), so `website` adds a small parser or a dependency.

**(3) What would change the planned approach.**
- `website` being unable to take B1 in time. A Claude Design standalone HTML of the test post would then be a fallback for Alex's near-final review only, not for publishing.
- Alex wanting the post's look visibly designed by him, or Claude Design shown as a demo. Then the template is designed once in Claude Design and rebuilt by `website` from the handoff.

## Evidence gaps

- **No hands-on evidence** of Claude Design laying out a long-form article. No source tests it, and I didn't try it (out of scope: no writes to connected tools).
- **The exact contents of the Claude Code handoff bundle,** and how `/design` imports into a Next.js App Router codebase. Anthropic doesn't document either; the third-party description [11] is undated.
- **Whether a Claude Code session can obtain the claudeusercontent.com URL and download token** the Vercel import needs, or whether only the claude.ai send-to flow can [10]. My reading that it can't is inference.
- **What "protected" means in practice** for the import: Vercel Authentication, or a share link? The schema says only "Requires protection for generated deployment URLs" [10].
- **The usage cost** of a Claude Design session on Alex's plan. Only one third-party anecdote [11]; his plan tier isn't established here.
- **Image generation:** absent from every Anthropic page I read, but there's no explicit Anthropic statement that it's unsupported [2][12].
- The `/design` CLI version requirement and the 17 Aug 2026 `/design` skill come from snippets only, not from pages I read.

## Recommendations (evidence plus options; every call is Alex's)

1. **DI-8 question 1, as evidence would weigh it.** Option A (the default) is supported on every criterion except demo value: the site already has the article route and Addvery's article CSS, and the post format is Markdown [15]. Option C keeps A and adds an optional morning design pass. Option B has the weakest support: no export lands on the site, and the import tool doesn't fit a terminal pipeline [7][10]. Alex's call.
2. **If C (or B) is chosen, a working route:**
   - Design the *template* once, not each post: a design system from the `website` codebase via `/design-sync` in Claude Code [3][6], then two or three directions for the post page from the sample post [6].
   - Then hand the chosen direction to Claude Code [1][2], and let `website` rebuild it as the `/blog/[slug]` template through a BUILD request.
   - Time-box it (S-D4 already budgets about 20 minutes) and watch the shared usage [2].
3. **For S-D4's SPEC §7, option B wording (owner: S-D4).** Evidence favours "rebuilds it as the template" over "the Vercel connector's import tool, which `website` runs". The tool needs a 10-minute URL and a token Claude supplies, and it deploys a single HTML file to a protected URL [10]. If anyone does use the import, keep it off the live site's Vercel project, because of the project-scoped behaviour [10]. S-D4's call.
4. **Imagery stays typographic either way.** Claude Design doesn't change S-D4's "no generated images" decision [2][12].
5. **A fallback option,** only if `website` can't build B1 in time: a Claude Design standalone HTML of the test post, for Alex's near-final review only. It isn't a publishing path (Q2, traps 1 and 2). Alex's call.

## Sources

1. Anthropic, "Introducing Claude Design by Anthropic Labs", 17 Apr 2026: https://www.anthropic.com/news/claude-design-anthropic-labs
2. Claude Help Center, "Get started with Claude Design" (article 14604416), "Updated this week", read 2 Nov 2026: https://support.claude.com/en/articles/14604416-get-started-with-claude-design
3. Claude Help Center, "Set up your design system in Claude Design" (14604397), read 2 Nov 2026: https://support.claude.com/en/articles/14604397-set-up-your-design-system-in-claude-design
4. Claude Help Center, "Claude Design admin guide for Team and Enterprise" (14604406), read 2 Nov 2026: https://support.claude.com/en/articles/14604406
5. Claude Help Center, "Move from standalone Claude Design to Claude" (17440474), read 2 Nov 2026: https://support.claude.com/en/articles/17440474-move-from-standalone-claude-design-to-claude
6. Claude, "Claude Design now stays on brand for daily work", 17 Jun 2026 with a September 2026 update: https://claude.com/resources/articles/claude-design-stays-on-brand-for-daily-work
7. Vercel KB, "Deploy a Claude Design project to Vercel", published 11 Jun 2026, updated 15 Sep 2026: https://vercel.com/kb/guide/claude-design
8. Vercel changelog, "Deploy from Claude Design to Vercel", 23 Jun 2026: https://vercel.com/changelog/claude-design-and-vercel
9. Vercel docs, `import-claude-design-from-url` (Vercel MCP tool reference): https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/import-claude-design-from-url
10. Vercel MCP tool schemas `import-claude-design-from-url` and `get-design-import-job-status`, loaded with ToolSearch in this session on 2 Nov 2026, descriptions read only, never called.
11. claudefa.st, "Claude Design handoff" (third party, undated): https://claudefa.st/blog/guide/mechanics/claude-design-handoff
12. Layer3 Labs, "Claude Design" guide, updated 11 Oct 2026 (third party): https://www.layer3labs.io/guides/claude-design
13. MindStudio, "Deploy a Claude Design website to Vercel", 23 Apr 2026 (third party; generic and early, given little weight): https://mindstudio.ai/blog/deploy-claude-design-website-to-vercel
14. Search snippets only, not read in full: horadecodar.com.br on export formats (https://horadecodar.com.br/claude-design-exportar-pdf/); pasqualepillitteri.it on `/design-sync` and the `/design` skill (https://pasqualepillitteri.it/en/news/5308/claude-code-claude-design-two-way-sync-design-sync, https://pasqualepillitteri.it/de/news/11692/claude-code-design-skill-artboards); OpenArt on Claude and image generation (a vendor with an interest; https://openart.ai/blog/why-cant-claude-generate-images/).
15. Local, read only: `website\app\docs\[slug]\page.tsx`, `website\app\article.css` (head and the pull-quote rules), `website\package.json`, `blog-pipeline\POST-FORMAT.md` (head), `blog-pipeline\SPEC.md` §1, §7, §9.
