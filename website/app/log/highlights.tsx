import "../best/best.css";
import "./highlights.css";
import { VideoFrame } from "../best/video-frame";
import { DayLanes } from "./day-lanes";
import raw from "@/content/highlights.json";

/*
 * Day 1 highlights, the section at the top of /log (content/highlights.json holds all data and words).
 * A server component: charts are inline SVG, nothing here ships JavaScript except the shared VideoFrame.
 *
 * Words are placed, not written: every sentence is a key in `words`, and `w()` fills {tokens} in a
 * summary from the chart's own data. Quotes are verbatim from Alex's spoken lines in G clips, with the
 * clip's time. The arc runs in time order: numbered triangles (up = high, down = low) tie each chart
 * marker to its clip below; the accidental session kill (13:20) is the centrepiece.
 */

type Quote = { text: string; time: string };
type Beat = {
  n: number;
  kind: "high" | "low";
  grade: string;
  session: string;
  prague: string;
  minute?: number;
  youtube: string;
  start: number;
  end: number | null;
  length: string;
  quote: Quote;
};
type Centre = Omit<Beat, "quote" | "minute"> & {
  minute: number;
  segments: { key: string; from: number; to: number }[];
  marks: { key: string; at: number; prague: string }[];
  quotes: (Quote & { source: string })[];
};
type ComfyVideo = { youtube: string; start?: number; end?: number | null; length?: string } | null;
type Data = {
  swimlane: { lane: string; runs: number[][]; subagents: number }[];
  subagents_per_hour: number[][];
  commits_per_hour: number[][];
  commits_by_folder: [string, number][];
  recording: { id: string; start_min: number; seconds: number }[];
  derby: { start: number; end: number; kill: number; lanes: { lane: string; killed: boolean; back: number | null }[] };
  totals: { named_lanes: number; subagents: number; commits: number; recorded_seconds: number; recorded_sessions: number };
};

const J = raw as unknown as {
  comfy_video: ComfyVideo;
  arc: { type: "chart" | "beat" | "centre"; id: string }[];
  beats: Record<string, Beat>;
  centre: Record<string, Centre>;
  axis: { map_from_hour: number; map_to_hour: number };
  words: Record<string, string>;
  data: Data;
};
const D = J.data;

function w(key: string, vars?: Record<string, string | number>): string {
  let s = J.words[key] ?? `[words coming: ${key}]`;
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.split(`{${k}}`).join(String(v));
  return s;
}

const hm = (min: number) => `${String(Math.floor(min / 60) % 24).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;
const mmss = (s: number) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}`;

// All markers on the charts: one per numbered beat, in time order.
const MARKERS: { n: number; kind: "high" | "low"; minute: number; id: string }[] = [
  ...Object.entries(J.beats).map(([id, b]) => ({ n: b.n, kind: b.kind, minute: b.minute ?? toMin(b.prague), id })),
  ...Object.entries(J.centre).map(([id, c]) => ({ n: c.n, kind: c.kind, minute: c.minute, id })),
].sort((a, b) => a.n - b.n);

function toMin(t: string) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

// ------------------------------------------------------------------ markers

function triPoints(cx: number, cy: number, kind: "high" | "low", r = 6.5) {
  return kind === "high"
    ? `${cx},${cy - r} ${cx + r},${cy + r * 0.8} ${cx - r},${cy + r * 0.8}`
    : `${cx},${cy + r} ${cx + r},${cy - r * 0.8} ${cx - r},${cy - r * 0.8}`;
}

/** The numbered triangle used in the rails and the legend. */
function Tri({ kind, n, size = 28, label }: { kind: "high" | "low"; n?: number; size?: number; label?: string }) {
  return (
    <svg className={`hl-tri hl-tri-${kind}`} viewBox="0 0 28 28" width={size} height={size} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true} focusable="false">
      <polygon points={triPoints(14, 14, kind, 12)} />
      {n !== undefined && (
        <text x="14" y={kind === "high" ? 21 : 13.6} textAnchor="middle">
          {n}
        </text>
      )}
    </svg>
  );
}

/** A marker on a chart's top gutter, with a thin line down to the plot. */
function ChartMarker({ m, x, y, bottom }: { m: (typeof MARKERS)[number]; x: number; y: number; bottom: number }) {
  const centre = m.n === 5;
  return (
    <g className={`hl-mk hl-mk-${m.kind}${centre ? " hl-mk-centre" : ""}`}>
      <line x1={x} x2={x} y1={y + 8} y2={bottom} />
      <polygon points={triPoints(x, y, m.kind)} />
      <text x={x + 10} y={y + 4}>
        {m.n}
      </text>
      <title>{`${m.n}: ${hm(m.minute)}`}</title>
    </g>
  );
}

