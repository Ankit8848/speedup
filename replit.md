# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### SpeedUp – Drone Delivery (`artifacts/speedup`)
- **Kind**: react-vite web app
- **Preview path**: `/` (root)
- **Description**: Premium cinematic drone delivery landing page — Flytrex-inspired dark/cream alternating design
- **Sections**: Hero, How It Works, Stats, Technology, Safety, Locations, Use Cases, Simulation, Final CTA, Footer
- **Tech**: React + Vite, GSAP + ScrollTrigger, Framer Motion, Tailwind CSS v4
- **Design system**:
  - Dark navy `#0D0F14` — hero, stats, safety, locations sections
  - Warm cream `#F5F3EF` — how it works, technology, use cases, simulation sections
  - Orange `#FF5500` — all accent, CTAs, section labels, highlights
  - Fonts: Space Grotesk (headings, black weight) + Inter (body)
- **Key features**:
  - Transparent navbar on dark hero → solid white + shadow on scroll
  - Massive bold centered hero typography ("The Sky Is / Your Courier.")
  - Orange news ticker at top, minimal 5-item nav, "Request Demo" CTA
  - Flytrex-style accordion tech/safety lists with animated right-panel detail
  - Animated stat counters, interactive SVG US map, delivery simulation
  - Orange-fill Final CTA with side-by-side partner + early-access cards
  - Custom orange cursor, dark footer

### API Server (`artifacts/api-server`)
- **Kind**: api (Express 5)
- **Preview path**: `/api`

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
