# ANTI_PATTERNS.md — Anti-Patterns Reference

> **Version:** 1.0
> **Status:** Active
> **Last Reviewed:** 2026-06-29

---

## Purpose

This document catalogs the patterns that must never appear in Portfolio OS.

Every entry represents a mistake that is easy to make and difficult to undo. Study this document before implementing any major system. When reviewing code, check against these patterns first.

Each entry explains what the pattern is, why it is harmful, and what to do instead.

---

## Architecture Anti-Patterns

### A1 — Hardcoding Portfolio Content

**Pattern:**
```tsx
// Never do this
<ProjectCard title="The Great Campaign" client="Nike" year={2024} />
const project = { title: "Tony Boy", category: "music" }
```

**Why it's harmful:** Content hardcoded in components cannot be managed, updated, or replaced without code changes. It defeats the entire content/interface separation architecture.

**Instead:** All content lives in `content/[type]/[slug]/`. Components receive typed props from the content loader. See `CONTENT.md`.

---

### A2 — Global God Store

**Pattern:**
```ts
// Never do this
interface AppState {
  window: WindowState
  finder: FinderState
  spotify: SpotifyState
  photos: PhotoState
  notes: NotesState
  // ...everything in one place
}
const useAppStore = create<AppState>(...)
```

**Why it's harmful:** A single monolithic store creates implicit dependencies between unrelated systems. A Finder state change can trigger re-renders in the Spotify widget. State boundaries become unclear. Debugging becomes difficult.

**Instead:** One store per domain. See `STATE_MANAGEMENT.md` for the store boundaries.

---

### A3 — Circular Store Dependencies

**Pattern:**
```ts
// Never do this — finderStore reads from windowStore reads from finderStore
const finderStore = create(() => ({
  open: () => windowStore.getState().focus('finder')
}))
const windowStore = create(() => ({
  focus: (id) => finderStore.getState().setActive(true)
}))
```

**Why it's harmful:** Circular dependencies produce unpredictable update cycles and can cause infinite re-render loops.

**Instead:** Stores communicate via actions dispatched from hooks, never by directly importing each other.

---

### A4 — Page-Centric Navigation

**Pattern:**
```tsx
// Never do this
<Link href="/work">Work</Link>
<Link href="/photos">Photos</Link>
// Navigation that replaces the entire page
router.push('/project/my-film')
```

**Why it's harmful:** Page navigation destroys the Desktop and breaks the OS metaphor. The user loses their spatial context. The experience becomes a website.

**Instead:** Navigation opens Windows above the persistent Desktop. URL changes via `router.push` update the URL for deep linking without destroying the Desktop layout.

---

### A5 — Business Logic in Components

**Pattern:**
```tsx
// Never do this
function ProjectCard({ id }) {
  const [project, setProject] = useState(null)
  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then(r => r.json())
      .then(data => setProject(data))
  }, [id])
  // ...
}
```

**Why it's harmful:** Components that contain data-fetching logic, transformation, or business rules cannot be reused. They become entangled with a specific data source and impossible to test in isolation.

**Instead:** Components receive data as props. Data loading happens in hooks. Hooks consume stores or content loaders.

---

### A6 — Unnecessary Client Components

**Pattern:**
```tsx
'use client'
// When this directive is added to a component that has no interactivity,
// it forces the entire subtree to hydrate unnecessarily
export default function StaticProjectHeader({ title, year }) {
  return <h1>{title} — {year}</h1>
}
```

**Why it's harmful:** Every `'use client'` directive increases the JavaScript bundle sent to the browser. Static content that doesn't need interactivity should remain a Server Component.

**Instead:** Default to Server Components. Add `'use client'` only when a component needs event handlers, browser APIs, or React hooks.

---

### A7 — Type Unsafety

**Pattern:**
```ts
// Never do this
const data = response as any
const project = content as unknown as Project
function loadContent(id: string): any { ... }
```

**Why it's harmful:** `any` and unsafe type casts silence TypeScript and allow runtime errors to reach production. They turn a typed codebase into an untyped one.

