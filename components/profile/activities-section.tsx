"use client"

export function ActivitiesSection() {
  const activities = [
    {
      id: 1,
      icon: "📋",
      title: "See your recent personality test.",
    },
    {
      id: 2,
      icon: "⏱️",
      title: "Consultation history.",
    },
    {
      id: 3,
      icon: "📚",
      title: "Articles read.",
    },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Recent Activities</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <ActivityItem key={activity.id} icon={activity.icon} title={activity.title} />
        ))}
      </div>
    </div>
  )
}

interface ActivityItemProps {
  icon: string
  title: string
}

function ActivityItem({ icon, title }: ActivityItemProps) {
  return (
    <div className="bg-[#e8c9d5] rounded-2xl p-6 flex items-center gap-4 hover:bg-[#ddb5c4] transition cursor-pointer">
      <span className="text-2xl flex-shrink-0">{icon}</span>
      <p className="text-gray-900 font-semibold">{title}</p>
    </div>
  )
}
