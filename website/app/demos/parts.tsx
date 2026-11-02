import { capitalise, countWord, formatDate, formatNumber, type Entry, type Made } from "./entries";
import videos from "@/content/videos.json";

// Pieces shared by the entry page and the index.

/** The cover's art: the kit's two glows on the right, placed as on the link-preview card. */
export function CoverGlow() {
  return (
    <div className="entry-glow" aria-hidden="true">
      <span className="entry-glow-hero" />
      <span className="entry-glow-contact" />
    </div>
  );
}

/** The byline's ring mark (the card's, at 32 px). */
export function RingMark() {
  return (
    <svg className="entry-mark" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="entry-mark-grad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" className="entry-mark-a" />
          <stop offset="1" className="entry-mark-b" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="22.5" fill="none" stroke="url(#entry-mark-grad)" strokeWidth="3" />
      <circle cx="24" cy="24" r="8" fill="url(#entry-mark-grad)" />
    </svg>
  );
}

/** The cover title, in its given lines (or balanced by CSS), with the accent phrase in the gradient. */
export function CoverTitle({ entry, id }: { entry: Entry; id: string }) {
  const { title, cover } = entry;
  const accented = (text: string) => {
    if (!cover.accent) return text;
    const at = text.indexOf(cover.accent);
    if (at < 0) return text;
    return (
      <>
        {text.slice(0, at)}
        <span className="entry-accent">{cover.accent}</span>
        {text.slice(at + cover.accent.length)}
      </>
    );
  };
  if (cover.title_lines) {
    return (
      <h1 id={id} className="entry-title has-lines">
        {cover.title_lines.map((line, i) => (
          <span key={i} className="entry-title-line">
            {accented(line)}
            {i < cover.title_lines!.length - 1 ? " " : ""}
          </span>
        ))}
      </h1>
    );
  }
  return (
    <h1 id={id} className="entry-title">
      {accented(title)}
    </h1>
  );
}

/** POST-FORMAT §4: the "How this post was made" box, from `made`. */
export function MadeBox({ made, what }: { made: Made; what: string }) {
  const minutes = `${made.minutes_talked} minute${made.minutes_talked === 1 ? "" : "s"}`;
  const prompts = made.stages.filter((s) => !made.checks.includes(s)).map(capitalise);
  const checks = made.checks.map(capitalise);
  const [d, t] = made.dictated.split("T");
  const videoIds: Record<string, string | undefined> = videos;
  const sessionVideo = made.rig_session ? videoIds[made.rig_session] : undefined;
  const steps = [
    { label: "Input", value: `Alex's dictation, ${minutes}, ${formatNumber(made.words_spoken)} words` },
    { label: "Prompts", value: prompts.join(" → ") },
    { label: "Checks", value: checks.join(" → ") },
    { label: "Output", value: `this ${what}, ${formatNumber(made.words_drafted)} words` },
  ];
  return (
    <section className="entry-made" aria-labelledby="how-this-was-made">
      <h2 id="how-this-was-made" className="entry-made-title">
        How this {what} was made
      </h2>
      <p className="entry-made-lead">
        Alex talked this {what} through for {minutes} ({formatNumber(made.words_spoken)} words). The blog pipeline
        drafted it from his dictation in his words, in {countWord(made.stages.length)} checked stages (
        {formatNumber(made.words_drafted)} words)
        {made.share_changed_by_alex === null
          ? "."
          : `; Alex edited and approved it, changing ${made.share_changed_by_alex}% of the words.`}
      </p>
      <ol className="entry-made-steps">
        {steps.map((s) => (
          <li key={s.label} className="entry-made-step">
            <span className="entry-made-label">{s.label}</span>
            <span className="sr-only">: </span>
            <span className="entry-made-value">{s.value}</span>
          </li>
        ))}
      </ol>
      <p className="entry-made-details">
        Dictated {formatDate(d)}, {t} Prague time · {made.pipeline}
        {made.rig_session && (
          <>
            {" · Filmed in session "}
            {sessionVideo ? (
              <a href={`https://www.youtube.com/watch?v=${sessionVideo}`}>{made.rig_session}</a>
            ) : (
              made.rig_session
            )}
          </>
        )}
      </p>
    </section>
  );
}