**Instead:** Use Zod schemas to validate external data at runtime. Use TypeScript generics to maintain type safety through transformations.

---

## Design Anti-Patterns

### D1 — Decorative Animation

**Pattern:**
Animations that exist to "look impressive" rather than to communicate a relationship, state change, or hierarchy signal.

Example: A hero section with particles floating randomly; text that glitches for no reason; backgrounds that continuously animate with no content meaning.

**Why it's harmful:** Decorative animation increases GPU load, distracts from content, violates the motion philosophy in `MOTION.md`, and cheapens the premium aesthetic.

**Instead:** Every animation must answer: "What does this communicate?" If the answer is only "it looks cool," remove it.

---

### D2 — Skeuomorphic Apple Imitation

**Pattern:**
Recreating macOS UI elements pixel-by-pixel — exact same window chrome, identical system fonts, Apple SF Symbols used as application icons, macOS Sonoma wallpaper.

**Why it's harmful:** This is both legally risky (Apple's assets are copyrighted) and creatively empty. Portfolio OS exists to showcase Carlo's creative identity, not to be a macOS clone.

**Instead:** Apply Apple's *principles* (clarity, depth, motion, consistency) through original visual expression. Everything must feel like it *belongs alongside* Apple products without being mistaken for one.

---

### D3 — Arbitrary Visual Values

**Pattern:**
```tsx
// Never do this
<div style={{ padding: '14px', borderRadius: '11px', fontSize: '14.5px' }}>
```

**Why it's harmful:** Arbitrary values outside the design token system create visual inconsistency. The interface loses its systematic rhythm. Dark mode, future theming, and responsive scaling all break.

**Instead:** Every visual value must trace back to a token defined in `DESIGN_FOUNDATIONS.md` and expressed as a Tailwind class.

---

### D4 — Hover-Only Interactions

**Pattern:**
Critical information or interactions that are only accessible via CSS `:hover` — a tooltip that appears on hover with no keyboard equivalent; a Dock label that has no accessible text.

**Why it's harmful:** Hover interactions are inaccessible to keyboard users, touch users, and any device without a pointing device. They violate `APPLE_HIG.md` and WCAG 2.1.

**Instead:** Every hover interaction must have a visible focus equivalent. Labels must be present as ARIA attributes even when visually tooltip-only.

---

### D5 — Layout Shift on Load

**Pattern:**
Images rendered without explicit `width` and `height` attributes; fonts loaded without `font-display: swap`; dynamic content that shifts the page layout after initial render.

**Why it's harmful:** Layout shift damages the Core Web Vitals score, breaks the premium feeling, and confuses users. The OS should never jump.

**Instead:** All `<Image>` components use explicit dimensions. Blur placeholders are provided. Font loading uses `display: optional` or `display: swap` with declared sizes.

---

## Motion Anti-Patterns

### M1 — Animating Layout Properties

**Pattern:**
```ts
// Never do this
animate={{ width: '100%', height: 'auto', left: 20, top: 40 }}
```

**Why it's harmful:** Animating layout properties forces the browser to perform layout recalculation on every frame. This kills 60 FPS performance and causes visual jank.

**Instead:** Only animate `transform`, `opacity`, and `filter`. Simulate layout changes using `transform: translateX/Y/scale`.

---

### M2 — Missing Exit Animations

**Pattern:**
Elements that animate in on mount but disappear instantly on unmount (no `AnimatePresence`).

**Why it's harmful:** Abrupt disappearance breaks spatial continuity. The user cannot track where something went.

**Instead:** Every `motion` component that appears must also have an `exit` animation. Use `AnimatePresence` around conditionally rendered components.

---

### M3 — Blocking Animations

**Pattern:**
Animations that prevent user interaction while they play — a window that cannot be clicked until its open animation completes; navigation that locks the interface during a transition.

**Why it's harmful:** Blocking animations make the interface feel slow and unresponsive. Users expect immediate feedback even during transitions.

**Instead:** All animations run concurrently with user interaction. The interface is always interactive. Framer Motion handles this by default with spring interruption.

