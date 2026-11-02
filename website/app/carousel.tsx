"use client";

/*
 * The /d1 research boards (BUILD S-D1-B1), to the spec in scraping\site\d1.md's page notes:
 * one slide at a time on a scroll-snap track (so swipe is the browser's own), prev and next buttons
 * of 48 px, arrow keys plus Home and End, a visible "n / 5" counter, no autoplay. Each board opens
 * full size in a modal on click or tap (a plain link to the image without JavaScript), with tap to
 * zoom and the browser's own pinch-zoom on phones. Captions are real text under each slide.
 * Screen readers get a carousel of slides labelled "n of 5", the alt text as given, and one polite
 * announcement when the slide changes. Under prefers-reduced-motion nothing animates.
 */

import Link from "next/link";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import "./carousel.css";

export type CarouselSlide = {
  title: string;
  text: string;
  /** A board: the base name of its files in public/d1 (<image>-{800,1280,2880}.webp). */
  image?: string;
  width?: number;
  height?: number;
  alt?: string;
  /** A text card instead of a board, linking here (left out when the page isn't live yet). */
  href?: string;
  link?: string;
};

const SIZES = "(min-width: 1230px) 1150px, (min-width: 992px) calc(100vw - 80px), (min-width: 768px) calc(100vw - 48px), calc(100vw - 76px)";

const src = (image: string, w: number) => `/d1/${image}-${w}.webp`;

function reducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function Arrow({ dir }: { dir: "prev" | "next" }) {
  // Material "east" / "west", the arrow family Addvery's buttons use.
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M15 5l-1.41 1.41L18.17 11H2v2h16.17l-4.59 4.59L15 19l7-7-7-7z"
        transform={dir === "prev" ? "rotate(180 12 12)" : undefined}
      />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M3 3h7v2H6.41l4.3 4.29-1.42 1.42L5 6.41V10H3V3zm18 18h-7v-2h3.59l-4.3-4.29 1.42-1.42L19 17.59V14h2v7z" />
    </svg>
  );
}

