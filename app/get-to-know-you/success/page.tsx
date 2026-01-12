"use client"

import { Button } from "@/components/ui/button"

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 relative overflow-hidden">
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

            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-emerald-400 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">Yeay!</h2>

            {/* Success Message */}
            <div className="text-center mb-8 space-y-4">
              <p className="text-gray-700">
                Your form has been successfully submitted.
              </p>
              <p className="text-gray-700">
                This information <span className="font-bold">will help</span> make our session <span className="font-bold">more meaningful.</span>
              </p>
              <p className="text-gray-700">
                We look forward to supporting you on your mental health journey!
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                onClick={() => window.location.href = "/dashboard"}
                className="bg-[#0A2A5E] hover:bg-[#081F47] text-white px-8 py-2 rounded-full font-semibold"
              >
                Back to Dashboard
              </Button>
              <Button
                className="bg-[#0A2A5E] hover:bg-[#081F47] text-white px-8 py-2 rounded-full font-semibold"
              >
                Consultation Now →
              </Button>
            </div>

            {/* Decorative Stars */}
            <div className="absolute top-8 left-8 text-pink-300 text-xl opacity-60">✨</div>
            <div className="absolute top-20 right-12 text-blue-300 text-xl opacity-60">✨</div>
            <div className="absolute bottom-20 left-12 text-blue-300 text-xl opacity-40">✨</div>
            <div className="absolute bottom-12 right-12 text-pink-300 text-xl opacity-50">✨</div>
          </div>
        </div>
      </main>
    </div>
  )
}
