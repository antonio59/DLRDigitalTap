import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare"

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https://*.convex.cloud https://*.convex.site",
      "font-src 'self'",
      "connect-src 'self' https://*.convex.cloud wss://*.convex.cloud",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }]
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

initOpenNextCloudflareForDev()
