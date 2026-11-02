"use client";

/*
 * Alex's LinkedIn wall: his posts as cards, in the collapsed form LinkedIn shows, newest first.
 * Neutral, not LinkedIn's interface: no logo, just a small "View on LinkedIn" link per card.
 *
 * - "Read more" opens the whole post in a native modal <dialog>: the rest of the page goes inert,
 *   Esc closes it, the close button is always in view, and focus goes back to the card's button.
 * - Without JavaScript, "Read more" is a <details> that shows the whole post in the card instead.
 * - The grid is a masonry wall once JavaScript runs: each card spans as many 4 px rows as it's tall,
 *   so the cards pack without gaps and still run left to right, newest first. Without JavaScript, or
 *   in one column, it's a plain grid.
 * The text is Alex's, verbatim, with its line breaks kept (white-space: pre-line in about.css).
 */

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { WallCard } from "./wall-data";

const ROW = 4; // px: the masonry row unit (grid-auto-rows in about.css)

function plural(n: number, word: string) {
  return `${n} ${word}${n === 1 ? "" : "s"}`;
}

/** His headshot (the hero's file, unaltered), framed on the face by CSS: a round avatar. */
function Avatar({ size }: { size: 40 | 48 }) {
  return (
    <span className={`wall-avatar wall-avatar-${size}`} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/about/alex-headshot-480.webp" width={480} height={729} alt="" loading="lazy" decoding="async" />
    </span>
  );
}

function Counts({ post, showZero }: { post: WallCard; showZero: boolean }) {
  const parts: string[] = [];
  if (post.reactions || showZero) parts.push(plural(post.reactions, "reaction"));
  if (post.comments || showZero) parts.push(plural(post.comments, "comment"));
  if (!parts.length) return null;
  return (
    <p className="wall-counts">
      {parts.map((p, i) => (
        <span key={p}>
          {p}
          {i < parts.length - 1 && <span className="sr-only">, </span>}
        </span>
      ))}
    </p>
  );
}

function DocIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        d="M6 2.75h8.25L19.25 7.75V21.25H6zM14 2.75v5h5.25M9 12h7M9 15.5h7M9 19h4"
      />
    </svg>
  );
}

/** A PDF carousel or a video: what LinkedIn shows in-line, here a box that opens the post there. */
function Attachment({ post }: { post: WallCard }) {
  if (post.document) {
    return (
      <a className="wall-doc" href={post.url} target="_blank" rel="noopener noreferrer">
        <span className="wall-doc-icon">
          <DocIcon />
        </span>
        <span className="wall-doc-text">
          <span className="wall-doc-title">{post.document.title}</span>
          <span className="wall-doc-note">
            Document, opens on LinkedIn<span className="sr-only"> (new tab)</span>
          </span>
        </span>
      </a>
    );
  }
  if (post.video) {
    const cover = post.video.cover;
    return (
      <a className="wall-video" href={post.url} target="_blank" rel="noopener noreferrer">
        {cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cover.src} width={cover.width} height={cover.height} alt="" loading="lazy" decoding="async" />
        )}
        <span className="wall-video-play" aria-hidden="true" />
        <span className="wall-video-note">
          {post.video.title ? `${post.video.title}: ` : ""}plays on LinkedIn<span className="sr-only"> (new tab)</span>
        </span>
      </a>
    );
  }
  return null;
}

// Buttons and links name their post in an aria-label that starts with the visible words, so speech
// input ("click Read more") still works and every card's controls are distinct.
function LinkedInLink({ post, children }: { post: WallCard; children: string }) {
  return (
    <a className="wall-out" href={post.url} target="_blank" rel="noopener noreferrer" aria-label={`${children}: ${post.label} (new tab)`}>
      {children}
    </a>
  );
}

function Card({
  post,
  enhanced,
  showZero,
  onOpen,
}: {
  post: WallCard;
  enhanced: boolean;
  showZero: boolean;
  onOpen: (post: WallCard, trigger: HTMLButtonElement) => void;
}) {
  const first = post.images[0];
  const more = post.images.length - 1;
  return (
    <article className="wall-card" aria-label={post.label.replace(/^the p/, "P")}>
      <header className="wall-head">
        <Avatar size={40} />
        <p className="wall-byline">
          <span className="wall-name">Alex Alderman</span>{" "}
          <time className="wall-date" dateTime={post.date}>
            {post.day}
          </time>
        </p>
      </header>

      <p className="wall-text wall-collapsed">{post.collapsed}</p>
      {post.has_more &&
        (enhanced ? (
          <button
            type="button"
            className="wall-more"
            aria-haspopup="dialog"
            aria-label={`Read more: ${post.label}`}
            onClick={(e) => onOpen(post, e.currentTarget)}
          >
            Read more
          </button>
        ) : (
          <details className="wall-details">
            <summary className="wall-more">
              <span className="wall-more-closed">Read more</span>
              <span className="wall-more-open">Show less</span>
            </summary>
            <p className="wall-text">{post.text}</p>
          </details>
        ))}

      {first && (
        <figure className="wall-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={first.src}
            width={first.width}
            height={first.height}
            alt={post.alts[0]}
            loading="lazy"
            decoding="async"
            style={{ aspectRatio: `${first.width} / ${first.height}` }}
          />
          {more > 0 && (
            <span className="wall-media-more">
              +{more}
              <span className="sr-only"> more {more === 1 ? "image" : "images"} in the full post</span>
            </span>
          )}
        </figure>
      )}
      <Attachment post={post} />

      <footer className="wall-foot">
        <Counts post={post} showZero={showZero} />
        <LinkedInLink post={post}>View on LinkedIn</LinkedInLink>
      </footer>
    </article>
  );
}

