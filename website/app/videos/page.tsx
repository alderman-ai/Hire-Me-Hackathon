import type { Metadata } from "next";
import { notFound } from "next/navigation";
import stakeholders from "@/content/stakeholders.json";
import { t } from "../copy";
import { VIDEO_WALL } from "../flags";
import { clock, spoken, wallClips } from "./clips";
import { StarMark, VideoWall, type WallClip } from "./video-wall";
import { markdownAlternate } from "../page-meta";
import "./videos.css";

// /videos (VERDICT.md 2.3; build request W13; rebuilt 3 Nov as one flat wall): the clips from
// content/videos-wall.json (orchestration/local/videos-wall/wall.json, in its order; posters in
// public/videos/wall/), each card opening a native <dialog> with the player, and "Read the article" when
// an article carries that clip. The intro and the legend are in content/site-copy.json (alex-voice).
// Only a build with VIDEO_WALL=1 has the page; any other build answers 404, and the menu leaves it out.

export const metadata: Metadata = {
  title: "Videos · Hire Me Hackathon",
  alternates: { canonical: "/videos", types: markdownAlternate("/videos") },
};

export default function VideosPage() {
  if (!VIDEO_WALL) notFound();

  const clips: WallClip[] = wallClips().map((c) => ({
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
    article: c.article,
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
