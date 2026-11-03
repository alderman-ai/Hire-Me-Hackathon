import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allDemos } from "../../deliverables";
import { feedPosts, type Post } from "../../feed";
import { Reveal, RotateIn } from "../../motion";
import { readOrgData } from "../../org-charts";
import {
  findStakeholder,
  firstName,
  greetingParts,
  greetingSummary,
  portraitFor,
  stakeholderGate,
  stakeholderSlugs,
  titleLines,
  type LandingConcern,
  type StakeholderPage,
} from "../../stakeholders";
import { readingPath, type PathItem, type ReadingPath } from "../reading-time";
import "../../article.css";
import "../for.css";
import { NEW_SITE } from "../../flags";
import { PersonalPage } from "./personal";
import { markdownAlternate } from "../../page-meta";

// One page per key person at Addvery, addressed to their role: /for/<slug>. The grid at /for opens it.
//
// Everything about the people comes from content/stakeholders.json, through the gate in
// app/stakeholders.ts: `approved` not true outside `next dev` means no slugs here, so a production
// build generates no page and `dynamicParams = false` turns every /for/... into a 404.
// The page also calls notFound() itself if the gate says no. Never indexed: Alex sends each link.
//
// Top to bottom, as Alex asked (2 Nov, 17:26): the portrait and who it's for, then the explaining part
// (the growth lead's opening and "why now", the note, the one ask), then the details (the demos, the
// moments from the build, about me, about this page). Laid out in the demo pages' article dress
// (article.css `.art-*` and `.sh-*`), with the portrait hero in for.css.
//
// With a landing (the personal link Alex sends; gated per page in app/stakeholders.ts) the page opens
// differently: the greeting beside the portrait, then "What I'm guessing you're concerned with", then
// "Your reading list" with each link's minutes, the running total and where 5, 10 or 20 minutes runs
// out (app/for/reading-time.ts). Everything above follows unchanged, except that the hero's framing
// line gives way to the greeting and a moment already on the reading list isn't listed twice.
// The landing also brings the person's own link preview: the metadata below and opengraph-image.tsx.

export const dynamicParams = false;

export function generateStaticParams() {
  return stakeholderSlugs().map((slug) => ({ slug }));
}

const ROBOTS = { index: false, follow: false } as const;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = findStakeholder(slug);
  if (!page) return { title: "Hire Me Hackathon", robots: ROBOTS };
  // Without an approved landing: role-based on purpose, so the name stays out of the tab title and
  // any link preview. The landing is the link Alex sends that person, so it greets them by name.
  if (!page.landing) return { title: `For ${page.label} · Hire Me Hackathon`, description: page.framing, robots: ROBOTS, alternates: { types: markdownAlternate(`/for/${page.slug}`) } };
  const title = `Hi ${firstName(page)}: a page for you, from Alex Alderman`;
  const description = greetingSummary(page.landing.greeting);
  const url = `/for/${page.slug}`;
  return {
    title: { absolute: title },
    description,
    robots: ROBOTS,
    alternates: { canonical: url, types: markdownAlternate(url) },
    openGraph: { type: "website", url, siteName: "Hire Me Hackathon", title, description },
    twitter: { card: "summary_large_image", title, description },
  };
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

// ---------- The landing: greeting, likely questions, reading list ----------

/** "4 min" for the eye, "4 minutes" for a screen reader. */
function Minutes({ n, suffix = "" }: { n: number; suffix?: string }) {
  const shown = n < 1 ? "under 1 min" : `${Math.round(n)} min`;
  const said = n < 1 ? "under a minute" : `${Math.round(n)} ${Math.round(n) === 1 ? "minute" : "minutes"}`;
  return (
    <>
      <span aria-hidden="true">
        {shown}
        {suffix}
      </span>
      <span className="sr-only">
        , {said}
        {suffix}
      </span>
    </>
  );
}

/**
 * "If you have about 5 minutes, stop here." / "... about 5 or 10 minutes ...". "About", because a stop
 * can sit a little past its budget (reading-time.ts allows a fifth over), beside "24 min so far".
 */
function stopLine(budgets: number[]): string {
  const list = budgets.length > 1 ? `${budgets.slice(0, -1).join(", ")} or ${budgets[budgets.length - 1]}` : `${budgets[0]}`;
  return `If you have about ${list} minutes, stop here.`;
}

function totalLine(path: ReadingPath): string | null {
  const n = path.items.length;
  const timed = n - path.untimed;
  if (timed === 0) return null;
  const mins = `about ${Math.max(1, Math.round(path.total))} minutes`;
  if (path.untimed === 0) return n === 1 ? `It takes ${mins}.` : `All ${n} come to ${mins}.`;
  return `The ${timed} with a time come to ${mins}.`;
}

