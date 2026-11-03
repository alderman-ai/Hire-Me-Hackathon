import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { marked } from "marked";
import "./research-docs.css";

// Alex's own research on the company, shown as he wrote it (BUILD addvery-research-B2).
// The files live in the git-ignored local/research/ folder, copied from Addvery Research\for-site\;
// they're company-level only. If the folder is missing (a build from the public repo), nothing renders.

const DIR = path.join(process.cwd(), "local", "research");

export type ResearchDoc = { slug: string; title: string; html: string };

export function readResearchDocs(): ResearchDoc[] {
  if (!existsSync(DIR)) return [];
  return readdirSync(DIR)
    .filter((f) => f.toLowerCase().endsWith(".md"))
    .sort()
    .map((f) => {
      const base = f.replace(/\.md$/i, "");
      const title = base.replace(/^\d+\s+/, "").replace(/\s+-\s+/, ": ");
      const slug = base.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const markdown = readFileSync(path.join(DIR, f), "utf-8");
      // A file's own "# " title becomes an h2, so /d2 keeps its one h1 (3 Nov, orchestration). h1 and h2
      // share one style in .art-rich, so nothing changes to the eye. Literal "<h1" in the text is escaped.
      const html = (marked.parse(markdown, { async: false }) as string).replace(/<(\/?)h1\b/g, "<$1h2");
      return { slug, title, html };
    });
}

export function ResearchDocs({ docs }: { docs: ResearchDoc[] }) {
  if (docs.length === 0) return null;
  return (
    <div className="rd">
      <p className="rd-intro">My research notes on Addvery, as I wrote them. The charts above are built from them.</p>
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
