# L-03 R3 Capture

**Question (verbatim):** "Capture. The dictation goes through Wispr Flow, with the rig's transcript as backup. What breaks with 15 minutes of unscripted speech through each (long-form limits, filler, punctuation, mis-heard names and jargon), and what cleanup step does the pipeline need before drafting?"

2026-11-02 · session s1-research subagent · item 3 of 9 on list L-03

Serves: DoD-14 ("fifteen minutes of operator dictation"), DI-8 question 2 (Wispr Flow into the task with the rig as backup, or the rig transcript only). Readers: S-D4 blog pipeline, S-D5 blog articles.

---

## Method

About 15 minutes on 2 Nov 2026, around 16:25 to 16:45 Prague by the machine clock, quick depth ("deep: no").

- **Wispr Flow, its own docs first.** WebFetch on eight articles at docs.wisprflow.ai: the 20-minute session limit, Auto Cleanup, Smart Formatting and Backtrack, the Dictionary, fixing text that doesn't paste, retrying failed transcriptions, the Scratchpad, audio upload, the MCP server, and Flow in IDEs. WebSearch for the hands-free shortcut and the changelog. The help pages show only "last updated N days ago", with no calendar date, so I treat them as current on 2 Nov 2026. The changelog has moved to wisprflow.com/whats-new ([Featurebase notice, 1 Apr 2026](https://wisprflow.featurebase.app/changelog/were-moving-our-changelog-to-a-new-home)), and I didn't open the new page. Third-party reviews: search results only, used for one point and flagged.
- **Whisper, for the rig.** OpenAI's speech-to-text guide and Whisper prompting guide, and the faster-whisper README.
- **The rig, read only.** `OBS\rig\RUNBOOK.md`, `OBS\rig\RIG_NOTES.md` (the model choice, the settings and the mic-sharing test), `OBS\rig\scripts\process.py` (the transcription call, lines 27 to 129), `OBS\Processed\index.md`. I didn't open `client_secret.json` or anything under `.env`.
- **One rig transcript.** `OBS\Processed\S09_2026-11-02_1517\transcript\S09.md`, read in full: 26 minutes, 66 lines, 2,124 words. I counted fillers, casing and punctuation with a short read-only Python pass over that file. **Caveat:** S09 is a working session (Alex talking to sessions and to himself), not a prepared dictation, so it overstates filler and asides compared with a 15-minute monologue on talking prompts. That's inference.
- **The pipeline as it stands.** `blog-pipeline\SPEC.md`, `blog-pipeline\prompts\1-clean.md` (v0.1), `blog-pipeline\dictations\README.md`, and grep on `blog-pipeline\PIPELINE.md`. The test dictation `T-01.md` isn't in yet (`dictations\` holds only its README), so I couldn't compare Wispr Flow and the rig on the same minutes.

Nothing was tested in Wispr Flow. Screen care: I describe the transcript's error types and quote only short fragments that show a mis-hearing. I quote nothing of the session's content.

---

## Verdict

