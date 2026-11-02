import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { marked, type Tokens } from "marked";
import docsIndex from "@/content/docs/index.json";
import { Reveal } from "../../motion";
import "../../article.css";

// The charter and the meta specs, copied in with private details redacted by scripts/sync_docs.py.
// Set in Addvery's article typography (their case-study `study_rich`), under a dark title band
// that takes the document's own H1.

export const dynamicParams = false;

type Doc = (typeof docsIndex.docs)[number];

function find(slug: string): Doc | undefined {
  return docsIndex.docs.find((d) => d.slug === slug);
}

// The markdown's leading H1 goes into the title band; the rest is the article. Tables get a box of
// their own, so a wide one scrolls sideways inside it and never the page.
function render(markdown: string): { title?: string; html: string } {
  const tokens = marked.lexer(markdown);
  const first = tokens.findIndex((t) => t.type !== "space");
  let title: string | undefined;
  const head = tokens[first];
  if (head && head.type === "heading" && (head as Tokens.Heading).depth === 1) {
    title = marked.parseInline(head.text, { async: false }) as string;
    tokens.splice(0, first + 1);
  }
  const html = marked
    .parser(tokens)
    .replace(/<table>/g, '<div class="art-table" tabindex="0"><table>')
    .replace(/<\/table>/g, "</table></div>");
  return { title, html };
}

export function generateStaticParams() {
  return docsIndex.docs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = find(slug);
  return { title: doc ? `${doc.label} · Hire Me Hackathon` : "Hire Me Hackathon" };
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = find(slug)!;
  const markdown = readFileSync(path.join(process.cwd(), "content", "docs", `${slug}.md`), "utf-8");
  const { title, html } = render(markdown);
  return (
    <main className="art art-doc">
      <header className="art-hero art-band">
        <Reveal className="art-container">
          <p className="art-back">
            <Link href="/">← Back to the live feed</Link>
          </p>
          <div className="art-eyebrow-row">
            <span className="art-eyebrow-line" aria-hidden="true" />
            <p className="art-eyebrow is-lavender">Charter and specs</p>
            <p className="art-eyebrow is-lavender">{doc.label}</p>
          </div>
          {title ? (
            <h1 className="art-h1" dangerouslySetInnerHTML={{ __html: title }} />
          ) : (
            <h1 className="art-h1">{doc.title}</h1>
          )}
          <p className="art-hero-lead">
            {doc.label}, shared from the project&rsquo;s working files as of {docsIndex.synced} (Prague). A few
            private details are redacted.
          </p>
        </Reveal>
      </header>
      <section className="art-doc-body">
        <div className="art-container">
          <article className="art-rich" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </section>
    </main>
  );
}
