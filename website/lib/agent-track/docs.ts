import { readFileSync } from "node:fs";
import path from "node:path";
import stakeholdersRaw from "@/content/stakeholders.json";
import quotesRaw from "@/content/quotes.json";
import clientQuotes from "@/content/recommendations.json";
import highlightsRaw from "@/content/highlights.json";
import feedJson from "@/content/feed.json";
import day2Json from "@/content/feed-day2.json";
import summaryJson from "@/content/summary.json";
import videosJson from "@/content/videos.json";
import skillsJson from "@/content/skills.json";
import { t, type CopyKey } from "@/app/copy";
import { IS_PRODUCTION_BUILD, NEW_SITE, SKILLS_PAGE, VIDEO_WALL } from "@/app/flags";
import { forCopySlugs, forList, forText, isPlaceholder, recalReady } from "@/app/for/[slug]/for-copy";
import { entryUrl, findEntry, formatDate, madeLead, ordered, visibleEntries, type Entry } from "@/app/articles/entries";
import { pageHref, recommendFor, type ListSlug } from "@/app/recommend";
import { gridIntro, lensLine, stakeholderGate, titleLines, type StakeholderPage } from "@/app/stakeholders";
import { dayOf } from "@/app/day-label";
import { ABOUT_META, ARTICLES_META, DAY2_META, FOR_META, FOR_SOURCES_LINE, LOG_META, SITE_META } from "@/app/page-meta";
import { LEAD_FIELDS, LEAD_STEPS, LEAD_TAG, LEAD_TITLE } from "@/app/home/lead-card-words";
import { HOME_SKILLS_TITLE } from "@/app/home/home-words";
import { C1_LINK, C1_SLUG, C2_SLUG, MACHINE, MACHINE_FIGURES, MACHINE_STAT_NUMS, MESSAGES, ROUTING, c2, machineStatLabels, walkthroughWords } from "@/app/best/machine-words";
import {
  BI_LENS,
  CEO_LENS,
  COFOUNDER1_LENS,
  COFOUNDER2_LENS,
  DELIVERY_KEEP,
  COFOUNDER2_CHIPS,
  FACES_STEP,
  GROWTH_LENS,
  P4_CHIPS,
  biRows,
  ceoSteps,
  cofounder1Steps,
  type Chipped,
  type LensStep,
} from "@/app/for/[slug]/lens-words";
import { CRM_LINE, limitsDefault } from "@/app/best/words";
import { wallClips, clock } from "@/app/videos/clips";
import { readAboutCopy } from "@/app/about/copy";
import { ABOUT_PHOTOS, CLIP_S12_M, WORK_CLIPS, type AboutClip } from "@/app/about/clips";
import { FACTS, LINKS } from "@/app/about/profile";
import { wallCards, wallSpan } from "@/app/about/wall-data";
import { fullWallCards } from "@/app/about/wall-full-data";
import { LLMS_SUMMARY } from "@/app/agent/copy";
import d1Json from "@/content/d1.json";
import { findDemo } from "@/app/deliverables";
import { movedTo } from "@/app/redirects";
import { RESEARCH_INTRO, readResearchDocs } from "@/app/research-words";
import { feedPosts } from "@/app/feed-data";
import { BASE, LLMS_FULL_URL, LLMS_URL, PROD, abs, humanUrl, keyOf, mdUrl, mmss, youtube } from "./site";
import { articleBodyMd, blockquote, fixLinks, htmlToMd, plainLine, videoLink } from "./md";
import { MCP_ADD } from "./site";

// The agent track: every page a person can open, as one Markdown doc, built from the same loaders and the
// same production gates the pages use (published entries only, approved landings only, the four build
// flags), so it can't drift from what a person sees and never shows a draft. One function per page type;
// each returns { key, path, title, humanUrl, markdown }. Served as /<path>.md and by content negotiation
// (next.config.mjs), listed in /llms.txt, concatenated in /llms-full.txt.
//
// Pages left out on purpose: redirected or cut routes (/docs/*, /d3 to /d12, /demos/*), and /d1 and /d2,
// Every internal link in a doc points at another doc (or an asset): /d1 and /d2 have docs of their own.

export type Doc = {
  /** "index", "articles", "articles/<slug>", "for/<slug>", ... */
  key: string;
  /** The .md path: "/index.md", "/articles.md", ... */
  path: string;
  title: string;
  humanUrl: string;
  markdown: string;
  /** One line for /llms.txt and the "Where next" lists. */
  note: string;
  /** The link text in /llms.txt, when the title alone doesn't say what the page is. */
  label?: string;
};

type Next = { key: string; title: string; why: string };

const WALL_FULL = process.env.WALL_FULL === "1";
const DAY2_READY = Boolean((videosJson as Record<string, string | undefined>).S17);
const sessionVideo = videosJson as Record<string, string | undefined>;

// ---------------------------------------------------------------- what exists in this build

function articles(): Entry[] {
  return ordered(visibleEntries());
}

/** The six pages a production build shows: the gate, and only a landing that's approved. */
function people(): StakeholderPage[] {
  return stakeholderGate().pages.filter((p) => p.landing?.approved === true);
}

let keyCache: Set<string> | null = null;
/** Every doc key this build has. */
export function docKeys(): Set<string> {
  if (keyCache) return keyCache;
  const keys = new Set<string>();
  // Set before the paged docs are counted: paging renders posts, whose links ask for these keys.
  keyCache = keys;
  if (!NEW_SITE) return (keyCache = keys);
  keys.add("index");
  keys.add("about");
  keys.add("articles");
  for (const e of articles()) keys.add(`articles/${e.slug}`);
  if (VIDEO_WALL) keys.add("videos");
  if (SKILLS_PAGE) keys.add("skills");
  if (people().length) {
    keys.add("for");
    for (const p of people()) keys.add(`for/${p.slug}`);
  }
  keys.add("log");
  day1Pages().forEach((_, i) => keys.add(feedKey(i)));
  if (DAY2_READY) keys.add("day-2");
  keys.add("privacy");
  wallPages().forEach((_, i) => keys.add(wallKey(i)));
  if (findDemo("d1") && !movedTo("d1")) keys.add("d1");
  if (findDemo("d2") && !movedTo("d2")) {
    keys.add("d2");
    for (const n of readResearchDocs()) keys.add(`d2/${n.slug}`);
  }
  return (keyCache = keys);
}

/** A site path or URL, as the track links it: the doc's .md when it has one, else the absolute human URL. */
function link(href: string): string {
  let h = href;
  if (h.startsWith(BASE)) h = h.slice(BASE.length) || "/";
  if (h.startsWith("https://hire-me-hackathon.vercel.app")) h = h.slice("https://hire-me-hackathon.vercel.app".length) || "/";
  if (!h.startsWith("/")) return href;
  const key = keyOf(h);
  return docKeys().has(key) ? mdUrl(key) : abs(h);
}

/** A link inside one page ("#machine"): the page's human URL with the anchor. */
const anchor = (key: string, hash: string) => `${humanUrl(key)}${hash}`;

function frame(key: string, title: string, rawBody: string, next: Next[], human: string): string {
  const body = rawBody.replace(/\n{3,}/g, "\n\n");
  const seen = new Set<string>([key]);
  const list = next.filter((n) => docKeys().has(n.key) && !seen.has(n.key) && seen.add(n.key)).slice(0, 6);
  return [
    `# ${title}`,
    `Human version: ${human} · Site map: ${LLMS_URL}`,
    body.trim(),
    "## Where next",
    list.map((n) => `- [${n.title}](${mdUrl(n.key)}): ${n.why}`).join("\n"),
  ].join("\n\n") + "\n";
}

const labelled = (label: string, d: Doc): Doc => ({ ...d, label });

/** `human` is the page a person opens for this doc, when it isn't the doc's own path ("/about#linkedin"). */
function doc(key: string, title: string, note: string, body: string, next: Next[], human?: string): Doc {
  const h = human ? abs(human) : humanUrl(key);
  return { key, path: key === "index" ? "/index.md" : `/${key}.md`, title, humanUrl: h, markdown: frame(key, title, body, next, h), note };
}

/** "**bold**" stays bold, "[words](/path)" links go absolute. */
const rich = (text: string) => fixLinks(text, link);

// ---------------------------------------------------------------- notes and "Where next" items

function videosNote(): string {
  const clips = wallClips();
  return `${clips.length} clips from the build, each with Alex's own line from it and a YouTube link at its start; ${clips.filter((c) => c.featured).length} are marked to start with.`;
}
function skillsNote(): string {
  const n = (skillsJson.groups as { items: unknown[] }[]).reduce((a, g) => a + g.items.length, 0);
  return `The ${n} reusable skills that came out of the build, each with a line on what it does.`;
}

