import { entryUrl, findEntry } from "../../articles/entries";
import { C1_SLUG, C2_SLUG } from "../../best/machine-words";
import { SKILLS_PAGE } from "../../flags";

// Words of the P3 lens blocks and the blocks after P4 (app/for/[slug]/lens.tsx renders them). A plain
// module, so the agent track (lib/agent-track) reads exactly what each personal page shows.

export const GROWTH_LENS = {
  title: "30 to 50 outbound sequences and the one variable behind them",
  lead: "Four ICPs, three languages, three tactics, and one personal first message per lead.",
};

/** A step card. `entry` marks a link to an article, which keeps the visitor's page in ?for= (forHref). */
export type LensStep = {
  title: string;
  text: string;
  href: string;
  entry?: boolean;
  image?: { src: string; alt: string };
  bigText?: string;
};

const C2_ASSETS = `/demos-assets/${C2_SLUG}`;
const C1_ASSETS = `/demos-assets/${C1_SLUG}`;
const FOLDER = { src: `${C2_ASSETS}/workflows-folder.png`, alt: "Six of the example's 36 sequences in a GetSales folder, each switched off" };
const ROUTER = { src: `${C1_ASSETS}/router-run-1.png`, alt: "The lead router sorting twelve fictional leads in a terminal" };
const D1_BOARD = { src: "/d1/01-overview-1280.webp", alt: "Research board: Addvery as scraped from public sources" };

/** The step for the six pages (six portraits in place of a cover). */
export const FACES_STEP = { title: "A personal landing page for each decision-maker", text: "This page came out of a reusable skill.", href: "/for" };

export const CEO_LENS = {
  returnTitle: "Keeping everyone takes the biggest saving off the table",
  evidenceTitle: "It was built to be legible more than functional",
};

export function ceoSteps(): LensStep[] {
  const steps: LensStep[] = [];
  if (findEntry(C2_SLUG)) {
    steps.push({
      title: "36 outbound workflows and the one variable behind them",
      text: "Four ICPs, three languages, three tactics, and one personal first message per lead.",
      href: entryUrl(C2_SLUG),
      entry: true,
      image: FOLDER,
    });
  }
  if (findEntry(C1_SLUG)) {
    steps.push({
      title: "Sorting twelve leads into 36 workflows: rules first, then Jev",
      text: "Every lead lands in exactly one workflow, and every decision shows what settled it.",
      href: entryUrl(C1_SLUG),
      entry: true,
      image: ROUTER,
    });
  }
  steps.push({ title: "$1.24", text: "6 Apify scrapers, $1.24, 279 results in about 17 minutes.", href: "/d1", image: D1_BOARD });
  return steps;
}

export const COFOUNDER1_LENS = {
  pipelineTitle: "Outbound at Addvery's size isn't one campaign",
  sliderTitle: "“every company is going to have to decide what level of AI skill they want their company to have”",
  managedMeta: "Day 1, 16:31",
  sliderHead: "Where a company sits on the slider of AI skill",
  slider: [
    "External building: bring in or hire someone external",
    "Build: build your own workflows",
    "Maintain: keep the workflows others build running",
    "Training: learn to use what other people build",
  ],
  sliderQuote: {
    text: "\"so you can imagine a sliding scale that's vertical and so on the bottom is the training and on top is the external building\"",
    youtube: "PQIZoQ-Ic2w",
    when: "Day 1, 16:31",
  },
};

export function cofounder1Steps(): LensStep[] {
  const steps: LensStep[] = [];
  steps.push({
    title: "ICP grid built from the client's own website",
    text: "The four ICPs come from Addvery's own website: retail loyalty, telco customer value, consumer lending and last-mile logistics.",
    href: SKILLS_PAGE ? "/skills#icp-grid-from-client-site" : "/#machine",
    bigText: "4 ICPs",
  });
  steps.push({ title: "Account research scraper on Apify, with no logins", text: "6 Apify scrapers, $1.24, 279 results in about 17 minutes.", href: "/d1", image: D1_BOARD });
  steps.push({
    title: "Account mapping: classifying every employee",
    text: "107 model calls, $0.003. The next account is a new input file.",
    href: "/d2",
    image: { src: "/d1/02-org-chart-1280.webp", alt: "Research board: Addvery's org chart by function" },
  });
  if (findEntry(C1_SLUG)) {
    steps.push({
      title: "Lead router: sorting leads into ICPs, rules first",
      text: "Rules sort most leads for free; a decision model answers only what rules can't settle.",
      href: entryUrl(C1_SLUG),
      entry: true,
      image: ROUTER,
    });
  }
  if (findEntry(C2_SLUG)) {
    steps.push({
      title: "30 to 50 outbound sequences and the one variable behind them",
      text: "Message 1 of every sequence is one variable, written for each lead before import.",
      href: entryUrl(C2_SLUG),
      entry: true,
      image: FOLDER,
    });
  }
  return steps;
}

export const COFOUNDER2_LENS = {
  title:
    "“That’s the niche, right? So good that they think you spent three days building it just for them when an agent was running in the background for a couple hours.”",
  clipMeta: "Day 1, 11:15",
};

