"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function PsychologistProfilePage() {
  const params = useParams()
  const id = params.id as string
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Calculate calendar data
  const today = new Date()
  const todayString = today.toISOString().split('T')[0]
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()

  // Psychologist data with detailed information and availability
  const psychologists = [
    {
      id: 1,
      name: "dr. Miftahul Jannah, M.Psi., Psikolog",
      university: "Universitas Paramadina - Cipayung",
      experience: "8+ years",
      specialization: ["Clinical Psychology", "Cognitive Behavioral Therapy", "Anxiety Disorders", "Depression"],
      education: [
        "Doctor of Psychology - Paramadina University (2018)",
        "Master of Psychology - Universitas Indonesia (2015)",
        "Bachelor of Psychology - Paramadina University (2013)"
      ],
      certifications: [
        "Certified CBT Practitioner",
        "Clinical Psychology License",
        "Mental Health First Aid Instructor"
      ],
      languages: ["Indonesian", "English"],
      about: "dr. Miftahul Jannah is a dedicated clinical psychologist with over 8 years of experience helping individuals overcome mental health challenges. She specializes in cognitive behavioral therapy and has helped numerous clients manage anxiety, depression, and stress-related disorders. Her approach combines evidence-based therapeutic techniques with compassionate care.",
      approach: "I believe in creating a safe, non-judgmental space where clients can explore their thoughts and feelings. My therapeutic approach integrates CBT techniques with mindfulness practices to help clients develop coping strategies and achieve lasting positive change.",
      availability: "Sun • Wed • Thu • Fri • Sat = 9:00 AM - 7:00 PM",
      consultationFee: "Rp 150,000 per session",
      rating: 4.9,
      reviews: 127,
      // Available dates (next 30 days from today)
      availableDates: [
        "2026-01-16", "2026-01-17", "2026-01-20", "2026-01-21", "2026-01-22", "2026-01-23", "2026-01-24",
        "2026-01-27", "2026-01-28", "2026-01-29", "2026-01-30", "2026-01-31", "2026-02-03", "2026-02-04",
        "2026-02-05", "2026-02-06", "2026-02-07", "2026-02-10", "2026-02-11", "2026-02-12", "2026-02-13"
      ]
    },
    {
      id: 2,
      name: "dr. Nadia Wulandari, M.Psi., Psikolog",
      university: "Universitas Indonesia - Jakarta",
      experience: "10+ years",
      specialization: ["Child Psychology", "Family Therapy", "Trauma", "Relationship Counseling"],
      education: [
        "Doctor of Psychology - Universitas Indonesia (2016)",
        "Master of Psychology - Universitas Indonesia (2013)",
        "Bachelor of Psychology - Universitas Indonesia (2011)"
      ],
      certifications: [
        "Certified Family Therapist",
        "Trauma-Focused CBT",
        "Play Therapy Certification"
      ],
      languages: ["Indonesian", "English", "Javanese"],
      about: "dr. Nadia Wulandari brings over a decade of experience in child and family psychology. She has extensive expertise in working with children, adolescents, and families facing various psychological challenges. Her work focuses on creating healthy family dynamics and supporting child development.",
      approach: "My practice centers on understanding the unique needs of each family member and fostering healthy relationships. I use a combination of play therapy, family systems therapy, and cognitive behavioral techniques to address individual and relational concerns.",
      availability: "Sun • Mon • Thu • Fri = 9:00 AM - 7:00 PM",
      consultationFee: "Rp 180,000 per session",
      rating: 4.8,
      reviews: 95,
      // Available dates
      availableDates: [
        "2026-01-15", "2026-01-18", "2026-01-21", "2026-01-22", "2026-01-24", "2026-01-25", "2026-01-28",
        "2026-01-29", "2026-01-31", "2026-02-01", "2026-02-04", "2026-02-05", "2026-02-07", "2026-02-08",
        "2026-02-11", "2026-02-12", "2026-02-14", "2026-02-15", "2026-02-18", "2026-02-19"
      ]
    },
    {
      id: 3,
      name: "dr. Dian, M.Psi., Psikolog",
      university: "Universitas Trisakti - Grogol",
      experience: "6+ years",
      specialization: ["Adolescent Psychology", "Career Counseling", "Stress Management", "Self-Esteem Issues"],
      education: [
        "Doctor of Psychology - Trisakti University (2020)",
        "Master of Psychology - Trisakti University (2017)",
        "Bachelor of Psychology - Trisakti University (2015)"
      ],
      certifications: [
        "Certified Career Counselor",
        "Adolescent Mental Health Specialist",
        "Stress Management Consultant"
      ],
      languages: ["Indonesian", "English"],
      about: "dr. Dian specializes in adolescent psychology and career counseling, helping young adults navigate the challenges of growing up and career development. With 6+ years of experience, she has guided numerous individuals through major life transitions and personal growth journeys.",
      approach: "I focus on empowering adolescents and young adults to build resilience and self-confidence. My approach combines career guidance with mental health support, helping clients discover their strengths and navigate life's challenges with greater clarity and purpose.",
      availability: "Sun • Wed • Thu • Sat = 9:00 AM - 7:00 PM",
      consultationFee: "Rp 130,000 per session",
      rating: 4.7,
      reviews: 83,
      // Available dates
      availableDates: [
        "2026-01-16", "2026-01-17", "2026-01-20", "2026-01-21", "2026-01-23", "2026-01-24", "2026-01-27",
        "2026-01-28", "2026-01-30", "2026-01-31", "2026-02-03", "2026-02-04", "2026-02-06", "2026-02-07",
        "2026-02-10", "2026-02-11", "2026-02-13", "2026-02-14", "2026-02-17", "2026-02-18"
      ]
    }
  ]

  const psychologist = psychologists.find(p => p.id === parseInt(id))

  if (!psychologist) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Psychologist Not Found</h1>
          <Link href="/counseling">
            <Button className="bg-[#1a2e4a] hover:bg-[#0f1f31] text-white px-6 py-2 rounded-full">
              Back to Counseling
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-blue-100">
      {/* Header Navigation */}
      <nav className="bg-[#1a2e4a] text-white py-4 md:py-6 px-4 md:px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <img src="/images/logo.png" alt="MindSpace Logo" className="w-6 h-6 md:w-10 md:h-10" />
            <div>
              <h1 className="text-lg md:text-2xl font-bold">
                Mind<span className="text-[#e17b9e]">Space</span>
              </h1>
              <p className="text-[10px] md:text-sm text-gray-400 leading-tight">A quiet space for your thoughts.</p>
            </div>
          </div>

          <div className="hidden md:flex gap-8">
            <Link href="/dashboard" className="hover:text-[#e17b9e] transition text-sm">
              Home
            </Link>
            <Link href="/articles" className="hover:text-[#e17b9e] transition text-sm">
              Articles
            </Link>
            <Link href="/counseling" className="hover:text-[#e17b9e] transition text-sm">
              Counseling
            </Link>
            <Link href="/profile" className="hover:text-[#e17b9e] transition text-sm">
              Profile
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/counseling">
            <Button variant="outline" className="border-[#1a2e4a] text-[#1a2e4a] hover:bg-[#1a2e4a] hover:text-white">
              ← Back to Psychologists
            </Button>
          </Link>
        </div>

        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-3xl border-4 border-[#e17b9e] flex items-center justify-center bg-[#e6ecf5]">
                <span className="text-5xl md:text-6xl font-bold text-[#3b5b8a]">
                  {psychologist.name
                    .split(" ")
                    .slice(0, 2)
                    .map(word => word[0])
                    .join("")}
                </span>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{psychologist.name}</h1>
              <p className="text-lg md:text-xl text-[#5b7fa6] font-semibold mb-4">{psychologist.university}</p>

              {/* Rating and Reviews */}
              <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-5 h-5 ${i < Math.floor(psychologist.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-gray-900">{psychologist.rating}</span>
                </div>
                <span className="text-gray-600">({psychologist.reviews} reviews)</span>
              </div>

              {/* Experience */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Experience</h3>
                <p className="text-gray-700">{psychologist.experience} of professional experience</p>
              </div>

              {/* Consultation Fee */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Consultation Fee</h3>
                <p className="text-2xl font-bold text-[#1a2e4a]">{psychologist.consultationFee}</p>
              </div>

              {/* Book Appointment Button */}
              <Button
                onClick={() => setIsBookingModalOpen(true)}
                className="bg-[#1a2e4a] hover:bg-[#0f1f31] text-white px-8 py-3 rounded-full text-lg font-semibold"
              >
                Book Appointment
              </Button>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* About Section */}
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">About</h2>
            <p className="text-gray-700 leading-relaxed mb-6">{psychologist.about}</p>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">Therapeutic Approach</h3>
            <p className="text-gray-700 leading-relaxed">{psychologist.approach}</p>
          </div>

          {/* Specializations */}
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Specializations</h2>
            <div className="flex flex-wrap gap-2">
              {psychologist.specialization.map((spec, index) => (
                <span key={index} className="bg-[#e6ecf5] text-[#3b5b8a] px-3 py-1 rounded-full text-sm font-medium">
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Education</h2>
            <div className="space-y-4">
              {psychologist.education.map((edu, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#e17b9e] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">{edu}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Certifications</h2>
            <div className="space-y-4">
              {psychologist.certifications.map((cert, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#e17b9e] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">{cert}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Languages & Availability */}
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Languages</h2>
            <div className="flex flex-wrap gap-2">
              {psychologist.languages.map((lang, index) => (
                <span key={index} className="bg-[#e6ecf5] text-[#3b5b8a] px-3 py-1 rounded-full text-sm font-medium">
                  {lang}
                </span>
              ))}
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">Availability</h3>
            <p className="text-gray-700">{psychologist.availability}</p>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#e17b9e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-700">Available through MindSpace platform</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#e17b9e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-700">Response time: Within 24 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-8 md:p-12">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Book Appointment</h2>
                <button
                  onClick={() => setIsBookingModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Psychologist Info */}
              <div className="bg-[#f8fafc] rounded-2xl p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{psychologist.name}</h3>
                <p className="text-gray-600">{psychologist.university}</p>
                <p className="text-[#1a2e4a] font-semibold mt-2">{psychologist.consultationFee}</p>
              </div>

              {/* Date Selection - Full Calendar */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Select Date</h3>

                {/* Month Navigation */}
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => {
                      const newDate = new Date(currentMonth)
                      newDate.setMonth(newDate.getMonth() - 1)
                      setCurrentMonth(newDate)
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <h4 className="text-lg font-semibold text-gray-900">
                    {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h4>

                  <button
                    onClick={() => {
                      const newDate = new Date(currentMonth)
                      newDate.setMonth(newDate.getMonth() + 1)
                      setCurrentMonth(newDate)
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {/* Day headers */}
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-3 text-center text-sm font-semibold text-gray-600">
                      {day}
                    </div>
                  ))}

                  {/* Empty cells for days before first day of month */}
                  {Array.from({ length: firstDayOfMonth }, (_, i) => (
                    <div key={`empty-${i}`} className="p-3"></div>
                  ))}

                  {/* Calendar days */}
                  {Array.from({ length: daysInMonth }, (_, i) => {
                    const day = i + 1
                    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
                    const dateString = date.toISOString().split('T')[0]
                    const isToday = dateString === todayString
                    const isPast = date < today
                    const isAvailable = psychologist.availableDates.includes(dateString)
                    const isSelected = selectedDate === dateString

                    return (
                      <button
                        key={day}
                        onClick={() => !isPast && isAvailable && setSelectedDate(dateString)}
                        disabled={isPast || !isAvailable}
                        className={`p-3 text-center text-sm font-medium rounded-lg transition-all relative ${
                          isPast
                            ? 'text-gray-300 cursor-not-allowed'
                            : isAvailable
                              ? isSelected
                                ? 'bg-[#1a2e4a] text-white shadow-lg'
                                : 'bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer'
                              : 'text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {day}
                        {isToday && (
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
                    <span className="text-gray-600">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-100 border border-gray-200 rounded"></div>
                    <span className="text-gray-600">Unavailable</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">Today</span>
                  </div>
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Select Time</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { time: "09:00", label: "Morning", period: "AM" },
                      { time: "14:00", label: "Afternoon", period: "PM" },
                      { time: "19:00", label: "Evening", period: "PM" }
                    ].map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => setSelectedTime(slot.time)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          selectedTime === slot.time
                            ? 'border-[#1a2e4a] bg-[#1a2e4a] text-white'
                            : 'border-gray-200 hover:border-[#1a2e4a] text-gray-700'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-lg font-semibold">{slot.label}</div>
                          <div className="text-sm opacity-80">{slot.time} {slot.period}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Booking Summary */}
              {selectedDate && selectedTime && (
                <div className="bg-[#f0f8ff] rounded-2xl p-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-semibold">
                        {new Date(selectedDate).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-semibold">
                        {selectedTime === "09:00" && "9:00 AM (Morning)"}
                        {selectedTime === "14:00" && "2:00 PM (Afternoon)"}
                        {selectedTime === "19:00" && "7:00 PM (Evening)"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fee:</span>
                      <span className="font-semibold text-[#1a2e4a]">{psychologist.consultationFee}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => setIsBookingModalOpen(false)}
                  variant="outline"
                  className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    if (selectedDate && selectedTime) {
                      // Navigate to payment page with booking details
                      window.location.href = `/payment?psychologist=${psychologist.id}&date=${selectedDate}&time=${selectedTime}&fee=${psychologist.consultationFee.replace(/\D/g, '')}`
                    }
                  }}
                  disabled={!selectedDate || !selectedTime}
                  className="flex-1 bg-[#1a2e4a] hover:bg-[#0f1f31] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm Booking
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}