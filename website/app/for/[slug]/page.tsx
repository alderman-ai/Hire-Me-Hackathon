import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allDemos } from "../../deliverables";
import { feedPosts, type Post } from "../../feed";
import { Reveal, RotateIn } from "../../motion";
import { readOrgData } from "../../org-charts";
import { findStakeholder, stakeholderGate, stakeholderSlugs, type StakeholderPage } from "../../stakeholders";
import "../../article.css";

// One page per key person at Addvery, addressed to their role: /for/<slug>.
//
// Everything about the people comes from the git-ignored local/stakeholders.json, through the gate in
// app/stakeholders.ts: no file, or `approved` not true outside `next dev`, means no slugs here, so a
// production build generates no page and `dynamicParams = false` turns every /for/... into a 404.
// The page also calls notFound() itself if the gate says no. Never indexed, never linked from the site.
//
// Laid out in the demo pages' article dress (article.css `.art-*`), with its own pieces under `.sh-*`.

export const dynamicParams = false;

export function generateStaticParams() {
  return stakeholderSlugs().map((slug) => ({ slug }));
}

const ROBOTS = { index: false, follow: false } as const;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = findStakeholder(slug);
  // Role-based on purpose: the name stays out of the tab title and any link preview.
  return page
    ? { title: `For ${page.label} · Hire Me Hackathon`, description: page.framing, robots: ROBOTS }
    : { title: "Hire Me Hackathon", robots: ROBOTS };
}

// ---------- Small helpers ----------

/** The first sentence of a post's first paragraph, as its one-line summary. */
function excerpt(post: Post): string | undefined {
  const p = post.blocks.find((b) => b.type === "p" && b.text);
  if (!p?.text) return undefined;
  const first = p.text.split(/(?<=[.!?])\s+/)[0];
  return first.length > 170 ? `${first.slice(0, 167).trimEnd()}…` : first;
}

/** "about 200 million" -> { pre: "about", num: "200", rest: "million" } (as on the /d2 org charts). */
function splitAmount(s: string) {
  const m = /^\s*(about|around|roughly|c\.|~)?\s*(\d[\d.,]*)\s*(.*)$/i.exec(s);
  return m ? { pre: m[1], num: m[2], rest: m[3] } : null;
}

function Amount({ value, label }: { value: string; label: string }) {
  const a = splitAmount(value);
  return (
    <div className="org-amount">
      <p className="org-amount-fig">
        {a ? (
          <>
            {a.pre && <span className="org-amount-pre">{a.pre} </span>}
            <span className="org-amount-num">{a.num}</span>
            <span className="org-amount-unit">{a.rest ? ` ${a.rest} ` : " "}CZK</span>
          </>
        ) : (
          <span className="org-amount-unit">{value} CZK</span>
        )}
      </p>
      <p className="org-amount-label">{label}</p>
    </div>
  );
}

// ---------- The growth lead's opening and "why now" ----------

function Opening({ page }: { page: StakeholderPage }) {
  const o = page.opening;
  if (!o) return null;
  return (
    <section className="sh-opening" aria-label="Where this started">
      <Reveal className="art-container sh-opening-inner">
        <p className="sh-opening-text">{o.before}</p>
        <figure className="sh-quote">
          <blockquote>
            <p>{o.quote}</p>
          </blockquote>
          {o.quote_source && <figcaption>{o.quote_source}</figcaption>}
        </figure>
        {o.after && <p className="sh-opening-text is-after">{o.after}</p>}
      </Reveal>
    </section>
  );
}

function WhyNow({ page }: { page: StakeholderPage }) {
  if (!page.why_now) return null;
  const g = readOrgData()?.growth_plan;
  const how = page.why_now.how ?? g?.how;
  const source = page.why_now.source ?? g?.source;
  return (
    <section className="sh-why-wrap" aria-labelledby="why-now">
      <div className="art-container">
        <Reveal className="sh-why">
          <p className="org-eyebrow">Why now</p>
          <h2 id="why-now" className="sh-why-h">
            {page.why_now.heading ?? "The road to 1 billion CZK"}
          </h2>
          {g && (g.revenue_today_czk || g.revenue_goal_czk) && (
            <div className="org-growth">
              {g.revenue_today_czk && <Amount value={g.revenue_today_czk} label="revenue today" />}
              {g.revenue_today_czk && g.revenue_goal_czk && (
                <div className="org-growth-link">
                  <span className="org-growth-line" aria-hidden="true" />
                  {g.multiple && <span className="org-growth-x">{g.multiple}</span>}
                  <span className="org-growth-line is-arrow" aria-hidden="true" />
                </div>
              )}
              {g.revenue_goal_czk && <Amount value={g.revenue_goal_czk} label="the goal" />}
            </div>
          )}
          {how && <p className="org-growth-how">{how}</p>}
          {source && <p className="org-growth-src">Source: {source}</p>}
        </Reveal>
      </div>
    </section>
  );
}

// ---------- The page ----------

