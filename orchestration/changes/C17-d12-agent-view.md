# C17: add D12, Agent view (Alex, in chat)

Status: applied 18:43, commits cb8abe6, c49c01a, dd042ce
Asked by: Alex, in chat with the coordinator, about 18:30, relayed with the shape: no new folder or session; the existing `s-d1-scraping` session runs S-D12 in `scraping\`, as C15 did for D11.
Approval: Alex's words, verbatim as relayed: "spin up a new deliverable. I want something that's very agentic and navigable ... a toggle that says, 'I want to view this as a person,' or 'I want my agentic LLM to view this.' ... unlisted pages that are just in Markdown for agents, with no buttons on them. You basically just copy and paste that track into your agentic LLM and it navigates it." Decided by the coordinator: unlisted pure-Markdown pages, plus /llms.txt, generated from the site's own content files so they can't drift, and a person/agent toggle on the site; a GitHub repo mirror comes later, only if he asks. No preview: he asked for it himself, and the reset rules (answer-desk\ASKING.md, rule 2) end plan approvals.
New ids: deliverable D12, outline row S-D12, DoD-25 (the next free id after DoD-24). Asker S-D12. No folder, no session, no CLAUDE.md: `add-deliverable` adapted on the coordinator's instruction, as in C15. The roster marker `Also runs S-D12` lets `propagate_check.py` count the `s-d1-scraping` row and `scraping\` for S-D12.

## Places

Walked in the order of SPEC section 4, "Dependent places".

- Charter "Deliverables" and the counts in "Scope": touched, D12 added and the counts go from eleven to twelve.
- Charter "Spec outline" and "Run order": touched, the intro range, a new S-D12 row and a step 4 bullet. Operator scenes: untouched, S-D12 needs nothing from him.
- Charter "Definition of done": touched, DoD-22's traces cover D12 (the track is published), and DoD-25 is added.
- Charter "Research reading list" and "Risks and open questions": untouched, no research and no open question involved.
- `scraping\SPEC.md`: touched, a new closing section for S-D12, as `canva-video\SPEC.md` got for S-D11.
- CLAUDE.md boot lines and new folders: untouched, no shared file moved and no folder added.
- `SESSIONS.md`: touched, the `s-d1-scraping` row's Role cell.
- The site's deliverables view: `website`, by notice.

### 1. CHARTER.md, "Deliverables", the opening count

Before:
```
The project has eleven client-facing deliverables (one of them, D4, retired on 2 Nov)
```
After:
```
The project has twelve client-facing deliverables (one of them, D4, retired on 2 Nov)
```

### 2. CHARTER.md, "Deliverables", a new D12 row after D11

Before:
```
| D11 | Brand motion demo with Comfy | ... He runs the Comfy work himself; the project brainstorms the ideas and puts the result on the site. |
```
After:
```
| D11 | Brand motion demo with Comfy | ... He runs the Comfy work himself; the project brainstorms the ideas and puts the result on the site. |
| D12 | Agent view | The whole site as a track an agentic LLM can navigate: a toggle on the site between "I want to view this as a person" and "I want my agentic LLM to view this" leads to unlisted pages in pure Markdown, with no buttons, plus /llms.txt. All of it is generated from the site's own content files, so it can't drift from what a person sees. A visitor copies the track into their own LLM, which navigates it. A mirror in a GitHub repo comes later, only if the operator asks. |
```

### 3. CHARTER.md, "Scope", the first sentence

Before:
```
The project covers the three meta deliverables and eleven client-facing deliverables listed below,
```
After:
```
The project covers the three meta deliverables and twelve client-facing deliverables listed below,
```

### 4. CHARTER.md, "Scope", the "In" line

Before:
```
- **In:** M0 to M2 and D1 to D11.
```
After:
```
- **In:** M0 to M2 and D1 to D12.
```

### 5. CHARTER.md, "Spec outline", the intro

Before:
```
S-D1 to S-D11 for D1 to D11.
```
After:
```
S-D1 to S-D12 for D1 to D12.
```

### 6. CHARTER.md, "Spec outline", a new S-D12 row after S-D11

Before:
```
| S-D11 — Brand motion demo with Comfy | ... | S-D6 (the graphics); the operator's pick from the ideas Doc | Picking the ideas, and running the Comfy work himself |
```
After:
```
| S-D11 — Brand motion demo with Comfy | ... | S-D6 (the graphics); the operator's pick from the ideas Doc | Picking the ideas, and running the Comfy work himself |
| S-D12 — Agent view | A generator that builds the agent track (unlisted pure-Markdown pages and /llms.txt) from the site's content files, so it can't drift; `website` adds the person/agent toggle and serves the pages. Run by the `s-d1-scraping` session in `scraping\`, with no folder or session of its own. | S-D8 (the site's content files) | Nothing |
```

