"use client"

import type React from "react"

import { useState } from "react"
import DashboardNavbar from "@/components/dashboard/navbar"
import { ProfileCard } from "@/components/profile/profile-card"

export default function SecuritySettingsPage() {
  const [formData, setFormData] = useState({
    email: "bismillahrpla@gmail.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-[#1a2e4a]">
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
              imageUrl="/profile-photo.jpg"
            />
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-3xl p-8 md:p-12">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3 mb-2">
                  <span>🔒</span>
                  Security Settings
                </h1>
                <p className="text-gray-600">Manage youe account's password to protect your privacy.</p>
              </div>

              {/* Change Password Section */}
              <div className="bg-[#e8c9d5] rounded-2xl p-8 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🔐</span>
                  <h2 className="text-lg font-bold text-gray-900">Change password</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">E-Mail</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Current Password</label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      placeholder="........"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#d8a9ba]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      placeholder="........"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#d8a9ba]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="........"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#d8a9ba]"
                    />
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 justify-end">
                <button className="bg-[#e8c9d5] text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-[#ddb5c4] transition">
                  Cancel
                </button>
                <button className="bg-[#d8a9ba] text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-[#c9949f] transition">
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
