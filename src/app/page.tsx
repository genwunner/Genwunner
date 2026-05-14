import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-black/10">
        <span className="font-black text-xl tracking-tight">GENWUNNER</span>
        <Link
          href="/login"
          className="bg-black text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-black/80 transition-colors"
        >
          Sign In
        </Link>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <p className="text-xs uppercase tracking-widest text-black/40 mb-4">Official Website</p>
        <h1 className="text-7xl font-black tracking-tight mb-6">GENWUNNER</h1>
        <p className="text-black/50 text-lg max-w-md mb-10">
          Rapper. Artist. Creator.
        </p>
        <div className="flex gap-4">
          <Link
            href="/merch"
            className="bg-black text-white font-semibold px-6 py-3 rounded-full hover:bg-black/80 transition-colors"
          >
            Shop Merch
          </Link>
          <Link
            href="/epk"
            className="border border-black/20 text-black font-semibold px-6 py-3 rounded-full hover:bg-black/5 transition-colors"
          >
            Press Kit
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-8 py-6 border-t border-black/10 text-center text-xs text-black/30">
        © {new Date().getFullYear()} Genwunner. All rights reserved.
      </footer>
    </div>
  )
}
