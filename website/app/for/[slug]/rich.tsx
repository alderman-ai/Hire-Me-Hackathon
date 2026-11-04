import Link from "next/link";
import type { ReactNode } from "react";
import { forHref } from "./for-href";

// Inline words on a personal page: **bold** and [words](/path) links. An internal page link keeps the
// visitor's page in ?for=; a link to a file (/llms.txt, a .md) is a plain link.

/** Text with Markdown links: internal ones keep the visitor's page in ?for=. */
export function Inline({ text, slug }: { text: string; slug: string }) {
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const [, words, href] = m;
    out.push(
      href.startsWith("/") && !/\.(txt|md)$/.test(href.split("#")[0]) ? (
        <Link key={m.index} href={forHref(href, slug)}>
          {words}
        </Link>
      ) : (
        <a key={m.index} href={href}>
          {words}
        </a>
      ),
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

/** Text with **bold** and Markdown links. */
export function Rich({ text, slug }: { text: string; slug: string }) {
  return (
    <>
      {text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i}>
            <Inline text={part} slug={slug} />
          </strong>
        ) : (
          <Inline key={i} text={part} slug={slug} />
        ),
      )}
    </>
  );
}
