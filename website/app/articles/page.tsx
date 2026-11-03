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
  "Alex Alderman's GTM engineering work, written up: outbound, content, and AI your team uses.";

export const metadata: Metadata = {
  title: `${TITLE} · Hire Me Hackathon`,
  description: DESCRIPTION,
  alternates: { canonical: "/articles" },
  openGraph: {
    type: "website",
    url: "/articles",
    siteName: "Hire Me Hackathon",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

// The order is fixed (Alex, 3 Nov), not newest first. Anything not listed follows, newest first.
const ORDER = [
  "who-writes-the-linkedin-posts-for-your-outreach-accounts",
  "first-ai-project-sales-pipeline",
  "ai-workflows-are-always-a-managed-service",
  "36-outbound-workflows-and-the-one-variable-behind-them",
  "sorting-twelve-leads-into-36-workflows-rules-first-then-jev",
  "teaching-a-machine-to-sound-like-me",
  "build-it-in-their-brand",
  "label-every-piece-before-you-build-a-page",
  "best-of-three-instead-of-redlining",
];

function ordered(entries: Entry[]): Entry[] {
  const rank = (e: Entry) => {
    const i = ORDER.indexOf(e.slug);
    return i === -1 ? ORDER.length : i;
  };
  return entries.map((e, n) => ({ e, n })).sort((x, y) => rank(x.e) - rank(y.e) || x.n - y.n).map((x) => x.e);
}

/** The lead visual: the poster, else the first figure in the body, else the video's poster frame. */
function thumbnail(e: Entry): string | undefined {
  if (e.poster) return e.poster;
  const fig = /\[!figure\]\s+(\S+)/.exec(e.body ?? "");
  if (fig) return fig[1];
  if (e.video) return `https://i.ytimg.com/vi/${e.video.youtube_id}/hqdefault.jpg`;
  return undefined;
}

function Card({ entry }: { entry: Entry }) {
  const thumb = thumbnail(entry);
  const length = lengthLabel(entry);
  return (
    <li className="entry-card">
      <div className="entry-card-thumb">
        {thumb ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={thumb} alt="" loading="lazy" />
        ) : (
          <span className="entry-card-blank" aria-hidden="true" />
        )}
      </div>
      <div className="entry-card-text">
        <p className="entry-row-kicker">
          {entry.cover.kicker}
          {entry.video && <span className="entry-type-tag">Video article</span>}
        </p>
        <h2 className="entry-card-title">
          <Link href={entryUrl(entry.slug)}>{entry.title}</Link>
        </h2>
        <p className="entry-row-dek">{entry.description}</p>
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
  const entries = ordered(visibleEntries());
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
            <Link href="/">← Back to the home page</Link>
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
            <ol className="entry-grid">
              {entries.map((e) => (
                <Card key={e.slug} entry={e} />
              ))}
            </ol>
          ) : (
            <div className="entry-empty">
              <p className="entry-empty-title">No articles are published yet.</p>
              <p className="entry-empty-body">
                Each one goes up here when it is finished.
              </p>
              <p>
                <Link href="/" className="entry-empty-link">
                  Go to the home page
                </Link>
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
