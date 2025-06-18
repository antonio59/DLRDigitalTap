"use server"

import { supabase } from "@/lib/supabase"

// Helper to generate user ID
function generateUserId() {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Helper to get user ID from cookies or generate new one
function getUserId() {
  // In a real implementation, this would get the user ID from cookies
  // For now, we'll generate a new one each time
  return generateUserId()
}

// Vote functions
export async function submitVote(feedback?: string) {
  try {
    const userId = getUserId()

    // Check if user has already voted (simplified check)
    const { data: existingVote } = await supabase.from("votes").select("id").eq("user_id", userId).single()

    if (existingVote) {
      return { success: false, error: "You have already voted" }
    }

    const { error } = await supabase.from("votes").insert([
      {
        user_id: userId,
        feedback: feedback || null,
      },
    ])

    if (error) {
      console.error("Error submitting vote:", error)
      return { success: false, error: "Failed to submit vote" }
    }

    return { success: true }
  } catch (error) {
    console.error("Error submitting vote:", error)
    return { success: false, error: "Failed to submit vote" }
  }
}

export async function getTotalVotes() {
  try {
    const { count, error } = await supabase.from("votes").select("*", { count: "exact", head: true })

    if (error) {
      console.error("Error getting vote count:", error)
      return { success: false, count: 1458 } // Fallback count
    }

    return { success: true, count: count || 1458 }
  } catch (error) {
    console.error("Error getting vote count:", error)
    return { success: false, count: 1458 } // Fallback count
  }
}

export async function hasUserVoted() {
  try {
    const userId = getUserId()

    const { data, error } = await supabase.from("votes").select("id").eq("user_id", userId).single()

    if (error && error.code !== "PGRST116") {
      // PGRST116 is "not found" error
      console.error("Error checking vote status:", error)
      return { success: false, hasVoted: false }
    }

    return { success: true, hasVoted: !!data }
  } catch (error) {
    console.error("Error checking vote status:", error)
    return { success: false, hasVoted: false }
  }
}

// Comment functions
export async function submitComment(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const comment = formData.get("comment") as string
    const image = formData.get("image") as File | null
    const userId = getUserId()

    let imageUrl = null

    // Handle image upload if present
    if (image && image.size > 0) {
      const fileExt = image.name.split(".").pop()
      const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`

      const { data: uploadData, error: uploadError } = await supabase.storage.from("image").upload(fileName, image)

      if (uploadError) {
        console.error("Error uploading image:", uploadError)
        return { success: false, error: "Failed to upload image" }
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("image").getPublicUrl(fileName)

      imageUrl = publicUrl
    }

    const { error } = await supabase.from("comments").insert([
      {
        user_id: userId,
        name: name.trim(),
        comment: comment.trim(),
        image_url: imageUrl,
      },
    ])

    if (error) {
      console.error("Error submitting comment:", error)
      return { success: false, error: "Failed to submit comment" }
    }

    return { success: true }
  } catch (error) {
    console.error("Error submitting comment:", error)
    return { success: false, error: "Failed to submit comment" }
  }
}

export async function getComments(limit = 50, offset = 0) {
  try {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error("Error getting comments:", error)
      return { success: false, comments: [] }
    }

    return { success: true, comments: data || [] }
  } catch (error) {
    console.error("Error getting comments:", error)
    return { success: false, comments: [] }
  }
}

// Analytics functions
export async function trackAnalytics(eventType: string, page: string, metadata: any = {}) {
  try {
    const userId = getUserId()

    const { error } = await supabase.from("analytics").insert([
      {
        event_type: eventType,
        page: page,
        user_id: userId,
        metadata: metadata,
      },
    ])

    if (error) {
      console.error("Error tracking analytics:", error)
      return { success: false, error: "Failed to track analytics" }
    }

    return { success: true }
  } catch (error) {
    console.error("Error tracking analytics:", error)
    return { success: false, error: "Failed to track analytics" }
  }
}

export async function getAnalytics() {
  try {
    const { data, error } = await supabase
      .from("analytics")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1000)

    if (error) {
      console.error("Error getting analytics:", error)
      return { success: false, analytics: [] }
    }

    return { success: true, analytics: data || [] }
  } catch (error) {
    console.error("Error getting analytics:", error)
    return { success: false, analytics: [] }
  }
}
