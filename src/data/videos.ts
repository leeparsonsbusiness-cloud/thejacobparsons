// Video data — update these with your actual video IDs and details

export type VideoCategory = 'cinematic' | 'pov'

export interface Video {
  id: string
  title: string
  description: string
  youtubeId?: string
  instagramUrl?: string
  tiktokUrl?: string
  thumbnail?: string
  category: VideoCategory
}

export const videos: Video[] = [
  // ——— CINEMATIC COVERS ———
  {
    id: 'cin-1',
    title: 'Cinematic Cover 1',
    description: 'A cinematic drum cover.',
    youtubeId: 'dQw4w9WgXcQ', // Replace with your actual YouTube video ID
    category: 'cinematic',
  },
  {
    id: 'cin-2',
    title: 'Cinematic Cover 2',
    description: 'Another cinematic drum cover.',
    youtubeId: 'dQw4w9WgXcQ', // Replace with your actual YouTube video ID
    category: 'cinematic',
  },
  {
    id: 'cin-3',
    title: 'Cinematic Cover 3',
    description: 'Yet another cinematic drum cover.',
    youtubeId: 'dQw4w9WgXcQ', // Replace with your actual YouTube video ID
    category: 'cinematic',
  },

  // ——— POV COVERS ———
  {
    id: 'pov-1',
    title: 'POV Cover 1',
    description: 'First-person POV drum session.',
    youtubeId: 'dQw4w9WgXcQ', // Replace with your actual YouTube video ID
    category: 'pov',
  },
  {
    id: 'pov-2',
    title: 'POV Cover 2',
    description: 'Another first-person POV session.',
    youtubeId: 'dQw4w9WgXcQ', // Replace with your actual YouTube video ID
    category: 'pov',
  },
  {
    id: 'pov-3',
    title: 'POV Cover 3',
    description: 'Raw POV drum cam footage.',
    youtubeId: 'dQw4w9WgXcQ', // Replace with your actual YouTube video ID
    category: 'pov',
  },
]
