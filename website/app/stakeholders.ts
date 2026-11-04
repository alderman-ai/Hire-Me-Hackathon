import stakeholdersJson from "@/content/stakeholders.json";
import { t, type CopyKey } from "./copy";

// The stakeholder pages: one page per key person at Addvery, addressed to their role (/for/<slug>),
// and the grid of all six that opens them (/for).
//
// Their content lives in content/stakeholders.json (tracked; Alex's text, copied back from his edit
// surface). Nothing renders unless:
//   - its `approved` is exactly `true`, or this is `next dev` (NODE_ENV "development").
// `next build` (and every Vercel build) runs with NODE_ENV "production", so with `approved` anything
// but true a production build gets no slugs, generates no pages, and every /for/... is a 404.
// A page whose note is still marked as Alex's draft (`note_is_draft: true`) is also left out of a
// production build, even after approval, so a draft note can't go live by accident.
//
// The portraits are public/people/<slug>.webp (800x1000) and <slug>-400.webp: git-ignored, deployed.
//
// Each page can also carry a `landing`: the personal opening Alex sends each person a link to (a
// greeting, their likely questions with his answers, and a reading list, most important first). It
// has its own gate, on top of the one above: it shows only under `next dev` or when that page's
// `landing.approved` is exactly `true`. Until then a production build renders the page as before.

export type StakeholderDemo = { n: number; why: string };

/**
 * One likely question, as Alex guesses it (`q`), and his answer (`a`). `lead` is the answer's short
 * position ("Not yet."), set bold before the rest.
 */
export type LandingConcern = { q: string; lead?: string; a: string };

/** One reading-list link: a site path ("/d3", "/#post-s02", "/docs/charter", "/") or a full URL. */
export type LandingLink = { title: string; href: string };

export type StakeholderLanding = {
  /** The landing's own gate: only `true` puts it on the live site. */
  approved: boolean;
  /** Opens the page. The first sentence ("Hi Ivana.") is set as the headline when it's short. */
  greeting: string;
  concerns: LandingConcern[];
  /** Most important first. Times come from content/inventory.json (app/for/reading-time.ts). */
  reading_list: LandingLink[];
};

export type StakeholderPage = {
  /** Role-based, never a name: ceo, growth, cofounder-1, cofounder-2, delivery, bi. */
  slug: string;
  /** The role as GetSales six.json has it (what the page covers). Not rendered. */
  role: string;
  /** The role, short and without the name ("Addvery's CEO"), for the tab title and the "at a glance" card. */
  label: string;
  name: string;
  /** The public job title as it shows in the hero. " · " separates two jobs. */
  title: string;
  /** One line: what this page is. */
  framing: string;
  /** The line under the title on /for. Literal words (growth: from her note)... */
  lens?: string;
  /** ...or a key into content/site-copy.json (app/copy.ts), for the five whose words alex-voice writes. */
  lens_key?: string;
  /** The growth lead's page only: the opening, with her reply as a short quote. */
  opening?: { before: string; quote: string; quote_source?: string; after?: string };
  /** The growth lead's page only: the "why now" (amounts come from local/org-diagrams.json). */
  why_now?: { heading?: string; how?: string; source?: string };
  /** Two or three sentences in Alex's voice on what the project means for this role. */
  note: string;
  note_is_draft?: boolean;
  demos: StakeholderDemo[];
  /** Feed post ids (at most 3), linked as /#post-<id>. */
  moments?: string[];
  /** The feed `roles` tags the moments were picked by. Not rendered. */
  feed_roles?: string[];
  ask: { short: string; heading: string; body: string };
  /** Overrides the notice's sources line, when a page uses more than the website and the title. */
  sources?: string;
  /**
   * The personal landing. After the gate (stakeholderGate) this is set only when it may show:
   * under `next dev`, or with `landing.approved === true`. Invalid concerns and links are dropped.
   */
  landing?: StakeholderLanding;
};

export type StakeholderNotice = {
  heading: string;
  why: string;
  sources: string;
  removal: string;
  privacy_label: string;
};

export type AboutMe = { heading: string; text: string };

