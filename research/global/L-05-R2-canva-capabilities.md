# L-05 R2: What Canva can do now

> "What Canva can do now. What can Canva do, by hand and programmatically, for brand-locked LinkedIn templates today: Brand Kit, brand templates, the Connect API and autofill, the Canva MCP server? Which parts need a paid or Enterprise plan? What are the current LinkedIn image, carousel and banner sizes?"

2026-11-02 · session s1-research subagent · item 2 of 7 on list L-05 · serves DoD-16, DoD-21 · readers S-D6, S-D10, S-D7

## Method

- About 16:35–16:50 on 2 Nov 2026 (Prague): 14 web searches and 19 page fetches. Canva's own pages came first (canva.com Help Center, canva.dev developer docs including the Connect changelog), then LinkedIn Help. Third-party guides were used only where LinkedIn publishes no figure, and they're marked as such.
- None of the Canva Help or canva.dev pages show a publish date (footers say only "© 2026"). The one dated Canva source is the Connect changelog, which runs to 2026-10-28. LinkedIn Help shows relative dates ("Last updated: 2 months ago"), which I turned into approximate months counting back from 2 Nov 2026.
- I had no Canva connector and logged into nothing. Everything about what the connector does comes from docs, not from calling it. Inference is marked **(inference)**.
- Nothing here is about Addvery or its brand.

## Verdict up front