1. **Nobody has published a converged answer for "15 minutes of dictation through Wispr Flow".** I found no long-form test of it ([search summary of reviews](https://tldv.io/blog/wisprflow/); [Nick Lafferty review](https://nicklafferty.com/reviews/wispr-flow/)). **The cleanup step itself has a converged answer:** after transcription, a text model gets a glossary of the correct spellings, fixes only what's misheard, and the result is checked against the source. OpenAI's own guide recommends this over Whisper's prompt hint, because a text model "can correct misspellings and handle longer terminology lists than Whisper's 224-token prompt window", and it advises checking corrections against the original audio ([OpenAI speech-to-text guide](https://developers.openai.com/api/docs/guides/speech-to-text)). The pipeline's stage 1 (`blog-pipeline\prompts\1-clean.md` v0.1) already has this shape. It needs the glossary as a real list, and four fixes listed under Recommendations.
2. **Wispr Flow's risk is losing the whole thing, not accuracy.** Fifteen minutes fits under the 20-minute desktop cap ([Wispr: 20 minutes](https://docs.wisprflow.ai/articles/4841123325-longer-dictation-sessions-now-up-to-20-minutes)). But the text arrives as one paste after processing, which can take up to 5 minutes for a long recording. Moving focus before it lands "can also prevent Windows pasting" ([Wispr: text not pasting](https://docs.wisprflow.ai/articles/7971211038-fix-text-not-pasting-after-dictation)). A crash mid-dictation is "not recovered on the next launch", and at the cap "a complete transcript is not guaranteed" (20-minute article). Flow's default cleanup (Light) removes fillers and "fixes grammar"; Medium "may reword phrases" ([Wispr: Auto Cleanup](https://docs.wisprflow.ai/articles/4283510616-auto-cleanup-control-how-much-flow-edits-your-dictation-beta)). So the text is already partly edited before the pipeline sees it, and that's a voice risk.
3. **The rig transcript works as a backup and as a clock-stamped reference, but it's raw text.** In S09, 44 of 66 lines start in lower case, and 32 lines (801 words, 38%) carry no punctuation at all. "um"/"uh" make up about 1.6% of the words. Every product name came out in more than one spelling, and one stretch of muttered speech came out as fluent-looking but wrong sentences. The rig dropped its vocabulary hint on purpose, because the hint invented text on silence (`OBS\rig\RIG_NOTES.md`, line 205). The backup exists only after Alex types `/stop` and then `/process` (`OBS\rig\RUNBOOK.md`).
4. **Neither tool fixes mis-heard names.** Flow's Smart Formatting "does not correct misheard words" ([Wispr: Smart Formatting and Backtrack](https://docs.wisprflow.ai/articles/5373093536-how-do-i-use-smart-formatting-and-backtrack)), and the rig's notes accept that "jargon ... may be spelled wrongly". Project text shows the same names going wrong: the charter asks whether "GitSales" means GetSales (`CHARTER.md`, line 254), and Alex's OT-04 note has "Appify" (`research\lists\L-03-blog.md`, line 3). It's inference that both were dictated. The glossary step is the one cleanup that both sources need.

**What would change the planned approach (DI-8 question 2, default A):**
- The paste is lost, or the dictation runs into the 19 to 20 minute window. Then the rig becomes the only text, and stage 1 needs its raw-text mode (Recommendation 3).
- Auto Cleanup is on Medium, or he dictates into an app Flow treats as an AI app. Medium rewords, and AI apps skip formatting altogether. Either way the input isn't what stage 1 expects.
- The test shows the Wispr text has lost his phrasing. Then the rig transcript becomes the source for stage 2's word-for-word phrases, even when Wispr is primary.
- None of the evidence argues for B (rig only) as the default. B trades a small risk of losing the text for certain raw text, plus a wait on his `/process`.

---

## Evidence, by question

### Q1. Long-form limits

**(1) Is there an obvious answer? Yes for Wispr's hard limit, and it clears 15 minutes.** On Mac and Windows a single dictation runs up to 20 minutes on every plan, with no setting to extend it. A sound and a notice come at 19 minutes, and recording stops at 20 with a "Transcription session ended" notice and a **Recover text** button ([Wispr: 20 minutes](https://docs.wisprflow.ai/articles/4841123325-longer-dictation-sessions-now-up-to-20-minutes)). The cap used to be 6 minutes, and mobile stays at 5. The rig has no session-length limit that matters here: Alex's sessions run 2 to 49 minutes (`OBS\Processed\index.md`).

**(2) Traps and gotchas.**
- **One paste at the end.** Text is inserted after processing, and "long recordings need processing before insertion", for up to 5 minutes. Keep the field focused "until processing and insertion finish", because moving focus first "can also prevent Windows pasting" ([Wispr: text not pasting](https://docs.wisprflow.ai/articles/7971211038-fix-text-not-pasting-after-dictation)). Alex works across many windows on camera (S09 is full of window and session switching), so this is the likeliest failure. That's inference.
- **The fallbacks exist, but they're manual.** A failed insertion can leave the text on the clipboard. Alt+Shift+Z pastes the last transcript, and Alt+Shift+X copies it. History offers Retry or Recover for 14 days ([Wispr: text not pasting](https://docs.wisprflow.ai/articles/7971211038-fix-text-not-pasting-after-dictation); [Wispr: retry](https://docs.wisprflow.ai/articles/2503460374-retry-failed-transcriptions)). Retried text can differ, because "dictionary replacements and casing are not reapplied", and "long recordings can take minutes to retry" (retry article).
- **Unrecoverable cases.** "If Flow quits or crashes mid-dictation, the session is not recovered on the next launch." Dismissing the Processing state cancels it. When the connection drops, Flow keeps processing for up to 5 minutes and "some text may be missing" (20-minute article). The 19-minute warning is too late to start over.
- **Wall clock, not speaking time.** The cap is on the session. Pauses to think count toward it in hands-free mode (inference: the docs measure session length, not speech). Hands-free starts with Ctrl+Win+Space on Windows; push-to-talk is Ctrl+Win ([Wispr: hands-free](https://docs.wisprflow.ai/articles/6391241694-use-flow-hands-free)).
- **No second pass from audio.** Flow can't take an audio file ([Wispr: audio upload](https://docs.wisprflow.ai/articles/7689167034-can-i-upload-audio-files-to-wispr-flow-for-transcription)). Its MCP server is read-only and "cannot read dictation history" ([Wispr: MCP](https://docs.wisprflow.ai/articles/9551372685-connect-an-mcp-client-to-wispr-flow-remote-mcp-server)), so the pipeline can't pull a lost dictation itself. Alex has to.
- **The rig's limit is time to text, not length.** `/process` runs only when Alex types it, after `/stop` (`OBS\rig\RUNBOOK.md`; `blog-pipeline\SPEC.md` §3 on DI-1). There's no GPU transcription during a recording (`RIG_NOTES.md`, R14, line 306). At 29 times real time (`RIG_NOTES.md`, line 202), the transcription itself is about half a minute for 15 minutes of speech. That's arithmetic; joining and filing add to it.
- **Both can run at once.** OBS, the ffmpeg backup and Wispr Flow shared the mic in the rig test, and "Alex's dictation arrived intact, and track 2's transcript matched it" (`RIG_NOTES.md`, line 158).

**(3) What would change the plan.** If a single 15-minute paste is too much to risk, Wispr's own advice is shorter sessions: "Stop and dictate in shorter sessions when possible" (20-minute article). Three dictations of about 5 minutes, one per talking prompt or two, cap the loss at one piece. `scripts\join.py` already joins pieces (`blog-pipeline\PIPELINE.md`, line 20).

### Q2. Filler

**(1) Converged answer: yes, and it differs by tool.**
- **Wispr Flow** removes filler by default. Auto Cleanup has three levels you can still choose. **None** "pastes the raw transcript, including filler words, false starts, and spoken errors". **Light**, the default, "removes filler words and fixes grammar". **Medium** "may reword phrases for clarity and conciseness while preserving meaning". High is retired. The level applies "to every dictation, across apps" ([Wispr: Auto Cleanup](https://docs.wisprflow.ai/articles/4283510616-auto-cleanup-control-how-much-flow-edits-your-dictation-beta)). Backtrack also removes false starts and self-corrections ("2 actually 3" becomes "3") at every level except None ([Wispr: Smart Formatting and Backtrack](https://docs.wisprflow.ai/articles/5373093536-how-do-i-use-smart-formatting-and-backtrack)).
- **The rig** keeps a lot of filler. S09, 2,124 words: "um" 21, "uh" 13, "okay" 30, "like" 35, "basically" 20, and 21 immediate word repeats ("it's nice it's nice it's nice", "let me let me know"). The rate was about the same in punctuated and unpunctuated lines (1.4% against 1.9% for um/uh). Asides land in the text too: self-talk, a remark about not doing something on camera, and a line about water. The mic "picks up other voices in the room" (`RIG_NOTES.md`, line 219).

**(2) Traps.**
- **Wispr's cleanup is an edit, not a transcript.** Light "fixes grammar", and the docs on Backtrack say it "can remove words you wanted to keep". The Android article says filler is judged against intended content rather than a fixed list, so it "can sometimes remove words you meant" ([Wispr: Android smart formatting](https://docs.wisprflow.ai/articles/6568835559-why-wispr-flow-sometimes-removes-or-changes-words-on-android-smart-formatting)). For a pipeline whose point is keeping his voice (L-03 R1), that's the main capture-side risk. "Undo AI edit" on the Home tab restores the original of a recent dictation (Auto Cleanup article).
- **Two exceptions skip formatting entirely:** "Command-mode dictations and dictations into apps Flow recognizes as AI apps skip formatting by design", and Flow pastes the raw transcript when formatting fails (Auto Cleanup article). If he dictates into a Claude window rather than the task file, the input is raw. That's inference from the docs.
- **Rig asides are publishable text.** Anything said near the dictation's minutes is in `rig.txt` if the clock window is loose.

**(3) What would change the plan.** If Light turns out to flatten his phrasing on the test, the options are None for the dictation (stage 1 then does all the cleanup) or taking word-for-word phrases from the rig. None is global and turns off Backtrack, so it changes his everyday dictation until he switches it back.

### Q3. Punctuation

**(1) Converged answer: Wispr, yes; the rig, no.** Flow "adds most punctuation automatically" and fixes capitalisation. Spoken "new paragraph" works, best "at natural pauses", and "first... second..." makes a list (Smart Formatting article). For Whisper, "transcripts follow the style of the prompt", and short prompts are followed less reliably ([OpenAI Whisper prompting guide](https://developers.openai.com/cookbook/examples/whisper_prompting_guide)). The rig sends no prompt.

**(2) Traps, from S09.**
- **Mixed style within one session.** Some stretches are all lower case and unpunctuated (44 of 66 lines start lower case; 32 lines and 801 words have no punctuation at all). Others are fully cased and punctuated, sometimes inside the same line. **Inference:** the rig sets `condition_on_previous_text=False` (`process.py`, lines 95 to 97), so each 30-second window picks its own style with nothing carried over.
- **Line breaks aren't sentences.** The rig starts a new line at any pause over 2 seconds (`process.py`, lines 113 to 129, `PARAGRAPH_GAP = 2.0`), so lines break mid-thought ("i want" / "to think out loud").
- **Numbers and times come out bare:** "last update 515" for 5:15.
- **Wispr's paragraphs are only as good as his pauses.** One 15-minute paste may be a few long paragraphs. That's inference; the docs don't describe paragraphing on long dictations.

**(3) What would change the plan.** Rig as primary (B) means stage 1 has to rebuild sentences and paragraphs, which is more change to his words than the "words_out 85 to 100%" check in `1-clean.md` was written for.

### Q4. Mis-heard names and jargon

**(1) Converged answer: a glossary, used at two points.**
- **At capture:** the Wispr Dictionary takes "names, technical terms, or jargon", and its "Correct a misspelling" entries map what's heard to what's written. It auto-learns on Mac and Windows when you correct a word, takes up to 60 characters per entry, and imports up to 1,000 items ([Wispr: Dictionary](https://docs.wisprflow.ai/articles/4052411709-teach-flow-your-words-with-the-dictionary)).
- **After capture:** a text model with the list, as above ([OpenAI speech-to-text guide](https://developers.openai.com/api/docs/guides/speech-to-text)).

Reviewers agree that jargon and brand names are Flow's weak spot without the dictionary (search summary; e.g. [Nick Lafferty](https://nicklafferty.com/reviews/wispr-flow/), [letterly](https://letterly.app/blog/wispr-flow-review/)). That's third-party and unmeasured.

**(2) Traps.**
- **Flow's formatting won't fix them.** It "does not correct misheard words" (Smart Formatting article). Dictionary replacements are "literal and not language-aware", and very common names, famous names and everyday acronyms are skipped (Dictionary article). Retried text drops replacements (retry article).
- **The rig has no hint at all, by design.** The vocabulary hint "produced invented text on silence", so it was removed, at the cost that "jargon like CAIO may be spelled wrongly" (`RIG_NOTES.md`, line 205). Accuracy "on Alex's own voice" was still listed as unproven when the model was chosen on text-to-speech audio (lines 198 and 215).
- **What S09 shows, by type:**
  - **Tool names.** GetSales came out three ways ("git sales", "GitSales", "get sales"). Claude Code and Claude in Chrome came out as "clod encode", "cloud and chrome", "clodden chrome" and "cloud code". Claude Design came out right once and as "cloud design" elsewhere.
  - **The client company's name:** four or more spellings in one session.
  - **An unknown acronym**, rendered twice as "JEV". I can't tell what was meant, so a cleaner shouldn't guess either.
  - **One stretch of about 25 seconds** where muttered reading of on-screen text came out as fluent-looking sentences that don't match the situation, including an invented personal name. This is the dangerous type, because it reads like real speech. Inference: it's what Whisper does with low, unclear speech. I don't quote it.
- **The same errors show up in project text.** "GitSales" (`CHARTER.md`, line 254) and "Appify" (`research\lists\L-03-blog.md`, line 3). Inference: dictated through Wispr Flow, since DI-1 makes Wispr his dictation tool (`blog-pipeline\SPEC.md` §3).

**(3) What would change the plan.** If Alex adds the ten or so recurring terms to the Wispr Dictionary before the dictation, which takes about two minutes of his time, the clean stage has less to fix. Without them, stage 1's glossary does it all. Either works; the glossary in stage 1 is needed anyway for rig text and retried text.

### Q5. What cleanup step does the pipeline need before drafting?

**(1) Converged answer:** one verbatim-preserving clean pass with a glossary, which logs every change and flags rather than guesses (OpenAI guide, above). `1-clean.md` v0.1 already does most of this: fix plain mis-hearings, fill gaps from the rig marked `⟦rig: ⟧`, paragraphs, remove only pure noise, a fixes log, an "unclear" list, and a words_out check.

**(2) Traps the current v0.1 doesn't cover yet** (from the evidence above; inference where noted):
- **The glossary lives in the prompt as four examples.** It should be a list file the stage reads, with the known variants seen so far (GetSales, Apify, Claude Code, Claude in Chrome, Claude Design, Wispr Flow, Sales Navigator, the client company's name as the charter spells it, plus whatever T-01 shows).
- **Whole-session loss isn't a "gap".** Wispr's failures are mostly a cut-off tail, a missing paste or a cancelled dictation, not scattered missing sentences. The rig check should report "the dictation ends at minute N, the rig runs to minute M" as its own case (inference from the failure modes in Q1).
- **Rig text needs a raw-text mode.** That means rebuilding sentences across line breaks, removing more filler, and expecting a larger word drop than 85 to 100% when the rig is primary. Inference: S09's filler and asides alone are a few percent, and asides in a working session are more.
- **Garbled stretches.** A fluent-looking passage that doesn't fit the context, or a personal name that appears once, should be flagged as unclear and become an `[Alex: ...]` marker, never smoothed into the post.
- **The scan has to cover `rig.txt` before stage 1 reads it**, not only the dictation. The rig hears everything in the window, other voices included, and S09 shows how close working talk sits to a dictation slot.

**(3) What would change it.** If Wispr is on Light and the test text reads cleanly, stage 1 is light work: names plus paragraphs. If the rig becomes primary, stage 1 is the heaviest stage and may deserve its own check: every sentence of `1-clean.md` should trace to a rig line by clock time.

---

## Evidence gaps

- **No side-by-side on the same speech.** T-01 isn't in, so I couldn't compare Wispr Flow and the rig on the same 15 minutes. That comparison is free once it lands (`find_in_rig.py --against`, `blog-pipeline\PIPELINE.md`, line 31).
- **No measured long-form accuracy for Wispr Flow** from any independent source. Reviews give unmeasured claims, and one says Wispr launched a new speech model in September 2026 that older reviews predate (search summary; not verified).
- **Wispr's changelog wasn't read.** It moved to wisprflow.com/whats-new and I didn't open it. Docs are dated only "N days ago".
- **I don't know Alex's Auto Cleanup level**, which app he'll dictate into, or whether his Dictionary already holds these terms.
- **The S09 judgment rests on one working session, not a dictation.** Filler and aside rates for a prepared monologue will be lower; how much lower isn't established.
- **The rig's accuracy on Alex's voice** has no measured score. RIG_NOTES lists it as unproven, and I read only one transcript.
- **What the rig's lower-case, unpunctuated stretches come from** (independent 30-second windows) is inference from the settings, not tested.
- **Whether dictating into Flow's own Scratchpad protects against focus loss** isn't stated anywhere. The Scratchpad exists on Windows, saves automatically and has no stated length limit ([Wispr: Scratchpad](https://docs.wisprflow.ai/articles/9618237082-using-the-scratchpad-to-save-and-edit-notes)).

---

## Recommendations (evidence plus options; every call is Alex's)

1. **DI-8 question 2.** The evidence fits default A: Wispr Flow into the task, with the rig as backup. Both capture the same mic at once (`RIG_NOTES.md`, line 158), so A costs nothing extra. B (rig only) gives up Flow's punctuation and filler removal and waits on `/process`, in exchange for removing a paste risk that the fallbacks mostly cover. Options: keep A (the default); A with the session-length change in 2; or B.
2. **How he dictates, for the dictation task's instructions** (S-D4 writes them; Alex chooses).
   - Option (a): one hands-free session (Ctrl+Win+Space). Stop well before 19 minutes, and don't touch another window until the text has landed, which can take minutes.
   - Option (b): two or three shorter sessions, one per talking prompt or two, each pasted before the next starts. This is Wispr's own advice for long dictations, and `join.py` already joins the pieces.
   - Either way, the task should say where the text is if it doesn't appear: Ctrl+V, Alt+Shift+Z, or History, then Retry or Recover.
3. **Stage 1, v0.2, for S-D4 to consider.** A glossary file the stage reads. A "tail missing" case in the rig check. A raw-text mode when the rig is primary, with its own word-drop range. Garbled or unknown terms become `[Alex: ...]` markers. `rig.txt` gets scanned before it's used.
4. **Auto Cleanup level.** Light is the default and matches the pipeline's design. Medium rewords and works against keeping his voice. None keeps every word but turns off Backtrack for all his dictation until he switches back. Options: leave Light (default); None for the dictation only; or check the test output first and decide on T-01's evidence.
5. **Wispr Dictionary.** Optionally, Alex adds the recurring names before the dictation, in about two minutes. It isn't needed if stage 1's glossary is in place. It helps every later dictation too, including S-D5's three.
6. **When T-01 lands,** S-D4 can run `find_in_rig.py --against` once and keep its numbers: words in each source, gaps found, and names each got wrong. That turns this report's inferences into a measured answer for S-D5 at no cost to Alex.

---

## Sources

**Wispr Flow (official help centre, fetched 2 Nov 2026; pages show "last updated N days ago" only)**
- [Longer dictation sessions, now up to 20 minutes](https://docs.wisprflow.ai/articles/4841123325-longer-dictation-sessions-now-up-to-20-minutes)
- [Auto Cleanup: control how much Flow edits your dictation](https://docs.wisprflow.ai/articles/4283510616-auto-cleanup-control-how-much-flow-edits-your-dictation-beta)
- [How do I use Smart Formatting & Backtrack](https://docs.wisprflow.ai/articles/5373093536-how-do-i-use-smart-formatting-and-backtrack)
- [Why Wispr Flow sometimes removes or changes words on Android](https://docs.wisprflow.ai/articles/6568835559-why-wispr-flow-sometimes-removes-or-changes-words-on-android-smart-formatting)
- [Teach Flow your words with the dictionary](https://docs.wisprflow.ai/articles/4052411709-teach-flow-your-words-with-the-dictionary)
- [Fix text not pasting after dictation](https://docs.wisprflow.ai/articles/7971211038-fix-text-not-pasting-after-dictation)
- [Retry failed transcriptions](https://docs.wisprflow.ai/articles/2503460374-retry-failed-transcriptions)
- [Use Flow hands-free](https://docs.wisprflow.ai/articles/6391241694-use-flow-hands-free)
- [Use and organize notes in Scratchpad](https://docs.wisprflow.ai/articles/9618237082-using-the-scratchpad-to-save-and-edit-notes)
- [Can I upload audio files to Wispr Flow for transcription?](https://docs.wisprflow.ai/articles/7689167034-can-i-upload-audio-files-to-wispr-flow-for-transcription)
- [Connect Claude, ChatGPT or another MCP client to Wispr Flow](https://docs.wisprflow.ai/articles/9551372685-connect-an-mcp-client-to-wispr-flow-remote-mcp-server)
- [Use Flow with Cursor, VS Code, and other IDEs](https://docs.wisprflow.ai/articles/6434410694-use-flow-with-cursor-vs-code-and-other-ides)
- [Changelog moving notice, 1 Apr 2026](https://wisprflow.featurebase.app/changelog/were-moving-our-changelog-to-a-new-home)

**Third-party (search results only, unmeasured claims)**
- [tldv: Wispr Flow review](https://tldv.io/blog/wisprflow/) · [Nick Lafferty: Is Wispr Flow worth it?](https://nicklafferty.com/reviews/wispr-flow/) · [letterly: Wispr Flow review](https://letterly.app/blog/wispr-flow-review/)

**Whisper**
- [OpenAI: speech-to-text guide (prompting, post-processing with a glossary)](https://developers.openai.com/api/docs/guides/speech-to-text)
- [OpenAI Cookbook: Whisper prompting guide](https://developers.openai.com/cookbook/examples/whisper_prompting_guide)
- [SYSTRAN faster-whisper README](https://github.com/SYSTRAN/faster-whisper)

**Local, read only**
- `C:\Users\alder\Desktop\Hire me hackaton\OBS\rig\RUNBOOK.md`
- `C:\Users\alder\Desktop\Hire me hackaton\OBS\rig\RIG_NOTES.md` (lines 158, 198 to 219, 306)
- `C:\Users\alder\Desktop\Hire me hackaton\OBS\rig\scripts\process.py` (lines 27, 94 to 129)
- `C:\Users\alder\Desktop\Hire me hackaton\OBS\Processed\index.md`
- `C:\Users\alder\Desktop\Hire me hackaton\OBS\Processed\S09_2026-11-02_1517\transcript\S09.md` (the one transcript read)
- `C:\Users\alder\Desktop\Hire me hackaton\blog-pipeline\SPEC.md`, `prompts\1-clean.md`, `dictations\README.md`, `PIPELINE.md`
- `C:\Users\alder\Desktop\Hire me hackaton\CHARTER.md`, `research\lists\L-03-blog.md`
