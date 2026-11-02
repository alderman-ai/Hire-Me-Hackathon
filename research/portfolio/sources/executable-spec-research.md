# Fact sheet: knowledge-work-executable-spec-research

Repo: https://github.com/alderman-ai/knowledge-work-executable-spec-research (public, MIT). Read 2026-11-02 at `main` = `b221052` (read-only clone). Files: `README.md`, `LICENSE`, and seven spec snapshots `01 - draft.md` to `07 - completion.md` (140 to 732 lines). "07" below means `07 - completion.md`; `L` numbers are its lines. Line links use `?plain=1#L..`; heading anchors were checked against GitHub's rendered HTML.

## 1. What it is

A public notebook holding one real work order for an AI agent, saved seven times, from Alex's rough first draft to the finished, executed version. The agent fills the document in itself: it asks Alex its questions inside the document before starting, writes down what "done" means and how to prove it, plans and does the work, and logs every judgement call it made on its own.

- The work order in the example is Alex's own website (alderman.ai): build tools that turn its pages into editable Markdown and turn a filled-in Markdown template back into a deployed page (07 L162-185, https://github.com/alderman-ai/knowledge-work-executable-spec-research/blob/main/07%20-%20completion.md#problem).
- The repo holds the spec only. The evidence files it cites (`Working/`, `Deliverables/`, `Skills/`, the translator) are not published, so results are as the agent recorded them in 07.

## 2. Dates and activity

- First commit: `ca74a37` "Initial commit", 2026-08-28 13:50 +0200. Last commit: `b221052` "Update README.md", 2026-09-18 10:47 +0200 (`git log`).
- 7 commits, all by "alex alderman", on two days: five on 2026-08-28 between 13:50 and 14:07 (the seven spec files arrive in one commit, `af8bcb4` "Add files via upload"), two README edits on 2026-09-18. The commit messages are GitHub web-UI defaults (inference: files uploaded through the browser).
- No commits in the 45 days since 2026-09-18. GitHub shows 1 star and 1 fork (`gh repo view`, 2026-11-02).
- The run inside the spec is older than the repo: pre-flight Q&A on 2026-08-24 (07 L18-20), DoD ticked 2026-08-25 (07 L664). The README calls it "a snapshot of around ~mid august 2026" (README L5) and adds a "Sept. 2026 edit" renaming these artifacts "Executable Guiding Documents (EGDs)" (README L16).

## 3. The method's stages (one file per gate)

Gates are fired by a script, `./Working/spec-gate.sh <NN>`, that is not in the repo (07 L6-9).

1. **01 · draft** (140 lines). Alex's hand-written Problem, Scope, Not-in-scope and Resources inside an empty template: Pre-flight, Q&A, Methodology, Issues, Assistant Decisions, DoD, operator sign-off. Typos and an unfinished line ("There's a medium fidelity", L79) mark it as an unedited human draft (inference). `01 - draft.md`, https://github.com/alderman-ai/knowledge-work-executable-spec-research/blob/main/01%20-%20draft.md
2. **02 · proof-read pre-flight** (165). Diff against 01: typo and tag fixes, the resources list completed, the gate order written into comments, and pre-flight limited to Problem, Scope and Resources. `02 - proof-read pre-flight.md`, https://github.com/alderman-ai/knowledge-work-executable-spec-research/blob/main/02%20-%20proof-read%20pre-flight.md
3. **03 · post-qna** (299). Four questions (Q1-Q4) asked and answered, pre-flight boxes ticked with evidence notes, decisions D1-D4 logged. `03 - post-qna.md`, https://github.com/alderman-ai/knowledge-work-executable-spec-research/blob/main/03%20-%20post-qna.md
4. **04 · dod written** (347). 24 Definition-of-Done boxes in 7 groups, each naming its evidence, written while the Methodology is still empty. `04 - dod written.md`, https://github.com/alderman-ai/knowledge-work-executable-spec-research/blob/main/04%20-%20dod%20written.md
5. **05 · methodology written** (685). Sections M0-M7 and 11 work packages (WP0-WP10), written to satisfy the fixed DoD; D5-D9 logged. `05 - methodology written.md`, https://github.com/alderman-ai/knowledge-work-executable-spec-research/blob/main/05%20-%20methodology%20written.md
6. **06 · coherency check** (708). One question: will this Methodology satisfy that DoD (07 L200-203)? The diff against 05 is 31 lines: a fourth subagent (Sonnet "webpage-viewer" for visual checks in Chrome) and D10, from an operator ruling. The README names this file the ready-to-execute spec (README L30). `06 - coherency check.md`, https://github.com/alderman-ai/knowledge-work-executable-spec-research/blob/main/06%20-%20coherency%20check.md
7. **07 · completion** (732). All 11 work packages and all 24 DoD boxes ticked, Observed state filled in, D11 added mid-run. The operator's own "Spec is complete" box is still unticked (L731). `07 - completion.md`, https://github.com/alderman-ai/knowledge-work-executable-spec-research/blob/main/07%20-%20completion.md

