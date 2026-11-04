import ceo from "@/content/for-copy/ceo.json";
import { IS_PRODUCTION_BUILD } from "../../flags";

// Per-page words for a /for/<slug> page that arrive from orchestration as {key: text} (through alex-voice),
// kept verbatim in content/for-copy/<slug>.json so a new batch drops straight in. Keys starting with "_"
// are notes, never words. A page gets a file here only when its words are recalibrated (4 Nov: the CEO's).
//
// A value starting with PLACEHOLDER is plumbing waiting for words: previews show it as is, so it reads as a
// placeholder on the page; callers keep it out of production (see `ready`).

const FILES: Record<string, Record<string, unknown>> = { ceo };

export const PLACEHOLDER = "[placeholder]";

/** True when a value, or anything inside it, is still a placeholder. */
export function isPlaceholder(v: unknown): boolean {
  if (typeof v === "string") return v.trimStart().startsWith(PLACEHOLDER);
  if (Array.isArray(v)) return v.some(isPlaceholder);
  if (v && typeof v === "object") return Object.values(v).some(isPlaceholder);
  return false;
}

/** The page's words file, or undefined when it has none. */
export function forCopy(slug: string): Record<string, unknown> | undefined {
  return FILES[slug];
}

/** One key's value: a non-empty string, or undefined. */
export function forText(slug: string, key: string): string | undefined {
  const v = FILES[slug]?.[key];
  return typeof v === "string" && v.trim() ? v : undefined;
}

/** One key's raw value (a string, a list, ...), or undefined. */
export function forValue(slug: string, key: string): unknown {
  return FILES[slug]?.[key];
}

/** The slugs that have a words file. */
export function forCopySlugs(): string[] {
  return Object.keys(FILES);
}

/**
 * A list sent as flat keys ("agent.ceo.order[0].url", "agent.ceo.order[0].why", ...) as objects in index
 * order; a key sent as a real list is returned as is.
 */
export function forList(slug: string, prefix: string): Record<string, string>[] {
  const words = FILES[slug];
  if (!words) return [];
  if (Array.isArray(words[prefix])) return words[prefix] as Record<string, string>[];
  const re = new RegExp(`^${prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\[(\\d+)\\]\\.(\\w+)$`);
  const out = new Map<number, Record<string, string>>();
  for (const [k, v] of Object.entries(words)) {
    const m = re.exec(k);
    if (!m || typeof v !== "string") continue;
    const i = Number(m[1]);
    out.set(i, { ...(out.get(i) ?? {}), [m[2]]: v });
  }
  return [...out.keys()].sort((a, b) => a - b).map((i) => out.get(i)!);
}

/**
 * A recalibrated page (app/for/[slug]/recal.tsx): a words file with a title. On a production build, only
 * once no word in it is a placeholder.
 */
export function recalReady(slug: string): boolean {
  const words = FILES[slug];
  if (!words || !forText(slug, "title")) return false;
  if (!IS_PRODUCTION_BUILD) return true;
  return !Object.entries(words).some(([k, v]) => !k.startsWith("_") && isPlaceholder(v));
}
