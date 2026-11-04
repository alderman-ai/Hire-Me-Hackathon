import ceo from "@/content/for-copy/ceo.json";

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
