"use client";

/*
 * The video wall (/videos). Each row is a scroll-snap track with 48 px prev and next buttons, a counter
 * and arrow keys (Home and End too), as in the site's other carousels: swipe is the browser's own,
 * nothing autoplays, and nothing animates under prefers-reduced-motion.
 *
 * A tile opens one shared native <dialog> (as on the /about wall): the player, the summary, and "Read the
 * article" when an article carries the video. Esc or the close button shuts it, focus goes back to the
 * tile, and the player is removed, so closing stops the video. Without JavaScript a tile is a plain link
 * to the video on YouTube.
 */

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { readYourPage, withFor } from "../your-page";

export type WallTile = {
  id: string;
  kind: string;
  title: string;
  summary: string | null;
  youtube_id: string;
  start: number;
  end: number | null;
  length: string;
  meta: string | null;
  still: string | null;
  article: string | null;
};
export type WallRow = { key: string; label: string; tiles: WallTile[] };

const yt = (id: string, name: string) => `https://i.ytimg.com/vi/${id}/${name}.jpg`;
const SIZES = "(min-width: 1200px) 300px, (min-width: 992px) 31vw, (min-width: 600px) 46vw, 80vw";

function reducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function watchUrl(t: WallTile) {
  return `https://www.youtube.com/watch?v=${t.youtube_id}${t.start ? `&t=${t.start}s` : ""}`;
}

function embedUrl(t: WallTile) {
  const q = new URLSearchParams({ autoplay: "1", cc_load_policy: "1", rel: "0" });
  if (t.start) q.set("start", String(t.start));
  if (t.end) q.set("end", String(t.end));
  return `https://www.youtube-nocookie.com/embed/${t.youtube_id}?${q.toString()}`;
}

/** "1:15" -> "1 minute 15 seconds", for screen readers. */
function spoken(length: string) {
  const parts = length.split(":").map(Number);
  const [h, m, s] = parts.length === 3 ? parts : [0, parts[0], parts[1]];
  const out = [];
  if (h) out.push(`${h} hour${h === 1 ? "" : "s"}`);
  if (m) out.push(`${m} minute${m === 1 ? "" : "s"}`);
  if (s) out.push(`${s} second${s === 1 ? "" : "s"}`);
  return out.join(" ");
}

function Arrow({ dir }: { dir: "prev" | "next" }) {
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

function Still({ t }: { t: WallTile }) {
  return t.still ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={t.still} width={640} height={360} alt="" loading="lazy" decoding="async" />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={yt(t.youtube_id, "mqdefault")}
      srcSet={`${yt(t.youtube_id, "mqdefault")} 320w, ${yt(t.youtube_id, "sddefault")} 640w`}
      sizes={SIZES}
      width={320}
      height={180}
      alt=""
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
    />
  );
}

function TileBody({ t }: { t: WallTile }) {
  return (
    <>
      <span className="vw-cover" aria-hidden="true">
        <Still t={t} />
        <span className="vw-play" />
        <span className="vw-badge">{t.length}</span>
      </span>
      <span className="vw-tile-title">{t.title}</span>
      {t.meta && <span className="vw-tile-meta">{t.meta}</span>}
      <span className="sr-only">, {spoken(t.length)}</span>
    </>
  );
}

