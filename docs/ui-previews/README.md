# Landing redesign previews

Production screenshots captured on 2026-10-05 from the generated Nuxt site.

- `en-light-desktop.png`: English hero at 1440 × 1000.
- `en-light-features.png`: illustrated feature section at 1440 × 1000.
- `en-dark-desktop.png`: dark English hero at 1440 × 1000.
- `en-light-mobile.png`: English hero at 390 × 844.
- `km-light-mobile.png`: Khmer hero at 390 × 844.

Validation completed: Nuxt typecheck and static generation; all six English/Khmer routes; 320, 390, 768, and 1440px layouts; light/dark themes; task completion and reopening, plan progress, focus suggestion, English/Khmer capture review and save/reset, FAQ disclosures, availability dialog and Escape focus return, mobile menu and anchor offsets. No horizontal overflow or clipped controls was observed at the checked English widths. Reduced motion is respected by the CSS and the existing GSAP media queries; OS preference emulation was not exercised in the browser.

## Developer page and language icon

- `about-en-light-desktop.png`: the developer page and matching language/theme icons, at 1440 × 1000.
- `about-km-light-mobile.png`: the Khmer developer introduction at 390 × 844. Latin text uses Ubuntu alongside Koh Santepheap Khmer glyphs.

The developer introduction uses the name, role, portrait, location, and public links from the user-provided [portfolio](https://bondeth.dev/en). Verified English/Khmer page routes and SEO, language switching with query and hash preservation, navigation from the header/menu/footer, current-page menu closing, light/dark rendering, local portrait loading, and 320/390/768/1440px layouts. Typecheck, static generation, and diff whitespace checks pass.

## Automatic phone showcase

- `showcase-auto-en-light-desktop.png`: overlapping phones with the swipe hint, counter, and small playback control at 1440 × 1000.
- `showcase-auto-en-light-mobile.png`: the same showcase at 390 × 1000, scrolled to the phones.

Four screens: interactive Today, plus actual Upcoming, Notes, and Search screenshots from the redesigned mobile app. Screenshots follow English/Khmer and light/dark themes. All phones follow one continuous GSAP playhead, with rear phones fading to zero before wrapping. Buttonless navigation supports horizontal swipes and keyboard Left/Right/Home/End. The caption shows the current screen and a subtle swipe hint with a screen counter. There are no previous/next buttons or clickable dots below the phones.

Automatic rotation advances once every six seconds when at least 40% of the phones are visible. It stops for mouse hover, keyboard interaction, an active pointer gesture, explicit pause, reduced-motion preferences, hidden pages, or an offscreen showcase. A small pause/resume control sits beside the phones, and Space toggles playback when the carousel has focus. Automatic changes are not announced repeatedly to screen readers; inactive slides remain inert. Manual changes restart the interval. Pointer moves render once per animation frame, with one composed transform per phone and no layout reads.

Verified a timed single automatic advance in 6.9 seconds, pause/resume, stable playback during interaction and offscreen suspension, forward/reverse swipes, wraparound, keyboard navigation, retained Today task state, English/Khmer controls, light/dark themes, and 320px layout without horizontal overflow. Typecheck, static generation, the component detector, and diff whitespace checks pass; no browser errors or warnings. Physical-device touch, background-tab visibility, and OS reduced-motion emulation were not exercised.
