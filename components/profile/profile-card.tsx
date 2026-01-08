"use client"

import Link from "next/link"

interface ProfileCardProps {
  name: string
  birthDate: string
  location: string
  email: string
  phone: string
  socialHandle: string
  imageUrl?: string
}

export function ProfileCard({
  name,
  birthDate,
  location,
  email,
  phone,
  socialHandle,
  imageUrl = "/placeholder.svg",
}: ProfileCardProps) {
  return (
    <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg flex flex-col items-center md:sticky md:top-24">
      {/* Profile Image with rounded square */}
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl md:rounded-3xl bg-[#e8c9d5] flex items-center justify-center mb-4 md:mb-6 overflow-hidden">
        <img src={imageUrl || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
      </div>

      {/* Name Button */}
      <button className="bg-[#1a2e4a] text-white font-bold py-2 md:py-3 px-6 md:px-8 rounded-full mb-4 md:mb-6 hover:bg-[#0f1a2f] transition text-sm md:text-base">
        Halo, {name}
      </button>

      {/* Profile Info */}
      <div className="text-center space-y-2 md:space-y-4 mb-6 md:mb-8 w-full">
        <InfoItem icon="📅" text={birthDate} />
        <InfoItem icon="📍" text={location} />
        <InfoItem icon="✉️" text={email} />
        <InfoItem icon="📱" text={phone} />
        <InfoItem icon="@" text={socialHandle} />
      </div>

      {/* Edit Profile Button */}
      <button className="border-2 border-[#d8a9ba] text-gray-900 font-bold py-2 md:py-3 px-4 md:px-6 rounded-full mb-4 md:mb-6 hover:bg-[#f5f5f5] transition w-full flex items-center justify-center gap-2 text-sm md:text-base">
        <span>✏️</span>
        Edit Profile
      </button>

      {/* Back to Home Button */}
      <Link
        href="/dashboard"
        className="bg-[#1a2e4a] text-white font-bold py-2 md:py-2 px-4 md:px-6 rounded-full hover:bg-[#0f1a2f] transition w-full text-center text-sm md:text-base"
      >
        Back to Home
      </Link>
    </div>
  )
}

function InfoItem({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center justify-center gap-2 text-gray-700 text-xs md:text-sm break-words">
      <span className="flex-shrink-0">{icon}</span>
      <span className="line-clamp-2">{text}</span>
    </div>
  )
}