const NOTE: Record<string, () => string> = {
  index: () => SITE_META.description,
  about: () => ABOUT_META.description,
  articles: () => ARTICLES_META.description,
  videos: videosNote,
  skills: skillsNote,
  for: () => FOR_META.description,
  log: () => LOG_META.description,
  "day-2": () => DAY2_META.description,
  privacy: () => privacyParts().first,
};
const TITLE: Record<string, () => string> = {
  index: () => t("home.hero.4"),
  about: () => ABOUT_META.title,
  articles: () => ARTICLES_META.title,
  videos: () => "Videos",
  skills: () => "Skills",
  for: () => gridIntro()?.heading ?? FOR_META.title,
  log: () => t("log.intro.title"),
  "day-2": () => t("day2.title"),
  privacy: () => privacyParts().title,
};

function page(key: string): Next {
  return { key, title: TITLE[key](), why: NOTE[key]() };
}

function articleItem(e: Entry): Next {
  return { key: `articles/${e.slug}`, title: e.title, why: e.cover.subtitle };
}

/** A recommend.json list as "Where next" items: the cards whose pages have docs, in the list's order. */
function recommended(list: ListSlug): Next[] {
  return recommendFor(list)
    .map((c) => ({ key: keyOf(c.href), title: c.title, why: c.why }))
    .filter((n) => docKeys().has(n.key));
}

/** The articles after `slug` in /articles' order, wrapping round. */
function nextArticles(slug: string | null, n: number): Next[] {
  const all = articles();
  const at = slug ? all.findIndex((e) => e.slug === slug) : -1;
  const order = [...all.slice(at + 1), ...all.slice(0, Math.max(at, 0))].filter((e) => e.slug !== slug);
  return order.slice(0, n).map(articleItem);
}

// ---------------------------------------------------------------- shared pieces

function quoteWith(text: string, when: string, id: string, start?: number): string {
  return `${blockquote(text)}\n>\n> [${when}](${youtube(id, start)})`;
}

function clipLine(c: AboutClip): string {
  return `${videoLink(c.quote, c.youtube, c.start, c.end ?? undefined, c.length)}, ${c.meta}`;
}

// ---------------------------------------------------------------- the 36-workflow block (home, growth)

function walkthroughMd(): string {
  const v = c2()?.video;
  const ww = walkthroughWords();
  if (!v || !ww) return "";
  const caption = ww.caption ? `\n\n${blockquote(ww.caption)}${ww.meta ? `\n>\n> ${ww.meta}` : ""}` : "";
  return `${videoLink(ww.label, v.youtube_id, v.start, v.end)}${caption}`;
}

function statsMd(): string {
  const stats = machineStatLabels();
  return MACHINE_STAT_NUMS.map((num, i) => `- **${num}**: ${stats[i]}`).join("\n");
}

function figuresMd(): string {
  return MACHINE_FIGURES.map((f) => `![${f.alt}](${abs(f.src)})\n\n*${f.caption}*`).join("\n\n");
}

function messagesMd(order: (keyof typeof MESSAGES)[]): string {
  return order.map((k) => `**${MESSAGES[k].label}**\n\n${blockquote(MESSAGES[k].text)}`).join("\n\n");
}

