import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const submit = mutation({
  args: {
    userId: v.string(),
    feedback: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if user has already voted
    const existingVote = await ctx.db
      .query("votes")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first()

    if (existingVote) {
      return { success: false, error: "You have already voted" }
    }

    await ctx.db.insert("votes", {
      userId: args.userId,
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
