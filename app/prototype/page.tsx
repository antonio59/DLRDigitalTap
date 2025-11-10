"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import DLRDigitalTap from "@/components/dlr-digital-tap"

export default function PrototypePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
      <DLRDigitalTap onBackClick={() => {}} />
    </div>
  )
}
