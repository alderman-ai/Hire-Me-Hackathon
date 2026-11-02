# C09: OUTPUT S-D8, the website's Addvery brand kit, onto the Canva templates and LinkedIn content specs

Status: applied 16:01
Asked by: `website`, 2 Nov about 16:00 Prague: `OUTPUT S-D8 ready: website\local\addvery\brand\BRAND.md ..., website\local\addvery\brand\tokens.css ..., website\public\addvery\ (24 files ...). All git-ignored, local only. ... It agrees with Alex's Brand capture.md. Readers: S-D6, S-D7.`
Approval: resource lines only, no preview (SPEC section 4, item 4). The kit was built on Alex's own instruction to `website` (about 15:30: clone Addvery's site), and orchestration asked for this OUTPUT line.

## Places

### 1. `canva-templates\SPEC.md`, Routing and resources, after the C08 logo line (line 70)

Before:
```
(no brand kit line)
```
After:
```
    - `..\website\local\addvery\brand\BRAND.md`, `..\website\local\addvery\brand\tokens.css` and `..\website\public\addvery\` (24 files: logos, favicons, 10 icons, glows): the website session's brand kit, read from Addvery's public site (OUTPUT S-D8; added by S2 as C09). Each value carries its source URL and a confidence note; the tokens file holds the CSS variables (--av-*). Fonts: Outfit and Plus Jakarta Sans exact; Inter Tight stands in for the commercial heading face, Inter for body. It agrees with Alex's brand capture, which comes first where they differ. Git-ignored, local only: read it, never copy it into a tracked file.
```

### 2. `linkedin-content\SPEC.md`, Routing and resources, after the C08 logo line (line 67)

Before:
```
(no brand kit line)
```
After:
```
    - `..\website\local\addvery\brand\BRAND.md`, `..\website\local\addvery\brand\tokens.css` and `..\website\public\addvery\` (24 files: logos, favicons, 10 icons, glows): the website session's brand kit, read from Addvery's public site (OUTPUT S-D8; added by S2 as C09). Each value carries its source URL and a confidence note; the tokens file holds the CSS variables (--av-*). Fonts: Outfit and Plus Jakarta Sans exact; Inter Tight stands in for the commercial heading face, Inter for body. It agrees with Alex's brand capture, which comes first where they differ. Git-ignored, local only: read it, never copy it into a tracked file.
```

## Verify

The three paths exist on disk (checked 16:00; `website\publicddvery\` holds 24 files and is git-ignored). Read back: the line sits after the C08 logo line in both specs. propagate check compared with the C08 run: four new gaps, all false: bare file names in backticks (tokens.css, Brand capture.md) read as paths. Fixed as a mechanical follow-on by dropping the backticks; the check then matched the C08 run. Told: s-d6-canva-templates and s-d7-linkedin-content at 16:01.
