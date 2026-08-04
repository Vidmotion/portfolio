# PERFORMANCE.md

# Portfolio OS Performance Standards

Version: 1.0

---

# Purpose

Performance is a product feature.

Portfolio OS should feel indistinguishable from a native desktop application.

Every engineering decision must prioritize responsiveness, smooth rendering, efficient memory usage and fast loading times.

Performance is never an optimization phase.

It is part of the architecture.

---

# Performance Philosophy

The user should never wait.

The interface should never feel heavy.

Animations should never stutter.

Windows should never lag.

Scrolling should always feel effortless.

Every interaction should appear immediate.

Users should forget they are using a website.

---

# Core Performance Goals

Target performance metrics:

First Contentful Paint < 1.2 seconds

Largest Contentful Paint < 2.0 seconds

Interaction to Next Paint below 200ms

Cumulative Layout Shift below 0.05

Time To Interactive below 2 seconds

60 FPS during normal interactions

Stable 60 FPS during window dragging

Stable 60 FPS during Dock animations

Stable 60 FPS during Finder navigation

Memory usage should remain stable during long sessions.

---

# Performance Budget

JavaScript should remain as small as possible.

Every kilobyte matters.

Every dependency must justify its existence.

Avoid unnecessary client-side execution.

Avoid unnecessary hydration.

Avoid unnecessary rendering.

---

# Server First

Prefer React Server Components.

Use Client Components only when interaction is required.

Move logic to the server whenever possible.

Avoid sending JavaScript that the browser does not need.

---

# Hydration

Hydrate only interactive elements.

Never hydrate an entire page because one button is interactive.

Split client boundaries aggressively.

Reduce hydration cost whenever possible.

---

# Rendering

Avoid unnecessary renders.

Avoid unnecessary effects.

Avoid duplicated state.

Avoid expensive computations during render.

Compute once.

Reuse often.

---

# React Optimization

Prefer derived state.

Memoize only after profiling.

Avoid unnecessary Context Providers.

Prefer Zustand selectors.

Keep component trees shallow.

Never trigger global renders for local interactions.

---

# Component Design

Components should render only visible UI.

Heavy interfaces should be lazy loaded.

Expensive components should mount only when required.

Unmount inactive applications whenever appropriate.

---

# Window System

Inactive windows should stop unnecessary updates.

Background applications should suspend expensive rendering.

Only the focused window should receive intensive updates.

Dragging should never trigger full application renders.

---

# Three.js

Three.js is isolated from React rendering.

Never create objects inside useFrame.

Reuse geometries.

Reuse materials.

Reuse textures.

Dispose unused resources.

Avoid recreating shaders.

Avoid unnecessary shadows.

Avoid expensive post-processing.

Use InstancedMesh whenever repeated geometry exists.

Keep draw calls as low as possible.

Compress textures.

Profile GPU usage regularly.

Every scene should have measurable performance targets.

---

# Animation Performance

Animate only GPU-friendly properties.

Preferred:

transform

opacity

filter (carefully)

Avoid animating:

width

height

left

top

margin

padding

border-radius

box-shadow (when continuous)

Animations should never cause layout recalculation.

---

# Framer Motion

Prefer layout animations.

Prefer spring animations.

Avoid unnecessary AnimatePresence trees.

Animate only elements visible on screen.

Disable expensive motion on low-powered devices when appropriate.

---

# Images

Always use Next/Image.

Use AVIF whenever supported.

Fallback to WebP.

Generate multiple sizes.

Never serve oversized images.

Lazy-load off-screen media.

Use blur placeholders.

Optimize compression.

---

# Photography

Large photo collections should never load simultaneously.

Albums load progressively.

Only visible images should decode.

Scrolling should remain smooth regardless of album size.

---

# Videos

Videos load on demand.

Preview before playback.

Pause outside viewport.

Unload inactive videos.

Avoid autoplay unless explicitly required.

Optimize bitrate.

Serve modern codecs.

---

# Spotify

Never block rendering while waiting for Spotify APIs.

Use placeholders.

Cache responses.

Update only changed information.

Avoid polling whenever possible.

---

# Fonts

Minimize font files.

Use variable fonts when possible.

Preload only critical fonts.

Avoid layout shifts caused by font loading.

---

# Bundle Size

Analyze bundle regularly.

Tree shake dependencies.

Dynamic import heavy modules.

Split applications into independent chunks.

Avoid duplicate packages.

Avoid shipping development utilities.

---

# Network

Preload only critical assets.

Prefetch intelligently.

Cache aggressively.

Compress responses.

Use immutable caching for static assets.

Reduce request waterfalls.

---

# Memory

Dispose listeners.

Dispose WebGL resources.

Dispose observers.

Dispose timers.

Dispose animations.

Avoid retaining unused references.

Profile memory leaks regularly.

Long browsing sessions should remain stable.

---

# Scrolling

Scrolling must remain hardware accelerated.

Avoid scroll listeners whenever possible.

Use Intersection Observer.

Avoid layout thrashing.

Never block scrolling.

---

# Lazy Loading

Applications load only when opened.

Widgets load independently.

Photo albums load independently.

Videos load independently.

Three.js scenes initialize only when visible.

No feature should block another.

---

# Accessibility Performance

Reduced motion preferences should reduce animation workload.

Heavy effects should disable automatically.

Accessibility should improve performance, never reduce it.

---

# Mobile Performance

Mobile should receive:

smaller bundles

smaller images

lighter animations

reduced blur

reduced GPU workload

Performance takes priority over visual parity.

---

# Desktop Performance

Desktop should fully utilize GPU acceleration.

Support high refresh rate displays.

Support Retina displays.

Support large monitors efficiently.

---

# Monitoring

Performance should be continuously measured.

Track:

Core Web Vitals

Bundle size

Memory usage

Hydration time

Rendering time

Animation FPS

GPU workload

Performance regressions are treated as bugs.

---

# Lighthouse Targets

Performance: 95+

Accessibility: 100

Best Practices: 100

SEO: 100

These targets apply throughout development.

---

# Profiling

Before introducing any major feature:

Measure baseline.

Implement feature.

Measure again.

Compare results.

Optimize if necessary.

Never assume performance.

Always measure it.

---

# AI Development Rules

Any AI assistant contributing to Portfolio OS must prioritize performance before introducing new functionality.

Before adding any dependency, evaluate its runtime cost.

Before introducing a Client Component, verify that a Server Component is not sufficient.

Before adding animations, evaluate rendering cost.

Before loading media, evaluate loading strategy.

Before storing state, evaluate render impact.

Always choose the solution that provides the best balance between maintainability, user experience and performance.

---

# Final Principle

A beautiful interface that feels slow is considered unfinished.

Portfolio OS should feel immediate, fluid and effortless on every interaction.

Every animation, every render and every network request should contribute to the illusion of using a native operating system.

Performance is part of the design.
