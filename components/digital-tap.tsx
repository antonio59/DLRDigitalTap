"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, MapPin, CreditCard, CheckCircle, Train, Smartphone, AlertTriangle, ArrowRightLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAnalytics } from "@/hooks/use-analytics"
import PrototypeBanner from "./prototype-banner"
import DisclaimerFooter from "./disclaimer-footer"

// Pink card reader interchange stations
const INTERCHANGE_STATIONS = [
  { name: "Blackhorse Road", lines: ["Victoria line", "London Overground"] },
  { name: "Canada Water", lines: ["Jubilee line", "London Overground"] },
  { name: "Clapham Junction", lines: ["National Rail", "London Overground"] },
  { name: "Ealing Broadway", lines: ["Central line", "District line", "Elizabeth line", "National Rail"] },
  { name: "Gospel Oak", lines: ["London Overground"] },
  { name: "Gunnersbury", lines: ["District line", "London Overground"] },
  { name: "Hackney Central", lines: ["London Overground"] },
  { name: "Hackney Downs", lines: ["London Overground", "National Rail"] },
  { name: "Highbury & Islington", lines: ["Victoria line", "London Overground"] },
  { name: "Kensington (Olympia)", lines: ["District line", "London Overground"] },
  { name: "Rayners Lane", lines: ["Metropolitan line", "Piccadilly line"] },
  { name: "Richmond", lines: ["District line", "London Overground", "National Rail"] },
  { name: "Stratford", lines: ["Central line", "Jubilee line", "Elizabeth line", "DLR", "London Overground", "National Rail"] },
  { name: "Surrey Quays", lines: ["London Overground"] },
  { name: "West Brompton", lines: ["District line", "London Overground"] },
  { name: "Whitechapel", lines: ["District line", "Hammersmith & City line", "Elizabeth line", "London Overground"] },
  { name: "Willesden Junction", lines: ["Bakerloo line", "London Overground"] },
  { name: "Wimbledon", lines: ["District line", "National Rail", "Tramlink"] },
]

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

