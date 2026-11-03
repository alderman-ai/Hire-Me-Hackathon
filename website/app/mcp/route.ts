import { TOOL_DEFS, runTool, type TrackIndex } from "@/lib/agent-track/tools";

// /mcp: a tiny public, read-only MCP server over Streamable HTTP, with no dependencies. Three tools over the
// agent track: site_map, read_page and search_site (lib/agent-track/tools.ts).
//
// Dual-era (modelcontextprotocol.io, revision 2026-07-28, "Versioning: Backward Compatibility"):
//   - modern requests carry `_meta["io.modelcontextprotocol/protocolVersion"]` and the mirrored headers
//     (MCP-Protocol-Version, Mcp-Method, Mcp-Name), checked against the body; served statelessly, results
//     carry `resultType: "complete"`; `server/discover` answers;
//   - legacy clients (2025-11-25 and earlier) open with `initialize`, which echoes their version when it's
//     one of ours; no session id is minted, so every request stands alone.
// Every request is one POST answered with application/json; a notification gets 202. GET and DELETE are
// 405 (no standalone stream, no sessions). CORS is open and every Origin is accepted: the server is public,
// read-only, holds no credentials and reads only what the site already publishes.
//
// The docs come from /agent-track.json (built at build time) on this same deployment, cached in memory.

export const dynamic = "force-dynamic";

const MODERN = ["2026-07-28"];
const LEGACY = ["2025-11-25", "2025-06-18", "2025-03-26", "2024-11-05"];
const SERVER = { name: "alex-alderman-site", title: "Alex Alderman: Hire Me Hackathon", version: "1.0.0" };
const INSTRUCTIONS =
  "Read-only tools over Alex Alderman's Hire Me Hackathon site. Call site_map first: it lists every page and holds a short guide for showing someone around. read_page returns one page as Markdown; search_site finds pages by keyword. Give people the human link of each page you use.";

const CORS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Accept, Authorization, MCP-Protocol-Version, Mcp-Method, Mcp-Name, Mcp-Session-Id, Last-Event-ID",
  "Access-Control-Expose-Headers": "MCP-Protocol-Version",
  "Access-Control-Max-Age": "86400",
};

type Id = string | number | null;
type Rpc = { jsonrpc?: unknown; id?: Id; method?: unknown; params?: Record<string, unknown> };

function reply(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...CORS },
  });
}
const ok = (id: Id, result: unknown) => reply(200, { jsonrpc: "2.0", id, result });
const fail = (status: number, id: Id, code: number, message: string, data?: unknown) =>
  reply(status, { jsonrpc: "2.0", id, error: { code, message, ...(data === undefined ? {} : { data }) } });

/** A mirrored header value, decoded from the `=?base64?...?=` form when it's in it. */
function headerValue(h: string | null): string | null {
  if (h === null) return null;
  const m = /^=\?base64\?([A-Za-z0-9+/=]*)\?=$/.exec(h);
  if (!m) return h;
  try {
    return new TextDecoder().decode(Uint8Array.from(atob(m[1]), (c) => c.charCodeAt(0)));
  } catch {
    return null;
  }
}

let cache: { at: number; index: TrackIndex } | null = null;
async function loadIndex(req: Request): Promise<TrackIndex> {
  if (cache && Date.now() - cache.at < 10 * 60 * 1000) return cache.index;
  const res = await fetch(new URL("/agent-track.json", req.url), { cache: "no-store" });
  if (!res.ok) throw new Error(`agent-track.json: ${res.status}`);
  const index = (await res.json()) as TrackIndex;
  cache = { at: Date.now(), index };
  return index;
}

const TOOLS = TOOL_DEFS.map((t) => ({ ...t, annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false } }));

