"use client"

import { useState, useEffect } from "react"
import DashboardNavbar from "@/components/dashboard/navbar"
import { ProfileCard } from "@/components/profile/profile-card"
import { SettingsSection } from "@/components/profile/settings-section"
import { ActivitiesSection } from "@/components/profile/activities-section"
// Import Firebase
import { auth, db } from "@/lib/firebase"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"

interface ProfileData {
  name: string
  birthDate: string
  location: string
  email: string
  phone: string
  socialHandle: string
  image: string
  role?: string // Penting untuk identifikasi koleksi
}

const defaultProfileData: ProfileData = {
  name: "Loading...",
  birthDate: "",
  location: "",
  email: "",
  phone: "",
  socialHandle: "",
  image: "/images/adel.png",
}

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData>(defaultProfileData)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [formData, setFormData] = useState<ProfileData>(defaultProfileData)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Memantau status login user
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // 1. Cek di koleksi 'psychologists' dulu
          let docRef = doc(db, "psychologists", user.uid)
          let docSnap = await getDoc(docRef)

          // 2. Jika tidak ada di 'psychologists', cek di 'users'
          if (!docSnap.exists()) {
            docRef = doc(db, "users", user.uid)
            docSnap = await getDoc(docRef)
          }

          if (docSnap.exists()) {
            const data = docSnap.data()
            const fetchedData: ProfileData = {
              name: data.fullName || "",
              birthDate: data.birthDate || "",
              location: data.location || "",
              email: data.email || user.email || "",
              phone: data.phoneNumber || "",
              socialHandle: data.socialHandle || "",
              image: data.image || "/images/adel.png",
              role: data.role
            }
            setProfileData(fetchedData)
            setFormData(fetchedData)
          }
        } catch (error) {
          console.error("Error fetching profile from Firestore:", error)
        }
      } else {
        // Jika tidak login, arahkan ke login
        window.location.href = "/login"
      }
      setIsLoading(false)
    })

    return () => unsubscribe()
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

  const handleSaveProfile = async () => {
    const user = auth.currentUser
    if (!user) return

    try {
      // Tentukan koleksi berdasarkan role yang ada di data profile
      const targetCollection = profileData.role === "Psikolog" ? "psychologists" : "users"
      const docRef = doc(db, targetCollection, user.uid)

      // Simpan perubahan ke Firebase Firestore
      await updateDoc(docRef, {
        fullName: formData.name,
        birthDate: formData.birthDate,
        location: formData.location,
        phoneNumber: formData.phone,
        socialHandle: formData.socialHandle,
        // email tidak diupdate lewat sini karena biasanya lewat Firebase Auth
      })

      setProfileData(formData)
      setIsEditModalOpen(false)
      alert("Profil berhasil diperbarui!")
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("Gagal memperbarui profil.")
    }
  }

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-blue-100">Loading Profile...</div>
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
              <div className="h-2 md:h-3 bg-[#d8a9ba] rounded-t-2xl md:rounded-t-3xl -mx-6 md:-mx-12 -mt-6 md:-mt-12 mb-6 md:mb-8" />

              <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                Welcome back, {profileData.name.split(' ')[0]}!
              </h1>
              <p className="text-gray-600 text-base md:text-lg mb-8 md:mb-12">Manage your personal information and settings here.</p>

              <SettingsSection />
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

              {/* Email (Biasanya Read Only untuk Keamanan Auth) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="w-full px-4 py-2 border border-gray-200 bg-gray-50 text-gray-500 rounded-lg cursor-not-allowed"
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