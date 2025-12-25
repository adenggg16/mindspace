import Link from "next/link"

export default function DashboardNavbar() {
  return (
    <nav className="bg-[#1a2e4a] text-white py-6 px-6 md:px-8 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/images/logo.png" alt="MindSpace Logo" className="w-8 h-8 md:w-10 md:h-10" />
          <div>
            <h1 className="text-2xl font-bold">
              Mind<span className="text-[#e17b9e]">Space</span>
            </h1>
            <p className="text-sm text-gray-400">A quiet space for your thoughts.</p>
          </div>
        </div>

        <div className="flex gap-8">
          <Link href="/dashboard" className="hover:text-[#e17b9e] transition">
            Home
          </Link>
          <Link href="/articles" className="hover:text-[#e17b9e] transition">
            Articles
          </Link>
          <Link href="/counseling" className="hover:text-[#e17b9e] transition">
            Counseling
          </Link>
          <Link href="/profile" className="hover:text-[#e17b9e] transition">
            Profile
          </Link>
        </div>
      </div>
    </nav>
  )
}
