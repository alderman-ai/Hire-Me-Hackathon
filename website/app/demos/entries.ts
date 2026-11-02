import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { allDemos } from "../deliverables";
import { layoutCard, readFontMetrics, type FontMetrics } from "./og-layout";
import { NEW_SITE } from "../flags";

// The GTM demos section (/demos, /demos/<slug>), to blog-pipeline/POST-FORMAT.md v1.5: one shared content-entry template for written posts
// and videos (Alex, 2 Nov: "like a CMS, like a list of blog entries").
//
// Entries are Markdown files in content/demos/, one per entry, in blog-pipeline/POST-FORMAT.md v1.1
// with a few added fields (EntryFile below). The site takes the slug from the front matter, never
// the file name. A file that breaks the schema fails the build with its name and the reason.
//
// The gate: only `status: "published"` entries exist in a production build. Everything else (draft,
// near-final, sample) renders only under `next dev` and on Vercel preview deployments, with a banner
// and noindex. A build with no VERCEL_ENV (a local `next build`) counts as production. The pages are
// static, so `generateStaticParams` + `dynamicParams = false` make every other slug a 404.

export const STATUSES = ["draft", "near-final", "sample", "published"] as const;
export const KINDS = ["article", "video", "showcase"] as const;
export type EntryStatus = (typeof STATUSES)[number];
export type EntryKind = (typeof KINDS)[number];

export type Made = {
  minutes_talked: number;
  words_spoken: number;
  words_drafted: number;
  share_changed_by_alex: number | null;
  dictated: string;
  rig_session: string | null;
  pipeline: string;
  stages: string[];
  checks: string[];
};

export type Entry = {
  file: string;
  title: string;
  slug: string;
  description: string;
  author: "Alex Alderman";
  /** YYYY-MM-DD */
  date: string;
  status: EntryStatus;
  kind: EntryKind;
  /** The old demo page this entry belongs to (d1 to d10), linked at the end. */
  deliverable?: string;
  cover: { kicker: string; title_lines?: string[]; subtitle: string; accent?: string };
  /** `end` (seconds) plays a raw moment out of a whole session video, so it needs no cut. */
  video?: { youtube_id: string; start: number; end?: number };
  /** The /demos group it sits in on the new site ("How I'd reach your accounts", ...): its crumb. */
  group?: string;
  /** Site path of an image in public/ (or an https URL), for the index thumbnail. */
  poster?: string;
  /** The content library's id for this piece (orchestration/local/library), for content/recommend.json. */
  library_id?: string;
  tags: string[];
  reading_minutes?: number;
  made?: Made;
  /** The Markdown after the front matter. */
  body: string;
  /** How many [Alex: ...] notes the body holds. */
  notes: number;
  /** The link-preview card's kicker and title lines (checked at build time). */
  card: { kicker: string; lines: string[] };
};

// Field order as the schema note gives it. POST-FORMAT's keys keep their order; the added keys
// (kind, deliverable, video, poster) are optional. The site checks keys and types, not the order.
const TOP_KEYS = [
  "title", "slug", "description", "author", "date", "status", "kind", "deliverable",
  "cover", "video", "poster", "tags", "reading_minutes", "made", "library_id", "group",
] as const;
const MAP_KEYS: Record<string, readonly string[]> = {
  cover: ["kicker", "title_lines", "subtitle", "accent"],
  video: ["youtube_id", "start", "end"],
  made: [
    "minutes_talked", "words_spoken", "words_drafted", "share_changed_by_alex", "dictated",
    "rig_session", "pipeline", "stages", "checks",
  ],
};

const DIR = path.join(/* turbopackIgnore: true */ process.cwd(), "content", "demos");
const FONT = path.join(/* turbopackIgnore: true */ process.cwd(), "app", "demos", "_og", "InterTight-Medium.ttf");
const PUBLIC = path.join(/* turbopackIgnore: true */ process.cwd(), "public");

export const NOTE_PATTERN = /\[Alex: [^[\]\n]+\]/g;

// ---------- The gate ----------

