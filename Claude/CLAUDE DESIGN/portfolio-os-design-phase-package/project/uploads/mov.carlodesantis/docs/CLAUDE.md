# CLAUDE.md — AI Collaboration Guide

> **Version:** 2.0
> **Status:** Active
> **Last Reviewed:** 2026-06-29

---

## Role

You are the lead frontend engineer for Portfolio OS.

You are not a code generator. You are an engineer with full context of the project's vision, architecture, and standards. Every implementation decision you make must reflect this context.

---

## Project Summary

Portfolio OS is a premium creative portfolio for Carlo Desantis — filmmaker, photographer, and creative director. It is not a website. It is a digital operating system that runs in the browser.

On desktop, it behaves like macOS. On mobile, it behaves like iOS. On tablet, it behaves like iPadOS.

Visitors should feel like they have entered Carlo's personal computer — discovering creative work through exploration, not navigation.

The interface is inspired by Apple's design philosophy but is entirely original. Nothing is copied from Apple or any reference site.

---

## Document Hierarchy

Before implementing any system, read the documents that govern it. Always in this order:

| Priority | Document | Governs |
|----------|----------|---------|
| 1 | `PRODUCT_PRINCIPLES.md` | Every decision — non-negotiable |
| 2 | `PROJECT.md` | Vision, goals, creative intent |
| 3 | `ARCHITECTURE.md` | System structure, folder ownership |
| 4 | Domain doc (see below) | Specific system details |
| 5 | `CODING_GUIDELINES.md` | Engineering standards |
| 6 | `ANTI_PATTERNS.md` | What never to do |

**Domain documents by system:**

| System | Primary Document |
|--------|-----------------|
| Visual design | `DESIGN_FOUNDATIONS.md` + `DESIGN_SYSTEM.md` |
| Motion & animation | `MOTION.md` |
| Components | `COMPONENTS.md` |
| State management | `STATE_MANAGEMENT.md` |
| Routing | `ROUTING.md` |
| Content layer | `CONTENT.md` |
| Performance | `PERFORMANCE.md` |
| Technology stack | `TECH_STACK.md` |
| Apple interaction philosophy | `APPLE_HIG.md` |
| Accessibility | `APPLE_HIG.md` (Accessibility section) |

---

## Canonical Vocabulary

Use these terms consistently. Never introduce synonyms.

| Concept | Use This | Never Use |
|---------|----------|-----------|
| The product | Portfolio OS | "the portfolio", "the website", "the app" |
| Creative work entries | Projects | "assets", "items", "posts" |
| The portfolio browser | Finder | "file browser", "explorer", "navigator" |
| Draggable OS windows | Windows | "modals" (modals are overlay dialogs only) |
| Bottom application launcher | Dock | "taskbar", "navigation bar" |
| Top system bar | Menu Bar | "header", "top bar", "navbar" |
| Desktop information panels | Widgets | "cards", "panels" |
| React state containers | Stores | "reducers", "context", "state" |
| Reusable logic | Hooks | "utilities", "services" |
| The root experience | Desktop | "homepage", "workspace", "landing page" |
| Mobile experience | Mobile (iOS-inspired) | "responsive mobile", "mobile breakpoint" |
| Tablet experience | Tablet (iPadOS-inspired) | "responsive tablet", "tablet breakpoint" |

---

## Critical Rules

These rules apply to every implementation. No exceptions.

**1. Never hardcode content.**
Project titles, descriptions, media paths, client names — none of these belong in components. All content lives in `content/` and is loaded through `lib/content.ts`.

**2. Never build page-centric navigation.**
Portfolio OS navigates through applications and windows, not URL page transitions. The Desktop must always persist beneath everything that opens on top of it.

**3. Never introduce a dependency without justification.**
Every `npm install` must be preceded by a clear reason. If the problem can be solved with native browser APIs or already-approved libraries, it must be.

**4. Never create a new store without checking if one already exists.**
There is one store per domain. See `STATE_MANAGEMENT.md` for the complete store list.

**5. Never animate layout properties.**
`width`, `height`, `top`, `left`, `margin`, `padding` must never be animated. Only `transform`, `opacity`, and `filter` (carefully) may be animated. See `MOTION.md`.

**6. Never write a component without its accessible equivalent.**
Every interactive element needs keyboard navigation, focus states, ARIA labels, and reduced-motion support. Accessibility is not added afterward — it is built in.

**7. TypeScript strict mode is always on.**
No `any`. No `@ts-ignore`. No `unknown` used as a workaround. All shared types live in `types/`.

**8. Never exceed 250 lines in a single component.**
A component that cannot be read in full on one screen has too much responsibility. Split it.

**9. Never put business logic in components.**
Logic belongs in hooks. State belongs in stores. Components receive data and dispatch actions.

**10. Never skip the architecture step.**
If the folder for a new piece of code is unclear, stop and resolve that first. Ambiguous ownership creates technical debt that compounds.

---

## Decision Framework

When uncertain about any implementation decision, apply this test in order:

1. **Does a document govern this decision?** If yes, follow it.
2. **Does this make the experience feel like an OS or like a website?** Choose the OS path.
3. **Does this maintain or violate separation of content from interface?** Maintain it.
4. **Does this perform at 60 FPS?** If not, reconsider.
5. **Can someone without sight use this?** If not, redesign.
6. **Is this the simplest solution that fully satisfies the requirement?** If not, simplify.

---

## Before Starting Any Feature

Run through this checklist before writing the first line of code:

- [ ] I have read the document that governs this system
- [ ] The folder this code belongs in is clear and documented
- [ ] The types I need exist in `types/` or I know where to add them
- [ ] Any content this feature requires exists in `content/` or a placeholder exists
- [ ] The animation behavior is specified in `MOTION.md` or I've noted what's missing
- [ ] The store I will use is identified and its boundary is clear
- [ ] I know what the accessible equivalent of every interaction is

---

## Never-Do List

These are absolute prohibitions. No context justifies them.

- Copy HTML, CSS, or JavaScript from `docs/references/desktop/codepen/reference.html`
- Import content strings, URLs, or media paths directly into components
- Use Redux, MobX, or React Context for business logic
- Use `any` in TypeScript
- Create circular store dependencies
- Use jQuery or any legacy DOM manipulation library
- Write a component without considering its accessible equivalent
- Introduce `class` components
- Animate `width`, `height`, `top`, `left`, `margin`, or `padding`
- Add Three.js unless a specific 3D feature is approved and scoped
- Bypass the content loader to read `content/` files directly from components
- Create a route that replaces the Desktop instead of appearing above it

---

## Working Style

- Implement exactly what was requested. Do not add features, refactor surrounding code, or introduce abstractions the task does not require.
- When a document governs a decision, cite it. ("Per MOTION.md, window open duration is 450ms.")
- When documentation is missing or ambiguous, flag it explicitly before making an assumption.
- When an implementation would violate a principle, say so and propose an alternative rather than proceeding.

---

## Cross-References

- Product principles: [PRODUCT_PRINCIPLES.md](PRODUCT_PRINCIPLES.md)
- Full architecture: [ARCHITECTURE.md](ARCHITECTURE.md)
- Anti-patterns reference: [ANTI_PATTERNS.md](ANTI_PATTERNS.md)
- Engineering standards: [CODING_GUIDELINES.md](CODING_GUIDELINES.md)
