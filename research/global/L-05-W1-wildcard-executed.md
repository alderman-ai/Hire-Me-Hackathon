# L-05 W1 Wildcard, can it be executed? The route into Canva, against the clock

- **Question:** At 16:32 there is no route into Canva: the intake that picks one isn't released, no Canva connector is attached, and the video session isn't launched. Can about five editable, locked Addvery templates get from part 1's import-ready PDFs into Canva by 17:05, for the 17:15 recording? Which route gets there (the Canva connector, Claude in Chrome, the Connect API, or Alex by hand), what does each cost, and what does each lose on import?
- **Date:** 2026-11-02 (written 16:32–16:40 Prague; the state it describes may have moved on since)
- **By:** session s1-research subagent
- **List:** L-05 brand assets, item 5 of 7 (W1 wildcard)
- **Readers:** S-D6 (canva-templates), S-D10 (canva-video); S-D7 only where noted
- **Status:** every recommendation is an option for Alex, not a decision.

---

## (a) Gap analysis

### What the other items cover

| Item | Covers | Lens |
| --- | --- | --- |
| R1 | What `pixel-perfect-branded-assets-demo` did, what's reusable, what it found hard | Prior art |
| R2 | Canva's features by hand and by API (Brand Kit, brand templates, Connect API, autofill, MCP server), which plan each needs, LinkedIn sizes | Capability catalogue |
| R3 | Keeping templates pixel-perfect when others fill them: locks, grids, fonts, export; traps such as font substitution, PDF carousel export, LinkedIn compression | Design craft, mostly the export side |
| R4 | Writing LinkedIn posts in a brand's voice since August; formats LinkedIn rewards; a leader's personal brand (method only) | S-D7 content |
| L-01-W1 (parent, done) | Usage limits, idle stops and Windows Update across a dozen background sessions | Session survival |
| W2 / W3 | Can it be delivered? Will it be received? | Not execution |

None of them asks whether **this project, today, with its actual state and tools,** can get the templates into Canva in time. R2 lists what Canva *can* do. R3 covers craft. Nothing joins those to the clock, to the files part 1 actually produced, or to the access the sessions actually have.

### What's left open in the "can it be executed?" lens (found by reading the specs and the folder at 16:32)

