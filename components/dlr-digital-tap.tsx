"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, CreditCard, CheckCircle, Train, Smartphone, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { trackAnalytics } from "@/actions/database"
import PrototypeBanner from "./prototype-banner"
import DisclaimerFooter from "./disclaimer-footer"

interface DLRDigitalTapProps {
  onBackClick: () => void
}

const DLR_STATIONS = [
  "Abbey Road DLR Station",
  "All Saints DLR Station",
  "Bank DLR Station",
  "Beckton DLR Station",
  "Beckton Park DLR Station",
  "Blackwall DLR Station",
  "Bow Church DLR Station",
  "Canning Town DLR Station",
  "Canary Wharf DLR Station",
  "Custom House (for ExCel) DLR Station",
  "Cutty Sark (for Maritime Greenwich) DLR Station",
  "Cyprus DLR Station",
  "Deptford Bridge DLR Station",
  "Devons Road DLR Station",
  "Elverson Road DLR Station",
  "East India DLR Station",
  "Gallions Reach DLR Station",
  "Greenwich DLR Station",
  "Heron Quays DLR Station",
  "Island Gardens DLR Station",
  "King George V DLR Station",
  "Langdon Park DLR Station",
  "Lewisham DLR Station",
  "Limehouse DLR Station",
  "Mudchute DLR Station",
  "Pudding Mill Lane DLR Station",
  "Poplar DLR Station",
  "Prince Regent DLR Station",
  "Pontoon Dock DLR Station",
  "Royal Albert DLR Station",
  "Royal Victoria DLR Station",
  "Shadwell DLR Station",
  "South Quay DLR Station",
  "Stratford DLR Station",
  "Tower Gateway DLR Station",
  "West India Quay DLR Station",
  "Westferry DLR Station",
  "West Silvertown DLR Station",
  "Woolwich Arsenal DLR Station",
]

