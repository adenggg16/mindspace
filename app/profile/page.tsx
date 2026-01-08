"use client"

import DashboardNavbar from "@/components/dashboard/navbar"
import { ProfileCard } from "@/components/profile/profile-card"
import { SettingsSection } from "@/components/profile/settings-section"
import { ActivitiesSection } from "@/components/profile/activities-section"

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
  name: "Salsabila Adelia Putrie",
  birthDate: "December, 7, 2000",
  location: "Singapore, Indonesia",
  email: "adeng16.gmail.com",
  phone: "+62 876543296",
  socialHandle: "rpl_kelompakkece",
  image: "/images/adel.png",
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col bg-blue-100">
      <DashboardNavbar />

      <main className="flex-1 px-4 md:px-6 py-8 md:py-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
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

          {/* Right Content - Main Profile Section */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-lg">
              {/* Decorative header line */}
              <div className="h-2 md:h-3 bg-[#d8a9ba] rounded-t-2xl md:rounded-t-3xl -mx-6 md:-mx-12 -mt-6 md:-mt-12 mb-6 md:mb-8" />

              <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">Welcome to your Profile!</h1>
              <p className="text-gray-600 text-base md:text-lg mb-8 md:mb-12">Manage your personal information and settings here.</p>

              {/* Settings Section */}
              <SettingsSection />

              {/* Recent Activities Section */}
              <ActivitiesSection />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
