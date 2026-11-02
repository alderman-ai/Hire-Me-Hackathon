import Link from "next/link";
import docsIndex from "@/content/docs/index.json";
import Countdown from "./live";
import { Reveal, RotateIn } from "./motion";
import { ArrowSwap } from "./site-chrome";
import { TimePicker } from "./time-picker";
import { timePathList, welcomeCopy } from "./welcome-data";
import "./welcome.css";

// The top of the home page (orchestration's mockup, board 1; copy from s-d7 in
// content/time-paths.json): what this is and who made it, then "How much time do you have?" and a
// reading path for each answer. It takes the old hero's place and keeps its pieces: the band runs
// under the see-through menu on Addvery's black and glow, the headline slides in from the left, and
// the countdown card rotates in beside it. The charter and specs that the hero's "start here" box
// listed stay one line away, at the foot of the band.

export default function Welcome() {
  const copy = welcomeCopy;
  return (
    <section className="wl on-dark" aria-labelledby="wl-title">
      <div className="container wl-inner">
        <Reveal variant="left" onLoad className="wl-text">
          <h1 id="wl-title" className="wl-title">
            {copy.headline}
          </h1>
          <p className="wl-sub">{copy.subline}</p>
          <p className="wl-by">{copy.made_by}</p>
        </Reveal>
        <RotateIn onLoad from="bottom-left" angle={-10} duration={800} fade={600} delay={500} className="wl-clock">
          <Countdown />
        </RotateIn>
        <TimePicker question={copy.question} helper={copy.helper} paths={timePathList()} />
        <nav className="wl-docs" aria-labelledby="wl-docs-lead">
          <p id="wl-docs-lead" className="wl-docs-lead">
            {copy.docs_lead}
          </p>
          <ul className="wl-docs-list">
            {docsIndex.docs.map((doc) => (
              <li key={doc.slug}>
                <Link href={`/docs/${doc.slug}`} className="wl-doc">
                  {doc.label}
                  <ArrowSwap />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
