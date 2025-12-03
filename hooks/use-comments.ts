"use client"

import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { getUserId } from "@/lib/user-id"

export function useComments(limit?: number) {
  const submitComment = useMutation(api.comments.submit)
  const generateUploadUrl = useMutation(api.comments.generateUploadUrl)
  const commentsQuery = useQuery(api.comments.list, { limit })

  const submit = async (name: string, comment: string, image?: File) => {
    const userId = getUserId()
    if (!userId) {
      return { success: false, error: "Could not identify user" }
    }

    try {
      let imageStorageId: any = undefined

      if (image) {
        const uploadUrl = await generateUploadUrl()
        const response = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": image.type },
          body: image,
        })
        
        if (!response.ok) {
          return { success: false, error: "Failed to upload image" }
        }
        
        const { storageId } = await response.json()
        imageStorageId = storageId
      }

      const result = await submitComment({
        userId,
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
