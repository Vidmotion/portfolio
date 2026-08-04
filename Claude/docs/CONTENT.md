# CONTENT.md — Content Architecture

> **Version:** 2.0
> **Status:** Pre-Production
> **Last Reviewed:** 2026-06-29

---

## Purpose

This document defines the complete data layer for Portfolio OS.

Content — projects, photographs, notes, and configuration — is permanently separated from the UI layer. No component may import portfolio data directly. No route requires manual creation for new projects. No store requires modification when content changes.

The interface is permanent. Content is replaceable.

---

## Philosophy

- Content drives the interface; the interface never drives content
- Adding any project, album, or note must require only creating files in `content/` — no React changes
- Every content type has a defined schema validated at build time with Zod
- Placeholder content is legitimate during development — the architecture must never depend on final assets
- Content is framework-independent: schemas use TypeScript interfaces, not React state

---

## Content Types

### Project

A Project represents a single creative work entry — a film, a campaign, a photo series, or a personal piece.

```typescript
interface Project {
  id: string                    // kebab-case unique identifier
  title: string                 // display title
  category: ProjectCategory     // primary creative discipline
  year: number                  // year of completion
  client?: string               // client or collaborator (optional)
  description: string           // 1–3 sentence editorial description
  cover: ImageAsset             // primary cover image
  gallery: ImageAsset[]         // ordered image gallery (min 1)
  video?: VideoAsset            // optional video asset
  tags: string[]                // searchable keywords
  featured: boolean             // appears in featured/hero contexts
  status: 'draft' | 'published'
}

type ProjectCategory =
  | 'film'
  | 'photography'
  | 'creative-direction'
  | 'music'
  | 'fashion'
  | 'advertising'
  | 'personal'
```

### Album

An Album is a curated collection of photographs sharing a context, location, or theme.

```typescript
interface Album {
  id: string
  title: string
  description?: string
  cover: ImageAsset
  year: number
  photos: Photo[]
  featured: boolean
  status: 'draft' | 'published'
}
```

### Photo

An individual photograph. Always belongs to an Album.

```typescript
interface Photo {
  id: string
  title?: string
  src: ImageAsset
  caption?: string
  location?: string
  year: number
  orientation: 'landscape' | 'portrait' | 'square'
}
```

### Note

A Note is a long-form text entry — biography, manifesto, journal, or creative philosophy. Rendered as Markdown.

```typescript
interface Note {
  id: string
  title: string
  slug: string                  // kebab-case, used in URL
  content: string               // Markdown body
  type: NoteType
  publishedAt: string           // ISO 8601 date string
  featured: boolean
}

type NoteType =
  | 'biography'
  | 'manifesto'
  | 'philosophy'
  | 'journal'
```

### Application

An Application entry defines what appears in the Dock, Menu Bar, and Desktop. Applications either open internal routes or external URLs.

```typescript
interface Application {
  id: string
  label: string                 // display name (e.g. "Finder", "Photos")
  icon: string                  // icon component name or SVG path reference
  type: 'internal' | 'external'
  target: string                // internal: route path; external: URL
  dockIndex?: number            // optional fixed Dock position
  openByDefault?: boolean       // opens on boot (e.g. Finder)
}
```

### Asset Types

```typescript
interface ImageAsset {
  src: string                   // path relative to /public/assets/
  alt: string                   // accessibility description
  width: number                 // intrinsic pixel width
  height: number                // intrinsic pixel height
  blurDataURL?: string          // base64 blur placeholder
}

interface VideoAsset {
  src: string                   // path relative to /public/assets/
  poster: string                // thumbnail image path
  duration?: number             // seconds
  aspectRatio: '16:9' | '4:3' | '9:16' | '1:1'
}
```

---

## Folder Structure

```
content/
│
├── work/                        # All creative projects
│   ├── film/
│   │   └── [project-slug]/
│   │       ├── project.json     # Project metadata (matches Project schema)
│   │       ├── cover.webp       # 16:9, min 1600px wide
│   │       ├── gallery/
│   │       │   ├── 01.webp
│   │       │   └── 02.webp
│   │       └── video.mp4        # optional
│   ├── photography/
│   ├── creative-direction/
│   ├── music/
│   ├── fashion/
│   ├── advertising/
│   └── personal/
│
├── photos/                      # Photo albums
│   └── [album-slug]/
│       ├── album.json           # Album metadata
│       └── photos/
│           ├── 01.webp
│           └── 02.webp
│
├── notes/                       # Long-form text content
│   ├── about.md                 # Biography
│   ├── manifesto.md
│   └── philosophy.md
│
└── config/                      # OS configuration
    ├── applications.json        # Application registry
    ├── dock.json                # Dock layout and ordering
    ├── desktop.json             # Desktop icon layout
    └── widgets.json             # Widget configuration
```

