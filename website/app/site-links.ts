// The menu's links, shared by the header (a client component) and the footer (a server component).

export const NAV_LINKS = [
  { href: "/#feed", label: "Live feed" },
  { href: "/#status", label: "What's being built" },
  { href: "/demos", label: "GTM demos" },
  { href: "/for", label: "For Addvery" },
  { href: "/about", label: "About Alex" },
  { href: "/docs/charter", label: "The plan" },
];

export const CTA = { href: "/#s02", label: "Watch the explainer" };

// The new site's menu (VERDICT.md 2.2): working labels until alex-voice words them. Videos and Skills
// join only on a build that has /videos and /skills (W13, W14; app/flags.ts), so the menu never links
// to a 404. Called on the server: the flags aren't in the browser's bundle.
export function newNavLinks({ videos, skills }: { videos: boolean; skills: boolean }) {
  return [
    { href: "/demos", label: "Articles" },
    ...(videos ? [{ href: "/videos", label: "Videos" }] : []),
    ...(skills ? [{ href: "/skills", label: "Skills" }] : []),
    { href: "/about", label: "About me" },
    { href: "/for", label: "For Addvery" },
  ];
}

/** The new site's footer: the day's log, the plan, privacy and the public repo (working labels). */
export const NEW_FOOTER_LINKS = [
  { href: "/log", label: "The log" },
  { href: "/docs/charter", label: "The plan" },
  { href: "https://github.com/alderman-ai/Hire-Me-Hackathon", label: "The code on GitHub" },
];