function machineLinksMd(): string {
  const c1 = articles().find((e) => e.slug === C1_SLUG);
  return [
    c2() ? `- [${t("shared.entry.1")}](${link(`/articles/${C2_SLUG}`)})` : "",
    c1 ? `- [${C1_LINK}](${link(`/articles/${C1_SLUG}`)})` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

// ---------------------------------------------------------------- / (index.md)

function homeDoc(): Doc {
  const key = "index";
  // The home's words are site-copy keys (app/home/best-home.tsx reads the same keys in the same order).
  const say = (k: CopyKey) => rich(t(k));
  const parts: string[] = [];

  // The hero (its h1 is the doc's title).
  parts.push(t("home.hero.1"));
  parts.push(`**${t("home.hero.5")}**`);
  parts.push(`[Video: ${t("home.hero.6")}](${youtube("zVnA-AMuNfc")})`);
  parts.push(`${t("home.hero.9")}, ${t("home.hero.10")}`);

  // 1. What you're looking at.
  parts.push(`## ${t("home.what.2")}`);
  parts.push(say("home.what.3"));
  parts.push(quoteWith(t("home.what.quote"), t("home.what.quote_source"), "qrBNOsSYGrQ", 668));

  // 2. A page for each of you.
  parts.push(`## ${t("home.six.2")}`);
  parts.push(say("home.six.3"));
  parts.push(
    (stakeholdersRaw.pages as { slug: string; name: string; title: string; lens?: string; lens_key?: string }[])
      .map((p) => {
        const hook = lensLine(p);
        return `- [${p.name}](${link(`/for/${p.slug}`)}), ${p.title.split(" · ")[0].replace(/, Addvery$/, "")}${hook ? `: ${hook}` : ""}`;
      })
      .join("\n"),
  );
  parts.push(`${t("shared.takedown.1")} [${stakeholderGate().notice.privacy_label}](${link("/privacy")}).`);

  // 3. My one argument.
  parts.push(`## ${t("home.argument.2")}`);
  parts.push(say("home.argument.3"));
  parts.push(`![${t("home.argument.figure.alt")}](${abs("/demos-assets/if-ai-wont-replace-half-your-team/personalisation-volume.png")})\n\n*${t("home.argument.figure.caption")}*`);
  const pipeline = pageHref("art-pipeline-promise");
  if (pipeline) parts.push(`[${t("home.argument.link")}](${link(pipeline)})`);

  // 4. One lead, from a LinkedIn search to its first message (app/home/lead-card-words.ts).
  parts.push(`## ${t("home.proof.2")}`);
  parts.push(say("home.proof.3"));
  parts.push(say("home.proof.fiction"));
  parts.push(`### ${t(LEAD_TITLE)}`);
  parts.push(LEAD_FIELDS.map((f) => `- **${t(f.label)}**: ${t(f.value)}`).join("\n"));
  for (const s of LEAD_STEPS) {
    const lines: string[] = [`**${t(s.title)}**${s.lead ? ` ${t(s.lead)}` : ""}`];
    if (s.lines) lines.push(s.lines.map((l) => `- ${t(LEAD_TAG[l.tag])}: ${t(l.text)}`).join("\n"));
    if (s.clip) lines.push(`${videoLink(t(s.clip.label), s.clip.youtube, undefined, undefined, s.clip.length)}: ${t(s.clip.caption)}, ${t(s.clip.meta)}`);
    if (s.caveat) lines.push(t(s.caveat));
    if (s.text) lines.push(t(s.text));
    // The matrix as one line: the card's lead (row L11) lit in cell 12, Telco CVM, CS, proof.
    if (s.matrix) lines.push(`${t(s.matrix.legend)}: Telco CVM, CS, proof.`);
    if (s.messages) {
      const m = s.messages;
      if (m.before) lines.push(rich(t(m.before)));
      lines.push(`${t(m.labelCs)}:\n\n${blockquote(t(m.cs))}`);
      lines.push(`${t(m.labelEn)}:\n\n${blockquote(t(m.en))}`);
      if (m.after) lines.push(rich(t(m.after)));
      if (m.inputs) lines.push(m.inputs.map((k) => `- ${t(k)}`).join("\n"));
      if (m.close) lines.push(t(m.close));
    }
    parts.push(lines.join("\n\n"));
  }
  parts.push(say("home.proof.twelve"));
  parts.push(t("shared.limits.1"));
  parts.push(`${blockquote(CRM_LINE)}\n>\n> ${t("shared.crm.1")}`);
  const proofLinks = [
    findEntry(C2_SLUG) ? `[${t("home.proof.link_sequences")}](${link(entryUrl(C2_SLUG))})` : "",
    findEntry(C1_SLUG) ? `[${t("home.proof.link_routing")}](${link(entryUrl(C1_SLUG))})` : "",
  ].filter(Boolean);
  if (proofLinks.length) parts.push(proofLinks.join(" · "));

  // 5. The same model on Addvery's own team.
  parts.push(`## ${t("home.team.2")}`);
  parts.push(say("home.team.3"));
  parts.push(`![${t("home.team.figure.alt")}](${abs("/d1/03-linkedin-activity-1280.webp")})\n\n*${t("home.team.figure.caption")}*`);
  parts.push(`[${t("home.team.link")}](${link("/d1")})`);

  // 6. One person, a team of Claude Code sessions.
  parts.push(`## ${t("home.build.2")}`);
  parts.push(say("home.build.3"));
  parts.push(`${videoLink(t("home.build.clip.label"), "S2NTaJHUmTM", undefined, undefined, "0:33")}: ${t("home.build.clip.caption")}, ${t("home.build.clip.meta")}`);
  parts.push(say("home.build.4"));
  parts.push(quoteWith(t("home.build.quote"), t("home.build.quote_source"), "NULD_WteCRM", 474));
  parts.push(say("home.build.5"));
  parts.push(
    [docKeys().has("skills") ? `[${t("home.skills.3")}](${mdUrl("skills")})` : "", `[${t("home.build.log_link")}](${link("/log")})`]
      .filter(Boolean)
      .join(" · "),
  );

  // 8. About me.
  parts.push(`## ${t("home.about.2")}`);
  parts.push(say("home.about.3"));
  parts.push(`[${t("shared.about.1")}](${mdUrl("about")})`);

  return labelled("Home", doc(key, TITLE.index(), NOTE.index(), parts.join("\n\n"), [
    ...recommended("home").slice(0, 3),
    page("about"),
    page("for"),
    page("videos"),
  ]));
}

// ---------------------------------------------------------------- /articles

function articlesDoc(): Doc {
  const list = articles();
  const body = [
    t("demos.intro"),
    list.map((e, i) => `${i + 1}. [${e.title}](${mdUrl(`articles/${e.slug}`)}): ${e.description}`).join("\n"),
  ].join("\n\n");
  return doc("articles", TITLE.articles(), NOTE.articles(), body, [...nextArticles(null, 3), page("videos"), page("about")]);
}

function articleDoc(e: Entry): Doc {
  const key = `articles/${e.slug}`;
  const parts: string[] = [];
  parts.push(`*${e.cover.subtitle}*`);
  parts.push(`${e.author} · ${formatDate(e.date)}${e.group ? ` · ${e.group}` : ""}`);
  if (e.video) parts.push(videoLink(e.title, e.video.youtube_id, e.video.start, e.video.end));
  if (e.body.trim()) parts.push(articleBodyMd(e.body, link));
  if (e.made) parts.push(`**How this ${e.kind === "video" ? "entry" : "post"} was made.** ${madeLead(e.made, e.kind === "video" ? "entry" : "post")}`);
  // "Next for you": C2 always points at C1 (app/articles/[slug]/page.tsx), then the default list, then the order.
  const forced = e.slug === C2_SLUG ? articles().filter((x) => x.slug === C1_SLUG).map(articleItem) : [];
  const next = [...forced, ...recommended("default").filter((n) => n.key !== key), ...nextArticles(e.slug, 4)].slice(0, 4);
  return doc(key, e.title, e.description, parts.join("\n\n"), [...next, page("articles")]);
}

// ---------------------------------------------------------------- /videos

function videosDoc(): Doc {
  const clips = wallClips();
  const legend = t("videos.legend");
  const star = legend.charAt(0).toUpperCase() + legend.slice(1);
  const byHref = new Map(articles().map((e) => [`/articles/${e.slug}`, e]));
  const body = [
    t("videos.intro"),
    `${clips.length} clips, in the wall's order. The ${clips.filter((c) => c.featured).length} marked "${star}" are the ones to watch first.`,
    clips
      .map((c, i) => {
        const art = c.article ? byHref.get(c.article) : undefined;
        return [
          `### ${i + 1}. ${c.tag}${c.featured ? ` (${star})` : ""}`,
          blockquote(c.hook),
          `[Video: ${c.tag}, ${clock(c.duration_s)}](${youtube(c.youtube_id, c.start)})`,
          art ? `Article: [${art.title}](${mdUrl(`articles/${art.slug}`)})` : "",
        ]
          .filter(Boolean)
          .join("\n\n");
      })
      .join("\n\n"),
  ].join("\n\n");
  return doc("videos", TITLE.videos(), NOTE.videos(), body, [...nextArticles(null, 3), page("about"), page("log")]);
}

// ---------------------------------------------------------------- /skills

type SkillItem = {
  id: string;
  name: string;
  line: string;
  path?: string;
  link?: { href: string; label: string };
  moment?: { time: string; session: string; text: string };
};

function skillsDoc(): Doc {
  const groups = skillsJson.groups as { title: string; items: SkillItem[] }[];
  const parts: string[] = [blockquote(HOME_SKILLS_TITLE), t("skills.hero.1")];
  for (const g of groups) {
    parts.push(`## ${t(g.title as CopyKey)}`);
    for (const s of g.items) {
      const bits = [`### ${s.name}`, `${t(s.line as CopyKey)}${s.link ? ` [${s.link.label}](${link(s.link.href)})` : ""}`];
      if (s.moment) bits.push(`${blockquote(`“${s.moment.text}”`)}\n>\n> ${s.moment.time} · ${dayOf(s.moment.session)}`);
      if (s.path) bits.push(`\`${s.path}\``);
      parts.push(bits.join("\n\n"));
    }
  }
  parts.push(`${blockquote(CRM_LINE)}\n>\n> ${t("shared.crm.1")}`);
  return doc("skills", TITLE.skills(), NOTE.skills(), parts.join("\n\n"), [
    page("log"),
    page("day-2"),
    ...nextArticles(null, 2),
    page("about"),
  ]);
}

// ---------------------------------------------------------------- /about

function aboutDoc(): Doc {
  const copy = readAboutCopy();
  const story = copy.sections.slice(0, -1);
  const belief = copy.sections[copy.sections.length - 1];
  const blocks = (bs: typeof belief.blocks) =>
    bs.map((b) => (b.kind === "quote" ? `${blockquote(htmlToMd(b.html, link))}\n>\n> ${b.by}` : htmlToMd(b.html, link))).join("\n\n");
  const parts: string[] = [htmlToMd(copy.leadHtml, link)];

  parts.push("## At a glance");
  const facts = FACTS.map((f) => `- **${f.term}**: ${f.detail}`);
  facts.push(`- **${t("about.glance.1")}**: [${t("about.glance.2")}](${link("/")})`);
  facts.push(`- **${LINKS.site.label}**: [${LINKS.site.href}](${LINKS.site.href}) (${LINKS.site.note})`);
  parts.push(facts.join("\n"));

  for (const s of story) {
    parts.push(`## ${s.title}`);
    parts.push(blocks(s.blocks));
  }
  parts.push(`## ${belief.title}`);
  const firstQuote = Math.max(0, belief.blocks.findIndex((b) => b.kind === "quote"));
  parts.push(blocks(belief.blocks.slice(0, firstQuote)));
  parts.push(clipLine(CLIP_S12_M));
  parts.push(blocks(belief.blocks.slice(firstQuote)));
  const longVersion = copy.articleLinkText ? pageHref("art-pipeline-promise") : undefined;
  if (longVersion && copy.articleLinkText) parts.push(`[${copy.articleLinkText}](${link(longVersion)})`);

  parts.push(`## ${t("about.work.2")}`);
  parts.push(`*${t("about.work.1")}.*`);
  parts.push(WORK_CLIPS.map((c) => `- ${clipLine(c)}`).join("\n"));
  parts.push(ABOUT_PHOTOS.map((p) => `![${p.alt}](${abs(p.src)})\n\n*${t(p.caption)}*`).join("\n\n"));

  const written = recommended("about");
  if (written.length) {
    parts.push(`## ${t("about.written.1")}`);
    parts.push(written.map((n) => `- [${n.title}](${mdUrl(n.key)}): ${n.why}`).join("\n"));
  }

  parts.push(`## ${t("about.clients.1")}`);
  parts.push(
    clientQuotes
      .map((q) => `${blockquote(q.quote)}\n>\n> ${q.name}, ${q.role} (${q.relation}, ${q.date})`)
      .join("\n\n"),
  );
  parts.push(`${t("about.clients.2")}: ${clientQuotes[0].link}`);

  // The LinkedIn wall has its own docs (wallDocs), so this one stays short.
  const pages = wallPages();
  const posts = pages.flat();
  parts.push("## From my LinkedIn");
  parts.push(
    `${posts.length} of my posts from ${wallSpan(posts)}, newest first, as I wrote them, on ${pages.length} pages:\n\n` +
      pages.map((pg, i) => `- [${wallTitle(i, pages.length)}](${mdUrl(wallKey(i))}): ${pg[0].dayLong} back to ${pg[pg.length - 1].dayLong}`).join("\n"),
  );
  return doc("about", TITLE.about(), NOTE.about(), parts.join("\n\n"), [
    { key: wallKey(0), title: wallTitle(0, pages.length), why: "My LinkedIn posts, word for word, newest first." },
    ...recommended("about").slice(0, 3),
    page("videos"),
    page("for"),
  ]);
}

// ---------------------------------------------------------------- /about's LinkedIn wall (about/linkedin*.md)

type WallLike = {
  id: string;
  date: string;
  dayLong: string;
  url: string;
  text: string;
  document?: { title: string } | null;
  link?: { title: string; site: string; url: string } | null;
  poll?: { question: string; options: string[] } | null;
  quote_of?: { url: string; by_alex: boolean; author: string | null } | null;
};

/** LinkedIn's "bold" and "italic" are Unicode maths letters: back to plain letters, so they read and search as text. */
function plainLetters(s: string): string {
  return s.replace(/[\u{1D400}-\u{1D7FF}]/gu, (c) => c.normalize("NFKC"));
}

/** A post's text, clean: plain letters, no trailing spaces, at most one blank line in a row. */
function cleanPost(text: string): string {
  return plainLetters(text)
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((l) => l.replace(/\s+$/, ""))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

const WALL_BUDGET = 24000;
let wallCache: WallLike[][] | null = null;

/** The wall's posts (the same list /about shows), deduplicated, cut into pages of about WALL_BUDGET characters. */
function wallPages(): WallLike[][] {
  if (wallCache) return wallCache;
  const all: WallLike[] = WALL_FULL ? fullWallCards() : wallCards();
  const seen = new Set<string>();
  const posts = all.filter((p) => {
    const k = cleanPost(p.text).toLowerCase().replace(/\s+/g, " ");
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
  wallCache = paginate(posts, postWallMd, WALL_BUDGET);
  return wallCache;
}

const wallKey = (i: number) => (i === 0 ? "about/linkedin" : `about/linkedin-${i + 1}`);
const wallTitle = (i: number, n: number) => `From my LinkedIn${n > 1 ? `, page ${i + 1} of ${n}` : ""}`;

function postWallMd(p: WallLike): string {
  const bits = [`### ${p.dayLong} · [LinkedIn](${p.url})`, cleanPost(p.text)];
  if (p.document?.title) bits.push(`Document: ${plainLetters(p.document.title)}`);
  if (p.link) bits.push(`Link: [${plainLetters(p.link.title || p.link.site)}](${p.link.url})`);
  if (p.poll) bits.push(`Poll: ${plainLetters(p.poll.question)}\n\n${p.poll.options.map((o) => `- ${plainLetters(o)}`).join("\n")}`);
  if (p.quote_of) {
    const who = p.quote_of.by_alex ? "my earlier post" : p.quote_of.author ? `a post by ${p.quote_of.author}` : "a post";
    bits.push(`Quoting [${who}](${p.quote_of.url})`);
  }
  return bits.join("\n\n");
}

function wallDocs(): Doc[] {
  const pages = wallPages();
  return pages.map((pg, i) => {
    const intro = `${pg.length} of my LinkedIn posts, ${pg[0].dayLong} back to ${pg[pg.length - 1].dayLong}, word for word. Profile: [${LINKS.linkedin.href}](${LINKS.linkedin.href})`;
    const next: Next[] = [];
    if (i + 1 < pages.length) next.push({ key: wallKey(i + 1), title: wallTitle(i + 1, pages.length), why: "Older posts." });
    if (i > 0) next.push({ key: wallKey(i - 1), title: wallTitle(i - 1, pages.length), why: "Newer posts." });
    next.push(page("about"), page("articles"), page("videos"));
    return doc(wallKey(i), wallTitle(i, pages.length), `${pg.length} posts, ${pg[0].dayLong} back to ${pg[pg.length - 1].dayLong}, word for word.`,
      [intro, ...pg.map(postWallMd)].join("\n\n"), next, "/about#linkedin");
  });
}

// ---------------------------------------------------------------- /for and /for/<slug>

type QuoteItem =
  | { card: string; time: string; session: string; text: string; also?: string; youtube?: string; start?: number; end?: number }
  | { post_id: string; date: string; text: string; also?: string; url: string };
const QUOTES = quotesRaw as unknown as { lists: Record<string, QuoteItem[]>; lens: Record<string, QuoteItem[]>; clips: Record<string, QuoteItem> };
type Moment = Extract<QuoteItem, { card: string }> & { len?: string };

function quoteItem(q: QuoteItem): string {
  if ("post_id" in q) return `${blockquote(q.text)}\n>\n> [${q.date}, LinkedIn](${q.url})${q.also ? `\n\n${q.also}` : ""}`;
  const when = `${q.time} · ${dayOf(q.session)}`;
  const src = q.youtube ? `[${when}](${youtube(q.youtube, q.start)})` : when;
  return `${blockquote(q.text)}\n>\n> ${src}${q.also ? `\n\n${q.also}` : ""}`;
}

function personTitle(p: StakeholderPage) {
  return titleLines(p.title).join(", and ");
}

function forDoc(): Doc {
  const intro = gridIntro();
  const { notice } = stakeholderGate();
  const parts: string[] = [];
  if (intro) parts.push(intro.paragraphs.map(rich).join("\n\n"));
  const clip = QUOTES.clips["S02-j"] as Extract<QuoteItem, { card: string }> | undefined;
  if (clip?.youtube) parts.push(`${videoLink(clip.text, clip.youtube, clip.start, clip.end)}, ${dayOf(clip.session)}, ${clip.time}`);
  parts.push(
    people()
      .map((p) => {
        const lens = p.lens ?? (p.lens_key ? t(p.lens_key as CopyKey) : "");
        return `- [${p.name}](${mdUrl(`for/${p.slug}`)}), ${personTitle(p)}${lens ? `: ${lens}` : ""}`;
      })
      .join("\n"),
  );
  parts.push(`${FOR_SOURCES_LINE} ${t("shared.takedown.1")} [${notice.privacy_label}](${link("/privacy")}).`);
  return doc("for", TITLE.for(), NOTE.for(), parts.join("\n\n"), [
    ...people().slice(0, 3).map((p) => ({ key: `for/${p.slug}`, title: p.name, why: personTitle(p) })),
    page("index"),
    page("about"),
  ]);
}

type Landing = { approved?: boolean; lead?: string; lead_key?: string; note?: string; made_line?: string; sign?: string };

/** A lens block's step cards: title, linked to its doc, then its line. */
function stepsMd(steps: LensStep[], faces: boolean): string {
  const all = faces ? [...steps, FACES_STEP] : steps;
  return all.map((st, i) => `${i + 1}. **[${st.title}](${link(st.href)})**: ${st.text}`).join("\n");
}

/** Skill chips as one line of links to /skills. */
function chipsMd(label: string, items: Chipped[]): string {
  return `**${label}:** ${items.map((c) => `[${c.label}](${link(`/skills#${c.skill}`)})`).join(", ")}`;
}

/** A clip from content/quotes.json as a video link with what's said in it. */
function clipMd(card: string, meta?: string): string {
  const c = QUOTES.clips[card] as Moment | undefined;
  if (!c?.youtube) return "";
  return `${videoLink(c.text, c.youtube, c.start, c.end, c.len)}, ${meta ?? `${dayOf(c.session)}, ${c.time}`}`;
}

/** The P3 lens block of a personal page (app/for/[slug]/lens.tsx), as Markdown. */
function lensMd(slug: string): string[] {
  switch (slug) {
    case "growth":
      return [`## ${GROWTH_LENS.title}`, GROWTH_LENS.lead, walkthroughMd(), statsMd(), messagesMd(["tailspin", "coho"]), figuresMd(), machineLinksMd()];
    case "ceo":
      return [
        `## ${CEO_LENS.returnTitle}`,
        `*${t("for-ceo.return.1")}.*`,
        clipMd("S10-c"),
        (QUOTES.lens.ceo ?? []).map(quoteItem).join("\n\n"),
        `${blockquote(CRM_LINE)}\n>\n> ${t("shared.crm.1")}`,
        `## ${CEO_LENS.evidenceTitle}`,
        `*${t("for-ceo.evidence.1")}.*`,
        stepsMd(ceoSteps(), true),
      ];
    case "cofounder-1": {
      const L = COFOUNDER1_LENS;
      return [
        `## ${L.pipelineTitle}`,
        `*${t("for-cofounder-1.pipeline.1")}.*`,
        stepsMd(cofounder1Steps(), true),
        `## ${L.sliderTitle}`,
        `*${t("for-cofounder-1.slider.1")}.*`,
        clipMd("S10-b", L.managedMeta),
        `**${L.sliderHead}**\n\n${L.slider.map((x, i) => `${i + 1}. ${x}`).join("\n")}`,
        quoteWith(L.sliderQuote.text, L.sliderQuote.when, L.sliderQuote.youtube),
      ];
    }
    case "cofounder-2":
      return [
        `## ${COFOUNDER2_LENS.title}`,
        clipMd("S02-h", COFOUNDER2_LENS.clipMeta),
        t("for-cofounder-2.look.1"),
        SKILLS_PAGE ? chipsMd("Skills behind this", COFOUNDER2_CHIPS) : "",
      ];
    case "bi": {
      const rows = biRows();
      const cellCheck = (c: (typeof rows)[number]["check"]) => (c ? `[${c.label}](${link(c.href)})` : "");
      const f = BI_LENS.figure;
      return [
        `## ${t("for-bi.rows.2")}`,
        `*${t("for-bi.rows.1")}.*`,
        [
          `| ${t("for-bi.rows.3")} | ${t("for-bi.rows.4")} | ${t("for-bi.rows.5")} |`,
          "| --- | --- | --- |",
          ...rows.map((r) => `| ${r.count} | ${r.how.replace(/\|/g, "\\|")} | ${cellCheck(r.check)} |`),
        ].join("\n"),
        `## ${BI_LENS.ruleTitle}`,
        `*${t("for-bi.rule.1")}.*`,
        BI_LENS.flow.map((x, i) => `${i + 1}. **${x.what}**: ${x.text}`).join("\n"),
        BI_LENS.jev,
        `![${f.alt}](${abs(f.src)})\n\n*${f.caption}*`,
        clipMd("S09-i"),
      ];
    }
    default:
      return [];
  }
}

/** The blocks after a personal page's quote list: delivery's "What I'd keep", bi's limits. */
function afterQuotesMd(slug: string): string[] {
  if (slug === "delivery") {
    const K = DELIVERY_KEEP;
    const day = pageHref("art-day-one");
    return [
      `## ${K.title}`,
      `*${K.eyebrow}.*`,
      K.items.map((it, i) => `${i + 1}. **${it.lead}**${it.rest}`).join("\n"),
      day ? `[${K.dayLink}](${link(day)})` : "",
    ];
  }
  if (slug === "bi") return [`## ${BI_LENS.limitsTitle}`, `${t("for-bi.limits.1")}:\n\n${limitsDefault().map((l) => `- ${l}`).join("\n")}`];
  return [];
}

function personDoc(p: StakeholderPage): Doc {
  const key = `for/${p.slug}`;
  const raw = (stakeholdersRaw.pages as { slug: string; landing?: Landing }[]).find((x) => x.slug === p.slug)?.landing ?? {};
  const { notice } = stakeholderGate();
  const first = p.name.split(" ")[0];
  // A recalibrated page (app/for/[slug]/recal.tsx) reads as its page does: its title, the hello and the
  // lead with the quote, then its own blocks in place of the note, the lens and the quotes.
  const recal = recalReady(p.slug);
  const parts: string[] = [];
  if (recal) {
    parts.push(`Hi ${first},`, ...recalLeadMd(p.slug));
  } else {
    const lead = [raw.lead_key ? t(raw.lead_key as CopyKey) : "", raw.lead ? rich(raw.lead) : ""].filter(Boolean).join(" ");
    if (lead) parts.push(lead);
  }
  parts.push(`For: **${p.name}**, ${personTitle(p)}

From: Alex Alderman, ${t("home.hero.10")}`);
  if (recal) {
    parts.push(...recalBodyMd(p.slug, p.landing?.concerns ?? []));
  } else {
    if (raw.note) {
      parts.push("## A note from Alex");
      parts.push(raw.note.split(/\n\s*\n/).map((x) => rich(x.trim())).join("\n\n"));
      parts.push(raw.sign ?? "Alex Alderman");
    }
    parts.push(...lensMd(p.slug));
    const quotes = QUOTES.lists[p.slug] ?? [];
    const qKey = `for-${p.slug}.quotes.1`;
    if (quotes.length) {
      parts.push(`## ${t(qKey as CopyKey)}`);
      parts.push(quotes.map(quoteItem).join("\n\n"));
    }
    const chips = P4_CHIPS[p.slug];
    if (chips && SKILLS_PAGE) parts.push(chipsMd(chips.label ?? "Skills behind this", chips.items));
    parts.push(...afterQuotesMd(p.slug));
  }
  // A recalibrated page takes its made line from its words file; empty there means no section (the CEO's).
  const madeLine = recal ? forText(p.slug, "landing.made_line") : raw.made_line;
  if (madeLine) {
    parts.push("## How this page was made");
    parts.push(`${rich(madeLine)}${docKeys().has("skills") ? ` [${t("shared.made.1")}](${mdUrl("skills")})` : ""}`);
  }
  parts.push(`## ${notice.heading}`);
  const noticeLines = [p.slug !== "growth" ? notice.why : "", p.sources ?? notice.sources, `${t("shared.takedown.2")} [${notice.privacy_label}](${link("/privacy")}).`];
  parts.push(noticeLines.filter(Boolean).join("\n\n"));
  const title = (recal && forText(p.slug, "title")) || `Hi ${first},`;
  return labelled(`${p.name}'s page`, doc(key, title, personTitle(p), parts.join("\n\n"), personNext(p.slug)));
}

/**
 * A personal page's "Where next": its carousel, then /for and /about. A recalibrated page's route never
 * meets the labour framing: no pipeline-promise article and no /log (4 Nov, the CEO's page).
 */
function personNext(slug: string): Next[] {
  const next = [...recommended(slug as ListSlug).slice(0, 4), page("for"), page("about")];
  if (!recalReady(slug)) return next;
  const pipeline = pageHref("art-pipeline-promise");
  const out = new Set(["log", ...(pipeline ? [keyOf(pipeline)] : [])]);
  return next.filter((n) => !out.has(n.key) && !n.key.startsWith("log/"));
}

/** A recalibrated page's word for a key; a missing key is a build error. */
function rw(slug: string, key: string): string {
  const v = forText(slug, key);
  if (!v) throw new Error(`content/for-copy/${slug}.json: no words for "${key}"`);
  return v;
}

/** Text with its first `phrase` as a Markdown link (the copy names the words to link). */
function linkedMd(text: string, phrase: string, href: string): string {
  const i = text.indexOf(phrase);
  return i < 0 ? text : `${text.slice(0, i)}[${phrase}](${href})${text.slice(i + phrase.length)}`;
}

/** The lead of a recalibrated page: the line, the quote with its gloss when it has one, then the rest. */
function recalLeadMd(slug: string): string[] {
  const cz = forText(slug, "landing.lead_quote.cz");
  const en = forText(slug, "landing.lead_quote.en");
  return [rich(rw(slug, "landing.lead")), ...(cz && en ? [`> ${cz}\n>\n> ${en}`] : []), rich(rw(slug, "landing.lead_after"))];
}

/** The blocks of a recalibrated page (recal.tsx RecalBody), as Markdown, in the page's order. */
function recalBodyMd(slug: string, concerns: { q: string; lead?: string; a: string }[]): string[] {
  const section = (part: string) => [`## ${rw(slug, `landing.${part}.heading`)}`, rich(rw(slug, `landing.${part}.body`))];
  const steps = ["q1", "q2", "q3", "q4"].map((q, i) => {
    const s = rw(slug, `landing.plan.${q}`);
    const at = s.indexOf(": ");
    return `${i + 1}. ${at > 0 ? `**${s.slice(0, at)}:** ${s.slice(at + 2)}` : `**${s}**`}`;
  });
  return [
    ...section("person"),
    ...section("join"),
    ...section("argument"),
    ...section("strategy"),
    ...section("how"),
    `## ${rw(slug, "landing.plan.heading")}`,
    rich(rw(slug, "landing.plan.intro")),
    steps.join("\n"),
    rich(rw(slug, "landing.plan.close")),
    ...section("offer"),
    `## ${rw(slug, "landing.proof.heading")}`,
    rich(rw(slug, "landing.proof.switch")),
    rich(rw(slug, "landing.proof.workflows")),
    rich(linkedMd(rw(slug, "landing.proof.agent"), "/llms.txt", "/llms.txt")),
    "```\n" + rw(slug, "landing.proof.agent_command") + "\n```",
    ...(concerns.length
      ? ["## What I'm guessing you're concerned with", ...concerns.map((c) => `### ${c.q}\n\n${c.lead ? `**${c.lead}** ` : ""}${c.a}`)]
      : []),
    `${blockquote(CRM_LINE)}\n>\n> ${t("shared.crm.1")}`,
  ];
}

// ---------------------------------------------------------------- /for/<slug>/llms.txt, a page's own guide

// A personal page can carry a guide written to the visitor's AI: an intro, then the pages in the order to
// read them with a line on why each, then "Where next". Its words come from the page's words file
// (app/for/[slug]/for-copy.ts, content/for-copy/<slug>.json) under agent.<slug>.*; the page's block that
// opens it (landing.agent.*) is in app/for/[slug]/agent-guide.tsx. Built from the same gates as the page:
// only an approved page in this build, only steps whose pages are in this build, and on a production build
// only once no word is a placeholder. Served at /for/<slug>/llms.txt (app/for/[slug]/llms.txt/route.ts).

export type PersonGuide = {
  slug: string;
  /** "for/ceo/llms.txt": its key in /agent-track.json, so read_page finds it by path. */
  key: string;
  /** This build's URL of the guide. */
  url: string;
  title: string;
  note: string;
  markdown: string;
  /** The prompt the page's button sends, with {guide_url} and {page_url} filled in with production URLs. */
  prompt: string;
  /** The page's block: its line, the Open in Claude button's label, the copy button's label. */
  line: string;
  button: string;
  alt: string;
};

type GuideStep = { href: string; why: string };

/** agent.<slug>.order (app/for/[slug]/for-copy.ts forList) as steps: each item's href or url, and its why. */
function guideSteps(slug: string, items: Record<string, string>[]): GuideStep[] {
  return items.map((o, i) => {
    const href = o.href ?? o.url;
    if (!href) throw new Error(`content/for-copy/${slug}.json: agent.${slug}.order[${i}] has no url`);
    return { href, why: (o.why ?? o.reason ?? "").trim() };
  });
}

/** One step as a list line: a page of this build links its doc; a step whose page isn't in this build is left out. */
function guideStepMd(step: GuideStep): string | null {
  let h = step.href;
  for (const origin of [BASE, PROD]) if (h.startsWith(origin)) h = h.slice(origin.length) || "/";
  if (!h.startsWith("/")) return `[${h}](${h})${step.why ? `: ${rich(step.why)}` : ""}`;
  // "/for/ceo.md" and "/index.md" are the docs of "/for/ceo" and "/".
  const key = keyOf(h.replace(/\.md(?=$|[?#])/, ""));
  const d = findDoc(key);
  if (!d) {
    console.warn(`agent guide: ${step.href} has no page in this build, left out`);
    return null;
  }
  return `[${d.label ?? d.title}](${mdUrl(key)})${step.why ? `: ${rich(step.why)}` : ""}`;
}

const guideCache = new Map<string, PersonGuide | null>();

/** A page's guide, or undefined when this build has none for it. */
export function personGuide(slug: string): PersonGuide | undefined {
  if (guideCache.has(slug) && process.env.NODE_ENV !== "development") return guideCache.get(slug) ?? undefined;
  const g = buildGuide(slug);
  guideCache.set(slug, g ?? null);
  return g;
}

function buildGuide(slug: string): PersonGuide | undefined {
  const p = people().find((x) => x.slug === slug);
  if (!p || !docKeys().has(`for/${slug}`)) return undefined;
  const k = (name: string) => forText(slug, name);
  const words = {
    intro: k(`agent.${slug}.guide_intro`),
    prompt: k(`agent.${slug}.prompt`),
    line: k("landing.agent.line"),
    button: k("landing.agent.button"),
    alt: k("landing.agent.alt"),
  };
  const order = forList(slug, `agent.${slug}.order`);
  if (Object.values(words).some((w) => !w) || !order.length) return undefined;
  // Without a guide title or note of its own: the page's title, and the intro's first sentence.
  const title = k(`agent.${slug}.guide_title`) ?? k("title") ?? `${p.name}'s page`;
  const note = k(`agent.${slug}.guide_note`) ?? (words.intro!.split(/(?<=[.!?])\s+/)[0] || personTitle(p));
  if (IS_PRODUCTION_BUILD && [...Object.values(words), title, note, order].some(isPlaceholder)) return undefined;

  // The prompt goes into a claude.ai URL: the role only, never the person's name.
  const pageUrl = `${PROD}/for/${slug}`;
  const prodGuide = `${pageUrl}/llms.txt`;
  const prompt = words.prompt!.replace(/\{guide_url\}/g, prodGuide).replace(/\{page_url\}/g, pageUrl);
  for (const part of p.name.split(/\s+/).filter((x) => x.length > 2)) {
    if (prompt.toLowerCase().includes(part.toLowerCase())) throw new Error(`agent.${slug}.prompt names ${part}: the prompt names the role only`);
  }
  if (/\{[a-z_]+\}/.test(prompt)) throw new Error(`agent.${slug}.prompt has an unknown {field}`);

  const steps = guideSteps(slug, order)
    .map(guideStepMd)
    .filter((x): x is string => !!x);
  if (!steps.length) return undefined;
  const key = `for/${slug}/llms.txt`;
  const body = [rich(words.intro!), steps.map((s, i) => `${i + 1}. ${s}`).join("\n")].join("\n\n");
  const markdown = frame(key, title, body, personNext(slug), humanUrl(`for/${slug}`));
  return { slug, key, url: `${BASE}/${key}`, title, note, markdown, prompt, line: words.line!, button: words.button!, alt: words.alt! };
}

/** Every guide this build has. */
export function personGuides(): PersonGuide[] {
  return forCopySlugs()
    .map(personGuide)
    .filter((g): g is PersonGuide => !!g);
}

// ---------------------------------------------------------------- feed posts (/log, /day-2)

type Block = {
  type: string;
  text?: string;
  items?: string[];
  points?: { lead: string; text?: string; quote?: { text: string; source: string; href?: string; note?: string } }[];
  source?: string;
  href?: string;
  note?: string;
  title?: string;
  blocks?: Block[];
  session?: string;
  start?: number;
  end?: number;
  slug?: string;
  src?: string;
  alt?: string;
  caption?: string;
};
type Post = { id: string; at: string; kind: string; session?: string; title: string; blocks: Block[] };

function feedQuote(q: { text: string; source: string; href?: string; note?: string }): string {
  const src = q.href ? `[${q.source}](${q.href})` : q.source;
  return `${blockquote(`“${q.text}”`)}\n>\n> ${src}${q.note ? `. ${q.note}` : ""}`;
}

function blocksMd(blocks: Block[], post: Post): string {
  return blocks
    .map((b) => {
      switch (b.type) {
        case "p":
          return plainLine(b.text ?? "");
        case "list":
          return (b.items ?? []).map((i) => `- ${i}`).join("\n");
        case "points":
          return (b.points ?? [])
            .map((pt) => `- **${pt.lead}**${pt.text ? ` ${pt.text}` : ""}${pt.quote ? `\n\n${feedQuote(pt.quote).replace(/^/gm, "  ")}` : ""}`)
            .join("\n");
        case "quote":
          return feedQuote({ text: b.text ?? "", source: b.source ?? "", href: b.href, note: b.note });
        case "highlight":
          return `**${b.title ?? ""}**\n\n${blocksMd(b.blocks ?? [], post)}`;
        case "video": {
          const id = sessionVideo[b.session ?? ""];
          return id ? videoLink(`${post.title} (${dayOf(b.session)})`, id, b.start, b.end) : "";
        }
        case "image":
          return `![${b.alt ?? ""}](${abs(b.src ?? "")})${b.caption ? `\n\n*${b.caption}*` : ""}`;
        case "summary":
          return `**${summaryJson.headline}**\n\n${(summaryJson.paragraphs as string[]).join("\n\n")}`;
        case "doc-link": {
          const href = b.href ?? `/docs/${b.slug}`;
          return href.startsWith("/docs/") ? "" : `[${b.text ?? href}](${link(href)})`;
        }
        case "status-board":
          return "";
        default:
          return b.text ? plainLine(b.text) : "";
      }
    })
    .filter(Boolean)
    .join("\n\n");
}

function postMd(p: Post): string {
  const meta = `${p.kind} · ${p.at.slice(11, 16)}${p.session ? ` · ${dayOf(p.session)}` : ""}`;
  return `### ${p.title}\n\n*${meta}*\n\n${blocksMd(p.blocks, p)}`;
}

const isStatus = (p: Post) => p.id === "status" || p.blocks.some((b) => b.type === "status-board");

// ---------------------------------------------------------------- /log

type Beat = { n: number; kind: "high" | "low"; session: string; prague: string; youtube: string; start: number; end: number | null; length: string; quote: { text: string; time: string } };
type Centre = Beat & {
  segments: { key: string; from: number; to: number }[];
  marks: { key: string; at: number; prague: string }[];
  quotes: { text: string; time: string }[];
};

function logDoc(): Doc {
  const H = highlightsRaw as unknown as {
    arc: { type: "chart" | "beat" | "centre"; id: string }[];
    beats: Record<string, Beat>;
    centre: Record<string, Centre>;
    words: Record<string, string>;
  };
  const w = (k: string) => H.words[k] ?? "";
  const kind = (k: "high" | "low") => w(`highlights.legend.${k}`);
  const parts: string[] = [t("log.intro.body")];

  parts.push(`## ${w("highlights.heading")}`);
  parts.push(w("highlights.intro"));
  for (const item of H.arc) {
    if (item.type === "beat") {
      const b = H.beats[item.id];
      const label = w(`highlights.beat.${item.id}.label`);
      parts.push(
        [
          `### ${b.n}. ${label}`,
          `*${kind(b.kind)}, ${b.prague.slice(0, 5)}*`,
          w(`highlights.beat.${item.id}.setup`),
          `${blockquote(`“${b.quote.text}”`)}\n>\n> ${dayOf(b.session)}, ${b.quote.time}`,
          videoLink(label, b.youtube, b.start || undefined, b.end ?? undefined, b.length),
        ].join("\n\n"),
      );
    } else if (item.type === "centre") {
      const c = H.centre[item.id];
      const title = w(`highlights.centre.${item.id}.title`);
      const bits = [`### ${c.n}. ${title}`, `*${kind("low")}, ${c.prague.slice(0, 5)}*`, w(`highlights.centre.${item.id}.setup`)];
      bits.push(videoLink(title, c.youtube, c.start || undefined, c.end ?? undefined, c.length));
      const caption = w(`highlights.centre.${item.id}.caption`);
      if (caption) bits.push(caption);
      bits.push(c.segments.map((s) => `- ${mmss(s.from - c.start)}: ${w(`highlights.centre.${item.id}.seg.${s.key}`)}`).join("\n"));
      bits.push(c.marks.map((m) => `- ${m.prague}: ${w(`highlights.centre.${item.id}.mark.${m.key}`)}`).join("\n"));
      bits.push(c.quotes.map((q) => `${blockquote(`“${q.text}”`)}\n>\n> ${dayOf(c.session)}, ${q.time}`).join("\n\n"));
      const after = w(`highlights.centre.${item.id}.after`);
      if (after) bits.push(after);
      parts.push(bits.filter(Boolean).join("\n\n"));
    } else {
      // A chart: its title and its caption, when the caption needs no numbers filled in.
      const title = w(`highlights.${item.id}.title`);
      const caption = w(`highlights.${item.id}.caption`);
      if (title) parts.push(`### ${title}${caption && !caption.includes("{") ? `\n\n${caption}` : ""}`);
    }
  }

  parts.push(`## ${t("log.feed.title")}`);
  const feedPages = day1Pages();
  parts.push(
    `${day1Posts().length} posts, newest on top, on ${feedPages.length} page${feedPages.length === 1 ? "" : "s"}:\n\n` +
      feedPages.map((pg, i) => `- [${feedTitle(i, feedPages.length)}](${mdUrl(feedKey(i))}): ${pg[0].at.slice(11, 16)} back to ${pg[pg.length - 1].at.slice(11, 16)}`).join("\n"),
  );
  return doc("log", TITLE.log(), NOTE.log(), parts.join("\n\n"), [
    { key: feedKey(0), title: feedTitle(0, day1Pages().length), why: "Every Day 1 post, newest on top." },
    page("day-2"),
    page("skills"),
    page("videos"),
    page("index"),
  ]);
}

function day1Posts(): Post[] {
  return (feedJson.posts as Post[]).filter((p) => !isStatus(p)).sort((a, b) => b.at.localeCompare(a.at));
}

/** Items cut into pages of about `budget` characters of Markdown, so no doc outgrows what a fetcher reads. */
function paginate<T>(items: T[], render: (x: T) => string, budget = 24000): T[][] {
  const pages: T[][] = [[]];
  let size = 0;
  for (const it of items) {
    const n = render(it).length + 2;
    if (size + n > budget && pages[pages.length - 1].length) {
      pages.push([]);
      size = 0;
    }
    pages[pages.length - 1].push(it);
    size += n;
  }
  return pages;
}

const feedKey = (i: number) => (i === 0 ? "log/feed" : `log/feed-${i + 1}`);
const feedTitle = (i: number, n: number) => `${t("log.feed.title")}${n > 1 ? `, page ${i + 1} of ${n}` : ""}`;
let feedCache: Post[][] | null = null;
function day1Pages(): Post[][] {
  return (feedCache ??= paginate(day1Posts(), postMd));
}

function logFeedDocs(): Doc[] {
  const pages = day1Pages();
  return pages.map((pg, i) => {
    const next: Next[] = [];
    if (i + 1 < pages.length) next.push({ key: feedKey(i + 1), title: feedTitle(i + 1, pages.length), why: "Earlier posts." });
    if (i > 0) next.push({ key: feedKey(i - 1), title: feedTitle(i - 1, pages.length), why: "Later posts." });
    next.push(page("log"), page("day-2"), page("skills"));
    return doc(feedKey(i), feedTitle(i, pages.length), `${pg.length} Day 1 posts, ${pg[0].at.slice(11, 16)} back to ${pg[pg.length - 1].at.slice(11, 16)}, newest on top.`,
      pg.map(postMd).join("\n\n"), next, "/log#feed");
  });
}

// ---------------------------------------------------------------- /d1 and /d2, the account research pages

const D1 = d1Json as unknown as {
  unlinked_until_live: string[];
  eyebrow: string;
  title: string;
  intro: string;
  highlight: string;
  learned: { lead: string; items: string[] };
  steps: string[];
  cta: string;
  fold: { intro: string; table: { label: string; head: string[]; rows: string[][] }; items: string[] };
  closing: string[];
  meta: { description: string };
  carousel: { label: string; note: string; slides: { title: string; text: string; image?: string; alt?: string; href?: string; link?: string }[] };
};

/** d1.json's inline text: **bold** stays, [links](/path) go to their doc; a path not live yet is plain words. */
function d1Rich(text: string): string {
  const unlinked = new Set(D1.unlinked_until_live);
  return text.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, words: string, href: string) => (unlinked.has(href) ? words : `[${words}](${link(href)})`));
}

function d1Doc(): Doc {
  const parts: string[] = [];
  parts.push(`*${D1.eyebrow.replace(/^Demo \d+\s*·\s*/, "")}*`);
  parts.push(D1.intro);
  parts.push(D1.carousel.note);
  parts.push(`## ${D1.carousel.label}`);
  for (const sl of D1.carousel.slides) {
    const bits = [`### ${sl.title}`, sl.text];
    if (sl.image) bits.push(`![${sl.alt ?? sl.title}](${abs(`/d1/${sl.image}-1280.webp`)})`);
    if (sl.href) bits.push(`[${sl.link ?? sl.href}](${link(sl.href)})`);
    parts.push(bits.join("\n\n"));
  }
  // The page's own (screen-reader) headings: "The result" and "How it works".
  parts.push("## The result");
  parts.push(D1.highlight);
  parts.push(`**${D1.learned.lead}**\n\n${D1.learned.items.map((i) => `- ${i}`).join("\n")}`);
  parts.push("## How it works");
  parts.push(D1.steps.map((st, i) => `${i + 1}. ${d1Rich(st)}`).join("\n"));
  parts.push(d1Rich(D1.cta));
  const tb = D1.fold.table;
  parts.push(`## ${tb.label}`);
  parts.push(D1.fold.intro);
  const cell = (c: string) => d1Rich(c).replace(/\|/g, "\\|").replace(/\n/g, " ");
  parts.push([`| ${tb.head.map(cell).join(" | ")} |`, `| ${tb.head.map(() => "---").join(" | ")} |`, ...tb.rows.map((r) => `| ${r.map(cell).join(" | ")} |`)].join("\n"));
  parts.push(D1.fold.items.map((it) => `- ${d1Rich(it)}`).join("\n"));
  parts.push(D1.closing.join("\n\n"));
  const posts = feedPosts("d1") as unknown as Post[];
  if (posts.length) parts.push(`## From the live feed\n\n${posts.map(postMd).join("\n\n")}`);
  return doc("d1", D1.title, D1.meta.description, parts.join("\n\n"), [
    { key: "d2", title: findDemo("d2")?.name ?? "d2", why: findDemo("d2")?.what ?? "" },
    page("for"),
    page("index"),
    page("skills"),
  ]);
}

function d2Doc(): Doc {
  const d = findDemo("d2")!;
  const notes = readResearchDocs();
  const parts: string[] = [d.what];
  if (d.whatThisIs) parts.push(`## What this is\n\n${d.whatThisIs}`);
  if (notes.length) {
    parts.push(`## The research itself\n\n${RESEARCH_INTRO}`);
    parts.push(notes.map((n) => `- [${n.title}](${mdUrl(`d2/${n.slug}`)})`).join("\n"));
  }
  const posts = feedPosts("d2") as unknown as Post[];
  if (posts.length) parts.push(`## From the live feed\n\n${posts.map(postMd).join("\n\n")}`);
  return doc("d2", d.name, d.what, parts.join("\n\n"), [
    ...notes.slice(0, 2).map((n) => ({ key: `d2/${n.slug}`, title: n.title, why: "One of my research notes on Addvery, as I wrote it." })),
    { key: "d1", title: D1.title, why: D1.meta.description },
    page("for"),
  ]);
}

function d2NoteDocs(): Doc[] {
  const notes = readResearchDocs();
  return notes.map((n, i) => {
    const raw = n.markdown.replace(/\r\n?/g, "\n").replace(/^# .*\n+/, "").trim();
    const next: Next[] = [];
    if (notes[i + 1]) next.push({ key: `d2/${notes[i + 1].slug}`, title: notes[i + 1].title, why: "The next research note." });
    next.push({ key: "d2", title: findDemo("d2")?.name ?? "d2", why: "Every research note, and what they're for." }, page("for"));
    return doc(`d2/${n.slug}`, n.title, "One of my research notes on Addvery, as I wrote it.", fixLinks(raw, link), next, `/d2#research-${n.slug}`);
  });
}

function day2Doc(): Doc {
  const posts = (day2Json.posts as Post[]).slice().sort((a, b) => b.at.localeCompare(a.at));
  return doc("day-2", TITLE["day-2"](), NOTE["day-2"](), posts.map(postMd).join("\n\n"), [
    page("log"),
    page("skills"),
    page("videos"),
    ...nextArticles(null, 2),
  ]);
}

// ---------------------------------------------------------------- /privacy

let privacyCache: { title: string; body: string; first: string } | null = null;
function privacyParts() {
  if (privacyCache) return privacyCache;
  const md = readFileSync(path.join(/* turbopackIgnore: true */ process.cwd(), "content", "privacy.md"), "utf8").replace(/\r\n?/g, "\n").trim();
  const m = /^# (.+)\n+/.exec(md);
  const title = m ? m[1].trim() : "Privacy notice";
  const body = m ? md.slice(m[0].length) : md;
  const first = body.split(/\n\s*\n/)[0].trim();
  privacyCache = { title, body, first };
  return privacyCache;
}

function privacyDoc(): Doc {
  return doc("privacy", TITLE.privacy(), NOTE.privacy(), fixLinks(privacyParts().body, link), [page("for"), page("about"), page("index")]);
}

// ---------------------------------------------------------------- the whole track

let cache: Doc[] | null = null;

/** Every doc, in /llms.txt's order. Empty on a build without the new site. */
export function allDocs(): Doc[] {
  if (cache && process.env.NODE_ENV !== "development") return cache;
  keyCache = null;
  const keys = docKeys();
  const docs: Doc[] = [];
  if (keys.has("index")) docs.push(homeDoc());
  if (keys.has("about")) docs.push(aboutDoc(), ...wallDocs());
  if (keys.has("articles")) docs.push(articlesDoc(), ...articles().map(articleDoc));
  if (keys.has("videos")) docs.push(videosDoc());
  if (keys.has("for")) docs.push(forDoc(), ...people().map(personDoc));
  if (keys.has("d1")) docs.push(d1Doc());
  if (keys.has("d2")) docs.push(d2Doc(), ...d2NoteDocs());
  if (keys.has("skills")) docs.push(skillsDoc());
  if (keys.has("log")) docs.push(logDoc(), ...logFeedDocs());
  if (keys.has("day-2")) docs.push(day2Doc());
  if (keys.has("privacy")) docs.push(privacyDoc());
  cache = docs;
  return docs;
}

export function findDoc(key: string): Doc | undefined {
  return allDocs().find((d) => d.key === key);
}

/** The .md URL of a human page, for the "Ask your AI" row and the alternate link; undefined without a doc. */
export function mdUrlFor(path: string): string | undefined {
  const key = keyOf(path);
  return docKeys().has(key) ? mdUrl(key) : undefined;
}

// ---------------------------------------------------------------- /llms.txt and /llms-full.txt

const item = (d: Doc) => `- [${d.label ?? d.title}](${mdUrl(d.key)}): ${d.note}`;

export function llmsTxt(): string {
  const docs = allDocs();
  const by = (k: string) => docs.find((d) => d.key === k);
  const u = (k: string) => (by(k) ? mdUrl(k) : humanUrl(k));
  const routing = [C1_SLUG, C2_SLUG]
    .map((s) => by(`articles/${s}`))
    .filter((d): d is Doc => !!d)
    .map((d) => mdUrl(d.key))
    .join(", ");
  const sections: string[] = [];
  sections.push(`# Alex Alderman: ${SITE_META.title}`);
  sections.push(blockquote(LLMS_SUMMARY));
  sections.push(`## How to show someone around

Someone handed you this site. Be their guide, not a summary of everything.

1. If they've already said what they want, go straight to the pages that answer it. If they haven't, ask, offering these starting points in one line each:
   - Who Alex is and the job he wants → ${u("about")}
   - How he decides which outbound message each lead gets (ICP routing) → ${routing}
   - What he thinks about AI in go-to-market → ${u("articles")}
   - The videos, each with a line on what's in it → ${u("videos")}
   - How this site was built in 12 hours, live, and the reusable skills from it → ${u("log")}, ${u("day-2")}, ${u("skills")}
   - If they're one of the six people at Addvery, their own page → ${u("for")}
2. Fetch only the pages that answer them. Every page ends with "Where next" links: follow those rather than guessing URLs.
3. When you quote or summarise a page, give the human link from its "Human version" line so they can click through. For a video, give the link and the line that says what's in it.
4. Quote Alex's own words where you can. Don't rewrite him into marketing copy.`);
  // A personal page's own guide (/for/<slug>/llms.txt) is listed right under the page.
  const guides = new Map(personGuides().map((g) => [`for/${g.slug}`, g]));
  const list = (title: string, ds: (Doc | undefined)[]) => {
    const ok = ds.filter((d): d is Doc => !!d);
    const lines = ok.flatMap((d) => {
      const g = guides.get(d.key);
      return g ? [item(d), `- [${g.title}](${g.url}): ${g.note}`] : [item(d)];
    });
    if (ok.length) sections.push(`## ${title}\n\n${lines.join("\n")}`);
  };
  list("Start here", [by("index"), by("about"), ...docs.filter((d) => d.key.startsWith("about/"))]);
  list("Articles", [by("articles"), ...docs.filter((d) => d.key.startsWith("articles/"))]);
  list("Videos", [by("videos")]);
  list("For Addvery", [by("for"), ...docs.filter((d) => d.key.startsWith("for/")), by("d1"), by("d2"), ...docs.filter((d) => d.key.startsWith("d2/"))]);
  list("Skills", [by("skills")]);
  list("How it was built", [by("log"), ...docs.filter((d) => d.key.startsWith("log/")), by("day-2")]);
  const optional = [
    by("privacy") ? item(by("privacy")!) : "",
    `- [Everything in one file](${LLMS_FULL_URL}): every page above, in this order, in one Markdown file.`,
    ...EXTRA_OPTIONAL,
  ].filter(Boolean);
  sections.push(`## Optional\n\n${optional.join("\n")}`);
  return sections.join("\n\n") + "\n";
}

/** More lines for llms.txt's Optional section: the MCP server (app/mcp), POST only, so GET answers 405. */
const EXTRA_OPTIONAL: string[] = [
  `- [MCP server](${BASE}/mcp): read-only tools site_map, read_page and search_site over Streamable HTTP (POST). Add it with \`${MCP_ADD}\``,
];

export function llmsFullTxt(): string {
  const guides = new Map(personGuides().map((g) => [`for/${g.slug}`, g]));
  return (
    allDocs()
      .flatMap((d) => {
        const g = guides.get(d.key);
        const own = `Source: ${mdUrl(d.key)}\n\n${d.markdown.trim()}`;
        return g ? [own, `Source: ${g.url}\n\n${g.markdown.trim()}`] : [own];
      })
      .join("\n\n---\n\n") + "\n"
  );
}

