# Source fact sheet: cb6-prayer-project

Repo: https://github.com/alderman-ai/cb6-prayer-project (public, verified with `gh repo view` on 2026-11-02; HEAD `3288e38`).
Read from a read-only clone. No scripts were run. Line numbers refer to HEAD. "Inference" marks anything not stated in the repo.

Short links used below (blob base = `https://github.com/alderman-ai/cb6-prayer-project/blob/main/`):
- SPEC: `SPEC.md`, https://github.com/alderman-ai/cb6-prayer-project/blob/main/SPEC.md
- REVIEW: `SPEC Methodology Review.md`, https://github.com/alderman-ai/cb6-prayer-project/blob/main/SPEC%20Methodology%20Review.md
- LENS: `LENS_Check.md`, https://github.com/alderman-ai/cb6-prayer-project/blob/main/LENS_Check.md
- README: `README.md`, https://github.com/alderman-ai/cb6-prayer-project/blob/main/README.md
- For a line link, add `?plain=1#L<n>` to a blob URL, e.g. https://github.com/alderman-ai/cb6-prayer-project/blob/main/SPEC.md?plain=1#L19

## 1. What it is and who it's for

The repo holds a bilingual (English and Czech) fundraising campaign (an email, a one-page brochure and a landing page) for CB Dejvice, a Prague 6 church raising money to build a new sanctuary building. Claude produced it in one unattended run from a spec Alex wrote (README:3-8, 105-112; SPEC:19). The campaign's readers are warm US contacts of missionaries and partner institutions, plus Czech readers (README:6-8; SPEC:23). The repo's own readers are the church and anyone reading the spec as an audit trail (README:107-112).

- **Content:** it is church fundraising copy and design for a building project. The religious content is limited to the subject and the tone rules: the spec asks for copy that "humbly (yet explicitly)" asks for a gift (SPEC:23), and the research notes list guilt and pressure under "Tone to avoid" (`research/Copywriting Best Practices.md`:43-48).
- **Non-commercial:** this is Alex's own description. The repo has no fee, invoice, contract or pricing wording (grep over all `.md` files). It still calls the church "client" throughout (SPEC:35, 159; commit `1833da9` "Client-facing cleanup"). Payment status cannot be confirmed from the repo.
- **Shareable:**
  - The repo is public and has no LICENSE file (`gh repo view`: `licenseInfo: null`), so anyone can view it but no reuse rights are granted.
  - Alex scrubbed it for sharing in October 2026: commits `7f442dd`, `da974de` ("Remove personal names and email addresses") and `3404e4e` ("Remove client Drive link, photo GPS/EXIF metadata, and unrelated template").

## 2. Dates

- **First commit:** `0099871`, 2026-07-26 22:41:35 +0200, "Initial assets: brand pull, sanctuary renders, research, sprint spec".
- **Last commit:** `3288e38`, 2026-10-15 22:42:50 +0200, "Create LENS_Check.md".
- **13 commits in total:**
  - The run itself: 8 commits from 07-26 22:41 to 07-27 02:32 (`git log`).
  - Then 5 more: an unrelated upload on 08-28 (removed later), redaction on 10-13 and 10-14, and the LENS file on 10-15.
- **Repo history:**
  - The repo was created 2026-07-26T20:30:56Z (`gh repo view`) under the run's GitHub account, `princess-irulan-ai` (SPEC:76, 173).
  - It now lives under `alderman-ai`. Inference: it was transferred, and the old URL still returns HTTP 200.
- **Caveat on the run length:** SPEC:168 stamps the DOD check "~01:20Z", but the commit containing it (`a6c2e24`) is 00:40:53 +0200, which is 22:40Z. Inference: the "Z" label is wrong, so don't quote a run length taken from it.

## 3. How the spec shows the method at work

**The spec's sections (SPEC):**
- Obsidian-style frontmatter, with a `[[SN_20260726_01]]` session link and properties (1-15).
- A pre-flight instruction: "scan through the spec and point out any process that may be broken" (19).
- The operator-authored Problem Description, marked "assistant do not touch" (21-23).
- LOOP LOGIC: an hourly retry through usage limits (25-27); INITIAL RESOURCES (29-35).
- MODELS: Fable 5 high as orchestrator, Opus 5 medium for subagents, Sonnet 5 medium for Chrome work (37-41).
- LANGUAGES (43-45), BRANDING AND MEDIA (47-55), TECH STACK (68-76).
- INITIAL RESEARCH: six fan-out items, including a skill A/B eval (57-66).
- OUTPUTS, with a `(???)` marker on the one unknown output (79-93).
- FUTURE HITL revision (95-99) and QA (101-103).
- ASSISTANT CLARIFYING QUESTIONS: Q1-Q8, answered before the run (105-131).
- ASSISTANT DECISIONS: 12 judgment calls, with a ⚑ on the one left open (133-159).
- DOD: the assistant's box is checked and the operator's is not, followed by the output links (162-180).

