# CONTENT.md

# Portfolio OS State Management

Version: 1.0

---

# CONTENT

## Purpose

This document defines the complete content architecture of the Carlo Desantis portfolio.

Its objective is to establish how every piece of content should be organized, stored, displayed and expanded over time.

Unlike a traditional portfolio, content is not presented inside web pages.

Instead, every project lives inside a native operating system experience inspired by Apple's ecosystem.

The operating system is the interface.

The creative work is the product.

Every future implementation must respect this philosophy.

---

# Content Philosophy

The operating system exists for one purpose:

To present Carlo Desantis' creative work.

Nothing should compete with the projects themselves.

Whenever a visitor opens a project, the interface should become almost invisible.

Projects should always remain the protagonist.

The operating system should simply provide an elegant, intuitive and native way to navigate the portfolio.

The experience should never feel like browsing a website.

It should feel like opening someone's personal computer.

---

# Core Principles

Every piece of content should satisfy the following principles.

## Native

Content should feel like it belongs inside the operating system.

Not inside a webpage.

---

## Scalable

Adding a new project should never require structural changes.

The architecture must already support unlimited future work.

---

## Modular

Every content type should be independent.

Projects.

Photos.

Videos.

Albums.

Widgets.

Applications.

Everything should exist as its own reusable entity.

---

## Maintainable

Updating content should require minimal effort.

Developers should never modify UI components simply because a new project has been added.

---

## Performant

Content loading should always prioritize performance.

Only the necessary assets should be loaded.

Images should never block rendering.

Videos should load progressively.

---

## Accessible

Every content element should support accessibility standards.

Images require meaningful alt text.

Videos require titles and descriptions.

Interactive elements must be keyboard accessible.

---

# Content Categories

The portfolio is divided into independent content collections.

Each collection behaves like an application inside the operating system.

The primary categories are:

* Work
* Photography
* Personal Projects
* Notes
* Spotify
* Instagram
* Mail

Additional applications may be introduced in the future without changing the overall architecture.

---

# Work

The Work application contains all professional projects.

Projects are organized into categories rather than displayed chronologically.

The initial categories are:

* Music
* Fashion
* Advertising

Future categories may include:

* Documentary
* Commercial
* Editorial
* Social Campaign
* Experimental
* Behind The Scenes

Categories should remain completely data-driven.

No UI changes should be required when adding a new category.

---

# Photography

Photography represents a completely separate experience.

It should not be treated as another work category.

Instead it behaves similarly to Apple's Photos application.

Future features may include:

* Albums
* Collections
* Favorites
* Featured Images
* Chronological Timeline
* Fullscreen Viewer

The architecture should already support these future capabilities.

---

# Personal Projects

Personal Projects represent experimental work.

Unlike commercial projects, these entries communicate personality and creative exploration.

Examples include:

* visual experiments
* analog photography
* travel journals
* inspiration collections
* motion tests
* personal films

This category should remain intentionally flexible.

---

# Notes

The Notes application contains Carlo's personal writing.

Initially this includes:

* About Me
* Personal Manifesto
* Creative Philosophy

Future versions may include:

* Journal entries
* Travel notes
* Creative process
* Behind-the-scenes articles
* Recommendations

Notes should feel identical to Apple's Notes application while remaining visually unique.

---

# Spotify

Spotify is represented by a native widget.

The widget displays:

* current playlist
* album artwork
* playback controls
* listening status

Whenever possible, data should be retrieved dynamically through Spotify APIs.

If APIs are unavailable, the widget should gracefully fall back to static content.

---

# Instagram

Instagram exists only as a shortcut.

It should never embed the Instagram feed directly.

Clicking the application opens the official Instagram profile in a new tab.

Keeping the experience lightweight is preferred over embedding social feeds.

---

# Mail

Mail represents the primary contact method.

Selecting Mail should immediately open the user's preferred email client using a mailto link.

No contact form is planned.

The objective is to keep communication simple, direct and native.

---

# Adobe Applications

The operating system includes several Adobe-inspired applications.

These are conceptual shortcuts rather than real software.

Their purpose is to communicate Carlo's creative disciplines.

Current applications include:

* Photoshop
* DaVinci Resolve
* Figma

Each application serves a different role.

Photoshop opens the Photography section.

DaVinci Resolve opens the Video / Work section.

