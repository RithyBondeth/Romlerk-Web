# Romlerk web

Nuxt 4 landing page for the Romlerk mobile app. Shares the app's warm paper / ink palette, ember accent, bundled Merriweather fonts, illustrations, rounded groups, and pill buttons. No analytics or signup backend.

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

Static hosting output is `.output/public`. The routes `/`, `/privacy`, and `/help` are prerendered. Use `npm run build` for a Node server instead.

## Launch destinations

Copy `.env.example` to `.env` and provide real app-store links, a beta URL, and a support email when available. These optional public settings are embedded at generation time for static deployments; regenerate after changing them. Without destinations, the download dialog shows Coming soon and offers the working demo. No email addresses are collected.

## Interactive examples

The Today preview lets visitors complete/reopen sample tasks. The capture demo lets visitors choose English or Khmer examples, review a predefined result, and save it in page memory. It is explicitly a demo, not the mobile parser or native AI. Reloading resets the examples.

The site follows the OS color preference; the theme toggle stores an override locally. Navigation, native download dialog, and FAQ disclosures support keyboard interaction. Motion respects reduced-motion preferences.

## Assets and content

Fonts are subsetted and compressed to WOFF2 from the bundled Merriweather assets. Illustrations are adapted from `../romlerk_mobile/assets` and served locally. Merriweather's license is in `public/fonts/OFL.txt`. Illustrations are Open Doodles by Pablo Stanley (CC0); web copies map their accent to ember. Provenance is in `public/illustrations/README.md`. Review the privacy explanation, release availability, copy, links, and Khmer examples before publishing.

## Dependency audit

The current Nuxt development toolchain includes a `node-forge` signature-verification advisory through its `listhen` TLS tooling. At implementation time the npm registry offered no patched version; the audit proposes a Nuxt downgrade. The generated static output contains no Node server or that TLS tooling. Recheck `npm audit` before updating or deploying a Node server.

Motion uses short, consistent easing for buttons, capture results, the mobile menu, FAQs, the download dialog, and the task progress ring. Animations are cancelled on unmount, handle repeated clicks, and respect `prefers-reduced-motion`. The hero uses a CSS entrance before hydration; no scroll pinning or continuous animation is used.