export default async function StakeholderPageView({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { approved, pages, notice } = stakeholderGate();
  const page = pages.find((p) => p.slug === slug);
  if (!page) notFound();

  const demos = allDemos();
  const picked = page.demos
    .map((d) => {
      const demo = demos.find((x) => x.n === d.n);
      return demo ? { ...demo, why: d.why } : null;
    })
    .filter((d) => d !== null);

  const posts = feedPosts();
  const moments = (page.moments ?? [])
    .map((id) => posts.find((p) => p.id === id))
    .filter((p): p is Post => p !== undefined);

  const sources = page.sources ?? notice.sources;
  const demoList =
    picked.length > 1
      ? `${picked
          .slice(0, -1)
          .map((d) => d.n)
          .join(", ")} and ${picked[picked.length - 1].n}`
      : String(picked[0]?.n ?? "");

  return (
    <main className="art art-for">
      <section className="art-hero" aria-labelledby="for-name">
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
          {!approved && (
            <p className="sh-draft-strip">Draft for Alex&apos;s review · local only, not on the live site</p>
          )}
          <div className="art-eyebrow-row">
            <span className="art-eyebrow-line" aria-hidden="true" />
            <p className="art-eyebrow is-lavender">A page for you</p>
          </div>
          <h1 id="for-name" className="art-h1">
            {page.name}
          </h1>
          <p className="sh-title">{page.title}</p>
          <p className="art-hero-lead">{page.framing}</p>
        </div>
      </section>

      <Opening page={page} />
      <WhyNow page={page} />

      <section className="art-client sh-note-wrap" aria-label="What this means for your role">
        <div className="art-container art-client-grid">
          <div className="art-client-copy">
            <div className="art-block">
              <div className="sh-note-head">
                <h2 className="art-eyebrow is-amethyst">What this means for your role</h2>
                {page.note_is_draft && <span className="sh-draft">Draft note for Alex to rewrite</span>}
              </div>
              <p className={page.note_is_draft ? "art-lead sh-note is-draft" : "art-lead sh-note"}>{page.note}</p>
            </div>
          </div>
          <aside className="art-meta" aria-labelledby="at-a-glance">
            <h2 id="at-a-glance" className="art-eyebrow">
              At a glance
            </h2>
            <dl>
              <div className="art-meta-row">
                <dt>For</dt>
                <dd>{page.label}</dd>
              </div>
              <div className="art-meta-row">
                <dt>Demos</dt>
                <dd>{demoList}</dd>
              </div>
              <div className="art-meta-row">
                <dt>One ask</dt>
                <dd>{page.ask.short}</dd>
              </div>
            </dl>
            <p className="art-meta-note">{sources}</p>
          </aside>
        </div>
      </section>

      <section className="art-chapter sh-chapter" aria-labelledby="for-demos">
        <div className="art-container">
          <Reveal delay={100} className="art-chapter-grid">
            <div className="art-rail">
              <span className="art-rail-num" aria-hidden="true">
                01
              </span>
              <h2 id="for-demos" className="art-eyebrow">
                The demos that matter most for you
              </h2>
            </div>
            <div className="art-chapter-body">
              <ul className="sh-demos">
                {picked.map((d) => (
                  <li key={d.slug}>
                    <Link href={`/${d.slug}`} className="sh-demo">
                      <span className="sh-demo-n" aria-hidden="true">
                        {String(d.n).padStart(2, "0")}
                      </span>
                      <span className="sh-demo-body">
                        <span className="sh-demo-num">Demo {d.n}</span>
                        <span className="sh-demo-name">{d.name}</span>
                        <span className="sh-demo-why">{d.why}</span>
                        <span className="sh-demo-status">Status: {d.status}</span>
                        <span className="sh-demo-go">See demo {d.n} →</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {moments.length > 0 && (
        <section className="art-chapter sh-chapter" aria-labelledby="for-moments">
          <div className="art-container">
            <Reveal delay={100} className="art-chapter-grid">
              <div className="art-rail">
                <span className="art-rail-num" aria-hidden="true">
                  02
                </span>
                <h2 id="for-moments" className="art-eyebrow">
                  Moments from the build
                </h2>
              </div>
              <div className="art-chapter-body">
                <ul className="sh-moments">
                  {moments.map((post) => {
                    const line = excerpt(post);
                    return (
                      <li key={post.id}>
                        <Link href={`/#post-${post.id}`} className="sh-moment">
                          <span className="sh-moment-meta">
                            <span className={`post-kind post-kind-${post.kind.toLowerCase()}`}>{post.kind}</span>
                            <time dateTime={post.at}>{post.at.slice(11, 16)} Prague</time>
                          </span>
                          <span className="sh-moment-title">{post.title}</span>
                          {line && <span className="sh-moment-line">{line}</span>}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="art-cta sh-ask" aria-labelledby="for-ask">
        <div className="art-container art-cta-grid">
          <div className="art-cta-copy">
            <p className="art-eyebrow">One ask</p>
            <h2 id="for-ask" className="art-cta-heading">
              {page.ask.heading}
            </h2>
            <p className="art-cta-body">{page.ask.body}</p>
          </div>
          <ul className="art-cta-actions">
            <li>
              <Link href="/#post-status" className="art-button">
                See all ten demos
              </Link>
            </li>
            <li>
              <Link href="/docs/charter" className="art-cta-link">
                Read the plan
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <aside className="sh-notice" aria-labelledby="for-notice">
        <div className="art-container">
          <div className="sh-notice-box">
            <h2 id="for-notice" className="art-eyebrow is-amethyst">
              {notice.heading}
            </h2>
            <p>
              {notice.why} {sources}
            </p>
            <p>
              <strong>{notice.removal}</strong> <Link href="/privacy">{notice.privacy_label}</Link>.
            </p>
          </div>
        </div>
      </aside>
    </main>
  );
}
