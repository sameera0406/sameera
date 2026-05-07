import { login, signup } from './actions'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full"></div>

      <div className="w-full max-w-md px-8 relative z-10">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400 text-sm">Sign in to manage your placement notes</p>
          </div>

          <form className="flex flex-col gap-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
              <input 
                name="email" 
                type="email" 
                placeholder="name@example.com" 
                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                required 
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Password</label>
              <input 
                name="password" 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                required 
              />
            </div>

            <button 
              formAction={login} 
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98] mt-4"
            >
              Log In
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#121212] px-2 text-gray-500 font-medium">New here?</span></div>
            </div>

            <button 
              formAction={signup} 
              className="w-full bg-transparent border border-white/10 hover:bg-white/5 text-white font-semibold py-4 rounded-xl transition-all"
            >
              Create an Account
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <Link href="/" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}