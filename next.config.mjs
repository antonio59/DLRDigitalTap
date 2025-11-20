/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
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
