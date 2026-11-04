import Link from "next/link";
import type { ReactNode } from "react";
import { t } from "../copy";
import { watchUrl } from "./yt";
import "./best.css";

/*
 * The best-of build's shared parts (orchestration\local\mockups\best, BUILD.md). Used by the home page,
 * /for/<slug>, the C2 entry, /skills and /about. All are server components except VideoFrame, which is
 * a client component re-exported here. Every class is prefixed "bx-" so nothing collides with the older
 * pages. A part takes its colours from the Band it sits in (tone), so the same part works on any band.
 */

export { VideoFrame, type VideoFrameProps } from "./video-frame";
export { watchUrl };
export { CRM_LINE, limitsDefault } from "./words";
import { CRM_LINE, limitsDefault } from "./words";

// ---------------------------------------------------------------- bands and headings

export type BandTone = "ink" | "dark" | "light" | "lilac" | "amethyst";

export type BandProps = {
  /** ink = #151515, dark = black (with `glow`), light = white, lilac = pale lilac, amethyst = purple. */
  tone: BandTone;
  /** Anchor id for the section, e.g. "machine". */
  id?: string;
  /** Id of the heading inside that names the section (aria-labelledby). */
  labelledBy?: string;
  /** Used instead of labelledBy when the section has no visible heading. */
  label?: string;
  /** Vertical padding: "md" (default, 110 px) or "sm" (72 px). */
  pad?: "md" | "sm";
  /** The purple glow behind the top of a dark band. */
  glow?: boolean;
  /** Skip the centred 1230 px column, for a band that lays out its own width. */
  bare?: boolean;
  className?: string;
  children: ReactNode;
};

/** A full-width coloured band with its content in the site's centred column. */
export function Band({ tone, id, labelledBy, label, pad = "md", glow, bare, className, children }: BandProps) {
  const dark = tone === "ink" || tone === "dark" || tone === "amethyst";
  const cls = ["bx-band", `bx-${tone}`, dark ? "on-dark" : "on-light", pad === "sm" ? "bx-pad-sm" : "bx-pad", glow && "bx-glow", className]
    .filter(Boolean)
    .join(" ");
  return (
    <section id={id} className={cls} aria-labelledby={labelledBy} aria-label={labelledBy ? undefined : label}>
      {bare ? children : <div className="bx-wrap">{children}</div>}
    </section>
  );
}

/** The small caps line with the short rule before it. `id` goes on the paragraph (for aria-labelledby). */
export function EyebrowRow({ children, id, className }: { children: ReactNode; id?: string; className?: string }) {
  return (
    <div className={["bx-eyebrow-row", className].filter(Boolean).join(" ")}>
      <span className="bx-eyebrow-line" aria-hidden="true" />
      <p className="bx-eyebrow" id={id}>
        {children}
      </p>
    </div>
  );
}

export type SectionHeadProps = {
  /** Eyebrow text; omit for none. */
  eyebrow?: ReactNode;
  /** The heading text. */
  title: ReactNode;
  /** Id of the heading, for the Band's labelledBy. */
  titleId?: string;
  /** Heading level, default 2. Never skip a level on the page. */
  level?: 2 | 3;
  /** The sentence under the heading. */
  lead?: ReactNode;
  /** A right-hand link or button (usually an ArrowLink). */
  action?: ReactNode;
};

/** Eyebrow, heading, lead, and an optional action on the right (stacks under on a phone). */
export function SectionHead({ eyebrow, title, titleId, level = 2, lead, action }: SectionHeadProps) {
  const H = `h${level}` as "h2" | "h3";
  return (
    <div className="bx-head">
      <div>
        {eyebrow && <EyebrowRow>{eyebrow}</EyebrowRow>}
        <H id={titleId} className={level === 2 ? "bx-h2" : "bx-h3"}>
          {title}
        </H>
        {lead && <p className="bx-lead">{lead}</p>}
      </div>
      {action}
    </div>
  );
}

export function ArrowIcon() {
  return (
    <svg className="bx-arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M6 6v2h8.59L5 17.59L6.41 19L16 9.41V18h2V6z" />
    </svg>
  );
}

