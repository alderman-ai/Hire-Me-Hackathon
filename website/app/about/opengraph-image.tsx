import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { CARD } from "../articles/og-layout";
import { avToken, gradientStops } from "../articles/tokens";

// /about's link preview, 1200 x 630, in the site's card template: the frame, black, glow, font and
// 64 px margins of app/demos/card.tsx, laid out like the /for cards (title left, the portrait right as
// Addvery's team card). The portrait is Alex's headshot, unaltered: public/about/alex-headshot-og.jpg is
// the alderman.ai file resized (scripts/about_assets.py; Satori can't read WebP), git-ignored and read
// at build time. If it's missing, the card goes without it.

export const size = { width: CARD.width, height: CARD.height };
export const contentType = "image/png";
export const alt = "About Alex Alderman: his portrait beside the title";

const fromRoot = (...parts: string[]) => path.join(/* turbopackIgnore: true */ process.cwd(), ...parts);

const PHOTO = { width: 402, height: 502 };
const PHOTO_LEFT = CARD.width - CARD.margin - PHOTO.width;
const LINES = ["About Alex", "Alderman"];
const BYLINE = "Marketer turned GTM engineer";

async function readOptional(file: string): Promise<Buffer | null> {
  try {
    return await readFile(file);
  } catch {
    return null;
  }
}

export default async function Image() {
  const [font, glow, photo] = await Promise.all([
    readFile(fromRoot("app", "articles", "_og", "InterTight-Medium.ttf")),
    readFile(fromRoot("app", "articles", "_og", "glow.jpg")),
    readOptional(fromRoot("public", "about", "alex-headshot-og.jpg")),
  ]);
  if (!photo) console.warn("/about link card: no public/about/alex-headshot-og.jpg (run scripts/about_assets.py)");

  const black = avToken("--av-black");
  const white = avToken("--av-white");
  const body = avToken("--av-text-on-dark");
  const line = avToken("--av-line-on-dark");
  const outline = avToken("--av-border-photo");
  const [violet, orchid] = gradientStops("--av-gradient-row");
  const { margin, bar, kicker, title, hairline, mark, byline } = CARD;
  const column = PHOTO_LEFT - margin - 56;

  const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
    <defs><linearGradient id="m" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="${violet}"/><stop offset="1" stop-color="${orchid}"/></linearGradient></defs>
    <circle cx="24" cy="24" r="22.5" fill="none" stroke="url(#m)" stroke-width="3"/>
    <circle cx="24" cy="24" r="8" fill="url(#m)"/>
  </svg>`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: black, color: white, fontFamily: "Inter Tight" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`data:image/jpeg;base64,${glow.toString("base64")}`} width={CARD.width} height={CARD.height} alt="" style={{ position: "absolute", left: 0, top: 0 }} />

        <div style={{ position: "absolute", left: margin, top: bar.top, width: bar.width, height: bar.height, backgroundImage: avToken("--av-gradient-row") }} />

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
          Hire Me Hackathon
        </div>

        <div
          style={{
            position: "absolute",
            left: margin,
            top: title.top,
            width: column,
            display: "flex",
            flexDirection: "column",
            fontSize: title.size,
            lineHeight: `${title.lineHeight}px`,
            letterSpacing: `${title.tracking}em`,
          }}
        >
          {LINES.map((l) => (
            <div key={l} style={{ display: "flex", whiteSpace: "pre" }}>
              {l}
            </div>
          ))}
        </div>

        <div style={{ position: "absolute", left: margin, top: hairline.top, width: column, height: hairline.height, background: line }} />

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
            fontSize: 30,
            lineHeight: `${byline.lineHeight}px`,
            letterSpacing: `${byline.tracking}em`,
            color: white,
            whiteSpace: "pre",
          }}
        >
          {BYLINE}
        </div>

        {photo && (
          <div
            style={{
              position: "absolute",
              left: PHOTO_LEFT,
              top: margin,
              width: PHOTO.width,
              height: PHOTO.height,
              display: "flex",
              overflow: "hidden",
              border: `1px solid ${outline}`,
              borderRadius: 15,
              background: black,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`data:image/jpeg;base64,${photo.toString("base64")}`} width={PHOTO.width} height={PHOTO.height} alt="" style={{ objectFit: "cover" }} />
          </div>
        )}
      </div>
    ),
    { ...size, fonts: [{ name: "Inter Tight", data: font, weight: 500, style: "normal" }] },
  );
}
