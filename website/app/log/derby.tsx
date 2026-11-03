"use client";

/*
 * Day 1 as a carnival derby (content/highlights.json: data.derby, built by scripts/build_highlights.py).
 * One racer per roster name (a lane of the swimlane below). A racer moves forward by its cumulative
 * commits that day; it enters when its session first appears, leaves when the session ends for good,
 * and drops off the track at the 13:20:55 kill, to re-enter at its next commit or session record.
 * Plays once when it scrolls into view (the section's one orchestrated moment), then Replay or the
 * scrubber. With prefers-reduced-motion it shows the end state and never autoplays.
 * Words arrive as props (keyed placeholders resolved on the server); lane names are data.
 */

import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import "./derby.css";

export type DerbyLane = {
  n: number;
  lane: string;
  total: number;
  enter: number;
  leave: number;
  killed: boolean;
  back: number | null;
  on: number[][];
  cum: number[];
};
export type DerbyData = {
  start: number;
  end: number;
  step: number;
  kill: number;
  lanes: DerbyLane[];
  leads: [number, string][];
  totals: { racing_commits: number };
};
export type DerbyWords = {
  title: string;
  caption: string;
  kill: string;
  standings: string;
  summary: string;
  leads: string;
  scrub: string;
};

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const hm = (m: number) => `${String(Math.floor(m / 60) % 24).padStart(2, "0")}:${String(Math.floor(m % 60)).padStart(2, "0")}`;

const RUN_SECONDS = 22; // the whole day in this many seconds of play
const SLOW_ZONE = 3; // minutes either side of the kill at one tenth speed
const PALETTE = ["#2b1d6b", "#3a2790", "#4a1d73", "#33206f"]; // tin waves: ink, violet, plum

