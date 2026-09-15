import { json, type FunctionContext } from "../_lib/env"
import { sha256Hex } from "../_lib/admin"
import { convexMutation } from "../_lib/convex"

// Mints a single-use action token for votes/comments/uploads. Issuance is
// rate-limited per source IP inside the Convex mutation; the IP is hashed
// before it leaves the edge so no raw client IP is stored.
export async function onRequestPost({ request, env }: FunctionContext): Promise<Response> {
  const convexUrl = env.NEXT_PUBLIC_CONVEX_URL
  if (!convexUrl || !env.TOKEN_ISSUER_SECRET) {
    return json({ success: false, error: "Voting is not configured" }, 503)
  }

  const ip = request.headers.get("CF-Connecting-IP") ?? "anonymous"
  const key = `tok:${await sha256Hex(ip)}`

  try {
    const result = await convexMutation<{ success: boolean; token?: string; error?: string }>(
      convexUrl,
      "tokens:issue",
      { key, issuerSecret: env.TOKEN_ISSUER_SECRET },
    )
    if (!result.success || !result.token) {
      return json({ success: false, error: result.error ?? "Rate limited" }, 429)
    }
    return json({ success: true, token: result.token })
  } catch (error) {
    console.error("Token issuance failed:", error)
    return json({ success: false, error: "Could not issue token" }, 502)
  }
}
