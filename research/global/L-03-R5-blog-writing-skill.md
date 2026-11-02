# L-03 R5: The best skill to write blogs with

**Question, verbatim (L-03, R5):** "Research what's the best skill to write blogs with." As written on the list: "Which Claude skill (the marketing plugin's content-creation and draft-content skills already installed here, Anthropic's public skills, community copywriting skills) is best for turning a dictated transcript into a near-final blog post, what does each actually do, and which one should the blog pipeline ask `orchestration` to turn on? (Alex's rule: no copywriting without a copywriting skill.)"

**Alex's rule, verbatim (OT-04):** "Do not do any copywriting without identifying which skill you need to turn on, telling the orchestrator to turn it on for you. Do not do any copywriting without a copywriting skill."

2026-11-02 · session s1-research subagent · item 5 of 9 on list L-03 · serves DoD-14, DoD-15 · readers S-D4, S-D5 · depth: not deep

## Method

All of it on 2 Nov 2026, about 16:25 to 16:45 Prague, in one sitting. Nothing was installed, enabled or run.

- **Local, read only:** the three marketing skills named in the brief (`C:\Users\alder\.claude\plugins\cache\knowledge-work-plugins\marketing\1.2.0\skills\{content-creation,draft-content,brand-review}\SKILL.md`); a search of every `SKILL.md` under `C:\Users\alder\.claude\plugins` (384 files, `.trash` skipped) for writing, copy, blog, content, voice and editing skills; the Tribe AI `brand-voice` plugin in the local marketplace clone (`...\plugins\marketplaces\knowledge-work-plugins\partner-built\brand-voice\`); `installed_plugins.json`; and only the `enabledPlugins` key of `C:\Users\alder\.claude\settings.json` and the hackathon's `.claude\settings.json` files. I also diffed the synced copy of the marketing plugin against the cached copy.
- **Project context:** `CHARTER.md`, `research\lists\L-03-blog.md`, `blog-pipeline\SPEC.md`, and a look at `blog-pipeline\prompts\5-edit.md` (v0.1), to see how a skill would fit the existing stages.
- **GitHub, read only via `gh`:** `anthropics/skills`, `anthropics/knowledge-work-plugins`, `coreyhaines31/marketingskills`, `blader/humanizer`, `ComposioHQ/awesome-claude-skills`, `hardikpandya/stop-slop`, `obra/the-elements-of-style`: licence, last push, stars, skill lists and the SKILL.md of each candidate.
- **Web:** three WebSearch queries (community copywriting skills; humanizer; transcript to blog post skills); WebFetch of the Claude Code docs on skills and on plugin commands, and of one 2026 roundup of marketing skills (Koppenhaver, May 2026).

Every claim cites a link or a local path. **Inference** is marked as such.

## Verdict

1. **No converged "best blog skill" exists, and no skill I found is built for transcript-to-post.** Searches turned up roundups and directories, not a consensus. The most specific 2026 recommendation pairs Corey Haines's `copywriting` and `copy-editing` skills ("Draft with one, polish with the other") ([Koppenhaver](https://claudecodeformarketers.com/blog/claude-code-skills-for-marketers/)). That pair is written for page copy, not long-form posts.
2. **A copywriting skill is already on, with nothing to install.** `marketing@synced` (Anthropic's marketing plugin 1.2.0, synced from claude.ai) is enabled at user scope (`C:\Users\alder\.claude\settings.json`, `enabledPlugins`). So `marketing:content-creation`, `marketing:draft-content` and `marketing:brand-review` load in every session on this machine, S-D4's and S-D5's included, and this subagent sees them too. They're generic channel templates, though. None of them takes a transcript, and none has a rule to keep a speaker's voice. Their blog advice (a statistic hook, "at least one data point … per section") pulls against the pipeline's "no claim that isn't in the dictation".
3. **For the voice, the best-evidenced candidate is `blader/humanizer`** (MIT, about 64k stars, last pushed 28 Oct 2026, v3.1.0). Its stated job is "Rewrite AI-sounding text so it reads like the writer without changing what it says". It matches a writing sample when given one, and it forbids adding facts ([SKILL.md](https://github.com/blader/humanizer/blob/main/SKILL.md)). It's an editor, not a drafter, so it fits stage 5 (Edit), not stage 4 (Draft). Turning it on is one plugin install or one file copy, which `orchestration` would do.

**Options for Alex** (the evidence follows; the choice is his):
- **A.** The marketing plugin alone (`content-creation` for the draft, `brand-review` for a claims check). It costs nothing and satisfies the rule's wording.
- **B.** A, plus `humanizer` for the edit stage. It costs one install and targets the "doesn't sound like me" risk directly.
- **C.** Corey Haines's `copywriting` and `copy-editing`. It's the only community pair with a 2026 recommendation, but it's built for pages.
- **D.** Tribe AI's `brand-voice`, to build a written voice guide for Alex from his own transcripts. It's the heaviest option and is built for Cowork.

**Inference:** B fits the pipeline's stages best: one skill per stage, and the pipeline's own prompts stay the source of the rules.

## Evidence

### 1. Skills already installed here

**What's enabled.** `enabledPlugins` in `C:\Users\alder\.claude\settings.json` shows `marketing@synced: true` and `marketing@knowledge-work-plugins: false`. No `enabledPlugins` key is set in `Hire me hackaton\.claude\settings.json` or `blog-pipeline\.claude\settings.json`. The synced copy (`...\plugins\synced\...\88ac0c0d-...\skills\`) matches the cached 1.2.0 copy for all three skills: `diff --strip-trailing-cr` shows no differences. Upstream is still 1.2.0, and the last change to `marketing/` (21 Sep 2026) was a README fix ([commits](https://github.com/anthropics/knowledge-work-plugins/commits/main/marketing)). Licence: Apache-2.0 ([repo](https://github.com/anthropics/knowledge-work-plugins)).

**`marketing:content-creation`** (local path above; `user-invocable: false`). This is a reference skill, not a workflow. It holds structure templates for six content types; for a blog post: a headline of 60 characters or fewer with the keyword, an intro of 100 to 150 words with a hook "question, statistic, bold claim", 3 to 5 H2 sections, a conclusion of 75 to 100 words with a CTA, and a meta description under 160 characters. It also covers channel best practice ("8th-grade reading level", "at least one data point, example, or quote per section"), an on-page SEO checklist, headline and hook formulas, and CTA rules.
- Inputs: none defined. Outputs: none defined; it shapes whatever the model writes.
- Transcript to long-form: no transcript handling and no voice rule. The structure and SEO parts are useful for stages 3 and 6.
- Because `user-invocable` is false, it doesn't appear in the `/` menu; Claude loads it itself, or through the Skill tool ([Claude Code docs, skills](https://code.claude.com/docs/en/skills)).

**`marketing:draft-content`** (`/marketing:draft-content "<content type and topic>"`). This is a workflow. It gathers six inputs (content type, topic, audience, 2 to 4 key messages, tone, length) and says "If not provided, ask before proceeding". It applies a brand voice from "their local settings file", or asks for one. Blog output: 2 to 3 headline options, a hook intro, 3 to 5 sections, a CTA conclusion and an SEO keyword suggestion. It then adds notes on voice and SEO and ends by asking "Would you like me to revise any section…?".
- Transcript to long-form: it drafts long-form from a brief, not from a transcript. It's interactive by design.

**`marketing:brand-review`** (`/marketing:brand-review`). This is a reviewer. It checks content against a brand guide when one is configured (voice and tone, terminology, messaging pillars, style rules), or does a generic clarity and consistency review. It always flags "Unsubstantiated claims — superlatives … without evidence" and similar legal issues. Output: a summary, a table of issue, location, severity and suggestion, before/after rewrites for the top 3 to 5 issues, then a question.
- Transcript to long-form: not a writer. It's useful as a claims check after the edit stage.

**Other writing-adjacent skills on disk** (the description lines were read; none is a long-form writer):
- `customer-support:kb-article`: help-centre articles.
- `design:ux-copy`: microcopy.
- `sales:draft-outreach`: outreach messages.
- `small-business:content-strategy`: a content brief from PayPal and QuickBooks sales data.

The last three sit in the marketplace clone and aren't installed (`installed_plugins.json`). `getsales-gtm`'s `outreach-draft` was left unopened (screen care); going by its name, it's outreach, not long-form (inference).

**`brand-voice` (Tribe AI, partner plugin)** is in the local marketplace clone but not installed. It's MIT ("Copyright (c) 2025 Tribe AI", `LICENSE`). It has three skills:
- `discover-brand` searches Notion, Drive, Confluence, Gong and others.
- `guideline-generation` turns documents or "Conversation transcripts" into a "We Are / We Are Not" voice guide with confidence scores.
- `brand-voice-enforcement` writes against that guide and hands "complex or long-form content" to a `content-generation` agent.

It ships seven MCP connectors (README, "MCP Connectors"), and its Quick Start says "Install the plugin and open Claude Cowork". It's the only skill found that learns a voice from transcripts. It was built for a company's brand, not one person's voice.

### 2. Anthropic's public skills

The `anthropics/skills` repo lists 19 skills ([repo](https://github.com/anthropics/skills); pushed 28 Oct 2026). None is a blog or copywriting skill. The writing-related ones:
- **`doc-coauthoring`**: a three-stage, interactive workflow ("Context Gathering … Refinement & Structure … Reader Testing") for "documentation, proposals, technical specs, decision docs" ([SKILL.md](https://github.com/anthropics/skills/blob/main/skills/doc-coauthoring/SKILL.md)). It asks the user questions throughout, so it doesn't suit an unattended stage. Its reader test ("Test the doc with a fresh Claude (no context)") matches what stage 5 already does with a fresh editor.
- **`internal-comms`**: status reports, newsletters and FAQs ([SKILL.md](https://github.com/anthropics/skills/blob/main/skills/internal-comms/SKILL.md)).
- **`brand-guidelines`**: Anthropic's own brand. Not relevant.

Licence: the repo README says "Many skills in this repo are open source (Apache 2.0)", with docx, pdf, pptx and xlsx source-available. The API reports no top-level licence.

Anthropic's marketing plugin (section 1) is therefore Anthropic's only blog-writing skill.

**How skills load** ([Claude Code docs, skills](https://code.claude.com/docs/en/skills)). Claude picks a skill by its `description`, and the body loads only when used. A plugin skill is called as `/plugin-name:skill-name`. Subagents can preload skills through a `skills` field in the agent's definition. Changes to `~/.claude/skills/` or a project's `.claude/skills/` are picked up "within the current session, without a restart", but a skills directory that didn't exist at session start needs `/reload-skills`. Plugin enable and update need `/reload-plugins` in a running session ([plugin commands](https://code.claude.com/docs/en/plugins/cli-reference.md)).

### 3. Community skills

| Repo | Skill | Licence | Last push | Stars (GitHub API, 2 Nov) | What it is |
| --- | --- | --- | --- | --- | --- |
| [blader/humanizer](https://github.com/blader/humanizer) | `humanizer` v3.1.0 | MIT | 28 Oct 2026 | ~63.9k | Editor that removes AI tells, based on Wikipedia's "Signs of AI writing" |
| [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) | `copywriting` v2.3.2, `copy-editing` (53 skills in all) | MIT | 31 Oct 2026 | ~58.0k | Conversion copy for pages; editing existing copy |
| [hardikpandya/stop-slop](https://github.com/hardikpandya/stop-slop) | `stop-slop` | MIT | 17 Mar 2026 | ~18.5k | "A skill file for removing AI tells from prose" (description only read) |
| [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) | `content-research-writer` | none stated | skill folder last changed 17 Oct 2025 | ~78.6k (the list) | Collaborative research, outline and citations writer |
| [obra/the-elements-of-style](https://github.com/obra/the-elements-of-style) | Strunk's text for agents | none stated | 12 Aug 2026 | ~0.6k | Style reference, not a workflow |

**`humanizer`** ([SKILL.md](https://github.com/blader/humanizer/blob/main/SKILL.md), 397 lines). Its rules: "Keep what it says. Do not make anything up." "Do not add a fact, name, number, date, quote, or citation unless it comes from the source or the user." On voice: "If the user gives a writing sample … match its sentence length, word choice, punctuation, openings, and transitions. The sample overrides the patterns below." Also: "Blog posts … keep the writer's opinions, uncertainty, mixed feelings, humor, and asides." It has a "File mode" that writes only the final text to a named file, and an "Embedded mode" for use inside another task. Its patterns overlap the pipeline's banned list in `blog-pipeline\prompts\5-edit.md`: "Not X but Y", triads, dashes, stock AI words, one-line closers.
- Install ([README](https://github.com/blader/humanizer)): `/plugin marketplace add blader/humanizer` then `/plugin install humanizer@humanizer`, called as `/humanizer:humanizer`. It needs Claude Code 2.1.142 or newer; otherwise `npx skills add blader/humanizer --global --agent claude-code`.
- Its pattern count has moved fast: 24 earlier, 29 by 2.5.1 ([Gigazine](https://gigazine.net/gsc_news/en/20260530-humanizer), [brightcoding](https://www.blog.brightcoding.dev/2026/06/07/humanizer-the-essential-tool-to-strip-ai-patterns-from-text)), and now 3.1.0.

**`copywriting`** ([SKILL.md](https://github.com/coreyhaines31/marketingskills/blob/main/skills/copywriting/SKILL.md), 339 lines). Scope: "marketing copy for any page, including homepage, landing pages, pricing pages…". Its useful parts:
- "Diagnose the Situation First". Case B, "Real voice present", is to "Restore it. Keep their argument and vocabulary".
- "If they write 'stuff' and 'ship,' don't upgrade to 'solutions' and 'deploy.'"
- A three-question gate that includes the swap test ("Could a competitor write this exact sentence?").
- `[NEED: ...]` markers, which work like the pipeline's `[Alex: ...]` markers.

It reads `.agents/product-marketing.md` for context. There's no blog or long-form writing skill in the repo; `content-strategy` plans topics ("For writing individual pieces, see copywriting"). Install: `npx skills add coreyhaines31/marketingskills --skill copywriting copy-editing`, or `/plugin marketplace add coreyhaines31/marketingskills` then `/plugin install marketing-skills`, which installs all 53 skills. The repo's README notes that `/plugin` is only available in an interactive CLI session.

**`content-research-writer`** ([SKILL.md](https://github.com/ComposioHQ/awesome-claude-skills/blob/master/content-research-writer/SKILL.md)). It acts "as your writing partner … while maintaining your unique voice", but it's built around research and citations and section-by-section feedback with the user. It has no transcript input and hasn't been updated since Oct 2025.

**What the wider web says.**
- A 2026 roundup recommends `copywriting` plus `copy-editing` and the author's own "calibrated to how I actually sound" LinkedIn and tweet skills; it names no transcript or blog skill ([Koppenhaver, 27 May 2026](https://claudecodeformarketers.com/blog/claude-code-skills-for-marketers/)).
- Secondary, mostly undated posts converge on the do-it-yourself pattern: a voice file built from your own writing or transcribed voice memos, applied to transcripts ([dupple](https://www.dupple.com/tutorial/reuse-video-transcripts-seamlessly-across-multiple-platforms), [aidecode](https://aidecode.substack.com/p/building-a-content-repurposing-skill), [mcpmarket "Article Writing & Voice Capture"](https://mcpmarket.com/tools/skills/article-writing-voice-capture)). I didn't verify these individually.

### 4. Comparison

"Fit" is judged from each SKILL.md's text, not from a test run (see Evidence gaps).

| Skill | Fit for transcript to post | Keeps the speaker's voice | B2B long-form | Cost to turn on | Risks |
| --- | --- | --- | --- | --- | --- |
| `marketing:content-creation` (Anthropic) | Low: no transcript input; structure and SEO only | No rule for it | Medium: blog template, SEO checklist | **None: already enabled** (`marketing@synced`) | Hook-with-statistic and "data point per section" invite invented numbers |
| `marketing:draft-content` (Anthropic) | Low: drafts from a brief, not a transcript | Only via a "brand voice" setting | Medium | **None: already enabled** | Interactive: asks for six inputs, then asks to revise; can stall or guess in a subagent |
| `marketing:brand-review` (Anthropic) | Not a writer; a check stage | Checks against a guide, if one exists | Medium | **None: already enabled** | With no guide it's a generic review; the guide must be Alex's, not Addvery's |
| `humanizer` (blader) | High for the edit stage; not a drafter | **Yes: matches a sample, adds no facts** | High: "Blog posts … keep the writer's opinions" | One plugin install or one copied file | The name reads as "hiding AI" (see traps); fast version churn |
| `copywriting` / `copy-editing` (Haines) | Medium: case B "real voice present" fits; scoped to pages | Yes: "Keep their argument and vocabulary" | Low to medium: page copy | `npx skills add` of two skills, or a 53-skill plugin | Page and CRO framing; many extra skills competing on description |
| `brand-voice` (Tribe AI) | Medium: builds a voice guide from transcripts | Yes, once a guide exists | Medium | Plugin install (marketplace already added) plus 7 MCP connectors | Built for Cowork and company brand; heaviest setup |
| `doc-coauthoring` (Anthropic) | Low: interactive, for specs and proposals | Indirect | Low | Copy into the project | Asks the user questions at every stage |
| `content-research-writer` (Composio) | Low: research-led | Claims to | Medium | Copy | Stale (Oct 2025), no licence stated |

## Traps and gotchas

1. **"Turned on" isn't "used".** Skills load by description match. Each pipeline stage runs as a subagent handed "only its prompt and its input files" (SPEC §7), so a stage prompt that doesn't name the skill may never load it. Name it in the prompt ("load `marketing:content-creation` with the Skill tool before drafting"), or preload it through a `skills` field in an agent definition ([docs](https://code.claude.com/docs/en/skills)). This subagent can see the `marketing:*` skills in its own skill list, which suggests S-D4's subagents can too (inference; not tested from S-D4).
2. **`draft-content` is interactive.** "If not provided, ask before proceeding" and the closing question will stall an unattended stage, or make it invent defaults. Either hand it all six inputs in the brief or use `content-creation`, which is reference-only.
3. **The marketing templates invite invented facts.** "Hook … statistic", "at least one data point … per section" and "include … supporting evidence" collide with stage 3 ("No claim that isn't in the dictation") and stage 5 ("any invented statistic … banned"). If a stage uses the skill, its prompt has to say the pipeline's rules win where they conflict.
4. **Whose voice.** `draft-content` and `brand-review` look for a brand voice. SPEC §9 decides the posts are in Alex's name and voice, not Addvery's, and `Addvery Research\` is not read (SPEC §3). The voice sample therefore has to be Alex's: his own clean transcript (`1-clean.md`) is the obvious sample for `humanizer` or for a review (inference).
5. **The name "humanizer" may read badly on the site.** It's covered as a tool for slipping past Wikipedia's AI detection ([letsdatascience](https://letsdatascience.com/news/humanizer-helps-chatbots-evade-wikipedia-detection-d7087413)). Each post's "How this post was made" box says it was drafted with AI, and L-01's synthesis recommends a plain AI line on each post (rec. 4.1, SPEC §7 step 5). Listing a "humanizer" there could read as hiding the AI (inference). Describe the stage by what it does ("an editor pass that strips stock AI phrasing") or leave skill names off the box.
6. **Two rule sets.** `humanizer`'s patterns and the pipeline's banned list in `5-edit.md` overlap. If both run, one should be the source of truth, or `humanizer` runs as a separate pass after the trace pass so it can't reintroduce untraced claims (inference).
7. **Scope of an install.** `claude plugin install` defaults to user scope, which turns the plugin on for every session on the machine. `--scope project` writes the project's `.claude/settings.json` ([plugin commands](https://code.claude.com/docs/en/plugins/cli-reference.md)), a root-level file that only `orchestration` may edit. Whether a `.claude/skills/` folder inside `blog-pipeline\` is discovered when a session launches from that folder wasn't verified.
8. **Duplicate marketing plugins.** Enabling `marketing@knowledge-work-plugins` while `marketing@synced` is on would load two plugins named `marketing` with the same skills (inference; the outcome wasn't tested). Leave the local one off.
9. **The marketing plugin also carries MCP connectors** (Ahrefs, Amplitude, Figma, Notion, Similarweb, Supermetrics; their authenticate tools appear in this session's tool list). None is needed for blog writing. Don't authenticate any of them on camera (screen care).
10. **Version churn.** `humanizer` went from 24 patterns to 3.1.0 within months. A copied file should be pinned (HEAD `0ef9fe5bc357`, 28 Oct 2026) so S-D5's three posts run on the same rules as the test post.

## What would change the planned approach

- **If Alex reads "a copywriting skill" literally**, as a skill named for copywriting, only Haines's `copywriting` is named that way. The marketing plugin calls its skill "content-creation", but its description is about drafting marketing content, blog posts included.
- **If the test post comes back generic after the v0 run**, that's the case for adding `humanizer` at stage 5 with `1-clean.md` as the voice sample.
- **If Alex wants a reusable voice guide** for S-D5's three posts (and maybe S-D7), `brand-voice`'s `guideline-generation` on his dictations is the packaged route. A hand-written `VOICE.md` drawn from the test dictation is the light one (inference).
- **One skill per stage** maps onto SPEC §7:
  - 3 Outline and 6 Format: `content-creation` (structure, meta description under 160 characters, slug).
  - 4 Draft: `content-creation`, with the pipeline's rules overriding it.
  - 5 Edit: `humanizer` (option B), or `copy-editing` (option C).
  - A claims check after 5: `brand-review`'s "unsubstantiated claims" flags.

## How a session turns each one on

The calls below are for `orchestration`. S-D4 and S-D5 only name the skill in their stage prompts.

- **Option A: Anthropic marketing plugin.** Already on: `marketing@synced` is `true` in `C:\Users\alder\.claude\settings.json`. Check with `claude plugin list`. If it ever shows disabled: `claude plugin enable marketing@synced` ("For a plugin synced from claude.ai, pass `<name>@synced`", [plugin commands](https://code.claude.com/docs/en/plugins/cli-reference.md)), then `/reload-plugins` in each running session. Leave `marketing@knowledge-work-plugins` disabled.
  - A stage prompt invokes `marketing:content-creation` or `marketing:brand-review` through the Skill tool.
  - A person can type `/marketing:draft-content <type and topic>` or `/marketing:brand-review`.
- **Option B: `humanizer`, plugin route.** `claude plugin marketplace add blader/humanizer`, then `claude plugin install humanizer@humanizer` (user scope by default; add `--scope project` to limit it to the hackathon root's `.claude/settings.json`). Then `/reload-plugins` in S-D4 and S-D5. It's called as `humanizer:humanizer`, and needs Claude Code 2.1.142 or newer ([README](https://github.com/blader/humanizer)).
- **Option B: `humanizer`, copy route.** Copy `SKILL.md` at commit `0ef9fe5bc357` into `<project>\.claude\skills\humanizer\SKILL.md`, or run `npx skills add blader/humanizer --agent claude-code` (no `--global`) from the project root. It's called as `humanizer`. If `.claude\skills\` didn't exist when the session started, run `/reload-skills` once ([docs](https://code.claude.com/docs/en/skills)).
- **Option C: Haines's pair, copy route.** `npx skills add coreyhaines31/marketingskills --skill copywriting copy-editing -a claude-code`. Plugin route: `/plugin marketplace add coreyhaines31/marketingskills` then `/plugin install marketing-skills`, which installs all 53 skills ([README](https://github.com/coreyhaines31/marketingskills)).
- **Option D: `brand-voice`.** `claude plugin marketplace update knowledge-work-plugins` (the local clone dates from 29 May 2026), then `claude plugin install brand-voice@knowledge-work-plugins`, then `/brand-voice:generate-guidelines` on Alex's transcripts. It brings seven MCP connectors with it.

## Evidence gaps

- **No skill was run** (the brief's rule), so no output was compared on a real transcript. "Fit" and "keeps the voice" come from each SKILL.md's text. The only real test is the S-D4 test post.
- **No independent comparison** of blog or transcript-to-post skills was found. Popularity figures are GitHub stars read on 2 Nov; install counts on third-party directories weren't checked.
- **Not verified:**
  - whether S-D4's general-purpose subagents call plugin skills unprompted, or only when named;
  - whether a `.claude\skills\` folder inside `blog-pipeline\` is discovered;
  - what happens with two plugins named `marketing` enabled at once.
- `stop-slop`, `content-research-writer` and `the-elements-of-style` were read at description or header level only.
- `anthropics/skills` states its licence in the README only; `doc-coauthoring` has no licence file of its own in its folder.
- Secondary posts on voice files were search summaries, not fetched pages.

## Recommendations

Options for Alex, not decisions. Every call is his.

1. **Satisfy the rule today at zero cost (option A).** S-D4's stage prompts name `marketing:content-creation` for outline, draft and format, and `marketing:brand-review` for a claims check, each saying the pipeline's rules win where they conflict. `orchestration` has nothing to turn on, only to confirm `marketing@synced` stays enabled. Evidence: section 1, traps 1 to 3.
2. **Add `humanizer` for the edit stage (option B)** if Alex wants a skill aimed at "sounds like me". It's an install or a pinned copy by `orchestration`, with `1-clean.md` as the voice sample. Evidence: section 3, traps 4 to 6 and 10.
3. **Keep skill names off the "How this post was made" box,** or describe the stage by what it does. Evidence: trap 5.
4. **Skip `draft-content` in unattended stages,** or give it all six inputs. Evidence: trap 2.
5. **Leave C and D for later.** C fits pages better than posts. D is worth it only if a reusable voice guide is wanted for S-D5 and S-D7.

**One-line questions for Alex, if S-D4 wants them in its spec-draft gate:**
- Does an already-on Anthropic skill count as "turning on a copywriting skill", or does he want a dedicated one installed (B or C)?
- Is a "humanizer" pass acceptable on posts that are labelled AI-drafted?

## Sources

**Local, read only:**
- `C:\Users\alder\.claude\plugins\cache\knowledge-work-plugins\marketing\1.2.0\skills\content-creation\SKILL.md`, `...\draft-content\SKILL.md`, `...\brand-review\SKILL.md`; `...\marketing\1.2.0\.claude-plugin\plugin.json`
- `C:\Users\alder\.claude\plugins\synced\...\88ac0c0d-7278-4d4b-8f03-55180b9dbc05\skills\` (the synced marketing plugin)
- `C:\Users\alder\.claude\plugins\marketplaces\knowledge-work-plugins\partner-built\brand-voice\` (`README.md`, `LICENSE`, `.claude-plugin\plugin.json`, `skills\brand-voice-enforcement\SKILL.md`, `skills\guideline-generation\SKILL.md`)
- `C:\Users\alder\.claude\plugins\installed_plugins.json`; the `enabledPlugins` key only of `C:\Users\alder\.claude\settings.json`
- `C:\Users\alder\Desktop\Hire me hackaton\CHARTER.md`, `research\lists\L-03-blog.md`, `blog-pipeline\SPEC.md`, `blog-pipeline\prompts\5-edit.md`

**Web and GitHub:**
- Claude Code docs, skills: https://code.claude.com/docs/en/skills
- Claude Code docs, plugin commands: https://code.claude.com/docs/en/plugins/cli-reference.md
- Claude Code docs, plugin manifest: https://code.claude.com/docs/en/plugins-reference
- anthropics/skills: https://github.com/anthropics/skills (doc-coauthoring, internal-comms SKILL.md files)
- anthropics/knowledge-work-plugins: https://github.com/anthropics/knowledge-work-plugins
- blader/humanizer: https://github.com/blader/humanizer
- coreyhaines31/marketingskills: https://github.com/coreyhaines31/marketingskills
- hardikpandya/stop-slop: https://github.com/hardikpandya/stop-slop
- ComposioHQ/awesome-claude-skills, content-research-writer: https://github.com/ComposioHQ/awesome-claude-skills
- obra/the-elements-of-style: https://github.com/obra/the-elements-of-style
- Koppenhaver, "The Claude Code skills every marketer should actually install", 27 May 2026: https://claudecodeformarketers.com/blog/claude-code-skills-for-marketers/
- Humanizer coverage: https://gigazine.net/gsc_news/en/20260530-humanizer · https://www.blog.brightcoding.dev/2026/06/07/humanizer-the-essential-tool-to-strip-ai-patterns-from-text · https://letsdatascience.com/news/humanizer-helps-chatbots-evade-wikipedia-detection-d7087413
- Voice-file pattern (search summaries, not fetched): https://www.dupple.com/tutorial/reuse-video-transcripts-seamlessly-across-multiple-platforms · https://aidecode.substack.com/p/building-a-content-repurposing-skill · https://mcpmarket.com/tools/skills/article-writing-voice-capture
- Directory listings (not relied on for figures): https://claudemarketplaces.com/skills/coreyhaines31/marketingskills/copywriting · https://agentskillsfinder.com/skills/content-research-writer