---

## Asset Specifications

### Images

| Format | Minimum Width | Maximum File Size | Use Case |
|--------|---------------|-------------------|----------|
| WebP   | 1600px        | 2MB               | Project covers |
| WebP   | 800px         | 800KB             | Gallery images |
| WebP   | 400px         | 200KB             | Thumbnails |
| AVIF   | Any           | —                 | Preferred where supported |

- All images must include explicit `width` and `height` to prevent layout shift
- All images must include descriptive `alt` text for accessibility
- Blur placeholders (base64, ~30px wide) are strongly recommended for all images above the fold
- Never serve full-resolution assets where a thumbnail is sufficient

### Videos

| Codec | Container | Max Bitrate | Use Case |
|-------|-----------|-------------|----------|
| H.264 | MP4       | 8 Mbps      | Standard quality |
| H.265 | MP4       | 4 Mbps      | High quality alternative |

- Every video must have a WebP poster image
- Videos load on demand — never autoplay without explicit user action
- Videos pause when outside the viewport (Intersection Observer)

---

## Placeholder Strategy

Portfolio OS is in pre-production. Final assets do not exist yet. Development must proceed regardless.

**Rules for placeholder content:**

1. Every content type must use structurally valid data — the schema must be satisfied even with placeholder values
2. Placeholder images use `/public/placeholders/` — a consistent set of correctly-sized WebP files
3. Placeholder text uses editorial-quality dummy copy that matches the expected length and tone
4. Placeholder videos use a single short test clip in the correct format
5. The architecture must never contain `if (content === null)` workarounds — content is always valid during development

**Placeholder image sizes to create at project setup:**

- `placeholder-cover-16x9.webp` — 1600×900
- `placeholder-portrait.webp` — 800×1200
- `placeholder-square.webp` — 800×800
- `placeholder-landscape.webp` — 1200×800
- `placeholder-blur.webp` — 32×32 (for blur placeholders)

---

## Content Loading Pattern

Content is loaded through a content layer that abstracts file I/O. Components never import JSON files directly.

```
content/
  └── [slug]/project.json
        ↓
lib/content.ts              (content loader — pure functions, no React)
        ↓
hooks/useProjects.ts        (React hook, consumes content loader)
        ↓
Component                   (receives typed data via props or hook)
```

The content loader (`lib/content.ts`) is responsible for:
- Reading and parsing JSON/Markdown from the `content/` directory
- Validating against Zod schemas at build time
- Returning typed, validated content objects
- Never exposing raw file paths or asset URLs to components

---

## Adding New Content

### Adding a New Project

1. Create a folder: `content/work/[category]/[project-slug]/`
2. Add `project.json` satisfying the `Project` schema
3. Add `cover.webp` and at least one `gallery/01.webp`
4. Run the content validator: `pnpm content:validate`
5. The project appears automatically in Finder and all relevant views

No React component, no route file, no store, and no config file requires modification.

### Adding a New Album

1. Create a folder: `content/photos/[album-slug]/`
2. Add `album.json` satisfying the `Album` schema
3. Add photos to `photos/`
4. Run the content validator

### Adding a New Note

1. Create `content/notes/[slug].md` with frontmatter matching the `Note` schema
2. Run the content validator

---

## Content Validation

A build-time validator ensures all content satisfies its schemas before the application compiles.

```bash
pnpm content:validate   # Validate all content against schemas
pnpm content:list       # List all published content
```

Invalid content fails the build. It never silently renders with incorrect data.

---

## Future Evolution

The content architecture is designed to support a future transition to a headless CMS (Sanity, Contentful) without requiring changes to UI components. The content loader in `lib/content.ts` acts as the abstraction boundary — only this file changes if the content source changes.

All content consumers (hooks, stores, components) depend on the TypeScript types, not on the file system directly.

---

## Cross-References

- Architecture: [ARCHITECTURE.md](ARCHITECTURE.md)
- State management: [STATE_MANAGEMENT.md](STATE_MANAGEMENT.md)
- Components: [COMPONENTS.md](COMPONENTS.md)
- Performance: [PERFORMANCE.md](PERFORMANCE.md)
- Product principles: [PRODUCT_PRINCIPLES.md](PRODUCT_PRINCIPLES.md) — Principle 5