export default function DLRDigitalTap({ onBackClick }: DLRDigitalTapProps) {
  const [currentStep, setCurrentStep] = useState<"tap-in" | "journey" | "tap-out" | "complete">("tap-in")
  const [fromStation, setFromStation] = useState("")
  const [toStation, setToStation] = useState("")
  const [journeyTime, setJourneyTime] = useState(0)
  const [fare, setFare] = useState(0)
  const { toast } = useToast()

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (currentStep === "journey") {
      interval = setInterval(() => {
        setJourneyTime((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [currentStep])

  useEffect(() => {
    // Track prototype usage
    trackAnalytics("prototype_view", "/prototype", {
      step: currentStep,
    })
  }, [currentStep])

  const handleTapIn = async () => {
    if (!fromStation) {
      toast({
        title: "Please select a station",
        description: "Choose your departure station to tap in.",
        variant: "destructive",
      })
      return
    }

    await trackAnalytics("prototype_tap_in", "/prototype", {
      station: fromStation,
    })

    setCurrentStep("journey")
    toast({
      title: "Tapped in successfully!",
      description: `Journey started from ${fromStation}`,
      variant: "default",
    })
  }

  const handleTapOut = async () => {
    if (!toStation) {
      toast({
        title: "Please select a station",
        description: "Choose your destination station to tap out.",
        variant: "destructive",
      })
      return
    }

    if (toStation === fromStation) {
      toast({
        title: "Invalid journey",
        description: "Please select a different destination station.",
        variant: "destructive",
      })
      return
    }

    // Calculate fare based on journey (simplified calculation)
    const baseFare = 2.8
    // Use deterministic calculation based on stations instead of random
    const stationIndex1 = dlrStations.indexOf(fromStation)
    const stationIndex2 = dlrStations.indexOf(toStation)
    const distance = Math.abs(stationIndex2 - stationIndex1)
    const distanceFactor = Math.min(distance * 0.5 + 1, 3) // 1-3x multiplier based on distance
    const calculatedFare = Math.round(baseFare * distanceFactor * 100) / 100

    setFare(calculatedFare)
    setCurrentStep("complete")

    await trackAnalytics("prototype_tap_out", "/prototype", {
      from_station: fromStation,
      to_station: toStation,
      journey_time: journeyTime,
      fare: calculatedFare,
    })

    toast({
      title: "Journey complete!",
      description: `Tapped out at ${toStation}. Fare: £${calculatedFare}`,
      variant: "default",
    })
  }

  const resetJourney = () => {
    setCurrentStep("tap-in")
    setFromStation("")
    setToStation("")
    setJourneyTime(0)
    setFare(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getAvailableDestinations = () => {
    return DLR_STATIONS.filter((station) => station !== fromStation)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <PrototypeBanner />
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              onClick={onBackClick}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <div className="text-center">
              <h1 className="text-xl font-semibold text-gray-900">DLR Digital Tap Prototype</h1>
              <Badge variant="outline" className="mt-1 text-orange-600 border-orange-600">
                <AlertTriangle className="h-3 w-3 mr-1" />
                CONCEPT DEMO
              </Badge>
            </div>
            <div className="w-24" /> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className={`flex items-center ${currentStep === "tap-in" ? "text-blue-600" : "text-green-600"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === "tap-in" ? "bg-blue-600 text-white" : "bg-green-600 text-white"
                }`}
              >
                {currentStep === "tap-in" ? "1" : <CheckCircle className="h-5 w-5" />}
              </div>
              <span className="ml-2 font-medium">Tap In</span>
            </div>

            <div
              className={`flex items-center ${
                currentStep === "journey"
                  ? "text-blue-600"
                  : currentStep === "tap-out" || currentStep === "complete"
                    ? "text-green-600"
                    : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === "journey"
                    ? "bg-blue-600 text-white"
                    : currentStep === "tap-out" || currentStep === "complete"
                      ? "bg-green-600 text-white"
                      : "bg-gray-300 text-gray-600"
                }`}
              >
                {currentStep === "tap-out" || currentStep === "complete" ? <CheckCircle className="h-5 w-5" /> : "2"}
              </div>
              <span className="ml-2 font-medium">Journey</span>
            </div>

            <div
              className={`flex items-center ${
                currentStep === "tap-out"
                  ? "text-blue-600"
                  : currentStep === "complete"
                    ? "text-green-600"
                    : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === "tap-out"
                    ? "bg-blue-600 text-white"
                    : currentStep === "complete"
                      ? "bg-green-600 text-white"
                      : "bg-gray-300 text-gray-600"
                }`}
              >
                {currentStep === "complete" ? <CheckCircle className="h-5 w-5" /> : "3"}
              </div>
              <span className="ml-2 font-medium">Tap Out</span>
            </div>
          </div>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: currentStep === "tap-in" ? "33%" : currentStep === "journey" ? "66%" : "100%",
              }}
            />
          </div>
        </div>

        {/* Main Content */}
        {currentStep === "tap-in" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Smartphone className="h-5 w-5 mr-2" />
                Tap In to Start Your Journey
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select your departure station</label>
                <Select value={fromStation} onValueChange={setFromStation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a DLR station" />
                  </SelectTrigger>
                  <SelectContent>
                    {DLR_STATIONS.map((station) => (
                      <SelectItem key={station} value={station}>
                        {station}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-sm text-blue-800">
                    In a real implementation, your location would be detected automatically to suggest the nearest
                    station.
                  </span>
                </div>
              </div>

              <Button
                onClick={handleTapIn}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                disabled={!fromStation}
              >
                <Smartphone className="h-5 w-5 mr-2" />
                Tap In at {fromStation || "Selected Station"}
              </Button>
            </CardContent>
          </Card>
        )}

        {currentStep === "journey" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Train className="h-5 w-5 mr-2" />
                Journey in Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{formatTime(journeyTime)}</div>
                <p className="text-gray-600">Journey time</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-green-800">From: {fromStation}</p>
                    <p className="text-sm text-green-600">Tapped in successfully</p>
                  </div>
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select your destination station</label>
                <Select value={toStation} onValueChange={setToStation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {getAvailableDestinations().map((station) => (
                      <SelectItem key={station} value={station}>
                        {station}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={() => setCurrentStep("tap-out")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                disabled={!toStation}
              >
                Ready to Tap Out
              </Button>
            </CardContent>
          </Card>
        )}

        {currentStep === "tap-out" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Tap Out to Complete Journey
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">From:</span>
                  <span>{fromStation}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">To:</span>
                  <span>{toStation}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Journey Time:</span>
                  <span>{formatTime(journeyTime)}</span>
                </div>
              </div>

              <Button onClick={handleTapOut} className="w-full bg-red-600 hover:bg-red-700 text-white py-3">
                <Smartphone className="h-5 w-5 mr-2" />
                Tap Out at {toStation}
              </Button>
            </CardContent>
          </Card>
        )}

        {currentStep === "complete" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-600">
                <CheckCircle className="h-5 w-5 mr-2" />
                Journey Complete!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">£{fare.toFixed(2)}</div>
                <p className="text-gray-600">Total fare charged</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium">From:</span>
                  <span>{fromStation}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium">To:</span>
                  <span>{toStation}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium">Journey Time:</span>
                  <span>{formatTime(journeyTime)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium">Payment Method:</span>
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-1" />
                    <span>Contactless</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-sm text-blue-800">
                    Payment processed automatically. Receipt sent to your TfL account.
                  </span>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button onClick={resetJourney} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                  Start New Journey
                </Button>
                <Button onClick={onBackClick} variant="outline" className="flex-1">
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* How It Works Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>How Digital Tap Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Smartphone className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-medium mb-2">1. Digital Tap In</h3>
                <p className="text-sm text-gray-600">
                  Use your smartphone to tap in at any DLR station without physical contact
                </p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Train className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-medium mb-2">2. Travel Normally</h3>
                <p className="text-sm text-gray-600">Board your train and travel to your destination as usual</p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-medium mb-2">3. Auto Payment</h3>
                <p className="text-sm text-gray-600">Tap out digitally and payment is processed automatically</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="mt-8 border-2 border-orange-200 bg-orange-50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-700">
                <p className="font-semibold text-orange-900 mb-2">Demonstration Only</p>
                <p>
                  This is a working prototype demonstration of how digital tap could function. 
                  No real journey or payment is being processed. The fares shown are simulated for illustration purposes only.
                  This is not an official TfL service.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <DisclaimerFooter />
    </div>
  )
}
