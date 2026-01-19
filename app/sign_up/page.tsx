"use client"

import { useState } from "react"
import { Mail, Lock, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { auth, db } from "@/lib/firebase" 
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore" 
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [role, setRole] = useState("Student")
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validasi tambahan sebelum kirim ke Firebase
    if (password.length < 6) {
      alert("Password minimal 6 karakter!");
      return;
    }

    if (password !== confirmPassword) { 
      alert("Password tidak cocok!"); 
      return; 
    }
    
    setIsLoading(true)
    try {
      // 1. Buat User di Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // 2. Tentukan koleksi berdasarkan role
      const targetCollection = role === "Psikolog" ? "psychologists" : "users"

      // 3. Simpan data tambahan ke Firestore
      // Menggunakan UID dari Auth sebagai ID dokumen agar sinkron
      await setDoc(doc(db, targetCollection, user.uid), {
        uid: user.uid,
        fullName: "User Baru MindSpace",
        email: email,
        phoneNumber: phone,
        role: role, 
        specialization: role === "Psikolog" ? ["Anxiety", "Depression"] : [],
        createdAt: new Date().toISOString()
      })

      alert(`Pendaftaran ${role} Berhasil! 🎉`)
      router.push("/login")
    } catch (error: any) { 
      console.error(error)
      // Memberikan pesan error yang lebih jelas kepada user
      if (error.code === "auth/email-already-in-use") {
        alert("E-mail sudah terdaftar!");
      } else {
        alert("Gagal mendaftar: " + error.message) 
      }
    } finally { 
      setIsLoading(false) 
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#e5e7eb] p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path d="M 1000 0 L 600 0 Q 450 150, 480 350 Q 510 550, 400 750 Q 300 900, 200 1000 L 1000 1000 Z" fill="#0f172a" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-sm px-4">
        <div className="bg-white/90 backdrop-blur-sm p-5 md:p-6 rounded-xl shadow-2xl border border-gray-100 relative">
          
          <div className="flex justify-center mb-2 mt-1">
            <Image 
              src="/images/logo.png" 
              alt="MindSpace Logo" 
              width={110} 
              height={40} 
              className="object-contain"
            />
          </div>

          <div className="flex justify-center gap-4 py-1 mb-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="radio" name="role" value="Student" checked={role === "Student"} onChange={(e) => setRole(e.target.value)} className="w-3.5 h-3.5 accent-black" />
              <span className={`text-[10px] font-bold ${role === "Student" ? "text-black" : "text-gray-400"}`}>STUDENT</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="radio" name="role" value="Psikolog" checked={role === "Psikolog"} onChange={(e) => setRole(e.target.value)} className="w-3.5 h-3.5 accent-black" />
              <span className={`text-[10px] font-bold ${role === "Psikolog" ? "text-black" : "text-gray-400"}`}>PSIKOLOG</span>
            </label>
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-center mb-4 tracking-tighter text-[#1e293b]">SIGN UP</h2>

          <form onSubmit={handleSignUp} className="space-y-2.5">
            <div className="relative">
              <Input type="email" placeholder="E-mail" className="pr-9 border-[1.5px] border-black rounded-none h-9 text-xs focus-visible:ring-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]" onChange={(e) => setEmail(e.target.value)} required />
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
            </div>
            <div className="relative">
              <Input type="tel" placeholder="Phone Number" className="pr-9 border-[1.5px] border-black rounded-none h-9 text-xs focus-visible:ring-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]" onChange={(e) => setPhone(e.target.value)} required />
              <Phone className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
            </div>
            <div className="relative">
              <Input type="password" placeholder="Password" className="pr-9 border-[1.5px] border-black rounded-none h-9 text-xs focus-visible:ring-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]" onChange={(e) => setPassword(e.target.value)} required />
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
            </div>
            <div className="relative">
              <Input type="password" placeholder="Confirm Password" className="pr-9 border-[1.5px] border-black rounded-none h-9 text-xs focus-visible:ring-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]" onChange={(e) => setConfirmPassword(e.target.value)} required />
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
            </div>
            
            <div className="text-[9px] text-right text-gray-600 italic">
              Already have an account? <Link href="/login" className="font-bold text-black underline">Login</Link>
            </div>

            <div className="flex justify-center pt-1">
              <Button 
                type="submit" 
                disabled={isLoading} 
                className="w-24 bg-white text-[11px] text-black border-[1.5px] border-black hover:bg-gray-100 font-bold rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform active:translate-y-0.5 active:shadow-none py-1 h-8"
              >
                {isLoading ? "PROSES..." : "SIGN UP"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}