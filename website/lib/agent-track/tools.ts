// The three read-only tools of the agent track, shared by the MCP server (app/mcp/route.ts) and the WebMCP
// registration in the browser (app/agent/webmcp.tsx). Pure functions over the track's docs: no Node, no React.

export type TrackDoc = { key: string; title: string; url: string; humanUrl: string; markdown: string };
export type TrackIndex = { llms: string; docs: TrackDoc[] };

export const TOOL_DEFS = [
  {
    name: "site_map",
    title: "Site map",
    description:
      "The site map of Alex Alderman's Hire Me Hackathon site (its /llms.txt): every page, one line each, and a short guide for showing someone around. Start here.",
    inputSchema: { type: "object", additionalProperties: false },
  },
  {
    name: "read_page",
    title: "Read a page",
    description:
      'One page of the site as Markdown. `path` is the page\'s path ("/", "/about", "/articles/<slug>", "/for/<slug>") or its .md URL from the site map.',
    inputSchema: {
      type: "object",
      properties: { path: { type: "string", description: 'The page\'s path, such as "/about" or "/articles", or its URL.' } },
      required: ["path"],
      additionalProperties: false,
    },
  },
  {
    name: "search_site",
    title: "Search the site",
    description: "Keyword search over every page of the site. Returns the five best matches with their title, URL and a snippet.",
    inputSchema: {
      type: "object",
      properties: { query: { type: "string", description: "A few keywords, such as \"ICP routing\" or \"managed service\"." } },
      required: ["query"],
      additionalProperties: false,
    },
  },
] as const;

/** "/about", "about", "/about.md", "https://.../about.md", "/" or "/index.md" -> the doc key ("about", "index"). */
export function keyFromPath(input: string): string {
  let p = input.trim();
  p = p.replace(/^https?:\/\/[^/]+/i, "");
  p = p.replace(/[?#].*$/, "").replace(/\.md$/i, "").replace(/\/+$/, "").replace(/^\/+/, "");
  return p === "" || p === "index" ? "index" : p;
}

const words = (s: string) => (s.toLowerCase().match(/[\p{L}\p{N}][\p{L}\p{N}'-]*/gu) ?? []).filter((w) => w.length > 1);

/** Simple keyword scoring: title hits count most, then how often each term appears; the top five. */
export function searchDocs(docs: TrackDoc[], query: string): { title: string; url: string; humanUrl: string; snippet: string; score: number }[] {
  const terms = [...new Set(words(query))];
  if (!terms.length) return [];
  const scored = docs.map((d) => {
    const title = d.title.toLowerCase();
    const body = d.markdown.toLowerCase();
    let score = 0;
    let first = -1;
    for (const t of terms) {
      if (title.includes(t)) score += 10;
      let n = 0;
      for (let i = body.indexOf(t); i >= 0 && n < 20; i = body.indexOf(t, i + t.length)) {
        n++;
        if (first < 0 || i < first) first = first < 0 ? i : Math.min(first, i);
      }
      score += n;
    }
    if (terms.length > 1 && body.includes(terms.join(" "))) score += 8;
    const at = Math.max(0, (first < 0 ? 0 : first) - 80);
    const snippet = d.markdown
      .slice(at, at + 280)
      .replace(/\s+/g, " ")
      .trim();
    return { title: d.title, url: d.url, humanUrl: d.humanUrl, snippet: `${at > 0 ? "…" : ""}${snippet}…`, score };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

/** The text a tool returns, and whether it's an error, for both the MCP server and WebMCP. */
export function runTool(index: TrackIndex, name: string, args: Record<string, unknown>): { text: string; isError: boolean } {
  if (name === "site_map") return { text: index.llms, isError: false };
  if (name === "read_page") {
    const path = typeof args.path === "string" ? args.path : "";
    const key = keyFromPath(path);
    const doc = index.docs.find((d) => d.key === key);
    if (!doc) {
      return {
        text: `404: no page at "${path}". Call site_map for every page's path.`,
        isError: true,
      };
    }
    return { text: doc.markdown, isError: false };
  }
  if (name === "search_site") {
    const query = typeof args.query === "string" ? args.query : "";
    const hits = searchDocs(index.docs, query);
    if (!hits.length) return { text: `No page matches "${query}". Call site_map to see every page.`, isError: false };
    return {
      text: hits.map((h, i) => `${i + 1}. ${h.title}\n   Markdown: ${h.url}\n   Page: ${h.humanUrl}\n   ${h.snippet}`).join("\n\n"),
      isError: false,
    };
  }
  return { text: `Unknown tool: ${name}`, isError: true };
}
