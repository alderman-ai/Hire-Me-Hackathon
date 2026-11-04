"use client";

import { useEffect, useState } from "react";

/**
 * "Copy the prompt": writes `text` to the clipboard and shows a tick for two seconds. Without a clipboard it
 * selects the element `targetId` (showing it first if it's hidden), so the prompt can be copied by hand.
 */
export function CopyButton({ text, label, targetId = "agent-prompt-text" }: { text: string; label: string; targetId?: string }) {
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!done) return;
    const id = setTimeout(() => setDone(false), 2000);
    return () => clearTimeout(id);
  }, [done]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
    } catch {
      // No clipboard (an old browser, a blocked permission): select the prompt so it can be copied by hand.
      const el = document.getElementById(targetId);
      if (el?.hidden) el.hidden = false;
      const sel = window.getSelection();
      if (el && sel) {
        const range = document.createRange();
        range.selectNodeContents(el);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  }

  return (
    <button type="button" className={done ? "agent-btn agent-btn-line is-done" : "agent-btn agent-btn-line"} onClick={copy}>
      <span className="agent-btn-icon" aria-hidden="true">
        {done ? (
          <svg viewBox="0 0 24 24" width="18" height="18" focusable="false">
            <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="18" height="18" focusable="false">
            <rect x="8.5" y="8.5" width="11" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path d="M15.5 8.5V6.5a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2" fill="none" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        )}
      </span>
      <span>{label}</span>
      <span className="sr-only" aria-live="polite">
        {done ? "✓" : ""}
      </span>
    </button>
  );
}
