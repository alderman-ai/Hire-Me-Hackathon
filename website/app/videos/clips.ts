import wall from "@/content/videos-wall.json";
import { entryUrl, visibleEntries } from "../articles/entries";

// /videos' clips (content/videos-wall.json, in wall order), with the article that carries each one. A plain
// module, so the page (app/videos/page.tsx) and the agent track (lib/agent-track) read the same list.

type RawClip = (typeof wall.items)[number];

export type Clip = {
  id: string;
  youtube_id: string;
  start: number;
  end: number;
  duration_s: number;
  hook: string;
  tag: string;
  featured: boolean;
  poster: string;
  /** The article that carries this clip on top, in this build, or null. */
  article: string | null;
};

/** 59 -> "0:59", 100 -> "1:40" */
export function clock(s: number) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

/** 59 -> "59 seconds", 87 -> "1 minute 27 seconds", for screen readers. */
export function spoken(s: number) {
  const m = Math.floor(s / 60);
  const r = s % 60;
  const out: string[] = [];
  if (m) out.push(`${m} minute${m === 1 ? "" : "s"}`);
  if (r || !m) out.push(`${r} second${r === 1 ? "" : "s"}`);
  return out.join(" ");
}

/** The article that carries this clip on top, if this build has one: same video, starting inside the clip. */
function articleFor(c: RawClip): string | null {
  const e = visibleEntries().find((x) => {
    const v = x.video;
    if (!v || v.youtube_id !== c.youtube_id) return false;
    const start = v.start ?? 0;
    return start >= c.start - 5 && start < c.end;
  });
  return e ? entryUrl(e.slug) : null;
}

export function wallClips(): Clip[] {
  return wall.items.map((c) => ({
    id: c.id,
    youtube_id: c.youtube_id,
    start: c.start,
    end: c.end,
    duration_s: c.duration_s,
    hook: c.hook,
    tag: c.tag,
    featured: c.featured,
    poster: c.poster,
    article: articleFor(c),
  }));
}
