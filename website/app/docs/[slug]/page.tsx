import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { marked } from "marked";
import docsIndex from "@/content/docs/index.json";

// The charter and the meta specs, copied in with private details redacted by scripts/sync_docs.py.

export const dynamicParams = false;

type Doc = (typeof docsIndex.docs)[number];

function find(slug: string): Doc | undefined {
  return docsIndex.docs.find((d) => d.slug === slug);
}

export function generateStaticParams() {
  return docsIndex.docs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = find(slug);
  return { title: doc ? `${doc.label} · Hire Me Hackathon` : "Hire Me Hackathon" };
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = find(slug)!;
  const markdown = readFileSync(path.join(process.cwd(), "content", "docs", `${slug}.md`), "utf-8");
  const html = marked.parse(markdown, { async: false }) as string;
  return (
    <main className="doc-page">
      <p className="doc-back">
        <Link href="/">← Back to the live feed</Link>
      </p>
      <p className="doc-note">
        {doc.label}, shared from the project&rsquo;s working files as of {docsIndex.synced} Prague time. A few private
        details are redacted.
      </p>
      <article className="doc" dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
