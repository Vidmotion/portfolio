# ANTI_PATTERNS.md — Anti-Patterns Reference

> **Version:** 2.0
> **Status:** Active
> **Last Reviewed:** 2026-06-29

---

## Purpose

This document defines the practices that are explicitly forbidden within Portfolio OS.

Its purpose is to preserve the quality, consistency, and long-term maintainability of the project.

Whenever implementation becomes uncertain, consult this document before introducing new code.

Every rule exists because violating it would reduce the quality of the product.

**For technical anti-patterns with TypeScript code examples** (typed as A1–C2: Architecture, Design, Motion, Performance, Content), see [ANTI_PATTERNS.md](ANTI_PATTERNS.md).

---

# Philosophy

Good software is often defined more by what it refuses to become than by the features it includes.

The objective of this document is not to restrict creativity.

Its objective is to prevent technical debt.

Prevent inconsistency.

Prevent unnecessary complexity.

Protect the long-term vision of the project.

---

# Architecture

## Never create monolithic components

Components should have one responsibility.

If a component becomes difficult to understand, split it.

Large components increase maintenance cost.

---

## Never duplicate logic

If the same logic appears twice, extract it.

Use:

Hooks

Utilities

Services

Shared Components

Never copy and paste implementation.

---

## Never hardcode content

Projects.

Photos.

Albums.

Widgets.

Applications.

Everything should be generated from structured data.

No production content belongs inside React components.

---

## Never create circular dependencies

Dependencies should always have a clear direction.

Avoid tightly coupled systems.

---

## Never introduce unnecessary abstractions

Do not create abstraction simply because it might be useful.

Every abstraction should solve a real problem.

---

# TypeScript

## Never use any

Avoid:

any

unknown workarounds

unsafe casting

Prefer explicit types.

Strong typing is part of the architecture.

---

## Never duplicate interfaces

Every shared model should exist in one location.

Interfaces should become the language of the project.

---

# Components

## Never build components larger than necessary

If a component exceeds roughly 250–300 lines, evaluate whether it should be split.

Large files reduce readability.

---

## Never mix responsibilities

A component should not:

fetch data

manage business logic

render UI

handle animations

all at the same time.

Separate concerns.

---

## Never style through inline values

Avoid inline styles whenever possible.

Use:

Tailwind

Design Tokens

CSS Variables

Shared utilities

Maintain consistency.

---

# Motion

## Never animate for decoration

Every animation should communicate something.

If removing an animation does not reduce usability,

it probably should not exist.

---

## Never create inconsistent motion

Animations should share:

timing

easing

duration

behavior

Motion should feel like one system.

Not independent effects.

---

## Never sacrifice performance for animation

No animation justifies:

dropped frames

layout shifts

slow interactions

Motion should remain smooth.

---

# Design

## Never imitate references

Apple.

By Chudy.

Ludovico Scurto.

CodePen.

These exist to inspire.

Never reproduce their implementation.

Originality is mandatory.

---

## Never overload the interface

Avoid adding interface simply because space exists.

Empty space is a design element.

Less is usually better.

---

## Never introduce visual inconsistency

Typography.

Spacing.

Radius.

Blur.

Shadows.

Icons.

Everything should follow the Design System.

---

# Performance

## Never optimize later

Performance should influence implementation from the beginning.

Do not postpone optimization.

Build performant systems first.

---

## Never block rendering unnecessarily

Avoid:

large bundles

heavy images

synchronous loading

unnecessary JavaScript

Lazy load whenever appropriate.

---

## Never create unnecessary re-renders

Think carefully before introducing:

state

context

effects

memoization

Measure before optimizing.

---

# Accessibility

## Never postpone accessibility

Accessibility is not the final step.

It is part of implementation.

Every feature should launch accessible.

---

## Never depend only on hover

Every interaction should also work using:

keyboard

touch

screen readers

Hover is only one interaction method.

---

# Documentation

## Never leave documentation outdated

Whenever architecture changes,

documentation must change.

The documentation is the source of truth.

---

## Never implement undocumented systems

If a major architectural decision is introduced,

document it first.

---

# Dependencies

## Never install a package without justification

Before adding a dependency ask:

Can this already be solved?

Does the browser already provide this?

Does React already solve this?

Can we build it ourselves?

Dependencies should solve real problems.

---

## Never increase bundle size without benefit

Every dependency has a cost.

Evaluate it carefully.

---

# Git

## Never mix unrelated changes

Each commit should solve one problem.

Small commits are easier to review.

---

## Never commit experimental code

Temporary code belongs in local branches.

Not in the main project.

---

# User Experience

## Never surprise the user

Interactions should feel predictable.

Users should always understand what happened.

---

## Never interrupt the experience

Transitions should feel continuous.

Navigation should never feel abrupt.

The operating system should remain calm.

---

# Product

## Never forget the purpose

This is not a website.

This is not a design experiment.

This is not a JavaScript playground.

It is an operating system designed to present Carlo Desantis' creative work.

Every feature should reinforce that objective.

---

# Final Rule

Whenever a proposed solution violates one or more of these principles,

stop.

Reconsider the implementation.

Discuss alternatives.

Choose the solution that produces the simplest,

cleanest,

fastest,

most maintainable

and most elegant product.

Protect the project.

Always.

---

## Cross-References

| Topic | Document |
|-------|----------|
| Technical anti-patterns with code examples | [ANTI_PATTERNS.md](ANTI_PATTERNS.md) |
| Architecture decisions | [ARCHITECTURE.md](ARCHITECTURE.md) |
| Motion rules | [MOTION.md](MOTION.md) |
| Performance standards | [PERFORMANCE.md](PERFORMANCE.md) |
| Engineering guidelines | [CODING_GUIDELINES.md](CODING_GUIDELINES.md) |
| Product principles | [PRODUCT_PRINCIPLES.md](PRODUCT_PRINCIPLES.md) |