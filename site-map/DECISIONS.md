# orch-site-map decision log

Calls made for Alex without asking (charter P5): the decision, why it's right, and the blast radius if it has to change. Times are Prague.

## 2 Nov

**SM-1 · 18:58 · The Canva design video (D10) and the Comfy brand-motion entry (D11) each go in GTM demos as their own entry, `/demos/<slug>`, and nowhere else.**
Why: the charter makes D11 a GTM demos entry outright, and D10 is the same shape (a video with a write-up). One list for every demo keeps the menu at five items.
Blast radius: small. Moving one later is a link change on the time paths and the status board.

**SM-2 · 18:59 · The two GetSales entries go in GTM demos, demo 1 first; s-d3 sends its BUILDs straight to website, not through me. Figures get tap-to-open-full-size (s-d3's accessibility ask), batched into my next website request.**
Why: Alex's A10.7 asked for two blog-style entries in that list. I decide placement; website builds. A relay through me only adds a hop.
Blast radius: none for the entries. The figure change touches the shared entry template, so every entry gets it.

**SM-3 · 19:02 · Stopped the scope-map update half-way (two builders, nothing published) the moment Alex said he dislikes the map's layout, approach and voice. The map stays exactly as it was at version 1793641650-2731 until he picks from the best of five.**
Why: Alex, 19:02: "I really dislike a ton of what's been building on the sitemap without me". Adding more of the same would have cost him more editing.
Blast radius: the map's status (green / amber / blue) is out of date until the winner rolls out. The live status is in `Open tasks.md` and with orch-briefing meanwhile.

**SM-4 · 19:04 · Best of five, built from a 10-question intake (DI-11, `Operator tasks\Decide - how the site map should look and talk.md`), not from a separate interview session.**
Shape: (1) Alex answers the 10, ticking two letters where he's torn; (2) meanwhile a sweep collects his verbatim asks from every session (`local\ALEX-ASKS.md`) and his spoken voice from the rig transcripts (`local\VOICE-FOR-MAP.md`); (3) five builders run in parallel on one fresh canvas, each building the same slice (the overview of the whole site, the homepage, Ivana's page), sharing what he's firm on and splitting where he's torn, plus one wildcard; (4) a blind judge ranks the five against his answers and asks before he looks; (5) he picks or mixes, and the winner rolls out to the real map link.
Why: he asked for exactly this ("a best of five", "10 most high-signal questions", "a decision intake form not a separate session", 15 to 20 minutes of his time). Building one slice five ways, not the whole site five ways, gets him a comparison in minutes, and the slice holds the three hardest parts (overview, the homepage, a landing).
Blast radius: if none of the five is close, a second round reuses the same answers with the judge's notes; nothing on the live site changes either way.

**SM-5 · 19:03 · His verbatim asks live in `site-map\local\` (git-ignored by `site-map\.gitignore`), not in the public repo.**
Why: his chat lines can name private things (the meeting, people, his own outbound). The handoff note points the next session at the file, so it still survives handoffs.
Blast radius: none. Moving it public later is one `git add`.
