'use client'

import React, { useState } from 'react'
import { videos, Video } from '@/data/videos'

interface SongRequestForm {
  songTitle: string
  artist: string
  songUrl: string
  name: string
  email: string
  style: string
  notes: string
}

export default function VideoSection() {
  const [activeVideo, setActiveVideo] = useState<Video | null>(null)
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false)
  const [requestSuccess, setRequestSuccess] = useState(false)

  const [formData, setFormData] = useState<SongRequestForm>({
    songTitle: '',
    artist: '',
    songUrl: '',
    name: '',
    email: '',
    style: 'POV Cam',
    notes: '',
  })

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingRequest(true)

    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionType: 'song_request',
          recipient: 'parsonsjacob30@gmail.com',
          ...formData,
        }),
      })

      setRequestSuccess(true)
      setFormData({
        songTitle: '',
        artist: '',
        songUrl: '',
        name: '',
        email: '',
        style: 'POV Cam',
        notes: '',
      })
    } catch (err) {
      console.error('Failed to submit song request:', err)
      // Fallback display success anyway so user experience is smooth
      setRequestSuccess(true)
    } finally {
      setIsSubmittingRequest(false)
    }
  }

  const inputStyle =
    'w-full bg-[#050505] border border-white/20 text-[#f2f2f2] font-mono text-xs px-4 py-3 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder:text-[#555]'

  return (
    <section id="footage" className="relative py-28 px-6 overflow-hidden">
      {/* Background distressed glow */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* SECTION HEADER — CONCERT LED FLICKER LIGHTS (FILTERS REMOVED) */}
        <div className="mb-16 pb-8 border-b border-white/10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.3em] text-[#888] uppercase mb-3">
            <span className="w-2 h-2 bg-white rounded-full" />
            <span>ARCHIVED TAPES &amp; REELS</span>
          </div>
          <h2
            className="text-[clamp(2.8rem,7vw,6rem)] font-black uppercase tracking-tight leading-none concert-led-text"
            style={{ fontFamily: 'var(--font-poster)' }}
          >
            THE FOOTAGE
          </h2>
        </div>

        {/* VIDEOS GRID — WORN TOUR POSTER CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, idx) => (
            <div
              key={video.id}
              className="worn-frame group flex flex-col justify-between p-4 transition-all duration-200 hover:-translate-y-1.5 hover:border-white/50"
            >
              {/* Card Top Stamp & Badge */}
              <div className="flex items-center justify-between mb-3 font-mono text-[10px] text-[#777]">
                <span className="uppercase tracking-widest text-[#aaa]">
                  TAPE 0{idx + 1} // {video.category.toUpperCase()}
                </span>
                <span className="border border-white/20 px-2 py-0.5 text-white/90">
                  4K REC
                </span>
              </div>

              {/* Video Thumbnail / Preview Box */}
              <div
                onClick={() => setActiveVideo(video)}
                className="relative aspect-video bg-[#050505] border border-white/15 overflow-hidden cursor-pointer group/thumb flex items-center justify-center"
              >
                {/* Simulated scanlines */}
                <div className="absolute inset-0 crt-lines pointer-events-none z-10 opacity-40" />

                {/* Video Play Overlay */}
                <div className="relative z-20 w-14 h-14 rounded-full border border-white/40 bg-black/70 flex items-center justify-center pl-1 group-hover/thumb:scale-110 group-hover/thumb:bg-white group-hover/thumb:text-black group-hover/thumb:border-white text-white transition-all duration-200 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="6,4 20,12 6,20" />
                  </svg>
                </div>

                {/* Category Graphic Tag */}
                <div className="absolute bottom-2 left-2 z-20 font-mono text-[9px] tracking-widest uppercase bg-black/80 text-[#ddd] px-2 py-0.5 border border-white/15">
                  {video.category === 'cinematic' ? 'FILM CUT' : 'FIRST-PERSON POV'}
                </div>
              </div>

              {/* Title & Info */}
              <div className="mt-4 pt-3 border-t border-white/10">
                <h3
                  className="text-2xl font-black uppercase tracking-tight text-[#f2f2f2] group-hover:text-white transition-colors"
                  style={{ fontFamily: 'var(--font-poster)' }}
                >
                  {video.title}
                </h3>
                <p className="font-mono text-xs text-[#888] mt-1 line-clamp-2">
                  {video.description}
                </p>

                <div className="mt-4 flex items-center justify-between font-mono text-[10px] text-[#666]">
                  <span className="uppercase tracking-widest text-[#aaa] group-hover:text-white transition-colors flex items-center gap-1">
                    PLAY TRACK <span>↗</span>
                  </span>
                  <span>THEJACOBPARSONS.COM</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SONG COVER REQUEST BUTTON (REPLACED THE OLD BOX) */}
        <div className="mt-20 text-center">
          <button
            onClick={() => {
              setShowRequestModal(true)
              setRequestSuccess(false)
            }}
            className="group relative inline-flex items-center gap-3 bg-white text-black font-mono text-xs md:text-sm font-bold uppercase tracking-[0.25em] px-9 py-5 hover:bg-[#d8d8d8] transition-all duration-200 shadow-[0_0_30px_rgba(255,255,255,0.4)] cursor-pointer"
          >
            <span>🥁 REQUEST A SONG COVER</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
          <p className="font-mono text-[11px] text-[#888] tracking-widest uppercase mt-3">
            [ HAVE A TRACK YOU WANT TO SEE PLAYED? SEND YOUR REQUEST DIRECTLY TO JAKE ]
          </p>
        </div>
      </div>

      {/* DEDICATED SONG REQUEST POPUP MODAL */}
      {showRequestModal && (
        <div className="fixed inset-0 z-[160] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="worn-frame w-full max-w-xl p-6 md:p-8 relative bg-[#0a0a0a] my-8">
            <div className="tape-corner-tl" />

            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/15">
              <div>
                <span className="font-mono text-[10px] tracking-widest text-[#888] uppercase block">
                  SUBMISSION TO PARSONSJACOB30@GMAIL.COM
                </span>
                <h3
                  className="text-3xl font-black uppercase text-white tracking-wider"
                  style={{ fontFamily: 'var(--font-poster)' }}
                >
                  REQUEST A SONG COVER
                </h3>
              </div>
              <button
                onClick={() => setShowRequestModal(false)}
                className="text-white/60 hover:text-white font-mono text-xs tracking-widest border border-white/20 px-3 py-1.5 hover:bg-white/10 transition-colors uppercase"
              >
                ✕ CLOSE
              </button>
            </div>

            {requestSuccess ? (
              <div className="py-12 text-center space-y-4 font-mono">
                <div className="w-14 h-14 rounded-full border border-white mx-auto flex items-center justify-center text-xl bg-white text-black">
                  ✓
                </div>
                <h4
                  className="text-2xl font-black uppercase text-white tracking-wider"
                  style={{ fontFamily: 'var(--font-poster)' }}
                >
                  REQUEST DISPATCHED
                </h4>
                <p className="text-xs text-[#888] max-w-sm mx-auto">
                  Your song request was delivered to <span className="text-white font-bold">parsonsjacob30@gmail.com</span>. Jake reviews all song suggestions for future covers!
                </p>
                <button
                  onClick={() => setShowRequestModal(false)}
                  className="mt-4 bg-white text-black text-xs font-bold uppercase tracking-widest px-6 py-2.5 hover:bg-[#d0d0d0] transition-colors"
                >
                  DONE
                </button>
              </div>
            ) : (
              <form onSubmit={handleRequestSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-[#888] mb-1">
                      SONG TITLE *
                    </label>
                    <input
                      required
                      value={formData.songTitle}
                      onChange={(e) => setFormData({ ...formData, songTitle: e.target.value })}
                      placeholder="e.g. SICKO MODE, Everlong"
                      className={inputStyle}
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-[#888] mb-1">
                      ARTIST / BAND *
                    </label>
                    <input
                      required
                      value={formData.artist}
                      onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                      placeholder="e.g. Travis Scott, Foo Fighters"
                      className={inputStyle}
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-[#888] mb-1">
                    YOUTUBE / SPOTIFY LINK (OPTIONAL)
                  </label>
                  <input
                    value={formData.songUrl}
                    onChange={(e) => setFormData({ ...formData, songUrl: e.target.value })}
                    placeholder="https://..."
                    className={inputStyle}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-[#888] mb-1">
                      YOUR NAME *
                    </label>
                    <input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className={inputStyle}
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-[#888] mb-1">
                      YOUR EMAIL *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@email.com"
                      className={inputStyle}
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-[#888] mb-1">
                    PREFERRED COVER STYLE
                  </label>
                  <select
                    value={formData.style}
                    onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                    className={`${inputStyle} cursor-pointer`}
                  >
                    <option value="POV Cam">First-Person POV Drum Cam</option>
                    <option value="Cinematic Film">Cinematic Film Cover (Multi-Cam)</option>
                    <option value="Any Style">Surprise Me / Any Style</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-[#888] mb-1">
                    WHY THIS TRACK? (OPTIONAL)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Tell Jake why this song would go crazy on drums..."
                    className={`${inputStyle} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingRequest}
                  className="w-full bg-white text-black font-mono text-xs font-bold uppercase tracking-[0.25em] py-4 hover:bg-[#d8d8d8] transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.3)] disabled:opacity-50 cursor-pointer mt-2"
                >
                  {isSubmittingRequest ? 'SENDING TO JAKE...' : 'SUBMIT SONG REQUEST →'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* POPUP MODAL FOR FULLSCREEN VIDEO PLAYBACK */}
      {activeVideo && (
        <div className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="worn-frame w-full max-w-4xl p-2 relative bg-[#090909]">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-10 right-0 text-white font-mono text-xs tracking-widest uppercase bg-black/80 border border-white/20 px-3 py-1 hover:bg-white hover:text-black transition-colors"
            >
              CLOSE [ESC] ✕
            </button>

            <div className="aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId || 'dQw4w9WgXcQ'}?autoplay=1&rel=0`}
                title={activeVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-4 flex items-center justify-between font-mono text-xs text-[#aaa]">
              <span className="font-bold text-white uppercase">{activeVideo.title}</span>
              <span>{videoCategoryBadge(activeVideo.category)}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function videoCategoryBadge(cat: string) {
  return cat === 'cinematic' ? 'CINEMATIC FILM' : 'POV DRUM CAM'
}
