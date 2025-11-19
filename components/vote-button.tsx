"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { submitVote, getTotalVotes, hasUserVoted } from "@/actions/database"

export default function VoteButton() {
  const [voteCount, setVoteCount] = useState(1458)
  const [hasVoted, setHasVoted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadVoteData()
  }, [])

  const loadVoteData = async () => {
    try {
      const [totalVotes, userHasVoted] = await Promise.all([getTotalVotes(), hasUserVoted()])

      if (totalVotes.success) {
        setVoteCount(totalVotes.count)
      }

      if (userHasVoted.success) {
        setHasVoted(userHasVoted.hasVoted)
      }
    } catch (error) {
      console.error("Error loading vote data:", error)
    }
  }

  const handleVote = async () => {
    if (hasVoted) {
      toast({
        title: "Already voted!",
        description: "You've already cast your vote for Digital Tap.",
        variant: "default",
      })
      return
    }

    setIsLoading(true)

    try {
      const result = await submitVote()

      if (result.success) {
        setVoteCount((prev) => prev + 1)
        setHasVoted(true)
        toast({
          title: "Vote submitted!",
          description: "Thank you for supporting Digital Tap!",
          variant: "default",
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to submit vote. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit vote. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleVote}
      disabled={isLoading || hasVoted}
      className={`flex items-center space-x-2 ${
        hasVoted ? "bg-green-600 hover:bg-green-700" : "bg-red-500 hover:bg-red-600"
      } text-white`}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Heart className={`h-4 w-4 ${hasVoted ? "fill-current" : ""}`} />
      )}
      <span>
        {hasVoted ? "Voted!" : "Vote for Digital Tap"} ({voteCount.toLocaleString()})
      </span>
    </Button>
  )
}
