# Design system

Warm pastels, crisp surfaces, soft motion. This document is the spec; the
implementation lives in [`public/styles/tokens.css`](../public/styles/tokens.css)
and the living style guide renders at [`/design`](../public/design/index.html).

## Principles

1. **Tokens over values.** Components never use raw hex — only semantic tokens.
   Semantic tokens map to named palette steps (primitives). This is what makes
   light/dark mode a remap instead of a redesign.
2. **Pastel fills, grounded text.** Pastel steps (100–300) are backgrounds and
   fills behind dark text. Text and icons on light backgrounds use the 600–700
   steps so contrast stays WCAG AA.
3. **Warm everywhere.** Neutrals are warm greige (Oat), never pure gray or
   pure black. Shadows are tinted with Oat 900, not black.
4. **60 / 30 / 10.** ~60% neutral backgrounds, ~30% surfaces and text,
   ~10% accent color. Blush leads; Apricot supports; the other pastels are
   garnish (tags, tidbits, illustrations).
5. **Crisp beats floaty.** Subtle shadows, 1px hairline borders, generous
   whitespace on a 4px grid.

## Color palette (primitives)

Figma color-style naming: `Blush/500`, `Oat/100`, etc. Values never change
between themes.

### Blush — primary (pastel pink, reddish undertone)

| Step | Hex | Use |
|---|---|---|
| 50 | `#FFF1F0` | tinted backgrounds |
| 100 | `#FDE2E0` | pastel fills, soft accents |
| 200 | `#FACBC7` | hover on fills |
| 300 | `#F5A9A3` | dark-mode accent, decorative |
| 400 | `#EE867F` | dark-mode buttons, focus ring |
| 500 | `#E36A62` | **brand core** — buttons, highlights |
| 600 | `#C94E46` | button hover, icons on light |
| 700 | `#A63B34` | links / text on light (AA) |
| 800 | `#7C2C27` | deep contrast |
| 900 | `#571F1B` | near-black brand |

### Apricot — secondary (pastel orange)

| Step | Hex |
|---|---|
| 50 | `#FFF6F0` |
| 100 | `#FEE8DA` |
| 200 | `#FCD3B8` |
| 300 | `#F8B48A` |
| 400 | `#F0945E` |
| 500 | `#E1773D` |
| 600 | `#BF5D28` |
| 700 | `#98481F` |
| 800 | `#703517` |
| 900 | `#4E2510` |

### Oat — neutrals (warm greige, rosy cast)

| Step | Hex | Use |
|---|---|---|
| 0 | `#FFFFFF` | light surfaces |
| 50 | `#FAF7F5` | light page background |
| 100 | `#F3EDEA` | subtle sections |
| 200 | `#E6DDD8` | borders |
| 300 | `#D2C5BF` | strong borders |
| 400 | `#AF9F98` | muted text (dark mode) |
| 500 | `#897971` | muted text (light mode) |
| 600 | `#695C55` | secondary text |
| 700 | `#4E443F` | strong borders (dark mode) |
| 800 | `#352E2A` | raised dark surfaces |
| 900 | `#231E1B` | primary text / dark surfaces |
| 950 | `#171310` | dark page background |

### Support pastels — tags, highlights, fun tidbits

Five steps each; 100 is the fill, 700 the text-on-light, 300 the text-on-dark.

| Step | Sage | Sky | Lilac | Butter |
|---|---|---|---|---|
| 100 | `#E4F0E7` | `#E4EFF8` | `#F0EAF9` | `#FBF2D9` |
| 200 | `#C8E1CE` | `#C6DFF0` | `#DFD2F2` | `#F6E4B3` |
| 300 | `#A3CBAD` | `#9FC8E3` | `#C5AFE5` | `#EDCF83` |
| 500 | `#679B76` | `#5F97BF` | `#9678C7` | `#C8A24B` |
| 700 | `#3D6449` | `#386185` | `#614C8C` | `#86682B` |

## Semantic tokens

Figma naming: variables/styles grouped as `bg/*`, `surface/*`, `text/*`,
`accent/*`, `border/*`, `status/*` with a Light and Dark mode per variable.

