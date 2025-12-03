import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ConvexClientProvider } from "@/components/convex-provider"
import { Toaster } from "@/components/ui/toaster"
import StructuredData from "./structured-data";
import SiteFooter from "@/components/site-footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "London Digital Tap - Revolutionary Contactless Travel",
  description:
    "Experience the future of London travel with our innovative Digital Tap system. No more crowded tap points, just seamless contactless journeys across London's transport network.",
  keywords: [
    "London Digital Tap",
    "TfL Digital Tap",
    "Pink Validator",
    "Interchange Stations",
    "DLR",
    "Elizabeth Line",
    "London Overground",
    "Digital Tap",
    "Transport for London",
    "TfL Innovation",
    "London Commuter",
    "Public Transport App",
    "Smart Travel",
    "Contactless Journey",
    "Oyster Card Alternative",
    "London Underground",
    "Tube Map",
  ],
  authors: [{ name: "London Digital Tap Team" }],
  creator: "London Digital Tap",
  publisher: "London Digital Tap",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://londondigitaltap.xyz"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "London Digital Tap - Revolutionary Contactless Travel",
    description:
      "Experience the future of London travel with our innovative Digital Tap system. No more crowded tap points, just seamless contactless journeys.",
    url: "https://londondigitaltap.xyz",
    siteName: "London Digital Tap",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "London Digital Tap - Revolutionary Contactless Travel",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "London Digital Tap - Revolutionary Contactless Travel",
    description:
      "Experience the future of London travel with our innovative Digital Tap system. No more crowded tap points, just seamless contactless journeys.",
    images: ["/twitter-image.png"],
    creator: "@londondigitaltap",
    site: "@londondigitaltap",
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
        <Script
          src="/script.js"
          data-website-id="bd7e8714-0165-4646-a110-34611e2abacb"
          strategy="afterInteractive"
        />
        <ConvexClientProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
            <div className="min-h-screen bg-white flex flex-col">
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </div>
            <Toaster />
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  )
}
