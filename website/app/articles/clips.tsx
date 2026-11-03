"use client";

import { useEffect } from "react";

// Loads the inline video clips that ./markdown.ts draws for [!video] blocks ([data-clip]): each
// youtube-nocookie player is created only when its frame comes within 200 px of the viewport, so a
// long entry with several clips loads nothing from YouTube until a clip is near. Nothing plays on its
// own. Without JavaScript, the <noscript> copy in each frame uses the browser's lazy loading instead.

export function ClipLoader() {
  useEffect(() => {
    const frames = Array.from(document.querySelectorAll<HTMLElement>("[data-clip]"));
    const load = (frame: HTMLElement) => {
      if (frame.dataset.loaded || !frame.dataset.src) return;
      const player = document.createElement("iframe");
      player.src = frame.dataset.src;
      player.title = frame.dataset.title ?? "Video";
      player.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      player.referrerPolicy = "strict-origin-when-cross-origin";
      player.allowFullscreen = true;
      frame.replaceChildren(player);
      frame.dataset.loaded = "true";
    };

    if (typeof IntersectionObserver === "undefined") {
      frames.forEach(load);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          load(e.target as HTMLElement);
          io.unobserve(e.target);
        }
      },
      { rootMargin: "200px 0px" },
    );
    frames.forEach((f) => io.observe(f));
    return () => io.disconnect();
  }, []);

  return null;
}
