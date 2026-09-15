import type { Env } from "./env"

const SESSION_PAYLOAD = "dlr-digital-tap:admin-session:v1"
const SESSION_TTL_MS = 12 * 60 * 60 * 1000
const encoder = new TextEncoder()

// SESSION_SECRET is a dedicated high-entropy HMAC key so a captured token is
// not an offline oracle for the interactive password. ADMIN_PASSWORD is the
// fallback for deployments that haven't set it yet.
function secret(env: Env): string | undefined {
  return env.SESSION_SECRET ?? env.ADMIN_PASSWORD
}

async function hmacHex(key: string, message: string): Promise<string> {
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  )
  const sig = await crypto.subtle.sign("HMAC", cryptoKey, encoder.encode(message))
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("")
}

export async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(value))
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("")
}

/** Constant-time compare of equal-length strings. */
function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export async function verifyAdminPassword(env: Env, candidate: string | undefined): Promise<boolean> {
  if (!env.ADMIN_PASSWORD || !candidate) return false
  // Hash both sides first so safeCompare never leaks the password length.
  const [a, b] = await Promise.all([sha256Hex(candidate), sha256Hex(env.ADMIN_PASSWORD)])
  return safeCompare(a, b)
}

/** Session token: "<expiryMs>.<HMAC(payload:expiry)>" — expiry is enforced
 *  server-side in verifySessionToken, so a token cannot outlive its window. */
export async function createSessionToken(env: Env): Promise<string> {
  const exp = (Date.now() + SESSION_TTL_MS).toString()
  const sig = await hmacHex(secret(env)!, `${SESSION_PAYLOAD}:${exp}`)
  return `${exp}.${sig}`
}

export async function verifySessionToken(env: Env, token: string | undefined): Promise<boolean> {
  const s = secret(env)
  if (!s || !token) return false
  const dot = token.indexOf(".")
  if (dot <= 0) return false
  const exp = token.slice(0, dot)
  const sig = token.slice(dot + 1)
  const expMs = Number(exp)
  if (!Number.isFinite(expMs) || expMs < Date.now()) return false
  return safeCompare(sig, await hmacHex(s, `${SESSION_PAYLOAD}:${exp}`))
}

export function getCookie(request: Request, name: string): string | undefined {
  const header = request.headers.get("Cookie")
  if (!header) return undefined
  for (const part of header.split(";")) {
    const [k, ...v] = part.trim().split("=")
    if (k === name) return v.join("=")
  }
  return undefined
}
