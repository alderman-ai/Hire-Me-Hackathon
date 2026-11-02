import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  demoName,
  draftLine,
  entryUrl,
  findEntry,
  formatDate,
  lengthLabel,
  visibleEntries,
  type Entry,
} from "../entries";
import { renderBody } from "../markdown";
import { CoverGlow, CoverTitle, MadeBox, RingMark } from "../parts";
import { ClipLoader } from "../clips";
import { StripEnhancer } from "../strip";
import "../../article.css";
import "../demos.css";

// One GTM demo entry: /demos/<slug>. A written post, a video, or both (the video on top).
// Static: only the slugs visibleEntries() returns are built, every other slug is a 404. In a production
// build that's `published` entries only (see the gate in ../entries.ts).
//
// The cover is the gradient layer (black, the glow, the accent phrase in Addvery's text gradient) and
// matches the link-preview card in ./opengraph-image.tsx. The long read below is the editorial layer.

export const dynamicParams = false;

export function generateStaticParams() {
  return visibleEntries().map((e) => ({ slug: e.slug }));
}

const SITE = "https://hire-me-hackathon.vercel.app";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = findEntry(slug);
  if (!entry) return { title: "Not found · Hire Me Hackathon", robots: { index: false, follow: false } };
  const url = entryUrl(entry.slug);
  const live = entry.status === "published";
  // Every field the root layout sets is set again here, so nothing of the homepage's card leaks in.
  // The og:image and twitter:image come from ./opengraph-image.tsx (file-based metadata).
  return {
    title: `${entry.title} · Hire Me Hackathon`,
    description: entry.description,
    authors: [{ name: "Alex Alderman" }],
    keywords: entry.tags.length ? entry.tags : undefined,
    alternates: { canonical: url },
    robots: live ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      type: "article",
      url,
      siteName: "Hire Me Hackathon",
      locale: "en_GB",
      title: entry.title,
      description: entry.description,
      publishedTime: entry.date,
      authors: ["Alex Alderman"],
      tags: entry.tags.length ? entry.tags : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description: entry.description,
    },
  };
}

/** Article structured data. The image is the og:image route; on Vercel it resolves to the site. */
function jsonLd(entry: Entry): string {
  const url = `${SITE}${entryUrl(entry.slug)}`;
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: entry.title,
    description: entry.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: entry.date,
    dateModified: entry.date,
    author: { "@type": "Person", name: "Alex Alderman" },
    image: `${url}/opengraph-image`,
    keywords: entry.tags.length ? entry.tags.join(", ") : undefined,
    inLanguage: "en",
  };
  if (entry.video) {
    data.video = {
      "@type": "VideoObject",
      name: entry.title,
      description: entry.description,
      uploadDate: entry.date,
      thumbnailUrl: `https://i.ytimg.com/vi/${entry.video.youtube_id}/hqdefault.jpg`,
      embedUrl: `https://www.youtube-nocookie.com/embed/${entry.video.youtube_id}`,
    };
  }
  // "<" escaped so the JSON can't close the script element.
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default async function EntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = findEntry(slug);
  if (!entry) notFound();

  const live = entry.status === "published";
  const fail = (msg: string): never => {
    throw new Error(`content/demos/${entry.file}: ${msg}`);
  };
  const body = entry.body.trim() ? renderBody(entry.body, fail).html : "";
  const length = lengthLabel(entry);
  const demo = entry.deliverable ? demoName(entry.deliverable) : undefined;
  const what = entry.kind === "video" ? "entry" : "post";
  const v = entry.video;

  return (
    <main className={`art entry${v ? " has-video" : ""}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(entry) }} />

      <header className="entry-cover" aria-labelledby="entry-title">
        <CoverGlow />
        <div className="entry-track entry-cover-inner">
          {!live && (
            <p className="entry-flag">
              <strong>{draftLine(entry)}</strong>
              Only preview builds show this page. The live site never does.
            </p>
          )}
          <p className="art-back">
            <Link href="/demos">← All GTM demos</Link>
          </p>
          <div className="entry-kicker-row">
            <span className="entry-kicker-bar" aria-hidden="true" />
            <p className="entry-kicker">{entry.cover.kicker}</p>
          </div>
          <CoverTitle entry={entry} id="entry-title" />
          <p className="entry-subtitle">{entry.cover.subtitle}</p>
          <p className="entry-byline">
            <RingMark />
            <span className="entry-byline-name">{entry.author}</span>
            <span className="entry-byline-meta">
              <time dateTime={entry.date}>{formatDate(entry.date)}</time>
              {length && <span>{length}</span>}
            </span>
          </p>
        </div>
      </header>

      {v && (
        <div className="entry-track entry-video">
          <div className="video-frame">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${v.youtube_id}${v.start ? `?start=${v.start}` : ""}`}
              title={`Video: ${entry.title}`}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {(body || entry.made) && (
        <div className="entry-body">
          {body && <article className="entry-track entry-prose" dangerouslySetInnerHTML={{ __html: body }} />}
          {body.includes("data-strip") && <StripEnhancer />}
          {body.includes("data-clip") && <ClipLoader />}
          {entry.made && (
            <div className="entry-track entry-made-wrap">
              <MadeBox made={entry.made} what={what} />
            </div>
          )}
        </div>
      )}

      <nav className="art-cta entry-end" aria-label="More GTM demos">
        <div className="art-container art-cta-grid">
          <div className="art-cta-copy">
            <p className="art-eyebrow">Keep going</p>
            <h2 className="art-cta-heading">More GTM demos</h2>
            <p className="art-cta-body">Every demo Alex has written up or filmed, newest first.</p>
          </div>
          <ul className="art-cta-actions">
            <li>
              <Link href="/demos" className="art-button">
                See all GTM demos
              </Link>
            </li>
            {demo && entry.deliverable && (
              <li>
                <Link href={`/${entry.deliverable}`} className="art-cta-link">
                  Part of demo {demo.n}: {demo.name}
                </Link>
              </li>
            )}
            <li>
              <Link href="/" className="art-cta-link">
                Back to the live feed
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </main>
  );
}
