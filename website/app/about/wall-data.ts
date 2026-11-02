import wall from "@/content/linkedin-wall.json";

// Alex's LinkedIn wall (content/linkedin-wall.json, copied from scraping/site/linkedin-wall/ by
// scripts/about_assets.py). The scrape's rules hold here: `text` and `collapsed` are verbatim, typos and
// bold Unicode letters included, and are never edited, trimmed or "fixed". The source's internal `why`
// field isn't copied in at all.

export type WallImage = { src: string; width: number; height: number };

export type WallPost = {
  id: string;
  date: string;
  url: string;
  text: string;
  collapsed: string;
  has_more: boolean;
  images: WallImage[];
  /** A PDF carousel: its title shows, and it opens on LinkedIn. */
  document: { title: string; note?: string } | null;
  /** None on the wall yet. A video shows its cover, if the scrape has one, and plays on LinkedIn. */
  video: { cover?: WallImage; title?: string } | null;
  reactions: number;
  comments: number;
};

/**
 * What the card and the dialog get: the post, plus its dates and image alt text worked out here.
 * `label` names the post for screen readers ("the post from 12 October 2026"), with the time added
 * when he posted more than once that day, so every card's buttons and links stay distinct.
 */
export type WallCard = WallPost & { day: string; dayLong: string; label: string; alts: string[] };

// Alt text for the posts' images, keyed by file name. The images carry no alt text on LinkedIn, so
// these describe what each one shows. A new image without an entry gets the generic line.
export const ALT: Record<string, string> = {
  "2026-05-11-7459537059708551168-1": "Card: Learn something new in AI. Copy and paste, five minutes. One prompt, one coffee, one sharper instinct.",
  "2026-05-13-7460286492494503936-1": "A LinkedIn profile with three five-star recommendations in its banner.",
  "2026-05-18-7462095364209381376-1": "Claude Code in a terminal: the welcome screen and the /ultraplan command.",
  "2026-05-28-7465660007745970176-1": "Card: You don't need agentic workflows. Five minutes, real progress.",
  "2026-06-10-7470377549441785856-1": "Claude's model menu: Fable 5, included in plan limits until June 22, above Opus 4.8, Sonnet 4.6 and Haiku 4.5.",
  "2026-07-21-7485319822705152000-1": "Claude's start screen, 'Back at it, Alex', with a note that Fable 5 is now a standard part of the Max plan.",
  "2026-07-29-7488171479398780928-1": "Illustrated card: Who did that? A whodunit for children, with This PC, Network and Linux icons and the line 'bypass permissions on'.",
  "2026-08-02-7489690972952449024-1": "A page of his prompt document: Important constraint / fence.",
  "2026-08-02-7489690972952449024-2": "A page of his prompt document: Demos to create.",
  "2026-08-02-7489690972952449024-3": "A page of his prompt document: Demo 2, post writing with a rubric.",
  "2026-08-02-7489690972952449024-4": "A page of his prompt document: Pre-flight check.",
  "2026-08-02-7489690972952449024-5": "A page of his prompt document: Template.",
  "2026-08-07-7491391436060528640-1": "Tip of the day card: inspect the transcripts of your subagents; how your main session prompts them is instructive.",
  "2026-08-16-7494664251039694848-1": "A tip-of-the-day card template with three empty text fields.",
  "2026-09-01-7500671990362677248-1": "Benchmark table comparing Fable 5.1, Fable 5 and Opus 5, with Fable 5.1 ahead on every row.",
  "2026-10-12-7515443703264735232-1": "Table of new scripts per week, 27 July to 5 October, with some project names blacked out.",
};

const fileKey = (src: string) => src.split("/").pop()!.replace(/\.[a-z]+$/i, "");

// Dates in Prague time, written as the rest of the site writes them ("2 Nov 2026", app/demos/entries.ts).
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const prague = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "numeric",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
  timeZone: "Europe/Prague",
});
export function ymd(d: Date) {
  const parts = Object.fromEntries(prague.formatToParts(d).map((p) => [p.type, p.value]));
  return { d: Number(parts.day), m: Number(parts.month) - 1, y: Number(parts.year), time: `${parts.hour}:${parts.minute}` };
}
export const day = { format: (date: Date) => { const { d, m, y } = ymd(date); return `${d} ${MONTHS[m].slice(0, 3)} ${y}`; } };
export const dayLong = { format: (date: Date) => { const { d, m, y } = ymd(date); return `${d} ${MONTHS[m]} ${y}`; } };
const month = { format: (date: Date) => MONTHS[ymd(date).m] };
const year = { format: (date: Date) => String(ymd(date).y) };

/** Newest first (the scrape is oldest first). */
export function wallCards(): WallCard[] {
  const posts = (wall.posts as unknown as WallPost[]).slice();
  posts.sort((a, b) => b.date.localeCompare(a.date));
  const perDay = new Map<string, number>();
  for (const p of posts) {
    const k = dayLong.format(new Date(p.date));
    perDay.set(k, (perDay.get(k) ?? 0) + 1);
  }
  return posts.map((p) => {
    const d = new Date(p.date);
    const long = dayLong.format(d);
    return {
      ...p,
      images: p.images ?? [],
      day: day.format(d),
      dayLong: long,
      label: `the post from ${long}${(perDay.get(long) ?? 0) > 1 ? ` at ${ymd(d).time}` : ""}`,
      alts: (p.images ?? []).map((img, i, all) => ALT[fileKey(img.src)] ?? `Image ${i + 1} of ${all.length} from the post.`),
    };
  });
}

/** "May to October 2026", from the oldest and newest post. */
export function wallSpan(cards: { date: string }[]): string {
  if (!cards.length) return "";
  const newest = new Date(cards[0].date);
  const oldest = new Date(cards[cards.length - 1].date);
  const [y1, y2] = [year.format(oldest), year.format(newest)];
  return y1 === y2
    ? `${month.format(oldest)} to ${month.format(newest)} ${y2}`
    : `${month.format(oldest)} ${y1} to ${month.format(newest)} ${y2}`;
}
