import { t } from "../copy";
import { MATRIX_HITS, Matrix, Message, MessageRow, VideoFrame } from "../best/parts";
import { LEAD_FIELDS, LEAD_STEPS, LEAD_TAG, LEAD_TITLE, type LeadTag } from "./lead-card-words";

// The home's lead card (section 4): the made-up lead Litware Stream CZ, its seven exported fields, then
// five steps to its first message, each step on its own coloured rule and each answer tagged with who
// settled it: Rule (violet fill, white text), Jev (orchid fill, ink text), Person (lavender outline).
// Words: lead-card-words.ts. Styles: home.css, "The lead card". Headings: h3 for the card, h4 per step.

function Tag({ tag }: { tag: LeadTag }) {
  return <span className={`lc-tag lc-tag-${tag}`}>{t(LEAD_TAG[tag])}</span>;
}

export function LeadCard() {
  const litware = MATRIX_HITS[0];
  return (
    <div className="lc">
      <h3 className="lc-title">{t(LEAD_TITLE)}</h3>
      <dl className="lc-fields">
        {LEAD_FIELDS.map((f) => (
          <div key={f.label}>
            <dt>{t(f.label)}</dt>
            <dd>{t(f.value)}</dd>
          </div>
        ))}
      </dl>
      <ol className="lc-steps">
        {LEAD_STEPS.map((s) => (
          <li key={s.title} className={`lc-step lc-${s.tone}`}>
            <h4 className="lc-step-title">{t(s.title)}</h4>
            {s.lead && <p className="lc-lead">{t(s.lead)}</p>}
            {s.lines && (
              <ul className="lc-lines">
                {s.lines.map((l) => (
                  <li key={l.text}>
                    <Tag tag={l.tag} />
                    <span>{t(l.text)}</span>
                  </li>
                ))}
              </ul>
            )}
            {s.clip && (
              <div className="lc-clip">
                <VideoFrame
                  size="sm"
                  mode="dialog"
                  youtube={s.clip.youtube}
                  label={t(s.clip.label)}
                  caption={t(s.clip.caption)}
                  meta={t(s.clip.meta)}
                  length={s.clip.length}
                  still={s.clip.still}
                />
              </div>
            )}
            {s.caveat && <p className="lc-caveat">{t(s.caveat)}</p>}
            {s.text && <p className="lc-text">{t(s.text)}</p>}
            {s.matrix && (
              <div className="lc-matrix">
                <Matrix legend={t(s.matrix.legend)} shownLegend={null} hits={[litware]} shown={0} />
              </div>
            )}
            {s.messages && (
              <div className="lc-messages">
                <MessageRow>
                  <Message label={t(s.messages.labelCs)} lang="cs">
                    {t(s.messages.cs)}
                  </Message>
                  <Message label={t(s.messages.labelEn)}>{t(s.messages.en)}</Message>
                </MessageRow>
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
