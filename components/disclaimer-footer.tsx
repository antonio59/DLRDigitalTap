"use client"

import { AlertCircle } from "lucide-react"

export default function DisclaimerFooter() {
  return (
    <div className="bg-gray-800 text-gray-300 py-4 px-4 border-t-2 border-orange-500">
      <div className="max-w-7xl mx-auto flex items-start space-x-3">
        <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5 text-orange-400" />
        <div className="text-sm">
          <p className="font-semibold text-white mb-1">Important Disclaimer</p>
          <p>
            This is an independent citizen campaign concept. This website and prototype are{" "}
            <span className="font-semibold text-white">NOT affiliated with, endorsed by, or representing</span>{" "}
            Transport for London (TfL), Docklands Light Railway (DLR), or any official transport authority. 
            This is a demonstration of how digital tap technology could work to improve the DLR experience.
            All trademarks and service marks are the property of their respective owners.
          </p>
        </div>
      </div>
    </div>
  )
}
