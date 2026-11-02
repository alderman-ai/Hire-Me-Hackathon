import { findEntry, visibleEntries } from "../entries";
import { cardSize, renderCard } from "../card";

// The entry's link-preview image, drawn from its cover fields by ../card.tsx: the kicker (with "GTM
// demos · " in front when it fits), the title in the lines ../og-layout.ts measured when the entry
// loaded (more than 3 fails the build; nothing is shrunk), the accent phrase in Addvery's text
// gradient, and the byline "Alex Alderman". Built for the same slugs as the page; others are a 404.

export const dynamicParams = false;

export function generateStaticParams() {
  return visibleEntries().map((e) => ({ slug: e.slug }));
}

export const size = cardSize;
export const contentType = "image/png";
export const alt = "The entry's cover: its title and Alex Alderman's name";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = findEntry(slug);
  if (!entry) return new Response("Not found", { status: 404 });
  return renderCard({ kicker: entry.card.kicker, lines: entry.card.lines, accent: entry.cover.accent });
}
