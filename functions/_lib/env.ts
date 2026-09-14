export interface Env {
  ADMIN_PASSWORD?: string
  NEXT_PUBLIC_CONVEX_URL?: string
  RESEND_API_KEY?: string
  CONTACT_TO_EMAIL?: string
}

export interface FunctionContext {
  request: Request
  env: Env
}

export function json(data: unknown, status = 200, extraHeaders?: HeadersInit): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...extraHeaders },
  })
}
