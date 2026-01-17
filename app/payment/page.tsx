"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function PaymentPage() {
  const [psychologistId, setPsychologistId] = useState<string | null>(null)
  const [date, setDate] = useState<string | null>(null)
  const [time, setTime] = useState<string | null>(null)
  const [fee, setFee] = useState<string | null>(null)
  const [psychologist, setPsychologist] = useState<any>(null)

  // Psychologist data
  const psychologists = [
    {
      id: 1,
      name: "dr. Miftahul Jannah, M.Psi., Psikolog",
      university: "Universitas Paramadina - Cipayung",
      consultationFee: "Rp 150,000 per session"
    },
    {
      id: 2,
      name: "dr. Nadia Wulandari, M.Psi., Psikolog",
      university: "Universitas Indonesia - Jakarta",
      consultationFee: "Rp 180,000 per session"
    },
    {
      id: 3,
      name: "dr. Dian, M.Psi., Psikolog",
      university: "Universitas Trisakti - Grogol",
      consultationFee: "Rp 130,000 per session"
    }
  ]
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get query parameters from URL
    const urlParams = new URLSearchParams(window.location.search)
    const psychId = urlParams.get('psychologist')
    const dateParam = urlParams.get('date')
    const timeParam = urlParams.get('time')
    const feeParam = urlParams.get('fee')

    setPsychologistId(psychId)
    setDate(dateParam)
    setTime(timeParam)
    setFee(feeParam)

    if (psychId) {
      const found = psychologists.find(p => p.id === parseInt(psychId))
      setPsychologist(found)
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a2e4a]"></div>
          <p className="mt-4 text-gray-600">Loading payment page...</p>
        </div>
      </div>
    )
  }

  if (!psychologist || !date || !time) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Payment Session</h1>
          <Link href="/counseling">
            <Button className="bg-[#1a2e4a] hover:bg-[#0f1f31] text-white px-6 py-2 rounded-full">
              Back to Counseling
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  if (!psychologist || !date || !time) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Payment Session</h1>
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
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Back Button */}
        <div className="mb-6">
          <Link href={`/psychologist-profile/${psychologistId}`}>
            <Button variant="outline" className="border-[#1a2e4a] text-[#1a2e4a] hover:bg-[#1a2e4a] hover:text-white">
              ← Back to Profile
            </Button>
          </Link>
        </div>

        {/* Payment Header */}
        <div className="bg-white rounded-2xl p-8 shadow-xl mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Complete Your Payment</h1>
          <p className="text-gray-600">Secure payment for your counseling session</p>
        </div>

        {/* Booking Summary */}
        <div className="bg-white rounded-2xl p-8 shadow-xl mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Summary</h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-gray-600">Psychologist</span>
              <span className="font-semibold text-gray-900">{psychologist.name}</span>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-gray-600">Date</span>
              <span className="font-semibold text-gray-900">
                {new Date(date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-gray-600">Time</span>
              <span className="font-semibold text-gray-900">
                {time === "09:00" && "9:00 AM (Morning)"}
                {time === "14:00" && "2:00 PM (Afternoon)"}
                {time === "19:00" && "7:00 PM (Evening)"}
              </span>
            </div>

            <div className="flex justify-between items-center py-3">
              <span className="text-gray-600">Session Fee</span>
              <span className="font-bold text-xl text-[#1a2e4a]">{psychologist.consultationFee}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href={`/psychologist-profile/${psychologistId}`} className="flex-1">
            <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
              Change Schedule
            </Button>
          </Link>
          <Link href={`/payment-method?psychologist=${psychologistId}&date=${date}&time=${time}&fee=${fee}`} className="flex-1">
            <Button className="w-full bg-[#1a2e4a] hover:bg-[#0f1f31] text-white">
              Complete Payment
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}