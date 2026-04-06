'use client'

export default function About() {
  return (
    <section
      id="about"
      style={{
        background: 'var(--page-dark)',
        padding: '120px 0',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '72px' }}>
          <div style={{ width: '32px', height: '1px', background: 'var(--crimson)' }} />
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--crimson)' }}>
            About Us
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '56px', alignItems: 'center' }} className="about-grid">

          {/* Text col 1 */}
          <div>
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--ink)',
              marginBottom: '24px',
            }}>
              Serious about<br />
              <em style={{ color: 'var(--crimson)' }}>the business.</em>
            </h2>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', fontWeight: 300, lineHeight: 1.8, color: 'var(--muted)', marginBottom: '18px' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', fontWeight: 300, lineHeight: 1.8, color: 'var(--muted)' }}>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
            </p>
          </div>

          {/* Text col 2 */}
          <div>
            {[
              { label: 'Our Mission', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim veniam.' },
              { label: 'What We Do',  body: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor.' },
            ].map(({ label, body }) => (
              <div key={label} style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                  <div style={{ width: '20px', height: '1px', background: 'var(--teal)' }} />
                  <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '8px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--teal)' }}>{label}</span>
                </div>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 300, lineHeight: 1.75, color: 'var(--muted)' }}>{body}</p>
              </div>
            ))}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '36px', paddingTop: '28px', borderTop: '1px solid var(--border)' }}>
              {[{ num: '2025', label: 'Founded' }, { num: '∞', label: 'Ambition' }].map(({ num, label }) => (
                <div key={label}>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 900, color: 'var(--crimson)' }}>{num}</div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '8px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: '4px' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image col */}
          <div style={{ position: 'relative' }}>
            <div style={{
              aspectRatio: '3/4',
              background: 'var(--surface)',
              border: '1px solid var(--border-mid)',
              overflow: 'hidden',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, rgba(128,0,0,0.12) 0%, rgba(0,109,111,0.08) 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '0.22em', color: 'rgba(28,28,28,0.18)' }}>PHOTO</span>
              </div>
            </div>
            <div style={{ position: 'absolute', top: '-12px', right: '-12px', width: '56px', height: '56px', border: '1px solid var(--crimson)', opacity: 0.4, pointerEvents: 'none' }} />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .about-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}