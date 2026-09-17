'use client'

import React from 'react'
import Image from 'next/image'

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
              {/* Image Container with Jake Behind the Kit */}
              <div className="relative aspect-[4/5] w-full bg-[#050505] overflow-hidden border border-white/20 flex flex-col justify-between p-4 group">
                {/* Real Photo of Jake behind the kit */}
                <Image
                  src="/images/jake-behind-the-kit.jpg"
                  alt="Jake The Drummer behind the kit"
                  fill
                  priority
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* Subtle vignette gradient so HUD text stands out clearly */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/60 pointer-events-none z-10" />

                {/* Film grain and scratches texture */}
                <div className="absolute inset-0 film-grain-overlay opacity-30 pointer-events-none z-10" />

                {/* Top Corner Technical Stamping */}
                <div className="relative z-20 flex items-center justify-between font-mono text-[10px] text-white/90">
                  <span className="bg-black/80 px-2.5 py-1 border border-white/20 backdrop-blur-sm uppercase">
                    STAGE CAM // ABOUT ME
                  </span>
                  <span className="bg-black/80 px-2.5 py-1 border border-white/20 backdrop-blur-sm uppercase">
                    LIVE REEL
                  </span>
                </div>

                {/* Bottom Frame Stamp */}
                <div className="relative z-20 pt-4 flex items-end justify-between font-mono text-[10px] text-white/90">
                  <div className="bg-black/80 px-3.5 py-2 border border-white/20 backdrop-blur-sm">
                    <span
                      className="block font-black text-white text-base tracking-wider uppercase"
                      style={{ fontFamily: 'var(--font-poster)' }}
                    >
                      JAKE PARSONS
                    </span>
                    <span className="text-[10px] text-[#aaa]">5A HICKORY // BIRCH SHELLS</span>
                  </div>

                  <span className="bg-black/80 px-2.5 py-1.5 border border-white/20 backdrop-blur-sm text-[9px] text-[#bbb] uppercase">
                    THEJACOBPARSONS.COM
                  </span>
                </div>
              </div>

              {/* Photo Caption / Credit Bar */}
              <div className="mt-3 px-2 flex justify-between items-center font-mono text-[10px] text-[#666]">
                <span>ARCHIVE #0926-JP</span>
                <span className="uppercase">THEJACOBPARSONS.COM // PRODUCTION</span>
              </div>
            </div>
          </div>

          {/* EDITORIAL / ASTROWORLD STREETWEAR COPY */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <h2
                className="text-[clamp(2.8rem,7vw,5.5rem)] font-black uppercase tracking-tight text-[#f2f2f2] leading-[0.9] concert-led-text"
                style={{ fontFamily: 'var(--font-poster)' }}
              >
                ABOUT<br />ME
              </h2>
            </div>

            <div className="space-y-5 text-base md:text-lg text-[#b8b8b8] leading-relaxed">
              <p>
                I don&apos;t just record drum covers — I build audio-visual experiences. Every take is treated like a tour opener, engineered to hit you directly in the chest.
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
