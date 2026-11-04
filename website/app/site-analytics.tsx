"use client";

import { useEffect } from "react";
import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";

// Vercel Web Analytics with an opt-out for Alex's own visits (4 Nov; he chose this over a firewall IP rule).
// Open any page once with ?me=on and this browser stops counting: localStorage "va-disable" is set and that
// same pageview is dropped. ?me=off removes the flag. Either way the param leaves the address bar
// (history.replaceState) and never reaches Vercel. No visible UI. Every storage access is wrapped, so a
// private window or blocked storage just counts as usual and never throws.

const FLAG = "va-disable";
const PARAM = "me";

function meParam(url: string): string | null {
  try {
    return new URL(url, window.location.href).searchParams.get(PARAM);
  } catch {
    return null;
  }
}

/** Sets or clears the flag for ?me=on / ?me=off; anything else leaves it as it is. */
function applyMe(value: string | null) {
  try {
    if (value === "on") window.localStorage.setItem(FLAG, "1");
    else if (value === "off") window.localStorage.removeItem(FLAG);
  } catch {
    // Storage unavailable: nothing to remember.
  }
}

function optedOut(): boolean {
  try {
    return window.localStorage.getItem(FLAG) !== null;
  } catch {
    return false;
  }
}

function withoutMe(url: string): string {
  try {
    const u = new URL(url, window.location.href);
    if (!u.searchParams.has(PARAM)) return url;
    u.searchParams.delete(PARAM);
    return u.toString();
  } catch {
    return url;
  }
}

function beforeSend(event: BeforeSendEvent): BeforeSendEvent | null {
  const me = meParam(event.url);
  applyMe(me);
  if (me === "on" || optedOut()) return null;
  return { ...event, url: withoutMe(event.url) };
}

export function SiteAnalytics() {
  useEffect(() => {
    const me = meParam(window.location.href);
    if (me === null) return;
    applyMe(me);
    try {
      const clean = withoutMe(window.location.href);
      window.history.replaceState(window.history.state, "", clean);
    } catch {
      // Leave the address bar as it is.
    }
  }, []);
  return <Analytics beforeSend={beforeSend} />;
}
