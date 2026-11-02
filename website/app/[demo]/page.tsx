import type { Metadata } from "next";
import Link from "next/link";
import build from "@/content/build.json";
import { allDemos, findDemo } from "../deliverables";
import { Blocks, FeedPost, feedPosts, type Block } from "../feed";
import { Reveal, RotateIn } from "../motion";
import { OrgCharts, readOrgData } from "../org-charts";
import { ResearchDocs, readResearchDocs } from "../research-docs";
import { ArrowSwap } from "../site-chrome";
import "../article.css";

// One page per demo, /d1 to /d10. The name, "what you'll see" and status come from content/build.json
// (the same rows as the status board); the page copy from content/deliverables.json; the posts are the
// feed posts tagged with this demo's slug.
//
// Laid out as Addvery's case-study article (addvery.com/case-studies/<slug>), section for section, with
// only what we have: the dark hero, the client grid with its "at a glance" card, one numbered chapter,
// the purple next-step band, and the related cards. Their stats row is left out until a demo has
// honest numbers.

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

// A demo's own blocks. Videos and images rotate in as they come into view, like Addvery's images.
function DemoBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) =>
        block.type === "video" || block.type === "image" ? (
          <RotateIn key={i} className="art-media">
            <Blocks blocks={[block]} />
          </RotateIn>
        ) : (
          <Blocks key={i} blocks={[block]} />
        ),
      )}
    </>
  );
}

export default async function DemoPage({ params }: { params: Promise<{ demo: string }> }) {
  const { demo: slug } = await params;
  const demos = allDemos();
  const i = demos.findIndex((d) => d.slug === slug);
  const demo = demos[i];
  const prev = demos[i - 1];
  const next = demos[i + 1];
  const posts = feedPosts(demo.slug);
  // The band features the next demo; the last one features the one before it.
  const featured = next ?? prev;
  // D2 (company and stakeholder research) shows its org charts in place of the pending line, when the
  // git-ignored data file is there (local/org-diagrams.json; see org-charts.tsx).
  const orgData = demo.slug === "d2" ? readOrgData() : null;
  const researchDocs = demo.slug === "d2" ? readResearchDocs() : [];

  return (
    <main className="art art-demo">
      <section className="art-hero" aria-labelledby="demo-title">
        <RotateIn
          from="bottom-right"
          angle={8}
          delay={500}
          duration={800}
          fade={600}
          onLoad
          className="art-hero-ring"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/addvery/hero-circle.webp" alt="" width={472} height={460} />
        </RotateIn>
        <div className="art-container">
          <p className="art-back">
            <Link href="/">← Back to the live feed</Link>
          </p>
          <div className="art-eyebrow-row">
            <span className="art-eyebrow-line" aria-hidden="true" />
            <p className="art-eyebrow is-lavender">Demo {demo.n}</p>
          </div>
          <h1 id="demo-title" className="art-h1">
            {demo.name}
          </h1>
          <p className="art-hero-lead">{demo.what}</p>
        </div>
      </section>

      <section className="art-client" aria-label="About this demo">
        <div className="art-container art-client-grid">
          <div className="art-client-copy">
            {demo.whatThisIs && (
              <div className="art-block">
                <h2 id="what-this-is" className="art-eyebrow is-amethyst">
                  What this is
                </h2>
                <p className="art-lead">{demo.whatThisIs}</p>
              </div>
            )}
          </div>
          <aside className="art-meta" aria-labelledby="at-a-glance">
            <h2 id="at-a-glance" className="art-eyebrow">
              At a glance
            </h2>
            <dl>
              <div className="art-meta-row">
                <dt>What it is</dt>
                <dd>Demo {demo.n}</dd>
              </div>
              <div className="art-meta-row">
                <dt>Status</dt>
                <dd>{demo.status}</dd>
              </div>
            </dl>
            <p className="art-meta-note">{build.as_of_line}</p>
          </aside>
        </div>
      </section>

      <section className="art-chapter" aria-labelledby="the-demo">
        <div className="art-container">
          <Reveal delay={100} className="art-chapter-grid">
            <div className="art-rail">
              <span className="art-rail-num" aria-hidden="true">
                01
              </span>
              <h2 id="the-demo" className="art-eyebrow">
                The demo
              </h2>
            </div>
            <div className="art-chapter-body">
              {demo.blocks.length > 0 ? (
                <div className="art-rich">
                  <DemoBlocks blocks={demo.blocks} />
                </div>
              ) : orgData ? (
                <OrgCharts data={orgData} />
              ) : (
                <p className="art-statement">{demo.pending}</p>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {researchDocs.length > 0 ? (
        <section className="art-chapter" aria-labelledby="the-research">
          <div className="art-container">
            <Reveal delay={100} className="art-chapter-grid">
              <div className="art-rail">
                <span className="art-rail-num" aria-hidden="true">
                  02
                </span>
                <h2 id="the-research" className="art-eyebrow">
                  The research itself
                </h2>
              </div>
              <div className="art-chapter-body">
                <ResearchDocs docs={researchDocs} />
              </div>
            </Reveal>
          </div>
        </section>
      ) : null}

      <nav className="art-cta" aria-label="Other demos">
        <div className="art-container art-cta-grid">
          <div className="art-cta-copy">
            <p className="art-eyebrow">
              {next ? "Next" : "Previous"}: Demo {featured.n}
            </p>
            <h2 className="art-cta-heading">{featured.name}</h2>
            <p className="art-cta-body">{featured.what}</p>
          </div>
          <ul className="art-cta-actions">
            <li>
              <Link href={`/${featured.slug}`} rel={next ? "next" : "prev"} className="art-button">
                View demo {featured.n}
              </Link>
            </li>
            {next && prev && (
              <li>
                <Link href={`/${prev.slug}`} rel="prev" className="art-cta-link">
                  ← Demo {prev.n}: {prev.name}
                </Link>
              </li>
            )}
            <li>
              <Link href="/#post-status" className="art-cta-link">
                All demos and their status
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {posts.length > 0 && (
        <section className="art-related" aria-labelledby="from-the-feed">
          <div className="art-related-inner">
            <h2 id="from-the-feed" className="art-related-heading">
              From the live feed
            </h2>
            <div className="art-related-grid">
              {/* The feed's own post card (Addvery's case-study card); it slides up on its own. */}
              {posts.map((post) => (
                <FeedPost key={post.id} post={post} linkDemo={false} />
              ))}
            </div>
            <p className="art-related-actions">
              <Link href="/" className="btn-gradient">
                View the live feed <ArrowSwap />
              </Link>
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