/** /for/bi's table: every number, how it was got, and where to check it. */
export function biRows(): { count: string; how: string; check: { href: string; label: string; entry?: boolean } | null }[] {
  const c1 = findEntry(C1_SLUG);
  const c2 = findEntry(C2_SLUG);
  return [
    { count: "279 · $1.24", how: "6 Apify scrapers, $1.24, 279 results in about 17 minutes.", check: { href: "/d1", label: "/d1" } },
    { count: "57", how: "At 16:04 it ran on all 57 profiles that list Addvery on LinkedIn: public profiles and posts, no login.", check: { href: "/d2", label: "/d2" } },
    { count: "55 of 57", how: "Jev (a classification model) labelled 55 of them. For the other 2 it wasn't sure enough, and job-title rules decided.", check: { href: "/d2", label: "/d2" } },
    { count: "56", how: "One \"employee\" turned out to be an outside English teacher and was taken out (57 became 56).", check: { href: "/d1", label: "/d1" } },
    { count: "107 · $0.003", how: "107 model calls, $0.003. Counts only, no names.", check: { href: "/d2", label: "/d2" } },
    {
      count: "12 → 4 · 7 · 1",
      how: "12 leads, 4 placed by rules alone, 7 that needed a model's answer for at least one decision, 1 no fit.",
      check: c1 ? { href: entryUrl(C1_SLUG), label: "the routing run", entry: true } : null,
    },
    {
      count: "36 · 0",
      how: "Every toggle off and every count at 0: none of the example's 36 is running.",
      check: c2 ? { href: entryUrl(C2_SLUG), label: "the 36-sequence example", entry: true } : null,
    },
  ];
}

export const BI_LENS = {
  ruleTitle: "Rules first, then a decision model",
  flow: [
    { what: "Rules", text: "industry, headcount, country and profile language settle most leads" },
    { what: "Jev", text: "one narrow question when a rule can’t decide" },
    { what: "A person", text: "decides below 0.75, or when two answers are close" },
    { what: "One workflow", text: "the lead lands in exactly one of the 36" },
  ],
  jev: "Jev, from TypeSafe, answers narrow typed questions, such as “which of these four ICPs, or none?”, with a probability for each answer, and it writes no text. Those decisions become the labels that tune it. Nothing is trained here.",
  figure: {
    src: `${C1_ASSETS}/router-hard-cases.png`,
    width: 1606,
    height: 2034,
    alt: "Terminal output for the Woodgrove and Litware leads, whose industry labels are too broad for a rule: each shows its Jev question and the answer a person labelled",
    caption: "Terminal output for the two fictional leads whose industry labels are too broad for a rule. Violet marks a rule, orchid a question for Jev.",
  },
  limitsTitle: "It was built to be legible more than functional",
};

export const DELIVERY_KEEP = {
  eyebrow: "What I’d keep",
  title: "This isn’t how I’d work every day. It’s a little, little, little too much.",
  items: [
    { lead: "Write the guiding documents first,", rest: " and better than feels necessary. I’d give mine a B plus. Maybe a B minus." },
    { lead: "Let the agents make the easy calls,", rest: " with a written reason for each one." },
    { lead: "Keep my sign-off for what needs my judgment,", rest: " not for every plan." },
  ],
  dayLink: "Day one: what broke, what worked and what I’d keep",
};

export type Chipped = { skill: string; label: string };

/** Skill chips (links to their cards on /skills), shown under some pages' lists. */
export const CHIP = {
  leak: { skill: "publish-leak-scan", label: "Pre-publish leak checks" },
  onepw: { skill: "onepassword-batch", label: "One-approval secret handling for scraping and AI keys" },
  team: { skill: "spec-driven-agent-team", label: "Charter and executable specs: running a team of AI sessions" },
  attention: { skill: "operator-attention-controls", label: "Keeping a team of AI helpers from running off without me" },
  rig: { skill: "capture-rig", label: "Recording everything I say and making it searchable" },
  apify: { skill: "account-scrape-apify", label: "Account research scraper on Apify, with no logins" },
  people: { skill: "account-people-classifier", label: "Account mapping: classifying every employee and post at a target company" },
  brand: { skill: "brand-clone-tokens", label: "Brand clone: a company's live site turned into design tokens" },
  article: { skill: "transcript-to-article", label: "Transcript-to-article kit" },
} satisfies Record<string, Chipped>;

/** The chips under each page's P4 list. `label` is a small caps line over them, where the mockup has one. */
export const P4_CHIPS: Record<string, { label?: string; items: Chipped[] }> = {
  ceo: { items: [CHIP.leak, CHIP.onepw, CHIP.team] },
  delivery: { label: "Skills behind this", items: [CHIP.team, CHIP.attention, CHIP.onepw, CHIP.rig] },
  bi: { label: "Skills behind this", items: [CHIP.leak, CHIP.onepw, CHIP.apify, CHIP.people] },
};

/** Cofounder-2's lens chips. */
export const COFOUNDER2_CHIPS: Chipped[] = [CHIP.brand, CHIP.article];
