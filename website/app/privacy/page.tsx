import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { marked } from "marked";

// The privacy notice for the GetSales alert (BUILD S-D3-B3). Text from getsales\site\privacy.md,
// copied into content\privacy.md. Reachable by URL only until Alex ticks the pre-send gate.

export const metadata: Metadata = {
  title: "Privacy notice · Hire Me Hackathon",
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  const markdown = readFileSync(path.join(process.cwd(), "content", "privacy.md"), "utf-8");
  const html = marked.parse(markdown, { async: false }) as string;
  return (
    <main className="doc-page">
      <p className="doc-back">
        <Link href="/">← Back to the live feed</Link>
      </p>
      <article className="doc" dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
