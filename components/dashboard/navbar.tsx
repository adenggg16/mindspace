"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function DashboardNavbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-[#1a2e4a] text-white py-4 md:py-6 px-4 md:px-8 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-3">
          <img src="/images/logo.png" alt="MindSpace Logo" className="w-6 h-6 md:w-10 md:h-10" />
          <div>
            <h1 className="text-lg md:text-2xl font-bold">
              Mind<span className="text-[#e17b9e]">Space</span>
            </h1>
            <p className="text-[10px] md:text-sm text-gray-400 leading-tight">A quiet space for your thoughts.</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8">
          <Link href="/dashboard" className="hover:text-[#e17b9e] transition text-sm">
            Home
          </Link>
          <Link href="/articles" className="hover:text-[#e17b9e] transition text-sm">
            Articles
          </Link>
          <Link href="/counseling" className="hover:text-[#e17b9e] transition text-sm">
            Counseling
          </Link>
          <Link href="/profile" className="hover:text-[#e17b9e] transition text-sm">
            Profile
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 hover:bg-white/10 rounded-lg transition"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-white/20 flex flex-col gap-3">
          <Link
            href="/dashboard"
            className="hover:text-[#e17b9e] transition py-2 text-sm"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/articles"
            className="hover:text-[#e17b9e] transition py-2 text-sm"
            onClick={() => setIsOpen(false)}
          >
            Articles
          </Link>
          <Link
            href="/counseling"
            className="hover:text-[#e17b9e] transition py-2 text-sm"
            onClick={() => setIsOpen(false)}
          >
            Counseling
          </Link>
          <Link
            href="/profile"
            className="hover:text-[#e17b9e] transition py-2 text-sm"
            onClick={() => setIsOpen(false)}
          >
            Profile
          </Link>
        </div>
      )}
    </nav>
  )
}
