import type { Metadata } from "next";
import Link from "next/link";
import build from "@/content/build.json";
import { allDemos, findDemo } from "../deliverables";
import { Blocks, FeedPost, feedPosts } from "../feed";

// One page per demo, /d1 to /d10. The name, "what you'll see" and status come from content/build.json
// (the same rows as the status board); the page copy from content/deliverables.json; the posts are the
// feed posts tagged with this demo's slug.

export const dynamicParams = false;

export function generateStaticParams() {
  return allDemos().map((d) => ({ demo: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ demo: string }> }): Promise<Metadata> {
  const { demo: slug } = await params;
  const demo = findDemo(slug);
  return demo
    ? { title: `${demo.name} · Hire Me Hackathon`, description: demo.what }
    : { title: "Hire Me Hackathon" };
}

export default async function DemoPage({ params }: { params: Promise<{ demo: string }> }) {
  const { demo: slug } = await params;
  const demos = allDemos();
  const i = demos.findIndex((d) => d.slug === slug);
  const demo = demos[i];
  const prev = demos[i - 1];
  const next = demos[i + 1];
  const posts = feedPosts(demo.slug);
  const statusLabel = `Status at ${build.as_of}`;

  return (
    <main className="deliverable-page">
      <p className="doc-back">
        <Link href="/">← Back to the live feed</Link>
      </p>

      <header className="deliverable-header">
        <p className="deliverable-number">Demo {demo.n}</p>
        <h1 className="deliverable-title">{demo.name}</h1>
      </header>

      <dl className="deliverable-facts">
        <div>
          <dt>What you&rsquo;ll see</dt>
          <dd>{demo.what}</dd>
        </div>
        <div>
          <dt>{statusLabel}</dt>
          <dd className="status">{demo.status}</dd>
        </div>
      </dl>
      <p className="as-of">{build.as_of_line}</p>

      {demo.whatThisIs && (
        <section className="deliverable-section" aria-labelledby="what-this-is">
          <h2 id="what-this-is">What this is</h2>
          <p>{demo.whatThisIs}</p>
        </section>
      )}

      <section className="deliverable-section" aria-labelledby="the-demo">
        <h2 id="the-demo">The demo</h2>
        {demo.blocks.length > 0 ? (
          <div className="deliverable-content">
            <Blocks blocks={demo.blocks} />
          </div>
        ) : (
          <p className="deliverable-pending">{demo.pending}</p>
        )}
      </section>

      {posts.length > 0 && (
        <section className="deliverable-section" aria-labelledby="from-the-feed">
          <h2 id="from-the-feed">From the live feed</h2>
          {posts.map((post) => (
            <FeedPost key={post.id} post={post} linkDemo={false} />
          ))}
        </section>
      )}

      <nav className="deliverable-nav" aria-label="Other demos">
        <ul>
          {prev && (
            <li>
              <Link href={`/${prev.slug}`} rel="prev">
                ← Demo {prev.n}: {prev.name}
              </Link>
            </li>
          )}
          <li>
            <Link href="/#post-status">All demos and their status</Link>
          </li>
          {next && (
            <li>
              <Link href={`/${next.slug}`} rel="next">
                Demo {next.n}: {next.name} →
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </main>
  );
}
