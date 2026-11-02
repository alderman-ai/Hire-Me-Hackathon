# S1 handoff

Written by the second `s1-research` session (00877038) at 19:02 Prague, 2 Nov, at forking gate G4 (context at about half), on `orchestration`'s CONTEXT WATCH. You are now the active S1 session, under the same name. Read CLAUDE.md, then this file, then `portfolio\README.md`. SPEC.md and DIRECTORY.md as needed: no research is running or queued.

## First: watch the AI portfolio review

Alex is reviewing his AI portfolio entry on a private artifact page: **https://claude.ai/artifact/McVKMTRVxsW3qa3kFq1Z6J**. The TASK line went to `answer-desk` at 18:52 ("task shown"). `orch-alex-prep` tracks it for Alex.

1. **Watch for his comment.** The page's comment subscription belonged to the old session, so arm your own: load the `ArtifactComments` tool (ToolSearch `select:ArtifactComments`) and use it to watch and read comments on that URL. His answer may also come through `answer-desk` or `orch-alex-prep`. His comment is the sign-off (reset rule 4).
2. **When it comes:**
   - Apply his edits to `portfolio\ai-portfolio.md` (the source of truth; the page is built from it). Settle the five `[Alex: ...]` notes by his answers; remove each note once settled. If he says nothing on one, take the safe default and log it in `portfolio\README.md`: keep CB6 unlinked, keep Factor-AI to its two files, drop an unsourced figure.
   - Load `marketing:content-creation` first if you rewrite any copy (his rule: no copywriting without a copywriting skill).
   - From the repo root: `python -I blog-pipeline\scripts\validate.py research\portfolio\ai-portfolio.md`. It must show 0 fail (W20, the length warning, is expected).
   - Set `status` in its front matter to what POST-FORMAT.md uses for a finished entry.
   - Rebuild the page: `python -I research\portfolio\build_preview.py`, then republish it with the Artifact tool and `url` https://claude.ai/artifact/McVKMTRVxsW3qa3kFq1Z6J (read it first with `action: "read"`, as the tool requires for an artifact from another session). Commit.
3. **Then hand it on:**
   - `website`: `BUILD S1-B1: add Alex's AI portfolio entry at website\content\demos\ai-portfolio.md, linked from his About-me section. Content: research\portfolio\ai-portfolio.md (POST-FORMAT entry, kind "showcase", validates). Source: Alex's own public repos and his own words, signed off by his comment on the review page; nothing from Addvery Research.` Wait for `BUILT S1-B1` or `REFUSED S1-B1`. The entry ends with its own "How this post was made" text, because the template's box assumes a dictation; tell `website` that.
   - `s-d1-scraping`: the Markdown source path, for its agent-readable track of the site (D12).
   - `answer-desk`: `TASK DONE S1: AI portfolio entry`. `orchestration`: `OUTPUT S1: AI portfolio placed, <path>`.

## Where S1 stands

| List | State |
| --- | --- |
| L-01 parent | Done 15:05; on every reader's reading list (C07). |
| L-02 scraping | Parked: Alex runs the scraping himself. |
| L-03 blog | Done 17:21: 10 reports and the synthesis. FINDINGS sent; reader S-D5 only (S-D4 retired). |
| L-04 GetSales, L-06 website | Withdrawn 17:03 (OT-03 withdrawn unticked); never run. |
| L-05 brand assets | Done 16:45; FINDINGS sent (C11), S-D5 added as a reader for R1. |

`orchestration`'s RESTART (17:13): start no new research unless Alex asks for it. Alex's reset rules (`..\answer-desk\ASKING.md`, top): no gates for plans or research lists, easy calls are yours (decide and log), pokes only when work is blocked (at most every 30 minutes), no 18:00 cut-off. Desk: no question open; the next id is S1-Q7.

## Routing (since 18:56)

- `orchestration`: handoffs, roster, context, charter, FINDINGS and OUTPUT. Alex no longer talks to it.
- `orch-site-map` (site-map\): the site's layout and scope map.
- `orch-alex-prep` (alex-prep\): everything that needs Alex, and `Open tasks.md`.
- Questions to Alex still go through `answer-desk`.
- Sessions hand off often: when ListAgents shows two rows for one name, use the newest `[ref]`.

## Things Alex should know, already reported to `orchestration`

His public repos `cb6-prayer-project` and `Factor-AI` each needs a clean-up decision from Alex; the details are with him privately. Clean-up is his call; the portfolio links around it. The review page's top panel tells him the same.

## Rules learned

- Re-read any file `orchestration` may have edited before you edit it.
- Don't use `sed` on lines with Windows paths; long inline Python in a Bash heredoc can fail to parse, so write scripts to a file and run them with `python -I`.
- Never fork while subagents you launched are running; they report to the session that launched them.

## Forking gates from here

G4 (half context) or when `orchestration` asks. How: rewrite this file and commit it; launch from `research\` with `claude --bg -n s1-research "Read CLAUDE.md, then HANDOFF.md. You are now the active S1 session."`; update S1's row in `..\SESSIONS.md` (commit it on its own with `[roster]`); send `orchestration` `HANDOFF s1-research <new id>`; then stop.
