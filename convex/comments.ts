import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

const MAX_IMAGE_BYTES = 5 * 1024 * 1024
const MAX_PENDING_UPLOADS_PER_TOKEN = 3

export const submit = mutation({
  args: {
    tokenId: v.id("voterTokens"),
    name: v.string(),
    comment: v.string(),
    imageStorageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    if (args.name.trim().length < 1 || args.name.length > 80) {
      return { success: false, error: "Name must be 1-80 characters" }
    }
    if (args.comment.trim().length < 3 || args.comment.length > 1000) {
      return { success: false, error: "Comment must be 3-1000 characters" }
    }

    const token = await ctx.db.get(args.tokenId)
    if (!token || token.used) {
      return { success: false, error: "Invalid or already used token" }
    }

    let imageUrl: string | undefined

    if (args.imageStorageId) {
      // Provenance: the blob must have been registered against this token via
      // generateUploadUrl + confirmUpload — a foreign storageId is rejected.
      const pending = await ctx.db
        .query("pendingUploads")
        .withIndex("by_token", (q) => q.eq("tokenId", args.tokenId))
        .collect()
      const match = pending.find((p) => p.storageId === args.imageStorageId)
      if (!match) {
        return { success: false, error: "Image was not uploaded for this submission" }
      }

      const meta = await ctx.storage.getMetadata(args.imageStorageId)
      if (!meta || !meta.contentType?.startsWith("image/") || meta.size > MAX_IMAGE_BYTES) {
        await ctx.storage.delete(args.imageStorageId)
        await ctx.db.delete(match._id)
        return { success: false, error: "Invalid image" }
      }

      imageUrl = (await ctx.storage.getUrl(args.imageStorageId)) ?? undefined
      await ctx.db.delete(match._id)
    }

    await ctx.db.patch(args.tokenId, { used: true })

    await ctx.db.insert("comments", {
      userId: String(args.tokenId),
      name: args.name,
      comment: args.comment,
      imageUrl,
      imageStorageId: args.imageStorageId,
    })

    return { success: true }
  },
})

export const list = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = Math.min(Math.max(args.limit ?? 50, 1), 200)
    const comments = await ctx.db
      .query("comments")
      .order("desc")
      .take(limit)

    return {
      success: true,
      comments: comments.map((c) => ({
        id: c._id,
        name: c.name,
        comment: c.comment,
        created_at: new Date(c._creationTime).toISOString(),
        image_url: c.imageUrl,
      })),
    }
  },
})

// Mints an upload URL only for a holder of an unused action token, and records
// a pendingUploads intent row so the blob can later be proven (submit) or swept
// (lifecycle cron) — closing the anonymous-mint and orphan-blob holes.
export const generateUploadUrl = mutation({
  args: {
    tokenId: v.id("voterTokens"),
  },
  handler: async (ctx, args) => {
    const token = await ctx.db.get(args.tokenId)
    if (!token || token.used) {
      throw new Error("Invalid or already used token")
    }

    const pending = await ctx.db
      .query("pendingUploads")
      .withIndex("by_token", (q) => q.eq("tokenId", args.tokenId))
      .collect()
    if (pending.length >= MAX_PENDING_UPLOADS_PER_TOKEN) {
      throw new Error("Too many pending uploads")
    }

    const uploadUrl = await ctx.storage.generateUploadUrl()
    const pendingId = await ctx.db.insert("pendingUploads", { tokenId: args.tokenId })
    return { uploadUrl, pendingId }
  },
})

// Called by the client after POSTing bytes to the minted upload URL, so the
// resulting storageId is bound to the pending intent (and therefore the token).
export const confirmUpload = mutation({
  args: {
    pendingId: v.id("pendingUploads"),
    tokenId: v.id("voterTokens"),
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const pending = await ctx.db.get(args.pendingId)
    if (!pending || pending.tokenId !== args.tokenId || pending.storageId) {
      return { success: false, error: "Invalid upload" }
    }
    await ctx.db.patch(args.pendingId, { storageId: args.storageId })
    return { success: true }
  },
})

// Admin moderation: deletes a comment row and its attached blob. Gated by the
// shared admin secret, which the session-authenticated Pages Function injects
// server-side — never exposed to the client.
export const remove = mutation({
  args: {
    commentId: v.id("comments"),
    adminToken: v.string(),
  },
  handler: async (ctx, args) => {
    const secret = process.env.ADMIN_PASSWORD
    if (!secret || args.adminToken !== secret) {
      return { success: false, error: "Unauthorised" }
    }
    const comment = await ctx.db.get(args.commentId)
    if (!comment) {
      return { success: false, error: "Not found" }
    }
    if (comment.imageStorageId) {
      await ctx.storage.delete(comment.imageStorageId)
    }
    await ctx.db.delete(args.commentId)
    return { success: true }
  },
})
