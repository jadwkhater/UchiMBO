'use client'

import { useEffect, useRef } from 'react'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Animated waveform background
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let time = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const waves = [
        { amp: 30, freq: 0.008, speed: 0.02, color: 'rgba(128,0,0,0.15)', y: 0.5 },
        { amp: 20, freq: 0.012, speed: 0.03, color: 'rgba(0,109,111,0.12)', y: 0.55 },
        { amp: 15, freq: 0.018, speed: 0.025, color: 'rgba(166,25,46,0.1)', y: 0.45 },
      ]

      waves.forEach(({ amp, freq, speed, color, y }) => {
        ctx.beginPath()
        ctx.strokeStyle = color
        ctx.lineWidth = 1.5

        for (let x = 0; x <= canvas.width; x++) {
          const waveY =
            canvas.height * y +
            Math.sin(x * freq + time * speed * 10) * amp +
            Math.sin(x * freq * 0.5 + time * speed * 7) * amp * 0.5

          x === 0 ? ctx.moveTo(x, waveY) : ctx.lineTo(x, waveY)
        }
        ctx.stroke()
      })

      time++
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section
      className="relative min-h-screen flex flex-col justify-end pb-20 px-6 overflow-hidden"
      style={{ background: 'var(--obsidian)' }}
    >
      {/* Canvas waveform */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.8 }}
      />

      {/* Gradient overlays */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 80% 20%, rgba(128,0,0,0.15) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 20% 80%, rgba(0,109,111,0.1) 0%, transparent 55%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-48"
        style={{
          background: 'linear-gradient(to top, var(--obsidian), transparent)',
        }}
      />

      {/* Issue / Vol number — editorial style */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div
          className="flex items-center gap-4 mb-12 opacity-0-init animate-fade-in"
          style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: 'var(--teal)',
              animation: 'pulse-dot 2s ease infinite',
            }}
          />
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: 'var(--teal)', fontFamily: 'DM Mono, monospace' }}
          >
            Est. 2024 — Vol. I
          </span>
        </div>

        {/* Main headline */}
        <h1
          className="text-[clamp(3.5rem,12vw,10rem)] leading-none font-black mb-8 opacity-0-init animate-fade-up"
          style={{
            fontFamily: 'Playfair Display, serif',
            letterSpacing: '-0.02em',
            animationDelay: '0.3s',
            animationFillMode: 'forwards',
          }}
        >
          <span style={{ color: 'var(--cream)' }}>The</span>
          <br />
          <span
            style={{
              background:
                'linear-gradient(135deg, var(--crimson) 0%, var(--scarlet) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Industry
          </span>
          <br />
          <span style={{ color: 'var(--cream)' }}>Awaits.</span>
        </h1>

        {/* Subline + CTA row */}
        <div
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 opacity-0-init animate-fade-up"
          style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
        >
          <p
            className="text-lg md:text-xl max-w-md leading-relaxed"
            style={{ color: 'rgba(245,241,232,0.6)', fontFamily: 'DM Sans, sans-serif' }}
          >
            RSO prepares students for careers in music, entertainment, and beyond —
            through real connections, real knowledge, and real opportunities.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#join"
              className="group flex items-center gap-3 text-sm tracking-widest uppercase px-8 py-4 transition-all duration-300"
              style={{
                background: 'var(--crimson)',
                color: 'var(--cream)',
                fontFamily: 'DM Mono, monospace',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.background = 'var(--scarlet)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.background = 'var(--crimson)'
              }}
            >
              Apply to Join
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </a>
            <a
              href="#about"
              className="text-sm tracking-widest uppercase transition-colors duration-300"
              style={{
                color: 'rgba(245,241,232,0.5)',
                fontFamily: 'DM Mono, monospace',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--cream)')}
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = 'rgba(245,241,232,0.5)')
              }
            >
              Learn More ↓
            </a>
          </div>
        </div>

        {/* Bottom rule */}
        <div
          className="mt-16 h-px opacity-0-init animate-fade-in"
          style={{
            background:
              'linear-gradient(to right, var(--crimson), var(--teal), transparent)',
            animationDelay: '0.8s',
            animationFillMode: 'forwards',
          }}
        />
      </div>
    </section>
  )
}
