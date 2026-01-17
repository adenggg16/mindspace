"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useParams } from "next/navigation"
import DashboardNavbar from "@/components/dashboard/navbar"
import Link from "next/link"

interface ChatMessage {
  id: string
  sender: "user" | "psychologist"
  message: string
  timestamp: string
}

interface ConsultationBooking {
  id: string
  psychologistName: string
  psychologistUniversity: string
  bookingDate: string
  consultationDate: string
  consultationTime: string
  consultationFee: string
  status: "completed" | "upcoming" | "cancelled"
  bookedAt: string
}

export default function ChatPage() {
  const router = useRouter()
  const params = useParams()
  const consultationId = params.consultationId as string
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [consultation, setConsultation] = useState<ConsultationBooking | null>(null)
  const [isSending, setIsSending] = useState(false)

  useEffect(() => {
    // Load chat history and consultation details from localStorage
    const savedConsultations = localStorage.getItem("consultationBookings")
    if (savedConsultations) {
      const bookings = JSON.parse(savedConsultations)
      const current = bookings.find((b: ConsultationBooking) => b.id === consultationId)
      if (current) {
        setConsultation(current)
      }
    }

    // Load chat messages for this consultation
    const chatKey = `chat_${consultationId}`
    const savedMessages = localStorage.getItem(chatKey)
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    } else {
      // Initialize with welcome message from psychologist
      const welcomeMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: "psychologist",
        message: "Hello! I'm here to help you. Feel free to share what's on your mind. 😊",
        timestamp: new Date().toISOString(),
      }
      setMessages([welcomeMessage])
      localStorage.setItem(chatKey, JSON.stringify([welcomeMessage]))
    }
  }, [consultationId])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return

    // Create user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      message: inputMessage,
      timestamp: new Date().toISOString(),
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInputMessage("")
    setIsSending(true)

    // Save messages to localStorage
    const chatKey = `chat_${consultationId}`
    localStorage.setItem(chatKey, JSON.stringify(updatedMessages))

    // Simulate psychologist response after 1-2 seconds
    setTimeout(() => {
      const psychologistMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "psychologist",
        message: generatePsychologistResponse(inputMessage),
        timestamp: new Date().toISOString(),
      }

      const finalMessages = [...updatedMessages, psychologistMessage]
      setMessages(finalMessages)
      localStorage.setItem(chatKey, JSON.stringify(finalMessages))
      setIsSending(false)
    }, 1000 + Math.random() * 1000)
  }

  const generatePsychologistResponse = (userMessage: string): string => {
    const responses = [
      "That's a great observation. Can you tell me more about how you're feeling?",
      "I understand. How long have you been experiencing this?",
      "That sounds challenging. Let's explore what's underlying these feelings.",
      "Thank you for sharing that with me. What do you think might be causing this?",
      "That's important to acknowledge. What would help you feel better?",
      "I appreciate your openness. Have you considered trying any coping strategies?",
      "That's a valid feeling. Remember to be kind to yourself during this time.",
      "I hear you. Would you like to discuss some strategies to manage this?",
      "Thank you for trusting me with this. You're doing great.",
      "That's really insightful. How does that make you feel?",
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
  }

  if (!consultation) {
    return (
      <div className="min-h-screen flex flex-col bg-blue-100">
        <DashboardNavbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <p className="text-gray-600 text-lg mb-4">Consultation not found</p>
            <Link
              href="/profile/consultation-history"
              className="bg-[#1a2e4a] text-white font-bold py-2 px-6 rounded-full hover:bg-[#0f1a2f] transition"
            >
              Back to Consultation History
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-blue-100">
      <DashboardNavbar />

      <main className="flex-1 flex flex-col px-4 md:px-6 py-8 md:py-12 max-w-4xl mx-auto w-full">
        {/* Chat Header */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg mb-6">
          <div className="h-3 bg-[#d8a9ba] rounded-t-3xl -mx-6 md:-mx-8 -mt-6 md:-mt-8 mb-6" />

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{consultation.psychologistName}</h1>
              <p className="text-gray-600 text-sm md:text-base mt-1">{consultation.psychologistUniversity}</p>
              <div className="flex gap-4 mt-3 text-sm text-gray-600">
                <span>📅 {new Date(consultation.consultationDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                <span>🕐 {consultation.consultationTime === "09:00" && "9:00 AM"}
                  {consultation.consultationTime === "14:00" && "2:00 PM"}
                  {consultation.consultationTime === "19:00" && "7:00 PM"}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">Upcoming</span>
              <Link
                href="/profile/consultation-history"
                className="text-[#d8a9ba] hover:text-[#c9949f] font-semibold text-sm transition"
              >
                ← Back
              </Link>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-3xl shadow-lg flex flex-col h-[calc(100vh-400px)] md:h-[calc(100vh-380px)]">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl ${
                    msg.sender === "user"
                      ? "bg-[#d8a9ba] text-gray-900 rounded-br-none"
                      : "bg-[#f0f0f0] text-gray-900 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm md:text-base break-words">{msg.message}</p>
                  <p className={`text-xs mt-1 ${msg.sender === "user" ? "text-gray-800" : "text-gray-600"}`}>
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {isSending && (
              <div className="flex justify-start">
                <div className="bg-[#f0f0f0] text-gray-900 px-4 py-3 rounded-2xl rounded-bl-none">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-[#e8c9d5] p-6 md:p-8 bg-white rounded-b-3xl">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message here..."
                disabled={isSending}
                className="flex-1 px-4 py-3 border border-[#e8c9d5] rounded-full focus:outline-none focus:ring-2 focus:ring-[#d8a9ba] disabled:opacity-50"
              />
              <button
                onClick={handleSendMessage}
                disabled={isSending || inputMessage.trim() === ""}
                className="bg-[#1a2e4a] hover:bg-[#0f1a2f] text-white font-bold py-3 px-6 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
