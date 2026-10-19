// ─── Platform ────────────────────────────────────────────────────────────────

export type Platform = 'desktop' | 'tablet' | 'mobile'

export type MobileScreen = 'lock' | 'home' | 'app' | 'project'

// ─── Projects ─────────────────────────────────────────────────────────────────

export type ProjectCategory = 'digital' | 'film-making' | 'creative-direction'

export type Locale = 'en' | 'it'

export interface ProjectCredit {
  role: string
  name: string
}

export interface ProjectImage {
  src: string
  width: number
  height: number
  alt: string
  caption: string
}

export interface ProjectSection {
  title: string
  body: string
}

export interface ProjectVideo {
  src: string
  poster: string
  width: number
  height: number
  caption: string
}

export interface Project {
  id: string
  slug: string
  title: string
  category: ProjectCategory
  year?: number
  client?: string
  agency?: string
  status?: 'in-progress'
  summary: string
  subtitle: string
  description: string
  role: string
  sections: ProjectSection[]
  deliverables: string[]
  links: { label: string; href: string }[]
  coverAspectRatio?: '16:9' | '4:3' | '3:2' | '1:1'
  cover: string
  coverPosition?: string
  preview?: {
    background: string
    tone?: 'original' | 'white' | 'black'
    logoWidth?: number
    logoHeight?: number
  }
  gallery: ProjectImage[]
  galleryPresentation?: 'mockups'
  photography?: ProjectImage[]
  videos?: ProjectVideo[]
  mediaLayout?: 'editorial'
  credits: ProjectCredit[]
  tags: string[]
  featured: boolean
}

// ─── Windows ──────────────────────────────────────────────────────────────────

export type WindowState = 'open' | 'minimized' | 'maximized'

export type WindowApp =
  'finder' | 'project' | 'photos' | 'notes' | 'settings' | 'spotify' | 'contact'

export type WindowSizePreset = 'sm' | 'md' | 'lg' | 'xl'

export interface WindowPosition {
  x: number
  y: number
}

export interface WindowSize {
  width: number
  height: number
}

export interface OSWindow {
  id: string
  title: string
  app: WindowApp
  state: WindowState
  restoreState?: 'open' | 'maximized'
  position: WindowPosition
  size: WindowSize
  zIndex: number
  isFocused: boolean
  /** Arbitrary payload passed to the app rendered inside the window */
  payload?: Record<string, unknown>
}

// ─── Desktop ──────────────────────────────────────────────────────────────────

export type Wallpaper = 'wallpaper2' | 'wallpaper3' | 'wallpaper4' | 'wallpaper5'
export type ResolvedWallpaper = Wallpaper

// ─── Widgets ──────────────────────────────────────────────────────────────────

export type WidgetType = 'spotify' | 'photos' | 'clock' | 'quote' | 'recent-projects' | 'notes'

export type WidgetSize = 'small' | 'medium' | 'large' | 'wide'

export interface WidgetPosition {
  x: number
  y: number
}

export interface Widget {
  id: string
  type: WidgetType
  size: WidgetSize
  position: WidgetPosition
}

// ─── Finder ───────────────────────────────────────────────────────────────────

export type FinderViewMode = 'grid' | 'list'

export type FinderSortBy = 'name' | 'date' | 'category'

export type FinderSortOrder = 'asc' | 'desc'

// ─── Settings ─────────────────────────────────────────────────────────────────

export interface AccessibilitySettings {
  reducedMotion: boolean
  highContrast: boolean
}

export interface Settings {
  accessibility: AccessibilitySettings
}

// ─── Cursor ───────────────────────────────────────────────────────────────────

export type CursorMode =
  | 'default'
  | 'pointer'
  | 'text'
  | 'grab'
  | 'grabbing'
  | 'drag'
  | 'media'
  | 'open'
  | 'magnetic'
  | 'not-allowed'
  | 'wait'

// ─── Notifications ────────────────────────────────────────────────────────────

export type NotificationPriority = 'low' | 'normal' | 'high'

export interface Notification {
  id: string
  title: string
  message?: string
  icon?: string
  priority: NotificationPriority
  duration: number
  createdAt: number
  isRead: boolean
}

// ─── Content ──────────────────────────────────────────────────────────────────

export interface NoteEntry {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
}

export interface PhotoAlbum {
  id: string
  title: string
  coverPhoto: string
  photos: string[]
  count: number
}
