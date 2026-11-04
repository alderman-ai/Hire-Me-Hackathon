import type { ReactNode } from "react";
import { Band, CrmBand } from "../../best/parts";
import { CopyButton } from "../../agent/copy-button";
import type { LandingConcern } from "../../stakeholders";
import { Concerns } from "./concerns";
import { forText, recalReady } from "./for-copy";
import { Rich } from "./rich";
import "./recal.css";

// A recalibrated personal page (4 Nov: the CEO's, after Alex's interview at Addvery). Its words are one
// file, content/for-copy/<slug>.json, placed exactly as orchestration sent them (alex-voice); its
// "_structure" key is the order below. personal.tsx keeps the shared parts (the portrait, the byline, the
// agent block, P5 to P7) and swaps in:
//   the hero's text   title as the h1 (its Czech half in lang="cs"), "Hi <name>,", the lead with the
//                     quote and its English gloss (RecalTitle, RecalLead)
//   the body          person, join, argument, strategy, how it runs, the quarters, the offer, proof,
//                     concerns, the CRM band (RecalBody)
// Left out on purpose: the CEO lens (the labour framing), the old note, the quote collection, and the
// reading list (it would need a heading the copy doesn't have; the carousel and his AI's route cover it).

export { recalReady };

/** The words for a key; a missing key is a build error, so a typo can't ship an empty block. */
function w(slug: string, key: string): string {
  const v = forText(slug, key);
  if (!v) throw new Error(`content/for-copy/${slug}.json: no words for "${key}"`);
  return v;
}

/** Text with its first `phrase` linked to `href` (the copy names the words to link, not the markup). */
function linked(text: string, phrase: string, href: string): string {
  const i = text.indexOf(phrase);
  if (i < 0) throw new Error(`recal: "${phrase}" isn't in "${text.slice(0, 60)}..."`);
  return `${text.slice(0, i)}[${phrase}](${href})${text.slice(i + phrase.length)}`;
}

