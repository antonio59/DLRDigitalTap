import type { FunctionContext } from "../_lib/env"

const UMAMI_SEND_URL = "https://umami.antoniosmith.xyz/api/send"

export async function onRequestPost({ request }: FunctionContext): Promise<Response> {
  const upstream = await fetch(UMAMI_SEND_URL, {
    method: "POST",
    headers: {
      "Content-Type": request.headers.get("Content-Type") ?? "application/json",
      "User-Agent": request.headers.get("User-Agent") ?? "",
    },
    body: request.body,
  })

  return new Response(upstream.body, {
    status: upstream.status,
    headers: { "Content-Type": upstream.headers.get("Content-Type") ?? "application/json" },
  })
}
