import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gray-200">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          {/* Smooth flowing S-curve from top-right down through the page */}
          <path
            d="M 1000 0 L 600 0 Q 500 100, 480 250 Q 460 400, 500 550 Q 540 700, 480 850 Q 450 950, 350 1000 L 1000 1000 Z"
            fill="#1a2e4a"
          />
        </svg>
      </div>
      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between p-4 md:p-6">
        <div className="flex items-center gap-2 md:gap-3">
          <img src="/images/logo.png" alt="MindSpace Logo" className="w-8 h-8 md:w-10 md:h-10" />
          <h1 className="text-2xl md:text-3xl font-serif text-[#e17b9e] tracking-wide">MindSpace</h1>
        </div>
        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-gray-900 hover:text-gray-700 bg-white/90 backdrop-blur-sm">
              Masuk
            </Button>
          </Link>
          <Link href="/sign_up">
            <Button className="bg-[#e17b9e] hover:bg-[#d4779b] text-white">
              Daftar
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-2xl border border-white/30 max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-[#e17b9e]">MindSpace</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            MindSpace adalah platform kesehatan mental inovatif yang dirancang khusus untuk membantu Anda menjaga keseimbangan emosional, mengelola stres, dan membangun kebiasaan positif untuk kesehatan pikiran.
            Dengan antarmuka yang ramah dan fitur-fitur yang didukung oleh ahli kesehatan mental, MindSpace memungkinkan Anda untuk memahami diri sendiri lebih dalam dan mencapai kesejahteraan mental yang optimal.
          </p>
          <p className="text-base md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Baik Anda sedang menghadapi tantangan sehari-hari, ingin meningkatkan kesadaran diri, atau mencari dukungan untuk perjalanan kesehatan mental Anda,
            MindSpace hadir sebagai sahabat digital yang selalu siap mendampingi setiap langkah Anda menuju kesehatan mental yang lebih baik.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/sign_up">
              <Button size="lg" className="bg-[#e17b9e] hover:bg-[#d4779b] text-white px-8 py-3 shadow-lg">
                Mulai Sekarang
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="border-[#e17b9e] text-[#e17b9e] hover:bg-[#e17b9e] hover:text-white px-8 py-3 shadow-lg">
                Masuk
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* About Section */}
      <section className="relative z-10 py-16 px-6 md:px-8 bg-white/95 backdrop-blur-sm mx-4 md:mx-8 rounded-lg shadow-xl">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
            Apa itu MindSpace?
          </h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed max-w-3xl mx-auto">
            MindSpace bukan sekadar aplikasi biasa. Ini adalah ruang aman digital Anda di mana Anda dapat mengeksplorasi emosi, memproses pengalaman traumatis, dan membangun ketahanan mental.
            Bayangkan sebuah sanctuary virtual yang siap mendengarkan tanpa penilaian, atau sebuah alat yang membantu Anda memahami pola pikiran dan emosi Anda.
          </p>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed max-w-3xl mx-auto">
            Dengan MindSpace, Anda dapat melacak suasana hati harian, menulis jurnal refleksi emosional, mengakses panduan meditasi, dan terhubung dengan komunitas yang mendukung kesehatan mental.
            Platform kami menggunakan pendekatan berbasis bukti untuk memastikan bahwa setiap fitur dirancang untuk memberikan manfaat nyata bagi kesehatan mental Anda.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Bergabunglah dengan ribuan orang yang telah menemukan dukungan, pemahaman, dan alat yang mereka butuhkan untuk menjaga kesehatan mental mereka bersama MindSpace.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-16 px-6 md:px-8 bg-gray-50/95 backdrop-blur-sm mx-4 md:mx-8 rounded-lg shadow-xl mb-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 leading-tight">
            Fitur Unggulan MindSpace
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-md">
              <div className="w-16 h-16 bg-[#e17b9e] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Mood Tracker</h3>
              <p className="text-gray-700 leading-relaxed">
                Pantau suasana hati Anda setiap hari dengan tracker yang mudah digunakan, bantu identifikasi pola emosi dan tingkatkan kesadaran diri.
              </p>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-md">
              <div className="w-16 h-16 bg-[#e17b9e] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Jurnal Refleksi Emosional</h3>
              <p className="text-gray-700 leading-relaxed">
                Tulis jurnal harian untuk memproses emosi, merefleksikan pengalaman, dan melacak perkembangan kesehatan mental Anda dari waktu ke waktu.
              </p>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-md">
              <div className="w-16 h-16 bg-[#e17b9e] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Panduan Meditasi & Mindfulness</h3>
              <p className="text-gray-700 leading-relaxed">
                Akses panduan meditasi terpandu, latihan pernapasan, dan teknik mindfulness untuk membantu mengelola stres dan meningkatkan kesejahteraan mental.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-white/95 backdrop-blur-sm py-8 text-center mx-4 md:mx-8 rounded-lg shadow-xl">
        <p className="text-gray-500">&copy; 2025 MindSpace. All rights reserved.</p>
      </footer>
    </div>
  );
}
