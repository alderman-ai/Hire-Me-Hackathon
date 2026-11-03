import wall from "@/content/video-wall.json";
import { findEntry, type Entry } from "../articles/entries";
import { dayOf } from "../day-label";

// The 36-workflow block's words and data (app/best/machine.tsx renders them). A plain module, no React and
// no CSS, so the agent track (lib/agent-track) reads exactly what the pages show.

export const C2_SLUG = "36-outbound-workflows-and-the-one-variable-behind-them";
export const C1_SLUG = "sorting-twelve-leads-into-36-workflows-rules-first-then-jev";

export const ASSETS = `/demos-assets/${C2_SLUG}`;

/** The C2 entry, if this build can show it. */
export function c2(): Entry | undefined {
  return findEntry(C2_SLUG);
}

type Tile = { youtube_id: string; start: number; length: string; title: string; session: string; prague: string };

/** The video wall's tile for a clip, to find its length and name. Matched on id and start. */
export function wallTile(id: string, start: number): Tile | undefined {
  for (const row of wall.rows) for (const tile of row.tiles as Tile[]) if (tile.youtube_id === id && tile.start === start) return tile;
  return undefined;
}

// The caption words for the clip tonight (quoted from its card S10-e). When the walkthrough replaces the
// clip, the id changes, this entry no longer matches, and the caption falls back to the wall tile's title.
export const KNOWN_CAPTION: Record<string, { caption: string; meta: string }> = {
  "9vLcPuSVmLo": {
    caption: "\"we're not tooling it up to run we're not training the classifier agent we're explaining what all the pieces are\"",
    meta: "Day 1, 16:36",
  },
};

/** The walkthrough's label and caption line, as the frame shows them (undefined without the C2 video). */
export function walkthroughWords(): { label: string; caption?: string; meta?: string } | undefined {
  const v = c2()?.video;
  if (!v) return undefined;
  const tile = wallTile(v.youtube_id, v.start ?? 0);
  const known = KNOWN_CAPTION[v.youtube_id];
  return {
    label: tile?.title ?? "The 36 outbound workflows, walked through",
    caption: known?.caption ?? tile?.title,
    meta: known?.meta ?? (tile ? `${dayOf(tile.session)}, ${tile.prague}` : undefined),
  };
}

const STAT_FALLBACK = [
  "36 workflows cover four Addvery ICPs in Czech, German and English, with three tactics each.",
  "Message 1 of every workflow is one variable, written for each lead before import.",
  "No workflow has a lead, none is started, and nothing sends.",
];

/** The three stat lines under 36, 1 and 0: lines 2 to 4 of C2's [!summary] callout, else the fallback. */
export function machineStatLabels(): string[] {
  const body = c2()?.body ?? "";
  const lines = body
    .split("\n")
    .map((l) => /^>\s*-\s+(.*)$/.exec(l)?.[1]?.trim())
    .filter((x): x is string => !!x);
  return lines.length >= 4 ? lines.slice(1, 4) : STAT_FALLBACK;
}

/** The routing block's words (the agent track reads them too). **bold** marks the bold words. */
export const ROUTING = {
  title: "Rules first, then a decision model",
  before:
    "Rules do most of the sorting: industry, headcount, country, profile language. **They\u2019re free, exact, and anyone on your team can read why a lead went where.** When a rule can\u2019t decide (\u201cFinancial Services\u201d says too little), Jev, a classification model from TypeSafe, gets one narrow question. Under 75% sure, or two answers close? A person decides.",
  flow: [
    { n: "4 of 12", what: "Rules", text: "industry, headcount, country and profile language settle most of the calls" },
    { n: "7 of 12", what: "Jev", text: "one narrow question when a rule can\u2019t decide" },
    { n: "75%", what: "A person", text: "decides when the model is under 75% sure, or two answers are close" },
    { n: "1 of 36", what: "One workflow", text: "the lead lands in exactly one of the 36, with its reason" },
  ],
  after:
    "A lead that fits lands in exactly one of the 36 workflows, with its reason next to it. I\u2019m not running real data through it, so I tested it on twelve fictional leads: 4 placed by rules alone, 7 needed the model at least once, 1 fit nothing. Honest caveat: the model isn\u2019t called in this run either, so the hard cases show answers a person labelled. That\u2019s how this starts for real anyway: your labels tune the questions.",
};

/** The two C2 figures: the folder of 36 switched off, and message 1 as one variable. */
export const MACHINE_FIGURES = [
  {
    src: `${ASSETS}/workflows-folder.png`,
    width: 1568,
    height: 686,
    alt: "Six of the 36 workflows in the project's GetSales folder, named by ICP, language and tactic, each switched off with 0 contacts",
    caption: "Every toggle off and every count at 0: none of the 36 is running",
  },
  {
    src: `${ASSETS}/message-1-variable.png`,
    width: 1047,
    height: 613,
    alt: "The Retail loyalty, English, proof workflow in the GetSales builder, its first message set to the single variable custom_message_1",
    caption: "Message 1 is one lead field; everything after it is fixed text",
  },
];

export const C1_LINK = "Sorting twelve leads into 36 workflows: rules first, then Jev";

/** Home's #machine heading and lead. */
export const MACHINE = {
  title: "How to send every lead a first message written for them",
  lead: "Outbound at Addvery\u2019s size isn\u2019t one campaign. It\u2019s buyer types times languages times angles, and every lead has to land in exactly one of them.",
};


/** The two custom_message_1 examples from C2's table (fictional leads). */
export const MESSAGES = {
  coho: {
    label: "custom_message_1 · Coho Last Mile (fictional) · Last-mile logistics · EN · signal",
    lang: undefined as string | undefined,
    text: "Hi Dana, Coho Last Mile announced its move into Hungary in October. In a new market you start with no network, systems or brand, and what gets decided in the first months shapes the cost per parcel for years. How far along is the last-mile plan there?",
  },
  tailspin: {
    label: "custom_message_1 · Tailspin Parcel CZ (fictional) · Last-mile logistics · CS · problem",
    lang: "cs" as string | undefined,
    text: "Dobrý den, firma Tailspin Parcel CZ doručuje většinu zásilek až ke dveřím a doručení domů funguje, jen když je někdo doma. Opakované pokusy o doručení pak ukrajují z marže každé trasy. Řešíte teď úspěšnost prvního doručení, nebo to máte pod kontrolou?",
  },
};