// ------------------------------------------------------------------ chart shells

function Chart({ id, children, table, vars, aspect }: { id: "map" | "commits" | "subagents" | "folders" | "recording"; children: React.ReactNode; table: React.ReactNode; vars: Record<string, string | number>; aspect?: string }) {
  return (
    <figure className="hl-chart" id={`hl-chart-${id}`} aria-labelledby={`hl-ct-${id}`} aria-describedby={`hl-cs-${id}`}>
      <h3 id={`hl-ct-${id}`}>{w(`highlights.${id}.title`)}</h3>
      <p id={`hl-cs-${id}`} className="sr-only">
        {w(`highlights.${id}.summary`, vars)}
      </p>
      <div className="hl-scroll" tabIndex={0} role="group" aria-label={w("highlights.scroll.hint")}>
        <div className={`hl-plot ${aspect ?? ""}`}>{children}</div>
      </div>
      <figcaption>{w(`highlights.${id}.caption`, vars)}</figcaption>
      <details className="hl-table">
        <summary>{w("highlights.table.toggle")}</summary>
        {table}
      </details>
    </figure>
  );
}

function niceMax(v: number) {
  const steps = [1, 2, 5, 10, 15, 20, 25, 30, 40, 50, 75, 100];
  const step = steps.find((s) => s * 4 >= v) ?? Math.ceil(v / 4);
  return { max: step * 4, step };
}

// ------------------------------------------------------------------ the day across the clock (one chart: lanes, kill, triangles)

const J_AXIS = { from: J.axis.map_from_hour, to: J.axis.map_to_hour };

function DayAcrossTheClock() {
  const back: Record<string, number> = {};
  for (const l of D.derby.lanes) if (l.killed && l.back !== null) back[l.lane] = l.back;
  const vars = { lanes: D.totals.named_lanes, subagents: D.totals.subagents, kill_time: "13:20:55" };
  return (
    <DayLanes
      lanes={D.swimlane}
      markers={MARKERS.map((m) => ({ n: m.n, kind: m.kind, minute: m.minute, href: m.id in J.centre ? `#hl-centre-${m.id}` : `#hl-beat-${m.id}` }))}
      k={{ start: D.derby.start, end: D.derby.end, kill: D.derby.kill, back }}
      axisFrom={J_AXIS.from}
      axisTo={J_AXIS.to}
      words={{
        title: w("highlights.map.title"),
        banner: w("highlights.map.caption", vars),
        summary: w("highlights.map.summary", vars),
        kill: w("derby.kill.label"),
        scroll: w("highlights.scroll.hint"),
        scrub: w("derby.scrub.label"),
        table: w("highlights.table.toggle"),
        high: w("highlights.legend.high"),
        low: w("highlights.legend.low"),
      }}
    />
  );
}

// ------------------------------------------------------------------ hourly bars

