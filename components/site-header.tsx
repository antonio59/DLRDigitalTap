"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/vote", label: "Vote" },
  { href: "/contact", label: "Contact" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-40">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 h-14">
        <Link href="/" className="font-semibold text-lg text-blue-600">
          Digital Tap
        </Link>
        <nav className="hidden md:flex gap-6 text-gray-600 text-sm font-medium">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`hover:text-blue-600 transition-colors ${pathname === href ? "text-blue-600" : ""}`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
