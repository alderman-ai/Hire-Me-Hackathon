import { LLMS_URL } from "@/lib/agent-track/site";
import { PAGE_PROMPT } from "./copy";

// "Open in Claude" and "Open in ChatGPT": each opens a new chat with the prompt typed in. The prompts point
// at URLs instead of pasting content, so they stay far below the length a URL can carry.

export function claudeUrl(prompt: string): string {
  return `https://claude.ai/new?q=${encodeURIComponent(prompt)}`;
}

export function chatgptUrl(prompt: string): string {
  return `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;
}

/** The per-page prompt with the page's .md URL and the site map's URL filled in. */
export function pagePrompt(mdUrl: string): string {
  return PAGE_PROMPT.replace("{md_url}", mdUrl).replace("{llms_url}", LLMS_URL);
}
