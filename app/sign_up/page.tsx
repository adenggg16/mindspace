import { Mail, Lock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-200">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          {/* Smooth flowing S-curve from top-right down through the page */}
          <path
            d="M 1000 0 L 600 0 Q 500 100, 480 250 Q 460 400, 500 550 Q 540 700, 480 850 Q 450 950, 350 1000 L 1000 1000 Z"
            fill="#1a2e4a"
          />
        </svg>
      </div>

      {/* MindSpace Logo - Top Left */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8 z-20">
        <div className="flex items-center gap-2 md:gap-3">
          <img src="/images/logo.png" alt="MindSpace Logo" className="w-8 h-8 md:w-12 md:h-12" />
          <h1 className="text-2xl md:text-4xl font-serif text-[#e17b9e] tracking-wide">MindSpace</h1>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-md px-4 md:px-6">
        <div className="bg-white/95 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-2xl border border-gray-300">
          {/* Logo Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-linear-to-br from-[#e8a5ba] to-[#d4779b] flex items-center justify-center shadow-lg border-4 border-gray-300">
              <img src="/images/logo.png" alt="MindSpace Logo" className="w-12 h-12 md:w-16 md:h-16 rounded-full" />
            </div>
          </div>

          {/* SIGN UP heading */}
          <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-8 md:mb-10">SIGN UP</h2>

          {/* Sign up form */}
          <form className="space-y-4 md:space-y-5">
            {/* Full Name input */}
            <div className="relative">
              <Input
                type="text"
                placeholder="Full Name"
                className="h-12 md:h-14 pr-10 md:pr-12 border-2 md:border-[3px] border-black bg-white text-gray-900 placeholder:text-gray-900 rounded-none font-serif text-sm md:text-base"
              />
              <User className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 text-gray-900" />
            </div>

            {/* Email input */}
            <div className="relative">
              <Input
                type="email"
                placeholder="E-mail"
                className="h-12 md:h-14 pr-10 md:pr-12 border-2 md:border-[3px] border-black bg-white text-gray-900 placeholder:text-gray-900 rounded-none font-serif text-sm md:text-base"
              />
              <Mail className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 text-gray-900" />
            </div>

            {/* Password input */}
            <div className="relative">
              <Input
                type="password"
                placeholder="Password"
                className="h-12 md:h-14 pr-10 md:pr-12 border-2 md:border-[3px] border-black bg-white text-gray-900 placeholder:text-gray-900 rounded-none font-serif text-sm md:text-base"
              />
              <Lock className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 text-gray-900" />
            </div>

            {/* Confirm Password input */}
            <div className="relative">
              <Input
                type="password"
                placeholder="Confirm Password"
                className="h-12 md:h-14 pr-10 md:pr-12 border-2 md:border-[3px] border-black bg-white text-gray-900 placeholder:text-gray-900 rounded-none font-serif text-sm md:text-base"
              />
              <Lock className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 text-gray-900" />
            </div>

            {/* Login link */}
            <div className="text-left text-xs md:text-sm pt-1">
              <span className="text-gray-900 font-serif">Already have an account? </span>
              <a href="/" className="text-gray-900 font-serif font-bold underline">
                Login
              </a>
            </div>

            <div className="flex justify-center pt-3 md:pt-4">
              <Button
                type="submit"
                className="w-32 md:w-40 h-8 md:h-10 bg-white text-gray-900 border-2 border-black hover:bg-gray-100 text-sm md:text-base font-bold rounded-md font-serif"
              >
                SIGN UP
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
