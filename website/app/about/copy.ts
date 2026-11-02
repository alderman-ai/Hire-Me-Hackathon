import { readFileSync } from "node:fs";
import path from "node:path";
import { Marked, type Token, type Tokens } from "marked";

// Alex's About-me copy (linkedin-content/local/about/about-me.md, copied in by
// scripts/about_assets.py) into the page's parts. It sits in the git-ignored local/ folder, which still
// deploys: it paraphrases Addvery's job ad, and SPEC.md section 3 keeps that out of the public repo.
//
// The text is his and isn't changed: " -- " stays as he typed it (his "still human" mark), never an
// em dash. The file's shape:
//   # About me                      -> not shown; the page has its own H1
//   **One line.**                   -> the hero's lead
//   ## Heading + paragraphs         -> one section each; the last one is the lilac "belief" band
//   > "Quote"  >  > -- Alex Alderman -> a feature quote: figure, blockquote, figcaption

const FILE = path.join(/* turbopackIgnore: true */ process.cwd(), "local", "about", "about-me.md");

// The link to Alex's second article ("GTM engineers and the AI jobs promise"). The copy links it as
// [Read the long version: ...](ARTICLE-2-LINK) and, while the href is still this placeholder, that
// paragraph is left off the page. Once the article is live, replace ARTICLE-2-LINK in
// local/about/about-me.md (and in linkedin-content/local/about/about-me.md, its source) with its URL,
// for example /demos/<slug>, and the link shows at the end of the belief band.
const ARTICLE_2_PLACEHOLDER = "ARTICLE-2-LINK";

export type CopyBlock = { kind: "p"; html: string } | { kind: "quote"; html: string; by: string };
export type CopySection = { id: string; title: string; blocks: CopyBlock[] };
export type AboutCopy = { leadHtml: string; sections: CopySection[] };

const marked = new Marked({ async: false, gfm: true });
const inline = (md: string) => marked.parseInline(md) as string;

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** True if the paragraph links to a placeholder that isn't a real URL yet. */
function linksToPlaceholder(p: Tokens.Paragraph): boolean {
  return (p.tokens ?? []).some((t) => t.type === "link" && (t as Tokens.Link).href === ARTICLE_2_PLACEHOLDER);
}

function quote(token: Tokens.Blockquote): CopyBlock {
  const paras = token.tokens.filter((t): t is Tokens.Paragraph => t.type === "paragraph");
  const last = paras[paras.length - 1];
  const by = last && /^--\s+/.test(last.text) ? last.text.replace(/^--\s+/, "").trim() : "";
  const body = (by ? paras.slice(0, -1) : paras).map((p) => p.text).join("\n\n");
  // The quote marks are the figure's job (the hanging mark), so the straight quotes round it go.
  const text = body.replace(/^"([\s\S]*)"$/, "$1");
  return { kind: "quote", html: inline(text), by: by || "Alex Alderman" };
}

export function readAboutCopy(): AboutCopy {
  let md: string;
  try {
    md = readFileSync(FILE, "utf8");
  } catch {
    throw new Error(
      "/about needs local/about/about-me.md (git-ignored). Run `python scripts\\about_assets.py` to copy it in.",
    );
  }
  const tokens: Token[] = marked.lexer(md);
  let leadHtml = "";
  const sections: CopySection[] = [];
  for (const t of tokens) {
    if (t.type === "heading") {
      const h = t as Tokens.Heading;
      if (h.depth === 2) sections.push({ id: slugify(h.text), title: h.text, blocks: [] });
      continue;
    }
    const current = sections[sections.length - 1];
    if (t.type === "paragraph") {
      const p = t as Tokens.Paragraph;
      // The article-2 link waits for its URL (see ARTICLE_2_PLACEHOLDER above).
      if (linksToPlaceholder(p)) continue;
      if (!current) leadHtml = leadHtml || inline(p.text);
      else current.blocks.push({ kind: "p", html: inline(p.text) });
    } else if (t.type === "blockquote" && current) {
      current.blocks.push(quote(t as Tokens.Blockquote));
    }
  }
  if (!leadHtml || sections.length < 2) throw new Error("local/about/about-me.md: expected a lead line and at least two ## sections");
  return { leadHtml, sections };
}
