import { docParams, docResponse } from "@/lib/agent-track/respond";

// The same Markdown as app/agent-md, sent as text/plain: for a browser opening a .md URL (Accept has
// text/html but not text/markdown), so it shows the page instead of downloading it. See next.config.mjs.

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return docParams();
}

export async function GET(_req: Request, { params }: { params: Promise<{ doc: string[] }> }) {
  return docResponse(params, "plain");
}