1. **Enterprise is no longer the gate.** Since **2026-09-21** the Connect API's autofill works for users on **Pro or Teams**, and Canva's brand-template API docs list Pro, Teams and Enterprise. Older pages and blogs, and option C of S-D6's own DI draft, still say "Enterprise". That's out of date. What matters now is Free versus paid. A Free account can connect the connector, but it gets no brand templates, no autofill, only standard-quality exports and one brand kit limited to three colours.
2. **The Canva connector (Canva's hosted MCP server) covers most of the pipeline, but not the parts that make templates "brand-locked".** Per canva.dev it can create, copy, import (from a URL), resize and export designs. It can also manage folders, upload assets, list brand kits, create and publish brand templates, autofill them, and edit through "editing transactions". The only edit operations documented are **text replacement and image-fill replacement**. No documented tool **creates or edits a brand kit, uploads a font, locks an element** or sets an element's position or style. Those are **editor work: Alex by hand, or Claude in Chrome** (inference from the full tool list).
3. **LinkedIn sizes have moved, and the company cover changed.** LinkedIn Help now gives the company page cover as **1512 × 256** (page updated about Sep 2026). Many 2026 guides still say 1128 × 191. The personal banner is **1584 × 396**, and event covers are **16:9 (1280 × 720)**. Document posts take a PDF of up to **100 MB and 300 pages**, all pages one size. LinkedIn gives **no recommended page size** for documents and publishes **no organic feed-image specs** apart from the 1.91:1 link image. The common square and portrait figures (1080 × 1080, 1080 × 1350) come from third-party guides and from LinkedIn's ad specs.

**What it means for S-D6's open route question (inference):** option A, the connector with Claude in Chrome as fallback, still fits the evidence best. The split is clear: the connector creates, imports, fills, exports and files; Chrome or Alex does the brand kit, fonts and locks. One trap to settle first: the connector imports **from a URL**, and the import-ready files sit on local disk (see 2.4).

---

## 1. The Canva connector / Canva MCP server

### 1.1 What it is and how it's reached

- **Converged answer.** Canva's "AI Connector" is one hosted MCP server that Claude, ChatGPT, Gemini, Copilot and others connect to ([Canva Help: Canva MCP setup](https://www.canva.com/help/mcp-agent-setup/)). In Claude you add it under Manage connectors and click Connect. The built-in connector on Claude web or desktop "requires a paid Claude plan" (canva.dev setup page, per search summary; that URL now 301-redirects to the help page above). It isn't the "Developer MCP Server", which is for building Canva apps ([same page](https://www.canva.com/help/mcp-agent-setup/)).
- **Plans (Canva's words):** "The Canva AI Connector is available for all Canva accounts, including Canva Free and Canva Education." But "Some actions such as using Brand Templates require a paid plan", and "Autofill is available on all Canva plans except Pro Lite and Canva Free" ([Canva Help](https://www.canva.com/help/mcp-agent-setup/)).
- **Into Claude Code (inference):** this session's own tool list includes claude.ai connectors (GetSales, Vercel) under the `mcp__claude_ai_*` prefix. So a Canva connector added in Alex's claude.ai settings should show up the same way in sessions started after that. That's what S-D6 §1 assumes. The direct server URL (`https://mcp.canva.com/mcp`) appears only in third-party directories, which also list a conflicting `.xyz` address ([developersdigest](https://www.developersdigest.tech/mcp-servers/canva), [eseospace](https://eseospace.com/blog/canva-mcp-server/)). Canva's help page gives no URL.

### 1.2 What it can do: the documented tool list

canva.dev's "MCP tools and rate limits" page lists about 46 tools ([canva.dev MCP tools](https://www.canva.dev/docs/apps/mcp/tools/)). Grouped by the jobs S-D6 needs:

| Job | Tools (canva.dev) | Can it do it? |
| --- | --- | --- |
| Create a blank design at a size | `create-design`, `get-create-design-async-job` | Yes |
| Bring in a file built elsewhere | `import-design-from-url` (20/min); `upload-asset-from-url`, `create-upload-url` | Yes, **from a URL** |
| Edit elements | `start-editing-transaction` → `perform-editing-operations` → `commit-` / `cancel-editing-transaction` | Text and image fills only (documented) |
| Copy / resize / merge | `copy-design`, `resize-design`, `merge-designs` | Yes |
| Folders | `create-folder`, `move-item-to-folder`, `list-folder-items`, `search-folders` | Yes |
| Brand kit | `list-brand-kits` (read; Pro and up) | **Read only** |
| Brand templates | `create-brand-template-draft`, `publish-brand-template`, `search-brand-templates`, `create-design-from-brand-template` | Yes (paid plan) |
| Autofill | `autofill-design`, `get-brand-template-dataset`, `get-design-dataset` | Yes (paid, not Pro Lite) |
| Export | `get-export-formats`, `export-design` (20/min) | Yes; quality depends on plan |
| Check visually | `get-design-thumbnail`, `get-design-content`, `get-design-pages` | Yes |
| Lock elements, set fonts or colours, upload a font | none | **No documented tool** |

- **Editing is narrow as documented.** `start-editing-transaction` returns editable `richtexts` and `fills`, each with an `element_id` ([canva.dev](https://www.canva.dev/docs/mcp/tools/start-editing-transaction/)). The documented operations are `replace_text` and `find_and_replace_text` (use the latter "On responsive pages"). A third-party source names `update_fill` / `insert_fill` for images ([canva.dev perform-editing-operations](https://www.canva.dev/docs/apps/mcp/tools/perform-editing-operations/); search summary). I found no documented operation to move, resize, restyle, delete or lock an element. Canva's own workflow page says: "User should verify and continue edits after programmatic changes" ([canva.dev design-edit handoff](https://www.canva.dev/docs/mcp/workflows/design-edit/)).
- **Exports:** Free gets "standard quality". Pro and up get lossless PNG and transparent backgrounds. A design that uses premium elements may fail with `license_required` ([canva.dev MCP tools](https://www.canva.dev/docs/apps/mcp/tools/)).
- **Rate limits** are generous for five templates: 300 requests a minute shared, and 20 a minute for create, import, export and transactions ([same page](https://www.canva.dev/docs/apps/mcp/tools/)).

### 1.3 Traps

- **Tool names may differ from the docs.** A Canva help snippet (seen only in a search summary; I couldn't open the page) says the Claude connector's tools were "simplified into two tools: read_design and edit_design. All the same capabilities are still there, plus new ones." So the session should read the tools it actually gets after ToolSearch, not assume canva.dev's names.
- **Concurrent edits break commits.** A commit fails if someone edits the design in the browser during the transaction. Retrying won't help: cancel, start fresh and re-apply (canva.dev, per search summary). This matters at **17:15**, if S-D10 films Alex editing a template the session is still committing to.
- **On a team account the connector can be off.** It's off by default for teams, admins turn it on or off for the whole team only, and it "uses the same permissions as the Canva Connect API" ([Canva Help](https://www.canva.com/help/mcp-agent-setup/), [AI connectors](https://www.canva.com/help/ai-connectors-canva/)).
- **AI credits:** AI-powered actions (e.g. `generate-design`, `generate-image`) may draw on Canva's monthly AI allowance ([Canva Help](https://www.canva.com/help/mcp-agent-setup/)). Plain create, import and export calls aren't described as using credits.
- **Visibility:** the connector can "read design details and folders" across the account, and nothing technical stops it listing other designs. S-D6's rule against listing or searching Alex's designs is a discipline, not a guard (inference).

## 2. The Connect API (REST)

### 2.1 What it adds over the connector

- **Design import from a raw file upload.** `POST /v1/imports` takes the file body directly. Supported types are .ai, .psd, Affinity, .key, .pages, .numbers, Office (.pptx/.docx/.xlsx and older), OpenDocument and **.pdf**. No SVG is listed ([canva.dev design imports](https://canva.dev/docs/connect/api-reference/design-imports)). URL import has been generally available since 2025-06-24 ([changelog](https://www.canva.dev/docs/connect/changelog/)).
- **Autofill** has three modes: a new design from a brand template, `create_from_design`, or `update_design` in place (GA 2026-08-25). Text, image (by uploaded `asset_id`, not a raw URL), chart, sheet and video fields are supported ([autofill guide](https://canva.dev/docs/connect/autofill-guide), [changelog](https://www.canva.dev/docs/connect/changelog/)).
- **Publish brand template** (preview, 2026-06-04), plus resize, export (PNG with `transparent_background`, paid only, since 2025-02-19), folders and assets ([changelog](https://www.canva.dev/docs/connect/changelog/)).
- **No element editing, locking, brand kit writes or font upload.** The 2025–26 changelog has no entry for any of them ([changelog](https://www.canva.dev/docs/connect/changelog/)). Editing transactions are documented only as MCP tools (search summary of canva.dev).

### 2.2 Plan gating: the correction

- "Autofill for designs and brand templates is available when your app acts on behalf of a user on Canva Pro … Canva Teams, or Canva Enterprise" ([autofills reference](https://www.canva.dev/docs/connect/api-reference/autofills/)). The changelog dates the change: **2026-09-21**, "Autofill APIs extended to Pro/Teams plans" ([changelog](https://www.canva.dev/docs/connect/changelog/)).
- Brand template APIs: "your app must act on behalf of a user that's on a Canva plan with access to brand templates (such as Canva Pro, Canva Teams, or Canva Enterprise)" ([brand templates reference](https://www.canva.dev/docs/connect/api-reference/brand-templates/)).
- **Trap:** search engines still return cached text saying the integration "must act on behalf of a user who belongs to an Enterprise organization", and a competitor says autofill needs "30+ team members" ([templated.io](https://templated.io/alternative-to/canva/)). Both predate 2026-09-21 or aren't Canva's word.

### 2.3 Cost to set up

You need an integration in the developer portal, **MFA on the Canva account**, OAuth with a client ID, secret and redirect URL, and scopes `design:content`, `design:meta`, `brandtemplate:*`, `asset` ([autofill guide](https://canva.dev/docs/connect/autofill-guide)). For a CLI session that means running a local OAuth redirect. That fits S-D6's estimate of 15 to 20 minutes of Alex's time (inference).

### 2.4 The import gotcha that cuts across routes (inference)

S-D6 keeps its import-ready files in git-ignored `local\import\`. The connector's `import-design-from-url` needs a URL Canva can fetch, so a local file would first have to be hosted somewhere reachable. That could put brand values on the open web, against S-D6's no-publish-before-sign-off rule. Three routes avoid it:
- **Claude in Chrome**, which can upload a local file into the editor (its `file_upload` tool).
- **The Connect API's** raw-body `POST /v1/imports`.
- The connector's `create-upload-url`, if it accepts a direct upload. Its docs don't say whether that works for design imports or only for assets.

Separately, an SVG is not a design-import type (2.1), so the formats that can come in as an editable design are PDF, PPTX, AI and PSD. How well an import keeps fonts and layout intact is R3's question, not this one.

## 3. By hand in the editor (or Claude in Chrome)

- **Brand Kit** setup: logo, colours, fonts. Free gets 1 kit with 3 colours, Pro 5, Business 100 with approvals, and Enterprise 1,000 ([Canva pricing](https://www.canva.com/pricing/)).
- **Font upload** is open to "Canva Pro, Canva Teams, Canva Business, Canva Education, and Canva for Nonprofits". Uploaders must be team owners, administrators or brand designers. Formats are OTF, TTF and WOFF. "Canva doesn't support variable fonts." Fonts must be "licensed for embedding", with up to 18 styles per family ([Canva Help: upload fonts](https://www.canva.com/help/upload-fonts/)). **Trap:** Google Fonts often download as variable fonts, so you need the static files.
- **Basic lock** (the padlock on the toolbar): "anyone with edit access" can lock or unlock elements or pages ([Canva Help: lock and unlock](https://www.canva.com/help/lock-and-unlock-elements/), per search summary). No plan line was found.
- **Brand template locks** come in four kinds: full lock, "Lock position only" (text stays editable but formatting is fixed; an image can be replaced or cropped in place), page locks and background locks. "Only admins and brand designers have permission to apply or adjust locks in Brand Templates" ([Canva Help: brand template locks](https://www.canva.com/help/brand-template-locks/)). That page gives no plan line. Canva's pricing page lists "Brand Controls" and "Element locking" under **Business** and "Granular element controls" under **Enterprise** ([pricing](https://www.canva.com/pricing/)).
- **Canva AI and locks:** "Canva AI doesn't currently support Brand Controls and Permissions", but locked elements stay unchanged when Canva AI generates from a template (Canva Help, per search summary of [brand template locks](https://www.canva.com/help/brand-template-locks/) and [upload fonts](https://www.canva.com/help/upload-fonts/)).

## 4. Plan gating table

Plan names as of today: Canva's pricing page shows **Free, Pro (US$144 a year), Business (US$250 a year per person), Enterprise (contact sales)**. "Canva Teams is no longer available for new sign-ups or upgrades" ([pricing](https://www.canva.com/pricing/)). Existing Teams accounts are still named in the API and help docs.

| Capability | Free | Pro | Teams (legacy) / Business | Enterprise | Source |
| --- | --- | --- | --- | --- | --- |
| Connect the AI connector / MCP | Yes | Yes | Yes (admin must turn it on) | Yes | [Help](https://www.canva.com/help/mcp-agent-setup/) |
| Create, import, resize, export via connector | Yes | Yes | Yes | Yes | [MCP tools](https://www.canva.dev/docs/apps/mcp/tools/) |
| Export quality | Standard | Lossless PNG, transparent | Same as Pro | Same as Pro | [MCP tools](https://www.canva.dev/docs/apps/mcp/tools/) |
| Brand kits | 1 (3 colours) | 5 | 100 + approvals | 1,000 + tiered approvals | [pricing](https://www.canva.com/pricing/) |
| Upload fonts | No | Yes | Yes | Not named on that page (inference: yes) | [Help](https://www.canva.com/help/upload-fonts/) |
| Brand templates (use / API) | No | Yes | Yes | Yes | [API ref](https://www.canva.dev/docs/connect/api-reference/brand-templates/), [Help](https://www.canva.com/help/mcp-agent-setup/) |
| Autofill (connector / API) | No | Yes (not Pro Lite); API since 2026-09-21 | Yes | Yes | [Help](https://www.canva.com/help/mcp-agent-setup/), [changelog](https://www.canva.dev/docs/connect/changelog/) |
| Basic element lock | Not stated (inference: yes) | Yes | Yes | Yes | [Help](https://www.canva.com/help/lock-and-unlock-elements/) |
| Brand-template partial locks / Brand Controls | No | Unclear | Listed (Business) | "Granular element controls" | [pricing](https://www.canva.com/pricing/), [Help](https://www.canva.com/help/brand-template-locks/) |
| Bulk create (by hand) | Not stated | Not stated | Listed | Listed | [pricing](https://www.canva.com/pricing/) |

The pricing page's per-plan ticks didn't come through in the text I fetched, so the "Not stated" and "Unclear" cells are honest gaps.

## 5. LinkedIn sizes

| Asset | Size | Basis | Source and date |
| --- | --- | --- | --- |
| Company page cover | **1512 × 256** px; PNG/JPEG ≤ 3 MB | LinkedIn Help | [a563309](https://www.linkedin.com/help/linkedin/answer/a563309), "updated 2 months ago" ≈ Sep 2026 |
| Company logo | 400 × 400 recommended (268 minimum) | LinkedIn Help | same, ≈ Sep 2026 |
| Personal profile banner | **1584 × 396** px; JPG/PNG < 8 MB | LinkedIn Help | [a566232](https://www.linkedin.com/help/linkedin/answer/a566232), "updated 7 months ago" ≈ Apr 2026 |
| Event cover | **16:9**, e.g. 1280 × 720 (480 px minimum width) | LinkedIn Help | [a550235](https://www.linkedin.com/help/linkedin/answer/a550235), "updated 5 months ago" ≈ Jun 2026 |
| Link-post image | 1.91:1, 1200 × 627 | LinkedIn Help (Pages) | [a563309](https://www.linkedin.com/help/linkedin/answer/a563309), ≈ Sep 2026 |
| Feed image, landscape | 1200 × 628 (1.91:1) | LinkedIn ad specs | [a426534](https://www.linkedin.com/help/linkedin/answer/a426534), undated (search summary) |
| Feed image, square | 1200 × 1200 (1:1); 1080 × 1080 in third-party guides | Ad specs; third-party | [a426534](https://www.linkedin.com/help/linkedin/answer/a426534); [SocialRails](https://socialrails.com/free-tools/linkedin-image-specs) 2026 |
| Feed image, portrait | 4:5. Ad spec says 720 × 900 (vertical ads serve on mobile only); third-party guides say **1080 × 1350** | Ad specs; third-party | [a426534](https://www.linkedin.com/help/linkedin/answer/a426534); [SocialRails](https://socialrails.com/free-tools/linkedin-image-specs), [Viraly](https://viraly.io/blog/linkedin-image-sizes) 2026 |
| Document / carousel post | PDF, PPT(X) or DOC(X), ≤ 100 MB and ≤ 300 pages; "PDFs with multiple sized pages must be fit to the same page size"; **no recommended size** | LinkedIn Help | [97459](https://www.linkedin.com/help/linkedin/answer/97459), "updated 3 years ago" ≈ 2023 |
| Carousel page size in practice | 1080 × 1080 or 1080 × 1350 (4:5) | Third-party only | [Viraly](https://viraly.io/blog/linkedin-image-sizes), [brandghost](https://blog.brandghost.ai/posts/linkedin-document-posts-guide/), 2026 |

**Traps.**
- The company cover changed. 1128 × 191 is still in many 2026 guides, and Edgar gives 4200 × 700 ([ManyPixels](https://www.manypixels.co/blog/social-media-design/linkedin-banner-size) calls the old size out of date).
- Event covers: many guides say 1776 × 444 (4:1), but LinkedIn Help says 16:9.
- "On mobile, images aren't cropped. Other ratios display at full size with subtle white padding" ([a563309](https://www.linkedin.com/help/linkedin/answer/a563309)). That line is about link-post images. LinkedIn publishes no crop rule for organic uploads.
- The document-post help page is about three years old. It's still the only LinkedIn source on the limits.

## Evidence gaps

- **The connector's real tool surface in Claude.** I couldn't confirm the "read_design / edit_design" consolidation or call the tools. Whether editing can move, restyle or lock elements is undocumented, not shown to be impossible. A five-minute read-only probe after connecting would settle it.
- **Whether the connector can import a local file**, through `create-upload-url` or anything else, without a public URL.
- **The plan line for element locking.** Help says anyone with edit access can lock; pricing lists "Element locking" under Business. I couldn't reconcile them, or say whether Pro can apply brand-template partial locks.
- **Pricing-page ticks** for Free and Pro on brand templates, bulk create and PDF export, which didn't come through in the fetch.
- **Organic LinkedIn feed-image specs.** LinkedIn publishes none, so the square and portrait figures rest on ad specs and third-party guides.
- **Canva's built-in LinkedIn presets** (the sizes Canva's "LinkedIn post" and "carousel" design types use). Not checked.
- **Import fidelity** (fonts, grouping, PDF to editable) is R3's question; untested here.

## Recommendations (options; every call is Alex's)

1. **The route (S-D6 DI question 1).** The evidence supports option A, with a firm division of labour. Connector: create at exact sizes, import, fill, folder, publish as brand template, export, thumbnail checks. Claude in Chrome or Alex by hand: brand kit, font upload, locks. Option B (Chrome only) does all of it but more slowly. Option C (Connect API) adds a raw-file import but nothing for locks or brand kits, and costs 15 to 20 minutes of Alex's setup time. Option D stays the fallback.
2. **Correct DI option C's wording before it's released:** brand templates and autofill need a **paid** plan (Pro, Teams or Business), not Enterprise, as of 2026-09-21.
3. **The plan question (DI question 2) now matters most.** On Free there are no brand templates, no autofill, no font upload, a three-colour kit and standard exports. Alex could say his plan up front, or let the session check read-only with `list-brand-kits` or `get-export-formats`.
4. **Pick how local files get into Canva without publishing them:** Chrome upload, Connect API raw upload, or a short read-only probe of `create-upload-url`. A public temporary URL is the option that conflicts with S-D6's sign-off rule.
5. **Sizes for the build sheet to consider:**
   - square 1080 × 1080 (or 1200 × 1200)
   - portrait 1080 × 1350
   - landscape or link 1200 × 627
   - document carousel at one fixed page size, 1080 × 1350 or 1080 × 1080, exported as PDF
   - event teaser at 16:9 (1280 × 720 or 1920 × 1080)
   - company banner 1512 × 256 and personal banner 1584 × 396, if a banner is in the set
6. **For S-D10 at 17:15:** keep the session from committing editing transactions to the template Alex is filming, or the commit fails (1.3). Keep exports on a paid plan so the video shows lossless PNGs.
7. **Fonts:** if a brand font is uploaded, use static OTF or TTF files licensed for embedding, not variable ones.

## Sources

Canva (all undated pages; footers "© 2026"; fetched 2 Nov 2026)
- [Canva Help: Canva MCP / AI connector setup](https://www.canva.com/help/mcp-agent-setup/)
- [Canva Help: AI connectors](https://www.canva.com/help/ai-connectors-canva/)
- [Canva Help: Apply locks to Brand Templates](https://www.canva.com/help/brand-template-locks/)
- [Canva Help: Upload and use Brand Kit fonts](https://www.canva.com/help/upload-fonts/)
- [Canva Help: Lock and unlock pages or elements](https://www.canva.com/help/lock-and-unlock-elements/) (search summary only)
- [Canva pricing](https://www.canva.com/pricing/)
- [canva.dev: MCP tools and rate limits](https://www.canva.dev/docs/apps/mcp/tools/)
- [canva.dev: start-editing-transaction](https://www.canva.dev/docs/mcp/tools/start-editing-transaction/)
- [canva.dev: perform-editing-operations](https://www.canva.dev/docs/apps/mcp/tools/perform-editing-operations/)
- [canva.dev: Design edit handoff](https://www.canva.dev/docs/mcp/workflows/design-edit/)
- [canva.dev: Connect changelog](https://www.canva.dev/docs/connect/changelog/) (dated entries to 2026-10-28)
- [canva.dev: Autofill guide](https://canva.dev/docs/connect/autofill-guide)
- [canva.dev: Autofills API reference](https://www.canva.dev/docs/connect/api-reference/autofills/)
- [canva.dev: Brand templates API reference](https://www.canva.dev/docs/connect/api-reference/brand-templates/)
- [canva.dev: Design imports](https://canva.dev/docs/connect/api-reference/design-imports)

LinkedIn Help (relative dates converted from 2 Nov 2026)
- [Image specifications for LinkedIn Pages and Career Pages (a563309)](https://www.linkedin.com/help/linkedin/answer/a563309), ≈ Sep 2026
- [Add or change the background photo on your profile (a566232)](https://www.linkedin.com/help/linkedin/answer/a566232), ≈ Apr 2026
- [Create or edit a LinkedIn Event (a550235)](https://www.linkedin.com/help/linkedin/answer/a550235), ≈ Jun 2026
- [Share a document in a post (97459)](https://www.linkedin.com/help/linkedin/answer/97459), ≈ 2023
- [Single image ads advertising specifications (a426534)](https://www.linkedin.com/help/linkedin/answer/a426534), undated, search summary only

Third-party (used only where marked)
- [SocialRails LinkedIn image specs](https://socialrails.com/free-tools/linkedin-image-specs) (2026)
- [Viraly LinkedIn image sizes](https://viraly.io/blog/linkedin-image-sizes) (2026)
- [ManyPixels LinkedIn banner size](https://www.manypixels.co/blog/social-media-design/linkedin-banner-size) (2026)
- [brandghost document posts guide](https://blog.brandghost.ai/posts/linkedin-document-posts-guide/)
- [developersdigest: Canva MCP](https://www.developersdigest.tech/mcp-servers/canva)
- [eseospace: Canva MCP server](https://eseospace.com/blog/canva-mcp-server/)
- [templated.io](https://templated.io/alternative-to/canva/) (competitor claim, cited only as a trap)
