'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#F5F1E8',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px 24px',
        overflow: 'hidden',
        fontFamily: 'sans-serif',
      }}
    >

      {/* BG Vinyl Large — Top Right, pulled closer to center */}
      <svg
        style={{
          position: 'absolute',
          top: '-60px',
          right: '-60px',
          width: '680px',
          height: '680px',
          opacity: 0.11,
          animation: 'spin 18s linear infinite',
          pointerEvents: 'none',
        }}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="100" cy="100" r="98" fill="#1C1C1C" />
        <circle cx="100" cy="100" r="88" fill="none" stroke="#444" strokeWidth="1.2" />
        <circle cx="100" cy="100" r="78" fill="none" stroke="#444" strokeWidth="0.8" />
        <circle cx="100" cy="100" r="68" fill="none" stroke="#444" strokeWidth="0.8" />
        <circle cx="100" cy="100" r="58" fill="none" stroke="#444" strokeWidth="0.8" />
        <circle cx="100" cy="100" r="48" fill="none" stroke="#444" strokeWidth="0.8" />
        <circle cx="100" cy="100" r="38" fill="none" stroke="#444" strokeWidth="0.8" />
        <circle cx="100" cy="100" r="28" fill="#800000" />
        <circle cx="100" cy="100" r="8" fill="#F5F1E8" />
      </svg>

      {/* BG Vinyl Small — Bottom Left, pulled closer to center */}
      <svg
        style={{
          position: 'absolute',
          bottom: '-40px',
          left: '-40px',
          width: '460px',
          height: '460px',
          opacity: 0.09,
          animation: 'spin 24s linear infinite reverse',
          pointerEvents: 'none',
        }}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="100" cy="100" r="98" fill="#1C1C1C" />
        <circle cx="100" cy="100" r="82" fill="none" stroke="#444" strokeWidth="1" />
        <circle cx="100" cy="100" r="66" fill="none" stroke="#444" strokeWidth="0.8" />
        <circle cx="100" cy="100" r="50" fill="none" stroke="#444" strokeWidth="0.8" />
        <circle cx="100" cy="100" r="34" fill="#800000" />
        <circle cx="100" cy="100" r="9" fill="#F5F1E8" />
      </svg>

      {/* BG Cassette — Bottom Right, bigger and closer in */}
      <svg
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '-20px',
          width: '380px',
          height: '248px',
          opacity: 0.09,
          transform: 'rotate(-12deg)',
          pointerEvents: 'none',
        }}
        viewBox="0 0 260 160"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="4" y="10" width="252" height="140" rx="12" fill="#1C1C1C" />
        <rect x="18" y="24" width="224" height="36" fill="#800000" />
        <line x1="30" y1="42" x2="120" y2="42" stroke="#F5F1E8" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
        <rect x="50" y="78" width="160" height="42" rx="21" fill="none" stroke="#444" strokeWidth="4" />
        <circle cx="90" cy="99" r="12" fill="#333" />
        <circle cx="90" cy="99" r="5" fill="#1C1C1C" />
        <circle cx="170" cy="99" r="12" fill="#333" />
        <circle cx="170" cy="99" r="5" fill="#1C1C1C" />
        <path d="M70 150 L85 160 L175 160 L190 150" fill="none" stroke="#444" strokeWidth="5" />
      </svg>

      {/* BG Cassette — Top Left, bigger and closer in */}
      <svg
        style={{
          position: 'absolute',
          top: '20px',
          left: '-10px',
          width: '280px',
          height: '182px',
          opacity: 0.08,
          transform: 'rotate(10deg)',
          pointerEvents: 'none',
        }}
        viewBox="0 0 260 160"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="4" y="10" width="252" height="140" rx="12" fill="#1C1C1C" />
        <rect x="18" y="24" width="224" height="36" fill="#800000" />
        <rect x="50" y="78" width="160" height="42" rx="21" fill="none" stroke="#444" strokeWidth="4" />
        <circle cx="90" cy="99" r="12" fill="#333" />
        <circle cx="90" cy="99" r="5" fill="#1C1C1C" />
        <circle cx="170" cy="99" r="12" fill="#333" />
        <circle cx="170" cy="99" r="5" fill="#1C1C1C" />
      </svg>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-content {
          position: relative;
          z-index: 2;
          animation: fadeUp 0.8s ease both;
        }
      `}</style>

      {/* Foreground Content */}
      <div className="hero-content">

        {/* Logo + Org Name */}
        <div style={{ marginBottom: '28px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Image
            src="/UChicagoONLYLOGOR.png"
            alt="UChicago"
            width={72}
            height={72}
            style={{ objectFit: 'contain', marginBottom: '10px' }}
          />
          <div style={{ fontSize: '17px', fontWeight: 'bold', color: '#1C1C1C', letterSpacing: '0.05em' }}>
            UChicago
          </div>
          <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#800000', textTransform: 'uppercase', letterSpacing: '0.22em', marginTop: '3px' }}>
            Music Business
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: '40px', height: '2px', background: '#800000', margin: '20px auto', opacity: 0.5 }} />

        {/* Headlines */}
        <div>
          <h1 style={{ fontSize: 'clamp(30px, 5vw, 54px)', fontWeight: 800, color: '#1C1C1C', margin: '0 0 6px', lineHeight: 1.08 }}>
            Serious about the business.
          </h1>
          <h2 style={{ fontSize: 'clamp(30px, 5vw, 54px)', fontWeight: 800, color: '#800000', margin: 0, lineHeight: 1.08 }}>
            Obsessed with the music.
          </h2>
        </div>

        {/* Subheadline */}
        <p style={{ fontSize: '15px', color: '#555', maxWidth: '420px', margin: '20px auto 36px', lineHeight: 1.6 }}>
          A pre-professional organization dedicated to the intersection of culture and commerce.
        </p>

        {/* CTA */}
        <Link
          href="/listhost"
          style={{
            display: 'inline-block',
            backgroundColor: '#800000',
            color: '#F5F1E8',
            padding: '15px 36px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '13px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            borderRadius: '2px',
            marginBottom: '48px',
          }}
        >
          Get Notified
        </Link>

        {/* Footer Tag */}
        <div style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
          Launching Spring 2026
        </div>

      </div>
    </section>
  )
}