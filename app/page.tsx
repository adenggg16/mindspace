import { Mail, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background with diagonal split */}
      <div className="absolute inset-0 flex">
        <div className="w-1/2 bg-gray-200" />
        <div className="w-1/2 bg-[#1a2332]" />
      </div>

      {/* Curved overlay effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[60%] h-full bg-[#1a2332] rounded-bl-[200px]" />
        <div className="absolute bottom-0 left-0 w-[60%] h-full bg-gray-200 rounded-tr-[200px]" />
      </div>

      {/* Login card */}
      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo and heading */}
        <div className="flex flex-col items-center mb-8">
          {/* User avatar icon */}
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-300 to-pink-400 flex items-center justify-center mb-6 shadow-lg">
            <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          </div>

          {/* MindSpace branding */}
          <h1 className="text-4xl font-serif mb-8 text-pink-400 tracking-wide">MindSpace</h1>

          {/* LOGIN heading */}
          <h2 className="text-5xl font-bold text-gray-900 mb-8">LOGIN</h2>
        </div>

        {/* Login form */}
        <form className="space-y-6">
          {/* Email/Phone input */}
          <div className="relative">
            <Input
              type="text"
              placeholder="E-mail/Phone Number"
              className="h-14 pr-12 border-2 border-gray-900 bg-white text-gray-900 placeholder:text-gray-700"
            />
            <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-900" />
          </div>

          {/* Password input */}
          <div className="relative">
            <Input
              type="password"
              placeholder="Password"
              className="h-14 pr-12 border-2 border-gray-900 bg-white text-gray-900 placeholder:text-gray-700"
            />
            <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-900" />
          </div>

          {/* Sign up link */}
          <div className="text-right text-sm">
            <span className="text-gray-900">{"Don't have an account? "}</span>
            <a href="#" className="text-gray-900 font-semibold underline">
              Sign Up
            </a>
          </div>

          {/* Login button */}
          <Button
            type="submit"
            className="w-full h-12 bg-white text-gray-900 border-2 border-gray-900 hover:bg-gray-100 text-lg font-semibold"
          >
            LOGIN
          </Button>
        </form>
      </div>
    </div>
  )
}
