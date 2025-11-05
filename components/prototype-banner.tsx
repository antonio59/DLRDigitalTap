"use client"

import { AlertTriangle } from "lucide-react"

export default function PrototypeBanner() {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-2 px-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2">
        <AlertTriangle className="h-5 w-5 flex-shrink-0" />
        <p className="text-sm md:text-base font-semibold text-center">
          PROTOTYPE CONCEPT - NOT OFFICIAL TfL | This is an independent campaign proposal
        </p>
      </div>
    </div>
  )
}
