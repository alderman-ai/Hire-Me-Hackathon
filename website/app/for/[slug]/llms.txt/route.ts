import { personGuide, personGuides } from "@/lib/agent-track/docs";

// /for/<slug>/llms.txt: one personal page's guide for the visitor's AI (lib/agent-track/docs.ts,
// personGuide), built at build time from the same words and gates as the page. Only a page with a guide
// in this build has one; any other slug 404s.

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return personGuides().map((g) => ({ slug: g.slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = personGuide(slug);
  if (!g) return new Response("Not found\n", { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  return new Response(g.markdown, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
      // Like the rest of the track: the human page is what search engines index.
      "X-Robots-Tag": "noindex",
      Link: '</llms.txt>; rel="describedby"',
    },
  });
}
