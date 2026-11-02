import { readFileSync } from "node:fs";
import path from "node:path";
import { cardSize, renderCard } from "./card";
import { layoutCard, readFontMetrics } from "./og-layout";

// The /demos link-preview image, in the entries' card template.

export const size = cardSize;
export const contentType = "image/png";
export const alt = "GTM demos by Alex Alderman, from the Hire Me Hackathon";

const TITLE = "GTM demos, written up or on video";
const ACCENT = "GTM demos";

export default async function Image() {
  const font = readFontMetrics(
    readFileSync(path.join(/* turbopackIgnore: true */ process.cwd(), "app", "demos", "_og", "InterTight-Medium.ttf")),
  );
  const { lines } = layoutCard(font, { kicker: "Hire Me Hackathon", title: TITLE, accent: ACCENT }, { prefix: false });
  return renderCard({ kicker: "Hire Me Hackathon", lines, accent: ACCENT });
}
