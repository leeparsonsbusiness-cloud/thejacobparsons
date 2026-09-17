'use client'

import React from 'react'

export default function AboutSection() {
  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden border-t border-white/10">
      {/* Background Stage Fog Accent */}
      <div className="absolute top-1/2 right-[-10%] w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* DRAMATIC PERFORMANCE SHOT (BEHIND THE KIT) */}
          <div className="lg:col-span-6 relative">
            {/* Streetwear Tape Accents */}
            <div className="tape-corner-tl" />
            <div className="tape-corner-br" />

            {/* Worn Poster Frame */}
            <div className="worn-frame p-3 relative group">
              {/* Image Container with Behind-the-Kit Dramatic Stage Shot Simulation */}
              <div className="relative aspect-[4/5] w-full bg-[#050505] overflow-hidden border border-white/20 flex flex-col justify-between p-6">
                {/* Stage Lighting & Atmosphere simulation */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(ellipse at 50% 20%, rgba(255, 255, 255, 0.35) 0%, rgba(180, 180, 180, 0.12) 35%, rgba(10, 10, 10, 0.95) 75%)',
                  }}
                />

                {/* Film grain and scratches texture */}
                <div className="absolute inset-0 film-grain-overlay opacity-60 pointer-events-none" />

                {/* Top Corner Technical Stamping */}
                <div className="relative z-10 flex items-center justify-between font-mono text-[10px] text-[#999]">
                  <span className="bg-black/80 px-2 py-0.5 border border-white/20">
                    STAGE CAM // BEHIND THE KIT
                  </span>
                  <span>ISO 3200 · 1/250s</span>
                </div>

                {/* Dramatic Silhouette of Drummer from Behind the Kit */}
                <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center">
                  {/* Stylized Silhouette Artwork */}
                  <svg
                    width="260"
                    height="200"
                    viewBox="0 0 260 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="opacity-85 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                  >
                    {/* Blinding Stage Light Beam from Center Back */}
                    <circle cx="130" cy="50" r="45" fill="white" opacity="0.45" filter="blur(15px)" />
                    <ellipse cx="130" cy="50" rx="90" ry="25" fill="white" opacity="0.2" filter="blur(20px)" />

                    {/* Ride & Crash Cymbals Lit from Rim */}
                    <ellipse cx="50" cy="85" rx="42" ry="12" fill="#1e1e1e" stroke="#f2f2f2" strokeWidth="2.5" />
                    <ellipse cx="210" cy="85" rx="42" ry="12" fill="#1e1e1e" stroke="#f2f2f2" strokeWidth="2.5" />
                    <ellipse cx="130" cy="115" rx="34" ry="10" fill="#181818" stroke="#f2f2f2" strokeWidth="2" />

                    {/* Drummer Torso & Head Silhouette (Back View) */}
                    <circle cx="130" cy="70" r="18" fill="#080808" stroke="#ffffff" strokeWidth="2" />
                    <path
                      d="M 112 88 C 112 88, 90 130, 90 170 L 170 170 C 170 130, 148 88, 148 88 Z"
                      fill="#080808"
                      stroke="#ffffff"
                      strokeWidth="2"
                    />

                    {/* Raised Drumsticks in Mid-Strike */}
                    <line x1="110" y1="95" x2="65" y2="40" stroke="#f5f5f5" strokeWidth="4" strokeLinecap="round" />
                    <line x1="150" y1="95" x2="195" y2="40" stroke="#f5f5f5" strokeWidth="4" strokeLinecap="round" />

                    {/* Snare & Toms Silhouettes */}
                    <rect x="95" y="145" width="70" height="30" rx="4" fill="#111" stroke="#f2f2f2" strokeWidth="2" />
                    <rect x="40" y="125" width="45" height="25" rx="4" fill="#111" stroke="#e0e0e0" strokeWidth="1.5" />
                    <rect x="175" y="125" width="45" height="25" rx="4" fill="#111" stroke="#e0e0e0" strokeWidth="1.5" />
                  </svg>

                  <p
                    className="text-white text-2xl md:text-3xl mt-4 tracking-wide shadow-white-text"
                    style={{ fontFamily: 'var(--font-signature)' }}
                  >
                    Jake Parsons
                  </p>
                  <p className="font-mono text-[10px] tracking-[0.3em] text-[#888] uppercase mt-1">
                    [ YOU CAN DROP YOUR REAL LIVE CONCERT PHOTO HERE ]
                  </p>
                </div>

                {/* Bottom Frame Stamp */}
                <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between font-mono text-[10px] text-[#aaa]">
                  <span>VENUE: ARENA RUN // LIVE</span>
                  <span>5A HICKORY STICKS</span>
                </div>
              </div>

              {/* Photo Caption / Credit Bar */}
              <div className="mt-3 px-2 flex justify-between items-center font-mono text-[10px] text-[#666]">
                <span>ARCHIVE #0926-JP</span>
                <span className="uppercase">SAN FRANCISCO // THEJACOBPARSONS.COM</span>
              </div>
            </div>
          </div>

          {/* EDITORIAL / ASTROWORLD STREETWEAR COPY */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.3em] text-[#888] uppercase mb-2">
                <span className="w-2 h-2 bg-white rounded-full" />
                <span>ARTIST STATEMENT</span>
              </div>
              <h2
                className="text-[clamp(2.8rem,7vw,5.5rem)] font-black uppercase tracking-tight text-[#f2f2f2] leading-[0.9] shadow-white-text"
                style={{ fontFamily: 'var(--font-poster)' }}
              >
                BEHIND<br />THE KIT
              </h2>
            </div>

            <div className="space-y-5 text-base md:text-lg text-[#b8b8b8] leading-relaxed">
              <p>
                I don’t just record drum covers — I build audio-visual experiences. Every take is treated like a tour opener, engineered to hit you directly in the chest.
              </p>
              <p>
                From cinematic color-graded film productions with multi-angle lighting, to raw, unfiltered 4K first-person POV sessions where you&apos;re sitting right behind the cymbals — the goal is simple: <strong className="text-white font-bold">make you feel every single hit.</strong>
              </p>
            </div>

            {/* HANDWRITTEN SIGNATURE CALLOUT */}
            <div className="p-5 border-l-2 border-white bg-[#0e0e0e] relative">
              <p
                className="text-xl md:text-2xl text-white leading-snug"
                style={{ fontFamily: 'var(--font-signature)' }}
              >
                &ldquo;You hear with your ears, but you feel heavy drumming in your ribs.&rdquo;
              </p>
              <span className="block font-mono text-xs text-[#888] tracking-widest uppercase mt-2">
                — JAKE THE DRUMMER
              </span>
            </div>

            {/* RIG / PRODUCTION SPECS GRID */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-white/10 font-mono">
              <div className="border border-white/10 p-3 bg-[#080808]">
                <span className="block text-[10px] text-[#666] uppercase">STICKS</span>
                <span className="block text-sm font-bold text-white mt-1">5A HICKORY</span>
              </div>
              <div className="border border-white/10 p-3 bg-[#080808]">
                <span className="block text-[10px] text-[#666] uppercase">POV RIG</span>
                <span className="block text-sm font-bold text-white mt-1">4K 60FPS CHEST/HEAD</span>
              </div>
              <div className="border border-white/10 p-3 bg-[#080808] col-span-2 md:col-span-1">
                <span className="block text-[10px] text-[#666] uppercase">AUDIO</span>
                <span className="block text-sm font-bold text-white mt-1">RAW 24-BIT STEMS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
