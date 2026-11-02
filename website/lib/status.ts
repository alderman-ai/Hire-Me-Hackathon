// Published by scripts/clock_sync.py. See CLAUDE.md.
export const STATUS_URL = "https://ijofoogwurqmq704.public.blob.vercel-storage.com/status.json";

export const POLL_MS = 15_000;
// The sync refreshes every 10 minutes while recording. Past this, assume it died.
export const STALE_SECONDS = 25 * 60;

export type SessionInfo = {
  id: string;
  seconds: number;
  state: string | null;
  youtube_id: string | null;
};

export type Status = {
  budget_seconds: number;
  banked_seconds: number;
  running_since: number | null;
  status: "recording" | "paused" | "idle";
  session: string | null;
  hackathon_start: number | null;
  sessions: SessionInfo[];
  published_at: number;
};

/** Seconds of the budget left at `now` (epoch seconds), and whether the clock is running. */
export function remaining(s: Status, now: number): { seconds: number; running: boolean; stale: boolean } {
  let used = s.banked_seconds;
  let running = s.status === "recording" && s.running_since !== null;
  const stale = running && now - s.published_at > STALE_SECONDS;
  if (running && s.running_since !== null) {
    // A stale clock stops where the sync last vouched for it.
    used += (stale ? s.published_at : now) - s.running_since;
  }
  if (stale) running = false;
  return { seconds: Math.max(s.budget_seconds - used, 0), running, stale };
}

export function hms(total: number): string {
  const t = Math.floor(total);
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  const sec = t % 60;
  return [h, m, sec].map((n) => String(n).padStart(2, "0")).join(":");
}
