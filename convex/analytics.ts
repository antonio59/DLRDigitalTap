import { v } from "convex/values"
import { internalQuery, mutation } from "./_generated/server"

const ALLOWED_EVENT_TYPES = new Set([
  "prototype_view",
  "prototype_tap_in",
  "prototype_tap_out",
  "prototype_interchange",
])

export const track = mutation({
  args: {
    eventType: v.string(),
    page: v.string(),
    userId: v.optional(v.string()),
    metadata: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    if (
      !ALLOWED_EVENT_TYPES.has(args.eventType) ||
      args.page.length > 256 ||
      (args.userId !== undefined && args.userId.length > 128)
    ) {
      return { success: false, error: "Invalid event" }
    }

    let metadata = args.metadata
    if (metadata !== undefined) {
      try {
        if (JSON.stringify(metadata).length > 4096) metadata = undefined
      } catch {
        metadata = undefined
      }
    }

    await ctx.db.insert("analytics", {
      eventType: args.eventType,
      page: args.page,
      userId: args.userId,
      metadata,
    })

    return { success: true }
  },
})

// Internal-only: visitor telemetry (pseudonymous user_id + per-event metadata)
// must not be anonymously enumerable. Operator access goes through the Convex
// dashboard or an internal caller.
export const list = internalQuery({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = Math.min(Math.max(args.limit ?? 100, 1), 500)
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
