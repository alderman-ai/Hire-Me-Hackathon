# L-01 W1 Wildcard: can it be executed?

**Question (verbatim):** Can one Claude subscription and one Windows machine keep this project's parallel Claude Code sessions (12 background sessions running now, about 7 more planned, plus research workers and Opus subagents) working through the rest of today's operator window and an unattended overnight build, and what stops them when nobody is watching?

2 Nov 2026 · session s1-research subagent · item 5 of 7 on list L-01 (wildcard W1, lens "can it be executed?")

Readers: every wave-2 spec; most directly `orchestration` (it owns the dependency map and the overnight plan), `website`, `s-d9-legibility`, `answer-desk`, and the morning cleanup session. Serves the charter's P6 ("Spend the operator window, build overnight") and, through it, every DoD item that is due by the morning (DoD-2, DoD-8 to DoD-22).

---

## Part (a): Gap analysis

### What the other items on L-01 already cover

| Item | What it asks | Lens |
| --- | --- | --- |
| R1 | How strong GTM portfolios, hackathon demos and "job application as outreach" sites make work legible to a non-technical decision maker in under a minute; what reads as toys or noise | Presentation |
| R2 | What employers hiring GTM engineers in 2026 look for; which deliverables map to it; what none of them shows | Market fit |
| R3 | GDPR and LinkedIn's terms for scraping six named people, publishing a section on each, and the live outbound run | Legal and safety |
| R4 | How recipients react to a personalised job-application site; impressive versus creepy; what makes them act | Reception |
| W2 | Can it be delivered? Getting it published, shipped and in front of the recipient | Delivery |
| W3 | Will it be received? | Reception |

The child lists already take the per-spec tool questions: L-02 R2 (driving Apify), L-03 R2 (whether Claude Design can carry the blog pipeline), L-04 R1 and R2 (GetSales mechanics, Sales Navigator to CSV), L-05 R2 (what Canva can do programmatically, and on which plan). Each child list also carries its own W1 wildcard for execution inside that one spec. So the parent-level W1 should take execution risks that cut across every spec and that no single spec owns.

### Everything left open within "can it be executed?" at parent level

I swept every SPEC.md, CLAUDE.md, GIT.md, the roster and the operator tasks for anything about compute, usage limits, the unattended run and the machine (grep for overnight, usage limit, rate limit, weekly, sleep, budget, token, permission). Findings:

1. **The compute budget.** No spec, CLAUDE.md or roster note mentions Claude usage limits, the weekly cap, usage credits or what a session does when it hits a limit. The only "budget" in the project is S1's research scoping (DI-3 Q3.2) and Alex's $10 Apify cap. Meanwhile every spec plans to keep working overnight (P6), and every spec forks at about 17:50 so that "the overnight session starts clean".
2. **The mechanics of the unattended run.** Background sessions (`claude --bg`) run under a local supervisor. Nothing in the project says what happens to them at a usage limit, after an hour idle, on a reboot, or when one needs input with nobody attached.
3. **The operator-time critical path.** Alex's scenes (four dictations, the GetSales live run, the Canva recording, brand sign-offs, a stream of gate approvals, and his own Addvery research, which gates S-D3, S-D6, S-D7 and the six stakeholder sections) against roughly three hours left before 18:00. This is P3's own subject, and the `briefing` session already tracks "where he's the blocker". It's internal arithmetic, not a research question.
4. **The website as an integration bottleneck.** One `website` session takes build requests from S-D9, S-D1, S-D5, S-D7, S-D10 and S2, serially, and deploys each. Its context grows all night. This is a real risk, but its deploy side belongs to W2 (delivery), and its design belongs to the website spec.
5. **Shared working tree contention.** Fifteen-plus sessions commit to one tree on `main`. GIT.md already handles it (path-limited commits, wait on `index.lock`, the watcher pushes). Low residual risk.
6. **Dependency on Alex's own Addvery research.** It gates four specs. Out of bounds for me (the brief and DI-3 Q3.3: nothing about Addvery itself).

### Ranked shortlist

| Rank | Question | Blast radius | Already covered? | Cost to fix if known now |
| --- | --- | --- | --- | --- |
| 1 | Can the subscription and the machine carry the parallel sessions through today and overnight, and what stops them unattended? (items 1 and 2 above, merged, because the second is how the first fails) | Every deliverable due by morning; the whole of P6 | No: zero mentions anywhere | Minutes (settings, one decision on usage credits, power and update settings) |
| 2 | The operator-time critical path | High: the six operator-gated deliverables | Partly: P3, `briefing` | Not a research question |
| 3 | The website as integration bottleneck | Medium: DoD-15, DoD-17 to DoD-21 | Partly: website spec, W2 | Design change in one spec |
| 4 | Git contention in one tree | Low | Yes: GIT.md | None needed |
| 5 | Addvery research dependency | High | Alex's own | Out of bounds |

