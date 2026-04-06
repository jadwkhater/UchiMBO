'use client'
const CURRENT_EVENTS = [
  { id: 1, title: 'Industry Panel: A&R in 2025',    date: 'April 12, 2025',  location: 'Gleacher Center, Room 204',  category: 'Panel',      description: 'Join us for a candid conversation with A&R representatives from major and independent labels about discovering talent in the streaming era.',          image: null },
  { id: 2, title: 'Music Publishing Workshop',       date: 'April 26, 2025',  location: 'Crerar Library, Room 390',   category: 'Workshop',   description: 'An in-depth workshop on music publishing fundamentals — sync licensing, royalties, and how to get your music placed.',                               image: null },
  { id: 3, title: 'Spring Mixer & Showcase',          date: 'May 10, 2025',   location: 'Ida Noyes Hall',             category: 'Social',     description: 'Our end-of-year celebration featuring student performances, industry guests, and networking with UChicago music lovers.',                           image: null },
]

const PAST_EVENTS = [
  { id: 4, title: 'Founding Meeting',                           date: 'January 15, 2025',  location: 'Stuart Hall',              category: 'Meeting',     description: 'The first official meeting of UChicago Music Business RSO. We set our vision, elected officers, and began building something real.',               image: null },
  { id: 5, title: 'Label Visits: Chicago Independent Scene',    date: 'February 8, 2025',  location: 'Wicker Park, Chicago',     category: 'Field Trip',  description: 'An intimate tour of two Chicago-based independent labels and a Q&A with their founders about building a label from scratch.',                     image: null },
  { id: 6, title: 'Music Law 101',                              date: 'February 22, 2025', location: 'Pick Hall',                category: 'Workshop',    description: 'Entertainment attorney Michael Chen walked us through contracts, rights, and the legal landscape every music professional needs to know.',          image: null },
  { id: 7, title: 'Spotify & Streaming Analytics Deep Dive',    date: 'March 7, 2025',     location: 'Booth School of Business', category: 'Panel',       description: 'A data-driven conversation about how streaming numbers actually work, what they mean for artists, and what the labels watch.',                      image: null },
  { id: 8, title: 'Artist Management Roundtable',               date: 'March 21, 2025',    location: 'Reynolds Club',            category: 'Roundtable',  description: 'Three working artist managers shared their stories — how they found their clients, what the job actually looks like day-to-day.',                 image: null },
  { id: 9, title: 'Spring Break Study Group',                   date: 'March 29, 2025',    location: 'Virtual',                  category: 'Social',      description: 'An informal virtual hangout for members to share music, trade industry reads, and decompress before spring quarter.',                             image: null },
]

const CAT_COLOR: Record<string, string> = {
  Panel:       '#800000',
  Workshop:    '#006D6F',
  Social:      '#A6192E',
  Meeting:     '#888',
  'Field Trip':'#006D6F',
  Roundtable:  '#800000',
}

function EventCard({ event, upcoming }: { event: typeof CURRENT_EVENTS[0]; upcoming?: boolean }) {
  const c = CAT_COLOR[event.category] || '#800000'
  return (
    <article style={{
      background: 'var(--page)',
      border: '1px solid var(--border-mid)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      transition: 'box-shadow 0.22s, transform 0.22s',
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(28,28,28,0.10)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none' }}
    >
      {/* Accent bar */}
      <div style={{ height: '2px', background: c, flexShrink: 0 }} />

      {/* Image */}
      <div style={{
        aspectRatio: '16/9',
        background: `linear-gradient(135deg, ${c}12 0%, rgba(245,241,232,0.4) 100%)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        position: 'relative',
        borderBottom: '1px solid var(--border)',
      }}>
        {event.image
          // eslint-disable-next-line @next/next/no-img-element
          ? <img src={event.image} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(28,28,28,0.15)' }}>IMAGE</span>
        }
        {upcoming && (
          <div style={{ position: 'absolute', top: '12px', right: '12px', background: c, padding: '4px 10px', fontFamily: 'DM Mono, monospace', fontSize: '7px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#F5F1E8' }}>
            Upcoming
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '20px 22px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '7px', letterSpacing: '0.22em', textTransform: 'uppercase', color: c, padding: '3px 8px', border: `1px solid ${c}33` }}>
            {event.category}
          </span>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '8px', color: 'var(--muted)', letterSpacing: '0.05em' }}>{event.date}</span>
        </div>

        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '17px', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.25, marginBottom: '10px', letterSpacing: '-0.01em' }}>
          {event.title}
        </h3>

        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 300, lineHeight: 1.7, color: 'var(--muted)', marginBottom: '16px', flex: 1 }}>
          {event.description}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '14px', borderTop: '1px solid var(--border)' }}>
          <span style={{ color: c, fontSize: '10px' }}>◎</span>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '8px', letterSpacing: '0.12em', color: 'var(--muted)' }}>{event.location}</span>
        </div>
      </div>
    </article>
  )
}

export default function EventsPage() {
  return (
    <>
      <main style={{ background: 'var(--page)', minHeight: '100vh', paddingTop: '64px' }}>

        {/* Page header */}
        <div style={{ background: 'var(--page-dark)', borderBottom: '1px solid var(--border-mid)', padding: '80px 48px 64px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div style={{ width: '32px', height: '1px', background: 'var(--crimson)' }} />
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--crimson)' }}>Events</span>
            </div>
            <h1 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)',
              fontWeight: 900,
              letterSpacing: '-0.025em',
              lineHeight: 1.05,
              color: 'var(--ink)',
            }}>
              Where the industry<br />
              <em style={{ color: 'var(--crimson)' }}>meets the campus.</em>
            </h1>
          </div>
        </div>

        {/* Current Events */}
        <section id="current" style={{ padding: '72px 48px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px' }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--teal)', animation: 'pulse-dot 2s ease infinite' }} />
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--teal)' }}>Current Events</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="events-grid">
            {CURRENT_EVENTS.map(ev => <EventCard key={ev.id} event={ev} upcoming />)}
          </div>
        </section>

        {/* Divider */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px' }}>
          <div style={{ height: '1px', background: 'linear-gradient(to right, var(--crimson), var(--teal), transparent)' }} />
        </div>

        {/* Past Events */}
        <section id="past" style={{ padding: '72px 48px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '48px' }}>
            <div style={{ width: '32px', height: '1px', background: 'var(--border-mid)' }} />
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--muted)' }}>Past Events</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', opacity: 0.72 }} className="events-grid">
            {PAST_EVENTS.map(ev => <EventCard key={ev.id} event={ev} />)}
          </div>
        </section>

        {/* Footer strip */}
        <div style={{ borderTop: '1px solid var(--border)', padding: '28px 48px', maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(28,28,28,0.22)' }}>© 2025 UChicago Music Business RSO</span>
          <a href="/" style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '0.2em', color: 'var(--muted)', textDecoration: 'none' }}>← Back to Home</a>
        </div>
      </main>

      <style>{`
        @media (max-width: 900px) { .events-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 580px) { .events-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  )
}