function useMatch(query: string) {
  const [m, setM] = useState(false);
  useIso(() => {
    const mq = window.matchMedia(query);
    const f = () => setM(mq.matches);
    f();
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, [query]);
  return m;
}

/** One tin wave: a sine along the lane, offset by `base`; `fill` closes it out to `far`, `edge` is the crest. */
function wave(vertical: boolean, a: number, b: number, base: number, far: number, amp: number, wl: number, phase: number) {
  const pts: string[] = [];
  for (let t = a; t <= b; t += 4) {
    const o = base + amp * Math.sin(((t + phase) / wl) * Math.PI * 2);
    pts.push(vertical ? `${o.toFixed(1)},${t}` : `${t},${o.toFixed(1)}`);
  }
  const edge = `M${pts.join(" L")}`;
  const fill = vertical ? `${edge} L${far},${b} L${far},${a} Z` : `${edge} L${b},${far} L${a},${far} Z`;
  return { fill, edge };
}

/** The racer: a tin toy on a stand, facing along the track. Original shapes, brand colours. */
function Racer({ n, vertical, grad }: { n: number; vertical: boolean; grad: string }) {
  return (
    <>
      <g transform={vertical ? "rotate(-90)" : undefined}>
        <rect x={-8} y={3} width={3.2} height={7} rx={1} className="dv-leg" />
        <rect x={5} y={3} width={3.2} height={7} rx={1} className="dv-leg" />
        <polygon points="-8,-6 -8,-17 3,-13" className="dv-flag-p" />
        <rect x={-12.5} y={-7} width={25} height={11} rx={5.5} fill={`url(#${grad})`} className="dv-body" />
        <circle cx={14} cy={-6} r={4.6} fill={`url(#${grad})`} className="dv-body" />
        <circle cx={15.4} cy={-7.2} r={1} className="dv-eye" />
      </g>
      <circle cx={0} cy={vertical ? 17 : 14} r={8.6} className="dv-plate" />
      <text x={0} y={(vertical ? 17 : 14) + 3.6} textAnchor="middle" className="dv-plate-n">
        {n}
      </text>
    </>
  );
}

export function Derby({ data, words }: { data: DerbyData; words: DerbyWords }) {
  const { start, end, step, kill, lanes } = data;
  const uid = useId().replace(/:/g, "");
  const grad = `dvg${uid}`;
  const vertical = useMatch("(max-width: 640px)");
  const rootRef = useRef<HTMLElement>(null);
  const clockRef = useRef(end);
  const startedRef = useRef(false);
  const reducedRef = useRef(false);
  const [clock, setClockState] = useState(end); // server and no-JS: the finished race
  const [playing, setPlaying] = useState(false);

  const setClock = useCallback((v: number) => {
    clockRef.current = v;
    setClockState(v);
  }, []);

  const base = (end - start) / RUN_SECONDS;

  // On mount: unless reduced motion, rewind and wait for the section to scroll into view.
  useIso(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reducedRef.current) setClock(start);
  }, [setClock, start]);

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
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [setClock, start]);

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      const c = clockRef.current;
      const rate = base * (Math.abs(c - kill) < SLOW_ZONE ? 0.1 : 1);
      const next = Math.min(end, c + rate * dt);
      setClock(next);
      if (next >= end) setPlaying(false);
      else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, base, end, kill, setClock]);

  const replay = () => {
    startedRef.current = true;
    setClock(start);
    setPlaying(true);
  };
  const toggle = () => {
    if (playing) setPlaying(false);
    else if (clockRef.current >= end) replay();
    else {
      startedRef.current = true;
      setPlaying(true);
    }
  };

  const maxTotal = Math.max(...lanes.map((l) => l.total));
  const frac = (l: DerbyLane, c: number) => {
    const idx = Math.max(0, Math.min(l.cum.length - 1, (c - start) / step));
    const i0 = Math.floor(idx);
    const i1 = Math.min(l.cum.length - 1, i0 + 1);
    return (l.cum[i0] + (l.cum[i1] - l.cum[i0]) * (idx - i0)) / maxTotal;
  };
  const stateOf = (l: DerbyLane, c: number) => {
    if (c < l.enter) return "wait";
    if (l.on.some(([a, b]) => c >= a && c < b)) return "on";
    return c >= l.leave ? "done" : "drop";
  };

  // geometry: horizontal lanes on wide screens, vertical lanes (racing upward) on phones
  const n = lanes.length;
  const W = vertical ? 360 : 880;
  const H = vertical ? 480 : 46 + n * 34 + 16;
  const size = vertical ? 26 : 34;
  const first = vertical ? (360 - n * 26) / 2 : 46;
  const mid = (i: number) => first + i * size + size / 2;
  const A0 = vertical ? 432 : 190;
  const A1 = vertical ? 52 : 832;
  const point = (i: number, f: number) => {
    const a = A0 + f * (A1 - A0);
    return vertical ? { x: mid(i), y: a } : { x: a, y: mid(i) - 1 };
  };

  const waves = useMemo(
    () =>
      lanes.map((_, i) => {
        const b0 = first + i * size;
        return vertical ? wave(true, 40, 444, b0, b0 + 34, 2.6, 30, i * 9) : wave(false, 176, 860, b0 + 3, b0 + 46, 3.2, 32, i * 9);
      }),
    [lanes, vertical, first, size],
  );

  // standings (competition ranking: equal commits share a placing)
  const standings = useMemo(() => {
    const s = [...lanes].sort((a, b) => b.total - a.total || a.n - b.n);
    let rank = 0;
    return s.map((l, i) => {
      if (i === 0 || l.total !== s[i - 1].total) rank = i + 1;
      return { l, rank };
    });
  }, [lanes]);

  const dropped = lanes.filter((l) => l.killed).length;
  const vars: Record<string, string | number> = {
    lanes: n,
    commits: data.totals.racing_commits,
    start: hm(start),
    end: hm(end),
    kill_time: "13:20:55",
    winner: standings[0].l.lane,
    winner_commits: standings[0].l.total,
    runner_up: standings[1].l.lane,
    last: standings[standings.length - 1].l.lane,
    dropped,
  };
  let summary = words.summary;
  for (const [k, v] of Object.entries(vars)) summary = summary.split(`{${k}}`).join(String(v));

  const killActive = clock >= kill && clock < Math.max(...lanes.filter((l) => l.killed).map((l) => l.back ?? kill));
  const killFlash = Math.abs(clock - kill) < SLOW_ZONE && clock >= kill - 0.4;
  const pct = ((kill - start) / (end - start)) * 100;

  return (
    <figure ref={rootRef} className={`hl-chart dv${killActive ? " is-kill" : ""}`} id="hl-chart-derby" aria-labelledby="dv-title" aria-describedby="dv-sum">
      <h3 id="dv-title">{words.title}</h3>
      <p id="dv-sum" className="sr-only">
        {summary}
      </p>

      <div className="dv-bar">
        <p className="dv-clock" aria-hidden="true">
          <span className="dv-time">{hm(clock)}</span>
          <span className={`dv-killflag${killActive ? " is-on" : ""}`}>{words.kill}</span>
        </p>
        <div className="dv-controls">
          <button type="button" className="dv-btn" onClick={toggle} aria-pressed={playing}>
            {playing ? "Pause" : "Play"}
          </button>
          <button type="button" className="dv-btn dv-btn-main" onClick={replay}>
            Replay
          </button>
        </div>
      </div>

      <div className="dv-track" aria-hidden="true">
        <svg viewBox={`0 0 ${W} ${H}`} focusable="false">
          <defs>
            <linearGradient id={grad} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#6645eb" />
              <stop offset="1" stopColor="#d445eb" />
            </linearGradient>
            <pattern id={`${grad}c`} width="12" height="12" patternUnits="userSpaceOnUse">
              <rect width="12" height="12" fill="#151515" />
              <rect width="6" height="6" fill="#d3c3ff" />
              <rect x="6" y="6" width="6" height="6" fill="#d3c3ff" />
            </pattern>
          </defs>

          {lanes.map((l, i) => (
            <g key={l.lane}>
              <path d={waves[i].fill} fill={PALETTE[i % PALETTE.length]} className="dv-wave" />
              <path d={waves[i].edge} className="dv-crest" fill="none" />
            </g>
          ))}

          {vertical ? (
            <rect x={first - 4} y={A1 - 24} width={n * size + 8} height={12} fill={`url(#${grad}c)`} className="dv-finish" />
          ) : (
            <rect x={A1 + 14} y={first - 2} width={12} height={n * size + 4} fill={`url(#${grad}c)`} className="dv-finish" />
          )}

          {lanes.map((l, i) =>
            vertical ? (
              <g key={l.lane} className="dv-gate">
                <circle cx={mid(i)} cy={462} r={9} className="dv-plate" />
                <text x={mid(i)} y={465.6} textAnchor="middle" className="dv-plate-n">
                  {l.n}
                </text>
              </g>
            ) : (
              <g key={l.lane} className="dv-gate">
                <circle cx={16} cy={mid(i)} r={9} className="dv-plate" />
                <text x={16} y={mid(i) + 3.6} textAnchor="middle" className="dv-plate-n">
                  {l.n}
                </text>
                <text x={32} y={mid(i) + 4.2} className="dv-name">
                  {l.lane}
                </text>
              </g>
            ),
          )}

          {lanes.map((l, i) => {
            const p = point(i, frac(l, clock));
            return (
              <g key={l.lane} transform={`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) scale(${vertical ? 0.72 : 0.74})`}>
                <g className={`dv-tok dv-st-${stateOf(l, clock)}`}>
                  <Racer n={l.n} vertical={vertical} grad={grad} />
                </g>
              </g>
            );
          })}

          {killFlash && <rect x={0} y={0} width={W} height={H} className="dv-flash" />}
        </svg>
      </div>

      <div className="dv-scrub">
        <input
          type="range"
          min={start}
          max={end}
          step={1}
          value={Math.round(clock)}
          aria-label={words.scrub}
          aria-valuetext={hm(clock)}
          onChange={(e) => {
            setPlaying(false);
            startedRef.current = true;
            setClock(Number(e.target.value));
          }}
        />
        <span className="dv-scrub-tick" style={{ left: `calc(9px + (100% - 18px) * ${(pct / 100).toFixed(4)})` }} aria-hidden="true" />
        <span className="dv-scrub-ends" aria-hidden="true">
          <span>{hm(start)}</span>
          <span>{hm(end)}</span>
        </span>
      </div>

      <figcaption>{words.caption}</figcaption>

      <h4 className="dv-h">{words.standings}</h4>
      <ol className="dv-standings">
        {standings.map(({ l, rank }) => (
          <li key={l.lane}>
            <span className="dv-rank">{rank}</span>
            <span className="dv-disc" aria-hidden="true">
              {l.n}
            </span>
            <span className="dv-lane">{l.lane}</span>
            <span className="dv-count">{l.total}</span>
          </li>
        ))}
      </ol>

      <div className="sr-only">
        <h4>{words.leads}</h4>
        <ul>
          {data.leads.map(([m, lane]) => (
            <li key={m}>
              {hm(m)} {lane}
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}
