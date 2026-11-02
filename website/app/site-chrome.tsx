"use client";

/*
 * The site chrome, after Addvery's: the one disclaimer (Alex: once, in red, at the top of the
 * top menu bar), the top menu (see-through at the top, frosted after 1% of scroll; hamburger and a
 * full-height blurred sheet below 992 px), and the shared arrow button.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { usePageScrolled } from "./motion";
import { CTA, NAV_LINKS } from "./site-links";
import { YourPagePill } from "./your-page";


/** Addvery's north-east arrow, twice, so hover can swap one out diagonally and roll the other in. */
export function ArrowSwap() {
  const path = "M6 6v2h8.59L5 17.59L6.41 19L16 9.41V18h2V6z";
  return (
    <span className="arrow-swap" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="24" height="24">
        <path fill="currentColor" d={path} />
      </svg>
      <svg viewBox="0 0 24 24" width="24" height="24">
        <path fill="currentColor" d={path} />
      </svg>
    </span>
  );
}

export function GradientButton({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={["btn-gradient", className].filter(Boolean).join(" ")}>
      <span className="btn-label">{children}</span>
      <ArrowSwap />
    </Link>
  );
}

/** `people` (slug to first name) is set only on the new site (app/flags.ts): it turns on the Your page pill. */
export function SiteHeader({ people }: { people?: Record<string, string> } = {}) {
  const scrolled = usePageScrolled(0.01);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on navigation, on Escape, and when the window grows past the mobile layout.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const mq = window.matchMedia("(min-width: 992px)");
    const onMq = () => mq.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    document.documentElement.classList.add("menu-open");
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
      document.documentElement.classList.remove("menu-open");
    };
  }, [open]);

  return (
    <header className="site-header" data-scrolled={scrolled ? "" : undefined} data-open={open ? "" : undefined}>
      <p className="disclaimer">Unofficial job application by Alex Alderman. Not affiliated with Addvery.</p>
      <div className="nav">
        <div className="nav-color" aria-hidden="true" />
        <div className="nav-blur" aria-hidden="true" />
        <div className="nav-inner">
          <Link href="/" className="nav-brand" onClick={() => setOpen(false)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/addvery/addvery-logo-white-1080.png" alt="Addvery" width={137} height={52} />
            <span className="nav-divider" aria-hidden="true" />
            <span className="nav-site">Hire Me Hackathon</span>
          </Link>
          <nav className="nav-links" aria-label="Main">
            <ul>
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="nav-link">
                    {l.label}
                  </Link>
                </li>
              ))}
              {people && (
                <li className="your-page-item">
                  <YourPagePill people={people} variant="inline" />
                </li>
              )}
            </ul>
          </nav>
          <GradientButton href={CTA.href} className="nav-cta">
            {CTA.label}
          </GradientButton>
          <button
            type="button"
            className="hamburger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      <div id="mobile-menu" className="menu-sheet">
        <nav aria-label="Main, mobile">
          <ul>
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy" onClick={() => setOpen(false)}>
                Privacy
              </Link>
            </li>
          </ul>
          <div onClick={() => setOpen(false)}>
            <GradientButton href={CTA.href} className="menu-cta">
              {CTA.label}
            </GradientButton>
          </div>
        </nav>
      </div>
    </header>
  );
}

/**
 * Addvery's services accordion: glass cards with a +/- toggle. Opening eases the height over
 * 600 ms; closing is instant, as on their site. Each card opens and closes on its own.
 * Without JavaScript every panel shows (see globals.css).
 */
export function Accordion({
  items,
  defaultOpen = [0],
  idPrefix,
}: {
  items: { title: string; body: ReactNode }[];
  defaultOpen?: number[];
  idPrefix: string;
}) {
  const [open, setOpen] = useState<Set<number>>(() => new Set(defaultOpen));
  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  return (
    <ul className="acc">
      {items.map((item, i) => {
        const isOpen = open.has(i);
        const btn = `${idPrefix}-btn-${i}`;
        const panel = `${idPrefix}-panel-${i}`;
        return (
          <li key={item.title} className="acc-item" data-open={isOpen ? "" : undefined}>
            <h4 className="acc-heading">
              <button type="button" id={btn} aria-expanded={isOpen} aria-controls={panel} onClick={() => toggle(i)}>
                <span>{item.title}</span>
                <svg className="acc-icon" viewBox="0 0 19 19" width="19" height="19" aria-hidden="true">
                  <path d="M17.97 9.49H1" />
                  <path className="acc-icon-v" d="M9.49 1v16.97" />
                </svg>
              </button>
            </h4>
            <div id={panel} role="region" aria-labelledby={btn} className="acc-panel">
              <div>
                <p>{item.body}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
