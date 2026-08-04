# DESIGN_HANDOFF.md — Design Phase Handoff

> **Version:** 1.0
> **Status:** Ready for Design Phase
> **Date:** 2026-06-29

---

## Project Overview

Portfolio OS is a premium creative portfolio for Carlo Desantis — filmmaker, photographer, and creative director. It is not a website. It is a digital operating system that runs in the browser.

Visitors should feel like they have entered Carlo Desantis' personal computer. Creative work is discovered through exploration, not navigation. The interface is invisible. The work is the experience.

The product runs as three completely distinct experiences:

- **Desktop** — macOS-inspired. The primary experience.
- **Tablet** — iPadOS-inspired. Desktop spatial model adapted for touch.
- **Mobile** — iOS-inspired. A completely separate interface beginning with a lock screen.

None of the three experiences is a responsive variant of another.

---

## Repository Structure

```
mov.carlodesantis/
├── docs/                   — Product Bible (engineering and architecture)
├── design/                 — Creative Bible (design direction and philosophy)
├── references/             — Inspiration sources (principles only, never copied)
├── figma/                  — Visual Source of Truth (to be populated during Design Phase)
│   ├── exports/            — Exported assets
│   ├── prototype/          — Prototype links and recordings
│   ├── handoff/            — Engineering handoff exports
│   └── archive/            — Previous Figma versions
├── DESIGN_HANDOFF.md       — This file
└── CLAUDE_DESIGN_MASTER_PROMPT.md  — Master prompt for Claude Design
```

---

## Documentation Overview

### Product Bible — `docs/`

The Product Bible defines everything about how Portfolio OS is built.

| Document | Purpose |
|----------|---------|
| `PRODUCT_PRINCIPLES.md` | 12 non-negotiable principles governing every decision |
| `PROJECT.md` | Product vision, goals, three-experience architecture |
| `DESIGN_FOUNDATIONS.md` | All design token values — colors, typography, spacing, radii, shadows, elevation |
| `DESIGN_SYSTEM.md` | How tokens are applied to components |
| `MOTION.md` | Spring presets, timing values, stagger rules, skeleton specs, interruption handling |
| `APPLE_HIG.md` | Apple interaction philosophy applied to Portfolio OS |
| `TECH_STACK.md` | Technology decisions including SF Pro licensing note |
| `CLAUDE.md` | Canonical vocabulary, document hierarchy, critical rules |
| `ROADMAP.md` | Phase-by-phase implementation plan with v1/v2 scope |
| `ANTI_PATTERNS.md` | What never to do |

### Creative Bible — `design/`

The Creative Bible defines everything about how Portfolio OS looks and feels.

| Document | Purpose |
|----------|---------|
| `00_DESIGN_BRIEF.md` | Creative brief — vision, platforms, references, deliverables |
| `01_CREATIVE_DIRECTION.md` | Artistic language — atmosphere, personality, visual rhythm |
| `02_EXPERIENCE.md` | User journey — Desktop, Tablet, Mobile entry experiences |
| `03_VISUAL_LANGUAGE.md` | Visual DNA — materials, light, color, typography, composition |
| `04_FIGMA_STRUCTURE.md` | Figma workspace organization — 11 pages, variables, components |
| `05_COMPONENT_LIBRARY.md` | Complete component inventory — v1 scope |
| `06_PROTOTYPE_FLOW.md` | Every interaction flow to prototype |
| `07_DESIGN_DELIVERABLES.md` | Definition of design completion |
| `08_DESIGN_PROMPT.md` | Master Claude Design prompt (condensed version) |

### References — `references/`

References exist to extract principles. Never to copy.

| Reference | Contribution |
|-----------|-------------|
| `references/inspiration.md` | Creative manifesto — all references synthesized |
| `references/websites/bychudy.md` | Composition, exploration, curiosity-first navigation |
| `references/websites/ludovicoscurto.md` | Storytelling, editorial pacing, cinematic project pages |
| `references/desktop/codepen/` | Desktop environment concepts — Finder, Dock, windows |
| `references/mobile/` | iOS interaction model — lock screen, home screen, widgets |

---

## Creative Vision

Portfolio OS should feel:

**Native.** Like software, not a website.

**Invisible.** The interface disappears behind the creative work.

**Effortless.** Every interaction understood immediately.

**Timeless.** No trendy effects. No fashionable aesthetics.

**Premium.** The level of craft visible in every detail.

**Original.** Inspired by Apple, but entirely Carlo Desantis.

The creative work is always the protagonist. The operating system is only the medium.

---

## Product Vision

Visitors should not remember the interface.

They should remember the feeling of spending time inside Carlo Desantis' creative world.

That transformation — from visitor to explorer — is the true objective of this project.

---

## Folder Responsibilities

