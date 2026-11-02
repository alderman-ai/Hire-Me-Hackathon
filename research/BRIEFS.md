# Briefs for research subagents

The active S1 session fills these in and hands one to each subagent (SPEC.md section 4). `<...>` marks what it fills. Every brief ends with the shared rules at the foot of this file.

## Regular item

```
You are researching one item on research list <L-nn> for the Hire Me Hackathon project at C:\Users\alder\Desktop\Hire me hackaton. Work alone; do not message other sessions.

Read first: CHARTER.md at the repo root (the project's purpose and its ten deliverables), then research\lists\<L-nn-scope>.md (your list; your item is <Rk>).

Your item, verbatim as Alex approved it:
<questions>

It serves: <charter lines / DoD ids>. Readers: <spec ids>.
For every question, answer three things: (1) is there an easy, obvious or converged answer for this step? Cite it. (2) If not, what are the traps and gotchas? (3) What would change the planned approach?

Tools: <tools from the list line>.

Write your report to research\staging\<L-nn>-<Rk>-<slug>.md, in this shape:
- Header: the question verbatim, then the date, "session s1-research subagent", and "item <k> of <n>" on list <L-nn>.
- Method: what you searched and when. Cite every substantive claim with a link; mark inference as inference.
- Verdict up front, then the evidence.
- Evidence gaps: what you couldn't establish, stated plainly.
- Recommendations: evidence plus options. Every call in them is Alex's; don't decide for him.
- Sources.
Scale: about 250 to 450 lines for literature research, about 100 for a live probe. Shorter is fine if the evidence is thin; say so.

Reply to me with: the staging path, a three-line verdict, and anything you couldn't do.
```

## Wildcard

```
You are wildcard <Wk> on research list <L-nn> for the Hire Me Hackathon project at C:\Users\alder\Desktop\Hire me hackaton. Work alone; do not message other sessions.

Read first: CHARTER.md at the repo root, then research\lists\<L-nn-scope>.md, then <the spec's SPEC.md if it exists, otherwise its charter row>.

Every other item on this list, so you don't repeat them:
<R1..R4 verbatim>
The other wildcards' lenses: <the two other lenses>.

Your lens: <W1 can it be executed? | W2 can it be delivered? | W3 will it be received?>
Research the biggest open question NOT being researched, within your lens.

Write your report to research\staging\<L-nn>-<Wk>-<slug>.md in three parts:
(a) Gap analysis: what the other items cover, everything left open, a ranked shortlist, why you picked your question and what you passed over.
(b) Research on that question, in the regular report shape: method, verdict up front, evidence with citations, evidence gaps.
(c) Recommendations: evidence plus options. Every call in them is Alex's.
Then Sources. Scale: about 300 to 450 lines.

Reply to me with: the staging path, the question you picked, a three-line verdict, and anything you couldn't do.
```

## Synthesis

```
You are writing the synthesis for research list <L-nn> for the Hire Me Hackathon project at C:\Users\alder\Desktop\Hire me hackaton. Work alone; do not message other sessions.

Read CHARTER.md, research\lists\<L-nn-scope>.md, then every report on it: <staging paths>.

Write research\staging\<L-nn>-synthesis.md:
- Convergences: where reports reached the same finding independently. Say which, and how strongly.
- Cross-document insights: what only shows when the reports are read together.
- Conflicts: adjudicate each one and say why. A live probe outranks literature on a tool's behaviour, within what it tested.
- Recommendations for the methodology of <spec ids>, each tagged: assistant-actionable, operator decision, or verify first.
- What the research didn't settle. These become the spec's post-research questions to Alex, so phrase each as a question.
- Sources: the reports, by path.
Scale: about 300 lines.

Reply to me with: the staging path, the three strongest findings, and the open questions.
```

## Shared rules (append to every brief)

```
Rules:
- Screen care: assume anything on screen can be published. Never open the Apify proposal, Alex's private hi-apify repo, or Alex's own GetSales outbound (flows, leads, contacts, inbox).
- No real data beyond the charter's scope. Nothing about Addvery itself: that research is Alex's own.
- Don't read C:\Users\alder\Desktop\Hire me hackaton\Addvery Research\ unless your item says so; never copy anything from it into a file.
- Read-only everywhere outside your one staging file: no commits, no edits to other files, no writes to any connected tool.
- Never print secrets.
```
