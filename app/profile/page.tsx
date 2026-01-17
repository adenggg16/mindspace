"use client"

import { useState, useEffect } from "react"
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

const defaultProfileData: ProfileData = {
  name: "Salsabila Adelia Putrie",
  birthDate: "December, 7, 2000",
  location: "Jakarta, Indonesia",
  email: "salsabila.adelia@gmail.com",
  phone: "+62 876543296",
  socialHandle: "salsaadl",
  image: "/images/adel.png",
}

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData>(defaultProfileData)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [formData, setFormData] = useState<ProfileData>(defaultProfileData)

  useEffect(() => {
    const savedProfile = localStorage.getItem("profileData")
    if (savedProfile) {
      const data = JSON.parse(savedProfile)
      setProfileData(data)
      setFormData(data)
    }
  }, [])

  const handleEditClick = () => {
    setFormData(profileData)
    setIsEditModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsEditModalOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveProfile = () => {
    setProfileData(formData)
    localStorage.setItem("profileData", JSON.stringify(formData))
    setIsEditModalOpen(false)
  }

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
              showEditButton={true}
              onEditClick={handleEditClick}
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

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Edit Profile</h2>

            <div className="space-y-4 md:space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d8a9ba]"
                />
              </div>

              {/* Birth Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Birth Date</label>
                <input
                  type="text"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  placeholder="e.g., December, 7, 2000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d8a9ba]"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d8a9ba]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d8a9ba]"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d8a9ba]"
                />
              </div>

              {/* Social Handle */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Social Handle</label>
                <input
                  type="text"
                  name="socialHandle"
                  value={formData.socialHandle}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d8a9ba]"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={handleCloseModal}
                className="flex-1 bg-gray-300 text-gray-900 font-bold py-2 md:py-3 px-4 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="flex-1 bg-[#d8a9ba] text-gray-900 font-bold py-2 md:py-3 px-4 rounded-lg hover:bg-[#c9949e] transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
