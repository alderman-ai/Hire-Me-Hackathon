/** @type {import('next').NextConfig} */
const nextConfig = {
  // The Articles section moved from /demos to /articles (3 Nov): old links keep working.
  async redirects() {
    return [
      { source: "/demos", destination: "/articles", permanent: true },
      { source: "/demos/:slug", destination: "/articles/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
