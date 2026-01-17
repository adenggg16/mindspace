"use client"

import { Activity, AlertCircle, CheckCircle2, TrendingUp } from "lucide-react"

interface SessionNote {
  id: string
  clientName: string
  date: string
  type: string
  notes: string
  outcome: "positive" | "neutral" | "follow-up"
}

export default function RecentActivitySection() {
  const activities: SessionNote[] = [
    {
      id: "1",
      clientName: "Khalisa Azzahra",
      date: "Today, 10:00 AM",
      type: "Online Session",
      notes: "Discussed anxiety triggers and coping mechanisms",
      outcome: "positive"
    },
    {
      id: "2",
      clientName: "Salsabila Adelia Putrie",
      date: "Yesterday",
      type: "In-Person Session",
      notes: "Stress management exercises - good progress",
      outcome: "positive"
    },
    {
      id: "3",
      clientName: "Ayu Agustyna Hoky",
      date: "Jan 7, 2026",
      type: "Online Session",
      notes: "Follow-up appointment scheduled",
      outcome: "follow-up"
    },
    {
      id: "4",
      clientName: "Muhammad",
      date: "Jan 6, 2026",
      type: "In-Person Session",
      notes: "Session paused per client request",
      outcome: "neutral"
    }
  ]

  const getOutcomeIcon = (outcome: string) => {
    switch (outcome) {
      case "positive":
        return <CheckCircle2 size={20} className="text-green-600" />
      case "neutral":
        return <AlertCircle size={20} className="text-yellow-600" />
      case "follow-up":
        return <TrendingUp size={20} className="text-blue-600" />
      default:
        return <Activity size={20} className="text-gray-600" />
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Recent Sessions */}
      <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Activity size={24} className="text-[#e17b9e]" />
          Recent Sessions
        </h3>

        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={activity.id} className="flex gap-4">
              <div className="flex-shrink-0">
                {getOutcomeIcon(activity.outcome)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">{activity.clientName}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                  </div>
                  <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded whitespace-nowrap">
                    {activity.type}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2">{activity.notes}</p>
              </div>
            </div>
          ))}
        </div>
      </div>


    </div>
  )
}
