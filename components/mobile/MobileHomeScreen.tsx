'use client'

import { motion } from 'framer-motion'
import { springs, staggerDelay } from '@/lib/motion'
import { widgetDarkGlass } from '@/lib/utils'
import type { ProjectCategory } from '@/types'
import { useLocaleStore } from '@/store/localeStore'
import { uiText } from '@/core/registries/locale'
import { getNotes } from '@/lib/content'

interface MobileHomeScreenProps {
  onOpenApp: (category: ProjectCategory | null) => void
  onOpenNotes?: () => void
  onOpenPhotos?: () => void
  onOpenPlaylist?: () => void
  onOpenSettings?: () => void
  onContact?: () => void
  onFindMe?: () => void
}

// ─── Layout specification ──────────────────────────────────────────────────
// This is a SpringBoard, not a web page: it must NEVER scroll, at ANY
// supported iPhone viewport (375×667 up to 430×932).
//
// The available height is a fixed pool divided into SHARES, one per
// section below — not something each element scales itself against
// independently. Every section states, in one place, its own:
//   - priority — 1 compresses first and hardest, 6 compresses last and
//                least. This order IS the design, not just a means to
//                avoid overflow: spacing gives up its room before the
//                hero, the hero before the widgets, typography almost
//                never (legibility is the one thing this system protects).
//   - tier     — the kind of element it governs (spacing, card, widget,
//                pill, icon, typography), for readability.
//   - min      — the floor ratio (of its own reference px) it compresses
//                toward as height drops.
//   - max      — the ceiling ratio it's held to even with room to spare
//                (always 1 = full reference size today; kept explicit so
//                a future section could state a different ceiling without
//                changing how the ratio is read).
// `size(px)` and `font(varName, refPx)` below read directly from this
// table — every ratio-driven length in this file traces back to exactly
// one of these eight entries, not to a scattered set of same-shaped
// helper functions with numbers baked into their names.
//
// Every section's clamp() middle term is `(refPx / REF_H) * 100vh` — at any
// viewport height H, that resolves to exactly `refPx × H / REF_H`, the SAME
// live ratio every other section uses, before each one's own `min` stops
// it. That's what keeps sections moving together rather than shrinking as
// unrelated, disconnected cards. Reference shares at 390×844 (refPx / 844),
// most → least vertical weight: App Grid + Playlist ≈39% (kept as ONE grid,
// not two competing budgets — the widget spans 2 of the grid's own rows, so
// it can never drift out of alignment with the icon rows beside it), Hero
// ≈19%, Notes widget ≈19%, Dock ≈11%, margins/gaps ≈11% (spread across 6
// gaps), Search pill ≈3%. (Sums to slightly over 100% — a nominal
// calibration budget, not a literal pixel total; `min` floors below and the
// flexible spacer are what actually keep real layouts from overflowing or
// stretching. The shares describe RELATIVE weight, which must never change
// as height changes — not an exact sum.)
//
// GRID: `repeat(4, 1fr)` columns — the grid divides up the ACTUAL available
// width into 4 identical columns, and every icon tile adapts to that
// (width: min(100%, layout.grid.size(60)), aspect-ratio: 1 for a matching
// height). Icons never dictate column width; the grid always does —
// layout.grid.size() is only ever a CEILING via that min(), making a tile
// smaller than its column when the vertical budget is tighter, never wider.
// Without that ceiling, icon tiles would ignore viewport height entirely
// and the whole App Grid section would stop participating in the shared
// budget. Same mechanism for the dock's 4 icons. Gaps are a plain CSS
// percentage (not a clamp), since percentage column-gap already resolves
// against the grid's own resolved width, natively.
//
// TEXT: layout.text.font() takes the min() of a height- and a width-driven
// clamp, both anchored to the real --font-size-* CSS variable (never
// drifts from the shared token scale). Everything here (margins, gaps,
// columns) is a percentage/vw/vh — relative units — so a column's width is
// ALWAYS a fixed fraction of viewport width, never an absolute px, and a
// vw-calibrated clamp on font-size tracks column width precisely without
// duplicating the grid's own gap math. This is what stops labels like
// "Find me" from outgrowing a narrow phone's column: on the narrowest
// supported width the width-term wins the min() and shrinks the label to
// fit; on a wider phone it's capped at full size and the height-term
// governs instead. Labels also carry `whiteSpace: nowrap` — never wrap.
//
// WIDGETS: each widget's internal padding/gaps/positions are percentages of
// that widget's OWN reference box (pct(), below) — not the viewport — so a
// widget's artwork, padding, and internal spacing scale together as one
// object relative to EACH OTHER, whatever the widget's own compressed size
// turns out to be. Font sizes still go through layout.text.font() (font-
// size can't be a CSS percentage of a box), so geometry and typography
// share one consistent mechanism, just read differently.
//
// No element ever needs to know any OTHER element's size, and the parent
// flex column never computes a total — every share is just refPx / REF_H,
// looked up independently. Fit is resolved two ways, both intrinsic:
//  - Every section's own clamp(min, vh, max) already shrinks smoothly and
//    proportionally as height drops — this alone does most of the work.
//  - The three simple "glass box" elements (hero, Notes widget, search
//    pill — chosen because shrinking their box never causes internal
//    overflow, unlike the icon grid's own multi-row layout) additionally
//    carry flexBasis/flexShrink/minHeight, so the flex column's native
//    shrink algorithm — not hand-checked arithmetic — absorbs any residual
//    deficit. flexShrink is a plain literal at each of the three call
//    sites (3/2/1, commented with the priority it reflects) rather than a
//    formula — there are only three of them, so a lookup function would
//    just be an extra hop for the reader. This is a safety valve: today's
//    floors already fit comfortably on their own, so it stays dormant now,
//    but if a future change makes one element taller, the browser
//    renegotiates automatically — nothing here needs to be rebalanced by
//    hand.
// The dock itself never moves: it's a flex sibling AFTER the content
// column, which has its own internal flexible spacer. Dock doesn't compete
// with content for space (content is flex:1 and simply gets whatever's
// left), so it stays anchored to the bottom safe area and defines the
// floor — nothing above it can push it, by construction of the flex order.
const REF_W = 390
const REF_H = 844
const vh = (px: number) => ((px / REF_H) * 100).toFixed(4)
const vw = (px: number) => ((px / REF_W) * 100).toFixed(4)

