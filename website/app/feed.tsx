import Link from "next/link";
import feedJson from "@/content/feed.json";
import summary from "@/content/summary.json";
import videos from "@/content/videos.json";
import StatusBoard, { StatusBand } from "./build-status";
import { findDemo } from "./deliverables";
import { Reveal, RotateIn } from "./motion";
import { ArrowSwap } from "./site-chrome";
import FeedOpen from "./feed-open";
import "./feed-compact.css";

// The live feed: content/feed.json, newest on top (sorted by `at`). s-d9-legibility sends new posts.
// Laid out after Addvery's podcast index: the newest post is a wide dark featured block, the rest
// run in one centred white column of cards. The status post (id "status") is always a full-width
// dark band, in the pattern of Addvery's industries section, wherever it falls in the order.

type Quote = { text: string; source: string; href?: string; note?: string };

// A bulleted point with a bold lead, optional text and an optional quote under it.
type Point = { lead: string; text?: string; quote?: Quote };

export type Block = {
  type: string; // p, list, points, quote, highlight, video, image, summary, status-board, doc-link
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

// Anchors the menu links to: "Watch the explainer" goes to /#s02.
const ANCHORS: Record<string, string> = { s02: "s02" };

function Video({ session, start }: { session: string; start: number }) {
  const id = youtubeIds[session];
  return (
    <RotateIn className="video-frame">
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
    </RotateIn>
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
                <RotateIn className="post-image-frame">
                  <a href={block.src} target="_blank" rel="noopener noreferrer">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={block.src} alt={block.alt ?? ""} width={block.width} height={block.height} loading="lazy" />
                  </a>
                </RotateIn>
                {block.caption && <figcaption>{block.caption}</figcaption>}
              </figure>
            );
          case "summary":
            // The S02 explainer's summary, under its video (Alex, 2 Nov: "an H1 summary").
            return (
              <div key={i} className="summary">
                {/* h4 under the post's h3: the page keeps one h1 (on /log, the intro's). */}
                <h4 className="summary-headline">{summary.headline}</h4>
                {summary.paragraphs.map((text, j) => (
                  <p key={j}>{text}</p>
                ))}
              </div>
            );
          case "status-board":
            return (
              <div key={i} className="status-inline on-dark">
                <StatusBoard />
              </div>
            );
          case "doc-link":
            return (
              <p key={i} className="post-doc-link">
                <Link href={block.href ?? `/docs/${block.slug}`} className="view-more">
                  <span>{block.text}</span>
                  <ArrowSwap />
                </Link>
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

function isStatus(post: Post) {
  return post.id === "status" || post.blocks.some((b) => b.type === "status-board");
}

// The meta line: kind, time of day (Prague, from `at`), session and the demo it belongs to.
function PostMeta({ post, linkDemo, latest }: { post: Post; linkDemo: boolean; latest?: boolean }) {
  const demo = linkDemo && post.deliverable ? findDemo(post.deliverable) : undefined;
  return (
    <p className="post-meta">
      {latest && <span className="pill-latest">Latest</span>}
      <span className={`post-kind post-kind-${post.kind.toLowerCase()}`}>{post.kind}</span>
      <span className="post-tags">
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
      </span>
    </p>
  );
}

// One post as a card. On the feed, a tagged post links to its demo's page; on that page, it doesn't.
export function FeedPost({ post, linkDemo = true }: { post: Post; linkDemo?: boolean }) {
  const anchor = ANCHORS[post.id];
  return (
    <Reveal as="article" id={`post-${post.id}`} className="post" offset={20} delay={200}>
      {anchor && <span id={anchor} className="anchor" aria-hidden="true" />}
      <PostMeta post={post} linkDemo={linkDemo} />
      <h3 className="post-title">{post.title}</h3>
      <div className="post-body">
        <Blocks blocks={post.blocks} />
      </div>
    </Reveal>
  );
}

// The newest post, after Addvery's featured episode: media on the left, the post on the right.
function FeaturedPost({ post }: { post: Post }) {
  const mediaIndex = post.blocks.findIndex((b) => b.type === "video" || b.type === "image");
  const media = mediaIndex >= 0 ? post.blocks[mediaIndex] : undefined;
  const rest = post.blocks.filter((_, i) => i !== mediaIndex);
  const anchor = ANCHORS[post.id];
  return (
    <article id={`post-${post.id}`} className={media ? "feat on-dark" : "feat feat-text on-dark"}>
      {anchor && <span id={anchor} className="anchor" aria-hidden="true" />}
      {media && (
        <div className="feat-media">
          <Blocks blocks={[media]} />
        </div>
      )}
      <Reveal className="feat-body" delay={100}>
        <PostMeta post={post} linkDemo latest />
        <h3 className="feat-title">{post.title}</h3>
        <div className="post-body">
          <Blocks blocks={rest} />
        </div>
      </Reveal>
    </article>
  );
}

// The white column of cards between dark bands.
function Column({ posts }: { posts: Post[] }) {
  return (
    <section className="feed-column on-light" aria-label="Earlier posts">
      <div className="feed-column-inner">
        {posts.map((post) => (
          <FeedPost key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}

// One row of the compact feed: time, kind and the post's own title; the body opens under it.
function CompactPost({ post }: { post: Post }) {
  const anchor = ANCHORS[post.id];
  const kind = post.kind.toLowerCase();
  return (
    <li id={`post-${post.id}`} className={`fc-item fc-${kind}`}>
      {anchor && <span id={anchor} className="anchor" aria-hidden="true" />}
      <details>
        <summary>
          <time dateTime={post.at} className="fc-time">
            {post.at.slice(11, 16)}
          </time>
          <span className={`post-kind post-kind-${kind}`}>{post.kind}</span>
          <h3 className="fc-title">{post.title}</h3>
          <span className="fc-chev" aria-hidden="true" />
        </summary>
        <div className="fc-body post-body on-dark">
          <Blocks blocks={post.blocks} />
        </div>
      </details>
    </li>
  );
}

/**
 * `hideStatus`: the new site drops the status board (VERDICT.md 2.7). `asPage`: on /log, the feed is
 * the page, so its heading is the page's h1. `head`: /log's own intro (log.intro.* in site-copy.json),
 * which takes the place of the "Live feed" heading and the feed's intro line.
 */
export default function Feed({
  hideStatus = false,
  asPage = false,
  head,
}: { hideStatus?: boolean; asPage?: boolean; head?: { title: string; body: string } } = {}) {
  const [newest, ...older] = feedPosts().filter((p) => !(hideStatus && isStatus(p)));
  const Heading = asPage ? "h1" : "h2";
  if (asPage) {
    // /log: every post is a row; its body opens on demand (app/feed-compact.css).
    const rows = feedPosts().filter((p) => !(hideStatus && isStatus(p)));
    return (
      <section id="feed" className="feed-head feed-compact on-dark" aria-labelledby="feed-heading">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Newest on top</p>
            <Heading id="feed-heading" className="feed-heading">
              {head ? head.title : "Live feed"}
            </Heading>
            <p className="feed-intro">{head ? head.body : feed.intro}</p>
          </Reveal>
          <ol className="fc-list">
            {rows.map((post) => (
              <CompactPost key={post.id} post={post} />
            ))}
          </ol>
          <FeedOpen />
        </div>
      </section>
    );
  }
  const featuredIsStatus = newest ? isStatus(newest) : false;

  // Split the older posts into runs of cards, with the status band (if it's among them) between.
  const parts: ({ kind: "column"; posts: Post[] } | { kind: "status"; post: Post })[] = [];
  for (const post of older) {
    if (isStatus(post)) parts.push({ kind: "status", post });
    else {
      const last = parts[parts.length - 1];
      if (last && last.kind === "column") last.posts.push(post);
      else parts.push({ kind: "column", posts: [post] });
    }
  }

  return (
    <>
      <section id="feed" className="feed-head on-dark" aria-labelledby="feed-heading">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Newest on top</p>
            <Heading id="feed-heading" className="feed-heading">
              {head ? head.title : "Live feed"}
            </Heading>
            <p className="feed-intro">{head ? head.body : feed.intro}</p>
          </Reveal>
          {newest && !featuredIsStatus && <FeaturedPost post={newest} />}
        </div>
      </section>
      {newest && featuredIsStatus && <StatusBand post={newest} latest />}
      {parts.map((part) =>
        part.kind === "status" ? (
          <StatusBand key={part.post.id} post={part.post} />
        ) : (
          <Column key={part.posts[0].id} posts={part.posts} />
        ),
      )}
    </>
  );
}
