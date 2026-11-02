# L-05 R3 Pixel-perfect in Canva

**Question (verbatim):** "Pixel-perfect in Canva. How do designers keep Canva templates pixel-perfect and on brand when someone else fills them in (locked elements, grids, fonts, export settings)? What are the traps: font substitution, PDF carousel export, compression on upload to LinkedIn?"

2026-11-02 · session s1-research subagent · item 3 of 7 on list L-05

Serves: DoD-16 ("pixel-perfect" templates in Canva, with the operator's brand sign-off), DoD-21 (the Canva video's export settings). Readers: S-D6 Canva templates, S-D10 Canva video, S-D7 LinkedIn content.

---

## Method

About 15 minutes on 2 Nov 2026 (afternoon, Prague), quick depth ("deep: no"). WebSearch on Canva locking, Brand Template locks, Brand Controls, font upload and font errors, upload formats (SVG, PDF, PNG), PDF import, download formats (PNG, PDF Standard and Print, flatten, MP4), rulers and guides, template links; LinkedIn document posts, image posts, Page image specs and recompression. Then WebFetch on the primary pages: seven Canva help articles and three LinkedIn help articles (list under Sources). Canva's help pages carry no article date (footer "© 2026"); LinkedIn's help pages carry none at all. I treat both as current as of the fetch, and flag third-party pages with their year where known.

Nothing was tested in Canva or on LinkedIn: no login, by the rules of this job. Everything below is from documentation and third-party reports. **Inference** is marked as such. Nothing here is about Addvery or its brand; brand values stay in S-D6's `local\`.

---

## Verdict