Figma redirects users to Carlo's UX/UI portfolio.

The visual language should reference the Adobe ecosystem without reproducing proprietary branding.


# Data Model

The application should be completely data-driven.

UI components must never contain hardcoded project information.

Every screen should render itself from structured data.

Adding a new project should require only adding new data.

No React component should need modification.

---

# Project Entity

A project represents the primary content type of the portfolio.

Every commercial work belongs to this entity.

Each project should contain:

* unique identifier
* title
* slug
* category
* year
* client
* short description
* long description
* cover image
* gallery
* featured video
* credits
* technologies
* tags
* featured status
* published status
* creation date
* update date

Projects should remain independent from the UI.

---

# Photography Entity

Photography is not treated as a project.

It has its own independent structure.

Each photo should contain:

* id
* title
* slug
* album
* capture date
* location
* camera
* lens
* focal length
* exposure
* image
* thumbnail
* alt text
* favorite flag

Future metadata can be added without changing the architecture.

---

# Album Entity

Albums organize photography.

Each album should contain:

* id
* title
* description
* cover image
* photo count
* featured image
* year
* visibility

Albums should behave similarly to Apple Photos.

---

# Widget Entity

Widgets represent dynamic desktop components.

Examples include:

* Spotify
* Notes
* Weather
* Calendar
* Photo Rotation
* Clock

Each widget should define:

* id
* type
* position
* size
* refresh strategy
* settings

Widgets should remain independent from desktop implementation.

---

# Desktop Application Entity

Every desktop icon represents an application.

Applications define navigation.

An application contains:

* id
* name
* icon
* category
* launch type
* destination
* description
* visibility
* accent color

Launch types include:

* Internal Window

* External Link

* Modal

* Native Shortcut

---

# Folder Entity

Folders organize applications.

Examples:

Work

Photography

Creative

Utilities

Future expansion should simply introduce new folders.

---

# Navigation Strategy

Navigation should never depend on page hierarchy.

Instead it should depend on application state.

Desktop

↓

Application

↓

Window

↓

Content

Every application is responsible for rendering its own experience.

---

# Finder Structure

The Finder represents the primary navigation system.

Its structure should resemble a simplified creative workspace.

Example:

Desktop

↓

Work

```
Music

Fashion

Advertising
```

↓

Photography

```
Albums

Favorites
```

↓

Personal

↓

Archive

The Finder should remain flexible enough to accommodate future categories.

---

# Window Hierarchy

Every application opens inside a window.

Windows should contain:

* unique id

* title

* icon

* state

* size

* position

* z-index

* focus state

* minimised

* maximised

* fullscreen

The desktop should never assume only one active window.

Multiple windows must always be supported.

---

# Media Strategy

Media should remain completely independent from UI.

Supported media types include:

Images

Videos

Audio

PDF

Future:

3D Assets

Interactive Experiences

AR Content

The media layer should remain extensible.

---

# Image Strategy

Every image should exist in multiple sizes.

Examples:

Thumbnail

Preview

Medium

Large

Original

Components should never decide which version to use.

That decision belongs to the media layer.

---

# Video Strategy

Videos should support:

Poster image

Preview

Streaming

Fullscreen

Muted autoplay where appropriate

Captions

Future HDR support

Videos should never block page rendering.

---

# Placeholder Strategy

During development:

Use placeholder images.

Use stock photography.

Use dummy thumbnails.

Never wait for final assets.

Architecture always comes first.

Content can be replaced later without changing implementation.

---

# Naming Convention

Use descriptive names.

Correct:

music-video-armani

portrait-editorial-milan

fashion-campaign-aw24

Incorrect:

project1

video-final

test-new

Every identifier should remain understandable years later.

---

# Future CMS Compatibility

The architecture should remain CMS agnostic.

Content should eventually be compatible with:

Contentful

Sanity

Payload CMS

Direct JSON

Markdown

Headless APIs

No component should depend on a specific CMS implementation.

---

# Scalability Rules

The portfolio should comfortably support:

100+ Projects

5000+ Photos

Hundreds of Albums

Unlimited Widgets

Unlimited Desktop Applications

Unlimited Future Categories

No architectural redesign should be required as the portfolio grows.

---

# Definition of Done

A content feature is considered complete when:

* it is fully data-driven

* reusable

* accessible

* documented

* responsive

* performant

* independent from hardcoded content

