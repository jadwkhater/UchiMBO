'use client'

import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = ['About', 'Mission', 'Structure', 'Events', 'Join']

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3 border-b border-white/5' : 'py-6'
      }`}
      style={{
        backgroundColor: scrolled ? 'rgba(28,28,28,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div
            className="w-8 h-8 flex items-center justify-center text-xs font-bold tracking-widest transition-all duration-300"
            style={{
              background: 'var(--crimson)',
              fontFamily: 'DM Mono, monospace',
              color: 'var(--cream)',
            }}
          >
            RSO
          </div>
          <span
            className="hidden sm:block text-sm tracking-[0.2em] uppercase transition-opacity duration-300 group-hover:opacity-70"
            style={{ color: 'var(--cream)', fontFamily: 'DM Mono, monospace' }}
          >
            Music Business
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm tracking-widest uppercase border-animated pb-0.5 transition-colors duration-300"
              style={{
                color: 'rgba(245,241,232,0.6)',
                fontFamily: 'DM Mono, monospace',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--cream)')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(245,241,232,0.6)')}
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#join"
          className="hidden md:block text-xs px-5 py-2.5 tracking-widest uppercase transition-all duration-300"
          style={{
            border: '1px solid var(--teal)',
            color: 'var(--teal)',
            fontFamily: 'DM Mono, monospace',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.background = 'var(--teal)'
            el.style.color = 'var(--cream)'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.background = 'transparent'
            el.style.color = 'var(--teal)'
          }}
        >
          Apply Now
        </a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-6 h-px transition-all duration-300"
            style={{
              background: 'var(--cream)',
              transform: menuOpen ? 'rotate(45deg) translate(3.5px, 3.5px)' : '',
            }}
          />
          <span
            className="block w-6 h-px transition-all duration-300"
            style={{
              background: 'var(--cream)',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-6 h-px transition-all duration-300"
            style={{
              background: 'var(--cream)',
              transform: menuOpen ? 'rotate(-45deg) translate(3.5px, -3.5px)' : '',
            }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className="md:hidden transition-all duration-500 overflow-hidden"
        style={{
          maxHeight: menuOpen ? '400px' : '0',
          backgroundColor: 'rgba(28,28,28,0.98)',
        }}
      >
        <div className="px-6 py-6 flex flex-col gap-5 border-t border-white/5">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="text-sm tracking-widest uppercase"
              style={{ color: 'var(--cream)', fontFamily: 'DM Mono, monospace' }}
            >
              {link}
            </a>
          ))}
          <a
            href="#join"
            className="text-xs px-5 py-3 tracking-widest uppercase text-center mt-2"
            style={{
              background: 'var(--crimson)',
              color: 'var(--cream)',
              fontFamily: 'DM Mono, monospace',
            }}
          >
            Apply Now
          </a>
        </div>
      </div>
    </nav>
  )
}
