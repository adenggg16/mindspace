"use client"

import { useState } from "react"
import DashboardNavbar from "@/components/dashboard/navbar"
import { ProfileCard } from "@/components/profile/profile-card"

export default function NotificationsPage() {
  const [generalNotifications, setGeneralNotifications] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [consultationResults, setConsultationResults] = useState(true)
  const [newArticles, setNewArticles] = useState(true)

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
                  <span>🔔</span>
                  Notifications
                </h1>
                <p className="text-gray-600">Manage the e-mail notifications you receive from MindSpace.</p>
              </div>

              {/* General Notifications Section */}
              <div className="bg-[#e8c9d5] rounded-2xl p-6 mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">General Notifications</h2>
                <div className="space-y-4">
                  <NotificationToggle
                    icon="🔔"
                    label="General Notifications"
                    description="Receive updates on new registered account"
                    checked={generalNotifications}
                    onChange={setGeneralNotifications}
                  />
                  <NotificationToggle
                    icon="✉️"
                    label="E-Mail Notifications"
                    description="Receive important updates via e-mail"
                    checked={emailNotifications}
                    onChange={setEmailNotifications}
                  />
                </div>
              </div>

              {/* Activity Notifications Section */}
              <div className="bg-[#e8c9d5] rounded-2xl p-6 mb-8">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Activity Notifications</h2>
                <div className="space-y-4">
                  <NotificationToggle
                    icon="📋"
                    label="Consultation Results"
                    checked={consultationResults}
                    onChange={setConsultationResults}
                  />
                  <NotificationToggle
                    icon="📚"
                    label="New Articles Available"
                    checked={newArticles}
                    onChange={setNewArticles}
                  />
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

interface NotificationToggleProps {
  icon: string
  label: string
  description?: string
  checked: boolean
  onChange: (checked: boolean) => void
}

function NotificationToggle({ icon, label, description, checked, onChange }: NotificationToggleProps) {
  return (
    <div className="flex items-start gap-4 bg-white rounded-lg p-4">
      <span className="text-2xl flex-shrink-0">{icon}</span>
      <div className="flex-1">
        <div className="font-bold text-gray-900">{label}</div>
        {description && <div className="text-sm text-gray-600">{description}</div>}
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-6 h-6 accent-[#d8a9ba] cursor-pointer flex-shrink-0 mt-1"
      />
    </div>
  )
}
