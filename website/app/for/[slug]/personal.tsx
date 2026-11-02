import Link from "next/link";
import type { ReactNode } from "react";
import raw from "@/content/stakeholders.json";
import { IS_PRODUCTION_BUILD } from "../../flags";
import { RotateIn } from "../../motion";
import { RecommendCarousel } from "../../recommend-carousel";
import { LIST_SLUGS, recommendFor, type ListSlug } from "../../recommend";
import { RememberYourPage, withFor } from "../../your-page";
import type { StakeholderNotice, StakeholderPage } from "../../stakeholders";
import "./personal.css";

// A personal page on the new site (VERDICT.md 2.3, P1 to P7), built only when NEW_SITE=1:
//   P1  the portrait, the name and the title (no "what Alex Alderman would build" line: rule 3)
//   P2  "Hi <name>." and a note from Alex, 80 to 150 words, signed with his photo
//   P3  Recommended for you: their list from content/recommend.json
//   P4  at most three questions, each a one-line answer linking a piece (none on the growth page)
//   P5  one line on how this page was made
//   P6  the one ask: the stop point
//   P7  about me, about this page, the takedown offer (the shared blocks, as live)
//
// The gate (VERDICT.md 2.3): a production build shows P2's note and P4 to P6 only once
// `landing.approved` is true; before that, only the hello, the carousel and P7. A preview build shows
// the unapproved words too, marked as a draft, so Alex can approve or edit them on the real page, and
// a clearly marked placeholder where K2's words haven't arrived yet. No placeholder reaches production.
//
// K2 writes these into content/stakeholders.json, under each page's `landing` (Markdown links
// [words](/path) allowed in all four; paragraphs in `note` are separated by a blank line):
//   note: string    questions: { q: string, a: string }[]    made_line: string    ask_line: string

type K2 = { approved?: boolean; note?: string; questions?: { q: string; a: string }[]; made_line?: string; ask_line?: string };

const PAGE_SLUGS = LIST_SLUGS.filter((s) => s !== "default");

function rawLanding(slug: string): K2 {
  const p = (raw.pages as { slug: string; landing?: K2 }[]).find((x) => x.slug === slug);
  return p?.landing ?? {};
}

