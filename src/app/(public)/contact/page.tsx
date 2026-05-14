export const metadata = { title: 'Contact — Genwunner' }

const categories = [
  { title: 'Booking & Shows', desc: 'Conventions, college shows, brand activations, fan meetups', href: '/book', cta: 'Submit Booking Form' },
  { title: 'Press & Media', desc: 'Interviews, features, editorial, playlisting', email: 'genwunnermgmt@gmail.com' },
  { title: 'Management & Business', desc: 'Label, brand deals, partnerships, sync licensing', email: 'genwunnermgmt@gmail.com' },
  { title: 'Collabs & Features', desc: 'Artist collabs, features, remixes', email: 'genwunnermgmt@gmail.com' },
  { title: 'Fan Submissions', desc: 'Fan art, edits, memes, Big Man Blastoise sightings', href: '/submit', cta: 'Submit Here' },
  { title: 'Merch Support', desc: 'Order issues, shipping, returns', email: 'genwunnermgmt@gmail.com' },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <p className="text-red-600 text-xs uppercase tracking-[0.3em] font-bold mb-4 text-center">Get in Touch</p>
        <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-center mb-4">CONTACT</h1>
        <p className="text-white/30 text-center text-sm mb-16 max-w-sm mx-auto">
          Use the right channel. We read everything.
        </p>

        <div className="space-y-3">
          {categories.map(cat => (
            <div key={cat.title} className="bg-zinc-900 border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:border-white/20 transition-colors">
              <div className="flex-1">
                <h3 className="font-black text-lg tracking-tight">{cat.title}</h3>
                <p className="text-white/40 text-sm mt-1">{cat.desc}</p>
              </div>
              {cat.href ? (
                <a href={cat.href} className="bg-red-600 text-black font-black uppercase tracking-wide px-5 py-2.5 rounded-full hover:bg-red-500 transition-colors text-xs whitespace-nowrap">
                  {cat.cta}
                </a>
              ) : (
                <a href={`mailto:${cat.email}`} className="border border-white/20 text-white font-bold uppercase tracking-wide px-5 py-2.5 rounded-full hover:border-red-600 hover:text-red-600 transition-colors text-xs whitespace-nowrap">
                  Email →
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-zinc-900 border border-white/10 rounded-2xl p-8 text-center">
          <p className="text-white/40 text-sm uppercase tracking-widest mb-2">General Inquiries</p>
          <a href="mailto:genwunnermgmt@gmail.com" className="text-red-600 font-black text-lg hover:text-red-500 transition-colors">
            genwunnermgmt@gmail.com
          </a>
        </div>
      </div>
    </div>
  )
}
