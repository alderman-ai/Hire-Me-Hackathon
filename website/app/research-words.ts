import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { marked } from "marked";

// Alex's own research on the company, shown as he wrote it on /d2 (BUILD addvery-research-B2), and read
// by the agent track too (lib/agent-track). The files live in the git-ignored local/research/ folder,
// copied from Addvery Research\for-site\; they're company-level only. If the folder is missing (a build
// from the public repo), there are none. A plain module: app/research-docs.tsx renders them.

const DIR = path.join(/* turbopackIgnore: true */ process.cwd(), "local", "research");

/** The line over the list on /d2. */
export const RESEARCH_INTRO = "My research notes on Addvery, as I wrote them. The charts above are built from them.";

export type ResearchDoc = { slug: string; title: string; html: string; markdown: string };

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
      return { slug, title, html, markdown };
    });
}
