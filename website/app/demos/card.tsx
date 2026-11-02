import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { CARD, splitAccent } from "./og-layout";
import { avToken, gradientStops } from "./tokens";

// The link-preview card, 1200 x 630, shared by /demos and every entry (see opengraph-image.tsx in
// each). Layout: S-D5's re-skinned link-card mockup (blog-articles/VISUALS.md, "link";
// blog-articles/local/visuals/out/a01-link-1200x630.png): margins 64 top, left and right, 96 bottom;
// the gradient bar, kicker 36/40, headline 72/80 in an 800 px column, the hairline at 454 and the ring
// mark by the name. The art is the kit's two glows (public/addvery/glow-*.avif) placed as in the
// mockup's backdrop and flattened to _og/glow.jpg, since Satori can't read AVIF. Colours come from
// app/addvery-tokens.css; the font is Inter Tight Medium (Latin subset, OFL) in _og/.
// The lines come from og-layout.ts, which has already measured them (and failed the build past 3).

const OG = path.join(/* turbopackIgnore: true */ process.cwd(), "app", "demos", "_og");

export const cardSize = { width: CARD.width, height: CARD.height };

export async function renderCard(text: { kicker: string; lines: string[]; accent?: string }) {
  const [font, glow] = await Promise.all([
    readFile(path.join(OG, "InterTight-Medium.ttf")),
    readFile(path.join(OG, "glow.jpg")),
  ]);
  const black = avToken("--av-black");
  const white = avToken("--av-white");
  const body = avToken("--av-text-on-dark");
  const line = avToken("--av-line-on-dark");
  const [violet, orchid] = gradientStops("--av-gradient-row");
  const { margin, bar, kicker, title, hairline, mark, byline } = CARD;

  const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
    <defs><linearGradient id="m" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="${violet}"/><stop offset="1" stop-color="${orchid}"/></linearGradient></defs>
    <circle cx="24" cy="24" r="22.5" fill="none" stroke="url(#m)" stroke-width="3"/>
    <circle cx="24" cy="24" r="8" fill="url(#m)"/>
  </svg>`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: black,
          color: white,
          fontFamily: "Inter Tight",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/jpeg;base64,${glow.toString("base64")}`}
          width={CARD.width}
          height={CARD.height}
          alt=""
          style={{ position: "absolute", left: 0, top: 0 }}
        />

        <div
          style={{
            position: "absolute",
            left: margin,
            top: bar.top,
            width: bar.width,
            height: bar.height,
            backgroundImage: avToken("--av-gradient-row"),
          }}
        />

        <div
          style={{
            position: "absolute",
            left: margin,
            top: kicker.top,
            display: "flex",
            fontSize: kicker.size,
            lineHeight: `${kicker.lineHeight}px`,
            letterSpacing: `${kicker.tracking}em`,
            textTransform: "uppercase",
            color: body,
            whiteSpace: "pre",
          }}
        >
          {text.kicker}
        </div>

        <div
          style={{
            position: "absolute",
            left: margin,
            top: title.top,
            display: "flex",
            flexDirection: "column",
            fontSize: title.size,
            lineHeight: `${title.lineHeight}px`,
            letterSpacing: `${title.tracking}em`,
          }}
        >
          {text.lines.map((l, i) => {
            const parts = splitAccent(l, text.accent);
            return (
              <div key={i} style={{ display: "flex", whiteSpace: "pre" }}>
                {parts ? (
                  <>
                    {parts.before && <span>{parts.before}</span>}
                    <span
                      style={{
                        backgroundImage: avToken("--av-gradient-text"),
                        backgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      {parts.accent}
                    </span>
                    {parts.after && <span>{parts.after}</span>}
                  </>
                ) : (
                  <span>{l}</span>
                )}
              </div>
            );
          })}
        </div>

        <div
          style={{
            position: "absolute",
            left: margin,
            top: hairline.top,
            width: CARD.width - 2 * margin,
            height: hairline.height,
            background: line,
          }}
        />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/svg+xml;base64,${Buffer.from(markSvg).toString("base64")}`}
          width={mark.size}
          height={mark.size}
          alt=""
          style={{ position: "absolute", left: margin, top: mark.top }}
        />

        <div
          style={{
            position: "absolute",
            left: byline.left,
            top: byline.top,
            display: "flex",
            fontSize: byline.size,
            lineHeight: `${byline.lineHeight}px`,
            letterSpacing: `${byline.tracking}em`,
            color: white,
          }}
        >
          Alex Alderman
        </div>
      </div>
    ),
    {
      ...cardSize,
      fonts: [{ name: "Inter Tight", data: font, weight: 500, style: "normal" }],
    },
  );
}
