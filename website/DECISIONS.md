# Website decision log

Decisions taken on a default when a question to Alex went unanswered, and answers that settled one (per `..\answer-desk\ASKING.md`).

## 2 Nov 2026

- **website-Q1, answered.** Alex on "Let's have Video Session": "I have no idea and it's not important." No label above the video; the page stays as it is.
- **website-Q2, default at 13:19.** Nobody has checked lip sync in the S02 webcam video (Wave:3 audio, BRIO picture). Decision: treat it as in sync and leave the video up. Why: there's no report of a problem, and the fix needs to know how far off and in which direction, which only watching it can tell. Re-uploading on a guess could make it worse. (The rig's alignment score of 0.997 and the 62 s start cue only check audio against audio, so they say nothing about picture against sound.) Blast radius if wrong: re-upload S02 with the audio shifted (about 10 minutes, new YouTube id, redeploy), and apply the same shift to later webcam uploads. Still worth a look the first time Alex watches it.
- **website-Q2, answered after the default.** Alex: "From the live site, yes, the lip syncing is fine." The default stands; nothing to change.
- **website-Q3, answered.** The public GitHub repo has the unredacted charter and specs (they mention the Apify proposal, the live run's sender profile and a contact's name). Alex: "a", leave it. The site keeps its redacted copies (`scripts\sync_docs.py`) and doesn't link to the repo.
