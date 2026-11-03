"use client";

import { useEffect } from "react";

// Opens the compact feed's entry that a link points at (/log#post-s02, or /#s02 -> the anchor inside it).
export default function FeedOpen() {
  useEffect(() => {
    const open = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const el = document.getElementById(id);
      const details = el?.closest("details");
      if (details && !details.open) {
        details.open = true;
        el?.scrollIntoView();
      }
    };
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, []);
  return null;
}
