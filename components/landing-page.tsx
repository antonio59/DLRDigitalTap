"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Smartphone, Clock, Users, Shield, TrendingUp, UserCheck, AlertTriangle, CheckCircle2, XCircle, Lightbulb, Target, MessageSquare } from "lucide-react"
import VoteButton from "./vote-button"
import PrototypeBanner from "./prototype-banner"
import DisclaimerFooter from "./disclaimer-footer"
import SiteHeader from "./site-header"
import SocialFeed from "./social-feed"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <PrototypeBanner />
      <SiteHeader />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-cyan-600 via-teal-700 to-blue-800">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
          <div className="text-center lg:text-left lg:max-w-3xl">
            <Badge className="bg-orange-500 text-white mb-6 text-sm px-4 py-1.5">
              Campaign Concept
            </Badge>
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block">Help Us Bring</span>
              <span className="block text-cyan-100 mt-2">Digital Tap to the DLR</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-cyan-50 max-w-2xl lg:max-w-3xl">
              This is a <span className="font-semibold text-white">citizen-led campaign</span> proposing seamless, 
              contactless travel technology for the DLR network. See how it could work and support the idea.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <VoteButton />
              <Link href="/prototype">
                <Button
                  variant="outline"
                  className="flex items-center justify-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white/10 md:py-4 md:text-lg md:px-10"
                >
                  See How It Could Work
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="mt-6 flex items-center justify-center lg:justify-start">
              <AlertTriangle className="h-5 w-5 text-yellow-300 mr-2" />
              <p className="text-sm text-cyan-100 italic">
                This is a demonstration concept, not a real working system
              </p>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-1/3">
            <div className="relative">
              <div className="absolute inset-0 bg-teal-400 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute inset-0 bg-cyan-400 rounded-full opacity-20 blur-3xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* The Problem Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-red-600 font-semibold tracking-wide uppercase">The Problem</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Current Pain Points with Physical Tap Systems
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              The current physical tap-in/tap-out system creates several issues for DLR passengers
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-2 border-red-200">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <XCircle className="h-8 w-8 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Rush Hour Queues</h4>
                    <p className="text-gray-600">
                      Long queues form at tap points during peak times, especially at busy stations like Canary Wharf and Bank, 
                      causing passengers to miss trains.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <XCircle className="h-8 w-8 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Accessibility Issues</h4>
                    <p className="text-gray-600">
                      People with mobility aids, parents with buggies, or those carrying luggage struggle to reach tap points, 
                      especially when crowded.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <XCircle className="h-8 w-8 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Failed Tap-Outs</h4>
                    <p className="text-gray-600">
                      Passengers sometimes can't reach tap-out points before doors close, resulting in maximum fare charges 
                      and frustration.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <XCircle className="h-8 w-8 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Station Congestion</h4>
                    <p className="text-gray-600">
                      Physical tap points create bottlenecks at station entrances and exits, slowing down passenger flow 
                      and reducing efficiency.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <XCircle className="h-8 w-8 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Hygiene Concerns</h4>
                    <p className="text-gray-600">
                      High-touch tap points require regular cleaning and can be a concern for passengers, especially during 
                      flu season or health crises.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <XCircle className="h-8 w-8 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Limited Data Collection</h4>
                    <p className="text-gray-600">
                      Current tap systems provide basic journey data but miss opportunities for better route optimisation 
                      and service improvements.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* The Solution Section */}
      <div className="py-16 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">The Solution</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Digital Tap: A Better Way to Travel
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our proposed digital tap system eliminates physical touch points and enables seamless, automatic journey tracking
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-2 border-green-300 bg-white">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Automatic Detection</h4>
                    <p className="text-gray-600">
                      Your phone automatically detects when you enter and exit DLR stations using Bluetooth beacon technology. 
                      No manual tapping required.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-300 bg-white">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Zero Queues</h4>
                    <p className="text-gray-600">
                      Walk straight onto the platform without stopping. No more missing trains because of tap point queues 
                      during rush hour.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-300 bg-white">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Fully Accessible</h4>
                    <p className="text-gray-600">
                      Perfect for passengers with mobility issues, parents with buggies, or anyone carrying luggage. 
                      No physical interaction needed.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-300 bg-white">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">No More Maximum Fare</h4>
                    <p className="text-gray-600">
                      System automatically registers your exit even if you can't physically tap out. Fair charging every time.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-300 bg-white">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Contactless & Hygienic</h4>
                    <p className="text-gray-600">
                      No touching shared surfaces. Better for public health and passenger peace of mind.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-300 bg-white">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Better TfL Analytics</h4>
                    <p className="text-gray-600">
                      Provides TfL with detailed journey data for route optimisation, capacity planning, and service improvements.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Benefits</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Why Digital Tap?
            </p>
          </div>

          {/* User Benefits */}
          <div className="mt-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">User Benefits</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Smartphone className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">Contactless Convenience</h4>
                      <p className="mt-2 text-base text-gray-500">
                        Tap in and out using your smartphone - no need to reach for physical tap points.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">Faster Boarding</h4>
                      <p className="mt-2 text-base text-gray-500">
                        Skip the queues at tap points and board trains more quickly during rush hour.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <UserCheck className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">Accessibility</h4>
                      <p className="mt-2 text-base text-gray-500">
                        Easier access for passengers with mobility issues or those carrying luggage.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* TfL Benefits */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">TfL Benefits</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">Improved Passenger Flow</h4>
                      <p className="mt-2 text-base text-gray-500">
                        Reduce congestion at stations by eliminating bottlenecks at tap points.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Shield className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">Reduced Fare Evasion</h4>
                      <p className="mt-2 text-base text-gray-500">
                        Digital tracking makes it harder for passengers to avoid paying fares.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <TrendingUp className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">Enhanced Analytics</h4>
                      <p className="mt-2 text-base text-gray-500">
                        Better data collection for route optimisation and service improvements.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* TfL Integration Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="lg:text-left mb-8">
                <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Integration</h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  Seamless TfL Network Integration
                </p>
                <p className="mt-4 text-xl text-gray-500">
                  Our digital tap system integrates seamlessly with existing TfL infrastructure, supporting both Oyster
                  cards and contactless payments.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      <Badge className="bg-blue-500">1</Badge>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">TfL Account Required</h3>
                    <p className="mt-2 text-base text-gray-500">
                      Users must have a registered TfL account to access the digital tap system, ensuring security and fare
                      collection.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      <Badge className="bg-blue-500">2</Badge>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Oyster & Contactless Support</h3>
                    <p className="mt-2 text-base text-gray-500">
                      Full compatibility with existing Oyster cards and contactless payment methods for a unified
                      experience.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      <Badge className="bg-blue-500">3</Badge>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Network-Wide Implementation</h3>
                    <p className="mt-2 text-base text-gray-500">
                      Designed to work across the entire DLR network with potential expansion to other TfL services.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Feed */}
            <div className="lg:mt-0 mt-12">
              <SocialFeed />
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials/Use Cases Section */}
      <div className="py-16 bg-gradient-to-br from-purple-50 to-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">Real Scenarios</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Who Would Benefit Most?
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Digital tap would make a real difference for many DLR passengers
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="mb-4">
                  <MessageSquare className="h-10 w-10 text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">"As a parent with young children..."</h4>
                <p className="text-gray-600 italic mb-4">
                  "Managing a buggy and two toddlers while trying to tap in and out is nearly impossible during rush hour. 
                  Digital tap would be a game-changer for families like mine."
                </p>
                <p className="text-sm text-gray-500">- Parent commuter, Canary Wharf</p>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="mb-4">
                  <MessageSquare className="h-10 w-10 text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">"Living with mobility issues..."</h4>
                <p className="text-gray-600 italic mb-4">
                  "Using a walking frame makes it difficult to reach tap points, especially when they're crowded. 
                  Automatic tapping would remove this daily stress."
                </p>
                <p className="text-sm text-gray-500">- Daily DLR user, Lewisham</p>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="mb-4">
                  <MessageSquare className="h-10 w-10 text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">"During morning rush hour..."</h4>
                <p className="text-gray-600 italic mb-4">
                  "I've missed my train countless times because of the queue at the tap point. Five seconds can be 
                  the difference between making it to work on time or being late."
                </p>
                <p className="text-sm text-gray-500">- Office worker, Bank station</p>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="mb-4">
                  <MessageSquare className="h-10 w-10 text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">"Travelling with luggage..."</h4>
                <p className="text-gray-600 italic mb-4">
                  "Wheeling a suitcase while trying to tap out is awkward and slows everyone down. 
                  Automatic detection would speed up station flow for everyone."
                </p>
                <p className="text-sm text-gray-500">- Frequent traveler, City Airport</p>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="mb-4">
                  <MessageSquare className="h-10 w-10 text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">"Got charged maximum fare..."</h4>
                <p className="text-gray-600 italic mb-4">
                  "The tap out reader wasn't working and I got charged £7.20 instead of £2.80. 
                  This happens more often than you'd think."
                </p>
                <p className="text-sm text-gray-500">- Regular commuter, Stratford</p>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="mb-4">
                  <MessageSquare className="h-10 w-10 text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">"Health and hygiene..."</h4>
                <p className="text-gray-600 italic mb-4">
                  "After the pandemic, I'm more conscious about touching shared surfaces. 
                  A contactless system would be better for everyone's health."
                </p>
                <p className="text-sm text-gray-500">- Health-conscious traveler</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">How It Works</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              The Technology Behind Digital Tap
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Simple, secure, and proven technology adapted for transport
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="h-6 w-6 mr-2 text-blue-600" />
                  Bluetooth Beacon Technology
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Each DLR station would have Bluetooth beacons that communicate with your smartphone. 
                  When you enter a station, your phone automatically registers the tap-in. When you leave, it registers the tap-out.
                </p>
                <p className="text-gray-600">
                  This technology is already used in airports, retail stores, and museums worldwide. It's proven, reliable, and energy-efficient.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-6 w-6 mr-2 text-blue-600" />
                  Privacy & Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Your privacy is protected. The system only needs to know when you enter and exit stations - 
                  no tracking of your movements between stations or on trains.
                </p>
                <p className="text-gray-600">
                  All data is encrypted and handled according to GDPR regulations. 
                  You can opt-out anytime and use physical tap points as a backup.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Smartphone className="h-6 w-6 mr-2 text-blue-600" />
                  Battery Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Bluetooth Low Energy (BLE) technology uses minimal battery power - less than 1% per day. 
                  Your phone is likely already using Bluetooth for other features.
                </p>
                <p className="text-gray-600">
                  The app runs in the background and only activates when near a DLR station, 
                  further minimizing battery usage.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-6 w-6 mr-2 text-blue-600" />
                  Rollout Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  If approved by TfL, implementation would be gradual. Starting with a pilot program at 2-3 stations, 
                  gathering feedback, and refining the system before network-wide rollout.
                </p>
                <p className="text-gray-600">
                  Physical tap points would remain as a backup option throughout the transition and beyond, 
                  ensuring everyone can travel comfortably.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Comparison Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Current vs Proposed</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              See the Difference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-2 border-red-200">
              <CardHeader className="bg-red-50">
                <CardTitle className="flex items-center text-red-800">
                  <XCircle className="h-6 w-6 mr-2" />
                  Current Physical Tap System
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <XCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Must physically touch tap point</span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Queues at busy stations</span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Can miss trains while tapping</span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Difficult with luggage/mobility aids</span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Failed tap-outs = maximum fare</span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">High-touch surfaces (hygiene)</span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Limited journey data</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-300">
              <CardHeader className="bg-green-50">
                <CardTitle className="flex items-center text-green-800">
                  <CheckCircle2 className="h-6 w-6 mr-2" />
                  Proposed Digital Tap System
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Automatic detection (no touching)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">No queues - walk straight through</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Faster boarding - catch your train</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Fully accessible - hands-free</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Automatic tap-out - fair fares</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Contactless - better hygiene</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Rich data for TfL improvements</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Support This Campaign</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-blue-100">
            Join our ongoing campaign to bring digital tap to the DLR. Every vote matters and strengthens our case to TfL.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <VoteButton />
            <Link href="/prototype">
              <Button
                variant="outline"
                className="inline-flex items-center justify-center px-5 py-3 border-2 border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white hover:text-blue-600"
              >
                See the Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-sm text-blue-200">
            <AlertTriangle className="inline h-4 w-4 mr-1" />
            Remember: This is a concept proposal, not an official TfL service
          </p>
        </div>
      </div>

      <DisclaimerFooter />
    </div>
  )
}
