"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
// --- TAMBAHAN LOGIKA FIREBASE ---
import { db, auth } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
// --------------------------------

export default function PaymentMethodPage() {
  const [psychologistId, setPsychologistId] = useState<string | null>(null)
  const [date, setDate] = useState<string | null>(null)
  const [time, setTime] = useState<string | null>(null)
  const [fee, setFee] = useState<string | null>(null)
  const [psychologist, setPsychologist] = useState<any>(null)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)

  const psychologists = [
    {
      id: 1,
      name: "dr. Miftahul Jannah, M.Psi., Psikolog",
      university: "Universitas Paramadina - Cipayung",
      consultationFee: "Rp 150,000 per session"
    },
    {
      id: 2,
      name: "dr. Nadia Wulandari, M.Psi., Psikolog",
      university: "Universitas Indonesia - Jakarta",
      consultationFee: "Rp 180,000 per session"
    },
    {
      id: 3,
      name: "dr. Dian, M.Psi., Psikolog",
      university: "Universitas Trisakti - Grogol",
      consultationFee: "Rp 130,000 per session"
    }
  ]

  const paymentMethods = [
    { id: "qris", name: "QRIS" },
    { id: "gopay", name: "GoPay" },
    { id: "mandiri", name: "Mandiri" },
    { id: "dana", name: "DANA" },
    { id: "bca", name: "BCA" },
    { id: "bni", name: "BNI" }
  ]

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const psychId = urlParams.get('psychologist')
    const dateParam = urlParams.get('date')
    const timeParam = urlParams.get('time')
    const feeParam = urlParams.get('fee')

    setPsychologistId(psychId)
    setDate(dateParam)
    setTime(timeParam)
    setFee(feeParam)

    if (psychId) {
      const found = psychologists.find(p => p.id === parseInt(psychId))
      setPsychologist(found)
    }
    setIsLoading(false)
  }, [])

  // --- FUNGSI BARU UNTUK SIMPAN KE FIREBASE ---
  const handleConfirmAndSave = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please login first!");
      return;
    }

    try {
      // 1. Simpan ke Firestore agar Admin bisa melihat
      await addDoc(collection(db, "payments"), {
        userId: user.uid,
        studentName: "Salsabila Adelia Putrie", // Sebaiknya ambil dari data profil
        amount: fee,
        description: `Consultation with ${psychologist.name}`,
        date: new Date(date!).toLocaleDateString('en-US'),
        time: time,
        status: "Confirmed",
        createdAt: serverTimestamp(),
      });

      // 2. Simpan ke LocalStorage untuk history (Logika lama tetap dipertahankan)
      const bookingId = Date.now().toString()
      const consultationBooking = {
        id: bookingId,
        psychologistName: psychologist.name,
        psychologistUniversity: psychologist.university,
        bookingDate: new Date().toISOString(),
        consultationDate: date,
        consultationTime: time,
        consultationFee: fee,
        status: "upcoming",
        bookedAt: new Date().toISOString(),
      }

      const existingBookings = localStorage.getItem("consultationBookings")
      let bookingsArray = existingBookings ? JSON.parse(existingBookings) : []
      bookingsArray.unshift(consultationBooking)
      localStorage.setItem("consultationBookings", JSON.stringify(bookingsArray))

      // 3. Pindah ke layar sukses
      setShowPaymentModal(false)
      setPaymentComplete(true)
    } catch (error) {
      console.error("Firebase Error:", error);
      alert("Gagal memproses pembayaran ke database.");
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a2e4a]"></div>
          <p className="mt-4 text-gray-600">Loading payment method...</p>
        </div>
      </div>
    )
  }

  if (!psychologist || !date || !time || !fee) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Payment Session</h1>
          <Link href="/counseling">
            <Button className="bg-[#1a2e4a] hover:bg-[#0f1f31] text-white px-6 py-2 rounded-full">
              Back to Counseling
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleSelectPaymentMethod = () => {
    if (selectedPaymentMethod) {
      setShowPaymentModal(true)
    } else {
      alert('Please select a payment method')
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-blue-100">
      <nav className="bg-[#1a2e4a] text-white py-4 md:py-6 px-4 md:px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <img src="/images/logo.png" alt="MindSpace Logo" className="w-6 h-6 md:w-10 md:h-10" />
            <div>
              <h1 className="text-lg md:text-2xl font-bold">
                Mind<span className="text-[#e17b9e]">Space</span>
              </h1>
              <p className="text-[10px] md:text-sm text-gray-400 leading-tight">A quiet space for your thoughts.</p>
            </div>
          </div>

          <div className="hidden md:flex gap-8">
            <Link href="/dashboard" className="hover:text-[#e17b9e] transition text-sm">Home</Link>
            <Link href="/articles" className="hover:text-[#e17b9e] transition text-sm">Articles</Link>
            <Link href="/counseling" className="hover:text-[#e17b9e] transition text-sm">Counseling</Link>
            <Link href="/profile" className="hover:text-[#e17b9e] transition text-sm">Profile</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12 w-full">
        <div className="mb-6">
          <Link href={`/payment?psychologist=${psychologistId}&date=${date}&time=${time}&fee=${fee}`}>
            <Button variant="outline" className="border-[#1a2e4a] text-[#1a2e4a] hover:bg-[#1a2e4a] hover:text-white">
              ← Back to Payment
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Select Payment Method</h1>

          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 mb-8 text-center">
            <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-md">
              <span className="text-2xl">👨‍⚕️</span>
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">{psychologist.name}</h3>
            <div className="flex items-center justify-center gap-2 text-gray-700 mb-2">
              <span className="text-sm">{new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-700 mb-4">
              <span className="text-sm">{time}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-semibold">Total Amount:</span>
              <span className="text-2xl font-bold text-[#1a2e4a]">{fee}</span>
            </div>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-6">Select Payment Method</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {paymentMethods.map((method) => (
              <label key={method.id} className="flex items-center p-6 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-[#1a2e4a] hover:bg-blue-50 transition">
                <input
                  type="radio"
                  name="payment-method"
                  value={method.id}
                  checked={selectedPaymentMethod === method.id}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  className="w-6 h-6 text-[#1a2e4a] cursor-pointer"
                />
                <span className="ml-4 flex-1 font-semibold text-gray-900 text-lg">{method.name}</span>
              </label>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={handleSelectPaymentMethod} className="flex-1 bg-[#1a2e4a] hover:bg-[#0f1f31] text-white font-semibold py-3 rounded-lg">
              Confirm Payment
            </Button>
          </div>
        </div>
      </div>

      {showPaymentModal && !paymentComplete && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl">
            <div className="text-center">
              <div className="bg-blue-100 rounded-2xl p-8 mb-6 text-5xl">💳</div>
              <h2 className="text-xl font-bold text-gray-900 mb-6 uppercase">{selectedPaymentMethod}</h2>
              <div className="bg-gray-100 rounded-xl p-6 mb-6">
                <p className="text-gray-600 text-sm mb-3">Account Number</p>
                <p className="text-2xl font-bold text-[#1a2e4a] mb-3">0987654321</p>
              </div>
              <p className="text-gray-600 text-sm mb-6">Total Amount: <span className="font-bold text-[#1a2e4a] text-lg">{fee}</span></p>

              <button onClick={handleConfirmAndSave} className="w-full bg-[#1a2e4a] hover:bg-[#0f1f31] text-white font-bold py-3 rounded-lg transition">
                Continue
              </button>
              <button onClick={() => setShowPaymentModal(false)} className="w-full mt-3 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-2 rounded-lg transition">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {paymentComplete && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center text-green-600 text-3xl">✓</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Complete!</h2>
            <p className="text-gray-600 mb-8">Thank you. Your booking has been confirmed.</p>
            <Link href="/dashboard" className="block">
              <Button className="w-full bg-[#1a2e4a] hover:bg-[#0f1f31] text-white font-bold py-3 rounded-lg">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}