# RSO — Music Business Organization Website

A Next.js 14 website for the RSO student organization, built with TypeScript and Tailwind CSS.

## Color Scheme
| Color | Hex | Role |
|-------|-----|------|
| Crimson | `#800000` | Primary brand, CTAs, accents |
| Obsidian | `#1C1C1C` | Background |
| Teal | `#006D6F` | Secondary accent, highlights |
| Cream | `#F5F1E8` | Text, headings |
| Scarlet | `#A6192E` | Tertiary accent, hover states |

## Tech Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Google Fonts**: Playfair Display + DM Sans + DM Mono

---

## Setup Instructions

### Prerequisites
- Node.js 18.17 or later
- npm or yarn

### 1. Install dependencies
```bash
cd rso-website
npm install
```

### 2. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the site.

### 3. Build for production
```bash
npm run build
npm start
```

---

## Project Structure
```
rso-website/
├── app/
│   ├── globals.css        # Global styles, animations, CSS variables
│   ├── layout.tsx         # Root layout + metadata
│   └── page.tsx           # Home page (assembles all sections)
├── components/
│   ├── Navbar.tsx         # Sticky navigation with scroll effect
│   ├── Hero.tsx           # Animated waveform hero section
│   ├── Ticker.tsx         # Scrolling marquee ticker
│   ├── About.tsx          # What is RSO section
│   ├── Mission.tsx        # 4 mission pillars grid
│   ├── Structure.tsx      # Board roles + membership info
│   ├── Events.tsx         # Upcoming events list
│   ├── Join.tsx           # Apply/join CTA section
│   └── Footer.tsx         # Footer with nav + contact
├── public/                # Static assets (add images here)
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── tsconfig.json
```

---

## Customization Guide

### Update content
Each section is its own component in `/components/`. Just edit the data arrays at the top of each file:
- **Events**: Edit the `events` array in `Events.tsx`
- **Board roles**: Edit `boardRoles` in `Structure.tsx`
- **Mission pillars**: Edit `pillars` in `Mission.tsx`

### Update contact info
In `Join.tsx` and `Footer.tsx`, replace:
- `rso@youruniversity.edu` → your actual email
- `@rso.music` → your Instagram handle

### Add a logo
Replace the text "RSO" box in `Navbar.tsx` and `Footer.tsx` with an `<Image>` component pointing to `/public/logo.png`.

### Deploy to Vercel (recommended)
```bash
npm install -g vercel
vercel
```
Or connect your GitHub repo at [vercel.com](https://vercel.com) for auto-deployments.

---

## Pages to Add Later
- `/events` — Full event calendar page
- `/members` — Member portal / login
- `/apply` — Dedicated application form page
- `/speakers` — Past speaker archive
# UchiMBO
