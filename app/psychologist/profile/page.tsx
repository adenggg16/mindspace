"use client"

import PsychologistNavbar from "@/components/psychologist/navbar"
import { Camera, Mail, Phone, MapPin, Award, Edit, Save, Lock } from "lucide-react"
import { useState } from "react"

export default function PsychologistProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Dr. Miftahul Jannah, M.Psi.",
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
    availability: "Monday - Friday, 9:00 AM - 5:00 PM",
    sessionFee: "Rp 350.000 per session"
  })

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAddSpecialization = (spec: string) => {
    if (!profileData.specializations.includes(spec)) {
      setProfileData(prev => ({
        ...prev,
        specializations: [...prev.specializations, spec]
      }))
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-pink-50">
      <PsychologistNavbar />

      <main className="flex-1 px-4 md:px-6 py-8 md:py-12 max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          <div className="flex gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#e17b9e] to-[#d85a8a] flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                SA
              </div>
              <button className="absolute bottom-2 right-2 p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition">
                <Camera size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Basic Info */}
            {isEditing ? (
              <div className="flex-1">
                <input
                  type="text"
                  value={profileData.name}
                  onChange={e => handleInputChange("name", e.target.value)}
                  className="text-2xl font-bold text-gray-900 border-b-2 border-[#e17b9e] pb-2 mb-2 w-full"
                />
                <input
                  type="text"
                  value={profileData.title}
                  onChange={e => handleInputChange("title", e.target.value)}
                  className="text-lg text-gray-600 border-b-2 border-[#e17b9e] pb-2 w-full"
                />
              </div>
            ) : (
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{profileData.name}</h1>
                <p className="text-lg text-gray-600 mt-2">{profileData.title}</p>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition w-fit ${
              isEditing
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-white border border-gray-300 text-gray-900 hover:bg-gray-50"
            }`}
          >
            {isEditing ? (
              <>
                <Save size={20} />
                Save Changes
              </>
            ) : (
              <>
                <Edit size={20} />
                Edit Profile
              </>
            )}
          </button>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Mail size={16} />
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={profileData.email}
                  onChange={e => handleInputChange("email", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e17b9e]"
                />
              ) : (
                <p className="text-gray-900 font-medium">{profileData.email}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Phone size={16} />
                Phone
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={e => handleInputChange("phone", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e17b9e]"
                />
              ) : (
                <p className="text-gray-900 font-medium">{profileData.phone}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <MapPin size={16} />
                Location
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.location}
                  onChange={e => handleInputChange("location", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e17b9e]"
                />
              ) : (
                <p className="text-gray-900 font-medium">{profileData.location}</p>
              )}
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Professional Bio</h2>

          {isEditing ? (
            <textarea
              value={profileData.bio}
              onChange={e => handleInputChange("bio", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e17b9e] resize-none h-24"
            />
          ) : (
            <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
          )}
        </div>

        {/* Specializations */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Specializations</h2>

          <div className="flex flex-wrap gap-2 mb-6">
            {profileData.specializations.map((spec, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-gradient-to-r from-[#e17b9e] to-[#d85a8a] text-white rounded-full text-sm font-medium"
              >
                {spec}
              </span>
            ))}
          </div>

          {isEditing && (
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Add more specializations:</p>
              <div className="flex gap-2 flex-wrap">
                {["EMDR Therapy", "Family Counseling", "Youth Psychology", "Trauma Therapy"].map(spec => (
                  <button
                    key={spec}
                    onClick={() => handleAddSpecialization(spec)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                      profileData.specializations.includes(spec)
                        ? "bg-gray-300 text-gray-600"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    + {spec}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Credentials */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Award size={24} className="text-[#e17b9e]" />
            Credentials & Education
          </h2>

          <div className="space-y-4">
            {profileData.credentials.map((cred, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg border-l-4 border-[#e17b9e]">
                <p className="text-gray-900 font-medium">{cred}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Availability & Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Availability</h2>

            {isEditing ? (
              <textarea
                value={profileData.availability}
                onChange={e => handleInputChange("availability", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e17b9e] resize-none"
              />
            ) : (
              <p className="text-gray-700 font-medium">{profileData.availability}</p>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Session Fee</h2>

            {isEditing ? (
              <input
                type="text"
                value={profileData.sessionFee}
                onChange={e => handleInputChange("sessionFee", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e17b9e]"
              />
            ) : (
              <p className="text-gray-700 font-medium text-lg">{profileData.sessionFee}</p>
            )}
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Lock size={24} className="text-[#e17b9e]" />
            Security Settings
          </h2>

          <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">Change Password</p>
              <p className="text-sm text-gray-500">Update your password regularly for security</p>
            </div>
            <span className="text-gray-400">→</span>
          </button>

          <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition flex items-center justify-between mt-4">
            <div>
              <p className="font-semibold text-gray-900">Two-Factor Authentication</p>
              <p className="text-sm text-gray-500">Enable 2FA to secure your account</p>
            </div>
            <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
              Not Enabled
            </span>
          </button>
        </div>
      </main>
    </div>
  )
}
