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
    <div className="min-h-screen bg-white text-gray-900">
      {/* Top Ticker / Social Proof */}
      <div className="w-full bg-green-600 text-white text-center text-sm py-2">
        Cohort graduates averaging ₹25,00,000+ CTC
      </div>

      {/* Hero */}
      <header className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-6 pt-14 pb-8 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mb-4">
              4-Year B.Tech in AI & Computer Science
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Launch Your 25 LPA Career: The 4-Year B.Tech in AI/CS with 1.5 Years of Industrial Experience.
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Curriculum designed by IIIT-Hyderabad Alumni. Your proven path from zero to industry-ready.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#register" className="btn-primary">
                Register for the Entrance Test & Get Mocks!
              </a>
              <a href="#program" className="btn-secondary">Explore the Program</a>
            </div>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              {[
                ['18-Month Experience', 'Internships + Co-ops'],
                ['Mentor Network', 'Industry Leaders'],
                ['Modern Labs', 'AI • Cloud • Systems'],
                ['Career Outcomes', 'Portfolio + Placements'],
              ].map(([h, s]) => (
                <div key={h} className="p-4 rounded-xl bg-white border shadow-sm">
                  <p className="font-semibold">{h}</p>
                  <p className="text-gray-600 text-xs mt-1">{s}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
              <h3 className="text-xl font-bold">Why this B.Tech?</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-start gap-3"><span className="badge">USP</span><span>1.5 years of industry experience embedded into the curriculum</span></li>
                <li className="flex items-start gap-3"><span className="badge">Mentors</span><span>Guidance from senior engineers and researchers</span></li>
                <li className="flex items-start gap-3"><span className="badge">Projects</span><span>Ship real products each term with reviews and demos</span></li>
                <li className="flex items-start gap-3"><span className="badge">Careers</span><span>Dedicated placement prep, mock interviews, and referrals</span></li>
              </ul>
              <a href="#register" className="mt-6 inline-block btn-primary w-full text-center">Register Now</a>
            </div>
          </div>
        </div>
      </header>

      {/* The Program: AI & CS Excellence */}
      <section id="program" className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="section-title">AI & CS Excellence</h2>
        <p className="text-gray-600 mt-2 max-w-3xl">A future-proof curriculum that blends rigorous CS foundations with modern AI, systems, and product engineering.</p>

        {/* Timeline */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold">1.5 Years of Industry Experience</h3>
          <p className="text-gray-600 mt-2 max-w-4xl">
            Internships and co-op style experiences begin in Year 2. Students rotate through staged experiences—Assistant Developer (6 months),
            Applied AI Engineer (6 months), and Product/Cloud Specialist (6 months)—totaling 18 months of on-the-job learning.
          </p>

          <div className="mt-6 grid md:grid-cols-4 gap-4">
            {[{
              y: 'Year 1',
              t: 'Foundations',
              d: 'Math, Programming, DSA, Systems thinking, Practical labs'
            },{
              y: 'Year 2',
              t: 'Systems & Data',
              d: 'OS, Networks, DB, DevOps; Internship Stage 1 (6 months)'
            },{
              y: 'Year 3',
              t: 'AI & Product',
              d: 'ML/AI, Cloud, Product builds; Internship Stage 2 (6 months)'
            },{
              y: 'Year 4',
              t: 'Specialize & Ship',
              d: 'Electives, Capstone; Internship Stage 3 (6 months)'
            }].map((s, idx) => (
              <div key={s.y} className={`rounded-xl p-5 border ${idx>0 ? 'bg-blue-50 border-blue-200' : 'bg-white'}`}>
                <p className="text-xs tracking-wide text-gray-500">{s.y}</p>
                <p className="font-semibold">{s.t}</p>
                <p className="text-sm text-gray-600 mt-2">{s.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Faculty Advantage */}
        <div className="mt-14">
          <h3 className="text-xl font-semibold">Faculty Advantage</h3>
          <p className="text-gray-600 mt-2">Learn from mentors with strong research and industry pedigree.</p>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[{
              name: 'Dr. A. Sharma',
              role: 'AI Researcher • IIIT-H Alumnus',
              bio: '12+ years in deep learning and NLP; consulting for Fortune 500.'
            },{
              name: 'Prof. N. Reddy',
              role: 'Systems Engineer • IIIT-H Alumnus',
              bio: '15+ years in distributed systems and cloud architecture.'
            },{
              name: 'Ms. K. Iyer',
              role: 'Product Engineer • Industry Mentor',
              bio: 'Built consumer products at scale; mentors student product labs.'
            },{
              name: 'Dr. V. Gupta',
              role: 'Data Scientist • Research Consultant',
              bio: 'Applied ML in healthcare and fintech; 10+ years experience.'
            }].map((f) => (
              <div key={f.name} className="p-5 rounded-xl border bg-white shadow-sm">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500" />
                <p className="mt-3 font-semibold">{f.name}</p>
                <p className="text-xs text-blue-700 font-medium">{f.role}</p>
                <p className="text-sm text-gray-600 mt-2">{f.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Curriculum Focus */}
        <div className="mt-14 grid lg:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl border bg-white">
            <h3 className="font-semibold text-lg">Future-Proof Learning</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-700 list-disc list-inside">
              <li>Modern stack: AI/ML, Cloud, Distributed Systems, Security</li>
              <li>Practical labs and product studios every term</li>
              <li>Project-based learning with demos and reviews</li>
              <li>Communication, leadership, and engineering practices</li>
            </ul>
          </div>
          <div className="p-6 rounded-2xl border bg-white">
            <h3 className="font-semibold text-lg">Competitive Edge</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-700 list-disc list-inside">
              <li>Dedicated coaching for ACM-ICPC, Google Summer of Code (GSoC)</li>
              <li>Hackathons, research sprints, and open-source contributions</li>
              <li>Interview prep, DSA marathons, and career bootcamps</li>
              <li>Portfolio-first placement strategy with referrals</li>
            </ul>
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
          <div className="p-6 rounded-2xl border bg-white">
            <h3 className="font-semibold text-lg">Value Proposition</h3>
            <p className="text-sm text-gray-700 mt-2">
              An investment in a guaranteed industry-ready future. The curriculum, mentorship, and 18-month industrial experience are engineered to target ₹25 LPA+ roles.
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

      {/* Register Section (CTA + Form) */}
      <section id="register" className="bg-blue-50/50">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="bg-white rounded-2xl shadow-lg border p-6">
            <h2 className="text-2xl md:text-3xl font-bold">Register for the Entrance Test</h2>
            <p className="text-gray-600 mt-1 text-sm">Register now and get access to mock tests and preparation resources.</p>
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
              
              <div id="mocks" className="md:col-span-3 text-sm text-blue-700">
                Get free mock tests and prep material after registration. We’ll email the access link.
              </div>
              
              <label className="flex items-center gap-2 text-sm md:col-span-3">
                <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} required />
                I agree to be contacted and accept the privacy policy.
              </label>

              <div className="md:col-span-3 flex items-center gap-3">
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

      {/* Footer */}
      <footer className="py-10 text-center text-sm text-gray-500">© {new Date().getFullYear()} School of AI & Computer Science</footer>

      {/* Styles */}
      <style>{`
        .input { @apply w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500; }
        .btn-primary { @apply bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition disabled:opacity-60; }
        .btn-secondary { @apply bg-white border text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold; }
        .badge { @apply inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-700; }
        .section-title { @apply text-2xl md:text-3xl font-bold; }
      `}</style>
    </div>
  )
}

export default App
