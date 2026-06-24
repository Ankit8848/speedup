import type { RequestHandler } from "express";
import type { AdminRole } from "@workspace/db";
import { AUTH_COOKIE, verifyToken, type AuthTokenPayload } from "../lib/auth";
import { HttpError } from "../lib/http-error";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: AuthTokenPayload;
    }
  }
}

/** Reads the JWT from cookie or Authorization header, if present. */
function readToken(req: Parameters<RequestHandler>[0]): string | null {
  const cookieToken = req.cookies?.[AUTH_COOKIE];
  if (typeof cookieToken === "string" && cookieToken.length > 0) return cookieToken;

  const header = req.headers.authorization;
  if (header?.startsWith("Bearer ")) return header.slice(7);

  return null;
}

/** Rejects the request unless a valid session token is present. */
export const requireAuth: RequestHandler = (req, _res, next) => {
  const token = readToken(req);
  if (!token) throw HttpError.unauthorized();

  try {
    req.user = verifyToken(token);
    next();
  } catch {
    throw HttpError.unauthorized("Session expired or invalid");
  }
};

/** Requires the authenticated user to hold one of the given roles. */
export function requireRole(...roles: AdminRole[]): RequestHandler {
  return (req, _res, next) => {
    if (!req.user) throw HttpError.unauthorized();
    if (!roles.includes(req.user.role)) {
      throw HttpError.forbidden("This action requires elevated permissions");
    }
    next();
  };
}
