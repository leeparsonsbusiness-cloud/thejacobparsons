# Jake The Drummer — thejacobparsons.com

Personal website for **Jake The Drummer** — cinematic drum covers, first-person POV sessions, and more.

Built with **Next.js 16** + **Tailwind CSS v4**, deployed on **Vercel**.

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
│   ├── layout.tsx          # Root layout (fonts, metadata)
│   ├── page.tsx            # Homepage (with intro animation)
│   ├── globals.css         # Global styles + Tailwind
│   └── merch/
│       └── page.tsx        # Merch Coming Soon page
├── components/
│   ├── IntroAnimation.tsx  # Cinematic drumstick intro sequence
│   ├── Navbar.tsx          # Fixed navbar with mobile menu
│   ├── Hero.tsx            # Full-screen hero section
│   ├── VideoSection.tsx    # Cinematic + POV video grids
│   ├── AboutSection.tsx    # Bio section
│   ├── SocialsSection.tsx  # Instagram / TikTok / Facebook cards
│   ├── SupportSection.tsx  # Ko-fi / PayPal tip section
│   ├── ContactSection.tsx  # Contact form
│   └── Footer.tsx          # Site footer
└── data/
    └── videos.ts           # ← UPDATE YOUR VIDEO IDs HERE
```

---

## How to Update Your Videos

Open [`src/data/videos.ts`](./src/data/videos.ts) and update each entry with your real YouTube video IDs and titles:

```ts
{
  id: 'cin-1',
  title: 'Song Name — Drum Cover',
  description: 'Short description',
  youtubeId: 'YOUR_YOUTUBE_VIDEO_ID', // e.g. 'dQw4w9WgXcQ'
  category: 'cinematic', // or 'pov'
},
```

The YouTube video ID is the part after `?v=` in the URL. For example:
- `https://youtube.com/watch?v=dQw4w9WgXcQ` → ID is `dQw4w9WgXcQ`

---

## How to Update Social Links

Open [`src/components/SocialsSection.tsx`](./src/components/SocialsSection.tsx) and update each platform's `handle` and `url` fields with your real links.

Same for [`src/components/Footer.tsx`](./src/components/Footer.tsx).

---

## How to Set Up Tips / Support

Open [`src/components/SupportSection.tsx`](./src/components/SupportSection.tsx) and update:
- Ko-fi URL: `https://ko-fi.com/YOUR_USERNAME`
- PayPal.me URL: `https://paypal.me/YOUR_USERNAME`

---

## How to Add Your Photo

In [`src/components/AboutSection.tsx`](./src/components/AboutSection.tsx), replace the placeholder `<div>` with:

```tsx
import Image from 'next/image'

<Image
  src="/your-photo.jpg"
  alt="Jake The Drummer"
  fill
  className="object-cover"
  priority
/>
```

Place your photo in the `public/` directory.

---

## How to Wire Up the Contact Form

The contact form in [`src/components/ContactSection.tsx`](./src/components/ContactSection.tsx) currently logs to console. To make it actually send emails, use **Formspree**:

1. Create a free form at [formspree.io](https://formspree.io)
2. Replace the `onSubmit` handler:

```ts
const onSubmit = async (data: FormData) => {
  await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}
```

---

## Deployment (Vercel)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → import your repo
3. Hit **Deploy** (no config needed — Vercel auto-detects Next.js)
4. In Vercel dashboard → **Settings → Domains** → add `thejacobparsons.com`
5. Update your domain's DNS at your registrar:
   - Add a **CNAME** record: `www` → `cname.vercel-dns.com`
   - Add an **A** record: `@` → `76.76.21.21`

---

## Intro Animation

The cinematic intro plays **once per browser session** (stored in `sessionStorage`). To reset it, clear sessionStorage or open an incognito window.

To disable it entirely, remove `<IntroAnimation ... />` from `src/app/page.tsx`.
