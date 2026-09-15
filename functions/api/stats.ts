import { json, type FunctionContext } from "../_lib/env"
import { getCookie, verifySessionToken } from "../_lib/admin"
import { convexQuery, type ConvexComment } from "../_lib/convex"

async function isAuthorised({ request, env }: FunctionContext): Promise<boolean> {
  return verifySessionToken(env, getCookie(request, "admin_session"))
}

export async function onRequestGet(context: FunctionContext): Promise<Response> {
  try {
    if (!(await isAuthorised(context))) {
      return json({ error: "Unauthorised" }, 401)
    }

    const convexUrl = context.env.NEXT_PUBLIC_CONVEX_URL
    if (!convexUrl) {
      return json({ error: "Convex is not configured" }, 503)
    }

    const [votesResult, commentsResult] = await Promise.all([
      convexQuery<{ count?: number }>(convexUrl, "votes:getTotal"),
      convexQuery<{ comments?: ConvexComment[] }>(convexUrl, "comments:list", { limit: 100 }),
    ])

    const comments = commentsResult.comments ?? []
    const now = new Date()
    const campaignStart = new Date("2024-01-01")
    const daysSinceLaunch = Math.floor(
      (now.getTime() - campaignStart.getTime()) / (1000 * 60 * 60 * 24),
    )
    const recentComments = comments.filter(
      (c) => now.getTime() - new Date(c.created_at).getTime() <= 30 * 24 * 60 * 60 * 1000,
    )

    return json({
      totalVotes: votesResult.count ?? 0,
      totalComments: comments.length,
      recentComments: recentComments.length,
      daysSinceLaunch,
      lastUpdated: now.toISOString(),
      topComments: comments.slice(0, 5).map((c) => ({
        id: c.id,
        name: c.name,
        comment: c.comment,
        date: c.created_at,
      })),
    })
  } catch (error) {
    console.error("Error fetching stats:", error)
    return json({ error: "Failed to fetch statistics" }, 500)
  }
}
