# DESIGN_SYSTEM.md — Design System

> **Version:** 2.0
> **Status:** Pre-Production
> **Last Reviewed:** 2026-06-29

---

## Purpose

This document defines the visual language and component behavior of Portfolio OS — how design tokens are applied to the interface.

**Design primitives (exact token values for colors, typography, spacing, radii, shadows, elevation)** are defined in [DESIGN_FOUNDATIONS.md](DESIGN_FOUNDATIONS.md). This document defines how those tokens are applied to components and systems.

Every interface element must follow these rules.

Consistency is more important than creativity.

Portfolio OS is inspired by macOS and iOS but is not intended to replicate them pixel by pixel.

The goal is to create a believable creative operating system dedicated to Carlo Desantis' portfolio.

---

# Design Philosophy

The interface should feel:

Minimal

Elegant

Premium

Soft

Modern

Editorial

Calm

Fast

Every element should appear intentional.

Nothing should exist only for decoration.

Animations must reinforce usability.

Whitespace is considered part of the design.

---

# Visual Inspirations

Main inspirations include:

macOS Sonoma

iOS 18

Apple Human Interface Guidelines

ByChudy Portfolio

Ludovico Scurto Portfolio

Apple Music

Apple Photos

Spotify Desktop

Notion

Arc Browser

The final design must become a unique visual identity rather than a copy of any reference.

---

# Color System

The application uses a very limited color palette.

Neutral colors dominate.

Accent colors appear only where interaction is required.

The complete color token system (primitive values, semantic tokens, glass materials) is defined in [DESIGN_FOUNDATIONS.md](DESIGN_FOUNDATIONS.md).

Key semantic values for quick reference:

- Desktop background: `bg-primary` (#ECECEC)
- Window glass: `bg-window` (rgba(255,255,255,0.72) + blur 40px)
- Primary text: `text-primary` (#111111)
- Secondary text: `text-secondary` (#666666)
- Divider: `border-subtle` (rgba(0,0,0,0.08))
- Hover overlay: `hover-overlay` (rgba(255,255,255,0.12))
- Active overlay: `active-overlay` (rgba(255,255,255,0.22))

Never use arbitrary color values. Every color must derive from the token system in `DESIGN_FOUNDATIONS.md`.

The interface should never become visually noisy.

---

# Typography

Primary Font

SF Pro Display

Fallback

Inter

Titles

Bold

Large

Very tight spacing

Body

Regular

Clean spacing

Captions

Medium

Uppercase only when necessary

Typography should resemble Apple's hierarchy.

Never use decorative fonts.

---

# Border Radius

No sharp corners exist in Portfolio OS. Every element uses rounded geometry.

Key values (full token table in [DESIGN_FOUNDATIONS.md](DESIGN_FOUNDATIONS.md)):

- Small cards, popovers: `--radius-md` (12px)
- Large cards, panels: `--radius-xl` (18px)
- Windows: `--radius-2xl` (22px)
- Large panels: `--radius-3xl` (24px)
- Widgets: `--radius-widget` (26px)
- Dock: `--radius-dock` (26px)

---

# Shadows

Only soft, realistic shadows. Never harsh elevation.

Key values (full shadow scale and semantic shadows in [DESIGN_FOUNDATIONS.md](DESIGN_FOUNDATIONS.md)):

- Window (default): `--shadow-window`
- Window (focused): `--shadow-window-focused`
- Window (inactive): `--shadow-window-inactive`
- Dock: `--shadow-dock`
- Widgets: `--shadow-widget`

---

# Blur

Glassmorphism should be subtle.

Backdrop Blur

40px

Opacity

70%

Glass should remain readable.

---

# Icons

Icons should always be high resolution.

Prefer SVG.

Use Apple's visual proportions.

Do not mix icon styles.

---

# Spacing System

Base Unit

8px

Spacing Scale

4

8

12

16

24

32

48

64

96

Every spacing decision should derive from this scale.

---

# Grid

Desktop

12 columns

Tablet

8 columns

Mobile

4 columns

Widgets align to the grid.

Floating elements should still respect alignment.

---

# Motion Philosophy

Animations should feel physical.

Nothing should instantly appear.

Everything should accelerate and decelerate naturally.

The interface should feel alive.

---

# Animation Principles

Use spring animations whenever possible.

Prefer Framer Motion.

Avoid CSS transitions for complex interactions.

Default Duration

0.45s

Default Spring

High damping

Low bounce

Animations should never distract from content.

---

# Hover States

Every interactive element should react.

Allowed reactions:

Scale

Glow

Blur

Shadow

Opacity

Cursor

Hover should never completely change the layout.

---

# Cursor

Cursor interactions are extremely important.

Cursor should become part of the interface.

Possible states include:

Default

Hover

Dragging

Loading

Playing

Opening

Closing

Text

Disabled

Cursor animations should feel fluid.

---

# Windows

Windows are the heart of the experience.

Characteristics:

Rounded

Blurred

Shadowed

Resizable

Draggable

Layered

Windows should feel almost identical to native macOS.

---

# Dock

The Dock behaves similarly to macOS.

Features include:

Magnification

Hover animation

Bounce animation

Running indicator

Open animation

Drag reorder (future)

The Dock is always centered.

---

# Widgets

Widgets follow Apple's design language.

Large rounded corners.

Soft shadows.

Glass backgrounds when necessary.

Each widget has a clear hierarchy.

Widgets never contain unnecessary decorations.

---

# Finder

Finder should resemble macOS while remaining unique.

Sidebar

Toolbar

Grid View

List View

Folder Navigation

Smooth opening animations

Window persistence

---

# Photos

Large visual previews.

Generous spacing.

Minimal interface.

Focus remains on photography.

---

# Spotify Widget

Displays:

Playlist Cover

Song Title

Artist

Playback Controls

Progress Bar

Album Artwork

Eventually connected to Spotify API.

---

# Notes

Notes resemble Apple Notes.

Large typography.

Comfortable reading width.

Minimal toolbar.

Markdown support is optional.

---

# Wallpapers

Wallpapers define the emotional tone.

Every wallpaper should:

Be cinematic

Minimal

High resolution

Soft colors

Not distract from widgets

---

# Responsive Design

Desktop is the primary experience.

Tablet adapts Desktop.

Mobile becomes an iPhone interface.

The three experiences share the same design language.

---

# Accessibility

High contrast text.

Keyboard navigation.

Visible focus states.

Readable font sizes.

Respect reduced motion preferences.

---

# Future Design Evolution

The Design System should be scalable.

Future themes may include:

Dark Mode

Night Mode

Minimal Mode

Editorial Mode

Every new component must first be aligned with this Design System before implementation.

Visual consistency always takes priority over speed.

---

## Cross-References

| Topic | Document |
|-------|----------|
| Exact design token values | [DESIGN_FOUNDATIONS.md](DESIGN_FOUNDATIONS.md) |
| Apple interaction principles | [APPLE_HIG.md](APPLE_HIG.md) |
| Motion specifications | [MOTION.md](MOTION.md) |
| Component implementations | [COMPONENTS.md](COMPONENTS.md) |