/** Text with Markdown links: internal ones keep the visitor's page in ?for=. */
function Inline({ text, slug }: { text: string; slug: string }) {
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const [, words, href] = m;
    out.push(
      href.startsWith("/") ? (
        <Link key={m.index} href={withFor(href, slug)}>
          {words}
        </Link>
      ) : (
        <a key={m.index} href={href}>
          {words}
        </a>
      ),
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

/** Preview only: where K2's words haven't arrived. Never rendered by a production build. */
function Placeholder({ what }: { what: string }) {
  if (IS_PRODUCTION_BUILD) return null;
  return <p className="pp-placeholder">Placeholder (preview only): {what}</p>;
}

function titleLines(title: string) {
  return title.split(" · ");
}

export function PersonalPage({
  page,
  portrait,
  approved,
  notice,
  aboutMe,
  sources,
}: {
  page: StakeholderPage;
  portrait: { src: string; srcSet?: string; width: number; height: number; source?: { href: string; label: string } };
  /** The site-wide `approved` from content/stakeholders.json. */
  approved: boolean;
  notice: StakeholderNotice;
  aboutMe?: { heading: string; text: string } | null;
  sources: string;
}) {
  const slug = page.slug;
  const k2 = rawLanding(slug);
  const isApproved = approved && k2.approved === true;
  // Words not yet approved show on previews (as a draft), never in production.
  const showWords = isApproved || !IS_PRODUCTION_BUILD;
  const first = page.name.split(" ")[0];
  const questions = slug === "growth" ? [] : (k2.questions ?? []).slice(0, 3);
  const cards = recommendFor(slug as ListSlug);

  return (
    <main className="art art-for for-landing pp">
      <RememberYourPage slug={slug} />

      {/* ---------- P1 and P2: who it's for, and the note from Alex ---------- */}
      <section className="art-hero for-person-hero for-land-hero" aria-labelledby="for-hello">
        <div className="art-container">
          <p className="art-back">
            <Link href="/for">← All six pages</Link>
          </p>
          <div className="for-land-grid">
            <div className="for-land-copy">
              {!isApproved && !IS_PRODUCTION_BUILD && (
                <p className="sh-draft-strip">Draft for Alex&apos;s review: preview only, not on the live site</p>
              )}
              <h1 id="for-hello" className="for-hello">
                Hi {first}.
              </h1>
              {showWords && k2.note ? (
                <div className="pp-note">
                  {k2.note.split(/\n\s*\n/).map((para, i) => (
                    <p key={i} className="for-land-lead">
                      <Inline text={para.trim()} slug={slug} />
                    </p>
                  ))}
                </div>
              ) : (
                <Placeholder what="K2 brings the note from Alex (80 to 150 words)." />
              )}
              {(showWords && k2.note) || !IS_PRODUCTION_BUILD ? (
                <div className="for-land-from pp-sign">
                  <span className="pp-sign-photo" aria-hidden="true">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/about/alex-headshot-480.webp" width={480} height={729} alt="" />
                  </span>
                  <p>
                    <span className="for-land-from-name">Alex Alderman</span>
                    <span className="for-land-from-role">Applying to Addvery as a GTM engineer</span>
                  </p>
                </div>
              ) : null}
            </div>
            <RotateIn as="figure" from="bottom-right" angle={8} delay={150} duration={800} fade={600} onLoad className="for-land-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={portrait.src}
                srcSet={portrait.srcSet}
                sizes="(min-width: 992px) 360px, (min-width: 768px) 260px, 104px"
                width={portrait.width}
                height={portrait.height}
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
                {portrait.source && (
                  <span className="for-credit">
                    Photo: <a href={portrait.source.href}>{portrait.source.label}</a>
                  </span>
                )}
              </figcaption>
            </RotateIn>
          </div>
        </div>
      </section>

      {/* ---------- P3: recommended for you (the heading is a working label until alex-voice) ---------- */}
      <RecommendCarousel heading="Recommended for you" cards={cards} forSlug={slug} people={PAGE_SLUGS} />

      {/* ---------- P4: at most three questions (none on the growth page) ---------- */}
      {slug !== "growth" &&
        (showWords && questions.length > 0 ? (
          <section className="for-qa" aria-labelledby="for-questions">
            <div className="art-container for-split">
              <div className="for-split-head">
                <h2 id="for-questions" className="for-h2">
                  Questions you might have
                </h2>
              </div>
              <ul className="for-qa-list">
                {questions.map((c) => (
                  <li key={c.q} className="for-qa-item">
                    <h3 className="for-qa-q">{c.q}</h3>
                    <p className="for-qa-a">
                      <Inline text={c.a} slug={slug} />
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : (
          !IS_PRODUCTION_BUILD && (
            <section className="pp-band" aria-label="Questions (placeholder)">
              <div className="art-container">
                <Placeholder what="K2 brings at most three questions, each with a one-line answer that links a piece." />
              </div>
            </section>
          )
        ))}

      {/* ---------- P5 and P6: how this page was made, and the one ask ---------- */}
      {(showWords && (k2.made_line || k2.ask_line)) || !IS_PRODUCTION_BUILD ? (
        <section className="pp-band pp-close" aria-label="How this page was made, and one ask">
          <div className="art-container">
          <div className="pp-close-inner">
            {showWords && k2.made_line ? (
              <p className="pp-made">
                <Inline text={k2.made_line} slug={slug} />
              </p>
            ) : (
              <Placeholder what="K2 brings one line on how this page was made, linking /skills and the ICP piece." />
            )}
            {showWords && k2.ask_line ? (
              <p className="pp-ask">
                <Inline text={k2.ask_line} slug={slug} />
              </p>
            ) : (
              <Placeholder what="K2 brings the one ask (call 5)." />
            )}
          </div>
          </div>
        </section>
      ) : null}

      {/* ---------- P7: about me, about this page, the takedown offer (as live) ---------- */}
      {aboutMe && (
        <section className="art-chapter sh-chapter for-about" aria-labelledby="for-about-me">
          <div className="art-container">
            <div className="art-chapter-grid">
              <div className="art-rail">
                <h2 id="for-about-me" className="art-eyebrow">
                  {aboutMe.heading}
                </h2>
              </div>
              <div className="art-chapter-body">
                <p className="for-about-text">{aboutMe.text}</p>
              </div>
            </div>
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
