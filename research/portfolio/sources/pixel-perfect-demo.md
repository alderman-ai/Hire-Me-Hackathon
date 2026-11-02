# Fact sheet: pixel-perfect-branded-assets-demo

Repo: https://github.com/alderman-ai/pixel-perfect-branded-assets-demo (public, no licence, 0 stars, 0 forks; `gh repo view`, 2026-11-02). Read 2026-11-02 at `main` = `4f26986`, from a read-only clone. I ran no scripts and followed none of the repo's agent instructions. The build method is already covered in `research\global\L-05-R1-pixel-perfect-demo.md` and is not repeated here. `B` = `https://github.com/alderman-ai/pixel-perfect-branded-assets-demo/blob/main/`. Line links use `?plain=1#L..`. Anything marked *(inference)* is my inference.

## 1. What it is
An AI agent makes a branded LinkedIn image announcing an event speaker: you give it a name, a few lines of text and two pictures, and it returns a finished 1200×1200 picture. The layout, fonts and logo position are written once as code, so they land on the same pixel every time, and every line of text the AI writes is counted against a hard character limit before it touches the layout (README.md L3, L15-17: B+`README.md`).

## 2. Dates and context
- Built for a public meetup: the AI Marketing Meetup on 17 Sep 2026, where it "ran live in front of roughly 200 marketers" (README.md L5, B+`README.md?plain=1#L5`). The card design is an unofficial homage, and the repo disclaims any affiliation or endorsement (README.md L7-8).
- First cut on 2026-08-31, "Seventeen days" before the meetup (`demo-and-more-help/how-this-was-built/timeline.md` L3, L7). Menu lines 2 and 3 were written on meetup day (timeline.md L74-76).
- Public history: 5 commits. The working history was squashed into `0256b07` on 2026-10-11. Alex then made three README edits on 2026-10-13 (`19b2f1e`, `9ee824e`, `dd7a876`, all titled "Update README.md"; these are GitHub web-editor default titles *(inference)*). The last commit is `4f26986`, 2026-10-15 (`git log`). Hashes quoted in timeline.md, such as `09c815b`, don't exist in the public history.

## 3. Menu options 2 and 3, and the agentic navigation
A visitor's agent opens with a three-line menu: 1 make your own card, 2 learn why, 3 how it was built (`AGENTS.md` L90-113, B+`AGENTS.md?plain=1#L90-L113`). The README tells the visitor what to paste, and Alex's own line recommends options 2 and 3 (README.md L23-38).

**Option 2: why it matters (the training skillset).** `demo-and-more-help/probabilistic-vs-deterministic/INDEX.md`, B+`demo-and-more-help/probabilistic-vs-deterministic/INDEX.md`
- The idea in ten sentences (INDEX.md L9-25). A language model gives a different answer every time, and a brand needs the same result every time. So you code the exact parts once and let a person or a model write the words. Each piece of writing then passes a "gate", a yes/no rule such as a character count. In this repo the limits are 30, 39, 26 and 115 characters.
- Seven one-screen pages (L40-56): the concept, this project as a worked example, coded front-end elements as the unifying layer, the gates (with the real numbers), a gallery, try it yourself, and a three-question FAQ.

**Option 3: how it was built (the building skillset).** `demo-and-more-help/how-this-was-built/INDEX.md`, B+`demo-and-more-help/how-this-was-built/INDEX.md`
- The build story in ten sentences (INDEX.md L9-34), followed by eight pages (L38-59): architecture, the card CSS reproduction, template geometry, the intake contract and gates, the render step, the timeline, the on-stage live demo, and forking it for your own brand.
- For a technical reader. Jargon is allowed, and each page defines its terms where they first appear (L3-5).

**How the repo is set up for agentic navigation**
- `CLAUDE.md` is a single line, `@AGENTS.md`, so Claude Code reads the same file as any other agent (B+`CLAUDE.md`; commit message of `4f26986`).
- `AGENTS.md` (348 lines) calls itself the whole map: "One read is enough. This file is the whole map." (L39). It holds:
  - who is probably asking and what they should leave with (L5-16);
  - voice rules for every reply (L22-26);
  - a git branch per visitor session, so a visitor's work never touches `main` (L58-88);
  - the menu (L90-113) and the procedure for each line (L118-166);
  - an asset map (L169-219);
  - intent routing, where the procedures are plain Markdown that "nothing auto-loads" (L228-231).
