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
