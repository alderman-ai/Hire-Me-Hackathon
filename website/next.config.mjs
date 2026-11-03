// The agent track (lib/agent-track): every page has a Markdown twin. Two ways in, both rewrites, so the
// twins stay static files and nothing runs per request:
//   - /<page>.md (and /index.md for the home page);
//   - the page's own URL, when the request's Accept asks for text/markdown (Vercel's content negotiation).
// A browser opening a .md URL (Accept has text/html, not text/markdown) gets the text/plain twin, so it
// shows the page instead of downloading it. Assets, /llms.txt and every other request are untouched.
const MARKDOWN = { type: "header", key: "accept", value: "(.*)text/markdown(.*)" };
const HTML = { type: "header", key: "accept", value: "(.*)text/html(.*)" };

/** The pages that have a twin, as rewrite sources. A slug the build doesn't have 404s in the route. */
const PAGES = [
  ["/", "/index"],
  ["/articles", "/articles"],
  ["/articles/:slug", "/articles/:slug"],
  ["/videos", "/videos"],
  ["/skills", "/skills"],
  ["/about", "/about"],
  ["/for", "/for"],
  ["/for/:slug", "/for/:slug"],
  ["/log", "/log"],
  ["/day-2", "/day-2"],
  ["/privacy", "/privacy"],
  ["/d1", "/d1"],
  ["/d2", "/d2"],
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // The Articles section moved from /demos to /articles (3 Nov): old links keep working.
  async redirects() {
    return [
      { source: "/articles/if-ai-wont-replace-half-your-team", destination: "/articles/first-ai-project-sales-pipeline", permanent: true },
      { source: "/demos/if-ai-wont-replace-half-your-team", destination: "/articles/first-ai-project-sales-pipeline", permanent: true },
      { source: "/articles/keep-the-promise", destination: "/articles/first-ai-project-sales-pipeline", permanent: true },
      { source: "/demos/keep-the-promise", destination: "/articles/first-ai-project-sales-pipeline", permanent: true },
      { source: "/demos", destination: "/articles", permanent: true },
      { source: "/demos/:slug", destination: "/articles/:slug", permanent: true },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        // /<page>.md: text/plain for a browser, text/markdown for everyone else.
        { source: "/:a\\.md", has: [HTML], missing: [MARKDOWN], destination: "/agent-txt/:a" },
        { source: "/:a/:b\\.md", has: [HTML], missing: [MARKDOWN], destination: "/agent-txt/:a/:b" },
        { source: "/:a\\.md", has: [MARKDOWN], destination: "/agent-md/:a" },
        { source: "/:a/:b\\.md", has: [MARKDOWN], destination: "/agent-md/:a/:b" },
        { source: "/:a\\.md", missing: [HTML], destination: "/agent-md/:a" },
        { source: "/:a/:b\\.md", missing: [HTML], destination: "/agent-md/:a/:b" },
        // A page's own URL, asked for as Markdown.
        ...PAGES.map(([source, doc]) => ({ source, has: [MARKDOWN], destination: `/agent-md${doc}` })),
      ],
    };
  },
};

export default nextConfig;
