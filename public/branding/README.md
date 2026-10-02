# Romlerk doodle logo

`romlerk-doodle-logo-v1.png` is a new transparent PNG logo concept created using the built-in image generation tool. The hand-drawn bell represents reminders; the check represents completing a task. Its warm ink and ember colors follow the existing mobile and web illustrations.

This is a raster concept, not an SVG master. It is saved separately from the existing favicon and brand mark.

## Generation prompt

Use case: logo-brand. Create one original, polished logo SYMBOL for Romlerk, a calm private everyday task and reminder app. The brand already uses playful Open Doodles-style illustrations: confident thick hand-drawn warm-black brush outlines, slightly imperfect curves, expressive simple silhouettes, sparse burnt-orange flat accents, generous negative space. Design a memorable compact reminder bell, gently tilted, with a bold checkmark formed naturally in its center. Use a simple asymmetric organic silhouette and one small curved ringing stroke on either side. The bell is mostly open negative space with warm ink outline #1B1915; a small flat ember #C2542A accent at the top and an ember checkmark. The curves should feel drawn by a human with a marker, consistent with friendly black-and-orange doodle illustrations, yet refined enough for an app icon at small sizes. Transparent background, centered square composition, generous clear padding around the entire symbol. Single logo mark only; NO text, NO wordmark, NO layout sheet, NO mockup, NO shadows, NO gradient, NO 3D, NO photorealism, NO paper texture, NO ornamental tiny details, NO enclosing rounded-square app tile. Clean crisp flat vector-like artwork.

## Applied assets

The approved mascot is version 2. `romlerk-logo.png` is the 512px transparent UI export, and `romlerk-app-icon.png` is its 1024px opaque paper-backed icon. The web header, footer, download dialog and closing section use the UI export. The favicon and Apple touch icon use paper-backed exports so the dark outlines stay readable.

Regenerate on macOS from the web repository root:

```sh
swift scripts/export-branding.swift scripts/branding-exports.json
```

This resamples the approved artwork and adjusts empty margins, without redrawing it. The manifest records the output sizes and padding.
