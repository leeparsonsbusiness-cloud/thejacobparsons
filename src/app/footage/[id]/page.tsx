import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { videos, Video } from '@/data/videos'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export function generateStaticParams() {
  return videos.map((v) => ({ id: v.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const video = videos.find((v) => v.id === id)
  if (!video) return { title: 'Video Not Found' }

  return {
    title: `${video.title} | Jake The Drummer`,
    description: video.description,
  }
}

export default async function VideoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const currentIndex = videos.findIndex((v) => v.id === id)

  if (currentIndex === -1) {
    notFound()
  }

  const video = videos[currentIndex]
  const prevVideo = currentIndex > 0 ? videos[currentIndex - 1] : null
  const nextVideo = currentIndex < videos.length - 1 ? videos[currentIndex + 1] : null

  return (
    <div className="bg-[#050505] min-h-screen text-[#f2f2f2] flex flex-col justify-between overflow-x-hidden">
      <Navbar />

      <main className="relative pt-32 pb-24 px-6 max-w-6xl mx-auto w-full">
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center justify-between font-mono text-xs text-[#888]">
          <Link
            href="/#videos"
            className="inline-flex items-center gap-2 hover:text-white transition-colors border border-white/15 px-3 py-1.5 bg-[#090909]"
          >
            <span>←</span>
            <span>RETURN TO VIDEOS</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-white font-bold">
              TAPE 0{video.order} OF 0{videos.length}
            </span>
            <span className="text-[#555]">//</span>
            <span className="uppercase text-[#aaa]">{video.date}</span>
          </div>
        </div>

        {/* Video Header with Concert LED Lights Title */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-[#aaa] uppercase border border-white/20 px-2.5 py-1 mb-3 bg-[#0d0d0d]">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            <span>TIKTOK ARCHIVE: {video.tiktokHandle}</span>
            <span className="text-[#555]">|</span>
            <span>{video.category === 'pov' ? '4K POV CAM' : 'CINEMATIC CUT'}</span>
          </div>

          <h1
            className="text-[clamp(2.5rem,6vw,5rem)] font-black uppercase tracking-tight leading-[0.9] concert-led-text mb-2"
            style={{ fontFamily: 'var(--font-poster)' }}
          >
            {video.title}
          </h1>

          <p className="font-mono text-xs md:text-sm text-[#aaa] tracking-wider uppercase">
            {video.subtitle}
          </p>
        </div>

        {/* The Worn Video Frame */}
        <div className="worn-frame p-2 md:p-3 relative mb-10">
          <div className="tape-corner-tl" />
          <div className="tape-corner-br" />

          <div className="relative aspect-video w-full bg-black overflow-hidden border border-white/15 flex items-center justify-center">
            {/* Embedded Video Player */}
            <iframe
              src={`https://www.youtube.com/embed/${video.youtubeId || 'dQw4w9WgXcQ'}?autoplay=1&rel=0&controls=1`}
              title={video.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Player HUD Footer */}
          <div className="mt-3 px-3 py-2 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-[#888] bg-[#090909] border-t border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-white font-bold uppercase">{video.category.toUpperCase()} UNIT</span>
              <span>•</span>
              <span>{video.bpm || '148 BPM'}</span>
              <span>•</span>
              <span className="text-[#aaa]">{video.kitSpecs || '5A Hickory Sticks'}</span>
            </div>

            <a
              href={video.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-white hover:underline bg-white/10 px-3 py-1 border border-white/20 uppercase text-[10px]"
            >
              <span>WATCH ON TIKTOK</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        {/* Video Notes & Technical Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-8 space-y-4">
            <h3
              className="text-2xl font-black uppercase tracking-wider text-white"
              style={{ fontFamily: 'var(--font-poster)' }}
            >
              TAPE BREAKDOWN &amp; PERFORMANCE NOTES
            </h3>
            <p className="text-base text-[#c4c4c4] leading-relaxed">
              {video.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {video.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] tracking-wider text-[#999] border border-white/15 px-2.5 py-1 bg-[#090909]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Technical Specs Box */}
          <div className="lg:col-span-4 worn-frame p-5 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[10px] text-[#777]">
              <span>SPECIFICATION DATA</span>
              <span>POSTED: {video.date.toUpperCase()}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-[#666]">CREATOR:</span>
              <span className="text-white font-bold">JAKE THE DRUMMER</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#666]">TIKTOK:</span>
              <a
                href={video.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline"
              >
                {video.tiktokHandle}
              </a>
            </div>
            <div className="flex justify-between">
              <span className="text-[#666]">TEMPO:</span>
              <span className="text-white font-bold">{video.bpm}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#666]">FORMAT:</span>
              <span className="text-white font-bold">4K 60FPS</span>
            </div>
          </div>
        </div>

        {/* Previous / Next Tapes Navigation */}
        <div className="border-t border-white/10 pt-8 flex items-center justify-between">
          {prevVideo ? (
            <Link
              href={`/footage/${prevVideo.id}`}
              className="group flex flex-col text-left"
            >
              <span className="font-mono text-[10px] text-[#777] uppercase tracking-widest group-hover:text-white">
                ← PREVIOUS TAPE (0{prevVideo.order})
              </span>
              <span
                className="text-lg md:text-xl font-black uppercase text-[#ddd] group-hover:text-white transition-colors"
                style={{ fontFamily: 'var(--font-poster)' }}
              >
                {prevVideo.title.split('—')[0]}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextVideo ? (
            <Link
              href={`/footage/${nextVideo.id}`}
              className="group flex flex-col text-right"
            >
              <span className="font-mono text-[10px] text-[#777] uppercase tracking-widest group-hover:text-white">
                NEXT TAPE (0{nextVideo.order}) →
              </span>
              <span
                className="text-lg md:text-xl font-black uppercase text-[#ddd] group-hover:text-white transition-colors"
                style={{ fontFamily: 'var(--font-poster)' }}
              >
                {nextVideo.title.split('—')[0]}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
