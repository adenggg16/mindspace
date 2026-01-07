"use client"

import Link from "next/link"

export function SettingsSection() {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/profile/notifications">
          <SettingCard icon="🔔" title="Notifications" description="Set your notifications here." />
        </Link>
        <Link href="/profile/security-settings">
          <SettingCard icon="🔒" title="Security Settings" description="Manage your password." />
        </Link>
      </div>
    </div>
  )
}

interface SettingCardProps {
  icon: string
  title: string
  description: string
}

function SettingCard({ icon, title, description }: SettingCardProps) {
  return (
    <div className="bg-[#e8c9d5] rounded-2xl p-6 md:p-8 flex items-start gap-6 cursor-pointer hover:bg-[#ddb5c4] transition">
      <div className="text-4xl flex-shrink-0">{icon}</div>
      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  )
}
