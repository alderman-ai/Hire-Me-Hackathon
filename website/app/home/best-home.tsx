import Link from "next/link";
import { RecommendCarousel } from "../recommend-carousel";
import { LIST_SLUGS, RECOMMEND_ON, pageHref, recommendFor } from "../recommend";
import { GradientButton } from "../site-chrome";
import { t, type CopyKey } from "../copy";
import { SKILLS_PAGE } from "../flags";
import stakeholders from "@/content/stakeholders.json";
import { lensLine } from "../stakeholders";
import { entryUrl, findEntry } from "../articles/entries";
import { C1_SLUG, C2_SLUG } from "../best/machine-words";
import { ArrowLink, Band, CRM_LINE, EyebrowRow, Figure, LinkRow, Quote, QuoteSource, SectionHead, VideoFrame } from "../best/parts";
import { HeroVideo } from "./hero-video";
import { LeadCard } from "./lead-card";
import "./home.css";

/*
 * The home (4 Nov rewrite, for Addvery only: orchestration\local\copy\home-4nov.json, its _structure the
 * spec), shown only with NEW_SITE (app/page.tsx). One h1, the hero's. Top to bottom:
 *   hero          the "Keep the promise" film (unchanged; its buttons go to #proof and #six)
 *   #what         what you're looking at                       light
 *   #six          a page for each of you, with each hook line  dark, glow
 *   #argument     my one argument, the personalization line    lilac
 *   #proof        one lead from its export to its message      ink (the lead card, lead-card.tsx)
 *   #team         the same model on Addvery's own team          light
 *   #build        one person, a team of Claude Code sessions    ink
 *   the carousel  recommend.json lists.home (articles only)
 *   #who          about me                                      dark
 * Every word is a site-copy key; lib/agent-track's homeDoc reads the same keys in the same order.
 */

const PAGE_SLUGS = LIST_SLUGS.filter((s) => s !== "default");

/** "Chief Growth Officer, Addvery" becomes "Chief Growth Officer"; a second role after " · " is dropped. */
function roleOf(title: string) {
  return title.split(" · ")[0].replace(/, Addvery$/, "");
}

/** "a **b** c" as text and <strong>. */
function withBold(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part));
}

/** A key's paragraphs (split on blank lines), **bold** as <strong>. */
function Paras({ k, className }: { k: CopyKey; className?: string }) {
  return (
    <div className={["bh-prose", className].filter(Boolean).join(" ")}>
      {t(k)
        .split(/\n\s*\n/)
        .map((p) => (
          <p key={p}>{withBold(p.trim())}</p>
        ))}
    </div>
  );
}

