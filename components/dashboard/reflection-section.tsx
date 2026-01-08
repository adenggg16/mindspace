"use client"

import { Button } from "@/components/ui/button"

interface ReflectionSectionProps {
  reflection: string
  onReflectionChange: (text: string) => void
  onSubmit: () => void
  moodSelected: boolean
}

export default function ReflectionSection({
  reflection,
  onReflectionChange,
  onSubmit,
  moodSelected,
}: ReflectionSectionProps) {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-12 shadow-xl mb-6 md:mb-8">
      <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">Take a moment to reflect on how you feel today.</h2>

      <textarea
        value={reflection}
        onChange={(e) => onReflectionChange(e.target.value)}
        placeholder="Write your thoughts here..."
        className="w-full h-40 md:h-48 p-3 md:p-4 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e17b9e] resize-none"
      />

      <div className="mt-6 md:mt-8 flex justify-center">
        <Button
          onClick={onSubmit}
          disabled={!moodSelected || !reflection.trim()}
          className="bg-[#1a2e4a] hover:bg-[#0f1f31] text-white px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold text-sm md:text-base"
        >
          Submit Your Mood
        </Button>
      </div>
    </div>
  )
}
