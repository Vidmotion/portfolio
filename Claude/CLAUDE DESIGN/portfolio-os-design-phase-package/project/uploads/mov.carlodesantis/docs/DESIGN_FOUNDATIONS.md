# DESIGN_FOUNDATIONS.md — Design Foundations

> **Version:** 2.0
> **Status:** Pre-Production
> **Last Reviewed:** 2026-06-29

---

## Purpose

This document defines the visual primitives — the design tokens — of Portfolio OS.

These tokens are the lowest level of the design system. Every visual decision in `DESIGN_SYSTEM.md` and every component in `COMPONENTS.md` traces back to a value defined here.

Never use arbitrary visual values. Every spacing, color, radius, shadow, and typography choice must derive from this document.

---

## Color System

### Palette Philosophy

The color palette is intentionally minimal. Neutral tones dominate the interface. Accent colors appear only where interaction is required. No decorative color exists in the system.

The palette must feel timeless — independent of any design trend or era.

### Primitive Tokens

```
--- Neutrals (Light Mode) ---

neutral-0:    #FFFFFF    Pure white
neutral-50:   #F8F8F8    Near white
neutral-100:  #F2F2F2    Light background
neutral-200:  #ECECEC    Primary background
neutral-300:  #E0E0E0    Subtle border
neutral-400:  #C4C4C4    Disabled elements
neutral-500:  #999999    Placeholder text
neutral-600:  #666666    Secondary text
neutral-700:  #444444    Subdued text
neutral-800:  #222222    Near black
neutral-900:  #111111    Primary text

--- Accent ---

accent-blue:        #0A7EFF
accent-blue-hover:  #0066CC

--- Status ---

status-success:  #34C759
status-warning:  #FF9F0A
status-error:    #FF3B30
```

### Semantic Tokens

These are the tokens components actually consume. They map to the primitives above.

```
--- Backgrounds ---

bg-primary:      neutral-200              (#ECECEC)   Desktop base
bg-secondary:    neutral-100              (#F2F2F2)   Finder, sidebar panels
bg-window:       rgba(255,255,255,0.72)               Window glass
bg-dock:         rgba(220,220,220,0.72)               Dock glass
bg-menu:         rgba(248,248,248,0.88)               Menu Bar glass
bg-widget:       rgba(255,255,255,0.65)               Widget glass
bg-overlay:      rgba(0,0,0,0.40)                     Modal backdrop

--- Text ---

text-primary:     neutral-900  (#111111)
text-secondary:   neutral-600  (#666666)
text-tertiary:    neutral-500  (#999999)
text-placeholder: neutral-400  (#C4C4C4)
text-on-accent:   neutral-0    (#FFFFFF)

--- Borders and Dividers ---

border-subtle:    rgba(0,0,0,0.08)
border-medium:    rgba(0,0,0,0.12)
border-strong:    rgba(0,0,0,0.20)
border-window:    rgba(255,255,255,0.20)   Inset highlight on glass edges

--- Interaction States ---

hover-overlay:    rgba(255,255,255,0.12)
active-overlay:   rgba(255,255,255,0.22)
focus-ring:       accent-blue at 50% opacity, 2px offset
```

### Glass Materials

Glass is the primary material language of Portfolio OS. It must remain subtle enough that content placed above it stays fully readable.

```
Glass Standard (Windows, dropdowns):
  background:      rgba(255,255,255,0.72)
  backdrop-filter: blur(40px) saturate(180%)
  border:          1px solid rgba(255,255,255,0.20)

Glass Heavy (Dock, Menu Bar):
  background:      rgba(220,220,220,0.72)
  backdrop-filter: blur(60px) saturate(200%)

Glass Widget:
  background:      rgba(255,255,255,0.65)
  backdrop-filter: blur(24px) saturate(160%)
```

---

## Typography

### Font Stack

```
Primary Display:  "SF Pro Display", -apple-system, BlinkMacSystemFont, Inter, sans-serif
Primary Text:     "SF Pro Text",    -apple-system, BlinkMacSystemFont, Inter, sans-serif
Monospace:        "SF Mono", SFMono-Regular, Menlo, Monaco, Consolas, monospace
```

