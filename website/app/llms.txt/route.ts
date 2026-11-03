import { llmsTxt } from "@/lib/agent-track/docs";

// /llms.txt (llmstxt.org): the site map an AI reads first, with the guide for showing someone around.
// Built at build time from the same data as the pages (lib/agent-track).

export const dynamic = "force-static";

export function GET() {
  return new Response(llmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=0, must-revalidate" },
  });
}
