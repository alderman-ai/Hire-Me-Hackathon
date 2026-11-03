import feedJson from "@/content/feed.json";
import type { Post } from "./feed";

// Day 1's feed posts (content/feed.json), for app/feed.tsx and the agent track (lib/agent-track). A plain
// module: no React, no CSS.

/** Newest first; with a slug, only the posts tagged with that demo. */
export function feedPosts(deliverable?: string): Post[] {
  return (feedJson.posts as Post[])
    .filter((post) => !deliverable || post.deliverable === deliverable)
    .sort((a, b) => b.at.localeCompare(a.at));
}
