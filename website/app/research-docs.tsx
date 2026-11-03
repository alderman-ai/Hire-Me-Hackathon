import { RESEARCH_INTRO, type ResearchDoc } from "./research-words";
import "./research-docs.css";

// Alex's own research on the company, shown as he wrote it (BUILD addvery-research-B2). The files are read
// in ./research-words.ts (local/research/, git-ignored); with none, nothing renders.

export { readResearchDocs, type ResearchDoc } from "./research-words";

export function ResearchDocs({ docs }: { docs: ResearchDoc[] }) {
  if (docs.length === 0) return null;
  return (
    <div className="rd">
      <p className="rd-intro">{RESEARCH_INTRO}</p>
      <div className="rd-list">
        {docs.map((d) => (
          <details key={d.slug} id={`research-${d.slug}`} className="rd-item">
            <summary className="rd-summary">
              <span className="rd-title">{d.title}</span>
              <span className="rd-marker" aria-hidden="true" />
            </summary>
            <div className="art-rich rd-body" dangerouslySetInnerHTML={{ __html: d.html }} />
          </details>
        ))}
      </div>
    </div>
  );
}
