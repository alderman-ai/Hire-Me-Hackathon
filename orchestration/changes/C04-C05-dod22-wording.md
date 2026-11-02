# C04 and C05: DoD-22 reads "shows" as displaying, and covers the six's data but not the demo folder

Status: in preview (OT-11)
Asked by: C04, Alex through `website` (A website-Q3, 14:25: "a", the repo stays as it is, since the charter and specs only mention the proposal); C05, S2's own DoD work, on a conflict `s1-research` found (`research\global\L-01-R3-personal-data.md`, 14:48)
Approval: C04: A website-Q3 ("a"). C05: S2's own DoD consistency work (SPEC section 4, item 5), previewed because it changes a signed-off item.
Preview: `Operator tasks\Approve - three small charter fixes.md` (OT-11), with the other queued changes

## Places

### 1. CHARTER.md, "Definition of done", the DoD-22 row

Before:
```
| DoD-22 | Nothing published (the site, its videos, the public repo) shows secrets, the Apify proposal or the operator's own GetSales outbound. | A check of the site, the published videos and the repo finds none of them. | D1 to D10 | S-D8, S-D9 | live |
```
After:
```
| DoD-22 | Nothing published (the site, its videos, the public repo) shows secrets, the Apify proposal, the operator's own GetSales outbound outside the demo folder, or the six stakeholders' personal data and replies. | A check of the site, the published videos and the repo finds none of them displayed; the charter and specs may name them. The live-run clip may show the demo folder and the alert flow, with the six's names, photos and personal lines blurred. | D1 to D10 | S-D8, S-D9 | live |
```

C04 and C05 touch the same row, so they are one place. DoD-13 needs a clip of the live run in GetSales; DoD-22 kept the operator's own GetSales outbound off everything published. The After keeps his own campaigns off and lets the demo folder and the alert flow show, blurred.
Claimants: S-D8 and S-D9 already run their publish checks this way (website\SPEC.md, legibility\SPEC.md); no spec text changes.

## Verify

Not applied yet.
