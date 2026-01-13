"use client"

import PsychologistNavbar from "@/components/psychologist/navbar"
import { Filter, Download, TrendingUp, Users, Clock, CheckCircle2, AlertCircle, BarChart3 } from "lucide-react"
import { useState } from "react"

export default function PsychologistReports() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedMetric, setSelectedMetric] = useState("sessions")

  const reportData = [
    {
      week: "Week 1",
      sessions: 5,
      clients: 3,
      hours: 4.5,
      satisfaction: 4.8,
      completion: 100
    },
    {
      week: "Week 2",
      sessions: 6,
      clients: 4,
      hours: 5,
      satisfaction: 4.7,
      completion: 100
    },
    {
      week: "Week 3",
      sessions: 4,
      clients: 3,
      hours: 3.5,
      satisfaction: 4.9,
      completion: 75
    },
    {
      week: "Week 4",
      sessions: 5,
      clients: 4,
      hours: 4,
      satisfaction: 4.8,
      completion: 80
    }
  ]

  const clientProgress = [
    {
      name: "Khalisa Azzahra",
      issue: "Anxiety",
      startDate: "2025-08-15",
      progress: 65,
      sessions: 12,
      nextSession: "2026-01-16",
      trend: "improving"
    },
    {
      name: "Salsabila Adelia Putrie",
      issue: "Stress Management",
      startDate: "2025-10-20",
      progress: 45,
      sessions: 8,
      nextSession: "2026-01-15",
      trend: "stable"
    },
    {
      name: "Ayu Agustyna Hoky",
      issue: "Depression",
      startDate: "2025-06-10",
      progress: 78,
      sessions: 18,
      nextSession: "2026-01-14",
      trend: "improving"
    },
    {
      name: "Reyhan Zayyan",
      issue: "Relationship Issues",
      startDate: "2025-09-05",
      progress: 40,
      sessions: 10,
      nextSession: null,
      trend: "paused"
    }
  ]

  const getTrendIcon = (trend: string) => {
    if (trend === "improving") return <TrendingUp className="text-green-600" size={16} />
    if (trend === "stable") return <Clock className="text-yellow-600" size={16} />
    if (trend === "paused") return <AlertCircle className="text-orange-600" size={16} />
    return <CheckCircle2 className="text-gray-600" size={16} />
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-pink-50">
      <PsychologistNavbar />

      <main className="flex-1 px-4 md:px-6 py-8 md:py-12 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600 mt-2">Track your performance and client progress</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg font-semibold hover:bg-gray-50 transition w-fit">
            <Download size={20} />
            Export Report
          </button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium text-sm">Total Sessions</h3>
              <Clock className="text-blue-600" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900">20</p>
            <p className="text-xs text-blue-600 font-medium mt-2">↑ 25% vs last month</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium text-sm">Active Clients</h3>
              <Users className="text-purple-600" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900">4</p>
            <p className="text-xs text-gray-500 font-medium mt-2">1 paused, 1 completed</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium text-sm">Avg. Satisfaction</h3>
              <CheckCircle2 className="text-green-600" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900">4.8/5</p>
            <div className="flex gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-sm ${i < 4 ? "text-yellow-400" : "text-gray-300"}`}>
                  ★
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium text-sm">Completion Rate</h3>
              <BarChart3 className="text-pink-600" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900">94%</p>
            <p className="text-xs text-gray-500 font-medium mt-2">12 of 13 completed</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Sessions Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Weekly Sessions</h3>
              <select
                value={selectedPeriod}
                onChange={e => setSelectedPeriod(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
              </select>
            </div>

            <div className="space-y-4">
              {reportData.map((data, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <span className="w-16 text-sm font-medium text-gray-600">{data.week}</span>
                  <div className="flex-1">
                    <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-blue-700 h-2 rounded-full"
                        style={{ width: `${(data.sessions / 6) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="w-12 text-right text-sm font-semibold text-gray-900">{data.sessions}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Client Metrics */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Performance Metrics</h3>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Average Session Duration</span>
                  <span className="font-bold text-gray-900">58 min</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: "80%" }}></div>
                </div>
              </div>

              <div className="h-px bg-gray-200"></div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Booking Adherence</span>
                  <span className="font-bold text-gray-900">94%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "94%" }}></div>
                </div>
              </div>

              <div className="h-px bg-gray-200"></div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Client Retention</span>
                  <span className="font-bold text-gray-900">100%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div className="bg-pink-600 h-2 rounded-full" style={{ width: "100%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Client Progress Table */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Client Progress</h3>
            <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition">
              <Filter size={20} className="text-gray-600" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-bold text-gray-700 text-sm">Client Name</th>
                  <th className="text-left py-4 px-4 font-bold text-gray-700 text-sm hidden sm:table-cell">Issue Type</th>
                  <th className="text-left py-4 px-4 font-bold text-gray-700 text-sm">Progress</th>
                  <th className="text-left py-4 px-4 font-bold text-gray-700 text-sm hidden md:table-cell">Sessions</th>
                  <th className="text-left py-4 px-4 font-bold text-gray-700 text-sm">Trend</th>
                </tr>
              </thead>
              <tbody>
                {clientProgress.map((client, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{client.name}</p>
                        <p className="text-xs text-gray-500">Started {new Date(client.startDate).toLocaleDateString()}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 hidden sm:table-cell">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        {client.issue}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-[#e17b9e] to-[#d85a8a] h-2 rounded-full"
                          style={{ width: `${client.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{client.progress}%</p>
                    </td>
                    <td className="py-4 px-4 hidden md:table-cell text-sm font-semibold text-gray-900">
                      {client.sessions}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1 text-xs font-medium">
                        {getTrendIcon(client.trend)}
                        <span className="capitalize">{client.trend}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
