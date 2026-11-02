"use client";

/*
 * "How much time do you have?" (Alex, 17:5x: a clean path for whatever time a visitor wants to
 * invest). Four toggle buttons; the one pressed opens its reading path: an ordered list of links,
 * each with its minutes and the running total. The paths are resolved on the server
 * (app/welcome-data.ts) and all four are in the HTML, so without JavaScript every path shows, one
 * after the other, and the buttons hide (welcome.css, html:not(.js)). Screen readers hear the path
 * that opened through a polite live region. /#time-20 and the like open a path on arrival.
 */

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Stop, TimePath } from "./welcome-data";

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function StopRow({ stop, index, pathKey }: { stop: Stop; index: number; pathKey: string }) {
  const minutes = (
    <p className="tp-min">
      <span className="tp-min-own">
        {stop.min} min{stop.kind === "link" && stop.video ? " video" : " read"}
      </span>
      <span className="tp-min-sofar">{stop.total} min so far</span>
    </p>
  );

  if (stop.kind === "your-page") {
    const labelId = `time-${pathKey}-page`;
    return (
      <li className="tp-stop tp-stop-pick">
        <span className="tp-num" aria-hidden="true">
          {index + 1}
        </span>
        <div className="tp-main">
          <p className="tp-title" id={labelId}>
            {stop.title}
          </p>
          <ul className="tp-roles" aria-labelledby={labelId}>
            {stop.pages.map((page) => (
              <li key={page.href}>
                <Link href={page.href} className="tp-role" title={page.title}>
                  {page.role}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {minutes}
      </li>
    );
  }

  const hash = stop.href.startsWith("#");
  return (
    <li className="tp-stop">
      <span className="tp-num" aria-hidden="true">
        {index + 1}
      </span>
      <div className="tp-main">
        {hash ? (
          <a href={stop.href} className="tp-title tp-link">
            {stop.title}
          </a>
        ) : (
          <Link href={stop.href} className="tp-title tp-link">
            {stop.title}
          </Link>
        )}
        <p className="tp-line">{stop.line}</p>
      </div>
      {minutes}
    </li>
  );
}

export function TimePicker({ question, helper, paths }: { question: string; helper: string; paths: TimePath[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");

  const choose = (key: string, fromUser: boolean) => {
    const path = paths.find((p) => p.key === key);
    if (!path) return;
    setSelected(key);
    setAnnouncement(`${path.label}: ${path.stops.length} stops, ${path.total} minutes in all.`);
    if (!fromUser) return;
    // On a phone the list opens below the fold: bring its top up to about 40% of the screen.
    requestAnimationFrame(() => {
      const panel = document.getElementById(`time-${key}`);
      if (!panel) return;
      const top = panel.getBoundingClientRect().top;
      if (top > window.innerHeight * 0.72) {
        window.scrollBy({ top: top - window.innerHeight * 0.4, behavior: reducedMotion() ? "auto" : "smooth" });
      }
    });
  };

  // A link like /#time-20 opens that path on arrival.
  useEffect(() => {
    const m = window.location.hash.match(/^#time-(\d+)$/);
    if (m && paths.some((p) => p.key === m[1])) {
      setSelected(m[1]);
      requestAnimationFrame(() => document.getElementById(`time-${m[1]}`)?.scrollIntoView({ block: "start" }));
    }
  }, [paths]);

  return (
    <div className="tp">
      <div className="tp-head">
        <h2 id="tp-question" className="tp-question">
          {question}
        </h2>
        <p className="tp-helper">{helper}</p>
      </div>

      <div className="tp-choices" role="group" aria-labelledby="tp-question">
        {paths.map((path) => (
          <button
            key={path.key}
            type="button"
            className="tp-choice"
            aria-pressed={selected === path.key}
            aria-controls={`time-${path.key}`}
            onClick={() => selected !== path.key && choose(path.key, true)}
          >
            <span className="tp-time" aria-hidden="true">
              <span className="tp-n">{path.n}</span>
              {path.plus && <span className="tp-plus">+</span>}
              <span className="tp-unit">{path.unit}</span>
            </span>
            <span className="sr-only">{path.plus ? `${path.n} minutes or more: ` : `${path.n} minutes: `}</span>
            <span className="tp-label">{path.label}</span>
          </button>
        ))}
      </div>

      <div className="tp-panels">
        {paths.map((path) => (
          <section
            key={path.key}
            id={`time-${path.key}`}
            className="tp-panel"
            aria-labelledby={`time-${path.key}-title`}
            hidden={selected !== path.key}
          >
            <div className="tp-panel-head">
              <div className="tp-panel-text">
                <h3 id={`time-${path.key}-title`} className="tp-panel-title">
                  <span className="tp-panel-time">
                    {path.n}
                    {path.plus ? "+" : ""} {path.unit}
                  </span>
                  <span className="sr-only">: </span>
                  <span className="tp-panel-label">{path.label}</span>
                </h3>
                <p className="tp-panel-promise">{path.promise}</p>
              </div>
              <p className="tp-panel-sum">
                {path.stops.length} stops, {path.total} minutes in all
              </p>
            </div>
            <ol className="tp-stops">
              {path.stops.map((stop, i) => (
                <StopRow key={i} stop={stop} index={i} pathKey={path.key} />
              ))}
            </ol>
          </section>
        ))}
      </div>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>
    </div>
  );
}
