import { v } from "convex/values"
import { internalMutation, mutation } from "./_generated/server"

// GDPR/UK-DPA erasure path promised in app/privacy/page.tsx: deletes every
// vote, comment (with its image blob), and analytics row tied to a userId.
// Gated by the shared admin secret, injected server-side by a Pages Function
// or invoked manually from the Convex dashboard by the operator.
export const eraseUser = mutation({
  args: {
    userId: v.string(),
    adminToken: v.string(),
  },
  handler: async (ctx, args) => {
    const secret = process.env.ADMIN_PASSWORD
    if (!secret || args.adminToken !== secret) {
      return { success: false, error: "Unauthorised" }
    }

    let deleted = 0

    const votes = await ctx.db
      .query("votes")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect()
    for (const row of votes) {
      await ctx.db.delete(row._id)
      deleted++
    }

    const comments = await ctx.db
      .query("comments")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect()
    for (const row of comments) {
      if (row.imageStorageId) {
        await ctx.storage.delete(row.imageStorageId)
      }
      await ctx.db.delete(row._id)
      deleted++
    }

    const analytics = await ctx.db
      .query("analytics")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect()
    for (const row of analytics) {
      await ctx.db.delete(row._id)
      deleted++
    }

    return { success: true, deleted }
  },
})

const PENDING_UPLOAD_TTL_MS = 24 * 60 * 60 * 1000

// Sweeps pendingUploads older than the TTL: deletes the blob if the client
// completed the upload, then removes the intent row. This is the reclamation
// path for blobs minted but never attached to a comment.
export const cleanupPendingUploads = internalMutation({
  args: {},
  handler: async (ctx) => {
    const cutoff = Date.now() - PENDING_UPLOAD_TTL_MS
    const stale = await ctx.db
      .query("pendingUploads")
      .collect()

    let removed = 0
    for (const row of stale) {
      if (row._creationTime > cutoff) continue
      if (row.storageId) {
        await ctx.storage.delete(row.storageId)
      }
      await ctx.db.delete(row._id)
      removed++
    }
    return { removed }
  },
})
