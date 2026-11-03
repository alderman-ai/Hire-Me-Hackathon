"use client";

import { useEffect } from "react";
import { TOOL_DEFS, keyFromPath, runTool, type TrackIndex } from "@/lib/agent-track/tools";

/*
 * WebMCP (Chrome's origin trial): the same three read-only tools as /mcp, registered with the browser so an
 * agent driving this tab can call them. Feature-detected (`document.modelContext`, or the older
 * `navigator.modelContext`), and every step sits in try/catch, so a browser without it, or a changed API,
 * can never break a page. Renders nothing. No origin-trial token yet: that needs Alex's Google account.
 */

type ModelContext = {
  registerTool: (tool: unknown, options?: { signal?: AbortSignal }) => unknown;
};

async function text(url: string, accept: string): Promise<{ ok: boolean; body: string }> {
  const res = await fetch(url, { headers: { Accept: accept } });
  return { ok: res.ok, body: res.ok ? await res.text() : "" };
}

export function WebMcp() {
  useEffect(() => {
    let mc: ModelContext | undefined;
    try {
      const d = document as unknown as { modelContext?: ModelContext };
      const n = navigator as unknown as { modelContext?: ModelContext };
      mc = d.modelContext ?? n.modelContext;
    } catch {
      return;
    }
    if (!mc || typeof mc.registerTool !== "function") return;

    const controller = new AbortController();
    const handles: unknown[] = [];
    let index: Promise<TrackIndex> | null = null;
    const loadIndex = () => (index ??= fetch("/agent-track.json").then((r) => r.json() as Promise<TrackIndex>));

    const execute = (name: string) => async (args?: Record<string, unknown>) => {
      try {
        if (name === "site_map") return (await text("/llms.txt", "text/plain")).body;
        if (name === "read_page") {
          const path = typeof args?.path === "string" ? args.path : "";
          const page = await text(`/${keyFromPath(path)}.md`, "text/markdown");
          return page.ok ? page.body : `404: no page at "${path}". Call site_map for every page's path.`;
        }
        return runTool(await loadIndex(), name, args ?? {}).text;
      } catch {
        return "The site couldn't be read just now. Try again in a moment.";
      }
    };

    for (const def of TOOL_DEFS) {
      try {
        const tool = {
          name: def.name,
          title: def.title,
          description: def.description,
          inputSchema: def.inputSchema,
          annotations: { readOnlyHint: true },
          execute: execute(def.name),
        };
        const handle = mc.registerTool(tool, { signal: controller.signal });
        handles.push(handle);
        if (handle && typeof (handle as Promise<unknown>).catch === "function") (handle as Promise<unknown>).catch(() => {});
      } catch {
        // An older or changed API: leave the page alone.
      }
    }
    return () => {
      try {
        controller.abort();
        for (const h of handles) {
          const u = (h as { unregister?: () => void } | null)?.unregister;
          if (typeof u === "function") u.call(h);
        }
      } catch {}
    };
  }, []);
  return null;
}
