# C18: D8's "What it is" names the About-me section, the welcome and the six landing pages (Alex, in chat)

Status: applied 18:45, commit 25fb40f
Asked by: Alex, in chat with the coordinator, relayed with the sentence to add. The three parts are his own requests from today: the About-me section (his background, the job he wants, his GTM thesis, the wall of his LinkedIn posts, which `s-d1-scraping` built, and the AI portfolio story in `research\portfolio\`), the welcome with its time picker, and a personal landing page per stakeholder (`website\HANDOFF.md`).
Approval: his request is the approval. No preview: the reset rules (answer-desk\ASKING.md, rule 2) end plan approvals.
New ids: none. No deliverable, row, DoD item, folder or session is added; the site already claims this work through DoD-18 and DoD-19.

## Places

Walked in the order of SPEC section 4, "Dependent places".

- Charter "Deliverables": touched, D8's "What it is" gains one sentence. Counts in "Scope": untouched, no deliverable added.
- Charter "Spec outline", "Run order", operator scenes: untouched. The S-D8 row ("stakeholder sections, and a growing, legible picture of the project") still holds, and none of the three needs a new scene from him.
- Charter "Definition of done": untouched, not asked for; DoD-18 (six stakeholder sections) and DoD-19 (the deliverables view) already cover the landing pages and the site's legibility.
- Charter "Research reading list" and "Risks and open questions": untouched.
- `website\SPEC.md`, any CLAUDE.md, `SESSIONS.md`, new folders: untouched, no DoD link, shared file or row changes.
- The site's deliverables view: `website`, by notice.

### 1. CHARTER.md, "Deliverables", the D8 row

Before:
```
| D8 | Website | The live site, with a section per key stakeholder. A website subdirectory already exists, and this builds it out with more functionality. Without being prompted, it keeps getting clearer about what is being built, for example by showing the deliverables so visitors know what to expect. |
```
After:
```
| D8 | Website | The live site, with a section per key stakeholder. A website subdirectory already exists, and this builds it out with more functionality. Without being prompted, it keeps getting clearer about what is being built, for example by showing the deliverables so visitors know what to expect. It also has an About-me section on the operator (his background, the job he wants, his GTM thesis, a wall of his LinkedIn posts and an AI portfolio story), a welcome that asks visitors how much time they have and offers paths of 5, 10, 20 or 60+ minutes, and a personal landing page for each stakeholder with their own ordered reading list. |
```

## Held

None.

## Notices

- `s-d1-scraping`: C18 adds the About-me section (with your LinkedIn wall), the welcome and the six landing pages to D8's row in the charter; nothing changes in your files.
- `website`: C18 adds the About-me section, the welcome with its 5/10/20/60+ minute paths and the six personal landing pages to D8's "What it is"; re-run `scripts\sync_docs.py`.

Both notices sent at 18:45.

## Verify

Read back at 18:45: the After text is in CHARTER.md exactly once (25fb40f), with no control characters. `propagate check` before and after: the same 1 gap (`research\portfolio\sources\factor-ai.md:20` cites "DoD-first", not from this change), 15 deliverables, 15 outline rows, 25 DoD items (24 live, 1 retired). No misses.