## 4. What's distinctive (claims with proof)

**4.1 Judgement calls are surfaced before any work starts, in the document, not the chat.** Each question must carry "full context ... such that the operator does not need to look up anything in another document or in the terminal" (L39). Each of Q1-Q4 brings evidence, lettered readings and a recommendation; Alex answers in a line ("C" for Q2, L120).
Proof: https://github.com/alderman-ai/knowledge-work-executable-spec-research/blob/main/07%20-%20completion.md#pre-flight-qa (L31-160). The reader sees four questions, the first opening with a per-page component table, each ending in "My recommendation", and Alex's short verbatim replies.

**4.2 The questions caught real conflicts.** Q2 found that "single shot" deploying would contradict the project's own gate on production deploys, and offered four readings (L102-115); Alex chose a preview deployment. Q4 found the brief could mean any URL on the internet, which makes "100% deterministic" impossible (L151-153).
Proof: https://github.com/alderman-ai/knowledge-work-executable-spec-research/blob/main/07%20-%20completion.md#q2-does-deployed-mean-live-on-aldermanai-or-built-and-previewed. The reader sees the contradiction stated and the option chosen.

**4.3 Pre-flight is scoped so it cannot stall on "how".** It tests only the Problem, Scope and resources; "Ambiguity about *how* the work will be done is not a pre-flight failure" (L11-14).
Proof: https://github.com/alderman-ai/knowledge-work-executable-spec-research/blob/main/07%20-%20completion.md#pre-flight-check. The reader sees each ticked box followed by what was checked (e.g. site reachable, "HTTP 200 in 0.54s", L22).

**4.4 Every call the agent makes alone is logged with its blast radius.** Eleven entries, D1-D11. Each names the decision, its source (an answer, a DoD box or a ruling), the reasoning, and a "Reverse this and ..." line. Example, D7: "Reverse this and either 5.3 or 5.2 fails by construction" (L608-609). D10 and D11 record operator rulings, quoted verbatim, rather than agent-only calls.
Proof: https://github.com/alderman-ai/knowledge-work-executable-spec-research/blob/main/07%20-%20completion.md#assistant-decisions (L559-647). The reader sees bold decision titles, the source in italics, and a bold "Reverse this and" in every entry.

**4.5 The decision log grows at each gate.** D1-D4 appear at 03, D5-D9 at 05, D10 at 06 and D11 at 07 (grep across the seven files). Compare https://github.com/alderman-ai/knowledge-work-executable-spec-research/blob/main/03%20-%20post-qna.md#assistant-decisions with the 07 link above.

**4.6 The agent's own wrong question is corrected on the record.** "Q1 was regenerated after the fact on operator instruction: it had been asked on a wrong premise" (L20).
Proof: https://github.com/alderman-ai/knowledge-work-executable-spec-research/blob/main/07%20-%20completion.md?plain=1#L19-L20

**4.7 "Done" is fixed before "how", and every box names its evidence.** "Written early, ticked late: a box ticked before execution is a lie" (L654). The 24 boxes cover the contract, export, template, import, determinism, skills and prohibitions.
Proof: https://github.com/alderman-ai/knowledge-work-executable-spec-research/blob/main/07%20-%20completion.md#dod. The reader sees each box ending in "*Evidence:* ..." (for example 5.1, matching hashes over two runs).

**4.8 Stops are pre-registered, and one fired.** M2 lists four halts (H1-H4) and a "Not halts" table of look-alikes to handle and log (L301-321). H4, "main changed during the run", fired mid-run and the operator ruled a re-baseline (L500).
Proof: https://github.com/alderman-ai/knowledge-work-executable-spec-research/blob/main/07%20-%20completion.md#m2--prohibitions-and-halts--restated-so-they-are-salient-at-the-moment-of-action and https://github.com/alderman-ai/knowledge-work-executable-spec-research/blob/main/07%20-%20completion.md#m6--observed-state

