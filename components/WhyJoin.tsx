'use client'

export default function WhyJoin() {
  const pillars = [
    { icon: '◈', color: 'var(--crimson)', title: 'Industry Access',   body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { icon: '◇', color: 'var(--crimson)', title: 'Real Education',     body: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute.' },
    { icon: '○', color: 'var(--teal)',    title: 'Creative Community', body: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint.' },
    { icon: '△', color: 'var(--teal)',    title: 'Career Support',     body: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum lorem.' },
  ]

  return (
    <section
      id="why"
      style={{ background: 'var(--page)', padding: '120px 0', borderTop: '1px solid var(--border)' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '72px' }}>
          <div style={{ width: '32px', height: '1px', background: 'var(--teal)' }} />
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--teal)' }}>Why Join</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '56px', alignItems: 'start' }} className="why-grid">

          {/* Image */}
          <div style={{ position: 'relative' }}>
            <div style={{
              aspectRatio: '2/3',
              background: 'var(--surface)',
              border: '1px solid var(--border-mid)',
              overflow: 'hidden',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(225deg, rgba(0,109,111,0.12) 0%, rgba(128,0,0,0.08) 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '0.22em', color: 'rgba(28,28,28,0.18)' }}>PHOTO</span>
              </div>
            </div>
            <div style={{ position: 'absolute', bottom: '-12px', left: '-12px', width: '56px', height: '56px', border: '1px solid var(--teal)', opacity: 0.4, pointerEvents: 'none' }} />
          </div>

          {/* Text col 1 */}
          <div>
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(1.6rem, 3vw, 2.6rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--ink)',
              marginBottom: '40px',
            }}>
              Obsessed with<br />
              <em style={{ color: 'var(--teal)' }}>the music.</em>
            </h2>
            {pillars.slice(0, 2).map(({ icon, color, title, body }) => (
              <div key={title} style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ color, fontSize: '12px' }}>{icon}</span>
                  <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '8px', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--ink)' }}>{title}</span>
                </div>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 300, lineHeight: 1.75, color: 'var(--muted)', paddingLeft: '22px' }}>{body}</p>
              </div>
            ))}
          </div>

          {/* Text col 2 */}
          <div style={{ paddingTop: '80px' }}>
            {pillars.slice(2).map(({ icon, color, title, body }) => (
              <div key={title} style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ color, fontSize: '12px' }}>{icon}</span>
                  <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '8px', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--ink)' }}>{title}</span>
                </div>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 300, lineHeight: 1.75, color: 'var(--muted)', paddingLeft: '22px' }}>{body}</p>
              </div>
            ))}
            <a
              href="/coming-soon"
              style={{
                display: 'inline-block',
                marginTop: '12px',
                padding: '12px 28px',
                border: '1px solid var(--crimson)',
                fontFamily: 'DM Mono, monospace',
                fontSize: '9px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--crimson)',
                textDecoration: 'none',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--crimson)'; e.currentTarget.style.color = 'var(--page)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--crimson)' }}
            >
              Join the Listhost →
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .why-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}