'use client'

import React, { useState } from 'react'

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [crtEffect, setCrtEffect] = useState(true)

  return (
    <section className="relative min-h-screen pt-28 pb-20 px-6 flex flex-col justify-center items-center overflow-hidden">
      {/* Background Volumetric Glow & Stage Smoke */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Deep stage backlight */}
        <div
          className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] md:w-[1100px] h-[550px] pointer-events-none opacity-25"
          style={{
            background: 'radial-gradient(ellipse at 50% 30%, rgba(240, 240, 240, 0.22) 0%, rgba(120, 120, 120, 0.08) 45%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
        {/* Drifting Concert Fog Layers */}
        <div className="absolute inset-0 animate-smoke-1 opacity-20 pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.12) 0%, transparent 60%)',
              filter: 'blur(45px)',
            }}
          />
        </div>
        <div className="absolute inset-0 animate-smoke-2 opacity-15 pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: 'radial-gradient(circle at 70% 60%, rgba(255,255,255,0.1) 0%, transparent 65%)',
              filter: 'blur(40px)',
            }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col items-center text-center">
        {/* MAIN TITLE — CONCERT LED LIGHTS FLICKERING */}
        <div className="slam-visible mb-4">
          <h1
            className="text-[clamp(3.8rem,11vw,9.5rem)] font-black uppercase tracking-tight leading-[0.88] select-none concert-led-text"
            style={{
              fontFamily: 'var(--font-poster)',
            }}
          >
            JAKE THE DRUMMER
          </h1>
        </div>

        {/* SUBHEAD */}
        <div className="slam-visible mb-10 max-w-2xl">
          <p className="font-mono text-xs md:text-sm text-[#e0e0e0] tracking-[0.25em] uppercase">
            HEAVYWEIGHT COVERS · 4K FIRST-PERSON POV CAM · FILM PRODUCTIONS
          </p>
        </div>

        {/* THE MAIN VIDEO BOX (WORN, BEAT-UP FRAME WITH ROUGH EDGES) */}
        <div className="slam-visible w-full max-w-4xl relative mt-2">
          {/* Streetwear Duct Tape on Corners */}
          <div className="tape-corner-tl" />
          <div className="tape-corner-br" />

          {/* Rough Worn Frame Container */}
          <div className="worn-frame p-2 md:p-3 relative group overflow-hidden">
            {/* Scratched border accent lines */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Video Player Display Container */}
            <div className="relative aspect-video w-full bg-[#050505] overflow-hidden border border-white/15 flex items-center justify-center">
              {/* Optional CRT Scanline Texture */}
              {crtEffect && <div className="absolute inset-0 crt-lines pointer-events-none z-20 opacity-60" />}

              {/* HUD / Camera Viewfinder Elements */}
              <div className="absolute top-4 left-4 z-30 flex items-center gap-2 font-mono text-[10px] md:text-xs text-white/80 bg-black/70 px-2.5 py-1 border border-white/20">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span>REC ● 4K 60FPS</span>
                <span className="text-[#666]">|</span>
                <span>ISO 800</span>
              </div>

              <div className="absolute top-4 right-4 z-30 flex items-center gap-2 font-mono text-[10px] md:text-xs text-[#aaa] bg-black/70 px-2.5 py-1 border border-white/20">
                <span>[ CH-01 // POV CAM ]</span>
                <button
                  onClick={() => setCrtEffect(!crtEffect)}
                  className="text-white hover:underline text-[9px] ml-1 uppercase"
                >
                  CRT {crtEffect ? 'ON' : 'OFF'}
                </button>
              </div>

              {/* VIDEO EMBED OR PLACEHOLDER SIMULATION */}
              {!isPlaying ? (
                /* Cinematic Placeholder Interface */
                <div className="relative w-full h-full flex flex-col items-center justify-center p-8 bg-[#090909] text-center">
                  {/* Dramatic Atmospheric Visuals */}
                  <div
                    className="absolute inset-0 opacity-40 bg-cover bg-center pointer-events-none"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle at center, rgba(230, 230, 230, 0.25) 0%, rgba(5,5,5,0.95) 75%)',
                    }}
                  />

                  {/* Drum Kit Stylized Silhouette */}
                  <div className="relative z-10 mb-5">
                    <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-dashed border-white/40 flex items-center justify-center bg-black/60 group-hover:scale-105 group-hover:border-white transition-all duration-300">
                      {/* Play Button Icon */}
                      <button
                        onClick={() => setIsPlaying(true)}
                        className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center pl-1 hover:bg-[#eaeaea] hover:scale-110 transition-transform duration-200 shadow-[0_0_25px_rgba(255,255,255,0.6)] cursor-pointer"
                        aria-label="Play Featured Video"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="6,4 20,12 6,20" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="relative z-10">
                    <span className="inline-block px-3 py-1 bg-white/10 font-mono text-xs text-[#ddd] tracking-widest uppercase border border-white/10 mb-2">
                      FEATURED DRUM PERFORMANCE
                    </span>
                    <h2
                      className="text-2xl md:text-4xl font-black uppercase tracking-wide text-white"
                      style={{ fontFamily: 'var(--font-poster)' }}
                    >
                      CLICK TO PREVIEW // DROP VIDEO HERE LATER
                    </h2>
                    <p className="font-mono text-xs text-[#888] max-w-md mx-auto mt-2">
                      [ READY FOR YOUR CUSTOM DRUM VIDEO FILE OR YOUTUBE EMBED ]
                    </p>
                  </div>

                  {/* Audio Waveform Simulation */}
                  <div className="absolute bottom-4 left-6 right-6 z-20 flex items-end justify-center gap-1 h-8 opacity-40">
                    {[35, 60, 20, 85, 45, 95, 70, 40, 100, 65, 80, 30, 90, 50, 75, 25, 60, 85, 40, 100, 55, 30].map(
                      (h, i) => (
                        <div
                          key={i}
                          className="w-1 bg-white"
                          style={{ height: `${h}%` }}
                        />
                      )
                    )}
                  </div>
                </div>
              ) : (
                /* When Playing: Clean High Quality Responsive Video Frame */
                <div className="relative w-full h-full">
                  <iframe
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0&rel=0&controls=1"
                    title="Jake The Drummer Featured Video"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="absolute bottom-3 right-3 z-30 bg-black/80 text-white border border-white/20 px-3 py-1 text-xs font-mono tracking-wider hover:bg-white hover:text-black uppercase"
                  >
                    Close Video
                  </button>
                </div>
              )}
            </div>

            {/* Frame Metadata Footer Bar */}
            <div className="mt-2.5 px-2 flex flex-wrap items-center justify-between gap-2 text-left font-mono text-[10px] md:text-xs text-[#777]">
              <div className="flex items-center gap-2">
                <span className="text-white font-bold tracking-wider">UNIT: 01</span>
                <span>//</span>
                <span>AUDIO SPEC: 24-BIT 96KHZ RAW STEMS</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#bbb]">PRODUCED BY JAKE PARSONS</span>
                <span>•</span>
                <span>5A STICKS // BIRCH SHELLS</span>
              </div>
            </div>
          </div>
        </div>

        {/* QUICK ACTION BUTTONS */}
        <div className="slam-visible mt-12 flex flex-wrap items-center justify-center gap-5">
          <a
            href="#footage"
            className="group relative overflow-hidden bg-white text-black font-mono text-xs font-bold uppercase tracking-[0.25em] px-8 py-4 hover:bg-[#d8d8d8] transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            <span>WATCH ALL FOOTAGE</span>
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
