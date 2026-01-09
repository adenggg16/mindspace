"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Bell, LogOut, Settings } from "lucide-react"

export default function PsychologistNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <nav className="bg-gradient-to-r from-[#1a2e4a] to-[#2d4a6f] text-white py-4 md:py-6 px-4 md:px-8 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-3">
          <img src="/images/logo.png" alt="MindSpace Logo" className="w-6 h-6 md:w-10 md:h-10" />
          <div>
            <h1 className="text-lg md:text-2xl font-bold">
              Mind<span className="text-[#e17b9e]">Space</span>
            </h1>
            <p className="text-[10px] md:text-sm text-gray-300 leading-tight">Professional Dashboard</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          <Link href="/psychologist" className="hover:text-[#e17b9e] transition text-sm font-medium">
            Dashboard
          </Link>
          <Link href="/psychologist/clients" className="hover:text-[#e17b9e] transition text-sm font-medium">
            My Clients
          </Link>
          <Link href="/psychologist/schedule" className="hover:text-[#e17b9e] transition text-sm font-medium">
            Schedule
          </Link>
          <Link href="/psychologist/sessions" className="hover:text-[#e17b9e] transition text-sm font-medium">
            Sessions
          </Link>
          <Link href="/psychologist/reports" className="hover:text-[#e17b9e] transition text-sm font-medium">
            Reports
          </Link>

          {/* Notification & Profile */}
          <button className="relative p-2 hover:bg-white/10 rounded-lg transition">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-lg transition"
            >
              <div className="w-8 h-8 bg-[#e17b9e] rounded-full flex items-center justify-center font-bold">
                DR
              </div>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-lg shadow-xl overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="font-semibold">Dr. Sarah Anderson</p>
                  <p className="text-sm text-gray-500">Clinical Psychologist</p>
                </div>
                <Link
                  href="/psychologist/profile"
                  className="block px-4 py-2 hover:bg-gray-100 text-sm transition"
                >
                  Profile Settings
                </Link>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm transition flex items-center gap-2">
                  <Settings size={16} /> Preferences
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 text-sm transition flex items-center gap-2 border-t border-gray-200">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
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
            href="/psychologist"
            className="hover:text-[#e17b9e] transition py-2 text-sm font-medium"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            href="/psychologist/clients"
            className="hover:text-[#e17b9e] transition py-2 text-sm font-medium"
            onClick={() => setIsOpen(false)}
          >
            My Clients
          </Link>
          <Link
            href="/psychologist/schedule"
            className="hover:text-[#e17b9e] transition py-2 text-sm font-medium"
            onClick={() => setIsOpen(false)}
          >
            Schedule
          </Link>
          <Link
            href="/psychologist/sessions"
            className="hover:text-[#e17b9e] transition py-2 text-sm font-medium"
            onClick={() => setIsOpen(false)}
          >
            Sessions
          </Link>
          <Link
            href="/psychologist/reports"
            className="hover:text-[#e17b9e] transition py-2 text-sm font-medium"
            onClick={() => setIsOpen(false)}
          >
            Reports
          </Link>
        </div>
      )}
    </nav>
  )
}
