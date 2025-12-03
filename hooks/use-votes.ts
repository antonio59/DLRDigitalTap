"use client"

import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { getUserId } from "@/lib/user-id"

export function useVotes() {
  const submitVote = useMutation(api.votes.submit)
  const totalVotesQuery = useQuery(api.votes.getTotal)
  const userId = typeof window !== "undefined" ? getUserId() : ""
  const hasVotedQuery = useQuery(api.votes.hasUserVoted, { userId: userId || undefined })

  const submit = async (feedback?: string) => {
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
    isLoading: totalVotesQuery === undefined || hasVotedQuery === undefined,
  }
}
