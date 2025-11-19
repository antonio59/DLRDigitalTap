"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="border-t bg-gray-900 text-gray-400 text-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-4 py-6">
        <div className="flex items-center gap-1">
          <span>Made with</span>
          <Heart className="w-4 h-4 text-red-500" />
          <span>by Digital Tap</span>
        </div>
        <nav className="flex flex-wrap gap-4 whitespace-nowrap">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <Link href="/vote" className="hover:text-white transition-colors">Vote</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
        </nav>
      </div>
    </footer>
  );
}
