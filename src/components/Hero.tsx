'use client'

import React, { useRef, useEffect } from 'react'

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Ensure smooth autoplay across all desktop and mobile browsers
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true
          videoRef.current.play().catch(() => {})
        }
      })
    }
  }, [])

  return (
    <section className="relative w-full min-h-screen bg-[#050505] flex items-center justify-center px-4 sm:px-6 md:px-10 pt-24 pb-12 select-none overflow-hidden">
      {/* RAW AUTOPLAYING VIDEO — NO WORDS, NO CONTROLS, SMALLER & CONTAINED */}
      <div className="relative w-full max-w-xl sm:max-w-2xl md:max-w-3xl flex items-center justify-center">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          controls={false}
          className="w-full max-h-[65vh] object-contain pointer-events-none select-none rounded shadow-2xl shadow-black/80"
        >
          <source src="/videos/landing-video.mp4" type="video/mp4" />
          <source src="/videos/landing-video.mov" type="video/quicktime" />
        </video>
      </div>
    </section>
  )
}
