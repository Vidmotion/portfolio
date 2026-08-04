# figma/ — Design Source of Truth

> **Status:** Awaiting Design Phase
> **Last Updated:** 2026-06-29

---

## Purpose

This directory is the designated home for all Figma-related assets produced during the Design Phase.

The Figma workspace created by Claude Design becomes the **visual source of truth** for Portfolio OS — the single authoritative reference for every visual, interaction, and component decision.

Once the Figma workspace is approved, it supersedes any visual ambiguity in the written documentation. Claude Code must use the approved Figma workspace **together** with `docs/` and `design/` during implementation. Neither the Figma file alone nor the written documentation alone is sufficient — both are required.

---

## Directory Structure

```
figma/
├── README.md          — This file
├── exports/           — Exported assets (PNG, SVG, icons, wallpapers)
├── prototype/         — Prototype links, flow recordings, interaction videos
├── handoff/           — Engineering handoff exports (token JSON, spacing specs, component specs)
└── archive/           — Previous Figma versions (preserved, never deleted)
```

### `exports/`

Contains assets exported directly from Figma.

Examples: app icons, desktop icons, wallpapers, SVG illustrations, PNG assets, icon sprite sheets.

File naming convention: `[component]_[variant]_[size].[ext]`

Example: `icon_finder_128.svg`, `wallpaper_default_2x.png`

### `prototype/`

Contains anything related to prototyped interactions.

Examples: Figma prototype share links (in a `links.md` file), screen recordings of prototype flows, annotated flow diagrams.

### `handoff/`

Contains engineering-ready exports from the Figma handoff page.

Examples: design token JSON files, spacing tables, component specification documents, motion specification exports.

Claude Code will read files from this directory during implementation.

### `archive/`

Contains previous versions of the Figma file.

When the Figma file is updated, the previous approved version is moved here before the new version is used.

Never delete files from archive/.

---

## Workflow

```
Claude Design produces Figma workspace
        ↓
Figma workspace reviewed and approved
        ↓
Assets exported to figma/exports/
Handoff specs exported to figma/handoff/
Prototype links saved to figma/prototype/
        ↓
Claude Code reads figma/handoff/ + docs/ + design/ during implementation
```

---

## Relationship with Documentation

| Directory | Role |
|-----------|------|
| `docs/` | Product Bible — architecture, engineering standards, motion specs |
| `design/` | Creative Bible — visual direction, creative philosophy, Figma structure |
| `figma/` | Visual Source of Truth — approved Figma output, exported assets, handoff specs |
| `references/` | Inspiration — principles only, never copied |

When a conflict exists between `docs/` and `figma/`, resolve it explicitly — do not silently prefer one over the other. Document the resolution.

---

## Status

The Figma workspace has not yet been produced.

This directory will be populated when the Design Phase begins.

See `CLAUDE_DESIGN_MASTER_PROMPT.md` in the repository root for the complete design brief.
