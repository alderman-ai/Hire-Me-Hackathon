// Headless Chrome over the DevTools protocol: a PNG of one element at a given viewport width.
// Usage: node element_shot.mjs <url> <css selector> <width> <out.png>
import { spawn } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const [url, selector, width, out] = process.argv.slice(2);
const PORT = 9344;
const profile = mkdtempSync(join(tmpdir(), "es-"));
const chrome = spawn("C:/Program Files/Google/Chrome/Application/chrome.exe",
  ["--headless=new", `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, "--no-first-run", "--hide-scrollbars", "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let ws, seq = 0; const pending = new Map();
for (let i = 0; i < 50 && !ws; i++) {
  try {
    const page = (await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()).find((t) => t.type === "page");
    if (page) { ws = new WebSocket(page.webSocketDebuggerUrl); await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
      ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); } }; }
  } catch { ws = undefined; await sleep(300); }
}
const send = (method, params = {}) => new Promise((r) => { const id = ++seq; pending.set(id, r); ws.send(JSON.stringify({ id, method, params })); });
const ev = async (e) => (await send("Runtime.evaluate", { expression: e, awaitPromise: true, returnByValue: true })).result?.result?.value;
try {
  await send("Emulation.setDeviceMetricsOverride", { width: +width, height: 900, deviceScaleFactor: 1, mobile: +width < 700 });
  // Never counted in Vercel Web Analytics: the site's opt-out flag (app/site-analytics.tsx) on every page.
  await send("Page.addScriptToEvaluateOnNewDocument", { source: "try{localStorage.setItem('va-disable','1')}catch(e){}" });
  await send("Page.navigate", { url });
  for (let i = 0; i < 80; i++) { await sleep(500); if ((await ev("document.readyState")) === "complete") break; }
  await ev(`(async () => { for (let y = 0; y < document.body.scrollHeight; y += innerHeight * 0.7) { scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } await new Promise(r => setTimeout(r, 800)); })()`);
  const r = await ev(`(() => { const e = document.querySelector(${JSON.stringify(selector)}); if (!e) return null; e.scrollIntoView(); const b = e.getBoundingClientRect(); return { x: b.left + scrollX, y: b.top + scrollY, w: b.width, h: b.height }; })()`);
  if (!r) throw new Error("selector not found");
  const shot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: { x: 0, y: r.y, width: +width, height: Math.min(r.h, 3000), scale: 1 } });
  writeFileSync(out, Buffer.from(shot.result.data, "base64"));
  console.log("saved", out, Math.round(r.h));
} finally { ws?.close(); chrome.kill(); }
