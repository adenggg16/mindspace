"use client"

import { Users, Calendar, Clock, TrendingUp } from "lucide-react"

interface StatCard {
  title: string
  value: string | number
  icon: React.ReactNode
  trend?: number
  color: string
}

export default function StatisticsSection() {
  const stats: StatCard[] = [
    {
      title: "Total Clients",
      value: "24",
      icon: <Users size={24} />,
      trend: 12,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Scheduled Sessions",
      value: "8",
      icon: <Calendar size={24} />,
      trend: 5,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Hours This Week",
      value: "12h",
      icon: <Clock size={24} />,
      trend: -3,
      color: "from-pink-500 to-pink-600"
    },
    {
      title: "Completion Rate",
      value: "94%",
      icon: <TrendingUp size={24} />,
      trend: 8,
      color: "from-green-500 to-green-600"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-gradient-to-br ${stat.color} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-white/20 rounded-lg">
              {stat.icon}
            </div>
            {stat.trend && (
              <span className={`text-sm font-bold ${stat.trend > 0 ? "text-green-200" : "text-red-200"}`}>
                {stat.trend > 0 ? "+" : ""}{stat.trend}%
              </span>
            )}
          </div>
          <h3 className="text-gray-100 text-sm font-medium mb-1">{stat.title}</h3>
          <p className="text-3xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  )
}
