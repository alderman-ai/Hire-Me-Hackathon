# Build notes: how the templates are made (part 1, code-first)

Written by role, like `BUILD-SHEET.md`. Brand values, the import-ready files and the previews live in `local\` (git-ignored) until Alex's brand sign-off.

## Pipeline

1. **One shared tokens file** (`local\import\_shared\tokens.css`) holds every brand role as a CSS variable: colour roles, the signature gradient, type roles, radii. Templates use only those variables, never raw values, so one edit re-brands the whole set (e.g. settling the gradient-or-single-colour question).
2. **One HTML file per template** (`local\import\<template>\`), each page a `.canvas` at the exact pixel size from the build sheet. Every element is absolutely positioned on the build sheet's grid.
3. **Render** with `node local\tools\render.mjs`: headless Chrome at device scale 1, one screenshot per page at the exact canvas size, then a check that every PNG's pixel size matches the canvas. Multi-page templates (the carousel) also print to one PDF.
4. **PDF page size is trimmed to the exact canvas** (`local\tools\fix_pdf.py`). Trap found: Chrome rounds the PDF page height up by about half a point (1350 px became 1350.7 px), which would make an imported carousel page a fraction of a pixel off size. The fix crops that sliver from the bottom so the top edge stays aligned.

## Fonts: no substitution

- The brand's heading font is commercial, so part 1 uses free substitutes that are in Canva's own font library (the brand capture's suggestion; Alex settles it at the sign-off).
- **Static font instances, not variable fonts.** A variable font can end up in the PDF in a form Canva can't map; static weights embed under their real names, so a PDF imported into Canva keeps live, editable text in a font Canva already has.
- **Failed loads are visible.** Every type role falls back to monospace, so a font that didn't load shows at a glance in the preview instead of silently becoming a lookalike. `page.js` also writes the font status to the page.

## Checks every export goes through

Exact pixel size (scripted), grid margins and safe zones, fonts as specified with no fallback, colour roles per the build sheet, body-text contrast, legibility at phone feed width, max lines per text slot. A subagent that didn't build the templates runs them (spec methodology step 6).

## Into Canva (part 2, not started)

Waits for Alex's answers on how the session gets into Canva and which account. The PNG previews and the carousel PDF are the import-ready files; where an import doesn't hold up (locking, grouping), the template is rebuilt in Canva's editor from the build sheet.
