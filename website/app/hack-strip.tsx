"use client";

/*
 * The hackathon menu bar (3 Nov; Alex: "treat this new hackathon menu bar as a bar with menu items, and
 * break day 1 into 2-3 logical menu buttons ... on desktop at least, double its height"). It sits above
 * the disclaimer on every page and is set apart from the Addvery look on purpose: ink, a monospace face,
 * and the site's only green (the dot and the countdown).
 *
 * Left: the build's status from the recording clock (status.json, published by scripts/clock_sync.py),
 * in three states (Alex, 3 Nov): "LIVE!" with the 12 hours' countdown ticking while a session records,
 * "On Break" with it frozen between sessions, and "Finished at <8:32pm on 11 Nov>" with "Built in:
 * <11 hrs 36 mins>" once the build is called done. Right: Day 1's menu, then Day 2's.
 *
 * The words come from content/site-copy.json (hack.*) through the layout, so this file holds none.
 */

import Link from "next/link";
import { useEffect, useState } from "react";
import { POLL_MS, STATUS_URL, remaining, type Status } from "@/lib/status";

export type HackItem = { href: string; label: string };
/** A run of menu cells: Day 1's (with its "Day 1" label), then Day 2's (`fresh`: the newest, with a dot). */
export type HackGroup = { label?: string; fresh?: boolean; items: HackItem[] };
/** `finished` holds {when}, `built` holds {duration}. */
export type HackWords = { live: string; onBreak: string; finished: string; built: string; menuLabel: string; groups: HackGroup[] };

/** 11,031 s becomes "3:03:51". */
function hms(seconds: number) {
  const s = Math.max(0, Math.floor(seconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return `${h}:${String(m).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

/** "8:32pm on 11 Nov", in Prague time, whatever the visitor's own time zone. */
function whenPrague(epoch: number) {
  const d = new Date(epoch * 1000);
  const time = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Prague", hour: "numeric", minute: "2-digit", hour12: true })
    .format(d)
    .replace(/\s/g, "")
    .toLowerCase();
  const day = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Prague", day: "numeric", month: "short" }).format(d);
  return `${time} on ${day}`;
}

/** 41,760 s becomes "11 hrs 36 mins". */
function hrsMins(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h} hrs ${m} mins`;
}

/** The clock's status.json, polled while the tab is visible (the Blob store's read allowance is small). */
function useStatus(): Status | null {
  const [status, setStatus] = useState<Status | null>(null);
  useEffect(() => {
    let alive = true;
    const load = async () => {
      if (document.hidden) return;
      try {
        const res = await fetch(STATUS_URL, { cache: "no-store" });
        if (res.ok && alive) setStatus(await res.json());
      } catch {
        // Keep the last good status; the next poll retries.
      }
    };
    load();
    const id = window.setInterval(load, POLL_MS);
    document.addEventListener("visibilitychange", load);
    return () => {
      alive = false;
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", load);
    };
  }, []);
  return status;
}

/** The time now in seconds, ticking on the second; null until the page has hydrated. */
function useNow(): number | null {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    let every: number | undefined;
    setNow(Date.now() / 1000);
    const first = window.setTimeout(() => {
      setNow(Date.now() / 1000);
      every = window.setInterval(() => setNow(Date.now() / 1000), 1000);
    }, 1000 - (Date.now() % 1000));
    return () => {
      window.clearTimeout(first);
      if (every) window.clearInterval(every);
    };
  }, []);
  return now;
}

export function HackStrip({ words }: { words: HackWords }) {
  const status = useStatus();
  const now = useNow();
  const finished = status?.status === "finished" && status.finished_at != null;
  const clock = status && now !== null && !finished ? remaining(status, now) : null;
  const state = !status || now === null ? "pending" : finished ? "finished" : clock?.running ? "live" : "break";

  return (
    <div className="hack-strip" data-state={state}>
      <div className="hack-inner">
        <p className="hack-line">
          <span className="hack-dot" aria-hidden="true" />
          {finished && status ? (
            <span className="hack-text hack-split">
              <span className="hack-label">{words.finished.replace("{when}", whenPrague(status.finished_at as number))}</span>
              <span className="hack-sep" aria-hidden="true" />
              <span className="hack-part">{words.built.replace("{duration}", hrsMins(status.built_seconds ?? status.banked_seconds))}</span>
            </span>
          ) : (
            <span className="hack-text hack-split">
              {state !== "pending" && <span className="hack-label">{state === "live" ? words.live : words.onBreak}</span>}
              {state === "live" && clock && (
                <span className="hack-count" role="timer">
                  {hms(clock.seconds)}
                </span>
              )}
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
