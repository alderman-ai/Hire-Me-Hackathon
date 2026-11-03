# Publish checks (DoD-22)

Run at every forking gate and once after the night's last build (SPEC.md §7 step 9). Each check fetches every live page, looks for secret patterns and the risk rule's terms, lists the embedded videos, and scans the tracked `website\` tree with `git grep -l` (file names only, never what matched).

## 2 Nov, 14:55 · forking gate F3 (context about half full)

- **Pages:** `/`, `/docs/charter`, `/docs/s0-bootstrap`, `/docs/s1-research`, `/docs/s2-orchestrator`. No secret pattern. None of "proposal", "Ivana", "sender profile", "own GetSales outbound". Apify's name is allowed since Alex's DI-6 Q6.3 "yes".
- **Videos:** `qrBNOsSYGrQ` (S02) and `mxorwucznvE` (S06), both webcam uploads from `scripts\upload_webcam.py`. No screen recordings.
- **Image:** `/setup-2026-11-02.jpg`, a photo of the desk. Its monitors show terminal text, including a line that mentions the Apify proposal. Accepted: Alex said "don't blur any text from the image. It's this project. It's on purpose", and website-Q3 settled that mentions are fine. Its GPS and camera metadata are stripped.
- **Repo:** no tracked file in `website\` matches a key or token pattern; no `.env` or secret file is tracked.
- **Result:** clean.

## 2 Nov, 16:30 · after the Addvery reskin deploy

- **Pages:** `/`, `/d1` to `/d10`, the four `/docs` pages and `/privacy`, 16 in all. No secret pattern. None of "proposal", "Ivana", "sender profile" or "own GetSales outbound". None of the eight stakeholder candidates' first or last names from `GetSales six.json` (15 names checked, counts only, never printed).
- **Logged out:** the production alias loads with 200 on every page. The preview card image and Addvery's logo file return 200, and `/d11` returns 404. The disclaimer appears exactly once.
- **Videos:** unchanged. `qrBNOsSYGrQ` (S02), `mxorwucznvE` (S06) and `MyYnFOQCagc` (S08) are webcam uploads, with no screen recordings.
- **Public text:** no "TODO", placeholder or "of 6" in `app\`.
- **Result:** clean.

## 3 Nov, 09:12 · before promoting M1+M2 (the build strip and /log's intro), on preview 2's build (710fa93)

- **Pages:** all 21 routes rendered from the export at `localhost:3101` with the four flags and `VERCEL_ENV=production` (`scripts\check\render_pages.py`), all 200.
- **Leak scan** (`..\blog-pipeline\scripts\scan.py`): 99 fails, every one expected. 91 secret-shaped runs, all on URL lines (89 LinkedIn post links on `/about`'s wall, 2 links to Addvery's public privacy PDF on `/d2`). 2 contact hits: Addvery's public info email on `/d2`. 6 deny hits: the charter on `/docs/charter` naming the proposal and his outbound, which DoD-22 allows. 413 NAME warnings (site names, headings). Nothing printed.
- **Audit** (`audit_page.mjs`, 1,440 and 390 px): `/`, `/log`, `/for/growth`, `/privacy` have one h1 each and no sideways scroll. `/log` keeps its older h1 to h3 skip (post titles).
- **Result:** clean for M1+M2.

## 3 Nov, 09:20 · before promoting M3 (Day 1 wording) and /d2's one h1, on the M3 preview's build (c496a68)

- **Pages:** all 21 routes rendered from the export with the four flags and `VERCEL_ENV=production`, all 200. The two new lines read as sent: `/d2` "I ran it myself on Day 1, and what it found fed..."; `/log` "Day 1 really was costly (I can't do this for 30 companies a day)...". `/d2` and `/log` each have one h1.
- **Leak scan:** the same 99 expected fails as at 09:12, and nothing new: 91 secret-shaped runs, all on URL lines (89 LinkedIn on `/about`, 2 Addvery's public PDF on `/d2`), 2 contact hits (Addvery's public email on `/d2`), 6 deny hits in the charter. Nothing printed.
- **Result:** clean for M3.

## 3 Nov, 09:5x · preview 8's build (de1716a): the menu bar, compact feed, highlights with the derby, M5, the /demos fixes

- **Pages:** 20 routes rendered from the export with the four flags and `VERCEL_ENV=production`, all 200 (the LinkedIn voice entry is gone, and its URL redirects to `/demos`).
- **Leak scan:** 99 expected fails, nothing new: 91 secret-shaped runs on URL lines (89 LinkedIn on `/about`, 2 Addvery's public PDF on `/d2`), 2 contact hits (Addvery's public email on `/d2`), 6 deny hits in the charter.
- **Grades (orchestration's new rule: no grades as a selling point):** none shown as one. Visible mentions describe his grading process: the best-of-three article's booth paragraph and the grading skill on `/skills`. The rest is one Day 1 feed post on `/log`, which is history.
- **Not production-ready:** `/log`'s highlights, derby and time-lapse words are still `[words coming]` placeholders.

## 3 Nov, 10:0x · preview 9 (860cc80), the all-in batch for PROMOTE

- **Pages:** 22 routes rendered from the export with the four flags and `VERCEL_ENV=production`, all 200. No `[words coming]` left anywhere.
- **Audit** (1,440 and 390 px): `/`, `/log`, `/demos`, and the two new articles: one h1 each, no heading skips, no sideways scroll, no broken image, every image with alt text. Article 3's two "placeholder" hits are its own words about the card's placeholder blocks.
- **Leak scan:** the same 99 expected fails as at 09:12 and nothing new: 91 secret-shaped runs on URL lines (89 LinkedIn on `/about`, 2 Addvery's public PDF on `/d2`), 2 contact hits (Addvery's public email on `/d2`), 6 deny hits in the charter.
- **Figures:** article 3's side-by-side shows no one but Alex. The Apify branding is the public meetup card from his public repo, not the proposal. Orchestration is checking Apify's name with Alex.
- **Result:** clean.
