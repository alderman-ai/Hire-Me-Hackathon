// Headless Chrome (own throwaway profile) over the DevTools protocol: an accessibility and phone-width
// check of any page: overflow, headings, images, targets, full-page shots. Usage: node audit_page.mjs <url> <outdir>
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
// Runs in the page: overflow, headings, images, controls, ids.
const AUDIT = String.raw`(() => {
  const vw = innerWidth;
  const scrollers = (el) => { for (let e = el.parentElement; e; e = e.parentElement) { const o = getComputedStyle(e).overflowX; if (o === 'auto' || o === 'scroll' || o === 'hidden' || o === 'clip') return true; } return false; };
  const wide = [];
  for (const e of document.querySelectorAll('body *')) { const r = e.getBoundingClientRect(); if (r.width && r.right > vw + 2 && !scrollers(e)) wide.push(e.tagName.toLowerCase() + '.' + String(e.className).split(' ')[0] + ' r=' + Math.round(r.right)); }
  const imgs = [...document.querySelectorAll('main img, footer img')];
  const controls = [...document.querySelectorAll('main a, main button')].filter((c) => c.getBoundingClientRect().width > 0);
  const small = {};
  for (const c of controls) { const r = c.getBoundingClientRect(); if (r.height < 24 || r.width < 24) { const k = c.tagName + '.' + String(c.className).split(' ')[0]; small[k] = (small[k] || 0) + 1; } }
  const heads = [...document.querySelectorAll('main h1, main h2, main h3, main h4')].map((h) => +h.tagName[1]);
  const skips = []; for (let i = 1; i < heads.length; i++) if (heads[i] > heads[i - 1] + 1) skips.push(heads[i - 1] + '>' + heads[i]);
  const ids = [...document.querySelectorAll('[id]')].map((e) => e.id); const dup = ids.filter((v, i) => ids.indexOf(v) !== i);
  const placeholders = [...document.querySelectorAll('main *')].filter((e) => /placeholder|\[draft|lorem|TODO/i.test(e.childNodes.length === 1 && e.firstChild.nodeType === 3 ? e.textContent : '')).length;
  return {
    viewport: vw + 'x' + innerHeight, height: document.documentElement.scrollHeight,
    hScroll: document.documentElement.scrollWidth > vw + 1, wide: wide.slice(0, 6),
    h1: document.querySelectorAll('h1').length, headingSkips: skips,
    imgs: imgs.length, noAlt: imgs.filter((i) => !i.hasAttribute('alt')).map((i) => i.src.split('/').pop()).slice(0, 5),
    broken: imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.getAttribute('src')).slice(0, 8),
    unnamed: controls.filter((c) => !(c.getAttribute('aria-label') || c.textContent.trim() || c.querySelector('img[alt]:not([alt=""])'))).length,
    smallTargets: small, dupIds: [...new Set(dup)], placeholders,
  };
})()`;

async function load(width, height, mobile, scale) {
  await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: scale, mobile });
  await send("Page.navigate", { url });
  for (let i = 0; i < 80; i++) { await sleep(500); if ((await evaluate("document.readyState")) === "complete") break; }
  await sleep(1500);
  await evaluate(`(async () => { for (let y = 0; y < document.body.scrollHeight; y += innerHeight * 0.7) { scrollTo(0, y); await new Promise(r => setTimeout(r, 140)); } scrollTo(0, 0); await new Promise(r => setTimeout(r, 1000)); })()`);
}

async function fullShot(name, width) {
  const h = await evaluate("document.documentElement.scrollHeight");
  await send("Emulation.setDeviceMetricsOverride", { width, height: Math.min(h, 16000), deviceScaleFactor: 1, mobile: width < 600 });
  await sleep(800);
  const r = await send("Page.captureScreenshot", { format: "jpeg", quality: 60, captureBeyondViewport: true });
  writeFileSync(join(out, name), Buffer.from(r.result.data, "base64"));
}

const report = {};
try {
  await connect();
  await send("Page.enable");
  await send("Runtime.enable");
  await load(1440, 900, false, 1);
  report.desktop = await evaluate(AUDIT);
  await fullShot("desktop-full.jpg", 1440);
  await load(390, 844, true, 2);
  report.phone = await evaluate(AUDIT);
  await fullShot("phone-full.jpg", 390);
} catch (e) {
  report.error = String(e);
} finally {
  writeFileSync(join(out, "report.json"), JSON.stringify(report, null, 2));
  try { ws?.close(); } catch {}
  chrome.kill();
  console.log(JSON.stringify(report));
}
