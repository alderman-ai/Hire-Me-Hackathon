# L-03 synthesis

2 Nov 2026, about 17:35 Prague
session s1-research subagent
synthesis of 10 reports on list L-03 (blog)

Readers: S-D5 (`s-d5-blog-articles`) only. S-D4 is retired (Alex, 16:48: "Anything about blog pipelines is dead. The only deliverable is blogs."), and its kit in `blog-pipeline\` is S-D5's now. Where a report advised the pipeline, its advice is translated below into what S-D5 does with the kit. Serves DoD-15 (two posts live, each from a dictation and finished by Alex) and DoD-5 (the synthesis step).

## Tonight, in five lines

1. **Article 1 (always a managed service; the AI-skill slider):** keep `briefs\A-01-base.md`. Add W3's two against-interest talking prompts (the strongest objection and his answer; when a company should train its own people and hire nobody). Offer the narrower claim the evidence backs ("someone always has to maintain it"). Land on the inside-maintainer rung. Put only the vendor-document facts in front of him (R6 facts 1–3 and 5).
2. **Article 2 (GTM engineers; AI has to pay through revenue):** turn `briefs\A-02-outline.md` into a base from R7 now. Alex has to answer two objections aloud: "GTM engineering is sold as an SDR replacement" and MIT's "the returns are in the back office". Offer the conditional framing (R7-A 2). Check every snippet-only figure before it can reach a post.
3. **Skill:** set `marketing:content-creation` as `{SKILL}` for stages 3 to 6. The v0.2 prompts already block without a skill and override it on voice and claims. Add one fresh `marketing:brand-review` pass, briefed as a sceptical agency leader, after stage 5. No humanizer tonight. Each draft goes into a Claude Doc (copy skill first, then `anthropic-skills:docs`), and Alex's comment there is the sign-off.
4. **Visuals:** keep the backdrop, slot map and measured-budget method (L-05 R1) and the six mockups. Re-skin them from the website's Addvery kit under `frontend-design`, run `design:design-critique` and `design:accessibility-review`, and skip ComfyUI. The text on them is redone from each finished post, and the slider is drawn the way Alex dictates it.
5. **Post page:** send `BUILD S-D5-B1` now: a site template, not Claude Design. Ask for a complete per-post `openGraph` (the post's own URL and title, type `article`) and the cover-drawn `og:image`, using S-D5's measured slot budgets so an overlong title fails the build. After `BUILT`, curl the page head before any post link is shared anywhere.

## Method

- **What I read:** `CHARTER.md`; `research\lists\L-03-blog.md` (Alex's OT-04 note and the R7 line); `blog-articles\SPEC.md` and `HANDOFF.md` (17:15); the reset rules at the top of `answer-desk\ASKING.md`; all ten L-03 reports in full; `L-01-synthesis.md` and `L-05-R1-pixel-perfect-demo.md`. I also ran a read-only grep on `blog-pipeline\prompts\` and `POST-FORMAT.md` §5 to confirm the overriding facts below. No new web research.
- **Facts that override W1 and W2** (S-D4's report to the brief, confirmed in the files):
  - prompts 3 to 6 (v0.2) each name a `{SKILL}`, and return `BLOCKED` when it's empty or won't load;
  - `blog-pipeline\dictations\` was watched every 5 minutes;
  - `POST-FORMAT.md` v1.1 §5 asks for a canonical URL, Article JSON-LD and a per-post `og:image` drawn from the cover.
- **Alex's 17:00 reset rules** (`ASKING.md`) outrank the older text in the reports and in S-D5's SPEC: easy calls are the session's own, decided and logged; no plan approvals; written work goes in Claude Docs; design work needs a design skill; there's one brand source; there's no 18:00 cut-off.
- **Precedence**, as in L-01: Alex's directives, then this synthesis between reports, then a live probe over literature on a tool's behaviour (W2 probed the site at 16:38).
- **Independence.** Where reports share a source, it's counted once. R1 and W1 both cite Anthropic's skills and subagent docs. R6 and R7 both cite MIT NANDA via Fortune. R4 and W3 both use Edelman-LinkedIn.
- **Tags:** **assistant-actionable** (S-D5 decides and logs it, per reset rule 1), **operator decision** (only Alex can make it), **verify first**.
- **Scope:** nothing about Addvery. I didn't open `Addvery Research\`, the Apify proposal, `hi-apify`, any GetSales data or the brand kit's contents.

## Convergences

**Strong:** three or more reports from separate evidence bases, at least one primary or peer-reviewed. **Moderate:** two reports, or overlapping or practitioner sources.

1. **Reuse his spoken words, trace every claim, and invent nothing.** *Strong.*
   - R1 bases this on Anthropic's quote-first guidance, Grain and Rev, and two peer-reviewed findings: LLMs imitate blog style poorly (Wang 2025), and LLM polishing flattens style by 21 to 50% (Sourati 2026).
   - R3: clean the transcript with a glossary, and flag anything unclear rather than guess.
   - R5: humanizer's own rule is "do not make anything up". `content-creation`'s "statistic hook" is the main invention risk.
   - W3 C2 and C8: objections and stories have to come from his mouth; where they're missing, the draft gets a marker, not a guess.
2. **The author's interest will be seen, and has to be handled, not hidden.** *Strong.*
   - R6 (counterargument 8, rec F) and R7 (counterargument 7, R7-E) raise it independently.
   - W3 grounds it in persuasion research: the persuasion knowledge model; Eagly, Wood and Chaiken; O'Keefe's meta-analysis of 107 studies; Scopelliti 2015.
   - L-01 W3 found the same pattern for visible AI: owning it yourself costs less than being found out.
3. **The absolute version of each thesis is its weakest point; the narrower version holds.** *Strong.*
   - R6: products exist (Fin; 76% of AI bought, not built), but the maintenance never goes away.
   - R7: "do more business" is backed; "the whole team grows" isn't.
   - W3 E4 and C6: an absolute with no concession loses practitioner readers. A two-sided argument wins only if the other side is answered, not just mentioned.
4. **Build the post page as a site template with typographic visuals, not a per-post design job.** *Strong.*
   - R2 (Anthropic and Vercel docs, the live import schema): nothing Claude Design exports lands at `/blog/<slug>`.
   - R4 (NN/g eyetracking): decorative images get ignored and informative ones get read, so one diagram block is worth having.
   - W2 (Next.js docs): `opengraph-image.tsx` is the Apify method of L-05 R1, a backdrop with text in slots, run at build time.
5. **A shared post link needs its own tags and image before its first share.** *Strong:* a live probe plus platform docs.
   - R4 F: LinkedIn's 1200×627 spec, and LinkedIn caches the first scrape.
   - W2's 16:38 probe: every sub-page unfurls as the homepage today.
   - L-01 W2 found the same cache behaviour.
6. **Every figure carries its source and date, and the disputed ones stay out.** *Strong.*
   - R6 G and R7-F: no MIT 95%, no RAND 80%, and snippet-only figures checked first.
   - R4: vendor numbers on AI citations are untraceable.
   - W3: the Edelman figures are secondary, so verify them first.
   - L-01 X.4: every number is a range with a source.
7. **A fresh reviewer after the edit catches what the drafter can't.** *Moderate.*
   - R1: a fresh editor with a trace pass (Anthropic's self-correction pattern).
   - R5: `brand-review`'s "unsubstantiated claims" check, and `doc-coauthoring`'s reader test.
   - W3 C7: a cold read, because self-promoters misjudge how they come across (Scopelliti).
8. **The last 10% is decisions, not proofreading.** *Moderate.* Alex's part is the number or story only he has, the title and opening, the truth of each claim, and the close.
   - R1 (Grain; the ownership research).
   - R4 H: substance is what gets a post read.
   - W3 C8: one story from his own work beats a paragraph of argument.
9. **A post of about 900 to 1,400 words is both the B2B norm and what 15 minutes of speech honestly fills.** *Moderate.*
   - R4 B: Orbit's 1,312-word average; Google sets no word count.
   - W1 B4: the rehearsal produced 2,040 words in 13 minutes.
   - R1: padding the post means inventing content.

## Cross-document insights

1. **In both articles, the weakest-evidenced claim is the one that pays the author.**
   - R6's weakest points ("no such thing as a product", external building at the top of the slider) and R7's ("GTM engineers keep the whole team growing") are exactly where the conclusion becomes "pay someone like me".
   - W3 shows that's where a self-interested argument loses credibility.
   - So the evidence gap and the reception risk are the same spot, and one fix serves both: offer the narrower claim, and get the against-interest concession from Alex aloud ("when to hire nobody"; "what happens to the freed SDRs").
   - The inside-maintainer rung (W3 C4 A, `orchestration`'s 17:13 recommendation) fits a job application, and it's also the middle rung that McKinsey's maker/shaper/taker frame recognises.
2. **The skill Alex's rule requires is the likeliest cause of the failure R1 measures.**
   - R1: the edit stage is where drafts go generic, and a copywriting skill's "engagement" rules pull towards the marketing register.
   - R5: the only enabled long-form skill, `content-creation`, is a generic channel template with statistic hooks and CTA conclusions.
   - Its useful part (H2 structure, meta description, slug) is R4's ground, not voice. So it serves stages 3 and 6 best, and the v0.2 prompts already make it lose to the prompt on voice and claims in stages 4 and 5.
   - R1's "his words" share (how much of the post's wording appears in `1-clean.md`) doubles as the test of whether the skill flattened him. It's also the honest trigger for adding humanizer in the morning.
3. **MIT NANDA cuts both ways across the two posts.**
   - R6 uses its "buy or partner succeeds about 67%" for article 1.
   - R7 makes its "returns are in the back office, not sales" the main objection to article 2.
   - Two posts on one site can't cite the same study as authority in one and wave it away in the other. If it appears, it's caveated in article 1 and answered in article 2, and the 95% headline appears in neither.
4. **Spoken numbers are capture's weakest link, and the briefs already hold the fix.**
   - R3: the rig wrote "515" for 5:15, and product names came out three or four ways.
   - R6 and R7 hold exact, dated figures and source names. R1 forbids new facts.
   - So the briefs' fact tables (figures, study and company names) go into `prompts\glossary.md` for stage 1. A figure Alex says that matches a table row keeps its source link from that row, which is attribution, not a new claim. A figure in no table becomes an `[Alex: ...]` marker.
5. **The Claude Doc is where the remaining choices settle, at no extra question.**
   - Reset rule 4 puts Alex's last 10% in a Doc, and his comment there is the sign-off.
   - R1 wants options instead of a single take (two or three titles and openings, the marker list).
   - R1 also wants him to choose knowingly how "the last 10%" is shown. W3 C7's cold-read marks need a place too.
   - Put all of it in a short block at the top of each Doc, and his one comment covers everything.
6. **One card is being built in three places.**
   - The on-page cover, the site's `og:image` (POST-FORMAT v1.1 §5; W2 C2 A) and S-D5's 1200×630 link mockup show the same fields in the same slots.
   - L-05 R1's lesson is that guessed character budgets shipped a clipped card. W2 B3 notes that POST-FORMAT's cover limits are character counts, not measured widths.
   - S-D5's binary-searched budgets are measured, so they should go into B1 and the site's card should fail on overflow.
   - Satori needs `ttf` or `otf` fonts inside a 500 KB bundle (W2), and the brand is now Outfit with Inter Tight (reset rule 6). Check that fit before B1, not after.
7. **The brief removes most of the R1-against-R4 order tension.** R1's outline stage keeps the post "in his order", while R4 wants answer-first headings. If each brief's talking prompts follow POST-FORMAT's sections, his speaking order already is the reading order.
8. **Article 1's slider appears in four places:** the talking prompt, the in-post `[!diagram] scale`, the LinkedIn diagram card and the brief. Its rung order and the rung the post lands on are decided once, by what he says. S-D5 §7a's rule, that the images never say more than the post, already makes the finished post the source.
9. **On one "hire me" site, the two posts read as a pair.** W3 analysed only article 1, but R7's counterargument 7 shows that article 2 also concludes "hire someone like me". So the concession and the placement of the interest have to match across both, or the second post exposes the first.

## Conflicts and rulings

1. **W1 and W2 against S-D4's reported state.**
   - *Ruling:* S-D4's facts win, since it owned the files and my grep confirms them. W1's "the runbook never names a skill" and W2's "POST-FORMAT asks only for the title and description" are out of date.
   - *What survives from W2:* §5 still doesn't spell out a complete `openGraph` (the post's own `og:url` and `og:title`, type `article`). W2's probe shows that the layout's card is inherited whole, and that a partial `openGraph` wipes it. So B1 says it explicitly, and a curl after `BUILT` checks it.
   - *What survives from W1:* S-D4's 5-minute watch on `dictations\` stopped with S-D4, so S-D5 runs its own.
2. **W1's 18:00 clock against reset rule 8 (no cut-off).** *Ruling:* the reset wins, as Alex's directive. W1's ordering still holds: the dictations are the one input only Alex can give (P3), so they get recorded first and everything else is built around them.
3. **R6's slider orientation against Alex's dictated slider.**
   - *Ruling:* the post renders what he says. R6 shows that the frameworks put in-house building on top, while his note puts external building there.
   - Changing his order would put words in his mouth. The brief carries R6's orientation point as one line he can take up aloud, and every visual follows the dictation.
4. **R1's "his order" against R4's answer-first headings.** *Ruling:* R4 at the outline stage, for section order and headings that state the point. Moving his traced sentences adds no claim. Insight 7 makes the conflict rare in practice.
5. **`content-creation`'s CTA conclusion and statistic hook (R5), and R4's "closing ask", against W3 C5 and the 17:13 recommendation.**
   - *Ruling:* the interest is named once, plainly, at the opening, and the post closes on what the reader does on Monday, with no CTA. The same holds in both posts.
   - *Why:* W3's evidence (E1, E3, E6) beats a template, and the v0.2 prompts already rank the prompt above the skill.
6. **R5's humanizer option against R5 trap 5 and "humanizer is for the morning".**
   - *Ruling:* not tonight. It's a third-party install at user scope (R5 trap 7), and a skill is already on.
   - The trigger for adding it is a low "his words" share (insight 2). Its name never appears in the "How this post was made" box.
7. **R3's shorter dictation sessions against W1 C7's "no shorter dictations".** *Ruling:* not a conflict. R3 splits the same 15 minutes into two or three Wispr pastes to limit loss; W1 objects to shortening the total. Split the capture and keep the total. `join.py` already joins the pieces.
8. **S-D5 §7a's brand source (S-D6's tokens) against reset rule 6.** *Ruling:* reset rule 6. The website's Addvery kit is the one source, linked and never copied into a tracked file.
9. **L-01 synthesis 4.4 ("prefer topics about the GTM work") against Alex's topics.** *Ruling:* superseded, since he gave both topics himself. L-01 4.1 (a plain AI line on each post) still stands and agrees with R4 G (Google's "How").
10. **R2 and R4's "no generated images" against Alex's ComfyUI suggestion.** *Ruling:* closed by `orchestration` at 17:13: coded visuals only. That matches R2's evidence (no documented image generation) and R4's (NN/g on decorative imagery).

## Recommendations for S-D5's methodology

### Briefs and dictation

| # | Recommendation | Evidence | Tag |
| --- | --- | --- | --- |
| 1 | Article 1 talking prompts: add the strongest objection and his answer, and "when should a company train its own people and hire nobody, including you" | W3 C1 A, E2–E4 | assistant-actionable |
| 2 | Article 2 talking prompts: answer "GTM engineering replaces SDRs" and MIT's back-office finding; say what he'd do with the freed people (only he can) | R7-C 1, R7-D 1, §5 | assistant-actionable |
| 3 | In each brief, offer the narrow claim next to the strong one (R6 A; R7-A 2) for him to choose aloud. A headline absolute is fine if the body concedes | R6 §4, R7 §5, W3 C6 | assistant-actionable |
| 4 | Each brief's fact table lists only the strongest sources (R6 facts 1–3, 5; R7 items 1–5), each with its date and label. Snippet-only rows are marked "check first". No MIT 95%, no RAND 80% | Convergence 6 | assistant-actionable |
| 5 | Check R7's snippet-only figures (Challenger, HBR 2%, PwC, McKinsey) against their primaries before any of them can go in a post | R7 evidence gaps | verify first |
| 6 | Add the briefs' figures and source names to `prompts\glossary.md` for stage 1 | Insight 4; R3 Q5 | assistant-actionable |
| 7 | The dictation TASK line says: two or three Wispr sessions of 5–7 minutes; don't switch windows until the paste lands; recover with Alt+Shift+Z or History. Optional for Alex: Auto Cleanup on Light, about 10 terms in his Wispr Dictionary | R3 Q1, Q2, recs 2, 4, 5 | assistant-actionable |
| 8 | Watch the dictation landing spot every 5 minutes (S-D4's watch is gone); the rig transcript is a backup, not a wait | Conflict 1; R3 rec 1 | assistant-actionable |
| 9 | Use the OT-04 note (542 words) as talking prompts, not as source text | W1 B4 | assistant-actionable |

### Drafting

| # | Recommendation | Evidence | Tag |
| --- | --- | --- | --- |
| 10 | `{SKILL}` = `marketing:content-creation` for stages 3 to 6. The prompts already win on voice and claims, and block without a skill | R5 rec 1; v0.2 prompts | assistant-actionable |
| 11 | After stages 4 and 5, a script measures the "his words" share against `1-clean.md`, plus the counted rules (em dashes, banned words) | R1 recs 3–4; insight 2 | assistant-actionable |
| 12 | Each heading states the section's point; key points on by default; at most one `[!diagram]` per post (already in v1.1) | R4 A, E | assistant-actionable |
| 13 | A figure that matches a fact-table row gets that row's source link; a figure in no table becomes an `[Alex: ...]` marker | Insight 4; R1 Q2 | assistant-actionable |
| 14 | Use one consistent rule for MIT NANDA across both posts (insight 3) | R6 §2a, R7 §2 | assistant-actionable |

### Review, the Doc and the finish

| # | Recommendation | Evidence | Tag |
| --- | --- | --- | --- |
| 15 | One fresh subagent after stage 5, under `marketing:brand-review` and briefed "you lead a B2B agency and this is from someone applying to work for you". It marks selling sentences, every "you must" and unsupported claims, and changes no text | Convergence 7; W3 C7 | assistant-actionable |
| 16 | A short block at the top of each Claude Doc: two or three title and opening options, the 3–6 markers (each answerable from memory), the cold-read marks, and what the post will show (the AI line, the share of words changed). His comment settles it | Insight 5; R1 recs 6–7 | assistant-actionable |
| 17 | Read the final text back from the Doc and compute the share of words changed against the pipeline's `post.md`. Show the real number, whatever it is | R1 rec 7 A; S-D5 §9 | assistant-actionable |
| 18 | The "How this post was made" box describes stages by what they do, never by skill name, and carries a plain AI line | R5 trap 5; L-01 4.1; R4 G | assistant-actionable |
| 19 | Check that every post scan covers the dictation and any rig text used, since the rig hears the whole room | R3 Q5; DoD-22 | assistant-actionable |

### Visuals

| # | Recommendation | Evidence | Tag |
| --- | --- | --- | --- |
| 20 | Re-skin the six mockups from the website's Addvery kit under `frontend-design`, re-measure the budgets, then run `design:design-critique` and `design:accessibility-review` | Reset rules 5–6; L-05 R1 rec 2 | assistant-actionable |
| 21 | Redo all visual text from each finished post, after his comment; draw the slider in his dictated order | Insights 6, 8; S-D5 §7a | assistant-actionable |
| 22 | Keep the render traps: screenshot to `%TEMP%` then move, `--force-device-scale-factor=1`, invariant-culture numbers, local fonts | L-05 R1 rec 3 | assistant-actionable |

### Post page and publishing

| # | Recommendation | Evidence | Tag |
| --- | --- | --- | --- |
| 23 | `BUILD S-D5-B1` now, from `PIPELINE.md` §4 and POST-FORMAT v1.1 §5. Include: a complete `openGraph` and `twitter` block per post; `opengraph-image.tsx` drawing the cover in S-D5's slot map with measured budgets, failing on overflow; brand fonts as `ttf`/`otf` under 500 KB; tokens from `addvery-tokens.css`; pull quotes `aria-hidden`; and the request names `frontend-design` and `design:accessibility-review` | R2 rec 1; R4 recs 1, 5; W2 C1–C2; insight 6 | assistant-actionable |
| 24 | After `BUILT`, curl the head (the post's own `og:title`, `og:url`, `og:image`) and load it logged out. Paste no `/blog/<slug>` or preview link anywhere before that | W2 C3 | verify first |
| 25 | Each publish BUILD also asks for a feed post and, once the first post is live, a `/blog` link on the home page | W2 C4 A | assistant-actionable |
| 26 | `sitemap.ts` and `robots.ts` in the morning cleanup; low priority | W2 C6 | assistant-actionable |

## What the research didn't settle

### (a) Questions that truly need Alex

1. Do the posts reach Addvery's six through anything of yours (your hand-over message, or sharing them on your own LinkedIn), or do they stay on the site only? (W2 C5; your account and your outreach)
2. Optional, one minute in your own LinkedIn session: paste `https://hire-me-hackathon.vercel.app/d4` into Post Inspector, to see whether sub-pages unfurl as the homepage. (W2 C7; verify first)

