# Voice pass: six articles in Alex's voice

Written on 2 Nov with the `alex-voice` skill. Each piece went through brief, source (his own words under "His words"), write, mechanical pre-flight, a fresh grader, and retries up to the default cap of 3. **None reached Great. All six are Good,** so treat them as near-final copy for Alex's last 10%, not finished copy. Nothing here is committed or published, and the originals are untouched.

Run logs, with every grade and the grader's written findings, are in `.claude\skills\alex-voice\local\runs\2026-11-02-0<n>-<slug>\log.md` (git-ignored).

| # | Piece | File | Grade | Failed at the end | Attempts (used) | Markers for Alex |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | AI workflows are always a managed service | `ai-workflows-are-always-a-managed-service.md` | Good | LEN-27, SRC-36 | 3 (3) | 5 |
| 2 | If AI won't replace half your team, put it in your pipeline | `if-ai-wont-replace-half-your-team-put-it-in-your-pipeline.md` | Good | LEN-27 | 3 (3) | 5 |
| 3 | How to refine AI slop into AI ops | `how-to-refine-ai-slop-into-ai-ops.md` | Good | SRC-36 | 3 (3) | 1 |
| 4 | Day one: what broke, what worked and what I'd keep | `day-one-what-broke-what-worked-and-what-id-keep.md` | Good | LEN-27, SPOK-35 | 3 (2) | 2 |
| 5 | Knowledge arbitrage: you don't have to pick anymore | `knowledge-arbitrage.md` | Good | LEN-27 | 3 (3) | 1 |
| 6 | So good AI that it looks human | `so-good-ai-that-it-looks-human.md` | Good | LEN-27 | 3 (3) | 0 |
| 7 | Best of three, instead of redlining everything one by one | `best-of-three-instead-of-redlining.md` | Good | GATE-11 | 3 (3) | 0 (2 `[fact: ...]` for orchestration) |

## Notes

- **Grades by attempt.** 1: Unpublishable (FACT-37), Good, Good. 2: Unpublishable (FACT-37), Good, Good. 3: Good, Good, Good. 4: Good, Good, Unpublishable (FACT-37), so attempt 2 is the one delivered. 5: Good, Good, Good. 6: Good, Good, Good. 7 (added 23:xx, W61, the night's rebuild as a method): Unpublishable (FACT-37), Good (LEN-27), Good (GATE-11). Its two `[fact: ...]` markers (go-live time, pages recaptured onto the Claude Design canvas) are for orchestration, not Alex.
- **LEN-27 failed on almost every attempt**, including drafts within 5% of their target length. It seems to read "make the one point and stop" strictly on these multi-section articles. That's worth a look in the rubric before a 5-attempt rerun.
- **Pre-flight vs the post format.** The THRD-30 check fires on every `[Alex: ...]` marker, because the marker starts with "Alex". The markers were kept, as asked, and each run log records it. The taste article also trips EMOJ-43 (9 emojis), all inside the LinkedIn exhibits and the emoji riddle the piece is about.
- **Article 2's title.** Kept "If AI won't replace half your team, put it in your pipeline", which is closer to his words. The other name, "GTM engineers and the AI jobs promise", is in its front matter as `alt_title`.
- **Open points beyond the markers.** Article 3: could "AI ops" be misread as AIOps? Articles 1 and 2: the sabbatical is "about nine months", as he says in S02, but the library flags a nine-or-six conflict. Article 4: the clip ids still need the final swap from `website\content\clips.json`. Article 6 quotes his own 20:29 complaint that the agents' outreach copy didn't sound like him, so he decides whether to show it.
