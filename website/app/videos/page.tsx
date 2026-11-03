import type { Metadata } from "next";
import { notFound } from "next/navigation";
import wall from "@/content/videos-wall.json";
import stakeholders from "@/content/stakeholders.json";
import { t } from "../copy";
import { VIDEO_WALL } from "../flags";
import { entryUrl, visibleEntries } from "../articles/entries";
import { StarMark, VideoWall, type WallClip } from "./video-wall";
import "./videos.css";

// /videos (VERDICT.md 2.3; build request W13; rebuilt 3 Nov as one flat wall): the clips from
// content/videos-wall.json (orchestration/local/videos-wall/wall.json, in its order; posters in
// public/videos/wall/), each card opening a native <dialog> with the player, and "Read the article" when
// an article carries that clip. The intro and the legend are in content/site-copy.json (alex-voice).
// Only a build with VIDEO_WALL=1 has the page; any other build answers 404, and the menu leaves it out.

export const metadata: Metadata = {
  title: "Videos · Hire Me Hackathon",
  alternates: { canonical: "/videos" },
};

type RawClip = (typeof wall.items)[number];

/** 59 -> "0:59", 100 -> "1:40" */
function clock(s: number) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

/** 59 -> "59 seconds", 87 -> "1 minute 27 seconds", for screen readers. */
function spoken(s: number) {
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

export default function VideosPage() {
  if (!VIDEO_WALL) notFound();

  const clips: WallClip[] = wall.items.map((c) => ({
    id: c.id,
    youtube_id: c.youtube_id,
    start: c.start,
    end: c.end,
    length: clock(c.duration_s),
    spoken: spoken(c.duration_s),
    hook: c.hook,
    tag: c.tag,
    featured: c.featured,
    poster: c.poster,
    article: articleFor(c),
  }));
  const legend = t("videos.legend");
  const starLabel = legend.charAt(0).toUpperCase() + legend.slice(1);
  const people = stakeholders.pages.map((p) => p.slug);

  return (
    <main className="vw on-dark">
      <header className="vw-head">
        <div className="vw-glow" aria-hidden="true">
          <span className="vw-glow-hero" />
          <span className="vw-glow-contact" />
        </div>
        <div className="container vw-head-inner">
          <div className="vw-kicker-row">
            <span className="vw-kicker-bar" aria-hidden="true" />
            <p className="vw-kicker">Hire Me Hackathon</p>
          </div>
          <h1 className="vw-title">Videos</h1>
          <p className="vw-intro">{t("videos.intro")}</p>
        </div>
      </header>
      <div className="vw-wall">
        <div className="container">
          <p className="vw-legend">
            <StarMark small />
            {legend}
          </p>
          <VideoWall clips={clips} starLabel={starLabel} people={people} />
        </div>
      </div>
    </main>
  );
}
