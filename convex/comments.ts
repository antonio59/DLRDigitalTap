import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const submit = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    comment: v.string(),
    imageStorageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    let imageUrl: string | undefined

    if (args.imageStorageId) {
      imageUrl = await ctx.storage.getUrl(args.imageStorageId) ?? undefined
    }

    await ctx.db.insert("comments", {
      userId: args.userId,
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
    const limit = args.limit ?? 50
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

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl()
  },
})
