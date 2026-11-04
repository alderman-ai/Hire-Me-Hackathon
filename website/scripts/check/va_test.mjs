// Tests the analytics opt-out in one fresh headless Chrome profile, step by step: for each URL, the pageview
// that Vercel Web Analytics logs (debug, in `next dev`) or sends (/_vercel/insights/view, on a deployment),
// the address bar after load, and the va-disable flag.
// Usage: node va_test.mjs <base> <path> [<path> ...]   e.g. node va_test.mjs http://localhost:3101 / /?me=on /about /?me=off
import { spawn } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const [base, ...paths] = process.argv.slice(2);
const PORT = 9346;
const profile = mkdtempSync(join(tmpdir(), "va-"));
const chrome = spawn("C:/Program Files/Google/Chrome/Application/chrome.exe",
  ["--headless=new", `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, "--no-first-run", "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let ws, seq = 0; const pending = new Map();
const consoleLines = [], requests = [];
for (let i = 0; i < 50 && !ws; i++) {
  try {
    const page = (await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()).find((t) => t.type === "page");
    if (page) { ws = new WebSocket(page.webSocketDebuggerUrl); await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; }); }
  } catch { ws = undefined; await sleep(300); }
}
ws.onmessage = (m) => {
  const d = JSON.parse(m.data);
  if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); return; }
  if (d.method === "Runtime.consoleAPICalled") {
    const text = d.params.args.map((a) => a.value ?? a.description ?? "").join(" ");
    if (/vercel web analytics/i.test(text)) consoleLines.push(text.replace(/\s+/g, " ").slice(0, 160));
  }
  if (d.method === "Network.requestWillBeSent") {
    const u = d.params.request.url;
    const all = process.env.ALL === "1" && !/\.(png|jpe?g|webp|avif|woff2?|css)(\?|$)|\/_next\/static\//.test(u);
    if (all || /\/_vercel\/insights\/(view|event)|\/[0-9a-f]{16}\/(view|event)|vitals|va\.vercel-scripts\.com\/.*\/(view|event)/.test(u)) requests.push(`${d.params.request.method} ${u.replace(/^https?:\/\/[^/]+/, "")}`);
  }
};
const send = (method, params = {}) => new Promise((r) => { const id = ++seq; pending.set(id, r); ws.send(JSON.stringify({ id, method, params })); });
const ev = async (e) => (await send("Runtime.evaluate", { expression: e, awaitPromise: true, returnByValue: true })).result?.result?.value;
try {
  await send("Runtime.enable");
  await send("Network.enable");
  // Vercel's script skips "HeadlessChrome": look like an ordinary Chrome, so the test sees what a person's browser sends.
  if (process.env.REAL_UA === "1") {
    const ua = (await send("Browser.getVersion")).result.userAgent.replace("HeadlessChrome", "Chrome");
    await send("Network.setUserAgentOverride", { userAgent: ua });
    await send("Page.addScriptToEvaluateOnNewDocument", { source: "Object.defineProperty(navigator, 'webdriver', { get: () => false });" });
  }
  for (const p of paths) {
    consoleLines.length = 0; requests.length = 0;
    await send("Page.navigate", { url: base + p });
    for (let i = 0; i < 80; i++) { await sleep(500); if ((await ev("document.readyState")) === "complete") break; }
    await sleep(4000);
    const href = await ev("location.pathname + location.search");
    const flag = await ev("(() => { try { return localStorage.getItem('va-disable'); } catch { return 'error'; } })()");
    console.log(`${p}\n  address bar: ${href}   va-disable: ${flag}\n  sent: ${requests.length ? requests.join(" | ") : "none"}\n  debug log: ${consoleLines.length ? consoleLines.join(" | ") : "none"}`);
  }
} finally { ws?.close(); chrome.kill(); }
