import type { Metadata } from "next";
import { t } from "../copy";
import Link from "next/link";
import { entryUrl, formatDate, lengthLabel, showUnpublished, STATUS_LABEL, visibleEntries, type Entry } from "./entries";
import { CoverGlow } from "./parts";
import "../article.css";
import "./demos.css";

// /demos: every GTM demo entry, newest first, like a list of blog entries (Alex, 2 Nov). Each row has
// the kicker, the title, the one-line dek (cover.subtitle), a Video or Article marker and a thumbnail
// when there is one. A production build lists published entries only; with none, a plain empty state.
// Not linked from the home page yet: the website session wires the menu when the first entry is live.

const TITLE = "Articles"; // the menu's word for this page (3 Nov)
const DESCRIPTION =
  "Alex Alderman's GTM engineering demos, written up or on video: what he built during the Hire Me Hackathon and how it works.";

export const metadata: Metadata = {
  title: `${TITLE} · Hire Me Hackathon`,
  description: DESCRIPTION,
  alternates: { canonical: "/demos" },
  openGraph: {
    type: "website",
    url: "/demos",
    siteName: "Hire Me Hackathon",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

/** A poster, else the video's YouTube thumbnail, else none. */
function thumbnail(e: Entry): string | undefined {
  if (e.poster) return e.poster;
  if (e.video) return `https://i.ytimg.com/vi/${e.video.youtube_id}/hqdefault.jpg`;
  return undefined;
}

function Row({ entry }: { entry: Entry }) {
  const thumb = thumbnail(entry);
  const isVideo = !!entry.video;
  const length = lengthLabel(entry);
  return (
    <li className={`entry-row${thumb ? " has-thumb" : ""}`}>
      {thumb && (
        <div className="entry-row-thumb">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={thumb} alt="" loading="lazy" width={480} height={270} />
          {isVideo && <span className="entry-row-play" aria-hidden="true" />}
        </div>
      )}
      <div className="entry-row-text">
        <p className="entry-row-meta">
          <span className={`post-kind ${isVideo ? "post-kind-session" : "post-kind-insight"}`}>
            {isVideo ? "Video" : "Article"}
          </span>
          <span className="entry-row-kicker">{entry.cover.kicker}</span>
        </p>
        <h2 className="entry-row-title">
          <Link href={entryUrl(entry.slug)}>{entry.title}</Link>
        </h2>
        <p className="entry-row-dek">{entry.cover.subtitle}</p>
        <p className="entry-row-info">
          <time dateTime={entry.date}>{formatDate(entry.date)}</time>
          {length && length !== "Video" && <span>{length}</span>}
        </p>
        {entry.status !== "published" && (
          <p className="entry-row-flag">
            <span className="entry-chip">{STATUS_LABEL[entry.status]}, not published</span>
          </p>
        )}
      </div>
    </li>
  );
}

export default function DemosIndex() {
  const entries = visibleEntries();
  const preview = showUnpublished();
  const hidden = preview ? entries.filter((e) => e.status !== "published").length : 0;

  return (
    <main className="art entry-index">
      <header className="entry-cover entry-index-cover" aria-labelledby="demos-title">
        <CoverGlow />
        <div className="entry-track entry-cover-inner">
          {hidden > 0 && (
            <p className="entry-flag">
              <strong>
                Preview: {hidden} unpublished {hidden === 1 ? "entry" : "entries"} listed.
              </strong>{" "}
              Production lists published entries only.
            </p>
          )}
          <p className="art-back">
            <Link href="/">← Back to the live feed</Link>
          </p>
          <div className="entry-kicker-row">
            <span className="entry-kicker-bar" aria-hidden="true" />
            <p className="entry-kicker">Hire Me Hackathon</p>
          </div>
          <h1 id="demos-title" className="entry-title">
            {TITLE}
          </h1>
          <p className="entry-subtitle">
            {t("demos.intro")}
          </p>
        </div>
      </header>

      <section className="entry-list-wrap" aria-labelledby="demos-list-title">
        <div className="entry-track">
          <h2 id="demos-list-title" className="sr-only">
            All entries
          </h2>
          {entries.length > 0 ? (
            <ol className="entry-list">
              {entries.map((e) => (
                <Row key={e.slug} entry={e} />
              ))}
            </ol>
          ) : (
            <div className="entry-empty">
              <p className="entry-empty-title">No demos are published yet.</p>
              <p className="entry-empty-body">
                Each one goes up here when Alex has finished it, as a written post or a video. Until then, the live
                feed shows the work as it happens.
              </p>
              <p>
                <Link href="/" className="entry-empty-link">
                  Go to the live feed
                </Link>
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