**Licensing note:** SF Pro is a system font. It renders natively on Apple devices and cannot be web-embedded. Inter is the approved web-embedded fallback and aligns visually with SF Pro. The design must look excellent in both.

### Type Scale

```
--font-size-2xs:   10px   Captions, metadata labels
--font-size-xs:    11px   Status bar, very small labels
--font-size-sm:    12px   Secondary captions, Dock labels
--font-size-base:  13px   Body text (Finder list, Notes)
--font-size-md:    15px   UI labels, descriptions, tooltips
--font-size-lg:    17px   Prominent labels, small headings
--font-size-xl:    20px   Window section headings
--font-size-2xl:   24px   Card headings, window titles
--font-size-3xl:   32px   Large headings
--font-size-4xl:   48px   Display headings
--font-size-5xl:   64px   Hero and editorial headings
--font-size-6xl:   96px   Maximum display size
```

### Font Weight Scale

```
--font-weight-regular:   400
--font-weight-medium:    500
--font-weight-semibold:  600
--font-weight-bold:      700
```

### Line Heights

```
--line-height-tight:    1.1    Display headings (≥ 48px)
--line-height-snug:     1.2    Large headings (≥ 32px)
--line-height-normal:   1.4    UI labels and short descriptions
--line-height-relaxed:  1.6    Body text and captions
--line-height-loose:    1.8    Long-form reading (Notes)
```

### Letter Spacing

```
--tracking-tight:    -0.03em   Large display headings (≥ 48px)
--tracking-snug:     -0.02em   Medium headings (≥ 24px)
--tracking-normal:    0em      Body text and UI labels
--tracking-wide:      0.04em   Uppercase metadata labels
--tracking-wider:     0.08em   All-caps items, tags
```

---

## Spacing System

All spacing decisions derive from this 8px-base scale. Never use arbitrary pixel values.

```
--space-1:    4px
--space-2:    8px
--space-3:    12px
--space-4:    16px
--space-5:    20px
--space-6:    24px
--space-8:    32px
--space-10:   40px
--space-12:   48px
--space-16:   64px
--space-20:   80px
--space-24:   96px
--space-32:   128px
```

**Semantic aliases:**

```
--spacing-xs:    4px    Tight gaps between related elements within a component
--spacing-sm:    8px    Between closely related elements
--spacing-md:    16px   Standard component internal padding
--spacing-lg:    24px   Section internal padding
--spacing-xl:    32px   Between distinct sections
--spacing-2xl:   48px   Major layout gaps
--spacing-3xl:   64px   Layout-level section spacing
```

---

## Border Radius

No sharp corners exist in Portfolio OS. Everything uses rounded geometry.

```
--radius-xs:      6px     Tags, badges, small chips
--radius-sm:      8px     Buttons, inputs
--radius-md:      12px    Menu items, small cards, popovers
--radius-lg:      16px    Larger cards, tooltips
--radius-xl:      18px    Feature cards, panels
--radius-2xl:     22px    Windows
--radius-3xl:     24px    Large panels, photo cards
--radius-widget:  26px    Widgets
--radius-dock:    26px    Dock container
--radius-full:    9999px  Pill shapes (progress bars, tags)
```

---

## Elevation and Shadows

Shadows communicate layering. Portfolio OS uses only soft, realistic shadows — never harsh or exaggerated.

```
--shadow-xs:     0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)
--shadow-sm:     0 4px 8px rgba(0,0,0,0.08)
--shadow-md:     0 8px 24px rgba(0,0,0,0.10)
--shadow-lg:     0 16px 48px rgba(0,0,0,0.12)
--shadow-xl:     0 24px 64px rgba(0,0,0,0.14)
--shadow-2xl:    0 40px 80px rgba(0,0,0,0.16)

--- Semantic Shadows ---

--shadow-window:           0 20px 60px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)
--shadow-window-focused:   0 28px 72px rgba(0,0,0,0.18), 0 6px 16px rgba(0,0,0,0.08)
--shadow-window-inactive:  0 12px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)
--shadow-dock:             0 8px 40px rgba(0,0,0,0.18)
--shadow-widget:           0 8px 24px rgba(0,0,0,0.10)
--shadow-menu:             0 4px 20px rgba(0,0,0,0.12)
```

