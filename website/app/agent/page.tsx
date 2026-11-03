import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NEW_SITE } from "../flags";
import { PAGE_LEDE, PAGE_TITLE, SEE_WHAT_IT_READS, SITE_PROMPT } from "./copy";
import { chatgptUrl, claudeUrl } from "./links";
import { CopyButton } from "./copy-button";
import { MCP_ADD } from "@/lib/agent-track/site";
import "../article.css";
import "./agent.css";

// /agent: the human way into the agent track. The prompt a visitor hands to their own AI, two buttons that
// open Claude or ChatGPT with it typed in, one that copies it, and a link to /llms.txt, the map the AI reads.
// Every visitor-facing word is in ./copy.ts; the button labels are product names.

export const metadata: Metadata = {
  title: `${PAGE_TITLE} · Hire Me Hackathon`,
  description: PAGE_LEDE,
  alternates: { canonical: "/agent" },
};

export default function AgentPage() {
  if (!NEW_SITE) notFound();
  return (
    <main className="art agent">
      <header className="art-hero art-band agent-hero" aria-labelledby="agent-title">
        <div className="art-container">
          <div className="art-eyebrow-row">
            <span className="art-eyebrow-line" aria-hidden="true" />
            <p className="art-eyebrow is-lavender">Hire Me Hackathon</p>
          </div>
          <h1 id="agent-title" className="art-h1 agent-h1">
            {PAGE_TITLE}
          </h1>
          <p className="art-hero-lead">{PAGE_LEDE}</p>
        </div>
      </header>

      <section className="agent-body" aria-label="The prompt">
        <div className="art-container">
          <div className="agent-card">
            <p id="agent-prompt-text" className="agent-prompt">
              {SITE_PROMPT}
            </p>
            <div className="agent-actions">
              <a className="agent-btn agent-btn-fill" href={claudeUrl(SITE_PROMPT)} target="_blank" rel="noopener noreferrer">
                <span>Open in Claude</span>
                <span className="sr-only"> (new tab)</span>
              </a>
              <a className="agent-btn agent-btn-fill" href={chatgptUrl(SITE_PROMPT)} target="_blank" rel="noopener noreferrer">
                <span>Open in ChatGPT</span>
                <span className="sr-only"> (new tab)</span>
              </a>
              <CopyButton text={SITE_PROMPT} label="Copy the prompt" />
            </div>
          </div>
          <p className="agent-map">
            <a href="/llms.txt">{SEE_WHAT_IT_READS}</a>
          </p>
          <pre className="agent-code" tabIndex={0} aria-label="MCP">
            <code>{MCP_ADD}</code>
          </pre>
        </div>
      </section>
    </main>
  );
}