/** The uppercase text link with the north-east arrow. Internal paths use next/link; "#x" anchors work too. */
export function ArrowLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={["bx-link", className].filter(Boolean).join(" ")}>
      {children}
      <ArrowIcon />
    </Link>
  );
}

/** A row of ArrowLinks under a block. */
export function LinkRow({ children }: { children: ReactNode }) {
  return <p className="bx-link-row">{children}</p>;
}

// ---------------------------------------------------------------- quotes

export type QuoteProps = {
  /** The quoted words, verbatim (include the quotation marks if the mockup has them). */
  text: ReactNode;
  /** The line under it: a source link (see `QuoteSource`) or plain text such as t("shared.crm.1"). */
  source?: ReactNode;
  /** Larger type, for the pull quotes. */
  xl?: boolean;
  /** The big opening mark in the margin. */
  mark?: boolean;
  /** Cap the width, e.g. 900. */
  maxWidth?: number;
  className?: string;
};

/** A quote block: the words large, a rule and the source under. */
export function Quote({ text, source, xl, mark, maxWidth, className }: QuoteProps) {
  const cls = ["bx-q", xl && "bx-q-xl", mark && "bx-q-mark", className].filter(Boolean).join(" ");
  return (
    <figure className={cls} style={maxWidth ? { maxWidth } : undefined}>
      <blockquote>
        <p>{text}</p>
      </blockquote>
      {source && <figcaption>{source}</figcaption>}
    </figure>
  );
}

/** "S08, 15:09" linking to the moment on YouTube (opens in a new tab). */
export function QuoteSource({ youtube, start, children }: { youtube: string; start?: number; children: ReactNode }) {
  return (
    <a href={watchUrl(youtube, start)} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> (YouTube, new tab)</span>
    </a>
  );
}

// ---------------------------------------------------------------- cards, steps, chips

export type CardProps = {
  /** Where the card goes. */
  href: string;
  /** Small caps line, e.g. "What I think". */
  kicker?: string;
  title: ReactNode;
  /** The one-line description. */
  line?: ReactNode;
  /** Site path or URL of the 16:9 image; omit for a text card. */
  image?: string;
  /** The first card of a row is drawn dark. */
  first?: boolean;
};

/** An article/entry card: image, kicker, title, line. The whole card is the link. */
export function Card({ href, kicker, title, line, image, first }: CardProps) {
  return (
    <Link href={href} className={["bx-card", first && "bx-card-first"].filter(Boolean).join(" ")}>
      {image && (
        <span className="bx-card-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="" width={640} height={360} loading="lazy" decoding="async" />
        </span>
      )}
      <span className="bx-card-body">
        {kicker && <span className="bx-card-kicker">{kicker}</span>}
        <span className="bx-card-title">{title}</span>
        {line && <span className="bx-card-line">{line}</span>}
      </span>
    </Link>
  );
}

/** The ul that lays cards out in a row (4 wide on desktop, then 2, then a scroll strip on a phone). */
export function CardGrid({ children }: { children: ReactNode }) {
  return <ul className="bx-cards">{children}</ul>;
}

/** The ol that holds `Step`s: 3 across (`four` for 4), 2 on a tablet, 1 on a phone. */
export function StepList({ children, four }: { children: ReactNode; four?: boolean }) {
  return <ol className={["bx-steps", four && "bx-steps-four"].filter(Boolean).join(" ")}>{children}</ol>;
}

export type StepProps = {
  /** "01". */
  n: string;
  title: ReactNode;
  text: ReactNode;
  /** The whole step links here. */
  href: string;
  /** Image path (16:9 crop, top-aligned) with its alt text. */
  image?: { src: string; alt: string };
  /** Big gradient text in place of an image, e.g. "4 ICPs". */
  bigText?: string;
  /** Anchor id on the list item (for the numbers strip). */
  id?: string;
};

