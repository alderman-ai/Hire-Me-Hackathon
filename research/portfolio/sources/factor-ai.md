# Fact sheet: Factor-AI

Repo: https://github.com/alderman-ai/Factor-AI (public; GitHub description "Build-in-public: a Factorio-themed agent harness, built with Claude Code."). Read 2026-11-02 at `main` = `d6d67cc` (read-only clone). Paths are repo-relative. URLs point at `main`; for a permalink swap `main` for `d6d67cc7473170720cc7f3771cf618170d567f42`. Line links use `?plain=1#L..`. Heading anchors were checked against GitHub's rendered HTML.

## 1. What it is

Factor-AI is a public practice repo where Alex set up a team of Claude Code sessions, folders, fill-in forms and small checking scripts, under one hard rule: he may not fix problems by writing more instructions in plain English. He had to use mechanisms that enforce themselves. It is themed on the factory game Factorio: files are "ore" and "power" that get moved between folders by "belts" and "inserters", and "launching the rocket" stands for his real goal. That goal is an automated pipeline that takes an idea and turns it into executable specs.

- Constraint: "**Most of all, I should be forced to solve problems with minimal reliance on prose**" (`_THE SHIP/Hitchhiker's Guide/Instruction Manual/Purpose of Factor-AI/Operator Improvement Goals.md`, https://github.com/alderman-ai/Factor-AI/blob/main/_THE%20SHIP/Hitchhiker%27s%20Guide/Instruction%20Manual/Purpose%20of%20Factor-AI/Operator%20Improvement%20Goals.md). Root `CLAUDE.md` adds "Friction is the product." (L54).
- Metaphor and DoD: README L12-29 ("What's your DoD? Launching a rocket, of course."), https://github.com/alderman-ai/Factor-AI/blob/main/README.md?plain=1#L12-L29. The real target is spelled out in `.../Purpose of Factor-AI/Directional Goal.md`, https://github.com/alderman-ai/Factor-AI/blob/main/_THE%20SHIP/Hitchhiker%27s%20Guide/Instruction%20Manual/Purpose%20of%20Factor-AI/Directional%20Goal.md
- The repo didn't start the spec method. README L24 calls it "smoke testing what I've been working on the last 5-6 months", L103-108 describe hand-written specs becoming a section library, and the Day 1 log says "ALL I WANTED TO DO WAS GET MY SPEC SECTION LIBRARY FINE TUNED" (`.../Captains Log Entries/2026-08-17.md` L45).

## 2. Dates

- Repo created 2026-08-17 09:34 UTC (`gh repo view`, `createdAt`). First commit `c9eff83` "Initial commit: Factor-AI vault scaffold", 2026-08-17 11:34 +0200. Last commit `d6d67cc` "Day 4 is a day off, and the canvases move to the demo they describe", 2026-08-21 17:29 +0200. Nothing pushed since 2026-08-21.
- 67 commits, all by Alex Alderman, and 58 of them carry a `Co-Authored-By: Claude` trailer. By date: 21 on 17 Aug, 37 on 18 Aug, 8 on 19 Aug, 1 on 21 Aug (`git log`).
- The four days, numbered the way his logs number them:
  - **Day 1, 17 Aug.** Scaffold, a template-based "ore patch" system, `pumpjack.py` (pulls out session transcripts) and a `/science` skill. Assistant's logs: `Ship's Computer Entries/2026-08-17_1650.md` and `_1938.md`.
  - **Day 2, 18 Aug.** Run 001 ended at 13:42 (tag `RUN_001/BITER_ATTACK!!`, `2121230`). His first MCP server, `_THE VAST UNKNOWN`, was built at 14:20 (`7fb5681`). Run 002 was scuttled at 16:35 (`205ec1b`). The evening was a repair phase: the batch-approval protocol (`e206f1e`) and the fence hook (`8ef361e`). Assistant's logs: `2026-08-18_1655.md` and `_2322.md`.
  - **Day 3, 19 Aug.** The Demo 001 build, "officially starting at 11:32" (`Captains Log Entries/2026-08-19_1013.md`, headed "# Day 3"). DoD-first at 12:21 (`b4ac56f`). The rules moved out of the code and the route signature arrived (`4231f84`, 18:54). The route grammar and two diagrams followed (`ffb7377`, 19:24).
  - **Day 4, 20 Aug.** A planned day off, with one log entry at 08:50 (`Captains Log Entries/2026-08-20-0850.md`, headed "# Day 4"). It was committed on 21 Aug in `d6d67cc`.
- Run boundaries are annotated tags, all three now on origin: `RUN_001/PROJECT_START`, `RUN_001/BITER_ATTACK!!` and `RUN_002/BITER_ATTACK!!` (`git ls-remote --tags`). The 18 Aug 23:22 log says they were "local only" when it was written, so they were pushed later.

## 3. What it taught or seeded (claims with proof)

**3.1 The definition of done comes first, and the path is worked backwards from it.** At 12:21 on Day 3 he stopped building forward. The commit that followed is titled "Sub demo 1 begins: work backwards from the DoD, hand-mining first" (`b4ac56f`). The section "Fully path to DoD, articulated" landed in `4231f84`.
Proof: `_THE SHIP/Distress Beacon/Captains Log Entries/Demos/Demo-001-day-001.md`, https://github.com/alderman-ai/Factor-AI/blob/main/_THE%20SHIP/Distress%20Beacon/Captains%20Log%20Entries/Demos/Demo-001-day-001.md#fully-path-to-dod-articulated. The reader sees the DoD (L24: "The guy must use Human Actions to Move 5 pieces of Ore into THE SHIP"). Then comes a step list from power-on to delivery, with a budget of 3 power. It plans a jam on purpose: belts that hold 2 items fill up while an inserter has no power. The last rule is that the Ship accepts ore only if its route matches.
Status: **articulated, not achieved.** No ore moved in the repo. `DEMO_001_Ore-Power/CONSUMED/` holds only `.gitkeep` and no ADRENALINE run log is tracked. Commit `4231f84` says "ADRENALINE_DEMO 1 currently fails its child-of rule".

**3.2 "Done" is checked by comparing one string.** "Did this ore really come from the patch" becomes a single string that must equal an expected one.
Proof: `DEMO_001_Ore-Power/Demo Ship/DEMO-001-ORE (correct pathing).md`, https://github.com/alderman-ai/Factor-AI/blob/main/DEMO_001_Ore-Power/Demo%20Ship/DEMO-001-ORE%20%28correct%20pathing%29.md. The reader sees a 20-line file of frontmatter only: route fields for each hop (To / Via / With / By) and `R-Check: o-OP1-r1tB1BvI2-r2tB1A-r3tC1vI1-r4tSHIPwHAbGUY-e`. This is the hand-written expected answer, not ore that actually travelled.
Grammar: `_THE SHIP/Hitchhiker's Guide/Routing/Routing Notation (WIP).md`, https://github.com/alderman-ai/Factor-AI/blob/main/_THE%20SHIP/Hitchhiker%27s%20Guide/Routing/Routing%20Notation%20%28WIP%29.md. It says "the check is one string that must equal an expected string" (L22) and "renumbering is forgery" (L208). Its header says "Nothing here is enforced yet. No script reads this file." (L3).

**3.3 The rules live in a table he can edit, and the code only executes them.**
Proof: `_THE SHIP/Hitchhiker's Guide/Schema/ADRENALINE Rules.md`, https://github.com/alderman-ai/Factor-AI/blob/main/_THE%20SHIP/Hitchhiker%27s%20Guide/Schema/ADRENALINE%20Rules.md. The reader sees five rules as table rows, "Add a rule by adding a row" (L30) and "An unknown verb halts the script. It is never skipped." (L33). The executor is `_THE SHIP/Instrument Panel/Verification Scripts/adrenaline.py` (550 lines), https://github.com/alderman-ai/Factor-AI/blob/main/_THE%20SHIP/Instrument%20Panel/Verification%20Scripts/adrenaline.py. Commit `4231f84` gives the reason: "Learning Python is out of scope for this build. Deterministic action verification is not."

**3.4 A rule written in prose became an enforced hook.**
Proof: `_THE SHIP/.claude/hooks/ship_fence.py`, https://github.com/alderman-ai/Factor-AI/blob/main/_THE%20SHIP/.claude/hooks/ship_fence.py. Its docstring opens "The Ship's fence. A PreToolUse hook, not a paragraph." The commit is `8ef361e`, "The Ship's fence stops being a paragraph and becomes a hook it cannot argue with" (18 Aug 22:08). According to the assistant's log, the hook was tested against 14 payloads: 8 breaches denied, 3 legitimate Ship operations and 3 root operations passed. The same log records an open "script-shaped hole" (`Ship's Computer Entries/2026-08-18_2322.md` L90-91, L128), https://github.com/alderman-ai/Factor-AI/blob/main/_THE%20SHIP/Distress%20Beacon/Ship%27s%20Computer%20Entries/2026-08-18_2322.md

**3.5 Approval gates: the assistant proposes, Alex rules, and only then does anything run.**
Proof: `_THE SHIP/Fireproof Safe/Root level templates/Batch Request/Batch Request v1.md`, https://github.com/alderman-ai/Factor-AI/blob/main/_THE%20SHIP/Fireproof%20Safe/Root%20level%20templates/Batch%20Request/Batch%20Request%20v1.md (commit `e206f1e`, "approval once over a list, not once per message"). The reader sees four passes. "Pass 2 — assistant proposes. EXECUTES NOTHING." (L23). Then one verdict box per slot, and RETRY slots are regenerated rather than executed. Its first real use is recorded at `2026-08-18_2322.md` L88: "the reference did not launder the approval".
The gate idea: "gates get retired and replaced at a higher abstraction, never made harder" (`World Design.md` L104), https://github.com/alderman-ai/Factor-AI/blob/main/_THE%20SHIP/Fireproof%20Safe/Game%20Improvement/World%20Design.md#3-gates-and-how-progress-is-measured

**3.6 Decision logs, with errors and dead ideas kept on the record.**
- `World Design.md` §15, "Superseded — the correction trail", keeps every killed proposal and what killed it. The top of the file uses the status markers Settled / Open / Unratified / Superseded. https://github.com/alderman-ai/Factor-AI/blob/main/_THE%20SHIP/Fireproof%20Safe/Game%20Improvement/World%20Design.md#15-superseded--the-correction-trail
- All four assistant logs have a section "Where the Ship's Computer was wrong" (e.g. `2026-08-17_1650.md` L67, https://github.com/alderman-ai/Factor-AI/blob/main/_THE%20SHIP/Distress%20Beacon/Ship%27s%20Computer%20Entries/2026-08-17_1650.md). The Captain's Log README says "Never edited after the fact".
- `_THE SHIP/_EJECT BUTTON/RUN-002-Autopsy.md`, https://github.com/alderman-ai/Factor-AI/blob/main/_THE%20SHIP/_EJECT%20BUTTON/RUN-002-Autopsy.md, is a post-mortem with a verdict table, and it overturns the run's own report ("Cryobay hypothesis | BROKEN", L25).
- Root `CLAUDE.md` L79-84 asks for narrative commit messages: "the log is the raw footage".

**3.7 The pipeline gets mapped onto the game (Day 4).** "problem > task > spec > project", "= iron ore > iron plate > steel > launch site", and "question > research > (unverified) KB entry" (`2026-08-20-0850.md` L15-17), https://github.com/alderman-ai/Factor-AI/blob/main/_THE%20SHIP/Distress%20Beacon/Captains%20Log%20Entries/2026-08-20-0850.md#outside-applications. The Day 1 tech tiers from the assistant's log: "Blue — one charter decomposes into N specs with bidirectional traceability" and "Purple — one spec, one-shot, no HITL, verified against its DoD" (`2026-08-17_1650.md` L115-116).

**Links to later work (inference; the repo doesn't mention later projects).**
- DoD before method. The public spec repo `alderman-ai/knowledge-work-executable-spec-research` runs DoD written → methodology → coherency check. Its run is dated 24-25 Aug 2026 (sibling sheet `executable-spec-research.md` §2-3), five days after Factor-AI's Day 3. The order matches 3.1. Factor-AI itself has no coherency check.
- Logged decisions and gates. That spec logs D1-D11 and fires gates per stage (same sheet §3). The hackathon routes approvals as gate-approval operator tasks (`research\SPEC.md` L28). Both look like 3.5 and 3.6 but don't cite them.
- "4 days inspired the next 3-4 months of building" is Alex's claim from this brief. It isn't in the repo.

## 4. Alex's own words (verbatim)

1. "Ok, let's work backwards. dod is human moves ore from crate to ship. Let's write that first." (`Demos/Demo-001-day-001.md` L99)
2. "I'm not learning a scripting language but I will make the verification deterministic, not prose." (`Demos/Demo-001-day-001.md` L137)
3. "Automated or by hand paper over different problems." (`Demos/Demo-001-day-001.md` L123, bold in source)
4. "This should be a gamified yet STRUCTURED, THROTTLED, and HIGH FRICTION way to build DURABLE and COHERENT schema for tasks, research, post-hoc execution analysis, and KB entries." (`Captains Log Entries/2026-08-18_1402.md` L8, "schema" bold in source)
5. "Do it manually several times before templating" / "Template before automating" (`README.md` L96-97)
6. "THE FLYWHEEL SHOULD MAKE EVERY FOLLOWING PROJECT EASIER" (`Captains Log Entries/2026-08-18_1402.md` L26)

The assistant wrote this one, not Alex, so label it if it's used: "A constraint is physical when violating it is impossible, not when violating it is visible." (`Ship's Computer Entries/2026-08-17_1650.md` L69)

## 5. Proof cards

1. **The DoD, worked backwards.** https://github.com/alderman-ai/Factor-AI/blob/main/_THE%20SHIP/Distress%20Beacon/Captains%20Log%20Entries/Demos/Demo-001-day-001.md#fully-path-to-dod-articulated. Proves that he fixed a checkable end state first and planned the whole path to it, including a deliberate jam, in a timestamped log.
2. **"Done" as one string.** https://github.com/alderman-ai/Factor-AI/blob/main/DEMO_001_Ore-Power/Demo%20Ship/DEMO-001-ORE%20%28correct%20pathing%29.md. Proves that he turned "did it come from the right place" into a check that can fail. Caveat: it's the expected answer, not a passing run.
3. **The fence is a hook, not a paragraph.** https://github.com/alderman-ai/Factor-AI/blob/main/_THE%20SHIP/.claude/hooks/ship_fence.py. Proves that he moved a rule out of prose into a PreToolUse hook that enforces it, tested against 14 payloads per the assistant's log.
4. **Rules a non-coder can edit.** https://github.com/alderman-ai/Factor-AI/blob/main/_THE%20SHIP/Hitchhiker%27s%20Guide/Schema/ADRENALINE%20Rules.md. Proves that the rules are a table he controls while the script only executes them, and that an unknown rule halts instead of being skipped.

## 6. Keep off the public page

- **`_THE SHIP/SatNav/Incoming Transmissions/`** holds 18 raw Claude Code session transcripts, about 39,800 lines, pulled out by `pumpjack.py`. They contain:
  - Alex's email address, 4 times;
  - local folder listings that name other private projects: a client-demo project, and the private repo this brief says to keep off;
  - claude.ai artifact links, one titled for that client demo;
  - full tool and system output.
  Don't link, quote or screenshot them. They are already public in the repo. Whether to remove them is Alex's call.
- **No credentials found.** A scan for API-key, token and password patterns came back empty. `.mcp.json` has an empty `mcpServers` and `.gitignore` excludes `.env` and `*.key`. Session IDs (Ship's Computer frontmatter) and `Claude-Session` URLs (commit trailers) aren't secrets but add nothing to the page.
- **Apify.** There is nothing about the proposal in this repo. The only trace is that one folder name inside a transcript (above). Not quoted here.
- **Tone calls for Alex (not secret):**
  - README: "Back when I still made any money", "A massive ADHD-fueled procrastination exercise", "Hubspot is prob working on this too";
  - Day 1 log: "My children will starve in the streets";
  - Day 3 log: "this is ai psychosis i'm going home".
