import Link from "next/link";
import type { ReactNode } from "react";
import { t } from "../../copy";
import { entryUrl, findEntry } from "../../demos/entries";
import { SKILLS_PAGE } from "../../flags";
import { pageHref } from "../../recommend";
import { forHref } from "./for-href";
import {
  ArrowLink,
  Band,
  Chip,
  ChipList,
  CrmBand,
  EyebrowRow,
  Figure,
  Limits,
  Message,
  MessageRow,
  Quote,
  SectionHead,
  Step,
  StepList,
  watchUrl,
} from "../../best/parts";
import { C1_SLUG, C2_SLUG, MachineFigures, MachineLinks, MachineStats, WalkthroughFrame } from "../../best/machine";
import { ClipFrame, QuoteCollection, clipFor, lensQuotes } from "./quotes";
import "./lens.css";

// The P3 "lens" blocks of /for/<slug> (BUILD.md 5 and 6) and the small blocks that trail P4. Each page's
// block is Alex's reading of what that person decides on, built from the shared parts (app/best). Words
// that are new carry a key (app/copy.ts t()); the rest are Alex's own or existing site copy, verbatim.

/** A /skills link, or nothing while /skills isn't in this build. */
function skillHref(id: string): string | undefined {
  return SKILLS_PAGE ? `/skills#${id}` : undefined;
}

export type Chipped = { skill: string; label: string };

/** Skill chips: shown only once /skills exists in the build. */
export function Chips({ items }: { items: Chipped[] }) {
  if (!SKILLS_PAGE || items.length === 0) return null;
  return (
    <ChipList>
      {items.map((c) => (
        <Chip key={c.skill} skill={c.skill}>
          {c.label}
        </Chip>
      ))}
    </ChipList>
  );
}

const CHIP = {
  leak: { skill: "publish-leak-scan", label: "Pre-publish leak checks" },
  onepw: { skill: "onepassword-batch", label: "One-approval secret handling for scraping and AI keys" },
  team: { skill: "spec-driven-agent-team", label: "Charter and executable specs: running a team of AI sessions" },
  attention: { skill: "operator-attention-controls", label: "Operator controls: answer desk, roster, context watch and recovery" },
  rig: { skill: "capture-rig", label: "Recording rig: every session filmed, transcribed and searchable" },
  apify: { skill: "account-scrape-apify", label: "Account research scraper on Apify, with no logins" },
  people: { skill: "account-people-classifier", label: "Account mapping: classifying every employee and post at a target company" },
  brand: { skill: "brand-clone-tokens", label: "Brand clone: a company's live site turned into design tokens" },
  article: { skill: "transcript-to-article", label: "Transcript-to-article kit" },
} satisfies Record<string, Chipped>;

/** The chips under each page's P4 list. `label` is a small caps line over them, where the mockup has one. */
export const P4_CHIPS: Record<string, { label?: string; items: Chipped[] }> = {
  ceo: { items: [CHIP.leak, CHIP.onepw, CHIP.team] },
  delivery: { label: "Skills behind this", items: [CHIP.team, CHIP.attention, CHIP.onepw, CHIP.rig] },
  bi: { label: "Skills behind this", items: [CHIP.leak, CHIP.onepw, CHIP.apify, CHIP.people] },
};

const FACES = ["growth", "ceo", "cofounder-1", "cofounder-2", "delivery", "bi"];

/** The step card for the six pages: six portraits in place of a cover (decorative; the step's title names it). */
function FacesStep({ n, title, text, href }: { n?: string; title: ReactNode; text: ReactNode; href: string }) {
  return (
    <li>
      <Link href={href} className="bx-step">
        <span className="bx-step-img pl-faces">
          {FACES.map((f) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={f} src={`/people/${f}-400.webp`} alt="" width={400} height={500} loading="lazy" decoding="async" />
          ))}
        </span>
        <span className="bx-step-body">
          {n && <span className="bx-step-n">{n}</span>}
          <span className="bx-step-title">{title}</span>
          <span className="bx-step-text">{text}</span>
        </span>
      </Link>
    </li>
  );
}

