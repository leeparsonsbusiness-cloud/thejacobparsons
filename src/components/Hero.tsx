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
    <section className="relative w-full h-screen min-h-screen bg-[#050505] overflow-hidden flex items-center justify-center select-none">
      {/* RAW AUTOPLAYING VIDEO — NO WORDS, NO CONTROLS */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        disableRemotePlayback
        controls={false}
        className="w-full h-full object-cover pointer-events-none select-none"
      >
        <source src="/videos/landing-video.mp4" type="video/mp4" />
        <source src="/videos/landing-video.mov" type="video/quicktime" />
      </video>
    </section>
  )
}
