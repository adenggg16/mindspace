"use client"

import PsychologistNavbar from "@/components/psychologist/navbar"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, Clock, MapPin, Phone, Video, User } from "lucide-react"

export default function PsychologistSchedule() {
  const router = useRouter()
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 9))
  const [selectedAppointment, setSelectedAppointment] = useState<typeof appointments[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const appointments = [
    {
      id: "1",
      clientName: "Khalisa Azzahra",
      date: "2026-01-09",
      time: "10:00",
      endTime: "11:00",
      duration: 60,
      status: "confirmed",
      notes: "Anxiety management follow-up",
      clientImage: "KA"
    },
    {
      id: "2",
      clientName: "Salsabila Adelia Putrie",
      date: "2026-01-09",
      time: "11:30",
      endTime: "12:30",
      duration: 60,
      status: "confirmed",
      notes: "Stress management session",
      clientImage: "SAP"
    },
    {
      id: "3",
      clientName: "Ayu Agustyna Hoky",
      date: "2026-01-10",
      time: "14:00",
      endTime: "15:00",
      duration: 60,
      status: "pending",
      notes: "Depression support session",
      clientImage: "AA"
    },
    {
      id: "4",
      clientName: "Muhammad",
      date: "2026-01-11",
      time: "09:00",
      endTime: "10:00",
      duration: 60,
      status: "confirmed",
      notes: "Relationship issues consultation",
      clientImage: "MU"
    },
    {
      id: "5",
      clientName: "Reyhan Zayyan",
      date: "2026-01-13",
      time: "16:00",
      endTime: "17:00",
      duration: 60,
      status: "completed",
      notes: "Final session - self-esteem closure",
      clientImage: "RZ"
    },
    {
      id: "6",
      clientName: "Khalisa Azzahra",
      date: "2026-01-16",
      time: "10:00",
      endTime: "11:00",
      duration: 60,
      status: "confirmed",
      notes: "Follow-up session",
      clientImage: "KA"
    }
  ]

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const monthDays = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const days = Array.from({ length: monthDays }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i)

  const currentDateString = currentDate.toISOString().split("T")[0]
  const todayAppointments = appointments.filter(apt => apt.date === currentDateString)
  const allScheduledDates = Array.from(new Set(appointments.map(apt => apt.date)))

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-300"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-pink-50">
      <PsychologistNavbar />

      <main className="flex-1 px-4 md:px-6 py-8 md:py-12 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">My Schedule</h1>
          <p className="text-gray-600 mt-2">Manage your consultation appointments</p>
        </div>

        {/* Schedule Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-gray-600 text-sm font-medium mb-2">Today's Sessions</p>
            <p className="text-4xl font-bold text-[#e17b9e]">{todayAppointments.length}</p>
            <p className="text-xs text-gray-500 mt-2">
              {todayAppointments.reduce((sum, apt) => sum + apt.duration, 0)} minutes total
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-gray-600 text-sm font-medium mb-2">This Week</p>
            <p className="text-4xl font-bold text-purple-600">
              {appointments.filter(apt => {
                const aptDate = new Date(apt.date)
                const weekStart = new Date(currentDate)
                weekStart.setDate(weekStart.getDate() - weekStart.getDay())
                const weekEnd = new Date(weekStart)
                weekEnd.setDate(weekEnd.getDate() + 7)
                return aptDate >= weekStart && aptDate < weekEnd
              }).length}
            </p>
            <p className="text-xs text-gray-500 mt-2">appointments scheduled</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-gray-600 text-sm font-medium mb-2">Completion Rate</p>
            <p className="text-4xl font-bold text-green-600">94%</p>
            <p className="text-xs text-gray-500 mt-2">12 of 13 completed</p>
          </div>
        </div>

        {/* Calendar & Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">
                {currentDate.toLocaleString("en-US", { month: "long", year: "numeric" })}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                <div key={day} className="text-center text-xs font-bold text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {emptyDays.map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square"></div>
              ))}
              {days.map(day => {
                const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
                  .toISOString()
                  .split("T")[0]
                const hasAppointment = allScheduledDates.includes(dateStr)
                const isToday = dateStr === currentDateString

                return (
                  <button
                    key={day}
                    onClick={() =>
                      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))
                    }
                    className={`aspect-square flex items-center justify-center rounded-lg font-semibold text-sm transition relative ${
                      isToday
                        ? "bg-gradient-to-br from-[#e17b9e] to-[#d85a8a] text-white"
                        : hasAppointment
                        ? "bg-blue-100 text-blue-900 hover:bg-blue-200"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {day}
                    {hasAppointment && (
                      <div className={`absolute bottom-1 w-1 h-1 rounded-full ${isToday ? "bg-white" : "bg-blue-600"}`}></div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Schedule List */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">
              {currentDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </h3>

            {todayAppointments.length > 0 ? (
              <div className="space-y-4">
                {todayAppointments.map(appointment => (
                  <div
                    key={appointment.id}
                    className="border-l-4 border-[#e17b9e] bg-gradient-to-r from-pink-50 to-white rounded-lg hover:shadow-md transition overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex gap-4 flex-1">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#e17b9e] to-[#d85a8a] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                            {appointment.clientImage}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-900">{appointment.clientName}</h4>
                            <p className="text-sm text-gray-600 mt-1">{appointment.notes}</p>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border flex-shrink-0 ${getStatusColor(
                            appointment.status
                          )}`}
                        >
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Clock size={16} className="text-[#e17b9e] flex-shrink-0" />
                          <span>
                            {appointment.time} - {appointment.endTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">

                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <span className="font-semibold">{appointment.duration} min</span>
                        </div>
                      </div>

                      <div className="mt-4 flex gap-3">
                        
                          <button 
                            onClick={() => router.push(`/psychologist/chat/${appointment.id}`)}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm"
                          >
                            Join Session
                          </button>
                        
                        <button 
                          onClick={() => {
                            setSelectedAppointment(appointment)
                            setIsModalOpen(true)
                          }}
                          className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition font-medium text-sm"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Clock size={48} className="text-gray-300 mb-4" />
                <p className="text-gray-500 font-medium">No appointments scheduled</p>
                <p className="text-gray-400 text-sm">Select another date or check your schedule</p>
              </div>
            )}
          </div>
        </div>

        {/* Appointment Details Modal */}
        {isModalOpen && selectedAppointment && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Appointment Details</h2>

              <div className="space-y-4">
                {/* Client Info */}
                <div>
                  <p className="text-gray-600 text-sm font-semibold mb-1">Client Name</p>
                  <p className="text-gray-900 font-semibold">{selectedAppointment.clientName}</p>
                </div>

                {/* Status */}
                <div>
                  <p className="text-gray-600 text-sm font-semibold mb-1">Status</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                      selectedAppointment.status
                    )}`}
                  >
                    {selectedAppointment.status.charAt(0).toUpperCase() + selectedAppointment.status.slice(1)}
                  </span>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm font-semibold mb-1">Date</p>
                    <p className="text-gray-900">
                      {new Date(selectedAppointment.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm font-semibold mb-1">Time</p>
                    <p className="text-gray-900">
                      {selectedAppointment.time} - {selectedAppointment.endTime}
                    </p>
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <p className="text-gray-600 text-sm font-semibold mb-1">Duration</p>
                  <p className="text-gray-900">{selectedAppointment.duration} minutes</p>
                </div>

                {/* Notes */}
                <div>
                  <p className="text-gray-600 text-sm font-semibold mb-1">Session Notes</p>
                  <p className="text-gray-900">{selectedAppointment.notes}</p>
                </div>
              </div>

              {/* Close Button */}
              <div className="flex gap-3 mt-8">
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
