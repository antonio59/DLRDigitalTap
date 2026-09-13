import { createHmac, timingSafeEqual } from "node:crypto"

const SESSION_PAYLOAD = "dlr-digital-tap:admin-session:v1"

function secret(): string | undefined {
  return process.env.ADMIN_API_KEY ?? process.env.ADMIN_PASSWORD
}

function sha256(value: string): Buffer {
  return createHmac("sha256", "compare-key").update(value).digest()
}

/** Timing-safe string comparison that tolerates different lengths. */
export function safeCompare(a: string | undefined, b: string | undefined): boolean {
  if (!a || !b) return false
  const da = sha256(a)
  const db = sha256(b)
  return timingSafeEqual(da, db)
}

export function verifyAdminPassword(candidate: string | undefined): boolean {
  const password = process.env.ADMIN_PASSWORD
  return safeCompare(candidate, password)
}

/** Stateless session token: HMAC of a fixed payload, keyed by the admin secret. */
export function createSessionToken(): string {
  return createHmac("sha256", secret()!).update(SESSION_PAYLOAD).digest("hex")
}

export function verifySessionToken(token: string | undefined): boolean {
  const s = secret()
  if (!s) return false
  const expected = createHmac("sha256", s).update(SESSION_PAYLOAD).digest("hex")
  return safeCompare(token, expected)
}
