"use client"

import { useState, useEffect } from "react"
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

interface GetToKnowYouData {
  ageRange: string
  currentStatus: string[]
  livingSituation: string
  birthOrder: string
  dailyActivities: string
  supportSystem: string[]
  bringYouHere: string[]
  feeling: string
  additionalInfo: string
  submittedAt?: string
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

export default function PersonalityTestPage() {
  const [getToKnowYouHistory, setGetToKnowYouHistory] = useState<GetToKnowYouData | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Load data from localStorage when component mounts
    const savedData = localStorage.getItem("getToKnowYouData")
    if (savedData) {
      try {
        const data = JSON.parse(savedData)
        setGetToKnowYouHistory(data)
      } catch (error) {
        console.error("Error loading saved data:", error)
      }
    }
  }, [])

  const handleDeleteHistory = () => {
    if (confirm("Are you sure you want to delete this history? This action cannot be undone.")) {
      localStorage.removeItem("getToKnowYouData")
      setGetToKnowYouHistory(null)
      setShowDetails(false)
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

          {/* Right Content - Personality Test Section */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
              {/* Decorative header line */}
              <div className="h-3 bg-[#d8a9ba] rounded-t-3xl -mx-8 -mt-8 mb-8 md:-mx-12 md:-mt-12" />

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Your Recent Personality Test</h1>
              <p className="text-gray-600 text-lg mb-12">
                You can view your most recent personality test results here.
              </p>

              {/* Get to Know You History Section */}
              {getToKnowYouHistory ? (
                <div className="bg-[#f5f5f5] rounded-2xl p-6 mb-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-1">📋 Get to Know You Form History</h2>
                      <p className="text-sm text-gray-600">
                        Form submitted on{" "}
                        {getToKnowYouHistory.submittedAt
                          ? new Date(getToKnowYouHistory.submittedAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : "Recently"}
                      </p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <button
                        onClick={() => setShowDetails(!showDetails)}
                        className="text-[#d8a9ba] hover:text-[#c9949f] font-semibold text-sm transition"
                      >
                        {showDetails ? "Hide Details" : "View Details"}
                      </button>
                      <button
                        onClick={handleDeleteHistory}
                        className="text-red-500 hover:text-red-700 font-semibold text-sm transition"
                        title="Delete this history"
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  {showDetails && (
                    <div className="bg-white rounded-xl p-6 space-y-6 mt-4">
                      {/* Basic Background */}
                      <div className="border-l-4 border-[#d8a9ba] pl-4">
                        <h3 className="font-bold text-gray-900 mb-3">Basic Background</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Age Range</p>
                            <p className="font-semibold text-gray-900">{getToKnowYouHistory.ageRange || "-"}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Living Situation</p>
                            <p className="font-semibold text-gray-900">{getToKnowYouHistory.livingSituation || "-"}</p>
                          </div>
                          <div className="md:col-span-2">
                            <p className="text-gray-600">Current Status</p>
                            <p className="font-semibold text-gray-900">
                              {getToKnowYouHistory.currentStatus.length > 0
                                ? getToKnowYouHistory.currentStatus.join(", ")
                                : "-"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Personal Context */}
                      <div className="border-l-4 border-[#d8a9ba] pl-4">
                        <h3 className="font-bold text-gray-900 mb-3">Personal Context</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Birth Order</p>
                            <p className="font-semibold text-gray-900">{getToKnowYouHistory.birthOrder || "-"}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Support System</p>
                            <p className="font-semibold text-gray-900">
                              {getToKnowYouHistory.supportSystem.length > 0
                                ? getToKnowYouHistory.supportSystem.join(", ")
                                : "-"}
                            </p>
                          </div>
                          <div className="md:col-span-2">
                            <p className="text-gray-600">Daily Activities</p>
                            <p className="font-semibold text-gray-900 whitespace-pre-wrap">
                              {getToKnowYouHistory.dailyActivities || "-"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Current Situation */}
                      <div className="border-l-4 border-[#d8a9ba] pl-4">
                        <h3 className="font-bold text-gray-900 mb-3">Current Situation</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="md:col-span-2">
                            <p className="text-gray-600">What brings you here?</p>
                            <p className="font-semibold text-gray-900">
                              {getToKnowYouHistory.bringYouHere.length > 0
                                ? getToKnowYouHistory.bringYouHere.join(", ")
                                : "-"}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Current Feeling</p>
                            <p className="font-semibold text-gray-900">{getToKnowYouHistory.feeling || "-"}</p>
                          </div>
                          <div className="md:col-span-2">
                            <p className="text-gray-600">Additional Information</p>
                            <p className="font-semibold text-gray-900 whitespace-pre-wrap">
                              {getToKnowYouHistory.additionalInfo || "-"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="bg-[#fef3f8] border-2 border-[#e8c9d5] rounded-2xl p-6 mb-8">
                    <p className="text-gray-600">
                      ℹ️ You haven't filled out the "Get to Know You" form yet. Once you complete it, your responses will appear here.
                    </p>
                  </div>

                  {/* Empty State */}
                  <div className="border-2 border-gray-200 rounded-2xl py-16 px-8 text-center flex flex-col items-center justify-center">
                    <div className="w-24 h-24 bg-[#e8c9d5] rounded-lg flex items-center justify-center mb-6">
                      <svg className="w-12 h-12 text-[#d8a9ba]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">No Test Result</h2>
                    <p className="text-gray-600">You haven't take a personality test yet.</p>
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