### Elevation Hierarchy

```
Wallpaper          z-0
Desktop Icons      z-10
Widgets            z-20
Windows (inactive) z-30 + stacking order
Window (active)    z-50 + stacking order
Dock               z-70
Menu Bar           z-80
Context Menu       z-90
Modal              z-100
Notifications      z-110
Tooltip / Cursor   z-120
```

---

## Grid System

### Desktop (≥ 1280px)

```
Columns:    12
Column gap: 24px
Margin:     48px
Max width:  1800px (centered)
```

### Tablet (768px – 1279px)

```
Columns:    8
Column gap: 20px
Margin:     32px
```

### Mobile (< 768px)

```
Columns:    4
Column gap: 16px
Margin:     20px
```

### Breakpoints

```
--breakpoint-sm:   480px    Large mobile
--breakpoint-md:   768px    Tablet portrait / minimum Tablet breakpoint
--breakpoint-lg:   1024px   Tablet landscape / small laptop
--breakpoint-xl:   1280px   Laptop / minimum Desktop breakpoint
--breakpoint-2xl:  1440px   Standard desktop
--breakpoint-3xl:  1920px   Wide desktop
```

### Minimum Supported Resolutions

```
Desktop:  1280 × 800   (13" MacBook)
Tablet:   768 × 1024   (iPad Air portrait)
Mobile:   375 × 667    (iPhone SE)
```

---

## Window Sizes

Windows follow predefined size presets. Custom dimensions are allowed within these bounds.

```
--window-sm:    480 × 360    Compact utility windows
--window-md:    680 × 480    Standard application windows
--window-lg:    900 × 600    Media and gallery windows
--window-xl:    1100 × 720   Full-featured application windows
--window-max:   100vw × 100vh minus menu bar height
```

---

## Widget Sizes

Widgets follow a grid-aligned size system.

```
--widget-small:   160 × 160    Clock, quick status
--widget-medium:  340 × 160    Spotify (compact), Quote
--widget-large:   340 × 340    Photo widget, featured project
--widget-wide:    520 × 160    Spotify (expanded)
```

---

## Iconography

Icons follow Apple's visual proportions. All icons are SVG.

```
--icon-xs:   12px   Inline status indicators
--icon-sm:   16px   Inline text icons
--icon-md:   20px   Standard action icons
--icon-lg:   24px   Standard navigation icons
--icon-xl:   32px   Feature section icons
--icon-2xl:  48px   Application icons in Dock
--icon-3xl:  64px   Desktop icons
```

**Icon library:** Lucide React for UI icons. Custom SVG icons required for application icons (Finder, Photos, Notes, Spotify, Mail, etc.).

---

## Cursor States

The cursor is an active part of the interface.

**Standard states:**
```
default       Navigation
pointer       Clickable element
text          Text input or selectable text
grab          Draggable (idle)
grabbing      Dragging in progress
zoom-in       Content zoomable
zoom-out      Currently zoomed in
not-allowed   Disabled element
wait          Loading
```

**Custom cursor states (CursorFollower component):**
```
cursor-media     Small media preview near cursor
cursor-open      "Open" label when hovering application icons
cursor-drag      Expanded circle during content drag
cursor-magnetic  Cursor attracted to a magnetic element
```

---

## Final Principle

When any visual decision is uncertain, choose the solution that feels simpler, quieter, more elegant, and more timeless.

The best interface is the one users stop noticing.

---

## Cross-References

- How these tokens are applied to components: [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)
- Motion timing values: [MOTION.md](MOTION.md)
- Component visual specifications: [COMPONENTS.md](COMPONENTS.md)
- Apple philosophy behind these values: [APPLE_HIG.md](APPLE_HIG.md)
