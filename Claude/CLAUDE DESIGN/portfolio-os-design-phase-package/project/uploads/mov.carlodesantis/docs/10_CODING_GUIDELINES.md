# CODING_GUIDELINES.md — Engineering Standards

> **Version:** 2.0
> **Status:** Active
> **Last Reviewed:** 2026-06-29

---

## Purpose

This document defines the engineering standards for Portfolio OS.

Every line of code written for this project must follow these guidelines.

The primary objective is to create a codebase that remains clean, scalable and maintainable for many years.

Code quality always has priority over implementation speed.

---

## General Philosophy

Portfolio OS should feel like a product built by a professional engineering team.

The codebase must be:

Predictable

Modular

Scalable

Readable

Maintainable

Reusable

Development Principles:

Architecture before implementation.

Documentation before coding.

Composition before inheritance.

Reuse before duplication.

Maintainability before speed.

Consistency before personal preference.

Performance before unnecessary effects.

Every engineering decision should support the long-term health of the project.

---

## TypeScript

TypeScript is mandatory.

Strict mode must always remain enabled.

Never use:

- `any`
- `unknown` as a shortcut
- implicit types
- disabled type checking

Every function should have explicit input and output types whenever possible.

Shared interfaces belong inside the `types/` directory.

---

## React Principles

Use functional components only.

Never use class components.

Keep components pure whenever possible.

Prefer composition over prop drilling.

Avoid unnecessary state.

Avoid unnecessary effects.

React should be responsible for rendering, not business logic.

---

## Component Rules

One component. One responsibility.

Every component should have a clear purpose.

Avoid components larger than approximately 250 lines.

If a component becomes difficult to understand, split it into smaller components.

Large components are considered architecture problems.

---

## Hooks

Hooks contain reusable logic.

Hooks should never render UI.

Hooks should never manipulate styling.

Hooks should remain framework-focused.

Examples:

```
useFinder()
useDock()
useSpotify()
useWindow()
usePhotos()
```

Every reusable behavior belongs inside a custom hook.

---

## Business Logic

Business logic should never exist inside visual components.

Instead:

```
Store → Hook → Component
```

Components receive data.

Hooks prepare data.

Stores manage data.

---

## State Management

Global state belongs to Zustand.

Component state belongs to React.

Never duplicate state.

Never synchronize multiple copies of the same information.

One source of truth.

See [STATE_MANAGEMENT.md](STATE_MANAGEMENT.md) for the complete store architecture.

---

## Folder Responsibility

Every folder has exactly one purpose.

| Folder | Responsibility |
|--------|---------------|
| `components/` | UI only |
| `hooks/` | Logic only |
| `stores/` | Global state only |
| `animations/` | Motion logic only |
| `lib/` | Pure utilities and content loading |
| `content/` | Portfolio data only |
| `docs/` | Architecture documentation only |

Responsibilities must never overlap.

---

## Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `Window.tsx`, `ProjectCard.tsx` |
| Hooks | camelCase with `use` prefix | `useWindow.ts` |
| Stores | camelCase ending with `Store` | `windowStore.ts` |
| Types | PascalCase | `Project`, `Album` |
| Folders | kebab-case | `window-manager/` |
| Variables | camelCase | `activeWindow` |
| Constants | UPPER_SNAKE_CASE | `MAX_WINDOWS` |

---

## File Structure

Each file should remain focused.

Avoid multiple unrelated exports.

Prefer one primary export per file.

Related helper functions should remain close to their implementation.

---

## Imports

Use absolute imports whenever possible.

Group imports consistently in this order:

1. External libraries
2. Shared utilities
3. Stores
4. Hooks
5. Components
6. Types
7. Styles

Avoid circular dependencies.

---

## Styling

Use Tailwind CSS as the primary styling solution.

Avoid inline styles.

Avoid duplicated utility classes.

Extract repeated patterns into reusable components.

Do not use CSS modules unless absolutely necessary.

