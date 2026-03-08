'use client';

import { useState, useEffect, useRef } from 'react';

/*
  UChicago Music Business — Homepage
  Palette:
    Maroon   #800000
    Charcoal #1C1C1C
    Teal     #006D6F
    Cream    #F5F1E8
    Crimson  #A6192E
  
  Aesthetic: Editorial-meets-record-label. Clean light mode with bold typographic
  hierarchy. Think a music industry trade publication crossed with a UChicago
  academic gravitas. Playfair Display for headlines (serious + musical), 
  DM Sans for body (clean, modern). Minimal decorative elements — the typography
  does the work.
*/

const COLORS = {
  maroon: '#800000',
  charcoal: '#1C1C1C',
  teal: '#006D6F',
  cream: '#F5F1E8',
  crimson: '#A6192E',
  creamDark: '#EDE8DC',
  offWhite: '#FAFAF8',
};

// ─── GOOGLE FONTS LOADER ───────────────────────────────────
function FontLoader() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);
  return null;
}

// ─── NAVBAR ────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <style>{`
        .nav-link {
          color: ${COLORS.charcoal};
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          opacity: 0.65;
          transition: opacity 0.2s;
        }
        .nav-link:hover { opacity: 1; }
        .nav-cta {
          background: ${COLORS.maroon};
          color: ${COLORS.cream} !important;
          opacity: 1 !important;
          padding: 9px 20px;
          border-radius: 4px;
          font-size: 12px !important;
          letter-spacing: 0.1em !important;
          transition: background 0.2s !important;
        }
        .nav-cta:hover { background: ${COLORS.crimson} !important; }
      `}</style>

      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(250,250,248,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? `1px solid ${COLORS.creamDark}` : '1px solid transparent',
        transition: 'all 0.35s ease',
        padding: '0 6%',
      }}>
        <div style={{
          maxWidth: 1160, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 68,
        }}>
          {/* Wordmark */}
          <a href="#" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{
                fontFamily: 'Playfair Display, Georgia, serif',
                fontSize: 15, fontWeight: 700,
                color: COLORS.charcoal, letterSpacing: '0.04em',
              }}>UChicago</span>
              <span style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 11, fontWeight: 500,
                color: COLORS.maroon, letterSpacing: '0.18em',
                textTransform: 'uppercase', marginTop: 1,
              }}>Music Business</span>
            </div>
          </a>

          {/* Desktop links */}
          <div style={{ display: 'flex', gap: 36, alignItems: 'center' }} className="ucmb-desktop-nav">
            {['About', 'Events', 'Members', 'Contact'].map(l => (
              <a key={l} href="#" className="nav-link">{l}</a>
            ))}
            <a href="#join" className="nav-link nav-cta">Apply Now</a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
            className="ucmb-hamburger"
            aria-label="Menu"
          >
            <div style={{ width: 22, height: 1.5, background: COLORS.charcoal, marginBottom: 5, transition: 'transform 0.2s', transform: mobileOpen ? 'rotate(45deg) translate(4.5px, 4.5px)' : 'none' }} />
            <div style={{ width: 22, height: 1.5, background: COLORS.charcoal, opacity: mobileOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
            <div style={{ width: 22, height: 1.5, background: COLORS.charcoal, marginTop: 5, transition: 'transform 0.2s', transform: mobileOpen ? 'rotate(-45deg) translate(4.5px, -4.5px)' : 'none' }} />
          </button>
        </div>

        {/* Mobile menu */}
        <div style={{
          maxHeight: mobileOpen ? 300 : 0, overflow: 'hidden',
          transition: 'max-height 0.3s ease',
          background: COLORS.offWhite,
          borderTop: mobileOpen ? `1px solid ${COLORS.creamDark}` : 'none',
        }}>
          {['About', 'Events', 'Members', 'Contact', 'Apply Now'].map(l => (
            <a key={l} href="#" style={{
              display: 'block', padding: '14px 0',
              fontFamily: 'DM Sans, sans-serif', fontSize: 14,
              color: l === 'Apply Now' ? COLORS.maroon : COLORS.charcoal,
              textDecoration: 'none', fontWeight: l === 'Apply Now' ? 600 : 400,
              borderBottom: `1px solid ${COLORS.creamDark}`,
            }}>{l}</a>
          ))}
        </div>
      </nav>

      <style>{`
        @media (max-width: 720px) {
          .ucmb-desktop-nav { display: none !important; }
          .ucmb-hamburger { display: block !important; }
        }
      `}</style>
    </>
  );
}

// ─── HERO ──────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{
      minHeight: '100vh',
      background: COLORS.cream,
      display: 'flex', alignItems: 'center',
      paddingTop: 68,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle vertical rule — editorial detail */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, left: '6%',
        width: 1, background: `linear-gradient(to bottom, transparent, ${COLORS.maroon}22, transparent)`,
      }} />
      <div style={{
        position: 'absolute', top: 0, bottom: 0, right: '6%',
        width: 1, background: `linear-gradient(to bottom, transparent, ${COLORS.maroon}22, transparent)`,
      }} />

      {/* Large decorative letter */}
      <div style={{
        position: 'absolute', right: '-2%', bottom: '-4%',
        fontFamily: 'Playfair Display, serif',
        fontSize: 'clamp(240px, 28vw, 400px)',
        fontWeight: 900, fontStyle: 'italic',
        color: COLORS.maroon, opacity: 0.04,
        lineHeight: 1, userSelect: 'none',
        pointerEvents: 'none',
      }}>M</div>

      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '80px 6%', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 80, alignItems: 'center' }} className="hero-grid">

          {/* Left */}
          <div>
            {/* Eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
              <div style={{ width: 32, height: 1, background: COLORS.maroon }} />
              <span style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: 11,
                fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase',
                color: COLORS.maroon,
              }}>University of Chicago</span>
            </div>

            <h1 style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: 'clamp(44px, 6vw, 82px)',
              fontWeight: 900, color: COLORS.charcoal,
              lineHeight: 1.05, letterSpacing: '-0.02em',
              marginBottom: 12,
            }}>
              Serious about<br />
              the business.
            </h1>
            <h1 style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: 'clamp(44px, 6vw, 82px)',
              fontWeight: 900, fontStyle: 'italic',
              color: COLORS.maroon,
              lineHeight: 1.05, letterSpacing: '-0.02em',
              marginBottom: 40,
            }}>
              Obsessed with<br />
              the music.
            </h1>

            <p style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: 17,
              fontWeight: 300, color: COLORS.charcoal, opacity: 0.7,
              lineHeight: 1.75, maxWidth: 480, marginBottom: 48,
            }}>
              The professional home for students pursuing careers in the music industry —
              connecting UChicago talent with the business of sound.
            </p>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
              <a href="#join" style={{
                background: COLORS.maroon, color: COLORS.cream,
                textDecoration: 'none', padding: '14px 32px',
                fontFamily: 'DM Sans, sans-serif', fontSize: 13,
                fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
                borderRadius: 4,
                transition: 'background 0.2s, transform 0.2s',
                display: 'inline-block',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = COLORS.crimson; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = COLORS.maroon; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                Apply — 2026–27
              </a>
              <a href="#about" style={{
                color: COLORS.charcoal, textDecoration: 'none',
                fontFamily: 'DM Sans, sans-serif', fontSize: 13,
                fontWeight: 500, letterSpacing: '0.05em',
                borderBottom: `1px solid ${COLORS.charcoal}44`,
                paddingBottom: 2,
                transition: 'border-color 0.2s, color 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.color = COLORS.maroon; e.currentTarget.style.borderColor = COLORS.maroon; }}
                onMouseLeave={e => { e.currentTarget.style.color = COLORS.charcoal; e.currentTarget.style.borderColor = `${COLORS.charcoal}44`; }}
              >
                Learn more →
              </a>
            </div>

            {/* Applications note */}
            <div style={{
              marginTop: 48, display: 'flex', alignItems: 'flex-start', gap: 12,
              padding: '16px 20px',
              background: `${COLORS.teal}11`,
              border: `1px solid ${COLORS.teal}33`,
              borderRadius: 6,
              maxWidth: 480,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: COLORS.teal, marginTop: 6, flexShrink: 0 }} />
              <p style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: 13,
                color: COLORS.charcoal, opacity: 0.7, lineHeight: 1.6,
              }}>
                <strong style={{ color: COLORS.teal, opacity: 1 }}>Applications open</strong> on the first day of Spring Quarter 2026 for the 2026–27 academic year.
              </p>
            </div>
          </div>

          {/* Right — stat card stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { num: '3', label: 'Industry panels per quarter', accent: COLORS.maroon },
              { num: '∞', label: 'Networks to build', accent: COLORS.teal },
              { num: '1', label: 'Pre-professional music biz org at UChicago', accent: COLORS.crimson },
            ].map(({ num, label, accent }) => (
              <div key={label} style={{
                background: '#fff',
                border: `1px solid ${COLORS.creamDark}`,
                borderRadius: 10,
                padding: '28px 32px',
                display: 'flex', alignItems: 'center', gap: 24,
                boxShadow: '0 2px 20px rgba(28,28,28,0.06)',
                transition: 'transform 0.25s, box-shadow 0.25s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(4px)'; e.currentTarget.style.boxShadow = '0 4px 32px rgba(28,28,28,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.boxShadow = '0 2px 20px rgba(28,28,28,0.06)'; }}
              >
                <div style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 52, fontWeight: 900, color: accent, lineHeight: 1, flexShrink: 0,
                }}>{num}</div>
                <div style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 14, fontWeight: 400, color: COLORS.charcoal, opacity: 0.65, lineHeight: 1.45,
                }}>{label}</div>
              </div>
            ))}

            {/* Tagline card */}
            <div style={{
              background: COLORS.charcoal, borderRadius: 10,
              padding: '28px 32px',
              boxShadow: '0 2px 20px rgba(28,28,28,0.12)',
            }}>
              <p style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 18, fontStyle: 'italic', fontWeight: 400,
                color: COLORS.cream, lineHeight: 1.5, marginBottom: 16,
              }}>
                "A pre-professional community for music industry careers."
              </p>
              <div style={{ display: 'flex', gap: 8 }}>
                {[COLORS.maroon, COLORS.teal, COLORS.crimson].map(c => (
                  <div key={c} style={{ width: 6, height: 6, borderRadius: '50%', background: c }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:900px){ .hero-grid{grid-template-columns:1fr !important;} }`}</style>
    </section>
  );
}

