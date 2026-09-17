# Jake The Drummer — thejacobparsons.com

Official website for **Jake The Drummer** — heavy-hitting drum covers, 4K first-person POV sessions, and cinematic film productions.

Built with **Next.js 16 (Turbopack)** + **Tailwind CSS v4**, deployed on **Vercel**.

---

## Live Features

- **3D 5A Drumstick Intro Sequence**: Arena stage opener, volumetric spotlight, spinning 3D 5A Hickory stick flying towards the screen, slow motion ember sparkles, letter-by-letter wood burning iron effect, and splintering crack shockwave explosion.
- **Concert LED Flickering Headings**: High-voltage electric stage LED lights effect on main landing heading and footage section.
- **Beat-up / Worn Video Frame**: Viewfinder HUD (`REC ● 4K 60FPS // CH-01`), CRT scanline toggle, and audio waveform meter ready for custom drum footage.
- **Archived Footage**: High-definition video gallery with responsive fullscreen modal player.
- **Song Cover Request Pop-up Modal**: Interactive form allowing fans to submit song suggestions, streaming links, and cover style preferences directly to `parsonsjacob30@gmail.com`.
- **Behind the Kit**: Dramatic performance shot silhouette, artist statement, and gear specifications (5A hickory sticks, birch shells, 4K 60fps chest/head mounts, 24-bit raw stems).
- **Tour Merch Drop (`/merch`)**: Vintage wash heavyweight concert tee mockup preview and VIP backstage ticket stub early access signup.
- **Booking & Collab Production Rider**: Validated project inquiry form forwarding directly to `parsonsjacob30@gmail.com`.

---

## Getting Started

```bash
# Install dependencies
npm install

# Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── submit/route.ts  # Dispatches song requests & inquiries to parsonsjacob30@gmail.com
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage with 3D intro animation
│   ├── globals.css          # Concert LED flicker keyframes & Astroworld grunge styling
│   └── merch/
│       └── page.tsx         # Tour Merch Drop 001 Coming Soon page
├── components/
│   ├── IntroAnimation.tsx   # 3D 5A drumstick arena opener animation
│   ├── Navbar.tsx           # Fixed concert navigation
│   ├── Hero.tsx             # Concert LED lights header & worn video box
│   ├── VideoSection.tsx     # Footage cards & Song Request Pop-up modal
│   ├── AboutSection.tsx     # Behind the kit performance shot & gear specs
│   ├── SocialsSection.tsx   # Instagram / TikTok / Facebook dispatch hub
│   ├── ContactSection.tsx   # Booking & collab production rider form
│   └── Footer.tsx           # Tour poster footer
└── data/
    └── videos.ts            # Video data entries & YouTube IDs
```

---

## How to Update Your Videos

Open [`src/data/videos.ts`](./src/data/videos.ts) and update each entry with your YouTube video IDs and titles:

```ts
{
  id: 'cin-1',
  title: 'Song Name — Drum Cover',
  description: 'Short description',
  youtubeId: 'YOUR_YOUTUBE_VIDEO_ID', // e.g. 'dQw4w9WgXcQ'
  category: 'cinematic', // or 'pov'
},
```

---

## How to Update Social Links

Open [`src/components/SocialsSection.tsx`](./src/components/SocialsSection.tsx) and update each platform's `handle` and `url` fields with your real links.

---

## Deployment (Vercel)

1. Connect your repository `https://github.com/leeparsonsbusiness-cloud/thejacobparsons` on [vercel.com](https://vercel.com).
2. Hit **Deploy** (auto-detected Next.js configuration).
3. In Vercel Project Settings → **Domains** → add `thejacobparsons.com`.
4. Update your DNS records at your domain registrar:
   - **CNAME**: `www` → `cname.vercel-dns.com`
   - **A Record**: `@` → `76.76.21.21`