const C2_ASSETS = `/demos-assets/${C2_SLUG}`;
const C1_ASSETS = `/demos-assets/${C1_SLUG}`;

// ---------------------------------------------------------------- growth

function GrowthLens() {
  return (
    <Band tone="ink" labelledBy="pl-walk">
      <SectionHead
        title="36 outbound workflows and the one variable behind them"
        titleId="pl-walk"
        lead="Four ICPs, three languages, three tactics, and one personal first message per lead."
      />
      <div className="pl-walk">
        <WalkthroughFrame />
      </div>
      <div className="bx-mt-3">
        <MachineStats />
      </div>
      <MessageRow>
        <Message label="custom_message_1 · Tailspin Parcel CZ (fictional) · Last-mile logistics · CS · problem" lang="cs">
          Dobrý den, firma Tailspin Parcel CZ doručuje většinu zásilek až ke dveřím a doručení domů funguje, jen když je někdo doma. Opakované pokusy o doručení pak ukrajují z marže každé trasy. Řešíte teď úspěšnost prvního doručení, nebo to máte pod kontrolou?
        </Message>
        <Message label="custom_message_1 · Coho Last Mile (fictional) · Last-mile logistics · EN · signal">
          Hi Dana, Coho Last Mile announced its move into Hungary in October. In a new market you start with no network, systems or brand, and what gets decided in the first months shapes the cost per parcel for years. How far along is the last-mile plan there?
        </Message>
      </MessageRow>
      <MachineFigures />
      <MachineLinks />
    </Band>
  );
}

// ---------------------------------------------------------------- ceo

function CeoLens({ slug }: { slug: string }) {
  const gtm = clipFor("S10-c");
  const c1 = findEntry(C1_SLUG);
  const c2 = findEntry(C2_SLUG);
  const steps: { title: string; text: string; href: string; image: { src: string; alt: string } }[] = [];
  if (c2) {
    steps.push({
      title: "36 outbound workflows and the one variable behind them",
      text: "Four ICPs, three languages, three tactics, and one personal first message per lead.",
      href: forHref(entryUrl(C2_SLUG), slug),
      image: { src: `${C2_ASSETS}/workflows-folder.png`, alt: "Six of the 36 workflows in the GetSales demo folder, each switched off" },
    });
  }
  if (c1) {
    steps.push({
      title: "Sorting twelve leads into 36 workflows: rules first, then Jev",
      text: "Every lead lands in exactly one workflow, and every decision shows what settled it.",
      href: forHref(entryUrl(C1_SLUG), slug),
      image: { src: `${C1_ASSETS}/router-run-1.png`, alt: "The lead router sorting twelve fictional leads in a terminal" },
    });
  }
  steps.push({
    title: "$1.24",
    text: "6 Apify scrapers, $1.24, 279 results in about 17 minutes.",
    href: "/d1",
    image: { src: "/d1/01-overview-1280.webp", alt: "Research board: Addvery as scraped from public sources" },
  });
  return (
    <>
      <Band tone="ink" labelledBy="pl-return">
        <EyebrowRow>{t("for-ceo.return.1")}</EyebrowRow>
        <h2 id="pl-return" className="bx-h2">
          Keeping everyone takes the biggest saving off the table
        </h2>
        <div className="pl-two bx-mt-3">
          {gtm && <ClipFrame item={gtm} caption />}
          <QuoteCollection items={lensQuotes("ceo")} />
        </div>
      </Band>
      <CrmBand />
      <Band tone="light" labelledBy="pl-evidence">
        <SectionHead
          eyebrow={t("for-ceo.evidence.1")}
          title="It was built to be legible more than functional"
          titleId="pl-evidence"
          action={<ArrowLink href="/#machine">{t("shared.machine.1")}</ArrowLink>}
        />
        <StepList four>
          {steps.map((s, i) => (
            <Step key={s.href} n={String(i + 1).padStart(2, "0")} title={s.title} text={s.text} href={s.href} image={s.image} />
          ))}
          <FacesStep title="A personal landing page for each decision-maker" text="This page came out of a reusable skill." href="/for" />
        </StepList>
      </Band>
    </>
  );
}

