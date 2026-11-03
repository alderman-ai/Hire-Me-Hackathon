"use client";

/*
 * Day 1 across the clock: one row per named session (its roster name), a bar for each stretch it ran,
 * the numbered high and low triangles tied to the clips below, and the 13:20:55 kill. The chart is
 * plain HTML positioned by percent, so it stays crisp at any width; on a phone it scrolls sideways
 * inside its own box with the names pinned on the left.
 *
 * It plays the day once when scrolled into view: a playhead sweeps the clock, each bar draws as its
 * session runs, a numbered token rides the playhead on every live row, the four rows that were live at
 * the kill (orchestration, website, rig, answer-desk) cut off at 13:20:55 and draw again when they come
 * back, and the triangles appear as the playhead passes them. Replay, Play/Pause and a scrubber follow.
 * Server render, no JavaScript and prefers-reduced-motion all show the complete static chart.
 * Data: content/highlights.json (data.swimlane, data.derby). Words arrive as props.
 */

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import "./day-lanes.css";

export type DayLane = { lane: string; runs: number[][]; subagents: number };
export type DayMarker = { n: number; kind: "high" | "low"; minute: number; href: string };
export type DayKill = { start: number; end: number; kill: number; back: Record<string, number> };
export type DayWords = {
  title: string;
  banner: string;
  summary: string;
  kill: string;
  scroll: string;
  scrub: string;
  table: string;
  high: string;
  low: string;
};

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const RUN_SECONDS = 18;
const SLOW_ZONE = 3; // minutes either side of the kill at one tenth speed

const hm = (m: number) => `${String(Math.floor(m / 60) % 24).padStart(2, "0")}:${String(Math.floor(m % 60)).padStart(2, "0")}`;

/** The stretches a lane ran, with the kill's gap cut out of the four lanes that were live at 13:20:55. */
function stretches(l: DayLane, kill: number, back?: number) {
  if (back === undefined) return l.runs;
  const out: number[][] = [];
  for (const [a, b] of l.runs) {
    if (a < kill && b > kill) {
      out.push([a, kill]);
      if (back < b) out.push([back, b]);
    } else out.push([a, b]);
  }
  return out;
}

function Tri({ kind, n }: { kind: "high" | "low"; n: number }) {
  const pts = kind === "high" ? "9,1 17,15 1,15" : "9,15 17,1 1,1";
  return (
    <svg viewBox="0 0 18 16" width="22" height="20" aria-hidden="true" focusable="false">
      <polygon points={pts} />
      <text x="9" y={kind === "high" ? 13.2 : 8.6} textAnchor="middle">
        {n}
      </text>
    </svg>
  );
}

