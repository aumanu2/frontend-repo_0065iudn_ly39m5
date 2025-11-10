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
        <span className="font-medium text-gray-900">{q}</span>
        <span className={`transform transition ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      {open && <p className="pb-4 text-sm text-gray-600">{a}</p>}
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
            <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=200&auto=format&fit=crop" alt="AI & CS" className="h-8 w-8 rounded" />
            <span className="font-bold">School of AI & CS</span>
          </a>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#program" className="hover:text-blue-700">Program</a>
            <a href="#admissions" className="hover:text-blue-700">Admissions</a>
            <a href="#fees" className="hover:text-blue-700">Fees</a>
            <a href="#testimonials" className="hover:text-blue-700">Outcomes</a>
          </div>
          <a href="#register" className="btn-primary">Register</a>
        </div>
      </nav>

      {/* Hero with robust image loading and graceful fallback */}
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
              Launch Your 25 LPA Career with 1.5 Years of Real Industry Experience
            </h1>
            <p className="mt-4 text-lg text-blue-100 max-w-2xl">
              A rigorous, practice-led program designed by IIIT-H alumni. Graduate with a portfolio, references, and confidence.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#register" className="btn-hero-primary">Register & Get Mock Tests</a>
              <a href="#program" className="btn-hero-secondary">Explore the Program</a>
            </div>
            {/* Highlight cards: solid white for strong visibility */}
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
          <div className="relative">
            <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl p-6 border">
              <h3 className="text-xl font-bold">Trusted, Structured, Outcome-Driven</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-start gap-3"><span className="badge">Accredited</span><span>University-affiliated degree program with transparent policies</span></li>
                <li className="flex items-start gap-3"><span className="badge">Experience</span><span>1.5 years of embedded industry exposure across 3 stages</span></li>
                <li className="flex items-start gap-3"><span className="badge">Placement</span><span>Career services, mock interviews, and recruiter connections</span></li>
              </ul>
              <a href="#register" className="mt-6 inline-block btn-primary w-full text-center">Apply Now</a>
              <div className="mt-4 flex items-center gap-3 text-xs text-gray-500">
                <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=200&auto=format&fit=crop" alt="Shield" className="h-6 w-6 rounded"/>
                <span>Privacy-first • No spam • Opt-out anytime</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Logos / Social proof */}
      <section className="bg-gray-50 border-y">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <p className="text-center text-sm text-gray-600">Our students build portfolios aligned with modern tech stacks used by leading companies</p>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6 items-center opacity-90">
            {['Amazon','Microsoft','Google','NVIDIA','Adobe','Swiggy'].map((n)=> (
              <div key={n} className="h-10 bg-white rounded border flex items-center justify-center text-gray-500 text-xs font-semibold">
                {n}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Section – redesigned with improved alignment and glassmorphism */}
      <section id="program" className="relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-blue-50/60 to-white" />
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="mb-10 text-center">
            <h2 className="section-title">AI & CS Excellence</h2>
            <p className="text-gray-600 mt-2 max-w-3xl mx-auto">A future-proof curriculum that blends rigorous CS foundations with modern AI, systems, and product engineering.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Left: Feature grid using glass cards */}
            <div className="grid sm:grid-cols-2 gap-5">
              {[
                {
                  title: 'Future-Proof Learning',
                  points: ['AI/ML, Cloud, Distributed Systems, Security','Product studios every term','Project-based learning with demos','Leadership and communication'],
                },
                {
                  title: 'Competitive Edge',
                  points: ['ACM-ICPC, GSoC, open-source','Hackathons and research sprints','Interview prep & DSA marathons','Portfolio-first placement strategy'],
                },
                {
                  title: 'Modern Lab Tracks',
                  points: ['Applied AI Lab','Cloud & DevOps Lab','Systems & Security Lab','Product Engineering Lab'],
                },
                {
                  title: 'Mentor Network',
                  points: ['Industry leaders every term','Office hours & reviews','Career guidance & referrals','Alumni support'],
                },
              ].map((card) => (
                <div key={card.title} className="p-6 rounded-2xl border border-white/30 bg-white/60 backdrop-blur shadow-sm">
                  <h3 className="font-semibold text-lg">{card.title}</h3>
                  <ul className="mt-3 space-y-2 text-sm text-gray-700 list-disc list-inside">
                    {card.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Right: Visual + timeline */}
            <div>
              <div className="relative rounded-2xl overflow-hidden shadow border bg-white/50 backdrop-blur">
                <img
                  src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-4.1.0&ixid=M3wyMDk4MTh8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGNvbGxhYm9yYXRpbmd8ZW58MHwwfHx8fDE%3D&w=1400&q=80&auto=format&fit=crop"
                  alt="Students collaborating"
                  className="w-full h-80 object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1529101091764-c3526daf38fe?ixlib=rb-4.1.0&ixid=M3wyMDk4MTh8MHwxfHNlYXJjaHwzfHx0ZWFtd29ya3xlbnwwfDB8fHwx&w=1400&q=80&auto=format&fit=crop'
                    e.currentTarget.onerror = null
                  }}
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white text-sm">Hands-on product studios, every term.</div>
              </div>

              {/* Timeline */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold">1.5 Years of Industry Experience</h3>
                <p className="text-gray-600 mt-2 max-w-4xl">
                  Internships and co-op style experiences begin in Year 2. Students rotate through staged experiences—Assistant Developer (6 months), Applied AI Engineer (6 months), and Product/Cloud Specialist (6 months)—totaling 18 months of on-the-job learning.
                </p>
                <div className="mt-6 grid md:grid-cols-4 gap-4">
                  {[
                    { y: 'Year 1', t: 'Foundations', d: 'Math, Programming, DSA, Systems thinking, Practical labs' },
                    { y: 'Year 2', t: 'Systems & Data', d: 'OS, Networks, DB, DevOps; Internship Stage 1 (6 months)' },
                    { y: 'Year 3', t: 'AI & Product', d: 'ML/AI, Cloud, Product builds; Internship Stage 2 (6 months)' },
                    { y: 'Year 4', t: 'Specialize & Ship', d: 'Electives, Capstone; Internship Stage 3 (6 months)' },
                  ].map((s, idx) => (
                    <div key={s.y} className={`rounded-xl p-5 border ${idx>0 ? 'bg-white/60 border-white/30 backdrop-blur' : 'bg-white/90'} shadow-sm`}>
                      <p className="text-xs tracking-wide text-gray-500">{s.y}</p>
                      <p className="font-semibold">{s.t}</p>
                      <p className="text-sm text-gray-600 mt-2">{s.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Faculty */}
          <div className="mt-16">
            <h3 className="text-xl font-semibold">Faculty & Mentors</h3>
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { name: 'Dr. A. Sharma', role: 'AI Researcher • IIIT-H Alumnus', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop' },
                { name: 'Prof. N. Reddy', role: 'Systems Engineer • IIIT-H Alumnus', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop' },
                { name: 'Ms. K. Iyer', role: 'Product Engineer • Industry Mentor', img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=400&auto=format&fit=crop' },
                { name: 'Dr. V. Gupta', role: 'Data Scientist • Research Consultant', img: 'https://images.unsplash.com/photo-1554384645-13eab165c24b?q=80&w=400&auto=format&fit=crop' },
              ].map((f) => (
                <div key={f.name} className="p-5 rounded-xl border bg-white shadow-sm">
                  <img src={f.img} alt={f.name} className="h-14 w-14 rounded-full object-cover" />
                  <p className="mt-3 font-semibold">{f.name}</p>
                  <p className="text-xs text-blue-700 font-medium">{f.role}</p>
                  <p className="text-sm text-gray-600 mt-2">Mentors with strong research and industry pedigree.</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes & Testimonials */}
      <section id="testimonials" className="bg-blue-50/60">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="section-title">Outcomes You Can Trust</h2>
          <p className="text-gray-600 mt-2 max-w-3xl">Hear from students who converted internships to offers and built real products during the program.</p>
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
              <div key={i} className="rounded-2xl bg-white p-6 border shadow-sm">
                <div className="flex items-center gap-3">
                  <img src={t.img} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                  <p className="font-medium">{t.name}</p>
                </div>
                <p className="mt-3 text-sm text-gray-700">“{t.quote}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admissions */}
      <section id="admissions" className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="section-title">Admissions: The Entrance Test</h2>
          <p className="text-gray-600 mt-2">Test Name: <span className="font-semibold">AI-Tech Scholar Test</span></p>

          <div className="mt-8 grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-white rounded-2xl border">
              <h3 className="font-semibold text-lg">The Process</h3>
              <ol className="mt-3 space-y-3 text-sm text-gray-700 list-decimal list-inside">
                <li>Register online</li>
                <li>Take Mock Tests (optional but encouraged). <a href="#mocks" className="text-blue-600 underline">Get mock resources</a></li>
                <li>Appear for the main exam</li>
                <li>All India Rank & Results — ranks inform final admission and scholarships</li>
              </ol>
              <a href="#register" className="mt-6 inline-block btn-primary">Register for the Entrance Test Now!</a>
            </div>
            <div className="p-6 bg-white rounded-2xl border">
              <h3 className="font-semibold text-lg">Key Dates</h3>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500">
                      <th className="py-2 pr-4">Event</th>
                      <th className="py-2 pr-4">Date</th>
                      <th className="py-2">Deadline</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-800">
                    {[
                      ['Registration Opens', '1 Dec 2024', '31 Jan 2025'],
                      ['Mock Test 1', '15 Jan 2025', '—'],
                      ['Final Entrance Test', '10 Feb 2025', '5 Feb 2025'],
                      ['Result Declaration', '20 Feb 2025', '—'],
                      ['Counselling Begins', '25 Feb 2025', '—'],
                    ].map(([e, d, dl]) => (
                      <tr key={e} className="border-t">
                        <td className="py-2 pr-4">{e}</td>
                        <td className="py-2 pr-4">{d}</td>
                        <td className="py-2">{dl}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="mt-12 max-w-3xl">
            <h3 className="font-semibold text-lg">Frequently Asked Questions</h3>
            <div className="mt-2 rounded-xl bg-white border">
              <FAQItem q="Is the degree recognized?" a="Yes. It's a university-affiliated B.Tech program with all standard regulations and policies." />
              <FAQItem q="Do you offer scholarships?" a="Yes. Merit-based scholarships are tied to your All India Rank in the entrance test." />
              <FAQItem q="How do internships work?" a="Industry experience is embedded across Years 2–4 in three 6‑month stages under faculty and mentor supervision." />
              <FAQItem q="Will I get placement support?" a="Yes. We offer mock interviews, resume reviews, referrals, and a portfolio-first placement strategy." />
            </div>
          </div>
        </div>
      </section>

      {/* Fees & Financials */}
      <section id="fees" className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="section-title">Fees & Financials</h2>
        <div className="mt-6 grid lg:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl border bg-white">
            <h3 className="font-semibold text-lg">Annual Tuition Fee</h3>
            <p className="text-3xl font-extrabold mt-2">₹2,50,000<span className="text-base font-medium text-gray-600">/year</span></p>
            <p className="text-sm text-gray-600 mt-2">Transparent fee structure. Hostel and other fees (if applicable) are separate.</p>
          </div>
          <div className="p-6 rounded-2xl border bg-gradient-to-br from-emerald-50 to-teal-50">
            <h3 className="font-semibold text-lg">Value Proposition</h3>
            <p className="text-sm text-gray-700 mt-2">
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

      {/* Register Section */}
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
                {submitted && <span className="text-green-700">Thank you! Your registration ID: {submitted}</span>}
                {error && <span className="text-red-600">{error}</span>}
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
        .section-title { @apply text-2xl md:text-3xl font-bold; }
      `}</style>
    </div>
  )
}

export default App
