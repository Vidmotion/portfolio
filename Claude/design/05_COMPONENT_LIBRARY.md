# COMPONENT LIBRARY — Design System Inventory

> **Version:** 2.0
> **Status:** Pre-Production
> **Last Reviewed:** 2026-06-29

---

## Purpose

This document defines every component that should exist within the Portfolio OS Design System.

Its objective is to ensure that every interface is built from reusable components rather than custom layouts.

The component library should become the foundation of every desktop, tablet and mobile screen.

No interface should be designed outside of this system.

---

# Philosophy

The component library should behave like a professional product design system.

Every component must be:

Reusable

Scalable

Documented

Accessible

Adaptive

Variant-based

Auto Layout compatible

Variable-driven

No component should exist only once.

Everything should be reusable.

---

# Foundations

Before creating UI components, create the foundational design elements.

These include:

Typography Styles

Color Variables

Spacing Variables

Radius Variables

Shadow Variables

Blur Variables

Opacity Variables

Motion Variables

Grid System

Icon Grid

These are dependencies for every other component.

---

# Core Components

These components represent the smallest reusable building blocks.

Examples include:

Button

Icon Button

Text Link

Chip

Badge

Divider

Avatar

Tooltip

Progress Indicator

Loader

Scrollbar

Selection Indicator

Focus Ring

Context Highlight

Cursor

Each component should include all interaction states.

---

# Navigation Components

The operating system relies heavily on navigation.

Design reusable navigation components for:

Menu Bar

Dock

Dock Item

Dock Folder

Sidebar

Sidebar Item

Sidebar Section

Toolbar

Breadcrumb

Search Bar

Navigation Tabs

Segmented Control

Every navigation component should support active, hover and focus states.

---

# Window Components

Windows are one of the most important parts of the system.

Create reusable components for:

Window

Window Header

Window Toolbar

Window Controls

Window Body

Window Sidebar

Window Footer

Resizable Borders

Window Shadow

Window Overlay

Window Loading State

Window Empty State

Window Error State

All windows should share one visual language.

---

# Finder Components

The Finder should be built from reusable parts.

Include:

Finder Window

Folder Card

Folder Grid

Folder List

File Card

Preview Panel

Sidebar

Navigation Bar

Search

Toolbar

Selection States

Context Menu

Breadcrumb

Status Bar

These components should support multiple layouts.

---

# Desktop Components

The desktop experience includes:

Desktop Background

Desktop Grid

Desktop Icon

Desktop Folder

Desktop Selection

Desktop Context Menu

Desktop Widget Area

Desktop Drop Zone

Desktop Notification

Desktop Shortcut

Desktop Empty State

Everything should remain modular.

---

# Dock Components

The Dock should include:

Dock

Dock Item

Dock Folder

Dock Separator

Running Indicator

Hover State

Magnification State

Active State

Context Menu

Bounce Animation

Notification Badge

---

# Widget Components

Widgets include:

Spotify

Photos

Notes

Clock

Quote

Recent Projects

Recent Photos

Widget Container

Widget Header

Widget Footer

Widget Actions

Widgets should be composable.

**v1 scope:** Spotify, Photos, Notes, Clock, Quote, Recent Projects, Recent Photos.

**v2 scope:** Calendar, Weather. These are planned but not included in the first release. Do not design them as part of the v1 system. See `docs/12_ROADMAP.md` for the full v2 scope list.

---

# Portfolio Components

Portfolio-specific components include:

Project Card

Project Cover

Project Gallery

Project Metadata

Credits

Category Badge

Client Information

Related Projects

Project Timeline

Project Navigation

Media Controls

Each project layout should reuse existing components.

---

# Photography Components

Photography requires:

Album Card

Photo Grid

Photo Viewer

Metadata Panel

Fullscreen Viewer

Image Navigation

Slideshow Controls

Album Navigation

Favorite Indicator

Photography should prioritize immersion.

---

# Notes Components

The Notes experience includes:

Note List

Note Viewer

Pinned Notes

Folders

Search

Toolbar

Reading Mode

Typography should become the primary interface.

Notes is a read-only viewer in v1. Users read MDX content — they do not create or edit notes. Note Editor and Writing Mode are v2 scope and should not be designed as part of the v1 system.

---

# Media Components

Create reusable components for:

Video Player

Audio Player

Image Viewer

Fullscreen Viewer

Thumbnail Grid

Playback Controls

Volume Controls

Timeline

Poster Image

Captions

Loading

Error States

Media should feel native.

---

# Overlay Components

Include:

Modal

Popover

Context Menu

Dropdown

Quick Preview

Command Palette

Confirmation Dialog

Toast Notification

Overlay Background

Focus Trap

---

# Feedback Components

Feedback includes:

Loading

Success

Warning

Error

Offline

Empty State

Retry State

Skeleton

Progress

Feedback should remain subtle.

---

# Mobile Components

Design independent mobile components.

Examples include:

Lock Screen

Status Bar

Dynamic Island

Home Screen

App Icon

Folder

Dock

Bottom Navigation

Sheet

Gesture Area

Project Viewer

Photo Viewer

Widgets

These should not simply scale desktop components.

---

# Tablet Components

Tablet components should support touch interaction.

Include:

Adaptive Sidebar

Floating Window

Touch Toolbar

Split View

Drag Targets

Touch Selection

Landscape Layout

Portrait Layout

---

# Interaction States

Every interactive component should support:

Default

Hover

Pressed

Focused

Selected

Active

Disabled

Loading

Error

Success

Never create separate components for states.

Use Variants.

---

# Component Documentation

Every major component should contain:

Purpose

Usage

Variants

Properties

Behaviour

Accessibility Notes

Do

Don't

Future contributors should understand the component without external explanation.

---

# Naming Convention

Component names should remain explicit.

Examples:

Window / Default

Window / Active

Window / Inactive

Button / Primary

Button / Secondary

Finder / Sidebar

Finder / Toolbar

Avoid vague names.

---

# Scalability

The library should comfortably support future additions.

Adding a new application should require combining existing components rather than creating entirely new ones.

The design system should evolve through composition.

Not duplication.

---

# Definition of Done

The Component Library is complete when:

Every interface is built entirely from reusable components.

Every component supports variants.

Every component uses Variables.

Every component uses Auto Layout.

Every component is documented.

Every component is ready for engineering handoff.

The design system should function as the visual foundation of the entire Portfolio OS.

---

## Cross-References

| Topic | Document |
|-------|----------|
| Design token primitive values | `docs/DESIGN_FOUNDATIONS.md` |
| Component visual specifications | `docs/DESIGN_SYSTEM.md` |
| Motion spring presets and timing | `docs/MOTION.md` |
| v1 scope and widget inventory | `docs/12_ROADMAP.md` |
| Figma workspace structure | `design/04_FIGMA_STRUCTURE.md` |
| Engineering handoff definition | `design/07_DESIGN_DELIVERABLES.md` |
