// Every visitor-facing word of the agent version (the /agent page, the nav item, the per-page row and the
// /llms.txt summary). Final copy from orchestration, 3 Nov 20:2x, through alex-voice (graded Great): use it
// verbatim, and add no other visitor prose. The two prompts are what the visitor sends to their own AI,
// in the visitor's voice; {md_url} and {llms_url} are filled in per page (app/agent-track/links.ts).

export const NAV_LABEL = "For your AI";

export const PAGE_TITLE = "Hand this site to your AI";

export const PAGE_LEDE =
  "Rather have your AI read this for you? One click opens Claude or ChatGPT pointed at this site's map. It asks what you care about, then walks you through only those pages (yes, I built a second version of my site for robots). No buttons. Just pure Markdown.";

export const SEE_WHAT_IT_READS = "See the map your AI reads";

export const PAGE_ROW_LABEL = "Ask your AI about this page:";

/** The blockquote at the top of /llms.txt. */
export const LLMS_SUMMARY =
  "This is my hire-me site. I'm a GTM engineer in Prague, and I built it live, in a 12-hour hackathon, for six people at Addvery: almost like a personal website, but made just for them. It holds my articles on AI in go-to-market (the short version: there are two ways to pay for AI, cut labor or increase revenue), videos from the build, the reusable skills that came out of it, and a page for each of the six. Your reader picks the order, not me.";

/** The /agent page's prompt. The llms.txt URL in it is production's, always (the link the visitor's AI can reach). */
export const SITE_PROMPT =
  "Read https://hire-me-hackathon.vercel.app/llms.txt and follow its guide. You're showing me around Alex Alderman's site: ask me what I'm interested in first, then open only the pages that answer it and give me their links.";

/** The per-page prompt: {md_url} is the page's absolute .md URL, {llms_url} the absolute /llms.txt. */
export const PAGE_PROMPT =
  "Read {md_url}. It's one page of Alex Alderman's site (the map is {llms_url}). Tell me its main point in a few lines, then ask what I'd like to explore next.";
