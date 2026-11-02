# W2 Wildcard: can it be delivered?

**Question (verbatim):** When the Addvery LinkedIn templates exist in Alex's Canva account, what can Addvery's people actually open and use, and by which route: what of a Canva template survives when it leaves his account (locks, fonts, brand kit, premium elements), which route (previews on the site, a Canva embed, a template link, a shared copy, a brand template in their own team, the Canva video) puts something usable in front of them, and what does each route expose in public?

2026-11-02 · session s1-research subagent · item 6 of 7 on list L-05

Lens: W2, "can it be delivered?" Once the templates, the posts and the Canva video are built, do they reach Addvery's people in a form they can see and use?

---

## (a) Gap analysis

### What the other items cover

| Item | Covers | Doesn't cover (in this lens) |
| --- | --- | --- |
| R1 Alex's earlier demo | What the old demo did, what's reusable, what was hard | How the old or new templates reached anyone outside the builder's account |
| R2 What Canva can do now | Brand Kit, brand templates, Connect API, autofill, MCP; which plan; LinkedIn sizes | Leans towards the build side. It may touch sharing but isn't asked what crosses to *another* organisation's account |
| R3 Pixel-perfect in Canva | Locks, grids, fonts and exports when someone else fills a template in; LinkedIn upload compression | Whether the locks and fonts survive the move from Alex's account to someone else's |
| R4 LinkedIn posts in a brand's voice | The writing method, the formats LinkedIn rewards, personal versus company voice | How the posts are shown on the site |
| W1 Can it be executed? | Can it be built in time with these tools | What happens after it's built |
| W3 Will it be received? | How the work lands with its readers | The route that gets it to them |
| L-01-W2 (done) | The alert link, the preview card, click timing, the Hobby plan, YouTube's 15-minute cap, the hand-over checklist | Anything specific to Canva or to the templates as a usable object |

### Everything left open in this lens

From the charter, DoD-16/17/19/21, the three specs, `canva-templates\BUILD-SHEET.md` and `BUILD-NOTES.md`, `website\CLAUDE.md`, `website\SPEC.md` §7, `website\content\deliverables.json` and `SESSIONS.md` (all read-only):

