'use client'

import React, { useEffect, useState, useRef } from 'react'

interface IntroAnimationProps {
  onComplete: () => void
}

const LETTERS = 'JAKE THE DRUMMER'.split('')

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  // Animation phases
  // 'black' -> 'spotlight' -> 'flying' -> 'slowmo' -> 'burning' -> 'crack' -> 'shockwave' -> 'complete'
  const [phase, setPhase] = useState<'black' | 'spotlight' | 'flying' | 'slowmo' | 'burning' | 'crack' | 'shockwave' | 'complete'>('black')
  const [stickRotation, setStickRotation] = useState({ x: 25, y: -45, z: -15 })
  const [stickScale, setStickScale] = useState(0.08)
  const [stickZ, setStickZ] = useState(-1800)
  const [stickY, setStickY] = useState(0)
  const [burnedLetterCount, setBurnedLetterCount] = useState(0)
  const [showSparks, setShowSparks] = useState(false)
  const [sparkPos, setSparkPos] = useState({ x: 0, y: 0 })
  const [broken, setBroken] = useState(false)
  const [shockwaveActive, setShockwaveActive] = useState(false)

  const requestRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)



  useEffect(() => {
    // Check if user already saw it in this session
    if (typeof window !== 'undefined' && sessionStorage.getItem('jake-intro-seen') === '1') {
      onComplete()
      return
    }

    startTimeRef.current = performance.now()

    const animateLoop = (now: number) => {
      const elapsed = (now - startTimeRef.current) / 1000 // seconds

      if (elapsed < 0.7) {
        setPhase('black')
      } else if (elapsed >= 0.7 && elapsed < 2.0) {
        setPhase('spotlight')
      } else if (elapsed >= 2.0 && elapsed < 4.4) {
        // Fast flying & spinning phase towards screen
        setPhase('flying')
        const t = (elapsed - 2.0) / 2.4 // 0 to 1
        const easeIn = t * t * t

        setStickScale(0.08 + easeIn * 0.92)
        setStickZ(-1800 + easeIn * 1800)
        setStickRotation({
          x: 25 + t * 720,
          y: -45 + t * 1080,
          z: -15 + t * 540,
        })
        setStickY(Math.sin(t * Math.PI * 4) * 40)
      } else if (elapsed >= 4.4 && elapsed < 5.6) {
        // Enters SLOW MOTION, aligns horizontal in center of spotlight
        setPhase('slowmo')
        setShowSparks(true)
        const t = (elapsed - 4.4) / 1.2
        setStickScale(1.05 + Math.sin(t * Math.PI) * 0.05)
        setStickZ(0)
        // Gently orient to face camera directly
        setStickRotation({
          x: 10 * (1 - t),
          y: 8 * Math.sin(t * Math.PI * 2),
          z: -4 * Math.cos(t * Math.PI),
        })
        setStickY(0)
      } else if (elapsed >= 5.6 && elapsed < 8.0) {
        // WOOD-BURNING IRON EFFECT: traces letters one by one
        setPhase('burning')
        const burnElapsed = elapsed - 5.6
        const totalDuration = 2.4
        const lettersCount = LETTERS.length
        const currentLetterIndex = Math.min(
          lettersCount,
          Math.floor((burnElapsed / totalDuration) * lettersCount) + 1
        )
        setBurnedLetterCount(currentLetterIndex)

        // Calculate burning iron spark tip position across the stick
        const progressX = -170 + (currentLetterIndex / lettersCount) * 340
        setSparkPos({ x: progressX, y: 0 })

        // Floating hover in slowmo
        setStickRotation({
          x: 3 * Math.sin(elapsed * 2),
          y: 4 * Math.cos(elapsed * 1.5),
          z: -2 * Math.sin(elapsed),
        })
      } else if (elapsed >= 8.0 && elapsed < 8.4) {
        // THE CRACK: Stick snaps down the middle!
        setPhase('crack')
        setBroken(true)
        setShowSparks(false)
      } else if (elapsed >= 8.4 && elapsed < 9.6) {
        // THE EXPLOSION & SHOCKWAVE: Text blasts outward
        setPhase('shockwave')
        setShockwaveActive(true)
      } else if (elapsed >= 9.6) {
        // Reveal homepage
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('jake-intro-seen', '1')
        }
        setPhase('complete')
        onComplete()
        return
      }

      requestRef.current = requestAnimationFrame(animateLoop)
    }

    requestRef.current = requestAnimationFrame(animateLoop)

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [onComplete])

  if (phase === 'complete') return null

  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] overflow-hidden select-none flex items-center justify-center">
      {/* Stage Atmosphere: Sweeping Spotlights & Rolling Smoke */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          phase === 'black' ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Main Center Volumetric Spotlight Beam */}
        <div
          className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-[600px] md:w-[900px] h-[160%] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(240, 240, 240, 0.28) 0%, rgba(200, 200, 200, 0.12) 30%, rgba(100, 100, 100, 0.04) 55%, transparent 75%)',
            clipPath: 'polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)',
            filter: 'blur(20px)',
          }}
        />

        {/* Secondary Arena Side Rim Lights */}
        <div
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[800px] pointer-events-none opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(220, 220, 240, 0.2) 0%, transparent 60%)',
            filter: 'blur(40px)',
          }}
        />
        <div
          className="absolute top-[-10%] right-[-10%] w-[500px] h-[800px] pointer-events-none opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(220, 220, 240, 0.2) 0%, transparent 60%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Stadium Fog Drift */}
        <div className="absolute inset-0 opacity-20 pointer-events-none animate-smoke-1">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 65%)',
              filter: 'blur(35px)',
            }}
          />
        </div>
      </div>

      {/* 3D Scene Container */}
      <div
        className="relative w-full h-full flex items-center justify-center pointer-events-none"
        style={{
          perspective: '1400px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        {/* DRUMSTICK MODEL */}
        {(phase === 'flying' || phase === 'slowmo' || phase === 'burning' || phase === 'crack') && (
          <div
            className="relative"
            style={{
              transform: `translate3d(0, ${stickY}px, ${stickZ}px) scale(${stickScale}) rotateX(${stickRotation.x}deg) rotateY(${stickRotation.y}deg) rotateZ(${stickRotation.z}deg)`,
              transformStyle: 'preserve-3d',
              transition: phase === 'slowmo' ? 'all 0.15s ease-out' : 'none',
              filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.95))',
            }}
          >
            {/* If NOT broken, render whole stick */}
            {!broken ? (
              <div className="relative flex items-center justify-center">
                {/* Real 5A Hickory Drumstick Graphic */}
                <svg
                  width="720"
                  height="72"
                  viewBox="0 0 720 72"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="overflow-visible"
                >
                  <defs>
                    {/* Realistic American Hickory Wood Texture Gradient */}
                    <linearGradient id="woodCylinder" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3d2b1f" />
                      <stop offset="12%" stopColor="#8c6a49" />
                      <stop offset="30%" stopColor="#d8b990" />
                      <stop offset="50%" stopColor="#f5dfbe" />
                      <stop offset="70%" stopColor="#c7a477" />
                      <stop offset="90%" stopColor="#7a5839" />
                      <stop offset="100%" stopColor="#302014" />
                    </linearGradient>

                    {/* Lacquer Specular Shine */}
                    <linearGradient id="lacquerShine" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                      <stop offset="40%" stopColor="rgba(255,255,255,0.75)" />
                      <stop offset="55%" stopColor="rgba(255,255,255,0.15)" />
                      <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                    </linearGradient>

                    {/* Acorn Tip 3D Gradient */}
                    <radialGradient id="tipGrad" cx="40%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="#fff2dc" />
                      <stop offset="45%" stopColor="#d8b688" />
                      <stop offset="85%" stopColor="#7e5934" />
                      <stop offset="100%" stopColor="#3d2412" />
                    </radialGradient>
                  </defs>

                  {/* Butt End Cap */}
                  <path
                    d="M 28 24 C 18 24, 18 48, 28 48 Z"
                    fill="#5c4028"
                    stroke="#2a1a0e"
                    strokeWidth="1.5"
                  />

                  {/* Main 5A Stick Shaft: butt at x=28 to neck at x=620 */}
                  <path
                    d="M 28 24 L 540 24 L 640 29 L 685 33 L 685 39 L 640 43 L 540 48 L 28 48 Z"
                    fill="url(#woodCylinder)"
                    stroke="#382415"
                    strokeWidth="1.5"
                  />

                  {/* Lathe & Wood Grain Marks */}
                  <line x1="120" y1="26" x2="120" y2="46" stroke="rgba(70,40,15,0.25)" strokeWidth="1" />
                  <line x1="260" y1="25" x2="260" y2="47" stroke="rgba(70,40,15,0.25)" strokeWidth="1" />
                  <line x1="420" y1="25" x2="420" y2="47" stroke="rgba(70,40,15,0.25)" strokeWidth="1" />
                  <line x1="580" y1="27" x2="580" y2="45" stroke="rgba(70,40,15,0.25)" strokeWidth="1" />

                  {/* Authentic 5A Model Stamp */}
                  <g opacity="0.65">
                    <text
                      x="105"
                      y="39"
                      fill="#221105"
                      fontFamily="Space Mono, monospace"
                      fontSize="9"
                      fontWeight="bold"
                      letterSpacing="2"
                    >
                      5A AMERICAN HICKORY
                    </text>
                  </g>

                  {/* Cylindrical Specular Highlight */}
                  <rect
                    x="28"
                    y="31"
                    width="612"
                    height="4"
                    fill="url(#lacquerShine)"
                    opacity="0.85"
                  />

                  {/* 5A Oval / Acorn Bead (Tip) */}
                  <ellipse cx="698" cy="36" rx="14" ry="9" fill="url(#tipGrad)" />
                </svg>

                {/* BURNED-IN TEXT OVERLAY */}
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  style={{ transform: 'translate(40px, -2px)' }}
                >
                  <div className="flex items-center space-x-[5px]">
                    {LETTERS.map((char, index) => {
                      const isBurned = index < burnedLetterCount
                      const isJustBurning = index === burnedLetterCount - 1 && phase === 'burning'

                      return (
                        <span
                          key={index}
                          style={{
                            fontFamily: 'Bebas Neue, sans-serif',
                            fontSize: '28px',
                            letterSpacing: '0.12em',
                            display: 'inline-block',
                            color: isBurned ? '#0a0502' : 'transparent',
                            textShadow: isBurned
                              ? '0 0 3px #ff3b00, 0 0 10px #ff7700, 1px 1px 1px rgba(0,0,0,0.95)'
                              : 'none',
                            transform: isJustBurning ? 'scale(1.25)' : 'scale(1)',
                            filter: isJustBurning
                              ? 'drop-shadow(0 0 14px #ffbe3b) drop-shadow(0 0 25px #ff4500)'
                              : 'none',
                            transition: 'all 0.1s ease',
                          }}
                        >
                          {char === ' ' ? '\u00A0' : char}
                        </span>
                      )
                    })}
                  </div>
                </div>

                {/* Searing Branding Iron / Fiery Spark Head */}
                {phase === 'burning' && showSparks && (
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      transform: `translate(${sparkPos.x}px, ${sparkPos.y}px)`,
                      transition: 'transform 0.08s linear',
                    }}
                  >
                    {/* Glowing molten tip */}
                    <div className="w-5 h-5 -ml-2.5 -mt-2.5 rounded-full bg-white animate-pulse"
                      style={{
                        boxShadow:
                          '0 0 18px 6px #fff, 0 0 35px 12px #ffbe3b, 0 0 65px 20px #ff3b00',
                      }}
                    />

                    {/* Embers Spraying */}
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full bg-[#ffbe3b]"
                        style={{
                          top: `${(Math.random() - 0.5) * 40}px`,
                          left: `${(Math.random() - 0.5) * 40}px`,
                          opacity: Math.random(),
                          boxShadow: '0 0 8px #ff4500',
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* FRACTURED BROKEN STICK (CRACK PHASE) */
              <div className="relative flex items-center justify-center">
                {/* Left Half Snapping Left */}
                <div
                  className="relative transition-all duration-300"
                  style={{
                    transform: 'translate(-90px, 35px) rotate(-22deg)',
                  }}
                >
                  <svg width="360" height="72" viewBox="0 0 360 72" fill="none">
                    <path
                      d="M 28 24 L 330 24 L 350 32 L 320 38 L 345 44 L 315 48 L 28 48 Z"
                      fill="url(#woodCylinder)"
                      stroke="#382415"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>

                {/* Right Half Snapping Right */}
                <div
                  className="relative transition-all duration-300"
                  style={{
                    transform: 'translate(90px, -35px) rotate(24deg)',
                  }}
                >
                  <svg width="360" height="72" viewBox="0 0 360 72" fill="none">
                    <path
                      d="M 15 24 L 280 29 L 325 33 L 325 39 L 280 43 L 15 48 L 35 42 L 5 36 L 25 30 Z"
                      fill="url(#woodCylinder)"
                      stroke="#382415"
                      strokeWidth="1.5"
                    />
                    <ellipse cx="338" cy="36" rx="14" ry="9" fill="url(#tipGrad)" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SPARKLES / EMBER CLOUD IN SLOWMO */}
        {(phase === 'slowmo' || phase === 'burning') && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {[...Array(24)].map((_, i) => {
              const angle = (i / 24) * Math.PI * 2
              const radius = 180 + (i % 5) * 45
              const x = Math.cos(angle) * radius
              const y = Math.sin(angle) * radius * 0.4
              return (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                    animation: `pulse 1.${(i % 5) + 2}s infinite alternate ease-in-out`,
                  }}
                >
                  {/* Glowing sparkle diamond */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z"
                      fill={i % 2 === 0 ? '#ffbe3b' : '#ffffff'}
                      style={{
                        filter: 'drop-shadow(0 0 6px #ff7700)',
                      }}
                    />
                  </svg>
                </div>
              )
            })}
          </div>
        )}

        {/* THE SHOCKWAVE EXPLOSION & BLASTING TEXT */}
        {shockwaveActive && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Blinding Center Flash */}
            <div
              className="absolute w-[800px] h-[800px] rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(255, 190, 59, 0.6) 25%, rgba(255, 69, 0, 0.25) 50%, transparent 75%)',
                animation: 'shockwaveFlash 1.2s cubic-bezier(0.1, 0.9, 0.2, 1) forwards',
              }}
            />

            {/* Expanding Shockwave Distortion Rings */}
            <div
              className="absolute rounded-full border border-white/80"
              style={{
                animation: 'ringExpand 1.1s cubic-bezier(0.15, 0.85, 0.35, 1) forwards',
              }}
            />
            <div
              className="absolute rounded-full border border-[#ffbe3b]/60"
              style={{
                animation: 'ringExpand 1.3s 0.08s cubic-bezier(0.15, 0.85, 0.35, 1) forwards',
              }}
            />

            {/* Wood Shrapnel & Sparks Flying Outward */}
            {[...Array(32)].map((_, i) => {
              const angle = (i / 32) * Math.PI * 2
              const dist = 320 + (i % 4) * 120
              const tx = Math.cos(angle) * dist
              const ty = Math.sin(angle) * dist
              return (
                <div
                  key={i}
                  className="absolute bg-[#ffbe3b]"
                  style={{
                    width: `${6 + (i % 3) * 4}px`,
                    height: `${3 + (i % 2) * 3}px`,
                    transform: `translate(${tx}px, ${ty}px) rotate(${i * 45}deg)`,
                    boxShadow: '0 0 12px #ff4500',
                    animation: 'particleFly 1s forwards ease-out',
                  }}
                />
              )
            })}

            {/* "JAKE THE DRUMMER" BLASTS OUTWARD LIKE A SHOCKWAVE */}
            <div
              className="relative z-50 text-center"
              style={{
                animation: 'textShockwave 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              }}
            >
              <h1
                className="text-[clamp(3rem,10vw,8.5rem)] font-black uppercase tracking-tight text-[#f5f5f5]"
                style={{
                  fontFamily: 'Bebas Neue, sans-serif',
                  letterSpacing: '0.08em',
                  lineHeight: '0.9',
                  textShadow:
                    '0 0 35px rgba(255, 255, 255, 0.9), 0 0 70px rgba(255, 190, 59, 0.6), 0 10px 40px rgba(0,0,0,0.95)',
                }}
              >
                JAKE THE DRUMMER
              </h1>
              <p
                className="text-xs md:text-sm font-mono tracking-[0.45em] text-[#ffbe3b] uppercase mt-4"
                style={{
                  textShadow: '0 0 12px #ff4500',
                }}
              >
                [ ARENA TOUR // PRODUCTION 2026 ]
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Animation Stylesheet for High Performance Transforms */}
      <style>{`
        @keyframes shockwaveFlash {
          0% { transform: scale(0.1); opacity: 1; }
          40% { opacity: 0.95; }
          100% { transform: scale(2.8); opacity: 0; }
        }

        @keyframes ringExpand {
          0% { width: 40px; height: 40px; opacity: 1; border-width: 8px; }
          100% { width: 1400px; height: 1400px; opacity: 0; border-width: 1px; }
        }

        @keyframes particleFly {
          0% { opacity: 1; transform: translate(0, 0) scale(1); }
          100% { opacity: 0; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) scale(0.2); }
        }

        @keyframes textShockwave {
          0% {
            opacity: 0;
            transform: scale(0.2) translateY(20px);
            filter: blur(14px);
          }
          35% {
            opacity: 1;
            transform: scale(1.15) translateY(-4px);
            filter: blur(0);
          }
          70% {
            opacity: 1;
            transform: scale(1.0) translateY(0);
          }
          100% {
            opacity: 0;
            transform: scale(1.45) translateY(-10px);
            filter: blur(10px);
          }
        }
      `}</style>
    </div>
  )
}