/** One step card (the mockup's .step), for inside a `StepList`. */
export function Step({ n, title, text, href, image, bigText, id }: StepProps) {
  return (
    <li id={id}>
      <Link href={href} className="bx-step">
        {(image || bigText) && (
          <span className={["bx-step-img", !image && "bx-step-img-text"].filter(Boolean).join(" ")}>
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image.src} alt={image.alt} width={640} height={360} loading="lazy" decoding="async" />
            ) : (
              <span>{bigText}</span>
            )}
          </span>
        )}
        <span className="bx-step-body">
          <span className="bx-step-n">{n}</span>
          <span className="bx-step-title">{title}</span>
          <span className="bx-step-text">{text}</span>
        </span>
      </Link>
    </li>
  );
}

/** The ul that wraps `Chip`s. */
export function ChipList({ children }: { children: ReactNode }) {
  return <ul className="bx-chips">{children}</ul>;
}

/** A skill chip linking to its card on /skills. `skill` is the skill's id (the anchor on /skills). */
export function Chip({ skill, children }: { skill: string; children: ReactNode }) {
  return (
    <li>
      <Link href={`/skills#${skill}`} className="bx-chip">
        {children}
      </Link>
    </li>
  );
}

export type MomentCardProps = {
  /** The /skills anchor the card links to. */
  skill: string;
  /** "11:36 · S03". */
  time: string;
  /** What he said, verbatim, quotation marks included. */
  quote: string;
  /** The skill's name. */
  name: string;
};

/** "Moments that became skills": his line on the left, the skill it started on the bottom. Wrap in `MomentGrid`. */
export function MomentCard({ skill, time, quote, name }: MomentCardProps) {
  return (
    <li>
      <Link href={`/skills#${skill}`} className="bx-moment">
        <span className="bx-moment-time">{time}</span>
        <blockquote>{quote}</blockquote>
        <span className="bx-moment-skill">{name}</span>
      </Link>
    </li>
  );
}

export function MomentGrid({ children }: { children: ReactNode }) {
  return <ul className="bx-moments">{children}</ul>;
}

// ---------------------------------------------------------------- the 36 matrix

/** One highlighted cell: its number (1 to 36), the text shown in it, and its tooltip. */
export type MatrixHit = { cell: number; text: string; title: string };

/** Where four of the fictional leads landed (BUILD.md 3, item 3). Cell numbers run row by row. */
export const MATRIX_HITS: MatrixHit[] = [
  { cell: 12, text: "Litware", title: t("home.proof.matrix_hit_title") },
  { cell: 20, text: "Woodgrove", title: "Woodgrove Úver (Slovak lender, fictional): Slovak leads get Czech" },
  { cell: 29, text: "Tailspin", title: "Tailspin Parcel CZ (fictional)" },
  { cell: 34, text: "Coho", title: "Coho Last Mile (fictional)" },
];

/** The cell drawn with an outline: Demo, Retail loyalty, EN, proof. */
export const MATRIX_SHOWN = 9;

const ICPS = ["Retail loyalty", "Telco CVM", "Consumer lending", "Last-mile logistics"];
const LANGS = ["CS", "DE", "EN"];
const TACTICS = ["signal", "problem", "proof"];

export type MatrixProps = {
  /** The legend text for the gradient cells (t("home.machine.2") on home, t("entry.matrix.1") on the entry). */
  legend: ReactNode;
  /** Legend for the outlined cell. Default: "Retail loyalty, English, proof"; null shows no second legend item (the home, 4 Nov). */
  shownLegend?: ReactNode | null;
  /** Override the highlighted cells. Default: `MATRIX_HITS`. */
  hits?: MatrixHit[];
  /** Override the outlined cell number. Default: 9. */
  shown?: number;
};

/**
 * The 36 workflows as a table: four ICPs by three languages by three tactics, with the hit cells
 * (gradient) and the outlined cell 9, and a legend. Scrolls sideways on a phone, inside its own box.
 */
