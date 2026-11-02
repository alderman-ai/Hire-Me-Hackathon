import data from "@/content/recommend.json";
import d1 from "@/content/d1.json";
import { entryUrl, visibleEntries } from "./demos/entries";
import { findDemo } from "./deliverables";
import { IS_PRODUCTION_BUILD, NEW_SITE } from "./flags";

// "Recommended for you" (RULES.md rule 5; VERDICT.md 2.4): one list per person plus a default, in
// content/recommend.json. Each item names a content-library id, the line saying why it's there, and a
// fallback id. An item shows the page the site has for its id, else its fallback's page, else it's
// skipped, so no card ever points at a placeholder. The order of each list is the reading path.

export type RecItem = { id: string; why: string; fallback?: string | null };
export type RecImage = { src: string; width: number; height: number };
export type RecCard = {
  key: string;
  href: string;
  title: string;
  why: string;
  image?: RecImage;
  youtube?: string;
  /** The list is website's placeholder, not K1's: the card says so. Preview builds only. */
  placeholder: boolean;
};

export const LIST_SLUGS = ["default", "growth", "ceo", "cofounder-1", "cofounder-2", "delivery", "bi"] as const;
export type ListSlug = (typeof LIST_SLUGS)[number];

const PLACEHOLDER = (data as { placeholder?: boolean }).placeholder === true;

/** Whether any carousel shows in this build: only on the new site, and never a placeholder in production. */
export const RECOMMEND_ON = NEW_SITE && !(PLACEHOLDER && IS_PRODUCTION_BUILD);

// Library ids whose page is a published entry under another slug. Entries made from now on carry
// `library_id` in their front matter instead.
const ENTRY_SLUG: Record<string, string> = {
  "demo-linkedin-voice-entry": "linkedin-posts-in-addverys-voice-graded-blind",
};

type Target = { href: string; title: string; image?: RecImage; youtube?: string };

function pageFor(id: string): Target | undefined {
  if (id === "demo-d1-scraping-briefing") {
    return { href: "/d1", title: d1.title, image: { src: "/d1/01-overview-800.webp", width: 800, height: 533 } };
  }
  if (id === "demo-d2-company-research") {
    const d2 = findDemo("d2");
    return d2 ? { href: "/d2", title: d2.name } : undefined;
  }
  const slug = ENTRY_SLUG[id];
  const e = visibleEntries().find((x) => x.library_id === id || (slug !== undefined && x.slug === slug));
  if (!e) return undefined;
  const href = entryUrl(e.slug);
  if (e.video) return { href, title: e.title, youtube: e.video.youtube_id };
  if (e.poster && !/^https?:/.test(e.poster)) return { href, title: e.title, image: { src: e.poster, width: 1200, height: 630 } };
  // Every entry has its own 1200 x 630 link card (app/demos/[slug]/opengraph-image.tsx).
  return { href, title: e.title, image: { src: `${href}/opengraph-image`, width: 1200, height: 630 } };
}

/** The cards for one list, in its order: each item's page, else its fallback's; duplicates and misses skipped. */
export function recommendFor(list: ListSlug): RecCard[] {
  if (!RECOMMEND_ON) return [];
  const items = ((data.lists as Record<string, RecItem[]>)[list] ?? []) as RecItem[];
  const seen = new Set<string>();
  const cards: RecCard[] = [];
  for (const item of items) {
    const t = pageFor(item.id) ?? (item.fallback ? pageFor(item.fallback) : undefined);
    if (!t || seen.has(t.href)) continue;
    seen.add(t.href);
    cards.push({ key: `${item.id}:${t.href}`, ...t, why: item.why, placeholder: PLACEHOLDER });
  }
  return cards;
}
