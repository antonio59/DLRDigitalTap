"use client"

import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { getUserId } from "@/lib/user-id"

export function useAnalytics() {
  const trackMutation = useMutation(api.analytics.track)
  const analyticsQuery = useQuery(api.analytics.list, { limit: 1000 })

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

  return {
    track,
    analytics: analyticsQuery?.analytics ?? [],
    isLoading: analyticsQuery === undefined,
  }
}
