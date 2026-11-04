"use client";

import { usePathname } from "next/navigation";

// The footer's one line, on every page of the new site except the ones below (4 Nov, Alex: no
// keep-the-promise framing on the CEO's page). A client component so the shared footer can leave it out
// by path: the server render of a hidden path has no line at all, not a hidden one.

const HIDDEN_ON = new Set(["/for/ceo"]);

export function FooterLine() {
  const path = (usePathname() ?? "/").replace(/\/+$/, "") || "/";
  if (HIDDEN_ON.has(path)) return null;
  return <p className="footer-line">GTM engineers who focus AI on the pipeline are the ones helping companies keep their promise.</p>;
}