---

### M4 — Excessive Stagger Duration

**Pattern:**
```ts
// Never do this — 50 items × 50ms = 2.5 second delay before last item appears
const staggerChildren = 0.05
// And a list with 50+ items
```

**Why it's harmful:** Total stagger duration exceeds the acceptable 300ms cap, making the interface feel sluggish.

**Instead:** Cap total stagger duration at 300ms regardless of item count. Derive per-item delay from `Math.min(index * 20, 300 / itemCount)`.

---

## Performance Anti-Patterns

### P1 — Unmemoized Expensive Computations in Render

**Pattern:**
```tsx
// Never do this
function ProjectGrid({ projects }) {
  const sorted = projects
    .filter(p => p.status === 'published')
    .sort((a, b) => b.year - a.year) // runs on every render
  return <Grid items={sorted} />
}
```

**Why it's harmful:** Expensive array operations repeated on every render waste CPU cycles and cause unnecessary re-renders.

**Instead:** Use `useMemo` for expensive computations that depend on stable inputs. Keep render functions pure and lightweight.

---

### P2 — Three.js Objects Created in useFrame

**Pattern:**
```ts
// Never do this
useFrame(() => {
  const geometry = new THREE.SphereGeometry(1) // new object every frame
  const material = new THREE.MeshStandardMaterial()
  scene.add(new THREE.Mesh(geometry, material))
})
```

**Why it's harmful:** Creating objects inside the render loop leaks memory and destroys GPU performance. Each frame adds new objects to the scene graph.

**Instead:** Create geometries, materials, and meshes once at setup. Reuse them in the render loop. Dispose them on unmount.

---

### P3 — Loading All Images Simultaneously

**Pattern:**
```tsx
// Never do this — loads every photo in the album before the page is ready
{album.photos.map(photo => <img src={photo.src} />)}
```

**Why it's harmful:** A photo album with 100 images loading simultaneously blocks network bandwidth, causes massive layout shift, and makes the page feel slow.

**Instead:** Use `next/image` with `loading="lazy"` for all off-screen images. Virtual scroll large grids. Only above-fold images may eager-load.

---

### P4 — Unnecessary Global Renders

**Pattern:**
```ts
// Never do this — every component subscribed to the store re-renders
// when ANY part of state changes
const { windows, activeWindow, finder, spotify } = useWindowStore()
```

**Why it's harmful:** Reading the entire store object instead of selecting the specific state slice causes every subscriber to re-render on any state change, even unrelated ones.

**Instead:** Use Zustand selectors that return only the slice each component needs.
```ts
const activeWindow = useWindowStore(state => state.activeWindow)
```

---

## Content Anti-Patterns

### C1 — Route-per-Project Manual Registration

**Pattern:**
```
app/
  work/
    my-film-project/
      page.tsx        ← manually created for each project
    tony-boy/
      page.tsx
```

**Why it's harmful:** Adding a new project requires creating a new route file. This couples content to code and violates the content/interface separation principle.

**Instead:** Use dynamic routes: `app/work/[category]/[slug]/page.tsx`. Content is discovered from the file system via the content loader.

---

### C2 — CMS-Dependent Architecture

**Pattern:**
Designing the content loading code so tightly around a specific CMS (Sanity, Contentful) that switching would require rewriting all hooks and stores.

**Why it's harmful:** If the content strategy evolves (file-based → CMS, or CMS A → CMS B), the entire data layer must be rebuilt.

**Instead:** The content loader in `lib/content.ts` is the only abstraction boundary between the content source and the application. Change the content source by changing only this file.

---

## Cross-References

- Architecture decisions: [ARCHITECTURE.md](ARCHITECTURE.md)
- Motion rules: [MOTION.md](MOTION.md)
- Performance standards: [PERFORMANCE.md](PERFORMANCE.md)
- Engineering guidelines: [CODING_GUIDELINES.md](CODING_GUIDELINES.md)
- Product principles: [PRODUCT_PRINCIPLES.md](PRODUCT_PRINCIPLES.md)
