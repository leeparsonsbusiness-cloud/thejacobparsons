'use client'

import React from 'react'
import { useForm } from 'react-hook-form'

interface FormData {
  name: string
  email: string
  type: string
  budget: string
  message: string
}

export default function ContactSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionType: 'booking_collab',
          recipient: 'parsonsjacob30@gmail.com',
          ...data,
        }),
      })
    } catch (err) {
      console.error('Failed to submit booking inquiry:', err)
    }
    reset()
  }

  const inputStyle =
    'w-full bg-[#080808] border border-white/20 text-[#f2f2f2] font-mono text-xs px-4 py-3.5 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder:text-[#555]'

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden border-t border-white/10">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Rider Overview */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.3em] text-[#888] uppercase mb-2">
                <span className="w-2 h-2 bg-white rounded-full" />
                <span>DIRECT DISPATCH</span>
              </div>
              <h2
                className="text-[clamp(2.8rem,6vw,5rem)] font-black uppercase tracking-tight text-[#f2f2f2] leading-[0.9] shadow-white-text"
                style={{ fontFamily: 'var(--font-poster)' }}
              >
                BOOKING &amp;<br />COLLAB
              </h2>
            </div>

            <p
              className="text-xl text-[#b0b0b0]"
              style={{ fontFamily: 'var(--font-signature)' }}
            >
              &ldquo;Need a heavy drummer on your track, tour, or music video? Let&apos;s talk.&rdquo;
            </p>

            <p className="font-mono text-xs text-[#777] leading-relaxed">
              Available for live sets, studio drum tracking, viral social collabs, and brand partnerships. Send over your vision and timeline.
            </p>


          </div>

          {/* Right Column: Interactive Requisition Form */}
          <div className="lg:col-span-7">
            <div className="worn-frame p-6 md:p-8 relative">
              <div className="tape-corner-tl" />

              <div className="flex items-center justify-between font-mono text-[10px] text-[#777] pb-4 mb-6 border-b border-white/10">
                <span>RIDER FORM // DOC-0926</span>
                <span>ALL FIELDS MONITORED</span>
              </div>

              {isSubmitSuccessful ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full border border-white mx-auto flex items-center justify-center text-2xl bg-white text-black">
                    ✓
                  </div>
                  <h3
                    className="text-3xl font-black uppercase text-white tracking-wider"
                    style={{ fontFamily: 'var(--font-poster)' }}
                  >
                    TRANSMISSION RECEIVED
                  </h3>
                  <p className="font-mono text-xs text-[#888] max-w-sm mx-auto">
                    Your inquiry has been dispatched to <span className="text-white font-bold">parsonsjacob30@gmail.com</span>. Jake will review your details and respond directly to your email.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-[#888] mb-1.5">
                        NAME / ARTIST HANDLE *
                      </label>
                      <input
                        {...register('name', { required: 'Name is required' })}
                        placeholder="e.g. Travis, John, Producer"
                        className={inputStyle}
                      />
                      {errors.name && (
                        <span className="font-mono text-[10px] text-red-400 mt-1 block">
                          {errors.name.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-[#888] mb-1.5">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        {...register('email', {
                          required: 'Email is required',
                          pattern: { value: /^\S+@\S+\.\S+$/, message: 'Valid email required' },
                        })}
                        placeholder="you@domain.com"
                        className={inputStyle}
                      />
                      {errors.email && (
                        <span className="font-mono text-[10px] text-red-400 mt-1 block">
                          {errors.email.message}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Inquiry Type & Project Scope */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-[#888] mb-1.5">
                        INQUIRY TYPE *
                      </label>
                      <select
                        {...register('type', { required: 'Select an inquiry type' })}
                        className={`${inputStyle} cursor-pointer`}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select Project Type
                        </option>
                        <option value="recording">Studio Drum Recording (Remote/Local)</option>
                        <option value="tour">Live Tour / Event Booking</option>
                        <option value="video">Music Video / Brand Collab</option>
                        <option value="other">General / Fan Inquiry</option>
                      </select>
                      {errors.type && (
                        <span className="font-mono text-[10px] text-red-400 mt-1 block">
                          {errors.type.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-[#888] mb-1.5">
                        TIMELINE / DATE
                      </label>
                      <input
                        {...register('budget')}
                        placeholder="e.g. Next month, Summer 2026"
                        className={inputStyle}
                      />
                    </div>
                  </div>

                  {/* Message Body */}
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-[#888] mb-1.5">
                      PROJECT BRIEF &amp; DETAILS *
                    </label>
                    <textarea
                      rows={5}
                      {...register('message', {
                        required: 'Please outline your project',
                        minLength: { value: 10, message: 'Minimum 10 characters' },
                      })}
                      placeholder="Share reference tracks, song links, venue location, or project scope..."
                      className={`${inputStyle} resize-none`}
                    />
                    {errors.message && (
                      <span className="font-mono text-[10px] text-red-400 mt-1 block">
                        {errors.message.message}
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white text-black font-mono text-xs font-bold uppercase tracking-[0.25em] py-4 hover:bg-[#d8d8d8] transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.3)] disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? 'DISPATCHING RIDER...' : 'SUBMIT PRODUCTION RIDER →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
