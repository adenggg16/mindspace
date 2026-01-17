"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const stepTitles = {
  1: "Step 1 - Basic Background",
  2: "Step 2 - Personal Context",
  3: "Step 3 - Current Situation",
}

interface GetToKnowYouModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function GetToKnowYouModal({ isOpen, onClose }: GetToKnowYouModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSuccess, setIsSuccess] = useState(false)
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
    // Save form data to localStorage with timestamp
    const dataToSave = {
      ...formData,
      submittedAt: new Date().toISOString(),
    }
    localStorage.setItem("getToKnowYouData", JSON.stringify(dataToSave))
    setIsSuccess(true)
  }

  const handleClose = () => {
    setCurrentStep(1)
    setIsSuccess(false)
    setFormData({
      ageRange: "",
      currentStatus: [],
      livingSituation: "",
      birthOrder: "",
      dailyActivities: "",
      supportSystem: [],
      bringYouHere: [],
      feeling: "",
      additionalInfo: "",
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-8 md:p-12">
          {isSuccess ? (
            <>
              {/* Success Content */}
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-emerald-400 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">Yeay!</h2>
              <div className="text-center mb-8 space-y-4">
                <p className="text-gray-700">
                  Your form has been successfully submitted.
                </p>
                <p className="text-gray-700">
                  Thank you for sharing your information with us. This will help our psychologists provide you with more personalized support.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={handleClose} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-full">
                  Back to Dashboard
                </Button>
                <Link href="/counseling">
                  <Button className="bg-[#1a2e4a] hover:bg-[#0f1f31] text-white px-6 py-2 rounded-full">
                    Start Counselling
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* Form Content */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Get to Know You</h2>
                <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-700 mb-8">Help us understand your background before we start the conversation.</p>

              {/* Progress Indicator */}
              <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-4">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {step}
                      </div>
                      {step < 3 && <div className={`w-12 h-1 ${step < currentStep ? 'bg-blue-600' : 'bg-gray-200'}`}></div>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Step Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-6">{stepTitles[currentStep as keyof typeof stepTitles]}</h3>

              {/* Step Content */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Age Range</label>
                    <select
                      value={formData.ageRange}
                      onChange={(e) => handleInputChange('ageRange', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select age range</option>
                      <option value="18-24">18-24</option>
                      <option value="25-34">25-34</option>
                      <option value="35-44">35-44</option>
                      <option value="45-54">45-54</option>
                      <option value="55-64">55-64</option>
                      <option value="65+">65+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Status (Select all that apply)</label>
                    <div className="space-y-2">
                      {['Student', 'Employed', 'Self-employed', 'Unemployed', 'Retired'].map((status) => (
                        <label key={status} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.currentStatus.includes(status)}
                            onChange={() => handleCheckboxChange('currentStatus', status)}
                            className="mr-2"
                          />
                          {status}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Living Situation</label>
                    <select
                      value={formData.livingSituation}
                      onChange={(e) => handleInputChange('livingSituation', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select living situation</option>
                      <option value="Alone">Alone</option>
                      <option value="With family">With family</option>
                      <option value="With roommates">With roommates</option>
                      <option value="With partner">With partner</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Birth Order</label>
                    <select
                      value={formData.birthOrder}
                      onChange={(e) => handleInputChange('birthOrder', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select birth order</option>
                      <option value="Only child">Only child</option>
                      <option value="Firstborn">Firstborn</option>
                      <option value="Middle child">Middle child</option>
                      <option value="Youngest">Youngest</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Daily Activities</label>
                    <textarea
                      value={formData.dailyActivities}
                      onChange={(e) => handleInputChange('dailyActivities', e.target.value)}
                      placeholder="Describe your typical daily activities..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={4}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Support System (Select all that apply)</label>
                    <div className="space-y-2">
                      {['Family', 'Friends', 'Colleagues', 'Professional help', 'None'].map((support) => (
                        <label key={support} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.supportSystem.includes(support)}
                            onChange={() => handleCheckboxChange('supportSystem', support)}
                            className="mr-2"
                          />
                          {support}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">What brings you here? (Select all that apply)</label>
                    <div className="space-y-2">
                      {['Stress', 'Anxiety', 'Depression', 'Relationship issues', 'Work problems', 'Self-improvement', 'Other'].map((reason) => (
                        <label key={reason} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.bringYouHere.includes(reason)}
                            onChange={() => handleCheckboxChange('bringYouHere', reason)}
                            className="mr-2"
                          />
                          {reason}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">How are you feeling right now?</label>
                    <select
                      value={formData.feeling}
                      onChange={(e) => handleInputChange('feeling', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select how you're feeling</option>
                      <option value="Calm">Calm</option>
                      <option value="Anxious">Anxious</option>
                      <option value="Sad">Sad</option>
                      <option value="Overwhelmed">Overwhelmed</option>
                      <option value="Hopeful">Hopeful</option>
                      <option value="Confused">Confused</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Additional Information</label>
                    <textarea
                      value={formData.additionalInfo}
                      onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                      placeholder="Is there anything else you'd like to share?"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-6 py-2 rounded-full disabled:opacity-50"
                >
                  Back
                </Button>
                {currentStep < 3 ? (
                  <Button
                    onClick={handleContinue}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full"
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full"
                  >
                    Submit
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}