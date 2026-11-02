import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { CARD, measure, readFontMetrics } from "../../demos/og-layout";
import { avToken, gradientStops } from "../../demos/tokens";
import { findStakeholder, firstName, greetingParts, stakeholderSlugs } from "../../stakeholders";

// Each person's link preview, 1200 x 630: what LinkedIn and email show when Alex sends the link.
// The page stays noindex; previews still unfurl.
//
// With a landing that may show (app/stakeholders.ts: `next dev`, or `landing.approved` true): the
// greeting's hello ("Hi Ivana.") large on the left, their portrait on the right as Addvery's team card,
// and the byline the GTM demos cards use (ring mark, "Alex Alderman"). Same frame, black, glow, font
// and 64 px margins as app/demos/card.tsx; the font and the glow are read from app/demos/_og/.
// Without one, this returns the site-wide card (app/opengraph-image.png) unchanged, so a page whose
// landing isn't approved previews exactly as before and no name or face reaches a preview early.
//
// The portrait is public/people/<slug>-og.jpg (Satori can't read WebP; scripts/people_og.py makes the
// copies). Git-ignored like the WebPs, read at build time. If it's missing, the card goes without it.

export const dynamicParams = false;

export function generateStaticParams() {
  return stakeholderSlugs().map((slug) => ({ slug }));
}

export const size = { width: CARD.width, height: CARD.height };
export const contentType = "image/png";
export const alt = "A page for you from Alex Alderman's Hire Me Hackathon, his job application to Addvery";

/** A path under the project root (the build's working directory). */
const fromRoot = (...parts: string[]) => path.join(/* turbopackIgnore: true */ process.cwd(), ...parts);

// Geometry: the portrait fills the right-hand side inside the margins, at 4:5.
const PHOTO = { width: 402, height: 502 };
const PHOTO_LEFT = CARD.width - CARD.margin - PHOTO.width;
const COLUMN = PHOTO_LEFT - CARD.margin - 56;
const HELLO = { max: 132, min: 72, tracking: -0.04 };
const KICKER = "A page for you";

async function readOptional(file: string): Promise<Buffer | null> {
  try {
    return await readFile(file);
  } catch {
    return null;
  }
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = findStakeholder(slug);
  if (!page) return new Response("Not found", { status: 404 });

  if (!page.landing) {
    const site = await readFile(fromRoot("app", "opengraph-image.png"));
    return new Response(new Uint8Array(site), { headers: { "Content-Type": "image/png" } });
  }

  const [font, glow, photo] = await Promise.all([
    readFile(fromRoot("app", "demos", "_og", "InterTight-Medium.ttf")),
    readFile(fromRoot("app", "demos", "_og", "glow.jpg")),
    readOptional(fromRoot("public", "people", `${slug}-og.jpg`)),
  ]);
  if (!photo) console.warn(`/for/${slug} link card: no public/people/${slug}-og.jpg (run scripts/people_og.py)`);

  // The greeting's own hello when it's short, else "Hi <first name>.", set as large as fits the column.
  const parts = greetingParts(page.landing.greeting);
  const hello = parts.long ? `Hi ${firstName(page)}.` : parts.hello;
  const metrics = readFontMetrics(font);
  let helloSize = HELLO.max;
  while (helloSize > HELLO.min && measure(metrics, hello, { size: helloSize, tracking: HELLO.tracking }) > COLUMN) helloSize -= 4;

  const black = avToken("--av-black");
  const white = avToken("--av-white");
  const body = avToken("--av-text-on-dark");
  const line = avToken("--av-line-on-dark");
  const outline = avToken("--av-border-photo");
  const [violet, orchid] = gradientStops("--av-gradient-row");
  const { margin, bar, kicker, hairline, mark, byline } = CARD;
  // The hello sits centred between the kicker and the hairline.
  const helloTop = Math.round(kicker.top + kicker.lineHeight + (hairline.top - kicker.top - kicker.lineHeight - helloSize) / 2);

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
          {KICKER}
        </div>

        <div
          style={{
            position: "absolute",
            left: margin,
            top: helloTop,
            width: COLUMN,
            display: "flex",
            fontSize: helloSize,
            lineHeight: `${helloSize}px`,
            letterSpacing: `${HELLO.tracking}em`,
            whiteSpace: "pre",
          }}
        >
          {hello}
        </div>

        <div style={{ position: "absolute", left: margin, top: hairline.top, width: COLUMN, height: hairline.height, background: line }} />

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
