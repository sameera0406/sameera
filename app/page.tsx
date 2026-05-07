import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
        <div className="text-2xl font-black tracking-tighter text-blue-600">
          SMART<span className="text-gray-900">DASH</span>
        </div>
        <div className="flex gap-6 items-center font-medium text-gray-600">
          <Link href="/notes" className="hover:text-blue-600 transition">Notes</Link>
          <Link href="/login" className="bg-gray-900 text-white px-5 py-2 rounded-full hover:bg-gray-800 transition shadow-lg shadow-gray-200">
            Sign In
          </Link>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <main className="max-w-6xl mx-auto px-8 pt-20 pb-32">
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-blue-600 uppercase bg-blue-50 rounded-full">
            Placement Prep 2026 Ready
          </span>
          <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 mb-8 tracking-tight">
            Master your workflow <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
              with precision.
            </span>
          </h1>
          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            A minimalist dashboard designed for students. Organize your technical notes, 
            track DSA progress, and prepare for product-based company placements.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login" className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-blue-200">
              Get Started Free
            </Link>
            <Link href="/notes" className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all">
              View Documentation
            </Link>
          </div>
        </div>

        {/* 3. Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-32">
          <FeatureCard 
            title="Secure Auth" 
            desc="Enterprise-grade security powered by Supabase logic and Next.js middleware."
            icon="🔒"
          />
          <FeatureCard 
            title="Real-time Notes" 
            desc="Instant database synchronization. Access your study material from any device."
            icon="⚡"
          />
          <FeatureCard 
            title="Placement Tracking" 
            desc="Tailored sections for technical interview prep and product-company goals."
            icon="🎯"
          />
        </div>
      </main>
    </div>
  )
}

// Small sub-component for the cards
function FeatureCard({ title, desc, icon }: { title: string, desc: string, icon: string }) {
  return (
    <div className="p-8 border border-gray-100 rounded-2xl bg-white hover:border-blue-200 transition-colors group">
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 leading-relaxed">{desc}</p>
    </div>
  )
}