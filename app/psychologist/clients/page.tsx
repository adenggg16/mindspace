"use client"

import PsychologistNavbar from "@/components/psychologist/navbar"
import { Search, MessageSquare, Calendar, TrendingUp, Eye } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function PsychologistClients() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedClient, setSelectedClient] = useState<typeof clients[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const clients = [
    {
      id: "1",
      name: "Khalisa Azzahra",
      email: "khalisa.azzahra@student.edu",
      phone: "+62 812-3456-7890",
      lastSession: "2026-01-09",
      nextSession: "2026-01-16",
      status: "active",
      issueType: "Anxiety",
      progress: 65,
      totalSessions: 12,
      startDate: "2025-08-15"
    },
    {
      id: "2",
      name: "Salsabila Adelia Putrie",
      email: "salsabila.adelia.putrie@student.edu",
      phone: "+62 812-9876-5432",
      lastSession: "2026-01-08",
      nextSession: "2026-01-15",
      status: "active",
      issueType: "Stress Management",
      progress: 45,
      totalSessions: 8,
      startDate: "2025-10-20"
    },
    {
      id: "3",
      name: "Ayu Agustyna Hoky",
      email: "ayu.agustyna.hoky@student.edu",
      phone: "+62 812-5555-6666",
      lastSession: "2026-01-07",
      nextSession: "2026-01-14",
      status: "active",
      issueType: "Depression",
      progress: 78,
      totalSessions: 18,
      startDate: "2025-06-10"
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
      progress: 40,
      totalSessions: 10,
      startDate: "2025-09-05"
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
      progress: 100,
      totalSessions: 15,
      startDate: "2025-05-01"
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-pink-50">
      <PsychologistNavbar />

      <main className="flex-1 px-4 md:px-6 py-8 md:py-12 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">My Clients</h1>
            <p className="text-gray-600 mt-2">Manage and track your client's progress</p>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search clients by name or email..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e17b9e]"
              />
            </div>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e17b9e]"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map(client => (
            <div key={client.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden group">
              {/* Header with gradient */}
              <div className="h-32 bg-gradient-to-br from-[#e17b9e] to-[#d85a8a]"></div>

              {/* Content */}
              <div className="p-6 -mt-12 relative">
                {/* Avatar */}
                <div className="w-24 h-24 bg-white border-4 border-white rounded-full flex items-center justify-center font-bold text-2xl text-white bg-gradient-to-br from-[#e17b9e] to-[#d85a8a] mb-4 shadow-lg">
                  {client.name.split(" ").map(n => n[0]).join("")}
                </div>

                <h3 className="font-bold text-lg text-gray-900 mb-1">{client.name}</h3>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-semibold border mb-4 ${getIssueColor(
                    client.issueType
                  )}`}
                >
                  {client.issueType}
                </span>

                {/* Info */}
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="font-medium">Email:</span>
                    <span className="truncate">{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="font-medium">Sessions:</span>
                    <span>{client.totalSessions} completed</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="font-medium">Progress:</span>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[#e17b9e] to-[#d85a8a] h-2 rounded-full"
                        style={{ width: `${client.progress}%` }}
                      ></div>
                    </div>
                    <span className="font-semibold text-gray-900">{client.progress}%</span>
                  </div>
                </div>

                {/* Status */}
                <div className="mb-6">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(
                      client.status
                    )}`}
                  >
                    {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedClient(client)
                      setIsModalOpen(true)
                    }}
                    title="View Profile"
                    className="flex-1 p-2 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-lg transition flex items-center justify-center gap-2 font-medium text-sm"
                  >
                    <Eye size={16} />
                    <span className="hidden sm:inline">View</span>
                  </button>
                  <Link
                    href={`/psychologist/chat-history/${client.id}`}
                    title="View Chat History"
                    className="flex-1 p-2 bg-pink-100 text-pink-600 hover:bg-pink-200 rounded-lg transition flex items-center justify-center gap-2 font-medium text-sm"
                  >
                    <MessageSquare size={16} />
                    <span className="hidden sm:inline">Chat</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredClients.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-lg">
            <p className="text-gray-500 text-lg">No clients found matching your search.</p>
          </div>
        )}

        {/* Client Details Modal */}
        {isModalOpen && selectedClient && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{selectedClient.name}</h2>

              <div className="space-y-6">
                {/* Basic Info */}
                <div className="border-b pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Issue Type</p>
                      <p className="text-gray-900 font-semibold mt-1">{selectedClient.issueType}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Status</p>
                      <div className="mt-1">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(
                            selectedClient.status
                          )}`}
                        >
                          {selectedClient.status.charAt(0).toUpperCase() + selectedClient.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="border-b pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Email</p>
                      <p className="text-gray-900 mt-1">{selectedClient.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Phone</p>
                      <p className="text-gray-900 mt-1">{selectedClient.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Session Details */}
                <div className="border-b pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Total Sessions</p>
                      <p className="text-gray-900 font-semibold text-xl mt-1">{selectedClient.totalSessions}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Progress</p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-[#e17b9e] to-[#d85a8a] h-3 rounded-full"
                            style={{ width: `${selectedClient.progress}%` }}
                          ></div>
                        </div>
                        <span className="font-semibold text-gray-900 min-w-fit">{selectedClient.progress}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dates */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Start Date</p>
                      <p className="text-gray-900 mt-1">
                        {new Date(selectedClient.startDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Last Session</p>
                      <p className="text-gray-900 mt-1">
                        {new Date(selectedClient.lastSession).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Next Session</p>
                      <p className="text-gray-900 mt-1">
                        {selectedClient.nextSession
                          ? new Date(selectedClient.nextSession).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : "No session scheduled"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <div className="flex gap-3 mt-8 pt-6 border-t">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-300 text-gray-900 font-bold py-3 px-4 rounded-lg hover:bg-gray-400 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
