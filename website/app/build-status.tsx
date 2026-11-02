import Link from "next/link";
import build from "@/content/build.json";
import { demoSlug, toolingDocSlug } from "./deliverables";
import { Odometer, Reveal } from "./motion";
import { Accordion } from "./site-chrome";

// "What's being built today": content/build.json. s-d9-legibility sends status updates; the
// feed post that shows this board moves to the top at each new as_of time. Each demo's name links
// to its page (/d1 to /d10); each tooling piece links to its spec (content/deliverables.json).
// Laid out after Addvery's industries section: a dark band, their services accordion for
// "How it runs", their odometer counters for the real counts, and their industry rows for the 13
// pieces of work (gradient fill, text roll and arrow swap on hover).

type Quote = { text: string; source: string };
type FeedPostLike = { id: string; at: string; kind: string; title: string };

function PullQuote({ quote }: { quote: Quote }) {
  return (
    <Reveal as="figure" className="pull-quote">
      <blockquote>
        <p>&ldquo;{quote.text}&rdquo;</p>
      </blockquote>
      <figcaption>{quote.source}</figcaption>
    </Reveal>
  );
}

// A row's title, twice, for the text roll on hover.
function Roll({ text }: { text: string }) {
  return (
    <span className="roll">
      <span>{text}</span>
      <span aria-hidden="true">{text}</span>
    </span>
  );
}

function RowArrow() {
  return (
    <span className="row-arrow" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/addvery/icon-arrow-right-purple.svg" alt="" width={22} height={11} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/addvery/icon-arrow-right-white.svg" alt="" width={22} height={11} />
    </span>
  );
}

type Row = { key: string; eyebrow?: string; name: string; href?: string; what: string; status: string };

function Rows({ rows }: { rows: Row[] }) {
  return (
    <ul className="rows">
      {rows.map((row) => (
        <Reveal as="li" key={row.key} className={row.href ? "row row-linked" : "row"} offset={0} delay={100}>
          <div className="row-name">
            {row.eyebrow && <span className="row-eyebrow">{row.eyebrow}</span>}
            <h4 className="row-title">
              {row.href ? (
                <Link href={row.href} className="row-link">
                  <Roll text={row.name} />
                </Link>
              ) : (
                row.name
              )}
            </h4>
          </div>
          <p className="row-what">{row.what}</p>
          <p className="row-status">
            <span className="row-status-label">Status</span>
            {row.status}
          </p>
          {row.href && <RowArrow />}
        </Reveal>
      ))}
    </ul>
  );
}

function Counters() {
  const counts = [
    { value: build.tooling.length + build.demos.length, label: "Pieces of work" },
    { value: build.tooling.length, label: "Tooling pieces" },
    { value: build.demos.length, label: "Demos" },
  ];
  return (
    <Reveal className="counters" delay={150} offset={12}>
      {counts.map((c) => (
        <div key={c.label} className="counter">
          <Odometer value={String(c.value)} className="counter-number" />
          <span className="counter-label">{c.label}</span>
        </div>
      ))}
    </Reveal>
  );
}

/** The board itself. With `post`, it carries that feed post's meta line and title. */
export default function StatusBoard({ post, latest }: { post?: FeedPostLike; latest?: boolean }) {
  const statusLabel = `Status at ${build.as_of}`;
  const tooling: Row[] = build.tooling.map((row) => {
    const doc = toolingDocSlug(row.piece);
    return { key: row.piece, name: row.piece, href: doc ? `/docs/${doc}` : undefined, what: row.what, status: row.status };
  });
  const demos: Row[] = build.demos.map((row) => ({
    key: String(row.n),
    eyebrow: `Demo ${row.n}`,
    name: row.demo,
    href: `/${demoSlug(row.n)}`,
    what: row.what,
    status: row.status,
  }));

  return (
    <div className="build">
      <div className="status-top">
        <Reveal className="status-intro" delay={100}>
          {post && (
            <p className="post-meta">
              {latest && <span className="pill-latest">Latest</span>}
              <span className="post-kind post-kind-status">{post.kind}</span>
              <span className="post-tags">
                <time dateTime={post.at}>{post.at.slice(11, 16)}</time>
              </span>
            </p>
          )}
          <h2 id="status-heading" className="section-title">
            {post?.title ?? build.headline}
          </h2>
          <p className="as-of">{build.as_of_line}</p>
          <p>{build.intro}</p>
        </Reveal>
        <Reveal className="status-how" delay={200}>
          <h3 className="status-subhead">How it runs</h3>
          <Accordion idPrefix="how" items={build.how_it_runs.map((item) => ({ title: item.lead, body: item.text }))} />
        </Reveal>
      </div>

      <Counters />

      <PullQuote quote={build.quotes.after_how_it_runs} />

      <div className="rows-group">
        <Reveal as="header" delay={100}>
          <h3 className="status-subhead">The tooling (first)</h3>
          <p className="rows-note">{statusLabel}</p>
        </Reveal>
        <Rows rows={tooling} />
      </div>

      <div className="rows-group">
        <Reveal as="header" delay={100}>
          <h3 className="status-subhead">The demos (then)</h3>
          <p className="rows-note">{statusLabel}</p>
        </Reveal>
        <Rows rows={demos} />
      </div>

      <PullQuote quote={build.quotes.after_demos} />
    </div>
  );
}

/** The status post as a full-width dark band (the menu's "What's being built" goes to #status). */
export function StatusBand({ post, latest }: { post: FeedPostLike; latest?: boolean }) {
  return (
    <section id="status" className="status-band on-dark" aria-labelledby="status-heading">
      <span id={`post-${post.id}`} className="anchor" aria-hidden="true" />
      <div className="container">
        <StatusBoard post={post} latest={latest} />
      </div>
    </section>
  );
}
