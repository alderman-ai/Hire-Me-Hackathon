import type { Metadata } from "next";
import Link from "next/link";
import { entryUrl, findEntry } from "../articles/entries";
import { Reveal, RotateIn } from "../motion";
import { GradientButton } from "../site-chrome";
import { readAboutCopy, type CopyBlock } from "./copy";
import { t } from "../copy";
import { NEW_SITE } from "../flags";
import { LIST_SLUGS, RECOMMEND_ON, pageHref, recommendFor } from "../recommend";
import { RecommendCarousel } from "../recommend-carousel";
import { VideoFrame } from "../best/parts";
import { CLIP_S02_E, CLIP_S12_M, WORK_CLIPS, type AboutClip } from "./clips";
import { AI_PORTFOLIO_SLUG, FACTS, LINKS, SHOW_ZERO_COUNTS } from "./profile";
import { LinkedInWall } from "./wall";
import { wallCards, wallSpan } from "./wall-data";
import { LinkedInWallFull } from "./wall-full";
import { fullWallCards } from "./wall-full-data";
import "./about.css";
import "./wall-full.css";

// The full wall (all 94 posts, image-led: ./wall-full.tsx) is built only when WALL_FULL=1 is set at
// build time, which only the preview deploy does (`vercel deploy --build-env WALL_FULL=1`). Every other
// build, production included, keeps the 34-post wall exactly as it is, until Alex says yes on the preview.
const WALL_FULL = process.env.WALL_FULL === "1";

// /about: who Alex is. Alex, 2 Nov: "one section of the website should be my background ... from my
// live website, alderman.ai. It's got my headshot and my background", and "a wall of LinkedIn posts
// ... It starts with the collapsed version like you would see on LinkedIn. The 'Read more' would
// basically do a popup of the full version ... it just shows that I've been posting nonstop about AI."
//
// Built to orchestration's mockup (About.dc.html on the "Hire Me site mockup" canvas): the dark hero
// with the headshot (Addvery's team-detail page), the story beside an "At a glance" box (their
// case-study client grid), his belief as a lilac quote band (their study_quote), then the wall.
//
// Sources: the copy is local/about/about-me.md (./copy.ts), the posts content/linkedin-wall.json
// (./wall-data.ts), the settings ./profile.ts, the images public/about/ (scripts/about_assets.py makes
// them all; local/ and public/about/ are git-ignored and deploy from the working tree).

const TITLE = "About Alex Alderman";
const DESCRIPTION =
  "Alex Alderman, a marketer turned GTM engineer in Prague: his background, the job he wants, and a wall of his LinkedIn posts about AI.";

