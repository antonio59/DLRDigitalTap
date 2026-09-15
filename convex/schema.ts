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
  })
    .index("by_user", ["userId"]),

  analytics: defineTable({
    eventType: v.string(),
    page: v.string(),
    userId: v.optional(v.string()),
    metadata: v.optional(v.any()),
  })
    .index("by_event_type", ["eventType"])
    .index("by_page", ["page"])
    .index("by_user", ["userId"]),

  // Single-use action tokens minted by the /api/voter-token Pages Function.
  // Issuance is rate-limited per source IP; a token must be presented (and is
  // consumed) by votes.submit, comments.submit and comments.generateUploadUrl.
  voterTokens: defineTable({
    used: v.boolean(),
  }),

  // Fixed-window rate-limit counters. Keys are namespaced SHA-256 hashes
  // (e.g. "tok:<sha256(ip)>", "contact:<sha256(ip)>").
  rateLimits: defineTable({
    key: v.string(),
    windowStart: v.number(),
    count: v.number(),
  })
    .index("by_key", ["key"]),

  // Upload intents registered by generateUploadUrl. The storageId is recorded
  // by confirmUpload so orphaned blobs can be swept by the lifecycle cron and
  // so comments.submit can prove blob provenance.
  pendingUploads: defineTable({
    tokenId: v.id("voterTokens"),
    storageId: v.optional(v.id("_storage")),
  })
    .index("by_token", ["tokenId"]),
})
