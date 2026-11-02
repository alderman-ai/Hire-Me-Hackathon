"use client";

/*
 * The full LinkedIn wall: all of Alex's posts as a dense, image-led masonry wall, newest first.
 * Built from the 34-post wall (./wall.tsx), and it keeps that one's behaviour:
 *
 * - "Read more" opens the whole post in a native modal <dialog>: every image at full size, every page of
 *   a carousel, the quoted post. Esc closes it, and focus goes back to the card's button. A click on a
 *   card's image opens the same dialog (a mouse shortcut; the keyboard has "Read more").
 * - Without JavaScript, "Read more" is a <details> that shows the whole text in the card.
 * - Masonry once JavaScript runs: each card spans as many 4 px rows as it's tall, so the wall packs
 *   without gaps and still reads left to right, newest first.
 *
 * Images lead: a card's first image (or a carousel's first page, or a link card's preview) sits on top,
 * and the text under it is clamped to three lines. A one-liner with nothing else is set larger.
 * The text is Alex's, verbatim, with its line breaks kept (white-space: pre-line).
 */

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { FullCard, FullImage } from "./wall-full-data";

const ROW = 4; // px: the masonry row unit (grid-auto-rows in wall-full.css)
const CARD_SIZES = "(max-width: 540px) calc(100vw - 2.5rem), 320px";

function plural(n: number, word: string) {
  return `${n} ${word}${n === 1 ? "" : "s"}`;
}

/** His headshot (the hero's file, unaltered), framed on the face by CSS: a round avatar. */
function Avatar() {
  return (
    <span className="wall-avatar wall-avatar-48" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/about/alex-headshot-480.webp" width={480} height={729} alt="" loading="lazy" decoding="async" />
    </span>
  );
}

function Counts({ post, showZero }: { post: FullCard; showZero: boolean }) {
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

/** A card-sized image: the 640 px file, with the 1280 px one for dense screens. */
function CardImg({ img, alt, crop }: { img: FullImage; alt: string; crop: boolean }) {
  const ratio = img.width / img.height;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={img.card ?? img.src}
      srcSet={img.card ? `${img.card} 640w, ${img.src} ${img.width}w` : undefined}
      sizes={img.card ? CARD_SIZES : undefined}
      width={img.width}
      height={img.height}
      alt={alt}
      loading="lazy"
      decoding="async"
      // Very tall screenshots are shown from the top, cropped at 4:5; the dialog shows the whole image.
      style={{ aspectRatio: `${crop ? Math.max(ratio, 0.8) : ratio}` }}
    />
  );
}

function FullImg({ img, alt, eager }: { img: FullImage; alt: string; eager?: boolean }) {
  return (
    <figure className="wall-media">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img.src}
        width={img.width}
        height={img.height}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        style={{ aspectRatio: `${img.width} / ${img.height}` }}
      />
    </figure>
  );
}

function NewTab() {
  return <span className="sr-only"> (new tab)</span>;
}

/** An article link card: its preview image, title and site, opening the article. */
function LinkCard({ post }: { post: FullCard }) {
  const link = post.link!;
  return (
    <a className="wf-link" href={link.url} target="_blank" rel="noopener noreferrer">
      {link.image && <CardImg img={link.image} alt="" crop={false} />}
      <span className="wf-link-text">
        <span className="wf-link-title">{link.title}</span>
        <span className="wf-link-site">
          {link.site}
          <NewTab />
        </span>
      </span>
    </a>
  );
}

function Video({ post }: { post: FullCard }) {
  const cover = post.video?.cover;
  return (
    <a className="wf-video" href={post.url} target="_blank" rel="noopener noreferrer">
      {/* The cover's own line names the link (the visible words only say where it plays). */}
      {cover && <CardImg img={cover} alt={cover.alt ?? ""} crop={false} />}
      <span className="wall-video-play" aria-hidden="true" />
      <span className="wf-video-note">
        Plays on LinkedIn
        <NewTab />
      </span>
    </a>
  );
}

function Poll({ post }: { post: FullCard }) {
  const poll = post.poll!;
  return (
    <div className="wf-poll">
      <p className="wf-poll-label">Poll</p>
      <p className="wf-poll-q">{poll.question}</p>
      <ul className="wf-poll-options" role="list">
        {poll.options.map((o) => (
          <li key={o}>{o}</li>
        ))}
      </ul>
    </div>
  );
}

/** The post he quotes. His own older post shows its text; anyone else's is only a link to it. */
function Quote({ post, full }: { post: FullCard; full: boolean }) {
  const q = post.quote_of;
  if (!q || !post.quote) return null;
  const { label, href, external } = post.quote;
  return (
    <div className={`wf-quote${full ? " wf-quote-full" : ""}`}>
      <a
        className="wf-quote-label"
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {label}
        {external && <NewTab />}
      </a>
      {q.text && <p className={`wall-text${full ? "" : " wf-clamp-3"}`}>{q.text}</p>}
      {full
        ? q.images.map((img, i) => <FullImg key={img.src} img={img} alt={post.quoteAlts[i]} />)
        : q.images[0] && (
            <figure className="wf-quote-media">
              <CardImg img={q.images[0]} alt={post.quoteAlts[0]} crop />
            </figure>
          )}
    </div>
  );
}

