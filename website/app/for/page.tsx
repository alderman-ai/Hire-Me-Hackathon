import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "../motion";
import { gridIntro, portraitFor, stakeholderGate, titleLines } from "../stakeholders";
import "../article.css";
import "./for.css";

// The stakeholder section's front page: the six people at Addvery, as a grid of portraits after
// Addvery's own team section. Each card opens that person's page, /for/<slug>.
//
// Same gate as the person pages (app/stakeholders.ts): no approved pages, no grid, a 404.
// Not indexed: it carries six named people's photos, and each of them gets their link from Alex.

const ROBOTS = { index: false, follow: false } as const;

export const metadata: Metadata = {
  title: "Six pages for Addvery · Hire Me Hackathon",
  description: "One page for each of six people at Addvery: what Alex Alderman would build for their part of the business.",
  robots: ROBOTS,
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M6 6v2h8.59L5 17.59L6.41 19L16 9.41V18h2V6z" />
    </svg>
  );
}

/** "one **two** three" -> one <strong>two</strong> three. */
function withBold(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part));
}

export default function ForIndex() {
  const { approved, pages, notice } = stakeholderGate();
  if (pages.length === 0) notFound();
  // The intro is s-d7's copy from content/stakeholders.json (`grid_intro`); the old one-line lead is
  // only the fallback.
  const intro = gridIntro();

  return (
    <main className="art art-for for-index">
      <section className="art-hero for-hero" aria-labelledby="for-title">
        <div className="art-container">
          {!approved && (
            <p className="sh-draft-strip">Draft for Alex&apos;s review · local only, not on the live site</p>
          )}
          {intro ? (
            <div className="for-head for-intro">
              <h1 id="for-title" className="art-h1">
                {intro.heading}
              </h1>
              {intro.paragraphs.map((p, i) => (
                <p key={i} className="art-hero-lead">
                  {withBold(p)}
                </p>
              ))}
            </div>
          ) : (
            <div className="for-head">
              <h1 id="for-title" className="art-h1">
                Six people at Addvery, one page each
              </h1>
              <p className="art-hero-lead">
                I&apos;m Alex Alderman, and I&apos;m applying to Addvery as a GTM engineer. Each page is written for
                one person: what I&apos;d build for their part of the business, and the one thing I&apos;d ask them.
                Pick a portrait to open it.
              </p>
            </div>
          )}

          <h2 className="sr-only">The six pages</h2>
          <ul className="for-grid">
            {pages.map((page, i) => {
              const img = portraitFor(page.slug);
              return (
                <Reveal as="li" key={page.slug} delay={(i % 3) * 120} className="for-card">
                  <div className="for-card-photo">
                    {/* The name below is the link and says who this is, so the photo itself stays silent. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.src}
                      srcSet={img.srcSet}
                      sizes="(min-width: 1230px) 370px, (min-width: 992px) 30vw, 45vw"
                      width={img.width}
                      height={img.height}
                      alt=""
                      loading={i < 3 ? "eager" : "lazy"}
                      decoding="async"
                    />
                    <span className="for-card-go" aria-hidden="true">
                      <ArrowIcon />
                    </span>
                  </div>
                  <h3 className="for-card-name">
                    <Link href={`/for/${page.slug}`}>{page.name}</Link>
                  </h3>
                  <p className="for-card-title">
                    {titleLines(page.title).map((line, n) => (
                      <span key={line}>
                        {n > 0 && <span className="sr-only">, and </span>}
                        {line}
                      </span>
                    ))}
                  </p>
                </Reveal>
              );
            })}
          </ul>

          <p className="for-note">
            Every page draws only on public sources, and each one says which. If you&apos;re one of the six and want
            your page taken down, reply to my LinkedIn message and it&apos;s removed.{" "}
            <Link href="/privacy">{notice.privacy_label}</Link>.
          </p>
          <p className="for-note is-credit">
            Photos: Addvery&apos;s team pages on <a href="https://www.addvery.com/#team">addvery.com</a>, and for Ivana
            Karhanová, her own website, <a href="https://ivanakarhanova.cz/cs">ivanakarhanova.cz</a>. Each page
            credits its photo. All six are shown in black and white, cropped to the same frame.
          </p>
        </div>
      </section>
    </main>
  );
}
