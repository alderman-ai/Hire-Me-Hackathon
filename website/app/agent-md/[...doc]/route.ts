import { docParams, docResponse } from "@/lib/agent-track/respond";

// A page's Markdown twin, as text/markdown. Reached through next.config.mjs's rewrites: /<page>.md, and a
// page's own URL when the request's Accept asks for text/markdown. Built at build time; any other path 404s.

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return docParams();
}

export async function GET(_req: Request, { params }: { params: Promise<{ doc: string[] }> }) {
  return docResponse(params, "markdown");
}