### 7. CHARTER.md, "Run order", step 4

Before:
```
   - S-D9 (legibility analyzer) runs continuously off the rig and feeds S-D8.
```
After:
```
   - S-D9 (legibility analyzer) runs continuously off the rig and feeds S-D8.
   - S-D12 (agent view) is built from S-D8's content files and gives S-D8 the agent track behind its person/agent toggle.
```

### 8. CHARTER.md, "Definition of done", DoD-22's traces and a new DoD-25 row

Before:
```
| D1 to D11 | S-D8, S-D9 | live |
...
| DoD-24 | A long-form day-one story, built from the transcripts with clips between its sections, is on the site. | The entry is live in the GTM demos list. | D9, D8 | S-D9 | live |
```
After:
```
| D1 to D12 | S-D8, S-D9 | live |
...
| DoD-24 | A long-form day-one story, built from the transcripts with clips between its sections, is on the site. | The entry is live in the GTM demos list. | D9, D8 | S-D9 | live |
| DoD-25 | An agent-readable Markdown track of the whole site, generated from the site's content, is reachable from a person/agent toggle and from /llms.txt. | The site has the toggle; /llms.txt and the unlisted Markdown pages it links are live, with no buttons, and come from the generator run over the content files, not from hand-written copies. | D12, D8 | S-D12 | live |
```

### 9. `SESSIONS.md`, the `s-d1-scraping` row's Role cell

Before:
```
now approved with changes (OT-12): a carousel of his research artifacts first. |
```
After:
```
now approved with changes (OT-12): a carousel of his research artifacts first. Also runs S-D12 Agent view (C17): the generator that builds the site's agent track (unlisted Markdown pages and /llms.txt) from its content files, for `website`'s person/agent toggle. |
```

### 10. `scraping\SPEC.md`, a new closing section for S-D12

Before:
```
(no S-D12 section)
```
After:
```
## S-D12 Agent view (run by this session; added by S2 as C17)

Row S-D12, deliverable D12, claims `DoD-25`: an agent-readable Markdown track of the whole site, generated from the site's content, is reachable from a person/agent toggle and from /llms.txt. Depends on S-D8 (the site's content files, `..\website\content\`). His scenes: none.

His words (in chat with `orchestration`, about 18:30, as relayed): "spin up a new deliverable. I want something that's very agentic and navigable ... a toggle that says, 'I want to view this as a person,' or 'I want my agentic LLM to view this.' ... unlisted pages that are just in Markdown for agents, with no buttons on them. You basically just copy and paste that track into your agentic LLM and it navigates it."

Decided by `orchestration`: unlisted pages in pure Markdown, plus `/llms.txt`, generated from the site's own content files so they can't drift; `website` adds the person/agent toggle and serves the output (`..\website\HANDOFF.md`, "D12, the agent view"). A mirror in a GitHub repo comes later, only if Alex asks. Build the generator, hand `website` its output and how to re-run it, and plan the rest of this section yourself, logged in your decision log. DoD-22 holds for the track as for every page: no secrets, no Apify proposal, none of his own GetSales outbound.

**Forking gates.** S-D12 shares S-D1's gates (§8). A fork's `HANDOFF.md` covers both.
```

## Held

None.

## Notices

- `s-d1-scraping`: S2 changed scraping\SPEC.md and your SESSIONS.md row for C17: you now also run S-D12 Agent view (DoD-25), the Markdown track and /llms.txt from the site's content files.
- `website`: C17 adds D12 Agent view and DoD-25 to the charter; re-run `scripts\sync_docs.py` and add D12 to the deliverables view.
- `s1-research`: none. Alex said the research is done, as in C15.

Both notices sent at 18:44; `website`'s also flagged that `sync_docs.py`'s charter blurb still says 13 deliverables (now 15).

## Verify

Read back at 18:43: every charter After text is in CHARTER.md exactly once (cb8abe6); the roster row says "Also runs S-D12" (c49c01a); scraping\SPEC.md has its S-D12 section, 10 added lines after the session's own decision log (dd042ce). No control characters in any touched file. `propagate check` before: 1 gap, 92 notes, 24 DoD items. After: the same 1 gap (`research\portfolio\sources\factor-ai.md:20` cites "DoD-first", not from this change), 98 notes, 25 DoD items (24 live, 1 retired), 15 deliverables and 15 outline rows. New notes: scraping\SPEC.md's DoD-8, 9 and 22 citations seen from S-D12, and DoD-25 seen from S-D1, expected with one spec file for two rows, as in C15; DoD-25 cited in orchestration\SPEC.md's decision log. No misses.
