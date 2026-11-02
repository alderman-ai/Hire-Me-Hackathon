import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { Marked, type Token, type Tokens, type TokensList } from "marked";

// An entry's body (POST-FORMAT v1.1 §3) to HTML, for app/demos/[slug]/page.tsx.
//
// Plain Markdown goes through marked. The four additions are handled here:
//   > [!pull]           -> <aside class="entry-pull" aria-hidden="true">, so it isn't read twice
//   > [!summary]        -> the "Key points" box
//   > [!diagram] scale  -> a vertical scale, item 1 on top, in HTML and CSS
//   > [!diagram] flow   -> numbered steps with arrows (left to right on wide screens)
//   [Alex: ...]         -> <mark class="entry-note">, yellow, only ever on previews
//   > [!quote]           -> Alex's own words (POST-FORMAT v1.4 §3.7): a real <blockquote> in a
//                            <figure>, the attribution as its <figcaption>; read by screen readers.
//                            0 to 5 per entry, at most two per section, may sit in the lede after
//                            its first paragraph, never the last block
//   > [!figure] <path>   -> an image (POST-FORMAT v1.5 §3.8) from public/demos-assets/<slug>/, alt text
//                            on line 2, an optional caption on line 3; the reading column's width,
//                            lazy-loaded; 0 to 8 per entry, never the last block; a missing file fails
//   > [!video] <id> [start] [end] -> an inline clip (POST-FORMAT v1.3 §3.6): a 16:9 youtube-nocookie
//                            player, loaded by ./clips.tsx when it scrolls into view, captioned;
//                            never in the lede
//   > [!post] <title>     -> a neutral post card (never LinkedIn's interface): format and label lines,
//   > [!carousel] <title>    a blank line, then the post text as written (line breaks kept). A carousel
//                            adds `slides: /demos/<folder>` (in public/, with an alt.json) and draws a
//                            slide strip above its caption. A [!post] with `variant: contrast` right
//                            after another post card sits beside it on wide screens.
// Anything POST-FORMAT doesn't allow (raw HTML but comments, images, H1, H4 and deeper, rules,
// plain blockquotes) throws, which fails the build with the file's name.

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const PUBLIC = path.join(/* turbopackIgnore: true */ process.cwd(), "public");

/** Pixel size of a WebP (VP8, VP8L, VP8X) or PNG, for the img's width and height; null if unknown. */
function imageSize(b: Buffer): { w: number; h: number } | null {
  if (b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP") {
    const chunk = b.toString("ascii", 12, 16);
    if (chunk === "VP8 ") return { w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff };
    if (chunk === "VP8L") {
      return { w: 1 + (((b[22] & 0x3f) << 8) | b[21]), h: 1 + (((b[24] & 0xf) << 10) | (b[23] << 2) | ((b[22] & 0xc0) >> 6)) };
    }
    if (chunk === "VP8X") return { w: 1 + b.readUIntLE(24, 3), h: 1 + b.readUIntLE(27, 3) };
  }
  if (b.length > 24 && b.readUInt32BE(0) === 0x89504e47) return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
  return null;
}

/** An SVG's size from its width/height attributes or its viewBox, for the img's aspect ratio. */
function svgSize(svg: string): { w: number; h: number } | null {
  const tag = /<svg\b[^>]*>/i.exec(svg)?.[0] ?? "";
  const num = (name: string) => Number(new RegExp(`\\b${name}="([\\d.]+)(?:px)?"`).exec(tag)?.[1]);
  const w = num("width");
  const h = num("height");
  if (w > 0 && h > 0) return { w: Math.round(w), h: Math.round(h) };
  const vb = /\bviewBox="[\d.-]+[ ,]+[\d.-]+[ ,]+([\d.]+)[ ,]+([\d.]+)"/.exec(tag);
  return vb ? { w: Math.round(Number(vb[1])), h: Math.round(Number(vb[2])) } : null;
}

function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/&/g, "and")
      .replace(/['’]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "section"
  );
}

type Rendered = { html: string };

