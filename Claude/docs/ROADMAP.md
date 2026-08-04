# ROADMAP.md — Development Roadmap

> **Version:** 2.0
> **Status:** Pre-Production
> **Last Reviewed:** 2026-06-29

---

## Purpose

This document defines the phased development plan for Portfolio OS.

Phases are ordered by dependency — each phase is a prerequisite for the next. No phase should begin until its predecessor has met its exit criteria.

---

## MVP Definition

The shippable v1 of Portfolio OS consists of Phases 0 through 6. It includes:

- A functional macOS-inspired Desktop with Dock, Menu Bar, Widgets, and Desktop Icons
- A working Window Manager with drag, resize, minimize, maximize, focus management
- Finder with folder navigation and project grid
- At least one complete project category displayed from the content layer
- Photos application with at least one album
- Notes application with biography and manifesto
- Spotify Widget (mock data acceptable for launch)
- Full keyboard navigation and screen reader support
- Performance: Lighthouse 95+ across all categories
- Deployed to Vercel

Mobile and Tablet experiences are explicitly v2 scope unless development capacity allows otherwise.

---

## Phase 0 — Foundation

**Goal:** A running Next.js project with the full architecture skeleton in place.

**Deliverables:**

- Next.js App Router project scaffolded with TypeScript strict, Tailwind v4, ESLint, Prettier
- Complete folder structure as defined in `ARCHITECTURE.md`
- All TypeScript types defined in `types/` (Project, Album, Photo, Note, Application, Asset types from `CONTENT.md`)
- Zod schemas created for all content types
- Content loader (`lib/content.ts`) implemented and tested
- Placeholder content added: 2 projects, 1 album, 2 notes
- Config files created: `content/config/applications.json`, `dock.json`, `desktop.json`, `widgets.json`
- Design tokens defined as Tailwind config values (colors, spacing, radius, shadows from `DESIGN_FOUNDATIONS.md`)
- `CLAUDE.md` reviewed — team aligned on vocabulary and rules

**Exit Criteria:**
- `pnpm content:validate` runs without errors
- TypeScript compiles with zero errors
- All placeholder content is schema-valid
- Folder structure matches `ARCHITECTURE.md` exactly

---

## Phase 1 — Desktop Shell

**Goal:** The operating system container — everything visible before any application opens.

**Deliverables:**

- Boot animation (fade-in sequence, Portfolio OS logo, loading bar)
- Desktop background (Wallpaper component accepting any image)
- Menu Bar (static layout: left system menu, center title, right clock + icons)
- Dock (static layout: icons with labels, correct spacing and glass background)
- Desktop Icons (2–4 icons representing primary applications)
- Desktop context menu (right-click → basic actions)
- No interactive functionality yet — visual shell only

**Animations (per MOTION.md):**
- Boot fade: 650ms easeOutExpo
- Desktop icons appear: staggered fade + scale from 96%, 20ms stagger, max 300ms total

**Exit Criteria:**
- Desktop renders correctly at 1440px, 1280px, and 1920px widths
- Boot animation runs at 60 FPS on a mid-range laptop
- Lighthouse Performance score ≥ 95 on the static shell
- All elements are keyboard-reachable

---

## Phase 2 — Window Manager

**Goal:** The heart of the desktop experience — every application runs inside a Window.

**Deliverables:**

- `Window` component: rounded corners, glass background, soft shadow
- Window header with traffic light controls (close, minimize, maximize)
- Window drag (mouse and touch)
- Window resize (edge and corner handles)
- Window minimize (animated to Dock)
- Window maximize / restore
- Window focus management (z-index stack, active/inactive visual states)
- `windowStore` — open, close, focus, minimize, maximize, restore, drag position, resize dimensions
- `useWindow` hook
- `WindowManager` component wrapping all open Windows
- Multiple simultaneous windows with correct z-ordering
- Inactive windows dim slightly

**Animations (per MOTION.md):**
- Open: scale from 96% + fade + blur decrease, 450ms easeOutExpo
- Close: reverse of open, 280ms
- Minimize: animate toward Dock icon origin, 350ms spring
- Focus change: shadow and opacity, 220ms easeOut
- Dragging: linear (no easing during drag)

