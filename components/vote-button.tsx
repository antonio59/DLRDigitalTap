"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useVotes } from "@/hooks/use-votes"

export default function VoteButton() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const { submit, totalVotes, hasVoted, isLoading } = useVotes()

  const handleVote = async () => {
    if (hasVoted) {
      toast({
        title: "Already voted!",
        description: "You've already cast your vote for Digital Tap.",
        variant: "default",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const result = await submit()

      if (result.success) {
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
      setIsSubmitting(false)
    }
  }

  return (
    <Button
      onClick={handleVote}
      disabled={isLoading || isSubmitting || hasVoted}
      className={`flex items-center space-x-2 ${
        hasVoted ? "bg-green-600 hover:bg-green-700" : "bg-red-500 hover:bg-red-600"
      } text-white`}
    >
      {isSubmitting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Heart className={`h-4 w-4 ${hasVoted ? "fill-current" : ""}`} />
      )}
      <span>
        {hasVoted ? "Voted!" : "Vote for Digital Tap"} ({totalVotes.toLocaleString()})
      </span>
    </Button>
  )
}
