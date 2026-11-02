import build from "@/content/build.json";
import deliverablesJson from "@/content/deliverables.json";
import docsIndex from "@/content/docs/index.json";
import type { Block } from "./feed";

// The demo pages (/d1 to /d10). Each joins its row in content/build.json (name, what you'll see,
// status) with its page copy in content/deliverables.json, keyed by slug: "d" + the demo's number.

type DemoCopy = { what_this_is: string; pending?: string; blocks?: Block[] };

const copy: Record<string, DemoCopy | undefined> = deliverablesJson.demos;
const toolingDocs: Record<string, string | undefined> = deliverablesJson.tooling_docs;

export type Demo = {
  slug: string;
  n: number;
  name: string;
  what: string;
  status: string;
  whatThisIs?: string;
  pending: string;
  blocks: Block[];
};

export function demoSlug(n: number): string {
  return `d${n}`;
}

export function allDemos(): Demo[] {
  return build.demos.map((row) => {
    const slug = demoSlug(row.n);
    const page = copy[slug];
    return {
      slug,
      n: row.n,
      name: row.demo,
      what: row.what,
      status: row.status,
      whatThisIs: page?.what_this_is,
      pending: page?.pending ?? deliverablesJson.default_pending,
      blocks: page?.blocks ?? [],
    };
  });
}

export function findDemo(slug: string): Demo | undefined {
  return allDemos().find((d) => d.slug === slug);
}

// The doc page a tooling row links to, only if that doc is on the site.
export function toolingDocSlug(piece: string): string | undefined {
  const slug = toolingDocs[piece];
  return slug && docsIndex.docs.some((d) => d.slug === slug) ? slug : undefined;
}
