"use client"

import { Mail, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase" 
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // 1. Login ke Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // 2. Cek apakah user ini ada di koleksi 'psychologists'
      const psychDoc = await getDoc(doc(db, "psychologists", user.uid))
      
      if (psychDoc.exists()) {
        alert("Login Berhasil sebagai Psikolog! 🎉")
        router.push("/psychologist-dashboard")
        return // Selesai
      }

      // 3. Jika tidak ada di psikolog, cek di koleksi 'users' (Student)
      const studentDoc = await getDoc(doc(db, "users", user.uid))
      
      if (studentDoc.exists()) {
        alert("Login Berhasil sebagai Student! 🎉")
        router.push("/dashboard")
      } else {
        alert("Data profil tidak ditemukan.")
      }

    } catch (error: any) {
      alert("Email atau password salah!")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#E5E7EB] p-4">
      {/* Background Navy */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path d="M 1000 0 L 600 0 Q 450 150, 480 350 Q 510 550, 400 750 Q 300 900, 200 1000 L 1000 1000 Z" fill="#0F172A" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-[420px] px-4 md:px-6">
        <div className="bg-white p-6 md:p-10 rounded-2xl md:rounded-[25px] shadow-2xl relative border border-gray-100">
          
          {/* Logo MindSpace */}
          <div className="flex justify-center mb-8 mt-2">
            <Image src="/images/logo.png" alt="MindSpace Logo" width={150} height={50} className="object-contain" />
          </div>

          <h2 className="text-3xl md:text-[42px] font-[900] text-center mb-8 md:mb-10 tracking-tighter text-[#1e293b] leading-none">LOGIN</h2>

          <form onSubmit={handleLogin} className="space-y-4 md:space-y-5">
            <div className="relative">
              <Input type="email" placeholder="E-mail" className="pr-10 border-2 border-black rounded-none h-12 md:h-[50px] font-medium text-sm md:text-base focus-visible:ring-0 placeholder:text-gray-400" onChange={(e) => setEmail(e.target.value)} required />
              <Mail className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-black" size={18} />
            </div>

            <div className="relative">
              <Input type="password" placeholder="Password" className="pr-10 border-2 border-black rounded-none h-12 md:h-[50px] font-medium text-sm md:text-base focus-visible:ring-0 placeholder:text-gray-400" onChange={(e) => setPassword(e.target.value)} required />
              <Lock className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-black" size={18} />
            </div>

            <div className="text-[10px] md:text-xs text-gray-500 italic">
              Don't have an account? <Link href="/sign_up" className="font-bold text-black underline not-italic">Sign Up</Link>
            </div>

            <div className="flex justify-center pt-4">
              <Button type="submit" disabled={isLoading} className="px-8 md:px-12 py-2 bg-white text-black border-2 border-black hover:bg-gray-100 font-[900] rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-1 active:shadow-none text-sm md:text-base">
                {isLoading ? "LOADING..." : "LOGIN"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}