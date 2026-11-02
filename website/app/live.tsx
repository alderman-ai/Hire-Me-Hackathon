"use client";

import { useEffect, useState } from "react";
import { POLL_MS, STATUS_URL, Status, hms, remaining } from "@/lib/status";

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
      ? `Recording ${status.session}`
      : status.status === "paused"
        ? `${status.session} paused`
        : "Between sessions";
  return (
    <div className="clock">
      <span className="clock-time" role="timer">
        {hms(left.seconds)}
      </span>
      <span className="clock-label">left of the 12 hours</span>
      <span className="clock-state">
        <span className={left.running ? "dot dot-live" : "dot"} aria-hidden="true" />
        {label}
      </span>
    </div>
  );
}
