# MOTION.md — Motion System

> **Version:** 2.0
> **Status:** Pre-Production
> **Last Reviewed:** 2026-06-29

---

# Purpose

This document defines every animation principle used throughout Portfolio OS.

Motion is not decoration.

Motion communicates hierarchy, interaction, focus and personality.

Every animation should feel intentional.

Portfolio OS should feel as responsive and polished as a native Apple application.

---

# Motion Philosophy

Animations should feel:

Natural

Elegant

Physical

Soft

Predictable

Responsive

Premium

Invisible

The user should notice the experience, not the animation itself.

---

# Inspirations

Primary references:

macOS Sonoma

iOS 18

Apple Music

Apple Photos

Apple Finder

Apple Dock

VisionOS

Framer Motion

ByChudy

Ludovico Scurto

The final motion language should become unique while maintaining Apple's level of polish.

---

# Global Principles

Never animate for decoration.

Animate only when:

Something changes.

Something appears.

Something disappears.

Something moves.

Something gains focus.

Something loses focus.

Every movement must have a reason.

---

# Timing

Micro Interaction

120ms

Hover

180ms

Selection

220ms

Open

350ms

Close

280ms

Window Animation

450ms

Page Transition

650ms

Modal

320ms

Dock Hover

180ms

Widget Transition

350ms

Long animations should never exceed one second.

---

# Easing

Default

easeOut

Opening

easeOutExpo

Closing

easeInOut

Hover

Spring

Dragging

Linear

Cursor

Spring

Never use linear easing for interface transitions.

---

# Springs

Default Spring

Stiffness

220

Damping

28

Mass

1

Large Window

Stiffness

170

Damping

24

Dock

Stiffness

300

Damping

20

Cursor

Stiffness

420

Damping

32

Everything should feel slightly elastic.

Never bouncy.

---

# Hover Animations

Hover should communicate interactivity.

Allowed effects:

Scale

Opacity

Shadow

Blur

Glow

Cursor Change

Small Rotation

Never exceed 1.03 scale.

Hover animations should finish before the user notices them.

---

# Cursor Motion

The cursor is an active part of the interface.

Possible cursor states:

Default

Hover

Pointer

Text

Dragging

Opening

Closing

Loading

Playing

Paused

Disabled

Image Preview

Video Preview

Magnetic

Cursor movement should use spring interpolation.

The cursor should never snap.

---

# Dock Animation

Dock icons behave similarly to macOS.

States:

Idle

Hover

Pressed

Running

Opening

Closing

Hover increases icon size.

Neighboring icons scale proportionally.

Dock background slightly expands.

Applications bounce when opened.

Running applications display an indicator.

Future drag-and-drop support should integrate seamlessly.

---

# Window Animation

Opening

Fade

Scale

Blur

Translate Y

Closing

Reverse animation.

Dragging

No easing.

Real-time movement.

Resizing

Continuous.

Focus Change

Increase shadow.

Increase opacity.

Raise z-index.

Inactive windows slightly dim.

---

# Finder Animation

Folders open with a zoom transition.

Navigation slides horizontally.

Sidebar expands smoothly.

Search results fade in.

Selections animate.

Empty folders fade.

Grid rearrangements animate.

No instant layout changes.

---

# Widget Motion

Widgets should feel alive.

Photo Widget

Crossfade images.

Zoom slightly.

Spotify Widget

Animate cover changes.

Progress bar interpolation.

Album artwork fade.

Notes Widget

Text reveal.

Cursor blink.

Clock Widget

Smooth digit transitions.

Widgets never jump.

---

# Grid Animation

Desktop icons should animate when:

Added.

Removed.

Moved.

Sorted.

Folders opened.

Spacing changes.

Use FLIP animations whenever possible.

---

# Scroll Behavior

Scrolling should feel smooth.

Momentum should resemble macOS.

Parallax should be subtle.

Never exaggerate scroll animations.

Avoid scroll hijacking unless essential.

---

# Navigation

Transitions should preserve orientation.

Users should always understand where they came from.

Navigation never teleports.

Always animate between states.

---

# Loading States

Loading should never freeze.

Use:

Skeletons

Fade placeholders

Blur previews

Image progressive loading

Heavy loaders should be avoided.

## Skeleton Animation Specification

Skeleton screens use a shimmer animation — a soft highlight that sweeps left to right.

```
Shimmer duration:   1400ms
Shimmer easing:     ease-in-out
Shimmer repeat:     infinite
Shimmer angle:      -45deg
Shimmer width:      40% of element width
Background:         neutral-200 (#ECECEC)
Highlight:          neutral-100 (#F2F2F2)
```

Skeletons must match the geometry of the real content precisely — same border radius, same approximate dimensions. A skeleton that does not match its content causes layout shift when real content loads.