function Row({
  row,
  enhanced,
  onOpen,
}: {
  row: WallRow;
  enhanced: boolean;
  onOpen: (t: WallTile, trigger: HTMLButtonElement) => void;
}) {
  const n = row.tiles.length;
  const uid = useId();
  const headingId = `${uid}-h`;
  const trackId = `${uid}-track`;
  const trackRef = useRef<HTMLUListElement>(null);
  const targetRef = useRef(0);
  const settleRef = useRef(0);
  const shownRef = useRef("");
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(1);
  const [atEnd, setAtEnd] = useState(n <= 1);
  const [announcement, setAnnouncement] = useState("");

  const offsets = useCallback(() => {
    const t = trackRef.current;
    if (!t) return [];
    const pad = parseFloat(getComputedStyle(t).scrollPaddingLeft) || 0;
    return Array.from(t.children, (c) => (c as HTMLElement).offsetLeft - pad);
  }, []);

  const measure = useCallback(() => {
    const t = trackRef.current;
    const first = t?.children[0] as HTMLElement | undefined;
    if (!t || !first) return { fit: 1, start: 0, end: true };
    const gap = parseFloat(getComputedStyle(t).columnGap) || 0;
    const fit = Math.max(1, Math.min(n, Math.floor((t.clientWidth + gap + 4) / (first.offsetWidth + gap))));
    const end = t.scrollLeft >= t.scrollWidth - t.clientWidth - 2;
    let start = 0;
    if (end) start = Math.max(0, n - fit);
    else {
      const offs = offsets();
      offs.forEach((o, i) => {
        if (Math.abs(o - t.scrollLeft) < Math.abs(offs[start] - t.scrollLeft)) start = i;
      });
    }
    return { fit, start, end };
  }, [n, offsets]);

  const goTo = useCallback(
    (i: number) => {
      const t = trackRef.current;
      if (!t) return;
      const target = Math.max(0, Math.min(Math.max(0, n - visible), i));
      targetRef.current = target;
      t.scrollTo({ left: offsets()[target], behavior: reducedMotion() ? "auto" : "smooth" });
    },
    [n, visible, offsets],
  );

  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const m = measure();
      setVisible(m.fit);
      setIndex(m.start);
      setAtEnd(m.end);
    };
    update();
    shownRef.current = `${measure().start}`;
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
      window.clearTimeout(settleRef.current);
      settleRef.current = window.setTimeout(() => {
        const m = measure();
        targetRef.current = m.start;
        const key = `${m.start}`;
        if (key === shownRef.current) return;
        shownRef.current = key;
        const last = Math.min(n, m.start + m.fit);
        setAnnouncement(m.fit > 1 ? `${m.start + 1} to ${last} of ${n}` : `${m.start + 1} of ${n}: ${row.tiles[m.start].title}`);
      }, 160);
    };
    const onResize = () => {
      t.scrollTo({ left: offsets()[targetRef.current] ?? 0, behavior: "auto" });
      update();
    };
    t.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      t.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(settleRef.current);
      cancelAnimationFrame(raf);
    };
  }, [measure, offsets, n, row.tiles]);

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    const keys: Record<string, number> = { ArrowLeft: targetRef.current - 1, ArrowRight: targetRef.current + 1, Home: 0, End: n - 1 };
    if (!(e.key in keys)) return;
    e.preventDefault();
    goTo(keys[e.key]);
  };

  const last = Math.min(n, index + visible);
  const allFit = visible >= n;

  return (
    <section className="vw-row" aria-labelledby={headingId} onKeyDown={onKeyDown}>
      <div className="container vw-row-inner">
        <div className="vw-row-head">
          <h2 id={headingId} className="vw-row-title">
            {row.label}
            <span className="vw-row-count" aria-hidden="true">{n}</span>
          </h2>
          <div className="vw-bar" hidden={allFit}>
            <button
              type="button"
              className="vw-btn"
              aria-controls={trackId}
              aria-disabled={index === 0}
              onClick={() => index > 0 && goTo(targetRef.current - 1)}
            >
              <Arrow dir="prev" />
              <span className="sr-only">Previous in {row.label}</span>
            </button>
            <p className="vw-count" aria-hidden="true">
              {index + 1}
              {visible > 1 && last > index + 1 ? `–${last}` : ""}
              <span className="vw-count-of"> / {n}</span>
            </p>
            <button
              type="button"
              className="vw-btn"
              aria-controls={trackId}
              aria-disabled={atEnd}
              onClick={() => !atEnd && goTo(targetRef.current + 1)}
            >
              <Arrow dir="next" />
              <span className="sr-only">Next in {row.label}</span>
            </button>
          </div>
        </div>
        {/* role="list": Safari drops list semantics from a list without bullets. */}
        <ul className="vw-track" id={trackId} ref={trackRef} role="list">
          {row.tiles.map((t) => (
            <li key={t.id} className="vw-slide">
              {enhanced ? (
                <button type="button" className="vw-tile" aria-haspopup="dialog" onClick={(e) => onOpen(t, e.currentTarget)}>
                  <TileBody t={t} />
                </button>
              ) : (
                <a className="vw-tile" href={watchUrl(t)} target="_blank" rel="noopener noreferrer">
                  <TileBody t={t} />
                  <span className="sr-only"> (YouTube, new tab)</span>
                </a>
              )}
            </li>
          ))}
        </ul>
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {announcement}
        </p>
      </div>
    </section>
  );
}

export function VideoWall({ rows, people, showPlaceholders }: { rows: WallRow[]; people: string[]; showPlaceholders: boolean }) {
  // Server HTML and the first client render match (plain links); the dialog buttons come in after mount.
  const [enhanced, setEnhanced] = useState(false);
  const [open, setOpen] = useState<WallTile | null>(null);
  const [who, setWho] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setEnhanced(true);
    setWho(readYourPage(people));
  }, [people]);

  const onOpen = useCallback((t: WallTile, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setOpen(t);
  }, []);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    if (!dialog.open) {
      const root = document.documentElement;
      root.style.setProperty("--wall-scrollbar", `${window.innerWidth - root.clientWidth}px`);
      root.classList.add("vw-dialog-open");
      dialog.showModal();
    }
    titleRef.current?.focus();
  }, [open]);

  const onClose = useCallback(() => {
    document.documentElement.classList.remove("vw-dialog-open");
    setOpen(null);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => () => document.documentElement.classList.remove("vw-dialog-open"), []);

  return (
    <>
      <div className="vw-rows">
        {rows.map((r) => (
          <Row key={r.key} row={r} enhanced={enhanced} onOpen={onOpen} />
        ))}
      </div>
      <dialog
        ref={dialogRef}
        className="vw-dialog"
        aria-labelledby="vw-dialog-title"
        onClose={onClose}
        onClick={(e) => {
          // A click on the backdrop (the dialog box itself, outside its panel) closes it.
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
      >
        {open && (
          <div className="vw-dialog-panel">
            <header className="vw-dialog-head">
              <div className="vw-dialog-heading">
                <h2 id="vw-dialog-title" className="vw-dialog-title" ref={titleRef} tabIndex={-1}>
                  {open.title}
                </h2>
                <p className="vw-dialog-meta">
                  {open.meta ? `${open.meta} · ` : ""}
                  {open.length}
                </p>
              </div>
              <button type="button" className="vw-close" aria-label="Close" onClick={() => dialogRef.current?.close()}>
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
                  <path
                    fill="currentColor"
                    d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                  />
                </svg>
              </button>
            </header>
            <div className="vw-dialog-body">
              <div className="vw-player">
                <iframe
                  src={embedUrl(open)}
                  title={open.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              {open.summary ? (
                <p className="vw-summary">{open.summary}</p>
              ) : (
                showPlaceholders && (
                  <p className="vw-placeholder">Placeholder (preview only): this video&apos;s summary (alex-voice, K7).</p>
                )
              )}
              {open.article && (
                <p>
                  <a className="vw-article" href={withFor(open.article, who)}>
                    Read the article
                  </a>
                </p>
              )}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
