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
  title: "Digital Tap — a citizen proposal for touchless DLR travel",
  description:
    "A concept campaign asking TfL to consider beacon-based tap-in and tap-out on the DLR. Demo only. Not an official TfL service.",
  keywords: [
    "Digital Tap",
    "DLR",
    "Transport for London",
    "touchless travel",
    "pink validator",
  ],
  authors: [{ name: "Antonio Smith" }],
  creator: "Antonio Smith",
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
    title: "Digital Tap — a citizen proposal for touchless DLR travel",
    description:
      "A concept campaign asking TfL to consider beacon-based tap-in and tap-out on the DLR. Demo only.",
    url: "https://londondigitaltap.xyz",
    siteName: "Digital Tap",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Digital Tap campaign concept for DLR travel",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Tap — a citizen proposal for touchless DLR travel",
    description:
      "A concept campaign asking TfL to consider beacon-based tap-in and tap-out on the DLR.",
    images: ["/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
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
