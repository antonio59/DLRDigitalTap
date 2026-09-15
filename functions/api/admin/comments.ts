import { json, type FunctionContext } from "../../_lib/env"
import { getCookie, verifySessionToken } from "../../_lib/admin"
import { convexMutation } from "../../_lib/convex"

// Admin moderation endpoint: deletes a comment row and its attached storage
// blob via the admin-gated comments:remove mutation. Requires a valid
// admin_session cookie.
export async function onRequestPost({ request, env }: FunctionContext): Promise<Response> {
  if (!(await verifySessionToken(env, getCookie(request, "admin_session")))) {
    return json({ error: "Unauthorised" }, 401)
  }

  const convexUrl = env.NEXT_PUBLIC_CONVEX_URL
  if (!convexUrl || !env.ADMIN_PASSWORD) {
    return json({ error: "Moderation is not configured" }, 503)
  }

  let commentId = ""
  try {
    const body = (await request.json()) as { commentId?: string }
    commentId = body.commentId ?? ""
  } catch {
    return json({ error: "Invalid request" }, 400)
  }

  if (!commentId) {
    return json({ error: "Missing commentId" }, 400)
  }

  try {
    const result = await convexMutation<{ success: boolean; error?: string }>(
      convexUrl,
      "comments:remove",
      { commentId, adminToken: env.ADMIN_PASSWORD },
    )
    if (!result.success) {
      return json({ error: result.error ?? "Failed to delete comment" }, 400)
    }
    return json({ success: true })
  } catch (error) {
    console.error("Comment deletion failed:", error)
    return json({ error: "Failed to delete comment" }, 502)
  }
}