export function DayLanes({ lanes, markers, k, axisFrom, axisTo, words }: { lanes: DayLane[]; markers: DayMarker[]; k: DayKill; axisFrom: number; axisTo: number; words: DayWords }) {
  const { start, end, kill } = k;
  const from = axisFrom * 60;
  const to = axisTo * 60;
  const pct = (m: number) => `${(Math.max(0, Math.min(1, (m - from) / (to - from))) * 100).toFixed(3)}%`;

  const clockRef = useRef<number | null>(null);
  const startedRef = useRef(false);
  const reducedRef = useRef(false);
  const rootRef = useRef<HTMLElement>(null);
  const [clock, setClockState] = useState<number | null>(null); // null: the complete static chart
  const [playing, setPlaying] = useState(false);

  const setClock = useCallback((v: number | null) => {
    clockRef.current = v;
    setClockState(v);
  }, []);

  useIso(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || reducedRef.current || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !startedRef.current) {
          startedRef.current = true;
          setClock(start);
          setPlaying(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [setClock, start]);

  useEffect(() => {
    if (!playing) return;
    const base = (end - start) / RUN_SECONDS;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      const c = clockRef.current ?? start;
      const next = Math.min(end, c + base * (Math.abs(c - kill) < SLOW_ZONE ? 0.1 : 1) * dt);
      if (next >= end) {
        setClock(null); // the finished chart
        setPlaying(false);
      } else {
        setClock(next);
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, start, end, kill, setClock]);

  const replay = () => {
    startedRef.current = true;
    setClock(start);
    setPlaying(true);
  };
  const toggle = () => {
    if (playing) setPlaying(false);
    else if (clockRef.current === null) replay();
    else {
      startedRef.current = true;
      setPlaying(true);
    }
  };

  const c = clock; // null = complete
  const cut = lanes.map((l) => stretches(l, kill, k.back[l.lane]));
  const killOn = c !== null && c >= kill && c < Math.max(...Object.values(k.back));
  const rows = lanes.length;
  const axisTicks: number[] = [];
  for (let h = axisFrom; h <= axisTo; h += 2) axisTicks.push(h);

  return (
    <figure ref={rootRef} className="hl-chart dl" id="hl-chart-map" aria-labelledby="hl-ct-map" aria-describedby="hl-cs-map">
      <h3 id="hl-ct-map">{words.title}</h3>
      <p className="dl-banner">{words.banner}</p>
      <p id="hl-cs-map" className="sr-only">
        {words.summary}
      </p>

      <div className="dl-bar">
        <p className={`dl-clock${c === null ? " is-off" : ""}`} aria-hidden="true">
          {hm(c ?? end)}
        </p>
        <div className="dl-controls">
          <button type="button" className="dl-btn" onClick={toggle} aria-pressed={playing}>
            {playing ? "Pause" : "Play"}
          </button>
          <button type="button" className="dl-btn dl-btn-main" onClick={replay}>
            Replay
          </button>
        </div>
      </div>

      <div className="dl-scroll" tabIndex={0} role="group" aria-label={words.scroll}>
        <div className="dl-chart" style={{ ["--dl-rows" as string]: rows }}>
          <ol className="dl-labels">
            {lanes.map((l, i) => (
              <li key={l.lane} title={`${l.lane}: ${l.subagents} subagents`}>
                <span className="dl-num">{i + 1}</span>
                {l.lane}
              </li>
            ))}
          </ol>

          <div className="dl-plot">
            <div className="dl-gutter" />
            <div className="dl-rows">
              {axisTicks.map((h) => (
                <span key={h} className="dl-grid" style={{ left: pct(h * 60) }} />
              ))}
              {lanes.map((l, i) => (
                <div key={l.lane} className="dl-row">
                  {cut[i].map(([a, b], j) => {
                    if (c !== null && c <= a) return null;
                    const stop = c === null ? b : Math.min(b, c);
                    return (
                      <span
                        key={j}
                        className="dl-seg"
                        style={{ left: pct(a), width: `calc(${pct(stop)} - ${pct(a)})`, minWidth: 3 }}
                        title={`${l.lane}: ${hm(a)}-${hm(Math.min(b, 1440))}`}
                      />
                    );
                  })}
                  {c !== null && cut[i].some(([a, b]) => c >= a && c < b) && (
                    <span className="dl-tok" style={{ left: pct(c) }} aria-hidden="true">
                      {i + 1}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="dl-axis">
              {axisTicks.map((h) => (
                <span key={h} style={{ left: pct(h * 60) }}>
                  {String(h % 24).padStart(2, "0")}:00
                </span>
              ))}
            </div>

            <div className="dl-over">
              {(c === null || c >= kill) && <span className="dl-killline" style={{ left: pct(kill) }} />}
              {markers.map((m) => {
                const shown = c === null || c >= m.minute;
                return (
                  <span key={m.n} className={`dl-mk dl-mk-${m.kind}${m.n === 5 ? " dl-mk-centre" : ""}${shown ? "" : " is-hidden"}`} style={{ left: pct(m.minute), ["--r" as string]: m.n % 2 ? 0 : 1 }}>
                    <span className="dl-mk-line" />
                    <a href={m.href} aria-label={`${m.n}, ${m.kind === "high" ? words.high : words.low}, ${hm(m.minute)}`} title={`${m.n}: ${hm(m.minute)}`}>
                      <Tri kind={m.kind} n={m.n} />
                    </a>
                  </span>
                );
              })}
              {c !== null && (
                <span className="dl-play" style={{ left: pct(c) }}>
                  <span className="dl-play-chip">{hm(c)}</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <p className={`dl-key${killOn ? " is-on" : ""}`}>
        <span className="dl-key-line" aria-hidden="true" />
        <span>{words.kill}</span>
      </p>

      <div className="dl-scrub">
        <input
          type="range"
          min={start}
          max={end}
          step={1}
          value={Math.round(c ?? end)}
          aria-label={words.scrub}
          aria-valuetext={hm(c ?? end)}
          onChange={(e) => {
            const v = Number(e.target.value);
            setPlaying(false);
            startedRef.current = true;
            setClock(v >= end ? null : v);
          }}
        />
        <span className="dl-scrub-tick" style={{ left: `calc(9px + (100% - 18px) * ${((kill - start) / (end - start)).toFixed(4)})` }} aria-hidden="true" />
      </div>

      <details className="hl-table">
        <summary>{words.table}</summary>
        <table>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Session</th>
              <th scope="col">Ran</th>
              <th scope="col">Subagents</th>
            </tr>
          </thead>
          <tbody>
            {lanes.map((l, i) => (
              <tr key={l.lane}>
                <td>{i + 1}</td>
                <th scope="row">{l.lane}</th>
                <td>{stretches(l, kill, k.back[l.lane]).map((r) => `${hm(r[0])}-${hm(Math.min(r[1], 1440))}`).join(", ")}</td>
                <td>{l.subagents}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            {markers.map((m) => (
              <tr key={m.n}>
                <td>{m.n}</td>
                <td>{`${hm(m.minute)} ${m.kind === "high" ? words.high : words.low}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}