1. **The route and the clock.** S-D6's part 2 needs a route chosen in an intake that isn't released yet: no `Decide - how the Canva templates get made.md` in `Operator tasks\` at 16:32. The spec estimates about 30 minutes of Canva work after the answer, and S-D10 needs the link by 17:05.
2. **Whether part 1's files survive Canva's PDF import.** Part 1 is HTML rendered by headless Chrome to PNG and PDF (`canva-templates\BUILD-NOTES.md`). The plan says "a PDF comes in with live, editable text, which is what makes it a template". Nobody has checked how Canva's importer treats these particular files: wrapped text, SVG gradient numbers, CSS gradient-clipped words, fonts matched by name.
3. **What the Canva connector can actually do.** Option A in the intake recommends it, but its import and edit surface (local files? locks? new text boxes?) isn't checked against S-D6's needs.
4. **Claude in Chrome on this machine.** It's the fallback for everything else: a visible window on Alex's real Chrome, login pauses, and several background sessions on one Windows machine.
5. **S-D10 has nobody to start it.** Its session isn't launched (roster: "After S-D6, near the end of the day"), and its intake is released only once S-D6's is answered. Before 18:00 the defaults don't fire, so the 17:15 scene has no brief unless someone acts.
6. **Screen care inside the Canva editor,** not just the home page: the editor's side panels can list account-wide content.
7. Alex's Canva plan (brand kit, font upload): R2's ground, and his account data, which wasn't read.

### Ranked shortlist

| Rank | Question | Why it ranks here |
| --- | --- | --- |
| 1 | **Route × clock × import fidelity (1 to 4 above, as one question)** | It decides whether DoD-16 ("templates exist in Canva") and DoD-21 (the 17:15 video) can happen today at all. Every route fails for a different reason, so they have to be weighed together. |
| 2 | S-D10's missing start (5) | It's real, but it's a coordination fact, not a research question. It goes into (c) as an option. |
| 3 | Screen care inside the editor (6) | Closer to W2 (delivery) and to S-D10's own checklist; one recommendation covers it. |
| 4 | Alex's Canva plan (7) | It belongs to R2, and the answer is in his account, which this report may not open. |

**Picked: rank 1.** It's the one question whose answer changes what happens in the next 30 minutes, and no other item is placed to answer it. **Passed over:** a standalone PDF-import fidelity study (folded in as a sub-question, since no source settles it without a live test), the editor's screen care (one option in (c)), Canva plans (R2's), and S-D7's pipeline. S-D7's decision log shows round 3 under way at 16:28, needing no external access, so it isn't an execution risk.

---

## (b) Research

### Method

- **Local, read only.** I read the three specs, `canva-templates\BUILD-SHEET.md` and `BUILD-NOTES.md`, the `Operator tasks\` listing and the S-D6, S-D7 and S-D10 rows in `SESSIONS.md`, all at 16:32. I listed the names and sizes of the files in `canva-templates\local\`, without opening them, so no brand value was read. From `~\.claude.json` I read one named key, the Chrome default. I read nothing in `Addvery Research\`.
- **Tools present.** This session's own tool list shows which claude.ai connectors reach Claude Code sessions.
- **Web.** Canva's help centre (PDF import, locks, the AI connector, connecting Claude), Canva's Connect API reference (design imports, authentication), a third-party list of the connector's tools (Composio), a mirror of Canva's own published Claude skill for editing designs (`canva-sdks/canva-skills`), and Claude Code's Chrome documentation.
- **Not done:** no live test in Canva (the rules allow no logins and no writes to connected tools). Every claim about how *these* files import is marked as inference or as a gap.

### Verdict up front

1. **Not on the current route and clock.** At 16:32 no route exists. The intake that picks one is unreleased, no Canva connector is attached, and S-D10 isn't running. Even if Alex answered at 16:35, the spec's own estimates put templates in Canva at about 17:10–17:20, after S-D6's 17:05 hand-over to the video (inference from the spec's estimates). **The 16:45 brand sign-off doesn't need Canva**: the gate is already designed to embed the local exports.
2. **The connector can't do the import or the locks.** It imports a design only from an **HTTPS URL**. Part 1's PDFs are local and git-ignored, and nothing is meant to be published before the sign-off. Its edit operations **can't lock elements, add text boxes, change a font family, or change backgrounds or gradients**. It suits filling and exporting templates once they exist, not building them.
3. **Claude in Chrome is the only agent route that can upload local files and set locks.** It's enabled by default on this machine, and the five PDFs (about 370 KB in all) are far under its 10 MB upload cap. It works in a **visible window in Alex's real Chrome**, pauses for him at any login or CAPTCHA, and on Windows two Chrome-using sessions can collide on a named pipe. No source speaks to its reliability in Canva's editor.
4. **Import fidelity is the hinge, and it's undocumented.** Canva says only that text "may be separated into editable elements", fonts "may be replaced" and layouts "may shift slightly". Nothing says whether a wrapped headline arrives as one box or one box per line, or what becomes of SVG gradient numbers and gradient-clipped words. A two-minute test import of one file settles it.
5. **Fastest executable path (inference):** sign off on the exports at 16:45. Then either Alex imports the five PDFs by hand off camera (about 5 minutes, estimate), or the import itself becomes the 17:15 scene. Both skip connectors, credentials and forks.

### Evidence

**E1. The state at 16:32 (local, observed)**
- `Operator tasks\` has nine files: none is S-D6's `Decide - how the Canva templates get made.md`, S-D10's `Decide - when and how to film the Canva video.md`, or either sign-off gate (`Approve - the LinkedIn templates in Canva.md`, `Approve - the LinkedIn posts in the Addvery voice.md`).
- `SESSIONS.md`: `s-d6-canva-templates` and `s-d7-linkedin-content` launched at 15:48, intakes "held ... until `orchestration` says go". `s-d10-canva-video` reads "After S-D6, near the end of the day": not launched.
- S-D10's intake is released only "when the Canva templates intake ... is answered" (`canva-video\SPEC.md`, Appendix A). Its session launches only "once DI-XX is answered", and its defaults fire only from 18:00. As written, nothing produces the 17:05 scene brief.
- Part 1 is done and checked: five templates as PNG plus a one-page PDF each, and the six-page carousel PDF, in `canva-templates\local\exports\` (PDFs between 46 and 147 KB). `BUILD-NOTES.md`: "Into Canva (part 2, not started)".
- No Canva connector here: this session's tools include claude.ai connectors for GetSales and Vercel (`mcp__claude_ai_GetSales__*`, `mcp__claude_ai_Vercel__*`) but no Canva tool. That also shows claude.ai connectors do reach Claude Code sessions, as the intake's option A assumes.

**E2. The clock (the specs' own estimates; the arithmetic is inference)**

| Step | Spec's estimate | Earliest finish if started 16:35 |
| --- | --- | --- |
| Release the intake, Alex answers | about 3 min | 16:38 |
| Connector: add it in settings and sign in, with the recording paused | about 2 min | 16:40 |
| Fork S-D6 so its successor loads the connector's tools (S-D6 §1, §8) | not estimated; say 5 min | 16:45 |
| Canva step: brand kit, import, lock, name | about 30 min | about 17:15 |
| S-D6 tells S-D10 the link | by 17:05 | **missed by about 10 min** |

The sign-off at 16:45–17:00 also takes Alex's attention in the middle of that window. Under the Connect API route the setup alone is "about 15 to 20 minutes" (intake option C), and under the "Alex by hand" route the build is "45 to 60 minutes" (option D). Only a route that skips the connector and the fork gets close to 17:05.

**E3. The Canva connector: what it can and can't do**
- **Access.** "The connector is available for all Canva accounts, including Canva Free". Brand Templates need a paid plan, and autofill works on every plan except Pro Lite and Free (Canva help, AI connector setup). A third-party guide says Free is excluded; Canva's own page takes precedence. Setup: Claude Settings, then Connectors, then Canva; sign in; then "start a new chat" with Canva turned on (Canva help, connect Claude). For a running Claude Code session, that means a restart, which is why S-D6 plans a fork.
- **Import only from a URL.** The tool list has `Import-design-from-url` ("when a message contains an HTTPS link") and `Upload-asset-from-url`, and no tool that takes a local file (Composio's list of 33 tools; third-party, not Canva's own). Inference: importing part 1's PDFs through the connector means putting them at a public HTTPS address first. The site or the public repo would publish brand files before the sign-off, which S-D6's decision log rules out.
- **Edits are narrow.** Operations: `replace_text`, `find_and_replace_text`, `format_text` (size, weight, style, colour, alignment, line height), `update_fill`, `insert_fill`, `delete_element`, `position_element`, `resize_element`, `update_title`, `update_autofill_field`. Canva's own skill lists what the API can't do: "Change font family/typeface", "Add new text elements", "Change background colors or gradients", "Add, remove, or reorder pages/slides", "Group/ungroup elements, or restyle shapes". **No lock operation appears anywhere** (the `canva-edit-design` skill from `canva-sdks/canva-skills`, read on a mirror).
- **Locks and AI edits.** On Canva AI editing a design: "Content inside a locked element may not be updated, even if the element is only set to Lock position only" (Canva help, brand template locks, as summarised by the search). Whether the connector's edits go through the same path isn't stated. Inference: an agent should fill the templates *before* locking them, or test that first.
- **Fit to S-D6.** Good for filling slots with S-D7's copy, exporting, moving designs into a folder and listing brand kits. Unfit for creating the templates from local files and for the locks DoD-16 asks for ("brand elements locked where the plan allows").

**E4. The Connect API: works with local files, but not today**
- `POST https://api.canva.com/rest/v1/imports` takes the file's raw bytes (`application/octet-stream`), with an `Import-Metadata` header, and supports PDF. A job is polled at `GET /v1/imports/{jobId}` for the new design's edit URL. So local files work (Canva Connect API reference).
- "The API is currently provided as a preview ... public integrations using preview APIs will not pass review" (same page).
- Auth is OAuth 2.0 authorization code with PKCE (SHA-256), set up through an integration in the developer portal with a registered redirect URI; Canva's quickstart warns to use `127.0.0.1` rather than `localhost` (Canva authentication docs and quickstart, from search summaries).
- I found no Canva statement on whether an unreviewed private integration can be used on the creator's own account, nor the exact scope names. Together with the intake's 15 to 20 minute estimate and a credential step with the recording paused, this route misses 17:05 (inference).

