import type { Env } from "./env"

const SESSION_PAYLOAD = "dlr-digital-tap:admin-session:v1"
const encoder = new TextEncoder()

function secret(env: Env): string | undefined {
  return env.ADMIN_API_KEY ?? env.ADMIN_PASSWORD
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

async function sha256Hex(value: string): Promise<string> {
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

/** Stateless session token: HMAC of a fixed payload, keyed by the admin secret. */
export async function createSessionToken(env: Env): Promise<string> {
  return hmacHex(secret(env)!, SESSION_PAYLOAD)
}

export async function verifySessionToken(env: Env, token: string | undefined): Promise<boolean> {
  const s = secret(env)
  if (!s || !token) return false
  return safeCompare(token, await hmacHex(s, SESSION_PAYLOAD))
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
