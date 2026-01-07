"use client"

export function SettingsSection() {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SettingCard icon="🔔" title="Notifications" description="Set your notifications here." />
        <SettingCard icon="🔒" title="Security Settings" description="Manage your password." />
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
    <div className="bg-[#e8c9d5] rounded-2xl p-6 md:p-8 flex items-start gap-6">
      <div className="text-4xl flex-shrink-0">{icon}</div>
      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  )
}
