import { NEW_SITE } from "./flags";

// The old demo pages that move on the new site (VERDICT.md 2.7). Only a NEW_SITE build redirects;
// production keeps every page where it is until a checkpoint.
const MOVED: Record<string, string> = {
  // W5: the 36 workflows are capability piece C2 now.
  d3: "/demos/36-outbound-workflows-and-the-one-variable-behind-them",
};

/** Where an old demo page now lives on the new site, or undefined. */
export function movedTo(slug: string): string | undefined {
  return NEW_SITE ? MOVED[slug] : undefined;
}