export function Matrix({ legend, shownLegend = "Retail loyalty, English, proof", hits = MATRIX_HITS, shown = MATRIX_SHOWN }: MatrixProps) {
  return (
    <>
      <div className="bx-matrix-wrap" tabIndex={0} role="region" aria-label="The example's 36 sequences, scrollable">
        <table className="bx-matrix">
          <caption className="sr-only">The example's 36 sequences: four ICPs by three languages by three tactics</caption>
          <thead>
            <tr>
              <th rowSpan={2} scope="col">
                <span className="sr-only">ICP</span>
              </th>
              {LANGS.map((l) => (
                <th key={l} colSpan={3} scope="colgroup">
                  {l}
                </th>
              ))}
            </tr>
            <tr>
              {LANGS.flatMap((l) => TACTICS.map((x) => (
                <th key={l + x} scope="col">
                  {x}
                </th>
              )))}
            </tr>
          </thead>
          <tbody>
            {ICPS.map((icp, r) => (
              <tr key={icp}>
                <th scope="row">{icp}</th>
                {Array.from({ length: 9 }, (_, c) => {
                  const n = r * 9 + c + 1;
                  const hit = hits.find((h) => h.cell === n);
                  const cls = hit ? "bx-hit" : n === shown ? "bx-shown" : undefined;
                  return (
                    <td key={n} className={cls} title={hit?.title}>
                      {hit ? (
                        <>
                          {hit.text}
                          <span className="sr-only"> ({hit.title}, sequence {n})</span>
                        </>
                      ) : (
                        <>
                          {n}
                          {n === shown && <span className="sr-only"> (the highlighted sequence: Retail loyalty, EN, proof)</span>}
                        </>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="bx-matrix-legend">
        <span>
          <i className="bx-key-hit" aria-hidden="true" />
          {legend}
        </span>
        {shownLegend !== null && (
          <span>
            <i className="bx-key-shown" aria-hidden="true" />
            {shownLegend}
          </span>
        )}
      </p>
    </>
  );
}

// ---------------------------------------------------------------- messages, stats, figures, limits

export type MessageProps = {
  /** The grey line over the message, e.g. "custom_message_1 · Coho Last Mile (fictional) · ... · EN · signal". */
  label: string;
  /** The message, verbatim. */
  children: ReactNode;
  /** Language code of the message when it isn't English (lang="cs"). */
  lang?: string;
};

/** One sample first message (the mockup's .msg). Put two in a `MessageRow`. */
export function Message({ label, children, lang }: MessageProps) {
  return (
    <div className="bx-msg">
      <span className="bx-msg-label">{label}</span>
      <p lang={lang}>{children}</p>
    </div>
  );
}

/** Two `Message`s side by side (stacked on a phone). */
export function MessageRow({ children }: { children: ReactNode }) {
  return <div className="bx-msgs">{children}</div>;
}

/** The big number with its sentence. Put several in `StatList`. */
export function Stat({ num, label }: { num: string; label: ReactNode }) {
  return (
    <div>
      <p className="bx-stat-num">{num}</p>
      <p className="bx-stat-label">{label}</p>
    </div>
  );
}

/** A column of stats (a row that wraps below 992 px). */
export function StatList({ children }: { children: ReactNode }) {
  return <div className="bx-stats">{children}</div>;
}

export type FigureProps = {
  /** Root-relative image path under public/. */
  src: string;
  /** Alt text describing the image. */
  alt: string;
  caption: ReactNode;
  /** Intrinsic size, to hold the space while loading. */
  width?: number;
  height?: number;
};

/** An image with a caption. */
export function Figure({ src, alt, caption, width, height }: FigureProps) {
  return (
    <figure className="bx-fig">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

/** Two figures side by side (wide one first); stacked on a phone. */
export function FigureRow({ children }: { children: ReactNode }) {
  return <div className="bx-figs">{children}</div>;
}

/** A list with a gradient dot and a purple rule per line. `items` defaults to the four limits. */
export function Limits({ items = limitsDefault(), columns = 1 }: { items?: ReactNode[]; columns?: 1 | 2 }) {
  return (
    <ul className={["bx-limits", columns === 2 && "bx-limits-2"].filter(Boolean).join(" ")}>
      {items.map((x, i) => (
        <li key={i}>{x}</li>
      ))}
    </ul>
  );
}

// ---------------------------------------------------------------- the CRM band

/** The selling-point band: his CRM line, large, on amethyst, with caption shared.crm.1. Used on home, /for/ceo and /skills. */
export function CrmBand() {
  return (
    <Band tone="amethyst" pad="sm" label="The selling point">
      <Quote text={CRM_LINE} source={t("shared.crm.1")} xl mark maxWidth={1000} />
    </Band>
  );
}
