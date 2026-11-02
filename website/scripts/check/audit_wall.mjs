// Headless Chrome (own throwaway profile) over the DevTools protocol: an accessibility and phone-width
// check of the full LinkedIn wall on /about. Usage: node audit.mjs <url> <outdir>
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const [url, out] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const profile = join(out, "profile");
const PORT = 9333;
const chrome = spawn(
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  ["--headless=new", `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, "--no-first-run",
   "--no-default-browser-check", "--disable-extensions", "--hide-scrollbars", "--mute-audio", "about:blank"],
  { stdio: "ignore" },
);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let ws, seq = 0;
const pending = new Map();
async function connect() {
  for (let i = 0; i < 50; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
      const page = list.find((t) => t.type === "page");
      if (page) {
        ws = new WebSocket(page.webSocketDebuggerUrl);
        await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
        ws.onmessage = (m) => {
          const d = JSON.parse(m.data);
          if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); }
        };
        return;
      }
    } catch {}
    await sleep(200);
  }
  throw new Error("no Chrome target");
}
function send(method, params = {}) {
  const id = ++seq;
  ws.send(JSON.stringify({ id, method, params }));
  return new Promise((r) => pending.set(id, r));
}
async function evaluate(expr) {
  const r = await send("Runtime.evaluate", { expression: expr, awaitPromise: true, returnByValue: true });
  if (r.result?.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails).slice(0, 500));
  return r.result?.result?.value;
}
async function key(k, code, keyCode, shift = false) {
  const mods = shift ? 8 : 0;
  const text = k === "Enter" ? String.fromCharCode(13) : k === " " ? " " : undefined;
  await send("Input.dispatchKeyEvent", { type: "keyDown", key: k, code, windowsVirtualKeyCode: keyCode, modifiers: mods, ...(text ? { text } : {}) });
  await send("Input.dispatchKeyEvent", { type: "keyUp", key: k, code, windowsVirtualKeyCode: keyCode, modifiers: mods });
}
async function shot(name, full = false) {
  const r = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: full });
  writeFileSync(join(out, name), Buffer.from(r.result.data, "base64"));
}

// Runs in the page: contrast, alt text, targets, overflow, structure.
const AUDIT = String.raw`(() => {
  const parse = (c) => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[ ,\/]+/).filter(Boolean).map(Number); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; };
  const lum = ({ r, g, b }) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
  const blend = (top, bottom) => ({ r: top.r * top.a + bottom.r * (1 - top.a), g: top.g * top.a + bottom.g * (1 - top.a), b: top.b * top.a + bottom.b * (1 - top.a), a: 1 });
  const bgOf = (el) => { const layers = []; for (let e = el; e; e = e.parentElement) { const c = parse(getComputedStyle(e).backgroundColor); if (c && c.a > 0) { layers.push(c); if (c.a >= 1) break; } } let base = { r: 255, g: 255, b: 255, a: 1 }; for (const l of layers.reverse()) base = blend(l, base); return base; };
  const hex = (c) => '#' + [c.r, c.g, c.b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
  const wall = document.querySelector('.about-wall');
  const sels = ['.about-wall .about-h2', '.about-wall-dek', '.about-wall-follow a', '.wf-card .wall-text', '.wf-card-short .wall-text', '.wf-foot .wall-date', '.wf-foot .wall-counts', '.wf-card .wall-out', '.wf-card .wall-more', '.wf-link-title', '.wf-link-site', '.wf-poll-label', '.wf-poll-q', '.wf-poll-options li', '.wf-quote-label', '.wf-quote .wall-text', '.wf-badge', '.wf-video-note'];
  const contrast = [];
  for (const s of sels) {
    const el = document.querySelector(s); if (!el) { contrast.push({ s, missing: true }); continue; }
    const cs = getComputedStyle(el); const fg = parse(cs.color); let bg = bgOf(el);
    // Badges sit on images: their own translucent black over the worst case, a white image.
    const fgb = fg.a < 1 ? blend(fg, bg) : fg;
    const size = parseFloat(cs.fontSize), weight = Number(cs.fontWeight);
    const large = size >= 24 || (size >= 18.66 && weight >= 700);
    const r = ratio(fgb, bg);
    contrast.push({ s, fg: hex(fgb), bg: hex(bg), ratio: Math.round(r * 100) / 100, need: large ? 3 : 4.5, pass: r >= (large ? 3 : 4.5), px: size });
  }
  const grid = document.querySelector('.wf-grid');
  const imgs = [...document.querySelectorAll('.wf-grid img')];
  const noAlt = imgs.filter((i) => !i.hasAttribute('alt')).map((i) => i.src.split('/').pop());
  const emptyAltContexts = imgs.filter((i) => i.getAttribute('alt') === '').map((i) => i.closest('.wf-link') ? 'link-card' : i.closest('.wf-video') ? 'video' : 'OTHER:' + i.src.split('/').pop());
  const controls = [...document.querySelectorAll('.wf-grid a, .wf-grid button')];
  const small = {};
  for (const c of controls) { const r = c.getBoundingClientRect(); if (r.width === 0) continue; const after = getComputedStyle(c, '::after'); const expanded = after.content !== 'none' && after.position === 'absolute'; const k = c.className || c.tagName; if ((r.height < 24 || r.width < 24) && !expanded) { small[k] = small[k] || { n: 0, h: Math.round(r.height), w: Math.round(r.width) }; small[k].n++; } }
  const names = controls.filter((c) => !(c.getAttribute('aria-label') || c.textContent.trim())).length;
  const ids = [...document.querySelectorAll('[id]')].map((e) => e.id); const dupIds = ids.filter((v, i) => ids.indexOf(v) !== i);
  const opensWithoutButton = [...document.querySelectorAll('.wf-media-opens')].filter((f) => !f.closest('.wf-card').querySelector('button.wall-more')).length;
  const cards = document.querySelectorAll('.wf-card');
  return {
    viewport: innerWidth + 'x' + innerHeight,
    hScroll: document.documentElement.scrollWidth > innerWidth + 1, scrollWidth: document.documentElement.scrollWidth,
    cards: cards.length, columns: getComputedStyle(grid).gridTemplateColumns.split(' ').filter(Boolean).length, masonry: grid.hasAttribute('data-masonry'),
    cardWidth: Math.round(cards[0].getBoundingClientRect().width),
    widestCard: Math.round(Math.max(...[...cards].map((c) => c.getBoundingClientRect().right))),
    imgs: imgs.length, noAlt, emptyAlt: emptyAltContexts.reduce((m, k) => (m[k] = (m[k] || 0) + 1, m), {}),
    unnamedControls: names, smallTargets: small, dupIds: [...new Set(dupIds)], opensWithoutButton,
    articlesLabelled: [...cards].every((c) => c.getAttribute('aria-label')),
    contrast,
  };
})()`;

const describeActive = String.raw`(() => { const a = document.activeElement; if (!a || a === document.body) return 'body'; const cs = getComputedStyle(a); const card = a.closest('.wf-card'); return { tag: a.tagName, cls: a.className, label: (a.getAttribute('aria-label') || a.textContent || '').trim().slice(0, 60), card: card ? card.id : null, outline: cs.outlineStyle + ' ' + cs.outlineWidth + ' ' + cs.outlineColor, inDialog: !!a.closest('dialog') }; })()`;

async function viewport(width, height, mobile, scale) {
  await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: scale, mobile });
}
async function load(width, height, mobile, scale) {
  await viewport(width, height, mobile, scale);
  await send("Page.navigate", { url });
  for (let i = 0; i < 60; i++) { await sleep(500); if ((await evaluate("document.readyState")) === "complete" && (await evaluate("!!document.querySelector('.wf-grid[data-masonry], .wf-grid')"))) break; }
  // Scroll through the wall so lazy images load and the masonry settles.
  await evaluate(`(async () => { const g = document.querySelector('.wf-grid'); const end = g.getBoundingClientRect().bottom + scrollY; for (let y = 0; y < end; y += innerHeight * 0.8) { scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } scrollTo(0, 0); await new Promise(r => setTimeout(r, 800)); })()`);
}

const report = {};
try {
  await connect();
  await send("Page.enable");
  await send("Runtime.enable");

  // Desktop, 1440 wide.
  await load(1440, 900, false, 1);
  report.desktop = await evaluate(AUDIT);
  await evaluate(`document.querySelector('#linkedin').scrollIntoView(); scrollBy(0, -120)`);
  await sleep(600);
  await shot("desktop.png");

  // Keyboard: from "Follow me on LinkedIn", Tab through the first cards, then open a post with Enter.
  await evaluate(`document.querySelector('.about-wall-follow a').focus()`);
  const order = [];
  for (let i = 0; i < 12; i++) { await key("Tab", "Tab", 9); order.push(await evaluate(describeActive)); }
  report.tabOrder = order;
  // Focus the first Read more and press Enter.
  await evaluate(`document.querySelector('.wf-card button.wall-more').focus()`);
  await key("Enter", "Enter", 13);
  await sleep(700);
  const dlg = { afterEnter: await evaluate(describeActive), open: await evaluate(`document.querySelector('dialog.wall-dialog').open`) };
  const inside = [];
  for (let i = 0; i < 6; i++) { await key("Tab", "Tab", 9); inside.push(await evaluate(describeActive)); }
  dlg.tabsInside = inside;
  await shot("dialog-desktop.png");
  await key("Escape", "Escape", 27);
  await sleep(500);
  dlg.afterEscape = await evaluate(describeActive);
  dlg.closed = !(await evaluate(`document.querySelector('dialog.wall-dialog').open`));
  await evaluate(`document.querySelector('.wf-card button.wall-more').focus()`);
  await key(" ", "Space", 32);
  await sleep(700);
  dlg.spaceOpens = await evaluate(`document.querySelector('dialog.wall-dialog').open`);
  await key("Tab", "Tab", 9, true);
  dlg.shiftTabInside = await evaluate(describeActive);
  await key("Escape", "Escape", 27);
  await sleep(400);
  dlg.afterSecondEscape = await evaluate(describeActive);
  report.dialog = dlg;

  // Phone, 390 wide (iPhone 12 to 15 class), 2x.
  await load(390, 844, true, 2);
  report.phone = await evaluate(AUDIT);
  await evaluate(`document.querySelector('#linkedin').scrollIntoView()`);
  await sleep(600);
  await shot("phone-1.png");
  await evaluate(`scrollBy(0, 1400)`);
  await sleep(600);
  await shot("phone-2.png");
  // The dialog at phone width.
  await evaluate(`document.querySelector('.wf-card button.wall-more').click()`);
  await sleep(700);
  report.phoneDialog = await evaluate(`(() => { const p = document.querySelector('.wall-dialog-panel').getBoundingClientRect(); const c = document.querySelector('.wall-close').getBoundingClientRect(); return { panel: Math.round(p.width) + 'x' + Math.round(p.height), close: Math.round(c.width) + 'x' + Math.round(c.height), closeInView: c.top >= 0 && c.bottom <= innerHeight, hScroll: document.querySelector('.wall-dialog-body').scrollWidth > document.querySelector('.wall-dialog-body').clientWidth + 1 }; })()`);
  await shot("phone-dialog.png");
  await key("Escape", "Escape", 27);

  // 200% zoom on a 1280 px window = a 640 CSS px viewport.
  await load(640, 400, false, 2);
  report.zoom200 = await evaluate(`(() => { const a = ${AUDIT}; return { viewport: a.viewport, hScroll: a.hScroll, scrollWidth: a.scrollWidth, columns: a.columns, cardWidth: a.cardWidth }; })()`);
  await evaluate(`document.querySelector('#linkedin').scrollIntoView()`);
  await sleep(500);
  await shot("zoom200.png");
} catch (e) {
  report.error = String(e);
} finally {
  writeFileSync(join(out, "report.json"), JSON.stringify(report, null, 2));
  try { ws?.close(); } catch {}
  chrome.kill();
  console.log(JSON.stringify(report, null, 1));
}