/** Addvery's industry-row arrow (22 x 11). */
function RowArrow() {
  return (
    <svg className="for-path-arrow" viewBox="0 0 22 11" width="22" height="11" aria-hidden="true" focusable="false">
      <path
        d="M17 1.459l4 4m0 0l-4 4m4-4H1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PathLink({ item, n }: { item: PathItem; n: number }) {
  const body = (
    <>
      <span className="for-path-n" aria-hidden="true">
        {n}
      </span>
      <span className="for-path-title">{item.title}</span>
      {item.min !== null && (
        <span className="for-path-time">
          <span className="for-path-min">
            <Minutes n={item.min} />
          </span>
          {n > 1 && item.sofar !== null && (
            <span className="for-path-sofar">
              <Minutes n={item.sofar} suffix=" so far" />
            </span>
          )}
        </span>
      )}
      <RowArrow />
    </>
  );
  return item.href.startsWith("/") ? (
    <Link href={item.href} className="for-path-link">
      {body}
    </Link>
  ) : (
    <a href={item.href} className="for-path-link">
      {body}
    </a>
  );
}

function LandingHero({ page, greeting, path, draft }: { page: StakeholderPage; greeting: string; path: ReadingPath; draft: boolean }) {
  const { hello, rest, long } = greetingParts(greeting);
  const img = portraitFor(page.slug);
  const count = path.items.length;
  const total = path.untimed === 0 ? Math.max(1, Math.round(path.total)) : null;

  return (
    <section className="art-hero for-person-hero for-land-hero" aria-labelledby="for-hello">
      <div className="art-container">
        <p className="art-back">
          <Link href="/for">← All six pages</Link>
        </p>
        <div className="for-land-grid">
          <div className="for-land-copy">
            {draft && <p className="sh-draft-strip">Draft for Alex&apos;s review · local only, not on the live site</p>}
            <h1 id="for-hello" className={long ? "for-hello is-long" : "for-hello"}>
              {hello}
            </h1>
            {rest && <p className="for-land-lead">{rest}</p>}
            <div className="for-land-from">
              <span className="for-ring" aria-hidden="true" />
              <p>
                <span className="for-land-from-name">Alex Alderman</span>
                <span className="for-land-from-role">Applying to Addvery as a GTM engineer</span>
              </p>
            </div>
            {count > 0 && (
              <div className="for-land-jump">
                <a href="#for-reading" className="art-button">
                  See your reading list
                </a>
                <p className="for-land-jump-note">
                  {count === 1 ? "One link" : `${count} links`}, most important first
                  {total !== null ? `, about ${total} minutes in all` : ""}.
                </p>
              </div>
            )}
          </div>
          <RotateIn as="figure" from="bottom-right" angle={8} delay={150} duration={800} fade={600} onLoad className="for-land-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              srcSet={img.srcSet}
              sizes="(min-width: 992px) 360px, (min-width: 768px) 260px, 104px"
              width={img.width}
              height={img.height}
              alt={page.name}
              fetchPriority="high"
            />
            <figcaption>
              <span className="for-land-name">{page.name}</span>
              <span className="for-land-title">
                {titleLines(page.title).map((line, n) => (
                  <span key={line}>
                    {n > 0 && <span className="sr-only">, and </span>}
                    {line}
                  </span>
                ))}
              </span>
              {img.source && (
                <span className="for-credit">
                  Photo: <a href={img.source.href}>{img.source.label}</a>
                </span>
              )}
            </figcaption>
          </RotateIn>
        </div>
      </div>
    </section>
  );
}

function Concerns({ concerns }: { concerns: LandingConcern[] }) {
  if (concerns.length === 0) return null;
  return (
    <section className="for-qa" aria-labelledby="for-concerns">
      <div className="art-container for-split">
        <div className="for-split-head">
          <h2 id="for-concerns" className="for-h2">
            What I&apos;m guessing you&apos;re concerned with
          </h2>
          <p className="for-dek">Your likely questions, as I imagine you&apos;d put them, and my answers.</p>
        </div>
        <ul className="for-qa-list">
          {concerns.map((c) => (
            <li key={c.q} className="for-qa-item">
              <h3 className="for-qa-q">{c.q}</h3>
              <p className="for-qa-a">
                {c.lead && <strong className="for-qa-lead">{c.lead}</strong>}
                {c.lead && " "}
                {c.a}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ReadingList({ path }: { path: ReadingPath }) {
  if (path.items.length === 0) return null;
  const total = totalLine(path);
  return (
    <section className="for-reading" aria-labelledby="for-reading">
      <div className="art-container for-split">
        <div className="for-split-head">
          <h2 id="for-reading" className="for-h2">
            Your reading list
          </h2>
          <p className="for-dek">Most important first, with the time each one takes. Stop wherever your time runs out.</p>
        </div>
        <div className="for-path-wrap">
          <ol className="for-path">
            {path.items.map((item, i) => (
              <li key={`${item.href}-${i}`} className="for-path-item">
                <PathLink item={item} n={i + 1} />
                {item.stops.length > 0 && <p className="for-path-stop">{stopLine(item.stops)}</p>}
              </li>
            ))}
          </ol>
          {total && <p className="for-path-total">{total}</p>}
        </div>
      </div>
    </section>
  );
}

// ---------- The page ----------

export default async function StakeholderPageView({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { approved, pages, notice, aboutMe } = stakeholderGate();
  const page = pages.find((p) => p.slug === slug);
  if (!page) notFound();

  // The new site (VERDICT.md 2.3, previews only until a checkpoint): the P1 to P7 stack.
  if (NEW_SITE) {
    return (
      <PersonalPage
        page={page}
        portrait={portraitFor(page.slug)}
        approved={approved}
        notice={notice}
        aboutMe={aboutMe}
        sources={page.sources ?? notice.sources}
      />
    );
  }

  const demos = allDemos();
  const picked = page.demos
    .map((d) => {
      const demo = demos.find((x) => x.n === d.n);
      return demo ? { ...demo, why: d.why } : null;
    })
    .filter((d) => d !== null);

  const landing = page.landing;
  const path = landing ? readingPath(landing.reading_list) : null;
  if (path && path.misses.length > 0) {
    console.warn(`/for/${page.slug}: no reading time for ${path.misses.join(", ")} (content/inventory.json)`);
  }
  // A feed post already on the reading list isn't listed again under "Moments from the build".
  const onList = new Set(
    (landing?.reading_list ?? []).map((l) => /^(?:https:\/\/hire-me-hackathon\.vercel\.app)?\/#post-(.+)$/.exec(l.href)?.[1]),
  );

  const posts = feedPosts();
  const moments = (page.moments ?? [])
    .filter((id) => !onList.has(id))
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

  // The detail chapters are numbered in the order they appear.
  let chapter = 0;
  const nextNum = () => String(++chapter).padStart(2, "0");
  const demosNum = nextNum();
  const momentsNum = moments.length > 0 ? nextNum() : "";
  const aboutNum = aboutMe ? nextNum() : "";

  const img = portraitFor(page.slug);

  return (
    <main className={landing ? "art art-for for-landing" : "art art-for"}>
      {landing && path ? (
        <>
          {/* ---------- The landing: hello, their likely questions, their reading list ---------- */}
          <LandingHero page={page} greeting={landing.greeting} path={path} draft={!approved || !landing.approved} />
          <Concerns concerns={landing.concerns} />
          <ReadingList path={path} />
        </>
      ) : (
      /* ---------- Who it's for: the portrait, the name, the title, the framing ---------- */
      <section className="art-hero for-person-hero" aria-labelledby="for-name">
        <div className="art-container">
          <p className="art-back">
            <Link href="/for">← All six pages</Link>
          </p>
          <div className="for-person-grid">
            <RotateIn as="figure" from="bottom-left" angle={-10} delay={150} duration={800} fade={600} onLoad className="for-portrait">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                srcSet={img.srcSet}
                sizes="(min-width: 992px) 420px, (min-width: 768px) 300px, 240px"
                width={img.width}
                height={img.height}
                alt={page.name}
                fetchPriority="high"
              />
              {img.source && (
                <figcaption className="for-credit">
                  Photo: <a href={img.source.href}>{img.source.label}</a>
                </figcaption>
              )}
            </RotateIn>
            <div className="for-person-copy">
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
              <p className="sh-title">
                {titleLines(page.title).map((line, n) => (
                  <span key={line}>
                    {n > 0 && <span className="sr-only">, and </span>}
                    {line}
                  </span>
                ))}
              </p>
              <p className="art-hero-lead">{page.framing}</p>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* ---------- The explaining part ---------- */}
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
              <a href="#for-demos" className="art-button">
                See the demos for you
              </a>
            </li>
            <li>
              <Link href="/#post-status" className="art-cta-link">
                See all ten demos
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* ---------- The details ---------- */}
      <section className="art-chapter sh-chapter" aria-labelledby="for-demos">
        <div className="art-container">
          <Reveal delay={100} className="art-chapter-grid">
            <div className="art-rail">
              <span className="art-rail-num" aria-hidden="true">
                {demosNum}
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
                  {momentsNum}
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

      {aboutMe && (
        <section className="art-chapter sh-chapter for-about" aria-labelledby="for-about-me">
          <div className="art-container">
            <Reveal delay={100} className="art-chapter-grid">
              <div className="art-rail">
                <span className="art-rail-num" aria-hidden="true">
                  {aboutNum}
                </span>
                <h2 id="for-about-me" className="art-eyebrow">
                  {aboutMe.heading}
                </h2>
              </div>
              <div className="art-chapter-body">
                <p className="for-about-text">{aboutMe.text}</p>
              </div>
            </Reveal>
          </div>
        </section>
      )}

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
