import { allDocs, llmsTxt } from "@/lib/agent-track/docs";
import { mdUrl } from "@/lib/agent-track/site";
import type { TrackIndex } from "@/lib/agent-track/tools";

// The whole agent track as one JSON file, built at build time: what the MCP server (app/mcp) and the
// WebMCP tools (app/agent/webmcp.tsx) search and read, so neither needs the content files at request time.

export const dynamic = "force-static";

export function GET() {
  const index: TrackIndex = {
    llms: llmsTxt(),
    docs: allDocs().map((d) => ({ key: d.key, title: d.title, url: mdUrl(d.key), humanUrl: d.humanUrl, markdown: d.markdown })),
  };
  return new Response(JSON.stringify(index), {
    headers: { "Content-Type": "application/json; charset=utf-8", "X-Robots-Tag": "noindex", "Access-Control-Allow-Origin": "*" },
  });
}
