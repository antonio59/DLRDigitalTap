import { ConvexHttpClient } from "convex/browser"

let _convexServer: ConvexHttpClient | null = null

export function getConvexServer(): ConvexHttpClient {
  if (!_convexServer) {
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL
    if (!convexUrl) {
      throw new Error("NEXT_PUBLIC_CONVEX_URL environment variable is not set")
    }
    _convexServer = new ConvexHttpClient(convexUrl)
  }
  return _convexServer
}
