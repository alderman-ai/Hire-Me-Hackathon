import skills from "@/content/skills.json";
import { t } from "../copy";
import { pageHref } from "../recommend";
import { Band, Chip, ChipList, EyebrowRow } from "../best/parts";
import { MachineMatrix } from "../best/machine";
import "./slots.css";

// The C2 additions (best-of build, BUILD.md 7). The entry's Markdown holds empty markers, `> [!slot] matrix`,
// `why` and `again` (markdown.ts turns each into <div data-slot="...">); app/demos/[slug]/page.tsx splits
// the HTML there and puts these parts in. An entry with no markers renders exactly as before, and on a
// build without NEW_SITE the markers render nothing, so the live entry is unchanged.

export type SlotName = "matrix" | "why" | "again";

const PIPELINE_ID = "art-pipeline-promise";
const PIPELINE_TITLE = "If AI won't replace half your team, put it in your pipeline";

/** The four skills that sit behind the 36 workflows (entry.html's "Skills behind this"). */
export const C2_SKILLS = ["icp-grid-from-client-site", "lead-router", "outbound-workflow-factory", "account-people-classifier"];

function skillName(id: string): string {
  for (const g of skills.groups) for (const s of g.items) if (s.id === id) return s.name;
  throw new Error(`content/skills.json: no skill "${id}"`);
}

export function Slot({ name }: { name: SlotName }) {
  if (name === "matrix") {
    return (
      <div className="entry-track">
        <div className="c2-matrix bx-band bx-light on-light">
          <MachineMatrix legend={t("entry.matrix.1")} />
        </div>
      </div>
    );
  }
  if (name === "why") {
    const href = pageHref(PIPELINE_ID);
    return (
      <div className="entry-track entry-prose">
        <h2 id="why-i-built-this-first">{t("entry.why.1")}</h2>
        <p>
          That&apos;s the niche. So good they think you spent three days building it just for them, when an agent was running in the
          background for a couple of hours. Now picture your top 100 accounts getting that. Would it be valuable?{" "}
          <strong>That&apos;s new work coming in, with nobody cut.</strong>
        </p>
        <figure className="entry-quote">
          <blockquote>
            <p>
              The first place you need to put AI is in your pipeline, so that you can upskill your people to get more done and at the
              same time bring in more work.
            </p>
          </blockquote>
          <figcaption>{href ? <a href={href}>{PIPELINE_TITLE}</a> : PIPELINE_TITLE}</figcaption>
        </figure>
      </div>
    );
  }
  return (
    <div className="entry-track entry-prose">
      <h2 id="runs-again-on-the-next-account">{t("entry.again.1")}</h2>
      <dl className="c2-io">
        <dt>{t("entry.again.2")}</dt>
        <dd>For a client, that&apos;s a Sales Navigator search per ICP, exported to CSV.</dd>
        <dt>{t("entry.again.3")}</dt>
        <dd>{t("entry.again.4")}</dd>
        <dt>{t("entry.again.5")}</dt>
        <dd>{t("entry.again.6")}</dd>
      </dl>
    </div>
  );
}

/** "Skills behind this": four chips to their cards on /skills. Render only where /skills exists. */
export function SkillsBehind() {
  return (
    <Band tone="lilac" pad="sm" labelledBy="c2-skills">
      <EyebrowRow id="c2-skills">Skills behind this</EyebrowRow>
      <ChipList>
        {C2_SKILLS.map((id) => (
          <Chip key={id} skill={id}>
            {skillName(id)}
          </Chip>
        ))}
      </ChipList>
    </Band>
  );
}
