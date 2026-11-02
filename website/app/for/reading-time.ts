import { readFileSync } from "node:fs";
import path from "node:path";
import feedJson from "@/content/feed.json";
import type { LandingLink } from "../stakeholders";

// Minutes for each link on a person's reading list, and where a reader with 5, 10 or 20 minutes
// should stop. The minutes come from content/inventory.json (read-only here, built by its own job),
// read when the page is built: each link's href is matched to a record's `path` ("/d3",
// "/#post-s02", "/docs/charter"). The feed itself ("/") is timed as its summary posts, the ones
// flagged `"summary": true` in content/feed.json whose videos open the feed: the sum of their
// records, unless the "/" record already counts video. No file, or no record, means no time for that
// link: never a guess.

type InventoryRecord = { path?: unknown; total_min?: unknown; video_min?: unknown };

const SITE = "https://hire-me-hackathon.vercel.app";

function readInventory(): Map<string, InventoryRecord> | null {
  try {
    const file = path.join(/* turbopackIgnore: true */ process.cwd(), "content", "inventory.json");
    const data = JSON.parse(readFileSync(file, "utf8")) as { items?: unknown };
    if (!Array.isArray(data.items)) return null;
    const map = new Map<string, InventoryRecord>();
    for (const item of data.items as InventoryRecord[]) {
      if (item && typeof item.path === "string") map.set(item.path, item);
    }
    return map;
  } catch {
    return null;
  }
}

const minutesOf = (r: InventoryRecord | undefined): number | null =>
  r && typeof r.total_min === "number" && Number.isFinite(r.total_min) && r.total_min >= 0 ? r.total_min : null;

/** "https://hire-me-hackathon.vercel.app/d3/" -> "/d3". */
function sitePath(href: string): string {
  let p = href.startsWith(SITE) ? href.slice(SITE.length) || "/" : href;
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p;
}

/** The summary posts' ids, in feed order (they open the feed's top carousel). */
function summaryPostIds(): string[] {
  const posts = (feedJson as unknown as { posts?: { id: string; summary?: unknown }[] }).posts ?? [];
  return posts.filter((p) => p.summary === true).map((p) => p.id);
}

function minutesFor(href: string, inventory: Map<string, InventoryRecord>): number | null {
  const p = sitePath(href);
  if (p === "/") {
    const home = inventory.get("/");
    if (home && typeof home.video_min === "number" && home.video_min > 0) return minutesOf(home);
    const ids = summaryPostIds();
    if (ids.length === 0) return null;
    let sum = 0;
    for (const id of ids) {
      const m = minutesOf(inventory.get(`/#post-${id}`));
      if (m === null) return null;
      sum += m;
    }
    return sum;
  }
  return minutesOf(inventory.get(p));
}

/** The time budgets a reader might bring, in minutes. */
const BUDGETS = [5, 10, 20] as const;

export type PathItem = LandingLink & {
  /** Minutes for this link, or null when the inventory has no record for it. */
  min: number | null;
  /** Minutes from the top of the list to the end of this link; null once any link above lacks a time. */
  sofar: number | null;
  /** The budgets whose reader should stop after this link (5, 10, 20), smallest first. */
  stops: number[];
};

export type ReadingPath = {
  items: PathItem[];
  /** Minutes for every link that has a time. */
  total: number;
  /** How many links have no time. */
  untimed: number;
  /** The hrefs that found no time, for the build log and the report. */
  misses: string[];
};

/**
 * The list with its times and stopping points. A budget's stop goes after the last link whose running
 * total stays within the budget plus a fifth ("about 5 minutes" holds 6), provided that uses at least
 * three fifths of it, and only while every link above has a time. No stop is drawn after the final
 * link, or when the whole list fits the budget: the closing total says that.
 */
export function readingPath(links: LandingLink[]): ReadingPath {
  const inventory = readInventory();
  let running: number | null = 0;
  const items: PathItem[] = links.map((link) => {
    const min = inventory ? minutesFor(link.href, inventory) : null;
    running = running === null || min === null ? null : running + min;
    return { ...link, min, sofar: running, stops: [] };
  });

  const timed = items.filter((i) => i.min !== null);
  const total = timed.reduce((s, i) => s + (i.min ?? 0), 0);
  const allTimed = timed.length === items.length;

  for (const budget of BUDGETS) {
    const ceiling = budget * 1.2;
    if (allTimed && total <= ceiling) continue;
    let at = -1;
    items.forEach((item, i) => {
      if (i < items.length - 1 && item.sofar !== null && item.sofar <= ceiling) at = i;
    });
    if (at >= 0 && (items[at].sofar ?? 0) >= budget * 0.6) items[at].stops.push(budget);
  }

  return {
    items,
    total,
    untimed: items.length - timed.length,
    misses: items.filter((i) => i.min === null).map((i) => i.href),
  };
}
