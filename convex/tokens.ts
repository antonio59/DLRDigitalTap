import { v } from "convex/values"
import { mutation } from "./_generated/server"

const TOKEN_LIMIT = 5
const TOKEN_WINDOW_MS = 24 * 60 * 60 * 1000

// Mints a single-use action token. Only callable by the /api/voter-token Pages
// Function, which supplies the shared issuer secret and a SHA-256 hash of the
// caller's IP as the rate-limit key. Public callers cannot mint tokens because
// they cannot supply the secret.
export const issue = mutation({
  args: {
    key: v.string(),
    issuerSecret: v.string(),
  },
  handler: async (ctx, args) => {
    const secret = process.env.TOKEN_ISSUER_SECRET
    if (!secret || args.issuerSecret !== secret) {
      return { success: false, error: "Unauthorised" }
    }
    if (args.key.length === 0 || args.key.length > 128) {
      return { success: false, error: "Invalid request" }
    }

    const now = Date.now()
    const rl = await ctx.db
      .query("rateLimits")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .first()

    if (rl && now - rl.windowStart < TOKEN_WINDOW_MS && rl.count >= TOKEN_LIMIT) {
      return { success: false, error: "Too many requests. Please try again tomorrow." }
    }
    if (!rl || now - rl.windowStart >= TOKEN_WINDOW_MS) {
      if (rl) {
        await ctx.db.patch(rl._id, { windowStart: now, count: 1 })
      } else {
        await ctx.db.insert("rateLimits", { key: args.key, windowStart: now, count: 1 })
      }
    } else {
      await ctx.db.patch(rl._id, { count: rl.count + 1 })
    }

    const tokenId = await ctx.db.insert("voterTokens", { used: false })
    return { success: true, token: tokenId }
  },
})
