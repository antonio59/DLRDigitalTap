"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, User, Mail, Linkedin, Github, Heart, Rocket, Calendar, CheckCircle2, Clock, Target, HelpCircle, ArrowRight, Train } from "lucide-react"
import VoteButton from "./vote-button"
import PrototypeBanner from "./prototype-banner"
import DisclaimerFooter from "./disclaimer-footer"

interface AboutPageProps {
  onNavigate: (page: string) => void
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <PrototypeBanner />
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
          <Badge className="bg-orange-500 text-white mb-4">Campaign Concept</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About This Campaign</h1>
          <p className="text-xl text-gray-600 mb-6">A citizen-led proposal to modernize DLR travel</p>
          <VoteButton />
        </div>

        {/* Campaign Origin Story */}
        <Card className="mb-8 border-2 border-blue-300">
          <CardHeader className="bg-blue-50">
            <CardTitle className="flex items-center">
              <Rocket className="h-6 w-6 mr-2 text-blue-600" />
              How This Campaign Started
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                This campaign began in early 2024 after one particularly frustrating morning commute. After missing my train 
                for the third consecutive day due to tap point queues at a busy DLR station, I realized this wasn't just my problem—it 
                affects thousands of passengers daily.
              </p>
              <p>
                Instead of just complaining like everyone else, I decided to do something about it. As a software developer, 
                I knew the technology to solve this problem already exists. Airports use automatic check-in, museums use proximity 
                detection, and retail stores use beacon technology. Why not public transport?
              </p>
              <p>
                So I built this prototype in my spare time to demonstrate what's possible. What started as a weekend project 
                has grown into a movement with <span className="font-semibold text-gray-900">over 1,458 supporters</span> who 
                share the same frustrations and believe in a better future for DLR travel.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* About Me */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Who I Am
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Daily DLR Commuter & Software Developer</h3>
                <div className="space-y-3 text-gray-600 leading-relaxed">
                  <p>
                    Hi, I'm a software developer based in South London who has been commuting on the DLR for several years. 
                    My daily journey takes me through some of the busiest stations on the network, and I've experienced 
                    firsthand the challenges of the current tap system.
                  </p>
                  <p>
                    As someone who works with technology every day, I'm passionate about using it to solve real-world problems. 
                    When I saw how existing technologies like Bluetooth beacons and automatic detection could transform the DLR 
                    experience, I knew I had to build a demonstration.
                  </p>
                  <p>
                    This isn't about replacing TfL's infrastructure—it's about enhancing it. Physical tap points would remain 
                    as backup options, ensuring accessibility for everyone while giving tech-savvy passengers a faster, 
                    more convenient alternative.
                  </p>
                  <p className="italic text-gray-500 text-sm mt-4">
                    Want to get in touch about the campaign or discuss collaboration? Feel free to reach out via the contact page.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Campaign Roadmap */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Campaign Roadmap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900">Phase 1: Build Prototype</h4>
                  <p className="text-sm text-green-600 font-medium mb-2">✅ Completed - June 2024</p>
                  <p className="text-gray-600">
                    Designed and developed a working prototype demonstrating how digital tap technology could function. 
                    Created comprehensive user interface with all 41 DLR stations integrated.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900">Phase 2: Gather Public Support</h4>
                  <p className="text-sm text-blue-600 font-medium mb-2">🔄 In Progress - 1,458 of 2,000 votes (73%)</p>
                  <p className="text-gray-600">
                    Collecting votes from DLR passengers to demonstrate public demand. Goal is 2,000 signatures to show 
                    TfL there's genuine interest in digital tap technology.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900">Phase 3: Present to TfL</h4>
                  <p className="text-sm text-gray-500 font-medium mb-2">⏳ Planned - Q1 2025</p>
                  <p className="text-gray-600">
                    Once we reach 2,000 votes, we'll compile all feedback and present a formal proposal to TfL leadership, 
                    along with this prototype and supporting data from our community.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <Rocket className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900">Phase 4: Pilot Program</h4>
                  <p className="text-sm text-gray-500 font-medium mb-2">⏳ Hopeful - 2025-2026</p>
                  <p className="text-gray-600">
                    If TfL shows interest, we'd advocate for a pilot program at 2-3 stations. This would test the 
                    technology in real-world conditions and gather user feedback for refinement.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <Train className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900">Phase 5: Network-Wide Rollout</h4>
                  <p className="text-sm text-gray-500 font-medium mb-2">⏳ Vision - Beyond 2026</p>
                  <p className="text-gray-600">
                    The ultimate goal: digital tap available at all 45 DLR stations, with physical tap points maintained 
                    as backup. Potential expansion to other TfL services based on success.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <HelpCircle className="h-5 w-5 mr-2" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Is this an official TfL project?</h4>
                <p className="text-gray-600">
                  <span className="font-semibold">No.</span> This is an independent, citizen-led campaign. It is NOT affiliated with, 
                  endorsed by, or representing Transport for London (TfL) or Docklands Light Railway (DLR). This is a proposal 
                  from passengers, for passengers.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Will this actually happen?</h4>
                <p className="text-gray-600">
                  That depends on public support and TfL's response. We're building a compelling case with vote numbers, 
                  user feedback, and a working prototype. The more support we gather, the stronger our position when we 
                  present to TfL. Many successful transport innovations started as citizen proposals.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">How can I help?</h4>
                <p className="text-gray-600">
                  There are several ways to support:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4 mt-2">
                  <li><span className="font-semibold">Vote</span> to show your support</li>
                  <li><span className="font-semibold">Share</span> the campaign with fellow DLR passengers</li>
                  <li><span className="font-semibold">Comment</span> with your own experiences and suggestions</li>
                  <li><span className="font-semibold">Spread the word</span> on social media</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">What about privacy and data security?</h4>
                <p className="text-gray-600">
                  Privacy is a top priority. The proposed system would only track station entry and exit—not your movements 
                  on trains or between stations. All data would be encrypted and handled according to GDPR regulations. 
                  Users could opt-out anytime and use physical tap points as a backup option.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Will physical tap points be removed?</h4>
                <p className="text-gray-600">
                  <span className="font-semibold">No.</span> Physical tap points would remain as backup options permanently. 
                  Digital tap would be an additional option, not a replacement. This ensures everyone can travel comfortably, 
                  whether they prefer digital or physical tapping.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">What if I don't have a smartphone?</h4>
                <p className="text-gray-600">
                  Physical tap points would continue to work exactly as they do now. Digital tap is about adding convenience 
                  for those who want it, not removing options from those who don't. Everyone should be able to travel in the 
                  way that works best for them.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">How much would this cost to implement?</h4>
                <p className="text-gray-600">
                  While we don't have official cost estimates, similar beacon-based systems in other contexts (airports, retail) 
                  have proven relatively affordable. The infrastructure already exists—it's about adding beacons and software. 
                  Any implementation would need TfL's full feasibility study and cost-benefit analysis.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">When will you present this to TfL?</h4>
                <p className="text-gray-600">
                  We're targeting Q1 2025, once we reach our goal of 2,000 votes. This gives us enough time to gather 
                  comprehensive feedback and prepare a professional presentation with all supporting data. We'll keep 
                  supporters updated on progress.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What Happens Next */}
        <Card className="mb-8 border-2 border-purple-300 bg-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ArrowRight className="h-5 w-5 mr-2" />
              What Happens Next?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-gray-600">
              <p className="font-semibold text-gray-900">
                We're currently in Phase 2 of our campaign. Here's what you can expect:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Regular Updates:</span> As we approach our 2,000 vote goal, 
                    I'll share progress updates and any developments with TfL.
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">TfL Presentation:</span> Once we reach 2,000 votes, we'll compile 
                    all feedback and schedule a formal presentation with TfL leadership.
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Community Feedback:</span> Your comments and suggestions help strengthen 
                    our proposal. We're listening and incorporating feedback into our pitch.
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Transparency:</span> Whether TfL accepts, rejects, or wants modifications, 
                    we'll share their response with all supporters.
                  </div>
                </li>
              </ul>
              <p className="mt-4 italic">
                This is a long-term campaign. Even if TfL isn't ready now, public support helps demonstrate demand 
                for future consideration. Every vote makes a difference.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-300">
          <CardContent className="p-6 text-center">
            <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Help Make This Vision Reality</h3>
            <p className="text-gray-600 mb-4">
              Your support can help bring this innovative solution to the DLR network. Every vote counts towards
              demonstrating public demand for better, more accessible public transportation.
            </p>
            <div className="flex justify-center space-x-4 flex-wrap gap-2">
              <VoteButton />
              <Button onClick={() => onNavigate("prototype")} variant="outline">
                See the Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button onClick={() => onNavigate("contact")} variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Get in Touch
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <DisclaimerFooter />
    </div>
  )
}
