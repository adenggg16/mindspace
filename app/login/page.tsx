"use client"

import { Mail, Lock } from "lucide-react"
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
      router.push("/dashboard")
    } catch (error) {
      alert("Email atau password salah!")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#E5E7EB]">
      {/* Background Gelombang Navy Pekat sesuai Figma */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path
            d="M 1000 0 L 600 0 Q 450 150, 480 350 Q 510 550, 400 750 Q 300 900, 200 1000 L 1000 1000 Z"
            fill="#0F172A" 
          />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-[420px] px-6">
        {/* Kontainer Putih Utama */}
        <div className="bg-white p-10 rounded-[25px] shadow-2xl relative border border-gray-100">
          
          {/* Logo MindSpace - Posisi di DALAM box pojok kiri atas */}
          <div className="absolute top-6 left-8 flex items-center gap-1">
            <span className="text-[#F87171] text-xl leading-none">●</span>
            <span className="text-xl font-bold tracking-tighter text-[#1e293b]">
              Mind<span className="text-[#F87171]">Space</span>
            </span>
          </div>

          {/* Ikon Profil Lingkaran Pink Tengah */}
          <div className="flex justify-center mb-6 mt-8">
            <div className="w-20 h-20 bg-[#FBCFE8] rounded-full border-[4px] border-white shadow-md flex items-center justify-center">
               <div className="w-10 h-10 border-4 border-[#1E293B] opacity-10 rotate-45"></div>
            </div>
          </div>

          {/* Header LOGIN - Font Black & Rapat */}
          <h2 className="text-[42px] font-[900] text-center mb-10 tracking-tighter text-[#1e293b] leading-none">
            LOGIN
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Input E-mail - Border Hitam Tebal & Kotak Tajam */}
            <div className="relative">
              <Input
                type="email"
                placeholder="E-mail/Phone Number"
                className="pr-12 border-[2px] border-black rounded-none h-[50px] font-medium focus-visible:ring-0 placeholder:text-gray-400"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-black" size={20} />
            </div>

            {/* Input Password */}
            <div className="relative">
              <Input
                type="password"
                placeholder="Password"
                className="pr-12 border-[2px] border-black rounded-none h-[50px] font-medium focus-visible:ring-0 placeholder:text-gray-400"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-black" size={20} />
            </div>

            {/* Link Sign Up - Kecil & Italic */}
            <div className="text-[10px] text-gray-500 italic">
              Don't have an account?{" "}
              <Link href="/sign_up" className="font-bold text-black underline not-italic">
                Sign Up
              </Link>
            </div>

            {/* Tombol LOGIN - Bulat dengan Shadow Hitam Kaku */}
            <div className="flex justify-center pt-4">
              <Button 
                type="submit" 
                className="px-12 py-2 bg-white text-black border-[2.5px] border-black hover:bg-gray-100 font-[900] rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-1 active:shadow-none"
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