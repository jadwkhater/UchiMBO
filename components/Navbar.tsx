'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [eventsOpen, setEventsOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const dropRef                      = useRef<HTMLDivElement>(null)
  const closeTimer                   = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname                     = usePathname()
  const isHome                       = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setEventsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const openDropdown  = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setEventsOpen(true)
  }
  // Delay closing so mouse can travel into the dropdown
  const closeDropdown = () => {
    closeTimer.current = setTimeout(() => setEventsOpen(false), 220)
  }

  const navLink = (href: string, label: string) => (
    <a
      href={href}
      style={{
        fontFamily: 'DM Mono, monospace',
        fontSize: '10px',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'var(--muted)',
        textDecoration: 'none',
        transition: 'color 0.2s',
      }}
      onMouseEnter={e => (e.currentTarget.style.color = 'var(--crimson)')}
      onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
    >
      {label}
    </a>
  )

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 100,
      padding: '0 48px',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
      background: scrolled ? 'rgba(245,241,232,0.95)' : 'rgba(245,241,232,0.85)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      borderBottom: scrolled ? '1px solid var(--border-mid)' : '1px solid var(--border)',
      boxShadow: scrolled ? '0 2px 24px rgba(28,28,28,0.07)' : 'none',
    }}>

      {/* Logo */}
      <Link href="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '1px' }}>
        <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '14px', fontWeight: 700, color: 'var(--ink)', letterSpacing: '0.04em' }}>
          UChicago
        </span>
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--crimson)' }}>
          Music Business
        </span>
      </Link>

      {/* Desktop */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }} className="desktop-nav">
        {isHome && navLink('#about', 'About')}
        {isHome && navLink('#team', 'Meet the Team')}

        {/* Events dropdown */}
        <div
          ref={dropRef}
          style={{ position: 'relative' }}
          onMouseEnter={openDropdown}
          onMouseLeave={closeDropdown}
        >
          <Link
            href="/events"
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '10px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: eventsOpen ? 'var(--crimson)' : 'var(--muted)',
              textDecoration: 'none',
              transition: 'color 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            Events
            <span style={{
              fontSize: '7px',
              display: 'inline-block',
              transition: 'transform 0.2s',
              transform: eventsOpen ? 'rotate(180deg)' : 'none',
              color: 'var(--crimson)',
            }}>▼</span>
          </Link>

          {/* Invisible bridge so mouse can reach dropdown */}
          <div style={{
            position: 'absolute',
            top: '100%',
            left: '-20px',
            right: '-20px',
            height: '20px',
            pointerEvents: eventsOpen ? 'auto' : 'none',
          }} />

          {/* Dropdown panel */}
          <div
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdown}
            style={{
              position: 'absolute',
              top: 'calc(100% + 18px)',
              left: '50%',
              transform: eventsOpen ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-8px)',
              minWidth: '200px',
              background: 'var(--page)',
              border: '1px solid var(--border-mid)',
              borderTop: '2px solid var(--crimson)',
              boxShadow: '0 8px 32px rgba(28,28,28,0.10)',
              padding: '6px 0',
              opacity: eventsOpen ? 1 : 0,
              pointerEvents: eventsOpen ? 'auto' : 'none',
              transition: 'opacity 0.18s ease, transform 0.18s ease',
            }}
          >
            {[
              { href: '/events#current', label: 'Current Events' },
              { href: '/events#past',    label: 'Past Events'    },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setEventsOpen(false)}
                style={{
                  display: 'block',
                  padding: '11px 22px',
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '9px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  textDecoration: 'none',
                  transition: 'color 0.15s, background 0.15s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--crimson)'
                  e.currentTarget.style.background = 'rgba(128,0,0,0.05)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--muted)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {isHome && navLink('#contact', 'Contact')}

        <a
          href="#join"
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '9px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--page)',
            background: 'var(--crimson)',
            padding: '10px 22px',
            textDecoration: 'none',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--scarlet)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--crimson)')}
        >
          Join →
        </a>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(o => !o)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none', flexDirection: 'column', gap: '5px', padding: '4px' }}
        className="mobile-menu-btn"
        aria-label="Menu"
      >
        {[0,1,2].map(i => (
          <span key={i} style={{ display: 'block', width: '22px', height: '1.5px', background: 'var(--ink)' }} />
        ))}
      </button>

      {mobileOpen && (
        <div style={{
          position: 'fixed', top: '64px', left: 0, right: 0,
          background: 'rgba(245,241,232,0.97)',
          backdropFilter: 'blur(14px)',
          borderBottom: '1px solid var(--border-mid)',
          padding: '24px 48px',
          display: 'flex', flexDirection: 'column', gap: '20px',
        }}>
          {isHome && <a href="#about"   onClick={() => setMobileOpen(false)} style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--muted)', textDecoration: 'none' }}>About</a>}
          {isHome && <a href="#team"    onClick={() => setMobileOpen(false)} style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--muted)', textDecoration: 'none' }}>Meet the Team</a>}
          <Link href="/events"          onClick={() => setMobileOpen(false)} style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--muted)', textDecoration: 'none' }}>Events</Link>
          {isHome && <a href="#contact" onClick={() => setMobileOpen(false)} style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--muted)', textDecoration: 'none' }}>Contact</a>}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