Everything else he gives through work that's already his: the two dictations and his comment on each Doc.

### (b) Calls S-D5 can make itself (decide, log in §9, carry on)

| Call | Recommended default | Evidence |
| --- | --- | --- |
| Which rung article 1 lands on | The inside maintainer | W3 C4 A; orchestration 17:13 |
| Where the interest goes, in both posts | Named once at the opening; no ask at the end | W3 C5 C; conflict 5 |
| The slider's order | As Alex dictates it; the brief notes R6's orientation point | Conflict 3 |
| How strong article 2's claim is | The brief offers the conditional framing; he chooses aloud | R7-A 2 |
| Article 2's lead example | Offer IBM against Klarna as a pair; flag that IBM rests on one CEO's word | R7-B |
| The EU AI Act in article 1 | Only if he says it, in the July 2026 wording | R6 E |
| Humanizer | Not tonight; reconsider in the morning if the "his words" share is low | Conflict 6 |
| The share of words changed on the post | Shown as measured; he can veto it in his Doc comment | R1 rec 7; insight 5 |
| Title and opening | Two or three options in the Doc | R1 rec 6 |
| How the dictation is captured | Two or three Wispr pastes adding up to about 15 minutes | Conflict 7 |
| Cold read | One fresh `brand-review` subagent per post | Rec 15 |
| Companion images | Kept local until a post is live; the link mockup serves as the reference for the site's `og:image`; the teasers are offered in the Doc | S-D5 §7a; insight 6 |
| Search basics | Morning cleanup | W2 C6 |

