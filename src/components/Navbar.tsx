'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'FOOTAGE', href: '#footage' },
    { label: 'BEHIND THE KIT', href: '#about' },
    { label: 'MERCH DROP', href: '/merch' },
    { label: 'BOOKING / COLLAB', href: '#contact' },
  ]

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const el = document.querySelector(href)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        setMobileOpen(false)
      }
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050505]/95 backdrop-blur-md border-b border-white/10 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.9)]'
          : 'bg-transparent py-6 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* LOGO ON THE LEFT (Clean branding without placeholder badge) */}
        <Link href="/" className="group flex items-center">
          <span
            className="text-2xl md:text-3xl font-black tracking-wider uppercase text-[#f2f2f2] group-hover:text-white transition-colors"
            style={{ fontFamily: 'var(--font-poster)', letterSpacing: '0.06em' }}
          >
            JAKE THE DRUMMER
          </span>
        </Link>

        {/* NAVIGATION LINKS ON THE RIGHT (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-xs font-mono tracking-[0.2em] text-[#a0a0a0] hover:text-[#f2f2f2] transition-colors uppercase relative group py-1"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-[#f2f2f2] group-hover:w-full transition-all duration-200" />
            </a>
          ))}
        </nav>

        {/* MOBILE HAMBURGER BUTTON */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 border border-white/20 text-[#f2f2f2] hover:border-white transition-colors"
            aria-label="Toggle Navigation"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span
                className={`h-0.5 bg-white transition-all duration-300 ${
                  mobileOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}
              />
              <span
                className={`h-0.5 bg-white transition-all duration-300 ${
                  mobileOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`h-0.5 bg-white transition-all duration-300 ${
                  mobileOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#080808]/98 border-b border-white/15 px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="block text-sm font-mono tracking-widest text-[#d0d0d0] hover:text-white py-2 border-b border-white/5"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <span className="text-[10px] font-mono tracking-widest text-[#666] block">
              THEJACOBPARSONS.COM // PRODUCTION
            </span>
          </div>
        </div>
      )}
    </header>
  )
}
