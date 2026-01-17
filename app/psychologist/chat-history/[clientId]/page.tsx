"use client"

import { useState, useEffect, useRef } from "react"
import { useParams } from "next/navigation"
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

export default function ChatHistoryPage() {
  const params = useParams()
  const clientId = params.clientId as string
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [client, setClient] = useState<Client | null>(null)

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
    }
  }, [clientId])

  // Auto-scroll to bottom when messages load
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

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
              <p className="text-gray-600 text-sm md:text-base mt-1">Chat History (Read-Only)</p>
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
            {messages.length > 0 ? (
              <>
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
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-center">
                <p className="text-gray-500">No messages yet</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Read-Only Notice */}
          <div className="border-t border-gray-200 p-6 md:p-8 bg-blue-50 rounded-b-2xl">
            <div className="flex items-center gap-3 text-sm text-blue-800">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span>This is a read-only view of the chat history. You cannot send new messages here.</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