/** True under `next dev` and in a Vercel preview build; never in a production build. */
export function showUnpublished(): boolean {
  if (process.env.VERCEL_ENV === "production") return false;
  return process.env.NODE_ENV === "development" || process.env.VERCEL_ENV === "preview";
}

// ---------- Front matter (POST-FORMAT §2: double-quoted strings, flow lists, two-space maps) ----------

type Raw = Record<string, unknown>;

function scalar(text: string): unknown {
  const v = text.trim();
  try {
    return JSON.parse(v);
  } catch {
    // Tolerated beyond POST-FORMAT: bare words, single quotes and unquoted flow lists.
    if (/^'.*'$/.test(v)) return v.slice(1, -1).replace(/''/g, "'");
    if (/^\[.*\]$/.test(v)) {
      const inner = v.slice(1, -1).trim();
      return inner ? inner.split(",").map((s) => scalar(s)) : [];
    }
    return v;
  }
}

function parseFrontMatter(src: string, fail: (msg: string) => never): { data: Raw; body: string } {
  const text = src.replace(/^﻿/, "").replace(/\r\n?/g, "\n");
  if (!text.startsWith("---\n")) fail("line 1 must be --- (the front matter opens the file)");
  const end = text.indexOf("\n---", 3);
  if (end < 0 || !/^\n---(\n|$)/.test(text.slice(end, end + 5))) fail("the front matter never closes with ---");
  const head = text.slice(4, end);
  const body = text.slice(end + 4).replace(/^\n/, "");

  const data: Raw = {};
  let map: Raw | null = null;
  head.split("\n").forEach((line, i) => {
    if (!line.trim()) return;
    const m = /^( *)([a-z_]+):(?: (.*))?$/.exec(line);
    if (!m) fail(`front matter line ${i + 2} isn't "key: value": ${line}`);
    const [, indent, key, value] = m;
    if (indent === "") {
      if (key in data) fail(`front matter has ${key} twice`);
      if (value === undefined || value.trim() === "") {
        map = {};
        data[key] = map;
      } else {
        map = null;
        data[key] = scalar(value);
      }
    } else if (indent === "  " && map) {
      map[key] = value === undefined ? null : scalar(value);
    } else {
      fail(`front matter line ${i + 2} is indented wrongly (two spaces, one level only): ${line}`);
    }
  });
  return { data, body };
}

// ---------- Validation ----------

const isStr = (v: unknown): v is string => typeof v === "string" && v.trim().length > 0;
const isInt = (v: unknown): v is number => typeof v === "number" && Number.isInteger(v);
const isStrList = (v: unknown): v is string[] => Array.isArray(v) && v.every(isStr);

function realDate(s: string): boolean {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return false;
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  return d.getUTCFullYear() === +m[1] && d.getUTCMonth() === +m[2] - 1 && d.getUTCDate() === +m[3];
}

let fontCache: FontMetrics | null = null;
function cardFont(): FontMetrics {
  fontCache ??= readFontMetrics(readFileSync(FONT));
  return fontCache;
}

/** POST-FORMAT §2's word count: tokens with a letter or digit, after its removals. */
export function bodyWords(body: string): number {
  const text = body
    .replace(/<!--[\s\S]*?-->/g, " ")
    // Pull-quote blocks repeat body text.
    .replace(/^> \[!pull\]\n(?:>.*(?:\n|$))*/gm, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[!slot\] (?:matrix|why|again)|\[!summary\]|\[!pull\]|\[!quote\]|\[!diagram\] (?:scale|flow)/g, " ")
    // A clip's tag, YouTube id and seconds aren't words; its caption is.
    .replace(/\[!video\] [A-Za-z0-9_-]{11}(?: \d+){0,2}/g, " ")
    // Nor is a figure's tag and path (its alt text and caption are), as blog-pipeline/scripts/counts.py.
    .replace(/\[!figure\][ \t]+\S+/g, " ")
    .replace(/^(\s*>?\s*)\d+\.\s/gm, "$1");
  return text.split(/\s+/).filter((t) => /[\p{L}\p{N}]/u.test(t)).length;
}

