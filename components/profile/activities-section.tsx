"use client"

import Link from "next/link"

export function ActivitiesSection() {
  const activities = [
    {
      id: 1,
      icon: "📋",
      title: "See your recent personality test.",
      href: "/profile/personality-test",
    },
    {
      id: 2,
      icon: "⏱️",
      title: "Consultation history.",
      href: "/profile/consultation-history",
    },
    {
      id: 3,
      icon: "📚",
      title: "Articles read.",
      href: "/profile/articles-read",
    },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Recent Activities</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {activities.map((activity) => (
          <ActivityItem key={activity.id} icon={activity.icon} title={activity.title} href={activity.href} />
        ))}
      </div>
    </div>
  )
}

interface ActivityItemProps {
  icon: string
  title: string
  href: string
}

function ActivityItem({ icon, title, href }: ActivityItemProps) {
  return (
    <Link href={href}>
      <div className="bg-gradient-to-br from-[#e8c9d5] to-[#ddb5c4] rounded-xl md:rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center gap-3 text-center h-full hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer border border-[#f0dce5]">
        <span className="text-4xl md:text-5xl">{icon}</span>
        <p className="text-gray-900 font-semibold text-sm md:text-base leading-snug">{title}</p>
      </div>
    </Link>
  )
}
