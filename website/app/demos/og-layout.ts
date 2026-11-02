// Line layout for an entry's link-preview card (opengraph-image.tsx) and its build-time check.
//
// The card sets the title in fixed lines. This module measures the text with the card's own font file
// (advance widths from the TTF's cmap and hmtx tables; kerning is left out, which only overestimates
// widths, never underestimates) and breaks it the way the card draws it. Over 3 lines at the card's
// size, or a kicker wider than one line, throws: the build fails and nothing is shrunk (S-D5-B1 item 4).
//
// No Next or React imports, so `node app/demos/og-layout.ts` style tests can load it directly.

export type FontMetrics = {
  unitsPerEm: number;
  /** Advance width in font units, or null if the font has no glyph for the code point. */
  advance(codePoint: number): number | null;
};

/** Reads the advance widths of a TrueType/OpenType font (cmap format 4 or 12, hmtx). */
export function readFontMetrics(bytes: Uint8Array): FontMetrics {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const u16 = (o: number) => view.getUint16(o);
  const i16 = (o: number) => view.getInt16(o);
  const u32 = (o: number) => view.getUint32(o);

  const tables = new Map<string, number>();
  const numTables = u16(4);
  for (let i = 0; i < numTables; i++) {
    const rec = 12 + i * 16;
    const tag = String.fromCharCode(bytes[rec], bytes[rec + 1], bytes[rec + 2], bytes[rec + 3]);
    tables.set(tag, u32(rec + 8));
  }
  const need = (tag: string) => {
    const o = tables.get(tag);
    if (o === undefined) throw new Error(`OG font: no ${tag} table`);
    return o;
  };

  const unitsPerEm = u16(need("head") + 18);
  const numberOfHMetrics = u16(need("hhea") + 34);
  const hmtx = need("hmtx");
  const advanceOfGlyph = (g: number) => u16(hmtx + 4 * Math.min(g, numberOfHMetrics - 1));

  // Pick the best Unicode subtable: format 12 (3,10) first, then format 4 (3,1 or 0,x).
  const cmap = need("cmap");
  let sub12 = -1;
  let sub4 = -1;
  for (let i = 0; i < u16(cmap + 2); i++) {
    const rec = cmap + 4 + i * 8;
    const platform = u16(rec);
    const encoding = u16(rec + 2);
    const at = cmap + u32(rec + 4);
    const format = u16(at);
    if (format === 12 && (platform === 3 || platform === 0)) sub12 = at;
    if (format === 4 && ((platform === 3 && encoding === 1) || platform === 0)) sub4 = at;
  }

  function glyph(cp: number): number {
    if (sub12 >= 0) {
      const groups = u32(sub12 + 12);
      for (let i = 0; i < groups; i++) {
        const g = sub12 + 16 + i * 12;
        const start = u32(g);
        const end = u32(g + 4);
        if (cp >= start && cp <= end) return u32(g + 8) + (cp - start);
      }
      return 0;
    }
    if (sub4 >= 0 && cp <= 0xffff) {
      const segX2 = u16(sub4 + 6);
      const ends = sub4 + 14;
      const starts = ends + segX2 + 2;
      const deltas = starts + segX2;
      const offsets = deltas + segX2;
      for (let s = 0; s < segX2; s += 2) {
        if (u16(ends + s) < cp) continue;
        const start = u16(starts + s);
        if (start > cp) return 0;
        const delta = i16(deltas + s);
        const ro = u16(offsets + s);
        if (ro === 0) return (cp + delta) & 0xffff;
        const g = u16(offsets + s + ro + 2 * (cp - start));
        return g === 0 ? 0 : (g + delta) & 0xffff;
      }
    }
    return 0;
  }

  return {
    unitsPerEm,
    advance(cp) {
      const g = glyph(cp);
      return g === 0 ? null : advanceOfGlyph(g);
    },
  };
}

export type TextStyle = { size: number; tracking: number; uppercase?: boolean };

/** Width in px of one run of text, letter-spacing included (as the card renders it). */
export function measure(font: FontMetrics, text: string, style: TextStyle): number {
  const s = style.uppercase ? text.toUpperCase() : text;
  let units = 0;
  let count = 0;
  for (const ch of s) {
    const cp = ch.codePointAt(0)!;
    const a = font.advance(cp);
    if (a === null) {
      throw new Error(`the link-preview font has no "${ch}" (U+${cp.toString(16).toUpperCase().padStart(4, "0")})`);
    }
    units += a;
    count += 1;
  }
  return (units / font.unitsPerEm) * style.size + count * style.tracking * style.size;
}