function HourBars({ id, rows, unit }: { id: "commits" | "subagents"; rows: number[][]; unit: string }) {
  const W = 880, left = 48, right = 16, top = 58, plotH = 170, bottom = top + plotH;
  const n = rows.length;
  const first = rows[0][0];
  const peak = rows.reduce((a, r) => (r[1] > a[1] ? r : a), rows[0]);
  const { max, step } = niceMax(peak[1]);
  const band = (W - left - right) / n;
  const bw = band * 0.62;
  const y = (v: number) => bottom - (v / max) * plotH;
  const total = rows.reduce((s, r) => s + r[1], 0);
  const mx = (min: number) => left + ((min / 60 - first) / n) * (W - left - right);
  const ticks = [0, 1, 2, 3, 4].map((i) => i * step);
  return (
    <Chart
      id={id}
      vars={id === "commits" ? { commits: total, peak_hour: `${peak[0]}:00`, peak: peak[1] } : { subagents: total, peak_hour: `${peak[0]}:00`, peak: peak[1] }}
      table={
        <table>
          <thead>
            <tr><th scope="col">Hour</th><th scope="col">{unit}</th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]}><th scope="row">{String(r[0]).padStart(2, "0")}:00</th><td>{r[1]}</td></tr>
            ))}
          </tbody>
        </table>
      }
    >
      <svg viewBox={`0 0 ${W} ${bottom + 44}`} role="img" aria-labelledby={`hl-ct-${id} hl-cs-${id}`} focusable="false">
        {ticks.map((t) => (
          <g key={t}>
            <line className="hl-grid" x1={left} x2={W - right} y1={y(t)} y2={y(t)} />
            <text className="hl-axis" x={left - 8} y={y(t) + 4} textAnchor="end">{t}</text>
          </g>
        ))}
        {rows.map((r, i) => {
          const bx = left + i * band + (band - bw) / 2;
          const h = (r[1] / max) * plotH;
          const rad = Math.min(4, h);
          return (
            <g key={r[0]}>
              {r[1] > 0 && (
                <path
                  className="hl-bar"
                  d={`M${bx},${bottom} V${bottom - h + rad} Q${bx},${bottom - h} ${bx + rad},${bottom - h} H${bx + bw - rad} Q${bx + bw},${bottom - h} ${bx + bw},${bottom - h + rad} V${bottom} Z`}
                >
                  <title>{`${String(r[0]).padStart(2, "0")}:00 - ${r[1]} ${unit.toLowerCase()}`}</title>
                </path>
              )}
              <text className="hl-axis" x={bx + bw / 2} y={bottom + 18} textAnchor="middle">{r[0]}</text>
              {r === peak && <text className="hl-val" x={bx + bw / 2} y={y(r[1]) - 6} textAnchor="middle">{r[1]}</text>}
            </g>
          );
        })}
        <text className="hl-axis hl-axis-title" x={left + (W - left - right) / 2} y={bottom + 38} textAnchor="middle">Hour</text>
        <text className="hl-axis hl-axis-title" x={12} y={top + plotH / 2} textAnchor="middle" transform={`rotate(-90 12 ${top + plotH / 2})`}>{unit}</text>
        {MARKERS.filter((m) => m.minute >= first * 60 && m.minute < (first + n) * 60).map((m) => (
          <ChartMarker key={m.n} m={m} x={mx(m.minute)} y={m.n % 2 ? 14 : 38} bottom={bottom} />
        ))}
      </svg>
    </Chart>
  );
}

// ------------------------------------------------------------------ folders (horizontal bars)

function Folders() {
  const rows = D.commits_by_folder;
  const W = 880, left = 150, right = 56, rowH = 28, top = 8;
  const H = top + rows.length * rowH + 30;
  const max = Math.max(...rows.map((r) => r[1]));
  const { max: axMax, step } = niceMax(max);
  const x = (v: number) => left + (v / axMax) * (W - left - right);
  const total = rows.reduce((s, r) => s + r[1], 0);
  const ticks = [0, 1, 2, 3, 4].map((i) => i * step);
  return (
    <Chart
      id="folders"
      vars={{ commits: total, top_folder: rows[0][0], top: rows[0][1] }}
      table={
        <table>
          <thead><tr><th scope="col">Folder</th><th scope="col">Commits</th></tr></thead>
          <tbody>{rows.map((r) => (<tr key={r[0]}><th scope="row">{r[0]}</th><td>{r[1]}</td></tr>))}</tbody>
        </table>
      }
    >
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="hl-ct-folders hl-cs-folders" focusable="false">
        {ticks.map((t) => (
          <g key={t}>
            <line className="hl-grid" x1={x(t)} x2={x(t)} y1={top} y2={top + rows.length * rowH} />
            <text className="hl-axis" x={x(t)} y={top + rows.length * rowH + 18} textAnchor="middle">{t}</text>
          </g>
        ))}
        {rows.map((r, i) => {
          const y = top + i * rowH;
          const bw = x(r[1]) - left;
          return (
            <g key={r[0]}>
              <text className="hl-lane" x={left - 10} y={y + 17} textAnchor="end">{r[0]}</text>
              <path className="hl-bar" d={`M${left},${y + 5} H${left + bw - 4} Q${left + bw},${y + 5} ${left + bw},${y + 9} V${y + 17} Q${left + bw},${y + 21} ${left + bw - 4},${y + 21} H${left} Z`}>
                <title>{`${r[0]}: ${r[1]} commits`}</title>
              </path>
              <text className="hl-val" x={left + bw + 8} y={y + 17}>{r[1]}</text>
            </g>
          );
        })}
      </svg>
    </Chart>
  );
}

// ------------------------------------------------------------------ recording