export async function POST(req: Request): Promise<Response> {
  let msg: Rpc;
  try {
    msg = (await req.json()) as Rpc;
  } catch {
    return fail(400, null, -32700, "Parse error");
  }
  if (!msg || typeof msg !== "object" || Array.isArray(msg) || msg.jsonrpc !== "2.0" || typeof msg.method !== "string") {
    return fail(400, (msg as Rpc | null)?.id ?? null, -32600, "Invalid Request");
  }
  const method = msg.method;
  const params = (msg.params && typeof msg.params === "object" ? msg.params : {}) as Record<string, unknown>;

  // A notification (no id), such as notifications/initialized: accepted, nothing to say.
  if (!("id" in msg) || msg.id === undefined) return new Response(null, { status: 202, headers: CORS });
  const id = msg.id as Id;

  const meta = (params._meta && typeof params._meta === "object" ? params._meta : {}) as Record<string, unknown>;
  const version = meta["io.modelcontextprotocol/protocolVersion"];
  const modern = typeof version === "string";
  const done = (result: Record<string, unknown>) => ok(id, modern ? { resultType: "complete", ...result } : result);

  if (modern) {
    if (!MODERN.includes(version)) {
      return fail(400, id, -32022, "Unsupported protocol version", { supported: [...MODERN, ...LEGACY], requested: version });
    }
    const h = req.headers;
    const mismatch = (what: string) => fail(400, id, -32020, `Header mismatch: ${what}`);
    if (h.get("mcp-protocol-version") !== version) return mismatch("MCP-Protocol-Version must match _meta's protocolVersion");
    if (h.get("mcp-method") !== method) return mismatch("Mcp-Method must match the body's method");
    if (method === "tools/call" || method === "resources/read" || method === "prompts/get") {
      const name = (params.name ?? params.uri) as unknown;
      if (headerValue(h.get("mcp-name")) !== name) return mismatch("Mcp-Name must match the body's params.name");
    }
  } else {
    const hv = req.headers.get("mcp-protocol-version");
    if (hv && !LEGACY.includes(hv) && !MODERN.includes(hv)) {
      return fail(400, id, -32600, `Unsupported MCP-Protocol-Version: ${hv}`, { supported: [...MODERN, ...LEGACY] });
    }
  }

  switch (method) {
    case "initialize": {
      if (modern) break;
      const asked = typeof params.protocolVersion === "string" ? params.protocolVersion : "";
      return ok(id, {
        protocolVersion: LEGACY.includes(asked) ? asked : LEGACY[0],
        capabilities: { tools: { listChanged: false } },
        serverInfo: SERVER,
        instructions: INSTRUCTIONS,
      });
    }
    case "server/discover":
      return done({
        supportedVersions: [...MODERN, ...LEGACY],
        capabilities: { tools: { listChanged: false } },
        _meta: { "io.modelcontextprotocol/serverInfo": SERVER },
        instructions: INSTRUCTIONS,
        ttlMs: 3600000,
        cacheScope: "public",
      });
    case "ping":
      return done({});
    case "tools/list":
      return done({ tools: TOOLS });
    case "tools/call": {
      const name = typeof params.name === "string" ? params.name : "";
      if (!TOOL_DEFS.some((t) => t.name === name)) return fail(200, id, -32602, `Unknown tool: ${name}`);
      const args = (params.arguments && typeof params.arguments === "object" ? params.arguments : {}) as Record<string, unknown>;
      try {
        const out = runTool(await loadIndex(req), name, args);
        return done({ content: [{ type: "text", text: out.text }], isError: out.isError });
      } catch {
        return done({ content: [{ type: "text", text: "The site's index couldn't be loaded. Try again in a moment." }], isError: true });
      }
    }
  }
  return fail(modern ? 404 : 200, id, -32601, `Method not found: ${method}`);
}

const notAllowed = () =>
  new Response(JSON.stringify({ jsonrpc: "2.0", id: null, error: { code: -32000, message: "Method not allowed: POST JSON-RPC to this endpoint." } }), {
    status: 405,
    headers: { "Content-Type": "application/json", Allow: "POST, OPTIONS", ...CORS },
  });

export function GET() {
  return notAllowed();
}

export function DELETE() {
  return notAllowed();
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}
