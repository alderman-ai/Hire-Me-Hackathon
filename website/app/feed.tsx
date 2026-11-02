import Link from "next/link";
import feedJson from "@/content/feed.json";
import summary from "@/content/summary.json";
import videos from "@/content/videos.json";
import StatusBoard from "./build-status";

// The live feed: content/feed.json, newest on top (sorted by `at`). s-d9-legibility sends new posts.

type Block = {
  type: string; // p, list, quote, highlight, video, summary, status-board, doc-link
  text?: string;
  items?: string[];
  source?: string;
  href?: string;
  note?: string;
  title?: string;
  blocks?: Block[];
  session?: string;
  start?: number;
  slug?: string;
};

type Post = { id: string; at: string; kind: string; session?: string; title: string; blocks: Block[] };

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

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
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
              <figure key={i} className="post-quote">
                <blockquote>
                  <p>&ldquo;{block.text}&rdquo;</p>
                </blockquote>
                <figcaption>
                  {block.source}
                  {block.href && (
                    <>
                      {" · "}
                      <a href={block.href} target="_blank" rel="noopener noreferrer">
                        Watch this moment
                      </a>
                    </>
                  )}
                  {block.note && <>. {block.note}</>}
                </figcaption>
              </figure>
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

export default function Feed() {
  const posts = [...feed.posts].sort((a, b) => b.at.localeCompare(a.at));
  return (
    <section className="feed" aria-labelledby="feed-heading">
      <h2 id="feed-heading">Live feed</h2>
      <p className="feed-intro">{feed.intro}</p>
      {posts.map((post) => (
        <article key={post.id} id={`post-${post.id}`} className="post">
          <p className="post-meta">
            <span className={`post-kind post-kind-${post.kind.toLowerCase()}`}>{post.kind}</span>
            <time dateTime={post.at}>{post.at.slice(11, 16)}</time>
            {post.session && <span> · {post.session}</span>}
          </p>
          <h3 className="post-title">{post.title}</h3>
          <Blocks blocks={post.blocks} />
        </article>
      ))}
    </section>
  );
}
