# Romlerk web

Nuxt 4 landing page for the Romlerk mobile app. Shares the app's blue palette, Ubuntu English and Koh Santepheap Khmer typography, original blue mascot, local illustrations, rounded surfaces, and pill buttons. A floating header and responsive illustrated hero introduce a working Today preview with the app's floating navigation style. No analytics or signup backend.

## Run

Node 22 or newer:

```sh
npm install
npm run dev
```

## Verify and build

```sh
npm run typecheck
npm run build
npm run generate
```

Static hosting output is `.output/public`. English routes `/`, `/privacy`, `/help`, and `/about`, and Khmer routes `/km`, `/km/privacy`, `/km/help`, and `/km/about` are prerendered. Use `npm run build` for a Node server instead.

## Launch destinations

Copy `.env.example` to `.env` and provide real app-store links, a beta URL, and a support email when available. These optional public settings are embedded at generation time for static deployments; regenerate after changing them. Without store links, the primary action reads Check availability, and the dialog shows Coming soon and offers the working demo. Configured beta and support destinations appear in the dialog. Pricing and final release compatibility remain explicitly pending. No email addresses are collected.

## Languages

The header’s language icon switches between English and Khmer while preserving the current page, query, and section. Internal links stay in the selected language. The URL determines the language during server rendering, including page titles, descriptions, and accessible labels. A browser preference remembers the selection when returning to the English home entry point; explicit Khmer links always keep Khmer. Storage is optional.

Copy is translated through `app/composables/useLocale.ts`, with English source messages and Khmer catalogs in `app/locales/km.json` and `app/locales/km-landing.json`. The demo can independently show either example language, and follows the site language when it changes. Koh Santepheap is bundled with the site; its license is in `public/fonts/koh-santepheap/OFL.txt`. English uses Ubuntu, with its license in `public/fonts/ubuntu/UFL.txt`.

## Interactive examples

The simplified Today preview lets visitors toggle an example daily plan, request a suggested starting task, and complete/reopen sample tasks. Completed items move into Done today and update plan progress. The capture demo lets visitors choose English or Khmer examples, review a predefined result, and save it in page memory. It is explicitly a demo, not the mobile parser or native AI. Reloading resets the examples.

The site follows the OS color preference; the theme toggle stores an override locally. Navigation, native download dialog, and FAQ disclosures support keyboard interaction. Motion respects reduced-motion preferences.

## Assets and content

Ubuntu and Koh Santepheap are compressed to WOFF2 from the mobile app's bundled fonts, preserving their full glyph sets. Illustrations are adapted from `../romlerk_mobile/assets` and served locally. Illustrations are Open Doodles by Pablo Stanley (CC0); web copies map their accent to blue and outlines to navy. The approved mascot is the original version 2 artwork recolored blue; the favicon and Apple touch icon use the same mascot. Provenance is in `public/illustrations/README.md`. Review the privacy explanation, release availability, copy, links, and Khmer examples before publishing.

## Dependency audit

The current Nuxt development toolchain includes a `node-forge` signature-verification advisory through its `listhen` TLS tooling. At implementation time the npm registry offered no patched version; the audit proposes a Nuxt downgrade. The generated static output contains no Node server or that TLS tooling. Recheck `npm audit` before updating or deploying a Node server.

Motion uses short, consistent easing for buttons, capture results, the mobile menu, FAQs, the download dialog, and the task progress ring. Animations are cancelled on unmount, handle repeated clicks, and respect `prefers-reduced-motion`. The landing page adds a GSAP hero timeline, SVG ink-path drawing, scroll progress, staggered capture/feature reveals, paper-panel scrubbing, and desktop-only narrative heading pinning. `useLandingMotion` scopes and reverts all timelines and triggers on unmount; it refreshes after font loading and content-height changes. Phones and tablets use an unpinned sequence. Reduced motion skips the landing choreography entirely and keeps content visible. Nothing loops continuously, and native scrolling remains in control.

## Developer page

`/about` and `/km/about` introduce Rithy Bondeth with a local portrait, bilingual bio, the Romlerk story, and links to the portfolio, GitHub, and public email from [bondeth.dev](https://bondeth.dev/en). The header, mobile menu, and footer link to this page. Optional `NUXT_PUBLIC_DEVELOPER_*` settings in `.env.example` override the public profile; an empty bio uses the bundled English/Khmer introduction. Regenerate the static output after changing these settings. Portrait provenance is recorded in `public/developer/README.md`.
