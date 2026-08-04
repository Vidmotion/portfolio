# TECH_STACK.md — Technology Stack

> **Version:** 2.0
> **Status:** Pre-Production
> **Last Reviewed:** 2026-06-29

---

# Purpose

This document defines the official technology stack for Portfolio OS.

Every implementation must follow these standards.

The technology stack has been selected to maximize maintainability, performance, scalability and developer experience.

Introducing new technologies requires a clear architectural justification.

Consistency is more important than experimenting with new libraries.

---

# Core Philosophy

Portfolio OS should be built using modern, stable and well-supported technologies.

The stack should remain lightweight.

Dependencies should solve real engineering problems.

Avoid unnecessary abstractions.

Prefer native browser capabilities whenever possible.

---

# Runtime

Node.js (Latest LTS)

Package Manager

pnpm

Reason:

Fast installation.

Efficient disk usage.

Excellent monorepo support.

Deterministic dependency resolution.

---

# Framework

Next.js (Latest Stable)

App Router

React Server Components

Server Actions

Streaming

Partial Prerendering when appropriate

Reasons:

Excellent performance.

Modern React architecture.

SEO.

Server rendering.

Excellent developer experience.

Future-proof.

---

# React

React 19

Functional Components only.

Server Components by default.

Client Components only when interaction is required.

Avoid unnecessary hydration.

---

# Language

TypeScript

Strict Mode enabled.

No JavaScript files.

Type safety is mandatory.

---

# Styling

Tailwind CSS v4

Reasons:

Performance.

Maintainability.

Design Tokens.

Consistency.

Avoid writing custom CSS whenever utility classes are sufficient.

Global styles remain minimal.

---

# Animations

Primary Library

Framer Motion

Use for:

Interface transitions

Micro interactions

Window animations

Widget animations

Hover states

Shared layout animations

GSAP

Allowed only when:

Complex timelines

Advanced SVG animations

Scroll-driven sequences

Three.js synchronization

GSAP should never replace Framer Motion for standard interface interactions.

---

# Three.js

React Three Fiber

Drei

Use only where immersive 3D experiences provide real value.

Never use Three.js for standard interface elements.

Three.js scenes should remain isolated from the rest of the application.

---

# State Management

Zustand

One store per feature.

No Redux.

No MobX.

No business logic inside React Context.

---

# Data Validation

Zod

All external data should be validated.

Every content object should have a schema.

Invalid data should fail during development.

---

# Forms

React Hook Form

Combined with Zod validation.

Forms should remain performant.

---

# Icons

Lucide React

Custom SVGs

Apple-inspired icon proportions.

Avoid mixing icon libraries.

---

# Fonts

Primary

SF Pro Display / SF Pro Text

Fallback

Inter (web-embedded)

Future support

Variable fonts

**Licensing note:** SF Pro is a system font owned by Apple. It renders automatically on Apple devices via `-apple-system`. It cannot be licensed for web embedding. Inter is the approved fallback and aligns closely with SF Pro in proportions and weight. The design system must look excellent in both. See `DESIGN_FOUNDATIONS.md` for the full font stack declaration.

---

# Images

Next/Image

Responsive loading

AVIF

WebP

Blur placeholders

Automatic optimization.

---

# Video

HTML5 Video

Adaptive loading

Intersection Observer

Lazy loading

Future streaming support.

---

# Markdown

MDX

Used for:

Notes

Documentation

Credits

Long-form content

---

# API Layer

Server Actions

Route Handlers

REST when appropriate

GraphQL only if future requirements justify it.

---

# Authentication

None initially.

Architecture should remain ready for:

Clerk

Auth.js

Supabase Auth

Future integrations should require minimal changes.

---

# Database

None initially.

Content is file-based.

Future migration should support:

PostgreSQL

Supabase

Planetscale

SQLite

without redesigning the application.

---

# Deployment

Vercel

Reasons:

Native Next.js support.

Edge Runtime.

Image Optimization.

Analytics.

Excellent CI/CD.

---

# Analytics

Vercel Analytics

Speed Insights

Privacy-first analytics preferred.

Avoid unnecessary tracking.

---

# Testing

Vitest

React Testing Library

Playwright

Critical systems should be covered by tests.

---

# Code Quality

ESLint

Prettier

TypeScript Strict

Consistent formatting is mandatory.

---

# Performance

Performance is considered part of the technology stack.

Preferred techniques include:

Server Components

Streaming

Dynamic Imports

Code Splitting

Lazy Loading

Image Optimization

Bundle Analysis

Tree Shaking

Optimized Rendering

Every technology choice should support these goals.

---

# Technology Rules for Contributors

These rules apply to all contributors.

Never replace approved technologies without architectural approval.

Never introduce duplicate libraries.

Never install dependencies to solve trivial problems.

Prefer native browser APIs.

Prefer lightweight solutions.

Always justify every new dependency.

See [CLAUDE.md](CLAUDE.md) for the complete decision framework and never-do list.

---

# Future Technologies

The architecture should remain flexible enough to integrate future technologies without requiring structural rewrites.

Technology evolution should happen incrementally.

Stability always takes priority over novelty.

---

# Final Principle

The technology stack exists to support the product.

Technology should never dictate design.

Every engineering decision must reinforce the vision defined in PROJECT.md while respecting the architecture defined in ARCHITECTURE.md.

---

## Cross-References

| Topic | Document |
|-------|----------|
| Architecture and folder structure | [ARCHITECTURE.md](ARCHITECTURE.md) |
| Performance requirements | [PERFORMANCE.md](PERFORMANCE.md) |
| State management libraries | [STATE_MANAGEMENT.md](STATE_MANAGEMENT.md) |
| Animation libraries | [MOTION.md](MOTION.md) |
| Typography tokens | [DESIGN_FOUNDATIONS.md](DESIGN_FOUNDATIONS.md) |