import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import type { CSSProperties, ReactNode } from "react";
import { Reveal } from "./motion";

// Addvery's organisation in charts, for the /d2 demo page ("Company and stakeholder research").
//
// The data is local/org-diagrams.json: counts and roles only, no names. The file is git-ignored, so the
// public repo doesn't have it; when it's missing, readOrgData() returns null and nothing renders. It's
// read with node fs on the server, at build time (the demo pages are static).
//
// Groups smaller than 3 come as the string "2 or fewer". They're never turned into a number: their bars
// are hatched and drawn at the most they could be (2), and their labels say "2 or fewer". Totals are the
// file's own figures. `site_copy_note` is an internal note and is never rendered.
//
// Plain HTML and CSS bars, no chart library. Styles are the `.org-` rules in article.css. Every chart's
// marks are aria-hidden, with a visually hidden table carrying the same numbers.

type Qty = number | string;

type OrgData = {
  as_of?: string;
  source?: string;
  headcount?: { linkedin?: Qty; website_claims?: string; group_per_press?: string; note?: string };
  offices?: { office: string; count: Qty }[];
  org?: { function: string; count: Qty; levels?: { level: string; count: Qty }[] }[];
  linkedin_active?: {
    window_days?: number;
    active?: Qty;
    of?: Qty;
    active_180_days?: Qty;
    by_function?: { function: string; active: Qty; of: Qty }[];
    finding?: string;
  };
  outreach?: {
    sales_bd_revops_titles?: Qty;
    posted_a_client_call_to_action_180d?: Qty;
    rated_likely_doing_outreach_by_jev?: Qty;
    post_kinds_180d?: { kind: string; count: Qty }[];
    finding?: string;
  };
  marketing?: {
    capabilities?: string[];
    ai_official_titles?: Qty;
    ai_engineers?: Qty;
    ai_in_group?: string;
    marketing_engineer_hybrids?: Qty;
    hybrids_note?: string;
  };
  vendors_naming_addvery?: (string | { name?: string })[];
  vendors_note?: string;
  notes?: string[];
  growth_plan?: {
    revenue_today_czk?: string;
    revenue_goal_czk?: string;
    multiple?: string;
    how?: string;
    source?: string;
  };
  // `based_on` is in the file too; it's never rendered.
  week_one?: { title?: string; intro?: string; items?: string[] };
};

const DATA_FILE = path.join(process.cwd(), "local/org-diagrams.json");

/** The org data, or null when the file isn't there (the public repo) or can't be read. */
export function readOrgData(): OrgData | null {
  if (!existsSync(DATA_FILE)) return null;
  try {
    return JSON.parse(readFileSync(DATA_FILE, "utf8")) as OrgData;
  } catch {
    return null;
  }
}

// ---------- Counts ----------

const isExact = (q: Qty | undefined): q is number => typeof q === "number";

/** The length a count is drawn at: the number itself, or the upper bound of "2 or fewer". */
function units(q: Qty | undefined): number {
  if (typeof q === "number") return q;
  const m = /\d+/.exec(q ?? "");
  return m ? Number(m[0]) : 2;
}

