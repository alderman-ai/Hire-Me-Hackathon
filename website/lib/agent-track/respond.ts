import { allDocs, findDoc } from "./docs";

// The agent track's responses. The routes are static (built once, at build time), so the Accept header is
// read by next.config.mjs's rewrites, not here: a browser asking for a .md URL (text/html, no
// text/markdown) is sent to the text/plain twin, so it shows the page instead of downloading it.

export type Flavour = "markdown" | "plain";

/** Every doc's key as a catch-all param: "index" -> ["index"], "for/ceo" -> ["for", "ceo"]. */
export function docParams(): { doc: string[] }[] {
  return allDocs().map((d) => ({ doc: d.key.split("/") }));
}

export function textHeaders(flavour: Flavour, extra?: Record<string, string>): Record<string, string> {
  return {
    "Content-Type": flavour === "markdown" ? "text/markdown; charset=utf-8" : "text/plain; charset=utf-8",
    Vary: "Accept",
    ...extra,
  };
}

/** One doc, or a plain 404. */
export async function docResponse(params: Promise<{ doc: string[] }>, flavour: Flavour): Promise<Response> {
  const { doc } = await params;
  const d = findDoc(doc.join("/"));
  if (!d) return new Response("Not found\n", { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  return new Response(d.markdown, {
    headers: textHeaders(flavour, {
      // The track is unlisted: the human pages are what search engines index.
      "X-Robots-Tag": "noindex",
      Link: '</llms.txt>; rel="describedby"',
    }),
  });
}