**The method in action (SPEC):**
- **Pre-flight:** it caught a dead Vercel CLI token, an unconnected Canva MCP and seven ambiguities before the run (REVIEW:18-22).
- **Q1 overturned:** the "placeholder only" donation answer was replaced when research found the church's own published account (SPEC:139).
- **Skill A/B eval:** the skill-guided copy won because the vanilla chain "fabricated a deductibility inducement and two fund-handling claims" (SPEC:145).
- **Tax claims:** US gifts are stated as not tax-deductible, per the IRS research (SPEC:141; `research/US Tax Deductibility.md`:1-5).
- **Czech QA:** about 40 fixes (SPEC:153).
- **Mid-run change:** the church's own site went live on the target subdomain during the run. The run did not pick a side and left it as the open ⚑ decision for Alex (SPEC:137).

**Deliverables.** The file deliverables are in https://github.com/alderman-ai/cb6-prayer-project/tree/main/deliverables.
- `deliverables/email-docx/`: Email EN, Email CZ tykani (informal) and Email CZ vykani (formal), as .docx.
- `deliverables/brochures/`: Brochure EN (US Letter) and CZ (A4) PDFs, made in Canva. The Claude Design one-shot brochures were removed in `1833da9`.
- `deliverables/copy/EN|CZ/`: 7 copy files (brochure, email, landing), each carrying build notes.
- `deliverables/church-site-page/`: self-contained `index-en.html` and `index-cz.html`, plus a deploy README.
- `deliverables/qr/`: 3 QR codes: the EN landing page, the CZ landing page and a CZ payment QR.
- `deliverables/Visual Cohesion Report.md`: a desktop and mobile check of both live pages, verdict "PASS with issues".
- `site/`: Next.js source, live at https://cb6-en.vercel.app and https://cb6-cz.vercel.app (both returned HTTP 200 on 2026-11-02).
  - Its README is written for non-developers: edit the copy, run `sync-copy`, deploy (`site/README.md`:14-27).
- Supporting folders: `research/` (6 notes), `resources/design-system/` (`tokens.css` plus 7 HTML component previews) and `resources/brand/`.

**The review's main findings (REVIEW).** The review was written after the run by the orchestrator, Fable 5, and its §7 meta-critique by an independent Opus 5 agent (REVIEW:5-8, 229-231). Alex's caveat: he does not remember how he prompted it.

Praise:
- The pre-flight sentence is "the single highest-value sentence in the document" (18).
- Treating operator-answered questions as a section; they were quoted in "~30 agent briefs" (23-25, 164-168).
- The `(???)` honesty marker (26-27).
- Designing outputs for the revision phase (28-30).
- Tone guardrails inside research items (31-33).
- A spec is a recovery surface and an audit artifact (169-172).
- Verdict: use a hybrid, where the spec owns intent, constraints, answers and acceptance, and specs should get "smaller and more declarative" (191-196).

Criticism:
- No money path (41-46); loop logic has no failure ceiling (48-52); no resource audit (54-59).
- Acceptance criteria are scattered (87-93); no file-ownership rules for concurrent agents (95-99).
- Requirements are buried in prose (108-111); mid-run edit races (116-119); the pre-flight instruction is hidden in a blockquote (120-121).
- Research quotas measure inputs, not outcomes (134-136).

Meta-critique:
- The review blamed the document for executor errors (237-239).
- Its cost column omits compute: two design systems, four brochure PDFs, two landing-page builds and about 30 subagents (241-243).
- Survivorship bias (245-247); one of the eight front-loaded answers was overturned (249-251).
- Its 17-section template contradicts its own call for smaller specs (253-255).
- Nobody asked whether the run was proportionate, and the campaign was never scored: "Nothing was sent; the primary (US) audience still has no giving mechanism" (257-261).
- There is no metric for comparing specs (263-265).

## 4. The sidecar idea (LENS)

- **What it is:**
  - LENS_Check.md is an "Operator lens": a plain-English stand-in for one Python script, `check.py`, in Alex's separate "Alderman OS" harness (LENS:1-14).
  - It has nothing to do with the CB6 campaign. It was added 2026-10-15, about 11 weeks after the run, as an example of the practice (`git log`).
- **Its fixed sections:**
  - Frontmatter: script path, status, trigger, requirements, dates (1-10).
  - Why it was created, citing the operator's own words with session transcript IDs and times (16-30).
  - What it does: seven counts, in plain steps (32-56).
  - How to run it, including a test run on a throwaway copy (58-72).
  - How to turn it on or off (74-77).
  - Signs it is working (79-83).
  - Signs it is not: too strict, too loose, unreliably triggered, wrong scope, silent failure, too costly, drift (85-105).
  - A time log that ties each change to a commit and a reason (107-119).