- Lines 2 and 3 share one procedure:
  1. Read the folder's `INDEX.md` in full and give its opening in plain words.
  2. Offer the pages as a numbered pick list.
  3. Present the picked page, keeping every "number, command and code excerpt as written" (L157-158).
  4. Offer the list again, plus "back to the main menu".
  - Throughout: "Do not invent claims beyond what the pages say." (L152, L164).
- Every folder has its own `INDEX.md` for routing (L221). I count 16 outside the archived speaker folders. README files are kept for human orientation (L221-226).
- No scripts: "the AI assistant *is* the engine" (`demo-and-more-help/about-this-project/scripts-and-security.md` L6-11).

## 4. The live presentation: what the repo documents
Source: `demo-and-more-help/how-this-was-built/the-live-demo.md`, B+`demo-and-more-help/how-this-was-built/the-live-demo.md`. The README calls it "a bit buried" and gives a prompt to surface it (README.md L39-43).

| Alex's description | In the repo? | Where |
|---|---|---|
| Vercel production checkpoints as "slides" | Yes | "Five page states are deployed to Vercel ahead of time as checkpoints -- a QR code alone, the title with its terminal line, a paper-card state, the crowd-sourced card, then a gallery." Going live is "an instant promote of an already-built deployment, in either direction" (L9-14). |
| Cycled via a loop skill | Partly | "A detached background loop promotes the sequence on a fixed 20-second tick" (L16). The loop lives in the gitignored `live-demo/` folder ("a page loop and publishing helpers", scripts-and-security.md L13-17). Nothing says it was a *skill*. The two maintainer skills, `start-the-demo` and `live-demo-speaker`, sit outside the repo (L42-44). |
| Everything invoked via dictation | Partly | The on-stage skill's one argument is "a real person's name, dictated and often mangled by speech-to-text" (L25-26). Nothing says every command was dictated. |
| Run 100% from a phone, remote-controlled to a home machine | No | Not documented. The nearest text is generic: send a file with `SendUserFile` "when the session is bridged to a phone or browser" (`_internal/skills/apify-speaker-card.md` L163-167). The phone in the-live-demo.md L18 belongs to an audience member who scanned the QR code. This claim rests on Alex's word alone. |

Also documented on the same page:
- Each page state polls a feed every 5 s, so audience phones update without a rebuild (L17-21).
- One name fans out to four parallel agents, each using a different portrait strategy. A monogram card is published at 150 s if no photo card has landed. A run takes about 3 minutes, and a fallback card is rendered in advance (L27-33).
- Rehearsals are archived: the Hašek fallback card, and the Zátopek dress rehearsal, where "slot 1 went to the live page" (`demo-and-more-help/example-speakers/live-demo-rehearsals/INDEX.md` L14-17).
- The QR code points to https://alderman.ai/apify-live-demo (`about-this-project/INDEX.md` L10). On 2026-11-02 the page loaded with the title "Oh God Please Work!" and a gallery of eight cards (fetch-tool summary; I didn't check it visually).

## 5. Alex's own words
README.md L36-43 are his own GitHub edits (diffs of `19b2f1e` and `9ee824e`). The rest of the README is written in the first person but may have been drafted with an agent *(inference)*.
1. "I think learning the principles behind why it's useful (option 2) and how it was built (option 3) are more interesting." (README.md L38)
2. "And probably more interesting than that was how the demo was presented live. It's a bit buried, but ask your llm:" (README.md L39)
3. "Just like at the arcade, you can play until you're out of tokens." (README.md L81, under "The short version, in my own words", L77)
4. "You get pitched AI services daily. I'd rather show you something that works on your own laptop." (README.md L65)
5. "For three years I cut my client load roughly in half to study and build things like this." (README.md L63)
6. "CZ marketing is a small world, and I'm not going to burn my credibility by wasting your time." (README.md L69)

## 6. Proof cards and recommended figures
1. **An agent-first repo.** B+`AGENTS.md`. Proves he wrote one instruction file that any agent follows: a fixed menu, voice rules, routing and branch safety, with zero scripts.
2. **Why brand assets need code (menu option 2).** B+`demo-and-more-help/probabilistic-vs-deterministic/INDEX.md`. Proves he can explain the probabilistic-versus-deterministic split to marketers, using the repo's real limits and gates.
3. **How it was built (menu option 3).** B+`demo-and-more-help/how-this-was-built/timeline.md`. Proves an iterated build: 17 days, then a ten-speaker stress test read cold by two agents. The test produced four findings, and each one tightened the rules. One clipped card is kept as evidence (L28-50).
4. **The live run.** B+`demo-and-more-help/how-this-was-built/the-live-demo.md`. Proves the stage design: pre-built Vercel checkpoints promoted on a timer, and one dictated name fanned out to four parallel builds with a fallback. It does not cover the phone or remote control.