// Every section but `text` only ever needs a raw length; `text` only ever
// needs a font-size. Two small, single-purpose constructors — not one
// generic constructor handing every section a method it never calls.
function sizeSection(priority: number, tier: string, min: number, max = 1) {
  return {
    priority,
    tier,
    min,
    max,
    // Clamped between this section's own floor and ceiling ratios,
    // interpolating through the shared vh-normalized curve.
    size: (px: number) =>
      `clamp(${(px * min).toFixed(2)}px, ${vh(px)}vh, ${(px * max).toFixed(2)}px)`,
  }
}

function fontSection(priority: number, tier: string, min: number, max = 1) {
  return {
    priority,
    tier,
    min,
    max,
    // A CSS var()-anchored font-size: min() of a height- and a
    // width-driven clamp, both using this section's own floor/ceiling.
    font: (varName: string, refPx: number) => {
      const h = `clamp(calc(var(${varName}) * ${min}), ${vh(refPx)}vh, var(${varName}))`
      const w = `clamp(calc(var(${varName}) * ${min}), ${vw(refPx)}vw, var(${varName}))`
      return `min(${h}, ${w})`
    },
  }
}

const layout = {
  space: sizeSection(1, 'spacing', 0.35), // gaps/margins/padding — compresses first and hardest
  hero: sizeSection(2, 'card', 0.58), // the artist card — compresses second
  notes: sizeSection(3, 'widget', 0.72), // Notes widget
  dock: sizeSection(3, 'widget', 0.72), // same tier as Notes — structurally the same glass container
  playlist: sizeSection(3, 'widget', 0.72), // same tier as Notes/Dock — shares the App Grid's rows, not an independent budget
  search: sizeSection(4, 'pill', 0.86), // the search pill — compresses only slightly
  grid: sizeSection(5, 'icon', 0.9), // icon tiles — a ceiling, not a driver of column width
  text: fontSection(6, 'typography', 0.95), // the last thing to change; floor stays close to full size
}

