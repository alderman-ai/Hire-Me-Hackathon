# C04 and C05: DoD-22 reads "shows" as displaying, and keeps public-source material publishable

Status: applied 2026-11-02 17:10, without the gate, on Alex's instruction in chat
Asked by: C04, Alex through `website` (A website-Q3, 14:25: "a", the repo stays as it is, since the charter and specs only mention the proposal); C05, S2's own DoD work, on a conflict `s1-research` found (`research\global\L-01-R3-personal-data.md`, 14:48)
Approval: C04: A website-Q3 ("a"). C05: S2's own DoD consistency work (SPEC section 4, item 5). The gate (OT-11, `Operator tasks\Approve - three small charter fixes.md`) was closed unticked at 17:10: Alex told orchestration in chat, about 17:00, "If things are an easy judgment please clear the plate for me. We can just make edits later."
Fold-in, 17:08: Alex in chat, about 16:58: "all the sources of information are public information. It needs to stop freezing me every 5 minutes because there's some sensitive detail." So C05's exclusion of "the six stakeholders' personal data and replies", and the blur rule for the live-run clip, are dropped: there is no live run in GetSales any more (C06), and material from public sources may be shown. C04's reading of "shows" as "displays" stays.

## Places

### 1. CHARTER.md, "Definition of done", the DoD-22 row

Before:
```
| DoD-22 | Nothing published (the site, its videos, the public repo) shows secrets, the Apify proposal or the operator's own GetSales outbound. | A check of the site, the published videos and the repo finds none of them. | D1 to D10 | S-D8, S-D9 | live |
```
After:
```
| DoD-22 | Nothing published (the site, its videos, the public repo) shows secrets, the Apify proposal, or the operator's own GetSales outbound outside the demo folder. | A check of the site, the published videos and the repo finds none of them displayed; the charter and specs may name them. Material from public sources, the six stakeholders' public profiles included, may be shown. | D1 to D10 | S-D8, S-D9 | live |
```

C04 and C05 touch the same row, so they are one place.
Claimants: S-D8 and S-D9 run their publish checks on this item. Their deny lists that go beyond these three exclusions should be relaxed at the restart (told to `website` and `s-d9-legibility` then).

## Verify

Every place read back at 17:12: each After text is in CHARTER.md exactly once, and no Before text is left (commit b5cb6fd). `propagate check` after the change: CLEAN, no new gaps; the new notes are citations of the retired DoD-14 in blog-pipeline, blog-articles and the L-03 reports, which are history and stay. No misses.
