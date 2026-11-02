// Data for the top of the home page, resolved at build time on the server (nothing here ships to the
// browser): the welcome's reading paths (content/time-paths.json, with titles, one-liners and minutes
// from content/inventory.json) and the summary carousel's cards (feed posts marked "summary": true).

import feedJson from "@/content/feed.json";
import inventory from "@/content/inventory.json";
import timePaths from "@/content/time-paths.json";
import videos from "@/content/videos.json";
import summary from "@/content/summary.json";
import type { Block, Post } from "./feed";

const YOUR_PAGE = "/for/<your-slug>";
const WPM = 230; // the inventory's own reading speed

type InventoryItem = {
  path: string;
  title: string;
  live: boolean;
  total_min: number;
  video_min: number | null;
  one_line: string;
};

const items = new Map((inventory.items as unknown as InventoryItem[]).map((it) => [it.path, it]));
const posts = (feedJson as unknown as { posts: Post[] }).posts;
const youtubeIds: Record<string, string | undefined> = videos;

export type Stop =
  | { kind: "link"; href: string; title: string; line: string; min: number; video: boolean; total: number }
  | { kind: "your-page"; title: string; min: number; total: number; pages: { href: string; role: string; title: string }[] };

// A stop before its running total is known.
type NewStop = Stop extends infer S ? (S extends Stop ? Omit<S, "total"> : never) : never;

export type TimePath = {
  key: string;
  /** "5", "10", "20" or "60" and whether it reads "60+" */
  n: string;
  plus: boolean;
  unit: string;
  label: string;
  promise: string;
  stops: Stop[];
  total: number;
};

function words(text: string | undefined) {
  return text ? text.split(/\s+/).filter(Boolean).length : 0;
}

function blockWords(blocks: Block[]): number {
  let n = 0;
  for (const b of blocks) {
    n += words(b.text) + words(b.title) + words(b.source) + words(b.note) + words(b.caption);
    for (const item of b.items ?? []) n += words(item);
    for (const p of b.points ?? []) n += words(p.lead) + words(p.text) + words(p.quote?.text) + words(p.quote?.source);
    if (b.type === "summary") n += words(summary.headline) + summary.paragraphs.reduce((s, t) => s + words(t), 0);
    n += blockWords(b.blocks ?? []);
  }
  return n;
}

// A feed post's reading time by the inventory's method, for posts newer than the inventory. Video
// length isn't known here, so a post with a video gets no fallback (it waits for the inventory).
function feedFallback(id: string): { title: string; line: string; min: number } | null {
  const post = posts.find((p) => p.id === id);
  if (!post || post.blocks.some((b) => b.type === "video")) return null;
  const line = (post as Post & { summary_line?: string }).summary_line ?? post.blocks.find((b) => b.type === "p")?.text ?? "";
  return { title: post.title, line, min: Math.max(1, Math.ceil((blockWords(post.blocks) + words(post.title)) / WPM)) };
}

// The home page links its own feed posts by anchor alone, so they scroll instead of reloading.
const localHref = (path: string) => (path.startsWith("/#") ? path.slice(1) : path);

function resolveStop(path: string): NewStop | null {
  if (path === YOUR_PAGE) {
    const yp = timePaths.intro.your_page;
    const pages = yp.pages
      .filter((p) => items.get(p.path)?.live)
      .map((p) => ({ href: p.path, role: p.role, title: p.title }));
    return pages.length ? { kind: "your-page", title: yp.label, min: yp.min, pages } : null;
  }
  const item = items.get(path);
  if (item) {
    if (!item.live) return null;
    const video = (item.video_min ?? 0) >= 1;
    return { kind: "link", href: localHref(path), title: item.title, line: item.one_line, min: item.total_min, video };
  }
  const anchor = path.match(/^\/#post-(.+)$/);
  const fallback = anchor ? feedFallback(anchor[1]) : null;
  if (fallback) return { kind: "link", href: localHref(path), ...fallback, video: false };
  console.warn(`[welcome] ${path} isn't a live item in content/inventory.json; left out of the time paths.`);
  return null;
}

export function timePathList(): TimePath[] {
  const choices = timePaths.intro.choices as Record<string, { time: string; label: string; promise: string }>;
  const paths = timePaths.paths as Record<string, string[]>;
  return Object.keys(paths)
    .sort((a, b) => Number(a) - Number(b))
    .map((key) => {
      const choice = choices[key];
      const m = choice.time.match(/^(\d+)(\+?)\s*(.*)$/);
      let total = 0;
      const stops = paths[key]
        .map(resolveStop)
        .filter((s): s is NewStop => s !== null)
        .map((s) => {
          total += s.min;
          return { ...s, total } as Stop;
        });
      const plus = m?.[2] === "+";
      if (!plus && total > Number(key)) console.warn(`[welcome] the ${key}-minute path adds up to ${total} minutes.`);
      return {
        key,
        n: m?.[1] ?? key,
        plus,
        unit: m?.[3] || "min",
        label: choice.label,
        promise: choice.promise,
        stops,
        total,
      };
    });
}

export const welcomeCopy = timePaths.intro;
export const carouselCopy = timePaths.carousel;

export type SummaryCard = {
  id: string;
  kind: string;
  time: string;
  at: string;
  title: string;
  line: string;
  /** YouTube id of the post's video, for the thumbnail */
  youtube?: string;
  min?: number;
  video: boolean;
};

// Posts marked "summary": true, newest first.
export function summaryCards(): SummaryCard[] {
  return posts
    .filter((p) => (p as Post & { summary?: boolean }).summary)
    .sort((a, b) => b.at.localeCompare(a.at))
    .map((p) => {
      const post = p as Post & { summary_line?: string };
      const videoBlock = post.blocks.find((b) => b.type === "video");
      const item = items.get(`/#post-${post.id}`);
      const fallback = item ? null : feedFallback(post.id);
      return {
        id: post.id,
        kind: post.kind,
        time: post.at.slice(11, 16),
        at: post.at,
        title: post.title,
        line: post.summary_line ?? post.blocks.find((b) => b.type === "p")?.text ?? "",
        youtube: videoBlock ? youtubeIds[videoBlock.session ?? ""] : undefined,
        min: item?.total_min ?? fallback?.min,
        video: !!videoBlock,
      };
    });
}
