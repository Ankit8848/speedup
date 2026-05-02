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
- **Description**: Premium, futuristic 3D landing page for SpeedUp drone delivery company
- **Sections**: Hero, How It Works, Technology, Use Cases, Stats, Simulation, Vision, Final CTA
- **Tech**: React Three Fiber, GSAP + ScrollTrigger, Framer Motion, Three.js, Tailwind CSS
- **Features**:
  - 3D drone built from geometric primitives (WebGL when available, CSS fallback otherwise)
  - Scroll-triggered animations via GSAP ScrollTrigger
  - Animated stat counters, glassmorphism cards, neon glow effects
  - Interactive delivery simulation with animated SVG path
  - Custom CSS cursor, day/night mode toggle
  - Dark futuristic palette: deep black + neon cyan (#00D4FF) + purple (#7B2FFF)
  - Google Fonts: Space Grotesk (headings) + Inter (body)

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