export function Carousel({ heading, slides }: { heading: string; slides: CarouselSlide[] }) {
  const n = slides.length;
  const uid = useId();
  const headingId = `${uid}-h`;
  const trackId = `${uid}-track`;
  const trackRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef(0);
  const settleRef = useRef(0);
  const refocusRef = useRef(false);
  const shownRef = useRef(0);
  // `index` follows the scroll position (the counter); `current` is the slide the track settled on.
  const [index, setIndex] = useState(0);
  const [current, setCurrent] = useState(0);
  const [announcement, setAnnouncement] = useState("");

  // Where each slide starts, in the track's scroll coordinates.
  const offsets = useCallback(() => {
    const t = trackRef.current;
    if (!t) return [];
    const pad = parseFloat(getComputedStyle(t).scrollPaddingLeft) || 0;
    return Array.from(t.children, (c) => (c as HTMLElement).offsetLeft - pad);
  }, []);

  const nearest = useCallback(() => {
    const t = trackRef.current;
    if (!t) return 0;
    if (t.scrollLeft >= t.scrollWidth - t.clientWidth - 2) return n - 1;
    const offs = offsets();
    let best = 0;
    offs.forEach((o, i) => {
      if (Math.abs(o - t.scrollLeft) < Math.abs(offs[best] - t.scrollLeft)) best = i;
    });
    return best;
  }, [n, offsets]);

  const goTo = useCallback(
    (i: number) => {
      const t = trackRef.current;
      if (!t) return;
      const target = Math.max(0, Math.min(n - 1, i));
      targetRef.current = target;
      t.scrollTo({ left: offsets()[target], behavior: reducedMotion() ? "auto" : "smooth" });
      setIndex(target);
    },
    [n, offsets],
  );

  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    let raf = 0;
    const onScroll = () => {
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = 0;
          setIndex(nearest());
        });
      window.clearTimeout(settleRef.current);
      settleRef.current = window.setTimeout(() => {
        const i = nearest();
        targetRef.current = i;
        // Focus on the board that's leaving would be lost when its slide goes inert: follow the
        // reader to the new board instead.
        const slide = t.children[i];
        const a = document.activeElement;
        refocusRef.current = !!a && t.contains(a) && !slide?.contains(a);
        setIndex(i);
        setCurrent(i);
      }, 140);
    };
    // A resize (rotation, a wider window) keeps the same slide in view.
    const onResize = () => {
      const t2 = trackRef.current;
      if (t2) t2.scrollTo({ left: offsets()[targetRef.current] ?? 0, behavior: "auto" });
    };
    t.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      t.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(settleRef.current);
      cancelAnimationFrame(raf);
    };
  }, [nearest, offsets]);

  // One polite announcement per settled change (not on load). When focus follows the reader to the
  // new board, the board's own name says it, so there's no announcement on top.
  useEffect(() => {
    if (shownRef.current === current) return;
    shownRef.current = current;
    if (refocusRef.current) {
      refocusRef.current = false;
      const el = trackRef.current?.children[current]?.querySelector<HTMLElement>(".cz-frame");
      if (el) {
        el.focus({ preventScroll: true });
        return;
      }
    }
    setAnnouncement(`${current + 1} of ${n}: ${slides[current].title}`);
  }, [current, n, slides]);

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    const keys: Record<string, number> = {
      ArrowLeft: targetRef.current - 1,
      ArrowRight: targetRef.current + 1,
      Home: 0,
      End: n - 1,
    };
    if (!(e.key in keys)) return;
    e.preventDefault();
    goTo(keys[e.key]);
  };

  // ---------- Full size ----------
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnRef = useRef<HTMLElement | null>(null);
  const anchorRef = useRef<{ rx: number; ry: number; x: number; y: number } | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);

  const openFull = (i: number, trigger: HTMLElement) => {
    returnRef.current = trigger;
    setZoomed(false);
    setOpen(i);
  };

  useEffect(() => {
    const d = dialogRef.current;
    if (open === null || !d || d.open) return;
    d.showModal();
    d.scrollTo(0, 0);
    document.documentElement.classList.add("cz-lock");
    closeRef.current?.focus();
  }, [open]);

  const onDialogClose = () => {
    document.documentElement.classList.remove("cz-lock");
    setOpen(null);
    setZoomed(false);
    returnRef.current?.focus();
  };

  // Zooming keeps the tapped point (or the middle of the screen) where it was.
  const toggleZoom = (point?: { x: number; y: number }) => {
    const d = dialogRef.current;
    const img = d?.querySelector("img");
    if (!d || !img) return;
    const r = img.getBoundingClientRect();
    const x = point?.x ?? window.innerWidth / 2;
    const y = point?.y ?? window.innerHeight / 2;
    anchorRef.current = { rx: (x - r.left) / r.width, ry: (y - r.top) / r.height, x, y };
    setZoomed((z) => !z);
  };

  useLayoutEffect(() => {
    const d = dialogRef.current;
    const a = anchorRef.current;
    const img = d?.querySelector("img");
    anchorRef.current = null;
    if (!d || !a || !img) return;
    if (!zoomed) {
      d.scrollTo(0, 0);
      return;
    }
    const r = img.getBoundingClientRect();
    const rx = Math.min(1, Math.max(0, a.rx));
    const ry = Math.min(1, Math.max(0, a.ry));
    d.scrollTo(d.scrollLeft + r.left + rx * r.width - a.x, d.scrollTop + r.top + ry * r.height - a.y);
  }, [zoomed]);

  // Zoomed, the arrow and Page keys pan the board wherever focus is in the dialog (the buttons sit
  // in a fixed bar, outside the dialog's own scrolling).
  const onDialogKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
    const d = dialogRef.current;
    if (!zoomed || !d || e.altKey || e.ctrlKey || e.metaKey) return;
    const step = 80;
    const page = d.clientHeight * 0.9;
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
      PageUp: [0, -page],
      PageDown: [0, page],
    };
    const m = moves[e.key];
    if (!m) return;
    e.preventDefault();
    d.scrollBy({ left: m[0], top: m[1], behavior: "auto" });
  };

  const onStageClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !zoomed) dialogRef.current?.close();
  };

  const full = open !== null ? slides[open] : null;

  return (
    <>
      <section className="cz" aria-roledescription="carousel" aria-labelledby={headingId} onKeyDown={onKeyDown}>
        <h2 id={headingId} className="sr-only">
          {heading}
        </h2>
        <div className="cz-track" id={trackId} ref={trackRef}>
          {slides.map((slide, i) => (
            <div
              key={slide.title}
              className="cz-slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${n}`}
              inert={i !== current}
            >
              <figure className="cz-figure">
                {slide.image ? (
                  <a
                    className="cz-frame"
                    href={src(slide.image, 2880)}
                    onClick={(e) => {
                      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                      e.preventDefault();
                      openFull(i, e.currentTarget);
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src(slide.image, 1280)}
                      srcSet={[800, 1280, 2880].map((w) => `${src(slide.image!, w)} ${w}w`).join(", ")}
                      sizes={SIZES}
                      width={slide.width}
                      height={slide.height}
                      alt={slide.alt ?? ""}
                      decoding="async"
                      fetchPriority={i === 0 ? "high" : "auto"}
                    />
                    <span className="cz-badge">
                      <ExpandIcon />
                      Full size
                    </span>
                  </a>
                ) : slide.href ? (
                  <Link className="cz-frame cz-card" href={slide.href}>
                    <span className="cz-card-text">{slide.link}</span>
                    <span className="cz-card-arrow" aria-hidden="true">
                      <Arrow dir="next" />
                    </span>
                  </Link>
                ) : (
                  <div className="cz-frame cz-card">
                    <span className="cz-card-text">{slide.title}</span>
                  </div>
                )}
                <figcaption className="cz-caption">
                  <strong>{slide.title}</strong> {slide.text}
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
        <div className="cz-bar">
          <button
            type="button"
            className="cz-btn"
            aria-controls={trackId}
            aria-disabled={index === 0}
            onClick={() => index > 0 && goTo(targetRef.current - 1)}
          >
            <Arrow dir="prev" />
            <span className="sr-only">Previous board</span>
          </button>
          <p className="cz-count" aria-hidden="true">
            <span className="cz-count-now">{index + 1}</span>
            <span className="cz-count-of"> / {n}</span>
          </p>
          <button
            type="button"
            className="cz-btn"
            aria-controls={trackId}
            aria-disabled={index === n - 1}
            onClick={() => index < n - 1 && goTo(targetRef.current + 1)}
          >
            <Arrow dir="next" />
            <span className="sr-only">Next board</span>
          </button>
        </div>
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {announcement}
        </p>
      </section>

      <dialog
        ref={dialogRef}
        className={zoomed ? "czd is-zoomed" : "czd"}
        aria-labelledby={`${uid}-full`}
        onClose={onDialogClose}
        onKeyDown={onDialogKeyDown}
      >
        {full?.image && (
          <>
            <div className="czd-bar">
              <p className="czd-title" id={`${uid}-full`}>
                <span className="czd-count">
                  {open! + 1} / {n}
                </span>{" "}
                {full.title.replace(/\.$/, "")}
                <span className="sr-only">, full size</span>
              </p>
              <button type="button" className="czd-btn czd-zoom" onClick={() => toggleZoom()}>
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
                  <path
                    fill="currentColor"
                    d={
                      zoomed
                        ? "M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z"
                        : "M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zm.5-7H9v2H7v1h2v2h1v-2h2V9h-2z"
                    }
                  />
                </svg>
                <span className="czd-btn-text">{zoomed ? "Zoom out" : "Zoom in"}</span>
              </button>
              <button
                type="button"
                className="czd-btn czd-close"
                ref={closeRef}
                onClick={() => dialogRef.current?.close()}
              >
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
                  <path
                    fill="currentColor"
                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                  />
                </svg>
                <span className="sr-only">Close</span>
              </button>
            </div>
            <div className="czd-stage" onClick={onStageClick}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src(full.image, 2880)}
                width={full.width}
                height={full.height}
                alt={full.alt ?? ""}
                onClick={(e) => toggleZoom({ x: e.clientX, y: e.clientY })}
              />
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
