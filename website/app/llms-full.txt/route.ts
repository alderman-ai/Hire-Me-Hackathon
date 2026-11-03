import { llmsFullTxt } from "@/lib/agent-track/docs";

// /llms-full.txt: every doc of the agent track in /llms.txt's order, each after its "Source:" line.

export const dynamic = "force-static";

export function GET() {
  return new Response(llmsFullTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=0, must-revalidate" },
  });
}
