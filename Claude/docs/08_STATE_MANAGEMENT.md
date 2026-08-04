# STATE_MANAGEMENT.md

# Portfolio OS State Management

Version: 1.0

---

# Purpose

This document defines how application state is managed throughout Portfolio OS.

The project follows a modular state architecture designed for long-term scalability.

Every state should have a single owner.

Every piece of information should exist only once.

The application should remain predictable regardless of its future complexity.

---

# Philosophy

Portfolio OS behaves like an operating system.

Every subsystem owns its own state.

There is no central "god store".

Every module is isolated.

Communication happens through actions instead of direct mutations.

The architecture must remain understandable after years of development.

---

# State Hierarchy

Application

↓

System

↓

Feature

↓

Component

↓

Local UI

Each level has a different responsibility.

---

# State Categories

Portfolio OS contains four categories of state.

Global State

Shared between multiple systems.

Feature State

Shared inside one application.

UI State

Temporary interface state.

Local State

Owned by one component only.

Each type should be stored differently.

---

# Global State

Global state should be extremely small.

Only information required across multiple systems belongs here.

Examples

Current Theme

Active Windows

Focused Window

Desktop Wallpaper

Dock Configuration

Open Applications

Settings

Cursor Mode

Current User Preferences

Nothing else.

---

# Feature State

Every application owns its own state.

Examples

Finder

Spotify

Photos

Notes

Settings

Each application manages its own internal logic.

Applications never modify each other's state directly.

---

# Local State

React state should always be preferred for:

Inputs

Hover

Selection

Open dropdowns

Temporary animations

Drag offsets

Resize handles

Temporary loading

Never move temporary state into Zustand.

---

# Zustand Philosophy

Zustand is the single global state library.

No Redux.

No Context for business logic.

No MobX.

No duplicated state.

The goal is simplicity.

---

# Store Architecture

Each store owns exactly one domain.

Example

stores/

desktopStore.ts

windowStore.ts

finderStore.ts

spotifyStore.ts

photoStore.ts

settingsStore.ts

cursorStore.ts

notificationStore.ts

themeStore.ts

dockStore.ts

No store should become responsible for unrelated systems.

---

# Store Responsibilities

desktopStore

Wallpaper

Desktop Icons

Desktop Selection

Desktop Settings

---

windowStore

Open Windows

Focused Window

Window Order

Window Position

Window Size

Window State

---

finderStore

Folders

Current Path

Selection

Search

Sorting

View Mode

History

---

spotifyStore

Current Track

Current Playlist

Playback

Volume

Shuffle

Repeat

Queue

---

photoStore

Albums

Current Photo

Gallery

Zoom

Filters

Selection

---

settingsStore

Appearance

Theme

Language

Accessibility

Performance Options

Wallpaper

Preferences

---

dockStore

Applications

Pinned Apps

Running Apps

Recent Apps

Hover State

Magnification

---

cursorStore

Cursor Mode

Cursor Label

Cursor Preview

Cursor Visibility

Cursor Position

---

notificationStore

Queue

Visibility

Duration

Priority

Read State

---

# Store Communication

Stores never modify each other directly.

Communication always happens through actions.

Good

Window opens

↓

windowStore updates

↓

Finder reacts

Bad

Finder directly edits Window Store internals.

---

# Selectors

Always subscribe to the smallest possible state.

Good

useWindowStore(state => state.activeWindow)

Bad

useWindowStore()

Selectors reduce unnecessary renders.

---

# Actions

Every state modification should happen through actions.

Example

openWindow()

closeWindow()

focusWindow()

pinApplication()

changeWallpaper()

playTrack()

pauseTrack()

Actions should describe intentions.

Never expose raw state mutations.

---

# Async Logic

Async operations belong inside hooks or dedicated services.

Stores should remain lightweight.

Example

Spotify API

↓

Hook

↓

Store Action

↓

Component

Stores should never become API clients.

---

# Derived State

Never duplicate information.

Example

Bad

selectedPhotoCount

selectedPhotos.length

Good

selectedPhotos.length

Derived state should always be computed.

---

# Persistence

Only user preferences should persist.

Examples

Theme

Wallpaper

Dock Configuration

Window Layout

Accessibility Settings

Language

Temporary interface state should never persist.

---

# Performance

State changes should only update affected components.

Avoid broad subscriptions.

Avoid unnecessary updates.

Keep stores as small as possible.

Performance is considered part of state architecture.

---

# Three.js State

Three.js objects should never be stored inside Zustand.

Store only identifiers or configuration.

Scene objects belong inside React Three Fiber.

GPU resources should remain isolated.

---

# Future Expansion

The architecture should support:

New Applications

New Widgets

Cloud Sync

Multi-language

Authentication

Collaboration

Without redesigning existing stores.

---

# AI Development Rules

Any AI assistant contributing to the project must follow these rules.

Never create a new store before verifying that one does not already exist.

Never duplicate state.

Never bypass actions.

Never place temporary UI state inside global stores.

Never create circular dependencies between stores.

Always keep stores independent.

---

# Engineering Principles

One responsibility per store.

One source of truth.

One direction of data flow.

Predictability over convenience.

Maintainability over shortcuts.

Scalability over immediate implementation.

The state architecture is considered part of the operating system and must remain stable throughout the lifetime of Portfolio OS.