**E5. Claude in Chrome on this machine**
- On by default here: `~\.claude.json` has `"claudeInChromeDefaultEnabled": true`, so background sessions start with the browser tools.
- It can upload local files: "Claude can attach files from your machine to upload fields on web pages ... a single upload can include up to 10 MB of files in total". Files under credential-like names (`.env`, `.pem`) are refused (Claude Code docs, Chrome).
- "Browser actions run in a visible Chrome window in real time. When Claude encounters a login page or CAPTCHA, it pauses and asks you to handle it manually." A background session can't show that pause to Alex except through the desk (inference).
- On Windows: "Named pipe conflicts (EADDRINUSE): ... Close any other Claude Code sessions that might be using Chrome". Inference: only one session should drive Chrome at a time. That matters if the website or D3 sessions also use it.
- "The Chrome extension's service worker can go idle during extended sessions ... run `/chrome` and select 'Reconnect extension'". A background session can't type `/chrome` itself, so Alex would have to attach (inference).
- Its tab group opens in his real Chrome. S-D6 already requires "that Chrome window on the 4K monitor, which isn't recorded".
- No source found on how reliably it drives Canva's editor (selecting an element, opening the lock menu). It's the only agent route that can set locks, and it's untested.

**E6. Canva's PDF import: what's documented, and what isn't**
- Documented: "Files can be up to 300 MB", up to 500 pages, "up to 1,400 elements and images"; "Text and images may be separated into editable elements"; "Unsupported fonts may be replaced with similar fonts"; "Some layouts may shift slightly after import"; scanned PDFs import "as a single flattened image" (Canva help, PDF import). Part 1's files are far inside these limits.
- Part 1 already works around what it could foresee (`BUILD-NOTES.md`): static font instances "so a PDF imported into Canva keeps live, editable text in a font Canva already has"; ligatures off; tabular figures off on the display font; page boxes trimmed to the exact canvas.
- Not documented, so open until tested (inference from how Chrome writes PDFs and from the help text):
  - **Wrapped text.** Chrome places text line by line. If Canva makes one text box per line, a filler can't type a longer headline that reflows, and the files are pictures of a template rather than templates.
  - **SVG gradient numbers** (T2's big number, T4's point numbers) may arrive as a vector graphic, not editable text. **CSS gradient-clipped highlight words** may arrive as solid text or as an image. The build sheet's fallback (the solid accent) is ready for both.
  - **Fonts by name.** If the embedded font names match Canva's library they map; if not, Canva substitutes silently.
