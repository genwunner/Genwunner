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
        <p className="text-[var(--color-brand-red)] text-xs uppercase tracking-[0.3em] font-bold mb-4 text-center">Get in Touch</p>
        <h1 className="text-5xl sm:text-7xl text-center mb-4">CONTACT</h1>
        <p className="text-white/30 text-center text-sm mb-16 max-w-sm mx-auto">
          Use the right channel. We read everything.
        </p>

        <div className="space-y-3">
          {categories.map(cat => (
            <div key={cat.title} className="brand-card p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <h3 className="text-lg">{cat.title}</h3>
                <p className="text-white/40 text-sm mt-1">{cat.desc}</p>
              </div>
              {cat.href ? (
                <a href={cat.href} className="btn-primary whitespace-nowrap">{cat.cta}</a>
              ) : (
                <a href={`mailto:${cat.email}`} className="btn-outline whitespace-nowrap">Email →</a>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 brand-card p-8 text-center">
          <p className="text-white/40 text-sm uppercase tracking-widest mb-2">General Inquiries</p>
          <a href="mailto:genwunnermgmt@gmail.com" className="text-[var(--color-brand-red)] font-black text-lg hover:text-[var(--color-brand-red-dark)] transition-colors">
            genwunnermgmt@gmail.com
          </a>
        </div>
      </div>
    </div>
  )
}
