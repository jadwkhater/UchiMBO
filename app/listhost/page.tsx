'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

function AudioWaveformBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let time = 0;

    // Each track gets its own seed array keyed by numBars
    const MAX_BARS = 300;
    const seeds = Array.from({ length: MAX_BARS }, (_, i) => (
      0.45 * Math.abs(Math.sin(i * 0.18 + 1.2)) +
      0.30 * Math.abs(Math.sin(i * 0.41 + 0.7)) +
      0.15 * Math.abs(Math.sin(i * 0.09 + 2.1)) +
      0.10 * Math.abs(Math.sin(i * 0.73 + 0.3))
    ));

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const tracks = [
      { yOffset: 0,    opacity: 0.15, ampScale: 1.0,  numBars: 200, xOffset: 0    },
      { yOffset: 0,    opacity: 0.09, ampScale: 0.7,  numBars: 200, xOffset: 0.1 },
      { yOffset: 0,    opacity: 0.06, ampScale: 0.65, numBars: 100, xOffset: 0.4 },
      { yOffset: 0,    opacity: 0.06, ampScale: 1.5, numBars: 150, xOffset: 0.8 },
    ];

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const cy = height / 2;
      const maxAmp = height * 0.38;

      for (const track of tracks) {
        const tcy = cy + track.yOffset;
        const barW = width / track.numBars;
        // xOffset as a fraction of total width — shifts where bars start
        const xShift = track.xOffset * width;

        // Center line
        ctx.beginPath();
        ctx.strokeStyle = `rgba(128, 0, 0, ${track.opacity * 0.6})`;
        ctx.lineWidth = 0.8;
        ctx.moveTo(0, tcy);
        ctx.lineTo(width, tcy);
        ctx.stroke();

        // Bars — use modulo so shifted bars wrap around and fill the full width
        for (let i = 0; i < track.numBars; i++) {
          const rawX = i * barW + xShift;
          const x = rawX % width; // wrap so xOffset doesn't leave gaps

          const seedIdx = i % MAX_BARS;
          const anim =
            0.8 + 0.2 * Math.sin(time * 1.8 + i * 0.15) *
            Math.sin(time * 0.7 + i * 0.08);
          const amp = seeds[seedIdx] * maxAmp * track.ampScale * anim;

          ctx.fillStyle = `rgba(128, 0, 0, ${track.opacity})`;
          ctx.fillRect(x + 0.5, tcy - amp, barW - 1.5, amp);
          ctx.fillRect(x + 0.5, tcy,       barW - 1.5, amp);
        }
      }

      time += 0.012;
      animFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );
}

