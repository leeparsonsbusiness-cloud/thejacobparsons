// TikTok @jacob.parsons_ Video Archives
// Real TikTok videos from https://www.tiktok.com/@jacob.parsons_

export type VideoCategory = 'cinematic' | 'pov'

export interface Video {
  id: string
  title: string
  subtitle: string
  artist: string
  date: string
  order: number
  description: string
  views: string
  tiktokHandle: string
  tiktokUrl: string
  thumbnail: string
  category: VideoCategory
  bpm?: string
  kitSpecs?: string
  tags: string[]
  youtubeId?: string
}

export const videos: Video[] = [
  // 1. PINNED / 3.4K PLAYS
  {
    id: 'pinned-studio-drum-session',
    title: 'DARK STUDIO DRUM SESSION',
    subtitle: 'Jake_TheDrummer · Pinned Showcase',
    artist: 'Jake Parsons',
    date: 'Pinned',
    order: 1,
    views: '3.4K',
    category: 'cinematic',
    tiktokHandle: '@jacob.parsons_',
    tiktokUrl: 'https://www.tiktok.com/@jacob.parsons_',
    thumbnail: '/images/tiktoks/tiktok_1.png',
    bpm: '150 BPM',
    kitSpecs: '5A Hickory Sticks · Acoustic Kit · Studio Setup',
    tags: ['#drummer', '#drums', '#drumtok', '#drumpov', '#drumcover'],
    description:
      'High-energy studio drum set session with heavy accents, driving tempo, and raw acoustic power. Pinned featured performance on TikTok.',
  },

  // 2. PRACTICE PAD & MESH RIG
  {
    id: 'pov-practice-mesh-rig',
    title: 'POV PRACTICE RIG & RUDIMENTS',
    subtitle: 'Electronic Mesh Kit · POV Cam',
    artist: 'Jake Parsons',
    date: 'Recent',
    order: 2,
    views: '193',
    category: 'pov',
    tiktokHandle: '@jacob.parsons_',
    tiktokUrl: 'https://www.tiktok.com/@jacob.parsons_',
    thumbnail: '/images/tiktoks/tiktok_2.png',
    bpm: '140 BPM',
    kitSpecs: 'Electronic Mesh Pads · 5A Sticks · Practice Setup',
    tags: ['#drumtraining', '#drumpov', '#practicepad', '#drumming'],
    description:
      'First-person POV dialing in stick control, hand speed, and rudiments on the electronic mesh practice pads.',
  },

  // 3. MOUNTAIN CLIFF POV DRUMMING
  {
    id: 'mountain-cliff-pov',
    title: 'MOUNTAIN RIDGE DRUMMING POV',
    subtitle: 'Outdoor Mountain Edge · POV',
    artist: 'Jake Parsons',
    date: 'Recent',
    order: 3,
    views: '195',
    category: 'pov',
    tiktokHandle: '@jacob.parsons_',
    tiktokUrl: 'https://www.tiktok.com/@jacob.parsons_',
    thumbnail: '/images/tiktoks/tiktok_3.png',
    bpm: '145 BPM',
    kitSpecs: 'Acoustic Kit · Mountain Ridge Setup · 5A Hickory Sticks',
    tags: ['#mountaindrums', '#drummer', '#outdoordrums', '#povdrums'],
    description:
      'Playing the acoustic kit perched high on the mountain cliff edge overlooking the valley. Pure outdoor acoustic energy.',
  },

  // 4. AERIAL DRONE // MOUNTAIN JAM
  {
    id: 'mountain-aerial-drone-jam',
    title: 'MOUNTAIN JAM // AERIAL DRONE',
    subtitle: 'Outdoor Band Session · Drone Cam',
    artist: 'Jake Parsons',
    date: 'Recent',
    order: 4,
    views: '87',
    category: 'cinematic',
    tiktokHandle: '@jacob.parsons_',
    tiktokUrl: 'https://www.tiktok.com/@jacob.parsons_',
    thumbnail: '/images/tiktoks/tiktok_4.png',
    bpm: '138 BPM',
    kitSpecs: 'Outdoor Acoustic Kit · Full Band Rig',
    tags: ['#droneshot', '#bandjam', '#mountainjam', '#livemusic'],
    description:
      'Overhead aerial drone shot capturing the full mountain jam session surrounded by open hills, cliffs, and horizon.',
  },

  // 5. ROCK CLUSTER DRUM RIG
  {
    id: 'rock-cluster-mountain-rig',
    title: 'THE MOUNTAIN CLIFF SESSION',
    subtitle: 'Acoustic Kit On The Rocks',
    artist: 'Jake Parsons',
    date: 'Recent',
    order: 5,
    views: '368',
    category: 'cinematic',
    tiktokHandle: '@jacob.parsons_',
    tiktokUrl: 'https://www.tiktok.com/@jacob.parsons_',
    thumbnail: '/images/tiktoks/tiktok_5.png',
    bpm: '152 BPM',
    kitSpecs: 'Acoustic Kit · Outdoor Rock Formation',
    tags: ['#rockdrums', '#outdoorsession', '#drumlife', '#liveperformance'],
    description:
      'Hauling the drum kit up the mountain rocks for a raw acoustic drum take with natural canyon resonance.',
  },

  // 6. LIVE VENUE SHOWCASE (7.1K PLAYS)
  {
    id: 'live-venue-smoke-lights',
    title: 'LIVE VENUE SHOWCASE // 7.1K',
    subtitle: 'Live Concert · 7.1K+ Views',
    artist: 'Jake Parsons',
    date: 'Popular',
    order: 6,
    views: '7.1K',
    category: 'cinematic',
    tiktokHandle: '@jacob.parsons_',
    tiktokUrl: 'https://www.tiktok.com/@jacob.parsons_',
    thumbnail: '/images/tiktoks/tiktok_8.png',
    bpm: '160 BPM',
    kitSpecs: 'Full Stage Rig · Zildjian Cymbals · Venue Sound',
    tags: ['#liveconcert', '#venue', '#stagedrums', '#viral', '#7kviews'],
    description:
      'Full live set in heavy fog and neon purple stage lighting. Jake’s most viewed live performance clip on TikTok with over 7,100 views.',
  },

  // 7. SNARE & TOM TRANSITIONS POV
  {
    id: 'snare-tom-accents-pov',
    title: 'SNARE & TOM ACCENTS // POV',
    subtitle: 'Overhead POV · Studio Rig',
    artist: 'Jake Parsons',
    date: 'Recent',
    order: 7,
    views: '411',
    category: 'pov',
    tiktokHandle: '@jacob.parsons_',
    tiktokUrl: 'https://www.tiktok.com/@jacob.parsons_',
    thumbnail: '/images/tiktoks/tiktok_9.png',
    bpm: '144 BPM',
    kitSpecs: '14" Snare · Rack Toms · 5A Sticks',
    tags: ['#snaredrum', '#tomfills', '#drumming', '#pov'],
    description:
      'Overhead POV perspective locked into fast rimshots, ghost notes, and smooth tom rolls across the kit.',
  },

  // 8. LIVE STAGE PERFORMANCE
  {
    id: 'live-stage-spotlight',
    title: 'LIVE STAGE PERFORMANCE',
    subtitle: 'Live Gig · Spotlight Set',
    artist: 'Jake Parsons',
    date: 'Recent',
    order: 8,
    views: '221',
    category: 'cinematic',
    tiktokHandle: '@jacob.parsons_',
    tiktokUrl: 'https://www.tiktok.com/@jacob.parsons_',
    thumbnail: '/images/tiktoks/tiktok_10.png',
    bpm: '155 BPM',
    kitSpecs: 'Stage Acoustic Kit · Mic’d Up',
    tags: ['#liveshow', '#gig', '#concert', '#livemusic'],
    description:
      'Live stage performance driving the energy and holding down the groove under the venue spotlights.',
  },

  // 9. STAGE READY SOUNDCHECK
  {
    id: 'stage-ready-soundcheck',
    title: 'STAGE READY // SOUNDCHECK',
    subtitle: 'Pre-Show Warmup · Purple Neon',
    artist: 'Jake Parsons',
    date: 'Recent',
    order: 9,
    views: '250',
    category: 'cinematic',
    tiktokHandle: '@jacob.parsons_',
    tiktokUrl: 'https://www.tiktok.com/@jacob.parsons_',
    thumbnail: '/images/tiktoks/tiktok_7.png',
    bpm: '135 BPM',
    kitSpecs: 'Stage Setup · Neon Violet Wash',
    tags: ['#soundcheck', '#preshow', '#drumcheck', '#backstage'],
    description:
      'Dialing in levels and getting locked in behind the kit under purple stage lights before the show.',
  },
]