### Why I picked rank 1, and what I passed over

I picked rank 1 because it's the only execution risk that can take out every deliverable at once, it fails silently at night when nobody is there to see it, and it's cheap to guard against before 18:00 but expensive to discover at 07:00. It's also researchable from primary sources: Anthropic's own help centre and Claude Code docs, plus a read-only look at how this machine and these sessions are set up.

I passed over the operator-time path (rank 2) because P3 and the `briefing` session already own it, and web research adds nothing to it. I left the website bottleneck (rank 3) to W2 and the website spec. Git contention is solved. The Addvery dependency is off limits.

---

## Part (b): Research

### Method

- **When:** 2 Nov 2026, about 14:45 to 15:20 Prague.
- **Web:** WebSearch and WebFetch (both available). Primary sources first: Anthropic's help centre (Claude Code on Pro and Max plans, the Max plan article, usage credits) and the Claude Code docs (agent view and background sessions, interactive mode's usage-limit wait, costs, errors, environment variables, cross-session messaging, CLI reference). Microsoft Learn for Windows Update restarts. Third-party sources only where Anthropic publishes nothing, and labelled as such.
- **Local, read-only:** the charter, the DoD, SESSIONS.md, GIT.md, orchestration's spec, S1's spec and lists, and a grep of every wave-2 SPEC.md. A read-only probe of this machine: `claude --version`, `claude daemon status` (worker count only), named fields from `~/.claude/settings.json` (model, subagent model, effort, inbound-message mode, permission mode; nothing else printed), whether two environment variables are set (names only), the Windows sleep timeouts, Windows Update active hours, and the two reboot-pending flags. No account, usage or billing endpoint was read, and `/usage` wasn't run, because that is account data.
- **Not opened:** the Apify proposal, `hi-apify`, Alex's GetSales outbound, `Addvery Research\`.

### Verdict

**Not reliably, as currently set up.** The sessions can carry today's window, but the overnight build has three unguarded ways to stop, and nothing in the project would notice:

1. **The quota.** All of the sessions draw from one subscription's five-hour and weekly limits. Twelve background workers are running now, Opus is the default model, subagents default to Opus 5.5, and effort is set to high or xhigh. Anthropic says ten parallel agents use quota "roughly ten times as fast" as one. No spec plans for the limit.
2. **What a background session does at the limit.** Interactive sessions wait for the reset and then carry on by themselves. Background sessions don't get that wait. Unless `CLAUDE_CODE_RETRY_WATCHDOG` is set (it isn't) or usage credits are on (unknown), a background session that hits the limit at 01:00 stops mid-task and stays stopped. If it's the weekly limit, the reset can be days away.
3. **The machine and the supervisor.** Sleep isn't a risk while the machine is on mains power, and no reboot is pending. But Windows Update's active hours end at 03:00, so an update restart between 03:00 and 09:00 would stop every session until someone attaches to each one. Separately, the supervisor stops any session that has been idle and unattached for about an hour. The docs don't say whether a message from another session wakes it again.

Each of these takes minutes to guard against before the 17:50 forks, and every option is Alex's call (part c).

### Evidence

#### B1. What the limits are (Anthropic's own pages)

