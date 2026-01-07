"use client"

import Link from "next/link"

interface Activity {
  id: number
  icon: string
  title: string
  href: string
}

export function ActivitiesSection() {
  const activities: Activity[] = [
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
    <section>
      <h2 className="mb-6 text-2xl font-bold text-gray-900">
        Recent Activities
      </h2>

      <div className="overflow-hidden rounded-2xl border border-pink-200 bg-[#f3e6eb]">
        {activities.map((activity, index) => (
          <ActivityItem
            key={activity.id}
            activity={activity}
            isLast={index === activities.length - 1}
          />
        ))}
      </div>
    </section>
  )
}

interface ActivityItemProps {
  activity: Activity
  isLast: boolean
}

function ActivityItem({ activity, isLast }: ActivityItemProps) {
  const { icon, title, href } = activity

  return (
    <Link href={href} className="block">
      <div
        className={`flex items-center gap-4 px-6 py-4 transition-all duration-200 hover:bg-[#ecd6de] ${
          !isLast ? "border-b border-pink-300" : ""
        }`}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-400 text-lg">
          {icon}
        </div>

        <p className="text-sm font-medium text-gray-900">
          {title}
        </p>
      </div>
    </Link>
  )
}
