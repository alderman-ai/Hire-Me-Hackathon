import wall from "@/content/video-wall.json";
import { t } from "../copy";
import { entryUrl, findEntry, type Entry } from "../articles/entries";
import {
  ArrowLink,
  Band,
  EyebrowRow,
  Figure,
  FigureRow,
  LinkRow,
  Matrix,
  Message,
  MessageRow,
  Stat,
  StatList,
  VideoFrame,
} from "./parts";
import { dayOf } from "../day-label";

/*
 * The 36-workflow block (BUILD.md 2 and 3, item 3), in pieces so each page takes what it needs:
 *
 *   Machine36           the whole block on its own ink band (home, id "machine")
 *   WalkthroughFrame    only the video frame (Ivana's page, home)
 *   MachineStats        the three stats (Ivana's page, home)
 *   Routing             "Rules first": heading, lead, the four-step flow and its caption (home)
 *   MachineMatrix       the 36 matrix with the four landed leads (home; the C2 entry, with legend entry.matrix.1)
 *   MachineMessages     the two custom_message_1 rows, Czech and English (home, Ivana's page)
 *   MachineFigures      the two C2 figures (home, Ivana's page)
 *   MachineLinks        links to C2 and C1 (home, Ivana's page)
 *
 * The video is never this file's own id. It is read from the C2 entry's front matter (video.youtube_id,
 * start, end), so the walkthrough swaps in by changing that one field. C2 may be draft or published: in
 * `next dev` and on previews both show; in a production build, where a draft is not loaded at all, the
 * frame and the links to C2 and C1 simply leave themselves out rather than break the page.
 */

export const C2_SLUG = "36-outbound-workflows-and-the-one-variable-behind-them";
export const C1_SLUG = "sorting-twelve-leads-into-36-workflows-rules-first-then-jev";

const ASSETS = `/demos-assets/${C2_SLUG}`;

/** The C2 entry, if this build can show it. */
export function c2(): Entry | undefined {
  return findEntry(C2_SLUG);
}

type Tile = { youtube_id: string; start: number; length: string; title: string; session: string; prague: string };

/** The video wall's tile for a clip, to find its length and name. Matched on id and start. */
function wallTile(id: string, start: number): Tile | undefined {
  for (const row of wall.rows) for (const tile of row.tiles as Tile[]) if (tile.youtube_id === id && tile.start === start) return tile;
  return undefined;
}

// The caption words for the clip tonight (quoted from its card S10-e). When the walkthrough replaces the
// clip, the id changes, this entry no longer matches, and the caption falls back to the wall tile's title.
const KNOWN_CAPTION: Record<string, { caption: string; meta: string }> = {
  "9vLcPuSVmLo": {
    caption: "\"we're not tooling it up to run we're not training the classifier agent we're explaining what all the pieces are\"",
    meta: "Day 1, 16:36",
  },
};

/** The 36 frame: plays the video named in the C2 entry. Nothing if the entry isn't visible or has no video. */
export function WalkthroughFrame({ mode }: { mode?: "inline" | "dialog" }) {
  const v = c2()?.video;
  if (!v) return null;
  const tile = wallTile(v.youtube_id, v.start ?? 0);
  const known = KNOWN_CAPTION[v.youtube_id];
  const label = tile?.title ?? "The 36 outbound workflows, walked through";
  return (
    <VideoFrame
      youtube={v.youtube_id}
      start={v.start || undefined}
      end={v.end}
      label={label}
      caption={known?.caption ?? tile?.title}
      meta={known?.meta ?? (tile ? `${dayOf(tile.session)}, ${tile.prague}` : undefined)}
      length={tile?.length}
      poster={`https://i.ytimg.com/vi/${v.youtube_id}/maxresdefault.jpg`}
      mode={mode}
    />
  );
}

const STAT_FALLBACK = [
  "36 workflows cover four Addvery ICPs in Czech, German and English, with three tactics each.",
  "Message 1 of every workflow is one variable, written for each lead before import.",
  "No workflow has a lead, none is started, and nothing sends.",
];

/** The three stats: the numbers 36, 1 and 0 over the lines 2 to 4 of C2's [!summary] callout. */
export function MachineStats() {
  const body = c2()?.body ?? "";
  const lines = body
    .split("\n")
    .map((l) => /^>\s*-\s+(.*)$/.exec(l)?.[1]?.trim())
    .filter((x): x is string => !!x);
  const labels = lines.length >= 4 ? lines.slice(1, 4) : STAT_FALLBACK;
  return (
    <StatList>
      <Stat num="36" label={labels[0]} />
      <Stat num="1" label={labels[1]} />
      <Stat num="0" label={labels[2]} />
    </StatList>
  );
}

