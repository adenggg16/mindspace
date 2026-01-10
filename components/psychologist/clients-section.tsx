"use client"

import { useState } from "react"
import { Search, Filter, MessageSquare, Phone, Calendar } from "lucide-react"

interface Client {
  id: string
  name: string
  email: string
  phone: string
  lastSession: string
  nextSession: string | null
  status: "active" | "paused" | "completed"
  issueType: string
  progress: number
}

export default function ClientsSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const clients: Client[] = [
    {
      id: "1",
      name: "Khalisa Azzahra",
      email: "khalisa.azzahra@student.edu",
      phone: "+62 812-3456-7890",
      lastSession: "2026-01-09",
      nextSession: "2026-01-16",
      status: "active",
      issueType: "Anxiety",
      progress: 65
    },
    {
      id: "2",
      name: "Salsabila Adelia Putrie",
      email: "salsabila.putrie@student.edu",
      phone: "+62 812-9876-5432",
      lastSession: "2026-01-08",
      nextSession: "2026-01-15",
      status: "active",
      issueType: "Stress Management",
      progress: 45
    },
    {
      id: "3",
      name: "Ayu Agustyna Hoky",
      email: "ayu.agustyna@student.edu",
      phone: "+62 812-5555-6666",
      lastSession: "2026-01-07",
      nextSession: "2026-01-14",
      status: "active",
      issueType: "Depression",
      progress: 78
    },
    {
      id: "4",
      name: "Muhammad",
      email: "muhammad@student.edu",
      phone: "+62 812-7777-8888",
      lastSession: "2026-01-06",
      nextSession: null,
      status: "paused",
      issueType: "Relationship Issues",
      progress: 40
    },
    {
      id: "5",
      name: "Reyhan Zayyan",
      email: "reyhan.zayyan@student.edu",
      phone: "+62 812-1111-2222",
      lastSession: "2025-12-20",
      nextSession: null,
      status: "completed",
      issueType: "Self-Esteem",
      progress: 100
    }
  ]

  const filteredClients = clients.filter(client => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || client.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-300"
      case "paused":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-300"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getIssueColor = (issue: string) => {
    const colors: { [key: string]: string } = {
      "Anxiety": "bg-red-100 text-red-700",
      "Stress Management": "bg-orange-100 text-orange-700",
      "Depression": "bg-purple-100 text-purple-700",
      "Relationship Issues": "bg-pink-100 text-pink-700",
      "Self-Esteem": "bg-indigo-100 text-indigo-700"
    }
    return colors[issue] || "bg-gray-100 text-gray-700"
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h3 className="text-lg font-bold text-gray-900">My Clients</h3>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1 sm:flex-none">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e17b9e] text-sm"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-400" />
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e17b9e] text-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Clients List */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-4 px-4 font-bold text-gray-700 text-sm">Name</th>
              <th className="text-left py-4 px-4 font-bold text-gray-700 text-sm hidden sm:table-cell">Issue Type</th>
              <th className="text-left py-4 px-4 font-bold text-gray-700 text-sm hidden md:table-cell">Last Session</th>
              <th className="text-left py-4 px-4 font-bold text-gray-700 text-sm">Progress</th>
              <th className="text-left py-4 px-4 font-bold text-gray-700 text-sm">Status</th>
              <th className="text-left py-4 px-4 font-bold text-gray-700 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map(client => (
              <tr key={client.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="py-4 px-4">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{client.name}</p>
                    <p className="text-xs text-gray-500">{client.email}</p>
                  </div>
                </td>
                <td className="py-4 px-4 hidden sm:table-cell">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getIssueColor(client.issueType)}`}>
                    {client.issueType}
                  </span>
                </td>
                <td className="py-4 px-4 hidden md:table-cell text-sm text-gray-600">
                  {new Date(client.lastSession).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </td>
                <td className="py-4 px-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#e17b9e] to-[#d85a8a] h-2 rounded-full"
                      style={{ width: `${client.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{client.progress}%</p>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(
                      client.status
                    )}`}
                  >
                    {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex gap-2">
                    <button
                      title="Message"
                      className="p-2 hover:bg-blue-100 rounded-lg transition text-blue-600"
                    >
                      <MessageSquare size={16} />
                    </button>
                    
                    {client.nextSession && (
                      <button
                        title="Schedule"
                        className="p-2 hover:bg-purple-100 rounded-lg transition text-purple-600"
                      >
                        <Calendar size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No clients found matching your search.</p>
        </div>
      )}

      <div className="mt-6 pt-6 border-t border-gray-200 text-right">
        <button className="px-6 py-2 bg-gradient-to-r from-[#e17b9e] to-[#d85a8a] text-white rounded-lg font-semibold hover:shadow-lg transition">
          View All Clients
        </button>
      </div>
    </div>
  )
}
