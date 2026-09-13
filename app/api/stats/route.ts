import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getConvexServer } from "@/lib/convex-server"
import { api } from "@/convex/_generated/api"

export const dynamic = "force-dynamic"

function isAuthorised(request: Request, cookieValue?: string): boolean {
  const apiKey = process.env.ADMIN_API_KEY
  const adminPassword = process.env.ADMIN_PASSWORD
  const authHeader = request.headers.get("authorization")

  if (apiKey && authHeader === `Bearer ${apiKey}`) {
    return true
  }

  const expectedCookie = apiKey ?? adminPassword
  return Boolean(expectedCookie && cookieValue && cookieValue === expectedCookie)
}

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get("admin_session")?.value

    if (!isAuthorised(request, session)) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 })
    }

    const convexServer = getConvexServer()
    const [votesResult, commentsResult] = await Promise.all([
      convexServer.query(api.votes.getTotal, {}),
      convexServer.query(api.comments.list, { limit: 100 }),
    ])

    const comments = commentsResult.comments || []
    const now = new Date()
    const campaignStart = new Date("2024-01-01")
    const daysSinceLaunch = Math.floor(
      (now.getTime() - campaignStart.getTime()) / (1000 * 60 * 60 * 24)
    )

    const recentComments = comments.filter((c) => {
      const commentDate = new Date(c.created_at)
      const daysSince = Math.floor(
        (now.getTime() - commentDate.getTime()) / (1000 * 60 * 60 * 24)
      )
      return daysSince <= 30
    })

    const stats = {
      totalVotes: votesResult.count || 0,
      totalComments: comments.length,
      recentComments: recentComments.length,
      daysSinceLaunch,
      lastUpdated: now.toISOString(),
      topComments: comments.slice(0, 5).map((c) => ({
        name: c.name,
        comment: c.comment,
        date: c.created_at,
      })),
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json({ error: "Failed to fetch statistics" }, { status: 500 })
  }
}
