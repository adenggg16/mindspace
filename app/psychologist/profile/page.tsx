"use client"

import PsychologistNavbar from "@/components/psychologist/navbar"
import { Camera, Mail, Phone, MapPin, Award, Edit, Save, Lock } from "lucide-react"
import { useState, useEffect } from "react"
import { db } from "@/lib/firebase"
import { doc, getDoc, updateDoc } from "firebase/firestore"

export default function PsychologistProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  
  // ID psikolog disesuaikan dengan data Anda
  const psychologistId = "psychologist_mifta_01" 

  const [profileData, setProfileData] = useState({
    name: "dr. Miftahul Jannah, M.Psi.",
    title: "Clinical Psychologist",
    email: "miftahul.jannah@mindspace.com",
    phone: "+62 812-3456-7890",
    location: "Jakarta, Indonesia",
    bio: "Licensed clinical psychologist with 8+ years of experience in anxiety, depression, and stress management therapy.",
    specializations: ["Anxiety Disorders", "Depression", "Stress Management", "Relationship Counseling"],
    credentials: [
      "Ph.D. Clinical Psychology - University of Indonesia",
      "Master's Degree in Psychology - ITB",
      "Licensed Professional Counselor",
      "Certified Cognitive Behavioral Therapy Specialist"
    ],
    availability: "Monday - Friday, 9:00 AM - 19:00 PM",
    sessionFee: "Rp 150.000 per session"
  })

  // Load data asli dari Firebase saat halaman dibuka
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const docRef = doc(db, "psychologists", psychologistId)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const data = docSnap.data()
          setProfileData(prev => ({ ...prev, ...data }))
        }
      } catch (error) {
        console.error("Gagal ambil data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  // Simpan data ke Firebase saat klik Save Changes
  const handleSaveProfile = async () => {
    try {
      const docRef = doc(db, "psychologists", psychologistId)
      await updateDoc(docRef, profileData)
      setIsEditing(false)
      alert("Profile Saved to Firebase!")
    } catch (error) {
      console.error("Gagal simpan:", error)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }))
  }

  const toggleSpecialization = (spec: string) => {
    setProfileData(prev => {
      const isExist = prev.specializations.includes(spec)
      if (isExist) {
        return { ...prev, specializations: prev.specializations.filter(s => s !== spec) }
      } else {
        return { ...prev, specializations: [...prev.specializations, spec] }
      }
    })
  }

  if (loading) return <div className="p-20 text-center font-bold">Loading Profile...</div>

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-pink-50">
      <PsychologistNavbar />

      <main className="flex-1 px-4 md:px-6 py-8 md:py-12 max-w-4xl mx-auto w-full">
        {/* Header Sesuai UI */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          <div className="flex gap-6 items-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-[#e17b9e] flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                SA
              </div>
              <button className="absolute bottom-1 right-1 p-2 bg-white rounded-full shadow-md border border-gray-100">
                <Camera size={18} className="text-gray-600" />
              </button>
            </div>

            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.name}
                  onChange={e => handleInputChange("name", e.target.value)}
                  className="text-3xl font-bold text-gray-900 border-b-2 border-[#e17b9e] bg-transparent outline-none w-full"
                />
              ) : (
                <h1 className="text-3xl font-bold text-gray-900">{profileData.name}</h1>
              )}
              <p className="text-lg text-gray-600 mt-1">{profileData.title}</p>
            </div>
          </div>

          <button
            onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition ${
              isEditing ? "bg-green-600 text-white shadow-lg" : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm"
            }`}
          >
            {isEditing ? <><Save size={18} /> Save Changes</> : <><Edit size={18} /> Edit Profile</>}
          </button>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-3xl shadow-sm p-8 mb-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-3 items-start">
              <Mail className="text-gray-400 mt-1" size={18} />
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Email</p>
                {isEditing ? (
                  <input type="email" value={profileData.email} onChange={e => handleInputChange("email", e.target.value)} className="w-full p-2 border rounded-lg bg-gray-50" />
                ) : (
                  <p className="text-gray-900 font-medium">{profileData.email}</p>
                )}
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <Phone className="text-gray-400 mt-1" size={18} />
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Phone</p>
                {isEditing ? (
                  <input type="tel" value={profileData.phone} onChange={e => handleInputChange("phone", e.target.value)} className="w-full p-2 border rounded-lg bg-gray-50" />
                ) : (
                  <p className="text-gray-900 font-medium">{profileData.phone}</p>
                )}
              </div>
            </div>
            <div className="flex gap-3 items-start md:col-span-2">
              <MapPin className="text-gray-400 mt-1" size={18} />
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Location</p>
                <p className="text-gray-900 font-medium">{profileData.location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="bg-white rounded-3xl shadow-sm p-8 mb-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6 font-sans tracking-tight">Professional Bio</h2>
          {isEditing ? (
            <textarea value={profileData.bio} onChange={e => handleInputChange("bio", e.target.value)} className="w-full p-3 border rounded-xl bg-gray-50 h-32 resize-none outline-none focus:ring-2 focus:ring-pink-200" />
          ) : (
            <p className="text-gray-600 leading-relaxed font-medium">{profileData.bio}</p>
          )}
        </div>

        {/* Specializations - FITUR PILIH SPESIALIS */}
        <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Specializations</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {profileData.specializations.map((spec, idx) => (
              <span key={idx} className="px-4 py-1.5 bg-gray-50 text-gray-600 rounded-full text-sm font-bold border border-gray-100">
                {spec}
              </span>
            ))}
          </div>

          {isEditing && (
            <div className="pt-6 border-t border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase mb-4">Select to add/remove specializations:</p>
              <div className="flex flex-wrap gap-2">
                {["Anxiety Disorders", "Depression", "Stress Management", "Relationship Counseling", "Family Therapy", "Youth Counseling"].map(spec => (
                  <button
                    key={spec}
                    onClick={() => toggleSpecialization(spec)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                      profileData.specializations.includes(spec) ? "bg-[#e17b9e] text-white shadow-md" : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    {spec}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}