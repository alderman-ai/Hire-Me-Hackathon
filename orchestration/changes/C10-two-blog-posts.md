# C10: D5, the S-D5 row and DoD-15 say two blog posts, not three

Status: applied 2026-11-02 17:10, without a preview, on Alex's instruction in chat
Asked by: Alex, in his OT-04 note, about 16:40 (archived: `Operator tasks\Archive\Approve - research for the blog pipeline.md`): two articles, with both topics, "we'll do two articles"
Approval: his OT-04 note. The preview it was queued for was skipped: Alex told orchestration in chat, about 17:00, "If things are an easy judgment please clear the plate for me. We can just make edits later."
Applied together with C12 (D4 retired), so D5 and S-D5 no longer go "through D4" or depend on S-D4.

## Places

### 1. CHARTER.md, "Deliverables", the D5 row

Before:
```
| D5 | Three blog articles | Three posts produced through D4. |
```
After:
```
| D5 | Two blog articles | Two posts, each from 15 minutes of operator dictation, brought to near-final for him to finish off (the last 10%). |
```

### 2. CHARTER.md, "Spec outline", the S-D5 row

Before:
```
| S-D5 — Three blog articles | Three posts through the S-D4 pipeline. | S-D4 | Three 15-minute dictations and the last 10% of each post |
```
After:
```
| S-D5 — Two blog articles | Two posts, each from a 15-minute dictation, brought to near-final. | S1 | Two 15-minute dictations and the last 10% of each post |
```

### 3. CHARTER.md, "Definition of done", the DoD-15 row

Before:
```
| DoD-15 | Three blog posts, each from a 15-minute dictation through the blog pipeline and finished by the operator, are published on the site. | The three posts are live on the site. | D5, D8 | S-D5 | live |
```
After:
```
| DoD-15 | Two blog posts, each from a 15-minute dictation and finished by the operator, are published on the site. | The two posts are live on the site. | D5, D8 | S-D5 | live |
```

### 4. CHARTER.md, "Run order"

Carried in C12, places 3 and 4 ("the three S-D5 dictations" becomes "the two S-D5 dictations"; "three articles" becomes "two articles").

Untouched: blog-articles\SPEC.md already says two posts (commit 4a776ee). The site's deliverables view: `website` is told at the restart.

## Verify

Every place read back at 17:12: each After text is in CHARTER.md exactly once, and no Before text is left (commit b5cb6fd). `propagate check` after the change: CLEAN, no new gaps; the new notes are citations of the retired DoD-14 in blog-pipeline, blog-articles and the L-03 reports, which are history and stay. No misses.
