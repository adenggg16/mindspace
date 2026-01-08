"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import DashboardNavbar from "@/components/dashboard/navbar"
import { ProfileCard } from "@/components/profile/profile-card"


export default function SecuritySettingsPage() {
  const [formData, setFormData] = useState({
    email: "bismillahrpla@gmail.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCancel = () => {
    router.push('/profile')
  }

  const handleSaveChanges = () => {
    router.push('/profile')
  }

  return (
    <div className="min-h-screen flex flex-col bg-blue-100">
      {/* Navbar */}
      <DashboardNavbar />

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Sidebar */}
          <div className="md:col-span-1">
            <ProfileCard
              name="RPL"
              birthDate="December, 7, 2000"
              location="Singapore, Indonesia"
              email="bismillahrpla@gmail.com"
              phone="+62 8765432%"
              socialHandle="rpl_kelompokce"
              imageUrl="/images/adel.png"
            />
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-3xl p-8 md:p-12">

              {/* Page Header */}
              <div className="mb-10">
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3 mb-2">
                  <span>🔒</span>
                  Security Settings
                </h1>
                <p className="text-gray-600">
                  Manage your account's password to protect your privacy.
                </p>
              </div>

              {/* Change Password Section */}
              <div className="rounded-3xl overflow-hidden border border-[#e5bccc] bg-[#f7ecef] mb-10">

                {/* Header + Divider */}
                <div className="flex items-center gap-3 px-8 py-4 bg-[#edd2da] border-b border-[#e5bccc]">
                  <span className="text-xl">🔐</span>
                  <h2 className="text-lg font-bold text-gray-900">
                    Change password
                  </h2>
                </div>

                {/* Form */}
                <div className="p-8">
                  <div className="space-y-6 max-w-xl">

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        E-Mail
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        disabled
                        className="
                          w-full h-11 px-4
                          rounded-lg
                          border border-[#e5bccc]
                          bg-[#f7ecef]
                          text-gray-700
                        "
                      />
                    </div>

                    {/* Current Password */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        placeholder="******"
                        className="
                          w-full h-11 px-4
                          rounded-lg
                          border border-[#e5bccc]
                          bg-[#f7ecef]
                          text-gray-800
                          focus:outline-none
                          focus:ring-1
                          focus:ring-[#d8a9ba]
                        "
                      />
                    </div>

                    {/* New Password */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="******"
                        className="
                          w-full h-11 px-4
                          rounded-lg
                          border border-[#e5bccc]
                          bg-[#f7ecef]
                          text-gray-800
                          focus:outline-none
                          focus:ring-1
                          focus:ring-[#d8a9ba]
                        "
                      />
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="******"
                        className="
                          w-full h-11 px-4
                          rounded-lg
                          border border-[#e5bccc]
                          bg-[#f7ecef]
                          text-gray-800
                          focus:outline-none
                          focus:ring-1
                          focus:ring-[#d8a9ba]
                        "
                      />
                    </div>

                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="
                    px-8 py-3
                    rounded-full
                    font-bold
                    bg-[#e8c9d5]
                    text-gray-900
                    hover:bg-[#ddb5c4]
                    transition
                  "
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSaveChanges}
                  className="
                    px-8 py-3
                    rounded-full
                    font-bold
                    bg-[#d8a9ba]
                    text-gray-900
                    hover:bg-[#c9949f]
                    transition
                  "
                >
                  Save Changes
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
