import { NextResponse } from "next/server";
import { getTotalVotes, getComments } from "@/actions/database";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const apiKey = process.env.ADMIN_API_KEY;

    if (!apiKey || authHeader !== `Bearer ${apiKey}`) {
      return NextResponse.json(
        { error: "Unauthorised" },
        { status: 401 }
      );
    }

    const [totalVotes, comments] = await Promise.all([
      getTotalVotes(),
      getComments(),
    ]);

    const now = new Date();
    const campaignStart = new Date("2024-01-01");
    const daysSinceLaunch = Math.floor(
      (now.getTime() - campaignStart.getTime()) / (1000 * 60 * 60 * 24)
    );

    const recentComments = comments
      .filter((c) => {
        const commentDate = new Date(c.created_at);
        const daysSince = Math.floor(
          (now.getTime() - commentDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        return daysSince <= 30;
      });

    const stats = {
      totalVotes,
      totalComments: comments.length,
      recentComments: recentComments.length,
      daysSinceLaunch,
      lastUpdated: now.toISOString(),
      topComments: comments
        .slice(0, 5)
        .map((c) => ({
          name: c.name,
          comment: c.comment,
          date: c.created_at,
        })),
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}
