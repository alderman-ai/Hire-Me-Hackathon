"use client";

import { useEffect, useState } from "react";
import { POLL_MS, STATUS_URL, Status, hms, remaining } from "@/lib/status";

function useStatus(): Status | null {
  const [status, setStatus] = useState<Status | null>(null);
  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch(STATUS_URL, { cache: "no-store" });
        if (res.ok && alive) setStatus(await res.json());
      } catch {
        // Keep the last good status; the next poll retries.
      }
    };
    load();
    const id = setInterval(load, POLL_MS);
    return () => {
      alive = false;
      clearInterval(id);
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

function Countdown({ status }: { status: Status | null }) {
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

// The webcam recording of the newest session that's online (scripts/upload_webcam.py).
function SessionVideo({ status }: { status: Status | null }) {
  const sessions = status?.sessions ?? [];
  const online = [...sessions].reverse().find((s) => s.youtube_id);
  if (online) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${online.youtube_id}`}
        title={`Session ${online.id}, webcam`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }
  const filed = [...sessions].reverse().find((s) => s.state === "filed");
  return (
    <div className="video-empty">
      {filed ? `The ${filed.id} recording goes up here soon.` : "The first recording goes up here soon."}
    </div>
  );
}

export default function Live() {
  const status = useStatus();
  return (
    <>
      <Countdown status={status} />
      <div className="video-frame">
        <SessionVideo status={status} />
      </div>
    </>
  );
}