* compatible with future CMS integration

Only then should it be considered production ready.

# Content Lifecycle

Every piece of content follows the same lifecycle.

The lifecycle ensures consistency throughout the operating system.

Draft

↓

Private Review

↓

Ready

↓

Published

↓

Featured (optional)

↓

Archived (optional)

No content should bypass this process.

---

# Content Relationships

Content should not exist in isolation.

Projects may reference:

* Photography
* Behind The Scenes
* Credits
* Related Projects
* External Links
* Notes
* Playlists

Photography may belong to:

* Albums
* Projects
* Collections

Widgets may display:

* Projects
* Notes
* Photos
* Spotify
* Calendar

This relationship model should remain flexible.

---

# Desktop Integration

Content is always accessed through the operating system.

Examples:

Desktop Icon

↓

Application

↓

Finder

↓

Folder

↓

Project

↓

Media Viewer

The desktop itself never contains content.

It only provides access.

---

# Search Strategy

Future versions should include a global search system.

Search should support:

Projects

Photos

Albums

Notes

Applications

Categories

Tags

Clients

Years

The search experience should feel similar to Spotlight on macOS.

Results should appear instantly.

---

# Filtering Strategy

Every collection should support filtering.

Examples include:

Category

Year

Client

Media Type

Tags

Featured

Favorites

Filters should never require page reloads.

Everything should happen instantly.

---

# Sorting

Collections should support multiple sorting strategies.

Examples:

Newest

Oldest

Alphabetical

Featured

Recently Updated

Most Viewed

Manual Order

The sorting engine should remain completely data-driven.

---

# Favorites

Users may eventually save favorites.

Future support should include:

Favorite Projects

Favorite Photos

Favorite Albums

Recently Opened

Pinned Items

Although not implemented initially, the architecture should already support these concepts.

---

# Metadata Philosophy

Metadata is considered first-class content.

Every asset should contain meaningful metadata.

Examples include:

Client

Year

Location

Category

Camera

Lens

Creative Direction

Photography

Editing

Color Grading

Duration

Tags

Metadata enables:

Search

Filtering

Future CMS integration

SEO

Accessibility

---

# SEO Strategy

Although the interface behaves like an operating system, every project must remain indexable.

Requirements:

Unique URL

Unique Title

Meta Description

Open Graph Image

Twitter Card

Structured Data

Canonical URL

The operating system should never reduce discoverability.

---

# URL Philosophy

URLs should remain clean and predictable.

Examples:

/work

/work/music

/work/music/project-name

/photography

/photography/albums

/notes

Applications should internally manage navigation while preserving meaningful URLs.

---

# Internationalization

The architecture should support future localization.

Initially:

English

Future:

Italian

Additional languages

Content should never be hardcoded into components.

---

# Media Storage

Media should remain external to components.

Possible storage providers include:

Local Files

Cloudinary

Vercel Blob

AWS S3

Supabase Storage

The UI layer should remain storage agnostic.

---

# Content Security

External resources should never be trusted blindly.

Validate:

Images

Videos

External URLs

Metadata

Always sanitize user-generated content if introduced in future versions.

---

# Analytics

Analytics should focus on understanding engagement rather than collecting unnecessary personal data.

Useful metrics include:

Most Viewed Projects

Most Opened Applications

Most Played Videos

Widget Usage

Navigation Paths

Time Spent

Respect privacy at all times.

---

# Future Features

The architecture should already accommodate future expansion.

Potential additions include:

Client Portal

Password Protected Projects

Blog

Journal

Creative Archive

Downloads

Resources

Store

Newsletter

Timeline

Awards

Talks

Exhibitions

These should integrate naturally without requiring architectural redesign.

---

# Content Ownership

All content belongs to Carlo Desantis.

The operating system exists solely to present his work.

The interface should never distract from the creative output.

Every interaction should strengthen the perception of craftsmanship, precision and authenticity.

---

# Final Philosophy

The portfolio is not a collection of web pages.

It is a living operating system.

Every file.

Every project.

Every photograph.

Every animation.

Every interaction.

Every window.

Every folder.

Every application.

Everything exists to tell a single story:

The creative world of Carlo Desantis.

Whenever new content is introduced, it should naturally fit into this ecosystem without changing its underlying structure.

The operating system evolves.

The architecture remains stable.

That is the long-term objective of this project.