- Third-party, indirect: a Figma-to-Canva importer reports gradient fills "rasterized", and that Canva's own gradient is a simple linear one (pixeltinkers). It's a different import path, so this is weak evidence.

**E7. Locks Canva offers (the documented part)**
- "Lock: completely locks position, style, and content" (for logos and backgrounds); "Lock position only: locks position and style, leaving only the content editable". For text, it locks font, size, colour and alignment while the words stay editable (Canva help, lock and unlock elements; brand template locks). This matches the build sheet's L and P levels exactly. Its O level ("owner-only") is plain Lock.
- Brand template locks for a team are a separate, paid-plan feature (R2 covers which plan).

### Evidence gaps

- **No live import test.** How these five PDFs come into Canva (boxes per line, gradients, fonts) is inferred, not observed. Precedence rule 2: a two-minute probe outranks everything here.
- **The connector's tool list** comes from a third-party aggregator, and the edit operations from a mirror of Canva's skill; neither was checked against an official Canva list. Canva's own setup page links to an "Actions you can take" page I didn't reach.
- Whether the connector's edits respect "Lock position only" (the Canva AI caveat suggests not; unverified).
- Whether a private Connect API integration needs review before its creator can use it; the exact OAuth scopes.
- Claude in Chrome's reliability in Canva's editor: no source.
- Alex's Canva plan: not read (account data).
- Whether a PDF dropped into an already-open design imports as editable pages or only as an upload. That matters for keeping Canva's home page off camera.

