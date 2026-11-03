import Link from "next/link";
import type { ReactNode } from "react";
import { t } from "../../copy";
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
import { MachineFigures, MachineLinks, MachineStats, WalkthroughFrame } from "../../best/machine";
import { ClipFrame, QuoteCollection, clipFor, lensQuotes } from "./quotes";
import { MESSAGES } from "../../best/machine-words";
import { COFOUNDER2_CHIPS, P4_CHIPS, type Chipped } from "./lens-words";
export { P4_CHIPS };
import {
  BI_LENS,
  CEO_LENS,
  COFOUNDER1_LENS,
  COFOUNDER2_LENS,
  DELIVERY_KEEP,
  FACES_STEP,
  GROWTH_LENS,
  biRows,
  ceoSteps,
  cofounder1Steps,
  type LensStep,
} from "./lens-words";
import "./lens.css";

// The P3 "lens" blocks of /for/<slug> (BUILD.md 5 and 6) and the small blocks that trail P4. Each page's
// block is Alex's reading of what that person decides on, built from the shared parts (app/best). Words
// that are new carry a key (app/copy.ts t()); the rest are Alex's own or existing site copy, verbatim.

/** A /skills link, or nothing while /skills isn't in this build. */
function skillHref(id: string): string | undefined {
  return SKILLS_PAGE ? `/skills#${id}` : undefined;
}

export type { Chipped };

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


// ---------------------------------------------------------------- growth

function GrowthLens() {
  return (
    <Band tone="ink" labelledBy="pl-walk">
      <SectionHead title={GROWTH_LENS.title} titleId="pl-walk" lead={GROWTH_LENS.lead} />
      <div className="pl-walk">
        <WalkthroughFrame />
      </div>
      <div className="bx-mt-3">
        <MachineStats />
      </div>
      <MessageRow>
        {[MESSAGES.tailspin, MESSAGES.coho].map((msg) => (
          <Message key={msg.label} label={msg.label} lang={msg.lang}>
            {msg.text}
          </Message>
        ))}
      </MessageRow>
      <MachineFigures />
      <MachineLinks />
    </Band>
  );
}

// ---------------------------------------------------------------- ceo

/** A step's link: an article keeps the visitor's page in ?for=. */
const stepHref = (s: LensStep, slug: string) => (s.entry ? forHref(s.href, slug) : s.href);

function CeoLens({ slug }: { slug: string }) {
  const gtm = clipFor("S10-c");
  const steps = ceoSteps();
  return (
    <>
      <Band tone="ink" labelledBy="pl-return">
        <EyebrowRow>{t("for-ceo.return.1")}</EyebrowRow>
        <h2 id="pl-return" className="bx-h2">
          {CEO_LENS.returnTitle}
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
          title={CEO_LENS.evidenceTitle}
          titleId="pl-evidence"
          action={<ArrowLink href="/#machine">{t("shared.machine.1")}</ArrowLink>}
        />
        <StepList four>
          {steps.map((s, i) => (
            <Step key={s.href} n={String(i + 1).padStart(2, "0")} title={s.title} text={s.text} href={stepHref(s, slug)} image={s.image} />
          ))}
          <FacesStep title={FACES_STEP.title} text={FACES_STEP.text} href={FACES_STEP.href} />
        </StepList>
      </Band>
    </>
  );
}

// ---------------------------------------------------------------- cofounder-1

function Cofounder1Lens({ slug }: { slug: string }) {
  const managed = clipFor("S10-b");
  const steps = cofounder1Steps();
  const total = steps.length + 1;
  const L = COFOUNDER1_LENS;
  return (
    <>
      <Band tone="ink" labelledBy="pl-pipeline">
        <SectionHead
          eyebrow={t("for-cofounder-1.pipeline.1")}
          title={L.pipelineTitle}
          titleId="pl-pipeline"
          action={<ArrowLink href="/#machine">{t("shared.machine.1")}</ArrowLink>}
        />
        <StepList>
          {steps.map((s, i) => (
            <Step key={s.title} n={String(i + 1).padStart(2, "0")} title={s.title} text={s.text} href={stepHref(s, slug)} image={s.image} bigText={s.bigText} />
          ))}
          <FacesStep n={String(total).padStart(2, "0")} title={FACES_STEP.title} text={FACES_STEP.text} href={FACES_STEP.href} />
        </StepList>
      </Band>
      <Band tone="light" labelledBy="pl-slider">
        <div className="pl-two">
          <div>
            <EyebrowRow>{t("for-cofounder-1.slider.1")}</EyebrowRow>
            <h2 id="pl-slider" className="bx-h2">
              {L.sliderTitle}
            </h2>
            {managed && (
              <div className="bx-mt-3">
                <ClipFrame item={managed} caption meta={L.managedMeta} />
              </div>
            )}
          </div>
          <div>
            <p className="bx-eyebrow pl-slider-head">{L.sliderHead}</p>
            <ol className="pl-slider">
              {L.slider.map((line, i) => (
                <li key={line}>
                  <b>{i + 1}</b>
                  {line}
                </li>
              ))}
            </ol>
            <div className="bx-mt-2">
              <Quote
                text={L.sliderQuote.text}
                source={
                  <a href={watchUrl(L.sliderQuote.youtube)} target="_blank" rel="noopener noreferrer">
                    {L.sliderQuote.when}
                    <span className="sr-only"> (YouTube, new tab)</span>
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
          {human && <ClipFrame item={human} meta={COFOUNDER2_LENS.clipMeta} />}
          <div>
            <h2 id="pl-human" className="bx-h2">
              {COFOUNDER2_LENS.title}
            </h2>
            <p className="bx-lead">{t("for-cofounder-2.look.1")}</p>
            <div className="bx-mt-2">
              <Chips items={COFOUNDER2_CHIPS} />
            </div>
          </div>
        </div>
      </Band>
    </>
  );
}

// ---------------------------------------------------------------- bi

function BiRows() {
  const rows = biRows();
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
              <td>{r.check ? <Link href={r.check.entry ? forHref(r.check.href, "bi") : r.check.href}>{r.check.label}</Link> : null}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BiLens() {
  const rule = clipFor("S09-i");
  const f = BI_LENS.figure;
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
          {BI_LENS.ruleTitle}
        </h2>
        <ol className="bx-flow bx-mt-3" aria-label="How one lead finds its workflow">
          {BI_LENS.flow.map((x) => (
            <li key={x.what}>
              <b>{x.what}</b>
              {x.text}
            </li>
          ))}
        </ol>
        <p className="bx-lead bx-lead-narrow bx-mt-2">{BI_LENS.jev}</p>
        <div className="pl-two bx-mt-3">
          <Figure src={f.src} width={f.width} height={f.height} alt={f.alt} caption={f.caption} />
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
    const K = DELIVERY_KEEP;
    return (
      <Band tone="lilac" labelledBy="pl-keep">
        <div className="pl-keep">
          <EyebrowRow>{K.eyebrow}</EyebrowRow>
          <h2 id="pl-keep" className="bx-h2">
            {K.title}
          </h2>
          <ol className="pl-lifecycle bx-mt-3">
            {K.items.map((it) => (
              <li key={it.lead}>
                <strong>{it.lead}</strong>
                {it.rest}
              </li>
            ))}
          </ol>
          {day && (
            <p className="bx-mt-2">
              <ArrowLink href={day}>{K.dayLink}</ArrowLink>
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
              {BI_LENS.limitsTitle}
            </h2>
          </div>
          <Limits />
        </div>
      </Band>
    );
  }
  return null;
}