// ─── FEATURES / WHAT WE DO ────────────────────────────────
function WhatWeDo() {
  const features = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>
          <line x1="12" y1="2" x2="12" y2="9"/><line x1="12" y1="15" x2="12" y2="22"/>
        </svg>
      ),
      title: 'Industry Guest Speakers',
      desc: 'We bring in working professionals from across the music business — popular, classical, electronic, and beyond — to share real perspectives on navigating the industry.',
      accent: COLORS.maroon,
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      title: 'Professional Networking',
      desc: 'Connect with peers who share your obsession. Build relationships across UChicago and with students from Columbia, DePaul, Roosevelt, Loyola, and SAIC.',
      accent: COLORS.teal,
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
      ),
      title: 'Career Opportunities',
      desc: 'Internship postings, job boards, and career prep resources curated specifically for students pursuing roles in music production, artist management, and the entertainment industry.',
      accent: COLORS.crimson,
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ),
      title: 'Industry Panels & Events',
      desc: 'Multi-speaker panels, mixers, and collaborative events. We partner with MAB, Midwave, Music Forum, WHPK, and other campus RSOs to create meaningful experiences.',
      accent: COLORS.maroon,
    },
  ];

  return (
    <section id="about" style={{ background: COLORS.offWhite, padding: '100px 6%' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>

        {/* Section header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, marginBottom: 72, alignItems: 'end' }} className="about-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 32, height: 1, background: COLORS.teal }} />
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.teal }}>What We Do</span>
            </div>
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 900, color: COLORS.charcoal,
              lineHeight: 1.1, letterSpacing: '-0.02em',
            }}>
              Where academic<br />rigor meets<br />
              <em style={{ color: COLORS.maroon }}>industry reality.</em>
            </h2>
          </div>
          <p style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: 16,
            fontWeight: 300, color: COLORS.charcoal, opacity: 0.65,
            lineHeight: 1.8,
          }}>
            UChicago Music Business is a pre-professional student organization creating the bridge between a world-class academic environment and careers in music production, artist management, A&R, music law, and the broader entertainment industry.
          </p>
        </div>

        {/* Feature grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }} className="features-grid">
          {features.map(({ icon, title, desc, accent }) => (
            <div key={title} style={{
              background: '#fff',
              border: `1px solid ${COLORS.creamDark}`,
              borderRadius: 10, padding: 36,
              transition: 'border-color 0.25s, transform 0.25s, box-shadow 0.25s',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${accent}44`;
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = `0 8px 32px ${accent}12`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = COLORS.creamDark;
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ color: accent, marginBottom: 20 }}>{icon}</div>
              <h3 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 20, fontWeight: 700,
                color: COLORS.charcoal, marginBottom: 12,
              }}>{title}</h3>
              <p style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: 14,
                fontWeight: 300, color: COLORS.charcoal, opacity: 0.65,
                lineHeight: 1.75,
              }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:720px){
          .about-header { grid-template-columns: 1fr !important; gap: 32px !important; }
          .features-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ─── CTA / JOIN ────────────────────────────────────────────
function JoinSection() {
  return (
    <section id="join" style={{ background: COLORS.cream, padding: '100px 6%' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 400px', gap: 80, alignItems: 'center',
        }} className="join-grid">

          {/* Left — text */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 32, height: 1, background: COLORS.maroon }} />
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.maroon }}>Applications</span>
            </div>
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(32px, 4vw, 56px)',
              fontWeight: 900, color: COLORS.charcoal,
              lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 24,
            }}>
              Ready to build<br />your future in<br />
              <em style={{ color: COLORS.maroon }}>music?</em>
            </h2>
            <p style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: 16,
              fontWeight: 300, color: COLORS.charcoal, opacity: 0.65,
              lineHeight: 1.8, maxWidth: 440, marginBottom: 40,
            }}>
              Membership is open to all UChicago students. Applications for the 2026–27 academic year open on the first day of Spring Quarter 2026. Join a community that takes both the craft and the career seriously.
            </p>

            {/* Contact info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: COLORS.charcoal, opacity: 0.4 }}>Inquiries</span>
              <a href="mailto:uchicagomusicbusiness@uchicago.edu" style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: 15,
                color: COLORS.maroon, textDecoration: 'none', fontWeight: 500,
                transition: 'opacity 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >uchicagomusicbusiness@uchicago.edu</a>
            </div>
          </div>

          {/* Right — card */}
          <div style={{
            background: COLORS.charcoal, borderRadius: 16,
            padding: '48px 40px',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Decorative background letter */}
            <div style={{
              position: 'absolute', bottom: -24, right: -12,
              fontFamily: 'Playfair Display, serif',
              fontSize: 180, fontWeight: 900, fontStyle: 'italic',
              color: '#fff', opacity: 0.03, lineHeight: 1,
              pointerEvents: 'none', userSelect: 'none',
            }}>B</div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ marginBottom: 32 }}>
                <div style={{
                  display: 'inline-block',
                  background: `${COLORS.maroon}33`, border: `1px solid ${COLORS.maroon}66`,
                  borderRadius: 100, padding: '6px 14px',
                  fontFamily: 'DM Sans, sans-serif', fontSize: 11,
                  fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
                  color: '#ff9999', marginBottom: 20,
                }}>Applications Open Spring 2026</div>
                <h3 style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 26, fontWeight: 700,
                  color: COLORS.cream, lineHeight: 1.3, marginBottom: 12,
                }}>Become a Member</h3>
                <p style={{
                  fontFamily: 'DM Sans, sans-serif', fontSize: 14,
                  color: COLORS.cream, opacity: 0.55, lineHeight: 1.7,
                }}>Open to all UChicago students with an interest in the business side of music and entertainment.</p>
              </div>

              {/* Checklist */}
              {[
                'Access to industry speaker events',
                'Career opportunity postings',
                'Bi-weekly member meetings',
                'Cross-RSO collaborations',
                'Professional networking events',
              ].map(item => (
                <div key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 14 }}>
                  <div style={{
                    width: 18, height: 18, borderRadius: '50%',
                    background: `${COLORS.teal}33`, border: `1px solid ${COLORS.teal}66`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1,
                  }}>
                    <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke={COLORS.teal} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: COLORS.cream, opacity: 0.7 }}>{item}</span>
                </div>
              ))}

              <a href="mailto:uchicagomusicbusiness@uchicago.edu" style={{
                display: 'block', textAlign: 'center',
                marginTop: 32,
                background: COLORS.maroon, color: COLORS.cream,
                textDecoration: 'none', padding: '14px 24px',
                borderRadius: 6, fontFamily: 'DM Sans, sans-serif',
                fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
                transition: 'background 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.background = COLORS.crimson)}
                onMouseLeave={e => (e.currentTarget.style.background = COLORS.maroon)}
              >
                Get Notified When Apps Open
              </a>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){ .join-grid{grid-template-columns:1fr !important;} }`}</style>
    </section>
  );
}

// ─── FOOTER ────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      background: COLORS.charcoal, padding: '56px 6% 36px',
      borderTop: `3px solid ${COLORS.maroon}`,
    }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 48, marginBottom: 48 }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 16, fontWeight: 700, color: COLORS.cream, letterSpacing: '0.02em' }}>UChicago</div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 10, fontWeight: 600, color: COLORS.maroon, letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 2 }}>Music Business</div>
            </div>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: COLORS.cream, opacity: 0.4, lineHeight: 1.7, maxWidth: 240 }}>
              A pre-professional student organization at the University of Chicago.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: COLORS.cream, opacity: 0.4, marginBottom: 20 }}>Links</div>
            {['About', 'Events', 'Members', 'Contact', 'Apply'].map(l => (
              <a key={l} href="#" style={{ display: 'block', fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: COLORS.cream, opacity: 0.55, textDecoration: 'none', marginBottom: 10, transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0.55')}
              >{l}</a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: COLORS.cream, opacity: 0.4, marginBottom: 20 }}>Contact</div>
            <a href="mailto:uchicagomusicbusiness@uchicago.edu" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: COLORS.maroon, textDecoration: 'none', lineHeight: 1.6, display: 'block', marginBottom: 20 }}>
              uchicagomusicbusiness@uchicago.edu
            </a>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: COLORS.cream, opacity: 0.4, marginBottom: 12 }}>Campus RSO Partners</div>
            {['MAB', 'Midwave', 'Music Forum', 'WHPK', 'Firebird Magazine'].map(r => (
              <span key={r} style={{
                display: 'inline-block', fontFamily: 'DM Sans, sans-serif', fontSize: 11,
                color: COLORS.cream, opacity: 0.35, marginRight: 8, marginBottom: 6,
                background: 'rgba(255,255,255,0.07)', borderRadius: 3, padding: '3px 8px',
              }}>{r}</span>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(245,241,232,0.08)', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: COLORS.cream, opacity: 0.25 }}>
            © {new Date().getFullYear()} UChicago Music Business Organization
          </span>
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: COLORS.cream, opacity: 0.25 }}>
            University of Chicago · Hyde Park, Chicago, IL
          </span>
        </div>
      </div>
      <style>{`@media(max-width:720px){ .footer-grid{grid-template-columns:1fr !important;gap:36px !important;} }`}</style>
    </footer>
  );
}

// ─── PAGE ──────────────────────────────────────────────────
export default function UChicagoMusicBusinessPage() {
  return (
    <>
      <FontLoader />
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: ${COLORS.cream}; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${COLORS.creamDark}; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.maroon}; border-radius: 3px; }
      `}</style>
      <Navbar />
      <Hero />
      <WhatWeDo />
      <JoinSection />
      <Footer />
    </>
  );
}