// Buttons and links name their post in an aria-label that starts with the visible words, so speech
// input ("click Read more") still works and every card's controls are distinct.
function LinkedInLink({ post, children }: { post: FullCard; children: string }) {
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
  post: FullCard;
  enhanced: boolean;
  showZero: boolean;
  onOpen: (post: FullCard, trigger: HTMLButtonElement) => void;
}) {
  const moreRef = useRef<HTMLButtonElement>(null);
  const first = post.images[0] ?? post.pages[0];
  const firstAlt = post.images[0] ? post.alts[0] : post.pageAlts[0];
  const more = post.images.length - 1;
  const media = first ? "image" : post.link?.image ? "link" : post.video ? "video" : "none";
  const cls = ["wf-card", `wf-card-${media}`, post.short ? "wf-card-short" : ""].filter(Boolean).join(" ");

  return (
    <article id={`post-${post.id}`} className={cls} aria-label={post.label.replace(/^the p/, "P")}>
      {first && (
        <figure
          className={`wf-media${enhanced && post.opens ? " wf-media-opens" : ""}`}
          onClick={enhanced && post.opens ? () => moreRef.current && onOpen(post, moreRef.current) : undefined}
        >
          <CardImg img={first} alt={firstAlt} crop />
          {post.pages.length > 0 && !post.images.length ? (
            <span className="wf-badge">{plural(post.pages.length, "page")}</span>
          ) : (
            more > 0 && (
              <span className="wf-badge">
                +{more}
                <span className="sr-only"> more {more === 1 ? "image" : "images"} in the full post</span>
              </span>
            )
          )}
        </figure>
      )}
      {!first && post.link && <LinkCard post={post} />}
      {!first && !post.link && post.video && <Video post={post} />}

      <div className="wf-body">
        <p className={`wall-text wall-collapsed${first || post.link || post.video ? " wf-clamp-3" : ""}`}>{post.collapsed}</p>
        {post.poll && <Poll post={post} />}
        <Quote post={post} full={false} />
        {first && post.link && <LinkCard post={post} />}
        {post.opens &&
          (enhanced ? (
            <button
              ref={moreRef}
              type="button"
              className="wall-more"
              aria-haspopup="dialog"
              aria-label={`Read more: ${post.label}`}
              onClick={(e) => onOpen(post, e.currentTarget)}
            >
              Read more
            </button>
          ) : (
            post.has_more && (
              <details className="wall-details">
                <summary className="wall-more">
                  <span className="wall-more-closed">Read more</span>
                  <span className="wall-more-open">Show less</span>
                </summary>
                <p className="wall-text">{post.text}</p>
              </details>
            )
          ))}
      </div>

      <footer className="wf-foot">
        <time className="wall-date" dateTime={post.date}>
          {post.day}
        </time>
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
  post: FullCard | null;
  showZero: boolean;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  onClose: () => void;
}) {
  return (
    <dialog
      ref={dialogRef}
      className="wall-dialog"
      aria-labelledby="wf-dialog-title wf-dialog-date"
      onClose={onClose}
      onClick={(e) => {
        // A click on the backdrop (the dialog box itself, outside its panel) closes it.
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
    >
      {post && (
        <div className="wall-dialog-panel">
          <header className="wall-dialog-head">
            <Avatar />
            <div className="wall-byline">
              <h2 id="wf-dialog-title" className="wall-name" ref={titleRef} tabIndex={-1}>
                Alex Alderman
              </h2>
              <time id="wf-dialog-date" className="wall-date" dateTime={post.date}>
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
            {post.poll && <Poll post={post} />}
            {post.images.map((img, i) => (
              <FullImg key={img.src} img={img} alt={post.alts[i]} eager={i === 0} />
            ))}
            {post.pages.length > 0 && (
              <section className="wf-pages" aria-label={post.document?.title ?? "The carousel"}>
                {post.document?.title && (
                  <p className="wf-pages-title">
                    {post.document.title}
                    <span className="wf-pages-count">{plural(post.pages.length, "page")}</span>
                  </p>
                )}
                {post.pages.map((img, i) => (
                  <FullImg key={img.src} img={img} alt={post.pageAlts[i]} eager={i === 0 && !post.images.length} />
                ))}
              </section>
            )}
            {post.video && <Video post={post} />}
            {post.link && <LinkCard post={post} />}
            <Quote post={post} full />
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

export function LinkedInWallFull({ posts, showZeroCounts }: { posts: FullCard[]; showZeroCounts: boolean }) {
  // Server HTML and the first client render match (details fallback); the buttons come in after mount.
  const [enhanced, setEnhanced] = useState(false);
  const [open, setOpen] = useState<FullCard | null>(null);
  const gridRef = useRef<HTMLUListElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => setEnhanced(true), []);

  const onOpen = useCallback((post: FullCard, trigger: HTMLButtonElement) => {
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
      const gap = parseFloat(style.columnGap) || 14;
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
      <ul className="wf-grid" ref={gridRef} role="list">
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
