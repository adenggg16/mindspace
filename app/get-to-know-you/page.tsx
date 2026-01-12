"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const stepTitles = {
  1: "Step 1 - Basic Background",
  2: "Step 2 - Personal Context",
  3: "Step 3 - Current Situation",
}

export default function GetToKnowYouPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1 - Basic Background
    ageRange: "" as string,
    currentStatus: [] as string[],
    livingSituation: "" as string,
    // Step 2 - Personal Context
    birthOrder: "" as string,
    dailyActivities: "" as string,
    supportSystem: [] as string[],
    // Step 3 - Current Situation
    bringYouHere: [] as string[],
    feeling: "" as string,
    additionalInfo: "" as string,
  })

  const handleCheckboxChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? (prev[field] as string[]).filter((item) => item !== value)
        : [...(prev[field] as string[]), value],
    }))
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleContinue = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    console.log("Form submitted:", formData)
    // Save form data to database or local storage
    // Redirect to success page
    window.location.href = "/get-to-know-you/success"
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 relative overflow-hidden">
      {/* Diagonal Blue Shape - Top Right */}
      {/* Blue Curved Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path
            d="M 1000 0 L 600 0 Q 450 150, 480 350 Q 510 550, 400 750 Q 300 900, 200 1000 L 1000 1000 Z"
            fill="#0F172A" 
          />
        </svg>
      </div>

      {/* Logo and Header */}
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center gap-2">
            <img src="/images/logo.png" alt="MindSpace" className="h-8 w-auto" />
            <span className="text-lg font-bold text-gray-900">Mind<span className="text-pink-400">Space</span></span>
          </div>
          <p className="text-xs text-gray-600 mt-1">A quiet space for your thoughts.</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 md:py-12 relative z-20">
        <div className="relative w-full max-w-2xl">

          <div className="bg-white rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-8 md:p-12 relative z-10">
            {/* Title and Description */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">Get to Know You</h2>
            <div className="flex items-center gap-3 mb-8">
              <p className="text-gray-700">Help us understand your background before we start the conversation.</p>

            </div>

            {/* Step Title - Centered */}
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">{stepTitles[currentStep as keyof typeof stepTitles]}</h3>

          {/* Step 1 - Basic Background */}
          {currentStep === 1 && (
            <div className="space-y-6">

              {/* Age Range */}
              <div>
                <label className="block text-gray-900 font-semibold mb-3">1. Age Range</label>
                <div className="space-y-2">
                  {["Under 18", "18-21", "22-25", "26+"].map((age) => (
                    <label key={age} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.ageRange === age}
                        onChange={() => handleInputChange("ageRange", age)}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-700">{age}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Current Status */}
              <div>
                <label className="block text-gray-900 font-semibold mb-3">2. Current Status</label>
                <div className="space-y-2">
                  {["Student", "Working", "Both", "Other"].map((status) => (
                    <label key={status} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.currentStatus.includes(status)}
                        onChange={() => handleCheckboxChange("currentStatus", status)}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-700">{status}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Living Situation */}
              <div>
                <label className="block text-gray-900 font-semibold mb-3">3. Living Situation</label>
                <div className="space-y-2">
                  {["With family", "With friends", "Alone", "Other"].map((situation) => (
                    <label key={situation} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.livingSituation === situation}
                        onChange={() => handleInputChange("livingSituation", situation)}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-700">{situation}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2 - Personal Context */}
          {currentStep === 2 && (
            <div className="space-y-6">

              {/* Birth Order */}
              <div>
                <label className="block text-gray-900 font-semibold mb-3">4. Birth Order</label>
                <div className="space-y-2">
                  {["First child", "Middle child", "Youngest", "Only child"].map((order) => (
                    <label key={order} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.birthOrder === order}
                        onChange={() => handleInputChange("birthOrder", order)}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-700">{order}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Daily Activities */}
              <div>
                <label className="block text-gray-900 font-semibold mb-3">5. Daily Activities</label>
                <div className="space-y-2">
                  {["Mostly studying", "Mostly working", "Balanced", "Currently overwhelmed"].map((activity) => (
                    <label key={activity} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.dailyActivities === activity}
                        onChange={() => handleInputChange("dailyActivities", activity)}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-700">{activity}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Support System */}
              <div>
                <label className="block text-gray-900 font-semibold mb-3">6. Support System</label>
                <div className="space-y-2">
                  {["Family", "Friends", "Partner", "I prefer to handle things alone"].map((support) => (
                    <label key={support} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.supportSystem.includes(support)}
                        onChange={() => handleCheckboxChange("supportSystem", support)}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-700">{support}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3 - Current Situation */}
          {currentStep === 3 && (
            <div className="space-y-6">

              {/* What brings you here */}
              <div>
                <label className="block text-gray-900 font-semibold mb-3">7. What brings you here today?</label>
                <div className="space-y-2">
                  {["Academic stress", "Emotional concerns", "Relationship issues", "Self-development", "Just want to talk", "Other"].map((reason) => (
                    <label key={reason} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.bringYouHere.includes(reason)}
                        onChange={() => handleCheckboxChange("bringYouHere", reason)}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-700">{reason}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Feeling Lately */}
              <div>
                <label className="block text-gray-900 font-semibold mb-3">8. How have you been feeling lately?</label>
                <p className="text-sm text-gray-600 mb-3">(slider / radio)</p>
                <div className="flex justify-between gap-2 mb-4">
                  {["😢 Very low", "😐 Neutral", "🙂 Okay", "😊 Good"].map((feeling) => (
                    <label key={feeling} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="feeling"
                        value={feeling}
                        checked={formData.feeling === feeling}
                        onChange={() => handleInputChange("feeling", feeling)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">{feeling}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <label className="block text-gray-900 font-semibold mb-3">9. Anything you'd like the psychologist to know?</label>
                <p className="text-sm text-gray-600 mb-3">[Optional text box]</p>
                <textarea
                  value={formData.additionalInfo}
                  onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                  placeholder="You may leave this blank."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  rows={4}
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-8 pt-6 border-t border-gray-200">
            
        {/* Back button (Step 2 & 3) */}
        {currentStep > 1 && (
    <Button
      onClick={handleBack}
      className="bg-gray-400 hover:bg-gray-500 text-white px-8 py-2 rounded-full font-semibold"
    >
      Back
    </Button>
  )}

  {/* Continue button (Step 1 & 2) */}
  {currentStep < 3 && (
    <Button
      onClick={handleContinue}
      className="bg-[#0A2A5E] hover:bg-[#081F47] text-white px-8 py-2 rounded-full font-semibold"
    >
      Continue
    </Button>
  )}

  {/* Submit button (Step 3 only) */}
  {currentStep === 3 && (
    <Button
      onClick={handleSubmit}
      className="bg-[#0A2A5E] hover:bg-[#081F47] text-white px-8 py-2 rounded-full font-semibold"
    >
      Submit Form
    </Button>
  )}

</div>


          {/* Footer Text */}
          <div className="mt-6 pt-4 text-center">
            <p className="text-xs text-gray-600">
              This form is not a psychological assessment or diagnosis.
            </p>
            <p className="text-xs text-gray-600">
              All information is confidential and used only to support ethical communication with psychologists.
            </p>
          </div>
          </div>
        </div>
      </main>
    </div>
  )
}
