"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Heart, MessageCircle, Calendar, Users, Target, TrendingUp, Upload, X, Share2, Mail } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import VoteButton from "./vote-button"
import PrototypeBanner from "./prototype-banner"
import DisclaimerFooter from "./disclaimer-footer"
import { getComments, submitComment, getTotalVotes } from "@/actions/database"

interface VotePageProps {
  onNavigate: (page: string) => void
}

interface Comment {
  id: string
  name: string
  comment: string
  created_at: string
  image_url?: string
}

export default function VotePage({ onNavigate }: VotePageProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [userName, setUserName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [voteCount, setVoteCount] = useState(1458)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [commentsResult, votesResult] = await Promise.all([getComments(), getTotalVotes()])

      if (commentsResult.success) {
        setComments(commentsResult.comments)
      }

      if (votesResult.success) {
        setVoteCount(votesResult.count)
      }
    } catch (error) {
      console.error("Error loading data:", error)
    }
  }

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB.",
          variant: "destructive",
        })
        return
      }

      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file.",
          variant: "destructive",
        })
        return
      }

      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newComment.trim() || !userName.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in both your name and comment.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("name", userName.trim())
      formData.append("comment", newComment.trim())
      if (selectedImage) {
        formData.append("image", selectedImage)
      }

      const result = await submitComment(formData)

      if (result.success) {
        toast({
          title: "Comment posted!",
          description: "Thank you for sharing your thoughts!",
          variant: "default",
        })

        // Reset form
        setNewComment("")
        setUserName("")
        setSelectedImage(null)
        setImagePreview(null)

        // Reload comments
        loadData()
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to post comment. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post comment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const progressPercentage = Math.min((voteCount / 2000) * 100, 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <PrototypeBanner />
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button
                variant="ghost"
                onClick={() => onNavigate("home")}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <button
                  onClick={() => onNavigate("home")}
                  className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </button>
                <button
                  onClick={() => onNavigate("about")}
                  className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  About
                </button>
                <button
                  onClick={() => onNavigate("vote")}
                  className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Vote
                </button>
                <button
                  onClick={() => onNavigate("contact")}
                  className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Campaign Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Vote for DLR Digital Tap</h1>
          <p className="text-xl text-gray-600 mb-6">
            Help us bring revolutionary contactless travel to the DLR network
          </p>
          <VoteButton />
        </div>

        {/* Campaign Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{voteCount.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Total Votes</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{comments.length}</div>
              <div className="text-sm text-gray-500">Comments Shared</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-cyan-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">Ongoing</div>
              <div className="text-sm text-gray-500">Campaign Status</div>
            </CardContent>
          </Card>
        </div>

        {/* Campaign Info */}
        <Card className="mb-8 border-2 border-cyan-200 bg-cyan-50">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ongoing Campaign</h3>
              <p className="text-gray-700">
                We engage with TfL regularly through social media, sharing your feedback and the growing support for Digital Tap. 
                Your vote and comments help us demonstrate continued demand for this improvement to the DLR network.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Share Section */}
        <Card className="mb-8 border-2 border-purple-200 bg-purple-50">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center justify-center">
                <Share2 className="h-5 w-5 mr-2 text-purple-600" />
                Help Spread the Word
              </h3>
              <p className="text-gray-600 mb-4">
                Share this campaign with fellow DLR passengers and help us reach our goal faster!
              </p>
              <div className="flex justify-center gap-3 flex-wrap">
                <Button
                  variant="outline"
                  onClick={() => {
                    const url = window.location.href
                    const text = "Help bring digital tap technology to the DLR! Vote for this campaign to make our journeys easier and more accessible."
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
                  }}
                  className="bg-white"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share on Twitter
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    const url = window.location.href
                    const subject = "Support DLR Digital Tap Campaign"
                    const body = `I just voted for the DLR Digital Tap campaign!\n\nThis citizen-led proposal would bring automatic digital tap technology to the DLR, making journeys easier, more accessible, and more convenient for everyone.\n\nCheck it out and vote: ${url}\n\nEvery vote strengthens our ongoing campaign and shows TfL there's genuine demand for this improvement.`
                    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
                  }}
                  className="bg-white"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Share via Email
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href)
                    toast({
                      title: "Link copied!",
                      description: "Campaign link copied to clipboard",
                    })
                  }}
                  className="bg-white"
                >
                  Copy Link
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Campaign Details */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Campaign Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Our Mission</h3>
                <p className="text-gray-600">
                  We're campaigning to bring digital tap technology to the DLR network, making travel more convenient,
                  accessible, and efficient for all passengers. Your vote helps demonstrate public support for this
                  innovation.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What Happens Next?</h3>
                <p className="text-gray-600">
                  We engage with TfL regularly through social media, sharing growing support and passenger feedback. 
                  Your vote and comments help demonstrate real demand for this improvement to the DLR network.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Timeline</h3>
                <p className="text-gray-600">
                  This is an ongoing campaign with regular monthly updates shared via social media about our
                  progress and any developments with TfL.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add Comment Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="h-5 w-5 mr-2" />
              Share Your Thoughts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitComment} className="space-y-4">
              <div>
                <Label htmlFor="userName">Your Name</Label>
                <Input
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="comment">Comment</Label>
                <Textarea
                  id="comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts about DLR Digital Tap..."
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="image">Add Image (Optional)</Label>
                <div className="mt-2">
                  {imagePreview ? (
                    <div className="relative inline-block">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                        onClick={removeImage}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Input id="image" type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
                      <Button type="button" variant="outline" onClick={() => document.getElementById("image")?.click()}>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Image
                      </Button>
                      <span className="text-sm text-gray-500">Max 5MB</span>
                    </div>
                  )}
                </div>
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Posting..." : "Post Comment"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Comments Feed */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="h-5 w-5 mr-2" />
              Community Feedback ({comments.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                        <span className="text-white font-medium text-sm">{comment.name.charAt(0).toUpperCase()}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-gray-900">{comment.name}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {formatDate(comment.created_at)}
                        </Badge>
                      </div>
                      <p className="mt-2 text-gray-600">{comment.comment}</p>
                      {comment.image_url && (
                        <div className="mt-3">
                          <img
                            src={comment.image_url || "/placeholder.svg"}
                            alt="Comment attachment"
                            className="max-w-sm rounded-lg shadow-sm"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {comments.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No comments yet. Be the first to share your thoughts!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <DisclaimerFooter />
    </div>
  )
}
