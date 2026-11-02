# canva-video: status
As of 20:01, 2 Nov (Prague), written from the folder's own records after the 19:4x crash.

## Where it fits in the plan

**Deliverables:**
- D10, Canva design video: a recording of Alex designing in Canva near the end of the day. Spec row S-D10.
- D11, brand motion demo with Comfy: an ideas Doc for Alex to pick from, then a 5-second animation of one Addvery LinkedIn graphic and a one-minute brand video, both made by him with Comfy and shown as a GTM demo entry. Spec row S-D11, run from this folder with no session of its own (C15).

The session for both is `s-d10-canva-video` (last id da2b38ac), down since the crash.

**DoD items it claims**

| Id | What it asks | State | Evidence |
| --- | --- | --- | --- |
| DoD-21 | A recording of Alex designing in Canva, made near the end, is on the site | Not met | The scene brief Doc has been ready since 18:05, but the scene hasn't been filmed. No filed rig session (S01 to S14, the last ended 19:09) has "Canva design starts now" in its transcript. `out\` is empty. `site\d10.md` is a draft (`kind: "showcase"`). |
| DoD-23 | The chosen 5-second animation and a one-minute brand video, both made with Comfy, are on the site as a GTM demo entry | Not met | The ideas Doc has been waiting on Alex's pick since 17:36. There's no `comfy-motion\PICK.md`, nothing has been generated, and `site\d11.md` is a draft. |

**It also serves DoD-22** (nothing published leaks). Both entries keep the client of Alex's earlier brand film unnamed (SPEC §9, 18:47), and the figures are git-ignored. It reads DoD-16 (S-D6's templates) and DoD-17 (S-D7's posts, the source of the quote card's copy).

**Depends on:**
- S-D6's asset pack in `..\canva-templates\local\asset-pack\`, ready since about 18:00, and its backdrops and graphics for D11.
- S-D7's signed-off post copy, for the quote. That sign-off is still open.
- The OBS rig, to record and file the scene.
- S-D9 (`s-d9-legibility`), to cut the clip.
- `website`, to upload to YouTube and add the entries.
- `orch-site-map`'s placement (SM-1, 18:58): each entry in `/demos/<slug>`, nowhere else.
- Alex's own Comfy setup.

Every one of those sessions is down too.

**What depends on it:** two entries in the site's GTM demos list, and the site's `/d10` and `/d11` pages, which show "lands here once" text until then.

## What it was trying to do

It prepares the scene, gets the clip, cuts it safely and hands it to the site. The scene doesn't fill a finished template. Alex builds one Addvery quote card himself in a fresh Canva design, from S-D6's asset pack: "Give me all the assets I need to build it myself" (DI-10 A10.9). The video is a screen recording with a small webcam inset, at most 15 minutes, checked frame by frame for anything private before it goes on YouTube, unlisted. For D11, Alex asked only for ideas: "I just need some brainstorming of what ideas I can do", "to show that it's possible to add some energy to the brand through video generation" (A10.11). He runs Comfy himself. The session generates nothing and spends no credits.

## What's been made

