// Page titles and descriptions that more than one place reads: the page's own metadata and the agent
// track (lib/agent-track), which describes each page in /llms.txt and its "Where next" lists.

export const SITE_META = {
  title: "Hire Me Hackathon",
  description: "A GTM engineer's skillset, built live in 12 hours by Alex Alderman, steering a team of AI agents.",
};

export const ARTICLES_META = {
  title: "Articles",
  description: "Alex Alderman's GTM engineering work, written up: outbound, content, and AI your team uses.",
};

export const ABOUT_META = {
  title: "About Alex Alderman",
  description:
    "Alex Alderman, a marketer turned GTM engineer in Prague: his background, the job he wants, and a wall of his LinkedIn posts about AI.",
};

export const FOR_META = {
  title: "Six pages for Addvery",
  description: "One page for each of six people at Addvery: what Alex Alderman would build for their part of the business.",
};

/** /for's line under the grid, before the takedown offer. */
export const FOR_SOURCES_LINE = "Every page draws only on public sources, and each one says which.";

export const LOG_META = {
  title: "Day 1",
  description: "Day 1 of the Hire Me Hackathon as it happened, newest on top.",
};

export const DAY2_META = {
  title: "Day 2",
  description: "Day 2 of the Hire Me Hackathon, newest on top.",
};

/** The `<link rel="alternate" type="text/markdown">` for a page: its Markdown twin (lib/agent-track). */
export function markdownAlternate(path: string): { "text/markdown": string } {
  return { "text/markdown": path === "/" ? "/index.md" : `${path}.md` };
}
