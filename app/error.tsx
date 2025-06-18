"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Home, RefreshCw } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset?: () => void
}) {
  useEffect(() => {
    console.error("Application error:", error)
  }, [error])

  const handleReset = () => {
    try {
      if (reset && typeof reset === "function") {
        reset()
      } else {
        // Fallback to page reload if reset is not available
        window.location.reload()
      }
    } catch (err) {
      console.error("Error during reset:", err)
      window.location.reload()
    }
  }

  const handleGoHome = () => {
    try {
      window.location.href = "/"
    } catch (err) {
      console.error("Error navigating home:", err)
      window.location.reload()
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="text-xl font-semibold text-gray-900">Something went wrong</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-gray-600">
            We encountered an unexpected error. Please try again or return to the homepage.
          </p>

          <div className="flex flex-col space-y-2">
            <Button onClick={handleReset} className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>

            <Button onClick={handleGoHome} variant="outline" className="w-full">
              <Home className="h-4 w-4 mr-2" />
              Go to Homepage
            </Button>
          </div>

          {error.digest && (
            <div className="mt-4 p-3 bg-gray-50 rounded-md">
              <p className="text-xs text-gray-500">Error ID: {error.digest}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
