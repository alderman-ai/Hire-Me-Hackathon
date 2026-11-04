import { personGuide } from "@/lib/agent-track/docs";
import { claudeUrl } from "../../agent/links";
import { CopyButton } from "../../agent/copy-button";
import "../../agent/agent.css";

// The block right after a personal page's opening paragraph that hands the page to the visitor's own AI
// (4 Nov, the CEO's page): one line, "Open in Claude" with the prompt typed in (the /agent page's link), and
// a copy button for any other AI. The prompt points at the page's guide, /for/<slug>/llms.txt
// (lib/agent-track/docs.ts, personGuide), and names the role only. Renders nothing for a page without a
// guide in this build, so no other page gets a button, and production never shows a placeholder.

export function AgentGuide({ slug }: { slug: string }) {
  const g = personGuide(slug);
  if (!g) return null;
  const promptId = `pp-agent-prompt-${slug}`;
  return (
    <div className="pp-agent" role="group" aria-labelledby="pp-agent-line">
      <p id="pp-agent-line" className="pp-agent-line">
        {g.line}
      </p>
      <div className="agent-actions pp-agent-actions">
        <a className="agent-btn agent-btn-fill" href={claudeUrl(g.prompt)} target="_blank" rel="noopener noreferrer">
          <span>{g.button}</span>
          <span className="sr-only"> (new tab)</span>
        </a>
        <CopyButton text={g.prompt} label={g.alt} targetId={promptId} />
      </div>
      {/* Shown only when the clipboard is blocked, so the prompt can be copied by hand. */}
      <p id={promptId} className="agent-prompt pp-agent-prompt" hidden>
        {g.prompt}
      </p>
    </div>
  );
}
