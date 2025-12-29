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
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl mb-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Take a moment to reflect on how you feel today.</h2>
      

      <textarea
        value={reflection}
        onChange={(e) => onReflectionChange(e.target.value)}
        placeholder="Write your thoughts here..."
        className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e17b9e] resize-none"
      />

      <div className="mt-8 flex justify-center">
        <Button
          onClick={onSubmit}
          disabled={!moodSelected || !reflection.trim()}
          className="bg-[#1a2e4a] hover:bg-[#0f1f31] text-white px-8 py-3 rounded-full font-semibold"
        >
          Submit Your Mood
        </Button>
      </div>
    </div>
  )
}
