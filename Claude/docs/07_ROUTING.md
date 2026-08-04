# ROUTING.md — Routing Architecture

> **Version:** 2.0
> **Status:** Pre-Production
> **Last Reviewed:** 2026-06-29

---

# Purpose

This document defines the navigation architecture of Portfolio OS.

Portfolio OS should not behave like a traditional website.

Users should rarely perceive page navigation.

Instead, they should interact with applications, windows and desktop elements inside a persistent operating system.

The routing architecture must support both web navigation and native operating system interactions.

---

# Routing Philosophy

The application is desktop-first.

The Desktop represents the root of the experience.

Users navigate by opening applications rather than visiting pages.

URLs exist primarily for deep linking and browser compatibility.

The interface should preserve the illusion of a continuously running operating system.

---

# Navigation Principles

Navigation should always feel spatial.

Users should understand where they are.

Users should understand where they came from.

Users should understand what opened.

No navigation should feel abrupt.

The browser should never feel like the primary navigation system.

The operating system should.

---

# Root Experience

The application always starts from:

/

This route represents the desktop.

Everything else exists inside the desktop.

Desktop is never destroyed while navigating.

Applications simply appear above it.

---

# Applications

Applications are independent modules.

Each application owns its own route.

Examples:

/

Desktop

/work

Finder

/photos

Photos

/notes

Notes

/settings

Settings

Future applications may include:

/music

/calendar

/spotify

/about

/contact

Applications should remain independent.

---

# Deep Linking

Every project should be directly accessible through a unique URL.

Example:

/work/music/artist-name

/work/fashion/project-name

/work/advertising/project-name

Users opening a deep link should immediately see the corresponding application and window.

The desktop should still exist beneath it.

---

# Window Routing

Opening an application should update the URL.

Closing the application should restore the previous URL.

Browser navigation should behave naturally.

Back button

↓

Close current window

Back again

↓

Return to previous application

The browser history should remain intuitive.

---

# Finder Navigation

Finder manages its own internal navigation.

Folders should not trigger full page reloads.

Folder navigation updates internal application state.

Important locations may also update the browser URL.

Example:

Finder

↓

Music

↓

Artist

↓

Project

Navigation should always feel instant.

---

# Project Navigation

Projects open inside Finder.

Projects should not replace Finder.

Finder remains visible.

The project simply becomes the active content.

Navigation hierarchy:

Desktop

↓

Finder

↓

Category

↓

Project

↓

Gallery

---

# Photo Navigation

Photos should support:

Albums

Collections

Favorites

Search

Fullscreen

Navigation should preserve scroll position.

Opening a photo should not recreate the gallery.

---

# Notes Navigation

Notes behave similarly to Apple Notes.

Selecting a note updates only the content panel.

The application remains mounted.

---

# Widget Navigation

Widgets should never navigate directly.

Instead they open their corresponding application.

Spotify Widget

↓

Spotify App

Photo Widget

↓

Photos App

Notes Widget

↓

Notes App

Calendar Widget

↓

Calendar App

Widgets are shortcuts.

They are not destinations.

---

# External Links

External services open outside Portfolio OS.

Examples:

Spotify

Instagram

Behance

Dribbble

LinkedIn

Adobe Portfolio

External navigation should never interrupt the operating system unnecessarily.

---

# URL Philosophy

URLs should remain human readable.

Good

/work/music/tony-boy

/photos/editorial/paris

Bad

/project?id=273

URLs should describe content.

Never implementation.

---

# Route Naming

Routes should use:

lowercase

kebab-case

No spaces.

No underscores.

No version numbers.

No implementation details.

---

# Dynamic Routes

Dynamic routes should be generated from content.

Examples:

/work/[category]/[project]

/photos/[album]

/notes/[slug]

The application should never require manually creating routes for individual projects.

---

# Error Handling

Unknown routes should gracefully recover.

Unknown project

↓

Project Not Found

Unknown album

↓

Album Not Found

Unknown note

↓

Note Not Found

Desktop should remain active.

The operating system should never crash.

---

# Loading States

Navigation should never block rendering.

Use progressive loading.

Applications may appear before their content loads.

Users should always receive immediate feedback.

---

# Browser History

Browser history should remain meaningful.

Every significant interaction should be navigable using:

Back

Forward

Refresh

Deep links

The application should never break browser expectations.

---

# Scroll Restoration

Applications should restore previous state.

Finder remembers:

Current folder

Scroll position

Selection

Photos remembers:

Album

Current photo

Zoom level

Notes remembers:

Selected note

Scroll position

Users should feel continuity.

---

# Mobile Routing

Mobile follows the same routing structure.

Only the presentation changes.

Desktop

↓

Window

becomes

Mobile

↓

Native iOS Application

Content architecture remains identical.

---

# Tablet Routing

Tablet shares the Desktop routing structure.

The Desktop persists. Applications open inside Windows as on Desktop.

Key differences from Desktop:

There are no hover-only interactions. Every Desktop interaction that depends on hover must have a touch equivalent.

Context menus open via long-press instead of right-click.

Window drag is replaced by touch drag with appropriate touch target sizing.

The URL structure is identical to Desktop:

```
/                           Desktop (tablet layout)
/work/[category]/[project]  Finder (tablet layout)
/photos/[album]             Photos (tablet layout)
/notes/[slug]               Notes (tablet layout)
```

Tablet routing never introduces separate routes. The same routes render different layouts based on breakpoint detection in the layout component.

Deep links work identically on Tablet and Desktop. A deep link to `/work/film/project-name` opens Finder at the correct path on both platforms.

Focus management on Tablet:

Because touch users do not use keyboard navigation in the same way, focus rings are hidden by default on touch devices. They appear only when keyboard interaction is detected (using the `focus-visible` CSS pseudo-class).

When a Window opens on Tablet, it does not receive automatic keyboard focus — instead, it receives touch focus and becomes the active window in `windowStore`.

---

# SEO

Although Portfolio OS behaves like an application, every public project should remain indexable.

Each project should expose:

Metadata

Open Graph

Twitter Cards

Structured Data

Canonical URLs

SEO should never compromise the application experience.

---

# Accessibility

Navigation must support:

Keyboard navigation

Screen readers

Focus restoration

Meaningful page titles

Meaningful URLs

Accessibility always takes priority.

---

# Routing Rules for Contributors

These rules apply to all contributors.

Never introduce unnecessary pages.

Never duplicate routes.

Never create routes that bypass the operating system.

Always preserve browser navigation.

Always support deep linking.

Always keep the Desktop as the root experience.

Navigation should reinforce the illusion of using a real operating system.

See [CLAUDE.md](CLAUDE.md) for the complete AI collaboration guide and decision framework.

---

# Engineering Principles

Portfolio OS is an application, not a collection of pages.

The browser is a transport layer.

The Desktop is the true navigation system.

Routing exists to support the operating system, not replace it.

Every routing decision should preserve immersion, consistency and usability.

---

## Cross-References

| Topic | Document |
|-------|----------|
| State that persists across routes | [STATE_MANAGEMENT.md](STATE_MANAGEMENT.md) |
| Window open/close animations | [MOTION.md](MOTION.md) |
| Deep link content schema | [CONTENT.md](CONTENT.md) |
| SEO and metadata | [PERFORMANCE.md](PERFORMANCE.md) |
| Mobile and Tablet experience detail | [PROJECT.md](PROJECT.md) |