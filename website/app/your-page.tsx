"use client";

/*
 * "Your page" (VERDICT.md 2.11, the way back): once someone has opened their own /for/<slug>, the menu
 * shows a pill back to it, and every recommended link carries ?for=<slug>. The ?for= in the address
 * wins over the remembered one, so the way back works even where storage is blocked. Storage is read
 * and written inside try/catch: a private window or blocked site data just means no memory.
 *
 * The label is a working name from the verdict ("Your page · Ivana"); its words go through alex-voice.
 */

import Link from "next/link";
import { useEffect, useState } from "react";
import "./your-page.css";

const KEY = "hmh-your-page";

/** The visitor's own page slug: ?for= first, then the remembered one; only a known slug counts. */
export function readYourPage(known: string[]): string | null {
  if (typeof window === "undefined") return null;
  const fromUrl = new URLSearchParams(window.location.search).get("for");
  if (fromUrl && known.includes(fromUrl)) {
    try {
      window.localStorage.setItem(KEY, fromUrl);
    } catch {}
    return fromUrl;
  }
  try {
    const saved = window.localStorage.getItem(KEY);
    return saved && known.includes(saved) ? saved : null;
  } catch {
    return null;
  }
}

/** An internal link with ?for=<slug> added (a hash stays at the end). */
export function withFor(href: string, slug: string | null): string {
  if (!slug || !href.startsWith("/")) return href;
  const [path, hash] = href.split("#");
  const sep = path.includes("?") ? "&" : "?";
  return `${path}${sep}for=${encodeURIComponent(slug)}${hash ? `#${hash}` : ""}`;
}

/** On /for/<slug>: remember it. Renders nothing. */
export function RememberYourPage({ slug }: { slug: string }) {
  useEffect(() => {
    try {
      window.localStorage.setItem(KEY, slug);
    } catch {}
  }, [slug]);
  return null;
}

/**
 * The pill: in the menu bar on wide screens ("inline"), and as a bar stuck to the bottom of the screen
 * below 992 px ("bar"; layout.tsx renders that one outside the header).
 */
export function YourPagePill({ people, variant }: { people: Record<string, string>; variant: "inline" | "bar" }) {
  const [slug, setSlug] = useState<string | null>(null);
  useEffect(() => setSlug(readYourPage(Object.keys(people))), [people]);
  if (!slug) return null;
  return (
    <Link href={`/for/${slug}`} className={`your-page your-page-${variant}`}>
      <span className="your-page-label">Your page</span>
      <span aria-hidden="true">·</span>
      <span className="sr-only">, </span>
      <span className="your-page-name">{people[slug]}</span>
    </Link>
  );
}
