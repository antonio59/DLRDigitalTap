"use client"

import { Button } from "@/components/ui/button"
import { Heart, Mail, Github, Linkedin } from "lucide-react"

interface FooterProps {
  onNavigate: (page: string) => void
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">DLR Digital Tap</h3>
            <p className="text-gray-300 mb-4">
              Revolutionizing DLR travel with seamless, contactless technology. Making public transportation more
              accessible and efficient for everyone.
            </p>
            <div className="flex items-center text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="h-4 w-4 mx-1 text-red-500" />
              <span>for London commuters</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate("home")} className="text-gray-300 hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("about")}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <a href="/terms" className="text-gray-300 hover:text-white transition-colors">Terms</a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy</a>
              </li>
              <li>
                <button onClick={() => onNavigate("vote")} className="text-gray-300 hover:text-white transition-colors">
                  Vote
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("contact")}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="space-y-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white hover:bg-gray-800 p-0 h-auto justify-start"
                onClick={() => onNavigate("contact")}
              >
                <Mail className="h-4 w-4 mr-2" />
                Get in Touch
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white hover:bg-gray-800 p-0 h-auto justify-start"
              >
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white hover:bg-gray-800 p-0 h-auto justify-start"
              >
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © 2024 DLR Digital Tap. This is a concept project to demonstrate innovative public transport solutions.
          </div>
          <div className="text-gray-400 text-sm mt-4 md:mt-0">
            Not affiliated with TfL or DLR. Built with ❤️ for better commuting.
          </div>
        </div>
      </div>
    </footer>
  )
}
