// The home page's words (app/home/best-home.tsx renders them). A plain module, no React and no CSS, so the
// agent track (lib/agent-track) reads exactly what the page shows.

export const NUMBERS: { href: string; k: string; v: string }[] = [
  { href: "#icps", k: "4 × 3 × 3", v: "" }, // v: home.numbers.2
  { href: "#account", k: "279 results · $1.24", v: "6 Apify scrapers, in about 17 minutes" },
  { href: "#account", k: "57 people · $0.003", v: "107 model calls" },
  { href: "#routing", k: "12 leads", v: "4 placed by rules alone" },
  { href: "#machine", k: "36 workflows · 1 variable", v: "Nothing here sends." },
  { href: "#six", k: "6 pages", v: "A personal landing page for each decision-maker" },
];

export const MOMENTS: { skill: string; time: string; quote: string; name: string }[] = [
  { skill: "spec-driven-agent-team", time: "11:36 · Day 1", quote: "\"they shoot all of his scenes first even if it's not in chronological order of the movie\"", name: "Running a team of AI helpers from one plan" },
  { skill: "operator-attention-controls", time: "13:44 · Day 1", quote: "\"Please go ahead and codify that as a skill so that if I need to use it again, it's an instant fix.\"", name: "Keeping a team of AI helpers from running off without me" },
  { skill: "account-scrape-apify", time: "15:13 · Day 1", quote: "\"so i checked to see that no nothing leaked or anything like that and now i can kind of chill and let that run\"", name: "Account research scraper on Apify, with no logins" },
  { skill: "account-people-classifier", time: "15:40 · Day 1", quote: "\"set up a JEV classification that determines whether they are someone sending cold outreach, right?\"", name: "Account mapping: classifying every employee and post at a target company" },
  { skill: "outbound-workflow-factory", time: "16:36 · Day 1", quote: "\"So there are four main ICPs, three different languages, let's say English, Czech, German, and so that's 12.\"", name: "Outbound workflow factory: 36 GetSales sequences from one copy file per ICP" },
];

// Quotes are Alex's, verbatim, with the second they start at.
export const HOME_ACCOUNT_QUOTE = {
  text: '"if you\'re like on month four and I have your 90-day goals from your job advert that\'s like gold for crafting like custom messaging"',
  youtube: "MyYnFOQCagc",
  start: 145,
  when: "Day 1, 15:09",
};

export const HOME_ACCOUNT_STEPS: {
  id?: string;
  n: string;
  href: string;
  bigText?: string;
  image?: { src: string; alt: string };
  title: string;
  text: string;
}[] = [
  {
    id: "icps",
    n: "01",
    href: "/skills#icp-grid-from-client-site",
    bigText: "4 ICPs",
    title: "ICP grid built from the client's own website",
    text: "The four ICPs come from Addvery's own website: retail loyalty, telco customer value, consumer lending and last-mile logistics.",
  },
  {
    n: "02",
    href: "/d1",
    image: { src: "/d1/01-overview-1280.webp", alt: "Research board: Addvery as scraped from public sources" },
    title: "Account research scraper on Apify, with no logins",
    text: "6 Apify scrapers, $1.24, 279 results in about 17 minutes.",
  },
  {
    n: "03",
    href: "/d2",
    image: { src: "/d1/03-linkedin-activity-1280.webp", alt: "LinkedIn activity board: who posted in the last 90 days by function, counts only" },
    title: "Account mapping: classifying every employee",
    text: "At 16:04 it ran on all 57 people who list Addvery on LinkedIn: public profiles and posts, no login. Counts only, no names.",
  },
];

export const HOME_LIMITS_TITLE = "It was built to be legible more than functional";

export const HOME_SIX = {
  eyebrow: "For Addvery",
  title: "A personal landing page for each decision-maker",
  action: "All six pages",
  quote: {
    text: '"as part of my research into your company i try to identify who the stakeholders are and like what your main objections are"',
    youtube: "lo486cSVBcM",
    start: 958,
    when: "Day 1, 17:50",
  },
};

export const HOME_ARGUMENT = {
  title: "Put AI in your pipeline first",
  lead: "For the people who really want to save their team, and really want to do AI the ethical way (whatever that means), the order matters.",
  articleLink: "If AI won\u2019t replace half your team, put it in your pipeline",
  chain: [
    "\"We want to bring an AI in, but we're not going to fire half the team.\"",
    "\"If it's not lowering their labor costs, then it has to be increasing their revenue.\"",
    "\"The first place you need to put AI is in your pipeline, so that you can upskill your people to get more done and at the same time bring in more work.\"",
  ],
  chainVideo: {
    youtube: "qrBNOsSYGrQ",
    start: 415,
    end: 501,
    label: "We want to bring an AI in, but we're not going to fire half the team (Day 1, 11:13)",
    meta: "Day 1, 11:13",
    length: "1:26",
    still: "/videos/S02-f.webp",
  },
  quote: {
    text: "The only way to get the leverage of AI and not need to drop half your team is if you're also leveraging the amount of new work you're getting.",
    youtube: "lo486cSVBcM",
    start: 1657,
    when: "Day 1, 18:01",
  },
};

export const HOME_SKILLS_TITLE = '"it took me 12 hours today but here\'s all of the skills that we built that are reusable."';

export const HOME_ABOUT = {
  eyebrow: "About me",
  title: "I\u2019m a marketer turned GTM engineer, and I think AI should grow your team, not shrink it.",
  /** **bold** marks the bold words. */
  paragraphs: [
    "I spent 10 years freelancing in B2B marketing, the standard path into GTM engineering. Then I took an **AI sabbatical**: nine months of doing nothing but building in Claude Code.",
    "Now I want to apply what I\u2019ve learned in theory and actually get the satisfaction of making numbers go up.",
  ],
};

