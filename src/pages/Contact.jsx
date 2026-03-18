import { useState } from 'react'
import toast from 'react-hot-toast'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.')
      return
    }
    setSending(true)
    await new Promise(r => setTimeout(r, 1500))
    setSending(false)
    toast.success('Message sent! We\'ll get back to you soon.')
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="contact-page" style={{ paddingTop: 'var(--navbar-height)' }}>
      <div className="container">
        <div className="contact-hero">
          <div className="badge badge-purple" style={{ marginBottom: '14px' }}>Contact</div>
          <h1>Get in <span className="gradient-text">touch</span></h1>
          <p>Have a question, suggestion, or found a bug? We'd love to hear from you.</p>
        </div>

        <div className="contact-grid">
          {/* Info */}
          <div className="contact-info">
            <h3>Contact Info</h3>
            <div className="contact-items">
              {[
                { icon: '📧', label: 'Email', value: 'hello@snaptools.io' },
                { icon: '🐦', label: 'Twitter', value: '@snaptools_io' },
                { icon: '⏱️', label: 'Response Time', value: 'Usually within 24h' },
              ].map(({ icon, label, value }) => (
                <div key={label} className="contact-item">
                  <span className="contact-item-icon">{icon}</span>
                  <div>
                    <div className="contact-item-label">{label}</div>
                    <div className="contact-item-value">{value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-faq">
              <h4>Common Questions</h4>
              {[
                { q: 'Are my files safe?', a: 'Yes! All processing is client-side. Files never leave your device.' },
                { q: 'Is SnapTools free?', a: 'Always. The core tools are and will remain free forever.' },
                { q: 'Can I use it on mobile?', a: 'Absolutely — SnapTools is fully mobile-responsive.' },
              ].map(({ q, a }) => (
                <div key={q} className="faq-item">
                  <div className="faq-q">❓ {q}</div>
                  <div className="faq-a">{a}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form className="contact-form card" onSubmit={handleSubmit} id="contact-form">
            <h3>Send a message</h3>
            <div className="form-row">
              <div>
                <label className="label">Name *</label>
                <input
                  className="input" type="text" name="name"
                  placeholder="Your name" value={form.name} onChange={handleChange}
                  id="contact-name"
                />
              </div>
              <div>
                <label className="label">Email *</label>
                <input
                  className="input" type="email" name="email"
                  placeholder="your@email.com" value={form.email} onChange={handleChange}
                  id="contact-email"
                />
              </div>
            </div>
            <div>
              <label className="label">Subject</label>
              <input
                className="input" type="text" name="subject"
                placeholder="What's this about?" value={form.subject} onChange={handleChange}
                id="contact-subject"
              />
            </div>
            <div>
              <label className="label">Message *</label>
              <textarea
                className="input textarea" name="message"
                placeholder="Your message..." value={form.message} onChange={handleChange}
                id="contact-message"
              />
            </div>
            <button type="submit" className="btn btn-primary w-full" id="contact-submit" disabled={sending}
              style={{ justifyContent: 'center' }}>
              {sending ? (
                <>
                  <div className="spinner spinner-sm" style={{ borderLeftColor: 'white', borderTopColor: 'transparent' }} />
                  Sending...
                </>
              ) : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
