// Display-only: visitors read "Day 1" / "Day 2", never the recording-session ids (S01...S16 are Day 1,
// S17 and later are Day 2). Never use this for lookup keys, ids, card names or file names.
export function dayOf(session: string | null | undefined): string {
  if (!session) return "";
  const m = /^S?(\d+)$/i.exec(session.trim());
  if (!m) return session;
  return Number(m[1]) >= 17 ? "Day 2" : "Day 1";
}

/** Rewrite every standalone session id inside a visible string: "S10, 16:33" -> "Day 1, 16:33". */
export function dayLabel(text: string): string {
  return text.replace(/\bS(\d{2})\b(?!-)/g, (_, n: string) => dayOf(n));
}
