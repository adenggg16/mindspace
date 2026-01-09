import Link from "next/link"

export default function PsychologistIndex() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Mind<span className="text-[#e17b9e]">Space</span> - Psychologist Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            A comprehensive professional dashboard for managing client consultations, sessions, and progress tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main Dashboard */}
          <Link href="/psychologist">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition cursor-pointer">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">📊 Dashboard Home</h3>
              <p className="text-gray-600 mb-4">
                Main dashboard with statistics, schedule overview, client list, and recent activities.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  Statistics
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  Calendar
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  Overview
                </span>
              </div>
            </div>
          </Link>

          {/* Clients Management */}
          <Link href="/psychologist/clients">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition cursor-pointer">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">👥 My Clients</h3>
              <p className="text-gray-600 mb-4">
                Manage all your clients with detailed progress tracking, contact information, and session history.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  Client Cards
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  Search
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  Filter
                </span>
              </div>
            </div>
          </Link>

          {/* Schedule Management */}
          <Link href="/psychologist/schedule">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition cursor-pointer">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">📅 Schedule</h3>
              <p className="text-gray-600 mb-4">
                Interactive calendar view with appointment details, booking confirmation, and video call integration.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  Calendar
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  Appointments
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  Video Call
                </span>
              </div>
            </div>
          </Link>

          {/* Session Records */}
          <Link href="/psychologist/sessions">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition cursor-pointer">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">📝 Sessions</h3>
              <p className="text-gray-600 mb-4">
                Keep detailed session notes, track session goals, and plan next steps for each client.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                  Notes
                </span>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                  Goals
                </span>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                  History
                </span>
              </div>
            </div>
          </Link>

          {/* Reports & Analytics */}
          <Link href="/psychologist/reports">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition cursor-pointer">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">📈 Reports</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive analytics with client progress tracking, performance metrics, and export capabilities.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">
                  Analytics
                </span>
                <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">
                  Charts
                </span>
                <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">
                  Export
                </span>
              </div>
            </div>
          </Link>

          {/* Profile Settings */}
          <Link href="/psychologist/profile">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition cursor-pointer">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">⚙️ Profile</h3>
              <p className="text-gray-600 mb-4">
                Manage your professional profile, credentials, availability, and security settings.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                  Profile
                </span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                  Settings
                </span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                  Security
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Key Features */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">✨ Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="text-3xl">📊</div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Real-time Statistics</h4>
                <p className="text-gray-600 text-sm">
                  Track total clients, scheduled sessions, working hours, and completion rates at a glance.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">📅</div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Interactive Calendar</h4>
                <p className="text-gray-600 text-sm">
                  Manage appointments with month/week view, detailed scheduling, and appointment tracking.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">👥</div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Client Management</h4>
                <p className="text-gray-600 text-sm">
                  Comprehensive client profiles with progress tracking, issue types, and session history.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">📝</div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Session Documentation</h4>
                <p className="text-gray-600 text-sm">
                  Record detailed session notes, goals achieved, and plan next session focus areas.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">📈</div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Advanced Analytics</h4>
                <p className="text-gray-600 text-sm">
                  Track performance metrics, client progress trends, and generate professional reports.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">🔒</div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Security & Privacy</h4>
                <p className="text-gray-600 text-sm">
                  Secure authentication, password management, and two-factor authentication support.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Design Features */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🎨 Design & UX</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Responsive Design</h4>
              <p className="text-gray-600 text-sm">
                Fully responsive layout works perfectly on mobile, tablet, and desktop devices with optimized navigation.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Modern UI</h4>
              <p className="text-gray-600 text-sm">
                Clean, intuitive interface with gradient colors, smooth transitions, and professional styling using Tailwind CSS.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Accessibility</h4>
              <p className="text-gray-600 text-sm">
                Semantic HTML, proper color contrast, keyboard navigation support, and screen reader compatibility.
              </p>
            </div>
          </div>
        </div>

        {/* Getting Started */}
        <div className="mt-12 bg-gradient-to-r from-[#1a2e4a] to-[#2d4a6f] rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">🚀 Getting Started</h2>
          <div className="space-y-4">
            <p>1. Navigate to the Dashboard Home to see your statistics and overview</p>
            <p>2. Check the Schedule page to see your appointment calendar</p>
            <p>3. Visit My Clients to manage and track client progress</p>
            <p>4. Record session notes in the Sessions page</p>
            <p>5. Review analytics in the Reports page</p>
            <p>6. Update your profile in the Profile settings</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600">
          <p>© 2026 MindSpace - Professional Psychologist Dashboard</p>
          <p className="text-sm mt-2">
            For support and documentation, see <code className="bg-gray-100 px-2 py-1 rounded">PSYCHOLOGIST_DASHBOARD.md</code>
          </p>
        </div>
      </div>
    </div>
  )
}
