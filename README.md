<div align="center">

# Romlerk — Web

**The bilingual landing page for Romlerk, a local-first, AI-assisted todo app.**

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Nuxt](https://img.shields.io/badge/Nuxt-00DC82?style=for-the-badge&logo=nuxtdotjs&logoColor=white)
![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)

</div>

---

## Overview

Romlerk Web is the marketing site for the [Romlerk](https://github.com/RithyBondeth/Romlerk-Mobile) mobile app. It shares the app's blue palette, Ubuntu (English) and Koh Santepheap (Khmer) typography, original blue mascot, and illustrations. It has no analytics and no sign-up backend.

## Features

- **Interactive Today preview:** toggle an example daily plan, get a suggested starting task, and complete or reopen sample tasks.
- **Capture demo** with English and Khmer examples. It is clearly labeled as a demo, not the mobile parser.
- **English and Khmer routes,** all prerendered (`/`, `/privacy`, `/help`, `/about`, and their `/km` versions).
- **Developer page** introducing the creator.
- **GSAP motion:** hero timeline, SVG ink-path drawing, scroll progress, and staggered reveals. All of it respects `prefers-reduced-motion`.
- **Light and dark themes** that follow the OS, with a local override.
- **Accessible, keyboard-friendly** navigation, dialogs, and FAQ.
- **Honest launch states:** missing store links show "Coming soon" instead of broken buttons.

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | Nuxt 4, Vue 3 |
| Language | TypeScript |
| Animation | GSAP |
| Icons | Lucide |
| Hosting | Static generation (`.output/public`) or a Node server |

## Getting Started

### Prerequisites

- Node.js 22 or newer

### Installation

```bash
git clone https://github.com/RithyBondeth/Romlerk-Web.git
cd Romlerk-Web
npm install
npm run dev
```

### Environment Variables

Copy `.env.example` to `.env`. All values are optional.

| Variable | Purpose |
| --- | --- |
| `NUXT_PUBLIC_APP_STORE_URL`, `NUXT_PUBLIC_PLAY_STORE_URL` | Store links (left empty, the site shows "Coming soon") |
| `NUXT_PUBLIC_BETA_URL` | Beta sign-up destination |
| `NUXT_PUBLIC_SUPPORT_EMAIL` | Support contact |
| `NUXT_PUBLIC_DEVELOPER_*` | Developer profile overrides |

These are embedded at generation time, so regenerate after changing them.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run typecheck` | Type-check the project |
| `npm run build` | Build for a Node server |
| `npm run generate` | Generate static output in `.output/public` |
| `npm run preview` | Preview the production build |

## Project Structure

```text
Romlerk-Web/
├── app/
│   ├── components/     # Capture demo, Today preview, phone showcase, FAQ
│   ├── composables/    # Locale and motion helpers
│   ├── locales/        # Khmer translation catalogs
│   └── pages/          # index, about, help, privacy
├── public/             # Fonts, illustrations, branding, developer portrait
└── scripts/            # Branding export tooling
```

## Credits

Illustrations are Open Doodles by Pablo Stanley (CC0), recolored to the Romlerk palette. Font licenses are included in `public/fonts/`.

## Related Repositories

- [Romlerk-Mobile](https://github.com/RithyBondeth/Romlerk-Mobile): the Flutter mobile app

## Author

**Rithy Bondeth** — Full Stack Developer & AI Engineer

[![Portfolio](https://img.shields.io/badge/Portfolio-0A0A0A?style=for-the-badge&logo=vercel&logoColor=white)](https://bondeth.dev)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/RithyBondeth)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/rithy-bondeth-484073282/)