export function BestHome() {
  const pipelineArticle = pageHref("art-pipeline-promise");
  const sequences = findEntry(C2_SLUG) ? entryUrl(C2_SLUG) : undefined;
  const routing = findEntry(C1_SLUG) ? entryUrl(C1_SLUG) : undefined;
  return (
    <main>
      {/* 0. Hero: the "Keep the promise" film. On a desktop its poster is the band's background, the words
          sit left and the player takes the 16:9 box on the right; on a phone the poster is a 16:9 frame on
          top and the words sit under it (home.css, "Hero"). The film comes first in the source so the play
          button is first in tab order, matching the phone layout. */}
      <Band tone="dark" pad="sm" labelledBy="home-title" className="bh-hero bh-promise" bare>
        <div className="bh-promise-grid">
          <HeroVideo
            youtube="zVnA-AMuNfc"
            poster="/home/hero-promise.webp"
            playLabel={t("home.hero.7")}
            newTab={t("home.hero.8")}
            title={t("home.hero.6")}
            tag={t("home.hero.6")}
          />
          <div className="bh-promise-copy">
            <EyebrowRow>{t("home.hero.1")}</EyebrowRow>
            <h1 id="home-title" className="bx-h1 bh-promise-h1">
              {t("home.hero.4")}
            </h1>
            <p className="bh-promise-ask">{t("home.hero.5")}</p>
            <p className="bh-promise-gold">{t("home.hero.6")}</p>
            <div className="bh-byline">
              <span className="bh-byline-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/about/alex-headshot-480.webp" alt="" width={40} height={40} />
              </span>
              <p>
                <span className="bh-byline-name">{t("home.hero.9")}</span>
                <span className="bh-byline-role">{t("home.hero.10")}</span>
              </p>
            </div>
            <div className="bh-actions">
              <GradientButton href="#proof" className="bh-promise-btn">
                {t("home.hero.2")}
              </GradientButton>
              <ArrowLink href="#six">{t("home.hero.3")}</ArrowLink>
            </div>
          </div>
        </div>
      </Band>

      {/* 1. What you're looking at: words only, the hero carries the picture. */}
      <Band tone="light" id="what" labelledBy="what-title">
        <SectionHead eyebrow={t("home.what.1")} title={t("home.what.2")} titleId="what-title" />
        <Paras k="home.what.3" />
        <Quote
          className="bh-q"
          maxWidth={860}
          text={t("home.what.quote")}
          source={<QuoteSource youtube="qrBNOsSYGrQ" start={668}>{t("home.what.quote_source")}</QuoteSource>}
        />
      </Band>

      {/* 2. A page for each of you: the six faces, each with the hook line the /for grid shows. */}
      <Band tone="dark" glow id="six" labelledBy="six-title">
        <SectionHead
          eyebrow={t("home.six.1")}
          title={t("home.six.2")}
          titleId="six-title"
          action={<ArrowLink href="/for">{t("home.six.action")}</ArrowLink>}
        />
        <Paras k="home.six.3" className="bh-prose-six" />
        <ul className="bh-faces">
          {stakeholders.pages.map((p) => {
            const hook = lensLine(p as { lens?: string; lens_key?: string });
            return (
              <li key={p.slug}>
                <Link href={`/for/${p.slug}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/people/${p.slug}-400.webp`} alt="" width={400} height={500} loading="lazy" decoding="async" />
                  <span>{p.name}</span>
                  <small>{roleOf(p.title)}</small>
                  {hook && <em className="bh-face-hook">{hook}</em>}
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="bh-takedown">
          {t("shared.takedown.1")} <Link href="/privacy">{stakeholders.notice.privacy_label}</Link>.
        </p>
      </Band>

      {/* 3. My one argument: personalization and volume, both. */}
      <Band tone="lilac" id="argument" labelledBy="argument-title">
        <SectionHead eyebrow={t("home.argument.1")} title={t("home.argument.2")} titleId="argument-title" />
        <Paras k="home.argument.3" />
        <div className="bh-argument-fig">
          <Figure
            src="/demos-assets/if-ai-wont-replace-half-your-team/personalisation-volume.png"
            alt={t("home.argument.figure.alt")}
            caption={t("home.argument.figure.caption")}
            width={1440}
            height={740}
          />
        </div>
        {pipelineArticle && (
          <LinkRow>
            <ArrowLink href={pipelineArticle}>{t("home.argument.link")}</ArrowLink>
          </LinkRow>
        )}
      </Band>

      {/* 4. One lead, from a LinkedIn search to its first message. The fiction note comes before the card. */}
      <Band tone="ink" id="proof" labelledBy="proof-title">
        <SectionHead eyebrow={t("home.proof.1")} title={t("home.proof.2")} titleId="proof-title" />
        <Paras k="home.proof.3" />
        <p className="bh-fiction">{withBold(t("home.proof.fiction"))}</p>
        <LeadCard />
        <div className="bh-prose bx-mt-4">
          <p>{t("home.proof.twelve")}</p>
          <p className="bh-muted">{t("shared.limits.1")}</p>
        </div>
        <Quote className="bh-q" text={CRM_LINE} source={t("shared.crm.1")} xl mark maxWidth={1000} />
        {(sequences || routing) && (
          <LinkRow>
            {sequences && <ArrowLink href={sequences}>{t("home.proof.link_sequences")}</ArrowLink>}
            {routing && <ArrowLink href={routing}>{t("home.proof.link_routing")}</ArrowLink>}
          </LinkRow>
        )}
      </Band>

      {/* 5. The same model on Addvery's own team: counts, never names. */}
      <Band tone="light" id="team" labelledBy="team-title">
        <SectionHead eyebrow={t("home.team.1")} title={t("home.team.2")} titleId="team-title" />
        <div className="bh-two bh-team">
          <Paras k="home.team.3" />
          <figure className="bx-fig bh-team-fig">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/d1/03-linkedin-activity-1280.webp"
              srcSet="/d1/03-linkedin-activity-1280.webp 1x, /d1/03-linkedin-activity-2880.webp 2x"
              alt={t("home.team.figure.alt")}
              width={1280}
              height={853}
              loading="lazy"
              decoding="async"
            />
            <figcaption>{t("home.team.figure.caption")}</figcaption>
          </figure>
        </div>
        <LinkRow>
          <ArrowLink href="/d1">{t("home.team.link")}</ArrowLink>
        </LinkRow>
      </Band>

      {/* 6. One person, a team of Claude Code sessions: the 13:20 kill, the recovery, the skill. */}
      <Band tone="ink" id="build" labelledBy="build-title">
        <SectionHead eyebrow={t("home.build.1")} title={t("home.build.2")} titleId="build-title" />
        <Paras k="home.build.3" />
        <div className="bh-build-clip">
          <VideoFrame
            youtube="S2NTaJHUmTM"
            label={t("home.build.clip.label")}
            caption={t("home.build.clip.caption")}
            meta={t("home.build.clip.meta")}
            length="0:33"
            still="/videos/day1-3.webp"
          />
        </div>
        <Paras k="home.build.4" className="bx-mt-3" />
        <Quote
          className="bh-q"
          maxWidth={900}
          text={t("home.build.quote")}
          source={<QuoteSource youtube="NULD_WteCRM" start={474}>{t("home.build.quote_source")}</QuoteSource>}
        />
        <Paras k="home.build.5" className="bx-mt-3" />
        <LinkRow>
          {SKILLS_PAGE && <ArrowLink href="/skills">{t("home.skills.3")}</ArrowLink>}
          <ArrowLink href="/log">{t("home.build.log_link")}</ArrowLink>
        </LinkRow>
      </Band>

      {/* 7. Recommended for you: the home's own list, articles only. */}
      {RECOMMEND_ON && <RecommendCarousel heading="Recommended for you" cards={recommendFor("home")} people={PAGE_SLUGS} />}

      {/* 8. About me */}
      <Band tone="dark" labelledBy="who">
        <div className="bh-about">
          <figure className="bh-about-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/about/alex-headshot-800.webp" alt="Alex Alderman" width={800} height={1000} loading="lazy" decoding="async" />
          </figure>
          <div>
            <EyebrowRow>{t("home.about.1")}</EyebrowRow>
            <h2 id="who" className="bx-h2">
              {t("home.about.2")}
            </h2>
            <Paras k="home.about.3" className="bh-about-copy" />
            <div className="bh-actions">
              <GradientButton href="/about">{t("shared.about.1")}</GradientButton>
            </div>
          </div>
        </div>
      </Band>
    </main>
  );
}
