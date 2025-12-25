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
    <div className="flex flex-wrap gap-6 justify-center">
      {moods.map((mood) => (
        <button
          key={mood.id}
          onClick={() => onMoodSelect(mood.id)}
          className={`flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition ${
            selectedMood === mood.id
              ? "bg-[#1a2e4a] text-white"
              : "bg-white border-2 border-gray-300 text-gray-900 hover:border-gray-400"
          }`}
        >
          <input
            type="checkbox"
            checked={selectedMood === mood.id}
            onChange={() => onMoodSelect(mood.id)}
            className="w-5 h-5 cursor-pointer"
          />
          <span className="text-xl">{mood.icon}</span>
          <span>{mood.label}</span>
        </button>
      ))}
    </div>
  )
}
