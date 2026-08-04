# Core

Core is the single source of truth for data and shared business logic consumed by all three Portfolio OS presentation surfaces — Desktop, Tablet, Mobile. It contains no platform-specific rendering, layout, or interaction code, and no React components.

**Governing documents:** RFC-0002 (Architecture), RFC-0003 (Migration Blueprint), RFC-0004 (Architecture Freeze Review). This README summarizes the charter; those documents are the source of truth for rationale.

**What belongs in Core:**
- Cross-platform data registries (project categories, dock apps, identity/contact, wallpaper variants)
- Shared content (projects, notes, photo albums)
- Shared business logic and services (motion primitives, category/window utilities)
- Shared type contracts

**What does not belong in Core:**
- Anything platform-specific (Desktop/Tablet/Mobile components, layout, interaction)
- React state (stores belong in `store/`, not here)
- Anything with a single consumer only — Core exists for data more than one platform reads

**Current structure:**
- `registries/` — data-registry modules. Empty as of Sprint 2; populated starting Sprint 3 (category registry), Sprint 8a (dock app registry), Sprint 11a (identity/contact registry).

**Not yet relocated here:** `lib/content.ts`, `lib/motion.ts`, `lib/utils.ts` remain in `lib/` — conceptually part of Core's responsibility, but no migration sprint currently moves them. They stay where they are until a sprint is explicitly scoped to do so.
