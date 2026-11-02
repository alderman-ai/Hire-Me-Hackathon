// Headless Chrome (own throwaway profile) over the DevTools protocol: an accessibility and phone-width
// check of the video wall on /videos (W13). Usage: node audit_videos.mjs <url> <outdir>
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
// Runs in the page: contrast, alt text, targets, overflow, rows.
const AUDIT = String.raw`(() => {
  const parse = (c) => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[ ,\/]+/).filter(Boolean).map(Number); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; };
  const lum = ({ r, g, b }) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
  const blend = (top, bottom) => ({ r: top.r * top.a + bottom.r * (1 - top.a), g: top.g * top.a + bottom.g * (1 - top.a), b: top.b * top.a + bottom.b * (1 - top.a), a: 1 });
  // Badges sit on images: their own translucent black over the worst case, a white image.
  const bgOf = (el) => { const layers = []; for (let e = el; e; e = e.parentElement) { const c = parse(getComputedStyle(e).backgroundColor); if (c && c.a > 0) { layers.push(c); if (c.a >= 1) break; } } let base = { r: 255, g: 255, b: 255, a: 1 }; for (const l of layers.reverse()) base = blend(l, base); return base; };
  const hex = (c) => '#' + [c.r, c.g, c.b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
  const sels = ['.vw-title', '.vw-flag', '.vw-flag strong', '.vw-head .vw-placeholder', '.vw-row-title', '.vw-row-count', '.vw-count', '.vw-count-of', '.vw-tile-title', '.vw-tile-meta', '.vw-badge', '.site-header .nav-link', '.vw-dialog-title', '.vw-dialog-meta', '.vw-dialog .vw-placeholder', '.vw-article'];
  const contrast = [];
  for (const s of sels) {
    const el = document.querySelector(s); if (!el) { contrast.push({ s, missing: true }); continue; }
    const cs = getComputedStyle(el); const fg = parse(cs.color); const bg = bgOf(el);
    const fgb = fg.a < 1 ? blend(fg, bg) : fg;
    const size = parseFloat(cs.fontSize), weight = Number(cs.fontWeight);
    const large = size >= 24 || (size >= 18.66 && weight >= 700);
    const r = ratio(fgb, bg);
    contrast.push({ s, fg: hex(fgb), bg: hex(bg), ratio: Math.round(r * 100) / 100, need: large ? 3 : 4.5, pass: r >= (large ? 3 : 4.5), px: size });
  }
  const tiles = [...document.querySelectorAll('.vw-tile')];
  const imgs = [...document.querySelectorAll('.vw img')];
  const controls = [...document.querySelectorAll('.vw a, .vw button')];
  const small = {};
  for (const c of controls) { const r = c.getBoundingClientRect(); if (r.width === 0) continue; const k = c.className || c.tagName; if (r.height < 24 || r.width < 24) { small[k] = small[k] || { n: 0, h: Math.round(r.height), w: Math.round(r.width) }; small[k].n++; } }
  const ids = [...document.querySelectorAll('[id]')].map((e) => e.id); const dupIds = ids.filter((v, i) => ids.indexOf(v) !== i);
  const rows = [...document.querySelectorAll('.vw-row')].map((r) => ({ h: r.querySelector('h2').textContent, tiles: r.querySelectorAll('.vw-tile').length, bar: !r.querySelector('.vw-bar').hidden, count: r.querySelector('.vw-count')?.textContent, tileW: Math.round(r.querySelector('.vw-slide').getBoundingClientRect().width) }));
  return {
    viewport: innerWidth + 'x' + innerHeight,
    hScroll: document.documentElement.scrollWidth > innerWidth + 1, scrollWidth: document.documentElement.scrollWidth,
    tiles: tiles.length, buttons: tiles.filter((t) => t.tagName === 'BUTTON').length, rows,
    imgs: imgs.length, noAlt: imgs.filter((i) => !i.hasAttribute('alt')).length, brokenImgs: imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src.split('/').pop()),
    unnamed: controls.filter((c) => !(c.getAttribute('aria-label') || c.textContent.trim())).length,
    smallTargets: small, dupIds: [...new Set(dupIds)], h1: document.querySelectorAll('h1').length,
    contrast,
  };
})()`;

const describeActive = String.raw`(() => { const a = document.activeElement; if (!a || a === document.body) return 'body'; const cs = getComputedStyle(a); return { tag: a.tagName, cls: a.className, text: (a.getAttribute('aria-label') || a.textContent || '').trim().slice(0, 70), outline: cs.outlineStyle + ' ' + cs.outlineWidth, inDialog: !!a.closest('dialog') }; })()`;

const dialogState = String.raw`(() => { const d = document.querySelector('dialog.vw-dialog'); const f = d.querySelector('iframe'); const a = d.querySelector('.vw-article'); return { open: d.open, iframe: f ? f.src.split('/embed/')[1] : null, article: a ? a.getAttribute('href') : null, title: d.querySelector('.vw-dialog-title')?.textContent || null }; })()`;