- **What it shows about building without writing code:**
  - The operator checks behaviour, not syntax. Each limit is stated in terms he can test, e.g. "It counts; it doesn't judge" (54), or that projects deeper than four folders are missed (93).
  - Writing the lens found a real silent bug: a bare `--since` date made git skip that day's earlier commits, so the script reported +0 rule lines when the real count was +8. It was fixed to count from midnight (97-100, 119).
  - It also found drift between the script's header comments and its code (102-104).
  - The lenses exist because Alex asked a subagent to "create operator lenses for all of these scripts" (118).
  - Inference: the frontmatter and markdown format suits his Obsidian and terminal setup, as he describes; the repo itself does not say so.

## 5. Alex's own words in the repo (verbatim)

1. "This document is meant to support a single shot dynamic workflow with no human in the loop." (SPEC:19)
2. "the tone should be appropriate for humbly (yet explicitly) asking the reader to consider donating to the project." (SPEC:23, in the section marked "Operator-authored -- assistant do not touch")
3. "DO NOT pattern-patch the tone and wording when it would be inappropriate for a church donation request" (SPEC:64; REVIEW:31-33 credits this to the operator-written spec)
4. "Well, at least that's what the robots tell me." (README:22)
5. "it detected react and wrote html. fun. but supposedly an easy fix." (README:25)
6. "I don't have 14 days to waste before realizing that the system isn't working" (LENS:23, an operator quote recorded from the harness build, not from CB6)

Attribution of 4 and 5: they were added in commit `02aab8c` (2026-07-27 02:32), which was committed as `princess-irulan-ai`. Inference: Alex typed them, because they are first-person text addressed to the church, and the same commit replaced the AI-written README text.

## 6. Proof cards

1. **The spec as audit trail.** https://github.com/alderman-ai/cb6-prayer-project/blob/main/SPEC.md
   It proves that one document carried intent, 8 pre-flight answers, 12 logged judgment calls and a DOD for a run with no human in the loop.
2. **Live bilingual landing pages.** https://cb6-en.vercel.app (and https://cb6-cz.vercel.app)
   It proves the run shipped working deploys, plus a non-developer copy-edit, sync and deploy path (`site/README.md`).
3. **A published self-critique, with an independent attack on it.** https://github.com/alderman-ai/cb6-prayer-project/blob/main/SPEC%20Methodology%20Review.md
   It proves the method is reviewed in the open, including "Nothing was sent" (REVIEW:261).
4. **Fidelity over flair: the A/B eval and the tax research.** https://github.com/alderman-ai/cb6-prayer-project/blob/main/research/US%20Tax%20Deductibility.md
   The judging disqualified copy that invented tax-deductibility claims (SPEC:141, 145), which proves the checks caught fabrication before it shipped.
5. **The operator-lens sidecar.** https://github.com/alderman-ai/cb6-prayer-project/blob/main/LENS_Check.md
   It proves a non-coder can audit a script in plain English; the lens caught a silent +0 vs +8 counting bug (LENS:97-100).

## 7. Keep off a public page (flagged, not quoted)

- **A private individual's name and email:** the client contact, removed in `7f442dd` and `da974de` but still readable in the public git history (e.g. SPEC.md at `a6c2e24`).
- **Old git history:**
  - Photo GPS/EXIF data: removed from `before.jpg` and `01_current-building-exterior-photo.jpg` in `3404e4e`; the original blobs are still in history (per the commit message; not re-checked).
  - The client's Drive-folder link: removed from `PICTURES NOTE.md` in `3404e4e`; still in history.
  - An unrelated "Theological Debate Research Template.md": added 2026-08-28 (`192631d`), removed in `3404e4e`, still in history.
- **Editable links:**
  - README:39-41 links three Google Docs marked "Anyone with the link can edit".
  - SPEC:176-178 holds Canva edit links and a Canva folder link.
  - Don't link to either from the page.
- **The church's details:**
  - Its bank account and variable symbol (SPEC:139; `resources/brand/BRAND NOTES.md`:108), its role email addresses (README:116 and the deliverables) and its funding figures. Alex took the figures out of the README intro in `02aab8c`.
  - One inconsistency: one of those emails was redacted in SPEC:139 but still appears in README:116 and all the copy files.
- **The architect's renders:** README:80 says permission to reuse them is "assumed but not documented", so don't reproduce them. Two AI-generated images in `resources/updated-pictures/` are flagged do-not-use (`PICTURES NOTE.md`).
- **LENS internals:** local file paths, session transcript IDs (LENS:18-26) and one frustrated operator quote (LENS:28). Quote selectively.
- **Vercel IDs:** `site/vercel-projects.json` holds Vercel org and project IDs. They are not secrets, but they are not page material either.
- **Outcome claims:** make none. The campaign was never sent or scored (REVIEW:261), and the destination decision (⚑1) was still open at DOD (SPEC:137, 168).
- **Secrets:** a grep found no tokens, keys or passwords, and `.env*` and `.vercel` are gitignored (`site/.gitignore`).
