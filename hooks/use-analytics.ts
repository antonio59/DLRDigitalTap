"use client"

import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { getUserId } from "@/lib/user-id"

export function useAnalytics() {
  const trackMutation = useMutation(api.analytics.track)

  const track = async (eventType: string, page: string, metadata?: any) => {
    const userId = getUserId()

    try {
      await trackMutation({
        eventType,
        page,
        userId: userId || undefined,
        metadata,
      })
      return { success: true }
    } catch (error: any) {
      console.error("Error tracking analytics:", error)
      return { success: false, error: error.message || "Failed to track analytics" }
    }
  }

  return { track }
}
