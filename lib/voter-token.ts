// Server-issued single-use action tokens, minted by /api/voter-token
// (rate-limited per source IP). Votes reuse a persisted token so the
// "already voted" state survives reloads; comments mint a fresh token per
// submission.
const VOTER_TOKEN_KEY = "ldt_voter_token"

export function getStoredVoterToken(): string {
  if (typeof window === "undefined") return ""
  return localStorage.getItem(VOTER_TOKEN_KEY) ?? ""
}

export async function mintActionToken(): Promise<string | null> {
  try {
    const response = await fetch("/api/voter-token", { method: "POST" })
    const data = await response.json()
    if (!response.ok || !data.success || !data.token) return null
    return data.token as string
  } catch {
    return null
  }
}

export async function getVoterToken(): Promise<string | null> {
  const stored = getStoredVoterToken()
  if (stored) return stored
  const token = await mintActionToken()
  if (token) localStorage.setItem(VOTER_TOKEN_KEY, token)
  return token
}
