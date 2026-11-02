# Dictations

The raw input of the blog pipeline: what you said, as Wispr Flow typed it, before any drafting.

**If there's no dictation task waiting for you at your slot,** dictate here instead: make a new note in this folder (any name, for example `my dictation.md`), put the cursor in it, start Wispr Flow and talk. Nothing else is needed. The blog pipeline session checks this folder every five minutes, and once the note stops growing it picks it up and starts drafting.

What lives here:
- `T-01.md`: the test dictation, copied in from your dictation task (or your note) and scanned before it's committed. Every later dictation gets the next number.
- `README.md`: this file.

Everything in this folder is committed to the public repo after the safety scan (no secrets, nothing of the Apify proposal, nothing of your own GetSales outreach). If you say something that mustn't be published, the scan cuts it from the post and the session keeps that stretch of the recording off the site.