// The card's geometry and type, in px at 1200 x 630, after S-D5's re-skinned link-card mockup
// (blog-articles/VISUALS.md, "link"): margins 64 top, left and right and 96 at the bottom, for the
// LinkedIn and X crops. These are the "chosen size"; nothing scales them down.
export const CARD = {
  width: 1200,
  height: 630,
  margin: 64,
  bar: { top: 64, width: 128, height: 8 },
  kicker: { top: 104, size: 36, tracking: 0.12, uppercase: true, lineHeight: 40, maxWidth: 800 },
  title: { top: 168, size: 72, tracking: -0.02, lineHeight: 80, maxWidth: 800, maxLines: 3 },
  hairline: { top: 454, height: 2 },
  mark: { top: 486, size: 48 },
  byline: { left: 128, top: 490, size: 36, tracking: -0.01, lineHeight: 40 },
} as const;

/** The card's kicker names the section, as the mockup's "Blog · ..." did, when it fits on the line. */
export const KICKER_PREFIX = "GTM demos · ";

const NBSP = " ";

/** Greedy word wrap of `words` at `width`. A word wider than the width gets a line of its own. */
function wrap(font: FontMetrics, words: string[], width: number, style: TextStyle): string[] {
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (line && measure(font, next, style) > width) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export type CardText = {
  kicker: string;
  title: string;
  title_lines?: string[];
  accent?: string;
};

/**
 * The title's lines on the card. `title_lines` are forced breaks, as on the page; any piece (a given
 * line, or the whole title) that is wider than the card's column wraps inside itself, balanced: the
 * fewest lines a greedy wrap needs, then as even as they go. The accent phrase never splits. Throws
 * when the title needs more than 3 lines in all, or the kicker runs past one line.
 */
export function layoutCard(
  font: FontMetrics,
  text: CardText,
  options: { prefix?: boolean } = {},
): { kicker: string; lines: string[] } {
  // The section prefix goes on when the line holds it; the author's kicker alone must always fit.
  const k = CARD.kicker;
  const kw = measure(font, text.kicker, k);
  if (kw > k.maxWidth) {
    throw new Error(
      `cover.kicker "${text.kicker}" is ${Math.round(kw)} px wide on the link-preview card; one line holds ${k.maxWidth} px at ${k.size} px. Shorten it.`,
    );
  }
  const prefixed = `${KICKER_PREFIX}${text.kicker}`;
  const kicker = options.prefix !== false && measure(font, prefixed, k) <= k.maxWidth ? prefixed : text.kicker;

  const t = CARD.title;
  const pieces = text.title_lines && text.title_lines.length > 0 ? text.title_lines : [text.title];
  const lines = pieces.flatMap((piece) => balanced(font, piece, text.accent, t));

  if (lines.length > t.maxLines) {
    throw new Error(
      `the title needs ${lines.length} lines on the link-preview card at ${t.size} px (${lines.map((l) => `"${l}"`).join(" / ")}); the card holds ${t.maxLines}. It is never shrunk: shorten the title${text.title_lines ? " or break title_lines differently" : ""}.`,
    );
  }
  return { kicker, lines };
}

/** One piece of the title, wrapped and balanced at the card's column, the accent phrase kept whole. */
function balanced(font: FontMetrics, piece: string, accent: string | undefined, t: TextStyle & { maxWidth: number }): string[] {
  const glued = accent && piece.includes(accent) ? piece.replace(accent, accent.replaceAll(" ", NBSP)) : piece;
  const words = glued.split(" ").filter(Boolean);
  const widest = Math.max(...words.map((w) => measure(font, w, t)));
  if (widest > t.maxWidth) {
    throw new Error(`"${words.find((w) => measure(font, w, t) === widest)!.replaceAll(NBSP, " ")}" is ${Math.round(widest)} px wide on the link-preview card; a line holds ${t.maxWidth} px.`);
  }
  const greedy = wrap(font, words, t.maxWidth, t);
  let lo = widest;
  let hi = t.maxWidth;
  while (hi - lo > 1) {
    const mid = (lo + hi) / 2;
    if (wrap(font, words, mid, t).length <= greedy.length) hi = mid;
    else lo = mid;
  }
  return wrap(font, words, hi, t).map((l) => l.replaceAll(NBSP, " "));
}

/** Splits a line around the accent phrase, for drawing the phrase in the gradient. */
export function splitAccent(line: string, accent?: string): { before: string; accent: string; after: string } | null {
  if (!accent) return null;
  const at = line.indexOf(accent);
  if (at < 0) return null;
  return { before: line.slice(0, at), accent, after: line.slice(at + accent.length) };
}
