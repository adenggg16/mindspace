"use client"

import { useState } from "react"
import { Mail, Lock, User, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { auth, db } from "@/lib/firebase" // Import auth dan db
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore" // Untuk simpan data profil
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      alert("Password tidak cocok!")
      return
    }

    setIsLoading(true)
    try {
      // 1. Buat User di Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // 2. Simpan Data Profil ke Firestore (Database)
      // Kita simpan Nama default dan Tag spesialisasi sesuai desain Figma kamu
      await setDoc(doc(db, "users", user.uid), {
        fullName: "User Baru MindSpace", // Nanti bisa diedit di profil
        email: email,
        phoneNumber: phone,
        role: "Psikolog", // Sesuai desain Figma
        specialization: ["Anxiety", "Depression"], 
        createdAt: new Date().toISOString()
      })

      alert("Akun berhasil dibuat! Mengalihkan ke Dashboard...")
      router.push("/dashboard")
    } catch (error: any) {
      alert("Gagal mendaftar: " + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#e5e7eb]">
      {/* Background Gelombang Navy */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path
            d="M 1000 0 L 600 0 Q 450 150, 480 350 Q 510 550, 400 750 Q 300 900, 200 1000 L 1000 1000 Z"
            fill="#0f172a" 
          />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-200 relative">
          
          {/* Logo MindSpace */}
          <div className="absolute -top-12 left-0 text-[#1e293b] font-bold text-2xl flex items-center gap-1">
            <span className="text-red-500">●</span> Mind<span className="text-red-400">Space</span>
          </div>

          {/* Avatar Ikon Profil Pink */}
          <div className="flex justify-center -mt-16 mb-4">
            <div className="bg-[#fbcfe8] p-4 rounded-full border-4 border-white shadow-lg">
              <User size={48} className="text-[#1e293b]" />
            </div>
          </div>

          <h2 className="text-4xl font-black text-center mb-8 tracking-tighter text-[#1e293b]">
            SIGN UP
          </h2>

          <form onSubmit={handleSignUp} className="space-y-4">
            {/* Input E-mail */}
            <div className="relative">
              <Input
                type="email"
                placeholder="E-mail"
                className="pr-10 border-2 border-black rounded-none h-11 focus-visible:ring-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            </div>

            {/* Input Phone Number */}
            <div className="relative">
              <Input
                type="tel"
                placeholder="Phone Number"
                className="pr-10 border-2 border-black rounded-none h-11 focus-visible:ring-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]"
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <Phone className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            </div>

            {/* Input Password */}
            <div className="relative">
              <Input
                type="password"
                placeholder="Password"
                className="pr-10 border-2 border-black rounded-none h-11 focus-visible:ring-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            </div>

            {/* Input Confirm Password */}
            <div className="relative">
              <Input
                type="password"
                placeholder="Confirm Password"
                className="pr-10 border-2 border-black rounded-none h-11 focus-visible:ring-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            </div>

            <div className="text-[10px] text-right text-gray-600 italic">
              Already have an account?{" "}
              <Link href="/sign_up" className="font-bold text-black underline">
                Login
              </Link>
            </div>

            <div className="flex justify-center pt-2">
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-32 bg-white text-black border-2 border-black hover:bg-gray-100 font-bold rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform active:translate-y-1 active:shadow-none"
              >
                {isLoading ? "LOADING..." : "SIGN UP"}
              </Button>
            </div>
          </form>

          <p className="text-[8px] text-center mt-6 text-gray-500">
            [ I agree to the Terms & Conditions and Privacy Policy ]
          </p>
        </div>
      </div>
    </div>
  )
}