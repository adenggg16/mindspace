"use client"

import DashboardNavbar from "@/components/dashboard/navbar"
import { ProfileCard } from "@/components/profile/profile-card"
import Link from "next/link"

interface ProfileData {
  name: string
  birthDate: string
  location: string
  email: string
  phone: string
  socialHandle: string
  image: string
}

const profileData: ProfileData = {
  name: "RPL",
  birthDate: "December, 7, 2000",
  location: "Singapore, Indonesia",
  email: "bismillahrrpla@gmail.com",
  phone: "+62 876543296",
  socialHandle: "rpl_kelompakkece",
  image: "/images/profile-avatar.png",
}

export default function ConsultationHistoryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-blue-100">
      <DashboardNavbar />

      <main className="flex-1 px-6 py-12 md:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-1">
            <ProfileCard
              name={profileData.name}
              birthDate={profileData.birthDate}
              location={profileData.location}
              email={profileData.email}
              phone={profileData.phone}
              socialHandle={profileData.socialHandle}
              imageUrl={profileData.image}
            />
          </div>

          {/* Right Content - Consultation History Section */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
              {/* Decorative header line */}
              <div className="h-3 bg-[#d8a9ba] rounded-t-3xl -mx-8 -mt-8 mb-8 md:-mx-12 md:-mt-12" />

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Your Consultation History</h1>
              <p className="text-gray-600 text-lg mb-12">Your past counselling session will be listed here.</p>

              {/* Empty State */}
              <div className="border-2 border-gray-200 rounded-2xl py-16 px-8 text-center flex flex-col items-center justify-center">
                <div className="w-24 h-24 bg-[#e8c9d5] rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-12 h-12 text-[#d8a9ba]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No Consulting Records</h2>
                <p className="text-gray-600">You haven't had any consultation sessions yet.</p>
              </div>

              {/* Back to Profile Link */}
              <div className="mt-8">
                <Link
                  href="/profile"
                  className="inline-block bg-[#1a2e4a] text-white font-bold py-3 px-6 rounded-full hover:bg-[#0f1a2f] transition"
                >
                  Back to Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
