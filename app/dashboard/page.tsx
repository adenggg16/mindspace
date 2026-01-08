"use client"

import { useState } from "react"
import DashboardNavbar from "@/components/dashboard/navbar"
import MoodSelector from "@/components/dashboard/mood-selector"
import ReflectionSection from "@/components/dashboard/reflection-section"
import ExploreFeatures from "@/components/dashboard/explore-features"


export default function DashboardHome() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [reflection, setReflection] = useState("")

  const handleSubmitMood = () => {
    if (selectedMood && reflection) {
      console.log("Submitted:", { mood: selectedMood, reflection })
      // Handle mood submission
      setReflection("")
      setSelectedMood(null)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-blue-100">
      <DashboardNavbar />

      <main className="flex-1 px-4 md:px-6 py-8 md:py-12 max-w-6xl mx-auto w-full">
        {/* Welcome Section */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-12 shadow-xl mb-6 md:mb-8">
          <h1 className="text-2xl md:text-5xl font-bold text-gray-900 text-center mb-3 md:mb-4">Welcome back, RPL!</h1>
          <p className="text-base md:text-lg text-gray-700 text-center mb-6 md:mb-8">How are you feeling today?</p>

          <MoodSelector selectedMood={selectedMood} onMoodSelect={setSelectedMood} />
        </div>

        {/* Reflection Section */}
        <ReflectionSection
          reflection={reflection}
          onReflectionChange={setReflection}
          onSubmit={handleSubmitMood}
          moodSelected={!!selectedMood}
        />

        {/* Explore Features Section */}
        <ExploreFeatures />
      </main>
    </div>
  )
}
