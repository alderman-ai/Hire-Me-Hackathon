import type { Metadata } from "next";
import { notFound } from "next/navigation";
import wall from "@/content/video-wall.json";
import words from "@/content/video-words.json";
import stakeholders from "@/content/stakeholders.json";
import { IS_PRODUCTION_BUILD, VIDEO_WALL } from "../flags";
import { entryUrl, visibleEntries } from "../demos/entries";
import { VideoWall, type WallRow } from "./video-wall";
import "./videos.css";
import { dayOf } from "../day-label";

// /videos (VERDICT.md 2.3; build request W13): rows of 16:9 tiles, each opening a native <dialog> with
// the player, the summary and "Read the article" when an article carries that video. The rows come from
// content/video-wall.json (scripts/build_video_wall.py: the content library, the side cards and Alex's
// grades), the words from content/video-words.json (alex-voice). Only a build with VIDEO_WALL=1 has the
// page; any other build answers 404, and the menu leaves it out.

export const metadata: Metadata = {
  title: "Videos · Hire Me Hackathon",
  alternates: { canonical: "/videos" },
};

type Words = {
  intro: string | null;
  rows: Record<string, string>;
  items: Record<string, { title?: string; summary?: string }>;
};

type RawTile = (typeof wall.rows)[number]["tiles"][number] & { end?: number };

/** The article that carries this video on top, if this build has one: same video, starting inside the tile. */
function articleFor(t: RawTile): string | undefined {
  const e = visibleEntries().find((x) => {
    if (x.library_id === t.id) return true;
    const v = x.video;
    if (!v || v.youtube_id !== t.youtube_id) return false;
    const start = v.start ?? 0;
    return start >= t.start - 5 && (t.end === undefined || start < t.end);
  });
  return e ? entryUrl(e.slug) : undefined;
}

export default function VideosPage() {
  if (!VIDEO_WALL) notFound();
  const w = words as Words;
  const showPlaceholders = !IS_PRODUCTION_BUILD;

  const rows: WallRow[] = wall.rows
    .map((r) => ({
      key: r.key,
      label: w.rows[r.key] ?? r.label,
      tiles: (r.tiles as RawTile[]).map((t) => ({
        id: t.id,
        kind: t.kind,
        title: w.items[t.id]?.title ?? t.title,
        summary: w.items[t.id]?.summary ?? null,
        youtube_id: t.youtube_id,
        start: t.start,
        end: t.end ?? null,
        length: t.length,
        meta: t.session && t.prague ? `${dayOf(t.session)} · ${t.prague}` : null,
        still: t.still,
        article: articleFor(t) ?? null,
      })),
    }))
    .filter((r) => r.tiles.length > 0);

  const tiles = rows.reduce((n, r) => n + r.tiles.length, 0);
  const people = stakeholders.pages.map((p) => p.slug);

  return (
    <main className="vw on-dark">
      <header className="vw-head">
        <div className="container vw-head-inner">
          {showPlaceholders && (
            <p className="vw-flag">
              <strong>Preview only.</strong> {tiles} videos from the library, graded ones first (grades as of{" "}
              {wall.grades_as_of.slice(11)}); a No is off. Titles are the library&apos;s working titles until alex-voice
              words them.
            </p>
          )}
          <h1 className="vw-title">Videos</h1>
          {w.intro ? (
            <p className="vw-intro">{w.intro}</p>
          ) : (
            showPlaceholders && <p className="vw-placeholder">Placeholder (preview only): the intro line (alex-voice, K7).</p>
          )}
        </div>
      </header>
      <VideoWall rows={rows} people={people} showPlaceholders={showPlaceholders} />
    </main>
  );
}
