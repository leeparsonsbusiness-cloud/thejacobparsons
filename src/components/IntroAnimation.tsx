'use client'

import React, { useEffect, useState, useRef } from 'react'

interface IntroAnimationProps {
  onComplete: () => void
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  // Animation state
  const [phase, setPhase] = useState<'throw' | 'impact' | 'transition' | 'done'>('throw')
  const [stick1, setStick1] = useState({
    x: -180,
    y: -70,
    z: -2600,
    scale: 0.05,
    rx: 20,
    ry: -35,
    rz: -15,
  })
  const [stick2, setStick2] = useState({
    x: 180,
    y: 80,
    z: -2800,
    scale: 0.04,
    rx: -40,
    ry: 45,
    rz: 50,
  })
  const [shake, setShake] = useState({ x: 0, y: 0, r: 0 })
  const [shockwaveScale, setShockwaveScale] = useState(0)
  const [shockwaveOpacity, setShockwaveOpacity] = useState(0)
  const [impactFlash, setImpactFlash] = useState(0)
  const [crackOpacity, setCrackOpacity] = useState(0)
  const [containerOpacity, setContainerOpacity] = useState(1)

  const requestRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)
  const completedRef = useRef(false)

  const handleSkip = () => {
    if (completedRef.current) return
    completedRef.current = true
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('jake-intro-seen', '1')
    }
    setContainerOpacity(0)
    setTimeout(() => {
      onComplete()
    }, 250)
  }

  useEffect(() => {
    // Check if user already saw it in this session
    if (typeof window !== 'undefined' && sessionStorage.getItem('jake-intro-seen') === '1') {
      onComplete()
      return
    }

    startTimeRef.current = performance.now()

    const animate = (now: number) => {
      const elapsed = (now - startTimeRef.current) / 1000 // seconds

      // 1. THROW PHASE (0.0s -> 1.35s) — Sticks hurtle towards screen
      if (elapsed < 1.35) {
        setPhase('throw')
        const t = Math.min(1, elapsed / 1.35)
        // Aggressive cinematic ease-in acceleration (t^2.4)
        const easeIn = Math.pow(t, 2.4)

        // Stick 1 (Left stick, tumbling end-over-end)
        setStick1({
          x: -180 * (1 - easeIn) - 60 * easeIn,
          y: -70 * (1 - easeIn) - 20 * easeIn,
          z: -2600 + easeIn * 2650, // Ends close to screen
          scale: 0.05 + easeIn * 1.35,
          rx: 20 + t * 940,
          ry: -35 + t * 520,
          rz: -15 + t * 760,
        })

        // Stick 2 (Right stick, crossing corkscrew spin)
        setStick2({
          x: 180 * (1 - easeIn) + 40 * easeIn,
          y: 80 * (1 - easeIn) + 30 * easeIn,
          z: -2800 + easeIn * 2850,
          scale: 0.04 + easeIn * 1.4,
          rx: -40 + t * 800,
          ry: 45 + t * 1050,
          rz: 50 - t * 680,
        })
      } 
      // 2. IMPACT MOMENT (1.35s -> 1.75s) — Sticks strike the camera glass!
      else if (elapsed >= 1.35 && elapsed < 1.75) {
        setPhase('impact')
        const impactTime = elapsed - 1.35
        const normImpact = impactTime / 0.4 // 0 to 1

        // Intense camera glass vibration
        const shakeDecay = Math.max(0, 1 - normImpact)
        const freq = impactTime * 70
        setShake({
          x: Math.sin(freq) * 16 * shakeDecay,
          y: Math.cos(freq * 1.3) * 14 * shakeDecay,
          r: Math.sin(freq * 0.7) * 2.5 * shakeDecay,
        })

        // Impact flash (instant spike then smooth falloff)
        setImpactFlash(Math.max(0, 1 - normImpact * 1.6))

        // Crack pattern appears instantly
        setCrackOpacity(1)

        // Radial Shockwave expands outwards
        setShockwaveScale(normImpact * 3.5)
        setShockwaveOpacity(Math.max(0, 1 - normImpact))

        // Sticks violently deflect and bounce off the lens out of view
        setStick1((prev) => ({
          ...prev,
          x: prev.x - normImpact * 280,
          y: prev.y + normImpact * 360,
          z: 80 - normImpact * 400,
          rx: prev.rx + 25,
          rz: prev.rz + 45,
          scale: Math.max(0.2, 1.4 - normImpact * 0.8),
        }))

        setStick2((prev) => ({
          ...prev,
          x: prev.x + normImpact * 300,
          y: prev.y + normImpact * 320,
          z: 80 - normImpact * 420,
          rx: prev.rx - 30,
          rz: prev.rz - 50,
          scale: Math.max(0.2, 1.4 - normImpact * 0.8),
        }))
      } 
      // 3. SEAMLESS DISSOLVE INTO WEBSITE (1.75s -> 2.3s)
      else if (elapsed >= 1.75 && elapsed < 2.3) {
        setPhase('transition')
        const transTime = (elapsed - 1.75) / 0.55 // 0 to 1
        setShake({ x: 0, y: 0, r: 0 })
        setContainerOpacity(Math.max(0, 1 - transTime))
        setCrackOpacity(Math.max(0, 1 - transTime * 1.5))
        setShockwaveOpacity(0)
      } 
      // 4. COMPLETE
      else if (elapsed >= 2.3) {
        if (!completedRef.current) {
          completedRef.current = true
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('jake-intro-seen', '1')
          }
          setPhase('done')
          onComplete()
        }
        return
      }

      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [onComplete])

  if (phase === 'done') return null

  return (
    <div
      className="fixed inset-0 z-[120] bg-[#050505] overflow-hidden select-none flex items-center justify-center transition-opacity duration-300"
      style={{
        opacity: containerOpacity,
        transform: `translate3d(${shake.x}px, ${shake.y}px, 0px) rotate(${shake.r}deg)`,
      }}
    >
      {/* Stadium Atmospheric Backing: Soft Stage Spotlights & Drifting Smoke */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep volumetric center light beam */}
        <div
          className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[700px] md:w-[1000px] h-[150%] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.22) 0%, rgba(200, 200, 200, 0.08) 35%, transparent 70%)',
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)',
            filter: 'blur(30px)',
          }}
        />

        {/* Ambient arena stage rim lights */}
        <div
          className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.18) 0%, transparent 60%)',
            filter: 'blur(50px)',
          }}
        />
        <div
          className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.18) 0%, transparent 60%)',
            filter: 'blur(50px)',
          }}
        />
      </div>

      {/* 3D Flying Drumsticks Viewport */}
      <div
        className="relative w-full h-full flex items-center justify-center pointer-events-none"
        style={{
          perspective: '1100px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        {/* STICK 1 (LEFT THROWN STICK) */}
        <div
          className="absolute"
          style={{
            transform: `translate3d(${stick1.x}px, ${stick1.y}px, ${stick1.z}px) scale(${stick1.scale}) rotateX(${stick1.rx}deg) rotateY(${stick1.ry}deg) rotateZ(${stick1.rz}deg)`,
            transformStyle: 'preserve-3d',
            filter: 'drop-shadow(0 25px 35px rgba(0,0,0,0.9))',
          }}
        >
          <DrumstickGraphic idSuffix="1" />
        </div>

        {/* STICK 2 (RIGHT THROWN STICK) */}
        <div
          className="absolute"
          style={{
            transform: `translate3d(${stick2.x}px, ${stick2.y}px, ${stick2.z}px) scale(${stick2.scale}) rotateX(${stick2.rx}deg) rotateY(${stick2.ry}deg) rotateZ(${stick2.rz}deg)`,
            transformStyle: 'preserve-3d',
            filter: 'drop-shadow(0 25px 35px rgba(0,0,0,0.9))',
          }}
        >
          <DrumstickGraphic idSuffix="2" />
        </div>
      </div>

      {/* IMPACT EFFECTS OVERLAY */}
      {crackOpacity > 0 && (
        <div
          className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-150"
          style={{ opacity: crackOpacity }}
        >
          {/* Procedural Spiderweb Glass Fracture centered at impact */}
          <svg
            className="w-full h-full object-cover"
            viewBox="0 0 1000 1000"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="glassGlint" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Impact Center Point Core */}
            <circle cx="500" cy="500" r="14" fill="#ffffff" filter="url(#glassGlint)" />
            <circle cx="500" cy="500" r="32" fill="rgba(255,255,255,0.4)" filter="url(#glassGlint)" />

            {/* Spiderweb Radial Fractures */}
            <g stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.95" filter="url(#glassGlint)">
              {/* Top-Right major crack */}
              <path d="M500 500 L550 420 L610 370 L700 290 L820 190 L950 110" />
              <path d="M550 420 L640 400 L740 360 L870 330" strokeWidth="1.8" opacity="0.8" />

              {/* Top-Left major crack */}
              <path d="M500 500 L440 410 L380 340 L300 270 L190 190 L70 120" />
              <path d="M440 410 L350 430 L250 420 L130 400" strokeWidth="1.8" opacity="0.8" />

              {/* Bottom-Right major crack */}
              <path d="M500 500 L570 560 L660 630 L760 720 L870 820 L980 930" />
              <path d="M570 560 L680 580 L800 600 L930 630" strokeWidth="1.8" opacity="0.8" />

              {/* Bottom-Left major crack */}
              <path d="M500 500 L430 570 L350 640 L260 740 L160 840 L40 940" />
              <path d="M430 570 L400 680 L360 800 L320 950" strokeWidth="1.8" opacity="0.8" />

              {/* Horizontal & Vertical secondary fissures */}
              <path d="M500 500 L515 370 L505 240 L520 80" strokeWidth="2" opacity="0.85" />
              <path d="M500 500 L485 630 L495 780 L480 960" strokeWidth="2" opacity="0.85" />
              <path d="M500 500 L640 510 L780 495 L950 515" strokeWidth="2" opacity="0.85" />
              <path d="M500 500 L360 490 L220 505 L50 485" strokeWidth="2" opacity="0.85" />

              {/* Concentric Impact Rings (Shock Shatter) */}
              <path
                d="M440 460 Q470 410 520 420 Q570 450 560 510 Q530 570 480 560 Q430 530 440 460 Z"
                fill="rgba(255, 255, 255, 0.12)"
                strokeWidth="2.2"
              />
              <path
                d="M390 420 Q480 340 590 370 Q670 440 640 560 Q580 670 450 640 Q340 570 390 420 Z"
                fill="rgba(255, 255, 255, 0.06)"
                strokeWidth="1.8"
                opacity="0.8"
              />
              <path
                d="M320 370 Q480 260 670 310 Q770 430 730 630 Q630 780 410 730 Q250 630 320 370 Z"
                fill="rgba(255, 255, 255, 0.03)"
                strokeWidth="1.4"
                opacity="0.6"
              />
            </g>
          </svg>
        </div>
      )}

      {/* EXPANDING RADIAL SHOCKWAVE RING */}
      {shockwaveOpacity > 0 && (
        <div
          className="absolute w-72 h-72 rounded-full border-2 border-white pointer-events-none z-40"
          style={{
            transform: `scale(${shockwaveScale})`,
            opacity: shockwaveOpacity,
            boxShadow:
              '0 0 50px 10px rgba(255, 255, 255, 0.8), inset 0 0 30px 10px rgba(255, 255, 255, 0.5)',
          }}
        />
      )}

      {/* FULL-SCREEN IMPACT FLASH */}
      {impactFlash > 0 && (
        <div
          className="absolute inset-0 bg-white pointer-events-none z-50"
          style={{
            opacity: impactFlash,
            transition: 'opacity 0.08s ease-out',
          }}
        />
      )}

      {/* QUICK SKIP BUTTON (Top Right) */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 z-50 font-mono text-[10px] tracking-[0.25em] text-[#888] hover:text-white uppercase border border-white/20 hover:border-white/50 px-3.5 py-1.5 bg-black/60 backdrop-blur-sm transition-all duration-200"
      >
        SKIP INTRO ✕
      </button>
    </div>
  )
}

/**
 * High-detail realistic 5A American Hickory Drumstick SVG
 */
function DrumstickGraphic({ idSuffix }: { idSuffix: string }) {
  return (
    <svg
      width="680"
      height="68"
      viewBox="0 0 680 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="overflow-visible"
    >
      <defs>
        {/* Realistic Hickory Wood Texture Gradient */}
        <linearGradient id={`woodCylinder-${idSuffix}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3d2b1f" />
          <stop offset="12%" stopColor="#8c6a49" />
          <stop offset="30%" stopColor="#d8b990" />
          <stop offset="50%" stopColor="#f5dfbe" />
          <stop offset="70%" stopColor="#c7a477" />
          <stop offset="90%" stopColor="#7a5839" />
          <stop offset="100%" stopColor="#302014" />
        </linearGradient>

        {/* Lacquer Specular Reflection */}
        <linearGradient id={`lacquerShine-${idSuffix}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="40%" stopColor="rgba(255,255,255,0.85)" />
          <stop offset="55%" stopColor="rgba(255,255,255,0.15)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </linearGradient>

        {/* 3D Acorn Tip Gradient */}
        <radialGradient id={`tipGrad-${idSuffix}`} cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#fff2dc" />
          <stop offset="45%" stopColor="#d8b688" />
          <stop offset="85%" stopColor="#7e5934" />
          <stop offset="100%" stopColor="#3d2412" />
        </radialGradient>
      </defs>

      {/* Butt End Cap */}
      <path
        d="M 28 22 C 18 22, 18 46, 28 46 Z"
        fill="#5c4028"
        stroke="#2a1a0e"
        strokeWidth="1.5"
      />

      {/* Main 5A Stick Shaft with Taper */}
      <path
        d="M 28 22 L 510 22 L 605 27 L 648 31 L 648 37 L 605 41 L 510 46 L 28 46 Z"
        fill={`url(#woodCylinder-${idSuffix})`}
        stroke="#382415"
        strokeWidth="1.5"
      />

      {/* Lathe Turning & Rimshot Marks */}
      <line x1="110" y1="24" x2="110" y2="44" stroke="rgba(70,40,15,0.3)" strokeWidth="1" />
      <line x1="240" y1="23" x2="240" y2="45" stroke="rgba(70,40,15,0.3)" strokeWidth="1" />
      <line x1="390" y1="23" x2="390" y2="45" stroke="rgba(70,40,15,0.3)" strokeWidth="1" />
      <line x1="530" y1="25" x2="530" y2="43" stroke="rgba(70,40,15,0.3)" strokeWidth="1" />

      {/* 5A Brand Stamp */}
      <g opacity="0.75">
        <text
          x="100"
          y="37"
          fill="#221105"
          fontFamily="Space Mono, monospace"
          fontSize="9"
          fontWeight="bold"
          letterSpacing="2"
        >
          5A AMERICAN HICKORY // JAKE
        </text>
      </g>

      {/* Lacquer Specular Highlight */}
      <rect
        x="28"
        y="29"
        width="577"
        height="3.5"
        fill={`url(#lacquerShine-${idSuffix})`}
        opacity="0.9"
      />

      {/* 5A Oval Acorn Tip */}
      <ellipse cx="660" cy="34" rx="14" ry="9" fill={`url(#tipGrad-${idSuffix})`} />
    </svg>
  )
}
