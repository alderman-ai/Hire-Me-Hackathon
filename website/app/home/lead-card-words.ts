// The home's lead card (4 Nov, section 4 "proof"): one made-up lead, Litware Stream CZ (getsales\routing\
// sample.csv row L11), from its LinkedIn export to its first message. Only copy keys here (content/
// site-copy.json, read with t()), no React and no CSS, so the page (lead-card.tsx) and the agent track
// (lib/agent-track, index.md) read exactly the same words in the same order.

import type { CopyKey } from "../copy";

export type LeadTag = "rule" | "jev" | "person";

/** The pill words: "Rule" violet, "Jev" orchid, "Person" a lavender outline (lead-card.tsx). */
export const LEAD_TAG: Record<LeadTag, CopyKey> = {
  rule: "home.proof.tag.rule",
  jev: "home.proof.tag.jev",
  person: "home.proof.tag.person",
};

export const LEAD_TITLE: CopyKey = "home.proof.card.title";

/** The seven fields, in order: label and value keys. first_name is never shown. */
export const LEAD_FIELDS: { label: CopyKey; value: CopyKey }[] = (
  ["company", "job", "country", "industry", "staff", "language", "news"] as const
).map((k) => ({ label: `home.proof.card.field.${k}` as CopyKey, value: `home.proof.card.value.${k}` as CopyKey }));

export type LeadStep = {
  /** The step's 3 px rule: violet, orchid, lavender, or the violet-to-orchid gradient. */
  tone: "violet" | "orchid" | "lavender" | "gradient";
  /** Carries its own number ("1. Rules go first"). */
  title: CopyKey;
  lead?: CopyKey;
  /** Tagged lines: who settled each answer. */
  lines?: { tag: LeadTag; text: CopyKey }[];
  /** Muted, untagged. */
  caveat?: CopyKey;
  text?: CopyKey;
  /** The Jev clip (step 2). */
  clip?: { youtube: string; label: CopyKey; caption: CopyKey; meta: CopyKey; length: string; poster: string };
  /** The matrix with only this lead's cell lit (step 4). */
  matrix?: { legend: CopyKey };
  /** Message 1 in Czech, then in English (step 5). */
  messages?: { labelCs: CopyKey; cs: CopyKey; labelEn: CopyKey; en: CopyKey };
};

export const LEAD_STEPS: LeadStep[] = [
  {
    tone: "violet",
    title: "home.proof.step1.title",
    lead: "home.proof.step1.lead",
    lines: [
      { tag: "rule", text: "home.proof.step1.rule_industry" },
      { tag: "rule", text: "home.proof.step1.rule_language" },
      { tag: "rule", text: "home.proof.step1.rule_news" },
    ],
  },
  {
    tone: "orchid",
    title: "home.proof.step2.title",
    lead: "home.proof.step2.lead",
    lines: [
      { tag: "jev", text: "home.proof.step2.jev_icp" },
      { tag: "rule", text: "home.proof.step2.rule_staff" },
      { tag: "jev", text: "home.proof.step2.jev_case" },
    ],
    // Clip S18-c4: the Jev explanation, 59 s (from the walkthrough _vgNB5ubKjA, 636 to 695 s).
    clip: {
      youtube: "rDUsnHrAwv0",
      label: "home.proof.step2.clip.label",
      caption: "home.proof.step2.clip.caption",
      meta: "home.proof.step2.clip.meta",
      length: "0:59",
      poster: "https://i.ytimg.com/vi/rDUsnHrAwv0/maxresdefault.jpg",
    },
  },
  {
    tone: "lavender",
    title: "home.proof.step3.title",
    lines: [{ tag: "person", text: "home.proof.step3.text" }],
    caveat: "home.proof.step3.caveat",
  },
  {
    tone: "gradient",
    title: "home.proof.step4.title",
    text: "home.proof.step4.text",
    matrix: { legend: "home.proof.step4.matrix_legend" },
  },
  {
    tone: "gradient",
    title: "home.proof.step5.title",
    messages: {
      labelCs: "home.proof.step5.label_cs",
      cs: "home.proof.step5.message_cs",
      labelEn: "home.proof.step5.label_en",
      en: "home.proof.step5.message_en",
    },
  },
];
