import stakeholdersJson from "@/content/stakeholders.json";

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

export type StakeholderDemo = { n: number; why: string };

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
};

export type StakeholderNotice = {
  heading: string;
  why: string;
  sources: string;
  removal: string;
  privacy_label: string;
};

export type AboutMe = { heading: string; text: string };

type StakeholdersFile = {
  approved?: unknown;
  notice?: Partial<StakeholderNotice>;
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
    page.demos.every((d) => d && typeof d.n === "number" && isText(d.why)) &&
    !!page.ask &&
    isText(page.ask.short) &&
    isText(page.ask.heading) &&
    isText(page.ask.body)
  );
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
    .map((p) => ({ ...p, moments: (p.moments ?? []).slice(0, 3) }));
  const about = file.about_me;
  const aboutMe = about && isText(about.heading) && isText(about.text) ? { heading: about.heading, text: about.text } : null;
  return { approved, pages, notice: { ...DEFAULT_NOTICE, ...file.notice }, aboutMe };
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

/** "Job A, Co · Job B, Co2" -> ["Job A, Co", "Job B, Co2"]: one line per job. */
export function titleLines(title: string): string[] {
  return title.split(/\s+·\s+/).filter(Boolean);
}
