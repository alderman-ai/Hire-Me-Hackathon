"use client";

/*
 * The hackathon menu bar (3 Nov; Alex: "treat this new hackathon menu bar as a bar with menu items, and
 * break day 1 into 2-3 logical menu buttons ... on desktop at least, double its height"). It sits above
 * the disclaimer on every page and is set apart from the Addvery look on purpose: ink, a monospace face,
 * and the site's only green (the dot and the countdown). Left: the build's status and the countdown to
 * Day 2 going live. Right: Day 1's menu.
 *
 * The words come from content/site-copy.json (hack.*) through the layout, so this file holds none.
 */

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * 09:45 Europe/Prague on 3 Nov 2026. Prague is on CET (UTC+1) in November, so that's 08:45 UTC:
 * one fixed instant, whatever the visitor's own time zone.
 */
export const LIVE_AT_MS = Date.UTC(2026, 10, 3, 8, 45, 0);

export type HackItem = { href: string; label: string };
/** A run of menu cells: Day 1's (with its "Day 1" label), then Day 2's (`fresh`: the newest, with a dot). */
export type HackGroup = { label?: string; fresh?: boolean; items: HackItem[] };
export type HackWords = { before: string; live: string; menuLabel: string; groups: HackGroup[] };

/** 3,735,000 ms becomes "1:02:15". */
function hms(ms: number) {
  const s = Math.max(0, Math.ceil(ms / 1000));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return `${h}:${String(m).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

/** The time now, ticking on the second; null until the page has hydrated (the HTML is built ahead). */
function useNow(): number | null {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    let every: number | undefined;
    setNow(Date.now());
    const first = window.setTimeout(() => {
      setNow(Date.now());
      every = window.setInterval(() => setNow(Date.now()), 1000);
    }, 1000 - (Date.now() % 1000));
    return () => {
      window.clearTimeout(first);
      if (every) window.clearInterval(every);
    };
  }, []);
  return now;
}

export function HackStrip({ words }: { words: HackWords }) {
  const now = useNow();
  const left = now === null ? null : LIVE_AT_MS - now;
  const isLive = left !== null && left <= 0;
  const [pre, post = ""] = words.before.split("{countdown}");

  return (
    <div className="hack-strip" data-state={left === null ? "pending" : isLive ? "live" : "soon"}>
      <div className="hack-inner">
        <p className="hack-line">
          <span className="hack-dot" aria-hidden="true" />
          {isLive ? (
            <span className="hack-text">{words.live}</span>
          ) : (
            // The words around the countdown may wrap on a phone; the countdown stays whole.
            <span className="hack-text hack-split">
              {pre && <span className="hack-part">{pre}</span>}
              <span className="hack-count" role="timer">
                {left === null ? "0:00:00" : hms(left)}
              </span>
              {post && <span className="hack-part">{post}</span>}
            </span>
          )}
        </p>
        <nav className="hack-menu" aria-label={words.menuLabel}>
          {words.groups.map((g, gi) => (
            <div key={gi} className={`hack-group${g.fresh ? " is-fresh" : ""}`}>
              {g.label && (
                <span className="hack-menu-label" aria-hidden="true">
                  {g.label}
                </span>
              )}
              <ul>
                {g.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hack-item">
                      {g.fresh && <span className="hack-dot hack-item-dot" aria-hidden="true" />}
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
