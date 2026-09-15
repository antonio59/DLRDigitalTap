import type { FunctionContext } from "./_lib/env"

const UMAMI_SCRIPT_URL = "https://umami.antoniosmith.xyz/script.js"

function toHex(buffer: ArrayBuffer): string {
  return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, "0")).join("")
}

// Proxies the upstream analytics script but pins its content: the body is only
// served when its SHA-256 matches UMAMI_SCRIPT_SHA256, so mutable upstream
// content cannot silently gain first-party script authority. Set the pin with:
//   curl -s https://umami.antoniosmith.xyz/script.js | shasum -a 256
// Alternatively, vendor the script as public/script.js and delete this file.
export async function onRequestGet({ env }: FunctionContext): Promise<Response> {
  const pin = env.UMAMI_SCRIPT_SHA256?.toLowerCase()
  if (!pin) {
    return new Response("Analytics script pin is not configured", { status: 503 })
  }

  let body: ArrayBuffer
  try {
    const upstream = await fetch(UMAMI_SCRIPT_URL)
    if (!upstream.ok) {
      return new Response("Analytics unavailable", { status: 502 })
    }
    body = await upstream.arrayBuffer()
  } catch {
    return new Response("Analytics unavailable", { status: 502 })
  }

  const digest = toHex(await crypto.subtle.digest("SHA-256", body))
  if (digest !== pin) {
    return new Response("Analytics script failed integrity check", { status: 502 })
  }

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "application/javascript",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
