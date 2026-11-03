import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Column, FeaturedPost, type Post } from "../feed";
import { NEW_SITE } from "../flags";
import { t } from "../copy";
import day2 from "@/content/feed-day2.json";
import videos from "@/content/videos.json";
import { DAY2_META, markdownAlternate } from "../page-meta";

// /day-2: Day 2's feed, newest on top (3 Nov; Alex: "this as Day 2 Update, have website place it at top of
// day 2 feed. and add button to it on top hackaton nav bar"). Posts are content/feed-day2.json, in the same
// shape as Day 1's; the newest is the wide featured block. The page exists once S17's video is uploaded
// (content/videos.json), the same test that shows its cell on the hackathon bar (app/layout.tsx).

export const metadata: Metadata = {
  title: `${DAY2_META.title} · Hire Me Hackathon`,
  description: DAY2_META.description,
  alternates: { types: markdownAlternate("/day-2") },
};

const READY = Boolean((videos as Record<string, string | undefined>).S17);

export default function Day2Page() {
  if (!NEW_SITE || !READY) notFound();
  const [newest, ...older] = (day2.posts as Post[]).slice().sort((a, b) => b.at.localeCompare(a.at));
  return (
    <main className="home log">
      <section className="feed-head on-dark" aria-labelledby="day2-title">
        <div className="container">
          <h1 id="day2-title" className="feed-heading">
            {t("day2.title")}
          </h1>
          {/* The posts' h3 titles sit under an h2, so the outline runs h1, h2, h3. */}
          <h2 className="sr-only">{t("hack.menu.day2")}</h2>
          {newest && <FeaturedPost post={newest} />}
        </div>
      </section>
      {older.length > 0 && <Column posts={older} />}
    </main>
  );
}
