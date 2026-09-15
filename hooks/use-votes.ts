"use client"

import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Id } from "@/convex/_generated/dataModel"
import { getStoredVoterToken, getVoterToken } from "@/lib/voter-token"
import { useConvexAvailable } from "@/components/convex-provider"

export function useVotes() {
  const isConvexAvailable = useConvexAvailable()
  const voterToken = typeof window !== "undefined" ? getStoredVoterToken() : ""

  const submitVote = useMutation(api.votes.submit)
  const totalVotesQuery = useQuery(api.votes.getTotal, isConvexAvailable ? {} : "skip")
  const hasVotedQuery = useQuery(
    api.votes.hasUserVoted,
    isConvexAvailable && voterToken ? { userId: voterToken } : "skip"
  )

  const submit = async (feedback?: string) => {
    if (!isConvexAvailable) {
      return { success: false, error: "Service not available" }
    }

    const token = await getVoterToken()
    if (!token) {
      return { success: false, error: "Could not start a voting session. Please try again later." }
    }

    try {
      const result = await submitVote({
        tokenId: token as Id<"voterTokens">,
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
