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
};

export default nextConfig;
