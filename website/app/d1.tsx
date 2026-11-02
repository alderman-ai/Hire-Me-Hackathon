import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import d1 from "@/content/d1.json";
import { Carousel, type CarouselSlide } from "./carousel";
import "./d1.css";
import { NEW_SITE } from "./flags";
import { Crumb, REACH_GROUP } from "./crumb";

// The /d1 page (BUILD S-D1-B1): one framed page in the order of scraping\site\d1.md, read top to
// bottom. The eyebrow, headline and intro, then the research boards on the same dark stage, then
// the result, the three steps, the closed "Show me how" and the closing lines. The words are in
// content/d1.json; app/[demo]/page.tsx renders this in place of the shared demo layout.

const unlinked = new Set<string>(d1.unlinked_until_live);

// Its own link preview: the first board, made by scripts/d1_images.py. (Setting openGraph here
// replaces the site's file-based opengraph-image, so the image has to be named.)
const preview = { url: "/d1/og.png", width: 1200, height: 630, alt: d1.carousel.slides[0].alt ?? "" };

export const d1Metadata: Metadata = {
  title: d1.meta.title,
  description: d1.meta.description,
  alternates: { canonical: "/d1" },
  openGraph: {
    type: "article",
    url: "/d1",
    siteName: "Hire Me Hackathon",
    title: d1.meta.title,
    description: d1.meta.description,
    images: [preview],
  },
  twitter: {
    card: "summary_large_image",
    title: d1.meta.title,
    description: d1.meta.description,
    images: [preview],
  },
};

function TextLink({ href, text }: { href: string; text: string }) {
  if (href.startsWith("/")) {
    // A demo page that isn't live yet: the words stay, the link waits.
    return unlinked.has(href) ? <>{text}</> : <Link href={href}>{text}</Link>;
  }
  // The new-tab arrow stays on the line of the link's last word.
  const cut = text.lastIndexOf(" ") + 1;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="d1-ext">
      {text.slice(0, cut)}
      <span className="d1-ext-end">
        {text.slice(cut)}
        <span className="sr-only"> (opens in a new tab)</span>
        <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false">
          <path fill="currentColor" d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5z" />
        </svg>
      </span>
    </a>
  );
}

// The content's inline markup: **bold** and [text](href), nothing else.
function Inline({ text }: { text: string }) {
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(
      m[1] !== undefined ? (
        <strong key={m.index}>
          <Inline text={m[1]} />
        </strong>
      ) : (
        <TextLink key={m.index} href={m[3]} text={m[2]} />
      ),
    );
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

export function D1Article() {
  const slides: CarouselSlide[] = d1.carousel.slides.map((s) =>
    "href" in s && s.href && unlinked.has(s.href) ? { ...s, href: undefined } : s,
  );
  const { fold } = d1;

  return (
    <>
      <section className="art-hero d1-stage" aria-labelledby="d1-title">
        <div className="art-container">
          {NEW_SITE ? (
            <Crumb group={REACH_GROUP} />
          ) : (
            <p className="art-back">
              <Link href="/">← Back to the live feed</Link>
            </p>
          )}
          <div className="art-eyebrow-row">
            <span className="art-eyebrow-line" aria-hidden="true" />
            {/* The new site never says "Demo N" (VERDICT.md 2.7): the prefix goes, the rest stays. */}
            <p className="art-eyebrow is-lavender">{NEW_SITE ? d1.eyebrow.replace(/^Demo \d+\s*·\s*/, "") : d1.eyebrow}</p>
          </div>
          <h1 id="d1-title" className="art-h1 d1-h1">
            {d1.title}
          </h1>
          <p className="art-hero-lead d1-intro">{d1.intro}</p>
          <Carousel heading="The research boards" slides={slides} />
          <p className="d1-note">{d1.carousel.note}</p>
        </div>
      </section>

      <section className="d1-body" aria-label="How the briefing was made">
        <div className="art-container">
          <div className="art-rich d1-rich">
            <h2 className="sr-only">The result</h2>
            <p className="d1-highlight">{d1.highlight}</p>
            <p className="d1-lead-in">
              <strong>{d1.learned.lead}</strong>
            </p>
            <ul>
              {d1.learned.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2 className="sr-only">How it works</h2>
            <ol className="d1-steps">
              {d1.steps.map((step) => (
                <li key={step}>
                  <Inline text={step} />
                </li>
              ))}
            </ol>
            <p className="d1-cta">
              <Inline text={d1.cta} />
            </p>

            <details className="d1-fold">
              <summary className="d1-fold-summary">
                <span>{fold.summary}</span>
                <span className="d1-fold-marker" aria-hidden="true" />
              </summary>
              <div className="d1-fold-body">
                <p>{fold.intro}</p>
                <div className="art-table" tabIndex={0} role="region" aria-label={fold.table.label}>
                  <table>
                    <caption className="sr-only">{fold.table.label}</caption>
                    <thead>
                      <tr>
                        {fold.table.head.map((h) => (
                          <th key={h} scope="col">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {fold.table.rows.map((row) => (
                        <tr key={row[0]}>
                          {row.map((cell, j) => (
                            <td key={j}>
                              <Inline text={cell} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <ul>
                  {fold.items.map((item) => (
                    <li key={item}>
                      <Inline text={item} />
                    </li>
                  ))}
                </ul>
              </div>
            </details>

            <div className="d1-closing">
              {d1.closing.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
