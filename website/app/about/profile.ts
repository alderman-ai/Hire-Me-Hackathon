// /about's settings: the bits that aren't Alex's copy (that's local/about/about-me.md) or his posts
// (content/linkedin-wall.json). Change them here; nothing else needs touching.

/**
 * Alex's AI portfolio: an entry under /demos/<slug>. Empty for now, and the link card on /about stays
 * hidden. Set it to the entry's slug (the `slug` in its content/demos/*.md front matter) and the card
 * shows in the "At a glance" box, with the entry's own title and subtitle. It stays hidden as long as
 * that entry isn't visible in the build (a production build shows published entries only).
 */
export const AI_PORTFOLIO_SLUG = "";

/** The "At a glance" box. Every fact is from about-me.md, which cites its source for each. */
export const FACTS: { term: string; detail: string }[] = [
  { term: "Based in", detail: "Prague, for over a decade" },
  { term: "Marketing", detail: "10 years freelancing in B2B" },
  { term: "Teaching", detail: "Over 20 years, eight of them teaching English to Czechs" },
  { term: "AI", detail: "Since before ChatGPT, then a nine-month sabbatical building in Claude Code" },
  { term: "Looking for", detail: "A GTM engineer role: employed, freelance or a mix" },
];

export const LINKS = {
  site: { href: "https://alderman.ai", label: "alderman.ai", note: "My AI-fluency teaching site" },
  linkedin: { href: "https://www.linkedin.com/in/alex-the-ai-instructor/", label: "LinkedIn" },
};

/** LinkedIn shows no count when it's zero, and neither does the wall. Set true to show "0 reactions". */
export const SHOW_ZERO_COUNTS = false;