Skeletons for off-screen content should not animate (use `prefers-reduced-motion` check and pause animation when element is not in the viewport).

---

# Image Animation

Images fade in.

Scale from 98%.

Blur decreases progressively.

Gallery navigation slides horizontally.

Fullscreen zoom originates from thumbnail.

---

# Video Animation

Video preview fades.

Playback controls animate softly.

Poster image transitions smoothly.

Fullscreen uses zoom transition.

---

# Spotify Motion

Album artwork rotates subtly.

Progress updates continuously.

Buttons scale on hover.

Playlist changes fade.

No flashing elements.

---

# Menu Bar

Dropdowns fade.

Slight vertical translation.

Background blur increases.

Menus never abruptly appear.

---

# Notifications

Slide from top-right.

Fade.

Blur.

Auto-dismiss softly.

Hover pauses dismissal.

---

# Context Menus

Appear near cursor.

Scale from 95%.

Fade in.

Small blur.

Disappear faster than they appear.

---

# Spotlight

Zoom from menu bar.

Background blur.

Search field automatically focuses.

Results animate individually.

---

# Modals

Fade.

Scale.

Blur background.

Disable interaction behind modal.

Escape closes modal.

---

# Lists

Items stagger slightly.

Per-item stagger delay: 20ms

**Total stagger cap: 300ms** regardless of item count.

For lists longer than 15 items, derive per-item delay dynamically:

```ts
const staggerDelay = Math.min(20, 300 / items.length)
```

Long lists should not animate excessively.

Never create a situation where the last item takes more than 300ms after mount to begin appearing.

---

# Buttons

Idle

Hover

Pressed

Loading

Disabled

Success

Error

Every state should feel distinct.

---

# Gesture Support

Desktop

Mouse

Trackpad

Keyboard

Tablet

Touch

Pen

Mobile

Touch only

Animations should adapt naturally.

---

# Reduced Motion

Respect operating system preferences via `prefers-reduced-motion: reduce`.

Disable:

Large transitions.

Parallax.

Background movement.

Dock magnification.

Spring physics animations.

Keep:

Opacity fades (max 200ms).

Small scale transitions (max 2%).

Focus indicators.

Functional state feedback (loading, success, error).

Accessibility always takes priority. Every animation must have a reduced-motion equivalent — either instant or a simple opacity fade.

---

# Interruption Handling

Animations must be interruptible at all times.

The interface is always interactive — never locked behind an animation.

When a user interacts with an element mid-animation:

The current animation must immediately respond to the new interaction.

Spring physics handles this naturally: a new target snaps the spring without requiring the previous animation to complete.

Never use `delay` or `waitFor` on primary interactions. Delays are only acceptable for stagger sequences and ambient effects.

When a window is dragged before its open animation completes, the drag takes over immediately. The open animation does not need to finish first.

When Framer Motion's spring receives a new target, it treats current velocity as the starting velocity of the new animation — creating natural-feeling interruptions automatically.

Never disable pointer events during animations.

---

# Three.js Synchronization

Three.js scenes run on their own RAF loop, independent of React's render cycle.

Rules for synchronizing Three.js and Framer Motion:

GSAP is the preferred bridge between Three.js timelines and React component animations. Use GSAP ScrollTrigger or GSAP timeline callbacks to dispatch events that Framer Motion or Zustand can consume.

Never trigger a React re-render from inside a Three.js `useFrame` loop.

Three.js scenes should be isolated inside their own component boundary. They must not import from stores or dispatch actions directly — instead, they expose a ref-based API that hooks can observe.

If a Three.js animation must synchronize with a window open/close event, listen to the Zustand window store state change via a `useEffect`, then begin the Three.js animation in response.

---

# Performance

Animations should remain at 60 FPS.

Avoid layout thrashing.

Prefer transforms over layout changes.

Animate:

Opacity

Transform

Filter

Avoid animating:

Width

Height

Top

Left

Whenever possible.

---

# Animation Library

Preferred stack:

Framer Motion

Motion One (optional)

GSAP only when absolutely necessary.

CSS transitions only for trivial interactions.

---

# Motion Principles

Motion should communicate.

Motion should guide.

Motion should reduce cognitive load.

Motion should reinforce hierarchy.

Motion should never distract.

Every new animation introduced into Portfolio OS must follow this document before implementation.

---

## Cross-References

| Topic | Document |
|-------|----------|
| Exact timing values table | This document (Timing section) |
| Spring presets | This document (Springs section) |
| Animation performance rules | [PERFORMANCE.md](PERFORMANCE.md) |
| Motion anti-patterns | [ANTI_PATTERNS.md](ANTI_PATTERNS.md) (M1–M4) |
| GPU-safe animation properties | [CODING_GUIDELINES.md](CODING_GUIDELINES.md) |
| Phase-by-phase animation deliverables | [ROADMAP.md](ROADMAP.md) |