| Folder | Who Creates It | Who Reads It | What It Contains |
|--------|---------------|-------------|-----------------|
| `docs/` | Product team | Engineers, AI coding agents | Architecture, standards, specs |
| `design/` | Design team | Designers, Claude Design | Visual direction, philosophy |
| `references/` | Product team | Claude Design | Inspiration sources |
| `figma/` | Claude Design | Claude Code | Approved visual output, assets, specs |

---

## Required Reading Order

Before beginning any design work, read every document in this exact order.

**Priority 1 — Product foundation**
1. `docs/PRODUCT_PRINCIPLES.md`
2. `docs/PROJECT.md`
3. `docs/CLAUDE.md` (canonical vocabulary)

**Priority 2 — Design foundations**

4. `docs/DESIGN_FOUNDATIONS.md` (all token values)
5. `docs/DESIGN_SYSTEM.md` (how tokens apply to components)
6. `docs/MOTION.md` (animation specifications)

**Priority 3 — Creative direction**

7. `design/00_DESIGN_BRIEF.md`
8. `design/01_CREATIVE_DIRECTION.md`
9. `design/02_EXPERIENCE.md`
10. `design/03_VISUAL_LANGUAGE.md`

**Priority 4 — Design system architecture**

11. `design/04_FIGMA_STRUCTURE.md`
12. `design/05_COMPONENT_LIBRARY.md`
13. `design/06_PROTOTYPE_FLOW.md`
14. `design/07_DESIGN_DELIVERABLES.md`

**Priority 5 — Additional context**

15. `docs/APPLE_HIG.md`
16. `docs/TECH_STACK.md`
17. `docs/ROADMAP.md`
18. `references/inspiration.md`
19. `references/websites/bychudy.md`
20. `references/websites/ludovicoscurto.md`
21. `references/desktop/codepen/readme.md`

Do not begin designing until every document in Priorities 1–4 has been read and understood.

---

## Expected Workflow

```
Phase 1 — Study
Read all documentation (order above).
Understand the product vision, architecture, creative direction.
Do not begin designing yet.

Phase 2 — Foundations
Create all design tokens as Figma Variables.
Typography, color, spacing, radius, shadow, elevation, motion.
Token names must match docs/DESIGN_FOUNDATIONS.md exactly.

Phase 3 — Component Library
Build every reusable component.
All components: Auto Layout, Variables, Variants, documented.
No detached instances. No hardcoded values.

Phase 4 — Desktop Experience
Build all Desktop templates from reusable components.
Desktop, Dock, Menu Bar, Finder, Windows, Widgets, Icons.

Phase 5 — Tablet Experience
Build Tablet templates independently.
Not a resized Desktop. Designed for touch.

Phase 6 — Mobile Experience
Build Mobile templates independently.
Lock Screen, Home Screen, Folders, Applications, Navigation.

Phase 7 — Prototypes
Prototype every meaningful interaction.
Validate the complete experience through interaction, not just screens.

Phase 8 — Handoff
Prepare the complete developer handoff.
Measurements, tokens, specs, motion references, platform adaptation notes.
```

---

## Deliverables

The Design Phase is complete when the following exist:

| Deliverable | Location |
|-------------|----------|
| Production-ready Figma workspace | Figma (shared link) |
| Exported assets | `figma/exports/` |
| Prototype share links | `figma/prototype/` |
| Design token export (JSON) | `figma/handoff/` |
| Component specification document | `figma/handoff/` |
| Engineering handoff document | `figma/handoff/` |

---

## Success Criteria

The Design Phase is successful when:

1. Claude Code can implement Portfolio OS using the Figma file, `docs/`, and `design/` without inventing missing behaviours, layouts, or interactions.
2. Every screen is assembled from reusable components.
3. Every visual value is a Variable.
4. All three experiences — Desktop, Tablet, Mobile — are completely designed.
5. Every major interaction is prototyped.
6. The Figma file is organized, documented, and immediately understandable to a new contributor.
7. The design feels like a premium operating system — not a portfolio website.

---

## Rules

**Never break these:**

1. Desktop, Tablet, and Mobile are distinct experiences. Never treat Tablet or Mobile as responsive variants of Desktop.
2. Projects are always the protagonist. The interface must disappear behind the creative work.
3. Never copy layouts, visuals, or interactions from any reference source. Extract principles only.
4. Never hardcode visual values in Figma. Every reusable value must be a Variable.
5. SF Pro renders automatically on Apple devices. Inter is the web-embedded fallback. Design must look excellent in both.
6. Widgets in v1 scope: Spotify, Photos, Notes, Clock, Quote, Recent Projects. Calendar and Weather are v2.
7. Notes is a read-only MDX viewer in v1. No editor. No writing mode.
8. The canonical product name is "Portfolio OS". Never "the portfolio", "the website", or "the app".
9. Do not begin designing before reading all Priority 1–4 documents.
10. When in doubt, refer to `docs/PRODUCT_PRINCIPLES.md`.

---

*Design Handoff prepared by Claude Code acting as Lead Software Architect for Portfolio OS.*
*Repository ready for Design Phase: 2026-06-29.*
