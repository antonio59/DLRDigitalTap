import { json, type FunctionContext } from "../../_lib/env"
import { createSessionToken, verifyAdminPassword } from "../../_lib/admin"

const COOKIE_NAME = "admin_session"
const MAX_AGE_SECONDS = 60 * 60 * 12

export async function onRequestPost({ request, env }: FunctionContext): Promise<Response> {
  if (!env.ADMIN_PASSWORD) {
    return json({ error: "Admin is not configured" }, 503)
  }

  let password = ""
  try {
    const body = (await request.json()) as { password?: string }
    password = body.password ?? ""
  } catch {
    return json({ error: "Invalid request" }, 400)
  }

  if (!(await verifyAdminPassword(env, password))) {
    return json({ error: "Unauthorised" }, 401)
  }

  const token = await createSessionToken(env)
  const secure = new URL(request.url).protocol === "https:" ? "; Secure" : ""
  const cookie =
    `${COOKIE_NAME}=${token}; HttpOnly; SameSite=Strict; Path=/` +
    `; Max-Age=${MAX_AGE_SECONDS}${secure}`

  return json({ success: true }, 200, { "Set-Cookie": cookie })
}
