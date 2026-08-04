# ARCHITECTURE.md

# Portfolio OS Architecture

**Version:** 1.0

---

# Purpose

This document defines the complete software architecture of Portfolio OS.

The architecture is designed to maximize scalability, maintainability and consistency.

Every future implementation must strictly follow the rules defined in this document.

Architecture decisions always take priority over implementation speed.

---

# Architectural Philosophy

Portfolio OS is not built around pages.

It is built around independent systems.

Each system is responsible for one specific part of the application.

Systems communicate with each other through shared state instead of direct dependencies.

No component should know more than necessary.

The project follows a composition-first architecture.

---

# High-Level Architecture

Portfolio OS is composed of the following core systems.

Desktop

↓

Window Manager

↓

Applications

↓

Projects

↓

Content

↓

Assets

The Desktop is always the root of the experience.

Applications are launched from the Desktop.

Applications open inside windows.

Windows display portfolio content.

Content loads structured assets.

---

# Project Structure

The project follows a feature-oriented architecture.

```
app/

components/

hooks/

providers/

stores/

animations/

content/

config/

lib/

styles/

types/

public/

docs/
```

Every directory has a single responsibility.

---

# app/

The app directory contains routing only.

It should never contain business logic.

Responsibilities:

* Application routes
* Layouts
* Metadata
* API routes

No reusable UI components belong here.

---

# components/

The components directory contains every reusable interface element.

Components must never contain business logic.

Components should only receive data and callbacks.

Components are grouped by system.

Example:

```
components/

desktop/

dock/

finder/

window/

widgets/

menu-bar/

photos/

notes/

spotify/

shared/
```

Every component must have a single responsibility.

---

# hooks/

Hooks contain reusable application logic.

Hooks should never render UI.

Hooks should never depend on visual components.

Examples:

```
useWindow()

useFinder()

useDock()

useSpotify()

usePhotos()

useKeyboard()

useCursor()

useDrag()

useResize()
```

Hooks may use stores.

Hooks may never manipulate the DOM directly unless absolutely necessary.

---

# providers/

Providers initialize global systems.

Examples:

ThemeProvider

WindowProvider

AudioProvider

SettingsProvider

Providers should only initialize contexts.

Business logic belongs elsewhere.

---

# stores/

Global application state is managed with Zustand.

Each feature owns its own store.

Never create a single global store.

Preferred structure:

```
stores/

desktopStore.ts

windowStore.ts

finderStore.ts

dockStore.ts

spotifyStore.ts

photoStore.ts

settingsStore.ts
```

Each store owns only its own state.

Stores communicate through actions.

---

# animations/

Every animation lives inside its own module.

Animations should never be scattered across components.

Structure:

```
animations/

dock/

finder/

window/

widgets/

cursor/

desktop/

page/
```

Animation parameters should be centralized whenever possible.

---

# content/

Content is completely separated from the application.

No portfolio information should ever be hardcoded.

Example:

```
content/

work/

music/

fashion/

advertising/

personal/

photos/

notes/
```

Every project is stored inside its own folder.

Example:

```
music/

artist-name/

project.json

cover.webp

gallery/

videos/

credits.md
```

Adding a project should never require modifying React components.

---

# config/

Configuration files.

Examples:

Theme

Dock

Widgets

Navigation

Menu Bar

Applications

Everything configurable belongs here.

---

# lib/

Utility functions.

Examples:

Spotify API

Image Loader

Markdown Parser

Date Utilities

Window Utilities

Helpers

Utility functions should never depend on React.

---

# styles/

Global styling.

Contains:

Global CSS

Variables

Tailwind configuration

Fonts

Never place component-specific styles here.

---

# types/

Shared TypeScript types.

Examples:

Project

Photo

Folder

Window

Widget

Application

Store

Configuration

Types should remain framework-independent whenever possible.

---

# public/

Static assets.

Contains:

Icons

Wallpapers

Fonts

Images

Videos

Audio

Do not place portfolio metadata here.

---

# docs/

Project documentation.

Every architectural decision must be documented here before implementation.

Documentation is considered part of the application.

---

# Core Systems

Portfolio OS consists of independent systems.

Desktop

Window Manager

Finder

Dock

Menu Bar

Widgets

Applications

Cursor

Notifications

Spotlight

Settings

Each system evolves independently.

---

# Window Manager

The Window Manager is the heart of the application.

Every application opens inside a reusable window component.

Responsibilities:

Open windows

Close windows

Minimize windows

Maximize windows

Restore windows

Drag windows

Resize windows

Manage z-index

Manage focus

No application should implement its own window behavior.

---

# Finder

Finder is the portfolio browser.

It is not responsible for rendering projects.

It only manages folders and navigation.

Projects are displayed through reusable components.

---

# Desktop

The Desktop is always active.

Responsibilities:

Wallpaper

Desktop Icons

Widgets

Dock

Menu Bar

Open Windows

Notifications

Desktop never contains portfolio content directly.

---

# Applications

Applications are independent modules.

Examples:

Finder

Photos

Notes

Spotify

Mail

Instagram

Settings

Future applications should require minimal setup.

---

# Widgets

Widgets display live information.

Widgets never own data.

They consume data from stores.

Examples:

Spotify

Photos

Clock

Notes

Calendar

Weather

Quote

Widgets should remain lightweight.

---

# Data Flow

Portfolio OS follows a one-way data flow.

Content

↓

Store

↓

Hook

↓

Component

↓

User Interaction

↓

Action

↓

Store

No component should fetch data directly unless explicitly required.

---

# Dependency Rules

Components may use:

Hooks

Stores

Utilities

Types

Components may not depend on:

Pages

Other applications

Unrelated systems

Circular dependencies are forbidden.

---

# Naming Convention

Components:

PascalCase

Hooks:

camelCase beginning with use

Stores:

camelCase ending with Store

Types:

PascalCase

Folders:

kebab-case

Files:

Match exported component names whenever possible.

---

# Scalability

Every new feature should integrate into the existing architecture.

No redesign should be required to support:

Hundreds of projects

Thousands of photographs

Additional applications

Multiple themes

Future operating system features

Scalability is a design requirement rather than an optimization.

---

# Architecture Principles

Always prioritize architecture over implementation.

Never duplicate logic.

Prefer composition over inheritance.

Keep components small.

Keep systems isolated.

Keep data separate from presentation.

Document architectural changes before implementing them.

These principles are mandatory for every future contribution to Portfolio OS.
