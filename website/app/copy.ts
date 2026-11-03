import words from "@/content/site-copy.json";
import skills from "@/content/skills.json";

// The best-of build's new words (orchestration\local\mockups\best\BUILD.md, "Draft spans"): one string
// per key, kept in content/site-copy.json. The values start as the mockup's drafts; orchestration's
// alex-voice pass replaces them by key (RULES.md rule 2). A shared.* key is one string used on several
// pages. A missing key is a build error, so a typo can't ship an empty line.

export type CopyKey = keyof typeof words;

/** How many skills /skills shows (content/skills.json): copy says {skills} instead of a number, so no count disagrees. */
export const SKILL_COUNT = (skills.groups as { items: unknown[] }[]).reduce((n, g) => n + g.items.length, 0);

export function t(key: CopyKey): string {
  const v = (words as Record<string, string>)[key];
  if (typeof v !== "string" || !v.trim()) throw new Error(`content/site-copy.json: no words for "${key}"`);
  return v.replace(/\{skills\}/g, String(SKILL_COUNT));
}
