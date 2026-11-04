import type { LandingConcern } from "../../stakeholders";

// "What I'm guessing you're concerned with": a page's likely questions and Alex's answers, each with its
// two-to-six-word position in bold. Used by the old landing (app/for/[slug]/page.tsx, with its dek) and by
// a recalibrated personal page (recal.tsx, heading only, 4 Nov). Styles in app/for/for.css (.for-qa).

export function Concerns({ concerns, dek = true }: { concerns: LandingConcern[]; dek?: boolean }) {
  if (concerns.length === 0) return null;
  return (
    <section className="for-qa" aria-labelledby="for-concerns">
      <div className="art-container for-split">
        <div className="for-split-head">
          <h2 id="for-concerns" className="for-h2">
            What I&apos;m guessing you&apos;re concerned with
          </h2>
          {dek && <p className="for-dek">Your likely questions, as I imagine you&apos;d put them, and my answers.</p>}
        </div>
        <ul className="for-qa-list">
          {concerns.map((c) => (
            <li key={c.q} className="for-qa-item">
              <h3 className="for-qa-q">{c.q}</h3>
              <p className="for-qa-a">
                {c.lead && <strong className="for-qa-lead">{c.lead}</strong>}
                {c.lead && " "}
                {c.a}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
