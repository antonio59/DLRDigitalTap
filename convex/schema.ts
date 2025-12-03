import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  votes: defineTable({
    userId: v.string(),
    feedback: v.optional(v.string()),
  })
    .index("by_user", ["userId"]),

  comments: defineTable({
    userId: v.string(),
    name: v.string(),
    comment: v.string(),
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
  }),

  analytics: defineTable({
    eventType: v.string(),
    page: v.string(),
    userId: v.optional(v.string()),
    metadata: v.optional(v.any()),
  })
    .index("by_event_type", ["eventType"])
    .index("by_page", ["page"])
    .index("by_user", ["userId"]),
})