// The preview image is ./opengraph-image.tsx (the headshot beside the title, in the site's card template).
export const metadata: Metadata = {
  title: `${TITLE} · Hire Me Hackathon`,
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    firstName: "Alex",
    lastName: "Alderman",
    url: "/about",
    siteName: "Hire Me Hackathon",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

function Blocks({ blocks }: { blocks: CopyBlock[] }) {
  return blocks.map((b, i) =>
    b.kind === "quote" ? (
      <figure key={i} className="about-quote">
        <blockquote>
          <p dangerouslySetInnerHTML={{ __html: b.html }} />
        </blockquote>
        <figcaption>
          <span className="about-quote-name">{b.by}</span>
        </figcaption>
      </figure>
    ) : (
      <p key={i} dangerouslySetInnerHTML={{ __html: b.html }} />
    ),
  );
}

/** The quiet link to Alex's AI portfolio (an entry under /demos), once AI_PORTFOLIO_SLUG names one. */
function PortfolioCard() {
  if (!AI_PORTFOLIO_SLUG) return null;
  const entry = findEntry(AI_PORTFOLIO_SLUG);
  if (!entry) return null;
  return (
    <Link href={entryUrl(entry.slug)} className="about-link-card about-portfolio">
      <span className="about-link-text">
        <span className="about-portfolio-label">My AI portfolio</span>
        <span className="about-link-title">{entry.title}</span>
        {entry.cover.subtitle && <span className="about-link-note">{entry.cover.subtitle}</span>}
      </span>
    </Link>
  );
}

const PAGE_SLUGS = LIST_SLUGS.filter((x) => x !== "default");

/** One clip on the new site, in the colours of the band it sits in (bx-light or bx-lilac supplies them). */
function Clip({ clip, tone }: { clip: AboutClip; tone: "light" | "lilac" | "ink" }) {
  const cls = tone === "ink" ? "" : `bx-band bx-${tone} on-light ab-clip`;
  const frame = (
    <VideoFrame
      youtube={clip.youtube}
      start={clip.start}
      end={clip.end}
      label={clip.quote}
      caption={clip.quote}
      meta={clip.meta}
      length={clip.length}
      still={clip.still}
      size="sm"
    />
  );
  return cls ? <div className={cls}>{frame}</div> : frame;
}

export default function AboutPage() {
  const copy = readAboutCopy();
  const story = copy.sections.slice(0, -1);
  const belief = copy.sections[copy.sections.length - 1];
  const cards = WALL_FULL ? [] : wallCards();
  const fullPosts = WALL_FULL ? fullWallCards() : [];
  const firstQuote = Math.max(0, belief.blocks.findIndex((b) => b.kind === "quote"));
  const longVersion = copy.articleLinkText ? pageHref("art-pipeline-promise") : undefined;
  const posts: { date: string }[] = WALL_FULL ? fullPosts : cards;

  return (
    <main className="about">
      <section className="about-hero" aria-labelledby="about-title">
        <div className="about-container about-hero-grid">
          <Reveal variant="left" onLoad className="about-hero-copy">
            <div className="about-eyebrow-row">
              <span className="about-eyebrow-line" aria-hidden="true" />
              <p className="about-eyebrow">About me</p>
            </div>
            <h1 id="about-title" className="about-h1">
              Alex Alderman
            </h1>
            <p className="about-lead" dangerouslySetInnerHTML={{ __html: copy.leadHtml }} />
            <GradientButton href="#linkedin" className="about-cta">
              Read my LinkedIn posts
            </GradientButton>
          </Reveal>
          <RotateIn as="figure" from="bottom-right" angle={10} onLoad delay={150} className="about-portrait">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/about/alex-headshot-800.webp"
              srcSet="/about/alex-headshot-480.webp 480w, /about/alex-headshot-800.webp 800w"
              sizes="(max-width: 991px) min(88vw, 420px), 420px"
              width={800}
              height={1215}
              alt="Alex Alderman"
              fetchPriority="high"
            />
          </RotateIn>
        </div>
      </section>

      <section className="about-story" aria-label="My background">
        <div className="about-container about-story-grid">
          {/* The box comes first in the page, so on phones the facts sit right under the hero; on wide
              screens the grid puts it in the right-hand column (about.css). */}
          <aside className="about-aside" aria-labelledby="about-glance">
            <div className="about-glance">
              <h2 id="about-glance" className="about-glance-title">
                At a glance
              </h2>
              <dl>
                {FACTS.map((f) => (
                  <div key={f.term} className="about-glance-row">
                    <dt>{f.term}</dt>
                    <dd>{f.detail}</dd>
                  </div>
                ))}
                {NEW_SITE && (
                  <div className="about-glance-row">
                    <dt>{t("about.glance.1")}</dt>
                    <dd>
                      <Link href="/#machine">{t("about.glance.2")}</Link>
                    </dd>
                  </div>
                )}
              </dl>
              <div className="about-links">
                <a className="about-link-card" href={LINKS.site.href} target="_blank" rel="noopener noreferrer">
                  <span className="about-site-logo">
                    {/* His logo from alderman.ai, as is (local/alex/brand/). White letters, so on a dark tile. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/about/alderman-ai-stacked-logo-v1.svg" width={27} height={41} alt="" />
                  </span>
                  <span className="about-link-text">
                    <span className="about-link-title">{LINKS.site.label}</span>
                    <span className="about-link-note">
                      {LINKS.site.note}
                      <span className="sr-only"> (new tab)</span>
                    </span>
                  </span>
                </a>
                <PortfolioCard />
              </div>
            </div>
          </aside>
          <div className="about-prose">
            {story.map((s) => (
              <section key={s.id} className="about-section" aria-labelledby={s.id}>
                <h2 id={s.id} className="about-h2">
                  {s.title}
                </h2>
                <Blocks blocks={s.blocks} />
                {NEW_SITE && s.title.startsWith("The job I want") && <Clip clip={CLIP_S02_E} tone="light" />}
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="about-belief" aria-labelledby={belief.id}>
        <div className="about-container about-belief-inner">
          <h2 id={belief.id} className="about-h2 about-belief-title">
            {belief.title}
          </h2>
          {NEW_SITE ? (
            <>
              <Blocks blocks={belief.blocks.slice(0, firstQuote)} />
              <Clip clip={CLIP_S12_M} tone="lilac" />
              <Blocks blocks={belief.blocks.slice(firstQuote)} />
              {longVersion && (
                <p className="about-belief-more">
                  <Link href={longVersion}>{copy.articleLinkText}</Link>
                </p>
              )}
            </>
          ) : (
            <Blocks blocks={belief.blocks} />
          )}
        </div>
      </section>

      {NEW_SITE && (
        <section className="bx-band bx-ink on-dark about-work" aria-labelledby="work">
          <div className="about-container">
            <p className="about-work-eyebrow">{t("about.work.1")}</p>
            <h2 id="work" className="about-h2">
              {t("about.work.2")}
            </h2>
            <ul className="about-vids">
              {WORK_CLIPS.map((c) => (
                <li key={c.still}>
                  <Clip clip={c} tone="ink" />
                </li>
              ))}
            </ul>
            <div className="about-photos">
              <figure>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/setup-2026-11-02.jpg"
                  width={2400}
                  height={1800}
                  loading="lazy"
                  decoding="async"
                  alt="Alex's desk on build day: three monitors with terminal windows and a session video, a microphone and a red-backlit keyboard, two bright ring lights, and a grey office chair in front."
                />
                <figcaption>{t("about.work.3")}</figcaption>
              </figure>
              <figure>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/dog-walk-2026-11-02.jpg"
                  width={1200}
                  height={1600}
                  loading="lazy"
                  decoding="async"
                  alt="A small brown and white wire-haired dog lying on the hallway floor by the door, with shoes, a school backpack, a scooter and a helmet behind him."
                />
                <figcaption>{t("about.work.4")}</figcaption>
              </figure>
            </div>
          </div>
        </section>
      )}

      {NEW_SITE && RECOMMEND_ON && (
        <RecommendCarousel heading={t("about.written.1")} cards={recommendFor("about")} people={PAGE_SLUGS} />
      )}

      <section className={WALL_FULL ? "about-wall about-wall-full" : "about-wall"} aria-labelledby="linkedin">
        <div className="about-container about-wall-inner">
          <header className="about-wall-head">
            <h2 id="linkedin" className="about-h2">
              From my LinkedIn
            </h2>
            <p className="about-wall-dek">
              {posts.length} of my posts from {wallSpan(posts)}, newest first, as I wrote them. Read more opens the
              whole post.
            </p>
            <p className="about-wall-follow">
              <a href={LINKS.linkedin.href} target="_blank" rel="noopener noreferrer">
                Follow me on LinkedIn<span className="sr-only"> (new tab)</span>
              </a>
            </p>
          </header>
          {!WALL_FULL && <LinkedInWall posts={cards} showZeroCounts={SHOW_ZERO_COUNTS} />}
        </div>
        {WALL_FULL && (
          <div className="wf-wide">
            <LinkedInWallFull posts={fullPosts} showZeroCounts={SHOW_ZERO_COUNTS} />
          </div>
        )}
      </section>
    </main>
  );
}
