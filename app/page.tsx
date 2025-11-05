"use client"

import { useState } from "react"
import LandingPage from "@/components/landing-page"
import DLRDigitalTap from "@/components/dlr-digital-tap"
import VotePage from "@/components/vote-page"
import AboutPage from "@/components/about-page"
import ContactPage from "@/components/contact-page"

export default function Home() {
  const [currentPage, setCurrentPage] = useState("home")

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <LandingPage onNavigate={setCurrentPage} />
      case "prototype":
        return <DLRDigitalTap onBackClick={() => setCurrentPage("home")} />
      case "vote":
        return <VotePage onNavigate={setCurrentPage} />
      case "about":
        return <AboutPage onNavigate={setCurrentPage} />
      case "contact":
        return <ContactPage onNavigate={setCurrentPage} />
      default:
        return <LandingPage onNavigate={setCurrentPage} />
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {renderPage()}
    </div>
  )
}