function validate(file: string, data: Raw, body: string): Entry {
  const fail: (msg: string) => never = (msg) => {
    throw new Error(`content/demos/${file}: ${msg}`);
  };
  const warn = (msg: string) => console.warn(`content/demos/${file}: ${msg}`);

  for (const key of Object.keys(data)) {
    if (!(TOP_KEYS as readonly string[]).includes(key)) fail(`unknown key "${key}" (allowed: ${TOP_KEYS.join(", ")})`);
  }
  for (const [name, keys] of Object.entries(MAP_KEYS)) {
    const v = data[name];
    if (v === undefined) continue;
    if (!v || typeof v !== "object" || Array.isArray(v)) fail(`${name} must be a map of indented keys`);
    for (const key of Object.keys(v as Raw)) {
      if (!keys.includes(key)) fail(`unknown key "${name}.${key}" (allowed: ${keys.join(", ")})`);
    }
  }

  const { title, slug, description, author, date, status } = data;
  if (!isStr(title) || title.length > 64) fail("title must be text of at most 64 characters (POST-FORMAT v1.3)");
  if (!isStr(slug) || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug) || slug.length > 60) {
    fail("slug must match ^[a-z0-9]+(-[a-z0-9]+)*$ and be at most 60 characters");
  }
  if (!isStr(description)) fail("description is required");
  if (description.length < 140 || description.length > 160) {
    warn(`description is ${description.length} characters (POST-FORMAT asks for 140 to 160)`);
  }
  if (author !== "Alex Alderman") fail('author must be exactly "Alex Alderman"');
  if (!isStr(date) || !realDate(date)) fail("date must be a real YYYY-MM-DD date");
  if (!(STATUSES as readonly unknown[]).includes(status)) fail(`status must be one of ${STATUSES.join(", ")}`);

  const kind = (data.kind ?? "article") as EntryKind;
  if (!(KINDS as readonly unknown[]).includes(kind)) fail(`kind must be one of ${KINDS.join(", ")}`);

  const deliverable = data.deliverable;
  if (deliverable !== undefined && deliverable !== null) {
    if (!isStr(deliverable) || !allDemos().some((d) => d.slug === deliverable)) {
      fail(`deliverable must be a demo page slug (${allDemos().map((d) => d.slug).join(", ")})`);
    }
  }

  const cover = data.cover as Raw | undefined;
  if (!cover) fail("cover is required");
  const { kicker, title_lines, subtitle, accent } = cover;
  if (!isStr(kicker) || kicker.length > 28) fail("cover.kicker must be text of at most 28 characters (POST-FORMAT v1.3)");
  if (!isStr(subtitle) || subtitle.length > 120) fail("cover.subtitle must be one sentence of at most 120 characters");
  if (title_lines !== undefined && title_lines !== null) {
    if (!isStrList(title_lines) || title_lines.length < 2 || title_lines.length > 4) {
      fail("cover.title_lines must list 2 to 4 lines");
    }
    if (title_lines.join(" ") !== title) fail("cover.title_lines, joined with single spaces, must equal title");
  }
  if (accent !== undefined && accent !== null) {
    if (!isStr(accent)) fail("cover.accent must be text");
    if (title.split(accent).length !== 2) fail("cover.accent must occur exactly once in title");
    if (Array.isArray(title_lines) && !title_lines.some((l) => l.includes(accent))) {
      fail("cover.accent must sit inside a single title_lines entry");
    }
  }

  let video: Entry["video"];
  if (data.video !== undefined && data.video !== null) {
    const v = data.video as Raw;
    if (!isStr(v.youtube_id) || !/^[A-Za-z0-9_-]{11}$/.test(v.youtube_id)) fail("video.youtube_id must be an 11-character YouTube id");
    const start = v.start ?? 0;
    if (!isInt(start) || start < 0) fail("video.start must be whole seconds, 0 or more");
    const end = v.end;
    if (end !== undefined && (!isInt(end) || (end as number) <= (start as number))) fail("video.end must be whole seconds, after video.start");
    video = { youtube_id: v.youtube_id, start, ...(end !== undefined ? { end: end as number } : {}) };
  }
  if (kind === "video" && !video) fail('kind "video" needs a video (youtube_id, start)');

  const poster = data.poster;
  if (poster !== undefined && poster !== null) {
    if (!isStr(poster) || !(/^\/[^/]/.test(poster) || /^https:\/\//.test(poster))) {
      fail('poster must be a site path ("/demos/poster.jpg", a file in public/) or an https:// URL');
    }
    if (poster.startsWith("/") && !existsSync(path.join(PUBLIC, poster))) fail(`poster ${poster} isn't in public/`);
  }

  const tags = data.tags ?? [];
  if (!isStrList(tags) || tags.length > 3 || !tags.every((t) => /^[a-z0-9]+(-[a-z0-9]+)*$/.test(t))) {
    fail("tags must list up to 3 lowercase kebab-case tags");
  }
  if (kind === "article" && tags.length === 0) fail("an article needs 1 to 3 tags");

  const reading = data.reading_minutes;
  if (reading !== undefined && reading !== null && (!isInt(reading) || reading < 1)) {
    fail("reading_minutes must be a whole number, at least 1");
  }

  let made: Made | undefined;
  if (data.made !== undefined && data.made !== null) {
    const m = data.made as Raw;
    for (const k of ["minutes_talked", "words_spoken", "words_drafted"]) {
      if (!isInt(m[k]) || (m[k] as number) < 1) fail(`made.${k} must be a whole number, at least 1`);
    }
    const share = m.share_changed_by_alex;
    if (share !== null && (!isInt(share) || share < 0 || share > 100)) fail("made.share_changed_by_alex must be null or 0 to 100");
    if (status === "published" && share === null) fail("a published entry needs made.share_changed_by_alex");
    if (!isStr(m.dictated) || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(m.dictated)) fail("made.dictated must be YYYY-MM-DDTHH:MM");
    if (m.rig_session !== null && (!isStr(m.rig_session) || !/^S\d{2}$/.test(m.rig_session))) {
      fail("made.rig_session must be null or S and two digits");
    }
    if (!isStr(m.pipeline)) fail("made.pipeline is required");
    if (!isStrList(m.stages) || m.stages.length === 0) fail("made.stages must list the stages");
    if (!isStrList(m.checks) || m.checks.length === 0) fail("made.checks must list at least one stage");
    const order = m.checks.map((c) => (m.stages as string[]).indexOf(c));
    if (order.some((i) => i < 0) || order.some((i, n) => n > 0 && i <= order[n - 1])) {
      fail("made.checks must be stages from made.stages, in the same order");
    }
    made = m as unknown as Made;
  }

  const notes = (body.match(NOTE_PATTERN) ?? []).length;
  if (status === "published" && notes > 0) {
    fail(`a published entry still holds ${notes} note${notes === 1 ? "" : "s"} for Alex ([Alex: ...]); the publish step must resolve them`);
  }
  if (status === "published" && /\[Alex/.test(body)) fail("a published entry still holds a malformed [Alex note");

  const hasText = body.replace(/<!--[\s\S]*?-->/g, "").trim().length > 0;
  if (kind === "article") {
    if (!hasText) fail("an article needs a body");
    if (!made) fail("an article needs made (the How this post was made box)");
    if (!isInt(reading)) fail("an article needs reading_minutes");
    const words = bodyWords(body);
    const expected = Math.max(1, Math.ceil(words / 230));
    if (reading !== expected) warn(`reading_minutes is ${reading}; the body's ${words} words make ${expected}`);
    if (status !== "published" && made.words_drafted !== words) {
      warn(`made.words_drafted is ${made.words_drafted}; the body counts ${words} words`);
    }
  }

  // The link-preview card's lines: throws (and fails the build) past 3 lines. Never shrunk.
  let card: Entry["card"];
  try {
    card = layoutCard(cardFont(), {
      kicker,
      title,
      title_lines: (title_lines as string[] | undefined) ?? undefined,
      accent: (accent as string | undefined) ?? undefined,
    });
  } catch (e) {
    fail((e as Error).message);
  }

  return {
    file,
    title,
    slug,
    description,
    author: "Alex Alderman",
    date,
    status: status as EntryStatus,
    kind,
    deliverable: (deliverable as string | undefined) ?? undefined,
    cover: {
      kicker,
      subtitle,
      title_lines: (title_lines as string[] | undefined) ?? undefined,
      accent: (accent as string | undefined) ?? undefined,
    },
    video,
    poster: (poster as string | undefined) ?? undefined,
    library_id: typeof data.library_id === "string" ? data.library_id : undefined,
    group: typeof data.group === "string" ? data.group : undefined,
    tags,
    reading_minutes: (reading as number | undefined) ?? undefined,
    made,
    body,
    notes,
    card: card!,
  };
}

// ---------- Loading ----------

let cache: Entry[] | null = null;

/** Every entry file this build may show, valid or the build fails. Newest first by date, ties by title. */
export function allEntries(): Entry[] {
  if (cache && process.env.NODE_ENV !== "development") return cache;
  const files = existsSync(DIR) ? readdirSync(DIR).filter((f) => f.endsWith(".md")).sort() : [];
  const entries: Entry[] = [];
  for (const file of files) {
    const fail: (msg: string) => never = (msg) => {
      throw new Error(`content/demos/${file}: ${msg}`);
    };
    const { data, body } = parseFrontMatter(readFileSync(path.join(DIR, file), "utf8"), fail);
    // A production build never shows an unpublished file, so a draft in progress can't break it.
    if (!showUnpublished() && data.status !== "published") continue;
    entries.push(validate(file, data, body));
  }
  const seen = new Map<string, string>();
  for (const e of entries) {
    const other = seen.get(e.slug);
    if (other) throw new Error(`content/demos: ${e.file} and ${other} share the slug "${e.slug}"`);
    seen.set(e.slug, e.file);
  }
  entries.sort((a, b) => (a.date === b.date ? a.title.localeCompare(b.title) : a.date < b.date ? 1 : -1));
  cache = entries;
  return entries;
}

/** The entries this build may show: published only, unless this is `next dev` or a preview. */
export function visibleEntries(): Entry[] {
  const all = allEntries();
  // The new site never shows the template's sample entries (VERDICT.md 2.7).
  const shown = NEW_SITE ? all.filter((e) => e.status !== "sample") : all;
  return showUnpublished() ? shown : shown.filter((e) => e.status === "published");
}

export function findEntry(slug: string): Entry | undefined {
  return visibleEntries().find((e) => e.slug === slug);
}

// ---------- Formatting ----------

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-11-02" -> "2 Nov 2026" */
export function formatDate(ymd: string): string {
  const [y, m, d] = ymd.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

/** 2140 -> "2,140" */
export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

const WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
export function countWord(n: number): string {
  return n < 10 ? WORDS[n] : String(n);
}

export function capitalise(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const STATUS_LABEL: Record<EntryStatus, string> = {
  draft: "Draft",
  "near-final": "Near-final draft",
  sample: "Sample entry",
  published: "Published",
};

/** "Sample entry · not published · 2 notes for Alex" (POST-FORMAT §3.4's banner). */
export function draftLine(e: Entry): string {
  const notes = e.notes === 0 ? "no notes for Alex" : `${e.notes} note${e.notes === 1 ? "" : "s"} for Alex`;
  return `${STATUS_LABEL[e.status]} · not published · ${notes}`;
}

/** What the index and the byline say about length: "5 min read", or "Video". */
export function lengthLabel(e: Entry): string | undefined {
  // The new site shows no minute counts anywhere (RULES.md rule 5).
  if (e.reading_minutes && !NEW_SITE) return `${e.reading_minutes} min read`;
  if (e.video) return "Video";
  return undefined;
}

export function entryUrl(slug: string): string {
  return `/demos/${slug}`;
}

export function demoName(slug: string): { n: number; name: string } | undefined {
  const d = allDemos().find((x) => x.slug === slug);
  return d ? { n: d.n, name: d.name } : undefined;
}
