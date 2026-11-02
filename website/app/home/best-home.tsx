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

const NUMBERS: { href: string; k: string; v: string }[] = [
  { href: "#icps", k: "4 × 3 × 3", v: "" }, // v: home.numbers.2
  { href: "#account", k: "279 results · $1.24", v: "6 Apify scrapers, in about 17 minutes" },
  { href: "#account", k: "57 people · $0.003", v: "107 model calls" },
  { href: "#routing", k: "12 leads", v: "4 placed by rules alone" },
  { href: "#machine", k: "36 workflows · 1 variable", v: "Nothing here sends." },
  { href: "#six", k: "6 pages", v: "A personal landing page for each decision-maker" },
];

const MOMENTS: { skill: string; time: string; quote: string; name: string }[] = [
  { skill: "spec-driven-agent-team", time: "11:36 · S03", quote: "\"they shoot all of his scenes first even if it's not in chronological order of the movie\"", name: "Charter and executable specs: running a team of AI sessions" },
  { skill: "operator-attention-controls", time: "13:44 · S07", quote: "\"Please go ahead and codify that as a skill so that if I need to use it again, it's an instant fix.\"", name: "Operator controls: answer desk, roster, context watch and recovery" },
  { skill: "onepassword-batch", time: "14:12 · S07", quote: "\"do not move any secret keys if the rig is recording an obs session require it to stop first and alert operator\"", name: "One-approval secret handling for scraping and AI keys" },
  { skill: "account-scrape-apify", time: "15:13 · S08", quote: "\"so i checked to see that no nothing leaked or anything like that and now i can kind of chill and let that run\"", name: "Account research scraper on Apify, with no logins" },
  { skill: "account-people-classifier", time: "15:40 · S09", quote: "\"set up a JEV classification that determines whether they are someone sending cold outreach, right?\"", name: "Account mapping: classifying every employee and post at a target company" },
  { skill: "outbound-workflow-factory", time: "16:36 · S10", quote: "\"So there are four main ICPs, three different languages, let's say English, Czech, German, and so that's 12.\"", name: "Outbound workflow factory: 36 GetSales sequences from one copy file per ICP" },
];

