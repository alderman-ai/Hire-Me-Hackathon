# C12: D4 (Blog pipeline), the S-D4 row and DoD-14 are retired, and the test dictation leaves the operator scenes

Status: applied 2026-11-02 17:10, without a preview, on Alex's instruction in chat
Asked by: `s-d4-blog-pipeline`, S2 REQUEST about 16:47
Approval: A8.1 (DI-8, `Operator tasks\Archive\Decide - how the blog pipeline should work.md`, verified 17:05): "There is no blog pipeline separate from the deliverable of the blogs. That was answered somewhere else. This secondary deliverable of a blog pipeline, as opposed to a blog: just kill that. That's dead so kill this. Anything about blog pipelines is dead. The only deliverable is blogs. I've answered that in a different place". No preview: Alex told orchestration in chat, about 17:00, "If things are an easy judgment please clear the plate for me. We can just make edits later."
Ids are never reused: D4, S-D4 and DoD-14 stay, marked retired. `propagate_check.py` learned the retired-deliverable marker (a Name cell ending `(retired)`) in this change. C11 is left for FINDINGS L-05.

## Places

### 1. CHARTER.md, "Deliverables", the opening line

Before:
```
The project has ten client-facing deliverables plus three meta deliverables, in two waves.
```
After:
```
The project has ten client-facing deliverables (one of them, D4, retired on 2 Nov) plus three meta deliverables, in two waves.
```

### 2. CHARTER.md, "Deliverables", the D4 row

Before:
```
| D4 | Blog pipeline | Turns 15 minutes of operator dictation into a good-looking blog post that he finishes off (the last 10%). Likely built in the Claude design app. |
```
After:
```
| D4 | Blog pipeline (retired) | Retired on 2 Nov by the operator (DI-8): there is no blog pipeline separate from the blogs, and the only deliverable is the blog posts (D5). Its tooling stays in `blog-pipeline\` for D5 to use. |
```

### 3. CHARTER.md, "Run order", the operator scenes (also carries C06 and C10)

Before:
```
the S-D3 live run, the S-D4 test dictation and the three S-D5 dictations,
```
After:
```
the S-D3 walkthrough of the 36 workflows, the two S-D5 dictations,
```

### 4. CHARTER.md, "Run order", item 4 (also carries C10)

Before:
```
   - S-D4 (blog pipeline) feeds S-D5 (three articles).
```
After:
```
   - S-D5 (two articles) runs on the operator's two dictations, with the retired blog pipeline's tooling.
```

### 5. CHARTER.md, "Spec outline", the S-D4 row

Before:
```
| S-D4 — Blog pipeline | Turns 15 minutes of dictation into a near-final blog post. | S1 | One test dictation |
```
After:
```
| S-D4 — Blog pipeline (retired) | Retired on 2 Nov (DI-8 Q8.1): no blog pipeline separate from the blogs. Its tooling stays in `blog-pipeline\` for S-D5. | S1 | Nothing |
```

### 6. CHARTER.md, "Definition of done", the DoD-14 row

Before:
```
| DoD-14 | Fifteen minutes of operator dictation turns into a good-looking, near-final blog post, with only the last 10% left to him. | One test dictation produced a post Alex accepted as near-final. | D4 | S-D4 | live |
```
After:
```
| DoD-14 | Fifteen minutes of operator dictation turns into a good-looking, near-final blog post, with only the last 10% left to him. | One test dictation produced a post Alex accepted as near-final. | D4 | S-D4 | retired |
```

### 7. orchestration\propagate_check.py

A deliverable whose Name cell ends `(retired)` is skipped by the outline-row and DoD-coverage checks, the way retired rows and items already are.

Untouched: "Scope" (it still lists ten, with D1 to D10, one retired; the count stays true); blog-pipeline\SPEC.md (the session logged the retirement itself, 5cb785a); `SESSIONS.md` (`s-d4-blog-pipeline` moves its own row to Finished and stops at the restart); the `blog-pipeline\` folder stays. The site's deliverables view: `website` is told at the restart.

## Verify

Every place read back at 17:10: each After text is in CHARTER.md exactly once, and no Before text is left (commit b5cb6fd). `propagate check` after the change: CLEAN, no new gaps; the new notes are citations of the retired DoD-14 in blog-pipeline, blog-articles and the L-03 reports, which are history and stay. No misses.
