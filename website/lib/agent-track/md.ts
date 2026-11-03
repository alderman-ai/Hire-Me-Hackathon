import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { Marked, type Tokens } from "marked";
import { abs, mmss, youtube } from "./site";

// Turning the site's own content into plain Markdown for the agent track: an article body's callouts
// (app/articles/markdown.ts renders them as HTML), inline HTML from the About copy, and feed blocks.
// No UI words: no "Play", no "Read more", no button labels.

/** Maps a site path (or URL) to the URL the track links: its .md doc if it has one, else the human page. */
export type Linker = (href: string) => string;

const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  rsquo: "’",
  lsquo: "‘",
  rdquo: "”",
  ldquo: "“",
  mdash: "—",
  ndash: "–",
  hellip: "…",
  middot: "·",
};

export function decode(s: string): string {
  return s
    .replace(/&#(\d+);/g, (_, n: string) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n: string) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, n: string) => ENTITIES[n.toLowerCase()] ?? m);
}

/** Inline HTML (marked's parseInline output) back to Markdown, links through the linker. */
export function htmlToMd(html: string, link: Linker): string {
  return decode(
    html
      .replace(/<a\s+[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href: string, text: string) => `[${text}](${link(decode(href))})`)
      .replace(/<\/?(strong|b)>/gi, "**")
      .replace(/<\/?(em|i)>/gi, "*")
      .replace(/<\/?code>/gi, "`")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<[^>]+>/g, ""),
  );
}

/** Site-relative Markdown links and images made absolute (docs to their .md). */
export function fixLinks(md: string, link: Linker): string {
  return md.replace(/\]\((\/[^)\s]*)\)/g, (_, href: string) => `](${link(href)})`);
}

/** A line of a person's own text, safe as Markdown: a leading #, >, - or 1. isn't read as structure. */
export function plainLine(line: string): string {
  return line.replace(/^(\s*)([#>]|[-+*](?=\s)|\d+[.)](?=\s))/, "$1\\$2");
}

/** Plain text (a post, a quote) as a Markdown blockquote, line breaks kept. */
export function blockquote(text: string): string {
  return text
    .replace(/\r\n?/g, "\n")
    .trim()
    .split("\n")
    .map((l) => (l.trim() ? `> ${plainLine(l)}` : ">"))
    .join("\n");
}

/** "[Video: <title>](<YouTube link at the start>)", with the length when the clip has an end. */
export function videoLink(title: string, id: string, start?: number | null, end?: number | null, length?: string): string {
  const len = length ? ` (${length})` : end && end > (start ?? 0) ? ` (${mmss(end - (start ?? 0))})` : "";
  return `[Video: ${title}](${youtube(id, start)})${len}`;
}

const PUBLIC = path.join(/* turbopackIgnore: true */ process.cwd(), "public");

/** An article body (POST-FORMAT, app/articles/markdown.ts) as plain Markdown. */
export function articleBodyMd(body: string, link: Linker): string {
  const md = new Marked({ gfm: true });
  const tokens = md.lexer(body.replace(/\r\n?/g, "\n"));
  const out: string[] = [];
  for (const tok of tokens) {
    if (tok.type === "space" || tok.type === "html") continue; // only comments get past the build's checks
    if (tok.type === "blockquote") {
      const md = callout(tok as Tokens.Blockquote, link);
      if (md) out.push(md);
      continue;
    }
    const raw = tok.raw.replace(/<!--[\s\S]*?-->/g, "").trim();
    if (raw) out.push(fixLinks(raw, link));
  }
  return out.join("\n\n");
}

function callout(token: Tokens.Blockquote, link: Linker): string {
  const lines = token.text.split("\n");
  const head = lines[0].trim();
  const rest = lines.slice(1).map((l) => l.trim());
  const filled = rest.filter(Boolean);

  // Repeats body text, or is filled by the page's own parts: nothing to add.
  if (head === "[!pull]" || /^\[!slot\]/.test(head)) return "";

  if (head === "[!quote]") {
    const [quote, credit] = filled;
    return `> ${quote}\n>\n> ${credit}`;
  }

  const fig = /^\[!figure\](?: (.*))?$/.exec(head);
  if (fig) {
    const [alt, caption] = filled;
    const src = (fig[1] ?? "").trim();
    return `![${alt}](${abs(src)})${caption ? `\n\n*${caption}*` : ""}`;
  }

  const clip = /^\[!video\] ([A-Za-z0-9_-]{11})(?: (\d+))?(?: (\d+))?$/.exec(head);
  if (clip) {
    const [, id, s, e] = clip;
    return videoLink(filled[0] ?? "Clip", id, s ? Number(s) : undefined, e ? Number(e) : undefined);
  }

  if (head === "[!summary]") {
    const items = rest.map((l) => /^[-*]\s+(.*)$/.exec(l)?.[1]).filter((x): x is string => !!x);
    return `**Key points**\n\n${items.map((i) => `- ${fixLinks(i, link)}`).join("\n")}`;
  }

  const d = /^\[!diagram\] (scale|flow)$/.exec(head);
  if (d) {
    const caption = filled[0] ?? "";
    const items = filled
      .slice(1)
      .map((l) => /^\d+\.\s+(.*)$/.exec(l)?.[1])
      .filter((x): x is string => !!x);
    return `**${caption}**\n\n${items.map((it, i) => `${i + 1}. ${it}`).join("\n")}`;
  }

  const card = /^\[!(post|carousel)\] (.+)$/.exec(head);
  if (card) {
    const meta: Record<string, string> = {};
    let i = 0;
    for (; i < rest.length && rest[i]; i++) {
      const m = /^(format|label|slides|variant):\s*(.+)$/.exec(rest[i]);
      if (m) meta[m[1]] = m[2];
    }
    const text = lines.slice(1 + i).join("\n").trim();
    const info = [meta.format, meta.label].filter(Boolean).join(" · ");
    let slides = "";
    if (card[1] === "carousel" && meta.slides) {
      const altFile = path.join(PUBLIC, meta.slides, "alt.json");
      if (existsSync(altFile)) {
        const list = JSON.parse(readFileSync(altFile, "utf8")) as { file: string; alt: string }[];
        slides = "\n\n" + list.map((sl) => `![${sl.alt}](${abs(`${meta.slides}/${sl.file}`)})`).join("\n");
      }
    }
    return `**${card[2]}**${info ? ` (${info})` : ""}\n\n${blockquote(text)}${slides}`;
  }

  return fixLinks(token.raw.trim(), link);
}