// The flex-shrink safety valve's hard floor — deliberately BELOW the
// section's own `min`, so flex-shrink has real room to protect against a
// future size change without ever needing a re-checked height sum. Under
// today's sizes this never actually gets reached; it only matters later.
function emergencyFloor(section: 'hero' | 'notes' | 'search', px: number): number {
  return Math.round(px * layout[section].min * 0.7 * 100) / 100
}

// A value expressed as a relationship to its own container, not a pixel —
// used for widget-internal padding/gaps/positions so every part of a
// widget scales together as one object relative to that widget's own
// reference box, whatever the widget's own compressed size turns out to be.
function pct(part: number, whole: number): string {
  return `${((part / whole) * 100).toFixed(3)}%`
}

// Reference boxes for the widget-relative pct() calls below — the same
// content width (330 = 390 - 2×30 margin) that the hero and Notes widget
// already span, and the Playlist widget's own 2-column × 2-row grid span
// (2×60 icon + 1×30 gap = 150 wide, 2×60 + 1×38 gap = 158 tall).
const CONTENT_W = 330
const WIDGET_W = 150
const WIDGET_H = 158

// Same "macOS Sonoma dark widget material" every Desktop widget uses
// (lib/utils.ts's widgetDarkGlass) — Mobile's icon tiles, widgets, dock and
// search pill all draw from the exact same material, not a bespoke one.
const GLASS = widgetDarkGlass()
const ICON_RADIUS = '23.33%' // 14 / 60 — percentage so it scales with the icon's own computed size
const GRID_GAP = pct(30, CONTENT_W) // identical, self-balancing gap for both the app grid and the dock

interface GridIconSpec {
  area: string
  label: string
  iconSrc: string
  iconWidth: number
  iconHeight: number
  whiteCircle?: boolean
  onTap?: () => void
}

function AppIconTile({ spec, index, count }: { spec: GridIconSpec; index: number; count: number }) {
  const interactive = !!spec.onTap
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ ...springs.default, delay: index * staggerDelay(count) }}
      whileTap={interactive ? { scale: 0.92, transition: springs.default } : undefined}
      onClick={spec.onTap}
      style={{
        gridArea: spec.area,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: layout.space.size(8),
        background: 'transparent',
        border: 'none',
        padding: 0,
        cursor: interactive ? 'pointer' : 'default',
        minHeight: 0,
      }}
      aria-label={spec.label}
    >
      <div
        style={{
          width: `min(100%, ${layout.grid.size(60)})`,
          aspectRatio: '1',
          borderRadius: ICON_RADIUS,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          flexShrink: 0,
          ...GLASS,
        }}
      >
        {spec.whiteCircle && (
          <div
            style={{
              position: 'absolute',
              width: '73%',
              height: '73%',
              borderRadius: '50%',
              background: '#fdfdfd',
            }}
          />
        )}
        <img
          src={spec.iconSrc}
          alt=""
          style={{
            width: `${((spec.iconWidth / 60) * 100).toFixed(2)}%`,
            height: `${((spec.iconHeight / 60) * 100).toFixed(2)}%`,
            position: 'relative',
            objectFit: 'contain',
          }}
        />
      </div>
      <span
        style={{
          fontSize: layout.text.font('--font-size-base', 13),
          color: '#fff',
          fontWeight: 'var(--font-weight-regular)',
          textShadow: '0 1px 3px rgba(0,0,0,0.55)',
          letterSpacing: '-0.005em',
          whiteSpace: 'nowrap',
        }}
      >
        {spec.label}
      </span>
    </motion.button>
  )
}

