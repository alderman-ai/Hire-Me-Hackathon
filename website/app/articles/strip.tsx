"use client";

import { useEffect } from "react";

// Wires the slide strips that ./markdown.ts draws for [!carousel] cards ([data-strip]).
//
// Without JavaScript a strip is a horizontal list that scrolls (and scroll-snaps) on its own, and its
// viewport takes keyboard focus, so arrow keys scroll it natively. This adds the Previous and Next
// buttons (44 px), Left/Right/Home/End on the focused strip, and a status line ("Slides 1 to 2 of 8").
// It never moves on its own; under reduced motion every jump is instant.

export function StripEnhancer() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cleanups: (() => void)[] = [];

    document.querySelectorAll<HTMLElement>("[data-strip]").forEach((strip) => {
      const viewport = strip.querySelector<HTMLElement>(".entry-strip-viewport");
      const controls = strip.querySelector<HTMLElement>(".entry-strip-controls");
      const status = strip.querySelector<HTMLElement>(".entry-strip-status");
      const [prev, next] = Array.from(strip.querySelectorAll<HTMLButtonElement>(".entry-strip-btn"));
      const slides = Array.from(strip.querySelectorAll<HTMLElement>(".entry-strip-slide"));
      if (!viewport || !controls || !status || !prev || !next || slides.length === 0) return;

      const origin = () => slides[0].offsetLeft;
      /** The first slide whose left edge is at or past the viewport's left edge. */
      const first = () => {
        const left = viewport.scrollLeft;
        const i = slides.findIndex((s) => s.offsetLeft - origin() >= left - 4);
        return i < 0 ? slides.length - 1 : i;
      };
      const go = (i: number) => {
        const target = slides[Math.max(0, Math.min(slides.length - 1, i))];
        viewport.scrollTo({ left: target.offsetLeft - origin(), behavior: reduce.matches ? "auto" : "smooth" });
      };

      const update = () => {
        const atStart = viewport.scrollLeft <= 2;
        const atEnd = viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 2;
        prev.setAttribute("aria-disabled", String(atStart));
        next.setAttribute("aria-disabled", String(atEnd));
        const f = first();
        const right = viewport.scrollLeft + viewport.clientWidth;
        let last = f;
        while (last + 1 < slides.length && slides[last + 1].offsetLeft - origin() + slides[last + 1].offsetWidth <= right + 4) {
          last++;
        }
        const total = slides.length;
        status.textContent = last > f ? `Slides ${f + 1} to ${last + 1} of ${total}` : `Slide ${f + 1} of ${total}`;
      };

      let timer = 0;
      const onScroll = () => {
        window.clearTimeout(timer);
        timer = window.setTimeout(update, 120);
      };
      const step = (dir: number) => (e: Event) => {
        if ((e.currentTarget as HTMLElement).getAttribute("aria-disabled") === "true") return;
        go(first() + dir);
      };
      const onPrev = step(-1);
      const onNext = step(1);
      const onKey = (e: KeyboardEvent) => {
        const moves: Record<string, () => void> = {
          ArrowLeft: () => go(first() - 1),
          ArrowRight: () => go(first() + 1),
          Home: () => go(0),
          End: () => go(slides.length - 1),
        };
        const move = moves[e.key];
        if (move && !e.altKey && !e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          move();
        }
      };

      controls.hidden = false;
      update();
      // Announce changes only after the first fill, so loading the page says nothing.
      status.setAttribute("aria-live", "polite");
      viewport.addEventListener("scroll", onScroll, { passive: true });
      viewport.addEventListener("keydown", onKey);
      prev.addEventListener("click", onPrev);
      next.addEventListener("click", onNext);
      const resize = new ResizeObserver(update);
      resize.observe(viewport);
      cleanups.push(() => {
        window.clearTimeout(timer);
        viewport.removeEventListener("scroll", onScroll);
        viewport.removeEventListener("keydown", onKey);
        prev.removeEventListener("click", onPrev);
        next.removeEventListener("click", onNext);
        resize.disconnect();
      });
    });

    return () => cleanups.forEach((c) => c());
  }, []);

  return null;
}