---

## (c) Recommendations: evidence plus options

Every call here is Alex's. Each option names what it costs him and what it leaves undone.

### C1. Keep the 16:45 sign-off independent of Canva (no change needed)
S-D6's sign-off gate already "embeds every export ... with no Canva link" (run step 13). The exports exist (E1). The gate can go out as soon as S-D6 writes it, whatever the route. The decision is only whether DoD-16's "templates exist in Canva" is met today or in the morning.

### C2. The route into Canva for today

| Option | What happens | Alex's time | Reaches 17:05? | Loses |
| --- | --- | --- | --- | --- |
| **A. Alex imports by hand, off camera** | After the sign-off, with the recording paused, he imports the five PDFs (Canva's import file flow) into one folder. A session, or he, sets the locks per build sheet §7 | About 5 min import + about 10 min locks (estimate) | Likely, if done 17:00–17:10 | Agent-made claim for the import step; his time (P3) |
| **B. The import is the scene** | At 17:15, on camera, he imports the carousel PDF, locks the brand elements (Lock / Lock position only), fills it with an S-D7 post and exports. The video shows code-built templates becoming locked Canva templates | The scene itself (planned anyway) | Not needed: nothing has to exist before 17:15 | Risk of an import surprise on camera; DoD-16's other four templates wait for the morning or for option A |
| **C. Claude in Chrome** | S-D6 uploads the PDFs and sets the locks in its own tab, on the 4K monitor, while he does the sign-off | Allow canva.com in the extension; handle any login prompt | Possible; reliability unknown (E5) | Only one Chrome-driving session at a time on Windows; may stall on a login or a menu and need him |
| **D. Canva connector** | Add it for filling and exporting later, not for importing | About 2 min + a fork | No | Can't import local files or lock (E3); importing via URL means publishing the files first |
| **E. Connect API** | Not today | 15–20 min (estimate) + credentials | No | Preview API, OAuth set-up, review question open (E4) |

The evidence favours A or B for today, with C as a hands-off attempt if Alex would rather not touch Canva before the scene. D is worth adding later, for the morning cleanup's fill-and-export work.

### C3. Probe before choosing (about 2 minutes, by Alex or a Chrome session)
Import the smallest file, the quote card PDF (46 KB), into a fresh design and check four things. (1) Is each text slot one editable box, or one box per line? (2) Do the fonts keep their names, with no missing-font warning? (3) Are the gradient words and numbers editable text, solid text or flattened? (4) Is "Lock position only" in the lock menu? If (1) fails, the import gives pictures of templates, and the honest route is to rebuild the text slots in the editor from the build sheet (spec methodology step 3 already allows this). If (3) fails, the build sheet's solid-accent fallback applies.

### C4. Fill before you lock
If any agent fills the templates (Chrome or the connector), have it fill them first and lock them last, or test one locked slot first. Canva's own help says AI edits may not update content inside an element set to "Lock position only" (E3).

### C5. S-D10 has nobody to start it before 17:05
As written, S-D10's intake waits on S-D6's, its session waits on its intake, and its defaults wait for 18:00 (E1). Options for Alex, through `orchestration`:
- **(a)** Release S-D6's and S-D10's intakes together now. They already share the 16:45 slot logic.
- **(b)** Take S-D10's option B, 17:30–17:55, which gives the import step 25 more minutes and leaves almost no retake time.
- **(c)** Under option B in C2, the scene brief is short and S-D6 can write it, since there's no link to wait for.
- **(d)** Let the scene move to the morning cleanup session (S-D10's own 18:00 default).

### C6. Screen care inside the editor (inference; check on the day)
Opening the design by link keeps Canva's home page off camera. But the editor's left panel has tabs (Projects, Uploads, Brand) that list content from across the account. Under option B, any file dialog for the import should open on the 4K monitor or with the recording paused. S-D10's checklist could add: "don't open Projects, Uploads or Brand in the side panel on camera". The frame-by-frame check (S-D10 methodology step 4) is the backstop.

### C7. For S-D6's spec-draft gate, in plain words
Say that the import route rests on an untested assumption ("PDF import keeps live, editable text") until C3's probe runs, and that the connector, which the intake recommends as option A, can't lock or import local files. That may change Alex's answer to the intake's first question.

---

## Sources

- Canva Help Center, *Import and edit PDFs* (limits, editable elements, font substitution, layout shift): https://www.canva.com/help/pdf-import/
- Canva Help Center, *Lock and unlock elements*: https://www.canva.com/help/lock-and-unlock-elements/
- Canva Help Center, *Apply locks to Brand Templates* (Lock vs Lock position only; the Canva AI caveat): https://www.canva.com/help/brand-template-locks/
- Canva Help Center, *Set up the Canva AI Connector* (plans, capabilities): https://www.canva.com/help/mcp-agent-setup/ (redirected from https://www.canva.dev/docs/connect/canva-mcp-server-setup)
- Canva Help Center, *Connect Claude to Canva*: https://www.canva.com/help/connect-claude-to-canva/
- Canva Developers, *Create design import job* (Connect API, binary body, PDF, preview status): https://www.canva.dev/docs/connect/api-reference/design-imports/create-design-import-job/
- Canva Developers, *Create URL import job*: https://www.canva.dev/docs/connect/api-reference/design-imports/create-url-import-job/
- Canva Developers, *Authentication* (OAuth 2.0 with PKCE): https://www.canva.dev/docs/connect/authentication
- Canva Developers, *Quickstart* (127.0.0.1 redirect): https://canva.dev/docs/connect/quickstart
- Canva Developers, *Canva MCP* overview: https://canva.dev/docs/mcp/
- Composio, *Canva MCP toolkit for Claude Cowork* (third-party list of 33 connector tools): https://composio.dev/toolkits/canva_mcp/framework/claude-cowork
- claudeskills.info, mirror of Canva's own skill `canva-sdks/canva-skills/canva-edit-design` (edit operations and the "cannot do" list): https://claudeskills.info/skills/canva-sdks/canva-skills/canva-edit-design/
- growthmethod.com, *Canva MCP server* (third-party; conflicting plan claim, outranked by Canva's page): https://growthmethod.com/canva-mcp-server/
- eseospace.com, *Canva MCP server* review (third-party; tool count, plan notes): https://eseospace.com/blog/canva-mcp-server/
- pixeltinkers.com, *Figma to Canva: what to expect* (indirect: gradient rasterisation on a different import path): https://pixeltinkers.com/apps/figma-to-canva/what-to-expect
- Claude Code docs, *Use Claude Code with Chrome* (file uploads and 10 MB cap, visible window, login pauses, Windows named-pipe conflict, reconnect): https://code.claude.com/docs/en/chrome
- Local, read only: `CHARTER.md`; `research\lists\L-05-brand-assets.md`; `research\DIRECTORY.md`; `canva-templates\SPEC.md`, `BUILD-SHEET.md`, `BUILD-NOTES.md`; `linkedin-content\SPEC.md`; `canva-video\SPEC.md`; the `Operator tasks\` listing and three `SESSIONS.md` rows at 16:32; file names and sizes in `canva-templates\local\` (contents not opened); one named key in `~\.claude.json`.