1. **The converged method is: lock the brand, leave the slots, hand over a copy.** Canva has two element locks: **Lock** (position, style and content) and **Lock position only** (position and style; content editable). Designers fully lock logos, colour blocks and backgrounds and put text and image slots on Lock position only ([Canva: lock elements](https://www.canva.com/help/lock-and-unlock-elements/); [Canva: Brand Template locks](https://www.canva.com/help/brand-template-locks/)). **The trap:** in an ordinary design, "anyone with edit access to the design can lock or unlock its elements", so a lock prevents accidents but grants no permission. The lock becomes binding only in Brand Templates, where "only admins and brand designers" can set or change locks. Otherwise the filler gets a copy through a Template link (Pro and up), and the original stays untouched.
2. **Exact pixels survive only if fixed art and live text are kept apart.** Canva imports PNG pixel for pixel (it's flat). SVG stays vector and can be recoloured if it's simple. PDF import splits pages into editable elements, but "unsupported fonts may be replaced with similar fonts" and "layouts may shift slightly" ([Canva: PDF import](https://www.canva.com/help/pdf-import/)). The text a filler edits has to be native Canva text in an uploaded brand font: OTF, TTF or WOFF only, static rather than variable, each weight and italic its own file, and licensed for embedding ([Canva: upload fonts](https://www.canva.com/help/upload-fonts/); [Canva: font upload error](https://www.canva.com/help/font-upload-error/)).
3. **Export and LinkedIn: PNG at exact size for images; a flattened, single-page-size RGB PDF for the carousel; LinkedIn's recompression is undocumented.** LinkedIn image posts take 5 MB per upload and ratios from 3:1 to 4:5, and crop anything taller ([LinkedIn: multi-photo posts](https://www.linkedin.com/help/linkedin/answer/100983)). Document posts take at most 100 MB and 300 pages; every page must be the same size, and multi-layer PDFs "must be flattened or merged" ([LinkedIn: documents](https://www.linkedin.com/help/linkedin/answer/97459)). No official source says how hard LinkedIn recompresses images, so the checker has to simulate it rather than trust a setting.

What would change S-D6's plan most: (a) "locked where the plan allows" isn't a guarantee unless the templates are Brand Templates or are shared by Template link; (b) importing whole templates as PDF risks the very font substitution DoD-16 rules out; (c) Canva's PDF export can leak cropped-out image areas, and LinkedIn lets viewers download the PDF, which is a DoD-22 point.

---

## Evidence, by question

Each question answers three things: **(1)** is there a converged answer, **(2)** traps, **(3)** what would change the plan.

### Q1. Locking: what can and can't be locked, and by plan

**(1) Converged answer: yes.**
- Element locks in any design: "Lock: Completely locks position, style, and content." "Lock position only: Locks position and style, leaving only the content editable." Locking a page "affects all elements and the background on that page". Locking isn't available in Canva Docs. Duplicating a page keeps its lock states ([Canva: lock elements](https://www.canva.com/help/lock-and-unlock-elements/)).
- Brand Templates add finer, role-bound locks ([Canva: Brand Template locks](https://www.canva.com/help/brand-template-locks/)):
  - A full lock means a locked logo "cannot be resized, moved, or deleted".
  - Lock position only on **text** locks font, size, colour, alignment, capitalisation, bullets, line spacing, transparency, links, copy-style, duplicate and delete. "What can be edited: The content of the text box."
  - Lock position only on an **image or frame** locks effects, filters, adjustments and flipping. The filler can still "Replace, crop, resize, or move the image within its original space."
  - Page Lock, Page Lock position only (no deleting or moving pages) and a Background lock.
  - "Only admins and brand designers have permission to apply or adjust locks in Brand Templates." "Locks need to be set before publishing a design as a Brand Template"; to change them you edit, adjust and republish.
- The handover pattern on Pro: a **Template link** gives each recipient a copy, and "Canva copies your original design and then adds it as a new project to the second user's Canva account". Available on Pro, Teams, Enterprise, Education and Nonprofits ([Canva: template link](https://www.canva.com/help/share-template-link/)).
- **Brand Controls** can restrict a team's designs to the Brand Kit's colours and fonts, team-wide or per folder ([Canva: Brand Controls](https://www.canva.com/help/brand-control/); [Canva: folder Brand Controls](https://www.canva.com/help/folder-brand-controls/)).

**By plan, as far as the pages say.** Element Lock and Lock position only: the help page names no plan (gap). Brand Templates are listed for "Canva Pro, Canva Teams, Canva Business, Canva Enterprise, Canva Education, and Canva for Nonprofits users with Brand Kit access" ([Canva: create on-brand designs](https://www.canva.com/help/create-on-brand-designs/), via search summary). A regional copy of the publishing article leaves Teams out of the list of plans that can create them. Template links need Pro and up. Brand Controls' eligibility differs between regional pages (Teams and Business admins on one, Pro and up on the folder page); approval rules are Enterprise only. Plan-by-plan detail is R2's question; this report only flags the inconsistency.

**(2) Traps.**
- **A lock isn't a permission in an ordinary design.** Anyone who can edit can unlock. On Alex's own account he is admin anyway, so for the demo the lock shows intent. The "a brand team can hand these to anyone" story is only true with Brand Templates (role-bound locks) or a Template link (the filler works on a copy).
- **Lock position only on an image frame still lets the filler crop, resize and move the image inside the frame.** The frame holds; the crop doesn't. A bad crop is the filler's to make.
- **Text boxes and long copy.** Lock position only fixes a text box's position and style, not how much text goes in. **Inference** (not documented in what was read): Canva text boxes grow in height as text is added, so long copy can run past the bottom margin or onto a locked element. Fill each template with deliberately long copy before sign-off.
- **Canva AI and locks.** When an existing design is edited with Canva AI, it "currently treats all locks the same", so it won't change content inside partially locked elements. With Lock All or Design Lock, it makes no changes at all ([Canva: Brand Template locks](https://www.canva.com/help/brand-template-locks/)). If Alex uses Canva AI on camera (S-D10), the locked slots won't fill by AI.
- **A locked page blocks unlocking.** "You can't unlock elements when the page is locked." Unlock the page first.

**(3) What would change the plan.** S-D6 §4 says "brand elements locked where the plan allows". To make the "anyone can fill these in" claim true, the templates need to be Brand Templates (Brand Kit access needed) or be handed out by Template link. That turns on DI-XX question 2 (the plan). If neither is available, the sign-off note should say the locks are guard rails, not permissions.

### Q2. Grids, guides and margins

**(1) Partly converged.** Rulers and guides: File, then Settings, then "Show rulers and guides". Preset guides via File, then Rulers and guides, then Add guides: "12 columns, 3 columns, or 3x3 Grid" (the English page). The regional page also lists a Custom option with column and row counts. Guides are locked by default ([Canva: guides](https://www.canva.com/help/adding-and-removing-guides/); [canva.cn: guides](https://www.canva.cn/en/help/adding-and-removing-guides/)).

**(2) Traps.** No official page shows a **gutter** or **custom margin** setting. One secondary guide in the search results says Canva's margin display is fixed at half an inch. The search summary didn't say which page; the likeliest is [Bwillcreative, undated](https://www.bwillcreative.com/?p=95333), which wasn't opened. Treat it as unverified. Custom margins therefore mean hand-placed guides, or invisible locked boxes the size of the safe zone. **Inference:** guides are editor-only. They don't stop a filler dragging an element over a margin; only Lock position only does. Grid fidelity is enforced by the locks and checked on the export, not held by the grid.

**(3) What would change the plan.** Nothing big. Carry the build sheet's grid into Canva as positioned, locked elements (or exact guides), and let the checker measure margins on the export.

### Q3. Importing what was built outside Canva (SVG, PDF, PNG): editable and exact?

**(1) Converged on the limits; contradictory on PDF.**
- **PNG and JPG:** up to 50 MB and 250 million pixels ([Canva: upload formats](https://www.canva.com/help/upload-formats-requirements/)). A PNG imports as a flat image: exact pixels, but no editable text and no recolouring (third-party: [learninginhand, Jan 2025](https://learninginhand.com/blog/2025/1/12/svg)).
- **SVG:** under 3 MB, "Saved with an SVG Profile of "SVG 1.1"". Prepare it first: expand strokes, paths and text; group shapes of the same colour; avoid textures and gradients; in Illustrator, set "CSS Properties to Presentation Attributes". The page also says SVGs should be "Between 150 to 200 pixels wide" ([Canva: upload formats](https://www.canva.com/help/upload-formats-requirements/)). Simple vector fills show as editable colour swatches. Complex, flattened or stroke-based SVGs may show none, and strokes may not recolour (forum and vendor reports: [Realmac forum, undated](https://forums.realmacsoftware.com/t/svg-component-edit-composition-colours/45927); [learninginhand, Jan 2025](https://learninginhand.com/blog/2025/1/12/svg)).
- **PDF:** the two Canva pages disagree. The PDF import article says up to 500 pages, 300 MB and 1,400 elements, with text and images "split into editable elements", but "Unsupported fonts may be replaced with similar fonts" and "Some layouts may shift slightly" ([Canva: PDF import](https://www.canva.com/help/pdf-import/)). The upload-formats article says each PDF page "becomes an image in an A4 document, not editable text" ([Canva: upload formats](https://www.canva.com/help/upload-formats-requirements/)). **Inference:** these are two routes, importing a PDF as a new design versus uploading one into an existing design. Test which one the chosen route (connector, Chrome, API) takes.
- Also accepted: Illustrator .ai files saved PDF-compatible (≤300 MB), PSD (≤300 MB, ≤300 layers), Affinity files ([Canva: upload formats](https://www.canva.com/help/upload-formats-requirements/)).

**(2) Traps.**
- **"Expand text" in an SVG means outlined text that can't be edited.** It looks exact but can't be filled in. Fine for a wordmark; wrong for a slot.
- **PDF import breaks the "no substitution" rule** whenever a font isn't in Canva or the Brand Kit, and may shift the layout. Every text box needs checking after import.
- **The 150 to 200 px SVG width note** probably refers to the artboard. Canva rescales vectors either way (**inference**), but an SVG exported at the template's full pixel size may need resizing after upload. Check the placed size against the build sheet.
- **Gradients and glows in SVG** are on Canva's avoid list. Brand glows or textures are safer as a locked PNG layer.

**(3) What would change the plan.** S-D6 step 3 says templates are "imported from `local\import\`, or rebuilt in the editor ... where import doesn't hold up". The evidence points to a **hybrid** as the likeliest to hold:
- fixed brand art (backgrounds, glows, decorative shapes) as a PNG at exact size, or a simple SVG, fully locked;
- the logo as SVG, or PNG if it won't recolour cleanly;
- every editable slot rebuilt as native Canva text or a frame at the build sheet's coordinates, in the uploaded brand font, on Lock position only.

Whole-template PDF import is the fallback, followed by a font audit.

### Q4. Fonts: upload and substitution

**(1) Converged.**
- **Who and which plans:** uploads are available on "Canva Pro, Canva Teams, Canva Business, Canva Education, and Canva for Nonprofits", by owners, admins and brand designers ("Only Brand Kit admins and owners can upload fonts").
- **Formats:** "OTF, TTF, and WOFF". Not ".ZIP, .EOT, .SVG, or .WOFF2". Under 15 MB per file. "Canva doesn't support variable fonts."
- **Families:** up to 18 styles per family and 500 fonts per Brand Kit. Bold and italic each need their own file, "Without them, the 'B' and 'I' buttons are greyed out."
- **Licensing:** "Your fonts should be licensed for embedding." "Canva doesn't support Adobe Originals fonts."
- **Sources:** [Canva: upload fonts](https://www.canva.com/help/upload-fonts/); [Canva: font upload error](https://www.canva.com/help/font-upload-error/).

**(2) Traps.**
- **Substitution happens in three places:**
  - on PDF import (above);
  - in a download, after an upload that went through: "you might see missing letters or the font looks different ... Sometimes a font may successfully upload but will have errors when used in a design" ([Canva: font upload error](https://www.canva.com/help/font-upload-error/));
  - possibly for a filler without access to the Brand Kit that holds the font. That last one is undocumented in what was read; Canva only says a font "may be on a different Brand Kit" (via search summary).
- **Variable font downloads.** **Inference:** open-licence font downloads often ship a variable file next to static ones. Canva rejects variable fonts, so upload the static weights the build sheet uses, one file each.
- **Grouping by file metadata.** Families group by the file's internal names. Bad metadata splits a family into separate entries, and the fix is to delete them, correct the names and re-upload ([Canva: upload fonts](https://www.canva.com/help/upload-fonts/)).
- **Spacing units differ from CSS.** A code-first render sets letter-spacing and line-height in CSS. No source settled Canva's editor units; Canva's Apps SDK works in em relative to font size ([Canva developer community](https://community.canva.dev/t/new-in-the-apps-sdk-line-height-letter-spacing-and-a-bigger-max-font-size/8830)). Treat the code-first PNG as the reference and compare renders, not numbers.
- **A commercial face Alex doesn't hold.** S-D6's decision log already covers it (closest Canva font, flagged at sign-off). Nothing new.

**(3) What would change the plan.** DoD-16's "brand fonts with no substitution" can be checked on the PDF export by listing its embedded fonts (checklist item 6). The PNG has no font table, so only a visual diff against the code-first reference catches substitution there. Font upload needs a paid plan, so DI-XX question 2 decides it.

### Q5. Export settings that keep a PNG crisp

**(1) Converged on the options; not on the best choice.**
- **PNG:** "Supports transparency and suits graphics"; quality Compress, High or Limit size (KB); a size slider or typed size; a transparent background toggle.
- **JPG:** quality Low, Medium, High or Limit size.
- **Plans:** quality controls, size limits, compression and transparent PNG are on Pro, Teams, Education and Nonprofit.
- **Size limits:** the fetched page gives a JPG and PNG maximum of "8000×3125 px" (an odd figure; check it in the dialog).
- **Sources:** [Canva: download file types](https://www.canva.com/help/download-file-types/). A regional page says PNG downloads scale from "0.5 up to 3.125 times" the design size ([canva.cn: resize](https://www.canva.cn/en/help/resize-cn/), via search summary).

**(2) Traps.**
- **Size above 1x breaks the "exact dimensions" check.** A 2x export is sharper on high-density phones (**inference**) but isn't the template size. Decide which one the checker measures.
- **"Compress" and "Limit size"** add lossy steps before LinkedIn adds its own.
- **LinkedIn's 5 MB per-upload limit** ([LinkedIn: multi-photo posts](https://www.linkedin.com/help/linkedin/answer/100983)). **Inference:** a 2x PNG with a photo in it can pass 5 MB.
- **LinkedIn's own advice conflicts with the PNG consensus.** For Page images it says "choose a high-resolution JPEG instead of a PNG file" ([LinkedIn: Page image specs](https://www.linkedin.com/help/linkedin/answer/a563309)). Third-party guides say PNG keeps text edges sharp ([contentin.io, 2026](https://contentin.io/blog/linkedin-carousel-size/), via search summary).

**(3) What would change the plan.** Nothing structural. Choose the export setting once, write it into the build sheet, and have the checker test it (checklist).

### Q6. The carousel PDF: export settings and LinkedIn's rules

**(1) Converged.**
- **Canva's PDF options** ([Canva: download file types](https://www.canva.com/help/download-file-types/)):
  - PDF Standard: "illustrations, text, and graphics at 96 dpi".
  - PDF Print: 300 dpi, with bleed, crop marks, and a choice of RGB or CMYK.
  - Compress PDF (paid plans): "image quality may be lowered".
  - Flatten PDF: "converts your design with multiple layers into one" and "may increase its file size" ([Canva: flattened PDF](https://www.canva.com/en_au/help/download-flattened-pdf/), via search summary).
- **LinkedIn's document rules** ([LinkedIn: documents](https://www.linkedin.com/help/linkedin/answer/97459)):
  - "The file size cannot exceed 100MB and 300 pages."
  - "PDFs with multiple sized pages must be fit to the same page size."
  - "PDFs with multiple layers must be flattened or merged."
  - Animations "will display as static images".
  - "Please ensure that the PDFs you upload have secure hyperlinks."
  - You "can't change or edit the document in the post".
  - Viewers "will be able to download your document as a PDF".
  - LinkedIn sets no page pixel size. 1080×1080 and 1080×1350 are common practice, not a rule ([contentin.io, 2026](https://contentin.io/blog/linkedin-carousel-size/), via search summary). Final sizes are R2's call.

**(2) Traps.**
- **Cropped images leak.** "Cropped images in a PDF can be recovered in full with a third-party PDF editor" ([Canva: download file types](https://www.canva.com/help/download-file-types/)). Since LinkedIn lets anyone download the PDF, anything cropped out of a photo is public. This is a DoD-22 point.
- **Bleed and crop marks change the page size.** **Inference:** in PDF Print they add area around each page, which breaks the exact-size check and shows on LinkedIn as white edges or marks. Keep both off.
- **CMYK shifts colours on screen.** **Inference:** CMYK is for presses; brand colours would shift on LinkedIn. Use RGB.
- **Standard or Print?** No test compares them on LinkedIn (search found only blogs: [pdf.net, undated](https://pdf.net/blog/how-to-save-canva-as-pdf)). **Inference:** for a design measured in pixels, Standard at 96 dpi keeps raster images at roughly their pixel size, while text and vectors stay vector in either mode. Print matters only if a photo inside looks soft.
- **Mixed page sizes are refused.** A carousel whose cover was resized separately breaks LinkedIn's rule. Check every page's size.
- **Page count.** 300 is the ceiling. Guides put a carousel at 5 to 15 pages ([contentin.io, 2026](https://contentin.io/blog/linkedin-carousel-size/), via search summary).
- **PDF metadata.** **Inference:** a PDF export can carry a title or author field (for example the design name). Check it, since viewers can download the file.

**(3) What would change the plan.** S-D6 §3 says only "PDF for the carousel". Add the export settings: PDF Standard, Flatten on, RGB, no bleed, no crop marks, every page the same size, and no cropped photos with anything sensitive outside the crop.

### Q7. What LinkedIn does to uploads

**(1) Documented:**
- **Image posts:** up to 20 photos; "The size limit for an upload is 5 MB"; "aspect ratio can range from 3:1 to 4:5"; "If the ratio is larger, the image will be centered and cropped to fit the max ratio"; in multi-photo posts "the images in the bottom row will be cropped to fit"; photos "can't be resized after they have been posted"; small, low-resolution photos may look low quality ([LinkedIn: multi-photo posts](https://www.linkedin.com/help/linkedin/answer/100983)).
- **Page link images:** 1.91:1 (1200×627), PNG or JPEG ≤3 MB; "Images on mobile won't be cropped"; other ratios get "subtle white padding" ([LinkedIn: Page image specs](https://www.linkedin.com/help/linkedin/answer/a563309)).
- **Documents:** see Q6.

**(2) Not documented: recompression.** Vendor sources and forum users say LinkedIn re-encodes uploads to JPEG and that text suffers, but none gives LinkedIn's thresholds or quality settings. One Adobe forum user puts it at about "medium" ([Adobe community, undated](https://community.adobe.com/questions-652/ai-to-png-and-jpg-looks-good-but-not-on-linked-in-after-exporting-with-linkedin-recom-resolution-787856); vendor pages via search summary). Treat it as real but unmeasured. How LinkedIn rasterises PDF pages in its document viewer is also undocumented in what was read.

**(3) What would change the plan.** A 4:5 portrait template sits exactly at LinkedIn's tallest uncropped image ratio, and anything taller is cropped. The checker can't post to LinkedIn (charter scope), so it simulates: re-encode each PNG as JPEG at a middling quality and re-check the smallest text.

### Q8. DoD-21: export settings for the Canva video

**(1) What Alex exports on camera** is the design: a PNG, or a PDF for a carousel. The settings are those of Q5 and Q6. If the design has motion and he exports MP4, the quality choices are "480p, 720p, 1080p, or 4K (available on desktop only)". On Canva Free, changing quality from the default triggers an upgrade prompt. Paid plans export MP4s up to 2 hours and 3840×2160. Uploaded 4K video is stored at 1080p ([Canva: download as video](https://www.canva.com/en_in/help/download-as-video/), via search summary; [Canva: upload formats](https://www.canva.com/help/upload-formats-requirements/)). The D10 video itself is cut from the rig recording with ffmpeg, not exported from Canva (canva-video SPEC §7), so Canva's MP4 settings don't apply to it.

**(2) Traps on camera.**
- **Screen care.** **Inference:** Canva's Share panel, where Template link and download live, lists the people who have access, and the download dialog sits in the same menu. A quick Download, then PNG, then High keeps him out of the access list.
- **A free-plan prompt.** If the account turns out to be Free, an upgrade prompt appears on camera the moment he changes quality.
- **Canva AI and locks** (Q1). AI fill won't touch partially locked slots.

**(3) What would change the plan.** The scene brief should name the exact clicks and settings: PNG, High, 1x (or 2x); for a carousel, PDF Standard with Flatten on. Then nothing is improvised on camera.

---

## Checklist a checker can run against each export

Every item names a measurable test. Thresholds marked (A) are assumptions for Alex or S-D6 to set; they're not sourced.

1. **Dimensions.** The PNG's pixel width and height equal the build sheet's size exactly (or exactly 2x, if that's the chosen setting).
2. **PDF page sizes.** Every PDF page has an identical page box. Its ratio matches the template, and the page count matches the design.
3. **No bleed or marks.** The PDF page box equals the trim size: no crop marks, no bleed.
4. **Ratio.** Image templates sit between 3:1 and 4:5 (width:height), so LinkedIn won't crop them.
5. **File size.** PNG ≤ 5 MB (image post). PNG or JPEG ≤ 3 MB if it's a Page link image. PDF ≤ 100 MB and ≤ 300 pages.
6. **Fonts in the PDF.** A font listing (for example `pdffonts`) shows only the brand families and weights from `local\brand.md`, all embedded, with no fallback or default face.
7. **Fonts in the PNG.** A per-text-box overlay diff against the code-first reference render, at the same size, flags glyph-shape or width differences above a tolerance (A: about 1 to 2% of line width).
8. **Locked layers.** The diff of fixed brand art (logo, colour blocks, background) against the reference is within an anti-aliasing tolerance (A).
9. **Margins.** No non-background pixel from a filled slot falls inside the build sheet's margin band or safe zone. Test once with deliberately long copy.
10. **Colour.** The PNG is sRGB, and the PDF is RGB, not CMYK. Sampled brand-colour pixels match the brand roles within a small delta (A: ΔE ≤ 2).
11. **Legibility at phone width.** Downscale to the feed width the build sheet sets. The smallest text's x-height stays readable (A: at least 7 to 8 px), and text contrast meets WCAG AA (4.5:1, or 3:1 for large text).
12. **Simulated LinkedIn recompression.** Re-encode as JPEG at a middling quality (A: about 75 to 80) and repeat test 11. LinkedIn's real setting is undocumented.
13. **PDF structure.** One layer (flattened, no optional-content layers), no animation, any links https only.
14. **Hidden content.** Extract the PDF's images (for example `pdfimages -list`). No embedded image is larger than its visible crop where anything sensitive could sit outside the crop.
15. **Metadata.** PDF and PNG metadata (title, author, creator) carry no account name, client name, Canva link or real person.
16. **Content.** No real person's name, photo or quote. No other client's design. Sample copy only (charter scope).
17. **In Canva (once, not per export).** Every brand element shows Lock. Every slot shows Lock position only. The filled template matches the build sheet's naming.

---

## Evidence gaps

- **Element locks by plan.** Canva's lock article names no plan, and Brand Template and Brand Controls eligibility differs between Canva's own regional pages. Not settled here; R2 and a read-only plan check settle it.
- **Fonts for a filler without Brand Kit access.** Whether a design shows a substitute font to someone who lacks the Brand Kit holding it: no official statement found.
- **Two answers on PDF import.** Canva's pages disagree (editable elements, or an image per page). Untested.
- **Canva's spacing units.** The editor's units for letter spacing and line height weren't confirmed. Matching a CSS render by numbers is unproven.
- **LinkedIn's recompression.** No official figures for JPEG quality, resize thresholds, or how document pages are rasterised. Only vendor and forum reports.
- **The 8000×3125 px export limit and the 150 to 200 px SVG width.** Both quoted from fetched pages; both look odd. Verify in the product.
- **Text boxes growing with long copy** under Lock position only: from experience of the editor, not from a source read today.
- **No hands-on test.** No Canva or LinkedIn session was opened (rules of this job). Every behaviour above should be confirmed on the first real template before the other four are built.

---

## Recommendations (evidence and options; every call is Alex's)

1. **How the templates go in** (S-D6 step 3; DI-XX question 1 decides the route).
   - **Option A, hybrid:** fixed art as a locked PNG or simple SVG, slots rebuilt as native text and frames. This holds pixels and fonts best (Q3).
   - **Option B, whole-template PDF import, then a font audit:** fastest, but substitution and layout shift are documented.
   - **Option C, rebuild in the editor from the build sheet:** slowest, cleanest.

   Whichever is picked, try it on one template and run checklist items 1, 6 to 9 before doing the other four.
2. **How binding the locks are** (DI-XX question 2, the plan).
   - **Option A:** ordinary locks, shared by Template link (Pro and up); the filler works on a copy.
   - **Option B:** Brand Templates in a Brand Kit (role-bound locks), if the plan has Brand Kit access.
   - **Option C:** ordinary locks only, with the sign-off note saying they're guard rails.

   B tells the "brand team hands these to anyone" story best. A is the cheapest version that is still true.
3. **Fonts.** If a brand face isn't in Canva's library and the open licence allows embedding, upload static OTF or TTF files, one per weight and italic actually used. The commercial heading face stays as the spec's logged decision (stand-in, flagged at sign-off).
4. **Export settings to fix in the build sheet.** Image: PNG, High, at 1x for the checker, with an optional 2x upload variant that stays under 5 MB. Carousel: PDF Standard, Flatten on, RGB, no bleed or crop marks, every page the same size. Switch to PDF Print (RGB, no marks) only if a photo looks soft.
5. **DoD-22 on the carousel.** No cropped photo with anything sensitive outside the crop. Check the PDF metadata. Remember any viewer can download it.
6. **S-D10's scene brief.** Name the exact export clicks (Q8). Keep the Share panel's access list off camera. If Alex wants Canva AI in the scene, test it first against the locks.
7. **Checker.** Run the checklist on every export. Where it can't post to LinkedIn, the simulated recompression (item 12) stands in, and the sign-off note should say so.

---

## Sources

Canva help pages: undated articles, footer "© 2026", fetched or searched on 2 Nov 2026.
- Lock and unlock elements: https://www.canva.com/help/lock-and-unlock-elements/ (fetched)
- Apply locks to Brand Templates: https://www.canva.com/help/brand-template-locks/ (fetched)
- Upload and use Brand Kit fonts: https://www.canva.com/help/upload-fonts/ (fetched)
- Font upload error: https://www.canva.com/help/font-upload-error/ (fetched)
- Upload formats and requirements: https://www.canva.com/help/upload-formats-requirements/ (fetched)
- PDF import: https://www.canva.com/help/pdf-import/ (fetched)
- Download file types: https://www.canva.com/help/download-file-types/ (fetched)
- Download a flattened PDF: https://www.canva.com/en_au/help/download-flattened-pdf/ (search summary)
- Adding and removing guides: https://www.canva.com/help/adding-and-removing-guides/ ; regional: https://www.canva.cn/en/help/adding-and-removing-guides/ (search summary)
- Brand Controls: https://www.canva.com/help/brand-control/ ; folder Brand Controls: https://www.canva.com/help/folder-brand-controls/ (search summary)
- Create on-brand designs (Brand Templates availability): https://www.canva.com/help/create-on-brand-designs/ (search summary)
- Share a Template link: https://www.canva.com/help/share-template-link/ (search summary)
- Download as video: https://www.canva.com/en_in/help/download-as-video/ (search summary)
- Resize (regional, PNG scale range): https://www.canva.cn/en/help/resize-cn/ (search summary)
- Canva developer community, Apps SDK line height and letter spacing: https://community.canva.dev/t/new-in-the-apps-sdk-line-height-letter-spacing-and-a-bigger-max-font-size/8830 (search summary, undated)

LinkedIn help pages: undated, fetched 2 Nov 2026.
- Documents in posts: https://www.linkedin.com/help/linkedin/answer/97459
- Multi-photo posts: https://www.linkedin.com/help/linkedin/answer/100983
- Image specifications for Pages: https://www.linkedin.com/help/linkedin/answer/a563309

Third-party: lower weight, used only where flagged.
- contentin.io, LinkedIn carousel size 2026: https://contentin.io/blog/linkedin-carousel-size/
- learninginhand, recolouring SVGs (Jan 2025): https://learninginhand.com/blog/2025/1/12/svg
- Realmac forum, SVG colours (undated): https://forums.realmacsoftware.com/t/svg-component-edit-composition-colours/45927
- Adobe community, LinkedIn export quality (undated): https://community.adobe.com/questions-652/ai-to-png-and-jpg-looks-good-but-not-on-linked-in-after-exporting-with-linkedin-recom-resolution-787856
- pdf.net, saving Canva as PDF (undated): https://pdf.net/blog/how-to-save-canva-as-pdf
- Bwillcreative, margins in Canva (undated; not opened, attribution of the fixed-margin claim unconfirmed): https://www.bwillcreative.com/?p=95333
