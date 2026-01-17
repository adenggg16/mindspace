"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useParams } from "next/navigation"
import PsychologistNavbar from "@/components/psychologist/navbar"
import Link from "next/link"

interface ChatMessage {
  id: string
  sender: "psychologist" | "client"
  message: string
  timestamp: string
}

interface Client {
  id: string
  name: string
  email: string
  phone: string
  lastSession: string
  nextSession: string | null
  status: string
  issueType: string
  progress: number
  totalSessions: number
  startDate: string
}

export default function PsychologistChatPage() {
  const router = useRouter()
  const params = useParams()
  const clientId = params.clientId as string
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [client, setClient] = useState<Client | null>(null)
  const [isSending, setIsSending] = useState(false)

  // Client data
  const clientsData: Client[] = [
    {
      id: "1",
      name: "Khalisa Azzahra",
      email: "khalisa.azzahra@student.edu",
      phone: "+62 812-3456-7890",
      lastSession: "2026-01-09",
      nextSession: "2026-01-16",
      status: "active",
      issueType: "Anxiety",
      progress: 65,
      totalSessions: 12,
      startDate: "2025-08-15"
    },
    {
      id: "2",
      name: "Salsabila Adelia Putrie",
      email: "salsabila.adelia.putrie@student.edu",
      phone: "+62 812-9876-5432",
      lastSession: "2026-01-08",
      nextSession: "2026-01-15",
      status: "active",
      issueType: "Stress Management",
      progress: 45,
      totalSessions: 8,
      startDate: "2025-10-20"
    },
    {
      id: "3",
      name: "Ayu Agustyna Hoky",
      email: "ayu.agustyna.hoky@student.edu",
      phone: "+62 812-5555-6666",
      lastSession: "2026-01-07",
      nextSession: "2026-01-14",
      status: "active",
      issueType: "Depression",
      progress: 78,
      totalSessions: 18,
      startDate: "2025-06-10"
    },
    {
      id: "4",
      name: "Muhammad",
      email: "muhammad@student.edu",
      phone: "+62 812-7777-8888",
      lastSession: "2026-01-06",
      nextSession: null,
      status: "paused",
      issueType: "Relationship Issues",
      progress: 40,
      totalSessions: 10,
      startDate: "2025-09-05"
    },
    {
      id: "5",
      name: "Reyhan Zayyan",
      email: "reyhan.zayyan@student.edu",
      phone: "+62 812-1111-2222",
      lastSession: "2025-12-20",
      nextSession: null,
      status: "completed",
      issueType: "Self-Esteem",
      progress: 100,
      totalSessions: 15,
      startDate: "2025-05-01"
    }
  ]

  useEffect(() => {
    // Find client details
    const currentClient = clientsData.find(c => c.id === clientId)
    if (currentClient) {
      setClient(currentClient)
    }

    // Load chat messages for this client
    const chatKey = `psychologist_chat_${clientId}`
    const savedMessages = localStorage.getItem(chatKey)
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    } else {
      // Initialize with welcome message
      const welcomeMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: "psychologist",
        message: "Hello! I hope you're having a good day. How are you feeling today?",
        timestamp: new Date().toISOString(),
      }
      setMessages([welcomeMessage])
      localStorage.setItem(chatKey, JSON.stringify([welcomeMessage]))
    }
  }, [clientId])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return

    // Create psychologist message
    const psychologistMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "psychologist",
      message: inputMessage,
      timestamp: new Date().toISOString(),
    }

    const updatedMessages = [...messages, psychologistMessage]
    setMessages(updatedMessages)
    setInputMessage("")
    setIsSending(true)

    // Save messages to localStorage
    const chatKey = `psychologist_chat_${clientId}`
    localStorage.setItem(chatKey, JSON.stringify(updatedMessages))

    // Simulate client response after 1-2 seconds
    setTimeout(() => {
      const clientResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "client",
        message: generateClientResponse(inputMessage),
        timestamp: new Date().toISOString(),
      }

      const finalMessages = [...updatedMessages, clientResponse]
      setMessages(finalMessages)
      localStorage.setItem(chatKey, JSON.stringify(finalMessages))
      setIsSending(false)
    }, 1000 + Math.random() * 1000)
  }

  const generateClientResponse = (message: string): string => {
    const responses = [
      "Thank you for listening to me. That really helps.",
      "I understand what you're saying. I'll think about that.",
      "You know, I never thought about it that way before.",
      "That makes sense. I feel a bit better now.",
      "I appreciate your guidance. It's helping me.",
      "Yes, I've been trying to work on that.",
      "That's a good point. I should practice that more.",
      "I'm grateful for your support and advice.",
      "You're right, I need to be more patient with myself.",
      "Thank you for helping me through this.",
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
  }

  if (!client) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-pink-50">
        <PsychologistNavbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <p className="text-gray-600 text-lg mb-4">Client not found</p>
            <Link
              href="/psychologist/clients"
              className="bg-gradient-to-r from-[#e17b9e] to-[#d85a8a] text-white font-bold py-2 px-6 rounded-lg hover:shadow-lg transition"
            >
              Back to Clients
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-pink-50">
      <PsychologistNavbar />

      <main className="flex-1 flex flex-col px-4 md:px-6 py-8 md:py-12 max-w-4xl mx-auto w-full">
        {/* Chat Header */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{client.name}</h1>
              <p className="text-gray-600 text-sm md:text-base mt-1">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  client.status === "active"
                    ? "bg-green-100 text-green-800"
                    : client.status === "paused"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-blue-100 text-blue-800"
                }`}>
                  {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                </span>
              </p>
              <div className="flex gap-4 mt-3 text-sm text-gray-600">
                <span>📊 {client.issueType}</span>
                <span>📈 {client.progress}% progress</span>
                <span>📝 {client.totalSessions} sessions</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Link
                href="/psychologist/clients"
                className="text-[#e17b9e] hover:text-[#d85a8a] font-semibold text-sm transition"
              >
                ← Back to Clients
              </Link>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-2xl shadow-lg flex flex-col h-[calc(100vh-400px)] md:h-[calc(100vh-380px)]">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "psychologist" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl ${
                    msg.sender === "psychologist"
                      ? "bg-gradient-to-r from-[#e17b9e] to-[#d85a8a] text-white rounded-br-none"
                      : "bg-[#f0f0f0] text-gray-900 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm md:text-base break-words">{msg.message}</p>
                  <p className={`text-xs mt-1 ${msg.sender === "psychologist" ? "text-pink-100" : "text-gray-600"}`}>
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
          <div className="border-t border-gray-200 p-6 md:p-8 bg-white rounded-b-2xl">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your response here..."
                disabled={isSending}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#e17b9e] disabled:opacity-50"
              />
              <button
                onClick={handleSendMessage}
                disabled={isSending || inputMessage.trim() === ""}
                className="bg-gradient-to-r from-[#e17b9e] to-[#d85a8a] hover:shadow-lg text-white font-bold py-3 px-6 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
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
