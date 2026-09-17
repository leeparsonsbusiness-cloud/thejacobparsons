'use client'

import React, { useState, useEffect } from 'react'
import IntroAnimation from '@/components/IntroAnimation'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import VideoSection from '@/components/VideoSection'
import AboutSection from '@/components/AboutSection'
import SocialsSection from '@/components/SocialsSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function HomePage() {
  const [introActive, setIntroActive] = useState(true)

  useEffect(() => {
    // If intro was already seen in this session, start with site revealed
    if (typeof window !== 'undefined' && sessionStorage.getItem('jake-intro-seen') === '1') {
      setIntroActive(false)
    }
  }, [])

  const handleIntroComplete = () => {
    setIntroActive(false)
  }

  return (
    <div className="bg-[#050505] min-h-screen text-[#f2f2f2] relative overflow-x-hidden selection:bg-white selection:text-black">
      {/* 3D 5A Drumstick Intro Animation */}
      {introActive && (
        <IntroAnimation onComplete={handleIntroComplete} />
      )}

      {/* Main Website Canvas */}
      <div
        className={`transition-opacity duration-500 ${
          !introActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <Navbar />
        <main className="relative">
          <Hero />
          <VideoSection />
          <AboutSection />
          <SocialsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  )
}
