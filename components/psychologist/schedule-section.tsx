"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Clock, MapPin, Calendar } from "lucide-react"

interface Appointment {
  id: string
  clientName: string
  clientEmail: string
  clientPhone: string
  date: string
  time: string
  duration: number
  status: "confirmed" | "pending" | "completed"
  issueType: string
}

interface ClientDetailsModalProps {
  isOpen: boolean
  appointment: Appointment | null
  onClose: () => void
}

function ClientDetailsModal({ isOpen, appointment, onClose }: ClientDetailsModalProps) {
  if (!isOpen || !appointment) return null

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Client Details</h2>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <p className="text-gray-600 text-sm font-semibold mb-1">Name</p>
            <p className="text-gray-900 font-semibold">{appointment.clientName}</p>
          </div>

          {/* Email */}
          <div>
            <p className="text-gray-600 text-sm font-semibold mb-1">Email</p>
            <p className="text-gray-900">{appointment.clientEmail}</p>
          </div>

          {/* Phone */}
          <div>
            <p className="text-gray-600 text-sm font-semibold mb-1">Phone</p>
            <p className="text-gray-900">{appointment.clientPhone}</p>
          </div>

          {/* Issue Type */}
          <div>
            <p className="text-gray-600 text-sm font-semibold mb-1">Issue Type</p>
            <p className="text-gray-900">{appointment.issueType}</p>
          </div>

          {/* Appointment Details */}
          <div>
            <p className="text-gray-600 text-sm font-semibold mb-1">Appointment Date & Time</p>
            <p className="text-gray-900">
              {new Date(appointment.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              at {appointment.time}
            </p>
          </div>

          {/* Duration */}
          <div>
            <p className="text-gray-600 text-sm font-semibold mb-1">Duration</p>
            <p className="text-gray-900">{appointment.duration} minutes</p>
          </div>

          {/* Status */}
          <div>
            <p className="text-gray-600 text-sm font-semibold mb-1">Status</p>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
            </span>
          </div>
        </div>

        {/* Close Button */}
        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-300 text-gray-900 font-bold py-3 px-4 rounded-lg hover:bg-gray-400 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ScheduleSection() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 0, 9))
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const appointments: Appointment[] = [
    {
      id: "1",
      clientName: "Khalisa Azzahra",
      clientEmail: "khalisa.azzahra@student.edu",
      clientPhone: "+62 812-3456-7890",
      date: "2026-01-09",
      time: "10:00",
      duration: 60,
      status: "confirmed",
      issueType: "Anxiety"
    },
    {
      id: "2",
      clientName: "Salsabila Adelia Putrie",
      clientEmail: "salsabila.adelia.putrie@student.edu",
      clientPhone: "+62 812-9876-5432",
      date: "2026-01-09",
      time: "11:30",
      duration: 50,
      status: "confirmed",
      issueType: "Stress Management"
    },
    {
      id: "3",
      clientName: "Ayu Agustyna Hoky",
      clientEmail: "ayu.agustyna.hoky@student.edu",
      clientPhone: "+62 812-5555-6666",
      date: "2026-01-10",
      time: "14:00",
      duration: 60,
      status: "pending",
      issueType: "Depression"
    },
    {
      id: "4",
      clientName: "Muhammad",
      clientEmail: "muhammad@student.edu",
      clientPhone: "+62 812-7777-8888",
      date: "2026-01-11",
      time: "09:00",
      duration: 45,
      status: "confirmed",
      issueType: "Relationship Issues"
    },
    {
      id: "5",
      clientName: "Reyhan Zayyan",
      clientEmail: "reyhan.zayyan@student.edu",
      clientPhone: "+62 812-1111-2222",
      date: "2026-01-13",
      time: "16:00",
      duration: 60,
      status: "completed",
      issueType: "Self-Esteem"
    }
  ]

  const handleDetailsClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setIsModalOpen(true)
  }

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

  const getTypeColor = (type: string) => {
    return type === "online" ? "text-blue-600" : "text-orange-600"
  }

  if (!isClient) {
    return null
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
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
            <div key={day} className="text-center text-sm font-semibold text-gray-500">
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
            const hasAppointment = appointments.some(apt => apt.date === dateStr)
            const isToday = dateStr === currentDateString

            return (
              <button
                key={day}
                onClick={() =>
                  setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))
                }
                className={`aspect-square flex items-center justify-center rounded-lg font-semibold text-sm transition ${
                  isToday
                    ? "bg-gradient-to-br from-[#e17b9e] to-[#d85a8a] text-white"
                    : hasAppointment
                    ? "bg-blue-100 text-blue-900 hover:bg-blue-200"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">
          {currentDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </h3>

        {todayAppointments.length > 0 ? (
          <div className="space-y-4">
            {todayAppointments.map(appointment => (
              <div
                key={appointment.id}
                className="border-l-4 border-[#e17b9e] bg-gradient-to-r from-pink-50 to-white p-4 rounded-lg hover:shadow-md transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-gray-900 text-base">{appointment.clientName}</h4>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                      <Clock size={16} />
                      <span>{appointment.time}</span>
                      <span className="text-gray-400">•</span>
                      <span>{appointment.duration} min</span>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                      appointment.status
                    )}`}
                  >
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </span>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={() => handleDetailsClick(appointment)}
                    className="text-sm px-4 py-1.5 rounded-full border border-gray-300 hover:bg-gray-200 transition text-gray-700 font-medium"
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Calendar size={48} className="text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">No appointments scheduled</p>
            <p className="text-gray-400 text-sm">Select another date or check your schedule</p>
          </div>
        )}
      </div>
      </div>

      <ClientDetailsModal 
        isOpen={isModalOpen}
        appointment={selectedAppointment}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
