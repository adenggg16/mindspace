"use client"

interface MoodSelectorProps {
  selectedMood: string | null
  onMoodSelect: (mood: string) => void
}

export default function MoodSelector({ selectedMood, onMoodSelect }: MoodSelectorProps) {
  const moods = [
    { id: "good", label: "Good", icon: "❤️" },
    { id: "neutral", label: "Neutral", icon: "😊" },
    { id: "sad", label: "Sad", icon: "💙" },
  ]

  return (
    <div className="flex flex-col md:flex-row flex-wrap gap-4 md:gap-6 justify-center">
      {moods.map((mood) => (
        <button
          key={mood.id}
          onClick={() => onMoodSelect(mood.id)}
          className={`flex items-center gap-2 px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold text-sm md:text-base transition ${
            selectedMood === mood.id
              ? "bg-[#1a2e4a] text-white"
              : "bg-white border-2 border-gray-300 text-gray-900 hover:border-gray-400"
          }`}
        >
          <input
            type="checkbox"
            checked={selectedMood === mood.id}
            onChange={() => onMoodSelect(mood.id)}
            className="w-4 h-4 md:w-5 md:h-5 cursor-pointer"
          />
          <span className="text-lg md:text-xl">{mood.icon}</span>
          <span>{mood.label}</span>
        </button>
      ))}
    </div>
  )
}
