# Portfolio OS — Carlo Desantis

A premium creative portfolio built as a digital operating system experience.

Desktop (macOS-inspired) · Tablet (iPadOS-inspired) · Mobile (iOS-inspired)

---

## Tech Stack

- [Next.js 16](https://nextjs.org/) — App Router, React Server Components, Turbopack
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/) — strict mode
- [Tailwind CSS v4](https://tailwindcss.com/)
- [pnpm](https://pnpm.io/)

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Documentation

| Directory | Purpose |
|-----------|---------|
| `docs/` | Product Bible — architecture, engineering standards, motion specs |
| `design/` | Creative Bible — visual direction, design system |
| `references/` | Inspiration sources (principles only) |
| `figma/` | Design assets and handoff |

## Project Status

The three device experiences are implemented. The portfolio includes real project
copy in English and Italian; additional original photo/video material is being added.

## Shared portfolio content

Edit `core/registries/projects.ts` to update a project's text, credits, links or
images for Desktop, Tablet and Mobile together. Each case contains English and
Italian copy and one shared media collection. `ProjectStory` renders the complete
case in all three experiences; previews and search use the same localized selectors.

The shared biography is in `core/registries/profile.ts`. English is the landing
language. Omit unconfirmed project years, and keep pre-launch work marked as
`in-progress`. Add real media under `public/images/projects/` with its dimensions
and localized captions; avoid demo work or invented production credits.

Project previews use the same `ProjectArtwork` component in every shell. A case's
`preview` settings define its solid brand background and optical logo size; `cover`
points to a local transparent PNG. Artist photography can use `cover` without
`preview`. Keep logos centered and use approved photography for artist previews. Gallery images can have a `locale` so
Admiral's screenshots and outgoing landing links follow EN/IT together.

Artist galleries marked `mediaLayout: 'editorial'` also populate the shared Photos
library and its albums. Add images to the project once to update the case and
Photos on all three devices. Video previews have local posters and load on play.

Only the detected device shell loads during boot. Wallpapers have AVIF/WebP
variants, and `icons:prepare` generates lossless WebP from the same Retina raster
as the PNG reference. Original SVG masters, animation timings and interactions
remain unchanged.