export function renderBody(markdown: string, fail: (msg: string) => never): Rendered {
  const ids = new Set<string>(["key-points", "how-this-was-made", "entry-title", "content"]);
  const uniqueId = (text: string) => {
    const base = slugify(text);
    let id = base;
    for (let n = 2; ids.has(id); n++) id = `${base}-${n}`;
    ids.add(id);
    return id;
  };

  const md = new Marked({ gfm: true });
  md.use({
    extensions: [
      {
        name: "alexNote",
        level: "inline",
        start(src: string) {
          const i = src.indexOf("[Alex:");
          return i < 0 ? undefined : i;
        },
        tokenizer(src: string) {
          const m = /^\[Alex: ([^[\]\n]+)\]/.exec(src);
          if (m) return { type: "alexNote", raw: m[0], text: m[1] };
          if (src.startsWith("[Alex")) fail(`malformed note for Alex: ${src.slice(0, 60)}`);
          return undefined;
        },
        renderer(token) {
          return `<mark class="entry-note"><strong>Alex:</strong> ${esc(String(token.text))}</mark>`;
        },
      },
    ],
    renderer: {
      heading({ tokens, depth, text }: Tokens.Heading) {
        if (depth === 1 || depth > 3) fail(`only ## and ### headings are allowed, found ${"#".repeat(depth)} ${text}`);
        return `<h${depth} id="${uniqueId(text)}">${this.parser.parseInline(tokens)}</h${depth}>\n`;
      },
      image() {
        return fail("images aren't allowed in the body");
      },
      hr() {
        return fail("horizontal rules aren't allowed");
      },
      html({ text }: Tokens.HTML | Tokens.Tag) {
        if (/^\s*<!--[\s\S]*?-->\s*$/.test(text)) return "";
        return fail(`raw HTML isn't allowed: ${text.trim().slice(0, 60)}`);
      },
    },
  });

  const all = md.lexer(markdown.replace(/\r\n?/g, "\n"));
  const renderOne = (token: Token) =>
    md.parser(Object.assign([token], { links: all.links }) as unknown as TokensList);

  const out: string[] = [];
  const tokens = all.filter((t) => t.type !== "space");
  const isCard = (t: Token | undefined, contrast: boolean) =>
    t?.type === "blockquote" &&
    /^\[!(post|carousel)\] /.test((t as Tokens.Blockquote).text) &&
    /^variant:\s*contrast\s*$/m.test((t as Tokens.Blockquote).text) === contrast;
  let inLede = true;
  let ledeParagraphs = 0;
  let quotes = 0;
  let quotesInSection = 0;
  let figures = 0;
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.type === "heading" && (token as Tokens.Heading).depth === 2) {
      inLede = false;
      quotesInSection = 0;
    }
    if (inLede && token.type === "paragraph") ledeParagraphs++;
    if (token.type === "blockquote" && /^\[!figure\]/.test((token as Tokens.Blockquote).text)) {
      figures++;
      if (figures > 8) fail("an entry holds at most 8 [!figure] blocks");
      if (i === tokens.length - 1) fail("a [!figure] can't be the entry's last block");
    }
    if (token.type === "blockquote" && /^\[!quote\]/.test((token as Tokens.Blockquote).text)) {
      quotes++;
      quotesInSection++;
      if (quotes > 5) fail("an entry holds at most 5 [!quote] blocks");
      if (quotesInSection > 2) fail("a section holds at most two [!quote] blocks");
      if (inLede && ledeParagraphs === 0) fail("a [!quote] in the lede comes after its first paragraph");
      if (i === tokens.length - 1) fail("a [!quote] can't be the entry's last block");
    }
    if (inLede && token.type === "blockquote" && /^\[!video\]/.test((token as Tokens.Blockquote).text)) {
      fail("a [!video] clip can't sit in the lede (before the first ## heading)");
    }
    if (isCard(token, false) && isCard(tokens[i + 1], true)) {
      // A post and its contrast post: side by side on wide screens.
      const pair = callout(token as Tokens.Blockquote) + callout(tokens[i + 1] as Tokens.Blockquote);
      out.push(`<div class="entry-compare">${pair}</div>\n`);
      i++;
    } else if (token.type === "blockquote") {
      out.push(callout(token as Tokens.Blockquote));
    } else if (token.type === "table") {
      const t = token as Tokens.Table;
      const label = t.header.map((h) => h.text).join(", ");
      out.push(
        `<div class="entry-table" role="region" tabindex="0" aria-label="Table: ${esc(label)}">${renderOne(token)}</div>`,
      );
    } else if (token.type === "code") {
      out.push(renderOne(token).replace("<pre>", '<pre tabindex="0" role="region" aria-label="Code example">'));
    } else {
      out.push(renderOne(token));
    }
  }
  return { html: out.join("") };

  function callout(token: Tokens.Blockquote): string {
    const lines = token.text.split("\n");
    const head = lines[0].trim();
    const rest = lines.slice(1);

    if (head === "[!quote]") return featureQuote(rest);

    const fig = /^\[!figure\](?: (.*))?$/.exec(head);
    if (fig) return figure((fig[1] ?? "").trim(), rest);

    const clip = /^\[!video\](?: (.*))?$/.exec(head);
    if (clip) return videoClip((clip[1] ?? "").trim(), rest);

    const card = /^\[!(post|carousel)\] (.+)$/.exec(head);
    if (card) return postCard(card[1] as "post" | "carousel", card[2].trim(), rest);

    if (head === "[!pull]") {
      const quote = rest.join(" ").trim();
      if (!quote) fail("a [!pull] quote is empty");
      return `<aside class="entry-pull" aria-hidden="true"><p>${esc(quote)}</p></aside>\n`;
    }

    if (head === "[!summary]") {
      const items = rest
        .map((l) => /^\s*[-*]\s+(.*)$/.exec(l)?.[1])
        .filter((x): x is string => !!x && x.trim().length > 0);
      if (items.length === 0) fail("the [!summary] box has no points");
      const lis = items.map((i) => `<li>${md.parseInline(i, { async: false }) as string}</li>`).join("");
      return (
        `<aside class="entry-points" aria-labelledby="key-points">` +
        `<h2 id="key-points" class="entry-points-title">Key points</h2><ul>${lis}</ul></aside>\n`
      );
    }

    const d = /^\[!diagram\] (scale|flow)$/.exec(head);
    if (d) {
      const kind = d[1];
      const caption = (rest[0] ?? "").trim();
      const items = rest
        .slice(1)
        .map((l) => /^\s*\d+\.\s+(.*)$/.exec(l)?.[1]?.trim())
        .filter((x): x is string => !!x);
      if (!caption || /^\d+\./.test(caption)) fail(`the [!diagram] ${kind} needs a caption line before its items`);
      if (items.length < 3 || items.length > 6) fail(`the [!diagram] ${kind} needs 3 to 6 items, found ${items.length}`);
      const parts = items.map((item) => {
        const at = item.indexOf(": ");
        return at < 0 ? { label: item, note: "" } : { label: item.slice(0, at), note: item.slice(at + 2) };
      });
      const n = parts.length;
      const lis = parts
        .map((p, i) => {
          const note = p.note
            ? `<span class="sr-only">: </span><span class="entry-dg-note">${esc(p.note)}</span>`
            : "";
          if (kind === "flow") {
            return (
              `<li class="entry-flow-step"><span class="entry-flow-n" aria-hidden="true">${i + 1}</span>` +
              `<span class="entry-dg-label">${esc(p.label)}</span>${note}</li>`
            );
          }
          // The scale: one segment of the bar per item, darkest (plum) on top to lightest at the bottom.
          const t = n === 1 ? 0 : Math.round((i / (n - 1)) * 100);
          return (
            `<li class="entry-scale-step" style="--t:${t}%"><span class="entry-scale-seg" aria-hidden="true"></span>` +
            `<span class="entry-scale-text"><span class="entry-dg-label">${esc(p.label)}</span>${note}</span></li>`
          );
        })
        .join("");
      return (
        `<figure class="entry-diagram is-${kind} is-n${n}">` +
        `<ol class="entry-${kind}">${lis}</ol>` +
        `<figcaption>${esc(caption)}</figcaption></figure>\n`
      );
    }

    return fail(`every blockquote must open with [!pull], [!summary] or [!diagram] scale|flow, found "${head.slice(0, 40)}"`);
  }

  function postCard(type: "post" | "carousel", title: string, rest: string[]): string {
    const meta: Record<string, string> = {};
    let i = 0;
    for (; i < rest.length; i++) {
      const line = rest[i].trim();
      if (!line) break;
      const m = /^(format|label|slides|variant):\s*(.+)$/.exec(line);
      if (!m) fail(`[!${type}] "${title}": expected format:, label:, slides: or variant: lines, then a blank line; found "${line.slice(0, 40)}"`);
      meta[m[1]] = m[2].trim();
    }
    const text = rest.slice(i).join("\n").trim();
    if (!text) fail(`[!${type}] "${title}" has no post text after its blank line`);
    if (!meta.label) fail(`[!${type}] "${title}" needs a label: line (its score)`);
    if (meta.variant && meta.variant !== "contrast") fail(`[!${type}] "${title}": variant can only be contrast`);
    if (type === "carousel" && !meta.slides) fail(`[!carousel] "${title}" needs slides: /demos/<folder>`);

    const id = uniqueId(title);
    const n = /^Post (\d+): (.+)$/.exec(title);
    const name = n
      ? `<span class="entry-post-n">Post ${n[1]}</span><span class="sr-only">: </span><span class="entry-post-name">${esc(n[2])}</span>`
      : `<span class="entry-post-name">${esc(title)}</span>`;
    const paras = text
      .split(/\n\s*\n/)
      .map((p) => `<p>${p.split("\n").map(esc).join("<br>")}</p>`)
      .join("");
    const strip = type === "carousel" ? slideStrip(meta.slides, n ? `post ${n[1]}` : title) : "";
    const cls = `entry-post is-${type}${meta.variant === "contrast" ? " is-contrast" : ""}`;
    return (
      `<article class="${cls}" aria-labelledby="${id}"><header class="entry-post-head">` +
      `<h3 id="${id}" class="entry-post-title">${name}</h3><p class="entry-post-meta">` +
      (meta.format ? `<span class="entry-post-format">${esc(meta.format)}</span>` : "") +
      `<span class="entry-post-score">${esc(meta.label)}</span></p></header>` +
      `${strip}<div class="entry-post-text">${paras}</div></article>\n`
    );
  }

  function figure(src: string, rest: string[]): string {
    if (!/^\/demos-assets\/[a-z0-9]+(?:-[a-z0-9]+)*\/[\w.-]+\.(svg|png|webp)$/.test(src)) {
      fail(`a [!figure] path is /demos-assets/<slug>/<file>.svg|png|webp; found "${src}"`);
    }
    const file = path.join(PUBLIC, src);
    if (!existsSync(file)) fail(`[!figure] ${src}: public${src} is missing`);
    const lines = rest.map((l) => l.trim()).filter(Boolean);
    const [alt, caption] = lines;
    if (lines.length > 2) fail(`[!figure] ${src}: alt text and an optional caption, found ${lines.length} lines`);
    if (!alt || alt.length < 10 || alt.length > 160) fail(`[!figure] ${src}: the alt text is 10 to 160 characters, found ${alt?.length ?? 0}`);
    if (caption && caption.length > 140) fail(`[!figure] ${src}: the caption is at most 140 characters, found ${caption.length}`);
    const bytes = readFileSync(file);
    const size = src.endsWith(".svg") ? svgSize(bytes.toString("utf8")) : imageSize(bytes);
    const dims = size ? ` width="${size.w}" height="${size.h}"` : "";
    return (
      `<figure class="entry-figure"><img src="${esc(src)}" alt="${esc(alt)}"${dims} loading="lazy" decoding="async">` +
      (caption ? `<figcaption>${esc(caption)}</figcaption>` : "") +
      `</figure>\n`
    );
  }

  function featureQuote(rest: string[]): string {
    const lines = rest.map((l) => l.trim()).filter(Boolean);
    if (lines.length !== 2) fail(`a [!quote] is two lines, the quotation and its attribution; found ${lines.length}`);
    const [quote, credit] = lines;
    const words = quote.split(/\s+/).filter((t) => /[\p{L}\p{N}]/u.test(t)).length;
    if (words < 8 || words > 60) fail(`a [!quote] holds 8 to 60 words, found ${words}: "${quote.slice(0, 40)}"`);
    if (/["\u201c\u201d]|\[Alex|\*|\]\(/.test(quote)) fail(`a [!quote] is plain words: no quotation marks, emphasis, links or notes ("${quote.slice(0, 40)}")`);
    if (!credit.startsWith("Alex Alderman, ") || credit.length > 80 || credit.endsWith(".")) {
      fail(`a [!quote]'s attribution is "Alex Alderman, " then where and when, at most 80 characters, no end period; found "${credit}"`);
    }
    const where = credit.slice("Alex Alderman, ".length);
    return (
      `<figure class="entry-quote"><blockquote><p>${esc(quote)}</p></blockquote>` +
      `<figcaption><span class="entry-quote-name">Alex Alderman</span>, ${esc(where)}</figcaption></figure>\n`
    );
  }

  function videoClip(args: string, rest: string[]): string {
    const m = /^([A-Za-z0-9_-]{11})(?: (\d+))?(?: (\d+))?$/.exec(args);
    if (!m) fail(`[!video] needs an 11-character YouTube id, then optionally a start and an end second; found "${args}"`);
    const [, id, startText, endText] = m;
    const start = startText === undefined ? undefined : Number(startText);
    const end = endText === undefined ? undefined : Number(endText);
    if (start !== undefined && end !== undefined && end <= start) fail(`[!video] ${id}: the end second must come after the start`);
    const lines = rest.map((l) => l.trim()).filter(Boolean);
    const caption = lines[0] ?? "";
    if (!caption) fail(`[!video] ${id} needs a caption line`);
    if (lines.length > 1) fail(`[!video] ${id}: the caption is one line, found ${lines.length}`);
    if (caption.length > 100) fail(`[!video] ${id}: the caption is ${caption.length} characters, at most 100`);
    const params = new URLSearchParams();
    if (start) params.set("start", String(start));
    if (end) params.set("end", String(end));
    params.set("rel", "0");
    const src = `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
    const iframe = (lazy: boolean) =>
      `<iframe src="${esc(src)}" title="${esc(caption)}"${lazy ? ' loading="lazy"' : ""} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    // The player only exists once ./clips.tsx sees the frame near the viewport; without JavaScript the
    // browser's own lazy loading does the same from the <noscript> copy.
    return (
      `<figure class="entry-clip">` +
      `<div class="video-frame entry-clip-frame" data-clip data-src="${esc(src)}" data-title="${esc(caption)}">` +
      `<noscript>${iframe(true)}</noscript></div>` +
      `<figcaption>${esc(caption)}</figcaption></figure>\n`
    );
  }

  function slideStrip(dir: string, label: string): string {
    if (!/^\/demos\/[a-z0-9_/-]+$/.test(dir)) fail(`slides: must be a folder under public/demos/, found "${dir}"`);
    const folder = path.join(PUBLIC, dir);
    const altFile = path.join(folder, "alt.json");
    if (!existsSync(altFile)) fail(`slides ${dir}: public${dir}/alt.json is missing (the slides are git-ignored: copy them in)`);
    const slides = JSON.parse(readFileSync(altFile, "utf8")) as { slide: number; file: string; alt: string }[];
    if (!Array.isArray(slides) || slides.length === 0) fail(`slides ${dir}: alt.json lists no slides`);
    const lis = slides
      .map((sl) => {
        if (!sl.file || !/^[\w.-]+\.(webp|png)$/.test(sl.file) || !sl.alt?.trim()) {
          fail(`slides ${dir}: every alt.json entry needs a .webp or .png file and its alt text`);
        }
        const file = path.join(folder, sl.file);
        if (!existsSync(file)) fail(`slides ${dir}: ${sl.file} is missing`);
        const size = imageSize(readFileSync(file));
        const dims = size ? ` width="${size.w}" height="${size.h}"` : "";
        return `<li class="entry-strip-slide"><img src="${dir}/${sl.file}" alt="${esc(sl.alt)}"${dims} loading="lazy" decoding="async"></li>`;
      })
      .join("");
    const chevron = (d: string) =>
      `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path d="${d}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    return (
      `<div class="entry-strip" data-strip>` +
      `<div class="entry-strip-viewport" tabindex="0" role="region" aria-label="Slides for ${esc(label)}, ${slides.length} slides">` +
      `<ol class="entry-strip-list">${lis}</ol></div>` +
      `<div class="entry-strip-controls" hidden>` +
      `<button type="button" class="entry-strip-btn" data-step="-1" aria-label="Previous slide">${chevron("M15 5l-7 7 7 7")}</button>` +
      `<p class="entry-strip-status">Slide 1 of ${slides.length}</p>` +
      `<button type="button" class="entry-strip-btn" data-step="1" aria-label="Next slide">${chevron("M9 5l7 7-7 7")}</button>` +
      `</div></div>`
    );
  }
}
