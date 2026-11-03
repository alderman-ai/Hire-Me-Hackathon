"use client";

/*
 * The build strip (3 Nov, Alex via orchestration M1+M2): a slim console line above the header, on
 * every page. It sits apart from the Addvery look on purpose: ink background, a monospace face, and
 * the only green on the site (the dot and the countdown). Left: the build's status and the countdown
 * to Day 2 going live. Right: the way into Day 1's feed at /log.
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

export type HackWords = { before: string; live: string; button: string; buttonShort: string };

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
            // The words around the countdown may be cut short on a phone; the countdown never is.
            <span className="hack-text hack-split">
              {pre && <span className="hack-part">{pre}</span>}
              <span className="hack-count" role="timer">
                {left === null ? "0:00:00" : hms(left)}
              </span>
              {post && <span className="hack-part">{post}</span>}
            </span>
          )}
        </p>
        <Link href="/log" className="hack-button">
          <span className="hack-button-long">{words.button}</span>
          <span className="hack-button-short">{words.buttonShort}</span>
        </Link>
      </div>
    </div>
  );
}