**Exit Criteria:**
- Three windows open simultaneously maintain 60 FPS during drag
- Window positions persist across navigation within a session
- Window focus correctly tracks the last-clicked window
- All window controls are keyboard-accessible

---

## Phase 3 — Finder

**Goal:** The portfolio browser — how visitors explore and navigate creative work.

**Deliverables:**

- `FinderWindow` application mounted inside a Window
- Finder sidebar with navigation categories
- Finder toolbar with view switcher (grid / list), search bar, breadcrumb
- Folder grid — categories rendered as macOS-style folder cards
- Project grid — projects rendered with cover image, title, year, category
- Project viewer — opens a project within Finder (large cover, gallery, metadata)
- Folder open/close animations
- `finderStore` — current path, selection, view mode, search query, navigation history
- Keyboard navigation within Finder (arrow keys, Enter to open, Backspace to go back)
- Deep linking: `/work/[category]/[project]` renders Finder at the correct path

**Animations (per MOTION.md):**
- Folder open: zoom origin from folder card, 350ms spring
- Grid navigation: slide horizontal, 320ms easeOut
- Project open: expand from card origin (shared layout), 450ms spring

**Exit Criteria:**
- All placeholder projects are discoverable through Finder navigation
- Browser back/forward navigates correctly through Finder history
- Deep link to a project opens Finder at the correct path with the Desktop visible beneath
- 60 FPS during grid scroll with 50+ project thumbnails (virtual scrolling if necessary)

---

## Phase 4 — Content Layer Integration

**Goal:** Real (placeholder) content flows through every part of the system.

**Deliverables:**

- All `content/` placeholder content expanded: 4+ projects across 2 categories, 2 albums, 3 notes
- `lib/content.ts` fully implemented with all content loaders
- Photos application: album grid, photo grid, fullscreen viewer
- Notes application: note list sidebar, Markdown renderer, note viewer
- `photoStore` and `photoStore` hooks
- `notesStore` hook
- All applications accessible from the Dock and Menu Bar
- Deep links for `/photos/[album]` and `/notes/[slug]`

**Exit Criteria:**
- All four content types (Projects, Albums, Notes, Applications) load from `content/`
- Adding a new project to `content/` makes it appear in Finder without code changes
- Zod validation catches any malformed content at build time
- Content loader tests pass

---

## Phase 5 — Widgets

**Goal:** The Desktop comes alive with glanceable, interactive information panels.

**Deliverables:**

- Clock Widget (live time display with smooth digit transitions)
- Spotify Widget (mock data: artwork, track title, artist, progress bar, controls)
- Photo Widget (cycles through curated photos with crossfade transition)
- Notes Widget (displays a selected quote from `content/notes/`)
- Widget layout system (configurable positioning from `content/config/widgets.json`)
- Widgets are non-blocking — they never delay Desktop rendering
- Clicking a widget opens its corresponding application

**Animations (per MOTION.md):**
- Photo Widget crossfade: 1200ms ease, slight zoom from 100% to 102%
- Spotify cover change: 400ms fade
- Clock digit transition: 180ms spring per digit

**Exit Criteria:**
- All four widgets render correctly with placeholder data
- Widgets do not cause layout shift after mount
- Photo Widget cycles on a timer without memory leaks
- Each widget opens the correct application when clicked

---

## Phase 6 — Polish, Performance & Accessibility

**Goal:** The desktop experience is production-quality, performant, and fully accessible.

**Deliverables:**

- Full keyboard navigation: Tab through Dock, Menu Bar, Desktop Icons; arrow keys in Finder and grids; Escape to close windows
- ARIA roles defined for all regions (Menu Bar, Dock, Desktop, Windows, Finder)
- Focus trapping within open Windows
- Focus restoration when Windows close
- Reduced-motion variants for all animations
- Skip navigation link
- Screen reader testing on VoiceOver (macOS) and NVDA (Windows)
- Lighthouse audit: Performance ≥ 95, Accessibility = 100, Best Practices = 100, SEO = 100
- Virtual scrolling for all grids with 20+ items
- Image blur placeholders on all above-fold images
- Bundle analysis — no dependency exceeding 50KB without justification
- Window drag performance profiled and confirmed at 60 FPS with 5 open windows

