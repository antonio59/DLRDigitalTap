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
  title: "DLR Digital Tap - Revolutionary Contactless Travel",
  description:
    "Experience the future of DLR travel with our innovative digital tap system. No more crowded tap points, just seamless contactless journeys across London's Docklands Light Railway.",
  keywords: [
    "DLR",
    "digital tap",
    "contactless travel",
    "London transport",
    "TfL",
    "Oyster card",
    "mobile payments",
    "public transport innovation",
  ],
  authors: [{ name: "DLR Digital Tap Team" }],
  creator: "DLR Digital Tap",
  publisher: "DLR Digital Tap",
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
    title: "DLR Digital Tap - Revolutionary Contactless Travel",
    description:
      "Experience the future of DLR travel with our innovative digital tap system. No more crowded tap points, just seamless contactless journeys.",
    url: "https://dlrdigitaltap.xyz",
    siteName: "DLR Digital Tap",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DLR Digital Tap - Revolutionary Contactless Travel",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DLR Digital Tap - Revolutionary Contactless Travel",
    description:
      "Experience the future of DLR travel with our innovative digital tap system. No more crowded tap points, just seamless contactless journeys.",
    images: ["/twitter-image.png"],
    creator: "@dlrdigitaltap",
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
