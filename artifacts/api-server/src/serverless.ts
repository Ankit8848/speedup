/**
 * Serverless build entry. Exports the Express app (no `listen`) so it can be
 * bundled into a single self-contained file and used as a Vercel function.
 * See ../../api/index.mjs and vercel.json.
 */
import app from "./app";

export default app;
