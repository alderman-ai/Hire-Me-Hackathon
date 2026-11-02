---
stage: 7
name: scan
version: v0
reads: "{DIR}\\post.md, {DICTATION}, every file in {DIR}"
writes: "{DIR}\\7-scan.md; cuts hits from {DIR}\\post.md"
---

# Stage 7: scan

You are the last check before anything from this post is committed to the public repo or sent to the website. Everything here is assumed to be published. Nothing may show a secret, anything of the Apify proposal, or Alex's own GetSales outreach (his sender profile, his messages, who it targets), and nothing may name a person or a client who hasn't chosen to be on the site.

## Inputs

- `{DIR}\post.md`: the formatted post.
- `{DICTATION}` and every other file in `{DIR}`: all of it gets committed too.

## What to do

1. **Run the scan script** on everything:
   `python -I blog-pipeline\scripts\scan.py {DICTATION} {DIR}\*.md`
   It prints one line per hit (`SECRET`, `DENY`, `CONTACT` fail; `NAME` warns) and exits 1 on any fail.
2. **For each fail hit:**
   - In `post.md`: cut or reword the line so the hit is gone without changing his point (a proposal becomes "a project", a name becomes a role). If the point itself can't be published, cut the sentence.
   - In the dictation or a stage file: replace the hit with `[removed: <category>]`. Don't change anything else in those files.
3. **For each `NAME` warning:** decide. A public tool, product or place stays. A person other than Alex Alderman, a client, or a company he worked with goes, as in step 2, replaced by a role ("a founder I worked with").
4. **Read the post yourself** for anything the script can't catch: a client described so closely they're identifiable, a private number, a price, a deal, an internal project name, someone's job title plus company. Treat it like a hit.
5. **Run the scan again** until it exits 0. If you changed `post.md`, rerun `python -I blog-pipeline\scripts\counts.py {DIR}\post.md` and `python -I blog-pipeline\scripts\validate.py {DIR}\post.md` and bring `made.words_drafted` and `reading_minutes` back in line.
6. **Mark it near-final.** Once the scan exits 0, set `status: "near-final"` in `post.md`'s front matter and change nothing else (the post format, §1). This is the version Alex reviews.
7. **Clock times:** if anything was cut from the dictation, note the nearest words around it, so the running session can find the clock time in the rig transcript and keep that stretch of video off the site.

## Output: `{DIR}\7-scan.md`

```
---
id: {ID}
stage: 7-scan
prompt: v0
result: <pass | pass after cuts>
---

## Script runs
- <time> exit <code>: <f> fail, <w> warn
## Cuts
- <file>:<line> <category>: <what was there, masked> -> <what it is now>
## Names reviewed
- <name>: kept (<why>) | cut
## Off the site
- <the words around each cut in the dictation>, or "none"
```

Never copy a secret into this file: mask it to its first four characters.

## Return

```
STAGE 7 DONE {ID}: scan <pass | pass after k cuts>; off the site: <none | n stretches>
```
