import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

// The stakeholder pages (/for/<slug>): one page per key person at Addvery, addressed to their role.
//
// Their content lives in local/stakeholders.json, which is git-ignored, so neither the public repo nor
// this code holds anything about the people. Nothing renders unless:
//   - the file exists, and
//   - its `approved` is exactly `true`, or this is `next dev` (NODE_ENV "development").
// `next build` (and every Vercel build) runs with NODE_ENV "production", so until Alex sets
// `approved: true` a production build gets no slugs, generates no pages, and every /for/... is a 404.
// A page whose note is still marked as Alex's draft (`note_is_draft: true`) is also left out of a
// production build, even after approval, so a draft note can't go live by accident.

export type StakeholderDemo = { n: number; why: string };

export type StakeholderPage = {
  /** Role-based, never a name: ceo, growth, cofounder-1, cofounder-2, delivery, bi. */
  slug: string;
  /** The role as GetSales six.json has it (what the page covers). Not rendered. */
  role: string;
  /** The role, short and without the name ("Addvery's CEO"), for the tab title and the "at a glance" card. */
  label: string;
  name: string;
  /** The public job title as it shows in the hero. */
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

type StakeholdersFile = {
  approved?: unknown;
  notice?: Partial<StakeholderNotice>;
  pages?: unknown;
};

// The comment keeps Turbopack's file tracing from copying this file (names and all) into the route's
// server bundle on Vercel. The pages are static, so nothing reads it at request time: it's only read
// while `next build` runs, and by `next dev`.
const FILE = path.join(/* turbopackIgnore: true */ process.cwd(), "local", "stakeholders.json");

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

function readFileOrNull(): StakeholdersFile | null {
  if (!existsSync(FILE)) return null;
  try {
    const data: unknown = JSON.parse(readFileSync(FILE, "utf8"));
    return data && typeof data === "object" ? (data as StakeholdersFile) : null;
  } catch {
    return null;
  }
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

/** The gate. Returns no pages unless the file exists and is approved, or this is `next dev`. */
export function stakeholderGate(): { approved: boolean; pages: StakeholderPage[]; notice: StakeholderNotice } {
  const file = readFileOrNull();
  const approved = file?.approved === true;
  if (!file || !(approved || isDev()) || !Array.isArray(file.pages)) {
    return { approved, pages: [], notice: DEFAULT_NOTICE };
  }
  const pages = file.pages
    .filter(isPage)
    .filter((p) => isDev() || !p.note_is_draft)
    .map((p) => ({ ...p, moments: (p.moments ?? []).slice(0, 3) }));
  return { approved, pages, notice: { ...DEFAULT_NOTICE, ...file.notice } };
}

export function stakeholderSlugs(): string[] {
  return stakeholderGate().pages.map((p) => p.slug);
}

export function findStakeholder(slug: string): StakeholderPage | undefined {
  return stakeholderGate().pages.find((p) => p.slug === slug);
}
