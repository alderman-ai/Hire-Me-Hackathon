"use client";

/*
 * The best-of video frame: a 16:9 still with a play mark and the length, a caption under it. A click
 * plays the YouTube clip (youtube-nocookie, captions on, never autoplaying on load), either in place
 * (mode "inline") or in a native <dialog> (mode "dialog"; Esc or Close shuts it and stops the video).
 * Without JavaScript the frame is a plain link to the clip on YouTube.
 */

import { watchUrl } from "./yt";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";

export type VideoFrameProps = {
  /** YouTube video id. */
  youtube: string;
  /** Start second. */
  start?: number;
  /** End second (plays a moment out of a longer video). */
  end?: number;
  /** Plain-text name of the clip: the button's accessible name and the dialog's heading. */
  label: string;
  /** The visible title under the frame (a quote in his words, usually). Omit for none. */
  caption?: React.ReactNode;
  /** The small line under the title, e.g. "S10, 16:33". */
  meta?: React.ReactNode;
  /** Length as shown on the badge, e.g. "1:52". Omit for no badge. */
  length?: string;
  /** Site path of the still (e.g. "/videos/S02-f.webp"). Default: YouTube's own thumbnail. */
  still?: string;
  /** Full URL of a thumbnail, overriding the YouTube default (e.g. maxresdefault for a hero). */
  poster?: string;
  /** "hero" adds the glow and the large radius; "sm" shrinks the play mark. Default: normal. */
  size?: "hero" | "sm";
  /** Where it plays. Default "inline". */
  mode?: "inline" | "dialog";
  /** Extra class on the figure. */
  className?: string;
};

const IFRAME_ALLOW = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

function embedUrl(id: string, start?: number, end?: number) {
  const q = new URLSearchParams({ autoplay: "1", cc_load_policy: "1", rel: "0" });
  if (start) q.set("start", String(start));
  if (end) q.set("end", String(end));
  return `https://www.youtube-nocookie.com/embed/${id}?${q.toString()}`;
}

/** "1:15" to "1 minute 15 seconds", for screen readers. */
function spoken(length: string) {
  const parts = length.split(":").map(Number);
  const [h, m, s] = parts.length === 3 ? parts : [0, parts[0], parts[1]];
  const out: string[] = [];
  if (h) out.push(`${h} hour${h === 1 ? "" : "s"}`);
  if (m) out.push(`${m} minute${m === 1 ? "" : "s"}`);
  if (s) out.push(`${s} second${s === 1 ? "" : "s"}`);
  return out.join(" ");
}

export function VideoFrame(p: VideoFrameProps) {
  const mode = p.mode ?? "inline";
  const uid = useId();
  const [enhanced, setEnhanced] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Server HTML and the first client render match (a plain link); the button comes in after mount.
  useEffect(() => setEnhanced(true), []);

  useLayoutEffect(() => {
    const d = dialogRef.current;
    if (!open || !d) return;
    if (!d.open) {
      document.documentElement.style.overflow = "hidden";
      d.showModal();
    }
    titleRef.current?.focus();
  }, [open]);
  useEffect(() => () => void (document.documentElement.style.overflow = ""), []);

  const onClose = useCallback(() => {
    document.documentElement.style.overflow = "";
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  const thumb = p.still ?? p.poster ?? `https://i.ytimg.com/vi/${p.youtube}/hqdefault.jpg`;
  const cover = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={thumb} width={640} height={360} alt="" loading="lazy" decoding="async" referrerPolicy={p.still ? undefined : "no-referrer"} />
      <span className="bx-vid-play" aria-hidden="true" />
      {p.length && <span className="bx-vid-len" aria-hidden="true">{p.length}</span>}
    </>
  );
  const name = (
    <span className="sr-only">
      {mode === "inline" ? "Play video: " : "Open video: "}
      {p.label}
      {p.length ? `, ${spoken(p.length)}` : ""}
    </span>
  );

  let frame;
  if (playing && mode === "inline") {
    frame = (
      <div className="bx-vid-frame bx-vid-live">
        <iframe src={embedUrl(p.youtube, p.start, p.end)} title={p.label} allow={IFRAME_ALLOW} referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
      </div>
    );
  } else if (enhanced) {
    frame = (
      <button
        type="button"
        ref={triggerRef}
        className="bx-vid-frame"
        aria-haspopup={mode === "dialog" ? "dialog" : undefined}
        onClick={() => (mode === "dialog" ? setOpen(true) : setPlaying(true))}
      >
        {cover}
        {name}
      </button>
    );
  } else {
    frame = (
      <a className="bx-vid-frame" href={watchUrl(p.youtube, p.start)} target="_blank" rel="noopener noreferrer">
        {cover}
        {name}
        <span className="sr-only"> (YouTube, new tab)</span>
      </a>
    );
  }

  const cls = ["bx-vid", p.size === "hero" && "bx-vid-hero", p.size === "sm" && "bx-vid-sm", p.className].filter(Boolean).join(" ");
  return (
    <figure className={cls}>
      {frame}
      {(p.caption || p.meta) && (
        <figcaption>
          {p.caption && <span className="bx-vid-title">{p.caption}</span>}
          {p.meta && <span className="bx-vid-meta">{p.meta}</span>}
        </figcaption>
      )}
      {mode === "dialog" && (
        <dialog
          ref={dialogRef}
          className="bx-dialog"
          aria-labelledby={`${uid}-t`}
          onClose={onClose}
          onClick={(e) => {
            if (e.target === e.currentTarget) e.currentTarget.close();
          }}
        >
          {open && (
            <div className="bx-dialog-panel">
              <div className="bx-dialog-head">
                <h2 id={`${uid}-t`} className="bx-dialog-title" ref={titleRef} tabIndex={-1}>
                  {p.label}
                </h2>
                <button type="button" className="bx-dialog-close" onClick={() => dialogRef.current?.close()}>
                  <span className="sr-only">Close</span>
                  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
                    <path fill="currentColor" d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                  </svg>
                </button>
              </div>
              <div className="bx-dialog-player">
                <iframe src={embedUrl(p.youtube, p.start, p.end)} title={p.label} allow={IFRAME_ALLOW} referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
              </div>
            </div>
          )}
        </dialog>
      )}
    </figure>
  );
}