function Recording() {
  const rows = D.recording;
  const W = 880, left = 48, right = 16, top = 24, plotH = 170, bottom = top + plotH;
  const mins = rows.map((r) => Math.round(r.seconds / 60));
  const peakI = mins.indexOf(Math.max(...mins));
  const { max, step } = niceMax(Math.max(...mins));
  const band = (W - left - right) / rows.length;
  const bw = band * 0.62;
  const y = (v: number) => bottom - (v / max) * plotH;
  const ticks = [0, 1, 2, 3, 4].map((i) => i * step);
  const hours = (D.totals.recorded_seconds / 3600).toFixed(1);
  return (
    <Chart
      id="recording"
      vars={{ sessions: rows.length, hours, longest: rows[peakI].id, longest_min: mins[peakI] }}
      table={
        <table>
          <thead><tr><th scope="col">Session</th><th scope="col">Started</th><th scope="col">Minutes</th></tr></thead>
          <tbody>{rows.map((r, i) => (<tr key={r.id}><th scope="row">{r.id}</th><td>{hm(r.start_min)}</td><td>{mins[i]}</td></tr>))}</tbody>
        </table>
      }
    >
      <svg viewBox={`0 0 ${W} ${bottom + 44}`} role="img" aria-labelledby="hl-ct-recording hl-cs-recording" focusable="false">
        {ticks.map((t) => (
          <g key={t}>
            <line className="hl-grid" x1={left} x2={W - right} y1={y(t)} y2={y(t)} />
            <text className="hl-axis" x={left - 8} y={y(t) + 4} textAnchor="end">{t}</text>
          </g>
        ))}
        {rows.map((r, i) => {
          const bx = left + i * band + (band - bw) / 2;
          const h = (mins[i] / max) * plotH;
          const rad = Math.min(4, h);
          return (
            <g key={r.id}>
              <path
                className="hl-bar"
                d={`M${bx},${bottom} V${bottom - h + rad} Q${bx},${bottom - h} ${bx + rad},${bottom - h} H${bx + bw - rad} Q${bx + bw},${bottom - h} ${bx + bw},${bottom - h + rad} V${bottom} Z`}
              >
                <title>{`${r.id}, started ${hm(r.start_min)}: ${mins[i]} min`}</title>
              </path>
              <text className="hl-axis" x={bx + bw / 2} y={bottom + 18} textAnchor="middle">{r.id}</text>
              {i === peakI && <text className="hl-val" x={bx + bw / 2} y={y(mins[i]) - 6} textAnchor="middle">{mins[i]}</text>}
            </g>
          );
        })}
        <text className="hl-axis hl-axis-title" x={12} y={top + plotH / 2} textAnchor="middle" transform={`rotate(-90 12 ${top + plotH / 2})`}>Minutes</text>
        <text className="hl-axis hl-axis-title" x={left + (W - left - right) / 2} y={bottom + 38} textAnchor="middle">Session</text>
      </svg>
    </Chart>
  );
}

// ------------------------------------------------------------------ clips

function KindWord({ kind }: { kind: "high" | "low" }) {
  return <>{w(`highlights.legend.${kind}`)}</>;
}

function BeatBlock({ id }: { id: string }) {
  const b = J.beats[id];
  const label = w(`highlights.beat.${id}.label`);
  return (
    <article className={`hl-beat hl-${b.kind}`} id={`hl-beat-${id}`} aria-labelledby={`hl-bt-${id}`}>
      <div className="hl-rail">
        <Tri kind={b.kind} n={b.n} />
        <span className="hl-time">{b.prague.slice(0, 5)}</span>
      </div>
      <div className="hl-beat-body">
        <div className="hl-beat-text">
          <h3 id={`hl-bt-${id}`}>
            <span className="sr-only">
              {b.n}, <KindWord kind={b.kind} />:{" "}
            </span>
            {label}
          </h3>
          <p>{w(`highlights.beat.${id}.setup`)}</p>
          <blockquote>
            <p>&ldquo;{b.quote.text}&rdquo;</p>
            <footer>
              {b.session}, {b.quote.time}
            </footer>
          </blockquote>
        </div>
        <VideoFrame
          youtube={b.youtube}
          start={b.start || undefined}
          end={b.end ?? undefined}
          length={b.length}
          label={label}
          size="sm"
          meta={`${b.session}, ${b.prague}`}
          className="hl-vid"
        />
      </div>
    </article>
  );
}

