"use client"
import { db } from "@/lib/firebase"
import { doc, setDoc } from "firebase/firestore"
import { articlesData } from "@/lib/articlesData"
import { useState } from "react"

export default function MigratePage() {
  const [status, setStatus] = useState("Siap Kirim Data")

  const jalankanMigrasi = async () => {
    setStatus("Sedang memproses...")
    try {
      for (const item of articlesData) {
        // Ini akan membuat koleksi 'articles' otomatis di Firebase
        await setDoc(doc(db, "articles", item.id), item)
      }
      setStatus("BERHASIL! Silakan cek Firebase Console kamu.")
    } catch (e) {
      console.error(e)
      setStatus("Gagal: " + (e as Error).message)
    }
  }

  return (
    <div className="p-20 text-center bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Database Generator</h1>
      <button 
        onClick={jalankanMigrasi} 
        className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all"
      >
        {status}
      </button>
    </div>
  )
}