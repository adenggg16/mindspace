"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function PaymentMethodPage() {
  const [psychologistId, setPsychologistId] = useState<string | null>(null)
  const [date, setDate] = useState<string | null>(null)
  const [time, setTime] = useState<string | null>(null)
  const [fee, setFee] = useState<string | null>(null)
  const [psychologist, setPsychologist] = useState<any>(null)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)

  // Psychologist data
  const psychologists = [
    {
      id: 1,
      name: "Dr. Miftahul Jannah, M.Psi., Psikolog",
      university: "Universitas Paramadina - Cipayung",
      consultationFee: "Rp 150,000 per session"
    },
    {
      id: 2,
      name: "Dr. Nadia Wulandari, M.Psi., Psikolog",
      university: "Universitas Indonesia - Jakarta",
      consultationFee: "Rp 180,000 per session"
    },
    {
      id: 3,
      name: "Dr. Dian, M.Psi., Psikolog",
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

  const paymentDetails = {
    qris: { type: "qr", label: "Silahkan scan untuk melanjutkan pembayaran" },
    gopay: { type: "phone", number: "+62 812-3456-7890", label: "Nomor GoPay" },
    mandiri: { type: "account", number: "1234567890", label: "Nomor Rekening Mandiri" },
    dana: { type: "account", number: "0987654321", label: "Nomor Rekening DANA" },
    bca: { type: "account", number: "1122334455", label: "Nomor Rekening BCA" },
    bni: { type: "account", number: "5566778899", label: "Nomor Rekening BNI" }
  }

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get query parameters from URL
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
      {/* Header Navigation */}
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
            <Link href="/dashboard" className="hover:text-[#e17b9e] transition text-sm">
              Home
            </Link>
            <Link href="/articles" className="hover:text-[#e17b9e] transition text-sm">
              Articles
            </Link>
            <Link href="/counseling" className="hover:text-[#e17b9e] transition text-sm">
              Counseling
            </Link>
            <Link href="/profile" className="hover:text-[#e17b9e] transition text-sm">
              Profile
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12 w-full">
        {/* Back Button */}
        <div className="mb-6">
          <Link href={`/payment?psychologist=${psychologistId}&date=${date}&time=${time}&fee=${fee}`}>
            <Button variant="outline" className="border-[#1a2e4a] text-[#1a2e4a] hover:bg-[#1a2e4a] hover:text-white">
              ← Back to Payment
            </Button>
          </Link>
        </div>

        {/* Payment Method Selection */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Select Payment Method</h1>

          {/* Booking Summary Card */}
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 mb-8 text-center">
            <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-md">
              <span className="text-2xl">👨‍⚕️</span>
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">{psychologist.name}</h3>
            <div className="flex items-center justify-center gap-2 text-gray-700 mb-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-2.16-2.66c-.44-.53-1.25-.58-1.78-.14-.53.44-.58 1.25-.14 1.78l3 3.67c.25.31.61.5 1 .5s.75-.19 1-.5l4-5.07c.44-.53.39-1.34-.14-1.78-.53-.44-1.34-.39-1.78.14z" />
              </svg>
              <span className="text-sm">
                {new Date(date).toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-700 mb-4">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
              </svg>
              <span className="text-sm">
                {time === "09:00" && "9:00 AM (Morning)"}
                {time === "14:00" && "2:00 PM (Afternoon)"}
                {time === "19:00" && "7:00 PM (Evening)"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-semibold">Total Pembayaran:</span>
              <span className="text-2xl font-bold text-[#1a2e4a]">{fee}</span>
            </div>
          </div>

          {/* Payment Methods Grid */}
          <h2 className="text-xl font-bold text-gray-900 mb-6">Pilih Metode Pembayaran</h2>
          
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

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={`/payment?psychologist=${psychologistId}&date=${date}&time=${time}&fee=${fee}`} className="flex-1">
              <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                Back
              </Button>
            </Link>
            <Button
              onClick={handleSelectPaymentMethod}
              className="flex-1 bg-[#1a2e4a] hover:bg-[#0f1f31] text-white font-semibold py-3 rounded-lg"
            >
              Confirm Payment
            </Button>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && !paymentComplete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl">
            {selectedPaymentMethod === "qris" ? (
              // QRIS Payment Modal
              <div className="text-center">
                <div className="bg-gray-100 rounded-xl p-6 mb-6">
                  <svg className="w-32 h-32 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div className="bg-blue-100 rounded-2xl p-4 mb-6 border-2 border-blue-300">
                  <div className="bg-white rounded-lg p-4 inline-block">
                    <svg className="w-48 h-48" viewBox="0 0 200 200" fill="black">
                      {/* QR Code placeholder */}
                      <rect x="20" y="20" width="160" height="160" fill="white" stroke="black" strokeWidth="2"/>
                      <rect x="30" y="30" width="40" height="40" fill="black"/>
                      <rect x="130" y="30" width="40" height="40" fill="black"/>
                      <rect x="30" y="130" width="40" height="40" fill="black"/>
                      {/* Pattern */}
                      <rect x="80" y="80" width="20" height="20" fill="black"/>
                      <rect x="60" y="100" width="10" height="10" fill="black"/>
                      <rect x="110" y="100" width="10" height="10" fill="black"/>
                      <rect x="100" y="60" width="10" height="10" fill="black"/>
                    </svg>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Metode Pembayaran QRIS</h2>
                <p className="text-gray-600 mb-6">Silahkan scan untuk melanjutkan pembayaran</p>
              </div>
            ) : (
              // Bank/GoPay Payment Modal
              <div className="text-center">
                <div className="bg-blue-100 rounded-2xl p-8 mb-6">
                  <div className="text-5xl mb-4">
                    {selectedPaymentMethod === "gopay" && "📱"}
                    {selectedPaymentMethod === "mandiri" && "🏦"}
                    {selectedPaymentMethod === "dana" && "💳"}
                    {selectedPaymentMethod === "bca" && "🏦"}
                    {selectedPaymentMethod === "bni" && "🏦"}
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  {selectedPaymentMethod === "gopay" && "GoPay"}
                  {selectedPaymentMethod === "mandiri" && "Mandiri"}
                  {selectedPaymentMethod === "dana" && "DANA"}
                  {selectedPaymentMethod === "bca" && "BCA"}
                  {selectedPaymentMethod === "bni" && "BNI"}
                </h2>
                
                <div className="bg-gray-100 rounded-xl p-6 mb-6">
                  <p className="text-gray-600 text-sm mb-3">
                    {selectedPaymentMethod === "gopay" && "Nomor GoPay"}
                    {selectedPaymentMethod === "mandiri" && "Nomor Rekening"}
                    {selectedPaymentMethod === "dana" && "Nomor Rekening"}
                    {selectedPaymentMethod === "bca" && "Nomor Rekening"}
                    {selectedPaymentMethod === "bni" && "Nomor Rekening"}
                  </p>
                  <p className="text-2xl font-bold text-[#1a2e4a] mb-3">
                    {selectedPaymentMethod === "gopay" && "+62 812-3456-7890"}
                    {selectedPaymentMethod === "mandiri" && "1234567890"}
                    {selectedPaymentMethod === "dana" && "0987654321"}
                    {selectedPaymentMethod === "bca" && "1122334455"}
                    {selectedPaymentMethod === "bni" && "5566778899"}
                  </p>
                  <button 
                    onClick={() => {
                      const text = selectedPaymentMethod === "gopay" ? "+62 812-3456-7890" : 
                                  selectedPaymentMethod === "mandiri" ? "1234567890" :
                                  selectedPaymentMethod === "dana" ? "0987654321" :
                                  selectedPaymentMethod === "bca" ? "1122334455" : "5566778899"
                      navigator.clipboard.writeText(text)
                      alert('Nomor disalin!')
                    }}
                    className="text-sm text-[#1a2e4a] hover:text-[#0f1f31] font-semibold"
                  >
                    Salin Nomor
                  </button>
                </div>

                <p className="text-gray-600 text-sm mb-6">Total Pembayaran: <span className="font-bold text-[#1a2e4a] text-lg">{fee}</span></p>
              </div>
            )}

            {/* Confirm Button */}
            <button
              onClick={() => {
                setShowPaymentModal(false)
                setPaymentComplete(true)
              }}
              className="w-full bg-[#1a2e4a] hover:bg-[#0f1f31] text-white font-bold py-3 rounded-lg transition"
            >
              Lanjutkan
            </button>

            {/* Cancel Button */}
            <button
              onClick={() => {
                setShowPaymentModal(false)
                setSelectedPaymentMethod(null)
              }}
              className="w-full mt-3 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-2 rounded-lg transition"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {/* Payment Complete Modal */}
      {paymentComplete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Pembayaran Selesai!</h2>
            <p className="text-gray-600 mb-8">Terima kasih telah melakukan pembayaran. Booking Anda telah dikonfirmasi.</p>
            
            <div className="bg-blue-50 rounded-xl p-6 mb-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-4">Detail Booking</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Psikolog:</span>
                  <span className="font-semibold text-gray-900">{psychologist.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tanggal:</span>
                  <span className="font-semibold text-gray-900">
                    {new Date(date).toLocaleDateString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Waktu:</span>
                  <span className="font-semibold text-gray-900">
                    {time === "09:00" && "9:00 AM"}
                    {time === "14:00" && "2:00 PM"}
                    {time === "19:00" && "7:00 PM"}
                  </span>
                </div>
                <div className="flex justify-between text-sm border-t pt-3">
                  <span className="text-gray-600">Total:</span>
                  <span className="font-bold text-[#1a2e4a] text-lg">{fee}</span>
                </div>
              </div>
            </div>

            <Link href="/dashboard" className="block">
              <Button className="w-full bg-[#1a2e4a] hover:bg-[#0f1f31] text-white font-bold py-3 rounded-lg">
                Kembali ke Dashboard
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
