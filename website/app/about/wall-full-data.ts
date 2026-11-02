import wall from "@/content/linkedin-wall-full.json";
import { ALT, day, dayLong, ymd } from "./wall-data";

// The full LinkedIn wall: all 94 of Alex's posts from the scrape (content/linkedin-wall-full.json, made
// by `python scripts\about_assets.py --wall-full` from scraping/site/linkedin-wall/wall-full.json).
// Alex, 2 Nov 20:45: "I want everything in there. All of them." Shown only in a WALL_FULL=1 build
// (app/about/page.tsx) until he says yes to it on the preview.
//
// The scrape's rules hold: `text` and `collapsed` are verbatim, typos and bold Unicode letters included,
// never edited, trimmed or "fixed". The internal `why` and `dropped_reason` fields aren't copied in.

export type FullImage = {
  /** 1280 px wide at most: the dialog's file. */
  src: string;
  /** 640 px wide: the card's file, when the original is wider than that. */
  card?: string;
  width: number;
  height: number;
  kind: string;
};

export type FullPost = {
  id: string;
  date: string;
  url: string;
  text: string;
  collapsed: string;
  has_more: boolean;
  /** Photos and screenshots. */
  images: FullImage[];
  /** Every page of a PDF carousel. */
  pages: FullImage[];
  document: { title: string; pages?: number } | null;
  video: { cover?: FullImage | null } | null;
  link: { title: string; site: string; url: string; image: FullImage | null } | null;
  poll: { question: string; options: string[] } | null;
  /** A quote post's source. Alex's own older post carries its text and images; anyone else's, only a link. */
  quote_of: {
    id: string;
    url: string;
    by_alex: boolean;
    author: string | null;
    date?: string;
    in_wall?: boolean | null;
    text?: string;
    images: FullImage[];
  } | null;
  reactions: number;
  comments: number;
};

export type FullCard = FullPost & {
  day: string;
  dayLong: string;
  /** Names the post for screen readers: "the post from 12 October 2026" (plus the time on a busy day). */
  label: string;
  alts: string[];
  pageAlts: string[];
  quoteAlts: string[];
  quote: { label: string; href: string; external: boolean } | null;
  /** A one-liner with nothing else: set larger on the wall. */
  short: boolean;
  /** Whether "Read more" has anything to add: more text, or images to see at full size. */
  opens: boolean;
};

// The old wall's alt text is keyed by "<date>-<post id>-<n>"; the full wall's files are "<post id>-<n>",
// numbered photos first, so the same n names the same photo.
const ALT_BY_ID = new Map(Object.entries(ALT).map(([k, v]) => [k.replace(/^\d{4}-\d{2}-\d{2}-/, ""), v]));
const stem = (src: string) => src.split("/").pop()!.replace(/-(640|1280)\.webp$/i, "");

const SHORT = 100; // characters: a post this short, on its own, reads as a one-liner

export function fullWallCards(): FullCard[] {
  const posts = (wall.posts as unknown as FullPost[]).slice();
  posts.sort((a, b) => b.date.localeCompare(a.date));
  const byId = new Map(posts.map((p) => [p.id, p]));
  const perDay = new Map<string, number>();
  for (const p of posts) {
    const k = dayLong.format(new Date(p.date));
    perDay.set(k, (perDay.get(k) ?? 0) + 1);
  }
  return posts.map((p) => {
    const d = new Date(p.date);
    const long = dayLong.format(d);
    const images = p.images ?? [];
    const pages = p.pages ?? [];
    const q = p.quote_of;

    let quote: FullCard["quote"] = null;
    if (q) {
      const own = q.in_wall ? byId.get(q.id) : undefined;
      const when = own?.date ?? q.date;
      const label = q.by_alex
        ? when
          ? `Quoting my post from ${day.format(new Date(when))}`
          : "Quoting my earlier post"
        : q.author
          ? `Quoting a post by ${q.author}`
          : "Quoting a post";
      quote = own ? { label, href: `#post-${own.id}`, external: false } : { label, href: q.url, external: true };
    }

    const title = p.document?.title;
    return {
      ...p,
      images,
      pages,
      day: day.format(d),
      dayLong: long,
      label: `the post from ${long}${(perDay.get(long) ?? 0) > 1 ? ` at ${ymd(d).time}` : ""}`,
      alts: images.map((img, i, all) => ALT_BY_ID.get(stem(img.src)) ?? `Image ${i + 1} of ${all.length} from the post.`),
      pageAlts: pages.map((_, i, all) => `Page ${i + 1} of ${all.length}${title ? ` of “${title}”` : ""}.`),
      quoteAlts: (q?.images ?? []).map((_, i, all) => (all.length > 1 ? `Image ${i + 1} of ${all.length} from my earlier post.` : "Image from my earlier post.")),
      quote,
      short:
        !p.has_more &&
        p.text.length <= SHORT &&
        !images.length &&
        !pages.length &&
        !p.link &&
        !p.poll &&
        !q &&
        !p.video,
      opens: p.has_more || p.collapsed !== p.text || images.length > 0 || pages.length > 0 || !!q?.text || (q?.images?.length ?? 0) > 0,
    };
  });
}
