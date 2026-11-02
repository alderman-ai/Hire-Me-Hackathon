import { readFileSync } from "node:fs";
import path from "node:path";

// The link-preview card is drawn by Satori, which can't read CSS variables. So that the card never
// retypes a brand value, this reads the --av-* tokens straight out of app/addvery-tokens.css (the
// top-level :root block, before any media query) at build time.

const FILE = path.join(/* turbopackIgnore: true */ process.cwd(), "app", "addvery-tokens.css");

let cache: Map<string, string> | null = null;

function tokens(): Map<string, string> {
  if (cache) return cache;
  const css = readFileSync(FILE, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
  const root = /:root\s*\{([\s\S]*?)\}/.exec(css)?.[1] ?? "";
  const map = new Map<string, string>();
  for (const m of root.matchAll(/(--av-[a-z0-9-]+)\s*:\s*([^;]+);/g)) map.set(m[1], m[2].trim());
  cache = map;
  return map;
}

/** One --av-* token's value, e.g. avToken("--av-black") -> "#000000". Throws if it's missing. */
export function avToken(name: `--av-${string}`): string {
  const v = tokens().get(name);
  if (!v) throw new Error(`addvery-tokens.css has no ${name}`);
  return v;
}

/** The colour stops of a gradient token, e.g. ["#6645eb", "#d445eb"]. */
export function gradientStops(name: `--av-${string}`): string[] {
  return [...avToken(name).matchAll(/#[0-9a-f]{3,8}\b|rgba?\([^)]*\)/gi)].map((m) => m[0]);
}
