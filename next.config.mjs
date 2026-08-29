/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next 16.3 writes AGENTS.md / CLAUDE.md during `next dev` unless disabled.
  agentRules: false,
  turbopack: {
    root: process.cwd(),
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/script.js",
        destination: "https://umami.antoniosmith.xyz/script.js",
      },
      {
        source: "/api/send",
        destination: "https://umami.antoniosmith.xyz/api/send",
      },
    ]
  },
}

export default nextConfig
