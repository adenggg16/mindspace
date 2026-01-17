"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CounselingPage() {
  // Sample psychologist data
  const psychologists = [
    {
      id: 1,
      name: "dr. Miftahul Jannah, M.Psi., Psikolog",
      university: "Graduated from Paramadina University - Cipayung",
    },
    {
      id: 2,
      name: "dr. Nadia Wulandari, M.Psi., Psikolog",
      university: "Graduated from Universitas Indonesia - Jakarta",
    },
    {
      id: 3,
      name: "dr. Dian, M.Psi.,Psikolog",
      university: "Graduated from Trisakti University - Grogol",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-blue-100">
      {/* Header Navigation */}
      <nav className="bg-[#1a2e4a] text-white py-4 md:py-6 px-4 md:px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <img src="/images/logo.png" alt="MindSpace Logo" className="w-6 h-6 md:w-10 md:h-10" />
            <div>
              <h1 className="text-lg md:text-2xl font-bold">
                Mind<span className="text-[#e17b9e]">Space</span>
              </h1>
              <p className="text-[10px] md:text-sm text-gray-400 leading-tight">A quiet space for your thoughts.</p>
            </div>
          </div>

          <div className="hidden md:flex gap-8">
            <Link href="/dashboard" className="hover:text-[#e17b9e] transition text-sm">
              Home
            </Link>
            <Link href="/articles" className="hover:text-[#e17b9e] transition text-sm">
              Articles
            </Link>
            <Link href="/counseling" className="text-[#e17b9e] transition text-sm font-semibold">
              Counseling
            </Link>
            <Link href="/profile" className="hover:text-[#e17b9e] transition text-sm">
              Profile
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Title Section */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">PSYCHOLOGIST PROFILE</h2>
          <p className="text-base md:text-lg text-gray-700">Find a psychologist who suits your mental health needs.</p>
        </div>

        {/* Psychologists Grid */}
        <div className="grid grid-cols-1 gap-6 md:gap-8">
          {psychologists.map((psychologist) => (
            <div
              key={psychologist.id}
              className="bg-white rounded-xl p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8"
            >
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl border-4 border-[#e17b9e] flex items-center justify-center bg-[#e6ecf5]">
                    <span className="text-4xl md:text-5xl font-bold text-[#3b5b8a]">
                        {psychologist.name
                        .split(" ")
                        .slice(0, 2)
                        .map(word => word[0])
                        .join("")}
                    </span>
                </div>
                </div>


              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{psychologist.name}</h3>
                <p className="text-base md:text-lg text-gray-700 mb-6">{psychologist.university}</p>

                {/* View Profile Button */}
                <Link href={`/psychologist-profile/${psychologist.id}`}>
                  <Button className="bg-[#5b7fa6] hover:bg-[#4a6a8f] text-white px-6 md:px-8 py-2 md:py-3 rounded-full text-sm md:text-base font-semibold">
                    View profile
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
