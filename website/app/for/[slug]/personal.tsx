import Link from "next/link";
import raw from "@/content/stakeholders.json";
import { t, type CopyKey } from "../../copy";
import { IS_PRODUCTION_BUILD, SKILLS_PAGE } from "../../flags";
import { Band, type BandTone } from "../../best/parts";
import { RotateIn } from "../../motion";
import { RecommendCarousel } from "../../recommend-carousel";
import { LIST_SLUGS, recommendFor, type ListSlug } from "../../recommend";
import { RememberYourPage } from "../../your-page";
import type { StakeholderNotice, StakeholderPage } from "../../stakeholders";
import { AfterQuotes, Chips, Lens, P4_CHIPS } from "./lens";
import { QuoteCollection, quotesFor } from "./quotes";
import { AgentRow } from "../../agent/agent-row";
import { AgentGuide } from "./agent-guide";
import { Rich } from "./rich";
import { RecalBody, RecalLead, RecalTitle, recalReady } from "./recal";
import { forText } from "./for-copy";
import "./personal.css";

// A personal page on the new site (BUILD.md 5 and 6, the best-of build), built only when NEW_SITE=1:
//   P1  "Hi <name>,", the lead (landing.lead_key + landing.lead), Alex's byline and the portrait card
//   P2  the note band (landing.note), bold as real markup, signed; none on cofounder-2
//   P3  the lens block (lens.tsx), one per page; delivery has none (its P3 and P4 are one collection)
//   P4  the quote collection, in clock order (quotes.tsx, content/quotes.json)
//   P5  the made line (landing.made_line) and its button to /skills#stakeholder-landing-pages
//   P6  Recommended for you: the slug's list from content/recommend.json
//   P7  the notice: why this page exists (not on the growth page), the sources line, the takedown offer
// No questions, no ask, no "reply to my LinkedIn message" (Alex, 22:05: pages only give).
// A recalibrated page (4 Nov, the CEO's; recal.tsx) keeps P1's portrait and byline, P5 to P7, and swaps the
// hello, the lead and P2 to P4 for its own blocks; the agent block (agent-guide.tsx) follows the byline.
//
// The gate: a production build shows the lead, P2 to P5 only once `landing.approved` is true; before that,
// only the hello, the carousel and P7. A preview build shows the unapproved words too, marked as a draft,
// so Alex can approve or edit them on the real page. No placeholder reaches production.
//
// Words per page live in content/stakeholders.json, under each page's `landing`:
//   lead: string        the sentence(s) under "Hi <name>,"
//   lead_key?: string   a site-copy key (app/copy.ts) rendered in front of `lead` (growth's first words)
//   note: string        paragraphs separated by a blank line; **bold**; [words](/path) links
//   made_line: string   sign?: string (the name under the note, default "Alex Alderman")
// The five notes are replaced later from a notes.json {slug: note}; a note stays one plain string per page.

type K2 = {
  approved?: boolean;
  lead?: string;
  lead_key?: string;
  note?: string;
  made_line?: string;
  sign?: string;
};

const PAGE_SLUGS = LIST_SLUGS.filter((s) => s !== "default");

/** Each page's P4 band colour and heading key. */
const P4: Record<string, { tone: BandTone; title: CopyKey }> = {
  growth: { tone: "light", title: "for-growth.quotes.1" },
  ceo: { tone: "ink", title: "for-ceo.quotes.1" },
  "cofounder-1": { tone: "ink", title: "for-cofounder-1.quotes.1" },
  "cofounder-2": { tone: "light", title: "for-cofounder-2.quotes.1" },
  delivery: { tone: "ink", title: "for-delivery.quotes.1" },
  bi: { tone: "light", title: "for-bi.quotes.1" },
};

function rawLanding(slug: string): K2 {
  const p = (raw.pages as { slug: string; landing?: K2 }[]).find((x) => x.slug === slug);
  return p?.landing ?? {};
}