**Exit Criteria:**
- All Lighthouse targets met
- Zero WCAG 2.1 AA violations
- Memory stable after 30-minute session (no leaks)
- Core Web Vitals: LCP < 2.0s, CLS < 0.05, INP < 200ms

---

## Phase 7 — Mobile (iOS-inspired)

**Goal:** A completely separate iOS-inspired interface sharing only the content layer with desktop.

**Deliverables:**

- Lock Screen: time display, Carlo's creative work as wallpaper, swipe-up to unlock
- Unlock animation: Lock Screen rises, Home Screen appears
- Home Screen: widget zone (Spotify, Clock), app grid (2×4), Dock (4 apps)
- App open animation: expand from icon origin (shared layout)
- App close animation: pinch back to icon
- Project viewer adapted for mobile: fullscreen media, swipe through gallery
- Photos app: grid, fullscreen, swipe navigation
- Notes app: simple list + reader
- All content from Phase 4 displayed correctly
- Swipe back gesture to close applications
- Safe area support (notch, Dynamic Island, home indicator)

**Exit Criteria:**
- Experience is complete on iPhone 14, iPhone SE, and a mid-range Android (Chrome)
- All interactions are touch-only (no hover dependencies)
- Lighthouse Performance ≥ 90 on mobile
- No desktop components used — entire mobile UI is independently built

---

## Phase 8 — Tablet (iPadOS-inspired)

**Goal:** A touch-adapted desktop experience that respects the iPad's unique form factor.

**Deliverables:**

- Desktop layout adapted for touch: larger hit targets, no hover-only interactions
- Window system adapted for touch drag and pinch-resize
- Dock magnification replaced with tap-to-scale
- Context menus adapted for long-press
- Cursor system disabled
- Finder navigation adapted for touch (tap-to-open, swipe-to-go-back)
- Split View: two applications visible simultaneously on iPad Pro

**Exit Criteria:**
- Full experience usable on iPad Air (820px) and iPad Pro (1024px)
- No hover-only interaction remains (every hover state has a touch equivalent)
- Lighthouse Performance ≥ 92 on tablet

---

## Phase 9 — Launch Preparation

**Goal:** Production deployment with SEO, analytics, and monitoring.

**Deliverables:**

- Open Graph metadata for all public project routes
- Twitter/X Card metadata
- Structured data (JSON-LD) for creative works
- Sitemap generation
- Vercel Analytics + Speed Insights enabled
- Error boundary covering all applications
- 404 experience (custom "application not found" window)
- Final asset optimization pass (AVIF conversion, compression audit)
- Final content with Carlo's real projects, photographs, and notes
- Custom domain configured

**Exit Criteria:**
- All public project URLs are Google-indexable
- Core Web Vitals passing in Google Search Console
- Zero unhandled errors in production monitoring
- Real content replaces all placeholders

---

## v2 Scope (Not in v1)

The following features are intentionally deferred:

- Dark Mode / Night Mode theme
- Spotify real API integration (v1 uses mock data)
- Spotlight search across all content
- Desktop icon freeform drag-and-drop reordering
- Multiple simultaneous applications on Mobile
- Drag-and-drop Dock reordering
- Notification Center
- Settings application
- Authentication / private projects
- Cloud sync of Desktop state
- Three.js immersive background (pending scoping decision)
- i18n / Italian language support

---

## Cross-References

- Architecture details: [ARCHITECTURE.md](ARCHITECTURE.md)
- Design foundations: [DESIGN_FOUNDATIONS.md](DESIGN_FOUNDATIONS.md)
- Motion specifications: [MOTION.md](MOTION.md)
- Content schema: [CONTENT.md](CONTENT.md)
- Performance targets: [PERFORMANCE.md](PERFORMANCE.md)
