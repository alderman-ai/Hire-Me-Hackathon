# C08: OUTPUT S-D1, the files in Alex's Addvery research, onto four reader specs

Status: applied 15:36, commit 17427ac
Asked by: `s-d1-scraping`, 2 Nov 15:33 Prague: `OUTPUT S-D1 ready: Alex's research files in ..\Addvery Research\, names only, as his research session listed them at 15:33 in part N5 of "Scraping summary.md" ... Readers: S-D3, S-D6, S-D7, S-D8.`
Approval: resource lines only, no preview (SPEC section 4, item 4). The producer is Alex's own operator-owned work; S-D1 relays his research session's list. S2 neither opened nor checked `Addvery Research\` (SPEC section 3): the names are taken as relayed. Check mode skips that folder, so expected files raise no gap.

## Places

### 1. `getsales\SPEC.md`, Routing and resources, under its `Addvery Research\` line (from line 76)

Before:
```
(no file lines under the folder line)
```
After:
```
  - Files in it, as Alex's research session listed them at 15:33 (relayed by S-D1 as an OUTPUT line; added by S2 as C08). Read from disk only, never edit, never copy into a tracked file. A file marked expected doesn't exist yet: check for it, don't wait on it.
    - `..\Addvery Research\addvery-website-research\00-report.md` to `04-team.md`: Addvery's public website read in full: positioning, ICPs and languages, case studies, leadership pages. `04-team.md` holds personal data and stays in the folder. Until `GetSales ICPs.md` exists, the section "ICPs for the GetSales demo" in `00-report.md` stands in for it.
    - `..\Addvery Research\GetSales six.json` (expected about 16:00): the six stakeholders, each with a public profile link, sourced professional notes and a `confirmed_by_alex` flag.
    - `..\Addvery Research\GetSales ICPs.md` (expected): 3 to 5 ICPs with proof, signals and languages per market.
```

### 2. `canva-templates\SPEC.md`, Routing and resources, under its `Addvery Research\` line (from line 65)

Before:
```
(no file lines under the folder line)
```
After:
```
  - Files in it, as Alex's research session listed them at 15:33 (relayed by S-D1 as an OUTPUT line; added by S2 as C08). Read from disk only, never edit, never copy into a tracked file. A file marked expected doesn't exist yet: check for it, don't wait on it.
    - `..\Addvery Research\Brand capture.md` (expected): Addvery's voice and visual identity, Alex's own brand capture.
```

### 3. `linkedin-content\SPEC.md`, Routing and resources, under its `Addvery Research\` line (from line 62)

Before:
```
(no file lines under the folder line)
```
After:
```
  - Files in it, as Alex's research session listed them at 15:33 (relayed by S-D1 as an OUTPUT line; added by S2 as C08). Read from disk only, never edit, never copy into a tracked file. A file marked expected doesn't exist yet: check for it, don't wait on it.
    - `..\Addvery Research\Brand capture.md` (expected): Addvery's voice and visual identity, Alex's own brand capture.
```

### 4. `website\SPEC.md`, Routing and resources, under its `Addvery Research\` line (from line 88)

Before:
```
(no file lines under the folder line)
```
After:
```
  - Files in it, as Alex's research session listed them at 15:33 (relayed by S-D1 as an OUTPUT line; added by S2 as C08). Read from disk only, never edit, never copy into a tracked file. A file marked expected doesn't exist yet: check for it, don't wait on it.
    - `..\Addvery Research\GetSales six.json` (expected about 16:00): the six stakeholders, with a `confirmed_by_alex` flag. Only the six marked confirmed go anywhere near the site, and only as far as his gate on the stakeholder pages allows.
    - `..\Addvery Research\Brand capture.md` (expected): Addvery's voice and visual identity, Alex's own brand capture.
```

Interplay with C01 (still waiting on Alex): C01 replaces the folder-level line in canva-templates, linkedin-content and website; these file lines sit under it and stay.

## Verify

Read back: the four blocks sit under each spec's Addvery Research line. propagate check: no new gap; four notes for the bare file names and the expected files, as planned. Told: s-d3-getsales and s-d1-scraping at 15:36; website after 16:30 (Alex's hold on its fan-out, 15:30 to 16:30); S-D6 and S-D7 have no running session, so the lines wait in their files.

## Follow-on, 15:41

Update from `s-d1-scraping` (from addvery-research at 15:40, checked on disk): `Brand capture.md` and `GetSales six.json` now exist (Alex's confirmation of the six still pending); new `brand\raw\logo.png` for S-D6, S-D7 and S-D8; `GetSales ICPs.md` still expected; `apify\README.md` is S-D1's own, no reader line. Mechanical follow-on, no preview: dropped "expected" from those two lines and added the logo line beside each Brand capture line.

## Follow-on, 16:26

Final list from `s-d1-scraping` (from the final `Scraping summary.md`, part N5, marked ready by addvery-research). Mechanical follow-on, no preview:
- `GetSales six.json`: Alex confirmed the six at 15:55 (getsales, website).
- `GetSales ICPs.md` isn't coming: its line is dropped, and `00-report.md`'s ICP section is the ICP source (getsales).
- `Brand capture.md` and the logo: still a draft, Alex's review pending (canva-templates, linkedin-content, website).
- New `Org diagrams for the website.json` (counts only, no names) for website; new `linkedin-posts\` for linkedin-content.
- Alex's private briefing (decision-maker profiles and per-person notes): website only, once he approves what the stakeholder sections show. Its file and folder names are deliberately not written into the public repo; the line points at part N5 of `Scraping summary.md` instead (R4: personal, unexpected information about named people reads as creepy).
- `transcripts\` and `apify\README.md`: no reader line.
