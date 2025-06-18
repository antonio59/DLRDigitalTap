"use client";

import AboutPage from "@/components/about-page";

export default function About() {
  // Standalone route wrapper – navigation callbacks are no-ops in this context
  return <AboutPage onNavigate={() => {}} />;
}