// ---------------------------------------------------------------- cofounder-1

const SLIDER = [
  "External building: bring in or hire someone external",
  "Build: build your own workflows",
  "Maintain: keep the workflows others build running",
  "Training: learn to use what other people build",
];

function Cofounder1Lens({ slug }: { slug: string }) {
  const c1 = findEntry(C1_SLUG);
  const c2 = findEntry(C2_SLUG);
  const managed = clipFor("S10-b");
  const icp = skillHref("icp-grid-from-client-site");
  const steps: { title: string; text: string; href: string; image?: { src: string; alt: string }; bigText?: string }[] = [];
  steps.push({
    title: "ICP grid built from the client's own website",
    text: "The four ICPs come from Addvery's own website: retail loyalty, telco customer value, consumer lending and last-mile logistics.",
    href: icp ?? "/#machine",
    bigText: "4 ICPs",
  });
  steps.push({
    title: "Account research scraper on Apify, with no logins",
    text: "6 Apify scrapers, $1.24, 279 results in about 17 minutes.",
    href: "/d1",
    image: { src: "/d1/01-overview-1280.webp", alt: "Research board: Addvery as scraped from public sources" },
  });
  steps.push({
    title: "Account mapping: classifying every employee",
    text: "107 model calls, $0.003. The next account is a new input file.",
    href: "/d2",
    image: { src: "/d1/02-org-chart-1280.webp", alt: "Research board: Addvery's org chart by function" },
  });
  if (c1) {
    steps.push({
      title: "Lead router: sorting leads into ICPs, rules first",
      text: "Rules sort most leads for free; a decision model answers only what rules can't settle.",
      href: forHref(entryUrl(C1_SLUG), slug),
      image: { src: `${C1_ASSETS}/router-run-1.png`, alt: "The lead router sorting twelve fictional leads in a terminal" },
    });
  }
  if (c2) {
    steps.push({
      title: "36 outbound workflows and the one variable behind them",
      text: "Message 1 of every workflow is one variable, written for each lead before import.",
      href: forHref(entryUrl(C2_SLUG), slug),
      image: { src: `${C2_ASSETS}/workflows-folder.png`, alt: "Six of the 36 workflows in the GetSales demo folder, each switched off" },
    });
  }
  const total = steps.length + 1;
  return (
    <>
      <Band tone="ink" labelledBy="pl-pipeline">
        <SectionHead
          eyebrow={t("for-cofounder-1.pipeline.1")}
          title="Outbound at Addvery's size isn't one campaign"
          titleId="pl-pipeline"
          action={<ArrowLink href="/#machine">{t("shared.machine.1")}</ArrowLink>}
        />
        <StepList>
          {steps.map((s, i) => (
            <Step key={s.title} n={String(i + 1).padStart(2, "0")} title={s.title} text={s.text} href={s.href} image={s.image} bigText={s.bigText} />
          ))}
          <FacesStep n={String(total).padStart(2, "0")} title="A personal landing page for each decision-maker" text="This page came out of a reusable skill." href="/for" />
        </StepList>
      </Band>
      <Band tone="light" labelledBy="pl-slider">
        <div className="pl-two">
          <div>
            <EyebrowRow>{t("for-cofounder-1.slider.1")}</EyebrowRow>
            <h2 id="pl-slider" className="bx-h2">
              &ldquo;every company is going to have to decide what level of AI skill they want their company to have&rdquo;
            </h2>
            {managed && (
              <div className="bx-mt-3">
                <ClipFrame item={managed} caption meta="S10, 16:31" />
              </div>
            )}
          </div>
          <div>
            <p className="bx-eyebrow pl-slider-head">Where a company sits on the slider of AI skill</p>
            <ol className="pl-slider">
              {SLIDER.map((line, i) => (
                <li key={line}>
                  <b>{i + 1}</b>
                  {line}
                </li>
              ))}
            </ol>
            <div className="bx-mt-2">
              <Quote
                text={"\"so you can imagine a sliding scale that's vertical and so on the bottom is the training and on top is the external building\""}
                source={
                  <a href={watchUrl("PQIZoQ-Ic2w")} target="_blank" rel="noopener noreferrer">
                    S10, 16:31<span className="sr-only"> (YouTube, new tab)</span>
                  </a>
                }
              />
            </div>
          </div>
        </div>
      </Band>
    </>
  );
}

