/**
 * Vercel serverless entry for the SpeedUp API.
 *
 * Plain JS on purpose: Vercel must NOT type-check or re-compile our monorepo
 * TypeScript (it uses nodenext resolution and doesn't know our workspace export
 * conditions). Instead the API is pre-bundled into a single self-contained file
 * by `pnpm --filter ./artifacts/api-server build` (see vercel.json buildCommand),
 * and we just re-export the Express app from it.
 */
import app from "../artifacts/api-server/dist/serverless.mjs";

export default app;
