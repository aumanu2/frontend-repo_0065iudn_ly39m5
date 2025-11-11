import { useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-4 text-left"
        aria-expanded={open}
      >
        <span className="font-medium text-gray-900 dark:text-gray-100">{q}</span>
        <span className={`transform transition ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      {open && <p className="pb-4 text-sm text-gray-600 dark:text-gray-300">{a}</p>}
    </div>
  )
}

function App() {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    parent_name: '',
    city: '',
    state: '',
    grade_level: '11',
    stream: 'PCM',
    program_interest: '',
    preferred_intake: '2025-26',
    how_heard: '',
    consent: false,
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(null)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSubmitted(null)
    try {
      const res = await fetch(`${API_BASE}/api/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Submission failed')
      const data = await res.json()
      setSubmitted(data.id)
      setForm({
        full_name: '',
        email: '',
        phone: '',
        parent_name: '',
        city: '',
        state: '',
        grade_level: '11',
        stream: 'PCM',
        program_interest: '',
        preferred_intake: '2025-26',
        how_heard: '',
        consent: false,
      })
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  // Company logos for marquee section (between Hero and Achievers Track)
  const logos = [
    { name: 'Amazon', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1280px-Amazon_logo.svg.png' },
    { name: 'Microsoft', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png' },
    { name: 'Google', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png' },
    { name: 'Adobe', src: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.png' },
    { name: 'Nvidia', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/NVIDIA_logo.svg/2560px-NVIDIA_logo.svg.png' },
    { name: 'Swiggy', src: 'https://brandlogos.net/wp-content/uploads/2023/09/swiggy-logo_brandlogos.net_fplmb.png' },
  ]

  // Faculty & Mentors data (updated)
  const faculties = [
    {
      name: 'Manas Kumar Verma',
      img: 'https://i.ibb.co/d06Vp063/Copy-of-ASCSAI-Deck.png',
      desc: 'India’s top 15 competitive programmer, youngest intern at Directi. Mentor who has taught and guided over 50,000 learners so far in their careers. Previously a Quant Trader at Alphagrep Singapore.',
      logos: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLi4bV42Izq5HiSKnjgtwmw75T-0NR5qHDFA&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSN_zYUgpd1kHbtwdAQeR3tONMpWAq9_8YjQ&s',
      ],
    },
    {
      name: 'Swapnil Daga',
      img: 'https://i.ibb.co/CsTh9Pm0/Copy-of-ASCSAI-Deck-1.png',
      desc: 'Guided over 50,000+ learners in their career so far. Right after college, Swapnil has cracked Google London & then moved on to Apple India. Currently leads teaching infra at AlgoUniversity.',
      logos: [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png',
        'https://www.shutterstock.com/image-vector/galati-romania-april-29-2023-600nw-2295394661.jpg',
      ],
    },
    {
      name: 'Nikita Agarwal',
      img: 'https://i.ibb.co/S7yK2pM9/Copy-of-ASCSAI-Deck-2.png',
      desc: 'Previously at Microsoft as Data Scientist and Indeed as a senior software engineer. Nikita has logged almost 1000+ interviews for both students incoming to companies and companies’ roles.',
      logos: [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Indeed_logo.svg/2560px-Indeed_logo.svg.png',
      ],
    },
    {
      name: 'Nalin Abrol',
      img: 'https://i.ibb.co/zTcq8tD3/Copy-of-ASCSAI-Deck-3.png',
      desc: 'Before joining AlgoUniversity as a CTO, Nalin scaled tech-infra for a unicorn startup Plivo. He built and scaled TheJobOverflow (India’s fastest growing job prep platform), to 80,000+ active users in 6mo!',
      logos: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLsrm3rT3sn0p9C-_2T_dKMvaD0srxxnFqWg&s',
        'https://d3uam8jk4sa4y4.cloudfront.net/static/images/tjo_algou2.png',
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Announcement / Trust Bar */}
      <div className="w-full bg-emerald-600 text-white text-center text-sm py-2">
        Cohort graduates averaging ₹25,00,000+ CTC • Designed by IIIT-H Alumni • 1.5 Years of Industry Experience
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <img src="https://images.unsplash.com/photo-1744640326166-433469d102f2?ixid=M3w3OTkxMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI4MDI3MjB8&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" alt="AI & CS" className="h-8 w-8 rounded" />
            <span className="font-bold">School of AI & CS</span>
          </a>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#program" className="hover:text-blue-700">Program</a>
            <a href="#curriculum" className="hover:text-blue-700">Curriculum</a>
            <a href="#admissions" className="hover:text-blue-700">Admissions</a>
            <a href="#fees" className="hover:text-blue-700">Fees</a>
            <a href="#testimonials" className="hover:text-blue-700">Outcomes</a>
          </div>
          <a href="#register" className="btn-primary">Register</a>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.1.0&ixid=M3wyMDk4MTh8MHwxfHNlYXJjaHwzfHx1bml2ZXJzaXR5JTIwbGVjdHVyZSUyMGhhbGx8ZW58MHwwfHx8fDE%3D&w=1600&q=80&auto=format&fit=crop"
            alt="University lecture hall with students"
            className="w-full h-full object-cover"
            loading="eager"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-4.1.0&ixid=M3wyMDk4MTh8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwbGVjdHVyZXxlbnwwfDB8fHwx&w=1600&q=80&auto=format&fit=crop'
              e.currentTarget.onerror = null
            }}
          />
          {/* Darker overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-blue-900/70 to-white" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-12 grid lg:grid-cols-2 gap-10 items-center">
          <div className="text-white">
            <span className="inline-flex items-center bg-white/10 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold mb-4 border border-white/20">
              4-Year B.Tech • AI & Computer Science
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              AlgoUniversity School of CS/AI
            </h1>
            <p className="mt-4 text-lg text-blue-100 max-w-2xl">
              A next‑gen engineering program shaped by IIIT-Hyd Alums. Learn directly from industrial leaders, graduate with 1.5 years of Industrial experience.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#register" className="btn-hero-primary">Register & Get Mock Tests</a>
              <a href="#program" className="btn-hero-secondary">Explore the Program</a>
            </div>
            {/* Highlight cards */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              {[
                ['18-Month Experience', 'Internships + Co-ops'],
                ['Mentor Network', 'Industry Leaders'],
                ['Modern Labs', 'AI • Cloud • Systems'],
                ['Career Outcomes', 'Portfolio + Placements'],
              ].map(([h, s]) => (
                <div key={h} className="p-4 rounded-xl bg-white text-gray-900 shadow border border-gray-200">
                  <p className="font-semibold">{h}</p>
                  <p className="text-gray-600 text-xs mt-1">{s}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Landscape video section */}
          <div className="relative">
            <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl p-4 border">
              <div className="relative w-full rounded-xl overflow-hidden border bg-black pb-[56.25%]">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1"
                  title="Program Overview Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <p className="text-sm text-gray-600 mt-3 px-1">Watch a quick overview of our AI/CS program and industrial immersion.</p>
            </div>
          </div>
        </div>
      </header>

      {/* Logo Marquee Section (between Hero and Achievers Track) */}
      <section aria-label="Hiring partners" className="relative bg-white border-y">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <p className="text-center text-xs uppercase tracking-widest text-gray-500 mb-3">Our students have worked at</p>
        </div>
        <div className="relative overflow-hidden py-4">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white to-transparent" />
          <div className="logo-marquee gap-10 px-6">
            <div className="flex items-center gap-10">
              {logos.map((l) => (
                <div key={l.name} className="h-10 flex items-center shrink-0">
                  <img
                    src={l.src}
                    alt={l.name}
                    className="h-8 sm:h-10 w-auto object-contain opacity-95"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-10" aria-hidden="true">
              {logos.map((l, i) => (
                <div key={`${l.name}-${i}`} className="h-10 flex items-center shrink-0">
                  <img
                    src={l.src}
                    alt={l.name}
                    className="h-8 sm:h-10 w-auto object-contain opacity-95"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievers Track – redesigned (light) */}
      <section id="program" className="relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-blue-50/60 to-white" />
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="mb-10 text-center">
            <h2 className="section-title">Achievers Track</h2>
            <p className="text-gray-600 mt-2 max-w-3xl mx-auto">Elite preparation tracks to excel in global programs and competitions—starting early, mentored by experts, and focused on real outcomes.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* GSoC Track */}
            <div className="group rounded-2xl p-[2px] bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 shadow-[0_1px_0_rgba(0,0,0,0.06)] hover:shadow-xl transition-transform hover:-translate-y-1">
              <div className="p-6 rounded-2xl bg-white/80 backdrop-blur border border-white/60">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-lg">Google Summer of Code (GSoC) Track</p>
                    <p className="text-xs text-amber-600 font-medium">Module from 1st year itself</p>
                  </div>
                  <div className="shrink-0 rounded-xl bg-amber-50 border border-amber-200 p-2">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/GSoC_logo.svg/1200px-GSoC_logo.svg.png"
                      alt="Google Summer of Code"
                      className="h-8 w-8 object-contain"
                      onError={(e) => { e.currentTarget.style.display = 'none' }}
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-700 mt-4">Earn 2 Lakh/month for open‑source contribution. Build a global portfolio with real maintainers.</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <span className="badge bg-amber-100 text-amber-700">Open‑source mentoring</span>
                  <span className="badge bg-amber-100 text-amber-700">Weekly code reviews</span>
                  <span className="badge bg-amber-100 text-amber-700">Project selection support</span>
                </div>
              </div>
            </div>

            {/* Facebook HackerCup Track */}
            <div className="group rounded-2xl p-[2px] bg-gradient-to-r from-sky-500 to-blue-600 shadow-[0_1px_0_rgba(0,0,0,0.06)] hover:shadow-xl transition-transform hover:-translate-y-1">
              <div className="p-6 rounded-2xl bg-white/80 backdrop-blur border border-white/60">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-lg">Facebook HackerCup Track</p>
                    <p className="text-xs text-blue-600 font-medium">Competitive programming excellence</p>
                  </div>
                  <div className="shrink-0 rounded-xl bg-blue-50 border border-blue-200 p-2">
                    <img
                      src="https://miro.medium.com/v2/1*4H9wF_zCFyYlDREHAD7j0g.png"
                      alt="Facebook HackerCup"
                      className="h-8 w-8 object-contain"
                      onError={(e) => { e.currentTarget.style.display = 'none' }}
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-700 mt-4">In 2025, 40 out of top 50 were AlgoUniversity students. Train with champions and past finalists.</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <span className="badge">DSA marathons</span>
                  <span className="badge">Weekly leaderboards</span>
                  <span className="badge">Contest strategy</span>
                </div>
              </div>
            </div>

            {/* ACM ICPC Track */}
            <div className="group rounded-2xl p-[2px] bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 shadow-[0_1px_0_rgba(0,0,0,0.06)] hover:shadow-xl transition-transform hover:-translate-y-1">
              <div className="p-6 rounded-2xl bg-white/80 backdrop-blur border border-white/60">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-lg">ACM ICPC Track</p>
                    <p className="text-xs text-rose-600 font-medium">Olympics for Programming</p>
                  </div>
                  <div className="shrink-0 rounded-xl bg-rose-50 border border-rose-200 p-2">
                    <img
                      src="https://blog.jetbrains.com/wp-content/uploads/2017/05/icpc_logo.png"
                      alt="ACM ICPC"
                      className="h-8 w-8 object-contain"
                      onError={(e) => { e.currentTarget.style.display = 'none' }}
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-700 mt-4">2024: 14 AlgoUniversity students qualified for regionals. Team coaching and problem‑solving bootcamps.</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <span className="badge bg-rose-100 text-rose-700">Team formation</span>
                  <span className="badge bg-rose-100 text-rose-700">Coach reviews</span>
                  <span className="badge bg-rose-100 text-rose-700">Regional prep</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a href="#register" className="btn-primary">Join the Achievers Track</a>
            <span className="text-sm text-gray-600">Start early, get mentored, and aim for global accolades.</span>
          </div>
        </div>
      </section>

      {/* Faculty & Mentors – premium with image background and enhanced cards */}
      <section id="faculty" className="relative">
        {/* Background image layer */}
        <div className="absolute inset-0 -z-10">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/001/838/294/small/abstract-background-white-and-gray-diagonal-stripes-lines-3d-cover-of-business-presentation-banner-web-vector.jpg"
            alt="Section background"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          {/* Subtle dark blue/black gradient tint for differentiation */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-blue-900/20 to-black/40 mix-blend-multiply pointer-events-none" />
        </div>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <h2 className="section-title">Faculty & Mentors</h2>
            <p className="text-gray-600 mt-2 max-w-3xl mx-auto">Learn from leaders who have built at world‑class companies and shipped real products. Practical, outcomes‑driven mentorship.</p>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {faculties.map((f) => (
              <div key={f.name} className="group rounded-2xl p-[1.5px] bg-gradient-to-br from-indigo-500/30 via-blue-400/20 to-sky-400/30 shadow-[0_1px_0_rgba(0,0,0,0.06)] hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="relative h-full rounded-2xl bg-white/90 backdrop-blur border border-white/60 overflow-hidden">
                  {/* top badge */}
                  <div className="absolute top-3 left-3 z-10 px-2 py-0.5 text-[11px] rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">Mentor</div>
                  {/* image */}
                  <div className="relative">
                    <img
                      src={f.img}
                      alt={f.name}
                      className="h-44 w-full object-cover"
                      onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=600&auto=format&fit=crop' }}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent opacity-70" />
                  </div>
                  {/* content */}
                  <div className="p-4">
                    <p className="font-semibold text-lg tracking-tight">{f.name}</p>
                    <p className="mt-2 text-sm text-gray-700 leading-relaxed">{f.desc}</p>
                    {/* logos */}
                    <div className="mt-4 flex items-center gap-3">
                      {f.logos.map((logo, i) => (
                        <div key={i} className="h-6 w-auto">
                          <img
                            src={logo}
                            alt={`logo-${i}`}
                            className="h-6 w-auto object-contain grayscale group-hover:grayscale-0 transition"
                            onError={(e) => { e.currentTarget.style.display = 'none' }}
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* hover shine */}
                  <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500" style={{ background: 'radial-gradient(120px 80px at var(--x,80%) -20%, rgba(59,130,246,0.25), transparent 60%)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Year B.Tech Curriculum – dark */}
      <section id="curriculum" className="relative bg-slate-900 text-slate-100">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black opacity-90" />
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <h2 className="section-title text-white">4-Year B.Tech Curriculum</h2>
            <p className="text-slate-300 mt-2 max-w-3xl mx-auto">A clear, outcome-driven roadmap from solid CS foundations to advanced AI and product engineering—punctuated with real industry experience.</p>
          </div>

          {/* Horizontal roadmap */}
          <div className="mt-10">
            <div className="hidden md:grid grid-cols-4 gap-4">
              {[
                { y: 'Year 1', t: 'Foundations', d: 'Math, Programming, DSA, Systems thinking, Practical labs' },
                { y: 'Year 2', t: 'Systems & Data', d: 'OS, Networks, DB, DevOps' },
                { y: 'Year 3', t: 'AI & Product', d: 'ML/AI, Cloud, Product builds' },
                { y: 'Year 4', t: 'Specialize & Ship', d: 'Electives, Capstone, Thesis' },
              ].map((s, idx) => (
                <div key={s.y} className="group relative rounded-2xl p-[2px] bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-500 shadow-sm">
                  <div className="rounded-2xl p-5 bg-black h-full">
                    <div className="text-xs tracking-wide text-slate-300">{s.y}</div>
                    <div className="font-semibold text-white">{s.t}</div>
                    <div className="text-sm text-slate-300 mt-2">{s.d}</div>
                  </div>
                  {idx < 3 && (
                    <div className="hidden lg:block absolute top-1/2 -right-2 translate-x-1/2 -translate-y-1/2 w-8 h-1 bg-slate-600 rounded"></div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile stacked */}
            <div className="md:hidden space-y-4 mt-2">
              {[
                { y: 'Year 1', t: 'Foundations', d: 'Math, Programming, DSA, Systems thinking, Practical labs' },
                { y: 'Year 2', t: 'Systems & Data', d: 'OS, Networks, DB, DevOps' },
                { y: 'Year 3', t: 'AI & Product', d: 'ML/AI, Cloud, Product builds' },
                { y: 'Year 4', t: 'Specialize & Ship', d: 'Electives, Capstone, Thesis' },
              ].map((s) => (
                <div key={s.y} className="rounded-2xl p-[2px] bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-500 shadow-sm">
                  <div className="rounded-2xl p-5 bg-black">
                    <div className="text-xs tracking-wide text-slate-300">{s.y}</div>
                    <div className="font-semibold text-white">{s.t}</div>
                    <div className="text-sm text-slate-300 mt-2">{s.d}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Industry experience strip */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6 shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-xl font-bold">1.5 years Industrial work experience while pursuing B.Tech.</p>
                  <p className="text-white/90 text-sm">Out of the 4 years of their B.Tech journey, students spend 18 months gaining real industry exposure through paid internships, live projects, and client assignments graduating not as freshers, but as experienced engineers with job-ready portfolios.</p>
                </div>
              </div>
            </div>

            {/* Removed sample term highlights as requested */}

          </div>
        </div>
      </section>

      {/* Outcomes & Testimonials – dark */}
      <section id="testimonials" className="bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="section-title text-white">Outcomes You Can Trust</h2>
          <p className="text-slate-300 mt-2 max-w-3xl">Hear from students who converted internships to offers and built real products during the program.</p>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              {
                quote: 'The product studio and industry mentors helped me ship three real apps. Interview prep felt effortless afterwards.',
                name: 'Aarav, Class of 2024',
                img: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=400&auto=format&fit=crop',
              },
              {
                quote: 'My 18-month experience across ML and Cloud translated into a pre-placement offer. The portfolio made all the difference.',
                name: 'Isha, Class of 2024',
                img: 'https://images.unsplash.com/photo-1544005313-967b5b4b2700?q=80&w=400&auto=format&fit=crop',
              },
              {
                quote: 'The curriculum is practical and tough in the right way. Mock interviews and referrals were a big plus.',
                name: 'Rohan, Class of 2023',
                img: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=400&auto=format&fit=crop',
              },
            ].map((t, i) => (
              <div key={i} className="rounded-2xl bg-white/5 p-6 border border-white/10 shadow-sm">
                <div className="flex items-center gap-3">
                  <img src={t.img} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                  <p className="font-medium text-white">{t.name}</p>
                </div>
                <p className="mt-3 text-sm text-slate-200">“{t.quote}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admissions – redesigned to timeline */}
      <section id="admissions" className="relative bg-gray-50">
        {/* background accents */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-10 -left-10 h-56 w-56 rounded-full bg-blue-200/40 blur-3xl" />
          <div className="absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-indigo-200/40 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <h2 className="section-title">Admission Process</h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">Follow these steps to secure your seat. The process blends clarity with speed—built for motivated learners.</p>
          </div>

          {/* Timeline */}
          <div className="mt-12">
            {/* desktop horizontal timeline */}
            <div className="hidden md:block">
              <div className="relative">
                {/* base line */}
                <div className="timeline-line" />
                {/* animated progress */}
                <div className="timeline-progress" />

                <div className="grid grid-cols-5 gap-6">
                  {[
                    { title: 'Step 1 • Check your Eligibility', desc: 'Students who cleared 12th class Examination by July, 2026 from recognised boards', date: '' },
                    { title: 'Step 2 • Submit your Application', desc: 'Fill up the form by 10th Dec, 2025 and appear for AlgoUniversity Tech Scholar Test', date: '10 Dec, 2025' },
                    { title: 'Step 3 • Take the Test', desc: 'Solve 60 questions in 120 minutes, covering syllabus of PCM & logical reasoning', date: '14 Dec, 2025' },
                    { title: 'Step 4 • Interview Call', desc: 'Get ready with your 1:1 interview with industry leaders and wait for the results.', date: '' },
                    { title: 'Step 5 • Admission Result', desc: 'Admission Result Announced', date: '21 Dec' },
                  ].map((s, i) => (
                    <div key={i} className="relative">
                      {/* node */}
                      <div className="timeline-node animate-pop" style={{ animationDelay: `${i * 120}ms` }} aria-hidden="true">
                        <span className="timeline-node-ping" />
                        <span className="timeline-node-dot" />
                      </div>
                      {/* card */}
                      <div className="timeline-card animate-rise" style={{ animationDelay: `${i * 120 + 60}ms` }}>
                        <p className="timeline-kicker">{s.date || 'Milestone'}</p>
                        <p className="timeline-title">{s.title}</p>
                        <p className="timeline-desc">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* mobile vertical timeline */}
            <div className="md:hidden">
              <div className="relative pl-6">
                <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-blue-300 to-indigo-300" />
                {[
                  { title: 'Step 1 • Check your Eligibility', desc: 'Students who cleared 12th class Examination by July, 2026 from recognised boards', date: '' },
                  { title: 'Step 2 • Submit your Application', desc: 'Fill up the form by 10th Dec, 2025 and appear for AlgoUniversity Tech Scholar Test', date: '10 Dec, 2025' },
                  { title: 'Step 3 • Take the Test (14th Dec, 2025)', desc: 'Solve 60 questions in 120 minutes, covering syllabus of PCM & logical reasoning', date: '14 Dec, 2025' },
                  { title: 'Step 4 • Interview Call', desc: 'Get ready with your 1:1 interview with industry leaders and wait for the results.', date: '' },
                  { title: 'Step 5 • Admission Result (21st Dec)', desc: 'Admission Result Announced', date: '21 Dec' },
                ].map((s, i) => (
                  <div key={i} className="relative mb-6 animate-fadeUp" style={{ animationDelay: `${i * 120}ms` }}>
                    <div className="absolute -left-0.5 top-1 h-3 w-3 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow" />
                    <div className="rounded-xl bg-white border p-4 shadow-sm">
                      <p className="timeline-kicker">{s.date || 'Milestone'}</p>
                      <p className="timeline-title">{s.title}</p>
                      <p className="timeline-desc">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 flex items-center justify-center gap-3">
              <a href="#register" className="btn-primary">Apply Now</a>
              <span className="text-sm text-gray-600">Takes less than 5 minutes. You can edit details later.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Fees & Financials – light with one dark accent card */}
      <section id="fees" className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="section-title">Fees & Financials</h2>
        <div className="mt-6 grid lg:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl border bg-white">
            <h3 className="font-semibold text-lg">Annual Tuition Fee</h3>
            <p className="text-3xl font-extrabold mt-2">₹2,50,000<span className="text-base font-medium text-gray-600">/year</span></p>
            <p className="text-sm text-gray-600 mt-2">Transparent fee structure. Hostel and other fees (if applicable) are separate.</p>
          </div>
          <div className="p-6 rounded-2xl border bg-slate-900 text-white">
            <h3 className="font-semibold text-lg">Value Proposition</h3>
            <p className="text-sm text-slate-200 mt-2">
              An investment in an industry-ready future. The curriculum, mentorship, and 18-month industrial experience are engineered to target ₹25 LPA+ roles.
            </p>
          </div>
          <div className="p-6 rounded-2xl border bg-white">
            <h3 className="font-semibold text-lg">Scholarships</h3>
            <p className="text-sm text-gray-700 mt-2">
              Merit-based scholarships are tied to your All India Rank in the AI-Tech Scholar Test. Higher ranks unlock higher tuition waivers.
            </p>
          </div>
        </div>
      </section>

      {/* Register Section – dark already */}
      <section id="register" className="bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div className="text-white">
            <h2 className="text-2xl md:text-3xl font-bold">Register for the Entrance Test</h2>
            <p className="text-slate-300 mt-1 text-sm">Register now and get access to mock tests and preparation resources.</p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-2xl font-extrabold">18m</p>
                <p className="text-xs text-slate-300">Industry Experience</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-2xl font-extrabold">25 LPA</p>
                <p className="text-xs text-slate-300">Targeted Outcomes</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border p-6">
            <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
              <input className="input" name="full_name" placeholder="Student Full Name" value={form.full_name} onChange={handleChange} required />
              <input className="input" name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
              <input className="input" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
              <input className="input" name="parent_name" placeholder="Parent/Guardian Name" value={form.parent_name} onChange={handleChange} />
              <input className="input" name="city" placeholder="City" value={form.city} onChange={handleChange} />
              <input className="input" name="state" placeholder="State" value={form.state} onChange={handleChange} />

              <select className="input" name="grade_level" value={form.grade_level} onChange={handleChange}>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
                <option value="Gap Year">Gap Year</option>
                <option value="Other">Other</option>
              </select>

              <select className="input" name="stream" value={form.stream} onChange={handleChange}>
                <option>PCM</option>
                <option>PCMB</option>
                <option>Science</option>
                <option>Commerce</option>
                <option>Arts</option>
                <option>Other</option>
              </select>

              <input className="input md:col-span-2" name="program_interest" placeholder="Preferred Branch/Specialization (optional)" value={form.program_interest} onChange={handleChange} />
              <input className="input" name="preferred_intake" placeholder="Preferred Intake (e.g., 2025-26)" value={form.preferred_intake} onChange={handleChange} />
              <input className="input" name="how_heard" placeholder="How did you hear about us?" value={form.how_heard} onChange={handleChange} />

              <div id="mocks" className="md:col-span-2 text-sm text-blue-700">
                Get free mock tests and prep material after registration. We’ll email the access link.
              </div>

              <label className="flex items-center gap-2 text-sm md:col-span-2">
                <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} required />
                I agree to be contacted and accept the privacy policy.
              </label>

              <div className="md:col-span-2 flex items-center gap-3">
                <button disabled={loading} className="btn-primary">
                  {loading ? 'Submitting...' : 'Register Now'}
                </button>
                {submitted && <span className="text-green-500">Thank you! Your registration ID: {submitted}</span>}
                {error && <span className="text-red-400">{error}</span>}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact & Footer */}
      <section className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
          <div>
            <p className="font-semibold">Contact</p>
            <p className="text-sm text-gray-600 mt-2">Email: admissions@ai-cs.school</p>
            <p className="text-sm text-gray-600">Phone: +91 98765 43210</p>
            <p className="text-sm text-gray-600">Mon–Sat, 10am–6pm IST</p>
          </div>
          <div>
            <p className="font-semibold">Visit</p>
            <p className="text-sm text-gray-600 mt-2">123 Innovation Park, Bengaluru, India</p>
            <p className="text-sm text-gray-600">Campus tours by appointment</p>
          </div>
          <div>
            <p className="font-semibold">Policies</p>
            <ul className="text-sm text-gray-600 mt-2 space-y-1">
              <li><a className="hover:text-blue-700" href="#">Privacy Policy</a></li>
              <li><a className="hover:text-blue-700" href="#">Refund Policy</a></li>
              <li><a className="hover:text-blue-700" href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </section>
      <footer className="py-8 text-center text-sm text-gray-500">© {new Date().getFullYear()} School of AI & Computer Science</footer>

      {/* Styles */}
      <style>{`
        .input { @apply w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500; }
        .btn-primary { @apply bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition disabled:opacity-60; }
        .btn-hero-primary { @apply bg-white text-blue-900 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50; }
        .btn-hero-secondary { @apply bg-transparent border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10; }
        .badge { @apply inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-700; }
        /* Section headings: bigger, bolder, with accent bar */
        .section-title { font-weight: 800; font-size: clamp(1.875rem, 2.8vw + 1rem, 3rem); letter-spacing: -0.02em; line-height: 1.1; position: relative; display: inline-block; }
        .section-title::after { content: ''; display: block; height: 4px; width: 72px; background: linear-gradient(90deg, #2563eb, #0ea5e9); border-radius: 9999px; margin: 10px auto 0; }
        .logo-marquee { display: flex; width: max-content; animation: marquee 25s linear infinite; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

        /* Admissions timeline styles */
        :root { --tl-blue:#2563eb; --tl-indigo:#4f46e5; --tl-sky:#0ea5e9; }
        .timeline-line { position: absolute; top: 44px; left: 6%; right: 6%; height: 4px; background: linear-gradient(90deg, rgba(37,99,235,0.18), rgba(79,70,229,0.18)); border-radius: 9999px; }
        .timeline-progress { position: absolute; top: 44px; left: 6%; height: 4px; width: 0%; background: linear-gradient(90deg, var(--tl-sky), var(--tl-blue), var(--tl-indigo)); border-radius: 9999px; box-shadow: 0 0 0 2px rgba(14,165,233,0.05), 0 6px 18px rgba(37,99,235,0.25); animation: progressGrow 3s cubic-bezier(.22,.61,.36,1) forwards; }
        .timeline-progress::after { content:''; position:absolute; right:-8px; top:-4px; height:12px; width:12px; border-radius:9999px; background: radial-gradient(circle at center, #fff, rgba(255,255,255,0)); filter: blur(1px); animation: glow 1.8s ease-in-out infinite; }
        @keyframes progressGrow { to { width: 88%; } }
        @keyframes glow { 0%,100%{ opacity:.7; } 50%{ opacity:1; } }
        .timeline-node { position: relative; height: 0; display: flex; justify-content: center; }
        .timeline-node-dot { position: absolute; top: 34px; height: 16px; width: 16px; border-radius: 9999px; background: white; border: 4px solid var(--tl-blue); box-shadow: 0 6px 18px rgba(37,99,235,0.35); }
        .timeline-node-ping { position: absolute; top: 30px; height: 24px; width: 24px; border-radius: 9999px; background: radial-gradient(circle at center, rgba(99,102,241,0.35), transparent 60%); animation: ping 2.2s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
        @keyframes ping { 0% { transform: scale(0.9); opacity: 0.9; } 70% { transform: scale(1.25); opacity: 0.35; } 100% { transform: scale(1.5); opacity: 0; } }
        .timeline-card { margin-top: 72px; background: white; border: 1px solid rgba(0,0,0,0.08); border-radius: 14px; padding: 16px; box-shadow: 0 8px 24px rgba(2,6,23,0.06); transition: transform .3s ease, box-shadow .3s ease; display:flex; flex-direction:column; justify-content:flex-start; min-height: 200px; }
        @media (min-width: 1024px){ .timeline-card{ min-height: 220px; } }
        .timeline-card:hover { transform: translateY(-4px); box-shadow: 0 16px 36px rgba(2,6,23,0.12); }
        .timeline-kicker{ font-size:11px; letter-spacing:.08em; text-transform:uppercase; color:#2563eb; font-weight:700; }
        .timeline-title{ font-weight:700; color:#0f172a; margin-top:4px; }
        .timeline-desc{ font-size:14px; color:#475569; margin-top:8px; }
        .animate-pop { animation: pop .5s ease-out both; }
        @keyframes pop { 0% { transform: scale(.96); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        .animate-rise { animation: rise .6s ease-out both; }
        @keyframes rise { 0% { opacity:0; transform: translateY(8px); } 100% { opacity:1; transform: translateY(0); } }
        .animate-fadeUp { animation: fadeUp .6s ease-out both; }
        @keyframes fadeUp { 0% { opacity: 0; transform: translateY(8px); } 100% { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  )
}

export default App