function Centrepiece({ id }: { id: string }) {
  const c = J.centre[id];
  const dur = c.end! - c.start;
  const title = w(`highlights.centre.${id}.title`);
  const pct = (s: number) => `${(((s - c.start) / dur) * 100).toFixed(2)}%`;
  return (
    <article className="hl-centre" id={`hl-centre-${id}`} aria-labelledby={`hl-bt-${id}`}>
      <div className="hl-centre-head">
        <Tri kind="low" n={c.n} size={44} />
        <p className="hl-big" aria-hidden="true">13:20</p>
        <h3 id={`hl-bt-${id}`}>
          <span className="sr-only">
            {c.n}, <KindWord kind="low" />:{" "}
          </span>
          {title}
        </h3>
      </div>
      <p className="hl-centre-setup">{w(`highlights.centre.${id}.setup`)}</p>
      <VideoFrame
        youtube={c.youtube}
        start={c.start}
        end={c.end ?? undefined}
        length={c.length}
        label={title}
        size="hero"
        caption={w(`highlights.centre.${id}.caption`)}
        meta={(c as { meta?: string }).meta ?? `${c.session}, ${c.prague.slice(0, 5)}`}
        className="hl-vid hl-vid-centre"
      />
      <div className="hl-scrub" role="group" aria-label={w(`highlights.centre.${id}.scrub`)}>
        <div className="hl-scrub-bar" aria-hidden="true">
          {c.segments.map((s) => (
            <span key={s.key} className={`hl-seg hl-seg-${s.key}`} style={{ flex: s.to - s.from }} />
          ))}
          {c.marks.map((m) => (
            <i key={m.key} className="hl-tick" style={{ left: pct(m.at) }} />
          ))}
        </div>
        <ol className="hl-seg-list">
          {c.segments.map((s) => (
            <li key={s.key} className={`hl-seg-${s.key}`}>
              <span className="hl-seg-t">{mmss(s.from - c.start)}</span>
              <span>{w(`highlights.centre.${id}.seg.${s.key}`)}</span>
            </li>
          ))}
        </ol>
        <ul className="hl-mark-list">
          {c.marks.map((m) => (
            <li key={m.key}>
              <span className="hl-seg-t">{m.prague}</span>
              <span>{w(`highlights.centre.${id}.mark.${m.key}`)}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="hl-quotes">
        {c.quotes.map((q) => (
          <blockquote key={q.text}>
            <p>&ldquo;{q.text}&rdquo;</p>
            <footer>
              {c.session}, {q.time}
            </footer>
          </blockquote>
        ))}
      </div>
      <p className="hl-after">{w(`highlights.centre.${id}.after`)}</p>
    </article>
  );
}

// ------------------------------------------------------------------ section

export function Highlights() {
  const comfy = J.comfy_video;
  return (
    <section id="highlights" className="hl" aria-labelledby="hl-title">
      <header className="hl-head">
        <h2 id="hl-title">{w("highlights.heading")}</h2>
        <p className="hl-intro">{w("highlights.intro")}</p>
        <ul className="hl-legend">
          <li><Tri kind="high" size={22} /> <span>{w("highlights.legend.high")}</span></li>
          <li><Tri kind="low" size={22} /> <span>{w("highlights.legend.low")}</span></li>
          <li className="hl-legend-hint">{w("highlights.legend.hint")}</li>
        </ul>
      </header>

      {comfy && (
        <div className="hl-comfy">
          <VideoFrame
            youtube={comfy.youtube}
            start={comfy.start || undefined}
            end={comfy.end ?? undefined}
            length={comfy.length}
            label={w("highlights.comfy.label")}
            size="hero"
            mode="inline"
          />
        </div>
      )}

      <div className="hl-arc">
        {J.arc.map((item) => {
          const key = `${item.type}-${item.id}`;
          if (item.type === "beat") return <BeatBlock key={key} id={item.id} />;
          if (item.type === "centre") return <Centrepiece key={key} id={item.id} />;
          switch (item.id) {
            case "map": return <DayAcrossTheClock key={key} />;
            case "commits": return <HourBars key={key} id="commits" rows={D.commits_per_hour} unit="Commits" />;
            case "subagents": return <HourBars key={key} id="subagents" rows={D.subagents_per_hour} unit="Subagents" />;
            case "folders": return <Folders key={key} />;
            case "recording": return <Recording key={key} />;
            default: return null;
          }
        })}
      </div>
    </section>
  );
}