/** The /for grid's intro: a heading and short paragraphs, with **bold** marked as in Markdown. */
export type GridIntro = { heading: string; paragraphs: string[] };

type StakeholdersFile = {
  approved?: unknown;
  notice?: Partial<StakeholderNotice>;
  grid_intro?: { heading?: unknown; paragraphs?: unknown };
  pages?: unknown;
  about_me?: Partial<AboutMe>;
};

const DEFAULT_NOTICE: StakeholderNotice = {
  heading: "About this page",
  why: "This page is part of a job application to Addvery, built in public.",
  sources: "Its facts come only from Addvery's public website and your public job title.",
  removal: "Ask and it's removed: reply to my LinkedIn message.",
  privacy_label: "How I handle data",
};

/** True only under `next dev`. `next build` and Vercel builds are always "production". */
function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}

const isText = (v: unknown): v is string => typeof v === "string" && v.trim().length > 0;

function isPage(p: unknown): p is StakeholderPage {
  if (!p || typeof p !== "object") return false;
  const page = p as Partial<StakeholderPage>;
  return (
    isText(page.slug) &&
    /^[a-z0-9-]+$/.test(page.slug) &&
    isText(page.name) &&
    isText(page.title) &&
    isText(page.label) &&
    isText(page.framing) &&
    isText(page.note) &&
    Array.isArray(page.demos) &&
    page.demos.length >= 2 &&
    page.demos.length <= 4 &&
    page.demos.every((d) => d && typeof d.n === "number" && isText(d.why))
    // `ask` is no longer required (rule 11: pages only give, no asks); the CEO's is empty since 4 Nov.
  );
}

/** A reading-list href the page can link to: a site path, or an http(s) URL. */
const isHref = (v: unknown): v is string => isText(v) && (/^\/(?!\/)/.test(v) || /^https?:\/\//.test(v));

/**
 * The landing's gate and clean-up: null unless it may show (`next dev`, or `approved` exactly true)
 * and has a greeting. Concerns without both a question and an answer, and links without a title or a
 * usable href, are left out rather than shown half-empty.
 */
function cleanLanding(raw: unknown): StakeholderLanding | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const l = raw as Partial<Record<keyof StakeholderLanding, unknown>>;
  const approved = l.approved === true;
  if (!(approved || isDev()) || !isText(l.greeting)) return undefined;
  const concerns = (Array.isArray(l.concerns) ? l.concerns : [])
    .filter((c): c is LandingConcern => !!c && typeof c === "object" && isText(c.q) && isText(c.a))
    .map((c) => ({ q: c.q.trim(), ...(isText(c.lead) ? { lead: c.lead.trim() } : {}), a: c.a.trim() }));
  const reading_list = (Array.isArray(l.reading_list) ? l.reading_list : [])
    .filter((x): x is LandingLink => !!x && typeof x === "object" && isText(x.title) && isHref(x.href))
    .map((x) => ({ title: x.title.trim(), href: x.href.trim() }));
  return { approved, greeting: l.greeting.trim(), concerns, reading_list };
}

/** The gate. Returns no pages unless the file is approved, or this is `next dev`. */
export function stakeholderGate(): {
  approved: boolean;
  pages: StakeholderPage[];
  notice: StakeholderNotice;
  aboutMe: AboutMe | null;
} {
  const file = stakeholdersJson as unknown as StakeholdersFile;
  const approved = file?.approved === true;
  if (!file || !(approved || isDev()) || !Array.isArray(file.pages)) {
    return { approved, pages: [], notice: DEFAULT_NOTICE, aboutMe: null };
  }
  const pages = file.pages
    .filter(isPage)
    .filter((p) => isDev() || !p.note_is_draft)
    .map((p) => ({ ...p, moments: (p.moments ?? []).slice(0, 3), landing: cleanLanding(p.landing) }));
  const about = file.about_me;
  const aboutMe = about && isText(about.heading) && isText(about.text) ? { heading: about.heading, text: about.text } : null;
  return { approved, pages, notice: { ...DEFAULT_NOTICE, ...file.notice }, aboutMe };
}

