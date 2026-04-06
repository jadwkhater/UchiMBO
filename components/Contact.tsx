'use client'

import { useState } from 'react'

export default function Contact() {
  const [form, setForm]       = useState({ name: '', email: '', message: '' })
  const [sent, setSent]       = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    setSent(true)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1.5px solid rgba(28,28,28,0.18)',
    padding: '12px 0',
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '14px',
    fontWeight: 300,
    color: 'var(--ink)',
    outline: 'none',
    transition: 'border-color 0.2s',
    marginBottom: '24px',
    letterSpacing: '0.02em',
  }

  return (
    <section
      id="contact"
      style={{ background: 'var(--page)', padding: '120px 0 80px', borderTop: '1px solid var(--border)' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }} className="contact-grid">

          {/* Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div style={{ width: '32px', height: '1px', background: 'var(--crimson)' }} />
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--crimson)' }}>Contact</span>
            </div>
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--ink)',
              marginBottom: '24px',
            }}>
              Get in<br /><em style={{ color: 'var(--crimson)' }}>touch.</em>
            </h2>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', fontWeight: 300, lineHeight: 1.8, color: 'var(--muted)', marginBottom: '48px' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            {[
              { label: 'Email',     value: 'uchicagomusicbusiness@gmail.com'  },
              { label: 'Instagram', value: '@uchicagomusicbusiness'           },
              { label: 'Location',  value: 'University of Chicago, Hyde Park' },
            ].map(({ label, value }) => (
              <div key={label} style={{ marginBottom: '22px' }}>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '8px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: '4px' }}>{label}</div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 300, color: 'var(--muted)' }}>{value}</div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div>
            {!sent ? (
              <form onSubmit={handleSubmit}>
                <input name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} required style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderBottomColor = 'var(--crimson)')}
                  onBlur={e  => (e.currentTarget.style.borderBottomColor = 'rgba(28,28,28,0.18)')} />
                <input name="email" type="email" placeholder="Your email" value={form.email} onChange={handleChange} required style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderBottomColor = 'var(--crimson)')}
                  onBlur={e  => (e.currentTarget.style.borderBottomColor = 'rgba(28,28,28,0.18)')} />
                <textarea name="message" placeholder="Your message" value={form.message} onChange={handleChange} required rows={5}
                  style={{ ...inputStyle, resize: 'vertical', marginBottom: '28px' }}
                  onFocus={e => (e.currentTarget.style.borderBottomColor = 'var(--crimson)')}
                  onBlur={e  => (e.currentTarget.style.borderBottomColor = 'rgba(28,28,28,0.18)')} />
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: 'var(--crimson)',
                    color: 'var(--page)',
                    border: 'none',
                    padding: '14px 36px',
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '9px',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'background 0.2s, transform 0.15s',
                    borderRadius: '2px',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--scarlet)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--crimson)'; e.currentTarget.style.transform = 'none' }}
                >
                  {loading ? 'Sending…' : 'Send Message →'}
                </button>
              </form>
            ) : (
              <div style={{ padding: '40px', background: 'rgba(0,109,111,0.06)', border: '1px solid rgba(0,109,111,0.2)', textAlign: 'center' }}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ marginBottom: '14px' }}>
                  <path d="M5 14l6 6L23 8" stroke="#006D6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', color: 'var(--ink)', marginBottom: '6px' }}>Message sent.</div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--muted)' }}>We&apos;ll be in touch soon.</div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: '80px', paddingTop: '28px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(28,28,28,0.25)' }}>© 2025 UChicago Music Business RSO</span>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(28,28,28,0.20)' }}>Serious about the business. Obsessed with the music.</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }
      `}</style>
    </section>
  )
}