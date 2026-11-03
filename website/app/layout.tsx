import type { Metadata } from "next";
import { Inter, Inter_Tight, Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./addvery-tokens.css";
import "./globals.css";
import { SiteHeader } from "./site-chrome";
import { SiteFooter } from "./site-footer";
import stakeholders from "@/content/stakeholders.json";
import { NEW_SITE, SKILLS_PAGE, VIDEO_WALL } from "./flags";
import { YourPagePill } from "./your-page";
import { newNavLinks } from "./site-links";
import { t } from "./copy";
import type { HackWords } from "./hack-strip";
import videos from "@/content/videos.json";

// The hackathon menu bar above the header (app/hack-strip.tsx), on the new site only. Day 1's menu points
// into /log's sections; an item shows once its section is on the page (`ready`).
const HACK_ITEMS = [
  { href: "/log#highlights", label: "hack.menu.highlights", ready: true },
  { href: "/log#timelapse", label: "hack.menu.timelapse", ready: false },
  { href: "/log#feed", label: "hack.menu.feed", ready: true },
] as const;
// Day 2's cell (Alex, 3 Nov: a "Day 2 Update" button on the bar) shows once S17's video is uploaded.
const DAY2_READY = Boolean((videos as Record<string, string | undefined>).S17);
const HACK: HackWords | undefined = NEW_SITE
  ? {
      live: t("hack.status.live"),
      onBreak: t("hack.status.break"),
      finished: t("hack.status.finished"),
      built: t("hack.status.built"),
      menuLabel: "Hire Me Hackathon",
      groups: [
        { items: HACK_ITEMS.filter((i) => i.ready).map((i) => ({ href: i.href, label: t(i.label) })) },
        { fresh: true, items: DAY2_READY ? [{ href: "/day-2", label: t("hack.menu.day2") }] : [] },
      ].filter((g) => g.items.length > 0),
    }
  : undefined;

// The Your page pill's names (slug to first name), on the new site only (app/flags.ts).
const PEOPLE: Record<string, string> | undefined = NEW_SITE
  ? Object.fromEntries(stakeholders.pages.map((p) => [p.slug, p.name.split(" ")[0]]))
  : undefined;

// Addvery's type, as close as open fonts get: Inter Tight 500 for their commercial Neue Haas
// Grotesk Display headings, Inter for their Haas Roman body cut; Outfit and Plus Jakarta Sans are
// what they use themselves. addvery-tokens.css points the --av-font-* stacks at these variables.
const interTight = Inter_Tight({ subsets: ["latin", "latin-ext"], weight: ["500", "600"], variable: "--font-inter-tight" });
const inter = Inter({ subsets: ["latin", "latin-ext"], weight: ["400", "500"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin", "latin-ext"], variable: "--font-outfit" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin", "latin-ext"], weight: ["600"], variable: "--font-jakarta" });

const SITE = "https://hire-me-hackathon.vercel.app";
const DESCRIPTION = "A GTM engineer's skillset, built live in 12 hours by Alex Alderman, steering a team of AI agents.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Hire Me Hackathon",
  description: DESCRIPTION,
  // Addvery's own favicon set: the black symbol for light tabs, the white one for dark.
  icons: {
    icon: [
      { url: "/addvery/addvery-symbol-black-32.png", sizes: "32x32", type: "image/png", media: "(prefers-color-scheme: light)" },
      { url: "/addvery/addvery-symbol-white-32.png", sizes: "32x32", type: "image/png", media: "(prefers-color-scheme: dark)" },
      { url: "/addvery/addvery-symbol-black-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/addvery/addvery-symbol-black-180.png",
  },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Hire Me Hackathon",
    title: "The Hire Me Hackathon",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "The Hire Me Hackathon",
    description: DESCRIPTION,
  },
};

// Motion hides elements only once this has run, so visitors without JavaScript see everything.
// If the motion code hasn't started within 4 s (a failed bundle), the flag comes off again.
const JS_FLAG =
  "(function(d){d.classList.add('js');setTimeout(function(){if(!d.classList.contains('motion-ready'))d.classList.remove('js')},4000)})(document.documentElement)";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fonts = [interTight.variable, inter.variable, outfit.variable, jakarta.variable].join(" ");
  return (
    <html lang="en" className={fonts} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: JS_FLAG }} />
      </head>
      <body>
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <SiteHeader people={PEOPLE} nav={NEW_SITE ? newNavLinks({ videos: VIDEO_WALL, skills: SKILLS_PAGE }) : undefined} hideCta={NEW_SITE} hack={HACK} />
        <div id="content" className="site-content" tabIndex={-1}>
          {children}
        </div>
        <SiteFooter />
        {PEOPLE && <YourPagePill people={PEOPLE} variant="bar" />}
        <Analytics />
      </body>
    </html>
  );
}
