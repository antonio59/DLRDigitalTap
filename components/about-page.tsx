"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Heart, Rocket, Calendar, CheckCircle2, Clock, Target, HelpCircle, ArrowRight, Train, MessageCircle } from "lucide-react"
import VoteButton from "./vote-button"
import PrototypeBanner from "./prototype-banner"
import DisclaimerFooter from "./disclaimer-footer"
import SiteHeader from "./site-header"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <PrototypeBanner />
      <SiteHeader />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="bg-orange-500 text-white mb-4">Campaign Concept</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About This Campaign</h1>
          <p className="text-xl text-gray-600 mb-6">A citizen-led proposal to modernise travel on the DLR</p>
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
                This campaign began at Poplar DLR station. I was already running late and both of the tap points were out of 
                order—again—the only option was going to the other platform to try the other touch points there. The train I 
                needed pulled in. I was on the wrong platform, rushing to get back. The doors closed. The train left—not because 
                I was late, but because the system couldn't keep up.
              </p>
              <p>
                Whilst we're fortunate to have frequent DLR services, I have to catch a connecting train at Tower Hill, and DLR 
                services to Tower Gateway aren't as frequent as those to Bank—so timing matters. Missing one train doesn't just 
                mean waiting a few minutes; it means missing my connection and adding 15-30 minutes to my journey depending on 
                the time of day.
              </p>
              <p>
                That's when I realised this wasn't just my problem—it affects thousands of passengers daily. Many stations or 
                platforms only have a single touchpoint per platform, or two maximum. If one of those is out of service, or 
                during rush hour, you're queuing for what feels like forever. And if there are users arriving and departing at 
                the same time, it becomes a juggle as you try to let those trying to catch the next train tap in before you—an 
                awkward dance of "no, you go first" whilst you wait to leave the station.
              </p>
              <p className="font-semibold text-gray-700">
                But the frustrations don't end there.
              </p>
              <p>
                I was at Heron Quays DLR the other day. I get that some stations don't have barriers. But at this station, 
                the validators aren't anywhere near where you'd see them in your eye line, or close to the stairs. I travel a 
                lot around London and was completely baffled by this station—it's as if they've intentionally hidden the tap 
                points so people don't pay. How many passengers miss them entirely? How much revenue is Transport for London 
                losing simply because of poor placement?
              </p>
              <p>
                Then there's the uncertainty. Did my tap register? The readers often lag, giving no immediate feedback. You 
                tap, wait, see nothing, tap again—and suddenly you've double-charged yourself or, worse, invalidated your 
                journey. There's no reassurance, no confirmation sound that works consistently, no clear display. You're left 
                hoping for the best and dreading the penalty fare.
              </p>
              <p>
                The broken infrastructure is relentless. One week it's Poplar. The next it's Westferry. Then Pontoon Dock. 
                The validators rotate through a cycle of dysfunction like some kind of perverse rota. You start planning your 
                route not around which train is fastest, but around which stations might actually let you tap in today.
              </p>
              <p>
                Instead of just complaining like everyone else, I decided to do something about it. As a web developer, I 
                knew the technology to solve this problem already exists. Airports use automatic check-in, museums use proximity 
                detection, and retail stores use beacon technology. Why not public transport?
              </p>
              <p>
                So I built this prototype in my spare time to demonstrate what's possible. What started as a weekend project 
                has grown into a movement with so many supporters who share the same frustrations and believe in a better future 
                for DLR travel.
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
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Daily DLR Commuter & Web Developer</h3>
                <div className="space-y-3 text-gray-600 leading-relaxed">
                  <p>
                    Hi, I'm Antonio Smith, a project manager and web developer based in East London who has been commuting on 
                    the DLR for several years. My daily journey takes me through some of the busiest stations on the network—Poplar, 
                    Canary Wharf, Tower Gateway—and I've experienced firsthand the challenges of the current tap system, from broken 
                    validators to platform-hopping queues that make me miss crucial connections.
                  </p>
                  <p>
                    As someone who works with technology every day, I'm passionate about using it to solve real-world problems. 
                    When I saw how existing technologies like Bluetooth beacons and automatic detection could transform the DLR 
                    experience, I knew I had to build a demonstration.
                  </p>
                  <p>
                    This isn't about replacing TfL's infrastructure—it's about enhancing it. Physical tap points would remain 
                    fully operational for everyone, whilst giving passengers who choose to opt in a faster, contactless alternative 
                    using their phones.
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
                  <h4 className="text-lg font-semibold text-gray-900">Phase 2: Gather Ongoing Support</h4>
                  <p className="text-sm text-gray-500 font-medium mb-2">🔄 Active - Continuous</p>
                  <p className="text-gray-600">
                    Collecting votes and feedback from DLR passengers to demonstrate sustained public demand. Rather than 
                    a fixed target, we're building momentum through ongoing engagement, showing TfL there's genuine and 
                    growing interest in digital tap technology.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900">Phase 3: Ongoing TfL Engagement</h4>
                  <p className="text-sm text-gray-500 font-medium mb-2">🔄 Active - Continuous</p>
                  <p className="text-gray-600">
                    We engage with TfL regularly through social media, sharing campaign statistics and passenger feedback. 
                    Monthly automated posts highlight growing support and demonstrate sustained demand for this improvement. 
                    Every vote and comment strengthens our case.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-cyan-600 flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900">Phase 4: Build Critical Mass</h4>
                  <p className="text-sm text-gray-500 font-medium mb-2">🔄 Active - Ongoing</p>
                  <p className="text-gray-600">
                    Rather than a fixed deadline, we're building sustained momentum. As vote numbers grow and real passenger 
                    stories accumulate, we'll compile compelling data packages for formal submission to TfL leadership, 
                    media outlets, and local councillors.
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
                  <h4 className="text-lg font-semibold text-gray-900">Phase 5: Advocate for Pilot Program</h4>
                  <p className="text-sm text-gray-500 font-medium mb-2">⏳ Future - When Ready</p>
                  <p className="text-gray-600">
                    With substantial public backing, we'll formally propose a pilot programme at 2-3 high-traffic stations. 
                    Real-world testing would provide data on passenger adoption, system reliability, and operational benefits 
                    for TfL to evaluate.
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
                  <h4 className="text-lg font-semibold text-gray-900">Phase 6: Network-Wide Implementation</h4>
                  <p className="text-sm text-gray-500 font-medium mb-2">⏳ Vision - Long-term Goal</p>
                  <p className="text-gray-600">
                    The ultimate vision: digital tap available at all 45 DLR stations, with physical tap points maintained 
                    permanently as backup. Success on the DLR could pave the way for expansion to other TfL services, 
                    modernising London's entire public transport network.
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
                  That depends on sustained public support and TfL's response. We're building a compelling case through 
                  ongoing engagement, regular social media advocacy, growing vote numbers, and authentic passenger feedback. 
                  The more support we gather over time, the stronger our position. Many successful transport innovations 
                  started as citizen-led campaigns with persistent advocacy.
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
                  We engage with TfL continuously through monthly social media posts and ongoing advocacy. Rather than waiting 
                  for a fixed target, we're building sustained momentum and compiling data packages as support grows. When we have 
                  substantial backing and compelling evidence, we'll pursue formal meetings with TfL leadership and present our case 
                  for a pilot programme.
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
                    <span className="font-semibold">Monthly TfL Engagement:</span> We post regular updates to TfL on social 
                    media, sharing growing vote counts and passenger feedback to maintain visibility.
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Data Compilation:</span> As support grows, we compile comprehensive data 
                    packages with statistics, passenger stories, and usage patterns to present to TfL, media, and councillors.
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Community Feedback:</span> Your comments and suggestions help strengthen 
                    our proposal. We're listening and incorporating feedback into our ongoing advocacy.
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Transparency:</span> Whether TfL engages positively or needs more convincing, 
                    we'll share developments with all supporters and keep the campaign momentum going.
                  </div>
                </li>
              </ul>
              <p className="mt-4 italic">
                This is a long-term, sustained campaign. Persistent advocacy and growing public support demonstrate genuine 
                demand. Even if change doesn't happen immediately, every vote strengthens our case and keeps digital tap on 
                TfL's radar for future consideration.
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
              <Link href="/prototype">
                <Button variant="outline">
                  See the Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Get in Touch
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <DisclaimerFooter />
    </div>
  )
}