export function BestHome() {
  // data-needs="art-pipeline-promise": the link shows once the article has a page.
  const pipelineArticle = pageHref("art-pipeline-promise");
  return (
    <main>
      {/* 1. Hero */}
      <Band tone="dark" glow pad="sm" labelledBy="home-title" className="bh-hero" bare>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="bh-hero-circle" src="/addvery/hero-circle.webp" alt="" width={472} height={460} aria-hidden="true" />
        <div className="bx-wrap bh-hero-grid">
          <div>
            <EyebrowRow>{t("home.hero.1")}</EyebrowRow>
            <h1 id="home-title" className="bx-h1">
              If AI won&rsquo;t replace half your team, put it in your pipeline
            </h1>
            <p className="bx-lead bh-hero-lead">
              <strong>GTM engineers who focus AI on the pipeline are the ones helping companies keep their promise:</strong> that AI is a way to do more
              business and grow the whole team together, not to replace half of it.
            </p>
            <div className="bh-byline">
              <span className="bh-byline-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/about/alex-headshot-480.webp" alt="" width={48} height={48} />
              </span>
              <p>
                <span className="bh-byline-name">Alex Alderman</span>
                <span className="bh-byline-role">Applying to Addvery as a GTM engineer</span>
              </p>
            </div>
            <div className="bh-actions">
              <GradientButton href="#machine">{t("home.hero.2")}</GradientButton>
              <ArrowLink href="/for">{t("home.hero.3")}</ArrowLink>
            </div>
          </div>
          <VideoFrame
            size="hero"
            youtube="XVqOE_-COOQ"
            label="GTM engineers are the solution to the biggest social question of the AI era"
            caption={'"gtm engineers are the solution to the biggest social question of the ai era"'}
            meta="S10, 16:33"
            length="0:59"
            poster="https://i.ytimg.com/vi/XVqOE_-COOQ/maxresdefault.jpg"
          />
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
          text={'"if you\'re like on month four and I have your 90-day goals from your job advert that\'s like gold for crafting like custom messaging"'}
          source={<QuoteSource youtube="MyYnFOQCagc" start={145}>S08, 15:09</QuoteSource>}
        />
        <StepList>
          <Step
            id="icps"
            n="01"
            href="/skills#icp-grid-from-client-site"
            bigText="4 ICPs"
            title="ICP grid built from the client's own website"
            text="The four ICPs come from Addvery's own website: retail loyalty, telco customer value, consumer lending and last-mile logistics."
          />
          <Step
            n="02"
            href="/d1"
            image={{ src: "/d1/01-overview-1280.webp", alt: "Research board: Addvery as scraped from public sources" }}
            title="Account research scraper on Apify, with no logins"
            text="6 Apify scrapers, $1.24, 279 results in about 17 minutes."
          />
          <Step
            n="03"
            href="/d2"
            image={{ src: "/d1/03-linkedin-activity-1280.webp", alt: "LinkedIn activity board: who posted in the last 90 days by function, counts only" }}
            title="Account mapping: classifying every employee"
            text="At 16:04 it ran on all 57 people who list Addvery on LinkedIn: public profiles and posts, no login. Counts only, no names."
          />
        </StepList>
        <div className="bh-two">
          <div>
            <EyebrowRow>{t("home.limits.1")}</EyebrowRow>
            <h2 className="bx-h2">It was built to be legible more than functional</h2>
          </div>
          <Limits />
        </div>
      </Band>

      {/* 5. The CRM line */}
      <CrmBand />

      {/* 6. Six faces */}
      <Band tone="dark" glow id="six" labelledBy="six-title">
        <SectionHead
          eyebrow="For Addvery"
          title="A personal landing page for each decision-maker"
          titleId="six-title"
          action={<ArrowLink href="/for">All six pages</ArrowLink>}
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
          text={'"as part of my research into your company i try to identify who the stakeholders are and like what your main objections are"'}
          source={<QuoteSource youtube="lo486cSVBcM" start={958}>S12, 17:50</QuoteSource>}
        />
      </Band>

      {/* 7. The argument */}
      <Band tone="lilac" labelledBy="argument">
        <SectionHead
          eyebrow={t("home.argument.1")}
          title="Put AI in your pipeline first"
          titleId="argument"
          lead="For the people who really want to save their team, and really want to do AI the ethical way (whatever that means), the order matters."
          action={pipelineArticle ? <ArrowLink href={pipelineArticle}>If AI won&rsquo;t replace half your team, put it in your pipeline</ArrowLink> : undefined}
        />
        <ol className="bh-chain">
          <li>
            <span className="bh-chain-n" aria-hidden="true">01</span>
            <blockquote>
              <p>&quot;We want to bring an AI in, but we&apos;re not going to fire half the team.&quot;</p>
            </blockquote>
            <VideoFrame
              size="sm"
              youtube="qrBNOsSYGrQ"
              start={415}
              end={501}
              label="We want to bring an AI in, but we're not going to fire half the team (S02, 11:13)"
              meta="S02, 11:13"
              length="1:26"
              still="/videos/S02-f.webp"
              mode="dialog"
            />
          </li>
          <li>
            <span className="bh-chain-n" aria-hidden="true">02</span>
            <blockquote>
              <p>&quot;If it&apos;s not lowering their labor costs, then it has to be increasing their revenue.&quot;</p>
            </blockquote>
          </li>
          <li>
            <span className="bh-chain-n" aria-hidden="true">03</span>
            <blockquote>
              <p>&quot;The first place you need to put AI is in your pipeline, so that you can upskill your people to get more done and at the same time bring in more work.&quot;</p>
            </blockquote>
          </li>
        </ol>
        <Quote
          className="bx-mt-4"
          xl
          mark
          maxWidth={980}
          text="The only way to get the leverage of AI and not need to drop half your team is if you're also leveraging the amount of new work you're getting."
          source={<QuoteSource youtube="lo486cSVBcM" start={1657}>S12, 18:01</QuoteSource>}
        />
      </Band>

      {/* 8. Moments that became skills */}
      <Band tone="ink" id="skills" labelledBy="skills-title">
        <SectionHead
          eyebrow={t("home.skills.1")}
          title={'"it took me 12 hours today but here\'s all of the skills that we built that are reusable."'}
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
            <EyebrowRow>About me</EyebrowRow>
            <h2 id="who" className="bx-h2">
              I&rsquo;m a marketer turned GTM engineer, and I think AI should grow your team, not shrink it.
            </h2>
            <div className="bh-about-copy">
              <p>
                I spent 10 years freelancing in B2B marketing, the standard path into GTM engineering. Then I took an <strong>AI sabbatical</strong>: nine
                months of doing nothing but building in Claude Code.
              </p>
              <p>Now I want to apply what I&rsquo;ve learned in theory and actually get the satisfaction of making numbers go up.</p>
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
