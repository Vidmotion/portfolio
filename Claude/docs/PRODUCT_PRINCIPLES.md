# PRODUCT_PRINCIPLES.md — Product Principles

> **Version:** 1.0
> **Status:** Pre-Production
> **Last Reviewed:** 2026-06-29

---

## Purpose

This document defines the twelve inviolable principles of Portfolio OS.

Every architectural decision, design choice, engineering tradeoff, and interaction pattern must be evaluated against these principles. When two approaches conflict, these principles provide the tiebreaker.

No implementation detail is more important than the principles it serves.

---

## Principle 1 — Experience Over Website

Portfolio OS is not a website.

It is a digital operating system that runs inside a browser.

Every time something feels like a traditional website — a page transition, a scrolling feed, a hero section, a navigation menu — it must be redesigned until it feels like a native operating system interaction.

The browser is the hardware. The operating system is the product.

**How to apply:** When evaluating any UI pattern, ask: "Does a person who has never opened this link expect to see this in macOS or iOS?" If not, reconsider.

---

## Principle 2 — Content is the Protagonist

The operating system exists to showcase creative work, not the other way around.

When a project is open, the interface must become invisible. Typography, spacing, colors, and chrome should all reduce their presence when content is in focus.

The work is what visitors come for. The OS is the delivery mechanism.

**How to apply:** Any element that competes visually with open content is a violation of this principle. The interface steps back; the project steps forward.

---

## Principle 3 — Native Feeling, Original Expression

The experience should feel indistinguishable from a native Apple product — not because it copies Apple, but because it applies the same level of care, precision, and restraint.

Nothing in Portfolio OS is lifted from Apple. Everything is original. But the interactions, physics, timing, hierarchy, and polish should sit comfortably alongside macOS and iOS without embarrassment.

**How to apply:** Study Apple's principles, not their pixels. Reject any feature that would feel foreign to a person comfortable with Apple products.

---

## Principle 4 — Architecture Before Implementation

No feature may be built without its architecture being understood first.

Before writing the first component, the folder it belongs in must be clear. Before writing the first store, its boundary must be defined. Before writing the first animation, its timing parameters must exist in MOTION.md.

Documentation is not a deliverable. It is the plan.

**How to apply:** If a developer cannot point to the document that governs the system they are about to build, they are not ready to build it.

---

## Principle 5 — Content and Interface Are Permanently Separate

Portfolio content — project titles, descriptions, covers, galleries, notes — must never be hardcoded inside UI components.

Adding a new project should require only creating a new content folder. No React component, no route, no store, and no configuration file outside of `content/` should need modification.

The interface is permanent. Content is replaceable.

**How to apply:** If a component imports a string, a URL, or a media path that belongs to a specific project, that import is a violation of this principle.

---

## Principle 6 — Performance is Design

A beautiful interface that stutters is unfinished.

60 FPS is not a performance target — it is a design requirement. Latency damages the OS illusion more than any visual deficiency could. Users forgive imperfect design. They do not forgive a dragging window or a stuttering transition.

**How to apply:** Before adding any visual effect, evaluate its rendering cost. If it cannot maintain 60 FPS on a mid-range device, it does not belong in the product.

---

## Principle 7 — Spatial Navigation

Users should never feel teleported.

Every navigation event — opening an application, browsing into a folder, viewing a photograph, reading a note — must preserve the user's sense of spatial orientation. Things open from somewhere. Things close back to somewhere. The user always knows where they are.

**How to apply:** If a transition cannot answer the questions "where did this come from?" and "where will it go when dismissed?", the transition needs redesign.

---

## Principle 8 — Simplicity as Default

Whenever two solutions exist for the same problem, choose the simpler one.

Complexity accumulates invisibly. A small shortcut becomes a dependency. A dependency becomes a constraint. A constraint becomes technical debt. The only way to avoid this is to refuse complexity from the beginning.

**How to apply:** If a feature requires a new dependency to solve something that native browser APIs or already-approved libraries can solve, the dependency should not be introduced.

---

## Principle 9 — Accessibility Without Compromise

Accessibility is not a feature. It is a quality standard.

Every interactive element in Portfolio OS must be navigable by keyboard, readable by screen reader, visible under high contrast, and respectful of reduced-motion preferences. The OS illusion does not override this requirement.

If an interaction cannot be made accessible, the interaction needs to be redesigned.

**How to apply:** Accessibility is not implemented at the end. It is built into every component from the first line of code.

---

## Principle 10 — One Source of Truth

Every piece of information in Portfolio OS exists exactly once.

Duplicated state, duplicated constants, duplicated logic, and duplicated documentation all create the same problem: divergence. When two places hold the same truth, they will eventually disagree, and the system will break in subtle, hard-to-debug ways.

**How to apply:** Before adding any data structure, constant, or behavior, verify that it does not already exist. Reuse; do not duplicate.

---

## Principle 11 — Mobile is a Different Product

The mobile experience is not Portfolio OS scaled down.

It is a separate iOS-inspired operating system that shares only the content layer with the desktop experience. It has its own design language, its own interaction patterns, its own navigation architecture, and its own animation system — all of which feel native to a person holding an iPhone.

**How to apply:** Responsive CSS breakpoints are not sufficient for the mobile experience. The mobile interface must be designed and built as an independent product.

---

## Principle 12 — Long-Term Platform Thinking

Every decision must remain defensible five years from now.

Portfolio OS is not a temporary showcase. It is a long-term digital platform for Carlo Desantis' creative career. Architecture that works today but cannot accommodate growth is architecture that has already failed. Components must be reusable. Systems must be extensible. Content must be addable without engineering effort.

**How to apply:** When designing any system, ask: "What happens when there are 100 projects instead of 10? 1000 photographs instead of 100? A new application type that doesn't exist yet?" The architecture should handle all of these without redesign.

---

## Cross-References

- Vision: [PROJECT.md](PROJECT.md)
- Architecture: [ARCHITECTURE.md](ARCHITECTURE.md)
- Design language: [DESIGN_FOUNDATIONS.md](DESIGN_FOUNDATIONS.md)
- Motion system: [MOTION.md](MOTION.md)
- Performance standards: [PERFORMANCE.md](PERFORMANCE.md)
- Accessibility: [APPLE_HIG.md](APPLE_HIG.md)
- Content architecture: [CONTENT.md](CONTENT.md)
