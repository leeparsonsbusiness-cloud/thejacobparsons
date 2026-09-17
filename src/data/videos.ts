// TikTok @jake_thedrummer Video Archives
// Ordered strictly from most recently posted to least recently posted (6 videos)

export type VideoCategory = 'cinematic' | 'pov'

export interface Video {
  id: string
  title: string
  subtitle: string
  artist: string
  date: string
  order: number
  description: string
  tiktokHandle: string
  tiktokUrl: string
  category: VideoCategory
  bpm?: string
  kitSpecs?: string
  tags: string[]
  youtubeId?: string // Fallback / direct video player
}

export const videos: Video[] = [
  // 1. MOST RECENTLY POSTED
  {
    id: 'fein-double-pedal',
    title: 'FE!N — Viral Double Pedal POV Sprint',
    subtitle: 'Travis Scott · Drum Cover',
    artist: 'Travis Scott',
    date: '1 day ago',
    order: 1,
    category: 'pov',
    tiktokHandle: '@jake_thedrummer',
    tiktokUrl: 'https://www.tiktok.com/@jake_thedrummer',
    bpm: '148 BPM',
    kitSpecs: '5A Hickory Sticks · Double Bass Pedal · 14" Birch Snare',
    tags: ['#doublepedal', '#povdrums', '#drumcover', '#fein', '#travisscott'],
    description:
      'Pushing the double kick pedals to maximum velocity on the syncopated trap drop. Recorded in raw 4K headcam POV with zero sample replacement.',
    youtubeId: 'dQw4w9WgXcQ',
  },

  // 2. SECOND MOST RECENT
  {
    id: 'sicko-mode-beat-switch',
    title: 'SICKO MODE — The Beat Switch Breakdown',
    subtitle: 'Travis Scott · Full Cinematic Cover',
    artist: 'Travis Scott',
    date: '4 days ago',
    order: 2,
    category: 'cinematic',
    tiktokHandle: '@jake_thedrummer',
    tiktokUrl: 'https://www.tiktok.com/@jake_thedrummer',
    bpm: '155 BPM',
    kitSpecs: '5A Hickory Sticks · Zildjian Custom Cymbals · Multi-Angle Rig',
    tags: ['#sickomode', '#cinematicdrums', '#beatswitch', '#drummer', '#astroworld'],
    description:
      'Multi-angle cinematic cut catching the iconic beat drop. Full dynamic cymbal chokes, heavy tom accents, and high-energy pacing.',
    youtubeId: 'dQw4w9WgXcQ',
  },

  // 3. THIRD MOST RECENT
  {
    id: 'everlong-hi-hat-stamina',
    title: 'EVERLONG — The 16th Note Hi-Hat Stamina Test',
    subtitle: 'Foo Fighters · Drum Cover',
    artist: 'Foo Fighters',
    date: '1 week ago',
    order: 3,
    category: 'pov',
    tiktokHandle: '@jake_thedrummer',
    tiktokUrl: 'https://www.tiktok.com/@jake_thedrummer',
    bpm: '158 BPM',
    kitSpecs: '5A Wood Tip · 14" Crisp Hi-Hats · Uncompressed 24-bit Audio',
    tags: ['#everlong', '#foofighters', '#drumendurance', '#pov', '#taylorhawkins'],
    description:
      'Pure right-hand endurance test. Unbroken 16th note groove straight from the drum throne POV. Tribute to the legendary Taylor Hawkins.',
    youtubeId: 'dQw4w9WgXcQ',
  },

  // 4. FOURTH MOST RECENT
  {
    id: 'hysteria-bassline-sync',
    title: 'HYSTERIA — High-Speed Bassline Drum Sync',
    subtitle: 'Muse · Drum Cover',
    artist: 'Muse',
    date: '2 weeks ago',
    order: 4,
    category: 'pov',
    tiktokHandle: '@jake_thedrummer',
    tiktokUrl: 'https://www.tiktok.com/@jake_thedrummer',
    bpm: '118 BPM',
    kitSpecs: '5A Sticks · Heavy Ride Cymbal · 4K Chest Mount',
    tags: ['#muse', '#hysteria', '#drumming', '#ghostnotes', '#fastdrums'],
    description:
      'Matching every single note of the iconic distorted fuzz bass line with tight ghost notes and punchy kick drum synchronization.',
    youtubeId: 'dQw4w9WgXcQ',
  },

  // 5. FIFTH MOST RECENT
  {
    id: 'wellerman-double-kick',
    title: 'WELLERMAN — Sea Shanty Heavy Double Kick Remix',
    subtitle: 'Nathan Evans / Remix · Drum Cover',
    artist: 'Nathan Evans',
    date: '3 weeks ago',
    order: 5,
    category: 'cinematic',
    tiktokHandle: '@jake_thedrummer',
    tiktokUrl: 'https://www.tiktok.com/@jake_thedrummer',
    bpm: '135 BPM',
    kitSpecs: 'Dual Kick Pedals · 16" & 18" Floor Toms · Stage Lighting',
    tags: ['#wellerman', '#doublepedal', '#viral', '#remix', '#drumfam'],
    description:
      'Bringing out the double kick pedals and thundering floor toms to turn the viral sea shanty into an arena rock anthem.',
    youtubeId: 'dQw4w9WgXcQ',
  },

  // 6. SIXTH (LEAST RECENT OF THE 6)
  {
    id: 'cherub-rock-snare-dynamics',
    title: 'CHERUB ROCK — Jimmy Chamberlin Snare Dynamics',
    subtitle: 'Smashing Pumpkins · Drum Cover',
    artist: 'Smashing Pumpkins',
    date: '1 month ago',
    order: 6,
    category: 'pov',
    tiktokHandle: '@jake_thedrummer',
    tiktokUrl: 'https://www.tiktok.com/@jake_thedrummer',
    bpm: '144 BPM',
    kitSpecs: '5A Hickory · Vintage Brass Snare · 4K 60FPS Cam',
    tags: ['#smashingpumpkins', '#cherubrock', '#drummerlife', '#groove', '#snare'],
    description:
      'Studying the intricate jazz-rock fusion rolls, ghost notes, and snare dynamics of one of rock’s all-time greatest drummers.',
    youtubeId: 'dQw4w9WgXcQ',
  },
]
