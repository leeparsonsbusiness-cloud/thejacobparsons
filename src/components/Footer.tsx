'use client'

import React from 'react'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-[#050505] border-t border-white/10 py-16 px-6 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <span
              className="text-2xl font-black uppercase text-white tracking-wider"
              style={{ fontFamily: 'var(--font-poster)' }}
            >
              JAKE THE DRUMMER
            </span>
            <span className="font-mono text-[10px] text-[#777] border border-white/20 px-2 py-0.5">
              THEJACOBPARSONS.COM
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-6 font-mono text-xs text-[#888]">
          <a href="#footage" className="hover:text-white transition-colors">
            [ FOOTAGE ]
          </a>
          <a href="#about" className="hover:text-white transition-colors">
            [ BEHIND THE KIT ]
          </a>
          <Link href="/merch" className="hover:text-white transition-colors">
            [ TOUR MERCH ]
          </Link>
          <a href="#contact" className="hover:text-white transition-colors">
            [ BOOKING ]
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center md:text-right font-mono text-[10px] text-[#555]">
          <p>© {currentYear} JAKE PARSONS // ALL RIGHTS RESERVED</p>
          <p className="tracking-widest uppercase mt-1">CINEMATIC AUDIO/VISUAL PRODUCTIONS</p>
        </div>
      </div>
    </footer>
  )
}