Global styles belong only inside the `styles/` directory.

All visual values must trace back to design tokens defined in [DESIGN_FOUNDATIONS.md](DESIGN_FOUNDATIONS.md).

---

## Animations

Animations should use Framer Motion whenever possible.

GSAP should only be introduced when Framer Motion cannot achieve the required behavior.

Avoid CSS keyframes unless the animation is trivial.

Animation logic belongs inside dedicated animation components or hooks.

Never animate layout properties (`width`, `height`, `top`, `left`, `margin`, `padding`). Only `transform`, `opacity`, and `filter`.

See [MOTION.md](MOTION.md) for the complete motion specification.

---

## Performance

Avoid unnecessary re-renders.

Memoize expensive calculations.

Use lazy loading when appropriate.

Split heavy components.

Optimize images.

Avoid blocking rendering.

Performance should be considered from the beginning rather than optimized later.

See [PERFORMANCE.md](PERFORMANCE.md) for complete performance targets, budgets, and implementation checklists.

---

## Data Fetching

Components should never fetch data directly unless required.

Preferred flow:

```
Content → Store → Hook → Component
```

Future APIs should follow the same architecture.

---

## Error Handling

Never silently ignore errors.

Handle expected failures gracefully.

Log unexpected errors during development.

Provide meaningful fallback interfaces for users.

Error boundaries should protect large application areas.

---

## Accessibility

Accessibility is mandatory.

Every interactive element must support:

- Keyboard navigation
- Focus states
- Screen readers
- ARIA labels
- Reduced motion preferences
- High contrast readability

Accessibility should never be postponed.

---

## Comments

Write comments only when they explain intent.

Never comment obvious code.

Good comments explain why.

Bad comments explain what.

Documentation belongs in markdown files, not inside components.

---

## Refactoring

Refactor continuously.

Never allow technical debt to accumulate.

Small improvements should happen naturally during development.

Avoid massive rewrites.

Incremental improvements are preferred.

---

## Dependencies

Every dependency must have a clear justification.

Avoid installing libraries that solve simple problems.

Prefer native browser APIs whenever reasonable.

Minimize bundle size.

See [TECH_STACK.md](TECH_STACK.md) for the approved technology list.

---

## Git Philosophy

Every commit should represent one logical change.

Commit messages should be concise and descriptive.

Avoid mixing unrelated features in a single commit.

Documentation should evolve alongside implementation.

---

## Code Review Checklist

Before considering any feature complete, verify:

- [ ] Architecture follows documentation
- [ ] Components remain reusable
- [ ] Logic is not duplicated
- [ ] Naming is consistent
- [ ] Types are correct
- [ ] Accessibility is respected
- [ ] Performance remains acceptable
- [ ] Animations follow `MOTION.md`
- [ ] Design follows `DESIGN_FOUNDATIONS.md`

---

## Future Contributions

Every future implementation must comply with:

- `PROJECT.md`
- `ARCHITECTURE.md`
- `DESIGN_SYSTEM.md`
- `COMPONENTS.md`
- `MOTION.md`

No implementation should contradict them.

---

## Final Principle

Portfolio OS is intended to become a long-term software platform rather than a simple portfolio.

Every line of code should be written as if another engineer will maintain it for the next ten years.

Maintainability is the highest priority of the project.

---

## Cross-References

| Topic | Document |
|-------|----------|
| Performance targets and budgets | [PERFORMANCE.md](PERFORMANCE.md) |
| Design tokens and visual values | [DESIGN_FOUNDATIONS.md](DESIGN_FOUNDATIONS.md) |
| Motion rules | [MOTION.md](MOTION.md) |
| Technology stack decisions | [TECH_STACK.md](TECH_STACK.md) |
| State architecture | [STATE_MANAGEMENT.md](STATE_MANAGEMENT.md) |
| Anti-patterns reference | [ANTI_PATTERNS.md](ANTI_PATTERNS.md) |