1. **Templates as a usable object.** The pitch is that "a GTM engineer can give a brand team locked, on-brand templates that anyone can fill in, not one-off images" (S-D6 intro). But what reaches Addvery is a gallery of PNG previews (S-D6 step 14). Canva links never leave `local\` (S-D6 decision log), and DoD-16 only checks that "the templates exist in Canva". No item asks how a template gets from Alex's account into Addvery's hands.
2. **What survives the crossing.** Locks, the brand kit, fonts and premium elements, once the template is opened from a different account or plan.
3. **The video as the only proof of "fill-in-able".** S-D10 says the video shows "the templates hold up in a person's hands". If its question 3 isn't answered, though, the default is the webcam-only cut, which doesn't show the design.
4. **Public exposure.** A public, editable template in Addvery's brand would let anyone make Addvery-branded posts.
5. **The Canva editor on camera.** The S-D10 checklist names Canva's home page, the project list and other brand kits. It doesn't name the editor's own side panels (Uploads, Projects, Brand).
6. **The carousel on the site.** A multi-page PDF needs a viewer; per-page PNGs don't.
7. **LinkedIn-style cards for the posts** (S-D7 step 11): copying LinkedIn's interface on a public site.
8. **Sign-off timing.** Previews only move to the tracked `exports\` after the sign-off, so if it slips to the morning the D6 and D7 sections are empty overnight. This is mostly W1's question.
9. **Video length and upload.** Covered by S-D10's question 2 and L-01-W2.

### Ranked shortlist

Ranked by: effect on the outcome (Addvery's marketing side seeing a capability they could use), how likely it is to go wrong, whether anyone else covers it, and how soon it bites.

1. **Items 1, 2 and 4: the route, what survives it, and what it exposes.** This is the deliverable's own claim, nobody owns it, and S-D6's intake (route and plan) is still held. The route and plan answers decide it. Highest on every count.
2. **Item 3: the video as proof.** High effect and decided by a default. S-D10's intake already asks about it, though, so this needs only a pointer.
3. **Item 5: editor panels on camera.** Real risk, and the check is cheap. It goes into (c).
4. **Items 6 and 7.** Small presentation choices for the website and S-D7.
5. **Items 8 and 9.** W1's territory, or already handled.

### Why I picked this question, and what I passed over

I picked item 1, folded in 2 and 4, and added 3 and 5 as short findings. The templates are the one deliverable whose claim is about use by someone else. As planned, that use never reaches Addvery: they see pictures. The choices that would change this (which route into Canva, which plan) are in S-D6's intake, which is still held. Answering those choices now costs Alex nothing extra.

Passed over:
- The carousel viewer and the LinkedIn-style cards: notes in (c), not research.
- Sign-off timing: W1.
- YouTube limits: already covered.

---

## (b) Research

### Method

- **When:** 2 Nov 2026, about 16:20 to 16:45 Prague.
- **Local reads, read-only:**
  - `CHARTER.md`, `research\lists\L-05-brand-assets.md`, `research\DIRECTORY.md`, `research\global\L-01-W2-wildcard-delivered.md` (to avoid repeating it).
  - `canva-templates\SPEC.md`, `BUILD-SHEET.md`, `BUILD-NOTES.md`.
  - `linkedin-content\SPEC.md`, `canva-video\SPEC.md`.
  - `website\CLAUDE.md`, `website\SPEC.md` §7, the D6, D7 and D10 entries in `website\content\deliverables.json`.
  - `SESSIONS.md`, and the list of files in `Operator tasks\`.
  - Not opened: `Addvery Research\`, `website\local\`, `canva-templates\local\`, anything in Canva, LinkedIn or GetSales.
- **Web (WebSearch and WebFetch):**
  - Canva Help Center pages: template links, lock and unlock, can't edit a shared design, embeds, public view links, brand templates, watermarks, copying designs to another account.
  - Two third-party write-ups on the 2025 template-link change (one of them returned 403).
  - LinkedIn's brand page.
- **No live test.** Creating a template link or embed would change Alex's Canva account and needs a login. Both are outside this item's read-only rules.

### Verdict

1. **As planned, Addvery's people get pictures, not templates.** The site's D6 section is a gallery of exported previews. The Canva link stays in `local\`, and DoD-16 is met once the templates exist in Alex's own account. The claim "anyone can fill them in" reaches Addvery only through the Canva video, and only if Alex picks a screen cut. S-D10's default (webcam only) shows none of the design work.
2. **A Canva template can't leave Alex's account whole.** Canva doesn't copy brand kits or fonts to another account. Brand Templates can no longer be shared outside a team. Locks are honoured only as far as edit rights go: "Anyone with edit access to the design can lock or unlock its elements." What does cross is the layout, colours set on each element, Canva library fonts and the placed images (inference from the help pages; untested).
3. **Only a template link gives an outsider a copy they can fill in, and it's a private-message route, not a public-site one.**
   - It needs Alex on a paid plan.
   - Recipients outside his email domain can use it on a free account, with premium elements watermarked.
   - Posted publicly, it hands anyone an editable template in Addvery's brand.
   - The only route where locks really hold is Brand Templates inside Addvery's own Canva team. That's a day-one-of-the-job setup, not something to deliver today.

### Evidence

#### B1. What the current plan delivers (local reads)

- **Site claim.** `deliverables.json`, D6: "They're pixel-perfect and on brand, so every post looks as if it came from the same team." The S-D6 intro promises templates "that anyone can fill in, not one-off images."
- **What reaches the site.** S-D6 step 14's BUILD asks for "a gallery of the template previews and a short how-it-was-made note".
  - S-D6 decision log: "brand values (hex codes, font names) and Canva links stay out of tracked files". The reason given: Canva links "point into Alex's account".
  - The screen-care rule: "No Canva links or brand values go in tracked files."
- **DoD-16's check.** "The templates exist in Canva; Alex's sign-off is recorded." Nothing in it is about use by anyone else.
- **The video is the only planned demonstration of use.**
  - S-D10 says it shows that "the templates hold up in a person's hands."
  - Its question 3 default, if unanswered, puts the webcam-only cut live: "Cheapest, but viewers don't see the design happen."
  - `website\CLAUDE.md` confirms the standing rule ("The site shows the webcam, not the screen share"), with the Canva video as an allowed exception.
- **State at about 16:35.**
  - No "Decide - how the Canva templates get made" or "Decide - when and how to film the Canva video" file is in `Operator tasks\`, so both intakes are still held.
  - `s-d10-canva-video` isn't launched (`SESSIONS.md` row: "After S-D6, near the end of the day").
  - The route into Canva and the plan are still open (S-D6 §1, questions 1 and 2).
- **Fonts.** `BUILD-NOTES.md`: "part 1 uses free substitutes that are in Canva's own font library", as static instances. This choice matters for delivery as well as for the build (B3).

#### B2. The delivery routes, side by side

| Route | What reaches Addvery's people | Needs | Survives | Exposes | Evidence |
| --- | --- | --- | --- | --- | --- |
| **Previews on the site** (the plan) | Pictures of the templates, and the carousel as page images or a PDF | Nothing beyond the sign-off | Everything visual; nothing editable | Only what any LinkedIn post would show | S-D6 §7 step 14 |
| **Canva embed or public view link on the site** | The design itself, viewed in Canva's own viewer. Shows it's a real Canva design, not a picture | Making the design public. On Free and Pro, "embeds are public by default and can't be restricted"; private embeds are Enterprise or Education Districts only | View only (the page doesn't say whether viewers can copy). "Premium elements on the design will be watermarked unless they're purchased" | A public Canva URL to a design in Alex's account. Deleting the link kills it | Canva Help: embeds; public view link |
| **Template link** | Their own editable copy of each template, in their own Canva account | Creating one is "only available to Canva Pro, Canva Teams, Canva Enterprise, Canva for Education, and Canva for Nonprofits users". The recipient signs in or makes a free account. Recipients on the owner's work email domain need a paid plan; others "can continue to open and edit Template links" | Layout, the placed logo and images, and the colours on each element (inference). Premium elements watermarked for free users. Brand kit: no. Locks: probably copied, but unlockable by the copy's owner (B3) | Anyone holding the URL can make Addvery-branded content. Deleting the link "make[s] the URL inactive" | Canva Help: template link; Marketing Words (quotes Canva support, 2025) |
| **Share to a named account, then "Make a copy"** | One design at a time, in their account | Their email; Alex sets "Can Edit" | As for a template link. Canva lists "Fonts" and "Brand Kits" among content that can't be copied. A team admin can block copies leaving a team | Private to the person named | Canva Help: copying designs to another account |
| **Brand Templates in Addvery's own Canva team** | Templates with real lock enforcement and a shared brand kit | An Addvery Teams or Enterprise account with Alex invited as a brand designer. "External sharing of Brand Templates has been phased out" | Everything: it's built where it lives | Nothing public | Canva Help: brand templates; lock and unlock |
| **The Canva video** | A person filling a template in, end to end | S-D10 question 3 = A or B; screen care | Not applicable | Whatever the editor shows (B4) | S-D10 spec |

What the table shows: only the last two routes demonstrate templates "anyone can fill in". The video demonstrates it to everyone. Brand Templates in their team deliver it for real, but only after a hire. A template link is the only same-day route that puts something fill-in-able in their hands.

#### B3. What survives when a template leaves Alex's account

| Part | Survives? | Basis |
| --- | --- | --- |
| Layout, sizes, positions | Yes | The copy is the design. (Inference, consistent with every sharing page) |
| Colours set on each element | Yes | They're element properties, not brand-kit references. (Inference) |
| Brand kit (palette, logos, fonts as a set) | **No** | Canva: "Brand Kits" can't be copied. Each team has its own |
| Uploaded or team custom fonts | **No** | Canva: "The design has custom fonts that people outside the team can't view." The fix is to swap in "a standard Canva font" |
| Canva library fonts | Yes (inference) | "Standard Canva font" is Canva's own fix. **Verify** that each font used is free in Canva, not a Pro font, or free recipients may hit a paywall |
| The placed logo image | Probably | It's part of the design. Canva's no-copy list includes "Unlisted media", left undefined. **Verify** in a test copy |
| Locks | Copied, but not enforced | "Copying or duplicating a page keeps the original's lock states", and "Anyone with edit access to the design can lock or unlock its elements." The recipient owns their copy, so they can unlock (inference). Only Education teacher locks resist unlocking. No source tested template-link copies directly |
| Premium (Pro) elements | Watermarked for free users | Canva: "Premium elements will have watermarks on your design if you're a Canva Free user." A write-up reports a free recipient "could edit fonts but not graphics" |
| Live text from imported PDFs | Not a crossing issue | Once in Canva, text is Canva text. R1 and R3 cover the import |

Two consequences:
- **The build sheet's lock levels are a guard-rail, not a guarantee, outside Alex's team.** Its "Locked (L)" and "Owner-only (O)" levels (`BUILD-SHEET.md` §7) behave as designed only for people who don't have edit rights.
- **S-D6's font choice is what makes a template link survive.** Static Canva-library substitutes avoid the custom-font failure. Uploading Addvery's commercial heading face as a custom font would break every copy outside Alex's team. That's inference from the Canva pages, and it adds a delivery reason to the licensing reason already in S-D6's decision log.

#### B4. What a public route or the video exposes

- **A public template link or embed** puts an editable Addvery-branded template, logo included, on the open web, from Alex's account.
  - The site already shows Addvery's brand, so the logo itself isn't new exposure.
  - The ability to *make new* Addvery-branded posts is new.
  - Canva's upload rules ask that you only upload content you're licensed to use (the font upload page states this for fonts). Whether it applies to a company's logo used in a job-application demo isn't settled here.
  - (Inference; not legal advice; not researched further. Trademark questions weren't in L-01-R3's scope.)
- **The editor's side panels.**
  - Canva's help says uploads are added from the editor's Uploads tab. Canva's developer docs say "users can add their assets, or shared assets, to designs using the Uploads tab in the Canva editor." So that tab lists Alex's uploads across clients (inference).
  - The editor's Projects tab shows saved designs and folders. That source is a video description, so it's weaker.
  - S-D10's checklist names "Canva's home, projects or other brand kits" but not the Uploads tab. Adding an image or logo on camera is the obvious moment to open it.
- **LinkedIn-style cards (S-D7).** LinkedIn's brand page requires written permission for its logo or brand features outside its guidelines. A card that copies LinkedIn's chrome on a public site risks reading as a fake screenshot. A neutral "post card" doesn't. (Secondary sources only on screenshots; low priority.)

### Evidence gaps

- No live test. Lock behaviour in a template-link copy, the logo surviving the copy, and what a free recipient sees are all inferred from help pages. A 5-minute test with a second account settles all three.
- The 2025 template-link rules (paid creator; free recipients outside the owner's domain; the same-domain rule from 2 June 2025) rest on Canva's current help page plus one blog quoting Canva support. Canva's page confirms the creator plans and the domain rule. The blog's dates are unverified.
- Whether each substitute font is free in Canva or a Pro font: not checked. The font names stay in `local\`.
- Alex's Canva plan is unknown (S-D6 question 2). A template link and multiple public links need a paid plan; embeds don't appear to.
- Whether a Canva embed sets third-party cookies on the site, and so needs a line on `/privacy`: not checked.
- Nothing about Addvery's own tooling (whether they use Canva, and on which plan) was researched. That's Alex's own research, and it decides whether "a template link for your brand team" means anything to them.

---

## (c) Recommendations

Every call below is Alex's. Each says what it serves, who would act on it, and what it costs.

### C1. Decide what "delivered" means for the templates (S-D6, website)

| Option | What Addvery gets | Cost | Risk |
| --- | --- | --- | --- |
| **A. Pictures plus the video** (the plan, made honest) | The gallery, plus the Canva video as proof of fill-in. The D6 how-it-was-made note says plainly that the templates live in Canva and would move into their own team as Brand Templates | One line of copy | Without a screen cut (C2), the "anyone can fill in" claim has no proof on the site |
| **B. A plus a private template link for the brand team** | Their own editable copies, sent in the hand-over message to the marketing lead, never on the site | Needs a paid plan (S-D6 question 2), a 5-minute test (C4), and a line in the hand-over checklist (L-01-W2 C7) | Locks are only guard-rails in their copies. Watermarks if any premium element slips in. The link is shareable onwards; deleting it kills it |
| **C. A plus a Canva embed or public view link on the site** | Proof it's a live Canva design | Making the design public; Free and Pro can't restrict it | Public URL into Alex's account. Watermarked premium elements. Possible cookie line on `/privacy` (verify) |
| **D. A public template link on the site** | Anyone can fill it in | As B | Editable Addvery-branded template in public, from his account. I'd rate this the weakest option |

Evidence leans towards A, plus B if Alex's plan allows. It's his call. B is the only same-day route that puts a fill-in-able template in their hands. Keeping it private avoids the public exposure in B4. The S-D6 rule "no Canva links in tracked files" holds either way: the link goes in the message, not the repo.

### C2. Make sure the video shows the design (S-D10)

- If the screen cut isn't chosen, the video drops S-D10's own stated aim ("the templates hold up in a person's hands") and leaves D6's claim unproved on the site.
- Options for Alex in S-D10's question 3:
  - A (screen with webcam inset), already recommended there;
  - or keep C live, and have the morning cleanup swap in A only on his word (the current default).
- Worth saying in that intake, as a fact: the webcam-only cut shows nothing of the templates.

### C3. Keep the templates "crossing-safe" (S-D6, at the build and check steps)

- Keep to Canva library fonts, already the plan. Check that each one is free in Canva, not a Pro font.
- Use no premium (Pro) elements: no Pro photos, icons or graphics. The build sheet's abstract diagram and vector quote mark should be drawn or uploaded, not picked from Pro content.
- Present locks on the site as guard-rails for fillers. Say that real lock enforcement comes from Brand Templates inside the brand's own team: the line the how-it-was-made note can carry.

### C4. If B or C is chosen, run one delivery test before sending (S-D6 check step)

- Open the template link (or embed) in a second, free Canva account that isn't on Alex's email domain.
- Check four things, with that window on the unrecorded 4K monitor:
  - Locks: are they there, and can they be unlocked?
  - Fonts: no substitution, no paywall.
  - Watermarks: none.
  - The logo is present.
- About 5 minutes, and it settles this report's main evidence gaps.

### C5. Add the editor's panels to the Canva video's screen-care list (S-D10, scene brief)

- Add to the checklist: don't open the Uploads, Projects or Brand panels on camera.
- Use only the logo and images already placed in the template.
- If an image must be added, pause the recording first.
- The checking subagent in S-D10's methodology step 4 should look for those panels in particular.

### C6. Small presentation notes (website, S-D7)

- **Carousel.** Show the carousel as page images with a download of the PDF, not an embedded PDF viewer. It's lighter, and it works in the LinkedIn in-app browser most visitors will use (L-01-W2).
- **Post cards.** Show S-D7's posts as neutral post cards, not copies of LinkedIn's interface, and never with LinkedIn's logo.

### Questions for Alex (one line each, naming who they unblock)

1. Should Addvery's brand team get a private template link in the hand-over message, or only the gallery and the video? (S-D6, orchestration's hand-over)
2. Does your Canva plan allow template links (Pro or higher)? If not, B is off the table. (S-D6 question 2)
3. Should the Canva video show the screen, so it proves the templates can be filled in? (S-D10 question 3)

---

## Sources

- Canva Help, "Share a design as a template link": https://www.canva.com/help/share-template-link/
- Canva Help, "Lock and unlock elements": https://www.canva.com/help/lock-and-unlock-elements/
- Canva Help, "Can't edit a shared design": https://www.canva.com/help/cant-edit-shared-design/
- Canva Help, "Embedding designs and unpublishing embeds": https://www.canva.com/help/embed-designs/
- Canva Help, "Sharing your design as a public view link": https://www.canva.com/help/sharing-your-design-as-a-public-view-link/
- Canva Help, "Brand templates": https://www.canva.com/help/brand-templates-2/
- Canva Help, "Watermarks on designs": https://www.canva.com/help/watermarks-design/
- Canva Help, "Copying designs or files to another team or account": https://www.canva.com/help/transfer-designs-to-personal-account/
- Canva Help, "Upload and use Brand Kit fonts": https://www.canva.com/en_in/help/upload-fonts/
- Canva Help, "Upload media": https://www.canva.com/help/upload-media/
- Canva Developers, "Designs, folders and assets": https://www.canva.dev/docs/audit-logs/what-are-designs-folders-and-assets
- Marketing Words, "Canva update: template link sharing" (Feb to May 2025, quotes Canva support): https://blog.marketingwords.com/canva-update-template-link-sharing/
- Brenda Cadman, "Are Canva template links only for Pro users now?" (returned 403; cited only through search snippets): https://brendacadman.com/are-canva-template-links-only-for-pro-users-now/
- Enterprise Nation, "How to use the Canva editor" (video description, weaker source, Projects tab): https://learn-something.enterprisenation.com/learn-something/how-to-use-the-canva-editor
- LinkedIn Brand, "The basics of the LinkedIn logo": https://brand.linkedin.com/content/brand/global/en_us/index/visual-identity/logo
- Local, read-only: `CHARTER.md`; `research\lists\L-05-brand-assets.md`; `research\DIRECTORY.md`; `research\global\L-01-W2-wildcard-delivered.md`; `canva-templates\SPEC.md`, `BUILD-SHEET.md`, `BUILD-NOTES.md`; `linkedin-content\SPEC.md`; `canva-video\SPEC.md`; `website\CLAUDE.md`, `website\SPEC.md` §7, `website\content\deliverables.json`; `SESSIONS.md`; the file list of `Operator tasks\`.
