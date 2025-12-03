"use client"

import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { getUserId } from "@/lib/user-id"
import { useConvexAvailable } from "@/components/convex-provider"

export function useVotes() {
  const isConvexAvailable = useConvexAvailable()
  const userId = typeof window !== "undefined" ? getUserId() : ""
  
  const submitVote = useMutation(api.votes.submit)
  const totalVotesQuery = useQuery(api.votes.getTotal, isConvexAvailable ? {} : "skip")
  const hasVotedQuery = useQuery(
    api.votes.hasUserVoted,
    isConvexAvailable && userId ? { userId } : "skip"
  )

  const submit = async (feedback?: string) => {
    if (!isConvexAvailable) {
      return { success: false, error: "Service not available" }
    }
    
    const currentUserId = getUserId()
    if (!currentUserId) {
      return { success: false, error: "Could not identify user" }
    }
    
    try {
      const result = await submitVote({
        userId: currentUserId,
        feedback,
      })
      return result
    } catch (error: any) {
      return { success: false, error: error.message || "Failed to submit vote" }
    }
  }

  return {
    submit,
    totalVotes: totalVotesQuery?.count ?? 0,
    hasVoted: hasVotedQuery?.hasVoted ?? false,
    isLoading: isConvexAvailable && (totalVotesQuery === undefined || hasVotedQuery === undefined),
  }
}
