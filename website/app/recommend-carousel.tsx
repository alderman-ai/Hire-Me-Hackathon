"use client";

/*
 * "Recommended for you" (RULES.md rule 5; VERDICT.md 2.4): the cards from app/recommend.ts. The
 * mechanics are the summary carousel's (app/summary-carousel.tsx, after the /d1 board carousel): a
 * native scroll-snap track (swipe is the browser's own), 48 px prev and next buttons, arrow keys plus
 * Home and End, a visible counter, no autoplay, one polite announcement when the view settles, and
 * nothing animates under prefers-reduced-motion. Every card stays reachable by Tab.
 *
 * A card is its cover, its title and the one line on why it's there: no minutes, no "Demo N", no
 * badges. Every link carries ?for=<slug> once the visitor has a page (app/your-page.tsx), so "Back to
 * your page" works even with storage blocked.
 */

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import type { RecCard } from "./recommend";
import { readYourPage, withFor } from "./your-page";
import "./summary-carousel.css";
import "./recommend.css";

function reducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

const thumb = (id: string, name: string) => `https://i.ytimg.com/vi/${id}/${name}.jpg`;
const SIZES = "(min-width: 1290px) 410px, (min-width: 992px) 31vw, (min-width: 768px) 46vw, 88vw";

function Card({ card, href }: { card: RecCard; href: string }) {
  const link = (className: string) => (
    <a href={href} className={`sc-link ${className}`}>
      {card.title}
    </a>
  );
  const cover = card.youtube || card.image;
  return (
    <div className="sc-card">
      <div className={cover ? "sc-cover" : "sc-cover sc-cover-text"}>
        {card.youtube ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumb(card.youtube, "mqdefault")}
            srcSet={`${thumb(card.youtube, "mqdefault")} 320w, ${thumb(card.youtube, "sddefault")} 640w`}
            sizes={SIZES}
            width={320}
            height={180}
            alt=""
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        ) : card.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={card.image.src} width={card.image.width} height={card.image.height} alt="" loading="lazy" decoding="async" />
        ) : (
          <h3 className="sc-cover-title">{link("sc-cover-link")}</h3>
        )}
      </div>
      <div className="sc-body">
        {cover && <h3 className="sc-title">{link("sc-title-link")}</h3>}
        <p className="sc-line">{card.why}</p>
        {card.placeholder && <p className="rc-placeholder">Placeholder list (preview only)</p>}
      </div>
    </div>
  );
}

export function RecommendCarousel({
  heading,
  cards,
  forSlug,
  people,
}: {
  heading: string;
  cards: RecCard[];
  /** The person whose page this is: their links carry ?for= from the server render on. */
  forSlug?: string;
  /** Known page slugs, to check a remembered or linked ?for= against. */
  people: string[];
}) {
  const n = cards.length;
  const uid = useId();
  const headingId = `${uid}-h`;
  const trackId = `${uid}-track`;
  const trackRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef(0);
  const settleRef = useRef(0);
  const shownRef = useRef("");
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(1);
  const [atEnd, setAtEnd] = useState(n <= 1);
  const [announcement, setAnnouncement] = useState("");
  // On anyone else's page (home, articles), links pick up the visitor's own page after mount.
  const [who, setWho] = useState<string | null>(forSlug ?? null);
  useEffect(() => {
    if (!forSlug) setWho(readYourPage(people));
  }, [forSlug, people]);

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
    const fit = Math.max(1, Math.min(n, Math.round((t.clientWidth + gap) / (first.offsetWidth + gap))));
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
      return m;
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
        setAnnouncement(m.fit > 1 ? `${m.start + 1} to ${last} of ${n}` : `${m.start + 1} of ${n}: ${cards[m.start].title}`);
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
  }, [measure, offsets, n, cards]);

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    const keys: Record<string, number> = { ArrowLeft: targetRef.current - 1, ArrowRight: targetRef.current + 1, Home: 0, End: n - 1 };
    if (!(e.key in keys)) return;
    e.preventDefault();
    goTo(keys[e.key]);
  };

  if (!n) return null;
  const last = Math.min(n, index + visible);
  const allFit = visible >= n;

  return (
    <section className="sc rc on-light" aria-roledescription="carousel" aria-labelledby={headingId} onKeyDown={onKeyDown}>
      <div className="container sc-inner">
        <div className="sc-head">
          <h2 id={headingId} className="section-title sc-heading">
            {heading}
          </h2>
        </div>
        <div className="sc-bar" hidden={allFit}>
          <button
            type="button"
            className="sc-btn"
            aria-controls={trackId}
            aria-disabled={index === 0}
            onClick={() => index > 0 && goTo(targetRef.current - 1)}
          >
            <Arrow dir="prev" />
            <span className="sr-only">Previous</span>
          </button>
          <p className="sc-count" aria-hidden="true">
            <span className="sc-count-now">
              {index + 1}
              {visible > 1 && last > index + 1 ? `–${last}` : ""}
            </span>
            <span className="sc-count-of"> / {n}</span>
          </p>
          <button
            type="button"
            className="sc-btn"
            aria-controls={trackId}
            aria-disabled={atEnd}
            onClick={() => !atEnd && goTo(targetRef.current + 1)}
          >
            <Arrow dir="next" />
            <span className="sr-only">Next</span>
          </button>
        </div>
        <div className="sc-track" id={trackId} ref={trackRef}>
          {cards.map((card, i) => (
            <div key={card.key} className="sc-slide" role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${n}`}>
              <Card card={card} href={withFor(card.href, who)} />
            </div>
          ))}
        </div>
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {announcement}
        </p>
      </div>
    </section>
  );
}
