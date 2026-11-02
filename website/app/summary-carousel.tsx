"use client";

/*
 * The summary carousel under the welcome (Alex, 17:5x: "the summaries that were specifically marked
 * as such should be in a carousel at the top, starting with the most recent one"). Feed posts with
 * "summary": true, newest first, each card linking to its post in the feed below. The mechanics
 * follow the /d1 board carousel (app/carousel.tsx): a native scroll-snap track (swipe is the
 * browser's own), 48 px prev and next buttons, arrow keys plus Home and End, a visible counter, no
 * autoplay, one polite announcement when the view settles, and nothing animates under
 * prefers-reduced-motion. One card at a time on phones, two on tablets, three on desktop. Every card
 * stays reachable by Tab (focus scrolls the track), so nothing is inert.
 */

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import type { SummaryCard } from "./welcome-data";
import "./summary-carousel.css";

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

// YouTube's own stills: 320 px at 16:9, and 640 px at 4:3 with the letterbox, which object-fit
// crops away.
const thumb = (id: string, name: string) => `https://i.ytimg.com/vi/${id}/${name}.jpg`;

function Card({ card }: { card: SummaryCard }) {
  const href = `#post-${card.id}`;
  const timing = card.min ? ` (${card.min} min ${card.video ? "video" : "read"})` : "";
  const link = (className: string) => (
    <a href={href} className={`sc-link ${className}`}>
      {card.title}
      <span className="sr-only">{timing}</span>
    </a>
  );
  return (
    <div className="sc-card">
      <div className={card.youtube ? "sc-cover" : "sc-cover sc-cover-text"}>
        {card.youtube ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumb(card.youtube, "mqdefault")}
            srcSet={`${thumb(card.youtube, "mqdefault")} 320w, ${thumb(card.youtube, "sddefault")} 640w`}
            sizes="(min-width: 1290px) 410px, (min-width: 992px) 31vw, (min-width: 768px) 46vw, 88vw"
            width={320}
            height={180}
            alt=""
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        ) : (
          <h3 className="sc-cover-title">{link("sc-cover-link")}</h3>
        )}
        <span className="sc-badges" aria-hidden="true">
          <span className="sc-badge">{card.video ? "Video" : "Read"}</span>
          {card.min ? <span className="sc-badge">{card.min} min</span> : null}
        </span>
      </div>
      <div className="sc-body">
        <p className="sc-meta">
          <span className={`post-kind post-kind-${card.kind.toLowerCase()}`}>{card.kind}</span>
          <time dateTime={card.at}>{card.time}</time>
        </p>
        {card.youtube && <h3 className="sc-title">{link("sc-title-link")}</h3>}
        <p className="sc-line">{card.line}</p>
      </div>
    </div>
  );
}

export function SummaryCarousel({ heading, intro, cards }: { heading: string; intro: string; cards: SummaryCard[] }) {
  const n = cards.length;
  const uid = useId();
  const headingId = `${uid}-h`;
  const trackId = `${uid}-track`;
  const trackRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef(0);
  const settleRef = useRef(0);
  const shownRef = useRef("");
  // `index` is the first card in view, `visible` how many fit, `atEnd` whether the last one shows.
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
        setAnnouncement(
          m.fit > 1 ? `Summaries ${m.start + 1} to ${last} of ${n}` : `${m.start + 1} of ${n}: ${cards[m.start].title}`,
        );
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

  const last = Math.min(n, index + visible);
  const allFit = visible >= n;

  return (
    <section className="sc on-light" aria-roledescription="carousel" aria-labelledby={headingId} onKeyDown={onKeyDown}>
      <div className="container sc-inner">
        <div className="sc-head">
          <h2 id={headingId} className="section-title sc-heading">
            {heading}
          </h2>
          <p className="sc-intro">{intro}</p>
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
            <span className="sr-only">Previous summaries</span>
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
            <span className="sr-only">Next summaries</span>
          </button>
        </div>
        <div className="sc-track" id={trackId} ref={trackRef}>
          {cards.map((card, i) => (
            <div key={card.id} className="sc-slide" role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${n}`}>
              <Card card={card} />
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
