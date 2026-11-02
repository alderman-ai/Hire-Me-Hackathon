import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { marked, type Tokens } from "marked";
import { Reveal } from "../motion";
import "../article.css";

// The privacy notice for the GetSales alert (BUILD S-D3-B3). Text from getsales\site\privacy.md,
// copied into content\privacy.md. Reachable by URL only until Alex ticks the pre-send gate.
// Set like the doc pages: a dark title band with the notice's own H1, then Addvery's article type.

export const metadata: Metadata = {
  title: "Privacy notice · Hire Me Hackathon",
  robots: { index: false, follow: false },
};

// The markdown's leading H1 goes into the title band; tables get a scrolling box of their own.
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

export default function PrivacyPage() {
  const markdown = readFileSync(path.join(process.cwd(), "content", "privacy.md"), "utf-8");
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
            <p className="art-eyebrow is-lavender">Hire Me Hackathon</p>
          </div>
          {title ? (
            <h1 className="art-h1" dangerouslySetInnerHTML={{ __html: title }} />
          ) : (
            <h1 className="art-h1">Privacy notice</h1>
          )}
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