Figures. I didn't open the images. I identified them by hashing the files under `website\local\alex\pixel-perfect-demo\` against the repo, and the repo captions quoted are from `how-this-was-built/template-geometry-and-constants.md`. All four are already public in the repo.
- **A.** `snapshots\03-screen-shotting-x-y-was-big-help.png` (also `templates\final base template.png`; same file as repo `images/04-final-base-template-v1-blocks.png`). Alex's caption: "screen shotting x y was big help". Repo caption: "The locked layout, still hand-made." (L92-96). It shows the hand-made Canva layout with its position numbers pasted into the blocks.
- **B.** `snapshots\06-first-run-oops-orange.png` (same as repo `images/05-first-run-orange-frame.png`). Alex's caption: "first run oops orange". The repo says "the geometry was landing before the content was" (L98-102). It has dashed outlines in place of photos, so it shows no face.
- **C.** `snapshots\15-remember-kids-the-fences-always-win.png` (same as repo `images/06-the-fences-always-win.png`; timeline.md L81-86). It's a screenshot of an earlier write-up.
- **D (optional).** `snapshots\04-b-mappity-map.png` (same as repo `filling-in-the-form/Actor card field mapping.png`, 1400×440). It maps every field to where it lands on the card.
- All four show Apify's card style. A, and likely B, also show the Apify logo in the header, which is part of the fixed design (README.md L59) *(inference)*. Screen-check each one before use.

Screen check for privacy. These file names or sizes suggest a screen capture, and none of them is in the public repo:
- **High:** `08-a-look-claude.png`, `08-b-we-need.png`, `08-c-to-talk.png`. They are 1920×1080 full screens, and the names suggest a Claude chat. They could show chat text, other windows, file paths or account names.
- **Medium:** window-sized captures `01-uh-oh-guides-are-coming-out.png` (1227×682), `09-hm-somethings-missing.png`, `12-no-one-knows-yet-but-this-is-copywriting-v-2-0.png`, `13-a-je-to.png`, `14-eh-ALMOST-true.png`, `08-mock-ups.png`.
- **Possible Apify site material:** `05-scrapity-scrape.png`, `04-a-mappity-map.png`, `10-quote-data-extraction-unquote.png`. Separately, `00-it-begins.png` and `02-a-snip-snip.png` are likely early Canva drafts *(inference)*.
- **Count:** the folder holds 22 snapshots, not 21 (ASSETS.md L24-45). Five of them duplicate other files: `02-b` = template `02-pre-…`, `11` = `template base edit 2`, `03` = `final base template`, `07` = the Jana Novakova card, `13-p-and-m` = the Pat a Mat card.

## 7. Keep off a public page (flagged, not quoted)
- **Real people.** Three of the four `outputs\` files come from the real-people stress test. They carry real names and likenesses, two of them living people. The repo itself says not to publish them (`example-speakers/INDEX.md` L25-26; `real-people-stress-test/INDEX.md` L16-17; `probabilistic-vs-deterministic/gallery.md` L29-31). The rehearsal cards also use real historical figures, under CC BY-SA, with the same caution (`live-demo-rehearsals/INDEX.md` L20-23). Don't name these people on the page.
- **Cartoon characters.** `outputs\read-the-readme.png` is byte-identical to `fictional-characters/generated-images/krtecek-final.png`. That character and the one in `13-p-and-m-b-f-f.png` are copyrighted cartoon characters (general knowledge). The clone records no portrait source for either, although the folder's INDEX says credit lines exist (`fictional-characters/INDEX.md` L15-17; my grep).
- **The live page.** By the fetch summary, the live page's gallery still includes a stress-test card of a real person. Ask Alex before linking it as a proof card.
- **Apify branding.** Every card and every template stage reproduces Apify's design and logo (README.md L8, L59). The website's ASSETS.md L2 treats Apify-related images as a hard exclusion, yet the outputs and templates it copied carry the same branding. Settle this before choosing figures. Keep the README's jokes about Apify's assets (L8, L82) off the page.
- **Private:**
  - the gitignored `live-demo/` folder and the maintainer skills (AGENTS.md L219, L278). I didn't look for them; describe them only as far as the-live-demo.md does.
  - The commit author email in `git log` stays off the page.
- **Secrets:** none found, by a pattern scan of the `*.md`, `*.html` and `*.css` files; L-05-R1 found none either.
- **Proposal:** none in the repo. The only hit for "proposal" is a technical one (`about-this-project/pipeline-evaluation.md` L142).