**4.9 Execution rules built for a hands-off run.** "The translator is a program, not a prompt" so reruns are byte-identical (L216-219). Subagents return fixed JSON receipts and "read no context they were not handed" (L246-279). Auditors judge one page each, because "five pages judged in one context would anchor on each other. Reason: measurement integrity, not cost." (L271-273). Loops have hard caps (M4), and cleanup is "written before execution" (L516-527).
Proof: https://github.com/alderman-ai/knowledge-work-executable-spec-research/blob/main/07%20-%20completion.md#m1--fan-out-contract

## 5. Alex's words in the repo (verbatim; typos kept)

> Most frontier executable spec research is based on code, which is highly benefited by deterministic verification methods. My research is on doing the same with knowledge work.

`README.md` L2

> No one wakes up one day and says "let's build a 7-stage life cycle for an executable spec."

`README.md` L7

> Because I used to be a copywriter, it felt oddly normal to spend 3-6 hours manually writing a document on how to execute something.

`README.md` L9

> Super rough benchmark: Works best when I know ~50-75% of the "how" at start. When I know less than 50, my micromanagement makes things worse

`README.md` L11

> I call this async HITL. I'm still "in the loop" as in my judgement is still being applied, it's just happening separately from the execution phase

`README.md` L32

> Grep does not equal ontology.

`README.md` L38

> The only true canon is what's visibly present on alderman.ai. But please don't take 30 screenshots to verify everythign ...

`07 - completion.md` L141 (answer A3)

> Omg what a mess. Just the first 5

`07 - completion.md` L158 (answer A4)

## 6. Proof cards

1. **Questions before work.** https://github.com/alderman-ai/knowledge-work-executable-spec-research/blob/main/07%20-%20completion.md#pre-flight-qa. Proves: the agent researched, framed options and recommended; Alex decided four scope calls in a few lines, before execution.
2. **Every unasked call, with what reversing it breaks.** https://github.com/alderman-ai/knowledge-work-executable-spec-research/blob/main/07%20-%20completion.md#assistant-decisions. Proves: 11 logged decisions, each with source, reasoning and a "Reverse this and" consequence.
3. **One document, seven gates.** https://github.com/alderman-ai/knowledge-work-executable-spec-research/tree/main. Proves: the same spec at each stage, from a 140-line human draft to a 732-line executed record, which anyone can diff.
4. **Done defined before how.** https://github.com/alderman-ai/knowledge-work-executable-spec-research/blob/main/07%20-%20completion.md#dod. Proves: 24 outcomes, each tied to named evidence, written at gate 04, before the Methodology.
5. **Stops planned, and one used.** https://github.com/alderman-ai/knowledge-work-executable-spec-research/blob/main/07%20-%20completion.md#m6--observed-state. Proves: the pre-registered halt H4 fired during the run and was resolved by an operator ruling.

## 7. Keep off the public page (flagged, not quoted)

- **07 L664-670:** a Claude session ID and three Vercel preview-deployment URLs under Alex's account slug. Don't quote or link them; whether they still resolve was not checked.
- **07 L208, L191, L194, L223, L337:** the machine's hostname, local Windows paths containing the user name, and the Obsidian vault name.
- **07 L149 (Q4):** a third-party company's name inside an internal `/dev/...` route of the website codebase. Whether it relates to client or vendor work is unknown, so leave it out.
- **07 L500-501:** internal codebase commit SHAs and a private handover file name. Low risk, but no use to the story.
- **Not found:** no secrets, keys or passwords (grep for secret, token, password, API key, bearer: the only "token" hits are about token spend in the README). No mention of Apify. The site worked on is Alex's own; no client work appears.
- **Accuracy flags.** (a) The operator's final sign-off box is unticked (L731), so don't write "signed off". (b) The results (24 boxes, byte-identical reruns, faithful round trip) are self-reported; the evidence files aren't in the repo. (c) The brief's phrases ("my passion project", the "~one-shotting" tagline, "disproportionately positive impact") are not in the repo (grep); credit them to Alex directly. (d) The README has typos ("This a a snapshot", "compoenents"); quote verbatim or with [sic].