async function load(width, height, mobile, scale) {
  await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: scale, mobile });
  await send("Page.navigate", { url });
  for (let i = 0; i < 60; i++) { await sleep(500); if ((await evaluate("document.readyState")) === "complete" && (await evaluate("!!document.querySelector('button.vw-tile')"))) break; }
  // Scroll down the page and along each row so lazy images load.
  await evaluate(`(async () => { for (const t of document.querySelectorAll('.vw-track')) { t.scrollTo(t.scrollWidth, 0); await new Promise(r => setTimeout(r, 150)); t.scrollTo(0, 0); } for (let y = 0; y < document.body.scrollHeight; y += innerHeight * 0.8) { scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } scrollTo(0, 0); await new Promise(r => setTimeout(r, 900)); })()`);
}

const report = {};
try {
  await connect();
  await send("Page.enable");
  await send("Runtime.enable");

  await load(1440, 900, false, 1);
  report.desktop = await evaluate(AUDIT);
  await shot("desktop.png");
  await evaluate(`scrollTo(0, 700)`);
  await sleep(500);
  await shot("desktop-2.png");
  await evaluate(`scrollTo(0, 0)`);

  // Row 1's next button moves the track; an arrow key inside the row too.
  await evaluate(`document.querySelectorAll('.vw-row')[0].querySelectorAll('.vw-btn')[1].click()`);
  await sleep(1000);
  report.afterNext = await evaluate(`document.querySelector('.vw-row .vw-count').textContent`);
  await evaluate(`document.querySelector('.vw-row .vw-tile').focus({ preventScroll: true })`);
  await key("ArrowRight", "ArrowRight", 39);
  await sleep(1000);
  report.afterArrow = await evaluate(`document.querySelector('.vw-row .vw-count').textContent`);
  await evaluate(`document.querySelector('.vw-row .vw-track').scrollTo(0, 0)`);
  await sleep(600);

  // Keyboard: Enter on the first tile opens the dialog with focus on its title; Tab stays inside; Esc closes and returns focus.
  const dlg = {};
  await evaluate(`document.querySelector('.vw-tile').focus()`);
  dlg.tileFocus = await evaluate(describeActive);
  await key("Enter", "Enter", 13);
  await sleep(1500);
  dlg.opened = await evaluate(dialogState);
  dlg.focusAfterOpen = await evaluate(describeActive);
  report.dialogContrast = (await evaluate(AUDIT)).contrast.filter((c) => c.s.startsWith(".vw-dialog") || c.s === ".vw-article");
  await shot("dialog-desktop.png");
  // Esc from the dialog's own controls (inside the YouTube player, the player takes the keys).
  await key("Tab", "Tab", 9);
  dlg.firstTab = await evaluate(describeActive);
  await key("Escape", "Escape", 27);
  await sleep(500);
  dlg.afterEscape = await evaluate(dialogState);
  dlg.focusAfterEscape = await evaluate(describeActive);
  // The 36-workflows clip carries the C2 article on this build (a draft, previews only).
  await evaluate(`[...document.querySelectorAll('.vw-tile')].find((t) => /36 workflows/i.test(t.textContent)).click()`);
  await sleep(1200);
  dlg.withArticle = await evaluate(dialogState);
  report.articleContrast = (await evaluate(AUDIT)).contrast.filter((c) => c.s === ".vw-article");
  await shot("dialog-article.png");
  await evaluate(`document.querySelector('.vw-close').click()`);
  await sleep(500);
  // A moment from a session video plays by start and end.
  await evaluate(`[...document.querySelectorAll('.vw-tile')].find((t) => /Now you can do both/i.test(t.textContent)).click()`);
  await sleep(800);
  dlg.moment = await evaluate(dialogState);
  await evaluate(`document.querySelector('.vw-close').click()`);
  report.dialog = dlg;

  await load(390, 844, true, 2);
  report.phone = await evaluate(AUDIT);
  await shot("phone-1.png");
  await evaluate(`scrollBy(0, 900)`);
  await sleep(500);
  await shot("phone-2.png");
  await evaluate(`document.querySelector('.vw-tile').click()`);
  await sleep(1200);
  report.phoneDialog = await evaluate(`(() => { const p = document.querySelector('.vw-dialog-panel').getBoundingClientRect(); const c = document.querySelector('.vw-close').getBoundingClientRect(); const b = document.querySelector('.vw-dialog-body'); return { panel: Math.round(p.width) + 'x' + Math.round(p.height), close: Math.round(c.width) + 'x' + Math.round(c.height), closeInView: c.top >= 0 && c.bottom <= innerHeight, hScroll: b.scrollWidth > b.clientWidth + 1 }; })()`);
  await shot("phone-dialog.png");
  await key("Escape", "Escape", 27);

  // 200% zoom on a 1280 px window = a 640 CSS px viewport.
  await load(640, 400, false, 2);
  report.zoom200 = await evaluate(`(() => { const a = ${AUDIT}; return { viewport: a.viewport, hScroll: a.hScroll, scrollWidth: a.scrollWidth, tileWidths: a.rows.map((r) => r.tileW) }; })()`);
} catch (e) {
  report.error = String(e);
} finally {
  writeFileSync(join(out, "report.json"), JSON.stringify(report, null, 2));
  try { ws?.close(); } catch {}
  chrome.kill();
  console.log(JSON.stringify(report, null, 1));
}
