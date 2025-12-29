"use client"

import { Mail, Lock, User } from "lucide-react" // Tambah User icon untuk lingkaran profil
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      alert("Login berhasil 🎉")
      router.push("/dashboard") // Arahkan ke dashboard setelah login
    } catch (error) {
      alert("Email atau password salah!")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#e5e7eb]">
      {/* Background Gelombang sesuai Figma */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path
            d="M 1000 0 L 600 0 Q 450 150, 480 350 Q 510 550, 400 750 Q 300 900, 200 1000 L 1000 1000 Z"
            fill="#0f172a" 
          />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Kontainer Putih Tengah */}
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-200 relative">
          
          {/* Logo MindSpace di Pojok Kiri Atas (Opsional sesuai Figma) */}
          <div className="absolute -top-12 left-0 text-[#1e293b] font-bold text-2xl flex items-center gap-1">
            <span className="text-red-500">●</span> Mind<span className="text-red-400">Space</span>
          </div>

          {/* Ikon Profil Lingkaran sesuai Figma */}
          <div className="flex justify-center -mt-16 mb-4">
            <div className="bg-[#fecaca] p-4 rounded-full border-4 border-white shadow-lg">
              <User size={48} className="text-[#1e293b]" />
            </div>
          </div>

          <h2 className="text-4xl font-black text-center mb-10 tracking-tighter text-[#1e293b]">
            LOGIN
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <Input
                type="email"
                placeholder="E-mail/Phone Number"
                className="pr-10 border-2 border-black rounded-none h-12"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            </div>

            <div className="relative">
              <Input
                type="password"
                placeholder="Password"
                className="pr-10 border-2 border-black rounded-none h-12"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            </div>

            <div className="text-[10px] text-gray-600 italic">
              Don't have an account?{" "}
              <Link href="/sign_up" className="underline font-bold text-black italic">
                Sign Up
              </Link>
            </div>

            <div className="flex justify-center">
              <Button 
                type="submit" 
                className="w-32 bg-white text-black border-2 border-black hover:bg-gray-100 font-bold rounded-full shadow-md"
              >
                LOGIN
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}