"use client";

/*
 * The video wall (/videos): one flat wall of clips in wall order, three columns on a desktop, two on a
 * tablet, one on a phone. Each card is its poster frame (with a play mark and the length), Alex's hook
 * line verbatim, and a small topic tag. The clips to start with have a violet-to-orchid edge and star badge;
 * the star carries the words ("Start here"), so the border is never the only sign.
 *
 * A card opens one shared native <dialog> (as on the /about wall): the player, and "Read the article" when
 * an article carries the clip. Esc, the close button or a click on the backdrop shuts it, focus goes back
 * to the card, and the player is removed, so closing stops the video. No iframe exists until a card is
 * opened. Without JavaScript a card is a plain link to the clip on YouTube, at its start time.
 */

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { readYourPage, withFor } from "../your-page";

export type WallClip = {
  id: string;
  youtube_id: string;
  start: number;
  end: number;
  /** "0:59" */
  length: string;
  /** "59 seconds", for screen readers */
  spoken: string;
  hook: string;
  tag: string;
  featured: boolean;
  poster: string;
  article: string | null;
};

function watchUrl(c: WallClip) {
  return `https://www.youtube.com/watch?v=${c.youtube_id}&t=${c.start}s`;
}

function embedUrl(c: WallClip) {
  const q = new URLSearchParams({ autoplay: "1", rel: "0", playsinline: "1", cc_load_policy: "1" });
  if (c.start) q.set("start", String(c.start));
  q.set("end", String(c.end));
  return `https://www.youtube-nocookie.com/embed/${c.youtube_id}?${q.toString()}`;
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 2.6l2.83 5.74 6.33.92-4.58 4.47 1.08 6.3L12 17.05l-5.66 2.98 1.08-6.3-4.58-4.47 6.33-.92L12 2.6z"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M8.5 5.6v12.8c0 .78.85 1.26 1.52.86l10.24-6.4a1 1 0 0 0 0-1.72L10.02 4.74A1 1 0 0 0 8.5 5.6z" />
    </svg>
  );
}

/** The star badge, as on a featured card's poster. Decorative: say what it means next to it. */
export function StarMark({ small = false }: { small?: boolean }) {
  return (
    <span className={small ? "vw-star vw-star-sm" : "vw-star"} aria-hidden="true">
      <StarIcon />
    </span>
  );
}

function CardBody({ c, starLabel }: { c: WallClip; starLabel: string }) {
  return (
    <>
      <span className="vw-poster">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={c.poster} width={640} height={360} alt="" loading="lazy" decoding="async" />
        <span className="vw-play" aria-hidden="true">
          <PlayIcon />
        </span>
        {c.featured && (
          <span className="vw-star-badge">
            <StarMark />
            <span className="sr-only">{starLabel}: </span>
          </span>
        )}
        <span className="vw-time" aria-hidden="true">
          {c.length}
        </span>
      </span>
      <span className="vw-card-body">
        <span className="vw-hook">{c.hook}</span>
        <span className="vw-tag">
          <span className="sr-only">, </span>
          {c.tag}
          <span className="sr-only">, {c.spoken}</span>
        </span>
      </span>
    </>
  );
}

export function VideoWall({ clips, starLabel, people }: { clips: WallClip[]; starLabel: string; people: string[] }) {
  // Server HTML and the first client render match (plain links); the dialog buttons come in after mount.
  const [enhanced, setEnhanced] = useState(false);
  const [open, setOpen] = useState<WallClip | null>(null);
  const [who, setWho] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setEnhanced(true);
    setWho(readYourPage(people));
  }, [people]);

  const onOpen = useCallback((c: WallClip, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setOpen(c);
  }, []);

  // Open once the clip is in the dialog, then put focus on its heading so a screen reader starts at the
  // top. The page behind stops scrolling while it's open.
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
    // Back to the card that opened it.
    triggerRef.current?.focus();
  }, []);

  useEffect(() => () => document.documentElement.classList.remove("vw-dialog-open"), []);

  return (
    <>
      {/* role="list": Safari drops list semantics from a list without bullets. */}
      <ul className="vw-grid" role="list">
        {clips.map((c) => {
          const cls = c.featured ? "vw-card is-featured" : "vw-card";
          return (
            <li key={c.id} className="vw-item">
              {enhanced ? (
                <button type="button" className={cls} aria-haspopup="dialog" onClick={(e) => onOpen(c, e.currentTarget)}>
                  <CardBody c={c} starLabel={starLabel} />
                </button>
              ) : (
                <a className={cls} href={watchUrl(c)} target="_blank" rel="noopener noreferrer">
                  <CardBody c={c} starLabel={starLabel} />
                  <span className="sr-only"> (YouTube, new tab)</span>
                </a>
              )}
            </li>
          );
        })}
      </ul>
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
              {/* The heading comes first, as focus lands on it; the meta line shows above it (CSS order). */}
              <div className="vw-dialog-heading">
                <h2 id="vw-dialog-title" className="vw-dialog-title" ref={titleRef} tabIndex={-1}>
                  {open.hook}
                </h2>
                <p className="vw-dialog-meta">
                  {open.featured && (
                    <>
                      <StarMark small />
                      <span className="sr-only">{starLabel}, </span>
                    </>
                  )}
                  <span className="vw-dialog-tag">{open.tag}</span>{" "}
                  <span className="vw-dialog-time">
                    <span aria-hidden="true">{open.length}</span>
                    <span className="sr-only">{open.spoken}</span>
                  </span>
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
                  title={`Video: ${open.hook}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              {open.article && (
                <p className="vw-dialog-foot">
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
