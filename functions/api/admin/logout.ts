import { json, type FunctionContext } from "../../_lib/env"

const COOKIE_NAME = "admin_session"

export async function onRequestPost({ request }: FunctionContext): Promise<Response> {
  const secure = new URL(request.url).protocol === "https:" ? "; Secure" : ""
  const cookie =
    `${COOKIE_NAME}=; HttpOnly; SameSite=Strict; Path=/` +
    `; Max-Age=0${secure}`
  return json({ success: true }, 200, { "Set-Cookie": cookie })
}
