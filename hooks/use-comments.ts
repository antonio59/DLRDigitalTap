"use client"

import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Id } from "@/convex/_generated/dataModel"
import { mintActionToken } from "@/lib/voter-token"

export function useComments(limit?: number) {
  const submitComment = useMutation(api.comments.submit)
  const generateUploadUrl = useMutation(api.comments.generateUploadUrl)
  const confirmUpload = useMutation(api.comments.confirmUpload)
  const commentsQuery = useQuery(api.comments.list, { limit })

  const submit = async (name: string, comment: string, image?: File) => {
    // Each comment consumes a fresh single-use token (rate-limited per IP).
    const token = (await mintActionToken()) as Id<"voterTokens"> | null
    if (!token) {
      return { success: false, error: "Could not start a session. Please try again later." }
    }

    try {
      let imageStorageId: any = undefined

      if (image) {
        const mint = await generateUploadUrl({ tokenId: token })
        const response = await fetch(mint.uploadUrl, {
          method: "POST",
          headers: { "Content-Type": image.type },
          body: image,
        })

        if (!response.ok) {
          return { success: false, error: "Failed to upload image" }
        }

        const { storageId } = await response.json()
        const confirmed = await confirmUpload({
          pendingId: mint.pendingId,
          tokenId: token,
          storageId,
        })
        if (!confirmed?.success) {
          return { success: false, error: "Failed to register image" }
        }
        imageStorageId = storageId
      }

      const result = await submitComment({
        tokenId: token,
        name: name.trim(),
        comment: comment.trim(),
        imageStorageId,
      })

      return result
    } catch (error: any) {
      return { success: false, error: error.message || "Failed to submit comment" }
    }
  }

  return {
    submit,
    comments: commentsQuery?.comments ?? [],
    isLoading: commentsQuery === undefined,
  }
}
