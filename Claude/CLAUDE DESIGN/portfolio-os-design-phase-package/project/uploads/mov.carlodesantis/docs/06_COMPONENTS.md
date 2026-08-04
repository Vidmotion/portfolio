# COMPONENTS.md

# Portfolio OS Component Library

Version: 1.0

---

# Purpose

This document defines every reusable UI component used inside Portfolio OS.

Every interface element should be built from these components.

New UI should never reinvent existing patterns.

If a component already exists, it must be reused.

Consistency is more important than speed.

---

# Component Philosophy

Every component must have a single responsibility.

Components should be:

Reusable

Composable

Accessible

Animated

Responsive

Framework-independent whenever possible.

Business logic should never live inside visual components.

---

# Component Hierarchy

Portfolio OS is composed of five levels.

Level 1

Application Shell

↓

Level 2

System Components

↓

Level 3

Feature Components

↓

Level 4

Shared Components

↓

Level 5

Primitive Components

---

# Application Shell

Contains the operating system itself.

Components:

Desktop

MenuBar

Dock

Wallpaper

DesktopGrid

DesktopIcons

NotificationCenter

Spotlight

WindowManager

ContextMenu

ApplicationShell

These components are mounted once.

---

# Window System

Window

WindowHeader

WindowControls

WindowContent

WindowSidebar

WindowToolbar

WindowFooter

WindowTabs

WindowStatusBar

WindowOverlay

WindowResizeHandle

WindowDragArea

Every application is rendered inside Window.

No application should create its own layout.

---

# Finder Components

FinderWindow

FinderSidebar

FinderContent

FinderToolbar

FinderBreadcrumb

FinderGrid

FinderList

FinderItem

FolderCard

ProjectCard

SearchBar

ViewSwitcher

PathNavigation

EmptyState

LoadingState

---

# Dock Components

Dock

DockItem

DockIcon

DockIndicator

DockTooltip

DockSeparator

DockFolder

DockAnimation

DockMagnifier

DockBackground

---

# Menu Bar Components

MenuBar

MenuItem

MenuDropdown

MenuDivider

MenuClock

MenuProfile

MenuStatus

MenuSearch

MenuNotifications

---

# Desktop Components

DesktopGrid

DesktopIcon

DesktopFolder

DesktopWallpaper

DesktopSelection

DesktopShortcut

DesktopContextMenu

DesktopDropZone

---

# Widget Components

Widgets are independent.

Examples:

SpotifyWidget

PhotoWidget

NotesWidget

ClockWidget

WeatherWidget

CalendarWidget

QuoteWidget

ProjectsWidget

QuickAccessWidget

RecentProjectsWidget

Widgets never contain business logic.

---

# Spotify Components

SpotifyCard

SpotifyCover

SpotifyPlayer

SpotifyControls

SpotifyProgress

SpotifyPlaylist

SpotifyTrack

SpotifyArtwork

SpotifyButton

SpotifyVolume

SpotifyLoading

---

# Photos Components

PhotoGrid

PhotoCard

PhotoViewer

PhotoSidebar

PhotoToolbar

PhotoMetadata

PhotoCarousel

PhotoGallery

PhotoPreview

FullscreenViewer

---

# Notes Components

NotesList

NoteCard

NoteEditor

NoteViewer

MarkdownRenderer

QuoteCard

AboutCard

---

# Work Components

WorkGrid

WorkCard

WorkFolder

WorkPreview

ProjectViewer

ProjectGallery

ProjectVideo

ProjectCredits

ProjectMetadata

CategoryNavigation

---

# Shared Components

Button

IconButton

Input

Textarea

Select

Dropdown

Checkbox

Radio

Toggle

Tooltip

Modal

Dialog

Popover

Tabs

Accordion

Progress

Badge

Avatar

Chip

Divider

Loader

Spinner

Skeleton

Toast

ScrollArea

GlassPanel

BlurContainer

---

# Primitive Components

Box

Flex

Grid

Stack

Container

Text

Heading

Image

Video

Icon

Link

Surface

These components build every other component.

---

# Layout Components

Page

Section

Columns

Rows

Sidebar

MainContent

CenteredContainer

SplitView

ResizablePanel

---

# Navigation Components

NavigationItem

Breadcrumb

SidebarNavigation

Pagination

BackButton

ForwardButton

---

# Media Components

VideoPlayer

AudioPlayer

ImageLoader

LazyImage

FullscreenMedia

MediaControls

GalleryNavigation

---

# Animation Components

Fade

Scale

Slide

Reveal

Parallax

Morph

GlassTransition

HoverLift

Magnetic

AnimatedNumber

CursorFollower

---

# Cursor Components

Cursor

CursorLabel

CursorPreview

CursorImage

CursorLoading

CursorMedia

CursorMagnet

---

# Feedback Components

LoadingScreen

ProgressBar

Toast

Notification

Alert

ConfirmationDialog

ErrorBoundary

RetryButton

---

# Empty States

NoProjects

NoPhotos

NoResults

Offline

Loading

Error

PermissionDenied

---

# Naming Convention

Every component uses PascalCase.

Examples

Window.tsx

Dock.tsx

SpotifyWidget.tsx

ProjectCard.tsx

PhotoViewer.tsx

No abbreviations.

Names should describe purpose.

---

# Folder Structure

components/

desktop/

dock/

finder/

windows/

widgets/

spotify/

photos/

notes/

work/

cursor/

layout/

shared/

primitives/

feedback/

media/

navigation/

animations/

---

# Component API Philosophy

Every component should expose a minimal API.

Prefer composition.

Avoid excessive props.

Example

Good

<Button>

Save

</Button>

Bad

<Button

background="blue"

borderRadius={16}

padding={22}

fontSize={17}

shadow={true}

/>

Visual styling belongs inside the design system.

---

# Component Lifecycle

Every component should support:

Mount

Animate In

Idle

Interaction

Animate Out

Unmount

Animations should never interrupt user interaction.

---

# Accessibility

Every interactive component must support:

Keyboard navigation

Focus state

ARIA labels

Reduced motion

Screen readers

Accessibility is mandatory.

---

# Performance

Components should:

Lazy load heavy content.

Memoize when appropriate.

Avoid unnecessary renders.

Avoid unnecessary DOM nodes.

Optimize images.

Virtualize long lists.

---

# Future Components

Every future component must satisfy these rules:

Single responsibility.

Reusable.

Composable.

Responsive.

Accessible.

Animated.

Documented.

If a component does not satisfy these requirements, it should be redesigned before implementation.

The component library is the foundation of Portfolio OS.