// ---------------------------------------------------------------- cofounder-2

// The LinkedIn voice entry's block came off this page on 3 Nov (M5); the S02 clip block stays.

function Cofounder2Lens() {
  const human = clipFor("S02-h");
  return (
    <>
      <Band tone="ink" labelledBy="pl-human">
        <div className="pl-two">
          {human && <ClipFrame item={human} meta="S02, 11:15" />}
          <div>
            <h2 id="pl-human" className="bx-h2">
              &ldquo;That&rsquo;s the niche, right? So good that they think you spent three days building it just for them when an agent was running in the background for a couple hours.&rdquo;
            </h2>
            <p className="bx-lead">{t("for-cofounder-2.look.1")}</p>
            <div className="bx-mt-2">
              <Chips items={[CHIP.brand, CHIP.article]} />
            </div>
          </div>
        </div>
      </Band>
    </>
  );
}

// ---------------------------------------------------------------- bi

type Row = { count: string; how: string; check: ReactNode };

function BiRows() {
  const c1 = findEntry(C1_SLUG);
  const c2 = findEntry(C2_SLUG);
  const rows: Row[] = [
    { count: "279 · $1.24", how: "6 Apify scrapers, $1.24, 279 results in about 17 minutes.", check: <Link href="/d1">/d1</Link> },
    { count: "57", how: "At 16:04 it ran on all 57 people who list Addvery on LinkedIn: public profiles and posts, no login.", check: <Link href="/d2">/d2</Link> },
    { count: "55 of 57", how: "Jev labelled 55 of them. For the other 2 it wasn't sure enough, and job-title rules decided.", check: <Link href="/d2">/d2</Link> },
    { count: "56", how: "One \"employee\" turned out to be an outside English teacher and was taken out (57 became 56).", check: <Link href="/d1">/d1</Link> },
    { count: "107 · $0.003", how: "107 model calls, $0.003. Counts only, no names.", check: <Link href="/d2">/d2</Link> },
    {
      count: "12 → 4 · 7 · 1",
      how: "12 leads, 4 placed by rules alone, 7 that needed a model's answer for at least one decision, 1 no fit.",
      check: c1 ? <Link href={forHref(entryUrl(C1_SLUG), "bi")}>the routing run</Link> : null,
    },
    {
      count: "36 · 0",
      how: "Every toggle off and every count at 0: none of the 36 is running.",
      check: c2 ? <Link href={forHref(entryUrl(C2_SLUG), "bi")}>36 workflows</Link> : null,
    },
  ];
  return (
    <div className="pl-tbl-wrap" tabIndex={0} role="region" aria-label="Every number and where it came from, scrollable">
      <table className="pl-tbl">
        <caption className="sr-only">{t("for-bi.rows.2")}</caption>
        <thead>
          <tr>
            <th scope="col">{t("for-bi.rows.3")}</th>
            <th scope="col">{t("for-bi.rows.4")}</th>
            <th scope="col">{t("for-bi.rows.5")}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.count}>
              <td className="pl-num">{r.count}</td>
              <td>{r.how}</td>
              <td>{r.check}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BiLens() {
  const rule = clipFor("S09-i");
  return (
    <>
      <Band tone="light" labelledBy="pl-rows" className="pl-join">
        <EyebrowRow>{t("for-bi.rows.1")}</EyebrowRow>
        <h2 id="pl-rows" className="bx-h2 pl-rows-h">
          {t("for-bi.rows.2")}
        </h2>
        <BiRows />
      </Band>
      <Band tone="ink" labelledBy="pl-rule">
        <EyebrowRow>{t("for-bi.rule.1")}</EyebrowRow>
        <h2 id="pl-rule" className="bx-h2">
          Rules first, then a decision model
        </h2>
        <ol className="bx-flow bx-mt-3" aria-label="How one lead finds its workflow">
          <li>
            <b>Rules</b>industry, headcount, country and profile language settle most leads
          </li>
          <li>
            <b>Jev</b>one narrow question when a rule can&rsquo;t decide
          </li>
          <li>
            <b>A person</b>decides below 0.75, or when two answers are close
          </li>
          <li>
            <b>One workflow</b>the lead lands in exactly one of the 36
          </li>
        </ol>
        <p className="bx-lead bx-lead-narrow bx-mt-2">
          Jev, from TypeSafe, answers narrow typed questions, such as &ldquo;which of these four ICPs, or none?&rdquo;, with a probability for each answer, and it writes no text. Those decisions become the labels that tune it. Nothing is trained in this demo.
        </p>
        <div className="pl-two bx-mt-3">
          <Figure
            src={`${C1_ASSETS}/router-hard-cases.png`}
            width={1606}
            height={2034}
            alt="Terminal output for L06 and L11, whose industry labels are too broad for a rule: each shows its Jev question and the answer a person labelled"
            caption="Terminal output for the two fictional leads whose industry labels are too broad for a rule. Violet marks a rule, amber a question for Jev."
          />
          {rule && <ClipFrame item={rule} caption />}
        </div>
      </Band>
    </>
  );
}

// ---------------------------------------------------------------- the P3 switch

/** The P3 block for a page. Delivery has none: its P3 and P4 are one collection. */
export function Lens({ slug }: { slug: string }) {
  switch (slug) {
    case "growth":
      return <GrowthLens />;
    case "ceo":
      return <CeoLens slug={slug} />;
    case "cofounder-1":
      return <Cofounder1Lens slug={slug} />;
    case "cofounder-2":
      return <Cofounder2Lens />;
    case "bi":
      return <BiLens />;
    default:
      return null;
  }
}

// ---------------------------------------------------------------- after P4

/** Blocks that trail a page's P4 list: delivery's "What I'd keep", bi's limits. */
export function AfterQuotes({ slug }: { slug: string }) {
  if (slug === "delivery") {
    const day = pageHref("art-day-one");
    return (
      <Band tone="lilac" labelledBy="pl-keep">
        <div className="pl-keep">
          <EyebrowRow>What I&rsquo;d keep</EyebrowRow>
          <h2 id="pl-keep" className="bx-h2">
            This isn&rsquo;t how I&rsquo;d work every day. It&rsquo;s a little, little, little too much.
          </h2>
          <ol className="pl-lifecycle bx-mt-3">
            <li>
              <strong>Write the guiding documents first,</strong> and better than feels necessary. I&rsquo;d give mine a B plus. Maybe a B minus.
            </li>
            <li>
              <strong>Let the agents make the easy calls,</strong> with a written reason for each one.
            </li>
            <li>
              <strong>Keep my sign-off for what needs my judgment,</strong> not for every plan.
            </li>
          </ol>
          {day && (
            <p className="bx-mt-2">
              <ArrowLink href={day}>Day one: what broke, what worked and what I&rsquo;d keep</ArrowLink>
            </p>
          )}
        </div>
      </Band>
    );
  }
  if (slug === "bi") {
    return (
      <Band tone="ink" pad="sm" labelledBy="pl-limits">
        <div className="pl-two">
          <div>
            <EyebrowRow>{t("for-bi.limits.1")}</EyebrowRow>
            <h2 id="pl-limits" className="bx-h2">
              It was built to be legible more than functional
            </h2>
          </div>
          <Limits />
        </div>
      </Band>
    );
  }
  return null;
}