/** "Rules first, then a decision model" with the four counts and C1's summary line. `id` defaults to "routing". */
export function Routing({ id = "routing" }: { id?: string }) {
  return (
    <>
      <h3 id={id} className="bx-h3 bx-mt-4">
        Rules first, then a decision model
      </h3>
      <p className="bx-lead bx-lead-narrow">
        Most of the sorting is rules: industry, headcount, country and profile language. They&rsquo;re free, exact, and anyone can audit them.
      </p>
      <ol className="bx-flow bx-mt-2" aria-label="How one lead finds its workflow">
        <li>
          <span className="bx-flow-n">4 of 12</span>
          <b>Rules</b>industry, headcount, country and profile language settle most leads
        </li>
        <li>
          <span className="bx-flow-n">7 of 12</span>
          <b>Jev (a classification model)</b>one narrow question when a rule can&rsquo;t decide
        </li>
        <li>
          <span className="bx-flow-n">0.75</span>
          <b>A person</b>decides below 0.75, or when two answers are close
        </li>
        <li>
          <span className="bx-flow-n">1 of 36</span>
          <b>One workflow</b>the lead lands in exactly one of the 36
        </li>
      </ol>
      <p className="bx-flow-cap">12 leads, 4 placed by rules alone, 7 that needed a model&rsquo;s answer for at least one decision, 1 no fit.</p>
    </>
  );
}

/** The matrix with the four landed leads. `legend` is the text for the gradient cells. */
export function MachineMatrix({ legend }: { legend: string }) {
  return <Matrix legend={legend} />;
}

/** The two custom_message_1 rows from C2's table: Coho (English), then Tailspin (Czech). */
export function MachineMessages() {
  return (
    <MessageRow>
      <Message label="custom_message_1 · Coho Last Mile (fictional) · Last-mile logistics · EN · signal">
        Hi Dana, Coho Last Mile announced its move into Hungary in October. In a new market you start with no network, systems or brand, and what gets decided in the first months shapes the cost per parcel for years. How far along is the last-mile plan there?
      </Message>
      <Message label="custom_message_1 · Tailspin Parcel CZ (fictional) · Last-mile logistics · CS · problem" lang="cs">
        Dobrý den, firma Tailspin Parcel CZ doručuje většinu zásilek až ke dveřím a doručení domů funguje, jen když je někdo doma. Opakované pokusy o doručení pak ukrajují z marže každé trasy. Řešíte teď úspěšnost prvního doručení, nebo to máte pod kontrolou?
      </Message>
    </MessageRow>
  );
}

/** The two C2 figures: the folder of 36 switched off, and message 1 as one variable. */
export function MachineFigures() {
  return (
    <FigureRow>
      <Figure
        src={`${ASSETS}/workflows-folder.png`}
        width={1568}
        height={686}
        alt="Six of the 36 workflows in the project's GetSales folder, named by ICP, language and tactic, each switched off with 0 contacts"
        caption="Every toggle off and every count at 0: none of the 36 is running"
      />
      <Figure
        src={`${ASSETS}/message-1-variable.png`}
        width={1047}
        height={613}
        alt="The Retail loyalty, English, proof workflow in the GetSales builder, its first message set to the single variable custom_message_1"
        caption="Message 1 is one lead field; everything after it is fixed text"
      />
    </FigureRow>
  );
}

/** "Read the whole entry" (C2) and C1's title as links. Each shows only when its entry is in this build. */
export function MachineLinks() {
  const c1 = findEntry(C1_SLUG);
  const has2 = !!c2();
  if (!has2 && !c1) return null;
  return (
    <LinkRow>
      {has2 && <ArrowLink href={entryUrl(C2_SLUG)}>{t("shared.entry.1")}</ArrowLink>}
      {c1 && <ArrowLink href={entryUrl(C1_SLUG)}>Sorting twelve leads into 36 workflows: rules first, then Jev</ArrowLink>}
    </LinkRow>
  );
}

/** The whole block on an ink band: home's section #machine. */
export function Machine36() {
  return (
    <Band tone="ink" id="machine" labelledBy="machine-title">
      <EyebrowRow>{t("home.machine.1")}</EyebrowRow>
      <h2 id="machine-title" className="bx-h2">
        36 outbound workflows and the one variable behind them
      </h2>
      <p className="bx-lead">
        Outbound at Addvery&rsquo;s size isn&rsquo;t one campaign. It&rsquo;s buyer types times languages times angles, and every lead has to land in exactly one of them.
      </p>
      <div className="bx-machine-top">
        <WalkthroughFrame />
        <MachineStats />
      </div>
      <Routing />
      <MachineMatrix legend={t("home.machine.2")} />
      <MachineMessages />
      <MachineFigures />
      <MachineLinks />
    </Band>
  );
}
