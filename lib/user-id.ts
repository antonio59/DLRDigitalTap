// Client-side user ID management
const USER_ID_KEY = "ldt_user_id"

function generateUserId(): string {
  const timestamp = Date.now()
  const randomPart = Math.random().toString(36).substring(2, 15)
  return `user_${timestamp}_${randomPart}`
}

export function getUserId(): string {
  if (typeof window === "undefined") {
    return ""
  }

  let userId = localStorage.getItem(USER_ID_KEY)

  if (!userId) {
    userId = generateUserId()
    localStorage.setItem(USER_ID_KEY, userId)
  }

  return userId
}

export function clearUserId(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(USER_ID_KEY)
  }
}