function PostDialog({
  post,
  showZero,
  dialogRef,
  titleRef,
  onClose,
}: {
  post: WallCard | null;
  showZero: boolean;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  onClose: () => void;
}) {
  return (
    <dialog
      ref={dialogRef}
      className="wall-dialog"
      aria-labelledby="wall-dialog-title wall-dialog-date"
      onClose={onClose}
      onClick={(e) => {
        // A click on the backdrop (the dialog box itself, outside its panel) closes it.
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
    >
      {post && (
        <div className="wall-dialog-panel">
          <header className="wall-dialog-head">
            <Avatar size={48} />
            <div className="wall-byline">
              <h2 id="wall-dialog-title" className="wall-name" ref={titleRef} tabIndex={-1}>
                Alex Alderman
              </h2>
              <time id="wall-dialog-date" className="wall-date" dateTime={post.date}>
                {post.dayLong}
              </time>
            </div>
            <button type="button" className="wall-close" aria-label="Close" onClick={() => dialogRef.current?.close()}>
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
                <path
                  fill="currentColor"
                  d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                />
              </svg>
            </button>
          </header>
          <div className="wall-dialog-body">
            <p className="wall-text">{post.text}</p>
            {post.images.map((img, i) => (
              <figure key={img.src} className="wall-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  width={img.width}
                  height={img.height}
                  alt={post.alts[i]}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  style={{ aspectRatio: `${img.width} / ${img.height}` }}
                />
              </figure>
            ))}
            <Attachment post={post} />
          </div>
          <footer className="wall-foot wall-dialog-foot">
            <Counts post={post} showZero={showZero} />
            <LinkedInLink post={post}>Open on LinkedIn</LinkedInLink>
          </footer>
        </div>
      )}
    </dialog>
  );
}

export function LinkedInWall({ posts, showZeroCounts }: { posts: WallCard[]; showZeroCounts: boolean }) {
  // Server HTML and the first client render match (details fallback); the buttons come in after mount.
  const [enhanced, setEnhanced] = useState(false);
  const [open, setOpen] = useState<WallCard | null>(null);
  const gridRef = useRef<HTMLUListElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => setEnhanced(true), []);

  const onOpen = useCallback((post: WallCard, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setOpen(post);
  }, []);

  // Open once the post's content is in the dialog, then put focus on its heading so a screen reader
  // starts at the top. The page behind stops scrolling while it's open.
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    if (!dialog.open) {
      const root = document.documentElement;
      root.style.setProperty("--wall-scrollbar", `${window.innerWidth - root.clientWidth}px`);
      root.classList.add("wall-dialog-open");
      dialog.showModal();
    }
    dialog.querySelector(".wall-dialog-body")?.scrollTo(0, 0);
    titleRef.current?.focus();
  }, [open]);

  const onClose = useCallback(() => {
    document.documentElement.classList.remove("wall-dialog-open");
    setOpen(null);
    // Back to the "Read more" that opened it.
    triggerRef.current?.focus();
  }, []);

  useEffect(() => () => document.documentElement.classList.remove("wall-dialog-open"), []);

  // Masonry: each card's row span follows its height. Only with two or more columns.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || typeof ResizeObserver === "undefined") return;
    let raf = 0;
    const layout = () => {
      raf = 0;
      const style = getComputedStyle(grid);
      const columns = style.gridTemplateColumns.split(" ").filter(Boolean).length;
      const items = Array.from(grid.children) as HTMLElement[];
      if (columns < 2) {
        grid.removeAttribute("data-masonry");
        for (const li of items) li.style.gridRowEnd = "";
        return;
      }
      const gap = parseFloat(style.columnGap) || 20;
      grid.setAttribute("data-masonry", "");
      for (const li of items) {
        const card = li.firstElementChild as HTMLElement | null;
        if (!card) continue;
        const h = card.getBoundingClientRect().height;
        li.style.gridRowEnd = `span ${Math.ceil((h + gap) / ROW)}`;
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(layout);
    };
    const ro = new ResizeObserver(schedule);
    ro.observe(grid);
    for (const li of Array.from(grid.children)) if (li.firstElementChild) ro.observe(li.firstElementChild);
    schedule();
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [enhanced]);

  return (
    <>
      {/* role="list": Safari drops list semantics from a list without bullets. */}
      <ul className="wall-grid" ref={gridRef} role="list">
        {posts.map((post) => (
          <li key={post.id}>
            <Card post={post} enhanced={enhanced} showZero={showZeroCounts} onOpen={onOpen} />
          </li>
        ))}
      </ul>
      <PostDialog post={open} showZero={showZeroCounts} dialogRef={dialogRef} titleRef={titleRef} onClose={onClose} />
    </>
  );
}