### Gaps no one can close today

- No study measures what share of an AI draft authors change (R1), or the voice fidelity of one-pass against staged drafting.
- No independent evidence ties GTM engineering to headcount (R7). There's no figure for what maintaining one AI workflow costs a year (R6).
- R6, R7 and W3 found no European or Czech data, beyond the EU AI Act.
- No study covers a job applicant's thought leadership read by the employer he's targeting (W3).
- LinkedIn doesn't document its card cache or how it handles `og:url` (W2).

## Sources

Reports synthesised (all in `research\global\`):
- `L-03-R1-transcript-to-draft.md`: R1, transcript to draft in Alex's voice
- `L-03-R2-claude-design.md`: R2, Claude Design against a site template
- `L-03-R3-capture.md`: R3, Wispr Flow and the rig transcript
- `L-03-R4-finished-b2b-post.md`: R4, what a finished B2B post looks like
- `L-03-R5-blog-writing-skill.md`: R5, the best skill to write blogs with
- `L-03-R6-article-1-base.md`: R6, article 1's research base
- `L-03-R7-article-2-base.md`: R7, article 2's research base
- `L-03-W1-wildcard-executed.md`: W1, can it be executed
- `L-03-W2-wildcard-delivered.md`: W2, can it be delivered
- `L-03-W3-wildcard-received.md`: W3, will it be received

Also cited: `L-01-synthesis.md` (the parent synthesis) and `L-05-R1-pixel-perfect-demo.md` (the backdrop and slot-map method).

Context, read only: `CHARTER.md`; `research\lists\L-03-blog.md`; `blog-articles\SPEC.md` and `HANDOFF.md`; `answer-desk\ASKING.md` (the reset rules); `blog-pipeline\prompts\3-outline.md` to `6-format.md` and `POST-FORMAT.md` §5 (grep only).
