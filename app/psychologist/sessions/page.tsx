"use client"

import PsychologistNavbar from "@/components/psychologist/navbar"
import { Search, Filter, Save, Trash2, Plus, File } from "lucide-react"
import { useState } from "react"

export default function PsychologistSessions() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSession, setSelectedSession] = useState<string | null>(null)
  const [notes, setNotes] = useState("")

  const sessions = [
    {
      id: "1",
      clientName: "Bella Sutrisno",
      date: "2026-01-09",
      time: "10:00-11:00",
      type: "online",
      status: "completed",
      notes: "Discussed anxiety triggers and coping mechanisms. Client showed good progress.",
      goals: ["Anxiety management", "Coping strategies"],
      nextFocus: "Continue with deep breathing exercises"
    },
    {
      id: "2",
      clientName: "Rendra Putra",
      date: "2026-01-08",
      time: "11:30-12:20",
      type: "offline",
      status: "completed",
      notes: "Stress management session went well. Client practiced mindfulness techniques.",
      goals: ["Stress reduction", "Work-life balance"],
      nextFocus: "Weekly check-ins on application of techniques"
    },
    {
      id: "3",
      clientName: "Ameera Zahra",
      date: "2026-01-07",
      time: "14:00-15:00",
      type: "online",
      status: "completed",
      notes: "Positive session. Working through depression management strategies.",
      goals: ["Mood tracking", "Daily activities"],
      nextFocus: "Behavioral activation planning"
    },
    {
      id: "4",
      clientName: "Ahmad Hidayat",
      date: "2026-01-06",
      time: "09:00-09:45",
      type: "offline",
      status: "completed",
      notes: "Discussed relationship concerns and communication patterns.",
      goals: ["Communication skills", "Conflict resolution"],
      nextFocus: "Practice new communication techniques"
    },
    {
      id: "5",
      clientName: "Siti Nurhaliza",
      date: "2025-12-20",
      time: "16:00-17:00",
      type: "online",
      status: "completed",
      notes: "Final session - closure and future planning discussed.",
      goals: ["Closure", "Ongoing support planning"],
      nextFocus: "Graduation from therapy"
    }
  ]

  const filteredSessions = sessions.filter(session =>
    session.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const currentSession = sessions.find(s => s.id === selectedSession)

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-pink-50">
      <PsychologistNavbar />

      <main className="flex-1 px-4 md:px-6 py-8 md:py-12 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Session Records</h1>
            <p className="text-gray-600 mt-2">View and manage session notes and progress</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#e17b9e] to-[#d85a8a] text-white rounded-lg font-semibold hover:shadow-lg transition w-fit">
            <Plus size={20} />
            New Session
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sessions List */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6 h-fit">
            <div className="mb-6">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search clients..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e17b9e] text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              {filteredSessions.map(session => (
                <button
                  key={session.id}
                  onClick={() => setSelectedSession(session.id)}
                  className={`w-full text-left p-4 rounded-lg transition border-l-4 ${
                    selectedSession === session.id
                      ? "bg-pink-50 border-[#e17b9e]"
                      : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  <p className="font-semibold text-gray-900 text-sm">{session.clientName}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(session.date).toLocaleDateString("default", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </p>
                  <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                    {session.status}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Session Details */}
          {currentSession ? (
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{currentSession.clientName}</h3>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Date</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(currentSession.date).toLocaleDateString("default", {
                        month: "long",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Time</p>
                    <p className="font-semibold text-gray-900">{currentSession.time}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Type</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      currentSession.type === "online"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-orange-100 text-orange-700"
                    }`}>
                      {currentSession.type === "online" ? "Online" : "In-Person"}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Status</p>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      {currentSession.status}
                    </span>
                  </div>
                </div>

                <div className="h-px bg-gray-200 my-6"></div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Session Goals</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentSession.goals.map((goal, idx) => (
                      <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Session Notes</h4>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg text-sm leading-relaxed">
                    {currentSession.notes}
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Next Session Focus</h4>
                  <p className="text-gray-700 bg-yellow-50 p-4 rounded-lg text-sm border-l-4 border-yellow-400">
                    {currentSession.nextFocus}
                  </p>
                </div>

                <div className="h-px bg-gray-200 my-6"></div>

                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm">
                    <File size={16} />
                    Edit Notes
                  </button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition font-medium text-sm">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-12 flex items-center justify-center min-h-96">
              <div className="text-center">
                <File size={48} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">Select a session to view details</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