| Token | Light | Dark | Meaning |
|---|---|---|---|
| `bg/default` | Oat/50 | Oat/950 | page background |
| `bg/subtle` | Oat/100 | Oat/900 | alternate sections |
| `surface/default` | Oat/0 | Oat/900 | cards, panels |
| `surface/hover` | Oat/50 | Oat/800 | hovered surfaces |
| `surface/raised` | Oat/0 | Oat/800 | modals, popovers |
| `border/default` | Oat/200 | Oat/800 | hairlines |
| `border/strong` | Oat/300 | Oat/700 | inputs, emphasis |
| `text/primary` | Oat/900 | Oat/50 | headings, body |
| `text/secondary` | Oat/600 | Oat/300 | supporting text |
| `text/muted` | Oat/500 | Oat/400 | captions, labels |
| `text/on-accent` | Oat/0 | Oat/950 | text on filled buttons |
| `accent/default` | Blush/500 | Blush/400 | buttons, highlights |
| `accent/hover` | Blush/600 | Blush/300 | interactive hover |
| `accent/strong` | Blush/700 | Blush/300 | links, small text |
| `accent/soft` | Blush/100 | Blush/500 @ 18% | pastel fills |
| `accent-2/default` | Apricot/500 | Apricot/400 | secondary accent |
| `accent-2/soft` | Apricot/100 | Apricot/500 @ 16% | secondary fills |
| `focus/ring` | Blush/400 | Blush/300 | keyboard focus |
| `status/success` | Sage/700 | Sage/300 | + soft fill variants |
| `status/info` | Sky/700 | Sky/300 | |
| `status/warning` | Butter/700 | Butter/300 | |
| `status/error` | Blush/700 | Blush/300 | |

Dark-mode rules: background is warm near-black (Oat/950), surfaces step up one
Oat step per elevation level, accents lighten one to two steps, and soft fills
become low-opacity overlays of the 500 step so they read on dark.

## Typography

- **Display / headings / body:** IBM Plex Sans (400, 500, 600, 700, via
  Google Fonts). Plex tops out at 700, so the semibold token maps to 600
  and bold to 700.
- **Code / meta:** IBM Plex Mono (400, 500, 600).

| Style | Size | Weight | Line height | Tracking |
|---|---|---|---|---|
| display | clamp(48–88px) | 700 | 1.15 | −2% |
| h1 / 4xl | clamp(40–56px) | 700 | 1.15 | −2% |
| h2 / 3xl | 36px | 600 | 1.15 | −2% |
| h3 / 2xl | 28px | 600 | 1.15 | — |
| h4 / xl | 22px | 600 | 1.35 | — |
| lead / lg | 18px | 400 | 1.6 | — |
| body / md | 16px | 400 | 1.6 | — |
| small / sm | 14px | 400 | 1.6 | — |
| label / xs | 12px | 600 | 1.35 | +6%, uppercase |

## Spacing, radii, elevation

- **Spacing:** 4px grid — 4, 8, 12, 16, 24, 32, 48, 64, 96. No arbitrary values.
- **Radii:** 6 (chips, inputs) · 10 (buttons) · 16 (cards) · 24 (feature panels) · full (pills).
- **Shadows:** warm-tinted (Oat 900 base, never pure black), three levels
  (`sm`, `md`, `lg`). One elevation step per interaction state.

## Motion

- **Durations:** 150ms (hover) · 250ms (default) · 400ms (entrances).
- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` (decisive ease-out) for
  entrances and hovers; ease-in-out for looping motion.
- **Signature move:** "rise-in" — fade + 12px translate-up on entrances.
- Always honor `prefers-reduced-motion`.

## Theme switching

- Light is the default `:root`; dark applies via `[data-theme="dark"]` or
  system preference (`prefers-color-scheme`) unless the user explicitly chose
  light. The choice persists in `localStorage.theme`.
- Never style a component against `[data-theme]` directly — if a component
  needs a different value per theme, that's a missing semantic token.
