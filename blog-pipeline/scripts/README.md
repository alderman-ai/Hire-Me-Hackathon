# Blog pipeline scripts

Small Python 3 scripts (standard library only) for the blog pipeline: dictation in, near-final post out. S-D4 and S-D5 both run them. Run every one from the repo root, `C:\Users\alder\Desktop\Hire me hackaton`, as `python -I blog-pipeline\scripts\<name>.py ...`; default paths resolve from the script's own folder, never the current one. They read and write UTF-8 and print short, plain lines. Each script's docstring has the full detail.

Exit codes, unless a section says otherwise: **0** ok, **1** not yet / hits found, **2** error.

In pipeline order:

| Step | Script |
| --- | --- |
| Wait for Alex's answers to the intake | `check_intake.py` |
| Wait for the dictation | `check_done.py` |
| Capture it | `join.py` |
| Fill gaps from the rig | `find_in_rig.py` |
| Count words, and the share Alex changed | `counts.py` |
| Check the post file against POST-FORMAT.md | `validate.py` |
| Safety scan before every commit | `scan.py` (+ `deny-local.txt`) |

## check_intake.py

Checks a decision intake's answer fences (` ```a-8-1 ``` ` and so on) for Alex's answers. Prints `ANSWERED`, `PARTIAL` (and which fences) or `OPEN`. With `--watch <seconds>` it loops and prints a line only when something changes, for the Monitor tool.

```powershell
python -I blog-pipeline\scripts\check_intake.py "Operator tasks\Decide - how the blog pipeline should work.md"
```

Exit: 0 every fence holds text; 1 some or none do; 2 file missing or no answer fences.

## check_done.py

Waits for the dictation. Exits 0 once the task's `- [x] Done` line is ticked (at line start; more words may follow on the line). With `--also-dir`, it also exits 0 when that folder holds a fallback note: a non-empty `.md` that isn't `README.md` or a `T-*.md` already captured (`source:` in its front matter). Run it from the Monitor tool every 300 seconds.

```powershell
python -I blog-pipeline\scripts\check_done.py "Operator tasks\Do - your test dictation for the blog.md" --also-dir blog-pipeline\dictations
```

Prints `DONE <file>`, `FALLBACK <path>`, `OPEN <file>` or `OPEN (no task file)`. Exit: 0 DONE or FALLBACK; 1 OPEN; 2 task file missing (without `--also-dir`) or no Done box in it.

## join.py

Captures the dictation. Wispr Flow types in pieces; this joins them without changing a word. With `--task` it takes everything after `## Dictate below this line`; without it, the whole file (a fallback note) minus front matter. It drops HTML comments, `<operator_answer>`-style tags, code fence markers, headings and the Done box line, and joins a blank-line break into a space when the piece before it doesn't end in sentence punctuation. Writes front matter `id`, `source`, `from`, `captured`, `words`.

```powershell
python -I blog-pipeline\scripts\join.py "Operator tasks\Do - your test dictation for the blog.md" blog-pipeline\dictations\T-01.md --task
python -I blog-pipeline\scripts\join.py blog-pipeline\dictations\<note>.md blog-pipeline\dictations\T-01.md
```

Prints `JOINED <output>: <n> words, <p> paragraphs`, with a `WARN` line first if another `## ` section follows the dictation heading (check its text isn't in the output). Exit: 0 written; 1 `EMPTY` (no dictation yet, nothing written); 2 input missing or no dictation heading.

## find_in_rig.py

The backup source. Reads the rig's filed sessions (`OBS\Processed\index.json` and each `Sxx_*\segments.jsonl`), read only. Use it to get the dictation's minutes from the rig, to find a phrase, and to list what Wispr Flow may have dropped. Times are local; `--date` defaults to today; `--processed <dir>` overrides the folder.

```powershell
python -I blog-pipeline\scripts\find_in_rig.py --start 15:00 --end 15:15
python -I blog-pipeline\scripts\find_in_rig.py --start 15:00 --end 15:15 --out blog-pipeline\drafts\T-01\rig.txt
python -I blog-pipeline\scripts\find_in_rig.py --start 15:00 --end 15:15 --against blog-pipeline\dictations\T-01.md
python -I blog-pipeline\scripts\find_in_rig.py --match "front loaded"
```

- Window: `[HH:MM:SS] text` lines, then `WINDOW <sessions> <start>–<end>: <n> segments, <w> words, <m> minutes spoken`. `--out` writes the plain text (a paragraph per segment) instead of printing it.
- `--against`: `GAP [start–end] text` for each segment the dictation barely covers (word 3-gram overlap under 0.3), then `GAPS <k> of <n> segments`.
- `--match`: `MATCH <session> <segment id> [time] text` lines, then `MATCHES <n>`.
- A `NOTE` line says when the window runs past the last filed session.

Exit: 0 found (with `--against`, whatever the gaps); 1 `NONE` (no filed session covers the window yet, no speech in it, or no match); 2 bad arguments or unreadable files.

## counts.py

Word counts by POST-FORMAT.md §2's one rule (body only; whitespace tokens holding a letter or digit; no front matter, comments, link URLs, `[!pull]`/`[!summary]` tags, list numbers or pull-quote blocks; notes for Alex count). Gives `reading_minutes`, `words_spoken`, `words_drafted`. `--changed` gives `share_changed_by_alex`: 1 − matched words (difflib) / the longer word list, ignoring case, punctuation and `*`.

```powershell
python -I blog-pipeline\scripts\counts.py blog-pipeline\drafts\T-01\post.md
python -I blog-pipeline\scripts\counts.py --changed blog-pipeline\drafts\T-01\post.md <Alex's finished post.md>
```

Prints `WORDS <file>: <n>` or `CHANGED <before> -> <after>: <pct>% of words changed (<a> words before, <b> after)`; `--json` prints one JSON object instead. Exit: 0 ok; 2 file missing or bad arguments.

## validate.py

Checks a post file against POST-FORMAT.md §6, checklist items 1 to 20, including the front matter (parsed for exactly the YAML subset §2 allows). Run it after the Format stage and before every preview.

```powershell
python -I blog-pipeline\scripts\validate.py blog-pipeline\drafts\T-01\post.md
```

Prints `F<n> <message>` per failure and `W<n> <message>` per warning (`<n>` is the checklist item), then `VALID <file>: <f> fail, <w> warn`. Exit: 0 no F; 1 any F; 2 file missing or unreadable.

## scan.py

The publish safety scan. Run it on every dictation, draft and site request before it's committed. Fails on `SECRET` (API keys and tokens, printed as the first 4 characters only), `DENY` (the website's deny list, read from `website\scripts\sync_docs.py` without running it, plus `deny-local.txt` here) and `CONTACT` (emails and phone numbers, masked). Warns on `NAME` (two or three capitalised words in a row: a possible personal name for the editor to check). "proposal" alone is on the website's list, so ordinary prose hits too: reword it. Takes files, folders and glob patterns, and expands the globs itself.

```powershell
python -I blog-pipeline\scripts\scan.py blog-pipeline\dictations\T-01.md
python -I blog-pipeline\scripts\scan.py "blog-pipeline\drafts\T-01\*.md"
```

Prints `<CATEGORY> <file>:<line>: <excerpt>` per hit, then `SCAN <files>: <f> fail, <w> warn`; `--json` prints the hits as JSON. A `WARN website deny list not found` line means only the local list was used. Exit: 0 no fail hits (warnings allowed); 1 any fail hit; 2 a file or pattern not found.

`deny-local.txt` holds the pipeline's own deny terms, one per line, `#` for comments, matched case-insensitively anywhere (a term's spaces match line breaks too).
