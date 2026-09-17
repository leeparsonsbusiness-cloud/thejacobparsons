'use client'

import React, { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function MerchPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    setEmail('')
  }

  return (
    <div className="bg-[#050505] min-h-screen text-[#f2f2f2] flex flex-col justify-between overflow-x-hidden">
      <Navbar />

      <main className="relative pt-36 pb-28 px-6 flex-1 flex flex-col items-center justify-center">
        {/* Background Haze */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-white/[0.04] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
          {/* Top Tag */}
          <div className="inline-flex items-center gap-2 border border-white/20 px-3 py-1 bg-[#0e0e0e] font-mono text-[10px] tracking-[0.3em] text-[#888] uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>DROP 001 // TOUR EXCLUSIVE</span>
          </div>

          <h1
            className="text-[clamp(3.5rem,10vw,8rem)] font-black uppercase tracking-tight text-[#f2f2f2] leading-[0.88] shadow-white-text mb-4"
            style={{ fontFamily: 'var(--font-poster)' }}
          >
            HEAVY ROTATION
            <br />
            <span className="text-white">COMING SOON</span>
          </h1>

          <p
            className="text-2xl md:text-3xl text-[#c4c4c4] mb-8"
            style={{ fontFamily: 'var(--font-signature)' }}
          >
            &ldquo;Streetwear cut. Heavyweight cotton. Made for behind the kit.&rdquo;
          </p>

          {/* TOUR MERCH PREVIEW CARD (WORN POSTER STYLE) */}
          <div className="worn-frame max-w-xl mx-auto p-6 md:p-8 relative text-left mb-12">
            <div className="tape-corner-tl" />
            <div className="tape-corner-br" />

            <div className="flex items-center justify-between font-mono text-[10px] text-[#777] pb-3 border-b border-white/10 mb-6">
              <span>SKU: JTD-TEE-001</span>
              <span>LIMITED RELEASE // 250 UNITS</span>
            </div>

            {/* Vintage Tee Mockup Artwork Graphic */}
            <div className="relative aspect-square w-full bg-[#0a0a0a] border border-white/15 flex items-center justify-center p-8 overflow-hidden mb-6 group">
              <div className="absolute inset-0 film-grain-overlay opacity-40 pointer-events-none" />

              {/* Distressed T-shirt Silhouette with Jake The Drummer Graphic */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center">
                <div className="w-36 h-36 md:w-48 md:h-48 border-2 border-dashed border-white/30 rounded-full flex flex-col items-center justify-center p-4 bg-black/60 shadow-[0_0_30px_rgba(0,0,0,0.9)]">
                  <span
                    className="text-2xl md:text-3xl font-black text-white leading-none uppercase"
                    style={{ fontFamily: 'var(--font-poster)' }}
                  >
                    JAKE
                    <br />
                    THE DRUMMER
                  </span>
                  <span className="font-mono text-[9px] text-[#888] tracking-widest mt-2 uppercase">
                    5A HICKORY // SF CA
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#666] uppercase tracking-widest mt-4">
                  [ VINTAGE WASH HEAVYWEIGHT OVERSIZED TEE ]
                </span>
              </div>
            </div>

            {/* Ticket Stub Early Access Form */}
            <div>
              <h3
                className="text-2xl font-black uppercase text-white tracking-wide mb-2"
                style={{ fontFamily: 'var(--font-poster)' }}
              >
                VIP BACKSTAGE DROP LIST
              </h3>
              <p className="font-mono text-xs text-[#888] mb-4">
                Enter your email to unlock 24-hour early access code before the public release goes live.
              </p>

              {submitted ? (
                <div className="border border-white p-4 text-center font-mono text-xs text-white bg-white/5">
                  ✓ ACCESS PASS CONFIRMED. YOU WILL RECEIVE THE DROP LINK FIRST.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER YOUR EMAIL FOR VIP PASS"
                    required
                    className="flex-1 bg-[#050505] border border-white/25 text-white font-mono text-xs px-4 py-3 focus:outline-none focus:border-white transition-colors placeholder:text-[#555]"
                  />
                  <button
                    type="submit"
                    className="bg-white text-black font-mono text-xs font-bold uppercase tracking-widest px-6 py-3 hover:bg-[#d4d4d4] transition-colors cursor-pointer"
                  >
                    GET VIP PASS →
                  </button>
                </form>
              )}
            </div>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-[#888] hover:text-white uppercase tracking-widest border border-white/10 px-4 py-2 hover:border-white/30 transition-all"
          >
            <span>← RETURN TO THE HOME ARENA</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