export function MobileHomeScreen({
  onOpenApp,
  onOpenNotes,
  onOpenPhotos,
  onOpenPlaylist,
  onOpenSettings,
  onContact,
  onFindMe,
}: MobileHomeScreenProps) {
  const locale = useLocaleStore((s) => s.locale)
  const text = uiText[locale]

  const gridIcons: GridIconSpec[] = [
    {
      area: 'a',
      label: text.projects,
      iconSrc: '/icons/ui/projects.svg',
      iconWidth: 34,
      iconHeight: 34,
      onTap: () => onOpenApp(null),
    },
    {
      area: 'b',
      label: text.playlist,
      iconSrc: '/icons/ui/spotify.svg',
      iconWidth: 26,
      iconHeight: 26,
      onTap: onOpenPlaylist,
    },
    {
      area: 'c',
      label: text.photos,
      iconSrc: '/icons/ui/photo.svg',
      iconWidth: 34,
      iconHeight: 34,
      onTap: onOpenPhotos,
    },
    {
      area: 'd',
      label: 'Video',
      iconSrc: '/icons/ui/video.svg',
      iconWidth: 38,
      iconHeight: 24,
      onTap: () => onOpenApp('film-making'),
    },
    {
      area: 'e',
      label: text.settings,
      iconSrc: '/icons/ui/settings.svg',
      iconWidth: 36,
      iconHeight: 36,
      onTap: onOpenSettings,
    },
    {
      area: 'f',
      label: text.contacts,
      iconSrc: '/icons/ui/find%20me.svg',
      iconWidth: 36,
      iconHeight: 36,
      onTap: onFindMe,
    },
    {
      area: 'g',
      label: text.about,
      iconSrc: '/icons/ui/about%20me.svg',
      iconWidth: 32,
      iconHeight: 32,
      onTap: onOpenNotes,
    },
    {
      area: 'h',
      label: text.write,
      iconSrc: '/icons/ui/message%20me.svg',
      iconWidth: 34,
      iconHeight: 30,
      onTap: onContact,
    },
  ]

  // Dock — matches the reference's actual 4 dock icons exactly (Settings,
  // Video, Photos, Write me). Each fires the exact same handler its
  // equivalent grid icon already fires above — no new destination anywhere.
  const dockIcons: GridIconSpec[] = [
    {
      area: 'da',
      label: text.settings,
      iconSrc: '/icons/ui/settings.svg',
      iconWidth: 34,
      iconHeight: 34,
      onTap: onOpenSettings,
    },
    {
      area: 'db',
      label: 'Video',
      iconSrc: '/icons/ui/video.svg',
      iconWidth: 36,
      iconHeight: 23,
      onTap: () => onOpenApp('film-making'),
    },
    {
      area: 'dc',
      label: text.photos,
      iconSrc: '/icons/ui/photo.svg',
      iconWidth: 32,
      iconHeight: 32,
      onTap: onOpenPhotos,
    },
    {
      area: 'dd',
      label: text.write,
      iconSrc: '/icons/ui/message%20me.svg',
      iconWidth: 32,
      iconHeight: 28,
      onTap: onContact,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={springs.default}
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-text)',
        overflow: 'hidden', // belt-and-suspenders: this screen must never scroll
      }}
    >
      {/* Main content column. Top padding = top safe area; left/right margin
          is width-driven (horizontal variance across real phones is small). */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: `${layout.space.size(30)} ${vw(30)}vw 0`,
          minHeight: 0,
        }}
      >
        {/* Hero artist card — exact asset per the reference (photos-featured.jpg, not a substitute).
            flexBasis (not height) so it actually compresses on short screens
            AND participates in the flex column's own shrink negotiation. */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            flexBasis: layout.hero.size(158),
            flexGrow: 0,
            flexShrink: 3, // priority 2 — shrinks more than notes (below) and search
            minHeight: emergencyFloor('hero', 158),
            borderRadius: layout.hero.size(27),
            overflow: 'hidden',
            boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
          }}
          aria-label="Featured artist: RIRI2K"
        >
          <img
            src="/photos-featured.jpg"
            alt="RIRI2K"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: '65% 40%',
              display: 'block',
            }}
          />
          <div
            style={{ position: 'absolute', left: pct(22, CONTENT_W), bottom: pct(16, WIDGET_H) }}
          >
            <div
              style={{
                fontSize: layout.text.font('--font-size-2xl', 24),
                fontWeight: 'var(--font-weight-bold)',
                fontFamily: 'var(--font-display)',
                color: '#0a0a0a',
                letterSpacing: '-0.01em',
                lineHeight: 1,
              }}
            >
              RIRI2K
            </div>
            <div
              style={{
                fontSize: layout.text.font('--font-size-md', 15),
                fontWeight: 'var(--font-weight-regular)',
                color: '#2b2b2b',
                marginTop: '2px',
              }}
            >
              Artist
            </div>
          </div>
        </div>

        {/* App grid + Playlist widget — same irregular layout as the reference:
            4 icons across row 1, 2 icons + a 2×2 widget across rows 2–3.
            `repeat(4, 1fr)` — the grid divides up the actual available
            width into 4 identical columns; icon tiles adapt to that (see
            AppIconTile), never the other way around. columnGap is a plain
            percentage of the grid's own resolved width, so every gap stays
            identical and self-balancing without a clamp of its own.
            flexShrink: 0 — unlike hero/Notes/search, this is a compound
            structure whose own rows are already independently governed by
            the grid's columns and layout.space; letting the outer flex
            column additionally shrink this box would squeeze it below its
            rows' real content size and cause internal overflow, not a
            clean compression. */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateAreas: `"a b c d" "e f w w" "g h w w"`,
            columnGap: GRID_GAP,
            rowGap: layout.space.size(38),
            marginTop: layout.space.size(19),
            flexShrink: 0,
            minHeight: 0,
          }}
          role="list"
          aria-label="Apps"
        >
          {gridIcons.map((spec, i) => (
            <AppIconTile key={spec.area} spec={spec} index={i} count={gridIcons.length} />
          ))}

          {/* Now Playing / Playlist widget — fills its 2×2 grid slot exactly,
              so its size stays relative to the grid, not a fixed pixel box. */}
          <div
            style={{
              gridArea: 'w',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: layout.space.size(8),
              minHeight: 0,
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: layout.playlist.size(14),
                padding: `${pct(17, WIDGET_W)} ${pct(16.5, WIDGET_W)}`,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0,
                ...GLASS,
              }}
              aria-label="Now Playing widget"
            >
              <img
                src="/icons/ui/Music%20Icon.svg"
                alt=""
                style={{
                  position: 'absolute',
                  top: pct(14, WIDGET_H),
                  right: pct(14, WIDGET_W),
                  width: pct(13, WIDGET_W),
                  height: pct(17, WIDGET_H),
                  opacity: 0.9,
                }}
              />
              <div
                style={{
                  width: '32%',
                  aspectRatio: '1',
                  borderRadius: '12.5%', // 6 / 48 — percentage, scales with the swatch's own size
                  background: 'url(/spotify-cover.jpg) center/cover no-repeat',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.35)',
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1, minHeight: pct(4, WIDGET_H) }} />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span
                    style={{
                      fontSize: layout.text.font('--font-size-lg', 17),
                      fontWeight: 'var(--font-weight-semibold)',
                      color: '#fff',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    Homie
                  </span>
                  <span
                    style={{
                      fontSize: layout.text.font('--font-size-2xs', 10),
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'rgba(255,255,255,0.75)',
                      background: 'rgba(255,255,255,0.16)',
                      borderRadius: '3px',
                      padding: '1px 4px',
                    }}
                  >
                    E
                  </span>
                </div>
                <div
                  style={{
                    fontSize: layout.text.font('--font-size-sm', 12),
                    color: 'rgba(255,255,255,0.65)',
                    marginTop: '1px',
                  }}
                >
                  Carlo&rsquo;s Playlist
                </div>
                <button
                  type="button"
                  onClick={onOpenPlaylist}
                  style={{
                    border: 'none',
                    cursor: 'pointer',
                    marginTop: pct(10, WIDGET_W),
                    width: '45.5%', // 68.34 / 150 — proportional to the widget's own box, same relationship as its reference
                    aspectRatio: '68.34 / 27.57',
                    borderRadius: '9999px',
                    background: 'rgba(255,255,255,0.18)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <span
                    style={{ fontSize: layout.text.font('--font-size-2xs', 10), color: '#fff' }}
                  >
                    ▶
                  </span>
                  <span
                    style={{
                      fontSize: layout.text.font('--font-size-base', 13),
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#fff',
                    }}
                  >
                    {text.play}
                  </span>
                </button>
              </div>
            </div>
            <span
              style={{
                fontSize: layout.text.font('--font-size-base', 13),
                color: '#fff',
                fontWeight: 'var(--font-weight-regular)',
                textShadow: '0 1px 3px rgba(0,0,0,0.55)',
                whiteSpace: 'nowrap',
              }}
            >
              Playlist
            </span>
          </div>
        </div>

        {/* My Notes widget — tier 3. Intrinsic minimum height protects all
            three shared note titles when the surrounding space compresses. */}
        <div
          style={{
            width: '100%',
            flexBasis: layout.notes.size(158),
            flexGrow: 0,
            flexShrink: 2, // priority 3 — shrinks less than hero, more than search
            minHeight: 'min-content',
            borderRadius: layout.notes.size(27),
            overflow: 'hidden',
            marginTop: layout.space.size(14),
            display: 'flex',
            flexDirection: 'column',
            ...GLASS,
          }}
          aria-label={text.myNotes}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: pct(9, CONTENT_W),
              padding: `${pct(15, CONTENT_W)} ${pct(20, CONTENT_W)} 0`,
              flexShrink: 0,
            }}
          >
            <img
              src="/icons/ui/notes.svg"
              alt=""
              style={{
                width: pct(19, CONTENT_W),
                height: pct(16, WIDGET_H),
                opacity: 0.95,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: layout.text.font('--font-size-lg', 17),
                fontWeight: 'var(--font-weight-bold)',
                fontFamily: 'var(--font-display)',
                color: '#fff',
                letterSpacing: '-0.01em',
              }}
            >
              {text.myNotes}
            </span>
          </div>
          {/* Dotted divider — a literal row of 1px dots in the reference */}
          <div
            style={{
              margin: `${pct(10, CONTENT_W)} ${pct(30, CONTENT_W)} 0`,
              borderTop: '1.5px dotted rgba(255,255,255,0.55)',
              flexShrink: 0,
            }}
          />

          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              minHeight: 'min-content',
              overflow: 'hidden',
            }}
          >
            {getNotes(locale)
              .slice(0, 3)
              .map((note, i, arr) => (
                <div
                  key={note.id}
                  style={{
                    flex: '1 1 0',
                    minHeight: 'min-content',
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: pct(14, CONTENT_W),
                      padding: `0 ${pct(20, CONTENT_W)}`,
                      width: '100%',
                    }}
                  >
                    <span
                      style={{
                        fontSize: layout.text.font('--font-size-md', 15),
                        color: '#fff',
                        letterSpacing: '-0.005em',
                        lineHeight: 1.3,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {note.title}
                    </span>
                  </div>
                  {i < arr.length - 1 && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: pct(20, CONTENT_W),
                        right: pct(20, CONTENT_W),
                        height: '0.3px',
                        background: 'rgba(255,255,255,0.4)',
                      }}
                    />
                  )}
                </div>
              ))}
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: layout.space.size(8), flexShrink: 0 }}>
          <span
            style={{
              fontSize: layout.text.font('--font-size-base', 13),
              color: '#fff',
              fontWeight: 'var(--font-weight-regular)',
              textShadow: '0 1px 3px rgba(0,0,0,0.55)',
            }}
          >
            {text.notes}
          </span>
        </div>

        {/* Search pill — tier 4, the lowest flexShrink of the three glass
            boxes: it gives up room last among them. The wrapper (a row-
            direction flex box) carries the sizing; the pill itself is
            height: 100% and gets stretched to fill whatever the flex
            column decides, via the wrapper's default align-items: stretch. */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: layout.space.size(6),
            flexBasis: layout.search.size(28),
            flexGrow: 0,
            flexShrink: 1, // priority 4 — shrinks least of the three
            minHeight: emergencyFloor('search', 28),
          }}
        >
          <button
            type="button"
            onClick={() => onOpenApp(null)}
            style={{
              border: 'none',
              cursor: 'pointer',
              width: `${vw(114)}vw`,
              height: '100%',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              flexShrink: 0,
              ...GLASS,
            }}
            aria-label={text.searchProjects}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              aria-hidden
              style={{ flexShrink: 0 }}
            >
              <circle cx="5.4" cy="5.4" r="4.1" stroke="rgba(255,255,255,0.85)" strokeWidth="1.3" />
              <path
                d="M8.4 8.4L11.3 11.3"
                stroke="rgba(255,255,255,0.85)"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
            <span
              style={{
                fontSize: layout.text.font('--font-size-base', 13),
                color: 'rgba(255,255,255,0.85)',
                whiteSpace: 'nowrap',
              }}
            >
              {text.searchProjects}
            </span>
          </button>
        </div>

        {/* Flexible spacer — absorbs all slack above the reference height (844)
            instead of letting the elements above grow past their design size. */}
        <div style={{ flex: 1, minHeight: 0 }} />
      </div>

      {/* Dock — narrower horizontal margin than the content column above
          (matching the reference's wider floating bar), anchored to the
          bottom safe area. Its position never changes; only its own size
          compresses slightly on short screens, same as everything else. */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...springs.default, delay: 0.1 }}
        style={{ padding: `0 ${vw(11)}vw ${layout.space.size(16)}`, flexShrink: 0 }}
      >
        <div
          style={{
            width: '100%',
            height: layout.dock.size(92),
            borderRadius: layout.dock.size(38),
            display: 'flex',
            alignItems: 'center',
            padding: `0 ${vw(19)}vw`,
            ...GLASS,
          }}
          role="navigation"
          aria-label="Dock"
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              columnGap: GRID_GAP,
              width: '100%',
            }}
          >
            {dockIcons.map((spec) => (
              <motion.button
                key={spec.area}
                whileTap={spec.onTap ? { scale: 0.86, transition: springs.dock } : undefined}
                onClick={spec.onTap}
                style={{
                  width: `min(100%, ${layout.grid.size(60)})`,
                  aspectRatio: '1',
                  borderRadius: ICON_RADIUS,
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: spec.onTap ? 'pointer' : 'default',
                  ...GLASS,
                }}
                aria-label={spec.label}
              >
                <img
                  src={spec.iconSrc}
                  alt=""
                  style={{
                    width: `${((spec.iconWidth / 60) * 100).toFixed(2)}%`,
                    height: `${((spec.iconHeight / 60) * 100).toFixed(2)}%`,
                    objectFit: 'contain',
                  }}
                />
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
