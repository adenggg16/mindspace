import Link from "next/link"
import { Button } from "@/components/ui/button"

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
              LOGIN
            </Button>
          </Link>
          <Link href="/sign_up">
            <Button className="bg-[#B58D97] hover:bg-[#d4779b] text-white">SIGN-UP</Button>
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
            A safe space to understand yourself and care for your mental well-being. MindSpace is designed to support
            you in understanding your emotions, managing daily stress, and developing healthier mental habits. Here,
            your feelings are valid, and your journey matters.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/sign_up">
              <Button size="lg" className="bg-[#B58D97] hover:bg-[#b07885] text-white px-8 py-3 shadow-lg rounded-full">
                GET STARTED
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* About Section */}
      <section className="relative z-10 py-16 px-6 md:px-8 bg-white/95 backdrop-blur-sm mx-4 md:mx-8 rounded-2xl shadow-xl">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">What is MindSpace</h2>
          <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed max-w-3xl mx-auto">
            MindSpace is a digital mental health platform that provides educational resources, self-reflection tools,
            and access to professional psychological support.
          </p>
          <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed max-w-3xl mx-auto">
            Our goal is to help users increase emotional awareness and mental well-being through ethical,
            evidence-based, and accessible approaches. MindSpace does not replace professional diagnosis or treatment,
            but serves as a supportive space for learning, reflection, and guidance.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 mt-8 py-16 px-6 md:px-8 bg-white/95 backdrop-blur-sm mx-4 md:mx-8 rounded-2xl shadow-xl">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 leading-tight">
            Featured Features of MindSpace
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1: Talk to us */}
            <div className="text-center bg-gray-300/80 backdrop-blur-sm rounded-lg p-8 shadow-md">
              <div className="w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                <img src="/images/talk.png" alt="Talk to us icon" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Talk to us</h3>
              <p className="text-gray-700 leading-relaxed mb-6 text-sm">
                Connect directly with licensed psychologists through a secure chat feature. Before starting a
                consultation, users are guided to complete a mental health record to help psychologists understand your
                concerns more accurately and responsibly.
              </p>
              <Button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-full">Talk to us</Button>
            </div>

            {/* Feature 2: Get to Know You */}
            <div className="text-center bg-gray-300/80 backdrop-blur-sm rounded-lg p-8 shadow-md">
              <div className="w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                <img
                  src="/images/get.png"
                  alt="Get to Know You icon"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Get to Know You</h3>
              <p className="text-gray-700 leading-relaxed mb-6 text-sm">
                This brief form helps us get to know you better, so our psychologists can provide more personalized and
                supportive conversations.
              </p>
              <Button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-full">
                Get to Know You
              </Button>
            </div>

            {/* Feature 3: Mental Health Articles */}
            <div className="text-center bg-gray-300/80 backdrop-blur-sm rounded-lg p-8 shadow-md">
              <div className="w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                <img
                  src="/images/mental.png"
                  alt="Mental Health Articles icon"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Mental Health Articles</h3>
              <p className="text-gray-700 leading-relaxed mb-6 text-sm">
                Access curated, evidence-based articles from trusted psychological journals covering topics such as
                stress management, emotional regulation, anxiety, and self-care.
              </p>
              <Button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-full">
                Mental Health Articles
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-white/95 backdrop-blur-sm py-8 text-center mx-4 md:mx-8 rounded-lg shadow-xl">
        <p className="text-gray-900">&copy; 2025 MindSpace. All rights reserved.</p>
      </footer>
    </div>
  )
}
