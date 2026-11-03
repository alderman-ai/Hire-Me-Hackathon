// The agent track's addresses. Every link in the Markdown is absolute: an AI's fetch tool can only follow a
// URL it has already seen in the conversation or in an earlier fetch, never a relative one.

/** The live site. The /agent page's prompt and the MCP line always name this one. */
export const PROD = "https://hire-me-hackathon.vercel.app";

/**
 * The base URL every Markdown link uses: production on a `vercel deploy --prod` build, the deployment's own
 * URL on a preview, and the local dev server otherwise (PORT, else 3101 as in HANDOFF.md's local check).
 */
export const BASE =
  process.env.VERCEL_ENV === "production"
    ? PROD
    : process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : `http://localhost:${process.env.PORT || "3101"}`;

export const LLMS_URL = `${BASE}/llms.txt`;
export const LLMS_FULL_URL = `${BASE}/llms-full.txt`;
export const REPO_URL = "https://github.com/alderman-ai/Hire-Me-Hackathon";

/** "/" -> "index", "/for/ceo" -> "for/ceo". */
export function keyOf(path: string): string {
  const p = path.replace(/[?#].*$/, "").replace(/\/+$/, "");
  return p === "" ? "index" : p.replace(/^\//, "");
}

/** "index" -> "/", "for/ceo" -> "/for/ceo". */
export function humanPath(key: string): string {
  return key === "index" ? "/" : `/${key}`;
}

/** The human page's absolute URL. */
export function humanUrl(key: string): string {
  return `${BASE}${humanPath(key)}`;
}

/** The doc's absolute .md URL: "/index.md" for the home page. */
export function mdUrl(key: string): string {
  return `${BASE}/${key}.md`;
}

/** An absolute URL for any site path or URL. */
export function abs(href: string): string {
  if (/^https?:\/\//.test(href)) return href;
  if (href.startsWith("/")) return `${BASE}${href}`;
  return href;
}

/** A YouTube watch link at a start second. */
export function youtube(id: string, start?: number | null): string {
  return `https://www.youtube.com/watch?v=${id}${start ? `&t=${start}s` : ""}`;
}

/** 59 -> "0:59" */
export function mmss(s: number): string {
  return `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}`;
}
