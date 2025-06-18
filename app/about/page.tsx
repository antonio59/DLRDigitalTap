"use client";

import AboutPage from "@/components/about-page";
import { useRouter } from "next/navigation";

export default function About() {
  const router = useRouter();
  const handleNavigate = (page: string) => {
    if (page === "home") router.push("/");
    else router.push(`/${page}`);
  };
  return <AboutPage onNavigate={handleNavigate} />;
}
