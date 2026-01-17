"use client"

import Link from "next/link"
import PsychologistNavbar from "@/components/psychologist/navbar"
import StatisticsSection from "@/components/psychologist/statistics-section"
import ScheduleSection from "@/components/psychologist/schedule-section"
import ClientsSection from "@/components/psychologist/clients-section"
import RecentActivitySection from "@/components/psychologist/recent-activity-section"

export default function PsychologistDashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-pink-50">
      <PsychologistNavbar />

      <main className="flex-1 px-4 md:px-6 py-8 md:py-12 max-w-7xl mx-auto w-full">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-[#1a2e4a] to-[#2d4a6f] rounded-xl md:rounded-2xl p-8 md:p-12 shadow-xl mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, dr. Miftah! 👋</h1>
              <p className="text-gray-200 md:text-lg">
                You have <span className="font-bold">8 sessions</span> scheduled this week
              </p>
            </div>
            <div className="mt-6 md:mt-0 flex gap-4">
              
              <Link href="/psychologist/schedule" className="px-6 py-3 bg-[#e17b9e] hover:bg-[#d85a8a] font-semibold rounded-lg transition">
                Schedule Now
              </Link>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <StatisticsSection />

        {/* Schedule & Calendar */}
        <ScheduleSection />

        {/* Clients List */}
        <ClientsSection />

        {/* Recent Activity & Insights */}
        <RecentActivitySection />
      </main>
    </div>
  )
}
