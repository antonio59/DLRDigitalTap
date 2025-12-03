import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const track = mutation({
  args: {
    eventType: v.string(),
    page: v.string(),
    userId: v.optional(v.string()),
    metadata: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("analytics", {
      eventType: args.eventType,
      page: args.page,
      userId: args.userId,
      metadata: args.metadata,
    })

    return { success: true }
  },
})

export const list = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 1000
    const analytics = await ctx.db
      .query("analytics")
      .order("desc")
      .take(limit)

    return {
      success: true,
      analytics: analytics.map((a) => ({
        id: a._id,
        event_type: a.eventType,
        page: a.page,
        user_id: a.userId,
        metadata: a.metadata,
        created_at: new Date(a._creationTime).toISOString(),
      })),
    }
  },
})
