# RECAP — Portfolio OS Design Phase

> **Purpose:** Context handoff for any future session. Read this first to understand
> what exists, the decisions made, and where to continue. It does not replace
> `docs/` and `design/` — it points into them.

---

## What this project is

**Portfolio OS** — a premium creative portfolio for **Carlo Desantis** (filmmaker,
photographer, creative director), built as a browser-based *operating system*, not a
website. Visitors explore the work as if inside Carlo's personal computer. The OS is the
medium; the creative **Projects** are the protagonist.

Three independent experiences (none is a responsive variant of another):
- **Desktop** — macOS-inspired. Primary experience. Cursor-driven.
- **Tablet (iPadOS-inspired)** — touch-first adaptation of the spatial model.
- **Mobile (iOS-inspired)** — completely separate. Lock Screen → Home → Apps.

Source of truth for requirements: the `uploads/mov.carlodesantis/` package
(`docs/`, `design/`, `references/`) plus the master prompt in the first chat message.

---

## What was DELIVERED (current state)

Everything lives in a single Design Component: **`Portfolio OS.dc.html`**.

It is a **live, interactive build** — the design realized as working software that
doubles as the visual source of truth. A top-center **navigator** switches between four
views:

### 1. Desktop (`view: 'desktop'`)
- **Boot sequence** (~1.85s): logo, progress bar, then fade to desktop.
- **Menu Bar** (top, always visible): brand, File/Edit/View/Window/Help, wifi, live date + clock.
- **Widgets** (glass): Clock, Spotify "Now Playing" (spinning vinyl), Quote/Manifesto,
  Recent Projects (clickable → opens Project window), Photos.
- **Desktop folder icons** (right): one per category; click → opens Finder filtered to that category.
- **Dock** (bottom): magnification on pointer-move (`_initDock`), running-app indicator dots,
  bounce animation for non-portfolio apps (Spotify/Instagram/Mail/Figma/Photoshop/DaVinci).
- **Windows** — draggable (header `_startDrag`), focus/z-index stacking (`_focus`), close.
  Four window bodies:
  - **Finder** — sidebar categories + project grid, filterable, live count.
  - **Project** — cover w/ title, intro paragraph, 4-up gallery, credits table, client panel.
  - **Photos** — library sidebar + 3-col photo grid (album "Salt & Iron").
  - **Notes** — read-only viewer (Bio / Manifesto / Philosophy). v1 = no editor.

### 2. Mobile (`view: 'mobile'`)
Phone bezel with Dynamic Island + home indicator. Internal flow state `state.mobile`:
`lock` → (tap) → `home` → (tap app) → `app` (project list) → (tap project) → `project`.
Home has a Now-Playing widget, 8-app grid, page dots, and a 4-icon dock.

### 3. Tablet (`view: 'tablet'`)
iPad bezel, touch toolbar, one floating Finder window, a "Touch Model" info panel
(tap / long-press / drag / pinch — no hover), and a tablet dock.

### 4. Foundations (`view: 'foundations'`)
The **developer-handoff board**. Renders the actual tokens: semantic colors, type scale,
spacing (8px base), radius, elevation/shadows, and **motion** (spring presets + timing tokens
copied exactly from `docs/04_MOTION.md`).

### Tweaks (props)
- `accent` (color) — default `#0A7EFF`.
- `wallpaper` (enum) — `Morning` / `Slate` / `Mono`.

---

## Key design decisions

- **Tokens are honored**: colors, type, spacing, radius, shadow, and motion values map to
  `docs/DESIGN_FOUNDATIONS.md` + `docs/04_MOTION.md`. Spring presets: Default 220/28,
  Large Window 170/24, Dock 300/20, Cursor 420/32. Timings: Micro 120 / Hover 180 /
  Selection 220 / Open 350 / Close 280 / Window 450 / Page 650 ms.
- **Canonical vocabulary** used throughout: Projects, Finder, Windows, Dock, Menu Bar,
  Widgets, Desktop. No synonyms.
- **Imagery = honest placeholders**: project covers are generated HSL gradients tagged with
  `[ CATEGORY 16:9 ]` etc. (per the content/placeholder strategy). Swap for real media later.
- **v1 scope only**: 6 widgets (Spotify, Photos, Notes, Clock, Quote, Recent Projects).
  No Calendar/Weather (v2), no Three.js background (v2), no Dark Mode (v2 — but variables are
  semantically named so a dark theme is a token swap, not a rebuild). Notes is read-only.
- **Originality**: glass/light/depth materials, neutral OS so the work carries the color.
  Not an Apple clone — interpretation, not imitation.

### Placeholder content (invented for the demo, replace with real)
12 projects across Film / Photography / Creative Direction / Music / Fashion / Advertising:
Nocturne, Static Bloom, Salt & Iron, After Hours, Aperture House, Low Frequencies,
Tailored Silence, The Long Drive, Coastlines, Form & Field, Origin, Greyscale.
Notes: Bio, "Light First" manifesto, "On Restraint" philosophy.

---

## Architecture notes (for editing)

- Single DC. Template = view sections gated by `<sc-if>` on `isDesktop / isMobile /
  isTablet / isFoundations`. Logic in `class Component extends DCLogic`.
- **Styling is inline** (DC requirement). Only `@keyframes` / resets live in `<helmet>`.
- Project data: `_projects()` (memoized). `dec(p)` decorates a project with derived
  display fields (meta, cover gradient, gallery, credits).
- **Known gotcha:** do NOT put `animation: fadeIn` on the persistent view wrappers — the
  clock `setState` ticks every second, which restarts the animation and leaves the wrapper
  stuck at `opacity:0`. This bit us once; wrappers now have no entrance animation.
- **Screenshot caveat:** the DOM-to-image screenshot tool renders the glass UI as *blank*
  because it can't handle `backdrop-filter`. The real browser render is correct — verify
  with a true pixel capture (`save_screenshot`), not the inline html-to-image.

---

## Suggested next steps (not yet done)

- Drop in **real media** for project covers / galleries / photos (replace placeholder gradients).
- Window **resize** handles + minimize/restore (open/move/focus/close already work).
- Mobile **swipe** gestures (currently tap-driven).
- Per-app **accent colors** for application windows.
- Export the Foundations board content into `figma/handoff/` token files if a literal
  engineering export is wanted.
