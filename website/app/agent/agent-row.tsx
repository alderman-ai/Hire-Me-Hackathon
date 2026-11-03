import { mdUrlFor } from "@/lib/agent-track/docs";
import { PAGE_ROW_LABEL } from "./copy";
import { chatgptUrl, claudeUrl, pagePrompt } from "./links";
import "./agent.css";

/**
 * One small row near the end of an article and of each /for/<slug> page: "Ask your AI about this page:",
 * then Claude, ChatGPT and the page's Markdown. Nothing renders for a page without a Markdown twin.
 */
export function AgentRow({ path }: { path: string }) {
  const md = mdUrlFor(path);
  if (!md) return null;
  const prompt = pagePrompt(md);
  return (
    <aside className="agent-row" aria-label={PAGE_ROW_LABEL}>
      <p className="agent-row-inner">
        <span className="agent-row-label">{PAGE_ROW_LABEL}</span>{" "}
        <a href={claudeUrl(prompt)} target="_blank" rel="noopener noreferrer">
          Claude<span className="sr-only"> (new tab)</span>
        </a>
        <span className="agent-row-sep" aria-hidden="true">
          {" · "}
        </span>
        <a href={chatgptUrl(prompt)} target="_blank" rel="noopener noreferrer">
          ChatGPT<span className="sr-only"> (new tab)</span>
        </a>
        <span className="agent-row-sep" aria-hidden="true">
          {" · "}
        </span>
        <a href={md} type="text/markdown">
          Markdown
        </a>
      </p>
    </aside>
  );
}
