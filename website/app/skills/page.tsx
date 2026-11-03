import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import data from "@/content/skills.json";
import { t, type CopyKey } from "../copy";
import { SKILLS_PAGE } from "../flags";
import { Band, CrmBand, EyebrowRow } from "../best/parts";
import { markdownAlternate } from "../page-meta";
import { HOME_SKILLS_TITLE } from "../home/home-words";
import "./skills.css";
import { dayOf } from "../day-label";

// /skills (VERDICT.md W14; orchestration\local\mockups\best\BUILD.md 8): the 20 public skills, four groups.
// Each card's id is the skill's id, because every "Skills behind this" chip links /skills#<id>. The list is
// content/skills.json (from the library's skills.json: public_ok, Canva out). Only a build with SKILLS_PAGE
// answers; any other build 404s and the menu leaves it out.

export const metadata: Metadata = {
  title: "Skills · Hire Me Hackathon",
  alternates: { canonical: "/skills", types: markdownAlternate("/skills") },
};

type Item = {
  id: string;
  name: string;
  line: string;
  path?: string;
  link?: { href: string; label: string };
  moment?: { time: string; session: string; text: string };
};
type Group = { title: string; items: Item[] };

const HERO_QUOTE = HOME_SKILLS_TITLE;

export default function SkillsPage() {
  if (!SKILLS_PAGE) notFound();
  const groups = data.groups as Group[];

  return (
    <main>
      <Band tone="dark" glow labelledBy="skills-title">
        <EyebrowRow>Skills</EyebrowRow>
        <h1 id="skills-title" className="sk-h1">
          {HERO_QUOTE}
        </h1>
        <p className="bx-lead sk-hero-lead">{t("skills.hero.1")}</p>
      </Band>

      <Band tone="ink" label="The skills">
        {groups.map((g, gi) => (
          <div className="sk-group" key={g.title}>
            <div className="bx-eyebrow-row">
              <span className="bx-eyebrow-line" aria-hidden="true" />
              <h2 className="bx-eyebrow sk-group-title" id={`skills-group-${gi + 1}`}>
                {t(g.title as CopyKey)}
              </h2>
            </div>
            <ul className="sk-list" aria-labelledby={`skills-group-${gi + 1}`}>
              {g.items.map((s) => (
                <li className="sk-card" id={s.id} key={s.id}>
                  <h3 className="sk-name">{s.name}</h3>
                  <p className="sk-line">
                    {t(s.line as CopyKey)}
                    {s.link && (
                      <>
                        {" "}
                        <Link href={s.link.href}>{s.link.label}</Link>
                      </>
                    )}
                  </p>
                  {s.moment && (
                    <blockquote className="sk-moment">
                      <span>
                        {s.moment.time} &middot; {dayOf(s.moment.session)}
                      </span>
                      &ldquo;{s.moment.text}&rdquo;
                    </blockquote>
                  )}
                  {s.path && <p className="sk-path">{s.path}</p>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Band>

      <CrmBand />
    </main>
  );
}
