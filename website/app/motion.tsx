"use client";

/*
 * Addvery's scroll motion, rebuilt without Webflow (see local/addvery/frontend/motion.md).
 *
 * - <Reveal>: their "slideInBottom" preset. 100 px up and a fade, 1000 ms outQuart,
 *   fires once when the element enters the viewport inset by `offset`% (default 10).
 * - <RotateIn>: their "image rotates as it comes into frame". Starts at opacity 0,
 *   rotated about a bottom corner, and swings to 0 deg while fading in. Fires once at
 *   offset 20%. Rotation eases with IX2 "ease", the fade is linear.
 *
 * Phones and tablets (< 992 px) get a lighter version: 40 px slide, rotation capped at 8 deg.
 * prefers-reduced-motion gets none. The hiding CSS only applies under `html.js`, which the
 * root layout sets before paint, so without JavaScript everything is plain and visible.
 * The CSS lives in app/globals.css ("Motion" section).
 */

import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type Ref } from "react";

type Listener = () => void;

// One shared IntersectionObserver per offset value (rootMargin can't vary per element).
const observers = new Map<number, IntersectionObserver>();
const listeners = new WeakMap<Element, Listener>();

function observerFor(offset: number) {
  let io = observers.get(offset);
  if (!io) {
    io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) listeners.get(e.target)?.();
        }
      },
      { rootMargin: `-${offset}% 0px -${offset}% 0px`, threshold: 0 },
    );
    observers.set(offset, io);
  }
  return io;
}

let readyMarked = false;
function markReady() {
  // Tells the failsafe in the layout's head script that motion is live.
  if (readyMarked || typeof document === "undefined") return;
  readyMarked = true;
  document.documentElement.classList.add("motion-ready");
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Plays once: true after the element first enters view (or right after mount when `onLoad`). */
export function useInViewOnce<T extends Element>(offset = 10, onLoad = false) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    markReady();
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    if (onLoad) {
      // Two frames so the hidden start state is committed before the transition starts.
      let r2 = 0;
      const r1 = requestAnimationFrame(() => {
        r2 = requestAnimationFrame(() => setInView(true));
      });
      return () => {
        cancelAnimationFrame(r1);
        cancelAnimationFrame(r2);
      };
    }
    const io = observerFor(offset);
    listeners.set(el, () => {
      setInView(true);
      io.unobserve(el);
      listeners.delete(el);
    });
    io.observe(el);
    return () => {
      io.unobserve(el);
      listeners.delete(el);
    };
  }, [offset, onLoad]);

  return [ref, inView] as const;
}

type RevealProps = {
  /** ms before the motion starts (Addvery uses 100 to 300). */
  delay?: number;
  /** Viewport inset in % at top and bottom that counts as "in view" (IX2 offset). */
  offset?: number;
  className?: string;
  style?: CSSProperties;
  id?: string;
  as?: "div" | "section" | "article" | "li" | "aside" | "header" | "figure";
  /** "up" (default, slideInBottom) or "left" (slideInLeft, the hero H1: 100 px from the left). */
  variant?: "up" | "left";
  /** Play right after load instead of on scroll. */
  onLoad?: boolean;
  children: ReactNode;
};

/** Slides up 100 px (40 px on phones) and fades in, 1000 ms outQuart, once. */
export function Reveal({
  delay = 0,
  offset = 10,
  className,
  style,
  id,
  as = "div",
  variant = "up",
  onLoad = false,
  children,
}: RevealProps) {
  const [ref, inView] = useInViewOnce<HTMLElement>(offset, onLoad);
  const Tag = as as "div";
  return (
    <Tag
      ref={ref as Ref<HTMLDivElement>}
      id={id}
      className={className}
      data-reveal={variant === "left" ? "slide-left" : "slide-up"}
      data-in={inView ? "" : undefined}
      style={{ "--reveal-delay": `${delay}ms`, ...style } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

type RotateInProps = {
  /** The corner it hinges on. */
  from?: "bottom-left" | "bottom-right";
  /** Start angle in degrees. Default -20 for bottom-left, +20 for bottom-right. Capped at 8 on phones. */
  angle?: number;
  /** ms before it starts. */
  delay?: number;
  /** Rotation time in ms (IX2 "ease"). Default 600, as on Addvery's about image. */
  duration?: number;
  /** Fade time in ms (linear). Default 700 with the default duration, otherwise the duration. */
  fade?: number;
  /** Play right after load instead of on scroll (the hero pair). */
  onLoad?: boolean;
  /** Viewport inset in % that counts as in view. Default 20. */
  offset?: number;
  className?: string;
  style?: CSSProperties;
  id?: string;
  as?: "div" | "figure" | "aside" | "section" | "article";
  children: ReactNode;
};

/** Addvery's rotate-in: from opacity 0 and a tilt about a bottom corner to upright, once. */
export function RotateIn({
  from = "bottom-left",
  angle,
  delay = 0,
  duration,
  fade,
  onLoad = false,
  offset = 20,
  className,
  style,
  id,
  as = "div",
  children,
}: RotateInProps) {
  const [ref, inView] = useInViewOnce<HTMLElement>(offset, onLoad);
  const deg = angle ?? (from === "bottom-right" ? 20 : -20);
  const small = Math.sign(deg) * Math.min(Math.abs(deg), 8);
  const dur = duration ?? 600;
  const fadeMs = fade ?? (duration === undefined ? 700 : duration);
  const Tag = as as "div";
  return (
    <Tag
      ref={ref as Ref<HTMLDivElement>}
      id={id}
      className={className}
      data-reveal="rotate-in"
      data-in={inView ? "" : undefined}
      style={
        {
          "--rotate-from": `${deg}deg`,
          "--rotate-from-sm": `${small}deg`,
          "--rotate-origin": from === "bottom-right" ? "100% 100%" : "0 100%",
          "--rotate-dur": `${dur}ms`,
          "--rotate-fade": `${fadeMs}ms`,
          "--reveal-delay": `${delay}ms`,
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  );
}

/**
 * Addvery's odometer counter: each digit is a 0-9 column that spins to its value,
 * 2000 ms cubic-bezier(.784,.325,.222,.98), once, when it enters view.
 */
export function Odometer({ value, className }: { value: string; className?: string }) {
  const [ref, inView] = useInViewOnce<HTMLSpanElement>(0);
  return (
    <span ref={ref} className={["odo", className].filter(Boolean).join(" ")} data-in={inView ? "" : undefined}>
      <span className="sr-only">{value}</span>
      {[...value].map((ch, i) =>
        /\d/.test(ch) ? (
          <span key={i} className="odo-mask" aria-hidden="true">
            <span className="odo-train" style={{ "--digit": Number(ch) } as CSSProperties}>
              {"0123456789".split("").map((d) => (
                <span key={d}>{d}</span>
              ))}
            </span>
          </span>
        ) : (
          <span key={i} aria-hidden="true">
            {ch}
          </span>
        ),
      )}
    </span>
  );
}

/** True once the page has scrolled past `threshold` of its scrollable height (Addvery: 1%). */
export function usePageScrolled(threshold = 0.01) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(max > 0 && window.scrollY / max > threshold);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [threshold]);
  return scrolled;
}
