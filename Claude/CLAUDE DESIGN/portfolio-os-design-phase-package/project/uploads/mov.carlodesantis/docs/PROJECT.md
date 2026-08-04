# PROJECT.md — Project Overview

> **Version:** 2.0
> **Status:** Pre-Production
> **Last Reviewed:** 2026-06-29

---

## What Is Portfolio OS

Portfolio OS is the personal portfolio of Carlo Desantis — filmmaker, photographer, and creative director.

It is not a website. It is a digital operating system that runs inside a browser.

Visitors should feel like they have temporarily entered Carlo's personal computer and are exploring his creative workspace. The portfolio is the operating system. Creative work is the content. The operating system becomes the medium through which that work is discovered and experienced.

**The success criterion is simple:** Visitors should leave saying "It felt like using someone's Mac" — not "It was a nice website."

---

## Who It's For

Portfolio OS is designed for creative professionals who make decisions about talent, collaboration, and creative work:

- Creative Directors and Art Directors
- Music Labels and Music Supervisors
- Advertising Agencies
- Fashion and Luxury Brands
- Film Production Companies
- Potential collaborators
- Recruiters at creative organizations

The interface must be immediately intuitive even to visitors who have never consciously thought about operating systems as a UI metaphor. Apple's ubiquity makes this possible — almost everyone who would visit this portfolio has used a Mac or iPhone.

---

## The Three Experiences

Portfolio OS is three distinct products sharing one content layer.

**Desktop** — macOS-inspired. Primary experience. All creative depth lives here. Windows, Finder, Dock, Widgets, Menu Bar. This is where the work is explored in full.

**Mobile** — iOS-inspired. Completely separate interface. Lock Screen → Unlock → Home Screen → Applications → Projects. Feels like an iPhone app, not a scaled-down desktop.

**Tablet** — iPadOS-inspired. Touch-adapted desktop. Same layout language as Desktop but rebuilt for touch: larger targets, no hover dependencies, gesture navigation.

---

## What the Portfolio Contains

Creative work across six disciplines, each a distinct category in Finder:

| Category | Description |
|----------|-------------|
| Film | Short films, music videos, commercials, documentaries |
| Photography | Editorial, portrait, documentary, personal work |
| Creative Direction | Campaign strategy, visual identity, art direction |
| Music | Audio work, collaborations, personal music projects |
| Fashion | Fashion campaigns, lookbooks, brand collaborations |
| Advertising | Commercial spots, brand content, advertising campaigns |

Additional applications on the Desktop:

| Application | Type | Purpose |
|-------------|------|---------|
| Finder | Internal | Portfolio browser — entry point to all work |
| Photos | Internal | Dedicated photography viewer |
| Notes | Internal | Biography, manifesto, creative philosophy |
| Spotify | External | Carlo's Spotify playlist |
| Instagram | External | Instagram profile |
| Mail | External | Contact via email |
| Photoshop | External | Adobe Portfolio or Behance |
| DaVinci Resolve | External | Vimeo or video reel |
| Figma | External | Design work showcase |

---

## Design Philosophy

The interface must never compete with the content.

Every design decision must reinforce simplicity, legibility, and elegance. When a project is open, the operating system fades. The work steps forward.

Design principles, in order of priority:

1. **Clarity over decoration.** Every element earns its place by communicating something useful.
2. **Content over chrome.** Interface elements yield to creative work.
3. **Consistency over novelty.** The same interaction always behaves the same way.
4. **Simplicity over complexity.** When two paths exist, take the simpler one.
5. **Timelessness over trends.** Avoid visual ideas tied to a specific year or cultural moment.

---

## Motion Philosophy

Motion is not decoration. It is a communication tool.

Every animation must answer one of these questions:
- Where did this come from?
- Where is this going?
- What changed?
- What is in focus?
- What is the hierarchy?

If an animation cannot answer one of these questions, it should be removed.

The emotional target for all motion: *calm, confident, precise, physical, premium*.

Full motion specification: [MOTION.md](MOTION.md)

---

## Technical Philosophy

Architecture comes before implementation. Documentation before coding. Reusability before custom solutions.

The project is built as if it will be maintained for ten years by a professional engineering team:

- Every module has a single responsibility
- Every component is reusable
- Business logic never lives in UI components
- Content is completely separated from the interface
- No architectural shortcut that creates technical debt

Full architecture specification: [ARCHITECTURE.md](ARCHITECTURE.md)

---

## Scalability Goals

Portfolio OS must support:

- Hundreds of creative projects across all categories
- Thousands of photographs across multiple albums
- New project categories added without code changes
- New desktop applications added with minimal configuration
- New widget types added without refactoring existing widgets
- A complete theme system (dark mode, editorial mode) added without layout changes
- A transition from file-based content to a headless CMS without touching UI components

Scalability is a design requirement, not an optimization to consider later.

---

## Current Phase

**Status:** Pre-Production

All documentation is being finalized. No application code exists yet. Placeholder content strategy is defined. Foundation (Phase 0) is ready to begin.

See [ROADMAP.md](ROADMAP.md) for the complete development plan.

---

## Cross-References

Every decision in this project traces back to a principle:

| Topic | Document |
|-------|----------|
| Inviolable product principles | [PRODUCT_PRINCIPLES.md](PRODUCT_PRINCIPLES.md) |
| Complete architecture | [ARCHITECTURE.md](ARCHITECTURE.md) |
| Visual primitives | [DESIGN_FOUNDATIONS.md](DESIGN_FOUNDATIONS.md) |
| Design system | [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) |
| Apple interaction principles | [APPLE_HIG.md](APPLE_HIG.md) |
| Motion system | [MOTION.md](MOTION.md) |
| Content schema | [CONTENT.md](CONTENT.md) |
| Component library | [COMPONENTS.md](COMPONENTS.md) |
| Performance standards | [PERFORMANCE.md](PERFORMANCE.md) |
| Engineering standards | [CODING_GUIDELINES.md](CODING_GUIDELINES.md) |
| Anti-patterns | [ANTI_PATTERNS.md](ANTI_PATTERNS.md) |
| Technology stack | [TECH_STACK.md](TECH_STACK.md) |
| Development roadmap | [ROADMAP.md](ROADMAP.md) |
| AI collaboration guide | [CLAUDE.md](CLAUDE.md) |
