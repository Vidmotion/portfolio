# FIGMA STRUCTURE — Workspace Architecture

> **Version:** 2.0
> **Status:** Pre-Production
> **Last Reviewed:** 2026-06-29

---

## Purpose

This document defines the structure of the Figma workspace for Portfolio OS.

Its objective is to ensure that the final design file is scalable, maintainable and production-ready.

The Figma file should not simply contain screens.

It should contain a complete design system.

The design system becomes the single source of truth for every future design and engineering decision.

---

# General Philosophy

The Figma workspace should behave like a professional product design file.

Every page.

Every component.

Every variable.

Every prototype.

Every interaction.

Everything should have a clear purpose.

The file should remain understandable years from now.

Future designers should immediately understand its organization.

---

# Naming Convention

Every page should follow a consistent naming convention.

Use numerical prefixes to preserve reading order.

Example:

00 Cover

01 Foundations

02 Variables

03 Typography

04 Colors

05 Components

06 Desktop

07 Tablet

08 Mobile

09 Prototypes

10 Handoff

Avoid generic names such as:

New Page

Final

Desktop Copy

Version 2

Temp

---

# Page 00 — Cover

The cover introduces the project.

It should contain:

Project Name

Version

Last Update

Author

Project Description

Quick Navigation

Useful Links

Documentation References

The cover should immediately orient every future contributor.

---

# Page 01 — Foundations

This page defines the visual foundations.

Include:

Design Principles

Grid

Spacing

Radius

Elevation

Glass

Blur

Opacity

Icon Sizes

Spacing Scale

Typography Scale

Everything here should become reusable variables.

---

# Page 02 — Variables

Use Figma Variables extensively.

Create dedicated collections for:

Colors

Spacing

Radius

Opacity

Effects

Motion

Typography

Sizing

Future themes should require changing variables rather than components.

Motion variables must align with the spring presets and timing values defined in `docs/MOTION.md`.

Spring presets: Default (stiffness 220, damping 28), Large Window (170/24), Dock (300/20), Cursor (420/32).

Timing tokens: Micro (120ms), Hover (180ms), Selection (220ms), Open (350ms), Close (280ms), Window (450ms), Page (650ms).

Variable names in Figma must match the token names in `docs/DESIGN_FOUNDATIONS.md` exactly.

Never hardcode transition durations or easing in component interactions.

---

# Page 03 — Typography

Organize typography systematically.

Include:

Display

Heading

Title

Subtitle

Body

Caption

Label

Metadata

Document every text style.

Avoid duplicated styles.

---

# Page 04 — Colors

Organize colors by semantic purpose.

Examples:

Surface

Background

Glass

Border

Text Primary

Text Secondary

Accent

Success

Warning

Error

Information

Avoid naming colors by appearance.

Prefer semantic naming.

---

# Page 05 — Components

This is the largest page.

Every reusable component belongs here.

Components should be grouped logically.

Examples:

Buttons

Inputs

Windows

Folders

Dock

Menu Bar

Widgets

Cards

Lists

Media Player

Photo Viewer

Video Viewer

Context Menu

Sidebar

Toolbar

Search

Scrollbars

Loading States

Empty States

Notifications

Every component should support variants.

---

# Component Rules

Every component should include:

Variants

Interactive States

Auto Layout

Constraints

Variables

Clear Naming

Documentation

Never duplicate components.

Always extend existing ones.

---

# Page 06 — Desktop

This page contains desktop templates.

Examples:

Desktop

Finder

Application Windows

Dock

Widgets

Desktop Icons

Context Menus

Desktop Variations

Templates should only use reusable components.

Never detached objects.

---

# Page 07 — Tablet

Tablet receives its own dedicated page.

It is not a resized desktop.

Touch interaction should influence layout.

Templates should demonstrate adaptive behaviour.

---

# Page 08 — Mobile

The mobile experience should be organized independently.

Include:

Lock Screen

Unlock

Home Screen

Applications

Folders

Project Viewer

Photo Viewer

Navigation

Everything should feel inspired by iOS while remaining original.

---

# Page 09 — Prototypes

This page demonstrates interactions.

Prototype the complete experience.

Examples:

Boot Sequence

Desktop Entry

Finder Navigation

Opening Projects

Window Management

Widgets

Mobile Unlock

Application Launch

Closing Windows

Project Navigation

Prototype every meaningful transition.

---

# Page 10 — Developer Handoff

Prepare this page specifically for engineering.

Include:

Spacing References

Grid

Measurements

Variables

Tokens

Interaction Notes

Motion References

Accessibility Notes

Platform Adaptation Notes

Engineering should require minimal interpretation.

---

# Auto Layout

Every layout should use Auto Layout.

Avoid manually positioned interface elements whenever possible.

Components should resize naturally.

Platform-specific layouts should be demonstrated.

---

# Variables

Every reusable value should become a Variable.

Examples include:

Color

Spacing

Radius

Typography

Effects

Corner Radius

Stroke

Opacity

Never hardcode visual values.

---

# Components

Prefer composition over duplication.

Build systems.

Not isolated components.

Every larger interface should be assembled from reusable building blocks.

---

# Variants

Components should expose meaningful variants.

Examples:

Default

Hover

Pressed

Focused

Disabled

Active

Selected

Loading

Avoid creating separate components for every state.

---

# Documentation

Every complex component should contain usage notes.

Document:

Purpose

Variants

Behaviour

Do

Don't

Future contributors should understand components without external explanation.

---

# Prototyping Philosophy

Prototype interactions.

Not screens.

Movement should communicate relationships.

The objective is to validate the experience before implementation begins.

---

# Scalability

The Figma file should comfortably support future growth.

New applications.

New widgets.

New operating system features.

New portfolio categories.

No restructuring should become necessary.

---

# Definition of Done

The Figma workspace is considered complete when:

Every screen is built using reusable components.

Every reusable value is a Variable.

Every interaction is prototyped.

Every platform is represented.

Every component is documented.

The entire interface is ready for engineering handoff.

Claude Code should be able to implement Portfolio OS using the Figma file together with the project documentation without requiring additional design decisions.

---

## Cross-References

| Topic | Document |
|-------|----------|
| Design token primitive values | `docs/DESIGN_FOUNDATIONS.md` |
| Component visual specifications | `docs/DESIGN_SYSTEM.md` |
| Motion spring presets and timing | `docs/MOTION.md` |
| Engineering handoff requirements | `design/07_DESIGN_DELIVERABLES.md` |
| Component library inventory | `design/05_COMPONENT_LIBRARY.md` |
| Prototype flows | `design/06_PROTOTYPE_FLOW.md` |