/** Preview only: where Alex's words haven't arrived. Never rendered by a production build. */
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
  sources,
}: {
  page: StakeholderPage;
  portrait: { src: string; srcSet?: string; width: number; height: number; source?: { href: string; label: string } };
  /** The site-wide `approved` from content/stakeholders.json. */
  approved: boolean;
  notice: StakeholderNotice;
  /** Not shown on the new site (P7 is the notice alone); kept so the caller's props stay the same. */
  aboutMe?: { heading: string; text: string } | null;
  sources: string;
}) {
  const slug = page.slug;
  const k2 = rawLanding(slug);
  const isApproved = approved && k2.approved === true;
  // Words not yet approved show on previews (as a draft), never in production.
  const showWords = isApproved || !IS_PRODUCTION_BUILD;
  const first = page.name.split(" ")[0];
  const cards = recommendFor(slug as ListSlug);
  const hasLead = Boolean(k2.lead || k2.lead_key);
  const p4 = P4[slug];
  const quotes = quotesFor(slug);
  const chips = P4_CHIPS[slug];
  const skills = SKILLS_PAGE ? "/skills#stakeholder-landing-pages" : null;
  // A recalibrated page (4 Nov, the CEO's): its own words file (for-copy.ts) replaces P1's hello and lead
  // and P2 to P4 with its own blocks (recal.tsx). Nothing of it shows until the page may show its words.
  const recal = showWords && recalReady(slug);
  const madeLine = recal ? forText(slug, "landing.made_line") : k2.made_line;

  return (
    <main className="art art-for for-landing pp">
      <RememberYourPage slug={slug} />

      {/* ---------- P1: who it's for ---------- */}
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
              {recal ? (
                <>
                  <RecalTitle slug={slug} id="for-hello" />
                  <p className="rc-hello">Hi {first},</p>
                  <RecalLead slug={slug} />
                </>
              ) : (
                <h1 id="for-hello" className="for-hello">
                  Hi {first},
                </h1>
              )}
              {recal ? null : showWords && hasLead ? (
                <p className="for-land-lead pp-lead">
                  {k2.lead_key && <>{t(k2.lead_key as CopyKey)} </>}
                  {k2.lead && <Rich text={k2.lead} slug={slug} />}
                </p>
              ) : (
                <Placeholder what="the lead under the hello." />
              )}
              {(showWords && hasLead) || !IS_PRODUCTION_BUILD ? (
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
              {/* Right after the opening paragraph and its byline: hand this page to your own AI (only a page with a guide). */}
              <AgentGuide slug={slug} />
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

      {recal && <RecalBody slug={slug} concerns={page.landing?.concerns ?? []} />}

      {/* ---------- P2: the note ---------- */}
      {!recal && showWords && k2.note && (
        <Band tone="light" pad="sm" label="A note from Alex">
          <div className="pp-note">
            {k2.note.split(/\n\s*\n/).map((para, i) => (
              <p key={i}>
                <Rich text={para.trim()} slug={slug} />
              </p>
            ))}
            <div className="pp-note-sign">
              <span className="pp-note-photo" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/about/alex-headshot-480.webp" width={480} height={729} alt="" loading="lazy" decoding="async" />
              </span>
              <span>{k2.sign ?? "Alex Alderman"}</span>
            </div>
          </div>
        </Band>
      )}

      {/* ---------- P3: the lens block ---------- */}
      {!recal && showWords && <Lens slug={slug} />}

      {/* ---------- P4: Alex's own lines, in clock order ---------- */}
      {!recal && showWords && p4 && quotes.length > 0 && (
        <Band tone={p4.tone} labelledBy="pp-quotes">
          <h2 id="pp-quotes" className="bx-h2">
            {t(p4.title)}
          </h2>
          <QuoteCollection items={quotes} />
          {chips && SKILLS_PAGE && (
            <div className="bx-mt-3">
              {chips.label && <p className="bx-eyebrow pp-chips-label">{chips.label}</p>}
              <Chips items={chips.items} />
            </div>
          )}
        </Band>
      )}
      {!recal && showWords && <AfterQuotes slug={slug} />}

      {/* ---------- P5: how this page was made ---------- */}
      {/* A recalibrated page takes its made line from its words file; empty there means no block (the CEO's, 4 Nov). */}
      {showWords && madeLine && (
        <Band tone="lilac" pad="sm" label="How this page was made">
          <div className="pp-made">
            <p>
              <Rich text={madeLine} slug={slug} />
            </p>
            {skills && (
              <Link href={skills} className="pp-pill">
                {t("shared.made.1")}
              </Link>
            )}
          </div>
        </Band>
      )}

      {/* ---------- P6: recommended for you (the heading is a working label until alex-voice) ---------- */}
      <RecommendCarousel heading="Recommended for you" cards={cards} forSlug={slug} people={PAGE_SLUGS} />

      {/* The agent row: this page, handed to the visitor's own AI (app/agent). */}
      <div className="art-container">
        <AgentRow path={`/for/${slug}`} />
      </div>

      {/* ---------- P7: the notice ---------- */}
      <aside className="sh-notice" aria-labelledby="for-notice">
        <div className="art-container">
          <div className="sh-notice-box">
            <h2 id="for-notice" className="art-eyebrow is-amethyst">
              {notice.heading}
            </h2>
            {slug !== "growth" && <p>{notice.why}</p>}
            <p>{sources}</p>
            <p>
              {t("shared.takedown.2")} <Link href="/privacy">{notice.privacy_label}</Link>.
            </p>
          </div>
        </div>
      </aside>
    </main>
  );
}
