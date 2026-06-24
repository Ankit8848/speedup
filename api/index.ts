/**
 * Vercel serverless entry for the SpeedUp API.
 *
 * Vercel turns any file under /api into a serverless function. We simply export
 * the existing Express app — Vercel invokes it as the request handler. All
 * routes stay mounted under /api (see vercel.json rewrites), and the app reads
 * its config (DATABASE_URL, JWT_SECRET, BLOB_READ_WRITE_TOKEN) from env vars.
 */
import app from "../artifacts/api-server/src/app";

export default app;