/** The grid page's intro from the file, or null when it's missing or empty. */
export function gridIntro(): GridIntro | null {
  const raw = (stakeholdersJson as unknown as StakeholdersFile).grid_intro;
  if (!raw || !isText(raw.heading) || !Array.isArray(raw.paragraphs)) return null;
  const paragraphs = raw.paragraphs.filter(isText).map((p) => p.trim());
  return paragraphs.length > 0 ? { heading: raw.heading.trim(), paragraphs } : null;
}

export function stakeholderSlugs(): string[] {
  return stakeholderGate().pages.map((p) => p.slug);
}

export function findStakeholder(slug: string): StakeholderPage | undefined {
  return stakeholderGate().pages.find((p) => p.slug === slug);
}

/**
 * Where each portrait came from, credited under it on the person's page (Alex, 2 Nov: cite every
 * public image, and prefer the person's own website). Addvery's team pages for five; Ivana Karhanová
 * isn't on them, so hers is from her own website. The photos are cropped to one 4:5 frame and made
 * greyscale (one of the six exists only in black and white); nothing else about them is changed.
 */
const PORTRAIT_SOURCES: Record<string, { label: string; href: string }> = {
  growth: { label: "ivanakarhanova.cz", href: "https://ivanakarhanova.cz/cs" },
  ceo: { label: "addvery.com", href: "https://www.addvery.com/team-details/stepan-hyks" },
  "cofounder-1": { label: "addvery.com", href: "https://www.addvery.com/team-details/pavel-novak" },
  "cofounder-2": { label: "addvery.com", href: "https://www.addvery.com/team-details/lukas-marek" },
  delivery: { label: "addvery.com", href: "https://www.addvery.com/team-details/milos-cerovsky" },
  bi: { label: "addvery.com", href: "https://www.addvery.com/team-details/david-srenk" },
};

/** The portrait files for a slug (the 800 px original and the 400 px copy, both 4:5 greyscale WebP) and its source. */
export function portraitFor(slug: string) {
  return {
    src: `/people/${slug}.webp`,
    srcSet: `/people/${slug}-400.webp 400w, /people/${slug}.webp 800w`,
    width: 800,
    height: 1000,
    source: PORTRAIT_SOURCES[slug] as { label: string; href: string } | undefined,
  };
}

/** The first word of the name: "Ivana Karhanová" -> "Ivana". */
export function firstName(page: Pick<StakeholderPage, "name">): string {
  return page.name.trim().split(/\s+/)[0];
}

/** Splits text into sentences at ". ", "! " or "? ". */
function sentences(text: string): string[] {
  return text.trim().split(/(?<=[.!?])\s+/).filter(Boolean);
}

/**
 * The greeting, split for the hero: a short first sentence ("Hi Ivana.") becomes the headline and the
 * rest the lead under it. A long first sentence keeps the whole greeting together as the headline.
 */
export function greetingParts(greeting: string): { hello: string; rest: string; long: boolean } {
  const [first, ...more] = sentences(greeting);
  if (first && first.length <= 40 && more.length > 0) return { hello: first, rest: more.join(" "), long: false };
  return { hello: greeting.trim(), rest: "", long: true };
}

/**
 * The link-preview description: the greeting's first sentence, skipping a bare salutation ("Hi
 * Ivana." is already the title), cut at a word near 200 characters.
 */
export function greetingSummary(greeting: string): string {
  const all = sentences(greeting);
  const isSalutation = (s: string) => s.length <= 40 && /^(hi|hello|hey|dear|ahoj|dobrý den)\b/i.test(s);
  const s = (all.length > 1 && isSalutation(all[0]) ? all[1] : all[0]) ?? greeting.trim();
  return s.length > 200 ? `${s.slice(0, 197).replace(/\s+\S*$/, "")}…` : s;
}

/** "Job A, Co · Job B, Co2" -> ["Job A, Co", "Job B, Co2"]: one line per job. */
export function titleLines(title: string): string[] {
  return title.split(/\s+·\s+/).filter(Boolean);
}

/** A page's hook line, as the /for grid and the home's six show it: growth's is her own words, the others a site-copy key. */
export function lensLine(page: { lens?: string; lens_key?: string }): string | undefined {
  return page.lens ?? (page.lens_key ? t(page.lens_key as CopyKey) : undefined);
}
