import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const submit = mutation({
  args: {
    tokenId: v.id("voterTokens"),
    feedback: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (args.feedback !== undefined && args.feedback.length > 500) {
      return { success: false, error: "Feedback must be 500 characters or fewer" }
    }

    // The token is a server-minted, rate-limited capability: it must exist,
    // be unused, and is consumed here so it can only ever record one vote.
    const token = await ctx.db.get(args.tokenId)
    if (!token || token.used) {
      return { success: false, error: "Invalid or already used token" }
    }
    await ctx.db.patch(args.tokenId, { used: true })

    // userId stores the token id — dedupe via the by_user index stays intact
    // and hasUserVoted still works for the legitimate client.
    const userId = String(args.tokenId)

    const existingVote = await ctx.db
      .query("votes")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first()

    if (existingVote) {
      return { success: false, error: "You have already voted" }
    }

    await ctx.db.insert("votes", {
      userId,
      feedback: args.feedback,
    })

    return { success: true }
  },
})

export const getTotal = query({
  args: {},
  handler: async (ctx) => {
    const votes = await ctx.db.query("votes").collect()
    return { success: true, count: votes.length }
  },
})

export const hasUserVoted = query({
  args: {
    userId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = args.userId
    if (!userId) {
      return { success: true, hasVoted: false }
    }

    const existingVote = await ctx.db
      .query("votes")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first()

    return { success: true, hasVoted: !!existingVote }
  },
})
