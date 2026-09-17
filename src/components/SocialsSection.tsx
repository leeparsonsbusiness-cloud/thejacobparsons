'use client'

import React from 'react'

const socialChannels = [
  {
    platform: 'INSTAGRAM',
    handle: '@jake.the.drummer',
    desc: 'Cinematic reel cuts & behind-the-scenes film shots',
    url: 'https://www.instagram.com/',
    tag: 'REELS / STORIES',
  },
  {
    platform: 'TIKTOK',
    handle: '@jake.the.drummer',
    desc: 'High-energy 4K POV drum cam drops & sound bites',
    url: 'https://www.tiktok.com/',
    tag: 'POV VIRAL CUTS',
  },
  {
    platform: 'FACEBOOK',
    handle: 'Jake The Drummer',
    desc: 'Full-length performance videos & community hub',
    url: 'https://www.facebook.com/',
    tag: 'FULL STREAMS',
  },
]

export default function SocialsSection() {
  return (
    <section className="relative py-28 px-6 overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.3em] text-[#888] uppercase mb-2">
            <span className="w-2 h-2 bg-white rounded-full" />
            <span>GLOBAL BROADCAST NODES</span>
          </div>
          <h2
            className="text-[clamp(2.8rem,7vw,5.5rem)] font-black uppercase tracking-tight text-[#f2f2f2] leading-none shadow-white-text"
            style={{ fontFamily: 'var(--font-poster)' }}
          >
            DISPATCH &amp; SOCIALS
          </h2>
          <p
            className="text-lg md:text-xl text-[#b0b0b0] mt-2"
            style={{ fontFamily: 'var(--font-signature)' }}
          >
            &ldquo;Tune into the frequencies where the drops happen first.&rdquo;
          </p>
        </div>

        {/* Channels Grid — Tour Pass / Merch Tag Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {socialChannels.map((item, idx) => (
            <a
              key={item.platform}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="worn-frame p-6 group flex flex-col justify-between transition-all duration-200 hover:-translate-y-2 hover:border-white/60 relative overflow-hidden"
            >
              {/* Corner Tape Detail */}
              <div className="tape-corner-tl" />

              <div>
                <div className="flex items-center justify-between font-mono text-[10px] text-[#777] mb-4">
                  <span>CHANNEL 0{idx + 1}</span>
                  <span className="border border-white/20 px-2 py-0.5 text-white">
                    {item.tag}
                  </span>
                </div>

                <h3
                  className="text-3xl font-black uppercase tracking-wider text-white group-hover:text-[#eaeaea] transition-colors"
                  style={{ fontFamily: 'var(--font-poster)' }}
                >
                  {item.platform}
                </h3>
                <p className="font-mono text-xs text-[#aaa] mt-1 font-bold">
                  {item.handle}
                </p>
                <p className="font-mono text-xs text-[#777] mt-3 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-white">
                <span className="tracking-widest uppercase font-bold group-hover:underline flex items-center gap-1">
                  JOIN FREQUENCY <span>↗</span>
                </span>
                <span className="text-[#555] text-[10px]">VERIFIED FEED</span>
              </div>
            </a>
          ))}
        </div>

        {/* Marquee Banner */}
        <div className="mt-20 border-y border-white/10 py-4 overflow-hidden select-none bg-[#090909] marquee-continuous-container">
          <div className="marquee-continuous-track flex whitespace-nowrap font-mono text-xs tracking-[0.4em] text-[#888] uppercase">
            {/* Track 1 */}
            <div className="flex shrink-0 items-center">
              {[...Array(4)].map((_, i) => (
                <span key={`t1-${i}`} className="mx-6 flex items-center gap-6">
                  <span className="text-white/90">JAKE THE DRUMMER</span>
                  <span className="text-white/30">·</span>
                  <span>CINEMATIC COVERS</span>
                  <span className="text-white/30">·</span>
                  <span className="text-white/90">4K POV SESSIONS</span>
                  <span className="text-white/30">·</span>
                  <span>5A AMERICAN HICKORY</span>
                  <span className="text-white/30">·</span>
                  <span className="text-white/90">THEJACOBPARSONS.COM</span>
                  <span className="text-white/30">·</span>
                </span>
              ))}
            </div>

            {/* Track 2 (identical duplicate for seamless infinite loop) */}
            <div className="flex shrink-0 items-center" aria-hidden="true">
              {[...Array(4)].map((_, i) => (
                <span key={`t2-${i}`} className="mx-6 flex items-center gap-6">
                  <span className="text-white/90">JAKE THE DRUMMER</span>
                  <span className="text-white/30">·</span>
                  <span>CINEMATIC COVERS</span>
                  <span className="text-white/30">·</span>
                  <span className="text-white/90">4K POV SESSIONS</span>
                  <span className="text-white/30">·</span>
                  <span>5A AMERICAN HICKORY</span>
                  <span className="text-white/30">·</span>
                  <span className="text-white/90">THEJACOBPARSONS.COM</span>
                  <span className="text-white/30">·</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
