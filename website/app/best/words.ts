import { t } from "../copy";

// Shared lines of the best-of parts (app/best/parts.tsx renders them). A plain module, so the agent track
// (lib/agent-track) reads them too.

/** The four things he can't show yet. The first is shared.limits.1. */
export function limitsDefault(): string[] {
  return [
    t("shared.limits.1"),
    "The Czech and German still need a native read.",
    "The leads are fictional, with one public fact each and nothing private.",
    "Nothing is trained here.",
  ];
}

/** His line from 20:45 on build day. */
export const CRM_LINE =
  "Imagine your conversion rate if this is how you reached out to everyone in your CRM. Not only is it possible but the ROI would be unbelievable.";