export default function ComingSoon() {
  const [email, setEmail]         = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const LOGO_SRC = '/UChicagoONLYLOGOR.png';

  useEffect(() => {
    const l = document.createElement('link');
    l.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=DM+Sans:wght@300;400;500&display=swap';
    l.rel  = 'stylesheet';
    document.head.appendChild(l);
    const favicon = document.createElement('link');
    favicon.rel = 'icon'; favicon.type = 'image/png'; favicon.href = '/UChicagoONLYLOGO.png';
    document.head.appendChild(favicon);
    document.title = 'UChicago Music Business — Coming Soon';
    const meta = document.createElement('meta');
    meta.name = 'description';
    meta.content = 'UChicago Music Business is a pre-professional student organization at the University of Chicago. Serious about the business. Obsessed with the music. Coming Spring 2026.';
    document.head.appendChild(meta);
  }, []);

  const FORM_ID  = '1FAIpQLSftqrgb3SlpsN1S3t2ugCYKvdMxsfx0vuCskY9n9tTMZzWeKw';
  const ENTRY_ID = 'entry.666096683';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch(`https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`, {
        method: 'POST', mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `${ENTRY_ID}=${encodeURIComponent(email)}`,
      });
    } catch { /* no-cors throws but submission goes through */ }
    finally { setLoading(false); setSubmitted(true); }
  };

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { height: 100%; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: none; }
        }
        .l1 { animation: fadeUp  0.9s cubic-bezier(.22,.68,0,1.2) 0.10s both; }
        .l2 { animation: fadeUp  0.9s cubic-bezier(.22,.68,0,1.2) 0.30s both; }
        .dv { animation: fadeIn  1.0s ease                         0.55s both; }
        .fa { animation: fadeUp  0.9s cubic-bezier(.22,.68,0,1.2) 0.65s both; }
        .wm { animation: fadeIn  0.8s ease                         0.05s both; }
        .ct { animation: fadeIn  0.8s ease                         0.80s both; }
        .ei {
          width: 100%; background: transparent; border: none;
          border-bottom: 1.5px solid rgba(28,28,28,0.22);
          padding: 11px 0;
          font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 300;
          color: #1C1C1C; outline: none;
          transition: border-color 0.2s; letter-spacing: 0.02em;
        }
        .ei::placeholder { color: rgba(28,28,28,0.32); }
        .ei:focus { border-bottom-color: #800000; }
        .sb {
          width: 100%; background: #800000; color: #F5F1E8; border: none;
          padding: 14px 24px;
          font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase;
          cursor: pointer; border-radius: 4px;
          transition: background 0.2s, transform 0.15s; margin-top: 18px;
        }
        .sb:hover  { background: #A6192E; transform: translateY(-1px); }
        .sb:active { transform: none; }
      `}</style>

      <div style={{
        minHeight: '100vh', 
        background: '#F5F1E8',
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        // ADJUST THIS VALUE: 80px pushes the visual center down to account for the nav bar
        paddingTop: '80px', 
        paddingBottom: '48px',
        paddingLeft: '16px',
        paddingRight: '16px',
        position: 'relative', 
        overflow: 'hidden',
      }}>
        <AudioWaveformBackground />

        <div style={{
          position: 'relative', zIndex: 1,
          width: '100%', maxWidth: 500, textAlign: 'center',
          padding: '50px 44px',
          background: 'rgba(245,241,232,0.85)',
          backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
          borderRadius: 4, boxShadow: '0 2px 48px rgba(28,28,28,0.09)',
          border: '1px solid rgba(128,0,0,0.1)',
        }}>
          <div className="wm" style={{ marginBottom: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <Image src={LOGO_SRC} alt="UChicago Music Business" width={72} height={72} style={{ objectFit: 'contain' }} />
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 13, fontWeight: 700, color: '#1C1C1C', letterSpacing: '0.06em' }}>UChicago</div>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 10, fontWeight: 600, color: '#800000', letterSpacing: '0.26em', textTransform: 'uppercase', marginTop: -4 }}>Music Business</div>
          </div>

          <h1 className="l1" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(30px, 5.5vw, 60px)', fontWeight: 900, color: '#1C1C1C', lineHeight: 1.08, letterSpacing: '-0.025em', marginBottom: 6 }}>
            Serious about<br />the business.
          </h1>
          <h1 className="l2" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(30px, 5.5vw, 60px)', fontWeight: 900, fontStyle: 'italic', color: '#800000', lineHeight: 1.08, letterSpacing: '-0.025em', marginBottom: 34 }}>
            Obsessed with<br />the music.
          </h1>

          <div className="dv" style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(28,28,28,0.14)' }} />
            <div style={{ display: 'flex', gap: 6 }}>
              {['#800000', '#006D6F', '#A6192E'].map(col => (
                <div key={col} style={{ width: 5, height: 5, borderRadius: '50%', background: col, opacity: 0.7 }} />
              ))}
            </div>
            <div style={{ flex: 1, height: 1, background: 'rgba(28,28,28,0.14)' }} />
          </div>

          <div className="fa">
            {!submitted ? (
              <>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 300, color: '#1C1C1C', opacity: 0.55, letterSpacing: '0.02em', marginBottom: 22, lineHeight: 1.6 }}>
                  Something&apos;s coming. Be the first to know.
                </p>
                <form onSubmit={handleSubmit}>
                  <input className="ei" type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} required />
                  <button className="sb" type="submit" disabled={loading}>
                    {loading ? 'Submitting…' : 'Join Our Listhost!'}
                  </button>
                </form>
              </>
            ) : (
              <div style={{ animation: 'scaleIn 0.5s cubic-bezier(.22,.68,0,1.2) both' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(0,109,111,0.1)', border: '1px solid rgba(0,109,111,0.3)', borderRadius: 6, padding: '14px 24px', marginBottom: 12 }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8l3.5 3.5L13 5" stroke="#006D6F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 500, color: '#006D6F' }}>You&apos;re on the list.</span>
                </div>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: '#1C1C1C', opacity: 0.45 }}>We&apos;ll be in touch soon.</p>
              </div>
            )}
          </div>

          <div className="ct" style={{ marginTop: 40 }}>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#1C1C1C', opacity: 0.25 }}>
              Coming — Spring 2026
            </span>
          </div>
        </div>
      </div>
    </>
  );
}