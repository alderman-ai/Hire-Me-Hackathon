import { t } from "../copy";
import { entryUrl, findEntry } from "../articles/entries";
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
 *   Routing             "Rules first": heading, a paragraph, the four-step flow, a paragraph (home)
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

import {
  ASSETS,
  C1_LINK,
  C1_SLUG,
  C2_SLUG,
  KNOWN_CAPTION,
  MACHINE,
  MACHINE_FIGURES,
  MESSAGES,
  ROUTING,
  c2,
  machineStatLabels,
  MACHINE_STAT_NUMS,
  wallTile,
} from "./machine-words";

export { C1_SLUG, C2_SLUG, c2 };

/** The 36 frame: plays the video named in the C2 entry. Nothing if the entry isn't visible or has no video. */
export function WalkthroughFrame({ mode }: { mode?: "inline" | "dialog" }) {
  const v = c2()?.video;
  if (!v) return null;
  const tile = wallTile(v.youtube_id, v.start ?? 0);
  const known = KNOWN_CAPTION[v.youtube_id];
  const label = tile?.title ?? "30 to 50 sequences behind one classifier, walked through";
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

/** The three stats: the numbers 36, 1 and 0 over the lines 2 to 4 of C2's [!summary] callout. */
export function MachineStats() {
  const labels = machineStatLabels();
  return (
    <StatList>
      {MACHINE_STAT_NUMS.map((num, i) => (
        <Stat key={num} num={num} label={labels[i]} />
      ))}
    </StatList>
  );
}

function withBold(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part));
}

/** "Rules first, then a decision model": how routing works, the four counts, and C1's twelve-lead result. `id` defaults to "routing". */
export function Routing({ id = "routing" }: { id?: string }) {
  return (
    <>
      <h3 id={id} className="bx-h3 bx-mt-4">
        {ROUTING.title}
      </h3>
      <p className="bx-lead bx-lead-narrow">{withBold(ROUTING.before)}</p>
      <ol className="bx-flow bx-mt-2" aria-label="How one lead finds its workflow">
        {ROUTING.flow.map((f) => (
          <li key={f.n}>
            <span className="bx-flow-n">{f.n}</span>
            <b>{f.what}</b>
            {f.text}
          </li>
        ))}
      </ol>
      <p className="bx-lead bx-lead-narrow">{ROUTING.after}</p>
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
      {[MESSAGES.coho, MESSAGES.tailspin].map((msg) => (
        <Message key={msg.label} label={msg.label} lang={msg.lang}>
          {msg.text}
        </Message>
      ))}
    </MessageRow>
  );
}

export function MachineFigures() {
  return (
    <FigureRow>
      {MACHINE_FIGURES.map((f) => (
        <Figure key={f.src} src={f.src} width={f.width} height={f.height} alt={f.alt} caption={f.caption} />
      ))}
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
      {c1 && <ArrowLink href={entryUrl(C1_SLUG)}>{C1_LINK}</ArrowLink>}
    </LinkRow>
  );
}