/** Paragraphs split on blank lines; a paragraph of "- " lines is a bulleted list. **bold** and links inline. */
function Prose({ text, slug, className }: { text: string; slug: string; className?: string }) {
  const blocks = text.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  return (
    <div className={["rc-prose", className].filter(Boolean).join(" ")}>
      {blocks.map((b, i) => {
        const lines = b.split("\n").map((l) => l.trim());
        if (lines.every((l) => l.startsWith("- "))) {
          return (
            <ul key={i} className="rc-list">
              {lines.map((l) => (
                <li key={l}>
                  <Rich text={l.slice(2)} slug={slug} />
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i}>
            <Rich text={b} slug={slug} />
          </p>
        );
      })}
    </div>
  );
}

/** The page's headline: the part up to the first "? " is Czech ("Po nocích s CC nestíháte?"), the rest English. */
export function RecalTitle({ slug, id }: { slug: string; id: string }) {
  const title = w(slug, "title");
  const m = /^(.+?\?)\s+(.+)$/.exec(title);
  return (
    <h1 id={id} className="rc-title">
      {m ? (
        <>
          <span lang="cs" className="rc-title-cs">
            {m[1]}
          </span>{" "}
          <span>{m[2]}</span>
        </>
      ) : (
        title
      )}
    </h1>
  );
}

/**
 * The lead: the line, then the rest. A quote in Czech with its English gloss sits between them only when
 * both keys have words (fix 1 on 4 Nov emptied them on purpose: the CEO's hero has no quote).
 */
export function RecalLead({ slug }: { slug: string }) {
  const cz = forText(slug, "landing.lead_quote.cz");
  const en = forText(slug, "landing.lead_quote.en");
  return (
    <div className="for-land-lead pp-lead rc-lead">
      <p>
        <Rich text={w(slug, "landing.lead")} slug={slug} />
      </p>
      {cz && en && (
        <blockquote className="rc-quote">
          <p lang="cs" className="rc-quote-cs">
            {cz}
          </p>
          <p className="rc-quote-en">{en}</p>
        </blockquote>
      )}
      <p>
        <Rich text={w(slug, "landing.lead_after")} slug={slug} />
      </p>
    </div>
  );
}

function Head({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="bx-h2 rc-h2">
      {children}
    </h2>
  );
}

/** A heading and its prose, on one band. */
function Section({ slug, part, tone }: { slug: string; part: string; tone: "light" | "lilac" | "ink" }) {
  const id = `rc-${part}`;
  return (
    <Band tone={tone} labelledBy={id}>
      <Head id={id}>{w(slug, `landing.${part}.heading`)}</Head>
      <Prose text={w(slug, `landing.${part}.body`)} slug={slug} />
    </Band>
  );
}

/** "First quarter, setup: the consultants agree..." -> the words before the first colon lead the step. */
function stepParts(text: string): { lead: string; rest: string } {
  const i = text.indexOf(": ");
  return i > 0 ? { lead: text.slice(0, i), rest: text.slice(i + 2) } : { lead: text, rest: "" };
}

export function RecalBody({ slug, concerns }: { slug: string; concerns: LandingConcern[] }) {
  const steps = ["q1", "q2", "q3", "q4"].map((q) => stepParts(w(slug, `landing.plan.${q}`)));
  const command = w(slug, "landing.proof.agent_command");
  const commandId = `rc-command-${slug}`;
  return (
    <>
      {/* The person */}
      <Section slug={slug} part="person" tone="light" />

      {/* The join: one pull line where the old note was */}
      <Band tone="ink" pad="sm" labelledBy="rc-join" className="rc-join">
        <h2 id="rc-join" className="rc-join-head">
          {w(slug, "landing.join.heading")}
        </h2>
        <p className="rc-join-body">
          <Rich text={w(slug, "landing.join.body")} slug={slug} />
        </p>
      </Band>

      <Section slug={slug} part="argument" tone="light" />
      <Section slug={slug} part="strategy" tone="lilac" />
      <Section slug={slug} part="how" tone="light" />

      {/* The quarters */}
      <Band tone="ink" labelledBy="rc-plan">
        <Head id="rc-plan">{w(slug, "landing.plan.heading")}</Head>
        <Prose text={w(slug, "landing.plan.intro")} slug={slug} />
        <ol className="rc-quarters">
          {steps.map((s, i) => (
            <li key={s.lead}>
              <span className="rc-q-n" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p>
                <strong>{s.rest ? `${s.lead}:` : s.lead}</strong>
                {s.rest && <> {s.rest}</>}
              </p>
            </li>
          ))}
        </ol>
        <Prose text={w(slug, "landing.plan.close")} slug={slug} className="rc-close" />
      </Band>

      {/* The offer */}
      <Band tone="light" labelledBy="rc-offer">
        <Head id="rc-offer">{w(slug, "landing.offer.heading")}</Head>
        <Prose text={w(slug, "landing.offer.body")} slug={slug} className="rc-offer" />
      </Band>

      {/* Proof he can check himself */}
      <Band tone="lilac" labelledBy="rc-proof">
        <Head id="rc-proof">{w(slug, "landing.proof.heading")}</Head>
        <div className="rc-prose">
          <p>
            <Rich text={w(slug, "landing.proof.switch")} slug={slug} />
          </p>
          <p>
            <Rich text={w(slug, "landing.proof.workflows")} slug={slug} />
          </p>
          <p>
            <Rich text={linked(w(slug, "landing.proof.agent"), "/llms.txt", "/llms.txt")} slug={slug} />
          </p>
        </div>
        <div className="rc-command">
          <pre tabIndex={0} aria-label="MCP">
            <code id={commandId}>{command}</code>
          </pre>
          <CopyButton text={command} label="Copy" targetId={commandId} hideLabel />
        </div>
      </Band>

      <Concerns concerns={concerns} dek={false} />

      <CrmBand />
    </>
  );
}
