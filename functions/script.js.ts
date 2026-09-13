import type { FunctionContext } from "./_lib/env"

const UMAMI_SCRIPT_URL = "https://umami.antoniosmith.xyz/script.js"

export async function onRequestGet(_context: FunctionContext): Promise<Response> {
  const upstream = await fetch(UMAMI_SCRIPT_URL)
  return new Response(upstream.body, {
    status: upstream.status,
    headers: {
      "Content-Type": upstream.headers.get("Content-Type") ?? "application/javascript",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
