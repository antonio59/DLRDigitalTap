import { v } from "convex/values"
import { mutation } from "./_generated/server"

// Generic fixed-window rate-limit counter. Called by Pages Functions before
// performing unauthenticated side effects (e.g. the contact email relay).
// Callers pass a namespaced hash of the source IP; the counter only ever
// increments, so public callers cannot use it to reset anyone's quota.
export const consume = mutation({
  args: {
    key: v.string(),
    limit: v.number(),
    windowMs: v.number(),
  },
  handler: async (ctx, args) => {
    if (
      args.key.length === 0 ||
      args.key.length > 128 ||
      !Number.isFinite(args.limit) ||
      args.limit < 1 ||
      args.limit > 1000 ||
      !Number.isFinite(args.windowMs) ||
      args.windowMs < 1000 ||
      args.windowMs > 30 * 24 * 60 * 60 * 1000
    ) {
      return { allowed: false }
    }

    const now = Date.now()
    const existing = await ctx.db
      .query("rateLimits")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .first()

    if (!existing || now - existing.windowStart >= args.windowMs) {
      if (existing) {
        await ctx.db.patch(existing._id, { windowStart: now, count: 1 })
      } else {
        await ctx.db.insert("rateLimits", {
          key: args.key,
          windowStart: now,
          count: 1,
        })
      }
      return { allowed: true }
    }

    if (existing.count >= args.limit) {
      return { allowed: false }
    }

    await ctx.db.patch(existing._id, { count: existing.count + 1 })
    return { allowed: true }
  },
})