| Item | Where | State |
| --- | --- | --- |
| Spec, with decision log to 18:47 and the S-D11 plan (B1 to B7) | `canva-video\SPEC.md` | done |
| Handoff, with notes to about 19:00 | `canva-video\HANDOFF.md` | done, commit c448244 at 18:58 |
| Scene brief source: off-camera list (15 items), on-camera steps, report | `canva-video\SCENE.md` | done, filled from `READY S-D6` at 18:05 and sizes corrected to Canva points at 18:10 |
| Scene brief Doc (the brief from "What this is" to "When you are done", Step 1 as a checklist) | https://claude.ai/artifact/PDEnN7CTEGG94QVXkWohCW | live, waiting on Alex's "filming now" and report comments |
| Comfy ideas: 7 ideas (4 for the 5-second post, 3 for the minute), picks, gaps, sources | `canva-video\comfy-motion\IDEAS.md` | done |
| Comfy ideas Doc | https://claude.ai/artifact/SWcsiYUQpJUkZ18mQA2sWj | live, waiting on Alex's pick |
| D10 entry, "Building an Addvery quote card in Canva, by hand" | `canva-video\site\d10.md` | draft (`kind: "showcase"`, video and summary slots); passes `validate.py` |
| D11 entry, "Adding energy to Addvery's brand with motion" | `canva-video\site\d11.md` | draft (showcase, video and summary slots, one `[Alex: ...]` note for his pick); passes `validate.py` |
| D10 entry figure (the quote card in Canva's fonts) | `canva-video\site\assets\building-an-addvery-quote-card-in-canva-by-hand\` (1 PNG, 74 KB, git-ignored) | done |
| D11 entry figure (the event teaser, for the recommended idea) | `canva-video\site\assets\adding-energy-to-addverys-brand-with-motion\` (1 PNG, 76 KB, git-ignored) | done; it changes if Alex picks an idea on another graphic |
| Doc link files | `canva-video\local\` (2 MD, git-ignored) | done |
| His pick | `canva-video\comfy-motion\PICK.md` | planned only |
| The scene recording | a rig session | planned only |
| The clip, the cut with the webcam inset, the frame check | `canva-video\out\` (empty, git-ignored) | planned only |
| The 5-second animation and the one-minute video | wherever Alex makes them; never committed | planned only |
| YouTube uploads and the two `/demos/<slug>` entries | the live site | planned only |
| The site's D10 and D11 pages and status lines | `..\website\content\deliverables.json`, `build.json` (website's files) | placeholder text; the D10 status line ("once the templates are in Canva") is out of date |

The scene's inputs live in S-D6's folder: `..\canva-templates\local\asset-pack\BUILD-quote-card.md`, its mockups and its two images.

## How far along

About 30%. All the preparation is done: both Docs, the brief and both entries, pre-built. But neither video exists, and what's left is mostly Alex's: the recording and the Comfy work. After that come the clip, the cut, the check and the upload.

"Done" here means: the Canva video recorded, cut, checked and live as its own `/demos` entry; Alex's two Comfy videos made, checked and live in the D11 entry.

## What's left for Alex

1. **Film the Canva design video.** Follow the brief: https://claude.ai/artifact/PDEnN7CTEGG94QVXkWohCW. Build from `..\canva-templates\local\asset-pack\BUILD-quote-card.md` on the 4K monitor. About 20 minutes: 5 minutes of setup with the recording paused, then 10 to 12 minutes on camera, 15 at most. It can run with few other processes open: OBS, one Chrome window on Canva and the sheet. No assistant should be driving Chrome and no Canva MCP processes should be running. Before filming, two corrections apply. The sheet's step 10 lock method is out of date: use the page lock "Only allow replacing content" (see Open questions). The gradient's Plan A works. **Recording.**
2. **Pick the Comfy ideas.** Comment two numbers on the ideas Doc: one 5-second idea (1 to 4) and one minute idea (5 to 7). The recommendation is 1 (Glass panel) and 5 (Five posts, one light). https://claude.ai/artifact/SWcsiYUQpJUkZ18mQA2sWj. About 1 minute. **Quick.**
3. **Make the 5-second animation in Comfy, by hand.** It animates a text-free backdrop from `..\canva-templates\local\canva\backdrops\`, and the sharp text goes back on top afterwards. Idea 1 is one still pair and one clip (`comfy-motion\IDEAS.md`). Time unknown; the records give none. OBS off. **Attended design.**
4. **Make the one-minute brand video in Comfy.** Idea 5 plans about 20 to 25 stills, with 1 to 1.5 s clips plus holds. Time unknown; it's the largest item left. Choose its frame first: 16:9 for the site, square or 4:5 for the feed. OBS off. **Attended design.**
5. **Say where the two finished videos are,** as a comment on the ideas Doc or to whoever is attending. **Quick.**
6. **Review both entries' words** at the summary pass. That covers the "What the video shows" and "What the videos show" sections, the "[Alex: ...]" line in `site\d11.md`, and the past-tense rewrite around your picks. About 10 minutes each (estimate). **Attended copy.**

## What's left for an assistant

1. **Fix the scene's lock step before filming.** Bring step 10 of the quote card sheet up to the 18:55 page-lock model (`..\canva-templates\SPEC.md` §9, 18:55 row). Note in the brief Doc that the gradient's Plan A works, since the brief still says it "hasn't been tried in Canva yet" (`SCENE.md` Step 2 item 3).
2. **After the scene, find and cut the clip.** Wait for the rig to file the session (`..\OBS\Processed\index.json`). Cut the screen and webcam clips from the last "Canva design starts now" to "Canva design done". SPEC run step 6. `s-d9-legibility` used to do this, and it's down.
3. **Make the cut.** Use ffmpeg: the screen full frame with the webcam as a small corner inset, at most 15 minutes, written to `out\`. Load `frontend-design:frontend-design` first, then run `design:design-critique` and `design:accessibility-review` on the cut and the still. SPEC methodology step 3, run step 7.
4. **Check the cut for screen care,** using a subagent that didn't make it. It looks at a frame at every scene change and at least every 5 seconds, against SPEC §5's list. SPEC methodology step 4, run step 8.
5. **Draft the D10 summary from the transcript** for Alex's review. Flip `site\d10.md` to `kind: "video"` with the YouTube id, as its slot comment says. Upload to YouTube, unlisted, and add the entry at `/demos/<slug>`, copying the figure to `..\website\public\demos-assets\<slug>\`. SPEC run step 9. `website` used to do this, and it's down.
6. **Record his pick** verbatim in `comfy-motion\PICK.md`. Swap the D11 figure if his 5-second idea is on another graphic (the slot comment in `site\d11.md`). SPEC B3.
7. **Check the two Comfy videos** with a subagent that didn't make them: a frame every second of the 5-second clip and every 5 seconds of the minute. It looks for smeared lettering, a wrong logo and anything under DoD-22. Then run the design critique and the accessibility review. SPEC B5.
8. **Publish the Comfy videos and the D11 entry.** Upload both to YouTube, unlisted. Fill the D11 entry, with the 5-second clip as its video and the minute as a `[!video]` block. SPEC B6.
9. **Check the quote's line against S-D7's signed-off post** ("Agreeing the number tends to take an hour. ...") once that sign-off lands (HANDOFF, 19:00 note).

## Open questions and risks

- **Nobody watches the two Docs.** The scene brief's "filming now" and report comments, and the Comfy pick, were meant to reach this session and `orch-alex-prep`. Both are down. Comments left now reach no one until someone reads the Docs.
- **The quote card sheet's lock step is wrong.** Step 10 says "Lock position only" for the text boxes. `s-d6-canva-templates` found at 18:55 that this model doesn't exist in Canva's current menus, and that an element lock blocks text editing. Alex's brief follows the sheet ("then the locks"). `site\d10.md` repeats the claim ("locked in position only").
- **The records disagree on the gradient.** `SCENE.md`, the brief and `site\d10.md` say the gradient on "real commitment" is untried or may need Plan B. S-D6's HANDOFF says Plan A works.
- **The rig skills are down.** The brief relies on `/start`, `/pause`, `/stop` and `/process`, which are the `rig` session's skills, and that session is down. How Alex pauses and files the recording now is unclear.
- **The 15-minute cap may no longer apply.** It comes from YouTube's limit for unverified channels. A git-ignored record says long uploads have worked since 18:35. Whether Alex still wants the 15-minute cap is unclear.
- **Comfy load.** The crash came from CPU and GPU overload. The ideas' notes price Comfy Cloud credits, but whether Alex runs Comfy locally or in the Cloud isn't recorded. The price of a Wan clip is unknown (IDEAS gaps), so a 40-clip minute should be estimated first.
- **Half-done at the crash.** Nothing was in flight in Canva, since this session never opens it. Session da2b38ac ran from its 18:58 commit to the crash with no record. The roster row still shows only the 17:34 handoff.
- **Placement is unclear.** SM-1 puts D10 and D11 in `/demos` "and nowhere else", but the site also has `/d10` and `/d11` deliverable pages with placeholder text. How the two relate isn't recorded.
- **Brand values in a tracked file.** `SCENE.md` (tracked) holds one hex value, and `SCENE.md` and `site\d10.md` name the Canva library font. The project's C09 rule keeps brand values out of tracked files. These aren't secrets, so DoD-22 isn't touched.
- **SPEC §1 is out of date.** It still says the scene happens "once the templates are in Canva". Since Q10.9 the scene is a fresh design built from the pack, and the brief says to film "whenever it suits you tonight".

## Sources

- `canva-video\CLAUDE.md`, `SPEC.md` (with §9 decision log and the S-D11 section), `HANDOFF.md`, `SCENE.md`, `comfy-motion\IDEAS.md`, `site\d10.md`, `site\d11.md`, `.gitignore`, `local\comfy-doc.md`, `local\doc.md`; file counts and sizes per folder
- `..\canva-templates\HANDOFF.md`, `SPEC.md` §9 (18:25 to 19:00 rows), `local\canva-build-log.md`, and the lock and gradient lines of `local\asset-pack\BUILD-quote-card.md`
- `..\CHARTER.md`: D10 and D11 rows, DoD-21, DoD-23, Spec outline, Run order, operator scenes
- `..\SESSIONS.md` (S-D10 row), `..\answer-desk\queue.md` (the two S-D10 TASKs, 17:36 and 18:05), `..\Operator tasks\Archive\Decide - everything left that needs you.md` (A10.9, A10.11)
- `..\site-map\DECISIONS.md` (SM-1), `..\website\content\deliverables.json` and `build.json` (D10, D11 lines), `..\OBS\Processed\index.json` and the S01 to S14 transcripts (searched for the cue)
- `..\Open tasks.md` (git-ignored; status only)
- Commits: c448244 (18:58), 20b03df (18:57), 6d50af9 (18:57), 39aad0f (18:54), 47fbb1e, bf4caa9, 2751d43, 661c643, 0cffaa1, f97cbb8, 6c24f1c (17:36), 47ce139, 0747019, 3a389e4, ca14ab0, f56dabd, 089d783, 6429039, 5eca0ab, 1f77dc1, 92c62be; `git log --oneline -50 -- canva-templates canva-video`
