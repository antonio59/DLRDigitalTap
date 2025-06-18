"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, User, Mail, Linkedin, Github, Heart } from "lucide-react"
import VoteButton from "./vote-button"

interface AboutPageProps {
  onNavigate: (page: string) => void
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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
                  className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  About
                </button>
                <button
                  onClick={() => onNavigate("vote")}
                  className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
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
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About DLR Digital Tap</h1>
          <p className="text-xl text-gray-600 mb-6">Learn about the vision behind revolutionary contactless travel</p>
          <VoteButton />
        </div>

        {/* Mission Statement */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 leading-relaxed">
              DLR Digital Tap represents the future of public transportation in London. Our mission is to eliminate the
              friction points in daily commuting by introducing seamless, contactless travel technology that works
              entirely through your smartphone. We believe that technology should make life easier, not more
              complicated, and our digital tap system embodies this philosophy.
            </p>
          </CardContent>
        </Card>

        {/* The Problem */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>The Problem We're Solving</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-600">Current DLR tap points create several challenges for passengers:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                <li>Crowded tap points during rush hour causing delays and missed trains</li>
                <li>Difficulty reaching tap points for passengers with mobility issues</li>
                <li>Challenges for passengers carrying luggage or traveling with children</li>
                <li>Occasional technical failures with physical tap points</li>
                <li>Maximum fare charges when passengers can't tap out properly</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Our Solution */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Our Solution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-600">DLR Digital Tap transforms the travel experience by:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                <li>Enabling tap in/out functionality directly from your smartphone</li>
                <li>Using location services to automatically suggest nearby stations</li>
                <li>Integrating seamlessly with existing Oyster and contactless payment systems</li>
                <li>Providing real-time journey tracking and fare calculation</li>
                <li>Offering accessibility features for all passengers</li>
                <li>Reducing congestion at physical tap points</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Technology */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>The Technology</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 leading-relaxed">
              Our system leverages cutting-edge mobile technology, GPS location services, and secure payment processing
              to create a seamless travel experience. The app integrates with TfL's existing infrastructure while adding
              a layer of digital convenience that passengers have been waiting for. Security and privacy are paramount -
              all transactions are encrypted and user data is protected according to the highest industry standards.
            </p>
          </CardContent>
        </Card>

        {/* About Me */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              About Me
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Project Creator</h3>
                <p className="text-gray-600 mb-4">
                  As a daily DLR commuter and technology enthusiast, I've experienced firsthand the challenges of the
                  current tap system. This project represents my vision for how technology can improve public
                  transportation for everyone. I'm passionate about creating solutions that make urban life more
                  efficient and accessible.
                </p>
                <div className="flex space-x-4">
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                  <Button variant="outline" size="sm">
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Button>
                  <Button variant="outline" size="sm">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Help Make This Vision Reality</h3>
            <p className="text-gray-600 mb-4">
              Your support can help bring this innovative solution to the DLR network. Every vote counts towards
              demonstrating public demand for better, more accessible public transportation.
            </p>
            <div className="flex justify-center space-x-4">
              <VoteButton />
              <Button onClick={() => onNavigate("prototype")} variant="outline">
                Try the Prototype
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
