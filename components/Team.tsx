'use client'

const TEAM = [
  { name: 'Lorem Ipsum',   role: 'President',             bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.' },
  { name: 'Lorem Ipsum',   role: 'Vice President',        bio: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.' },
  { name: 'Lorem Ipsum',   role: 'Technology',    bio: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
  { name: 'Lorem Ipsum',   role: 'Social Media', bio: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.' }
]

export default function Team() {
  return (
    <section
      id="team"
      style={{ background: 'var(--page-dark)', padding: '120px 0', borderTop: '1px solid var(--border)' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px' }}>

        <div style={{ marginBottom: '72px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <div style={{ width: '32px', height: '1px', background: 'var(--crimson)' }} />
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--crimson)' }}>Meet the Team</span>
          </div>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: 'var(--ink)',
          }}>
            The people behind<br />
            <em style={{ color: 'var(--crimson)' }}>UChicago MBO.</em>
          </h2>
        </div>

        {/* Changed gridTemplateColumns from 3 to 2 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'var(--border)' }} className="team-grid">
          {TEAM.map(({ name, role, bio }, i) => (
            <div
              key={i}
              style={{ background: 'var(--page)', overflow: 'hidden', position: 'relative', transition: 'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--page)')}
            >
              <div style={{ height: '2px', background: i % 2 === 0 ? 'var(--crimson)' : 'var(--teal)', opacity: 0.7 }} />
              <div style={{
                aspectRatio: '1/1',
                background: `linear-gradient(${135 + i * 22}deg, rgba(128,0,0,0.06) 0%, rgba(0,109,111,0.05) 100%)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderBottom: '1px solid var(--border)',
              }}>
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(28,28,28,0.15)' }}>PHOTO</span>
              </div>
              <div style={{ padding: '20px 24px 26px' }}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: 700, color: 'var(--ink)', marginBottom: '3px' }}>{name}</div>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '8px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--crimson)', marginBottom: '12px' }}>{role}</div>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 300, lineHeight: 1.65, color: 'var(--muted)' }}>{bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* Simplified media query: Only need to drop to 1 column for mobile */
        @media (max-width: 580px) { .team-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}