export default function DigitalTap() {
  const [mode, setMode] = useState<"dlr" | "interchange">("dlr")
  const [currentStep, setCurrentStep] = useState<"tap-in" | "journey" | "tap-out" | "complete">("tap-in")
  const [fromStation, setFromStation] = useState("")
  const [toStation, setToStation] = useState("")
  const [interchangeStation, setInterchangeStation] = useState("")
  const [fromLine, setFromLine] = useState("")
  const [toLine, setToLine] = useState("")
  const [journeyTime, setJourneyTime] = useState(0)
  const [fare, setFare] = useState(0)
  const { toast } = useToast()
  const { track } = useAnalytics()

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
    track("prototype_view", "/prototype", {
      step: currentStep,
    })
  }, [currentStep, track])

  const handleTapIn = async () => {
    if (!fromStation) {
      toast({
        title: "Please select a station",
        description: "Choose your departure station to tap in.",
        variant: "destructive",
      })
      return
    }

    await track("prototype_tap_in", "/prototype", {
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
    const stationIndex1 = DLR_STATIONS.indexOf(fromStation)
    const stationIndex2 = DLR_STATIONS.indexOf(toStation)
    const distance = Math.abs(stationIndex2 - stationIndex1)
    const distanceFactor = Math.min(distance * 0.5 + 1, 3) // 1-3x multiplier based on distance
    const calculatedFare = Math.round(baseFare * distanceFactor * 100) / 100

    setFare(calculatedFare)
    setCurrentStep("complete")

    await track("prototype_tap_out", "/prototype", {
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
    setInterchangeStation("")
    setFromLine("")
    setToLine("")
    setJourneyTime(0)
    setFare(0)
  }

  const handleModeChange = (newMode: string) => {
    setMode(newMode as "dlr" | "interchange")
    resetJourney()
  }

  const getSelectedInterchangeStation = () => {
    return INTERCHANGE_STATIONS.find(s => s.name === interchangeStation)
  }

  const handleInterchangeTap = async () => {
    if (!interchangeStation || !fromLine || !toLine) {
      toast({
        title: "Please complete all fields",
        description: "Select interchange station and both lines.",
        variant: "destructive",
      })
      return
    }

    await track("prototype_interchange", "/prototype", {
      station: interchangeStation,
      from_line: fromLine,
      to_line: toLine,
    })

    setCurrentStep("complete")
    setFare(0) // Interchange doesn't add fare
    toast({
      title: "Interchange registered!",
      description: `Changed from ${fromLine} to ${toLine} at ${interchangeStation}`,
      variant: "default",
    })
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
            <Link href="/">
              <Button
                variant="ghost"
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="text-center">
              <h1 className="text-xl font-semibold text-gray-900">Digital Tap Prototype</h1>
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
        {/* Mode Selection Tabs */}
        <Tabs value={mode} onValueChange={handleModeChange} className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="dlr" className="flex items-center gap-2">
              <Train className="h-4 w-4" />
              DLR Journey
            </TabsTrigger>
            <TabsTrigger value="interchange" className="flex items-center gap-2">
              <ArrowRightLeft className="h-4 w-4" />
              Interchange
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Progress Indicator - only show for DLR mode */}
        {mode === "dlr" && <div className="mb-8">
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
        </div>}

        {/* Interchange Mode UI */}
        {mode === "interchange" && currentStep !== "complete" && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ArrowRightLeft className="h-5 w-5 mr-2" />
                Pink Card Reader Interchange
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-pink-50 border border-pink-200 p-4 rounded-lg">
                <p className="text-sm text-pink-800">
                  <strong>What is this?</strong> Pink card readers are located at interchange stations where you change between different lines. 
                  Tapping them ensures you pay the correct fare when your journey doesn't pass through Zone 1.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select interchange station</label>
                <Select value={interchangeStation} onValueChange={(val) => {
                  setInterchangeStation(val)
                  setFromLine("")
                  setToLine("")
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an interchange station" />
                  </SelectTrigger>
                  <SelectContent>
                    {INTERCHANGE_STATIONS.map((station) => (
                      <SelectItem key={station.name} value={station.name}>
                        {station.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {interchangeStation && (
                <>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <strong>Available lines:</strong> {getSelectedInterchangeStation()?.lines.join(", ")}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Coming from</label>
                      <Select value={fromLine} onValueChange={setFromLine}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select line" />
                        </SelectTrigger>
                        <SelectContent>
                          {getSelectedInterchangeStation()?.lines.map((line) => (
                            <SelectItem key={line} value={line}>
                              {line}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Changing to</label>
                      <Select value={toLine} onValueChange={setToLine}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select line" />
                        </SelectTrigger>
                        <SelectContent>
                          {getSelectedInterchangeStation()?.lines.filter(l => l !== fromLine).map((line) => (
                            <SelectItem key={line} value={line}>
                              {line}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    onClick={handleInterchangeTap}
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3"
                    disabled={!fromLine || !toLine}
                  >
                    <Smartphone className="h-5 w-5 mr-2" />
                    Tap Pink Reader at {interchangeStation}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        )}

        {/* Interchange Complete */}
        {mode === "interchange" && currentStep === "complete" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-600">
                <CheckCircle className="h-5 w-5 mr-2" />
                Interchange Registered!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-green-800 font-medium">Your route has been validated</p>
                <p className="text-sm text-green-600 mt-1">You won't be charged Zone 1 fares</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Station:</span>
                  <span>{interchangeStation}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">From:</span>
                  <span>{fromLine}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">To:</span>
                  <span>{toLine}</span>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button onClick={resetJourney} className="flex-1 bg-pink-600 hover:bg-pink-700 text-white">
                  New Interchange
                </Button>
                <Link href="/" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* DLR Mode - Main Content */}
        {mode === "dlr" && currentStep === "tap-in" && (
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

        {mode === "dlr" && currentStep === "journey" && (
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

        {mode === "dlr" && currentStep === "tap-out" && (
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

        {mode === "dlr" && currentStep === "complete" && (
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
                <Link href="/" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Back to Home
                  </Button>
                </Link>
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
