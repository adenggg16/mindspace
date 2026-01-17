"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import DashboardNavbar from "@/components/dashboard/navbar"
import { ProfileCard } from "@/components/profile/profile-card"
import Link from "next/link"

interface ProfileData {
  name: string
  birthDate: string
  location: string
  email: string
  phone: string
  socialHandle: string
  image: string
}

interface ConsultationBooking {
  id: string
  psychologistName: string
  psychologistUniversity: string
  bookingDate: string
  consultationDate: string
  consultationTime: string
  consultationFee: string
  status: "completed" | "upcoming" | "cancelled"
  bookedAt: string
}

const profileData: ProfileData = {
  name: "Salsabila Adelia Putrie",
  birthDate: "December, 7, 2000",
  location: "Jakarta, Indonesia",
  email: "salsabila.adelia@gmail.com",
  phone: "+62 8765432109",
  socialHandle: "salsaadl",
  image: "/images/adel.png",
}

export default function ConsultationHistoryPage() {
  const router = useRouter()
  const [consultations, setConsultations] = useState<ConsultationBooking[]>([])
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    // Load consultations from localStorage when component mounts
    const savedConsultations = localStorage.getItem("consultationBookings")
    if (savedConsultations) {
      try {
        const bookings = JSON.parse(savedConsultations)
        setConsultations(bookings)
      } catch (error) {
        console.error("Error loading saved consultations:", error)
      }
    }
  }, [])

  const handleStartChat = (consultationId: string) => {
    // Navigate to chat page with consultation ID
    router.push(`/chat/${consultationId}`)
  }

  const handleDeleteConsultation = (consultationId: string) => {
    if (confirm("Are you sure you want to delete this consultation booking? This action cannot be undone.")) {
      const updatedConsultations = consultations.filter((consultation) => consultation.id !== consultationId)
      setConsultations(updatedConsultations)

      if (updatedConsultations.length > 0) {
        localStorage.setItem("consultationBookings", JSON.stringify(updatedConsultations))
      } else {
        localStorage.removeItem("consultationBookings")
      }

      if (expandedId === consultationId) {
        setExpandedId(null)
      }
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed"
      case "upcoming":
        return "Upcoming"
      case "cancelled":
        return "Cancelled"
      default:
        return "Unknown"
    }
  }
  return (
    <div className="min-h-screen flex flex-col bg-blue-100">
      <DashboardNavbar />

      <main className="flex-1 px-6 py-12 md:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-1">
            <ProfileCard
              name={profileData.name}
              birthDate={profileData.birthDate}
              location={profileData.location}
              email={profileData.email}
              phone={profileData.phone}
              socialHandle={profileData.socialHandle}
              imageUrl={profileData.image}
            />
          </div>

          {/* Right Content - Consultation History Section */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
              {/* Decorative header line */}
              <div className="h-3 bg-[#d8a9ba] rounded-t-3xl -mx-8 -mt-8 mb-8 md:-mx-12 md:-mt-12" />

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Your Consultation History</h1>
              <p className="text-gray-600 text-lg mb-12">Your past counselling session will be listed here.</p>

              {/* Consultation History Section */}
              {consultations.length > 0 ? (
                <div className="space-y-4 mb-8">
                  {consultations.map((consultation) => (
                    <div
                      key={consultation.id}
                      className="bg-[#f5f5f5] rounded-2xl p-6 border border-[#e8c9d5] hover:border-[#d8a9ba] transition"
                    >
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-gray-900">{consultation.psychologistName}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(consultation.status)}`}>
                              {getStatusLabel(consultation.status)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{consultation.psychologistUniversity}</p>
                          
                          {/* Key Details */}
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <span>📅 {new Date(consultation.consultationDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            <span>🕐 {consultation.consultationTime === "09:00" && "9:00 AM"}{consultation.consultationTime === "14:00" && "2:00 PM"}{consultation.consultationTime === "19:00" && "7:00 PM"}</span>
                            <span>💰 {consultation.consultationFee}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 items-start flex-shrink-0">
                          <button
                            onClick={() => setExpandedId(expandedId === consultation.id ? null : consultation.id)}
                            className="text-[#d8a9ba] hover:text-[#c9949f] font-semibold text-sm transition"
                          >
                            {expandedId === consultation.id ? "Hide Details" : "View Details"}
                          </button>
                          <button
                            onClick={() => handleDeleteConsultation(consultation.id)}
                            className="text-red-500 hover:text-red-700 font-semibold text-sm transition"
                            title="Delete this booking"
                          >
                            ✕
                          </button>
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {expandedId === consultation.id && (
                        <div className="bg-white rounded-xl p-6 mt-4 border-t border-[#e8c9d5]">
                          <h4 className="font-bold text-gray-900 mb-4">Booking Details</h4>
                          
                          {/* Booking & Consultation Info */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h5 className="font-semibold text-gray-900 mb-3 text-sm">Psychologist Information</h5>
                              <div className="space-y-2 text-sm">
                                <div>
                                  <p className="text-gray-600">Name</p>
                                  <p className="font-semibold text-gray-900">{consultation.psychologistName}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">University</p>
                                  <p className="font-semibold text-gray-900">{consultation.psychologistUniversity}</p>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h5 className="font-semibold text-gray-900 mb-3 text-sm">Consultation Schedule</h5>
                              <div className="space-y-2 text-sm">
                                <div>
                                  <p className="text-gray-600">Date</p>
                                  <p className="font-semibold text-gray-900">
                                    {new Date(consultation.consultationDate).toLocaleDateString('en-US', {
                                      weekday: 'long',
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric',
                                    })}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-gray-600">Time</p>
                                  <p className="font-semibold text-gray-900">
                                    {consultation.consultationTime === "09:00" && "9:00 AM (Morning)"}
                                    {consultation.consultationTime === "14:00" && "2:00 PM (Afternoon)"}
                                    {consultation.consultationTime === "19:00" && "7:00 PM (Evening)"}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h5 className="font-semibold text-gray-900 mb-3 text-sm">Payment Information</h5>
                              <div className="space-y-2 text-sm">
                                <div>
                                  <p className="text-gray-600">Consultation Fee</p>
                                  <p className="font-bold text-[#1a2e4a] text-lg">{consultation.consultationFee}</p>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h5 className="font-semibold text-gray-900 mb-3 text-sm">Booking Information</h5>
                              <div className="space-y-2 text-sm">
                                <div>
                                  <p className="text-gray-600">Booked On</p>
                                  <p className="font-semibold text-gray-900">
                                    {new Date(consultation.bookedAt).toLocaleDateString('en-US', {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit',
                                    })}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Start Chat Button */}
                          {consultation.status === "upcoming" && (
                            <div className="mt-6 pt-6 border-t border-[#e8c9d5]">
                              <button
                                onClick={() => handleStartChat(consultation.id)}
                                className="w-full bg-[#1a2e4a] hover:bg-[#0f1a2f] text-white font-bold py-3 px-4 rounded-lg transition"
                              >
                                💬 Start Chat with Psychologist
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {/* Empty State */}
                  <div className="border-2 border-gray-200 rounded-2xl py-16 px-8 text-center flex flex-col items-center justify-center">
                    <div className="w-24 h-24 bg-[#e8c9d5] rounded-lg flex items-center justify-center mb-6">
                      <svg className="w-12 h-12 text-[#d8a9ba]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">No Consulting Records</h2>
                    <p className="text-gray-600">You haven't had any consultation sessions yet.</p>
                  </div>
                </>
              )}

              {/* Back to Profile Link */}
              <div className="mt-8">
                <Link
                  href="/profile"
                  className="inline-block bg-[#1a2e4a] text-white font-bold py-3 px-6 rounded-full hover:bg-[#0f1a2f] transition"
                >
                  Back to Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