- **Two limits, shared by everything.** "Pro and Max plans each have a five-hour session limit and a weekly limit," and "These limits are shared across Claude and Claude Code" ([Using Claude Code with your Pro or Max plan](https://support.claude.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan)). Chat in claude.ai, the terminal, IDEs, background sessions and subagents all draw from the same pool.
- **The weekly limit covers every model and resets at a time set per account.** "Max plans have a five-hour limit, a weekly usage limit that applies across all models," and "The weekly limit resets at a fixed time each week that is assigned to your account." Max also has "a separate weekly limit for Fable" ([What is the Max plan](https://support.claude.com/en/articles/11049741)).
- **No numbers are published.** Neither article gives token or message counts. Third-party guides conflict with each other on the multipliers and on the 2026 changes ([morphllm](https://www.morphllm.com/claude-code-usage-limits), [ai-toolbox](https://www.ai-toolbox.co/claude-management-and-productivity/claude-usage-limits-2026)). I don't rely on any of their figures.
- **The Opus 5.5 launch raised five-hour limits, not weekly ones (third-party reports).** Reports of Anthropic's 22 Sep 2026 announcement say five-hour limits rose on Pro, Max, Team and Enterprise, with no change to the shared weekly limit ([SmartScope, 1 Oct 2026](https://smartscope.blog/en/blog/claude-opus-5-5-weekly-limit-max-plan-2026/); [mixed-news](https://mixed-news.com/en/?p=31973); [Notebookcheck](https://www.notebookcheck.net/Claude-Opus-5-5-is-included-with-Pro-and-Free-still-misses-out.1406452.0.html)). I didn't open Anthropic's own post.
  - *Inference:* for a run of fourteen-plus hours with many sessions, the weekly limit is more likely to bind than any single five-hour window, because five-hour windows keep resetting and the weekly one doesn't.
- **Usage credits keep work going past a limit.** With usage credits on, "your requests switch to pay-as-you-go pricing on usage credits and keep working" when a five-hour or weekly limit is used up. They're "billed at standard API rates", "apply to both Claude conversations and Claude Code terminal usage", and can be capped with a monthly spend limit ([Usage credits for paid Claude plans](https://support.claude.com/en/articles/12429409-extra-usage-for-paid-claude-plans)). The monthly API credits that come with Max "can't be used in Claude Code" ([Pro or Max plan article](https://support.claude.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan)).
- **Opus 5.5 is billed at $4 per million input tokens and $20 per million output** (reports of the launch: [mixed-news](https://mixed-news.com/en/?p=31973), [SmartScope](https://smartscope.blog/en/blog/claude-opus-5-5-weekly-limit-max-plan-2026/)). That's the rate usage credits would charge for Opus. Cache reads are cheaper ([Anthropic pricing](https://platform.claude.com/docs/en/about-claude/pricing)).
- **A "limit reset" may exist (verify first).** Third-party sources describe a reset button in Settings > Usage that restores the five-hour or weekly limit, granted to eligible accounts from time to time, plus a one-off reset given with the Opus 5.5 launch ([SmartScope](https://smartscope.blog/en/blog/claude-five-hour-limit-reset-2026/), [pasqualepillitteri.it](https://pasqualepillitteri.it/en/news/17905/claude-free-usage-limit-reset-opus-5-5)). I couldn't retrieve Anthropic's own page on it.
- **Ultra plans:** "Verified Ultra accounts have no five-hour session limit," but they still have a weekly limit ([Pro or Max plan article](https://support.claude.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan)).

#### B2. How fast parallel sessions spend the quota

- **Anthropic says it scales with the number of sessions.** "Background sessions consume your subscription usage the same as interactive sessions, so running ten agents in parallel uses quota roughly ten times as fast as running one" ([Agent view, Limitations](https://code.claude.com/docs/en/agent-view)). The same page warns: "Each session uses your subscription quota independently, so see Limitations before dispatching many at once."
- **Subagents count in full.** "The subagent's own requests still draw on your usage." Agent teams use "approximately 7x more tokens than standard sessions" ([Manage costs](https://code.claude.com/docs/en/costs)).
- **Idle sessions spend quota too**, and this project's design triggers each of these ([Manage costs, "Why usage climbs in a long session"](https://code.claude.com/docs/en/costs)):
  - "Cross-session messages: Claude Code delivers a message from another of your sessions as a new turn when this session sits idle, sending your full context each time."
  - "Scheduled tasks: a session-scoped scheduled task fires on its interval even while the session is idle, sending your full context each time."
  - "Long context: … a one-line question in a session that has been open all day still draws usage for the whole conversation."
  - "Cache misses: your first message after a break longer than the cache lifetime misses the cache and reprocesses your full context."
- **Users report the same in practice (anecdotes, not measurements):**
  - Five parallel subagents hit a Pro limit in about 15 minutes, against about 30 minutes run one after another ([DEV Community](https://dev.to/onlineeric/claude-code-sub-agents-burn-out-your-tokens-4cd8)).
  - Four parallel forks used about 425k tokens and 96% of one user's limit ([claude-code issue, via claudeissues.com](https://claudeissues.com/issue/56068-bug-parallel-sub-agents-inherit-full-parent-context-causing-excessive-token-cons)).
  - A Max 20x user hit the Opus weekly limit within hours ([claudeissues.com #10333](https://claudeissues.com/issue/10333-bug-opus-weekly-limit-reached-on-max-20x-plan)).
- **What this project is running (read-only probe, about 15:10):**
  - Claude Code 2.1.316.
  - `claude daemon status`: "12 bg workers running", 12 in the roster file. SESSIONS.md lists 10 running sessions and 7 more planned, plus `rw-*` research workers whenever Alex marks an item deep.
  - User settings: `"model": "opus"`; `CLAUDE_CODE_SUBAGENT_MODEL` set to `claude-opus-5-5`, in settings and in the environment; `effortLevel` set to `high` and `xhigh`. So every subagent defaults to Opus 5.5. The docs recommend the opposite for simple subagent work ("specify `model: haiku`"; "Use Sonnet for teammates") ([Manage costs](https://code.claude.com/docs/en/costs)).
- **Turns the project starts on purpose (from the specs):**
  - Every spec pokes `answer-desk` every 15 minutes while it waits on Alex. Each poke is a new turn in `answer-desk`, carrying that session's whole context.
  - `s-d9-legibility` runs `/loop 30m` all night (legibility\CLAUDE.md, SPEC.md §10).
  - `website` runs a 30-minute check of `Addvery Research\` (website\SPEC.md step 7).
  - `watcher` sweeps hourly and messages each idle owner to commit (GIT.md).
  - Several specs wait with Monitor on `check_gate.py` every 300 seconds. That's a shell loop and costs nothing until it fires.
  - About 13 sessions fork at about 17:50, and each successor re-reads its reading list, the 27 KB charter included.
  - Image-heavy subagent work runs overnight: frame checks every 2 seconds in legibility clips, and every 5 seconds in the Canva video's screen-care pass.
- *Inference (no number is possible):* Anthropic publishes no conversion from tokens to plan quota, and I didn't read Alex's usage. So I can't say at what hour the limit would hit. What the evidence does support: with 12 to 19 sessions on Opus at high effort, Opus subagents, and periodic wake-ups, the burn rate is roughly an order of magnitude above one session's. That's the setup in which the reports above ran out within hours.

#### B3. What happens at the limit, by session type

- **Interactive sessions wait and carry on by themselves.** "When a claude.ai usage limit stops Claude mid-task, Claude Code waits in the open session and continues the task on its own after the limit resets. Automatic continue is on by default in interactive sessions signed in with a claude.ai subscription. Requires Claude Code v2.1.234 or later" ([Interactive mode, "Wait for a usage limit to reset"](https://code.claude.com/docs/en/interactive-mode)).
  - It re-arms "at most twice in a row".
  - It doesn't start by itself for "A reset more than 24 hours away: a weekly limit can reset days out."
- **Background sessions don't get the wait.** Under "Claude Code doesn't offer the wait at all in these cases", the same page lists "Background sessions and `-p` runs: the menu row isn't available." Moving a conversation "to … a background session" also ends a wait that's under way (same page).
  - *Inference:* every session in this project was launched with `claude --bg`. So a session that hits the limit overnight stops at that point and doesn't resume after the reset, unless one of the two mechanisms below is in place.
- **Mechanism 1, the retry watchdog (not set on this machine).** `CLAUDE_CODE_RETRY_WATCHDOG`: "Set to `1` for unattended sessions such as eval harnesses, CI jobs, or remote workers. Retries `429` and `529` capacity errors indefinitely… The watchdog backs off up to 5 minutes between attempts, or until the limit resets when the response carries a rate-limit reset time, so a session that hits a usage limit waits out the remaining window" ([Environment variables](https://code.claude.com/docs/en/env-vars)).
  - `CLAUDE_CODE_RETRY_WATCHDOG_USAGE_LIMIT_RECHECK_MS` (v2.1.305+, so this machine's 2.1.316 qualifies) checks whether the limit has lifted, at intervals from 1 minute to 3 hours.
  - `CLAUDE_CODE_RETRY_WATCHDOG_MAX_WAIT_MS` caps the wait. Unset means no cap.
  - The watchdog "fails at once when a standard-speed request gets a `429` that reports a spend limit or exhausted usage credits."
  - The probe found the variable in neither the environment nor user settings.
- **Mechanism 2, usage credits.** Requests "keep working" on pay-as-you-go until the monthly spend limit is reached (B1). On Pro and Max, "when you reach your spend limit with usage credits still available, Claude Code prompts you to raise or remove the limit" ([Manage costs](https://code.claude.com/docs/en/costs)).
  - *Inference:* that prompt needs someone at the session. Unattended, it's another stopping point.
- **Model switching only helps with a model-specific limit.** After "You've hit your Opus limit", switching to a model outside that family keeps working. After a session or weekly limit, which is "shared across all models", switching doesn't help ([Manage costs, "When a developer asks about a limit"](https://code.claude.com/docs/en/costs)).
- **Capacity errors are a separate thing.** A 529 "is not your usage limit and doesn't count against your quota". By default it's retried up to `CLAUDE_CODE_MAX_RETRIES` (10) times, then reported ([Errors](https://code.claude.com/docs/en/errors); [Environment variables](https://code.claude.com/docs/en/env-vars)). The watchdog retries these indefinitely too.

#### B4. What else stops a background session overnight

- **Sleep pauses sessions without killing them.** "Sessions are also preserved when your machine sleeps. Their processes resume on wake" ([Agent view](https://code.claude.com/docs/en/agent-view)). But nothing progresses while the machine is asleep.
  - *Probe:* sleep on mains power is set to never (AC index 0). On battery it's 5 minutes (DC index 300 s), and hibernate on battery is 20 minutes. No battery reported to WMI.
  - *Inference:* this is a desktop, or the battery isn't reported. Either way, sleep is a risk only if the machine loses mains power.
- **A reboot or shutdown stops every session, and nothing restarts them unattended.** "Shutting down or restarting your machine stops running background sessions." Within 48 hours "the session shows as failed. Attach or reply to it and it restarts from its saved conversation" ([Agent view](https://code.claude.com/docs/en/agent-view)). "Sessions are local: … They are preserved across sleep but stop if the machine shuts down" (same page, Limitations).
  - **Windows Update restarts outside active hours.** "Automatic restarts after an update occur outside of the active hours" ([Microsoft Learn, Manage device restarts after updates](https://learn.microsoft.com/en-us/windows/deployment/update/waas-restart)).
  - *Probe:* active hours are 09:00 to 03:00. So 03:00 to 09:00 is a window in which Windows may restart on its own. No reboot was pending at about 15:10 (both `RebootRequired` and `RebootPending` absent). An update downloaded tonight could still create one.
- **Idle, unattached sessions are stopped after about an hour.** "Finished or waiting for your next message, and unattached for about an hour: the supervisor stops the process to free resources… the next time you attach or reply, the session resumes where it left off. Pin a session with `Ctrl+T` to keep its process running" ([Agent view](https://code.claude.com/docs/en/agent-view)).
  - What counts as working, and isn't stopped: "A running subagent, workflow, or monitor counts as working, and so does a pending session-scoped scheduled task, such as a `/loop` wakeup" (same page).
  - **Gap:** the docs don't say whether a cross-session message counts as a "reply" that wakes a stopped process. The messaging page says the listing shows other local sessions only when they bind an inbox socket ([Cross-session messaging](https://code.claude.com/docs/en/cross-session-messaging)).
  - *Inference:* a session whose process was stopped may not get build requests or pokes until someone attaches. The sessions most exposed are the ones that wait for messages without a loop of their own: `website` between requests, `answer-desk` overnight, `orchestration` serving change requests.
- **Needs-input stalls.** A background session waits under "Needs input" for "an answer to a question, a permission decision, or another prompt only you can answer, such as a sandbox prompt … or an MCP server's request for input" ([Agent view](https://code.claude.com/docs/en/agent-view)).
  - *Probe:* user settings set `defaultMode: bypassPermissions`, so ordinary permission prompts are skipped. `crossSessionInbound: accept`, so peer messages aren't held for approval. The docs say that in bypass mode, without an explicit value, messages would be held while no terminal is attached ([Cross-session messaging](https://code.claude.com/docs/en/cross-session-messaging)).
  - Still able to stall: MCP sign-in dialogs, sandbox prompts, a GetSales `commit_token` preview (getsales\SPEC.md routes those to Alex), and the usage-credit spend-limit prompt.
- **The supervisor itself.** If the supervisor process is ended from outside, "on macOS and Linux, your sessions stop unless a new supervisor connects within about a minute" ([Agent view](https://code.claude.com/docs/en/agent-view)). The page doesn't describe Windows here (gap). A process that exits unexpectedly while the supervisor runs is restarted. After an auto-update the supervisor restarts itself, and "Sessions that are working, waiting on you, or attached aren't interrupted" (same page).

#### B5. Would anyone notice?

- **Agent view would.** It marks sessions as `Needs input`, failed or stopped, notifies "when a local background session starts needing your input, finishes, or fails", and `claude agents --json` reports a `blocked` state ([Agent view](https://code.claude.com/docs/en/agent-view)). But that only helps someone looking at it.
- **The project's own monitors would not.** `watcher` looks for uncommitted work and pushes (GIT.md). `briefing` reads snapshots from disk (briefing\CLAUDE.md). The pokes all flow into `answer-desk`, which is itself a background session.
  - *Inference:* a session that has stalled at a limit, failed after a reboot, or been stopped while idle looks the same on disk as a session with nothing to do: no new commits. The first anyone would know is the morning cleanup.
- **Recovery is possible in the morning.** A failed session restarts from its saved conversation when attached or replied to within 48 hours, and `claude respawn --all` restarts every running session "with its conversation intact" ([CLI reference](https://code.claude.com/docs/en/cli-usage)). So the risk is lost overnight hours, not lost work.

#### B6. Which sessions are exposed to which stop (inference, from the specs and B3 and B4)

| Session (roster name) | Overnight job, per its spec | Usage limit | Idle stop after about an hour | Reboot 03:00 to 09:00 |
| --- | --- | --- | --- | --- |
| `s-d9-legibility` | `/loop 30m`; reviews filed clips, cuts video, sends build requests | Exposed, and image-heavy | Protected by its loop | Exposed; its loop goes with it |
| `website` | Builds and deploys from build requests; brand pass when the capture lands | Exposed; long, growing context | Exposed between requests, unless its 30-minute check runs as `/loop` or it's pinned | Exposed |
| `answer-desk` | Takes every poke and TASK line | Exposed; a full-context turn per poke | Exposed if the pokes stop | Exposed |
| `orchestration` | Serves change requests; files held ones in `changes\` | Exposed | Exposed | Exposed |
| `watcher` | Hourly sweep and push | Exposed | Depends on how its hourly cadence runs (not read) | Exposed; nothing gets pushed for the morning (DoD-2) |
| Spec successors after the 17:50 forks (S-D1, S-D3 to S-D7, S-D10) | Finish their own work, decide on defaults (P5) | Exposed; Opus subagents | Exposed once their work is done or blocked | Exposed |
| `s1-research` and any `rw-*` workers | Approved lists may keep running (S1 §3 step 8) | Exposed; subagent fan-out | Exposed | Exposed |

*Inference:* `website` and `s-d9-legibility` carry the most overnight DoD weight (DoD-13 and DoD-18 to DoD-21) and also spend the most per turn, so they're the first to watch.

#### B7. A worked example of a silent stop (inference, illustrative times only)

1. 17:50: about 13 sessions fork. Each successor reads its reading list and starts its overnight work on Opus, with Opus subagents.
2. Around midnight: the five-hour window runs out. Every background session that sends a request now gets the usage-limit error. None of them waits for the reset (B3), and the watchdog isn't set.
3. Around 05:00: the window resets. Nothing resumes, because nothing is waiting, and no person is attached to send a reply.
4. If the weekly limit was the one hit, the reset falls at the account's weekly time, which could be days away.
5. 08:00: the cleanup session finds failed rows in `claude agents`, roughly the same commits on disk as at midnight, and nothing in `watcher` or `briefing` that flagged it. The work isn't lost (B5), but the overnight hours are.

The same sequence with option 2a or 2b in part (c): step 2 becomes "carry on, on credits" or "wait, then carry on at the reset".

### Evidence gaps

- **Alex's plan tier, his current five-hour and weekly usage, and his weekly reset time.** I didn't read them, because they're account data. All three decide how close the risk is, and `/usage` or Settings > Usage shows them in seconds.
- **The quota itself.** Anthropic publishes no token or message numbers for any plan, so I can't forecast the hour a limit would hit. The third-party figures conflict.
- **Exactly what a background session shows at a usage limit** (failed, needs input, or something else). The docs say only that the wait isn't offered.
- **Whether a cross-session message wakes a session the supervisor stopped while idle.** The docs are silent. A two-minute test would settle it.
- **Whether a changed environment variable reaches sessions already running.** *Inference:* it doesn't. A session reads its environment at start, so a running session would need `claude respawn` or the 17:50 fork to pick it up. Not verified.
- **Windows-specific supervisor behaviour** when the supervisor is ended from outside.
- **The "limit reset" feature and the Opus 5.5 limit changes** rest on third-party reports. I didn't open Anthropic's own pages for them.
- **Lid and power-button behaviour,** in case this is a laptop on a dock. Not probed.

---

## Part (c): Recommendations

Evidence plus options. Every call here is Alex's. Tags: **operator decision**, **assistant-actionable** (a session can do it once he says so), **verify first**.

### 1. Look at the number before 17:50 (operator decision, about 10 seconds)

Run `/usage` in any session, or open Settings > Usage on claude.ai. Note three things: the five-hour bar, the weekly bar, and the weekly reset time. That one reading decides how much of what follows matters:

- **Weekly bar low and the reset after tomorrow morning:** the five-hour windows are the main risk, and the watchdog (option 2b) covers them.
- **Weekly bar already high, or the reset falls after the morning cleanup:** a weekly hit tonight would stop everything until the reset. Only usage credits (2a), a reset (2d) or a lighter load (3) avoid that.

### 2. Give the overnight run a way past the limit (operator decision; settings changes are assistant-actionable once he picks)

| Option | What it does | Cost | Catch |
| --- | --- | --- | --- |
| a. Turn on usage credits, with a monthly spend cap | Past either limit, requests switch to pay-as-you-go and keep going | Standard API rates (Opus 5.5 reported at $4 / $20 per million input / output tokens, cache reads cheaper), up to the cap he sets | Hitting the cap brings a prompt that needs a person, so the cap should be one he's comfortable reaching unattended |
| b. Set `CLAUDE_CODE_RETRY_WATCHDOG=1` and `CLAUDE_CODE_RETRY_WATCHDOG_USAGE_LIMIT_RECHECK_MS` (for example 600000, ten minutes) in the user settings `env` block | A background session that hits a limit waits it out, then carries on | Nothing extra | A weekly hit means waiting until the weekly reset, which may come after the morning. With credits on, it fails at once on a spend-limit 429 |
| c. Both a and b | Credits carry the run. The watchdog covers capacity errors (529) and short throttles | As a | As a |
| d. Use a limit reset, if his account shows one in Settings > Usage | Restores the five-hour or weekly limit once | Nothing | Verify first: third-party reports only. It's one use, so best kept for a morning emergency |
| e. Upgrade to Ultra | Verified Ultra has no five-hour limit | Not researched | Still has a weekly limit |
| f. Change nothing | | | A limit hit at night stops the sessions it hits until the morning cleanup |

**Timing.** *Inference:* a new setting reaches a session only when it starts. Every spec already forks at about 17:50, so a change made before then reaches every overnight successor with no extra restarts. `claude respawn --all` is the alternative for anything that doesn't fork, but it restarts sessions mid-task.

### 3. Lower the burn rate (operator decision)

- **a. Subagents on Sonnet (or Haiku for mechanical work) instead of Opus 5.5.** At the moment `CLAUDE_CODE_SUBAGENT_MODEL` sends every subagent to Opus 5.5. The Claude Code docs recommend smaller models for simple subagent tasks. The trade-off is quality on research and writing subagents, which a spec can protect by naming Opus where it matters.
- **b. Lower effort overnight,** from xhigh to high or medium, for sessions doing routine work (sweeps, commits, file checks). Thinking tokens bill as output.
- **c. Stop sessions whose job is done** before the overnight run. Candidates from the roster: `wave2-specs` ("Then stops"), and `accidental-session-kill-recovery` ("Temporary"). The daemon counts 12 workers against 10 running roster rows, so there may be strays. `claude agents` shows them.
- **d. Quiet the poke traffic after 18:00.** From 18:00 every spec decides on its own (P5), but most specs still say to poke "every 15 minutes while still waiting". Each poke is a full-context turn in `answer-desk` and in the sender. A one-line change through `orchestration` ("no pokes after 18:00") would cut that. This is a spec change, so it goes through S2.
- **e. Keep the 17:50 forks lean.** Successors that read only HANDOFF.md and their SPEC, not the whole reading list again, start smaller and stay cheaper for the whole night.

### 4. Protect the machine overnight (operator decision, about 2 minutes, assistant-actionable only if he asks)

- **a. Windows Update.** Either move active hours to cover tonight (the maximum range is 18 hours, so for example 14:00 to 08:00 covers 18:00 to the morning cleanup), or pause updates for a week in Settings > Windows Update. Today's 09:00 to 03:00 leaves 03:00 to 09:00 open for a restart.
- **b. Power.** Sleep on mains is already "never". Keep the machine on mains power. If it's a laptop, check what closing the lid does (not probed).

### 5. Keep the message-driven sessions awake (verify first, then operator decision)

- **Verify first (2 minutes):** does a SendMessage wake a session that the supervisor stopped after an hour idle? The docs don't say.
- **If it doesn't,** the options are:
  - pin the sessions that must take messages overnight with `Ctrl+T` in `claude agents` (likely `website`, `answer-desk`, `orchestration`);
  - or give each of them a light `/loop`, which counts as working but costs a full-context turn each time it fires.
- `s-d9-legibility` already runs `/loop 30m`, so it isn't exposed.

### 6. Make a stall visible (operator decision; assistant-actionable)

- **a.** `briefing`'s `collect.py` is plain Python that "uses no tokens". It could also record the states from `claude agents --json` (working, blocked, failed, stopped), so the morning view shows which sessions stalled, and when. Screen care: the JSON includes session names and summaries, so it should stay in a git-ignored file.
- **b.** Make the morning cleanup session's first step `claude agents`, then attach to or respawn each failed or blocked session from its saved conversation, before anything else.
- **c.** Or neither, and rely on the 48-hour recovery: work isn't lost, only the hours.

### 7. If Alex has only two minutes

Ranked by protection for the time spent. All three are his decisions:

1. Read `/usage` (recommendation 1).
2. Choose 2a, 2b or 2c before 17:50, so the forked successors start with it.
3. Move active hours or pause updates (4a).

Everything else is a refinement.

### 8. Where these land

- Options 2, 3a, 3b, 4 and 5 are machine-wide settings and only Alex can choose them.
- 3c, 3d, 3e and 6 touch the roster and the specs, so they'd go through `orchestration` (S2) once he picks.
- None of this changes a DoD item. All of it protects the items due by morning.

---

## Sources

Anthropic, primary:
- Using Claude Code with your Pro or Max plan (Claude Help Center, "Updated this week"): https://support.claude.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan
- What is the Max plan (Claude Help Center): https://support.claude.com/en/articles/11049741
- Usage credits for paid Claude plans (Claude Help Center): https://support.claude.com/en/articles/12429409-extra-usage-for-paid-claude-plans
- Claude Code docs, Agent view (background sessions, supervisor, limitations, version history): https://code.claude.com/docs/en/agent-view
- Claude Code docs, Interactive mode, "Wait for a usage limit to reset": https://code.claude.com/docs/en/interactive-mode
- Claude Code docs, Manage costs effectively: https://code.claude.com/docs/en/costs
- Claude Code docs, Environment variables (`CLAUDE_CODE_RETRY_WATCHDOG`, recheck and max-wait, `CLAUDE_CODE_MAX_RETRIES`, `CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS`, `CLAUDE_CODE_SUBAGENT_MODEL`): https://code.claude.com/docs/en/env-vars
- Claude Code docs, Errors (529, 429, usage-limit messages, retry behaviour): https://code.claude.com/docs/en/errors
- Claude Code docs, Cross-session messaging (delivery as a new turn, inbound controls, listing): https://code.claude.com/docs/en/cross-session-messaging
- Claude Code docs, CLI reference (`--bg`, `claude agents`, `daemon`, `respawn`): https://code.claude.com/docs/en/cli-usage
- Anthropic API pricing: https://platform.claude.com/docs/en/about-claude/pricing

Microsoft, primary:
- Manage device restarts after updates (Microsoft Learn, updated 2 Oct 2025): https://learn.microsoft.com/en-us/windows/deployment/update/waas-restart

Third-party (labelled where used; not relied on for numbers):
- SmartScope, Claude Max limits and Opus 5.5 (1 Oct 2026): https://smartscope.blog/en/blog/claude-opus-5-5-weekly-limit-max-plan-2026/
- SmartScope, five-hour limit reset: https://smartscope.blog/en/blog/claude-five-hour-limit-reset-2026/
- pasqualepillitteri.it, experimental limit reset with Opus 5.5: https://pasqualepillitteri.it/en/news/17905/claude-free-usage-limit-reset-opus-5-5
- mixed-news, Opus 5.5 pricing and Pro and Max limits: https://mixed-news.com/en/?p=31973
- Notebookcheck, Opus 5.5 in Pro: https://www.notebookcheck.net/Claude-Opus-5-5-is-included-with-Pro-and-Free-still-misses-out.1406452.0.html
- DEV Community, "Claude Code sub agents burn out your tokens": https://dev.to/onlineeric/claude-code-sub-agents-burn-out-your-tokens-4cd8
- claudeissues.com, parallel sub-agents inherit full parent context: https://claudeissues.com/issue/56068-bug-parallel-sub-agents-inherit-full-parent-context-causing-excessive-token-cons
- claudeissues.com #10333, Opus weekly limit reached on Max 20x: https://claudeissues.com/issue/10333-bug-opus-weekly-limit-reached-on-max-20x-plan
- morphllm, Claude Code usage limits per plan: https://www.morphllm.com/claude-code-usage-limits
- ai-toolbox, Claude usage limits 2026: https://www.ai-toolbox.co/claude-management-and-productivity/claude-usage-limits-2026

Local, read-only (project files):
- `CHARTER.md` (P3, P5, P6, run order, risks), `orchestration\DOD-DRAFT.md`, `SESSIONS.md`, `GIT.md`, `orchestration\SPEC.md`, `research\SPEC.md`, `research\lists\L-01` to `L-05`, and a grep of every wave-2 `SPEC.md` and `CLAUDE.md` for overnight, poke, loop and Monitor cadences.

Local, read-only (machine probe, about 15:10 Prague):
- `claude --version`; `claude daemon status` (worker count); named fields only from `~/.claude/settings.json` (`defaultMode`, `model`, `CLAUDE_CODE_SUBAGENT_MODEL`, `effortLevel`, `crossSessionInbound`); presence of `CLAUDE_CODE_RETRY_WATCHDOG` (absent); `powercfg` sleep and hibernate timeouts; Windows Update active hours; the two reboot-pending registry flags.
