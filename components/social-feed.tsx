"use client"

import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SocialFeed() {
  useEffect(() => {
    // Load Twitter widget script
    const script = document.createElement("script")
    script.src = "https://platform.twitter.com/widgets.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <svg
            className="h-5 w-5 mr-2 text-blue-400"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M8.29 20.251c7.547 0 11.75-6.258 11.75-11.75 0-.177 0-.35-.012-.523A8.405 8.405 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
          Latest Updates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="min-h-[400px]">
          <a
            className="twitter-timeline"
            data-height="400"
            href="https://twitter.com/dlrdigitaltap?ref_src=twsrc%5Etfw"
          >
            Tweets by dlrdigitaltap
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
