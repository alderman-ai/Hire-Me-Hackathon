import Link from "next/link";
import feedJson from "@/content/feed.json";
import summary from "@/content/summary.json";
import videos from "@/content/videos.json";
import StatusBoard from "./build-status";
import { findDemo } from "./deliverables";

// The live feed: content/feed.json, newest on top (sorted by `at`). s-d9-legibility sends new posts.

type Quote = { text: string; source: string; href?: string; note?: string };

// A bulleted point with a bold lead, optional text and an optional quote under it.
type Point = { lead: string; text?: string; quote?: Quote };

export type Block = {
  type: string; // p, list, points, quote, highlight, video, summary, status-board, doc-link
  text?: string;
  items?: string[];
  points?: Point[];
  source?: string;
  href?: string;
  note?: string;
  title?: string;
  blocks?: Block[];
  session?: string;
  start?: number;
  slug?: string;
  src?: string; // image: a file in public/, shown full width, opens full size on click
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
};

// roles: which stakeholders a post is for (from s-d9-legibility), kept for the stakeholder pages.
// deliverable: the demo a post clearly belongs to ("d3"); it also shows on that demo's page.
export type Post = {
  id: string;
  at: string;
  kind: string;
  session?: string;
  title: string;
  roles?: string[];
  deliverable?: string;
  blocks: Block[];
};

const feed: { intro: string; posts: Post[] } = feedJson;
const youtubeIds: Record<string, string | undefined> = videos;

function Video({ session, start }: { session: string; start: number }) {
  const id = youtubeIds[session];
  return (
    <div className="video-frame">
      {id ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}${start ? `?start=${start}` : ""}`}
          title={`Session ${session}, webcam`}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <div className="video-empty">The {session} recording goes up here soon.</div>
      )}
    </div>
  );
}

function QuoteFigure({ quote }: { quote: Quote }) {
  return (
    <figure className="post-quote">
      <blockquote>
        <p>&ldquo;{quote.text}&rdquo;</p>
      </blockquote>
      <figcaption>
        {quote.source}
        {quote.href && (
          <>
            {" · "}
            <a href={quote.href} target="_blank" rel="noopener noreferrer">
              Watch this moment
            </a>
          </>
        )}
        {quote.note && <>. {quote.note}</>}
      </figcaption>
    </figure>
  );
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "points":
            return (
              <ul key={i} className="post-points">
                {(block.points ?? []).map((point) => (
                  <li key={point.lead}>
                    <strong>{point.lead}</strong>
                    {point.text && <> {point.text}</>}
                    {point.quote && <QuoteFigure quote={point.quote} />}
                  </li>
                ))}
              </ul>
            );
          case "list":
            return (
              <ul key={i} className="post-list">
                {(block.items ?? []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <QuoteFigure
                key={i}
                quote={{ text: block.text ?? "", source: block.source ?? "", href: block.href, note: block.note }}
              />
            );
          case "highlight":
            return (
              <div key={i} className="post-highlight">
                <h4>{block.title}</h4>
                <Blocks blocks={block.blocks ?? []} />
              </div>
            );
          case "video":
            return <Video key={i} session={block.session ?? ""} start={block.start ?? 0} />;
          case "image":
            return (
              <figure key={i} className="post-image">
                <a href={block.src} target="_blank" rel="noopener noreferrer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={block.src} alt={block.alt ?? ""} width={block.width} height={block.height} loading="lazy" />
                </a>
                {block.caption && <figcaption>{block.caption}</figcaption>}
              </figure>
            );
          case "summary":
            // The S02 explainer's summary, under its video (Alex, 2 Nov: "an H1 summary").
            return (
              <div key={i} className="summary">
                <h1 className="summary-headline">{summary.headline}</h1>
                {summary.paragraphs.map((text, j) => (
                  <p key={j}>{text}</p>
                ))}
              </div>
            );
          case "status-board":
            return <StatusBoard key={i} />;
          case "doc-link":
            return (
              <p key={i} className="post-doc-link">
                <Link href={`/docs/${block.slug}`}>{block.text} →</Link>
              </p>
            );
          default:
            return <p key={i}>{block.text}</p>;
        }
      })}
    </>
  );
}

// Newest first; with a slug, only the posts tagged with that demo.
export function feedPosts(deliverable?: string): Post[] {
  return feed.posts
    .filter((post) => !deliverable || post.deliverable === deliverable)
    .sort((a, b) => b.at.localeCompare(a.at));
}

// One post. On the feed, a tagged post links to its demo's page; on that page, it doesn't.
export function FeedPost({ post, linkDemo = true }: { post: Post; linkDemo?: boolean }) {
  const demo = linkDemo && post.deliverable ? findDemo(post.deliverable) : undefined;
  return (
    <article id={`post-${post.id}`} className="post">
      <p className="post-meta">
        <span className={`post-kind post-kind-${post.kind.toLowerCase()}`}>{post.kind}</span>
        <time dateTime={post.at}>{post.at.slice(11, 16)}</time>
        {post.session && <span> · {post.session}</span>}
        {demo && (
          <span>
            {" · "}
            <Link href={`/${demo.slug}`} className="post-demo-link">
              Demo {demo.n}: {demo.name}
            </Link>
          </span>
        )}
      </p>
      <h3 className="post-title">{post.title}</h3>
      <Blocks blocks={post.blocks} />
    </article>
  );
}

export default function Feed() {
  return (
    <section className="feed" aria-labelledby="feed-heading">
      <h2 id="feed-heading">Live feed</h2>
      <p className="feed-intro">{feed.intro}</p>
      {feedPosts().map((post) => (
        <FeedPost key={post.id} post={post} />
      ))}
    </section>
  );
}
