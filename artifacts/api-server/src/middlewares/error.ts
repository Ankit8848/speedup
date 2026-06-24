import type { ErrorRequestHandler, RequestHandler } from "express";
import { ZodError } from "zod/v4";
import { MulterError } from "multer";
import { HttpError } from "../lib/http-error";
import { logger } from "../lib/logger";

/** Catch-all 404 for unmatched API routes. */
export const notFoundHandler: RequestHandler = (_req, res) => {
  res.status(404).json({ error: "Not found" });
};

/** Central error handler — translates thrown errors into JSON responses. */
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    res.status(400).json({
      error: "Validation failed",
      details: err.issues,
    });
    return;
  }

  if (err instanceof MulterError) {
    res.status(400).json({ error: `Upload failed: ${err.message}` });
    return;
  }

  if (err instanceof HttpError) {
    res.status(err.status).json({
      error: err.message,
      ...(err.details ? { details: err.details } : {}),
    });
    return;
  }

  logger.error({ err }, "Unhandled error");
  res.status(500).json({ error: "Internal server error" });
};
