export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "DLR Digital Tap",
    description: "Revolutionary contactless travel system for London's DLR network",
    url: "https://dlrdigitaltap.xyz",
    applicationCategory: "TransportationApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "GBP",
    },
    creator: {
      "@type": "Organization",
      name: "DLR Digital Tap Team",
    },
    keywords: "DLR, digital tap, contactless travel, London transport, TfL, public transport",
    inLanguage: "en-GB",
    isAccessibleForFree: true,
    audience: {
      "@type": "Audience",
      audienceType: "London commuters, DLR passengers, public transport users",
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}
