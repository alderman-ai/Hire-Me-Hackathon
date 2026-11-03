import Link from "next/link";
import { RecommendCarousel } from "../recommend-carousel";
import { LIST_SLUGS, RECOMMEND_ON, pageHref, recommendFor } from "../recommend";
import { GradientButton } from "../site-chrome";
import { t } from "../copy";
import stakeholders from "@/content/stakeholders.json";
import {
  ArrowLink,
  Band,
  CrmBand,
  EyebrowRow,
  Limits,
  MomentCard,
  MomentGrid,
  Quote,
  QuoteSource,
  SectionHead,
  Step,
  StepList,
  VideoFrame,
} from "../best/parts";
import { Machine36 } from "../best/machine";
import { HeroVideo } from "./hero-video";
import {
  HOME_ABOUT,
  HOME_ACCOUNT_QUOTE,
  HOME_ACCOUNT_STEPS,
  HOME_ARGUMENT,
  HOME_LIMITS_TITLE,
  HOME_SIX,
  HOME_SKILLS_TITLE,
  MOMENTS,
  NUMBERS,
} from "./home-words";
import "./home.css";

/*
 * The restacked home (BUILD.md 3, items 1 to 10), shown only with NEW_SITE (app/page.tsx). One h1; the
 * sections run hero, numbers, the machine, the account, the CRM line, six faces, the argument, moments
 * that became skills, recommended for you, about me.
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

export function BestHome() {
  // data-needs="art-pipeline-promise": the link shows once the article has a page.
  const pipelineArticle = pageHref("art-pipeline-promise");
  return (
    <main>
      {/* 1. Hero: the "Keep the promise" film. On a desktop its poster is the band's background, the words
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
              <GradientButton href="#machine" className="bh-promise-btn">
                {t("home.hero.2")}
              </GradientButton>
              <ArrowLink href="/for">{t("home.hero.3")}</ArrowLink>
            </div>
          </div>
        </div>
      </Band>

      {/* 2. Numbers strip */}
      <Band tone="ink" pad="sm" labelledBy="numbers">
        <EyebrowRow id="numbers" className="bh-readout-title">
          {t("home.numbers.1")}
        </EyebrowRow>
        <ol className="bh-readout">
          {NUMBERS.map((n, i) => (
            <li key={n.k}>
              <Link href={n.href}>
                <span className="bh-readout-n">{String(i + 1).padStart(2, "0")}</span>
                <span className="bh-readout-k">{n.k}</span>
                <span className="bh-readout-v">{i === 0 ? t("home.numbers.2") : n.v}</span>
              </Link>
            </li>
          ))}
        </ol>
      </Band>

      {/* 3. The machine */}
      <Machine36 />

      {/* 4. The account, then the limits */}
      <Band tone="light" id="account" labelledBy="account-title">
        <SectionHead eyebrow={t("home.account.1")} title={t("home.account.2")} titleId="account-title" />
        <Quote
          className="bh-account-quote"
          maxWidth={900}
          text={HOME_ACCOUNT_QUOTE.text}
          source={<QuoteSource youtube={HOME_ACCOUNT_QUOTE.youtube} start={HOME_ACCOUNT_QUOTE.start}>{HOME_ACCOUNT_QUOTE.when}</QuoteSource>}
        />
        <StepList>
          {HOME_ACCOUNT_STEPS.map((s) => (
            <Step key={s.n} id={s.id} n={s.n} href={s.href} bigText={s.bigText} image={s.image} title={s.title} text={s.text} />
          ))}
        </StepList>
        <div className="bh-two">
          <div>
            <EyebrowRow>{t("home.limits.1")}</EyebrowRow>
            <h2 className="bx-h2">{HOME_LIMITS_TITLE}</h2>
          </div>
          <Limits />
        </div>
      </Band>

      {/* 5. The CRM line */}
      <CrmBand />

      {/* 6. Six faces */}
      <Band tone="dark" glow id="six" labelledBy="six-title">
        <SectionHead
          eyebrow={HOME_SIX.eyebrow}
          title={HOME_SIX.title}
          titleId="six-title"
          action={<ArrowLink href="/for">{HOME_SIX.action}</ArrowLink>}
        />
        <ul className="bh-faces">
          {stakeholders.pages.map((p) => (
            <li key={p.slug}>
              <Link href={`/for/${p.slug}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/people/${p.slug}-400.webp`} alt="" width={400} height={500} loading="lazy" decoding="async" />
                <span>{p.name}</span>
                <small>{roleOf(p.title)}</small>
              </Link>
            </li>
          ))}
        </ul>
        <Quote
          className="bx-mt-4"
          maxWidth={860}
          text={HOME_SIX.quote.text}
          source={<QuoteSource youtube={HOME_SIX.quote.youtube} start={HOME_SIX.quote.start}>{HOME_SIX.quote.when}</QuoteSource>}
        />
      </Band>

      {/* 7. The argument */}
      <Band tone="lilac" labelledBy="argument">
        <SectionHead
          eyebrow={t("home.argument.1")}
          title={HOME_ARGUMENT.title}
          titleId="argument"
          lead={HOME_ARGUMENT.lead}
          action={pipelineArticle ? <ArrowLink href={pipelineArticle}>{HOME_ARGUMENT.articleLink}</ArrowLink> : undefined}
        />
        <ol className="bh-chain">
          {HOME_ARGUMENT.chain.map((line, i) => (
            <li key={line}>
              <span className="bh-chain-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <blockquote>
                <p>{line}</p>
              </blockquote>
              {i === 0 && (
                <VideoFrame
                  size="sm"
                  youtube={HOME_ARGUMENT.chainVideo.youtube}
                  start={HOME_ARGUMENT.chainVideo.start}
                  end={HOME_ARGUMENT.chainVideo.end}
                  label={HOME_ARGUMENT.chainVideo.label}
                  meta={HOME_ARGUMENT.chainVideo.meta}
                  length={HOME_ARGUMENT.chainVideo.length}
                  still={HOME_ARGUMENT.chainVideo.still}
                  mode="dialog"
                />
              )}
            </li>
          ))}
        </ol>
        <Quote
          className="bx-mt-4"
          xl
          mark
          maxWidth={980}
          text={HOME_ARGUMENT.quote.text}
          source={<QuoteSource youtube={HOME_ARGUMENT.quote.youtube} start={HOME_ARGUMENT.quote.start}>{HOME_ARGUMENT.quote.when}</QuoteSource>}
        />
      </Band>

      {/* 8. Moments that became skills */}
      <Band tone="ink" id="skills" labelledBy="skills-title">
        <SectionHead
          eyebrow={t("home.skills.1")}
          title={HOME_SKILLS_TITLE}
          titleId="skills-title"
          lead={t("home.skills.2")}
          action={<ArrowLink href="/skills">{t("home.skills.3")}</ArrowLink>}
        />
        <MomentGrid>
          {MOMENTS.map((m) => (
            <MomentCard key={m.skill} {...m} />
          ))}
        </MomentGrid>
      </Band>

      {/* 9. Recommended for you */}
      {RECOMMEND_ON && <RecommendCarousel heading="Recommended for you" cards={recommendFor("default")} people={PAGE_SLUGS} />}

      {/* 10. About me */}
      <Band tone="dark" labelledBy="who">
        <div className="bh-about">
          <figure className="bh-about-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/about/alex-headshot-800.webp" alt="Alex Alderman" width={800} height={1000} loading="lazy" decoding="async" />
          </figure>
          <div>
            <EyebrowRow>{HOME_ABOUT.eyebrow}</EyebrowRow>
            <h2 id="who" className="bx-h2">
              {HOME_ABOUT.title}
            </h2>
            <div className="bh-about-copy">
              {HOME_ABOUT.paragraphs.map((p) => (
                <p key={p}>{withBold(p)}</p>
              ))}
            </div>
            <div className="bh-actions">
              <GradientButton href="/about">{t("shared.about.1")}</GradientButton>
            </div>
          </div>
        </div>
      </Band>
    </main>
  );
}
