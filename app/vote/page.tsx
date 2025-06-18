"use client";

import VotePage from "@/components/vote-page";
import { useRouter } from "next/navigation";

export default function Vote() {
  const router = useRouter();
  const handleNavigate = (page: string) => {
    if (page === "home") router.push("/");
    else router.push(`/${page}`);
  };
  return <VotePage onNavigate={handleNavigate} />;
}
