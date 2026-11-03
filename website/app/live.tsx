"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { POLL_MS, STATUS_URL, Status, hms, remaining } from "@/lib/status";
import { dayOf } from "./day-label";

function useStatus(): Status | null {
  const [status, setStatus] = useState<Status | null>(null);
  useEffect(() => {
    let alive = true;
    const load = async () => {
      // A tab left open in the background shouldn't spend the Blob store's read allowance.
      if (document.hidden) return;
      try {
        const res = await fetch(STATUS_URL, { cache: "no-store" });
        if (res.ok && alive) setStatus(await res.json());
      } catch {
        // Keep the last good status; the next poll retries.
      }
    };
    load();
    const id = setInterval(load, POLL_MS);
    document.addEventListener("visibilitychange", load);
    return () => {
      alive = false;
      clearInterval(id);
      document.removeEventListener("visibilitychange", load);
    };
  }, []);
  return status;
}

function useNow(): number {
  const [now, setNow] = useState(() => Date.now() / 1000);
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now() / 1000), 250);
    return () => clearInterval(id);
  }, []);
  return now;
}

// Addvery's odometer digits: the hours and minutes roll (600 ms) when they change; the seconds
// just tick, since a roll on every second would never settle.
function Digits({ text }: { text: string }) {
  return (
    <span className="clock-digits" aria-hidden="true">
      {[...text].map((ch, i) =>
        /\d/.test(ch) ? (
          <span key={i} className="clock-mask">
            <span
              className={i < 5 ? "clock-train clock-train-roll" : "clock-train"}
              style={{ "--digit": Number(ch) } as CSSProperties}
            >
              {"0123456789".split("").map((d) => (
                <span key={d}>{d}</span>
              ))}
            </span>
          </span>
        ) : (
          <span key={i} className="clock-sep">
            {ch}
          </span>
        ),
      )}
    </span>
  );
}

// The countdown of recorded time left, from status.json (scripts/clock_sync.py).
export default function Countdown() {
  const status = useStatus();
  const now = useNow();
  if (!status) {
    return (
      <div className="clock">
        <span className="clock-time">--:--:--</span>
        <span className="clock-label">left of the 12 hours</span>
      </div>
    );
  }
  const left = remaining(status, now);
  const label = left.stale
    ? "Clock stopped: lost the signal from the rig"
    : left.running
      ? `Recording ${dayOf(status.session)}`
      : status.status === "paused"
        ? `${dayOf(status.session)} paused`
        : "Between sessions";
  const time = hms(left.seconds);
  return (
    <div className="clock">
      <span className="clock-time" role="timer" aria-label={time}>
        <Digits text={time} />
      </span>
      <span className="clock-label">left of the 12 hours</span>
      <span className="clock-state">
        <span className={left.running ? "dot dot-live" : "dot"} aria-hidden="true" />
        {label}
      </span>
    </div>
  );
}