function fmt(q: Qty | undefined): string {
  if (q === undefined) return "";
  return typeof q === "number" ? q.toLocaleString("en-US") : q;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-11-02T16:25" -> "2 Nov 2026, 16:25", without a time-zone shift. */
function fmtAsOf(s: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?/.exec(s);
  if (!m) return s;
  return `${Number(m[3])} ${MONTHS[Number(m[2]) - 1]} ${m[1]}${m[4] ? `, ${m[4]}:${m[5]}` : ""}`;
}

/** Seniority steps, darkest (most senior) first. CSS variables in article.css. */
const level = (i: number) => `var(--org-l${Math.min(i, 3)})`;

const vars = (v: Record<string, string | number>) => v as CSSProperties;

// ---------- Shared pieces ----------

function Block({ id, eyebrow, title, dek, dark, children }: {
  id: string;
  eyebrow: string;
  title: string;
  dek?: ReactNode;
  dark?: boolean;
  children: ReactNode;
}) {
  return (
    <Reveal className="org-block">
      <section className={dark ? "org-section is-dark" : "org-section"} aria-labelledby={id}>
        <p className="org-eyebrow">{eyebrow}</p>
        <h3 id={id} className="org-h">
          {title}
        </h3>
        {dek && <p className="org-dek">{dek}</p>}
        {children}
      </section>
    </Reveal>
  );
}

/** The hatched swatch that marks a "2 or fewer" group. */
function Hatch({ color }: { color?: string }) {
  return <i className="org-swatch is-approx" style={color ? vars({ "--c": color }) : undefined} aria-hidden="true" />;
}

function ApproxKey({ what = "people" }: { what?: string }) {
  return (
    <p className="org-key-line">
      <Hatch /> Hatched: a group of 2 or fewer {what}, drawn at 2.
    </p>
  );
}

/** A number tile. "2 or fewer" values get the hatched mark and a smaller setting. */
function Tile({ value, label, note, tag }: { value: Qty | undefined; label: string; note?: ReactNode; tag?: string }) {
  if (value === undefined) return null;
  return (
    <li className="org-tile">
      <span className={isExact(value) ? "org-tile-num" : "org-tile-num is-approx"}>
        {!isExact(value) && <Hatch />}
        {fmt(value)}
      </span>
      <span className="org-tile-label">
        {label}
        {tag && <span className="org-tag">{tag}</span>}
      </span>
      {note && <span className="org-tile-note">{note}</span>}
    </li>
  );
}

// ---------- 0. Why now: the growth plan ----------

/** "about 200 million" -> { pre: "about", num: "200", rest: "million" }. */
function splitAmount(s: string) {
  const m = /^\s*(about|around|roughly|c\.|~)?\s*(\d[\d.,]*)\s*(.*)$/i.exec(s);
  return m ? { pre: m[1], num: m[2], rest: m[3] } : null;
}

function Amount({ value, label }: { value: string; label: string }) {
  const a = splitAmount(value);
  return (
    <div className="org-amount">
      <p className="org-amount-fig">
        {a ? (
          <>
            {a.pre && <span className="org-amount-pre">{a.pre} </span>}
            <span className="org-amount-num">{a.num}</span>
            <span className="org-amount-unit">
              {a.rest ? ` ${a.rest} ` : " "}CZK
            </span>
          </>
        ) : (
          <span className="org-amount-unit">{value} CZK</span>
        )}
      </p>
      <p className="org-amount-label">{label}</p>
    </div>
  );
}

function GrowthPlan({ d }: { d: OrgData }) {
  const g = d.growth_plan;
  if (!g || (!g.revenue_today_czk && !g.revenue_goal_czk && !g.how)) return null;
  // A paraphrase of public posts, so no quotation marks and no name.
  return (
    <Block
      id="org-why-now"
      eyebrow="Why now"
      title="Addvery's growth plan"
      dark
    >
      {(g.revenue_today_czk || g.revenue_goal_czk) && (
        <div className="org-growth">
          {g.revenue_today_czk && <Amount value={g.revenue_today_czk} label="revenue today" />}
          {g.revenue_today_czk && g.revenue_goal_czk && (
            <div className="org-growth-link">
              <span className="org-growth-line" aria-hidden="true" />
              {g.multiple && <span className="org-growth-x">{g.multiple}</span>}
              <span className="org-growth-line is-arrow" aria-hidden="true" />
            </div>
          )}
          {g.revenue_goal_czk && <Amount value={g.revenue_goal_czk} label="the goal" />}
        </div>
      )}
      {g.how && <p className="org-growth-how">{g.how}</p>}
      {g.source && <p className="org-growth-src">Source: {g.source}.</p>}
    </Block>
  );
}

// ---------- 1. Headline tiles ----------

/** "about 70 (MediaGuru, 14 Oct 2026, across the Addvery group)" -> prefix, number, source. */
function splitPress(s: string) {
  const m = /^\s*(about|around|roughly|c\.|~)?\s*(\d[\d,.]*\+?)\s*(?:\((.*)\))?\s*$/i.exec(s);
  return m ? { pre: m[1], num: m[2], src: m[3] } : null;
}

/** "50+" with Addvery's gradient plus. */
function PlusNum({ value }: { value: string }) {
  const m = /^(.*?)(\+)$/.exec(value);
  if (!m) return <>{value}</>;
  return (
    <>
      {m[1]}
      <span className="org-plus">+</span>
    </>
  );
}

function Headline({ d }: { d: OrgData }) {
  const h = d.headcount;
  const sales = d.outreach?.sales_bd_revops_titles;
  if (!h && sales === undefined) return null;
  const press = h?.group_per_press ? splitPress(h.group_per_press) : null;
  return (
    <Block id="org-headcount" eyebrow="Headcount" title="How big Addvery is">
      <ul className="org-tiles is-hero">
        {h?.linkedin !== undefined && (
          <li className="org-tile">
            <span className="org-tile-num">{fmt(h.linkedin)}</span>
            <span className="org-tile-label">staff on LinkedIn</span>
            {h.note && <span className="org-tile-note">{h.note}</span>}
          </li>
        )}
        {h?.website_claims && (
          <li className="org-tile">
            <span className="org-tile-num">
              <PlusNum value={h.website_claims} />
            </span>
            <span className="org-tile-label">on Addvery&rsquo;s own website</span>
          </li>
        )}
        {h?.group_per_press && (
          <li className="org-tile">
            {press ? (
              <>
                <span className="org-tile-num">
                  {press.pre && <span className="org-tile-pre">{press.pre} </span>}
                  <PlusNum value={press.num} />
                </span>
                <span className="org-tile-label">across the group, per press</span>
                {press.src && <span className="org-tile-note">{press.src}</span>}
              </>
            ) : (
              <span className="org-tile-label">{h.group_per_press}</span>
            )}
          </li>
        )}
      </ul>
      {sales !== undefined && (
        <p className="org-zero">
          <span className={isExact(sales) ? "org-zero-num" : "org-zero-num is-approx"}>{fmt(sales)}</span>
          <span className="org-zero-label">people with a sales, BD or RevOps title</span>
        </p>
      )}
    </Block>
  );
}

// ---------- 2. Offices ----------

function Offices({ d }: { d: OrgData }) {
  const offices = (d.offices ?? []).filter((o) => o && o.office);
  if (offices.length === 0) return null;
  const allExact = offices.every((o) => isExact(o.count));
  const total = allExact ? offices.reduce((s, o) => s + (o.count as number), 0) : undefined;
  // Three steps of the seniority ramp, far enough apart in lightness to read under any colour vision.
  const colours = ["var(--org-l0)", "var(--org-l1)", "var(--org-l3)", "var(--org-l2)"];
  const ink = (i: number) => (i % 4 === 2 ? " is-light" : "");
  return (
    <Block
      id="org-offices"
      eyebrow="Offices"
      title="Where they're based"
      dek={total !== undefined ? `Staff on LinkedIn by office, ${total} in all.` : "Staff on LinkedIn by office."}
    >
      <div className="org-figure" aria-hidden="true">
        <div className="org-strip org-grow">
          {offices.map((o, i) => (
            <span
              key={o.office}
              className={`org-strip-part${isExact(o.count) ? "" : " is-approx"}${ink(i)}`}
              style={vars({ "--u": units(o.count), "--c": colours[i % 4] })}
              title={`${o.office}: ${fmt(o.count)}`}
            >
              <span className="org-strip-num">{fmt(o.count)}</span>
            </span>
          ))}
        </div>
        <ul className="org-legend">
          {offices.map((o, i) => (
            <li key={o.office}>
              <i
                className={`org-swatch${isExact(o.count) ? "" : " is-approx"}`}
                style={vars({ "--c": colours[i % 4] })}
              />
              {o.office}
            </li>
          ))}
        </ul>
        {!allExact && <ApproxKey />}
      </div>
      <table className="org-sr">
        <caption>Staff on LinkedIn by office</caption>
        <thead>
          <tr>
            <th scope="col">Office</th>
            <th scope="col">People</th>
          </tr>
        </thead>
        <tbody>
          {offices.map((o) => (
            <tr key={o.office}>
              <th scope="row">{o.office}</th>
              <td>{fmt(o.count)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Block>
  );
}

// ---------- 3. Function by seniority ----------

function OrgChart({ d }: { d: OrgData }) {
  const rows = (d.org ?? []).filter((r) => r && r.function);
  if (rows.length === 0) return null;
  // A row's drawn length: its levels (approximate ones at 2), or its own count when it has no levels.
  const rowUnits = (r: (typeof rows)[number]) =>
    r.levels && r.levels.length > 0 ? r.levels.reduce((s, l) => s + units(l.count), 0) : units(r.count);
  const max = Math.max(1, ...rows.map(rowUnits));
  const anyApprox = rows.some((r) => !isExact(r.count) || (r.levels ?? []).some((l) => !isExact(l.count)));
  return (
    <Block
      id="org-functions"
      eyebrow="Organisation"
      title="Functions and seniority"
      dek="Everyone on LinkedIn by what they do, split by level."
    >
      <div className="org-figure" aria-hidden="true">
        <div className="org-keys-top">
          <p className="org-key-line">
            <span className="org-ramp">
              {[0, 1, 2, 3].map((i) => (
                <i key={i} className="org-swatch" style={vars({ "--c": level(i) })} />
              ))}
            </span>
            Darker is more senior, within each function.
          </p>
          {anyApprox && <ApproxKey />}
        </div>
        <ol className="org-rows">
          {rows.map((r, ri) => {
            const levels = r.levels ?? [];
            return (
              <li key={r.function} className="org-row" style={vars({ "--i": ri })}>
                <div className="org-row-head">
                  <span className="org-row-name">{r.function}</span>
                  <span className={isExact(r.count) ? "org-row-val" : "org-row-val is-approx"}>{fmt(r.count)}</span>
                </div>
                <div className="org-lane">
                  <span className="org-bar org-grow" style={vars({ "--w": rowUnits(r) / max })}>
                    {levels.length > 0 ? (
                      levels.map((l, i) => (
                        <span
                          key={l.level}
                          className={isExact(l.count) ? "org-seg" : "org-seg is-approx"}
                          style={vars({ "--u": units(l.count), "--c": level(i) })}
                          title={`${r.function}, ${l.level}: ${fmt(l.count)}`}
                        />
                      ))
                    ) : (
                      <span
                        className={isExact(r.count) ? "org-seg" : "org-seg is-approx"}
                        style={vars({ "--u": units(r.count), "--c": "var(--org-ink)" })}
                        title={`${r.function}: ${fmt(r.count)}`}
                      />
                    )}
                  </span>
                </div>
                {levels.length > 0 && (
                  <ul className="org-legend is-row">
                    {levels.map((l, i) => (
                      <li key={l.level}>
                        <i
                          className={isExact(l.count) ? "org-swatch" : "org-swatch is-approx"}
                          style={vars({ "--c": level(i) })}
                        />
                        {l.level} <b className={isExact(l.count) ? undefined : "is-approx"}>{fmt(l.count)}</b>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ol>
      </div>
      <table className="org-sr">
        <caption>People by function and level</caption>
        <thead>
          <tr>
            <th scope="col">Function</th>
            <th scope="col">Level</th>
            <th scope="col">People</th>
          </tr>
        </thead>
        <tbody>
          {rows.flatMap((r) => [
            <tr key={r.function}>
              <th scope="row">{r.function}</th>
              <td>All</td>
              <td>{fmt(r.count)}</td>
            </tr>,
            ...(r.levels ?? []).map((l) => (
              <tr key={`${r.function}-${l.level}`}>
                <th scope="row">{r.function}</th>
                <td>{l.level}</td>
                <td>{fmt(l.count)}</td>
              </tr>
            )),
          ])}
        </tbody>
      </table>
    </Block>
  );
}

// ---------- 4. LinkedIn activity ----------

function Activity({ d }: { d: OrgData }) {
  const a = d.linkedin_active;
  const rows = (a?.by_function ?? []).filter((r) => r && r.function);
  if (!a || rows.length === 0) return null;
  const days = a.window_days ?? 90;
  const max = Math.max(1, ...rows.map((r) => units(r.of)));
  // The one row the story is about: the highest exact share.
  let lead = -1;
  let best = -1;
  rows.forEach((r, i) => {
    if (isExact(r.active) && isExact(r.of) && r.of > 0 && r.active / r.of > best) {
      best = r.active / r.of;
      lead = i;
    }
  });
  const anyApprox = rows.some((r) => !isExact(r.active) || !isExact(r.of));
  return (
    <Block
      id="org-linkedin"
      eyebrow="LinkedIn"
      title="Who posts"
      dek={`People who posted on LinkedIn in the last ${days} days, out of everyone in their function.`}
    >
      {a.active !== undefined && a.of !== undefined && (
        <p className="org-summary">
          <span className="org-summary-num">{fmt(a.active)}</span>
          <span className="org-summary-text">
            of {fmt(a.of)} posted in the last {days} days
            {a.active_180_days !== undefined && <>, {fmt(a.active_180_days)} in the last 180</>}
          </span>
        </p>
      )}
      <div className="org-figure" aria-hidden="true">
        <div className="org-keys-top">
          <p className="org-key-line">
            <i className="org-swatch is-track" /> Everyone in the function
            <i className="org-swatch is-fill" /> Posted
          </p>
          {anyApprox && <ApproxKey />}
        </div>
        <ol className="org-rows">
          {rows.map((r, i) => {
            const of = units(r.of);
            const active = Math.min(units(r.active), of);
            return (
              <li key={r.function} className="org-row" style={vars({ "--i": i })}>
                <div className="org-row-head">
                  <span className="org-row-name">{r.function}</span>
                  <span className="org-row-val">
                    {fmt(r.active)} <span className="org-row-of">of {fmt(r.of)}</span>
                  </span>
                </div>
                <div className="org-lane">
                  <span
                    className={isExact(r.of) ? "org-track" : "org-track is-approx"}
                    style={vars({ "--w": of / max })}
                    title={`${r.function}: ${fmt(r.active)} of ${fmt(r.of)} posted`}
                  >
                    {active > 0 && (
                      <span
                        className={`org-fill org-grow${isExact(r.active) ? "" : " is-approx"}${i === lead ? " is-lead" : ""}`}
                        style={vars({ "--f": active / of })}
                      />
                    )}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
      <table className="org-sr">
        <caption>People who posted on LinkedIn in the last {days} days, by function</caption>
        <thead>
          <tr>
            <th scope="col">Function</th>
            <th scope="col">Posted</th>
            <th scope="col">People in the function</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.function}>
              <th scope="row">{r.function}</th>
              <td>{fmt(r.active)}</td>
              <td>{fmt(r.of)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {a.finding && <p className="org-finding">{a.finding}</p>}
    </Block>
  );
}

// ---------- 5. Outreach ----------

function Outreach({ d }: { d: OrgData }) {
  const o = d.outreach;
  if (!o) return null;
  const kinds = (o.post_kinds_180d ?? []).filter((k) => k && k.kind);
  // Largest first, with the catch-all last.
  const sorted = kinds
    .map((k, i) => ({ ...k, i }))
    .sort((x, y) => {
      const ox = /other/i.test(x.kind) ? 1 : 0;
      const oy = /other/i.test(y.kind) ? 1 : 0;
      return ox - oy || units(y.count) - units(x.count) || x.i - y.i;
    });
  const max = Math.max(1, ...sorted.map((k) => units(k.count)));
  const total = kinds.length > 0 && kinds.every((k) => isExact(k.count))
    ? kinds.reduce((s, k) => s + (k.count as number), 0)
    : undefined;
  const isLead = (kind: string) => /get in touch|call to action/i.test(kind);
  return (
    <Block id="org-outreach" eyebrow="Outreach" title="How new business comes in">
      <ul className="org-tiles">
        <Tile value={o.sales_bd_revops_titles} label="people with a sales, BD or RevOps title" />
        <Tile
          value={o.posted_a_client_call_to_action_180d}
          label="people posted a call to action for clients in the last 180 days"
        />
        <Tile
          value={o.rated_likely_doing_outreach_by_jev}
          label="people rated likely to be doing outreach"
          tag="AI rating"
          note="Jev's read of each profile and its posts. A signal, not a fact."
        />
      </ul>

      {sorted.length > 0 && (
        <>
          <h4 className="org-sub">
            What they post about{total !== undefined ? `: ${total} original posts in the last 180 days` : ", last 180 days"}
          </h4>
          <div className="org-figure" aria-hidden="true">
            <ol className="org-rows is-tight">
              {sorted.map((k, i) => (
                <li key={k.kind} className="org-row" style={vars({ "--i": i })}>
                  <div className="org-row-head">
                    <span className="org-row-name">{k.kind}</span>
                    <span className={isExact(k.count) ? "org-row-val" : "org-row-val is-approx"}>{fmt(k.count)}</span>
                  </div>
                  <div className="org-lane">
                    <span
                      className={`org-hbar org-grow${isExact(k.count) ? "" : " is-approx"}${isLead(k.kind) ? " is-lead" : ""}`}
                      style={vars({ "--w": units(k.count) / max })}
                      title={`${k.kind}: ${fmt(k.count)}`}
                    />
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <table className="org-sr">
            <caption>Original LinkedIn posts in the last 180 days, by kind</caption>
            <thead>
              <tr>
                <th scope="col">Kind of post</th>
                <th scope="col">Posts</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((k) => (
                <tr key={k.kind}>
                  <th scope="row">{k.kind}</th>
                  <td>{fmt(k.count)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {o.finding && (
        <figure className="org-quote">
          <blockquote>
            <p>{o.finding}</p>
          </blockquote>
        </figure>
      )}
    </Block>
  );
}

// ---------- 6. Marketing and AI ----------

function Marketing({ d }: { d: OrgData }) {
  const m = d.marketing;
  if (!m) return null;
  const caps = (m.capabilities ?? []).filter(Boolean);
  return (
    <Block id="org-marketing" eyebrow="Marketing and AI" title="What's already in place">
      <div className="org-split">
        {caps.length > 0 && (
          <div>
            <h4 className="org-sub">Marketing capabilities</h4>
            <ul className="org-list">
              {caps.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <h4 className="org-sub">AI and technical people</h4>
          <ul className="org-tiles is-stack">
            <Tile value={m.ai_official_titles} label="with AI in their official job title" />
            <Tile value={m.ai_engineers} label="AI engineers" note={m.ai_in_group} />
            <Tile value={m.marketing_engineer_hybrids} label="marketing-engineer hybrids" note={m.hybrids_note} />
          </ul>
        </div>
      </div>
    </Block>
  );
}

// ---------- 6b. Week one ----------

function WeekOne({ d }: { d: OrgData }) {
  const w = d.week_one;
  const items = (w?.items ?? []).filter(Boolean);
  if (!w || (!w.title && items.length === 0)) return null;
  return (
    <Block id="org-week-one" eyebrow="Week one" title={w.title ?? "What Alex would set up first"} dek={w.intro}>
      {items.length > 0 && (
        <ul className="org-checks">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </Block>
  );
}

// ---------- 7. Vendors ----------

function Vendors({ d }: { d: OrgData }) {
  const list = Array.isArray(d.vendors_naming_addvery) ? d.vendors_naming_addvery : undefined;
  if (!list && !d.vendors_note) return null;
  const names = (list ?? [])
    .map((v) => (typeof v === "string" ? v : v?.name ?? ""))
    .filter(Boolean);
  return (
    <Block id="org-vendors" eyebrow="Vendors" title="Who names them as a client">
      <div className="org-vendors">
        {list && <span className="org-vendors-num">{names.length}</span>}
        <div>
          {d.vendors_note && <p className="org-vendors-note">{d.vendors_note}</p>}
          {names.length > 0 && (
            <ul className="org-list">
              {names.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Block>
  );
}

// ---------- 8. Footnote ----------

function Footnote({ d }: { d: OrgData }) {
  const notes = (d.notes ?? []).filter(Boolean);
  if (!d.source && notes.length === 0 && !d.as_of) return null;
  return (
    <footer className="org-foot">
      {d.source && (
        <p>
          <b>Source.</b> {d.source}
        </p>
      )}
      {notes.length > 0 && (
        <ul>
          {notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      )}
      {d.as_of && (
        <p>
          <b>As of</b> {fmtAsOf(d.as_of)}
        </p>
      )}
    </footer>
  );
}

/** The org charts, or nothing when the data file is missing. */
export function OrgCharts({ data }: { data?: OrgData | null }) {
  const d = data === undefined ? readOrgData() : data;
  if (!d) return null;
  return (
    <div className="org">
      <GrowthPlan d={d} />
      <Headline d={d} />
      <Offices d={d} />
      <OrgChart d={d} />
      <Activity d={d} />
      <Outreach d={d} />
      <Marketing d={d} />
      <WeekOne d={d} />
      <Vendors d={d} />
      <Footnote d={d} />
    </div>
  );
}
