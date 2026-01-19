"use client"

import PsychologistNavbar from "@/components/psychologist/navbar"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { db } from "@/lib/firebase"
import { 
  collection, onSnapshot, query, orderBy, Timestamp, doc, updateDoc 
} from "firebase/firestore"
import { ChevronLeft, ChevronRight, Clock, User } from "lucide-react"

// Interface agar tidak ada error 'Cannot find name'
interface Appointment {
  id: string;
  clientName: string;
  date: string;
  time: string;
  endTime: string;
  duration: number;
  status: "scheduled" | "completed" | "pending";
  notes: string;
  clientImage: string;
}

export default function PsychologistSchedule() {
  const router = useRouter()
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 9))
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 1. Ambil Data Real-time dari Firebase
  useEffect(() => {
    const q = query(collection(db, "schedules"), orderBy("time", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => {
        const payload = doc.data();
        let dateStr = "";
        
        // Konversi format tanggal Firebase agar sesuai dengan filter kalender
        if (payload.date instanceof Timestamp) {
          dateStr = payload.date.toDate().toLocaleDateString('sv-SE');
        } else {
          dateStr = new Date(payload.date).toLocaleDateString('sv-SE');
        }

        return {
          id: doc.id,
          clientName: payload.studentName || "Client",
          date: dateStr,
          time: payload.time || "00:00",
          endTime: payload.endTime || "00:00",
          duration: payload.duration || 60,
          status: payload.status || "scheduled",
          notes: payload.notes || "No notes",
          clientImage: (payload.studentName || "U").substring(0, 2).toUpperCase(),
        } as Appointment;
      });
      setAppointments(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. Logika Kalender
  const currentDateString = currentDate.toLocaleDateString('sv-SE');
  const todayAppointments = appointments.filter(apt => apt.date === currentDateString);
  const allScheduledDates = Array.from(new Set(appointments.map(apt => apt.date)));

  // 3. Statistik Dinamis
  const completedSessions = appointments.filter(a => a.status === 'completed').length;
  const completionRate = appointments.length > 0 ? Math.round((completedSessions / appointments.length) * 100) : 0;

  if (loading) return <div className="p-20 text-center">Loading Schedule...</div>

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-pink-50">
      <PsychologistNavbar />
      <main className="flex-1 px-4 md:px-6 py-8 md:py-12 max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">My Schedule</h1>
          <p className="text-gray-600 mt-2">Manage your consultation appointments</p>
        </div>

        {/* Section Statistik Sesuai UI */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-gray-600 text-sm font-medium mb-2">Today's Sessions</p>
            <p className="text-4xl font-bold text-[#e17b9e]">{todayAppointments.length}</p>
            <p className="text-xs text-gray-500 mt-2">
              {todayAppointments.reduce((sum, apt) => sum + apt.duration, 0)} minutes total
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-gray-600 text-sm font-medium mb-2">This Week</p>
            <p className="text-4xl font-bold text-purple-600">
              {appointments.filter(a => a.status === 'scheduled').length}
            </p>
            <p className="text-xs text-gray-500 mt-2">appointments scheduled</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-gray-600 text-sm font-medium mb-2">Completion Rate</p>
            <p className="text-4xl font-bold text-green-600">{completionRate}%</p>
            <p className="text-xs text-gray-500 mt-2">{completedSessions} of {appointments.length} completed</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Kalender */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6 h-fit">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">
                {currentDate.toLocaleString("en-US", { month: "long", year: "numeric" })}
              </h3>
              <div className="flex gap-2">
                <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))} className="p-2 hover:bg-gray-100 rounded-lg"><ChevronLeft size={20} /></button>
                <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))} className="p-2 hover:bg-gray-100 rounded-lg"><ChevronRight size={20} /></button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
                const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                const dateStr = dateObj.toLocaleDateString('sv-SE');
                const isSelected = dateStr === currentDateString;
                const hasApt = allScheduledDates.includes(dateStr);
                return (
                  <button 
                    key={day} 
                    onClick={() => setCurrentDate(dateObj)}
                    className={`aspect-square rounded-lg font-bold text-sm transition relative ${
                      isSelected ? "bg-[#e17b9e] text-white" : hasApt ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
                    }`}
                  >
                    {day}
                    {hasApt && <div className={`absolute bottom-1 w-1 h-1 rounded-full ${isSelected ? "bg-white" : "bg-blue-600"}`}></div>}
                  </button>
                )
              })}
            </div>
          </div>

          {/* List Jadwal Sesuai UI */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">
              {currentDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </h3>
            {todayAppointments.length > 0 ? (
              <div className="space-y-4">
                {todayAppointments.map(apt => (
                  <div key={apt.id} className="border-l-4 border-[#e17b9e] bg-gray-50 rounded-r-xl p-4 flex justify-between items-center">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold">{apt.clientImage}</div>
                      <div>
                        <h4 className="font-bold">{apt.clientName}</h4>
                        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1"><Clock size={14}/> {apt.time} - {apt.endTime}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold shadow-md">Join Session</button>
                      <button 
                        onClick={() => { setSelectedAppointment(apt); setIsModalOpen(true); }}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-xs font-bold"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <Clock size={48} className="mx-auto mb-4 opacity-20" />
                <p>No appointments scheduled</p>
              </div>
            )}
          </div>
        </div>

        {/* Modal View Details Sesuai UI Anda */}
        {isModalOpen && selectedAppointment && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Appointment Info</h2>
              <div className="space-y-4 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-400 font-bold uppercase text-[10px] mb-1">Client</p>
                  <p className="text-gray-900 font-bold text-lg">{selectedAppointment.clientName}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-400 font-bold uppercase text-[10px] mb-1">Notes</p>
                  <p className="text-gray-700">{selectedAppointment.notes}</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-full mt-8 bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition">Close</button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}