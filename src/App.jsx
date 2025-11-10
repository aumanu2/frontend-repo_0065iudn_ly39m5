import { useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10" />
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
              4-Year B.Tech Program
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Build Your Future in Technology
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              A practice-first engineering program with industry mentors, modern labs, and guaranteed internship pathways.
            </p>
            <ul className="mt-6 space-y-2 text-gray-700">
              <li>• Project-based curriculum from day one</li>
              <li>• Small cohort, individual mentorship</li>
              <li>• Product engineering + core CS fundamentals</li>
              <li>• Career support with portfolio and placement prep</li>
            </ul>
            <a href="#apply" className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition">Apply Now</a>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
            <h3 className="text-xl font-bold mb-4">Why Choose Our B.Tech?</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-lg bg-blue-50">Industry mentors</div>
              <div className="p-4 rounded-lg bg-blue-50">Modern labs</div>
              <div className="p-4 rounded-lg bg-blue-50">Internships</div>
              <div className="p-4 rounded-lg bg-blue-50">Global exposure</div>
            </div>
          </div>
        </div>
      </header>

      {/* Program Highlights */}
      <section className="max-w-6xl mx-auto px-6 py-12" id="highlights">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">What You'll Experience</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {[{
            title: 'Hands-on Projects',
            desc: 'Build real products each semester with Git, cloud, and modern stacks.'
          },{
            title: 'Strong Fundamentals',
            desc: 'Math, DSA, OS, Networks taught with practical applications.'
          },{
            title: 'Career Readiness',
            desc: 'Internships, portfolio, mock interviews, and placement support.'
          }].map((c) => (
            <div key={c.title} className="bg-white shadow-sm rounded-xl p-5 border">
              <h3 className="font-semibold text-gray-900">{c.title}</h3>
              <p className="text-gray-600 mt-2 text-sm">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Simple Curriculum */}
      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Curriculum at a Glance</h2>
          <div className="mt-6 grid md:grid-cols-4 gap-4 text-sm">
            {['Year 1: Foundations', 'Year 2: Systems & Data', 'Year 3: Product & Cloud', 'Year 4: Specialization + Capstone'].map((y) => (
              <div key={y} className="bg-white p-4 rounded-xl border">
                <p className="font-medium">{y}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-lg border p-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Apply for B.Tech Program</h2>
          <p className="text-gray-600 mt-1 text-sm">Takes 2 minutes. Our team will contact you shortly.</p>
          <form onSubmit={submit} className="mt-6 grid md:grid-cols-3 gap-4">
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

            <input className="input" name="program_interest" placeholder="Preferred Branch/Specialization (optional)" value={form.program_interest} onChange={handleChange} />
            <input className="input" name="preferred_intake" placeholder="Preferred Intake (e.g., 2025-26)" value={form.preferred_intake} onChange={handleChange} />
            <input className="input" name="how_heard" placeholder="How did you hear about us?" value={form.how_heard} onChange={handleChange} />
            
            <label className="flex items-center gap-2 text-sm md:col-span-3">
              <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} required />
              I agree to be contacted and accept the privacy policy.
            </label>

            <div className="md:col-span-3 flex items-center gap-3">
              <button disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg disabled:opacity-60">
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
              {submitted && <span className="text-green-700">Thank you! Your application ID: {submitted}</span>}
              {error && <span className="text-red-600">{error}</span>}
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-sm text-gray-500">© {new Date().getFullYear()} College of Technology • Built with care</footer>

      <style>{`
        .input { @apply w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500; }
      `}</style>
    </div>
  )
}

export default App
