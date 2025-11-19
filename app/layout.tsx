import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import StructuredData from "./structured-data";
import SiteFooter from "@/components/site-footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Digital Tap - Revolutionary Contactless Travel",
  description:
    "Experience the future of DLR travel with our innovative Digital Tap system. No more crowded tap points, just seamless contactless journeys across London's Docklands Light Railway.",
  keywords: [
    "DLR",
    "Docklands Light Railway",
    "DLR Tap",
    "DLR Contactless",
    "Digital Tap",
    "Transport for London",
    "TfL Innovation",
    "London Commuter",
    "Public Transport App",
    "Smart Travel",
    "Contactless Journey",
    "Oyster Card Alternative",
    "DLR Delays",
    "DLR Status",
    "London Underground",
    "Tube Map",
  ],
  authors: [{ name: "Digital Tap Team" }],
  creator: "Digital Tap",
  publisher: "Digital Tap",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://dlrdigitaltap.xyz"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Digital Tap - Revolutionary Contactless Travel",
    description:
      "Experience the future of DLR travel with our innovative Digital Tap system. No more crowded tap points, just seamless contactless journeys.",
    url: "https://dlrdigitaltap.xyz",
    siteName: "Digital Tap",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Digital Tap - Revolutionary Contactless Travel",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Tap - Revolutionary Contactless Travel",
    description:
      "Experience the future of DLR travel with our innovative Digital Tap system. No more crowded tap points, just seamless contactless journeys.",
    images: ["/twitter-image.png"],
    creator: "@dlrdigitaltap",
    site: "@dlrdigitaltap",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body className={`${inter.className} bg-white`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <div className="min-h-screen bg-white flex flex-col">
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
