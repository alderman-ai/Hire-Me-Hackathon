"use client";

/*
 * The end of an entry on the new site (VERDICT.md 2.3, the template's steps 6 and 7):
 *   - "Next for you": one large card, the next piece in the visitor's own list that they haven't opened
 *     yet (a cold visitor walks the "capabilities" list, else the default one);
 *   - the recommended rail, without the page they're on;
 *   - "Back to your page", once they have one (?for= or remembered: app/your-page.tsx).
 * What's been opened is remembered in localStorage inside try/catch; with storage blocked, "next" is
 * simply the next one in the list. The headings are working labels until alex-voice words them.
 */

import Link from "next/link";
import { useEffect, useState } from "react";
import type { RecCard } from "../recommend";
import { RecommendCarousel } from "../recommend-carousel";
import { readYourPage, withFor } from "../your-page";
import "./entry-end.css";

const SEEN = "hmh-seen";

function readSeen(): string[] {
  try {
    const v = JSON.parse(window.localStorage.getItem(SEEN) ?? "[]");
    return Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

/** Remember that this page was opened. Renders nothing. */
export function MarkSeen({ href }: { href: string }) {
  useEffect(() => {
    try {
      const seen = new Set(readSeen());
      seen.add(href);
      window.localStorage.setItem(SEEN, JSON.stringify([...seen].slice(-200)));
    } catch {}
  }, [href]);
  return null;
}

/** The next card after `current` in the list that isn't seen; wraps round once. */
function pickNext(list: RecCard[], current: string, seen: Set<string>): RecCard | undefined {
  if (!list.length) return undefined;
  const at = list.findIndex((c) => c.href === current);
  const order = at >= 0 ? [...list.slice(at + 1), ...list.slice(0, at)] : list;
  return order.find((c) => c.href !== current && !seen.has(c.href)) ?? order.find((c) => c.href !== current);
}

const thumb = (id: string) => `https://i.ytimg.com/vi/${id}/sddefault.jpg`;

/** `forced` pins the "Next for you" card (the C2 entry points at C1); other entries pick from the visitor's list. */
export function EntryEnd({
  current,
  lists,
  people,
  forced,
}: {
  current: string;
  lists: Record<string, RecCard[]>;
  people: string[];
  forced?: RecCard;
}) {
  const [who, setWho] = useState<string | null>(null);
  const [seen, setSeen] = useState<Set<string>>(new Set());
  useEffect(() => {
    setWho(readYourPage(people));
    setSeen(new Set(readSeen()));
  }, [people]);

  const own = who ? lists[who] : undefined;
  const walk = own ?? lists.capabilities ?? lists.default ?? [];
  const next = forced ?? pickNext(walk, current, seen);
  const rail = (own ?? lists.default ?? []).filter((c) => c.href !== current && c.href !== next?.href);

  return (
    <>
      {next && (
        <section className="ne" aria-labelledby="ne-heading">
          <div className="art-container">
            <h2 id="ne-heading" className="ne-heading">
              Next for you
            </h2>
            <Link href={withFor(next.href, who)} className="ne-card">
              <span className="ne-cover" aria-hidden="true">
                {next.youtube ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={thumb(next.youtube)} width={640} height={480} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
                ) : next.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={next.image.src} width={next.image.width} height={next.image.height} alt="" loading="lazy" decoding="async" />
                ) : (
                  <span className="ne-cover-text" />
                )}
              </span>
              <span className="ne-text">
                <span className="ne-title">{next.title}</span>
                <span className="ne-why">{next.why}</span>
                {next.placeholder && <span className="rc-placeholder">Placeholder list (preview only)</span>}
              </span>
            </Link>
          </div>
        </section>
      )}
      {rail.length > 0 && <RecommendCarousel heading="Recommended for you" cards={rail} forSlug={who ?? undefined} people={people} />}
      {who && (
        <div className="art-container">
          <p className="ne-back">
            <Link href={`/for/${who}`}>← Back to your page</Link>
          </p>
        </div>
      )}
    </>
  );
}
